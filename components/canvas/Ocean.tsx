'use client'

import React, { useMemo, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Ocean() {
  const { scene, animations } = useGLTF('/Background-Infinite.glb')
  
  // Clone the scene and darken materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((node: any) => {
      if (node.isMesh) {
        // Make the background significantly darker
        node.material.color.multiplyScalar(0.1)
        if (node.material.emissive) {
          node.material.emissive.multiplyScalar(0.1)
        }
      }
    })
    return clone
  }, [scene])

  const { actions } = useAnimations(animations, clonedScene)

  useEffect(() => {
    const firstAction = Object.values(actions)[0]
    if (firstAction) {
      firstAction.play()
    }
  }, [actions])

  return (
    <primitive
      object={clonedScene}
      position={[3, 4, -30]}
      scale={20}
      rotation={[0, 0, 0.1]}
    />
  )
}
