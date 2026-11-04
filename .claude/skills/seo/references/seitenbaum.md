# Seitenbaum: von Maps zur Website-Struktur (Modul 9)

Aus der fertigen Kategorie- und Service-Liste wird die Seitenstruktur. **1 zu 1, wörtlich.**

Voraussetzung: `docs/seo/MAPS-PLAN.md` steht und hat sein Gate bestanden. Ohne das startet dieser
Workflow nicht — er würde sonst eine Struktur auf geratenen Kategorien bauen.

**Datenwege:** Diese Station holt **keine eigenen Zahlen**. Sie rechnet mit dem, was `maps.md` entschieden hat, und mit **A** (Repo) für den Ist-Stand der Seiten. Taucht hier der Wunsch nach einer neuen Zahl auf, ist das ein Zeichen, dass Station 3 nicht sauber abgeschlossen wurde — dann zurück zu `maps.md`, nicht nachmessen.

---

## Der Ablauf in fünf Schritten

1. **Kategorien und Services nehmen** — wie in `maps.md` datengestützt bestimmt. Nichts hier
   dazuerfinden, nichts weglassen.
2. **Pro Kategorie eine Überseite.** Zehn Kategorien, zehn Überseiten.
3. **Pro Service eine Unterseite**, zugeordnet zu der Überseite, zu der ihr Service auch in Maps
   gehört. Dreißig Services, dreißig Unterseiten.
4. **H1 wörtlich ableiten** aus der Kategorie- bzw. Service-Bezeichnung. Nicht „kreativ" umformulieren —
   die Deckungsgleichheit ist der ganze Effekt.
5. **Gegenprüfen, in beide Richtungen.**

⚠ **Schritt 5 wird nicht übersprungen.** Ein Abgleich ist erst dann ein Abgleich, wenn er von beiden
Seiten geprüft wurde.

---

## Die Kontrollfrage

- Gibt es einen **Service aus Maps ohne Unterseite**?
- Gibt es eine **Unterseite ohne Service in Maps**?

Zweimal „nein" → der Seitenbaum deckt sich mit dem Maps-Eintrag. Alles andere ist ein offener Punkt
und wird als solcher benannt, nicht weggerundet.

---

## Überseite und Unterseite

| | Überseite | Unterseite |
|---|---|---|
| entspricht | einer Kategorie | einem Service |
| H1 | wörtlich die Kategorie | wörtlich der Service |
| Aufgabe | Überblick, verlinkt ihre Unterseiten | beantwortet **eine** Leistung vollständig |
| Keyword | `kategorie ort` | `service ort` |

Jede Unterseite verlinkt zurück auf ihre Überseite, jede Überseite auf alle ihre Unterseiten. Das
ist zugleich die interne Verlinkung aus Modul 13.

---

## Die ehrliche Ansage: 40 Seiten wollen 40 echte Inhalte

Der Seitenbaum ist ein **Plan**, keine Website. Bevor er freigegeben wird, gehört der Satz gesagt:

> Jede dieser Seiten braucht einen eigenen, vollständigen Inhalt. Dreißig dünne Seiten schaden mehr
> als fünf gute. Was hier im Plan steht, muss in Station 7 auch geschrieben werden.

Ist die Kapazität dafür nicht da: den Baum **kürzen**, nicht die Inhalte verdünnen. Reihenfolge nach
Suchvolumen und Marge — die stärksten Services zuerst, der Rest wandert in eine spätere Welle und
wird in `STRATEGIE.md` datiert.

---

## Output

Nach `docs/seo/SEITENBAUM.md`, und die Zuordnung Keyword→Seite zusätzlich nach `CLUSTER-MAP.md`:

```markdown
# Seitenbaum — <Betrieb>

Stand: JJJJ-MM-TT · abgeleitet aus MAPS-PLAN.md vom JJJJ-MM-TT

**N Seiten: X Überseiten + Y Unterseiten + Z Bestandsseiten.** ← Pflichtzeile; dieselbe Zahl steht
in der PIPELINE-Notiz zu Station 4, `abgleich.py` vergleicht beide.

## Kategorie 1: <Hauptkategorie>
- **Überseite** `/kategorie/` — H1: „<Kategorie wörtlich>" — Keyword: `kategorie ort` [Stufe]
  - Unterseite `/kategorie/service-1/` — H1: „<Service wörtlich>" — Keyword: `service ort` [Stufe]
  - Unterseite `/kategorie/service-2/` — …

## Kategorie 2: …

## Gegenprüfung
- Services in Maps ohne Unterseite: **keine** | <Liste>
- Unterseiten ohne Service in Maps: **keine** | <Liste>

## Welle
Welle 1 (jetzt): <Seiten>
Welle 2 (ab <Datum>): <Seiten>
```

---

### ⚠ Zielgröße

| | Erwartung | Was zu wenig bedeutet |
|---|---|---|
| **Seiten gesamt** | **je Kategorie 1 Überseite + je Service 1 Unterseite**, plus Start/Kontakt/Impressum | weniger als Kategorien + Services: der 1:1-Abgleich ist gebrochen — er ist die Regel, keine Empfehlung |
| **Cluster ohne Seite** | **0** | jedes übrige Cluster einzeln benennen und entscheiden: eigene Seite, oder bewusst in eine spätere Welle |
| **SISTRIX-Budget dieser Station** | **0** | mehr nur mit Ansage vorher — und die Station wird trotzdem fertig, notfalls mit Stufe 3 |

## Gate (Modul 9)

- [ ] Jede Kategorie hat genau eine Überseite
- [ ] Jeder Service hat genau eine Unterseite, unter der richtigen Überseite
- [ ] Jede H1 ist wörtlich aus der Bezeichnung abgeleitet
- [ ] Gegenprüfung in **beide** Richtungen dokumentiert, zweimal „nein"
- [ ] Der Satz „40 Seiten wollen 40 echte Inhalte" ist gesagt und die Welle festgelegt
- [ ] `CLUSTER-MAP.md` aktualisiert — keine zwei Seiten auf demselben Keyword
