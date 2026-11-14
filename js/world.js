/* WORLD: star-tunnel canvas, skyline, 3D hub ring (swipe / drag / arrows) and window handling.
   Sections are the same panels as before; they now open as HUD windows over the scene. */
(function () {
  var C = window.FROSTNOVA, esc = FN.esc, body = document.body, world = document.querySelector(".world"), cock = document.querySelector(".cockpit"), view = document.getElementById("viewport");
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = C.nav.filter(function (n) { return n.id !== "home"; }), N = items.length, step = 360 / N, rot = 0, entered = false, warp = 0;

  /* Skyline: three parallax layers of buildings */
  var sky = document.createElement("div"); sky.className = "skyline";
  ["l1", "l2", "l3"].forEach(function (c, li) {
    var L = document.createElement("div"), h = ""; L.className = "sky " + c;
    for (var i = 0; i < 18; i++) h += '<b style="height:' + ((30 + Math.random() * 70) * (0.6 + li * 0.2)).toFixed(0) + '%;flex-grow:' + (1 + Math.random() * 2).toFixed(1) + '"' + (li === 1 && Math.random() < 0.18 ? ' class="neon"' : "") + "></b>";
    L.innerHTML = h; sky.appendChild(L);
  });
  world.appendChild(sky);

  /* Hub: title, rotating manifesto line, 3D ring of modules, featured release link */
  var hub = document.createElement("section"); hub.className = "hub"; hub.setAttribute("aria-label", "Hub");
  hub.innerHTML = "<h1>" + esc(C.artist.name) + '</h1><p class="line"></p><div class="ring-wrap"><div class="ring" style="--step:' + step + 'deg">' +
    items.map(function (n, i) { return '<a class="node" href="#' + n.id + '" aria-hidden="true" tabindex="-1" style="--i:' + i + '"><b>0' + (i + 1) + "</b><span>" + esc(n.label) + "</span></a>"; }).join("") +
    '</div></div><div class="pad"><button type="button" class="btn alt" data-d="1" aria-label="Previous module">&#8249;</button><button type="button" class="btn alt" data-d="-1" aria-label="Next module">&#8250;</button></div>' +
    '<a class="now" href="#music">Featured: ' + esc(C.releases[0].title) + " &middot; open music</a>";
  cock.appendChild(hub);
  var ring = hub.querySelector(".ring"), wrap = hub.querySelector(".ring-wrap"), line = hub.querySelector(".line");
  function apply() { ring.style.setProperty("--rot", rot + "deg"); }
  function front() { return ((Math.round(-rot / step) % N) + N) % N; }
  hub.querySelector(".pad").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) { rot += +b.dataset.d * step; apply(); } });

  /* Drag / swipe to spin the ring; a drag never counts as a tap */
  var down = false, moved = false, sx = 0, r0 = 0;
  wrap.addEventListener("pointerdown", function (e) { down = true; moved = false; sx = e.clientX; r0 = rot; });
  document.addEventListener("pointermove", function (e) {
    if (!down) return; var dx = e.clientX - sx;
    if (Math.abs(dx) > 6) { moved = true; ring.classList.add("drag"); rot = r0 + dx * 0.35; apply(); }
  });
  document.addEventListener("pointerup", function () { if (!down) return; down = false; ring.classList.remove("drag"); if (moved) { rot = Math.round(rot / step) * step; apply(); } });
  wrap.addEventListener("click", function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);

  /* Keyboard: arrows spin, Enter opens the front module, Esc closes a window */
  document.addEventListener("keydown", function (e) {
    var home = body.dataset.node === "home", lb = document.querySelector(".lightbox:not([hidden])");
    if (e.key === "Escape" && !home && !lb) { location.hash = "home"; return; }
    if (!home || e.target !== body) return;
    if (e.key === "ArrowLeft") { rot += step; apply(); } else if (e.key === "ArrowRight") { rot -= step; apply(); } else if (e.key === "Enter") location.hash = items[front()].id;
  });

  /* Window handling: react to navigation */
  document.addEventListener("fn:navigate", function (e) {
    var id = e.detail, i = items.findIndex(function (n) { return n.id === id; });
    body.dataset.node = id;
    if (i >= 0) { rot += ((((-i * step) - rot) % 360) + 540) % 360 - 180; apply(); }
    if (id !== "home") view.insertAdjacentHTML("afterbegin", '<button type="button" class="btn win-close">&#10005; close</button>');
    warp = calm ? 0 : 0.02;
  });
  view.addEventListener("click", function (e) { if (e.target.closest(".win-close")) location.hash = "home"; });

  /* Rotating manifesto line */
  var m = 0; function say() { line.textContent = C.manifesto[m++ % C.manifesto.length]; } say(); if (!calm) setInterval(say, 4200);

  /* Star tunnel */
  var cv = document.getElementById("stars"), cx = cv.getContext("2d"), W, H, S = [], base = 0.0012, sp = base, i;
  function size() { var d = Math.min(window.devicePixelRatio || 1, 1.5); W = cv.width = innerWidth * d; H = cv.height = innerHeight * d; }
  function seed(s) { s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; s.z = 1; s.px = null; }
  for (i = 0; i < (innerWidth < 720 ? 70 : 140); i++) { var s = { c: i % 5 === 0 }; seed(s); s.z = Math.random(); S.push(s); }
  function draw() {
    sp += (base + warp - sp) * 0.05; warp *= 0.97; cx.clearRect(0, 0, W, H);
    S.forEach(function (s) {
      s.z -= sp; if (s.z <= 0.02) seed(s);
      var x = W / 2 + s.x / s.z * W * 0.25, y = H / 2 + s.y / s.z * H * 0.25;
      if (x < 0 || x > W || y < 0 || y > H) { seed(s); return; }
      cx.strokeStyle = cx.fillStyle = s.c ? "#4fd8ee" : "#cfe";
      if (warp > 0.002 && s.px !== null) { cx.beginPath(); cx.moveTo(s.px, s.py); cx.lineTo(x, y); cx.stroke(); } else cx.fillRect(x, y, (1 - s.z) * 2 + 0.6, (1 - s.z) * 2 + 0.6);
      s.px = x; s.py = y;
    });
    if (!calm) requestAnimationFrame(draw);
  }
  size(); window.addEventListener("resize", size); draw();

  /* Enter the world after the boot sequence (or right away on a return visit) */
  function enter() { if (entered) return; entered = true; hub.classList.add("live", "arrive"); warp = calm ? 0 : 0.09; }
  document.addEventListener("fn:entered", enter);
  var booted = false; try { booted = sessionStorage.getItem("fn-booted") === "1"; } catch (e) {}
  if (booted || calm) enter(); setTimeout(enter, 7000);

  /* Parallax: pointer on desktop, tilt sensor on Android phones */
  document.addEventListener("pointermove", function (e) { if (e.pointerType === "mouse" && !calm) world.style.setProperty("--px", ((e.clientX / innerWidth - 0.5) * 2).toFixed(2)); });
  if (!calm && window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== "function")
    window.addEventListener("deviceorientation", function (e) { if (e.gamma != null) world.style.setProperty("--px", Math.max(-1, Math.min(1, e.gamma / 30)).toFixed(2)); });
})();
