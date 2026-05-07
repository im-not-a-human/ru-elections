// EN translation of assets/js/components/digital-sources.js
// Sync source: assets/js/components/digital-sources.js
// Glossary: research/i18n_glossary_draft.md
// EN-specific: dual-language rendering of quotes (English translation + Russian original)

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

  renderDigitalQuotes('#vpnQuotes', VPN_QUOTES);
  renderDigitalQuotes('#droneQuotes', DRONE_QUOTES);
};

window.renderDigitalQuotes = function (selector, list) {
  const wrap = $(selector);
  if (!wrap || !list) return;
  wrap.innerHTML = list.map(q => `
    <blockquote class="dquote">
      ${q.textTranslation || q.text}
      ${q.textTranslation ? `<div class="dquote-original">«${q.text}»</div>` : ''}
      <span class="dquote-author">— ${q.author}${q.contextTranslation || q.context ? ` · <em>${q.contextTranslation || q.context}${q.contextTranslation && q.context ? ` <span class="dquote-context-orig">(${q.context})</span>` : ''}</em>` : ''}</span>
    </blockquote>
  `).join('');
};
