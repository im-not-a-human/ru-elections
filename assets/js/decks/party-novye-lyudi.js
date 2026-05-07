// Slide deck for partii/novye-lyudi.html (Visual-first refactor pilot).
// Engine: assets/js/lib/presentation.js
//
// Each slide reuses an existing section by id; presentation.js relocates
// the node into the overlay on entry, restores on exit. CSS in
// presentation.css collapses two-pane sections to single-pane and hides
// <details>/sources-fold inside slides.
window.PresentSlides = [
  { id: 'hero',       sources: ['.party-hero'], layout: 'cover' },
  { id: 'origins',    sources: ['#origins'] },
  { id: 'financing',  sources: ['#financing'],   layout: 'wide' },
  { id: 'leaders',    sources: ['#leaders'] },
  { id: 'state-ties', sources: ['#state-ties'] },
  { id: 'voting',     sources: ['#voting'],      layout: 'wide' },
  { id: 'managed',    sources: ['#managed'] },
  { id: 'crisis',     sources: ['#crisis'] },
  { id: 'foreign',    sources: ['#foreign'] },
];
