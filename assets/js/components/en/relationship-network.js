// EN translation of assets/js/components/relationship-network.js
// Sync source: assets/js/components/relationship-network.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

// F-section: Small relationship/influence graph.
// Pre-positioned (no force layout) — caller specifies x,y per node.
//
// API: window.renderRelationshipNetwork(rootEl, data)
// data = {
//   nodes: [{ id, label, sub?, x, y, color?, size?, hotspotTitle, hotspotBody }],
//   edges: [{ from, to, label?, kind?: 'solid'|'dashed' }],
//   width: 720, height: 360
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

  window.renderRelationshipNetwork = function(rootEl, data) {
    if (!rootEl || !data || !Array.isArray(data.nodes)) return;
    var W = data.width || 1200;
    var H = data.height || 540;
    var nodeMap = {};

    // Compute node rect dimensions per node (sized to longest label).
    data.nodes.forEach(function(n) {
      var lblLen = String(n.label || '').length;
      var subLen = n.sub ? String(n.sub).length : 0;
      var maxLen = Math.max(lblLen, subLen);
      n._w = Math.max(150, maxLen * 7.5 + 24);
      n._h = n.sub ? 56 : 38;
      nodeMap[n.id] = n;
    });

    // Find the point on a node's rounded-rect boundary along the line
    // from the node centre toward (tx, ty).
    function rectEdgePoint(n, tx, ty) {
      var dx = tx - n.x, dy = ty - n.y;
      if (dx === 0 && dy === 0) return [n.x, n.y];
      var hw = n._w / 2, hh = n._h / 2;
      var sx = dx === 0 ? Infinity : Math.abs(hw / dx);
      var sy = dy === 0 ? Infinity : Math.abs(hh / dy);
      var t = Math.min(sx, sy);
      return [n.x + dx * t, n.y + dy * t];
    }

    var edgeHtml = (data.edges || []).map(function(e) {
      var a = nodeMap[e.from], b = nodeMap[e.to];
      if (!a || !b) return '';
      var dash = e.kind === 'dashed' ? ' stroke-dasharray="4 4"' : '';

      // Truncate line at each rect boundary.
      var p1 = rectEdgePoint(a, b.x, b.y);
      var p2 = rectEdgePoint(b, a.x, a.y);
      var x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1];

      var midX = (x1 + x2) / 2;
      var midY = (y1 + y2) / 2;
      var labelHtml = '';
      if (e.label) {
        var lblLen = String(e.label).length;
        labelHtml =
          '<rect x="' + (midX - lblLen * 3.6 - 8).toFixed(1) + '" y="' + (midY - 10).toFixed(1) + '" width="' + (lblLen * 7.2 + 16).toFixed(1) + '" height="20" rx="3" fill="white" stroke="#d4cdb0"/>' +
          '<text x="' + midX.toFixed(1) + '" y="' + (midY + 4).toFixed(1) + '" text-anchor="middle" font-size="11" font-family="JetBrains Mono,monospace" fill="#6f6a60">' + escHtml(e.label) + '</text>';
      }
      return (
        '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#999" stroke-width="1.5"' + dash + '/>' +
        labelHtml
      );
    });

    var nodeHtml = data.nodes.map(function(n) {
      var color = escAttr(n.color || 'var(--accent)');
      var rx = n.x - n._w / 2;
      var ry = n.y - n._h / 2;
      var titleY = n.sub ? n.y - 4 : n.y + 4;
      return (
        '<g class="hs" tabindex="0" role="button" ' +
          'aria-label="' + escAttr((n.label || '') + (n.sub ? ' — ' + n.sub : '')) + '" ' +
          'data-hotspot-title="' + escAttr(n.hotspotTitle || n.label || '') + '" ' +
          'data-hotspot-body="' + escAttr(n.hotspotBody || '') + '">' +
          '<title>' + escHtml(n.label || '') + '</title>' +
          '<rect x="' + rx.toFixed(1) + '" y="' + ry.toFixed(1) + '" width="' + n._w.toFixed(1) + '" height="' + n._h.toFixed(1) + '" rx="8" fill="' + color + '" fill-opacity="0.15" stroke="' + color + '" stroke-width="2"/>' +
          '<text x="' + n.x + '" y="' + titleY.toFixed(1) + '" text-anchor="middle" font-size="13" font-family="Manrope,sans-serif" font-weight="700" fill="#1A1815" pointer-events="none">' + escHtml(n.label || '') + '</text>' +
          (n.sub ? '<text x="' + n.x + '" y="' + (n.y + 14) + '" text-anchor="middle" font-size="11" font-family="JetBrains Mono,monospace" fill="#6f6a60" pointer-events="none">' + escHtml(n.sub) + '</text>' : '') +
        '</g>'
      );
    });

    rootEl.innerHTML =
      '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" ' +
        'role="img" aria-label="' + escAttr('Relationship graph with ' + data.nodes.length + ' nodes') + '" ' +
        'style="display:block;width:100%;height:auto;max-width:' + W + 'px;margin:0 auto">' +
        edgeHtml.join('') +
        nodeHtml.join('') +
      '</svg>';

    if (window.initHotspots) window.initHotspots(rootEl);
  };
})();
