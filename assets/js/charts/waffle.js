// Waffle chart: 10×10 grid where each cell = 1% of something.
// Usage: renderWaffle('#elementId', segments=[{pct, color, label}])
window.renderWaffle = function (selector, segments) {
  const el = $(selector);
  if (!el) return;
  el.classList.add('waffle');

  const cells = [];
  let cursor = 0;
  segments.forEach((seg) => {
    const count = Math.round(seg.pct);
    for (let i = 0; i < count; i++) {
      cells.push({ color: seg.color, label: seg.label });
      cursor++;
    }
  });
  while (cells.length < 100) cells.push({ color: 'var(--line-soft)', label: '—' });
  cells.length = 100;

  el.innerHTML = cells.map((c, idx) => {
    const row = Math.floor(idx / 10);
    const delay = (row * 30 + (idx % 10) * 8);
    return `<div class="waffle-cell" data-label="${c.label || ''}" style="background:${c.color}; transition-delay:${delay}ms"></div>`;
  }).join('');

  // Ensure visibility even if scroll-based reveal misfires;
  // CSS transition-delay still gives a staggered intro.
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-visible')));

  // Tooltip on hover
  $$('.waffle-cell', el).forEach((cell) => {
    cell.addEventListener('mouseenter', (e) => {
      if (typeof showTooltip === 'function' && cell.dataset.label) {
        showTooltip(e, `<strong>${cell.dataset.label}</strong>`);
      }
    });
    cell.addEventListener('mouseleave', () => typeof hideTooltip === 'function' && hideTooltip());
    cell.addEventListener('mousemove', (e) => typeof moveTooltip === 'function' && moveTooltip(e));
  });
};

window.renderWaffleLegend = function (selector, segments) {
  const el = $(selector);
  if (!el) return;
  el.classList.add('waffle-legend');
  el.innerHTML = segments.map(s => `
    <div class="waffle-legend-item">
      <div class="waffle-legend-swatch" style="background:${s.color}"></div>
      <span>${s.label} · <strong>${s.pct.toFixed(1)}%</strong></span>
    </div>
  `).join('');
};
