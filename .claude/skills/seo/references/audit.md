# Workflow: Audit

Deckt **zwei** Kursmodule ab: den Technik-Check aus **Modul 14** und den vollständigen
SEO-Audit aus **Modul 18**.

## Umfang: die Abnahme — ein Lauf, zwei Stationen

- **`/seo:audit`** ohne Zusatz: **die Abnahme.** Technik-Check (Modul 14, Station 9) und die sieben
  Kurs-Schritte (Modul 18, Station 12) in **einem** Lauf, sobald der Bau steht (nach Station 8).
  Ablauf: Prüfgruppen, Score, **Technik-Rohbefunde — dort hält er an**, ungeordnet, und beendet den
  Turn; die Triage (umsetzen / später / ignoriert, mit Grund) läuft erst auf „jetzt sortieren". Danach
  Schritt 1 und 3–7 **aus den Dateien**: Ausgangslage aus `PROJEKT.md`, Onpage aus Station 6–8, die
  Lücke aus `KONKURRENZ.md`, Local aus Station 5 — nichts wird neu erhoben. Kapitel ohne Daten stehen
  mit Vermerk drin: „Messen — noch keine Zahl, Property seit …" · „Offpage — gesperrt bis Stagnation,
  Vorarbeit in Station 11". Schreibt Station 9 **und** 12 fort; der Maßnahmenplan ist der Ort, an dem
  die offenen Notizen aus Gate 8 und 9 abgearbeitet werden — die Umsetzung ist der nächste Handgriff
  des Nutzers, nicht Teil des Laufs.
- **`/seo:audit technik`** (auch „nur Technik", „Station 9"): **nur** der Technik-Teil — für den Fall,
  dass die sieben Schritte bewusst später kommen sollen. Keiner der sieben Schritte wird angefasst.

⚠ **Warum ein Lauf:** Auf einer Seite, die Station für Station selbst gebaut wurde, findet ein
zweites Audit nach Messen und Offpage nichts, was das erste nicht fand — Station 10 hat vor der
ersten Zahl nichts zu berichten, Station 11 ist bis zur Stagnation gesperrt. Ein zweiter voller Lauf
hat genau zwei Anlässe: **eine fremde Seite** (dort ist das Audit der erste Schritt, nicht der letzte)
oder **drei Monate nach der Abnahme**, mit Zahlen aus der Search Console.

Welcher Umfang läuft, steht als erste Zeile der Antwort.

---

## Der Kurs-Audit in sieben Schritten (Modul 18)

Immer in dieser Reihenfolge, dann wird kein Bereich übersehen.

| # | Schritt | Kernfrage | Daten |
|---|---------|-----------|-------|
| 1 | **Ausgangslage und Ziele** | Wo steht die Seite, wohin soll sie? | GSC `[gemessen]` + SISTRIX `domain.visibilityindex` `[gut geschätzt]`. Ohne beides: `site:domain.de` als grober Indexcheck `[grob geschätzt]` |
| 2 | **Technik-Check** | Kann die Seite gefunden und schnell geladen werden? | PageSpeed Insights (CWV), Crawl (Statuscodes 200/301/404, Weiterleitungsketten), `robots.txt`, Sitemap |
| 3 | **Onpage-Check** | Eigener Title und eigene Description je Seite? Überschriften sauber? Beantwortet der Text die Frage? Duplicate Content? | Repo/gerendertes DOM |
| 4 | **Keyword- und Wettbewerbs-Check** | Wonach sucht die Zielgruppe, deckt die Seite das ab? Wofür stehen 2–3 Konkurrenten oben und wir nicht? | SISTRIX `domain.opportunities`, `domain.competitors.seo`, `domain.ideas` |
| 5 | **Offpage und E-E-A-T** | Verweisen seriöse Seiten hierher? Sind die Vertrauenssignale sichtbar? | SISTRIX `links.*` + Check aus `offpage.md` |
| 6 | **Local-Check** (nur lokal) | GBP vollständig? NAP überall gleich? Decken sich Maps-Kategorien mit der Website-Struktur? | `local.md` + `MAPS-PLAN.md` gegen `SEITENBAUM.md` |
| 7 | **Priorisierter Maßnahmenplan** | Was zuerst? | alle Funde |

### Die Sortierregel für Schritt 7
1. **Was Sichtbarkeit überhaupt erst möglich macht** — eine wichtige Seite auf `noindex`, ein
   gesperrter Googlebot, eine fehlende Seite zur Hauptleistung.
2. **Was viele Seiten auf einmal betrifft** — Titles, Ladezeit, interne Links.
3. **Einzelfälle.** Ein 404 auf einer alten Pressemeldung wandert nach unten, auch wenn das Tool
   ihn rot markiert.

Jede Maßnahme in **Klartext ohne Fachchinesisch**: „Ladezeit halbieren, damit weniger Besucher
abspringen" — nicht „LCP-Optimierung".

⚠ **Schritt 6 wird bei lokalen Betrieben nie übersprungen.** Der Abgleich Maps ↔ Website ist der
Punkt, an dem sich bei fast jedem Betrieb etwas findet.

⚠ Ein Katalog mit 120 Findings ist nur so viel wert wie die Entscheidung, welche drei davon zählen.
Die Automatisierung nimmt die Fleißarbeit ab, nicht das Urteil.

---

## Der Technik-Check im Detail (Modul 14)

On-Page-, Technical- und Motion-SEO-Check für eine Site — **vor jedem Launch** (Teil von `deploy-checklist`, dessen SEO-Gate hierher verweist) oder on demand. Read-only: prüfen und berichten; fehlende Artefakte (Meta, Sitemap, robots.txt, JSON-LD) nur nach Zustimmung generieren. Output: pro Seite ein RankMath-artiger Score (0–100) und eine kurze, priorisierte Fix-Liste.

**Wissen laden:** `seo-expertise.md` (Checklisten, Schema, Media) + `ai-search.md` (GEO/AI-Overviews). **Datenwege:** ausschließlich `datenquelle.md` — **A** Repo, **B** gerendertes HTML, dazu **S** (Sichtbarkeit, Keyword-Bestand, Lücken) und **E** (GSC-Ausgangslage) für die Schritte 1 und 4 des Kurs-Audits.

## Kontext

1. `docs/seo/PROJEKT.md` lesen (Domain, `site`-URL, Framework, Seiten-Inventar, Prioritäten). Fehlt es → `/seo:init` empfehlen und stoppen.
2. `docs/seo/CLUSTER-MAP.md` lesen, falls vorhanden — dann kann pro Seite gegen das **Ziel-Keyword** geprüft werden (Title/H1/Intent-Fit), nicht nur formal.

## Datenbeschaffung (aus datenquelle.md)

- **A (Repo):** Seiten-Inventar + Head/Layout-Logik + Config zuerst. Das ist die maßgebliche Quelle.
- **B (gerendertes HTML):** Läuft ein Dev-/Preview-Build, `curl -sL` für den statischen DOM (Motion-Check) und bei Bedarf Playwright für JS-injiziertes JSON-LD.

## Prüfgruppen

### 1. META — 25
- **Title** ≤ ~60 Zeichen (Pixel, nicht stur Zeichen), Keyword vorne, pro Seite einzigartig, CTR-orientiert. Brand am Ende (`| Marke`).
- **Meta-Description** ~150–160 Zeichen, handlungsorientiert, einzigartig, vollständiger Satz.
- **Open Graph** (`og:title/description/type/url/image`) **und** Twitter Cards (`twitter:card=summary_large_image` + title/description/image).
- **Genau ein OG-Bild** pro Seite, ~1200×630, **absolute** URL.
- **lang/locale:** `<html lang>` gesetzt, `og:locale` (z. B. `de-DE`).

### 2. STRUKTUR — 20
- **Genau eine `<h1>`** pro Seite, Hierarchie ohne Sprünge (kein H2 → H4).
- **Sprechende URLs** (kebab-case, keine IDs/Parameter), interne Verlinkung mit aussagekräftigen Ankertexten (nicht „hier klicken").
- **Keyword-Fit:** H1/Title tragen das Ziel-Keyword der Seite (aus CLUSTER-MAP); keine zwei Seiten mit demselben Primary-Keyword (Kannibalisierung → `strategy.md`).
- **Breadcrumbs**, wo die Seitentiefe es rechtfertigt (+ BreadcrumbList unten).

### 3. STRUCTURED DATA (JSON-LD) — 15
- Passend zum Seitentyp: **Organization** + **WebSite** global, **BreadcrumbList** bei Unterseiten, **Article/BlogPosting** (Blog), **Service** (Leistungsseite), **Product** (Shop). Schema-Tabelle + Deprecations (HowTo/FAQPage) in `seo-expertise.md`.
- Als `<script type="application/ld+json">`, valide, konsistente URLs/`@id`. **Schema-Regel beachten** (datenquelle.md B): nie „kein Schema" allein aus statischem curl schließen.

### 4. CRAWLING / INDEXING — 15
- **`sitemap.xml`** vorhanden (Astro: `@astrojs/sitemap`) und in `robots.txt` referenziert.
- **`robots.txt`** vorhanden, blockiert nichts versehentlich (v. a. nicht CSS/JS).
- **Canonical** pro Seite (selbstreferenzierend, absolut).
- **`noindex` nur bewusst** (Danke-/Preview-Seiten) — nie auf Live-Seiten.
- **hreflang** nur bei echter Mehrsprachigkeit (paarweise + `x-default`).
- **`llms.txt`** im Root für AI-Crawler (Kurzbeschreibung + wichtigste Seiten) — Details `ai-search.md`.

### 5. MEDIA — 10
- **Alt-Texte** aussagekräftig (nie „Bild"/„image"); dekorative Bilder `alt=""`.
- **Lazy-Loading** below-the-fold; das **LCP-Bild** explizit **nicht** lazy, ggf. `fetchpriority="high"`.
- **AVIF/WebP** mit Fallback (House-Reihenfolge AVIF → WebP → JPG), `width`/`height` gegen CLS.

### 6. MOTION-CONTENT-IM-HTML — 10 (der entscheidende Check)
- **Wichtige Inhalte müssen als echtes HTML im DOM stehen** — nicht nur in Canvas/WebGL/JS gerendert oder in Bilder eingebacken. Headlines, Fließtext, CTAs, Nav = echte `<h1>`/`<p>`/`<a>`.
- **Konkret:** Bei Canvas-Sequenz-/Scrollytelling-Heros (CanvasSequence, GSAP-Pinning) liegen die Beat-Texte als **HTML-Overlay** vor, **nicht** im Bild. Suchmaschinen/LLMs „sehen" Canvas-Pixel nicht.
- **Test (datenquelle.md B):** `curl -sL` auf den Dev-Build (JS noch nicht ausgeführt) — sind H1, Kerntext und Links da? Erscheint der Hero-Text nur per Client-Island, ist das ein **Fail**.
- Gegen den `prefers-reduced-motion`-Fallback aus `a11y-audit` gegenprüfen — die statische Alternative ist oft auch die crawlbare.

### 7. PERFORMANCE-SEO — 5
- **Core Web Vitals** als Ranking-Signal: **LCP** < 2,5 s, **INP** < 200 ms, **CLS** < 0,1. Hier nur feststellen, ob SEO-tauglich; der Budget-/Tiefencheck läuft über `deploy-checklist`.

### 8. AI-SEARCH-READINESS (Querschnitt, fließt in 3/4/6 ein)
- Kerninhalt zitierbar strukturiert (direkte Antworten früh, Listen/Tabellen, klare Definitionen) — Citability-Regeln in `ai-search.md`. Fehlt crawlbarer HTML-Content (Gruppe 6), ist die Seite auch für AI-Overviews unsichtbar.

### 9. ASTRO-SPEZIFISCH (bei Astro-Projekten)
- **`@astrojs/sitemap`** integriert, `site` in `astro.config.*` gesetzt (sonst keine absoluten URLs/Sitemap).
- **Content-Collections:** SEO-Metadaten (`title`, `description`, `ogImage`, `pubDate`) im Schema und ans Layout durchgereicht.
- **`astro:assets` / `<Image>`** für dimensionierte, optimierte Bilder (AVIF/WebP, CLS-frei).

## Score (RankMath-artig, 0–100)

Pro Seite punkten; Summe = Score:

| Gruppe | Punkte |
|--------|:------:|
| META | 25 |
| STRUKTUR | 20 |
| STRUCTURED DATA | 15 |
| CRAWLING/INDEXING | 15 |
| MEDIA | 10 |
| MOTION-CONTENT-IM-HTML | 10 |
| PERFORMANCE-SEO | 5 |

**Richtwerte:** 90–100 launch-ready · 70–89 ok mit Fixes · < 70 vor Launch nachbessern. **Fehlt crawlbarer Kerninhalt (Gruppe 6), deckelt das den Score hart** — eine schöne, aber für Suchmaschinen leere Seite ist kein Pass.

## Output-Format

- **Pro Seite:** Score `0–100` + 1-Satz-Einordnung.
- **Priorisierte Fixes** (Hoch → Niedrig), jeder konkret: nicht „Meta verbessern", sondern z. B. „`/leistungen`: Title 78 Z. → auf ≤ 60 kürzen, Keyword nach vorn" oder „Hero-Headline liegt nur im Canvas → als `<h1>`-Overlay ins DOM heben".
- **Site-weite Funde** separat (fehlende Sitemap, kein `site` in Config, kein `llms.txt`).
- **Optional (nach Zustimmung):** fehlende Meta-Tags / Sitemap-Integration / robots.txt / JSON-LD direkt generieren (via `datenquelle.md F` — Claude selbst).

## Dateien aktualisieren

- Audit-Ergebnis + Datum + Scores als Notiz in `docs/seo/STRATEGIE.md` (Abschnitt „Audit-Historie").
- Gefundene Content-/Keyword-Lücken in `docs/seo/CLUSTER-MAP.md` nachtragen.
- Bekannte Positionen (aus SERP-Check) in `docs/seo/KEYWORDS.md`.

---

# Der SEO-Audit in sieben Schritten (Modul 18)

Der Abschluss-Workflow des Kurses. Der technische Score oben ist ein **Teil** davon (Schritt 2).
Die sieben Schritte werden **immer in dieser Reihenfolge** abgearbeitet, dann wird kein Bereich
übersehen und am Ende steht ein konkreter Maßnahmenplan.

## Schritt 1 — Ausgangslage und Ziele klären
Erst verstehen, wo die Seite steht und wohin sie soll — **dann** in ein Tool schauen.
Was ist das Ziel: mehr Anfragen, mehr Termine, mehr Umsatz in einer bestimmten Leistung?

- Objektives Bild: **Google Search Console** — für welche Begriffe erscheint die Seite heute,
  wie oft geklickt, auf welchen Positionen. `[gemessen]`
- Ergänzend: **Sichtbarkeitsindex** über SISTRIX (`domain.visibilityindex`). `[gut geschätzt]`
- **Ohne Zugang und ohne Tool:** `site:domain.de` (wie viele Seiten stehen überhaupt im Index)
  plus die Hauptleistung samt Ort so suchen, wie ein Kunde es täte, und die ersten beiden
  Ergebnisseiten durchsehen. Kaum indexierte Seiten oder kein Treffer — das ist die Ausgangslage.
  ⚠ Das ist eine **Bestandsaufnahme**, keine Rankingmessung. Keine Position daraus notieren.

## Schritt 2 — Technik-Check
Der Technik-Teil oben in diesem Dokument, plus:
- **PageSpeed Insights** — Core Web Vitals und die konkreten Bremsen
- **Crawl** über die Seite: Statuscodes (200 ok, 404 kaputt, 301 Weiterleitung), tote Seiten,
  Weiterleitungsketten
- **`robots.txt`** — sperrt sie versehentlich wichtige Bereiche?
- **Sitemap** — aktuell vorhanden und in der Search Console eingereicht?

## Schritt 3 — Onpage-Check
- Hat **jede wichtige Seite** einen eigenen, klickstarken Title und eine eigene Meta Description,
  oder heißt alles „Startseite"?
- Überschriften-Struktur: sind H2/H3 sauber gegliedert? (Mehrere H1 sind **kein** Fehler.)
- Beantwortet der Text die Frage des Suchenden, oder ist es dünner Alibi-Inhalt? → Content-Tiefe
- **Duplicate Content**: doppelte Inhalte auf der eigenen Domain, sowie 1:1 vom Hersteller
  übernommene oder geklaute Texte

## Schritt 4 — Keyword- und Wettbewerbs-Check
Abgleich: wonach sucht die Zielgruppe, und deckt die Seite das ab?
- zentrale Suchbegriffe mit Suchintention auflisten, markieren **wo passende Seiten fehlen**
- zwei, drei direkte Konkurrenten: für welche Begriffe stehen die oben und die geprüfte Seite nicht?
  (`domain.competitors.seo`, `domain.opportunities`)
- **Diese Lücke trägt den Maßnahmenplan.**

## Schritt 5 — Offpage und E-E-A-T
Grober Überblick über das Backlink-Profil: verweisen überhaupt seriöse Seiten auf die Domain?
Dazu die Vertrauens-Signale auf der Seite selbst — sauberes Impressum, echte Autoren mit Namen,
Bewertungen, belegte Aussagen. Details in `offpage.md`.

## Schritt 6 — Local-Check (nur bei lokalem Geschäft)
Bedient der Betrieb Kunden vor Ort, kommt der komplette Check aus `local.md` dazu:
- **Google Business Profile**: vorhanden, vollständig, gepflegt?
- **NAP-Daten**: auf Website, Profil und in Verzeichnissen überall exakt gleich?
- Decken sich **Kategorien und Services** im Maps-Eintrag mit der Website-Struktur?
  ⚠ Einer der zentralen Punkte im Local SEO — **hier findet man bei fast jedem Betrieb etwas.**

## Schritt 7 — Priorisierter Maßnahmenplan

**Output dieses Schritts, ohne dass jemand danach fragen muss:**
- Die **Maßnahmenliste** als Tabelle: Fund · Zahl mit Stufe · Entscheidung (umsetzen / später /
  ignoriert) · ein Satz Begründung · Merkmal, an dem man sieht, dass es erledigt ist. Sortiert nach der
  Regel oben (erst was Sichtbarkeit verhindert, dann was viele Seiten betrifft, Einzelfälle zuletzt).
  Die Ignoriert-Entscheidungen aus Station 9 werden **übernommen**, nicht neu verhandelt.
- Bei den **ersten drei** Maßnahmen die Begründung einzeln — sie werden dem Nutzer vorgelesen.
- Der **erste Kundenreport**: drei Absätze, keine Fachbegriffe, aus diesem Dokument.
- Das **Audit-Dokument** als Datei (`docs/seo/AUDIT-<datum>.md`), Kapitel in der Reihenfolge der
  sieben Schritte, jede Zahl mit Stufe.
Alle Funde sammeln und nach **Wirkung und Aufwand** sortieren. Jede Maßnahme in Klartext ohne
Fachchinesisch: „Ladezeit halbieren, damit weniger Besucher abspringen" statt „LCP optimieren".

**Die Sortierregel:**
1. Was Sichtbarkeit **überhaupt erst möglich macht** — eine wichtige Seite auf `noindex`, ein
   gesperrter Googlebot, eine fehlende Seite zur Hauptleistung.
2. Was **viele Seiten auf einmal** betrifft — Titles, Ladezeit, interne Links.
3. **Einzelfälle.** Ein 404 auf einer alten Pressemeldung wandert nach unten, auch wenn das Tool
   ihn rot markiert.

## Warum trotzdem von Hand gelernt wird
Ein Katalog mit 120 Findings ist nur so viel wert wie die Person, die weiß, welche drei davon
zählen. Die Automatisierung nimmt die Fleißarbeit ab — die Beurteilung nicht.

### ⚠ Zielgröße

| | Erwartung | Was zu wenig bedeutet |
|---|---|---|
| **Rohbefunde (technik)** | alle Prüfgruppen durchlaufen, **keine** ausgelassen | eine übersprungene Gruppe gehört benannt |
| **Maßnahmenliste** | jeder Fund mit Entscheidung **und** Grund | ein Fund ohne Grund ist eine Beobachtung, keine Maßnahme |
| **Ignoriert-Anteil** | typisch **die Mehrheit** der Befunde | wer fast alles umsetzen will, hat nicht priorisiert |
| **SISTRIX-Budget dieser Station** | **5 (technik) · 5 (voll)** | mehr nur mit Ansage vorher — und die Station wird trotzdem fertig, notfalls mit Stufe 3 |

## Gate (Modul 18)
- [ ] Alle sieben Schritte gegangen, keiner übersprungen
- [ ] Schritt 6 durchgeführt **oder** begründet übersprungen (kein lokales Geschäft)
- [ ] Kapitel ohne Daten (Messen, Offpage) tragen den Vermerk, warum — kein leeres Kapitel, kein erfundener Wert
- [ ] Jede Zahl im Bericht trägt ihre Qualitätsstufe
- [ ] Jede Maßnahme in Klartext, sortiert nach der Regel oben
- [ ] Der Plan ist überschaubar — nicht 120 Findings, sondern die, die zählen
