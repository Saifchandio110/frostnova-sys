/* Status strip, telemetry and system log. Cosmetic only; every label is honest. */
(function () {
  var clock = document.getElementById("chip-clock"), bars = document.getElementById("bars"), log = document.getElementById("log");
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  for (var i = 0; i < 14; i++) bars.appendChild(document.createElement("i"));
  function tick() { clock.textContent = new Date().toLocaleTimeString([], { hour12: false }); }
  function wave() { bars.childNodes.forEach(function (b) { b.style.height = (10 + Math.random() * 90) + "%"; }); }
  function say(t) { var li = document.createElement("li"); li.textContent = t; log.prepend(li); while (log.children.length > 6) log.lastChild.remove(); }
  tick(); wave(); setInterval(tick, 1000); if (!calm) setInterval(wave, 900);
  say("core online"); say("content loaded");
  document.addEventListener("fn:navigate", function (e) { say("opened " + e.detail); });
})();
