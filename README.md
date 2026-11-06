# yoyoyosiie.github.io

Portfolio site, live at **https://yoyoyosiie.github.io**. It's plain HTML/CSS/JS with no build step: edit a file, push to `main`, and the site updates within about a minute.

## Where things are

| File | What it is |
| --- | --- |
| `index.html` | Home: intro, project cards, experience, contact |
| `projects/*.html` | One page per project |
| `assets/css/style.css` | All styling. Change `--accent` at the top to recolour the site |
| `assets/js/main.js` | Project filter, image lightbox, before/after slider |
| `assets/img/<project>/` | Photos |
| `assets/models/` | 3D models (`.glb`) |
| `assets/video/` | Short video clips |

Search for `class="todo"` to find every placeholder that still needs content.

## Adding content

**Photos:** resize to about 1600 px on the long side and save as JPG at ~80% quality. That usually comes out to 200–500 KB. Put them in `assets/img/<project>/`, then change the `src` in the matching `<figure>`.

**3D models:** the viewer needs GLB. Fusion and SolidWorks can't export it cleanly, so:
- Export **STEP** from Fusion (File → Export → STEP) or SolidWorks, and convert it to GLB. Claude can do the conversion, or use https://products.aspose.app/3d/conversion/step-to-glb or FreeCAD.
- Keep each GLB under ~10 MB. Leave out scan meshes and anything proprietary.
- Put it in `assets/models/` and add a button for it in the `data-model-switch` bar on the project page.
- When you replace a model, bump the `?v=` number in its `src` so browsers don't keep showing the cached old file.

**Videos:**
- Long videos: upload to YouTube (Unlisted is fine). Copy the ID from the URL (`youtube.com/watch?v=THIS_PART`) and paste it in place of `VIDEO_ID`.
- Short clips under ~20 MB can go in `assets/video/`. Compress first:
  `ffmpeg -i in.mov -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow -an out.mp4`
  (`-an` drops audio; leave it out if you want sound).
- GitHub refuses files over 100 MB. Keep the whole repo under about 1 GB.

**Résumé:** save as `assets/resume.pdf`.

## Turning on GitHub Pages (once)

Settings → Pages → Build and deployment → Source: *Deploy from a branch*, Branch: `main`, folder `/ (root)`.
