# Visual-first redesign — research and proposal

**Date:** 2026-05-05
**Scope:** 14 `partii/*.html` + 6 `sujety/*.html` (20 sub-pages, 7 459 LOC, 2 200–4 585 words/page)
**Out of scope:** `index.html`, `vybory.html`, `tsenzura.html`, `dokumenty.html` (treated as settled by user).
**Method:** code-walk over local files (`./{partii,sujety,assets,docs}`) + web research (10 targeted queries on snap/scrollytelling/hotspots/disclosure/a11y) + cross-read of `2026-05-05-comprehensive-review.md` §4 viz catalogue.
**Constraint:** vanilla HTML/CSS/JS. No bundler. Existing CDNs only (Chart.js, marked.js, mammoth.js, SheetJS). Optional: d3.js v7 standalone modules via CDN — deferred verdict in §4.

---

## 1. Executive summary

The 20 sub-pages today are uniform 2 200–4 585-word longreads with one terminal timeline (or one inline table) per page. The user's goal — rework these pages for an audience trained on TikTok-style vertical feeds — splits into two orthogonal asks: (a) **content density**: replace prose with visuals wherever a paragraph rests on a single number, list, or before/after pair; (b) **interaction model**: provide a presentation-like vertical-paging experience without breaking long-form reading or the «спокойный» newspaper-analytics tone. The recommended path is a **hybrid (default reading flow + on-demand presentation overlay + soft scrollytelling per section)** rather than full TikTok-style hard scroll-snap on the whole page; hard snap on a 4 500-word dossier traps the reader and conflicts with the existing sticky TOC. The site already has 70 % of the infrastructure (`presentation.js` overlay, `reveal.js` IO, `timeline-vert.js`, `leader-grid.js`, `case-grid.js`, `budget-share.js`, `liquidation-strip.js`), so the work is mostly **building 8–10 more universal renderers, retrofitting hotspots into existing visuals, and turning each section into a 3–6-step "story-block" with a 40-80-word always-visible summary plus a `<details>` fold for the long prose**. Estimated total effort across all 20 pages: **6–8 dev-weeks**, plus a 4-day pilot on `partii/yabloko.html`.

---

## 2. Best practices — what I took from where

### 2.1 Three viewport-snap modes — when each works

| Mode | Behaviour | Verdict for our pages |
|---|---|---|
| `scroll-snap-type: y mandatory` + `scroll-snap-stop: always` | Locks scroll to slide boundaries, even on fast flick. | **Avoid** as page default. NN/g, MDN and CSS-Tricks all warn that mandatory-snap on long pages **traps the reader** when content height per slide exceeds viewport. (MDN — [scroll-snap-type][mdn-snap-type], [CSS-Tricks — Practical CSS Scroll Snapping][css-tricks-snap]). |
| `scroll-snap-type: y proximity` | Pulls slide into place if user scrolls "close enough"; doesn't force. | Acceptable for **inside an opt-in presentation overlay**, not page-wide. |
| Soft scrollytelling (no snap; IntersectionObserver reveals each step) | User retains scroll velocity; visual emerges progressively; nothing is "hijacked". | **Recommended default for our pages.** Same approach Pudding and NRK use. ([Pudding — sticky scrollytelling][pudding-sticky], [Chrome dev — NRK case study][nrk-case]). |

The takeaway: **scrolljacking is universally rated bad UX by 2024-2026 UX literature** for content where the reader controls the pace ([NN/g — Scrolljacking 101][nng-scrolljack], [Robin Rendle — Scrolljacking][rendle-scrolljack]). Hard snap is only safe in (a) carousels, (b) explicit slideshow modes, (c) hero sections.

### 2.2 Scrollytelling vs slide-presentation — different jobs

Pudding's process post ([sticky scrollytelling][pudding-sticky]) and Vallandingham's catalogue ([scroll talk examples][scroll-talk]) show the canonical pattern: **`position: sticky` figure on one column, prose steps on the other**; visual updates as steps cross a triggerline. NYT's "Snow Fall" (2012) defined the modern shape ([Maglr — 10 best scrollytelling][maglr-best]); FT/Bloomberg/Reuters use variants of the same sticky-figure idiom. Slide-decks (Flourish Stories, our existing `presentation.js` overlay) are click-driven and best for **shareable, lecture-style summaries**. Different jobs — we want both.

### 2.3 TikTok-style vertical feed for journalism — partially translatable

The 2025 SDSU paper ([SDSU — TikTok scrolling and study focus][sdsu]) and Tandfonline's *News on TikTok* ([Tandfonline][tandf]) confirm what's intuitive: TikTok-trained audiences expect (a) one stat per screen, (b) <5 s to grasp, (c) immediate visual hook, (d) tappable for "more". But the **same audience reports lower retention on long-form** and shifts attention away after 15-30 s. So the lesson for our pages is: **decompose the dossier into 5-10 atomic stat-screens per section, but never trap a 4 500-word reading task into a single mode of consumption.** If a reader wants to skim → vertical step-deck experience. If a reader wants to verify → expandable prose + sources fold (already built).

### 2.4 Click-on-image hotspots — inline SVG is the right primitive

`<map>`/`<area>` on `<img>` is technically still supported but accessibility-degraded; modern guides ([freeCodeCamp — clickable SVG map][fcc-svg], [W3C — SVG-AAM 1.0][svg-aam]) all converge on **inline `<svg>` with `<g role="img" aria-labelledby="…">` + `<title>` + per-region `<a tabindex="0">`** (or `<g tabindex="0">` if you only want a popover). Stears and BBC election interactives use exactly this pattern. For us, this is the right answer for: (a) "3 Vishnevskys" silhouettes, (b) Sankey-1432 (`partiya-dela`), (c) Sanction-regime matrix (`ldpr`), (d) the actor-bill matrix (`tsifrovoy-kontrol`).

### 2.5 Storytelling chart libs without new deps

We already load Chart.js. d3.js v7 is **modular** and CDN-friendly (`https://unpkg.com/d3-selection@3`, `d3-shape@3`, `d3-scale@4` — each <30 KB) ([D3 docs][d3]). My recommendation: **don't add d3 unless one specific chart needs it** (force-directed network for the actor-bill matrix is the only candidate I see; even then a hand-rolled SVG lays it out fine for 8-12 nodes). Inline SVG + CSS Grid + Chart.js cover ~95 % of the proposed catalogue.

### 2.6 Full-bleed vs centered max-width — answered in §6

Josh Comeau's `1fr min(65ch, 100%) 1fr` grid trick ([Comeau — full-bleed][comeau-full-bleed], [CSS-Tricks — full-bleed][csstr-full-bleed]) and Bryan Robinson's named-line subgrid pattern ([Robinson — subgrid stripes][robinson-stripes]) are the two clean ways to mix **65-80 ch reading column + occasional full-width visual stripe** without abandoning the existing `.wrap` containment. The right call for our redesign is **named-line article grid with three lanes (gutter / reading-column ~70ch / gutter)** so any visual can opt in to `grid-column: 1 / -1` for full-bleed.

### 2.7 Progressive disclosure — `<details>` for static, modal for cross-cutting

NN/g ([Progressive Disclosure][nng-disclosure]), IxDF ([What is progressive disclosure][ixdf]) and the FedMentor accessible-disclosure post ([accessible disclosure UI][fedmentor]) agree on the patterns: native `<details>/<summary>` for **inline expand-prose** (zero JS, screen-reader-friendly, browser-native focus); modal/lightbox for **cross-cutting reference** (a person, a law, a court case referenced from many places); side-drawer for **persistent secondary nav**. For our pages the right mix is:

- **Always-visible summary (40–80 words)** under each story-step's heading — never hidden.
- **`<details>` fold** beneath the step for the original 200-500 word prose — replaces today's wall-of-text.
- **Existing `modal.js`** for cross-page entities (a leader, a law) — already there.

### 2.8 Accessibility checklist (drawn from sources above)

- `prefers-reduced-motion: reduce` → kill snap, kill animation, keep static reveal. (CSS-Tricks — [prefers-reduced-motion][csstr-prm], [Scott O'Hara — reduced sticky][ohara].)
- **Keyboard:** arrow-up/down in presentation overlay, but **never overload arrow keys on the page itself** (default browser behaviour must work).
- **Screen reader:** every step is a `<section>` with `aria-labelledby`. Snap containers must not hide non-active slides via `display: none` (SR can't traverse them).
- **No-JS fallback:** every step's prose must remain in the DOM; reveal animations are CSS-only `:not(.is-visible)` opacity flips that armed-mode (`html.js`) toggles.

---

## 3. Three paradigms

For each: idea, pros/cons, effort, mobile, a11y, no-JS, and risk.

### 3.1 Paradigm 1 — Hard scroll-snap (TikTok-style)

**Concept.** Each section becomes a series of `100svh`-tall slides; the page itself uses `scroll-snap-type: y mandatory; scroll-snap-stop: always;`. One stat per slide. Vertical paging is the **only** way to read.

**Pros.**
- Closest to user's verbal request ("как презентация, только вертикально").
- Maximum cognitive offload: one fact at a time; nothing to scan-decide.
- Forces visual-first design (you literally cannot fit 500 words in 100svh).
- Easy to share specific slide via `#anchor`.

**Cons.**
- **Scrolljacking** — well-documented UX anti-pattern (NN/g, Robin Rendle, multiple 2024-2025 sources). Reading a 50-step dossier under mandatory snap is exhausting; flick gestures get eaten.
- **Conflicts with sticky TOC** (existing `.party-toc`): TOC needs to follow scroll; mandatory snap on `body` breaks that.
- **Modal/anchor links break** (when a `#sources-fold` opens inside a snapped section, browser autoscroll to it conflicts with snap container).
- **Long-form verification reading destroyed.** The site's whole positioning rests on "every claim has a source"; if `<details>` and source-folds become unreachable in the snap flow, that disappears.
- **Mobile address bar resize** flickers `100vh` → use `100svh`/`100dvh`; older mobile Safari needs `100svh` polyfill.
- **`prefers-reduced-motion`**: must drop snap; that means we have two completely different layouts (snap on / off).
- **Accessibility deeply suspicious.** Screen-readers can read snapped slides, but keyboard users (PgDn/Space) bounce slide-by-slide — fine for short decks, fatiguing for 30-50 slides.
- **No-JS fallback ok** (snap is CSS-only) but the "atomic stat per screen" splits make the no-JS reader scroll through 50 single-fact screens of mostly empty space.
- **20 dossiers × 5–10 slides per section × 6–8 sections** = 600-1 200 slides authored across the site. Big maintenance cost.

**Effort.** ~12-15 dev-days to retro-fit 20 pages: ~250 LOC CSS for slide layouts, ~100 LOC JS for no-JS fallback toggles, ~600 markup edits. **High risk, high effort.**

**Effect on "клиповый" reader.** Strong on the first 5-10 slides; collapses on slide 30 when there's still 4 sections to go. The format eats audience past ~60-second engagement.

### 3.2 Paradigm 2 — Soft scrollytelling (NYT/Pudding-style)

**Concept.** Page scroll behaves natively. Each section is a 3-column subgrid: **sticky figure column** (the chart/SVG/key visual), **steps column** (short prose / stat / quote, each ~40-80 words), **gutter**. As the reader scrolls past each step, the sticky figure animates/updates to match. Reveal animations are gentle opacity+translateY.

**Pros.**
- **Universally accepted by 2024-2026 UX literature.** Pudding, NYT, FT, NRK all use this idiom. ([Pudding sticky][pudding-sticky], [NRK case study][nrk-case].)
- **Reader keeps scroll control.** No fight with browser conventions.
- **Sticky TOC keeps working** unchanged.
- **Visual budget is concentrated** (one big figure per section instead of 5-10 micro-slides).
- **Existing `reveal.js`** does most of the work — `IntersectionObserver` with `threshold: 0.18` already in place.
- **`prefers-reduced-motion`** = collapse to static rendering. Trivially compatible.
- **No-JS fallback**: figure inlined, prose visible, reveal classes don't apply.
- **Mobile**: figure stacks above prose (sticky disabled <900 px); each step still reads.

**Cons.**
- **Requires building the sticky-figure infrastructure** for each section (CSS subgrid with one cell `position: sticky; top: 80px;`).
- Less radical departure from current look. User may feel we didn't go far enough.
- For sections without a single dominant visual (e.g. yabloko §F, four numbered limitations), sticky-figure pattern is awkward — must fall back to step-cards-in-column.
- **Doesn't satisfy the "presentation mode" verbal request directly** — must combine with paradigm 3.

**Effort.** ~10-12 dev-days for 20 pages: 8-10 new universal components (per §4), 1 grid-pattern restructure of `.party-sec`, 30+ instantiations.

**Effect on "клиповый" reader.** Steady — they can scan the visual, read 1-2 steps, scroll on. The visual remains visible while they read. Best retention curve of the three options.

### 3.3 Paradigm 3 — Hybrid: reading mode + opt-in presentation overlay

**Concept.** Page reads exactly as in **paradigm 2** by default. A floating "Презентация" button (already exists in `presentation.js` for `index.html`/`vybory.html`/`tsenzura.html`) opens a **fullscreen overlay** with hard scroll-snap inside the overlay only. The overlay relocates section nodes (the engine already does this — see `presentation.js:258 relocateInto()`). The user opts in. Esc returns to scroll position.

**Pros.**
- **Best of both worlds**: long-form readers get clean, scannable, screen-reader-friendly vertical scroll; "клиповая" audience hits "Презентация" and gets TikTok-feed UX.
- **Engineering cost is modest** because `presentation.js` is already 401 LOC, working, with keyboard, swipe, fullscreen, URL-sync, deep-link.
- **Per-page deck definition** is small: one `window.PresentSlides = […]` array per page, each entry pointing to existing DOM nodes.
- **Sticky TOC, modal, anchor links, sources fold** — all keep working untouched.
- **Mobile**: overlay covers full viewport, touch swipe already implemented (`presentation.js:326-345`).
- **`prefers-reduced-motion`**: already respected (`REDUCED` flag at line 47).
- **No-JS fallback**: button absent, page reads as paradigm 2.

**Cons.**
- Requires authoring two thin layers per page: (a) the soft-scrolly page itself, (b) a 6-12 entry deck array.
- Sections must produce **slide-friendly visual atoms** — i.e. we still have to build paradigm 2's components and decompose prose; no shortcut.
- Overlay deck is **one-way**: presentation user can't easily jump back into specific scroll position of the long page (we can fix with `?present=N` already implemented + a "view in context" link).

**Effort.** Reuses 80 % of paradigm 2 work + ~2 dev-days/page to author decks. Adds 1 day to wire decks across 20 pages.

**Effect on "клиповый" reader.** Hits "Презентация", gets 8-15 atomic stats with smooth keyboard/swipe nav, exits feeling like they "got it"; the long-form remains for verifiers.

### 3.4 Recommendation

**Paradigm 3 (hybrid) is the right answer.** It addresses every verbal request from the user:

| User ask | How paradigm 3 addresses it |
|---|---|
| «текста как можно меньше — вся информация в виде визуального контента» | Each section becomes (a) one big sticky visual + (b) 3-6 short prose-steps. Prose drops from 500 to 80 words per step. |
| «возможность развернуть доп. информацию» | Native `<details>` under each step holds the original prose; sources fold remains. |
| «режим презентации, листать вертикально» | Existing `presentation.js` overlay with vertical-only swipe; one slide = one stat-screen. |
| «когда листал чуть сильнее вниз — переходил на следующий блок» | Inside the overlay only: `scroll-snap-type: y proximity` on the stage element (not on body). Soft snap, not trap. |
| «нажать на любое место и посмотреть доп.инфу» | Hotspot pattern on key visuals (§7). Modal + tooltip already exist in `modal.js`/`tooltip.js`. |
| «full-bleed на весь экран — но не утверждение» | New named-line article grid permits full-bleed visuals (`grid-column: 1 / -1`) inside otherwise-centred reading column. See §6. |
| «всё максимально красиво, интерактивно» | `reveal.js` already animates; new components extend the existing aesthetic (Lora italic quotes, Unbounded section marks, JetBrains-Mono numerics). |

The other two paradigms aren't wrong — they're partial. Hard snap (P1) wins novelty but loses long-form. Soft scrollytelling alone (P2) doesn't satisfy the "режим презентации" verbal ask. Hybrid does both at modest extra cost.

---

## 4. Component inventory (15-25 renderers)

All components: vanilla JS, no new deps unless flagged. Conventions match existing ones (`window.renderXxx(rootEl, data, options?)`; Russian comments; mobile-first; respects `prefers-reduced-motion`). API columns use TypeScript-ish notation for clarity, but implementation is plain JS.

### Already built — extend or wrap

| ID | Name | Status | Pages | What we add |
|---|---|---|---|---|
| E1 | `renderLeaderGrid` (`components/leader-grid.js`) | ✅ Live in kprf | All 14 partii §C | **Hotspot upgrade**: clicking a card opens existing `modal.js` with full bio (currently inline prose). |
| E2 | `renderCaseGrid` (`components/case-grid.js`) | ✅ Live in kprf | KPRF F, LDPR F, SRZP F, partiya-rosta F, partiya-dela F, gr-init F, vneparlamentskie A-D, munitsipalnyy-filtr C | **Add `expanded` prop** for slide-mode (single 80vh card with full text, vs 3-card grid in reading mode). |
| E3 | `renderBudgetShare` (`components/budget-share.js`) | ✅ Live in kprf | All 14 partii §B + index aggregate | **Add hover/tap tooltips** showing absolute ₽ amount + year + source URL. |
| E4 | `renderLiquidationStrip` (`components/liquidation-strip.js`) | ✅ Live | vneparlamentskie, partiya-rosta, partiya-dela, gr-initsiativa | **Add `activeId` highlight + 2026 future markers** + clickable past events. |
| E5 | `renderTimelineVert` (`components/timeline-vert.js`) | ✅ Live | All sections G | **Add `dense` and `parallel-tracks` modes**. |
| E6 | `renderVoteBar` (`components/vote-bar.js`) | ✅ Live | All sections E | **Add `highlight` flag** + `hotspot` per fraction segment. |

### New — high-leverage universal

| ID | Name | API | LOC | Pages | Hotspots? | Deps |
|---|---|---|---|---|---|---|
| **N1** | `renderStorySteps(rootEl, steps, opts)` | `steps: [{id, anchor, body, fold?}]; opts: { stickyFig?: HTMLElement, layout: 'sticky'\|'cards'\|'feed' }` | M (~90) | All §A-§H of all 20 pages | yes (anchor click → step deep-link) | none |
| **N2** | `renderHotspotImage(rootEl, src, hotspots)` | `hotspots: [{x, y, label, body, links}]` — generic SVG-overlay clicker | M (~80) | spoylery (3 Vishnevskys), partiya-rosta D (Titov posts), tsifrovoy-kontrol D | core | none |
| **N3** | `renderElectoralTrajectory(rootEl, points, opts)` | `points: [{year, type, percent}]; opts: { thresholds: [3,5], events: [{year, label}] }` | M (~70) | yabloko A, ldpr A, gr-platforma A, partiya-rosta A, voennyy-byudzhet | hover dots → tooltip | Chart.js |
| **N4** | `renderSankey(rootEl, nodes, links, opts)` — minimal hand-rolled inline-SVG sankey | `nodes: [{id, label, value}]; links: [{source, target, value, label}]` | L (~140) | partiya-dela B (1432-budget→Ростсельмаш — already exists, refactor); rpss F (presidential 2024 candidates flow); novye-lyudi F (Партия Роста→НЛ merger) | each link clickable → modal with sources | none |
| **N5** | `renderActorBillMatrix(rootEl, actors, bills, votes)` | `actors: [{name, fraction, photo?}]; bills: [{date, fz, label}]; votes: matrix` | L (~120) | tsifrovoy-kontrol C (already exists; expand to hotspot), index P-idx-2 | yes — cell click → law modal | none |
| **N6** | `renderDecreeStrip(rootEl, decrees, activeId)` | `[{number, date, recipient, summary, source_url}]` | S (~40) | kprf D (6 awards Зюганова), ldpr D, srzp D, partiya-rosta D, mobilizatsiya | each pin → tooltip + source | none |
| **N7** | `renderDisambiguationCards(rootEl, entities)` | side-by-side "это разные люди/сущности" | S (~40) | gr-init C (two Nechaevs), zelenye C (3 entities), spoylery (3 Vishnevskys) | photo→modal | none |
| **N8** | `renderKeyFinding(rootEl, {quote, attribution, type})` — pull-quote callout | inline | S (~25) | gr-platforma F (line 256), kprf F, all sujety conclusions | — | none |
| **N9** | `renderFragmentationBar(rootEl, parties, opts)` — horizontal stacked bar with annotation | left-flank vote split visualisation | S (~50) | rpss F, pensionery F, kommunisty-rossii F, spoylery, index aggregate | each segment → hover tooltip | none |
| **N10** | `renderMergersTimeline(rootEl, waves)` | merger diagram, multi-input → single output, with curator | L (~120) | srzp A (3 waves), ldpr F (Родина 2021, Партия дела 2024), novye-lyudi F | each input/output → modal | none |
| **N11** | `renderTreemap(rootEl, data, opts)` — small inline-SVG treemap | for budget categories | M (~80) | voennyy-byudzhet B (32,5% оборона), kprf B (income split) | each rect → tooltip | optional `d3-hierarchy` (12 KB) |
| **N12** | `renderRadarChart(rootEl, axes, data)` — 4-6 axis radar | for "функции партии" multi-dim profile | M (~60) | gr-platforma F (4 axes: спойлер/инкубатор/лобби/чиновник), pensionery F, partiya-rosta F | hover axis → tooltip | Chart.js radar already in package |
| **N13** | `renderParallelTimeline(rootEl, tracks)` | two parallel timelines (e.g. Луговой biography ↔ FZ-255 evolution) | M (~80) | ldpr E, tsifrovoy-kontrol C (Луговой ↔ FZ-255), yabloko crisis | event click → tooltip | none |
| **N14** | `renderWaffle(rootEl, data, opts)` — 100/1000-cell waffle | extends existing `assets/js/charts/waffle.js` | S (~40 to extend) | mobilizatsiya (300 000 призваны), index hero, munitsipalnyy-filtr (218 000 муниц-депутатов) | hover cell-cluster → tooltip | none |
| **N15** | `renderBeforeAfter(rootEl, before, after, label)` — 2-column compare card | for "до/после" facts (Бабкин в ЛДПР: 0% → 87% бюджета 1432; Прохоров до/после 2015) | S (~30) | partiya-dela F, gr-platforma A, novye-lyudi C | — | none |
| **N16** | `renderInstitutionalIntegrationGrid(rootEl, parties, dimensions)` — grid showing which parties have госдолжность/ОНФ/Орден/госконтракты | yes-no/score grid | M (~70) | yabloko D (the "what 5 parties have, Yabloko doesn't"), srzp D | cell → modal | none |
| **N17** | `renderHeatmap(rootEl, rows, cols, values, opts)` — generic heatmap (5 fractions × N laws) | extends `charts/heatmap.js` | reuse | er E, srzp H (sanction-matrix), ldpr D (sanctions) | yes — cell → law modal | reuse |

### Slide-mode-specific

| ID | Name | API | LOC | Purpose |
|---|---|---|---|---|
| **N18** | `renderAnchorStat(rootEl, {value, label, accent})` — single big number with caption, fills 80svh | inline; used in presentation overlay slides | S (~30) | universal slide template — used by all decks |
| **N19** | `renderQuoteSlide(rootEl, {quote, attribution, source})` — Lora italic full-bleed quote | inline | S (~20) | crisis quotes, leader statements |
| **N20** | `renderSourceFold` (already exists) — wrap into a slide-friendly mini view (last slide of every deck = "сноски") | — | reuse | every page deck |

### Total

- **Existing reusable**: 6 (E1-E6).
- **New**: 17 (N1-N20, with three flexible).
- **API conventions match existing pattern** (`window.renderXxx`, single rootEl, plain JSON data).
- **Total new LOC**: ~1 100 JS + ~300 CSS (estimate; spread across 17 files).
- **Coverage check**: walking the 20 pages section-by-section against this list, **>80 % of body prose has a target component**. The remaining ≤20 % is intrinsically narrative (e.g. interpretive paragraphs in §F that are the analytical core) — those become 80-word steps with `<details>` folds.

---

## 5. Per-page proposals — top 5 «портяночных»

Detail format: H = always-visible 40-80-word hero summary; **steps** = the page's story-blocks (each = one mini-section in reading mode + one slide in presentation deck); **fold** = what stays in `<details>`/sources-fold.

### 5.1 `partii/yabloko.html` (4 585 wpv — №1 portyanka)

Pilot candidate per `2026-05-05-comprehensive-review.md` §S-3.

| Section | Step (≤ 80 words always-visible) | Visual (component) | Fold contents |
|---|---|---|---|
| Hero | "1 из 14: антивоенное заявление 24.02.2022. 1,34% на ГД-2021. 11+ иноагентов. Шлосберг — СИЗО 12.2025." | 4 anchor-stats grid (existing) + N18 first slide | full hero paragraph |
| A | "1993: блок Я-Б-Л → 7,86% → 27 депутатов в ГД-I. Сегодня — 0 мандатов с 2007 г." | **N3 electoral trajectory 1993-2021** with 3% / 5% threshold lines | 4 paragraphs of registration history |
| B | "0% бюджета с 2016 г. Доходы — 189 млн ₽ (×47 меньше ЕР, ×9 меньше КПРФ)." | **E3 budget-share 6 partii** + comparison sentinel | corporate donor analysis |
| C | "11+ членов в реестре иноагентов. Шлосберг — СИЗО Пскова с 12.2025 по ч. 2 ст. 207.3 УК (до 10 лет)." | **E1 leader-grid with hotspots** (5-8 cards: Рыбаков, Явлинский, Шлосберг, Вишневский, Круглов, Слабунова, Митрохин, Резник). Click → modal with full bio + sources. | individual paragraphs become modal bodies |
| D | "Структурная отдалённость + одна точечная встреча: Явлинский ↔ Путин 25-26.10.2023." | **N16 institutional-integration grid** (5×6: должность/ОНФ/Орден/контракт/декрет/совет) | встреча 2023 hedged interpretation |
| E | "0 мандатов в Думе → поведенческий тест в регионалках: ЗС СПб (4 деп.), ЗС Карелия, МГД, Псков." | **Region-pin map** (custom small SVG) + **N6 decree-strip** of repressive actions | regional voting examples |
| F | "Не вписывается в модель управляемой оппозиции — но 4 ограничения автономии." | **4-card grid** (E2 case-grid, but for "ограничения") with 4 fixed icons | each ограничение has full prose in fold |
| G | "24.02.2022: единственное институциональное антивоенное заявление зарегистрированной партии в РФ." | **E5 timeline-vert** (already implemented) + **N19 quote slide** for FPK declaration | full chronology |
| H | "14 фондов проверено · 0 совпадений. Liberal International 1998-2002. ALDE 2006-2025." | **14×1 pill-grid** (universal "checkpoint" matrix, derived from N16) | foreign-funds analysis |

Reading-mode flow: 8 sections × ~3 steps avg = ~25 reading steps. Each step ≤80 words visible + `<details>` fold for the original 200-500 word prose. Total visible text drops from 4 585 to ~2 000 words; another ~2 500 sit behind folds.

Presentation deck: ~12 slides (one per atomic stat: 0%, 11+, СИЗО, 1,34%, 24.02.2022, встреча 2023, etc.).

### 5.2 `partii/grazhdanskaya-platforma.html` (4 139 wpv — №2)

| Section | Step | Visual | Fold |
|---|---|---|---|
| Hero | "Партия Прохорова, 2012. Прохоров вышел в 03.2015. С тех пор — 'спящий' режим: 0,15% на ГД-2021, 1 одномандатник Шайхутдинов." | 4-anchor stat grid | full hero paragraph |
| A | "2012: учредительный съезд → 2013: пик (Ройзман — мэр Екатеринбурга) → 03.2015: Прохоров уходит → 2016+: спящий." | **N15 before/after card** «Прохоров 2012-2015 vs after» + mini timeline | full origin paragraphs |
| B | "0% бюджета — никогда. Финансировался Прохоровым лично. После 2015 г. — минимально." | **E3 budget-share** + **N15 before/after** «активный 2012-2014 vs спящий 2016+» | donor analysis |
| C | "Прохоров (2012-2015) → Шайхутдинов (один одномандатник, с 2016)." | **N7 disambiguation cards** (Прохоров vs Шайхутдинов: профиль/фото/функция) | bios |
| D | "18-округов гипотеза («Коммерсантъ» 2016): ЕР не выставляла кандидатов в 18 округах; Шайхутдинов — в одном." | **N2 hotspot map** (RU regions, 18 hilighted) | full hypothesis text |
| E | "Голосования в Думе: VIII созыв — 1 одномандатник, во фракцию большинства." | **E6 vote-bar single-row** (Шайхутдинов × 8 ключевых ФЗ) | per-vote analysis |
| F | "Активность опасна для малой партии — спящий режим безопасен." | **N8 key-finding pull-quote** + **N12 radar chart** (4 axes: спойлер/инкубатор/лобби/чиновник) | analytical interpretation |
| H | "Ничего значимого не выявлено в зарубежных грантовых базах." | small "0 hits across 14 funds" pill grid | foreign-funds analysis |

### 5.3 `partii/partiya-dela.html` (4 062 wpv — №3)

The single most-data-rich page in the batch (Sankey 1432 already exists inline as static SVG).

| Section | Step | Visual | Fold |
|---|---|---|---|
| Hero | "Партия Бабкина (2010). Программа 1432 — 78% субсидий на «Ростсельмаш»+«ПТЗ». 27.11.2024 — ВС РФ ликвидировал." | anchor-stats | full lead |
| A | "2010: учреждение → 2024: ликвидация. 14 лет институционализации программы 1432 в АПК." | **N3 electoral trajectory** + **E4 liquidation-strip** | origin |
| B | "Финансирование 2010-2024: пиковая фаза 2014-2018 после старта 1432." | **E3 budget-share** + chart of party income vs subsidy years | financial details |
| C | "Бабкин — основатель, гендир «Ростсельмаш», глава «Партии дела»; ИНН 6166019871." | **E1 leader-grid** | bio |
| D | "Программа 1432: ФЗ от 2014 г. — 78% субсидий уходят 2 предприятиям, контролируемым Бабкиным." | **N4 Sankey 1432-budget → Ростсельмаш+ПТЗ** (already exists; refactor to renderer + add hotspots) | mechanism prose |
| E | "Голосования в Думе: партия не имела фракции; депутаты-одномандатники голосуют через ЛДПР." | **E6 vote-bar + N15 before/after** «Бабкин в ЛДПР: 0% → 87% бюджета 1432» | analysis |
| F | "5-instrument ecosystem: Ростсельмаш / Росспецмаш / Новое содружество / МЭФ / Партия Дела." | **N2 hotspot pentagon** with Бабкин at centre, 5 institutional instruments at vertices | each instrument has full prose |
| G | "27.11.2024: ВС РФ ликвидировал партию. Бабкин остался на постах в АПК." | **E4 liquidation-strip** with active highlight + **N15 before/after** | court documents |
| H | "Buhler (Канада) → 2007 в собственности «Ростсельмаш» → 2023 продан турецкой Basak Traktör 96,7%." | **N1 story-steps** with 4-step flow | full ownership history |

### 5.4 `partii/partiya-rosta.html` (3 460 wpv — №4)

| Section | Step | Visual | Fold |
|---|---|---|---|
| Hero | "Партия Титова (2016). 0,76% на 2018. 20.11.2025 — ВС РФ ликвидировал." | anchor-stats | hero |
| A | "Правое дело (2008) → Партия Роста (2016) → ликвидация (2025). Параллельно Титов — на госдолжностях." | **N10 mergers-timeline** + **N3 electoral trajectory** | origin |
| B | "ГК «Абрау-Дюрсо» Титова: ≈58% доходов через бизнес лидера. Бюджетного финансирования партия не получала." | **E3 budget-share + N15 before/after** | financial |
| C | "Б. Ю. Титов: омбудсмен 2012-2022 (Указ № 879), спецпредставитель Президента с 2023 (Указ № 299/2024). 4 года 'между' — нет." | **N6 decree-strip** with 2 awards + **E1 leader-grid** | full bio |
| D | "Лоббистский профиль: партия + омбудсмен + бизнес-объединение «Деловая Россия» + Абрау-Дюрсо." | **N2 hotspot infographic** of 4-vector lobbying | analysis |
| E | "Не голосовала по факту отсутствия фракции; одномандатники голосовали в ЕР." | text + simple stat box | full analysis |
| F | "20.11.2025: ВС РФ ликвидировал. 'Организационная оптимизация'. Параллельно — Партия дела (2024) и Гр. Инициатива (2025)." | **E4 liquidation-strip with activeId** + **E2 case-grid (3 ликвидации)** | court details |
| H | "Без значимых задокументированных зарубежных связей." | mini "0 hits" pill grid | analysis |

### 5.5 `partii/kommunisty-rossii.html` (3 654 wpv — №5)

| Section | Step | Visual | Fold |
|---|---|---|---|
| Hero | "Откол от КПРФ. Зарегистрирована 07.06.2012. Самый успешный спойлер: 1,27% на ГД-2021. Памфилова: 'позорище'." | anchor-stats | hero |
| A | "07.06.2012: создана за 5 месяцев — рекорд скорости регистрации. Параллельно ПАРНАС регистрировался 7+ лет." | **N3 registration-speed bar**: КПКР vs ПАРНАС vs Партия Прогресса | origin |
| B | "0% бюджета (порог 3% не пройден). Корпоративных доноров — нет." | **E3 budget-share + N15 before/after** | analysis |
| C | "Сурайкин — учредитель и многолетний председатель. 03.2022 заменён административно." | **E1 leader-grid + N15 before/after** Сурайкин removal | bio |
| D | "Декорация плюрализма для левого фланга." | **N12 radar chart** (4 axes: спойлер/идеологический клон/админ ресурс/...) | analysis |
| E | "В Думе нет фракции; 1 одномандатник." | text | analysis |
| F | "5-уровневая технология двойников: имя/идеология/именные двойники/МГД-2019/админ замена 03.2022. + 7 округов с двойниками-Биллами." | **5-card grid (E2 case-grid)** + **expanded именные-двойники table (7 rows, currently 3+placeholder)** | full case-by-case prose |

---

## 6. Layout — full-bleed vs centered

**Recommendation: keep `.wrap` as the **default reading container** (max-width 1200px) but introduce a **named-line article grid** under it, so individual visuals can opt into full-bleed without rebuilding the whole page.**

### 6.1 Why not pure full-bleed everywhere

The page is 50/50 prose-and-visual. Long-form Russian prose at 16-18 px font + 1.6 line-height needs **65-80 ch line length** to stay comfortable ([Comeau][comeau-full-bleed], [Robinson][robinson-stripes]). On a 1920 px monitor, 65 ch ≈ 720 px; if we let prose run full-bleed, line length becomes 1700+ px and the page becomes physically painful to read. NYT/FT keep prose in a 12-14-column grid even when figures break out.

### 6.2 The grid recipe

Replace `.party-page-layout` two-column TOC+content with a **3-track CSS grid**:

```css
.party-page-layout {
  display: grid;
  grid-template-columns:
    [full-start] minmax(1rem, 1fr)
    [toc-start] minmax(0, 200px)
    [toc-end content-start] min(70ch, 100% - 2rem)
    [content-end] minmax(1rem, 1fr)
    [full-end];
  column-gap: 32px;
  row-gap: 0;
}
.party-toc        { grid-column: toc-start / toc-end; }
.party-sec        { grid-column: content-start / content-end; }
.party-sec.is-full { grid-column: full-start / full-end; }
.figure-bleed     { grid-column: full-start / full-end; }
.figure-wide      { grid-column: toc-start / content-end; } /* skips just outer gutter */
```

This gives:
- **Default**: TOC + 70ch reading column with comfortable gutters.
- **Wide visual**: skips outer gutter only (e.g. comparison-bars across full content area).
- **Full-bleed visual**: stretches the entire viewport (e.g. the 1432-Sankey, the regional pin-map, hero anchor-stats).
- **Below 900 px**: TOC collapses, single column, full-bleed is "100% width" — natural mobile.

### 6.3 What goes full-bleed

- Hero anchor-stats (already wide).
- Story-step "anchor stat" slides (when used as section openers).
- Sticky figures during scrollytelling sections (as the figure column may be wider than reading column).
- The Sankey on `partiya-dela.html`.
- Regional pin-maps (yabloko E, gr-platforma D, munitsipalnyy-filtr A).
- Inside the presentation overlay — every slide is full-bleed by definition.

### 6.4 What stays centered

- All long-form prose body.
- Sources fold.
- Card grids of 3+ cards (they self-shrink).
- Vote-bars (current chrome at 130/1fr/80 columns is already mobile-safe with the partii.css update at line 190-205).

This is the same idea Bryan Robinson articulates ([subgrid stripes][robinson-stripes]) — named lines + subgrid, which is fine for our 2024+ browser baseline.

---

## 7. Hotspot / click-on-image pattern

### 7.1 Primitive: inline SVG with grouped clickable regions

Per [W3C SVG-AAM 1.0][svg-aam] and current 2025 inline-SVG accessibility guides:

```html
<figure class="hotspot-fig" role="img" aria-labelledby="map-title map-desc">
  <svg viewBox="0 0 1200 600">
    <title id="map-title">Лоббистский профиль Б. Ю. Титова</title>
    <desc id="map-desc">Четыре института, в которых Титов одновременно занимал пост.</desc>
    <g class="hotspot" tabindex="0" role="button"
       aria-label="Указ № 879 от 22.06.2012 — Титов назначен бизнес-омбудсменом"
       data-modal="decree-879">
      <circle cx="200" cy="200" r="40" fill="var(--accent)"/>
      <text x="200" y="205" text-anchor="middle">22.06.2012</text>
    </g>
    <!-- … more groups … -->
  </svg>
</figure>
```

JS layer (~30 LOC, plain `addEventListener`):

```js
document.querySelectorAll('.hotspot-fig .hotspot').forEach(el => {
  el.addEventListener('click', () => openModal(el.dataset.modal));
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(el.dataset.modal); }
  });
});
```

`openModal()` reuses existing `assets/js/lib/modal.js` (with focus trap, Esc, inert background).

### 7.2 Tooltip-on-hover for non-modal cases

For cases where a 1-line tooltip suffices (e.g. budget-share bar tooltip showing absolute ₽ amount), use existing `assets/js/lib/tooltip.js`. Pattern:

```html
<g class="hotspot" data-tip="Орден Дружбы — 2014" tabindex="0" role="button" aria-label="Орден Дружбы 2014">…</g>
```

`tooltip.js` already handles hover, focus, Esc, mobile-tap.

### 7.3 Image-map alternative

`<map>`/`<area>` works on raster PNGs but degrades on screen readers (hit-region only, no `<title>`). **Avoid** unless the source is genuinely a photograph (no candidate among our viz proposals).

### 7.4 Where hotspots earn their cost

| Page | Visual | Hotspot purpose |
|---|---|---|
| spoylery | "3 Vishnevskys" silhouettes (N7) | each silhouette → bio modal |
| partiya-dela D | Sankey 1432 (N4) | each link/node → law/recipient modal |
| partiya-rosta D | 4-vector lobbying infographic (N2) | each vector → respective decree/post modal |
| tsifrovoy-kontrol C | Actor-bill matrix (N5) | each cell → vote modal (existing law-modal) |
| ldpr D | Sanction-regime matrix | each cell → which sanction, when, by whom |
| yabloko C | Leader-grid (E1) | each leader → bio modal |
| All sections | timeline-vert (E5) | each event dot → contextual mini-modal |

### 7.5 Mobile considerations

Touch targets ≥ 44 px (WCAG AAA). For SVG hotspots, set the clickable region's `r` (or `width`/`height`) to satisfy 44 px **on the rendered viewport**, not in viewBox units. Practically: a `<circle r="22">` on a 600 px-wide SVG that displays at 360 px = 13 px hit region, fail. Use `pointer-events: bounding-box;` on `<g>` and an invisible `<rect>` 44×44 inside.

---

## 8. Progressive disclosure pattern

### 8.1 Three layers per section

```
[Section heading + 1-line subhead]
  ↓
[Always-visible 40-80-word summary] ← never hidden
  ↓
[Visual]
  ↓
[<details><summary>Подробнее (~400 слов)</summary>
   ←  full original prose lives here, paragraph-as-paragraph
 </details>]
  ↓
[Sources fold (existing)]
```

### 8.2 Why native `<details>`

- **Zero JS** — works without any of our scripts loaded.
- **Native a11y** — Chrome/Safari/Firefox all expose `<details>` as a disclosure with proper `aria-expanded` state.
- **Works in print** — most browsers print expanded by default; we add `details { @media print { open: true; } }`.
- **Anchor-friendly** — `<details>` opens automatically when a `#fragment` lands inside it.
- **Existing** — `sources-fold` is already a (heavier) variant of this idiom.

### 8.3 Why not pure modal-everywhere

Modal-everywhere works for cross-cutting entities (a person referenced from 5 pages → one modal source of truth). **But** for a 200-word prose paragraph that's only relevant to the section it sits in, a modal is context-loss: reader closes modal, has to re-find scroll position. `<details>` keeps the reader in place.

### 8.4 Side-panel — when

For the `partii/<slug>.html` pages, a fixed right-side panel showing **persistent context** (e.g. "Вы читаете партию №3 из 14 · Раздел C · 5 мин до конца") could complement the existing TOC. **Not recommended for this iteration** — adds 200 LOC of new chrome and the existing `.party-toc` already fills that role on desktop.

### 8.5 Lightbox for visuals

For full-bleed visuals (Sankey, region-map, regional grids), a "view fullscreen" affordance is worth ≤30 LOC. Pattern: button on the figure → `requestFullscreen()` on the `<svg>` element directly. Already wired in `presentation.js`'s F-key handler — generalise.

---

## 9. Accessibility & reduced-motion checklist

Things every component built for this redesign must do:

1. **`prefers-reduced-motion: reduce`**: kill all `transform`/`opacity` transitions, kill scroll-snap, kill auto-play of any kind. Existing `assets/css/base.css` already has the global media query — extend per component.
2. **Keyboard navigation**: every clickable hotspot has `tabindex="0"`, responds to Enter/Space, has `aria-label` (or `aria-labelledby` to a `<title>`).
3. **Focus-visible**: all interactive SVG elements get a 2-px solid focus ring (matches existing `.focus-visible` pattern in `base.css`).
4. **Screen reader semantics**: `<svg>` figures get `role="img"` + `<title>` + `<desc>` (or `aria-labelledby`/`aria-describedby` pointing at adjacent text).
5. **No-JS fallback**: every story-step, every fold, every hotspot must have prose-equivalent content reachable without JS. Test with `<noscript>` body or by setting `html.no-js`.
6. **Print**: `@media print { .story-step { all: revert; } details { open: true; } .figure-bleed { width: 100%; } }`. Sticky figures unstick. Hotspots become flat images.
7. **Mobile <380 px**: every component must remain usable. Vote-bar's existing breakage at 320 px (`partii.css:190-205`, flagged in review §3.4) gets fixed in same sprint.
8. **Touch targets**: min 44×44 px (WCAG AAA) on all clickable SVG groups.
9. **Don't trap scroll**: never use `scroll-snap-type: y mandatory` outside the presentation overlay. Inside the overlay, prefer `proximity` over `mandatory`.
10. **Respect TOC**: scroll-spy (`scroll-spy.js`) must keep working. Story-steps stay inside `<section data-toc-id>` containers; the IO observer continues to fire correctly.
11. **`<details>` with `id`**: anchor links from sources fold or modal must auto-open the `<details>` containing the target. CSS hint: `details:target { open: true; }` or JS: `if (location.hash) { document.querySelector(location.hash)?.closest('details')?.setAttribute('open','') }`.
12. **Language**: `<svg>` `<title>` text in Russian; English quotations wrapped in `<span lang="en">` (currently broken at `ldpr.html:174`).

---

## 10. Risks and trade-offs

1. **Authoring cost.** 20 pages × ~25-step decomposition = 500 atomic steps to author. Even at 5 minutes per step that's 40 hours of writing alone. Mitigation: existing prose maps cleanly to steps via `<details>` — most steps are "first sentence of existing paragraph as visible, rest in fold". Initial automation: a CSV of (page, section, sentence-1, paragraph-2-N) generated via Python-BS4 from current HTML; reviewer signs off → injected as story-step markup. Probably 8-12 hours of upfront tooling saves 30+ hours of manual.
2. **Two presentation surfaces double the QA matrix.** Reading mode + presentation overlay × 20 pages × mobile/desktop × prefers-reduced-motion × no-JS = 320 visible states. Mitigation: build a presentation deck for one page (yabloko) end-to-end, validate all matrix dimensions, then template for the other 19. Existing `presentation.js` already handles 80 % of matrix dimensions.
3. **TikTok audience may bounce on the overlay too.** SDSU 2025 study suggests TikTok-trained attention spans aren't long enough even for 12-slide deck. Mitigation: keep slide count ≤ 12 per page; use anchor-stats heavily; add **share-this-slide** affordance (already wired via `?present=N` URL param).
4. **`<details>` doesn't give us animation grace.** When a reader expands, content appears instantly without animation. Some users find this jarring. Mitigation: 4 lines of CSS — `details[open] > *:not(summary) { animation: fade-in .3s ease; }` (respecting `prefers-reduced-motion`). 5-min effort, measurable polish.
5. **SEO risk if visible word count drops.** Search engines see the same total prose (just in folds). But search engines do penalize content visibly hidden behind interaction in some heuristics. Mitigation: every step's always-visible 40-80 words preserves the topic signals; the entire prose remains in DOM (`<details>` doesn't hide content from crawlers in 2024+). Net SEO impact: neutral to slightly positive (better engagement metrics).
6. **Authoring Russian step summaries is hard.** 40-80 words is a tighter constraint than journalists are used to. Mitigation: I'd recommend a dedicated content-pass after engineering scaffolding lands; the current tone is "спокойный аналитический" and the short-form summaries must preserve that, not become headline-style.
7. **Component proliferation.** 17 new renderers is a lot. Mitigation: be ruthless about consolidation — N6/N9/N16/N17 are all "rectangular grid of pills with status" with different data shapes; one renderer with options is plausible. Implementation discipline: prototype on yabloko + partiya-dela, freeze API, then expand.

---

## 11. Open questions for brainstorm-phase

1. **Global slide budget per page.** I've sketched 12-15 slides per page in the presentation deck. Is that the right ballpark, or do you want *much* fewer (5-8) for "true TikTok"-style? More slides = more data per page but lower per-slide weight; fewer = each slide harder-hitting but loses some claims.
2. **Hard snap inside presentation overlay vs proximity snap.** I've recommended `proximity` per accessibility literature. But "переходил на следующий блок" in your verbal request reads more like `mandatory + scroll-snap-stop: always`. If you're firm on the hard-snap feel, we can do it inside the overlay only. I'd want to demo both and let you compare.
3. **Default landing experience.** When the reader first arrives at `partii/yabloko.html`, do they (a) see the redesigned reading mode and have to discover the "Презентация" button, (b) get an intro pop-up offering "Прочитать полностью / Посмотреть как презентацию", (c) auto-launch presentation if first-time visitor?
4. **Mobile presentation default.** On mobile <600 px, should the presentation overlay open automatically (since reading mode is already vertical-stacked one-column)? Or keep the explicit button?
5. **Sections that resist visual decomposition.** Sections like §F (управляемая оппозиция) are intrinsically interpretive — a list of 4-5 "ограничений автономии" is the visual. Are you OK with 4-card grids being the "visual" of a section, or do you want a single hero figure? My answer: 4-card grid IS a visual, that's fine — but checking.
6. **TOC behaviour.** Sticky-TOC currently desktop-only ≥1080 px. In presentation mode, do dots/counter substitute for TOC? Or keep both visible during the transition between modes?
7. **Sources fold treatment.** Today every section has a `sources-fold` at the bottom. In presentation mode, should the very last slide of each section be "Источники раздела X" (auto-collected), or do we drop sources entirely from the deck and rely on "Open in reading mode" link?
8. **Lang switch.** The site has `/en/` mirror; how does presentation overlay localise? `presentation.js` already has `LANG` detection and `I18N` block — but the per-page `window.PresentSlides` array is content; we'd need decks in both languages. Do we ship RU first and EN later?
9. **Hotspot density.** On a Sankey or actor-bill matrix, is **every** node clickable, or only "significant" ones? Density-aware design says ≤7 hotspots per visual; some of our visuals have 20+ atomic atoms.
10. **Pilot scope.** I've recommended yabloko as pilot per the comprehensive review. Alternatives: (a) `partiya-dela` (most data-rich, biggest visual budget) — best for showing off; (b) `mobilizatsiya` (sujet, cleanest single-event story) — fastest to ship; (c) `kommunisty-rossii` (most table-heavy, simplest to refactor) — lowest risk. I'd argue yabloko remains the right answer but want your call.

---

## Sources

- [MDN — `scroll-snap-type`][mdn-snap-type]
- [MDN — `scroll-snap-stop`][mdn-snap-stop]
- [MDN — Basic concepts of scroll snap][mdn-snap]
- [CSS-Tricks — Practical CSS Scroll Snapping][css-tricks-snap]
- [CSS-Tricks — `scroll-snap-stop`][csstr-snap-stop]
- [Lovable — Scrolling Designs: 8 Patterns and When to Use Each (2026)][lovable-scrolling]
- [Pudding — Easier scrollytelling with `position: sticky`][pudding-sticky]
- [Vallandingham — Data Visualization Scrolling Examples][scroll-talk]
- [Pudding — How to implement scrollytelling with six different libraries][pudding-six-libs]
- [Maglr — 10 best scrollytelling examples to inspire your 2026 content][maglr-best]
- [Storybench — Scrollytelling innovation: NYT journalists on climate][storybench-nyt]
- [Webflow — Scrollytelling guide][webflow-scrolly]
- [Chrome dev — How NRK uses scroll-driven animations to bring stories to life][nrk-case]
- [NN/g — Scrolljacking 101][nng-scrolljack]
- [Robin Rendle — Scrolljacking][rendle-scrolljack]
- [WebDesignerDepot — How Scrolljacking Breaks UX Fundamentals][wdd-scrolljack]
- [Tandfonline — News on TikTok Through the Lens of Quality Journalism (2025)][tandf]
- [SDSU — TikTok scrolling and study focus (2025)][sdsu]
- [Press Gazette — How TikTok inspired NYT's vertical video strategy][pressgazette-nyt]
- [freeCodeCamp — How to Make a Clickable SVG Map With HTML and CSS][fcc-svg]
- [Bomberbot — How to Create Interactive SVG Maps][bomberbot-svg]
- [W3C — SVG Accessibility API Mappings 1.0][svg-aam]
- [NN/g — Progressive Disclosure][nng-disclosure]
- [Interaction Design Foundation — What is Progressive Disclosure (2026)][ixdf]
- [LogRocket — Progressive disclosure in UX design (2025)][logrocket-pd]
- [Lollypop — The Power of Progressive Disclosure (May 2025)][lollypop-pd]
- [FedMentor — Let's build an accessible disclosure (show/hide accordion)][fedmentor]
- [GitLab Pajamas — Progressive disclosure pattern][gitlab-pd]
- [Josh W. Comeau — CSS Grid full-bleed layout tutorial][comeau-full-bleed]
- [CSS-Tricks — Full Bleed][csstr-full-bleed]
- [Bryan Robinson — Use CSS Subgrid for full-width content stripes][robinson-stripes]
- [Ryan Mulligan — Layout Breakouts with CSS Grid][mulligan-breakouts]
- [CSS-Tricks — `prefers-reduced-motion`][csstr-prm]
- [Scott O'Hara — Reduced Position Sticky][ohara]
- [UI Deploy — Complete Scrollytelling Guide (2025)][uidep-scrolly]
- [DigitalA11Y — Infinite Scroll & Accessibility][digitala11y]
- [Greenlit — Scrolljacking: The Good, The Bad, and The Ugly][greenlit]
- [D3 v7 on unpkg][d3]

[mdn-snap-type]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-type
[mdn-snap-stop]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-stop
[mdn-snap]: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap/Basic_concepts
[css-tricks-snap]: https://css-tricks.com/practical-css-scroll-snapping/
[csstr-snap-stop]: https://css-tricks.com/almanac/properties/s/scroll-snap-stop/
[lovable-scrolling]: https://lovable.dev/guides/scrolling-designs-patterns-when-to-use
[pudding-sticky]: https://pudding.cool/process/scrollytelling-sticky/
[scroll-talk]: https://vallandingham.me/scroll_talk/examples/
[pudding-six-libs]: https://pudding.cool/process/how-to-implement-scrollytelling/
[maglr-best]: https://www.maglr.com/blog/best-scrollytelling-examples
[storybench-nyt]: https://www.storybench.org/scrollytelling-innovation-new-york-times-journalists-on-climate-change-visualization-and-intense-teamwork/
[webflow-scrolly]: https://webflow.com/blog/scrollytelling-guide
[nrk-case]: https://developer.chrome.com/blog/nrk-casestudy
[nng-scrolljack]: https://www.nngroup.com/articles/scrolljacking-101/
[rendle-scrolljack]: https://robinrendle.com/notes/scrolljacking/
[wdd-scrolljack]: https://webdesignerdepot.com/how-scrolljacking-breaks-ux-fundamentals/
[tandf]: https://www.tandfonline.com/doi/full/10.1080/1461670X.2025.2559020
[sdsu]: https://www.sdsu.edu/news/2025/08/sdsu-study-links-tiktok-scrolling-to-poor-study-focus
[pressgazette-nyt]: https://pressgazette.co.uk/publishers/broadcast/how-tiktok-inspired-the-new-york-times-vertical-video-strategy/
[fcc-svg]: https://www.freecodecamp.org/news/how-to-make-clickable-svg-map-html-css/
[bomberbot-svg]: https://www.bomberbot.com/svg/how-to-create-interactive-svg-maps-a-developers-guide/
[svg-aam]: https://www.w3.org/TR/svg-aam-1.0/
[nng-disclosure]: https://www.nngroup.com/articles/progressive-disclosure/
[ixdf]: https://ixdf.org/literature/topics/progressive-disclosure
[logrocket-pd]: https://blog.logrocket.com/ux-design/progressive-disclosure-ux-types-use-cases/
[lollypop-pd]: https://lollypop.design/blog/2025/may/progressive-disclosure/
[fedmentor]: https://fedmentor.dev/posts/disclosure-ui/
[gitlab-pd]: https://design.gitlab.com/patterns/progressive-disclosure/
[comeau-full-bleed]: https://www.joshwcomeau.com/css/full-bleed/
[csstr-full-bleed]: https://css-tricks.com/full-bleed/
[robinson-stripes]: https://bryanlrobinson.com/blog/use-css-subgrid-laying-out-full-width-article-stripes/
[mulligan-breakouts]: https://ryanmulligan.dev/blog/layout-breakouts/
[csstr-prm]: https://css-tricks.com/almanac/rules/m/media/prefers-reduced-motion/
[ohara]: https://www.scottohara.me/note/2019/03/27/reduced-sticky.html
[uidep-scrolly]: https://ui-deploy.com/blog/complete-scrollytelling-guide-how-to-create-interactive-web-narratives-2025
[digitala11y]: https://www.digitala11y.com/infinite-scroll-accessibility-is-it-any-good/
[greenlit]: https://greenlitcontent.com/marketing/scrolljacking-the-good-the-bad-and-the-ugly
[d3]: https://unpkg.com/d3/

---

*End of research. ~1 280 lines.*
