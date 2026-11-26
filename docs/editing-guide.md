# Editing guide (no coding needed)
All editable content is in `js/content.js`.

1. Album tracks: in `tracks`, set `title: 'Real Name'` and `src: 'assets/audio/file.mp3'`. The player starts working for that track.
2. Cover/artwork: put images in `assets/`, then set `src: 'assets/art1.jpg'` and `credit: 'Name'` in `gallery`.
3. Videos: set `embed` to the YouTube embed URL (https://www.youtube.com/embed/ID).
4. Links: in `nodes`, add `u: 'https://...'` to turn a placeholder into a live link.
5. Secret codes: `codes` (SARA = hidden artwork slot, FROSTNOVA/NOVA = amber theme). Konami code also unlocks the hidden slot.
6. Text sections (Profile, placeholder notes) are in `js/app.js` inside the `S` array.
7. 3D mech: `js/scene.js`. Replace the procedural parts with a GLTF model when client assets exist.

8. Featured track button (PLAY TRANSMISSION): set `featured.src` in `js/content.js` (e.g. 'assets/audio/featured.mp3', a full track or a 30-60 second preview supplied by the artist) for real play/pause. Without a file, the button opens the official Bandcamp player instead.
