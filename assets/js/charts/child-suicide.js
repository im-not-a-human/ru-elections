// Child suicide statistics — СКР, МВД.
window.renderChildSuicide = function () {
  const el = document.getElementById('suicideCanvas');
  if (!el || typeof Chart === 'undefined' || typeof CHILD_SUICIDE === 'undefined') return;

  new Chart(el, {
    type: 'bar',
    data: {
      labels: CHILD_SUICIDE.map(d => d.year),
      datasets: [{
        label: 'Завершённых случаев',
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
            title: (items) => `${items[0].label} год`,
            label: (ctx) => `${ctx.parsed.y} завершённых случаев`,
            afterLabel: (ctx) => {
              const notes = {
                2021: 'пик: +37,4% к 2020',
                2022: 'после ФЗ-478/479 (запрет «ЛГБТ-пропаганды»)',
                2023: 'после решения ВС о признании «движения ЛГБТ» экстремистским',
                2024: '+8,4% к 2023; после ФЗ-401/411 (чайлдфри)',
              };
              return notes[ctx.label] || '';
            },
          }
        }
      }
    }
  });
};
