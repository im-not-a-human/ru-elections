# Comprehensive Review Prompt — Compromat Pages (Phases 1–5.1)

> **How to use:** copy the entire block below into a fresh Claude or Codex session at `./`. The agent has zero prior context — the prompt is self-contained.

---

## INSTRUCTIONS TO THE REVIEWING AGENT

You are auditing a Russian-language analytical static site (`im-not-a-human.github.io/ru-elections/`) about Russian electoral politics. Over the past day, 5 phases of work have been merged to `main` building out a documentary archive. Your job is to do a **comprehensive independent review** of all that work and produce a single big findings document.

**Do NOT modify any code.** This is review-only. Spawn subagents freely (you have `Agent` tool access; the user explicitly authorised it). Run subagents in parallel where pages are independent.

### Project context (one paragraph)

The site argues, with primary sources (поимённые голосования, указы Президента, OFAC/HM Treasury sanctions, etc.), that no party in legal Russian politics 2021–2026 simultaneously (a) threatens «Единую Россию» electorally, (b) is structurally independent of the state, and (c) consistently votes against ограничительные laws. Tone is **спокойный, аналитический, без эмоциональной риторики**. Primary audience: Russian обыватель; secondary: journalists/lawyers/researchers (they get sources). Read `CLAUDE.md` and `docs/superpowers/specs/2026-05-05-compromat-pages-design.md` for the design intent and editorial constraints.

### What was built (timeline)

1. **Phase 1** — `index.html` rebuilt as a hub: 4-stat hero, 14-party card grid in 3 categories, 6 cross-cutting cards, documents teaser, sticky-TOC. Plan: `docs/superpowers/plans/2026-05-05-compromat-phase-1-index.md`.
2. **Phase 2** — 5 deep parliamentary-party pages at `partii/{er,kprf,ldpr,srzp,novye-lyudi}.html`, with sticky TOC (≥1080px), 8-section A–H dossier structure, vote-bars, vertical timelines, sources-fold per section. Plan: `…phase-2-parliamentary-pages.md`.
3. **Phase 3** — 9 extra-parliamentary + spoiler pages at `partii/{yabloko,partiya-rosta,grazhdanskaya-initsiativa,partiya-dela,kommunisty-rossii,pensionery,zelenye,rpss,grazhdanskaya-platforma}.html` (varying section counts 6–8). Plan: `…phase-3-extra-parliamentary-and-spoilers.md`. **Note:** `partii/rodina.html` was intentionally OUT of scope and does not exist; flag any cross-link to it as a bug.
4. **Phase 4** — 6 cross-cutting sujet pages at `sujety/{mobilizatsiya,voennyy-byudzhet,spoylery,munitsipalnyy-filtr,tsifrovoy-kontrol,vneparlamentskie}.html` reusing Phase-2 infrastructure. Plan: `…phase-4-sujety-pages.md`.
5. **Phase 5** — `dokumenty.html` document explorer for `research/compromat/05-evidence/` (233 files / 190 MB / 23 subdirs): tree + multi-tab preview, INDEX.md auto-open, 225 path→friendly-title aliases, in-browser preview by extension (PDF/HTML/JSON/XML/CSV/MD via marked.js, DOCX via mammoth.js, XLSX/ODS via SheetJS — last two lazy-loaded from CDN). Plan: `…phase-5-dokumenty-explorer.md`.
6. **Phase 5.1 polish** (most recent) — explorer reworked for Explorer-style UX: full-viewport, scrollable tabs, fullscreen button, scrollable CSV/XLSX with hover-expand cells, full-width markdown, cp1251 encoding detection, external-resource stripping for embedded HTML to suppress 404 noise, clickable `<code>` paths in INDEX.md.

Recent commits: run `git log --oneline -100 main` if you need the precise sequence. Phases 6 (English) is **not yet implemented** — don't review `/en/` (only the originals at `/en/{index,vybory,tsenzura}.html` exist; `/en/partii/*` etc. don't yet).

### Files in scope

#### Pages (the core review surface)

```
index.html                                        # Phase 1 hub
partii/er.html                                    # Phase 2
partii/kprf.html
partii/ldpr.html
partii/srzp.html
partii/novye-lyudi.html
partii/yabloko.html                               # Phase 3 — STRUCTURAL EXCEPTION (anti-war institutional position)
partii/partiya-rosta.html                         # Phase 3 — Titov, conflict of interest
partii/grazhdanskaya-initsiativa.html             # Phase 3 — Nadezhdin 2024 + «Two Nechaevs» disambiguation block
partii/partiya-dela.html                          # Phase 3 — Babkin, Programme 1432
partii/kommunisty-rossii.html                     # Phase 3 — name-doubles industry, 7/15 districts
partii/pensionery.html                            # Phase 3 — most successful spoiler (2,45%)
partii/zelenye.html                               # Phase 3 — «Not Mitvol» disambiguation block
partii/rpss.html                                  # Phase 3 — «Bogdanov laboratory»
partii/grazhdanskaya-platforma.html               # Phase 3 — sleeping party
sujety/mobilizatsiya.html                         # Phase 4 — 20.09.2022, 389/0/0
sujety/voennyy-byudzhet.html                      # Phase 4 — 32,5% on defence
sujety/spoylery.html                              # Phase 4
sujety/munitsipalnyy-filtr.html                   # Phase 4
sujety/tsifrovoy-kontrol.html                     # Phase 4 — Aksakov + Lugovoy
sujety/vneparlamentskie.html                      # Phase 4 — 3 ВС-РФ liquidations
dokumenty.html                                    # Phase 5 explorer
```

#### Shared infrastructure

```
assets/css/{tokens,base,layout,components,home,home-compromat,partii,dokumenty}.css
assets/js/data/{laws,parties,extended-parties,cross-cutting,hero-stats,dokumenty-tree,dokumenty-aliases}.json|js
assets/js/lib/{scroll-spy,dokumenty-tree,dokumenty-renderers,dokumenty-preview,dokumenty-icons}.js
assets/js/components/{vote-bar,timeline-vert,sources-fold,extended-parties,hero-stats,cross-cutting-cards,…}.js
assets/js/pages/{home,party,sujet,dokumenty}.js
scripts/generate-dokumenty-tree.sh
```

#### Out-of-scope (do not edit; reference only for content sourcing)

- `research/compromat/01-parties/<NN>-<slug>/{README,A,B,C,D,E,F,G,H}.md` — source dossiers for each partii page
- `research/compromat/02-cross-cutting/*.md` — source for sujety pages
- `research/compromat/05-evidence/` — primary-source files surfaced via `dokumenty.html`
- `docs/superpowers/specs/` and `docs/superpowers/plans/` — design intent (read for context, do not audit content of)

### Review dimensions

#### A. Content quality
- **Russian language correctness**: grammar, plurals (1=мандат, 2-4=мандата, 5+=мандатов; кратко: проверьте все числовые конструкции), idioms, punctuation
- **Tone consistency**: спокойный, аналитический, БЕЗ эмоциональной риторики или обвинительных формулировок (см. `02-cross-cutting/09-betrayal-cases.md` для эталона)
- **Quote/dash glyph**: Russian uses «...», em-dash —. ASCII `"..."` or `--` in user-facing prose is a bug.
- **Source attribution**: 🟢/🟡/🟠/🔴 markers correctly applied (🟢 = primary document, 🟡 = business press, 🟠 = single-source investigation, 🔴 = author interpretation). Speculation should be 🔴, not stated as fact.
- **Fact-check at least**:
  - Vote tallies on `sujety/mobilizatsiya.html` (389/0/0, fraction breakdowns) — cross-reference with `research/compromat/05-evidence/duma-api/votes/mobilization-uk.xml` and `research/compromat/02-cross-cutting/09-betrayal-cases.md` Case №1
  - Hero stats on each `partii/*.html` (electoral results, budget %, mandate counts) against the corresponding `research/compromat/01-parties/<NN>-<slug>/README.md`
  - Decree numbers (e.g., №879 Titov bizombudsman, №544 Zyuganov Hero of Labour, №416 Prilepin Order of Courage)

#### B. Cross-link integrity
- All `../research/compromat/...` references resolve to real files on disk (`for f in partii/*.html sujety/*.html; do ...`)
- All `../partii/<slug>.html` cross-links from sujety/ and other partii/ resolve
- `<a href="rodina.html">` should be ZERO occurrences (intentional out-of-scope)
- `assets/js/data/extended-parties.js` `href` fields match real partii filenames
- `assets/js/data/cross-cutting.js` `href` fields match real sujety filenames

#### C. Code quality
- HTML validity: no duplicate `id` attributes within a page, balanced tags
- Section structure: each `<section class="party-sec">` has `id` AND `data-toc-id` matching TOC `data-target`
- `<main id="main" data-page="party">` for partii, `data-page="sujet"` for sujety, `data-page="dokumenty"` for the explorer
- Asset paths: `../assets/...` for `partii/` and `sujety/`, `assets/...` for root pages
- `target="_blank"` policy: every `target="_blank"` to `https://` external URL must have `rel="noopener"` (project convention; internal `../research/...` paths are exempt by site convention but flag if it bothers you)
- No console errors on page load (open `python3 -m http.server` and check)
- Inline JS blocks parse with `node -c`

#### D. Accessibility
- WCAG AA contrast (existing token `--ink-faded: #6F6A60` should be on AA-passing backgrounds)
- `:focus-visible` on every interactive element (buttons, links, tree items, sources-fold heads)
- `prefers-reduced-motion` respected (animations should disable; check that `transition` rules degrade)
- Mobile: pages must work down to 320px width without horizontal overflow
- No-JS fallback: text content must be visible without JavaScript (sticky TOC and Chart.js graphs are exceptions; partii pages should still read fine)
- Keyboard nav: all features in dokumenty.html reachable via keyboard (`/`, Tab, Enter on tree items, Ctrl+B for tree-toggle)

#### E. Visual / UX
- Site uses cream `#F0EAD6` background for the «газета» feel; explorer uses neutral grey `#f3f3f3`. Verify no chromatic clash on cross-navigation.
- Sticky-TOC: visible only on ≥1080px desktop, hidden on smaller. Section letter labels (A · B · C ...) match section counts.
- Hero stats: 4 cells, `.alert` class on truly emphatic stats only (don't over-use)
- Sources-fold: collapsible at section end; one per section in partii/sujety
- Vote-bar component: green = «vote-against» token (left segment, labelled «За» in legend), red = «vote-za» token (labelled «Против»). This inverted mapping is INTENTIONAL — see `vote-bar.js` comment

#### F. Critical: «portyanka» problem (the core ask)

**The reader feedback verbatim**: «Сейчас для обычного пользователя это выглядит как очередная статья, которую с "клиповым мышлением" тяжело читать — надо сделать как-то более подробно, но при этом при помощи визуализаций.»

The 14 partii pages and 6 sujety pages are **long-form prose**. Each section has 3–6 paragraphs of dense Russian text. Existing visual breaks: 1 vote-bar block (Section E in partii) + 1 vertical timeline (Section G or last section) + sources-fold blocks. Otherwise: walls of text.

The user wants the SAME information density (or denser), but expressed through **visualizations** that allow at-a-glance comprehension and reward deeper exploration. Current components available without new dependencies:

- **Chart.js 4.4.1** (already on every page via CDN) — bar, line, pie, doughnut, radar, scatter
- **vote-bar.js** — `renderVoteBar(rootEl, {law, for, against, abstain, skip, subtitle})` — stacked bar + label + counts
- **timeline-vert.js** — `renderTimelineVert(rootEl, [{date, text, muted}])` — vertical chronology
- **sources-fold.js** — collapsible blocks
- Native `<table>`, `<details>/<summary>`, CSS Grid / Flex
- The site already has on `vybory.html`: `threat-matrix` (8×4 colored cells with tooltip), `calculator` (state-input → re-render), `heatmap`, `ladder` (vertical thresholds), `waffle` (10×10 grid), `flow` (sankey-lite), Shpilkin chart (Chart.js)

**Tasks F1–F4**:

##### F1 — Inventory current visualisation density per page

For each of the 14 partii + 6 sujety, count:
- # of `<p>` paragraphs in content sections (excluding hero, sources-fold)
- # of vote-bar instances (rendered via `renderVoteBar`)
- # of timeline instances
- # of HTML tables
- # of inline `<img>` / `<svg>` other than icons
- words approx. in body content

Rank pages by «text-to-visual ratio» — highest is most in need.

##### F2 — Per-page visualisation proposals (3–7 each)

For every partii and sujet page, propose 3–7 SPECIFIC visualisations that would replace or supplement particular paragraphs. Each proposal must include:

- **Section / paragraph it replaces or augments** (e.g., «Section B (Финансирование) — paragraph 2 about 93% budget share»)
- **Visualisation type** (one of: Chart.js bar/line/pie, custom SVG, CSS Grid heatmap, scrubber/slider, comparison-bars, sankey-lite, network graph, tile collage, etc.)
- **Required data** (what fields, in what shape — JSON snippet)
- **ASCII or Mermaid mockup** of what it should look like
- **Implementation sketch** (which existing component or new file; estimated LOC; Chart.js config example if applicable)
- **Risk** (what could go wrong / readability concerns)

Examples of the style we want (give 3–5 like these):

> **Proposal P1 — partii/kprf.html, Section E (Voting)**
> *Replace*: paragraphs 3–4 listing «фракционно против на ФЗ-…» cases.
> *Visual*: 28-row dot-matrix heatmap (28 laws × 1 column for KPRF) where each cell is colour-coded (red = «за», green = «против», orange = «воздержались», grey = «отсутствовали»). Hover any cell → tooltip with vote_id + summary.
> *Data*: extract from existing `LAWS[]` data file, filter `votes.kprf` → matrix.
> *Mockup*:
> ```
>     2019      2020      2022    2023      2025
> KPRF ◼◼◼◼◻◼◼   ◇◇◇◼◼◼◼   ◼◼◼◼   ◼◼◼◇◼   ◼◼◼◼
>           (фракционно против)  (мобилизация)
> ```
> *Implementation*: ~40 lines vanilla JS + CSS Grid; could become reusable `vote-matrix.js` component for all partii pages.
> *Risk*: 28 cells × 14 parties = 392 cells if we standardise; mobile layout requires horizontal scroll.

##### F3 — Catalogue of «universal» components proposed for the codebase

Propose 5–10 NEW reusable components that would benefit multiple pages (e.g., «authorship-network»: graph showing co-authors of a single bill across factions). For each:
- Name, purpose
- Pages it would help
- Rough API (function signature)
- Estimated complexity (S/M/L)
- Risks

##### F4 — Mobile-first storytelling pattern

Propose a mobile-first pattern that turns each page into a **scroll-driven narrative** (think «scrollytelling» — Pudding-style or NYT Upshot — but vanilla, without libraries). For example:
- Section A: large quote-card → scroll → small infographic → scroll → next section heading
- Use `IntersectionObserver` (already used in `scroll-spy.js`) to trigger reveals
- One specific page (you pick, ideally `partii/yabloko.html` because it's the most narrative-heavy) — write a full mockup of how the redesigned mobile flow would look, paragraph-by-paragraph

### Output format — single big file

Save findings to:

```
docs/superpowers/reviews/2026-05-05-comprehensive-review.md
```

Structure (use H1/H2/H3 headings so it's navigable):

```
# Comprehensive Review — Compromat Pages (Phases 1–5.1)

## 1. Executive summary
- Top 5 critical issues (must fix)
- Top 5 quick wins (≤30 min each)
- Top 3 strategic recommendations (multi-day)
- Overall quality rating with reasoning (1–10)

## 2. Per-page audits

### 2.1 index.html
### 2.2 partii/er.html
…
### 2.20 sujety/vneparlamentskie.html
### 2.21 dokumenty.html

(For each: bugs found, content issues, accessibility gaps, visual notes, suggested visualisations from F2)

## 3. Cross-cutting issues
- 3.1 Naming inconsistencies
- 3.2 Source-attribution gaps
- 3.3 Cross-link breaks
- 3.4 Mobile breakage points
- 3.5 Console errors

## 4. Visualisation proposal catalogue (the core deliverable)

### 4.1 Per-page proposals
… one subsection per page from F2 with 3–7 proposals each …

### 4.2 New universal components
… 5–10 from F3 …

### 4.3 Scrollytelling mockup (one page)
… F4 deliverable …

## 5. Quick-win punchlist
| # | File | Line | Issue | Fix | Time |
|---|---|---|---|---|---|

## 6. Strategic recommendations
… longer initiatives with rationale …

## 7. Methodology
- What you reviewed, how you split work between subagents, what you sampled vs read in full, time spent
```

### Allowed tools

- `Read`, `Grep`, `Glob`, `Bash` (for `grep`/`find`/`curl http://localhost:8765`/`python3 -m http.server`/`node -c`/`wc`)
- `WebFetch` if you need to verify external URLs (use sparingly; many RU links are geo-blocked)
- `Agent` — spawn subagents in PARALLEL for independent page audits. Recommended split:
  - 1 agent: Phase 1 + Phase 5 (index + dokumenty) — code quality + UX
  - 1 agent: 5 parliamentary partii pages — content + viz proposals
  - 1 agent: 9 extra-parl + spoiler partii pages — content + viz proposals
  - 1 agent: 6 sujety pages — content + viz proposals
  - 1 agent: cross-cutting consistency + mobile breakage smoke
  - You assemble their findings into the single output file
- `Write` — to create/append the review file at the specified path
- **DO NOT** use `Edit`, `Write` (except to the review file), or any tool that modifies the audited code/content

### Constraints

- **No new dependencies**: don't suggest «add React», «use TypeScript», «add a build pipeline». Site is intentionally vanilla HTML/CSS/JS, deploys via GitHub Pages, no compile step. Chart.js (CDN), marked.js (CDN), mammoth.js (CDN-lazy), SheetJS (CDN-lazy) — these are the existing libs you can lean on.
- **Vanilla JS only** for new component proposals.
- **No backend additions** — site is static.
- **Russian** for any user-facing text suggestions; tone analytical, neutral, спокойный.
- Russian quotes `«...»`, em-dashes `—`.
- **Don't propose redesigning the whole site** — only break-up-text-with-viz for the new pages; the existing `index.html` / `vybory.html` / `tsenzura.html` design is settled and out of scope for redesign.

### Time budget

30–90 minutes is fine; deeper if you find rabbit holes worth exploring. Prioritise the visualisation proposals (Section 4) — that's the user's main ask.

### Final deliverable

A single Markdown file at `docs/superpowers/reviews/2026-05-05-comprehensive-review.md`. Make it scannable from the top (executive summary) and deep on drill-down. Estimated length: 4 000–10 000 words.

### Sanity-check before you start

Confirm by listing:
1. The current `git log --oneline -5` — should show recent `feat(dokumenty): clickable path-links` and `merge(dokumenty): phase 5.1 polish`.
2. `ls partii/*.html` — should show 14 files.
3. `ls sujety/*.html` — should show 6 files.
4. `ls dokumenty.html` — should exist.
5. `ls assets/js/data/dokumenty-tree.json` — should be ~36 KB.

If any of these fail, you are on the wrong branch / wrong directory. Fix that first.

---

## END OF PROMPT

(Paste everything from «You are auditing a Russian-language analytical static site» through the «Sanity-check» list into the fresh session. The review file path is the only destination — the agent will save findings there.)
