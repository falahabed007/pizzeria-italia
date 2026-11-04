---
name: design-review
description: Anti-AI-Slop-Gate — prüft eine Site vor Launch gegen generischen AI-Look und auf eigenständige Gestaltung. Pflicht vor jedem Launch. Trigger auch bei: Design-Review, Anti-Slop, Launch-Check, sieht das nach AI aus, Qualitäts-Gate, sieht generisch aus.
---

# design-review

Das **Anti-AI-Slop-Gate**: hartes Akzeptanz-Gate vor dem Launch — gegen den generischen „sieht nach AI aus"-Look, für eigenständige und intentionale Gestaltung. Ergänzt `frontend-design` (Haltung beim Bauen) um die Abnahme.

Dies ist die **einzige** Stelle, an der die Kriterien stehen. `motion-website` und `deploy-checklist` verweisen hierher, statt die Liste zu wiederholen.

## Wann

- **Vor jedem Launch — hartes Gate.** Bei FAIL wird nicht gelauncht, sondern gefixt und neu geprüft.
- **On demand**, sobald jemand fragt „sieht das nach AI aus?", „wirkt das generisch?", „ist das Award-Niveau?".

## Vorgehen

1. **[references/](./references/) ansehen** — drei bestandene Heroes (Gartenbau, Anwalt, Heizung). Das ist der Maßstab für eine 3. Sie zeigen absichtlich drei verschiedene Bildsprachen: bewertet wird Eigenständigkeit, nicht Ähnlichkeit zu ihnen. Dort liegt auch [references/tells.md](./references/tells.md) — der destillierte Tell-Katalog (aus Nutlope/hallmark), vor der Punktvergabe überfliegen.
2. **Site laden**, Desktop + Mobile. Above-the-fold zuerst, dann vollständig durchscrollen (Motion und Reveals brauchen das — und axe sieht `[data-reveal]` sonst nicht).
3. **Screenshots ziehen:** Desktop + Mobile, je Above-the-fold + ein Scroll-Zustand. Ein Bild sagt mehr als 1000 Token.
4. **[checklist.md](./checklist.md) bewerten** — erst die Hard-Fails (✗), dann sieben Kategorien à 0–3 Punkte. Pro Kategorie den zutreffenden Anker zitieren **und den Beleg von der Seite**. Punkte werden vergeben, nicht geschätzt.
5. **Kontrast messen, nicht schätzen** — Text über Bild/Canvas kann axe nicht bewerten (Details im Rubric).

## Urteil

**PASS** = ≥ 17/21 **und** keine Kategorie unter 2 **und** kein Hard-Fail. Alles andere ist FAIL; ein einziger Hard-Fail kippt das Gate unabhängig von der Punktzahl.

## Output-Format

- **Gesamturteil zuerst:** `PASS` oder `FAIL`, dahinter die Punktzahl (`18/21`).
- **Punktetabelle** aus dem Rubric, je Kategorie eine Zeile Begründung mit Beleg.
- **Pro Fund eine konkrete Fix-Empfehlung** — nicht „Typo verbessern", sondern „Inter im Hero durch lizenzierte Display-Variable-Font ersetzen, selbst gehostet, eigene Skala mit klarem Step-Verhältnis".
- Bei PASS die stärksten zwei Punkte kurz benennen.
- **Kein Launch bei FAIL.** Erst fixen, dann erneut durch das Gate.
