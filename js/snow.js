window.App = window.App || {};

/* Effetto neve leggero: pochi fiocchi, opacità bassa, solo un tocco. */
window.App.initSnow = function initSnow(container, count) {
  const flakeCount = count || 24;
  const glyphs = ['❄', '❅', '❆'];

  for (let i = 0; i < flakeCount; i++) {
    const flake = document.createElement('span');
    flake.className = 'snow__flake';
    flake.textContent = glyphs[i % glyphs.length];

    const size = 10 + Math.random() * 14;
    const left = Math.random() * 100;
    const duration = 10 + Math.random() * 14;
    const delay = Math.random() * -20;

    flake.style.left = `${left}vw`;
    flake.style.fontSize = `${size}px`;
    flake.style.animationDuration = `${duration}s`;
    flake.style.animationDelay = `${delay}s`;

    container.appendChild(flake);
  }
};
