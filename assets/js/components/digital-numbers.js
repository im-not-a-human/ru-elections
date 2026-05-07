// Renders the 4 hero "big numbers" for tsenzura page.
window.renderDigitalNumbers = function () {
  const wrap = $('#heroNumbers');
  if (!wrap || typeof DIGITAL_HERO_NUMBERS === 'undefined') return;

  wrap.innerHTML = DIGITAL_HERO_NUMBERS.map(n => {
    const c = n.counter || {};
    const target = c.target != null ? c.target : '';
    const decimals = c.decimals != null ? c.decimals : 0;
    const prefix = c.prefix || '';
    const suffix = c.suffix || '';
    const counterAttrs = c.target != null
      ? `class="counter" data-target="${target}" data-decimals="${decimals}"${prefix ? ` data-prefix="${prefix}"` : ''}${suffix ? ` data-suffix="${suffix}"` : ''}`
      : '';
    const numHtml = c.target != null
      ? `<span ${counterAttrs}>${n.value}</span>`
      : n.value;
    return `
      <div class="tsenzura-big-number">
        <div class="tsenzura-big-number-num ${n.tone || ''}">${numHtml}</div>
        <div class="tsenzura-big-number-label">${n.label}</div>
        <div class="tsenzura-big-number-source">${n.source}</div>
      </div>
    `;
  }).join('');

  if (typeof window.initCounters === 'function') window.initCounters();
};
