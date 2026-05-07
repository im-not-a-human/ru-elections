// Chart.js shared defaults — fonts, tooltip, colors.
window.CHART_DEFAULTS = {
  font: { family: 'Manrope', size: 12, weight: '500' },
  monoFont: { family: 'JetBrains Mono', size: 12 },
  ink: '#1A1815',
  inkMuted: '#6B6760',
  grid: 'rgba(0,0,0,0.06)',
  green: '#15803D',
  gold: '#D97706',
};

window.applyChartDefaults = function () {
  if (typeof Chart === 'undefined') return;
  Chart.defaults.font.family = 'Manrope';
  Chart.defaults.font.size = 12;
  Chart.defaults.color = CHART_DEFAULTS.ink;
};
