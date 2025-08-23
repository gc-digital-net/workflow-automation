'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { getScreenshotsForSoftware, getScreenshotPlaceholder } from '@/lib/screenshot-sources'

interface RealScreenshotsProps {
  software: string
  feature?: string
  className?: string
}

export default function RealScreenshots({ software, feature, className = '' }: RealScreenshotsProps) {
  const [screenshots, setScreenshots] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageError, setImageError] = useState<boolean>(false)

  useEffect(() => {
    const shots = getScreenshotsForSoftware(software)
    if (shots) {
      setScreenshots(shots)
      // Set default image
      if (feature && shots[feature]) {
        setSelectedImage(shots[feature])
      } else if (shots.dashboard) {
        setSelectedImage(shots.dashboard)
      } else {
        // Get first available screenshot
        const firstKey = Object.keys(shots).find(key => key !== 'alternativeSources')
        if (firstKey) {
          setSelectedImage(shots[firstKey])
        }
      }
    }
  }, [software, feature])

  const handleImageError = () => {
    setImageError(true)
    // Fallback to placeholder
    setSelectedImage(getScreenshotPlaceholder(software, feature || 'Dashboard'))
  }

  if (!screenshots && !imageError) {
    // No screenshots available, use placeholder
    return (
      <div className={`relative w-full ${className}`}>
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-gray-500 dark:text-gray-400">Screenshot coming soon</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{software} {feature || 'Dashboard'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Screenshot Display */}
      {selectedImage && (
        <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🖼️</div>
                <p className="text-gray-500 dark:text-gray-400">Screenshot preview</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{software} {feature || 'Dashboard'}</p>
              </div>
            </div>
          ) : (
            <img
              src={selectedImage}
              alt={`${software} ${feature || 'Dashboard'} Screenshot`}
              className="w-full h-full object-contain"
              onError={handleImageError}
            />
          )}
        </div>
      )}

      {/* Screenshot Thumbnails */}
      {screenshots && Object.keys(screenshots).length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {Object.entries(screenshots).map(([key, url]) => {
            if (key === 'alternativeSources' || typeof url !== 'string') return null
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedImage(url)
                  setImageError(false)
                }}
                className={`relative aspect-video bg-gray-100 dark:bg-gray-800 rounded border-2 overflow-hidden transition-all ${
                  selectedImage === url 
                    ? 'border-primary-500 ring-2 ring-primary-500/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <img
                  src={url}
                  alt={`${software} ${key}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-medium px-2 py-1 bg-black/50 rounded">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Screenshot Caption */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          {feature 
            ? `${software} ${feature.replace(/([A-Z])/g, ' $1').trim()} View`
            : `${software} Dashboard Overview`}
        </p>
        <p className="text-xs mt-1">
          Screenshots from official {software} resources
        </p>
      </div>
    </div>
  )
}

// Component for inline screenshots in content
export function InlineScreenshot({ 
  software, 
  type = 'dashboard',
  caption,
  className = '' 
}: { 
  software: string
  type?: string
  caption?: string
  className?: string 
}) {
  const screenshots = getScreenshotsForSoftware(software)
  const imageUrl = screenshots?.[type] || getScreenshotPlaceholder(software, type)

  return (
    <figure className={`my-8 ${className}`}>
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={`${software} ${type}`}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.src = getScreenshotPlaceholder(software, type)
          }}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}