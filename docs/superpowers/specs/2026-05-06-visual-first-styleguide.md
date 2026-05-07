# Visual-First Styleguide (pilot novye-lyudi → tier-1 rollout)

**Status:** locked after 3 review rounds with the user; pilot НЛ approved.
**Reference page:** `partii/novye-lyudi.html` + `assets/js/data/party-novye-lyudi.js`.

---

## 1. Page-level layout

The pilot uses the **flat long-scroll format** of `index.html` / `vybory.html` / `tsenzura.html`, NOT the legacy partii `.party-sec` format. Critical knobs:

- `<main id="main" data-page="party" data-pilot="visual-first">` — the `data-pilot` attribute is the gate for the single full-bleed CSS rule. Keep it.
- `<section class="party-hero">` — hero with 4 plain stat tiles (no `.horizontal`, no button-stat, no scroll-hint, no inline JS toggle).
- `<div class="party-page-layout">` — full-bleed (max-width: none, padding: 0) under `data-pilot`. Holds the fixed-left TOC + content stream.
- `<aside class="party-toc">` — fixed-left at ≥1080px, ignored by content centring.
- Content sections: `<section id="X" data-toc-id="X">` (NOT `class="party-sec"`) → `<div class="wrap">` (base `.wrap` rule, max-width 1280, margin auto, 24px padding).

## 2. Section internal structure

```html
<section id="X" data-toc-id="X">
  <div class="wrap">
    <span class="section-label">A · Заголовок раздела</span>
    <h2 class="section-h2">Главный тезис секции.</h2>

    <p class="section-lead">Лид-абзац (2-3 предложения) с ключевым утверждением.</p>

    <div id="X-viz" class="viz-mount">
      <noscript><p>...JS-fallback с цифрами и ссылкой на развёрнутый текст ниже...</p></noscript>
    </div>
    <p class="viz-mount-cap">Подпись к визуализации.</p>

    <h3 class="section-h3">Первый подраздел</h3>
    <p class="section-lead">Прозы...</p>
    <p class="section-lead">Ещё прозы...</p>

    <h3 class="section-h3">Второй подраздел</h3>
    <p class="section-lead">Прозы...</p>

    <div class="src-list" aria-label="Источники раздела X">
      <div class="src-list-title">Источники раздела X</div>
      <a href="..." target="_blank" rel="noopener">Ссылка 1</a>
      <a href="..." target="_blank" rel="noopener">Ссылка 2</a>
    </div>
  </div>
</section>
```

**Class system (single source of truth):**

| Class | Purpose |
|---|---|
| `.section-label` | Маленький uppercase-метка над заголовком («A · Происхождение») |
| `.section-h2` | Главный заголовок секции (clamp 36-56px) |
| `.section-lead` | Прозовый абзац (18px, ink-soft) |
| `.section-h3` | Подзаголовок секции (22px, bold, 36px top-margin) |
| `.viz-mount` | Контейнер для inline JS-визуализации (имеет `<noscript>` fallback) |
| `.viz-mount-cap` | Подпись под viz (12px italic) |
| `.src-list` / `.src-list-title` | Плоский список ссылок в конце секции |
| `.src-link` | Inline-ссылки внутри прозы |

## 3. Information hierarchy per section

Каждая секция следует паттерну: **тезис → лид → визуал → подзаголовки с доказательствами → источники**.

- **Лид:** 2-3 предложения с ключевой претензией. Не вся проза — только тезис.
- **Visual mount inline в потоке прозы**, в логически обоснованном месте (обычно после лида).
- **Подразделы (h3):** разбивают плотную прозу на тематические куски (3-7 на секцию). ВЕСЬ исходный текст сохраняется, только перегруппирован.
- **Источники:** flat src-list в конце; категоризованные блоки (🟢/🟡/🔴) НЕ используются — это паттерн main-3-pages.

## 4. Viz components (existing library)

Все компоненты в `assets/js/components/`. Каждый exposed via `window.render*(rootEl, data)`.

| Component | Когда использовать | Data shape |
|---|---|---|
| `registration-window` | A-секция: партии в одном регистрационном окне | `{period, events: [{id, party, foundedDate, registeredDate, color, hotspotTitle, hotspotBody}]}` |
| `financing-trajectory` | B-секция: динамика бюджет% по годам | `{years, budgetPct, totalsMln, hotspots: {YEAR: {title, body}}}` |
| `leader-grid` | C-секция: карточки лидеров (с tier + bio dialog) | `[{name, tier, role, born?, tags?, duma_url?, bio?}]` |
| `trustee-context` | D-секция: stat-card с одной большой цифрой | `{headline, sub, source: {label, url}}` |
| `ownership-flow` | D-секция: 2-3 шаговая цепочка собственности | `{title?, steps: [{label, sub?, color?, hotspotTitle, hotspotBody}], arrowLabels[]}` |
| `vote-waffle` | E-секция: ≥10 голосований в виде вафли | `{summary: {za, against, abstain, partial}, votes: [{id, fz, date, voteId, outcome, hotspotBody}]}` |
| `relationship-network` | F-секция: граф институциональных связей | `{width: 1200, height: 540, nodes: [{id, label, sub?, x, y, color, hotspotTitle?, hotspotBody?}], edges: [{from, to, label?, kind?: 'dashed'}]}` |
| `swimlane` | G-секция: 2-track timeline (например, Дума vs Кампания) | `{period, lanes: [{id, label, color, events: [{date, label, sub?}]}], connection?}` |

**Хотите новую viz?** Сначала проверьте, можно ли решить существующей. Новые добавлять только если данные явно не лезут ни в одну из существующих форм.

## 5. Hotspot system (универсальная)

- Любой `.hs` элемент с `data-hotspot-title` + `data-hotspot-body` + `tabindex="0"` + `role="button"`.
- `hotspot.js` (in lib/) — singleton floating popover около клика. Right→left→below→above fallback.
- ESC / outside-click / × — закрывают.
- `data-hotspot-body` принимает HTML (доверенный авторский контент).

**Evidence pattern для hotspotBody:**
```html
<p><strong>ФЗ № X-ФЗ от DD.MM.YYYY</strong> — full law title.</p>
<p><strong>Голосование фракции:</strong> X «за» / Y «против» / Z «воздержались» / W «не голосовало».</p>
<p>Объяснение что закон делает + почему важен (1-2 sentences).</p>
<p><a href="..." target="_blank" rel="noopener">Источник →</a></p>
```

Hotspot — это маленькое полное доказательство. НЕ просто 1 строка.

## 6. Leader-grid spec

Карточки делятся на 2 tier:
- `tier: 'core'` — структурное ядро партии (1-2 человека). Большая карточка, accent-граница слева, 17px шрифт имени.
- `tier: 'secondary'` — остальные публичные фигуры. Компактная карточка.

Render: 2 grid-блока с заголовками «Ядро партии» / «Остальные публичные фигуры». `align-items: start` — карточки независимой высоты.

**Tags (semantic kinds):**
| `kind` | Что это | Цвет |
|---|---|---|
| `inst` | Институция (ОНФ, Faberlic, КГБ) | Золотой |
| `role` | Роль (одномандатник, актёр, экс-мэр) | Серый |
| `tie` | Политическая связь (доверенное лицо, соавтор закона) | Красный |
| `status` | Публичный статус (3,85% — 3-е место) | Синий |

**Bio:** через native `<dialog>` (не `<details>`!), открывается кнопкой `Подробнее →` (нейтральная pill, не красная).

## 7. Tag/source attribution rules

- Каждый факт должен быть проверяемым. Inline-ссылки `class="src-link"`.
- В конце каждой секции — `.src-list` с 3-10 первоисточниками.
- Hotspot bodies должны иметь источник в нижней `<p>`.
- Иерархия источников (если есть): первоисточник (документ) → деловая пресса → расследования → авторская интерпретация (research/compromat).

## 8. Что НЕ делать

- ❌ `class="party-sec"` (legacy partii format) — на pilot и tier-1 страницах
- ❌ `class="party-sec-text"` / `.party-sec-viz` / `.party-sec-tldr` / `.party-sec-detail` (old two-pane refactor)
- ❌ `class="sources-fold"` (categorized fold) — используется в legacy partii, на новых не надо
- ❌ Inline `<details>` для биографий лидеров — используем `<dialog>`
- ❌ `scroll-snap-type` / `min-height: 100vh` на секциях
- ❌ Hero stat-strip с button + stat-detail-92 + scroll-hint
- ❌ Hotspot panel в виде bottom-slide rectangle (`.hotspot-detail`) — используем `.hotspot-pop`
- ❌ Кратких выжимок вместо полного текста — текст разбиваем на h3, не выкидываем

## 9. Acceptance per migrated party

- [ ] `<main data-pilot="visual-first">` присутствует
- [ ] Hero: 4 plain `<div class="stat">` тайла (не `.horizontal`)
- [ ] Каждая секция: `<section id> > <div class="wrap"> > section-label/h2/lead/viz-mount/h3/lead/src-list`
- [ ] ВСЯ исходная проза сохранена (только перегруппирована под h3)
- [ ] Viz mounts inline в прозе с `class="viz-mount"` + `<noscript>` fallback + `class="viz-mount-cap"` подпись
- [ ] sources-fold → src-list (категоризованные блоки flat-нуты)
- [ ] data file: `assets/js/data/party-{slug}.js` — `window.{SLUG}_DATA = {...}` со всеми viz-секциями
- [ ] Лидеры с `tier: 'core' | 'secondary'` + `tags: [{label, kind}]`
- [ ] hotspotBody содержит evidence pattern (header + breakdown + explanation + source)
- [ ] Inline JS for stat-detail toggle ОТСУТСТВУЕТ
- [ ] `data-pilot="visual-first"` на `<main>`
- [ ] `<noscript>` placeholder в каждом `.viz-mount`
- [ ] Script includes: hotspot.js, Chart.js CDN, все нужные components, data file, presentation deck (если делаем)
- [ ] `node --check` clean на data file
- [ ] HTML загружается без ошибок (HTTP 200)

## 10. Dev/migration order

1. **Tier 1 done:** Новые люди ✅
2. **Tier 1 in flight:** КПРФ, ЛДПР, СРЗП (имеют research/compromat A-G)
3. **Tier 1 deferred:** Единая Россия (нет research dossier — нужно отдельно собирать из cross-cutting + index.html)
4. **Tier 2-3 later:** остальные 9 непарламентских партий

## 11. Files NOT to touch in per-party migration

Чтобы избежать конфликтов между параллельными миграциями:
- `assets/css/partii.css` — общий, не трогать
- `assets/css/components.css` / `layout.css` / `tokens.css` — общие
- `assets/js/components/*` — общие; добавлять только если уверены, что не существует
- `assets/js/lib/*` — общие
- Other `partii/*.html` — не моя партия
- Other `assets/js/data/party-*.js` — не моя партия

Можно изменять:
- Свой `partii/{slug}.html`
- Создавать `assets/js/data/party-{slug}.js`
- Создавать `assets/js/decks/party-{slug}.js` (presentation deck)
