# Compromat Phase 4 — Cross-Cutting Sujety Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать 6 глубоких тематических страниц (`/sujety/<slug>.html`) — лонгриды по сквозным сюжетам, объединяющим кейсы из всех 14 партий: мобилизация, военный бюджет, спойлеры, муниципальный фильтр, цифровой контроль, ликвидации внепарламентских.

**Architecture:** Каждый сюжет — статический HTML-файл, повторяющий структуру партийных страниц (sticky-TOC + hero + N секций + sources-fold). Контент берётся из `research/compromat/02-cross-cutting/*.md` + `09-betrayal-cases.md`. Cross-link на партийные страницы (`/partii/<slug>.html`) и обратно. Без нового CSS/JS — переиспользуем `partii.css`, `vote-bar.js`, `timeline-vert.js`, `sources-fold.js`, `pages/party.js` (или новый `pages/sujet.js` если нужна разная init-логика).

**Tech Stack:** HTML5, CSS3 + tokens, vanilla JS. Phase 1-3 инфраструктура без изменений.

---

## File Structure

### Создаются (6 страниц + 1 init-скрипт)

| Slug | Тема | Источник контента (cross-cutting) | Связано с партиями |
|---|---|---|---|
| `mobilizatsiya` | 20.09.2022 — кто проголосовал «за» | `09-betrayal-cases.md` (case 1) + duma-api/votes/mobilization-uk.xml | КПРФ, ЛДПР, СРЗП, НЛ |
| `voennyy-byudzhet` | 32,5% казны на оборону | `09-betrayal-cases.md` (case 2) + duma-api/votes/budget-2025.xml | КПРФ, СРЗП (воздержания) |
| `spoylery` | Индустрия двойников | `06-spoilers-industry.md` | КПКР, Пенсионеры, РПСС, Зелёная альтернатива |
| `munitsipalnyy-filtr` | Левченко, Ройзман, Бондаренко | `07-municipal-filter.md` | КПРФ, Гр. платформа |
| `tsifrovoy-kontrol` | Аксаков-цифровой рубль, Луговой-иноагенты | `09-betrayal-cases.md` (case 3 + 4) + sozd-bills/270838-8.html, 113045-8.html | СРЗП, ЛДПР |
| `vneparlamentskie` | Три ликвидации (Партия дела, Гр. инициатива, Партия Роста) | `08-extra-parliamentary-liberals.md` | Партия дела, Гр. инициатива, Партия Роста |

### Создаются (общая инфраструктура)

| Путь | Ответственность |
|---|---|
| `assets/js/pages/sujet.js` | Init для страниц сюжетов: `window.initSujet()` — рендерит scroll-spy для sticky TOC + sources-fold. Auto-init по `data-page="sujet"`. |

### Не трогаются

- `assets/css/partii.css` — переиспользуем как есть для одинакового вида
- `assets/js/components/*.js`, `assets/js/lib/scroll-spy.js`
- Все Phase 1-3 файлы

---

## Общий шаблон страницы сюжета

Структура повторяет `/partii/<slug>.html` Phase 2/3, но с другими заголовками:

1. **`<head>`** — title (sujet-specific), meta description, OG, canonical, fonts, CSS
2. **Skip-link + topnav** — `Главная` is-current (или новая категория «Сюжеты» если хотим выделить)
3. **Crumb**: `Главная / Сюжеты / <Название>`
4. **Hero** (в стиле partii):
   - meta-row: «Сквозной сюжет · 2022—2025 · 5 фракций»
   - H1: лозунг-крюк
   - 4 hero-stat карточек
5. **`<div class="party-page-layout">`** (sticky TOC слева, контент справа)
6. **`<aside class="party-toc">`** с N TOC-entries (зависит от темы; обычно 4-6 разделов)
7. **N секций** (`<section class="party-sec">`) — с inline-ссылками, vote-bars, timelines, cross-links на партийные страницы
8. **Inline `<script>`** с `window.renderSujetContent` (или `renderPartyContent` если переиспользуем `party.js`)
9. **5 component scripts** (тот же набор)

---

## Tasks

### Task 1: pages/sujet.js — общий init для страниц сюжетов

**Files:**
- Create: `assets/js/pages/sujet.js`

Решение: создать отдельный init-скрипт (хотя 90% дубликат `party.js`) — это позволит в будущем добавить sujet-specific behavior без затрагивания party.js. Альтернатива: переиспользовать `party.js` через `data-page="party"` на сюжетных страницах. Принимаем решение в пользу отдельного файла для семантической чистоты.

- [ ] **Step 1: Создать файл**

```js
// Init for /sujety/<slug>.html pages.
// Auto-runs on DOMContentLoaded if main has data-page="sujet".
window.initSujet = function initSujet() {
  // Wire sources-fold click handlers
  if (typeof wireSourcesFold === 'function') wireSourcesFold();

  // Init scroll-spy for sticky TOC
  if (typeof initScrollSpy === 'function' && document.querySelector('.party-toc a[data-target]')) {
    initScrollSpy({
      tocSelector: '.party-toc a[data-target]',
      sectionSelector: 'section[data-toc-id]',
      progressBarSelector: '.party-toc-progress-fill'
    });
  }

  // Hook for per-page render hooks
  if (typeof window.renderSujetContent === 'function') window.renderSujetContent();
};

function tryAutoInitSujet() {
  const main = document.getElementById('main');
  if (main && main.dataset.page === 'sujet') window.initSujet();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', tryAutoInitSujet);
} else {
  tryAutoInitSujet();
}
```

- [ ] **Step 2: Проверить парсинг и закоммитить**

```bash
cd ./
node -c assets/js/pages/sujet.js
git add assets/js/pages/sujet.js
git commit -m "feat(sujety): add page init for cross-cutting sujet pages"
```

---

### Task 2: /sujety/mobilizatsiya.html — мобилизация 20.09.2022

**Files:**
- Create: `sujety/mobilizatsiya.html`

Главная нарративная ось: 20 сентября 2022 г. Госдума за один пленарный день приняла поправки в УК о мобилизации (ст. 337 «самовольное оставление части», ст. 338 «дезертирство», ст. 332 «неисполнение приказа», ст. 339 «уклонение от службы»). Голосование — **413/0/0/37** (vote_id 119076 в api.duma.gov.ru). Все 4 «оппозиционные» фракции — единогласно «за», ноль «против», ноль воздержавшихся. Через 36 часов после голосования начинается мобилизация (указ Президента №647 от 21.09.2022). За 3 месяца — 300 000+ призваны.

**Соавторы поправок II чтения (bill 160006-8 на sozd.duma.gov.ru):**
- Г. А. Зюганов (КПРФ), Ю. В. Афонин (КПРФ), Д. Г. Новиков (КПРФ)
- Л. Э. Слуцкий (ЛДПР)
- О. А. Нилов (СРЗП)
- В. А. Даванков (Новые люди) — единственный соавтор, набравший 3,85% на президентских 2024 как «кандидат мира и переговоров»

- [ ] **Step 1: Прочитать `09-betrayal-cases.md`** для деталей кейса:

```bash
cd ./
sed -n '1,90p' research/compromat/02-cross-cutting/09-betrayal-cases.md
```

(Кейс мобилизации — первый в файле; следующие 80-90 строк содержат расклад голосования + биографии соавторов.)

- [ ] **Step 2: Создать `sujety/mobilizatsiya.html`**

Структура:

**Head/meta**:
- title: `Мобилизация: кто проголосовал «за» 20.09.2022 | Голосование без выбора`
- description: «За один пленарный день — поправки в УК о мобилизации. 413/0/0/37; все 4 "оппозиционные" фракции единогласно "за". Соавторы: Зюганов, Слуцкий, Нилов, Даванков. За 3 месяца — 300 000+ призваны.»
- og:url + canonical = `https://im-not-a-human.github.io/ru-elections/sujety/mobilizatsiya.html`

**Crumb**: `Главная / Сюжеты / Мобилизация`

**Hero**:
- meta-row: `Сквозной сюжет · 20.09.2022 · 4 «оппозиционные» фракции`
- H1: `<em>Мобилизация</em> — <span class="acc">за один день</span>.`
- Lead-paragraph: 20 сентября 2022 г. Госдума за один пленарный день приняла поправки в УК о мобилизации. Голосование — <strong>413/0/0/37</strong>. Все 4 «оппозиционные» фракции (КПРФ, ЛДПР, СРЗП, Новые люди) проголосовали «за» <strong>единогласно</strong>. Через 36 часов начинается мобилизация (указ Президента №647). За 3 месяца — <a href="https://www.kommersant.ru/doc/5570975" target="_blank" rel="noopener">300 000+ призваны</a>.

**Hero stats** (4 cells, `.alert` на эмфатических):
1. `413/0/0/37` (alert) — итоговое голосование
2. `4 из 4` — «оппозиционных» фракций «за», ноль «против»
3. `36 часов` (alert) — между принятием закона и началом мобилизации
4. `300 000+` — призваны за 3 месяца

**TOC** (5 entries):
- A · Закон в один день → `#timeline`
- B · Голосование по фракциям → `#voting`
- C · Соавторы поправок → `#authors`
- D · Кампании «после» → `#after`
- E · Источники → `#sources`

**Section A — Закон в один день** (3-4 параграфа + timeline):
- 19.09.2022 — закон в III чтении не значится в плане работы Госдумы
- 20.09.2022 — экстренно внесены поправки II чтения (24 поправки между 09:00 и 18:00); III чтение в тот же день; вечером — заседание Совета Федерации (мгновенное одобрение); подписан Президентом в ночь
- 21.09.2022 — указ Президента №647 о частичной мобилизации
- 21.09.2022 17:00 — обращение Путина к нации
- Inline-link [текст ФЗ-365 на pravo.gov.ru](http://publication.pravo.gov.ru), [bill card 160006-8](https://sozd.duma.gov.ru/bill/160006-8)
- Включить chart-card with `<div id="lawTimeline"></div>` для timeline.

**Section B — Голосование по фракциям** (с vote-bars):

```js
[
  { law: 'ЕР', for: 318, against: 0, abstain: 0, skip: 0, subtitle: '100% явка, 100% «за»' },
  { law: 'КПРФ', for: 51, against: 0, abstain: 0, skip: 6 },
  { law: 'ЛДПР', for: 18, against: 0, abstain: 0, skip: 5 },
  { law: 'СРЗП', for: 21, against: 0, abstain: 0, skip: 6 },
  { law: 'Новые люди', for: 13, against: 0, abstain: 0, skip: 2 },
  { law: 'ВСЕГО', for: 421, against: 0, abstain: 0, skip: 19, subtitle: 'итого 413 «за» в III чтении (некоторые сменили с II на III)' }
]
```

Прозой: единогласие беспрецедентное. Из 425 присутствовавших — 0 «против», 0 воздержавшихся. Параллельно В. А. Даванков (НЛ) шёл с лозунгом «мир и переговоры» на президентских 2024 — получил 3,85%, 3-е место.

Cross-link на каждую партийную страницу: `/partii/{kprf,ldpr,srzp,novye-lyudi}.html` для подробного контекста.

**Section C — Соавторы поправок** (4-5 параграфов, по одному на ключевого соавтора):
- Г. А. Зюганов (КПРФ) — председатель партии 1993—; кейс «лосиного дела» Рашкина 2022 как противопоставление лояльности.
- Л. Э. Слуцкий (ЛДПР) — председатель ЛДПР с 27.05.2022 (после смерти Жириновского 06.04.2022).
- О. А. Нилов (СРЗП) — зам. председателя фракции; одновременно — соавтор ФЗ-32 о фейках об армии (04.03.2022).
- В. А. Даванков (НЛ) — вице-спикер Госдумы; кампания 2024 «мир и переговоры»; парадокс соавтора-«миротворца».

Cross-link: «Подробное досье на В. А. Даванкова — на странице [«Новые люди»](../partii/novye-lyudi.html)»; аналогично для других.

**Section D — Кампании «после»** (3 параграфа):
- 22.09.2022—22.12.2022: 300 000+ призваны (Коммерсантъ, оценка Минобороны).
- 17.03.2024: Даванков на президентских — 3,85% «мир и переговоры»; Харитонов (КПРФ) — 4,31%; Слуцкий (ЛДПР) — 3,2%. Все три — соавторы или их фракции «за» мобилизацию.
- 21.10.2025: вторая волна мобилизации (по разным источникам, формально не объявлена, но фактически идёт через военкоматы).

**Section E — Sources-fold**:
- 🟢 [vote.duma.gov.ru/119076](http://vote.duma.gov.ru/vote/119076) — поимённое голосование
- 🟢 локальный `../research/compromat/05-evidence/duma-api/votes/mobilization-uk.xml`
- 🟢 локальный `../research/compromat/05-evidence/sozd-bills/160006-8.html` — bill card
- 🟢 [указ Президента №647 от 21.09.2022](http://publication.pravo.gov.ru)
- 🟡 Коммерсантъ, РБК (300 000+ призваны)
- 🔴 авторская интерпретация: `../research/compromat/02-cross-cutting/09-betrayal-cases.md`

**Inline `<script>` — timeline + vote-bars:**

```js
window.renderSujetContent = function() {
  // Law timeline
  var lawRoot = document.getElementById('lawTimeline');
  if (lawRoot && typeof renderTimelineVert === 'function') {
    renderTimelineVert(lawRoot, [
      { date: '19.09.2022', muted: true, text: 'Закон в III чтении <strong>не значится в плане работы Госдумы</strong>.' },
      { date: '20.09.2022 09:00', text: '<strong>II чтение</strong> внесено экстренно; 24 поправки от соавторов из всех «оппозиционных» фракций.' },
      { date: '20.09.2022 18:00', text: '<strong>III чтение</strong>: голосование <strong>413/0/0/37</strong>.' },
      { date: '20.09.2022 вечер', muted: true, text: 'Заседание Совета Федерации — мгновенное одобрение.' },
      { date: '21.09.2022 ночь', muted: true, text: 'Закон подписан Президентом.' },
      { date: '21.09.2022 17:00', text: '<strong>Указ Президента №647 о частичной мобилизации</strong>; обращение Путина к нации.' },
      { date: '22.09—22.12.2022', text: '<strong>300 000+ призваны</strong> (оценка Минобороны).' }
    ]);
  }

  // Voting bars
  var votingRoot = document.getElementById('votingBars');
  if (votingRoot && typeof renderVoteBar === 'function') {
    [
      { law: 'ЕР', for: 318, against: 0, abstain: 0, skip: 0, subtitle: '100% явка, 100% «за»' },
      { law: 'КПРФ', for: 51, against: 0, abstain: 0, skip: 6 },
      { law: 'ЛДПР', for: 18, against: 0, abstain: 0, skip: 5 },
      { law: 'СРЗП', for: 21, against: 0, abstain: 0, skip: 6 },
      { law: 'Новые люди', for: 13, against: 0, abstain: 0, skip: 2 }
    ].forEach(function(d) { renderVoteBar(votingRoot, d); });
    if (typeof renderVoteBarLegend === 'function') {
      renderVoteBarLegend(votingRoot.parentElement);
    }
  }
};
```

**Component scripts** (in this exact order at end of `<body>`):
```html
<script src="../assets/js/lib/scroll-spy.js"></script>
<script src="../assets/js/components/vote-bar.js"></script>
<script src="../assets/js/components/timeline-vert.js"></script>
<script src="../assets/js/components/sources-fold.js"></script>
<script src="../assets/js/pages/sujet.js"></script>
```

`<main id="main" data-page="sujet">` — обязательно.

- [ ] **Step 3: Smoke-test**

```bash
cd ./
mkdir -p sujety
python3 -m http.server 8765 > /tmp/httpserver.log 2>&1 &
SERVER_PID=$!
sleep 1
curl -sI http://localhost:8765/sujety/mobilizatsiya.html | head -1
curl -s http://localhost:8765/sujety/mobilizatsiya.html | grep -c '<section'
kill $SERVER_PID
```

Expected: `200 OK`, ≥5 sections (5 + 1 hero = 6).

- [ ] **Step 4: Commit**

```bash
cd ./
git add sujety/mobilizatsiya.html
git commit -m "feat(sujety): add mobilizatsiya cross-cutting page (slug: mobilizatsiya)"
```

---

### Task 3: /sujety/voennyy-byudzhet.html — 32,5% казны на оборону

**Files:**
- Create: `sujety/voennyy-byudzhet.html`

Главная нарративная ось: ФЗ-419 о бюджете на 2025 год — 32,5% расходов федерального бюджета на «национальную оборону». Голосование 21.11.2024: 313/74/4/59. КПРФ (47 «против») и СРЗП (часть фракции воздержались) формально не одобрили, но **не блокировали**: для блокирования нужно ≥226, у объединённой оппозиции ≤120.

Главный аналитический тезис: фраза «оппозиция против» — формально верна, но **функционально пустая** в системе с конституционным большинством ЕР (325 мандатов из 450). «Оппозиция» имеет голос, но не имеет вето.

- [ ] **Step 1: Прочитать `09-betrayal-cases.md`**:

```bash
sed -n '90,180p' research/compromat/02-cross-cutting/09-betrayal-cases.md
```

- [ ] **Step 2: Создать `sujety/voennyy-byudzhet.html`** в той же структуре, что mobilizatsiya:

**Head/meta**:
- title: `Военный бюджет 2025 — 32,5% казны | Голосование без выбора`
- description: «ФЗ-419 о бюджете на 2025 г. — 32,5% расходов на оборону. Голосование 21.11.2024: 313/74/4/59. КПРФ "против", СРЗП воздержались — но не заблокировали. Конституционное большинство ЕР делает голос оппозиции функционально пустым.»

**Hero stats**:
1. `32,5%` (alert) — расходов федерального бюджета 2025 г. на нац. оборону
2. `13,5 трлн ₽` (alert) — абсолютная сумма «национальная оборона» 2025
3. `≤120` — мандатов у объединённой оппозиции (порог блокирования — 226)
4. `21.11.2024` — дата голосования III чтения

**TOC** (5 entries): origins, voting, math, alternative, sources

**Section A — Истоки ФЗ-419** (2-3 параграфа): процесс принятия бюджета 2025, исторический рост военных расходов с 2014 г. (3,4% → 32,5%); сравнение с другими статьями бюджета.

**Section B — Голосование по фракциям** (с vote-bars):

```js
[
  { law: 'ЕР', for: 318, against: 0, abstain: 0, skip: 7 },
  { law: 'КПРФ', for: 0, against: 47, abstain: 0, skip: 10, subtitle: 'фракционно «против»' },
  { law: 'ЛДПР', for: 18, against: 0, abstain: 0, skip: 5 },
  { law: 'СРЗП', for: 0, against: 0, abstain: 22, skip: 5, subtitle: 'фракционно воздержались' },
  { law: 'Новые люди', for: 14, against: 0, abstain: 0, skip: 1 }
]
```

Прозой: КПРФ против, СРЗП воздержались, ЛДПР+НЛ за — но в сумме «против»+воздержались = 69 голосов; для блокирования нужно ≥226; у ЕР+союзников 350. Голос оппозиции **функционально пустой** — формально оппозиционный, фактически не препятствует.

Cross-link: `/partii/{er,kprf,ldpr,srzp,novye-lyudi}.html`

**Section C — Математика большинства** (2-3 параграфа): объяснение порогов 226/300/338. Конституционное большинство ≥300 (изменение Конституции). 325 ЕР > 300 → возможны любые конституционные изменения; «оппозиция» не может ничего заблокировать. Cross-link на `/vybory.html#ladder` (лестница большинств).

**Section D — Альтернативы** (2 параграфа):
- Что было бы в системе с реальной оппозицией: 32,5% — самая высокая доля среди стран G20; PIPE/SIPRI данные.
- 2014—2025 траектория роста военных расходов как % ВВП.

**Section E — Sources-fold**:
- 🟢 [vote.duma.gov.ru/124183 или аналог](http://vote.duma.gov.ru) для голосования по бюджету
- 🟢 [текст ФЗ-419 на pravo.gov.ru](http://publication.pravo.gov.ru)
- 🟡 РБК, Ведомости, Коммерсантъ — комментарий бюджета 2025
- 🔴 `../research/compromat/02-cross-cutting/09-betrayal-cases.md`

(Vote-bars + textual chart-card; timeline опционально для роста военных расходов.)

- [ ] **Step 3: Smoke-test и commit**

```bash
cd ./
python3 -m http.server 8765 > /tmp/httpserver.log 2>&1 &
SERVER_PID=$!
sleep 1
curl -sI http://localhost:8765/sujety/voennyy-byudzhet.html | head -1
kill $SERVER_PID

git add sujety/voennyy-byudzhet.html
git commit -m "feat(sujety): add voennyy-byudzhet cross-cutting page (slug: voennyy-byudzhet)"
```

---

### Task 4: /sujety/spoylery.html — индустрия двойников

**Files:**
- Create: `sujety/spoylery.html`

Главная нарративная ось: спойлеры — **систематически применяемая инфраструктура** управления выборами. Три слоя: ономастический (двойники-однофамильцы), идеологический (партии-проекты с похожим брендом), технологический (ДЭГ, укрупнение УИКов). Кейсы: Вишневский ЗС СПб 2021, Рашкин МГД-2019, КПКР ГД-2021 (7/15 округов), «лаборатория Богданова».

- [ ] **Step 1: Прочитать `06-spoilers-industry.md`**:

```bash
cat research/compromat/02-cross-cutting/06-spoilers-industry.md | head -200
```

- [ ] **Step 2: Создать `sujety/spoylery.html`**:

**Head/meta**:
- title: `Спойлеры как индустрия — двойники, проекты, технологии | Голосование без выбора`
- description: «Кейс Вишневского ЗС СПб 2021 (3 кандидата с ФИО «Борис Вишневский»). КПКР на ГД-2021 — 7 из 15 московских округов. «Лаборатория Богданова» — 5+ партий разного периода. Памфилова: «позорище».»

**Hero stats**:
1. `3 Вишневских` (alert) — на одном плакате избиркома Центрального района СПб 2021
2. `7 из 15` (alert) — московских одномандатных округов с двойниками против КПРФ на ГД-2021
3. `5+ партий` — «лаборатория Богданова»: ДПР, ПМЕ, КПСС→РПСС и др.
4. `0 запретов` — закон не запрещает смену ФИО на любые

**TOC** (5 entries):
- A · Ономастические спойлеры (двойники)
- B · Идеологические спойлеры (партии-проекты)
- C · «Лаборатория Богданова»
- D · Технологические спойлеры (ДЭГ, УИК)
- E · Источники

**Section A — Ономастические спойлеры**: кейс Бориса Вишневского ЗС СПб 2021 (3-4 параграфа с детальным описанием — в дossier есть полный текст). Памфилова: «позорище». ГД-2021 в Москве — 7 из 15 округов с двойниками против КПРФ. Встроенная HTML-таблица с реальными ФИО двойников из 06-spoilers-industry.md.

**Section B — Идеологические спойлеры**: «Коммунисты России» (cross-link на `/partii/kommunisty-rossii.html`). «Партия пенсионеров за справедливость» (cross-link на `/partii/pensionery.html`). РПСС (cross-link на `/partii/rpss.html`). Зелёная альтернатива (cross-link на `/partii/zelenye.html`).

**Section C — «Лаборатория Богданова»**: А. В. Богданов — политтехнолог-организатор нескольких партий разного периода. Cross-link на `/partii/rpss.html`.

**Section D — Технологические спойлеры**: ДЭГ (Электронное голосование), укрупнение УИКов, отсутствие видеонаблюдения 2024. Cross-link на `/vybory.html#deg`.

**Section E — Sources-fold**:
- 🟢 [Ведомости 08.07.2021 — двойники](https://www.vedomosti.ru/politics/articles/2021/07/08/877494-kandidatam-ot-kprf-nashli-spoilerov-odnofamiltsev)
- 🟢 [Коммерсантъ — Вишневский](https://www.kommersant.ru/doc/4975445)
- 🟢 [BBC — Вишневский](https://www.bbc.com/russian/news-58419812)
- 🔴 `../research/compromat/02-cross-cutting/06-spoilers-industry.md`

- [ ] **Step 3: Smoke-test и commit**

```bash
git add sujety/spoylery.html
git commit -m "feat(sujety): add spoylery cross-cutting page (slug: spoylery)"
```

---

### Task 5: /sujety/munitsipalnyy-filtr.html — кейсы Левченко, Ройзмана, Бондаренко

**Files:**
- Create: `sujety/munitsipalnyy-filtr.html`

Главная нарративная ось: муниципальный фильтр на губернаторских и региональных выборах — формальный механизм отсева оппозиционных кандидатов через сбор подписей муниципальных депутатов (5—10% в каждом муниципалитете, обычно ≥75% муниципалитетов региона). Поскольку 95%+ муниципальных депутатов — ЕР, фильтр непреодолим без согласия ЕР. Кейсы: С. Левченко (КПРФ, Иркутская область, отстранён 2019), Е. Ройзман (Екатеринбург, мэр 2013-2018), Н. Бондаренко (Саратов, исключён 2022).

- [ ] **Step 1: Прочитать `07-municipal-filter.md`**:

```bash
cat research/compromat/02-cross-cutting/07-municipal-filter.md
```

- [ ] **Step 2: Создать `sujety/munitsipalnyy-filtr.html`**:

**Head/meta**:
- title: `Муниципальный фильтр — Левченко, Ройзман, Бондаренко | Голосование без выбора`
- description: «Формальный механизм отсева оппозиционных кандидатов через сбор подписей муниципальных депутатов. 95%+ муниципальных депутатов — ЕР; фильтр непреодолим без согласия ЕР. Кейсы С. Левченко 2019, Е. Ройзмана 2013-2018, Н. Бондаренко 2022.»

**Hero stats**:
1. `5—10%` — подписей муниципальных депутатов в каждом муниципалитете требуется
2. `≥75%` — муниципалитетов региона должны быть охвачены
3. `95%+` (alert) — мандатов муниципальных депутатов у ЕР
4. `2012` — введение фильтра ФЗ-30 (после возврата прямых губернаторских выборов)

**TOC** (5 entries): origins, mechanics, cases, alternatives, sources

**Section A — Истоки фильтра** (2 параграфа): отмена прямых губернаторских выборов 2004 → возврат 2012 с фильтром. ФЗ-30 от 2 мая 2012 г.

**Section B — Механика** (2-3 параграфа): процесс сбора, проверки ЦИК. Реальные пороги: 5—10% × 75%+ муниципалитетов.

**Section C — Кейсы** (4-5 параграфов):
- С. Левченко (КПРФ, Иркутская область): губернатор 2015-2019; отстранён по «делу сына». Cross-link `/partii/kprf.html`.
- Е. Ройзман (Екатеринбург): мэр 2013-2018 при поддержке «Гражданской платформы»; не смог зарегистрироваться на губернаторские из-за фильтра. Cross-link `/partii/grazhdanskaya-platforma.html`.
- Н. Бондаренко (Саратов): депутат Саратовской облдумы; исключён из КПРФ 2022. Cross-link `/partii/kprf.html`.

**Section D — Альтернативы** (2 параграфа): международная практика (Германия, Франция). Что было бы при отмене фильтра.

**Section E — Sources-fold**:
- 🟢 ФЗ-30 от 02.05.2012
- 🟢 решения судов по делам Левченко/Бондаренко
- 🟡 Коммерсантъ, Новая газета (расследования по Иркутской области, Саратову)
- 🔴 `../research/compromat/02-cross-cutting/07-municipal-filter.md`

- [ ] **Step 3: Smoke-test и commit**

```bash
git add sujety/munitsipalnyy-filtr.html
git commit -m "feat(sujety): add munitsipalnyy-filtr cross-cutting page (slug: munitsipalnyy-filtr)"
```

---

### Task 6: /sujety/tsifrovoy-kontrol.html — Аксаков-цифровой рубль, Луговой-иноагенты

**Files:**
- Create: `sujety/tsifrovoy-kontrol.html`

Главная нарративная ось: **двое депутатов «оппозиционных» фракций — авторы ключевых законов цифрового контроля.** А. Г. Аксаков (СРЗП) — автор ФЗ-340 о цифровом рубле (24.07.2023, vote 385/0/1). А. К. Луговой (ЛДПР) — соавтор ФЗ-255 о едином законе об иноагентах (14.07.2022). Луговой одновременно — фигурант доклада сэра Роберта Оуэна 2016 г. как носитель полония-210, убившего Литвиненко в Лондоне 2006.

- [ ] **Step 1: Прочитать `09-betrayal-cases.md`** для деталей цифрового рубля и иноагентов:

```bash
sed -n '180,260p' research/compromat/02-cross-cutting/09-betrayal-cases.md
```

- [ ] **Step 2: Создать `sujety/tsifrovoy-kontrol.html`**:

**Head/meta**:
- title: `Цифровой контроль — Аксаков и Луговой | Голосование без выбора`
- description: «А. Г. Аксаков (СРЗП) — автор ФЗ-340 о цифровом рубле. А. К. Луговой (ЛДПР) — соавтор ФЗ-255 о иноагентах; одновременно фигурант доклада Оуэна 2016 как носитель полония-210, убившего Литвиненко в 2006.»

**Hero stats**:
1. `385/0/1` (alert) — голосование по цифровому рублю ФЗ-340 (24.07.2023)
2. `2 фракции` — «оппозиционных» авторов ключевых законов цифрового контроля
3. `2006 → 2022` (alert) — 16 лет между убийством Литвиненко и соавторством Лугового ФЗ-255
4. `1191` — записей в реестре иноагентов на дату исследования

**TOC** (5 entries):
- A · Цифровой рубль (Аксаков)
- B · Иноагенты (Луговой)
- C · Параллель Литвиненко
- D · Кампания против иноагентов
- E · Источники

**Section A — Цифровой рубль ФЗ-340** (3-4 параграфа): bill 270838-8 + 270852-8. А. Г. Аксаков (председатель комитета ГД по финрынку с 2017 г., СРЗП). Голосование 24.07.2023 — 385/0/1. Cross-link `/partii/srzp.html`. Cross-link на `/tsenzura.html#digital-ruble` для технического контекста цифрового рубля как инструмента слежки.

**Section B — Иноагенты ФЗ-255** (3-4 параграфа): bill 113045-8. А. К. Луговой (зам. пред. комитета по безопасности, ЛДПР). Голосование 14.07.2022. Cross-link `/partii/ldpr.html`.

**Section C — Параллель Литвиненко** (3-4 параграфа): доклад сэра Роберта Оуэна 21.01.2016 — «Луговой и Ковтун положили полоний-210 в чайник». Луговой под санкциями HM Treasury и OFAC. Inline-link [полный отчёт PDF локально](`../research/compromat/05-evidence/gov-uk/litvinenko-inquiry-report.pdf`). 16 лет между убийством (2006) и соавторством закона об иноагентах (2022).

**Section D — Кампания против иноагентов** (3-4 параграфа): рост реестра иноагентов 2017-2026 (с 0 до 1191+ записей). Лица из «Яблока» (Шлосберг, Вишневский) — 11+ в реестре. Cross-link `/partii/yabloko.html`. Inline chart-card with timeline.

**Section E — Sources-fold**:
- 🟢 локальный `../research/compromat/05-evidence/gov-uk/litvinenko-inquiry-report.pdf`
- 🟢 локальный `../research/compromat/05-evidence/sozd-bills/113045-8.html`
- 🟢 локальные `../research/compromat/05-evidence/duma-api/votes/{digital-ruble-1,inoagent-united}.xml`
- 🟢 локальные `../research/compromat/05-evidence/{ofac-sanctions/lugovoy-extract.csv,gov-uk/uk-sanctions-litvinenko.csv}`
- 🟡 РБК, Forbes, Bloomberg
- 🔴 `../research/compromat/02-cross-cutting/09-betrayal-cases.md`

(Inline timeline для секции D: рост реестра иноагентов 2017→2026.)

- [ ] **Step 3: Smoke-test и commit**

```bash
git add sujety/tsifrovoy-kontrol.html
git commit -m "feat(sujety): add tsifrovoy-kontrol cross-cutting page (slug: tsifrovoy-kontrol)"
```

---

### Task 7: /sujety/vneparlamentskie.html — три ликвидации

**Files:**
- Create: `sujety/vneparlamentskie.html`

Главная нарративная ось: **три ликвидации** внепарламентских партий за 2024-2025 гг. Верховным Судом РФ.
1. «Партия дела» (Бабкин) — 27.11.2024
2. «Партия Роста» (Титов) — 20.11.2025 (после слияния с НЛ 19.04.2024)
3. «Гражданская инициатива» (Нечаев) — июнь 2025 (после Надеждина-2024)

Все три — формально техническое нарушение (сокращение региональных отделений), но кейсы по времени совпадают с попытками выйти за рамки декоративности (Бабкин — повышение медиа-активности, Надеждин — массовая публичная кампания, Партия Роста — поглощение).

- [ ] **Step 1: Прочитать `08-extra-parliamentary-liberals.md`**:

```bash
cat research/compromat/02-cross-cutting/08-extra-parliamentary-liberals.md
```

- [ ] **Step 2: Создать `sujety/vneparlamentskie.html`**:

**Head/meta**:
- title: `Три ликвидации — Партия дела, Гражданская инициатива, Партия Роста | Голосование без выбора`
- description: «27.11.2024 ВС РФ ликвидирует «Партию дела» Бабкина. Июнь 2025 — «Гражданскую инициативу» Нечаева. 20.11.2025 — «Партию Роста» Титова. Формально технические нарушения; по времени — после массовых публичных событий.»

**Hero stats**:
1. `3 партии` (alert) — ликвидированы ВС РФ за 12 месяцев 2024-2025
2. `0 партий` — ликвидировано в предшествующие 12 месяцев 2023-2024
3. `Минюст → ВС` — формальное основание во всех трёх случаях
4. `100%` — техническое нарушение (сокращение регионов); ни в одном случае — политическое

**TOC** (5 entries): origins, partiya-dela, gr-init, partiya-rosta, math, sources

**Section A — Контекст ликвидаций** (2 параграфа): после 2022 г. ужесточение требований к партийной регистрации; формальные основания + неформальное согласование.

**Section B — Партия дела (27.11.2024)** (2-3 параграфа): кейс Бабкина-Ростсельмаша, программа 1432, переход в ЛДПР. Cross-link `/partii/partiya-dela.html`.

**Section C — Гражданская инициатива (06.2025)** (3 параграфа): кейс Надеждина-2024, отказ ЦИК 8.02.2024, ликвидация через 16 месяцев. Cross-link `/partii/grazhdanskaya-initsiativa.html`.

**Section D — Партия Роста (20.11.2025)** (2-3 параграфа): кейс Титова-«Абрау-Дюрсо», слияние с НЛ 19.04.2024, формальная ликвидация через 19 месяцев. Cross-link `/partii/partiya-rosta.html`.

**Section E — Хронологическая математика** (2-3 параграфа + timeline): три ликвидации в окне 12 месяцев — это **аномалия** на фоне предыдущих 12 лет (с 2012 г. — 2-3 партии в год средне, но без концентрации).

Включить chart-card with `<div id="liquidationsTimeline"></div>`.

**Section F — Sources-fold**:
- 🟢 решения ВС РФ — локально в `../research/compromat/05-evidence/court-rulings/`
- 🟡 Forbes, Коммерсантъ, РИА
- 🔴 `../research/compromat/02-cross-cutting/08-extra-parliamentary-liberals.md`

**Inline `<script>`**:

```js
window.renderSujetContent = function() {
  var root = document.getElementById('liquidationsTimeline');
  if (root && typeof renderTimelineVert === 'function') {
    renderTimelineVert(root, [
      { date: '07.12.2023', muted: true, text: '<strong>«Гражданская инициатива» выдвигает Б. Надеждина</strong> в Президенты.' },
      { date: '08.02.2024', muted: true, text: '<strong>ЦИК отказывает Надеждину</strong> в регистрации (9,3% «брака»).' },
      { date: '19.04.2024', text: '<strong>«Партия Роста» сливается с «Новыми людьми»</strong>; кадры переходят в НЛ.' },
      { date: '22.04.2024', text: '<strong>Минюст приостанавливает «Партию дела»</strong>.' },
      { date: '27.11.2024', text: '<strong>ВС РФ ликвидирует «Партию дела»</strong>; декабрь 2024 — Бабкин в ЛДПР.' },
      { date: '06.2025', text: '<strong>ВС РФ ликвидирует «Гражданскую инициативу»</strong>.' },
      { date: '20.11.2025', text: '<strong>ВС РФ ликвидирует «Партию Роста»</strong>; формально — техническое нарушение.' }
    ]);
  }
};
```

- [ ] **Step 3: Smoke-test и commit**

```bash
git add sujety/vneparlamentskie.html
git commit -m "feat(sujety): add vneparlamentskie cross-cutting page (slug: vneparlamentskie)"
```

---

### Task 8: Cross-link from index.html (Phase 1 hub) and verification

**Files:**
- Modify: `assets/js/data/cross-cutting.js` (Phase 1) — обновить `href` для 6 карточек
- Verify: все 6 sujety страниц + интеграция

- [ ] **Step 1: Проверить EXTENDED_PARTIES и cross-cutting.js**

```bash
cd ./
grep -n "href" assets/js/data/cross-cutting.js | head -10
```

Если карточки кроссрезов на главной указывают на `sujety/<slug>.html` — отлично; если нет (например `href: "#"`) — обновить:

```js
// В cross-cutting.js должно быть:
{ slug: 'mobilizatsiya', href: 'sujety/mobilizatsiya.html', ... }
{ slug: 'voennyy-byudzhet', href: 'sujety/voennyy-byudzhet.html', ... }
{ slug: 'spoylery', href: 'sujety/spoylery.html', ... }
{ slug: 'munitsipalnyy-filtr', href: 'sujety/munitsipalnyy-filtr.html', ... }
{ slug: 'tsifrovoy-kontrol', href: 'sujety/tsifrovoy-kontrol.html', ... }
{ slug: 'vneparlamentskie', href: 'sujety/vneparlamentskie.html', ... }
```

Если нужны изменения — внести и закоммитить.

- [ ] **Step 2: Smoke-test всех 6 страниц**

```bash
cd ./
python3 -m http.server 8765 > /tmp/httpserver.log 2>&1 &
SERVER_PID=$!
sleep 1
echo "=== Phase 4 (6 sujety) ==="
for slug in mobilizatsiya voennyy-byudzhet spoylery munitsipalnyy-filtr tsifrovoy-kontrol vneparlamentskie; do
  echo -n "$slug: "
  curl -sI "http://localhost:8765/sujety/${slug}.html" | head -1
done
echo "=== existing partii pages still work ==="
for slug in er kprf novye-lyudi yabloko grazhdanskaya-platforma; do
  echo -n "$slug: "
  curl -sI "http://localhost:8765/partii/${slug}.html" | head -1
done
echo "=== main + side ==="
curl -sI "http://localhost:8765/" | head -1
kill $SERVER_PID
```

Все 12 — `200 OK`.

- [ ] **Step 3: Проверить, что отсутствуют битые cross-link на партии**

```bash
cd ./
for f in sujety/*.html; do
  for sibling in $(grep -oE 'partii/[a-z-]+\.html' "$f" | sort -u); do
    if [ ! -f "$sibling" ]; then
      echo "$(basename $f) references missing partii: $sibling"
    fi
  done
done
```

Expected: zero output (все cross-link на партии должны существовать; единственное возможное исключение — `partii/rodina.html`, не входит в Phase 3).

Если найдены ссылки на `rodina.html` — поправить (заменить на текст без anchor).

- [ ] **Step 4: Final commit**

```bash
cd ./
if git diff --quiet HEAD; then
  git commit --allow-empty -m "polish(sujety): phase 4 cross-link verification — all 6 pages reachable"
else
  git add -u
  git commit -m "polish(sujety): phase 4 cross-link verification + path fixes"
fi
```

---

### Task 9: README + spec checklist update

**Files:**
- Modify: `README.md`
- Modify: `docs/superpowers/specs/2026-05-05-compromat-pages-design.md`

- [ ] **Step 1: README**

В секции «План развития (Roadmap)» заменить блок Phase 4:

ИЗ:
```
**Фаза 4 (планируется):** Тематические лонгриды
- Страницы по кроссрезам (`/sujety/<theme>.html`): мобилизация, военный бюджет, спойлеры, муниципальный фильтр, цифровой контроль, ликвидации
- Интерактивные графики, мини-калькуляторы, карты
```

В:
```
**Фаза 4 (завершена, май 2026):** Тематические лонгриды
- 6 страниц: `/sujety/{mobilizatsiya,voennyy-byudzhet,spoylery,munitsipalnyy-filtr,tsifrovoy-kontrol,vneparlamentskie}.html`
- Sticky TOC, vote-bars, vertical timelines, cross-link на 14 партийных страниц и обратно
- План: `docs/superpowers/plans/2026-05-05-compromat-phase-4-sujety-pages.md`
```

- [ ] **Step 2: Spec**

В файле `docs/superpowers/specs/2026-05-05-compromat-pages-design.md` в секции `## 14. Поэтапная реализация`:

ИЗ:
```
**Фаза 4.** 6 страниц-сюжетов (`/sujety/<slug>.html`).
```

В:
```
**Фаза 4 (✅ завершена 2026-05-05).** 6 страниц-сюжетов (`/sujety/<slug>.html`): mobilizatsiya, voennyy-byudzhet, spoylery, munitsipalnyy-filtr, tsifrovoy-kontrol, vneparlamentskie. См. план `docs/superpowers/plans/2026-05-05-compromat-phase-4-sujety-pages.md`.
```

- [ ] **Step 3: Commit**

```bash
cd ./
git add README.md docs/superpowers/specs/2026-05-05-compromat-pages-design.md
git commit -m "docs: mark phase 4 (sujety cross-cutting pages) as complete"
```

---

## Self-Review

**1. Spec coverage:**

| Спека (§2) | План |
|---|---|
| §2 sujet `mobilizatsiya` | Task 2 ✅ |
| §2 sujet `voennyy-byudzhet` | Task 3 ✅ |
| §2 sujet `spoylery` | Task 4 ✅ |
| §2 sujet `munitsipalnyy-filtr` | Task 5 ✅ |
| §2 sujet `tsifrovoy-kontrol` | Task 6 ✅ |
| §2 sujet `vneparlamentskie` | Task 7 ✅ |
| Cross-link с главной (3.4 sujety тизер) | Task 8 ✅ |

**2. Placeholder scan:**
- Нет «TBD/TODO/implement later» — все шаги имеют конкретный код или команды.
- Каждая task ссылается на конкретный cross-cutting MD-файл и указывает строки для чтения; не оставляет содержание «на потом».

**3. Type consistency:**
- `renderTimelineVert(rootEl, events)`, `renderVoteBar(rootEl, data)` — переиспользуем из Phase 2.
- `wireSourcesFold()` — переиспользуем.
- `initSujet()` — новая функция (Task 1), идентичная `initParty()` за исключением имени.
- `data-page="sujet"` — новый атрибут, отдельный от `data-page="party"`.
- `window.renderSujetContent` — новый hook, отдельный от `renderPartyContent`.

**4. Out of scope:**
- Опциональные сюжеты из spec §2 (`donbas-recognition`, `presidential-grants`, `goszakaz-grudinin`) — отложены.
- Интерактивные мини-калькуляторы, карты — отложены (хотя упоминается в README Phase 4 описании, спека их не требует).
- Mobile section-scrolling TOC — sticky-toc desktop-only (наследовано из Phase 2/3).

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-05-compromat-phase-4-sujety-pages.md`. Two execution options:

**1. Subagent-Driven (recommended)** — диспатчу свежего сабагента на каждую задачу, ревью между, быстрая итерация. Tasks 2-7 — Opus 4.7 (контент-адаптация); Tasks 1, 8, 9 — Sonnet 4.6 (mechanical).

**2. Inline Execution** — выполняю задачи в этой сессии через executing-plans, batch с чекпоинтами.

Which approach?
