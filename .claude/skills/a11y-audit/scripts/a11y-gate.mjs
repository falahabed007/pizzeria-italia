#!/usr/bin/env node
/**
 * a11y-gate.mjs — ausführbares Accessibility-Gate für Motion-Sites.
 *
 * Prüft die drei Dinge, die bei uns tatsächlich schon durchgerutscht sind:
 *
 *   1. axe-core NACH dem Durchscrollen. Am Seitenanfang ist axe blind:
 *      `[data-reveal]`-Elemente stehen auf `opacity: 0` und werden übersprungen.
 *      Genau so lagen in allen drei DACH-Mastern von Beginn an drei
 *      Kontrastverstöße (--moss 3.77:1, --brass 3.3:1, --copper-hi 3.9:1).
 *   2. Kontrast von Text über Bild/Canvas. Das kann axe grundsätzlich nicht
 *      bewerten. Gemessen wird der komponierte Pixel-Stand (inklusive Scrim),
 *      und zwar im WORST CASE, nicht im Mittel — beim Heizungs-Master musste
 *      das Hero-Scrim deshalb von 0.5 auf 0.68 (3.41 → 4.81:1).
 *   3. Hängende Reveals bei prefers-reduced-motion: Inhalt, der ohne
 *      Animation dauerhaft auf `opacity: 0` stehen bleibt, ist unsichtbar.
 *
 * Kein neues Paket: Playwright und axe-core werden — wie in demo.mjs — aus
 * <projekt>/tools/node_modules aufgelöst (npm install in tools/).
 *
 * Aufruf:
 *   node .claude/skills/a11y-audit/scripts/a11y-gate.mjs <url|dist-ordner> [optionen]
 *
 *   --mobile            zusätzlich mit 390x844 prüfen
 *   --json              Report als JSON auf stdout (für Skripte)
 *   --schwelle <n>      Kontrast-Mindestwert für Normaltext (Default 4.5)
 *
 * Exit-Code: 0 = PASS · 1 = FAIL (Blocker gefunden) · 2 = Gate lief nicht.
 */

import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Projektwurzel: von der Arbeitsverzeichnis-Position aufwärts das erste Verzeichnis mit tools/package.json
function projektWurzel() {
  let d = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (existsSync(join(d, 'tools', 'package.json'))) return d;
    const oben = dirname(d); if (oben === d) break; d = oben;
  }
  return process.cwd();
}
const REPO = projektWurzel();
const schlafe = (ms) => new Promise((r) => setTimeout(r, ms));

/* ── Argumente ────────────────────────────────────────────────────────────── */
const argv = process.argv.slice(2);
const ziel = argv.find((a) => !a.startsWith('--'));
const flag = (n) => argv.includes(`--${n}`);
const wert = (n, d) => {
  const i = argv.indexOf(`--${n}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : d;
};
const SCHWELLE = Number(wert('schwelle', 4.5));
const JSON_AUS = flag('json');

if (!ziel) {
  console.error('Aufruf: a11y-gate.mjs <url|dist-ordner> [--mobile] [--json] [--schwelle 4.5]');
  process.exit(2);
}

const log = (s) => { if (!JSON_AUS) console.log(s); };

/* ── Werkzeug aus dem Workspace auflösen (kein eigenes node_modules) ───────
      Genommen wird der erste Ort, dessen Playwright seinen Browser AUCH
      heruntergeladen hat — nicht einfach der erste, der sich importieren lässt.

      Playwright und axe-core kommen aus <projekt>/tools (npm install dort, dann
      npx playwright install chromium). Keine festen Revisionsnummern. */
const ORTE = ['tools/'];
let chromium, axeSource, herkunft;
const gruende = [];
for (const ort of ORTE) {
  try {
    const require = createRequire(join(REPO, ort));
    const pw = require('playwright');
    if (!existsSync(pw.chromium.executablePath())) {
      gruende.push(`${ort} — Playwright da, Browser nicht heruntergeladen`);
      continue;
    }
    axeSource = require('axe-core').source;
    chromium = pw.chromium;
    herkunft = ort;
    break;
  } catch (e) {
    gruende.push(`${ort} — ${e.message.split('\n')[0]}`);
  }
}

if (!chromium) {
  console.error('Gate lief nicht: kein Ort mit Playwright UND heruntergeladenem Browser.');
  for (const g of gruende) console.error(`  · ${g}`);
  console.error('Beheben: cd tools && npm install && npx playwright install chromium');
  process.exit(2);
}

/* ── Lokalen dist-Ordner ausliefern, damit auch vor dem Deploy geprüft
      werden kann. Bei einer http(s)-URL entfällt das. ─────────────────────── */
async function bereitstellen(z) {
  if (/^https?:\/\//.test(z)) return { url: z, stop: () => {} };
  const dist = resolve(z);
  if (!existsSync(join(dist, 'index.html'))) {
    console.error(`Kein index.html in ${dist} — dist-Ordner bauen oder URL angeben.`);
    process.exit(2);
  }
  const server = createServer((req, res) => {
    const pfad = decodeURIComponent((req.url || '/').split('?')[0]);
    let datei = join(dist, pfad === '/' ? 'index.html' : pfad);
    if (!existsSync(datei) || statSync(datei).isDirectory()) datei = join(datei, 'index.html');
    if (!datei.startsWith(dist) || !existsSync(datei)) { res.writeHead(404).end(); return; }
    const typ = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
      '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
      '.avif': 'image/avif', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
      '.json': 'application/json', '.mp4': 'video/mp4' }[extname(datei)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': typ }).end(readFileSync(datei));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  return { url: `http://127.0.0.1:${server.address().port}/`, stop: () => server.close() };
}

/* ── Ganze Seite abfahren, damit Reveals ausgelöst sind ──────────────────── */
async function durchscrollen(page) {
  const hoehe = await page.evaluate(async () => {
    const schritt = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += schritt) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 220));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 600));
    return document.body.scrollHeight;
  });
  await schlafe(400);
  return hoehe;
}

/* ── 1) axe-core ──────────────────────────────────────────────────────────
   Nach dem Durchscrollen laufen die Reveal-Transitionen noch. axe rechnet
   einen halbtransparenten oder weichgezeichneten Zwischenzustand als echten
   Kontrast — gemessen am Gartenbau-Master: die gepinnte Prozess-Karte „02"
   wurde mitten im Crossfade als „serious color-contrast" gemeldet, während
   dieselbe Karte im Ruhezustand einwandfrei liest.

   Deshalb werden Kontrast-Funde an Elementen, die gerade in Bewegung sind,
   nicht verurteilt, sondern getrennt als „nicht bewertbar" ausgewiesen. Alle
   anderen Regeln (Semantik, Labels, Landmarks) sind davon unberührt. */
async function axeLauf(page) {
  await page.addScriptTag({ content: axeSource });
  return page.evaluate(async () => {
    const r = await window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      resultTypes: ['violations'],
    });

    /** Steht das Element (oder ein Vorfahr) gerade im Übergang? */
    const inBewegung = (sel) => {
      let el;
      try { el = document.querySelector(sel); } catch { return false; }
      if (!el) return false;
      for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
        const s = getComputedStyle(n);
        const o = Number(s.opacity);
        if (o < 0.95 && o > 0) return true;
        if (s.filter && s.filter.includes('blur')) return true;
        if (s.transitionProperty && s.transitionProperty !== 'none' && Number(s.transitionDuration.split(',')[0].replace(/[^\d.]/g, '')) > 0
            && (s.transform !== 'none' || o < 1)) return true;
      }
      return false;
    };

    const raus = [];
    for (const v of r.violations) {
      const feste = [], bewegte = [];
      for (const n of v.nodes) {
        const eintrag = { ziel: n.target.join(' '), text: (n.html || '').replace(/\s+/g, ' ').slice(0, 120) };
        (v.id === 'color-contrast' && inBewegung(eintrag.ziel) ? bewegte : feste).push(eintrag);
      }
      if (feste.length) raus.push({ id: v.id, impact: v.impact, help: v.help, knoten: feste.slice(0, 5), anzahl: feste.length });
      if (bewegte.length) raus.push({ id: v.id, impact: 'nicht bewertbar', help: `${v.help} — Element war in Bewegung (Transition/Blur), Zwischenzustand zählt nicht`, knoten: bewegte.slice(0, 3), anzahl: bewegte.length, transient: true });
    }
    return raus;
  });
}

/* ── 2) Kontrast von Text über Bild/Canvas ────────────────────────────────
   Methode wie von Hand, nur reproduzierbar: denselben Ausschnitt zweimal
   fotografieren — einmal mit Glyphen, einmal mit `color: transparent`. Die
   Differenz ist die Buchstabenfläche; dort wird der Hintergrund gemessen und
   gegen die Textfarbe gerechnet.

   Zwei Dinge, die dabei zählen und beim naiven Vorgehen falsch herauskommen:
   nur die Fläche UNTER den Buchstaben wird gemessen (nicht der ganze
   Textkasten, sonst verurteilt ein heller Fleck in der Ecke das Element), und
   innerhalb dieser Fläche entscheidet das schlechteste Perzentil, nicht der
   Mittelwert — ein heller Himmel in 10 % der Buchstaben reißt den Kontrast
   genauso wie in 50 %. */
const lumKanal = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
const relLum = (r, g, b) => 0.2126 * lumKanal(r) + 0.7152 * lumKanal(g) + 0.0722 * lumKanal(b);
const verhaeltnis = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

async function kandidaten(page) {
  return page.evaluate(() => {
    /** Deckkraft ueber alle Vorfahren multipliziert — nur so ist ein Element
     *  wirklich sichtbar. */
    const effektiveDeckkraft = (el) => {
      let o = 1;
      for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
        o *= Number(getComputedStyle(n).opacity);
        if (o < 0.01) break;
      }
      return o;
    };

    const istUeberVisual = (el) => {
      for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
        const s = getComputedStyle(n);
        if (s.backgroundImage && s.backgroundImage !== 'none' && !s.backgroundImage.startsWith('linear-gradient')) return true;
      }
      // Bild/Video/Canvas, das den Textmittelpunkt überdeckt
      const b = el.getBoundingClientRect();
      const mx = b.left + b.width / 2, my = b.top + b.height / 2;
      return [...document.querySelectorAll('img, video, canvas')].some((m) => {
        const r = m.getBoundingClientRect();
        return r.width > 120 && r.height > 80 && mx >= r.left && mx <= r.right && my >= r.top && my <= r.bottom;
      });
    };

    document.querySelectorAll('[data-a11y-gate]').forEach((n) => n.removeAttribute('data-a11y-gate'));
    const raus = [];
    const sel = 'h1, h2, h3, p, a, span, li, button, strong, em, .eyebrow';
    for (const el of document.querySelectorAll(sel)) {
      const txt = (el.textContent || '').trim();
      if (!txt || txt.length < 2) continue;
      // nur Elemente mit eigenem Textknoten (kein Container, der Kinder zählt)
      if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
      const b = el.getBoundingClientRect();
      if (b.width < 8 || b.height < 6) continue;
      if (b.bottom < 0 || b.top > window.innerHeight) continue;
      const s = getComputedStyle(el);
      if (s.visibility === 'hidden' || s.display === 'none') continue;
      // Deckkraft MUSS ueber die Vorfahren gerechnet werden. Ein <p> mit
      // opacity:1 in einem Container mit opacity:0.04 ist nicht lesbar — sein
      // komponierter Pixel ist fast reiner Hintergrund, und das Verhaeltnis
      // kollabiert auf ~1:1. Genau so hat dieses Gate am 08.08.2026 einen
      // Scroll-Flug als "1.13:1" gemeldet, dessen Copy an jeder Stelle, an
      // der sie wirklich steht, bei 9.8:1 bzw. 4.3:1 lag.
      // Schwelle 0.95, nicht 0.5: ein Element bei 0.6 Deckkraft ist noch zu
      // 40 % Hintergrund, sein komponierter Pixel liegt also irgendwo
      // dazwischen und das Verhaeltnis bricht ein. Genau das produzierte am
      // 09.08.2026 Befunde wie "2.24:1" bei einem Median von 8.18 — dasselbe
      // Element, an einer anderen Stichprobe gemessen, war einwandfrei.
      // Kontrast ist nur an fertig gezeichnetem Text eine sinnvolle Groesse;
      // jede Reveal-Blende wird an einer der vier Scroll-Stichproben ohnehin
      // im Ruhezustand erwischt.
      if (effektiveDeckkraft(el) < 0.95) continue;
      if (!istUeberVisual(el)) continue;

      const px = parseFloat(s.fontSize);
      const fett = Number(s.fontWeight) >= 700 || s.fontWeight === 'bold';
      // Textfarbe -> sRGB 0..255 ueber ein 1x1-Canvas. Tailwind v4 liefert fuer
      // `text-white/90` ein `oklab(0.99 0 0 / 0.9)` — die Zahlen sind KEINE
      // RGB-Komponenten. Gemessen 05.09.2026: der Regex-Pfad hielt weissen
      // Text fuer Schwarz und meldete 1.7:1 auf dunklem Petrol. Der Canvas
      // kennt jede Farbsyntax des Browsers; Alpha wird bewusst verworfen (die
      // Deckkraft-Schwelle oben greift getrennt).
      const farbeRgb = (() => {
        try {
          const c = document.createElement('canvas'); c.width = c.height = 1;
          const g = c.getContext('2d', { willReadFrequently: true });
          g.fillStyle = '#000'; g.fillRect(0, 0, 1, 1);
          g.fillStyle = s.color; g.fillRect(0, 0, 1, 1);
          const d = g.getImageData(0, 0, 1, 1).data;
          const a = d[3] / 255 || 1; // gegen Schwarz gemischt -> zurueckrechnen
          return [d[0] / a, d[1] / a, d[2] / a].map((v) => Math.min(255, Math.round(v)));
        } catch { return null; }
      })();
      el.setAttribute('data-a11y-gate', String(raus.length));
      raus.push({
        idx: raus.length,
        text: txt.replace(/\s+/g, ' ').slice(0, 70),
        farbe: s.color,
        farbeRgb,
        gross: px >= 24 || (px >= 18.66 && fett),
        schatten: !!s.textShadow && s.textShadow !== 'none',
        box: { x: b.left + window.scrollX, y: b.top + window.scrollY, width: b.width, height: b.height },
        tag: el.tagName.toLowerCase(),
      });
      if (raus.length >= 25) break;
    }
    return raus;
  });
}

/** Hintergrund-Luminanz NUR unter den Buchstaben.
 *
 *  Naiv über den ganzen Textkasten zu messen verurteilt jedes Element, in dessen
 *  Ecke irgendwo ein heller Fleck sitzt (gemessen: „01/ 05" 1.01:1 bei Median
 *  5.63:1 — der Wert war Unsinn). Deshalb: zwei Aufnahmen, mit und ohne Text.
 *  Ihre Differenz ist die Glyphen-Maske; leicht geweitet ergibt sie genau die
 *  Fläche, die der Leser hinter der Schrift sieht. Nur dort wird gemessen.
 *
 *  Dekodiert wird im Browser — der hat einen PNG-Decoder, also braucht das Gate
 *  keine Bild-Bibliothek.
 */
async function bandLuminanz(page, mitText, ohneText) {
  return page.evaluate(async ([a64, b64]) => {
    const laden = async (b64) => {
      const bild = new Image();
      await new Promise((ok, fail) => { bild.onload = ok; bild.onerror = fail; bild.src = `data:image/png;base64,${b64}`; });
      const c = document.createElement('canvas');
      c.width = bild.naturalWidth; c.height = bild.naturalHeight;
      c.getContext('2d', { willReadFrequently: true }).drawImage(bild, 0, 0);
      return { d: c.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, c.width, c.height).data, w: c.width, h: c.height };
    };
    const kanal = (x) => { const s = x / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
    const lum = (d, i) => 0.2126 * kanal(d[i]) + 0.7152 * kanal(d[i + 1]) + 0.0722 * kanal(d[i + 2]);

    const A = await laden(a64), B = await laden(b64);
    if (A.w !== B.w || A.h !== B.h) return null;

    // 1) Glyphenmaske aus der Differenz (erfasst Schrift UND ihren text-shadow)
    const roh = new Uint8Array(A.w * A.h);
    for (let p = 0; p < roh.length; p++) {
      if (Math.abs(lum(A.d, p * 4) - lum(B.d, p * 4)) > 0.02) roh[p] = 1;
    }
    // 2) um 2 px weiten — die Fläche direkt neben den Buchstaben zählt mit
    const maske = new Uint8Array(roh.length);
    const R = 2;
    for (let y = 0; y < A.h; y++) for (let x = 0; x < A.w; x++) {
      if (!roh[y * A.w + x]) continue;
      for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) {
        const ny = y + dy, nx = x + dx;
        if (ny >= 0 && ny < A.h && nx >= 0 && nx < A.w) maske[ny * A.w + nx] = 1;
      }
    }

    // 3) Hintergrund (Aufnahme OHNE Text) nur innerhalb der Maske auswerten
    const werte = [];
    for (let p = 0; p < maske.length; p++) if (maske[p]) werte.push(lum(B.d, p * 4));
    if (werte.length < 40) return null; // zu wenig Fläche → kein Urteil
    werte.sort((x, y) => x - y);
    const q = (t) => werte[Math.min(werte.length - 1, Math.max(0, Math.round(t * (werte.length - 1))))];
    return { p10: q(0.10), p50: q(0.5), p90: q(0.90), anzahl: werte.length, anteil: werte.length / roh.length };
  }, [mitText, ohneText]);
}

async function kontrastPruefung(page) {
  const befunde = [];
  const gesehen = new Set();

  // Nicht nur Above-the-fold: die Bühnen weiter unten liegen genauso über Bildern.
  for (const anteil of [0, 0.33, 0.66, 1]) {
    await page.evaluate((a) => window.scrollTo(0, Math.round((document.body.scrollHeight - window.innerHeight) * a)), anteil);
    await schlafe(500);

    for (const k of await kandidaten(page)) {
      const schluessel = `${k.tag}|${k.text}`;
      if (gesehen.has(schluessel)) continue;
      gesehen.add(schluessel);

      const el = page.locator(`[data-a11y-gate="${k.idx}"]`);
      if (!(await el.count())) continue;

      // Zwei Aufnahmen desselben Ausschnitts: mit Glyphen und ohne.
      //
      // NUR die Buchstaben werden transparent geschaltet, nicht das Element.
      // `visibility: hidden` wäre falsch: es nimmt dem Element auch seinen eigenen
      // Hintergrund. Gemessen (Gartenbau, Vorher/Nachher-Label): 1.03:1, weil statt
      // des dunklen Chips `rgba(18,28,18,.55)` das nackte Foto gemessen wurde.
      // Nebeneffekt, der uns passt: ein `text-shadow` bleibt stehen und zählt damit
      // als Kontrasthilfe mit — so wie der Leser ihn sieht.
      // fullPage + Dokument-Koordinaten — eindeutig, egal wie weit gescrollt ist.
      let mit, ohne;
      const glyphenWeg = (n) => {
        n.dataset.a11yFarbe = n.style.color || '';
        n.style.setProperty('color', 'transparent', 'important');
        n.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
      };
      const glyphenZurueck = (n) => {
        n.style.removeProperty('-webkit-text-fill-color');
        n.style.removeProperty('color');
        if (n.dataset.a11yFarbe) n.style.color = n.dataset.a11yFarbe;
        delete n.dataset.a11yFarbe;
      };
      try {
        mit = await page.screenshot({ fullPage: true, clip: k.box, type: 'png' });
        await el.evaluate(glyphenWeg);
        ohne = await page.screenshot({ fullPage: true, clip: k.box, type: 'png' });
      } catch {
        await el.evaluate(glyphenZurueck).catch(() => {});
        continue;
      } finally {
        await el.evaluate(glyphenZurueck).catch(() => {});
      }

      const lum = await bandLuminanz(page, mit.toString('base64'), ohne.toString('base64'));
      if (!lum) continue; // keine auswertbare Glyphenfläche
      // Textfarbe -> 0..255. ⚠ getComputedStyle liefert fuer alles, was aus
      // color-mix() stammt, die moderne Form `color(srgb 0.95 0.93 0.89 / .92)`
      // — dort sind die Komponenten 0..1, NICHT 0..255. Die alte Fassung las
      // sie roh und hielt cremeweissen Text (243,237,227) fuer 0.95,0.93,0.89,
      // also fuer nahezu Schwarz. Ergebnis: konstant ~1.1:1, und der Wert
      // wurde SCHLECHTER, wenn man den Hintergrund abdunkelte — daran war der
      // Fehler am 08.08.2026 zu erkennen. Betrifft jede Regel mit color-mix().
      const roh = (k.farbe.match(/-?\d*\.?\d+/g) || []).map(Number);
      const skala = /^\s*color\(/i.test(k.farbe) ? 255 : 1;
      // Canvas-Wert zuerst (siehe Sammler), Regex nur als Rueckfall
      const rgb = k.farbeRgb || [(roh[0] || 0) * skala, (roh[1] || 0) * skala, (roh[2] || 0) * skala];
      const textLum = relLum(rgb[0], rgb[1], rgb[2]);
      // Worst Case innerhalb der Glyphenfläche: heller Text leidet am hellsten
      // Hintergrund, dunkler Text am dunkelsten.
      const schlechtester = textLum > lum.p50 ? lum.p90 : lum.p10;
      const ratio = verhaeltnis(textLum, schlechtester);
      const soll = k.gross ? 3.0 : SCHWELLE;
      const ok = ratio >= soll;
      befunde.push({
        text: k.text, tag: k.tag, gross: k.gross, bei: `${Math.round(anteil * 100)}%`,
        ratio: Number(ratio.toFixed(2)),
        ratio_median: Number(verhaeltnis(textLum, lum.p50).toFixed(2)),
        soll, ok,
        // Nur zur Einordnung im Report — der Schatten steht in der Vergleichs-
        // aufnahme mit und ist im Wert bereits berücksichtigt.
        schatten: k.schatten,
        stufe: ok ? 'ok' : 'blocker',
      });
    }
  }
  return befunde;
}

/* ── 3) Hängende Reveals bei reduced-motion ──────────────────────────────── */
async function reduzierteBewegung(browser, url) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'load' });
  await schlafe(1200);
  await durchscrollen(page);
  const haengend = await page.evaluate(() => {
    const raus = [];
    for (const el of document.querySelectorAll('body *')) {
      const t = (el.textContent || '').trim();
      if (!t || t.length < 8) continue;
      if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
      const s = getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden') continue;
      // aria-hidden-Inhalt ist per Definition nicht Teil des Zugaenglichkeits-
      // baums — ein dekoratives Tooltip, dessen Name am Button haengt, ist
      // kein "unsichtbar gebliebener Inhalt".
      if (el.closest('[aria-hidden="true"]')) continue;
      if (Number(s.opacity) < 0.1) raus.push({ ziel: el.tagName.toLowerCase() + (el.className ? `.${String(el.className).split(' ')[0]}` : ''), text: t.replace(/\s+/g, ' ').slice(0, 70) });
      if (raus.length >= 10) break;
    }
    return raus;
  });
  const hatMediaQuery = await page.evaluate(() =>
    [...document.styleSheets].some((ss) => {
      try { return [...ss.cssRules].some((r) => (r.conditionText || '').includes('prefers-reduced-motion')); }
      catch { return false; }
    }));
  await ctx.close();
  return { haengend, hatMediaQuery };
}

/* ── Lauf ─────────────────────────────────────────────────────────────────── */
const { url, stop } = await bereitstellen(ziel);
const browser = await chromium.launch({ headless: true });
const report = { ziel, url, viewports: {}, reducedMotion: null, urteil: 'PASS', blocker: [] };

try {
  for (const [name, viewport] of Object.entries({
    desktop: { width: 1440, height: 900 },
    ...(flag('mobile') ? { mobile: { width: 390, height: 844 } } : {}),
  })) {
    log(`\n▸ ${name} (${viewport.width}x${viewport.height})`);
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const antwort = await page.goto(url, { waitUntil: 'load' });
    if (!antwort || antwort.status() >= 400) throw new Error(`HTTP ${antwort ? antwort.status() : '—'} auf ${url}`);
    await schlafe(1500);

    const hoehe = await durchscrollen(page);
    log(`  durchgescrollt (${hoehe} px) — axe sieht jetzt auch die Reveals`);

    const alleAxe = await axeLauf(page);
    const verstoesse = alleAxe.filter((v) => !v.transient);
    const transient = alleAxe.filter((v) => v.transient);
    log(`  axe: ${verstoesse.length === 0 ? '0 Verstöße' : `${verstoesse.length} Verstoß-Typen`}`);
    for (const v of verstoesse) {
      log(`    ✗ [${v.impact}] ${v.id} — ${v.help} (${v.anzahl}x)`);
      for (const n of v.knoten.slice(0, 2)) log(`        ${n.ziel}`);
    }
    for (const v of transient) log(`    · ${v.anzahl}x ${v.id} an Elementen in Bewegung — nicht bewertbar, im Ruhezustand prüfen`);

    const kontrast = await kontrastPruefung(page);
    const blocker = kontrast.filter((k) => k.stufe === 'blocker');

    log(`  Kontrast über Bild/Canvas: ${kontrast.length} Textstellen gemessen (unter den Buchstaben, nicht im Kasten-Mittel)`);
    for (const k of blocker) log(`    ✗ ${k.ratio}:1 (Soll ${k.soll}) — <${k.tag}> „${k.text}"  [bei ${k.bei}, Median ${k.ratio_median}:1${k.schatten ? ', mit text-shadow' : ''}]`);
    if (!blocker.length) log('    alle über Soll');

    report.viewports[name] = { axe: verstoesse, axeTransient: transient, kontrast };
    if (verstoesse.length) report.blocker.push(`${name}: ${verstoesse.length} axe-Verstoß-Typen`);
    if (blocker.length) report.blocker.push(`${name}: ${blocker.length} Kontrastverstöße über Bild`);
    await ctx.close();
  }

  const rm = await reduzierteBewegung(browser, url);
  report.reducedMotion = rm;
  log(`\n▸ prefers-reduced-motion`);
  log(`  Media-Query vorhanden: ${rm.hatMediaQuery ? 'ja' : 'NEIN'}`);
  log(`  hängende Reveals (unsichtbarer Text): ${rm.haengend.length}`);
  for (const h of rm.haengend) log(`    ✗ ${h.ziel} — „${h.text}"`);
  if (!rm.hatMediaQuery) report.blocker.push('keine prefers-reduced-motion-Regel gefunden');
  if (rm.haengend.length) report.blocker.push(`${rm.haengend.length} Elemente bleiben bei reduced-motion unsichtbar`);
} catch (e) {
  console.error(`\nGate lief nicht: ${e.message.split('\n')[0]}`);
  await browser.close(); stop();
  process.exit(2);
}

await browser.close();
stop();

report.urteil = report.blocker.length ? 'FAIL' : 'PASS';
if (JSON_AUS) console.log(JSON.stringify(report, null, 2));
else {
  log(`\n${'─'.repeat(58)}`);
  log(report.urteil === 'PASS'
    ? '✓ PASS — axe 0, Kontrast über Bild hält, reduced-motion greift.'
    : `✗ FAIL\n  ${report.blocker.join('\n  ')}`);
}
process.exit(report.urteil === 'PASS' ? 0 : 1);
