"""Build the hero point cloud from a real portrait photo.

  1. rembg: person segmentation (hair included) against the studio background
  2. Depth Anything V2: per-pixel relative depth of the face
  3. sample points, denser on facial detail, brightness from the photo

Output: public/models/head.bin, little-endian, N records of
  int16 x, int16 y, int16 z (units * 4096), uint8 brightness, uint8 pad
Records are shuffled, so any prefix is a uniform subsample (mobile uses fewer).

Run: tools/.venv/Scripts/python tools/head_cloud.py [photo] [--debug]
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
PHOTO = ROOT / "pro_photos" / "AA_hd2.jpg"
OUT = ROOT / "public" / "models" / "head.bin"
DEBUG = ROOT / "tools" / "debug"

N = 85_000
WORK_W = 1200          # processing width in px
CROP = (0.0, 0.03, 1.0, 0.78)  # head and shoulders, fractions of the photo
HEIGHT_UNITS = 4.6     # height of the crop in scene units
DEPTH_RATIO = 0.62     # face relief depth relative to head width
SEED = 7


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    debug = "--debug" in sys.argv
    photo = Path(args[0]) if args else PHOTO

    im = Image.open(photo).convert("RGB")
    W, H = im.size
    im = im.crop((int(CROP[0] * W), int(CROP[1] * H), int(CROP[2] * W), int(CROP[3] * H)))
    im = im.resize((WORK_W, int(im.size[1] * WORK_W / im.size[0])), Image.LANCZOS)
    w, h = im.size

    # 1. segmentation
    from rembg import new_session, remove

    session = new_session("birefnet-portrait")
    matte = remove(im, session=session, only_mask=True)
    alpha = np.asarray(matte, dtype=np.float32) / 255.0

    # 2. depth
    import torch
    from transformers import pipeline

    depth_pipe = pipeline("depth-estimation", model="depth-anything/Depth-Anything-V2-Base-hf", device=-1)
    with torch.no_grad():
        pred = depth_pipe(im)["predicted_depth"]
    d = torch.nn.functional.interpolate(pred[None, None] if pred.dim() == 2 else pred[None], size=(h, w), mode="bicubic", align_corners=False)
    d = d.squeeze().numpy().astype(np.float32)  # relative inverse depth: larger = closer

    inside = alpha > 0.5
    # normalise on the head only so the shoulders do not flatten the face relief
    head = inside.copy()
    head[int(h * 0.56):] = False
    lo, hi = np.percentile(d[head], 2), np.percentile(d[head], 99.5)
    dn = np.clip((d - lo) / (hi - lo), -0.25, 1.35)

    # 3. sampling density: base on the person, extra on detail (eyes, brows, beard, curls)
    gray = np.asarray(im.convert("L"), dtype=np.float32) / 255.0
    gx = np.abs(np.diff(gray, axis=1, append=gray[:, -1:]))
    gy = np.abs(np.diff(gray, axis=0, append=gray[-1:, :]))
    detail = np.asarray(Image.fromarray(np.clip((gx + gy) * 255 * 4, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.5)), dtype=np.float32) / 255.0
    # fade the shoulders out towards the bottom of the crop
    ys = np.linspace(0, 1, h)[:, None]
    fade = np.clip((1.0 - ys) / 0.35, 0, 1) ** 1.5
    prob = alpha * (0.18 + 2.6 * detail) * fade
    prob[alpha < 0.35] = 0
    prob /= prob.sum()

    rng = np.random.default_rng(SEED)
    idx = rng.choice(prob.size, size=N, replace=True, p=prob.ravel())
    py, px = np.divmod(idx, w)
    jx = px + rng.random(N) - 0.5
    jy = py + rng.random(N) - 0.5

    scale = HEIGHT_UNITS / h
    x = (jx - w / 2) * scale
    y = (h / 2 - jy) * scale
    # head width ~ silhouette width at eye level
    row = inside[int(h * 0.38)]
    head_w = (np.ptp(row.nonzero()[0]) if row.any() else w * 0.4) * scale
    z = (dn[py, px] - 0.5) * head_w * DEPTH_RATIO
    z += rng.normal(0, 0.006, N)

    # contrast curve so hair, eyes, beard and the shirt stripes read dark,
    # then depth shading: what is closer to the camera is brighter
    lum = gray[py, px]
    tone = np.clip((lum - 0.18) / 0.72, 0, 1) ** 1.6
    shade = 0.45 + 0.55 * np.clip(dn[py, px], 0, 1)
    bright = np.clip(0.04 + 0.96 * tone * shade, 0, 1)

    q = np.empty(N, dtype=[("x", "<i2"), ("y", "<i2"), ("z", "<i2"), ("b", "u1"), ("p", "u1")])
    q["x"] = np.round(x * 4096).astype(np.int16)
    q["y"] = np.round(y * 4096).astype(np.int16)
    q["z"] = np.round(z * 4096).astype(np.int16)
    q["b"] = np.round(bright * 255).astype(np.uint8)
    q["p"] = 0
    q = q[rng.permutation(N)]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    q.tofile(OUT)
    print(f"head.bin: {N} points, {OUT.stat().st_size // 1024} KB, extent x {x.min():.2f}..{x.max():.2f} "
          f"y {y.min():.2f}..{y.max():.2f} z {z.min():.2f}..{z.max():.2f}")

    if debug:
        DEBUG.mkdir(exist_ok=True)
        Image.fromarray((alpha * 255).astype(np.uint8)).save(DEBUG / "matte.png")
        Image.fromarray((np.clip(dn, 0, 1) * inside * 255).astype(np.uint8)).save(DEBUG / "depth.png")
        # quick orthographic side and 3/4 renders to check the relief
        for name, ang in [("front", 0.0), ("three_quarter", 0.6), ("side", 1.35)]:
            c, s = np.cos(ang), np.sin(ang)
            rx = c * x + s * z
            canvas = np.zeros((900, 700), np.float32)
            u = np.clip(((rx / HEIGHT_UNITS) * 900 + 350).astype(int), 0, 699)
            v = np.clip((450 - (y / HEIGHT_UNITS) * 900).astype(int), 0, 899)
            np.add.at(canvas, (v, u), bright * 0.5)
            Image.fromarray((np.clip(canvas, 0, 1) * 255).astype(np.uint8)).save(DEBUG / f"render_{name}.png")


if __name__ == "__main__":
    main()
