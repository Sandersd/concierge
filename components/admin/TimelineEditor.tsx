'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Clock, Play, Pause, Copy, RotateCcw, Settings } from 'lucide-react'

export interface TimelineKeyframe {
  time: number // 0-1 normalized time
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
  uiOpacity: number
  easing: string
  label: string
}

export interface AnimationSettings {
  keyframes: TimelineKeyframe[]
  duration: number
  loops: number
  speed: number
}

const defaultKeyframes: TimelineKeyframe[] = [
  {
    time: 0,
    position: { x: 0, y: 1.35, z: 0.6 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    uiOpacity: 1,
    easing: 'power2.out',
    label: 'Initial State'
  },
  {
    time: 0.15,
    position: { x: 0, y: 1.37, z: 0.4 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1.1, y: 1.1, z: 1.1 },
    uiOpacity: 1,
    easing: 'power2.out',
    label: 'Approach'
  },
  {
    time: 0.25,
    position: { x: 0, y: 1.37, z: 0.3 },
    rotation: { x: 0.15, y: 0, z: 0 },
    scale: { x: 1.1, y: 1.1, z: 1.1 },
    uiOpacity: 0,
    easing: 'power3.inOut',
    label: 'UI Fade & Tilt'
  },
  {
    time: 0.4,
    position: { x: 0, y: 1.37, z: 0.18 },
    rotation: { x: 4.24, y: 0, z: 0 }, // 243 degrees
    scale: { x: 1.1, y: 1.1, z: 1.1 },
    uiOpacity: 0,
    easing: 'expo.inOut',
    label: 'Flip Start'
  },
  {
    time: 0.5,
    position: { x: 0, y: 1.37, z: 0.14 },
    rotation: { x: 4.24, y: 0, z: 0 },
    scale: { x: 1.4, y: 1.4, z: 1.4 },
    uiOpacity: 0,
    easing: 'expo.inOut',
    label: 'Cover Frame'
  },
  {
    time: 0.65,
    position: { x: 0, y: 1.37, z: 0.3 },
    rotation: { x: 0.15, y: 0, z: 0 },
    scale: { x: 1.1, y: 1.1, z: 1.1 },
    uiOpacity: 0,
    easing: 'expo.inOut',
    label: 'Flip Back'
  },
  {
    time: 0.8,
    position: { x: 0, y: 1.35, z: 0.6 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    uiOpacity: 0,
    easing: 'power2.inOut',
    label: 'Return'
  },
  {
    time: 1,
    position: { x: 0, y: 1.35, z: 0.6 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    uiOpacity: 1,
    easing: 'power3.inOut',
    label: 'UI Return'
  }
]

const easingOptions = [
  'power1.out', 'power2.out', 'power3.out',
  'power1.inOut', 'power2.inOut', 'power3.inOut',
  'expo.inOut', 'circ.inOut', 'back.inOut',
  'elastic.out', 'bounce.out', 'sine.inOut'
]

interface TimelineEditorProps {
  onAnimationUpdate: (settings: AnimationSettings) => void
  isVisible: boolean
}

export default function TimelineEditor({ onAnimationUpdate, isVisible }: TimelineEditorProps) {
  const [settings, setSettings] = useState<AnimationSettings>({
    keyframes: defaultKeyframes,
    duration: 1,
    loops: 4,
    speed: 1
  })
  const [selectedKeyframe, setSelectedKeyframe] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Update animation when settings change
  useEffect(() => {
    if (!isDragging) {
      onAnimationUpdate(settings)
    }
  }, [settings, onAnimationUpdate, isDragging])

  const updateKeyframe = useCallback((index: number, updates: Partial<TimelineKeyframe>) => {
    setIsDragging(true)
    setSettings(prev => ({
      ...prev,
      keyframes: prev.keyframes.map((kf, i) => 
        i === index ? { ...kf, ...updates } : kf
      )
    }))
    
    // Clear dragging flag after a short delay
    setTimeout(() => setIsDragging(false), 100)
  }, [])

  const addKeyframe = useCallback((time: number) => {
    const newKeyframe: TimelineKeyframe = {
      time,
      position: { x: 0, y: 1.35, z: 0.6 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      uiOpacity: 1,
      easing: 'power2.out',
      label: `Keyframe ${settings.keyframes.length + 1}`
    }
    
    setSettings(prev => ({
      ...prev,
      keyframes: [...prev.keyframes, newKeyframe].sort((a, b) => a.time - b.time)
    }))
  }, [settings.keyframes.length])

  const removeKeyframe = useCallback((index: number) => {
    if (settings.keyframes.length > 2) {
      setSettings(prev => ({
        ...prev,
        keyframes: prev.keyframes.filter((_, i) => i !== index)
      }))
    }
  }, [settings.keyframes.length])

  const copyToClipboard = useCallback(() => {
    const exportData = {
      animation: settings,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2))
    alert('Animation settings copied to clipboard!')
  }, [settings])

  const resetToDefaults = useCallback(() => {
    setSettings({
      keyframes: defaultKeyframes,
      duration: 1,
      loops: 4,
      speed: 1
    })
  }, [])

  if (!isVisible) return null

  const selectedKf = settings.keyframes[selectedKeyframe]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/20 z-50">
      <div className="p-4 max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-white" />
            <h3 className="text-white font-medium">Animation Timeline Editor</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
            <button
              onClick={resetToDefaults}
              className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Global Controls */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-white text-sm mb-1">Duration</label>
            <input
              type="number"
              value={settings.duration}
              onChange={(e) => setSettings(prev => ({ ...prev, duration: parseFloat(e.target.value) }))}
              step="0.1"
              min="0.1"
              max="5"
              className="w-full px-2 py-1 bg-white/10 text-white rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-white text-sm mb-1">Loops</label>
            <input
              type="number"
              value={settings.loops}
              onChange={(e) => setSettings(prev => ({ ...prev, loops: parseInt(e.target.value) }))}
              min="1"
              max="10"
              className="w-full px-2 py-1 bg-white/10 text-white rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-white text-sm mb-1">Speed</label>
            <input
              type="number"
              value={settings.speed}
              onChange={(e) => setSettings(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
              step="0.1"
              min="0.1"
              max="3"
              className="w-full px-2 py-1 bg-white/10 text-white rounded text-sm"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-white text-sm">Timeline</label>
            <button
              onClick={() => addKeyframe(0.5)}
              className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
            >
              Add Keyframe
            </button>
          </div>
          
          <div className="relative h-12 bg-white/10 rounded">
            {settings.keyframes.map((kf, index) => (
              <button
                key={index}
                onClick={() => setSelectedKeyframe(index)}
                onDoubleClick={() => removeKeyframe(index)}
                className={`absolute top-1 w-4 h-4 rounded-full border-2 transform -translate-x-2 ${
                  selectedKeyframe === index 
                    ? 'bg-blue-500 border-blue-300' 
                    : 'bg-white/30 border-white/50'
                } hover:scale-110 transition-transform`}
                style={{ left: `${kf.time * 100}%` }}
                title={`${kf.label} (${(kf.time * 100).toFixed(1)}%)`}
              />
            ))}
            
            {/* Time markers */}
            <div className="absolute bottom-1 left-0 right-0 flex justify-between text-xs text-white/50">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Keyframe Editor */}
        {selectedKf && (
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-3">
              <div>
                <label className="block text-white text-sm mb-1">Label</label>
                <input
                  type="text"
                  value={selectedKf.label}
                  onChange={(e) => updateKeyframe(selectedKeyframe, { label: e.target.value })}
                  className="w-full px-2 py-1 bg-white/10 text-white rounded text-sm"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-white text-sm mb-1">Time %</label>
                  <input
                    type="number"
                    value={(selectedKf.time * 100).toFixed(1)}
                    onChange={(e) => updateKeyframe(selectedKeyframe, { time: parseFloat(e.target.value) / 100 })}
                    step="0.1"
                    min="0"
                    max="100"
                    className="w-full px-2 py-1 bg-white/10 text-white rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm mb-1">UI Opacity</label>
                  <input
                    type="number"
                    value={selectedKf.uiOpacity}
                    onChange={(e) => updateKeyframe(selectedKeyframe, { uiOpacity: parseFloat(e.target.value) })}
                    step="0.1"
                    min="0"
                    max="1"
                    className="w-full px-2 py-1 bg-white/10 text-white rounded text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm mb-1">Easing</label>
                <select
                  value={selectedKf.easing}
                  onChange={(e) => updateKeyframe(selectedKeyframe, { easing: e.target.value })}
                  className="w-full px-2 py-1 bg-white/10 text-white rounded text-sm"
                >
                  {easingOptions.map(ease => (
                    <option key={ease} value={ease} className="bg-black">{ease}</option>
                  ))}
                </select>
              </div>

              {/* Position */}
              <div>
                <label className="block text-white text-sm mb-1">Position</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['x', 'y', 'z'] as const).map(axis => (
                    <div key={axis}>
                      <label className="block text-white text-xs">{axis.toUpperCase()}</label>
                      <input
                        type="number"
                        value={selectedKf.position[axis]}
                        onChange={(e) => updateKeyframe(selectedKeyframe, {
                          position: { ...selectedKf.position, [axis]: parseFloat(e.target.value) }
                        })}
                        step="0.01"
                        className="w-full px-1 py-1 bg-white/10 text-white rounded text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              {/* Rotation */}
              <div>
                <label className="block text-white text-sm mb-1">Rotation (radians)</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['x', 'y', 'z'] as const).map(axis => (
                    <div key={axis}>
                      <label className="block text-white text-xs">{axis.toUpperCase()}</label>
                      <input
                        type="number"
                        value={selectedKf.rotation[axis]}
                        onChange={(e) => updateKeyframe(selectedKeyframe, {
                          rotation: { ...selectedKf.rotation, [axis]: parseFloat(e.target.value) }
                        })}
                        step="0.01"
                        className="w-full px-1 py-1 bg-white/10 text-white rounded text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Scale */}
              <div>
                <label className="block text-white text-sm mb-1">Scale</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['x', 'y', 'z'] as const).map(axis => (
                    <div key={axis}>
                      <label className="block text-white text-xs">{axis.toUpperCase()}</label>
                      <input
                        type="number"
                        value={selectedKf.scale[axis]}
                        onChange={(e) => updateKeyframe(selectedKeyframe, {
                          scale: { ...selectedKf.scale, [axis]: parseFloat(e.target.value) }
                        })}
                        step="0.01"
                        min="0.1"
                        max="5"
                        className="w-full px-1 py-1 bg-white/10 text-white rounded text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Rotation Presets */}
              <div>
                <label className="block text-white text-sm mb-1">Rotation Presets</label>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => updateKeyframe(selectedKeyframe, { 
                      rotation: { x: 0, y: 0, z: 0 } 
                    })}
                    className="px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => updateKeyframe(selectedKeyframe, { 
                      rotation: { x: Math.PI * 1.35, y: 0, z: 0 } 
                    })}
                    className="px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700"
                  >
                    Flip (243°)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}