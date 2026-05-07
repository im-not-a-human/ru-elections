// EN translation of assets/js/components/timeline-vert.js
// Sync source: assets/js/components/timeline-vert.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

// Renders a vertical timeline into rootEl from an array of events.
//
// Usage:
//   renderTimelineVert(rootEl, [
//     { date: '04.03.2022', text: '<strong>FZ-32 on false information</strong> — faction voted in favour, 13/0/0/2', muted: false },
//     { date: '20.09.2022', text: '<strong>Mobilisation</strong> — V.A. Davankov co-author', muted: false }
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
