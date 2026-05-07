// Distortion bars: side-by-side "% голосов" vs "% мест" for each party.
// Reveals on scroll (CSS `.is-visible` triggered by reveal.js since
// .distortion-row is in the observer list).
window.renderDistortion = function (selector, parties) {
  const el = $(selector);
  if (!el) return;

  const rows = parties.map((p) => {
    const seatsPct = (p.total / 450) * 100;
    return `
      <div class="distortion-row" data-reveal>
        <div class="distortion-label" style="color:${p.color}">${p.short}</div>
        <div class="distortion-track distortion-track-1">
          <div class="distortion-fill" style="width:${p.pctList * 1.5}%; background:${p.color}; opacity:0.55"></div>
        </div>
        <div class="distortion-pct distortion-pct-1">${p.pctList.toFixed(2)}%</div>
        <div class="distortion-track distortion-track-2">
          <div class="distortion-fill" style="width:${seatsPct * 1.05}%; background:${p.color}"></div>
        </div>
        <div class="distortion-pct distortion-pct-2">${seatsPct.toFixed(1)}%</div>
      </div>
    `;
  }).join('');

  el.innerHTML = `
    <div class="distortion-row" style="font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:var(--ink-muted); font-weight:600;">
      <div class="distortion-label">Партия</div>
      <div>Голоса по списку</div>
      <div></div>
      <div>Мест в Думе</div>
      <div></div>
    </div>
    ${rows}
  `;

  // Force-show after a frame so transition still plays.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    $$('.distortion-row', el).forEach(r => r.classList.add('is-visible'));
  }));
};
