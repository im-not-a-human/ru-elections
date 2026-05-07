// Renders a vertical timeline into rootEl from an array of events.
//
// Usage:
//   renderTimelineVert(rootEl, [
//     { date: '04.03.2022', text: '<strong>ФЗ-32 о фейках</strong> — фракция «за», 13/0/0/2', muted: false },
//     { date: '20.09.2022', text: '<strong>Мобилизация</strong> — В.А. Даванков соавтор', muted: false }
//   ]);
window.renderTimelineVert = function renderTimelineVert(rootEl, events) {
  if (!rootEl || !events || !events.length) return;
  const wrap = document.createElement('div');
  wrap.className = 'timeline-vert';
  wrap.innerHTML = events.map(ev => `
    <div class="tl-row">
      <div class="tl-date">${ev.date}</div>
      <div class="tl-dot${ev.muted ? ' muted' : ''}"></div>
      <div class="tl-text">${ev.text}</div>
    </div>
  `).join('');
  rootEl.appendChild(wrap);
};
