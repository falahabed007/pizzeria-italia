# Pre-Launch Checkliste — Go/No-Go

> Regel: **Ein Launch passiert NUR, wenn ALLE Gates grün sind.** Jeder Punkt wird verifiziert (Tool-Output, Log, Screenshot) abgehakt — nicht nach Gefühl. Ein offener Blocker = **NO-GO**.
>
> Hosting-Default: **Netlify** (Astro). Statischer Build; SSR-Adapter nur bei Bedarf.
>
> Projekt: `__________________`  ·  Domain: `__________________`  ·  Datum: `__________`  ·  Geprüft von: `__________`

---

## Gate 1 — PERFORMANCE (Core Web Vitals, trotz Motion)

Quelle: Lighthouse (Lab) **und** CrUX/Feld, wo verfügbar. Mobile zuerst.
Schwellen, Mess-Rezept und Diagnose (Canvas-Hero-LCP, INP-Chunking, Font-Metrik-Fallback): [references/performance.md](references/performance.md)

- [ ] **Lighthouse-Lauf mit Beleg** — Pflicht-Befehl, Report als Beleg ablegen:
      ```
      npx lighthouse@13.3.0 <LIVE-URL> --output html --output-path docs/seo/daten/qa/<host>-lighthouse.html
      ```
      (Version gepinnt = läuft aus dem npx-Cache; v13 nennt die Audits „Insights", z. B. `cls-culprits-insight`)
- [ ] **LCP ≤ 2,5 s** (mobil, gedrosselt)
- [ ] **INP ≤ 200 ms** — auch während/nach Scroll-Animationen
- [ ] **CLS ≤ 0,1** — keine Sprünge durch Motion, Late-Fonts oder Bilder
- [ ] Bilder in **AVIF/WebP**, responsive `srcset`/`sizes`, korrekte `width`/`height` gesetzt
- [ ] LCP-Bild **priorisiert** (preload / `fetchpriority="high"`), nicht lazy
- [ ] Fonts mit `font-display: swap` (oder `optional`), nur genutzte Schnitte, **preload** der kritischen Schrift
- [ ] **Keine Layout-Shifts**: feste Maße für Media/Embeds, reservierter Platz für dynamische Blöcke
- [ ] JS-Budget eingehalten — Hydration nur wo nötig (Astro Islands), kein toter Code im Bundle
- [ ] Animationen nur über `transform`/`opacity` (GPU), kein Layout-Thrashing
- [ ] Lighthouse-Performance-Score dokumentiert: `____ / 100` (Mobile)

---

## Gate 2 — ANTI-SLOP  → Skill `design-review`

- [ ] **`design-review` = PASS** (Pflicht, kein Launch ohne) — Kriterien und Punkte dort, nicht hier
- [ ] Ergebnis dokumentiert: Punkte `____ / 21` · PASS / FAIL → `__________`

---

## Gate 3 — MOTION / A11Y  → Skill `a11y-audit`

- [ ] **a11y-Gate mit Exit 0 durchgelaufen** — `node .claude/skills/a11y-audit/scripts/a11y-gate.mjs <url> --mobile`
      (auch gegen einen lokalen `dist`-Ordner, dann schon vor dem Deploy)
      Deckt maschinell ab: axe nach dem Durchscrollen, Kontrast von Text über Bild/Canvas, reduced-motion-Fallback. Ausgabe ins Protokoll unten.

      ⚠ **Startet das Gate gar nicht, ist das ROT — nicht „übersprungen".** Am
      03.08.2026 starb es mit „Executable doesn't exist": es löste Playwright fest
      auf, im Cache lag durch das QA-Werkzeug aber nur 1234, und dazu stand im
      Skript ein fest verdrahteter Pfad auf eine dritte Revision. Behoben — es
      sucht jetzt den ersten Ort, an dem Playwright UND sein Browser liegen.
      Der eigentliche Punkt bleibt: ein Gate, das nicht läuft, sieht im Protokoll
      genauso aus wie eins, das nichts gefunden hat.
- [ ] **`a11y-audit` bestanden** — das, was das Gate nicht kann: Tastaturweg, Screenreader, Zoom/Reflow, Alt-Text-Sinn
- [ ] Lenis ↔ GSAP sauber synchronisiert, Scroll-Choreografie **flüssig** (keine Ruckler/Jank)
- [ ] **Tastatur-Navigation** komplett, sichtbarer **Fokus-Ring**, logische Tab-Reihenfolge
- [ ] Keine reine Bewegung als einzige Info-Quelle; kein Auto-Play-Flackern (> 3 Hz)
- [ ] Screenreader-Basics: Landmarks, `alt`-Texte, sinnvolle Heading-Struktur, `aria` wo nötig

---

## Gate 4 — SEO  → Skill `seo` (`/seo:audit`)

- [ ] **`/seo:audit` bestanden** (Score je Seite ok, kein harter Motion-Deckel)
- [ ] **Motion-Check:** Kerninhalt (H1/Fließtext/CTAs) steht als echtes HTML im DOM, nicht nur im Canvas
- [ ] `<title>` + Meta-Description je Seite, einzigartig
- [ ] **Open-Graph / Twitter-Cards** gesetzt, OG-Bild korrekt (Pfad absolut, 1200×630)
- [ ] **`sitemap.xml`** vorhanden, erreichbar, in `robots.txt` referenziert
- [ ] **`robots.txt`** korrekt (kein versehentliches `Disallow: /` aus der Staging-Phase)
- [ ] **Canonicals** sauber (eine kanonische URL je Seite, kein Mix www/non-www)
- [ ] **JSON-LD / Schema.org** valide (Organization/LocalBusiness/relevante Typen)
- [ ] Heading-Hierarchie (genau ein `h1`/Seite), aussagekräftige `alt`-Texte
- [ ] Kein `noindex` mehr aktiv, das vom Staging stammt

---

## Gate 5 — INHALTE

- [ ] Alle Inhalte gepflegt — **kein Lorem ipsum, keine Platzhalter, keine TODO-Texte**
- [ ] Bilder/Assets final (keine Beispielbilder), Bildrechte/Provenance geklärt
- [ ] Texte Korrektur gelesen (Rechtschreibung, Zahlen, Kontaktdaten, Preise)
- [ ] (Nur falls ausnahmsweise ein CMS genutzt wird: Live-Preview ok, **published** statt Draft, Re-Deploy-Webhook)

---

## Gate 6 — QA  → `tools/cross-engine.mjs` + a11y-Gate

- [ ] **Cross-Engine-Smoke durchgelaufen** (`cd tools && node cross-engine.mjs <LIVE-URL> --pfade=…`)
- [ ] **Cross-Engine-Lauf grün** — mit BELEG, nicht auf Zuruf. Vollständiger
      Ablauf: tools/README.md
      ```
      cd tools && node cross-engine.mjs <LIVE-URL>
      gh workflow run cross-platform-qa.yml -f url=<LIVE-URL>    # echtes Windows
      ```
      Deckt Blink + WebKit + Gecko über fünf Profile ab: `mac-1470` (1470×844),
      `gedockt-960` (960×912), `skaliert-1280` (1280×608 @1,5×), `handy-393`
      (393×659 @3×), `reduced-motion`. Grün heißt: pro Lauf `"urteil": "gruen"`
      und `"maengel": []`. Die JSON-Ausgabe gehört in den Bericht.

      Der Lauf legt seinen Beleg unter `docs/seo/daten/qa/<host>.json` ab.
      Anschauen — Matrix Profil × Engine, jedes Profil mit einem Sprung in die
      Gerätevorschau — im **Device-Lab**, Tab „Prüfung":
      Dort lässt sich der Lauf auch starten, statt ihn zu tippen.

      ⚠ **Der Beleg altert.** Er trägt seinen Zeitstempel; das Lab warnt ab 24
      Stunden. Ein Beleg von vor dem letzten Deploy belegt nichts.

      ⚠ **Dieser Punkt stand hier schon vorher — und wurde trotzdem falsch
      abgehakt.** Bis zum 03.08.2026 lief jede Prüfung ausschließlich in Chromium
      mit gesetzter Viewport-Breite; „WebKit ok" war eine Annahme. Die
      WebKit-Binärdatei lag die ganze Zeit ungenutzt im Playwright-Cache. Ein Gate
      ohne ausführbaren Befehl ist kein Gate.
- [ ] **Handy- und Leitungslauf grün** — Pflicht bei jeder Seite mit
      Scroll-Video oder leitungsabhängiger Medienwahl. Schritt 1c der
      der Prüfung mit drei Browser-Engines (tools/cross-engine.mjs).
      ```
      cd tools
      node handy-realfall.mjs <LIVE-URL>     # laeuft die Animation ueberhaupt?
      node handy-test.mjs     <LIVE-URL>     # Geraeteprofile: Stufe, Flug, Layout
      node wisch-test.mjs     <LIVE-URL> 2   # folgt das Bild dem Daumen?
      ```
      Grün heißt bei `handy-realfall`: **jede Zeile sagt `✓ Animation laeuft`,
      die beiden reduced-motion-Zeilen eingeschlossen.** Bei `wisch-test` zählt
      der größte Rückstand, nicht der Endstand — ein Video, das durchläuft, aber
      zwei Sekunden hinter dem Daumen herhinkt, ist nicht in Ordnung.

      ⚠ **Auch dieser Punkt kommt aus einem bestandenen Gate.** Am 14.08.2026
      100 % Flug — und auf dem echten Handy lief keine Scroll-Animation. Eine
      Zeile schaltete das Video ab, sobald der Browser `effectiveType: "3g"`
      meldete; Android-Chrome meldet das an gutem LTE, Playwright nie. Die
      Prüfung lief am Glasfaser-Schreibtisch und konnte den Fall nicht sehen.
- [ ] **Keine Weiche schaltet eine scroll-gebundene Animation ganz ab** — auch
      `prefers-reduced-motion` nicht. Dort hört nur auf, was **von selbst**
      läuft (Auto-Loops, Laufband, Magnete, Smooth-Scroll); was dem Scroll
      folgt, läuft weiter. Eine Sparstufe wählt die Qualitätsstufe, nie das
      Ob. „Nicht messbar" ist nicht „langsam" und bekommt die mittlere Stufe.
      ⚠ **Niemand darf an seinem Gerät etwas umstellen müssen, damit die Seite
      funktioniert.** Am 14.08.2026 klappte reduced-motion alle drei gepinnten
      Bühnen zusammen — auf jedem iPhone mit „Bewegung reduzieren" war die
      Seite inhaltlich tot.
      Maßstab und Begründung: tools/README.md.
- [ ] **Grenzen des Laufs benannt**: WebKit ist NICHT iOS Safari (keine ein- und
      ausfahrende Adressleiste, keine echten Scroll-Position-Eigenheiten, kein
      Gerätespeicher), und es gibt kein echtes Windows-Schriftbild, keine
      System-Scrollleiste, keine echte Geräteleistung. Was davon für die Site
      zählt, gehört als Restrisiko in den Bericht — nicht verschwiegen.
- [ ] **Breakpoints**: Mobile, Tablet, Desktop, Wide — Layout hält, kein horizontales Scrollen
      (Überlauf immer gegenprüfen, ob man TATSÄCHLICH seitwärts scrollen kann —
      `scrollWidth > clientWidth` allein liefert Fehlalarme)
- [ ] **Keine Konsolen-Fehler** (JS-Errors, fehlgeschlagene Requests)
- [ ] **Keine 404** (interne Links, Assets, Fonts, Bilder)
- [ ] Forms funktionieren (Submit, Validierung, Erfolgs-/Fehlerzustand, Mailziel/Endpoint live)
- [ ] Scroll-/Motion-Verhalten ohne Jank über die Breakpoints
- [ ] Visuelle Regression gegen Referenz-Screenshots ok

---

## Gate 7 — INFRA

- [ ] **DNS** zeigt korrekt auf das Hosting-Target (A/AAAA/CNAME), Propagation abgeschlossen
- [ ] **SSL/TLS** aktiv, gültiges Zertifikat, kein Mixed-Content
- [ ] **Redirects**: `www` ↔ non-www vereinheitlicht **und** `http → https` erzwungen
- [ ] **Custom 404-Seite** vorhanden und gestaltet (nicht der Default des Hosters)
- [ ] **Analytics + Consent** korrekt verdrahtet (lädt erst nach Einwilligung, DSGVO-konform)
- [ ] **OG-Bild-Preview** geprüft (Debugger für Social-Sharing zeigt das richtige Bild)
- [ ] **Favicons** komplett (`favicon.ico`, Apple-Touch, manifest/`theme-color`)
- [ ] Caching-/Cache-Control-Header sinnvoll gesetzt

---

## Gate 8 — SECRETS

- [ ] **Keine Keys/Tokens im Build-Output** (nur `PUBLIC_`-Variablen clientseitig)
- [ ] **`.env` nicht committed** — steht in `.gitignore`, Git-History sauber
- [ ] Secrets liegen in den **Netlify-Env-Vars**, nicht im Repo

---

## Gate 9 — ROLLBACK / SMOKE-TEST

- [ ] **Preview-/Staging-Deploy erreichbar** und mit Prod-Stand identisch
- [ ] **Rollback-Pfad bekannt** (vorheriges Deployment per ein Klick wiederherstellbar)
- [ ] **Finaler Smoke-Test auf der Live-Domain**: Startseite + Kern-Flows + Forms
- [ ] Monitoring/Uptime-Check aktiv (optional, aber empfohlen)

---

## ERGEBNIS

- [ ] **GO** — alle 9 Gates grün, Launch freigegeben.

oder

- [ ] **NO-GO** — offene Punkte:
  - [Gate __] `________________________________`
  - [Gate __] `________________________________`
  - [Gate __] `________________________________`
