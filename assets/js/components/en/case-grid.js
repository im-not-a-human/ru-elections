// EN translation of assets/js/components/case-grid.js
// Sync source: assets/js/components/case-grid.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

// U3 — Case grid: 3-6 cards for "neutralisation cases", "liquidations", "filter cases".
// API: window.renderCaseGrid(rootEl, cases)
//   cases: [{ name, year?, method?, outcome?, tier?, cross_link?, body? }]
//   tier: 'g' | 'y' | 'o' | 'r'  (matches existing 🟢🟡🟠🔴 source-tier convention)
(function() {
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  var TIER_EMOJI = { g: '🟢', y: '🟡', o: '🟠', r: '🔴' };

  window.renderCaseGrid = function(rootEl, cases) {
    if (!rootEl || !Array.isArray(cases) || cases.length === 0) return;
    var html = '<div class="case-grid">';
    cases.forEach(function(c) {
      var tier = c.tier && TIER_EMOJI[c.tier]
        ? '<span class="cg-tier" aria-hidden="true">' + TIER_EMOJI[c.tier] + '</span>'
        : '';

      var nameHtml = c.cross_link
        ? '<a href="' + escHtml(c.cross_link) + '">' + escHtml(c.name) + '</a>'
        : escHtml(c.name);

      var meta = [];
      if (c.year) meta.push('<span class="cg-year">' + escHtml(c.year) + '</span>');
      if (c.method) meta.push('<span class="cg-method">' + escHtml(c.method) + '</span>');

      html +=
        '<article class="cg-card">' +
          '<header class="cg-head">' +
            tier +
            '<h4 class="cg-name">' + nameHtml + '</h4>' +
          '</header>' +
          (meta.length ? '<div class="cg-meta">' + meta.join(' · ') + '</div>' : '') +
          (c.body ? '<p class="cg-body">' + escHtml(c.body) + '</p>' : '') +
          (c.outcome ? '<div class="cg-outcome"><strong>Outcome:</strong> ' + escHtml(c.outcome) + '</div>' : '') +
        '</article>';
    });
    html += '</div>';
    rootEl.innerHTML = html;
  };
})();
