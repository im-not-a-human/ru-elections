// EN translation of assets/js/charts/child-suicide.js
// Sync source: assets/js/charts/child-suicide.js
// Glossary: research/i18n_glossary_draft.md

// Child suicide statistics — Investigative Committee of Russia, MVD.
window.renderChildSuicide = function () {
  const el = document.getElementById('suicideCanvas');
  if (!el || typeof Chart === 'undefined' || typeof CHILD_SUICIDE === 'undefined') return;

  new Chart(el, {
    type: 'bar',
    data: {
      labels: CHILD_SUICIDE.map(d => d.year),
      datasets: [{
        label: 'Completed cases',
        data: CHILD_SUICIDE.map(d => d.value),
        backgroundColor: CHILD_SUICIDE.map(d =>
          d.year === 2021 ? '#B91C1C' :
          d.year === 2024 ? '#B91C1C' :
          d.year >= 2022 ? '#D97706' :
          '#6B6760'
        ),
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#6B6760', font: { family: 'JetBrains Mono', size: 12 } },
          grid: { color: 'rgba(0,0,0,0.06)' },
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
            title: (items) => `${items[0].label}`,
            label: (ctx) => `${ctx.parsed.y} completed cases`,
            afterLabel: (ctx) => {
              const notes = {
                2021: 'peak: +37.4% on 2020',
                2022: 'after Federal Laws No. 478/479 (ban on LGBT "propaganda")',
                2023: 'after Supreme Court ruling designating the "LGBT movement" extremist',
                2024: '+8.4% on 2023; after Federal Laws No. 401/411 (childfree ban)',
              };
              return notes[ctx.label] || '';
            },
          }
        }
      }
    }
  });
};
