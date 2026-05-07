// "Sankey-lite" flow: two columns of bars connected by an arrow.
// Layout per row:
//   [ label-outside ][ ----- coloured bar (width = %) ----- ][ value ]
// Label sits outside the bar so it never collides with the fill colour
// or wraps onto a second line.
window.renderFlow = function (selector, leftCol, rightCol) {
  const el = $(selector);
  if (!el) return;
  el.classList.add('flow');
  const totalLeft = leftCol.reduce((a, b) => a + b.value, 0) || 1;
  const totalRight = rightCol.reduce((a, b) => a + b.value, 0) || 1;

  function barRow(item, total) {
    const w = (item.value / total) * 100;
    return `
      <div class="flow-row">
        <div class="flow-row-label">${item.label}</div>
        <div class="flow-row-track">
          <div class="flow-row-fill" style="background:${item.color}; width:${w}%"></div>
        </div>
        <div class="flow-row-value">${item.display || (item.value.toFixed(1) + '%')}</div>
      </div>
    `;
  }

  el.innerHTML = `
    <div class="flow-col">${leftCol.map(i => barRow(i, totalLeft)).join('')}</div>
    <div class="flow-arrow" aria-hidden="true">→</div>
    <div class="flow-col">${rightCol.map(i => barRow(i, totalRight)).join('')}</div>
  `;

  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-visible')));
};
