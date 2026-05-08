# Голосование без выбора

🌐 **Сайт:** https://im-not-a-human.github.io/ru-elections/

Интерактивный аналитический сайт о российской политической системе. Четыре аналитические страницы + 14 досье партий, 6 тематических лонгридов и эксплорер документов; англоязычное зеркало в `/en/`.

- 📊 **[Голосования](https://im-not-a-human.github.io/ru-elections/)** (`index.html`) — компромат-хаб на главной с интерактивным обзором парламентских фракций и законодательства за 2019–2025 годы. Включает реальные позиции пяти фракций Госдумы (ЕР, КПРФ, ЛДПР, СРЗП, Новые люди), а также: 14-партийный хаб (парламентские, внепарламентские, спойлеры), 6 кроссрезов (мобилизация, военный бюджет, спойлеры, мунфильтр, цифровой контроль, ликвидации), панель-тизер документов, «липкое» оглавление на десктопе ≥1080px. Ниже размещены исходные разделы: матрица 30 законов × 5 фракций с пофамильным разбором голосования по каждому, карточки партий, парадокс цифровых свобод vs социалки, хронология 2019–2025.
- 🧮 **[Математика выборов](https://im-not-a-human.github.io/ru-elections/vybory.html)** (`vybory.html`) — почему «Единая Россия» побеждает практически при любом раскладе. Смешанная система 225+225, 5%-барьер, лепестковая нарезка, ДЭГ, метод Шпилькина. Калькулятор сценариев, тепловая карта обратной задачи, лестница большинств — с расчётами и ссылками на первоисточники.
- 🛡️ **[Цифровые ограничения](https://im-not-a-human.github.io/ru-elections/tsenzura.html)** (`tsenzura.html`) — разрыв между декларациями и эффектом цифровых ограничений 2021–2026 годов. Карта противоречий, threat-model «БПЛА × мера», калькулятор ущерба от шатдаунов, сравнение с Китаем, Ираном, Беларусью и демократическими регуляторами. На цифрах ЦБ, МВД, Mediascope, Top10VPN, Freedom House, Tor Metrics, Google Transparency Report.
- 📁 **[Документы](https://im-not-a-human.github.io/ru-elections/dokumenty.html)** (`dokumenty.html`) — эксплорер 233 файлов / 190 МБ: указы Президента, карточки sozd.duma.gov.ru, поимённые голосования, OFAC SDN, тексты ФЗ, декларации, госконтракты — всё проверяемо без посещения российских госсайтов.

## Что внутри

**Главная страница (`index.html`):**
- **Фаза 1 (новое):**
  - Hero с 4 кейс-числами компромата (мобилизация 300k, военный бюджет 32,5%, цифровой рубль 385/0/1, 700+ уголовных дел)
  - 14-партийный хаб с группировкой по 3 категориям (парламентские / внепарламентские / спойлеры)
  - 6 кроссрезов-карточек (мобилизация · военный бюджет · спойлеры · мунфильтр · цифровой контроль · ликвидации)
  - Панель-тизер документов (ссылка на `/dokumenty.html` — будущая страница)
  - Sticky TOC с scroll-spy (видна на ≥1080px)
- **Исходные разделы (по-прежнему присутствуют):**
  - Матрица 30 законов × 5 фракций с фильтрами и кликабельными ячейками
  - **Поимённое голосование депутатов**: для 29 законов — полноэкранная панель из модалки с пофамильной разбивкой по фракциям, sticky-навигацией, поиском по фамилии и тоглом «только отступники». Данные (`assets/data/votes/{lawId}.json`) собираются скриптом `tools/fetch-votes.py` из `api.duma.gov.ru` (ключи в `.env`, не коммитятся).
  - Карточки 5 партий → модалки с детальным портретом
  - «Парадокс»: цифровые свободы vs социалка
  - Хронология 2019–2025
  - Графики динамики (Chart.js)
  - Cross-page CTA на «Математику выборов»

**Математика выборов (`vybory.html`):**
- 12 разделов с TOC
- Distortion bars («голоса vs мест»)
- 15×15 = 225 одномандатных округов
- Waffle 10×10 (5%-барьер)
- 8 округов ДЭГ-переворота с paper / deg / финал
- SVG-радиалы (gauge), sankey-lite поток
- График Шпилькина (Chart.js)
- **Интерактивный калькулятор сценариев** с реальной реализацией ст. 88/89 ФЗ № 20-ФЗ
- Тепловая карта «обратной задачи»
- Лестница большинств (226 / 300 / 338 vs 324)
- Хронология ИС 2005–2025
- 9 цитат власти карточками

**Цифровые ограничения (`tsenzura.html`):**
- Hero с 4 ключевыми цифрами (29,3 млрд ₽ мошенничества, 23+ тыс. атак БПЛА, $11,9 млрд шатдаунов, 1 730 компаний с легальным VPN) + 9 TOC-карточек
- «Главное противоречие»: декларация vs архитектура — параллельная карточка
- Интерактивная карта противоречий: 18 строк × 4 столбца с фильтрами по 9 категориям и модалками
- Слой VPN: «сословный VPN» — параллельные колонки гражданин vs корпорация
- **Threat-model матрица 8×4** (БПЛА-сценарии × контрмеры) с цветными ячейками и tooltip-обоснованиями
- Архитектура «открытый интернет → белый список» (SVG-иллюстрация)
- **Калькулятор ущерба от шатдауна** (дни × ставка × региональный коэф. × доля бизнеса)
- Сравнение мессенджеров: WhatsApp / Telegram / MAX (HTML-bars)
- YouTube throttling timeline (Google Transparency Report)
- Провалы по заявленной цели: мошенничество ЦБ, IT-преступления МВД, детские суициды СКР
- 4 уровня правоприменения (АТС-1 → корпорации → граждане → иноагенты)
- Freedom on the Net 2021–2025 + leaderboard стран (РФ, КНР, Иран, Беларусь)
- Сравнительная таблица регуляторов (GDPR, NetzDG, OSA, DSA, S230 vs РФ)
- Хронология 2019–2026 (29 событий)
- 65 источников: ЦБ, МВД, Mediascope, Top10VPN, Tor Metrics, OONI, Google Transparency Report, RKN, Freedom House, HRW, Access Now, RSF, IFRI, заявления авторов законов

**Общие виджеты:**
- Intro popup с tabs «Для читателя» / «Для стрима» (всегда показывается)
- Reading progress bar
- Copy-link на 7 ключевых callout-блоков
- Page-toggle между страницами с onboarding ping
- Telegram-style спойлер на «реальной поддержке»
- Sticky TOC (scroll-spy) на десктопе ≥1080px на index/vybory/tsenzura/partii
- Dev-banner с уведомлением о статусе разработки
- Режим презентации: FAB → fullscreen-deck с ←/→/Esc/F

## План развития (Roadmap)

**Фаза 1 (завершена, май 2026):** Обновление главной с компромат-хабом
- Новое: hero с 4 компромат-кейсами, 14-партийный хаб, 6 кроссрезов, документы-тизер, sticky TOC
- План: `docs/superpowers/plans/2026-05-05-compromat-phase-1-index.md`

**Фаза 2 (завершена, май 2026):** Глубокие страницы парламентских партий
- 5 страниц: `/partii/{er,kprf,ldpr,srzp,novye-lyudi}.html`
- Sticky TOC, 8 секций A–H открыты сразу, sources-fold в конце каждой секции
- Inline vote-bars, vertical timelines, ссылки на скачанные XML/HTML/PDF

**Фаза 3 (завершена, май 2026):** Внепарламентские партии и спойлеры (9 страниц)

**Фаза 4 (завершена, май 2026):** Тематические лонгриды (6 страниц `/sujety/...`)

**Фаза 5 (завершена, май 2026):** Эксплорер документов `/dokumenty.html` (233 файла / 190 МБ)

**Фаза 6 (в работе, май 2026):** Visual-first рефакторинг и tier-1 партии
- Новый формат страниц партий: section-label / section-h2 / section-lead / viz-mount / section-h3 / src-list (см. `docs/superpowers/specs/2026-05-06-visual-first-styleguide.md`)
- 8 виз-компонентов: registration-window, financing-trajectory, leader-grid (с tier core/secondary), trustee-context, ownership-flow, vote-waffle, relationship-network, swimlane (vertical timeline)
- Hotspot popover-система с evidence pattern (header + breakdown + explanation + source link)
- ✅ pilot: `/partii/novye-lyudi.html`
- ✅ tier-1: `/partii/{kprf,ldpr,srzp}.html` мигрированы (commits `058e275`, `e34c590`, `bf26271`)
- ⏳ ЕР deferred: нет research dossier — отдельная фаза
- ⏳ Tier-2 (внепарламентские) — после стабилизации tier-1

**Фаза 7 (в работе, май 2026):** Английская версия `/en/` + EN/RU language switcher (floating).
- ✅ зеркала `en/{index,vybory,tsenzura,dokumenty}.html`
- ⏳ EN-версии глубоких страниц `partii/` и `sujety/`

**Фаза 8 (завершена, май 2026):** Поимённое голосование депутатов на главной
- 29 из 30 законов с главной получили JSON с полным `<resultsByDeputy>`
- Полноэкранная панель из модалки: стек секций по фракциям, 3-колоночная сетка имён, sticky-нав с чипами/поиском/фильтром, табы для составных законов (Пакет Клишаса, ФКЗ-2022)
- Скрипт `tools/fetch-votes.py` (Python 3, stdlib only): voteSearch → vote/{id}.xml → компактный JSON
- Источники в UI — публичные `vote.duma.gov.ru` / `sozd.duma.gov.ru` (без app-токена)
- Один закон (156017-8 «Запрет митингов») не имеет электронного голосования в API — кнопка для него не показывается

## Структура

```
.
├── index.html              # главная — голосования фракций
├── vybory.html             # математика выборов
├── tsenzura.html           # цифровые ограничения 2021–2026
├── dokumenty.html          # эксплорер 233 файлов
├── partii/                 # 14 досье партий (er, kprf, ldpr, srzp, novye-lyudi + 9 внепарл.)
├── sujety/                 # 6 тематических лонгридов (мобилизация, военный бюджет, …)
├── en/                     # англоязычные зеркала (index/vybory/tsenzura/dokumenty)
├── tools/
│   └── fetch-votes.py      # пайплайн api.duma.gov.ru → assets/data/votes/{lawId}.json
├── LICENCE                 # CC BY 4.0
├── README.md
├── .env.example            # шаблон ключей api.duma.gov.ru (не коммитим .env)
├── .gitignore
├── assets/
│   ├── og/
│   │   ├── tsenzura.png    # 1200×630 share-карточка для tsenzura
│   │   └── tsenzura.svg
│   ├── css/
│   │   ├── tokens.css      # дизайн-токены (палитра, размеры, easing)
│   │   ├── base.css        # сброс, типографика, фон-«газета», skip-link, reduced-motion
│   │   ├── layout.css      # шапка, секции, подвал, page-toggle
│   │   ├── components.css  # модалки, тултипы, фильтры, intro popup, copy-link
│   │   ├── home.css        # стили главной (матрица, парадокс, хроника, hero kicker)
│   │   ├── elections.css   # стили математики (вафля, гейдж, калькулятор, heatmap, ladder)
│   │   └── tsenzura.css    # стили цифровых ограничений (карта противоречий, threat-matrix, калькулятор шатдаунов, селективность)
│   ├── data/
│   │   └── votes/              # 29 JSON с поимённым голосованием по lawId (для deputy-panel.js)
│   └── js/
│       ├── data/
│       │   ├── parties.js       # PARTIES — описания пяти фракций
│       │   ├── laws.js          # LAWS — 30 ключевых законов
│       │   ├── social-laws.js   # SOCIAL_LAWS — соцэкономика для контекста
│       │   ├── vote-mapping.js  # auto-generated: lawId → {ballots, tabs} (feature gating)
│       │   ├── elections.js     # ELECTION_2021, SHPILKIN, DEG_FLIPS_2021, POWER_QUOTES, SYSTEM_HISTORY, BUDGETNIKI и др.
│       │   ├── digital-numbers.js   # 4 hero-числа для tsenzura
│       │   ├── digital-events.js    # 29 событий хронологии 2019–2026
│       │   ├── contradictions.js    # 18 строк карты противоречий + 9 фильтр-тегов
│       │   ├── threat-matrix.js     # threat-model 8 угроз × 4 контрмеры с обоснованиями
│       │   ├── digital-platforms.js # WhatsApp / Telegram / MAX + YouTube timeline
│       │   ├── digital-fraud.js     # ЦБ / МВД / СКР / Совбез — провалы по метрике
│       │   ├── whitelist.js         # рост белого списка VPN + CORP_VPN
│       │   ├── intl-comparison.js   # FoN, регуляторы, 4 уровня правоприменения
│       │   ├── digital-quotes.js    # цитаты Симоньян, Боярский, Шойгу, Z-каналы
│       │   └── digital-sources.js   # 65 источников в 8 категориях
│       ├── lib/
│       │   ├── dom.js           # $, $$, общие лейблы
│       │   ├── modal.js         # generic modal с focus trap + inert background
│       │   ├── intro.js         # intro popup с tabs reader/streamer + GitHub link
│       │   ├── tooltip.js       # плавающий тултип
│       │   ├── reveal.js        # IntersectionObserver-based scroll reveal
│       │   ├── counter.js       # анимированный счётчик чисел
│       │   ├── spoiler.js       # Telegram-style спойлер (кнопка-disclosure)
│       │   ├── copy-link.js     # copy-link на data-share блоках
│       │   ├── page-toggle-ping.js  # onboarding pulse на toggle
│       │   ├── reading-progress.js  # 2px progress bar под nav
│       │   └── scroll-steps.js  # пошаговый reveal в .derivation
│       ├── components/
│       │   ├── matrix.js                 # таблица «30 законов × 5 фракций»
│       │   ├── party-cards.js            # карточки партий
│       │   ├── timeline.js               # вертикальная хроника
│       │   ├── comparison-bars.js
│       │   ├── law-modal.js              # модалка закона (+ кнопка «Посмотреть поимённо»)
│       │   ├── deputy-panel.js           # полноэкранная панель пофамильного голосования
│       │   ├── party-modal.js            # модалка партии
│       │   ├── digital-numbers.js        # 4 hero-числа для tsenzura
│       │   ├── digital-timeline.js       # вертикальная хроника 2019–2026
│       │   ├── contradiction-matrix.js   # 18-строчная интерактивная матрица с фильтрами
│       │   ├── threat-matrix.js          # tooltip-driven heatmap 8×4
│       │   ├── selectivity-cards.js      # 4 карточки уровней правоприменения
│       │   ├── digital-sources.js        # объединённый аккордеон 65 источников + цитат
│       │   └── digital-modal.js          # модалка строки противоречий с источниками
│       ├── charts/
│       │   ├── defaults.js               # общие настройки Chart.js
│       │   ├── years-chart.js            # столбчатый «по годам»
│       │   ├── opposition-chart.js
│       │   ├── shpilkin-chart.js
│       │   ├── waffle.js                 # вафля 10×10
│       │   ├── districts.js              # 15×15 = 225 одномандатных
│       │   ├── distortion.js             # «голоса vs места» парные бары
│       │   ├── gauge.js                  # SVG donut gauge
│       │   ├── flow.js                   # sankey-lite поток
│       │   ├── ladder.js                 # лестница большинств + counterfactuals
│       │   ├── heatmap.js                # тепловая карта обратной задачи
│       │   ├── calculator.js             # интерактивный калькулятор сценариев
│       │   ├── vpn-growth.js             # рост спроса на VPN (Sensor Tower)
│       │   ├── whitelist-growth.js       # рост корпоративного «белого списка»
│       │   ├── messenger-comparison.js   # WhatsApp / Telegram / MAX (HTML-bars)
│       │   ├── youtube-throttling.js     # Google Transparency Report timeline
│       │   ├── fraud-vs-laws.js          # хищения ЦБ vs антифрод-законы
│       │   ├── drone-attacks.js          # 6,2 → 23+ тыс. атак БПЛА
│       │   ├── it-crime.js               # IT-преступления МВД
│       │   ├── child-suicide.js          # детские суициды СКР
│       │   ├── freedom-on-net.js         # FoN РФ + leaderboard стран
│       │   ├── regulation-compare.js     # GDPR / NetzDG / DSA / OSA / S230 vs РФ
│       │   └── shutdown-cost-calc.js     # калькулятор ущерба от шатдауна
│       └── pages/
│           ├── home.js          # init для index.html
│           ├── elections.js     # init для vybory.html
│           └── tsenzura.js      # init для tsenzura.html
└── research/
    ├── duma-voting-research.md                     # глубокий research для главной
    ├── vybory-mathematics-research.md              # глубокий research для математики
    ├── compass_artifact_*.md                       # research-отчёт #1 для tsenzura
    ├── russia_digital_restrictions_2021_2026_research.md  # research-отчёт #2 для tsenzura
    ├── consensus_digital_restrictions_2021_2026.md # консенсус двух отчётов + план страницы
    ├── expert-review-2026-05-04.md                 # ревью №1 (фактология + a11y)
    ├── expert-review-2026-05-04-round2.md          # ревью №2 (UX + media-готовность)
    ├── gpt-5-codex-final-review-...md              # финальное ревью от GPT-5 Codex
    └── opus-4-7-final-review-...md                 # финальное ревью от Opus 4.7
```

Никакого билда не требуется — чистая статика. Каждая страница загружает только нужные ей CSS/JS-модули.

## Стек

- HTML5 + ванильный JavaScript (никаких фреймворков, никакой сборки)
- CSS3 + современные фичи: grid, IntersectionObserver, prefers-reduced-motion, `<noscript>` fallback, `inert`
- [Chart.js 4.4.1](https://www.chartjs.org/) с CDN — только для трёх bar-графиков
- Fonts: [Unbounded](https://fonts.google.com/specimen/Unbounded) (заголовки), [Manrope](https://fonts.google.com/specimen/Manrope) (текст), [Lora](https://fonts.google.com/specimen/Lora) (цитаты), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (числа и код)

## Доступность и принципы

- WCAG AA контраст для всех текстов (`--ink-faded: #6F6A60`)
- Skip-to-content link
- `prefers-reduced-motion` глобально уважается
- No-JS fallback: основной контент видим, динамические виджеты деградируют корректно
- Modal/intro: `aria-modal`, focus trap, restore focus, фон inert
- Mobile-first: проверено на iPhone SE 320×568 без horizontal overflow
- Каждое утверждение со ссылкой на первоисточник

## Как добавить новую страницу

1. Создайте `новая-страница.html` рядом с `index.html`.
2. Подключите общие токены и базу: `tokens.css`, `base.css`, `layout.css`, `components.css`.
3. Добавьте свой `assets/css/имя.css` со специфичными стилями.
4. Подключите нужные модули JS из `assets/js/lib/`, `components/`, `charts/`.
5. Создайте `assets/js/pages/имя.js` с инициализацией.
6. Скопируйте `<nav>` из существующих страниц и добавьте свой пункт в `.page-toggle`.
7. Обновите OG-метатеги (`og:url`, `canonical`, `og:image` — абсолютные URL).

## Локальная разработка

```bash
git clone git@github.com:im-not-a-human/ru-elections.git
cd ru-elections
python3 -m http.server 8765
# открыть http://127.0.0.1:8765/
```

Никаких npm install / dependencies не нужно.

## Деплой

Сайт уже опубликован на **GitHub Pages**: https://im-not-a-human.github.io/ru-elections/

Зеркала и копии — любой статический хостинг (Netlify, Vercel, nginx) работает без настройки, кроме указания корня и `index.html`.

## Источники данных

- **ЦИК РФ**, sozd.duma.gov.ru, vote.duma.gov.ru — первоисточники
- Тексты законов (kremlin.ru, base.garant.ru, consultant.ru, publication.pravo.gov.ru)
- Государственные СМИ: ТАСС, РИА, РГ, Парламентская газета
- Деловая пресса: Коммерсантъ, Ведомости, РБК, Forbes, Интерфакс
- Независимые: «Голос», «Роскомсвобода», iStories, Meduza, Новая газета, «Медиазона»
- Академические работы: Любарев (Electoral Politics), Гельман (ЕУСПб), Левицки–Уэй, Шедлер
- Сергей Шпилькин — статистические оценки аномалий

Полный аннотированный список — в подвале каждой страницы.

## О позиции автора

Автор сайта — не политолог и не социолог; научная и профессиональная специализация — в смежной технической области (системы автоматизации, AI-агенты). Сайт — экспериментальный проект: вся аналитика, расчёты, тексты и интерактивы подготовлены силами AI-агентов под контролем автора.

Это **аналитика по публичным данным, а не политическая агитация**. Сайт не содержит призывов к каким-либо действиям, не аффилирован с политическими движениями или организациями и не имеет цели дискредитировать органы власти. Цель — показать, что современные инструменты позволяют любому собрать многослойный аналитический материал по открытым данным и проверить его на состоятельность.

Если вы заметили фактическую неточность — пожалуйста, оформите PR в репозиторий или Issue.

## Лицензия

[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.ru) — копировать, изменять, переиспользовать со ссылкой.
