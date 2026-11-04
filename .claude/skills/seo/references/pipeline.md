# Die komplette SEO-Pipeline — Kursablauf von Anfang bis Ende

Der Leit-Workflow. Führt einen Betrieb in der Reihenfolge des SEO-Kurses durch alle Stationen,
ohne eine auszulassen. Jede Station hat ein **Gate**: erst wenn es steht, geht es weiter.

**Grundsatz:** Die Reihenfolge ist nicht Geschmack, sie ist der Arbeitsablauf aus der Praxis.
Wer sie umstellt, arbeitet an den falschen Begriffen und merkt es sechzig Seiten später.

**Was hier zählt, ist die Logik, nicht die Nummer.** Die Stationen tragen zur Orientierung ihre
Kursmodul-Nummer, aber der Skill ist keine Kurs-Kopie: Wo ein Workflow etwas anders benennt oder
anders schneidet als das Handbuch, ist das in Ordnung — solange dieselbe Sache dabei herauskommt und
dieselben Gates halten.

### Nicht jeder Betrieb läuft alle Stationen
| Fall | Stationen 3–5 (Maps, Seitenbaum, Local) | Station 11 (Offpage) |
|---|---|---|
| **Lokaler Betrieb** mit Kunden vor Ort | Pflicht — hier liegt der Hebel | erst bei Stagnation |
| **National/überregional**, kein Ladenlokal | entfallen. Die Seitenstruktur kommt stattdessen aus Keyword-Recherche und Cluster (Station 2 → `strategy.md`) | deutlich früher relevant, weil Onpage allein nicht trägt |
| **Eigene Produkt-/Agentursite** | entfallen, sofern kein lokaler Bezug | wie national |

Was entfällt, wird in `PIPELINE.md` als **begründet übersprungen** eingetragen — nie stillschweigend
weggelassen. Sonst weiß die nächste Session nicht, ob es fehlt oder nicht gebraucht wurde.

---

## Kein Haken ohne Nachzählen

Bevor eine Station auf dem Brett als erledigt gilt, wird das Artefakt **gezählt, nicht gelesen**:

| Station | Artefakt | Was gezählt wird, bevor der Haken kommt |
|---|---|---|
| 2 | `KEYWORDS.md` | Tabellenzeilen = „Keywords gesamt" im Überblick · Streichliste vorhanden, jede Zeile mit Grund |
| 3 | `MAPS-PLAN.md` | jeder Kandidat als Zeile — auch die aussortierten, mit Grund |
| 4 | `SEITENBAUM.md` + `CLUSTER-MAP.md` | Seiten = Kategorien + Services (+3) · kein Cluster ohne Seite |
| 5 | `LOCAL-CHECK.md` | jede NAP-Fundstelle geprüft · Verzeichnis-Tracker ≥ 10 Zeilen mit Grund |
| — | `KONKURRENZ.md` | 15 Gap-Zeilen, Spalte Entscheidung vom Nutzer gefüllt |
| 6–8 | Snippet-Tabelle, Seitenentwurf | alle Seiten in der Tabelle · Gliederung vor Text freigegeben |
| 9 | Audit-Rohbefunde + Triage | jede Prüfgruppe · jeder Befund mit Entscheidung und Grund |
| 10 | `RANKING-LOG.md` | eine datierte Zeile je Cluster-Kopf |
| 11 | `OFFPAGE.md` | 20 Kandidaten mit Entscheidung und Grund |
| 12 | `AUDIT-<datum>.md` | sieben Kapitel · Maßnahmenliste mit Fund, Entscheidung, Grund, Merkmal |
| 13 | GEO-Befund | drei datierte Prompts · Entscheidung Crawler-Zugang |

`/seo:pipeline` und `/seo:help` führen diese Zählung **als Skript** aus, bevor sie einen Status anzeigen:
`python3 .claude/skills/seo/scripts/abgleich.py docs/seo` — Exit 0, sonst kein Haken. Weicht
die Datei von der Behauptung ab, steht die Station auf **offen — Datei unvollständig**, nicht auf
erledigt.

---

## Wie dieser Workflow läuft

1. `docs/seo/PIPELINE.md` lesen. Existiert sie nicht: anlegen (Vorlage unten) und bei Station 0
   starten. Existiert sie: an der ersten offenen Station weitermachen.
2. **Immer nur eine Station pro Aufruf.** Nicht durchrauschen. Am Ende jeder Station: Gate prüfen,
   `PIPELINE.md` fortschreiben, dem User sagen, was als Nächstes dran ist und warum.
3. Ein Gate wird **nie** stillschweigend übersprungen. Fehlt etwas, wird es benannt und die Station
   bleibt offen.

---

## Stationsplan

| # | Station | Kursmodul | Ergebnis | Workflow |
|---|---------|-----------|----------|----------|
| 0 | Betrieb einordnen | M5 | Local/National, Onpage/Offpage-Anteil, Projektakte | `init.md` |
| 1 | Datenquelle anbinden | M6 | SISTRIX verbunden, GSC-Status geklärt | `datenquelle.md` |
| 2 | Keyword-Recherche | M7 | priorisierte Keyword-Liste mit Intent und Stufe | `keywords.md` |
| 3 | Maps: Kategorien & Services | M8 | Hauptkategorie + bis zu 9 weitere + Service-Liste | `maps.md` |
| 4 | Seitenbaum aus Maps | M9 | Seitenstruktur, 1:1 gegengeprüft | `seitenbaum.md` |
| 5 | Local-SEO-Grundlage | M10 | GBP, NAP, Bewertungen, Citations — Checkliste | `local.md` |
| 6 | Onpage I: Snippets | M11 | Title + Meta Description je Seite | `optimize.md` |
| 7 | Onpage II: Content | M12 | Gliederung → Text, Anti-Slop-Gate bestanden | `create.md` |
| 8 | Onpage III: Struktur | M13 | Canonicals, Cluster, URLs, interne Links, Sitemap | `optimize.md` |
| 9 | Technik + Abnahme | M14 + M18 | ein Lauf `/seo:audit`: Rohbefunde, Triage, sieben Schritte, Maßnahmenplan — schreibt 9 und 12 | `audit.md` |
| 10 | Messen | M15 | GSC eingerichtet, KPI-Baseline, Monatsroutine | `track.md` |
| 11 | Offpage & E-E-A-T | M16/17 | **erst wenn es stagniert** — Linkplan, Vertrauenssignale | `offpage.md` |
| 12 | Audit-Dokument | M18 | `AUDIT-<datum>.md` mit Kundenreport — entsteht im Lauf von Station 9 | `audit.md` |
| 13 | GEO-Brücke | M19 | KI-Sichtbarkeit, Prompt-Tracking | `ai-search.md` |

---

## Station 0 — Betrieb einordnen (Modul 5)

Vor jeder Zahl steht die Einordnung. Ohne sie wird das Falsche verkauft.

**Fragen an den User (gebündelt, einmal):**
- Name, Ort, Branche des Betriebs?
- Kommen die Kunden zu ihm (Ladenlokal, Praxis, Kanzlei) oder fährt er zu ihnen?
- Einzugsgebiet — welche Orte?
- Markt: Deutschland, Österreich, Schweiz? (bestimmt den Länderparameter, siehe `datenquelle.md`)
- Gibt es eine erreichbare Website? Gibt es ein Google Business Profile?

**Einordnung, die daraus folgt:**

| Achse | Werte | Konsequenz |
|---|---|---|
| Reichweite | Local / National / Global | Local: Maps ist gleichrangig mit der Website |
| Schwerpunkt | Onpage / Offpage | Local in einer Mittelstadt: Onpage reicht. Nur Millionenstadt oder National dreht das |

**Gate 0:** Website erreichbar, Google Business Profile vorhanden. **Fehlt das Profil**, läuft
Station 5 nur als Plan (Kategorien und NAP werden erarbeitet, aber nicht eingetragen und nicht
abgeglichen) und Schritt 6 des Audits wird begründet übersprungen — das wird jetzt gesagt, nicht
später. **Alles andere läuft trotzdem:** Station 9 braucht kein Profil, Station 12 auch nicht, und
Station 10 braucht **keine eigene Domain** — eine URL-Präfix-Property in der Search Console geht
auf jeder erreichbaren Adresse, auch auf einer netlify-Subdomain (HTML-Tag oder Datei). Nur die
Domain-Property braucht DNS. „Läuft leer“ darf bei 10 also nur stehen, wenn es gar keine
erreichbare Adresse gibt.

---

## Station 1 — Datenquelle (Modul 6)

Vollständig in `datenquelle.md`. Hier nur der Ablauf:

1. Prüfen, ob `sistrix`-Tools in der Session da sind.
2. Wenn nein: dem User sagen, dass der Connector über `/mcp` autorisiert werden muss. Solange läuft
   Weg 2 (frei) — mit Stufe-3-Kennzeichnung auf jeder Zahl.
3. **Erfolgsnachweis:** eine Zahl abfragen, die nur die Software kennt (Sichtbarkeitsindex einer
   bekannten Domain). Kommt sie, steht die Leitung.
4. GSC-Status klären: verbunden / CSV / keine. In `PROJEKT.md` eintragen.

**Gate 1:** In `PROJEKT.md` steht, welche Datenquelle läuft und welche Qualitätsstufe damit maximal
erreichbar ist. Ohne diesen Eintrag startet keine Recherche.

---

## Station 2 — Keyword-Recherche (Modul 7)

Fünf Schritte, in `keywords.md` ausgeführt: Seeds sammeln → erweitern → Intent und Stufe zuordnen →
Suchvolumen und Konkurrenz prüfen → priorisieren.

**Gate 2:** Jedes Keyword in `KEYWORDS.md` hat Intent, Journey-Stufe und eine Zahl **mit Stufen-
Kennzeichnung**. Keywords ohne Zahl bleiben als „unbelegt" markiert und tragen keine Entscheidung.

---

## Station 3 — Maps: Kategorien & Services (Modul 8)

⚠ **Diese Station kommt vor der Website-Struktur, nicht danach.** Ausgeführt in `maps.md`.

Der Zwei-Stufen-Filter, dessen Reihenfolge nicht verhandelbar ist:

| Stufe | Frage | Wirkung |
|---|---|---|
| 1. Wahrheit | Welche Kategorien beschreiben diesen Betrieb **korrekt**? | Ausschlussfilter. Was fachlich nicht stimmt, fliegt raus — egal wie hoch das Volumen |
| 2. Stärke | Welche der übrigen deckt sich mit dem stärksten Keyword? | wählt daraus die Hauptkategorie |

> **Suchvolumen wählt nicht aus, was du bist. Es wählt nur unter dem aus, was du wirklich bist.**

**Gate 3:** Hauptkategorie + bis zu 9 Nebenkategorien + Service-Liste stehen, jede mit einem
Suchvolumen hinterlegt, jede fachlich zutreffend. Und: das Sperrrisiko wurde geprüft — keine
Kategorie, die der Betrieb nicht wirklich erfüllt.

---

## Station 4 — Seitenbaum (Modul 9)

Fünf Schritte, in `seitenbaum.md`. Kernregel: **1 zu 1, wörtlich.** Jede Kategorie wird eine
Überseite, jeder Service eine Unterseite, die H1 wird wörtlich aus der Bezeichnung abgeleitet.

**Gate 4:** Der Abgleich ist in **beide** Richtungen geprüft — kein Service aus Maps ohne
Unterseite, keine Unterseite ohne Service in Maps. Zweimal „nein" auf die Kontrollfrage.

⚠ Und die ehrliche Ansage: 40 Seiten wollen 40 echte Inhalte. Der Seitenbaum ist ein Plan, keine
Website. Was daraus wird, entscheidet Station 7.

---

## Station 5 — Local-SEO-Grundlage (Modul 10)

In `local.md`. Google Business Profile vollständig, NAP überall identisch, Bewertungsprozess,
lokale Keywords, Citations.

**Gate 5:** NAP-Daten stimmen auf Website, GBP und in den geprüften Verzeichnissen **exakt**
überein — gleiche Schreibweise, gleiche Rechtsform, gleiche Telefonnummer-Formatierung.

---

## Zuarbeit zwischen Station 5 und 6 — Wettbewerb (`/seo:compete`)

Keine Station, kein Gate, kein Haken — aber ein fester Platz. Modul 7 (Schritt 4) prüft beim
Recherchieren, **wie schwer** ein Wort ist; das ist in Station 2 erledigt. Modul 18 (Schritt 4)
fragt, **wofür die Konkurrenz oben steht und wir nicht** — die Lücke. Die gibt es erst, wenn
Keyword Map und Seitenbaum stehen (Station 4), und sie wird **vor** dem Schreiben gebraucht
(Station 7 verlangt Konkurrenz-Beobachtungen im Brief). Deshalb hier.

Ergebnis: Gap-Liste in `KONKURRENZ.md`, die Voll-Gaps als offene Lücken in `CLUSTER-MAP.md` —
dort holt Station 7 sie ab, Station 12 übernimmt sie in Schritt 4. Auf dem Brett steht dafür die
Zeile „Wettbewerb (Zuarbeit)“ ohne Nummer; `/seo:compete` trägt dort das Datum ein.

---

## Station 6 — Onpage I: Title & Meta Description (Modul 11)

Je Seite ein eigener Title und eine eigene Meta Description. Kein „Startseite" auf drei Seiten.

**Gate 6:** Jede Seite aus Station 4 hat einen eigenen Title und eine eigene Description, beide
in der Länge geprüft. Keine Dublette im Bestand.

---

## Station 7 — Onpage II: Content (Modul 12)

**Erst die Gliederung, dann der Text.** Nie umgekehrt. Der Content-Brief steht in `create.md`,
das Anti-Slop-Gate ist Pflicht und nicht abkürzbar.

**Gate 7:** Gliederung vom User freigegeben, Text abschnittsweise daraus entstanden, Anti-Slop-Gate
bestanden, Human-Review erfolgt. Kein Auto-Publish.

---

## Station 8 — Onpage III: Struktur & Hygiene (Modul 13)

Duplicate Content, Canonical, Kannibalisierung, Topic Cluster aus dem Seitenbaum, sprechende URLs,
interne Verlinkung und Klicktiefe, Thin Content, XML-Sitemap.

**Gate 8:** Keine zwei Seiten zielen auf dasselbe Keyword. Sitemap vorhanden und eingereicht.
⚠ Entsteht die Sitemap erst über den Maßnahmenplan der Abnahme (Station 9), bleibt das Gate **offen mit
Notiz** — nicht stillschweigend abhaken. Es schließt, wenn die Datei live ist.

---

## Station 9 — Technik und Abnahme (Modul 14 + 18)

Core Web Vitals, HTTP-Statuscodes, `robots.txt` und `noindex`, strukturierte Daten, HTTPS,
Mobile-First — und im selben Lauf die sieben Audit-Schritte. Aufruf **`/seo:audit`** ohne Zusatz,
sobald der Bau steht (nach Station 8). Er hält nach den Rohbefunden an, sortiert auf „jetzt
sortieren", führt dann aus den Dateien zusammen und schreibt Station 9 **und** 12 fort.

⚠ Der Befehl **findet und entscheidet**, er baut nicht. Fehlen robots.txt, Sitemap, Canonical oder
Schema, stehen sie oben im Maßnahmenplan; der Nutzer lässt sie im **nächsten Handgriff** anlegen und
deployen — dann schließen Gate 8 und 9. Gate 10 schließt, wenn die Sitemap in der Search Console
eingereicht ist (Station 10).

**Gate 9:** Kein `noindex` auf einer wichtigen Seite, kein gesperrter Googlebot, CWV gemessen
(nicht geschätzt), Schema im **gerenderten** DOM geprüft.

---

## Station 10 — Messen (Modul 15)

GSC-Property einrichten und verifizieren, Sitemap einreichen, Baseline-Snapshot in
`RANKING-LOG.md`, monatliche Routine festlegen.

⚠ **Zeitfalle:** Eine frische GSC-Property hat tagelang keine Daten. Diese Station wird deshalb so
früh wie möglich **eingerichtet** und erst Wochen später **ausgewertet**. Wer sie erst am Ende
anfasst, wartet am Ende.

**Gate 10:** Property verifiziert, Sitemap eingereicht, Baseline datiert abgelegt.
⚠ Gibt es die Sitemap noch nicht (siehe Gate 8), bleibt das Gate halb offen mit Notiz — die
Property wird trotzdem **jetzt** angelegt, nicht erst, wenn alles fertig ist.

---

## Station 11 — Offpage & E-E-A-T (Modul 16/17)

⚠ **Erst wenn es stagniert.** Offpage ist der späte Schritt, nicht der erste. Wenn Onpage, Local
und Technik stehen und die Impressionen trotzdem seit Wochen flach liegen — dann hierher.
Ausgeführt in `offpage.md`.

**Gate 11:** Vor jedem Linkaufbau ist belegt, dass es **nicht** an Onpage liegt. Beleg aus GSC
oder SISTRIX, nicht aus dem Bauch.

---

## Station 12 — Das Audit-Dokument (Modul 18)

Die sieben Schritte in fester Reihenfolge, in `audit.md`: Ausgangslage → Technik → Onpage →
Keywords/Wettbewerb → Offpage/E-E-A-T → Local → Maßnahmenplan. **Sie entstehen im Lauf von
Station 9** — ein Aufruf, zwei Haken. Nichts davon wird neu erhoben: Onpage aus 6–8, die Lücke aus der
Zuarbeit, Local aus 5. Kapitel ohne Daten (Messen vor der ersten Zahl, Offpage vor der Stagnation)
tragen den Vermerk, warum. Ein zweiter voller Lauf nur auf einer fremden Seite oder drei Monate nach
der Abnahme.

**Die Sortierregel für Schritt 7:**
1. Was Sichtbarkeit überhaupt erst möglich macht (noindex, gesperrter Bot, fehlende Hauptseite).
2. Was viele Seiten auf einmal betrifft (Titles, Ladezeit, interne Links).
3. Einzelfälle. Ein 404 auf einer alten Pressemeldung wandert nach unten, auch wenn das Tool ihn
   rot markiert.

**Gate 12:** Jede Maßnahme in Klartext ohne Fachchinesisch, sortiert nach Wirkung und Aufwand.

---

## Station 13 — GEO-Brücke (Modul 19)

In `ai-search.md`. Ohne SEO kein GEO — diese Station kommt zuletzt, weil sie auf allem davor steht.
Prompt-Tracking, Zitierbarkeit, Brand Mentions, Entitäten-Aufbau.

**Gate 13:** Für mindestens drei realistische Kundenfragen ist notiert, worauf die KI-Antwort sich
beruft und ob der Betrieb darunter ist.

---

## Vorlage `docs/seo/PIPELINE.md`

```markdown
# SEO-Pipeline — <Betrieb>

Stand: JJJJ-MM-TT
Markt: DE | AT | CH
Datenquelle: SISTRIX (OAuth) | frei (Stufe 3) — GSC: verbunden | CSV | keine

| # | Station | Modul | Status | Datum | Notiz |
|---|---------|-------|--------|-------|-------|
| 0 | Betrieb einordnen | M5 | offen | | |
| 1 | Datenquelle | M6 | offen | | |
| 2 | Keyword-Recherche | M7 | offen | | |
| 3 | Maps: Kategorien & Services | M8 | offen | | |
| 4 | Seitenbaum | M9 | offen | | |
| 5 | Local-SEO-Grundlage | M10 | offen | | |
| — | Wettbewerb (Zuarbeit, kein Gate) | M7/M18 | offen | | Gap-Liste → CLUSTER-MAP |
| 6 | Onpage I: Snippets | M11 | offen | | |
| 7 | Onpage II: Content | M12 | offen | | |
| 8 | Onpage III: Struktur | M13 | offen | | |
| 9 | Technik | M14 | offen | | |
| 10 | Messen | M15 | offen | | |
| 11 | Offpage & E-E-A-T | M16/17 | gesperrt bis Stagnation | | |
| 12 | Audit | M18 | offen | | |
| 13 | GEO-Brücke | M19 | offen | | |

## Offene Punkte
-

## Entscheidungen mit Begründung
-
```
