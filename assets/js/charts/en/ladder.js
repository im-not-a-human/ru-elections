// EN translation of assets/js/charts/ladder.js
// Sync source: assets/js/charts/ladder.js
// Glossary: research/i18n_glossary_draft.md

// 'Majority Ladder' — horizontal scale 0–450 with markers at 226/300/338
// and highlighting of the current position (324 for UR).
window.renderLadder = function (selector, currentSeats, label) {
  const el = $(selector);
  if (!el) return;
  el.classList.add('ladder');
  const max = 450;
  const pct = (n) => (n / max) * 100;
  const thresholds = window.MAJORITY_THRESHOLDS || [
    { seats: 226, label: 'Simple majority' },
    { seats: 300, label: 'Constitutional (⅔)' },
    { seats: 338, label: 'Super-majority (¾)' },
  ];

  el.innerHTML = `
    <div class="ladder-track">
      <div class="ladder-fill" style="width: ${pct(currentSeats)}%"></div>
      ${thresholds.map(t => `
        <div class="ladder-mark" style="left: ${pct(t.seats)}%">
          <div class="ladder-mark-num">${t.seats}</div>
          <div class="ladder-mark-label">${t.label}</div>
        </div>
      `).join('')}
      <div class="ladder-current" style="left: ${pct(currentSeats)}%">
        <div class="ladder-current-num">${currentSeats}</div>
        <div class="ladder-current-label">${label || 'UR current'}</div>
      </div>
    </div>
    <div class="ladder-scale">
      <span>0</span>
      <span>${max}</span>
    </div>
  `;
};

// Counterfactuals: 4 systems, showing how the same 49.82% translates differently.
window.renderCounterfactuals = function (selector, scenarios) {
  const el = $(selector);
  if (!el) return;
  const max = 450;
  el.innerHTML = scenarios.map(s => `
    <div class="cf-row ${s.isReal ? 'is-real' : ''}">
      <div class="cf-label">${s.name}</div>
      <div class="cf-bar-wrap">
        <div class="cf-bar" style="width: ${(s.seats / max) * 100}%; background: ${s.isReal ? 'var(--accent)' : 'var(--ink-muted)'}">
          <span>${s.seats} seats · ${s.pct}%</span>
        </div>
      </div>
      <div class="cf-note">${s.note}</div>
    </div>
  `).join('');
};

// History of electoral-system changes — timeline table
window.renderHistory = function (selector, items) {
  const el = $(selector);
  if (!el) return;
  el.innerHTML = items.map(it => `
    <div class="history-row">
      <div class="history-year mono">${it.year}</div>
      <div class="history-fz mono">${it.fz}</div>
      <div class="history-what">${it.what}</div>
      <div class="history-effect">${it.effect}</div>
    </div>
  `).join('');
};

// Quotes — card carousel (simple grid with typographic emphasis)
window.renderQuotes = function (selector, quotes) {
  const el = $(selector);
  if (!el) return;
  el.innerHTML = quotes.map(q => `
    <figure class="quote-card">
      <blockquote class="quote-text">${q.textTranslation || q.text}</blockquote>
      ${q.textTranslation ? `<div class="quote-original">«${q.text}»</div>` : ''}
      <figcaption class="quote-meta">
        <div class="quote-author">${q.author}</div>
        <div class="quote-role">${q.role}</div>
        <div class="quote-context mono">${q.contextTranslation || q.context}${q.contextTranslation && q.context ? ` · <span class="quote-context-orig">${q.context}</span>` : ''}</div>
      </figcaption>
    </figure>
  `).join('');
};
