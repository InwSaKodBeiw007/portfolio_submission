'use client'

import React, { useMemo, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function Ocean() {
  const { scene, animations } = useGLTF('/Background-Infinite.glb')
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
          // On mobile, switch to MeshBasicMaterial with NO extra features
          const newMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color('#080808'), // Very dark fixed color
            map: oldMaterial.map, // Keep texture if exists
            transparent: oldMaterial.transparent,
            opacity: oldMaterial.opacity,
          })
          
          // Clone and strip geometry to the absolute bare minimum
          const geom = node.geometry.clone()
          geom.deleteAttribute('normal') // MeshBasicMaterial doesn't need normals
          geom.deleteAttribute('skinIndex')
          geom.deleteAttribute('skinWeight')
          geom.deleteAttribute('color')
          geom.deleteAttribute('tangent')
          geom.morphAttributes = {}
          
          const regularMesh = new THREE.Mesh(geom, newMaterial)
          regularMesh.name = node.name
          
          // Copy world transform to avoid hierarchy issues if we flatten,
          // but here we just replace in place.
          regularMesh.position.copy(node.position)
          regularMesh.rotation.copy(node.rotation)
          regularMesh.scale.copy(node.scale)
          
          meshesToReplace.push({ old: node, new: regularMesh })
        } else {
          // Desktop: keep standard but darken
          if (node.material instanceof THREE.MeshStandardMaterial) {
            node.material.color.multiplyScalar(0.1)
            if (node.material.emissive) {
              node.material.emissive.multiplyScalar(0.1)
            }
          }
        }
      }
    })

    // Perform replacements after traversal to avoid concurrent modification issues
    meshesToReplace.forEach(({ old, new: nm }) => {
      if (old.parent) {
        old.parent.add(nm)
        old.parent.remove(old)
      }
    })

    return clone
  }, [scene, isMobile])

  // Only play animations on desktop to save mobile uniforms/CPU
  const { actions } = useAnimations(isMobile ? [] : animations, clonedScene)

  useEffect(() => {
    if (isMobile) return
    const firstAction = Object.values(actions)[0]
    if (firstAction) {
      firstAction.play()
    }
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
