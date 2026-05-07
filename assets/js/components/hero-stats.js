// Renders the 4 hero stat hooks from window.HERO_STATS into #heroStats.
window.renderHeroStats = function renderHeroStats() {
  const root = document.getElementById('heroStats');
  if (!root || !window.HERO_STATS) return;
  root.innerHTML = window.HERO_STATS.map(s => `
    <div class="stat">
      <div class="stat-num${s.alert ? ' alert' : ''}">${s.n}<small>${s.nUnit}</small></div>
      <div class="stat-label">${s.label}</div>
      <div class="stat-src">🟢 <a href="${s.source.href}" target="_blank" rel="noopener">${s.source.label}</a></div>
    </div>
  `).join('');
};
