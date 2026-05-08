// Поимённое голосование — полноэкранная панель из law-modal.
// Точка входа: window.openDeputyPanel(lawId).
// Данные грузятся лениво из assets/data/votes/{lawId}.json.

(function () {
  let panelEl = null;
  let activeBallotIdx = 0;
  let onlyDissent = false;
  let searchQuery = '';
  let searchTimer = 0;
  let lastFocusedBeforeOpen = null;
  const dataCache = {};            // lawId → fetched JSON

  const FACTION_LABELS = { ER: 'Единая Россия', KPRF: 'КПРФ', LDPR: 'ЛДПР', SR: 'СРЗП', NL: 'Новые люди' };
  const FACTION_ORDER  = ['ER', 'KPRF', 'LDPR', 'SR', 'NL'];
  const RESULT_LABELS  = { for: 'за', against: 'против', abstain: 'воздержался', absent: 'не голосовал' };
  const RESULT_LABELS_GENITIVE = { for: 'за', against: 'против', abstain: 'воздержались', absent: 'не голосовали' };
  const RESULT_LABELS_UPPER = { for: 'ЗА', against: 'ПРОТИВ', abstain: 'ВОЗДЕРЖАЛИСЬ', absent: 'НЕ ГОЛОСОВАЛИ' };
  const COLLAPSE_THRESHOLD = 30;
  const COLLAPSE_PREVIEW_COUNT = 12;

  function ensurePanel() {
    if (panelEl) return panelEl;
    panelEl = document.createElement('div');
    panelEl.className = 'deputy-panel';
    panelEl.setAttribute('role', 'dialog');
    panelEl.setAttribute('aria-modal', 'true');
    panelEl.setAttribute('aria-labelledby', 'deputy-panel-title');
    panelEl.tabIndex = -1;
    document.body.appendChild(panelEl);
    panelEl.addEventListener('keydown', onKey);
    return panelEl;
  }

  function onKey(e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'Tab') {
      const focusables = panelEl.querySelectorAll(
        'a[href], button, input, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  }

  async function loadData(lawId) {
    if (dataCache[lawId]) return dataCache[lawId];
    const r = await fetch(`assets/data/votes/${lawId}.json`);
    if (!r.ok) throw new Error(`Не удалось загрузить ${lawId}.json: ${r.status}`);
    const j = await r.json();
    dataCache[lawId] = j;
    return j;
  }

  function close() {
    if (!panelEl) return;
    panelEl.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocusedBeforeOpen && lastFocusedBeforeOpen.focus) lastFocusedBeforeOpen.focus();
  }

  window.openDeputyPanel = async function (lawId) {
    lastFocusedBeforeOpen = document.activeElement;
    ensurePanel();
    panelEl.innerHTML = '<div style="padding:40px;text-align:center;color:var(--dp-ink-muted)">Загружаю...</div>';
    panelEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    let data;
    try {
      data = await loadData(lawId);
    } catch (e) {
      panelEl.innerHTML = `<div style="padding:40px">
        <p>${escape(e.message)}</p>
        <button type="button" data-act="close" class="deputy-panel-close" aria-label="Закрыть">✕</button>
      </div>`;
      panelEl.querySelector('[data-act="close"]').addEventListener('click', close);
      return;
    }
    // reset view state on each open (preserve dataCache)
    activeBallotIdx = 0;
    onlyDissent = false;
    searchQuery = '';
    panelEl.classList.remove('only-dissent');
    delete panelEl.dataset.search;
    render(data);
    panelEl.focus();
  };

  function render(data) {
    const ballot = data.ballots[activeBallotIdx];
    const law = (window.LAWS || []).find(l => l.id === data.lawId);
    const lawTitle = law ? law.title : data.lawId;
    const tot = ballot.totals;

    // compute dissidents per faction
    const dissByFc = {};   // factionCode → array of deputy
    const majByFc  = {};   // factionCode → array of deputy
    const factionByCode = {};
    for (const f of ballot.factions) factionByCode[f.code] = f;

    for (const fc of FACTION_ORDER) {
      const f = factionByCode[fc];
      dissByFc[fc] = [];
      majByFc[fc] = [];
      if (!f) continue;
      for (const d of ballot.deputies) {
        if (d.factionCode !== fc) continue;
        if (d.result === f.majority) majByFc[fc].push(d);
        else dissByFc[fc].push(d);
      }
      dissByFc[fc].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
      majByFc[fc].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    }

    panelEl.innerHTML = `
      <div class="deputy-panel-head">
        <button class="deputy-panel-back" type="button" data-act="close">← Закон</button>
        <a class="deputy-panel-source" href="${escape(ballot.voteUrl)}" target="_blank" rel="noopener">vote.duma.gov.ru ↗</a>
        <button class="deputy-panel-close" type="button" data-act="close" aria-label="Закрыть">✕</button>
        <h2 class="deputy-panel-title" id="deputy-panel-title">${escape(lawTitle)}</h2>
        <div class="deputy-panel-meta">
          <span>${escape(ballot.billId || '')}</span>
          <span>${escape(ballot.date || '')}</span>
          <span>за ${tot.for} · против ${tot.against} · возд. ${tot.abstain} · отс. ${tot.absent}</span>
          <span><a href="${escape(ballot.sozdUrl)}" target="_blank" rel="noopener">sozd.duma.gov.ru</a></span>
        </div>
        ${renderTabs(data)}
      </div>

      <div class="deputy-panel-bar">
        <div class="dp-bar-chips">
          ${FACTION_ORDER.map(fc => {
            const f = factionByCode[fc];
            if (!f) return '';
            const n = dissByFc[fc].length;
            return `<button class="dp-bar-chip" data-act="scroll" data-fc="${fc}">${escape(FACTION_LABELS[fc])} · ${n}</button>`;
          }).join('')}
        </div>
        <div class="dp-bar-tools">
          <input class="dp-bar-search" type="search" placeholder="поиск по фамилии" aria-label="Поиск по фамилии депутата" value="${escape(searchQuery)}" />
          <label class="dp-bar-filter">
            <input type="checkbox" data-act="toggle-dissent" ${onlyDissent ? 'checked' : ''} /> только отступники
          </label>
        </div>
      </div>

      <div class="deputy-panel-body">
        ${FACTION_ORDER.map(fc => renderSection(fc, factionByCode[fc], dissByFc[fc], majByFc[fc])).join('')}
      </div>
    `;
    // restore filter classes
    if (onlyDissent) panelEl.classList.add('only-dissent');
    if (searchQuery) {
      panelEl.dataset.search = searchQuery;
      applySearchFilter();
    }
    wireEvents(data);
  }

  function renderTabs(data) {
    if (data.ballots.length < 2) return '';
    return `<div class="deputy-panel-tabs" role="tablist">
      ${data.ballots.map((b, i) => `
        <button class="deputy-panel-tab ${i === activeBallotIdx ? 'is-active' : ''}"
                role="tab" aria-selected="${i === activeBallotIdx}" data-act="tab" data-idx="${i}">
          ${escape(b.tabLabel || `Голосование ${i+1}`)}
        </button>`).join('')}
    </div>`;
  }

  function renderSection(fc, faction, dissidents, majority) {
    if (!faction) {
      return `<section class="dp-section" id="section-${fc}">
        <div class="dp-section-head">
          <h3 class="dp-section-name">${escape(FACTION_LABELS[fc])}</h3>
        </div>
        <p class="dp-section-empty no-dissent">Не было в Думе на момент голосования</p>
      </section>`;
    }

    const total = faction.for + faction.against + faction.abstain + faction.absent;
    const majorityLabel = RESULT_LABELS[faction.majority] || faction.majority;

    // proportion bar segments
    const segs = [
      { result: 'for',     val: faction.for },
      { result: 'against', val: faction.against },
      { result: 'abstain', val: faction.abstain },
      { result: 'absent',  val: faction.absent },
    ].filter(s => s.val > 0).map(s =>
      `<div class="dp-bar-seg ${s.result}" style="flex:${s.val}"></div>`
    ).join('');

    // dissent block — group by result type if mixed
    const dissBlock = renderDissentBlock(dissidents);

    // majority block — collapsed if > threshold
    const majBlock = renderMajorityBlock(majority, faction.majority);

    return `<section class="dp-section" id="section-${fc}">
      <div class="dp-section-head">
        <h3 class="dp-section-name">${escape(FACTION_LABELS[fc])}</h3>
        <div class="dp-section-stats">${total} деп. · мажоритарно ${escape(majorityLabel)}</div>
      </div>
      <div class="dp-bar">${segs}</div>
      ${dissBlock}
      ${majBlock}
    </section>`;
  }

  function renderDissentBlock(dissidents) {
    if (!dissidents.length) return '';
    // group by result type
    const byResult = { for: [], against: [], abstain: [], absent: [] };
    for (const d of dissidents) (byResult[d.result] || byResult.absent).push(d);

    // Single result type → simple form
    const present = ['against', 'abstain', 'absent', 'for'].filter(r => byResult[r].length);
    if (present.length === 1) {
      const r = present[0];
      return `<div class="dp-dissent">
        <div class="dp-sub-label">Отступили от фракции · ${dissidents.length} ${escape(RESULT_LABELS_GENITIVE[r])}</div>
        ${renderNameGrid(byResult[r])}
      </div>`;
    }

    // Multiple → split with mini sub-headers
    const subs = present.map(r =>
      `<div class="dp-sub-mini">${escape(RESULT_LABELS[r])} (${byResult[r].length})</div>
       ${renderNameGrid(byResult[r])}`
    ).join('');

    return `<div class="dp-dissent">
      <div class="dp-sub-label">Отступили от фракции · ${dissidents.length} отступлений</div>
      ${subs}
    </div>`;
  }

  function renderMajorityBlock(majority, majorityType) {
    if (!majority.length) return '';
    const collapsed = majority.length > COLLAPSE_THRESHOLD;
    const visible = collapsed ? majority.slice(0, COLLAPSE_PREVIEW_COUNT) : majority;
    const remaining = majority.length - visible.length;
    const head = `<div class="dp-majority-head">
      <span class="dp-sub-label">С фракцией · ${majority.length} ${escape(RESULT_LABELS_GENITIVE[majorityType] || majorityType)}</span>
      ${collapsed ? `<button class="dp-majority-expand" type="button" data-act="expand">показать всех ${majority.length} →</button>` : ''}
    </div>`;
    return `<div class="dp-majority">
      ${head}
      ${renderNameGrid(visible)}
      ${collapsed ? `<div class="dp-majority-more">+ ещё ${remaining} фамилий</div>` : ''}
    </div>`;
  }

  function renderNameGrid(deputies) {
    if (!deputies.length) return '';
    return `<div class="dp-name-grid">
      ${deputies.map(d => `<span class="dp-name" data-name="${escape(d.name.toLowerCase())}">${escape(d.name)}</span>`).join('')}
    </div>`;
  }

  function wireEvents(data) {
    panelEl.querySelectorAll('[data-act="close"]').forEach(b =>
      b.addEventListener('click', close));
    panelEl.querySelectorAll('[data-act="tab"]').forEach(b =>
      b.addEventListener('click', () => {
        activeBallotIdx = parseInt(b.dataset.idx, 10);
        render(data);
      }));
    panelEl.querySelectorAll('[data-act="scroll"]').forEach(b =>
      b.addEventListener('click', () => {
        const fc = b.dataset.fc;
        const target = panelEl.querySelector('#section-' + fc);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', '#' + fc);
        }
        panelEl.querySelectorAll('.dp-bar-chip').forEach(c => c.classList.remove('is-active'));
        b.classList.add('is-active');
      }));
    panelEl.querySelectorAll('[data-act="expand"]').forEach(b =>
      b.addEventListener('click', () => {
        const sec = b.closest('.dp-section');
        const maj = sec.querySelector('.dp-majority');
        const fc = sec.id.replace('section-', '');
        const f = data.ballots[activeBallotIdx].factions.find(x => x.code === fc);
        if (!f) return;
        const all = data.ballots[activeBallotIdx].deputies
          .filter(d => d.factionCode === fc && d.result === f.majority)
          .sort((a, b) => a.name.localeCompare(b.name, 'ru'));
        const grid = maj.querySelector('.dp-name-grid');
        grid.outerHTML = `<div class="dp-name-grid">${all.map(d =>
          `<span class="dp-name" data-name="${escape(d.name.toLowerCase())}">${escape(d.name)}</span>`
        ).join('')}</div>`;
        const more = maj.querySelector('.dp-majority-more');
        if (more) more.remove();
        b.remove();
        // re-apply search filter on newly added DOM
        if (panelEl.dataset.search) applySearchFilter();
      }));
    const search = panelEl.querySelector('.dp-bar-search');
    if (search) {
      search.addEventListener('input', () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          searchQuery = search.value.trim();
          if (searchQuery) panelEl.dataset.search = searchQuery;
          else delete panelEl.dataset.search;
          applySearchFilter();
        }, 100);
      });
    }
    const toggle = panelEl.querySelector('[data-act="toggle-dissent"]');
    if (toggle) {
      toggle.addEventListener('change', () => {
        onlyDissent = toggle.checked;
        panelEl.classList.toggle('only-dissent', onlyDissent);
      });
    }
  }

  function applySearchFilter() {
    const q = (panelEl.dataset.search || '').toLowerCase();
    panelEl.querySelectorAll('.dp-name').forEach(n => {
      const name = n.dataset.name || '';
      if (q && name.includes(q)) n.classList.add('is-match');
      else n.classList.remove('is-match');
    });
  }

  function escape(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
})();
