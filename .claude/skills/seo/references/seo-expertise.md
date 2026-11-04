# SEO-Fachwissen

Kern-SEO-Wissen für die Workflows `audit.md`, `optimize.md` und `create.md`. Datenwege ausschließlich über `datenquelle.md` (Repo A, gerendertes HTML B). Strategie und Priorisierung stehen in `strategy.md`, AI-Suche in `ai-search.md`.

## Was als Beleg gilt (Kursmodul 4)

**SEO ist keine exakte Wissenschaft.** Niemand außerhalb von Google kennt die Gewichtung. Deshalb
gilt in diesem Skillset eine Rangfolge der Belege — und sie wird beim Beraten **mitgesagt**, nicht
verschwiegen:

| Stufe | Beleg | Beispiel |
|-------|-------|----------|
| 1 | Googles eigene Dokumentation und Richtlinien | Spam-Richtlinien, Search-Central-Doku |
| 2 | Übereinstimmung aus mehreren unabhängigen Quellen | Google-Aussage **und** Studie **und** der Leak zeigen dasselbe |
| 3 | Einzelne Studie oder Beobachtung | eine Korrelationsstudie |
| 4 | Branchen-Folklore | „Wortzahl ist ein Ranking-Faktor" |

⚠ **Stufe 4 wird nie als Tatsache ausgegeben.** Wird ein solcher Punkt gefragt, lautet die Antwort:
verbreitet, aber nicht belegt — hier ist, was stattdessen belegt ist.

### Die vier großen Hebel

1. **Guter Content** — beantwortet die Frage wirklich. Klar bestätigt, das Fundament. Ohne ihn wirkt
   nichts anderes, deshalb steht er zuerst.
2. **Title Tag** — bestätigt, aber laut Google ein winziger Faktor. Sein Hebel ist der **Klick**,
   nicht das Ranking selbst. Deshalb nie als Ranking-Trick verkaufen.
3. **Relevante Backlinks** — klar bestätigt, thematisch passend und stark. Der späte Schritt
   (`offpage.md`), nicht der erste.
4. **Nutzersignale** — sehr wahrscheinlich, aber **nicht hart belegt**. Entsprechend gekennzeichnet,
   wenn darauf verwiesen wird.

### Die fünf Bereiche

Keyword-Recherche · Onpage · Offpage · Technik · Monitoring. Jede Empfehlung lässt sich einem davon
zuordnen. Lässt sie sich keinem zuordnen, ist sie vermutlich keine SEO-Maßnahme.

### Core Updates

Google schärft die Regeln mehrmals im Jahr nach. Für dieses Skillset heißt das:

- Ein Rückgang wird **erst** der eigenen Seite zugeschrieben, wenn Zeitraum und Wettbewerb geprüft
  sind — Verfahren in `track.md`.
- **Während eines laufenden Updates wird nicht umgebaut.** Sonst misst man zwei Veränderungen
  gleichzeitig und weiß hinterher von keiner, was sie bewirkt hat.
- Ein Update ist eine Einordnung, keine Entschuldigung: wer verliert, hatte aus Googles Sicht die
  schwächere Seite.

---

## E-E-A-T (Google Quality Rater Guidelines)

Vier Signale — das doppelte E (Experience) ist der neuere, entscheidende Zusatz.

- **Experience (Erfahrung aus erster Hand):** Originär-Recherche, Fallstudien, Vorher/Nachher-Ergebnisse, dokumentierte eigene Prozesse, proprietäre Daten, eigene Fotos/Videos, echte Kundenstimmen mit konkretem Ergebnis. Das ist der Anti-Slop-Kern: Substanz, die nur entstehen kann, wenn jemand es wirklich getan hat.
- **Expertise:** Autoren-Credentials, fachliche Tiefe passend zur Zielgruppe, korrekte und belegte Aussagen mit Quellen, relevanter Hintergrund.
- **Authoritativeness:** externe Zitate/Backlinks von seriösen Quellen, Brand-Mentions und Branchen-Anerkennung, Nennung durch andere Fachleute, Auszeichnungen/Partnerschaften. (Für AI-Suche gewichten Brand-Mentions stärker als Backlinks — siehe `ai-search.md`.)
- **Trustworthiness (das Fundament):** sichtbare Kontaktdaten/Adresse, Impressum, Datenschutz, AGB, Kundenbewertungen, Datumsangaben und transparente Korrekturen, HTTPS, klare Firmen-Informationen.

## Content-Qualität

### Umfangs-Richtwerte pro Seitentyp

| Seitentyp | Richtwert Wörter | Notiz |
|-----------|:----------------:|-------|
| Startseite | 500 | Kern-Nutzenversprechen + zentrale Sektionen |
| Leistungs-/Produktseite | 800 | umfassende Beschreibung der Leistung |
| Blog-/Ratgeberbeitrag | 1.500 | thematische Tiefe |
| Regional-/Standortseite | 500–600 | lokale Relevanz + einzigartiger Ortsbezug |
| Produktlisting | 300+ | 400+ bei erklärungsbedürftigen Produkten |
| FAQ-Seite | 1.000 | vollständige Antworten, keine Einzeiler |

> **Wichtig — Wortzahl ist KEIN direkter Ranking-Faktor.** Google hat das bestätigt. Diese Zahlen sind **Abdeckungs-Richtwerte** für vollständige Themenbehandlung, keine Ziele. Eine 500-Wörter-Seite, die die Suchintention vollständig beantwortet, schlägt eine 2.000-Wörter-Seite, die es nicht tut. Nie auf Wortzahl optimieren — auf Vollständigkeit der Antwort.

### Lesbarkeit
- Flesch-Reading-Ease ~60–70 für allgemeines Publikum.
- Durchschnittliche Satzlänge 15–20 Wörter, Absätze 2–4 Sätze.
- Listen und Tabellen zum Auflockern (helfen zusätzlich der Zitierbarkeit für AI-Suche, siehe `ai-search.md`).

## On-Page-Checkliste

### Title-Tag
- **Länge: 50–60 Zeichen als Faustregel.** Google misst tatsächlich die **Pixelbreite** (Abschneiden bei ~600 px im Desktop-SERP), nicht stur die Zeichenzahl — breite Zeichen (M, W, Großbuchstaben) zählen mehr als schmale (i, l). 50–60 ist der sichere Korridor; im Zweifel eher kürzer.
- Primär-Keyword weit vorne.
- Marke am Ende (`… | Marke`).
- Pro Seite einzigartig — keine Duplikate.
- CTR-orientiert formuliert, nicht nur keyword-gefüllt.

### Meta-Description
- Länge ~150–160 Zeichen.
- Primär-Keyword natürlich eingebaut.
- Klares Nutzenversprechen oder Call-to-Action.
- Pro Seite einzigartig, vollständiger Satz (kein Fragment).

### Überschriften
- Genau **eine** `<h1>` pro Seite, mit Primär-Keyword.
- Logische Hierarchie H1 → H2 → H3, keine Sprünge (kein H2 → H4).
- Überschriften beschreiben den Sektionsinhalt (nicht dekorativ).
- Sekundär-Keywords in H2, wo natürlich — kein Stuffing.

### Keyword-Platzierung
- Primär-Keyword in: Title, H1, erste ~100 Wörter, URL, Meta-Description.
- **Keine Keyword-Density-Fixierung.** Es gibt keinen magischen Prozentwert. Natürlich schreiben, semantische Varianten und verwandte Begriffe streuen (das versteht Google über Entitäten/Kontext, nicht über Wiederholungsfrequenz). Keyword-Stuffing schadet — immer.

### Interne Verlinkung
- Jede Seite verlinkt auf mind. 3–5 verwandte Seiten.
- Aussagekräftiger Ankertext (nie „hier klicken").
- Wichtige Seiten erhalten mehr interne Links.
- Keine verwaisten Seiten (null interne Links).
- Link-Hierarchie folgt der Seitenarchitektur (Hub&Spoke → `strategy.md`).

### URL-Struktur
- Kurze, sprechende, mit Bindestrich getrennte Slugs, ausschließlich Kleinschreibung.
- Primär-Keyword, wo natürlich.
- Keine Parameter, keine Session-IDs.
- Trailing-Slash konsistent handhaben.

## Schema / strukturierte Daten (JSON-LD)

### Empfohlenes Schema pro Seitentyp

| Seitentyp | Schema-Typen |
|-----------|--------------|
| Startseite | Organization, LocalBusiness (falls Ladengeschäft), WebSite + SearchAction |
| Leistungsseite | Service, BreadcrumbList |
| Blog-/Ratgeberbeitrag | BlogPosting (oder Article), BreadcrumbList |
| FAQ-Seite | FAQPage (Einschränkungen — siehe unten) |
| Produktseite | Product, AggregateRating, Offer |
| Standortseite | LocalBusiness, BreadcrumbList |
| Fallstudie/Portfolio | CreativeWork, BreadcrumbList |

### Deprecations & Einschränkungen (Stand 2026)
- **HowTo:** von Google im **August 2023** deprecatet — Rich Results werden nicht mehr angezeigt. Semantischer Nutzen möglich, aber kein sichtbarer SERP-Vorteil mehr. Nicht als Rich-Result-Hebel einplanen.
- **FAQPage:** seit **August 2023** stark eingeschränkt — Rich Results nur noch für anerkannte Behörden- und Gesundheits-Seiten. Für normale Firmen-Sites weiterhin für semantische Klarheit nutzbar, aber **kein** Rich Snippet erwarten.
- **Speakable:** begrenzte Beta, primär für News-Publisher. Für allgemeinen Einsatz nicht empfohlen.

### Best Practices
- JSON-LD als Format (Googles bevorzugte Variante), als `<script type="application/ld+json">`.
- Im `<head>` oder am Ende des `<body>`.
- Mit dem Rich-Results-Test validieren (rendert JavaScript).
- Entitäten über `@id` verknüpfen, konsistente URLs.
- Alle Pflicht-Properties je Typ setzen.
- **Schema-Regel (aus `datenquelle.md` B):** Wird JSON-LD per JavaScript injiziert, erkennt es statisches `curl` nicht. Nie „kein Schema gefunden" allein aus statischem HTML melden — erst Quelldatei (Repo) oder gerendertes DOM (Playwright) gegenprüfen.

## Bild-Optimierung

### Alt-Texte
- Auf **allen** inhaltlichen Bildern vorhanden; rein dekorative Bilder: `alt=""` (bzw. `role="presentation"`).
- Beschreibend — was zeigt das Bild.
- Länge ~10–125 Zeichen, relevantes Keyword nur wo natürlich (kein Stuffing).
- Schlecht: „bild.jpg", „foto", „hier klicken". Gut: „Handwerker montiert Küchenarmatur in Neubauwohnung".

### Dateigrößen-Richtwerte

| Kategorie | Ziel | Warnung | Kritisch |
|-----------|:----:|:-------:|:--------:|
| Thumbnails | < 50 KB | > 100 KB | > 200 KB |
| Content-Bilder | < 100 KB | > 200 KB | > 500 KB |
| Hero/Banner | < 200 KB | > 300 KB | > 700 KB |

### Format-Reihenfolge (House-Standard)
1. **AVIF** (beste Kompression) → 2. **WebP** (breite Unterstützung) → 3. **JPG** (Foto-Fallback). Ergänzend: PNG nur für Grafiken mit Transparenz, SVG für Icons/Logos/Illustrationen.

### Technische Anforderungen
- `width` und `height` auf allen `<img>` (gegen CLS).
- `loading="lazy"` below-the-fold; **LCP-/Above-fold-Bild explizit `loading="eager"`** (nie lazy), ggf. `fetchpriority="high"`.
- `<picture>` für Format-Fallbacks, `srcset` für responsive Größen.

## Technical-SEO

### robots.txt
- Muss unter `/robots.txt` liegen.
- Muss die Sitemap referenzieren: `Sitemap: https://domain.tld/sitemap.xml`.
- Darf keine wichtigen Seiten versehentlich blocken.
- Darf **CSS/JS nicht blocken** (sonst kann Google die Seite nicht rendern).

### XML-Sitemap
- Muss existieren und in `robots.txt` referenziert sein.
- Nur kanonische, indexierbare URLs — keine `noindex`-, Redirect- oder 404-URLs.
- Bei Content-Änderung aktualisiert; max. 50.000 URLs pro Datei.

### Canonical
- Selbstreferenzierend auf jeder Seite, absolut.
- Konsistentes Protokoll (https) und www/non-www.
- Bei Duplicate Content auf die bevorzugte Version zeigen.

### Core Web Vitals (Ziele 2026)
- **LCP** (Largest Contentful Paint): < 2,5 s.
- **INP** (Interaction to Next Paint): < 200 ms — hat **FID abgelöst** (INP misst die tatsächliche Reaktionslatenz über die gesamte Sitzung, nicht nur die erste Interaktion). Bei Motion-Sites besonders im Blick behalten: schwere JS-Handler und Scroll-Listener treiben INP hoch.
- **CLS** (Cumulative Layout Shift): < 0,1.

## Astro-/Motion-Spezifika

Läuft das Projekt auf Astro (Static-first, Islands) mit Scroll-Motion, folgen daraus ein paar harte Punkte:

- **Kerninhalt muss als echtes HTML im DOM stehen — nicht nur im Canvas/WebGL/JS.** Headlines, Fließtext, CTAs und Nav sind echte `<h1>`/`<p>`/`<a>`. Bei Canvas-Sequenz-/Scrollytelling-Heros liegen die Beat-Texte als **HTML-Overlay** vor, nicht als Pixel im Bild. Suchmaschinen und LLMs sehen Canvas-Pixel nicht. Test: `curl -sL` auf den Dev-Build (JS noch nicht ausgeführt) — sind H1, Kerntext und Links da? Details und Scoring in `audit.md` **Gruppe 6** (Motion-Content-im-HTML). Dieser Check deckelt den Score hart, wenn er fehlschlägt.
- **`astro:assets` / `<Image>`** für dimensionierte, optimierte Bilder — liefert AVIF/WebP mit gesetzten `width`/`height` (CLS-frei) automatisch. Statt roher `<img>`-Tags im Premium-Build der Standard.
- **Content-Collections-SEO-Frontmatter:** Im Collection-Schema (`src/content/**`) SEO-Felder definieren — mindestens `title`, `description`, `ogImage`, `pubDate` — und im Layout/`BaseHead` in die Meta-Tags durchreichen. So bleibt Meta datengetrieben statt hartkodiert.
- **`@astrojs/sitemap` + `site`:** `site` muss in `astro.config.*` gesetzt sein, sonst gibt es keine absoluten URLs und keine korrekte Sitemap. `@astrojs/sitemap` als Integration einbinden; die generierte `sitemap-index.xml` in `robots.txt` referenzieren.
- **`prefers-reduced-motion`-Fallback** (aus `a11y-audit`): Die statische Alternative der Motion-Choreografie ist meist zugleich die crawlbare Variante — gegen sie prüfen.


---

## Kurs-Korrekturen (verbreitete Irrtümer)

| Irrtum | Richtig |
|---|---|
| „Mehrere H1 sind ein Fehler." | **Sind sie nicht.** Entscheidend ist eine logische Gliederung, nicht die Anzahl. |
| „Es gibt eine optimale Keyword-Dichte." | **Gibt es nicht.** Weder Dichte noch TF-IDF machen ein Ranking. Keyword dort, wo es natürlich hingehört. |
| „Längere Texte ranken besser." | **Wortzahl ist kein Ranking-Faktor.** Die Umfangs-Richtwerte oben sind Untergrenzen für Vollständigkeit, keine Füllziele. |
| „Domain Rating zeigt, wie gut wir stehen." | DR gehört **Ahrefs**, nicht Google. Preis-Check vor einem Linkkauf — **nie** eine Erfolgszahl im Kundenreporting. Dort zeigt man Impressionen aus der GSC. |
| „Ich hab's gegoogelt, wir stehen auf Platz 2." | Die eigene Suche ist standortverzerrt. **Nie** als Rankingmessung. |
| „Die teure Software hat die echten Google-Zahlen." | **Jede** Software schätzt das Suchvolumen. Exakt kennt es nur Google und veröffentlicht es nicht. Deshalb relativ vergleichen, nicht auf die Nachkommastelle. |
