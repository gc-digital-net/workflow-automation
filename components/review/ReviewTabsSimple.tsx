'use client'

import { useState } from 'react'

interface ReviewTabsSimpleProps {
  content: any[]
  portableTextComponents: any
  PortableText: any
}

export default function ReviewTabsSimple({ content, portableTextComponents, PortableText }: ReviewTabsSimpleProps) {
  const [activeTab, setActiveTab] = useState('overview')
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'alternatives', label: 'Alternatives' },
    { id: 'reviews', label: 'Reviews' }
  ]
  
  // Simple content filtering based on headings
  const getTabContent = () => {
    if (activeTab === 'overview') {
      // Show everything for overview
      return content
    }
    
    // For other tabs, filter content based on keywords in text
    const filters: { [key: string]: string[] } = {
      features: ['feature', 'capability', 'function'],
      pricing: ['pricing', 'price', 'plan', 'cost'],
      alternatives: ['alternative', 'comparison', 'compare', 'competitor'],
      reviews: ['review', 'testimonial', 'feedback']
    }
    
    const keywords = filters[activeTab] || []
    
    if (keywords.length === 0) return content
    
    const filtered = content.filter((block: any) => {
      // Check if block has text that matches keywords
      if (block._type === 'block' && block.children) {
        const text = block.children
          .map((child: any) => child.text || '')
          .join(' ')
          .toLowerCase()
        return keywords.some(keyword => text.includes(keyword))
      }
      
      // Check block type for specific content
      if (activeTab === 'features' && block._type === 'featureList') return true
      if (activeTab === 'pricing' && block._type === 'pricingTable') return true
      if (activeTab === 'alternatives' && block._type === 'comparisonTable') return true
      
      return false
    })
    
    // If no filtered content, show a message
    if (filtered.length === 0) {
      return [{
        _type: 'block',
        _key: `${activeTab}-empty`,
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: activeTab === 'reviews' 
            ? 'No reviews yet. Be the first to review!' 
            : `No ${activeTab} content available yet.`
        }]
      }]
    }
    
    return filtered
  }
  
  return (
    <>
      {/* Tab Navigation */}
      <nav className="flex space-x-8 overflow-x-auto border-b border-gray-200 dark:border-gray-700 mb-8">
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
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <PortableText 
          value={getTabContent()} 
          components={portableTextComponents}
        />
      </div>
    </>
  )
}