// EN translation of assets/js/lib/feedback.js
// Sync source: assets/js/lib/feedback.js
// Glossary: research/i18n_glossary_draft.md

// Feedback button — floating circle bottom-right, opens a form in the shared modal.
// The message is sent to a Cloudflare Worker (see /feedback-worker/), which
// creates a GitHub issue in this repository. Fill in CONFIG below after
// deploying the worker. Both values are public — they are not secrets.
(function () {
  const CONFIG = {
    workerUrl: 'https://gbv-feedback.gbv-relay.workers.dev',
    turnstileSiteKey: '',   // e.g. '0x4AAAAAAA...'  Empty = Turnstile disabled.
  };

  if (!CONFIG.workerUrl) return; // not configured — do not show button

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
    btn.setAttribute('aria-label', 'Suggest an idea or report an error');
    btn.title = 'Suggest an idea or report an error';
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    `;
    btn.addEventListener('click', openFeedback);
    document.body.appendChild(btn);

    // Allow any element with [data-open-feedback] (e.g. the dev-banner
    // link "feedback") to trigger the feedback form.
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
        <span class="modal-tag" style="background: var(--bg-paper); color: var(--ink-soft);">Feedback</span>
        <h2 class="modal-title" id="feedback-title">An idea or a comment?</h2>
        <p style="margin: 8px 0 0; font-size: 14px; color: var(--ink-soft); line-height: 1.55;">
          Your message will be sent to the site author as an issue in the public GitHub repository.
          No registration required.
        </p>
      </div>
      <div class="modal-content">
        <form class="feedback-form" id="feedbackForm" novalidate>
          <div class="feedback-field">
            <label for="feedbackMessage">What would you like to suggest, or what is wrong?</label>
            <textarea id="feedbackMessage" name="message" required
              minlength="10" maxlength="5000"
              placeholder="For example: on the Electoral Maths page, in the scenario calculator…"></textarea>
            <div class="feedback-hint">Minimum 10 characters, maximum 5 000. Markdown supported.</div>
          </div>
          <div class="feedback-field">
            <label for="feedbackContact">Contact (optional)</label>
            <input id="feedbackContact" name="contact" type="text" maxlength="200"
              placeholder="Email, Telegram, or GitHub username — if you would like a reply">
            <div class="feedback-hint">You may leave this blank. This field will become part of the public issue, so do not include anything sensitive.</div>
          </div>
          <div class="feedback-notice">
            <strong>Important.</strong> Your message will become a <strong>public</strong> GitHub issue in the open repository
            <span class="mono">im-not-a-human/ru-elections</span>. Do not include passwords, personal data, or confidential information.
          </div>
          ${turnstileSlot}
          <div class="feedback-actions">
            <button type="submit" class="feedback-submit">Submit</button>
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
        <span class="modal-tag" style="background: var(--green-soft); color: var(--green);">Submitted</span>
        <h2 class="modal-title">Thank you. Message received.</h2>
      </div>
      <div class="modal-content">
        <p style="font-size: 15px; line-height: 1.65; color: var(--ink); margin: 0 0 20px;">
          Issue
          <a href="${safeUrl}" target="_blank" rel="noopener"
             style="color: var(--accent); font-weight: 600;">#${num}</a>
          has been created in the repository. The author will see it and be able to respond.
        </p>
        <button type="button" class="feedback-submit" id="feedbackCloseBtn">Close</button>
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
    too_short: 'message too short',
    too_long: 'message too long',
    turnstile_required: 'Cloudflare verification not completed',
    turnstile_failed: 'Cloudflare verification failed',
    invalid_json: 'invalid request',
    server_misconfigured: 'server not configured',
    github_failed: 'GitHub rejected the request',
  };

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const submit = form.querySelector('.feedback-submit');
    const message = (form.message.value || '').trim();
    const contact = (form.contact.value || '').trim();

    if (message.length < 10) return setStatus('Message too short — minimum 10 characters.', 'error');
    if (message.length > 5000) return setStatus('Message too long — maximum 5 000 characters.', 'error');
    if (Date.now() - openedAt < 800) return setStatus('Too fast — please try again.', 'error');

    let turnstileToken = '';
    if (CONFIG.turnstileSiteKey) {
      const tsField = form.querySelector('input[name="cf-turnstile-response"]');
      turnstileToken = tsField ? tsField.value : '';
      if (!turnstileToken) return setStatus('Cloudflare verification in progress — please wait a moment and try again.', 'error');
    }

    submit.disabled = true;
    setStatus('Submitting…', 'pending');

    try {
      const resp = await fetch(CONFIG.workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, contact, turnstileToken, page: location.href }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data.ok) {
        const reason = ERR_MAP[data.error] || 'please try again later';
        setStatus(`Failed to send: ${reason}.`, 'error');
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
      setStatus('Network error. Please check your connection and try again.', 'error');
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
