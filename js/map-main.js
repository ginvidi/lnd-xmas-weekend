/* Pagina mappa: Leaflet con i segnaposto numerati (due colori, uno per
   categoria), lista laterale cliccabile, posizione dal GPS del telefono
   e link ai percorsi a piedi su Google Maps. Sopra, in rosso, i bus
   che passano sotto le luci (map-buses.js), ognuno si può nascondere. */
(function main() {
  const content = window.CONTENT;
  const map = window.MAP_CONTENT;
  const buses = window.MAP_BUSES;
  const $ = (id) => document.getElementById(id);

  document.title = map.meta.title;
  window.App.renderNav($('topnav'), 'map');
  window.App.renderFooter($('footer'), content);

  // I numeri seguono l'ordine della lista in map-content.js; i posti senza
  // giro (musei) non hanno numero ma un'icona. `key` identifica ogni posto.
  let count = 0;
  map.places.forEach((p, i) => {
    p.key = String(i);
    if (p.route) p.n = ++count;
  });
  const sights = map.places.filter((p) => !p.route);

  // Il pallino di un posto: il numero colorato, o l'icona per i musei.
  const badge = (p, extra = '') =>
    p.n
      ? `<span class="mapnum mapnum--${p.type}${extra}">${p.n}</span>`
      : `<span class="mapnum mapnum--icon${extra}">${p.icon}</span>`;
  const placesOf = (routeId) => map.places.filter((p) => p.route === routeId);

  // Nome del file su Commons, ricavato dall'URL dell'anteprima
  // (.../thumb/a/ab/<file>/500px-<file>) o dell'originale (.../a/ab/<file>).
  function photoPage(url) {
    const parts = url.split('/');
    const file = url.includes('/thumb/') ? parts[parts.length - 2] : parts[parts.length - 1];
    return `https://commons.wikimedia.org/wiki/File:${file}`;
  }

  /* ── Link Google Maps ─────────────────────────────────────── */
  // Il formato /maps/dir/A/B/C apre le indicazioni con tutte le tappe
  // (fino a 10) sia nel browser sia nell'app; 3e2 = a piedi, 3e3 = mezzi.
  function routeUrl(route) {
    const stops = placesOf(route.id).map((p) => encodeURIComponent(p.gmaps));
    if (stops.length === 1) return placeUrl(placesOf(route.id)[0]);
    const mode = route.mode === 'transit' ? '3e3' : '3e2';
    return `https://www.google.com/maps/dir/${stops.join('/')}/data=!4m2!4m1!${mode}`;
  }

  function placeUrl(p) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.gmaps)}`;
  }

  async function share(title, url, button) {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* condivisione annullata */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      flash(button, 'Link copiato ✓');
    } catch {
      window.prompt('Copia il link:', url);
    }
  }

  function flash(button, text) {
    const original = button.textContent;
    button.textContent = text;
    setTimeout(() => (button.textContent = original), 1800);
  }

  /* ── Lista laterale ───────────────────────────────────────── */
  const side = $('map-side');
  side.innerHTML = `
    <div class="mapside__head">
      <p class="eyebrow">🎄 Mappa</p>
      <h1 class="mapside__title">${map.intro.title}</h1>
      <p class="mapside__text">${map.intro.text}</p>
      <div class="mapside__filters" role="group" aria-label="Mostra sulla mappa">
        ${Object.entries(map.categories)
          .map(
            ([type, c]) => `
          <button class="mapfilter mapfilter--${type}" type="button" data-filter="${type}" aria-pressed="true">
            <span class="mapfilter__dot" aria-hidden="true"></span>${c.label}
          </button>`
          )
          .join('')}
        <button class="mapfilter mapfilter--bus" type="button" data-bus-all aria-pressed="true">
          <span class="mapfilter__dot" aria-hidden="true"></span>Bus
        </button>
      </div>
      <div class="mapsearch">
        <label class="mapsearch__label" for="map-search">Cerca un posto</label>
        <input class="mapsearch__input" id="map-search" type="search" autocomplete="off"
               placeholder="🔍 Cerca: garden, harry potter, mercatino…">
        <p class="mapsearch__count" id="map-search-count" role="status" aria-live="polite"></p>
      </div>
    </div>
    ${map.routes
      .map(
        (r) => `
      <section class="maproute" data-section aria-labelledby="route-${r.id}">
        <div class="maproute__head">
          <h2 class="maproute__title" id="route-${r.id}">${r.title}</h2>
          <p class="maproute__when">${r.when}</p>
          <p class="maproute__desc">${r.desc}</p>
          <div class="maproute__actions">
            <a class="mapbtn mapbtn--primary" href="${routeUrl(r)}" target="_blank" rel="noopener">🧭 Apri in Google Maps</a>
            <button class="mapbtn" type="button" data-share="${r.id}">🔗 Condividi</button>
          </div>
        </div>
        <ol class="maplist">${placesOf(r.id).map(listItem).join('')}</ol>
      </section>`
      )
      .join('')}
    <section class="maproute" aria-labelledby="route-buses">
      <div class="maproute__head">
        <h2 class="maproute__title" id="route-buses">🚌 ${buses.title}</h2>
        <p class="maproute__desc">${buses.desc}</p>
        <p class="mapclosed"><strong>🚧 ${buses.closed.title}.</strong> ${buses.closed.text}</p>
      </div>
      <ul class="maplist">
        ${buses.routes
          .map(
            (b) => `
          <li class="maplist__item">
            <button class="maplist__btn mapbus" type="button" data-bus="${b.n}" aria-pressed="true">
              <span class="busnum">${b.n}</span>
              <span class="maplist__body">
                <span class="maplist__name">${b.title}</span>
                <span class="maplist__meta">${b.desc}</span>
              </span>
              <span class="mapbus__state" aria-hidden="true"></span>
            </button>
          </li>`
          )
          .join('')}
      </ul>
    </section>
    <section class="maproute" data-section aria-labelledby="route-sights">
      <div class="maproute__head">
        <h2 class="maproute__title" id="route-sights">${map.sights.title}</h2>
        <p class="maproute__desc">${map.sights.desc}</p>
      </div>
      <ul class="maplist">${sights.map(listItem).join('')}</ul>
    </section>
  `;

  function listItem(p) {
    const cat = map.categories[p.type];
    return `
      <li class="maplist__item" data-type="${p.type}">
        <button class="maplist__btn" type="button" data-place="${p.key}">
          ${badge(p)}
          <span class="maplist__body">
            <span class="maplist__name">${p.name}</span>
            <span class="maplist__meta">${cat.icon} ${cat.label}<span class="maplist__dist" data-dist="${p.key}"></span></span>
          </span>
        </button>
      </li>`;
  }

  /* ── Mappa ────────────────────────────────────────────────── */
  const lmap = L.map('map', { zoomControl: false, tap: false });
  L.control.zoom({ position: 'bottomright' }).addTo(lmap);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(lmap);

  // Linee tratteggiate che uniscono le tappe di ogni giro, nell'ordine dei numeri.
  map.routes.forEach((r) => {
    const pts = placesOf(r.id).map((p) => [p.lat, p.lng]);
    if (pts.length > 1) {
      L.polyline(pts, { color: '#1c2e4a', weight: 3, opacity: 0.55, dashArray: '2 8', lineCap: 'round' }).addTo(lmap);
    }
  });

  /* ── Bus ──────────────────────────────────────────────────── */
  // Rosso dei bus di Londra con un bordo bianco, in un pannello sotto le
  // linee dei giri a piedi e sotto i segnaposto. Il numero del bus compare
  // in due punti della linea.
  lmap.createPane('buses').style.zIndex = 390;
  const busLayer = L.layerGroup().addTo(lmap);
  const busRoutes = new Map();
  const busPopup = (b) => `
    <div class="mappop"><div class="mappop__body">
      <p class="mappop__cat mappop__cat--bus">🚌 Bus</p>
      <h3 class="mappop__name"><span class="busnum busnum--sm">${b.n}</span> ${b.title}</h3>
      <p class="mappop__what">${b.desc}</p>
    </div></div>`;

  buses.routes.forEach((b) => {
    const casing = L.polyline(b.path, { pane: 'buses', color: '#fff', weight: 8, opacity: 0.85, interactive: false });
    const line = L.polyline(b.path, { pane: 'buses', color: '#d6261f', weight: 4, opacity: 0.9, lineJoin: 'round' })
      .bindPopup(busPopup(b), { maxWidth: 280, minWidth: 220 });
    line.on('mouseover', () => line.setStyle({ weight: 6, opacity: 1 }));
    line.on('mouseout', () => line.setStyle({ weight: 4, opacity: 0.9 }));
    const labels = [1 / 3, 2 / 3].map((f) =>
      L.marker(b.path[Math.floor(b.path.length * f)], {
        icon: L.divIcon({ className: '', html: `<span class="busnum busnum--pin">${b.n}</span>`, iconSize: [26, 20], iconAnchor: [13, 10] }),
        pane: 'buses',
        keyboard: false,
        title: `Bus ${b.n}`,
      }).bindPopup(busPopup(b), { maxWidth: 280, minWidth: 220 })
    );
    const group = L.layerGroup([casing, line, ...labels]).addTo(busLayer);
    busRoutes.set(b.n, { group, line });
  });

  // Il tratto pedonale di Oxford Street: grigio tratteggiato, niente bus.
  L.polyline(buses.closed.path, { pane: 'buses', color: '#5b6577', weight: 7, opacity: 0.75, dashArray: '1 10', lineCap: 'round' })
    .bindPopup(`<div class="mappop"><div class="mappop__body"><p class="mappop__cat mappop__cat--bus">🚧 Niente bus</p><h3 class="mappop__name">${buses.closed.title}</h3><p class="mappop__what">${buses.closed.text}</p></div></div>`, { maxWidth: 280, minWidth: 220 })
    .addTo(busLayer);

  function toggleBus(btn) {
    const on = btn.getAttribute('aria-pressed') !== 'true';
    const { group, line } = busRoutes.get(btn.dataset.bus);
    btn.setAttribute('aria-pressed', String(on));
    if (!on) return group.remove();
    group.addTo(busLayer);
    // Riaccendendo un bus lo si inquadra, così si vede dove passa.
    if (lmap.hasLayer(busLayer)) {
      if (window.matchMedia('(max-width: 860px)').matches) {
        $('map').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      lmap.fitBounds(line.getBounds(), { padding: [30, 30] });
    }
  }

  const markers = new Map();
  map.places.forEach((p) => {
    const size = p.n ? 32 : 30;
    const icon = L.divIcon({
      className: '',
      html: badge(p, ' mapnum--pin'),
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -14],
    });
    const cat = map.categories[p.type];
    const popup = `
      <div class="mappop">
        ${p.photo
          ? `<img class="mappop__img" src="${p.photo}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'">`
          : ''}
        <div class="mappop__body">
          <p class="mappop__cat mappop__cat--${p.type}">${cat.icon} ${cat.label}</p>
          <h3 class="mappop__name">${badge(p, ' mapnum--sm')} ${p.name}</h3>
          <p class="mappop__what">${p.what}</p>
          <div class="mappop__foot">
            <a href="${placeUrl(p)}" target="_blank" rel="noopener">Apri in Google Maps ↗</a>
            ${p.photo ? `<a class="mappop__credit" href="${photoPage(p.photo)}" target="_blank" rel="noopener">Foto: Wikimedia</a>` : ''}
          </div>
        </div>
      </div>`;
    const marker = L.marker([p.lat, p.lng], { icon, title: p.n ? `${p.n}. ${p.name}` : p.name, riseOnHover: true })
      .bindPopup(popup, { maxWidth: 280, minWidth: 240, autoPanPadding: [24, 24] })
      .addTo(lmap);
    marker.on('popupopen', () => setActive(p.key));
    marker.on('popupclose', () => setActive(null));
    markers.set(p.key, { marker, place: p });
  });

  const allBounds = L.latLngBounds(map.places.map((p) => [p.lat, p.lng]));
  // All'apertura si inquadra solo il centro: con Kew e Greenwich dentro la
  // mappa partirebbe troppo lontana e i numeri del centro si accavallano.
  const startPlaces = map.places.filter((p) => map.startRoutes.includes(p.route));
  const startBounds = L.latLngBounds(startPlaces.map((p) => [p.lat, p.lng]));
  lmap.fitBounds(startBounds, { padding: [20, 20] });

  function setActive(key) {
    side.querySelectorAll('.maplist__btn').forEach((b) => {
      b.classList.toggle('is-active', b.dataset.place === key);
    });
  }

  function openPlace(key) {
    const { marker } = markers.get(key);
    // Su telefono la mappa sta in alto: la riportiamo in vista prima di aprire.
    if (window.matchMedia('(max-width: 860px)').matches) {
      $('map').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Salto diretto, senza animazione: se la mappa sta ancora scorrendo,
    // il popup non riesce a spostarla per farsi spazio e resta tagliato.
    lmap.setView(marker.getLatLng(), Math.max(lmap.getZoom(), 16), { animate: false });
    marker.openPopup();
  }

  side.addEventListener('click', (e) => {
    const placeBtn = e.target.closest('[data-place]');
    if (placeBtn) return openPlace(placeBtn.dataset.place);

    const shareBtn = e.target.closest('[data-share]');
    if (shareBtn) {
      const r = map.routes.find((x) => x.id === shareBtn.dataset.share);
      return share(`${r.title} · Natale a Londra`, routeUrl(r), shareBtn);
    }

    const busBtn = e.target.closest('[data-bus]');
    if (busBtn) return toggleBus(busBtn);

    const busAllBtn = e.target.closest('[data-bus-all]');
    if (busAllBtn) {
      const on = busAllBtn.getAttribute('aria-pressed') !== 'true';
      busAllBtn.setAttribute('aria-pressed', String(on));
      if (on) busLayer.addTo(lmap);
      else busLayer.remove();
      return;
    }

    const filterBtn = e.target.closest('[data-filter]');
    if (filterBtn) {
      const on = filterBtn.getAttribute('aria-pressed') !== 'true';
      filterBtn.setAttribute('aria-pressed', String(on));
      if (on) activeTypes.add(filterBtn.dataset.filter);
      else activeTypes.delete(filterBtn.dataset.filter);
      applyFilters();
    }
  });

  /* ── Filtri e ricerca ─────────────────────────────────────── */
  // Un posto si vede se la sua categoria è attiva e se il testo cercato
  // compare nel nome, nella descrizione, nell'indirizzo o nella categoria
  // (senza badare a maiuscole e accenti). Il nome del giro resta fuori:
  // "garden" troverebbe tutto il giro "Piccadilly e Covent Garden".
  const activeTypes = new Set(Object.keys(map.categories));
  const normalize = (text) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[’']/g, '');

  const searchText = new Map();
  map.places.forEach((p) => {
    const parts = [p.name, p.what, p.gmaps, map.categories[p.type].label];
    searchText.set(p.key, normalize(parts.concat(p.keywords || []).join(' ')));
  });

  const searchInput = $('map-search');
  const searchCount = $('map-search-count');
  searchInput.addEventListener('input', applyFilters);

  // Su telefono la mappa resta fissa in alto e coprirebbe la casella:
  // quando la si tocca la portiamo subito sotto la mappa.
  searchInput.addEventListener('focus', () => {
    if (!window.matchMedia('(max-width: 860px)').matches) return;
    const gap = searchInput.getBoundingClientRect().top - $('map').getBoundingClientRect().bottom - 12;
    if (gap < 0 || gap > 120) window.scrollBy({ top: gap });
  });

  function applyFilters() {
    const words = normalize(searchInput.value).split(/\s+/).filter(Boolean);
    let shown = 0;

    markers.forEach(({ marker, place }, key) => {
      const text = searchText.get(key);
      const visible = activeTypes.has(place.type) && words.every((w) => text.includes(w));
      side.querySelector(`[data-place="${key}"]`).closest('li').hidden = !visible;
      if (visible) {
        shown += 1;
        marker.addTo(lmap);
      } else {
        marker.remove();
      }
    });

    side.querySelectorAll('[data-section]').forEach((section) => {
      section.hidden = !section.querySelector('.maplist__item:not([hidden])');
    });

    if (!words.length) {
      searchCount.textContent = '';
      return;
    }
    searchCount.textContent = shown
      ? `${shown} ${shown === 1 ? 'posto trovato' : 'posti trovati'}`
      : 'Nessun posto trovato. Prova con un’altra parola.';

    // Con pochi risultati la mappa li inquadra tutti.
    const found = [...markers.values()].filter(({ marker }) => lmap.hasLayer(marker));
    if (found.length) {
      lmap.fitBounds(L.latLngBounds(found.map(({ place }) => [place.lat, place.lng])), {
        padding: [40, 40],
        maxZoom: 16,
      });
    }
  }

  /* ── Dove siamo ───────────────────────────────────────────── */
  // Il browser chiede il permesso la prima volta; funziona solo su https
  // (GitHub Pages) o in locale.
  const LocateControl = L.Control.extend({
    options: { position: 'topright' },
    onAdd() {
      const btn = L.DomUtil.create('button', 'maplocate');
      btn.type = 'button';
      btn.innerHTML = '<span aria-hidden="true">📍</span> Dove siamo';
      btn.setAttribute('aria-pressed', 'false');
      L.DomEvent.disableClickPropagation(btn);
      L.DomEvent.on(btn, 'click', toggleLocate);
      return btn;
    },
  });
  const locateCtl = new LocateControl().addTo(lmap);
  const locateBtn = locateCtl.getContainer();

  let watchId = null;
  let meMarker = null;
  let meCircle = null;
  let firstFix = true;

  function toggleLocate() {
    if (watchId !== null) return stopLocate();
    if (!('geolocation' in navigator)) return toast('Questo browser non condivide la posizione.');

    locateBtn.setAttribute('aria-pressed', 'true');
    locateBtn.classList.add('is-loading');
    firstFix = true;
    watchId = navigator.geolocation.watchPosition(onPosition, onPositionError, {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 20000,
    });
  }

  function stopLocate() {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    locateBtn.setAttribute('aria-pressed', 'false');
    locateBtn.classList.remove('is-loading');
    if (meMarker) meMarker.remove();
    if (meCircle) meCircle.remove();
    meMarker = meCircle = null;
    side.querySelectorAll('[data-dist]').forEach((el) => (el.textContent = ''));
  }

  function onPosition(pos) {
    const latlng = [pos.coords.latitude, pos.coords.longitude];
    locateBtn.classList.remove('is-loading');

    if (!meMarker) {
      meCircle = L.circle(latlng, {
        radius: pos.coords.accuracy,
        color: '#2b7de9',
        weight: 1,
        fillOpacity: 0.12,
        interactive: false,
      }).addTo(lmap);
      meMarker = L.marker(latlng, {
        icon: L.divIcon({ className: '', html: '<span class="mapme"></span>', iconSize: [20, 20], iconAnchor: [10, 10] }),
        zIndexOffset: 1000,
        keyboard: false,
      })
        .bindPopup('<strong>Siete qui</strong>')
        .addTo(lmap);
    } else {
      meMarker.setLatLng(latlng);
      meCircle.setLatLng(latlng).setRadius(pos.coords.accuracy);
    }

    if (firstFix) {
      firstFix = false;
      // Se siamo lontani da tutti i posti (es. a casa) mostriamo comunque i posti.
      if (allBounds.pad(0.5).contains(latlng)) lmap.flyTo(latlng, 16, { duration: 0.8 });
      else lmap.fitBounds(startBounds.extend(latlng), { padding: [30, 30] });
    }

    const here = L.latLng(latlng);
    markers.forEach(({ place }, key) => {
      const el = side.querySelector(`[data-dist="${key}"]`);
      if (el) el.textContent = ` · ${formatDistance(here.distanceTo([place.lat, place.lng]))}`;
    });
  }

  function onPositionError(err) {
    stopLocate();
    toast(
      err.code === err.PERMISSION_DENIED
        ? 'Posizione non autorizzata: attivala nelle impostazioni del browser.'
        : 'Posizione non disponibile, riprova tra poco.'
    );
  }

  function formatDistance(m) {
    if (m < 1000) return `${Math.round(m / 10) * 10} m`;
    return `${(m / 1000).toFixed(1).replace('.', ',')} km`;
  }

  let toastTimer = null;
  function toast(text) {
    const el = $('map-toast');
    el.textContent = text;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (el.hidden = true), 4000);
  }
})();
