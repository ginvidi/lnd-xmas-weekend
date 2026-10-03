window.App = window.App || {};

/* Logica del gioco, come per Amsterdam:
   - si spuntano le caselle della missione (salvate subito);
   - per completarla serve almeno metà delle caselle;
   - le stelle guadagnate sono proporzionali alle caselle spuntate;
   - le missioni facoltative/a scelta danno stelle bonus, fuori dal totale. */
window.App.initMissions = function initMissions(container, missions) {
  const { store, fmt } = window.App;
  const { ui } = missions;

  const cards = [...container.querySelectorAll('.mcard')];
  const countEl = document.getElementById('star-count');
  const maxEl = document.getElementById('star-max');
  const barEl = document.getElementById('star-bar');
  const allDoneEl = document.getElementById('all-done');

  const isCore = (card) => !card.hasAttribute('data-bonus');
  const idOf = (card) => card.dataset.mission;

  maxEl.textContent = cards.filter(isCore).reduce((sum, c) => sum + Number(c.dataset.stars), 0);

  function updateTotals() {
    const total = cards.reduce(
      (sum, c) => sum + (c.classList.contains('is-done') ? Number(c.dataset.earned || 0) : 0),
      0
    );
    const allCoreDone = cards.filter(isCore).every((c) => c.classList.contains('is-done'));
    countEl.textContent = total;
    barEl.classList.toggle('is-complete', allCoreDone);
    allDoneEl.hidden = !allCoreDone;
    document.dispatchEvent(new CustomEvent('stars:change'));
  }

  function setExpanded(card, open, { persist = true } = {}) {
    card.querySelector('.mcard__head').setAttribute('aria-expanded', String(open));
    card.querySelector('.mcard__body').hidden = !open;
    if (persist) store.setExpanded(idOf(card), open);
  }

  function showDone(card, { earned, done, total }) {
    card.dataset.earned = String(earned);
    card.classList.add('is-done');

    const btn = card.querySelector('.mbtn');
    btn.disabled = true;
    btn.textContent =
      total && done < total
        ? fmt(ui.btnDonePartial, { stars: earned, max: card.dataset.stars, done, total })
        : fmt(ui.btnDoneFull, { stars: earned });

    if (!card.querySelector('.mbtn-undo')) {
      const undo = document.createElement('button');
      undo.type = 'button';
      undo.className = 'mbtn-undo';
      undo.textContent = ui.btnUndo;
      undo.addEventListener('click', () => {
        showPending(card);
        store.setCompleted(idOf(card), false);
        updateTotals();
      });
      btn.insertAdjacentElement('afterend', undo);
    }
  }

  function showPending(card) {
    delete card.dataset.earned;
    card.classList.remove('is-done');
    const btn = card.querySelector('.mbtn');
    btn.disabled = false;
    btn.textContent = ui.btnComplete;
    card.querySelector('.mbtn-undo')?.remove();
  }

  cards.forEach((card) => {
    const id = idOf(card);
    const saved = store.mission(id);
    const stars = Number(card.dataset.stars);
    const checks = [...card.querySelectorAll('.game-check')];
    const progress = card.querySelector('.mgame__progress');
    const btn = card.querySelector('.mbtn');
    const minChecks = Math.ceil(checks.length / 2);
    const checkedCount = () => checks.filter((c) => c.checked).length;

    let errorEl = null;
    const clearError = () => {
      errorEl?.remove();
      errorEl = null;
    };
    const showError = () => {
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'mgame__error';
        errorEl.setAttribute('role', 'alert');
        btn.parentElement.insertAdjacentElement('beforebegin', errorEl);
      }
      errorEl.textContent = fmt(ui.thresholdError, { min: minChecks, total: checks.length, have: checkedCount() });
    };
    const updateProgress = () => {
      progress.textContent = fmt(ui.gameProgress, { done: checkedCount(), total: checks.length });
    };

    function complete({ persist = true } = {}) {
      const done = checkedCount();
      const earned = checks.length ? Math.round((stars * done) / checks.length) : stars;
      showDone(card, { earned, done, total: checks.length });
      if (persist) store.setCompleted(id, true, earned);
      updateTotals();
    }

    checks.forEach((check, i) => {
      check.checked = !!saved.checks[i];
      check.addEventListener('change', () => {
        store.setCheck(id, i, check.checked);
        updateProgress();
        if (errorEl && checkedCount() >= minChecks) clearError();
      });
    });
    updateProgress();

    card.querySelector('.mcard__head').addEventListener('click', () => {
      setExpanded(card, card.querySelector('.mcard__body').hidden);
    });

    btn.addEventListener('click', () => {
      if (checkedCount() < minChecks) {
        showError();
        return;
      }
      clearError();
      complete();
    });

    if (saved.expanded) setExpanded(card, true, { persist: false });
    if (saved.completed) complete({ persist: false });
  });

  initSpeech(container);
  updateTotals();
};

/* Pulsanti 🔊: leggono la frase con la voce inglese del telefono. */
function initSpeech(container) {
  const buttons = [...container.querySelectorAll('.phrase-audio')];
  const synth = window.speechSynthesis;

  if (!synth || typeof window.SpeechSynthesisUtterance === 'undefined') {
    buttons.forEach((b) => (b.hidden = true));
    return;
  }

  const englishVoice = () => {
    const voices = synth.getVoices();
    return (
      voices.find((v) => (v.lang || '').toLowerCase() === 'en-gb') ||
      voices.find((v) => (v.lang || '').toLowerCase().startsWith('en')) ||
      null
    );
  };

  buttons.forEach((b) => {
    b.addEventListener('click', () => {
      synth.cancel();
      const u = new SpeechSynthesisUtterance(b.dataset.say);
      u.lang = 'en-GB';
      u.rate = 0.85;
      const voice = englishVoice();
      if (voice) u.voice = voice;
      const stop = () => b.classList.remove('is-speaking');
      u.onend = stop;
      u.onerror = stop;
      b.classList.add('is-speaking');
      synth.speak(u);
    });
  });
}

/* Salva/carica una copia dei progressi (utile per cambiare telefono)
   e azzeramento totale. */
window.App.initProgressTools = function initProgressTools(container, missions) {
  const { store } = window.App;
  const { ui } = missions;
  const status = container.querySelector('.tools__status');
  const fileInput = container.querySelector('[data-role="file"]');

  const say = (text, warn = false) => {
    status.textContent = text;
    status.classList.toggle('is-warn', warn);
  };

  if (!store.isAvailable()) say(ui.storageWarning, true);

  container.querySelector('[data-act="save"]').addEventListener('click', () => {
    const blob = new Blob([store.exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'londra-missioni-backup.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  container.querySelector('[data-act="load"]').addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    fileInput.value = '';
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (!store.isValidBackup(data)) throw new Error('formato non valido');
      store.importBackup(data);
      say(ui.backupLoaded);
      setTimeout(() => location.reload(), 400);
    } catch {
      say(ui.backupLoadError, true);
    }
  });

  container.querySelector('[data-act="reset"]').addEventListener('click', () => {
    if (confirm(ui.resetConfirm)) {
      store.reset();
      location.reload();
    }
  });
};
