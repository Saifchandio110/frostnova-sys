/* GSAP panel transitions + reticle cursor. Everything works without GSAP (CSS fallback) and is skipped for reduced motion. */
(function () {
  var g = window.gsap, calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (g) document.documentElement.classList.add("has-gsap");
  document.addEventListener("fn:navigate", function () {
    if (!g || calm) return;
    g.from(document.getElementById("viewport").children, { opacity: 0, y: 14, duration: 0.35, stagger: 0.05, ease: "power2.out", clearProps: "all" });
  });
  /* Reticle follows the pointer on mouse devices only. The normal cursor stays visible. */
  if (calm || !window.matchMedia("(pointer: fine)").matches) return;
  var r = document.createElement("div"); r.className = "reticle"; r.setAttribute("aria-hidden", "true"); document.body.appendChild(r);
  document.addEventListener("pointermove", function (e) {
    if (g) g.to(r, { x: e.clientX, y: e.clientY, duration: 0.18, ease: "power3.out" });
    else r.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
  });
  document.addEventListener("pointerover", function (e) { r.classList.toggle("hot", !!e.target.closest("a,button")); });
  /* 3D tilt: the cockpit leans a few degrees toward the pointer (large screens only). */
  var cock = document.querySelector(".cockpit"), busy = false;
  if (window.innerWidth > 1100) document.addEventListener("pointermove", function (e) {
    if (busy) return; busy = true;
    requestAnimationFrame(function () {
      cock.style.setProperty("--ry", ((e.clientX / innerWidth - 0.5) * 6).toFixed(2) + "deg");
      cock.style.setProperty("--rx", ((0.5 - e.clientY / innerHeight) * 4).toFixed(2) + "deg"); busy = false;
    });
  });
})();
