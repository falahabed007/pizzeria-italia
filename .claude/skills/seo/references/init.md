# Workflow: Init

SEO-Projekt initialisieren und den Betrieb einordnen (**Modul 5** des Kurses). Ziel: die `docs/seo/`-Struktur anlegen und eine ehrliche Baseline ziehen — Seiten-Inventar und Framework aus dem Quellcode, dazu die Einordnung des Betriebs (Local/National, Onpage/Offpage, Markt DE/AT/CH) und der Stand der Datenquellen.

⚠ **Der Markt wird hier festgeschrieben und nie angenommen.** Er bestimmt den Länderparameter jeder späteren Abfrage (siehe `datenquelle.md`). Ebenso die NAP-Schreibweise, wenn der Betrieb lokal ist.

⚠ **Gate 0:** Website **und** Google Business Profile müssen erreichbar sein. Fehlt eins, laufen die Stationen Local, Technik, Messen und Audit leer — das wird jetzt gesagt, nicht sechzig Seiten später.

**Wissen laden:** `strategy.md` (4-Phasen-Roadmap für die erste `STRATEGIE.md`). **Datenwege:** ausschließlich `datenquelle.md` — **A** Repo primär, **B** gerendertes HTML optional, **E** GSC-Status, **S** nur zur Verbindungsprüfung (Station 1).

> **Grundsatz:** Init liest nur, scannt und legt Gerüste an — es ändert **keinen** Seiten-Code. Alle sechs `docs/seo/`-Dateien werden **immer** angelegt (auch die, auf die erst spätere Workflows schreiben), damit kein anderer Workflow ins Leere greift.

## Kontext

1. Prüfen, ob `docs/seo/PROJEKT.md` im Arbeitsverzeichnis existiert.
   - **Existiert es:** Projekt ist bereits initialisiert. Nicht überschreiben — kurz melden und stattdessen `/seo:audit` oder `/seo:keywords` empfehlen. (Bewusster Re-Init nur auf ausdrückliche Bitte, und dann nur fehlende Dateien ergänzen, nie vorhandene löschen.)
   - **Existiert es nicht:** Das ist der richtige Workflow — weiter mit der Datenbeschaffung.
2. Liegt `docs/seo/EINRICHTUNG.md` vor (aus `/seo:setup`): Framework, Seitenordner, Live-URL, Ziel-Domain,
   Markt, NAP, Leistungen, Einzugsgebiet, Zielgruppe, Wettbewerber, Datenquellen-Stand, Build/Hosting und
   Arbeitsweise **von dort übernehmen — nichts davon erneut fragen.** Gefragt wird nur, was dort fehlt.
   Die Einordnung (Local/National, Onpage/Offpage, Gate 0) bleibt Aufgabe dieser Station. Alle Angaben
   aus `EINRICHTUNG.md` wandern in `PROJEKT.md` (Abschnitte „Betrieb", „Datenquellen", „Bauen und
   Veröffentlichen", „Arbeitsweise" zusätzlich zur Vorlage unten); danach `EINRICHTUNG.md` löschen —
   ab jetzt ist `PROJEKT.md` die einzige Quelle, zwei Stände wären ein Fehler.

## Datenbeschaffung (aus datenquelle.md)

- **A (Repo, primär):** Der Quellcode ist die genaueste, kostenlose Baseline. Seiten-Inventar per `Glob`, gemeinsames Head/Layout lesen (dort sitzt die Meta-Logik), `astro.config.*`/`public/` prüfen.
- **B (gerendertes HTML, optional):** Nur wenn ein Dev-/Preview-Build läuft und schon ein erster Motion-Check gewünscht ist — sonst dem `audit`-Workflow überlassen.
- **E (GSC, optional):** **Kein Pflicht-Pull.** Standard ist „nicht verbunden". Liegt bereits eine CSV unter `docs/seo/gsc/` (siehe `datenquelle.md E`), darf init die Top-Seiten/-Queries als Startpunkt einlesen — ansonsten bleibt der Status offen und ehrlich.

## Schritt 1 — Seiten-Inventar aus dem Repo (datenquelle.md A)

`Glob` auf die Routen des erkannten Frameworks:
- **Astro:** `src/pages/**/*.{astro,md,mdx}` + Content-Collections (`src/content/**`).
- **Next:** `app/**/page.*` bzw. `pages/**`. **Nuxt:** `pages/**`. **SvelteKit:** `src/routes/**`. **Plain:** `*.html`.

Pro Route den Pfad in eine URL übersetzen (z. B. `src/pages/leistungen.astro` → `/leistungen`). Ergebnis: eine Liste aller Seiten mit Route-Pfad und (soweit ohne Tiefenanalyse ableitbar) Titel-Hinweis. Der volle Meta-/Struktur-Check ist Sache von `audit` — hier reicht das Inventar.

## Schritt 2 — Framework, `site`-URL & Head-Logik (datenquelle.md A)

1. **Framework erkennen:** anhand von `astro.config.*` / `next.config.*` / `nuxt.config.*` / `svelte.config.*` bzw. `package.json`-Dependencies. In `PROJEKT.md` festhalten.
2. **`site`-URL & Sitemap:** In `astro.config.*` prüfen, ob `site` gesetzt ist (Pflicht für absolute URLs/Sitemap) und ob `@astrojs/sitemap` integriert ist. Bei anderen Frameworks die jeweilige Basis-URL-Config lesen.
3. **Head/Layout lesen:** gemeinsames Layout/Head-Component (`src/layouts/**`, `BaseHead.astro`, `src/components/**Head*`) — Title-Template, OG/Twitter, Canonical, globales JSON-LD. Nur inventarisieren („vorhanden/fehlt"), nicht bewerten.
4. **Crawl-Artefakte prüfen:** `public/robots.txt`, `public/llms.txt`, generierte `sitemap*.xml`. Für jedes: vorhanden ja/nein.

## Schritt 3 — Datenquellen-Status feststellen (datenquelle.md S + E)

**S (SISTRIX):** Sind `sistrix`-Tools in der Session verfügbar? Wenn ja → Verbindung mit einer Zahl
belegen, die nur die Software kennt (Sichtbarkeitsindex einer bekannten Domain), und den Status
notieren. Wenn nein → dem User sagen, dass der Connector über `/mcp` autorisiert werden muss, und
den Status auf „nicht verbunden" setzen. **Solange gilt für jede Zahl `[grob geschätzt]`.**

**E (GSC):**
- CSV unter `docs/seo/gsc/*.csv` vorhanden? → Status „CSV: <Datum>", die Datei als Nachfrage-/Positions-Startpunkt lesen.
- Nichts vorhanden? → Status „nicht verbunden". ⚠ **Und die Zeitfalle ansagen:** Eine frische
  Property zeigt tagelang nichts und wochenlang wenig. Wer sie erst braucht, wenn gemessen werden
  soll, wartet dann. Deshalb **jetzt** einrichten, nicht später (Kurs, Modul 15).

⚠ **Der Markt wird hier abgefragt und festgeschrieben** (DE/AT/CH). Er bestimmt den Länderparameter
jeder späteren Abfrage. **Nie Deutschland annehmen** — die falschen Zahlen sehen plausibel aus.

## Schritt 4 — `docs/seo/` anlegen (alle Dateien)

`docs/seo/` (und bei GSC-Nutzung `docs/seo/gsc/`) anlegen und **alle** Dateien anlegen — die meisten
zunächst als leeres Gerüst. So findet jeder spätere Workflow seine Zieldatei vor.

| Datei | Template unten | Entsteht inhaltlich in |
|---|---|---|
| `PROJEKT.md` | ✅ | hier (Station 0) |
| `PIPELINE.md` | Vorlage in `pipeline.md` | `/seo:pipeline` |
| `KEYWORDS.md` | ✅ | `/seo:keywords` (M7) |
| `MAPS-PLAN.md` | Vorlage in `maps.md` | `/seo:maps` (M8) |
| `SEITENBAUM.md` | Vorlage in `seitenbaum.md` | `/seo:seitenbaum` (M9) |
| `LOCAL-CHECK.md` | Vorlage in `local.md` | `/seo:local` (M10) |
| `CLUSTER-MAP.md` | ✅ | `/seo:keywords`, `/seo:seitenbaum` |
| `STRATEGIE.md` | ✅ | `/seo:strategy` |
| `KONKURRENZ.md` | ✅ | `/seo:compete` |
| `OFFPAGE.md` | Vorlage in `offpage.md` | `/seo:offpage` (M16/17) |
| `RANKING-LOG.md` | ✅ | `/seo:track` (M15) |

Bei einem **nicht-lokalen** Betrieb entfallen `MAPS-PLAN.md`, `SEITENBAUM.md` und `LOCAL-CHECK.md` —
das wird in `PIPELINE.md` als begründet übersprungen vermerkt, nicht stillschweigend weggelassen.

---

### File-Templates

#### PROJEKT.md

```markdown
# SEO-Projekt: [Domain]

## Konfiguration
- **Domain:** [domain]
- **`site`-URL:** [aus astro.config o. ä. — oder „nicht gesetzt (Warnung: keine absoluten URLs/Sitemap)"]
- **Framework:** [Astro / Next / Nuxt / SvelteKit / plain HTML]
- **Sitemap:** [@astrojs/sitemap integriert / statische sitemap.xml / fehlt]
- **robots.txt:** [vorhanden / fehlt]
- **llms.txt:** [vorhanden / fehlt]
- **GSC-Status:** nicht verbunden — SERP-Checks + optional CSV (später nachrüstbar, siehe datenquelle.md E)

## Seiten-Inventar
[Aus dem Repo-Scan, Schritt 1. Primary-Keyword bleibt leer bis /seo:keywords.]

| URL | Route-Datei | Titel-Hinweis | Primary-Keyword | Notizen |
|-----|-------------|---------------|-----------------|---------|
| / | src/pages/index.astro | Homepage | — | |
| /leistungen | src/pages/leistungen.astro | Leistungen | — | |

## Aktuelle Prioritäten
1. `/seo:audit` — Ist-Zustand + Quick-Wins + Motion-Check
2. `/seo:keywords` — Keyword-DB und Cluster-Map aufbauen
3. [weitere nach Audit-Befund]

## Zuletzt aktualisiert
[Datum der Initialisierung]
```

#### KEYWORDS.md

```markdown
# Keyword-Datenbank

> Leeres Gerüst — wird von `/seo:keywords` befüllt. **Diese Datei ist die Datenbank:** jedes geclusterte Keyword ist eine Zeile, die Streichliste ist ein Abschnitt hier drin. `abgleich.py` liest genau diese Überschriften. Gemessene Köpfe tragen `[gut geschätzt]`, Long-Tails `[grob geschätzt]`, GSC-Zahlen `[gemessen]` — nie eine Zahl ohne Stufe.

## Überblick
- **Keywords gesamt:** 0 — davon 0 gemessen
- **Cluster:** 0
- **SISTRIX-Abfragen verbraucht:** 0 von 40 · **Autocomplete-Abfragen:** 0 (kostenlos)
- **Streichliste:** 0 Zeilen

## Die gemessenen Keywords (0)

| Keyword | Volumen/Mon. | Wettbewerb | Absicht | Kaufphase | Cluster |
|---------|--------------|------------|---------|-----------|---------|

## Die Datenbank — alle 0 Keywords

| Keyword | Cluster | Absicht | Kaufphase | Volumen/Mon. | Stufe | Ziel-Seite |
|---------|---------|---------|-----------|--------------|-------|-----------|

## Streichliste — 0 Zeilen, Grund je Zeile

| Keyword | Seed / Quelle | Grund |
|---------|---------------|-------|

## Zuletzt aktualisiert
[Datum]
```

#### CLUSTER-MAP.md

```markdown
# Cluster-Map (Keyword → Seite)

> Leeres Gerüst — wird von `/seo:keywords` befüllt. Regel: **ein** Primary-Keyword pro Seite, nie dasselbe Primary auf zwei Seiten (Kannibalisierung → `strategy.md`). GSC-Spalten nur füllen, wenn CSV vorliegt — sonst leer lassen.

## Zuordnung

| Seite | Primary-Keyword | Sekundär-Keywords | Intent | Nachfrage (rel.) | Position | GSC-Klicks* | GSC-Impressionen* |
|-------|-----------------|-------------------|--------|------------------|----------|-------------|-------------------|

\* nur falls GSC-CSV vorhanden.

## Content-Lücken (Keyword ohne Seite)

| Keyword | Nachfrage (rel.) | Difficulty (Schätzung) | Vorgeschlagener Seitentyp | Priorität (H/M/N) |
|---------|------------------|------------------------|---------------------------|-------------------|

## Kannibalisierungs-Risiken (zwei Seiten, ein Keyword)

| Keyword | Seite 1 | Seite 2 | Empfohlene Aktion |
|---------|---------|---------|-------------------|

## Zuletzt aktualisiert
[Datum]
```

#### STRATEGIE.md

```markdown
# SEO-Strategie

> Erstbefüllung anhand der 4-Phasen-Roadmap aus `references/strategy.md`.

## Status
- **Phase:** Initialisierung
- **Gesamtbild:** [kurze Einschätzung aus dem Repo-Scan]
- **Leit-KPI:** [z. B. Top-10-Keywords, sobald messbar]

## Prioritäten

### Phase 1 — Quick-Wins
1. [aus Audit-Befund, z. B. fehlende Meta/Sitemap]
2. …

### Phase 2 — Content-Lücken
1. [aus CLUSTER-MAP nach /seo:keywords]

### Phase 3 — Wachstum
1. [längerfristig]

## Redaktionsplan

| Zeitraum | Content | Ziel-Keyword | Typ | Status |
|----------|---------|--------------|-----|--------|

## Audit-Historie
[Datierte Notizen aus /seo:audit — Scores + Kernbefunde.]

## KPIs & Ziele
- [Metrik]: [Ist] → [Ziel] (bis [Datum])

## Zuletzt aktualisiert
[Datum]
```

#### KONKURRENZ.md

```markdown
# Wettbewerbsanalyse

> Leeres Gerüst — wird von `/seo:compete` (und `/seo:keywords`) befüllt. Daten aus SERP-Checks (datenquelle.md D, best effort via Playwright, sonst manuell) und Wettbewerber-HTML (curl). Keine erfundenen Metriken.

## Wettbewerber-Profile

| Wettbewerber | Domain | Stärken | Schwächen | Beobachtet am |
|--------------|--------|---------|-----------|---------------|

## Keyword-Lücken (Wettbewerber rankt, wir nicht)

| Keyword | Unsere Position | Wettbewerber-Position | Lücke | Aktion |
|---------|-----------------|-----------------------|-------|--------|

## SERP-Features je Keyword

| Keyword | Featured Snippet | PAA | AI Overview | Local/Image/Video-Pack |
|---------|------------------|-----|-------------|------------------------|

## Zuletzt aktualisiert
[Datum]
```

#### RANKING-LOG.md

```markdown
# Ranking-Verlauf

> Leeres Gerüst — wird von `/seo:track` befüllt. Datierte Snapshots aus SERP-Checks (datenquelle.md D) und/oder GSC-CSV (datenquelle.md E). Ohne GSC ist „Position unbekannt" eine gültige, ehrliche Angabe.

## Snapshots

### [Datum] — Baseline
- **Quelle:** [SERP-Check / GSC-CSV / keine]
- **Notiz:** Projekt initialisiert, noch keine Positionsdaten erhoben.

| Keyword | Ziel-Seite | Position | Quelle | Veränderung ggü. Vorwoche |
|---------|-----------|----------|--------|---------------------------|

## Trends
[Gewinner / Verlierer, sobald ≥ 2 Snapshots existieren.]

## Zuletzt aktualisiert
[Datum]
```

## Output

Nach dem Anlegen eine knappe Zusammenfassung:

1. **Projekt-Überblick** — Domain, `site`-URL-Status, Framework, Anzahl Seiten.
2. **Baseline-Befund** — vorhandene/fehlende Crawl-Artefakte (Sitemap, robots.txt, llms.txt), Head-Meta-Logik vorhanden ja/nein.
3. **GSC-Status** — Standard „nicht verbunden"; Hinweis, dass CSV-Export jederzeit nachrüstbar ist (datenquelle.md E).
4. **Empfohlene nächste Schritte** — in der Regel `/seo:audit` (Ist-Zustand), dann `/seo:keywords` (Keyword-Fundament).

## Dateien aktualisieren

Alle sechs Dateien werden von diesem Workflow **angelegt**:

| Datei | Aktion |
|-------|--------|
| `docs/seo/PROJEKT.md` | Angelegt (mit Baseline-Daten) |
| `docs/seo/KEYWORDS.md` | Angelegt (leeres Gerüst) |
| `docs/seo/CLUSTER-MAP.md` | Angelegt (leeres Gerüst) |
| `docs/seo/STRATEGIE.md` | Angelegt (Phase „Initialisierung") |
| `docs/seo/KONKURRENZ.md` | Angelegt (leeres Gerüst) |
| `docs/seo/RANKING-LOG.md` | Angelegt (Baseline-Snapshot) |
