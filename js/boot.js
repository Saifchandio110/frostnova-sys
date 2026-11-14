/* Boot sequence: about 2 seconds, skippable (tap, click or any key), shown once per browser session. */
(function () {
  try { if (sessionStorage.getItem("fn-booted") === "1") return; } catch (e) {}
  var C = window.FROSTNOVA, calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches, i = 0, t, finished = false;
  var lines = ["frostnova.sys cockpit", "loading content ... done", "mounting modules ... " + C.nav.length, "sound ... off (toggle in status bar)", "ready"];
  var el = document.createElement("div"); el.className = "boot"; el.setAttribute("role", "status");
  el.innerHTML = '<pre class="boot-log"></pre><button class="btn boot-skip" type="button">Skip</button>';
  document.body.appendChild(el);
  var log = el.querySelector("pre"), skip = el.querySelector("button"); skip.focus();
  function done() {
    if (finished) return; finished = true; clearTimeout(t);
    try { sessionStorage.setItem("fn-booted", "1"); } catch (e) {}
    el.classList.add("out"); setTimeout(function () { el.remove(); }, calm ? 0 : 400);
    document.removeEventListener("keydown", done);
    document.getElementById("viewport").focus({ preventScroll: true });
    if (window.FN && FN.sound) FN.sound.play("boot");
  }
  function next() { if (i >= lines.length) { t = setTimeout(done, calm ? 0 : 300); return; } log.textContent += lines[i++] + "\n"; t = setTimeout(next, calm ? 0 : 340); }
  el.addEventListener("click", done); document.addEventListener("keydown", done); next();
})();
