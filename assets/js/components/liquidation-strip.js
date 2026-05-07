// U8 — Liquidation strip: horizontal time-strip of 3+ ВС-РФ ликвидаций of small
// "liberal" parties + Nadezhdin refusal in the 2024-2025 window.
// API: window.renderLiquidationStrip(rootEl, events, activeId?)
//   events: [{ id, date, party, label?, link?, kind? }]
//     kind: 'liquidation' | 'refusal' | 'merger'
//   activeId: id of the event matching current page (highlighted)
(function() {
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Parse "DD.MM.YYYY" or "MM.YYYY" or "YYYY" into a sort-key
  function parseKey(date) {
    var m;
    if ((m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(date))) return +m[3] * 10000 + +m[2] * 100 + +m[1];
    if ((m = /^(\d{2})\.(\d{4})$/.exec(date))) return +m[2] * 10000 + +m[1] * 100;
    if ((m = /^(\d{4})$/.exec(date))) return +m[1] * 10000;
    return 0;
  }

  window.renderLiquidationStrip = function(rootEl, events, activeId) {
    if (!rootEl || !Array.isArray(events) || events.length === 0) return;
    var sorted = events.slice().sort(function(a, b) { return parseKey(a.date) - parseKey(b.date); });

    // Compute relative positions (0..1) along the strip from min..max date keys
    var keys = sorted.map(function(e) { return parseKey(e.date); });
    var min = Math.min.apply(null, keys);
    var max = Math.max.apply(null, keys);
    var span = max - min || 1;

    var dotsHtml = '';
    sorted.forEach(function(e) {
      var pos = ((parseKey(e.date) - min) / span) * 100;
      var isActive = activeId && e.id === activeId;
      var kindCls = e.kind ? ' ls-kind-' + escHtml(e.kind) : '';
      var labelHtml = e.label ? escHtml(e.label) : escHtml(e.party);
      var inner =
        '<div class="ls-dot' + (isActive ? ' is-active' : '') + kindCls + '" style="left:' + pos.toFixed(2) + '%">' +
          '<div class="ls-tip">' +
            '<div class="ls-date">' + escHtml(e.date) + '</div>' +
            '<div class="ls-party">' + labelHtml + '</div>' +
          '</div>' +
          '<div class="ls-pin"></div>' +
        '</div>';
      dotsHtml += e.link
        ? '<a class="ls-link" href="' + escHtml(e.link) + '" style="position:absolute;left:' + pos.toFixed(2) + '%">' + inner.replace(' style="left:' + pos.toFixed(2) + '%"', '') + '</a>'
        : inner;
    });

    var html =
      '<div class="liquidation-strip" role="group" aria-label="Хронология ликвидаций малых партий">' +
        '<div class="ls-rail">' + dotsHtml + '</div>' +
        '<div class="ls-axis">' +
          '<span>' + escHtml(sorted[0].date) + '</span>' +
          '<span>' + escHtml(sorted[sorted.length - 1].date) + '</span>' +
        '</div>' +
      '</div>';
    rootEl.innerHTML = html;
  };
})();
