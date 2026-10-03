window.App = window.App || {};

/* Progressi delle missioni salvati nel browser (localStorage), quindi
   restano sul telefono anche chiudendo la pagina. Stessa struttura del
   gioco di Amsterdam: { version, missions: { id: { completed, earned,
   checks[], expanded } } }. */
window.App.store = (function createStore() {
  const KEY = 'london-explorer:v1';
  const VERSION = 1;

  let available = null;
  function isAvailable() {
    if (available !== null) return available;
    try {
      const probe = '__le_probe__';
      localStorage.setItem(probe, probe);
      localStorage.removeItem(probe);
      available = true;
    } catch {
      available = false;
    }
    return available;
  }

  const empty = () => ({ version: VERSION, missions: {} });
  const isObject = (v) => !!v && typeof v === 'object';

  let state = empty();
  let loaded = false;

  function load() {
    if (loaded) return state;
    loaded = true;
    if (!isAvailable()) return state;
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (isObject(saved) && saved.version === VERSION && isObject(saved.missions)) {
        state = { ...empty(), missions: saved.missions };
      }
    } catch {
      state = empty();
    }
    return state;
  }

  function writeNow() {
    if (!isAvailable()) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* spazio esaurito o storage bloccato: pazienza */
    }
  }

  let timer = null;
  function persist() {
    clearTimeout(timer);
    timer = setTimeout(writeNow, 300);
  }
  /* Se si cambia pagina subito dopo un tap, il salvataggio non va perso. */
  window.addEventListener('pagehide', () => {
    if (timer) {
      clearTimeout(timer);
      writeNow();
    }
  });

  function mission(id) {
    load();
    if (!state.missions[id]) {
      state.missions[id] = { completed: false, earned: 0, checks: [], expanded: false };
    }
    return state.missions[id];
  }

  return {
    isAvailable,
    load,
    mission,
    setExpanded(id, expanded) {
      mission(id).expanded = !!expanded;
      persist();
    },
    setCheck(id, index, checked) {
      mission(id).checks[index] = !!checked;
      persist();
    },
    setCompleted(id, completed, earned = 0) {
      const m = mission(id);
      m.completed = !!completed;
      m.earned = completed ? earned : 0;
      persist();
    },
    totalEarned() {
      load();
      return Object.values(state.missions).reduce(
        (sum, m) => sum + (m && m.completed ? Number(m.earned) || 0 : 0),
        0
      );
    },
    reset() {
      state = empty();
      clearTimeout(timer);
      timer = null;
      if (isAvailable()) {
        try {
          localStorage.removeItem(KEY);
        } catch {
          /* niente da fare */
        }
      }
    },
    exportJson() {
      return JSON.stringify(state, null, 2);
    },
    isValidBackup(data) {
      return isObject(data) && isObject(data.missions);
    },
    importBackup(data) {
      state = { ...empty(), missions: data.missions };
      writeNow();
    },
  };
})();
