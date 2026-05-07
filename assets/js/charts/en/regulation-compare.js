// EN translation of assets/js/charts/regulation-compare.js
// Sync source: assets/js/charts/regulation-compare.js
// Glossary: research/i18n_glossary_draft.md

// Democratic regulators compared with RU framework. Renders as HTML table.
// Polarity: judicial/appeal — 'Yes' is good (green); userCrim/block —
// 'Yes' is a risk/bad (red). Colour applied via data-pol on td.
window.renderRegulationCompare = function () {
  const wrap = $('#regulationCompare');
  if (!wrap || typeof REG_COMPARE === 'undefined') return;

  const cellMap = {
    yes: { cls: 'yes', text: 'Yes' },
    no: { cls: 'no', text: 'No' },
    partial: { cls: 'na', text: 'Partial' },
  };

  function cell(state) {
    const m = cellMap[state] || cellMap.no;
    return `<span class="${m.cls}">${m.text}</span>`;
  }

  wrap.innerHTML = `
    <div class="regtbl-wrap">
      <table class="regtbl">
        <thead>
          <tr>
            <th>Framework</th>
            <th>What it regulates</th>
            <th>Judicial oversight</th>
            <th>Right of appeal</th>
            <th>Criminal liability for users</th>
            <th>Website blocking</th>
          </tr>
        </thead>
        <tbody>
          ${REG_COMPARE.map(r => `
            <tr style="${r.highlight ? 'background: rgba(185,28,28,0.05);' : ''}">
              <td><strong>${r.framework}</strong></td>
              <td style="color: var(--ink-soft);">${r.scope}</td>
              <td data-pol="good">${cell(r.judicial)}</td>
              <td data-pol="good">${cell(r.appeal)}</td>
              <td data-pol="bad">${cell(r.userCrim)}</td>
              <td data-pol="bad">${cell(r.block)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <p style="font-size: 12px; color: var(--ink-faded); margin-top: 12px; line-height: 1.5;">
      EFF and the Danish think tank Justitia have documented that at least 13 countries (including Russia, Turkey, Venezuela, Singapore, Malaysia, Australia, and India) have copied the NetzDG model <em>without its legal safeguards</em> — without judicial oversight, without transparency requirements, without appeal procedures. In the 'Judicial oversight' and 'Right of appeal' columns, 'Yes' is good (green); in the 'Criminal liability for users' and 'Website blocking' columns, 'Yes' is a risk (red).
    </p>
  `;
};
