# SEO-Strategie

Strategische Frameworks für Keyword-Priorisierung, Content-Planung und Roadmapping. Genutzt von `keywords.md`, `compete.md` und `create.md`. Fachwissen in `seo-expertise.md`, AI-Suche in `ai-search.md`. Alle Daten kommen über `datenquelle.md` — SISTRIX zuerst, freie Wege als Fallback, jede Zahl mit Qualitätsstufe.

**Datenwege:** ausschließlich `datenquelle.md` — **S** für Volumen und Wettbewerbsdruck, **E** für die eigenen Positionen (der einzige `[gemessen]`-Weg), **D** für die Einschätzung, welche Art Seite oben stehen muss. Priorisiert wird **relativ**: die Reihenfolge zählt, nicht der Absolutwert.

## Quick-Win-Identifikation

Quick-Wins sind Keywords, bei denen kleine Verbesserungen große Wirkung haben. Das setzt **bekannte Positionen** voraus — und die kommen hier aus **zwei** Quellen, nie aus einem gekauften Tool:

- **GSC (optional, `datenquelle.md` E):** falls verbunden/CSV vorhanden — reale Positionen, Klicks, Impressionen.
- **SERP-Checks (`datenquelle.md` D):** Playwright-Check der Live-SERP, wo GSC fehlt. Best-effort; bei Blockade manuell durch den User.
- Liegt keins von beidem vor, ist die Position schlicht **unbekannt** — das ist eine gültige, ehrliche Angabe, kein Grund zum Raten.

### Muster (sobald Positionen bekannt)
- **Position 11–20 mit vielen Impressionen** → knapp neben Seite 1. Kleine Content-Verbesserung oder interne Links heben auf Seite 1.
- **Position 4–10 mit niedriger CTR** → schon auf Seite 1, aber wenig Klicks. Title und Meta-Description für bessere CTR schärfen.
- **Position 1–3 mit fallenden Impressionen** → Position verteidigen. Content auffrischen, Datum aktualisieren, Sektionen ergänzen.

### Prioritäts-Matrix
```
                VIELE IMPRESSIONEN
                      |
    QUICK WIN         |  HALTEN & AUSBAUEN
    (Pos 11–20)       |  (Pos 1–10)
    auf Seite 1       |  CTR optimieren
    schieben          |
  WEIT WEG ───────────┼──────────── SEITE 1
                      |
    LANGFRIST         |  BEOBACHTEN
    (Pos 30+)         |  (Pos 11–20, wenig Impr.)
    großer Aufwand    |  auf Bewegung achten
                      |
                WENIGE IMPRESSIONEN
```

## Difficulty-Einschätzung

Mit SISTRIX kommt die Difficulty direkt aus `keyword.seo.competition` / `keyword.seo.metrics` — `[gut geschätzt]`. Der folgende Weg gilt, wenn keine Datenquelle angebunden ist; jede daraus abgeleitete Einschätzung ist `[grob geschätzt]`.

### Ersatzweg ohne bezahltes Tool

Difficulty wird **aus der SERP-Analyse** abgeleitet (`datenquelle.md` D), nicht aus einem Tool-Score. Die Top-10 der Live-SERP anschauen und einordnen:

### Niedrig (zuerst angehen)
- SERP enthält Foren, Q&A-Seiten, dünnen Content.
- Wenige oder keine bekannten Marken in den Top 5.
- Top-Ergebnisse schwach on-page optimiert.
- Top-Ergebnisse alt/veraltet.

### Mittel
- Mischung aus starken und schwachen Domains.
- Einige Top-Ergebnisse umfassend — Chance mit besserem/frischerem Content.

### Hoch (später angehen)
- SERP von großen Marken/Autoritäten dominiert.
- Top-Ergebnisse umfassend und gut verlinkt.
- Hohe Domain-Autorität auf allen Top-5-Plätzen.
- Besser zuerst über Long-Tail-Varianten angehen.

> Difficulty ist hier eine **Einschätzung** aus dem SERP-Bild, keine exakte Kennzahl — entsprechend kennzeichnen (siehe `datenquelle.md`, „ehrlich über Grenzen").

## Long-Tail-Strategie

Spezifischer = weniger Konkurrenz = höhere Conversion. Die Nachfrage-Angaben sind **relativ/geschätzt** (aus Autocomplete-Signalen `datenquelle.md` C und SERP-Bild), keine exakten Suchvolumina:

| Typ | Beispiel | Nachfrage (relativ) | Difficulty | Conversion |
|-----|----------|:-------------------:|:----------:|:----------:|
| Head | „webdesign" | sehr hoch | sehr hoch | niedrig |
| Body | „webdesign zahnarztpraxis" | mittel | mittel | mittel |
| Long-Tail | „webdesign für zahnarztpraxis mit online-terminbuchung" | niedrig | sehr niedrig | sehr hoch |

**Strategie:** Autorität von unten aufbauen. Erst für Long-Tail ranken, dann folgen die Body-Keywords.

## Buyer-Stage-Mapping

| Stufe | Modifier-Muster | Content-Typ | Beispiel |
|-------|-----------------|:-----------:|----------|
| **Awareness** | „was ist", „wie funktioniert", „guide", „tipps" | Blog-Beitrag | „Was ist SEO und warum brauche ich es?" |
| **Consideration** | „beste", „vergleich", „vs", „top", „alternative" | Vergleichsseite | „Beste Webdesign-Agentur im Vergleich" |
| **Decision** | „kosten", „preise", „erfahrungen", „bewertung" | Leistungs-/Preisseite | „Webdesign Kosten und Preise" |
| **Implementation** | „anleitung", „tutorial", „vorlage", „checkliste" | How-to, Ressource | „Website-Relaunch-Checkliste" |

**Kern-Einsicht:** Die meisten Sites überinvestieren in Awareness-Content und unterinvestieren in Decision-Content. Decision-Keywords (Kosten, Preise, Bewertungen) konvertieren 5–10× besser.

## Content-Priorisierungs-Scoring

Jede Content-Idee auf 4 Faktoren bewerten:

| Faktor | Gewicht | Score 1–10 |
|--------|:-------:|:----------:|
| **Kundenwirkung** — wie oft kommt das Thema auf? | 40 % | |
| **Content-Market-Fit** — führt es zu unseren Leistungen? | 30 % | |
| **Suchpotenzial** — gibt es Nachfrage? wachsend? | 20 % | |
| **Ressourcen-Aufwand** — können wir autoritativen Content liefern? | 10 % | |

**Formel:** (Wirkung × 0,4) + (Fit × 0,3) + (Such × 0,2) + (Ressourcen × 0,1) = Prioritäts-Score

### Beispiel
| Idee | Wirkung | Fit | Such | Ressourcen | Score |
|------|:-------:|:---:|:----:|:----------:|:-----:|
| „Was kostet eine Website?" | 9 | 9 | 8 | 8 | 8,7 |
| „Geschichte der Software" | 3 | 2 | 4 | 9 | 3,5 |

## Hub&Spoke-Content-Architektur

```
Hub (Pillar-Page)
├── Spoke 1 (Unterthema-Artikel)
├── Spoke 2 (Unterthema-Artikel)
├── Spoke 3 (Unterthema-Artikel)
└── Spoke 4 (Unterthema-Artikel)
```

- Hub = umfassende Übersichtsseite (z. B. `/webdesign/`).
- Spokes = detaillierte Artikel zu Unterthemen (z. B. `/blog/was-kostet-eine-website/`).
- Hub verlinkt auf alle Spokes, Spokes zurück auf den Hub.
- Spokes verlinken untereinander auf Verwandtes.
- Baut **thematische Autorität** — Google erkennt, dass das Thema umfassend abgedeckt ist. Die interne Verlinkung folgt den Regeln aus `seo-expertise.md`.

## Kannibalisierungs-Erkennung

**Symptome:**
- Zwei oder mehr Seiten ranken für dasselbe Keyword.
- Rankings pendeln zwischen den Seiten.
- Keine Seite rankt gut (beide auf Seite 2–3 festhängend).

**Erkennung:**
- **Repo (`datenquelle.md` A):** `CLUSTER-MAP.md` und die Quelldateien prüfen — tragen zwei Seiten dasselbe Primär-Keyword in Title/H1? Das ist das erste, kostenlose Warnsignal, direkt aus dem Code.
- **GSC (optional, `datenquelle.md` E):** Positionen pro Query nach Seite aufschlüsseln — erscheinen mehrere URLs für ein Keyword, liegt Kannibalisierung vor.
- **SERP (`datenquelle.md` D):** pendeln bei wiederholten Checks verschiedene eigene URLs auf dieselbe Query.

**Auflösung:**
1. **Zusammenführen:** beide Seiten zu einer stärkeren verschmelzen (schwächere per 301 umleiten).
2. **Differenzieren:** Keyword-Fokus einer Seite auf eine andere Intention verschieben.
3. **Canonical:** Canonical der unwichtigeren Seite auf die primäre zeigen.

## 4-Phasen-Roadmap

#### ⚠ Zielgröße

| | Erwartung | Was zu wenig bedeutet |
|---|---|---|
| **Maßnahmen je Phase** | **3–6**, jede mit erwarteter Wirkung | eine Phase ohne Maßnahme ist eine Überschrift |
| **Woche 1** | enthält, was Sichtbarkeit **verhindert** | steht dort etwas anderes, stimmt die Sortierung nicht |
| **SISTRIX-Budget dieser Station** | **0** | mehr nur mit Ansage vorher — und die Station wird trotzdem fertig, notfalls mit Stufe 3 |

## Phase 1 — Fundament (Wochen 1–4)
- Technisches Setup (Hosting, SSL, Analytics, ggf. GSC).
- Kern-Seiten (Start, Leistungen, Über uns, Kontakt).
- Essenzielles Schema.
- `docs/seo/`-Projekt initialisieren (`/seo:init`).

### Phase 2 — Ausbau (Wochen 5–12)
- Regional-/Standort-Landingpages.
- Blog-Start mit den ersten 3–5 Pillar-Artikeln.
- Interne Verlinkungsstruktur.
- On-Page-Optimierung aller bestehenden Seiten.

### Phase 3 — Skalierung (Monate 4–6)
- Redaktionsplan umsetzen (ca. 2 Artikel/Monat).
- Decision-Content (Preise, Vergleiche, Fallstudien).
- Erweitertes Schema (Service, Breadcrumbs; FAQ nur mit Deprecation-Vorbehalt, `seo-expertise.md`).
- Content-Lücken der Wettbewerber schließen (`compete.md`).

### Phase 4 — Autorität (Monate 7–12)
- Thought-Leadership-Content.
- Linkaufbau und PR-Erwähnungen (für AI-Suche auch Brand-Mentions, `ai-search.md`).
- AI-Such-Optimierung (GEO, `ai-search.md`).
- Monatliche Performance-Reviews und Strategie-Anpassung.
