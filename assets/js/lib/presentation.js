// Presentation mode — fullscreen slide-deck overlay shared by all pages.
// Each page declares its own deck:
//
//   window.PresentSlides = [
//     { id: 'matrix', sources: ['#matrix'], layout: 'wide' },
//     { id: 'paradox', sources: ['#paradox'] },
//     { id: 'hero',    sources: ['.hero'], layout: 'cover' },
//   ];
//
// On entry the engine RELOCATES referenced section nodes into the overlay
// (one slide at a time) and restores them on exit. Chart.js instances stay
// alive — moving a node doesn't destroy the canvas. Sources are resolved
// lazily via querySelector, so the deck file can run before init.
//
// Public surface:  window.Presentation = { start, exit, next, prev, goto }
// URL sync:        ?present=N persists the active slide for sharing.
// Keyboard:        ← → space PgUp/PgDn Home End  Esc  F (fullscreen)
//
// Heritage: shares the FAB pattern with feedback.js / lang-switch.js;
// styles in assets/css/presentation.css; respects prefers-reduced-motion.

(function () {
  const LANG = (document.documentElement.lang || 'ru').slice(0, 2) === 'en' ? 'en' : 'ru';
  const I18N = {
    ru: {
      open: 'Презентация',
      close: 'Закрыть презентацию',
      fullscreen: 'Полноэкранный режим',
      next: 'Следующий слайд',
      prev: 'Предыдущий слайд',
      counter: (i, n) => `${i + 1} / ${n}`,
      hint: '← →  пробел  ·  Esc — выход',
      ariaNav: 'Навигация по слайдам',
    },
    en: {
      open: 'Presentation',
      close: 'Exit presentation',
      fullscreen: 'Fullscreen',
      next: 'Next slide',
      prev: 'Previous slide',
      counter: (i, n) => `${i + 1} / ${n}`,
      hint: '← →  space  ·  Esc to exit',
      ariaNav: 'Slide navigation',
    },
  };
  const T = I18N[LANG];
  const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let state = null;

  /* ---------- FAB ---------- */
  function injectFab() {
    if (document.querySelector('.present-fab')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'present-fab';
    btn.setAttribute('aria-label', T.open);
    btn.title = T.open;
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="13" rx="2"/>
        <path d="M9 21h6"/><path d="M12 17v4"/>
        <polygon points="10,8 16,11 10,14" fill="currentColor" stroke="none"/>
      </svg>
    `;
    btn.addEventListener('click', () => start());
    document.body.appendChild(btn);
  }

  /* ---------- Lifecycle ---------- */
  function start(opts) {
    if (state) return;
    const slides = window.PresentSlides;
    if (!slides || !slides.length) return;
    const i = clamp(opts && Number.isFinite(opts.index) ? opts.index : 0, 0, slides.length - 1);

    state = {
      slides,
      index: -1,
      restorers: [],
      overlay: null,
      stage: null,
      titleEl: null,
      counterEl: null,
      progressEl: null,
      dotsEl: null,
      prevBtn: null,
      nextBtn: null,
      onKey: null,
      onResize: null,
      touch: null,
      hintEl: null,
    };

    buildOverlay();
    document.body.classList.add('is-present');

    state.onKey = onKeyDown;
    window.addEventListener('keydown', state.onKey);
    state.onResize = debounce(resizeCharts, 120);
    window.addEventListener('resize', state.onResize);

    setupSwipe();
    goto(i, /*initial=*/true);
  }

  function exit() {
    if (!state) return;
    // Restore relocated sections from current slide.
    state.restorers.slice().reverse().forEach(r => { try { r(); } catch (_) {} });
    state.restorers = [];
    state.overlay.remove();
    document.body.classList.remove('is-present');
    window.removeEventListener('keydown', state.onKey);
    window.removeEventListener('resize', state.onResize);
    if (document.fullscreenElement) {
      try { document.exitFullscreen(); } catch (_) {}
    }
    state = null;
    syncUrl(null);
  }

  /* ---------- Overlay DOM ---------- */
  function buildOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'present-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', T.open);
    overlay.innerHTML = `
      <div class="present-progress" aria-hidden="true"><div class="present-progress-bar"></div></div>
      <header class="present-header">
        <span class="present-counter" aria-live="polite"></span>
        <h1 class="present-title"></h1>
        <div class="present-actions">
          <button type="button" class="present-fs-btn" aria-label="${T.fullscreen}" title="${T.fullscreen}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 8V4h4M21 8V4h-4M3 16v4h4M21 16v4h-4"/>
            </svg>
          </button>
          <button type="button" class="present-close" aria-label="${T.close}" title="${T.close}">×</button>
        </div>
      </header>
      <div class="present-stage" tabindex="-1"></div>
      <nav class="present-nav" aria-label="${T.ariaNav}">
        <button type="button" class="present-prev" aria-label="${T.prev}" title="${T.prev}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div class="present-dots" role="tablist"></div>
        <button type="button" class="present-next" aria-label="${T.next}" title="${T.next}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </nav>
    `;
    document.body.appendChild(overlay);

    state.overlay = overlay;
    state.stage = overlay.querySelector('.present-stage');
    state.titleEl = overlay.querySelector('.present-title');
    state.counterEl = overlay.querySelector('.present-counter');
    state.progressEl = overlay.querySelector('.present-progress-bar');
    state.dotsEl = overlay.querySelector('.present-dots');
    state.prevBtn = overlay.querySelector('.present-prev');
    state.nextBtn = overlay.querySelector('.present-next');

    overlay.querySelector('.present-close').addEventListener('click', exit);
    state.prevBtn.addEventListener('click', prev);
    state.nextBtn.addEventListener('click', next);
    overlay.querySelector('.present-fs-btn').addEventListener('click', toggleFullscreen);

    state.slides.forEach((s, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'present-dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `${T.counter(i, state.slides.length)}`);
      dot.addEventListener('click', () => goto(i));
      state.dotsEl.appendChild(dot);
    });

    // First-run hint
    state.hintEl = document.createElement('div');
    state.hintEl.className = 'present-hint';
    state.hintEl.textContent = T.hint;
    overlay.appendChild(state.hintEl);
  }

  /* ---------- Slide change ---------- */
  function goto(i, initial) {
    if (!state) return;
    if (i < 0 || i >= state.slides.length) return;
    if (i === state.index) return;

    // Restore previous slide's sources
    state.restorers.slice().reverse().forEach(r => { try { r(); } catch (_) {} });
    state.restorers = [];
    state.stage.innerHTML = '';

    const slide = state.slides[i];
    state.index = i;

    const slideEl = document.createElement('div');
    slideEl.className = 'present-slide';
    slideEl.dataset.layout = slide.layout || 'default';
    slideEl.dataset.id = slide.id || `slide-${i}`;
    state.stage.appendChild(slideEl);

    if (typeof slide.render === 'function') {
      slide.render(slideEl, slide);
    }

    if (Array.isArray(slide.sources)) {
      slide.sources.forEach(src => relocateInto(src, slideEl));
    }

    // Title — explicit > derived from first heading
    state.titleEl.textContent = slide.title || deriveTitle(slideEl) || '';
    state.counterEl.textContent = T.counter(i, state.slides.length);
    state.progressEl.style.width = `${((i + 1) / state.slides.length) * 100}%`;
    Array.from(state.dotsEl.children).forEach((d, idx) => {
      d.classList.toggle('is-current', idx === i);
      d.setAttribute('aria-selected', idx === i ? 'true' : 'false');
    });
    state.prevBtn.disabled = i === 0;
    state.nextBtn.disabled = i === state.slides.length - 1;

    if (state.hintEl && i !== 0) state.hintEl.style.display = 'none';

    // Enter animation — toggle classes across two RAFs to ensure transition.
    if (!REDUCED) {
      slideEl.classList.add('present-slide--enter');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => slideEl.classList.add('present-slide--enter-active'));
      });
    }

    // Re-trigger reveal observers for any in-slide elements
    slideEl.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));

    // Reset stage scroll & focus
    state.stage.scrollTop = 0;
    if (!initial) state.stage.focus({ preventScroll: true });

    // Resize Chart.js instances after layout settles
    requestAnimationFrame(() => requestAnimationFrame(resizeCharts));

    syncUrl(i);
  }

  function next() { if (state && state.index < state.slides.length - 1) goto(state.index + 1); }
  function prev() { if (state && state.index > 0) goto(state.index - 1); }

  /* ---------- Source relocation ---------- */
  function relocateInto(src, target) {
    let node = null;
    if (typeof src === 'string') {
      node = document.querySelector(src) || document.getElementById(src);
    } else if (src && src.nodeType === 1) {
      node = src;
    }
    if (!node || node === target || target.contains(node)) return;

    const anchor = document.createComment('present-anchor');
    node.parentNode.insertBefore(anchor, node);
    target.appendChild(node);

    state.restorers.push(() => {
      if (anchor.parentNode) anchor.parentNode.insertBefore(node, anchor);
      anchor.remove();
    });
  }

  function deriveTitle(slideEl) {
    const h = slideEl.querySelector('h1, h2, .section-label');
    return h ? h.textContent.trim().replace(/\s+/g, ' ') : '';
  }

  /* ---------- Chart.js resize ---------- */
  function resizeCharts() {
    if (!state || !window.Chart || typeof window.Chart.getChart !== 'function') return;
    state.stage.querySelectorAll('canvas').forEach(c => {
      const inst = window.Chart.getChart(c);
      if (inst) { try { inst.resize(); } catch (_) {} }
    });
  }

  /* ---------- Keyboard ---------- */
  function onKeyDown(e) {
    if (!state) return;
    // ignore if user is typing in a slide input (calculators have ranges)
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
      if (e.key === 'Escape') exit();
      return;
    }
    switch (e.key) {
      case 'Escape':    e.preventDefault(); exit(); break;
      case 'ArrowRight':
      case 'PageDown':
      case ' ':         e.preventDefault(); next(); break;
      case 'ArrowLeft':
      case 'PageUp':    e.preventDefault(); prev(); break;
      case 'Home':      e.preventDefault(); goto(0); break;
      case 'End':       e.preventDefault(); goto(state.slides.length - 1); break;
      case 'f':
      case 'F':         e.preventDefault(); toggleFullscreen(); break;
    }
  }

  /* ---------- Fullscreen ---------- */
  function toggleFullscreen() {
    const el = document.documentElement;
    if (!document.fullscreenElement) {
      const req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
      if (req) req.call(el).catch(() => {});
    } else {
      const exitFn = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
      if (exitFn) exitFn.call(document);
    }
  }

  /* ---------- Touch swipe ---------- */
  function setupSwipe() {
    state.overlay.addEventListener('touchstart', onTouchStart, { passive: true });
    state.overlay.addEventListener('touchend', onTouchEnd, { passive: true });
  }
  function onTouchStart(e) {
    const t = e.changedTouches[0];
    state.touch = { x: t.clientX, y: t.clientY, t: Date.now() };
  }
  function onTouchEnd(e) {
    if (!state || !state.touch) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - state.touch.x;
    const dy = t.clientY - state.touch.y;
    const dt = Date.now() - state.touch.t;
    state.touch = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4 && dt < 700) {
      if (dx < 0) next(); else prev();
    }
  }

  /* ---------- URL sync ---------- */
  function syncUrl(index) {
    try {
      const url = new URL(window.location);
      if (index === null || index === undefined) {
        url.searchParams.delete('present');
      } else {
        url.searchParams.set('present', String(index));
      }
      history.replaceState(null, '', url);
    } catch (_) {}
  }

  function autoStartFromUrl() {
    let p;
    try { p = new URL(window.location).searchParams.get('present'); } catch (_) { return; }
    if (p === null) return;
    const idx = parseInt(p, 10);
    if (!Number.isFinite(idx) || idx < 0) return;
    // Wait for page init + deck registration; poll up to ~3s.
    const deadline = Date.now() + 3000;
    (function tryStart() {
      if (window.PresentSlides && window.PresentSlides.length) {
        start({ index: idx });
      } else if (Date.now() < deadline) {
        setTimeout(tryStart, 80);
      }
    })();
  }

  /* ---------- Utils ---------- */
  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
  function debounce(fn, ms) {
    let h;
    return function () {
      const args = arguments;
      clearTimeout(h);
      h = setTimeout(() => fn.apply(null, args), ms);
    };
  }

  /* ---------- Init ---------- */
  function init() {
    injectFab();
    autoStartFromUrl();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.Presentation = { start, exit, next, prev, goto };
})();
