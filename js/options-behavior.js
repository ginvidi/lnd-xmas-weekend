window.App = window.App || {};

/* Comportamento delle schede-opzione: click e frecce sinistra/destra.
   Delegazione sul container, quindi va chiamata dopo il render. */
window.App.initOptions = function initOptions(container) {
  function select(tab) {
    const choice = tab.closest('[data-choice]');
    choice.querySelectorAll('[role="tab"]').forEach((t) => {
      const active = t === tab;
      t.setAttribute('aria-selected', String(active));
      t.tabIndex = active ? 0 : -1;
      choice.querySelector(`#${t.getAttribute('aria-controls')}`).hidden = !active;
    });
  }

  container.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (tab) select(tab);
  });

  container.addEventListener('keydown', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;

    const tabs = [...tab.parentElement.querySelectorAll('[role="tab"]')];
    const step = e.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(tabs.indexOf(tab) + step + tabs.length) % tabs.length];
    next.focus();
    select(next);
  });
};
