// EN translation of assets/js/charts/freedom-on-net.js
// Sync source: assets/js/charts/freedom-on-net.js
// Glossary: research/i18n_glossary_draft.md

// Freedom on the Net — RU trajectory + leaderboard.
window.renderFreedomOnNet = function () {
  // Line chart: RU score 2021–2025
  const el = document.getElementById('fonCanvas');
  if (el && typeof Chart !== 'undefined' && typeof FON_RUSSIA !== 'undefined') {
    new Chart(el, {
      type: 'line',
      data: {
        labels: FON_RUSSIA.map(d => d.year),
        datasets: [{
          label: 'Russia (Freedom on the Net)',
          data: FON_RUSSIA.map(d => d.score),
          borderColor: '#B91C1C',
          backgroundColor: 'rgba(185,28,28,0.08)',
          fill: true,
          tension: 0.28,
          pointRadius: 6,
          pointHoverRadius: 9,
          pointBackgroundColor: '#B91C1C',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 100,
            ticks: { color: '#6B6760', font: { family: 'JetBrains Mono', size: 12 }, stepSize: 20 },
            grid: { color: 'rgba(0,0,0,0.06)' },
            title: { display: true, text: 'Internet freedom score (0–100, higher = freer)', color: '#6B6760', font: { size: 11 } },
          },
          x: {
            ticks: { color: '#6B6760', font: { family: 'JetBrains Mono', size: 12, weight: 600 } },
            grid: { display: false },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1A1815', padding: 12,
            titleFont: { family: 'Manrope', size: 13, weight: '700' },
            bodyFont: { family: 'Manrope', size: 12 },
            callbacks: {
              label: (ctx) => `Russia: ${ctx.parsed.y}/100`,
              afterLabel: (ctx) => ctx.dataIndex === 4 ? 'new low; status: Not Free' : '',
            }
          }
        }
      }
    });
  }

  // Leaderboard
  const lb = $('#fonLeaderboard');
  if (lb && typeof FON_LEADERBOARD !== 'undefined') {
    lb.innerHTML = `
      <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 6px;">Russia's neighbours in the 2025 index</div>
      ${FON_LEADERBOARD.map(c => `
        <div class="fon-row ${c.tier} ${c.highlight ? 'ru' : ''}">
          <span>${c.country}</span>
          <span class="fon-mini"><span class="fon-mini-fill" style="width: ${c.score}%"></span></span>
          <span class="fon-num">${c.score}</span>
        </div>
      `).join('')}
    `;
  }
};
