// EN translation of assets/js/components/cross-cutting-cards.js
// Sync source: assets/js/components/cross-cutting-cards.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

// Renders cross-cutting plot cards from window.CROSS_CUTTING into #crossCuttingCards.
window.renderCrossCuttingCards = function renderCrossCuttingCards() {
  const root = document.getElementById('crossCuttingCards');
  if (!root || !window.CROSS_CUTTING) return;
  root.innerHTML = window.CROSS_CUTTING.map(c => `
    <a class="cc-card" href="${c.href}">
      <div class="cc-label">${c.label}</div>
      <h4 class="cc-title">${c.title}</h4>
      <p class="cc-blurb">${c.blurb}</p>
      <span class="cc-read">Read →</span>
    </a>
  `).join('');
};
