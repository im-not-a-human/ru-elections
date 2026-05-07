// Renders cross-cutting plot cards from window.CROSS_CUTTING into #crossCuttingCards.
window.renderCrossCuttingCards = function renderCrossCuttingCards() {
  const root = document.getElementById('crossCuttingCards');
  if (!root || !window.CROSS_CUTTING) return;
  root.innerHTML = window.CROSS_CUTTING.map(c => `
    <a class="cc-card" href="${c.href}">
      <div class="cc-label">${c.label}</div>
      <h4 class="cc-title">${c.title}</h4>
      <p class="cc-blurb">${c.blurb}</p>
      <span class="cc-read">Читать →</span>
    </a>
  `).join('');
};
