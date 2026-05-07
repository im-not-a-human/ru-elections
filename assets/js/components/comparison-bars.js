// Two stacked bar groups in the dark "paradox" section: digital vs social.
window.renderComparisonBars = function () {
  const digitalBars = $('#bars-digital');
  const socialBars = $('#bars-social');
  if (!digitalBars || !socialBars) return;

  const digitalData = PARTY_CODES.map(code => {
    const p = PARTIES[code];
    const laws = LAWS.filter(l => l.votes[code] && l.votes[code] !== 'absent');
    const za = laws.filter(l => l.votes[code] === 'za').length;
    return { code, name: p.short, color: p.color, pct: Math.round((za / laws.length) * 100), total: laws.length };
  });

  const socialData = PARTY_CODES.map(code => {
    const p = PARTIES[code];
    let za = 0, total = 0;
    SOCIAL_LAWS.forEach(l => {
      if (l.votes[code] === undefined) return;
      total++;
      if (l.votes[code] === 'za') za++;
      else if (typeof l.votes[code] === 'object' && l.votes[code].za > 0 && l.votes[code].against === 0) za++;
    });
    return { code, name: p.short, color: p.color, pct: total > 0 ? Math.round((za / total) * 100) : 0, total };
  });

  function makeBars(data, container) {
    container.innerHTML = data.map(d => `
      <div class="comp-bar-row">
        <div class="comp-party-label" style="color: white">${d.name}</div>
        <div class="comp-bar-track" style="background: rgba(255,255,255,0.1)">
          <div class="comp-bar-fill" style="width: 0%; background: ${d.color}" data-target="${d.pct}"></div>
        </div>
        <div class="comp-pct" style="color: white">${d.pct}%</div>
      </div>
    `).join('');
  }

  makeBars(digitalData, digitalBars);
  makeBars(socialData, socialBars);

  const animateBars = () => {
    $$('.comp-bar-fill').forEach(bar => {
      const target = bar.dataset.target;
      bar.style.width = target + '%';
    });
  };

  const trigger = $('#paradox');
  if (!trigger) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateBars();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(trigger);
};
