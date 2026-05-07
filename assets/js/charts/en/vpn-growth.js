// EN translation of assets/js/charts/vpn-growth.js
// Sync source: assets/js/charts/vpn-growth.js
// Glossary: research/i18n_glossary_draft.md

// VPN demand growth — Sensor Tower top-5 active users (in millions).
window.renderVpnGrowth = function () {
  const el = document.getElementById('vpnGrowthCanvas');
  if (!el || typeof Chart === 'undefined' || typeof VPN_GROWTH === 'undefined') return;

  const labels = VPN_GROWTH.map(d => d.period);
  const data = VPN_GROWTH.map(d => d.users);

  new Chart(el, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Active VPN users, M',
        data,
        backgroundColor: data.map((_, i) => i < 2 ? 'rgba(107,103,96,0.55)' : 'rgba(185,28,28,0.78)'),
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#6B6760', font: { family: 'JetBrains Mono', size: 12 }, callback: v => v + 'M' },
          grid: { color: 'rgba(0,0,0,0.06)' },
        },
        x: {
          ticks: { color: '#6B6760', font: { family: 'JetBrains Mono', size: 12 } },
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
            label: (ctx) => `${ctx.parsed.y}M users`,
            afterLabel: (ctx) => ctx.dataIndex >= 2 ? 'after Federal Law No. 281-FZ (31.07.2025)' : '',
          }
        }
      }
    }
  });
};
