// Vertical timeline of all 18 laws on the home page.
window.renderTimeline = function () {
  const container = $('#timelineList');
  if (!container) return;

  const events = LAWS.slice().sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.date.localeCompare(b.date);
  });

  container.innerHTML = events.map(law => {
    const opposed = Object.values(law.votes).some(v => v === 'against' || v === 'partial-against');
    const partial = Object.values(law.votes).some(v => v === 'abstain' || v === 'didnt-vote');
    const cls = opposed ? 'opposed' : (partial ? 'partial' : '');

    return `
      <div class="timeline-event ${cls}" data-law-id="${law.id}">
        <div class="timeline-year mono">${law.date}</div>
        <div class="timeline-title">${law.title}</div>
        <div class="timeline-summary">${law.summary}</div>
        <div class="timeline-mini-vote">
          ${PARTY_CODES.map(party => {
            const v = law.votes[party];
            const p = PARTIES[party];
            return `<div class="tv-cell vote-cell ${v}" title="${p.short}: ${VOTE_FULL[v] || ''}" style="width: 36px; height: 22px; font-size: 9px;">${p.short.substring(0,2)}</div>`;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');

  $$('.timeline-event').forEach(ev => {
    ev.addEventListener('click', () => openLawModal(ev.dataset.lawId));
  });
};
