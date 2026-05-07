// EN translation of assets/js/lib/dom.js
// Sync source: assets/js/lib/dom.js
// Glossary: research/i18n_glossary_draft.md

// Tiny DOM helpers. Globals attached to window so other scripts can use them.
window.$ = (s, ctx = document) => ctx.querySelector(s);
window.$$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

window.VOTE_LABELS = {
  'za': 'FOR',
  'against': 'AGAINST',
  'abstain': 'ABS.',
  'partial-against': 'SPLIT',
  'didnt-vote': 'ABSENT*',
  'absent': 'N/A',
};

window.VOTE_FULL = {
  'za': 'Voted in favour (bloc)',
  'against': 'Voted against (bloc)',
  'abstain': 'Abstained (bloc)',
  'partial-against': 'Faction split — part voted against',
  'didnt-vote': 'Did not vote — tactical non-attendance',
  'absent': 'Party not yet in the Duma',
};

window.CAT_LABELS = { 'digital': 'Digital freedoms', 'civil': 'Civil liberties' };

window.PARTY_CODES = ['ER', 'KPRF', 'LDPR', 'SR', 'NL'];
