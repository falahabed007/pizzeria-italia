# Tell-Katalog — destilliert aus Nutlope/hallmark

Destilliert aus [Nutlope/hallmark](https://github.com/Nutlope/hallmark) **v1.1.0** (MIT, Stand 04.08.2026) — deren 58-Gate-Slop-Test, eingedampft auf das, was unser Rubric schärft. „G46" u. ä. meint das jeweilige hallmark-Gate (nachlesbar in deren `slop-test.md`). Jeder Tell endet mit der Rubric-Kategorie aus [checklist.md](../checklist.md), bei der er als Beleg zählt. Vor der Punktvergabe überfliegen; gefundene Tells beim Kategorien-Anker zitieren.

**Bewusst NICHT übernommen — und bitte nie „nachträglich vervollständigen":**

- Das **Italic-Header-Verbot** (hallmark-Gate 38a). Kollidiert frontal mit Anwalt- und Gartenbau-Master, deren erinnerbares Type-Detail genau die Italic-Betonung im Display-Satz ist. Bei uns ist Italic im Header ein Werkzeug, kein Tell.
- Die **Motion-Bans** (hallmark-Gates 12 und 14: Overshoot-Easings, Animation von `width`/`height`/`top`/`left` — plus die generelle „die Seite bewegt sich nicht"-Haltung). Kollidieren mit dem Kernprodukt Scroll-Choreografie. Motion bewertet bei uns Kategorie 4 plus `a11y-audit` — nicht hallmark.

---

## 1 · Ehrliche Copy

**Erfundene Zahl, Testimonial, Logo, Case-Zahl (G46) — Hard-Fail.** Jede quantitative Behauptung ohne Quelle, die der Kunde nicht geliefert hat — „10× schneller", „über 500 zufriedene Kunden", „99,9 % Verfügbarkeit", „+47 % Conversion" — wurde erfunden, um einen Stat-Slot zu füllen. Dasselbe gilt für ausgedachte Testimonials, Kundenlogos und Fallstudien-Zahlen. Zusatz: eine nackte Riesenzahl ist nie die **einzige** Hero-Headline — Zahl nur neben einer Wort-Headline, die sagt, was sie bedeutet.
**Fix-Protokoll, in dieser Reihenfolge:** (1) Zahl durch `—` ersetzen plus grau beschrifteter Block „Zahl beim Kunden bestätigen", (2) den User fragen und den Lauf pausieren, (3) die Sektion ohne Proof-Slot umbauen — ein Stat-Layout ohne echte Stats ist das falsche Layout. Das zahlenförmige Loch ist ehrlich; die erfundene Zahl ist Slop.
→ Hard-Fail in checklist.md · Beleg zusätzlich: **Kategorie 7 · Kohärenz & A11y**.

**Platzhalter-Namen und Startup-Klischees (G19).** „Jane Doe", „John Smith", „Max Mustermann", „Musterfirma", Lorem Ipsum in sichtbarer Copy; Klischees wie Acme, Nexus, Unleash, Seamless, Supercharge, Transform, Elevate, Empower. Signale für „generiert, nicht geschrieben".
→ Beleg: **Kategorie 7 · Kohärenz & A11y**.

**Die zehn Banned Openers.** Verteilungs-Default-Copy — wer eine tippen will, ersetzt sie durch Spezifik: benannter Ort, benanntes Gewerk, benanntes Verfahren, echte Zahl.

| Phrase | Warum sie scheitert |
|---|---|
| „Built for the modern team" | vage; temporales Marketing ohne Spezifika |
| „Unleash your [X]" | Hyperbel; Software entfesselt nichts |
| „Where X meets Y" | falsche Synthese; kreative Faulheit |
| „Empower your …" | Missionars-Sprache statt konkretem Nutzen |
| „Reimagine the way you …" | unterstellt Unzufriedenheit vor dem Bedarf |
| „Supercharge your workflow" | Energie-Metapher ohne Mechanik |
| „Innovative solutions" | bedeutungsleer; jeder behauptet Innovation |
| „Seamless integration" | „seamless" hat kein Gegenteil; Unspezifik |
| „In today's digital landscape" | zeitliches Handwedeln |
| „Next-generation" | impliziert schwache Vorgänger, differenziert nichts |

**Deutsche Entsprechungen (selbst erarbeitet, gleiche Krankheit — für DACH-Sites die relevante Liste):**

| Phrase | Warum sie scheitert |
|---|---|
| „Ihr zuverlässiger Partner für …" | austauschbar; jeder behauptet Zuverlässigkeit |
| „Maßgeschneiderte Lösungen" | das deutsche „innovative solutions" |
| „Wir begleiten Sie auf Ihrem Weg …" | Reise-Metapher ohne benannte Leistung |
| „Alles aus einer Hand" | Sammel-Claim statt benannter Leistungen |
| „Ihre Zufriedenheit ist unser Ziel" | Selbstverständlichkeit als Versprechen |
| „Kompetent · zuverlässig · persönlich" | Dreiklang beliebiger Adjektive, überall klebbar |
| „Willkommen auf unserer Webseite" | beschreibt den Ort, nicht das Angebot |
| „Seit über X Jahren Ihr Experte für …" | Floskel-Gerüst; erfundene Zahl = zugleich G46 |
| „In der heutigen digitalen Welt …" | Übersetzung des Landscape-Handwedelns |
| „Wir machen Ihre Vision zum Erfolg" | Gefühl versprochen, keine Leistung benannt |

→ Beleg: **Kategorie 7 · Kohärenz & A11y** — „einheitliches Copy-Vokabular" heißt auch: ein eigenes.

**Typografische Korrektheit.** Tastatur-Ersatzzeichen sind ein Sorgfalts-Tell: `…` statt `...` · Gedankenstrich `—` bzw. Bereichs-Strich `10–20` statt `--` · deutsche Anführungszeichen „ " statt gerader Zoll-Zeichen · Apostroph `’` statt Prime `'` · geschütztes Leerzeichen vor Einheiten („10 kg"). CMS-Text: Smart Quotes dort konfigurieren; hartkodiert: gleich richtig schreiben.
→ Beleg: **Kategorie 1 · Typografie**.

---

## 2 · Chrome-Fingerprints

Das Rubric fängt den Seiten-Fingerprint (Template-Hero, Card-Grid); diese Tells fangen das **Chrome** obendrauf — Nav, Footer, Hero-Rahmenwerk.

**AI-Nav (G42).** Wortmarke links + 4–5 Inline-Textlinks mittig/rechts + Button ganz rechts, volle Viewportbreite, 1-px-Hairline unten, weißer Grund — der meist-erkannte Nav-Fingerprint. Gegenbild: Gartenbau-Master, Nav über dem Hero komplett transparent, dort nur die Marke.
→ Beleg: **Kategorie 3 · Layout & Grid**.

**AI-Footer (G43).** Vier Linkspalten (Produkt / Unternehmen / Ressourcen / Rechtliches) + Social-Icon-Reihe + Mini-Copyright + Hairline oben + neutralgrauer Grund. Legitim nur für echte Doku-Hubs — für Handwerker- oder Kanzlei-Sites der Fingerprint.
→ Beleg: **Kategorie 3 · Layout & Grid**.

**Hero-Fold-Fit (G44).** Zwei Checks am gerenderten Hero: **(a)** `padding-block-end` ≥ 1,3 × `padding-block-start` — symmetrisches oder kopflastiges Padding lässt den Hero von der Seite abheben. **(b)** Bei **1280×800** (13-Zoll-Laptop, nicht nur 1440×900) müssen Eyebrow, Headline, Lede, primärer CTA **und** der Fokuspunkt des Visuals ohne Scrollen sichtbar sein. Übliche Täter: `clamp()`-Max zu groß, Display-line-height ~1.2 statt 1.0–1.1, Lede über ~2 Zeilen, aufgeblähtes `padding-block`. Nicht überkorrigieren — ein Hero, der passt, bleibt unangetastet; hohe Kompositionen sind erlaubt, solange der erste Screen vollständig liest.
→ Beleg: **Kategorie 3 · Layout & Grid**.

**Deko ohne semantischen Anker (G45).** Cursor, Scanline, Gradient-Blob, Ornament, Badge, Sticker ohne inhaltlichen Grund. Deko muss motiviert sein: Nummer = Jahrgang/Kapitel/Version, Cursor im getippten Befehl, Stempel mit Urheber oder Datum. Eine „42" in der Ecke ohne Bedeutung ist Slop.
→ Beleg: **Kategorie 3 · Layout & Grid**.

**Fake-Chrome (G47) — Hard-Fail.** Handgebaute Browser-Bar (URL-Pille + Ampel-Dots), Phone-Frame (Rundrechteck + Notch + Lautsprecherschlitz), Fake-Terminal, Fake-Code-Fenster, Fake-IDE — als HTML/CSS oder SVG nachgezeichnet. Die Fälschung fliegt immer auf (falsche URL, falsche Dots, falsche Notch) — das echte Chrome sitzt direkt daneben. Fix: echter Screenshot in `<figure>` (höchstens Hairline-Rahmen), Phone-Mockups nur mit echtem Device-Frame-Asset oder Produktfoto, Code als `<pre>` mit typografischem Rahmen statt Fenster-Imitat.
→ Hard-Fail in checklist.md · Beleg zusätzlich: **Kategorie 5 · Assets & Provenance**.

**Eyebrow neben der Headline (Präzisierung aus G54).** Eyebrow / Nummer / Mono-Label („01 · DER RUNDGANG") nie in eigener Spalte **neben** der Sektions-Headline auf derselben Zeile — der templated-Editorial-SaaS-Tell schlechthin. Wenn Eyebrow, dann Headline **direkt darunter in derselben Spalte**, rein vertikal gestapelt. Greift über die Inhaltsform (Eyebrow + Heading im selben Wrapper), nicht über Klassennamen — und „Struktur-Parität mit einer älteren Referenz" ist kein Bypass: das Muster wird im neuen Build stillschweigend geglättet.
→ Beleg: **Kategorie 3 · Layout & Grid**.

---

## 3 · Responsive-Härtetests

Prüfbreiten: **320 / 375 / 414 / 768 px**. ⚠ Diese Checks **fährt `tools/cross-engine.mjs`** — nicht das Design-Gate selbst. Sie stehen hier, damit die Punktvergabe in Kategorie 7 weiß, wonach sie im QA-Report sucht, und die Fixes nicht improvisiert werden.

**Klickbarer Text bricht um (G49).** Button, Nav-Link, Footer-Link, Tab, Breadcrumb, CTA darf zwischen 320 und 1920 px nie zweizeilig werden — das liest sich als Styling-Fehler. Fixes, in dieser Reihenfolge: Label kürzen (bester Fix), `white-space: nowrap` und den Parent umbrechen lassen, verzichtbares Nav-Item schmal weglassen, Nav in ein Sheet/Menü kollabieren.
→ Beleg: **Kategorie 7 · Kohärenz & A11y**.

**Bild-Grid ohne `minmax(0, 1fr)` (G50).** Jeder `1fr`-Track mit einem `<img>`/`<picture>` darin muss `minmax(0, 1fr)` heißen. Pures `1fr` = `minmax(auto, 1fr)`, das `auto`-Minimum ist die intrinsische Bildbreite — ein 1024-px-Bild drückt das Layout am Phone aus dem Viewport.
→ Beleg: **Kategorie 7 · Kohärenz & A11y**.

**Display-Header ohne Not-Umbruch (G51).** Auf alles in Display-Größe (`h1`, Hero-/Sektions-Titel): `overflow-wrap: anywhere; min-width: 0`. Lange Bindestrich-Komposita („KI-generiert") haben sonst nur den Bindestrich als Umbruchstelle und laufen aus dem Viewport.
→ Beleg: **Kategorie 7 · Kohärenz & A11y**.

**Sektionsköpfe kollabieren mobil nicht (G52).** Überschreibt ein Theme den Sektionskopf mit einem Mehrspalten-Grid, gehört die Mobile-Collapse-Regel dazu: bei `@media (max-width: 48rem)` zurück auf `grid-template-columns: 1fr`, in passender Spezifität. Sonst läuft der Titel mobil ins Sektionslabel.
→ Beleg: **Kategorie 7 · Kohärenz & A11y**.

**ALL-CAPS-Display mit line-height < 1.0 (G55).** Versalien haben keine Unterlängen, die Cap-Höhen sitzen ganz oben in der Line-Box — unter `1.0` kollidieren beim Umbruch die Großbuchstaben von Zeile 2 mit Baseline und Kommas von Zeile 1. Floor für Versal-Display: `1.0`, empfohlen `1.02–1.08` — oder `text-transform: uppercase` fallen lassen.
→ Beleg: **Kategorie 1 · Typografie**.

**Doppel-Sticky bei `top: 0` (G56).** Zwei Elemente mit `position: sticky; top: 0` (Nav **und** Sektionskopf / ToC) überlagern sich beim Scrollen; das tiefere im DOM malt über die Nav. Fix: `--banner-height`-Token (~44–64 px), sekundäre Stickies auf `top: var(--banner-height)` docken, z-Ebenen trennen — `--z-sticky` für In-Page (z. B. 200), `--z-sticky-nav` für die Nav (z. B. 300).
→ Beleg: **Kategorie 7 · Kohärenz & A11y**.

**Horizontal-Scroll — nur der Fix (aus G34).** Taucht zwischen 320 und 1920 px ein horizontaler Scrollbalken auf: `overflow-x: clip` auf `html` **und** `body` — `clip`, nicht `hidden`, denn `clip` erhält `position: sticky`/`fixed` der Nachfahren. Für unsere Scroll-Choreografie der einzig zulässige Overflow-Deckel.
→ Beleg: **Kategorie 7 · Kohärenz & A11y**.

---

## 4 · States & Mikro

**Die fünf Input-State-Fails (G39, komplett).** Inputs sind die Stelle, an der Fast-richtig-UIs verlieren. Jeder Punkt einzeln ist ein Fail:

1. **Border-Width wechselt zwischen States** — default / hover / focus / error behalten alle `border-width: 1px`; State-Wechsel gehen auf `background-color`, `outline`, `box-shadow` oder `border-color`, nie auf die Border-Breite (Layout-Shift).
2. **Fokus-Ring aus `border` statt `outline`** — richtig: `outline: 2px solid var(--color-focus)` mit `outline-offset: 1px`; im Ruhezustand `outline: 2px solid transparent`, damit beim Aktivieren nichts springt.
3. **Input-Höhe ≠ Button-Höhe im selben Formular** — eine gemeinsame Basishöhe (44-px-Floor); 38-px-Input neben 44-px-Button ist der häufigste Formular-Slop.
4. **Helper-Slot kollabiert, wenn leer** — `min-height: 1lh` reservieren, damit eine auftauchende Fehlermeldung die Seite nicht nach unten drückt.
5. **Disabled nur über Opacity** — Disabled braucht drei Kanäle: `opacity: 0.55` **und** `cursor: not-allowed` **und** das native `disabled`-Attribut (oder `aria-disabled="true"`).

→ Beleg: **Kategorie 6 · Mikro-Details**.

**`transition: all` (G10).** Immer die Properties benennen — `all` animiert auch, was nie animieren sollte. → Beleg: **Kategorie 6 · Mikro-Details**.

**Uniformes Hover-Scale (G11).** `hover:scale-105` (o. ä.) über mehrere unverwandte Elemente — überall dieselbe Default-Bewegung ist das Gegenteil einer Motion-Signatur. → Beleg: **Kategorie 4 · Motion-Signatur**.

**Mehrfach-Hover (G13).** Mehr als ein Hover-Effekt gleichzeitig auf einem Element (translate + scale + shadow + Farbe + rotate). Einer reicht. → Beleg: **Kategorie 6 · Mikro-Details**.

**Fokus-Ring faded ein (G15).** Der Fokus-Ring erscheint sofort, nie per Transition — Tastatur-User brauchen den Indikator ohne Verzögerung. → Beleg: **Kategorie 6 · Mikro-Details**.

**Jubel-Toast bei sichtbarem Erfolg (G16).** Kein Erfolgs-Toast für eine Aktion, deren Effekt der User bereits sieht. Stiller Erfolg ist Geschmack; Toasts sind für Fehler und unsichtbare Effekte. → Beleg: **Kategorie 6 · Mikro-Details**.

**Tooltip-Delays gleichgeschaltet (G17).** Hover verzögert ~800–1000 ms, Fokus 0 ms — nie beide gleich. Wer per Tastatur ankommt, wartet nicht. → Beleg: **Kategorie 6 · Mikro-Details**.

**Zahlenkolonnen ohne tabular-nums.** `font-variant-numeric: tabular-nums` auf jeden Container mit Zahlenspalten (Tabellen, Stat-Reihen, Preislisten) — proportionale Ziffern lassen Kolonnen flattern. → Beleg: **Kategorie 1 · Typografie**.

---

## 5 · Farbe- und Typo-Feinheiten

**Ungetintete Neutrals (G22).** Kein Neutral, keine Surface mit Chroma null (`oklch(… 0 …)`) — pures Grau liest sich flach. Jedes Neutral zum Anker-Hue der Palette tinten, **mindestens 0.005 Chroma**. (hallmark nimmt „modern-minimal" davon aus; für unsere Premium-Sites gilt: getönt.)
→ Beleg: **Kategorie 2 · Farbe**.

**Pures `#000` / `#fff` (G7).** Nie als Basisfarbe — Ink und Paper immer leicht getönt, passend zum Anker-Hue.
→ Beleg: **Kategorie 2 · Farbe**.

**2+1-Fontregel (G37/G38).** Maximal drei Familien: `--font-display`, `--font-body`, höchstens **ein** Outlier. Gleiche Familie in mehreren Gewichten zählt als eine; Mono zählt als Familie, sobald sie außerhalb von Code auftaucht (Captions, Labels, Ziffern). Der Outlier ist ein Register, keine dritte Fläche: **maximal zwei Slots** (kanonisch Wortmarke + Hero-Stat; alternativ Wortmarke + Masthead oder Hero-Stat + Pull-Quote). Drei Slots = dritte Body-Schrift → zurück in die Body- oder Display-Fläche.
→ Beleg: **Kategorie 1 · Typografie**.

**Token-Disziplin nach Theme-Lock (G48).** Steht das Theme, konsumiert der Rest des Builds nur noch Tokens: kein Inline-`#hex`, kein `oklch()`/`rgb()`/`hsl()`-Einzelwert, keine `font-family`-Deklaration außerhalb der `:root`-Variablen. Ein Inline-Hex mitten im Build heißt: das Modell hat das Theme gewählt — und dann vergessen. Fix: Wert benannt in den Token-Block heben oder durch ein vorhandenes Token ersetzen.
→ Beleg: **Kategorie 2 · Farbe** — Streuung über Sektionen zusätzlich **Kategorie 7 · Kohärenz & A11y**.
