'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Group, Mesh } from 'three'
import gsap from 'gsap'

// Register ScrollTrigger plugin only on client side
let ScrollTrigger: any
if (typeof window !== 'undefined') {
  ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)
}

// Component for Butler model
function Butler() {
  const butlerRef = useRef<Group>(null)
  const { scene } = useGLTF('/models/butler.glb')

  // Idle micro-sway animation
  useFrame((state) => {
    if (butlerRef.current) {
      const time = state.clock.getElapsedTime()
      butlerRef.current.rotation.y = Math.sin(time * 0.5) * 0.015
    }
  })

  useEffect(() => {
    if (scene) {
      // Configure materials for matte finish
      scene.traverse((child) => {
        if (child instanceof Mesh && child.material) {
          child.material.metalness = 0
          child.material.roughness = 0.8
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
  }, [scene])

  return (
    <group ref={butlerRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
      <primitive object={scene.clone()} />
    </group>
  )
}

// Component for Tray model with animation
function Tray() {
  const trayRef = useRef<Group>(null)
  const { scene } = useGLTF('/models/tray.glb')

  useEffect(() => {
    if (scene) {
      // Configure PBR materials for tray
      scene.traverse((child) => {
        if (child instanceof Mesh && child.material) {
          child.material.metalness = 0.8
          child.material.roughness = 0.3
          child.material.clearcoat = 0.25
          child.material.color.setHex(0xC0C0C0) // Silver color
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
  }, [scene])

  useEffect(() => {
    if (!trayRef.current) return

    const tray = trayRef.current
    const uiOverlay = document.getElementById('ui-overlay')

    // Set initial position
    tray.position.set(0, 1.35, 0.6)
    tray.rotation.set(0, 0, 0)
    tray.scale.set(1, 1, 1)

    // Create GSAP timeline for scroll animation
    const tl = gsap.timeline({ paused: true })

    // Animation sequence based on design specs
    tl.to(tray.position, {
      duration: 0.15,
      z: 0.4,
      y: 1.37,
      ease: "power2.out"
    }, 0)
    .to(tray.scale, {
      duration: 0.15,
      x: 1.1,
      y: 1.1,
      z: 1.1,
      ease: "power2.out"
    }, 0)
    .to(uiOverlay, {
      duration: 0.2,
      opacity: 0,
      ease: "power3.inOut"
    }, 0.25)
    .to(tray.position, {
      duration: 0.15,
      z: 0.3,
      ease: "power3.inOut"
    }, 0.25)
    .to(tray.rotation, {
      duration: 0.15,
      x: 0.15,
      ease: "power3.inOut"
    }, 0.25)
    .to(tray.rotation, {
      duration: 0.25,
      x: Math.PI * 1.35, // 243 degrees
      ease: "expo.inOut"
    }, 0.4)
    .to(tray.position, {
      duration: 0.25,
      z: 0.18,
      ease: "expo.inOut"
    }, 0.4)
    .to(tray.position, {
      duration: 0.15,
      z: 0.14,
      ease: "expo.inOut"
    }, 0.65)
    .to(tray.scale, {
      duration: 0.15,
      x: 1.4,
      y: 1.4,
      z: 1.4,
      ease: "expo.inOut"
    }, 0.65)

    // ScrollTrigger setup with loop
    if (ScrollTrigger) {
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: true,
        onUpdate: (self: any) => {
          const progress = self.progress
          const wrappedProgress = progress % 1

          tl.progress(wrappedProgress)

          // Handle seamless reset at end of cycle
          if (progress >= 0.995 && wrappedProgress < 0.1) {
            // Reset to initial state during cover moment
            gsap.set(tray.position, { x: 0, y: 1.35, z: 0.6 })
            gsap.set(tray.rotation, { x: 0, y: 0, z: 0 })
            gsap.set(tray.scale, { x: 1, y: 1, z: 1 })
            if (uiOverlay) {
              gsap.set(uiOverlay, { opacity: 1 })
            }
            tl.progress(0)
          }
        }
      })
    }

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((st: any) => st.kill())
      }
    }
  }, [scene])

  return (
    <group ref={trayRef}>
      <primitive object={scene.clone()} />
    </group>
  )
}

// Main Scene component
export default function Scene() {
  return (
    <>
      <Butler />
      <Tray />
    </>
  )
}

// Preload models
useGLTF.preload('/models/butler.glb')
useGLTF.preload('/models/tray.glb')