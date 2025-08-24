'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { urlForImage } from '@/lib/image'

export default function ScreenshotGallery({ screenshots }: { screenshots: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }
  
  if (!screenshots || screenshots.length === 0) return null
  
  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold mb-6">Screenshots</h2>
      
      <div className="relative">
        {/* Main Screenshot Display */}
        <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <Image
            src={urlForImage(screenshots[currentIndex].image)}
            alt={screenshots[currentIndex].caption || `Screenshot ${currentIndex + 1}`}
            fill
            className="object-contain"
          />
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous screenshot"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Next screenshot"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Caption */}
        {screenshots[currentIndex].caption && (
          <p className="mt-3 text-center text-gray-600 dark:text-gray-400">
            {screenshots[currentIndex].caption}
          </p>
        )}
        
        {/* Thumbnail Strip */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {screenshots.map((screenshot, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 relative w-24 h-16 rounded overflow-hidden border-2 transition-all ${
                idx === currentIndex 
                  ? 'border-blue-500 ring-2 ring-blue-500/50' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <Image
                src={urlForImage(screenshot.image)}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}