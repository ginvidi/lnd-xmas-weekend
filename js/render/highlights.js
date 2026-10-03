window.App = window.App || {};

window.App.renderHighlights = function renderHighlights(container, content) {
  const { highlights } = content;

  const cardsHtml = highlights.items
    .map(
      (item) => `
      <div class="highlight-card">
        <div class="highlight-card__icon">${item.icon}</div>
        <h3 class="highlight-card__title">${item.title}</h3>
        <p class="highlight-card__desc">${item.desc}</p>
      </div>`
    )
    .join('');

  container.innerHTML = `
    <div class="wrap">
      <div class="highlights__head">
        <span class="eyebrow">Da vivere</span>
        <h2 class="highlights__title" id="highlights-title">${highlights.title}</h2>
      </div>
      <div class="highlights__grid">${cardsHtml}</div>
    </div>
  `;
};
