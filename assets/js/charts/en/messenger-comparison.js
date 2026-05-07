// EN translation of assets/js/charts/messenger-comparison.js
// Sync source: assets/js/charts/messenger-comparison.js
// Glossary: research/i18n_glossary_draft.md

// Messenger comparison — pure HTML/CSS bars (no Chart.js).
// Shows MAU / DAU / monthly coverage % for WhatsApp, Telegram, MAX.
window.renderMessengerComparison = function () {
  const wrap = $('#messengerComparison');
  if (!wrap || typeof MESSENGER_DATA === 'undefined') return;

  // Find max for each metric for proper bar scaling.
  const maxMau = Math.max(...MESSENGER_DATA.map(m => m.mau));
  const maxDau = Math.max(...MESSENGER_DATA.map(m => m.dau));

  function row(m, metric, max, suffix = 'M') {
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
    <div class="msgr-section-label">MAU — monthly active users, M</div>
    ${MESSENGER_DATA.map(m => row(m, 'mau', maxMau, 'M')).join('')}
    <div class="msgr-section-label">DAU — daily active users, M</div>
    ${MESSENGER_DATA.map(m => row(m, 'dau', maxDau, 'M')).join('')}
    <div class="msgr-section-label">Monthly reach among Russian users</div>
    ${MESSENGER_DATA.map(m => row(m, 'coverage', 100, '%')).join('')}
  `;
};
