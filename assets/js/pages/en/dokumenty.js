// EN translation of assets/js/pages/dokumenty.js
// Sync source: assets/js/pages/dokumenty.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

// Init for /en/dokumenty.html — file explorer with tabs.

(function() {
  var STATE = {
    tree: null,
    aliases: { _dirs: {}, _files: {} },
    openPaths: [],   // array of "05-evidence/path/to/file.ext" strings
    activePath: null,
    nodeCache: {}    // path → { name, ext, type } for resolved nodes
  };

  // ----- DOM refs (set in init) -----
  var EL = {};

  // ----- Helpers -----
  function escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function aliasFor(path, type) {
    var stripped = path.replace(/^05-evidence\//, '');
    var src = type === 'dir' ? STATE.aliases._dirs : STATE.aliases._files;
    return (src && src[stripped]) || null;
  }

  function findNode(pathArr) {
    // Walk STATE.tree following pathArr (which starts with "05-evidence")
    var cur = STATE.tree;
    if (!cur || cur.name !== pathArr[0]) return null;
    for (var i = 1; i < pathArr.length; i++) {
      if (!cur.children) return null;
      var next = null;
      for (var j = 0; j < cur.children.length; j++) {
        if (cur.children[j].name === pathArr[i]) { next = cur.children[j]; break; }
      }
      if (!next) return null;
      cur = next;
    }
    return cur;
  }

  function countFiles(node) {
    if (node.type === 'file') return 1;
    return (node.children || []).reduce(function(s, c) { return s + countFiles(c); }, 0);
  }

  function buildBaseUrl(path) {
    // path is "05-evidence/<rest>"; baseUrl is "research/compromat/05-evidence/<rest>"
    // en/dokumenty.html is one level deep, so prefix with ../
    return '../research/compromat/' + path;
  }

  // ----- URL state -----
  function syncUrl() {
    var url = new URL(window.location.href);
    if (STATE.openPaths.length === 0) {
      url.searchParams.delete('paths');
      url.searchParams.delete('active');
    } else {
      url.searchParams.set('paths', STATE.openPaths.join('|'));
      if (STATE.activePath) url.searchParams.set('active', STATE.activePath);
      else url.searchParams.delete('active');
    }
    // Drop legacy ?path= param if present
    url.searchParams.delete('path');
    window.history.replaceState({}, '', url.toString());
  }

  function readUrlState() {
    var params = new URLSearchParams(window.location.search);
    var paths = params.get('paths');
    var active = params.get('active');
    return {
      paths: paths ? paths.split('|').filter(Boolean) : [],
      active: active || null
    };
  }

  // ----- Tabs UI -----
  function renderTabs() {
    if (!EL.tabs) return;
    if (STATE.openPaths.length === 0) {
      EL.tabs.innerHTML = '';
      EL.tabs.style.display = 'none';
      return;
    }
    EL.tabs.style.display = '';
    var html = '';
    STATE.openPaths.forEach(function(path) {
      var node = findNode(path.split('/'));
      if (!node) return;
      var alias = aliasFor(path, node.type);
      var displayName = alias || node.name;
      var iconName = (window.dokIconForFile ? window.dokIconForFile(node.ext || '') : null) || 'file';
      var isActive = path === STATE.activePath;
      var iconHtml = window.dokIcon ? window.dokIcon(iconName, { size: 14 }) : '';
      var closeHtml = window.dokIcon ? window.dokIcon('x', { size: 12 }) : '×';
      html +=
        '<button class="dok-tab' + (isActive ? ' active' : '') + '" ' +
        'role="tab" ' +
        'aria-selected="' + (isActive ? 'true' : 'false') + '" ' +
        'data-path="' + escHtml(path) + '" ' +
        'title="' + escHtml(node.name) + '">' +
          iconHtml +
          '<span class="label">' + escHtml(displayName) + '</span>' +
          '<span class="close-x" data-close="' + escHtml(path) + '" aria-label="Close tab" role="button" tabindex="0">' +
            closeHtml +
          '</span>' +
        '</button>';
    });
    EL.tabs.innerHTML = html;
  }

  // ----- Open/close/activate tabs -----
  function openFile(pathArr) {
    var path = pathArr.join('/');
    if (STATE.openPaths.indexOf(path) === -1) {
      STATE.openPaths.push(path);
    }
    setActive(path);
  }

  function setActive(path) {
    STATE.activePath = path;
    renderTabs();
    renderActivePreview();
    syncUrl();
    markTreeSelected(path);
  }

  function closeTab(path) {
    var idx = STATE.openPaths.indexOf(path);
    if (idx === -1) return;
    STATE.openPaths.splice(idx, 1);
    if (STATE.activePath === path) {
      // Activate previous, or next if first
      if (STATE.openPaths.length === 0) {
        STATE.activePath = null;
        renderTabs();
        syncUrl();
        showEmpty();
        markTreeSelected(null);
        return;
      } else {
        var nextIdx = idx > 0 ? idx - 1 : 0;
        setActive(STATE.openPaths[nextIdx]);
        return;
      }
    }
    renderTabs();
    syncUrl();
  }

  // ----- Preview rendering -----
  function renderActivePreview() {
    if (!STATE.activePath) { showEmpty(); return; }
    var pathArr = STATE.activePath.split('/');
    var node = findNode(pathArr);
    if (!node) { showError('File not found in tree: ' + STATE.activePath); return; }
    var baseUrl = buildBaseUrl(STATE.activePath);
    // Attach resolved display title to node so renderers/preview can use it
    var alias = aliasFor(STATE.activePath, node.type);
    node.display = alias || node.name;
    window.renderDokumentyPreview(EL.previewBody, pathArr, node, baseUrl, EL.tabActions);
  }

  function clearActions() {
    if (EL.tabActions) {
      EL.tabActions.innerHTML = '';
      EL.tabActions.hidden = true;
    }
  }

  function showEmpty() {
    clearActions();
    if (EL.previewBody) {
      var icon = window.dokIcon ? window.dokIcon('folder-open', { size: 48 }) : '';
      EL.previewBody.innerHTML =
        '<div class="dok-empty">' +
          '<span class="ico">' + icon + '</span>' +
          '<p>Open a file in the tree on the left — it will open in a tab.</p>' +
        '</div>';
    }
  }

  function showError(msg) {
    clearActions();
    if (!EL.previewBody) return;
    var icon = window.dokIcon ? window.dokIcon('x', { size: 48 }) : '⚠️';
    EL.previewBody.innerHTML =
      '<div class="dok-error">' +
        '<span class="ico">' + icon + '</span>' +
        '<p>' + escHtml(msg) + '</p>' +
      '</div>';
  }

  // ----- Fullscreen -----
  function toggleFullscreen() {
    if (!EL.layout) return;
    if (!document.fullscreenElement) {
      if (EL.layout.requestFullscreen) EL.layout.requestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  function updateFsButtonIcon() {
    if (!EL.tabActions) return;
    var btn = EL.tabActions.querySelector('#dokFsBtn');
    if (!btn) return;
    var inFs = !!document.fullscreenElement;
    var iconHtml = window.dokIcon
      ? window.dokIcon(inFs ? 'minimize' : 'maximize', { size: 14 })
      : '';
    btn.innerHTML = iconHtml;
    btn.title = inFs ? 'Exit full screen' : 'Full screen';
    btn.setAttribute('aria-label', btn.title);
  }

  // ----- Tree integration -----
  function markTreeSelected(path) {
    if (!EL.tree) return;
    var prev = EL.tree.querySelector('.dok-selected');
    if (prev) prev.classList.remove('dok-selected');
    if (!path) return;
    // Match by data-path
    var safe = path.replace(/"/g, '\\"');
    var item = EL.tree.querySelector('.dok-item[data-path="' + safe + '"]');
    if (item) {
      item.classList.add('dok-selected');
      // Expand parent dirs
      var parent = item.closest('.dok-dir');
      while (parent) {
        parent.classList.remove('dok-collapsed');
        parent = parent.parentElement && parent.parentElement.closest ? parent.parentElement.closest('.dok-dir') : null;
      }
    }
  }

  // ----- Init -----
  window.initDokumenty = function initDokumenty() {
    EL.tree = document.getElementById('dokTree');
    EL.tabs = document.getElementById('dokTabs');
    EL.tabActions = document.getElementById('dokTabActions');
    EL.previewBody = document.getElementById('dokPreviewBody');
    EL.search = document.getElementById('dokSearch');
    EL.extFilter = document.getElementById('dokExt');
    EL.totalCount = document.getElementById('dokTotalCount');
    EL.layout = document.getElementById('dokLayout');
    EL.treeToggle = document.getElementById('dokTreeToggle');

    if (!EL.tree) return;

    // Tree-toggle button
    if (EL.treeToggle && EL.layout) {
      EL.treeToggle.addEventListener('click', function() {
        EL.layout.classList.toggle('tree-hidden');
        var hidden = EL.layout.classList.contains('tree-hidden');
        EL.treeToggle.setAttribute('aria-expanded', hidden ? 'false' : 'true');
      });
    }

    // Tab actions: delegate fullscreen click
    if (EL.tabActions) {
      EL.tabActions.addEventListener('click', function(e) {
        var fsBtn = e.target.closest('#dokFsBtn');
        if (fsBtn) {
          e.preventDefault();
          toggleFullscreen();
        }
      });
    }

    // Sync fullscreen icon on state change
    document.addEventListener('fullscreenchange', updateFsButtonIcon);

    // Markdown path-link clicks: intercept [data-dok-open] inside preview body.
    // Used by INDEX.md and other md files to make `code` paths clickable.
    if (EL.previewBody) {
      EL.previewBody.addEventListener('click', function(e) {
        var link = e.target.closest('[data-dok-open]');
        if (!link) return;
        e.preventDefault();
        var rel = link.dataset.dokOpen;
        if (!rel) return;
        // rel is "ofac-sanctions/sdn.csv" — prepend the synthetic root
        var pathArr = ['05-evidence'].concat(rel.split('/'));
        if (findNode(pathArr)) openFile(pathArr);
      });
    }

    // Tab clicks (delegate)
    if (EL.tabs) {
      EL.tabs.addEventListener('click', function(e) {
        var closeBtn = e.target.closest('.close-x');
        if (closeBtn) {
          e.stopPropagation();
          var path = closeBtn.dataset.close;
          if (path) closeTab(path);
          return;
        }
        var tab = e.target.closest('.dok-tab');
        if (tab && tab.dataset.path) setActive(tab.dataset.path);
      });
      // Keyboard close on the close-x via Enter/Space
      EL.tabs.addEventListener('keydown', function(e) {
        var closeBtn = e.target.closest('.close-x');
        if (closeBtn && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          var path = closeBtn.dataset.close;
          if (path) closeTab(path);
        }
      });
    }

    // Load tree + aliases in parallel
    // en/dokumenty.html is one level deep — prefix data paths with ../
    Promise.all([
      fetch('../assets/js/data/dokumenty-tree.json').then(function(r) {
        if (!r.ok) throw new Error('tree HTTP ' + r.status);
        return r.json();
      }),
      fetch('../assets/js/data/dokumenty-aliases.json')
        .then(function(r) { return r.ok ? r.json() : { _dirs: {}, _files: {} }; })
        .catch(function() { return { _dirs: {}, _files: {} }; })
    ]).then(function(results) {
      STATE.tree = results[0];
      STATE.aliases = results[1] || { _dirs: {}, _files: {} };

      // Build a Set of all evidence-root-relative file paths for path-link detection
      // in markdown rendering. Exposed as window._dokValidPaths.
      var pathSet = new Set();
      (function collect(node, parents) {
        if (node.type === 'file') {
          // parents includes "05-evidence" as root; strip it for set membership
          var rel = parents.slice(1).concat([node.name]).join('/');
          pathSet.add(rel);
        }
        if (node.children) {
          var nextParents = parents.concat([node.name]);
          node.children.forEach(function(c) { collect(c, nextParents); });
        }
      })(STATE.tree, []);
      window._dokValidPaths = pathSet;

      // Header file count
      if (EL.totalCount) {
        var n = countFiles(STATE.tree);
        EL.totalCount.textContent = n + ' ' + (n === 1 ? 'file' : 'files');
      }

      // Render tree (passes aliases)
      window.renderDokumentyTree(EL.tree, STATE.tree, function(fileNode, pathArr) {
        openFile(pathArr);
      }, STATE.aliases);

      // Restore from URL or default-open INDEX.md
      var url = readUrlState();
      // Legacy support: ?path= (single)
      if (url.paths.length === 0) {
        var legacy = new URLSearchParams(window.location.search).get('path');
        if (legacy) {
          url.paths = [legacy];
          url.active = legacy;
        }
      }

      if (url.paths.length > 0) {
        // Filter to paths that exist in tree
        var validPaths = url.paths.filter(function(p) {
          return findNode(p.split('/')) !== null;
        });
        if (validPaths.length > 0) {
          STATE.openPaths = validPaths;
          STATE.activePath = url.active && validPaths.indexOf(url.active) !== -1
            ? url.active
            : validPaths[0];
          renderTabs();
          renderActivePreview();
          markTreeSelected(STATE.activePath);
          // Scroll selected into view
          var sel = EL.tree.querySelector('.dok-selected');
          if (sel && sel.scrollIntoView) sel.scrollIntoView({ block: 'center' });
          syncUrl();
          return;
        }
      }

      // Auto-open root INDEX.md if exists
      var indexNode = (STATE.tree.children || []).find(function(c) {
        return c.type === 'file' && c.name.toLowerCase() === 'index.md';
      });
      if (indexNode) {
        openFile(['05-evidence', indexNode.name]);
      } else {
        showEmpty();
      }
    }).catch(function(err) {
      EL.tree.innerHTML = '<div class="dok-error"><p>Error loading tree: ' + escHtml(err.message) + '</p></div>';
    });

    // Search and filter
    if (EL.search) {
      EL.search.addEventListener('input', function() {
        window.filterDokumentyTree(EL.tree, EL.search.value, EL.extFilter ? EL.extFilter.value : 'all');
      });
    }
    if (EL.extFilter) {
      EL.extFilter.addEventListener('change', function() {
        window.filterDokumentyTree(EL.tree, EL.search ? EL.search.value : '', EL.extFilter.value);
      });
    }

    // Keyboard: "/" focuses search; Ctrl+W closes active tab; Ctrl+B toggles tree
    document.addEventListener('keydown', function(e) {
      var ae = document.activeElement;
      var inField = ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || ae.isContentEditable);
      if (e.key === '/' && !inField) {
        e.preventDefault();
        if (EL.search) EL.search.focus();
      } else if ((e.ctrlKey || e.metaKey) && e.key && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        if (EL.treeToggle) EL.treeToggle.click();
      }
      // Note: Ctrl+W intentionally NOT bound — browsers reserve it for closing the tab,
      // and preventDefault() does not work reliably across Chrome/Firefox/Safari.
      // Use the close-x button on each tab instead.
    });
  };

  function tryAutoInit() {
    var main = document.getElementById('main');
    if (main && main.dataset.page === 'dokumenty') window.initDokumenty();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryAutoInit);
  } else {
    tryAutoInit();
  }
})();
