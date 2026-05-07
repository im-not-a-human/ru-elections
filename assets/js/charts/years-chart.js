// Stacked bar chart: opposition episodes by year (2019–2025).
window.renderYearsChart = function () {
  const el = document.getElementById('yearsChart');
  if (!el || typeof Chart === 'undefined') return;

  const yearsData = {};
  for (let y = 2019; y <= 2025; y++) yearsData[y] = { full: 0, partial: 0 };
  LAWS.forEach(law => {
    let hasFull = false, hasPartial = false;
    Object.values(law.votes).forEach(v => {
      if (v === 'against') hasFull = true;
      else if (v === 'partial-against' || v === 'abstain' || v === 'didnt-vote') hasPartial = true;
    });
    if (hasFull) yearsData[law.year].full++;
    else if (hasPartial) yearsData[law.year].partial += 0.5;
  });
  const years = Object.keys(yearsData);
  const fullVals = years.map(y => yearsData[y].full);
  const partialVals = years.map(y => yearsData[y].partial);

  new Chart(el, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [
        { label: 'Фракционное «против»', data: fullVals, backgroundColor: '#15803D', borderRadius: 6, stack: 'a' },
        { label: 'Воздержание / часть фракции', data: partialVals, backgroundColor: '#D97706', borderRadius: 6, stack: 'a' },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1, color: '#6B6760', font: { family: 'JetBrains Mono', size: 12 } },
          grid: { color: 'rgba(0,0,0,0.06)' },
          title: { display: true, text: 'Эпизодов оппозиционного голосования', color: '#6B6760', font: { size: 12 } }
        },
        x: {
          ticks: { color: '#6B6760', font: { family: 'JetBrains Mono', size: 13, weight: 500 } },
          grid: { display: false },
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1A1815',
          padding: 12,
          titleFont: { family: 'Manrope', size: 13, weight: '700' },
          bodyFont: { family: 'Manrope', size: 12 },
          callbacks: { title: (items) => `${items[0].label} год` }
        }
      }
    }
  });
};
