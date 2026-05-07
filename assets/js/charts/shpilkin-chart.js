// Bar chart: anomalous (Shpilkin) votes by year.
window.renderShpilkinChart = function () {
  const el = document.getElementById('shpilkinChart');
  if (!el || typeof Chart === 'undefined') return;

  const labels = SHPILKIN.map(d => `${d.year} · ${d.kind}`);
  const anomalous = SHPILKIN.map(d => d.anomalous);

  new Chart(el, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Млн «нарисованных» голосов (Шпилькин)',
        data: anomalous,
        backgroundColor: anomalous.map(v => v >= 20 ? '#B91C1C' : v >= 12 ? '#DC2626' : '#F59E0B'),
        borderRadius: 8,
        barThickness: 38,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
          ticks: { color: '#6B6760', font: { family: 'JetBrains Mono', size: 12 }, callback: (v) => v + ' млн' },
          grid: { color: 'rgba(0,0,0,0.06)' },
          title: { display: true, text: 'Млн голосов «нарисованных» в пользу власти', color: '#6B6760', font: { size: 12 } },
        },
        y: {
          ticks: { color: '#1A1815', font: { family: 'Manrope', size: 13, weight: '600' } },
          grid: { display: false },
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1A1815',
          padding: 12,
          callbacks: {
            label: (ctx) => {
              const d = SHPILKIN[ctx.dataIndex];
              return [
                `Аномальные голоса: ${d.anomalous} млн`,
                `Официально: ${d.official}%`,
                `Оценка реального: ~${d.real}%`
              ];
            }
          }
        }
      }
    }
  });
};
