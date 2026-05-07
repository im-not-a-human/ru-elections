// Threat-model matrix: 8 rows (threats) × 4 cols (countermeasures).
// Cells coloured by state ('closes'/'partial'/'no'/'side') with tooltips.
window.renderThreatMatrix = function () {
  const wrap = $('#threatMatrix');
  if (!wrap || typeof THREAT_ROWS === 'undefined' || typeof THREAT_CELLS === 'undefined') return;

  const head = `
    <div class="tm-row tm-head">
      <div class="tm-cell tm-rowlabel">Сценарий угрозы</div>
      ${THREAT_COLS.map(c => `<div class="tm-cell">${c.label}</div>`).join('')}
    </div>
  `;

  const labels = {
    closes: 'Закрывает',
    partial: 'Частично',
    no: 'Не закрывает',
    side: 'Побочный ущерб',
  };

  const rows = THREAT_ROWS.map(r => `
    <div class="tm-row">
      <div class="tm-cell tm-rowlabel">${r.label}</div>
      ${THREAT_COLS.map(c => {
        const cell = (THREAT_CELLS[r.id] || {})[c.id] || { state: 'no', tip: '' };
        return `
          <div class="tm-cell ${cell.state}" tabindex="0" role="button"
               data-row="${r.id}" data-col="${c.id}"
               aria-label="${r.label} × ${c.label}: ${labels[cell.state]}. Нажмите для подробностей.">
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
    closes:  { text: 'Закрывает',     cls: 'closes' },
    partial: { text: 'Частично',      cls: 'partial' },
    no:      { text: 'Не закрывает',  cls: 'no' },
    side:    { text: 'Побочный ущерб', cls: 'side' },
  };
  const s = stateLabels[cell.state] || stateLabels.no;

  const content = $('#modalContent');
  if (!content) return;
  content.innerHTML = `
    <div class="modal-header">
      <span class="modal-tag" style="background: var(--bg-paper); color: var(--ink-soft); border: 1px solid var(--line);">Матрица угроз и контрмер</span>
      <h2 class="modal-title" style="line-height: 1.25;">${row.label}</h2>
      <div class="modal-meta">
        <div class="modal-meta-item mono">Мера: ${col.label}</div>
        <div class="modal-meta-item tm-cell ${s.cls}" style="border: 1px solid var(--line); padding: 4px 12px; cursor: default;">${s.text}</div>
      </div>
    </div>
    <div class="modal-content">
      <div class="modal-section">
        <div class="modal-section-label">Почему такая оценка</div>
        <div class="modal-text"><p>${cell.tip || 'Нет дополнительных данных.'}</p></div>
      </div>
      <div class="modal-section">
        <div class="modal-section-label">Контекст</div>
        <div class="modal-text">
          <p>Это одна ячейка из матрицы 8 угроз × 4 контрмер. Полная матрица оценивает, насколько каждая мера российского цифрового регулирования закрывает разные классы угроз — от БПЛА с разными каналами связи до доступа граждан к глобальным платформам. Большинство «антидроновых» мер закрывают только узкий сценарий с иностранной SIM, активной в момент пересечения границы; остальные сценарии (радиоканал, спутник, автопилот, российские SIM) меры закрывают слабо или совсем не закрывают.</p>
          <p>Зато все четыре меры в столбце «Доступ граждан» работают как побочный ущерб: они надёжно ограничивают пользовательский доступ к глобальной сети, что фактически и достигается на практике.</p>
        </div>
      </div>
    </div>
  `;
  openModal();
};
