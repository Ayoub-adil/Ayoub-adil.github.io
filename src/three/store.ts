// Mutable state shared between DOM scroll handlers and the render loop.
// Plain object on purpose: written every scroll tick, read every frame, no React re-render.

export const field = {
  /** 0..4, target stage from scroll (fractional = in transition) */
  morph: 0,
  /** 0 = full intensity, 1 = dimmed backdrop for the lower sections */
  dim: 0,
  /** normalised pointer, -1..1 */
  pointer: { x: 0, y: 0 },
  reduced: false,
  /** 0..1: hero head flying onto the About portrait */
  toPhoto: 0,
  /** About portrait in NDC: left, top, right, bottom */
  photoRect: [0.2, 0.5, 0.6, -0.5] as [number, number, number, number],
}

export const MOBILE_QUERY = '(max-width: 767px)'

export function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/** Scroll progress through the sequence (0..1) -> morph value with holds on each stage. */
export function progressToMorph(p: number, stages: number) {
  const z = Math.min(Math.max(p, 0), 0.9999) * stages
  const k = Math.floor(z)
  const f = z - k
  if (k >= stages - 1) return { morph: stages - 1, step: stages - 1 }
  const t = Math.min(Math.max((f - 0.5) / 0.5, 0), 1)
  return { morph: k + t * t * (3 - 2 * t), step: f < 0.75 ? k : k + 1 }
}
