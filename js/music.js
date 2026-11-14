/* Music player + release library. Audio comes from Bandcamp's official embed (never raw files). */
(function () {
  var C = window.FROSTNOVA, esc = FN.esc;
  var tracks = function (r) {
    return '<ol class="tracks">' + r.tracks.map(function (t) {
      return '<li><a href="' + esc(t.url) + '" target="_blank" rel="noopener">' + esc(t.title) + "</a><span>" + esc(t.time) + "</span></li>";
    }).join("") + "</ol>";
  };
  var ext = function (r) {
    return '<a class="btn" href="' + esc(r.url) + '" target="_blank" rel="noopener">Buy on Bandcamp</a>' +
      (r.streaming || []).map(function (s) { return '<a class="btn alt" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a>"; }).join("");
  };
  FN.panels.music = function () {
    var r = C.releases[0];
    return "<h2>Music</h2><p class=\"manifesto\">Now playing: " + esc(r.title) + ". Playback runs through Bandcamp's own player.</p>" +
      '<iframe class="embed" title="' + esc(r.title) + ' on Bandcamp" loading="lazy" src="https://bandcamp.com/EmbeddedPlayer/album=' + r.bandcampAlbumId +
      '/size=large/bgcol=0a1216/linkcol=3dff9a/tracklist=true/artwork=small/transparent=true/"><a href="' + esc(r.url) + '">' + esc(r.title) + "</a></iframe>" +
      "<h2>Listen elsewhere</h2>" + C.links.filter(function (l) { return /tidal|apple|youtube|soundcloud/i.test(l.url); }).map(function (l) {
        return '<a class="btn alt" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
      }).join("");
  };
  FN.panels.releases = function () {
    return "<h2>Releases</h2>" + C.releases.map(function (r) {
      var cover = r.cover ? '<img src="' + esc(r.cover) + '" alt="' + esc(r.title) + ' cover" loading="lazy">' : FN.slot("cover");
      return '<article class="rel"><div>' + cover + '</div><div><h3>' + esc(r.title) + ' <span class="badge ' + esc(r.status) + '">' + esc(r.status) + "</span></h3>" +
        "<p>" + esc(r.date) + " · " + esc(r.note) + "</p>" + FN.todo(r.description, "releases → description") + tracks(r) + ext(r) + "</div></article>";
    }).join("");
  };
})();
