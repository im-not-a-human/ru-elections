# Feedback worker

Cloudflare Worker, который принимает сообщения от формы обратной связи на сайте и создаёт от вашего имени GitHub issue в этом репозитории. Посетителю сайта **не нужен GitHub-аккаунт** — issue создаётся через API при помощи fine-grained PAT, который хранится только в Cloudflare.

В репозитории нет ни одного секрета. Токен GitHub и Turnstile secret хранятся в Cloudflare через `wrangler secret put` и нигде не светятся.

## Что нужно один раз сделать

### 1. Создать fine-grained Personal Access Token на GitHub

1. https://github.com/settings/personal-access-tokens/new
2. **Token name:** `gbv-feedback-worker`
3. **Expiration:** на свой вкус — например, 1 год.
4. **Repository access → Only select repositories → `im-not-a-human/ru-elections`**.
5. **Permissions → Repository permissions → Issues: Read and write**. Больше ничего не давать.
6. Скопируйте токен (`github_pat_...`) — он понадобится на шаге 4.

### 2. (Рекомендуется) Создать Cloudflare Turnstile site

Это бесплатная замена капчи — невидимая для пользователя, но отсекает ботов.

1. https://dash.cloudflare.com → Turnstile → Add site.
2. **Sitename:** `gbv-feedback`.
3. **Domain:** `im-not-a-human.github.io` (плюс `localhost`, если будете тестировать локально).
4. **Widget mode:** *Managed* (умолчание).
5. Скопируйте **Site key** (публичный, пойдёт в `assets/js/lib/feedback.js`) и **Secret key** (приватный, пойдёт в Cloudflare как secret).

### 3. Установить и залогиниться в wrangler

```bash
npm install -g wrangler
wrangler login
```

### 4. Залить секреты в Cloudflare

Из этой папки (`feedback-worker/`):

```bash
wrangler secret put GITHUB_TOKEN
# вставить токен из шага 1, нажать Enter

wrangler secret put TURNSTILE_SECRET
# вставить Turnstile secret key из шага 2 (если включаете Turnstile)
```

### 5. Задеплоить воркер

```bash
wrangler deploy
```

В выводе будет URL вида:

```
https://gbv-feedback.<your-account>.workers.dev
```

Скопируйте его — это `workerUrl` для фронтенда.

### 6. Прописать конфиг на сайте

Откройте `assets/js/lib/feedback.js` (в корне проекта, не здесь) и заполните:

```js
const CONFIG = {
  workerUrl: 'https://gbv-feedback.<your-account>.workers.dev',
  turnstileSiteKey: '0x4AAAAAAA...', // из шага 2; пустая строка — отключить Turnstile
};
```

Закоммитьте, запушьте — на GitHub Pages обновится автоматически. Кружок в правом нижнем углу появится только при заполненном `workerUrl`.

## Как это выглядит

1. Посетитель кликает на кружок → открывается форма.
2. Поля: сообщение (обязательное, 10–5000 символов) и контакт (необязательный).
3. Невидимая Turnstile-проверка → POST на воркер.
4. Воркер проверяет Turnstile, длину сообщения, CORS-источник → создаёт issue с метками `feedback`, `from-site`.
5. Посетитель видит ссылку на созданный issue, вы — новый issue в репозитории.

## Что попадает в issue

- Сообщение пользователя (как Markdown).
- Контакт (если оставили — поле необязательное).
- URL страницы, с которой отправили (передаётся самой формой, не из заголовков).
- Время получения в UTC.

Что **не пишется** в issue: IP-адрес, User-Agent, страна, никакой другой fingerprint. Cloudflare видит IP/UA в логах воркера на стороне сервера, но в issue они не уходят.

## Если злоупотребляют

- В Cloudflare Dashboard → ваш воркер → Logs можно увидеть подозрительные запросы.
- Если Turnstile перестаёт справляться, добавьте в Cloudflare WAF rate-limiting rule на путь воркера (например, 5 req/min на IP) — это бесплатно на free-плане.
- В крайнем случае — `wrangler secret delete GITHUB_TOKEN` мгновенно отключит создание issue, форма будет отдавать ошибку.

## Локальная разработка

```bash
wrangler dev
```

Поднимет воркер на `http://localhost:8787`. Временно поменяйте `workerUrl` в `feedback.js` — и увидите всё локально через `python3 -m http.server 8765`.
