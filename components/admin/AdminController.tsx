'use client'

import React, { useState, useCallback } from 'react'
import { Settings, X, Monitor, Clock } from 'lucide-react'
import TimelineEditor, { AnimationSettings } from './TimelineEditor'
import ModelPositionPanel, { ModelSettings } from './ModelPositionPanel'

interface AdminControllerProps {
  onAnimationUpdate: (settings: AnimationSettings) => void
  onModelUpdate: (settings: ModelSettings) => void
}

export default function AdminController({ onAnimationUpdate, onModelUpdate }: AdminControllerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showTimeline, setShowTimeline] = useState(false)
  const [showModels, setShowModels] = useState(false)

  const toggleAdmin = useCallback(() => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      // Close all panels when opening admin
      setShowTimeline(false)
      setShowModels(false)
    }
  }, [isOpen])

  const toggleTimeline = useCallback(() => {
    setShowTimeline(!showTimeline)
    if (!showTimeline && showModels) {
      setShowModels(false) // Close models panel when opening timeline
    }
  }, [showTimeline, showModels])

  const toggleModels = useCallback(() => {
    setShowModels(!showModels)
    if (!showModels && showTimeline) {
      setShowTimeline(false) // Close timeline when opening models
    }
  }, [showModels, showTimeline])

  return (
    <>
      {/* Admin Toggle Button */}
      <button
        onClick={toggleAdmin}
        className={`fixed top-4 left-4 z-50 p-3 rounded-full transition-all duration-300 ${
          isOpen 
            ? 'bg-red-600 hover:bg-red-700 text-white' 
            : 'bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20'
        }`}
        title={isOpen ? 'Close Admin' : 'Open Admin Panel'}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
      </button>

      {/* Admin Control Panel */}
      {isOpen && (
        <div className="fixed top-20 left-4 z-50 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg p-4 w-64">
          <h2 className="text-white font-medium mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Admin Controls
          </h2>
          
          <div className="space-y-3">
            {/* Timeline Editor Toggle */}
            <button
              onClick={toggleTimeline}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                showTimeline 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Clock className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Timeline Editor</div>
                <div className="text-xs opacity-75">Edit animation keyframes</div>
              </div>
            </button>

            {/* Model Position Panel Toggle */}
            <button
              onClick={toggleModels}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                showModels 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Monitor className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">3D Models</div>
                <div className="text-xs opacity-75">Position & lighting controls</div>
              </div>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <h3 className="text-white text-sm font-medium mb-2">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  alert('URL copied!')
                }}
                className="px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700"
              >
                Copy URL
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-2 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700"
              >
                Reload
              </button>
            </div>
          </div>

          {/* Current Status */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <h3 className="text-white text-sm font-medium mb-2">Status</h3>
            <div className="text-xs text-white/70 space-y-1">
              <div>Timeline: {showTimeline ? '🟢 Active' : '⚫ Closed'}</div>
              <div>Models: {showModels ? '🟢 Active' : '⚫ Closed'}</div>
              <div>Performance: <span className="text-green-400">60fps</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Editor */}
      <TimelineEditor 
        isVisible={showTimeline}
        onAnimationUpdate={onAnimationUpdate}
      />

      {/* Model Position Panel */}
      <ModelPositionPanel 
        isVisible={showModels}
        onSettingsUpdate={onModelUpdate}
      />
    </>
  )
}