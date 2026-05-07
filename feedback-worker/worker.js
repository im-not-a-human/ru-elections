// Feedback worker — принимает сообщение от формы на сайте и создаёт
// GitHub issue в открытом репозитории. Никаких секретов в коде:
// GITHUB_TOKEN и (опционально) TURNSTILE_SECRET берутся из wrangler secrets,
// GITHUB_REPO и ALLOWED_ORIGINS — из vars в wrangler.toml.

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = parseList(env.ALLOWED_ORIGINS);
    const corsOrigin = allowed.includes(origin) ? origin : '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(corsOrigin) });
    }
    if (request.method !== 'POST') {
      return text('Method not allowed', 405, corsOrigin);
    }
    if (!corsOrigin) {
      return text('Forbidden origin', 403, '');
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'invalid_json' }, 400, corsOrigin);
    }

    const message = typeof body?.message === 'string' ? body.message.trim() : '';
    const contact = typeof body?.contact === 'string' ? body.contact.trim().slice(0, 200) : '';
    const page = typeof body?.page === 'string' ? body.page.slice(0, 500) : '';
    const turnstileToken = typeof body?.turnstileToken === 'string' ? body.turnstileToken : '';

    if (message.length < 10) return json({ error: 'too_short' }, 400, corsOrigin);
    if (message.length > 5000) return json({ error: 'too_long' }, 400, corsOrigin);

    if (env.TURNSTILE_SECRET) {
      if (!turnstileToken) return json({ error: 'turnstile_required' }, 400, corsOrigin);
      const ok = await verifyTurnstile(env.TURNSTILE_SECRET, turnstileToken,
        request.headers.get('CF-Connecting-IP') || '');
      if (!ok) return json({ error: 'turnstile_failed' }, 400, corsOrigin);
    }

    if (!env.GITHUB_TOKEN || !env.GITHUB_REPO) {
      return json({ error: 'server_misconfigured' }, 500, corsOrigin);
    }

    const titleSnippet = message.split('\n')[0].slice(0, 70).trim() || 'feedback';
    const title = `[Feedback] ${titleSnippet}${titleSnippet.length < message.length ? '…' : ''}`;

    const issueBody = [
      message,
      '',
      '---',
      `**Контакт:** ${contact ? escapeMd(contact) : '_не указан_'}`,
      `**Страница:** ${page ? escapeMd(page) : '_не передана_'}`,
      `**Получено:** ${new Date().toISOString()}`,
      '',
      '_Создано автоматически из формы обратной связи на сайте._',
    ].filter(Boolean).join('\n');

    const ghResp = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'gbv-feedback-worker',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body: issueBody,
        labels: ['feedback', 'from-site'],
      }),
    });

    if (!ghResp.ok) {
      const errText = await ghResp.text().catch(() => '');
      console.error('GitHub error:', ghResp.status, errText.slice(0, 300));
      return json({ error: 'github_failed', status: ghResp.status }, 502, corsOrigin);
    }
    const issue = await ghResp.json();
    return json({ ok: true, url: issue.html_url, number: issue.number }, 200, corsOrigin);
  },
};

function parseList(s) {
  return (s || '').split(',').map((x) => x.trim()).filter(Boolean);
}

function corsHeaders(origin) {
  if (!origin) return { 'Vary': 'Origin' };
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '600',
    'Vary': 'Origin',
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders(origin) },
  });
}

function text(body, status, origin) {
  return new Response(body, {
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', ...corsHeaders(origin) },
  });
}

async function verifyTurnstile(secret, token, ip) {
  const params = new URLSearchParams({ secret, response: token });
  if (ip) params.set('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });
  if (!r.ok) return false;
  const data = await r.json().catch(() => ({}));
  return data.success === true;
}

// Markdown sanitization: GitHub issues render Markdown. Сообщение пользователя
// само по себе render-friendly, мы намеренно его НЕ экранируем (чтобы человек
// мог отправить ссылку или оформление). Экранируем только мета-поля, которые
// мы выводим как метаданные.
function escapeMd(s) {
  return String(s).replace(/[<>]/g, (c) => (c === '<' ? '&lt;' : '&gt;'));
}
