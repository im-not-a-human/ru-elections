# Comprehensive Review — Compromat Pages (Phases 1–5.1)

## 1. Executive summary

### Top 5 critical issues

1. **The main page still mixes the old 18-law frame with the new archive hub.** `index.html:6`, `index.html:107-109`, `index.html:146`, `index.html:297` still say “18” and use the older “digital/civil freedoms” framing, while `assets/js/data/laws.js` now renders a larger law set and the page has become a 14-party hub. This is a trust issue because the headline numbers no longer describe the page.
2. **Several factual/source defects should be fixed before further promotion.** The most serious: the local Titov decree files linked from `partii/partiya-rosta.html` and `sujety/vneparlamentskie.html` do not contain the claimed Titov decrees; LDPR and KPRF have mismatched electoral/place/mandate claims; `sujety/mobilizatsiya.html` correctly displays the XML vote totals but phrases “103 deputies” too broadly.
3. **The “portyanka” problem is real.** The 20 dossier/sujet pages average very few visual blocks relative to text. The worst pages have 1,700–2,600 words per visual. `partii/yabloko.html`, `partii/grazhdanskaya-platforma.html`, and `partii/partiya-dela.html` are the most text-heavy.
4. **Mobile at 320px has horizontal overflow across most new pages.** Browser smoke checks showed `scrollWidth=641` on all tested `partii/*` and `sujety/*` pages at 320px. Root cause: shared `page-toggle` renders both `.lbl-full` and `.lbl-short` because the compact-label rule lives only in `tsenzura.css`, not `layout.css`.
5. **`dokumenty.html` previews heavy evidence files too eagerly and parses CSV naively.** Files over 5 MB exist, including a 46 MB UK sanctions CSV and 27 MB OFAC XML. Current renderers fetch/read them fully, and CSV uses `row.split(',')`, which will misparse quoted commas in sanctions and registry data.

### Top 5 quick wins (≤30 min each)

1. Move `.page-toggle .lbl-short/.lbl-full` responsive rules from `tsenzura.css` into `layout.css`.
2. Fix the obvious copy bugs: `233 файлов` → `233 файла`; LDPR “3,20 ниже 2,70”; KPRF “Харитонов — 4-е место”; ER TOC skipping D.
3. Remove or fill the blank `#financingChart` card in `partii/novye-lyudi.html`.
4. Replace ASCII quotes in user-facing fallback/body text: `index.html:348`, `partii/grazhdanskaya-platforma.html:247`, `partii/zelenye.html:253`.
5. Add a large-file guard in document preview: for files >5 MB, show title, size, “Открыть в репозитории”, and “Скачать” instead of auto-preview.

### Top 3 strategic recommendations

1. **Build a small vanilla visualization layer for dossiers.** Start with reusable vote matrix, finance stack, evidence/confidence card, event swimlane, and relationship graph components. No new framework is needed.
2. **Move factual page data into structured JS/JSON blocks.** Current inline prose and inline render arrays duplicate research facts. Data-driven blocks would reduce drift between hero stats, charts, source folds, and document aliases.
3. **Adopt mobile-first dossier storytelling.** Keep full text, but lead each section with an at-a-glance visual, then a short interpretation, then expandable evidence. `partii/yabloko.html` is the best pilot because its argument is nuanced rather than accusatory.

### Overall quality rating

**7 / 10.** The archive is substantial, link structure is mostly sound, local links resolve, dynamic pages load without console errors, and the tone is usually analytical. The weak spots are factual drift in several high-salience claims, too many generic citations, mobile overflow, and visual density far below the design intent.

## 2. Per-page audits

### 2.1 `index.html`

**Bugs and content issues.** The page title and method text still say “2019–2025” and “18” laws (`index.html:6-7`, `index.html:107-109`, `index.html:146`), but the new home is a 14-party/documentary hub. The OG image points to `assets/og/home.png`, which is absent; only `tsenzura.*` exists. The hero OG copy says “300 тыс. мобилизованы за 36 часов”, while the key documented chronology is: vote on September 20, 2022, decree on September 21, 2022.

**Accessibility/UX.** With JS disabled, hero stats, the 14-party cards, matrix rows, and cross-cutting cards are empty despite the noscript text saying the page remains readable. Matrix rows and old party cards are click-only, not keyboard controls. At 320px the party category header overflows (`scrollWidth=441`).

**Visual notes.** The old “Пять портретов” modal section remains below the new 14-party grid, creating two competing party entry points. Matrix cells still show text states rather than the spec’s numeric vote breakdowns.

### 2.2 `partii/er.html`

**Bugs and content issues.** The page has only four sections, which is acceptable for ER as baseline context, but the TOC labels jump A/B/C/E (`partii/er.html:85-88`). Several links are generic publisher roots, e.g. `kommersant.ru`, `cikrf.ru/analog`, `sozd.duma.gov.ru`.

**Accessibility/UX.** Structure passes: `data-page="party"`, section IDs match TOC targets, one sources-fold per section, no duplicate IDs. Mobile overflows because of shared nav.

**Visual notes.** ER is short, but it badly needs a threshold visual explaining why 325 seats make the “opposition” structurally non-blocking.

### 2.3 `partii/kprf.html`

**Bugs and content issues.** Hero stats broadly match the README: 18.93%, 84%, 94%, and the 407 mln ₽ campaign-profit claim are present in research. However `partii/kprf.html:422` says “Зюганов лично — соавтор” for mobilization; the documented coauthor list in `09-betrayal-cases.md` names Kartapolov/Krasov/Slutsky/Nilov/Davankov, not Zyuganov. `partii/kprf.html:426` says Kharitonov was 4th in 2024; the dossier says 4.31%, second place.

**Accessibility/UX.** Structure passes. The page is dense: 31 content paragraphs and only two visuals.

**Visual notes.** This page is a prime candidate for a dual-axis “social-economic front vs military-repressive support” matrix.

### 2.4 `partii/ldpr.html`

**Bugs and content issues.** `partii/ldpr.html:104` says Slutsky’s 3.20% is below Zhirinovsky’s historic minimum 2.70%; numerically it is above. The same issue repeats near `partii/ldpr.html:343`. The hero says 23 mandates including Zhuravlev, while the README says 21; clarify whether the number is party seats or the broader LDPR faction. `partii/ldpr.html:140` gives ≈220 mln ₽ presidential campaign profit, while `research/compromat/04-summary-tables/financing-shares.md:73` gives about 140 mln ₽.

**Accessibility/UX.** Structure passes. Mobile overflows. Several source links are broad roots.

**Visual notes.** The page’s strongest material is temporal: pre/post-Zhirinovsky, Slutsky succession, Lugovoy from Litvinenko report to inagent law.

### 2.5 `partii/srzp.html`

**Bugs and content issues.** `partii/srzp.html:71` says Kiriyenko “объединил” SR with Prilepin/Semigin structures in 2021. The README frames 2021 as a reconstruction and 2025 as documented public participation. Keep evidence levels explicit. `partii/srzp.html:105` also reads as conclusion rather than sourced fact.

**Accessibility/UX.** Structure passes. Density is high: 29 paragraphs and two visuals.

**Visual notes.** A three-wave party-construction visual would reduce a lot of prose and better preserve source confidence by coloring 2006/2021/2025 differently.

### 2.6 `partii/novye-lyudi.html`

**Bugs and content issues.** The visible financing chart card is empty at `partii/novye-lyudi.html:147`; inline JS says the Chart.js chart was skipped at `partii/novye-lyudi.html:397`. This is the clearest broken visual in the party set. Source-fold metadata also drifts: one fold says “12 ссылок · 5 PDF” while containing fewer links/no PDFs.

**Accessibility/UX.** Structure passes. Mobile overflows. Chart.js is not loaded on party pages despite the spec saying it is available on every page.

**Visual notes.** The page is ideal for a “fast registration → budget dependence → Davankov contradiction” sequence.

### 2.7 `partii/yabloko.html`

**Bugs and content issues.** The page correctly treats Yabloko as a structural partial exception rather than forcing the party into the same accusation pattern. Keep all “coordination with AP” claims in interpretive/uncertain language.

**Accessibility/UX.** It is the worst text-to-visual page: 35 content paragraphs, 2,659 words, one timeline. This is exactly the “portyanka” problem.

**Visual notes.** The narrative needs an exception triad, a pressure ledger, and a regional-position matrix before prose.

### 2.8 `partii/partiya-rosta.html`

**Bugs and content issues.** The Titov decree local evidence files are materially wrong: `decree-879-2012-06-22-titov-business-ombudsman.html` opens as FZ-62 content, and `decree-299-2024-titov-special-rep.html` opens as military-rank content. This undermines the page’s strongest claim and the cross-cutting liquidation page.

**Accessibility/UX.** Structure passes; mobile overflows.

**Visual notes.** A dual-track Titov timeline can show state office, party lifecycle, and business role without implying illegality.

### 2.9 `partii/grazhdanskaya-initsiativa.html`

**Bugs and content issues.** The “208 тыс. подписей в 120+ городах” claim appears in the hero and Section F (`partii/grazhdanskaya-initsiativa.html:71`, `:255`) but was not found verbatim in the matching README/F-file. It needs an exact source before becoming a chart. The “Two Nechaevs” disambiguation is good and should remain prominent.

**Accessibility/UX.** Structure passes; mobile overflows. Generic source roots are frequent.

**Visual notes.** Replace a prose paragraph with a compact Nadezhdin campaign chain plus a 9.3% vs 5% signature rejection gauge.

### 2.10 `partii/partiya-dela.html`

**Bugs and content issues.** The 78% Programme 1432 claim matches the dossier, but it should always be worded as two producers receiving 78%, not only “Babkin’s company”. Generic CIK/Minjust links should be replaced with precise documents where possible.

**Accessibility/UX.** Structure passes; mobile overflows.

**Visual notes.** The page is 2,191 words per visual. The Programme 1432 split should become the lead visual.

### 2.11 `partii/kommunisty-rossii.html`

**Bugs and content issues.** The one-source “120 million” case is correctly marked 🟠 in prose. Preserve that caution in any visualization. The “7 of 15 districts” claim is central and should be turned into a district grid after all seven names are verified.

**Accessibility/UX.** Structure passes; mobile overflows.

**Visual notes.** It has both a timeline and a table, but the key mechanism is still buried in prose.

### 2.12 `partii/pensionery.html`

**Bugs and content issues.** Hero stats are consistent with the README: 2.45%, 0% budget funding, 16.7 mln ₽. The word “отъём” is analytically useful but slightly harsher than the calm style; “переток” or “фрагментация” may be calmer in headings.

**Accessibility/UX.** Structure passes; mobile overflows.

**Visual notes.** The page needs a threshold bar: 2.45% is meaningful only when seen against the 3% budget threshold and 5% mandate threshold.

### 2.13 `partii/zelenye.html`

**Bugs and content issues.** The “Not Mitvol” block is good. There are ASCII quotes in user-facing prose around “Яблока” (`partii/zelenye.html:253`, `:284`). Registration wording should distinguish founding date from Minjust registration date.

**Accessibility/UX.** Structure passes; mobile overflows.

**Visual notes.** The registration-window timeline is the best at-a-glance argument.

### 2.14 `partii/rpss.html`

**Bugs and content issues.** “Лаборатория Богданова” is a useful label, but any network visual must mark this as journalistic/analytical reconstruction, not documented AP control. Hero stats match the README.

**Accessibility/UX.** Structure passes; mobile overflows.

**Visual notes.** The current table helps, but a network/timeline would show rebrands and party shells more quickly.

### 2.15 `partii/grazhdanskaya-platforma.html`

**Bugs and content issues.** ASCII quotes appear in “фактически "спящая"” (`partii/grazhdanskaya-platforma.html:247`). Otherwise the page’s “sleeping party” framing matches the README.

**Accessibility/UX.** Structure passes; mobile overflows. It is second in text-to-visual ratio.

**Visual notes.** Pair 0.15% party-list support with one SMD mandate to explain why the party exists as a shell.

### 2.16 `sujety/mobilizatsiya.html`

**Bugs and content issues.** The XML confirms the displayed vote totals: total 389/0/0/61; ER 286/0/0/38; KPRF 51/0/0/6; SRZP 21/0/0/7; LDPR 18/0/0/5; NL 13/0/0/2. But “ни один из 103 их депутатов” should be “из 103 участвовавших” or “из 123 депутатов: 103 за, 20 отсутствовали”. The “36 hours” phrasing is weaker than a precise “на следующий день” unless a start timestamp is documented.

**Accessibility/UX.** Structure passes; mobile overflows.

**Visual notes.** Existing timeline + vote bars are among the better pages, but it needs absence rosters and exact deltas.

### 2.17 `sujety/voennyy-byudzhet.html`

**Bugs and content issues.** Several budget and vote links point to generic roots. If exact XML for budget votes is not local, mark vote counts as approximate or link exact vote pages. Reconcile methodology for “3.3–3.4×” versus any other derived ratio.

**Accessibility/UX.** Structure passes; mobile overflows.

**Visual notes.** The topic demands allocation bars and a majority ladder.

### 2.18 `sujety/spoylery.html`

**Bugs and content issues.** Some press links are grouped under 🟢 document-level sources. Reclassify press as 🟡 unless the link is a primary document. The page has a useful table but should preserve “industry” as analytical framing.

**Accessibility/UX.** Structure passes; mobile overflows.

**Visual notes.** The double-candidate matrix is the core visual; it should be searchable/sortable in plain JS.

### 2.19 `sujety/munitsipalnyy-filtr.html`

**Bugs and content issues.** Several claims rely on generic CIK/Golos roots. This page would benefit from explicit confidence labels because municipal data are regional and uneven.

**Accessibility/UX.** Structure passes; mobile overflows.

**Visual notes.** A small calculator would make the mechanism immediately legible to non-specialists.

### 2.20 `sujety/tsifrovoy-kontrol.html`

**Bugs and content issues.** Claims about technical capabilities of digital ruble/freezing/transaction visibility should always have exact primary or high-quality technical sources. “≥1100” inagent count needs a dated Minjust snapshot.

**Accessibility/UX.** Structure passes; mobile overflows.

**Visual notes.** It already has more visual density than most pages, but a two-law vote comparison and inagent timeline would make the argument clearer.

### 2.21 `sujety/vneparlamentskie.html`

**Bugs and content issues.** The page inherits the Titov decree evidence problem. It should not build visuals around those decree links until the local evidence files are corrected. Month-only liquidation dates should be visually marked as month-level precision.

**Accessibility/UX.** Structure passes; mobile overflows.

**Visual notes.** The cross-party liquidation timeline is good raw material for a stronger “three trajectories” matrix.

### 2.22 `dokumenty.html`

**Bugs and content issues.** Header grammar: `233 файлов` should be `233 файла`. The document tree correctly counts 233 files, 24 dirs including root, 225 file aliases, and 23 dir aliases. `INDEX.md` auto-opens, and clickable code paths work in-browser.

**Accessibility/UX.** Keyboard `/` focuses search and Ctrl+B toggles the tree. Tree and tabs need better ARIA: `role="tablist"` exists, but tab buttons lack `role="tab"` and `aria-selected`; tree dirs do not maintain `aria-expanded`. Close controls are nested inside tab buttons.

**Performance.** Large files are not guarded; CSV parsing is not robust for quoted fields. At 320px, the page overflows due to nav and markdown tables.

## 3. Cross-cutting issues

### 3.1 Naming inconsistencies

- ER TOC skips D (`A/B/C/E`).
- LDPR uses 23 mandates in the page and 21 in the README. Use “21 мандат ЛДПР по списку/округам” versus “23 во фракции/с союзниками” if both are intended.
- `sujety/*` and `partii/*` nav mark the root “Голосования” link as `aria-current="page"`, even though current page is not the index.
- “СРЗП” vs “Справедливая Россия” needs a date note after the 2025 rebrand.

### 3.2 Source-attribution gaps

- Too many citations link to publisher homepages or broad indexes (`rbc.ru`, `kommersant.ru`, `cikrf.ru`, `minjust.gov.ru`, `publication.pravo.gov.ru`) rather than exact documents.
- Several synthesis files are grouped under 🟢 primary-document folds. Local research notes are useful, but they should be 🔴/methodological unless they contain the primary artifact.
- Hero stat rendering on index hardcodes 🟢 for every source. That is wrong for figures backed by synthesis or non-primary counts.
- Speculative or reconstructed claims around “AP coordination” should visibly carry 🟠/🔴 markers.

### 3.3 Cross-link breaks

Automated check passed for scoped local links:

- All `../research/compromat/...` links in `partii/*.html` and `sujety/*.html` resolve on disk.
- All `../partii/*.html` and `../sujety/*.html` links in scoped pages resolve.
- No `rodina.html` links were found.
- `assets/js/data/extended-parties.js` and `assets/js/data/cross-cutting.js` hrefs match real files.

The exception is not a broken path but **wrong content behind two existing local Titov decree files**, which is worse for trust than a 404.

### 3.4 Mobile breakage points

- `layout.css` does not globally hide `.lbl-full` or `.lbl-short`, so narrow screens render both labels.
- `home-compromat.css:4-11` keeps party category headings and meta in a flex row that overflows at 320px.
- `partii.css:115-130` keeps hero stats in two columns below 760px; long stat numbers such as “Нечаев ≠ Нечаев” and “407 млн ₽” overflow.
- `dokumenty.css:433-450` applies nowrap table styling to markdown tables without containing page-level overflow.
- Sticky TOC is correctly hidden below 1080px, but the spec’s mobile “Содержание” affordance is missing.

### 3.5 Console errors

Browser smoke check over `/`, `/index.html`, `/dokumenty.html`, all 14 `partii/*`, and all 6 `sujety/*` showed no console errors or 4xx asset responses on initial load. `node --check` passed for JS files in `assets/js/data`, `lib`, `components`, and `pages`; 42 inline scripts parsed successfully. Duplicate IDs: none. Section/TOC matching: passed.

## 4. Visualisation proposal catalogue

### 4.0 Current visual-density inventory

Method: counted `<p>` inside `.party-sec` sections, excluding `sources-fold`; counted calls to `renderVoteBar`, `renderTimelineVert`, content tables, and inline media in content sections; word counts are approximate.

| Rank | Page | Paragraphs | Vote bars | Timelines | Tables | Images/SVG | Words | Words / visual |
|---:|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | `partii/yabloko.html` | 35 | 0 | 1 | 0 | 0 | 2659 | 2659 |
| 2 | `partii/grazhdanskaya-platforma.html` | 24 | 0 | 1 | 0 | 0 | 2290 | 2290 |
| 3 | `partii/partiya-dela.html` | 25 | 0 | 1 | 0 | 0 | 2191 | 2191 |
| 4 | `partii/partiya-rosta.html` | 24 | 0 | 1 | 0 | 0 | 1820 | 1820 |
| 5 | `partii/rpss.html` | 21 | 0 | 0 | 1 | 0 | 1758 | 1758 |
| 6 | `partii/zelenye.html` | 21 | 0 | 1 | 0 | 0 | 1704 | 1704 |
| 7 | `partii/grazhdanskaya-initsiativa.html` | 24 | 0 | 1 | 0 | 0 | 1684 | 1684 |
| 8 | `partii/pensionery.html` | 17 | 0 | 0 | 1 | 0 | 1663 | 1663 |
| 9 | `partii/ldpr.html` | 29 | 1 | 1 | 0 | 0 | 3270 | 1635 |
| 10 | `partii/srzp.html` | 29 | 1 | 1 | 0 | 0 | 3002 | 1501 |
| 11 | `sujety/munitsipalnyy-filtr.html` | 18 | 0 | 0 | 1 | 0 | 1464 | 1464 |
| 12 | `partii/kprf.html` | 31 | 1 | 1 | 0 | 0 | 2739 | 1370 |
| 13 | `sujety/vneparlamentskie.html` | 19 | 0 | 1 | 0 | 0 | 1287 | 1287 |
| 14 | `sujety/spoylery.html` | 18 | 0 | 0 | 1 | 0 | 1233 | 1233 |
| 15 | `sujety/voennyy-byudzhet.html` | 15 | 1 | 0 | 0 | 0 | 1159 | 1159 |
| 16 | `partii/kommunisty-rossii.html` | 19 | 0 | 1 | 1 | 0 | 1865 | 933 |
| 17 | `partii/er.html` | 5 | 1 | 0 | 0 | 0 | 553 | 553 |
| 18 | `partii/novye-lyudi.html` | 28 | 1 | 1 | 0 | 0 | 930 | 465 |
| 19 | `sujety/tsifrovoy-kontrol.html` | 18 | 2 | 1 | 0 | 0 | 1387 | 462 |
| 20 | `sujety/mobilizatsiya.html` | 16 | 1 | 1 | 0 | 0 | 907 | 454 |

Note: `partii/novye-lyudi.html` appears visually denser by count, but one chart card is blank, so perceived density is worse than the table suggests.

### 4.1 Per-page proposals

#### `partii/er.html`

**P1 — Section E (Голосование).** Replace part of the paragraph about blocking power. Visual: majority threshold ladder. Data: `{ seats:325, thresholds:[{n:226,label:"простое большинство"},{n:300,label:"конституционное"}], opposition:125 }`. Mockup: `0 ── 226 ── 300 ── 325 ЕР ── 450`. Implementation: native CSS bar, ~60 LOC in `majority-ladder.js`. Risk: explain thresholds without overloading the reader.

**P2 — Section C (Авторы законов).** Augment author list. Visual: authorship network. Data: `{ people:[{id:"volodin",role:"спикер"}], bills:[{id:"464757-7",topic:"фейки"}], edges:[["volodin","464757-7"]] }`. Mockup: `Володин → ФЗ-32; Хинштейн → Рунет/MAX; Картаполов → оборона`. Implementation: small SVG graph or CSS grid cards, ~100 LOC. Risk: every edge needs SOZD verification.

**P3 — Section B (Финансирование).** Replace financial paragraph. Visual: stacked funding comparison across five parliamentary parties. Data: `{ party:"ЕР", budgetPct:39, otherPct:61 }`. Mockup: `ЕР [бюджет 39%][прочее 61%]`. Implementation: Chart.js horizontal stacked bar or native comparison bars. Risk: non-budget categories may be approximate; mark with `≈`.

#### `partii/kprf.html`

**P1 — Section E (Голосование).** Replace paragraphs listing issue axes. Visual: 28-law dot matrix split by “социально-экономическая” and “военно-репрессивная” axes. Data: `{ lawId:"army-fakes", year:2022, axis:"war", vote:"za", counts:{for:51,against:0,abstain:0,skip:6} }`. Mockup: `соц: 🟩🟩🟧 | война: 🟥🟥🟥🟥`. Implementation: reusable `party-vote-matrix.js`, CSS Grid, ~90 LOC. Risk: taxonomy must be visible and disputable.

**P2 — Section B (Финансирование).** Augment state-budget prose. Visual: budget dependence + campaign-profit combo. Data: `{ year:2024, totalMln:1800, budgetPct:84.4, campaignProfitMln:407 }`. Mockup: `2022 84% ████; 2023 94% █████; 2024 84% ████ + 407 млн`. Implementation: Chart.js bar/line once Chart.js is loaded on party pages. Risk: avoid suggesting campaign profit is illegal.

**P3 — Section F (Управляемая оппозиция).** Replace internal-opponent list. Visual: neutralization swimlane. Data: `{ person:"Грудинин", date:"24.07.2021", mechanism:"ЦИК", outcome:"снят из списка", source:"..." }`. Mockup: `Грудинин → ЦИК → снят; Рашкин → дело → мандат утрачен`. Implementation: native table/timeline hybrid, ~80 LOC. Risk: causal language must stay cautious.

#### `partii/ldpr.html`

**P1 — Section A/G.** Replace post-Zhirinovsky electoral prose. Visual: electoral line after leadership transition. Data: `{ year:2024, contest:"presidential", leader:"Слуцкий", pct:3.2 }`. Mockup: `1993 22.9 ┐ ... 2021 7.55 ─ 2024 3.20`. Implementation: Chart.js line with separate contest labels. Risk: do not compare Duma seats and presidential percentages on one scale.

**P2 — Section C/H.** Augment Lugovoy biography. Visual: sanctions/law timeline. Data: `{ date:"2016-01-21", event:"Litvinenko Inquiry", type:"primary-report" }`. Mockup: `2006 Литвиненко → 2016 inquiry/sanctions → 2022 ФЗ-255`. Implementation: extend `renderTimelineVert` with evidence badges. Risk: phrase as “по выводам отчёта”, not court conviction.

**P3 — Section B.** Replace finance centralization paragraph. Visual: party spending centralization bar. Data: `{ category:"руководящие органы", pct:60 }, { category:"местные", pct:19 }`. Mockup: `ЦК 60% | регионы 19% | прочее 21%`. Implementation: native stacked bar. Risk: label as 2023 snapshot only.

#### `partii/srzp.html`

**P1 — Section A/F.** Replace three-wave narrative. Visual: party-construction timeline with evidence grades. Data: `{ date:"2025-10-25", wave:"ребрендинг", actor:"Кириенко", grade:"green" }`. Mockup: `2006 Сурков 🟡/🟢 → 2021 слияние 🟠 → 2025 Кириенко 🟢`. Implementation: native horizontal timeline, ~80 LOC. Risk: 2021 must not be stated as primary-documented AP control.

**P2 — Section C/E.** Augment leader biographies. Visual: law-production network. Data: `{ person:"Аксаков", role:"автор", law:"ФЗ-340", topic:"цифровой рубль" }`. Mockup: `Аксаков → цифровой рубль; Нилов → мобилизация; Миронов → ЛГБТ`. Implementation: CSS cards or SVG network. Risk: distinguish author/coauthor/sponsor.

**P3 — Section H.** Replace sanctions prose. Visual: sanctions distribution matrix. Data: `{ person:"Миронов", us:true, eu:true, uk:true, ca:true }`. Mockup: `Миронов US/EU/UK/CA; Аксаков US/EU/UK; Прилепин ...`. Implementation: CSS grid heatmap. Risk: sanctions lists change; include dated snapshot.

#### `partii/novye-lyudi.html`

**P1 — Section B.** Replace blank chart. Visual: financing transition chart. Data: `{ year:2023, budgetPct:93, budgetMln:455 }`. Mockup: `2021 0% → 2022 92% → 2023 93% → 2024 ≈90%`. Implementation: Chart.js bar/line in existing `#financingChart`, ~40 LOC plus script include. Risk: 2024 should remain approximate.

**P2 — Section A.** Augment registration story. Visual: registration-speed comparison. Data: `{ party:"Новые люди", months:3, result:"registered" }`. Mockup: `НЛ 3 мес █; ПАРНАС 18 мес █████; Партия прогресса 7 лет ████████`. Implementation: native comparison bars. Risk: compare equivalent legal procedures only.

**P3 — Section E/F.** Replace Davankov contradiction prose. Visual: split timeline. Data: `{ date:"2022-09-20", stance:"соавтор мобилизационных поправок" }, { date:"2024-03", stance:"мир и переговоры" }`. Mockup: `2022 кнопка/соавторство → 2024 кандидатская риторика`. Implementation: two-column timeline. Risk: campaign slogan needs exact source.

#### `partii/yabloko.html`

**P1 — Hero/Section A.** Add before prose. Visual: exception triad. Data: `{ criterion:"угроза ЕР", value:"нет", evidence:"1.34%" }`. Mockup: `угроза — нет | бюджетная зависимость — нет | голосование за ограничения — нет фракции/антивоенная позиция`. Implementation: CSS scorecard, ~50 LOC. Risk: preserve “partial exception”, not “pure opposition”.

**P2 — Sections C/G.** Replace pressure paragraphs. Visual: pressure ledger with lanes for inagents, criminal cases, registration denials. Data: `{ date:"2023-06-16", type:"иноагент", person:"Шлосберг" }`. Mockup: `иноагенты ━●━●; дела ━●; регистрации ━●━●`. Implementation: native lane timeline. Risk: do not collapse 11+ inagents into criminal cases.

**P3 — Section E.** Augment “no Duma faction” explanation. Visual: regional stance matrix. Data: `{ body:"ЗС СПб", issue:"антивоенное заявление", stance:"yes", date:"2022-03" }`. Mockup: `СПб | война 🟩 | бюджеты 🟧 | ДЭГ 🟩`. Implementation: CSS grid/table with source cells. Risk: regional data are uneven.

#### `partii/partiya-rosta.html`

**P1 — Section C/D.** Replace dual-role prose. Visual: Titov dual-track timeline. Data: `{ date:"2012-06-22", lane:"state", label:"бизнес-омбудсмен" }`. Mockup: `госдолжность: 2012 омбудсмен → 2024 спецпредставитель; партия: 2016 рост → 2024 слияние → 2025 ликвидация`. Implementation: multi-lane timeline, ~90 LOC. Risk: fix wrong decree evidence first.

**P2 — Section B/D.** Augment conflict-of-interest explanation. Visual: relationship map. Data: `{ nodes:["Титов","Партия Роста","Абрау-Дюрсо","Президентский контур"], edges:[{from:"Титов",to:"Президентский контур",label:"назначение"}] }`. Mockup: `Титов ↔ партия; Титов → должность; Титов → семейный бизнес`. Implementation: native SVG. Risk: no illegality implied.

**P3 — Section F.** Replace merger prose. Visual: merger/liquidation funnel. Data: `{ stage:"слияние с НЛ", date:"2024-04-19", status:"absorbed" }`. Mockup: `Партия Роста → кадры/совет → Новые люди; юрлицо → ВС → ликвидация`. Implementation: CSS stepper. Risk: regional-office counts may be missing.

#### `partii/grazhdanskaya-initsiativa.html`

**P1 — Hero/Section C.** Replace disambiguation paragraph. Visual: “Two Nechaevs” comparator. Data: `{ name:"А. А. Нечаев", born:1953, party:"ГИ" }, { name:"А. Г. Нечаев", born:1966, party:"НЛ" }`. Mockup: `Нечаев 1953 ≠ Нечаев 1966`. Implementation: native two-card component. Risk: avoid unlicensed photos.

**P2 — Section F.** Replace Nadezhdin chronology list. Visual: campaign chain + signature gauge. Data: `{ signatures:208000, cities:120, invalidPct:9.3, limitPct:5 }`. Mockup: `сбор → ЦИК: 9.3% > 5%`. Implementation: CSS meter or Chart.js gauge. Risk: exact source needed for 208k/120+.

**P3 — Section F.** Augment liquidation context. Visual: three liberal-party liquidation timeline. Data: `{ party:"Партия дела", date:"2024-11-27" }`. Mockup: `ПД 11.2024 | ГИ 06.2025 | ПР 11.2025`. Implementation: `renderTimelineVert` or lane timeline. Risk: show formal grounds separately from interpretation.

#### `partii/partiya-dela.html`

**P1 — Section D.** Replace Programme 1432 paragraph. Visual: subsidy split. Data: `{ recipient:"Ростсельмаш + ПТЗ", pct:78 }, { recipient:"прочие", pct:22 }`. Mockup: `[███████████████ 78%][████ 22%]`. Implementation: Chart.js doughnut/bar or native stacked bar. Risk: clarify two producers, not only Babkin.

**P2 — Section C/D.** Augment Babkin ecosystem. Visual: ecosystem wheel. Data: `{ nodes:["Бабкин","Ростсельмаш","Росспецмаш","Партия дела","ЛДПР"], edges:[...] }`. Mockup: `Бабкин` center, spokes to business, lobby, party. Implementation: native SVG. Risk: distinguish party, association, and business.

**P3 — Section F.** Replace lifecycle prose. Visual: party lifecycle timeline. Data: `{ date:"2024-11-27", event:"ликвидация ВС РФ" }`. Mockup: `1432 → партия-лобби → приостановка → ликвидация → ЛДПР`. Implementation: existing timeline. Risk: exact registration date still needs verification.

#### `partii/kommunisty-rossii.html`

**P1 — Section F.** Replace double-name prose. Visual: 15-district grid. Data: `{ district:"Люблинский", kprf:"Рашкин", spoiler:"Рашкин", match:"full" }`. Mockup: `15 ячеек, 7 подсвечены как двойники`. Implementation: CSS grid + tooltip. Risk: verify all seven rows.

**P2 — Section A/F.** Augment brand confusion. Visual: brand similarity matrix. Data: `{ marker:"название", kprf:"КПРФ", kpkr:"Коммунисты России", similarity:"high" }`. Mockup: `название 🟥 | символика 🟧 | повестка 🟧`. Implementation: native table. Risk: interpretive rows must be marked 🔴.

**P3 — Section D.** Replace admin-control prose. Visual: control timeline. Data: `{ date:"2022-03", event:"смена руководства", sourceLevel:"green/yellow" }`. Mockup: `2012 регистрация → 2018 президентские → 2021 двойники → 2022 смена`. Implementation: `renderTimelineVert`. Risk: 120 mln claim remains 🟠.

#### `partii/pensionery.html`

**P1 — Hero/Section A.** Replace election-result prose. Visual: threshold chart. Data: `{ year:2021, pct:2.45, budgetThreshold:3, dumaThreshold:5 }`. Mockup: `2.45% ███ | 3% порог | 5% барьер`. Implementation: native threshold bar. Risk: 2016 result approximate.

**P2 — Section F.** Augment spoiler role. Visual: left-social fragmentation stack. Data: `{ party:"КПРФ", pct:18.93 }, { party:"Пенсионеры", pct:2.45 }`. Mockup: `лево-социальная ниша: КПРФ + СРЗП + пенсионеры`. Implementation: Chart.js stacked bar. Risk: do not imply direct vote transfer.

**P3 — Section D/F.** Replace program overlap prose. Visual: policy overlap heatmap. Data: `{ topic:"индексация пенсий", kprf:true, srzp:true, pensionery:true }`. Mockup: `пенсии 🟩🟩🟩; ЖКХ 🟩🟩🟧`. Implementation: CSS grid. Risk: requires program-source verification.

#### `partii/zelenye.html`

**P1 — Section A.** Replace registration prose. Visual: registration-window timeline. Data: `{ date:"2020-04-07", party:"Зелёная альтернатива", event:"регистрация Минюстом" }`. Mockup: `10.03 съезд → 24.03 НЛ → 25.03 За правду → 07.04 ЗА`. Implementation: timeline. Risk: distinguish founding vs registration.

**P2 — Section C.** Replace Mitvol clarification. Visual: “Not Mitvol” entity cards. Data: `{ entity:"Зелёная альтернатива", type:"партия", relation:"объект досье" }`. Mockup: `партия 2020 ≠ РЭП Зелёные ≠ Митволь/движение`. Implementation: native comparison cards. Risk: do not attach Mitvol case to party.

**P3 — Section F.** Augment merger prose. Visual: green niche consolidation flow. Data: `{ from:"Зелёная альтернатива", to:"РЭП Зелёные", date:"2026-04-26" }`. Mockup: `ЗА ──26.04.2026──> РЭП «Зелёные»`. Implementation: simple SVG flow. Risk: merger source quality.

#### `partii/rpss.html`

**P1 — Section F.** Replace “laboratory” prose. Visual: Bogdanov network. Data: `{ node:"РПСС", kind:"party" }, { edge:["Богданов","РПСС","organizer"] }`. Mockup: `Богданов → КПСС/РПСС → ДПР/ПМЕ ...`. Implementation: native SVG graph. Risk: label as reconstruction.

**P2 — Section F.** Augment left flank explanation. Visual: left-flank ladder. Data: `{ party:"РПСС", pct2021:0.77, niche:"умеренно-левый" }`. Mockup: `КПРФ 18.93 > СРЗП 7.46 > Пенсионеры 2.45 > КПКР 1.27 > РПСС 0.77`. Implementation: native vertical ladder. Risk: avoid causal vote-loss math.

**P3 — Section A/G.** Replace rebrand list. Visual: rebrand/candidate timeline. Data: `{ date:"2021-03", event:"КПСС → РПСС" }`. Mockup: `КПСС → РПСС → ГД-2021 0.77 → снятие 2024`. Implementation: existing timeline. Risk: exact registry docs useful.

#### `partii/grazhdanskaya-platforma.html`

**P1 — Section F.** Replace “sleeping” prose. Visual: activity lifecycle. Data: `{ date:"2013", activity:80, event:"региональные успехи" }, { date:"2015", activity:20, event:"уход Прохорова" }`. Mockup: `активность: 2013 ████ → 2015 ██ → 2021 ▏`. Implementation: timeline + sparkline. Risk: activity score is interpretation.

**P2 — Hero/Section E.** Augment party result. Visual: dual metric card. Data: `{ listPct:0.15, smdSeats:1 }`. Mockup: `0.15% по списку | 1 одномандатник`. Implementation: CSS comparison card. Risk: do not imply faction status.

**P3 — Section D.** Replace one-mandate prose. Visual: mandate dependency map. Data: `{ node:"Шайхутдинов", edge:"мандат удерживает юрлицо в поле" }`. Mockup: `депутат → думский ресурс → партия-оболочка`. Implementation: native SVG. Risk: committee/faction status should be verified.

#### `sujety/mobilizatsiya.html`

**P1 — Section B.** Replace vote paragraph. Visual: XML-true faction stack. Data: `{ faction:"КПРФ", total:57, for:51, against:0, abstain:0, absent:6 }`. Mockup: `КПРФ [за 51][отс. 6]`. Implementation: native stacked bars plus table; can reuse vote-bar only with clear legend. Risk: label 103 as participating/voting, not all deputies.

**P2 — Section A.** Augment timeline. Visual: event-delta timeline. Data: `{ ts:"2022-09-20T13:20:18", event:"III чтение", delta:"0" }`. Mockup: `0ч голосование → +? СФ → +1 день указ → +4 дня подпись`. Implementation: extend timeline with delta column. Risk: remove unsupported “36 часов”.

**P3 — Section B.** Add below vote chart. Visual: absence roster accordion. Data: `{ faction:"НЛ", absent:["Арапов","..."] }`. Mockup: `<details>КПРФ: 6 отсутствовали</details>`. Implementation: generated from parsed XML snapshot. Risk: absence is not dissent.

#### `sujety/voennyy-byudzhet.html`

**P1 — Section A/C.** Replace expenditure comparison prose. Visual: budget allocation bars. Data: `{ article:"оборона", trln:13.5, share:32.5 }`. Mockup: `оборона █████████ 13.5; здравоохранение █ 1.86; образование █ 1.58`. Implementation: Chart.js horizontal bar with table fallback. Risk: reconcile ratio method.

**P2 — Section D.** Augment “cannot block” argument. Visual: majority ladder. Data: `{ er:325, kprf:57, ldpr:23, srzp:27, nl:15, threshold:226 }`. Mockup: `ЕР alone > 226; all opposition < 226`. Implementation: reuse ER ladder component. Risk: keep “functional emptiness” as interpretation.

**P3 — Section B.** Replace approximate voting prose. Visual: vote confidence panel. Data: `{ bill:"727320-8", faction:"КПРФ", stance:"abstain", confidence:"exact|approx" }`. Mockup: `2025 budget: НЛ/ЛДПР за; КПРФ/СРЗП возд.; confidence badge`. Implementation: native table. Risk: needs exact vote IDs.

#### `sujety/spoylery.html`

**P1 — Section A.** Replace double-candidate explanation. Visual: double-candidate matrix. Data: `{ election:"ГД-2021", district:"...", real:"...", spoiler:"...", mechanism:"surname" }`. Mockup: `округ | кандидат КПРФ | двойник | эффект`. Implementation: sortable native table, ~90 LOC. Risk: several rows need exact verification.

**P2 — Section B/D.** Augment taxonomy. Visual: spoiler taxonomy map. Data: `{ layer:"ономастический", examples:["двойники"], evidence:"green/yellow" }`. Mockup: `имена | идеология | техника`. Implementation: static CSS cards. Risk: “industry” remains analytical.

**P3 — Section C.** Replace Bogdanov prose. Visual: party genealogy timeline. Data: `{ party:"РПСС", start:2021, role:"спойлерный слой", result:0.77 }`. Mockup: `ДПР/ПМЕ/КПСС/РПСС as rails`. Implementation: lane timeline. Risk: avoid undocumented AP-control claim.

#### `sujety/munitsipalnyy-filtr.html`

**P1 — Section A.** Replace mechanics prose. Visual: signature calculator. Data: `{ region:"Москва", requiredPct:10, totalMunicipals:1500, oppositionMandates:120 }`. Mockup: `выберите регион → нужно N подписей в M районах → дефицит`. Implementation: vanilla form + recalculation. Risk: regional estimates need dated sources.

**P2 — Section B.** Augment vertical-control paragraph. Visual: municipal mandate range bars. Data: `{ group:"ЕР/административный блок", minPct:65, maxPct:80 }`. Mockup: `65% ━━━━━ 80%`. Implementation: Chart.js floating bars or CSS range bars. Risk: range is not a national exact aggregate.

**P3 — Section C.** Replace case prose. Visual: case swimlanes. Data: `{ case:"Ройзман", date:"2017", event:"фильтр", outcome:"не выдвинут" }`. Mockup: `Ройзман / Левченко / Москва lanes`. Implementation: native swimlane. Risk: “согласованные подписи” claims need confidence labels.

#### `sujety/tsifrovoy-kontrol.html`

**P1 — Sections A/B.** Replace two-law vote prose. Visual: paired vote stacks. Data: `{ law:"цифровой рубль", voteId:"123266", total:{for:385,against:0,abstain:1}, byFaction:{...} }`. Mockup: `ФЗ-340: 385/0/1; ФЗ-255: 331/5/11`. Implementation: Chart.js stacked bar or vote-bar table. Risk: the vote-bar token inversion is intentional but confusing; legend must be explicit.

**P2 — Section B/C.** Augment inagent register prose. Visual: inagent expansion timeline. Data: `{ date:"2024-12", count:1100, law:"ФЗ-414" }`. Mockup: `2022 baseline → 2024 рублевые спецсчета → 2026 ≥1100`. Implementation: Chart.js line with event markers. Risk: use dated Minjust snapshot.

**P3 — Section A.** Replace technical capabilities paragraph. Visual: digital-control stack. Data: `{ instrument:"цифровой рубль", author:"Аксаков", capability:"видимость транзакций", affected:"все пользователи" }`. Mockup: `CBDC → транзакции → заморозка/окрашивание; inagents → реестр → ограничения`. Implementation: CSS layered cards. Risk: technical claims need primary/CBR sources.

#### `sujety/vneparlamentskie.html`

**P1 — Sections B-D.** Replace liquidation prose. Visual: liquidation timeline upgrade. Data: `{ party:"Партия дела", date:"2024-11-27", formalGround:"иск Минюста", context:"после..." }`. Mockup: `ПД 11.2024 | ГИ 06.2025 | ПР 11.2025`. Implementation: enhanced `renderTimelineVert`. Risk: month-only dates should show uncertainty.

**P2 — Section E.** Augment comparative conclusion. Visual: four trajectories matrix. Data: `{ party:"Партия Роста", trajectory:"поглощение НЛ", status:"ликвидирована" }`. Mockup: `лобби → ЛДПР; кандидат → ликвидация; бизнес-либералы → НЛ`. Implementation: 2x2 grid. Risk: trajectory labels are 🔴 interpretation.

**P3 — Sections B-D.** Add evidence confidence cards. Data: `{ claim:"Титов — указ №879", evidenceFile:"...", verified:false }`. Mockup: `claim | local evidence | status: заменить файл`. Implementation: native `<details>` cards. Risk: do not publish until wrong decree files fixed.

### 4.2 New universal components

1. **`party-vote-matrix`** — compact heatmap for law × party/faction votes. API: `renderPartyVoteMatrix(root, {laws, party, axisMap})`. Complexity: M. Pages: all parliamentary party pages, digital/mobilization/budget sujets. Risks: mobile horizontal scroll and color legend.
2. **`funding-stack`** — stacked bars for budget/private/legal/person donations. API: `renderFundingStack(root, [{year,budgetPct,legalPct,physicalPct,otherPct}])`. Complexity: S/M. Pages: all party pages. Risks: incomplete donor categories.
3. **`majority-ladder`** — shows 226/300 thresholds and party/faction seats. API: `renderMajorityLadder(root, {seats, thresholds})`. Complexity: S. Pages: ER, budgets, mobilization. Risks: threshold explanations.
4. **`event-swimlane`** — multi-lane timelines for people/parties/cases. API: `renderEventSwimlane(root, {lanes, events})`. Complexity: M. Pages: Yabloko, KPRF, vneparlamentskie, municipal filter. Risks: dense labels on mobile.
5. **`relationship-network`** — small SVG relationship graph. API: `renderRelationshipNetwork(root, {nodes, edges, legend})`. Complexity: M/L. Pages: SRZP, Partiya Rosta, Partiya Dela, RPSS. Risks: graph can imply causality; use edge labels.
6. **`source-grade-chip`** — consistent 🟢/🟡/🟠/🔴 badges. API: `sourceChip(level, label, href)`. Complexity: S. Pages: all. Risks: editors must choose levels accurately.
7. **`threshold-meter`** — simple percent vs threshold bar. API: `renderThresholdMeter(root, {value, thresholds, unit})`. Complexity: S. Pages: Pensionery, GI signature rejection, elections context. Risks: threshold labels on small screens.
8. **`evidence-confidence-card`** — claim → source → confidence → caveat card. API: `renderEvidenceCards(root, [{claim, source, level, caveat}])`. Complexity: S. Pages: cross-cutting sujets and disputed claims. Risks: may feel defensive if overused.
9. **`mobile-story-step`** — IntersectionObserver reveal wrapper for scrollytelling. API: `initStorySteps(root, {activeClass:"is-active"})`. Complexity: S. Pages: all long dossiers. Risks: must respect `prefers-reduced-motion`.

### 4.3 Scrollytelling mockup — `partii/yabloko.html`

**Pattern.** Each mobile section becomes: compact section heading → one visual claim card → 1 short explanatory paragraph → evidence fold. The full prose remains available, but the reader first sees the argument.

1. **Hero.** Full-width title: «Яблоко» — структурное частичное исключение. Immediately below: exception triad with three cells: “не угрожает ЕР: 1,34%”, “не зависит от бюджета: 0%”, “антивоенная институциональная позиция: да”. One sentence: “Партия сохраняет легальность ровно потому, что не угрожает системе на бюллетене.”
2. **A. Происхождение.** Visual: mini timeline from 1993 bloc to 2002 registration to loss of Duma faction. Paragraph 1 explains continuity; paragraph 2 explains why history does not equal current electoral threat.
3. **B. Финансирование.** Visual: funding comparison meter: Yabloko 0% budget versus KPRF/LDPR/SRZP/NL high budget shares. Paragraph: no documented leader business/government-contract channel in open data; note that absence is “не зафиксировано”, not proof of nonexistence.
4. **C. Лидеры.** Visual: leader cards with status chips: Rybakov, Yavlinsky, Shlosberg, Vishnevsky. Pressure chips appear only where sourced: “иноагент”, “СИЗО”, “дело”. Paragraph: pressure is personal/regional, not liquidation of party.
5. **D. Связи с государством.** Visual: verification checklist with rows “госконтракты лидеров”, “бюджетное финансирование”, “исполнительные должности”, “встреча Явлинского с Путиным”. Values: “не зафиксировано”, “0%”, “нет”, “есть/содержание не верифицируется”. Paragraph keeps nuance.
6. **E. Голосование.** Visual: regional stance matrix: SPb, Karelia, MGD; columns “война”, “ДЭГ/выборы”, “бюджеты”. Paragraph explains that there is no Duma faction, so the page measures institutional statements and regional votes.
7. **F. Управляемая оппозиция.** Visual: “why legal?” balance card: low threat, useful pluralism signal, targeted pressure. Paragraph explicitly says this is interpretation, not a document proving coordination.
8. **G. Кризисы и война.** Visual: pressure ledger timeline, with separate lanes for statements, inagent labels, criminal cases, registration barriers. Paragraph notes chronology without collapsing every event into one cause.
9. **H. Зарубежные связи.** Visual: “checked / found / not found” matrix for foreign funding/foreign-agent labels/foreign contacts. Paragraph distinguishes foreign-agent status of individuals from foreign financing of the party.
10. **Conclusion.** A final decision card: “исключение по независимости и позиции; не исключение по электоральной угрозе.” CTA: documents fold.

Implementation sketch: add `story-step` wrappers around existing sections, use `IntersectionObserver` like `scroll-spy.js` to add `.is-active`, and CSS disable transforms under `prefers-reduced-motion`. No library required.

## 5. Quick-win punchlist

| # | File | Line | Issue | Fix | Time |
|---:|---|---:|---|---|---|
| 1 | `assets/css/layout.css` | 67 | `.lbl-full` and `.lbl-short` both render on mobile | Move compact-label rules from `tsenzura.css` into `layout.css` | 15m |
| 2 | `dokumenty.html` | 57 | `233 файлов` | Use plural `233 файла` or JS pluralization | 5m |
| 3 | `partii/novye-lyudi.html` | 147 | Blank financing chart card | Fill with data or remove card | 20m |
| 4 | `partii/ldpr.html` | 104 | `3,20%` called below `2,70%` | Reword: above historic minimum but still low | 5m |
| 5 | `partii/ldpr.html` | 74 | 23 mandates conflicts with README 21 | Clarify party seats vs faction including allies | 10m |
| 6 | `partii/ldpr.html` | 140 | 220 mln ₽ profit conflicts with summary table | Verify and use one number | 15m |
| 7 | `partii/kprf.html` | 422 | Zyuganov called mobilization coauthor | Remove or replace with documented coauthors | 10m |
| 8 | `partii/kprf.html` | 426 | Kharitonov “4-е место” | Change to second place | 5m |
| 9 | `sujety/mobilizatsiya.html` | 71 | “103 deputies” too broad | “103 участвовавших” or “123: 103 за, 20 отсутствовали” | 10m |
| 10 | `sujety/mobilizatsiya.html` | 76 | Weak “36 hours” chronology | Use “на следующий день” unless timestamp sourced | 10m |
| 11 | `partii/grazhdanskaya-initsiativa.html` | 71 | 208k/120+ lacks local exact source | Add exact source or soften | 20m |
| 12 | `research/.../decree-879...html` | 1 | Wrong Titov evidence content | Replace with correct decree copy or unlink | 30m |
| 13 | `research/.../decree-299...html` | 13 | Wrong Titov evidence content | Replace with correct decree copy or unlink | 30m |
| 14 | `partii/er.html` | 85-88 | TOC jumps A/B/C/E | Rename E to D or add D | 5m |
| 15 | `index.html` | 107-109 | Old `2 / 18` hero | Update to new law count/framing | 15m |
| 16 | `index.html` | 17 | Missing OG image | Add asset or point to existing image | 15m |
| 17 | `index.html` | 348 | ASCII quotes in canvas fallback | Use `«против»` | 5m |
| 18 | `partii/grazhdanskaya-platforma.html` | 247 | ASCII quotes | Use `«спящая»` | 5m |
| 19 | `partii/zelenye.html` | 253 | ASCII quotes | Use `«Яблока»` | 5m |
| 20 | `assets/js/lib/dokumenty-renderers.js` | 189 | Naive CSV parser | Reuse SheetJS CSV parsing or quoted-field parser | 30m |

## 6. Strategic recommendations

1. **Create a data-backed dossier layer.** For each party/sujet, keep a small `window.PAGE_DATA` object for hero stats, major events, vote rows, source levels, and visuals. This makes hero cards, charts, and source folds use the same facts.
2. **Treat exact source URLs as release blockers.** Generic roots are fine as navigation, but every numeric claim should have a direct document/article/source link or a local evidence file.
3. **Standardize evidence levels visually.** Add reusable source chips, then prohibit hardcoded 🟢 in renderers. This will prevent business press and synthesis notes from looking like primary documents.
4. **Make mobile the primary reading surface.** A 320px overflow test should be part of every phase. The long pages are for ordinary readers first; if mobile breaks, the core audience is lost.
5. **Prefer “visual first, prose second”.** Each section should open with one of: matrix, timeline, threshold bar, flow, network, or confidence card. Then 1–2 paragraphs explain the visual, with the full source fold after.
6. **Build a document preview safety model.** Large files, quoted CSV, external-resource HTML, and unknown encodings need predictable handling. Use file-size metadata from `dokumenty-tree.json` before fetching.

## 7. Methodology

- Sanity check passed: recent commits include `feat(dokumenty): clickable path-links` and `merge(dokumenty): phase 5.1 polish`; 14 party pages, 6 sujet pages, `dokumenty.html`, and a 36K document tree are present.
- Read context: `CLAUDE.md`, `docs/superpowers/specs/2026-05-05-compromat-pages-design.md`, Phase 1 plan, and relevant research dossiers.
- Parallel review: five subagents were launched. Four completed and reported on root/explorer, parliamentary parties, extra-parliamentary/spoiler parties, and sujet pages. One cross-cutting agent was closed after timeout because local automated checks already covered its scope.
- Automated checks run locally: duplicate IDs, local-link resolution, `rodina.html` search, data href validation, `data-page` validation, section/TOC matching, `target="_blank"` + `rel=noopener`, JS syntax checks, inline script parse checks, visual-density counts.
- Browser checks: served with `python3 -m http.server 8765`; Playwright smoke-loaded scoped pages at desktop and 320px, collected console/page errors and horizontal overflow. No initial console errors were observed; mobile overflow was confirmed.
- Sampling limits: I did not fully fact-check every sentence against every `A-H.md`; I spot-checked hero stats, decree/vote claims called out in the prompt, and high-salience numeric claims. The visual proposal catalogue is intentionally implementation-oriented rather than exhaustive copyediting.
