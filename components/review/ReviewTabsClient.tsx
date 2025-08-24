'use client'

import { useState } from 'react'

interface ReviewTabsClientProps {
  children: React.ReactNode
  content: any[]
}

export default function ReviewTabsClient({ children, content }: ReviewTabsClientProps) {
  const [activeTab, setActiveTab] = useState('overview')
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'alternatives', label: 'Alternatives' },
    { id: 'reviews', label: 'Reviews' }
  ]
  
  // Simple content filtering
  const shouldShowContent = (block: any): boolean => {
    if (activeTab === 'overview') return true
    
    const blockText = JSON.stringify(block).toLowerCase()
    
    switch (activeTab) {
      case 'features':
        return block._type === 'featureList' || 
               blockText.includes('feature') || 
               blockText.includes('capability')
      
      case 'pricing':
        return block._type === 'pricingTable' || 
               blockText.includes('pricing') || 
               blockText.includes('price') ||
               blockText.includes('plan')
      
      case 'alternatives':
        return block._type === 'comparisonTable' || 
               blockText.includes('alternative') || 
               blockText.includes('comparison') ||
               blockText.includes('competitor')
      
      case 'reviews':
        return blockText.includes('review') || 
               blockText.includes('testimonial') ||
               blockText.includes('feedback')
      
      default:
        return false
    }
  }
  
  const filteredContent = content.filter(shouldShowContent)
  
  return (
    <>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
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
      <div>
        {activeTab === 'reviews' && filteredContent.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">No Reviews Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Be the first to share your experience with this software!
            </p>
            <button className="btn btn-primary">
              Write a Review
            </button>
          </div>
        ) : filteredContent.length === 0 ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            No content available for this section yet.
          </div>
        ) : (
          children
        )}
      </div>
    </>
  )
}