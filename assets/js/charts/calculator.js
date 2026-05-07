// Интерактивный калькулятор сценариев: % списка ЕР × округа → мандаты + большинство.
// Использует метод Хэйра-Нимейера для распределения списочных мандатов
// (ст. 89 ФЗ № 20-ФЗ), с допуском списков по ст. 88.
(function () {
  // Ст. 88: к распределению допускаются списки ≥5%, при условии что:
  //  - таких списков ≥2 И их совокупная доля > 50%.
  // Если эти условия не выполнены — допускают следующие списки в порядке
  // убывания доли, пока условия не выполнятся.
  // Если положительная партия одна — сценарий считаем недоопределённым:
  // нужно как минимум 2 партии для распределения (см. invalid-флаг).
  function getAdmittedLists(parties) {
    const positive = parties.filter(p => p.share > 0).sort((a, b) => b.share - a.share);
    const admitted = positive.filter(p => p.share >= 5);
    let admittedShare = admitted.reduce((s, p) => s + p.share, 0);

    for (const party of positive) {
      if (admitted.length >= 2 && admittedShare > 50) break;
      if (!admitted.includes(party)) {
        admitted.push(party);
        admittedShare += party.share;
      }
    }
    return admitted;
  }
  // Сценарий «одна положительная партия» — невалидный для калькулятора:
  // в реальности на выборах распределяется между ≥2 партий.
  function isUnderspecified(parties) {
    return parties.filter(p => p.share > 0).length < 2;
  }

  function distributeHareNiemeyer(parties, mandates) {
    const admitted = getAdmittedLists(parties);
    if (admitted.length === 0) return [];
    const total = admitted.reduce((s, p) => s + p.share, 0);
    if (total === 0) return admitted.map(p => ({ ...p, mandates: 0 }));
    const Q = total / mandates;
    admitted.forEach(p => {
      p.IQ = p.share / Q;
      p.intPart = Math.floor(p.IQ);
      p.fracPart = p.IQ - p.intPart;
      p.mandates = p.intPart;
    });
    let used = admitted.reduce((s, p) => s + p.intPart, 0);
    const remain = mandates - used;
    const sorted = [...admitted].sort((a, b) => b.fracPart - a.fracPart || b.share - a.share);
    for (let i = 0; i < remain && i < sorted.length; i++) sorted[i].mandates += 1;
    return admitted;
  }
  // Expose for heatmap reuse
  window.distributeHareNiemeyer = distributeHareNiemeyer;
  window.getAdmittedLists = getAdmittedLists;

  function totalSeats(P_list, otherShares, Y_smd, S_loyalists) {
    // Жёстко ограничиваем: одномандатных не больше 225, лоялисты — оставшийся
    // лимит до 450 мест в Думе (но в реальной жизни 5 мест из 198+5+126=329 —
    // это потолок «расширенного блока ЕР»; UI всё равно clamp-нет).
    const smd = Math.max(0, Math.min(225, Y_smd));
    const loyalistsCap = Math.max(0, 450 - 225 - smd); // потолок: 450 - listMax(225) - smd
    const loyalists = Math.max(0, Math.min(S_loyalists, loyalistsCap));

    const allParties = [
      { name: 'ЕР', share: P_list },
      { name: 'КПРФ', share: otherShares.kprf },
      { name: 'ЛДПР', share: otherShares.ldpr },
      { name: 'СРЗП', share: otherShares.sr },
      { name: 'НЛ', share: otherShares.nl },
    ];
    const underspecified = isUnderspecified(allParties);
    const dist = distributeHareNiemeyer(allParties, 225);
    const ER = dist.find(p => p.name === 'ЕР');
    // Если сценарий недоопределён — не присваиваем ЕР всех 225 списочных.
    // По ст. 88 распределение требует ≥2 партий; иначе показываем 0 и warning.
    const ER_list = underspecified ? 0 : (ER ? ER.mandates : 0);
    const total = Math.min(450, ER_list + smd + loyalists);
    return {
      list: ER_list,
      smd,
      loyalists,
      total,
      simple: total >= 226,
      constitutional: total >= 300,
      super: total >= 338,
      underspecified,
      passing: dist.map(p => ({ name: p.name, share: p.share, mandates: p.mandates })),
    };
  }

  // Нормализатор: если сумма «других» партий > (100 - p_list - 10.92), уменьшаем пропорционально.
  // 10.92% — суммарно: 8.84% за партии ниже 5%-барьера + 2.08% недействительных/прочих в 2021.
  function normalizeOthers(p_list, raw) {
    const cap = Math.max(0, 100 - p_list - 10.92);
    const sum = raw.kprf + raw.ldpr + raw.sr + raw.nl;
    if (sum === 0 || sum <= cap) return { values: raw, normalized: false, k: 1, sum };
    const k = cap / sum;
    return {
      values: { kprf: raw.kprf * k, ldpr: raw.ldpr * k, sr: raw.sr * k, nl: raw.nl * k },
      normalized: true,
      k,
      sum,
    };
  }

  function init() {
    const root = $('#calculator');
    if (!root) return;

    const state = {
      p_list: 49.82,
      kprf: 18.93,
      ldpr: 7.55,
      sr: 7.46,
      nl: 5.32,
      smd: 198,
      loyalists: 2,
    };

    function recalc() {
      const norm = normalizeOthers(state.p_list, {
        kprf: state.kprf, ldpr: state.ldpr, sr: state.sr, nl: state.nl,
      });
      const result = totalSeats(state.p_list, norm.values, state.smd, state.loyalists);
      result._norm = norm;
      return result;
    }

    function render() {
      // 1. Clamp loyalists FIRST (before render) so the label below doesn't
      //    flash an outdated value when smd is dragged up.
      const loyalistsInput = $('input[data-key="loyalists"]', root);
      if (loyalistsInput) {
        const cap = Math.max(0, 450 - 225 - state.smd);
        loyalistsInput.max = Math.min(30, cap);
        if (state.loyalists > loyalistsInput.max) {
          state.loyalists = parseFloat(loyalistsInput.max);
          loyalistsInput.value = loyalistsInput.max;
        }
      }

      const r = recalc();

      $$('#calculator [data-bind]').forEach(el => {
        const k = el.dataset.bind;
        const v = state[k];
        el.textContent = (k === 'smd' || k === 'loyalists') ? v : v.toFixed(2) + '%';
      });

      // Update slider track fill via --pct (0..1)
      $$('input[type="range"]', root).forEach(s => {
        const min = parseFloat(s.min) || 0, max = parseFloat(s.max) || 100;
        const val = parseFloat(s.value);
        const pct = max > min ? (val - min) / (max - min) : 0;
        s.style.setProperty('--pct', pct.toString());
      });

      $('#calc-list').textContent = r.list;
      $('#calc-smd').textContent = r.smd;
      $('#calc-loyalists').textContent = r.loyalists;

      const totalEl = $('#calc-total');
      const prev = parseFloat(totalEl.textContent) || 0;
      totalEl.textContent = r.total;
      $('#calc-pct').textContent = (r.total / 450 * 100).toFixed(1) + '%';

      // Brief flash when the headline number changes
      const totalParent = totalEl.parentElement;
      if (prev !== r.total && totalParent) {
        totalParent.classList.remove('is-changing');
        // Force reflow so the animation restarts
        void totalParent.offsetWidth;
        totalParent.classList.add('is-changing');
      }

      // Warnings: underspecified scenario (1 partia) and normalization
      const warn = $('#calc-norm-warn');
      if (warn) {
        if (r.underspecified) {
          warn.style.display = 'block';
          warn.textContent = 'Недоопределённый сценарий: для распределения по списку нужно как минимум 2 партии (ст. 88 ФЗ № 20-ФЗ). Списочные мандаты пока 0 — поправьте слайдеры других партий.';
        } else if (r._norm.normalized) {
          const pct = (r._norm.k * 100).toFixed(0);
          warn.style.display = 'block';
          warn.textContent = `Сумма введённых долей превышает доступный остаток. Для расчёта остальные партии нормализованы до ${pct}% от введённых значений.`;
        } else {
          warn.style.display = 'none';
        }
      }

      const lamps = [
        ['#lamp-simple', r.simple],
        ['#lamp-const', r.constitutional],
        ['#lamp-super', r.super],
      ];
      lamps.forEach(([sel, on]) => {
        const el = $(sel);
        if (el) el.classList.toggle('is-on', on);
      });

      const ladderFill = $('#calc-ladder-fill');
      if (ladderFill) {
        const pct = Math.min(100, r.total / 450 * 100);
        ladderFill.style.width = pct + '%';
        ladderFill.style.background = r.super ? '#7F1D1D'
          : r.constitutional ? '#B91C1C'
          : r.simple ? '#D97706'
          : '#15803D';
      }

      const verdict = $('#calc-verdict');
      if (verdict) {
        if (r.super) verdict.textContent = 'Сверх-большинство — может всё, включая поправки в гл. 3–8 Конституции.';
        else if (r.constitutional) verdict.textContent = 'Конституционное большинство — ФКЗ, поправки, преодоление вето, импичмент.';
        else if (r.simple) verdict.textContent = 'Простое большинство — обычные ФЗ, бюджет.';
        else verdict.textContent = 'Большинства нет — теоретически коалиционная Дума.';
      }
    }

    $$('input[type="range"]', root).forEach(slider => {
      slider.addEventListener('input', () => {
        state[slider.dataset.key] = parseFloat(slider.value);
        render();
      });
    });

    const reset = $('#calc-reset');
    if (reset) {
      reset.addEventListener('click', () => {
        Object.assign(state, { p_list: 49.82, kprf: 18.93, ldpr: 7.55, sr: 7.46, nl: 5.32, smd: 198, loyalists: 2 });
        $$('input[type="range"]', root).forEach(s => s.value = state[s.dataset.key]);
        render();
      });
    }

    // Preset scenarios — buttons live OUTSIDE #calculator (above it),
    // so search globally rather than within `root`.
    $$('[data-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const presets = {
          collapse: { p_list: 25, kprf: 28, ldpr: 11, sr: 10, nl: 8, smd: 80, loyalists: 0 },
          loss: { p_list: 30, kprf: 28, ldpr: 11, sr: 10, nl: 8, smd: 110, loyalists: 0 },
          dip: { p_list: 40, kprf: 23, ldpr: 9, sr: 9, nl: 7, smd: 180, loyalists: 1 },
          fact: { p_list: 49.82, kprf: 18.93, ldpr: 7.55, sr: 7.46, nl: 5.32, smd: 198, loyalists: 2 },
        };
        const p = presets[btn.dataset.preset];
        if (!p) return;
        Object.assign(state, p);
        $$('input[type="range"]', root).forEach(s => s.value = state[s.dataset.key]);
        render();
      });
    });

    render();
  }

  // Expose for SPA-router (also runs at first load below)
  window.initCalculator = init;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
