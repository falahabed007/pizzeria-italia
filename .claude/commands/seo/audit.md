---
description: SEO-Audit mit Score (On-Page/Technical/Motion-Check)
---

Führe ein SEO-Audit durch. **Umfang:** ohne Zusatz = **die Abnahme** — der Technik-Check (Modul 14, Station 9) und die sieben Kurs-Schritte (Modul 18, Station 12) in **einem** Lauf. Er hält nach den Technik-Rohbefunden an (Triage erst auf „jetzt sortieren“), führt dann Schritt 1 und 3–7 aus den Dateien zusammen — nichts wird neu erhoben — und schreibt Station 9 **und** 12 fort. Er läuft, sobald der Bau steht (nach Station 8). Kapitel ohne Daten (Messen vor der ersten Zahl, Offpage vor der Stagnation) stehen mit Vermerk drin, nicht leer. `technik` (auch „nur Technik“) = nur der Technik-Teil, Station 9, falls die sieben Schritte bewusst später kommen sollen. Ein zweiter voller Lauf hat genau zwei Anlässe: eine fremde Seite, oder drei Monate nach der Abnahme. Prüfe zuerst `docs/seo/PROJEKT.md` für den Projekt-Kontext; fehlt die Datei, empfiehl `/seo:init`. Lade und befolge den Audit-Workflow aus `references/audit.md` im `seo`-Skill (inkl. `seo-expertise.md` und `ai-search.md`). Der Motion-Check (Kerninhalt als echtes HTML im DOM) deckelt den Score hart, wenn er fehlt. Read-only — fehlende Artefakte nur nach Zustimmung generieren; die Umsetzung des Maßnahmenplans ist der nächste Handgriff des Nutzers, nicht Teil dieses Befehls. $ARGUMENTS

---

⚠ **Artefakt-Abgleich zum Schluss — Pflicht.** Jede Zahl aus deiner Zusammenfassung wird in der
Datei nachgezählt; die `.md` ist vollständig, nie eine Zusammenfassung mit Verweis auf einen Ordner;
jedes Artefakt aus dem Output-Abschnitt existiert am genannten Pfad. Danach `python3 .claude/skills/seo/scripts/abgleich.py docs/seo` laufen lassen und die Ausgabe ans Ende der Antwort stellen — **Exit 0 ist die Bedingung, dass die Station als erledigt gilt.** Stimmt etwas nicht, wird
die **Datei** vervollständigt — nicht die Zahl in der Antwort angepasst.

⚠ **Abfrage-Budget — Budget dieses Befehls: 5 (technik) · 5 (voll) SISTRIX-Abfragen.** Es steht in `datenquelle.md` und reicht, um die Station
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
▸ Weiter mit: /seo:track   — Station 10: Search Console, Sitemap einreichen, datierter Nullstand
```

**Die Kette steht fest und wird nicht abgeleitet:** init → keywords → maps → seitenbaum → local →
compete → optimize (6) → create (7) → optimize (8) → audit (9 + 12, die Abnahme) → track (10) → offpage (11)
→ geo (13). **Nie „die Pipeline entscheidet", nie `/seo:pipeline` als Nachfolger.** Ob
eine Station übersprungen wird, entscheidet der Nutzer, nicht der Befehl — und eine Station, die ohne
Zugang nur teilweise geht (kein GBP, keine GSC), wird trotzdem aufgerufen: sie liefert die Checkliste
und die Anforderungen, und der Nutzer trägt „begründet übersprungen" selbst ein.

Ist die Station noch nicht fertig (Rückfrage offen, Gate nicht bestanden), steht in der letzten Zeile,
worauf gewartet wird und wer am Zug ist — und darüber trotzdem der Befehl, der danach kommt.
