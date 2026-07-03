import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree, events as createPointerEvents } from '@react-three/fiber'
import { useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'

import CameraRig from './components/CameraRig'
import Laptop from './components/laptop'
import { DEFAULT_POS } from "./constants"

// R3F's default pointer compute uses event.offsetX/Y, which is relative to the
// EVENT TARGET. When you click the <Html> desktop overlay (not the canvas),
// offsetX is relative to that overlay, so raycasts land in the wrong place and
// the click "misses" — which made screen clicks zoom out / fail to zoom in.
// Compute from clientX/Y relative to the canvas rect instead, so raycasting is
// correct no matter which DOM element the event originated on.
const events = (store) => {
  const base = createPointerEvents(store)
  return {
    ...base,
    compute(event, state) {
      const { left, top, width, height } = state.gl.domElement.getBoundingClientRect()
      state.pointer.set(
        ((event.clientX - left) / width) * 2 - 1,
        -((event.clientY - top) / height) * 2 + 1,
      )
      state.raycaster.setFromCamera(state.pointer, state.camera)
    },
  }
}

/**
 * ================
 * HELPER FUNCTIONS
 * ================
 */

function Floor({ zoomed, onZoomOut }) {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      onClick={(e) => { e.stopPropagation(); if (zoomed) onZoomOut() }}
    >
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#060606" roughness={1} />
    </mesh>
  )
}

export default function App() {
  const [zoomed, setZoomed] = useState(false)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setZoomed(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
     <div
      style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}
      onMouseMove={(e) => {
        mouseRef.current = {
          x:  (e.clientX / window.innerWidth  - 0.5) * 6,
          y: -(e.clientY / window.innerHeight - 0.5) * 4,
        }
      }}
    >
      <Canvas
        camera={{ position: DEFAULT_POS.toArray(), fov: 30 }}
        style={{ width: '100%', height: '100%' }}
        events={events}
        onPointerMissed={() => { if (zoomed) setZoomed(false) }}
      >
        <fog attach="fog" args={['#000', 5, 22]} />
        <directionalLight position={[-2, 5, 1]} intensity={1.8} color="#cce0ff" />
        <directionalLight position={[1, 1, 3]}  intensity={0.2} color="#fff4e0" />
        <pointLight position={[0, 0.42, 0.05]} intensity={0.6} color="#ddeeff" distance={1.2} /> 
        <CameraRig zoomed={zoomed} mouseRef={mouseRef} />
        <Laptop
          zoomed={zoomed}
          onZoomIn={() => setZoomed(true)}
          onZoomOut={() => setZoomed(false)}
        />
        <Floor zoomed={zoomed} onZoomOut={() => setZoomed(false)} />
      </Canvas>

      </div>
      </>
  )
}
