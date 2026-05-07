// EN translation of assets/js/components/vote-waffle.js
// Sync source: assets/js/components/vote-waffle.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

// E-section CORE viz: Vote waffle — N cells, each = 1 restrictive law vote.
// Cells coloured by faction outcome (for / against / abstained / partial).
// Hotspot per cell: FZ number, date, vote_id, link to raw XML.
//
// API: window.renderVoteWaffle(rootEl, data)
// data = {
//   votes: [
//     { id, fz, title, date, voteId, outcome:'za'|'against'|'abstain'|'partial', xmlPath, hotspotBody }
//   ],
//   summary: { za, against, abstain, partial },  // counts for legend
// }

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

  var COLOURS = {
    za:       { fill: '#bea050', label: 'voted for restrictions' },
    against:  { fill: '#6c8c44', label: 'voted against (bloc)' },
    abstain:  { fill: '#a3a399', label: 'abstained' },
    partial:  { fill: '#d97706', label: 'faction split — part voted against' },
  };

  window.renderVoteWaffle = function(rootEl, data) {
    if (!rootEl || !data || !Array.isArray(data.votes) || data.votes.length === 0) return;

    var votes = data.votes;
    var cols = 7, rows = Math.ceil(votes.length / cols);
    var cellSize = 90, gap = 8;
    var width = cols * (cellSize + gap) - gap + 60;
    var legendY = 16 + rows * (cellSize + gap) + 28;
    var totalH = legendY + 36;

    // Extract a short numeric/identifier label that fits inside the cell.
    // Data may put long descriptions in `fz` (e.g. "FZ-255 (co-author Lugovoy)"
    // or "Recognition of DNR/LNR"); we want only the digits or a sequential id.
    function shortCellLabel(fzText, idx) {
      var s = String(fzText || '');
      var m = s.match(/ФЗ\s*-?\s*(\d+)/);            // FZ-NNN anywhere in text
      if (m) return m[1];
      m = s.match(/№\s*(\d+)/);                       // №NNN
      if (m) return m[1];
      m = s.match(/^(\d+)/);                          // bare leading digits
      if (m) return m[1];
      return '#' + (idx + 1);                         // fallback: sequential
    }

    var cellsHtml = votes.map(function(v, i) {
      var col = i % cols, row = Math.floor(i / cols);
      var x = 30 + col * (cellSize + gap);
      var y = 16 + row * (cellSize + gap);
      var c = COLOURS[v.outcome] || COLOURS.za;
      var label = (v.fz || '') + ' (' + (v.date || '') + ') — ' + c.label;
      var cellNum = shortCellLabel(v.fz, i);
      var dateShort = String(v.date || '').replace(/^(\d{2}\.\d{2})\..*$/, '$1');
      if (dateShort.length > 5) dateShort = dateShort.slice(-4);  // year-only fallback
      return (
        '<g class="hs" tabindex="0" role="button" ' +
          'aria-label="' + escAttr(label) + '" ' +
          'data-hotspot-title="' + escAttr((v.fz || '') + ' · ' + (v.date || '')) + '" ' +
          'data-hotspot-body="' + escAttr(v.hotspotBody || '') + '">' +
          '<title>' + escHtml(label) + '</title>' +
          '<rect x="' + x + '" y="' + y + '" width="' + cellSize + '" height="' + cellSize + '" rx="3" fill="' + c.fill + '" opacity="0.85"/>' +
          '<text x="' + (x + cellSize / 2) + '" y="' + (y + cellSize / 2 - 4) + '" text-anchor="middle" font-size="14" font-family="JetBrains Mono,monospace" font-weight="700" fill="white">' + escHtml(cellNum) + '</text>' +
          '<text x="' + (x + cellSize / 2) + '" y="' + (y + cellSize / 2 + 14) + '" text-anchor="middle" font-size="9" font-family="JetBrains Mono,monospace" fill="rgba(255,255,255,0.8)">' + escHtml(dateShort) + '</text>' +
        '</g>'
      );
    });

    // Layout legend horizontally with measured spacing
    var legendHtml = '';
    var lx = 30;
    ['za', 'partial', 'abstain', 'against'].forEach(function(k) {
      var c = COLOURS[k];
      var n = (data.summary && data.summary[k]) || 0;
      if (!n) return;
      var text = n + ' ' + c.label;
      legendHtml +=
        '<g transform="translate(' + lx.toFixed(1) + ', ' + legendY + ')">' +
          '<rect width="18" height="18" rx="2" fill="' + c.fill + '"/>' +
          '<text x="24" y="13" font-size="13" font-family="Manrope,sans-serif" fill="#1A1815">' + escHtml(text) + '</text>' +
        '</g>';
      lx += text.length * 7.5 + 46;
    });

    rootEl.innerHTML =
      '<svg viewBox="0 0 ' + width + ' ' + totalH + '" preserveAspectRatio="xMidYMid meet" ' +
        'role="img" aria-labelledby="vw-title vw-desc" ' +
        'style="display:block;width:100%;height:auto;max-width:' + width + 'px;margin:0 auto">' +
        '<title id="vw-title">' + escHtml(String(votes.length)) + ' votes on restrictive laws</title>' +
        '<desc id="vw-desc">Each cell represents one vote. Click a cell for details of the law.</desc>' +
        cellsHtml.join('') +
        legendHtml +
      '</svg>';

    if (window.initHotspots) window.initHotspots(rootEl);
  };
})();
