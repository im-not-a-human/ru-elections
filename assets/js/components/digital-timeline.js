// Vertical timeline of digital-restriction events 2019–2026.
// Each event is clickable and opens a modal with details + sources.
window.renderDigitalTimeline = function () {
  const wrap = $('#dtimeline');
  if (!wrap || typeof DIGITAL_TIMELINE === 'undefined') return;

  wrap.innerHTML = DIGITAL_TIMELINE.map(ev => `
    <div class="dtimeline-item ${ev.kind}" data-event-id="${ev.id}" tabindex="0" role="button"
         aria-label="Открыть подробности: ${ev.title}">
      <div class="dtimeline-date mono">${ev.date}</div>
      <div class="dtimeline-title">${ev.title}</div>
      <div class="dtimeline-summary">${ev.summary}</div>
    </div>
  `).join('');

  $$('.dtimeline-item[data-event-id]').forEach(item => {
    const id = item.dataset.eventId;
    item.addEventListener('click', () => openDigitalEventModal(id));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDigitalEventModal(id);
      }
    });
  });
};
