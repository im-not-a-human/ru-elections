# Visual-first refactor of partii/sujety pages — design spec

**Date:** 2026-05-05
**Author:** brainstorm session, im-not-a-human + assistant
**Pilot page:** `partii/novye-lyudi.html`
**Scope after pilot:** 14 `partii/*.html` + 6 `sujety/*.html` (out of scope: `index.html`, `vybory.html`, `tsenzura.html`, `dokumenty.html` — already approved as-is)
**Research input:** `docs/superpowers/research/2026-05-05-visual-first-redesign-proposal.md`
**Comprehensive review input:** `docs/superpowers/reviews/2026-05-05-comprehensive-review.md`

---

## 1. Context and goal

The 14 `partii/*` and 6 `sujety/*` pages are 2 200–4 585-word longreads with one terminal timeline (most pages) or one inline table (some spoiler pages). The «портяночный» score on the worst pages is 4 585 words / 1 visual. Independent code-review (Codex + Claude) and the user's lived experience confirm: the «клиповая» audience reading on phones cannot get through 4 500 words of dossier prose; the dossier value is gated behind a wall of text that looks like another political article.

The goal is to **invert the text-to-visual ratio**: every section opens with a strong visual claim + 50–120-word factual summary; the original 200–500-word prose lives in a `<details>` fold that the reader can open if they want. Plus an opt-in full-screen «Презентация» overlay for cinematic slide-style consumption.

This is **not** a TikTok clone. The dossier value (primary-source evidence, tier-marked attribution, ana­lytical rigour) stays. We change the surface — visualisation density, progressive disclosure, presentation mode — without diluting the content layer.

A second concern surfaced during brainstorming: the tier-1 parties **Новые люди** (~930 words) and **Единая Россия** (~955 words) are *under-described* compared to non-tier-1 КПРФ (2 739 words) and Яблоко (4 585). НЛ is currently the most hyped party in public discourse and the most thinly documented in this site — that is a structural problem the refactor must fix.

## 2. Architectural decisions (brainstorm outcomes)

Each row was chosen interactively against alternatives.

| # | Decision | Choice | Alternatives considered |
|---|---|---|---|
| 1 | Pilot page | **Новые люди** | Yabloko (highest portyanka but already has anchor cards); both at once (split focus); all 20 in parallel (rejected) |
| 2 | Snap mode | **Section-snap proximity** (`scroll-snap-type: y proximity` + `scroll-snap-align: start` per section) | Hard mandatory snap (TikTok-style — anti-pattern for long-form per NN/g 2024); soft scrollytelling without any snap; hybrid with opt-in overlay only |
| 3 | Section layout | **Two-pane scrollytelling** (text 40% left, sticky viz 60% right) | Centered (current); full-bleed |
| 4 | Disclosure | **Native `<details>` accordion** + existing sources-fold for tiered sources | Side-panel slide-in; modal overlay; inline tabs |
| 5 | Content drafting | **Hybrid D**: assistant drafts from `research/compromat/01-parties/05-novye-lyudi/` → tree summary → user marks corrections → commit | Full assistant draft; per-section review; user writes summaries |
| 6 | Presentation overlay | **Yes, included in pilot** — reuse existing `assets/js/lib/presentation.js` (401 LOC, already on index/vybory/tsenzura) | Skip for pilot; auto-generate slides from sections |
| 7 | Hotspots | **Selective in 6 hero viz** (registration window, financing trajectory, leader grid, ownership flow, vote waffle, relationship network) — simple bars/stats remain static | Hotspots everywhere; tooltips only; none in pilot |

## 3. Page architecture

Each refactored partii page consists of, in flow order:

1. **Topnav + page-toggle** — unchanged (Дума / Выборы / Рунет / Архив)
2. **Fixed-left TOC** — unchanged from today's session (`position: fixed; left: 24px; top: 100px; width: 200px`); visible only ≥1080px
3. **Hero block** — exactly 100vh, first snap stop. 4 stat-tiles in a horizontal strip (was 2×2 grid)
4. **Sections A–H** — each a section-snap slide. Within section: two-pane scrollytelling (text + sticky viz). Between sections: proximity snap docks the next section's top edge
5. **Hidden FAB «Презентация»** — bottom-right; opens full-screen overlay via existing engine
6. **Footer** — unchanged (`assets/js/lib/footer.js` injection)

**Per-section anatomy:**

```html
<section class="party-sec" id="origins" data-toc-id="origins">
  <div class="party-sec-text">
    <div class="party-sec-mark">A · Происхождение</div>
    <h2>Откуда взялась партия</h2>

    <p class="party-sec-tldr">[50–120 word factual summary]</p>

    <details class="party-sec-detail">
      <summary>Развернуть подробнее →</summary>
      <p>[300–500 word expanded prose]</p>
    </details>

    <div class="sources-fold">[existing tiered sources]</div>
  </div>

  <div class="party-sec-viz">
    <div id="origins-viz"></div>
    <p class="party-sec-viz-cap">[short caption]</p>
  </div>
</section>
```

The design adds three new structural elements per section: `.party-sec-tldr` (always-visible summary), `.party-sec-detail` (native `<details>`), and `.party-sec-viz-cap` (caption under viz). The existing `.party-sec-mark` and `.sources-fold` are reused unchanged.

## 4. Two-pane CSS framework

```css
/* Section snap — gated to partii/sujety pages only via data-page selector */
html:has(main[data-page="party"]),
html:has(main[data-page="sujet"]) {
  scroll-snap-type: y proximity;
  scroll-padding-top: 80px;
}

.party-sec {
  scroll-snap-align: start;
  min-height: calc(100vh - 100px);
  padding: 60px 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (min-width: 900px) {
  .party-sec {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
    gap: 48px;
  }
}

.party-sec-text {
  max-width: 60ch;
  padding-right: 12px;
}

.party-sec-viz {
  position: sticky;
  top: 100px;
  align-self: start;
  max-height: calc(100vh - 120px);
  overflow: auto;
}

@media (max-width: 899px) {
  .party-sec-viz {
    top: 60px;
    max-height: 55vh;
    z-index: 10;
    background: var(--bg);
  }
}

/* Push content right of fixed-left TOC on ≥1080px */
@media (min-width: 1080px) {
  .party-page-layout {
    padding-left: 256px; /* TOC width 200 + left 24 + gap 32 */
  }
  .party-hero .wrap,
  main[data-page="party"] > .wrap,
  main[data-page="sujet"] > .wrap {
    padding-left: 256px;
  }
}

/* Reduced motion: kill snap animation */
@media (prefers-reduced-motion: reduce) {
  html:has(main[data-page="party"]),
  html:has(main[data-page="sujet"]) {
    scroll-snap-type: none;
  }
  .story-section,
  .story-section.is-visible,
  .story-section:not(.is-visible) {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
```

The `:has()` selector has 91% browser support as of 2025 (caniuse). For older browsers the snap simply doesn't apply — page reads as soft scroll, no breakage.

## 5. Hero block design

The hero becomes a 100vh slide containing only:

- meta-row (faction status / years / mandate count) — unchanged
- `<h1>` display headline (clamp 56-88px) — unchanged
- 70-word lead paragraph (max 60ch) — unchanged content, narrower column
- **horizontal strip of 4 stat-tiles** (was 2×2 grid; now equal-width row)
- subtle scroll-hint ↓ at bottom

One stat-tile (the most contradictory `alert` one — for НЛ that's «92% за ограничения») gets an `ⓘ` micro-button that toggles an inline 50–80-word explainer. This is the reader's first encounter with progressive disclosure on the page.

Stat-tile typography: numbers in **JetBrains Mono with `font-feature-settings: "zero" 1, "tnum" 1`** (slashed zero, tabular numerals). This was already established today on `.sa-num` to fix the 0/O confusion the user flagged.

```html
<div class="party-hero-stats horizontal">
  <button class="stat" data-detail="ep-92"
          aria-expanded="false" aria-controls="stat-detail-92">
    <div class="n alert">92%</div>
    <div class="lbl">«за» по 28 ограничительным законам 2022–2025</div>
    <div class="more-cue">ⓘ</div>
  </button>
  <!-- 3 more tiles -->
</div>

<div id="stat-detail-92" class="stat-detail" hidden>
  Из 28 ключевых законов 2022–2025 фракция НЛ поддержала 26: фейки об армии,
  иноагенты, мобилизация, ЛГБТ-запреты, чайлдфри, конфискация имущества.
  Единственный системный «против» — закон о VPN от 22.07.2025.
</div>
```

Background stays cream `#F0EAD6`. An optional very subtle right-edge gradient (5–10% party brand colour) is included to anchor the hero to the partii brand stripe used in extended-parties cards on the index hub.

## 6. Component inventory (НЛ pilot)

| # | Component | Section | Type | LOC | Hotspots? | Reuse? |
|---|---|---|---|---|---|---|
| 1 | `renderStatStrip` | Hero | XS, CSS-mostly | ~30 | one (alert tile only) | new |
| 2 | `renderRegistrationWindow` | A · Origins | S, inline SVG | ~60 | yes (per-party) | new |
| 3 | `renderRegSpeedBar` | A details | S, CSS bars | ~40 | no | new |
| 4 | `renderFinancingTrajectory` ⭐ | B · Financing | M, Chart.js area | ~80 | yes (per-year) | new |
| 5 | `renderBudgetShare` | B details | S | — | no | exists ✓ |
| 6 | `renderLeaderGrid` (extend) | C · Leaders | S | +30 delta | yes (per-leader) | exists, extend |
| 7 | `renderTrusteeContext` | D · State ties | XS, stat-card | ~20 | no | new |
| 8 | `renderOwnershipFlow` | D · State ties | S, inline SVG | ~50 | yes (per-step) | new (subsidy-flow pattern) |
| 9 | `renderVoteBar` | E · Voting | S | — | no | exists ✓ |
| 10 | `renderVoteWaffle` ⭐ | E · Voting | S/M, inline SVG | ~70 | yes (per-cell, 28 cells) | new |
| 11 | `renderRelationshipNetwork` | F · Managed-opp | M, inline SVG | ~100 | yes (per-node/edge) | new |
| 12 | `renderTimelineVert` | G · Crisis | S | — | no | exists ✓ |
| 13 | `renderSwimlane` ⭐ | G · Crisis | M, inline SVG | ~80 | no | new |
| 14 | foreign-ties stat card | H · Foreign | XS, CSS-only | ~40 | no | inline |

**Totals: 8 new components (rows 1, 2, 4, 7, 8, 10, 11, 13) + 4 reuses (rows 5, 6, 9, 12) + 2 inline (rows 3, 14); ~530 LOC of new component code.**

⭐ marks the three highest-payoff visualisations (financing-trajectory CORE viz, vote-waffle CORE viz, swimlane Даванков-paradox).

Hotspot interaction follows W3C SVG-AAM 1.0: `<g tabindex="0" role="button" aria-label="…">` with `<title>` and optional `<desc>` for tooltips. Click and Enter both fire same handler. Detail panel is a `<aside class="hotspot-detail" role="region">` that slides in from the bottom of the viz container (or replaces its content, depending on space). All hotspot handlers route through one shared `assets/js/lib/hotspot.js` (~60 LOC).

## 7. Presentation overlay integration

Reuse of existing engine. Three additions:

**1) `assets/js/decks/party-novye-lyudi.js`** (~20 LOC):

```js
window.PresentSlides = [
  { id: 'hero',       sources: ['.party-hero'], layout: 'cover' },
  { id: 'origins',    sources: ['#origins'] },
  { id: 'financing',  sources: ['#financing'],  layout: 'wide' },
  { id: 'leaders',    sources: ['#leaders'] },
  { id: 'state-ties', sources: ['#state-ties'] },
  { id: 'voting',     sources: ['#voting'],     layout: 'wide' },
  { id: 'managed',    sources: ['#managed'] },
  { id: 'crisis',     sources: ['#crisis'] },
  { id: 'foreign',    sources: ['#foreign'] },
];
```

**2) HTML inclusion** at the bottom of `partii/novye-lyudi.html`:

```html
<script src="../assets/js/decks/party-novye-lyudi.js"></script>
<script src="../assets/js/lib/presentation.js"></script>
```

**3) `assets/css/presentation.css` patches** (~30 LOC) for two-pane → single-pane collapse inside overlay:

```css
.present-overlay .party-sec {
  display: flex;
  flex-direction: column;
  grid-template-columns: none !important;
  gap: 24px;
  padding: 0;
  min-height: auto;
}
.present-overlay .party-sec-viz {
  position: static !important;
  max-height: 65vh;
  order: 1;
}
.present-overlay .party-sec-text {
  order: 2;
  max-width: 90ch;
}
.present-overlay .party-sec-text > details,
.present-overlay .party-sec-text > .sources-fold {
  display: none;
}
.present-overlay .party-sec-tldr {
  font-size: clamp(16px, 1.6vw, 20px);
  line-height: 1.55;
}
```

Engine-internal node relocation already preserves Chart.js / SVG state; no extra work for presentation-mode visualisation behaviour.

## 8. Mobile / no-JS / a11y / print

**Mobile (≤899px):**

- Two-pane collapses to single column
- Viz sticky at `top: 60px; max-height: 55vh; z-index: 10` — like inline video
- Text scrolls under the sticky viz
- Hero stat-tiles → 2×2 on ≤600px, single row 600–899px
- Section-snap unchanged (CSS-only)
- TOC hidden (≥1080px gate, unchanged)
- FAB unchanged
- Touch targets ≥44px for SVG hotspots — implemented via invisible `<rect>` overlay sized to ≥44px around small clickable shapes

**No-JS fallback:**

- `<details>` works natively
- Sticky positioning, snap, two-pane grid — all CSS, no JS dependency
- Hotspot interactivity does NOT work without JS, but viz still render (inline SVG inlined in HTML, not JS-rendered)
- Hover tooltips fall back to native `<title>` browser behaviour
- Chart.js-dependent viz (financing trajectory) gets a `<noscript>` fallback containing a textual summary of the data
- JS-rendered components (leader-grid, case-grid, vote-waffle) ship with **inline placeholder content** in their mount-points; JS replaces but no-JS readers see the placeholder
- Presentation FAB is JS-injected — absent without JS

**A11y checklist:**

- `prefers-reduced-motion: reduce` disables snap (`scroll-snap-type: none`), reveal fade-ins, presentation transitions
- Keyboard navigation: Tab through `<summary>` of each `<details>`, Enter expands; arrows/space in presentation overlay (engine handles); SVG hotspots `tabindex="0" role="button" aria-label="…"`
- `:focus-visible` outline on all interactives (already in `tokens.css`)
- Focus trap inside presentation overlay (engine handles)
- ARIA semantics:
  - `<section role="region" aria-labelledby="…h2-id">`
  - `<details>` browser auto-handles `aria-expanded`
  - `<svg role="img" aria-labelledby="title-id desc-id">` with embedded `<title>` and `<desc>`
  - Live region `<div aria-live="polite">` for presentation slide counter (engine handles)
- Screen-reader announces «Слайд X из Y» on overlay entry (engine)
- Colour contrast ≥4.5:1 for all text and hotspot states (existing tokens compliant; new brand-stripe colours from `extended-parties.js` to be verified during pilot)

**Print:**

```css
@media print {
  .party-toc, .present-fab { display: none; }
  details:not([open]) > *:not(summary) { display: block !important; }
  .party-sec { page-break-inside: avoid; }
  .party-sec-viz { position: static; }
}
```

All `<details>` forced open in print so the dossier prints fully.

**SEO:** all text in DOM (tldr always-visible, `<details>` content is part of the document tree). Crawlers index everything. `<h2>` per section is correct semantic hierarchy. Existing meta-description / canonical / og:* tags unchanged.

## 9. Phase plan

**Phase 1 — Pilot (Новые люди), 21–26 hours total:**

| Step | Description | Hours |
|---|---|---|
| 1 | Component library (8 new + 1 inline-bar) | 10–12 |
| 2 | HTML refactor + content draft (8 sections, ~2 700 words) | 3–4 |
| 3 | Wiring (data files, init logic) | 2 |
| 4 | Section-snap + two-pane CSS | 2 |
| 5 | Presentation overlay (deck + CSS patches) | 2 |
| 6 | Testing (a11y, mobile 320–768, no-JS, print, screen-reader) | 2 |
| 7 | User review (tree summary → mark corrections → apply) | 1 |

**Phase 2 — Roll-out to remaining 13 partii, ≈5–8 dev-days:**
Same architecture, content drafted from `research/01-parties/<NN>-<slug>/` per page. Components mostly reused. Small per-page customisation for unique facts (e.g. КПРФ leader-grid has 5 leaders, ЛДПР has 6 etc.).

**Phase 3 — 6 sujety pages, ≈2–3 dev-days:**
More event-based than partii (mobilization, voennyy-byudzhet, …). Reuses most NL components; needs a few sujet-specific renderers (e.g. budget treemap for `voennyy-byudzhet`, signature-meter for `munitsipalnyy-filtr`).

**Phase 4 — Cross-cutting cleanup, ≈1 dev-day:**
- ER content expansion (already minimal 4-section TOC; expand without structural refactor)
- Index hub visual updates if anything diverges from new partii pages
- `STYLEGUIDE.md` capture of new conventions (per Codex review S-4)

## 10. Acceptance criteria for Phase 1

The pilot is signed off when **all** of the following hold for `partii/novye-lyudi.html`:

- [ ] 8 sections + hero render in two-pane on ≥1080px viewport
- [ ] Mobile (320–899px) renders single-column with sticky viz at top
- [ ] Section-snap proximity engages between sections; no jumps within a section
- [ ] All 8 new viz components render without JS errors
- [ ] Hotspots in 6 hero viz components are clickable, keyboard-activatable, screen-reader-announceable
- [ ] Native `<details>` toggles expanded text; sources-fold tier-icons render correctly
- [ ] FAB «Презентация» injects in bottom-right; opens overlay; 9 slides; ←/→/Space/Esc work; URL `?present=N` syncs
- [ ] No-JS rendering: `<details>` works; viz mount-points show placeholder text; site is readable
- [ ] `prefers-reduced-motion: reduce` disables snap and fade-ins
- [ ] Lighthouse a11y ≥95, performance ≥85 (mobile-throttled)
- [ ] Content expansion: ≈2 700 words ±10% across all sections (КПРФ-equivalent depth)
- [ ] All 28 votes in E-section vote-waffle verified against `research/compromat/05-evidence/duma-api/votes/*.xml`
- [ ] User-review gate: tree summary of HTML/content changes presented; corrections applied; commit only after user explicit approval

## 11. Open questions deferred to implementation

- Hero gradient intensity: 5%, 10%, or no brand-colour gradient? Will A/B in pilot.
- Vote-waffle cell shape: square (28 = 4×7) vs hex (visual interest). Default square.
- Hotspot detail panel: bottom-of-viz drawer vs side-panel right of viz vs replace-viz-content. Default bottom drawer for pilot.
- For `<details>` open animation: native (instant) vs CSS-animated height transition. Default native (CSS transitions on `<details>` are jankier than they appear; modern Chrome supports `interpolate-size` but Firefox/Safari lag). Revisit per browser support.
- Presentation deck title for НЛ: «Новые люди» vs «"Новые люди" — самая чистая управляемая оппозиция». Engine auto-derives from h1; verify in pilot.
- `<details>` summary copy: «Развернуть подробнее →» vs «Полный текст раздела» vs section-specific. Default the first; verify in user review.

## 12. References

- Research file: `docs/superpowers/research/2026-05-05-visual-first-redesign-proposal.md`
- Codex/Claude comprehensive review: `docs/superpowers/reviews/2026-05-05-comprehensive-review.md`
- Existing presentation engine: `assets/js/lib/presentation.js`, `assets/css/presentation.css`
- Existing IO infrastructure: `assets/js/lib/reveal.js`, `scroll-spy.js`, `modal.js`, `tooltip.js`
- Existing component library: `assets/js/components/{vote-bar,timeline-vert,sources-fold,leader-grid,case-grid,budget-share,liquidation-strip}.js`
- Source content for НЛ: `research/compromat/01-parties/01-novye-lyudi/{A-origins,B-financing,C-leaders,D-state-ties,E-voting,F-managed-opposition,G-crisis-behavior}.md` (7 sections; no H-foreign-ties exists in research — НЛ-foreign-ties section in current HTML is sparse-content stub which we keep minimal)
- Source content for ER (Phase 4): no research dossier exists — content for ER must be synthesised from `research/compromat/02-cross-cutting/` (e.g. `09-betrayal-cases.md`) and primary sources (api.duma.gov.ru, sozd, kremlin.ru). Acknowledged as harder-than-other-partii work in Phase 4.
- Project conventions: `CLAUDE.md`
