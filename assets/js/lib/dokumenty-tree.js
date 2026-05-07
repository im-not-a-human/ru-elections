// Renders a recursive tree of files/dirs from a JSON structure.
// Exports:
//   window.renderDokumentyTree(rootEl, treeData, onSelect, aliases)
//   window.filterDokumentyTree(rootEl, term, extFilter)
//
// onSelect(node, pathArr) — called when a file is clicked.
//   node = { name, ext, display } (file metadata; display = aliased title)
//   pathArr = full path from root, e.g. ["05-evidence", "duma-api", "votes", "army-fakes.xml"]

(function() {
  // Format size in human units
  function fmtSize(bytes) {
    if (!bytes && bytes !== 0) return '';
    if (bytes < 1024) return bytes + ' Б';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' КБ';
    return (bytes / (1024 * 1024)).toFixed(1) + ' МБ';
  }

  function renderNode(node, level, parentPath, aliases) {
    var li = document.createElement('li');
    li.className = node.type === 'dir' ? 'dok-dir' : 'dok-file';
    var path = parentPath.concat([node.name]);

    var item = document.createElement('div');
    item.className = 'dok-item level-' + Math.min(level, 4);
    item.dataset.path = path.join('/');
    item.dataset.type = node.type;
    if (node.ext) item.dataset.ext = node.ext;
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'treeitem');

    // Resolve alias (strip "05-evidence/" root prefix for lookup)
    var pathStr = path.join('/').replace(/^05-evidence\//, '');
    var alias = null;
    if (aliases) {
      if (node.type === 'dir') {
        alias = aliases._dirs && aliases._dirs[pathStr];
      } else {
        alias = aliases._files && aliases._files[pathStr];
      }
    }
    var displayName = alias || node.name;
    // Stash resolved title back on the node so onSelect callers can access it
    node.display = displayName;

    // Chevron (only meaningful for dirs; harmless for files since CSS hides it)
    var chev = document.createElement('span');
    chev.className = 'dok-chevron';
    chev.innerHTML = window.dokIcon ? window.dokIcon('chevron-down', { size: 12, className: '' }) : '';
    item.appendChild(chev);

    // File-type or folder icon
    var ico = document.createElement('span');
    ico.className = 'dok-icon';
    if (window.dokIcon) {
      if (node.type === 'dir') {
        ico.innerHTML = window.dokIcon('folder', { size: 16, className: '' });
      } else {
        var iconName = window.dokIconForFile ? window.dokIconForFile(node.ext) : 'file';
        ico.innerHTML = window.dokIcon(iconName, { size: 16, className: '' });
      }
    } else {
      ico.textContent = node.type === 'dir' ? '📁' : '📄';
    }
    item.appendChild(ico);

    // Name (with alias)
    var name = document.createElement('span');
    name.className = 'dok-name';
    name.textContent = displayName;
    item.appendChild(name);

    if (alias && alias !== node.name) {
      // Original filename in tooltip
      item.title = node.name;
    }

    if (node.type === 'file') {
      var meta = document.createElement('span');
      meta.className = 'dok-meta';
      meta.textContent = fmtSize(node.size);
      item.appendChild(meta);
    }

    li.appendChild(item);

    if (node.type === 'dir' && node.children && node.children.length) {
      var ul = document.createElement('ul');
      ul.setAttribute('role', 'group');
      node.children.forEach(function(child) {
        ul.appendChild(renderNode(child, level + 1, path, aliases));
      });
      li.appendChild(ul);

      // Initial state: collapse all dirs except the synthetic root (level 0).
      // User opens dirs on demand; this prevents the "wall of 233 rows" first paint.
      var initiallyCollapsed = level >= 1;
      if (initiallyCollapsed) {
        li.classList.add('dok-collapsed');
      }
      item.setAttribute('aria-expanded', initiallyCollapsed ? 'false' : 'true');

      function toggle() {
        var nowCollapsed = li.classList.toggle('dok-collapsed');
        item.setAttribute('aria-expanded', nowCollapsed ? 'false' : 'true');
      }

      // Click on dir item toggles collapse
      item.addEventListener('click', function(e) {
        e.stopPropagation();
        toggle();
      });
      // Keyboard: Enter/Space also toggles
      item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    }

    return li;
  }

  window.renderDokumentyTree = function renderDokumentyTree(rootEl, treeData, onSelect, aliases) {
    rootEl.innerHTML = '';
    var ul = document.createElement('ul');
    ul.setAttribute('role', 'tree');
    ul.appendChild(renderNode(treeData, 0, [], aliases || { _dirs: {}, _files: {} }));
    rootEl.appendChild(ul);

    function selectFile(item) {
      // Mark selected
      var prev = rootEl.querySelector('.dok-selected');
      if (prev) prev.classList.remove('dok-selected');
      item.classList.add('dok-selected');

      // Call onSelect with path array
      var pathArr = item.dataset.path.split('/');
      var nameEl = item.querySelector('.dok-name');
      var display = nameEl ? nameEl.textContent : pathArr[pathArr.length - 1];
      onSelect({
        name: pathArr[pathArr.length - 1],
        ext: item.dataset.ext,
        display: display
      }, pathArr);
    }

    // Delegate file clicks to the root
    rootEl.addEventListener('click', function(e) {
      var item = e.target.closest('.dok-item');
      if (!item) return;
      if (item.dataset.type !== 'file') return;
      selectFile(item);
    });

    // Keyboard: Enter/Space on a file item selects it
    rootEl.addEventListener('keydown', function(e) {
      var item = e.target.closest('.dok-item');
      if (!item) return;
      if (item.dataset.type !== 'file') return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectFile(item);
      }
    });
  };

  // Filter tree by search-term and ext-filter; hides items that don't match.
  // Algorithm: hide files that don't match; hide empty dirs (after filter).
  window.filterDokumentyTree = function filterDokumentyTree(rootEl, term, extFilter) {
    var lowerTerm = (term || '').toLowerCase().trim();
    var matchExt = extFilter && extFilter !== 'all' ? extFilter : null;

    // First pass: show/hide files (match against path AND visible name to support alias lookup)
    var fileItems = rootEl.querySelectorAll('.dok-file > .dok-item');
    fileItems.forEach(function(item) {
      var nameEl = item.querySelector('.dok-name');
      var displayName = nameEl ? nameEl.textContent.toLowerCase() : '';
      var matchesText = !lowerTerm
        || item.dataset.path.toLowerCase().indexOf(lowerTerm) !== -1
        || displayName.indexOf(lowerTerm) !== -1;
      var matchesExt = !matchExt || item.dataset.ext === matchExt;
      var visible = matchesText && matchesExt;
      item.parentElement.style.display = visible ? '' : 'none';
    });

    // Second pass: hide empty dirs (recursively from leaves)
    function dirHasVisibleFile(li) {
      var children = li.querySelectorAll(':scope > ul > li');
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (c.classList.contains('dok-file')) {
          if (c.style.display !== 'none') return true;
        } else if (c.classList.contains('dok-dir')) {
          if (dirHasVisibleFile(c)) return true;
        }
      }
      return false;
    }

    // If filter active, walk all dirs and hide ones with no visible files
    var filterActive = !!(lowerTerm || matchExt);
    var dirItems = rootEl.querySelectorAll('.dok-dir');
    dirItems.forEach(function(li) {
      if (!filterActive) {
        li.style.display = '';
        return;
      }
      li.style.display = dirHasVisibleFile(li) ? '' : 'none';
    });

    // When filter active, expand all visible dirs so user can see matches
    if (filterActive) {
      rootEl.querySelectorAll('.dok-dir').forEach(function(li) {
        li.classList.remove('dok-collapsed');
      });
    }
  };
})();
