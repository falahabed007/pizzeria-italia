# Maps: Kategorien & Services (Modul 8)

Der Kategorie- und Service-Plan für einen lokalen Betrieb. **Entsteht auf dem Papier, bevor ein
Maps-Profil geöffnet wird**, und **vor** der Website-Struktur.

Onpage heißt bei einem lokalen Betrieb: Website **plus** Google-Maps-Eintrag, thematisch
deckungsgleich. Das ist der Grund, warum diese Station vor Station 4 liegt.

**Datenwege:** ausschließlich `datenquelle.md` — **S** für das Suchvolumen jedes Kategorie- und Service-Kandidaten (Länderparameter aus `PROJEKT.md`), **D** für den Blick ins Local Pack, **A** für die Leistungen, die der Betrieb wirklich anbietet. Googles Kategorienliste selbst ist keine Datenquelle, sondern die verbindliche Auswahl — sichtbar erst im Profil.

---

## Voraussetzungen

- `docs/seo/PROJEKT.md` (Station 0) — Betrieb, Markt, Einzugsgebiet
- `docs/seo/KEYWORDS.md` (Station 2) — die Recherche ist gelaufen
- Vom Betrieb: **Leistungsliste, Einzugsgebiet, Öffnungszeiten**

Beim echten Kunden wird die vollständige Anforderungsliste (Zugänge, Leistungen, Fotos, Nachweise)
im Erstgespräch geholt — siehe `local.md`. Bei einer Übung reicht, was öffentlich sichtbar ist.

---

## Die Reihenfolge (nicht verhandelbar)

| # | Schritt | Was entschieden wird |
|---|---------|----------------------|
| 1 | Hauptkategorie | Erst: welche Kategorien beschreiben den Betrieb korrekt? Dann: welche davon trifft das stärkste Keyword? |
| 2 | Unterkategorien | Bis zu 9 weitere — die, hinter denen echte Nachfrage steckt |
| 3 | Services | Die einzelnen Leistungen unterhalb der Kategorien, wie sie in Maps eingetragen werden |
| 4 | Website-Struktur | **Erst wenn 1–3 stehen** → Station 4, `seitenbaum.md` |

---

## Erst sammeln, dann aussortieren, dann messen

### Schritt A — breit sammeln

**Zuerst die eine Rückfrage, dann Turn beenden:** „Hast du das Kategoriefeld im Google Business
Profile offen? Tipp die Leistungen ein — Prophylaxe, Implantologie, … — und nenn mir die
Bezeichnungen, die Google dafür anbietet." Erst mit seiner Antwort geht es weiter: seine Liste ist
die verbindliche Auswahl. Sagt er nein (kein Zugang, kein Feld), läuft der Kandidaten-Modus unten —
und das wird so benannt.

Alle Kategorien, die aus Googles Liste in Frage kämen, und alle Leistungen, die der Betrieb
anbietet. Noch ohne Bewertung, noch ohne Zahlen.

⚠ **Googles Kategorienliste ist verbindlich, unsere Vorschläge sind es nicht.** Was es wirklich
gibt, sieht man erst in Googles Auswahl im Profil. Jede hier notierte Kategorie ist ein
**Kandidat**, bis sie dort auftaucht. Das wird dem User so gesagt.

**Liegt Googles Liste vor** — der User hat das Kategoriefeld beim Anlegen offen und nennt die
Bezeichnungen, die Google für seine Begriffe anbietet —, dann sind das keine Kandidaten mehr,
sondern die verbindliche Auswahl: nur diese Bezeichnungen verwenden, Spalte „in Googles Liste?“ =
ja, der letzte Gate-Punkt entfällt. **Eingetragen wird trotzdem erst nach Schritt D** — Plan vor
Profil, das Feld dient bis dahin nur als Blick in die Liste.

### Schritt B — aussortieren, **vor** den Zahlen
Stufe 1, Wahrheit: Was den Betrieb fachlich nicht korrekt beschreibt, fliegt raus. Egal wie hoch
das Suchvolumen ist.

> **Das Sperrrisiko:** Eine Kategorie, die der Betrieb nicht wirklich erfüllt, kann das Profil
> kosten. Ein Dachdecker wird nicht „Solarfirma", auch wenn „Solaranlage <Ort>" mehr Volumen hat.

### Schritt C — messen
Für **jeden** verbliebenen Kandidaten das passende lokale Keyword bilden (`kategorie ort`) und das
Suchvolumen holen — über SISTRIX, mit dem Länderparameter aus `PROJEKT.md`. Jede Zahl bekommt ihre
Qualitätsstufe (siehe `datenquelle.md`).

### Schritt D — entscheiden
Stufe 2, Stärke: **Hauptkategorie = das stärkste Keyword unter den fachlich richtigen.** Die
restlichen bis zu 9 Plätze: die nächststärksten, die ebenfalls stimmen.

---

## Output-Tabelle

Wird nach `docs/seo/MAPS-PLAN.md` geschrieben:

```markdown
# Maps-Plan — <Betrieb>, <Ort>

Stand: JJJJ-MM-TT · Markt: DE|AT|CH · Datenquelle: SISTRIX | frei

## Kategorien

| # | Kategorie-Kandidat | Lokales Keyword | Suchvolumen | Stufe | Fachlich korrekt? | Rolle | in Googles Liste? |
|---|--------------------|-----------------|-------------|-------|-------------------|-------|---|
| 1 | | | | [gut geschätzt] | ja | **Hauptkategorie** |
| 2 | | | | | ja | Nebenkategorie |

Aussortiert in Stufe 1 (Wahrheit), mit Grund:
- <Kategorie> — <warum sie den Betrieb nicht korrekt beschreibt>

## Services

| # | Service | Gehört zu Kategorie | Lokales Keyword | Suchvolumen | Stufe |
|---|---------|---------------------|-----------------|-------------|-------|
| 1 | | | | | |

## Entscheidung
Hauptkategorie: <…>, weil <stärkstes Keyword unter den fachlich richtigen>.
```

---

### ⚠ Zielgröße — daran wird geprüft, ob diese Station fertig ist

| | Erwartung | Was zu wenig bedeutet |
|---|---|---|
| **Kategorie-Kandidaten gesammelt** (Schritt A) | **10–25** | unter 8: nur die offensichtlichen erfasst — Googles Liste breiter durchgehen |
| **Kategorien final** | **1 Haupt + 3–9 weitere** | nur 1–2: entweder ist der Betrieb wirklich schmal (dann sagen) oder es wurde zu früh aussortiert |
| **Services** | **10–30** | unter 8: die Leistungsliste wurde nicht ausgeschöpft — die Cluster-Liste liefert mehr |
| **Kosten** | ~1 Abfrage je Kandidat | Sammeln ist gratis, nur Messen kostet |
| **SISTRIX-Budget dieser Station** | **20** | mehr nur mit Ansage vorher — und die Station wird trotzdem fertig, notfalls mit Stufe 3 |

## Gate (Modul 8)

- [ ] Hauptkategorie steht, begründet mit Zahl **und** fachlicher Richtigkeit
- [ ] Höchstens 9 Nebenkategorien, alle fachlich zutreffend
- [ ] Für **jede** Kategorie und **jeden** Service liegt eine Suchvolumen-Zahl mit Stufe vor
- [ ] Aussortierte Kandidaten sind mit Grund dokumentiert — nicht stillschweigend weggelassen
- [ ] Kein Kandidat ist drin, weil das Volumen hoch war, obwohl der Betrieb ihn nicht erfüllt
- [ ] Entweder stammen die Bezeichnungen aus Googles Liste, die der User vor sich hatte — oder ihm ist gesagt, dass die endgültige Liste erst in Googles Auswahl sichtbar wird

Erst wenn alle Haken sitzen: weiter zu `seitenbaum.md`.

---

## Häufigster Fehler

„Erst Maps oder erst Keywords?" — **beides gleichzeitig.** Kategorien werden zuerst *bestimmt*, aber
datengestützt. Wer Kategorien ohne Zahlen wählt, rät. Wer Zahlen ohne fachliche Prüfung folgt,
riskiert das Profil.
