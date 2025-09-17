'use client'

import { useEffect, useRef } from 'react'

interface PerformanceMetrics {
  fps: number
  memory?: number
  loadTime: number
}

export function usePerformanceMonitor() {
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())
  const fpsHistory = useRef<number[]>([])

  useEffect(() => {
    let animationFrame: number

    const measureFPS = () => {
      const currentTime = performance.now()
      frameCount.current++

      // Calculate FPS every second
      if (currentTime - lastTime.current >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current))
        
        fpsHistory.current.push(fps)
        // Keep only last 10 measurements
        if (fpsHistory.current.length > 10) {
          fpsHistory.current.shift()
        }

        frameCount.current = 0
        lastTime.current = currentTime

        // Log performance warnings
        if (fps < 30) {
          console.warn(`Low FPS detected: ${fps}fps`)
        }
      }

      animationFrame = requestAnimationFrame(measureFPS)
    }

    // Start monitoring after initial load
    const timeout = setTimeout(() => {
      measureFPS()
    }, 1000)

    return () => {
      clearTimeout(timeout)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  const getMetrics = (): PerformanceMetrics => {
    const avgFPS = fpsHistory.current.length > 0 
      ? Math.round(fpsHistory.current.reduce((a, b) => a + b, 0) / fpsHistory.current.length)
      : 0

    const loadTime = performance.timing 
      ? performance.timing.loadEventEnd - performance.timing.navigationStart
      : 0

    // @ts-ignore - memory info may not be available in all browsers
    const memory = (performance as any).memory?.usedJSHeapSize

    return {
      fps: avgFPS,
      memory: memory ? Math.round(memory / 1024 / 1024) : undefined, // MB
      loadTime
    }
  }

  return { getMetrics }
}