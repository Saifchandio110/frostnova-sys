/* UI sound feedback. Tiny synthesized blips (no audio files). OFF by default; the visitor opts in with the sound button. */
(function () {
  var on = false, ctx, btn = document.getElementById("btn-sound");
  try { on = localStorage.getItem("fn-sound") === "1"; } catch (e) {}
  function tone(freq, dur, vol) {
    if (!on) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      var o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
      o.type = "square"; o.frequency.value = freq; g.gain.setValueAtTime(vol || 0.03, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + dur);
    } catch (e) {}
  }
  var sounds = {
    click: function () { tone(880, 0.05); },
    nav: function () { tone(520, 0.07); setTimeout(function () { tone(780, 0.09); }, 70); },
    boot: function () { [330, 495, 660].forEach(function (f, i) { setTimeout(function () { tone(f, 0.12); }, i * 110); }); }
  };
  function paint() { btn.setAttribute("aria-pressed", on); btn.lastChild.textContent = "sound: " + (on ? "on" : "off"); btn.firstChild.className = "dot " + (on ? "ok" : "warn"); }
  btn.addEventListener("click", function () { on = !on; try { localStorage.setItem("fn-sound", on ? "1" : "0"); } catch (e) {} paint(); sounds.click(); });
  document.addEventListener("click", function (e) { if (e.target.closest("a,button") && e.target.closest("#btn-sound") === null) sounds.click(); });
  window.addEventListener("hashchange", sounds.nav);
  window.FN.sound = { play: function (n) { if (sounds[n]) sounds[n](); } };
  paint();
})();
