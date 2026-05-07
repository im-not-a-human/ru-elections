// EN translation of assets/js/pages/elections.js
// Sync source: assets/js/pages/elections.js
// Glossary: research/i18n_glossary_draft.md

// Init for vybory.html — wires up all charts & widgets.
// Exposed as window.initElections so the SPA-router can call it after
// replacing <main> with the elections page content.
window.initElections = function initElections() {
  if (typeof applyChartDefaults === 'function') applyChartDefaults();

  // Expose thresholds globally for ladder
  window.MAJORITY_THRESHOLDS = MAJORITY_THRESHOLDS;

  // 1. Distortion: votes vs seats
  renderDistortion('#distortionChart', ELECTION_2021.parties);

  // 2. Districts grid (15×15 = 225 single-member constituencies)
  renderDistrictsGrid('#districtsGrid', ELECTION_2021.parties);

  // 3. Waffle: 5% threshold
  const waffleSegments = [
    { pct: 49.82, color: '#1A4584', label: 'UR — cleared the threshold' },
    { pct: 18.93, color: '#CC0000', label: 'CPRF — cleared the threshold' },
    { pct: 7.55, color: '#B8860B', label: 'LDPR — cleared the threshold' },
    { pct: 7.46, color: '#C71F1F', label: 'SRZP — cleared the threshold' },
    { pct: 5.32, color: '#5046E5', label: 'NL — cleared the threshold' },
    { pct: 8.84, color: '#43403A', label: 'Wasted — parties below 5% threshold' },
    { pct: 2.08, color: '#8E887E', label: 'Spoiled / other' },
  ];
  renderWaffle('#barrierWaffle', waffleSegments);
  renderWaffleLegend('#barrierWaffleLegend', waffleSegments);

  // 4. Gauges
  renderGauge('#gaugeEr', { value: 72, label: 'UR seats in the Duma', color: '#1A4584' });
  renderGauge('#gaugeRealEr', { value: 33, label: 'estimated real support', color: '#B91C1C' });

  // 5. Sankey-lite: votes → seats
  renderFlow('#flowVotesSeats',
    [
      { label: 'UR', value: 49.82, color: '#1A4584', display: '49.82%' },
      { label: 'CPRF', value: 18.93, color: '#CC0000', display: '18.93%' },
      { label: 'LDPR+SRZP', value: 15.01, color: '#B8860B', display: '15.01%' },
      { label: 'NL', value: 5.32, color: '#5046E5', display: '5.32%' },
      { label: 'Parties < 5%', value: 8.84, color: '#8E887E', display: '8.84%' },
      { label: 'Invalid / other', value: 2.08, color: '#D6D3D1', display: '2.08%' },
    ],
    [
      { label: 'UR', value: 72, color: '#1A4584', display: '72.0% seats' },
      { label: 'CPRF', value: 12.7, color: '#CC0000', display: '12.7%' },
      { label: 'LDPR+SRZP', value: 10.7, color: '#B8860B', display: '10.7%' },
      { label: 'NL', value: 2.9, color: '#5046E5', display: '2.9%' },
      { label: 'Others', value: 1.7, color: '#8E887E', display: '1.7%' },
    ]
  );

  // 6. Shpilkin chart
  renderShpilkinChart();

  // 7. DEG table — three layers: paper / DEG / final result
  const degBody = $('#degBody');
  if (degBody) {
    const fmtVotes = (v) => typeof v === 'number' ? v.toLocaleString('en-GB') : v;
    const fmtPct = (n) => typeof n === 'number' ? n.toFixed(2) + '%' : n;

    degBody.innerHTML = DEG_FLIPS_2021.map(f => {
      const paperLine = f.paper?.opposition !== undefined
        ? `opp. <strong>${fmtVotes(f.paper.opposition)}</strong> · govt ${fmtVotes(f.paper.winner)}`
        : (f.paper?.lead || '—');
      const degLine = f.deg
        ? `opp. ${fmtVotes(f.deg.opposition)} · govt <strong>${fmtVotes(f.deg.winner)}</strong>`
        : '<span style="color:var(--ink-faded)">no detailed DEG (remote electronic voting) protocol data available</span>';
      const finalLine = `opp. ${fmtPct(f.finalPct.opposition)} · <strong>${fmtPct(f.finalPct.winner)}</strong>`;
      return `
        <tr>
          <td><span class="mono">${f.district}</span></td>
          <td data-label="Opposition (paper)"><strong>${f.opposition}</strong><br><small style="color:var(--ink-faded)">${paperLine}</small></td>
          <td data-label="DEG layer"><span style="color:var(--ink-faded)">${degLine}</span></td>
          <td data-label="Winner (final)"><strong>${f.winner}</strong><br><small style="color:var(--ink-faded)">${finalLine}</small></td>
          <td data-label="What happened" style="font-size: 12px; color: var(--ink-muted); line-height:1.4;">${f.note}</td>
        </tr>
      `;
    }).join('');
  }

  // 8. Sources list — by category
  const srcWrap = $('#sourcesList');
  if (srcWrap) {
    const grouped = {};
    ELECTION_SOURCES.forEach(s => {
      (grouped[s.cat] = grouped[s.cat] || []).push(s);
    });
    const order = ['Закон', 'ЦИК', 'Анализ', 'СМИ', 'Академ'];
    const labelMap = {
      'Закон': 'Legal texts',
      'ЦИК': 'CEC and official resolutions',
      'Анализ': 'Analysis and independent research',
      'СМИ': 'Press coverage',
      'Академ': 'Academic works',
    };
    srcWrap.innerHTML = order.flatMap(cat => {
      const items = grouped[cat] || [];
      if (!items.length) return '';
      return [
        `<div class="sources-cat">${labelMap[cat]}</div>`,
        ...items.map(s => `<a href="${s.url}" target="_blank" rel="noopener" class="source-link">${s.name}</a>`),
      ];
    }).join('');
  }

  // 9. Majority ladder
  renderLadder('#ladderChart', 324, 'UR now (324)');

  // 10. Counterfactuals — 5 systems
  renderCounterfactuals('#counterfactuals', SYSTEM_COUNTERFACTUALS);

  // 11. History of electoral-system changes
  renderHistory('#historyTable', SYSTEM_HISTORY);

  // 12. The authorities' own voices — quotes
  renderQuotes('#quotesGrid', POWER_QUOTES);

  // 13. Doppelgangers, locomotive candidates, arranged races
  const doublesEl = $('#doublesCard');
  if (doublesEl) {
    doublesEl.innerHTML = `
      <div class="mini-card-title">Original</div>
      <p>${DOUBLES_CASE.original}</p>
      <div class="mini-card-title" style="margin-top: 12px;">Clones on the ballot</div>
      ${DOUBLES_CASE.doubles.map(d => `<p>· ${d}</p>`).join('')}
      <p style="margin-top: 12px; font-style: italic; color: var(--ink-muted); font-size: 12px;">${DOUBLES_CASE.trick}</p>
      <p style="margin-top: 6px;">${DOUBLES_CASE.outcome}</p>
    `;
  }
  const dealEl = $('#dealsList');
  if (dealEl) {
    dealEl.innerHTML = DEAL_DISTRICTS_2021.map(d => `
      <div class="mini-card">
        <div class="mini-card-title">${d.district}</div>
        ${d.winner}<br><small>${d.party}</small>
      </div>
    `).join('');
  }
  const locoEl = $('#locomotivesList');
  if (locoEl) {
    locoEl.innerHTML = LOCOMOTIVES_2021.map(l => `
      <div class="mini-card" style="${l.tookSeat ? '' : 'opacity: 0.65; border-style: dashed;'}">
        <div class="mini-card-title">${l.name}</div>
        ${l.role}<br>
        <small style="color: ${l.tookSeat ? 'var(--green)' : 'var(--accent)'}">
          ${l.tookSeat ? '✓ took the seat' : '✗ declined the seat'}
        </small>
      </div>
    `).join('');
  }

  // 14. Public-sector employees bars
  renderAdminBars('#budgetnikiBars', BUDGETNIKI);

  // 15. Heatmap
  renderHeatmap('#heatmapChart');
  renderHeatmapLegend('#heatmapLegend');
};

// First load — fire on DOMContentLoaded only if we're on the elections
// page (data-page="elections"). The SPA router will call initElections()
// directly when navigating to this page.
function tryAutoInitElections() {
  const main = document.getElementById('main');
  if (main && main.dataset.page === 'elections') window.initElections();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', tryAutoInitElections);
} else {
  tryAutoInitElections();
}
