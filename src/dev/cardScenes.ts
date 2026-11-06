// Camera framing for each project-card video. Rendered by tools/render_cards.mjs.
import type { SceneId } from '../three/shapes'

export interface CardScene {
  id: string // output file: public/img/cards/<id>.mp4
  scene: SceneId
  cam: [number, number, number]
  target: [number, number, number]
  sway: number // radians of left/right orbit over one loop
}

export const CARD_SCENES: CardScene[] = [
  { id: 'lidar', scene: 'detect', cam: [5.2, 4.6, 8.4], target: [-1.3, -0.4, 0.5], sway: 0.35 },
]
