'use client'

import React, { useEffect, useMemo, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import TechIcon3D from '../canvas/TechIcon3D'
import { useGLTF } from '@react-three/drei'

interface TechStackProps {
  isVisible: boolean;
  onTechClick: (tech: string) => void;
}

const technologies = [
  'TypeScript', 'C#', 'Python', 'Lua', 'Unity', 'Blender', 'GDScript', 'HTML', 'Javascript', 'Roblox Studio'
]

// Preload models for immediate visibility
technologies.forEach(tech => {
  let fileName = tech
  if (tech === 'Python') fileName = 'python'
  if (tech === 'Roblox Studio') fileName = 'Roblox_studio'
  useGLTF.preload(`/${encodeURIComponent(fileName)}.glb`)
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

export default function TechStack({ isVisible, onTechClick }: TechStackProps) {
  const [delayedVisible, setDelayedVisible] = useState(false)
  const groupRef = useRef<Group>(null)

  // Spawn delay logic to wait for paintbrush animation and camera transition
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isVisible) {
      timer = setTimeout(() => {
        setDelayedVisible(true)
      }, 2000) // Reduced delay for better responsiveness
    } else {
      setDelayedVisible(false)
    }
    return () => {
      if (timer) clearTimeout(timer);
    }
  }, [isVisible])

  return (
    <group ref={groupRef} position={[0, 3, -10]}>
      {technologies.map((tech, i) => (
        <TechIcon3D
          key={tech}
          name={tech}
          index={i}
          totalCount={technologies.length}
          color={techColors[tech]}
          isVisible={delayedVisible}
          onHover={() => {}} // Light logic handled inside TechIcon3D
          onThemeSwitch={onTechClick}
        />
      ))}
    </group>
  )
}
