// Cross-Engine-Smoke: eine Live-URL in Chromium, WebKit und Firefox bei drei Breiten.
// Prüft je Lauf: HTTP-Status, Konsolen- und Seitenfehler, waagerechten Überlauf, nicht geladene Bilder.
// Aufruf:  node cross-engine.mjs <URL> [--pfade=/,/kontakt] [--engines=chromium,webkit,firefox]
// Beleg:   docs/seo/daten/qa/cross-engine-<host>.json (relativ zur Projektwurzel = Ordner über tools/)
// Exit 1, sobald ein Lauf rot ist. Deckt Engines ab, nicht Geräte — ein grüner Lauf ist kein Gerätetest.
import { chromium, webkit, firefox } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith('--'));
if (!url) { console.error('Aufruf: node cross-engine.mjs <URL> [--pfade=/,/kontakt] [--engines=chromium,webkit,firefox]'); process.exit(2); }
const opt = (k, d) => { const a = args.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3).split(',').map((s) => s.trim()).filter(Boolean) : d; };
const pfade = opt('pfade', ['/']);
const engines = opt('engines', ['chromium', 'webkit', 'firefox']);
const profile = [
  { name: 'handy-390', viewport: { width: 390, height: 844 }, mobil: true },
  { name: 'tablet-820', viewport: { width: 820, height: 1180 }, mobil: true },
  { name: 'desktop-1440', viewport: { width: 1440, height: 900 }, mobil: false },
];
const base = url.replace(/\/$/, '');
const laeufe = [];
for (const name of engines) {
  const typ = { chromium, webkit, firefox }[name];
  if (!typ) { console.error(`Unbekannte Engine ${name}`); continue; }
  let browser;
  try { browser = await typ.launch(); } catch (e) { console.error(`✗ ${name}: Browser fehlt — npx playwright install ${name}`); laeufe.push({ engine: name, urteil: 'rot', grund: 'Browser fehlt' }); continue; }
  for (const p of profile) {
    // Firefox kennt weder isMobile noch hasTouch — dort nur die Breite
    const ctx = await browser.newContext({ viewport: p.viewport, ...(p.mobil && name !== 'firefox' ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}) });
    for (const pfad of pfade) {
      const page = await ctx.newPage();
      const fehler = [];
      page.on('console', (m) => m.type() === 'error' && fehler.push(m.text().slice(0, 140)));
      page.on('pageerror', (e) => fehler.push('pageerror: ' + e.message.slice(0, 140)));
      let status = 0;
      try {
        const antwort = await page.goto(base + pfad, { waitUntil: 'networkidle', timeout: 45000 });
        status = antwort?.status() ?? 0;
        await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo({ top: 0, behavior: 'instant' }); });
        await page.waitForTimeout(400);
      } catch (e) { fehler.push('Laden: ' + e.message.slice(0, 140)); }
      const mess = await page.evaluate(() => ({
        ueberlauf: document.documentElement.scrollWidth > innerWidth + 1,
        bilderKaputt: [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && !i.loading).map((i) => i.currentSrc || i.src).slice(0, 5),
      })).catch(() => ({ ueberlauf: null, bilderKaputt: [] }));
      const maengel = [];
      if (status !== 200) maengel.push(`Status ${status}`);
      if (fehler.length) maengel.push(`${fehler.length} Konsolen-/Seitenfehler`);
      if (mess.ueberlauf) maengel.push('waagerechter Überlauf');
      if (mess.bilderKaputt.length) maengel.push(`${mess.bilderKaputt.length} Bild(er) nicht geladen`);
      const urteil = maengel.length ? 'rot' : 'gruen';
      laeufe.push({ engine: name, profil: p.name, pfad, status, urteil, maengel, fehler: fehler.slice(0, 5), bilderKaputt: mess.bilderKaputt });
      console.log(`${urteil === 'gruen' ? '  ok ' : '  ROT'} ${name} · ${p.name} · ${pfad}${maengel.length ? ' — ' + maengel.join(', ') : ''}`);
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
}
const rot = laeufe.filter((l) => l.urteil === 'rot').length;
const wurzel = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const belegDir = path.join(wurzel, 'docs', 'seo', 'daten', 'qa');
await mkdir(belegDir, { recursive: true });
const host = new URL(base).host.replace(/[^a-z0-9.-]/gi, '_');
const beleg = path.join(belegDir, `cross-engine-${host}.json`);
await writeFile(beleg, JSON.stringify({ url: base, erzeugt: new Date().toISOString(), pfade, engines, laeufe }, null, 2));
console.log(`\nERGEBNIS: ${laeufe.length - rot}/${laeufe.length} gruen — Beleg ${path.relative(process.cwd(), beleg)}`);
console.log('⚠ Deckt Engines ab, nicht Geräte. Kein echtes iOS Safari, kein echtes Windows.');
process.exit(rot ? 1 : 0);
