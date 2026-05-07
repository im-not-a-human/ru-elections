// G-section: vertical chronological "crisis timeline".
//
// Replaces the older horizontal 2-track swimlane (which broke down on
// dense event clusters). Events from all lanes are merged into one
// chronological list and rendered as cards alternating left/right of
// a central spine. Each lane keeps its colour. Card text wraps
// naturally — no x-axis collisions possible because layout is vertical.
//
// API (unchanged for back-compat):
//   window.renderSwimlane(rootEl, data)
//
// data = {
//   period?: { start, end },                   // ignored in render
//   lanes: [
//     { id, label, color, events: [{ date, label, sub? }] }
//   ],
//   connection?: { fromLaneId, fromDate, toLaneId, toDate, label }
// }
//
// First lane in data.lanes renders on the LEFT side of the spine,
// second lane on the RIGHT side. Additional lanes alternate.

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

  function dateMs(s) { return new Date(s).getTime(); }

  function fmtRu(s) {
    var d = new Date(s);
    if (isNaN(d)) return String(s || '');
    var months = ['янв.', 'фев.', 'мар.', 'апр.', 'мая', 'июн.',
                  'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  }

  function daysBetween(a, b) {
    return Math.round((dateMs(b) - dateMs(a)) / 86400000);
  }

  window.renderSwimlane = function(rootEl, data) {
    if (!rootEl || !data || !Array.isArray(data.lanes) || data.lanes.length === 0) return;

    // Index lanes by id to a side ('left' for first, 'right' for second, etc.)
    var laneSide = {}, laneLabel = {}, laneColor = {};
    data.lanes.forEach(function(l, i) {
      laneSide[l.id]  = (i % 2 === 0) ? 'left' : 'right';
      laneLabel[l.id] = l.label || '';
      laneColor[l.id] = l.color || '#bea050';
    });

    // Flatten + sort all events chronologically
    var events = [];
    data.lanes.forEach(function(l) {
      (l.events || []).forEach(function(ev) {
        events.push({
          laneId: l.id,
          side: laneSide[l.id],
          color: laneColor[l.id],
          date: ev.date,
          label: ev.label || '',
          sub: ev.sub || '',
        });
      });
    });
    events.sort(function(a, b) { return dateMs(a.date) - dateMs(b.date); });

    // Locate connection endpoints in the merged list
    var connFromIdx = -1, connToIdx = -1;
    if (data.connection) {
      var c = data.connection;
      events.forEach(function(ev, i) {
        if (connFromIdx < 0 && ev.laneId === c.fromLaneId && ev.date === c.fromDate) connFromIdx = i;
        if (connToIdx < 0 && ev.laneId === c.toLaneId && ev.date === c.toDate) connToIdx = i;
      });
    }

    // Build header: lane labels on either side of the spine
    var leftLanes  = data.lanes.filter(function(_, i) { return i % 2 === 0; });
    var rightLanes = data.lanes.filter(function(_, i) { return i % 2 === 1; });
    function laneHeader(l) {
      return '<span class="cv-lane-label" style="color:' + escAttr(l.color) + '">' +
               escHtml(l.label) +
             '</span>';
    }
    var headerHtml =
      '<header class="cv-header">' +
        '<div class="cv-header-side cv-header-side--left">' +
          leftLanes.map(laneHeader).join('') +
        '</div>' +
        '<div class="cv-header-spine"></div>' +
        '<div class="cv-header-side cv-header-side--right">' +
          rightLanes.map(laneHeader).join('') +
        '</div>' +
      '</header>';

    // Build event rows
    var rowsHtml = events.map(function(ev, i) {
      var dateStr = fmtRu(ev.date);
      var cardCls = 'cv-card cv-card--' + ev.side;
      var card =
        '<div class="' + cardCls + '" style="--cv-lane:' + escAttr(ev.color) + '">' +
          '<div class="cv-date">' + escHtml(dateStr) + '</div>' +
          '<div class="cv-title">' + escHtml(ev.label) + '</div>' +
          (ev.sub ? '<div class="cv-sub">' + escHtml(ev.sub) + '</div>' : '') +
        '</div>';
      var dot = '<div class="cv-dot" style="--cv-lane:' + escAttr(ev.color) + '" aria-hidden="true"></div>';

      var connFlag = '';
      if (i === connFromIdx) connFlag = ' cv-row--conn-from';
      else if (i === connToIdx) connFlag = ' cv-row--conn-to';

      var laneLabelText = laneLabel[ev.laneId];
      var ariaLabel = laneLabelText + ' · ' + dateStr + ' · ' + ev.label + (ev.sub ? ' — ' + ev.sub : '');

      if (ev.side === 'left') {
        return (
          '<div class="cv-row cv-row--left' + connFlag + '" aria-label="' + escAttr(ariaLabel) + '">' +
            card + dot + '<div class="cv-card-empty"></div>' +
          '</div>'
        );
      } else {
        return (
          '<div class="cv-row cv-row--right' + connFlag + '" aria-label="' + escAttr(ariaLabel) + '">' +
            '<div class="cv-card-empty"></div>' + dot + card +
          '</div>'
        );
      }
    }).join('');

    // Connection note: rendered between source row and target row.
    // We insert it as a separate row right after the source.
    var rowsWithConnection = '';
    if (data.connection && connFromIdx >= 0 && connToIdx >= 0) {
      var c = data.connection;
      var deltaDays = daysBetween(events[connFromIdx].date, events[connToIdx].date);
      var label = c.label || (deltaDays + ' дн.');
      var split = events.map(function(ev, i) {
        var dateStr = fmtRu(ev.date);
        var cardCls = 'cv-card cv-card--' + ev.side;
        var card =
          '<div class="' + cardCls + '" style="--cv-lane:' + escAttr(ev.color) + '">' +
            '<div class="cv-date">' + escHtml(dateStr) + '</div>' +
            '<div class="cv-title">' + escHtml(ev.label) + '</div>' +
            (ev.sub ? '<div class="cv-sub">' + escHtml(ev.sub) + '</div>' : '') +
          '</div>';
        var dot = '<div class="cv-dot" style="--cv-lane:' + escAttr(ev.color) + '" aria-hidden="true"></div>';
        var connFlag = '';
        if (i === connFromIdx) connFlag = ' cv-row--conn-from';
        else if (i === connToIdx) connFlag = ' cv-row--conn-to';

        var laneLabelText = laneLabel[ev.laneId];
        var ariaLabel = laneLabelText + ' · ' + dateStr + ' · ' + ev.label;

        var rowHtml;
        if (ev.side === 'left') {
          rowHtml =
            '<div class="cv-row cv-row--left' + connFlag + '" aria-label="' + escAttr(ariaLabel) + '">' +
              card + dot + '<div class="cv-card-empty"></div>' +
            '</div>';
        } else {
          rowHtml =
            '<div class="cv-row cv-row--right' + connFlag + '" aria-label="' + escAttr(ariaLabel) + '">' +
              '<div class="cv-card-empty"></div>' + dot + card +
            '</div>';
        }

        // After source, insert the connection note
        if (i === connFromIdx) {
          rowHtml += (
            '<div class="cv-connection-note" role="note">' +
              '<span class="cv-conn-arrow">↓</span>' +
              '<span class="cv-conn-text">' + escHtml(label) + '</span>' +
              '<span class="cv-conn-meta">' + (deltaDays >= 0 ? deltaDays : Math.abs(deltaDays)) + ' дней</span>' +
            '</div>'
          );
        }
        return rowHtml;
      });
      rowsWithConnection = split.join('');
    } else {
      rowsWithConnection = rowsHtml;
    }

    rootEl.innerHTML =
      '<div class="cv-timeline" role="region" aria-label="' + escAttr('Хронология крис-событий') + '">' +
        headerHtml +
        '<div class="cv-spine" aria-hidden="true"></div>' +
        rowsWithConnection +
      '</div>';
  };
})();
