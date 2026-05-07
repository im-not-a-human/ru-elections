// Scroll-stepped reveal for .derivation .step blocks. Activates each step
// when ~40% of it is in viewport, deactivates when out. Lightweight, no parallax.
(function () {
  function init() {
    const steps = $$('.derivation .step');
    if (!steps.length || !('IntersectionObserver' in window)) {
      // Fallback: all steps visible
      steps.forEach(s => s.classList.add('is-active'));
      return;
    }
    const reduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      steps.forEach(s => s.classList.add('is-active'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-active');
        else entry.target.classList.remove('is-active');
      });
    }, { threshold: 0.4, rootMargin: '0px 0px -10% 0px' });
    steps.forEach(s => io.observe(s));
  }
  window.initScrollSteps = init;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
