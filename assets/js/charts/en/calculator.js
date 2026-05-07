// EN translation of assets/js/charts/calculator.js
// Sync source: assets/js/charts/calculator.js
// Glossary: research/i18n_glossary_draft.md

// Interactive scenario calculator: UR list share × districts → seats + majority type.
// Uses the Hare-Niemeyer method for distributing list seats
// (Art. 89, Federal Law No. 20-FZ), with list admission per Art. 88.
(function () {
  // Art. 88: lists are admitted to distribution if they have ≥5%, provided:
  //  - at least 2 such lists exist AND their combined share exceeds 50%.
  // If these conditions are not met — admit the next lists in descending
  // order of share until the conditions are satisfied.
  // If only one positive party exists — the scenario is underspecified:
  // at least 2 parties are required for distribution (see invalid flag).
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
  // Scenario with a single positive party — invalid for the calculator:
  // in practice seats are distributed between ≥2 parties.
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
    // Hard cap: no more than 225 single-mandate seats; loyalists fill the
    // remaining slots up to 450 Duma seats (in practice 5 of 198+5+126=329 —
    // the ceiling of the "extended UR bloc"; UI clamps regardless).
    const smd = Math.max(0, Math.min(225, Y_smd));
    const loyalistsCap = Math.max(0, 450 - 225 - smd); // ceiling: 450 - listMax(225) - smd
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
    // If the scenario is underspecified — do not assign all 225 list seats to UR.
    // Art. 88 requires ≥2 parties; otherwise show 0 and a warning.
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

  // Normaliser: if the combined share of "other" parties exceeds (100 - p_list - 10.92),
  // scale them down proportionally.
  // 10.92% = combined: 8.84% for sub-threshold parties + 2.08% invalid/other votes in 2021.
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

      // Warnings: underspecified scenario (1 party) and normalisation
      const warn = $('#calc-norm-warn');
      if (warn) {
        if (r.underspecified) {
          warn.style.display = 'block';
          warn.textContent = 'Underspecified scenario: list distribution requires at least 2 parties (Art. 88, Federal Law No. 20-FZ). List seats are currently 0 — adjust the other parties\' sliders.';
        } else if (r._norm.normalized) {
          const pct = (r._norm.k * 100).toFixed(0);
          warn.style.display = 'block';
          warn.textContent = `The combined shares entered exceed the available remainder. The other parties have been normalised to ${pct}% of the entered values for the calculation.`;
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
        if (r.super) verdict.textContent = 'Super-majority — can do anything, including amending Chapters 3–8 of the Constitution.';
        else if (r.constitutional) verdict.textContent = 'Constitutional majority (two-thirds) — federal constitutional laws, amendments, override of presidential veto, impeachment.';
        else if (r.simple) verdict.textContent = 'Simple majority — ordinary federal laws, the budget.';
        else verdict.textContent = 'No majority — theoretically a coalition Duma.';
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
