// D-section: small context stat-card.
// API: window.renderTrusteeContext(rootEl, data)
// data = { headline: '1 из ≈500', sub: '...', source: {label, url} }

(function() {
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  window.renderTrusteeContext = function(rootEl, data) {
    if (!rootEl || !data) return;
    var srcHtml = '';
    if (data.source && data.source.url) {
      srcHtml = '<div class="tc-source"><a href="' + escHtml(data.source.url) + '" target="_blank" rel="noopener">' + escHtml(data.source.label || 'источник') + ' ↗</a></div>';
    }
    rootEl.innerHTML =
      '<div class="trustee-context">' +
        '<div class="tc-headline">' + escHtml(data.headline || '') + '</div>' +
        '<div class="tc-sub">' + escHtml(data.sub || '') + '</div>' +
        srcHtml +
      '</div>';
  };
})();
