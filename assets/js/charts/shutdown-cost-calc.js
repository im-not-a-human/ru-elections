// Interactive shutdown cost calculator.
// Inputs: days, base rate ₽/day, regional coefficient, share of mobile-dependent business.
window.wireShutdownCalc = function () {
  const days = $('#calcDays');
  const rate = $('#calcRate');
  const region = $('#calcRegion');
  const share = $('#calcShare');
  if (!days || !rate || !region || !share) return;

  // Russian Slavic plural for "день": 1 → день, 2-4 → дня, 5+ → дней.
  // Учитывает 21 (день), 22-24 (дня), 25-30 (дней) через mod 100 / mod 10.
  function pluralDays(n) {
    const mod100 = n % 100;
    const mod10 = n % 10;
    if (mod100 >= 11 && mod100 <= 14) return n + ' дней';
    if (mod10 === 1) return n + ' день';
    if (mod10 >= 2 && mod10 <= 4) return n + ' дня';
    return n + ' дней';
  }

  // Money formatter: млн → млрд → трлн с русской локалью (запятая).
  function fmtMoney(mln) {
    if (mln >= 1000000) {
      return (mln / 1000000).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' трлн ₽';
    }
    if (mln >= 1000) {
      return (mln / 1000).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' млрд ₽';
    }
    return Math.round(mln).toLocaleString('ru-RU') + ' млн ₽';
  }

  // Hospital-equiv formatter: 16.0×, 0,3×, <0,01×.
  function fmtHospital(x) {
    if (x >= 1) return x.toLocaleString('ru-RU', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '×';
    if (x < 0.01) return '<0,01×';
    return x.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '×';
  }

  function update() {
    const d = parseInt(days.value, 10);
    const rRub = parseInt(rate.value, 10); // млн ₽/день
    const reg = parseFloat(region.value);
    const sh = parseInt(share.value, 10);

    // Effective daily rate after regional coefficient and share of business.
    // 35% — нормировка московского кейса (АКИТ, март 2026).
    const effective = rRub * reg * (sh / 35);
    const minDay = effective * 0.75;
    const maxDay = effective * 1.25;
    const minTotal = minDay * d;
    const maxTotal = maxDay * d;

    // UI labels
    $('#calcDaysVal').textContent = pluralDays(d);
    $('#calcRateVal').textContent = (rRub / 1000).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' млрд';
    const regNames = { '1.0': '1,0 (Москва)', '0.6': '0,6 (Уральский ФО)', '0.3': '0,3 (СКФО)', '0.15': '0,15 (малый регион)' };
    $('#calcRegionVal').textContent = regNames[region.value] || region.value;
    $('#calcShareVal').textContent = sh + '%';

    $('#calcMin').textContent = fmtMoney(minTotal);
    $('#calcMax').textContent = fmtMoney(maxTotal);

    // Compare with hospital budget — 250 млн ₽/год.
    const avgTotal = (minTotal + maxTotal) / 2;
    $('#calcCompare').textContent = fmtHospital(avgTotal / 250);
  }

  [days, rate, region, share].forEach(el => {
    el.addEventListener('input', update);
    el.addEventListener('change', update);
  });
  update();
};
