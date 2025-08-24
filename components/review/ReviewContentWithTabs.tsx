'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'

interface ReviewContentWithTabsProps {
  content: any[]
  portableTextComponents: any
}

export default function ReviewContentWithTabs({ content, portableTextComponents }: ReviewContentWithTabsProps) {
  const [activeTab, setActiveTab] = useState('overview')
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'alternatives', label: 'Alternatives' },
    { id: 'reviews', label: 'Reviews' }
  ]
  
  // Filter content based on active tab
  const getFilteredContent = () => {
    if (!content || content.length === 0) return []
    
    if (activeTab === 'overview') {
      // Show everything except specialized sections
      return content.filter(block => {
        const blockStr = JSON.stringify(block).toLowerCase()
        return !blockStr.includes('alternative') && 
               !blockStr.includes('competitor') &&
               block._type !== 'comparisonTable'
      })
    }
    
    const filtered = content.filter(block => {
      if (!block) return false
      
      const blockStr = JSON.stringify(block).toLowerCase()
      
      switch (activeTab) {
        case 'features':
          return block._type === 'featureList' || 
                 block._type === 'screenshot' ||
                 blockStr.includes('feature') || 
                 blockStr.includes('capability') ||
                 blockStr.includes('function')
        
        case 'pricing':
          return block._type === 'pricingTable' || 
                 blockStr.includes('pricing') || 
                 blockStr.includes('price') ||
                 blockStr.includes('plan') ||
                 blockStr.includes('cost')
        
        case 'alternatives':
          return block._type === 'comparisonTable' || 
                 blockStr.includes('alternative') || 
                 blockStr.includes('comparison') ||
                 blockStr.includes('competitor') ||
                 blockStr.includes('versus')
        
        case 'reviews':
          return blockStr.includes('review') || 
                 blockStr.includes('testimonial') ||
                 blockStr.includes('feedback') ||
                 blockStr.includes('rating')
        
        default:
          return false
      }
    })
    
    return filtered
  }
  
  const filteredContent = getFilteredContent()
  
  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-800 text-primary-800 dark:border-primary-400 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'reviews' && filteredContent.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4">No Reviews Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Be the first to share your experience with this software! Your feedback helps others make informed decisions.
            </p>
            <button className="btn btn-accent">
              Write a Review
            </button>
          </div>
        ) : filteredContent.length === 0 ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            <p className="text-lg">No content available for this section yet.</p>
            <p className="text-sm mt-2">Check back soon for updates!</p>
          </div>
        ) : (
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <PortableText
              value={filteredContent}
              components={portableTextComponents}
            />
          </article>
        )}
      </div>
    </div>
  )
}