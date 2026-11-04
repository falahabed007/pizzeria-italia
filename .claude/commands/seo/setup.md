---
description: SEO-Skills einrichten — Fragen stellen, docs/seo/EINRICHTUNG.md anlegen, Werkzeuge prüfen
---

Richte die SEO-Skills für dieses Repository ein. Lies zuerst `SETUP.md` in der Projektwurzel (die Fragen).
⚠ Dieser Befehl ist die **Einrichtung**, nicht Station 0 des Kurses: er legt **keine** `docs/seo/PROJEKT.md`
an — das tut `/seo:init`, wie im Kurs gezeigt, und übernimmt dabei die Antworten aus `EINRICHTUNG.md`. Dann:

1. **Erkennen, was sich erkennen lässt** — bevor du fragst: Framework (`astro.config.*`, `next.config.*`,
   `nuxt.config.*`, `svelte.config.*`, `package.json`), Seitenordner, Build-Befehl und Ausgabeordner aus
   `package.json`, Hosting-Hinweise (`netlify.toml`, `vercel.json`, `.github/workflows`), vorhandene
   `robots.txt`, `sitemap.xml`, `llms.txt`, Live-URL aus der Framework-Konfiguration. Existiert schon
   `docs/seo/EINRICHTUNG.md` oder `docs/seo/PROJEKT.md`, lies sie und frage nur nach, was fehlt.

2. **Alle offenen Fragen in EINEM Block stellen**, gegliedert wie `SETUP.md` (A Projekt · B Betrieb ·
   C Datenquellen · D Arbeitsweise · E Werkzeuge). Erkanntes als Vorschlag mit „bestätigen oder ändern"
   nennen, nicht erneut fragen. Keine Frage, deren Antwort im Repository steht.

3. **Antworten prüfen, nicht nur übernehmen:** Live-URL aufrufen (Status, Titel), NAP auf Vollständigkeit,
   SISTRIX-MCP auf Erreichbarkeit (ein Testaufruf; ist der Server in `.mcp.json` noch nicht angemeldet, den Nutzer auf
   `/mcp` → `sistrix` → Login hinweisen und in `EINRICHTUNG.md` „SISTRIX: angebunden, Login ausstehend" eintragen — kein Abbruch).

4. **`docs/seo/EINRICHTUNG.md` schreiben** mit genau diesen Abschnitten: „Projekt" (Framework,
   Seitenordner, Live-URL heute, Ziel-Domain, Markt DE/AT/CH), „Betrieb" (NAP als Block, Leistungen,
   Einzugsgebiet mit Zahl der Standorte, Zielgruppe, drei Wettbewerber), „Datenquellen" (SISTRIX
   verbunden / angebunden-Login ausstehend / nein, GSC ja/nein, Unternehmensprofil ja/nein/unbestätigt),
   „Bauen und Veröffentlichen" (Build-Befehl, Ausgabeordner, Hosting), „Arbeitsweise" (Sprache,
   Freigabe-Modus, Bildquelle), „Werkzeuge" (Stand aus Schritt 5), „Befunde" (was beim Prüfen auffiel,
   z. B. tote Sitemap-Verweise, fremde Live-URL). Datum setzen. Umlaute ä ö ü ß, nie ae/oe/ue/ss.
   Keine weiteren Dateien unter `docs/seo/` anlegen — das ist Station 0.

5. **Werkzeuge prüfen:** `tools/node_modules` vorhanden? Sonst `cd tools && npm install && npx playwright
   install chromium webkit firefox` vorschlagen und nach Zustimmung ausführen. Danach ein Probelauf:
   `node .claude/skills/a11y-audit/scripts/a11y-gate.mjs <LIVE-URL> --mobile` aus der Projektwurzel.
   Läuft er nicht, die Fehlermeldung im Klartext erklären und den Fix nennen — ein Gate, das nicht läuft,
   ist schlimmer als keins.

6. **Abschluss:** in drei Sätzen sagen, was jetzt eingerichtet ist, was noch fehlt (z. B. Search Console),
   und dass der nächste Befehl `/seo:init` ist (Station 0 wie im Kurs — legt `PROJEKT.md` und die
   Projektdateien an und nimmt die Antworten aus `EINRICHTUNG.md`); alternativ `/seo:pipeline`, das
   ebenfalls bei Station 0 beginnt. `/seo:init` nicht selbst ausführen.

Arbeitssprache Deutsch. Nichts außerhalb des Repositories anfassen. Keine Zugangsdaten in Dateien
schreiben — Schlüssel gehören in die Umgebung oder in die MCP-Konfiguration von Claude Code.
