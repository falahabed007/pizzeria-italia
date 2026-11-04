# Workflow: Keywords

Keyword-Recherche und Clustering — **Modul 7** des Kurses. Fünf Schritte in fester Reihenfolge,
und nur **einer** davon kostet SISTRIX-Abfragen:

| # | Schritt | Was passiert | Womit | SISTRIX |
|---|---------|--------------|-------|---------|
| 1 | **Seeds sammeln** | Die Leistungen und der Ort des Betriebs — er kennt sein Handwerk, aber nicht die Sprache seiner Kunden. Liste zeigen, bestätigen lassen | Kopf, `PROJEKT.md`, Repo | 0 |
| 2 | **Erweitern** | Jeden Seed durch das Modifier-Fächer von Google Autocomplete fahren — die echten Formulierungen der Kunden | `curl` auf `suggestqueries.google.com` | **0** |
| 3 | **Clustern, Absicht, Kaufphase** | Rohliste nach Thema bündeln, Absicht und Phase nach Wortmuster zuordnen, Streichliste anlegen | Regeln unten + SERP-Gegenprobe | **0** |
| 4 | **Messen** | Nur die **Cluster-Köpfe**: Volumen, Wettbewerb, Klicks — eine Abfrage je Kopf | SISTRIX `keyword` mit `view="metrics"`; `searchintent` nur, wo das Wort die Absicht nicht verrät | **≤ 40** |
| 5 | **Priorisieren** | Vernünftiges Volumen, machbare Konkurrenz, klare Absicht. Neue Seite: **Long-Tail zuerst** | Ergebnisse aus 1–4 | 0 |

⚠ **Die Reihenfolge ist keine Formsache: gemessen wird erst, wenn die Cluster stehen.** Sonst wird
die Rohliste gemessen — 800 Zeilen × drei Aufrufe sind 2.400 Abfragen, das Tageskontingent.

## Budget: 40 Abfragen — und so rechnet es sich

| Posten | Abfragen |
|---|---|
| Sammeln (Schritt 2) — `curl` | 0 |
| Clustern und Absicht (Schritt 3) — Wortmuster, eigene Google-Suche als Gegenprobe | 0 |
| 25 Cluster-Köpfe × `metrics` | 25 |
| `searchintent` für die ~10 Köpfe, deren Absicht nach Wortmuster und SERP unklar bleibt | 10 |
| Reserve | 5 |

Vorher in `KEYWORDS.md` nachsehen, ob ein Kopf schon gemessen ist — dieselbe Zahl zweimal zu holen
ist der häufigste Verlust. Reicht das Budget nicht für alle Köpfe: die wichtigsten messen, der Rest
bleibt `[grob geschätzt]` — **die Station wird fertig, immer.** Die Antwort endet mit
`SISTRIX: <n> von 40 Abfragen · <m> Werte aus vorhandenen Dateien gelesen`.

⚠ **Was SISTRIX in dieser Station NICHT tut:** `keyword.questions`, `domain.ideas` und
`domain.opportunities` sind keine Sammelwerkzeuge. Sie kosten je Aufruf eine Abfrage und liefern
Begriffe, die Google umsonst liefert — bei acht Seeds sind das dreißig Abfragen für nichts. Fragen
kommen aus dem Fächer (`wie/was/warum`) und aus „Ähnliche Fragen" der Trefferseite; Keyword-Lücken
gegen Wettbewerber gehören zu `compete` (Zuarbeit zwischen Station 5 und 6). **Läuft in Schritt 2
oder 3 trotzdem eine SISTRIX-Abfrage, ist das ein Fehler und steht oben in der Antwort.**

⚠ **Der Länderparameter wird bewusst gesetzt**, aus dem Markt in `PROJEKT.md` — nie voreingestellt
übernommen. Deutschland `de`/`2276`, Österreich `at`/`2040`, Schweiz `ch`/`2756`. Voreingestellt ist
Deutschland; für AT/CH wird umgestellt, sonst wird das falsche Land gemessen, und es fällt niemandem
auf, weil die deutschen Zahlen plausibel aussehen. Die Tabelle in `datenquelle.md` ist die
verbindliche Fassung.

⚠ **Gegenprobe zur Suchintention:** Das Keyword bei Google eingeben und ansehen, welche *Art* Seite
oben steht — Ratgeber (informational), Vergleiche und Kostenlisten (commercial), Anbieterseiten mit
Telefonnummer (transaktional). **Weicht Googles Antwort von der eigenen Zuordnung ab, hat Google
recht.** Das ist die einzige erlaubte Nutzung der eigenen Google-Suche — für die Art der Seite, nie
für eine Position.

> **Ehrlichkeit über Zahlen (hart):** Jede Zahl trägt ihre Stufe, und die Stufe hängt an der
> Quelle. **Mit Datenquelle** (S) haben die gemessenen Köpfe echtes Volumen, Wettbewerbsdruck und
> Absicht — `[gut geschätzt]`. Die Long-Tails im Cluster tragen `[grob geschätzt]`: ihre Nachfrage
> ist ein **relatives** Signal (wie breit taucht die Phrase im Fächer auf?). **Ohne Datenquelle** ist
> alles `[grob geschätzt]`, „Difficulty" eine Schätzung aus der SERP. Was aus der eigenen GSC kommt,
> ist `[gemessen]`. Nie eine Zahl ohne Stufe, und nie eine präzise Zahl erfinden, die keine Quelle
> hergibt.

**Wissen laden:** `strategy.md` (Quick-Win-Identifikation, Difficulty-Einschätzung, Long-Tail-Strategie,
Buyer-Stage-Mapping, Priorisierungs-Score). **Datenwege:** ausschließlich `datenquelle.md` —
**C** Autocomplete ist die Sammlung (immer, Pflicht), **S** SISTRIX misst die Köpfe (Vorrang, sobald
es um eine Zahl geht), **D** SERP für die Absichts-Gegenprobe und „Ähnliche Fragen", **E** GSC,
**A** Repo.

## Schritt 1 — Seeds (0 Abfragen)

1. `docs/seo/PROJEKT.md` lesen (Domain, Leistungen, Einzugsgebiet, Reichweite, GSC-Status). Fehlt es → `/seo:init` empfehlen und stoppen.
2. `docs/seo/KEYWORDS.md` + `docs/seo/CLUSTER-MAP.md` lesen — was ist schon erfasst, welche Cluster existieren, welche Köpfe sind schon gemessen. Nicht bei null anfangen, wenn Kontext da ist.
3. Seeds ableiten: **jede Leistung als nackter Begriff** (`wurzelbehandlung`, `zahnimplantat`, `professionelle zahnreinigung`), dazu die Umgangssprache neben dem Fachwort (`zahnarzt angst` neben `angstpatient`). ⚠ **Der Ort kommt NICHT in den Seed.** Google vervollständigt lange lokale Phrasen kaum: `zahnimplantat münchen` brachte 9 Vorschläge, `wurzelbehandlung` ohne Ort 309 (Lauf vom 03.09.2026). Der Ort bekommt in Schritt 2 einen eigenen Fächer-Zweig und steht in Schritt 3 am Cluster-Kopf. 5–10 Seeds sind normal, 30 sind kein Fehler — sie kosten Zeit, keine Abfragen.
4. Liegt eine GSC-CSV unter `docs/seo/gsc/`: Queries mit **vielen Impressionen, wenig Klicks** und **Position 8–20** notieren — reale Zahlen, `[gemessen]`.
5. **Seed-Liste ausgeben, Turn beenden, auf das Ja warten.** Der Nutzer entscheidet, was gesucht wird — und vorher läuft nichts, auch kein `curl`.

## Schritt 2 — Erweitern (0 Abfragen)

### Google Autocomplete (datenquelle.md C) — Pflicht, auch mit SISTRIX

Pro bestätigtem Seed den Suggest-Endpoint abfragen, **immer** mit `hl` + `gl` aus dem Markt (kein stiller Länder-Default; für AT/CH `gl=at`/`gl=ch`):

```bash
curl -sG 'https://suggestqueries.google.com/complete/search' \
  --data-urlencode 'client=firefox' \
  --data-urlencode 'hl=de' \
  --data-urlencode 'gl=de' \
  --data-urlencode 'q=<seed-keyword>'
```

**Modifier-Fächer** — den **nackten** Seed variieren und je Variante erneut abfragen, **vollständig, je Seed**:
- **Alphabet:** `<seed> a`, `<seed> b`, … `<seed> z`
- **Fragen:** `wie <seed>`, `was <seed>`, `warum <seed>`, `<seed> ablauf`, `<seed> dauer`
- **Kommerziell:** `<seed> kosten`, `<seed> preis`, `<seed> vergleich`, `bester <seed>`
- **Lokal** (bei Reichweite Local, als **eigener Zweig** je Seed): `<seed> <ort>`, `<seed> <ort> a…z`, `<seed> in der nähe`, `<seed> <stadtteil>`, `<seed> notdienst`

So entstehen je Seed zwei Fächer — der nackte liefert die Sprache der Kunden (Fragen, Ängste, Kosten), der lokale liefert die Kaufphrasen. Beide sind kostenlos. **Je Seed sind 30–100 Rohzeilen normal.** Bringt ein Seed unter 10, war er zu lang (meist: Ort drin) — nackt nachfahren, bevor es weitergeht.

Die Vorschläge sammeln und **roh** unter `docs/seo/daten/` ablegen — dazu eine `HERKUNFT.md`
(Datum, Seeds, Anzahl `curl`-Aufrufe, `hl`/`gl`). Das ist der Nachweis; der Arbeitsstand steht
später in `KEYWORDS.md`. **Relative Nachfrage** ableiten: Phrasen, die über mehrere Modifier hinweg
auftauchen oder schon bei kurzem Präfix erscheinen, haben tendenziell höhere Nachfrage — ein
**Signal, kein Volumen**, so kennzeichnen.

Warum das Pflicht bleibt, obwohl SISTRIX angebunden ist: SISTRIX liefert die Zahlen zu Begriffen,
die man schon hat. Autocomplete liefert die Begriffe selbst, in den Worten echter Nutzer. Wer sie
überspringt, misst am Ende acht Begriffe, die er ohnehin kannte.

### Trefferseite (datenquelle.md D) — ebenfalls kostenlos

Für die Seeds und die auffälligsten Funde die Live-SERP ansehen (Playwright, `https://www.google.de/search?q=<keyword>&gl=de&hl=de` → Snapshot). Erfassen: organische Top-5 (Domain + Title), **„Ähnliche Fragen"** (PAA), SERP-Features (Featured Snippet, AI Overview, Local Pack). Die PAA-Fragen gehen mit in die Rohliste. Bei Block (Consent/CAPTCHA): **einmal** Consent versuchen, sonst **nicht umgehen** — den Nutzer um die Top-5 bitten und sagen, dass automatisch geblockt wurde. Nie SERPs erfinden.

### GSC-CSV (datenquelle.md E) — nur falls vorhanden

Query-CSV gegen die Autocomplete-Funde spiegeln: bestätigt reale Impressionen, deckt Keywords auf, an die niemand gedacht hat. Reale Zahlen als `[gemessen]` kennzeichnen, getrennt von den Autocomplete-Signalen.

### ⚠ Zielgröße — daran wird geprüft, ob Schritt 2 fertig ist

| | Erwartung | Was zu klein bedeutet |
|---|---|---|
| **Rohliste** | **300–800 Zeilen** bei 5–10 Seeds | unter 150: das Modifier-Fächer wurde nicht ausgefahren — nachfahren, bevor es weitergeht |
| **je Seed** | **30–100 Rohzeilen** | unter 10: der Seed trug den Ort — nackt nachfahren. Ein Seed mit 300 neben Seeds mit 9 ist kein Ergebnis, sondern ein Fächer, das nur einmal lief |
| **Cluster** (nach Schritt 3) | **15–25** | unter 10: nur die offensichtlichen Leistungen erfasst, kein Long-Tail — oder ein Sammelkorb, siehe Schritt 3 |
| **Kosten dafür** | **0 Abfragen** | Sammeln ist gratis (`curl`). Nur die Cluster-Köpfe werden gemessen |
| **SISTRIX-Abfragen in Schritt 2** | **0** | jede Abfrage hier ist ein Fehler — `keyword.questions` ist SISTRIX, nicht Autocomplete |
| **SISTRIX-Budget dieser Station** | **40** | mehr nur mit Ansage vorher — und die Station wird trotzdem fertig, notfalls mit Stufe 3 |

Wird die Zielgröße verfehlt, steht das **in der Antwort** — mit dem Grund, nicht stillschweigend.
Die Kontingent-Regeln gelten ausschließlich fürs **Messen**: die Rohliste darf und soll groß sein.

## Schritt 3 — Clustern, Absicht, Kaufphase (0 Abfragen)

**Nach Thema:** Keywords bündeln, die dasselbe Kernthema treffen und später **von einer Seite**
bedient werden sollen. Der **Cluster-Kopf** ist die kürzeste, meistgesuchte Formulierung — er wird in
Schritt 4 gemessen, der Rest erbt seine Einordnung.

```
Cluster: „Wurzelbehandlung"
├── wurzelbehandlung münchen          ← Kopf, wird gemessen
├── wurzelbehandlung kosten
├── wurzelbehandlung schmerzen danach
└── wurzelbehandlung wie lange
```

⚠ **Ein Cluster mit der Hälfte aller Zeilen ist kein Cluster, sondern ein Sammelkorb.** Dann nach
Leistung teilen: Wurzelbehandlung, Krone und Parodontitis sind drei Seiten und drei Google-Services,
nicht eine „Zahnerhaltung". Die Cluster von hier sind die Services in Station 3 und die Seiten in
Station 4 — was hier zusammenklebt, fehlt dort. Richtwert: kein Cluster über **40 %** der Datenbank.

**Absicht nach Wortmuster** — kostenlos, für die ganze Rohliste:

| Wortmuster | Absicht | Kaufphase |
|---|---|---|
| `kosten`, `preis`, `was kostet`, `günstig`, `zuzahlung` | commercial | Decision |
| `in <ort>`, `in der nähe`, `termin`, `notdienst`, `öffnungszeiten`, `<stadtteil>` | transaktional (visit/do) | Decision |
| `wie`, `was`, `warum`, `ablauf`, `dauer`, `schmerzen nach`, `erfahrungen` | informational | Awareness / Implementation |
| `beste`, `vergleich`, `vs`, `oder`, `unterschied` | commercial | Consideration |
| Praxisname, Name eines Wettbewerbers | navigational | — (fremde Marke → Streichliste) |

Bleibt ein **Kopf** nach Wortmuster unklar → SERP-Gegenprobe (kostenlos, Google hat recht). Bleibt
er auch dann unklar → `searchintent` in Schritt 4, aus dem Budget.

**Kaufphase (Buyer-Stage):**

| Stage | Muster | Beispiel |
|-------|--------|----------|
| **Awareness** | „was ist", „warum", „tipps" | „warum zahnfleischbluten" |
| **Consideration** | „beste", „vergleich", „vs" | „implantat oder brücke" |
| **Decision** | „kosten", „preise", „in [Stadt]" | „zahnarzt schwabing" |
| **Implementation** | „anleitung", „checkliste", „wie funktioniert" | „zahnreinigung wie oft" |

**Die Streichliste entsteht hier** — jede Zeile, die aus der Rohliste nicht in ein Cluster kommt,
mit **einem eigenen Grund**. Typische Gründe bei Reichweite Local: *andere Stadt* · *Stadtteil
außerhalb des Einzugsgebiets* · *fremder Praxisname* · *Straßenadresse* · *Krankenkasse/Abrechnung*
· *fachfremd* · *bietet der Betrieb nicht an* · *Duplikat*. Der Grund *unter 50 Volumen* gibt es erst
nach Schritt 4 und nur für Gemessene. Keine Sammelbegründung — der Nutzer holt Zeilen zurück oder
streicht weitere, das ist seine Entscheidung.

## Schritt 4 — Messen (≤ 40 Abfragen)

1. **Erst `KEYWORDS.md`:** ist der Kopf schon gemessen, wird die Zahl gelesen, nicht neu geholt.
2. Je Cluster-Kopf **eine** Abfrage: SISTRIX `keyword` mit `view="metrics"` und dem Land aus
   `PROJEKT.md` — sie enthält Volumen, Wettbewerb, Klicks und Geräteverteilung. `competition` und
   `traffic` **nicht** zusätzlich holen.
3. `searchintent` nur für die Köpfe, die nach Schritt 3 unklar geblieben sind.
4. **Keine Zeitreihen** — sie kosten eine Abfrage je Datenpunkt (Regel in `datenquelle.md`).
5. Long-Tails im Cluster: Volumen „—", Stufe `[grob geschätzt]`, Nachfrage relativ aus dem Fächer.
   Nur der Kopf trägt `[gut geschätzt]`.
6. Nach dem Messen die Streichliste ergänzen: Köpfe unter 50 Volumen mit klarer Alternative → Grund
   *unter 50 Volumen*; ganze Cluster, die verworfen werden, trotzdem **Zeile für Zeile** hinüber.

Ohne Datenquelle entfällt dieser Schritt: Nachfrage bleibt relativ (hoch/mittel/niedrig aus
Fächer-Breite und GSC), Difficulty eine Schätzung aus der SERP nach `strategy.md` — dominieren starke
Marken, Portale und tiefe Ratgeber → hoch; nischige, lokale, dünne Ergebnisse → niedrig. Kein CPC,
kein präzises Volumen — wo eine Zahl fehlt, steht die Kategorie, nicht eine erfundene Ziffer.

## Schritt 5 — Priorisieren und Lücken (0 Abfragen)

Score aus `strategy.md` (Nachfrage × Absichts-Wert ÷ Difficulty), nicht Bauchgefühl. Bei einer
neuen oder schwachen Seite: **Long-Tail zuerst.**

- **Content-Lücken:** Cluster ohne passende Seite → Kandidat für den Seitenbaum, später `/seo:create`.
- **Optimierungs-Lücken:** bestehende Seite trifft einen Cluster, rankt aber nicht → später `/seo:optimize`.
- **Kannibalisierung:** mehrere Cluster laufen heute auf **eine** Seite (etwa sieben Leistungen auf `/leistungen`) → als Risiko in `CLUSTER-MAP.md`, Auflösung in Station 4.

⚠ **Keine Map ohne Seiten.** Solange `SEITENBAUM.md` leer ist, endet diese Station mit der
**priorisierten Cluster-Liste**: jedes Cluster mit Kopf, Absicht, Phase, Zahl und Stufe — Spalte
**Ziel-Seite bleibt „—"**. Die Zuordnung Cluster → Seite ist Modul 9 und passiert in
`seitenbaum.md`. Eine Zuordnung auf die **alte** Struktur ist ein Kannibalisierungs-Befund, keine Map.

**Mapping-Regeln (gelten ab Station 4, hier nur zur Orientierung; `optimize` und `create` prüfen sie):**
jede Seite **genau ein** Primary und bis zu ~5 sekundäre · Primary in Title, H1, URL und erstem
Absatz · **nie dasselbe Primary auf zwei Seiten**.

## Output

1. **Keywords gesamt** — Anzahl; sie ist identisch mit der Zeilenzahl der Datenbank-Tabelle.
2. **Cluster** — Anzahl; je Cluster Kopf, Zeilen, Absicht, Phase, Volumen mit Stufe.
3. **Top-Chancen** — bestes Verhältnis Nachfrage zu Difficulty, Long-Tail zuerst.
4. **Lücken** — Content-Lücken, Optimierungs-Lücken, Kannibalisierung.
5. **Rohliste als Datei** — `docs/seo/daten/…` plus `HERKUNFT.md`, Zeilenzahl in der Antwort.
6. **Streichliste** — Zeilenzahl, als Abschnitt in `KEYWORDS.md`.
7. **`SISTRIX: <n> von 40 Abfragen · <m> Werte aus Dateien gelesen`** — und ob in Schritt 2/3 eine lief (dann: Fehler, oben).
8. **Ausgabe von `abgleich.py`** — Exit 0, sonst ist die Station nicht erledigt.
9. `▸ Weiter mit: /seo:maps` — `create`/`optimize` kommen erst ab Station 6, nicht hier empfehlen.

### ⚠ Was wohin gehört — `KEYWORDS.md` ist die Datenbank, nicht die Zusammenfassung

**`KEYWORDS.md` enthält JEDES Keyword, das in einem Cluster steht — eine Zeile je Keyword.**
Steht oben „577 Keywords gesamt“, müssen in dieser Datei 577 Tabellenzeilen stehen. Eine
Zusammenfassung mit dreißig Zeilen und einem Verweis auf einen Ordner ist **kein** gültiges
Ergebnis: der Nutzer arbeitet mit dieser Datei, er soll nicht durch JSON-Dateien suchen müssen.

| Datei | Inhalt |
|---|---|
| `KEYWORDS.md` | **alle** geclusterten Keywords, je Zeile: Keyword · Cluster · Absicht · Kaufphase · Volumen/Mon. · Stufe · Ziel-Seite (leer bis Station 4). Lang ist richtig. |
| `KEYWORDS.md` → Abschnitt „Streichliste“ | **jedes** verworfene Keyword mit **einem eigenen Grund**. Ein ganzes Cluster als verworfen zu markieren reicht nicht — die Zeilen gehören einzeln hin. |
| `docs/seo/daten/…` | die **Rohabzüge** vor dem Filtern, plus `HERKUNFT.md`. Nachweis und Wiederholbarkeit — nicht der Arbeitsstand. |

**Pflicht-Aufbau von `KEYWORDS.md`** — `abgleich.py` liest genau diese Überschriften und Zeilen:

```markdown
## Überblick
- **Keywords gesamt:** N — davon M gemessen `[gut geschätzt]`, N−M `[grob geschätzt]`
- **Cluster:** K
- **SISTRIX-Abfragen verbraucht:** n von 40 · **Autocomplete-Abfragen:** a (kostenlos)
- **Streichliste:** S Zeilen, jede mit Grund

## Die gemessenen Keywords (M)
| Keyword | Volumen/Mon. | Wettbewerb | Absicht | Kaufphase | Cluster |

## Die Datenbank — alle N Keywords
| Keyword | Cluster | Absicht | Kaufphase | Volumen/Mon. | Stufe | Ziel-Seite |

## Streichliste — S Zeilen, Grund je Zeile
| Keyword | Seed / Quelle | Grund |
```

Die Cluster-Spalte trägt `<Nr> <Name>` (z. B. `3 Prophylaxe`). Die Zahl im Überblick und die
Zeilenzahl der Tabelle müssen **übereinstimmen**. Weichen sie ab, wird die **Datei** vervollständigt.

## Dateien aktualisieren

| Datei | Aktion |
|-------|--------|
| `docs/seo/PROJEKT.md` | Gelesen (Kontext) |
| `docs/seo/KEYWORDS.md` | Geschrieben — Aufbau oben; **Ziel-Seite nur, wenn `SEITENBAUM.md` steht**, sonst „—“ |
| `docs/seo/CLUSTER-MAP.md` | Aktualisiert — Cluster-Liste, Content-Lücken, Kannibalisierungs-Risiken; die **Zuordnung Cluster → Seite erst mit dem Seitenbaum** (Station 4 schließt die Map) |
| `docs/seo/daten/…` + `HERKUNFT.md` | Neu — Rohabzüge vor dem Streichen, mit Herkunft |
| `docs/seo/STRATEGIE.md`, `docs/seo/KONKURRENZ.md` | **Nicht angefasst** — gehören zu `strategy` und `compete` |
