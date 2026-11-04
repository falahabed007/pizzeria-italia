# Workflow: Track

Messen & Monitoring — **Modul 15** des Kurses. Datierte Snapshots in `docs/seo/RANKING-LOG.md`,
Vergleich mit dem vorigen (Gewinner/Verlierer/Trend).

⚠ **Die Google Search Console ist hier das Pflicht-Werkzeug, nicht der Zusatz.** Sie liefert als
einzige Quelle `[gemessen]`e Zahlen: Impressionen, Klicks, CTR, Durchschnittsposition. Die
**Impressionskurve ist die Leit-KPI** — sie bewegt sich früher als Positionen und ist der Beleg,
den ein Kunde versteht.

⚠ **Zeitfalle:** Eine frisch angelegte Property hat tagelang keine Daten. Deshalb wird die GSC so
früh wie möglich **eingerichtet** und erst Wochen später **ausgewertet**. Wer das an den Schluss
schiebt, wartet am Schluss.

⚠ **Positionen kommen aus GSC oder SISTRIX (`keyword.domain.seo`), nie aus der eigenen Google-Suche.**

**Zahlen, die der Kunde versteht:** Impressionen und Anfragen, nicht Sichtbarkeitsindex und
Domain Rating. Der Sichtbarkeitsindex ist ein Werkzeug für uns, keine Erfolgszahl fürs Reporting.

### Die monatliche Monitoring-Routine
1. GSC: Impressionen, Klicks, CTR, Position — Vormonat gegen Vor-Vormonat
2. Gewinner und Verlierer je Seite und je Keyword
3. Keywords im Bereich **Position 11–20** heraussuchen — das sind die Quick-Wins
4. Technik-Rundblick: Indexabdeckung, neue 404er, Sitemap-Status
5. Snapshot datiert in `RANKING-LOG.md`, Konsequenzen in `STRATEGIE.md`

**Wenn die Impressionen stagnieren:** erst prüfen, ob es an Onpage liegt (`audit.md`). Erst wenn
das ausgeschlossen ist, geht es zu `offpage.md` — Modul 16 ist der späte Schritt, nicht der erste.

**Wissen laden:** `strategy.md` (Quick-Win-Identifikation — Keywords, die in den Bereich 11–20 wandern). **Datenwege:** ausschließlich `datenquelle.md` — **E** GSC als Leitquelle (`[gemessen]`), **S** für standortneutrale Positionen und Sichtbarkeit. ⚠ **D wird hier nicht zur Positionsmessung benutzt** — die eigene Google-Suche ist als Rankingmessung ausgeschlossen (Kurs, Modul 6).

> **Ehrlichkeits-Grundsatz:** SERP-Checks sind **Stichproben** zu einem Zeitpunkt, von einem Ort, personalisiert/verzerrt — keine Vollabdeckung und kein Ersatz für GSC. Snapshots als das kennzeichnen, was sie sind: beobachtete Momentaufnahmen.

## Kontext

1. `docs/seo/PROJEKT.md` lesen (Domain, `site`, Prioritäten, **GSC-Status**: keine / CSV / API). Fehlt → `/seo:init` empfehlen und stoppen.
2. `docs/seo/KEYWORDS.md` — die wichtigsten Ziel-Keywords und ihre zuletzt bekannten Positionen.
3. `docs/seo/RANKING-LOG.md` — den **vorigen Snapshot** (Datum + Kennzahlen) für den Vergleich.

---

## Modus A — Ohne GSC (Default)

### Schritt A1 — Positions-Snapshot per SERP-Check (datenquelle.md D)

Für die wichtigsten Keywords (nicht alle — die priorisierten aus `KEYWORDS.md`/`STRATEGIE.md`) einen SERP-Check:
- Playwright best-effort auf `google.de/search?q=<keyword>&gl=de&hl=de`, Snapshot. Position der eigenen Domain in den organischen Top-Treffern notieren; steht sie nicht in den sichtbaren Ergebnissen → „> Sichtfenster / unbekannt", **nicht** raten.
- **Blockt Google** (Consent/CAPTCHA): einmal Consent wegklicken, sonst **nicht umgehen** — den User bitten, die Positionen für die Kern-Keywords manuell durchzugeben. Ehrlich kennzeichnen, welche Werte automatisch vs. manuell kamen. Nie Positionen erfinden.
- Realistisch: einige Kern-Keywords sauber prüfen schlägt viele halbgare. Stichproben-Charakter im Snapshot vermerken.

### Schritt A2 — Vergleich mit dem vorigen Snapshot

Aktuelle Positionen gegen die in `RANKING-LOG.md`/`KEYWORDS.md` gespeicherten halten. Kategorisieren (Schwellen, gegen Rauschen robust):
- **Gewinner:** Position um **≥ 2** Plätze verbessert.
- **Verlierer:** Position um **≥ 3** Plätze verschlechtert (asymmetrisch — Verluste erst ab 3 melden, um Tages-Rauschen nicht als Alarm zu werten).
- **Neu:** Keyword erstmals in Sicht.
- **Verloren:** vorher sichtbar, jetzt außerhalb des Sichtfensters.
- **Quick-Win-Kandidaten (`strategy.md`):** in den Bereich **11–20** gewandert → mit gezielter Optimierung auf Seite 1 hebbar (→ `/seo:optimize`).

---

## Modus B — Mit GSC (optional, wenn CSV vorliegt)

Nur wenn unter `docs/seo/gsc/` eine CSV liegt (datenquelle.md E). Reichert den Snapshot mit realen Nachfrage-/Positionsdaten an — ersetzt Modus A nicht, ergänzt ihn.

### Schritt B1 — CSV einlesen (datenquelle.md E)

Die Export-Datei(en) mit `Read`/`Bash` einlesen — Spalten **Query/Seite, Klicks, Impressionen, CTR, Position**. Für Seite **und** Query getrennt, wenn beide Exporte vorliegen.

### Schritt B2 — Auswerten und kategorisieren

- **Gewinner/Verlierer:** Positions-Delta (gleiche Schwellen wie A2) **oder** deutliche Klick-Veränderung.
- **Versteckte Chancen:** hohe Impressionen, aber Position 8–30 → Optimierungsziel.
- **CTR-Problem:** viele Impressionen, CTR unter ~3 % bei guter Position → Title/Meta schärfen (nicht Content) → `/seo:optimize`.

### ⚠️ Vier Fallen bei der Deutung — im Report immer beachten

- **2–3 Tage Datenverzug:** GSC liefert die letzten Tage verzögert; die jüngsten 2–3 Tage können **0** zeigen. Das ist **kein** echter Einbruch — diese Tage vom Trend ausnehmen oder ausdrücklich als „noch nicht vollständig" markieren. Nie als Absturz interpretieren.
- **„Average Position" ist verrauscht:** impression-gewichtet, mischt viele Queries/Seiten, springt schon durch neue Impressionen bei Long-Tail. **Nie als alleiniger KPI.** Immer neben Klicks, Impressionen und den Einzel-Query-Positionen lesen — die Positionsänderung **relevanter** Keywords zählt mehr als die aggregierte Durchschnittsposition.
- **Zero-Click verschiebt das Verhältnis (Kursmodul 2 und 3):** Impressionen können steigen, während
  die Klicks flach bleiben — weil die Antwort direkt in der SERP steht (Featured Snippet, KI-Antwort,
  „Ähnliche Fragen"). Das ist **kein** Rückschritt und wird nicht als einer berichtet. Zu prüfen ist
  die **Klickrate im Zeitverlauf**, nicht die Klickzahl allein. Fällt die Rate bei stabiler Position,
  liegt es an der SERP, nicht an der Seite — dann ist die Frage, ob die Marke in dieser Antwort
  überhaupt vorkommt (`ai-search.md`), nicht wie man eine Position verteidigt.
- **Bevor ein Einbruch der eigenen Seite zugeschrieben wird: lief ein Core Update? (Kursmodul 4)**
  Google schärft die Regeln mehrmals im Jahr nach. Ein Rückgang, der zeitlich mit einem
  angekündigten Update zusammenfällt und **die ganze Branche** trifft, ist etwas anderes als ein
  hausgemachter Fehler — und wird anders behandelt. Prüfschritte in dieser Reihenfolge:
  1. **Datum abgleichen** — beginnt der Rückgang innerhalb des Update-Zeitraums?
  2. **Gegenprobe am Wettbewerb** — bewegt sich deren Sichtbarkeit gleichzeitig (`datenquelle.md` S)?
     Trifft es nur uns, ist es kein Update.
  3. **Erst dann die eigene Seite verdächtigen.**

  ⚠ Ein Core Update ist **keine Entschuldigung**, sondern eine Einordnung. Wer nach einem Update
  verliert, hat aus Googles Sicht die schwächere Seite — die Arbeit bleibt dieselbe, nur die
  Erwartung an das Tempo ändert sich. Und: **während eines laufenden Updates wird nichts
  umgebaut.** Erst den abgeschlossenen Stand abwarten, sonst misst man zwei Dinge gleichzeitig.

---

## Output-Format

```markdown
## Ranking-Report — [Datum]

### Datenbasis
- Modus: [SERP-Stichprobe / GSC-CSV / beides]
- Abdeckung: [n Keywords geprüft] — Stichprobe, keine Vollabdeckung
[bei GSC: Zeitraum, Hinweis "letzte 2–3 Tage unvollständig (Verzug)"]

### Kennzahlen (nur bei GSC)
- Klicks: [n] ([+/-] vs. vorher) · Impressionen: [n] ([+/-])
- Ø-Position: [n] ([+/-]) — verrauscht, nur im Kontext lesen, nie als Einzel-KPI

### Highlights
- [wichtigster Gewinn] · [wichtigste Sorge] · [beste Chance]

### Gewinner (≥ 2 Plätze)
| Keyword | Vorher | Jetzt | Δ | Quelle | Aktion |
|---------|--------|-------|---|--------|--------|
| [kw] | 15 | 8 | +7 | [SERP/GSC] | weiter optimieren |

### Verlierer (≥ 3 Plätze)
| Keyword | Vorher | Jetzt | Δ | Quelle | Aktion |
|---------|--------|-------|---|--------|--------|
| [kw] | 5 | 12 | -7 | [SERP/GSC] | prüfen (`/seo:audit`) |

### Quick-Win-Kandidaten (Position 11–20)
| Keyword | Position | Aktion |
|---------|----------|--------|
| [kw] | 14 | `/seo:optimize` |

### Empfohlene Aktionen
1. [datenbelegte Aktion]
2. [datenbelegte Aktion]
```

## Neuen Snapshot in `RANKING-LOG.md`

Immer **anhängen**, nie überschreiben — die Historie ist der Wert dieses Logs:

```markdown
---

## [Datum] — Snapshot

### Datenbasis
- Modus: [SERP-Stichprobe / GSC-CSV / beides] · Keywords geprüft: [n] (Stichprobe)

### Kennzahlen (falls GSC)
- Klicks: [n] | Impressionen: [n] | Ø-Pos: [n] (verrauscht) | CTR: [%]
- Hinweis: letzte 2–3 Tage wegen GSC-Verzug unvollständig

### Positionen (Kern-Keywords)
| Keyword | Position | Quelle |
|---------|----------|--------|
| [kw] | [n/unbekannt] | [SERP/GSC] |

### Veränderungen ggü. [vorigem Datum]
- Gewinner: [Liste] · Verlierer: [Liste] · Neu: [Liste] · Verloren: [Liste]
```

### ⚠ Zielgröße

| | Erwartung | Was zu wenig bedeutet |
|---|---|---|
| **Verfolgte Begriffe** | alle **Cluster-Köpfe** aus `KEYWORDS.md` | eine Auswahl ohne Grund macht den späteren Vergleich wertlos |
| **Jede Zeile** | Datum · Begriff · Position · Quelle | ein Stand ohne Datum ist kein Ausgangswert |
| **SISTRIX-Budget dieser Station** | **25** | mehr nur mit Ansage vorher — und die Station wird trotzdem fertig, notfalls mit Stufe 3 |

## Dateien aktualisieren

- `docs/seo/RANKING-LOG.md` — neuer datierter Snapshot angehängt (Kernartefakt).
- `docs/seo/KEYWORDS.md` — aktuelle Positionen je Keyword nachziehen (mit Quelle SERP/GSC und Datum).
- `docs/seo/STRATEGIE.md` — Fortschritt gegen Ziele/KPIs notieren; fallende Seiten für `/seo:audit`, Quick-Wins für `/seo:optimize` vormerken.

---

# Die monatliche Monitoring-Routine (Modul 15)

## Welche KPIs zählen
| KPI | Quelle | Stufe | Wofür |
|---|---|---|---|
| **Impressionen** | GSC | `[gemessen]` | die **Leit-KPI**. Steigt sie, wirkt die Arbeit — auch vor dem ersten Klick |
| Klicks | GSC | `[gemessen]` | was ankommt |
| CTR | GSC | `[gemessen]` | wirkt das Snippet? → `optimize.md`, Modul 11 |
| Durchschnittsposition | GSC | `[gemessen]` | Bewegung im Ranking |
| Position je Keyword | SISTRIX `keyword.domain.seo` | `[gut geschätzt]` | standortneutral gemessen, **nie** aus der eigenen Google-Suche |
| Sichtbarkeitsindex | SISTRIX `domain.visibilityindex` | `[gut geschätzt]` | Gesamtbild, Core-Update-Einschläge |
| Anfragen/Termine | Kunde | `[gemessen]` | die Zahl, die den Kunden interessiert |

⚠ **GSC-Verzug: 2–3 Tage.** Die letzten Tage zeigen null. Das ist kein Einbruch.
⚠ **GA4 sieht weniger als die Search Console** — Consent-Banner und Blocker filtern mit. Zwei
verschiedene Zahlen sind kein Fehler, sie messen Verschiedenes.

## Zahlen, die der Kunde versteht
Nicht „DR 40" oder „LCP 2,1 s", sondern: „Ihre Seite wurde diesen Monat X-mal in Google angezeigt,
im Vormonat Y-mal." Der Beleg ist die Impressionskurve — gemessen, direkt von Google.

## Die Routine
1. **Monatlich, fester Termin.** Snapshot in `RANKING-LOG.md`, datiert.
2. Vergleich mit dem Vormonat: Gewinner, Verlierer, Trend.
3. Keywords im Bereich **Position 11–20** heraussuchen — das sind die Quick-Wins (`strategy.md`).
4. Seiten mit fallender Performance durch `audit.md` schicken.
5. `STRATEGIE.md` fortschreiben.

## Wenn die Impressionen stagnieren
Erst prüfen, ob es an Onpage, Technik oder Local liegt. **Erst dann** `offpage.md` — und nur mit
dem Stagnationsbeleg aus dieser Routine (mindestens 4–6 Wochen flach).

## Prompt-Tracking (Brücke zu Modul 19)
Zusätzlich zur klassischen Position: Wird der Betrieb in KI-Antworten genannt? Drei realistische
Kundenfragen festlegen, monatlich stellen, notieren worauf die Antwort sich beruft und ob der
Betrieb darunter ist. Details in `ai-search.md`.
