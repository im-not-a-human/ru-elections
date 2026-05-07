// EN translation of assets/js/components/law-modal.js
// Sync source: assets/js/components/law-modal.js
// Glossary: research/i18n_glossary_draft.md

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
        <div class="modal-section-label">What this means</div>
        <div class="modal-text">${law.fullDescription.split('\n\n').map(p => `<p>${p}</p>`).join('')}</div>
      </div>

      <div class="modal-section">
        <div class="modal-section-label">How each faction voted</div>
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
        ${law.voteResults ? `<p style="font-size:13px; color:var(--ink-muted); margin-top:14px;" class="mono">Third-reading result: for ${law.voteResults.za} · against ${law.voteResults.against} · abstained ${law.voteResults.abstain}</p>` : ''}
      </div>

      <div class="modal-section">
        <div class="modal-section-label">Authors and sponsors</div>
        <div class="modal-text">
          <p><strong>Sponsor:</strong> ${law.initiator}</p>
          <p style="font-size:14px; color:var(--ink-muted)">${law.authors.join(' · ')}</p>
        </div>
      </div>

      ${law.quotes && law.quotes.length ? `
        <div class="modal-section">
          <div class="modal-section-label">Quotes from the floor</div>
          ${law.quotes.map(q => `
            <div class="modal-quote">
              <div class="modal-quote-text">${q.textTranslation || q.text}</div>
              ${q.textTranslation ? `<div class="modal-quote-original">«${q.text}»</div>` : ''}
              <div class="modal-quote-author">— ${q.author}</div>
              ${q.contextTranslation || q.context ? `<div class="modal-quote-context">${q.contextTranslation || q.context}${q.contextTranslation && q.context ? ` <span class="modal-quote-context-orig">(${q.context})</span>` : ''}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${law.note ? `
        <div class="modal-section">
          <div class="modal-section-label">Key notes</div>
          <div class="modal-note">${law.note}</div>
        </div>
      ` : ''}

      <div class="modal-section">
        <div class="modal-section-label">Sources</div>
        <div class="modal-sources">
          ${law.sources.map(s => `<a href="${s.url}" target="_blank" rel="noopener" class="source-link">${s.name}</a>`).join('')}
        </div>
      </div>
    </div>
  `;
  openModal();
};
