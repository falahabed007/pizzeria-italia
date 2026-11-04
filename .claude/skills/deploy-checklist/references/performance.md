# Performance — Schwellen, Messung, Diagnose (Gate 1)

> Destilliert aus [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills)
> (MIT, Stand 06/2026), Skills `core-web-vitals` + `performance` — eingekocht auf den
> Zugeschnitten auf statische Sites mit Scroll-Motion (z. B. Astro + GSAP, Canvas-/Video-Heroes). Bewusst weggelassen:
> Framework-Rezepte (Next/React/Vue/Nuxt), Service-Worker, Third-party-Kapitel, SSR/CSR.

## Schwellen

| Metrik | misst | Gut | Verbesserungswürdig | Schlecht |
|---|---|---|---|---|
| **LCP** | Laden | ≤ 2,5 s | 2,5–4 s | > 4 s |
| **INP** | Interaktivität | ≤ 200 ms | 200–500 ms | > 500 ms |
| **CLS** | visuelle Stabilität | ≤ 0,1 | 0,1–0,25 | > 0,25 |

Sub-Schwellen dahinter — die Stellgrößen, an denen man tatsächlich dreht:

| Stellgröße | Ziel |
|---|---|
| TTFB (Server-Antwort) | < 800 ms |
| Critical CSS (inline, above-fold) | < 14 KB |
| INP-Phase 1: Input Delay | < 50 ms |
| INP-Phase 2: Processing (Handler) | < 100 ms |
| INP-Phase 3: Presentation (Paint) | < 50 ms |

## 75. Perzentil: Lab ist nicht Feld

- Google misst am **75. Perzentil**: 75 % der Besuche müssen „Gut" erreichen — nicht der
  Durchschnitt, und schon gar nicht der eigene Rechner.
- ⚠ **Ein grüner Lighthouse-Lauf auf dem M-Series-Mac ist kein Beleg.** Das ist Lab-Messung
  auf einer der schnellsten Maschinen der Welt; das 75. Perzentil echter Besucher sitzt auf
  einem Mittelklasse-Android im 4G-Netz. Lighthouse (mit Mobile-Drosselung) taugt zur
  Diagnose und als Gate vor dem Launch — den Beweis liefert das Feld.
- **Feldquellen:** CrUX (Chrome User Experience Report) und der Core-Web-Vitals-Bericht in
  der **Search Console**. Sobald die Domain live ist und Traffic hat: Feldwerte prüfen,
  Lab nur noch zur Ursachensuche.

## Mess-Rezept (der Pflicht-Befehl)

```
npx lighthouse@13.3.0 <LIVE-URL> --output html --output-path docs/seo/daten/qa/<host>-lighthouse.html
```

- **Version pinnen:** `lighthouse@13.3.0` liegt bereits im npx-Cache und startet daraus.
  Ungepinnt will npx die jeweils neueste Version nachladen — Netzabhängigkeit ohne Gewinn.
- Der Default ist **Mobile-Emulation mit Drosselung** — genau die richtige Sicht.
  Desktop nur zusätzlich (`--preset=desktop`), nie als Ersatz.
- ⚠ **Lighthouse v13:** Die Performance-Audits heißen jetzt **Insight-Audits** — im
  Report/JSON z. B. `cls-culprits-insight` (nennt die Shift-Verursacher direkt) und
  `image-delivery-insight` (Format/Größe/Priorität der Bilder). Wer nach den alten
  Audit-IDs greppt, findet nichts — und hält das fälschlich für grün.

## LCP bei Canvas-/Video-Heroes (der House-Fall)

- Das LCP-Element ist **nie das Canvas** — was ein Script in ein `<canvas>` malt, zählt
  für LCP nicht. Kandidat ist das Poster, das erste Frame als `<img>` oder die H1.
  Genau dieses eine Element wird priorisiert, alles andere nicht:

```html
<link rel="preload" as="image" href="/hero-1600.avif"
      imagesrcset="/hero-800.avif 800w, /hero-1600.avif 1600w"
      imagesizes="100vw" fetchpriority="high">
```

- In Astro das LCP-Bild eager, alles below-fold lazy:

```astro
<Image src={hero} loading="eager" decoding="sync" alt="…" />
<!-- below-fold: loading="lazy" decoding="async" -->
```

- Nicht raten, welches Element das LCP ist — nachsehen:

```javascript
new PerformanceObserver((list) => {
  const e = list.getEntries().at(-1);
  console.log('LCP-Element:', e.element, Math.round(e.startTime), 'ms');
}).observe({ type: 'largest-contentful-paint', buffered: true });
```

- Das LCP-Element muss im **initialen HTML** stehen (bei Astro static ohnehin der Fall),
  Critical CSS < 14 KB inline im `<head>`, Rest-CSS deferred, kein render-blocking JS davor.
- **View Transitions:** der Übergangs-Snapshot ist GPU-composited und zählt **nicht** als
  CLS — Seitenübergänge kosten in der Wertung nichts.

## INP-Diagnose

INP = Input Delay + Processing + Presentation (Ziele: 50/100/50 ms). Long Tasks auf dem
Main Thread fressen Phase 1 — bei uns typisch: GSAP-/ScrollTrigger-Init beim Load und das
Frame-Preloading der Canvas-Sequenz. Chunken und mit `scheduler.yield()` abgeben:

```javascript
async function preloadFrames(frames) {
  const CHUNK = 20;
  for (let i = 0; i < frames.length; i += CHUNK) {
    frames.slice(i, i + CHUNK).forEach(decodeFrame);
    if ('scheduler' in window && 'yield' in scheduler) {
      await scheduler.yield();   // Fortsetzung läuft mit Boost-Priorität weiter
    } else {
      await new Promise(r => setTimeout(r, 0));   // Fallback (Safari)
    }
  }
}
```

⚠ `setTimeout(0)` als Fallback ist ok, aber es **verliert Priorität**: die Fortsetzung
reiht sich hinter fremden Tasks ein, die der Browser inzwischen angenommen hat.
`scheduler.yield()` behält den Platz vorn — deshalb ist es der Default, nicht die Kür.

Handler-Muster — **erst visuelles Feedback, dann yield**, dann die Schwerarbeit:

```javascript
button.addEventListener('click', async () => {
  button.classList.add('loading');                 // 1. billiges DOM-Update
  if ('scheduler' in window && 'yield' in scheduler) {
    await scheduler.yield();                       // 2. Browser malt den Zustand
  }
  const result = teureArbeit();                    // 3. der Klick war längst sichtbar
  updateUI(result);
});
```

Langsame Interaktionen im Lab aufspüren (`durationThreshold: 40` wie die
web-vitals-Library — 16 feuert bei fast jeder Interaktion und flutet die Konsole):

```javascript
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 200) {
      console.warn('Langsame Interaktion:', entry.name,
        Math.round(entry.duration), 'ms', entry.target);
    }
  }
}).observe({ type: 'event', buffered: true, durationThreshold: 40 });
```

**Feld:** den `web-vitals/attribution`-Build einsetzen — `onINP()` liefert dort einen
LoAF-Breakdown (Long Animation Frame: längstes Skript + Phase). Der zeigt konkret, ob
Lenis' rAF-Loop, ein ScrollTrigger-Callback oder das Canvas-Drawing den INP frisst —
statt „irgendwas mit Scroll" zu raten.

## CLS

- Bilder/Embeds mit `width`/`height` oder `aspect-ratio` — Platz reserviert, kein Sprung.
- Fonts: `font-display: swap` (oder `optional`) **plus Metrik-Fallback** — der
  System-Fallback wird per Override auf die Metriken der Custom-Font gezogen, dann
  verschiebt der Swap nichts mehr:

```css
@font-face {
  font-family: 'Custom';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap;
  size-adjust: 105%;
  ascent-override: 95%;
  descent-override: 20%;
}
```

- Animationen nur über `transform`/`opacity` (House-Regel) — `height`/`top` animieren
  erzeugt Shifts **und** Layout-Arbeit.
- Shift-Quellen live finden (Lighthouse v13 nennt sie zusätzlich im `cls-culprits-insight`):

```javascript
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      console.log('Shift:', entry.value, entry.sources?.map(s => s.node));
    }
  }
}).observe({ type: 'layout-shift', buffered: true });
```

## Performance-Budget

| Ressource | Budget | Warum |
|---|---|---|
| Gesamtgewicht Seite | < 1,5 MB | 3G lädt in ~4 s |
| JavaScript (komprimiert) | < 300 KB | Parse- + Ausführungszeit |
| CSS (komprimiert) | < 100 KB | render-blocking |
| Bilder above-fold | < 500 KB | LCP |
| Fonts | < 100 KB | FOIT/FOUT |

**Ausnahme:** Das Budget gilt für das **initiale Payload bis zum LCP**.
Canvas-Frame-Sequenzen werden **nach** dem LCP progressiv nachgeladen (gechunkt, siehe
INP-Rezept) und reißen das Budget **bewusst nicht** — sie stehen außerhalb der Wertung,
solange sie LCP und INP nachweislich nicht verschlechtern.

## Klarstellungen — wo das Standard-Rezept hier NICHT gilt

1. **Scroll-Debounce:** Das Debounce-Rezept (~100 ms) gilt NUR für billige
   Scroll-Nebenarbeit — Analytics-Marker, Sticky-Header-Klasse. **NIEMALS** für die
   rAF-synchronisierte Lenis/ScrollTrigger-Pipeline: ein 100-ms-Debounce dort lässt den
   Scrub sichtbar ruckeln. Die Pipeline läuft pro Frame — das ist ihr Design, kein Bug.
2. **Kein globaler reduced-motion-Kill-Switch.** Animation pauschal abzuschalten ist nicht
   unser Weg — es gilt der **kuratierte Fallback** aus dem Skill `a11y-audit`: statische
   Alternative mit Gestaltung, kein toter Screen.
3. **Speculation Rules / Early Hints = progressive enhancement.** Speculation Rules sind
   Chromium-only (Safari/Firefox ignorieren das Script), Early Hints (HTTP 103) sind
   CDN-abhängig. Einsetzen erlaubt — aber das Gate muss **ohne sie** grün sein, sie sind
   nie die Voraussetzung fürs Bestehen.
