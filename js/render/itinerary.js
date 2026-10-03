window.App = window.App || {};

function renderBlock(b) {
  return `
    <div class="block">
      <div class="block__time">${b.time}</div>
      <div>
        <div class="block__title"><span class="block__icon">${b.icon}</span>${b.title}</div>
        <p class="block__desc">${b.desc}</p>
      </div>
    </div>`;
}

function renderChoice(choice, id) {
  const tabsHtml = choice.options
    .map(
      (opt, i) => `
      <button class="choice__tab" role="tab" type="button"
              id="${id}-tab-${i}" aria-controls="${id}-panel-${i}"
              aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
        ${opt.label}${opt.recommended ? '<span class="choice__badge">Consigliata</span>' : ''}
      </button>`
    )
    .join('');

  const panelsHtml = choice.options
    .map(
      (opt, i) => `
      <div class="choice__panel" role="tabpanel"
           id="${id}-panel-${i}" aria-labelledby="${id}-tab-${i}" ${i === 0 ? '' : 'hidden'}>
        <p class="choice__summary">${opt.summary}</p>
        ${opt.blocks.map(renderBlock).join('')}
      </div>`
    )
    .join('');

  return `
    <div class="choice" data-choice>
      <div class="choice__title">${choice.title}</div>
      <div class="choice__tabs" role="tablist" aria-label="${choice.title}">${tabsHtml}</div>
      ${panelsHtml}
    </div>`;
}

window.App.renderItinerary = function renderItinerary(container, content) {
  const { itinerary } = content;

  const daysHtml = itinerary.days
    .map((day, dayIndex) => {
      const itemsHtml = day.items
        .map((item, itemIndex) =>
          item.type === 'choice'
            ? renderChoice(item, `choice-${dayIndex}-${itemIndex}`)
            : renderBlock(item)
        )
        .join('');

      const noteHtml = day.note
        ? `<div class="callout"><span class="callout__icon">${day.note.icon}</span><p>${day.note.text}</p></div>`
        : '';

      return `
        <article class="day-card">
          <div class="day-card__header">
            <span class="day-card__number">${day.number}</span>
            <span class="day-card__label">${day.label}</span>
            <span class="day-card__theme">${day.theme}</span>
            <span class="day-card__date">${day.date}</span>
          </div>
          ${noteHtml}
          <div class="day-card__blocks">${itemsHtml}</div>
        </article>`;
    })
    .join('');

  container.innerHTML = `
    <div class="wrap">
      <div class="itinerary__head">
        <span class="eyebrow">Giorno per giorno</span>
        <h2 class="itinerary__title" id="itinerary-title">${itinerary.title}</h2>
        <p class="itinerary__intro">${itinerary.intro}</p>
      </div>
      <div class="itinerary__days">${daysHtml}</div>
    </div>
  `;
};
