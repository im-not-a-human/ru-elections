// Init for /sujety/<slug>.html pages.
// Auto-runs on DOMContentLoaded if main has data-page="sujet".
window.initSujet = function initSujet() {
  // Wire sources-fold click handlers
  if (typeof wireSourcesFold === 'function') wireSourcesFold();

  // Init scroll-spy for sticky TOC (if .party-toc has links + sections present)
  if (typeof initScrollSpy === 'function' && document.querySelector('.party-toc a[data-target]')) {
    initScrollSpy({
      tocSelector: '.party-toc a[data-target]',
      sectionSelector: 'section[data-toc-id]',
      progressBarSelector: '.party-toc-progress-fill'
    });
  }

  // Hook for per-page render hooks (declared in HTML inline scripts)
  if (typeof window.renderSujetContent === 'function') window.renderSujetContent();
};

function tryAutoInitSujet() {
  const main = document.getElementById('main');
  if (main && main.dataset.page === 'sujet') window.initSujet();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', tryAutoInitSujet);
} else {
  tryAutoInitSujet();
}
