// 4 selectivity cards — tiers of digital-restriction enforcement.
window.renderSelectivityCards = function () {
  const wrap = $('#selectivityCards');
  if (!wrap || typeof SELECTIVITY_LAYERS === 'undefined') return;

  wrap.innerHTML = SELECTIVITY_LAYERS.map(l => `
    <div class="selectivity-card">
      <div class="selectivity-card-level">
        <div class="selectivity-card-num">${l.level}</div>
        <div class="selectivity-card-title">${l.title}</div>
      </div>
      <div class="selectivity-card-summary">${l.summary}</div>
      <div class="selectivity-card-tags">
        ${l.tags.map(t => `<span class="selectivity-card-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
};
