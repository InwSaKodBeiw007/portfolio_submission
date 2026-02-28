'use client'

import React, { useMemo, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function Ocean() {
  const { scene, animations } = useGLTF('/3D_Models/Background-Infinite.glb')
  const { size } = useThree()
  const isMobile = size.width < 768

  // Clone the scene and darken materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone()

    const meshesToReplace: { old: THREE.Mesh; new: THREE.Mesh }[] = []

    clone.traverse((node: THREE.Object3D) => {
      if (node instanceof THREE.Mesh) {
        const oldMaterial = node.material as THREE.MeshStandardMaterial

        if (isMobile) {
          // On mobile, switch to MeshBasicMaterial with NO extra features for performance
          // To fix "too many uniforms" error, we need to minimize the shader
          const newMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color('#1a1a2e'), // Brighter dark blue
            map: oldMaterial.map, // Keep texture if exists
            transparent: oldMaterial.transparent,
            opacity: oldMaterial.opacity,
          })

          // Clone and strip geometry to the bare minimum
          const geom = node.geometry.clone()
          geom.deleteAttribute('normal')
          geom.deleteAttribute('skinIndex')
          geom.deleteAttribute('skinWeight')
          geom.deleteAttribute('color')
          geom.deleteAttribute('tangent')
          
          // CRITICAL: Strip morphAttributes on mobile to fix the uniform limit error
          // This disables morph-based animations on mobile but ensures the model shows up
          geom.morphAttributes = {}

          const regularMesh = new THREE.Mesh(geom, newMaterial)
          regularMesh.name = node.name

          // Copy world transform
          regularMesh.position.copy(node.position)
          regularMesh.rotation.copy(node.rotation)
          regularMesh.scale.copy(node.scale)

          meshesToReplace.push({ old: node, new: regularMesh })
        } else {
          // Desktop: keep standard but adjust brightness
          if (node.material instanceof THREE.MeshStandardMaterial) {
            node.material.color.multiplyScalar(0.8)
            if (node.material.emissive) {
              node.material.emissive.multiplyScalar(0.8)
            }
          }
        }
      }
    })

    // Perform replacements
    meshesToReplace.forEach(({ old, new: nm }) => {
      if (old.parent) {
        old.parent.add(nm)
        old.parent.remove(old)
      }
    })

    return clone
  }, [scene, isMobile])

  const { actions } = useAnimations(animations, clonedScene)

  useEffect(() => {
    // Only play background animations if not on mobile to prevent shader complexity issues
    if (isMobile) return

    Object.values(actions).forEach(action => {
      if (action) {
        action.reset().setLoop(THREE.LoopRepeat, Infinity).play()
      }
    })
  }, [actions, isMobile])

  return (
    <primitive
      object={clonedScene}
      position={[3, 4, -30]}
      scale={20}
      rotation={[0, 0, 0.1]}
    />
  )
}
