// EN translation of assets/js/components/registration-window.js
// Sync source: assets/js/components/registration-window.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

// A-section component: Registration window timeline.
// Shows N parties registered in a narrow time window, each as a hotspot.
//
// API:  window.renderRegistrationWindow(rootEl, data)
//
// data = {
//   period: { start: '2020-03-01', end: '2020-04-30' },
//   events: [
//     { id, party, foundedDate, registeredDate, color,
//       hotspotTitle, hotspotBody }
//   ]
// }
//
// Uses .hs elements for hotspot integration via window.initHotspots.

(function() {
  function escAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function dateToMs(s) { return new Date(s).getTime(); }

  function fmtEn(s) {
    var d = new Date(s);
    var months = ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  }

  window.renderRegistrationWindow = function(rootEl, data) {
    if (!rootEl || !data || !data.events || !data.period) return;

    if (data.events.length > 4) {
      console.warn('[registration-window] more than 4 events not supported; truncating to 4');
      data = { period: data.period, events: data.events.slice(0, 4) };
    }

    var startMs = dateToMs(data.period.start);
    var endMs = dateToMs(data.period.end);
    var span = endMs - startMs || 1;

    function pct(ms) {
      return ((ms - startMs) / span) * 100;
    }

    // Build SVG with axis + per-event marker
    var width = 640, height = 320;
    var axisY = 160;
    var labels = [];

    data.events.forEach(function(e, i) {
      var fp = pct(dateToMs(e.foundedDate));
      var rp = pct(dateToMs(e.registeredDate));
      var fX = (fp / 100) * (width - 80) + 40;
      var rX = (rp / 100) * (width - 80) + 40;
      var color = escAttr(e.color || 'var(--accent)');

      // Alternate label sides: even i → above the axis, odd i → below.
      var above = (i % 2 === 0);
      var labelY, leaderY1, leaderY2;
      if (above) {
        labelY = axisY - 40 - (Math.floor(i / 2) * 42);
        leaderY1 = axisY;
        leaderY2 = labelY + 8;
      } else {
        labelY = axisY + 50 + (Math.floor(i / 2) * 42);
        leaderY1 = axisY;
        leaderY2 = labelY - 16;
      }

      labels.push(
        '<g class="hs" tabindex="0" role="button" ' +
          'aria-label="' + escAttr(e.party + ' — founding congress ' + fmtEn(e.foundedDate) +
            ', Ministry of Justice registration ' + fmtEn(e.registeredDate)) + '" ' +
          'data-hotspot-id="' + escAttr(e.id) + '" ' +
          'data-hotspot-title="' + escAttr(e.hotspotTitle || e.party) + '" ' +
          'data-hotspot-body="' + escAttr(e.hotspotBody || '') + '">' +
          '<title>' + escHtml(e.party + ' — click for details') + '</title>' +
          '<line x1="' + fX.toFixed(1) + '" y1="' + axisY + '" x2="' + rX.toFixed(1) + '" y2="' + axisY + '" stroke="' + color + '" stroke-width="3" opacity="0.4"/>' +
          '<circle cx="' + fX.toFixed(1) + '" cy="' + axisY + '" r="6" fill="white" stroke="' + color + '" stroke-width="2"/>' +
          '<circle cx="' + rX.toFixed(1) + '" cy="' + axisY + '" r="7" fill="' + color + '"/>' +
          '<line x1="' + rX.toFixed(1) + '" y1="' + leaderY1 + '" x2="' + rX.toFixed(1) + '" y2="' + leaderY2 + '" stroke="' + color + '" stroke-width="1" stroke-dasharray="2 2"/>' +
          '<rect x="' + (rX - 50).toFixed(1) + '" y="' + (labelY - 12) + '" width="100" height="22" fill="rgba(240,234,214,0.92)" rx="3"/>' +
          '<text x="' + rX.toFixed(1) + '" y="' + labelY + '" text-anchor="middle" font-size="12" font-family="Manrope,sans-serif" font-weight="600" fill="#1A1815">' + escHtml(e.party) + '</text>' +
          '<text x="' + rX.toFixed(1) + '" y="' + (labelY + 14) + '" text-anchor="middle" font-size="10" font-family="JetBrains Mono,monospace" fill="#6f6a60">' + escHtml(fmtEn(e.registeredDate).replace(/ \d{4}$/, '')) + '</text>' +
        '</g>'
      );
    });

    // Axis baseline
    var axisHtml =
      '<line x1="40" y1="' + axisY + '" x2="' + (width - 40) + '" y2="' + axisY + '" stroke="#1A1815" stroke-width="1.5"/>' +
      '<text x="40" y="' + (axisY + 24) + '" font-size="10" font-family="JetBrains Mono,monospace" fill="#6f6a60">' + escHtml(fmtEn(data.period.start)) + '</text>' +
      '<text x="' + (width - 40) + '" y="' + (axisY + 24) + '" text-anchor="end" font-size="10" font-family="JetBrains Mono,monospace" fill="#6f6a60">' + escHtml(fmtEn(data.period.end)) + '</text>';

    var legend =
      '<g transform="translate(40, ' + (height - 24) + ')">' +
        '<circle cx="6" cy="0" r="5" fill="white" stroke="#999" stroke-width="2"/>' +
        '<text x="18" y="4" font-size="10" font-family="Manrope,sans-serif" fill="#6f6a60">founding congress</text>' +
        '<circle cx="180" cy="0" r="6" fill="#999"/>' +
        '<text x="194" y="4" font-size="10" font-family="Manrope,sans-serif" fill="#6f6a60">Ministry of Justice registration</text>' +
      '</g>';

    rootEl.innerHTML =
      '<svg viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="xMidYMid meet" ' +
        'role="img" aria-labelledby="rw-title rw-desc" style="display:block;width:100%;height:auto;max-width:' + width + 'px;margin:0 auto">' +
        '<title id="rw-title">Party registration window ' + escHtml(fmtEn(data.period.start)) + ' — ' + escHtml(fmtEn(data.period.end)) + '</title>' +
        '<desc id="rw-desc">' + escHtml(data.events.length) + ' ' + (data.events.length === 1 ? 'party' : 'parties') + ' registered within the same time window. Click a party marker for details.</desc>' +
        labels.join('') +
        axisHtml +
        legend +
      '</svg>';

    if (window.initHotspots) window.initHotspots(rootEl);
  };
})();
