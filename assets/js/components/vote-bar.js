// Renders a stacked vote bar for a single fraction's vote on a single law.
//
// Usage:
//   renderVoteBar(rootEl, {
//     law: '04.03.2022 фейки об армии ФЗ-32',
//     for: 13, against: 0, abstain: 0, skip: 2
//   });
//
// rootEl is appended to (multiple bars per chart-card).
window.renderVoteBar = function renderVoteBar(rootEl, data) {
  if (!rootEl || !data) return;

  const total = (data.for || 0) + (data.against || 0) + (data.abstain || 0) + (data.skip || 0);
  if (total === 0) return;

  const segments = [];
  if (data.for) segments.push(`<div class="vb-for" style="flex:${data.for}">${data.for}</div>`);
  if (data.against) segments.push(`<div class="vb-against" style="flex:${data.against}">${data.against}</div>`);
  if (data.abstain) segments.push(`<div class="vb-abs" style="flex:${data.abstain}">${data.abstain}</div>`);
  if (data.skip) segments.push(`<div class="vb-skip" style="flex:${data.skip}">${data.skip}</div>`);

  // Format pct as "for/against/abstain/skip"
  const pct = `${data.for || 0}/${data.against || 0}/${data.abstain || 0}/${data.skip || 0}`;

  // Optional second-line subtitle on the label
  const subtitle = data.subtitle ? `<small>${data.subtitle}</small>` : '';

  const row = document.createElement('div');
  row.className = 'vote-bar-row';
  row.innerHTML = `
    <span class="vb-lbl">${data.law}${subtitle}</span>
    <div class="vote-bar">${segments.join('')}</div>
    <span class="vb-pct">${pct}</span>
  `;
  rootEl.appendChild(row);
};

// Renders a legend below a vote-bar chart-card.
window.renderVoteBarLegend = function renderVoteBarLegend(rootEl) {
  if (!rootEl) return;
  rootEl.insertAdjacentHTML('beforeend', `
    <div class="ch-legend">
      <span><i style="background:var(--vote-against)"></i>«За»</span>
      <span><i style="background:var(--vote-za)"></i>«Против»</span>
      <span><i style="background:var(--vote-abstain)"></i>Воздержались</span>
      <span><i style="background:var(--vote-didnt)"></i>Отсутствовали</span>
      <span style="margin-left:auto">за/против/возд./отс.</span>
    </div>
  `);
};
