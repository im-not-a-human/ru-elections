// EN translation of assets/js/lib/counter.js
// Sync source: assets/js/lib/counter.js
// Glossary: research/i18n_glossary_draft.md

// Animated number counter. Element opts in via class .counter and data-target attribute.
// Optional: data-prefix, data-suffix, data-decimals, data-duration (ms).
(function () {
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animate(el) {
    const target = parseFloat(el.dataset.target);
    if (Number.isNaN(target)) return;
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = parseInt(el.dataset.duration || '1300', 10);
    const fmt = (n) => prefix + n.toLocaleString('en-GB', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + suffix;

    // Honour prefers-reduced-motion: skip animation, just set final value.
    const reduceMotion = window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      el.textContent = fmt(target);
      return;
    }

    const start = performance.now();
    el.textContent = fmt(0);
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const val = target * easeOutCubic(t);
      el.textContent = fmt(val);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target);
    }
    requestAnimationFrame(tick);
  }

  function init() {
    const counters = $$('.counter[data-target]');
    if (!counters.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => io.observe(c));
  }

  window.initCounters = init;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
