(function main() {
  const content = window.CONTENT;
  const missions = window.MISSIONS;
  const $ = (id) => document.getElementById(id);

  window.App.store.load();

  window.App.initSnow($('snow'));
  window.App.renderNav($('topnav'), 'missions');
  window.App.renderMissionsHero($('hero'), missions);
  window.App.renderMissions($('missions'), missions);
  window.App.initMissions($('missions'), missions);
  window.App.renderProgressTools($('tools'), missions);
  window.App.initProgressTools($('tools'), missions);
  window.App.renderFooter($('footer'), content);
})();
