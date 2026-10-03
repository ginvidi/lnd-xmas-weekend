window.App = window.App || {};

window.App.renderFooter = function renderFooter(container, content) {
  const { footer } = content;

  container.innerHTML = `
    <div class="wrap">
      ${footer.lines.map((line) => `<p class="footer__line">${line}</p>`).join('')}
    </div>
  `;
};
