# Workflow: Compete

Wettbewerber für Keywords/Domains analysieren — wer rankt, warum, wo unsere Content-Lücken sind und wie wir sie schlagen. Mit angebundener Datenquelle laufen die harten Zahlen über SISTRIX — `domain.competitors.seo`
(wer spielt im selben Markt), `keyword.seo` (wer steht wo, standortneutral gemessen),
`domain.opportunities` und `domain.ideas` (wofür rankt der Wettbewerb und wir nicht),
`domain.visibilityindex` (Größenordnung). Ohne Datenquelle: SERP-Top-10 lesen und
Wettbewerber-Seiten auswerten — dann ist **keine** Volumen- oder Difficulty-Aussage zulässig, nur
qualitative. Dazu die eigenen Daten aus `KEYWORDS.md`/`CLUSTER-MAP.md`.

⚠ **Konkurrenzdaten gibt es nur aus einer SEO-Software** (Kurs, Modul 6). Fehlt sie, steht im
Output „keine Konkurrenzdaten verfügbar" — nicht eine geschätzte Zahl.

**Wissen laden:** `strategy.md` (Difficulty-Einschätzung ohne Tool, Quick-Wins) + `ai-search.md` (AI-Overviews/SGE, Citability). **Datenwege:** ausschließlich `datenquelle.md` — **S** für alle Zahlen (Vorrang), **B** gerendertes HTML, **C** Autocomplete, **D** SERP für Intent und Features.

> **Ehrlichkeits-Grundsatz:** Es gibt **keinen** Zugriff auf die vollständige Keyword-Datenbank fremder Domains und **keine** exakten Suchvolumina. Wettbewerber-Keywords werden aus ihren **tatsächlich rankenden Seiten** (SERP + Seiteninhalt) **erschlossen** und immer als „beobachtet/geschätzt" gekennzeichnet — nie als harte Zahl ausgegeben.

## Kontext

1. `docs/seo/PROJEKT.md` lesen (Domain, `site`, Framework, Prioritäten). Fehlt → `/seo:init` empfehlen und stoppen.
2. `docs/seo/KEYWORDS.md` + `docs/seo/CLUSTER-MAP.md` — eigene Keywords/Positionen und Seiten als Vergleichsbasis.
3. `docs/seo/KONKURRENZ.md`, falls vorhanden — bereits bekannte Wettbewerber und frühere Funde.

## Schritt 1 — Wettbewerber identifizieren

Quellen kombinieren:
- **Vom User genannt:** konkrete Wettbewerber.
- **Aus der SERP (datenquelle.md D):** für 3–5 Ziel-Keywords `google.de/search?q=…` per Playwright best-effort, Top-10 (Domain + Title) erfassen. Wer taucht **wiederholt** in den Ziel-SERPs auf?
- **Aus bekannten Daten:** `KONKURRENZ.md`.

Die **drei** Domains bestimmen, die für die Geldbegriffe (Cluster-Köpfe aus `KEYWORDS.md`, ohne Argument der stärkste) am häufigsten vorn stehen — **standortneutral**, aus SISTRIX (`keyword.seo`, `domain.competitors.seo`) und der SERP. Portale, Verzeichnisse und Klinikketten zählen nicht als Wettbewerber, außer der Nutzer will sie. **Blockt Google die Automatisierung** (Consent/CAPTCHA): einmal Consent wegklicken, sonst **nicht umgehen** — den User bitten, die Top-5 + sichtbare Features manuell durchzugeben. Ehrlich kennzeichnen, nie erfinden.

⚠ **Schritt 1 endet mit einer Rückfrage.** Die drei Wettbewerber ausgeben — je Zeile Domain, für welchen Geldbegriff sie vorn stehen und woher die Zahl kommt — und den Nutzer bestätigen oder **einen tauschen** lassen („Tausch Nummer 2 gegen …“). Turn beenden, auf das Ja warten; erst dann laufen Schritt 2–5 und die Abfragen. Warum: die eigene Google-Suche des Nutzers ist standortverzerrt und zeigt andere Drei — die Auswahl gehört ihm, aber auf Basis der neutralen Messung, nicht seines Standorts.

## Schritt 2 — Wettbewerber-Keywords erschließen (statt Datenbank-Abfrage)

Es gibt kein `domain_keywords`-Äquivalent — der Parameter existiert nicht mehr und wird **nicht** ersetzt durch eine erfundene Zahl. Stattdessen aus dem, was sichtbar ist:

- **Rankende Seiten sammeln:** Aus den SERP-Checks (Schritt 1) die konkreten Wettbewerber-**URLs** notieren, die für unsere Ziel-Keywords ranken.
- **Seiteninhalt lesen (datenquelle.md B):** je URL `curl -sL` (oder Playwright fürs gerenderte DOM). Aus Title, H1, H2-Themen und Fließtext die **Keywords/Themen ableiten**, die diese Seite offensichtlich bespielt.
- **Long-Tail ergänzen (datenquelle.md C):** Google Autocomplete auf die Kern-Themen des Wettbewerbers → weitere Phrasen/Fragen, die realer Nachfrage entsprechen.

So entsteht ein **beobachtetes** Keyword-Bild pro Wettbewerber-Seite — ehrlich als Schätzung markiert, nicht als vollständiges Portfolio.

**Difficulty je Keyword** nach dem Framework aus `strategy.md` einschätzen (Stärke der rankenden Domains, Content-Tiefe, SERP-Features) — nicht als erfundener „KD-Score".

## Schritt 3 — Content-Vergleich (unsere Seite vs. ihre)

Für jede relevante Wettbewerber-Seite (datenquelle.md B) gegen die eigene zugewiesene Seite (Repo, datenquelle.md A):

| Faktor | Unsere Seite | Wettbewerber-Seite |
|--------|--------------|--------------------|
| Tiefe/Wortzahl | [n] | [n] |
| H2-Anzahl/Themen | [Liste] | [Liste] |
| Format | [Typ] | [Typ] |
| Eigene Daten/Insights | [ja/nein] | [ja/nein] |
| FAQ/Q&A-Sektion | [ja/nein] | [ja/nein] |
| Interne Verlinkung | [n] | [n] |
| Schema | [Typen] | [Typen] |
| CTA-Strategie | [kurz] | [kurz] |

Lücken kategorisieren: **Voll-Gap** (sie ranken, wir gar nicht) · **Teil-Gap** (beide ranken, sie deutlich höher) · **Unser Vorsprung**.

## Schritt 4 — SERP-Feature-Analyse (Pflicht: AI-Overviews zuerst)

Die größte SERP-Veränderung 2026 sind **AI Overviews / SGE** — sie stehen über den organischen Treffern und ziehen Klicks ab. Diese Analyse **muss** sie einschließen. Details und GEO-Optimierung in `ai-search.md`.

Pro Ziel-Keyword aus dem SERP-Snapshot (datenquelle.md D) erfassen:
- **AI Overview / SGE:** Erscheint eine AI-Zusammenfassung? **Welche Quellen** zitiert sie (sind wir/Wettbewerber dabei)? Welche Passagen wurden gezogen? → Citability-Optimierung nach `ai-search.md`. Fehlt uns crawlbarer, zitierbarer HTML-Content, sind wir hier unsichtbar.
- **Featured Snippet:** Wer besitzt es, welches Format (Absatz/Liste/Tabelle)? Angreifbar?
- **People Also Ask:** Welche Fragen? Beantwortet unser Content sie?
- **Local Pack** (bei lokalem Intent): erscheint es, sind wir/Wettbewerber im Map-Pack?
- **Image-/Video-Pack:** Bilder/Videos in der SERP → eigene Chance?
- **Sitelinks:** haben Wettbewerber Sitelinks (Marken-/Struktur-Signal)?

### ⚠ Zielgröße

| | Erwartung | Was zu wenig bedeutet |
|---|---|---|
| **Wettbewerber analysiert** | **3** (die Top 3 für die Geldbegriffe) | unter 3: die Zwei-von-drei-Regel ist nicht anwendbar |
| **Gap-Liste** | **15 Zeilen** | unter 10: die Keyword-Basis war zu schmal — zurück zu `/seo:keywords` |
| **Entscheidungs-Spalte** | **leer** bis zur Ansage des Nutzers | vorab ausgefüllt = ihm die Entscheidung genommen |
| **SISTRIX-Budget dieser Station** | **20** | mehr nur mit Ansage vorher — und die Station wird trotzdem fertig, notfalls mit Stufe 3 |

## Schritt 5 — Content-Gap und Aktionsplan

**Die Gap-Liste hat 15 Zeilen** (mehr nur auf Wunsch) und eine Spalte **„Entscheidung (Nutzer)"**, die
**leer bleibt**: aufnehmen / bewusst weglassen / spätere Welle — das entscheidet der Nutzer Zeile für
Zeile, mit einem Satz Grund. Nach seiner Ansage eintragen, nie vorab ausfüllen. Regel dazu: eine Lücke
wird nur dann ein Auftrag, wenn **zwei von drei** Wettbewerbern sie besetzen.

⚠ **Spalte „Im Seitenbaum?“ füllt der Befehl, nicht der Nutzer.** Steht `SEITENBAUM.md`, wird jede Zeile
dagegen gehalten: gibt es schon eine Seite für das Thema, steht ihre Adresse in der Spalte — dann ist es
keine Lücke, sondern eine Seite, die noch gebaut wird (Welle 1), und die Entscheidung entfällt. Steht
keine drin, steht ein Strich — **nur diese Zeilen entscheidet der Nutzer.** Der Nutzer muss den Baum
nicht selbst durchsuchen; er liest die Spalte.

- **Themen, die Wettbewerber abdecken und wir nicht:** aus Schritt 2/3 zusammenführen, nach Priorität gruppieren — **Hoch** (relevant + Wettbewerber ranken stark + erschließbare Nachfrage), **Mittel**, **Niedrig**.
- **Fragen, die sie beantworten und wir nicht:** aus PAA + Wettbewerber-FAQ.
- **Aktionsplan** (priorisiert): 1) **Quick-Wins** — Keywords, wo wir knapp hinter Wettbewerbern stehen (Position 4–10). 2) **Lücken füllen** — wertvolle Themen ohne eigene Seite (→ `/seo:create`). 3) **Seiten stärken** — bestehende Seiten vertiefen (→ `/seo:optimize`). 4) **Ungenutzte Chancen** — Keywords, die auch die Wettbewerber (noch) nicht bespielen.

## Output-Format

```markdown
## Wettbewerbsanalyse — [Datum]

### Analysierte Wettbewerber
1. [domain-a.de] — [kurz]
2. [domain-b.de] — [kurz]
3. [domain-c.de] — [kurz]

### Keyword-Überblick (beobachtet/geschätzt)
- Geprüfte Keywords: [n]
- Wo wir vorne sind: [n]
- Wo Wettbewerber vorne sind: [n]
- Voll-Gaps (wir ranken gar nicht): [n]

### Top-Content-Lücken (Hoch)
| Keyword | Difficulty (Schätzung) | Wettbewerber (n von 3) | Ihre Pos | Im Seitenbaum? | Empfohlene Aktion | Entscheidung (Nutzer) |
|---------|------------------------|--------------|----------|---|-------------------|---|
| [kw] | [niedrig/mittel/hoch] | [domain, domain] | [pos] | [`/seite/` oder —] | [create/optimize] | |

### SERP-Features
- AI Overview: [vorhanden? zitierte Quellen? unsere Chance]
- Featured Snippet / PAA / Local / Image / Video: [je Befund]

### Wettbewerber-Profile
[je Wettbewerber: Stärken · Schwächen · Chancen für uns · Bedrohung Hoch/Mittel/Niedrig]

### Aktionsplan
1. [Aktion — erwartete Wirkung]
2. [Aktion — erwartete Wirkung]
```

## `KONKURRENZ.md` schreiben/aktualisieren

Befunde strukturiert in `docs/seo/KONKURRENZ.md` festhalten (anhängen, nie überschreiben — Historie bleibt):

```markdown
# Wettbewerbsanalyse

## Zuletzt aktualisiert: [Datum]

## Wettbewerber: [Domain]

### Überblick
- **Domain:** [url]
- **Typ:** [direkt / indirekt / Nische]
- **Stärken:** [kurz]
- **Schwächen:** [kurz]
- **AI-Sichtbarkeit:** [in AI Overviews zitiert? ja/nein/unbekannt]

### Ihre beobachteten Top-Keywords (wo wir nicht ranken)
| Keyword | Difficulty (Schätzung) | Ihre Pos (beobachtet) | Unsere Aktion |
|---------|------------------------|-----------------------|---------------|
| [kw] | [Schätzung] | [pos] | [Plan] |

### Ihre Top-Seiten
| URL | Bespielte Themen | Notizen |
|-----|------------------|---------|
| [url] | [Themen] | [Notiz] |

### Content-Vergleich
| Thema | Ihre Abdeckung | Unsere Abdeckung | Gap? |
|-------|----------------|------------------|------|
| [Thema] | [Detail] | [Detail] | [J/N] |

---
[je Wettbewerber wiederholen]
```

## Dateien aktualisieren

- `docs/seo/KONKURRENZ.md` — Profile angelegt/aktualisiert (Kernartefakt dieses Workflows).
- `docs/seo/CLUSTER-MAP.md` — neue Gap-Keywords als offene Lücken eintragen.
- `docs/seo/KEYWORDS.md` — neu erschlossene Keywords mit „beobachtet/geschätzt"-Kennzeichnung.
- `docs/seo/STRATEGIE.md` — Aktionsplan-Punkte als priorisierte Tasks aufnehmen.
- `docs/seo/PIPELINE.md` — in der Zeile „Wettbewerb (Zuarbeit)“ Datum und Notiz eintragen. **Kein
  Haken an einer nummerierten Station** — der Wettbewerb ist keine; fehlt die Zeile, anlegen (zwischen 5 und 6).
