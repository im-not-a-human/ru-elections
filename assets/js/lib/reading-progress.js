// Тонкий progress-bar под sticky nav. Показывает прогресс чтения.
// Уважает prefers-reduced-motion (без transition).
(function () {
  function init() {
    const bar = document.createElement('div');
    bar.className = 'reading-progress';
    bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = '<div class="reading-progress-fill"></div>';
    document.body.appendChild(bar);

    const fill = bar.querySelector('.reading-progress-fill');
    let ticking = false;

    function update() {
      const doc = document.documentElement;
      const max = (doc.scrollHeight - window.innerHeight) || 1;
      const pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
      fill.style.transform = `scaleX(${pct / 100})`;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
