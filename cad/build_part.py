"""Export cad/part.py to the files the web viewer loads.

  public/models/flanged-hub.glb   one mesh node per B-rep face, one line node per edge
  src/lab/flanged-hub.json        per-face / per-edge geometry read from OpenCascade

Keeping faces and edges as separate glTF nodes (ids in node extras) is what lets
the three.js viewer pick B-rep topology instead of anonymous triangles.

Run: npm run cad
"""

import json
import struct
import sys
from pathlib import Path

import build123d
import numpy as np
from build123d import GeomType, Vector

sys.path.insert(0, str(Path(__file__).parent))
import part as part_module  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "models"
META_OUT = ROOT / "src" / "lab"
NAME = "flanged-hub"
LIN_TOL = 0.02  # mm
ANG_TOL = 0.12  # rad


def y_up(v):
    """build123d Z-up -> glTF Y-up."""
    x, y, z = (v.X, v.Y, v.Z) if isinstance(v, Vector) else v
    return [x, z, -y]


def r(x, n=4):
    return round(float(x), n)


class GlbWriter:
    def __init__(self):
        self.blob = bytearray()
        self.views, self.accessors, self.meshes, self.nodes = [], [], [], []

    def _add(self, data: bytes, target: int) -> int:
        while len(self.blob) % 4:
            self.blob.append(0)
        self.views.append({"buffer": 0, "byteOffset": len(self.blob), "byteLength": len(data), "target": target})
        self.blob += data
        return len(self.views) - 1

    def _vec3(self, arr: np.ndarray) -> int:
        arr = np.ascontiguousarray(arr, dtype=np.float32)
        view = self._add(arr.tobytes(), 34962)
        self.accessors.append({
            "bufferView": view, "componentType": 5126, "count": len(arr), "type": "VEC3",
            "min": arr.min(axis=0).tolist(), "max": arr.max(axis=0).tolist(),
        })
        return len(self.accessors) - 1

    def _indices(self, idx: np.ndarray) -> int:
        idx = np.ascontiguousarray(idx.ravel(), dtype=np.uint32)
        view = self._add(idx.tobytes(), 34963)
        self.accessors.append({"bufferView": view, "componentType": 5125, "count": len(idx), "type": "SCALAR"})
        return len(self.accessors) - 1

    def add_face(self, fid, pos, nrm, tris):
        prim = {"attributes": {"POSITION": self._vec3(pos), "NORMAL": self._vec3(nrm)},
                "indices": self._indices(tris), "mode": 4}
        self.meshes.append({"name": f"face_{fid}", "primitives": [prim]})
        self.nodes.append({"name": f"face_{fid}", "mesh": len(self.meshes) - 1,
                           "extras": {"kind": "face", "id": fid}})

    def add_edge(self, eid, pts):
        prim = {"attributes": {"POSITION": self._vec3(pts)}, "mode": 3}
        self.meshes.append({"name": f"edge_{eid}", "primitives": [prim]})
        self.nodes.append({"name": f"edge_{eid}", "mesh": len(self.meshes) - 1,
                           "extras": {"kind": "edge", "id": eid}})

    def write(self, path: Path):
        gltf = {
            "asset": {"version": "2.0", "generator": "build123d + portfolio exporter"},
            "scene": 0,
            "scenes": [{"nodes": list(range(len(self.nodes)))}],
            "nodes": self.nodes, "meshes": self.meshes,
            "accessors": self.accessors, "bufferViews": self.views,
            "buffers": [{"byteLength": len(self.blob)}],
        }
        js = json.dumps(gltf, separators=(",", ":")).encode()
        js += b" " * (-len(js) % 4)
        bin_ = bytes(self.blob) + b"\0" * (-len(self.blob) % 4)
        total = 12 + 8 + len(js) + 8 + len(bin_)
        with open(path, "wb") as f:
            f.write(struct.pack("<III", 0x46546C67, 2, total))
            f.write(struct.pack("<II", len(js), 0x4E4F534A) + js)
            f.write(struct.pack("<II", len(bin_), 0x004E4942) + bin_)


def main():
    solid = part_module.make_part()
    glb = GlbWriter()
    faces_meta, edges_meta = [], []

    for fid, face in enumerate(solid.faces()):
        verts, tris = face.tessellate(LIN_TOL, ANG_TOL)
        pos = np.array([y_up(v) for v in verts], dtype=np.float32)
        nrm = np.array([y_up(face.normal_at(v)) for v in verts], dtype=np.float32)
        tri = np.array(tris, dtype=np.uint32).reshape(-1, 3)
        # Make the winding agree with the outward normal so front faces render correctly
        a, b, c = pos[tri[:, 0]], pos[tri[:, 1]], pos[tri[:, 2]]
        flip = np.einsum("ij,ij->i", np.cross(b - a, c - a), nrm[tri[:, 0]]) < 0
        tri[flip] = tri[flip][:, [0, 2, 1]]
        glb.add_face(fid, pos, nrm, tri)

        meta = {"id": fid, "type": face.geom_type.name, "area": r(face.area, 3),
                "center": [r(x) for x in y_up(face.center())]}
        if face.geom_type == GeomType.PLANE:
            meta["normal"] = [r(x) for x in y_up(face.normal_at())]
        if face.geom_type in (GeomType.CYLINDER, GeomType.TORUS, GeomType.CONE, GeomType.SPHERE):
            try:
                rad = face.radius
                if rad is not None:
                    meta["radius"] = r(rad, 3)
            except Exception:
                pass
        faces_meta.append(meta)

    for eid, edge in enumerate(solid.edges()):
        n = max(2, int(edge.length / 0.6) + 1) if edge.geom_type != GeomType.LINE else 2
        pts = np.array([y_up(edge.position_at(t)) for t in np.linspace(0, 1, n)], dtype=np.float32)
        glb.add_edge(eid, pts)
        meta = {"id": eid, "type": edge.geom_type.name, "length": r(edge.length, 3),
                "center": [r(x) for x in y_up(edge.center())]}
        if edge.geom_type == GeomType.CIRCLE:
            meta["radius"] = r(edge.radius, 3)
        edges_meta.append(meta)

    bb = solid.bounding_box()
    summary = {
        "name": "Flanged hub",
        "units": "mm",
        "source": "cad/part.py",
        "build123d": build123d.__version__,
        "volume": r(solid.volume, 2),
        "area": r(solid.area, 2),
        "bbox": [r(bb.size.X, 3), r(bb.size.Z, 3), r(bb.size.Y, 3)],
        "faceCount": len(faces_meta),
        "edgeCount": len(edges_meta),
        "faces": faces_meta,
        "edges": edges_meta,
    }

    OUT.mkdir(parents=True, exist_ok=True)
    glb.write(OUT / f"{NAME}.glb")
    META_OUT.mkdir(parents=True, exist_ok=True)
    (META_OUT / f"{NAME}.json").write_text(json.dumps(summary, indent=1))
    print(f"{NAME}: {summary['faceCount']} faces, {summary['edgeCount']} edges, "
          f"volume {summary['volume']} mm3, glb {(OUT / f'{NAME}.glb').stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
