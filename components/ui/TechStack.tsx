'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Group, Vector3 } from 'three'
import TechIcon3D from '../canvas/TechIcon3D'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

interface TechStackProps {
  isVisible: boolean;
  onTechClick: (tech: string) => void;
  onTechHover: (pos: Vector3 | null, color: string | null) => void;
}

const technologies = [
  'TypeScript', 'C#', 'Python', 'Lua', 'Unity', 'Blender', 'GDScript', 'HTML', 'Javascript', 'Roblox Studio'
]

// Preload models for immediate visibility
technologies.forEach(tech => {
  let fileName = tech
  if (tech === 'Python') fileName = 'python'
  if (tech === 'Roblox Studio') fileName = 'Roblox_studio'
  useGLTF.preload(`/3D_Models/${encodeURIComponent(fileName)}.glb`)
})

const techColors: Record<string, string> = {
  'TypeScript': '#3178C6',
  'C#': '#9932CC',
  'Python': '#267c58',
  'Lua': '#000080',
  'Unity': '#171a1d',
  'Blender': '#E87B00',
  'GDScript': '#478CBF',
  'HTML': '#E44D26',
  'Javascript': '#F7DF1E',
  'Roblox Studio': '#00A2FF'
}

export default function TechStack({ isVisible, onTechClick, onTechHover }: TechStackProps) {
  const [delayedVisible, setDelayedVisible] = useState(false)
  const groupRef = useRef<Group>(null)
  const { size } = useThree()
  const isMobile = size.width < 768

  // Spawn delay logic
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isVisible) {
      timer = setTimeout(() => {
        setDelayedVisible(true)
      }, 2000) // Increased delay for a more deliberate transition
    } else {
      const clearTimer = setTimeout(() => {
        setDelayedVisible(false)
      }, 0)
      return () => clearTimeout(clearTimer)
    }
    return () => {
      if (timer) clearTimeout(timer);
    }
  }, [isVisible])

  return (
    // Master's request: Elevate icons on mobile (y: 5), keep standard on PC (y: 3)
    <group ref={groupRef} position={[0, isMobile ? 5 : 3, -10]}>
      {technologies.map((tech, i) => (
        <TechIcon3D
          key={tech}
          name={tech}
          index={i}
          totalCount={technologies.length}
          color={techColors[tech]}
          isVisible={delayedVisible}
          onHover={onTechHover}
          onThemeSwitch={onTechClick}
        />
      ))}
    </group>
  )
}
