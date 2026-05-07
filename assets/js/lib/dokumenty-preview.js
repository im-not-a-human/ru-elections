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
        'title="Открыть в новой вкладке" aria-label="Открыть в новой вкладке">' +
        icon('external-link', 14) +
      '</a>' +
      '<a class="dok-action" href="' + encodeURI(baseUrl) + '" download ' +
        'title="Скачать" aria-label="Скачать">' +
        icon('download', 14) +
      '</a>' +
      '<button class="dok-action" id="dokFsBtn" type="button" ' +
        'title="Полноэкранный режим" aria-label="Полноэкранный режим">' +
        fsIcon +
      '</button>';
    actionsEl.hidden = false;
  }

  function formatBytes(n) {
    if (n < 1024) return n + ' Б';
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' КБ';
    if (n < 1024 * 1024 * 1024) return (n / (1024 * 1024)).toFixed(1) + ' МБ';
    return (n / (1024 * 1024 * 1024)).toFixed(2) + ' ГБ';
  }

  // Files larger than 5 MB are not auto-previewed: avoids slow loads, browser
  // freezes (e.g. 46 MB UK sanctions CSV in a <table>), and runaway memory.
  var LARGE_FILE_LIMIT = 5 * 1024 * 1024;

  function renderLargeFileGuard(bodyEl, fileNode, baseUrl) {
    var size = fileNode.size || 0;
    bodyEl.innerHTML =
      '<div class="dok-large-guard">' +
        '<div class="ico" aria-hidden="true">📦</div>' +
        '<h3>Большой файл</h3>' +
        '<p>' + escHtml(fileNode.name) + ' — ' + formatBytes(size) + '. ' +
        'Превью отключено для файлов больше ' + formatBytes(LARGE_FILE_LIMIT) + ', чтобы не блокировать браузер.</p>' +
        '<div class="dok-large-actions">' +
          '<a class="dok-large-btn" href="' + encodeURI(baseUrl) + '" target="_blank" rel="noopener">Открыть в новой вкладке</a>' +
          '<a class="dok-large-btn" href="' + encodeURI(baseUrl) + '" download>Скачать</a>' +
        '</div>' +
      '</div>';
  }

  window.renderDokumentyPreview = function(bodyEl, pathArr, fileNode, baseUrl, actionsEl) {
    renderActions(actionsEl, baseUrl);

    if (fileNode.size && fileNode.size > LARGE_FILE_LIMIT) {
      renderLargeFileGuard(bodyEl, fileNode, baseUrl);
      return;
    }

    bodyEl.innerHTML = '<div class="dok-loading">Загружаю…</div>';

    var registry = window.dokumentyRenderers || {};
    var renderer = registry[fileNode.ext] || registry.unknown;
    var ret;
    try {
      ret = renderer(bodyEl, baseUrl, fileNode.name);
    } catch (e) {
      bodyEl.innerHTML = '<div class="dok-error"><div class="ico">⚠️</div><p>Ошибка рендеринга: ' + escHtml(e.message) + '</p></div>';
      return;
    }
    if (ret && typeof ret.catch === 'function') {
      ret.catch(function(err) {
        bodyEl.innerHTML = '<div class="dok-error"><div class="ico">⚠️</div><p>Ошибка загрузки: ' + escHtml(err.message) + '</p></div>';
      });
    }
  };
})();
