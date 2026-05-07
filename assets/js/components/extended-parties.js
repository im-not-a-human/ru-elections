// Russian plural helper: 1→one, 2-4→few, 5+→many (handles 11-14 exception)
function pluralRu(n, one, few, many) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

// Renders 14-party grid grouped by category into #extendedParties.
window.renderExtendedParties = function renderExtendedParties() {
  const root = document.getElementById('extendedParties');
  if (!root || !window.EXTENDED_PARTIES || !window.EXTENDED_PARTY_CATEGORIES) return;

  const html = window.EXTENDED_PARTY_CATEGORIES.map(cat => {
    const partiesInCat = window.EXTENDED_PARTIES.filter(p => p.category === cat.id);
    const cards = partiesInCat.map(p => `
      <a class="ep-card" href="${p.href}" style="--stripe:${p.stripeColor}">
        <h4 class="ep-name">${p.name}</h4>
        <div class="ep-leader">${p.leader}${p.mandates ? ` · ${p.mandates} ${pluralRu(p.mandates, 'мандат', 'мандата', 'мандатов')}` : ''}</div>
        <div class="ep-metric">
          ${p.supportPct !== null ? `<span class="ep-num">${p.supportPct}%</span> поддержки<br>` : ''}
          <span class="ep-num">${p.budgetPct}%</span> бюджет · <span class="ep-num">${p.income2025}</span>
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
