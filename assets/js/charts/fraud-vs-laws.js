// Fraud (CB RF) vs anti-fraud laws timeline.
window.renderFraudVsLaws = function () {
  const el = document.getElementById('fraudCanvas');
  if (!el || typeof Chart === 'undefined' || typeof FRAUD_CB === 'undefined') return;

  const labels = FRAUD_CB.map(d => d.year);
  const data = FRAUD_CB.map(d => d.value);

  new Chart(el, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Хищения, млрд ₽',
        data,
        backgroundColor: ['#6B6760', '#6B6760', '#B91C1C', '#B91C1C'],
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#6B6760', font: { family: 'JetBrains Mono', size: 12 }, callback: v => v + ' млрд ₽' },
          grid: { color: 'rgba(0,0,0,0.06)' },
        },
        x: {
          ticks: { color: '#6B6760', font: { family: 'JetBrains Mono', size: 13, weight: 500 } },
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
            title: (items) => `${items[0].label} год`,
            label: (ctx) => `Хищения: ${ctx.parsed.y} млрд ₽ (ЦБ РФ)`,
            afterLabel: (ctx) => {
              const notes = {
                2022: 'базис',
                2023: '+11%',
                2024: '+74,4% — рост на фоне ФЗ-303',
                2025: '+6,4% — после ФЗ-41 и MAX. Сбер: до 295 млрд ₽/год с учётом наличных',
              };
              return notes[ctx.label] || '';
            },
          }
        }
      }
    }
  });
};
