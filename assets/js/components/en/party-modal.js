// EN translation of assets/js/components/party-modal.js
// Sync source: assets/js/components/party-modal.js
// Glossary: research/i18n_glossary_draft.md

// Modal opened from party cards / matrix headers.
window.openPartyModal = function (partyCode) {
  const p = PARTIES[partyCode];
  if (!p) return;

  const lawsWithVotes = LAWS.filter(l => l.votes[partyCode] && l.votes[partyCode] !== 'absent');
  const counts = { za: 0, against: 0, abstain: 0, 'partial-against': 0, 'didnt-vote': 0 };
  lawsWithVotes.forEach(l => {
    const v = l.votes[partyCode];
    if (counts[v] !== undefined) counts[v]++;
  });
  const totalVotes = lawsWithVotes.length;
  const opposedCount = counts.against + counts['partial-against'] + counts.abstain + counts['didnt-vote'];
  const supportPct = Math.round((counts.za / totalVotes) * 100);
  const opposedLaws = lawsWithVotes.filter(l => l.votes[partyCode] !== 'za');

  const content = $('#modalContent');
  if (!content) return;

  content.innerHTML = `
    <div class="modal-header party-header" style="background: ${p.color}">
      <span class="modal-tag" style="background: rgba(255,255,255,0.2); color: white">Party</span>
      <h2 class="modal-title" style="color: white">${p.name}</h2>
      <div class="modal-meta" style="color: rgba(255,255,255,0.8)">
        <div class="modal-meta-item">Faction leader: ${p.leader}</div>
        <div class="modal-meta-item mono">${p.seats} seats in the Duma</div>
      </div>
    </div>
    <div class="modal-content">
      <div class="party-stats-row">
        <div class="party-stat-block">
          <div class="party-stat-num" style="color: ${p.color}">${supportPct}%</div>
          <div class="party-stat-label">support for restrictions</div>
        </div>
        <div class="party-stat-block">
          <div class="party-stat-num">${counts.za}</div>
          <div class="party-stat-label">voted in favour of ${totalVotes} restrictive laws</div>
        </div>
        <div class="party-stat-block">
          <div class="party-stat-num" style="color: var(--vote-against)">${opposedCount}</div>
          <div class="party-stat-label">instances of faction deviation</div>
        </div>
      </div>

      <div class="modal-section">
        <div class="modal-section-label">Declared positions vs. actual voting</div>
        <div class="rhetoric-vs-reality">
          <div class="rvr-block">
            <div class="rvr-label">Rhetoric</div>
            <div class="rvr-text">${p.rhetoric}</div>
          </div>
          <div class="rvr-block">
            <div class="rvr-label">Actual voting record</div>
            <div class="rvr-text">${p.reality}</div>
          </div>
        </div>
      </div>

      <div class="modal-section">
        <div class="modal-section-label">Profile</div>
        <div class="modal-text"><p>${p.summary}</p></div>
      </div>

      ${opposedLaws.length > 0 ? `
        <div class="modal-section">
          <div class="modal-section-label">Instances of deviation from the pro-government line (${opposedLaws.length})</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${opposedLaws.map(l => `
              <div onclick="openLawModal('${l.id}')" style="cursor:pointer; padding: 14px 16px; border: 1px solid var(--line); border-radius: 8px; transition: all 0.15s;" onmouseover="this.style.borderColor='var(--ink)';this.style.background='var(--bg)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='transparent'">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
                  <div>
                    <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${l.title}</div>
                    <div style="font-size: 12px; color: var(--ink-muted);" class="mono">${l.date} · ${l.fzCode}</div>
                  </div>
                  <div class="vote-cell ${l.votes[partyCode]}" style="width: 70px; height: 36px; flex-shrink: 0;">${VOTE_LABELS[l.votes[partyCode]]}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : `
        <div class="modal-section">
          <div class="modal-note" style="background:#FEE2E2; border-left-color: var(--accent)">This party did not vote against a single one of the 18 restrictive laws on digital and civil freedoms passed between 2019 and 2025.</div>
        </div>
      `}

      <div class="modal-section">
        <div class="modal-section-label">Official website</div>
        <div class="modal-sources">
          <a href="${p.site}" target="_blank" rel="noopener" class="source-link">${p.site.replace('https://','')}</a>
        </div>
      </div>
    </div>
  `;
  openModal();
};
