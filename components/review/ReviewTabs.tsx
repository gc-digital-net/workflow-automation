'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'

interface ReviewTabsProps {
  content: any[]
  portableTextComponents: any
  screenshotGallery?: any[]
}

export default function ReviewTabs({ content, portableTextComponents, screenshotGallery }: ReviewTabsProps) {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Filter content by section
  const getContentBySection = (section: string) => {
    const sectionMap: { [key: string]: string[] } = {
      overview: ['overview', 'intro', 'dashboard'],
      features: ['features', 'capability', 'automation', 'ai', 'time', 'goals', 'whiteboard', 'docs'],
      pricing: ['pricing'],
      alternatives: ['alternatives', 'comparison'],
      reviews: ['testimonial', 'review', 'rating']
    }
    
    const keywords = sectionMap[section] || []
    
    return content.filter((block: any) => {
      // Check if it's a heading that matches
      if (block._type === 'block' && block.children?.[0]?.text) {
        const text = block.children[0].text.toLowerCase()
        return keywords.some(keyword => text.includes(keyword))
      }
      
      // Check block keys
      if (block._key) {
        const key = block._key.toLowerCase()
        return keywords.some(keyword => key.includes(keyword))
      }
      
      // Include specific block types for sections
      if (section === 'overview' && ['prosConsBlock', 'faqBlock', 'ctaBlock'].includes(block._type)) {
        return true
      }
      if (section === 'features' && block._type === 'featureList') {
        return true
      }
      if (section === 'pricing' && block._type === 'pricingTable') {
        return true
      }
      if (section === 'alternatives' && block._type === 'comparisonTable') {
        return true
      }
      
      return false
    })
  }
  
  // Get all content if section doesn't have specific content
  const getSectionContent = (section: string) => {
    const sectionContent = getContentBySection(section)
    
    // For overview, show everything if no specific content
    if (section === 'overview' && sectionContent.length === 0) {
      return content
    }
    
    // For reviews section, show placeholder if no reviews
    if (section === 'reviews' && sectionContent.length === 0) {
      return [{
        _type: 'block',
        _key: 'reviews-placeholder',
        style: 'normal',
        children: [{ _type: 'span', text: 'User reviews coming soon. Be the first to review!' }]
      }]
    }
    
    return sectionContent.length > 0 ? sectionContent : content
  }
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'features', label: 'Features' },
    { id: 'alternatives', label: 'Alternatives' }
  ]
  
  return (
    <>
      {/* Tab Navigation */}
      <nav className="flex space-x-8 overflow-x-auto border-b border-gray-200 dark:border-gray-700">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      
      {/* Tab Content */}
      <div className="py-8">
        {activeTab === 'overview' && (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <PortableText 
              value={getSectionContent('overview')} 
              components={portableTextComponents}
            />
          </div>
        )}
        
        {activeTab === 'features' && (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-6">Features</h2>
            <PortableText 
              value={getSectionContent('features')} 
              components={portableTextComponents}
            />
          </div>
        )}
        
        {activeTab === 'pricing' && (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-6">Pricing Plans</h2>
            <PortableText 
              value={getSectionContent('pricing')} 
              components={portableTextComponents}
            />
          </div>
        )}
        
        {activeTab === 'alternatives' && (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-6">Alternatives & Comparison</h2>
            <PortableText 
              value={getSectionContent('alternatives')} 
              components={portableTextComponents}
            />
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">User Reviews</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <PortableText 
                value={getSectionContent('reviews')} 
                components={portableTextComponents}
              />
            </div>
            
            {/* Review submission form placeholder */}
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Share your experience with ClickUp to help others make informed decisions.
              </p>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Submit Review
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}