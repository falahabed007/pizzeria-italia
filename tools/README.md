# Prüfwerkzeuge

Alle Werkzeuge laufen aus der Projektwurzel (dem Ordner über `tools/`). Belege gehören nach
`docs/seo/daten/qa/` — der Cross-Engine-Smoke schreibt sein JSON selbst dorthin, das a11y-Gate meldet auf der
Konsole und wird bei Bedarf mit `| tee docs/seo/daten/qa/a11y-<seite>.log` festgehalten.

## Einmalig installieren

```bash
cd tools
npm install
npx playwright install chromium webkit firefox
cd ..
```

## a11y-Gate (Barrierefreiheit, Kontrast über Bildern, reduced-motion)

```bash
node .claude/skills/a11y-audit/scripts/a11y-gate.mjs https://deine-domain.de/ --mobile
```

Eine URL je Aufruf. Für mehrere Seiten eine Schleife:

```bash
for p in / /leistungen /kontakt; do node .claude/skills/a11y-audit/scripts/a11y-gate.mjs "https://deine-domain.de$p" --mobile; done
```

Exit-Code 0 = bestanden. Das Gate scrollt die Seite durch, lässt axe laufen, misst den Kontrast von Text
über Bildern unter den Buchstaben und prüft, dass bei `prefers-reduced-motion` nichts unsichtbar bleibt.

## Cross-Engine-Smoke (Chromium, WebKit, Firefox × drei Breiten)

```bash
cd tools && node cross-engine.mjs https://deine-domain.de --pfade=/,/leistungen,/kontakt
```

Prüft je Engine und Breite: HTTP-Status, Konsolen- und Seitenfehler, waagerechten Überlauf, nicht geladene
Bilder. Beleg als JSON. Exit 1 bei Rot. Deckt Engines ab, nicht Geräte: kein echtes iOS Safari, kein
echtes Windows. Für echte Geräte bleibt der Blick aufs Handy Pflicht.

## Lighthouse (Performance)

```bash
npx lighthouse@13 https://deine-domain.de/ --preset=perf --form-factor=mobile --screenEmulation.mobile --output html --output-path docs/seo/daten/qa/lighthouse-mobil.html --chrome-flags="--headless=new"
```

Werte schwanken zwischen Läufen um bis zu zehn Punkte. Nie aus einem einzelnen Lauf urteilen, immer zwei
oder drei, und die Zahl mit Datum in `docs/seo/` festhalten. PageSpeed Insights (pagespeed.web.dev) ist
dieselbe Messung auf Googles Rechnern und gilt als Referenz.
