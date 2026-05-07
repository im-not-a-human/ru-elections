// EN translation of assets/js/charts/heatmap.js
// Sync source: assets/js/charts/heatmap.js
// Glossary: research/i18n_glossary_draft.md

// Heatmap for the inverse problem: UR list share × districts won → seats.
// Zones: 🟥 no simple majority; 🟨 simple; 🟧 constitutional; 🟪 super.

function distributeListMandates(p_list_pct) {
  // Actual distribution of other parties in 2021, normalised to current p_list.
  // Compression to 89.08% retained — the combined share of parties that cleared
  // the threshold in 2021.
  const k = (89.08 - p_list_pct) / (89.08 - 49.82);
  const all = [
    { name: 'ER', share: p_list_pct },
    { name: 'KPRF', share: Math.max(0, 18.93 * k) },
    { name: 'LDPR', share: Math.max(0, 7.55 * k) },
    { name: 'SR',   share: Math.max(0, 7.46 * k) },
    { name: 'NL',   share: Math.max(0, 5.32 * k) },
  ];

  // Use the shared admission mechanism (Art. 88) and distribution (Art. 89).
  const distribute = window.distributeHareNiemeyer;
  if (typeof distribute !== 'function') return 0;
  const dist = distribute(all, 225);
  const er = dist.find(p => p.name === 'ER');
  return er ? er.mandates : 0;
}

function zoneClass(total) {
  if (total >= 338) return 'zone-super';
  if (total >= 300) return 'zone-const';
  if (total >= 226) return 'zone-simple';
  return 'zone-no';
}

window.renderHeatmap = function (selector) {
  const el = $(selector);
  if (!el) return;
  el.classList.add('heatmap');

  const pVals = [60, 50, 40, 30, 25, 20];
  const yVals = [50, 100, 150, 200, 225];
  const rows = [];

  rows.push(`<div class="heatmap-cell heatmap-head">P %\\Y</div>`);
  yVals.forEach(y => rows.push(`<div class="heatmap-cell heatmap-head">${y} dist.</div>`));

  pVals.forEach(p => {
    rows.push(`<div class="heatmap-cell heatmap-head">${p}%</div>`);
    yVals.forEach(y => {
      const list = distributeListMandates(p);
      const total = list + y;
      const z = zoneClass(total);
      const isFact = (p === 50 && y === 200);
      rows.push(`<div class="heatmap-cell ${z} ${isFact ? 'is-fact' : ''}" title="P=${p}%, Y=${y} → ${total} seats">${total}</div>`);
    });
  });

  el.innerHTML = rows.join('');
};

window.renderHeatmapLegend = function (selector) {
  const el = $(selector);
  if (!el) return;
  el.innerHTML = `
    <div><span class="heatmap-legend-swatch" style="background:#DCFCE7"></span>No majority (&lt; 226)</div>
    <div><span class="heatmap-legend-swatch" style="background:#FEF3C7"></span>Simple majority (226–299)</div>
    <div><span class="heatmap-legend-swatch" style="background:#FED7AA"></span>Constitutional majority (300–337)</div>
    <div><span class="heatmap-legend-swatch" style="background:#FEE2E2; border: 2px solid #B91C1C; box-sizing:border-box"></span>Super-majority (≥ 338)</div>
    <div><span style="display:inline-block; padding: 2px 6px; background:#1A1815; color:#fff; border-radius:3px; font-size: 10px;">★</span>Actual 2021 (50% × 200 districts)</div>
  `;
};

// Simple renderer for administrative-resource bars
window.renderAdminBars = function (selector, items) {
  const el = $(selector);
  if (!el) return;
  el.classList.add('admin-bars');
  const max = Math.max(...items.map(i => i.count));
  el.innerHTML = items.map(it => `
    <div class="admin-row">
      <div class="admin-row-label">${it.label}</div>
      <div class="admin-row-bar"><div class="admin-row-fill" style="width:${(it.count/max)*100}%"></div></div>
      <div class="admin-row-num">${it.count.toLocaleString('en-GB')}</div>
    </div>
  `).join('');
};
