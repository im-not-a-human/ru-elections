// Matrix table — main law/party heatmap on the home page.
window.renderMatrix = function (filter = 'all') {
  const tbody = $('#matrixBody');
  if (!tbody) return;

  let lawsToShow = LAWS;
  if (filter === 'digital') lawsToShow = LAWS.filter(l => l.category === 'digital');
  else if (filter === 'civil') lawsToShow = LAWS.filter(l => l.category === 'civil');
  else if (filter === 'opposed') lawsToShow = LAWS.filter(l =>
    Object.values(l.votes).some(v => v === 'against' || v === 'partial-against' || v === 'abstain' || v === 'didnt-vote')
  );

  lawsToShow = lawsToShow.slice().sort((a, b) => b.year - a.year);

  tbody.innerHTML = lawsToShow.map(law => `
    <tr class="law-row" data-law-id="${law.id}">
      <td>
        <div class="law-cell">
          <div class="law-cell-year mono">${law.date}</div>
          <div class="law-cell-title">${law.title}</div>
          <div class="law-cell-meta">
            <span class="cat-tag ${law.category}">${CAT_LABELS[law.category]}</span>
            <span class="mono">${law.fzCode}</span>
          </div>
        </div>
      </td>
      ${PARTY_CODES.map(party => {
        const v = law.votes[party];
        return `<td><div class="vote-cell ${v}" data-party="${party}" data-vote="${v}" data-law-title="${law.title}">${VOTE_LABELS[v] || ''}</div></td>`;
      }).join('')}
    </tr>
  `).join('');

  $$('.law-row').forEach(row => {
    row.addEventListener('click', () => openLawModal(row.dataset.lawId));
  });

  $$('.vote-cell').forEach(cell => {
    cell.addEventListener('mouseenter', (e) => showVoteTooltip(e, cell.dataset));
    cell.addEventListener('mouseleave', hideTooltip);
    cell.addEventListener('mousemove', moveTooltip);
  });
};

window.wirePartyHeaders = function () {
  $$('.party-head').forEach(th => {
    th.addEventListener('click', () => openPartyModal(th.dataset.party));
  });
};

window.wireFilters = function () {
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMatrix(btn.dataset.filter);
    });
  });
};
