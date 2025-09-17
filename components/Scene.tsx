'use client'

import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Group, Mesh } from 'three'
import gsap from 'gsap'
import { AnimationSettings } from './admin/TimelineEditor'
import { ModelSettings } from './admin/ModelPositionPanel'

// Register ScrollTrigger plugin only on client side
let ScrollTrigger: any
if (typeof window !== 'undefined') {
  ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)
}

interface SceneProps {
  animationSettings?: AnimationSettings
  modelSettings?: ModelSettings
}

// Component for Butler model
function Butler({ modelSettings }: { modelSettings?: ModelSettings }) {
  const butlerRef = useRef<Group>(null)
  const { scene } = useGLTF('/models/butler.glb')

  // Apply model settings
  useEffect(() => {
    if (butlerRef.current && modelSettings?.butler) {
      const { position, rotation, scale, visible } = modelSettings.butler
      butlerRef.current.position.set(position.x, position.y, position.z)
      butlerRef.current.rotation.set(rotation.x, rotation.y, rotation.z)
      butlerRef.current.scale.set(scale.x, scale.y, scale.z)
      butlerRef.current.visible = visible
    }
  }, [modelSettings])

  // Idle micro-sway animation
  useFrame((state) => {
    if (butlerRef.current && modelSettings?.butler?.visible !== false) {
      const time = state.clock.getElapsedTime()
      const baseRotation = modelSettings?.butler?.rotation?.y || 0
      butlerRef.current.rotation.y = baseRotation + Math.sin(time * 0.5) * 0.015
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
function Tray({ animationSettings, modelSettings }: { 
  animationSettings?: AnimationSettings
  modelSettings?: ModelSettings 
}) {
  const trayRef = useRef<Group>(null)
  const { scene } = useGLTF('/models/tray.glb')
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

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

    // Set initial position (use admin settings if available)
    const initialPos = modelSettings?.tray?.position || { x: 0, y: 1.35, z: 0.6 }
    const initialRot = modelSettings?.tray?.rotation || { x: 0, y: 0, z: 0 }
    const initialScale = modelSettings?.tray?.scale || { x: 1, y: 1, z: 1 }
    
    tray.position.set(initialPos.x, initialPos.y, initialPos.z)
    tray.rotation.set(initialRot.x, initialRot.y, initialRot.z)
    tray.scale.set(initialScale.x, initialScale.y, initialScale.z)

    // Apply visibility
    if (modelSettings?.tray?.visible !== undefined) {
      tray.visible = modelSettings.tray.visible
    }

    // Create GSAP timeline for infinite scroll animation loop
    const tl = gsap.timeline({ paused: true })
    timelineRef.current = tl

    // Use animation settings if provided, otherwise use defaults
    const keyframes = animationSettings?.keyframes || [
      // Default keyframes here
    ]

    // If we have custom keyframes from admin, use them
    if (animationSettings?.keyframes && animationSettings.keyframes.length > 0) {
      // Build timeline from admin keyframes
      animationSettings.keyframes.forEach((kf, index) => {
        if (index === 0) return // Skip first keyframe as it's the starting state
        
        const prevKf = animationSettings.keyframes[index - 1]
        const duration = kf.time - prevKf.time
        
        tl.to(tray.position, {
          duration,
          x: kf.position.x,
          y: kf.position.y,
          z: kf.position.z,
          ease: kf.easing
        }, prevKf.time)
        .to(tray.rotation, {
          duration,
          x: kf.rotation.x,
          y: kf.rotation.y,
          z: kf.rotation.z,
          ease: kf.easing
        }, prevKf.time)
        .to(tray.scale, {
          duration,
          x: kf.scale.x,
          y: kf.scale.y,
          z: kf.scale.z,
          ease: kf.easing
        }, prevKf.time)
        
        if (uiOverlay) {
          tl.to(uiOverlay, {
            duration,
            opacity: kf.uiOpacity,
            ease: kf.easing
          }, prevKf.time)
        }
      })
    } else {
      // Use default animation sequence

    // Phase 1: Tray approaches (0-15%)
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

    // Phase 2: UI fades out, tray tilts (15-25%)
    .to(uiOverlay, {
      duration: 0.1,
      opacity: 0,
      ease: "power3.inOut"
    }, 0.15)
    .to(tray.position, {
      duration: 0.1,
      z: 0.3,
      ease: "power3.inOut"
    }, 0.15)
    .to(tray.rotation, {
      duration: 0.1,
      x: 0.15,
      ease: "power3.inOut"
    }, 0.15)

    // Phase 3: Tray flips to show underside (25-40%)
    .to(tray.rotation, {
      duration: 0.15,
      x: Math.PI * 1.35, // 243 degrees
      ease: "expo.inOut"
    }, 0.25)
    .to(tray.position, {
      duration: 0.15,
      z: 0.18,
      ease: "expo.inOut"
    }, 0.25)

    // Phase 4: Tray fills frame (40-50%) - pause moment
    .to(tray.position, {
      duration: 0.1,
      z: 0.14,
      ease: "expo.inOut"
    }, 0.4)
    .to(tray.scale, {
      duration: 0.1,
      x: 1.4,
      y: 1.4,
      z: 1.4,
      ease: "expo.inOut"
    }, 0.4)

    // Phase 5: Tray flips back to normal (50-65%)
    .to(tray.rotation, {
      duration: 0.15,
      x: 0.15,
      ease: "expo.inOut"
    }, 0.5)
    .to(tray.position, {
      duration: 0.15,
      z: 0.3,
      ease: "expo.inOut"
    }, 0.5)

    // Phase 6: Tray returns to position (65-80%)
    .to(tray.rotation, {
      duration: 0.15,
      x: 0,
      ease: "power3.inOut"
    }, 0.65)
    .to(tray.position, {
      duration: 0.15,
      z: 0.6,
      y: 1.35,
      ease: "power2.inOut"
    }, 0.65)
    .to(tray.scale, {
      duration: 0.15,
      x: 1,
      y: 1,
      z: 1,
      ease: "power2.inOut"
    }, 0.65)

      // Phase 7: UI fades back in (80-100%)
      .to(uiOverlay, {
        duration: 0.2,
        opacity: 1,
        ease: "power3.inOut"
      }, 0.8)
    }

    // Infinite ScrollTrigger setup - loops within hero section
    if (ScrollTrigger) {
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom bottom",
        pin: true, // Pin the hero section
        scrub: 1,
        onUpdate: (self: any) => {
          // Create smooth infinite loop within the hero section
          const rawProgress = self.progress
          // Loop the animation multiple times within the scroll distance
          const loopedProgress = (rawProgress * 4) % 1 // 4 complete loops within the scroll area
          
          tl.progress(loopedProgress)
        }
      })
    }

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((st: any) => st.kill())
      }
    }
  }, [scene, animationSettings, modelSettings])

  return (
    <group ref={trayRef}>
      <primitive object={scene.clone()} />
    </group>
  )
}

// Main Scene component
export default function Scene({ animationSettings, modelSettings }: SceneProps) {
  return (
    <>
      <Butler modelSettings={modelSettings} />
      <Tray animationSettings={animationSettings} modelSettings={modelSettings} />
    </>
  )
}

// Preload models
useGLTF.preload('/models/butler.glb')
useGLTF.preload('/models/tray.glb')