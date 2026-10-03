window.App = window.App || {};

window.App.renderHero = function renderHero(container, content) {
  const { hero } = content;

  const metaHtml = hero.meta
    .map(
      (m) => `
      <div class="hero__meta-item">
        <span>${m.icon}</span>
        <span>${m.label}: <strong>${m.value}</strong></span>
      </div>`
    )
    .join('');

  container.innerHTML = `
    <div class="wrap">
      <div class="hero__badge">${hero.badge}</div>
      <h1 class="hero__title">${hero.title}</h1>
      <p class="hero__subtitle">${hero.subtitle}</p>
      <div class="hero__meta">${metaHtml}</div>
      <div class="hero__divider">✦ ✦ ✦</div>
    </div>
  `;
};
