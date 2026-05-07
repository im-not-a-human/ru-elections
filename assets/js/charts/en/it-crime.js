// EN translation of assets/js/charts/it-crime.js
// Sync source: assets/js/charts/it-crime.js
// Glossary: research/i18n_glossary_draft.md

// IT crimes total — MVD RF.
window.renderItCrime = function () {
  const el = document.getElementById('itCrimeCanvas');
  if (!el || typeof Chart === 'undefined' || typeof IT_CRIME_MVD === 'undefined') return;

  new Chart(el, {
    type: 'line',
    data: {
      labels: IT_CRIME_MVD.map(d => d.year),
      datasets: [{
        label: 'IT crimes, K',
        data: IT_CRIME_MVD.map(d => d.value),
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
          beginAtZero: true,
          ticks: {
            color: '#6B6760',
            font: { family: 'JetBrains Mono', size: 12 },
            callback: v => v + 'K',
          },
          grid: { color: 'rgba(0,0,0,0.06)' },
        },
        x: {
          ticks: { color: '#6B6760', font: { family: 'JetBrains Mono', size: 14, weight: 600 } },
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
            label: (ctx) => `${ctx.parsed.y.toLocaleString('en-GB')}K crimes`,
            afterLabel: (ctx) => ctx.dataIndex === 2 ? 'record: 40% of all crime in Russia' : '',
          }
        }
      }
    }
  });
};
