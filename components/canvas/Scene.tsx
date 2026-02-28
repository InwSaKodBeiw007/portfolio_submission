'use client'

import React, { Suspense, RefObject, useRef, useCallback, useState, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Html, PresentationControls, PerspectiveCamera } from '@react-three/drei'
import { Model } from './Model'
import Animation from './Animation'
import Ocean from './Ocean'
import TechStack from '../ui/TechStack'
import * as THREE from 'three'
import { Group } from 'three'

interface SceneProps {
  scrollRef: RefObject<HTMLDivElement | null>;
  isTechStackVisible: boolean;
  currentTheme: { background: string; lightColor: string };
  setCurrentTheme: React.Dispatch<React.SetStateAction<{ background: string; lightColor: string }>>;
}

const CameraConfig = () => {
  const { size } = useThree();

  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 5, 9]}
      fov={size.width < 768 ? 90 : 60}
    />
  );
};

const SceneContent = ({ scrollRef, isTechStackVisible, currentTheme, setCurrentTheme, techGlowLightRef, handleTechHover, handleTechClick }: any) => {
  const { size } = useThree()
  const modelRef = useRef<Group>(null)
  const isMobile = size.width < 768

  return (
    <>
      <CameraConfig />
      <Suspense fallback={<Html center><div className="text-white text-2xl font-bold animate-pulse">The artifact is loading...</div></Html>}>
        <ambientLight intensity={isMobile ? 1 : 2} />
        {!isMobile && (
          <pointLight position={[-10, -10, -10]} intensity={1} color={currentTheme.lightColor} />
        )}
        <directionalLight position={[10, 10, 10]} intensity={isMobile ? 2 : 3} color={currentTheme.lightColor} />
        <pointLight ref={techGlowLightRef} intensity={0} distance={10} decay={2} />
        {!isMobile && <Environment preset="city" />}
        <Ocean />
        <PresentationControls
          damping={0.1}
          snap
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
          <Model ref={modelRef} isAnimating={isTechStackVisible} />
        </PresentationControls>
        {isTechStackVisible && (
          <Suspense fallback={null}>
            <TechStack 
              isVisible={isTechStackVisible} 
              onTechClick={handleTechClick} 
              onTechHover={handleTechHover}
            />
          </Suspense>
        )}
      </Suspense>
      <Animation modelRef={modelRef} scrollRef={scrollRef} isTechStackVisible={isTechStackVisible} />
    </>
  )
}

export default function Scene({ scrollRef, isTechStackVisible, currentTheme, setCurrentTheme }: SceneProps): React.ReactElement {
  const [mounted, setMounted] = useState(false)
  const techGlowLightRef = useRef<THREE.PointLight>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleTechHover = useCallback((pos: THREE.Vector3 | null, color: string | null) => {
    if (techGlowLightRef.current) {
      if (pos && color) {
        techGlowLightRef.current.position.copy(pos)
        techGlowLightRef.current.color.set(color)
        techGlowLightRef.current.intensity = 15
      } else {
        techGlowLightRef.current.intensity = 0
      }
    }
  }, [])

  const handleTechClick = useCallback((tech: string) => {
    // ... Switch logic remains the same
    let newTheme = { ...currentTheme };
    switch (tech) {
      case 'TypeScript':
        newTheme = { background: '#3178C6', lightColor: '#FFFFFF' };
        break;
      case 'C#':
        newTheme = { background: '#9932CC', lightColor: '#FFFFFF' };
        break;
      case 'Python':
        newTheme = { background: '#306998', lightColor: '#FFD43B' };
        break;
      case 'Lua':
        newTheme = { background: '#000080', lightColor: '#FFFFFF' };
        break;
      case 'VS Code':
        newTheme = { background: '#007ACC', lightColor: '#FFFFFF' };
        break;
      case 'Blender':
        newTheme = { background: '#E87B00', lightColor: '#FFFFFF' };
        break;
      case 'GDScript':
        newTheme = { background: '#478CBF', lightColor: '#FFFFFF' };
        break;
      case 'HTML':
        newTheme = { background: '#E44D26', lightColor: '#FFFFFF' };
        break;
      case 'Javascript':
        newTheme = { background: '#F7DF1E', lightColor: '#323330' };
        break;
      case 'Roblox Studio':
        newTheme = { background: '#00A2FF', lightColor: '#FFFFFF' };
        break;
      default:
        newTheme = { background: '#000000', lightColor: '#FFFFFF' };
        break;
    }
    setCurrentTheme(newTheme);
  }, [currentTheme, setCurrentTheme])

  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: currentTheme.background }}
      eventSource={mounted ? document.body : undefined}
      eventPrefix="client"
    >
      {mounted && (
        <SceneContent 
          scrollRef={scrollRef}
          isTechStackVisible={isTechStackVisible}
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
          techGlowLightRef={techGlowLightRef}
          handleTechHover={handleTechHover}
          handleTechClick={handleTechClick}
        />
      )}
    </Canvas>
  )
}






