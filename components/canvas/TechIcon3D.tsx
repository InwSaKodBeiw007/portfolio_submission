'use client'

import React, { useRef, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, Float, useGLTF, Resize } from '@react-three/drei'
import { Group, Vector3 } from 'three'

interface TechIcon3DProps {
  name: string
  index: number
  totalCount: number
  color: string
  isVisible: boolean
  onHover: (pos: Vector3 | null, color: string | null) => void
  onThemeSwitch: (name: string) => void
}

export default function TechIcon3D({ name, index, totalCount, color, isVisible, onHover, onThemeSwitch }: TechIcon3DProps) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const hoverTimer = useRef<NodeJS.Timeout | null>(null)
  const { camera, size } = useThree()

  // Handle lowercase filename for python and URL encoding for special characters like #
  const modelPath = useMemo(() => {
    let fileName = name
    if (name === 'Python') fileName = 'python'
    if (name === 'Roblox Studio') fileName = 'Roblox_studio'
    return `/${encodeURIComponent(fileName)}.glb`
  }, [name])

  const { scene } = useGLTF(modelPath)

  // Clone scene so multiple instances don't conflict
  const clonedScene = useMemo(() => scene.clone(), [scene])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Single Circular Path with Vertical Oscillation
    if (isVisible) {
      const time = state.clock.getElapsedTime() * 0.4
      const t = time + (index / totalCount) * Math.PI * 2

      // Dynamic radius based on screen width
      const radius = size.width < 768 ? 3.5 : 7

      // Single circle in XZ plane, tilted in Y
      // Peaks (up + front) at t=0
      // Dips (down + back) at t=PI
      const x = Math.sin(t) * radius
      const y = Math.cos(t) * (radius * 0.3) // Vertical oscillation proportional to radius
      const z = Math.cos(t) * radius // Depth peak (front) at same time

      groupRef.current.position.set(x, y, z)
      
      // Update global light position if hovered
      if (hovered) {
        const worldPos = new Vector3()
        groupRef.current.getWorldPosition(worldPos)
        onHover(worldPos, color)
      }
    }

    // Smooth scaling
    const targetScale = isVisible ? (hovered ? 1.2 : 0.8) : 0
    groupRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1)

    // Icons should face the screen until pointed at
    if (!hovered && isVisible) {
      groupRef.current.lookAt(camera.position)
    }

    // Fast rotation on hover
    if (isVisible && hovered) {
      groupRef.current.rotation.y += delta * 3
    }
  })

  const handlePointerEnter = () => {
    if (size.width < 768) return // Disable hover effect on mobile to prevent double-tap issues
    setHovered(true)

    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => {
      onThemeSwitch(name)
    }, 900)
  }

  const handlePointerLeave = () => {
    if (size.width < 768) return
    setHovered(false)
    onHover(null, null)
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current)
      hoverTimer.current = null
    }
  }

  const handleClick = () => {
    onThemeSwitch(name)
    if (size.width < 768) {
      // Provide immediate feedback on mobile
      setHovered(true)
      setTimeout(() => setHovered(false), 500)
    }
  }

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={-2.5}>
        <group
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
        >
          {/* Normalize the size of the model to a unit height */}
          <Resize height>
            <primitive
              object={clonedScene}
              rotation={name === 'GDScript' ? [0, Math.PI / -2, 0] : [0, 0, 0]}
            />
          </Resize>

          <Text
            position={
              name === 'HTML' ? [0, 0.2, 0] : 
              name === 'Javascript' ? [0, -0.5, 0] : 
              [0, -1, 0]
            }
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {name}
          </Text>
        </group>
      </Float>
    </group>
  )
}

