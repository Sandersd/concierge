'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import EmailCapture from '@/components/EmailCapture'
import LoadingScreen from '@/components/LoadingScreen'
import ErrorBoundary from '@/components/ErrorBoundary'

// Dynamically import 3D components to avoid SSR issues
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), {
  ssr: false,
  loading: () => <LoadingScreen />
})

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 w-full h-full">
        <ErrorBoundary>
          <Suspense fallback={<LoadingScreen />}>
            <ThreeScene />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Hero Section with Scroll Animation */}
      <section id="hero" className="relative z-10 min-h-[300vh]">
        {/* UI Overlay positioned above tray */}
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div 
            id="ui-overlay" 
            className="relative z-20 text-center transform transition-opacity duration-300"
            style={{ transform: 'translateZ(20px)' }}
          >
            {/* Title */}
            <h1 className="title-cursive text-6xl md:text-8xl lg:text-9xl mb-6 text-concierge-white opacity-85">
              Concierge
            </h1>
            
            {/* Subheadline */}
            <p className="subhead-sans text-xl md:text-2xl lg:text-3xl mb-12 text-concierge-white opacity-75 max-w-2xl mx-auto px-6">
              Your personal AI travel assistant.
            </p>
            
            {/* Email Capture */}
            <EmailCapture />
          </div>
        </div>
      </section>

      {/* Accessibility Skip Link */}
      <a 
        href="#email-capture"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white text-black px-4 py-2 rounded"
      >
        Skip to email signup
      </a>

      {/* Fallback for non-WebGL browsers */}
      <noscript>
        <div className="fixed inset-0 bg-concierge-black flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="title-cursive text-6xl mb-6">Concierge</h1>
            <p className="text-xl mb-8">Your personal AI travel assistant.</p>
            <EmailCapture />
          </div>
        </div>
      </noscript>
    </main>
  )
}