// Radial gauge — animated SVG arc indicator for a single percentage.
// Inspired by classic typography: thick rounded stroke, big numeric label centered.
// Usage: renderGauge('#elementId', {value: 72, label: '...', color: '#1A4584'})
window.renderGauge = function (selector, opts) {
  const el = $(selector);
  if (!el) return;
  el.classList.add('gauge');
  const value = Math.max(0, Math.min(100, opts.value));
  const color = opts.color || 'var(--accent)';
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  el.innerHTML = `
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <circle class="gauge-track" cx="100" cy="100" r="${radius}"></circle>
      <circle class="gauge-fill" cx="100" cy="100" r="${radius}"
        stroke="${color}"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${circumference}"></circle>
    </svg>
    <div class="gauge-label">
      <div class="gauge-num"><span class="counter" data-target="${value}" data-decimals="${opts.decimals || 0}" data-suffix="${opts.suffix || '%'}">${value}${opts.suffix || '%'}</span></div>
      ${opts.label ? `<div class="gauge-cap">${opts.label}</div>` : ''}
    </div>
  `;

  // Animate stroke-dashoffset on scroll into view
  const fill = $('.gauge-fill', el);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && fill) {
        fill.style.strokeDashoffset = offset;
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  io.observe(el);
};
