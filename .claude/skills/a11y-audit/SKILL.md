---
name: a11y-audit
description: Accessibility-/WCAG-Check für motion-getriebene Premium-Sites. Prüft prefers-reduced-motion und statische Alternativen (WCAG 2.3.3), Kontrast bei Text über Bild/Canvas, Tastatur/Fokus, Semantik, Medien/Canvas, Screenreader und Zoom/Reflow. Nutze diesen Skill wenn der User "a11y-audit", "Accessibility prüfen", "Barrierefreiheit checken", "WCAG-Check", "ist die Seite barrierefrei", "reduced-motion testen" oder "Kontrast prüfen" sagt. Trigger auch bei: Accessibility, Barrierefreiheit, WCAG, reduced motion, prefers-reduced-motion, Kontrast, Tastatur-Navigation, Fokus, Screenreader, Zoom, Reflow, axe, Lighthouse.
---

# a11y-audit — Accessibility-Check für Motion-Sites

Ziel: Award-Optik bleibt benutzbar. Prüfe gegen WCAG 2.1 AA mit Schwerpunkt auf Bewegung, Canvas und Text-über-Visual. Output: Befunde nach Schweregrad + konkrete Fixes. **Blocker verhindern Launch.**

## Vorgehen

**Schritt 1 ist das Gate — es läuft, statt beschrieben zu werden:**

```bash
node .claude/skills/a11y-audit/scripts/a11y-gate.mjs <url|dist-ordner> [--mobile] [--json]
```

Exit-Code 0 = PASS, 1 = FAIL, 2 = Gate lief nicht. Es prüft genau die drei Dinge, die hier schon durchgerutscht sind, und zwar so, dass sie nicht wieder durchrutschen können:

| Prüfung | Warum ein Skript und nicht ein Satz im SOP |
|---|---|
| **axe nach dem Durchscrollen** | Am Seitenanfang ist axe blind — `[data-reveal]` steht auf `opacity: 0`. So lagen drei Kontrastfehler von Beginn an in allen drei DACH-Mastern. Das Skript scrollt erst die ganze Seite ab. |
| **Kontrast über Bild/Canvas** | Kann axe grundsätzlich nicht. Gemessen wird am komponierten Pixel: zwei Aufnahmen (mit/ohne Glyphen), Differenz = Buchstabenfläche, dort das schlechteste Perzentil gegen die Textfarbe. `text-shadow` und eigene Chip-Hintergründe zählen mit. |
| **reduced-motion** | Media-Query vorhanden? Bleibt Text dauerhaft auf `opacity: 0` hängen? |

Was das Gate **nicht** kann und was deshalb weiter von Hand kommt: Tastaturweg, Screenreader, Zoom/Reflow, Sinnhaftigkeit von Alt-Texten, Bewertung des Zwischenzustands laufender Animationen (die weist es als „nicht bewertbar" aus, statt sie zu verurteilen — ein halbtransparentes Element mitten im Crossfade ist kein Kontrastfehler).

Danach:
2. Stack und Animationsbibliotheken sichten (GSAP, Lenis, Three/Canvas, Marquees, Scroll-Trigger).
3. Manuelle Stichprobe Tastatur + Screenreader (Tab-Durchlauf im Browser, Playwright aus `tools/`).
4. Befunde sammeln, nach Schweregrad sortieren, je Befund einen umsetzbaren Fix nennen.

## 1. Motion & WCAG 2.3.3 (kritisch)
- `@media (prefers-reduced-motion: reduce)` MUSS existieren: nicht-essentielle Animationen aus oder stark gedämpft, sinnvolle statische Alternative (Endzustand zeigen, nicht leeren Screen).
- Auto-Play / Parallax / Loops pausierbar oder respektieren reduced-motion; kein endloser Zwang.
- Nichts blinkt/flackert > 3× pro Sekunde (Seizure-Risiko).
- Scroll-Hijack / Smooth-Scroll (Lenis & Co.) hat Fallback: native Tastatur-Navigation, Sprungmarken und Anker funktionieren weiter; Seite bleibt ohne JS bedienbar.
- Scroll-getriggerte Inhalte müssen auch ohne ausgelöste Animation lesbar/erreichbar sein (kein `opacity:0`, das hängen bleibt).

## 2. Kontrast
- Text AA: 4.5:1 normal, 3:1 ab groß (≥ 24px bzw. 18.66px bold).
- UI-Komponenten / Grafik-Objekte: 3:1.
- Besonders Text über Bild/Video/Canvas: Overlay, Gradient-Scrim oder Text-Shadow prüfen — Kontrast muss über den hellsten/dunkelsten Bildbereich halten, nicht nur im Mittel.
- Hover/Focus/Disabled-States ebenfalls prüfen.

## 3. Tastatur & Fokus
- Alles Interaktive fokussierbar und bedienbar (Enter/Space), logische Tab-Reihenfolge.
- Sichtbarer Fokus-State auf allen Elementen — `outline:none` ohne sichtbaren Ersatz ist ein Befund.
- Kein Keyboard-Trap (auch in Modals/Overlays/Custom-Cursor-Setups).
- Skip-Link zum Hauptinhalt vorhanden und beim Fokussieren sichtbar.

## 4. Semantik
- Landmarks vorhanden: `header`, `nav`, `main`, `footer`.
- Genau eine `h1`, danach saubere Hierarchie (keine Sprünge h2 → h4).
- Echte Elemente: `button`/`a`/`ul/li` statt `div`-mit-Click-Handler.
- Formulare: jedes Feld mit `label`, Fehlermeldungen programmatisch verknüpft (`aria-describedby`), nicht nur farblich.

## 5. Medien & Canvas
- Dekorative Canvas/WebGL/Visuals: `aria-hidden="true"` bzw. `alt=""`.
- Informative Bilder: aussagekräftiger Alt-Text.
- Videos: kein Auto-Ton; Bewegungs-Hintergrundvideos respektieren reduced-motion.

## 6. Screenreader
- ARIA nur wo nötig — natives HTML zuerst, falsches ARIA ist schlechter als keins.
- Dynamische Updates (Toasts, Statuswechsel) via `aria-live` wo sinnvoll.
- Doppelte/dekorative Inhalte (duplizierte Marquee-/Ticker-Sektion, gespiegelte Loops) `aria-hidden`, damit nicht doppelt vorgelesen.

## 7. Zoom & Reflow
- 200% Zoom ohne Inhalts-/Funktionsverlust, kein abgeschnittener Text.
- Responsive Reflow bis 320px Breite ohne horizontales Scrollen.
- Fixe `px`-Höhen an Textcontainern prüfen (Clipping bei Vergrößerung).

## Output-Format
Pro Befund: **[Schweregrad] Bereich — Problem — Fix** (Datei/Selektor wenn bekannt).
- **Blocker**: macht Kerninhalt unbenutzbar (kein reduced-motion-Fallback, Keyboard-Trap, Kontrast < 3:1 auf Fließtext, nicht bedienbares Haupt-CTA) — verhindert Launch.
- **Major**: deutliche Einschränkung (fehlender Fokus-State, fehlende Alt-Texte, fehlende Landmarks).
- **Minor**: Politur (suboptimale Tab-Reihenfolge, knapper Kontrast auf sekundärem Text).
Abschluss: kurze Ampel (Launch-fähig: ja/nein) + Tool-Hinweis (axe/Lighthouse-Score, ob manuelle Tastatur-/SR-Stichprobe via dem Cross-Engine-Werkzeug gelaufen ist).
