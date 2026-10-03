window.App = window.App || {};

/* Sostituisce {chiave} con i valori: 'stelle {n}' → 'stelle 5'. */
window.App.fmt = function fmt(text, vars = {}) {
  return String(text).replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
};

const isBonusMission = (m) => !!(m.optional || m.choice);

window.App.renderMissionsHero = function renderMissionsHero(container, missions) {
  const { hero, rules } = missions;

  container.innerHTML = `
    <div class="wrap">
      <div class="hero__badge">${hero.badge}</div>
      <h1 class="hero__title">${hero.title}</h1>
      <p class="hero__subtitle">${hero.subtitle}</p>
      <div class="starbar" id="star-bar" role="status" aria-live="polite">
        <span aria-hidden="true">⭐</span>
        ${hero.starsLabel}
        <strong><span id="star-count">0</span> / <span id="star-max">0</span></strong>
      </div>
      <ul class="rules">${rules.map((r) => `<li>${r}</li>`).join('')}</ul>
    </div>
  `;
};

function renderGameItem(item, ui) {
  if (item && typeof item === 'object') {
    const word = item.en.replace(/"/g, '&quot;');
    return `
      <li class="game-item game-item--phrase">
        <label>
          <input type="checkbox" class="game-check">
          <span class="game-text">
            <span class="phrase-en" lang="en-GB">${item.en}</span>
            <span class="phrase-it">${item.it} · <em>${item.say}</em></span>
          </span>
        </label>
        <button type="button" class="phrase-audio" data-say="${word}"
                aria-label="${window.App.fmt(ui.audioLabel, { word })}">🔊</button>
      </li>`;
  }
  return `
    <li class="game-item">
      <label>
        <input type="checkbox" class="game-check">
        <span class="game-text">${item}</span>
      </label>
    </li>`;
}

function renderMission(m, ui) {
  const { fmt } = window.App;
  const badge = m.choice
    ? `<span class="mcard__badge mcard__badge--choice">${fmt(ui.choiceBadge, { choice: m.choice })}</span>`
    : m.optional
      ? `<span class="mcard__badge">${ui.optionalBadge}</span>`
      : '';

  return `
    <article class="mcard" data-mission="${m.id}" data-stars="${m.stars}"${isBonusMission(m) ? ' data-bonus' : ''}>
      <h3 class="mcard__head-wrap">
        <button class="mcard__head" type="button" id="mbtn-${m.id}"
                aria-expanded="false" aria-controls="mpanel-${m.id}">
          <span class="mcard__icon" aria-hidden="true">${m.icon}</span>
          <span class="mcard__info">
            <span class="mcard__title">${m.title}</span>
            <span class="mcard__meta">
              <span class="mcard__stars">${fmt(ui.missionStars, { stars: m.stars })}</span>
              ${badge}
            </span>
          </span>
          <span class="mcard__check" aria-hidden="true">✓</span>
          <span class="mcard__toggle" aria-hidden="true">▾</span>
        </button>
      </h3>
      <div class="mcard__body" id="mpanel-${m.id}" role="region" aria-labelledby="mbtn-${m.id}" hidden>
        <p class="mcard__location">${m.location}</p>
        <p class="mcard__desc">${m.desc}</p>
        <div class="mgame">
          <div class="mgame__head">
            <strong id="game-title-${m.id}">${m.game.title}</strong>
            <span class="mgame__progress" aria-live="polite"></span>
          </div>
          <ul class="mgame__list" aria-labelledby="game-title-${m.id}">
            ${m.game.items.map((item) => renderGameItem(item, ui)).join('')}
          </ul>
        </div>
        ${m.bonus ? `<p class="mcard__bonus">${m.bonus}</p>` : ''}
        <div class="mcard__actions">
          <button class="mbtn" type="button">${ui.btnComplete}</button>
        </div>
      </div>
    </article>`;
}

window.App.renderMissions = function renderMissions(container, missions) {
  const { days, ui, missions: list } = missions;
  const { fmt } = window.App;

  const groupsHtml = days
    .map((day) => {
      const cards = list.filter((m) => m.day === day.id);
      if (!cards.length) return '';
      return `
        <div class="mgroup">
          <h3 class="mgroup__label">${day.label}</h3>
          <div class="mgroup__grid">${cards.map((m) => renderMission(m, ui)).join('')}</div>
        </div>`;
    })
    .join('');

  container.innerHTML = `
    <div class="wrap">
      <div class="missions__head">
        <span class="eyebrow">Missione per missione</span>
        <h2 class="missions__title" id="missions-title">${fmt(ui.sectionTitle, { count: list.length })}</h2>
        <p class="missions__intro">${fmt(ui.sectionIntro, { bonus: list.filter(isBonusMission).length })}</p>
      </div>
      <p class="missions__all-done" id="all-done" hidden>${ui.allDone}</p>
      ${groupsHtml}
    </div>
  `;
};

window.App.renderProgressTools = function renderProgressTools(container, missions) {
  const { ui } = missions;

  container.innerHTML = `
    <div class="wrap">
      <div class="tools" role="group" aria-labelledby="tools-title">
        <h2 class="tools__title" id="tools-title">${ui.toolsTitle}</h2>
        <div class="tools__buttons">
          <button class="tools__btn" type="button" data-act="save">${ui.btnBackupSave}</button>
          <button class="tools__btn" type="button" data-act="load">${ui.btnBackupLoad}</button>
          <button class="tools__btn tools__btn--danger" type="button" data-act="reset">${ui.btnReset}</button>
        </div>
        <input type="file" accept="application/json,.json" hidden data-role="file">
        <p class="tools__status" role="status" aria-live="polite"></p>
      </div>
    </div>
  `;
};
