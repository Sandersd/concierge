'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Move3D, Copy, RotateCcw, Eye, EyeOff, Settings } from 'lucide-react'

export interface ModelSettings {
  butler: {
    position: { x: number; y: number; z: number }
    rotation: { x: number; y: number; z: number }
    scale: { x: number; y: number; z: number }
    visible: boolean
  }
  tray: {
    position: { x: number; y: number; z: number }
    rotation: { x: number; y: number; z: number }
    scale: { x: number; y: number; z: number }
    visible: boolean
  }
  camera: {
    position: { x: number; y: number; z: number }
    target: { x: number; y: number; z: number }
    fov: number
  }
  lighting: {
    ambientIntensity: number
    directionalIntensity: number
    directionalPosition: { x: number; y: number; z: number }
    rimIntensity: number
    rimPosition: { x: number; y: number; z: number }
  }
}

const defaultSettings: ModelSettings = {
  butler: {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    visible: true
  },
  tray: {
    position: { x: 0, y: 1.35, z: 0.6 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    visible: true
  },
  camera: {
    position: { x: 0, y: 1.6, z: 3.5 },
    target: { x: 0, y: 1.5, z: 0 },
    fov: 35
  },
  lighting: {
    ambientIntensity: 0.2,
    directionalIntensity: 0.8,
    directionalPosition: { x: 5, y: 10, z: 5 },
    rimIntensity: 0.3,
    rimPosition: { x: -2, y: 5, z: -2 }
  }
}

interface ModelPositionPanelProps {
  onSettingsUpdate: (settings: ModelSettings) => void
  isVisible: boolean
}

type TabType = 'butler' | 'tray' | 'camera' | 'lighting'

export default function ModelPositionPanel({ onSettingsUpdate, isVisible }: ModelPositionPanelProps) {
  const [settings, setSettings] = useState<ModelSettings>(defaultSettings)
  const [activeTab, setActiveTab] = useState<TabType>('tray')
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)

  // Update models when settings change
  useEffect(() => {
    if (!isDragging) {
      onSettingsUpdate(settings)
    }
  }, [settings, onSettingsUpdate, isDragging])

  const updateSetting = useCallback((
    category: keyof ModelSettings, 
    property: string, 
    value: any
  ) => {
    setIsDragging(true)
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [property]: value
      }
    }))
    
    setTimeout(() => setIsDragging(false), 100)
  }, [])

  const updateVector = useCallback((
    category: keyof ModelSettings,
    property: string,
    axis: 'x' | 'y' | 'z',
    value: number
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [property]: {
          ...(prev[category] as any)[property],
          [axis]: value
        }
      }
    }))
  }, [])

  const copyToClipboard = useCallback(() => {
    const exportData = {
      modelSettings: settings,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2))
    alert('Model settings copied to clipboard!')
  }, [settings])

  const resetToDefaults = useCallback(() => {
    setSettings(defaultSettings)
  }, [])

  const resetCategory = useCallback((category: keyof ModelSettings) => {
    setSettings(prev => ({
      ...prev,
      [category]: defaultSettings[category]
    }))
  }, [])

  if (!isVisible) return null

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'butler', label: 'Butler', icon: <Move3D className="w-4 h-4" /> },
    { id: 'tray', label: 'Tray', icon: <Move3D className="w-4 h-4" /> },
    { id: 'camera', label: 'Camera', icon: <Eye className="w-4 h-4" /> },
    { id: 'lighting', label: 'Lighting', icon: <Settings className="w-4 h-4" /> }
  ]

  const renderVectorControls = (
    label: string,
    category: keyof ModelSettings,
    property: string,
    vector: { x: number; y: number; z: number },
    step: number = 0.01,
    min?: number,
    max?: number
  ) => (
    <div>
      <label className="block text-white text-sm mb-1">{label}</label>
      <div className="grid grid-cols-3 gap-1">
        {(['x', 'y', 'z'] as const).map(axis => (
          <div key={axis}>
            <label className="block text-white text-xs">{axis.toUpperCase()}</label>
            <input
              type="number"
              value={vector[axis]}
              onChange={(e) => updateVector(category, property, axis, parseFloat(e.target.value))}
              step={step}
              min={min}
              max={max}
              className="w-full px-1 py-1 bg-white/10 text-white rounded text-xs"
            />
          </div>
        ))}
      </div>
    </div>
  )

  const renderSlider = (
    label: string,
    value: number,
    onChange: (value: number) => void,
    min: number = 0,
    max: number = 1,
    step: number = 0.01
  ) => (
    <div>
      <label className="block text-white text-sm mb-1">
        {label}: {value.toFixed(3)}
      </label>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  )

  return (
    <div className="fixed top-4 right-4 w-80 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg z-50">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Move3D className="w-5 h-5 text-white" />
            <h3 className="text-white font-medium">3D Model Controls</h3>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={copyToClipboard}
              className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded"
              title="Copy Settings"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={resetToDefaults}
              className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded"
              title="Reset All"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-4 bg-white/10 rounded-lg p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                activeTab === tab.id 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {/* Butler Tab */}
          {activeTab === 'butler' && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-medium">Butler Model</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateSetting('butler', 'visible', !settings.butler.visible)}
                    className={`p-1 rounded ${settings.butler.visible ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {settings.butler.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => resetCategory('butler')}
                    className="p-1 text-white/70 hover:text-white"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>
              
              {renderVectorControls('Position', 'butler', 'position', settings.butler.position)}
              {renderVectorControls('Rotation (rad)', 'butler', 'rotation', settings.butler.rotation)}
              {renderVectorControls('Scale', 'butler', 'scale', settings.butler.scale, 0.01, 0.1, 5)}
            </>
          )}

          {/* Tray Tab */}
          {activeTab === 'tray' && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-medium">Tray Model</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateSetting('tray', 'visible', !settings.tray.visible)}
                    className={`p-1 rounded ${settings.tray.visible ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {settings.tray.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => resetCategory('tray')}
                    className="p-1 text-white/70 hover:text-white"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>
              
              {renderVectorControls('Position', 'tray', 'position', settings.tray.position)}
              {renderVectorControls('Rotation (rad)', 'tray', 'rotation', settings.tray.rotation)}
              {renderVectorControls('Scale', 'tray', 'scale', settings.tray.scale, 0.01, 0.1, 5)}

              {/* Quick Presets for Tray */}
              <div>
                <label className="block text-white text-sm mb-2">Tray Presets</label>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => updateSetting('tray', 'position', { x: 0, y: 1.35, z: 0.6 })}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                  >
                    Initial
                  </button>
                  <button
                    onClick={() => updateSetting('tray', 'position', { x: 0, y: 1.37, z: 0.14 })}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => updateSetting('tray', 'rotation', { x: 0, y: 0, z: 0 })}
                    className="px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700"
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => updateSetting('tray', 'rotation', { x: Math.PI * 1.35, y: 0, z: 0 })}
                    className="px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700"
                  >
                    Flipped
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Camera Tab */}
          {activeTab === 'camera' && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-medium">Camera Settings</span>
                <button
                  onClick={() => resetCategory('camera')}
                  className="p-1 text-white/70 hover:text-white"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
              
              {renderVectorControls('Position', 'camera', 'position', settings.camera.position)}
              {renderVectorControls('Target', 'camera', 'target', settings.camera.target)}
              
              {renderSlider(
                'Field of View',
                settings.camera.fov,
                (value) => updateSetting('camera', 'fov', value),
                10, 120, 1
              )}

              {/* Camera Presets */}
              <div>
                <label className="block text-white text-sm mb-2">Camera Presets</label>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => updateSetting('camera', 'position', { x: 0, y: 1.6, z: 3.5 })}
                    className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                  >
                    Default
                  </button>
                  <button
                    onClick={() => updateSetting('camera', 'position', { x: 0, y: 2, z: 2 })}
                    className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                  >
                    Close Up
                  </button>
                  <button
                    onClick={() => updateSetting('camera', 'position', { x: 2, y: 1.6, z: 3.5 })}
                    className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                  >
                    Side View
                  </button>
                  <button
                    onClick={() => updateSetting('camera', 'position', { x: 0, y: 3, z: 1 })}
                    className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                  >
                    Top Down
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Lighting Tab */}
          {activeTab === 'lighting' && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-medium">Lighting Setup</span>
                <button
                  onClick={() => resetCategory('lighting')}
                  className="p-1 text-white/70 hover:text-white"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
              
              {renderSlider(
                'Ambient Intensity',
                settings.lighting.ambientIntensity,
                (value) => updateSetting('lighting', 'ambientIntensity', value),
                0, 2, 0.01
              )}
              
              {renderSlider(
                'Directional Intensity',
                settings.lighting.directionalIntensity,
                (value) => updateSetting('lighting', 'directionalIntensity', value),
                0, 2, 0.01
              )}
              
              {renderVectorControls('Directional Position', 'lighting', 'directionalPosition', settings.lighting.directionalPosition, 0.1, -20, 20)}
              
              {renderSlider(
                'Rim Light Intensity',
                settings.lighting.rimIntensity,
                (value) => updateSetting('lighting', 'rimIntensity', value),
                0, 2, 0.01
              )}
              
              {renderVectorControls('Rim Light Position', 'lighting', 'rimPosition', settings.lighting.rimPosition, 0.1, -20, 20)}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1e40af;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1e40af;
        }
      `}</style>
    </div>
  )
}