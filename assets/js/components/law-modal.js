// Modal that opens when a law/timeline event is clicked.
window.openLawModal = function (lawId) {
  const law = LAWS.find(l => l.id === lawId);
  if (!law) return;

  const content = $('#modalContent');
  if (!content) return;

  content.innerHTML = `
    <div class="modal-header">
      <span class="modal-tag ${law.category}">${CAT_LABELS[law.category]}</span>
      <h2 class="modal-title">${law.title}</h2>
      <div class="modal-meta">
        <div class="modal-meta-item mono">${law.date}</div>
        <div class="modal-meta-item mono">${law.fzCode}</div>
        <div class="modal-meta-item">№ ${law.id}</div>
      </div>
    </div>
    <div class="modal-content">
      <div class="modal-section">
        <div class="modal-section-label">Что это значит</div>
        <div class="modal-text">${law.fullDescription.split('\n\n').map(p => `<p>${p}</p>`).join('')}</div>
      </div>

      <div class="modal-section">
        <div class="modal-section-label">Как голосовали фракции</div>
        <div class="modal-vote-grid">
          ${PARTY_CODES.map(party => {
            const v = law.votes[party];
            const p = PARTIES[party];
            return `
              <div class="modal-vote-card" style="border-top: 3px solid ${p.color}">
                <div class="modal-vote-party" style="color: ${p.color}">${p.short}</div>
                <div class="modal-vote-result ${v}">${VOTE_LABELS[v] || ''}</div>
              </div>`;
          }).join('')}
        </div>
        ${law.voteResults ? `<p style="font-size:13px; color:var(--ink-muted); margin-top:14px;" class="mono">Итог III чтения: за ${law.voteResults.za} · против ${law.voteResults.against} · возд. ${law.voteResults.abstain}</p>` : ''}
      </div>

      <div class="modal-section">
        <div class="modal-section-label">Авторы и инициаторы</div>
        <div class="modal-text">
          <p><strong>Инициатор:</strong> ${law.initiator}</p>
          <p style="font-size:14px; color:var(--ink-muted)">${law.authors.join(' · ')}</p>
        </div>
      </div>

      ${law.quotes && law.quotes.length ? `
        <div class="modal-section">
          <div class="modal-section-label">Цитаты с трибуны</div>
          ${law.quotes.map(q => `
            <div class="modal-quote">
              <div class="modal-quote-text">${q.text}</div>
              <div class="modal-quote-author">— ${q.author}</div>
              ${q.context ? `<div class="modal-quote-context">${q.context}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${law.note ? `
        <div class="modal-section">
          <div class="modal-section-label">Что важно знать</div>
          <div class="modal-note">${law.note}</div>
        </div>
      ` : ''}

      <div class="modal-section">
        <div class="modal-section-label">Источники</div>
        <div class="modal-sources">
          ${law.sources.map(s => `<a href="${s.url}" target="_blank" rel="noopener" class="source-link">${s.name}</a>`).join('')}
        </div>
      </div>
    </div>
  `;
  openModal();
};
