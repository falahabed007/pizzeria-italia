# Design-Review-Rubric — Anti-AI-Slop-Gate

Bewertung vor jedem Launch. Sieben Kategorien, je **0–3 Punkte**, maximal **21**.

**Urteil:**
- **PASS** = ≥ 17/21 **und** keine Kategorie unter 2 **und** kein Hard-Fail.
- **FAIL** = alles andere. Ein einziger Hard-Fail (✗) kippt das Gate unabhängig von der Punktzahl.

Punkte werden **vergeben, nicht geschätzt**: pro Kategorie den Anker zitieren, der zutrifft, und den Beleg dazu (was konkret auf der Seite steht). „Wirkt gut" ist keine Bewertung.

**Vergleichsmaterial:** `references/` enthält drei Heroes, die dieses Gate bestanden haben — Gartenbau, Anwalt, Heizung. Vor der Bewertung ansehen. Sie sind der Maßstab für „3", und sie zeigen drei **verschiedene** Bildsprachen: der Maßstab ist Eigenständigkeit, nicht Ähnlichkeit zu ihnen.

**Tell-Katalog:** vor der Punktvergabe [references/tells.md](references/tells.md) überfliegen — gefundene Tells beim zugehörigen Kategorien-Anker als Beleg zitieren.

---

## Hard-Fails (✗) — jeder Treffer = FAIL gesamt

Die Tells, an denen AI-generierte Sites sofort erkennbar sind. Keine Punkte, kein Abwägen:

- [ ] ✗ **Inter / Roboto / system-ui / Arial / Helvetica als Hero- oder Display-Schrift.**
- [ ] ✗ **Lila→Blau-Gradient** oder generischer Pastell-Verlauf als Akzent oder Hintergrund.
- [ ] ✗ **Hero = zentriertes H1 + Untertitel + zwei Buttons**, mittig gestapelt.
- [ ] ✗ **Rounded-Card-3er-Grid** (Icon + Headline + zwei Zeilen) direkt unter dem Hero.
- [ ] ✗ **Roher AI-/Stock-Look** — glatt, symmetrisch, Logik-Artefakte, kein Korn, nicht nachbearbeitet.
- [ ] ✗ **Emoji als UI-Icons.**
- [ ] ✗ **Default-Glassmorphism** — Blur-Card schwebt ohne Konzept.
- [ ] ✗ **Erfundene Zahl, Testimonial oder Claim ohne Quelle beim Kunden** — Metriken, Logos, Case-Zahlen, die niemand geliefert hat. Fix-Protokoll: `references/tells.md` § 1.
- [ ] ✗ **Nachgebaute Fake-Chrome** — Browser-Bar mit Ampel-Punkten, Phone-Frame, Fake-Terminal als HTML/CSS/SVG statt echtem Screenshot.

---

## 1 · Typografie  → `___ / 3`

| P | Anker |
|---|---|
| **3** | Display-Schrift mit Haltung + eigene Skala + ein erinnerbares Type-Detail. *Referenz: Anwalt-Master — Serif-Display, dritte Zeile im Italic-Schnitt als Betonung („Mit Klarheit **vertreten.**"); Gartenbau ebenso mit farblich abgesetztem Italic.* Variable Fonts selbst gehostet. |
| **2** | Eigene Display-Schrift und eigene Skala, aber kein Detail, das im Gedächtnis bleibt. |
| **1** | Lizenzierte Nicht-Default-Schrift, sonst Framework-Skala unverändert. |
| **0** | Default-Sans (→ Hard-Fail), Body > 75 Zeichen Zeilenlänge, Default-Zeilenhöhe, Fonts nur per CDN. |

## 2 · Farbe  → `___ / 3`

| P | Anker |
|---|---|
| **3** | 4–6 benannte Werte, herleitbar aus dem Sujet, Akzent sparsam und bedeutungstragend. *Referenz: Heizung-Master — Kupfer-Orange **nur** auf dem Nutzenwort („sich **rechnet**") und der Eyebrow-Linie, sonst kühles Grau; Gartenbau: warme Erd-/Forst-Palette mit blassgrünem Akzent.* |
| **2** | Palette mit Konzept, Akzent aber zu breit oder dekorativ gesetzt. |
| **1** | Palette wirkt zusammengesucht, nicht herleitbar. |
| **0** | Framework-Defaults, flächiger Akzent, grundloser Glow/Neon. |

## 3 · Layout & Grid  → `___ / 3`

| P | Anker |
|---|---|
| **3** | Eigene Spaltenlogik + mindestens ein bewusster Bruch, der etwas kodiert. *Referenz: Anwalt-Master — vertikal geteilter Hero, dunkles Textpanel schiebt sich über das Bild statt Text-auf-Scrim; alle drei Master setzen den Hero linksbündig statt zentriert.* |
| **2** | Eigenes Grid, Brüche vorhanden, aber ohne Aussage. |
| **1** | Default-Container, alles zentriert und aufgeräumt. |
| **0** | Template-Hero oder Card-3er-Grid (→ Hard-Fail); Nummerierung/Eyebrows rein dekorativ. |

## 4 · Motion-Signatur  → `___ / 3`

| P | Anker |
|---|---|
| **3** | Wiedererkennbares Easing **und genau ein** orchestrierter Signature-Moment, der dem Subjekt dient. *Referenz: Gartenbau-Master — gepinnte Transformations-Sequenz, fünf Frames desselben Grundstücks crossfaden am Scroll; das ist die Aussage, nicht Deko.* `prefers-reduced-motion` greift mit statischem Endzustand. |
| **2** | Signature-Moment vorhanden, Easing aber generisch — oder umgekehrt. |
| **1** | Nur Fade-ups, überall dasselbe Default-Ease. |
| **0** | Effekte beliebig verstreut, Selbstzweck — oder `prefers-reduced-motion` greift nicht. |

## 5 · Assets & Provenance  → `___ / 3`

| P | Anker |
|---|---|
| **3** | Ein Set in **einer** Bildsprache, kuratiert und nachbearbeitet, `*.provenance.json` vorhanden. *Referenz: alle drei Master — dokumentarisches Licht (soft overcast / natürliches Tageslicht), deutscher Kontext, einheitlicher Grade über das ganze Set.* |
| **2** | Nachbearbeitet und konsistent, aber ein Motiv fällt aus der Reihe. |
| **1** | Erkennbar generiert, dünn kuratiert, gemischte Bildsprache. |
| **0** | Roher Generator-Output (→ Hard-Fail); Hochglanz-Bruch (golden hour / „lush" / Tropikum) neben dokumentarischem Rest. |

## 6 · Mikro-Details  → `___ / 3`

| P | Anker |
|---|---|
| **3** | `:focus-visible`, Hover, Active, Disabled durchgezogen; eine gehaltene Spacing-Skala; sichtbare intentional friction (Textur, Korn, handgesetzte Details). |
| **2** | States vollständig, aber alles makellos glatt — keine Reibung. |
| **1** | States lückenhaft, Abstände uneinheitlich. |
| **0** | Fokus per Outline-Removal getötet, zufälliges Spacing. |

## 7 · Kohärenz & A11y  → `___ / 3`

| P | Anker |
|---|---|
| **3** | Ein Guss über alle Sektionen; Mobile behält die Haltung; Kontrast AA **gemessen**; Tastaturweg vollständig; einheitliches Copy-Vokabular. |
| **2** | Kohärent, Mobile aber merklich schwächer als Desktop. |
| **1** | Wirkt aus mehreren Templates zusammengesetzt. |
| **0** | Mobile kollabiert zum generischen Stack; Kontrast reißt AA; Tastaturweg unterbrochen. |

⚠ **Kontrast nicht schätzen, messen — und zwar mit dem Gate, nicht per Augenmaß:**

```bash
node .claude/skills/a11y-audit/scripts/a11y-gate.mjs <url|dist> --mobile
```

Es scrollt erst durch (`[data-reveal]` steht beim ersten Scan auf `opacity: 0`, axe überspringt es) und misst Text über Bild/Canvas am komponierten Pixel — das kann axe grundsätzlich nicht. Beim Heizungs-Master musste das Hero-Scrim deshalb von 0.5 auf 0.68 (3.41 → 4.81:1). Für eine **3** in dieser Kategorie muss das Gate mit Exit 0 durchlaufen.

---

## Ergebnis

```
Typografie      ___ /3      Hard-Fails: ___ (jeder = FAIL)
Farbe           ___ /3
Layout & Grid   ___ /3      Summe:      ___ /21
Motion          ___ /3      Minimum je Kategorie ≥ 2:  ja / nein
Assets          ___ /3
Mikro-Details   ___ /3      URTEIL:  PASS / FAIL
Kohärenz/A11y   ___ /3
```

Bei FAIL pro Fund **eine konkrete Fix-Empfehlung** notieren (nicht „Typo verbessern", sondern „Inter im Hero durch lizenzierte Display-Variable-Font ersetzen, selbst gehostet, eigene Skala mit klarem Step-Verhältnis"). Fixen, erneut durch das Gate. **Kein Launch bei FAIL.**
