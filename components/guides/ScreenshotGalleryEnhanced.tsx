'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'
import { 
  XMarkIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  ArrowsPointingOutIcon,
  PlayCircleIcon,
  PhotoIcon
} from '@heroicons/react/24/solid'
import { motion, AnimatePresence } from 'framer-motion'

interface Screenshot {
  _key?: string
  asset?: any
  caption?: string
  alt?: string
}

interface ScreenshotGalleryEnhancedProps {
  screenshots?: Screenshot[]
  title?: string
  videoUrl?: string
  productName?: string
}

export function ScreenshotGalleryEnhanced({ 
  screenshots = [], 
  title = "Screenshots",
  videoUrl,
  productName = "Software"
}: ScreenshotGalleryEnhancedProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // Demo screenshots if none provided
  const demoScreenshots: Screenshot[] = screenshots.length > 0 ? screenshots : [
    { caption: "Dashboard Overview", alt: "Main dashboard view" },
    { caption: "Project Timeline", alt: "Gantt chart view" },
    { caption: "Team Collaboration", alt: "Team workspace" },
    { caption: "Reports & Analytics", alt: "Analytics dashboard" },
    { caption: "Mobile App", alt: "Mobile application view" },
    { caption: "Integrations", alt: "Integration settings" }
  ]

  const handlePrevious = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === 0 ? demoScreenshots.length - 1 : selectedImage - 1)
  }

  const handleNext = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === demoScreenshots.length - 1 ? 0 : selectedImage + 1)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage === null) return
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
    if (e.key === 'Escape') setSelectedImage(null)
  }

  // Add keyboard navigation
  useState(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown as any)
      return () => window.removeEventListener('keydown', handleKeyDown as any)
    }
  })

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <PhotoIcon className="h-6 w-6 text-primary" />
          {title}
        </h3>
        
        {videoUrl && (
          <button
            onClick={() => setIsVideoPlaying(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all group"
          >
            <PlayCircleIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
            Watch Demo Video
          </button>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {demoScreenshots.map((screenshot, index) => (
          <motion.div
            key={screenshot._key || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all"
            onClick={() => setSelectedImage(index)}
          >
            {screenshot.asset ? (
              <Image
                src={urlForImage(screenshot.asset).width(600).height(400).url()}
                alt={screenshot.alt || screenshot.caption || `Screenshot ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              // Placeholder for demo
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <PhotoIcon className="h-12 w-12 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500 text-center">
                  {screenshot.caption || `Screenshot ${index + 1}`}
                </span>
              </div>
            )}
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-medium text-sm">
                  {screenshot.caption || `${productName} Screenshot ${index + 1}`}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <ArrowsPointingOutIcon className="h-4 w-4 text-white/80" />
                  <span className="text-white/80 text-xs">Click to enlarge</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
            
            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </button>
            
            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-6xl max-h-[80vh] mx-auto p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                {demoScreenshots[selectedImage].asset ? (
                  <Image
                    src={urlForImage(demoScreenshots[selectedImage].asset).width(1920).height(1080).url()}
                    alt={demoScreenshots[selectedImage].alt || demoScreenshots[selectedImage].caption || `Screenshot ${selectedImage + 1}`}
                    fill
                    className="object-contain"
                  />
                ) : (
                  // Placeholder for demo
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <PhotoIcon className="h-24 w-24 text-gray-600 mb-4" />
                    <p className="text-white text-xl">
                      {demoScreenshots[selectedImage].caption || `Screenshot ${selectedImage + 1}`}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Caption */}
              {demoScreenshots[selectedImage].caption && (
                <div className="mt-4 text-center">
                  <p className="text-white text-lg">
                    {demoScreenshots[selectedImage].caption}
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    {selectedImage + 1} of {demoScreenshots.length}
                  </p>
                </div>
              )}
            </motion.div>
            
            {/* Thumbnail Strip */}
            <div className="absolute bottom-4 left-0 right-0">
              <div className="flex justify-center gap-2 px-4">
                {demoScreenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImage(index)
                    }}
                    className={`w-16 h-10 rounded transition-all ${
                      index === selectedImage
                        ? 'ring-2 ring-white opacity-100'
                        : 'opacity-50 hover:opacity-75'
                    }`}
                  >
                    <div className="w-full h-full bg-gray-700 rounded overflow-hidden">
                      {demoScreenshots[index].asset ? (
                        <Image
                          src={urlForImage(demoScreenshots[index].asset).width(64).height(40).url()}
                          alt={`Thumbnail ${index + 1}`}
                          width={64}
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setIsVideoPlaying(false)}
          >
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors z-10"
            >
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl mx-auto p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={videoUrl}
                  title={`${productName} Demo Video`}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}