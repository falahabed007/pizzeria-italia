---
description: Die komplette SEO-Pipeline des Kurses, Station für Station
---

Führe die vollständige SEO-Pipeline aus dem Kurs „In Google gefunden werden" aus. Lade und befolge `references/pipeline.md` im `seo`-Skill.

**Ablauf:**
1. `docs/seo/PIPELINE.md` lesen. Existiert sie nicht: aus der Vorlage in `pipeline.md` anlegen und bei Station 0 starten. Existiert sie: an der ersten offenen Station weitermachen.
2. **Immer nur eine Station pro Aufruf.** Nicht durchrauschen — auch nicht, wenn die nächste Station
   klein wirkt, die Daten schon dalägen oder der User im selben Turn Rückfragen beantwortet. Nach der
   Station: Ergebnis ausgeben, sagen was folgt, **Turn beenden**. Der User tippt den nächsten Aufruf selbst.
   ⚠ **Nur-Zeigen-Modus:** Sagt der User „nur die Übersicht", „nur zeigen", „nichts bearbeiten" oder
   Ähnliches, gib ausschließlich das Brett mit allen 14 Stationen und ihrem Stand aus — **keine Station
   anfassen, keine Datei schreiben, keine Datenquelle abfragen.**
3. Am Ende der Station: Gate prüfen, `PIPELINE.md` fortschreiben, dem User sagen was als Nächstes dran ist und **warum diese Reihenfolge**.
4. Ein Gate wird nie stillschweigend übersprungen. Fehlt etwas, wird es benannt und die Station bleibt offen.

Wenn der User eine bestimmte Station nennt (z.B. „Station 3" oder „Maps"), springe dorthin — aber sag vorher, welche früheren Gates noch offen sind und was das für die Ergebnisse bedeutet. $ARGUMENTS

---

⚠ **Artefakt-Abgleich zum Schluss — Pflicht.** Jede Zahl aus deiner Zusammenfassung wird in der
Datei nachgezählt; die `.md` ist vollständig, nie eine Zusammenfassung mit Verweis auf einen Ordner;
jedes Artefakt aus dem Output-Abschnitt existiert am genannten Pfad. Danach `python3 .claude/skills/seo/scripts/abgleich.py docs/seo` laufen lassen und die Ausgabe ans Ende der Antwort stellen — **Exit 0 ist die Bedingung, dass die Station als erledigt gilt.** Stimmt etwas nicht, wird
die **Datei** vervollständigt — nicht die Zahl in der Antwort angepasst.

⚠ **Abfrage-Budget — Budget dieses Befehls: 0 SISTRIX-Abfragen.** Es steht in `datenquelle.md` und reicht, um die Station
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

Schließe **jede** Antwort mit dieser Zeile ab, als letzte Zeile (die Kette unten gilt; nie „die Pipeline entscheidet“):

```
▸ Weiter mit: /seo:<befehl der nächsten offenen Station>   — Station N: <was sie tut>
```

**Die Kette steht fest und wird nicht abgeleitet:** init → keywords → maps → seitenbaum → local →
compete → optimize (6) → create (7) → optimize (8) → audit (9 + 12, die Abnahme) → track (10) → offpage (11)
→ geo (13). **Nie „die Pipeline entscheidet", nie `/seo:pipeline` als Nachfolger.** Ob
eine Station übersprungen wird, entscheidet der Nutzer, nicht der Befehl — und eine Station, die ohne
Zugang nur teilweise geht (kein GBP, keine GSC), wird trotzdem aufgerufen: sie liefert die Checkliste
und die Anforderungen, und der Nutzer trägt „begründet übersprungen" selbst ein.

Ist die Station noch nicht fertig (Rückfrage offen, Gate nicht bestanden), steht in der letzten Zeile,
worauf gewartet wird und wer am Zug ist — und darüber trotzdem der Befehl, der danach kommt.
