// Sources accordion — grouped by category.
window.renderDigitalSources = function () {
  const wrap = $('#sourcesGrid');
  if (!wrap || typeof DIGITAL_SOURCES === 'undefined') return;

  const grouped = {};
  DIGITAL_SOURCES.forEach(s => {
    (grouped[s.cat] = grouped[s.cat] || []).push(s);
  });

  wrap.innerHTML = DIGITAL_SOURCE_CATS.map(cat => {
    const items = grouped[cat.id] || [];
    if (!items.length) return '';
    return `
      <div>
        <div class="dsources-cat">${cat.label} (${items.length})</div>
        <div class="dsources-list">
          ${items.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.name} ↗</a>`).join('')}
        </div>
      </div>
    `;
  }).join('');

  // Render quote blocks alongside (if their containers exist on this page)
  renderDigitalQuotes('#vpnQuotes', VPN_QUOTES);
  renderDigitalQuotes('#droneQuotes', DRONE_QUOTES);
};

window.renderDigitalQuotes = function (selector, list) {
  const wrap = $(selector);
  if (!wrap || !list) return;
  wrap.innerHTML = list.map(q => `
    <blockquote class="dquote">
      ${q.text}
      <span class="dquote-author">— ${q.author}${q.context ? ` · <em>${q.context}</em>` : ''}</span>
    </blockquote>
  `).join('');
};
