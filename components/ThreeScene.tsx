'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, Preload } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import Scene from './Scene'
import LoadingScreen from './LoadingScreen'
import { AnimationSettings } from './admin/TimelineEditor'
import { ModelSettings } from './admin/ModelPositionPanel'

interface ThreeSceneProps {
  animationSettings?: AnimationSettings
  modelSettings?: ModelSettings
}

export default function ThreeScene({ animationSettings, modelSettings }: ThreeSceneProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <LoadingScreen />
  }

  return (
    <Canvas
      camera={{
        position: [0, 1.6, 3.5],
        fov: 35,
        near: 0.1,
        far: 100
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true
      }}
      dpr={[1, 2]}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'transparent'
      }}
    >
      {/* Lighting setup */}
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight
        position={[-2, 5, -2]}
        intensity={0.3}
        color="#ffffff"
      />

      {/* Environment for reflections */}
      <Environment preset="night" />

      {/* Main scene content */}
      <Suspense fallback={null}>
        <Scene animationSettings={animationSettings} modelSettings={modelSettings} />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}