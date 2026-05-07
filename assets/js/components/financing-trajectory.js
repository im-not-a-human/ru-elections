// B-section CORE viz: Financing trajectory chart.
// Shows budget-share % over years as a Chart.js area chart with hotspots
// on each data point.
//
// API: window.renderFinancingTrajectory(rootEl, data)
// data = {
//   years: [2021, 2022, 2023, 2024],
//   budgetPct: [0, 92, 93, 90],
//   totalsMln: [12, 488, 720, 619],
//   hotspots: { '2021': {title, body}, '2022': {...}, ... }
// }

(function() {
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  window.renderFinancingTrajectory = function(rootEl, data) {
    if (!rootEl || !data || !data.years || !data.budgetPct) return;
    if (typeof Chart === 'undefined') {
      rootEl.innerHTML = '<div class="dok-error" style="padding:40px;text-align:center"><p>Chart.js не загружен — попробуйте обновить страницу.</p></div>';
      return;
    }

    var canvasId = 'fin-traj-' + Math.random().toString(36).slice(2, 9);

    rootEl.innerHTML =
      '<div style="position:relative;width:100%;height:280px">' +
        '<canvas id="' + canvasId + '" role="img" ' +
          'aria-label="' + escHtml('Доходы партии Новые люди от государственного бюджета: ' +
          data.years.map(function(y, i) { return y + ' г. ' + data.budgetPct[i] + '%'; }).join(', ')) + '">' +
          'График доли бюджетного финансирования по годам.' +
        '</canvas>' +
      '</div>' +
      '<div class="ft-pills" style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap;justify-content:center"></div>';

    var pillsEl = rootEl.querySelector('.ft-pills');
    data.years.forEach(function(year, i) {
      var pct = data.budgetPct[i];
      var hs = data.hotspots && data.hotspots[year];
      var tag = document.createElement('button');
      tag.className = 'hs ft-pill';
      tag.type = 'button';
      tag.setAttribute('tabindex', '0');
      tag.setAttribute('role', 'button');
      tag.setAttribute('aria-label', year + ': ' + pct + '% доля бюджета');
      tag.dataset.hotspotTitle = (hs && hs.title) || (year + ' г.');
      tag.dataset.hotspotBody = (hs && hs.body) || '';
      tag.style.cssText = 'border:1px solid var(--line);background:white;padding:6px 12px;border-radius:100px;font-family:JetBrains Mono,monospace;font-size:11px;cursor:pointer;color:var(--ink-soft)';
      tag.innerHTML = '<strong>' + escHtml(String(year)) + '</strong> · ' + escHtml(String(pct)) + '%';
      pillsEl.appendChild(tag);
    });

    var ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.years.map(String),
        datasets: [{
          label: '% доходов из бюджета',
          data: data.budgetPct,
          borderColor: '#bea050',
          backgroundColor: 'rgba(190, 160, 80, 0.18)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.28,
          pointBackgroundColor: '#bea050',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true, max: 100,
            ticks: {
              callback: function(v) { return v + '%'; },
              color: '#6f6a60', font: { family: 'JetBrains Mono', size: 10 },
            },
            grid: { color: 'rgba(0,0,0,0.05)' },
          },
          x: {
            ticks: { color: '#1A1815', font: { family: 'JetBrains Mono', size: 11, weight: 600 } },
            grid: { display: false },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                var i = ctx.dataIndex;
                var lines = [ctx.parsed.y + '% бюджета'];
                if (data.totalsMln && data.totalsMln[i] != null) {
                  lines.push('Всего: ' + data.totalsMln[i] + ' млн ₽');
                }
                return lines;
              },
            },
          },
        },
      },
    });

    if (window.initHotspots) window.initHotspots(rootEl);
  };
})();
