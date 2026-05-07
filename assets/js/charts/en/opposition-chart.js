// EN translation of assets/js/charts/opposition-chart.js
// Sync source: assets/js/charts/opposition-chart.js
// Glossary: research/i18n_glossary_draft.md

// Horizontal bars: opposition episodes per party.
window.renderOppositionChart = function () {
  const el = document.getElementById('oppositionChart');
  if (!el || typeof Chart === 'undefined') return;

  const partyOpposition = {};
  PARTY_CODES.forEach(code => partyOpposition[code] = 0);
  LAWS.forEach(law => {
    Object.entries(law.votes).forEach(([party, vote]) => {
      if (vote === 'against' || vote === 'partial-against' || vote === 'abstain' || vote === 'didnt-vote') {
        partyOpposition[party]++;
      }
    });
  });
  const partyOrder = ['KPRF', 'NL', 'SR', 'LDPR', 'ER'];

  new Chart(el, {
    type: 'bar',
    data: {
      labels: partyOrder.map(c => PARTIES[c].short),
      datasets: [{
        label: 'Deviation episodes',
        data: partyOrder.map(c => partyOpposition[c]),
        backgroundColor: partyOrder.map(c => PARTIES[c].color),
        borderRadius: 6,
        barThickness: 36,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          ticks: { stepSize: 1, color: '#6B6760', font: { family: 'JetBrains Mono', size: 12 } },
          grid: { color: 'rgba(0,0,0,0.06)' },
          title: { display: true, text: `Deviation episodes (of ${LAWS.length} laws)`, color: '#6B6760', font: { size: 12 } }
        },
        y: {
          ticks: { color: '#1A1815', font: { family: 'Manrope', size: 14, weight: '600' } },
          grid: { display: false },
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1A1815',
          padding: 12,
          callbacks: { label: (ctx) => `${ctx.parsed.x} of ${LAWS.length} laws` }
        }
      }
    }
  });
};
