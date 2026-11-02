// Gebuehrenkonto je Standort: was die Pizzeria FlueVate schuldet und wie es
// eingezogen wird. Master liegt in claude-wissen/skills/fluevate-bestellsystem/
// scripts/gebuehren.js und wird unveraendert in jedes Standort-Repo kopiert -
// standortabhaengig ist nur das Regel-Objekt in server.js.
//
// Grundsatz: Der Kontostand wird bei jeder Abfrage aus den Bestellungen und
// den wenigen eigenen Belegen (Lastschrift, Streitfall, Monatsabschluss) neu
// berechnet. Es gibt keinen Zaehler, der still davonlaufen kann.
//
//   Soll  = feste Monatsbetraege + Gebuehr je vor Ort bezahlter Bestellung
//         + (echte - geschaetzte Stripe-Gebuehr) + Streitfall-Verluste
//         + Lastschriftkosten
//   Ist   = Einbehalt aus bezahlten Online-Zahlungen + Lastschriften
//   Offen = Soll - Ist - reserviert (laufende Checkouts) - in Lastschrift
//
// Alle Betraege in Cent. Eingezogen wird nur, was gerade hereinkommt - es wird
// nie bei der Pizzeria zurueckgebucht (FlueVate haftet fuer negative Salden).

'use strict';

const crypto = require('crypto');
const fs     = require('fs');

const VERSION = '1.0.0';

// Derselbe Statusfilter wie in den Berichten
const ZAEHLT = ['confirmed', 'preparing', 'ready', 'delivered'];
// Checkout-Sitzungen laufen nach 31 Minuten ab, Reservierungen gelten 35
const SITZUNG_MINUTEN    = 31;
const RESERVIERT_MINUTEN = 35;
// Darunter lohnt keine Lastschrift, der Betrag wandert in den Folgemonat
const LASTSCHRIFT_MIN_CENT = 100;
// Geschaetzte SEPA-Gebuehr, wird auf den Einzug aufgeschlagen und spaeter
// gegen die echte verrechnet
const SEPA_GEBUEHR_SCHAETZ_CENT = 35;
const EINZUG_TAG = 15;

// ── Reine Rechnung (ohne Datenbank testbar) ─────────────────────────

const cent = eur => Math.round((Number(eur) || 0) * 100);

const berlinTag   = d => new Date(d).toLocaleDateString('en-CA', { timeZone: 'Europe/Berlin' });
const berlinMonat = d => berlinTag(d).slice(0, 7);

// Versatz Berlin gegen UTC in Minuten zu einem Zeitpunkt
function berlinVersatz(d) {
  const t = new Date(d);
  const b = new Date(t.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
  const u = new Date(t.toLocaleString('en-US', { timeZone: 'UTC' }));
  return Math.round((b - u) / 60000);
}

// Mitternacht Berliner Zeit am angegebenen Tag. Versatz um 00:00 UTC messen:
// das liegt vor jeder Sommer-/Winterzeit-Umstellung (01:00 UTC).
function berlinMitternacht(j, m, t) {
  const utc = Date.UTC(j, m - 1, t);
  return new Date(utc - berlinVersatz(new Date(utc)) * 60000);
}

// { von, bis } eines Monats 'YYYY-MM', bis exklusiv
function monatsGrenzen(ym) {
  const [j, m] = ym.split('-').map(Number);
  return { von: berlinMitternacht(j, m, 1),
           bis: m === 12 ? berlinMitternacht(j + 1, 1, 1) : berlinMitternacht(j, m + 1, 1) };
}

function monateZwischen(vonYm, bisYm) {
  const aus = [];
  let [j, m] = vonYm.split('-').map(Number);
  for (;;) {
    const ym = `${j}-${String(m).padStart(2, '0')}`;
    if (ym > bisYm) return aus;
    aus.push(ym);
    if (++m > 12) { m = 1; j++; }
  }
}

const vormonat = ym => {
  let [j, m] = ym.split('-').map(Number);
  if (--m < 1) { m = 12; j--; }
  return `${j}-${String(m).padStart(2, '0')}`;
};

// Feste Betraege eines Monats in Cent. grund ist eine Liste [{ab:'YYYY-MM', betrag}],
// es gilt der juengste Eintrag, der nicht nach dem Monat liegt.
function festeKosten(ym, r) {
  const grund = (r.grund || []).filter(g => g.ab <= ym).sort((a, b) => a.ab < b.ab ? -1 : 1).pop();
  const einmalig = (r.einmalig || []).filter(e => e.monat === ym);
  return [
    grund && grund.betrag ? { art: 'grund', text: 'Grundgebühr', cent: cent(grund.betrag) } : null,
    r.domain ? { art: 'domain', text: 'Domain', cent: cent(r.domain) } : null,
    r.stripeKonto ? { art: 'stripeKonto', text: 'Stripe-Kontogebühren', cent: cent(r.stripeKonto) } : null,
    ...einmalig.map(e => ({ art: 'einmalig', text: e.text || 'Einmalbetrag', cent: cent(e.betrag) })),
  ].filter(Boolean);
}

const istVorOrt = o => o.payment !== 'stripe';

// Speisenumsatz: was der Gast fuer Essen zahlt, ohne Liefer- und Servicegebuehr
function speisenumsatz(o) {
  if (typeof o.subtotal === 'number') return o.subtotal - (o.discount || 0);
  return (o.total || 0) - (o.serviceFee ?? 0) - (o.deliveryFee || 0);
}

// Gebuehr fuer FlueVate aus einer Bestellung, in Cent. Einzige Quelle fuer
// Berichte, Checkout und Pruefung. ?? statt ||: eine Bestellung mit 0 € Service-
// gebuehr bleibt bei 0 und wird nicht zur Standardgebuehr.
function gebuehrJeBestellung(o, r) {
  const service = o.serviceFee ?? r.service ?? 0;
  return cent(service) + Math.round(cent(speisenumsatz(o)) * (r.provision || 0));
}

// Streitfall: Hat Stripe den Betrag abgezogen und nicht zurueckgegeben, traegt die
// Pizzeria den Verlust abzueglich dessen, was FlueVate an der Zahlung verdient hat;
// der Einbehalt dieser Zahlung zaehlt dann nicht mehr als bezahlt.
function streitWirkung(s) {
  const verloren = s.verlustCent >= s.betragCent && s.betragCent > 0;
  return { soll: verloren ? Math.max(0, s.verlustCent - (s.appFeeCent || 0)) : (s.verlustCent || 0),
           einbehaltUngueltig: verloren };
}

// Kontostand aus Rohdaten. bis = Stichtag (exklusiv fuer Soll-Posten).
function berechne({ bestellungen = [], lastschriften = [], streitfaelle = [], abschluesse = [] }, r, bis = new Date(), jetzt = bis) {
  const start = new Date(berlinMitternacht(...r.start.split('-').map(Number)));
  const posten = [];
  const imZeitraum = d => new Date(d) >= start && new Date(d) < bis;

  for (const ym of monateZwischen(berlinMonat(start), berlinMonat(new Date(bis - 1)))) {
    const datum = monatsGrenzen(ym).von;
    const name = datum.toLocaleDateString('de-DE', { month: 'long', year: 'numeric', timeZone: 'Europe/Berlin' });
    for (const f of festeKosten(ym, r)) posten.push({ ...f, datum, text: `${f.text} ${name}` });
  }

  const streitJeOrder = new Map();
  for (const s of streitfaelle) {
    const w = streitWirkung(s);
    if (s.orderNum != null) streitJeOrder.set(s.orderNum, w);
    if (w.soll && imZeitraum(s.createdAt || s.datum))
      posten.push({ art: 'streit', datum: s.createdAt || s.datum, orderNum: s.orderNum,
                    text: `Kartenstreit #${s.orderNum ?? '?'} (${s.status})`, cent: w.soll });
  }

  let reserviert = 0;
  for (const o of bestellungen) {
    if (new Date(o.createdAt) < start) continue;
    if (istVorOrt(o)) {
      if (ZAEHLT.includes(o.status) && imZeitraum(o.createdAt)) {
        const g = gebuehrJeBestellung(o, r);
        if (g) posten.push({ art: 'vorOrt', datum: o.createdAt, orderNum: o.orderNum,
                             text: `#${o.orderNum} vor Ort (${o.payment})`, cent: g });
      }
      continue;
    }
    // Online (Stripe)
    if (o.paymentStatus === 'paid') {
      const streit = streitJeOrder.get(o.orderNum);
      if (o.einbehalt > 0 && !(streit && streit.einbehaltUngueltig))
        posten.push({ art: 'einbehalt', datum: o.createdAt, orderNum: o.orderNum,
                      text: `#${o.orderNum} online einbehalten`, cent: -o.einbehalt });
      if (o.stripeGebuehrIst != null && o.stripeGebuehrSchaetz != null && o.stripeGebuehrIst !== o.stripeGebuehrSchaetz && imZeitraum(o.createdAt))
        posten.push({ art: 'stripeDiff', datum: o.createdAt, orderNum: o.orderNum,
                      text: `#${o.orderNum} Stripe-Gebühr ${o.stripeGebuehrIst - o.stripeGebuehrSchaetz > 0 ? 'höher' : 'niedriger'} als geschätzt`,
                      cent: o.stripeGebuehrIst - o.stripeGebuehrSchaetz });
    } else if (o.paymentStatus === 'refunded' && o.appFeeErstattet && imZeitraum(o.createdAt)) {
      // Plattformgebuehr ging an den Gast zurueck, Stripe behaelt seine Gebuehr
      const g = o.stripeGebuehrIst ?? o.stripeGebuehrSchaetz;
      if (g) posten.push({ art: 'stripeDiff', datum: o.createdAt, orderNum: o.orderNum,
                           text: `#${o.orderNum} erstattet, Stripe-Gebühr bleibt`, cent: g });
    } else if (o.status === 'awaiting_payment' && o.einbehalt > 0 &&
               new Date(o.createdAt) > new Date(jetzt - RESERVIERT_MINUTEN * 60000)) {
      reserviert += o.einbehalt;
    }
  }

  let inLastschrift = 0;
  for (const a of abschluesse) if (a.status === 'geplant') inLastschrift += a.betragCent;

  for (const l of lastschriften) {
    if (['processing', 'succeeded'].includes(l.status))
      posten.push({ art: 'lastschrift', datum: l.createdAt, text: `SEPA-Lastschrift ${l.monat}`, cent: -l.betragCent });
    if (l.kostenCent && imZeitraum(l.createdAt))
      posten.push({ art: 'lastschriftKosten', datum: l.createdAt, text: `Stripe-Kosten Lastschrift ${l.monat} (${l.status})`, cent: l.kostenCent });
  }

  posten.sort((a, b) => new Date(a.datum) - new Date(b.datum));
  const summe = arten => posten.filter(p => arten.includes(p.art)).reduce((s, p) => s + p.cent, 0);
  const soll = {
    fest:     summe(['grund', 'domain', 'stripeKonto', 'einmalig']),
    vorOrt:   summe(['vorOrt']),
    stripe:   summe(['stripeDiff', 'lastschriftKosten']),
    streit:   summe(['streit']),
  };
  soll.summe = soll.fest + soll.vorOrt + soll.stripe + soll.streit;
  const ist = { einbehalt: 0 - summe(['einbehalt']), lastschrift: 0 - summe(['lastschrift']) };
  ist.summe = ist.einbehalt + ist.lastschrift;
  return { stand: jetzt, soll, ist, reserviert, inLastschrift,
           offen: soll.summe - ist.summe - reserviert - inLastschrift, posten };
}

// Sicht auf einen Monat fuer die Berichte: was in diesem Monat angefallen ist
// und was eingezogen wurde, dazu der Gesamtstand.
function monatsSicht(konto, ym) {
  const { von, bis } = monatsGrenzen(ym);
  const im = konto.posten.filter(p => new Date(p.datum) >= von && new Date(p.datum) < bis);
  const s = arten => im.filter(p => arten.includes(p.art)).reduce((a, p) => a + p.cent, 0);
  return {
    monat: ym,
    fest: im.filter(p => ['grund', 'domain', 'stripeKonto', 'einmalig'].includes(p.art)),
    vorOrt: s(['vorOrt']), vorOrtAnzahl: im.filter(p => p.art === 'vorOrt').length,
    stripe: s(['stripeDiff', 'lastschriftKosten']), streit: s(['streit']),
    einbehalt: 0 - s(['einbehalt']), lastschrift: 0 - s(['lastschrift']),
    offen: konto.offen, inLastschrift: konto.inLastschrift,
  };
}

// Wie viel von einer Zahlung zusaetzlich einbehalten wird (Cent)
function einbehaltAus(offen, betragCent, appFeeCent) {
  return Math.max(0, Math.min(offen, betragCent - appFeeCent));
}

// ── PDF-Seite fuer Wochen- und Monatsbericht ──
function pdfSeite(doc, konto, r, { titel, zeitraum, ym } = {}) {
  const M = 50, W = 495, fmt = c => (c / 100).toFixed(2).replace('.', ',') + ' €';
  const sicht = monatsSicht(konto, ym || berlinMonat(konto.stand));
  doc.addPage(); doc.y = M;
  doc.rect(0, 0, 595, 50).fill('#1a1a2e');
  doc.font('Helvetica-Bold').fontSize(16).fillColor('#fff').text(titel || 'Gebührenkonto', M, 14);
  doc.font('Helvetica').fontSize(9).fillColor('#ccc').text(`FlueVate  ·  ${r.name}  ·  ${zeitraum || sicht.monat}`, M, 33);
  doc.y = 66;
  const zeile = (text, wert, opt = {}) => {
    if (doc.y > 760) { doc.addPage(); doc.y = M; }
    const y = doc.y;
    if (opt.hinterlegt) doc.rect(M, y, W, 18).fill(opt.hinterlegt);
    doc.font(opt.fett ? 'Helvetica-Bold' : 'Helvetica').fontSize(9.5).fillColor(opt.farbe || '#222')
      .text(text, M + 8, y + 5, { width: W - 120 }).text(wert, M, y + 5, { width: W - 8, align: 'right' });
    doc.y = y + 18;
  };
  doc.font('Helvetica-Bold').fontSize(10).fillColor('#1a1a2e').text('IN DIESEM MONAT ANGEFALLEN', M, doc.y); doc.y += 14;
  sicht.fest.forEach((f, i) => zeile(f.text, fmt(f.cent), { hinterlegt: i % 2 ? null : '#f5f5f5' }));
  zeile(`Gebühren auf vor Ort bezahlte Bestellungen (${sicht.vorOrtAnzahl})`, fmt(sicht.vorOrt));
  if (sicht.stripe) zeile('Stripe-Kosten (Abweichung zur Schätzung, Erstattungen, Lastschrift)', fmt(sicht.stripe));
  if (sicht.streit) zeile('Kartenstreitfälle', fmt(sicht.streit));
  doc.y += 8;
  doc.font('Helvetica-Bold').fontSize(10).fillColor('#1a1a2e').text('IN DIESEM MONAT BEGLICHEN', M, doc.y); doc.y += 14;
  zeile('Einbehalten aus Online-Zahlungen', fmt(sicht.einbehalt), { hinterlegt: '#f5f5f5' });
  if (sicht.lastschrift) zeile('SEPA-Lastschrift', fmt(sicht.lastschrift));
  doc.y += 8;
  zeile('Offen insgesamt (Stand ' + new Date(konto.stand).toLocaleString('de-DE', { timeZone: 'Europe/Berlin' }) + ')',
        fmt(Math.max(0, konto.offen)), { fett: true, hinterlegt: '#e8f5e9', farbe: '#2e7d32' });
  if (konto.offen < 0) zeile('Guthaben der Pizzeria', fmt(-konto.offen));
  if (konto.inLastschrift) zeile(`Davon zum Einzug per SEPA-Lastschrift am ${EINZUG_TAG}.`, fmt(konto.inLastschrift));
  doc.y += 10;
  doc.font('Helvetica').fontSize(8).fillColor('#666').text(
    'So funktioniert es: Gebühren, die nicht schon bei der Online-Zahlung anfallen (Grundgebühr, Domain, Gebühren auf ' +
    'Bar- und EC-Karten-Bestellungen, Stripe-Kosten), werden von den nächsten Online-Zahlungen einbehalten, bis nichts ' +
    'mehr offen ist. Was am Monatsende noch offen ist, wird am ' + EINZUG_TAG + '. des Folgemonats per SEPA-Lastschrift ' +
    'eingezogen; Betrag und Datum stehen vorab auf der Rechnung.', M, doc.y, { width: W });
}

const rein = { cent, berlinTag, berlinMonat, berlinMitternacht, monatsGrenzen, monateZwischen, vormonat,
               festeKosten, istVorOrt, speisenumsatz, gebuehrJeBestellung, streitWirkung, berechne,
               monatsSicht, einbehaltAus, pdfSeite, ZAEHLT };

// ── Anbindung an Datenbank, Stripe und Mail ─────────────────────────

function gebuehrenAnlegen({ mongoose, Order, regeln, getStripe, getResend, emailFrom, istTest = () => false }) {
  const r = { ...regeln };
  const modus = () => (process.env.GEBUEHREN_EINBEHALT || 'aus').toLowerCase();
  const connect = () => process.env.STRIPE_CONNECT_ACCOUNT;
  const S = mongoose.Schema;
  const modell = (name, schema) => mongoose.models[name] || mongoose.model(name, schema);

  const Lastschrift = modell('GebuehrLastschrift', new S({
    monat: String, paymentIntentId: { type: String, unique: true, sparse: true },
    betragCent: Number, kostenCent: { type: Number, default: 0 },
    status: { type: String, enum: ['processing', 'succeeded', 'failed', 'zurueck'] }, fehler: String,
  }, { timestamps: true, collection: 'gebuehren_lastschriften' }));

  const Streitfall = modell('GebuehrStreitfall', new S({
    disputeId: { type: String, unique: true }, orderNum: Number, paymentIntentId: String,
    betragCent: Number, verlustCent: Number, appFeeCent: Number, status: String, grund: String,
  }, { timestamps: true, collection: 'gebuehren_streitfaelle' }));

  const Monatsabschluss = modell('GebuehrMonatsabschluss', new S({
    monat: { type: String, unique: true }, sollCent: Number, istCent: Number, betragCent: Number,
    status: { type: String, enum: ['geplant', 'eingezogen', 'geplatzt', 'uebertrag'] },
    einzugAb: Date, grund: String,
  }, { timestamps: true, collection: 'gebuehren_abschluesse' }));

  const Einverstaendnis = modell('GebuehrEinverstaendnis', new S({
    _id: { type: String, default: 'standort' },
    customerId: String, paymentMethodId: String, mandateId: String, mandatReferenz: String,
    ibanEnde: String, kontoinhaber: String, email: String,
    agbAkzeptiert: Boolean, zeitpunkt: Date, sessionId: String,
  }, { timestamps: true, collection: 'gebuehren_einverstaendnis' }));

  const Sperre = modell('GebuehrSperre', new S({ _id: String, bis: Date, von: String },
                                               { collection: 'gebuehren_sperre' }));

  async function melden(betreff, html) {
    const an = process.env.OWNER_EMAIL;
    const resend = getResend && getResend();
    if (!resend || !an) { console.error(`Gebühren: Meldung ohne Empfänger – ${betreff}`); return false; }
    const { error } = await resend.emails.send({ from: emailFrom(), to: an, subject: `${betreff} · ${r.name}`, html });
    if (error) { console.error('Gebühren: Meldung fehlgeschlagen:', error.message || error); return false; }
    return true;
  }

  // Sperre ueber MongoDB, damit zwei gleichzeitige Checkouts denselben Rest nicht
  // doppelt einbehalten - haelt auch ueber Neustarts und mehrere Instanzen.
  // Ohne Sperre nach 5 s laeuft der Checkout trotzdem, nur ohne Einbehalt.
  async function mitSperre(fn) {
    const ich = crypto.randomUUID();
    const ende = Date.now() + 5000;
    let haben = false;
    while (!haben && Date.now() < ende) {
      try {
        const d = await Sperre.findOneAndUpdate(
          { _id: 'einbehalt', $or: [{ bis: { $lt: new Date() } }, { bis: null }] },
          { bis: new Date(Date.now() + 20000), von: ich }, { upsert: true, new: true });
        haben = d && d.von === ich;
      } catch (e) { if (e.code !== 11000) throw e; }
      if (!haben) await new Promise(res => setTimeout(res, 150));
    }
    if (!haben) console.error('Gebühren: Sperre nicht bekommen – Checkout ohne Einbehalt');
    try { return await fn(haben); }
    finally { if (haben) await Sperre.updateOne({ _id: 'einbehalt', von: ich }, { bis: new Date(0) }).catch(() => {}); }
  }

  async function rohdaten(bis = new Date()) {
    const start = berlinMitternacht(...r.start.split('-').map(Number));
    const [bestellungen, lastschriften, streitfaelle, abschluesse] = await Promise.all([
      Order.find({ createdAt: { $gte: start, $lt: bis } })
        .select('orderNum createdAt status payment paymentStatus total subtotal discount serviceFee deliveryFee einbehalt einbehaltProbe stripeGebuehrIst stripeGebuehrSchaetz appFeeCent appFeeErstattet customer')
        .lean(),
      Lastschrift.find({}).lean(), Streitfall.find({}).lean(), Monatsabschluss.find({}).lean(),
    ]);
    return { bestellungen: bestellungen.filter(o => !istTest(o)), lastschriften, streitfaelle, abschluesse };
  }

  // Eine Sekunde Spielraum: ein Beleg aus derselben Millisekunde zaehlt mit
  async function kontostand(bis = new Date(Date.now() + 1000)) {
    return berechne(await rohdaten(bis), r, bis, new Date());
  }

  // Im Checkout innerhalb von mitSperre aufrufen. Liefert den Einbehalt in Cent
  // und einen Probe-Wert, der nur protokolliert wird.
  async function einbehaltFuer(betragCent, appFeeCent, gesperrt) {
    const m = modus();
    if (m === 'aus' || !connect() || !gesperrt) return { einbehalt: 0, probe: 0 };
    const konto = await kontostand();
    const extra = einbehaltAus(konto.offen, betragCent, appFeeCent);
    if (m === 'an') {
      const ok = await Einverstaendnis.findById('standort').lean();
      if (ok && ok.agbAkzeptiert) return { einbehalt: extra, probe: 0 };
      console.error('Gebühren: Modus "an", aber keine Zustimmung gespeichert – nur Probe');
    }
    return { einbehalt: 0, probe: extra };
  }

  // Echte Stripe-Gebuehr und Charge-ID nachtragen. Fehler werden nur geloggt,
  // der taegliche Lauf holt fehlende nach.
  async function stripeGebuehrNachtragen(order) {
    if (!order.stripePaymentIntentId || order.stripeGebuehrIst != null) return;
    try {
      const pi = await getStripe().paymentIntents.retrieve(order.stripePaymentIntentId,
                                                           { expand: ['latest_charge.balance_transaction'] });
      const bt = pi.latest_charge && pi.latest_charge.balance_transaction;
      if (!bt || typeof bt !== 'object') return;
      await Order.updateOne({ _id: order._id },
        { stripeGebuehrIst: bt.fee, stripeChargeId: pi.latest_charge.id,
          ...(pi.application_fee_amount != null ? { appFeeCent: pi.application_fee_amount } : {}) });
    } catch (e) { console.warn(`Gebühren: Stripe-Gebühr #${order.orderNum} nicht lesbar: ${e.message}`); }
  }

  // Parameter fuer refunds.create bei einer Connect-Zahlung: Pizzeria gibt ihren
  // Anteil zurueck, FlueVate seine Plattformgebuehr. Die Stripe-Gebuehr bleibt
  // bei Stripe und geht ueber das Gebuehrenkonto an die Pizzeria.
  function erstattungsParameter() {
    return connect() ? { reverse_transfer: true, refund_application_fee: true } : {};
  }

  // ── Webhook ──
  // Jedes Ereignis des Stripe-Kontos geht an alle Standorte. Deshalb filtert
  // jeder Zweig auf diesen Standort und gibt false zurueck, wenn ihn das
  // Ereignis nichts angeht.
  async function webhook(event) {
    const o = event.data.object;
    if (event.type === 'checkout.session.completed' && o.mode === 'setup') {
      if ((o.metadata || {}).gebuehren_standort !== r.standort) return true;
      const si = await getStripe().setupIntents.retrieve(o.setup_intent, { expand: ['payment_method', 'mandate'] });
      const pm = si.payment_method || {};
      await Einverstaendnis.findByIdAndUpdate('standort', {
        customerId: o.customer, paymentMethodId: pm.id, mandateId: si.mandate && si.mandate.id,
        mandatReferenz: si.mandate && si.mandate.payment_method_details && si.mandate.payment_method_details.sepa_debit
          && si.mandate.payment_method_details.sepa_debit.reference,
        ibanEnde: pm.sepa_debit && pm.sepa_debit.last4, kontoinhaber: pm.billing_details && pm.billing_details.name,
        email: pm.billing_details && pm.billing_details.email,
        agbAkzeptiert: !!(o.consent && o.consent.terms_of_service === 'accepted') || o.metadata.zustimmung === 'eigene_seite',
        zeitpunkt: new Date(), sessionId: o.id,
      }, { upsert: true });
      await melden('✅ SEPA-Mandat erteilt', `<p>${r.name} hat das SEPA-Mandat erteilt (IBAN …${pm.sepa_debit && pm.sepa_debit.last4}).</p>`);
      return true;
    }

    if (event.type.startsWith('payment_intent.') && (o.metadata || {}).gebuehren_standort) {
      if (o.metadata.gebuehren_standort !== r.standort) return true;
      const l = await Lastschrift.findOne({ paymentIntentId: o.id });
      if (!l) return true;
      if (event.type === 'payment_intent.succeeded') {
        l.status = 'succeeded';
        try {
          const pi = await getStripe().paymentIntents.retrieve(o.id, { expand: ['latest_charge.balance_transaction'] });
          const bt = pi.latest_charge && pi.latest_charge.balance_transaction;
          if (bt && typeof bt === 'object') l.kostenCent = bt.fee;
        } catch (e) { console.warn('Gebühren: SEPA-Gebühr nicht lesbar:', e.message); }
        await l.save();
        await Monatsabschluss.updateOne({ monat: l.monat }, { status: 'eingezogen' });
      } else if (event.type === 'payment_intent.payment_failed') {
        l.status = 'failed';
        l.fehler = (o.last_payment_error && o.last_payment_error.message) || 'unbekannt';
        await l.save();
        await Monatsabschluss.updateOne({ monat: l.monat }, { status: 'geplatzt' });
        await melden('🚨 SEPA-Lastschrift geplatzt',
          `<p>Die Lastschrift über ${(l.betragCent / 100).toFixed(2).replace('.', ',')} € (${l.monat}) ist fehlgeschlagen: ${l.fehler}</p>
           <p>Der Betrag ist wieder offen und wird von den nächsten Online-Zahlungen einbehalten.
           Barzahlung abschalten nur nach deiner Freigabe.</p>`);
      }
      return true;
    }

    if (event.type.startsWith('charge.dispute.')) {
      const piId = o.payment_intent;
      const order = piId ? await Order.findOne({ stripePaymentIntentId: piId }).lean() : null;
      const lastschrift = !order && piId ? await Lastschrift.findOne({ paymentIntentId: piId }) : null;
      if (!order && !lastschrift) return false;          // anderer Standort
      let d = o;
      try { d = await getStripe().disputes.retrieve(o.id, { expand: ['balance_transactions'] }); } catch {}
      const verlust = -(d.balance_transactions || []).reduce((s, bt) => s + (bt.net || 0), 0);
      if (lastschrift) {
        // Rueckgabe einer Lastschrift durch die Pizzeria
        lastschrift.status = ['won'].includes(d.status) ? 'succeeded' : 'zurueck';
        lastschrift.kostenCent = (lastschrift.kostenCent || 0) + Math.max(0, verlust - lastschrift.betragCent);
        await lastschrift.save();
        if (event.type === 'charge.dispute.created')
          await melden('🚨 SEPA-Lastschrift zurückgeholt',
            `<p>Die Lastschrift ${lastschrift.monat} über ${(lastschrift.betragCent / 100).toFixed(2).replace('.', ',')} € wurde zurückgegeben. Der Betrag ist wieder offen.</p>`);
        return true;
      }
      await Streitfall.findOneAndUpdate({ disputeId: d.id }, {
        orderNum: order.orderNum, paymentIntentId: piId, betragCent: d.amount, verlustCent: Math.max(0, verlust),
        appFeeCent: order.appFeeCent || 0, status: d.status, grund: d.reason,
      }, { upsert: true });
      if (event.type === 'charge.dispute.created')
        await melden('⚠️ Kartenstreit bei Online-Bestellung',
          `<p>Bestellung #${order.orderNum} (${(d.amount / 100).toFixed(2).replace('.', ',')} €), Grund: ${d.reason}.</p>
           <p>Verlust und Streitgebühr stehen im Gebührenkonto der Pizzeria. Antworten im Stripe-Dashboard bis zur Frist.</p>`);
      return true;
    }
    return false;
  }

  // ── SEPA ──
  async function sepaLink({ email, name } = {}) {
    const stripe = getStripe();
    const vorh = await Einverstaendnis.findById('standort').lean();
    let customerId = vorh && vorh.customerId;
    if (!customerId) {
      const c = await stripe.customers.create({ name: name || r.name, email, metadata: { gebuehren_standort: r.standort } });
      customerId = c.id;
      await Einverstaendnis.findByIdAndUpdate('standort', { customerId }, { upsert: true });
    }
    const basis = {
      mode: 'setup', customer: customerId, currency: 'eur', payment_method_types: ['sepa_debit'], locale: 'de',
      metadata: { gebuehren_standort: r.standort },
      success_url: `${r.gebuehrenSeite}?mandat=ok`, cancel_url: `${r.gebuehrenSeite}?mandat=abgebrochen`,
    };
    try {
      return (await stripe.checkout.sessions.create({
        ...basis,
        consent_collection: { terms_of_service: 'required' },
        custom_text: { terms_of_service_acceptance: { message:
          `Ich stimme zu, dass FlueVate seine Gebühren laut [Gebührenübersicht](${r.gebuehrenSeite}) ` +
          `von Online-Zahlungen einbehält und offene Restbeträge per SEPA-Lastschrift einzieht.` } },
      })).url;
    } catch (e) {
      // Ohne hinterlegte AGB-Adresse im Stripe-Dashboard lehnt Stripe das Haekchen ab
      throw new Error(`Stripe lehnt den Link mit Zustimmungs-Häkchen ab (${e.message}). ` +
                      `Im Stripe-Dashboard unter Einstellungen → Öffentliche Details die AGB-Adresse eintragen.`);
    }
  }

  // Am 1. fuer den Vormonat: was bis Monatsende angefallen und noch offen ist,
  // wird festgeschrieben und - mit Mandat - am 15. eingezogen. Idempotent.
  async function monatsabschluss(jetzt = new Date()) {
    const ym = vormonat(berlinMonat(jetzt));
    if (ym < r.start.slice(0, 7)) return null;
    const vorhanden = await Monatsabschluss.findOne({ monat: ym }).lean();
    if (vorhanden) return vorhanden;
    const { bis } = monatsGrenzen(ym);
    const roh = await rohdaten(new Date());
    const k = berechne(roh, r, bis, jetzt);
    const betragCent = Math.max(0, k.offen);
    const mandat = await Einverstaendnis.findById('standort').lean();
    const mitMandat = !!(mandat && mandat.mandateId && mandat.paymentMethodId);
    const [j, m] = berlinTag(jetzt).split('-').map(Number);
    const doc = await Monatsabschluss.create({
      monat: ym, sollCent: k.soll.summe, istCent: k.ist.summe, betragCent,
      status: mitMandat && betragCent >= LASTSCHRIFT_MIN_CENT ? 'geplant' : 'uebertrag',
      einzugAb: berlinMitternacht(j, m, EINZUG_TAG),
      grund: !mitMandat ? 'kein Mandat' : betragCent < LASTSCHRIFT_MIN_CENT ? 'unter Mindestbetrag' : '',
    });
    if (doc.status === 'uebertrag' && betragCent >= LASTSCHRIFT_MIN_CENT)
      await melden('ℹ️ Gebühren offen, kein SEPA-Mandat',
        `<p>Aus ${ym} sind ${(betragCent / 100).toFixed(2).replace('.', ',')} € offen. Ohne Mandat werden sie ` +
        `weiter von Online-Zahlungen einbehalten.</p>`);
    return doc.toObject();
  }

  // Zieht faellige, geplante Abschluesse per SEPA ein. Idempotent ueber den Monat.
  async function lastschriftenEinziehen(jetzt = new Date()) {
    const faellig = await Monatsabschluss.find({ status: 'geplant', einzugAb: { $lte: jetzt } });
    const mandat = await Einverstaendnis.findById('standort').lean();
    const ergebnis = [];
    for (const a of faellig) {
      if (await Lastschrift.findOne({ monat: a.monat, status: { $in: ['processing', 'succeeded'] } })) continue;
      if (!mandat || !mandat.mandateId) { a.status = 'uebertrag'; a.grund = 'Mandat fehlt'; await a.save(); continue; }
      const betragCent = a.betragCent + SEPA_GEBUEHR_SCHAETZ_CENT;
      try {
        const pi = await getStripe().paymentIntents.create({
          amount: betragCent, currency: 'eur', customer: mandat.customerId,
          payment_method: mandat.paymentMethodId, mandate: mandat.mandateId,
          payment_method_types: ['sepa_debit'], off_session: true, confirm: true,
          description: `FlueVate Gebühren ${a.monat} · ${r.name}`,
          metadata: { gebuehren_standort: r.standort, monat: a.monat },
        }, { idempotencyKey: `gebuehren-${r.standort}-${a.monat}-${a.betragCent}` });
        await Lastschrift.create({ monat: a.monat, paymentIntentId: pi.id, betragCent,
                                   status: pi.status === 'succeeded' ? 'succeeded' : 'processing' });
        a.status = 'eingezogen'; await a.save();
        ergebnis.push({ monat: a.monat, betragCent, status: pi.status });
      } catch (e) {
        a.status = 'geplatzt'; a.grund = e.message; await a.save();
        await melden('🚨 SEPA-Lastschrift nicht angelegt', `<p>${a.monat}: ${e.message}</p>`);
        ergebnis.push({ monat: a.monat, fehler: e.message });
      }
    }
    return ergebnis;
  }

  // Schlusseinzug bei Kuendigung: alles Offene, frueheste Einziehung nach 14 Tagen
  async function schlusseinzug(jetzt = new Date()) {
    const k = await kontostand();
    const betragCent = Math.max(0, k.offen);
    if (betragCent < LASTSCHRIFT_MIN_CENT) return { betragCent, hinweis: 'nichts offen' };
    const doc = await Monatsabschluss.create({
      monat: `schluss-${berlinTag(jetzt)}`, sollCent: k.soll.summe, istCent: k.ist.summe, betragCent,
      status: 'geplant', einzugAb: new Date(+jetzt + 14 * 86400e3), grund: 'Kündigung',
    });
    return doc.toObject();
  }

  // ── Pruefungen ──
  // Plattformgebuehren laut Stripe gegen die Bestellungen eines Monats
  async function abgleich(ym) {
    const { von, bis } = monatsGrenzen(ym);
    const stripe = getStripe();
    const gebuehren = [];
    for await (const f of stripe.applicationFees.list({ created: { gte: Math.floor(von / 1000), lt: Math.floor(bis / 1000) }, limit: 100 }))
      if (f.account === connect()) gebuehren.push(f);
    const orders = await Order.find({ payment: 'stripe', paymentStatus: { $in: ['paid', 'refunded'] },
                                      createdAt: { $gte: von, $lt: bis } }).lean();
    const jeCharge = new Map(orders.filter(o => o.stripeChargeId).map(o => [o.stripeChargeId, o]));
    const abweichungen = [];
    let stripeSumme = 0, dbSumme = 0;
    for (const f of gebuehren) {
      const netto = f.amount - f.amount_refunded;
      stripeSumme += netto;
      const o = jeCharge.get(f.charge);
      if (!o) { abweichungen.push({ charge: f.charge, stripe: netto, text: 'Gebühr ohne Bestellung in der Datenbank' }); continue; }
      jeCharge.delete(f.charge);
      const erwartet = o.paymentStatus === 'refunded' && o.appFeeErstattet ? 0 : (o.appFeeCent || 0);
      dbSumme += erwartet;
      if (erwartet !== netto) abweichungen.push({ orderNum: o.orderNum, stripe: netto, datenbank: erwartet });
    }
    for (const o of jeCharge.values())
      if (o.paymentStatus === 'paid') abweichungen.push({ orderNum: o.orderNum, datenbank: o.appFeeCent, text: 'bei Stripe keine Plattformgebühr gefunden' });
    const ohneCharge = orders.filter(o => o.paymentStatus === 'paid' && !o.stripeChargeId).map(o => o.orderNum);
    if (ohneCharge.length) abweichungen.push({ text: 'Stripe-Gebühr noch nicht nachgetragen', orderNums: ohneCharge });
    return { monat: ym, stripeSumme, dbSumme, anzahlStripe: gebuehren.length, abweichungen };
  }

  // Online-Anteil und Stornoquote der letzten Woche gegen die vier Wochen davor
  async function auffaelligkeiten(jetzt = new Date()) {
    const tag = 86400e3;
    const lade = (von, bis) => Order.find({ createdAt: { $gte: new Date(+jetzt - von * tag), $lt: new Date(+jetzt - bis * tag) },
                                            status: { $ne: 'awaiting_payment' } }).select('payment status').lean();
    const [woche, vorher] = await Promise.all([lade(7, 0), lade(35, 7)]);
    const kennz = l => {
      const gueltig = l.filter(o => o.status !== 'cancelled');
      return { n: l.length, online: gueltig.length ? gueltig.filter(o => o.payment === 'stripe').length / gueltig.length : 0,
               storno: l.length ? l.filter(o => o.status === 'cancelled').length / l.length : 0 };
    };
    const a = kennz(woche), b = kennz(vorher);
    const meldungen = [];
    if (b.n >= 20 && a.n >= 5) {
      if (b.online > 0.05 && a.online < b.online * 0.7)
        meldungen.push(`Online-Anteil gefallen: ${(a.online * 100).toFixed(0)} % statt ${(b.online * 100).toFixed(0)} % (4-Wochen-Schnitt)`);
      if (a.storno > Math.max(b.storno * 2, 0.05))
        meldungen.push(`Stornoquote gestiegen: ${(a.storno * 100).toFixed(0)} % statt ${(b.storno * 100).toFixed(0)} %`);
    }
    return { woche: a, vorher: b, meldungen };
  }

  // ── Admin-Endpunkte und Zeitplaene ──
  function routen(app, auth) {
    app.get('/api/admin/gebuehrenkonto', auth, async (req, res) => {
      try {
        const k = await kontostand();
        const ym = req.query.monat || berlinMonat(new Date());
        const [abschluesse, lastschriften, streitfaelle, mandat] = await Promise.all([
          Monatsabschluss.find({}).sort({ monat: 1 }).lean(), Lastschrift.find({}).sort({ createdAt: 1 }).lean(),
          Streitfall.find({}).lean(), Einverstaendnis.findById('standort').lean()]);
        res.json({
          standort: r.standort, version: VERSION, modulHash: modulHash(), modus: modus(), connect: !!connect(),
          regeln: { ...r }, stand: k.stand, soll: k.soll, ist: k.ist, reserviert: k.reserviert,
          inLastschrift: k.inLastschrift, offen: k.offen, monat: monatsSicht(k, ym),
          posten: req.query.posten === 'alle' ? k.posten
                : k.posten.filter(p => berlinMonat(p.datum) === ym),
          abschluesse, lastschriften, streitfaelle,
          mandat: mandat ? { vorhanden: !!mandat.mandateId, agbAkzeptiert: !!mandat.agbAkzeptiert,
                             zeitpunkt: mandat.zeitpunkt, ibanEnde: mandat.ibanEnde, mandatReferenz: mandat.mandatReferenz } : null,
        });
      } catch (e) { console.error('Gebührenkonto:', e); res.status(500).json({ message: e.message }); }
    });
    app.get('/api/admin/gebuehrenkonto/abgleich', auth, async (req, res) => {
      try { res.json(await abgleich(req.query.monat || vormonat(berlinMonat(new Date())))); }
      catch (e) { res.status(500).json({ message: e.message }); }
    });
    app.post('/api/admin/sepa-link', auth, async (req, res) => {
      try { res.json({ url: await sepaLink(req.body || {}) }); }
      catch (e) { res.status(500).json({ message: e.message }); }
    });
    app.post('/api/admin/gebuehrenkonto/schlusseinzug', auth, async (req, res) => {
      if (req.query.bestaetigt !== '1') return res.status(400).json({ message: 'Mit ?bestaetigt=1 aufrufen' });
      try { res.json(await schlusseinzug()); } catch (e) { res.status(500).json({ message: e.message }); }
    });
  }

  function zeitplaene(cron) {
    const tz = { timezone: 'Europe/Berlin' };
    const sicher = (name, fn) => async () => {
      if (mongoose.connection.readyState !== 1) return;
      try { await fn(); } catch (e) { console.error(`Gebühren ${name}:`, e); }
    };
    // Stuendlich: Monatsabschluss nachholen, falls der Server am 1. nicht lief
    cron.schedule('5 * * * *', sicher('Monatsabschluss', () => monatsabschluss()), tz);
    // Taeglich 09:00: faellige Lastschriften
    cron.schedule('0 9 * * *', sicher('Lastschrift', () => lastschriftenEinziehen()), tz);
    // Taeglich 03:00: fehlende echte Stripe-Gebuehren der letzten 40 Tage
    cron.schedule('0 3 * * *', sicher('Nachtragen', async () => {
      const offen = await Order.find({ payment: 'stripe', paymentStatus: { $in: ['paid', 'refunded'] },
        stripePaymentIntentId: { $exists: true }, stripeGebuehrIst: null,
        createdAt: { $gte: new Date(Date.now() - 40 * 86400e3) } }).limit(200).lean();
      for (const o of offen) await stripeGebuehrNachtragen(o);
    }), tz);
    // Montags 08:00: Auffaelligkeiten, nur bei Befund eine Mail
    cron.schedule('0 8 * * 1', sicher('Auffälligkeiten', async () => {
      const a = await auffaelligkeiten();
      if (a.meldungen.length) await melden('⚠️ Auffälligkeit Zahlarten', `<p>${a.meldungen.join('<br>')}</p>`);
    }), tz);
    // Am 2. um 07:00: Abgleich des Vormonats mit Stripe, nur bei Abweichung eine Mail
    cron.schedule('0 7 2 * *', sicher('Abgleich', async () => {
      if (!connect()) return;
      const a = await abgleich(vormonat(berlinMonat(new Date())));
      if (a.abweichungen.length)
        await melden('⚠️ Gebühren-Abgleich mit Stripe weicht ab',
          `<p>${a.monat}: Stripe ${(a.stripeSumme / 100).toFixed(2)} €, Datenbank ${(a.dbSumme / 100).toFixed(2)} €</p>` +
          `<pre>${JSON.stringify(a.abweichungen, null, 1).slice(0, 5000)}</pre>`);
    }), tz);
  }

  return { VERSION, regeln: r, modus, mitSperre, einbehaltFuer, kontostand, rohdaten, stripeGebuehrNachtragen,
           erstattungsParameter, webhook, sepaLink, monatsabschluss, lastschriftenEinziehen, schlusseinzug,
           abgleich, auffaelligkeiten, routen, zeitplaene, monatsSicht,
           pdfSeite: (doc, konto, opts) => pdfSeite(doc, konto, r, opts),
           gebuehrJeBestellung: o => gebuehrJeBestellung(o, r), istVorOrt,
           sitzungEndet: () => Math.floor(Date.now() / 1000) + SITZUNG_MINUTEN * 60,
           modelle: { Lastschrift, Streitfall, Monatsabschluss, Einverstaendnis } };
}

function modulHash() {
  try { return crypto.createHash('sha256').update(fs.readFileSync(__filename)).digest('hex').slice(0, 12); }
  catch { return 'unbekannt'; }
}

// Felder fuer das Order-Schema:  new mongoose.Schema({ ..., ...gebuehrenOrderFelder })
const orderFelder = {
  einbehalt:            { type: Number, default: 0 },   // Cent, zusaetzlich zur normalen Plattformgebuehr
  einbehaltProbe:       { type: Number, default: 0 },   // Cent, nur im Probemodus berechnet
  appFeeCent:           Number,                         // gesamte Plattformgebuehr laut Stripe
  stripeGebuehrSchaetz: Number,                         // Cent, beim Checkout geschaetzt
  stripeGebuehrIst:     { type: Number, default: null },// Cent, echte Gebuehr laut Stripe
  stripeChargeId:       String,
  appFeeErstattet:      { type: Boolean, default: false },
};

module.exports = gebuehrenAnlegen;
module.exports.orderFelder = orderFelder;
module.exports.rein = rein;
module.exports.VERSION = VERSION;
