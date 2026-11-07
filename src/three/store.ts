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
  /** 0..1: position of the scroll within the current "What I do" step (drives a camera orbit) */
  stepFrac: 0.5,
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
