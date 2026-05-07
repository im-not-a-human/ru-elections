// Messenger comparison — pure HTML/CSS bars (no Chart.js).
// Shows MAU / DAU / monthly coverage % for WhatsApp, Telegram, MAX.
window.renderMessengerComparison = function () {
  const wrap = $('#messengerComparison');
  if (!wrap || typeof MESSENGER_DATA === 'undefined') return;

  // Find max for each metric for proper bar scaling.
  const maxMau = Math.max(...MESSENGER_DATA.map(m => m.mau));
  const maxDau = Math.max(...MESSENGER_DATA.map(m => m.dau));

  function row(m, metric, max, suffix = ' млн') {
    const v = m[metric];
    const pct = (v / max) * 100;
    return `
      <div class="msgr-row">
        <div class="msgr-name ${m.id}">${m.name}</div>
        <div class="msgr-bar-track"><div class="msgr-bar-fill ${m.id}" style="width: ${pct}%"></div></div>
        <div class="msgr-num">${v}${suffix}</div>
      </div>
    `;
  }

  wrap.innerHTML = `
    <div class="msgr-section-label">MAU — месячная аудитория, млн</div>
    ${MESSENGER_DATA.map(m => row(m, 'mau', maxMau, ' млн')).join('')}
    <div class="msgr-section-label">DAU — суточная аудитория, млн</div>
    ${MESSENGER_DATA.map(m => row(m, 'dau', maxDau, ' млн')).join('')}
    <div class="msgr-section-label">Месячный охват среди россиян</div>
    ${MESSENGER_DATA.map(m => row(m, 'coverage', 100, '%')).join('')}
  `;
};
