// Modal opener for digital-timeline events.
window.openDigitalEventModal = function (id) {
  if (typeof DIGITAL_TIMELINE === 'undefined') return;
  const ev = DIGITAL_TIMELINE.find(e => e.id === id);
  if (!ev) return;

  const kindLabels = {
    law:       { text: 'Закон / нормативный акт', cls: 'civil' },
    tech:      { text: 'Техническое событие',     cls: 'digital' },
    event:     { text: 'Публичное событие',       cls: 'civil' },
    statement: { text: 'Заявление',                cls: 'digital' },
  };
  const k = kindLabels[ev.kind] || kindLabels.event;
  const detailsHtml = (ev.details || ev.summary || '')
    .split('\n\n')
    .map(p => `<p>${p}</p>`)
    .join('');
  const sourcesHtml = (ev.sources || [])
    .map(s => `<a href="${s.url}" target="_blank" rel="noopener" class="source-link">${s.name}</a>`)
    .join('');

  const content = $('#modalContent');
  if (!content) return;
  content.innerHTML = `
    <div class="modal-header">
      <span class="modal-tag ${k.cls}">${k.text}</span>
      <h2 class="modal-title">${ev.title}</h2>
      <div class="modal-meta">
        <div class="modal-meta-item mono">${ev.date}</div>
      </div>
    </div>
    <div class="modal-content">
      <div class="modal-section">
        <div class="modal-section-label">Краткое описание</div>
        <div class="modal-text"><p>${ev.summary}</p></div>
      </div>
      ${ev.details ? `
        <div class="modal-section">
          <div class="modal-section-label">Подробнее</div>
          <div class="modal-text">${detailsHtml}</div>
        </div>
      ` : ''}
      ${sourcesHtml ? `
        <div class="modal-section">
          <div class="modal-section-label">Источники</div>
          <div class="modal-sources">${sourcesHtml}</div>
        </div>
      ` : ''}
    </div>
  `;
  openModal();
};

// Modal opener for contradiction matrix rows. Uses generic modal framework.
window.openContradictionModal = function (id) {
  if (typeof CONTRADICTIONS === 'undefined') return;
  const c = CONTRADICTIONS.find(x => x.id === id);
  if (!c) return;

  const content = $('#modalContent');
  if (!content) return;

  const tagLabel = (CONTRADICTION_TAGS || []).find(t => t.id === c.tag);
  const tagText = tagLabel ? tagLabel.label : c.tag;

  content.innerHTML = `
    <div class="modal-header">
      <span class="modal-tag" style="background: var(--bg-paper); color: var(--ink-soft); border: 1px solid var(--line);">${tagText}</span>
      <h2 class="modal-title">№ ${c.id}. ${c.actual}</h2>
    </div>
    <div class="modal-content">
      <div class="modal-section">
        <div class="modal-section-label">Официальная логика</div>
        <div class="modal-text"><p>${c.declared}</p></div>
      </div>

      <div class="modal-section">
        <div class="modal-section-label">Наблюдаемая реализация</div>
        <div class="modal-text"><p>${c.actual}</p></div>
      </div>

      <div class="modal-section">
        <div class="modal-section-label">Почему это противоречие</div>
        <div class="modal-text"><p style="color: var(--accent); font-style: italic;">${c.contradiction}</p></div>
      </div>

      <div class="modal-section">
        <div class="modal-section-label">Подробнее</div>
        <div class="modal-text"><p>${c.detail}</p></div>
      </div>

      <div class="modal-section">
        <div class="modal-section-label">Источники</div>
        <div class="modal-sources">
          ${c.sources.map(s => `<a href="${s.url}" target="_blank" rel="noopener" class="source-link">${s.name}</a>`).join('')}
        </div>
      </div>
    </div>
  `;
  openModal();
};
