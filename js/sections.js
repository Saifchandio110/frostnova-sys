/* Videos and About panels. Both are fully driven by content.js. */
(function () {
  var C = window.FROSTNOVA, esc = FN.esc;
  FN.panels.videos = function () {
    var yt = C.links.filter(function (l) { return /youtube/i.test(l.url); })[0];
    var list = C.videos.map(function (v) {
      var media = v.youtubeId ? '<iframe class="vid" loading="lazy" title="' + esc(v.title) + '" allowfullscreen src="https://www.youtube-nocookie.com/embed/' + esc(v.youtubeId) + '"></iframe>'
        : '<a class="btn" href="' + esc(v.url) + '" target="_blank" rel="noopener">Watch: ' + esc(v.title) + "</a>";
      return "<article><h3>" + esc(v.title) + "</h3>" + media + "</article>";
    }).join("");
    return "<h2>Videos and streaming</h2>" + (list || '<p class="ph">No videos added yet. Add one to videos in js/content.js (YouTube id or link) and it appears here.</p>') +
      (yt ? '<a class="btn alt" href="' + esc(yt.url) + '" target="_blank" rel="noopener">YouTube Music channel</a>' : "");
  };
  FN.panels.about = function () {
    var a = C.about, rows = [["intro", "Introduction"], ["background", "Music background"], ["journey", "Creative journey"], ["meaning", "Meaning of Frostnova.sys"], ["philosophy", "Artistic philosophy"], ["identity", "Music, characters and visual identity"]];
    return "<h2>About</h2>" + rows.map(function (r) { return '<section class="about"><h3>' + r[1] + "</h3>" + FN.todo(a[r[0]], "about → " + r[0]) + "</section>"; }).join("");
  };
})();
