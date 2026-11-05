"""Flanged hub, the part rendered in the portfolio's CAD viewer.

Units: millimetres. Z is up in build123d; the exporter converts to glTF's Y-up.
"""

from build123d import *

FLANGE_D = 80.0
FLANGE_T = 10.0
HUB_D = 40.0
HUB_H = 25.0
BORE_D = 20.0
BOLT_PCD = 60.0
BOLT_D = 9.0
BOLT_N = 6
KEY_W = 6.0
KEY_DEPTH = 2.8
ROOT_FILLET = 3.0
EDGE_CHAMFER = 1.0


def make_part() -> Part:
    total_h = FLANGE_T + HUB_H

    with BuildPart() as hub:
        # Flange disc and hub boss
        Cylinder(FLANGE_D / 2, FLANGE_T, align=(Align.CENTER, Align.CENTER, Align.MIN))
        with Locations((0, 0, FLANGE_T)):
            Cylinder(HUB_D / 2, HUB_H, align=(Align.CENTER, Align.CENTER, Align.MIN))

        # Root fillet where the boss meets the flange
        root = (
            hub.edges()
            .filter_by(GeomType.CIRCLE)
            .filter_by_position(Axis.Z, FLANGE_T, FLANGE_T)
            .sort_by(SortBy.RADIUS)[0]
        )
        fillet(root, radius=ROOT_FILLET)

        # Break the outer edges of the flange and the top of the boss
        rims = hub.edges().filter_by(GeomType.CIRCLE).filter_by(
            lambda e: abs(e.radius - FLANGE_D / 2) < 1e-6
        )
        boss_top = hub.edges().group_by(Axis.Z)[-1]
        chamfer(rims + boss_top, length=EDGE_CHAMFER)

        # Through bore with keyway
        with Locations((0, 0, total_h)):
            Hole(BORE_D / 2)
        with Locations((BORE_D / 2, 0, total_h / 2)):
            Box(KEY_DEPTH * 2, KEY_W, total_h, mode=Mode.SUBTRACT)

        # Bolt circle
        with Locations((0, 0, FLANGE_T)):
            with PolarLocations(BOLT_PCD / 2, BOLT_N):
                Hole(BOLT_D / 2)

    return hub.part


if __name__ == "__main__":
    p = make_part()
    print(f"faces={len(p.faces())} edges={len(p.edges())} volume={p.volume:.1f} mm3")
