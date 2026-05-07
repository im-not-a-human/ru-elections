// Whitelist (corporate VPN exception) growth — РКН and vc.ru.
window.renderWhitelistGrowth = function () {
  const el = document.getElementById('whitelistCanvas');
  if (!el || typeof Chart === 'undefined' || typeof WHITELIST_GROWTH === 'undefined') return;

  const labels = WHITELIST_GROWTH.map(d => d.label);
  const rkn = WHITELIST_GROWTH.map(d => d.rkn);
  const vc = WHITELIST_GROWTH.map(d => d.vc);

  new Chart(el, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'РКН (адреса/подсети у компаний)',
          data: rkn,
          borderColor: '#1A1815',
          backgroundColor: 'rgba(26,24,21,0.06)',
          tension: 0.32,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: '#1A1815',
        },
        {
          label: 'vc.ru (включая лицензированные пакеты)',
          data: vc,
          borderColor: '#B91C1C',
          backgroundColor: 'transparent',
          tension: 0.32,
          fill: false,
          pointRadius: 4,
          pointBackgroundColor: '#B91C1C',
          borderDash: [4, 4],
        },
      ],
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
            callback: v => v >= 1000 ? (v / 1000) + ' тыс.' : v,
          },
          grid: { color: 'rgba(0,0,0,0.06)' },
          title: { display: true, text: 'IP-адресов и подсетей', color: '#6B6760', font: { size: 12 } },
        },
        x: {
          ticks: { color: '#6B6760', font: { family: 'JetBrains Mono', size: 11 } },
          grid: { display: false },
        },
      },
      plugins: {
        legend: { position: 'top', labels: { font: { family: 'Manrope', size: 12 }, padding: 12 } },
        tooltip: {
          backgroundColor: '#1A1815', padding: 12,
          titleFont: { family: 'Manrope', size: 13, weight: '700' },
          bodyFont: { family: 'Manrope', size: 12 },
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('ru-RU')}`,
          }
        }
      }
    }
  });
};
