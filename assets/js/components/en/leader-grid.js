// EN translation of assets/js/components/leader-grid.js
// Sync source: assets/js/components/leader-grid.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

// U2 — Leader grid: tiered card grid for party leaders.
// API:  window.renderLeaderGrid(rootEl, leaders)
//   leaders: [{ name, tier?: 'core'|'secondary', role, born?, tags?, duma_url?, photo?, note?, bio? }]
// 'core' tier: rendered in a 2-column prominent grid above.
// 'secondary' tier: rendered in a compact 4-column grid below.
// Falls back to coloured initials if photo is missing.
// Bio rendered into a <dialog>, opened by a neutral "More details" button.

(function() {
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function initials(name) {
    var parts = (name || '').trim().split(/\s+/);
    if (parts.length === 0) return '·';
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
    return (parts[0].slice(0, 1) + parts[parts.length - 1].slice(0, 1)).toUpperCase();
  }

  function hueFor(name) {
    var h = 0;
    for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return h % 360;
  }

  function makeCard(p, idx, isCoreTier) {
    var avatar;
    if (p.photo) {
      avatar = '<img class="lg-photo" src="' + escHtml(p.photo) + '" alt="" loading="lazy">';
    } else {
      var hue = hueFor(p.name || '');
      avatar = '<div class="lg-photo lg-photo-fallback" aria-hidden="true" ' +
        'style="background:hsl(' + hue + ',55%,82%);color:hsl(' + hue + ',55%,28%)">' +
        escHtml(initials(p.name)) +
        '</div>';
    }

    var nameHtml = p.duma_url
      ? '<a href="' + escHtml(p.duma_url) + '" target="_blank" rel="noopener">' + escHtml(p.name) + '</a>'
      : escHtml(p.name);

    var tagsHtml = '';
    if (Array.isArray(p.tags) && p.tags.length > 0) {
      tagsHtml = '<div class="lg-tags">';
      p.tags.forEach(function(t) {
        if (typeof t === 'string') {
          tagsHtml += '<span class="lg-tag">' + escHtml(t) + '</span>';
        } else if (t && t.label) {
          var kind = t.kind ? ' lg-tag--' + escHtml(t.kind) : '';
          tagsHtml += '<span class="lg-tag' + kind + '">' + escHtml(t.label) + '</span>';
        }
      });
      tagsHtml += '</div>';
    }

    var bioBtnHtml = '';
    if (p.bio) {
      bioBtnHtml =
        '<button class="lg-bio-btn" type="button" data-bio="' + idx + '" ' +
          'aria-haspopup="dialog" aria-controls="lg-bio-dialog-' + idx + '">' +
          'More details →' +
        '</button>';
    }

    var cardClass = 'lg-card' + (isCoreTier ? ' lg-card--core' : ' lg-card--secondary');

    return (
      '<article class="' + cardClass + '">' +
        avatar +
        '<div class="lg-body">' +
          '<h4 class="lg-name">' + nameHtml + '</h4>' +
          (p.role ? '<div class="lg-role">' + escHtml(p.role) + '</div>' : '') +
          (p.born ? '<div class="lg-born">' + escHtml(p.born) + '</div>' : '') +
          (p.note ? '<p class="lg-note">' + escHtml(p.note) + '</p>' : '') +
          tagsHtml +
          bioBtnHtml +
        '</div>' +
      '</article>'
    );
  }

  function makeDialog(p, idx) {
    if (!p.bio) return '';
    return (
      '<dialog class="lg-bio-dialog" id="lg-bio-dialog-' + idx + '" aria-labelledby="lg-bio-title-' + idx + '">' +
        '<div class="lg-bio-dialog-inner">' +
          '<button class="lg-bio-dialog-close" type="button" aria-label="Close" data-close>×</button>' +
          '<h3 class="lg-bio-dialog-title" id="lg-bio-title-' + idx + '">' + escHtml(p.name) + '</h3>' +
          (p.role ? '<div class="lg-bio-dialog-role">' + escHtml(p.role) + '</div>' : '') +
          '<div class="lg-bio-dialog-body">' + p.bio + '</div>' +
        '</div>' +
      '</dialog>'
    );
  }

  function attachHandlers(rootEl) {
    rootEl.addEventListener('click', function(e) {
      var btn = e.target.closest('.lg-bio-btn');
      if (btn) {
        var idx = btn.dataset.bio;
        var dialog = rootEl.querySelector('#lg-bio-dialog-' + idx);
        if (dialog && typeof dialog.showModal === 'function') {
          dialog.showModal();
        }
        return;
      }
      var closeBtn = e.target.closest('[data-close]');
      if (closeBtn) {
        var d = closeBtn.closest('dialog');
        if (d) d.close();
        return;
      }
      // Backdrop click closes — clicking on dialog element itself (not inner)
      if (e.target.tagName === 'DIALOG') {
        e.target.close();
      }
    });
  }

  window.renderLeaderGrid = function(rootEl, leaders) {
    if (!rootEl || !Array.isArray(leaders) || leaders.length === 0) return;

    var core = leaders.filter(function(p) { return p.tier === 'core'; });
    var secondary = leaders.filter(function(p) { return p.tier !== 'core'; });

    // Index dialogs by their position in the FULL leaders array so each is unique
    var fullIndex = leaders.map(function(p, i) { return { p: p, i: i }; });
    var coreIndexed = fullIndex.filter(function(x) { return x.p.tier === 'core'; });
    var secondaryIndexed = fullIndex.filter(function(x) { return x.p.tier !== 'core'; });

    var coreCards = coreIndexed.map(function(x) { return makeCard(x.p, x.i, true); }).join('');
    var secondaryCards = secondaryIndexed.map(function(x) { return makeCard(x.p, x.i, false); }).join('');
    var dialogsHtml = leaders.map(function(p, i) { return makeDialog(p, i); }).join('');

    var html = '';
    if (core.length > 0) {
      html +=
        '<div class="lg-tier">' +
          '<div class="lg-tier-header">Party core</div>' +
          '<div class="leader-grid lg-grid--core">' + coreCards + '</div>' +
        '</div>';
    }
    if (secondary.length > 0) {
      html +=
        '<div class="lg-tier">' +
          '<div class="lg-tier-header">Other public figures</div>' +
          '<div class="leader-grid lg-grid--secondary">' + secondaryCards + '</div>' +
        '</div>';
    }
    html += dialogsHtml;

    rootEl.innerHTML = html;
    attachHandlers(rootEl);
  };
})();
