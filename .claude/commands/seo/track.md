---
description: Rankings tracken und datierten Snapshot anlegen
---

Verfolge die Ranking-Entwicklung. Lies `docs/seo/RANKING-LOG.md` für vorherige Snapshots. Lade und befolge den Track-Workflow aus `references/track.md` im `seo`-Skill. Default ohne GSC: Positions-Stichproben via SERP-Check, datiert in `RANKING-LOG.md`, Vergleich mit dem vorigen Snapshot (Gewinner/Verlierer/Trend). Liegt ein GSC-CSV-Export unter `docs/seo/gsc/` vor, reichere den Snapshot damit an — den 2-3-Tage-Datenverzug beachten. $ARGUMENTS

---

⚠ **Artefakt-Abgleich zum Schluss — Pflicht.** Jede Zahl aus deiner Zusammenfassung wird in der
Datei nachgezählt; die `.md` ist vollständig, nie eine Zusammenfassung mit Verweis auf einen Ordner;
jedes Artefakt aus dem Output-Abschnitt existiert am genannten Pfad. Danach `python3 .claude/skills/seo/scripts/abgleich.py docs/seo` laufen lassen und die Ausgabe ans Ende der Antwort stellen — **Exit 0 ist die Bedingung, dass die Station als erledigt gilt.** Stimmt etwas nicht, wird
die **Datei** vervollständigt — nicht die Zahl in der Antwort angepasst.

⚠ **Abfrage-Budget — Budget dieses Befehls: 25 SISTRIX-Abfragen.** Es steht in `datenquelle.md` und reicht, um die Station
**vollständig** zu beenden. Vorher verplanen, nicht unterwegs verbrauchen. **Erst in den Dateien
unter `docs/seo/` nachsehen**, ob die Zahl schon da ist — dieselbe Zahl zweimal zu holen ist der
häufigste Verlust. Reicht es nicht für alles: das Wichtigste messen, den Rest als Stufe 3
`[grob geschätzt]` kennzeichnen — **nie abbrechen**. Am Ende eine Zeile:
`SISTRIX: <n> von <budget> Abfragen · <m> Werte aus vorhandenen Dateien gelesen`.

⚠ **Zielgröße prüfen, bevor du ausgibst.** Der Workflow nennt unten, wie viel bei sauberer Arbeit
herauskommt. Liegt dein Ergebnis darunter, schreib das **oben in die Antwort** — mit Grund und
Vorschlag, wie es behoben wird. Nie stillschweigend zu wenig abliefern. Und: **Sammeln kostet keine
Abfragen** — Autocomplete, „Ähnliche Fragen", Repo-Scan und SERP-Blick laufen vollständig, auch mit
angebundenem SISTRIX. Die Kontingent-Regeln begrenzen nur das **Messen**.

⚠ **Ein Aufruf, ein Schritt** (Regel null im `seo`-Skill). Führe **nur** aus, wonach dieser Befehl
benannt ist, dann beende den Turn. Ruf keinen anderen `/seo:`-Befehl auf und arbeite keine weitere
Station ab — auch nicht, wenn es naheliegt, schneller ginge oder der Nutzer Rückfragen beantwortet.
Eine Antwort auf eine Rückfrage ist **keine** Freigabe. Nur wenn er ausdrücklich sagt, dass mehrere
Schritte am Stück laufen sollen, darfst du weitergehen.

Schließe **jede** Antwort mit dieser Zeile ab, als letzte Zeile:

```
▸ Weiter mit: /seo:offpage   — Station 11: Backlinks in drei Stufen, E-E-A-T
```

**Die Kette steht fest und wird nicht abgeleitet:** init → keywords → maps → seitenbaum → local →
compete → optimize (6) → create (7) → optimize (8) → audit (9 + 12, die Abnahme) → track (10) → offpage (11)
→ geo (13). **Nie „die Pipeline entscheidet", nie `/seo:pipeline` als Nachfolger.** Ob
eine Station übersprungen wird, entscheidet der Nutzer, nicht der Befehl — und eine Station, die ohne
Zugang nur teilweise geht (kein GBP, keine GSC), wird trotzdem aufgerufen: sie liefert die Checkliste
und die Anforderungen, und der Nutzer trägt „begründet übersprungen" selbst ein.

Ist die Station noch nicht fertig (Rückfrage offen, Gate nicht bestanden), steht in der letzten Zeile,
worauf gewartet wird und wer am Zug ist — und darüber trotzdem der Befehl, der danach kommt.
