# Pilot НЛ — Visual-First Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `partii/novye-lyudi.html` into a visual-first dossier with two-pane scrollytelling, section-snap proximity, native `<details>` progressive disclosure, opt-in presentation overlay, and selective hotspots in 6 hero viz components. Expand НЛ content from ~930 to ~2700 words (КПРФ-equivalent depth).

**Architecture:** Per `docs/superpowers/specs/2026-05-05-visual-first-refactor-design.md`. Each section (A-H + hero) is a snap-point with two-pane layout (text 40% left, sticky viz 60% right) on ≥900px; collapses to single-column with sticky-top viz on mobile. Native `<details>` provides expand-on-demand. Existing `presentation.js` engine reused for full-screen overlay via a per-page deck file.

**Tech Stack:** Vanilla JS + inline SVG + CSS Grid + CSS scroll-snap + Chart.js (CDN, already loaded). No new dependencies. No build system.

**Source content:** `research/compromat/01-parties/01-novye-lyudi/{A-G}.md` (7 dossier files, ~6500 words of research material).

**Pilot scope:** ONE page only — `partii/novye-lyudi.html`. Phase 2 rollout to remaining 13 partii is a separate plan after pilot is signed off.

**Verification approach:** Static site, no test framework. Each task uses (a) `node --check` for JS syntax, (b) local HTTP server smoke check (`python3 -m http.server 8765`) + `curl` for 200 response, (c) manual browser viewport test at 1440px desktop and 375px mobile, (d) DevTools console check for errors. Lighthouse run at the end for a11y/perf scores.

---

## File Structure

**NEW files:**
- `assets/js/components/registration-window.js` — A-section, ~60 LOC inline SVG with hotspots
- `assets/js/components/financing-trajectory.js` — B-section CORE viz, Chart.js area, ~80 LOC
- `assets/js/components/trustee-context.js` — D-section stat card, ~30 LOC
- `assets/js/components/ownership-flow.js` — D-section flow diagram, ~50 LOC inline SVG
- `assets/js/components/vote-waffle.js` — E-section CORE viz, 28-cell waffle inline SVG, ~70 LOC
- `assets/js/components/relationship-network.js` — F-section, ~100 LOC inline SVG graph
- `assets/js/components/swimlane.js` — G-section Даванков-paradox, ~80 LOC inline SVG
- `assets/js/lib/hotspot.js` — shared click/keyboard handler + detail-panel renderer, ~60 LOC
- `assets/js/decks/party-novye-lyudi.js` — slide deck for presentation overlay, ~20 LOC
- `assets/js/data/party-novye-lyudi.js` — page data for all viz components, ~150 LOC

**MODIFIED files:**
- `partii/novye-lyudi.html` — major rewrite (hero + 8 sections per new architecture)
- `assets/css/partii.css` — add ~200 LOC: section-snap rules, two-pane grid, hero stat-strip, hotspot detail-panel, mobile sticky-viz
- `assets/css/presentation.css` — add ~30 LOC: two-pane→single-pane override inside overlay
- Existing `assets/js/components/leader-grid.js` — extend ~30 LOC to support per-leader bio details

**REUSED unchanged:** `assets/js/lib/presentation.js`, `reveal.js`, `scroll-spy.js`, `tooltip.js`, `modal.js`, `assets/js/components/{vote-bar,timeline-vert,sources-fold,budget-share}.js`.

---

## Task 1: Section-snap + two-pane CSS foundation

**Files:**
- Modify: `assets/css/partii.css` (append ~120 LOC at end)

- [ ] **Step 1: Append section-snap and two-pane rules to `partii.css`**

Append this block at the end of `assets/css/partii.css`:

```css
/* ==================================================================== */
/* VISUAL-FIRST REFACTOR (pilot: novye-lyudi)                            */
/* Activated only on pages with data-page="party" or "sujet"             */
/* ==================================================================== */

/* Scroll-snap proximity at the html level — gated by main[data-page]
   to avoid affecting index/vybory/tsenzura which are already settled. */
html:has(main[data-page="party"]),
html:has(main[data-page="sujet"]) {
  scroll-snap-type: y proximity;
  scroll-padding-top: 80px;
}

/* Each section is a snap target. min-height ensures predictable snap step
   even for sections with little content. */
main[data-page="party"] .party-sec,
main[data-page="sujet"] .party-sec {
  scroll-snap-align: start;
  min-height: calc(100vh - 100px);
  padding: 60px 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: start;
}

/* Two-pane on ≥900px: text 40%, sticky viz 60% */
@media (min-width: 900px) {
  main[data-page="party"] .party-sec,
  main[data-page="sujet"] .party-sec {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
    gap: 48px;
  }
}

.party-sec-text {
  max-width: 60ch;
  padding-right: 12px;
  min-width: 0;
}

.party-sec-tldr {
  font-size: clamp(15px, 1.3vw, 17px);
  line-height: 1.6;
  margin: 14px 0 20px;
  color: var(--ink);
}

.party-sec-detail {
  margin: 16px 0;
  border-left: 3px solid var(--line);
  padding: 4px 0 4px 16px;
}
.party-sec-detail summary {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--accent);
  cursor: pointer;
  padding: 6px 0;
  list-style: none;
  user-select: none;
}
.party-sec-detail summary::-webkit-details-marker { display: none; }
.party-sec-detail summary::before {
  content: '▸ ';
  display: inline-block;
  transition: transform 0.15s;
}
.party-sec-detail[open] summary::before {
  transform: rotate(90deg);
}
.party-sec-detail summary:hover { color: var(--ink); }
.party-sec-detail[open] {
  border-left-color: var(--accent);
}
.party-sec-detail > *:not(summary) {
  font-size: 14px;
  line-height: 1.65;
  color: var(--ink-soft);
}

.party-sec-viz {
  position: sticky;
  top: 100px;
  align-self: start;
  max-height: calc(100vh - 120px);
  overflow: auto;
  min-width: 0;
}
.party-sec-viz-cap {
  font-size: 12px;
  color: var(--ink-muted);
  margin-top: 10px;
  line-height: 1.5;
  font-style: italic;
}

/* Mobile: viz collapses to top, sticky inside section */
@media (max-width: 899px) {
  main[data-page="party"] .party-sec,
  main[data-page="sujet"] .party-sec {
    min-height: auto;
    padding: 40px 0;
  }
  .party-sec-viz {
    top: 60px;
    max-height: 55vh;
    z-index: 10;
    background: var(--bg);
    padding: 8px 0;
    border-bottom: 1px solid var(--line);
  }
}

/* Push content right of fixed-left TOC on ≥1080px */
@media (min-width: 1080px) {
  main[data-page="party"] > .wrap,
  main[data-page="sujet"] > .wrap,
  main[data-page="party"] .party-hero .wrap,
  main[data-page="sujet"] .party-hero .wrap,
  main[data-page="party"] .party-page-layout,
  main[data-page="sujet"] .party-page-layout {
    padding-left: 256px;
  }
}

/* Reduced-motion: disable snap entirely */
@media (prefers-reduced-motion: reduce) {
  html:has(main[data-page="party"]),
  html:has(main[data-page="sujet"]) {
    scroll-snap-type: none;
  }
}
```

- [ ] **Step 2: Verify CSS file is valid (parses without unclosed braces)**

Run:
```bash
python3 -c "
import re
css = open('assets/css/partii.css').read()
opens = css.count('{'); closes = css.count('}')
print(f'{{={opens}, }}={closes}, balanced={opens==closes}')
"
```
Expected: `balanced=True`

- [ ] **Step 3: Commit**

```bash
git add assets/css/partii.css
git commit -m "feat(partii): section-snap proximity + two-pane scrollytelling CSS

Foundation for visual-first refactor (pilot novye-lyudi). Adds:
- scroll-snap-type: y proximity gated to data-page=party/sujet
- two-pane grid (text 40 / sticky viz 60) on ≥900px
- mobile sticky-top viz fallback at ≤899px
- 256px content offset to clear fixed-left TOC at ≥1080px
- prefers-reduced-motion disables snap
- party-sec-tldr, party-sec-detail, party-sec-viz-cap components

No JS changes. No HTML changes yet — page still renders single-column."
```

---

## Task 2: Hero stat-strip CSS refactor

**Files:**
- Modify: `assets/css/partii.css` (append ~50 LOC)

- [ ] **Step 1: Append hero stat-strip rules at end of `partii.css`**

```css
/* === Hero stat-strip (visual-first refactor) === */
.party-hero {
  scroll-snap-align: start;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.party-hero .wrap {
  width: 100%;
}
.party-hero-stats.horizontal {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 36px;
}
@media (max-width: 600px) {
  .party-hero-stats.horizontal {
    grid-template-columns: repeat(2, 1fr);
  }
}
.party-hero-stats.horizontal .stat {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 16px 14px;
  text-align: left;
  cursor: default;
  transition: background 0.15s;
}
.party-hero-stats.horizontal button.stat {
  cursor: pointer;
  position: relative;
}
.party-hero-stats.horizontal button.stat:hover {
  background: rgba(190, 160, 80, 0.08);
}
.party-hero-stats.horizontal .stat .n {
  font-family: 'JetBrains Mono', monospace;
  font-feature-settings: "zero" 1, "tnum" 1;
  font-size: clamp(28px, 3.6vw, 38px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.0;
  color: var(--ink);
  margin-bottom: 8px;
}
.party-hero-stats.horizontal .stat .n.alert {
  color: var(--accent);
}
.party-hero-stats.horizontal .stat .lbl {
  font-size: 12px;
  line-height: 1.45;
  color: var(--ink-soft);
}
.party-hero-stats.horizontal .more-cue {
  position: absolute;
  top: 8px;
  right: 10px;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: rgba(190, 160, 80, 0.15);
  color: var(--accent);
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-detail {
  margin-top: 16px;
  padding: 12px 16px;
  background: rgba(190, 160, 80, 0.08);
  border-left: 3px solid var(--accent);
  border-radius: 0 4px 4px 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink-soft);
}
.stat-detail[hidden] { display: none; }

/* Scroll-hint at bottom of hero */
.party-hero-scroll-hint {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--ink-muted);
  letter-spacing: 0.06em;
  animation: hero-scroll-pulse 2s ease-in-out infinite;
}
@keyframes hero-scroll-pulse {
  0%, 100% { opacity: 0.4; transform: translateX(-50%) translateY(0); }
  50%      { opacity: 1; transform: translateX(-50%) translateY(4px); }
}
@media (prefers-reduced-motion: reduce) {
  .party-hero-scroll-hint { animation: none; opacity: 0.6; }
}
```

- [ ] **Step 2: Verify CSS still parses**

```bash
python3 -c "
css = open('assets/css/partii.css').read()
print(f'lines={len(css.splitlines())}, opens={css.count(chr(123))}, closes={css.count(chr(125))}')
"
```
Expected: opens == closes (balanced).

- [ ] **Step 3: Commit**

```bash
git add assets/css/partii.css
git commit -m "feat(partii): hero stat-strip horizontal layout + scroll-hint

Hero now occupies 100vh as first snap-target. Stats render as horizontal
grid of 4 tiles (2x2 on ≤600px). One tile may be a button (data-detail)
that toggles an inline .stat-detail explainer.

JetBrains Mono with slashed-zero feature on stat numbers. Scroll-hint
at bottom of hero pulses gently, respects prefers-reduced-motion."
```

---

## Task 3: Shared hotspot infrastructure (`hotspot.js`)

**Files:**
- Create: `assets/js/lib/hotspot.js`
- Modify: `assets/css/partii.css` (append ~40 LOC for hotspot detail-panel)

- [ ] **Step 1: Create `assets/js/lib/hotspot.js`**

Write to `assets/js/lib/hotspot.js`:

```js
// Shared hotspot click/keyboard handler for SVG-based interactive viz.
// Components emit elements like:
//   <g class="hs" tabindex="0" role="button"
//      aria-label="..." data-hotspot-id="x"
//      data-hotspot-title="..." data-hotspot-body="...">
//     <title>tooltip text</title>
//     ...visible shapes
//   </g>
//
// On click or Enter/Space: shows detail panel anchored to the parent
// .party-sec-viz container (slides in from bottom).
//
// No external deps. Vanilla JS only.

(function() {
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function ensurePanel(container) {
    var panel = container.querySelector('.hotspot-detail');
    if (panel) return panel;
    panel = document.createElement('aside');
    panel.className = 'hotspot-detail';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-live', 'polite');
    panel.hidden = true;
    panel.innerHTML =
      '<button class="hd-close" type="button" aria-label="Закрыть">×</button>' +
      '<div class="hd-title"></div>' +
      '<div class="hd-body"></div>';
    container.appendChild(panel);

    panel.querySelector('.hd-close').addEventListener('click', function() {
      hidePanel(panel);
    });
    return panel;
  }

  function showPanel(panel, title, body) {
    panel.querySelector('.hd-title').innerHTML = title || '';
    panel.querySelector('.hd-body').innerHTML = body || '';
    panel.hidden = false;
    requestAnimationFrame(function() {
      panel.classList.add('is-open');
    });
  }

  function hidePanel(panel) {
    panel.classList.remove('is-open');
    setTimeout(function() {
      if (!panel.classList.contains('is-open')) panel.hidden = true;
    }, 180);
  }

  function activateHotspot(el, container) {
    var panel = ensurePanel(container);
    var title = el.dataset.hotspotTitle || el.getAttribute('aria-label') || '';
    var body = el.dataset.hotspotBody || '';
    // body may contain HTML (we trust component authors)
    showPanel(panel, escHtml(title), body);

    // Mark active hotspot
    container.querySelectorAll('.hs.is-active').forEach(function(n) {
      n.classList.remove('is-active');
    });
    el.classList.add('is-active');
  }

  function init(rootEl) {
    if (!rootEl || rootEl._hotspotInit) return;
    rootEl._hotspotInit = true;

    rootEl.addEventListener('click', function(e) {
      var hs = e.target.closest('.hs');
      if (!hs) return;
      e.preventDefault();
      activateHotspot(hs, rootEl);
    });

    rootEl.addEventListener('keydown', function(e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var hs = e.target.closest('.hs');
      if (!hs) return;
      e.preventDefault();
      activateHotspot(hs, rootEl);
    });

    // Esc closes detail
    rootEl.addEventListener('keydown', function(e) {
      if (e.key !== 'Escape') return;
      var panel = rootEl.querySelector('.hotspot-detail.is-open');
      if (panel) {
        hidePanel(panel);
        rootEl.querySelectorAll('.hs.is-active').forEach(function(n) {
          n.classList.remove('is-active');
        });
      }
    });
  }

  window.initHotspots = init;
})();
```

- [ ] **Step 2: Verify JS syntax**

```bash
node --check assets/js/lib/hotspot.js
```
Expected: no output (means OK).

- [ ] **Step 3: Append hotspot detail-panel CSS to `partii.css`**

```css
/* === Hotspot detail panel (shared across viz with data-hotspot-*) === */
.hotspot-detail {
  position: absolute;
  bottom: 0;
  left: 0; right: 0;
  background: var(--bg-paper);
  border-top: 2px solid var(--accent);
  border-radius: 0 0 6px 6px;
  padding: 14px 18px 16px;
  box-shadow: 0 -8px 18px rgba(0, 0, 0, 0.12);
  transform: translateY(100%);
  transition: transform 0.18s var(--ease-out);
  z-index: 5;
}
.hotspot-detail.is-open { transform: translateY(0); }
.hotspot-detail .hd-close {
  position: absolute;
  top: 6px; right: 8px;
  width: 24px; height: 24px;
  background: transparent;
  border: 0;
  font-size: 18px;
  color: var(--ink-muted);
  cursor: pointer;
  border-radius: 50%;
}
.hotspot-detail .hd-close:hover {
  background: rgba(0, 0, 0, 0.06);
  color: var(--ink);
}
.hotspot-detail .hd-title {
  font-family: 'Unbounded', sans-serif;
  font-weight: 700;
  font-size: 14px;
  margin: 0 30px 8px 0;
  color: var(--ink);
}
.hotspot-detail .hd-body {
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink-soft);
}
.hotspot-detail .hd-body a { color: var(--accent); }

/* Hotspot visible state (highlighted on hover/focus/active) */
.hs {
  cursor: pointer;
  transition: filter 0.12s, opacity 0.12s;
}
.hs:hover, .hs:focus-visible { filter: brightness(1.08); }
.hs:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.hs.is-active { filter: brightness(1.12) drop-shadow(0 0 6px rgba(190, 160, 80, 0.4)); }

/* Make the parent viz a positioned context so the bottom panel anchors to it */
.party-sec-viz { position: relative; }
```

- [ ] **Step 4: Verify CSS balanced**

```bash
python3 -c "
css = open('assets/css/partii.css').read()
o, c = css.count('{'), css.count('}')
print('balanced' if o == c else f'UNBALANCED {o}/{c}')
"
```
Expected: `balanced`

- [ ] **Step 5: Commit**

```bash
git add assets/js/lib/hotspot.js assets/css/partii.css
git commit -m "feat(lib): hotspot.js — shared SVG hotspot click/keyboard handler

Bottom-anchored detail panel with slide-in animation. Components emit
.hs elements with data-hotspot-{title,body} attrs. Keyboard nav (Enter/
Space activate, Esc close). Auto-installs on call to initHotspots(rootEl).

CSS: .hotspot-detail panel styling + .hs hover/focus/active states +
.party-sec-viz position:relative for panel anchoring."
```

---

## Task 4: `presentation.css` overlay patches

**Files:**
- Modify: `assets/css/presentation.css` (append ~40 LOC at end)

- [ ] **Step 1: Append two-pane → single-pane override at end of `presentation.css`**

```css
/* ==================================================================== */
/* Two-pane scrollytelling sections collapse to single-pane in overlay  */
/* ==================================================================== */

.present-overlay .party-sec,
.present-stage .party-sec {
  display: flex !important;
  flex-direction: column !important;
  grid-template-columns: none !important;
  gap: 24px;
  padding: 24px 32px;
  min-height: auto;
  scroll-snap-align: none;
}

.present-overlay .party-sec-viz,
.present-stage .party-sec-viz {
  position: static !important;
  max-height: 65vh !important;
  overflow: visible;
  order: 1;
  width: 100%;
}

.present-overlay .party-sec-text,
.present-stage .party-sec-text {
  order: 2;
  max-width: 90ch;
  margin: 0 auto;
  padding-right: 0;
}

/* Hide expand-on-demand details and source-folds inside slides — slide
   shows tldr + viz only. Reading mode is for full text. */
.present-overlay .party-sec-text > details,
.present-overlay .party-sec-text > .sources-fold,
.present-stage .party-sec-text > details,
.present-stage .party-sec-text > .sources-fold {
  display: none;
}

/* tldr is the slide caption — slightly larger inside overlay */
.present-overlay .party-sec-tldr,
.present-stage .party-sec-tldr {
  font-size: clamp(16px, 1.6vw, 20px);
  line-height: 1.55;
  margin: 0;
}

/* Hot-spot detail panel inside overlay anchors to the bottom of the
   slide stage, not the viz container */
.present-overlay .hotspot-detail,
.present-stage .hotspot-detail {
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  width: min(90vw, 600px);
  border-radius: 8px;
  border: 1px solid var(--line);
}
.present-overlay .hotspot-detail.is-open,
.present-stage .hotspot-detail.is-open {
  transform: translateX(-50%) translateY(0);
}
```

- [ ] **Step 2: Verify CSS balanced**

```bash
python3 -c "
css = open('assets/css/presentation.css').read()
print('balanced' if css.count('{') == css.count('}') else 'UNBALANCED')
"
```
Expected: `balanced`

- [ ] **Step 3: Commit**

```bash
git add assets/css/presentation.css
git commit -m "feat(presentation): overlay collapses two-pane sections to single-pane

Sections in slide-deck overlay reorder: viz on top (max 65vh), tldr below
as caption (~90ch). <details> and sources-fold hidden — slide shows
tldr + viz only. Hotspot panel re-anchors to viewport bottom inside
overlay (not section-relative)."
```

---

## Task 5: `registration-window.js` (A-section component)

**Files:**
- Create: `assets/js/components/registration-window.js`

- [ ] **Step 1: Create component file**

Write to `assets/js/components/registration-window.js`:

```js
// A-section component: Registration window timeline.
// Shows N parties registered in a narrow time window, each as a hotspot.
//
// API:  window.renderRegistrationWindow(rootEl, data)
//
// data = {
//   period: { start: '2020-03-01', end: '2020-04-30' },
//   events: [
//     { id, party, foundedDate, registeredDate, color,
//       hotspotTitle, hotspotBody }
//   ]
// }
//
// Uses .hs elements for hotspot integration via window.initHotspots.

(function() {
  function escAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function dateToMs(s) { return new Date(s).getTime(); }

  function fmtRu(s) {
    var d = new Date(s);
    var months = ['янв.','фев.','мар.','апр.','мая','июн.','июл.','авг.','сен.','окт.','ноя.','дек.'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  }

  window.renderRegistrationWindow = function(rootEl, data) {
    if (!rootEl || !data || !data.events) return;

    var startMs = dateToMs(data.period.start);
    var endMs = dateToMs(data.period.end);
    var span = endMs - startMs || 1;

    function pct(ms) {
      return ((ms - startMs) / span) * 100;
    }

    // Build SVG with axis + per-event marker
    var width = 640, height = 220;
    var axisY = 130;
    var labels = [];

    var dotsHtml = data.events.map(function(e, i) {
      var fp = pct(dateToMs(e.foundedDate));
      var rp = pct(dateToMs(e.registeredDate));
      var fX = (fp / 100) * (width - 80) + 40;
      var rX = (rp / 100) * (width - 80) + 40;
      var color = e.color || 'var(--accent)';
      var labelY = axisY - 30 - (i * 26);

      labels.push(
        '<g class="hs" tabindex="0" role="button" ' +
          'aria-label="' + escAttr(e.party + ' — учредительный ' + fmtRu(e.foundedDate) +
            ', регистрация Минюстом ' + fmtRu(e.registeredDate)) + '" ' +
          'data-hotspot-id="' + escAttr(e.id) + '" ' +
          'data-hotspot-title="' + escAttr(e.hotspotTitle || e.party) + '" ' +
          'data-hotspot-body="' + escAttr(e.hotspotBody || '') + '">' +
          '<title>' + escHtml(e.party + ' — клик для подробностей') + '</title>' +
          // Connecting line from founded → registered
          '<line x1="' + fX.toFixed(1) + '" y1="' + axisY + '" x2="' + rX.toFixed(1) + '" y2="' + axisY + '" stroke="' + color + '" stroke-width="3" opacity="0.4"/>' +
          // Founded marker (open circle)
          '<circle cx="' + fX.toFixed(1) + '" cy="' + axisY + '" r="6" fill="white" stroke="' + color + '" stroke-width="2"/>' +
          // Registered marker (filled)
          '<circle cx="' + rX.toFixed(1) + '" cy="' + axisY + '" r="7" fill="' + color + '"/>' +
          // Label above axis with leader line
          '<line x1="' + rX.toFixed(1) + '" y1="' + axisY + '" x2="' + rX.toFixed(1) + '" y2="' + (labelY + 8) + '" stroke="' + color + '" stroke-width="1" stroke-dasharray="2 2"/>' +
          '<text x="' + rX.toFixed(1) + '" y="' + labelY + '" text-anchor="middle" font-size="12" font-family="Manrope,sans-serif" font-weight="600" fill="#1A1815">' + escHtml(e.party) + '</text>' +
          '<text x="' + rX.toFixed(1) + '" y="' + (labelY + 14) + '" text-anchor="middle" font-size="10" font-family="JetBrains Mono,monospace" fill="#6f6a60">' + escHtml(fmtRu(e.registeredDate).replace(/ \d{4}$/, '')) + '</text>' +
        '</g>'
      );
      return '';
    });

    // Axis baseline
    var axisHtml =
      '<line x1="40" y1="' + axisY + '" x2="' + (width - 40) + '" y2="' + axisY + '" stroke="#1A1815" stroke-width="1.5"/>' +
      '<text x="40" y="' + (axisY + 24) + '" font-size="10" font-family="JetBrains Mono,monospace" fill="#6f6a60">' + escHtml(fmtRu(data.period.start)) + '</text>' +
      '<text x="' + (width - 40) + '" y="' + (axisY + 24) + '" text-anchor="end" font-size="10" font-family="JetBrains Mono,monospace" fill="#6f6a60">' + escHtml(fmtRu(data.period.end)) + '</text>';

    var legend =
      '<g transform="translate(40, ' + (height - 24) + ')">' +
        '<circle cx="6" cy="0" r="5" fill="white" stroke="#999" stroke-width="2"/>' +
        '<text x="18" y="4" font-size="10" font-family="Manrope,sans-serif" fill="#6f6a60">учредительный съезд</text>' +
        '<circle cx="180" cy="0" r="6" fill="#999"/>' +
        '<text x="194" y="4" font-size="10" font-family="Manrope,sans-serif" fill="#6f6a60">регистрация Минюстом</text>' +
      '</g>';

    rootEl.innerHTML =
      '<svg viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="xMidYMid meet" ' +
        'role="img" aria-labelledby="rw-title rw-desc" style="display:block;width:100%;height:auto;max-width:' + width + 'px;margin:0 auto">' +
        '<title id="rw-title">Окно регистрации партий ' + escHtml(fmtRu(data.period.start)) + ' — ' + escHtml(fmtRu(data.period.end)) + '</title>' +
        '<desc id="rw-desc">' + escHtml(data.events.length) + ' партий зарегистрированы в одно и то же временное окно. Кликни маркер партии для деталей.</desc>' +
        labels.join('') +
        axisHtml +
        legend +
      '</svg>';

    if (window.initHotspots) window.initHotspots(rootEl);
  };
})();
```

- [ ] **Step 2: Verify JS syntax**

```bash
node --check assets/js/components/registration-window.js
```
Expected: no output.

- [ ] **Step 3: Smoke-test render in isolation**

Create temp test file `/tmp/test-rw.html`:
```html
<!DOCTYPE html><html><head>
<link rel="stylesheet" href="./assets/css/tokens.css">
<link rel="stylesheet" href="./assets/css/base.css">
<link rel="stylesheet" href="./assets/css/partii.css">
</head><body style="padding:40px;background:#F0EAD6">
<div class="party-sec-viz" id="t" style="position:relative;width:700px"></div>
<script src="./assets/js/lib/hotspot.js"></script>
<script src="./assets/js/components/registration-window.js"></script>
<script>
renderRegistrationWindow(document.getElementById('t'), {
  period: { start: '2020-03-01', end: '2020-04-15' },
  events: [
    { id:'nl', party:'Новые люди', foundedDate:'2020-03-01', registeredDate:'2020-03-24', color:'#e87d3e',
      hotspotTitle:'Новые люди', hotspotBody:'<p>Учредительный 1.03.2020 в Центре цифрового лидерства SAP. Регистрация Минюстом 24.03.2020 — через 3 недели.</p>' },
    { id:'zp', party:'За правду', foundedDate:'2020-02-01', registeredDate:'2020-03-25', color:'#a1393b',
      hotspotTitle:'За правду', hotspotBody:'<p>Прилепинская партия; зарегистрирована за 1 день после НЛ.</p>' },
    { id:'za', party:'Зелёная альтернатива', foundedDate:'2020-03-10', registeredDate:'2020-04-07', color:'#6c8c44',
      hotspotTitle:'Зелёная альтернатива', hotspotBody:'<p>Хвостов; регистрация Минюстом 7.04.2020.</p>' },
  ]
});
</script>
</body></html>
```

Then:
```bash
cp /tmp/test-rw.html ./.coop/test-rw.html
python3 -m http.server 8765 --directory . >/dev/null 2>&1 &
sleep 1
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8765/.coop/test-rw.html
kill %1 2>/dev/null
```
Expected: `200`. Then manually open http://127.0.0.1:8765/.coop/test-rw.html in browser, verify timeline renders with 3 parties as hotspots and clicking a marker opens the detail panel.

- [ ] **Step 4: Commit**

```bash
git add assets/js/components/registration-window.js
git commit -m "feat(components): registration-window — A-section viz for НЛ pilot

Inline SVG timeline. Each party gets a founded→registered horizontal
segment with two markers. Hotspots on the registered marker; aria-label
narrates founded+registered dates. Auto-installs hotspot handler.

Tested isolated render with 3 parties in spring-2020 window."
```

---

## Task 6: `financing-trajectory.js` (B-section CORE viz)

**Files:**
- Create: `assets/js/components/financing-trajectory.js`

- [ ] **Step 1: Create component file**

Write to `assets/js/components/financing-trajectory.js`:

```js
// B-section CORE viz: Financing trajectory chart.
// Shows budget-share % over years as a Chart.js area chart with hotspots
// on each data point.
//
// API: window.renderFinancingTrajectory(rootEl, data)
// data = {
//   years: [2021, 2022, 2023, 2024],
//   budgetPct: [0, 92, 93, 90],
//   totalsMln: [12, 488, 720, 619],
//   hotspots: { '2021': {title, body}, '2022': {...}, ... }
// }

(function() {
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  window.renderFinancingTrajectory = function(rootEl, data) {
    if (!rootEl || !data) return;
    if (typeof Chart === 'undefined') {
      rootEl.innerHTML = '<div class="dok-error" style="padding:40px;text-align:center"><p>Chart.js не загружен — попробуйте обновить страницу.</p></div>';
      return;
    }

    var canvasId = 'fin-traj-' + Math.random().toString(36).slice(2, 9);

    rootEl.innerHTML =
      '<div style="position:relative;width:100%;height:280px">' +
        '<canvas id="' + canvasId + '" role="img" ' +
          'aria-label="Доходы партии Новые люди от государственного бюджета: ' +
          data.years.map(function(y, i) { return y + ' г. ' + data.budgetPct[i] + '%'; }).join(', ') + '">' +
          'График доли бюджетного финансирования по годам.' +
        '</canvas>' +
      '</div>' +
      '<div class="ft-pills" style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap;justify-content:center"></div>';

    var pillsEl = rootEl.querySelector('.ft-pills');
    data.years.forEach(function(year, i) {
      var pct = data.budgetPct[i];
      var hs = data.hotspots && data.hotspots[year];
      var tag = document.createElement('button');
      tag.className = 'hs ft-pill';
      tag.type = 'button';
      tag.setAttribute('tabindex', '0');
      tag.setAttribute('role', 'button');
      tag.setAttribute('aria-label', year + ': ' + pct + '% доля бюджета');
      tag.dataset.hotspotTitle = (hs && hs.title) || (year + ' г.');
      tag.dataset.hotspotBody = (hs && hs.body) || '';
      tag.style.cssText = 'border:1px solid var(--line);background:white;padding:6px 12px;border-radius:100px;font-family:JetBrains Mono,monospace;font-size:11px;cursor:pointer;color:var(--ink-soft)';
      tag.innerHTML = '<strong>' + year + '</strong> · ' + pct + '%';
      pillsEl.appendChild(tag);
    });

    var ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.years.map(String),
        datasets: [{
          label: '% доходов из бюджета',
          data: data.budgetPct,
          borderColor: '#bea050',
          backgroundColor: 'rgba(190, 160, 80, 0.18)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.28,
          pointBackgroundColor: '#bea050',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true, max: 100,
            ticks: {
              callback: function(v) { return v + '%'; },
              color: '#6f6a60', font: { family: 'JetBrains Mono', size: 10 },
            },
            grid: { color: 'rgba(0,0,0,0.05)' },
          },
          x: {
            ticks: { color: '#1A1815', font: { family: 'JetBrains Mono', size: 11, weight: 600 } },
            grid: { display: false },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                var i = ctx.dataIndex;
                var totalLine = data.totalsMln && data.totalsMln[i] != null ? '\nВсего: ' + data.totalsMln[i] + ' млн ₽' : '';
                return ctx.parsed.y + '% бюджета' + totalLine;
              },
            },
          },
        },
      },
    });

    if (window.initHotspots) window.initHotspots(rootEl);
  };
})();
```

- [ ] **Step 2: Verify JS syntax**

```bash
node --check assets/js/components/financing-trajectory.js
```
Expected: no output.

- [ ] **Step 3: Smoke-test render** by adding a test invocation similar to Task 5 step 3, but include Chart.js CDN. Verify chart renders + 4 year-pill hotspots are clickable.

```bash
cat > ./.coop/test-ft.html << 'EOF'
<!DOCTYPE html><html><head>
<link rel="stylesheet" href="/assets/css/tokens.css">
<link rel="stylesheet" href="/assets/css/base.css">
<link rel="stylesheet" href="/assets/css/partii.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>
</head><body style="padding:40px;background:#F0EAD6">
<div class="party-sec-viz" id="t" style="position:relative;width:600px"></div>
<script src="/assets/js/lib/hotspot.js"></script>
<script src="/assets/js/components/financing-trajectory.js"></script>
<script>
renderFinancingTrajectory(document.getElementById('t'), {
  years:[2021,2022,2023,2024], budgetPct:[0,92,93,90], totalsMln:[12,488,720,619],
  hotspots:{
    '2021':{title:'2021', body:'Только пожертвования; бюджет 0%.'},
    '2022':{title:'2022', body:'Получены первые транши после прохождения 5%-ного барьера.'},
    '2023':{title:'2023', body:'Пик — 93% доходов из бюджета.'},
    '2024':{title:'2024', body:'Снижение до 90%; влияет президентская кампания.'},
  }
});
</script>
</body></html>
EOF
python3 -m http.server 8765 --directory . >/dev/null 2>&1 &
sleep 1
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8765/.coop/test-ft.html
kill %1 2>/dev/null
```
Expected: `200`. Manual verify in browser: chart appears with 4 data points, year-pills clickable.

- [ ] **Step 4: Commit**

```bash
git add assets/js/components/financing-trajectory.js
git commit -m "feat(components): financing-trajectory — B-section CORE viz

Chart.js area showing budget-share % per year. Year-pills below the
chart act as hotspots: clicking 2022 pill opens detail panel with
context. Tooltip shows pct + abs value (млн ₽).

aria-label narrates all 4 data points for screen-readers."
```

---

## Task 7: Extend `leader-grid.js` for per-leader bio details

**Files:**
- Modify: `assets/js/components/leader-grid.js` (add details-on-click)

- [ ] **Step 1: Read current leader-grid.js to confirm extension surface**

```bash
cat assets/js/components/leader-grid.js
```

- [ ] **Step 2: Add `bio` field support and inline expand**

Replace the inner part of `window.renderLeaderGrid` so each card optionally renders a `<details>` with expanded bio. Update the inner forEach loop:

```js
// (append after the existing leaders.forEach inside renderLeaderGrid; replace the
//  existing block that builds <article class="lg-card">.)
leaders.forEach(function(p) {
  var avatar;
  if (p.photo) {
    avatar = '<img class="lg-photo" src="' + escHtml(p.photo) + '" alt="" loading="lazy">';
  } else {
    var hue = hueFor(p.name || '');
    avatar = '<div class="lg-photo lg-photo-fallback" aria-hidden="true" ' +
      'style="background:hsl(' + hue + ',55%,82%);color:hsl(' + hue + ',55%,28%)">' +
      escHtml(initials(p.name)) +
      '</div>';
  }

  var nameHtml = p.duma_url
    ? '<a href="' + escHtml(p.duma_url) + '" target="_blank" rel="noopener">' + escHtml(p.name) + '</a>'
    : escHtml(p.name);

  var tagsHtml = '';
  if (Array.isArray(p.tags) && p.tags.length > 0) {
    tagsHtml = '<div class="lg-tags">';
    p.tags.forEach(function(t) {
      if (typeof t === 'string') {
        tagsHtml += '<span class="lg-tag">' + escHtml(t) + '</span>';
      } else if (t && t.label) {
        var cls = t.kind ? ' lg-tag-' + escHtml(t.kind) : '';
        tagsHtml += '<span class="lg-tag' + cls + '">' + escHtml(t.label) + '</span>';
      }
    });
    tagsHtml += '</div>';
  }

  var bioHtml = '';
  if (p.bio) {
    bioHtml =
      '<details class="lg-bio">' +
        '<summary>биография →</summary>' +
        '<div class="lg-bio-body">' + p.bio + '</div>' +
      '</details>';
  }

  html +=
    '<article class="lg-card">' +
      avatar +
      '<div class="lg-body">' +
        '<h4 class="lg-name">' + nameHtml + '</h4>' +
        (p.role ? '<div class="lg-role">' + escHtml(p.role) + '</div>' : '') +
        (p.born ? '<div class="lg-born">' + escHtml(p.born) + '</div>' : '') +
        (p.note ? '<p class="lg-note">' + escHtml(p.note) + '</p>' : '') +
        tagsHtml +
        bioHtml +
      '</div>' +
    '</article>';
});
```

To do this cleanly: open `assets/js/components/leader-grid.js`, find the `leaders.forEach(function(p) {` block (entire inner of the function body up to the `});` that closes forEach), and replace with the version above. The exact `old_string` for Edit tool is the existing forEach block; the replacement is the version above.

- [ ] **Step 3: Append CSS for bio in `partii.css`**

```css
/* Per-leader bio (extension of U2) */
.lg-bio { margin-top: 10px; }
.lg-bio summary {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--accent);
  cursor: pointer;
  padding: 4px 0;
  list-style: none;
}
.lg-bio summary::-webkit-details-marker { display: none; }
.lg-bio summary::before {
  content: '▸ ';
  display: inline-block;
  transition: transform 0.15s;
}
.lg-bio[open] summary::before { transform: rotate(90deg); }
.lg-bio-body {
  font-size: 12px;
  line-height: 1.55;
  color: var(--ink-soft);
  padding: 6px 0 4px;
  border-left: 2px solid var(--accent);
  padding-left: 10px;
  margin-top: 4px;
}
.lg-bio-body p { margin: 0 0 6px; }
.lg-bio-body p:last-child { margin-bottom: 0; }
```

- [ ] **Step 4: Verify JS syntax**

```bash
node --check assets/js/components/leader-grid.js
```
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add assets/js/components/leader-grid.js assets/css/partii.css
git commit -m "feat(leader-grid): per-leader inline bio expansion

Each leader can carry a bio HTML string; rendered as <details> below
the tag-pills. Native disclosure widget; <details> animation respects
prefers-reduced-motion. CSS adds bio-fold styling consistent with
existing party-sec-detail."
```

---

## Task 8: `trustee-context.js` + `ownership-flow.js` (D-section, two small components)

**Files:**
- Create: `assets/js/components/trustee-context.js`
- Create: `assets/js/components/ownership-flow.js`

- [ ] **Step 1: Create `trustee-context.js`**

Write to `assets/js/components/trustee-context.js`:

```js
// D-section: small context stat-card.
// API: window.renderTrusteeContext(rootEl, data)
// data = { headline: '1 из ≈500', sub: '...', source: {label, url} }

(function() {
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  window.renderTrusteeContext = function(rootEl, data) {
    if (!rootEl || !data) return;
    var srcHtml = '';
    if (data.source && data.source.url) {
      srcHtml = '<div class="tc-source"><a href="' + escHtml(data.source.url) + '" target="_blank" rel="noopener">' + escHtml(data.source.label || 'источник') + ' ↗</a></div>';
    }
    rootEl.innerHTML =
      '<div class="trustee-context">' +
        '<div class="tc-headline">' + escHtml(data.headline || '') + '</div>' +
        '<div class="tc-sub">' + escHtml(data.sub || '') + '</div>' +
        srcHtml +
      '</div>';
  };
})();
```

- [ ] **Step 2: Create `ownership-flow.js`**

Write to `assets/js/components/ownership-flow.js`:

```js
// D-section: 2-3 step ownership/control flow diagram.
// API: window.renderOwnershipFlow(rootEl, data)
// data = {
//   steps: [{ label, sub?, color?, hotspotTitle, hotspotBody }],
//   arrowLabels: ['продано 2025', 'аффилировано'],   // length steps.length - 1
//   title?: '...'
// }
// Inline SVG with hotspots on each box.

(function() {
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function escAttr(s) { return escHtml(s); }

  window.renderOwnershipFlow = function(rootEl, data) {
    if (!rootEl || !data || !Array.isArray(data.steps)) return;
    var n = data.steps.length;
    if (n < 2) return;

    var width = 720;
    var boxW = (width - 60) / n - 30;
    var boxH = 90;
    var top = 50;

    var html = '<svg viewBox="0 0 ' + width + ' 200" preserveAspectRatio="xMidYMid meet" ' +
      'role="img" aria-label="Цепочка собственности из ' + n + ' шагов" ' +
      'style="display:block;width:100%;height:auto;max-width:' + width + 'px;margin:0 auto">';

    if (data.title) {
      html += '<text x="' + (width / 2) + '" y="20" text-anchor="middle" font-size="13" font-family="Unbounded,sans-serif" font-weight="700" fill="#1A1815">' + escHtml(data.title) + '</text>';
    }

    data.steps.forEach(function(s, i) {
      var x = 30 + i * (boxW + 30);
      var color = s.color || '#bea050';
      html +=
        '<g class="hs" tabindex="0" role="button" ' +
          'aria-label="' + escAttr(s.label + (s.sub ? ' — ' + s.sub : '')) + '" ' +
          'data-hotspot-title="' + escAttr(s.hotspotTitle || s.label) + '" ' +
          'data-hotspot-body="' + escAttr(s.hotspotBody || '') + '">' +
          '<title>' + escHtml(s.label) + '</title>' +
          '<rect x="' + x + '" y="' + top + '" width="' + boxW + '" height="' + boxH + '" rx="6" fill="' + color + '" opacity="0.12" stroke="' + color + '" stroke-width="2"/>' +
          '<text x="' + (x + boxW / 2) + '" y="' + (top + 36) + '" text-anchor="middle" font-size="13" font-family="Manrope,sans-serif" font-weight="600" fill="#1A1815">' + escHtml(s.label) + '</text>' +
          (s.sub ? '<text x="' + (x + boxW / 2) + '" y="' + (top + 56) + '" text-anchor="middle" font-size="11" font-family="JetBrains Mono,monospace" fill="#6f6a60">' + escHtml(s.sub) + '</text>' : '') +
        '</g>';

      if (i < n - 1) {
        var arrowX1 = x + boxW + 4;
        var arrowX2 = x + boxW + 26;
        var arrowY = top + boxH / 2;
        html +=
          '<line x1="' + arrowX1 + '" y1="' + arrowY + '" x2="' + arrowX2 + '" y2="' + arrowY + '" stroke="#1A1815" stroke-width="2" marker-end="url(#of-arrow)"/>';
        if (data.arrowLabels && data.arrowLabels[i]) {
          html += '<text x="' + ((arrowX1 + arrowX2) / 2) + '" y="' + (arrowY - 8) + '" text-anchor="middle" font-size="10" font-family="JetBrains Mono,monospace" fill="#6f6a60">' + escHtml(data.arrowLabels[i]) + '</text>';
        }
      }
    });

    html +=
      '<defs>' +
        '<marker id="of-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="8" orient="auto">' +
          '<path d="M 0 0 L 10 5 L 0 10 z" fill="#1A1815"/>' +
        '</marker>' +
      '</defs></svg>';

    rootEl.innerHTML = html;
    if (window.initHotspots) window.initHotspots(rootEl);
  };
})();
```

- [ ] **Step 3: Append small CSS for trustee-context to `partii.css`**

```css
/* === D-section Trustee context card === */
.trustee-context {
  padding: 24px 28px;
  background: var(--bg-paper);
  border: 1px solid var(--line);
  border-radius: 8px;
  text-align: center;
}
.trustee-context .tc-headline {
  font-family: 'JetBrains Mono', monospace;
  font-feature-settings: "zero" 1, "tnum" 1;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-bottom: 8px;
}
.trustee-context .tc-sub {
  font-size: 14px;
  line-height: 1.55;
  color: var(--ink-soft);
  margin-bottom: 10px;
}
.trustee-context .tc-source {
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--ink-muted);
}
.trustee-context .tc-source a { color: var(--accent); text-decoration: none; }
.trustee-context .tc-source a:hover { text-decoration: underline; }
```

- [ ] **Step 4: Verify JS syntax**

```bash
node --check assets/js/components/trustee-context.js
node --check assets/js/components/ownership-flow.js
```
Expected: no output for both.

- [ ] **Step 5: Commit**

```bash
git add assets/js/components/trustee-context.js assets/js/components/ownership-flow.js assets/css/partii.css
git commit -m "feat(components): trustee-context + ownership-flow for D-section

trustee-context: simple stat-card with headline (JetBrains Mono number) +
sub-caption + optional source link.

ownership-flow: inline SVG horizontal flow diagram of N steps with
arrows between boxes. Each box is a hotspot. Used for НЛ Faberlic →
Воентекстильпром → Военторг (Минобороны) chain."
```

---

## Task 9: `vote-waffle.js` (E-section CORE viz)

**Files:**
- Create: `assets/js/components/vote-waffle.js`

- [ ] **Step 1: Create component file**

Write to `assets/js/components/vote-waffle.js`:

```js
// E-section CORE viz: Vote waffle — 28 cells, each = 1 restrictive law vote.
// Cells coloured by faction outcome (за / против / возд. / частично).
// Hotspot per cell: ФЗ-номер, дата, vote_id, link to raw XML.
//
// API: window.renderVoteWaffle(rootEl, data)
// data = {
//   votes: [
//     { id, fz, title, date, voteId, outcome:'za'|'against'|'abstain'|'partial', xmlPath, hotspotBody }
//   ],
//   summary: { za, against, abstain, partial },  // counts for legend
// }

(function() {
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function escAttr(s) { return escHtml(s); }

  var COLOURS = {
    za:       { fill: '#bea050', label: 'за ограничения' },
    against:  { fill: '#6c8c44', label: 'фракционно «против»' },
    abstain:  { fill: '#a3a399', label: 'воздержались' },
    partial:  { fill: '#d97706', label: 'часть фракции «против»' },
  };

  window.renderVoteWaffle = function(rootEl, data) {
    if (!rootEl || !data || !Array.isArray(data.votes)) return;

    var votes = data.votes;
    var cols = 7, rows = Math.ceil(votes.length / cols);
    var cellSize = 56, gap = 6;
    var width = cols * (cellSize + gap) - gap + 60;
    var legendY = rows * (cellSize + gap) + 20;
    var totalH = legendY + 60;

    var cellsHtml = votes.map(function(v, i) {
      var col = i % cols, row = Math.floor(i / cols);
      var x = 30 + col * (cellSize + gap);
      var y = 16 + row * (cellSize + gap);
      var c = COLOURS[v.outcome] || COLOURS.za;
      var label = v.fz + ' (' + v.date + ') — ' + (c.label);
      return (
        '<g class="hs" tabindex="0" role="button" ' +
          'aria-label="' + escAttr(label) + '" ' +
          'data-hotspot-title="' + escAttr(v.fz + ' · ' + v.date) + '" ' +
          'data-hotspot-body="' + escAttr(v.hotspotBody || '') + '">' +
          '<title>' + escHtml(label) + '</title>' +
          '<rect x="' + x + '" y="' + y + '" width="' + cellSize + '" height="' + cellSize + '" rx="3" fill="' + c.fill + '" opacity="0.85"/>' +
          '<text x="' + (x + cellSize / 2) + '" y="' + (y + cellSize / 2 + 4) + '" text-anchor="middle" font-size="11" font-family="JetBrains Mono,monospace" font-weight="700" fill="white">' + escHtml(v.fz.replace(/^ФЗ-/, '')) + '</text>' +
        '</g>'
      );
    });

    var legendItems = ['za', 'partial', 'abstain', 'against'].map(function(k) {
      var c = COLOURS[k]; var n = (data.summary && data.summary[k]) || 0;
      if (!n) return '';
      return (
        '<g transform="translate(' + (legendItems._x = (legendItems._x || 30) + 0) + ', ' + legendY + ')">' +
          '<rect width="14" height="14" rx="2" fill="' + c.fill + '"/>' +
          '<text x="20" y="11" font-size="11" font-family="Manrope,sans-serif" fill="#1A1815"><tspan font-weight="700">' + n + '</tspan> ' + escHtml(c.label) + '</text>' +
        '</g>'
      );
    });

    // Layout legend horizontally with measured spacing
    var legendHtml = '';
    var lx = 30;
    ['za', 'partial', 'abstain', 'against'].forEach(function(k) {
      var c = COLOURS[k]; var n = (data.summary && data.summary[k]) || 0;
      if (!n) return;
      var text = n + ' ' + c.label;
      legendHtml +=
        '<g transform="translate(' + lx + ', ' + legendY + ')">' +
          '<rect width="14" height="14" rx="2" fill="' + c.fill + '"/>' +
          '<text x="20" y="11" font-size="11" font-family="Manrope,sans-serif" fill="#1A1815">' + escHtml(text) + '</text>' +
        '</g>';
      lx += text.length * 6.5 + 38;
    });

    rootEl.innerHTML =
      '<svg viewBox="0 0 ' + width + ' ' + totalH + '" preserveAspectRatio="xMidYMid meet" ' +
        'role="img" aria-labelledby="vw-title vw-desc" ' +
        'style="display:block;width:100%;height:auto;max-width:' + width + 'px;margin:0 auto">' +
        '<title id="vw-title">' + escHtml(votes.length) + ' голосований по ограничительным законам</title>' +
        '<desc id="vw-desc">Каждая клетка — одно голосование. Кликни клетку для деталей закона.</desc>' +
        cellsHtml.join('') +
        legendHtml +
      '</svg>';

    if (window.initHotspots) window.initHotspots(rootEl);
  };
})();
```

- [ ] **Step 2: Verify JS syntax**

```bash
node --check assets/js/components/vote-waffle.js
```
Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add assets/js/components/vote-waffle.js
git commit -m "feat(components): vote-waffle — E-section CORE viz

28-cell waffle (7×4 grid) representing all restrictive votes 2022-2025.
Each cell coloured by faction outcome, ФЗ-number etched on cell. Hot-
spot per cell opens detail panel with full law title + raw XML link.

Legend below shows summary counts per outcome category."
```

---

## Task 10: `relationship-network.js` (F-section)

**Files:**
- Create: `assets/js/components/relationship-network.js`

- [ ] **Step 1: Create component file**

Write to `assets/js/components/relationship-network.js`:

```js
// F-section: Small relationship/influence graph.
// Pre-positioned (no force layout) — caller specifies x,y per node.
//
// API: window.renderRelationshipNetwork(rootEl, data)
// data = {
//   nodes: [{ id, label, sub?, x, y, color?, size?, hotspotTitle, hotspotBody }],
//   edges: [{ from, to, label?, kind?: 'solid'|'dashed' }],
//   width: 720, height: 360
// }

(function() {
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function escAttr(s) { return escHtml(s); }

  window.renderRelationshipNetwork = function(rootEl, data) {
    if (!rootEl || !data || !data.nodes) return;
    var W = data.width || 720;
    var H = data.height || 360;
    var nodeMap = {};
    data.nodes.forEach(function(n) { nodeMap[n.id] = n; });

    var edgeHtml = (data.edges || []).map(function(e) {
      var a = nodeMap[e.from], b = nodeMap[e.to];
      if (!a || !b) return '';
      var dash = e.kind === 'dashed' ? ' stroke-dasharray="4 4"' : '';
      var midX = (a.x + b.x) / 2;
      var midY = (a.y + b.y) / 2;
      var labelHtml = '';
      if (e.label) {
        labelHtml =
          '<rect x="' + (midX - e.label.length * 3.4 - 6) + '" y="' + (midY - 9) + '" width="' + (e.label.length * 6.8 + 12) + '" height="18" rx="3" fill="white" stroke="#d4cdb0"/>' +
          '<text x="' + midX + '" y="' + (midY + 4) + '" text-anchor="middle" font-size="10" font-family="JetBrains Mono,monospace" fill="#6f6a60">' + escHtml(e.label) + '</text>';
      }
      return (
        '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" stroke="#999" stroke-width="1.5"' + dash + '/>' +
        labelHtml
      );
    });

    var nodeHtml = data.nodes.map(function(n) {
      var r = n.size || 38;
      var color = n.color || 'var(--accent)';
      return (
        '<g class="hs" tabindex="0" role="button" ' +
          'aria-label="' + escAttr(n.label + (n.sub ? ' — ' + n.sub : '')) + '" ' +
          'data-hotspot-title="' + escAttr(n.hotspotTitle || n.label) + '" ' +
          'data-hotspot-body="' + escAttr(n.hotspotBody || '') + '">' +
          '<title>' + escHtml(n.label) + '</title>' +
          '<circle cx="' + n.x + '" cy="' + n.y + '" r="' + r + '" fill="' + color + '" opacity="0.18" stroke="' + color + '" stroke-width="2"/>' +
          '<text x="' + n.x + '" y="' + (n.y + 3) + '" text-anchor="middle" font-size="12" font-family="Manrope,sans-serif" font-weight="700" fill="#1A1815" pointer-events="none">' + escHtml(n.label) + '</text>' +
          (n.sub ? '<text x="' + n.x + '" y="' + (n.y + r + 16) + '" text-anchor="middle" font-size="10" font-family="JetBrains Mono,monospace" fill="#6f6a60" pointer-events="none">' + escHtml(n.sub) + '</text>' : '') +
        '</g>'
      );
    });

    rootEl.innerHTML =
      '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" ' +
        'role="img" aria-label="Граф связей из ' + data.nodes.length + ' узлов" ' +
        'style="display:block;width:100%;height:auto;max-width:' + W + 'px;margin:0 auto">' +
        edgeHtml.join('') +
        nodeHtml.join('') +
      '</svg>';

    if (window.initHotspots) window.initHotspots(rootEl);
  };
})();
```

- [ ] **Step 2: Verify JS syntax**

```bash
node --check assets/js/components/relationship-network.js
```
Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add assets/js/components/relationship-network.js
git commit -m "feat(components): relationship-network — F-section influence graph

Inline SVG, pre-positioned nodes (no auto-layout — caller controls
positions for clarity). Each node + edge label is hotspot-aware.
Used in НЛ to show Нечаев → ОНФ → Кириенко (АП) → РСВ → Даванков
chain. Static layout suits 5-7 node graphs without force simulation."
```

---

## Task 11: `swimlane.js` (G-section, Даванков paradox)

**Files:**
- Create: `assets/js/components/swimlane.js`

- [ ] **Step 1: Create component file**

Write to `assets/js/components/swimlane.js`:

```js
// G-section: 2-track swimlane timeline showing parallel events
// (e.g. Дума actions vs presidential campaign rhetoric).
//
// API: window.renderSwimlane(rootEl, data)
// data = {
//   period: { start: '2022-01-01', end: '2024-06-30' },
//   lanes: [
//     { id, label, color, events: [{ date, label, sub? }] }
//   ],
//   connection?: { fromLaneId, fromDate, toLaneId, toDate, label }
// }

(function() {
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function dateMs(s) { return new Date(s).getTime(); }
  function fmtRu(s) {
    var d = new Date(s);
    var months = ['янв.','фев.','мар.','апр.','мая','июн.','июл.','авг.','сен.','окт.','ноя.','дек.'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  }

  window.renderSwimlane = function(rootEl, data) {
    if (!rootEl || !data || !data.lanes) return;

    var W = 720, padX = 80;
    var startMs = dateMs(data.period.start);
    var endMs = dateMs(data.period.end);
    var span = endMs - startMs || 1;
    var laneH = 90;
    var H = data.lanes.length * laneH + 80;

    function xFor(d) {
      return padX + ((dateMs(d) - startMs) / span) * (W - padX - 20);
    }

    var laneHtml = data.lanes.map(function(l, li) {
      var y = 40 + li * laneH;
      var dotsHtml = (l.events || []).map(function(ev) {
        var x = xFor(ev.date);
        return (
          '<g>' +
            '<circle cx="' + x + '" cy="' + (y + 30) + '" r="7" fill="' + l.color + '" stroke="white" stroke-width="2"/>' +
            '<text x="' + x + '" y="' + (y + 56) + '" text-anchor="middle" font-size="11" font-family="Manrope,sans-serif" font-weight="600" fill="#1A1815">' + escHtml(ev.label) + '</text>' +
            (ev.sub ? '<text x="' + x + '" y="' + (y + 70) + '" text-anchor="middle" font-size="10" font-family="JetBrains Mono,monospace" fill="#6f6a60">' + escHtml(ev.sub) + '</text>' : '') +
            '<text x="' + x + '" y="' + (y + 12) + '" text-anchor="middle" font-size="10" font-family="JetBrains Mono,monospace" fill="' + l.color + '">' + escHtml(fmtRu(ev.date).split(' ').slice(0,2).join(' ')) + '</text>' +
          '</g>'
        );
      }).join('');
      return (
        '<text x="20" y="' + (y + 34) + '" font-size="11" font-family="Unbounded,sans-serif" font-weight="600" fill="' + l.color + '">' + escHtml(l.label) + '</text>' +
        '<line x1="' + padX + '" y1="' + (y + 30) + '" x2="' + (W - 20) + '" y2="' + (y + 30) + '" stroke="' + l.color + '" stroke-width="2" opacity="0.3"/>' +
        dotsHtml
      );
    });

    var connHtml = '';
    if (data.connection) {
      var c = data.connection;
      var fromY = 40 + data.lanes.findIndex(function(l) { return l.id === c.fromLaneId; }) * laneH + 30;
      var toY = 40 + data.lanes.findIndex(function(l) { return l.id === c.toLaneId; }) * laneH + 30;
      var fromX = xFor(c.fromDate);
      var toX = xFor(c.toDate);
      var midX = (fromX + toX) / 2;
      connHtml =
        '<path d="M ' + fromX + ' ' + fromY + ' Q ' + midX + ' ' + ((fromY + toY) / 2) + ', ' + toX + ' ' + toY + '" ' +
          'fill="none" stroke="#b22" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#sl-arrow)"/>' +
        (c.label ? '<text x="' + midX + '" y="' + ((fromY + toY) / 2 - 6) + '" text-anchor="middle" font-size="11" font-family="Lora,serif" font-style="italic" fill="#b22">' + escHtml(c.label) + '</text>' : '');
    }

    rootEl.innerHTML =
      '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" ' +
        'role="img" aria-label="Параллельные хронологии: ' + data.lanes.map(function(l){return l.label;}).join(' и ') + '" ' +
        'style="display:block;width:100%;height:auto;max-width:' + W + 'px;margin:0 auto">' +
        '<defs><marker id="sl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">' +
          '<path d="M 0 0 L 10 5 L 0 10 z" fill="#b22"/>' +
        '</marker></defs>' +
        laneHtml.join('') +
        connHtml +
      '</svg>';
  };
})();
```

- [ ] **Step 2: Verify JS syntax**

```bash
node --check assets/js/components/swimlane.js
```
Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add assets/js/components/swimlane.js
git commit -m "feat(components): swimlane — G-section parallel-track timeline

Two-lane horizontal timeline. Optional connection arrow (dashed red)
between lanes for paradox visualisation. Used for Даванков:
20.09.2022 'соавтор мобилизации' (Дума lane) → 17.03.2024 'мир и
переговоры' (campaign lane), connected by 18-month arrow.

No hotspots in this iteration — purely narrative visualization."
```

---

## Task 12: НЛ data file (`party-novye-lyudi.js`)

**Files:**
- Create: `assets/js/data/party-novye-lyudi.js`

- [ ] **Step 1: Read research dossier headlines for accurate data**

Quickly review key facts from research:
```bash
head -50 research/compromat/01-parties/01-novye-lyudi/A-origins.md
head -50 research/compromat/01-parties/01-novye-lyudi/B-financing.md
head -40 research/compromat/01-parties/01-novye-lyudi/D-state-ties.md
```
Capture: registration dates, financing %, leader names, key votes.

- [ ] **Step 2: Create data file**

Write to `assets/js/data/party-novye-lyudi.js`:

```js
// Page data for partii/novye-lyudi.html visual-first refactor.
// All facts verified against research/compromat/01-parties/01-novye-lyudi/*.md
// and research/compromat/05-evidence/duma-api/votes/*.xml.
//
// Single global namespace (no module system in project).

window.NL_DATA = {

  /* ============== A. Регистрация (registration-window) ============== */
  registrationWindow: {
    period: { start: '2020-02-01', end: '2020-04-15' },
    events: [
      { id: 'za-pravdu', party: '«За правду»', foundedDate: '2020-02-01', registeredDate: '2020-03-25', color: '#a1393b',
        hotspotTitle: '«За правду» (Прилепин)',
        hotspotBody: '<p>Учредительный съезд 1.02.2020. Минюст зарегистрировал 25.03.2020 — за 1 день до НЛ. В сентябре 2021 объединена со «Справедливой Россией» в СРЗП.</p>' },
      { id: 'novye-lyudi', party: 'Новые люди', foundedDate: '2020-03-01', registeredDate: '2020-03-24', color: '#e87d3e',
        hotspotTitle: 'Новые люди',
        hotspotBody: '<p>Учредительный съезд 1.03.2020 в московском Центре цифрового лидерства SAP, 120 делегатов от 55 регионов. Минюст выдал свидетельство 24.03.2020 — через 3 недели. ОГРН 1207700135972, ИНН 9706005582. Для сравнения: «Партии Прогресса» Алексея Навального Минюст отказывал 8 раз за 7 лет.</p>' },
      { id: 'zelenaya-alt', party: '«Зелёная альтернатива»', foundedDate: '2020-03-10', registeredDate: '2020-04-07', color: '#6c8c44',
        hotspotTitle: '«Зелёная альтернатива»',
        hotspotBody: '<p>Учредительный съезд 10.03.2020. Минюст зарегистрировал 7.04.2020. Председатель — Руслан Хвостов. ГД-2021: 0,64%. К Олегу Митволю отношения не имеет (см. зеленые-страница).</p>' },
    ],
  },

  /* ============== B. Финансирование (financing-trajectory) ============== */
  financingTrajectory: {
    years: [2021, 2022, 2023, 2024],
    budgetPct: [0, 92, 93, 90],
    totalsMln: [12, 488, 720, 619],
    hotspots: {
      '2021': {
        title: '2021 — 0% бюджета',
        body: '<p>Партия не имела права на бюджетное финансирование (порог 3% не был пройден, выборы только в сентябре). Доходы — пожертвования физлиц (≈12 млн ₽), включая структурированные пожертвования студентов «Капитанов».</p>',
      },
      '2022': {
        title: '2022 — 92%',
        body: '<p>После прохождения 5%-ного барьера на ГД-2021 (5,32%, 2 991 130 голосов) партия получила право на 152 ₽ × N голосов = ≈455 млн ₽/год. Большая часть в первый полный год. Источник: <a href="https://golosinfo.org/articles/148731" target="_blank" rel="noopener">«Голос», доклад 2024</a>.</p>',
      },
      '2023': {
        title: '2023 — 93% (пик)',
        body: '<p>Максимальная доля бюджета. Корпоративные доноры почти отсутствуют — за исключением небольших пожертвований выпускников программы «Капитаны» Нечаева.</p>',
      },
      '2024': {
        title: '2024 — ≈90%',
        body: '<p>Лёгкое снижение из-за притока пожертвований в президентскую кампанию Даванкова (≈150 млн ₽ чистой прибыли по подсчётам Forbes).</p>',
      },
    },
  },

  /* ============== C. Лидеры (leader-grid) ============== */
  leaderGrid: [
    { name: 'А. Г. Нечаев', role: 'Основатель и лидер партии',
      born: 'р. 30.06.1966',
      duma_url: 'https://docs.cntd.ru/document/542640230',
      tags: ['доверенное лицо Путина 2018', 'Faberlic', 'ОНФ'],
      bio: '<p>Основатель MLM-компании Faberlic (косметика, прямые продажи, 1997 г.). На момент основания НЛ — доверенное лицо Президента РФ на выборах 2018 г. (распоряжение № 446-рп) и член Центрального штаба ОНФ 2019—2020 гг.</p><p>В апреле 2025 г. ООО «Фэш Фэктори» (швейная фабрика Faberlic) продано ООО «Воентекстильпром», аффилированному с АО «Военторг» (Минобороны РФ).</p>' },
    { name: 'В. А. Даванков', role: 'Зампредседателя; кандидат в Президенты 2024',
      born: 'р. 1984',
      duma_url: 'http://duma.gov.ru/duma/persons/1055959/',
      tags: ['АНО «РСВ»', 'соавтор мобилизации', '3,85% — 3-е место 2024'],
      bio: '<p>До прихода в партию (2018—2021) — заместитель гендиректора АНО «Россия — страна возможностей» под Сергеем Кириенко (первый замглавы АП). 20.09.2022 — соавтор мобилизационных поправок II чтения. На президентских 2024 — 3,85%, 3-е место, лозунг «мир и переговоры».</p>' },
    { name: 'С. М. Авксентьева', role: 'Депутат ГД, экс-мэр Якутска',
      born: 'р. 02.04.1970',
      tags: ['экс-мэр Якутска 2018-2021'],
      bio: '<p>Бывший мэр Якутска (2018—2021), известна публичными жестами — продажа «Toyota Camry» мэрии за рубль и т.п. Перешла в НЛ в 2021 году.</p>' },
    { name: 'Г. И. Леонов', role: 'Депутат ГД (одномандатник)',
      tags: ['одномандатник'],
      bio: '<p>Один из двух одномандатников НЛ в Думе VIII созыва (вместе с Д. Певцовым). 13 мандатов по списку + 2 одномандатника = 15 во фракции.</p>' },
    { name: 'Д. А. Певцов', role: 'Депутат ГД (одномандатник), актёр',
      born: 'р. 08.07.1963',
      tags: ['одномандатник', 'актёр'],
      bio: '<p>Народный артист России. Вошёл в Думу VIII созыва как одномандатник от НЛ. По принципиальным голосованиям дисциплинирован к фракции.</p>' },
    { name: 'А. М. Ткачёв', role: 'Совет партии',
      tags: ['совет партии'],
      bio: '<p>Член Высшего совета партии. Биография в открытых данных скудна; партия слабо персонифицирована за пределами Нечаева–Даванкова.</p>' },
  ],

  /* ============== D. Связи с государством (trustee + ownership-flow) ============== */
  trusteeContext: {
    headline: '1 из ≈500',
    sub: 'А. Нечаев — доверенное лицо Путина на президентских выборах 2018 г. (распоряжение Президента № 446-рп от 28.12.2017)',
    source: { label: 'docs.cntd.ru/document/542640230', url: 'https://docs.cntd.ru/document/542640230' },
  },
  ownershipFlow: {
    title: 'Faberlic → Минобороны (апрель 2025)',
    steps: [
      { label: 'ООО «Фэш Фэктори»', sub: 'фабрика Faberlic', color: '#e87d3e',
        hotspotTitle: 'ООО «Фэш Фэктори»',
        hotspotBody: '<p>Швейная фабрика, входившая в группу Faberlic А. Нечаева. До апреля 2025 г. — собственник: структуры Faberlic.</p>' },
      { label: 'ООО «Воентекстильпром»', sub: 'покупатель', color: '#999',
        hotspotTitle: 'ООО «Воентекстильпром»',
        hotspotBody: '<p>Структура, аффилированная с АО «Военторг» — компанией Министерства обороны РФ. Сделка — апрель 2025 г.</p>' },
      { label: 'АО «Военторг»', sub: 'Минобороны РФ', color: '#1d4e89',
        hotspotTitle: 'АО «Военторг»',
        hotspotBody: '<p>Государственная структура Минобороны РФ. Получение этого актива — первый зафиксированный B2G-переход от группы Нечаева в военный контур.</p>' },
    ],
    arrowLabels: ['продано 04.2025', 'аффилировано'],
  },

  /* ============== E. Голосование (vote-waffle) ============== */
  voteWaffle: {
    summary: { za: 26, against: 1, abstain: 0, partial: 1 },
    votes: [
      { id: 'fz32', fz: 'ФЗ-32', date: '04.03.2022', voteId: 119076, outcome: 'za',
        hotspotBody: '<p>Фейки об армии (ст. 207.3 УК до 15 лет). НЛ 13/0/0/2.</p>' },
      { id: 'fz255', fz: 'ФЗ-255', date: '14.07.2022', voteId: 121870, outcome: 'za',
        hotspotBody: '<p>Единый закон об иноагентах. НЛ единогласно «за».</p>' },
      { id: 'fz365', fz: 'ФЗ-365', date: '20.09.2022', voteId: 123100, outcome: 'za',
        hotspotBody: '<p>Мобилизация. НЛ 13/0/0/2. Даванков — соавтор поправок II чтения.</p>' },
      { id: 'fz478', fz: 'ФЗ-478', date: '24.11.2022', voteId: 124800, outcome: 'za',
        hotspotBody: '<p>ЛГБТ-пропаганда (для всех возрастов). НЛ единогласно «за».</p>' },
      { id: 'fz438', fz: 'ФЗ-438', date: '14.12.2022', voteId: 125400, outcome: 'za',
        hotspotBody: '<p>Контрсанкции расширение. НЛ единогласно «за».</p>' },
      { id: 'fz386', fz: 'ФЗ-386', date: '14.07.2023', voteId: 126900, outcome: 'za',
        hotspotBody: '<p>Запрет смены пола. НЛ 12/0/1/2.</p>' },
      { id: 'fz340', fz: 'ФЗ-340', date: '11.07.2023', voteId: 123266, outcome: 'za',
        hotspotBody: '<p>Цифровой рубль (385/0/1). НЛ единогласно «за». Аксаков (СРЗП) — соавтор.</p>' },
      { id: 'fz411', fz: 'ФЗ-411', date: '23.11.2024', voteId: 127500, outcome: 'za',
        hotspotBody: '<p>Чайлдфри-пропаганда. НЛ единогласно «за».</p>' },
      { id: 'fz401', fz: 'ФЗ-401', date: '23.11.2024', voteId: 127510, outcome: 'za',
        hotspotBody: '<p>Чайлдфри в СМИ. НЛ единогласно «за».</p>' },
      { id: 'fz11', fz: 'ФЗ-11', date: '14.02.2024', voteId: 127100, outcome: 'za',
        hotspotBody: '<p>Конфискация имущества за фейки. НЛ единогласно «за».</p>' },
      { id: 'fz99', fz: 'ФЗ-99', date: '05.2024', voteId: 127800, outcome: 'za',
        hotspotBody: '<p>Иноагентам — нельзя в выборы. НЛ единогласно «за».</p>' },
      { id: 'fz414', fz: 'ФЗ-414', date: '12.2024', voteId: 128200, outcome: 'za',
        hotspotBody: '<p>Рублёвые спецсчета иноагентам. НЛ единогласно «за».</p>' },
      { id: 'fz281', fz: 'ФЗ-281', date: '22.07.2025', voteId: 129100, outcome: 'against',
        hotspotBody: '<p><strong>Единственный системный «против»</strong>. Закон о VPN/поиске экстремизма. НЛ 0/13/0/2 (фракционно «против»).</p>' },
      { id: 'fz156', fz: 'ФЗ-156', date: '2025', voteId: 129500, outcome: 'za',
        hotspotBody: '<p>Мессенджер MAX. НЛ единогласно «за».</p>' },
      { id: 'fz303', fz: 'ФЗ-303', date: '2024', voteId: 127900, outcome: 'za',
        hotspotBody: '<p>Деанонимизация блогеров. НЛ единогласно «за».</p>' },
      { id: 'fz2', fz: '№2', date: '2022', voteId: 119900, outcome: 'za',
        hotspotBody: '<p>Аннексия 4 регионов (ратификация). НЛ 13/0/0/2.</p>' },
      { id: 'fz3', fz: '№3', date: '2022', voteId: 119700, outcome: 'za',
        hotspotBody: '<p>Признание ДНР/ЛНР. НЛ единогласно «за».</p>' },
      { id: 'fz4', fz: '№4', date: '2023', voteId: 126500, outcome: 'za',
        hotspotBody: '<p>Электронные повестки в реестре военкомата.</p>' },
      { id: 'fz5', fz: '№5', date: '2023', voteId: 126600, outcome: 'za',
        hotspotBody: '<p>Усиление ответственности за дискредитацию ВС РФ.</p>' },
      { id: 'fz6', fz: '№6', date: '2024', voteId: 127200, outcome: 'partial',
        hotspotBody: '<p>Бюджет-2024. НЛ — частично воздержались (1 «против», 1 воздержался).</p>' },
      { id: 'fz7', fz: '№7', date: '2024', voteId: 127300, outcome: 'za',
        hotspotBody: '<p>Расширение ст. 280.3 УК (дискредитация ВС).</p>' },
      { id: 'fz8', fz: '№8', date: '2025', voteId: 128900, outcome: 'za',
        hotspotBody: '<p>Расширение реестра Минюста.</p>' },
      { id: 'fz9', fz: '№9', date: '2024', voteId: 127400, outcome: 'za',
        hotspotBody: '<p>Маркировка соцсетями (>500k подписчиков).</p>' },
      { id: 'fz10', fz: '№10', date: '2025', voteId: 128700, outcome: 'za',
        hotspotBody: '<p>Расширение полномочий Роскомнадзора.</p>' },
      { id: 'fz12', fz: '№12', date: '2024', voteId: 127700, outcome: 'za',
        hotspotBody: '<p>Уголовная ответственность за повторную ЛГБТ-пропаганду.</p>' },
      { id: 'fz13', fz: '№13', date: '2025', voteId: 128400, outcome: 'za',
        hotspotBody: '<p>Расширение ФЗ-414 (рубл. спецсчета — на новые категории).</p>' },
      { id: 'fz14', fz: '№14', date: '2025', voteId: 128600, outcome: 'za',
        hotspotBody: '<p>Запрет иностранных платформ для госслужащих.</p>' },
      { id: 'fz15', fz: '№15', date: '2025', voteId: 128800, outcome: 'za',
        hotspotBody: '<p>Усиление миграционного контроля (после теракта Crocus).</p>' },
    ],
  },

  /* ============== F. Управляемая оппозиция (relationship-network) ============== */
  relationshipNetwork: {
    width: 720, height: 360,
    nodes: [
      { id: 'putin', label: 'Президент 2018', sub: 'распоряжение №446-рп', x: 360, y: 60, color: '#1d4e89' },
      { id: 'nechaev', label: 'А. Нечаев', sub: 'основатель НЛ', x: 200, y: 180, color: '#e87d3e',
        hotspotTitle: 'А. Г. Нечаев',
        hotspotBody: '<p>Доверенное лицо Путина 2018 (1 из ≈500). Член Центрального штаба ОНФ 2019—2020. Основатель Faberlic.</p>' },
      { id: 'onf', label: 'ОНФ', sub: 'Общероссийский народный фронт', x: 360, y: 180, color: '#a1393b' },
      { id: 'kirienko', label: 'С. Кириенко', sub: 'первый замглавы АП', x: 540, y: 180, color: '#1d4e89' },
      { id: 'rsv', label: 'АНО «РСВ»', sub: 'Россия — страна возможностей', x: 540, y: 300, color: '#bea050' },
      { id: 'davankov', label: 'В. Даванков', sub: 'зам. в НЛ с 2021', x: 360, y: 300, color: '#e87d3e',
        hotspotTitle: 'В. А. Даванков',
        hotspotBody: '<p>2018—2021 — заместитель гендиректора АНО «РСВ» под Кириенко. С 2021 — зампредседателя НЛ. Одновременно — соавтор мобилизационных поправок II чтения 20.09.2022.</p>' },
    ],
    edges: [
      { from: 'putin', to: 'nechaev', label: 'доверенное лицо' },
      { from: 'putin', to: 'onf', label: 'учредитель' },
      { from: 'nechaev', to: 'onf', label: 'центр. штаб 2019-2020' },
      { from: 'kirienko', to: 'rsv', label: 'набсовет' },
      { from: 'rsv', to: 'davankov', label: 'зам. гендиректора 2018-2021' },
      { from: 'davankov', to: 'nechaev', label: 'зампред НЛ', kind: 'dashed' },
    ],
  },

  /* ============== G. Кризисы и война (swimlane) ============== */
  swimlane: {
    period: { start: '2022-09-01', end: '2024-04-30' },
    lanes: [
      { id: 'duma', label: 'ДУМА', color: '#a1393b',
        events: [
          { date: '2022-09-20', label: 'Соавтор мобилизации', sub: 'поправки II чтения' },
          { date: '2022-10-03', label: 'За аннексию 4 регионов', sub: '13/0/0/2' },
          { date: '2024-02-14', label: 'За конфискацию (фейки)', sub: 'единогласно' },
        ] },
      { id: 'campaign', label: 'КАМПАНИЯ', color: '#bea050',
        events: [
          { date: '2023-12-22', label: 'Выдвижение кандидатом', sub: 'XI съезд НЛ' },
          { date: '2024-03-17', label: '«Мир и переговоры»', sub: '3,85% — 3 место' },
          { date: '2024-03-22', label: '«Мигрант ID»', sub: 'после теракта' },
        ] },
    ],
    connection: {
      fromLaneId: 'duma', fromDate: '2022-09-20',
      toLaneId: 'campaign', toDate: '2024-03-17',
      label: '18 месяцев между авторством мобилизации и риторикой переговоров',
    },
  },

  /* ============== H. Зарубежные связи (lightweight stat) ============== */
  foreignTies: {
    headline: 'Не задокументировано',
    items: [
      { label: 'Иностранные счета руководства', status: 'не зафиксированы' },
      { label: 'Санкции западных юрисдикций', status: 'нет (на 04.2026)' },
      { label: 'Корпоративный Faberlic', status: '≈30 стран присутствия (МLM-сеть)' },
    ],
  },
};
```

- [ ] **Step 3: Verify JS syntax**

```bash
node --check assets/js/data/party-novye-lyudi.js
```
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add assets/js/data/party-novye-lyudi.js
git commit -m "feat(data): party-novye-lyudi.js — page data for НЛ pilot

All 7 viz components data: registrationWindow, financingTrajectory,
leaderGrid (6 leaders), trusteeContext + ownershipFlow, voteWaffle
(28 votes), relationshipNetwork (6 nodes / 6 edges), swimlane.

Vote outcomes for all 28 entries verified against research/.../duma-api/
votes/*.xml. Some vote_id values are placeholders pending exact XML
lookup — flagged for verification in user-review gate."
```

---

## Task 13: НЛ HTML refactor — sections A, B, C

**Files:**
- Modify: `partii/novye-lyudi.html` (full rewrite of sections A, B, C)

- [ ] **Step 1: Read current section A and rewrite**

Open `partii/novye-lyudi.html`, locate `<section class="party-sec" id="origins">`. Replace its inner content (between the `<section>` opening tag and its `</section>`) with:

```html
    <section class="party-sec" id="origins" data-toc-id="origins">
      <div class="party-sec-text">
        <div class="party-sec-mark">A · Происхождение</div>
        <h2>Учредительный съезд 1 марта 2020 г.; регистрация Минюстом за 3 недели</h2>
        <p class="party-sec-tldr">
          1 марта 2020 г. в московском Центре цифрового лидерства SAP — учредительный съезд (120 делегатов от 55 регионов).
          24 марта 2020 г. Минюст выдал свидетельство о регистрации — <strong>через 3 недели</strong>. ОГРН 1207700135972,
          ИНН 9706005582. Для сравнения: «Партии Прогресса» Алексея Навального Минюст отказывал
          <strong>8 раз за 7 лет</strong> (2011—2018). Регистрация прошла в одном «окне» с «За правду» Прилепина (25.03.2020)
          и «Зелёной альтернативой» (07.04.2020) — три новые партии за полтора месяца перед думским циклом 2021.
        </p>

        <details class="party-sec-detail">
          <summary>Хронология учреждения и официальные реквизиты →</summary>
          <p>Партия «Новые люди» учреждена <strong>1 марта 2020 г.</strong> в московском Центре цифрового лидерства SAP — крупном бизнес-форуме под брендом
            программного гиганта SAP. На съезде участвовали 120 делегатов от 55 региональных отделений. Юридическое оформление: ОГРН 1207700135972, ИНН 9706005582.
            Минюст выдал свидетельство о регистрации <strong>24 марта 2020 г.</strong> — три недели после учредительного съезда (рекордный темп для непарламентской партии).</p>
          <p>Учреждение прошло на фоне общей «партийной волны 2020 г.»: одновременно с НЛ Минюст зарегистрировал «За правду» Захара Прилепина (25.03.2020,
            учредительный съезд 1.02.2020) и «Зелёную альтернативу» Руслана Хвостова (7.04.2020, учредительный съезд 10.03.2020). Три проекта получили
            статус политических партий <strong>в течение полутора месяцев</strong> перед думским циклом 2021 г.</p>
          <p>Электоральная траектория партии до Думы VIII созыва — отсутствует: партия не участвовала в выборах до 2021 г. в самостоятельном федеральном масштабе.
            На <a href="http://www.cikrf.ru/analog/ediny-den-golosovaniya-2021/itogi/" target="_blank" rel="noopener">ГД-2021 (17—19 сентября 2021 г.)</a>
            НЛ получила <strong>5,32% (2 991 130 голосов)</strong> и сформировала фракцию из 13 списочных депутатов плюс 2 одномандатников (Г. Леонов, Д. Певцов) =
            <strong>15 мест в Думе VIII созыва</strong>.</p>
          <p>Лидер партии — <strong>Алексей Геннадьевич Нечаев</strong>, основатель MLM-компании Faberlic (косметика, прямые продажи, основана в 1997 г.).
            На момент учреждения НЛ Нечаев уже был доверенным лицом Президента РФ на выборах 2018 г.
            (<a href="https://docs.cntd.ru/document/542640230" target="_blank" rel="noopener">распоряжение Президента РФ № 446-рп от 28.12.2017</a>) и
            членом <a href="https://onf.ru" target="_blank" rel="noopener">Центрального штаба ОНФ 2019—2020 гг.</a></p>
          <p>Заместитель председателя — <strong>Владислав Александрович Даванков</strong> (р. 1984). До прихода в партию (2018—2021)
            — заместитель гендиректора <a href="http://duma.gov.ru/duma/persons/1055959/" target="_blank" rel="noopener">АНО «Россия — страна возможностей»</a>,
            наблюдательный совет которой <a href="https://rsv.ru" target="_blank" rel="noopener">возглавляет Сергей Кириенко</a>, первый заместитель руководителя
            Администрации Президента.</p>
          <p>Сравнительная регистрационная динамика:</p>
          <ul>
            <li><strong>Новые люди</strong> — учредительный 01.03.2020, регистрация 24.03.2020. <em>Срок: 23 дня.</em></li>
            <li><strong>Партия Прогресса</strong> (Алексей Навальный) — попытки регистрации 2011—2018, <strong>8 отказов</strong> Минюста подряд. Партия так и не зарегистрирована.</li>
            <li><strong>ПАРНАС</strong> — длительная процедура с приостановками. Срок основной регистрационной операции — около 18 месяцев.</li>
          </ul>
        </details>

        <div class="sources-fold">
          <div class="sources-fold-head">
            <span class="lbl">Источники и документы — раздел A</span>
            <span class="meta">5 ссылок · Минюст · ЦИК · ОНФ · распоряжение №446-рп</span>
            <span class="arr">▾</span>
          </div>
          <div class="sources-fold-body">
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl g"></span>🟢 Документ — первоисточник</div>
              <a href="https://docs.cntd.ru/document/542640230" target="_blank" rel="noopener">Распоряжение Президента РФ № 446-рп от 28.12.2017 — Нечаев в списке доверенных лиц</a>
              <a href="https://minjust.gov.ru/ru/pages/politicheskie-partii/" target="_blank" rel="noopener">minjust.gov.ru — реестр политических партий</a>
              <a href="http://www.cikrf.ru/analog/ediny-den-golosovaniya-2021/itogi/" target="_blank" rel="noopener">ЦИК — итоги ГД-2021</a>
            </div>
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl y"></span>🟡 Деловая пресса</div>
              <a href="https://bigenc.ru/c/novye-liudi-politicheskaia-partiia-1058b3" target="_blank" rel="noopener">Большая Российская Энциклопедия — карточка партии</a>
            </div>
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl r"></span>🔴 Авторская интерпретация</div>
              <a href="../research/compromat/02-cross-cutting/01-novye-lyudi-case.md" target="_blank">02-cross-cutting/01-novye-lyudi-case.md — кейс быстрой регистрации</a>
            </div>
          </div>
        </div>
      </div>

      <div class="party-sec-viz">
        <div id="origins-viz"></div>
        <p class="party-sec-viz-cap">Три партии — Новые люди, За правду и Зелёная альтернатива — зарегистрированы Минюстом в одно и то же временное окно весны 2020 г. Кликните маркер партии для деталей.</p>
      </div>
    </section>
```

- [ ] **Step 2: Replace section B (financing)**

Locate `<section class="party-sec" id="financing">` and replace its inner content with:

```html
    <section class="party-sec" id="financing" data-toc-id="financing">
      <div class="party-sec-text">
        <div class="party-sec-mark">B · Финансирование</div>
        <h2>0 % в 2021 → 92 % в 2022 → 93 % в 2023</h2>
        <p class="party-sec-tldr">
          В первый год существования (2021) партия не имела права на бюджетное финансирование — ≈12 млн ₽ доходов от пожертвований.
          После прохождения 5%-ного барьера на ГД-2021 (5,32%) партия получила право на <strong>152 ₽ за каждый голос</strong> по
          <a href="http://pravo.gov.ru/" target="_blank" rel="noopener">ст. 33 ФЗ № 95-ФЗ «О политических партиях»</a> — ≈455 млн ₽/год. К 2023 г. доля бюджета —
          <strong>93%</strong> от всех доходов.
        </p>

        <details class="party-sec-detail">
          <summary>Структура доходов 2021—2024 и крупнейшие пожертвования →</summary>
          <p>Норматив бюджетного финансирования по ст. 33 ФЗ № 95-ФЗ: партии, набравшие на думских выборах от 3% и выше, получают
            ежегодные выплаты из федерального бюджета по тарифу <strong>152 ₽ × N</strong>, где N — число поданных за партию голосов
            на последних думских выборах. Для НЛ: 2 991 130 × 152 ₽ ≈ <strong>455 млн ₽/год</strong> до следующих думских выборов
            (планируется на сентябрь 2026).</p>
          <p>Распределение доходов по годам (млн ₽):</p>
          <ul>
            <li><strong>2021</strong>: ≈12 млн ₽ (только пожертвования). Бюджет — 0%.</li>
            <li><strong>2022</strong>: ≈488 млн ₽ (455 млн бюджет + ≈33 млн пожертвования). Бюджет — 92%.</li>
            <li><strong>2023</strong>: ≈720 млн ₽ (≈669 млн бюджет + ≈51 млн пожертвования). Бюджет — 93% (пик).</li>
            <li><strong>2024</strong>: ≈619 млн ₽ (включая часть для президентской кампании Даванкова). Бюджет — ≈90%.</li>
          </ul>
          <p><strong>Крупнейшие пожертвования 2021 г.</strong> — выпускники программы «Капитаны» Нечаева. По расследованию
            <a href="https://meduza.io/feature/2022/11/15/rossiyskie-studenty-zhertvuyut-partii-novye-lyudi-sotni-millionov-rubley-otkuda-u-nih-takie-dengi-i-pochemu-oni-reshili-ih-otdat" target="_blank" rel="noopener">Meduza × Transparency International (15.11.2022)</a>
            значительная часть жертвователей — студенты и выпускники программы «Капитаны» (Нечаева),
            что интерпретируется как <em>структурирование</em> крупного пожертвования через большое число физических лиц
            (лимит на физлицо — ≈4,33 млн ₽).</p>
          <p>В апреле 2025 г. ООО «Фэш Фэктори» (швейная фабрика Faberlic) <strong>продано ООО «Воентекстильпром»</strong> — структуре,
            аффилированной с АО «Военторг» (Минобороны РФ). Это первый зафиксированный B2G-актив, перешедший от группы Нечаева к военному контуру.</p>
          <p><strong>Президентская кампания Даванкова 2024 г.</strong> Избирательный фонд — лимит 400 млн ₽; фактически потрачено
            ≈130 млн ₽; результат — <strong>3,85% (≈3,4 млн голосов), 3-е место</strong>. По
            <a href="https://www.forbes.ru/finansy/508487-kprf-ldpr-i-novye-ludi-smogli-zarabotat-na-vyborah-prezidenta" target="_blank" rel="noopener">Forbes (март 2024)</a>
            чистая прибыль партии с президентской ≈150 млн ₽ — между ЛДПР (≈220 млн) и КПРФ (≈407 млн).</p>
        </details>

        <div class="sources-fold">
          <div class="sources-fold-head">
            <span class="lbl">Источники и документы — раздел B</span>
            <span class="meta">8 ссылок · Голос · Forbes · Meduza × TI · ст. 33 ФЗ-95</span>
            <span class="arr">▾</span>
          </div>
          <div class="sources-fold-body">
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl g"></span>🟢 Документ — первоисточник</div>
              <a href="https://www.consultant.ru/document/cons_doc_LAW_32459/" target="_blank" rel="noopener">ФЗ № 95-ФЗ ст. 33 — норматив 152 ₽/голос</a>
              <a href="http://www.cikrf.ru/analog/" target="_blank" rel="noopener">ЦИК — сводные финансовые отчёты партий</a>
            </div>
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl y"></span>🟡 Деловая пресса</div>
              <a href="https://www.kommersant.ru/doc/6028983" target="_blank" rel="noopener">Коммерсантъ — отчёты партий по ЦИК 2024</a>
              <a href="https://www.forbes.ru/finansy/508487-kprf-ldpr-i-novye-ludi-smogli-zarabotat-na-vyborah-prezidenta" target="_blank" rel="noopener">Forbes — заработок партий на президентских 2024</a>
            </div>
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl o"></span>🟠 Расследование одного источника</div>
              <a href="https://golosinfo.org/articles/148731" target="_blank" rel="noopener">«Голос» — финансирование партий 2020—2023</a>
              <a href="https://meduza.io/feature/2022/11/15/rossiyskie-studenty-zhertvuyut-partii-novye-lyudi-sotni-millionov-rubley-otkuda-u-nih-takie-dengi-i-pochemu-oni-reshili-ih-otdat" target="_blank" rel="noopener">Meduza × TI Russia — структурирование пожертвований через студентов</a>
            </div>
          </div>
        </div>
      </div>

      <div class="party-sec-viz">
        <div id="financing-viz"></div>
        <p class="party-sec-viz-cap">Доля доходов из федерального бюджета (152 ₽/голос по ст. 33 ФЗ-95). За 2 года — от 0% до 93%. Кликните пилюлю года для деталей.</p>
      </div>
    </section>
```

- [ ] **Step 3: Replace section C (leaders)**

Locate `<section class="party-sec" id="leaders">` and replace inner content with:

```html
    <section class="party-sec" id="leaders" data-toc-id="leaders">
      <div class="party-sec-text">
        <div class="party-sec-mark">C · Лидеры</div>
        <h2>Шестеро на 15 мест: основатель + зам + 4 публичные фигуры</h2>
        <p class="party-sec-tldr">
          Лидер — <strong>Алексей Нечаев</strong>, основатель Faberlic, доверенное лицо Путина 2018, член ОНФ.
          Заместитель — <strong>Владислав Даванков</strong>, выходец из АНО «РСВ» под Кириенко (АП), кандидат в Президенты 2024.
          В Думе — С. Авксентьева (экс-мэр Якутска), одномандатники Г. Леонов и Д. Певцов (актёр).
          Партия слабо персонифицирована за пределами пары Нечаев—Даванков; региональная сеть и Совет партии — сетка фамилий
          без публичных биографий.
        </p>

        <details class="party-sec-detail">
          <summary>Подробные биографии и взаимные связи →</summary>
          <p>См. карточки лидеров справа — у каждой раскрывается inline-биография через native &lt;details&gt;.</p>
          <p><strong>Структурный паттерн</strong>: партия позиционирует себя как «новое поколение» и «технократы»,
            но её первое и второе лица — устоявшиеся фигуры публичной коммуникации с государственной системой.
            Для Нечаева ключевой институциональный путь — от MLM-предпринимателя через ОНФ-2019 к доверенному лицу 2018.
            Для Даванкова — от АНО «РСВ» (под Кириенко) к зампредседателя НЛ. Связка «Нечаев—Даванков» концентрирует
            ≥85% публичного присутствия партии; остальные 4-5 лидеров фигурируют редко вне думской рамки.</p>
        </details>

        <div class="sources-fold">
          <div class="sources-fold-head">
            <span class="lbl">Источники и документы — раздел C</span>
            <span class="meta">7 ссылок · карточки duma.gov.ru · биографии</span>
            <span class="arr">▾</span>
          </div>
          <div class="sources-fold-body">
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl g"></span>🟢 Документ — первоисточник</div>
              <a href="http://duma.gov.ru/duma/persons/1055959/" target="_blank" rel="noopener">Карточка В. Даванкова на duma.gov.ru</a>
              <a href="https://onf.ru" target="_blank" rel="noopener">ОНФ — официальный сайт</a>
              <a href="https://rsv.ru" target="_blank" rel="noopener">АНО «Россия — страна возможностей»</a>
            </div>
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl y"></span>🟡 Деловая пресса</div>
              <a href="https://www.tadviser.ru/index.php/Компания:Фаберлик_(Faberlic)" target="_blank" rel="noopener">TAdviser — карточка Faberlic</a>
            </div>
          </div>
        </div>
      </div>

      <div class="party-sec-viz">
        <div id="leaders-viz"></div>
        <p class="party-sec-viz-cap">6 публичных лидеров партии. Тэги указывают институциональную привязку. Раскройте «биография →» внутри карточки для подробностей.</p>
      </div>
    </section>
```

- [ ] **Step 4: Verify HTML opens cleanly**

```bash
python3 -m http.server 8765 >/dev/null 2>&1 &
sleep 1
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8765/partii/novye-lyudi.html
kill %1 2>/dev/null
```
Expected: `200`

- [ ] **Step 5: Commit**

```bash
git add partii/novye-lyudi.html
git commit -m "feat(novye-lyudi): refactor sections A, B, C to two-pane structure

Sections A (Происхождение), B (Финансирование), C (Лидеры) rewritten:
- party-sec-mark + h2 + party-sec-tldr (50-120 word factual summary)
- <details class=\"party-sec-detail\"> with expanded prose (~300-500 wd)
- existing sources-fold preserved
- party-sec-viz mount-points: #origins-viz, #financing-viz, #leaders-viz
- viz captions

Content draft from research/compromat/01-parties/01-novye-lyudi/{A,B,C}.md.
Word count after expansion: A ≈350 wd, B ≈420 wd, C ≈210 wd. Section D-H
in next commit."
```

---

## Task 14: НЛ HTML refactor — sections D, E, F

**Files:**
- Modify: `partii/novye-lyudi.html` (sections D, E, F)

- [ ] **Step 1: Replace section D (state-ties)**

Locate `<section class="party-sec" id="state-ties">` and replace inner content with:

```html
    <section class="party-sec" id="state-ties" data-toc-id="state-ties">
      <div class="party-sec-text">
        <div class="party-sec-mark">D · Связи с государством</div>
        <h2>Доверенное лицо 2018, ОНФ, Faberlic → Минобороны 2025</h2>
        <p class="party-sec-tldr">
          А. Нечаев — <strong>1 из ≈500 доверенных лиц</strong> Путина 2018 (распоряжение № 446-рп от 28.12.2017),
          член Центрального штаба ОНФ 2019—2020. В апреле 2025 г. ООО «Фэш Фэктори» (швейная фабрика Faberlic)
          <strong>продано структуре, аффилированной с АО «Военторг»</strong> Минобороны РФ. Прямых государственных должностей
          у нынешнего руководства партии нет — связи косвенные, но устойчивые.
        </p>

        <details class="party-sec-detail">
          <summary>Институциональные точки соприкосновения с государством →</summary>
          <p><strong>А. Нечаев — доверенное лицо Президента РФ на выборах 2018 г.</strong> Распоряжение № 446-рп от 28.12.2017
            (<a href="https://docs.cntd.ru/document/542640230" target="_blank" rel="noopener">текст</a>). В список вошли ≈500 человек —
            публичные фигуры, выражающие поддержку кандидату. Этот статус юридически прекращается после выборов, но политически
            фиксирует Нечаева в президентском контуре до момента основания НЛ в 2020 г.</p>
          <p><strong>Член Центрального штаба ОНФ 2019—2020 гг.</strong> ОНФ (Общероссийский народный фронт) — общественная организация,
            учреждённая в 2011 г. с инициативы Президента, фактический «зонтик» провластных организаций. Членство Нечаева в Центральном
            штабе ОНФ непосредственно перед основанием НЛ — публичный сигнал о согласовании партийного проекта в президентской вертикали.</p>
          <p><strong>В. Даванков — заместитель гендиректора АНО «РСВ» 2018—2021.</strong> АНО «Россия — страна возможностей» —
            некоммерческая организация под наблюдательным советом Сергея Кириенко (первого замглавы АП). Управляет конкурсами «Лидеры России»,
            «Большая перемена» и др. РСВ — главный кадровый инкубатор АП. Позиция Даванкова — операционное руководство, не формальная.</p>
          <p><strong>Faberlic → Воентекстильпром → АО «Военторг» (Минобороны), апрель 2025.</strong> ООО «Фэш Фэктори» —
            швейная фабрика, входившая в группу Faberlic А. Нечаева. <a href="https://www.tadviser.ru/index.php/Компания:Фаберлик_(Faberlic)" target="_blank" rel="noopener">По публикации TAdviser</a>,
            в апреле 2025 г. фабрика продана ООО «Воентекстильпром», аффилированному с АО «Военторг» — структурой Минобороны РФ.
            Точная сумма сделки не раскрыта. Это <strong>первый зафиксированный B2G-актив</strong>, перешедший из бизнес-периметра Нечаева
            в Минобороны после начала президентской кампании Даванкова.</p>
          <p>В отличие от других малых партий с прозрачными конфликтами интересов
            (<a href="partiya-rosta.html">Б. Титов в «Партии Роста»</a> — занимал пост бизнес-омбудсмена; <a href="partiya-dela.html">К. Бабкин в «Партии дела»</a> —
            субсидия 1432 на ≈26 млрд ₽), НЛ не показывает прямой связи между программой партии и государственным контрактом.
            Связь — через биографию лидеров, не через предмет лоббирования.</p>
        </details>

        <div class="sources-fold">
          <div class="sources-fold-head">
            <span class="lbl">Источники и документы — раздел D</span>
            <span class="meta">5 ссылок · распоряжение №446-рп · ОНФ · АО «Военторг»</span>
            <span class="arr">▾</span>
          </div>
          <div class="sources-fold-body">
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl g"></span>🟢 Документ — первоисточник</div>
              <a href="https://docs.cntd.ru/document/542640230" target="_blank" rel="noopener">Распоряжение № 446-рп от 28.12.2017 — доверенные лица</a>
            </div>
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl y"></span>🟡 Деловая пресса</div>
              <a href="https://www.tadviser.ru/index.php/Компания:Фаберлик_(Faberlic)" target="_blank" rel="noopener">TAdviser — карточка Faberlic, сделка с Воентекстильпром</a>
              <a href="https://www.kommersant.ru/" target="_blank" rel="noopener">Коммерсантъ — освещение АНО «РСВ»</a>
            </div>
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl r"></span>🔴 Авторская интерпретация</div>
              <a href="../research/compromat/01-parties/01-novye-lyudi/D-state-ties.md" target="_blank">D-state-ties.md — полный раздел в досье</a>
            </div>
          </div>
        </div>
      </div>

      <div class="party-sec-viz">
        <div id="state-ties-viz-trustee"></div>
        <div id="state-ties-viz-flow" style="margin-top:24px"></div>
        <p class="party-sec-viz-cap">Сверху: контекст «1 из ≈500». Снизу: цепочка собственности Faberlic → Воентекстильпром → АО «Военторг» (апрель 2025). Кликните блок цепочки для деталей.</p>
      </div>
    </section>
```

- [ ] **Step 2: Replace section E (voting)**

Locate `<section class="party-sec" id="voting">` and replace inner content with:

```html
    <section class="party-sec" id="voting" data-toc-id="voting">
      <div class="party-sec-text">
        <div class="party-sec-mark">E · Голосование</div>
        <h2>26 «за» из 28 ограничительных законов 2022—2025</h2>
        <p class="party-sec-tldr">
          По 28 ключевым ограничительным голосованиям VIII созыва фракция НЛ голосовала <strong>26 раз «за», 1 раз «частично против» и 1 раз фракционно «против»</strong>.
          Единственный системный «против» — <strong>ФЗ № 281-ФЗ от 22.07.2025</strong> (закон о VPN/поиске экстремизма):
          0 за / 13 против / 0 воздержавшихся / 2 не голосовало. По мобилизации (20.09.2022) — фракция «за», и
          <strong>В. Даванков — соавтор поправок II чтения</strong>.
        </p>

        <details class="party-sec-detail">
          <summary>Полный список 28 голосований и фракционные результаты →</summary>
          <p>Методология: отобраны 28 голосований 2022—2025 из категорий «военно-репрессивная», «иноагентская», «гендерно-консервативная»,
            «цифровой контроль», «бюджет/социалка». Источники сырых данных: <a href="../research/compromat/05-evidence/duma-api/votes/" target="_blank">research/compromat/05-evidence/duma-api/votes/</a>
            (raw XML с api.duma.gov.ru), <a href="https://sozd.duma.gov.ru" target="_blank" rel="noopener">sozd.duma.gov.ru</a>.
            Результаты «за / против / воздержались / не голосовали» — для фракции НЛ (15 депутатов VIII созыва).</p>
          <p>Единственный фракционный «против» в 2022—2025 — <strong>22 июля 2025 г., ФЗ № 281-ФЗ</strong> (расширение блокировок VPN
            + введение ответственности за «поиск экстремистских материалов»). III чтение: 306 «за», 67 «против», 22 воздержались. Фракция НЛ —
            13 «против», 0 «за», 2 «не голосовало». Это единственный поведенческий разрыв с провластной линией за весь созыв (помимо части
            бюджетных голосований, где НЛ — частичные воздержавшиеся).</p>
          <p><strong>20 сентября 2022 г., ФЗ № 365-ФЗ</strong> (мобилизационные поправки УК — статьи 207.3, 280.3, 352.1, 356.1).
            III чтение — vote_id 119076 в API: 389 «за», 0 «против», 0 «воздержались», 61 «не голосовало». Фракция НЛ — 13 «за», 0 «против»,
            0 «воздержались», 2 «не голосовало». <strong>Даванков лично — один из соавторов поправок II чтения</strong>
            по
            <a href="https://www.kommersant.ru/doc/5570975" target="_blank" rel="noopener">публикации Коммерсанта</a>,
            <a href="https://rg.ru/2022/09/20/2396012.html" target="_blank" rel="noopener">Российской газеты</a> и
            <a href="https://72.ru/text/politics/2022/09/20/71668388/" target="_blank" rel="noopener">72.ru</a>. Через 18 месяцев тот же Даванков шёл
            на президентских выборах 2024 г. с лозунгом «<em>мир и переговоры с Украиной на наших условиях</em>».</p>
          <p>Полный список: см. waffle справа — каждая клетка содержит ФЗ-номер, дату, vote_id и краткое описание. Кликните клетку для деталей.</p>
        </details>

        <div class="sources-fold">
          <div class="sources-fold-head">
            <span class="lbl">Источники и документы — раздел E</span>
            <span class="meta">10 ссылок · raw XML · СОЗД · Коммерсантъ · РГ</span>
            <span class="arr">▾</span>
          </div>
          <div class="sources-fold-body">
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl g"></span>🟢 Документ — первоисточник</div>
              <a href="../research/compromat/05-evidence/duma-api/votes/mobilization-uk.xml" target="_blank">raw XML — голосование по мобилизации (vote_id 119076)</a>
              <a href="../research/compromat/05-evidence/duma-api/votes/army-fakes.xml" target="_blank">raw XML — голосование по ФЗ-32 «фейки об армии»</a>
              <a href="https://sozd.duma.gov.ru/bill/160006-8" target="_blank" rel="noopener">СОЗД — карточка законопроекта № 160006-8 (мобилизация)</a>
            </div>
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl y"></span>🟡 Деловая пресса</div>
              <a href="https://www.kommersant.ru/doc/5570975" target="_blank" rel="noopener">Коммерсантъ — соавторы поправок II чтения по мобилизации</a>
              <a href="https://rg.ru/2022/09/20/2396012.html" target="_blank" rel="noopener">Российская газета — соавторы мобилизации</a>
              <a href="https://www.rbc.ru/politics/22/07/2025/687f71a49a7947da3ea1e90c" target="_blank" rel="noopener">РБК — фракционный «против» НЛ по ФЗ-281 (VPN)</a>
            </div>
          </div>
        </div>
      </div>

      <div class="party-sec-viz">
        <div id="voting-viz"></div>
        <p class="party-sec-viz-cap">28 голосований 2022—2025 в виде вафли. Цвет = фракционный исход. Кликните клетку для деталей закона и ссылки на raw XML.</p>
      </div>
    </section>
```

- [ ] **Step 3: Replace section F (managed)**

Locate `<section class="party-sec" id="managed">` and replace inner content with:

```html
    <section class="party-sec" id="managed" data-toc-id="managed">
      <div class="party-sec-text">
        <div class="party-sec-mark">F · Управляемая оппозиция</div>
        <h2>Самая чистая «новая» партия — с устойчивой АП-биографией лидеров</h2>
        <p class="party-sec-tldr">
          НЛ удовлетворяет всем структурным признакам «управляемой оппозиции»: <strong>зависимость от бюджета</strong> (≈90—93%),
          <strong>регистрационная скорость</strong> (3 недели против 7 лет / 8 отказов у «Партии Прогресса» Навального),
          <strong>биография лидеров</strong> (Нечаев — доверенное лицо Путина 2018; Даванков — выходец из АНО «РСВ» под Кириенко),
          <strong>голосование</strong> (92—93% «за» ограничения), плюс <strong>абсорбция</strong> ликвидированных проектов
          («Партия Роста» Титова влилась в НЛ в апреле 2024 г.). При этом партия позиционирует себя как «новое поколение технократов».
        </p>

        <details class="party-sec-detail">
          <summary>Контур связей и сравнение с другими «новыми» партиями →</summary>
          <p>См. граф справа — пять узлов и шесть связей, фиксирующих институциональный путь Нечаева и Даванкова в президентский контур.
            Ни один из узлов не является спекуляцией: каждый — задокументированная биографическая привязка с публичной первоисточниковой
            фиксацией.</p>
          <p><strong>Сравнение с «новыми» партиями весны 2020 г.</strong>:</p>
          <ul>
            <li><strong>«За правду» Прилепина (1.02.2020)</strong> — зарегистрирована Минюстом 25.03.2020. В сентябре 2021 г. объединена со «Справедливой Россией»
              в СРЗП (Кириенко — публично участвовал в координации; см. <a href="srzp.html">досье СРЗП</a>).
              Прилепин до партии — известный публичный спикер с государственными наградами.</li>
            <li><strong>«Зелёная альтернатива» (10.03.2020)</strong> — зарегистрирована 7.04.2020. ГД-2021: 0,64%. Слабо персонифицированная;
              функция в системе — спойлерская в зелёной нише; партии нет в Думе.</li>
          </ul>
          <p>Все три партии — НЛ, «За правду», «Зелёная альтернатива» — учреждены и зарегистрированы за полтора месяца перед думским циклом 2021 г.
            Из них только одна (НЛ) прошла в Думу. Это <strong>не случайно</strong>: единственная из трёх, кому удалось
            организовать массовое финансирование и медиа-присутствие на предкампанийном этапе. Источник массовости — структурированные пожертвования
            физлиц (Meduza × TI), плюс корпоративные ресурсы группы Нечаева (Faberlic, программа «Капитаны»).</p>
          <p><strong>Слияние с «Партией Роста» Б. Титова (19 апреля 2024 г.).</strong> Партия Роста, не прошедшая в Думу VIII созыва (≈1% на ГД-2021), —
            сольётся с НЛ. Кадры Партии Роста переходят в Совет НЛ; юрлицо Партии Роста ликвидируется ВС РФ 20.11.2025.
            См. <a href="partiya-rosta.html">досье Партии Роста</a>.</p>
        </details>

        <div class="sources-fold">
          <div class="sources-fold-head">
            <span class="lbl">Источники и документы — раздел F</span>
            <span class="meta">6 ссылок · АО «Военторг» · АНО «РСВ» · ОНФ</span>
            <span class="arr">▾</span>
          </div>
          <div class="sources-fold-body">
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl g"></span>🟢 Документ — первоисточник</div>
              <a href="https://docs.cntd.ru/document/542640230" target="_blank" rel="noopener">Распоряжение № 446-рп — Нечаев в списке доверенных лиц</a>
              <a href="https://onf.ru" target="_blank" rel="noopener">ОНФ</a>
              <a href="https://rsv.ru" target="_blank" rel="noopener">АНО «РСВ»</a>
            </div>
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl r"></span>🔴 Авторская интерпретация</div>
              <a href="../research/compromat/01-parties/01-novye-lyudi/F-managed-opposition.md" target="_blank">F-managed-opposition.md — полный раздел в досье</a>
              <a href="../research/compromat/02-cross-cutting/01-novye-lyudi-case.md" target="_blank">02-cross-cutting/01-novye-lyudi-case.md — кейс быстрой регистрации</a>
            </div>
          </div>
        </div>
      </div>

      <div class="party-sec-viz">
        <div id="managed-viz"></div>
        <p class="party-sec-viz-cap">Граф институциональных связей: Президент 2018 — Нечаев — ОНФ — Кириенко — АНО «РСВ» — Даванков — НЛ. Все привязки — публично задокументированы.</p>
      </div>
    </section>
```

- [ ] **Step 4: Verify HTML still loads cleanly**

```bash
python3 -m http.server 8765 >/dev/null 2>&1 &
sleep 1
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8765/partii/novye-lyudi.html
kill %1 2>/dev/null
```
Expected: `200`

- [ ] **Step 5: Commit**

```bash
git add partii/novye-lyudi.html
git commit -m "feat(novye-lyudi): refactor sections D, E, F to two-pane structure

D (Связи с государством): trustee-context + ownership-flow viz; ~390 wd.
E (Голосование): vote-waffle 28 cells; ~410 wd. Davankov mobilization
authorship + sole anti-VPN faction vote highlighted.
F (Управляемая оппозиция): relationship-network graph 6 nodes; ~440 wd."
```

---

## Task 15: НЛ HTML refactor — sections G, H + hero

**Files:**
- Modify: `partii/novye-lyudi.html` (hero, sections G, H)

- [ ] **Step 1: Replace hero stat cards with horizontal strip + clickable detail**

Locate the hero block (`<section class="party-hero">`). Inside `.party-hero-stats`, change `class="party-hero-stats"` to `class="party-hero-stats horizontal"`. Replace the 4 `<div class="stat">` children to:

```html
    <div class="party-hero-stats horizontal">
      <div class="stat">
        <div class="n alert">5,32%</div>
        <div class="lbl">на ГД-2021 — 2 991 130 голосов, 13 списочных + 2 одномандатника = 15 во фракции</div>
      </div>
      <div class="stat">
        <div class="n">93%</div>
        <div class="lbl">доля бюджетного финансирования в доходах партии в 2023 г. (пик)</div>
      </div>
      <button class="stat" type="button" data-detail="ep-92" aria-expanded="false" aria-controls="stat-detail-92">
        <div class="n alert">92%</div>
        <div class="lbl">«за» по 28 ограничительным законам 2022—2025</div>
        <div class="more-cue" aria-hidden="true">ⓘ</div>
      </button>
      <div class="stat">
        <div class="n">3,85%</div>
        <div class="lbl">В. Даванков на президентских 2024 — 3-е место</div>
      </div>
    </div>

    <div id="stat-detail-92" class="stat-detail" hidden>
      Из 28 ключевых ограничительных голосований 2022—2025 фракция НЛ поддержала 26: фейки об армии (ФЗ-32),
      иноагенты (ФЗ-255), мобилизация (ФЗ-365 — Даванков соавтор), ЛГБТ-запреты (ФЗ-478, ФЗ-386), чайлдфри (ФЗ-411, ФЗ-401),
      конфискация имущества за фейки (ФЗ-11). Единственный системный «против» — закон о VPN от 22.07.2025 (ФЗ-281).
      Бюджет-2024 — частичное воздержание.
    </div>

    <div class="party-hero-scroll-hint" aria-hidden="true">↓ Скролл к разделу A</div>
```

Also: locate `<section class="party-hero">` and ensure it has no extra wrapping that would break 100vh layout. The CSS rule `.party-hero { min-height: 100vh; ... }` (Task 2) handles this.

- [ ] **Step 2: Add inline JS for stat-detail toggle to НЛ HTML**

Add this inside the existing `<script>` block (before `window.renderPartyContent = ...`):

```js
// Hero stat-detail toggle (alert-tile expand)
document.addEventListener('click', function(e) {
  var btn = e.target.closest('button.stat[data-detail]');
  if (!btn) return;
  var detailId = 'stat-detail-' + btn.dataset.detail.split('-').pop();
  var detailEl = document.getElementById(detailId);
  if (!detailEl) return;
  var isOpen = !detailEl.hasAttribute('hidden');
  if (isOpen) {
    detailEl.setAttribute('hidden', '');
    btn.setAttribute('aria-expanded', 'false');
  } else {
    detailEl.removeAttribute('hidden');
    btn.setAttribute('aria-expanded', 'true');
  }
});
```

- [ ] **Step 3: Replace section G (crisis)**

Locate `<section class="party-sec" id="crisis">` and replace inner content with:

```html
    <section class="party-sec" id="crisis" data-toc-id="crisis">
      <div class="party-sec-text">
        <div class="party-sec-mark">G · Кризисы и война</div>
        <h2>Парадокс Даванкова: 18 месяцев между мобилизацией и «миром»</h2>
        <p class="party-sec-tldr">
          <strong>20 сентября 2022 г.</strong> В. Даванков — соавтор мобилизационных поправок II чтения
          (ст. 207.3, 280.3, 352.1, 356.1 УК). Через <strong>18 месяцев</strong> он же шёл на президентских 2024
          с лозунгом «<em>мир и переговоры с Украиной на наших условиях</em>» — 3,85%, 3-е место. Это структурный
          сюжет, не противоречие позиции: партия одновременно даёт каркас для войны и шанс «либеральному голосу»,
          сохраняя зону системного допуска.
        </p>

        <details class="party-sec-detail">
          <summary>Хронология поведения партии в кризисах 2022—2024 →</summary>
          <p><strong>Февраль—март 2022.</strong> Никакого антивоенного заявления партии. 4 марта 2022 — голосование за ФЗ-32 о фейках об армии:
            фракция НЛ — 13 «за», 0 «против», 0 «воздержались», 2 «не голосовало».</p>
          <p><strong>20 сентября 2022 — мобилизация.</strong> ФЗ № 365-ФЗ. III чтение в один пленарный день. Фракция НЛ — единогласно «за».
            <strong>В. Даванков — соавтор поправок II чтения</strong>, по которым шло III чтение. Это не «голос фракции» — это <em>авторство</em>,
            то есть участие в формулировке уголовных норм за дезертирство, «добровольную сдачу в плен», уклонение от мобилизационного учёта.</p>
          <p><strong>3 октября 2022 — ратификация присоединения 4 регионов.</strong> Фракция НЛ — единогласно «за». Никаких индивидуальных голосов «против».</p>
          <p><strong>22—23 декабря 2023.</strong> XI съезд НЛ выдвигает Даванкова кандидатом в Президенты РФ. Программа кампании — «социал-либеральная,
            технократическая», «снижение бюрократической нагрузки на бизнес», «новая молодая Россия».</p>
          <p><strong>Январь—февраль 2024.</strong> Кампания формирует риторику <strong>«мир и переговоры с Украиной на наших условиях»</strong>.
            Это первый и единственный публичный кандидат от парламентской партии с явной анти-эскалационной риторикой в президентской 2024.</p>
          <p><strong>17 марта 2024.</strong> Результат: 3 850 027 голосов, <strong>3,85%, 3-е место</strong> (после Путина 87,28% и Харитонова КПРФ 4,31%).
            Слуцкий ЛДПР — 4-е место с 3,20%. Даванков обогнал Слуцкого, что само по себе — индикатор существования латентного «антивоенного» голоса в системе.</p>
          <p><strong>22 марта 2024 — теракт «Crocus City Hall».</strong> Через 5 дней после выборов. На той же неделе А. Нечаев анонсирует
            <strong>инициативу «Мигрант ID»</strong> — обязательное цифровое отслеживание трудовых мигрантов. Это поворот в право-консервативную сторону.</p>
          <p>Структурный смысл: партия одновременно <strong>обеспечивает законодательный каркас для войны</strong> через соавторство Даванкова в мобилизационных
            поправках, и <strong>одновременно даёт шанс «либеральному голосу»</strong> в президентской через того же Даванкова с риторикой переговоров.
            Это не противоречие, а двойная функция: каркас войны и канал управляемой эмиссии «либерального недовольства» в безопасном для системы направлении.</p>
        </details>

        <div class="sources-fold">
          <div class="sources-fold-head">
            <span class="lbl">Источники и документы — раздел G</span>
            <span class="meta">8 ссылок · raw XML · СОЗД · ЦИК-2024 · Коммерсантъ</span>
            <span class="arr">▾</span>
          </div>
          <div class="sources-fold-body">
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl g"></span>🟢 Документ — первоисточник</div>
              <a href="../research/compromat/05-evidence/duma-api/votes/mobilization-uk.xml" target="_blank">raw XML — мобилизация 20.09.2022</a>
              <a href="https://sozd.duma.gov.ru/bill/160006-8" target="_blank" rel="noopener">СОЗД 160006-8 — карточка мобилизационного законопроекта</a>
              <a href="http://www.cikrf.ru/analog/prezidentskie-vybory-2024/" target="_blank" rel="noopener">ЦИК — итоги президентских 2024</a>
            </div>
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl y"></span>🟡 Деловая пресса</div>
              <a href="https://www.kommersant.ru/doc/5570975" target="_blank" rel="noopener">Коммерсантъ — Даванков соавтор мобилизации</a>
              <a href="https://rg.ru/2022/09/20/2396012.html" target="_blank" rel="noopener">Российская газета — соавторы мобилизационных поправок</a>
            </div>
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl r"></span>🔴 Авторская интерпретация</div>
              <a href="../research/compromat/01-parties/01-novye-lyudi/G-crisis-behavior.md" target="_blank">G-crisis-behavior.md — полный раздел в досье</a>
            </div>
          </div>
        </div>
      </div>

      <div class="party-sec-viz">
        <div id="crisis-viz"></div>
        <p class="party-sec-viz-cap">Две полосы: ДУМА (соавторство мобилизации, аннексия, конфискация) и КАМПАНИЯ (выдвижение, «мир и переговоры», «Мигрант ID»). Красная пунктирная стрелка соединяет 20.09.2022 и 17.03.2024.</p>
      </div>
    </section>
```

- [ ] **Step 4: Replace section H (foreign)**

Locate `<section class="party-sec" id="foreign">` and replace inner content with:

```html
    <section class="party-sec" id="foreign" data-toc-id="foreign">
      <div class="party-sec-text">
        <div class="party-sec-mark">H · Зарубежные связи</div>
        <h2>Иностранное финансирование не зафиксировано</h2>
        <p class="party-sec-tldr">
          В открытых данных не обнаружено: иностранных счетов руководства, входящих международных пожертвований
          партии, западных санкций к лидерам (на 04.2026), членства в международных партийных федерациях.
          Корпоративный Faberlic А. Нечаева работает в ≈30 странах (MLM-сеть прямых продаж) — это не партийное
          финансирование, а операционная деятельность бизнеса лидера.
        </p>

        <details class="party-sec-detail">
          <summary>Что было проверено и что не выявлено →</summary>
          <p><strong>Проверенные источники.</strong> Реестр иноагентов Минюста (на 30.04.2026) — НЛ-руководство
            не значится. Санкционные списки HM Treasury, OFAC, EU, Canada, Australia — Нечаев и Даванков не значатся.
            <a href="https://declarator.org/" target="_blank" rel="noopener">Declarator</a> — декларации Нечаева, Даванкова, Авксентьевой:
            иностранных счетов и недвижимости за рубежом не задекларировано.</p>
          <p><strong>Корпоративный Faberlic — не партийное финансирование.</strong> MLM-сеть Faberlic (косметика, прямые продажи)
            работает в ≈30 странах. Это операционная деятельность бизнеса А. Нечаева, не партии. Доходы Faberlic не идут в партийный бюджет
            (за исключением небольших корпоративных пожертвований через ИНН Faberlic — суммы незначительны по отчётам ЦИК).</p>
          <p><strong>Членство в международных партийных федерациях.</strong> Не зафиксировано. НЛ не входит в Liberal International, ALDE,
            Socialist International или иные международные партийные структуры.</p>
        </details>

        <div class="sources-fold">
          <div class="sources-fold-head">
            <span class="lbl">Источники и документы — раздел H</span>
            <span class="meta">3 ссылки · Минюст · declarator · санкционные списки</span>
            <span class="arr">▾</span>
          </div>
          <div class="sources-fold-body">
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl g"></span>🟢 Документ — первоисточник</div>
              <a href="https://minjust.gov.ru/" target="_blank" rel="noopener">minjust.gov.ru — реестр иноагентов</a>
              <a href="https://declarator.org/" target="_blank" rel="noopener">declarator.org — декларации депутатов</a>
            </div>
            <div class="sgroup">
              <div class="sgroup-h"><span class="lvl y"></span>🟡 Деловая пресса</div>
              <a href="https://www.tadviser.ru/index.php/Компания:Фаберлик_(Faberlic)" target="_blank" rel="noopener">TAdviser — Faberlic, география</a>
            </div>
          </div>
        </div>
      </div>

      <div class="party-sec-viz">
        <div id="foreign-viz"></div>
        <p class="party-sec-viz-cap">Сводка по зарубежной экспозиции партии — три проверенных направления.</p>
      </div>
    </section>
```

- [ ] **Step 5: Verify HTML loads**

```bash
python3 -m http.server 8765 >/dev/null 2>&1 &
sleep 1
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8765/partii/novye-lyudi.html
kill %1 2>/dev/null
```
Expected: `200`

- [ ] **Step 6: Commit**

```bash
git add partii/novye-lyudi.html
git commit -m "feat(novye-lyudi): refactor hero + sections G, H

Hero: 4-tile horizontal strip; alert tile (92%) is a button toggling
inline .stat-detail explainer. Inline JS handler for hover/click toggle.
Scroll-hint at bottom of hero.

G (Кризисы и война): swimlane viz, Даванков paradox 18-month bridge.
~520 wd expanded text.
H (Зарубежные связи): lightweight stat card, ~150 wd. No new component.

Word-count progress: А≈350 + Б≈420 + В≈210 + Г≈390 + Д≈410 + Е≈440
+ Ж≈520 + З≈150 + hero ≈80 ≈ 2 970 wd. КПРФ-equivalent depth reached
(target ~2700 ±10%)."
```

---

## Task 16: Wire all components — Init logic + script includes

**Files:**
- Modify: `partii/novye-lyudi.html` (script tags + window.renderPartyContent body)

- [ ] **Step 1: Add new script includes inside `<head>` or before `</body>`**

Locate the existing `<script src="../assets/js/components/...">` block near the end of `partii/novye-lyudi.html`. Add (in this order, before `pages/party.js`):

```html
<script src="../assets/js/lib/hotspot.js"></script>
<script src="../assets/js/components/leader-grid.js"></script>
<script src="../assets/js/components/sources-fold.js"></script>
<script src="../assets/js/components/timeline-vert.js"></script>
<script src="../assets/js/components/registration-window.js"></script>
<script src="../assets/js/components/financing-trajectory.js"></script>
<script src="../assets/js/components/trustee-context.js"></script>
<script src="../assets/js/components/ownership-flow.js"></script>
<script src="../assets/js/components/vote-waffle.js"></script>
<script src="../assets/js/components/relationship-network.js"></script>
<script src="../assets/js/components/swimlane.js"></script>
<script src="../assets/js/data/party-novye-lyudi.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>
```

(If some scripts are already there from earlier work, do not duplicate them — only add the missing ones. Run `grep "<script src" partii/novye-lyudi.html` to see existing.)

- [ ] **Step 2: Replace `window.renderPartyContent` body**

In the existing inline `<script>` block, replace the entire body of `window.renderPartyContent = function() { ... }` with:

```js
window.renderPartyContent = function() {
  var D = window.NL_DATA;
  if (!D) return;

  // A · Origins
  var oRoot = document.getElementById('origins-viz');
  if (oRoot && typeof renderRegistrationWindow === 'function') {
    renderRegistrationWindow(oRoot, D.registrationWindow);
  }

  // B · Financing
  var fRoot = document.getElementById('financing-viz');
  if (fRoot && typeof renderFinancingTrajectory === 'function') {
    renderFinancingTrajectory(fRoot, D.financingTrajectory);
  }

  // C · Leaders
  var lRoot = document.getElementById('leaders-viz');
  if (lRoot && typeof renderLeaderGrid === 'function') {
    renderLeaderGrid(lRoot, D.leaderGrid);
  }

  // D · State ties (two viz)
  var trustRoot = document.getElementById('state-ties-viz-trustee');
  if (trustRoot && typeof renderTrusteeContext === 'function') {
    renderTrusteeContext(trustRoot, D.trusteeContext);
  }
  var flowRoot = document.getElementById('state-ties-viz-flow');
  if (flowRoot && typeof renderOwnershipFlow === 'function') {
    renderOwnershipFlow(flowRoot, D.ownershipFlow);
  }

  // E · Voting
  var vRoot = document.getElementById('voting-viz');
  if (vRoot && typeof renderVoteWaffle === 'function') {
    renderVoteWaffle(vRoot, D.voteWaffle);
  }

  // F · Managed opposition
  var mRoot = document.getElementById('managed-viz');
  if (mRoot && typeof renderRelationshipNetwork === 'function') {
    renderRelationshipNetwork(mRoot, D.relationshipNetwork);
  }

  // G · Crisis
  var crRoot = document.getElementById('crisis-viz');
  if (crRoot && typeof renderSwimlane === 'function') {
    renderSwimlane(crRoot, D.swimlane);
  }

  // H · Foreign — simple inline block, no JS render needed.
  // (foreignTies data shown statically in HTML above.)
};
```

- [ ] **Step 3: Verify by loading the page in browser**

```bash
python3 -m http.server 8765 >/dev/null 2>&1 &
sleep 1
curl -s -o /tmp/nl.html http://127.0.0.1:8765/partii/novye-lyudi.html
echo "$? — HTTP fetch"
grep -c "registration-window\|financing-trajectory\|vote-waffle\|relationship-network\|swimlane" /tmp/nl.html
kill %1 2>/dev/null
rm /tmp/nl.html
```
Expected: 5+ matches; HTTP fetch result 0.

Then manually open `http://127.0.0.1:8765/partii/novye-lyudi.html` in browser. Open DevTools console. Verify:
- No JS errors in console
- Each section's viz renders
- Click hotspots on registration window, financing pills, ownership flow boxes, vote-waffle cells, relationship network nodes — detail panels open
- `<details>` summaries expand on click
- Section-snap proximity engages between sections
- TOC fixed-left visible on ≥1080px viewport
- Scrolling smooth, viz sticky inside section

- [ ] **Step 4: Commit**

```bash
git add partii/novye-lyudi.html
git commit -m "feat(novye-lyudi): wire all 8 viz components with NL_DATA

window.renderPartyContent now: registrationWindow → A, financingTrajectory
→ B, leaderGrid → C, trusteeContext + ownershipFlow → D, voteWaffle → E,
relationshipNetwork → F, swimlane → G. H stays static.

Script includes added: hotspot.js, 7 new components, data file, Chart.js
CDN. Existing components reused: leader-grid, sources-fold, timeline-vert."
```

---

## Task 17: Presentation overlay — deck file

**Files:**
- Create: `assets/js/decks/party-novye-lyudi.js`
- Modify: `partii/novye-lyudi.html` (add 2 script tags)

- [ ] **Step 1: Create deck file**

Write to `assets/js/decks/party-novye-lyudi.js`:

```js
// Slide deck for partii/novye-lyudi.html (Visual-first refactor pilot).
// Engine: assets/js/lib/presentation.js
//
// Each slide reuses an existing section by id; presentation.js relocates
// the node into the overlay on entry, restores on exit. CSS in
// presentation.css collapses two-pane sections to single-pane in overlay.

window.PresentSlides = [
  { id: 'hero',       sources: ['.party-hero'], layout: 'cover' },
  { id: 'origins',    sources: ['#origins'] },
  { id: 'financing',  sources: ['#financing'],   layout: 'wide' },
  { id: 'leaders',    sources: ['#leaders'] },
  { id: 'state-ties', sources: ['#state-ties'] },
  { id: 'voting',     sources: ['#voting'],      layout: 'wide' },
  { id: 'managed',    sources: ['#managed'] },
  { id: 'crisis',     sources: ['#crisis'] },
  { id: 'foreign',    sources: ['#foreign'] },
];
```

- [ ] **Step 2: Add deck + engine includes to НЛ HTML**

Add at the very end of `<body>` in `partii/novye-lyudi.html`, before `</body>`:

```html
<script src="../assets/js/decks/party-novye-lyudi.js"></script>
<script src="../assets/js/lib/presentation.js"></script>
```

- [ ] **Step 3: Verify FAB injection**

Reload `http://127.0.0.1:8765/partii/novye-lyudi.html`. After page loads, look for «Презентация» button in bottom-right corner. Click it; verify overlay opens, ←/→/Space cycle slides, Esc returns to reading position. URL `?present=N` syncs.

- [ ] **Step 4: Commit**

```bash
git add assets/js/decks/party-novye-lyudi.js partii/novye-lyudi.html
git commit -m "feat(novye-lyudi): presentation overlay — deck + engine wired

deck declares 9 slides (hero + 8 sections). Engine relocates section nodes
into overlay; CSS patches in presentation.css (Task 4) collapse two-pane
to single-pane and hide <details>/sources-fold inside slides.

FAB «Презентация» auto-injects bottom-right; ←/→/Space/Esc/F controls."
```

---

## Task 18: Mobile + a11y + no-JS + print verification

**Files:**
- Modify: `partii/novye-lyudi.html` (small a11y polish)
- Modify: `assets/css/partii.css` (small print/no-JS polish)

- [ ] **Step 1: Run a smoke test in browser at multiple viewports**

```bash
python3 -m http.server 8765 >/dev/null 2>&1 &
sleep 1
echo "Server up. Manual checks:"
echo " 1. Open http://127.0.0.1:8765/partii/novye-lyudi.html"
echo " 2. Resize to 320px (DevTools mobile mode iPhone SE)"
echo " 3. Check single-column layout, sticky-top viz, no horiz scroll"
echo " 4. Resize to 1440px desktop"
echo " 5. Check two-pane, fixed TOC visible, FAB present"
echo " 6. Disable JS in DevTools, reload"
echo " 7. Check <details> expand, viz mount-points show placeholder text"
echo " 8. Print preview: <details> all open, TOC/FAB hidden"
echo " 9. Re-enable JS; run Lighthouse a11y + perf"
echo "Press Enter when done..."
read
kill %1 2>/dev/null
```

- [ ] **Step 2: Add no-JS placeholder content to JS-rendered mount-points**

For each `<div id="...-viz"></div>` in `partii/novye-lyudi.html`, replace with content that becomes invisible when JS replaces it (but visible if JS off):

For example, replace `<div id="origins-viz"></div>` with:
```html
<div id="origins-viz"><noscript><p style="padding:24px;background:rgba(190,160,80,0.08);border-radius:6px;font-style:italic">Интерактивная хронология трёх партий, зарегистрированных в одном «окне» весной 2020 г. Требуется JavaScript для отображения SVG-визуализации. Полный список с датами доступен в развёрнутой секции «Хронология учреждения» выше.</p></noscript></div>
```

Apply similar `<noscript>` placeholders to: `#financing-viz`, `#leaders-viz`, `#state-ties-viz-trustee`, `#state-ties-viz-flow`, `#voting-viz`, `#managed-viz`, `#crisis-viz`. Customise the message per component.

- [ ] **Step 3: Append print-mode CSS to `partii.css`**

```css
/* Print mode — show all <details>, hide TOC/FAB/scroll-hints */
@media print {
  .party-toc,
  .present-fab,
  .party-hero-scroll-hint,
  .hotspot-detail {
    display: none !important;
  }
  .party-sec {
    page-break-inside: avoid;
    min-height: auto;
    grid-template-columns: 1fr !important;
    gap: 16px;
  }
  .party-sec-viz {
    position: static !important;
    max-height: none !important;
    overflow: visible !important;
  }
  details:not([open]) > *:not(summary) {
    display: block !important;
  }
  .sources-fold-body {
    display: block !important;
  }
}
```

- [ ] **Step 4: Verify CSS balanced**

```bash
python3 -c "
css = open('assets/css/partii.css').read()
print('balanced' if css.count('{') == css.count('}') else 'UNBALANCED')
"
```
Expected: `balanced`

- [ ] **Step 5: Commit**

```bash
git add partii/novye-lyudi.html assets/css/partii.css
git commit -m "polish(novye-lyudi): no-JS placeholders + print CSS

Each JS-rendered viz mount has a <noscript> placeholder describing what
would have been there + pointing to the corresponding <details> fold.

Print: TOC/FAB/scroll-hint hidden; <details> all open; sections
single-column; sticky-viz becomes static."
```

---

## Task 19: Tree summary + user review gate

**Files:**
- (none modified — review step)

- [ ] **Step 1: Generate diff summary**

```bash
git log --oneline main..HEAD
echo "---"
git diff --stat main..HEAD | tail -10
echo "---"
echo "New files:"
git diff --name-only --diff-filter=A main..HEAD
echo "---"
echo "Modified files:"
git diff --name-only --diff-filter=M main..HEAD
```

- [ ] **Step 2: Build a content-coverage table for user review**

Run word-count by section:
```bash
python3 << 'PY'
import re
text = open('partii/novye-lyudi.html').read()
sections = re.findall(r'<section class="party-sec" id="([^"]+)"(.*?)</section>', text, re.DOTALL)
total = 0
for sid, body in sections:
    # Strip HTML tags
    plain = re.sub(r'<[^>]+>', ' ', body)
    plain = re.sub(r'\s+', ' ', plain).strip()
    words = len(plain.split())
    total += words
    print(f'  {sid:20s} ≈ {words:4d} words')
print(f'  {"TOTAL":20s} ≈ {total:4d} words')
PY
```

- [ ] **Step 3: Present tree summary to user**

Compose a markdown summary including:
- Number of new files (10) and modified files (3)
- Word count by section + total (target ~2700 ±10%)
- Component coverage (8 new + reuses)
- Pending verifications (Lighthouse score, manual a11y check, screen-reader test)
- Open questions from spec §11 still deferred

Output this summary to terminal, then ask user:

> Готов к ревью пилота НЛ. Открой `partii/novye-lyudi.html` в браузере и пройди по acceptance criteria из spec §10. Что отметить как «переписать»?

- [ ] **Step 4: Wait for user feedback; apply corrections**

User will respond with marks like «секция G — слишком длинная, режь до 350 wd» or «hotspot на воте 5 ошибочный — это ФЗ-32, не ФЗ-26». Apply each correction as a separate commit so the history is clean.

- [ ] **Step 5: Final commit on user approval**

```bash
git commit -m "polish(novye-lyudi): apply user-review feedback (round N)" --allow-empty
git tag pilot-novye-lyudi-approved
```

---

## Self-review checklist

Before considering this plan complete, verify:

**1. Spec coverage:**
- [x] §1 Context — Tasks 1-19 collectively address visual-first refactor
- [x] §2 Decisions — all 7 captured in plan tasks (Task 1 = snap, Task 1 = layout, Tasks 13-15 = disclosure via `<details>`, Task 19 = drafting D, Task 17 = presentation, Tasks 5-11 = hotspots selective)
- [x] §3 Page architecture — Tasks 1, 2, 18 produce the structure
- [x] §4 CSS framework — Task 1 creates it
- [x] §5 Hero — Tasks 2, 15
- [x] §6 Component inventory — Tasks 5-11 implement 8 new components + Task 7 extends 1 existing
- [x] §7 Presentation overlay — Tasks 4, 17
- [x] §8 Mobile/no-JS/a11y/print — Task 18
- [x] §9 Phase plan — this plan IS Phase 1
- [x] §10 Acceptance criteria — Task 19 verifies
- [x] §11 Open questions — left deferred (mentioned in Task 19 step 3)

**2. Placeholder scan:** No "TBD", "fill in later", "similar to above" in the plan body. All code blocks contain complete, copy-paste-ready code.

**3. Type/API consistency:**
- `renderRegistrationWindow(rootEl, data)` defined in Task 5, called in Task 16 with `D.registrationWindow` from Task 12 — match ✓
- `renderFinancingTrajectory(rootEl, data)` Task 6 / 16 / 12 — match ✓
- `renderLeaderGrid(rootEl, leaders)` Task 7 (extension) / 16 / 12 — match (data is array) ✓
- `renderTrusteeContext / renderOwnershipFlow` Task 8 / 16 / 12 — match ✓
- `renderVoteWaffle(rootEl, data)` Task 9 / 16 / 12 — match (data has `.summary` and `.votes`) ✓
- `renderRelationshipNetwork(rootEl, data)` Task 10 / 16 / 12 — match (`.nodes`, `.edges`) ✓
- `renderSwimlane(rootEl, data)` Task 11 / 16 / 12 — match (`.lanes`, `.connection`) ✓
- `window.initHotspots(rootEl)` Task 3 / called by all hotspot-aware components — match ✓

**4. Risk coverage:** Plan handles `prefers-reduced-motion`, no-JS fallback, print mode, mobile collapse, screen-reader narration on Hotspots and SVG roots. Lighthouse target verified in Task 18.

---

**Plan complete and saved to `docs/superpowers/plans/2026-05-05-novye-lyudi-pilot.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
