# Ayoub ADIL — portfolio v2

Personal portfolio: who I am, my education, my experience and my projects, with a scroll-driven point-cloud story. The hero is a point cloud of my head reconstructed from a portrait photo.

Content rules and facts live in [CLAUDE.md](CLAUDE.md).

## Stack

| | |
|---|---|
| App | Vite 8, React 19, TypeScript, Tailwind 4 |
| 3D | three.js, @react-three/fiber, postprocessing; custom GLSL for the particle morph |
| Scroll | GSAP ScrollTrigger + Lenis |
| Head point cloud | Python: rembg (BiRefNet portrait matte) + Depth Anything V2 (transformers) |

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + build to dist/
```

Pages: `/` (site), `/cv/` (printable CV, A4).

## Head point cloud

```bash
python -m venv tools/.venv
tools/.venv/Scripts/pip install torch --index-url https://download.pytorch.org/whl/cpu
tools/.venv/Scripts/pip install transformers "rembg[cpu]" pillow numpy
tools/.venv/Scripts/python tools/head_cloud.py [photo.jpg] [--debug]
```

Writes `public/models/head.bin` (85k points: int16 xyz, uint8 brightness). `--debug` writes the matte, depth and front / 3/4 / side renders to `tools/debug/`.

## Layout

```
src/content/content.ts   single source of truth for the site and the CV (TODOs render visibly)
src/three/               point-cloud stage: shapes.ts (procedural sets), PointField.tsx (shader, head loader), Stage.tsx (camera rig, bloom)
src/components/          page sections
src/cv/                  printable CV entry
tools/head_cloud.py      photo -> head point cloud
```

Industrial visuals are synthetic. Client names are withheld.
