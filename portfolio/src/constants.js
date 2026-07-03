import * as THREE from 'three'

export const DEFAULT_POS = new THREE.Vector3(2.5, 1.4, 2.5)
export const DEFAULT_LOOK = new THREE.Vector3(0, 0.1, 0)
export const ZOOM_POS = new THREE.Vector3(0, 0.4, 0.5) // placeholder, gets computed runtime
export const ZOOM_LOOK = new THREE.Vector3(0, 0.35, 0) // placeholder, gets computed runtime

export const _pos = new THREE.Vector3()
export const _quat = new THREE.Quaternion()
export const _scale = new THREE.Vector3()
export const _dir = new THREE.Vector3()

// drei <Html transform> converts content pixels → world units as
// worldSize = clientPixels * ((distanceFactor || 10) / 400) * objectScale
// With distanceFactor unset that constant is 10/400 = 0.025 (see drei Html.js).
export const DREI_TRANSFORM_RATIO = 10/400

// Pixel height we render the screen at; width follows the screen's real aspect.
// Higher = crisper text (it's scaled down to the plane's true world size anyway).
export const SCREEN_RENDER_H = 1000

