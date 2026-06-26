import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from 'three'

import { DEFAULT_LOOK, DEFAULT_POS, ZOOM_POS, ZOOM_LOOK } from "../constants"

function CameraRig({ zoomed, mouseRef }) {
  const { camera } = useThree()
  const lookAt = useRef(new THREE.Vector3().copy(DEFAULT_LOOK))
  const targetPos = useRef(new THREE.Vector3().copy(DEFAULT_POS))
  const mouseVec = useRef(new THREE.Vector3())

  useFrame(() => {
    if (zoomed) {
      targetPos.current.copy(ZOOM_POS)
      lookAt.current.lerp(ZOOM_LOOK, 0.06)
    } else {
      mouseVec.current.set(mouseRef.current.x * 0.18, mouseRef.current.y * 0.09, 0)
      targetPos.current.copy(DEFAULT_POS).add(mouseVec.current)
      lookAt.current.lerp(DEFAULT_LOOK, 0.06)
    }
    camera.position.lerp(targetPos.current, zoomed ? 0.06 : 0.24)
    camera.lookAt(lookAt.current)
  })

  return null
}

export default CameraRig