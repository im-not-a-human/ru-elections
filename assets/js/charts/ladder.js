// «Лестница большинств» — горизонтальная шкала 0–450 с отметками 226/300/338
// и подсветкой текущего положения (324 у ЕР).
window.renderLadder = function (selector, currentSeats, label) {
  const el = $(selector);
  if (!el) return;
  el.classList.add('ladder');
  const max = 450;
  const pct = (n) => (n / max) * 100;
  const thresholds = window.MAJORITY_THRESHOLDS || [
    { seats: 226, label: 'Простое большинство' },
    { seats: 300, label: 'Конституционное' },
    { seats: 338, label: 'Сверх (¾)' },
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
        <div class="ladder-current-label">${label || 'Сейчас у ЕР'}</div>
      </div>
    </div>
    <div class="ladder-scale">
      <span>0</span>
      <span>${max}</span>
    </div>
  `;
};

// Counterfactuals: 4 системы, как одни и те же 49,82% распределяются по-разному.
window.renderCounterfactuals = function (selector, scenarios) {
  const el = $(selector);
  if (!el) return;
  const max = 450;
  el.innerHTML = scenarios.map(s => `
    <div class="cf-row ${s.isReal ? 'is-real' : ''}">
      <div class="cf-label">${s.name}</div>
      <div class="cf-bar-wrap">
        <div class="cf-bar" style="width: ${(s.seats / max) * 100}%; background: ${s.isReal ? 'var(--accent)' : 'var(--ink-muted)'}">
          <span>${s.seats} мест · ${s.pct}%</span>
        </div>
      </div>
      <div class="cf-note">${s.note}</div>
    </div>
  `).join('');
};

// История изменений системы — таймлайн-таблица
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

// Цитаты — карточная карусель (просто грид с акцентом на типографике)
window.renderQuotes = function (selector, quotes) {
  const el = $(selector);
  if (!el) return;
  el.innerHTML = quotes.map(q => `
    <figure class="quote-card">
      <blockquote class="quote-text">${q.text}</blockquote>
      <figcaption class="quote-meta">
        <div class="quote-author">${q.author}</div>
        <div class="quote-role">${q.role}</div>
        <div class="quote-context mono">${q.context}</div>
      </figcaption>
    </figure>
  `).join('');
};
