(function main() {
  const content = window.CONTENT;
  const $ = (id) => document.getElementById(id);

  document.title = content.meta.title;

  window.App.initSnow($('snow'));
  window.App.renderHero($('hero'), content);
  window.App.renderItinerary($('itinerary'), content);
  window.App.initOptions($('itinerary'));
  window.App.renderHighlights($('highlights'), content);
  window.App.renderInfo($('info'), content);
  window.App.renderFooter($('footer'), content);
})();
