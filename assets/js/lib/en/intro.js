// EN translation of assets/js/lib/intro.js
// Sync source: assets/js/lib/intro.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

// Intro disclaimer popup — 10-minute cooldown across navigations and reloads.
//   1. window.__gbvIntroShown — in-page memory (cheapest check).
//   2. localStorage 'gbv-intro-last' — timestamp of last appearance;
//      suppresses the disclaimer for COOLDOWN_MS regardless of cross-page
//      navigation, reload, or new tab. Resurfaces after the cooldown.
(function () {
  const LS_KEY = 'gbv-intro-last';
  const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes

  function alreadyShown() {
    if (window.__gbvIntroShown) return true;
    try {
      const last = parseInt(localStorage.getItem(LS_KEY) || '0', 10);
      if (last && Date.now() - last < COOLDOWN_MS) return true;
    } catch (_) {}
    return false;
  }
  function markShown() {
    window.__gbvIntroShown = true;
    try { localStorage.setItem(LS_KEY, String(Date.now())); } catch (_) {}
  }

  function init() {
    if (alreadyShown()) return;

    const previousFocus = document.activeElement;

    const overlay = document.createElement('div');
    overlay.className = 'intro-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'intro-title');
    overlay.innerHTML = `
      <div class="intro-card">
        <div class="intro-head">
          <div class="intro-mark">Г</div>
          <div class="intro-tabs" role="tablist" aria-label="Reading mode">
            <button type="button" class="intro-tab is-active" role="tab"
              aria-selected="true" data-mode="reader" id="intro-tab-reader" aria-controls="intro-pane-reader">
              <span class="intro-tab-ico" aria-hidden="true">📖</span>
              For readers
            </button>
            <button type="button" class="intro-tab" role="tab"
              aria-selected="false" data-mode="streamer" id="intro-tab-streamer" aria-controls="intro-pane-streamer">
              <span class="intro-tab-ico" aria-hidden="true">🎙</span>
              For streamers / broadcasts
            </button>
          </div>
        </div>

        <h2 id="intro-title" class="intro-title" data-mode-title>About this material</h2>

        <div class="intro-body">
          <div class="intro-pane is-active" id="intro-pane-reader" role="tabpanel" aria-labelledby="intro-tab-reader">
            <p>This is <strong>independent research</strong> based on open-source data: official publications of the State Duma (sozd.duma.gov.ru), Russia's Central Election Commission (cikrf.ru), state-owned media (TASS, RIA Novosti, Rossiyskaya Gazeta, Parlamentskaya Gazeta), the business press (Kommersant, Vedomosti, RBC, Forbes Russia), and the official texts of federal laws (pravo.gov.ru, garant.ru, consultant.ru).</p>
            <p>Every factual claim is accompanied by <strong>a link to the primary source</strong>. Where the author's own assessment is present, it is expressed as an editorial judgement and kept separate from the factual record.</p>

            <div class="intro-author">
              <div class="intro-author-label">About the author's position</div>
              <p>The site's author is <strong>not a political scientist or sociologist</strong>; their academic and professional background is in an adjacent technical field (automation systems, AI agents). This site is an <strong>experimental project</strong>: all analysis, calculations, texts, and interactive features were produced by AI agents under the author's supervision — which is itself part of their specialism.</p>
              <p>This is <strong>analysis of public data, not political agitation</strong>. The site contains no calls to action, is not affiliated with any political movement or organisation, and has no intention of discrediting state institutions. The aim is to demonstrate that modern tools allow anyone to compile a multi-layered analytical resource from open data and test its soundness.</p>
            </div>

            <div class="intro-author">
              <div class="intro-author-label">Source criteria</div>
              <p>The site draws primarily on <strong>primary documents</strong>: legislative texts, CEC resolutions, State Duma transcripts, and roll-call vote records. Where <strong>quotes from public commentators</strong> are cited (Schulmann, Gallyamov, Kynev, Katz, Lyubarev, and others), these illustrate positions rather than confirm facts; facts are confirmed by primary sources only.</p>
              <p>The site's author <strong>does not identify with any political camp</strong> — neither 'liberal' nor 'statist' — and does not treat the assessments of individual commentators as arguments in their own right. The inclusion of a quote does not imply the author's endorsement of the person quoted or their activities.</p>
            </div>

            <p class="intro-muted">This material is for informational and educational purposes. The project is not funded by foreign sources, is not affiliated with any organisations, and receives no support of any kind from foreign persons.</p>
          </div>

          <div class="intro-pane" id="intro-pane-streamer" role="tabpanel" aria-labelledby="intro-tab-streamer" hidden>
            <div class="intro-streamer-meta">
              Author's note. Not for reading aloud — for understanding the context. I recommend that streamers and viewers read this before diving into the material.
            </div>
            <div class="intro-streamer-body">
              <p>Hello.</p>
              <p>This site is made by one anonymous person with the help of AI agents. I ask a question — "what exactly does CPRF funding look like for 2017–2025?" — the agents gather sources and write a draft, I check it against the primary documents and revise. That process produced 18 laws, 14 parties, 6 storylines, 233 documents, and three interactive calculators. One person without agents couldn't have done this; with the old tools, neither.</p>
              <p>Which means the site isn't perfect: somewhere an agent may have glossed over a nuance, somewhere I may have missed a typo. If something looks wrong — write to me via GitHub Issues or a PR, and I'll fix it.</p>
              <p>Streamers — go ahead and show it; you can use the whole thing or excerpts on air (CC BY 4.0). No need to credit me by name: cite the CEC, SOZD, kremlin.ru — they carry more weight than I do.</p>
              <p>Readers — don't take my word for it. Every number has a link to the primary source; every claim has a document behind it. Open vote.duma.gov.ru alongside this page, move the sliders in the calculators. If a number contradicts its source — then I made a mistake, and that needs fixing. Quotes from across the political spectrum illustrate positions, not arguments.</p>
              <p>I'm not a politician and not a journalist. I'm an AI engineer who tried to prove that modern tools let anyone compile verifiable, multi-layered analysis from open data. The numbers should be visible — and now they are.</p>
              <p>Good luck.</p>
            </div>
            <button type="button" class="intro-streamer-copy" data-copy>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <span class="intro-streamer-copy-label">copy the note</span>
              <span class="intro-streamer-copy-toast" aria-hidden="true">✓ copied</span>
            </button>
          </div>
        </div>

        <a class="intro-repo" href="https://github.com/im-not-a-human/ru-elections" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.19-1.48 3.15-1.17 3.15-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.25 5.65.41.36.78 1.05.78 2.12v3.14c0 .31.21.67.8.56 4.57-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5z"/>
          </svg>
          <span>Site source code · <strong>github.com/im-not-a-human/ru-elections</strong></span>
          <span class="intro-repo-arrow" aria-hidden="true">↗</span>
        </a>

        <button class="intro-btn" type="button">Got it</button>
      </div>
    `;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    markShown(); // mark even before dismiss — once visible, don't repeat in this tab/session
    // Inert background so screen readers / keyboard skip past nav/main/footer
    ['nav.topnav', 'main', 'footer'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); }
    });

    // Trigger fade-in on next frame so transition plays
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('is-open')));

    // Focus the dismiss button after the fade-in.
    // preventScroll: focusing the bottom button would otherwise scroll the
    // card to it, hiding the tabs (including the streamer tab) at the top.
    setTimeout(() => overlay.querySelector('.intro-btn')?.focus({ preventScroll: true }), 60);

    function dismiss() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      markShown(); // suppress on subsequent SPA-navigations / refreshes within tab
      document.removeEventListener('keydown', onKey);
      ['nav.topnav', 'main', 'footer'].forEach(sel => {
        const el = document.querySelector(sel);
        if (el) { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); }
      });
      setTimeout(() => {
        overlay.remove();
        if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
      }, 360);
    }

    function focusableIn(root) {
      return Array.from(root.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(el => el.offsetParent !== null && !el.hasAttribute('hidden'));
    }

    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); dismiss(); return; }
      if (e.key !== 'Tab') return;
      const f = focusableIn(overlay);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !overlay.contains(active))) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && (active === last || !overlay.contains(active))) {
        e.preventDefault(); first.focus();
      }
    }

    overlay.querySelector('.intro-btn').addEventListener('click', dismiss);
    document.addEventListener('keydown', onKey);

    // Mode toggle (reader / streamer)
    const tabs = overlay.querySelectorAll('.intro-tab');
    const panes = {
      reader: overlay.querySelector('#intro-pane-reader'),
      streamer: overlay.querySelector('#intro-pane-streamer'),
    };
    const titleByMode = {
      reader: 'About this material',
      streamer: "Author's note",
    };
    const titleEl = overlay.querySelector('[data-mode-title]');
    tabs.forEach(t => {
      t.addEventListener('click', () => {
        const mode = t.dataset.mode;
        tabs.forEach(b => {
          const on = b === t;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        Object.entries(panes).forEach(([k, el]) => {
          if (!el) return;
          const on = k === mode;
          el.classList.toggle('is-active', on);
          if (on) el.removeAttribute('hidden'); else el.setAttribute('hidden', '');
        });
        if (titleEl) titleEl.textContent = titleByMode[mode] || titleByMode.reader;
      });
    });

    // Copy-button inside the streamer pane
    const copyBtn = overlay.querySelector('[data-copy]');
    if (copyBtn) {
      copyBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const text = Array.from(
          overlay.querySelectorAll('.intro-streamer-body > p')
        ).map(p => p.textContent.trim()).join('\n\n');
        try {
          if (navigator.clipboard) await navigator.clipboard.writeText(text);
          else throw new Error('no clipboard');
        } catch {
          const t = document.createElement('textarea');
          t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
          document.body.appendChild(t); t.select();
          try { document.execCommand('copy'); } catch (_) {}
          document.body.removeChild(t);
        }
        copyBtn.classList.add('is-copied');
        setTimeout(() => copyBtn.classList.remove('is-copied'), 1800);
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
