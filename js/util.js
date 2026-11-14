/* Shared helpers + panel registry. Each section file adds its renderer to FN.panels. */
window.FN = {
  panels: {},
  esc: function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); },
  slot: function (txt, cls) { return '<div class="slot ' + (cls || "") + '" role="img" aria-label="Placeholder: ' + FN.esc(txt) + '">' + FN.esc(txt) + " · awaiting file</div>"; },
  /* Text the client has not supplied yet: shown clearly marked so nothing is invented */
  todo: function (text, where) { return text ? "<p>" + FN.esc(text) + "</p>" : '<p class="ph">Placeholder: add this text in js/content.js (' + where + ").</p>"; }
};
