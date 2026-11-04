# Standortbestimmung: Wo steht das Projekt?

Der Standortbestimmungs-Workflow: Wo steht das Projekt, und was ist als Nächstes dran?

Diese Datei beantwortet **eine** Frage — nicht „was könnte man alles tun", sondern „was ist der
nächste Schritt, und woran macht sich das fest". Jede Empfehlung endet an einem konkreten
Befehl und stützt sich auf eine Datei unter `docs/seo/`, nie auf ein Gefühl.

**Datenwege:** ausschließlich `datenquelle.md` — gelesen wird **A** (die Projektdateien im
Repo). Diese Station **holt keine neuen Zahlen**. Sie liest, was andere Stationen hinterlegt
haben, und prüft mit, ob die Datenquelle überhaupt angebunden ist.

---

## Der Ablauf

## 1. Projekt-Existenz prüfen
Prüfe, ob `docs/seo/PROJEKT.md` im Arbeitsverzeichnis existiert.
- Existiert **nicht**: Kein SEO-Projekt eingerichtet. Empfiehl `/seo:init` (fehlt auch `docs/seo/EINRICHTUNG.md`, zuerst `/seo:setup`), erkläre kurz was init tut, und **stoppe hier** —
  Antwort ausgeben, Turn beenden. Nicht selbst initialisieren, auch nicht, wenn der Nutzer im selben Turn den Betrieb
  nennt oder Nachfragen beantwortet — auch nicht in einem späteren Turn. Nennt der Nutzer daraufhin Betrieb, Domain
  oder Ort, ist das eine Antwort, keine Freigabe: bestätigen und um den getippten `/seo:init` bitten. Diese Station legt
  grundsätzlich keine Datei an und ruft keinen anderen Befehl auf.
- Existiert: weiter zu Schritt 2.

## 2. Alle Projekt-Dateien lesen
Lies jede Datei in `docs/seo/`: PROJEKT.md, **PIPELINE.md**, KEYWORDS.md, MAPS-PLAN.md, SEITENBAUM.md, LOCAL-CHECK.md, CLUSTER-MAP.md, STRATEGIE.md, KONKURRENZ.md, OFFPAGE.md, RANKING-LOG.md. Notiere, welche fehlen oder leer sind (Zeichen für unvollständiges Setup).

**`PIPELINE.md` ist die Leitdatei.** Steht sie da, ist die erste offene Station mit offenem Gate die Antwort auf „was als Nächstes" — vor jeder anderen Empfehlung. Prüfe dabei auch die Datenquelle: läuft SISTRIX, oder tragen alle Zahlen gerade nur Stufe 3?

## 3. Zustand analysieren
Bestimme: Setup-Vollständigkeit, Keyword-Abdeckung (getrackt / mit Seite / Content-Lücke), Ranking-Verteilung (Top 10 / Top 20 / dahinter / unbekannt), Content-Lücken (Keywords ohne Seite, nach geschätzter Nachfrage priorisiert), Strategie-Phase und offene vs. erledigte Punkte.

## 4. Tracking-Frische prüfen
Letztes Datum in `RANKING-LOG.md`. Keine Snapshots → `/seo:track` für Baseline empfehlen. Älter als 30 Tage → als überfällig markieren.

## 5. Prioritäten ableiten (Top 3-5, nach Wirkung)
1. **Kritisch** — aktiv schädlich (fallende Rankings, fehlende Seiten, kaputtes Tracking).
2. **Quick-Wins** — Keywords auf Position 4-10 / 11-20, die mit Optimierung auf Seite 1 könnten.
3. **Content-Lücken** — nachgefragte Keywords ohne Seite.
4. **Überfällig** — Snapshots, nicht gestartete Strategie-Punkte.
5. **Wachstum** — neue Keywords, zu analysierende Wettbewerber.

⚠ **Offpage nie empfehlen**, solange Onpage-, Local- oder Technik-Gates offen sind. Modul 16 ist der späte Schritt.
⚠ **GSC früh empfehlen**, auch wenn noch nichts drin steht — eine frische Property braucht Tage bis Wochen bis zu belastbaren Daten.

## 6. Report ausgeben
Strukturierter Status: aktueller Zustand, Trend (falls RANKING-LOG-Vergleich möglich), dann „Was als Nächstes" mit 3-5 konkreten, datenbelegten Aktionen — jede endet mit einem konkreten `/seo:`-Command. Keine generischen Ratschläge; jede Empfehlung referenziert konkrete Daten aus den Projekt-Dateien.
