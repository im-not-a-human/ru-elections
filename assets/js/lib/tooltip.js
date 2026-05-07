// Floating tooltip used by vote cells, district cells, etc.
(() => {
  const tooltip = $('#tooltip');
  if (!tooltip) return;

  window.showTooltip = function (e, html) {
    tooltip.innerHTML = html;
    tooltip.classList.add('active');
    moveTooltip(e);
  };

  window.hideTooltip = function () {
    tooltip.classList.remove('active');
  };

  function moveTooltip(e) {
    const x = e.clientX + 12;
    const y = e.clientY + 12;
    tooltip.style.left = Math.min(x, window.innerWidth - 260) + 'px';
    tooltip.style.top = y + 'px';
  }
  window.moveTooltip = moveTooltip;

  // Convenience for vote-cells with party + vote dataset
  window.showVoteTooltip = function (e, data) {
    const partyName = (window.PARTIES && PARTIES[data.party]?.name) || data.party;
    showTooltip(e, `<strong>${partyName}</strong><br>${VOTE_FULL[data.vote] || data.vote}`);
  };
})();
