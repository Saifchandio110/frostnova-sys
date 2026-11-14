/* ALL EDITABLE CONTENT LIVES HERE. Every list has ids, so a future admin panel can swap this file
   for a database/JSON feed without touching the layout code. Use null for anything not supplied yet. */
window.FROSTNOVA = {
  artist: { name: "Frostnova.sys" },
  /* Wording copied from frostnova.tech */
  manifesto: [
    "Music is the Universal language",
    "We are damaged, but not broken",
    "We refuse to die by another sunrise",
    "We will chase that horizon so that the day never ends for us again"
  ],
  nav: [
    { id: "home", label: "cockpit" }, { id: "music", label: "music" }, { id: "releases", label: "releases" },
    { id: "gallery", label: "artwork" }, { id: "videos", label: "videos" }, { id: "about", label: "about" },
    { id: "links", label: "links" }
  ],
  releases: [{
    id: "photonic-cascade", title: "Photonic Cascade", date: "2025-12-25", status: "released",
    cover: null, /* e.g. "assets/albums/photonic-cascade.jpg" once the client supplies the file */
    note: "First EP with bonus tracks", bandcampAlbumId: 1282519899,
    description: null, /* release text from the client */
    streaming: [], /* extra links: { label: "Tidal", url: "..." } */
    url: "https://frostnovasys.bandcamp.com/album/photonic-cascade",
    tracks: [
      { title: "Abject Mechanism", time: "3:39", url: "https://frostnovasys.bandcamp.com/track/abject-mechanism" },
      { title: "Voxnominal Wave", time: "1:25", url: "https://frostnovasys.bandcamp.com/track/voxnominal-wave" },
      { title: "Phase Capacitance", time: "2:32", url: "https://frostnovasys.bandcamp.com/track/phase-capacitance" },
      { title: "Mourning Doll", time: "1:53", url: "https://frostnovasys.bandcamp.com/track/mourning-doll" },
      { title: "ESD (Electrostatic Disassociation)", time: "2:26", url: "https://frostnovasys.bandcamp.com/track/esd-electrostatic-disassociation" }
    ]
  }],
  /* Placeholder slots only. Not artwork. Add src and credit when real client files arrive.
     size = mosaic layout hint, e.g. "w3 h3" (3 columns wide, 3 rows tall). */
  artwork: [
    { id: "slot-1", title: "Character art slot", category: "character", src: null, credit: null, size: "w3 h3" },
    { id: "slot-2", title: "Concept art slot", category: "concept", src: null, credit: null, size: "w3 h2" },
    { id: "slot-3", title: "Photography slot", category: "photo", src: null, credit: null, size: "w2 h2" },
    { id: "slot-4", title: "Commission slot", category: "commission", src: null, credit: null, size: "w2" },
    { id: "slot-5", title: "Character art slot", category: "character", src: null, credit: null, size: "w2 h2" },
    { id: "slot-6", title: "Concept art slot", category: "concept", src: null, credit: null, size: "w2" }
  ],
  /* Videos: { title, youtubeId: "abc123" } to embed, or { title, url } for an external link. */
  videos: [],
  /* About text: null shows a marked placeholder. Replace null with Sara's own words in quotes. */
  about: { intro: null, background: null, journey: null, meaning: null, philosophy: null, identity: null },
  links: [
    { label: "Bandcamp", url: "https://frostnovasys.bandcamp.com/album/photonic-cascade" },
    { label: "Bluesky", url: "https://bsky.app/profile/frostnova.tech" },
    { label: "Tidal", url: "https://tidal.com/artist/36598806" },
    { label: "Apple Music", url: "https://music.apple.com/us/artist/frostnova-sys/1663661116" },
    { label: "YouTube Music", url: "https://www.youtube.com/channel/UCdRvYJ5SZjRTgz1CEgsg2sg" },
    { label: "Instagram", url: "https://www.instagram.com/sara_frostnova.sys/" },
    { label: "SoundCloud (demos, old stuff)", url: "https://soundcloud.com/frostnovasys" }
  ]
};
