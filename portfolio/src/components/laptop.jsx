import { useState, useRef } from 'react'
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

    const vfov   = THREE.MathUtils.degToRad(camera.fov)
    const tanV   = Math.tan(vfov / 2)
    const aspect = size.width / size.height
    const distH  = (worldH / 2) / tanV
    const distW  = (worldW / 2) / (tanV * aspect)
    const dist   = Math.max(distH, distW) * 1.02
    ZOOM_POS.copy(_pos).addScaledVector(forward, dist)
    ZOOM_LOOK.copy(_pos)

    const htmlHeight = SCREEN_RENDER_H
    const htmlWidth  = Math.round(SCREEN_RENDER_H * (worldW / worldH))
    const scale = worldH / (htmlHeight * DREI_TRANSFORM_RATIO)

    const info = {
      position: [_pos.x, _pos.y, _pos.z],
      rotation: [euler.x, euler.y, euler.z],
      htmlWidth,
      htmlHeight,
      scale,
    }
    // console.log('Screen detected:', JSON.stringify(info), 'worldW', worldW, 'worldH', worldH)
    // console.log('ZOOM_POS set to:', ZOOM_POS.toArray(), 'dist', dist)

    setScreenInfo(info)
    detected.current = true
  })

  return (
    <>
      <primitive
        object={scene}
        rotation={[0, Math.PI, 0]}
        onClick={(e) => { e.stopPropagation(); zoomed ? onZoomOut() : onZoomIn() }}
      />
      {screenInfo &&(
        <Html
          transform
          position={screenInfo.position}
          rotation={screenInfo.rotation}
          scale={screenInfo.scale}
          style={{ pointerEvents: 'auto' }}
        >
          <ScreenContent
            w={screenInfo.htmlWidth}
            h={screenInfo.htmlHeight}
            zoomed={zoomed}
            onActivate={onZoomIn}
          />
        </Html>
      )}
    </>
  )
}

export default Laptop