'use client'

import React, { forwardRef, useEffect } from 'react'
import { useGLTF, Center, useAnimations } from '@react-three/drei'
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
  const { scene, animations } = useGLTF('/snuff_with_european.glb')
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    if (isAnimating && actions && animations.length > 0) {
      const action = actions[animations[0].name]
      if (action) {
        action.reset()
          .setLoop(LoopOnce, 1)
          .setEffectiveTimeScale(7) // Increased speed for 'faster' feel
          .fadeIn(0.2)
          .play()
        
        // We must set clampWhenFinished to true to keep the final frame.
        // The linter incorrectly flags this as a hook-state modification.
        // eslint-disable-next-line react-hooks/immutability
        action.clampWhenFinished = true
      }
    } else if (actions && animations.length > 0) {
      const action = actions[animations[0].name]
      if (action) {
        action.fadeOut(0.5)
      }
    }
  }, [isAnimating, actions, animations])

  return (
    <group ref={ref} {...props} dispose={null}>
      <Center top>
        {scene && <primitive object={scene} scale={[95, 100, 90]} />}
      </Center>
    </group>
  )
})

useGLTF.preload('/snuff_with_european.glb')