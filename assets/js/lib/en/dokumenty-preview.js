// EN translation of assets/js/lib/dokumenty-preview.js
// Sync source: assets/js/lib/dokumenty-preview.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

// Routes file selection to the appropriate renderer.
// Exports: window.renderDokumentyPreview(bodyEl, pathArr, fileNode, baseUrl, actionsEl)
//   - actionsEl (optional): the .dok-tab-actions element to populate with
//     download / external-link / fullscreen icon buttons.

(function() {
  function escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderActions(actionsEl, baseUrl) {
    if (!actionsEl) return;
    var icon = function(name, size) {
      return window.dokIcon ? window.dokIcon(name, { size: size || 14 }) : '';
    };
    var inFullscreen = !!document.fullscreenElement;
    var fsIcon = inFullscreen ? icon('minimize', 14) : icon('maximize', 14);
    actionsEl.innerHTML =
      '<a class="dok-action" href="' + encodeURI(baseUrl) + '" target="_blank" rel="noopener" ' +
        'title="Open in new tab" aria-label="Open in new tab">' +
        icon('external-link', 14) +
      '</a>' +
      '<a class="dok-action" href="' + encodeURI(baseUrl) + '" download ' +
        'title="Download" aria-label="Download">' +
        icon('download', 14) +
      '</a>' +
      '<button class="dok-action" id="dokFsBtn" type="button" ' +
        'title="Full screen" aria-label="Full screen">' +
        fsIcon +
      '</button>';
    actionsEl.hidden = false;
  }

  function formatBytes(n) {
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
    if (n < 1024 * 1024 * 1024) return (n / (1024 * 1024)).toFixed(1) + ' MB';
    return (n / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }

  // Files larger than 5 MB are not auto-previewed: avoids slow loads, browser
  // freezes (e.g. 46 MB UK sanctions CSV in a <table>), and runaway memory.
  var LARGE_FILE_LIMIT = 5 * 1024 * 1024;

  function renderLargeFileGuard(bodyEl, fileNode, baseUrl) {
    var size = fileNode.size || 0;
    bodyEl.innerHTML =
      '<div class="dok-large-guard">' +
        '<div class="ico" aria-hidden="true">📦</div>' +
        '<h3>Large file</h3>' +
        '<p>' + escHtml(fileNode.name) + ' — ' + formatBytes(size) + '. ' +
        'Preview is disabled for files larger than ' + formatBytes(LARGE_FILE_LIMIT) + ' to avoid blocking the browser.</p>' +
        '<div class="dok-large-actions">' +
          '<a class="dok-large-btn" href="' + encodeURI(baseUrl) + '" target="_blank" rel="noopener">Open in new tab</a>' +
          '<a class="dok-large-btn" href="' + encodeURI(baseUrl) + '" download>Download</a>' +
        '</div>' +
      '</div>';
  }

  window.renderDokumentyPreview = function(bodyEl, pathArr, fileNode, baseUrl, actionsEl) {
    renderActions(actionsEl, baseUrl);

    if (fileNode.size && fileNode.size > LARGE_FILE_LIMIT) {
      renderLargeFileGuard(bodyEl, fileNode, baseUrl);
      return;
    }

    bodyEl.innerHTML = '<div class="dok-loading">Loading…</div>';

    var registry = window.dokumentyRenderers || {};
    var renderer = registry[fileNode.ext] || registry.unknown;
    var ret;
    try {
      ret = renderer(bodyEl, baseUrl, fileNode.name);
    } catch (e) {
      bodyEl.innerHTML = '<div class="dok-error"><div class="ico">⚠️</div><p>Rendering error: ' + escHtml(e.message) + '</p></div>';
      return;
    }
    if (ret && typeof ret.catch === 'function') {
      ret.catch(function(err) {
        bodyEl.innerHTML = '<div class="dok-error"><div class="ico">⚠️</div><p>Load error: ' + escHtml(err.message) + '</p></div>';
      });
    }
  };
})();
