window.App = window.App || {};

window.App.renderInfo = function renderInfo(container, content) {
  const { info } = content;

  const columnsHtml = info.columns
    .map(
      (col) => `
      <div class="info-card">
        <h3 class="info-card__title">${col.icon} ${col.title}</h3>
        <ul>${col.items.map((i) => `<li>${i}</li>`).join('')}</ul>
      </div>`
    )
    .join('');

  container.innerHTML = `
    <div class="wrap">
      <div class="info__head">
        <span class="eyebrow">Prima di partire</span>
        <h2 class="info__title" id="info-title">${info.title}</h2>
      </div>
      <div class="info__grid">${columnsHtml}</div>
    </div>
  `;
};
