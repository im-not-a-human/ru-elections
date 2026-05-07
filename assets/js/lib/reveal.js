// Generic reveal-on-scroll: add class .is-visible when element enters viewport.
// Use on .reveal, .waffle, .districts-grid, .flow, .distortion-row, etc.
// No-JS fallback: CSS keeps content visible by default; this script flips the
// page into "armed" mode that opts elements into the hidden→visible animation.
(function () {
  const observed = '.reveal, .waffle, .districts-grid, .flow, .distortion-row, [data-reveal]';

  function init() {
    const targets = $$(observed);
    if (!targets.length) return;

    // If IntersectionObserver isn't available, just reveal everything.
    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (entry.target.dataset.revealOnce !== 'false') io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    targets.forEach((t) => io.observe(t));
  }

  window.initReveal = init;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
