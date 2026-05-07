// EN translation of assets/js/components/extended-parties.js
// Sync source: assets/js/components/extended-parties.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

// Renders 14-party grid grouped by category into #extendedParties.
window.renderExtendedParties = function renderExtendedParties() {
  const root = document.getElementById('extendedParties');
  if (!root || !window.EXTENDED_PARTIES || !window.EXTENDED_PARTY_CATEGORIES) return;

  const html = window.EXTENDED_PARTY_CATEGORIES.map(cat => {
    const partiesInCat = window.EXTENDED_PARTIES.filter(p => p.category === cat.id);
    const cards = partiesInCat.map(p => `
      <a class="ep-card" href="${p.href}" style="--stripe:${p.stripeColor}">
        <h4 class="ep-name">${p.name}</h4>
        <div class="ep-leader">${p.leader}${p.mandates ? ` · ${p.mandates} ${p.mandates === 1 ? 'mandate' : 'mandates'}` : ''}</div>
        <div class="ep-metric">
          ${p.supportPct !== null ? `<span class="ep-num">${p.supportPct}%</span> support<br>` : ''}
          <span class="ep-num">${p.budgetPct}%</span> of budget · <span class="ep-num">${p.income2025}</span>
        </div>
        ${p.hookBadge ? `<span class="ep-badge">${p.hookBadge}</span>` : ''}
      </a>
    `).join('');
    return `
      <div class="ep-cat-h">
        <h3>${cat.title}</h3>
        <div class="ep-cat-meta">${cat.meta}</div>
      </div>
      <div class="ep-cat-grid">${cards}</div>
    `;
  }).join('');

  root.innerHTML = html;
};
