# Workflow: Create

Neue SEO-Seite oder Blog-Artikel erstellen — **mit Claude selbst** (kein Gen-Server) und einem **verpflichtenden Anti-Slop-Gate**. Dieser Workflow schreibt **niemals** ungeprüft eine Live-Datei. Er ist mit der Agentur-Regel „Anti-AI-Slop (Pflicht)" und dem `design-review`-Gate verzahnt.

**Kursmodul 12 (Onpage II: Content, der rankt).** Kernregel: **erst die Gliederung, dann der Text.** Die Gliederung wird dem User vorgelegt und freigegeben, erst danach entsteht der Text abschnittsweise daraus. Umgekehrt entsteht Füllmaterial.

Dazu aus dem Kurs: umgekehrte Pyramide (das Wichtigste zuerst), für Nutzer schreiben statt „SEO-Texte", Bilder-SEO, Content Chunks für die KI-Suche, Featured-Snippet-Format. **Keyword-Dichte und TF-IDF sind Mythen** — nicht darauf optimieren.

**Wissen laden:** `seo-expertise.md` (Qualitäts-Floors, Schema, On-Page) + `strategy.md` (Buyer-Stage, Priorisierung). **Datenwege:** `datenquelle.md` — **S** für Volumen, Intent und Fragen (Vorrang), **A** Repo, **C** Autocomplete, **D** SERP, **F** Generierung, **G** Bilder.

> **Grundsatz:** Der Default-Pfad endet **nicht** mit einer veröffentlichten Seite, sondern mit einem freigabereifen Entwurf. Veröffentlicht wird erst nach dem Gate + explizitem „Go".

## Umfang: eine Seite oder eine Welle

- **`/seo:create <keyword>`**: eine Seite, Schritt 1–8 wie unten.
- **`/seo:create welle 1`** (oder `welle 2`): **alle Seiten dieser Welle aus `SEITENBAUM.md` in einem Lauf.**
  Der Seitenbaum ist die Bauliste — nichts wird neu entschieden, nur gebaut. Ablauf:
  1. Je Seite Primary, sekundäre Keywords und Zahl **aus `KEYWORDS.md` und `CLUSTER-MAP.md`** lesen
     (0 Abfragen; SISTRIX nur für ein Primary, das dort wirklich fehlt — Budget 10 für die ganze Welle).
  2. **Alle Gliederungen in einer Antwort** vorlegen, je Seite fünf bis acht Zeilen, dazu **eine
     Substanz-Tabelle** für die ganze Welle: Seite · was diese Seite belegt (Erfahrung, Zahl, Ablauf,
     echter Unterschied) · Quelle im Repo oder in `PROJEKT.md`. Das ist das Anti-Slop-Gate — **einmal
     für die Welle**, nicht acht Mal. Turn beenden, auf „Freigegeben" warten.
  3. Nach der Freigabe alle Entwürfe nach `docs/seo/entwuerfe/<slug>.md`, je Entwurf Meta und Schema
     (Schritt 4–5). Turn beenden — der Nutzer liest mindestens einen Entwurf gegen und weist zurück,
     was Floskel ist.
  4. Auf **„Bau sie ein"**: Schritt 7 für alle Seiten, framework-korrekt, jede Route aus dem Seitenbaum
     wörtlich. Danach steht in der Antwort, welche Dateien entstanden sind — und `abgleich.py` zählt
     Seiten der Welle gegen angelegte Routen.

  Eine Welle ist **ein** Befehl, keine Kette von Stationen — Regel null bleibt: der Lauf hält an den
  drei Stellen (Gate, Entwürfe, Einbau) und wartet jedes Mal auf den Nutzer. Welle 2 läuft erst,
  wenn `STRATEGIE.md` ihren Termin nennt.

## Kontext

1. `docs/seo/PROJEKT.md` (Framework, `site`, Seiten-Inventar). Fehlt → `/seo:init`.
2. `docs/seo/CLUSTER-MAP.md` — ist das Thema eine echte **Content-Lücke** (Keyword ohne Seite)? Wenn schon eine Seite dafür existiert → stattdessen `optimize`, nicht neu bauen (EAD: erst eliminieren).
3. `docs/seo/STRATEGIE.md` — passt das Thema zum Redaktionsplan und zur Priorität? Wenn nicht, kurz rückfragen.
4. Sprach- und Tonregeln des Repositories lesen — eine Styleguide-/Tonalitätsdatei (z. B. `references/voice.md`, `STYLEGUIDE.md`) oder der Sprach-Abschnitt der `CLAUDE.md`; gibt es keine, den Ton aus zwei vorhandenen Seiten ableiten und unter „Arbeitsweise" in `PROJEKT.md` festhalten. Die so gefundenen Regeln sind bindend für den Entwurf.

## Schritt 1 — Keyword-Fundament (statt Blind-Generierung)

Bevor irgendein Text entsteht: das Thema real verankern.
- **Erst `KEYWORDS.md`:** das Primary und seine Zahl stehen dort meist schon — lesen, nicht neu holen.
- **Autocomplete (datenquelle.md C, immer, 0 Abfragen):** Seed + Modifier-Fächer per `curl` → Suchphrasen, Long-Tail, Fragen (`wie/was/warum`). Die Fragen werden zu Abschnitten.
- **SISTRIX (datenquelle.md S, nur was fehlt, Budget 10):** Volumen und Intent für Primary + 3–6 sekundäre — `keyword.seo.metrics`, `keyword.seo.searchintent`; `keyword.questions` **einmal** für die Zielseite, wenn das Fächer zu wenig Fragen brachte. Jedes mit Zahl und Stufe; ohne S alles `[grob geschätzt]`.
- **SERP-Realität (datenquelle.md D):** Wer rankt aktuell Top-5? Welche Struktur/Tiefe/Themen decken sie ab? Gibt es ein Featured Snippet / PAA / AI Overview? Das definiert die Messlatte (nicht kopieren — schlagen).
- **Intent + Buyer-Stage** (aus `strategy.md`) bestimmen → entscheidet Format (Blog vs. Leistungsseite vs. Vergleich) und CTA.

Ergebnis dieses Schritts kurz festhalten: Primär-Keyword, Intent, Buyer-Stage, Ziel-Format, was die Top-5 abdecken und **wo unsere Lücke/These liegt**.

## Schritt 2 — Plan & Outline (Claude, datenquelle.md F)

- **Plan:** Kernaussage/These der Seite, Zielgruppe, Angle der uns von den Top-5 abhebt (eigene Daten, Case, Haltung — nicht „umfassender als alle").
- **Outline:** H1 + H2/H3-Struktur, pro Sektion die **zu beantwortende Frage** und die **direkte Antwort in 1 Satz** (Citability, `ai-search.md`). Interne Verlinkungsziele (aus CLUSTER-MAP) markieren.
- Qualitäts-Floor je Seitentyp aus `seo-expertise.md` beachten (Floors, nicht Füll-Ziele — Wortzahl ist **kein** Ranking-Faktor).

## Schritt 3 — ⛔ ANTI-SLOP-GATE (verpflichtend, vor jedem Schreiben)

Bevor ein Volltext-Entwurf entsteht, **muss** dieser Checkpoint durchlaufen und vom User bestätigt werden. Kein Überspringen, kein „mache ich später".

**A. Substanz-Nachweis — woher kommt die Autorität?**
Für jede geplante Kernsektion **eine** dieser Quellen benennen (sonst wird die Sektion gestrichen oder umgeplant):
- eigene Projekt-/Case-Daten, Before/After, Zahlen aus echten Mandaten
- First-Hand-Prozesswissen des Betriebs (wie ihr es wirklich macht)
- ein konkretes Beispiel, Zitat, Screenshot, eigenes Bild
- eine begründete **Haltung/These** (nicht die neutrale Wikipedia-Mitte)

→ **Fehlt für eine Sektion jede First-Hand-Substanz, ist sie AI-Slop-Kandidat.** Dann: entweder der User liefert das Material (nachfragen, was er beisteuern kann), oder die Sektion fällt weg. Lieber kürzer und echt als lang und generisch.

**B. Slop-Checkliste (alles muss „nein" sein):**
- Generische Einleitung à la „In der heutigen schnelllebigen digitalen Welt…"? 
- Aufzählungen ohne konkrete Beispiele, reine Allgemeinplätze?
- „Es ist wichtig zu beachten…"-Füllsätze, Wiederholungen, aufgeblähte Absätze?
- Erfundene Statistiken/Quellen? (Nur belegbare Zahlen — nie halluzinieren.)
- Default-AI-Ton statt der Tonregeln des Repositories?

**C. Freigabe:** Outline + Substanz-Nachweis + Slop-Checkliste dem User zeigen. **Erst bei explizitem „Go" weiter zu Schritt 4.** Bei „Go" die Entscheidung in `docs/seo/STRATEGIE.md` notieren.

## Schritt 4 — Entwurf (erst nach Freigabe)

- Volltext gemäß Outline schreiben, im Ton der Repository-Regeln aus Schritt 4, mit der in Schritt 3A gesicherten Substanz.
- Direkte Antworten früh in jeder Sektion, Listen/Tabellen wo es die Extraktion hilft (`ai-search.md`).
- Interne Links auf die in der Outline markierten Ziele setzen (Anti-Orphan, Hub&Spoke).
- **Als Entwurf ablegen**, nicht als Live-Seite: z. B. `docs/seo/entwuerfe/<slug>.md`. Noch nichts in `src/` schreiben.

## Schritt 5 — Meta & Schema (datenquelle.md F, seo-expertise.md)

- Title (≤ ~60 Z., Keyword vorne) + Meta-Description (~150–160 Z.) — 2–3 Varianten zur Auswahl.
- Passendes JSON-LD zum Seitentyp (Article/BlogPosting/Service …). **HowTo/FAQPage nur mit dem Wissen aus `seo-expertise.md`** (Rich-Results seit 2023 stark eingeschränkt — kein blindes FAQPage).

## Schritt 6 — Bild (nur wenn nötig, Provenance)

- Bildbedarf mit eigenen Fotos oder **kuratierten** KI-Bildern mit Herkunftsnotiz decken, nie roher generischer AI-Stock (Anti-Slop gilt für Bilder). Technik: AVIF/WebP, Dimensionen, Alt-Text (`seo-expertise.md`).

## Schritt 7 — Umsetzen ins Repo (framework-korrekt, nach Freigabe)

- **Framework aus `PROJEKT.md` respektieren** — keine hartkodierten Annahmen. Astro: `src/pages/**` bzw. Content-Collection-Eintrag mit korrektem Frontmatter-Schema (`title`, `description`, `ogImage`, `pubDate`). Andere Frameworks entsprechend ihrer Konvention. Erst die vorhandene Struktur/ein Nachbar-Beispiel lesen, dann einfügen.
- Meta/Schema über das Layout/Head-Component setzen (nicht dupliziert pro Seite).

### ⚠ Zielgröße

| | Erwartung | Was zu wenig bedeutet |
|---|---|---|
| **Gliederung vor dem Text** | immer, vom Nutzer freigegeben | ohne Freigabe geschrieben = Schritt übersprungen |
| **Belegte Substanz je Abschnitt** | mindestens **ein** eigener Beleg (Zahl, Erfahrung, Unterschied) | ohne Beleg fällt der Abschnitt durchs Anti-Slop-Gate |
| **SISTRIX-Budget dieser Station** | **10 je Lauf** | mehr nur mit Ansage vorher — und die Station wird trotzdem fertig, notfalls mit Stufe 3 |

## Schritt 8 — Review-Gate vor Launch

- **`design-review`** und **`audit`** (dieser Skill) über die neue Seite laufen lassen. Der Motion-/Crawlbarkeits-Check (audit Gruppe 6) und das Anti-Slop-Prinzip sind Launch-Gates.
- Veröffentlichung/Deploy erst über `deploy-checklist`.

## Dateien aktualisieren

- Neue Seite + Keyword-Zuordnung in `docs/seo/CLUSTER-MAP.md` (Lücke → geschlossen).
- Primär/Sekundär-Keywords in `docs/seo/KEYWORDS.md`.
- Redaktionsplan-Status + Gate-Entscheidung in `docs/seo/STRATEGIE.md`.


---

## Kurs-Modul 12: was guten Text ausmacht

Die inhaltlichen Regeln hinter den Schritten oben. Sie gelten für jeden Entwurf.

### Die umgekehrte Pyramide
Das Wichtigste zuerst. Jede Sektion beginnt mit der **Antwort**, dann kommt die Begründung, dann das
Detail. Wer die Seite nach zwei Sätzen verlässt, hat die Antwort trotzdem. Das ist zugleich die
Struktur, die Featured Snippets und KI-Antworten aufgreifen.

### Vergiss „SEO-Texte", schreib für Nutzer
Es gibt keinen Text, der für Google geschrieben wird und nebenbei für Menschen funktioniert. Es
funktioniert nur andersherum.

### Der Mythos Keyword-Dichte und TF-IDF
Es gibt **keine** Ziel-Keyword-Dichte, die man treffen müsste, und keinen TF-IDF-Wert, der ein
Ranking macht. Ein Keyword steht dort, wo es natürlich hingehört: in H1, in der Einleitung, in einer
Zwischenüberschrift, wenn es passt. **Wortzahl ist kein Ranking-Faktor** — die Qualitäts-Floors in
`seo-expertise.md` sind Untergrenzen für Vollständigkeit, keine Füllziele.

### KI-Content richtig einsetzen
Der Unterschied liegt nicht in „von Hand oder von der KI", sondern in **Reichweite pro Stück**.
Masse ohne Substanz verteilt dieselbe Aufmerksamkeit auf mehr Seiten und verliert dabei. Deshalb das
Anti-Slop-Gate in Schritt 3: nicht weniger KI, sondern keine Sektion ohne Substanz-Nachweis.

### Lesbarkeit und Headings
Kurze Absätze, klare Zwischenüberschriften, keine Schachtelsätze.
⚠ **Mehrere H1 sind kein Fehler** — das ist ein verbreiteter Irrtum. Entscheidend ist, dass die
Gliederung logisch ist, nicht die Anzahl.

### Bilder-SEO
Auch Bilder ranken. Sprechender Dateiname, echter Alt-Text (beschreibt das Bild, nicht das Keyword),
komprimiert, modernes Format. Details in `seo-expertise.md`.

### Content Chunks — die GEO-Brücke
Eine KI zitiert nicht die Seite, sondern einen **Abschnitt**. Deshalb muss jeder Abschnitt für sich
allein verständlich sein: eigene Überschrift als Frage, direkte Antwort im ersten Satz, keine
Verweise wie „wie oben beschrieben". Das ist derselbe Schnitt, den Featured Snippets brauchen.
