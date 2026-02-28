'use client'

import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { Group, MathUtils } from 'three'

interface AnimationProps {
  modelRef: React.MutableRefObject<Group | null>;
  isTechStackVisible: boolean;
}

export default function Animation({ modelRef, isTechStackVisible }: AnimationProps) {
  const { camera, size } = useThree()
  const tlCamera = useRef<gsap.core.Timeline | null>(null)
  const isTransitioning = useRef(false)
  const scrollProgress = useRef(0)

  // Idle Animation and Scroll Follower
  useFrame((state) => {
    if (!modelRef.current || isTechStackVisible || isTransitioning.current) return

    const t = state.clock.getElapsedTime()
    const isMobile = size.width < 768
    const p = scrollProgress.current  // 0 = top, 1 = bottom


    if (isMobile) {

      // ── Consistent Centered Y target ──
      const targetY = 1.2

      // ── Left↔Right drift within the landing zone ──
      const driftX = Math.sin(t * 0.35) * 1.8

      // ── Tilt/Lean: rotate on Z axis toward direction of travel ──
      const driftVelocity = Math.cos(t * 0.35) * 0.35 * 1.8
      const leanZ = -driftVelocity * 0.25

      // ── Apply with smooth lerp ──
      modelRef.current.position.x = MathUtils.lerp(modelRef.current.position.x, driftX, 0.025)
      modelRef.current.position.y = MathUtils.lerp(modelRef.current.position.y, targetY, 0.04)
      modelRef.current.position.z = 2.0

      // Gentle continuous Y rotation
      modelRef.current.rotation.y += state.clock.getDelta() * 0.3

      // Lean on Z follows drift direction
      modelRef.current.rotation.z = MathUtils.lerp(modelRef.current.rotation.z, leanZ, 0.06)

      // Slight upward tilt
      modelRef.current.rotation.x = MathUtils.lerp(modelRef.current.rotation.x, -0.1, 0.04)
    } else {
      // Desktop logic
      const breathingX = Math.sin(t / 4) / 30
      const breathingZ = Math.cos(t / 4) / 30
      let targetX = 0
      let targetRy = 0
      let targetRx = 0
      const sideX = 4.5

      if (p < 0.12) {
        // Hero: Mascot Left, Content Right.
        targetX = -sideX
        targetRy = 0
        targetRx = 0
      } else if (p < 0.45) {
        // Projects: Model Left
        targetX = -sideX
        targetRy = Math.PI / 8
        targetRx = -Math.PI / 15
      } else if (p < 0.8) {
        // About & Skills: Model Right. SHOW BACK.
        targetX = sideX
        targetRy = Math.PI
        targetRx = -Math.PI / 18
      } else {
        // Contact: Model Left
        targetX = -sideX
        targetRy = 0
        targetRx = 0
      }

      modelRef.current.position.x = MathUtils.lerp(modelRef.current.position.x, targetX, 0.05)

      // Perspective-Correct Tilt (เอียงฐาน)
      const tiltFactor = MathUtils.smoothstep(p, 0.12, 0.25)
      const tiltStrength = 0.4
      const currentX = modelRef.current.position.x
      const sideProgress = currentX / sideX
      const targetRz = sideProgress * tiltStrength * Math.cos(targetRy) * tiltFactor

      // Rotation: Smoothly lerp to target orientation
      const subtleSpin = Math.sin(t / 8) * 0.1
      modelRef.current.rotation.y = MathUtils.lerp(modelRef.current.rotation.y, targetRy + subtleSpin, 0.05)

      // Position constraints - Fixed Height
      modelRef.current.position.y = 5.25
      modelRef.current.position.z = 0.95

      // Apply Rotation X & Z (Target + Breathing)
      modelRef.current.rotation.x = MathUtils.lerp(modelRef.current.rotation.x, targetRx + breathingX, 0.05)
      modelRef.current.rotation.z = MathUtils.lerp(modelRef.current.rotation.z, targetRz + breathingZ, 0.05)
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.pageYOffset
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = height > 0 ? winScroll / height : 0
      scrollProgress.current = scrolled
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial progress
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

      tlCamera.current.to(camera.position, {
        x: 0,
        y: 4.75,
        z: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      }, 0)
        .to(camera.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.2,
          ease: 'power3.inOut',
        }, 0)

      if (modelRef.current) {
        const currentY = modelRef.current.rotation.y
        const targetY = 0
        const diffY = (targetY - currentY + Math.PI) % (Math.PI * 2) - Math.PI
        const finalY = currentY + diffY

        // Master's specific request: Mascot at Y: 3 on mobile during Tech Stack
        tlCamera.current.to(modelRef.current.position, {
          x: 0,
          y: isMobile ? 3 : 2,
          z: isMobile ? -8 : -5,
          duration: 1.2,
          ease: 'power3.inOut',
        }, 0)
          .to(modelRef.current.rotation, {
            x: -Math.PI / 12,
            y: finalY,
            z: 0,
            duration: 1.2,
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
