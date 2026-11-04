---
name: seo
description: Vollständiges, datengestütztes SEO-Workflow-System — deckungsgleich mit dem SEO-Kurs „In Google gefunden werden" (19 Module) und angebunden an den SISTRIX-MCP-Server. Leit-Workflow ist die komplette Kurs-Pipeline in 14 Stationen (Betrieb einordnen → Datenquelle → Keywords → Maps-Kategorien → Seitenbaum → Local → Onpage I-III → Technik → Messen → Offpage/E-E-A-T → Audit → GEO), jede mit Gate. Dazu 13 Einzel-Workflows. Nutze diesen Skill wenn der User an SEO arbeiten will — Seiten für Suchmaschinen optimieren, Keywords recherchieren, Rankings tracken, Site auditieren, SEO-Content erstellen, Wettbewerber analysieren, Google-Business-Profile und Maps-Kategorien planen, Seitenstruktur ableiten, Backlinks aufbauen, oder für AI-Suche (GEO/AI-Overviews) optimieren. Auch bei: SEO, SEO-Audit, SEO-Check, Keywords, Keyword-Recherche, Suchvolumen, SISTRIX, Sichtbarkeitsindex, Rankings, Google Search Console, GSC, SERP, Suchmaschinenoptimierung, Meta-Tags, Title, Meta-Description, Snippet, Open Graph, Schema/JSON-LD, strukturierte Daten, Wettbewerbsanalyse, Seiten-Optimierung, Sitemap, robots.txt, Canonical, hreflang, llms.txt, Core Web Vitals, Indexierung, Local SEO, Google Business Profile, GBP, Google Maps, Kategorien, Services, NAP, Citations, Bewertungen, Local Pack, Seitenbaum, Topic Cluster, Kannibalisierung, Backlinks, Offpage, Linkaufbau, Domain Rating, E-E-A-T, AI-Suche, AI-Overviews, GEO, Citability, Content-Strategie, Buyer-Journey.
---

# SEO

Ein komplettes SEO-Workflow-System, **deckungsgleich mit dem SEO-Kurs** „In Google gefunden werden"
(19 Module, 7 Teile). Was der Kurs lehrt, führt dieser Skill aus — in derselben Reihenfolge, mit
denselben Begriffen, mit denselben Gates. Wer den Kurs kennt, erkennt jede Station wieder.

Datengrundlage ist der **SISTRIX-MCP-Server** (`https://api.sistrix.com/mcp/`), ergänzt um die
Google Search Console für gemessene Zahlen. Ohne angebundene Datenquelle läuft der Skill weiter,
aber jede Zahl trägt dann sichtbar ihre schlechtere Qualitätsstufe.

> **Die Datenschicht ist ein Vertrag.** Woher Zahlen kommen dürfen, steht **komplett** in
> `references/datenquelle.md`. Jeder Workflow ruft nur die dort beschriebenen Wege auf.

---

## Regel null: ein Aufruf, ein Schritt

**Jeder `/seo:`-Befehl macht genau das, wonach er benannt ist — und hört dann auf.** Er ruft keinen
anderen Befehl auf, arbeitet keine weitere Station ab und legt nichts an, was zu einem späteren
Schritt gehört. Der Nutzer tippt den nächsten Befehl selbst.

Das gilt auch dann, wenn der nächste Schritt offensichtlich ist, die Daten schon dalägen, es
schneller ginge oder der Nutzer im selben oder im nächsten Turn Rückfragen beantwortet.
⚠ **Eine Antwort auf eine Rückfrage ist keine Freigabe.** Nennt der Nutzer auf eine Empfehlung hin
den Betrieb, die Domain oder den Ort, hat er deine Frage beantwortet — nicht den nächsten Befehl
erteilt. Bestätige, was du verstanden hast, und bitte ihn, ihn zu tippen.

**Die einzige Ausnahme:** Der Nutzer sagt ausdrücklich, dass mehrere Schritte am Stück laufen
sollen („mach alles bis Station 5", „lauf durch"). Dann darfst du durchlaufen — und sagst am
Anfang, wo du aufhören wirst.

**Jede Antwort endet mit dieser Zeile**, als letzte Zeile, immer im selben Format:

```
▸ Weiter mit: /seo:<befehl>   — <in fünf bis zehn Wörtern, was der tut>
```

Ist der Ablauf zu Ende oder wartet etwas auf den Nutzer (ein Gate, ein Zugang, eine Entscheidung),
steht dort stattdessen, worauf gewartet wird und wer am Zug ist.

⚠ **Der Nachfolger wird nicht abgeleitet, er steht fest** — in jeder Befehlsdatei und hier:
init → keywords → maps → seitenbaum → local → compete → optimize (6) → create (7) → optimize (8) →
audit (9 + 12, die Abnahme) → track (10) → offpage (11) → geo (13). **Nie „die Pipeline
entscheidet", nie `/seo:pipeline` als Nachfolger.** Ob eine Station übersprungen wird, entscheidet der
Nutzer und trägt es als „begründet übersprungen" ein — der Befehl davor empfiehlt es nicht. Eine
Station ohne vollen Zugang (kein GBP, keine GSC) wird trotzdem aufgerufen und liefert Checkliste und
Anforderungen. **Der Audit läuft einmal**, als Abnahme nach Station 8 — er schreibt 9 und 12 in einem Lauf; auf einer selbst gebauten Seite gibt es für einen zweiten Lauf nichts mehr zu finden. Anlass: nach Station 4 stand „die Pipeline entscheidet, ob Station 5 übersprungen
wird" — vor laufender Kamera, und der Nutzer wusste nicht mehr, was er tippen soll.

**Warum das hart ist:** Diese Befehle werden im Kurs vor laufender Kamera vorgeführt. Wenn ein
Befehl von selbst weiterläuft, fehlt der Schritt im Video — und der Kurs lehrt genau das Gegenteil:
Der Mensch entscheidet, die Maschine führt aus, und zwar einen Schritt nach dem anderen.

---

## Regel eins a: jede Station hat ein Abfrage-Budget — und kommt damit aus

Das Budget je Station steht in `datenquelle.md` und ist so bemessen, dass die Station **vollständig
fertig wird**. Es wird **vorher** verplant, nicht unterwegs verbraucht: zu Beginn ausrechnen, wie
viele Begriffe gemessen werden, und bei Bedarf priorisieren.

**Erst nachsehen, dann fragen.** Steht eine Zahl schon in einer Datei unter `docs/seo/`, wird sie
gelesen. Dieselbe Zahl zweimal zu holen ist der häufigste Verlust.

**Reicht das Budget nicht, wird trotzdem fertig gearbeitet:** das Wichtigste wird gemessen, der Rest
bekommt Stufe 3 `[grob geschätzt]` und wird so gekennzeichnet. **Ein Abbruch mitten in der Station
ist keine Option.** Am Ende steht eine Zeile mit Verbrauch gegen Budget.

---

## Regel eins c: was die Antwort behauptet, steht in der Datei — geprüft, nicht angenommen

Jeder Lauf endet mit einem **Artefakt-Abgleich**, bevor die Antwort rausgeht:

1. **Jede Zahl aus der Zusammenfassung wird in der Datei nachgezählt.** „577 Keywords" heißt: die
   Tabelle in `KEYWORDS.md` hat 577 Zeilen. „15 Lücken" heißt: 15 Zeilen in `KONKURRENZ.md`.
   Stimmt es nicht, wird die Datei vervollständigt — nicht die Zahl in der Antwort angepasst.
2. **Die Arbeitsdatei ist vollständig, nie eine Zusammenfassung mit Verweis.** Ein „Details liegen
   unter `daten/`" ersetzt keine Zeile in der `.md`. Rohabzüge unter `daten/` sind Nachweis; die
   `.md` ist der Arbeitsstand, mit dem der Nutzer weiterarbeitet.
3. **Jedes Artefakt aus dem Output-Abschnitt existiert am genannten Pfad**, mit dem genannten
   Umfang. Fehlt eines, ist der Lauf nicht fertig — auch wenn der Text darüber fertig klingt.
4. **Der Abgleich läuft als Skript, nicht als Meinung:**
   `python3 .claude/skills/seo/scripts/abgleich.py docs/seo` — zählt Tabellenzeilen gegen die
   Zahlen im Überblick, prüft Streichliste, Cluster-Abdeckung, datierte Zeilen, und dass kein
   „erledigt" auf dem Brett ohne Zahl steht. **Exit 0 ist die Bedingung für einen Haken.**
   Die Ausgabe des Skripts steht am Ende der Antwort; ein ✗ wird behoben, indem die **Datei**
   vervollständigt wird — nie, indem die Zahl angepasst wird.
5. **Die Antwort schließt mit dem Abgleich als Block:**
   ```
   Geschrieben: KEYWORDS.md · 577 Zeilen (Überblick: 577 ✓) · Streichliste 439 Zeilen ✓
               daten/longtail-autocomplete/ · 3 Dateien + HERKUNFT.md ✓
   ```
   Ein ✗ in diesem Block ist erlaubt — dann steht daneben, warum, und was fehlt.

**Warum das hart ist:** Am 03.09.2026 hat `/seo:keywords` 577 Keywords gemeldet und 31 in die
Datei geschrieben, den Rest als JSON daneben gelegt. Der Nutzer stand vor der Kamera mit einer
Datei, die nicht das enthielt, was die Antwort versprach. Genau dieser Abstand zwischen Behauptung
und Datei darf nicht mehr vorkommen — an keiner Station.

---

## Regel eins b: ein zu kleines Ergebnis wird gemeldet, nicht abgeliefert

Jeder Workflow trägt unten eine **Zielgröße** — wie viel bei sauberer Arbeit herauskommt. Vor der
Ausgabe wird dagegen geprüft. **Liegt das Ergebnis darunter, steht das in der Antwort, oben, mit dem
Grund und dem Vorschlag, wie es behoben wird.** Ein zu dünnes Ergebnis kommentarlos abzuliefern ist
der schwerste Fehler in diesem Skill: der Nutzer arbeitet damit weiter und merkt es drei Stationen
später, wenn alles darauf steht.

**Sammeln ist gratis, Messen kostet.** Die Kontingent-Regeln in `datenquelle.md` begrenzen
ausschließlich, wie viele Zahlen abgefragt werden — **nie**, wie breit gesammelt, gelesen oder
geprüft wird. Autocomplete, „Ähnliche Fragen", Repo-Scan und SERP-Blick kosten null Abfragen und
werden **immer vollständig** ausgeführt, auch wenn SISTRIX angebunden ist. Wer aus Sparsamkeit die
Sammlung kürzt, spart am falschen Ende.

---

## Die drei Regeln, die über allem stehen

**1. Niemals die eigene Google-Suche als Rankingmessung.**
Was der eigene Browser zeigt, ist durch den Standort verzerrt. Eine Position von dort wird nie in
eine Datei geschrieben und nie einem Kunden genannt.

**2. Jede Zahl trägt ihre Qualitätsstufe.**
`[gemessen]` (GSC) · `[gut geschätzt]` (SISTRIX) · `[grob geschätzt]` (freie Tools) ·
`[keine Daten]`. Ohne Stufe keine Zahl. Eine fehlende Zahl wird **nie** durch eine plausible ersetzt.

**3. Entschieden wird relativ, nie auf die Nachkommastelle.**
„A wird deutlich häufiger gesucht als B" trägt eine Entscheidung. Die exakte Zahl trägt keine.

---

## Projekt-Kontext-System

Alle Workflows teilen einen persistenten Kontext im Arbeitsverzeichnis unter `docs/seo/`.
Das ist die einzige Quelle der Wahrheit für den SEO-Stand des Projekts.

**Erste Aktion jedes Workflows: Prüfen, ob `docs/seo/PROJEKT.md` existiert.**
Existiert es → lesen, dann den Workflow ausführen. Existiert es nicht → `/seo:init` empfehlen.

| Datei | Zweck | Entsteht in |
|-------|-------|-------------|
| `PROJEKT.md` | Domain, Markt (DE/AT/CH), Framework, Seiten-Inventar, Datenquellen-Status, NAP-Schreibweise | `init` |
| `PIPELINE.md` | Stationsplan mit Status je Kursmodul — der Fortschrittsbalken des Projekts | `pipeline` |
| `KEYWORDS.md` | Keywords mit Intent, Journey-Stufe, Volumen **mit Stufe**, Ziel-Seite, Position | `keywords` |
| `MAPS-PLAN.md` | Hauptkategorie, Nebenkategorien, Services — je mit Volumen und Wahrheitsprüfung | `maps` |
| `SEITENBAUM.md` | Seitenstruktur 1:1 aus dem Maps-Plan, beidseitig gegengeprüft | `seitenbaum` |
| `LOCAL-CHECK.md` | GBP, NAP, Bewertungen, Citations — Checkliste mit den drei größten Lücken | `local` |
| `CLUSTER-MAP.md` | Keyword→Seite, Content-Lücken, Kannibalisierungs-Risiken | `keywords`, `seitenbaum` |
| `STRATEGIE.md` | Phasen, Prioritäten, Redaktionsplan, KPIs, Wellen | `strategy` |
| `KONKURRENZ.md` | Wettbewerber-Profile, Keyword-Lücken, Backlink-Quellen, SERP-Features | `compete`, `offpage` |
| `OFFPAGE.md` | Stagnationsbeleg, Stufe-1/2/3-Plan, E-E-A-T-Check | `offpage` |
| `RANKING-LOG.md` | datierte Snapshots, Gewinner/Verlierer, Trends | `track` |

Jeder Workflow liest die relevanten Dateien **vor** dem Start und aktualisiert sie **nach** Abschluss.

---

## Leit-Workflow: die komplette Pipeline

**`/seo:pipeline`** → `references/pipeline.md`

Führt einen Betrieb durch **alle 14 Stationen** des Kurses, ohne eine auszulassen. Jede Station hat
ein Gate; ist es offen, geht es nicht weiter.

⚠ **Die Kursmodule 1 bis 4 haben bewusst keine Station.** Willkommen, Crawling/Index/Ranking, der
Suchwandel und die Spielregeln sind Grundlagen, keine Arbeitsschritte — sie erzeugen kein Artefakt
unter `docs/seo/`. Ihr Inhalt lebt trotzdem im Skillset: die Belegstufen und Core Updates aus
Modul 4 stehen in `seo-expertise.md`, Zero-Click aus Modul 2 und 3 in `track.md`, die KI-Antworten
aus Modul 3 in `ai-search.md`. Fragt jemand nach diesen Modulen, ist das die Antwort — nicht
„dazu gibt es keinen Workflow".

Station 0 trägt Modul 5, weil dort die **Einordnung** entschieden wird. Eingetragen wird sie erst
mit `/seo:init` in Modul 6, sobald die Datenquelle steht — im Kurs sind das zwei Videos, im
Workflow eine Station.

| # | Station | Modul | Workflow |
|---|---------|-------|----------|
| 0 | Betrieb einordnen (Local/National, Onpage/Offpage) | M5 | `init.md` |
| 1 | Datenquelle anbinden und prüfen | M6 | `datenquelle.md` |
| 2 | Keyword-Recherche & Suchintention | M7 | `keywords.md` |
| 3 | Maps: Kategorien & Services | M8 | `maps.md` |
| 4 | Seitenbaum, 1:1-Abgleich | M9 | `seitenbaum.md` |
| 5 | Local-SEO-Grundlage | M10 | `local.md` |
| 6 | Onpage I: Title & Meta Description | M11 | `optimize.md` |
| 7 | Onpage II: Content, der rankt | M12 | `create.md` |
| 8 | Onpage III: Struktur & Hygiene | M13 | `optimize.md` |
| 9 | Technisches SEO | M14 | `audit.md` |
| 10 | Messen & Monitoring | M15 | `track.md` |
| 11 | Offpage & E-E-A-T | M16/17 | `offpage.md` |
| 12 | Der SEO-Audit (7 Schritte) | M18 | `audit.md` |
| 13 | GEO-Brücke | M19 | `ai-search.md` |

**Die Reihenfolge ist nicht Geschmack.** Sie ist der Arbeitsablauf aus der Praxis. Drei Stellen,
an denen das Umstellen konkret weh tut:

- **Maps vor Seitenbaum** (3 vor 4). Wer die Website-Struktur zuerst baut, baut sie an den
  Kategorien vorbei — und der 1:1-Abgleich ist danach nicht mehr herstellbar.
- **Daten vor Entscheidung** (1 vor 2/3). Ohne Datenquelle rät auch Claude, nur eloquenter.
- **Offpage zuletzt** (11). Und nur, wenn belegt ist, dass es nicht an Onpage liegt.

---

## Workflow-Router

| User-Intent | Workflow | Kursmodul | Wissen zusätzlich |
|-------------|----------|-----------|-------------------|
| Alles von vorn durchgehen | `references/pipeline.md` | alle | — |
| SEO-Projekt aufsetzen, Betrieb einordnen | `references/init.md` | M5 | `strategy.md` |
| Datenquelle anbinden, Datenweg nachschlagen | `references/datenquelle.md` | M6 | — |
| Keywords recherchieren | `references/keywords.md` | M7 | `strategy.md` |
| Maps-Kategorien & Services planen | `references/maps.md` | M8 | `datenquelle.md` |
| Seitenstruktur ableiten | `references/seitenbaum.md` | M9 | `strategy.md` |
| Google Business Profile, NAP, Bewertungen | `references/local.md` | M10 | `seo-expertise.md` |
| Seite optimieren (Snippets, Struktur) | `references/optimize.md` | M11, M13 | `seo-expertise.md` |
| Content erstellen | `references/create.md` | M12 | `seo-expertise.md` + `strategy.md` |
| Site auditieren (Technik + 7-Schritte-Audit) | `references/audit.md` | M14, M18 | `seo-expertise.md` + `ai-search.md` |
| Rankings tracken, Monitoring-Routine | `references/track.md` | M15 | `strategy.md` |
| Backlinks, E-E-A-T | `references/offpage.md` | M16, M17 | `seo-expertise.md` |
| Wettbewerber analysieren | `references/compete.md` | M7, M18 | `strategy.md` + `ai-search.md` |
| KI-Sichtbarkeit, GEO | `references/ai-search.md` | M19 | — |
| Strategie, Priorisierung, Wellen | `references/strategy.md` | quer | `seo-expertise.md` |
| Status, nächster Schritt | inline (`/seo:help`) | — | `pipeline.md` |

---

## Kernprinzipien

### Immer zuerst den Projekt-Kontext prüfen
Nie bei null anfangen, wenn Kontext existiert. `PIPELINE.md` sagt, wo das Projekt steht.

### Der Standort ist Pflichtparameter
Suchvolumen und SERPs unterscheiden sich pro Land erheblich — und deutsche Zahlen sehen für einen
Schweizer Kunden völlig plausibel aus. Vor jeder Abfrage den Markt aus `PROJEKT.md` lesen. Steht
keiner drin: **fragen**, nicht Deutschland annehmen.

### Wahrheit vor Stärke
Bei Kategorien, Services und Keywords gilt der Zwei-Stufen-Filter: erst raus, was den Betrieb
fachlich falsch beschreibt, **dann** entscheidet das Suchvolumen unter den Übriggebliebenen.
Suchvolumen wählt nicht aus, was ein Betrieb ist — nur unter dem, was er wirklich ist.
Eine erschlichene Kategorie kann das Google-Profil kosten.

### Keine Halluzination von Zahlen
Ohne Datenquelle gibt es **keine** Suchvolumina. Nie eine präzise Zahl erfinden. `[keine Daten]`
ist ein zulässiges Ergebnis, eine erfundene Zahl nicht.

### Der Motion-Check ist nicht verhandelbar
Bei Premium-/Motion-Sites entscheidet, ob der Kerninhalt als **echtes HTML im DOM** steht — nicht
nur im Canvas/WebGL/JS. Fehlt crawlbarer Kerninhalt, deckelt das jeden Score hart. Eine schöne, aber
für Suchmaschinen und LLMs leere Seite ist kein Pass.

### Schema erst im gerenderten HTML prüfen
`curl` auf statisches HTML erkennt kein per JavaScript injiziertes JSON-LD. Nie „kein Schema
gefunden" melden, wenn nur statisches HTML geprüft wurde.

### Anti-Slop ist Pflicht bei Content
`create` generiert **nie** Auto-Publish-Content. Verpflichtender Human-Review-Checkpoint, Zwang zu
First-Hand-Erfahrung und echten Daten, Provenance-Bilder statt generischem AI-Look. Verzahnt mit der
Regel „Anti-AI-Slop (Pflicht)" und dem `design-review`-Gate.

### Erst die Gliederung, dann der Text
Nie umgekehrt. Die Gliederung wird freigegeben, dann entsteht der Text abschnittsweise daraus.

### Vor kostenpflichtigen Aktionen fragen
⚠ **Der SISTRIX-MCP hat ein Tageskontingent** (belegt am 02.09.2026: `SISTRIX API Error (7010):
Daily MCP quota exhausted` nach rund 130 Abfragen). Die frühere Annahme „zieht keine Credits" ist
damit widerlegt. Praktische Folge: **Abfragen bündeln und Rohdaten wegschreiben**, nicht dieselbe
Reihe zweimal ziehen. Teuer sind vor allem Historien — `domain view='visindex' history=true` liefert
nur 13 Wochenpunkte bzw. 30 Tagespunkte; alles davor kostet **eine Abfrage pro Stichtag**.
Regel bleibt: erst die freien Wege, Credit-Aktionen nur nach Bestätigung.

---

## Wissensbasis

- **`references/datenquelle.md`** — der Datenvertrag: SISTRIX-MCP, GSC, freie Fallbacks,
  Qualitätsstufen, Länderparameter. **Zuerst lesen, wenn eine Zahl gebraucht wird.**
- **`references/help.md`** — Standortbestimmung: welche Station ist offen, was ist der nächste
  Schritt, und aus welcher Datei stammt die Empfehlung. Holt selbst keine Zahlen.
- **`references/seo-expertise.md`** — E-E-A-T, Content-Qualitäts-Floors, On-Page-Checkliste,
  Schema-Regeln, Bild-Optimierung, Technical SEO, Astro-/Motion-Spezifika.
- **`references/strategy.md`** — Quick-Wins, Difficulty mit Datenquelle wie ohne, Buyer-Stage-Mapping,
  Priorisierung, Hub&Spoke, Kannibalisierung, Phasen-Roadmap.
- **`references/ai-search.md`** — AI-Overviews/GEO, Citability, AI-Crawler, Brand Mentions,
  Prompt-Tracking.

---

## Commands

| Command | Zweck | Modul |
|---------|-------|-------|
| `/seo:pipeline` | **Die komplette Kurs-Pipeline, Station für Station** | alle |
| `/seo:init` | Projekt initialisieren, Betrieb einordnen, `docs/seo/` anlegen | M5 |
| `/seo:keywords` | Keyword-Recherche und Clustering | M7 |
| `/seo:maps` | Kategorie- und Service-Plan für Google Maps | M8 |
| `/seo:seitenbaum` | Seitenstruktur aus dem Maps-Plan, 1:1 gegengeprüft | M9 |
| `/seo:local` | Local-SEO-Checkliste, GBP, NAP, Bewertungen | M10 |
| `/seo:optimize [url]` | Bestehende Seite optimieren (Snippets, Struktur) | M11, M13 |
| `/seo:create [thema]` | Neue Seite erstellen (Anti-Slop-Gate) | M12 |
| `/seo:audit` | Technik-Check + 7-Schritte-Audit mit Maßnahmenplan | M14, M18 |
| `/seo:track` | Rankings tracken, Snapshot, Monatsroutine | M15 |
| `/seo:offpage` | Backlinks in drei Stufen + E-E-A-T-Check | M16, M17 |
| `/seo:compete [keyword]` | Wettbewerber/SERP analysieren | M7, M18 |
| `/seo:geo` | KI-Sichtbarkeit, Prompt-Tracking | M19 |
| `/seo:strategy` | Strategie, Priorisierung, Wellen | quer |
| `/seo:help` | Status analysieren, nächsten Schritt empfehlen | — |
