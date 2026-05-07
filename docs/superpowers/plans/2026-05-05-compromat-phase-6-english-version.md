# Compromat Phase 6 — English Version Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать полную английскую (British English) версию всех страниц проекта в `/en/`. Оригинальные RU-страницы (3 шт.: index/vybory/tsenzura) уже имеют EN-версии (`/en/{index,vybory,tsenzura}.html`); нужно добавить EN-версии для всех новых страниц Phase 1-5: 14 партийных страниц (`/en/partii/*.html`), 6 страниц-сюжетов (`/en/sujety/*.html`) и эксплорер документов (`/en/dokumenty.html`).

**Architecture:** Каждая EN-страница — статический HTML-файл с той же структурой, что RU-оригинал, но с переведённым контентом. Floating EN/RU language switcher уже существует на сайте (см. memory `feedback_chrome_widgets.md` — auxiliary widgets как FAB). Все ссылки внутри `/en/` ведут на `/en/`-страницы; ссылка обратно на `/` через language switcher. Editorial rules уже зафиксированы в memory `project_i18n_decisions.md`.

**Tech Stack:** HTML5 (всё, что есть в RU). Ноль новых JS/CSS зависимостей — переиспользуем `partii.css`, `dokumenty.css`, все компоненты. Только статический контент-перевод.

**Зависимости:** Phase 4 (sujety) и Phase 5 (dokumenty) должны быть завершены **до** Phase 6 — иначе нет источника для перевода. Если они не готовы — Phase 6 можно частично сделать (только partii/) и доделать остальное после Phase 4/5.

---

## Editorial rules (из memory `project_i18n_decisions.md`)

1. **British English** (organisation, behaviour, programme — не organization, behavior, program)
2. **Quote handling**: Russian «...» → English "..." (smart quotes if available)
3. **Russian names**: транслитерация по BGN/PCGN (Yavlinsky, Zyuganov, Slutsky — не Yavlinski, Zjuganov, Slutskij)
4. **Source name policy**: имена RU-источников остаются в RU («Коммерсантъ» не «Kommersant»; «Новая газета» не «Novaya Gazeta»); URLs не меняются
5. **Lang persistence**: язык сохраняется в localStorage (уже реализовано в существующем switcher)
6. **HTML lang attribute**: `<html lang="en">` для EN-страниц
7. **Page-toggle nav**: переводим («Голосования» → «Voting», «Математика выборов» → «Election Mathematics», «Цифровые ограничения» → «Digital Restrictions»)
8. **Brand**: «Голосование без выбора» → «Voting Without Choice» (подтверждено в существующем `/en/index.html`)
9. **Citations of Russian primary sources** keep RU names but add ENGLISH gloss in parens: `Federal Law №32 «о фейках об армии» (Federal Law №32 on "fake news about the armed forces")`

---

## File Structure

### Создаются (21 страница)

| Путь | Источник перевода | Категория |
|---|---|---|
| `en/partii/er.html` | `partii/er.html` | Партии |
| `en/partii/kprf.html` | `partii/kprf.html` | Партии |
| `en/partii/ldpr.html` | `partii/ldpr.html` | Партии |
| `en/partii/srzp.html` | `partii/srzp.html` | Партии |
| `en/partii/novye-lyudi.html` | `partii/novye-lyudi.html` | Партии |
| `en/partii/yabloko.html` | `partii/yabloko.html` | Партии |
| `en/partii/partiya-rosta.html` | `partii/partiya-rosta.html` | Партии |
| `en/partii/grazhdanskaya-initsiativa.html` | `partii/grazhdanskaya-initsiativa.html` | Партии |
| `en/partii/partiya-dela.html` | `partii/partiya-dela.html` | Партии |
| `en/partii/kommunisty-rossii.html` | `partii/kommunisty-rossii.html` | Партии |
| `en/partii/pensionery.html` | `partii/pensionery.html` | Партии |
| `en/partii/zelenye.html` | `partii/zelenye.html` | Партии |
| `en/partii/rpss.html` | `partii/rpss.html` | Партии |
| `en/partii/grazhdanskaya-platforma.html` | `partii/grazhdanskaya-platforma.html` | Партии |
| `en/sujety/mobilizatsiya.html` | `sujety/mobilizatsiya.html` (Phase 4) | Сюжеты |
| `en/sujety/voennyy-byudzhet.html` | `sujety/voennyy-byudzhet.html` (Phase 4) | Сюжеты |
| `en/sujety/spoylery.html` | `sujety/spoylery.html` (Phase 4) | Сюжеты |
| `en/sujety/munitsipalnyy-filtr.html` | `sujety/munitsipalnyy-filtr.html` (Phase 4) | Сюжеты |
| `en/sujety/tsifrovoy-kontrol.html` | `sujety/tsifrovoy-kontrol.html` (Phase 4) | Сюжеты |
| `en/sujety/vneparlamentskie.html` | `sujety/vneparlamentskie.html` (Phase 4) | Сюжеты |
| `en/dokumenty.html` | `dokumenty.html` (Phase 5) | Документы |

### Не трогаются

- Все RU-страницы Phase 1-5
- Существующие `/en/{index,vybory,tsenzura}.html` (уже переведены)
- Floating EN/RU switcher (FAB) — уже работает; будет автоматически работать на новых EN-страницах при наличии правильных `<html lang>` и URL-pattern

### Возможно потребуется обновление

- Существующий floating EN/RU switcher — если его логика жёстко перечисляет страницы, нужно расширить список (или сделать regex-based для `/partii/<slug>.html` → `/en/partii/<slug>.html` и т.д.)
- `assets/js/data/extended-parties.js` (Phase 1) — `href` может потребовать вариант для EN (опционально; switcher и так делает URL-rewrite)

---

## Общий шаблон EN-страницы

Структура — копия RU-оригинала, отличия:

1. **`<html lang="en">`**
2. **Title/meta description/OG description** — все на английском (BrE)
3. **OG url + canonical** — `https://im-not-a-human.github.io/ru-elections/en/<path>` (с `/en/` префиксом)
4. **Asset paths** — `../../assets/...` (на 2 уровня выше из `/en/partii/` или `/en/sujety/`); для `/en/dokumenty.html` — `../assets/...`
5. **Topnav** — те же 3 ссылки, но labels переведены, и href ведут на `/en/index.html`, `/en/vybory.html`, `/en/tsenzura.html`
6. **Crumb** — `Home / Parties / KPRF` etc.
7. **Hero/sections** — content переведён
8. **Sources-fold blocks**:
   - Заголовки группы переведены: «🟢 Document — primary source», «🟡 Business press», «🟠 Single-source investigation», «🔴 Author interpretation»
   - Имена RU-источников остаются в RU («Коммерсантъ»), но с ENG-глоссом в скобках при первом упоминании
9. **Inline `<script>`** — данные в массивах переведены (text-поля), но dates остаются в формате DD.MM.YYYY (международно понятный)
10. **Cross-link на /partii/<slug>.html** — становится `<slug>.html` (внутри `/en/partii/`); cross-link на главную → `../index.html` или `/en/index.html`

---

## Tasks

### Task 1: Translation of partii/er.html (minimal page — pilot)

**Files:**
- Create: `en/partii/er.html`

ER — самая простая страница (4 секции, ~24 KB). Используется как **пилот** для отработки editorial rules перед остальными 13 партиями.

- [ ] **Step 1: Прочитать оригинал**

```bash
cd ./
cat partii/er.html
```

- [ ] **Step 2: Создать `en/partii/er.html`** с переводом

Editorial decisions для ER:
- Title: `«Единая Россия» — 325 мандатов и 100% поддержки` → `«Единая Россия» (United Russia) — 325 seats, 100% support`
- Hero meta `Партия власти · 2003 — наши дни · 325 мандатов в VIII Думе` → `Ruling party · 2003 — present · 325 seats in 8th Duma`
- H1 `«Единая Россия» — 325 мандатов, 100% поддержки.` → `«Единая Россия» (United Russia) — 325 seats, 100% support.`
- Hero deck: переведён в BrE (organisation/behaviour/programme)
- Hero stats labels translated; numbers identical
- Section A — translated; mentions of «Единство», «Отечество — Вся Россия» kept in RU with EN gloss in parens
- Section B — financial figures translated; «КПРФ» → «КПРФ (KPRF)» on first mention, then KPRF
- Section C — list of MPs deputies kept with RU names + transliteration: «Володин (Vyacheslav Volodin)», «Хинштейн (Alexander Khinshtein)»
- Section E — single vote-bar with English subtitle «100% party-line for» 

Topnav labels:
- «Голосования» → «Voting (parties)»
- «Математика выборов» → «Election Mathematics»
- «Цифровые ограничения» → «Digital Restrictions»

Brand: «Голосование без выбора» → «Voting Without Choice»

Asset paths: `../../assets/...` (2 уровня выше)

- [ ] **Step 3: Smoke-test**

```bash
cd ./
mkdir -p en/partii
python3 -m http.server 8765 > /tmp/httpserver.log 2>&1 &
SERVER_PID=$!
sleep 1
curl -sI http://localhost:8765/en/partii/er.html | head -1
# Verify language attribute
curl -s http://localhost:8765/en/partii/er.html | grep -oE '<html [^>]+>'
kill $SERVER_PID
```

Expected: `200 OK`, `<html lang="en">`.

- [ ] **Step 4: Commit**

```bash
cd ./
git add en/partii/er.html
git commit -m "feat(en): translate partii/er.html to English (slug: en/partii/er)"
```

---

### Tasks 2-14: Translation of remaining 13 партийных страниц

Каждая task — ОДНА партия. Структура task'и идентична Task 1, но содержание разное.

Tasks:
- Task 2: `en/partii/kprf.html` ← `partii/kprf.html` (~73 KB, 9 sections)
- Task 3: `en/partii/ldpr.html` ← `partii/ldpr.html` (~82 KB)
- Task 4: `en/partii/srzp.html` ← `partii/srzp.html` (~83 KB)
- Task 5: `en/partii/novye-lyudi.html` ← `partii/novye-lyudi.html` (~40 KB)
- Task 6: `en/partii/yabloko.html` ← `partii/yabloko.html` (~68 KB, 8 sections + critical anti-war framing)
- Task 7: `en/partii/partiya-rosta.html` ← `partii/partiya-rosta.html`
- Task 8: `en/partii/grazhdanskaya-initsiativa.html` ← `partii/grazhdanskaya-initsiativa.html` (с «Two Nechaevs» disambiguation block)
- Task 9: `en/partii/partiya-dela.html` ← `partii/partiya-dela.html`
- Task 10: `en/partii/kommunisty-rossii.html` ← `partii/kommunisty-rossii.html` (с named-doubles table — translated to English)
- Task 11: `en/partii/pensionery.html` ← `partii/pensionery.html` (с comparison table)
- Task 12: `en/partii/zelenye.html` ← `partii/zelenye.html` (с «Not Mitvol» disambiguation block)
- Task 13: `en/partii/rpss.html` ← `partii/rpss.html` (с multi-tier table)
- Task 14: `en/partii/grazhdanskaya-platforma.html` ← `partii/grazhdanskaya-platforma.html`

**Каждая task имеет одинаковую структуру** (показана для Task 2 — KPRF):

#### Task 2: en/partii/kprf.html

**Files:**
- Create: `en/partii/kprf.html`

- [ ] **Step 1: Прочитать оригинал** (`partii/kprf.html`)
- [ ] **Step 2: Создать `en/partii/kprf.html`**

Editorial guidance for KPRF specifically:

- Title: `КПРФ — оппозиция, голосующая «за» | Голосование без выбора` → `KPRF — the opposition that votes «yes» | Voting Without Choice`
- Hero meta: `Парламентская фракция · 1993 — наши дни · 57 мандатов в VIII Думе` → `Parliamentary fraction · 1993 — present · 57 seats in 8th Duma`
- H1: `КПРФ — <em>оппозиция</em>, голосующая <span class="acc">«за»</span>.` → `KPRF — the <em>opposition</em> that votes <span class="acc">«yes»</span>.`
- Hero stats: numbers identical; labels translated
- All sections A-H translated; all timeline events translated
- Voting bar `subtitle`: «фракционно против» → «fraction-line «no»», «единогласно воздержались» → «unanimously abstained»
- Names: Зюганов (Gennady Zyuganov), Афонин (Yury Afonin), Харитонов (Nikolai Kharitonov), Рашкин (Valery Rashkin), Грудинин (Pavel Grudinin), Левченко (Sergei Levchenko)
- Sources kept in RU («Коммерсантъ», «Forbes Russia», etc.) with English gloss in parens at first mention
- Vote-bars + timeline data (in inline `<script>`) — translate `text` and `subtitle` fields; dates unchanged

- [ ] **Step 3: Smoke-test**

```bash
curl -sI http://localhost:8765/en/partii/kprf.html | head -1
curl -s http://localhost:8765/en/partii/kprf.html | grep -c '<section'
```

Expected: 200, ≥8 sections.

- [ ] **Step 4: Commit**

```bash
git add en/partii/kprf.html
git commit -m "feat(en): translate partii/kprf.html to English"
```

#### Tasks 3-14: identical pattern

Каждая повторяет 4 шага: read original, translate, smoke-test, commit.

Editorial-specific guidance per party — выполняется implementer'ом по принципам выше; ключевые ноты:

**Yabloko** (Task 6): сохранить нюанс «structural partial exception» как «structural partial exception» (без полемики). Шлосберг → Schlossberg, Вишневский → Vishnevsky, Явлинский → Yavlinsky.

**Гражданская инициатива** (Task 8): «Разные Нечаевы» disambiguation block → «Two Nechaevs» disambiguation block (с теми же 3 распуньями). Надеждин → Nadezhdin, Дунцова → Duntsova.

**Партия дела** (Task 9): Программа 1432 → Programme 1432 (BrE). Бабкин → Babkin. «Ростсельмаш» → «Ростсельмаш» (Rostselmash). 78%/34 млрд → 78%/34 bn ₽.

**Кoммунисты России** (Task 10): named-doubles table → translated names: Виталий Петров (Vitaly Petrov), Василий Петров (Vasily Petrov), etc.

**Пенсионеры** (Task 11): comparison table headers translated.

**Зелёная альтернатива** (Task 12): «Не Митволь» disambiguation block → «Not Mitvol» (Oleg Mitvol — same English transliteration).

**РПСС** (Task 13): «лаборатория Богданова» → «Bogdanov's laboratory». Multi-tier table headers translated.

**Гр. платформа** (Task 14): Прохоров → Prokhorov, Шайхутдинов → Shaykhutdinov, Ройзман → Roizman.

---

### Tasks 15-20: Translation of 6 sujety pages (depends on Phase 4)

**Pre-condition:** Phase 4 (sujety pages in RU) должна быть завершена.

Tasks:
- Task 15: `en/sujety/mobilizatsiya.html` ← `sujety/mobilizatsiya.html` (4 «opposition» fractions vote «yes» on mobilisation)
- Task 16: `en/sujety/voennyy-byudzhet.html` ← `sujety/voennyy-byudzhet.html` (32.5% of treasury on defence)
- Task 17: `en/sujety/spoylery.html` ← `sujety/spoylery.html` (Spoiler industry — names doubles)
- Task 18: `en/sujety/munitsipalnyy-filtr.html` ← `sujety/munitsipalnyy-filtr.html` (Municipal filter)
- Task 19: `en/sujety/tsifrovoy-kontrol.html` ← `sujety/tsifrovoy-kontrol.html` (Digital control — Aksakov, Lugovoy)
- Task 20: `en/sujety/vneparlamentskie.html` ← `sujety/vneparlamentskie.html` (Three liquidations)

Каждая task имеет ту же 4-шаговую структуру: read original, translate, smoke-test, commit.

Asset paths для `/en/sujety/`: `../../assets/...` (2 уровня выше).

Editorial-specific guidance:

**Task 15 (mobilizatsiya)**: «20.09.2022 — кто проголосовал «за»» → «20.09.2022 — who voted «yes»». Vote-bar subtitles translated. Note: 300,000+ → keep number form.

**Task 16 (voennyy-byudzhet)**: «32,5% казны на оборону» → «32.5% of treasury on defence». ФЗ-419 → Federal Law №419.

**Task 17 (spoylery)**: «индустрия двойников» → «names doubles industry». «Памфилова: «позорище»» → «Pamfilova: «a disgrace»».

**Task 18 (munitsipalnyy-filtr)**: «Муниципальный фильтр» → «Municipal filter». Cases: Levchenko, Roizman, Bondarenko.

**Task 19 (tsifrovoy-kontrol)**: «Цифровой рубль» → «Digital ruble». «Иноагенты» → «Foreign agents». Litvinenko Inquiry — keep title.

**Task 20 (vneparlamentskie)**: «Три ликвидации» → «Three liquidations».

---

### Task 21: Translation of dokumenty.html (depends on Phase 5)

**Pre-condition:** Phase 5 (dokumenty explorer) должна быть завершена.

**Files:**
- Create: `en/dokumenty.html`

- [ ] **Step 1: Прочитать оригинал** (`dokumenty.html`)
- [ ] **Step 2: Создать `en/dokumenty.html`**:
  - Title: `Документы — 233 первоисточника` → `Documents — 233 primary sources`
  - Hero/header text translated
  - Search placeholder: «Поиск по имени файла…   («/» для фокуса)» → «Search by file name… («/» to focus)»
  - Filter dropdown labels translated («Все типы» → «All types»)
  - Asset paths from `/en/`: `../assets/...` (1 уровень выше)
  - Tree-JSON path: `../assets/js/data/dokumenty-tree.json` — same JSON, file names в tree остаются original (RU/EN — как есть на диске; `decree-879-2012-06-22-titov-business-ombudsman.pdf` — нейтрально)
  - Renderer logic loaded from same `../assets/js/lib/dokumenty-{tree,preview,renderers}.js` and `../assets/js/pages/dokumenty.js`
  - Note: Inside the page-init script reference, `assets/js/data/dokumenty-tree.json` path needs to be `../assets/js/data/dokumenty-tree.json` — meaning either:
    - Update the page-init script to handle path-relative-to-page-location, OR
    - Hardcode `/ru-elections/assets/js/data/dokumenty-tree.json` (absolute), OR
    - Have a separate `dokumenty-en.js` page-init for EN
  - Recommended: in the page-init JS, compute path from `<base>` tag or `window.location` to be robust. Add `<base href="../">` to EN page if simpler.

  Decision: добавить в `en/dokumenty.html` `<base href="../">` чтобы все relative paths работали from `/`.

- [ ] **Step 3: Smoke-test**

```bash
cd ./
python3 -m http.server 8765 > /tmp/httpserver.log 2>&1 &
SERVER_PID=$!
sleep 1
curl -sI http://localhost:8765/en/dokumenty.html | head -1
kill $SERVER_PID
```

- [ ] **Step 4: Commit**

```bash
git add en/dokumenty.html
git commit -m "feat(en): translate dokumenty.html to English"
```

---

### Task 22: Update floating EN/RU switcher logic (if needed)

**Files:**
- Possibly modify: `assets/js/lib/lang-switcher.js` (or wherever the switcher logic lives)

- [ ] **Step 1: Найти switcher**

```bash
cd ./
grep -rl 'lang-switch\|langSwitch\|EN.*RU\|switchLanguage' assets/js/
```

- [ ] **Step 2: Проверить, поддерживает ли switcher новые URL-pattern**

Switcher должен корректно обрабатывать:
- `/partii/kprf.html` ↔ `/en/partii/kprf.html`
- `/sujety/mobilizatsiya.html` ↔ `/en/sujety/mobilizatsiya.html`
- `/dokumenty.html` ↔ `/en/dokumenty.html`

Если switcher уже использует regex-based URL-rewrite (например `path.replace(/^\//, '/en/')`), новые страницы заработают автоматически.

Если switcher жёстко перечисляет страницы — нужно расширить список:

```js
// Если такая логика есть — добавить:
const RU_TO_EN = {
  '/index.html': '/en/index.html',
  '/vybory.html': '/en/vybory.html',
  '/tsenzura.html': '/en/tsenzura.html',
  '/dokumenty.html': '/en/dokumenty.html',
  // partii (14)
  '/partii/er.html': '/en/partii/er.html',
  '/partii/kprf.html': '/en/partii/kprf.html',
  // ... (и так далее для всех 14)
  // sujety (6)
  '/sujety/mobilizatsiya.html': '/en/sujety/mobilizatsiya.html',
  // ... (и так далее)
};
// + reverse map EN_TO_RU
```

Лучшее решение: сделать regex-based, чтобы новые pages работали автоматически.

- [ ] **Step 3: Тест на разных страницах**

Открыть в браузере:
- `/partii/yabloko.html` — нажать switcher → должно перейти на `/en/partii/yabloko.html`
- `/en/partii/yabloko.html` — нажать switcher → обратно на `/partii/yabloko.html`
- Аналогично для `/sujety/*.html`, `/dokumenty.html`

(Если контейнер без браузера — указать в commit «manual browser test pending».)

- [ ] **Step 4: Commit (только если были изменения)**

```bash
cd ./
if git diff --quiet HEAD; then
  git commit --allow-empty -m "polish(en): switcher already supports new URL patterns — no changes needed"
else
  git add -u
  git commit -m "polish(en): extend lang-switcher to handle partii/, sujety/, dokumenty URLs"
fi
```

---

### Task 23: Cross-link verification across /en/

**Files:**
- Verify: all 21 new EN pages

- [ ] **Step 1: Проверить все 21 страницы возвращают 200**

```bash
cd ./
python3 -m http.server 8765 > /tmp/httpserver.log 2>&1 &
SERVER_PID=$!
sleep 1
echo "=== EN partii (14) ==="
for slug in er kprf ldpr srzp novye-lyudi yabloko partiya-rosta grazhdanskaya-initsiativa partiya-dela kommunisty-rossii pensionery zelenye rpss grazhdanskaya-platforma; do
  echo -n "  $slug: "
  curl -sI "http://localhost:8765/en/partii/${slug}.html" | head -1
done
echo "=== EN sujety (6) ==="
for slug in mobilizatsiya voennyy-byudzhet spoylery munitsipalnyy-filtr tsifrovoy-kontrol vneparlamentskie; do
  echo -n "  $slug: "
  curl -sI "http://localhost:8765/en/sujety/${slug}.html" | head -1
done
echo "=== EN dokumenty ==="
echo -n "  dokumenty: "
curl -sI "http://localhost:8765/en/dokumenty.html" | head -1
echo "=== Existing EN base pages still work ==="
for path in en/index.html en/vybory.html en/tsenzura.html; do
  echo -n "  $path: "
  curl -sI "http://localhost:8765/${path}" | head -1
done
kill $SERVER_PID
```

All 24 should return `HTTP/1.0 200 OK`.

- [ ] **Step 2: Проверить отсутствие битых cross-link на RU-страницы из EN-страниц**

```bash
cd ./
for f in en/partii/*.html en/sujety/*.html en/dokumenty.html; do
  # Look for hrefs that should have /en/ prefix but don't
  ru_links=$(grep -oE 'href="\.\./(partii|sujety)/[a-z-]+\.html"' "$f" 2>/dev/null | head -3)
  if [ -n "$ru_links" ]; then
    echo "$(basename $f): possibly leaks RU links:"
    echo "$ru_links" | head -3
  fi
done
```

Expected: zero output (все cross-link на партии/сюжеты в EN-страницах должны вести на `/en/partii/<slug>.html` или `/en/sujety/<slug>.html`, не на `../partii/...`).

Если есть — поправить.

- [ ] **Step 3: Проверить Russian source quotes preserved**

EN-страницы должны сохранять Russian source-names как «Коммерсантъ» (не «Kommersant»):

```bash
cd ./
for f in en/partii/*.html; do
  has_kommersant=$(grep -c 'Коммерсантъ' "$f")
  has_eng_kommersant=$(grep -c '\bKommersant\b' "$f")
  echo "$(basename $f): Коммерсантъ=$has_kommersant, Kommersant=$has_eng_kommersant"
done
```

В идеале: Коммерсантъ ≥1 (сохранён), Kommersant — может встречаться только в English gloss `(Kommersant)` при первом упоминании.

- [ ] **Step 4: Final smoke commit**

```bash
cd ./
if git diff --quiet HEAD; then
  git commit --allow-empty -m "polish(en): phase 6 cross-link verification — all 21 pages reachable"
else
  git add -u
  git commit -m "polish(en): phase 6 cross-link fixes"
fi
```

---

### Task 24: README + spec checklist update

**Files:**
- Modify: `README.md`
- Modify: `docs/superpowers/specs/2026-05-05-compromat-pages-design.md`

- [ ] **Step 1: README — обновить блок Phase 6**

ИЗ:
```
**Фаза 6 (планируется):** Английская версия
- Полный перевод на английский (british) at `/en/`
- EN/RU language switcher (floating)
```

В:
```
**Фаза 6 (завершена, май 2026):** Английская версия
- 21 новая страница: `/en/partii/*.html` (14), `/en/sujety/*.html` (6), `/en/dokumenty.html`
- Существующие до этого: `/en/{index,vybory,tsenzura}.html`
- British English; Russian source-names сохранены с English gloss
- EN/RU floating switcher обрабатывает все URL-pattern
- План: `docs/superpowers/plans/2026-05-05-compromat-phase-6-english-version.md`
```

- [ ] **Step 2: Spec — обновить блок Phase 6**

ИЗ:
```
**Фаза 6.** Английская версия.
```

В:
```
**Фаза 6 (✅ завершена 2026-05-05).** Полная английская (British English) версия всех страниц проекта в `/en/`. См. план `docs/superpowers/plans/2026-05-05-compromat-phase-6-english-version.md`.
```

- [ ] **Step 3: Commit**

```bash
cd ./
git add README.md docs/superpowers/specs/2026-05-05-compromat-pages-design.md
git commit -m "docs: mark phase 6 (English version) as complete"
```

---

## Self-Review

**1. Spec coverage:**

| Спека (§2 + §12) | План |
|---|---|
| §2 sitemap `/en/...` | Tasks 1-21 ✅ |
| §12 Локализация (placeholder) | Tasks 1-21 + Task 22 (switcher) ✅ |
| `/en/index.html` | Уже существует — не трогаем |
| `/en/vybory.html` | Уже существует |
| `/en/tsenzura.html` | Уже существует |
| `/en/partii/*` | Tasks 1-14 (14 файлов) ✅ |
| `/en/sujety/*` | Tasks 15-20 (6 файлов; depends on Phase 4) ✅ |
| `/en/dokumenty.html` | Task 21 (depends on Phase 5) ✅ |
| Floating EN/RU switcher | Task 22 (verify/extend) ✅ |

**2. Placeholder scan:**
- Нет «TBD/TODO/implement later» — каждая task task имеет конкретное editorial guidance + smoke-test + commit
- Editorial rules централизованы в начале плана + memory `project_i18n_decisions.md`

**3. Type consistency:**
- Все EN-страницы используют те же compoonents (`vote-bar.js`, `timeline-vert.js`, etc.) — без изменений
- Asset paths: `../../assets/...` для `/en/partii/`, `/en/sujety/`; `../assets/...` для `/en/dokumenty.html` (или через `<base href="../">`)
- `<html lang="en">` обязательно

**4. Out of scope:**
- Перевод research/compromat/ (MD-файлы) — отложено; ссылки на эти файлы остаются `../research/compromat/...` (RU-content; EN-читатель открывает RU-файл)
- Перевод названий партий — ER → United Russia / KPRF / LDPR / SRZP / New People; для большинства существуют устоявшиеся английские названия, для остальных — оставляем РУ кириллицей с пометкой
- Альтернативные транслитерации (например, не BGN/PCGN) — отложено; следуем единой системе
- OG images для EN-версии (отдельные `assets/og/en/*.png`) — отложено; используем те же RU OG-images или generic image
- Translation review by native speaker — отложено

**5. Зависимости:**
- Tasks 15-20 (sujety) depend на Phase 4 завершение
- Task 21 (dokumenty) depends на Phase 5 завершение
- Tasks 1-14 (partii) — независимы, можно выполнять прямо сейчас
- Task 22 (switcher) — можно выполнять параллельно, но финальный тест после всех страниц
- Task 23-24 (verification + docs) — последние

**Если Phase 4 или 5 не готовы:** Phase 6 можно выполнить **частично** — только Tasks 1-14 (партии), а Tasks 15-21 отложить до завершения соответствующих RU-фаз.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-05-compromat-phase-6-english-version.md`. Two execution options:

**1. Subagent-Driven (recommended)** — диспатчу свежего сабагента на каждую задачу, ревью между, быстрая итерация. Tasks 1-21 (translations) — Opus 4.7 (требует editorial судgement); Tasks 22-24 — Sonnet 4.6 (mechanical).

**2. Inline Execution** — выполняю задачи в этой сессии через executing-plans, batch с чекпоинтами.

**Если Phase 4/5 не завершены:** рекомендую сначала запустить Phase 4 → Phase 5 → потом Phase 6. Альтернатива — выполнить Phase 6 партиально (Tasks 1-14, 22-24) и доделать sujety/dokumenty translations после Phase 4/5.

Which approach?
