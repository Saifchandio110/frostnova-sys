/* Navigation + panel rendering. Panels are built from content.js. Later phases add one render function per section. */
(function () {
  var C = window.FROSTNOVA, view = document.getElementById("viewport"), nav = document.getElementById("nav");
  var esc = FN.esc, slot = FN.slot;
  var cover = function (r) { return r.cover ? '<img src="' + esc(r.cover) + '" alt="' + esc(r.title) + ' cover" loading="lazy">' : slot("cover"); };
  var panels = FN.panels;
  Object.assign(panels, {
    home: function () {
      var r = C.releases[0];
      return "<h1>" + esc(C.artist.name) + '</h1><div class="manifesto">' + C.manifesto.map(function (l) { return "<p>" + esc(l) + "</p>"; }).join("") + "</div>" +
        '<div class="home"><section aria-label="Featured release"><h2>Featured release</h2><div class="release">' + cover(r) +
        "<div><h3>" + esc(r.title) + "</h3><p>" + esc(r.note) + " · " + esc(r.date) + '</p><a class="btn" href="' + esc(r.url) + '" target="_blank" rel="noopener">Buy on Bandcamp</a><a class="btn alt" href="#releases">Open releases</a></div></div></section>' +
        slot("Frostnova.sys character art", "tall") + "</div>";
    },
    links: function () {
      return "<h2>Links</h2>" + '<ul class="linklist">' + C.links.map(function (l) {
        return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "<span>open</span></a></li>";
      }).join("") + "</ul>";
    }
  });
  var pending = { music: "Music player", releases: "Release library", videos: "Videos and streaming", about: "About" };
  function render(id) {
    if (!C.nav.some(function (n) { return n.id === id; })) id = "home";
    view.innerHTML = panels[id] ? panels[id]() : "<h2>" + pending[id] + '</h2><p class="note">This module is built in Phase 3. Its content is already defined in js/content.js.</p>';
    view.classList.remove("swap"); void view.offsetWidth; view.classList.add("swap");
    nav.querySelectorAll("a").forEach(function (a) { if (a.dataset.id === id) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    document.getElementById("chip-node").textContent = "node: " + id;
    document.dispatchEvent(new CustomEvent("fn:navigate", { detail: id }));
  }
  nav.innerHTML = C.nav.map(function (n, i) { return '<a href="#' + n.id + '" data-id="' + n.id + '">' + n.label + "<small>" + (i + 1) + "</small></a>"; }).join("");
  window.addEventListener("hashchange", function () { render(location.hash.slice(1)); view.scrollTop = 0; });
  document.addEventListener("keydown", function (e) { /* keys 1-7 jump between modules */
    if (e.ctrlKey || e.metaKey || e.altKey || /input|textarea/i.test(e.target.tagName)) return;
    var n = C.nav[parseInt(e.key, 10) - 1]; if (n) location.hash = n.id;
  });
  render(location.hash.slice(1));
})();
