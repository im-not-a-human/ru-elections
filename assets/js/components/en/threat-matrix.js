// EN translation of assets/js/components/threat-matrix.js
// Sync source: assets/js/components/threat-matrix.js
// Glossary: research/i18n_glossary_draft.md

// Threat-model matrix: 8 rows (threats) × 4 cols (countermeasures).
// Cells coloured by state ('closes'/'partial'/'no'/'side') with tooltips.
window.renderThreatMatrix = function () {
  const wrap = $('#threatMatrix');
  if (!wrap || typeof THREAT_ROWS === 'undefined' || typeof THREAT_CELLS === 'undefined') return;

  const head = `
    <div class="tm-row tm-head">
      <div class="tm-cell tm-rowlabel">Threat scenario</div>
      ${THREAT_COLS.map(c => `<div class="tm-cell">${c.label}</div>`).join('')}
    </div>
  `;

  const labels = {
    closes: 'Closes',
    partial: 'Partially',
    no: 'Does not close',
    side: 'Collateral harm',
  };

  const rows = THREAT_ROWS.map(r => `
    <div class="tm-row">
      <div class="tm-cell tm-rowlabel">${r.label}</div>
      ${THREAT_COLS.map(c => {
        const cell = (THREAT_CELLS[r.id] || {})[c.id] || { state: 'no', tip: '' };
        return `
          <div class="tm-cell ${cell.state}" tabindex="0" role="button"
               data-row="${r.id}" data-col="${c.id}"
               aria-label="${r.label} × ${c.label}: ${labels[cell.state]}. Click for details.">
            ${labels[cell.state]}
          </div>
        `;
      }).join('')}
    </div>
  `).join('');

  wrap.innerHTML = head + rows;

  $$('.tm-cell[role="button"]').forEach(cell => {
    cell.addEventListener('click', () => openThreatModal(cell.dataset.row, cell.dataset.col));
    cell.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openThreatModal(cell.dataset.row, cell.dataset.col);
      }
    });
  });
};

window.openThreatModal = function (rowId, colId) {
  if (typeof THREAT_ROWS === 'undefined' || typeof THREAT_CELLS === 'undefined') return;
  const row = THREAT_ROWS.find(r => r.id === rowId);
  const col = THREAT_COLS.find(c => c.id === colId);
  const cell = (THREAT_CELLS[rowId] || {})[colId];
  if (!row || !col || !cell) return;

  const stateLabels = {
    closes:  { text: 'Closes',          cls: 'closes' },
    partial: { text: 'Partially',       cls: 'partial' },
    no:      { text: 'Does not close',  cls: 'no' },
    side:    { text: 'Collateral harm', cls: 'side' },
  };
  const s = stateLabels[cell.state] || stateLabels.no;

  const content = $('#modalContent');
  if (!content) return;
  content.innerHTML = `
    <div class="modal-header">
      <span class="modal-tag" style="background: var(--bg-paper); color: var(--ink-soft); border: 1px solid var(--line);">Threat and countermeasure matrix</span>
      <h2 class="modal-title" style="line-height: 1.25;">${row.label}</h2>
      <div class="modal-meta">
        <div class="modal-meta-item mono">Measure: ${col.label}</div>
        <div class="modal-meta-item tm-cell ${s.cls}" style="border: 1px solid var(--line); padding: 4px 12px; cursor: default;">${s.text}</div>
      </div>
    </div>
    <div class="modal-content">
      <div class="modal-section">
        <div class="modal-section-label">Why this assessment</div>
        <div class="modal-text"><p>${cell.tip || 'No additional data.'}</p></div>
      </div>
      <div class="modal-section">
        <div class="modal-section-label">Context</div>
        <div class="modal-text">
          <p>This is a single cell from the 8 threats × 4 countermeasures matrix. The full matrix assesses how well each measure in Russia's digital-regulation toolkit closes different classes of threat — from drones using different communication channels to citizens' access to global platforms. Most 'anti-drone' measures address only the narrow scenario of a foreign SIM card active at the moment of border crossing; the remaining scenarios (radio channel, satellite, autopilot, Russian SIMs) are addressed weakly or not at all.</p>
          <p>All four measures in the 'Citizens' access' column function as collateral harm: they reliably restrict user access to the global internet — which is, in practice, what is actually achieved.</p>
        </div>
      </div>
    </div>
  `;
  openModal();
};
