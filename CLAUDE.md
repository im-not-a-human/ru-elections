# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Russian-language static analytical site (`im-not-a-human.github.io/ru-elections/`) about Russian electoral politics. Two pages:
- `index.html` — Duma faction voting matrix (LAWS × parties)
- `vybory.html` — election-system math (calculator, heatmap, ladder)

No build system. No package manager. No tests. Pure HTML/CSS/vanilla JS + Chart.js via CDN.

## Local dev

```bash
python3 -m http.server 8765
# http://127.0.0.1:8765/
```

Open `index.html` directly via `file://` mostly works but breaks `fetch`-based features and CORS-sensitive fonts; always serve over HTTP.

## Architecture

### Page = `<main data-page="...">` + flat script load

Each HTML page hard-loads every JS module via `<script>` tags in a fixed order (see `index.html:370-414` and `vybory.html` for canonical order):

1. Chart.js CDN
2. `assets/js/data/*.js` — global constants (`LAWS`, `PARTIES`, `SOCIAL_LAWS`, `ELECTION_2021`, `SHPILKIN`, `DEG_FLIPS_2021`, `POWER_QUOTES`, `SYSTEM_HISTORY`, `BUDGETNIKI`, …)
3. `assets/js/lib/*.js` — utilities (`$`, `$$`, modal, tooltip, intro popup, reveal, counter, spoiler, copy-link, reading-progress, scroll-steps, page-toggle-ping)
4. `assets/js/components/*.js` — DOM renderers (matrix, party-cards, timeline, comparison-bars, law-modal, party-modal)
5. `assets/js/charts/*.js` — visualizations (waffle, districts, distortion, gauge, flow, shpilkin, ladder, heatmap, calculator, …)
6. `assets/js/pages/{home,elections}.js` — per-page init

Both `home.js` and `elections.js` are loaded on every page; each reads `document.getElementById('main').dataset.page` and self-skips if it's not its page. They also expose `window.initHome` / `window.initElections` so a future SPA router can re-init after swapping `<main>`. Today the site is multi-page; preserve the `data-page` guard and the `window.init*` export when editing.

Everything is global — no ES modules, no bundler. Order of script tags is the dependency graph. When adding a new chart or component, append it to the matching directory and add a `<script>` line to **both** HTML files (or the page that uses it).

### CSS layering

Strict cascade: `tokens.css` (palette/sizes/easing) → `base.css` (reset, typography, `prefers-reduced-motion`, skip-link, no-JS) → `layout.css` (nav, sections, footer, `.page-toggle`) → `components.css` (modal, tooltip, intro, copy-link, filters) → page-specific (`home.css` or `elections.css`). Both pages currently load both page-specific stylesheets. New styling goes into the appropriate layer; don't inline page-specific selectors into shared sheets.

### Data shape — voting values

In `LAWS[*].votes[FACTION]`, value is one of:
`'za'` · `'against'` · `'abstain'` · `'partial-against'` · `'didnt-vote'` (tactical) · `'absent'` (faction not in Duma) · `'unanimous'`. `matrix.js` and the modals branch on these strings — don't introduce new states without updating both.

### Adding a page

Follow the recipe in `README.md` ("Как добавить новую страницу"): copy the `<nav>`/`<main data-page>` skeleton, load the same shared CSS/JS layers, add a per-page CSS, create `pages/<name>.js` with `window.init<Name>` + DOMContentLoaded auto-init, and update OG/canonical metatags with **absolute** URLs.

## Conventions

- **All UI text and most code comments are in Russian.** Preserve language when editing existing content; new comments may be in Russian or English but match surrounding style.
- **Every factual claim links to a primary source** (СОЗД, vote.duma.gov.ru, kremlin.ru, ЦИК, etc.). When editing `LAWS`/`SOCIAL_LAWS`, populate `sources[]`. The site's positioning depends on this.
- **Accessibility is load-bearing**, not optional: WCAG AA contrast (`--ink-faded: #6F6A60`), focus trap + `inert` on modals, `prefers-reduced-motion` respected globally, no-JS fallback (text content visible without JS — don't move static prose into JS-rendered components).
- **Mobile-first down to 320px.** Test horizontal overflow on iPhone SE width before claiming a layout change works.
- **OG images live in `assets/og/`** as paired `.png` (1200×630) + `.svg`. Each page's `og:image`, `og:url`, and `<link rel="canonical">` must be absolute URLs.

## Repo-specific gitignores

`output/`, `.test/new_block.html`, `text.txt`, `playwright/`, `*.log` are local scratch — don't commit, don't reference from production code. `research/` **is** committed (deep research notes + expert reviews informing the data); treat it as documentation, not as something the site loads.
