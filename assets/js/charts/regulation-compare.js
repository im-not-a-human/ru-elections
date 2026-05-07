// Democratic regulators compared with RU framework. Renders as HTML table.
// Полярность: judicial/appeal — «Есть» это хорошо (зелёный); userCrim/block —
// «Есть» это риск/плохо (красный). Цвет ставится через data-pol на td.
window.renderRegulationCompare = function () {
  const wrap = $('#regulationCompare');
  if (!wrap || typeof REG_COMPARE === 'undefined') return;

  const cellMap = {
    yes: { cls: 'yes', text: 'Есть' },
    no: { cls: 'no', text: 'Нет' },
    partial: { cls: 'na', text: 'Частично' },
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
            <th>Регулирование</th>
            <th>Что регулирует</th>
            <th>Судебный надзор</th>
            <th>Право апелляции</th>
            <th>Уголовная отв-сть пользователя</th>
            <th>Блокировки сайтов</th>
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
      EFF и датский think tank Justitia зафиксировали, что не менее 13 стран (включая Россию, Турцию, Венесуэлу, Сингапур, Малайзию, Австралию, Индию) копировали NetzDG, но <em>без его правовых гарантий</em> — без судебного надзора, без требований прозрачности, без процедур апелляции. Цвет в столбцах «Судебный надзор» и «Право апелляции» — «Есть» это хорошо (зелёный); в столбцах «Уголовная отв-сть пользователя» и «Блокировки сайтов» — «Есть» это риск (красный).
    </p>
  `;
};
