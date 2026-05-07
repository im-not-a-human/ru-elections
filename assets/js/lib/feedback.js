// Feedback button — кружок снизу-справа, открывает форму в общей модалке.
// Сообщение уходит на Cloudflare Worker (см. /feedback-worker/), который
// создаёт GitHub issue в этом репозитории. Заполните CONFIG ниже после
// деплоя воркера. Оба значения публичные — секретами не являются.
(function () {
  const CONFIG = {
    workerUrl: 'https://gbv-feedback.gbv-relay.workers.dev',
    turnstileSiteKey: '',   // напр. '0x4AAAAAAA...'  Пусто = Turnstile отключён.
  };

  if (!CONFIG.workerUrl) return; // не сконфигурировано — кнопку не показываем

  const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

  let openedAt = 0;
  let turnstileWidgetId = null;

  function loadTurnstileScript() {
    if (!CONFIG.turnstileSiteKey) return;
    if (document.querySelector('script[data-turnstile]')) return;
    const s = document.createElement('script');
    s.src = TURNSTILE_SCRIPT;
    s.async = true;
    s.defer = true;
    s.setAttribute('data-turnstile', '');
    document.head.appendChild(s);
  }

  function waitForTurnstile() {
    return new Promise((resolve) => {
      if (window.turnstile) return resolve(window.turnstile);
      const start = Date.now();
      const t = setInterval(() => {
        if (window.turnstile) { clearInterval(t); resolve(window.turnstile); }
        else if (Date.now() - start > 10000) { clearInterval(t); resolve(null); }
      }, 50);
    });
  }

  function injectButton() {
    if (document.querySelector('.feedback-fab')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'feedback-fab';
    btn.setAttribute('aria-label', 'Предложить идею или сообщить об ошибке');
    btn.title = 'Предложить идею или сообщить об ошибке';
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    `;
    btn.addEventListener('click', openFeedback);
    document.body.appendChild(btn);

    // Allow any element with [data-open-feedback] (e.g. the dev-banner
    // link "обратную связь") to trigger the feedback form.
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open-feedback]');
      if (!trigger) return;
      e.preventDefault();
      openFeedback();
    });
  }

  function buildFormHTML() {
    const turnstileSlot = CONFIG.turnstileSiteKey
      ? '<div id="feedbackTurnstile" class="feedback-turnstile"></div>'
      : '';
    return `
      <div class="modal-header">
        <span class="modal-tag" style="background: var(--bg-paper); color: var(--ink-soft);">Обратная связь</span>
        <h2 class="modal-title" id="feedback-title">Идея или замечание?</h2>
        <p style="margin: 8px 0 0; font-size: 14px; color: var(--ink-soft); line-height: 1.55;">
          Сообщение придёт автору сайта как issue в открытом GitHub-репозитории.
          Регистрация не нужна.
        </p>
      </div>
      <div class="modal-content">
        <form class="feedback-form" id="feedbackForm" novalidate>
          <div class="feedback-field">
            <label for="feedbackMessage">Что предлагаете или что не так?</label>
            <textarea id="feedbackMessage" name="message" required
              minlength="10" maxlength="5000"
              placeholder="Например: на странице «Математика выборов» в калькуляторе сценариев…"></textarea>
            <div class="feedback-hint">Минимум 10 символов, максимум 5000. Поддерживается Markdown.</div>
          </div>
          <div class="feedback-field">
            <label for="feedbackContact">Контакт (необязательно)</label>
            <input id="feedbackContact" name="contact" type="text" maxlength="200"
              placeholder="Email, Telegram, ник на GitHub — если хотите ответ">
            <div class="feedback-hint">Можно оставить пустым. Это поле станет частью публичного issue, поэтому не указывайте лишнего.</div>
          </div>
          <div class="feedback-notice">
            <strong>Важно.</strong> Сообщение становится <strong>публичным</strong> GitHub issue в открытом репозитории
            <span class="mono">im-not-a-human/ru-elections</span>. Не оставляйте паролей, личных данных и конфиденциальной информации.
          </div>
          ${turnstileSlot}
          <div class="feedback-actions">
            <button type="submit" class="feedback-submit">Отправить</button>
            <span class="feedback-status" id="feedbackStatus" aria-live="polite"></span>
          </div>
        </form>
      </div>
    `;
  }

  function buildSuccessHTML(url, number) {
    const safeUrl = String(url).replace(/"/g, '&quot;');
    const num = parseInt(number, 10) || '';
    return `
      <div class="modal-header">
        <span class="modal-tag" style="background: var(--green-soft); color: var(--green);">Отправлено</span>
        <h2 class="modal-title">Спасибо. Сообщение получено.</h2>
      </div>
      <div class="modal-content">
        <p style="font-size: 15px; line-height: 1.65; color: var(--ink); margin: 0 0 20px;">
          Создан issue
          <a href="${safeUrl}" target="_blank" rel="noopener"
             style="color: var(--accent); font-weight: 600;">#${num}</a>
          в репозитории. Автор увидит его и сможет отреагировать.
        </p>
        <button type="button" class="feedback-submit" id="feedbackCloseBtn">Закрыть</button>
      </div>
    `;
  }

  async function openFeedback() {
    const content = document.getElementById('modalContent');
    const overlay = document.getElementById('modalOverlay');
    if (!content || !overlay || typeof window.openModal !== 'function') return;

    content.innerHTML = buildFormHTML();
    overlay.setAttribute('aria-labelledby', 'feedback-title');
    window.openModal();
    openedAt = Date.now();

    document.getElementById('feedbackForm').addEventListener('submit', onSubmit);
    setTimeout(() => {
      const ta = document.getElementById('feedbackMessage');
      if (ta) ta.focus();
    }, 80);

    if (CONFIG.turnstileSiteKey) {
      const ts = await waitForTurnstile();
      const slot = document.getElementById('feedbackTurnstile');
      if (ts && slot && !slot.dataset.rendered) {
        slot.dataset.rendered = '1';
        try {
          turnstileWidgetId = ts.render(slot, {
            sitekey: CONFIG.turnstileSiteKey,
            theme: 'light',
            appearance: 'always',
          });
        } catch (e) {
          console.error('[feedback] turnstile render failed', e);
        }
      }
    }
  }

  function setStatus(msg, kind) {
    const el = document.getElementById('feedbackStatus');
    if (!el) return;
    el.textContent = msg;
    el.style.color = kind === 'error' ? 'var(--accent)'
                   : kind === 'ok'    ? 'var(--green)'
                                      : 'var(--ink-muted)';
  }

  const ERR_MAP = {
    too_short: 'сообщение слишком короткое',
    too_long: 'сообщение слишком длинное',
    turnstile_required: 'не пройдена проверка Cloudflare',
    turnstile_failed: 'проверка Cloudflare не пройдена',
    invalid_json: 'некорректный запрос',
    server_misconfigured: 'сервер не настроен',
    github_failed: 'GitHub отклонил запрос',
  };

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const submit = form.querySelector('.feedback-submit');
    const message = (form.message.value || '').trim();
    const contact = (form.contact.value || '').trim();

    if (message.length < 10) return setStatus('Сообщение слишком короткое — минимум 10 символов.', 'error');
    if (message.length > 5000) return setStatus('Сообщение слишком длинное — максимум 5000 символов.', 'error');
    if (Date.now() - openedAt < 800) return setStatus('Слишком быстро — попробуйте ещё раз.', 'error');

    let turnstileToken = '';
    if (CONFIG.turnstileSiteKey) {
      const tsField = form.querySelector('input[name="cf-turnstile-response"]');
      turnstileToken = tsField ? tsField.value : '';
      if (!turnstileToken) return setStatus('Идёт проверка Cloudflare — подождите секунду и нажмите ещё раз.', 'error');
    }

    submit.disabled = true;
    setStatus('Отправляем…', 'pending');

    try {
      const resp = await fetch(CONFIG.workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, contact, turnstileToken, page: location.href }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data.ok) {
        const reason = ERR_MAP[data.error] || 'попробуйте позже';
        setStatus(`Не получилось отправить: ${reason}.`, 'error');
        submit.disabled = false;
        if (CONFIG.turnstileSiteKey && window.turnstile && turnstileWidgetId) {
          try { window.turnstile.reset(turnstileWidgetId); } catch (_) {}
        }
        return;
      }
      const content = document.getElementById('modalContent');
      content.innerHTML = buildSuccessHTML(data.url, data.number);
      const closeBtn = document.getElementById('feedbackCloseBtn');
      if (closeBtn) closeBtn.addEventListener('click', () => window.closeModal());
    } catch (err) {
      setStatus('Сетевая ошибка. Проверьте подключение и попробуйте снова.', 'error');
      submit.disabled = false;
    }
  }

  function init() {
    injectButton();
    loadTurnstileScript();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
