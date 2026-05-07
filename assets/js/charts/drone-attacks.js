// Drone attacks on Russia — Sovbez (Shoigu, March 2026).
window.renderDroneAttacks = function () {
  const el = document.getElementById('droneCanvas');
  if (!el || typeof Chart === 'undefined' || typeof DRONE_ATTACKS === 'undefined') return;

  new Chart(el, {
    type: 'bar',
    data: {
      labels: DRONE_ATTACKS.map(d => d.year),
      datasets: [{
        label: 'Атак БПЛА, тыс.',
        data: DRONE_ATTACKS.map(d => d.value),
        backgroundColor: ['#6B6760', '#B91C1C'],
        borderRadius: 6,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            color: '#6B6760',
            font: { family: 'JetBrains Mono', size: 12 },
            callback: v => v >= 1000 ? (v / 1000) + ' тыс.' : v,
          },
          grid: { color: 'rgba(0,0,0,0.06)' },
        },
        y: {
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
            title: (items) => `${items[0].label} год`,
            label: (ctx) => `${ctx.parsed.x.toLocaleString('ru-RU')} атак БПЛА`,
            afterLabel: (ctx) => ctx.dataIndex === 1 ? '×3,7 к 2024 году' : '',
          }
        }
      }
    }
  });
};
