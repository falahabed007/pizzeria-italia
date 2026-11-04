---
name: deploy-checklist
description: Pre-Launch Go/No-Go-Checkliste vor dem Deployment einer Kundensite — alle Gates müssen grün sein (Performance LCP/INP/CLS, Anti-Slop, Motion/A11y, SEO, Inhalte, QA, DNS/SSL, Secrets, Rollback). Endet mit GO oder NO-GO. Trigger auch bei: Launch, Deployment, Go-Live, Pre-Launch, Checkliste, live schalten, freigeben, deploy bereit, kann das raus.
---

# deploy-checklist

Hartes Go/No-Go-Gate vor dem Launch. **Ein Launch passiert NUR, wenn alle 9 Gates grün sind.** Ein einziges rotes Gate = **NO-GO**. Kein Override „wird schon".

Hosting-Default: **Netlify** (Astro). Statischer Build; SSR-Adapter (`@astrojs/netlify`) nur bei Bedarf — kein CMS als Standard.

## Ablauf

1. `checklist.md` aus diesem Ordner öffnen und Gate für Gate durchgehen.
2. Die Audit-Gates über die zuständigen Skills fahren — nicht selbst raten:
   - **Gate 1 Performance:** Pflicht-Lauf
     `npx lighthouse@13.3.0 <LIVE-URL> --output html --output-path docs/seo/daten/qa/<host>-lighthouse.html`
     — Report als Beleg; Schwellen und Diagnose: `references/performance.md`.
   - **Gate 2 Anti-Slop:** Skill `design-review` → muss **PASS** liefern.
   - **Gate 3 Motion/A11y:** Skill `a11y-audit` + `prefers-reduced-motion`-Fallbacks; Lenis/GSAP flüssig.
   - **Gate 4 SEO:** Skill `seo` (Audit-Workflow, `/seo:audit`) → muss bestehen.
   - **Gate 6 QA:** `tools/cross-engine.mjs` → drei Engines, drei Breiten, keine Konsolen-Fehler, kein Überlauf, keine kaputten Bilder.
     **Plus Pflicht-Lauf über alle drei Engines** (nicht optional, nicht ersetzbar
     durch Chromium mit anderer Fensterbreite):
     ```
     cd tools && node cross-engine.mjs <LIVE-URL>
     ```
3. Jeden Punkt nur abhaken, wenn **verifiziert** (Screenshot, Log, Tool-Output) — nicht „sieht ok aus".
   ⚠ „Cross-Browser ok" stand hier schon, bevor es ein Werkzeug dafür gab, und
   wurde deshalb jahrelang auf Annahme abgehakt. Ein Gate ohne ausführbaren
   Befehl ist kein Gate — steht ein Punkt ohne Befehl da, ist das ein Mangel der
   Checkliste, kein Freibrief.
4. Am Ende **GO** oder **NO-GO** ausgeben, NO-GO immer mit konkreter Liste der offenen Punkte + zuständigem Gate.

## Die 9 Gates (Kurzfassung)

| # | Gate | Grün, wenn |
|---|---|---|
| 1 | **Performance** | LCP ≤ 2,5 s · INP ≤ 200 ms · CLS ≤ 0,1 — trotz Motion. Bilder AVIF/WebP, Fonts mit `font-display`, keine Layout-Shifts. |
| 2 | **Anti-Slop** | `design-review` = PASS. |
| 3 | **Motion/A11y** | `a11y-audit` ok, `prefers-reduced-motion`-Fallbacks greifen, Animationen ruckelfrei. |
| 4 | **SEO** | `seo` (`/seo:audit`) ok — Meta/OG, `sitemap.xml`, `robots.txt`, Canonicals, JSON-LD, Motion-Content im DOM. |
| 5 | **Inhalte** | Finale Inhalte gepflegt, kein Lorem/Platzhalter, Bildrechte/Provenance geklärt. |
| 6 | **QA** | `tools/cross-engine.mjs` grün über Chromium/WebKit/Firefox (mit JSON-Beleg) — Breakpoints, keine Konsolen-Fehler, keine 404. |
| 7 | **Infra** | DNS/SSL, Redirects (www/non-www, http→https), 404-Seite, Analytics/Consent, OG-Preview, Favicons. |
| 8 | **Secrets** | Keine Keys im Build, `.env` nicht committed. |
| 9 | **Rollback** | Preview-Deploy erreichbar, Rollback-Pfad da, finaler Smoke-Test live. |

## Output-Format

```
ERGEBNIS: GO        (alle 9 Gates grün)
```
oder
```
ERGEBNIS: NO-GO
Offene Punkte:
- [Gate X] <konkreter Blocker>
- [Gate Y] <konkreter Blocker>
```

Detail-Checkliste mit allen Einzelpunkten je Gate: siehe `checklist.md`.
