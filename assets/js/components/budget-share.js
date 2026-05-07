// U1 — Budget share: horizontal compare-bar of "% бюджета в доходах партии"
// across 5-6 partii. CSS-only bars, no Chart.js dependency.
// API: window.renderBudgetShare(rootEl, items, options?)
//   items:   [{ party, share, year?, color?, sentinel? }]
//   options: { title?, sourceText?, threshold? }
//     threshold — optional dotted line at e.g. 50% with label
(function() {
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function fmtPct(n) {
    if (n === 0) return '0%';
    if (n < 1) return n.toFixed(1) + '%';
    return Math.round(n) + '%';
  }

  window.renderBudgetShare = function(rootEl, items, options) {
    if (!rootEl || !Array.isArray(items) || items.length === 0) return;
    options = options || {};

    // Items keep their declared order; bars scaled to 100% (max width = 100).
    var bars = items.map(function(it) {
      var width = Math.max(0, Math.min(100, +it.share || 0));
      var color = it.color || (it.sentinel ? '#999' : 'var(--accent)');
      // For 0% sentinel rows show a faint outline instead of "no bar at all"
      var pctLabel = fmtPct(width);
      return (
        '<div class="bs-row' + (it.sentinel ? ' bs-sentinel' : '') + '">' +
          '<div class="bs-label">' + escHtml(it.party) +
            (it.year ? ' <span class="bs-year">' + escHtml(it.year) + '</span>' : '') +
          '</div>' +
          '<div class="bs-track">' +
            (width > 0
              ? '<div class="bs-fill" style="width:' + width + '%;background:' + color + '"></div>'
              : '<div class="bs-fill bs-fill-zero"></div>') +
          '</div>' +
          '<div class="bs-pct">' + pctLabel + '</div>' +
        '</div>'
      );
    }).join('');

    var thresholdHtml = '';
    if (options.threshold && +options.threshold > 0 && +options.threshold < 100) {
      var t = +options.threshold;
      thresholdHtml =
        '<div class="bs-threshold" style="left:' + t + '%">' +
          '<div class="bs-threshold-line"></div>' +
          '<div class="bs-threshold-label">' + escHtml(options.thresholdLabel || (t + '%')) + '</div>' +
        '</div>';
    }

    var html =
      '<div class="budget-share">' +
        (options.title ? '<div class="bs-title">' + escHtml(options.title) + '</div>' : '') +
        '<div class="bs-bars">' +
          bars +
          (thresholdHtml ? '<div class="bs-threshold-wrap">' + thresholdHtml + '</div>' : '') +
        '</div>' +
        (options.sourceText ? '<div class="bs-source">' + escHtml(options.sourceText) + '</div>' : '') +
      '</div>';
    rootEl.innerHTML = html;
  };
})();
