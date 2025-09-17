'use client'

import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('3D Scene Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="fixed inset-0 bg-concierge-black flex items-center justify-center">
            <div className="text-center px-6 max-w-md">
              <h2 className="title-cursive text-4xl mb-6 text-concierge-white opacity-85">
                Concierge
              </h2>
              <p className="text-concierge-white opacity-75 mb-8">
                Your personal AI travel assistant.
              </p>
              <div className="glass-morphism rounded-lg p-6 mb-6">
                <p className="text-sm text-concierge-white opacity-60 mb-4">
                  3D experience temporarily unavailable
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="join-button px-6 py-3 rounded-lg font-medium text-concierge-white"
                >
                  Reload Page
                </button>
              </div>
              <p className="text-xs text-concierge-white opacity-40">
                Enhanced experience requires WebGL support
              </p>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}