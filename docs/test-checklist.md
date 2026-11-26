# Test checklist (Phase 7)

Tip: add `?debug=1` to the site address (e.g. `.../frostnova-sys/?debug=1`) to see FPS, screen size and any JavaScript errors in a box at the bottom of the page. Screenshot it if something breaks.

## Every device
- [ ] Boot screen disappears, mech is visible and moves with mouse/touch
- [ ] Nav 00-06 each opens its section; keys 0-6 work on desktop
- [ ] Holo tags AUDIO / VISUAL / VIDEO open their sections when clicked or tapped
- [ ] Audio Archive: Bandcamp player loads, each track link opens the right Bandcamp page
- [ ] Release Bay: cover and album info visible, Listen button opens Bandcamp
- [ ] Visual Archive: tiles open the viewer; arrows, Esc and (phone) swipe work
- [ ] Video Feed, System Profile (incl. the seven member slots), Network Nodes: no broken links
- [ ] SOUND toggle: hum + clicks when ON, silence when OFF
- [ ] Override codes: SARA, FROSTNOVA, SUNRISE, HORIZON, FROST; Konami code on desktop
- [ ] Open a wrong address (e.g. /nothing) -> "Signal lost" page with a working link home

## Phone only
- [ ] Mech and 3 tags fully visible on the home screen (portrait and landscape)
- [ ] Sections slide up as a bottom sheet; mech stays visible above it
- [ ] Bottom nav strip scrolls sideways; header fits (logo + SOUND button)
- [ ] Stays smooth (use ?debug=1: aim for 30+ FPS)

## Transmission button (centre of the home screen)
- [ ] Music never starts by itself
- [ ] No audio file yet: click opens the Bandcamp player dock, click again closes it and stops the music
- [ ] With featured.src set: click plays, label becomes PAUSE TRANSMISSION, click again pauses
- [ ] While live: button turns amber, rings spin faster, spectrum speeds up, log shows a line
- [ ] Music keeps playing when you switch sections
