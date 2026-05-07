// EN translation of assets/js/components/contradiction-matrix.js
// Sync source: assets/js/components/contradiction-matrix.js
// Glossary: research/i18n_glossary_draft.md

// Renders the 18-row contradiction matrix with filters.
let CMATRIX_FILTER = 'all';

window.renderContradictionMatrix = function () {
  const filtersWrap = $('#cmatrixFilters');
  const tableWrap = $('#cmatrixTable');
  if (!filtersWrap || !tableWrap || typeof CONTRADICTIONS === 'undefined') return;

  filtersWrap.innerHTML = CONTRADICTION_TAGS.map(t => `
    <button class="cmatrix-chip ${t.id === CMATRIX_FILTER ? 'active' : ''}" data-filter="${t.id}">${t.label}</button>
  `).join('');

  drawCMatrixTable();

  $$('.cmatrix-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      CMATRIX_FILTER = btn.dataset.filter;
      $$('.cmatrix-chip').forEach(b => b.classList.toggle('active', b.dataset.filter === CMATRIX_FILTER));
      drawCMatrixTable();
    });
  });
};

function drawCMatrixTable() {
  const tableWrap = $('#cmatrixTable');
  if (!tableWrap) return;
  const rows = (CMATRIX_FILTER === 'all')
    ? CONTRADICTIONS
    : CONTRADICTIONS.filter(c => c.tag === CMATRIX_FILTER);

  tableWrap.innerHTML = `
    <div class="cmatrix-head">
      <div>№</div>
      <div>Declared</div>
      <div>Implemented</div>
      <div>Contradiction</div>
    </div>
    ${rows.map(c => `
      <div class="cmatrix-row" data-id="${c.id}" tabindex="0" role="button" aria-label="Expand details for contradiction ${c.id}">
        <div>${c.id}</div>
        <div>${c.declared}</div>
        <div>${c.actual}</div>
        <div>${c.contradiction}</div>
      </div>
    `).join('')}
  `;

  $$('.cmatrix-row').forEach(row => {
    const id = parseInt(row.dataset.id, 10);
    row.addEventListener('click', () => openContradictionModal(id));
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openContradictionModal(id);
      }
    });
  });
}

window.wireContradictionFilters = function () { /* wired in renderContradictionMatrix */ };
