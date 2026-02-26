'use client'

import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Group, MathUtils } from 'three'

gsap.registerPlugin(ScrollTrigger)

interface AnimationProps {
  modelRef: React.MutableRefObject<Group | null>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  isTechStackVisible: boolean;
}

export default function Animation({ modelRef, scrollRef, isTechStackVisible }: AnimationProps) {
  const { camera, size } = useThree()
  const tlCamera = useRef<gsap.core.Timeline | null>(null)
  const isTransitioning = useRef(false)

  // Use useFrame for smooth lerping to target positions based on scroll
  const scrollProgress = useRef(0)

  // Idle Animation and Scroll Follower
  useFrame((state) => {
    if (!modelRef.current || isTechStackVisible || isTransitioning.current) return

    const t = state.clock.getElapsedTime()
    const isMobile = size.width < 768

    // 1. Idle "Breathing" (Sine wave without the large offset)
    const breathingX = Math.sin(t / 4) / 20
    const breathingZ = Math.cos(t / 4) / 20

    // 2. Horizontal Position Mapping based on scrollProgress
    // We map the 0-1 progress to our 5 sections
    const p = scrollProgress.current
    let targetX = 0
    let targetRx = 0

    if (p < 0.08) {
      // Hero: Center
      targetX = 0
      targetRx = 0
    } else if (p < 0.6) {
      // Section 1 & 2: Left (Adjusted for Mobile)
      targetX = isMobile ? -2.5 : -6.65
      targetRx = -Math.PI / 12 // Tilt up
    } else if (p < 0.9) {
      // Section 3: Right (Adjusted for Mobile)
      targetX = isMobile ? 2.5 : 6.5
      targetRx = -Math.PI / 12 // Tilt up
    } else {
      // Section 4: Center
      targetX = 0
      targetRx = 0
    }

    // Smoothly lerp to target X
    modelRef.current.position.x = MathUtils.lerp(modelRef.current.position.x, targetX, 0.05)

    // 3. Rotation: Continuous Spin mapped to scroll
    modelRef.current.rotation.y = MathUtils.lerp(modelRef.current.rotation.y, p * Math.PI * 1, 0.05)

    // 4. Lock Z and Y (to prevent zoom/bounce)
    modelRef.current.position.z = 0.95
    modelRef.current.position.y = isMobile ? 4.0 : 1

    // Apply Rotation X (Target + Breathing)
    modelRef.current.rotation.x = MathUtils.lerp(modelRef.current.rotation.x, targetRx + breathingX, 0.05)
    modelRef.current.rotation.z = MathUtils.lerp(modelRef.current.rotation.z, breathingZ, 0.05)
  })

  useEffect(() => {
    if (!scrollRef.current) return

    // Create the ScrollTrigger to capture the progress
    const st = ScrollTrigger.create({
      trigger: scrollRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2, // Increased from 1.5 for a slower, more premium feel
      onUpdate: (self) => {
        scrollProgress.current = self.progress
      },
    })

    return () => {
      st.kill()
    }
  }, [scrollRef])

  // Tech Stack View Camera Animation
  useEffect(() => {
    if (isTechStackVisible) {
      isTransitioning.current = true
      tlCamera.current = gsap.timeline({
        onComplete: () => {
          isTransitioning.current = false
        },
        onReverseComplete: () => {
          isTransitioning.current = false
        }
      })

      const isMobile = size.width < 768

      // Animate Camera to a 90-degree side view and zoom in
      tlCamera.current.to(camera.position, {
        x: 0.25, // Side view
        y: 5,
        z: 0, // Zoomed in
        duration: 1,
        ease: 'power3.inOut',
      }, 0)
        .to(camera.rotation, {
          x: 0,
          y: 0, // 90-degree rotation
          z: 0,
          duration: 1,
          ease: 'power3.inOut',
        }, 0)

      // Animate Model to center
      if (modelRef.current) {
        // Shortest path rotation formula
        const currentY = modelRef.current.rotation.y
        const targetY = 5.4
        const diffY = (targetY - currentY + Math.PI) % (Math.PI * 2) - Math.PI
        const finalY = currentY + diffY

        tlCamera.current.to(modelRef.current.position, {
          x: isMobile ? 0.5 : 1,
          y: isMobile ? 1.5 : -2, // Move even higher on mobile
          z: isMobile ? -8.5 : -2, // Move backward on mobile (further from camera)
          duration: 1,
          ease: 'power3.inOut',
        }, 0)
          .to(modelRef.current.rotation, {
            x: -Math.PI / 24, // Tilt up slightly
            y: finalY,
            z: 0.22,
            duration: 1,
            ease: 'power3.inOut',
          }, 0)
      }
    } else {
      if (tlCamera.current) {
        isTransitioning.current = true
        tlCamera.current.reverse()
      }
    }
  }, [isTechStackVisible, camera, modelRef, size.width])

  return null
}
