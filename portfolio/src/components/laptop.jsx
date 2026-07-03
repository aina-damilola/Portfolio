import { useState, useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'
import { _pos, _quat, _scale, _dir, DEFAULT_POS, ZOOM_POS, ZOOM_LOOK, DREI_TRANSFORM_RATIO, SCREEN_RENDER_H } from "../constants"
import ScreenContent from './screenContent/main'

function Laptop({ zoomed, onZoomIn, onZoomOut }) {
  const { scene } = useGLTF('/models/laptop.glb')
  const { camera, size } = useThree()
  const detected = useRef(false)
  const [screenInfo, setScreenInfo] = useState(null)

  useFrame(() => {
    if (detected.current) return

    let mesh = null
    scene.traverse(obj => {
      if (obj.name === 'Laptop_Screen' && obj.isMesh) mesh = obj
    })
    if (!mesh) return

    // hide the Blender mesh
    mesh.visible = false
    mesh.updateWorldMatrix(true, false)
    mesh.matrixWorld.decompose(_pos, _quat, _scale)
    mesh.geometry.computeBoundingBox()
    const bb = mesh.geometry.boundingBox

    // 1 axis is normal, 2 are width/height
    // classify the axes by extent and build a basis from the world directions.
    const axes = [
      { dir: new THREE.Vector3(1, 0, 0).transformDirection(mesh.matrixWorld), ext: (bb.max.x - bb.min.x) * Math.abs(_scale.x) },
      { dir: new THREE.Vector3(0, 1, 0).transformDirection(mesh.matrixWorld), ext: (bb.max.y - bb.min.y) * Math.abs(_scale.y) },
      { dir: new THREE.Vector3(0, 0, 1).transformDirection(mesh.matrixWorld), ext: (bb.max.z - bb.min.z) * Math.abs(_scale.z) },
    ].sort((a, b) => a.ext - b.ext)
    const normalAxis = axes[0]  
    const heightAxis = axes[1]
    const widthAxis  = axes[2]  
    const worldW = widthAxis.ext
    const worldH = heightAxis.ext

    // align Html plane with real screen surface
    _dir.copy(DEFAULT_POS).sub(_pos).normalize()
    const forward = normalAxis.dir.clone()
    if (forward.dot(_dir) < 0) forward.negate()         
    const up = heightAxis.dir.clone()
    if (up.y < 0) up.negate()                          
    const right = new THREE.Vector3().crossVectors(up, forward).normalize()
    up.crossVectors(forward, right).normalize()          
    const basis = new THREE.Matrix4().makeBasis(right, up, forward)
    const euler = new THREE.Euler().setFromRotationMatrix(basis)

    const htmlHeight = SCREEN_RENDER_H
    const htmlWidth  = Math.round(SCREEN_RENDER_H * (worldW / worldH))
    const scale = worldH / (htmlHeight * DREI_TRANSFORM_RATIO)

    const info = {
      position: [_pos.x, _pos.y, _pos.z],
      rotation: [euler.x, euler.y, euler.z],
      normal: [forward.x, forward.y, forward.z],
      worldW,
      worldH,
      htmlWidth,
      htmlHeight,
      scale,
    }

    setScreenInfo(info)
    detected.current = true
  })

  // Recompute the zoom target from the CURRENT viewport size (re-runs on resize),
  // so the screen keeps filling the view instead of being baked to the first frame's
  // aspect ratio. CameraRig reads ZOOM_POS/ZOOM_LOOK every frame, so no extra wiring.
  useEffect(() => {
    if (!screenInfo) return
    const { position, normal, worldW, worldH } = screenInfo
    const tanV   = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)
    const aspect = size.width / size.height
    const dist   = Math.max((worldH / 2) / tanV, (worldW / 2) / (tanV * aspect)) * 1.02
    ZOOM_POS.set(
      position[0] + normal[0] * dist,
      position[1] + normal[1] * dist,
      position[2] + normal[2] * dist,
    )
    ZOOM_LOOK.set(position[0], position[1], position[2])
  }, [screenInfo, size.width, size.height, camera.fov])

  return (
    <>
      <primitive
        object={scene}
        rotation={[0, Math.PI, 0]}
        onClick={(e) => { e.stopPropagation(); zoomed ? onZoomOut() : onZoomIn() }}
      />
      {screenInfo && (
        <>
          <mesh
            position={[
              screenInfo.position[0] + screenInfo.normal[0] * 0.005,
              screenInfo.position[1] + screenInfo.normal[1] * 0.005,
              screenInfo.position[2] + screenInfo.normal[2] * 0.005,
            ]}
            rotation={screenInfo.rotation}
            onClick={(e) => { e.stopPropagation(); if (!zoomed) onZoomIn() }}
          >
            <planeGeometry args={[screenInfo.worldW, screenInfo.worldH]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>

          <Html
            transform
            position={screenInfo.position}
            rotation={screenInfo.rotation}
            scale={screenInfo.scale}
            style={{ pointerEvents: zoomed ? 'auto' : 'none' }}
          >
            <ScreenContent w={screenInfo.htmlWidth} h={screenInfo.htmlHeight} onZoomOut={onZoomOut} />
          </Html>
        </>
      )}
    </>
  )
}

export default Laptop