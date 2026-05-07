// EN translation of assets/js/pages/tsenzura.js
// Sync source: assets/js/pages/tsenzura.js
// Glossary: research/i18n_glossary_draft.md

// Init for tsenzura.html — wires up all charts & widgets for the digital
// restrictions page. Exposed as window.initTsenzura so the SPA-router can
// call it after replacing <main> with the tsenzura page content.
window.initTsenzura = function initTsenzura() {
  if (typeof applyChartDefaults === 'function') applyChartDefaults();

  // Hero numbers
  if (typeof renderDigitalNumbers === 'function') renderDigitalNumbers();

  // Sections
  if (typeof renderDigitalTimeline === 'function') renderDigitalTimeline();
  if (typeof renderContradictionMatrix === 'function') renderContradictionMatrix();
  if (typeof renderThreatMatrix === 'function') renderThreatMatrix();
  if (typeof renderSelectivityCards === 'function') renderSelectivityCards();
  if (typeof renderDigitalSources === 'function') renderDigitalSources();

  // Charts
  if (typeof renderVpnGrowth === 'function') renderVpnGrowth();
  if (typeof renderWhitelistGrowth === 'function') renderWhitelistGrowth();
  if (typeof renderMessengerComparison === 'function') renderMessengerComparison();
  if (typeof renderYoutubeThrottling === 'function') renderYoutubeThrottling();
  if (typeof renderFraudVsLaws === 'function') renderFraudVsLaws();
  if (typeof renderDroneAttacks === 'function') renderDroneAttacks();
  if (typeof renderItCrime === 'function') renderItCrime();
  if (typeof renderChildSuicide === 'function') renderChildSuicide();
  if (typeof renderFreedomOnNet === 'function') renderFreedomOnNet();
  if (typeof renderRegulationCompare === 'function') renderRegulationCompare();

  // Interactive
  if (typeof wireShutdownCalc === 'function') wireShutdownCalc();
  if (typeof wireContradictionFilters === 'function') wireContradictionFilters();
};

// First load — fire on DOMContentLoaded only if we're on the tsenzura
// page (data-page="tsenzura"). The SPA router will call initTsenzura()
// directly when navigating to this page.
function tryAutoInitTsenzura() {
  const main = document.getElementById('main');
  if (main && main.dataset.page === 'tsenzura') window.initTsenzura();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', tryAutoInitTsenzura);
} else {
  tryAutoInitTsenzura();
}
