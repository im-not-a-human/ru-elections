# Compromat Phase 5 — Document Explorer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать `/dokumenty.html` — GitHub-style file-explorer для всех скачанных первоисточников в `research/compromat/05-evidence/` (233 файла / 190 МБ / 23 поддиректории) с поиском, фильтрацией по типу файла, in-browser preview для PDF/HTML/JSON/XML/CSV/MD/DOCX/XLSX.

**Architecture:** Статическая страница с двухколоночным layout (tree-explorer слева + preview-pane справа). Файловое дерево генерируется build-script'ом в JSON (`assets/data/dokumenty-tree.json`) — single source of truth. Preview-pane выбирает рендерер по расширению: PDF через `<embed>`, HTML/JSON/XML/CSV/MD через fetch+рендер, DOCX через mammoth.js (CDN), XLSX через SheetJS xlsx.js (CDN). Keyboard navigation (стрелки, Enter, /). URL-state через `?path=<encoded-path>` для шарилинка.

**Tech Stack:** HTML5, CSS3, vanilla JS. Внешние библиотеки через CDN (mammoth.js ~150 KB, SheetJS xlsx.js ~700 KB) — загружаются лениво только при открытии DOCX/XLSX. Build-script на Node.js или Python для генерации tree-JSON.

---

## File Structure

### Создаются (страница)

| Путь | Ответственность |
|---|---|
| `dokumenty.html` | Двухколоночный layout: tree (левая колонка) + preview-pane (правая). `<main data-page="dokumenty">`. Inline init JS. |
| `assets/css/dokumenty.css` | Стили двухколоночного layout, tree-итемов, preview-pane, breadcrumb, search-input. |
| `assets/js/data/dokumenty-tree.json` | **Сгенерированный** JSON-tree из `research/compromat/05-evidence/`. Не редактируется руками. |
| `assets/js/lib/dokumenty-tree.js` | Рендерер tree-explorer (recursive list). Filter по расширению. Search по имени. Selection state. |
| `assets/js/lib/dokumenty-preview.js` | Preview-pane router: вызывает соответствующий рендерер по расширению. |
| `assets/js/lib/dokumenty-renderers.js` | 7 рендереров: pdf, html, json, xml, csv, md, txt. DOCX и XLSX — отдельные функции с lazy-load CDN. |
| `assets/js/pages/dokumenty.js` | Init: загрузка JSON tree, рендер, привязка событий. URL-state. Keyboard navigation. |
| `scripts/generate-dokumenty-tree.sh` | Build-script: walks `research/compromat/05-evidence/`, создаёт `assets/js/data/dokumenty-tree.json` с метаданными (size, mtime, ext). |

### Модифицируются

| Путь | Что меняется |
|---|---|
| `assets/js/data/cross-cutting.js` | Карточка «Документы» на главной — обновить `href` на `dokumenty.html` (если ещё не указан). |
| `index.html` | Раздел тизера документов (Phase 1 «3.5 Документы») — обновить ссылку «→ Открыть эксплорер документов» на `dokumenty.html`. |

### Не трогаются

- Все Phase 1-4 файлы
- `assets/css/partii.css`, `assets/js/components/*.js`, `assets/js/pages/{home,elections,party,sujet}.js`

---

## Архитектура preview

Расширение → рендерер:

| Ext | Рендерер | Технология | CDN-зависимости |
|---|---|---|---|
| `.pdf` | `renderPdf` | `<embed type="application/pdf">` (нативно браузер) | — |
| `.html` | `renderHtml` | `<iframe sandbox="allow-same-origin">` (для безопасности) | — |
| `.json` | `renderJson` | fetch + `JSON.stringify(parsed, null, 2)` + `<pre>` | — |
| `.xml` | `renderXml` | fetch + текстовое отображение в `<pre>` (с подсветкой через простую regex-замену) | — |
| `.csv` | `renderCsv` | fetch + парсинг через `String.split` + `<table>` (max 1000 строк, остальные за «show more») | — |
| `.md` | `renderMd` | fetch + базовый markdown-рендерер (headings, lists, links, code, **bold**, *italic*) inline в JS — без библиотеки. Для сложного MD — fallback в `<pre>`. | — |
| `.txt`, `.log` | `renderText` | fetch + `<pre>` | — |
| `.docx` | `renderDocx` | mammoth.js convertToHtml | mammoth.js (~150 KB, CDN) |
| `.xlsx`, `.xls`, `.ods` | `renderSpreadsheet` | SheetJS read + render каждый sheet как `<table>` | xlsx.js (~700 KB, CDN) |
| `.png`, `.jpg`, `.svg`, `.webp` | `renderImage` | `<img src="...">` | — |
| (другие) | `renderUnknown` | Сообщение «Тип файла не поддерживается для preview» + кнопка «Скачать файл» | — |

**Lazy-load CDN**: mammoth.js и xlsx.js загружаются только при первом открытии файла соответствующего типа. Используем `<script src="..." async>` инжектируем в `<head>` по требованию + Promise-based wait.

---

## Tasks

### Task 1: Build-script для генерации tree-JSON

**Files:**
- Create: `scripts/generate-dokumenty-tree.sh`

Требование: проходить `research/compromat/05-evidence/` рекурсивно и создавать JSON со структурой:

```json
{
  "name": "05-evidence",
  "type": "dir",
  "children": [
    {
      "name": "duma-api",
      "type": "dir",
      "children": [
        {
          "name": "votes",
          "type": "dir",
          "children": [
            { "name": "army-fakes.xml", "type": "file", "size": 12345, "ext": "xml" }
          ]
        }
      ]
    }
  ]
}
```

Ограничения для размера JSON: 233 файла × средняя длина имени 30 chars + размер + ext = ~50 KB JSON, что приемлемо для одной загрузки.

- [ ] **Step 1: Создать `scripts/generate-dokumenty-tree.sh`**

```bash
#!/bin/bash
# Generates assets/js/data/dokumenty-tree.json from research/compromat/05-evidence/
# Usage: bash scripts/generate-dokumenty-tree.sh

set -euo pipefail

cd "$(dirname "$0")/.."

ROOT="research/compromat/05-evidence"
OUT="assets/js/data/dokumenty-tree.json"

if [ ! -d "$ROOT" ]; then
  echo "ERROR: $ROOT not found" >&2
  exit 1
fi

# Use python for JSON generation (more reliable than bash for nested structures)
python3 -c '
import json
import os
from pathlib import Path

root = Path("research/compromat/05-evidence")

def walk(p):
    if p.is_file():
        return {
            "name": p.name,
            "type": "file",
            "size": p.stat().st_size,
            "ext": p.suffix.lstrip(".").lower()
        }
    children = []
    for child in sorted(p.iterdir(), key=lambda x: (x.is_file(), x.name)):
        # Skip hidden
        if child.name.startswith("."):
            continue
        children.append(walk(child))
    return {
        "name": p.name,
        "type": "dir",
        "children": children
    }

tree = walk(root)
with open("assets/js/data/dokumenty-tree.json", "w", encoding="utf-8") as f:
    json.dump(tree, f, ensure_ascii=False, indent=2)
print(f"Tree generated: {len(json.dumps(tree, ensure_ascii=False))} bytes")
'

echo "Done. Run again after adding new evidence files."
```

- [ ] **Step 2: Сделать исполняемым и запустить**

```bash
cd ./
mkdir -p scripts assets/js/data
chmod +x scripts/generate-dokumenty-tree.sh
bash scripts/generate-dokumenty-tree.sh
ls -la assets/js/data/dokumenty-tree.json
```

Expected: файл создан, размер ~30-60 KB.

- [ ] **Step 3: Smoke-test JSON**

```bash
node -e 'const t = require("./assets/js/data/dokumenty-tree.json"); console.log("Root:", t.name, "/ children:", t.children.length); function count(n) { if (n.type === "file") return 1; return (n.children || []).reduce((s, c) => s + count(c), 0); } console.log("Total files:", count(t));'
```

Expected: «Root: 05-evidence / children: 23» (или сколько подпапок), «Total files: 233» (или близко).

- [ ] **Step 4: Commit**

```bash
cd ./
git add scripts/generate-dokumenty-tree.sh assets/js/data/dokumenty-tree.json
git commit -m "feat(dokumenty): add build script + initial tree JSON for evidence explorer"
```

---

### Task 2: CSS — `assets/css/dokumenty.css`

**Files:**
- Create: `assets/css/dokumenty.css`

- [ ] **Step 1: Создать стили**

```css
/* /dokumenty.html — file explorer */

.dok-page {
  max-width: var(--max);
  margin: 0 auto;
  padding: 32px 32px 64px;
}

.dok-header { margin-bottom: 24px; }
.dok-header h1 {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 900;
  letter-spacing: -0.03em;
  margin: 0 0 8px;
}
.dok-header .meta {
  font-size: 13px;
  color: var(--ink-muted);
}
.dok-header .meta .num {
  font-family: 'JetBrains Mono', monospace;
  color: var(--accent);
}

/* Search bar */
.dok-search {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
.dok-search input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: 6px;
  font-size: 14px;
  background: var(--bg-card);
  color: var(--ink);
}
.dok-search input:focus { outline: 2px solid var(--accent); border-color: transparent; }
.dok-search select {
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 6px;
  font-size: 13px;
  background: var(--bg-card);
  color: var(--ink);
}

/* Two-column layout */
.dok-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
  min-height: 70vh;
}

@media (min-width: 1080px) {
  .dok-layout {
    grid-template-columns: 320px 1fr;
  }
}

/* Tree panel (left) */
.dok-tree {
  background: var(--bg-paper);
  border-right: 1px solid var(--line);
  max-height: 80vh;
  overflow-y: auto;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  padding: 12px 0;
}
.dok-tree ul { list-style: none; padding: 0; margin: 0; }
.dok-tree li { line-height: 1.5; }
.dok-tree .dok-item {
  display: flex; align-items: center;
  padding: 3px 12px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}
.dok-tree .dok-item:hover { background: rgba(0,0,0,0.04); }
.dok-tree .dok-item.dok-selected {
  background: var(--ink); color: var(--bg-card);
}
.dok-tree .dok-icon { margin-right: 6px; font-size: 11px; opacity: 0.7; }
.dok-tree .dok-dir > .dok-item { font-weight: 600; }
.dok-tree .dok-collapsed > ul { display: none; }
.dok-tree .dok-meta {
  margin-left: auto;
  font-size: 10px; color: var(--ink-muted);
  padding-left: 8px;
}
.dok-tree .dok-selected .dok-meta { color: var(--bg-card); opacity: 0.8; }

/* Indent levels */
.dok-tree .level-0 { padding-left: 12px; }
.dok-tree .level-1 { padding-left: 28px; }
.dok-tree .level-2 { padding-left: 44px; }
.dok-tree .level-3 { padding-left: 60px; }
.dok-tree .level-4 { padding-left: 76px; }

/* Preview pane (right) */
.dok-preview {
  background: var(--bg-card);
  display: flex; flex-direction: column;
}
.dok-preview-head {
  padding: 12px 16px;
  border-bottom: 1px solid var(--line);
  display: flex; justify-content: space-between; align-items: center;
  font-size: 12px;
  background: var(--bg-paper);
}
.dok-breadcrumb {
  font-family: 'JetBrains Mono', monospace;
  color: var(--ink-soft);
}
.dok-breadcrumb .sep { margin: 0 4px; color: var(--ink-muted); }
.dok-actions { display: flex; gap: 8px; }
.dok-actions a {
  padding: 4px 10px;
  border: 1px solid var(--line);
  border-radius: 4px;
  text-decoration: none;
  color: var(--ink);
  font-size: 12px;
}
.dok-actions a:hover { background: var(--bg-paper); }

.dok-preview-body {
  flex: 1;
  overflow: auto;
  padding: 0;
  position: relative;
  min-height: 50vh;
}
.dok-preview-body pre {
  margin: 0; padding: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  line-height: 1.5;
  color: var(--ink);
  white-space: pre-wrap;
  word-wrap: break-word;
}
.dok-preview-body iframe,
.dok-preview-body embed {
  width: 100%;
  height: 80vh;
  border: 0;
}
.dok-preview-body .dok-csv-table,
.dok-preview-body .dok-xlsx-sheet {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  margin: 16px 0;
}
.dok-preview-body .dok-csv-table th,
.dok-preview-body .dok-xlsx-sheet th {
  text-align: left;
  padding: 6px 10px;
  background: var(--bg-paper);
  font-weight: 700;
  border-bottom: 2px solid var(--line);
  position: sticky; top: 0;
}
.dok-preview-body .dok-csv-table td,
.dok-preview-body .dok-xlsx-sheet td {
  padding: 4px 10px;
  border-bottom: 1px solid var(--line);
}
.dok-preview-body .dok-csv-table tr:nth-child(even),
.dok-preview-body .dok-xlsx-sheet tr:nth-child(even) {
  background: var(--bg-paper);
}

.dok-preview-body .dok-md {
  padding: 24px;
  font-size: 14px;
  line-height: 1.65;
}
.dok-preview-body .dok-md h1,
.dok-preview-body .dok-md h2,
.dok-preview-body .dok-md h3 { margin-top: 24px; margin-bottom: 8px; }
.dok-preview-body .dok-md h1 { font-size: 26px; font-weight: 900; }
.dok-preview-body .dok-md h2 { font-size: 20px; font-weight: 800; }
.dok-preview-body .dok-md h3 { font-size: 16px; font-weight: 700; }
.dok-preview-body .dok-md a { color: var(--accent); text-decoration: none; }
.dok-preview-body .dok-md a:hover { text-decoration: underline; }
.dok-preview-body .dok-md code {
  background: var(--bg-paper);
  padding: 1px 5px;
  border-radius: 2px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
}
.dok-preview-body .dok-md pre {
  background: var(--bg-paper);
  padding: 12px 16px;
  border-radius: 4px;
  border-left: 3px solid var(--accent);
}

.dok-empty,
.dok-loading,
.dok-error {
  padding: 60px 24px;
  text-align: center;
  color: var(--ink-muted);
}
.dok-empty .ico,
.dok-error .ico {
  font-size: 32px; opacity: 0.3; margin-bottom: 12px;
}
.dok-loading::after {
  content: '';
  display: inline-block;
  width: 12px; height: 12px;
  border: 2px solid var(--line);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: dok-spin 0.8s linear infinite;
  margin-left: 8px; vertical-align: -2px;
}
@keyframes dok-spin { to { transform: rotate(360deg); } }

/* xlsx multi-sheet tabs */
.dok-xlsx-tabs {
  display: flex; gap: 4px;
  padding: 8px 12px 0;
  background: var(--bg-paper);
  border-bottom: 1px solid var(--line);
  overflow-x: auto;
  flex-wrap: nowrap;
}
.dok-xlsx-tabs button {
  background: transparent;
  border: 1px solid var(--line);
  border-bottom: 0;
  padding: 4px 10px;
  font-size: 11px;
  cursor: pointer;
  border-radius: 4px 4px 0 0;
  white-space: nowrap;
}
.dok-xlsx-tabs button.active { background: var(--ink); color: var(--bg-card); border-color: var(--ink); }

/* Mobile fallback — preview goes below tree */
@media (max-width: 1079px) {
  .dok-tree { max-height: 40vh; }
  .dok-preview-body iframe,
  .dok-preview-body embed { height: 50vh; }
}
```

- [ ] **Step 2: Commit**

```bash
cd ./
git add assets/css/dokumenty.css
git commit -m "feat(dokumenty): add CSS for two-column file explorer"
```

---

### Task 3: tree-explorer (`dokumenty-tree.js`)

**Files:**
- Create: `assets/js/lib/dokumenty-tree.js`

- [ ] **Step 1: Создать рендерер дерева**

```js
// Renders a recursive tree of files/dirs from a JSON structure.
// Exports: window.renderDokumentyTree(rootEl, treeData, onSelect)
// onSelect(node, path[]) — callback called when a file is clicked.

(function() {
  // Format size in KB/MB
  function fmtSize(bytes) {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' Б';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' КБ';
    return (bytes / (1024 * 1024)).toFixed(1) + ' МБ';
  }

  // Choose icon by extension
  function iconFor(node) {
    if (node.type === 'dir') return '📁';
    var iconMap = {
      pdf: '📄', html: '🌐', xml: '📋', json: '📋',
      csv: '📊', md: '📝', txt: '📝', log: '📝',
      docx: '📄', doc: '📄',
      xlsx: '📊', xls: '📊', ods: '📊',
      png: '🖼️', jpg: '🖼️', jpeg: '🖼️', svg: '🖼️', webp: '🖼️'
    };
    return iconMap[node.ext] || '📎';
  }

  function renderNode(node, level, parentPath) {
    var li = document.createElement('li');
    li.className = node.type === 'dir' ? 'dok-dir' : 'dok-file';
    var path = parentPath.concat([node.name]);

    var item = document.createElement('div');
    item.className = 'dok-item level-' + Math.min(level, 4);
    item.dataset.path = path.join('/');
    item.dataset.type = node.type;
    if (node.ext) item.dataset.ext = node.ext;

    var ico = document.createElement('span');
    ico.className = 'dok-icon';
    ico.textContent = iconFor(node);
    item.appendChild(ico);

    var name = document.createElement('span');
    name.textContent = node.name;
    item.appendChild(name);

    if (node.type === 'file') {
      var meta = document.createElement('span');
      meta.className = 'dok-meta';
      meta.textContent = fmtSize(node.size);
      item.appendChild(meta);
    }

    li.appendChild(item);

    if (node.type === 'dir' && node.children && node.children.length) {
      var ul = document.createElement('ul');
      node.children.forEach(function(child) {
        ul.appendChild(renderNode(child, level + 1, path));
      });
      li.appendChild(ul);

      // Click on dir item toggles collapse
      item.addEventListener('click', function(e) {
        e.stopPropagation();
        li.classList.toggle('dok-collapsed');
      });
    }

    return li;
  }

  window.renderDokumentyTree = function renderDokumentyTree(rootEl, treeData, onSelect) {
    rootEl.innerHTML = '';
    var ul = document.createElement('ul');
    ul.appendChild(renderNode(treeData, 0, []));
    rootEl.appendChild(ul);

    // Delegate file clicks to the root
    rootEl.addEventListener('click', function(e) {
      var item = e.target.closest('.dok-item');
      if (!item) return;
      if (item.dataset.type !== 'file') return;

      // Mark selected
      var prev = rootEl.querySelector('.dok-selected');
      if (prev) prev.classList.remove('dok-selected');
      item.classList.add('dok-selected');

      // Call onSelect with path array (split by /)
      var pathArr = item.dataset.path.split('/');
      onSelect({ name: pathArr[pathArr.length-1], ext: item.dataset.ext }, pathArr);
    });
  };

  // Filter tree by search-term and ext-filter; hides items that don't match.
  // Implementation: simple add/remove .dok-hidden class on .dok-item; CSS hides them.
  // For first iteration, do client-side; if perf is poor, switch to data-attribute filtering.
  window.filterDokumentyTree = function filterDokumentyTree(rootEl, term, extFilter) {
    var items = rootEl.querySelectorAll('.dok-item');
    var lowerTerm = (term || '').toLowerCase();
    items.forEach(function(item) {
      if (item.dataset.type === 'dir') {
        item.parentElement.style.display = ''; // dirs always visible
        return;
      }
      var matchesText = !lowerTerm || item.dataset.path.toLowerCase().indexOf(lowerTerm) !== -1;
      var matchesExt = !extFilter || extFilter === 'all' || item.dataset.ext === extFilter;
      item.parentElement.style.display = (matchesText && matchesExt) ? '' : 'none';
    });
  };
})();
```

- [ ] **Step 2: Sanity check + commit**

```bash
cd ./
node -c assets/js/lib/dokumenty-tree.js
git add assets/js/lib/dokumenty-tree.js
git commit -m "feat(dokumenty): add tree-explorer with selection and filter"
```

---

### Task 4: preview rendererы (`dokumenty-renderers.js`)

**Files:**
- Create: `assets/js/lib/dokumenty-renderers.js`

- [ ] **Step 1: Создать рендереры**

```js
// Renderers for various file types. Exports window.dokumentyRenderers.
// Each renderer returns a Promise<HTMLElement|string> or sets innerHTML directly on bodyEl.

(function() {
  // Lazy-load CDN libs
  var libCache = {};
  function loadLib(url) {
    if (libCache[url]) return libCache[url];
    libCache[url] = new Promise(function(resolve, reject) {
      var s = document.createElement('script');
      s.src = url;
      s.async = true;
      s.onload = function() { resolve(); };
      s.onerror = function() { reject(new Error('Failed to load ' + url)); };
      document.head.appendChild(s);
    });
    return libCache[url];
  }

  // Render PDF via embed (browser native)
  function renderPdf(bodyEl, url) {
    bodyEl.innerHTML = '<embed src="' + encodeURI(url) + '" type="application/pdf">';
  }

  // Render HTML via sandboxed iframe
  function renderHtml(bodyEl, url) {
    bodyEl.innerHTML = '<iframe src="' + encodeURI(url) + '" sandbox="allow-same-origin"></iframe>';
  }

  // Render plain text in <pre>
  function renderText(bodyEl, url) {
    return fetch(url).then(function(r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    }).then(function(text) {
      var pre = document.createElement('pre');
      pre.textContent = text;
      bodyEl.innerHTML = '';
      bodyEl.appendChild(pre);
    });
  }

  // Render JSON (parsed + pretty-printed)
  function renderJson(bodyEl, url) {
    return fetch(url).then(function(r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function(json) {
      var pre = document.createElement('pre');
      pre.textContent = JSON.stringify(json, null, 2);
      bodyEl.innerHTML = '';
      bodyEl.appendChild(pre);
    }).catch(function(err) {
      // Fallback: treat as text
      return renderText(bodyEl, url);
    });
  }

  // Render XML (text with light highlighting via CSS classes — keep simple)
  function renderXml(bodyEl, url) {
    return fetch(url).then(function(r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    }).then(function(text) {
      var pre = document.createElement('pre');
      pre.textContent = text;
      bodyEl.innerHTML = '';
      bodyEl.appendChild(pre);
    });
  }

  // Render CSV — first 1000 rows max
  function renderCsv(bodyEl, url) {
    return fetch(url).then(function(r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    }).then(function(text) {
      var rows = text.split(/\r?\n/).filter(function(r) { return r.length > 0; });
      var maxRows = Math.min(rows.length, 1001);  // 1 header + 1000 data
      var html = '<table class="dok-csv-table">';
      // Naive CSV split — does not handle quoted commas; adequate for our data
      function splitRow(row) {
        return row.split(',');
      }
      var headers = splitRow(rows[0]);
      html += '<thead><tr>';
      headers.forEach(function(h) { html += '<th>' + escHtml(h) + '</th>'; });
      html += '</tr></thead><tbody>';
      for (var i = 1; i < maxRows; i++) {
        var cells = splitRow(rows[i]);
        html += '<tr>';
        cells.forEach(function(c) { html += '<td>' + escHtml(c) + '</td>'; });
        html += '</tr>';
      }
      html += '</tbody></table>';
      if (rows.length > maxRows) {
        html += '<p style="padding:12px;color:var(--ink-muted)">Показаны первые ' + (maxRows-1) + ' из ' + (rows.length-1) + ' строк.</p>';
      }
      bodyEl.innerHTML = html;
    });
  }

  function escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Render Markdown — light renderer (headings, bold, italic, links, lists, code)
  function renderMd(bodyEl, url) {
    return fetch(url).then(function(r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    }).then(function(text) {
      var html = mdToHtml(text);
      var div = document.createElement('div');
      div.className = 'dok-md';
      div.innerHTML = html;
      bodyEl.innerHTML = '';
      bodyEl.appendChild(div);
    });
  }

  function mdToHtml(md) {
    var lines = md.split(/\r?\n/);
    var out = [];
    var inList = false; var inCode = false;
    lines.forEach(function(ln) {
      if (ln.match(/^```/)) {
        if (!inCode) { out.push('<pre><code>'); inCode = true; }
        else { out.push('</code></pre>'); inCode = false; }
        return;
      }
      if (inCode) { out.push(escHtml(ln)); return; }

      // Headings
      var m;
      if ((m = ln.match(/^(#{1,3})\s+(.+)/))) {
        var lvl = m[1].length;
        out.push('<h' + lvl + '>' + inline(m[2]) + '</h' + lvl + '>');
        return;
      }
      // Lists
      if ((m = ln.match(/^[-*]\s+(.+)/))) {
        if (!inList) { out.push('<ul>'); inList = true; }
        out.push('<li>' + inline(m[1]) + '</li>');
        return;
      }
      if (inList && !ln.match(/^[-*]/)) { out.push('</ul>'); inList = false; }
      // Empty line
      if (ln.match(/^\s*$/)) { out.push(''); return; }
      // Paragraph
      out.push('<p>' + inline(ln) + '</p>');
    });
    if (inList) out.push('</ul>');
    if (inCode) out.push('</code></pre>');
    return out.join('\n');
  }

  function inline(s) {
    s = escHtml(s);
    // Bold: **text**
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic: *text*
    s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
    // Inline code: `text`
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Links: [text](url)
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    return s;
  }

  // Render image
  function renderImage(bodyEl, url) {
    bodyEl.innerHTML = '<div style="padding:24px;text-align:center"><img src="' + encodeURI(url) + '" style="max-width:100%;max-height:80vh"></div>';
  }

  // Render DOCX via mammoth.js (lazy-load CDN)
  function renderDocx(bodyEl, url) {
    bodyEl.innerHTML = '<div class="dok-loading">Загружаю mammoth.js…</div>';
    return loadLib('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js')
      .then(function() { return fetch(url); })
      .then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.arrayBuffer();
      })
      .then(function(buf) {
        return window.mammoth.convertToHtml({ arrayBuffer: buf });
      })
      .then(function(result) {
        var div = document.createElement('div');
        div.className = 'dok-md';
        div.innerHTML = result.value;
        bodyEl.innerHTML = '';
        bodyEl.appendChild(div);
      });
  }

  // Render XLSX via SheetJS (lazy-load CDN)
  function renderSpreadsheet(bodyEl, url) {
    bodyEl.innerHTML = '<div class="dok-loading">Загружаю SheetJS…</div>';
    return loadLib('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js')
      .then(function() { return fetch(url); })
      .then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.arrayBuffer();
      })
      .then(function(buf) {
        var workbook = window.XLSX.read(new Uint8Array(buf), { type: 'array' });
        var sheets = workbook.SheetNames;
        var html = '';
        if (sheets.length > 1) {
          html += '<div class="dok-xlsx-tabs">';
          sheets.forEach(function(name, i) {
            html += '<button data-sheet="' + escHtml(name) + '"' + (i === 0 ? ' class="active"' : '') + '>' + escHtml(name) + '</button>';
          });
          html += '</div>';
        }
        sheets.forEach(function(name, i) {
          var ws = workbook.Sheets[name];
          var tableHtml = window.XLSX.utils.sheet_to_html(ws);
          // Replace the inner <table> class to ours
          tableHtml = tableHtml.replace(/<table[^>]*>/, '<table class="dok-xlsx-sheet" data-sheet="' + escHtml(name) + '" style="' + (i === 0 ? '' : 'display:none') + '">');
          html += tableHtml;
        });
        bodyEl.innerHTML = html;

        // Wire tab switches
        bodyEl.querySelectorAll('.dok-xlsx-tabs button').forEach(function(btn) {
          btn.addEventListener('click', function() {
            bodyEl.querySelectorAll('.dok-xlsx-tabs button').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var name = btn.dataset.sheet;
            bodyEl.querySelectorAll('.dok-xlsx-sheet').forEach(function(t) {
              t.style.display = t.dataset.sheet === name ? '' : 'none';
            });
          });
        });
      });
  }

  function renderUnknown(bodyEl, url, name) {
    bodyEl.innerHTML = '<div class="dok-empty"><div class="ico">📎</div><p>Тип файла не поддерживается для предпросмотра.</p><p><a href="' + encodeURI(url) + '" download>Скачать «' + escHtml(name) + '»</a></p></div>';
  }

  window.dokumentyRenderers = {
    pdf: renderPdf,
    html: renderHtml,
    htm: renderHtml,
    txt: renderText,
    log: renderText,
    json: renderJson,
    xml: renderXml,
    csv: renderCsv,
    md: renderMd,
    docx: renderDocx,
    doc: renderDocx,
    xlsx: renderSpreadsheet,
    xls: renderSpreadsheet,
    ods: renderSpreadsheet,
    png: renderImage,
    jpg: renderImage,
    jpeg: renderImage,
    svg: renderImage,
    webp: renderImage,
    unknown: renderUnknown
  };
})();
```

- [ ] **Step 2: Smoke check + commit**

```bash
cd ./
node -c assets/js/lib/dokumenty-renderers.js
git add assets/js/lib/dokumenty-renderers.js
git commit -m "feat(dokumenty): add type-based renderers (pdf/html/json/xml/csv/md/docx/xlsx/img)"
```

---

### Task 5: preview-pane router (`dokumenty-preview.js`)

**Files:**
- Create: `assets/js/lib/dokumenty-preview.js`

- [ ] **Step 1: Создать router**

```js
// Routes file selection to the appropriate renderer.
// Exports: window.renderDokumentyPreview(rootEl, pathArr, fileNode, baseUrl)

(function() {
  function buildBreadcrumb(pathArr) {
    return pathArr.map(function(p, i) {
      var html = '<span>' + escHtml(p) + '</span>';
      if (i < pathArr.length - 1) html += '<span class="sep">/</span>';
      return html;
    }).join('');
  }

  function escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  window.renderDokumentyPreview = function(headEl, bodyEl, pathArr, fileNode, baseUrl) {
    headEl.innerHTML = '<div class="dok-breadcrumb">' + buildBreadcrumb(pathArr) + '</div>' +
      '<div class="dok-actions">' +
        '<a href="' + baseUrl + '" target="_blank" rel="noopener">Открыть в новой вкладке</a> ' +
        '<a href="' + baseUrl + '" download>Скачать</a>' +
      '</div>';

    bodyEl.innerHTML = '<div class="dok-loading">Загружаю…</div>';

    var renderer = window.dokumentyRenderers[fileNode.ext] || window.dokumentyRenderers.unknown;
    var ret;
    try {
      ret = renderer(bodyEl, baseUrl, fileNode.name);
    } catch (e) {
      bodyEl.innerHTML = '<div class="dok-error"><div class="ico">⚠️</div><p>Ошибка рендеринга: ' + escHtml(e.message) + '</p></div>';
      return;
    }
    if (ret && ret.catch) {
      ret.catch(function(err) {
        bodyEl.innerHTML = '<div class="dok-error"><div class="ico">⚠️</div><p>Ошибка загрузки: ' + escHtml(err.message) + '</p></div>';
      });
    }
  };
})();
```

- [ ] **Step 2: Smoke check + commit**

```bash
cd ./
node -c assets/js/lib/dokumenty-preview.js
git add assets/js/lib/dokumenty-preview.js
git commit -m "feat(dokumenty): add preview-pane router with breadcrumb + actions"
```

---

### Task 6: page-init (`pages/dokumenty.js`)

**Files:**
- Create: `assets/js/pages/dokumenty.js`

- [ ] **Step 1: Создать init**

```js
// Init for /dokumenty.html.
// Loads tree JSON, renders tree, wires search/filter, handles selection + URL state.

window.initDokumenty = function initDokumenty() {
  var treeRoot = document.getElementById('dokTree');
  var previewHead = document.getElementById('dokPreviewHead');
  var previewBody = document.getElementById('dokPreviewBody');
  var searchInput = document.getElementById('dokSearch');
  var extFilter = document.getElementById('dokExt');
  var totalCount = document.getElementById('dokTotalCount');

  if (!treeRoot) return;

  // Load tree JSON
  fetch('assets/js/data/dokumenty-tree.json')
    .then(function(r) { return r.json(); })
    .then(function(tree) {
      // Update header count
      var fileCount = countFiles(tree);
      if (totalCount) totalCount.textContent = fileCount;

      // Render tree
      window.renderDokumentyTree(treeRoot, tree, function(fileNode, pathArr) {
        // Build base URL: research/compromat/05-evidence/<rest of path after root>
        var relPath = pathArr.slice(1).join('/'); // skip "05-evidence" root
        var baseUrl = 'research/compromat/05-evidence/' + relPath;
        window.renderDokumentyPreview(previewHead, previewBody, pathArr, fileNode, baseUrl);

        // Update URL state
        var url = new URL(window.location.href);
        url.searchParams.set('path', pathArr.join('/'));
        window.history.replaceState({}, '', url.toString());
      });

      // Restore from URL
      var urlPath = new URLSearchParams(window.location.search).get('path');
      if (urlPath) {
        var targetItem = treeRoot.querySelector('.dok-item[data-path="' + urlPath.replace(/"/g, '\\"') + '"]');
        if (targetItem && targetItem.dataset.type === 'file') targetItem.click();
      }
    })
    .catch(function(err) {
      treeRoot.innerHTML = '<div class="dok-error"><p>Ошибка загрузки дерева: ' + err.message + '</p></div>';
    });

  // Search and filter
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      window.filterDokumentyTree(treeRoot, searchInput.value, extFilter ? extFilter.value : 'all');
    });
  }
  if (extFilter) {
    extFilter.addEventListener('change', function() {
      window.filterDokumentyTree(treeRoot, searchInput ? searchInput.value : '', extFilter.value);
    });
  }

  // Keyboard: / focuses search
  document.addEventListener('keydown', function(e) {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
  });
};

function countFiles(node) {
  if (node.type === 'file') return 1;
  return (node.children || []).reduce(function(s, c) { return s + countFiles(c); }, 0);
}

function tryAutoInitDokumenty() {
  var main = document.getElementById('main');
  if (main && main.dataset.page === 'dokumenty') window.initDokumenty();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', tryAutoInitDokumenty);
} else {
  tryAutoInitDokumenty();
}
```

- [ ] **Step 2: Smoke check + commit**

```bash
cd ./
node -c assets/js/pages/dokumenty.js
git add assets/js/pages/dokumenty.js
git commit -m "feat(dokumenty): add page init with URL state + keyboard shortcut"
```

---

### Task 7: HTML страница `dokumenty.html`

**Files:**
- Create: `dokumenty.html`

- [ ] **Step 1: Создать страницу**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Документы — 233 первоисточника | Голосование без выбора</title>
<meta name="description" content="Эксплорер скачанных первоисточников по российской партийной системе: указы Президента, карточки sozd.duma.gov.ru, raw-XML голосований, OFAC SDN, UK Sanctions, Litvinenko Inquiry, тексты ФЗ, декларации, реестр иноагентов, госконтракты — 233 файла на 190 МБ.">
<meta property="og:title" content="Документы — 233 первоисточника">
<meta property="og:description" content="Эксплорер скачанных первоисточников по российской партийной системе.">
<meta property="og:type" content="article">
<meta property="og:url" content="https://im-not-a-human.github.io/ru-elections/dokumenty.html">
<link rel="canonical" href="https://im-not-a-human.github.io/ru-elections/dokumenty.html">
<link rel="icon" href="data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'&gt;&lt;rect width='32' height='32' rx='6' fill='%231A1815'/&gt;&lt;text x='16' y='22' text-anchor='middle' font-family='Unbounded,sans-serif' font-weight='900' font-size='18' fill='%23F0EAD6'&gt;Г&lt;/text&gt;&lt;/svg&gt;">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;700;900&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/tokens.css">
<link rel="stylesheet" href="assets/css/base.css">
<link rel="stylesheet" href="assets/css/layout.css">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/dokumenty.css">
<script>document.documentElement.classList.add('js');</script>
</head>
<body>

<a class="skip-link" href="#main">К содержанию</a>

<nav class="topnav">
  <div class="wrap">
    <div class="nav-row">
      <a class="brand" href="index.html">
        <span class="brand-mark">Г</span>
        <span class="brand-text">Голосование без выбора</span>
      </a>
      <nav class="page-toggle" id="pageToggle" aria-label="Разделы сайта">
        <a href="index.html" class="is-current" aria-current="page">
          <span class="lbl-full">Голосования</span>
          <span class="lbl-short">Дума</span>
        </a>
        <a href="vybory.html">
          <span class="lbl-full">Математика выборов</span>
          <span class="lbl-short">Выборы</span>
        </a>
        <a href="tsenzura.html">
          <span class="lbl-full">Цифровые ограничения</span>
          <span class="lbl-short">Рунет</span>
        </a>
      </nav>
    </div>
  </div>
</nav>

<main id="main" data-page="dokumenty">
  <div class="dok-page">
    <header class="dok-header">
      <h1>Документы — первоисточники</h1>
      <p class="meta"><span id="dokTotalCount" class="num">…</span> файлов · скачано локально · указы, голосования, санкции, декларации, реестры</p>
    </header>

    <div class="dok-search">
      <input type="text" id="dokSearch" placeholder="Поиск по имени файла…   («/» для фокуса)" aria-label="Поиск по имени файла">
      <select id="dokExt" aria-label="Фильтр по типу файла">
        <option value="all">Все типы</option>
        <option value="pdf">PDF</option>
        <option value="html">HTML</option>
        <option value="xml">XML</option>
        <option value="json">JSON</option>
        <option value="csv">CSV</option>
        <option value="md">Markdown</option>
        <option value="docx">DOCX</option>
        <option value="xlsx">XLSX</option>
      </select>
    </div>

    <div class="dok-layout">
      <aside class="dok-tree" id="dokTree" aria-label="Дерево документов">
        <div class="dok-loading">Загружаю дерево…</div>
      </aside>
      <section class="dok-preview">
        <header class="dok-preview-head" id="dokPreviewHead">
          <div class="dok-breadcrumb">Выберите файл слева</div>
        </header>
        <div class="dok-preview-body" id="dokPreviewBody">
          <div class="dok-empty"><div class="ico">📁</div><p>Выберите файл в дереве слева — содержимое отобразится здесь.</p></div>
        </div>
      </section>
    </div>
  </div>
</main>

<script src="assets/js/lib/dokumenty-tree.js"></script>
<script src="assets/js/lib/dokumenty-renderers.js"></script>
<script src="assets/js/lib/dokumenty-preview.js"></script>
<script src="assets/js/pages/dokumenty.js"></script>

</body>
</html>
```

- [ ] **Step 2: Smoke-test**

```bash
cd ./
python3 -m http.server 8765 > /tmp/httpserver.log 2>&1 &
SERVER_PID=$!
sleep 1
curl -sI http://localhost:8765/dokumenty.html | head -1
curl -sI http://localhost:8765/assets/js/data/dokumenty-tree.json | head -1
curl -s http://localhost:8765/dokumenty.html | grep -c '<section\|<aside\|<main'
kill $SERVER_PID
```

Expected: 200 OK, 200 OK для tree-JSON, ≥3 для section/aside/main markup.

- [ ] **Step 3: Manual browser test**

Запустить `python3 -m http.server 8765` и открыть `http://localhost:8765/dokumenty.html`:
1. Дерево должно загрузиться (23 поддиректории).
2. Кликнуть на файл `duma-api/votes/army-fakes.xml` — должен раскрыться XML в правой панели.
3. Кликнуть на `gov-uk/litvinenko-inquiry-report.pdf` — должен раскрыться PDF.
4. Кликнуть на `ofac-sanctions/sdn.csv` — должен раскрыться CSV-table.
5. Поиск «mobil» — должен отфильтровать дерево.
6. Filter dropdown «PDF» — должен показать только PDF.
7. Скачать или открыть в новой вкладке — обе кнопки работают.

(Если визуальный тест в этом контейнере недоступен — указать в commit message «manual browser test pending — only static smoke checked».)

- [ ] **Step 4: Commit**

```bash
cd ./
git add dokumenty.html
git commit -m "feat(dokumenty): add document explorer page with tree + preview pane"
```

---

### Task 8: Интеграция с index.html и cross-cutting.js

**Files:**
- Modify: `index.html`
- Modify: `assets/js/data/cross-cutting.js`

- [ ] **Step 1: Найти панель тизера документов на главной**

```bash
cd ./
grep -n -i 'dokumenty\|документов\|documenti' index.html | head -10
```

Если уже указан `href="dokumenty.html"` — Step 2 не нужен. Иначе — обновить на правильный URL.

- [ ] **Step 2: cross-cutting.js**

```bash
grep -n 'dokumenty\|href' assets/js/data/cross-cutting.js | head
```

Если есть карточка с `slug: 'dokumenty'` или аналогом — обновить `href: 'dokumenty.html'`.

- [ ] **Step 3: Smoke-test ссылок**

```bash
cd ./
python3 -m http.server 8765 > /tmp/httpserver.log 2>&1 &
SERVER_PID=$!
sleep 1
echo -n "/: "
curl -sI "http://localhost:8765/" | head -1
echo -n "/dokumenty.html: "
curl -sI "http://localhost:8765/dokumenty.html" | head -1
# Найти ссылки на dokumenty.html в index.html и vybory/tsenzura
curl -s "http://localhost:8765/" | grep -oE 'href="dokumenty\.html"' | wc -l
kill $SERVER_PID
```

Expected: ≥1 ссылка на dokumenty.html с главной.

- [ ] **Step 4: Commit (если были изменения)**

```bash
cd ./
if git diff --quiet HEAD; then
  git commit --allow-empty -m "polish(dokumenty): cross-link verification — explorer reachable from main"
else
  git add -u
  git commit -m "polish(dokumenty): wire main page to dokumenty.html"
fi
```

---

### Task 9: README + spec checklist update

**Files:**
- Modify: `README.md`
- Modify: `docs/superpowers/specs/2026-05-05-compromat-pages-design.md`

- [ ] **Step 1: README**

В секции `## План развития (Roadmap)` заменить блок Phase 5:

ИЗ:
```
**Фаза 5 (планируется):** Эксплорер документов
- Страница `/dokumenty.html` с поиском, фильтрацией и кластеризацией
- Загрузка PDF/DOCX, парсинг, OCR для скана
```

В:
```
**Фаза 5 (завершена, май 2026):** Эксплорер документов
- Страница `/dokumenty.html` с tree-explorer (233 файла / 190 МБ из `research/compromat/05-evidence/`)
- In-browser preview: PDF, HTML, JSON, XML, CSV, MD, DOCX (mammoth.js), XLSX (SheetJS)
- Поиск по имени, фильтр по типу, URL-state для шаринга
- План: `docs/superpowers/plans/2026-05-05-compromat-phase-5-dokumenty-explorer.md`
- OCR для PDF-сканов отложена в следующий цикл (текущий PDF-preview — нативный браузерный embed)
```

- [ ] **Step 2: Spec**

В файле `docs/superpowers/specs/2026-05-05-compromat-pages-design.md` в секции `## 14. Поэтапная реализация`:

ИЗ:
```
**Фаза 5.** Документ-эксплорер `/dokumenty.html` (требует SheetJS/mammoth и генератор JSON-дерева).
```

В:
```
**Фаза 5 (✅ завершена 2026-05-05).** Документ-эксплорер `/dokumenty.html` с tree-view, in-browser preview (PDF, HTML, JSON, XML, CSV, MD, DOCX через mammoth.js, XLSX через SheetJS) и поиск/фильтр. См. план `docs/superpowers/plans/2026-05-05-compromat-phase-5-dokumenty-explorer.md`.
```

- [ ] **Step 3: Commit**

```bash
cd ./
git add README.md docs/superpowers/specs/2026-05-05-compromat-pages-design.md
git commit -m "docs: mark phase 5 (dokumenty explorer) as complete"
```

---

## Self-Review

**1. Spec coverage:**

| Спека (§2 + §6) | План |
|---|---|
| §2 sitemap `dokumenty.html` | Tasks 7, 8 ✅ |
| §6.1 Слой данных (JSON-tree) | Task 1 (build script) ✅ |
| §6.2 UI (tree + preview-pane) | Tasks 2, 3, 7 ✅ |
| §6.3 Источник файла для preview | Tasks 4, 5 (renderers + router) ✅ |
| §6.4 Производительность (lazy CDN) | Task 4 (mammoth.js + xlsx.js lazy-load) ✅ |
| Поиск по имени | Task 3 (filterDokumentyTree) + Task 6 (input wiring) ✅ |
| Фильтр по типу | Task 3 + Task 6 ✅ |

**Не покрыто Phase 5:**
- OCR для PDF-сканов — отложено (текущий PDF preview — нативный embed, без OCR; для скана будет нужна Tesseract.js, ~3 МБ, что значимо для load-time)
- Кластеризация по тегам/тематикам — отложено (плоский tree из 23 поддиректорий уже даёт навигацию)

**2. Placeholder scan:**
- Нет «TBD/TODO/implement later» — все шаги имеют конкретный код.
- CSS, JS, HTML — полностью inline в плане.

**3. Type consistency:**
- `window.renderDokumentyTree(rootEl, treeData, onSelect)` — Task 3
- `window.filterDokumentyTree(rootEl, term, extFilter)` — Task 3
- `window.renderDokumentyPreview(headEl, bodyEl, pathArr, fileNode, baseUrl)` — Task 5
- `window.dokumentyRenderers[ext]` — Task 4
- `window.initDokumenty()` — Task 6
- `data-page="dokumenty"` атрибут — Task 7
- `id="dokTree"`, `id="dokPreviewHead"`, `id="dokPreviewBody"`, `id="dokSearch"`, `id="dokExt"`, `id="dokTotalCount"` — все используются consistent в Task 6 и 7.

**4. Out of scope:**
- OCR — отложено
- Тематическая кластеризация — отложено
- Генерация preview-thumbnails (для grid-view) — отложено; используем иконки по расширению
- Mobile-optimized layout — есть базовый media query, но full mobile UX отложена

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-05-compromat-phase-5-dokumenty-explorer.md`. Two execution options:

**1. Subagent-Driven (recommended)** — диспатчу свежего сабагента на каждую задачу, ревью между, быстрая итерация. Tasks 1, 2, 8, 9 — Sonnet 4.6 (mechanical); Tasks 3-6 — Opus 4.7 (нетривиальная JS-архитектура с lazy-load, error handling, URL state); Task 7 — Sonnet (HTML scaffolding).

**2. Inline Execution** — выполняю задачи в этой сессии через executing-plans, batch с чекпоинтами.

Which approach?
