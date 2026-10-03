window.App = window.App || {};

/* Barra di navigazione condivisa tra le pagine. Su schermi stretti i link
   finiscono in un menu a tendina aperto dal pulsante "burger". */
const NAV_PAGES = [
  { id: 'itinerary', href: 'index.html', icon: '📅', label: 'Itinerario' },
  { id: 'missions', href: 'missioni.html', icon: '🎯', label: 'Missioni' },
];

window.App.renderNav = function renderNav(container, activeId) {
  const linksHtml = NAV_PAGES.map(
    (p) => `
      <li>
        <a class="topnav__link" href="${p.href}"${p.id === activeId ? ' aria-current="page"' : ''}>
          <span aria-hidden="true">${p.icon}</span> ${p.label}
        </a>
      </li>`
  ).join('');

  container.innerHTML = `
    <div class="topnav__inner">
      <a class="topnav__brand" href="index.html">❄ Londra</a>
      <a class="topnav__stars" href="missioni.html" aria-label="Stelle conquistate nelle missioni">
        ⭐ <span data-nav-stars>0</span>
      </a>
      <button class="topnav__burger" type="button" aria-expanded="false"
              aria-controls="topnav-menu" aria-label="Apri il menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="topnav__menu" id="topnav-menu">${linksHtml}</ul>
    </div>
  `;

  const burger = container.querySelector('.topnav__burger');
  const starsEl = container.querySelector('[data-nav-stars]');

  function setOpen(open) {
    container.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
  }

  burger.addEventListener('click', () => setOpen(!container.classList.contains('is-open')));
  container.querySelectorAll('.topnav__link').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && container.classList.contains('is-open')) {
      setOpen(false);
      burger.focus();
    }
  });

  const updateStars = () => {
    starsEl.textContent = window.App.store.totalEarned();
  };
  updateStars();
  document.addEventListener('stars:change', updateStars);
};
