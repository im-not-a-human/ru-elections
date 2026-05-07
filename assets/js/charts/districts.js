// Districts grid: 15×15 = 225 single-mandate districts, color-coded by winning party.
// Builds the constituency map shown on the elections page.
window.renderDistrictsGrid = function (selector, partyResults) {
  // partyResults: ELECTION_2021.parties array
  const el = $(selector);
  if (!el) return;
  el.classList.add('districts-grid');

  const cells = [];
  partyResults.forEach((p) => {
    for (let i = 0; i < p.seatsDistrict; i++) {
      cells.push({ color: p.color, party: p.short, name: p.name });
    }
  });
  // Should be 225 total
  while (cells.length < 225) cells.push({ color: 'var(--line-soft)', party: '—', name: 'нет данных' });
  cells.length = 225;

  // Group by party so neighbours share color (visually cleaner)
  // Already grouped because we iterated by party.

  el.innerHTML = cells.map((c, idx) => {
    const row = Math.floor(idx / 15);
    const col = idx % 15;
    const delay = (row * 25 + col * 6);
    return `<div class="district-cell" data-party="${c.party}" data-name="${c.name}" style="background:${c.color}; transition-delay:${delay}ms"></div>`;
  }).join('');

  // Ensure visibility regardless of scroll position.
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-visible')));

  $$('.district-cell', el).forEach((cell) => {
    cell.addEventListener('mouseenter', (e) => {
      if (typeof showTooltip === 'function') {
        showTooltip(e, `<strong>${cell.dataset.name}</strong><br>1 одномандатный округ`);
      }
    });
    cell.addEventListener('mouseleave', () => typeof hideTooltip === 'function' && hideTooltip());
    cell.addEventListener('mousemove', (e) => typeof moveTooltip === 'function' && moveTooltip(e));
  });
};
