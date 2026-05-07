# Compromat Phase 2 — Parliamentary Party Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать 5 глубоких страниц парламентских партий (`/partii/<slug>.html`) — кликабельных целей карточек с главной, со sticky-TOC слева, 8 секциями A–H открытыми сразу, мини-визуализациями и сворачиваемыми блоками «Источники и документы».

**Architecture:** Каждая партия — статический HTML-файл с одинаковой структурой (hero + sticky-TOC + 8 секций). Контент берётся из `research/compromat/01-parties/<slug>/*.md`, конденсируется в HTML с inline-ссылками. Общая инфраструктура — новый `assets/css/partii.css` + 2 переиспользуемых компонента (`vote-bar.js`, `sources-fold.js`) + общий `pages/party.js`. Sticky-TOC и scroll-spy — переиспользуем из Phase 1 (`scroll-spy.js`).

**Tech Stack:** HTML5, CSS3 с CSS-токенами, vanilla JS, переиспользование Chart.js (CDN, уже есть), `IntersectionObserver` через `scroll-spy.js`.

---

## File Structure

### Создаются (общая инфраструктура)

| Путь | Ответственность |
|---|---|
| `assets/css/partii.css` | Все стили специфичные для страниц партий: layout с sticky-TOC слева, секции A–H, мини-графики (`.vote-bar`), таймлайны, sources-fold, ответственный mobile-fallback. |
| `assets/js/components/vote-bar.js` | `renderVoteBar(rootEl, dataObj)` — мини стэк-бар «за/против/возд./отс.» по фракции для одного голосования. Переиспользуется на каждой странице партии. |
| `assets/js/components/sources-fold.js` | `wireSourcesFold()` — навешивает обработчик клика на все элементы `.sources-fold` и переключает класс `.open`. Глобальный (один вызов на страницу). |
| `assets/js/components/timeline-vert.js` | `renderTimelineVert(rootEl, eventsArr)` — вертикальный таймлайн с точками и датами для секции G (кризисы и война). |
| `assets/js/pages/party.js` | Init для страниц партий: `window.initParty()` — рендерит TOC, графики, навешивает sources-fold, инициализирует scroll-spy. Auto-init по `data-page="party"`. |

### Создаются (per-party страницы)

| Путь | Slug | Партия |
|---|---|---|
| `partii/novye-lyudi.html` | `novye-lyudi` | Новые люди |
| `partii/kprf.html` | `kprf` | КПРФ |
| `partii/ldpr.html` | `ldpr` | ЛДПР |
| `partii/srzp.html` | `srzp` | СРЗП |
| `partii/er.html` | `er` | Единая Россия (минимальная — без A–H досье в репозитории, синтез из данных) |

### Модифицируются

| Путь | Что меняется |
|---|---|
| `assets/js/data/extended-parties.js` | Может потребоваться обновить `href` или добавить `pageReady: true` flag, если нужно (опционально). Ничего критичного. |

### Не трогаются

- `assets/css/home-compromat.css` (главная остаётся как есть)
- `assets/js/pages/home.js`, `assets/js/lib/scroll-spy.js` (переиспользуем как есть)
- Все Phase-1 файлы

---

## Источники контента

Для каждой партии:

```
research/compromat/01-parties/<slug>/
├── README.md           — резюме, сводная таблица
├── A-origins.md        — происхождение
├── B-financing.md      — финансирование
├── C-leaders.md        — лидеры и заместители
├── D-state-ties.md     — связи с государством
├── E-voting.md         — реальное голосование
├── F-managed-opposition.md — управляемая оппозиция / спойлеры
├── G-crisis-behavior.md — кризисы и война
├── H-foreign-ties.md    — зарубежные связи (есть только у Яблока в Phase 3)
├── sources.md          — список источников
└── evidence/INDEX.md   — карта скачанных документов
```

Соответствие slug → directory:

| HTML slug | Dossier directory |
|---|---|
| `novye-lyudi` | `01-parties/01-novye-lyudi/` |
| `kprf` | `01-parties/02-kprf/` |
| `ldpr` | `01-parties/04-ldpr/` |
| `srzp` | `01-parties/05-srzp/` |

ER не имеет своего dossier — используем только сводные данные из EXTENDED_PARTIES.

---

## Tasks

### Task 1: Базовый CSS для страниц партий (`assets/css/partii.css`)

**Files:**
- Create: `assets/css/partii.css`

- [ ] **Step 1: Создать файл со всеми стилями**

```css
/* Стили специфичные для страниц партий /partii/<slug>.html */

/* === LAYOUT — sticky TOC + content === */
.party-page-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 32px;
}

@media (min-width: 1080px) {
  .party-page-layout {
    grid-template-columns: 220px 1fr;
    gap: 48px;
  }
}

/* === STICKY TOC === */
.party-toc {
  display: none;
}

@media (min-width: 1080px) {
  .party-toc {
    display: block;
    position: sticky;
    top: 90px;
    align-self: start;
    max-height: calc(100vh - 110px);
    overflow-y: auto;
    padding: 16px 12px;
    border-right: 1px solid var(--line);
    font-size: 13px;
  }
  .party-toc-h {
    font-size: 10px;
    color: var(--ink-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .party-toc a {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 10px;
    color: var(--ink-soft);
    text-decoration: none;
    border-radius: 5px;
    margin-bottom: 1px;
    transition: background .12s;
  }
  .party-toc a:hover { background: rgba(0,0,0,0.04); }
  .party-toc a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .party-toc a.toc-cur {
    background: var(--ink);
    color: var(--bg-card);
    font-weight: 600;
  }
  .party-toc a .num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: var(--ink-muted);
    min-width: 18px;
  }
  .party-toc a.toc-cur .num { color: var(--bg-card); }
  .party-toc-progress {
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px dashed var(--line);
  }
  .party-toc-progress-bar {
    height: 4px;
    background: var(--line);
    border-radius: 2px;
    overflow: hidden;
  }
  .party-toc-progress-fill {
    height: 100%;
    width: 0%;
    background: var(--accent);
    transition: width .15s linear;
  }
}

/* === HERO (партийный) === */
.party-hero { padding: 56px 0 44px; border-bottom: 1px solid var(--line); }
.party-hero-meta {
  font-size: 11px; color: var(--ink-muted);
  letter-spacing: 0.06em; margin-bottom: 22px;
  display: flex; gap: 18px; flex-wrap: wrap;
}
.party-hero-meta i { color: var(--accent); }
.party-hero h1 {
  font-size: clamp(40px, 7vw, 80px);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.96;
  margin: 0 0 22px;
}
.party-hero h1 em { font-style: italic; font-weight: 500; color: var(--ink-soft); }
.party-hero h1 .acc { color: var(--accent); }
.party-hero p {
  font-size: 16px; line-height: 1.55;
  color: var(--ink-soft); max-width: 760px;
  margin: 0 0 30px;
}
.party-hero p a {
  color: var(--accent); text-decoration: none;
  border-bottom: 1px solid rgba(185,28,28,0.3);
}
.party-hero-stats {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
  padding: 22px; background: var(--bg-card);
  border: 1px solid var(--line); border-radius: 12px;
}
.party-hero-stats .stat { font-size: 12px; color: var(--ink-muted); }
.party-hero-stats .stat .n {
  font-size: 36px; font-weight: 900;
  color: var(--ink); line-height: 1;
  letter-spacing: -0.03em;
}
.party-hero-stats .stat .n.alert { color: var(--accent); }
.party-hero-stats .stat .lbl { margin-top: 8px; line-height: 1.4; }

@media (max-width: 760px) {
  .party-hero-stats { grid-template-columns: 1fr 1fr; }
}

/* === SECTION === */
.party-sec { margin: 48px 0; scroll-margin-top: 20px; }
.party-sec-mark {
  font-size: 11px; color: var(--accent);
  letter-spacing: 0.12em; font-weight: 700;
  text-transform: uppercase; margin-bottom: 6px;
}
.party-sec h2 {
  margin: 0 0 14px;
  font-size: 28px; font-weight: 900;
  letter-spacing: -0.02em;
}
.party-sec p {
  margin: 0 0 12px;
  font-size: 15px; line-height: 1.65;
  color: var(--ink);
}
.party-sec p a {
  color: var(--accent); text-decoration: none;
  border-bottom: 1px solid rgba(185,28,28,0.25);
}
.party-sec p a:hover { border-bottom-color: var(--accent); }
.party-sec ul, .party-sec ol {
  margin: 0 0 12px; padding-left: 20px;
  font-size: 15px; line-height: 1.65;
}
.party-sec ul li, .party-sec ol li { margin-bottom: 4px; }
.party-sec blockquote {
  margin: 16px 0;
  padding: 14px 18px;
  background: var(--bg-card);
  border-left: 3px solid var(--accent);
  font-style: italic;
  color: var(--ink-soft);
}

/* === CHART CARD === */
.chart-card {
  margin: 20px 0;
  padding: 18px 20px;
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: 10px;
}
.chart-card h4 {
  margin: 0 0 4px;
  font-size: 14px; font-weight: 800;
}
.chart-card .ch-meta {
  font-size: 11px; color: var(--ink-muted);
  margin-bottom: 12px;
}
.chart-card .ch-meta a {
  color: var(--accent); text-decoration: none;
}

/* === VOTE BAR (мини стэк-бар голосования по фракции) === */
.vote-bar-row {
  display: grid;
  grid-template-columns: 130px 1fr 80px;
  gap: 10px; align-items: center;
  padding: 6px 0; font-size: 12px;
}
.vote-bar-row .vb-lbl { color: var(--ink-soft); font-weight: 600; }
.vote-bar-row .vb-lbl small {
  display: block; font-weight: 400;
  font-size: 10px; color: var(--ink-muted);
  margin-top: 1px;
}
.vote-bar-row .vb-pct {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; color: var(--ink-soft); text-align: right;
}
.vote-bar {
  display: flex; height: 18px;
  border-radius: 3px; overflow: hidden;
  background: var(--line-soft);
}
.vote-bar > div {
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; color: #fff; font-weight: 700;
  min-width: 0;
}
.vote-bar .vb-for { background: var(--vote-against); }
.vote-bar .vb-against { background: var(--vote-za); }
.vote-bar .vb-abs { background: var(--vote-abstain); }
.vote-bar .vb-skip { background: var(--vote-didnt); }
.ch-legend {
  display: flex; gap: 14px; flex-wrap: wrap;
  font-size: 11px; color: var(--ink-muted);
  margin-top: 10px; padding-top: 10px;
  border-top: 1px dashed var(--line);
}
.ch-legend i {
  display: inline-block; width: 10px; height: 10px;
  border-radius: 2px; margin-right: 4px; vertical-align: -1px;
}

/* === TIMELINE === */
.timeline-vert {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  margin: 14px 0;
}
.tl-row {
  display: grid;
  grid-template-columns: 100px 14px 1fr;
  gap: 10px;
  align-items: flex-start;
  padding: 6px 0;
  font-size: 13px;
  position: relative;
}
.tl-row::before {
  content: '';
  position: absolute;
  left: 106px; top: 14px; bottom: -6px;
  width: 1px; background: var(--line);
}
.tl-row:last-child::before { display: none; }
.tl-row .tl-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; color: var(--ink-muted);
  text-align: right; padding-top: 1px;
}
.tl-row .tl-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--accent);
  margin: 5px 2px 0;
  z-index: 1;
}
.tl-row .tl-dot.muted { background: var(--vote-didnt); }
.tl-row .tl-text { color: var(--ink); line-height: 1.5; }
.tl-row .tl-text strong { color: var(--ink); }

/* === SOURCES FOLD === */
.sources-fold {
  margin-top: 18px;
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
}
.sources-fold-head {
  padding: 12px 16px;
  background: var(--bg-paper);
  cursor: pointer;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 13px;
  user-select: none;
}
.sources-fold-head .lbl { color: var(--ink); font-weight: 700; }
.sources-fold-head .meta { font-size: 11px; color: var(--ink-muted); }
.sources-fold-head .arr {
  font-size: 14px; color: var(--accent);
  transition: transform .2s;
}
.sources-fold.open .sources-fold-head .arr { transform: rotate(180deg); }
.sources-fold-body {
  display: none;
  padding: 14px 16px;
  background: var(--bg-card);
  font-size: 12px; line-height: 1.7;
}
.sources-fold.open .sources-fold-body { display: block; }
.sources-fold-body .sgroup { margin-bottom: 12px; }
.sources-fold-body .sgroup-h {
  display: flex; align-items: center; gap: 6px;
  font-weight: 700; color: var(--ink);
  margin-bottom: 4px; font-size: 11px;
}
.sources-fold-body .lvl {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
}
.lvl.g { background: var(--green); }
.lvl.y { background: var(--gold); }
.lvl.o { background: var(--accent-soft); }
.lvl.r { background: var(--ink-muted); }
.sources-fold-body a {
  color: var(--accent);
  text-decoration: none;
  margin-right: 14px;
  display: inline-block;
  padding: 2px 0;
}
.sources-fold-body a:hover { text-decoration: underline; }
.sources-fold-body .doc {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  background: var(--bg-paper);
  padding: 1px 5px;
  border-radius: 2px;
  color: var(--ink-soft);
  margin-left: 4px;
}

/* === BREADCRUMB === */
.party-crumb {
  font-size: 12px;
  color: var(--ink-muted);
  padding: 14px 0 0;
}
.party-crumb a {
  color: var(--accent);
  text-decoration: none;
}
```

- [ ] **Step 2: Commit**

```bash
cd ./
git add assets/css/partii.css
git commit -m "feat(partii): add shared CSS for party deep-pages"
```

---

### Task 2: Компонент vote-bar (мини стэк-бар голосования)

**Files:**
- Create: `assets/js/components/vote-bar.js`

- [ ] **Step 1: Создать компонент**

```js
// Renders a stacked vote bar for a single fraction's vote on a single law.
//
// Usage:
//   renderVoteBar(rootEl, {
//     law: '04.03.2022 фейки об армии ФЗ-32',
//     for: 13, against: 0, abstain: 0, skip: 2
//   });
//
// rootEl is appended to (multiple bars per chart-card).
window.renderVoteBar = function renderVoteBar(rootEl, data) {
  if (!rootEl || !data) return;

  const total = (data.for || 0) + (data.against || 0) + (data.abstain || 0) + (data.skip || 0);
  if (total === 0) return;

  const segments = [];
  if (data.for) segments.push(`<div class="vb-for" style="flex:${data.for}">${data.for}</div>`);
  if (data.against) segments.push(`<div class="vb-against" style="flex:${data.against}">${data.against}</div>`);
  if (data.abstain) segments.push(`<div class="vb-abs" style="flex:${data.abstain}">${data.abstain}</div>`);
  if (data.skip) segments.push(`<div class="vb-skip" style="flex:${data.skip}">${data.skip}</div>`);

  // Format pct as "for/against/abstain/skip"
  const pct = `${data.for || 0}/${data.against || 0}/${data.abstain || 0}/${data.skip || 0}`;

  // Optional second-line subtitle on the label
  const subtitle = data.subtitle ? `<small>${data.subtitle}</small>` : '';

  const row = document.createElement('div');
  row.className = 'vote-bar-row';
  row.innerHTML = `
    <span class="vb-lbl">${data.law}${subtitle}</span>
    <div class="vote-bar">${segments.join('')}</div>
    <span class="vb-pct">${pct}</span>
  `;
  rootEl.appendChild(row);
};

// Renders a legend below a vote-bar chart-card.
window.renderVoteBarLegend = function renderVoteBarLegend(rootEl) {
  if (!rootEl) return;
  rootEl.insertAdjacentHTML('beforeend', `
    <div class="ch-legend">
      <span><i style="background:var(--vote-against)"></i>«За»</span>
      <span><i style="background:var(--vote-za)"></i>«Против»</span>
      <span><i style="background:var(--vote-abstain)"></i>Воздержались</span>
      <span><i style="background:var(--vote-didnt)"></i>Отсутствовали</span>
      <span style="margin-left:auto">за/против/возд./отс.</span>
    </div>
  `);
};
```

NOTE: «за» и «против» в нашей семантике обратной от обычной (ограничение → «за» = плохо). Поэтому `.vb-for` использует **зелёный** цвет (vote-against из tokens — голос против ограничения, который мы хвалим), а `.vb-against` — красный (vote-za — голос за ограничение, который мы критикуем). Это согласовано с цветами матрицы на главной.

- [ ] **Step 2: Commit**

```bash
cd ./
git add assets/js/components/vote-bar.js
git commit -m "feat(partii): add reusable vote-bar component for fraction voting visualizations"
```

---

### Task 3: Компонент sources-fold + timeline-vert + page init

**Files:**
- Create: `assets/js/components/sources-fold.js`
- Create: `assets/js/components/timeline-vert.js`
- Create: `assets/js/pages/party.js`

- [ ] **Step 1: sources-fold.js**

```js
// Wires click-handler on all .sources-fold blocks on the page,
// toggling the .open class on the fold container.
window.wireSourcesFold = function wireSourcesFold() {
  document.querySelectorAll('.sources-fold-head').forEach(head => {
    head.addEventListener('click', () => {
      const fold = head.closest('.sources-fold');
      if (fold) fold.classList.toggle('open');
    });
    // Keyboard accessibility — Enter/Space toggle
    head.setAttribute('role', 'button');
    head.setAttribute('tabindex', '0');
    head.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const fold = head.closest('.sources-fold');
        if (fold) fold.classList.toggle('open');
      }
    });
  });
};
```

- [ ] **Step 2: timeline-vert.js**

```js
// Renders a vertical timeline into rootEl from an array of events.
//
// Usage:
//   renderTimelineVert(rootEl, [
//     { date: '04.03.2022', text: '<strong>ФЗ-32 о фейках</strong> — фракция «за», 13/0/0/2', muted: false },
//     { date: '20.09.2022', text: '<strong>Мобилизация</strong> — В.А. Даванков соавтор', muted: false }
//   ]);
window.renderTimelineVert = function renderTimelineVert(rootEl, events) {
  if (!rootEl || !events || !events.length) return;
  const wrap = document.createElement('div');
  wrap.className = 'timeline-vert';
  wrap.innerHTML = events.map(ev => `
    <div class="tl-row">
      <div class="tl-date">${ev.date}</div>
      <div class="tl-dot${ev.muted ? ' muted' : ''}"></div>
      <div class="tl-text">${ev.text}</div>
    </div>
  `).join('');
  rootEl.appendChild(wrap);
};
```

- [ ] **Step 3: pages/party.js**

```js
// Init for /partii/<slug>.html pages.
// Auto-runs on DOMContentLoaded if main has data-page="party".
window.initParty = function initParty() {
  // Wire sources-fold click handlers
  if (typeof wireSourcesFold === 'function') wireSourcesFold();

  // Init scroll-spy for sticky TOC (if .party-toc has links + sections present)
  if (typeof initScrollSpy === 'function' && document.querySelector('.party-toc a[data-target]')) {
    initScrollSpy({
      tocSelector: '.party-toc a[data-target]',
      sectionSelector: 'section[data-toc-id]',
      progressBarSelector: '.party-toc-progress-fill'
    });
  }

  // Hook for per-page render hooks (declared in HTML inline scripts)
  if (typeof window.renderPartyContent === 'function') window.renderPartyContent();
};

function tryAutoInitParty() {
  const main = document.getElementById('main');
  if (main && main.dataset.page === 'party') window.initParty();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', tryAutoInitParty);
} else {
  tryAutoInitParty();
}
```

- [ ] **Step 4: Commit**

```bash
cd ./
git add assets/js/components/sources-fold.js assets/js/components/timeline-vert.js assets/js/pages/party.js
git commit -m "feat(partii): add sources-fold, timeline-vert, party page init"
```

---

### Task 4: HTML-шаблон страницы партии — Новые люди (`/partii/novye-lyudi.html`)

**Files:**
- Create: `partii/novye-lyudi.html`

Это самая полная страница (контент уже подробный — 248K MD-файлов). Используется как **референсный шаблон** для остальных партий.

- [ ] **Step 1: Создать каталог /partii/**

```bash
mkdir -p ./partii
```

- [ ] **Step 2: Создать страницу `/partii/novye-lyudi.html`**

Структура:
- Стандартный `<head>` с метатегами + подключением общих CSS (`tokens, base, layout, components, home`) + новый `partii.css`
- Стандартный topnav (с активной отметкой на главной — поскольку это «дочерний» уровень главной)
- Breadcrumb «Главная / Партии / Новые люди»
- Hero с цифрами
- Layout: `.party-page-layout` = sticky TOC слева + контент справа
- 8 секций A–H с inline-визуализациями
- Каждая секция заканчивается `.sources-fold` блоком

Полный HTML:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>«Новые люди» — самая чистая управляемая оппозиция | Голосование без выбора</title>
<meta name="description" content="Глубокое досье на партию «Новые люди»: происхождение, финансирование (93% бюджета), Алексей Нечаев и Faberlic, Владислав Даванков как соавтор мобилизационных поправок 20.09.2022, голосование 92% «за» ограничительные законы 2022–2025.">
<meta property="og:title" content="«Новые люди» — самая чистая управляемая оппозиция">
<meta property="og:description" content="Партия, прошедшая в Думу с первой попытки за 22 года. Лидер — доверенное лицо Путина 2018 г. Голосует «за» 92% ограничительных законов.">
<meta property="og:type" content="article">
<meta property="og:url" content="https://im-not-a-human.github.io/ru-elections/partii/novye-lyudi.html">
<link rel="canonical" href="https://im-not-a-human.github.io/ru-elections/partii/novye-lyudi.html">
<link rel="icon" href="data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'&gt;&lt;rect width='32' height='32' rx='6' fill='%231A1815'/&gt;&lt;text x='16' y='22' text-anchor='middle' font-family='Unbounded,sans-serif' font-weight='900' font-size='18' fill='%23F0EAD6'&gt;Г&lt;/text&gt;&lt;/svg&gt;">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;700;900&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Lora:ital,wght@0,500;1,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/tokens.css">
<link rel="stylesheet" href="../assets/css/base.css">
<link rel="stylesheet" href="../assets/css/layout.css">
<link rel="stylesheet" href="../assets/css/components.css">
<link rel="stylesheet" href="../assets/css/home.css">
<link rel="stylesheet" href="../assets/css/partii.css">
<script>document.documentElement.classList.add('js');</script>
</head>
<body>

<a class="skip-link" href="#main">К содержанию</a>

<nav class="topnav">
  <div class="wrap">
    <div class="nav-row">
      <a class="brand" href="../index.html">
        <span class="brand-mark">Г</span>
        <span class="brand-text">Голосование без выбора</span>
      </a>
      <nav class="page-toggle" id="pageToggle" aria-label="Разделы сайта">
        <a href="../index.html" class="is-current" aria-current="page">
          <span class="lbl-full">Голосования</span>
          <span class="lbl-short">Дума</span>
        </a>
        <a href="../vybory.html">
          <span class="lbl-full">Математика выборов</span>
          <span class="lbl-short">Выборы</span>
        </a>
        <a href="../tsenzura.html">
          <span class="lbl-full">Цифровые ограничения</span>
          <span class="lbl-short">Рунет</span>
        </a>
      </nav>
    </div>
  </div>
</nav>

<main id="main" data-page="party">

<div class="wrap">
  <div class="party-crumb">
    <a href="../index.html">Главная</a> / <a href="../index.html#parties-extended">Партии</a> / Новые люди
  </div>
</div>

<section class="party-hero">
  <div class="wrap">
    <div class="party-hero-meta">
      <span><i>●</i> Парламентская фракция</span>
      <span style="font-family:'JetBrains Mono',monospace">2020 — наши дни</span>
      <span>15 мандатов в VIII Думе</span>
    </div>
    <h1>«<em>Новые люди</em>» —<br>самая <span class="acc">чистая</span> управляемая оппозиция.</h1>
    <p>
      Партия, прошедшая в Думу <strong>с первой попытки за 22 года</strong>. Минюст выдал свидетельство о регистрации <strong>через 3 месяца</strong> (для сравнения, «Партии Прогресса» Алексея Навального отказывали 8 раз за 7 лет). Лидер — <a href="https://docs.cntd.ru/document/542640230" target="_blank" rel="noopener">доверенное лицо Путина на президентских 2018 г.</a> и член Центрального штаба ОНФ. Заместитель — выходец из АНО «Россия — страна возможностей», набсовет которой возглавляет первый замглавы АП Сергей Кириенко.
    </p>
    <div class="party-hero-stats">
      <div class="stat"><div class="n alert">5,32%</div><div class="lbl">на выборах в ГД 2021 г. — 2 991 130 голосов, 13 мандатов по федеральному списку</div></div>
      <div class="stat"><div class="n">93%</div><div class="lbl">доля бюджетного финансирования в доходах партии в 2024 г.</div></div>
      <div class="stat"><div class="n alert">92%</div><div class="lbl">поддержки ключевых ограничительных законов 2022–2025 (по 28 голосованиям API Думы)</div></div>
      <div class="stat"><div class="n">3,85%</div><div class="lbl">Владислав Даванков на президентских выборах 2024 г. — 3-е место</div></div>
    </div>
  </div>
</section>

<div class="party-page-layout">
  <aside class="party-toc" aria-label="Содержание досье">
    <div class="party-toc-h">Раздел досье</div>
    <a href="#origins" data-target="origins" class="toc-cur"><span class="num">A</span> Происхождение</a>
    <a href="#financing" data-target="financing"><span class="num">B</span> Финансирование</a>
    <a href="#leaders" data-target="leaders"><span class="num">C</span> Лидеры</a>
    <a href="#state-ties" data-target="state-ties"><span class="num">D</span> Связи с государством</a>
    <a href="#voting" data-target="voting"><span class="num">E</span> Голосование</a>
    <a href="#managed" data-target="managed"><span class="num">F</span> Управляемая оппозиция</a>
    <a href="#crisis" data-target="crisis"><span class="num">G</span> Кризисы и война</a>
    <a href="#foreign" data-target="foreign"><span class="num">H</span> Зарубежные связи</a>
    <div class="party-toc-progress">
      <div class="party-toc-progress-bar"><div class="party-toc-progress-fill"></div></div>
    </div>
  </aside>

  <div>
    <section class="party-sec" id="origins" data-toc-id="origins">
      <div class="party-sec-mark">A · Происхождение</div>
      <h2>Откуда взялась партия</h2>
      <p>Учредительный съезд состоялся <strong>1 марта 2020 г.</strong> в московском <a href="https://bigenc.ru/c/novye-liudi-politicheskaia-partiia-1058b3" target="_blank" rel="noopener">Центре цифрового лидерства SAP</a>. На съезде участвовали 120 делегатов от 55 региональных отделений. Минюст выдал свидетельство о регистрации <strong>через 3 месяца</strong> (ОГРН 1207700135972, ИНН 9706005582). Для сравнения, <a href="../research/compromat/02-cross-cutting/01-novye-lyudi-case.md" target="_blank">«Партии Прогресса» Алексея Навального</a> Минюст отказывал в регистрации <strong>8 раз</strong> за 7 лет (2011–2018).</p>
      <p>Лидер партии — Алексей Нечаев, основатель MLM-компании Faberlic (косметика, прямые продажи). На момент основания НЛ он уже был <a href="https://docs.cntd.ru/document/542640230" target="_blank" rel="noopener">доверенным лицом Путина на президентских выборах 2018 г.</a> (распоряжение Президента №446-рп) и <a href="https://onf.ru" target="_blank" rel="noopener">членом Центрального штаба ОНФ 2019–2020 гг.</a></p>
      <p>Заместитель председателя — Владислав Даванков. До прихода в партию (2018–2021) он был <a href="http://duma.gov.ru/duma/persons/1055959/" target="_blank" rel="noopener">заместителем гендиректора АНО «Россия — страна возможностей»</a>, наблюдательный совет которой <a href="https://rsv.ru" target="_blank" rel="noopener">возглавляет Сергей Кириенко</a>, первый замглавы администрации президента.</p>

      <p><strong>Косвенные индикаторы согласования с АП.</strong> Прямой документ о согласовании отсутствует в открытом доступе, но три факта параллельны:</p>
      <ul>
        <li>Алексей Нечаев — доверенное лицо Путина на президентских выборах 2018 г. (распоряжение Президента №446-рп);</li>
        <li>Владислав Даванков 2018–2021 — заместитель гендиректора АНО «РСВ» под Кириенко;</li>
        <li>В июле 2023 г. Алексей Нечаев был награждён <strong>Орденом Дружбы</strong> (указ Президента — точный № не публикуется отдельно; награждение в составе общего указа).</li>
      </ul>
      <p>Журналистская реконструкция Андрея Перцева (<a href="https://meduza.io/feature/2021/09/24/za-dengi-nechaeva-pod-kryshey-kovalchukov" target="_blank" rel="noopener">Meduza, 24.09.2021</a>): «партия за деньги Нечаева, под крышей Ковальчуков». Это анонимный источник в АП — низкий уровень доказательства; сам Нечаев категорически отрицает причастность Юрия Ковальчука.</p>

      <div class="sources-fold">
        <div class="sources-fold-head">
          <span class="lbl">Источники и документы — раздел A</span>
          <span class="meta">12 ссылок · 5 PDF · скачано на сайт</span>
          <span class="arr">▾</span>
        </div>
        <div class="sources-fold-body">
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl g"></span>🟢 Документ — первоисточник</div>
            <a href="https://docs.cntd.ru/document/542640230" target="_blank" rel="noopener">Распоряжение Президента РФ №446-рп о доверенных лицах</a>
            <a href="https://bigenc.ru/c/novye-liudi-politicheskaia-partiia-1058b3" target="_blank" rel="noopener">БРЭ — карточка партии</a>
            <a href="../research/compromat/01-parties/01-novye-lyudi/A-origins.md" target="_blank">Полный текст раздела A в досье</a>
          </div>
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl y"></span>🟡 Деловая пресса</div>
            <a href="https://www.kommersant.ru/doc/4292534" target="_blank" rel="noopener">Коммерсантъ — регистрация партии 03.2020</a>
            <a href="https://www.forbes.ru/" target="_blank" rel="noopener">Forbes Russia — Нечаев и партия</a>
          </div>
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl o"></span>🟠 Расследование одного источника</div>
            <a href="https://meduza.io/feature/2021/09/24/za-dengi-nechaeva-pod-kryshey-kovalchukov" target="_blank" rel="noopener">А. Перцев / Meduza, 24.09.2021 — «За деньги Нечаева, под крышей Ковальчуков»</a>
          </div>
        </div>
      </div>
    </section>

    <section class="party-sec" id="financing" data-toc-id="financing">
      <div class="party-sec-mark">B · Финансирование</div>
      <h2>На что живёт партия</h2>
      <p>В 2022–2024 годах <strong>92–93% доходов партии</strong> — из государственного бюджета. Расчётная база: 152 ₽ × 2 991 130 голосов на выборах в ГД 2021 г. = <strong>454,7 млн ₽/год</strong> ежегодных бюджетных поступлений.</p>
      <p>В избирательный фонд 2021 г. крупнейшие пожертвования внесли <strong>физические лица 1998+ года рождения</strong> на максимально допустимые суммы (≈4,33 млн ₽ — лимит для физлица). Расследование <a href="https://meduza.io/feature/2022/11/15/rossiyskie-studenty-zhertvuyut-partii-novye-lyudi-sotni-millionov-rubley-otkuda-u-nih-takie-dengi-i-pochemu-oni-reshili-ih-otdat" target="_blank" rel="noopener">Meduza × Transparency International Russia (15.11.2022)</a> зафиксировало среди жертвователей значительное число студентов и выпускников программы «Капитаны» Нечаева — это интерпретируется как «структурирование» крупного пожертвования через большое число физических лиц.</p>
      <p><strong>Faberlic как корпоративный жертвователь</strong> в значимых суммах не фигурирует. Но в апреле 2025 г. ООО «Фэш Фэктори» (швейная фабрика Faberlic) <a href="https://www.tadviser.ru/index.php/Компания:Фаберлик_(Faberlic)" target="_blank" rel="noopener">было продано ООО «Воентекстильпром»</a>, аффилированному с АО «Военторг» — структурой Минобороны РФ. Это первый зафиксированный крупный B2G-актив, перешедший от группы Нечаева к структуре Минобороны.</p>

      <div class="chart-card">
        <h4>Доходы партии 2021–2024 (млн ₽) и доля бюджета</h4>
        <div class="ch-meta">Источник: реконструкция отчётов партии в ЦИК · <a href="https://www.kommersant.ru/doc/6028983" target="_blank" rel="noopener">Коммерсантъ</a> · <a href="https://golosinfo.org/articles/148731" target="_blank" rel="noopener">«Голос», доклад 2024</a></div>
        <div id="financingChart"></div>
      </div>

      <div class="sources-fold">
        <div class="sources-fold-head">
          <span class="lbl">Источники и документы — раздел B</span>
          <span class="meta">9 ссылок · 4 публикации</span>
          <span class="arr">▾</span>
        </div>
        <div class="sources-fold-body">
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl g"></span>🟢 Документ — первоисточник</div>
            <a href="../research/compromat/01-parties/01-novye-lyudi/B-financing.md" target="_blank">Полный текст раздела B в досье</a>
          </div>
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl y"></span>🟡 Деловая пресса</div>
            <a href="https://www.kommersant.ru/doc/6028983" target="_blank" rel="noopener">Коммерсантъ — отчёт ЦИК</a>
            <a href="https://www.vedomosti.ru/politics/articles/2023/06/05/978589-partii-s-nachala-goda-poluchili-finansirovanie-na-83-mlrd" target="_blank" rel="noopener">Ведомости — финансирование партий</a>
            <a href="https://golosinfo.org/articles/148731" target="_blank" rel="noopener">«Голос», доклад о финансировании партий 2020–2023</a>
            <a href="https://www.tadviser.ru/index.php/Компания:Фаберлик_(Faberlic)" target="_blank" rel="noopener">TAdviser — продажа Фэш Фэктори Воентекстильпрому</a>
          </div>
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl o"></span>🟠 Расследование одного источника</div>
            <a href="https://meduza.io/feature/2022/11/15/rossiyskie-studenty-zhertvuyut-partii-novye-lyudi-sotni-millionov-rubley-otkuda-u-nih-takie-dengi-i-pochemu-oni-reshili-ih-otdat" target="_blank" rel="noopener">Meduza × TI Russia, 15.11.2022 — пожертвования студентов «Капитанов»</a>
          </div>
        </div>
      </div>
    </section>

    <section class="party-sec" id="leaders" data-toc-id="leaders">
      <div class="party-sec-mark">C · Лидеры</div>
      <h2>Кто представляет партию</h2>
      <p><strong>Алексей Геннадьевич Нечаев</strong> (р. 1966) — председатель партии. Президент компании Faberlic (косметика, прямые продажи). Основатель образовательной программы «Капитаны». Доверенное лицо Путина на президентских выборах 2018 г. (распоряжение Президента №446-рп). Член Центрального штаба ОНФ 2019–2020 гг. Награждён Орденом Дружбы (5 июля 2023 г.).</p>
      <p><strong>Владислав Андреевич Даванков</strong> (р. 1984) — вице-спикер Государственной Думы (с 2021), кандидат от партии на президентских выборах 2024 г. (3,85%, 3-е место). До прихода в партию в 2018–2021 гг. — заместитель генерального директора АНО «Россия — страна возможностей» (наблюдательный совет которой возглавляет Сергей Кириенко). Соавтор поправок к УК о мобилизации (20.09.2022).</p>
      <p><strong>Сардана Авксентьева</strong> (р. 1970) — депутат Государственной Думы. До 2021 г. — мэр Якутска (2018–2021). В партию пришла как №2 списка на III съезде 4 июля 2021 г.</p>
      <p><strong>Дмитрий Певцов</strong> (р. 1963) — депутат Государственной Думы по одномандатному округу. Актёр театра и кино. До прихода в партию публично поддержал аннексию Крыма в 2014 г.</p>
      <p><strong>Олег Леонов</strong> — депутат Государственной Думы. Общественный деятель.</p>
      <p><strong>Ксения Горячева</strong> — депутат Государственной Думы. Самая последовательная фрондёр фракции — 10+ задокументированных голосований против ограничительных норм или воздержаний.</p>
      <p>По декларации 2020 г. (предвыборной), <a href="https://www.vedomosti.ru" target="_blank" rel="noopener">доход Нечаева превысил 4,4 млрд ₽</a> — на порядок больше любого другого партийного лидера в системе.</p>

      <div class="sources-fold">
        <div class="sources-fold-head">
          <span class="lbl">Источники и документы — раздел C</span>
          <span class="meta">10 ссылок · биографии · декларации</span>
          <span class="arr">▾</span>
        </div>
        <div class="sources-fold-body">
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl g"></span>🟢 Документ — первоисточник</div>
            <a href="http://duma.gov.ru/duma/persons/1055959/" target="_blank" rel="noopener">Карточка В.А. Даванкова на duma.gov.ru</a>
            <a href="../research/compromat/01-parties/01-novye-lyudi/C-leaders.md" target="_blank">Полный текст раздела C в досье</a>
          </div>
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl y"></span>🟡 Деловая пресса</div>
            <a href="https://www.vedomosti.ru" target="_blank" rel="noopener">Ведомости — декларации Нечаева</a>
            <a href="https://www.kommersant.ru/doc/5570975" target="_blank" rel="noopener">Коммерсантъ — Даванков как соавтор</a>
          </div>
        </div>
      </div>
    </section>

    <section class="party-sec" id="state-ties" data-toc-id="state-ties">
      <div class="party-sec-mark">D · Связи с государством</div>
      <h2>Структурная близость с государством</h2>
      <p><strong>Орден Дружбы Алексею Нечаеву</strong> (5 июля 2023 г., указ Президента) — государственная награда лидеру «оппозиционной» партии в момент, когда фракция голосует «за» ключевые ограничительные законы 2022–2024 гг.</p>
      <p><strong>Faberlic — статус «промышленного комплекса Москвы»</strong> с 2008 г.: налоговые льготы, 200 млн ₽ заёма от Московского фонда поддержки промышленности и предпринимательства.</p>
      <p>В апреле 2025 г. ООО «Фэш Фэктори» (швейная фабрика Faberlic) <a href="https://www.tadviser.ru/index.php/Компания:Фаберлик_(Faberlic)" target="_blank" rel="noopener">продано ООО «Воентекстильпром»</a>, аффилированному с АО «Военторг» — структурой Минобороны РФ.</p>
      <p>По данным агрегаторов открытых выгрузок из <a href="https://zakupki.gov.ru" target="_blank" rel="noopener">zakupki.gov.ru</a>, у АО «Фаберлик» (ИНН 5001026970) был один государственный контракт ≈2,5 млн ₽ (Ивановская область, поставка дезинфицирующего геля). Это пренебрежимая сумма для компании с выручкой 29,73 млрд ₽ в 2024 г.</p>

      <div class="sources-fold">
        <div class="sources-fold-head">
          <span class="lbl">Источники и документы — раздел D</span>
          <span class="meta">8 ссылок · указы · контракты</span>
          <span class="arr">▾</span>
        </div>
        <div class="sources-fold-body">
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl g"></span>🟢 Документ — первоисточник</div>
            <a href="../research/compromat/01-parties/01-novye-lyudi/D-state-ties.md" target="_blank">Полный текст раздела D в досье</a>
          </div>
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl y"></span>🟡 Деловая пресса и агрегаторы</div>
            <a href="https://www.tadviser.ru/index.php/Компания:Фаберлик_(Faberlic)" target="_blank" rel="noopener">TAdviser — Faberlic корпоративный профиль</a>
          </div>
        </div>
      </div>
    </section>

    <section class="party-sec" id="voting" data-toc-id="voting">
      <div class="party-sec-mark">E · Голосование</div>
      <h2>Как голосует фракция</h2>
      <p>За 28 ключевых ограничительных законов 2019–2025 гг. фракция «Новые люди» голосовала «за» <strong>в 92% случаев</strong>. По данным <a href="http://api.duma.gov.ru" target="_blank" rel="noopener">api.duma.gov.ru</a> с поимённой разбивкой, расхождения с «Единой Россией» происходят почти исключительно как «воздержание» или «массовое отсутствие», а не как фракционное «против».</p>
      <p>Главный кейс — <strong>Владислав Даванков лично соавтор поправок к УК о мобилизации (20.09.2022)</strong>. По этому закону за три месяца на фронт отправили <a href="https://www.kommersant.ru/doc/5570975" target="_blank" rel="noopener">более 300 000 мужчин</a>. Параллельно тот же Даванков на президентских выборах-2024 шёл с лозунгом «<em>мир и переговоры</em>» — и набрал 3,85%.</p>

      <div class="chart-card">
        <h4>Голосование фракции «Новые люди» по 7 ключевым законам 2022–2025</h4>
        <div class="ch-meta">Источник: <a href="../research/compromat/05-evidence/duma-api/votes/" target="_blank">raw-XML с api.duma.gov.ru</a> с поимёнными результатами голосований</div>
        <div id="votingBars"></div>
      </div>

      <p>Кейс <strong>22.07.2025 (ФЗ-281 о VPN)</strong> — единственный кейс реальной фракционной оппозиции «Новых людей» за весь VIII созыв. Закон бьёт по электоральной базе партии: городскому среднему классу, активно использующему VPN. Голосование 12 «против» против 2 «за» — самая жёсткая позиция фракции с 2021 г.</p>
      <p>Кейс <strong>31.01.2024 (конфискация имущества за фейки)</strong> — все 13 депутатов фракции массово не голосовали (тактическое отсутствие). В I чтении против голосовали лично Авксентьева и Горячева; в III чтении фракция исчезла из зала.</p>

      <div class="sources-fold">
        <div class="sources-fold-head">
          <span class="lbl">Источники и документы — раздел E</span>
          <span class="meta">28 raw-XML голосований · стенограммы · публикации</span>
          <span class="arr">▾</span>
        </div>
        <div class="sources-fold-body">
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl g"></span>🟢 Поимённые голосования (api.duma.gov.ru)</div>
            <a href="../research/compromat/05-evidence/duma-api/votes/army-fakes.xml" target="_blank">фейки об армии 04.03.2022 <span class="doc">XML</span></a>
            <a href="../research/compromat/05-evidence/duma-api/votes/mobilization-uk.xml" target="_blank">мобилизация 20.09.2022 <span class="doc">XML</span></a>
            <a href="../research/compromat/05-evidence/duma-api/votes/dnr-ratification.xml" target="_blank">ДНР/ЛНР 22.02.2022 <span class="doc">XML</span></a>
            <a href="../research/compromat/05-evidence/duma-api/votes/" target="_blank">+ 25 голосований</a>
          </div>
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl g"></span>🟢 Карточки законопроектов (sozd.duma.gov.ru)</div>
            <a href="../research/compromat/05-evidence/sozd-bills/160006-8.html" target="_blank">мобилизация bill 160006-8 <span class="doc">HTML</span></a>
            <a href="../research/compromat/05-evidence/sozd-bills/755710-8.html" target="_blank">VPN bill 755710-8 <span class="doc">HTML</span></a>
          </div>
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl y"></span>🟡 Деловая пресса</div>
            <a href="https://www.kommersant.ru/doc/5570975" target="_blank" rel="noopener">Коммерсантъ — Даванков-соавтор моб. поправок</a>
            <a href="https://www.rbc.ru/politics/07/02/2024/65c33c959a79479eafe3152e" target="_blank" rel="noopener">РБК — конфискация за фейки 31.01.2024</a>
          </div>
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl r"></span>🔴 Авторская интерпретация</div>
            <a href="../research/compromat/02-cross-cutting/01-novye-lyudi-case.md" target="_blank">02-cross-cutting/01-novye-lyudi-case.md — кейс «чистой управляемой оппозиции»</a>
          </div>
        </div>
      </div>
    </section>

    <section class="party-sec" id="managed" data-toc-id="managed">
      <div class="party-sec-mark">F · Управляемая оппозиция</div>
      <h2>Технологии управляемой альтернативы</h2>
      <p><strong>Кейс Даванкова на президентских выборах 2024 г.</strong> 24 декабря 2023 г. партия выдвинула В. Даванкова. Зарегистрирован ЦИК <strong>без сбора подписей</strong> — как кандидат от парламентской партии. Параллельно ЦИК отказал в регистрации Е. Дунцовой (23.12.2023) и Б. Надеждину (08.02.2024 — на основании 9,3% «брака» подписей). Это иллюстрация механики двойного фильтра: реальные альтернативные кандидаты не допущены, кандидат, голосовавший «за» признание ДНР/ЛНР, мобилизационные поправки и аннексию, — допущен и получает 3,85% голосов «за мир и переговоры».</p>
      <p><strong>Слияние с «Партией Роста» (19.04.2024).</strong> Бизнес-омбудсмен Борис Титов формально перешёл в политсовет НЛ; «Партия Роста» как юридическое лицо <a href="https://www.forbes.ru/society/550320-verhovnyj-sud-likvidiroval-partiu-rosta" target="_blank" rel="noopener">была ликвидирована Верховным Судом 20.11.2025</a>. Все её активы (бренд, региональная сеть, актив политтехнологический) перешли в НЛ.</p>

      <div class="sources-fold">
        <div class="sources-fold-head">
          <span class="lbl">Источники и документы — раздел F</span>
          <span class="meta">6 ссылок · решения ЦИК и ВС</span>
          <span class="arr">▾</span>
        </div>
        <div class="sources-fold-body">
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl g"></span>🟢 Документ — первоисточник</div>
            <a href="../research/compromat/01-parties/01-novye-lyudi/F-managed-opposition.md" target="_blank">Полный текст раздела F в досье</a>
          </div>
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl y"></span>🟡 Деловая пресса</div>
            <a href="https://www.forbes.ru/society/550320-verhovnyj-sud-likvidiroval-partiu-rosta" target="_blank" rel="noopener">Forbes — ликвидация Партии Роста ВС РФ 20.11.2025</a>
            <a href="https://www.kommersant.ru/doc/6608552" target="_blank" rel="noopener">Коммерсантъ — Даванков на президентских 2024</a>
          </div>
        </div>
      </div>
    </section>

    <section class="party-sec" id="crisis" data-toc-id="crisis">
      <div class="party-sec-mark">G · Кризисы и война</div>
      <h2>Поведение в острые моменты 2022–2024</h2>
      <p>В каждом из ключевых событий 2022–2024 гг. фракция «Новых людей» голосовала синхронно с «Единой Россией», за исключением технических воздержаний.</p>

      <div class="chart-card">
        <h4>Хронология поведения партии в кризисные моменты</h4>
        <div class="ch-meta">Источник: api.duma.gov.ru, sozd.duma.gov.ru, публикации деловой прессы</div>
        <div id="crisisTimeline"></div>
      </div>

      <div class="sources-fold">
        <div class="sources-fold-head">
          <span class="lbl">Источники и документы — раздел G</span>
          <span class="meta">9 ссылок · стенограммы · указы</span>
          <span class="arr">▾</span>
        </div>
        <div class="sources-fold-body">
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl g"></span>🟢 Документ — первоисточник</div>
            <a href="../research/compromat/01-parties/01-novye-lyudi/G-crisis-behavior.md" target="_blank">Полный текст раздела G в досье</a>
          </div>
        </div>
      </div>
    </section>

    <section class="party-sec" id="foreign" data-toc-id="foreign">
      <div class="party-sec-mark">H · Зарубежные связи</div>
      <h2>Иностранное финансирование — не выявлено</h2>
      <p>В соответствии со ст. 30 ФЗ № 95-ФЗ «О политических партиях», иностранные пожертвования российским партиям прямо запрещены. В публичных грантовых базах National Endowment for Democracy (NED), Open Society Foundations, Heinrich Böll Stiftung, Friedrich Ebert Stiftung, Friedrich Naumann Stiftung, MacArthur, Ford, Carnegie — данных о финансировании партии «Новые люди» нет.</p>
      <p>Полный обзор зарубежных связей всех российских партий — в <a href="../research/compromat/03-additional-cuts/04-foreign-ties.md" target="_blank">04-foreign-ties.md</a>.</p>

      <div class="sources-fold">
        <div class="sources-fold-head">
          <span class="lbl">Источники и документы — раздел H</span>
          <span class="meta">12 проверенных грантовых баз · 0 совпадений</span>
          <span class="arr">▾</span>
        </div>
        <div class="sources-fold-body">
          <div class="sgroup">
            <div class="sgroup-h"><span class="lvl g"></span>🟢 Документ — первоисточник</div>
            <a href="../research/compromat/03-additional-cuts/04-foreign-ties.md" target="_blank">04-foreign-ties.md — общий доклад по зарубежным связям</a>
            <a href="https://www.lexology.com/library/detail.aspx?g=069456c2-3b02-45e7-ad37-7358ed70a2db" target="_blank" rel="noopener">Lexology — обзор политического финансирования в РФ (ст. 30 ФЗ-95)</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

</main>

<!-- Inline page render (calls into vote-bar.js + timeline-vert.js after they load) -->
<script>
window.renderPartyContent = function() {
  // E. Voting — bar chart
  var votingRoot = document.getElementById('votingBars');
  if (votingRoot && typeof renderVoteBar === 'function') {
    [
      { law: '04.03.2022 ФЗ-32 фейки об армии', for: 13, against: 0, abstain: 0, skip: 2 },
      { law: '20.09.2022 мобилизация (Даванков соавтор)', for: 13, against: 0, abstain: 0, skip: 2 },
      { law: '03.10.2022 аннексия 4 регионов', for: 13, against: 0, abstain: 0, skip: 2 },
      { law: '24.11.2022 ЛГБТ-пропаганда', for: 14, against: 0, abstain: 0, skip: 1 },
      { law: '14.07.2023 запрет смены пола', for: 14, against: 1, abstain: 0, skip: 0, subtitle: 'Горячева — против' },
      { law: '25.07.2023 призывной возраст до 30', for: 0, against: 12, abstain: 0, skip: 3, subtitle: 'единственный системный «против»' },
      { law: '31.01.2024 конфискация за фейки', for: 0, against: 0, abstain: 0, skip: 13, subtitle: 'тактическое отсутствие' },
      { law: '22.07.2025 ФЗ-281 о VPN', for: 2, against: 12, abstain: 1, skip: 0, subtitle: 'фракционно против' }
    ].forEach(function(d) { renderVoteBar(votingRoot, d); });
    if (typeof renderVoteBarLegend === 'function') {
      renderVoteBarLegend(votingRoot.parentElement);
    }
  }

  // G. Crisis — timeline
  var crisisRoot = document.getElementById('crisisTimeline');
  if (crisisRoot && typeof renderTimelineVert === 'function') {
    renderTimelineVert(crisisRoot, [
      { date: '22.02.2022', text: '<strong>Признание ДНР/ЛНР</strong> — фракция «за», 13/0/0/2. Проект внесла КПРФ.' },
      { date: '04.03.2022', text: '<strong>ФЗ-32 фейки об армии</strong> — фракция «за», 13/0/0/2.' },
      { date: '20.09.2022', text: '<strong>Мобилизация</strong> — фракция «за». В.А. Даванков лично — соавтор поправок II чтения.' },
      { date: '03.10.2022', text: '<strong>Аннексия 4 регионов</strong> — фракция «за», 13/0/0/2.' },
      { date: '22.03.2024', muted: true, text: 'Теракт «Крокус Сити Холл». А. Нечаев на той же неделе анонсирует <strong>инициативу «Мигрант ID»</strong>.' },
      { date: '17.03.2024', muted: true, text: 'Президентские выборы. <strong>Даванков — 3,85%</strong>, 3-е место. Лозунг кампании: «мир и переговоры».' }
    ]);
  }

  // B. Financing — placeholder for future Chart.js bar (skip in this phase, just render text)
  // Could be replaced with a Chart.js bar chart in a follow-up.
};
</script>

<script src="../assets/js/lib/scroll-spy.js"></script>
<script src="../assets/js/components/vote-bar.js"></script>
<script src="../assets/js/components/timeline-vert.js"></script>
<script src="../assets/js/components/sources-fold.js"></script>
<script src="../assets/js/pages/party.js"></script>

</body>
</html>
```

- [ ] **Step 3: Smoke-test page**

```bash
cd ./
python3 -m http.server 8765 > /tmp/httpserver.log 2>&1 &
SERVER_PID=$!
sleep 1
curl -sI http://localhost:8765/partii/novye-lyudi.html | head -1
curl -s http://localhost:8765/partii/novye-lyudi.html | grep -c '<section'
kill $SERVER_PID
```

Expected: `HTTP/1.0 200 OK`, 8 `<section` matches.

- [ ] **Step 4: Commit**

```bash
cd ./
git add partii/novye-lyudi.html
git commit -m "feat(partii): add Novye Lyudi deep page (slug: novye-lyudi)"
```

---

### Task 5: КПРФ (`/partii/kprf.html`)

**Files:**
- Create: `partii/kprf.html`

Используем тот же шаблон, что в Task 4, но:
- Hero stats: 18,93% на ГД-2021, 84% бюджета 2024, 94% поддержки ограничений 2022–2025, 2-я по электоральной силе фракция
- Контент из `research/compromat/01-parties/02-kprf/{A,B,C,D,E,F,G}.md`
- Воспроизвести структуру 8 секций
- Главный нарратив: «функциональное разделение» — социалка vs военно-репрессивная повестка

- [ ] **Step 1: Прочитать `02-kprf/README.md` и каждый из A–G файлов**

```bash
cat ./research/compromat/01-parties/02-kprf/README.md
cat ./research/compromat/01-parties/02-kprf/A-origins.md
cat ./research/compromat/01-parties/02-kprf/B-financing.md
cat ./research/compromat/01-parties/02-kprf/C-leaders.md
cat ./research/compromat/01-parties/02-kprf/D-state-ties.md
cat ./research/compromat/01-parties/02-kprf/E-voting.md
cat ./research/compromat/01-parties/02-kprf/F-managed-opposition.md
cat ./research/compromat/01-parties/02-kprf/G-crisis-behavior.md
```

- [ ] **Step 2: Создать `partii/kprf.html`**

Скопировать `partii/novye-lyudi.html` как стартовый шаблон и заменить:

1. Title, meta description, og:title, og:description, og:url, canonical
2. Crumb: `Главная / Партии / КПРФ`
3. Hero meta: «Парламентская фракция · 1993 — наши дни · 57 мандатов в VIII Думе»
4. H1 hero: `КПРФ — <em>оппозиция</em>, голосующая <span class="acc">«за»</span>.`
5. Hero deck: 1 абзац о двойственности партии — социалка против пенсионной реформы, но «за» все военно-репрессивные законы.
6. Hero stats:
   - `18,93%` — на ГД-2021 (10,66 млн голосов, 57 мандатов)
   - `84%` — доля бюджета 2024
   - `94%` — поддержки ограничений 2022–2025 (с пометкой «но `100%` соц-эконом — против»)
   - `407 млн ₽` — alert — чистая прибыль с президентской кампании Харитонова 2024 (Forbes)
7. **8 секций A–H** — пересказ контента из MD-файлов, с inline-ссылками. Длина каждой секции: 4–6 параграфов + chart-card (в E — vote-bars; в G — timeline; в B — реальная chart-card будет описана текстом для Phase 2, без Chart.js).

Для секции **E.Voting** в `renderPartyContent` нужно подготовить vote-bars для КПРФ:

```js
[
  { law: '07.03.2019 пакет Клишаса (фейки)', for: 0, against: 40, abstain: 0, skip: 2, subtitle: 'фракционно против' },
  { law: '16.04.2019 Суверенный Рунет ФЗ-90', for: 0, against: 33, abstain: 0, skip: 10, subtitle: 'фракционно против' },
  { law: '11.03.2020 Конституция (поправки)', for: 0, against: 0, abstain: 43, skip: 0, subtitle: 'единогласно воздержались' },
  { law: '11.03.2022 электоральная реформа', for: 0, against: 41, abstain: 0, skip: 16, subtitle: 'фракционно против с ЛДПР+СРЗП' },
  { law: '04.03.2022 ФЗ-32 фейки об армии', for: 51, against: 0, abstain: 0, skip: 6, subtitle: 'фракционно за' },
  { law: '20.09.2022 мобилизация (Зюганов соавтор)', for: 51, against: 0, abstain: 0, skip: 6 },
  { law: '14.07.2023 запрет смены пола (Зюганов соавтор)', for: 49, against: 0, abstain: 0, skip: 8 },
  { law: '22.07.2025 ФЗ-281 о VPN', for: 0, against: 51, abstain: 0, skip: 6, subtitle: 'фракционно против' }
]
```

В секции **F (Managed Opposition)** — главный кейс «Коммунисты России» как спойлер + истории Селезнёва, Семигина, Грудинина, Рашкина, Левченко, Бондаренко.

В секции **G (Crisis)** timeline:

```js
[
  { date: '22.02.2022', text: '<strong>Ратификация ДНР/ЛНР</strong> — 51/0/0/6. КПРФ внесла проект первой; Зюганов и Обухов отсутствовали по COVID, но в протоколе значатся «за».' },
  { date: '04.03.2022', text: '<strong>ФЗ-32 о фейках об армии</strong> — фракционно «за». Юрий Синельщиков с трибуны: «закон не допустит порочащей информации о ВС».' },
  { date: '20.09.2022', text: '<strong>Мобилизация</strong> — фракционно «за». <strong>Зюганов лично — соавтор</strong>.' },
  { date: '03.10.2022', text: '<strong>Аннексия 4 регионов</strong> — фракционно «за». Юрий Афонин с трибуны: «уверенно, дружно и с большой надеждой и радостью».' },
  { date: '14.07.2023', text: '<strong>Запрет смены пола</strong> — Зюганов соавтор закона.' },
  { date: '25.05.2022', muted: true, text: '<strong>Лишение мандата В. Рашкина</strong> по «лосиному делу» (приговор 22.04.2022 — 3 года условно).' },
  { date: '17.03.2024', muted: true, text: 'Президентские выборы. <strong>Харитонов — 4,31%</strong>, 4-е место. Чистая прибыль кампании ≈407 млн ₽ (Forbes).' }
]
```

Секция **H (Foreign Ties) для КПРФ — короткая**: 0 задокументированных иностранных потоков (как у НЛ), ст. 30 ФЗ-95.

Полный текст секций A–G — взять из MD-файлов (см. Step 1) и сократить до ~3–6 ёмких параграфов на секцию с inline-ссылками.

**Sources-fold** в каждой секции должен включать:
- 🟢 link на соответствующий `research/compromat/01-parties/02-kprf/<X>.md` файл
- 🟢 ссылки на ключевые `research/compromat/05-evidence/duma-api/votes/<...>.xml`
- 🟢 указ Героя Труда: `research/compromat/05-evidence/kremlin-decrees/decree-zyuganov-geroy-truda.pdf`
- 🟡 ключевые публикации (Forbes, Коммерсантъ, РБК, Голос)

- [ ] **Step 3: Smoke-test page**

```bash
cd ./
python3 -m http.server 8765 > /tmp/httpserver.log 2>&1 &
SERVER_PID=$!
sleep 1
curl -sI http://localhost:8765/partii/kprf.html | head -1
curl -s http://localhost:8765/partii/kprf.html | grep -c '<section'
kill $SERVER_PID
```

Expected: `HTTP/1.0 200 OK`, 8 `<section` matches.

- [ ] **Step 4: Commit**

```bash
cd ./
git add partii/kprf.html
git commit -m "feat(partii): add KPRF deep page (slug: kprf)"
```

---

### Task 6: ЛДПР (`/partii/ldpr.html`)

**Files:**
- Create: `partii/ldpr.html`

Аналогично Task 5, но для ЛДПР:

- [ ] **Step 1: Прочитать `04-ldpr/README.md` и A–G файлы**

```bash
cat ./research/compromat/01-parties/04-ldpr/README.md
cat ./research/compromat/01-parties/04-ldpr/A-origins.md
# ... + B/C/D/E/F/G
```

- [ ] **Step 2: Создать `partii/ldpr.html`**

Замены относительно шаблона novye-lyudi:

1. Hero meta: «Парламентская фракция · 1991 — наши дни · 23 мандата в VIII Думе»
2. H1: `ЛДПР — партия <em>после</em> <span class="acc">Жириновского</span>.`
3. Hero deck: смерть Жириновского 06.04.2022, Слуцкий, Луговой как соавтор закона об иноагентах.
4. Hero stats:
   - `7,55%` — на ГД-2021 (4,25 млн голосов, 23 мандата)
   - `89%` — доля бюджета 2024
   - `98%` — поддержки ограничений 2022–2025
   - alert: дело Литвиненко — Луговой соавтор ФЗ-255 об иноагентах

Секция **E.Voting** — vote-bars:

```js
[
  { law: '04.03.2022 ФЗ-32 фейки об армии', for: 18, against: 0, abstain: 0, skip: 5 },
  { law: '14.07.2022 ФЗ-255 иноагенты (Луговой соавтор)', for: 18, against: 0, abstain: 0, skip: 5 },
  { law: '20.09.2022 мобилизация (Слуцкий соавтор)', for: 18, against: 0, abstain: 0, skip: 5 },
  { law: '14.07.2023 запрет смены пола (Слуцкий соавтор)', for: 19, against: 0, abstain: 0, skip: 4 },
  { law: '25.07.2023 призывной возраст до 30', for: 0, against: 0, abstain: 0, skip: 22, subtitle: 'тактически отсутствовали' },
  { law: '20.05.2025 цифровой контроль мигрантов', for: 18, against: 0, abstain: 0, skip: 5 },
  { law: '22.07.2025 ФЗ-281 о VPN', for: 4, against: 0, abstain: 0, skip: 17, subtitle: 'фракционно за/тактически отсут.' }
]
```

Секция **F** — главный кейс: ЛДПР как «поглотитель» промышленно-патриотического сегмента (Журавлёв-Родина → ЛДПР, Бабкин-Партия дела → ЛДПР после ликвидации).

Секция **G** — timeline:

```js
[
  { date: '06.04.2022', text: '<strong>Смерть В. Жириновского</strong>. Председатель партии 33 года.' },
  { date: '27.05.2022', text: '<strong>Слуцкий избран председателем партии</strong> единогласно (XXXIV внеочередной съезд).' },
  { date: '14.07.2022', text: '<strong>ФЗ-255 единый закон об иноагентах</strong> — А. Луговой соавтор.' },
  { date: '21.01.2016', muted: true, text: 'Отчёт сэра Роберта Оуэна: <strong>Луговой и Ковтун положили полоний-210 в чайник</strong>. Луговой под санкциями HM Treasury.' },
  { date: '17.03.2024', muted: true, text: 'Президентские выборы. <strong>Слуцкий — 3,2%</strong>, 4-е место.' }
]
```

Sources-fold должны включать:
- `research/compromat/05-evidence/duma-api/votes/inoagent-united.xml`
- `research/compromat/05-evidence/sozd-bills/113045-8.html` (ФЗ-255)
- `research/compromat/05-evidence/gov-uk/litvinenko-inquiry-report.pdf`
- `research/compromat/05-evidence/ofac-sanctions/lugovoy-extract.csv`
- `research/compromat/05-evidence/gov-uk/uk-sanctions-litvinenko.csv`

- [ ] **Step 3: Smoke-test**

```bash
cd ./
python3 -m http.server 8765 > /tmp/httpserver.log 2>&1 &
SERVER_PID=$!
sleep 1
curl -sI http://localhost:8765/partii/ldpr.html | head -1
curl -s http://localhost:8765/partii/ldpr.html | grep -c '<section'
kill $SERVER_PID
```

Expected: 200, 8 sections.

- [ ] **Step 4: Commit**

```bash
cd ./
git add partii/ldpr.html
git commit -m "feat(partii): add LDPR deep page (slug: ldpr)"
```

---

### Task 7: СРЗП (`/partii/srzp.html`)

**Files:**
- Create: `partii/srzp.html`

- [ ] **Step 1: Прочитать `05-srzp/README.md` и A–G файлы**

```bash
cat ./research/compromat/01-parties/05-srzp/README.md
# + A/B/C/D/E/F/G
```

- [ ] **Step 2: Создать `partii/srzp.html`**

Замены:
1. Hero meta: «Парламентская фракция · 2006 (СР) → 2021 (СРЗП) → 2025 (СР) · 27 мандатов в VIII Думе»
2. H1: `СРЗП — административный <em>конструкт</em> в <span class="acc">три волны</span>.`
3. Hero deck: 28.10.2006 (Сурков создал СР) → 26.03.2021 (Кириенко слил с «За правду» Прилепина) → 25.10.2025 (обратное переименование, Кириенко открыто на съезде).
4. Hero stats:
   - `7,46%` — на ГД-2021 (4,2 млн голосов, 27 мандатов)
   - `76%` — доля бюджета 2024 (минимальная среди парламентских)
   - `98%` — поддержки ограничений 2022–2025
   - alert: цифровой рубль ФЗ-340 — Аксаков автор закона

Секция **E.Voting** — vote-bars:

```js
[
  { law: '04.03.2022 ФЗ-32 фейки об армии', for: 21, against: 0, abstain: 0, skip: 6 },
  { law: '20.09.2022 мобилизация (Нилов соавтор)', for: 21, against: 0, abstain: 0, skip: 6 },
  { law: '24.11.2022 ЛГБТ-пропаганда (Миронов соавтор)', for: 21, against: 0, abstain: 0, skip: 6 },
  { law: '14.07.2023 запрет смены пола (Миронов соавтор)', for: 22, against: 0, abstain: 0, skip: 5 },
  { law: '24.07.2023 цифровой рубль ФЗ-340 (Аксаков автор)', for: 22, against: 0, abstain: 0, skip: 5 },
  { law: '25.07.2023 призывной возраст до 30', for: 0, against: 0, abstain: 23, skip: 5, subtitle: 'фракционно воздержались' },
  { law: '20.05.2025 цифровой контроль мигрантов', for: 0, against: 0, abstain: 22, skip: 5, subtitle: 'фракционно воздержались' },
  { law: '22.07.2025 ФЗ-281 о VPN', for: 4, against: 3, abstain: 20, skip: 1, subtitle: 'смешанная позиция' }
]
```

Секция **G** — timeline:

```js
[
  { date: '28.10.2006', muted: true, text: 'Создание <strong>«Справедливой России»</strong> — слияние «Партии жизни» Миронова + «Партии пенсионеров» + «Родины» при участии замглавы АП В. Суркова.' },
  { date: '26.03.2021', text: 'Регистрация Минюстом изменений: <strong>СР + «За правду» Прилепина + «Патриоты России» Семигина = СРЗП</strong>. Куратор — С. Кириенко.' },
  { date: '04.03.2022', text: '<strong>ФЗ-32 о фейках об армии</strong> — фракционно «за».' },
  { date: '20.09.2022', text: '<strong>Мобилизация</strong> — фракционно «за». О.А. Нилов лично — соавтор поправок.' },
  { date: '06.05.2023', muted: true, text: '<strong>Покушение на Прилепина</strong>. Взрыв Audi Q7 в Нижегородской обл.; погиб водитель А. Шубин.' },
  { date: '06.06.2023', muted: true, text: '<strong>Орден Мужества</strong> Прилепину — указ Президента №416 от 06.06.2023.' },
  { date: '24.07.2023', text: '<strong>Цифровой рубль ФЗ-340</strong> — А.Г. Аксаков (СРЗП) автор закона.' },
  { date: '25.10.2025', muted: true, text: '<strong>Партия снова «Справедливая Россия»</strong>. Прилепин понижен до зам. председателя. С. Кириенко открыто выступает на съезде с приветствием от Путина.' }
]
```

Sources-fold должны включать:
- `research/compromat/05-evidence/duma-api/votes/digital-ruble-1.xml` (ФЗ-340)
- `research/compromat/05-evidence/duma-api/votes/digital-ruble-2.xml`
- `research/compromat/05-evidence/sozd-bills/270838-8.html`, `270852-8.html`
- `research/compromat/05-evidence/kremlin-decrees/decree-416-2023-06-06-state-awards-incl-prilepin.pdf`

- [ ] **Step 3: Smoke-test**

Same as Task 6.

- [ ] **Step 4: Commit**

```bash
cd ./
git add partii/srzp.html
git commit -m "feat(partii): add SRZP deep page (slug: srzp)"
```

---

### Task 8: ЕР (`/partii/er.html`) — минимальная страница

**Files:**
- Create: `partii/er.html`

ЕР не имеет dossier в `research/compromat/01-parties/`. Делаем **минимальную страницу** в том же шаблоне, но без секций E–H в полном объёме. Цель — чтобы клик по карточке ЕР с главной не давал 404, и чтобы был фон-сравнения с другими партиями.

- [ ] **Step 1: Создать `partii/er.html`**

Структура:
- Стандартный head/topnav/breadcrumb
- Hero c новыми параметрами:
  - meta: «Партия власти · 2003 — наши дни · 325 мандатов в VIII Думе»
  - H1: `«Единая Россия» — <em>325 мандатов</em>, <span class="acc">100% поддержки</span>.`
  - deck: партия конституционного большинства, реальный авторитет которой не оспаривается ни одной из «оппозиционных» фракций.
  - 4 stats: 49,82% на ГД-2021, 39% бюджета 2024 (8,8 млрд ₽ дохода), 100% поддержки ограничительных законов, 325 мандатов из 450
- 4 коротких секций (вместо 8):
  - **A. Происхождение** (1 параграф) — слияние «Единства» + «Отечества» — «Вся Россия» в декабре 2001 г.; преемник «Единства»-1999, фактически партии Путина.
  - **B. Финансирование** (1 параграф) — около 8,8 млрд ₽ дохода в 2024, бюджет даёт 39% (минимум среди парламентских — у партии много частных и юр-лиц). Расчётная база: 152 ₽ × 28 064 200 голосов = 4,27 млрд ₽/год из бюджета. Остальное — пожертвования бизнеса, в т.ч. с государственными контрактами.
  - **C. Авторы ключевых ограничительных законов** (1–2 параграфа) — Володин, Хинштейн, Боярский, Аксёнов, Картаполов, Карлов, Толстой, Пискарёв.
  - **E. Голосование** (короткий vote-bar): 100% «за» по всем ограничениям. График + тезис «партия конституционного большинства не нуждается в голосах оппозиции для принятия закона — даже консолидированная оппозиция не способна заблокировать закон, поэтому её роль сводится к политическому позиционированию».
- В каждой секции — sources-fold, в основном со ссылками на главную: «эти данные синхронны с матрицей голосований на главной странице».

- [ ] **Step 2: Smoke-test**

```bash
cd ./
python3 -m http.server 8765 > /tmp/httpserver.log 2>&1 &
SERVER_PID=$!
sleep 1
curl -sI http://localhost:8765/partii/er.html | head -1
kill $SERVER_PID
```

Expected: 200.

- [ ] **Step 3: Commit**

```bash
cd ./
git add partii/er.html
git commit -m "feat(partii): add ER (Единая Россия) deep page (minimal — no detailed dossier)"
```

---

### Task 9: Финальная проверка ссылок и интеграции

**Files:**
- Modify: возможно `assets/js/data/extended-parties.js` (если href нужно поправить)

- [ ] **Step 1: Проверить, что все 5 hrefs в EXTENDED_PARTIES ведут на существующие файлы**

```bash
cd ./
for f in partii/er.html partii/kprf.html partii/ldpr.html partii/srzp.html partii/novye-lyudi.html; do
  if [ -f "$f" ]; then echo "OK: $f"; else echo "MISSING: $f"; fi
done
```

Если все 5 OK — переходим к Step 2. Если что-то отсутствует, вернуться к Tasks 4–8.

- [ ] **Step 2: Проверить кросс-ссылки на главной странице**

Запустить `python3 -m http.server`, открыть `http://localhost:8765/` и кликнуть каждую карточку партии (5 карточек в категории «Парламентские»). Каждый клик должен открыть соответствующую `partii/<slug>.html`.

В контейнере без браузера — заменить на curl:

```bash
cd ./
python3 -m http.server 8765 > /tmp/httpserver.log 2>&1 &
SERVER_PID=$!
sleep 1
for slug in er kprf ldpr srzp novye-lyudi; do
  echo -n "$slug: "
  curl -sI "http://localhost:8765/partii/${slug}.html" | head -1
done
kill $SERVER_PID
```

Все 5 должны вернуть `HTTP/1.0 200 OK`.

- [ ] **Step 3: Проверить, что nav-меню (topnav) на каждой партийной странице корректно отмечает «Голосования» как активный пункт**

```bash
grep -l 'class="is-current"' partii/*.html | wc -l
```

Expected: 5 файлов.

- [ ] **Step 4: Проверить относительные пути к assets**

```bash
grep -E 'href="\.\./assets/|src="\.\./assets/' partii/novye-lyudi.html | wc -l
```

Expected: ≥6 (CSS links + JS scripts).

Если у других партий пути отсутствуют — поправить.

- [ ] **Step 5: Final smoke**

```bash
cd ./
python3 -m http.server 8765 > /tmp/httpserver.log 2>&1 &
SERVER_PID=$!
sleep 1
echo "=== Все партийные страницы загружаются ==="
for slug in er kprf ldpr srzp novye-lyudi; do
  bytes=$(curl -s "http://localhost:8765/partii/${slug}.html" | wc -c)
  echo "  $slug: $bytes bytes"
done
echo ""
echo "=== JS files reachable from /partii/ ==="
for js in scroll-spy vote-bar timeline-vert sources-fold party; do
  case $js in
    scroll-spy) path="lib";;
    party) path="pages";;
    *) path="components";;
  esac
  echo -n "  $js: "
  curl -sI "http://localhost:8765/assets/js/${path}/${js}.js" | head -1
done
echo ""
echo "=== CSS files reachable ==="
echo -n "  partii.css: "
curl -sI "http://localhost:8765/assets/css/partii.css" | head -1
kill $SERVER_PID
```

All HTTP statuses should be `200`. Total bytes per page should be 30–50 KB (for the most complete one — novye-lyudi и kprf).

- [ ] **Step 6: Commit (or empty commit if nothing to fix)**

```bash
cd ./
# Only if something was actually fixed:
git add -u
git commit -m "polish(partii): final cross-link verification + path fixes"
# Or empty commit:
git commit --allow-empty -m "polish(partii): cross-link verification — all 5 pages reachable"
```

---

### Task 10: README + spec checklist update

**Files:**
- Modify: `README.md`
- Modify: `docs/superpowers/specs/2026-05-05-compromat-pages-design.md`

- [ ] **Step 1: Update README — отметить Phase 2 как done**

```bash
cat ./README.md | grep -A 10 "## План развития (Roadmap)"
```

Find the section with "Фаза 2–3 (планируется)" line and split into:

```
- **Фаза 2 (завершена):** глубокие страницы парламентских партий — `/partii/{er,kprf,ldpr,srzp,novye-lyudi}.html`
- **Фаза 3 (планируется):** глубокие страницы внепарламентских и спойлеров — `/partii/{yabloko,partiya-rosta,grazhdanskaya-initsiativa,partiya-dela,kommunisty-rossii,pensionery,zelenye,rpss,grazhdanskaya-platforma}.html`
```

- [ ] **Step 2: Update spec — отметить Phase 1 + 2 как завершённые**

В файле `docs/superpowers/specs/2026-05-05-compromat-pages-design.md`, в разделе «§14. Поэтапная реализация», поправить пометки:

- Фаза 1 → ✅ завершена 2026-05-05 (см. план `2026-05-05-compromat-phase-1-index.md`)
- Фаза 2 → ✅ завершена 2026-05-05 (см. план `2026-05-05-compromat-phase-2-parliamentary-pages.md`)

- [ ] **Step 3: Commit**

```bash
cd ./
git add README.md docs/superpowers/specs/2026-05-05-compromat-pages-design.md
git commit -m "docs: mark phase 2 (parliamentary party pages) as complete"
```

---

## Self-Review

**1. Spec coverage:**
- §4 Архитектура страницы партии → Tasks 1–8 ✅
- §4.1 Hero → Tasks 4–8 (per page) ✅
- §4.2 Секции (все открыты) → Tasks 4–8 ✅
- §4.3 Графики/визуализации внутри секций → Tasks 2 (vote-bar), 3 (timeline), 4–7 (per-page integration) ✅
- §4.4 Sticky TOC поведение → Task 1 (CSS), Task 3 (init via party.js) ✅
- Use existing `scroll-spy.js` → Task 3 ✅
- Use CSS classes from `home-compromat.css` → Task 1 (creates partii.css; partial reuse) — note: we create partii.css separately because party-page-specific layout (toc + content grid) is different from home-page layout.

**2. Placeholder scan:**
- No "TBD/TODO/implement later" — all steps have actual code or commands.
- Tasks 5–7 reference dossier MD files for content but don't say "fill in details" — they list specific replacements (hero stats, vote-bar arrays, timelines) and instruct to read source MD before writing.

**3. Type consistency:**
- `renderVoteBar(rootEl, data)` consistent across all uses
- `renderTimelineVert(rootEl, events)` consistent
- `wireSourcesFold()` no-arg — consistent
- `initParty()` no-arg — consistent
- `data-toc-id`/`data-target` pattern same across all sections
- All 5 pages use same TOC/section IDs: `origins`, `financing`, `leaders`, `state-ties`, `voting`, `managed`, `crisis`, `foreign`

**4. Out of scope (deferred):**
- Per-section bar/financing chart with Chart.js — left as text/placeholder (future enrichment)
- Mobile: section-scrolling toc (currently sticky-toc is desktop-only)
- Page transitions (intro popup, feedback FAB) — partii pages don't load these (saving weight)
- ER full dossier — Task 8 is minimal stub. Full dossier is a separate research project (out of phase 2).

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-05-compromat-phase-2-parliamentary-pages.md`. Two execution options:

**1. Subagent-Driven (recommended)** — диспатчу свежего сабагента на каждую задачу, ревью между, быстрая итерация. Хорошо для длинного плана.

**2. Inline Execution** — выполняю задачи в этой сессии через executing-plans, batch с чекпоинтами.

Which approach?
