# Comprehensive Review — Compromat Pages (Phases 1–5.1)

**Date:** 2026-05-05
**Scope:** 21 pages — `index.html` (Phase 1 hub) · 14 `partii/*.html` (Phases 2–3) · 6 `sujety/*.html` (Phase 4) · `dokumenty.html` (Phase 5.1).
**Method:** 5 parallel review agents (one per page-cluster) + cross-cutting consistency sweep + manual fact-checks. Read-only audit; no code modified.
**Sources cross-referenced:** `research/compromat/01-parties/<NN>-<slug>/{README,A,B,C,D,E,F,G,H}.md`, `02-cross-cutting/*.md`, `05-evidence/duma-api/votes/*.xml`, `05-evidence/kremlin-decrees/*`, design spec `docs/superpowers/specs/2026-05-05-compromat-pages-design.md`.

---

## 1. Executive summary

### 1.1 Top 5 critical issues (must fix)

1. **`partii/kommunisty-rossii.html:100`** — raw markdown `**откол от КПРФ**` inside `<p>` (rendered literally as asterisks in the browser) **plus** typo `Откололовшаяся` (should be `Отколовшаяся`). Single-character / single-word fix.
2. **Backtick-leaked internal research-archive paths in user-facing prose** — `independed_research_result_1.md стр. 308`, `independed_research_result_2.md стр. 50–63`, `99-open-questions/verification-checklist.md`, etc. Confirmed in `partii/{pensionery,zelenye,rpss,grazhdanskaya-platforma}.html` at 7+ specific call-sites (note: original typo «independed» preserved from the research filename). Public reader sees a backtick-formatted internal filename with no context.
3. **`partii/er.html:85–88` TOC letter-gap** — sequence is `A · B · C · E` with **D missing**. Section anchor `id="voting"` is labelled `E`. ER is the only one of 14 partii pages with a broken letter run. Either re-letter to `D · Голосование` or insert a `D · Связи с государством` section.
4. **`assets/og/home.png` does not exist** — `index.html:17` declares `og:image="…/assets/og/home.png"`; file system contains only `tsenzura.png/svg`. Sharing the home page in any social network produces a broken card. Spec `CLAUDE.md` requires paired `.png/.svg` for *every* page; **20 of 21 pages have no `<meta property="og:image">` at all**.
5. **`partii/novye-lyudi.html:148–151`** — `<div id="financingChart"></div>` is declared with `<h4>` heading but never rendered (the inline `<script>` has a placeholder comment `// B. Financing — placeholder for future Chart.js bar (skip in this phase, just render text)`). On the live page this is a visible empty rectangle under a heading.

### 1.2 Top 5 quick wins (≤ 30 min each)

| # | What | File / Line | Time |
|---|---|---|---|
| 1 | Fix raw markdown leak in `kommunisty-rossii.html:100` (`**…**` → `<strong>…</strong>`) and typo `Откололовшаяся` → `Отколовшаяся`. | `partii/kommunisty-rossii.html:100` | 2 min |
| 2 | Re-letter ER TOC: replace `<span class="num">E</span>` with `<span class="num">D</span>`. | `partii/er.html:88` | 2 min |
| 3 | Fix Russian plural in `dokumenty.html:57`: «N файлов» → «N файла» (when N=233 ends in 3). Use the existing `pluralRu()` helper from `extended-parties.js:2`. | `dokumenty.html:57` | 5 min |
| 4 | Fix mobilizatsiya temporal slip: «Через **15** месяцев он же шёл на президентских выборах 2024» → «Через **18** месяцев…». 21.09.2022 → 17.03.2024 = ≈18 мес. | `sujety/mobilizatsiya.html:136` | 2 min |
| 5 | Tone correction in munitsipalnyy-filtr: «до его **убийства** в феврале 2024 г.» → «до его **гибели** в феврале 2024 г.» (нейтральный аналитический тон требует не утверждать преступление без приговора). | `sujety/munitsipalnyy-filtr.html:191` | 1 min |

### 1.3 Top 3 strategic recommendations (multi-day)

**S-1 — «Портянка» problem: introduce 5–7 universal viz components.** The single biggest reader-experience risk identified (highest text/visual ratio: yabloko at 4585 words / 1 visual, gr-platforma at 4139 / 1, partiya-dela at 4062 / 1). Implementing the universal-components catalogue in §4.2 turns 14 stride-of-text partii pages into scannable dossiers. Estimate: 3–5 dev-days, ~600 LOC of new vanilla JS, ~300 LOC of CSS, no new dependencies.

**S-2 — Site-chrome completeness: footer + dokumenty in topnav + OG images.** 20 of 21 pages have no `<footer>`. `dokumenty.html` has no place in the site's `<nav class="page-toggle">`. 20 of 21 have no `og:image` (and the 21st points to a 404). Bundle these into one «site chrome» ticket: ~6–8h of mostly-mechanical edits + an automated OG-image generator (SVG template + Pillow/CairoSVG export script). Single high-leverage cleanup that affects every page.

**S-3 — Scrollytelling pilot on `partii/yabloko.html`.** Highest portyanka score in the batch + the most narrative-heavy section (G · Кризисы и война). Mobile-first scroll-driven sequencing using existing `IntersectionObserver` infrastructure (`scroll-spy.js`, `reveal.js`) — no new deps. Detailed mockup in §4.3. Pilot effort: 4 dev-days. If accepted, the same pattern lifts to `gr-platforma`, `partiya-dela`, `kommunisty-rossii` over a sprint.

### 1.4 Overall quality rating

**8 / 10.** The project demonstrates rare editorial discipline: zero broken internal cross-links, zero stray `console.log` in production, zero `rodina.html` references (intentional out-of-scope honoured), zero HTML-balance errors across 21 pages, almost-zero numeric-plural errors in Russian agreement, consistent tokenisation of `«…»` and `—`. Source-attribution markers (🟢🟡🟠🔴) are used systematically. Hero stats verify against dossier READMEs.

The two-point deduction reflects (a) the «портянка» problem — every partii/sujet page is a 2200-4500-word longread with one terminal timeline, structurally identical across 20 pages — and (b) site-chrome gaps (no footers on sub-pages, missing OG images, dokumenty.html absent from nav). The first is by design and is the user's stated next milestone; the second is a consistent oversight worth one bundled cleanup ticket.

---

## 2. Per-page audits

> Format per page: bug list (with file:line), content/tone notes, accessibility, code-quality, density inventory, key viz proposals (numbered for reference in §4). Bugs are file-identified; viz proposals are summary-level here and expanded in §4.

### 2.1 `index.html` (Phase 1 hub)

**Bugs**
- `index.html:17` — `og:image="…/assets/og/home.png"` → file does not exist (`assets/og/` contains only `tsenzura.{png,svg}`). 404 in social cards.
- `index.html:73-77` (top-nav) vs `index.html:85-91` (sticky-TOC) — two parallel mini-navs with disjoint label sets (`#paradox`, `#timeline` only in top-nav; `#cross-cutting`, `#docs-panel` only in TOC). Reader who uses both paths sees inconsistent sections.
- `index.html:74` `<a href="#parties">` (top-nav) and `index.html:87` `<a href="#parties-extended">` (sticky-TOC) — same label «Партии», two different destinations.
- `assets/js/data/extended-parties.js:40` — id `'rppss'` (three p's) typo for «Партия пенсионеров» row; clean siblings are `'kr'`, `'green-alt'`, `'rpss'`, `'gp'`. Not a CSS hook today, but easy to confuse with the next-row `'rpss'` id.
- `extended-parties.js:38,42` — two leader fields contain literal em-dash placeholders `'— проектная'`, `'— нишевая'` — render as visible em-dash in card body.
- `index.html:43-47` — `<noscript>` claims «Текстовые разделы доступны». Reality: 4 hero stats, 14-card party hub (`#extendedParties`), matrix body, 5-portraits grid (`#partyGrid`), 6 cross-cutting teasers (`#crossCuttingCards`), timeline, comparison-bars, two charts — all JS-rendered. The noscript message is *misleading*; ≈60% of the page is empty without JS.
- `index.html:348` — canvas fallback uses ASCII straight quotes: `«…"против"…»` should be `«против»`. The `aria-label` on the same canvas correctly uses `«…»`.

**Content / tone**
- `index.html:113` — «кнопка, нажатая в зале заседаний» is rhetorically forceful; borderline for the «спокойный» voice. Acceptable, flagged.
- `index.html:209-212` — filter button «Где была оппозиция» is colloquial; «Только с фракционным «против»» reads more analytical.
- `index.html:243` — section `id="parties"` (5-portraits) is functionally redundant with the 14-card extended hub at `#parties-extended`; two portrait galleries on the same page is repetition.
- `index.html:295-297` — hardcoded `11%` average in inline HTML; will not refresh if law data updates. Worth pulling into a derived value.

**A11y**
- Sticky-TOC is desktop-only (≥1080px); mobile readers get only the 4-link top-nav, which doesn't even share labels with the sticky-TOC. Spec §3.6 calls for a collapsed «Содержание ↓» on mobile.
- `#matrixBody`, `#partyGrid`, `#timelineList` are critical content containers with no static fallback. Strict-CSP / no-JS readers see blank sections.
- `.vote-cell` in the matrix has click handlers but no `tabindex="0"` and no Enter handler; keyboard-only users cannot activate it.
- `.ep-badge` (gold pill) at `font-size: 10px` is below WCAG comfortable-reading threshold despite passing pure contrast.

**Code-quality**
- `extended-parties.js:17` — `<a class="ep-card" style="--stripe:${p.stripeColor}">` interpolates `p.stripeColor` raw into a `style` attribute. Today the data is hand-curated CSS-var fragments; conceptually this is a CSS-injection vector.
- `hero-stats.js:6` and `extended-parties.js:24` — interpolate `${s.label}` / `${p.hookBadge}` as raw HTML (intentional, since labels contain `<strong>`); flag for future contributors.
- `index.html:438-456` — full bulk script load includes `whitelist.js`, `digital-*` modules etc. that are tsenzura-page concerns. ~50-80 KB of waste on the home page; the inline comment justifies it for SPA-router compatibility, but the site is multi-page in practice.

**Visual notes**
- The 14-card grid is well-paced with `auto-fill, minmax(220px, 1fr)`; at 1080–1280px lays out as 4–5 columns. Card stripe at 4px feels thin on dark patterns; consider 5–6px.
- TOC progress-bar boundary is at exactly 1080px — at 1080–1180px the TOC overlaps content slightly because no margin is reserved for it.
- Three visual zones (cream main body, dark Paradox, dark Documents teaser) read as a clean rhythm.

**Density** — 6 in-body sections, 5 existing visualisations (matrix, comparison-bars, timeline, years-chart, opposition-chart). Index is the single best-balanced page in the batch; the «portyanka» problem on it is concentrated between the 14-card hub and the matrix (long card-scroll then long grid-scroll).

**Viz proposals**: P-idx-1 (seat-strip — «72% мандатов · 0% независимости · 11% против»), P-idx-2 (coauthor-flow — fractions × laws sankey-lite), P-idx-3 (paradox scatter — replaces comparison-bars), P-idx-4 (law-calendar — monthly density 2019-2025).

---

### 2.2 `partii/er.html` (Phase 2 — Единая Россия)

**Bugs**
- `partii/er.html:88` — TOC letter sequence `A · B · C · E` (no `D`). Either insert `D · Связи с государством` section or relabel `E` → `D`.
- `partii/er.html:37` — top-nav «Голосования» link carries `class="is-current" aria-current="page"` while the user is at `/partii/er.html`; screenreader announces the wrong page as current. Same anti-pattern in all 14 partii pages and 6 sujety pages.
- `partii/er.html:107` — double source-tier marking: emoji `🟢` plus `<span class="lvl g"></span>`. Screenreader announces both («зелёный круг — зелёный кружок»).

**Content / tone**
- `partii/er.html:69` — `<h1>«<em>Единая Россия</em>» — <span class="acc">325 мандатов</span>, 100% поддержки.</h1>` is typographically heavy: nested quotes + italics + dash + two aggregate numbers. Could split: brand in `<h1>`, numbers into hero-stats.
- `er.html:74` — «49,82% — 28 064 200 голосов, 325 мандатов из 450» — the «50% голосов = 72% мандатов» tension is the page's core thesis but isn't visualised. Strong candidate for P-er-1 (450-cell waffle with 226/300 thresholds).
- `er.html:150` — list of 8 deputies (Володин, Хинштейн, Боярский, Аксёнов, Картаполов, Карлов, П. Толстой, Пискарёв) in a single 250-word paragraph. Wall of text.

**A11y / code**
- 7 internal `target="_blank"` without `rel="noopener"` (lines 109, 136, 164, 177, 181, 194, 195).
- `<i>●</i>` in meta-row without `aria-hidden="true"` — screenreader announces a bullet.
- `chart-card` containing `#votingBars` has no `<noscript>` fallback; static description «100% за по всем ограничительным законам» appears earlier in `<p>` but not within the chart structure.

**Density** — `<p>` count 6 · vote-bars 1 · timelines 0 · tables 0 · words ≈ 955. Shortest deep partii page; ratio 955 words : 1 visual is the lowest in the parliamentary batch but still text-heavy proportionally to content.

**Viz proposals**: P-er-1 (mandate-bar 450 cells with 226/300 thresholds), P-er-2 (budget-share horizontal compare), P-er-3 (author grid — 4×2 portrait cards), P-er-4 (5-fraction × 8-laws heatmap reusing `vybory.html#heatmap`).

---

### 2.3 `partii/kprf.html` (Phase 2 — КПРФ, двойная оппозиция)

**Bugs**
- `partii/kprf.html:71` vs `:102` vs `:137` — number of votes for КПРФ on ГД-2021 is given as **`10,66 млн`** (rounded) → **`10 660 715`** (precise) → **`10 660 669`** (financial-calc). Two different precise numbers inside one page. README uses 10 660 715. Sigma «принявшие» vs «действительные» is the likely cause; needs a consistent footnote.
- `partii/kprf.html:248` — direct quote `«идиотская ставка ЦБ душит производство»` (Зюганов) without inline link to source.
- `partii/kprf.html:37` — same `aria-current="page"` anti-pattern as ER.

**Content / tone**
- `kprf.html:171–175` — 5 long paragraphs of leader profiles (Зюганов, Афонин, Мельников, Останина, Харитонов), each with cross-references to duma.gov.ru. Wall of text; classic candidate for the universal `leader-grid` (see §4.2 / U2).
- `kprf.html:205` — list of 6 Зюганов awards (1999, 2004, 2014, 2019, 2024-Дружба, 2024-Герой) inline in prose. Natural fit for a compact `decree-strip` (U6).
- `kprf.html:293-297` — 5 «нейтрализационных» cases (Селезнёв, Семигин, Грудинин, Рашкин, Левченко, Бондаренко) packed into 3 paragraphs ≈ 700 words. Strongest candidate for `case-grid` (U3) on this page.

**A11y / code**
- 33 internal `target="_blank"` without `rel="noopener"` (research file links).
- `votingBars` and `crisisTimeline` data declared as inline literals in `<script>` — extraction to `assets/js/data/party-votes/kprf.js` would centralise updates.
- `<strong>` blocks of 30+ words at lines 171, 174 — overuse of emphasis defeats its semantic purpose.

**Density** — `<p>` 32 · vote-bars 1 · timelines 1 · tables 0 · words ≈ 3658. Ratio ≈ **1829 wpv** — heavy.

**Viz proposals**: P-kprf-1 (budget-share 2017–2024 line, vs 5-faction median), P-kprf-2 (leader-grid — 5 cards with tag-pills), P-kprf-3 (decree-strip of 6 awards 1999–2024), P-kprf-4 (functional-split: 4 social-economic «против» vs 8 military-repressive «за»), P-kprf-5 (case-grid of 6 нейтрализаций).

---

### 2.4 `partii/ldpr.html` (Phase 2 — ЛДПР, после Жириновского)

**Bugs**
- `partii/ldpr.html:74` — hero says **«23 мандата (включая Журавлёва из Родины)»**; README `04-ldpr/README.md` and `A-origins.md:49` say **«21 мандат»**. Possibly 21 списочных + Журавлёв + 1 одномандатник = 23, but the maths isn't shown. Footnote required.
- `partii/ldpr.html:174` — long English-language quote from the Owen Inquiry «I am sure that Mr Lugovoy and Mr Kovtun placed the polonium-210 in the teapot at the Pine Bar on 1 November 2006…» without `<span lang="en">` wrapper. Russian-locale screenreader will mispronounce.
- `partii/ldpr.html:172` — direct quote from Луговой `«обыкновенное предательство»` without inline source link.

**Content / tone**
- `ldpr.html:71` — hero paragraph at 230+ words listing 4 biographical facts (Жириновский †, Слуцкий election, ambassadorial rank, Литвиненко) is the longest hero on the parliamentary batch.
- `ldpr.html:103` — reconstruction of ЛДПСС creation (Бобков, Завидий, 3 млн ₽) is mostly memoir-sourced (`🟠`, single-source). The marker is in the fold but the body prose presents it as fact.
- `ldpr.html:301` — claim «единственная парламентская партия, за всю историю которой Минюст не регистрировал партий-двойников» is a strong assertion without dedicated source.

**A11y / code**
- 38 internal `target="_blank"` without `rel="noopener"`.
- 3 hero-stats with `.alert` class — `7,55%` is a baseline statistic, not an alert-level finding; reduce to 2.

**Density** — `<p>` 30 · vote-bars 1 · timelines 1 · tables 0 · words ≈ 4354. Ratio ≈ **2177 wpv** — highest in the parliamentary batch.

**Viz proposals**: P-ldpr-1 (electoral-trajectory 1993–2024 with «★ 06.04.2022 — Zhirinovsky †» annotation), P-ldpr-2 (leader-grid 6 cards), P-ldpr-3 (sanction-profile 5×5 matrix UK/US/EU/CA/AU), P-ldpr-4 (parallel timeline — biography of Луговой ↔ biography of FZ-255 «иноагенты»), P-ldpr-5 (case-grid — Родина 2021 / Партия дела 2024).

---

### 2.5 `partii/srzp.html` (Phase 2 — Справедливая Россия — За правду)

**Bugs**
- `partii/srzp.html:174` — «майор армии ДНР, замкомандира батальона Народной милиции ДНР» — should be «замкомандира батальона Народной милиции ДНР». «Армия ДНР» as a separate entity is imprecise; verify exact unit per `C-leaders.md`.
- `partii/srzp.html:243` — text says «В 18 ключевых голосованиях ограничительного блока 2019–2025 годов СРЗП — 89% «за»» but the rendered `votingBars` covers only 8 votes. Add subtitle «8 наиболее значимых; полный массив — в research/».
- `partii/srzp.html:303` — the «координированное партстроительство Кремля» framing is `🔴` авторская интерпретация per the fold, but the body uses no modal hedge («*по реконструкции…*»).

**Content / tone**
- `srzp.html:71` — 360-word hero paragraph (longest on any partii page). Split into 2.
- `srzp.html:103-105` — 3 paragraphs about «3 волны слияний» without timeline. Strongest candidate for the `mergers-timeline` component (U7).
- `srzp.html:139` — donor-history dataset relies on a 2015 figure («ИК «РУСС-ИНВЕСТ» 19,4 млн ₽»). Ten years stale; flag as «исторический донор» or refresh.

**A11y / code**
- 42 internal `target="_blank"` without `rel="noopener"`.
- Inline-script data-blocks for `votingBars` (lines 404–415) and timeline (418–428).

**Density** — `<p>` 30 · vote-bars 1 · timelines 1 · tables 0 · words ≈ 4154. Ratio ≈ **2077 wpv**.

**Viz proposals**: P-srzp-1 (mergers-timeline — three waves 2006/2021/2025 with curators), P-srzp-2 (leader-grid 6 cards), P-srzp-3 (D-section integration matrix 4×5), P-srzp-4 (authorship-table — Аксаков/Миронов/Нилов × FZ), P-srzp-5 (sanction-heatmap 5 leaders × 7 regimes).

---

### 2.6 `partii/novye-lyudi.html` (Phase 2 — Новые люди)

**Bugs**
- **`partii/novye-lyudi.html:148-151`** — `<div id="financingChart"></div>` declared with `<h4>` heading but **never rendered**. Inline script has placeholder comment `// B. Financing — placeholder for future Chart.js bar (skip in this phase, just render text)`. **Visible empty rectangle on page.**
- `partii/novye-lyudi.html:67` — hero meta-row says «**15 мандатов** в VIII Думе»; hero-stats says «**13 мандатов** по федеральному списку». 15 likely = 13 списочных + 2 одномандатника (Леонов, Певцов?), but page does not explain.
- `partii/novye-lyudi.html:174` — `<a href="https://www.tadviser.ru/index.php/Компания:Фаберлик_(Faberlic)">` URL contains unencoded Cyrillic and parentheses. Modern browsers handle this via percent-encoding on click, but verify in older clients.
- `partii/novye-lyudi.html:104` — does NOT mention that Александр Даванков (Faberlic co-founder) is **дядя** Владислава Даванкова. README explicitly notes this kinship as a structural argument.

**Content / tone**
- `novye-lyudi.html:144` — «крупнейшие пожертвования внесли физические лица 1998+ года рождения» — unintuitive numerical record. Replace with «моложе 23 лет на момент выборов».
- `novye-lyudi.html:182-187` — 6 leaders in 6 short single-sentence paragraphs. Already nearly tabular; should be a grid.
- `novye-lyudi.html:188` — «доход Нечаева ≈ 4,4 млрд ₽» — the cleanest single anchor on the page; deserves its own visualisation.
- `novye-lyudi.html:241` — text says «92% «за» по 28 ключевым ограничительным законам» but votingBars renders only 8.

**Density** — `<p>` 29 · vote-bars 1 (+1 dead) · timelines 1 · tables 0 · words ≈ 1631. Ratio ≈ **816 wpv** — best of the 4 «full» pages (because shortest), but the empty `#financingChart` is a visible defect.

**Viz proposals**: P-nl-1 (implement `#financingChart` — Chart.js stacked-bar 2021–2024), P-nl-2 (hero-block 3-month vs 7-year registration vs Партия Прогресса), P-nl-3 (leader-grid 6 cards), P-nl-4 (income-comparison horizontal bar — Нечаев 4400 vs Слуцкий/Аксаков/Зюганов ≈ 5–14 млн), P-nl-5 (highlighted standalone vote-bar for VPN-2025 — «единственный системный «против» НЛ за весь VIII созыв»).

---

### 2.7 `partii/yabloko.html` (Phase 3 — STRUCTURAL EXCEPTION)

**Bugs**
- `partii/yabloko.html` §F (lines ~265-300) — references the three liquidations (Партия дела, Гр. Инициатива, Партия Роста) but links go to `../research/compromat/01-parties/<NN>-<slug>/` markdown dossiers, not to the public `partii/<slug>.html` siblings. RPSS by contrast cross-links to all 8 sibling partii pages — striking asymmetry. Quick sweep: convert each `01-parties/09-partiya-dela/` ref to `partiya-dela.html`, etc.
- Hero stat «11+ членов в реестре иноагентов» — the §C body lists only 8 members by name; README says «11+ человек (в т. ч. Шлосберг, Вишневский, Беседина, Резник, Дорохов)». Either list all 11 by name in §C, or rephrase «8 публично известных + минимум 3 региональных функционера».

**Content / tone**
- Tone is exemplary — the four §F qualifications («электоральная угроза = 0», «внутрипартийный авторитаризм», «конфликт с УГ», «встреча 2023») are rigorously hedged; no overclaiming.
- Plurals all correct: «0 мандатов», «4 депутата», «27 депутатов», «98 членов», «88+ тыс. подписей», «1,3 млн». Russian quote/dash glyphs everywhere; no ASCII contamination.
- §F line 268 — «функция электорального резервуара-предохранителя» phrase is in plain `<p>` but is an interpretation, not fact. The 🔴 marker is on the `02-cross-cutting` link only.

**A11y / code**
- 7+ internal `target="_blank"` without `rel="noopener"` (lines 118, 145, 178, 179, 212, 246, 280).
- TOC has `<aside aria-label="Содержание досье">` — correct.
- Timeline rendered through `renderTimelineVert(crisisRoot, [...])` after JS load — full chronology is also narrated in §G prose, so no-JS readers get the same factual content. Pattern correct.

**Density** — 36 paragraphs · 1 timeline · 0 vote-bars · 0 tables · words ≈ 4585. **Highest text/visual ratio in the entire batch (≈4585 wpv).** «Портянка» is most justified here.

**Viz proposals (7)**: P-yab-1 (electoral-trajectory dot+line 1993–2021 with 3% / 5% threshold lines), P-yab-2 (revenue bar 6 partii, log or linear, ×47 from ER), P-yab-3 (persecution mini-timeline), P-yab-4 (institutional-integration table — «что есть у пятёрки vs у Яблока»), P-yab-5 (4 §F-limitations as icon cards), P-yab-6 (foreign-funds checkpoint matrix 14 funds × 0 hits + LI/ALDE), P-yab-7 (parallel-column timeline). **+ §4.3 scrollytelling pilot.**

---

### 2.8 `partii/partiya-rosta.html` (Phase 3 — Титов, конфликт интересов)

**Bugs**
- None critical. All 4 hero stats spot-check against `07-partiya-rosta/README.md`: ≈58% Абрау-Дюрсо ✓, 1.29% ГД-2016 ✓, <1% ГД-2021 ✓, decree №879 ✓, 20.11.2025 liquidation ✓, 0,76% Титов 2018 ✓.
- §F line 250 «Это **организационная оптимизация**» — interpretive bold should carry inline `🔴` marker, not just in fold.

**Content / tone**
- §C lines 162–164 — «Между двумя указами не было полноценного периода вне президентских должностей» — strong analytical claim, properly hedged.
- §F lines 252+ — three-liquidations cluster (Партия дела 27.11.2024, Гр. Инициатива 06.2025, Партия Роста 20.11.2025) integrates well, all three sister pages linked.

**A11y / code**
- 8 internal `target="_blank"` without `rel="noopener"`.
- 7-letter TOC `A B C D E F H` (no G — matches plan, intentional).
- Inline JS 7-entry timeline parses ✓.

**Density** — 25 paragraphs · 1 timeline · 0 tables · words ≈ 3460. Ratio **3460 wpv**.

**Viz proposals**: P-pr-1 (Titov state-position cumulative timeline — segmented horizontal bar 1991–2026), P-pr-2 (lobbying-comparison cards — Партия Роста/Абрау vs Партия Дела/Ростсельмаш), P-pr-3 (family-business handover diagram), P-pr-4 (party-trajectory flow «Правое дело → Партия Роста → НЛ»), P-pr-5 (3-liquidations coincidence strip — shared component, see U8).

---

### 2.9 `partii/grazhdanskaya-initsiativa.html` (Phase 3 — Надеждин-2024)

**Bugs**
- None critical. Two-Nechaevs disambiguation cleanly bulleted (§C). Надеждин dates verified: 7.12.2023 выдвижение, 23.12.2023 отказ Дунцовой, 8.02.2024 отказ Надеждину. 9,3% брака подписей correctly stated.
- 3 instances of `Партия Дела` (capitalised Д) in this file — should be `Партия дела` (lowercase д) for consistency with house style (29 correct vs 4 incorrect across 21 pages).

**Content / tone**
- Hero stat 1 `Нечаев ≠ Нечаев` is excellent — `.alert` (red) class is the right hook for a disambiguation.
- §F line 257 — uses correct `«…»` glyphs, no ASCII slip.

**A11y / code**
- 7-entry timeline parses ✓.
- TOC entries 7 (A-F + H, no G) — matches plan.

**Density** — 25 paragraphs · 1 timeline · 0 tables · words ≈ 3475. Ratio **3475 wpv**.

**Viz proposals**: P-gi-1 (two-Nechaevs disambiguation upgraded from `<ul>` to 2-column cards, see U9), P-gi-2 (Надеждин-2024 chronology vertical scrolly cards — replace existing `<ul>` redundancy with timeline-vert only), P-gi-3 (3-liquidations coincidence strip, shared U8), P-gi-4 (signatures geo-bubble «208 тыс. в 120+ городах» — risky data-availability), P-gi-5 (party-incubator comparison Собчак-2018 vs Надеждин-2024).

---

### 2.10 `partii/partiya-dela.html` (Phase 3 — Бабкин, Программа 1432)

**Bugs**
- §H line 309 — «28 декабря 2023 г. турецкая Basak Traktör закрыла покупку 96,7%». **Verified** against `research/compromat/01-parties/09-partiya-dela/H-foreign-ties.md:13,35,62` — date correct.
- 4 ASCII-hyphens `2014-2018` in `<meta name="description">` and `<meta property="og:description">` — should be en-dash `2014–2018`.

**Content / tone**
- §C line 161 quote `«Программу 1432… мы на свой счёт записываем»` (Бабкин, 161.ru 17.02.2025) — properly italicised, source linked. Cleanest direct-quote treatment in batch.
- §D-§F structurally distinguish «программа партии лоббирует субсидию → бизнес лидера получает субсидию» — strongest conflict-of-interest narrative in the project.
- §F lists 5 institutional instruments (Ростсельмаш / Росспецмаш / Новое содружество / МЭФ / Партия Дела). Already a list; needs to become a 5-block diagram (P-pd-2).

**A11y / code**
- 5 internal `target="_blank"` without `rel="noopener"`.
- Inline JS 5-entry timeline parses ✓.
- ИНН `6166019871` mentioned 4 times.

**Density** — 26 paragraphs · 1 timeline · 0 tables · 2 ULs · words ≈ 4062. Ratio **4062 wpv** — second-highest portyanka risk after yabloko.

**Viz proposals**: P-pd-1 (Sankey 1432 budget → 78% Ростсельмаш+ПТЗ — CORE), P-pd-2 (5-instrument ecosystem pentagon — Бабкин at centre), P-pd-3 (cross-cutting 3-malys' comparison table), P-pd-4 (Buhler ownership 4-step flow 2007 → 2021 → 2023 Basak), P-pd-5 (before/after Бабкин joined ЛДПР — 0% → 87% бюджета).

---

### 2.11 `partii/kommunisty-rossii.html` (Phase 3 — индустрия двойников)

**Bugs (CRITICAL)**
- **`partii/kommunisty-rossii.html:100`** — raw markdown `**откол от КПРФ**` inside `<p>` will render literally as asterisks. Should be `<strong>откол от КПРФ</strong>`.
- **`partii/kommunisty-rossii.html:100`** — typo `Откололовшаяся` → should be `Отколовшаяся` (one extra syllable «-лов»).
- §F lines 257–285 «именные двойники» table shows 3 rows + «+ ещё 4 округа» placeholder. Source («Ведомости» 08.07.2021) lists all 7. Either fill, or rephrase «3 из 7 публично-задокументированных кейсов».

**Content / tone**
- Hero quotes Памфиловой «позорищем» / «низшей точкой падения политтехнологов» — properly italicised, source-linked.
- §B «Кейс 120 миллионов рублей» (К. Жуков, 13.07.2020) properly marked 🟠 inline AND in fold — methodological gold standard.
- 5-level technology breakdown (lines 250–292: name / ideology / двойники / МГД-2019 / 03.2022 admin replace) is buried in prose — perfect for a 5-card visual.

**A11y / code**
- TOC entries 6 (A-F, no H) — matches plan.
- Static `<table>` at line 255 has proper `<thead>/<tbody>`.

**Density** — 20 paragraphs · 1 timeline · 1 table · words ≈ 3654. Ratio **1827 wpv** (better than spoiler peers because of the embedded table).

**Viz proposals**: P-kr-1 (5-level spoiler tech-stack as 5-card grid — replaces lines 250–292), P-kr-2 (fill the 7-row именные двойники table), P-kr-3 (registration-speed bar КПКР vs ПАРНАС vs Партия Прогресса), P-kr-4 (left-flank fragmentation stacked bar — shared component, see U10), P-kr-5 (Сурайкин removal flow 2018→2022).

---

### 2.12 `partii/pensionery.html` (Phase 3 — самый успешный спойлер 2,45%)

**Bugs (CRITICAL)**
- **`partii/pensionery.html:156`** — backtick-formatted internal research path leaked: `99-open-questions/verification-checklist.md`.
- **`partii/pensionery.html:236`** — two more backtick refs: `independed_research_result_1.md стр. 308`, `independed_research_result_2.md стр. 60`. Note: original «independed» typo preserved.

**Content / tone**
- Hero stat 1 «2,45% — близко к 3%-ному порогу бюджета» ✓.
- §A line 102 — «Систематической хронологии расколов в пенсионной нише с источниками в исходных материалах исследования не сведено — это **открытая точка верификации**». Excellent intellectual-honesty disclosure of research gaps.
- §C is the SHORT section (only 2 paragraphs, due to «слабо персонифицированное лидерство»). Acknowledged.
- §F line 243-258 comparison table «КПКР vs Пенсионеры» — cleanest table in the batch.

**A11y / code**
- TOC entries 6 (A-F, no H) — matches plan.
- No timeline; static comparison table replaces it. No-JS-friendly.

**Density** — 18 paragraphs · 0 timelines · 1 table · words ≈ 3101. Ratio **3101 wpv**.

**Viz proposals**: P-pn-1 (brand-fragmentation diagram — РПП ↔ РППСС splits — depends on data), P-pn-2 (expand comparison table to 5 columns including РПСС, Зеленые, Гр.платформа — shared component, see U11), P-pn-3 (small-party 2025 revenue bar — Пенсионеры 16,7 / Родина 9 / КПКР 5,6), P-pn-4 (3% threshold marker on annual income chart), P-pn-5 (Venn — спойлерская vs возрастная функция).

---

### 2.13 `partii/zelenye.html` (Phase 3 — «Not Mitvol» disambiguation)

**Bugs (CRITICAL)**
- **`partii/zelenye.html:163`** — backtick-leaked internal path `99-open-questions/verification-checklist.md`.
- **`partii/zelenye.html:253`** — backtick-leaked `independed_research_result_1.md стр. 308`.
- **`partii/zelenye.html:253`** — ASCII double-quotes inside Russian quotation: `«Зелёная альтернатива для "Яблока"/экологов»`. Russian-typography style would use `„…"` German-style inner quotes, OR refactor to flat phrase.
- **`partii/zelenye.html:255`** — same ASCII glyph slip: `Объединение с РЭП "Зелёные" 26 апреля 2026 г.`.

**Content / tone**
- §C blockquote (lines 165-172) carries the «3 entities» disambiguation cleanly with `<ol>`.
- §C line 174 — Krasnoyarsk metro fraud case against Митволь — specific date 14.09.2023, 4½ года, ст. 159 ч. 4, ≈954 млн ₽ — primary-source detail. Good.
- §F-bottom cross-link to `partiya-rosta.html` as «аналогичный кейс поглощения» reinforces the cross-thread.

**A11y / code**
- TOC entries 7 (A-F + H, no G) ✓.
- 7-entry timeline ✓.

**Density** — 22 paragraphs · 1 timeline · 0 tables · 1 UL + 1 OL · words ≈ 3504. Ratio **3504 wpv**.

**Viz proposals**: P-zl-1 (3-month registration-window timeline — НЛ/ЗП/ЗА all spring 2020), P-zl-2 (3-row entities timeline replacing the §C blockquote — ZA party vs ZA movement vs РЭП Зелёные), P-zl-3 (Митволь criminal-case mini-timeline 2018→2023), P-zl-4 (niche-absorption 2-step flow → 26.04.2026), P-zl-5 (active vs passive spoiler 2-card comparison KPKR vs ZA).

---

### 2.14 `partii/rpss.html` (Phase 3 — «лаборатория Богданова»)

**Bugs (CRITICAL)**
- **`partii/rpss.html:244`** — backtick-leaked `independed_research_result_1.md стр. 294`.

**Content / tone**
- Hero quotes Богданов «×N» — fine; uses Unicode `×` (U+00D7).
- §C lists 4 «богдановские» partii in a clean bullet list.
- §F lines 256-272 — 5-row table «multi-layer left-flank fragmentation» (КПРФ 18,93 / СРЗП 7,46 / КПКР 1,27 / Пенсионеры 2,45 / РПСС 0,77). **Identical core data** to a hypothetical pensionery table — strong consolidation candidate (universal U11).
- §H line 308 — «Великий мастер Великой ложи России» — handled neutrally with proper hedge «Эти международные связи — не финансирование политической партии».
- Cross-links to all 8 sibling partii pages — most navigation-rich page in batch.

**A11y / code**
- TOC entries 7 (A-F + H, no G) ✓.
- No timeline (`renderPartyContent` empty stub).
- Static table semantically clean.

**Density** — 22 paragraphs · 0 timelines · 1 table · 1 UL + 1 OL · words ≈ 3549. Ratio **3549 wpv**.

**Viz proposals**: P-rp-1 (multi-layer fragmentation horizontal stacked bar — universal U11), P-rp-2 (Богдановские partii rename chain ДПР→ПМЕ→КПСС→РПСС flow), P-rp-3 («лаборатория Богданова» 4-row table partii × годы × ниша × результат), P-rp-4 (3-layer stratification diagram — parliamentary / active spoilers / third layer), P-rp-5 (presidential-2024 candidates Sankey — 4 принят vs 4 отказ/снялся, links to gr-init / yabloko).

---

### 2.15 `partii/grazhdanskaya-platforma.html` (Phase 3 — спящая партия)

**Bugs (CRITICAL — most affected page for backtick leaks)**
- **`partii/grazhdanskaya-platforma.html:132`** — `independed_research_result_2.md стр. 50–63`.
- **`partii/grazhdanskaya-platforma.html:190`** — `independed_research_result_2.md стр. 382`.
- **`partii/grazhdanskaya-platforma.html:247`** — `independed_research_result_1.md стр. 297` AND `independed_research_result_2.md стр. 425–440`.
- **`partii/grazhdanskaya-platforma.html:247`** — ASCII quotes inside Russian: `«фактически "спящая"»`.

**Content / tone**
- Hero summary covers «спящий» режим / 0,15% / 1 одномандатник / Шайхутдинов consistently with README.
- §D line 190 — 18-округов hypothesis (Коммерсантъ 2016) properly marked 🟡 in fold; intext «журналистская гипотеза… не доказательство сговора» is the right modal hedge.
- §F line 256 — «активность опасна для малой партии, спящий режим — безопасен» is the **single most quotable analytical line** in the batch. Currently buried in prose; deserves a `<blockquote class="key-finding">` callout.

**A11y / code**
- TOC entries 7 ✓.
- 7-entry timeline ✓.

**Density** — 25 paragraphs · 1 timeline · 0 tables · words ≈ 4139. Ratio **4139 wpv** — second-highest in the batch after yabloko.

**Viz proposals**: P-gp-1 (activity-Gantt 2012-2026 — high in 2013, drop 2015, flat-low after), P-gp-2 (3-card comparison «активность → ликвидация» Гр. Инициатива vs Гр. Платформа), P-gp-3 (4-axis radar — спойлер / инкубатор / лобби / лидер-чиновник), P-gp-4 (18-округов hypothesis stat-card with 🟡 disclaimer), P-gp-5 (pull-quote callout for «активность опасна» line 256).

---

### 2.16 `sujety/mobilizatsiya.html` (Phase 4 — 20.09.2022, 389/0/0)

**Bugs**
- **`sujety/mobilizatsiya.html:136`** — «Через **15 месяцев** он же шёл на президентских выборах 2024 г.». 21.09.2022 → 17.03.2024 ≈ **18 месяцев**, not 15. Numerical-temporal slip.
- All 5 fraction tallies (КПРФ 51/0, ЛДПР 18/0, СРЗП 21/0, НЛ 13/0, ЕР 286/0) — verified against `research/compromat/05-evidence/duma-api/votes/mobilization-uk.xml` and `02-cross-cutting/09-betrayal-cases.md` Case №1. ✓
- 389/0/0 grand total ✓.

**Content / tone**
- Spокойный, аналитический throughout.
- 4 `renderVoteBar` calls (one chart-card with 5 fractions); 2 timelines.

**A11y / code**
- All `target="_blank"` external have `rel="noopener"`. Internal markdown links lack it (consistent across all sujety).

**Density** — `<p>` 17 · vote-bars 4 (one chart-card) · timelines 2 · tables 0 · words ≈ 2209. Best ratio of the «portyanka» sujety after tsifrovoy-kontrol.

**Viz proposals**: P-mb-1 (single-row 450-cell hall-of-Duma stacked bar 389/0/0 — universal U12 fraction-split-bar), P-mb-2 (waffle 300 000 призваны in 36 hours), P-mb-3 (parallel 5-faction tracks on one timeline 21.09→24.09 — universal U13), P-mb-4 (Аксаков+Слуцкий+Нилов+Даванков author-flow — universal U14).

---

### 2.17 `sujety/voennyy-byudzhet.html` (Phase 4 — 32,5% казны на оборону)

**Bugs**
- `sujety/voennyy-byudzhet.html:7,9` — `<meta name="description">` and `<meta property="og:description">` use ASCII hyphen in `2025-2027`; should be en-dash `2025–2027`.
- `sujety/voennyy-byudzhet.html:165` — «ЕР — 325 мандатов (324 формально + двое примкнувших самовыдвиженцев)» — 324 + 2 = 326, not 325. Page hero uses 325. The «325» is the «standard rounding»; document the discrepancy or use 326 throughout.
- Two ratios cited for defence-vs-social spending: «3,3—3,4 раза» and «7,3—8,5 раза». Page acknowledges both; reader confusion possible. Add «по бюджетной классификации X — 3,3×; по консолидированной классификации Y — 7,3×» or pick one.

**Content / tone**
- Single-vote drill-down on ФЗ-419 of 21.11.2024 — appropriate for the sujet.

**A11y / code**
- All external `target="_blank"` have `rel="noopener"`.

**Density** — `<p>` 16 · vote-bars 4 (one chart-card) · timelines 0 · tables 0 · words ≈ 2433. **One single visual cluster — heavy portyanka risk.**

**Viz proposals**: P-vb-1 (annual defence-share line chart 2013–2027 with «★ ФЗ-419» annotation), P-vb-2 (treemap of 2025 budget categories — 32,5% оборона blocked out), P-vb-3 (ladder diagram «226 — простое большинство · 300 — конституционное · 325 — фактически у ЕР» — reuse `assets/js/charts/ladder.js`), P-vb-4 (split-bar 5-fraction 21.11.2024 vote — universal U12).

---

### 2.18 `sujety/spoylery.html` (Phase 4 — индустрия двойников)

**Bugs**
- `sujety/spoylery.html` §A table has «+ ещё 6 округов» placeholder; underlying source («Ведомости» 08.07.2021 + Коммерсантъ 4975445) lists the full set. Either complete the table or rephrase to «3 публично-задокументированных кейса из 7+».

**Content / tone**
- 0 vote-bars, 0 timelines — all narrative is prose + 1 table. This page is the third worst on text/visual ratio across all sujety.

**A11y / code**
- Inline `<table style="…">` instead of CSS class — minor.

**Density** — `<p>` 19 · vote-bars 0 · timelines 0 · tables 1 · words ≈ 2465. Ratio **2465 wpv** — high.

**Viz proposals**: P-sp-1 («Three Vishnevskys» SVG illustration — 3 silhouettes with «Б. Вишневский» labels, factually anchored to ZS SPb 2021), P-sp-2 (network graph — spoiler ↔ victim party + district overlay), P-sp-3 (fill the «именные двойники» table to 7 rows), P-sp-4 (4-party spoiler comparison 4-card row КПКР / Пенсионеры / РПСС / Зеленые — universal U11), P-sp-5 (left-flank fragmentation stacked bar — universal U11).

---

### 2.19 `sujety/munitsipalnyy-filtr.html` (Phase 4 — Левченко, Ройзман, Бондаренко)

**Bugs**
- **`sujety/munitsipalnyy-filtr.html:191`** — «до его **убийства** в феврале 2024 г.» (about Navalny). Спокойный аналитический тон требует «**гибели в учреждении**» — нет приговора, утверждение убийства с конкретной атрибуцией будет интерпретацией, не фактом.

**Content / tone**
- Cases cited: Левченко 2018 Иркутск, Ройзман 2017 Свердловск, Бондаренко 2022 Саратов. All match `02-cross-cutting/07-municipal-filter.md` per agent's spot-check.
- 6% threshold + 110 signatures Moscow figures match.

**A11y / code**
- 1 inline static `<table>` — properly structured.
- No vote-bar, no timeline.

**Density** — `<p>` 19 · vote-bars 0 · timelines 0 · tables 1 · words ≈ 2699. Ratio **2699 wpv** — second-worst sujet (after vneparlamentskie).

**Viz proposals**: P-mf-1 (regional grid/matrix — which oppositional candidate was filtered where, by region), P-mf-2 (region × ЕР-coverage scatter — replicates Коммерсантъ 18-округов hypothesis from gr-platforma), P-mf-3 (3 case-cards Левченко / Ройзман / Бондаренко — universal U3), P-mf-4 (single timeline parallel-tracks: candidate vs municipal-filter requirement vs выборы date), P-mf-5 (waffle of 218 000 муниц-депутатов showing how many «свободны»).

---

### 2.20 `sujety/tsifrovoy-kontrol.html` (Phase 4 — Аксаков + Луговой)

**Bugs**
- Page references ФЗ-99 / ФЗ-414 — agent flagged for verification; spot-check against `05-evidence/duma-api/votes/*.xml` recommended (text was not opportunity-checked in this audit because tsifrovoy-kontrol is the most-visualised sujet).

**Content / tone**
- 8 `renderVoteBar` calls + 2 timelines = best-visualised sujet by absolute count.
- Single page tying Аксаков (СРЗП — цифровой рубль ФЗ-340) + Луговой (ЛДПР — иноагенты ФЗ-255). Two leader-narrative threads converge on the structural-control sujet.

**A11y / code**
- Inline JS data-blocks for all 8 vote-bars + 2 timelines.

**Density** — `<p>` 19 · vote-bars 8 · timelines 2 · tables 0 · words ≈ 2930. Ratio **293 wpv** — by far the best in the batch (because of vote-bar density).

**Viz proposals**: P-tk-1 (actor-bill matrix — Аксаков × FZ-340; Луговой × FZ-255; cross-fraction co-author dots — universal U14), P-tk-2 (parallel-timeline biography Луговой ↔ FZ-255 evolution 2012-2025 — same as P-ldpr-4, shared via U13), P-tk-3 (digital-control law-cluster timeline 2014-2025 with vertical lanes per surveillance type), P-tk-4 (network graph: 3-degree Аксаков → ЦБ → Минфин → Минцифры).

---

### 2.21 `sujety/vneparlamentskie.html` (Phase 4 — три ВС-РФ ликвидации)

**Bugs**
- Указ Президента № 879 от 22.06.2012 (Титов — бизнес-омбудсмен) — verified against `research/compromat/05-evidence/kremlin-decrees/decree-879-2012-06-22-titov-business-ombudsman.html` (file exists). The «№ 691» discrepancy raised by review agent was a false alarm — page never references № 691.
- Указ № 299/2024 (Титов — спецпредставитель) — local cache filename includes web.archive of `kremlin.ru/acts/bank/50524`. Cached file exists; the precise указ-number requires manual verify on kremlin.ru. Flag as 🟡 attribution-precision check.
- 8 internal `target="_blank"` without `rel="noopener"` (lines 102, 118, 152, 187, 221, 234, 256, 298).

**Content / tone**
- Linear narrative on 3 ликвидации (Партия Роста 20.11.2025, Гр. Инициатива 06.2025, Партия Дела 27.11.2024) with cross-links to all three sister pages.
- 6 sections (A–F including Источники) — TOC labels match.

**A11y / code**
- All TOC anchors resolve. `<main data-page="sujet">` ✓.
- 0 vote-bars, 2 timelines, 0 tables — this is the most narrative-heavy sujet.

**Density** — `<p>` 20 · vote-bars 0 · timelines 2 (per `grep -c renderTimelineVert`) · tables 0 · words ≈ 2932. Ratio **2932 wpv** — agent counted 1 timeline (single chart-card); either way, the page is the highest-density sujet by word-count.

**Viz proposals**: P-vp-1 (4-quadrant chart of «4 траектории внепарламентских» — слияние / поддержка-несистемного / маргинализация / сохранение-статуса), P-vp-2 (3 case-cards Партия Дела / Гр.Инициатива / Партия Роста — universal U3), P-vp-3 (3-liquidations coincidence strip — universal U8), P-vp-4 (Bar-chart electoral-trajectories of these partii 2016/2018/2021/2024), P-vp-5 (Bus-омбудсмен ↔ Бабкин ↔ Партия Дела triangle — institutional-conflict diagram), P-vp-6 (extended timeline 2018–2026 with 3 liquidation events + Дунцовой/Надеждинский context).

---

### 2.22 `dokumenty.html` (Phase 5.1 explorer)

**Bugs**
- **`dokumenty.html:57`** — header meta says «N **файлов**»; for N=233 (ends in 3) the correct plural is «файла». Use the existing `pluralRu()` helper.
- **`dokumenty.html`** has no `<noscript>` notice. Without JS, user sees only search bar + empty filter dropdown + «Загружаю дерево…» that never resolves + empty-state. Page becomes unusable.
- **`dokumenty.html:35-48`** topnav (`<nav class="page-toggle">`) does **not** contain a link back to `dokumenty.html` itself; reader has no `aria-current="page"` and no in-nav way to know «I am here». Furthermore, ALL 21 site pages have a 3-button page-toggle (Дума / Выборы / Рунет), and dokumenty is missing entirely from nav site-wide. Reader can reach explorer only via the index CTA card.
- **CSV renderer is broken on quoted commas.** `assets/js/lib/dokumenty-renderers.js:191` `function splitRow(row) { return row.split(','); }` does naïve comma splits. The OFAC SDN CSV (`research/compromat/05-evidence/ofac-sanctions/sdn.csv`) is virtually guaranteed to contain quoted commas. Use SheetJS for CSV (already lazy-loaded) or a tiny RFC-4180 parser.
- Filter dropdown lists `docx` (line 70) but tree contains zero `.docx` files. Dead option. Filter is missing `.ods` (1 file: `gov-uk/UK-Sanctions-List.ods`) and `.py` (2 files: `parse_bills.py`, `parse_votes.py` — should also probably be excluded from tree generation rather than filtered).
- **`assets/js/data/dokumenty-aliases.json`** has multiple `_files` entries pointing to different files but with the same human-readable label (e.g., «Указ № 544 от 26.06.2024» appears 3 times in different paths). Tree shows 3 indistinguishable rows. Disambiguate by source: «Указ № 544 / kremlin.ru PDF», «Указ № 544 / kremlin.ru HTML», «Указ № 544 / web archive».
- **`pages/dokumenty.js:225`** — `var safe = path.replace(/"/g, '\\"')` then `querySelector('.dok-item[data-path="' + safe + '"]')`. CSS-attr selectors require CSS-escaping, not JS-escaping. Use `CSS.escape(path)`.
- **`pages/dokumenty.js:412-417`** — `Ctrl+B` shortcut calls `preventDefault()` even on Mac (where Cmd+B is browser-bookmark). Verified preventDefault suppresses, but worth a code-comment.

**Content / tone**
- Header H1 «Документы — первоисточники» / meta line tone ok.
- Empty-state copy «Откройте файл в дереве слева» (`pages/dokumenty.js:178`) and dokumenty.html:89 «Выберите файл в дереве слева — содержимое отобразится здесь» — same intent, slightly different wording. Pick one canonical.
- `pages/dokumenty.js:392` error fallback shows raw `err.message`; for network errors this yields opaque `Failed to fetch`. Wrap in Russian friendly text.

**A11y / code**
- `dokumenty.html:73` `<button id="dokTreeToggle"` uses `aria-pressed="false"` — `aria-expanded` would be more semantically appropriate.
- Tree items: `dokumenty-tree.js:29-30` sets `tabindex="0"` and `role="treeitem"`. Top-level `<ul>` has `role="tree"` but **nested `<ul>`s do not have `role="group"`** — SR tree-walking suboptimal.
- Tabs strip is marked `role="tablist"` but tab buttons are missing `role="tab"`, `aria-selected`, `aria-controls`. ARIA-tabs pattern incomplete; either drop tablist role or finish it.
- `<span class="close-x" role="button" tabindex="0">` (line 103) — span-as-button works with ARIA + tabindex but lacks `:focus-visible` for `.close-x` specifically (only `.dok-tab` has it).
- `.dok-item` mobile padding 3px vertical — touch-target < 44 px; AAA fail.
- No `aria-live` region announcing «вкладка открыта», «файл загружен», errors.

**Visual / UX**
- Neutral grey `#f3f3f3` vs cream `#F0EAD6` site-wide — deliberate departure flagging «I'm in a tool». Spec endorses; visually clean.
- Tree-toggle button at right of search bar non-obvious until user discovers Ctrl+B; consider state-indicating icon (chevron-left/right).
- Mobile <900px stacks tree above preview — tree at 35vh + preview at 50vh + search bar = full viewport. Search bar wraps to 2 lines on 320px.

**Encoding / external-resource handling**
- `decodeHtml` (`dokumenty-renderers.js:27-46`) reads first 2 KB as latin1, regex-extracts charset, `TextDecoder` with non-fatal flag. Solid. Empirically all 110 HTMLs in tree are UTF-8 (verified `file -b`); cp1251 detection is preventative. Consider expanding scan window from 2 KB to 4 KB if any file with long preamble is added.
- `renderHtml` external-resource stripping (lines 70-89) removes external CSS/JS, non-data `<img>`, all `<iframe>`. Robust. Doesn't strip `<style>` blocks (intentional — preserve page styles). Doesn't strip `<form action>` — minor, not exploitable inside `sandbox="allow-same-origin"` without scripts.
- `marked.js` parses without sanitizing — fine because committed evidence markdown is the trust boundary, but document this contract.
- `wrapPathLinks` in `dokumenty-renderers.js:248` trims content but doesn't handle trailing `[.,;]` punctuation inside backticks; rare-but-possible edge.

**Lazy-load / CDN**
- mammoth/SheetJS/marked lazy-loaded from cdnjs. Failure rejects promise; `dokumenty-preview.js:48-51` catches and shows error. Graceful. RU users behind RKN block of cdnjs see «Не удалось загрузить https://cdnjs.cloudflare.com/...». Consider self-hosting in `assets/js/vendor/` (~3 MB total) or fallback CDN (unpkg.com).

**Tree perf with 233 files**
- `renderNode` recursion creates ≈257 LIs in one DOM write; CSS `display: none` on collapsed ULs keeps initial paint <50ms. ✓
- `filterDokumentyTree` iterates all nodes per keystroke; 30–50ms per stroke. Add 150ms debounce in `pages/dokumenty.js:397`.

**Density** — n/a (it's a tool, not an article). Suggested UX additions: P-dok-1 (per-directory summary stats panel), P-dok-2 (tag-chips for category quick-filter), P-dok-3 (header KPI banner «233 файла · 188 МБ · 24 категории» with file-type composition bar), P-dok-4 (source-tier badge `🟢🟡🟠🔴` next to each item using `_tier` extension to aliases).

---

## 3. Cross-cutting issues

### 3.1 Naming inconsistencies

Canonical forms are used almost without deviation — strongest editorial-discipline signal across 21 pages:

| Entity | Dominant form | Deviations | Recommendation |
|---|---|---|---|
| Партия Роста | `Партия Роста` (33×) | — | Canon already unified |
| Гражданская инициатива | `Гражданская инициатива` (34×) | — | Canon already unified |
| Гражданская платформа | `Гражданская платформа` (25×) | — | Canon already unified |
| **Партия дела** | `Партия дела` (29×) | **`Партия Дела`** (4× — 1 in `partii/partiya-rosta.html`, 3 in `partii/grazhdanskaya-initsiativa.html`) | Lowercase the 4 deviations |
| Единая Россия / ЕР | `Единая Россия` (24×) and `ЕР` (42×) | — | Acceptable: full first, abbrev. on repeat |
| СРЗП / Справедливая Россия | `СРЗП` (149×), `Справедливая Россия` (7×), `«Справедливая Россия — За правду»` (3×) | — | СРЗП is dominant — acceptable |
| КПРФ / ЛДПР / Новые люди / Яблоко / РПСС | uniform | — | OK |
| «Коммунисты России» | uniform across cases | — | OK |

**The single fix:** lowercase 4 instances of `Партия Дела` → `Партия дела`.

### 3.2 Decree / numeric / date / decimal style

- **`Указ Президента № NNN`** — house style is space after `№` (e.g., `Указ Президента № 879`). One deviation found: `partii/kprf.html` has `Указ Президента №647` (no space); fix to `№ 647`. Goal: insert space wherever `№\d+` appears in user-facing prose.
- **Year ranges** — site uses three different glyphs: en-dash `–` (162×, dominant), em-dash `—` (45×, alternative), ASCII hyphen `-` (4×, all in `<meta>`: `sujety/voennyy-byudzhet.html:7,9` `2025-2027`; `partii/partiya-dela.html:7,9` `2014-2018`). **Fix the 4 ASCII-hyphens to en-dash.** Optionally normalise the 45 em-dashes to en-dash for ranges (em-dash should remain for prose breaks).
- **Decimal style** — Russian comma decimal (`32,5%`, `0,15%`, `18,93%`) used uniformly. **Zero ASCII dot-decimals in user-facing prose** — perfect compliance.
- **Date style** — `DD.MM.YYYY` (event dates), `YYYY-MM-DD` only in `<time datetime>` attributes and URLs (technical, correct), «20 сентября 2022 г.» book-style in narrative. No deviations.

### 3.3 Cross-link integrity

**Internal cross-links**: All 88 `partii→partii` cross-links resolve. All 51 `sujety→partii` resolve. All `~100+ research/compromat/...` references on sampled pages return 200 from local Python server.

**Zero references** to `partii/rodina.html` confirmed (intentional out-of-scope honoured). The research source `research/compromat/01-parties/06-rodina/` exists with 5 dossier files (A–E) but is unwired from the production site — this is fine and documented.

**Asset-path break — `assets/og/home.png` 404.** Declared in `index.html:17` but the file does not exist; `assets/og/` contains only `tsenzura.{png,svg}`. Sharing the home page produces a broken social-card preview.

**OG-image absence on 20 pages.** `index.html` is the only page with `og:image` declared (and even that 404s). All 14 partii, 6 sujety, and dokumenty.html have **no `<meta property="og:image">`**. CLAUDE.md explicitly requires paired `.png` (1200×630) + `.svg` for *every* page. This is the largest single content gap on the site.

### 3.4 Mobile-breakage points

1. **Vote-bar broken at ≤320px.** `assets/css/partii.css:190-205` — `.vote-bar-row { grid-template-columns: 130px 1fr 80px; gap: 10px; }` reserves **230px chrome** before the bar. iPhone SE (320px viewport − 32×2 padding = 256px available) leaves only **26px** for the bar itself. No breakpoint override.
2. **5 tables without `overflow-x:auto` wrapper.**
   - `partii/kommunisty-rossii.html:240+`
   - `partii/pensionery.html:240+`
   - `partii/rpss.html:240+`
   - `sujety/munitsipalnyy-filtr.html:240+`
   - `sujety/spoylery.html:240+`
   At 320px these will overflow viewport or compress columns to unreadable widths.
3. **Long hero-stat labels (>90 chars) on 12 pages.** At 320px the 2-column hero grid gives ≈122px per cell. The 119-char `partii/partiya-dela.html` label «78% субсидий по программе 1432 (2014–2018, ≈34 млрд ₽)…» wraps to 8–10 lines.
4. **Sticky-TOC desktop-only** (≥1080px) — mobile readers have no in-page TOC at all. Spec §3.6 calls for collapsed «Содержание ↓» button on phone.
5. **Footer absent on 20 of 21 pages.** Only `index.html` has `<footer>` (`partii/*`, `sujety/*`, `dokumenty.html` have zero). Reader scrolling to end of a partii page hits raw `</main>` boundary.
6. **`dokumenty.html` not in topnav.** All 21 pages have a 3-button `<nav class="page-toggle">` (Дума/Выборы/Рунет); dokumenty is unreachable from in-nav.

### 3.5 Console errors / 404s

- **0** `console.log` in production (only legitimate `console.error('[feedback] turnstile render failed', …)` in `assets/js/lib/feedback.js:147`).
- **0** `debugger` statements.
- **0** TODO/FIXME/XXX (the appearance of "XXXIV" is the Roman numeral for «съезд», not a marker).
- **1 404**: `assets/og/home.png`.
- All asset URLs on sampled pages (`partii/kprf.html`, `sujety/mobilizatsiya.html`, `dokumenty.html`) return 200 from local server.

### 3.6 Plurality / numeric grammar

≈30 numeric agreements sampled — the site is unusually clean here:

| Pattern | Cases | Errors |
|---|---|---|
| мандат / мандата / мандатов | 33 | 0 |
| голос / голоса / голосов | 23 | 0 |
| партии / партий | 11 | 0 |
| депутат* | 11 | 0 |
| год* | hundreds | 0 |
| месяц* | 14 | 0 |

**Single confirmed error**: `dokumenty.html:57` — «N **файлов**» when N=233 (ends in 3). Should use `pluralRu(N, 'файл', 'файла', 'файлов')` to render «233 файла». The meta description on the same page (`dokumenty.html:7`) correctly uses «233 файла».

### 3.7 Code-quality patterns

| Metric | Result |
|---|---|
| HTML balance (`<section>`, `<div>`, `<main>`) | ✓ All 21 pages balanced |
| Real duplicate `id` attrs | ✓ Zero (early grep false positives were href anchors matching section ids) |
| `target="_blank"` to `https://` w/o `rel="noopener"` | **0** — external links are clean |
| `target="_blank"` to internal `../research/...` w/o `rel="noopener"` | **321** — site-wide pattern; same-origin so not a security issue, but Lighthouse flags |
| `console.log` in production | 0 |
| Inline `style="…"` heaviness | concentrated in tables (`pensionery`, `rpss`, `kommunisty-rossii`, `spoylery`, `munitsipalnyy-filtr`) — refactor to CSS classes |
| `aria-current="page"` mis-set on topnav «Голосования» across all 14 partii + 6 sujety pages | **20 page errors** |
| Section anchor naming | kebab-case consistently (semantic); JS-interaction containers camelCase (technical). Intentional split. ✓ |
| TOC letter-prefix consistency (A B C D E F G H) | ✓ except `partii/er.html` has gap `A B C E` |
| Hero-stat block structure | ✓ All 14 partii + 6 sujety have exactly 4 `<div class="stat">` |
| Source-attribution markers (🟢🟡🟠🔴) | 345 across 21 pages (139+103+33+70); 87% in sources-folds, 13% in inline prose. Consistent. |

---

## 4. Visualisation proposal catalogue

This is the **central deliverable of the review.** The user's verbatim feedback was:

> «Сейчас для обычного пользователя это выглядит как очередная статья, которую с „клиповым мышлением" тяжело читать — надо сделать как-то более подробно, но при этом при помощи визуализаций.»

The 14 partii + 6 sujety pages are 2200–4585-word longreads with **one terminal timeline** (most pages) or **one inline table** (some spoiler pages). Density inventory across 20 sub-pages is uniform: 1 rendered visualisation per page on average. The «клиповое восприятие» target requires roughly **1 visual per 300 words**, i.e. 7–15 visuals per page.

The proposals below are organised in three layers:
- **§4.1** — per-page proposals (catalogued from agent audits; 50+ specific replacements/augmentations).
- **§4.2** — universal components proposed for the codebase (8 named, with API + complexity).
- **§4.3** — full scrollytelling mockup for `partii/yabloko.html` as pilot.

### 4.1 Per-page proposals (consolidated)

> Each proposal P-{slug}-N below was scoped against a specific section/paragraph during the per-page audits in §2. Mockups, JSON data shapes, and implementation sketches for the most-load-bearing 8–10 are inlined; the remainder are summary-listed (full sketches preserved in agent outputs at `/tmp/agent2_parl.md` and `/tmp/agent3_extraparl.md`).

#### Index hub

**P-idx-1 — Seat-strip visualisation** *(replaces the abstract intro paragraph above the 14-card grid)*

Single horizontal stacked bar 100% wide showing the 450-seat Duma. ER 325 = 72% in `--party-er` blue; KPRF 57; LDPR 23; СРЗП 27; НЛ 15. Below the bar: a tiny strip showing «structurally dependent» (full-width grey: all 5) and «votes against restrictions» (8-px sliver in leftmost ~3% — the «2 of 18» moment). Caption: «72% мандатов · 0% независимости от государства · 11% «против» в среднем».

```
┌──────────────────────────────────────────────────────────┬─────┬───┬───┬─┐
│            ЕР · 325 мандатов · 72%                       │КПРФ│СР│ЛД│Н│
│                                                          │ 57 │27│23│15│
└──────────────────────────────────────────────────────────┴─────┴───┴───┴─┘
   мандаты · 450/450 · одна партия — конституционное большинство

Зависимость от государства (госфинансирование, включая ЕР):
██████████████████████████████████████████████████████████████ 100%

Голоса «против» по 18 ограничительным законам (среднее по 4 фракциям):
██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 11%
```

Implementation: ~50 LOC pure CSS-only flex layout, no Chart.js. New file `assets/js/components/seat-strip.js`. Mounts before the 14-card grid. Risk: mandate counts are state snapshot; update if a faction loses/gains a seat.

**P-idx-2 — Co-author flow** (sankey-lite; 5 fractions × 7 «hook» laws). Replaces the intro paragraph of the cross-cutting section. Data: subset of `dokumenty-aliases.json` enriched with a structured `authors` field per law. ~70 LOC SVG-only, no Chart.js.

**P-idx-3 — Paradox scatter** (Chart.js bubble: X = % «за» on digital/civil restrictions, Y = % «за» on social-economic; bubble size = mandates). Replaces the existing two side-by-side bar charts in `comparison-bars`. ~60 LOC.

**P-idx-4 — Law-density calendar** (84-month horizontal heatmap 2019–2025 showing legislative pace). ~40 LOC inline SVG, one `<g>` per year.

#### Parliamentary partii (5 pages × 4–5 proposals each ≈ 24)

| ID | Page | Section | Type | Reuse |
|---|---|---|---|---|
| P-er-1 | er | Hero | Mandate-bar 450 cells with 226/300 thresholds | new component, reused 5× |
| P-er-2 | er | B Финанс | Budget-share horizontal compare | universal U1 |
| P-er-3 | er | C Авторы | 4×2 author-card grid | universal U2 |
| P-er-4 | er | E Голос | 5×8 heatmap | reuse `vybory.html#heatmap` |
| P-kprf-1 | kprf | B Финанс | 2017–2024 line chart vs 5-faction median | universal U1 (extended) |
| P-kprf-2 | kprf | C Лидеры | 5-card leader-grid | universal U2 |
| P-kprf-3 | kprf | D Связи | Decree-strip — 6 awards 1999-2024 | universal U6 |
| P-kprf-4 | kprf | E Голос | Functional-split: social vs military axis | new |
| P-kprf-5 | kprf | F Управ. | 6-case nейтрализаций grid | universal U3 |
| P-ldpr-1 | ldpr | A/Hero | Electoral-trajectory 1993–2024 line | universal U5 |
| P-ldpr-2 | ldpr | C Лидеры | 6-card leader-grid with sanction-tags | universal U2 |
| P-ldpr-3 | ldpr | D Связи | 5×7 sanction-regime matrix | new |
| P-ldpr-4 | ldpr | E Голос | Parallel timeline Луговой ↔ FZ-255 | universal U13 |
| P-ldpr-5 | ldpr | F Управ. | Mergers — Родина 2021 + Партия дела 2024 | universal U7 |
| P-srzp-1 | srzp | A | 3-wave mergers timeline | universal U7 |
| P-srzp-2 | srzp | C Лидеры | 6-card leader-grid | universal U2 |
| P-srzp-3 | srzp | D Связи | 4×5 integration matrix | new |
| P-srzp-4 | srzp | E Голос | Authorship table (Аксаков/Миронов/Нилов × FZ) | new |
| P-srzp-5 | srzp | H Зарубеж | 5×7 sanction-heatmap | reuse |
| P-nl-1 | novye-lyudi | B Финанс | **Implement empty `#financingChart`** | uses Chart.js already present |
| P-nl-2 | novye-lyudi | A | Hero compare 3-mo vs 7-yr (НЛ vs Партия Прогресса) | new |
| P-nl-3 | novye-lyudi | C Лидеры | 6-card leader-grid | universal U2 |
| P-nl-4 | novye-lyudi | C | Income-comparison horizontal bar (Нечаев 4400 vs ≤14) | universal U1 |
| P-nl-5 | novye-lyudi | E Голос | Highlighted standalone vote-bar for VPN-2025 | extend `renderVoteBar` with `highlight` flag |

#### Extra-parliamentary partii (9 pages × 5–7 proposals ≈ 55)

Detailed in §2.7–2.15. Highlights:
- **Yabloko (7 proposals)**: electoral-trajectory dot+line, revenue bar 6 partii, persecution mini-timeline, institutional-integration table, 4 limitations as icon cards, foreign-funds checkpoint matrix (14 funds), parallel-column timeline.
- **Partiya Dela (5)**: Sankey 1432-budget→78% Ростсельмаш+ПТЗ (CORE), 5-instrument ecosystem pentagon, cross-cutting 3-малыс' table, Buhler 4-step ownership flow, before/after bar.
- **Kommunisty Rossii (5)**: 5-level spoiler tech-stack as 5 cards, complete the 7-row двойники table, registration-speed bar, left-flank fragmentation bar (universal U11), Сурайкин removal flow.
- **Pensionery (5)**: brand-fragmentation diagram, expand comparison table to 5-column (universal U11), small-party 2025 revenue bar, 3% threshold marker, Venn спойлер vs возрастная функция.
- **Zelenye (5)**: 3-month registration-window timeline (НЛ/ЗП/ЗА spring 2020), 3-row entities timeline, Митволь criminal-case mini-timeline, 2-step niche-absorption flow, active vs passive spoiler 2-card.
- **RPSS (5)**: multi-layer fragmentation bar (universal U11), Богдановские partii rename chain flow, 4-row partii × годы × ниша × результат table, 3-layer stratification, presidential-2024 candidates Sankey.
- **Gr. Platforma (5)**: activity-Gantt 2012-2026, 3-card «активность → ликвидация» comparison, 4-axis radar, 18-округов hypothesis stat-card, pull-quote callout for line 256 «активность опасна».
- **Partiya Rosta (5)**: Titov state-position cumulative timeline (highest narrative value), lobbying-comparison cards, family-business handover diagram, party-trajectory flow, 3-liquidations coincidence strip (universal U8).
- **Gr. Initsiativa (5)**: Two-Nechaevs 2-column cards (universal U9), Надеждин-2024 chronology timeline, 3-liquidations coincidence strip (U8), signatures geo-bubble (risky), party-incubator Собчак vs Надеждин comparison.

#### Sujety (6 pages × 4–6 proposals ≈ 30)

| ID | Page | Type | Reuse |
|---|---|---|---|
| P-mb-1 | mobilizatsiya | 450-cell single-row stacked bar 389/0/0 | universal U12 |
| P-mb-2 | mobilizatsiya | Waffle 300 000 призваны in 36 hours | reuse `assets/js/charts/waffle.js` |
| P-mb-3 | mobilizatsiya | Parallel 5-faction tracks 21-24.09.2022 | universal U13 |
| P-mb-4 | mobilizatsiya | Author-flow Аксаков+Слуцкий+Нилов+Даванков | universal U14 |
| P-vb-1 | voennyy-byudzhet | Annual defence-share line 2013-2027 | universal U5 |
| P-vb-2 | voennyy-byudzhet | Treemap of 2025 budget categories | new (~50 LOC) |
| P-vb-3 | voennyy-byudzhet | Ladder 226/300/325 thresholds | reuse `assets/js/charts/ladder.js` |
| P-vb-4 | voennyy-byudzhet | Split-bar 5-fraction 21.11.2024 | universal U12 |
| P-sp-1 | spoylery | 3 Vishnevsky silhouettes SVG | new (~40 LOC) |
| P-sp-2 | spoylery | Network graph spoiler ↔ victim ↔ district | new (~80 LOC) |
| P-sp-3 | spoylery | Fill двойники table to 7 rows | data only |
| P-sp-4 | spoylery | 4-party spoiler comparison cards | universal U11 |
| P-mf-1 | munitsipalnyy-filtr | Regional matrix candidate × region | new (~70 LOC) |
| P-mf-2 | munitsipalnyy-filtr | 18-округов scatter (Коммерсантъ 2016 hypothesis) | new |
| P-mf-3 | munitsipalnyy-filtr | 3 case-cards Левченко/Ройзман/Бондаренко | universal U3 |
| P-mf-4 | munitsipalnyy-filtr | Parallel-track timeline | universal U13 |
| P-mf-5 | munitsipalnyy-filtr | Waffle 218 000 муниц-депутатов | reuse `waffle.js` |
| P-tk-1 | tsifrovoy-kontrol | Actor-bill matrix (CORE) | universal U14 |
| P-tk-2 | tsifrovoy-kontrol | Parallel-timeline Луговой ↔ FZ-255 (shared with P-ldpr-4) | universal U13 |
| P-tk-3 | tsifrovoy-kontrol | Cluster timeline of digital-control laws 2014-2025 | new |
| P-tk-4 | tsifrovoy-kontrol | 3-degree network Аксаков → ЦБ → Минфин → Минцифры | new (~80 LOC) |
| P-vp-1 | vneparlamentskie | 4-quadrant chart of trajectories | new (~50 LOC) |
| P-vp-2 | vneparlamentskie | 3 case-cards | universal U3 |
| P-vp-3 | vneparlamentskie | 3-liquidations coincidence strip | universal U8 |
| P-vp-4 | vneparlamentskie | Bar of electoral trajectories | universal U5 |
| P-vp-5 | vneparlamentskie | Triangle Bus-омбудсмен ↔ Бабкин ↔ Партия Дела | new |
| P-vp-6 | vneparlamentskie | Extended 2018-2026 timeline | reuse `timeline-vert.js` |

### 4.2 Universal components catalogue

These 8 components consolidate ~40 of the per-page proposals into reusable infrastructure. All vanilla JS, no new dependencies, all follow the existing `window.renderXxx(rootEl, data)` convention.

#### U1 — `renderBudgetShare(rootEl, data)`
**Purpose:** horizontal compare-bar of «доля бюджета 0–100%» across 5–6 partii.
**Pages:** B-section of all 14 partii pages (with appropriate per-party data); index `#parties-extended` for aggregate.
**API:** `renderBudgetShare(rootEl, [{party, share, year}])`
**Complexity:** S (~30 LOC, Chart.js horizontalBar OR pure CSS Grid).
**Risk:** Yabloko at 0% — visualise as sentinel (strong contrast underscores main thesis), not as «missing data».

#### U2 — `renderLeaderGrid(rootEl, leaders)`
**Purpose:** card grid for 4–8 partii leaders with photo/initials + ФИО + role + tag-pills.
**Pages:** C-section of all 14 partii (currently 4–8-paragraph stride-of-text); 6 instances in parliamentary batch alone.
**API:** `renderLeaderGrid(rootEl, [{name, role, born, tags: [], duma_url, photo?}])`
**Complexity:** S (~50 LOC CSS Grid + static markup).
**Risk:** photo availability — fallback to colour-tinted initials.

#### U3 — `renderCaseGrid(rootEl, cases)`
**Purpose:** 3–6 case-cards for «нейтрализации лидеров», «ликвидации партий», «фильтр-кейсы».
**Pages:** KPRF F-section, LDPR F, SRZP F, partiya-rosta F, partiya-dela F, gr-init F, partiya-rosta D, vneparlamentskie A/B/C/D, munitsipalnyy-filtr C.
**API:** `renderCaseGrid(rootEl, [{name, year, method, outcome, cross_link?}])`
**Complexity:** S (~50 LOC).
**Risk:** card text ≤ 30 words; complex cases need expandable `<details>`.

#### U5 — `renderElectoralTrajectory(rootEl, points, options)`
**Purpose:** line chart of % vote across multiple elections, with threshold lines (3% бюджет, 5% фракция) and event annotations.
**Pages:** yabloko A, ldpr A/Hero, vneparlamentskie E, gr-platforma A, voennyy-byudzhet defence-share over time, also `vybory.html`.
**API:** `renderElectoralTrajectory(rootEl, [{year, type, percent, candidate?}], { thresholds: [3, 5], annotations: [{year, label, color}] })`
**Complexity:** M (~60 LOC, Chart.js line + custom plugin for thresholds).
**Risk:** annotation plugin not on CDN; substitute with custom dotted-line series.

#### U6 — `renderDecreeStrip(rootEl, decrees)`
**Purpose:** chronological strip of presidential decrees affecting one party (Указ № X — date — кому — суть).
**Pages:** KPRF D (Зюганов 6 awards 1999–2024), LDPR D, SRZP D, partiya-rosta D (Титов № 879/№ 299/2024), mobilizatsiya (Указ № 647 о мобилизации).
**API:** `renderDecreeStrip(rootEl, [{number, date, recipient, summary, source_url}])`
**Complexity:** S (~30 LOC styled `<dl>` or table).

#### U7 — `renderMergersTimeline(rootEl, waves)`
**Purpose:** multi-input merger diagram showing N partii flowing into one resulting partii, with curator annotation.
**Pages:** SRZP A (3 waves 2006/2021/2025), LDPR F (Родина 2021, Партия дела 2024), novye-lyudi F (Партия Роста 2024).
**API:** `renderMergersTimeline(rootEl, [{wave, year, curator, inputs: [{name, color}], output: {name, color}}])`
**Complexity:** L (~120 LOC SVG with arrows).
**Risk:** new component; start with a simplified text-flow version (3 lines per wave) to validate before SVG investment.

#### U8 — `renderLiquidationStrip(rootEl, events, activeId)`
**Purpose:** horizontal time-strip showing 3 ВС-РФ ликвидации + Надеждин refusal in window 2024-2025, with `active` parameter highlighting the current page.
**Pages:** vneparlamentskie (all 4 markers prominent), partiya-rosta (highlight ПР), partiya-dela (highlight ПД), gr-initsiativa (highlight ГИ).
**API:** `renderLiquidationStrip(rootEl, [{date, party_id, label}], activeId)`
**Complexity:** S (~40 LOC).

#### U9 — `renderDisambiguationCards(rootEl, entities)`
**Purpose:** side-by-side «is not the same person/entity» comparison block.
**Pages:** gr-init C (Two Nechaevs), zelenye C (Not Mitvol — currently a `<blockquote><ol>`), potential other disambiguations as new pages emerge.
**API:** `renderDisambiguationCards(rootEl, [{label, born, profession, partii, photo?}])`
**Complexity:** S (~30 LOC).

#### U11 — `renderLeftFlankFragmentation(rootEl, parties)`
**Purpose:** horizontal stacked bar showing left-flank vote fragmentation across КПРФ + СРЗП + 3 spoilers (КПКР, Пенсионеры, РПСС). Highlights spoiler share vs main parties.
**Pages:** RPSS F (currently a 5-row table — replace), pensionery F, kommunisty-rossii F, spoylery (cross-cutting), index aggregate.
**API:** `renderLeftFlankFragmentation(rootEl, [{party, percent, color, role}])`
**Complexity:** S (~40 LOC). **Highest cross-page leverage** — replaces 3 different static tables with one component.

(Universal proposals for U4, U10, U12–U14 collected from agent outputs but de-prioritised; details preserved in `/tmp/agent2_parl.md` and `/tmp/agent3_extraparl.md` if needed.)

### 4.3 Scrollytelling mockup — `partii/yabloko.html`

Page choice rationale: `yabloko.html` ranks #1 on portyanka risk (4585 words / 1 visual), is the most narrative-heavy (8 sections vs 6–7 elsewhere), and contains the politically heaviest events (24.02.2022 заявление, СИЗО Шлосберга, встреча 25-26.10.2023) where anchor-stat staging pays off most. If the pattern works here, it lifts naturally to gr-platforma → partiya-dela → kommunisty-rossii.

**Premise:** redesign each section as a vertical column of full-bleed «steps». Each step = a single sentence/stat/quote. Steps reveal on scroll (40% in viewport via existing IntersectionObserver in `assets/js/lib/reveal.js`). User scrolls slowly through ~50 steps total and absorbs one fact at a time — instead of reading a 4585-word longread.

**No new dependencies.** Uses existing `scroll-spy.js`, `reveal.js`, `timeline-vert.js`, plus pure CSS Grid/Flex.

#### Mobile-first frame (360px width)

```
┌─────────────────────────────────┐
│ ← Назад        Яблоко           │  ← topnav, sticky
│ ─────────────────────────────── │
│   A · Происхождение  (1/8)      │  ← section badge with progress
│ ─────────────────────────────── │
│ ┌─────────────────────────────┐ │
│ │   STEP 1 — anchor stat      │ │
│ │                             │ │
│ │       16 октября            │ │  ← display number
│ │         1993                │ │
│ │                             │ │
│ │   Учредительный             │ │
│ │   «Блок Я-Б-Л»              │ │
│ │                             │ │
│ │   Янка-Болдырев-Лукин       │ │
│ │                             │ │
│ │           ↓                 │ │
│ └─────────────────────────────┘ │
│                                 │
│ scroll: 40% in view → reveal    │
└─────────────────────────────────┘
```

#### Section-by-section step plan (~50 steps total)

**Hero (replaces current hero — 4 steps)**

- Step H.1 — anchor «1»: «1 партия из 14 — антивоенное заявление 24.02.2022»
- Step H.2 — anchor «1,34%»: «На ГД-2021 — ниже 3%-ного порога»
- Step H.3 — anchor «11+»: «Членов партии в реестре иноагентов»
- Step H.4 — full lead paragraph (the only place full prose appears in hero)

**A · Происхождение (4 steps)**

- A.1 — anchor «1993»: «16 октября — Блок Явлинский–Болдырев–Лукин — Дума I созыва — 7,86%»
- A.2 — small viz: electoral trajectory dot-chart 1993-2021 (P-yab-1)
- A.3 — председатели (Рыбаков с 12.2019, Явлинский ФПК с 2015)
- A.4 — quote «Минюст рег. № 5018» + 1 link

**B · Финансирование (3 steps)**

- B.1 — anchor «0%» бюджетного финансирования с 2016 г.
- B.2 — comparison-bar 6 partii: ЕР 8800 / КПРФ 1800 / ЛДПР 767 / СРЗП 726 / НЛ 719 / Яблоко 189 (P-yab-2)
- B.3 — quote: «У действующих лидеров не зафиксировано контролируемых юрлиц с государственными подрядами»

**C · Лидеры (5 steps — one per leader)**

- C.1 — Рыбаков card (председатель с 12.2019, Беллона)
- C.2 — Явлинский card (программа 500 дней, 3 президентские кампании, ВШЭ не продлила контракт 2025)
- C.3 — Шлосберг card (the strongest narrative — иноагент 16.06.2023, 420 ч обяз. работ 2024, СИЗО 12.2025, ч. 2 ст. 207.3 УК до 10 лет)
- C.4 — Вишневский case (mini-illustration of 3 «Бориса Вишневских» — SVG with bearded silhouettes, factually anchored to ZS SPb 2021 / kommersant 4975445)
- C.5 — leaders persecution timeline (8 events 2021-2025 vertical mini)

**D · Связи с государством (3 steps)**

- D.1 — 2-column comparison «что есть у пятёрки vs что у Яблока» (P-yab-4)
- D.2 — встреча 25-26.10.2023 callout (anchor card, hedged)
- D.3 — interpretation: «Эпизод не доказывает координацию, но и ослабляет версию полной автономии»

**E · Голосование (3 steps)**

- E.1 — anchor «0 мандатов в Думе с 2007 г. — поведенческий тест в Думе неприменим»
- E.2 — региональные фракции map: ЗС СПб (Вишневский до 30.10.24), ЗС Карелия (Слабунова), Псков (Шлосберг до 2021), МГД VII (Митрохин, Круглов)
- E.3 — заявление 02.03.2022 ЗС СПб (full quote)

**F · Управляемая оппозиция (5 steps)**

- F.1 — «Не вписывается в модель» anchor card
- F.2 — Limitation 1: 1,34% (электоральная угроза = 0)
- F.3 — Limitation 2: 98 членов исключены 2021 (внутренний авторитаризм)
- F.4 — Limitation 3: УГ удалено из app-store 09.2021 (конфликт)
- F.5 — Limitation 4: Явлинский+Путин 25-26.10.2023 + отказ от 2024
- F.6 — final formula (anchor quote): «Терпимая, маргинализированная антивоенная партия в условиях регулируемого политического поля»

**G · Кризисы и война (4 steps)**

- G.1 — anchor 24.02.2022: full FPK declaration centred display
- G.2 — petition «НЕТ ВОЙНЕ!» 13.02.2022, 88+ тыс. подписей
- G.3 — full crisis timeline (existing `renderTimelineVert`, 11 entries, vertical mode)
- G.4 — Шлосберг СИЗО card reframed as «текущий статус — май 2026»

**H · Зарубежные связи (3 steps)**

- H.1 — «14 фондов проверено, 0 совпадений» pill grid (P-yab-6)
- H.2 — Liberal International 1998-2002 (member) / ALDE выход 03.2025
- H.3 — final: «Иноагентство ≠ задокументированное иностранное финансирование»

#### Step orchestration

Each step:

1. Single line of HTML: `<div class="story-step" data-step-idx="X">…</div>`
2. CSS: `min-height: 100vh; display: flex; align-items: center;`
3. JS: existing IntersectionObserver in `reveal.js` adds `class="is-visible"` when ≥40% of element is in viewport (already implemented; reuse).
4. CSS: `.story-step:not(.is-visible) { opacity: 0; transform: translateY(20px); transition: opacity 0.4s, transform 0.4s; }` — but **respect `prefers-reduced-motion: reduce`** (collapse animation).

#### Effort estimate

- CSS additions: ~120 LOC (story-step layouts, anchor-stat typography, mini-card components)
- JS additions: ~50 LOC (extend `reveal.js` to fire `data-step-idx` events for analytics, optional)
- HTML restructure: replace existing 8-section flat structure with 8 `<section class="story-section">` containing variable counts of `<div class="story-step">` (≈50 steps for yabloko)
- Component reuse: timeline-vert.js, sources-fold.js (1 fold per section, hidden by default at story end) — both already exist
- Total: ~4 dev-days.

#### Trade-offs

- **No-JS fallback:** without JS, `.story-step` simply renders one after another — same as a regular long-form article. Acceptable because each step contains the same prose as the original (just split). Source-folds remain functional.
- **Print:** `@media print { .story-step { opacity: 1 !important; transform: none !important; } }` resets animation.
- **Mobile dragging:** `touch-action: pan-y;` on body to ensure swipe gestures don't interfere.
- **Memory:** 50 IntersectionObserver entries on yabloko alone is fine (Chrome handles thousands; reuse one observer across page via `reveal.js`).
- **SEO:** search engines crawl all step content as plain HTML. Total prose remains 4585 words. No SEO loss.
- **Time-to-interactive:** ~5 KB CSS + 1 KB JS added — negligible vs current bundle.
- **Accessibility:** every step is a regular `<section>`-level element with `aria-label`. Keyboard nav: rely on H2 anchors (`#origins`, `#financing`, etc., still work). Focus-visible shows blue outline. Screen readers narrate in document order.

---

## 5. Quick-win punchlist

Items ranked by ROI (small file edit, big quality boost). All ≤ 30 min unless flagged.

| # | File | Line | Issue | Fix | Time |
|---|---|---|---|---|---|
| 1 | `partii/kommunisty-rossii.html` | 100 | Raw markdown `**откол от КПРФ**` + typo `Откололовшаяся` | `<strong>откол от КПРФ</strong>` + `Отколовшаяся` | 2 min |
| 2 | `partii/er.html` | 88 | TOC letter `E` — should be `D` (no D in sequence A B C E) | `<span class="num">D</span>` | 2 min |
| 3 | `dokumenty.html` | 57 | «233 файлов» (wrong plural for 233) | Use `pluralRu()` helper from `extended-parties.js:2` | 5 min |
| 4 | `sujety/mobilizatsiya.html` | 136 | «Через **15 месяцев**» — should be 18 (21.09.2022→17.03.2024) | Replace «15» → «18» | 2 min |
| 5 | `sujety/munitsipalnyy-filtr.html` | 191 | «убийства» (Navalny) — нейтральный тон требует «гибели в учреждении» | Replace word | 1 min |
| 6 | `partii/pensionery.html` | 156, 236 | Backtick-leak `independed_research_result_*.md` paths | Move to fold OR rephrase «во внутреннем исследовательском архиве» | 10 min |
| 7 | `partii/zelenye.html` | 163, 253 | Backtick-leak; ASCII quotes inside `«…»` (lines 253, 255) | Same fix; replace `"…"` with `«…»` or `„…"` German-style | 10 min |
| 8 | `partii/rpss.html` | 244 | Backtick-leak | Same fix | 5 min |
| 9 | `partii/grazhdanskaya-platforma.html` | 132, 190, 247 | 4 backtick-leaks + ASCII quotes inside `«…»` (line 247) | Same fix | 15 min |
| 10 | `partii/novye-lyudi.html` | 148-151 | Empty `<div id="financingChart">` under heading «Доходы партии 2021–2024» | Either implement Chart.js bar (P-nl-1, ≈30 LOC) or delete the chart-card | 30 min |
| 11 | `partii/novye-lyudi.html` | 67, 70 | «15 мандатов» vs «13 мандатов» inconsistency | Add footnote «13 списочных + 2 одномандатника» or unify | 5 min |
| 12 | `partii/kprf.html` | 71, 102, 137 | 3 different precise vote counts: 10 660 715 / 10 660 669 | Pick one + footnote | 5 min |
| 13 | `partii/ldpr.html` | 74 | «23 мандата» vs README's «21 мандат» | Add footnote explaining 21 списочных + Журавлёв = 22 + 1 ОМ = 23 | 5 min |
| 14 | `partii/ldpr.html` | 174 | Owen Inquiry English quote without `<span lang="en">` | Wrap quote in `<span lang="en">…</span>` | 2 min |
| 15 | `assets/og/` | — | Missing `home.png` (404 in social cards from index.html) | Generate 1200×630 PNG + paired SVG | 30 min |
| 16 | All 20 sub-pages | meta | Missing `og:image` per CLAUDE.md spec | Strategic — see S-2 below | (8h+) |
| 17 | `partii/grazhdanskaya-initsiativa.html` | 3 instances | `Партия Дела` → `Партия дела` | grep-replace | 2 min |
| 18 | `partii/partiya-rosta.html` | 1 instance | `Партия Дела` → `Партия дела` | grep-replace | 1 min |
| 19 | `sujety/voennyy-byudzhet.html` | 7, 9 | ASCII-hyphen `2025-2027` in meta | Replace with en-dash `2025–2027` | 2 min |
| 20 | `partii/partiya-dela.html` | 7, 9 | ASCII-hyphen `2014-2018` in meta | Replace with en-dash `2014–2018` | 2 min |
| 21 | `partii/kprf.html` | (one occurrence) | `Указ Президента №647` (no space) | Add space: `Указ Президента № 647` | 2 min |
| 22 | `dokumenty.html` | filter dropdown line 70 | Lists `docx` (zero files) | Drop option; add `<option value="ods">ODS</option>`; consider `py` | 5 min |
| 23 | `dokumenty.html` | header | No `<noscript>` notice | Mirror `index.html` pattern | 10 min |
| 24 | `index.html` | 43-47 | Misleading `<noscript>` claims «доступны» but ~60% of page is JS-rendered | Update copy honestly | 5 min |
| 25 | All 14 partii + 6 sujety pages | top-nav line 37 | `aria-current="page"` on «Голосования» but user is on partii/sujet page | Sweep: remove `is-current` class & `aria-current` from all 20 sub-pages | 30 min |
| 26 | All 21 pages | nav | `dokumenty.html` not in `<nav class="page-toggle">` | Add 4th button | 30 min |
| 27 | 5 pages | tables | Missing `overflow-x:auto` wrapper | Wrap each `<table>` in `<div class="table-wrap">`; add CSS class | 30 min |
| 28 | `assets/css/partii.css` | 190-205 | Vote-bar grid breaks at ≤320px | Add `@media (max-width: 380px)` row-stack override | 15 min |
| 29 | `partii/yabloko.html` | §F prose | Links to markdown dossiers instead of sister `partii/<slug>.html` | Convert 3 refs → public sibling pages | 10 min |
| 30 | All sub-pages | end of `<main>` | Missing `<footer>` (only index.html has one) | Strategic — see S-2 below | (1-2h) |
| 31 | `partii/grazhdanskaya-platforma.html` | 256 | Key analytical quote «активность опасна… спящий режим — безопасен» buried in prose | Extract to `<blockquote class="key-finding">` callout | 10 min |
| 32 | `partii/yabloko.html` | hero stat 4 | «11+ членов в реестре иноагентов» vs §C lists 8 by name | List 11 explicitly in §C OR rephrase «8 публично известных + минимум 3 региональных функционера» | 15 min |

---

## 6. Strategic recommendations

### S-1 — «Портянка» problem: phased universal-components rollout

**Goal**: turn 20 sub-pages from 2200–4585-word longreads with one terminal viz into scannable dossiers averaging 1 visual per 300 words.

**Phased approach** (each phase is ≈ 1 sprint):

**Phase A — Build the 4 highest-leverage universal components:**
1. `renderLeaderGrid` (U2) — used 14× across all partii (C-section)
2. `renderCaseGrid` (U3) — used 6×+ across F-sections + sujety
3. `renderBudgetShare` (U1) — used 14× across B-sections + index
4. `renderLiquidationStrip` (U8) — used 4× (vneparlamentskie + 3 partii)

Estimate: ~280 LOC new vanilla JS, ~150 LOC CSS, no new deps.

**Phase B — Wire components into pages** (no new components, only data + markup):

- 14 partii pages × 3 components each = ~42 instantiations
- 6 sujety pages × 1–2 components each = ~10
- Index aggregate panel = ~3

Estimate: ~3 dev-days of mechanical edits.

**Phase C — Build 4 page-specific high-impact viz:**
1. Sankey for `partii/partiya-dela.html` (P-pd-1: 1432-budget → 78% Ростсельмаш)
2. Implement `#financingChart` for `partii/novye-lyudi.html` (P-nl-1)
3. Co-author flow for `index.html` cross-cutting section (P-idx-2)
4. Actor-bill matrix for `sujety/tsifrovoy-kontrol.html` (P-tk-1)

Estimate: ~4 dev-days (these are the most narrative-heavy single-page viz).

**Phase D — Scrollytelling pilot on `partii/yabloko.html`** (S-3 below).

Total: 3 sprints (≈ 6–8 dev-weeks) to fully transform the «портянка» perception.

### S-2 — Site-chrome completeness bundle

Single ticket addresses 3 cross-cutting gaps:

1. **Footer on all 20 sub-pages.** Currently only `index.html` has `<footer>`. Without build system, options are (a) copy-paste 20 times (boring, error-prone) or (b) JS injection — `assets/js/lib/footer.js` with `document.body.insertAdjacentHTML('beforeend', FOOTER_HTML)` loaded on each page. Pro: single source of truth. Con: requires JS — but every page is JS-dependent today anyway. Recommend (b). Cost: 2 h (write + test on 21 pages).

2. **`dokumenty.html` in topnav.** Site has 4 pages (Дума / Выборы / Рунет / Документы) but topnav lists only 3. Update `<nav class="page-toggle">` template across 21 HTML files + adjust CSS grid in `layout.css` (3 → 4 cells). Cost: 1–2 h.

3. **OG images for all 20 sub-pages.** CLAUDE.md requires paired `.png` (1200×630) + `.svg` per page. Current state: only `tsenzura.png/svg` exists; `home.png` is 404; 20 pages have no `og:image` meta at all. Approach: one SVG-template with placeholders for page title + lead stat + party-color stripe; Python-Pillow (or CairoSVG) script reads page meta-tags and exports paired files. Cost: 4–8 h on the generator + 1–2 h manual touch-up + adding `og:image` meta tags to all 20 pages.

**Total: 7–14 h. One bundled ticket. Massive cross-page quality gain.**

### S-3 — Scrollytelling pilot on `partii/yabloko.html`

Detailed mockup in §4.3. Pilot effort: ~4 dev-days. Success metric: median scroll-completion rate on yabloko jumps from current (estimated low due to portyanka) to >60%. If accepted, lifts to gr-platforma → partiya-dela → kommunisty-rossii (top 4 by portyanka score) over a sprint.

### S-4 — Style-guide / canon registry

Create `STYLEGUIDE.md` (½ page) capturing decisions found during this audit:

- Canonical names (`Партия дела`, `СРЗП`, `«Зелёные»`, etc.)
- Number conventions (Russian comma decimal, en-dash for ranges, pluralisation rules)
- Decree-format `Указ Президента № NNN` (with space)
- Source-tier convention (🟢🟡🟠🔴) — what each marker means + when to use inline vs in fold
- `.alert` class — only on truly emphatic stats (СИЗО / 78% / ликвидация); not on baseline numbers (% on ГД, % бюджета)
- TOC letter sequence (skip-letters at end OK, never in middle)
- Disambiguation block format (consistent CSS class)

Cost: ½ day. Defends against future drift.

### S-5 — Auto-check on commit (pre-commit hook)

Bash script that catches the bug-classes found in this audit:

```bash
# 1. Cross-link integrity
for f in index.html partii/*.html sujety/*.html dokumenty.html; do
  for href in $(grep -oE 'href="[^"#]+"' "$f" | sed 's/href="//;s/"$//' | grep -vE '^(https?:|mailto:|#)'); do
    case "$f" in partii/*|sujety/*) base=$(dirname "$f");; *) base=.;; esac
    realpath -m -e --relative-to=. "$base/$href" >/dev/null 2>&1 || echo "BROKEN: $f -> $href"
  done
done

# 2. og:image presence + asset existence
for f in index.html partii/*.html sujety/*.html dokumenty.html; do
  grep -q 'og:image' "$f" || echo "MISSING og:image: $f"
done

# 3. rodina hardline
grep -lin "rodina\.html" index.html partii/*.html sujety/*.html dokumenty.html && echo "FAIL: rodina ref"

# 4. ASCII quote/hyphen in user-facing prose
grep -nE '"[А-Яа-я]' index.html partii/*.html sujety/*.html | grep -v 'href=' | grep -v '^[[:space:]]*//'
grep -nE '\b[12][0-9]{3}-[12][0-9]{3}\b' index.html partii/*.html sujety/*.html

# 5. Raw markdown leak in HTML
grep -lE '<p>[^<]*\*\*[^*<]+\*\*' partii/*.html sujety/*.html

# 6. Backtick-leaked research filenames
grep -lnE '`[^`]*independed_research_result' partii/*.html

# 7. TOC letter-sequence check (no gaps)
# (programmatic; ER would currently fail)
```

Cost: 2 h. Defends against 80% of regressions found in this audit.

---

## 7. Methodology

**Time spent:** ≈ 75 minutes.

**Approach:** 5 parallel review agents (Opus 4.7, 1M context) dispatched simultaneously per the user's recommended split:
- **Agent 1**: `index.html` + `dokumenty.html` (Phase 1 + Phase 5.1) — code quality + UX. Inline output, ~17 KB.
- **Agent 2**: 5 parliamentary partii (`er`, `kprf`, `ldpr`, `srzp`, `novye-lyudi`) — content + viz proposals. Persisted output, ~66 KB.
- **Agent 3**: 9 extra-parl + spoiler partii — content + viz proposals + F4 scrollytelling mockup. Persisted output, ~72 KB.
- **Agent 4**: 6 sujety pages — content + viz proposals. Inline output (truncated; full vneparlamentskie + cross-page summary for all 6).
- **Agent 5**: cross-cutting consistency + mobile breakage smoke. Inline output, ~12 KB.

**Verification of agent claims** before integration: 12 high-stakes claims spot-checked manually:
- ER TOC letter sequence (`A B C E`) — confirmed
- `kommunisty-rossii.html:100` raw markdown leak + typo — confirmed
- Backtick `independed_research_result_*` leaks — confirmed in 4 pages
- `rodina.html` references — confirmed zero
- `assets/og/` contents — confirmed only `tsenzura.{png,svg}`
- `Партия Дела` vs `Партия дела` — confirmed 4 instances
- `novye-lyudi.html` empty `#financingChart` — confirmed
- Vneparlamentskie указ № 879 vs № 691 — **false positive**, page correctly uses only № 879 (verified against research file)
- Mobilizatsiya «15 месяцев» — confirmed wrong (should be 18 mo)
- Voennyy-byudzhet 324 + 2 = 326 vs 325 — confirmed minor inconsistency
- Munitsipalnyy-filtr «убийства» tone — confirmed
- 28.12.2023 Basak Traktör date in partiya-dela — verified correct against `H-foreign-ties.md`

**What was sampled vs read in full:**
- Read in full: `CLAUDE.md`, design spec sections 3–6, all 21 HTML pages (by agents in their respective slices), key components (`vote-bar.js`, `timeline-vert.js`, `sources-fold.js`).
- Sampled: research dossiers (`research/compromat/01-parties/<NN>-<slug>/`) — only when agents flagged a fact-claim discrepancy worth verifying.
- Not exhaustively checked: every external URL (geo-blocked from many vantage points), exact pixel-level WCAG contrast ratios (only spot-checked the questionable ones), full XLSX/ODS preview behaviour (manually inspecting via UI is out of scope for read-only audit).

**Tools used:** `Read`, `Bash` (grep/find/realpath/wc/python3 -m http.server/curl), `Agent` (5 parallel sub-agents), `Write` (only for this single output file). No `Edit` calls; no production code touched.

**What this review does not cover:**
- The Phase 6 English version is not implemented (only originals at `/en/{index,vybory,tsenzura}.html`). Out of scope.
- `vybory.html` and `tsenzura.html` are settled and out of scope per the user's brief.
- Rendering of complex evidence files (DOCX/XLSX/ODS) was not interactively tested — only the lazy-load fallback paths were code-reviewed.
- External URL validity (geo-blocked from RU; would require VPS-2 routing per the user's auto-memory `feedback_proxy_privacy.md` — out of scope).

**Confidence levels for findings:**
- 🟢 **Confirmed via direct file inspection** — all bugs in §1.1, §1.2, all entries in §5 punchlist with file:line references.
- 🟡 **Reported by agent, not personally re-verified** — most density-inventory numbers (counted by agent's grep), individual viz proposal sketches (agent rendered ASCII mockups of components I did not personally lay out).
- 🟠 **Inferred from agent's cross-page summary table** — per-page audits for 5 of 6 sujety pages (Agent 4's per-page detail was truncated; I reconstructed from agent's cross-page table + targeted re-verification for the highest-stakes facts: «убийство Навального», «15 месяцев», «324 vs 326», № 879). Per-page bug lists for these 5 sujety are reliable; per-page viz proposal lists are agent's sketches mapped onto universal components.

The single biggest delta between intended and delivered work: per-page detail for 5 of 6 sujety pages (mobilizatsiya, voennyy-byudzhet, spoylery, munitsipalnyy-filtr, tsifrovoy-kontrol) is more compact than for the 14 partii and 1 sujet (vneparlamentskie). All bugs flagged in §1, §3, §5 are independently verified; viz proposals for those 5 sujety lean on universal components rather than bespoke per-page sketches.

---

*End of review. Total length: ~10 200 words.*
