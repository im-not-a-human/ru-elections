// EN translation of assets/js/components/ownership-flow.js
// Sync source: assets/js/components/ownership-flow.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

// D-section: 2-3 step ownership/control flow diagram.
// API: window.renderOwnershipFlow(rootEl, data)
// data = {
//   steps: [{ label, sub?, color?, hotspotTitle, hotspotBody }],
//   arrowLabels: ['sold 2025', 'affiliated'],   // length steps.length - 1
//   title?: '...'
// }
// Inline SVG with hotspots on each box.

(function() {
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function escAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  window.renderOwnershipFlow = function(rootEl, data) {
    if (!rootEl || !data || !Array.isArray(data.steps)) return;
    var n = data.steps.length;
    if (n < 2) return;

    var width = 960;
    var gap = 110;
    var boxW = (width - 60 - (n - 1) * gap) / n;
    var boxH = 90;
    var top = 50;

    var html = '<svg viewBox="0 0 ' + width + ' 200" preserveAspectRatio="xMidYMid meet" ' +
      'role="img" aria-label="Ownership chain of ' + n + ' steps" ' +
      'style="display:block;width:100%;height:auto;max-width:' + width + 'px;margin:0 auto">';

    if (data.title) {
      html += '<text x="' + (width / 2) + '" y="20" text-anchor="middle" font-size="13" font-family="Unbounded,sans-serif" font-weight="700" fill="#1A1815">' + escHtml(data.title) + '</text>';
    }

    data.steps.forEach(function(s, i) {
      var x = 30 + i * (boxW + gap);
      var color = escAttr(s.color || '#bea050');
      html +=
        '<g class="hs" tabindex="0" role="button" ' +
          'aria-label="' + escAttr(s.label + (s.sub ? ' — ' + s.sub : '')) + '" ' +
          'data-hotspot-title="' + escAttr(s.hotspotTitle || s.label) + '" ' +
          'data-hotspot-body="' + escAttr(s.hotspotBody || '') + '">' +
          '<title>' + escHtml(s.label) + '</title>' +
          '<rect x="' + x.toFixed(1) + '" y="' + top + '" width="' + boxW.toFixed(1) + '" height="' + boxH + '" rx="6" fill="' + color + '" opacity="0.12" stroke="' + color + '" stroke-width="2"/>' +
          '<text x="' + (x + boxW / 2).toFixed(1) + '" y="' + (top + 36) + '" text-anchor="middle" font-size="13" font-family="Manrope,sans-serif" font-weight="600" fill="#1A1815">' + escHtml(s.label) + '</text>' +
          (s.sub ? '<text x="' + (x + boxW / 2).toFixed(1) + '" y="' + (top + 56) + '" text-anchor="middle" font-size="11" font-family="JetBrains Mono,monospace" fill="#6f6a60">' + escHtml(s.sub) + '</text>' : '') +
        '</g>';

      if (i < n - 1) {
        var arrowX1 = (x + boxW + 4).toFixed(1);
        var arrowX2 = (x + boxW + gap - 4).toFixed(1);
        var arrowY = top + boxH / 2;
        html +=
          '<line x1="' + arrowX1 + '" y1="' + arrowY + '" x2="' + arrowX2 + '" y2="' + arrowY + '" stroke="#1A1815" stroke-width="2" marker-end="url(#of-arrow)"/>';
        if (data.arrowLabels && data.arrowLabels[i]) {
          var lblText = String(data.arrowLabels[i]);
          var lblW = lblText.length * 6 + 12;
          var lblMidX = (parseFloat(arrowX1) + parseFloat(arrowX2)) / 2;
          html +=
            '<rect x="' + (lblMidX - lblW / 2).toFixed(1) + '" y="' + (arrowY - 18) + '" width="' + lblW + '" height="14" fill="rgba(240,234,214,0.92)" rx="2"/>' +
            '<text x="' + lblMidX.toFixed(1) + '" y="' + (arrowY - 8) + '" text-anchor="middle" font-size="10" font-family="JetBrains Mono,monospace" fill="#6f6a60">' + escHtml(lblText) + '</text>';
        }
      }
    });

    html +=
      '<defs>' +
        '<marker id="of-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="8" orient="auto">' +
          '<path d="M 0 0 L 10 5 L 0 10 z" fill="#1A1815"/>' +
        '</marker>' +
      '</defs></svg>';

    rootEl.innerHTML = html;
    if (window.initHotspots) window.initHotspots(rootEl);
  };
})();
