// EN translation of assets/js/lib/footer.js
// Sync source: assets/js/lib/footer.js
// See research/i18n_glossary_draft.md and research/i18n_locked_decisions.md

// Site-wide footer injection for sub-pages (partii/*, sujety/*, dokumenty.html).
// index.html, vybory.html, tsenzura.html have their own page-specific footer
// inline (with topic-relevant link columns); skip on those.
(function() {
  if (window._dokFooterInjected) return;

  // Skip if a footer already exists in the document (e.g. inline on root pages).
  if (document.querySelector('footer')) return;

  // Detect whether we're in a sub-directory (partii/, sujety/) for relative paths.
  var inSub = /\/(partii|sujety)\//.test(window.location.pathname);
  var prefix = inSub ? '../' : '';

  var html =
    '<footer id="site-footer">' +
      '<div class="wrap">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<h4>About this report</h4>' +
            '<p>An analytical report on the Russian party system based on public primary sources: api.duma.gov.ru, sozd.duma.gov.ru, CEC, kremlin.ru, OFAC, UK Sanctions, declarator.org.</p>' +
            '<p style="margin-top:10px">Licence: CC BY 4.0. May be copied, modified, and reused with attribution.</p>' +
          '</div>' +
          '<div>' +
            '<h4>Site sections</h4>' +
            '<a href="' + prefix + 'index.html">Duma voting records</a>' +
            '<a href="' + prefix + 'vybory.html">Electoral maths</a>' +
            '<a href="' + prefix + 'tsenzura.html">Digital restrictions</a>' +
            '<a href="' + prefix + 'dokumenty.html">Documents — 233 primary sources</a>' +
          '</div>' +
          '<div>' +
            '<h4>Primary sources</h4>' +
            '<a href="https://sozd.duma.gov.ru" target="_blank" rel="noopener">СОЗД ГД РФ ↗</a>' +
            '<a href="https://vote.duma.gov.ru" target="_blank" rel="noopener">Duma voting records ↗</a>' +
            '<a href="https://www.cikrf.ru" target="_blank" rel="noopener">CEC of Russia ↗</a>' +
            '<a href="http://www.kremlin.ru" target="_blank" rel="noopener">kremlin.ru — Presidential decrees ↗</a>' +
            '<a href="https://minjust.gov.ru/ru/pages/politicheskie-partii/" target="_blank" rel="noopener">Ministry of Justice — party register ↗</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<div>© 2026 · Voting Without a Choice</div>' +
          '<div class="mono">v1.4 · updated ' + (new Date()).toISOString().slice(0, 10) + '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';

  // Insert before closing body so it always sits below the main content.
  document.body.insertAdjacentHTML('beforeend', html);
  window._dokFooterInjected = true;
})();
