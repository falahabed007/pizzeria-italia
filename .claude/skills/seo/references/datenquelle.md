# Datenquelle — der verbindliche Datenvertrag

Diese Datei ist die **einzige** Stelle, an der steht, woher Zahlen kommen dürfen. Jeder Workflow
ruft nur Wege auf, die hier beschrieben sind. Grundlage ist Modul 6 des SEO-Kurses
(„Deine Datenquelle: Warum SEO-Software Pflicht ist").

---

## Die eiserne Regel

> **Benutze niemals deine eigene Google-Suche als Rankingmessung.**

Nicht als groben Check, nicht „nur mal kurz schauen". Was der eigene Browser zeigt, ist durch den
**Standort** verzerrt, dazu Gerät, Sprache, Anmeldestatus und laufende Google-Tests. Eine Position
aus dem eigenen Browser wird **nie** in eine Datei geschrieben und **nie** einem Kunden genannt.

Erlaubt ist die eigene Suche für genau zwei Dinge, beide ohne Zahl:
- **Suchintention prüfen** — welche *Art* Seite steht oben (Ratgeber, Vergleich, Anbieterseite)?
- **`site:domain.de`** — steht die Domain überhaupt im Index? Die Trefferzahl ist eine grobe
  Schätzung und wird als solche gekennzeichnet.

---

## Die drei Datenarten (Modul 6)

| # | Datenart | Was sie beantwortet | Woher |
|---|----------|---------------------|-------|
| 1 | **Keyword-Daten** | Wonach wird wie oft gesucht? | SISTRIX MCP (Suchvolumen), GSC (Impressionen) |
| 2 | **Konkurrenzdaten** | Wer steht wo, für welche Keywords? | **nur** SISTRIX MCP |
| 3 | **Eigene GSC-Daten** | Wo stehst du selbst? | Google Search Console |

Fehlt Datenart 2 komplett, ist keine Wettbewerbsaussage zulässig — dann steht im Output
„keine Konkurrenzdaten verfügbar", nicht eine geschätzte.

---

## Die drei Stufen der Datenqualität — Pflicht-Kennzeichnung

Jede Zahl in jedem Output trägt ihre Stufe. Ohne Stufe keine Zahl.

| Stufe | Kennzeichnung | Was | Woher |
|-------|---------------|-----|-------|
| 1 | `[gemessen]` | Impressionen, Klicks, Position — gezählt, nicht gerechnet | Google Search Console |
| 2 | `[gut geschätzt]` | Suchvolumen, Keyword-Difficulty, Sichtbarkeitsindex | SISTRIX |
| 3 | `[grob geschätzt]` | Suchvolumen in Spannen, ähnliche Begriffe zusammengeworfen | kostenlose Tools |
| — | `[keine Daten]` | nichts gefunden — **nie** durch eine plausible Zahl ersetzt | — |

**Merksatz für Reportings:** Impressionen sind gezählt, Suchvolumen ist gerechnet. Wo die Wahl
besteht, ist das Gezählte der härtere Beleg.

### Entscheide relativ, nie auf die Nachkommastelle
- Belastbar ist der Vergleich: „A wird deutlich häufiger gesucht als B" trägt eine Entscheidung.
- Die Größenordnung reicht. 7.250 oder 14.800 ändert am Vorgehen nichts. 50 oder 5.000 ändert alles.
- Suchvolumen wird **nie allein** gelesen — immer zusammen mit Suchintention und dem, was der
  Betrieb tatsächlich ist.

---

## Das Wegeverzeichnis — die Kürzel, die alle Workflows benutzen

Jeder Workflow verweist über diese Kürzel hierher. Sie sind stabil; ändert sich ein Anbieter,
ändert sich nur die Zeile hier, nicht die Workflows.

| Kürzel | Weg | Qualität | Wofür |
|--------|-----|----------|-------|
| **S** | **SISTRIX über MCP** | `[gut geschätzt]` | **Primärweg für alle Zahlen.** Suchvolumen, Difficulty, Intent, Wettbewerb, Sichtbarkeit, Backlinks, KI-Sichtbarkeit |
| **E** | Google Search Console | `[gemessen]` | eigene Impressionen, Klicks, CTR, Position — der härteste Beleg |
| **A** | Repo / Quelldatei | — | Titles, Meta, Headings, Schema, interne Links direkt aus dem Code |
| **B** | Gerendertes HTML (Playwright) | — | was wirklich im DOM landet. **Pflicht** bei JS-injiziertem JSON-LD |
| **C** | Google Autocomplete / PAA | `[grob geschätzt]` | Keyword-**Ideen**, Fragen. Liefert **keine** Volumina |
| **D** | Live-SERP (Playwright) | — | wer steht oben, welche SERP-Features. Für die **Art** der Seite, **nie** für eine Position |
| **F** | Claude selbst | — | Analyse, Gliederung, Meta-Texte, Content — **nie** eine Quelle für Zahlen |
| **G** | Bilderzeugung (`ai-assets`) | — | Provenance-Bilder statt generischem AI-Look |

> ⚠ **F ist keine Datenquelle.** Claude erzeugt Text und Analyse, aber niemals eine Zahl. Nach
> Suchvolumen gefragt, liefert er ohne S eine plausibel klingende Zahl, die nicht stimmt.

### Die Vorrangregel
**Wo S verfügbar ist, hat S Vorrang vor C und D, sobald es um eine Zahl geht.**
C und D bleiben trotzdem in Gebrauch — für die Suchintentions-Gegenprobe („welche *Art* Seite will
Google hier oben haben") und für PAA-Fragen als Content-Struktur. Beides kann S nicht ersetzen.

**Ist S nicht verbunden**, laufen die Workflows über C/D/E weiter — und **jede** daraus abgeleitete
Zahl wird `[grob geschätzt]` gekennzeichnet, mit der Ansage aus Weg 2 an den User.

---

## Weg 1 (Standard): SISTRIX über MCP

**Server:** `https://api.sistrix.com/mcp/` — in `.mcp.json` des Repos als `sistrix` hinterlegt.
**Anmeldung:** OAuth 2.0 über den SISTRIX-Login (`/mcp` in einer interaktiven Session).
Reine API-Key-Authentifizierung läuft laut SISTRIX zum **31.08.2026** aus — nicht darauf bauen.
**Abrechnung:** MCP-Abfragen ziehen **keine API-Credits** ab — sie laufen aber gegen ein eigenes
**Fair-Use-Tageskontingent**, das um Mitternacht zurückgesetzt wird. Es ist **nicht nachkaufbar**,
die Grenze wird nicht veröffentlicht, und erschöpft meldet sie sich als
`SISTRIX API Error (7010): Daily MCP quota exhausted` — global für alle Werkzeuge, nicht pro Familie.

### ⚠ Was kostet und was nicht — die Trennlinie

**Kostenlos, immer vollständig ausführen** (kein Kontingent, keine Obergrenze):
`curl` auf `suggestqueries.google.com` (Autocomplete) · „Ähnliche Fragen" auf der Trefferseite ·
der Blick auf die Top-10 · Repo-Scan · das Lesen vorhandener Dateien unter `docs/seo/`.

**Kostet je Aufruf eine Abfrage** — nur hier gelten die Obergrenzen unten:
**alle** `mcp__sistrix__*`-Werkzeuge, ausnahmslos. Auch `keyword.questions`, `domain.ideas` und
`domain.opportunities` — die klingen nach Recherche, sind aber SISTRIX und werden mitgezählt.

⚠ **Die häufigste teure Verwechslung:** das Modifier-Fächer (`<seed> kosten`, `wie <seed>`, `<seed> a…z`)
gehört an den **Google-Endpunkt**, nicht an `keyword.questions`. Bei acht Seeds sind das null gegen
dreißig Abfragen — für dasselbe Ergebnis.

### ⚠ Abfrage-Budget je Station — verbindlich, und es reicht

Jede Station hat ein festes Budget. **Es ist so bemessen, dass die Station damit vollständig fertig
wird** — nicht knapp, sondern realistisch. Gerechnet auf der einzigen belastbaren Messung, die wir
haben: **eine `metrics`-Abfrage je Begriff, plus `searchintent` nur dort, wo die Absicht nicht im
Wort steht** (Lauf vom 03.09.2026: 8 Köpfe = 16 Abfragen).

| Station | Befehl | Budget | Woraus es sich rechnet |
|---|---|---|---|
| 0, 1 | `init`, `help`, `pipeline` | **0** | lesen nur Dateien |
| 2 | `keywords` | **40** | Sammeln 0 (`curl`) · 25 Cluster-Köpfe × `metrics` = 25 · `searchintent` für die ~10 unklaren · 5 Reserve |
| 3 | `maps` | **20** | ~12 Kategorie-Kandidaten nach dem Aussortieren · Services, **soweit ihre Zahl nicht schon in `KEYWORDS.md` steht** — dort nachsehen ist Pflicht, nicht neu fragen |
| 4 | `seitenbaum` | **0** | leitet ab, misst nicht |
| 5 | `local` | **5** | drei Kernbegriffe, lokale Sichtbarkeit |
| — | `compete` | **20** | 3 Wettbewerber × (Sichtbarkeit **ein** Wert · Keyword-Bestand · Lücke) ≈ 5–6 je Domain |
| 6–8 | `optimize`, `create` | **10** je Lauf | das Primary steht meist schon in `KEYWORDS.md` — nur das Umfeld kostet |
| 9 + 12 | `audit` | **5** | ein Lauf: Technik über `curl` und PageSpeed, die sieben Schritte aus den Dateien — nur echte Lücken kosten |
| 10 | `track` | **25** | eine Positionsabfrage je verfolgtem Cluster-Kopf |
| 11 | `offpage` | **20** | eigenes Linkprofil + 3 Wettbewerber, plus Bewertung der Kandidaten |
| 13 | `geo` | **20** | drei Prompts, KI-Nennungen, Crawler-Zugang |

**Über einen kompletten Betrieb: rund 170 Abfragen** — verteilt über Wochen, nicht an einem Tag.

#### Wie mit dem Budget gearbeitet wird

1. **Vorher planen, nicht unterwegs merken.** Zu Beginn der Station ausrechnen, wie viele Begriffe
   gemessen werden sollen. Passt es nicht ins Budget, wird **vorher** priorisiert — nicht nach dreißig
   Abfragen abgebrochen.
2. **Erst nachsehen, dann fragen.** Steht die Zahl schon in `KEYWORDS.md`, `MAPS-PLAN.md` oder unter
   `docs/seo/daten/`, wird sie **gelesen**. Eine Zahl zweimal zu holen ist der häufigste Verlust.
3. **Die Station wird fertig — immer.** Reicht das Budget nicht für alles, werden die **wichtigsten**
   Begriffe gemessen (höchste Priorität für die Entscheidung, die ansteht), der Rest bekommt Stufe 3
   `[grob geschätzt]` aus den freien Wegen und wird **so gekennzeichnet**. Ein Abbruch mitten in der
   Station ist keine Option: der Nutzer bekommt ein vollständiges Ergebnis, in dem sichtbar ist, was
   gemessen und was geschätzt ist.
4. **Am Ende jedes Laufs eine Zeile:** `SISTRIX: <n> von <budget> Abfragen · <m> Werte aus vorhandenen
   Dateien gelesen`. Wurde das Budget überschritten, steht **oben** in der Antwort, warum.
5. **Überschreiten nur mit Ansage.** Braucht eine Station mehr, wird das **vor** der Überschreitung
   gesagt — mit Zahl und Grund — und der Nutzer entscheidet. Nie stillschweigend weiterlaufen.

⚠ **Ob das Kontingent mit dem Paket skaliert, ist offen — SISTRIX' eigene Seiten widersprechen sich.**
Die MCP-Erklärseite schreibt „Größere Pakete erhalten entsprechend höhere Limits", die
Changelog-Ankündigung dagegen „keine Credits, keine Kontingent-Beschränkungen, keine Paketgrenzen".
**Daraus folgt: ein Paket-Upgrade ist keine belegte Lösung für ein erschöpftes MCP-Kontingent** —
nicht dazu raten, ohne dass der Support es bestätigt hat. Die Tabelle oben ist auf **Starter**
gerechnet, das kleinste Paket. Die Regel „Zeitreihen nur mit Zeitraum" gilt ohnehin in jedem Paket.
⚠ **Die klassische SISTRIX-API ist bei Starter keine Ausweichmöglichkeit:** sie setzt Professional
oder Premium voraus, und wöchentliche Credits gibt es erst ab Plus. Mit Starter ist MCP der
**einzige** Weg — es gibt keinen zweiten Topf, auf den man ausweichen könnte.

**Tageszähler mit Halt bei 150.** Bei 150 Abfragen hält der laufende Befehl an, meldet den Stand
und fragt, ob weitergezählt werden soll — er bricht nicht ab, aber er läuft auch nicht stillschweigend
weiter. Der Grund: die Grenze ist unbekannt, und ein Fehler 7010 mitten in einer Aufnahme kostet mehr
als jede fehlende Zahl.

**Vorhandene Rohdaten werden nicht neu gezogen.** Liegt unter `docs/seo/daten/` schon ein Abruf mit
`HERKUNFT.md`, wird er **gelesen**, nicht wiederholt — auch dann nicht, wenn er von gestern ist.
Ein Datum in der Herkunftsdatei ist die Antwort auf „ist das noch aktuell", nicht ein Grund für einen
neuen Abruf. Wiederholt wird nur, wenn der Nutzer es ausdrücklich verlangt oder die Daten älter als
vier Wochen sind und eine Entscheidung daran hängt.

**Zeitreihen sind vom Budget ausgenommen und einzeln zu genehmigen.** Sie kosten **eine Abfrage je
Stichtag** — eine offene Historie sprengt jedes Budget in einem einzigen Aufruf. Vor jeder
Zeitreihe: Zeitraum nennen, Punktzahl ausrechnen, ansagen (`13 Wochenpunkte = 13 Abfragen`),
bestätigen lassen. **Ohne begrenzten Zeitraum wird keine Zeitreihe abgerufen — nie.**

### ⚠ Kontingent-Regeln — sie kosten sonst einen Arbeitstag
Am 02.09.2026 war das Tageskontingent nach **einer** Anfrage leer: eine offene Sichtbarkeits-Historie
über `zahn-gesundheitszentrum.de` seit 2019 = 91 Monatspunkte = rund 91 Abfragen.

1. **Zeitreihen sind der teuerste Posten: eine Abfrage je Stichtag.** `history` und `show_all` nie
   ohne begrenzten Zeitraum. Für eine Ausgangslage reichen **12 Monate**; für „läuft es gerade gut"
   reichen 13 Wochenpunkte. Eine Kurve seit 2019 braucht **niemand**, der eine Seite optimieren will.
2. **Eine Abfrage statt drei: `keyword` mit `view="metrics"`** liefert Volumen, Konkurrenz, Klicks und
   Geräteverteilung **zusammen**. `traffic` und `competition` einzeln zu holen ist verdreifachter
   Verbrauch für dieselbe Antwort. Nur wenn ausschließlich das Volumen gebraucht wird, ist `traffic`
   die kleinere Abfrage.
3. **Immer `limit` setzen.** Ohne Grenze paginiert ein Werkzeug sich durch alles, was da ist.
4. **Zahlen nur für die Auswahl, nie für die Rohliste.** Die Rohliste entsteht aus Ideen und Fragen
   (wenige Abfragen für viele Zeilen). Gemessen werden erst die **Cluster-Köpfe** — bei 25 Gruppen
   sind das 25 `metrics` plus 25 `searchintent`, nicht 800.
5. **Vor einem Lauf mit mehr als etwa 20 Abfragen: ansagen, wie viele es werden, und bestätigen
   lassen.** Der Nutzer kann das Kontingent nicht nachfüllen — er kann nur warten.
6. Läuft es doch leer: **nicht auf Weg 2 ausweichen und so tun, als wäre nichts** — sagen, dass ab
   hier Stufe 3 `[grob geschätzt]` gilt, und anbieten, morgen sauber nachzuziehen.
7. **Mitzählen und melden.** Es gibt keine Restanzeige, und SISTRIX veröffentlicht die Grenze nicht —
   die einzige Möglichkeit, das eigene Limit kennenzulernen, ist Buchführung. Am Ende jedes Laufs,
   der SISTRIX benutzt hat, eine Zeile ausgeben: `SISTRIX: N Abfragen in diesem Lauf`. Dieselbe Zahl
   in `docs/seo/PROJEKT.md` unter „Datenquelle" fortschreiben, mit Datum:

   ```
   | Datum | Abfragen | Wofür | Stand danach |
   |---|---|---|---|
   | 2026-09-02 | ~91 + Rest | Sichtbarkeits-Historie 2019–2026 | erschöpft (7010) |
   ```

   Nach ein paar Tagen steht dort, wo die Grenze ungefähr liegt — ohne sie je absichtlich zu suchen.

### Werkzeug-Namen zur Laufzeit ermitteln, nicht raten
Die konkreten Tool-Namen des SISTRIX-MCP-Servers werden **nicht** in dieser Datei festgeschrieben —
sie ändern sich schneller als eine Referenzdatei. Vorgehen:

1. Prüfen, ob `sistrix`-Tools in der Session verfügbar sind. Wenn nein → Weg 2, und dem User sagen,
   dass der Connector über `/mcp` autorisiert werden muss.
2. Die verfügbaren Tools einmal auflisten und den unten stehenden Datenbedarf darauf abbilden.
3. Die gefundene Zuordnung in `docs/seo/PROJEKT.md` unter „Datenquelle" notieren, damit die
   nächste Session nicht wieder sucht.

### Datenbedarf → SISTRIX-API-Familie
Die MCP-Tools spiegeln die SISTRIX-API. Diese Familien sind dokumentiert und decken den Kurs ab:

| Wofür (Kursmodul) | API-Familie | Konkret |
|---|---|---|
| Suchvolumen, Konkurrenz, Klicks (M7) | `keyword.seo.metrics` | Kernzahl jeder Keyword-Entscheidung — **eine** Abfrage für alles davon |
| Suchintention (M7) | `keyword.seo.searchintent` | informational / commercial / transaktional / navigational |
| Fragen zu **einer** Zielseite (M12, `create`) | `keyword.questions` | FAQ und Featured Snippets — aus dem Budget der Station. ⚠ **Kein Sammelwerkzeug für M7:** dort kommen Fragen aus dem `curl`-Fächer und aus „Ähnliche Fragen“ der Trefferseite |
| Wettbewerbsdruck (M7) | `keyword.seo.competition` | ⚠ **steckt schon in `metrics`** — einzeln nur, wenn `metrics` nicht geht |
| SERP-Features (M12, M19) | `keyword.seo.serpfeatures` | Featured Snippet, Local Pack, AI Overview |
| Wer rankt für ein Keyword (M18) | `keyword.seo` | die echten Positionen, standortneutral gemessen |
| Position einer Domain für ein Keyword (M15) | `keyword.domain.seo` | Rankingmessung ohne eigene Google-Suche |
| Sichtbarkeit einer Domain (M18) | `domain.visibilityindex` | Ausgangslage, Verlauf, Core-Update-Einschläge — ⚠ **immer mit Zeitraum**, sonst eine Abfrage je Stichtag |
| Wettbewerber einer Domain (M7, M18) | `domain.competitors.seo` | wer im selben Markt spielt |
| Keyword-Bestand einer Domain (M18) | `domain.kwcount.seo`, `domain.kwcount.seo.top10` | Größenordnung der Basis |
| Keyword-Lücken (M18 Schritt 4) | `domain.ideas`, `domain.opportunities` | wofür rankt der Wettbewerb und wir nicht |
| Seiten-/URL-Inventar (M13) | `domain.urls`, `domain.paths` | Kannibalisierung, Klicktiefe |
| Ranking-Verteilung (M15) | `domain.ranking.distribution` | KPI-Kurve fürs Reporting |
| Backlinks (M16) | `links.*` | Backlink-Profil, verweisende Domains |
| KI-Sichtbarkeit (M19) | `ai.*`, `ai.tracker`, `ai.check` | wird die Domain in KI-Antworten genannt |

### Der Standort ist Pflichtparameter
Suchvolumen und SERPs unterscheiden sich pro Land erheblich, und die deutschen Zahlen sehen für
einen Schweizer Kunden völlig plausibel aus. Deshalb:

**Vor jeder Abfrage den Markt aus `docs/seo/PROJEKT.md` lesen und den Länderparameter bewusst setzen.**

| Markt | SISTRIX `country` | DataForSEO `location_code` |
|---|---|---|
| Deutschland | `de` | `2276` |
| Österreich | `at` | `2040` |
| Schweiz | `ch` | `2756` |

Steht in `PROJEKT.md` kein Markt, wird **gefragt** — nicht Deutschland angenommen.

---

## Weg 2 (Fallback): ohne bezahlte Software

Der Kurs nennt das die Treppe für den Einstieg (Modul 6, „Wenn du das Geld noch nicht hast").
Gültig, aber jede Zahl daraus ist **Stufe 3** und wird so gekennzeichnet.

| Bedarf | Freier Weg | Grenze |
|---|---|---|
| Keyword-Ideen | Google Autocomplete, „Ähnliche Fragen" (PAA) via Playwright | keine Volumina |
| Suchvolumen | Keyword Surfer, Keyword Planner | grobe Spannen, Begriffe zusammengeworfen |
| Suchintention | SERP ansehen: welche *Art* Seite steht oben | keine Zahl, aber belastbar |
| Eigene Position | **Google Search Console** — Stufe 1, kostenlos | nur eigene Domain, nur wo schon Rankings |
| Indexstatus | `site:domain.de` | grobe Schätzung |
| Technik/CWV | PageSpeed Insights, Playwright, `curl` | — |
| Backlinks | kostenloser Backlink-Checker | stark begrenzt |
| Konkurrenzdaten | **fehlt vollständig** | keine Aussage zulässig |

**Ansage an den User, wenn Weg 2 läuft:** „Ohne angebundene Datenquelle sind Suchvolumen und
Wettbewerb geschätzt. Für eine Übung oder ein internes Projekt reicht das, beim zahlenden Kunden nicht."

---

## Weg 3 (immer zusätzlich): Google Search Console

Die einzige Quelle für **gemessene** Zahlen und die Leit-KPI ab Modul 15. Sie gehört dem Kunden,
nicht uns — Zugang wird im Erstgespräch geholt.

- **CSV-Export** aus der GSC-Oberfläche, abgelegt unter `docs/seo/gsc/JJJJ-MM-TT-*.csv`.
- Kennzahlen: Impressionen, Klicks, CTR, Durchschnittsposition — alle `[gemessen]`.
- Was die GSC **nicht** liefert: Suchvolumen für Begriffe, für die noch nichts rankt, und
  Konkurrenzdaten. Dafür bleibt SISTRIX zuständig.
- Neue Property: Es dauert **Tage bis Wochen**, bis belastbare Daten dastehen. Das ist bei jeder
  Planung einzurechnen und dem User anzusagen.

---

## Weg 4: Repo, Playwright, curl

Für alles, was am eigenen Quellcode hängt — unverändert gültig, kostet nichts:

- **Repo lesen** — Titles, Meta, Headings, Schema, interne Links direkt aus der Quelldatei.
- **Playwright** — gerendertes DOM (Pflicht bei JS-injiziertem JSON-LD), SERP-Features, PAA,
  Core-Web-Vitals-Smoke.
- **`curl`** — statisches HTML, Statuscodes, `robots.txt`, `sitemap.xml`, Weiterleitungsketten.

⚠ `curl` auf statisches HTML erkennt **kein** per JavaScript injiziertes JSON-LD. Nie „kein Schema
gefunden" melden, wenn nur statisches HTML geprüft wurde.

---

## Was Claude nie tut

- Eine Zahl erfinden, die wie ein Suchvolumen aussieht. Ohne Quelle steht dort `[keine Daten]`.
- Eine Position aus der eigenen Google-Suche in eine Datei schreiben.
- Deutschland als Markt annehmen, wenn keiner hinterlegt ist.
- Eine Stufe-3-Zahl ohne Kennzeichnung neben eine Stufe-1-Zahl stellen.
- Eine kostenpflichtige Aktion auslösen, ohne vorher zu fragen (gilt für jeden Anbieter, der pro
  Abfrage abrechnet — bei SISTRIX-MCP derzeit nicht der Fall, das kann sich ändern).

---

## Orchestrierungs-Regeln

Übernommen aus dem Original-Skillset (Giuliano/RankM8) und auf SISTRIX übertragen. Sie gelten
unabhängig vom Anbieter.

1. **Nie ein Projekt automatisch auswählen.** Gibt es mehrere Projekte/Domains, wird gefragt —
   nicht das erstbeste genommen.
2. **Pre-Flight vor Content.** Bevor Text entsteht, muss das Ziel-Keyword Daten haben: Volumen,
   Intent, Wettbewerb. Fehlen sie, wird erst recherchiert. Content auf einem unbelegten Keyword ist
   verschwendete Arbeit.
3. **Kostenpflichtige Aktionen erst nach Bestätigung.** Mit Nennung der Größenordnung, bevor sie
   laufen. SISTRIX-MCP zieht derzeit keine Credits — das wird geprüft, nicht angenommen.
4. **Erzeugte Inhalte als `.md` sichern.** Nie nur im Chat stehen lassen. Ablageort erfragen,
   Default ist der Projektordner.
5. **Lange Abfragen abwarten, nicht abbrechen.** Läuft eine Analyse asynchron, wird in Intervallen
   nachgesehen, statt sie neu zu starten.
6. **GSC hat 2–3 Tage Verzug.** Die letzten Tage zeigen null Daten. Das ist kein Einbruch und wird
   nie als solcher berichtet.
7. **Ein Abruf des reinen HTML sieht kein JS-injiziertes Schema.** Nie „kein Schema gefunden"
   melden, wenn nur statisch geprüft wurde.

### ⚠ Korrektur gegenüber der Original-Doku
Das Originalskillset notierte `location_code=2276` als **Schweiz**. Das ist falsch:
`2276` ist **Deutschland** (Ländernummer 276), die Schweiz ist `2756` (756), Österreich `2040` (040).
Wer das übernimmt, misst für jeden Schweizer Kunden deutsche Zahlen — und merkt es nicht, weil sie
plausibel aussehen. Das ist exakt die Falle aus Modul 6. **Immer die Tabelle oben verwenden.**
