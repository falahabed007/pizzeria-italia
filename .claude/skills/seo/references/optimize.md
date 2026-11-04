# Workflow: Optimize

### ⚠ Zielgröße

| | Erwartung | Was zu wenig bedeutet |
|---|---|---|
| **Ohne Argument: Seiten in der Snippet-Tabelle** | **alle** Seiten aus dem Repo-Inventar | eine fehlende Seite ist eine ungeprüfte Dublette |
| **Mit Argument: geprüfte Punkte** | Title · Description · H1 · Überschriften-Hierarchie · interne Links · Schema | ein ausgelassener Punkt gehört benannt, nicht weggelassen |
| **SISTRIX-Budget dieser Station** | **10 je Lauf** | mehr nur mit Ansage vorher — und die Station wird trotzdem fertig, notfalls mit Stufe 3 |

## Umfang: eine Seite oder der Bestand

- **Mit Argument** (`/seo:optimize leistungen`): die eine Seite — Ist-Zustand, Title/Description,
  H1 und Überschriften-Hierarchie (Sprünge markiert), Text, interne Links, Schema. Station 6 und 8.
- **Ohne Argument** (`/seo:optimize`): der **Snippet-Bestand** — Title und Meta Description **aller**
  Seiten aus dem Repo als Tabelle mit Länge, Dubletten markiert, je Seite ein Vorschlag. Das ist
  Station 6 als Ganzes; danach Seite für Seite mit Argument. Der Nutzer lehnt Vorschläge ab, die
  Keywords aneinanderreihen — das ist seine Prüfung, nicht seine Arbeit.


Eine **bestehende** Seite für bessere Rankings verbessern — Meta, Struktur, Content, interne Links, Schema. Deckt **Modul 11** (Title & Meta Description) und **Modul 13** (Struktur & Hygiene) ab. Kernvorteil bei eigenen Sites: Die Quelldatei liegt **im Repo** — kein Umweg „von URL zur Datei", direkt lesen und editieren.

**Wissen laden:** `seo-expertise.md` (On-Page-Checkliste, Schema-Regeln inkl. Deprecations, Media). **Datenwege:** ausschließlich `datenquelle.md` — **A** Repo, **B** gerendertes HTML, **S** für Zielkeyword-Daten, **D** SERP, **E** GSC-CTR (zeigt, ob das Snippet wirkt), **F** Meta/Content durch Claude.

> **Grundsatz:** Erst messen (Ist-Zustand aus dem Repo), dann gegen die Top-5 vergleichen, dann gezielt ändern. Keine Blind-Optimierung, keine erfundenen Zahlen.

## Kontext

1. `docs/seo/PROJEKT.md` lesen (Domain, `site`-URL, **Framework**, Seiten-Inventar, Prioritäten, GSC-Status). Fehlt es → `/seo:init` empfehlen und stoppen.
2. `docs/seo/CLUSTER-MAP.md` lesen — die Keyword→Seite-Zuordnung ist die Grundlage: Welches Primär-Keyword trägt diese Seite, welche sekundären?
3. `docs/seo/KEYWORDS.md` lesen — bekannte Positionen/Intent/Difficulty der Ziel-Keywords.

## Schritt 1 — Seite und Quelldatei finden

Der User nennt eine **URL**, einen **Seitentitel** oder ein **Keyword**. Ziel ist immer die **Quelldatei im Repo**:

- **Keyword gegeben:** in `CLUSTER-MAP.md` die zugewiesene Seite nachschlagen. Ist **keine** Seite zugewiesen (echte Content-Lücke) → nicht hier optimieren, sondern `/seo:create` empfehlen (EAD: erst prüfen, ob überhaupt eine Seite existiert).
- **URL/Titel gegeben:** über das Seiten-Inventar in `PROJEKT.md` bzw. `Glob` (datenquelle.md A) die Route auf die Quelldatei mappen — z. B. `/leistungen` → `src/pages/leistungen.astro` oder Content-Collection-Eintrag.
- **Head-/Layout-Logik zuerst** (datenquelle.md A): das gemeinsame Layout/Head-Component lesen (`src/layouts/**`, `BaseHead.astro`, `**Head*`) — dort sitzt meist Title-Template/OG/Canonical/JSON-LD. Meta wird oft **dort** geändert, nicht in der Seitendatei.

## Schritt 2 — Ist-Zustand aus dem Repo (datenquelle.md A)

Die Quelldatei (und ihr Layout) lesen und den aktuellen Stand festhalten:

- **Title** und **Meta-Description** (aus Frontmatter/Props/Head-Component).
- **H1** und **Heading-Hierarchie** (H2/H3 — Sprünge?).
- **Fließtext:** Trägt der erste Absatz das Primär-Keyword? Grobe **Wortzahl** (Floor je Seitentyp aus `seo-expertise.md` — Wortzahl ist **kein** Ranking-Faktor, nur Deckungs-Proxy).
- **Interne Links:** ausgehende `<a href>` mit Ankertexten; gibt es genug Kontext-Links, sind die Anker sprechend?
- **Bilder:** Alt-Texte, Format, Dimensionen (Details `seo-expertise.md`).
- **Schema:** JSON-LD in Datei/Layout vorhanden und zum Seitentyp passend? **Schema-Regel (datenquelle.md B):** nie „kein Schema" allein aus statischem `curl` schließen — Quelldatei (A) oder gerendertes DOM (B) gegenprüfen.

**Optional, falls GSC-CSV vorliegt (datenquelle.md E):** unter `docs/seo/gsc/` die Query-Zeilen dieser Seite lesen. Zwei Signale:
- **Versteckte Chancen:** Queries auf Position 8–30, die die Seite gar nicht gezielt bespielt.
- **CTR-Problem:** viele Impressionen, wenige Klicks → Title/Description schärfen, nicht Content.
Liegt keine GSC-Datei vor: kein Beinbruch — mit Repo-Daten und SERP-Check weiterarbeiten, Positionen ehrlich als „unbekannt/geschätzt" führen.

## Schritt 3 — Mit den Top-5-Wettbewerbern vergleichen (datenquelle.md D + B)

- **SERP für das Primär-Keyword (datenquelle.md D):** Playwright best-effort auf `google.de/search?q=…`. Wer steht Top-5? Welche SERP-Features (Featured Snippet, PAA, AI Overview)? Wird automatisch geblockt → **nicht** umgehen, den User um die Top-5-Domains bitten, ehrlich kennzeichnen. Nie SERP-Ergebnisse erfinden.
- **Wettbewerber-Seiten lesen (datenquelle.md B):** `curl -sL <competitor-url>` (oder Playwright fürs gerenderte DOM). Pro Top-Seite: Title/H1, Struktur/H2-Themen, Tiefe/Wortzahl, Format, eigene Daten/Winkel, Schema.
- **Gap ableiten:** Welche Unterthemen/Fragen decken die Top-5 ab, unsere Seite nicht? Wo sind **wir** besser? Ziel ist **schlagen, nicht kopieren** — kein „umfassender als alle", sondern der bessere/eigenständige Winkel.

## Schritt 4 — Änderungen umsetzen (Edit auf die Quelldatei)

Jetzt konkret ändern. **Framework-agnostisch:** keine hartkodierten Pfad-/Template-Annahmen (kein fixes Nunjucks/`css/…`/BEM). Das **Framework aus `PROJEKT.md`** respektieren, **Astro als Default-Fall**; bei anderem Framework dessen Konvention. Vor dem Edit die vorhandene Struktur/ein Nachbar-Beispiel lesen.

- **Meta (datenquelle.md F — Claude selbst):** Title (≤ ~60 Z., Keyword vorn, einzigartig, Brand am Ende) und Meta-Description (~150–160 Z., handlungsorientiert). **2–3 Varianten** vorschlagen, nach Auswahl einsetzen. Regeln in `seo-expertise.md`. Kein externer Meta-Generator.
- **Struktur:** genau eine `<h1>` mit Keyword-Bezug (nicht wortgleich zum Title), Hierarchie ohne Sprünge, sekundäre Keywords in H2 wo natürlich.
- **Content:** Primär-Keyword im ersten Absatz; identifizierte Gap-Themen ergänzen; direkte Antwort früh je Sektion (Citability, `ai-search.md`). Substanz statt Fülltext — Anti-Slop gilt auch bei Optimierung (keine erfundenen Statistiken).
- **Interne Links:** kontextstarke Links auf verwandte Seiten mit sprechendem Anker; prüfen, ob **andere** Seiten auf diese verlinken (Anti-Orphan, Hub&Spoke aus `strategy.md`).
- **Schema:** passenden Typ ergänzen/korrigieren (Article/Service/Product/BreadcrumbList). **FAQPage/HowTo nur** mit dem Deprecation-Wissen aus `seo-expertise.md` — Rich Results dafür seit 2023 stark eingeschränkt, **nicht blind** empfehlen.
- **Bilder:** fehlende/schwache Alt-Texte nachziehen, LCP-Bild nicht lazy (`seo-expertise.md`).

**Versteckte GSC-Chancen (nur mit datenquelle.md E):** Für ein auf Position 8–30 rankendes Query prüfen, ob es eine **eigene** zugewiesene Seite in `CLUSTER-MAP.md` hat. Ja → dort optimieren, nicht hier (Kannibalisierung vermeiden). Nein → natürlich in eine passende Sektion dieser Seite aufnehmen.

## Output-Format

```markdown
## Seite optimiert: [Route/Quelldatei]

### Änderungen (Vorher/Nachher)
| Element | Vorher | Nachher | Grund |
|---------|--------|---------|-------|
| Title | [alt] | [neu] | [warum] |
| Meta-Desc | [alt] | [neu] | [warum] |
| H1 | [alt] | [neu] | [warum] |
| Content | [kurz] | [kurz] | [warum] |
| Interne Links | [n] | [n] | [warum] |
| Schema | [alt] | [neu] | [warum] |

### Ziel-Keywords
- Primär: [kw] (Position: [n/unbekannt], Difficulty: [Schätzung])
- Sekundär: [kw1], [kw2]
- Neu aus GSC (falls vorhanden): [kw] (Impressionen: [n], Pos: [n])

### Wettbewerbsvergleich (Top-5)
- Unsere Tiefe/Wortzahl: [n] vs. Top-5-Ø: [n]
- Themen, die wir jetzt abdecken (vorher nicht): [Liste]
- Unser eigenständiger Winkel: [1 Satz]

### Erwartete Wirkung
- [Was sich verbessern sollte und warum — ehrlich, keine Garantie]

### Geänderte Dateien
- [Pfad]: [was geändert]
```

## Dateien aktualisieren

- `docs/seo/CLUSTER-MAP.md` — Zuordnung anpassen, wenn sich Primär/Sekundär geändert hat; geschlossene Lücken markieren.
- `docs/seo/KEYWORDS.md` — neue (aus GSC entdeckte) Keywords und bekannte Positionen nachtragen.
- `docs/seo/STRATEGIE.md` — Optimierungs-Task als erledigt vermerken (Datum, Seite, Kernänderung).
- Nach dem Deploy: über `/seo:track` beobachten, ob die Änderung wirkt (SERP-Stichprobe/GSC).


---

## Kurs-Modul 11: Title und Meta Description

Der Teil dieses Workflows, der am häufigsten allein läuft — „mach mal die Snippets".

**Der Title ist der Klick-Hebel.** Er entscheidet, ob jemand aus dem Suchergebnis heraus klickt.
**Die Meta Description ist der Verkaufstext im SERP.** Sie ist **kein** Ranking-Faktor, aber sie
entscheidet über die CTR — und die CTR sieht man in der Search Console (`datenquelle.md E`). Wer
wissen will, ob ein Snippet wirkt, schaut dort nach, nicht ins Gefühl.

| | Do | Don't |
|---|---|---|
| Title | Ziel-Keyword vorn, Ort dazu wenn lokal, Nutzen erkennbar, Marke hinten | dreimal „Startseite", Keyword-Kette, abgeschnittener Satz |
| Description | eigener Text pro Seite, konkreter Nutzen, Aufforderung am Ende | Blindtext, dieselbe auf 20 Seiten, leer lassen |

**Längen prüfen, nicht schätzen.** Google schneidet nach Pixelbreite, nicht nach Zeichen — deshalb
gehört jedes Snippet durch einen Snippet-Generator, bevor es eingebaut wird. Die Zeichenzahl ist
eine Näherung, die Vorschau ist der Beleg.

**Jede Seite bekommt ihr eigenes Paar.** Eine Dublette im Bestand ist ein Befund, kein Detail —
sie ist zugleich ein Kannibalisierungs-Signal (siehe unten).

## Kurs-Modul 13: Struktur und Hygiene

Prüfpunkte, die auf die ganze Domain gehen statt auf eine Seite:

- **Duplicate Content** — doppelte Inhalte auf der eigenen Domain, dazu 1:1 vom Hersteller
  übernommene Texte. Auf Herstellertexten rankt niemand.
- **Canonical** — bei zwei fast gleichen Seiten die eine als Original auszeichnen.
- **Keyword-Kannibalisierung** — zwei Seiten auf demselben Keyword fressen sich gegenseitig.
  Erkennungsweg in `strategy.md`. Entsteht meistens beim Seitenbaum, also in `seitenbaum.md`.
- **Topic Cluster** — der Seitenbaum aus Modul 9 **ist** das Cluster: Überseite als Hub, Unterseiten
  als Spokes, gegenseitig verlinkt.
- **Sprechende URLs** — kurz, mit Keyword, ohne Parameter-Kauderwelsch.
- **Interne Verlinkung und Klicktiefe** — jede wichtige Seite in höchstens drei Klicks von der
  Startseite erreichbar.
- **Thin Content** — dünne Seiten kosten. Lieber zusammenlegen als stehen lassen.
- **XML-Sitemap** — aktuell, vollständig, in der Search Console eingereicht.
