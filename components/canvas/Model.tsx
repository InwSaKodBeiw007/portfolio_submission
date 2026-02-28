'use client'

import React, { forwardRef, useEffect, useMemo } from 'react'
import { useGLTF, Center, useAnimations, Float, Resize } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Group, LoopOnce } from 'three'

/**
 * Props for the Model component.
 */
interface ModelGroupProps extends React.ComponentPropsWithoutRef<'group'> {
  /** Optional children for the model group */
  children?: React.ReactNode;
  /** Whether the model should play its first animation */
  isAnimating?: boolean;
}

export const Model = forwardRef<Group, ModelGroupProps>(({ isAnimating, ...props }, ref) => {
  const { scene, animations } = useGLTF('/3D_Models/Moving-Snuff.glb')
  const { actions } = useAnimations(animations, scene)
  const { size } = useThree()

  const modelScale: number = useMemo(() => {
    const isMobile = size.width < 768
    return isMobile ? 4 : 5.85
  }, [size.width])

  useEffect(() => {
    if (isAnimating && actions && animations.length > 0) {
      // Play animations at extreme speed as requested: REALLY FAST (7x)
      Object.values(actions).forEach(action => {
        if (action) {
          action.reset()
            .setLoop(LoopOnce, 1)
            .setEffectiveTimeScale(7) // High speed to match icon appearance
            .fadeIn(0.1)
            .play()
          
          action.clampWhenFinished = true
        }
      })
    } else if (actions && animations.length > 0) {
      // Return to idle
      Object.values(actions).forEach(action => {
        if (action) action.fadeOut(0.5)
      })
    }
  }, [isAnimating, actions, animations])

  return (
    <group ref={ref} {...props} dispose={null}>
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={1.5}
        floatingRange={[-0.2, 0.2]}
      >
        <Center>
          {scene && (
            <group scale={modelScale}>
              <Resize height>
                <primitive object={scene} />
              </Resize>
            </group>
          )}
        </Center>
      </Float>
    </group>
  )
})

useGLTF.preload('/3D_Models/Moving-Snuff.glb')
