# London Christmas Weekend 🎄

A couple of Matteo's friends are coming to visit him in London for a Christmas weekend (6–8 December). This little site collects everything for the trip: the plan for each day, the things to see, and a set of missions to complete together while exploring the city.

## Links

- 🗺️ **Activities & itinerary:** https://ginvidi.github.io/lnd-xmas-weekend/
- 🎯 **Missions:** https://ginvidi.github.io/lnd-xmas-weekend/missioni.html
- 🎄 **Christmas map:** https://ginvidi.github.io/lnd-xmas-weekend/mappa.html

## What's inside

- **Activities** (`index.html`) – day-by-day itinerary, highlights and useful info for the weekend.
- **Missions** (`missioni.html`) – a challenge for each place we visit, to be completed together. Progress is saved in the browser.
- **Map** (`mappa.html`) – shops with Christmas decorations, Christmas lights and Christmas markets on one map (three colours), plus museums and the Harry Potter show as small icons, with photos, a search box, your live location and the walking routes as Google Maps links, plus the red double-decker bus routes that pass under the lights (each can be hidden). Places and routes are in `js/map-content.js`, buses in `js/map-buses.js`.

The site is a static page (HTML, CSS and plain JavaScript) published with GitHub Pages; the content is in Italian.

## Deploying changes

GitHub Pages caches files for 10 minutes, so after a change the browser can mix new HTML with old CSS/JS. Every local asset URL carries a `?v=N` query (in `index.html`, `missioni.html` and the `@import`s in `css/main.css`): bump `N` everywhere whenever you change CSS or JS.
