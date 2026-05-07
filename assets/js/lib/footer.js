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
            '<h4>Об этом отчёте</h4>' +
            '<p>Аналитический отчёт о российской партийной системе на основе публичных первоисточников: api.duma.gov.ru, sozd.duma.gov.ru, ЦИК, kremlin.ru, OFAC, UK Sanctions, declarator.org.</p>' +
            '<p style="margin-top:10px">Лицензия: CC BY 4.0. Можно копировать, изменять, переиспользовать со ссылкой на источник.</p>' +
          '</div>' +
          '<div>' +
            '<h4>Разделы сайта</h4>' +
            '<a href="' + prefix + 'index.html">Голосования Думы</a>' +
            '<a href="' + prefix + 'vybory.html">Математика выборов</a>' +
            '<a href="' + prefix + 'tsenzura.html">Цифровые ограничения</a>' +
            '<a href="' + prefix + 'dokumenty.html">Документы — 233 первоисточника</a>' +
          '</div>' +
          '<div>' +
            '<h4>Первоисточники</h4>' +
            '<a href="https://sozd.duma.gov.ru" target="_blank" rel="noopener">СОЗД ГД РФ ↗</a>' +
            '<a href="https://vote.duma.gov.ru" target="_blank" rel="noopener">Голосования ГД ↗</a>' +
            '<a href="https://www.cikrf.ru" target="_blank" rel="noopener">ЦИК России ↗</a>' +
            '<a href="http://www.kremlin.ru" target="_blank" rel="noopener">kremlin.ru — указы Президента ↗</a>' +
            '<a href="https://minjust.gov.ru/ru/pages/politicheskie-partii/" target="_blank" rel="noopener">Минюст — реестр партий ↗</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<div>© 2026 · Голосование без выбора</div>' +
          '<div class="mono">v1.4 · обновлено ' + (new Date()).toISOString().slice(0, 10) + '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';

  // Insert before closing body so it always sits below the main content.
  document.body.insertAdjacentHTML('beforeend', html);
  window._dokFooterInjected = true;
})();
