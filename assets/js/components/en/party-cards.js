// EN translation of assets/js/components/party-cards.js
// Sync source: assets/js/components/party-cards.js
// Glossary: research/i18n_glossary_draft.md

// Renders the 5-party grid on the home page.
window.renderPartyCards = function () {
  const grid = $('#partyGrid');
  if (!grid) return;

  grid.innerHTML = PARTY_CODES.map(code => {
    const p = PARTIES[code];
    const lawsWithVotes = LAWS.filter(l => l.votes[code] && l.votes[code] !== 'absent');
    const za = lawsWithVotes.filter(l => l.votes[code] === 'za').length;
    const total = lawsWithVotes.length;
    const pct = Math.round((za / total) * 100);

    return `
      <div class="party-card" data-party="${code}">
        <div class="party-card-accent" style="background: ${p.color}"></div>
        <div class="party-card-name">${p.short}</div>
        <div class="party-card-leader">${p.leader} · ${p.seats} seats</div>
        <div class="party-card-stat">
          <div class="party-card-num" style="color: ${p.color}">${pct}%</div>
          <div class="party-card-num-label">support for restrictions</div>
        </div>
        <div class="party-card-bar">
          <div class="party-card-bar-fill" style="width: ${pct}%; background: ${p.color}"></div>
        </div>
        <div class="party-card-text">${p.summary.substring(0, 130)}…</div>
        <div class="party-card-link">Open full profile →</div>
      </div>
    `;
  }).join('');

  $$('.party-card').forEach(card => {
    card.addEventListener('click', () => openPartyModal(card.dataset.party));
  });
};
