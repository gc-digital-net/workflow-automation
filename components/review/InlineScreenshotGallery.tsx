'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDownIcon, ChevronUpIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { urlFor } from '@/lib/sanity'

interface InlineScreenshotGalleryProps {
  screenshots: any[]
  initialDisplayCount?: number
}

export default function InlineScreenshotGallery({ 
  screenshots, 
  initialDisplayCount = 6 
}: InlineScreenshotGalleryProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  
  if (!screenshots || screenshots.length === 0) return null
  
  const displayedScreenshots = isExpanded ? screenshots : screenshots.slice(0, initialDisplayCount)
  const hasMore = screenshots.length > initialDisplayCount
  
  // Helper function to get the image source
  const getImageSrc = (screenshot: any) => {
    if (screenshot.imageUrl && screenshot.imageUrl.startsWith('/')) {
      return screenshot.imageUrl
    }
    if (screenshot.image) {
      return urlFor(screenshot.image).url()
    }
    return screenshot.imageUrl || '/placeholder.png'
  }
  
  return (
    <>
      {/* Inline Gallery Section */}
      <section className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center text-gray-900 dark:text-white">
              <PhotoIcon className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
              Screenshots
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {screenshots.length} {screenshots.length === 1 ? 'image' : 'images'}
            </span>
          </div>
          
          {/* Thumbnail Grid */}
          <div className={`grid ${screenshots.length === 1 ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'} gap-3`}>
            {displayedScreenshots.map((screenshot, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className="group relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all"
                aria-label={`View screenshot ${idx + 1}`}
              >
                <Image
                  src={getImageSrc(screenshot)}
                  alt={screenshot.caption || screenshot.altText || `Screenshot ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-medium truncate">
                      {screenshot.caption || `Screenshot ${idx + 1}`}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Expand/Collapse Button */}
          {hasMore && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2 transition-colors"
            >
              {isExpanded ? (
                <>
                  <ChevronUpIcon className="h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDownIcon className="h-4 w-4" />
                  Show All {screenshots.length} Screenshots
                </>
              )}
            </button>
          )}
        </div>
      </section>
      
      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl w-full max-h-[90vh] flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close screenshot viewer"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
            
            {/* Image Container */}
            <div className="relative flex-1 bg-black rounded-lg overflow-hidden">
              <Image
                src={getImageSrc(screenshots[selectedImage])}
                alt={screenshots[selectedImage].caption || `Screenshot ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            
            {/* Caption and Navigation */}
            <div className="mt-4 flex items-center justify-between text-white">
              <div className="flex-1">
                {screenshots[selectedImage].caption && (
                  <p className="text-sm">{screenshots[selectedImage].caption}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {selectedImage + 1} of {screenshots.length}
                </p>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(prev => prev! > 0 ? prev! - 1 : screenshots.length - 1)
                  }}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Previous screenshot"
                >
                  <ChevronDownIcon className="h-5 w-5 rotate-90" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(prev => prev! < screenshots.length - 1 ? prev! + 1 : 0)
                  }}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Next screenshot"
                >
                  <ChevronDownIcon className="h-5 w-5 -rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}