# FROSTNOVA.SYS V2

Static public site: index.html + css/ + js/. Three.js r128 from cdnjs. No build step.

## Run
Open the file in a browser, or upload to GitHub Pages.

## Edit content
Everything the client supplies lives in `js/content.js`.
- Album: `C.album` (title, url, tracks with `title` and `src` = audio file URL)
- Artwork: `C.gallery` (`t` title, `credit`, `src` image URL), hidden reward: `C.secretArt`
- Videos: `C.videos` (`embed` = embed URL)
- Links: `C.nodes` (add `u` URL to enable a placeholder)
- Secret codes: `C.codes`

## Replace the 3D mech
The mech is built procedurally in `js/scene.js` inside `init3D()` (parts added with `part(...)`). Swap that block for a GLTF loader when client 3D assets exist.

## Easter eggs
Konami code or codes `SARA` (hidden gallery slot), `FROSTNOVA` / `NOVA` (amber theme).

## Needs client assets
Cover art, track titles and audio, artwork and credits, video embeds, biography, social and contact links.
