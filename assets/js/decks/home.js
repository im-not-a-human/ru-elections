// Slide deck for index.html (Голосование без выбора).
// Section IDs match between RU (index.html) and EN (en/index.html), so the
// same deck file is loaded by both. Titles auto-derive from each section's
// H2 (lib/presentation.js), so no language-specific strings live here.
//
// Engine: assets/js/lib/presentation.js
window.PresentSlides = [
  { id: 'hero',       sources: ['.hero'],              layout: 'cover' },
  { id: 'parties',    sources: ['#parties-extended'] },
  { id: 'matrix',     sources: ['#matrix'] },
  { id: 'sujety',     sources: ['#cross-cutting'] },
  { id: 'docs',       sources: ['#docs-panel'] },
  { id: 'paradox',    sources: ['#paradox'] },
  { id: 'timeline',   sources: ['#timeline'] },
  { id: 'years',      sources: ['#chart-section'] },
  { id: 'conclusion', sources: ['#conclusion'] },
];
