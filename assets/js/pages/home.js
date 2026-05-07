// Init for index.html. Exposed as window.initHome so the SPA-router can
// call it after replacing <main> with the home page content.
window.initHome = function initHome() {
  if (typeof applyChartDefaults === 'function') applyChartDefaults();
  if (typeof renderHeroStats === 'function') renderHeroStats();
  if (typeof renderExtendedParties === 'function') renderExtendedParties();
  if (typeof renderCrossCuttingCards === 'function') renderCrossCuttingCards();
  if (typeof renderMatrix === 'function') renderMatrix();
  if (typeof renderPartyCards === 'function') renderPartyCards();
  if (typeof wirePartyHeaders === 'function') wirePartyHeaders();
  if (typeof renderComparisonBars === 'function') renderComparisonBars();
  if (typeof renderTimeline === 'function') renderTimeline();
  if (typeof renderYearsChart === 'function') renderYearsChart();
  if (typeof renderOppositionChart === 'function') renderOppositionChart();
  if (typeof wireFilters === 'function') wireFilters();
  if (typeof initScrollSpy === 'function') {
    initScrollSpy({
      tocSelector: '#mainTOC a[data-target]',
      sectionSelector: 'section[data-toc-id]',
      progressBarSelector: '#mainTOCProgress'
    });
  }
};

// First load — fire on DOMContentLoaded only if we're actually on the home
// page (data-page="home"). The SPA router will call initHome() directly
// when navigating to this page.
function tryAutoInit() {
  const main = document.getElementById('main');
  if (main && main.dataset.page === 'home') window.initHome();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', tryAutoInit);
} else {
  tryAutoInit();
}
