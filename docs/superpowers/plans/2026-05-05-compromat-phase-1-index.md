# Compromat Phase 1 — index.html Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Превратить главную страницу `index.html` в хаб «Партии» по архитектуре, утверждённой в спеке `docs/superpowers/specs/2026-05-05-compromat-pages-design.md` (Фаза 1): новый hero с 4 жёсткими стат-крюками, карточки 14 партий по 3 категориям, обновлённая матрица голосований из API, секция «сквозные сюжеты», ссылка на документы и sticky-TOC слева на десктопе.

**Architecture:** Сохраняем существующую слоёную структуру проекта (`tokens → base → layout → components → home.css` для CSS, и `data/lib/components/charts/pages` для JS). Никакого билд-инструментария: vanilla HTML+CSS+JS, Chart.js через CDN. Все новые компоненты и данные добавляются параллельно существующим, не ломая текущий рендер.

**Tech Stack:** HTML5, CSS3 с CSS-переменными из `tokens.css`, vanilla JS, Chart.js 4.4.1 (CDN), IntersectionObserver API для scroll-spy.

---

## File Structure

### Создаются

| Путь | Ответственность |
|---|---|
| `assets/js/data/cross-cutting.js` | Глобальная константа `CROSS_CUTTING` — массив 6 объектов-карточек сюжетов (label, title, blurb, href). |
| `assets/js/data/hero-stats.js` | Глобальная константа `HERO_STATS` — массив 4 объектов hero-stat (n, label, source). |
| `assets/js/data/extended-parties.js` | Глобальная константа `EXTENDED_PARTIES` — массив 14 объектов: id, slug, name, category, leader, mandates, hookBadge, supportPct, budgetPct, stripeColor, href. |
| `assets/js/components/cross-cutting-cards.js` | Функция `renderCrossCuttingCards()` — рендерит карточки в `#cross-cutting`. |
| `assets/js/components/extended-parties.js` | Функция `renderExtendedParties()` — рендерит сетку 14 партий с заголовками категорий в `#partyGrid14`. |
| `assets/js/lib/scroll-spy.js` | Утилита `initScrollSpy(tocSelector, sectionSelector)` — IntersectionObserver, подсветка активного пункта TOC, обновление прогресс-бара. |
| `assets/css/home-compromat.css` | Стили для новых секций (hero-stats v2, cat-grid, cross-cutting-cards, sticky-toc, docs-panel). |

### Модифицируются

| Путь | Что меняется | Якорь |
|---|---|---|
| `index.html` | Hero stats заменяются (4 новых крюка). Добавляется sticky-TOC слева. Добавляется секция cross-cutting cards. Добавляется секция docs-panel. Section `#parties` расширяется. Скрипты подключают новые модули. | строки 84–144 (hero); 237 (parties); + новые блоки |
| `assets/css/home.css` | Корректировки для вмещения sticky-TOC (контейнер становится grid). | блок `.hero` и общие |
| `assets/js/data/laws.js` | Числа голосований заменяются на корректные из `research/compromat/05-evidence/duma-api/votes-summary.csv`. | по записям с известными несоответствиями |
| `assets/js/pages/home.js` | Добавляются вызовы новых рендереров и `initScrollSpy`. | `window.initHome` |

### Не трогаются (вне Phase 1)

- `vybory.html`, `tsenzura.html` и связанные с ними assets
- `assets/js/data/parties.js` (5-партийная — оставляем для совместимости с существующим `renderPartyCards`)
- `assets/css/tokens.css`, `base.css`, `layout.css`, `components.css`

---

## Источники данных для заполнения

| Откуда | Что брать | Куда положить |
|---|---|---|
| `research/compromat/05-evidence/duma-api/votes-summary.csv` | Уточнённые числа `за/против/возд./отс.` по 28 голосованиям | `assets/js/data/laws.js` (правки) |
| `research/compromat/02-cross-cutting/09-betrayal-cases.md` (раздел «Hero-блок: 4 рекомендации») | 4 hero-стата с источниками и ссылками | `assets/js/data/hero-stats.js` |
| `research/compromat/04-summary-tables/final-comparison-table.md` + `01-parties/<slug>/README.md` | Метаданные 14 партий: лидер, мандаты, % поддержки, % бюджета, главный hookBadge | `assets/js/data/extended-parties.js` |
| Спека `docs/superpowers/specs/2026-05-05-compromat-pages-design.md` §2 (Карта сайта) | 6 базовых сюжетов | `assets/js/data/cross-cutting.js` |

---

## Tasks

### Task 1: Hero — заменить 4 стат-крюка на новые

**Files:**
- Create: `assets/js/data/hero-stats.js`
- Modify: `index.html:104–137` (блок `.hero-stats`)

- [ ] **Step 1: Создать данные**

Записать в `assets/js/data/hero-stats.js`:

```js
// Hero stat hooks for index.html — replaces "2/18" / "100%" / "6%" / "407/450"
// after research found stronger compromat-relevant numbers.
// Source: research/compromat/02-cross-cutting/09-betrayal-cases.md §«Hero-блок».
window.HERO_STATS = [
  {
    n: '300',
    nUnit: 'тыс.',
    alert: true,
    label: 'мужчин призваны за 36 часов после <strong>мобилизации 20.09.2022</strong>. Все четыре «оппозиционные» фракции — «за», <strong>ноль голосов против</strong> (КПРФ 51/0, ЛДПР 18/0, СРЗП 21/0, НЛ 13/0).',
    source: { label: 'vote/119076 (api.duma.gov.ru)', href: 'research/compromat/05-evidence/duma-api/votes/mobilizatsiya.xml' }
  },
  {
    n: '32,5',
    nUnit: '%',
    alert: true,
    label: 'бюджета‑2025 — на оборону. <strong>13,5 трлн ₽</strong> против 1,86 трлн на здравоохранение и 1,58 трлн на образование. ЛДПР и НЛ — «за»; КПРФ и СРЗП воздержались, но <strong>не заблокировали</strong> военные статьи.',
    source: { label: 'ФЗ‑419 от 30.11.2024', href: 'research/compromat/02-cross-cutting/09-betrayal-cases.md' }
  },
  {
    n: '385',
    nUnit: '/0/1',
    alert: false,
    label: '<strong>Цифровой рубль ФЗ‑340</strong> — даёт ЦБ видимость каждой транзакции каждого гражданина. Автор — <strong>А.Г. Аксаков (СРЗП)</strong>, председатель Комитета ГД по финрынку. Все четыре «оппозиции» — «за».',
    source: { label: 'vote/124183 + bill 270838-8', href: 'research/compromat/05-evidence/duma-api/votes/tsifrovoy-rubl-1.xml' }
  },
  {
    n: '700',
    nUnit: '+',
    alert: true,
    label: 'уголовных дел по <strong>ст. 207.3 УК «фейки об армии»</strong> к 2025 г. (до 15 лет колонии). Соавторы закона — <strong>Г.А. Зюганов (КПРФ)</strong> и <strong>С.М. Миронов (СРЗП)</strong>, лидеры самых крупных «оппозиционных» фракций.',
    source: { label: 'bill 464757-7 (sozd.duma.gov.ru)', href: 'research/compromat/05-evidence/sozd-bills/464757-7.html' }
  }
];
```

- [ ] **Step 2: Заменить блок hero-stats в index.html**

В `index.html` найти блок `<div class="hero-stats">` (около строки 104) и заменить четыре `.stat` div'а на единый container, который будет наполняться JS:

```html
<div class="hero-stats" id="heroStats" aria-label="Ключевые цифры исследования"></div>
```

Старые 4 `.stat` блока удалить.

- [ ] **Step 3: Создать рендер для hero-stats**

В `assets/js/components/hero-stats.js` (новый файл):

```js
// Renders the 4 hero stat hooks from window.HERO_STATS into #heroStats.
window.renderHeroStats = function renderHeroStats() {
  const root = document.getElementById('heroStats');
  if (!root || !window.HERO_STATS) return;
  root.innerHTML = window.HERO_STATS.map(s => `
    <div class="stat">
      <div class="stat-num${s.alert ? ' alert' : ''}">${s.n}<small>${s.nUnit}</small></div>
      <div class="stat-label">${s.label}</div>
      <div class="stat-src">🟢 <a href="${s.source.href}" target="_blank" rel="noopener">${s.source.label}</a></div>
    </div>
  `).join('');
};
```

- [ ] **Step 4: Подключить скрипты в index.html**

В блоке `<script src=...>` (строки 405+) добавить после `parties.js`:

```html
<script src="assets/js/data/hero-stats.js"></script>
```

После `party-modal.js` (строка 440):

```html
<script src="assets/js/components/hero-stats.js"></script>
```

- [ ] **Step 5: Вызвать renderHeroStats в home.js**

В `assets/js/pages/home.js` в `window.initHome` добавить (как первый пункт после applyChartDefaults):

```js
if (typeof renderHeroStats === 'function') renderHeroStats();
```

- [ ] **Step 6: Дополнить CSS**

В `assets/css/home.css` добавить стиль источника под каждым стат-блоком:

```css
.stat-src { font-size: 11px; color: var(--ink-muted); margin-top: 8px; }
.stat-src a { color: var(--accent); text-decoration: none; }
.stat-src a:hover { text-decoration: underline; }
```

- [ ] **Step 7: Проверить визуально**

Запустить `python3 -m http.server 8765`, открыть `http://localhost:8765/`, убедиться:
- 4 новых стат-крюка отображаются
- Первый, второй и четвёртый — красные (`stat-num alert`)
- Третий (385/0/1) — чёрный (без alert)
- Под каждым — ссылка с зелёным маркером 🟢

- [ ] **Step 8: Commit**

```bash
git add assets/js/data/hero-stats.js assets/js/components/hero-stats.js assets/js/pages/home.js assets/css/home.css index.html
git commit -m "feat(home): replace hero stats with 4 strong betrayal-case hooks"
```

---

### Task 2: Расширенные данные партий — 14 партий с категориями

**Files:**
- Create: `assets/js/data/extended-parties.js`

- [ ] **Step 1: Создать данные**

Записать в `assets/js/data/extended-parties.js`:

```js
// Extended party metadata for the 14-party hub on index.html.
// Includes parliamentary, extra-parliamentary, and spoiler categories.
// Source for figures: research/compromat/04-summary-tables/final-comparison-table.md.
window.EXTENDED_PARTIES = [
  // Parliamentary
  { id: 'er', slug: 'er', category: 'parliamentary', name: 'Единая Россия', leader: 'Медведев', mandates: 325,
    supportPct: 100, budgetPct: 39, income2025: '8,8 млрд ₽', stripeColor: 'var(--party-er)',
    hookBadge: 'партия власти', href: 'partii/er.html' },
  { id: 'kprf', slug: 'kprf', category: 'parliamentary', name: 'КПРФ', leader: 'Зюганов', mandates: 57,
    supportPct: 94, budgetPct: 84, income2025: '1,8 млрд ₽', stripeColor: 'var(--party-kprf)',
    hookBadge: 'Зюганов — соавтор ФЗ-32 и ФЗ-386', href: 'partii/kprf.html' },
  { id: 'ldpr', slug: 'ldpr', category: 'parliamentary', name: 'ЛДПР', leader: 'Слуцкий', mandates: 23,
    supportPct: 98, budgetPct: 89, income2025: '767 млн ₽', stripeColor: 'var(--party-ldpr)',
    hookBadge: 'Луговой — соавтор ФЗ-255 (иноагенты)', href: 'partii/ldpr.html' },
  { id: 'srzp', slug: 'srzp', category: 'parliamentary', name: 'СРЗП', leader: 'Миронов', mandates: 27,
    supportPct: 98, budgetPct: 76, income2025: '726 млн ₽', stripeColor: 'var(--party-sr)',
    hookBadge: 'Аксаков — автор ФЗ-340 (цифровой рубль)', href: 'partii/srzp.html' },
  { id: 'nl', slug: 'novye-lyudi', category: 'parliamentary', name: 'Новые люди', leader: 'Нечаев', mandates: 15,
    supportPct: 92, budgetPct: 93, income2025: '719 млн ₽', stripeColor: 'var(--party-nl)',
    hookBadge: 'Даванков — соавтор моб. поправок 09.2022', href: 'partii/novye-lyudi.html' },

  // Extra-parliamentary
  { id: 'yabloko', slug: 'yabloko', category: 'extra-parliamentary', name: 'Яблоко', leader: 'Рыбаков / Явлинский',
    mandates: null, supportPct: null, budgetPct: 0, income2025: '189 млн ₽', stripeColor: '#777',
    hookBadge: '11+ членов в реестре иноагентов', href: 'partii/yabloko.html' },
  { id: 'partiya-rosta', slug: 'partiya-rosta', category: 'extra-parliamentary', name: 'Партия Роста', leader: 'Титов',
    mandates: null, supportPct: null, budgetPct: 0, income2025: '—', stripeColor: 'var(--ink-muted)',
    hookBadge: 'ликвидирована ВС 20.11.2025', href: 'partii/partiya-rosta.html' },
  { id: 'gi', slug: 'grazhdanskaya-initsiativa', category: 'extra-parliamentary', name: 'Гражданская инициатива',
    leader: 'А. Нечаев', mandates: null, supportPct: null, budgetPct: 0, income2025: '—',
    stripeColor: 'var(--ink-muted)', hookBadge: 'ликвидирована ВС 17.06.2025', href: 'partii/grazhdanskaya-initsiativa.html' },
  { id: 'partiya-dela', slug: 'partiya-dela', category: 'extra-parliamentary', name: 'Партия дела', leader: 'Бабкин',
    mandates: null, supportPct: null, budgetPct: 0, income2025: '—', stripeColor: 'var(--ink-muted)',
    hookBadge: 'ликвидирована ВС 27.11.2024', href: 'partii/partiya-dela.html' },

  // Spoilers
  { id: 'kr', slug: 'kommunisty-rossii', category: 'spoiler', name: 'Коммунисты России',
    leader: 'Сурайкин (до 2022)', mandates: null, supportPct: null, budgetPct: 0, income2025: '5,6 млн ₽',
    stripeColor: '#999', hookBadge: 'спойлер КПРФ — двойники в 7/15 округах Москвы', href: 'partii/kommunisty-rossii.html' },
  { id: 'rppss', slug: 'pensionery', category: 'spoiler', name: 'Партия пенсионеров',
    leader: '— нишевая', mandates: null, supportPct: null, budgetPct: 0, income2025: '16,7 млн ₽',
    stripeColor: '#999', hookBadge: '2,45% на ГД-2021 (ниже 3%-ного барьера)', href: 'partii/pensionery.html' },
  { id: 'green-alt', slug: 'zelenye', category: 'spoiler', name: 'Зелёная альтернатива',
    leader: '— проектная', mandates: null, supportPct: null, budgetPct: 0, income2025: '—',
    stripeColor: '#999', hookBadge: 'регистрация Минюст 07.04.2020 в одну неделю с НЛ', href: 'partii/zelenye.html' },
  { id: 'rpss', slug: 'rpss', category: 'spoiler', name: 'РПСС', leader: 'Богданов', mandates: null,
    supportPct: null, budgetPct: 0, income2025: '5 млн ₽', stripeColor: '#999',
    hookBadge: 'бывшая КПСС — «лаборатория Богданова»', href: 'partii/rpss.html' },
  { id: 'gp', slug: 'grazhdanskaya-platforma', category: 'spoiler', name: 'Гражданская платформа',
    leader: 'Шайхутдинов', mandates: null, supportPct: null, budgetPct: 0, income2025: '—',
    stripeColor: '#999', hookBadge: '«спящая» партия — 0,15% на ГД-2021', href: 'partii/grazhdanskaya-platforma.html' }
];

window.EXTENDED_PARTY_CATEGORIES = [
  { id: 'parliamentary', title: 'Парламентские', meta: '5 фракций · 100% мандатов VIII Думы (450/450)' },
  { id: 'extra-parliamentary', title: 'Внепарламентские', meta: '3 ликвидированы ВС в 2024–2025 · 1 удерживается под давлением' },
  { id: 'spoiler', title: 'Спойлеры и проекты', meta: '5 партий · отъём голосов у конкурентов' }
];
```

- [ ] **Step 2: Подключить в index.html**

В блок `<script src="assets/js/data/...">` (после `parties.js`):

```html
<script src="assets/js/data/extended-parties.js"></script>
```

- [ ] **Step 3: Commit**

```bash
git add assets/js/data/extended-parties.js index.html
git commit -m "data(home): add EXTENDED_PARTIES for 14-party hub categories"
```

---

### Task 3: Компонент карточек партий по категориям

**Files:**
- Create: `assets/js/components/extended-parties.js`
- Modify: `index.html` (добавить новую секцию ниже существующей #parties)

- [ ] **Step 1: Создать компонент**

Записать в `assets/js/components/extended-parties.js`:

```js
// Renders 14-party grid grouped by category into #extendedParties.
window.renderExtendedParties = function renderExtendedParties() {
  const root = document.getElementById('extendedParties');
  if (!root || !window.EXTENDED_PARTIES || !window.EXTENDED_PARTY_CATEGORIES) return;

  const html = window.EXTENDED_PARTY_CATEGORIES.map(cat => {
    const partiesInCat = window.EXTENDED_PARTIES.filter(p => p.category === cat.id);
    const cards = partiesInCat.map(p => `
      <a class="ep-card" href="${p.href}" style="--stripe:${p.stripeColor}">
        <h4 class="ep-name">${p.name}</h4>
        <div class="ep-leader">${p.leader}${p.mandates ? ` · ${p.mandates} мандат${p.mandates === 1 ? '' : 'ов'}` : ''}</div>
        <div class="ep-metric">
          ${p.supportPct !== null ? `<span class="ep-num">${p.supportPct}%</span> поддержки<br>` : ''}
          <span class="ep-num">${p.budgetPct}%</span> бюджет · <span class="ep-num">${p.income2025}</span>
        </div>
        ${p.hookBadge ? `<span class="ep-badge">${p.hookBadge}</span>` : ''}
      </a>
    `).join('');
    return `
      <div class="ep-cat-h">
        <h3>${cat.title}</h3>
        <div class="ep-cat-meta">${cat.meta}</div>
      </div>
      <div class="ep-cat-grid">${cards}</div>
    `;
  }).join('');

  root.innerHTML = html;
};
```

- [ ] **Step 2: Добавить markup секции в index.html**

Сразу после существующей секции `#parties` (около строки 246) вставить:

```html
<!-- 14 PARTIES BY CATEGORY -->
<section id="parties-extended">
  <div class="wrap">
    <span class="section-label">Партии — все 14</span>
    <h2 style="font-size: clamp(36px, 5vw, 56px); letter-spacing: -0.03em; max-width: 800px; line-height: 1; margin-bottom: 16px;">14 партий, одна система.</h2>
    <p style="font-size: 18px; color: var(--ink-soft); max-width: 760px; margin-bottom: 28px;">Карточки разбиты по категориям: парламентские, внепарламентские, спойлеры. Каждая ведёт на отдельную страницу с полным досье.</p>
    <div id="extendedParties"></div>
  </div>
</section>
```

- [ ] **Step 3: Подключить компонент**

В `index.html` блок `<script src="...components/...">` (около строки 440), после `party-cards.js`:

```html
<script src="assets/js/components/extended-parties.js"></script>
```

В `assets/js/pages/home.js` внутри `window.initHome` добавить:

```js
if (typeof renderExtendedParties === 'function') renderExtendedParties();
```

- [ ] **Step 4: CSS — категориальная сетка**

Создать `assets/css/home-compromat.css` с базовыми стилями секции:

```css
/* === 14-party hub by category === */
#parties-extended { padding: 60px 0; border-top: 1px solid var(--line); }

.ep-cat-h {
  display: flex; align-items: flex-end; justify-content: space-between;
  gap: 20px; margin: 36px 0 18px; padding-bottom: 10px;
  border-bottom: 1px solid var(--line);
}
.ep-cat-h:first-child { margin-top: 0; }
.ep-cat-h h3 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; }
.ep-cat-meta { font-size: 13px; color: var(--ink-muted); }

.ep-cat-grid {
  display: grid; gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  margin-bottom: 36px;
}

.ep-card {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 16px 18px;
  text-decoration: none;
  color: inherit;
  display: block;
  position: relative;
  overflow: hidden;
  transition: transform .15s, border-color .15s, box-shadow .15s;
}
.ep-card::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0;
  width: 4px; background: var(--stripe, var(--ink));
}
.ep-card:hover { transform: translateY(-2px); border-color: var(--ink-soft); box-shadow: 0 4px 16px rgba(0,0,0,0.05); }
.ep-card .ep-name { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.01em; }
.ep-card .ep-leader { font-size: 12px; color: var(--ink-muted); margin-top: 4px; }
.ep-card .ep-metric { margin-top: 14px; font-size: 13px; line-height: 1.55; color: var(--ink-soft); }
.ep-card .ep-num { font-weight: 800; color: var(--ink); font-family: 'JetBrains Mono', monospace; }
.ep-card .ep-badge {
  display: inline-block; font-size: 10px; padding: 2px 7px;
  border-radius: 3px; background: var(--gold); color: #fff;
  margin-top: 10px; letter-spacing: 0.02em; font-weight: 600;
}

@media (max-width: 600px) {
  .ep-cat-grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 5: Подключить новую CSS**

В `index.html` в блоке `<link rel="stylesheet">` (около верха head) после `home.css`:

```html
<link rel="stylesheet" href="assets/css/home-compromat.css">
```

- [ ] **Step 6: Проверить визуально**

Открыть `http://localhost:8765/`, прокрутить до новой секции. Убедиться:
- Появляются 3 категории с заголовками
- В парламентских — 5 карточек, в внепарламентских — 4, в спойлерах — 5
- Цветные полосы слева у карточек
- Hover-эффект работает

- [ ] **Step 7: Commit**

```bash
git add assets/js/components/extended-parties.js assets/css/home-compromat.css assets/js/pages/home.js index.html
git commit -m "feat(home): add 14-party hub grouped by 3 categories"
```

---

### Task 4: Сквозные сюжеты — данные и компонент

**Files:**
- Create: `assets/js/data/cross-cutting.js`
- Create: `assets/js/components/cross-cutting-cards.js`
- Modify: `index.html` (новая секция)
- Modify: `assets/css/home-compromat.css` (стили)
- Modify: `assets/js/pages/home.js` (вызов рендера)

- [ ] **Step 1: Создать данные**

В `assets/js/data/cross-cutting.js`:

```js
// Cross-cutting feature plots displayed on index.html as cards.
// Each leads to its own /sujety/<slug>.html page (Phase 4 in spec).
window.CROSS_CUTTING = [
  {
    label: 'война и общество',
    title: 'Кто проголосовал за мобилизацию',
    blurb: '4 «оппозиционные» фракции в полном составе «за», ноль голосов против. Даванков (НЛ) лично — соавтор поправок II чтения.',
    href: 'sujety/mobilizatsiya.html'
  },
  {
    label: 'бюджет',
    title: 'Военный бюджет 2025',
    blurb: '32,5% казны на оборону против 4,5% на здоровье и 3,8% на образование. Никакая «оппозиция» не блокирует.',
    href: 'sujety/voennyy-byudzhet.html'
  },
  {
    label: 'спойлерство',
    title: 'Индустрия двойников',
    blurb: 'Кейс Вишневского, «лаборатория Богданова», именные тёзки в 7 округах Москвы.',
    href: 'sujety/spoylery.html'
  },
  {
    label: 'муниципальный фильтр',
    title: 'Почему не побеждает оппозиция',
    blurb: 'Кейсы Левченко, Ройзмана, Грудинина, Бондаренко. Архитектура «выборов без выбора».',
    href: 'sujety/munitsipalnyy-filtr.html'
  },
  {
    label: 'цифровой контроль',
    title: 'Цифровой рубль и иноагенты',
    blurb: 'Кто пишет законы о финансовой и цензурной слежке. Аксаков (СРЗП), Луговой (ЛДПР).',
    href: 'sujety/tsifrovoy-kontrol.html'
  },
  {
    label: 'внепарламентские',
    title: 'Три ликвидации за 12 месяцев',
    blurb: 'Партия дела, Гражданская инициатива, Партия Роста — все ликвидированы Верховным Судом.',
    href: 'sujety/vneparlamentskie.html'
  }
];
```

- [ ] **Step 2: Создать рендер**

В `assets/js/components/cross-cutting-cards.js`:

```js
// Renders cross-cutting plot cards from window.CROSS_CUTTING into #crossCuttingCards.
window.renderCrossCuttingCards = function renderCrossCuttingCards() {
  const root = document.getElementById('crossCuttingCards');
  if (!root || !window.CROSS_CUTTING) return;
  root.innerHTML = window.CROSS_CUTTING.map(c => `
    <a class="cc-card" href="${c.href}">
      <div class="cc-label">${c.label}</div>
      <h4 class="cc-title">${c.title}</h4>
      <p class="cc-blurb">${c.blurb}</p>
      <span class="cc-read">Читать →</span>
    </a>
  `).join('');
};
```

- [ ] **Step 3: Markup секции в index.html**

Сразу после новой секции `#parties-extended` вставить:

```html
<!-- CROSS-CUTTING PLOTS -->
<section id="cross-cutting">
  <div class="wrap">
    <span class="section-label">Сквозные сюжеты</span>
    <h2 style="font-size: clamp(36px, 5vw, 56px); letter-spacing: -0.03em; max-width: 800px; line-height: 1; margin-bottom: 16px;">Шесть феноменов системы.</h2>
    <p style="font-size: 18px; color: var(--ink-soft); max-width: 720px; margin-bottom: 28px;">Не отдельные партии — закономерности. Каждый сюжет — отдельная глубокая статья со ссылками на документы.</p>
    <div id="crossCuttingCards"></div>
  </div>
</section>
```

- [ ] **Step 4: Подключить скрипты**

В `index.html`:

```html
<script src="assets/js/data/cross-cutting.js"></script>
```

```html
<script src="assets/js/components/cross-cutting-cards.js"></script>
```

В `home.js`:

```js
if (typeof renderCrossCuttingCards === 'function') renderCrossCuttingCards();
```

- [ ] **Step 5: CSS — карточки сюжетов**

В `assets/css/home-compromat.css` добавить:

```css
/* === Cross-cutting plot cards === */
#cross-cutting { padding: 60px 0; border-top: 1px solid var(--line); }

#crossCuttingCards {
  display: grid; gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.cc-card {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 18px 20px;
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform .15s, border-color .15s, box-shadow .15s;
}
.cc-card:hover { transform: translateY(-2px); border-color: var(--ink-soft); box-shadow: 0 4px 16px rgba(0,0,0,0.05); }
.cc-card .cc-label {
  font-size: 11px; color: var(--accent);
  text-transform: uppercase; letter-spacing: 0.06em;
  font-weight: 700; margin-bottom: 6px;
}
.cc-card .cc-title { margin: 0 0 8px; font-size: 18px; font-weight: 800; letter-spacing: -0.01em; }
.cc-card .cc-blurb { margin: 0 0 12px; font-size: 13px; line-height: 1.55; color: var(--ink-soft); }
.cc-card .cc-read { font-size: 12px; color: var(--accent); font-weight: 600; }

@media (max-width: 600px) {
  #crossCuttingCards { grid-template-columns: 1fr; }
}
```

- [ ] **Step 6: Визуальная проверка**

Открыть `http://localhost:8765/`, прокрутить ниже партий. Убедиться:
- Видна секция «Шесть феноменов системы»
- 6 карточек в сетке
- Hover работает
- Клики ведут на `sujety/<slug>.html` (404 пока ОК — эти страницы будут позже)

- [ ] **Step 7: Commit**

```bash
git add assets/js/data/cross-cutting.js assets/js/components/cross-cutting-cards.js assets/js/pages/home.js assets/css/home-compromat.css index.html
git commit -m "feat(home): add 6 cross-cutting plot cards section"
```

---

### Task 5: Документ-панель — навигационная ссылка

**Files:**
- Modify: `index.html` (новая секция)
- Modify: `assets/css/home-compromat.css` (стили)

Цель — простая навигационная панель, ведущая на `/dokumenty.html` (саму страницу делаем позже в Фазе 5). На главной только тизер.

- [ ] **Step 1: Markup секции в index.html**

После секции `#cross-cutting` вставить:

```html
<!-- DOCUMENTS PANEL -->
<section id="docs-panel">
  <div class="wrap">
    <div class="dp-card">
      <div class="dp-meta">
        <span class="section-label" style="color:rgba(255,255,255,0.55)">Документы</span>
      </div>
      <h3>233 файла. 190 МБ. Всё проверяемо.</h3>
      <p>
        Указы Президента, карточки <code>sozd.duma.gov.ru</code>, поимённые голосования с <code>api.duma.gov.ru</code>,
        OFAC SDN, UK Sanctions, Litvinenko Inquiry, тексты ФЗ, декларации, реестр иноагентов (1191 запись),
        госконтракты. Скачаны на этот сайт — без необходимости заходить на российские госсайты.
      </p>
      <a href="dokumenty.html" class="dp-cta">→ Открыть эксплорер документов</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: CSS**

В `assets/css/home-compromat.css` добавить:

```css
/* === Documents panel teaser === */
#docs-panel { padding: 60px 0 80px; }

.dp-card {
  background: var(--ink);
  color: var(--bg-card);
  border-radius: 14px;
  padding: 36px 40px;
}
.dp-meta { margin-bottom: 12px; }
.dp-card h3 {
  margin: 0 0 14px;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--bg-card);
}
.dp-card p {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255,255,255,0.78);
  max-width: 760px;
  margin: 0 0 22px;
}
.dp-card code {
  background: rgba(255,255,255,0.12);
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 0.85em;
  color: rgba(255,255,255,0.92);
}
.dp-cta {
  display: inline-block;
  background: var(--accent);
  color: #fff;
  text-decoration: none;
  padding: 12px 22px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  transition: background .15s;
}
.dp-cta:hover { background: var(--accent-soft); }

@media (max-width: 600px) {
  .dp-card { padding: 24px 22px; }
}
```

- [ ] **Step 3: Визуальная проверка**

Прокрутить главную до конца. Убедиться:
- Тёмная карточка с заголовком «233 файла. 190 МБ. Всё проверяемо.»
- Красная кнопка-ссылка
- Клик ведёт на `dokumenty.html` (404 пока ОК — будет в Фазе 5)

- [ ] **Step 4: Commit**

```bash
git add assets/css/home-compromat.css index.html
git commit -m "feat(home): add documents teaser panel linking to /dokumenty.html"
```

---

### Task 6: Sticky-TOC — утилита scroll-spy

**Files:**
- Create: `assets/js/lib/scroll-spy.js`

- [ ] **Step 1: Реализовать утилиту**

В `assets/js/lib/scroll-spy.js`:

```js
// Sticky table-of-contents scroll-spy.
// Highlights the active section in a TOC nav as the user scrolls,
// and updates a progress bar.
//
// Usage: initScrollSpy({
//   tocSelector: '#mainTOC a[data-target]',
//   sectionSelector: 'section[data-toc-id]',
//   progressBarSelector: '#mainTOCProgress'
// });
window.initScrollSpy = function initScrollSpy(opts) {
  const tocLinks = document.querySelectorAll(opts.tocSelector);
  const sections = document.querySelectorAll(opts.sectionSelector);
  const progressBar = opts.progressBarSelector ? document.querySelector(opts.progressBarSelector) : null;

  if (!tocLinks.length || !sections.length) return;

  // Map section id → toc link
  const linkBySectionId = {};
  tocLinks.forEach(link => {
    const target = link.getAttribute('data-target');
    if (target) linkBySectionId[target] = link;
  });

  // Smooth scroll on click
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('data-target');
      const section = document.querySelector(`[data-toc-id="${target}"]`);
      if (section) {
        e.preventDefault();
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // IntersectionObserver — top 20% of viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('data-toc-id');
        // Clear current
        tocLinks.forEach(l => l.classList.remove('toc-cur'));
        // Mark new
        if (linkBySectionId[id]) linkBySectionId[id].classList.add('toc-cur');
      }
    });
  }, { rootMargin: '-20% 0px -75% 0px' });

  sections.forEach(s => observer.observe(s));

  // Progress bar
  if (progressBar) {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      progressBar.style.width = pct + '%';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
  }
};
```

- [ ] **Step 2: Подключить в index.html**

В блок `<script src="assets/js/lib/...">` (около строки 421) добавить:

```html
<script src="assets/js/lib/scroll-spy.js"></script>
```

- [ ] **Step 3: Commit (без UI пока, чисто библиотека)**

```bash
git add assets/js/lib/scroll-spy.js index.html
git commit -m "feat(lib): add scroll-spy utility for sticky TOC"
```

---

### Task 7: Sticky-TOC — markup и стили + scroll-spy на index.html

**Files:**
- Modify: `index.html` (добавить TOC + data-toc-id на 5 секций)
- Modify: `assets/css/home-compromat.css` (стили sticky-TOC)
- Modify: `assets/js/pages/home.js` (вызов initScrollSpy)

- [ ] **Step 1: Добавить data-toc-id к 5 ключевым секциям**

В `index.html` модифицировать существующие `<section>` теги:

```html
<section class="hero" data-toc-id="hero">
```

```html
<section id="parties-extended" data-toc-id="parties">
```

```html
<section id="matrix" data-toc-id="matrix">
```

```html
<section id="cross-cutting" data-toc-id="sujety">
```

```html
<section id="docs-panel" data-toc-id="docs">
```

- [ ] **Step 2: Добавить sticky-TOC в начало `<main>`**

В `index.html` сразу после `<main id="main" data-page="home">` (строка 81–82) вставить:

```html
<aside id="mainTOC" class="main-toc" aria-label="Содержание страницы">
  <div class="main-toc-h">Содержание</div>
  <a href="#hero" data-target="hero" class="toc-cur"><span class="num">1</span> Главное</a>
  <a href="#parties-extended" data-target="parties"><span class="num">2</span> Партии</a>
  <a href="#matrix" data-target="matrix"><span class="num">3</span> Голосования</a>
  <a href="#cross-cutting" data-target="sujety"><span class="num">4</span> Сюжеты</a>
  <a href="#docs-panel" data-target="docs"><span class="num">5</span> Документы</a>
  <div class="main-toc-progress">
    <div class="main-toc-progress-bar"><div class="main-toc-progress-fill" id="mainTOCProgress"></div></div>
  </div>
</aside>
```

- [ ] **Step 3: CSS — sticky-TOC**

В `assets/css/home-compromat.css` добавить:

```css
/* === Sticky TOC (desktop only) === */
.main-toc {
  display: none;
}

@media (min-width: 1080px) {
  .main-toc {
    display: block;
    position: fixed;
    left: 24px;
    top: 100px;
    width: 200px;
    background: var(--bg-paper);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 16px 12px;
    z-index: 50;
  }
  .main-toc-h {
    font-size: 10px;
    color: var(--ink-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .main-toc a {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    color: var(--ink-soft);
    text-decoration: none;
    font-size: 13px;
    border-radius: 5px;
    margin-bottom: 1px;
    transition: background .12s;
  }
  .main-toc a:hover { background: rgba(0,0,0,0.04); }
  .main-toc a.toc-cur {
    background: var(--ink);
    color: var(--bg-card);
    font-weight: 600;
  }
  .main-toc a .num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: var(--ink-muted);
    min-width: 14px;
  }
  .main-toc a.toc-cur .num { color: var(--bg-card); }
  .main-toc-progress {
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px dashed var(--line);
  }
  .main-toc-progress-bar {
    height: 4px;
    background: var(--line);
    border-radius: 2px;
    overflow: hidden;
  }
  .main-toc-progress-fill {
    height: 100%;
    width: 0%;
    background: var(--accent);
    transition: width .15s linear;
  }
}
```

- [ ] **Step 4: Инициализация scroll-spy в home.js**

В `assets/js/pages/home.js` в `window.initHome` добавить (после остальных рендеров):

```js
if (typeof initScrollSpy === 'function') {
  initScrollSpy({
    tocSelector: '#mainTOC a[data-target]',
    sectionSelector: 'section[data-toc-id]',
    progressBarSelector: '#mainTOCProgress'
  });
}
```

- [ ] **Step 5: Визуальная проверка на десктопе ≥1080px**

Открыть в браузере на полном экране, проверить:
- Слева в фикс-позиции виден TOC с 5 пунктами
- При прокрутке активный пункт меняется (тёмный фон)
- Progress-bar обновляется
- Клик по пункту скроллит к секции
- На < 1080px TOC скрывается (mobile layout не ломается)

- [ ] **Step 6: Commit**

```bash
git add assets/css/home-compromat.css assets/js/pages/home.js index.html
git commit -m "feat(home): add sticky TOC with scroll-spy on index.html (≥1080px)"
```

---

### Task 8: Обновить матрицу с актуальными числами из API

**Files:**
- Modify: `assets/js/data/laws.js` (правки чисел голосований)

Выгрузка `research/compromat/05-evidence/duma-api/votes-summary.csv` содержит уточнённые поимённые числа. Нужно сверить с текущими в `laws.js` и поправить расхождения, выявленные по итогам API-харвестера (см. `verification-report.md`).

- [ ] **Step 1: Прочитать текущие числа в laws.js**

```bash
head -100 assets/js/data/laws.js
```

Зафиксировать формат записи каждого закона (поля типа `votes: { ER: 'za', KPRF: 'za', ... }` или с числами).

- [ ] **Step 2: Прочитать votes-summary.csv для сверки**

```bash
head -5 research/compromat/05-evidence/duma-api/votes-summary.csv
```

Зафиксировать колонки и формат.

- [ ] **Step 3: Идентифицировать расхождения**

Известные из `verification-report.md` ошибки в исходной разметке (надо проверить, есть ли они в `laws.js`):
- 20.05.2025 цифровой контроль мигрантов: 22 воздержавшихся = СРЗП целиком (не НЛ)
- 11.03.2020 Конституция: КПРФ 0/0/43/0 — единогласно воздержалась (не «против»)
- ФЗ-255 иноагенты: дата III чтения 29.06.2022 (не 14.07.2022 — последнее это подписание)

- [ ] **Step 4: Внести правки в laws.js**

Для каждого закона, где в `laws.js` указаны устаревшие данные, заменить на корректные. Конкретный код правок зависит от текущей структуры `laws.js`. Каждая правка — Edit с минимальным контекстом.

Пример (если структура такая):

```js
// Было:
{ id: 'migrant-control', date: '20.05.2025', votes: { NL: 'against' } }
// Стало:
{ id: 'migrant-control', date: '20.05.2025', votes: { NL: 'didnt-vote', SRZP: 'abstain' } }
```

- [ ] **Step 5: Визуально перепроверить матрицу**

Открыть `http://localhost:8765/`, перейти к секции matrix. Убедиться, что:
- Числа в ячейках соответствуют CSV
- Цветовое кодирование не сломано

- [ ] **Step 6: Commit**

```bash
git add assets/js/data/laws.js
git commit -m "fix(laws): sync voting matrix data with raw API (votes-summary.csv)"
```

---

### Task 9: Финальная мобильная проверка и коммит

**Files:**
- Возможно правки в `assets/css/home-compromat.css` или `home.css` для мобильной адаптации

- [ ] **Step 1: Тест на iPhone SE width (320px)**

В DevTools установить ширину 320px. Проверить:
- Hero stats — 1 колонка
- Party cards — 2 колонки
- Cross-cutting cards — 1 колонка
- Sticky-TOC скрыт
- Documents panel — paddings уменьшены
- Нет горизонтального скролла

- [ ] **Step 2: Тест на 768px (iPad)**

Проверить:
- Hero stats — 2 колонки или 4 (приемлемо)
- Party cards — 3 колонки
- Cross-cutting — 2 колонки

- [ ] **Step 3: Тест на 1280px и выше (desktop)**

Проверить:
- Hero stats — 4 колонки
- Sticky-TOC виден слева
- Все секции читабельны
- Прогресс-бар TOC обновляется

- [ ] **Step 4: При необходимости — патчи**

Если найдены проблемы в каком-то размере — добавить media queries или скорректировать `auto-fill, minmax(...)`. Пример:

```css
@media (max-width: 360px) {
  .ep-cat-grid { grid-template-columns: 1fr; }
  .stat-num { font-size: 36px; }
}
```

- [ ] **Step 5: Lighthouse-проверка**

Запустить Lighthouse в DevTools на `localhost:8765/`. Целимся:
- Accessibility ≥ 95
- Performance (mobile) ≥ 80

Если хуже — записать в issues, не блокирует.

- [ ] **Step 6: No-JS проверка**

Отключить JS в DevTools (Ctrl+Shift+P → "Disable JavaScript"). Перезагрузить. Убедиться:
- Текст hero, заголовки секций видны
- Контейнеры пустые (это норма — статический контент в новых секциях рендерится JS)
- Топнав работает (это базовый HTML)

Если контент главных секций совсем недоступен — добавить статичные fallback-сообщения «Включите JS для просмотра».

- [ ] **Step 7: Commit**

```bash
git add assets/css/home-compromat.css index.html
git commit -m "polish(home): mobile/desktop responsive checks for compromat hub"
```

---

### Task 10: Обновить README.md и финальный commit

**Files:**
- Modify: `README.md` (если требуется обновить описание главной страницы)

- [ ] **Step 1: Прочитать README.md**

```bash
head -60 README.md
```

- [ ] **Step 2: Обновить раздел про index.html**

Если в README есть «Содержание сайта» или «Структура страниц» — добавить упоминание новых секций главной (партии-категории, сквозные сюжеты, документы) и план следующих фаз (страницы партий, страницы сюжетов, эксплорер).

Если README только методический — пропустить.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: update README with phase-1 hub structure"
```

---

## Self-Review

После завершения всех задач — проверить:

**1. Spec coverage** (см. `docs/superpowers/specs/2026-05-05-compromat-pages-design.md`):
- §3.1 Hero → Task 1 ✓
- §3.2 Раздел «Партии» → Task 2, 3 ✓
- §3.3 Матрица → Task 8 ✓
- §3.4 Сквозные сюжеты → Task 4 ✓
- §3.5 Документы → Task 5 ✓
- §3.6 Sticky-TOC на десктопе → Task 6, 7 ✓
- §9 Mobile/responsive → Task 9 ✓
- §10 Доступность → Task 9 (Lighthouse) ✓
- §11 Технический стек → весь план ✓
- §16 Тестирование → Task 9 ✓

**2. Out of scope этой фазы (попадает в следующие):**
- §4 Страницы партий (`/partii/<slug>.html`) — Фаза 2–3
- §5 Страницы сюжетов (`/sujety/<slug>.html`) — Фаза 4
- §6 `/dokumenty.html` — Фаза 5
- §12 EN — Фаза 6

**3. Open questions из спеки** (§15) остаются открытыми и решаются по ходу:
- Точный порядок партий внутри категории — оставлен текущим (мандаты убывают для парламентских)
- Меню навигации — пока без отдельного пункта «Документы», только ссылка с главной

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-05-compromat-phase-1-index.md`. Two execution options:

**1. Subagent-Driven (recommended)** — диспатчу свежего сабагента на каждую задачу, ревью между, быстрая итерация.

**2. Inline Execution** — выполняю задачи в этой сессии через executing-plans, batch с чекпоинтами.

Which approach?
