// EN translation of assets/js/charts/shutdown-cost-calc.js
// Sync source: assets/js/charts/shutdown-cost-calc.js
// Glossary: research/i18n_glossary_draft.md

// Interactive shutdown cost calculator.
// Inputs: days, base rate ₽/day, regional coefficient, share of mobile-dependent business.
window.wireShutdownCalc = function () {
  const days = $('#calcDays');
  const rate = $('#calcRate');
  const region = $('#calcRegion');
  const share = $('#calcShare');
  if (!days || !rate || !region || !share) return;

  // English plural for "day": 1 → day, 2+ → days (no irregular forms needed).
  function pluralDays(n) {
    return n + (n === 1 ? ' day' : ' days');
  }

  // Money formatter: M → bn → tn with en-GB locale (decimal point).
  function fmtMoney(mln) {
    if (mln >= 1000000) {
      return (mln / 1000000).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' tn ₽';
    }
    if (mln >= 1000) {
      return (mln / 1000).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' bn ₽';
    }
    return Math.round(mln).toLocaleString('en-GB') + ' M ₽';
  }

  // Hospital-equivalent formatter: 16.0×, 0.3×, <0.01×.
  function fmtHospital(x) {
    if (x >= 1) return x.toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '×';
    if (x < 0.01) return '<0.01×';
    return x.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '×';
  }

  function update() {
    const d = parseInt(days.value, 10);
    const rRub = parseInt(rate.value, 10); // M ₽/day
    const reg = parseFloat(region.value);
    const sh = parseInt(share.value, 10);

    // Effective daily rate after regional coefficient and share of business.
    // 35% — normalisation for the Moscow case (AKIT, March 2026).
    const effective = rRub * reg * (sh / 35);
    const minDay = effective * 0.75;
    const maxDay = effective * 1.25;
    const minTotal = minDay * d;
    const maxTotal = maxDay * d;

    // UI labels
    $('#calcDaysVal').textContent = pluralDays(d);
    $('#calcRateVal').textContent = (rRub / 1000).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' bn';
    const regNames = { '1.0': '1.0 (Moscow)', '0.6': '0.6 (Ural Federal District)', '0.3': '0.3 (North Caucasus Federal District)', '0.15': '0.15 (small region)' };
    $('#calcRegionVal').textContent = regNames[region.value] || region.value;
    $('#calcShareVal').textContent = sh + '%';

    $('#calcMin').textContent = fmtMoney(minTotal);
    $('#calcMax').textContent = fmtMoney(maxTotal);

    // Compare with hospital budget — 250 M ₽/year.
    const avgTotal = (minTotal + maxTotal) / 2;
    $('#calcCompare').textContent = fmtHospital(avgTotal / 250);
  }

  [days, rate, region, share].forEach(el => {
    el.addEventListener('input', update);
    el.addEventListener('change', update);
  });
  update();
};
