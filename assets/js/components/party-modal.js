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
      <span class="modal-tag" style="background: rgba(255,255,255,0.2); color: white">Партия</span>
      <h2 class="modal-title" style="color: white">${p.name}</h2>
      <div class="modal-meta" style="color: rgba(255,255,255,0.8)">
        <div class="modal-meta-item">Лидер фракции: ${p.leader}</div>
        <div class="modal-meta-item mono">${p.seats} мест в Думе</div>
      </div>
    </div>
    <div class="modal-content">
      <div class="party-stats-row">
        <div class="party-stat-block">
          <div class="party-stat-num" style="color: ${p.color}">${supportPct}%</div>
          <div class="party-stat-label">поддержки ограничений</div>
        </div>
        <div class="party-stat-block">
          <div class="party-stat-num">${counts.za}</div>
          <div class="party-stat-label">«за» из ${totalVotes} ограничительных законов</div>
        </div>
        <div class="party-stat-block">
          <div class="party-stat-num" style="color: var(--vote-against)">${opposedCount}</div>
          <div class="party-stat-label">случаев фракционного отступления</div>
        </div>
      </div>

      <div class="modal-section">
        <div class="modal-section-label">Что декларирует и что делает</div>
        <div class="rhetoric-vs-reality">
          <div class="rvr-block">
            <div class="rvr-label">Риторика</div>
            <div class="rvr-text">${p.rhetoric}</div>
          </div>
          <div class="rvr-block">
            <div class="rvr-label">Реальные голосования</div>
            <div class="rvr-text">${p.reality}</div>
          </div>
        </div>
      </div>

      <div class="modal-section">
        <div class="modal-section-label">Портрет</div>
        <div class="modal-text"><p>${p.summary}</p></div>
      </div>

      ${opposedLaws.length > 0 ? `
        <div class="modal-section">
          <div class="modal-section-label">Случаи отступления от провластной линии (${opposedLaws.length})</div>
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
          <div class="modal-note" style="background:#FEE2E2; border-left-color: var(--accent)">Эта партия не голосовала «против» ни одного из 18 ограничительных законов в области цифровых и гражданских свобод за период 2019–2025.</div>
        </div>
      `}

      <div class="modal-section">
        <div class="modal-section-label">Официальный сайт</div>
        <div class="modal-sources">
          <a href="${p.site}" target="_blank" rel="noopener" class="source-link">${p.site.replace('https://','')}</a>
        </div>
      </div>
    </div>
  `;
  openModal();
};
