// YouTube throttling — Google Transparency Report indices for RU and NL.
window.renderYoutubeThrottling = function () {
  const el = document.getElementById('youtubeCanvas');
  if (!el || typeof Chart === 'undefined' || typeof YOUTUBE_TIMELINE === 'undefined') return;

  const labels = YOUTUBE_TIMELINE.map(d => d.date);
  const ru = YOUTUBE_TIMELINE.map(d => d.ru);
  const nl = YOUTUBE_TIMELINE.map(d => d.nl);

  // Annotation marker at start of throttling — 25 July 2024 = index 1
  new Chart(el, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'РФ (трафик YouTube)',
          data: ru,
          borderColor: '#B91C1C',
          backgroundColor: 'rgba(185,28,28,0.08)',
          fill: true,
          tension: 0.28,
          pointRadius: 3,
          pointBackgroundColor: '#B91C1C',
        },
        {
          label: 'Нидерланды (приёмники VPN-трафика)',
          data: nl,
          borderColor: '#15803D',
          backgroundColor: 'transparent',
          tension: 0.28,
          pointRadius: 3,
          pointBackgroundColor: '#15803D',
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
          ticks: { color: '#6B6760', font: { family: 'JetBrains Mono', size: 12 } },
          grid: { color: 'rgba(0,0,0,0.06)' },
          title: { display: true, text: 'Индекс трафика (Google Transparency Report)', color: '#6B6760', font: { size: 12 } },
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
        }
      }
    }
  });
};
