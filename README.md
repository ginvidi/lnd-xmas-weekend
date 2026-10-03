# London Christmas Weekend 🎄

A couple of Matteo's friends are coming to visit him in London for a Christmas weekend (6–8 December). This little site collects everything for the trip: the plan for each day, the things to see, and a set of missions to complete together while exploring the city.

## Links

- 🗺️ **Activities & itinerary:** https://ginvidi.github.io/lnd-xmas-weekend/
- 🎯 **Missions:** https://ginvidi.github.io/lnd-xmas-weekend/missioni.html

## What's inside

- **Activities** (`index.html`) – day-by-day itinerary, highlights and useful info for the weekend.
- **Missions** (`missioni.html`) – a challenge for each place we visit, to be completed together. Progress is saved in the browser.

The site is a static page (HTML, CSS and plain JavaScript) published with GitHub Pages; the content is in Italian.

## Deploying changes

GitHub Pages caches files for 10 minutes, so after a change the browser can mix new HTML with old CSS/JS. Every local asset URL carries a `?v=N` query (in `index.html`, `missioni.html` and the `@import`s in `css/main.css`): bump `N` everywhere whenever you change CSS or JS.
