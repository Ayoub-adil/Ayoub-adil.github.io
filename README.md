# Ayoub ADIL — portfolio v2

3D portfolio for a 3D software engineering profile: a scroll-driven point-cloud story (sensor → geometry → detection → interface → part) and a CAD viewer fed by a real B-rep model.

Content rules, project facts and art direction live in [CLAUDE.md](CLAUDE.md).

## Stack

| | |
|---|---|
| App | Vite 8, React 19, TypeScript, Tailwind 4 |
| 3D | three.js, @react-three/fiber, drei, postprocessing; custom GLSL for the particle morph |
| Scroll | GSAP ScrollTrigger + Lenis |
| CAD | Python, build123d (OpenCascade) → custom glTF exporter |

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + build to dist/
```

Pages: `/` (site), `/lab/cad-viewer/` (full-screen viewer), `/cv/` (printable CV, A4).

## CAD model

```bash
python -m venv cad/.venv
cad/.venv/Scripts/pip install build123d     # bin/pip on macOS / Linux
npm run cad
```

`cad/part.py` defines the part. `cad/build_part.py` writes `public/models/flanged-hub.glb` (one node per B-rep face and edge, ids in node extras) and `src/lab/flanged-hub.json` (type, area, radius, normal, length from OpenCascade).

## Layout

```
src/content/content.ts   single source of truth for the site and the CV (TODOs render visibly)
src/three/               point-cloud stage: shapes.ts (procedural sets), PointField.tsx (shader), Stage.tsx (camera rig, bloom)
src/components/          page sections
src/lab/                 CAD viewer, lab page entry
src/cv/                  printable CV entry
cad/                     build123d part + exporter
```

All 3D scenes and diagrams are synthetic. Client names are withheld.
