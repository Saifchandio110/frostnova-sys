/* Artwork gallery: category filter + image viewer with credits. Items come from content.js (artwork).
   An item with src opens in the viewer; an item with src: null stays a labelled placeholder slot. */
(function () {
  var C = window.FROSTNOVA, esc = FN.esc, box, opener, items = [], idx = 0;
  FN.panels.gallery = function () {
    var cats = C.artwork.map(function (a) { return a.category; }).filter(function (c, i, all) { return all.indexOf(c) === i; });
    return "<h2>Artwork</h2>" +
      '<div class="filters" role="group" aria-label="Filter artwork"><button type="button" class="btn alt filter" data-cat="all" aria-pressed="true">all</button>' +
      cats.map(function (c) { return '<button type="button" class="btn alt filter" data-cat="' + esc(c) + '" aria-pressed="false">' + esc(c) + "</button>"; }).join("") + "</div>" +
      '<div class="mosaic">' + C.artwork.map(function (a, n) {
        if (!a.src) return '<div class="art-wrap ' + a.size + '" data-cat="' + esc(a.category) + '">' + FN.slot(a.title) + "</div>";
        return '<div class="art-wrap ' + a.size + '" data-cat="' + esc(a.category) + '"><button type="button" class="art" data-n="' + n + '" aria-label="View ' + esc(a.title) +
          '"><img src="' + esc(a.src) + '" alt="' + esc(a.alt || a.title) + '" loading="lazy"></button></div>';
      }).join("") + "</div>" +
      (C.artwork.some(function (a) { return !a.src; }) ? '<p class="ph">Slots marked "awaiting file" are placeholders. Add src and credit in js/content.js (artwork) to show real art.</p>' : "");
  };
  function show(n) {
    var a = C.artwork[items[n]]; idx = n;
    box.querySelector("img").src = a.src; box.querySelector("img").alt = a.alt || a.title;
    box.querySelector("p").textContent = a.title + " · " + a.category + " · Credit: " + (a.credit || "not yet supplied");
  }
  function open(i, el) {
    items = C.artwork.map(function (a, n) { return a.src ? n : -1; }).filter(function (n) { return n >= 0; });
    opener = el; box.hidden = false; show(items.indexOf(i)); box.querySelector(".lb-close").focus();
  }
  function close() { box.hidden = true; if (opener) opener.focus(); }
  box = document.createElement("div"); box.className = "lightbox"; box.hidden = true; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", "Artwork viewer");
  box.innerHTML = '<button type="button" class="btn lb-close">Close</button><img alt=""><p></p><div><button type="button" class="btn alt lb-prev">Previous</button><button type="button" class="btn alt lb-next">Next</button></div>';
  document.body.appendChild(box);
  box.addEventListener("click", function (e) {
    if (e.target === box || e.target.classList.contains("lb-close")) close();
    else if (e.target.classList.contains("lb-prev")) show((idx + items.length - 1) % items.length);
    else if (e.target.classList.contains("lb-next")) show((idx + 1) % items.length);
  });
  document.addEventListener("keydown", function (e) {
    if (box.hidden) return;
    if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") show((idx + items.length - 1) % items.length); else if (e.key === "ArrowRight") show((idx + 1) % items.length);
    else if (e.key === "Tab") { var f = box.querySelectorAll("button"), first = f[0], last = f[f.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
  });
  document.getElementById("viewport").addEventListener("click", function (e) {
    var art = e.target.closest(".art"), f = e.target.closest(".filter");
    if (art) open(+art.dataset.n, art);
    if (f) {
      document.querySelectorAll(".filter").forEach(function (b) { b.setAttribute("aria-pressed", b === f); });
      document.querySelectorAll(".art-wrap").forEach(function (w) { w.hidden = f.dataset.cat !== "all" && w.dataset.cat !== f.dataset.cat; });
    }
  });
})();
