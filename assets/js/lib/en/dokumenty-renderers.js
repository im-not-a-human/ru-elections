// EN translation of assets/js/lib/dokumenty-renderers.js
// Sync source: assets/js/lib/dokumenty-renderers.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

// Renderers for various file types. Exports window.dokumentyRenderers as a registry.
// Each renderer signature: (bodyEl, url, fileName) -> void or Promise.
// Renderer is responsible for clearing bodyEl and writing its preview.

(function() {
  // Lazy-load CDN libs (cached promises)
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

  function escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Sniff charset from first ~2KB and decode the buffer accordingly.
  // Handles windows-1251 / cp866 / koi8-r files saved without proper Content-Type.
  function decodeHtml(arrayBuffer) {
    var head = new TextDecoder('latin1').decode(arrayBuffer.slice(0, 2048));
    var match = head.match(/charset\s*=\s*["']?([\w-]+)/i);
    var charset = match ? match[1].toLowerCase() : 'utf-8';

    var aliasMap = {
      'cp1251': 'windows-1251',
      'windows1251': 'windows-1251',
      'cp866': 'ibm866',
      'koi8-r': 'koi8-r',
      'koi8r': 'koi8-r'
    };
    charset = aliasMap[charset] || charset;

    try {
      return new TextDecoder(charset, { fatal: false }).decode(arrayBuffer);
    } catch (e) {
      return new TextDecoder('utf-8', { fatal: false }).decode(arrayBuffer);
    }
  }

  // PDF — embed (browser-native)
  function renderPdf(bodyEl, url) {
    bodyEl.innerHTML = '<embed src="' + encodeURI(url) + '" type="application/pdf">';
  }

  // HTML — fetch as ArrayBuffer, decode (cp1251 etc), strip externals,
  // render inside a fully-isolated sandboxed iframe via srcdoc.
  function renderHtml(bodyEl, url) {
    return fetch(url).then(function(r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.arrayBuffer();
    }).then(function(buf) {
      var text = decodeHtml(buf);
      var doc;
      try {
        doc = new DOMParser().parseFromString(text, 'text/html');
      } catch (e) {
        bodyEl.innerHTML = '<pre>' + escHtml(text) + '</pre>';
        return;
      }

      // Strip external resources to avoid 404 noise + sandbox script blocks
      doc.querySelectorAll('link[rel="stylesheet"]').forEach(function(el) {
        var href = el.getAttribute('href') || '';
        if (href && href.indexOf('data:') !== 0) el.remove();
      });
      doc.querySelectorAll('script[src]').forEach(function(el) {
        var src = el.getAttribute('src') || '';
        if (src && src.indexOf('data:') !== 0) el.remove();
      });
      doc.querySelectorAll('script:not([src])').forEach(function(el) {
        // Inline scripts also: drop them (sandbox would block anyway, but reduces console noise)
        el.remove();
      });
      doc.querySelectorAll('img[src]').forEach(function(el) {
        var src = el.getAttribute('src') || '';
        if (src && src.indexOf('data:') !== 0 && src.charAt(0) !== '/') {
          el.removeAttribute('src');
          el.setAttribute('alt', '[image: ' + (el.getAttribute('alt') || src) + ']');
        }
      });
      doc.querySelectorAll('iframe[src]').forEach(function(el) { el.remove(); });

      // Inject base styles for readability inside the iframe
      var style = doc.createElement('style');
      style.textContent =
        'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; ' +
          'max-width: 900px; margin: 0 auto; padding: 24px; line-height: 1.6; color: #222; background: #fff; } ' +
        'table { border-collapse: collapse; margin: 12px 0; } ' +
        'th, td { border: 1px solid #d4d4d4; padding: 6px 10px; vertical-align: top; } ' +
        'th { background: #f0f0f0; } ' +
        'pre { background: #f5f5f5; padding: 10px; overflow-x: auto; } ' +
        'code { background: #f5f5f5; padding: 1px 6px; border-radius: 3px; } ' +
        'h1, h2, h3 { line-height: 1.25; }';
      if (doc.head) {
        doc.head.appendChild(style);
      } else {
        // pathological — no <head>; inject one
        var head = doc.createElement('head');
        head.appendChild(style);
        doc.documentElement.insertBefore(head, doc.documentElement.firstChild);
      }

      // Ensure UTF-8 meta in iframe so srcdoc renders cleanly
      var meta = doc.createElement('meta');
      meta.setAttribute('charset', 'utf-8');
      if (doc.head && doc.head.firstChild) {
        doc.head.insertBefore(meta, doc.head.firstChild);
      }

      var html = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
      var iframe = document.createElement('iframe');
      iframe.style.cssText = 'width: 100%; height: 100%; border: 0;';
      iframe.setAttribute('sandbox', 'allow-same-origin');
      iframe.srcdoc = html;
      bodyEl.innerHTML = '';
      bodyEl.appendChild(iframe);
    });
  }

  // Plain text — fetch + <pre>
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

  // JSON — parsed + pretty-printed
  function renderJson(bodyEl, url) {
    return fetch(url).then(function(r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    }).then(function(text) {
      try {
        var parsed = JSON.parse(text);
        var pre = document.createElement('pre');
        pre.textContent = JSON.stringify(parsed, null, 2);
        bodyEl.innerHTML = '';
        bodyEl.appendChild(pre);
      } catch (e) {
        // Fallback: show raw text
        var pre = document.createElement('pre');
        pre.textContent = text;
        bodyEl.innerHTML = '';
        bodyEl.appendChild(pre);
      }
    });
  }

  // XML — fetch + <pre>
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

  // RFC-4180 CSV parser — handles quoted fields, embedded commas/newlines, doubled quotes
  function parseCsv(text, maxRows) {
    var rows = [];
    var row = [];
    var field = '';
    var inQuotes = false;
    var i = 0, len = text.length;
    while (i < len) {
      var ch = text.charCodeAt(i);
      // 34 = " ; 44 = , ; 10 = \n ; 13 = \r
      if (inQuotes) {
        if (ch === 34) {
          if (i + 1 < len && text.charCodeAt(i + 1) === 34) {
            field += '"'; i += 2; continue;
          }
          inQuotes = false; i++; continue;
        }
        field += text[i]; i++; continue;
      }
      if (ch === 34) { inQuotes = true; i++; continue; }
      if (ch === 44) { row.push(field); field = ''; i++; continue; }
      if (ch === 13 || ch === 10) {
        row.push(field); field = '';
        if (row.length > 1 || row[0] !== '') rows.push(row);
        row = [];
        if (ch === 13 && i + 1 < len && text.charCodeAt(i + 1) === 10) i++;
        i++;
        if (maxRows && rows.length >= maxRows) return rows;
        continue;
      }
      field += text[i]; i++;
    }
    if (field !== '' || row.length > 0) {
      row.push(field);
      if (row.length > 1 || row[0] !== '') rows.push(row);
    }
    return rows;
  }

  // CSV — first 1000 rows max as a <table>, wrapped in scroll container
  function renderCsv(bodyEl, url) {
    return fetch(url).then(function(r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    }).then(function(text) {
      var maxRows = 1001;  // 1 header + 1000 data
      var rows = parseCsv(text, maxRows + 1);  // +1 to detect truncation
      if (rows.length === 0) {
        bodyEl.innerHTML = '<div class="dok-empty"><p>Empty CSV file.</p></div>';
        return;
      }
      var truncated = rows.length > maxRows;
      var displayRows = Math.min(rows.length, maxRows);
      var html = '<div class="dok-table-wrap"><table class="dok-csv-table">';
      var headers = rows[0];
      html += '<thead><tr>';
      headers.forEach(function(h) { html += '<th>' + escHtml(h) + '</th>'; });
      html += '</tr></thead><tbody>';
      for (var i = 1; i < displayRows; i++) {
        var cells = rows[i];
        html += '<tr>';
        cells.forEach(function(c) { html += '<td>' + escHtml(c) + '</td>'; });
        html += '</tr>';
      }
      html += '</tbody></table>';
      if (truncated) {
        html += '<p style="padding:12px;color:var(--ink-muted)">Showing first ' + (displayRows - 1) + ' rows (file is larger — preview truncated).</p>';
      }
      html += '</div>';
      bodyEl.innerHTML = html;
    });
  }

  // Markdown renderer — full GFM via marked.js (tables, strikethrough, task-lists)
  function renderMd(bodyEl, url) {
    bodyEl.innerHTML = '<div class="dok-loading">Loading marked.js…</div>';
    return loadLib('https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.2/marked.min.js')
      .then(function() { return fetch(url); })
      .then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function(text) {
        // marked v12 has GFM enabled by default (tables, strikethrough, task-lists)
        var html = window.marked.parse(text, { breaks: false, gfm: true });
        var div = document.createElement('div');
        div.className = 'dok-md';
        div.innerHTML = html;
        // Make `code` spans that match an evidence file path clickable — opens in tab
        wrapPathLinks(div);
        bodyEl.innerHTML = '';
        bodyEl.appendChild(div);
      });
  }

  // Walks <code> elements (excluding code blocks inside <pre>); if textContent
  // matches a known evidence-relative path (window._dokValidPaths), wraps the
  // <code> in <a class="dok-md-pathlink" data-dok-open="<path>">. The page-init
  // intercepts these clicks via delegation on .dok-preview-body.
  function wrapPathLinks(rootEl) {
    var validPaths = window._dokValidPaths;
    if (!validPaths || typeof validPaths.has !== 'function') return;
    var codes = rootEl.querySelectorAll('code');
    codes.forEach(function(code) {
      // Skip <pre><code> blocks
      if (code.parentElement && code.parentElement.tagName === 'PRE') return;
      var text = code.textContent;
      if (!text) return;
      // Trim trailing punctuation that often sits next to inline code in tables
      var clean = text.trim();
      if (!validPaths.has(clean)) return;
      // Already wrapped?
      if (code.parentElement && code.parentElement.classList.contains('dok-md-pathlink')) return;
      var a = document.createElement('a');
      a.className = 'dok-md-pathlink';
      a.href = '?paths=05-evidence/' + encodeURI(clean) + '&active=05-evidence/' + encodeURI(clean);
      a.dataset.dokOpen = clean;
      a.title = 'Open ‘' + clean + '’ in a tab';
      code.parentNode.insertBefore(a, code);
      a.appendChild(code);
    });
  }

  // Image — direct <img>
  function renderImage(bodyEl, url) {
    bodyEl.innerHTML = '<div style="padding:24px;text-align:center"><img src="' + encodeURI(url) + '" style="max-width:100%;max-height:80vh"></div>';
  }

  // DOCX via mammoth.js (lazy-loaded from CDN)
  function renderDocx(bodyEl, url) {
    bodyEl.innerHTML = '<div class="dok-loading">Loading mammoth.js…</div>';
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

  // XLSX/XLS/ODS via SheetJS (lazy-loaded). Tables wrapped for horizontal scroll.
  function renderSpreadsheet(bodyEl, url) {
    bodyEl.innerHTML = '<div class="dok-loading">Loading SheetJS…</div>';
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
        // Wrap each sheet's table in dok-table-wrap so it scrolls independently
        sheets.forEach(function(name, i) {
          var ws = workbook.Sheets[name];
          var tableHtml = window.XLSX.utils.sheet_to_html(ws);
          // Inject our class + sheet name on the <table>
          tableHtml = tableHtml.replace(/<table[^>]*>/, '<table class="dok-xlsx-sheet" data-sheet="' + escHtml(name) + '">');
          html += '<div class="dok-table-wrap" data-sheet-wrap="' + escHtml(name) + '"' +
                  (i === 0 ? '' : ' style="display:none"') + '>' + tableHtml + '</div>';
        });
        bodyEl.innerHTML = html;

        // Wire tab switches (toggle visibility on the WRAP, not the table)
        bodyEl.querySelectorAll('.dok-xlsx-tabs button').forEach(function(btn) {
          btn.addEventListener('click', function() {
            bodyEl.querySelectorAll('.dok-xlsx-tabs button').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var name = btn.dataset.sheet;
            bodyEl.querySelectorAll('.dok-table-wrap[data-sheet-wrap]').forEach(function(t) {
              t.style.display = t.dataset.sheetWrap === name ? '' : 'none';
            });
          });
        });
      });
  }

  function renderUnknown(bodyEl, url, name) {
    bodyEl.innerHTML = '<div class="dok-empty"><div class="ico">📎</div><p>This file type is not supported for preview.</p><p><a href="' + encodeURI(url) + '" download>Download ‘' + escHtml(name || '') + '’</a></p></div>';
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
    gif: renderImage,
    unknown: renderUnknown
  };
})();
