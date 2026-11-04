# AI-Suche (GEO) — Optimierung für AI-Overviews & Chat-Suche

Optimierung für AI-gestützte Suche: Google AI Overviews, ChatGPT Search, Perplexity, Claude. Genutzt von `audit.md`, `create.md` und `compete.md`. Verwandtes On-Page-Wissen in `seo-expertise.md`, Priorisierung in `strategy.md`. Live-Checks der SERP/AI-Overviews laufen über `datenquelle.md` D.

**Kursmodul 19 (Von SEO zu GEO).** Leitsatz: **Ohne SEO kein GEO.** GEO steht auf Long-Tail-SEO — diese Station kommt zuletzt, weil sie auf allem davor aufbaut. Jedes SEO-Element lebt in GEO weiter; neu ist das **Prompt-Tracking** als Metrik und der Generative-AI-Bericht in der Search Console (Rollout unvollständig — prüfen, nicht versprechen).

**Datenwege:** ausschließlich `datenquelle.md` — **S** (`ai.tracker`, `ai.check`) für die KI-Sichtbarkeit, **D** für die Live-Ansicht der AI Overviews, **E** für den Generative-Bericht, **B** für den Motion-Check. **F** (Claude selbst) ist hier ausdrücklich **keine** Quelle: was ein Modell über eine Marke sagt, ist eine Beobachtung, keine Messung — und wird datiert notiert.

> **Zu den Zahlen:** Die folgenden Kennzahlen sind **Richtwerte/Orientierung (Stand 2025/26)** aus veröffentlichten Studien — plausible Größenordnungen, keine hart verifizierten Konstanten. Als Trend-Signal nutzen, nicht als exakten Fakt verkaufen. Eigene Zahlen nie dazu-erfinden.

## Landschaft (Richtwerte 2026)

| Plattform | Reichweite (Richtwert) | Kernmetrik |
|-----------|------------------------|------------|
| Google AI Overviews | ~1,5 Mrd. Nutzer/Monat, 200+ Länder | bei einem erheblichen Teil der Queries (Richtwert ~50 %+) erscheinen AI Overviews |
| ChatGPT | ~900 Mio. wöchentlich aktive Nutzer | wachsende Web-Such-Integration |
| Perplexity | ~500 Mio.+ Queries/Monat | zitat-lastige Antworten |

**Kern-Einsicht (Richtwert):** Nur ein kleiner Teil der Domains (Studien-Richtwert ~11 %) wird für dieselbe Query **sowohl** von ChatGPT **als auch** von Google AI Overviews zitiert. Heißt: Plattform-spezifische Optimierung lohnt — eine Quelle, die überall erscheint, ist die Ausnahme.

## Prompt-Tracking — womit gemessen wird

Die Metrik dieser Station ist nicht die Position, sondern: **wird der Betrieb in der Antwort
genannt, und worauf beruft sie sich?**

- **Mit angebundener Datenquelle:** `ai.tracker` und `ai.check` verfolgen, für welche Fragen eine
  Domain in KI-Antworten auftaucht. Ergebnis `[gut geschätzt]`, weil KI-Antworten zwischen zwei
  Abrufen verschieden ausfallen können — deshalb wird **jeder Stand datiert**.
- **Ohne sie:** mindestens drei realistische Kundenfragen von Hand stellen, Antwort und genannte
  Quellen notieren, Datum dazu. Das ist mühsam, aber es ist eine echte Messung — Stufe
  `[grob geschätzt]`, weil die Stichprobe klein ist.
- **Search Console:** der Generative-AI-Bericht liefert eigene Zahlen, wo er ausgerollt ist. Prüfen,
  ob er im Konto vorhanden ist — **nicht** dem Kunden versprechen, bevor man ihn gesehen hat.

⚠ Eine einzelne KI-Antwort ist kein Befund. Erst der wiederholte, datierte Stand über mehrere
Wochen zeigt eine Richtung — genau wie bei Rankings.

---

## Brand-Mentions > Backlinks

Für **AI-Zitierbarkeit** korrelieren Marken-Erwähnungen über Plattformen hinweg stärker mit Zitaten als klassische Backlink-Autorität. Richtwerte aus einer Studie (Ende 2025, ~75.000 Marken):

| Signal | Korrelation mit AI-Zitaten (Richtwert) |
|--------|:--------------------------------------:|
| YouTube-Erwähnungen | ~0,74 (am stärksten) |
| Reddit-Erwähnungen | hoch |
| Wikipedia-Präsenz | hoch |
| LinkedIn-Präsenz | mittel |
| Domain-Rating (Backlinks) | ~0,27 (schwach) |

**Takeaway:** Für AI-Sichtbarkeit in Marken-Präsenz über Plattformen investieren (erwähnt werden, wo Menschen und Crawler lesen), nicht nur in Backlinks. Für klassisches Google-Ranking bleiben Backlinks relevant — die beiden Ziele überschneiden sich, sind aber nicht identisch.

## Zitierbarkeit (Citability)

### Optimale Passagen-Struktur
- **Ziellänge: ~134–167 Wörter** pro zitierbarer Passage (Richtwert). Lang genug für Substanz, kurz genug zum sauberen Extrahieren.
- **Direkte Antwort in den ersten ~40–60 Wörtern** — Fazit zuerst, Herleitung danach.
- Konkrete Fakten, Zahlen, Datenpunkte einbauen.
- Definitionen im Muster „X ist …" / „X bezeichnet …".
- Passagen **selbst-erklärend** halten (ohne umgebenden Kontext extrahierbar).
- Aussagen konkreten Quellen zuordnen.

### Content-Muster, die zitiert werden
1. **Definitive Aussagen:** „Die Kosten für X liegen zwischen Y und Z."
2. **Nummerierte Listen:** „Die 5 entscheidenden Faktoren sind …".
3. **Vergleichstabellen:** strukturierte Daten, die AI direkt übernimmt.
4. **Statistiken mit Quelle:** „Laut [Quelle] stieg X um Y %."
5. **Schritt-für-Schritt-Prozesse:** klare, geordnete Anleitungen.

### Content-Muster, die NICHT zitiert werden
- Vage Verallgemeinerungen ohne Konkretes.
- Meinung ohne Beleg.
- Fazit tief in einem langen Absatz vergraben.
- Content hinter Login/Paywall.
- Stark werbliche Prosa ohne Substanz.

> Diese Muster decken sich mit E-E-A-T und Anti-Slop (`seo-expertise.md`): Was Menschen als substanziell erleben, extrahieren auch LLMs. Und: Ist der Kerninhalt nicht als echtes HTML im DOM (Motion-Check, `audit.md` Gruppe 6), ist die Seite für AI-Suche **unsichtbar** — Canvas-Pixel werden nicht zitiert.

## AI-Crawler-Management

### Bekannte AI-Crawler (2026)

| Crawler | Anbieter | robots.txt-Token | Zweck |
|---------|----------|:----------------:|-------|
| GPTBot | OpenAI | `GPTBot` | Modell-Training |
| ChatGPT-User | OpenAI | `ChatGPT-User` | Echtzeit-Browsing |
| ClaudeBot | Anthropic | `ClaudeBot` | Modell-Training |
| PerplexityBot | Perplexity | `PerplexityBot` | Suche + Training |
| Bytespider | ByteDance | `Bytespider` | Modell-Training |
| Google-Extended | Google | `Google-Extended` | Gemini-Training |

### Wichtige Unterscheidungen
- `Google-Extended` blocken verhindert **Gemini-Training**, betrifft aber **nicht** Google Search oder AI Overviews (die nutzen `Googlebot`).
- `GPTBot` blocken verhindert **OpenAI-Training**, hindert ChatGPT aber **nicht** daran, Inhalte per `ChatGPT-User`-Browsing zu zitieren.
- Nur ein kleiner Teil der Sites nutzt derzeit AI-spezifische robots.txt-Regeln (Richtwert ~3–5 %).

### Empfehlung
Vor dem Blocken die AI-Sichtbarkeits-Strategie klären. Von AI-Systemen zitiert zu werden bringt Marken-Bekanntheit und Referral-Traffic. Für die meisten Firmen-Sites ist **Zulassen** der AI-Crawler vorteilhaft — bewusst blocken nur bei echtem Grund (z. B. Schutz proprietärer Inhalte).

## llms.txt

Optionale Datei unter `/llms.txt`, die AI-Systemen die Site erschließt:
- Strukturierte Metadaten zum Content.
- Hinweis, welche Seiten am autoritativsten sind.
- Signal für bevorzugte Zitier-Form.
- Noch ein **entstehender** Standard — nicht Pflicht, aber vorausschauend. Als Kurzbeschreibung + Liste der wichtigsten Seiten im Root ablegen.

## Plattform-spezifische Tipps

### Google AI Overviews
- Strukturierter Content mit klaren Überschriften gewinnt.
- Listen und Tabellen werden stark extrahiert.
- E-E-A-T-Signale zählen für die Aufnahme.

### ChatGPT Search
- Marken-Präsenz im gesamten Web zählt am meisten.
- Wikipedia- und Reddit-Erwähnungen sind starke Signale.
- Frischer, regelmäßig aktualisierter Content wird bevorzugt.

### Perplexity
- Starke Präferenz für gut belegten Content.
- Akademischer Quellen-Stil erhöht die Zitat-Wahrscheinlichkeit.
- Strukturierte Daten (Schema, `seo-expertise.md`) helfen der Extraktion.
