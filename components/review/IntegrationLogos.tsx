'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface IntegrationLogosProps {
  integrations: string[]
  maxDisplay?: number
}

export default function IntegrationLogos({ integrations, maxDisplay = 12 }: IntegrationLogosProps) {
  const [logoMappings, setLogoMappings] = useState<Record<string, string>>({})
  const [showAll, setShowAll] = useState(false)
  
  useEffect(() => {
    // Load logo mappings
    fetch('/logos/integrations/mappings.json')
      .then(res => res.json())
      .then(data => setLogoMappings(data))
      .catch(err => console.error('Failed to load logo mappings:', err))
  }, [])
  
  const displayedIntegrations = showAll ? integrations : integrations.slice(0, maxDisplay)
  const hasMore = integrations.length > maxDisplay
  
  const getLogoUrl = (integration: string) => {
    // Check if we have a downloaded logo
    if (logoMappings[integration]) {
      return logoMappings[integration]
    }
    
    // Fallback to Clearbit API
    const domains: Record<string, string> = {
      'Slack': 'slack.com',
      'Google Drive': 'drive.google.com',
      'Zoom': 'zoom.us',
      'GitHub': 'github.com',
      'Figma': 'figma.com',
      'Zapier': 'zapier.com',
      'Microsoft Teams': 'teams.microsoft.com',
      'Salesforce': 'salesforce.com',
      'HubSpot': 'hubspot.com',
      'Jira': 'atlassian.com',
      'Trello': 'trello.com',
      'Asana': 'asana.com',
      'Monday.com': 'monday.com',
      'Notion': 'notion.so',
      'Airtable': 'airtable.com',
    }
    
    const domain = domains[integration]
    if (domain) {
      return `https://logo.clearbit.com/${domain}`
    }
    
    // Ultimate fallback - use first letter as placeholder
    return null
  }
  
  return (
    <div className="space-y-8">
      {/* Logo Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
        {displayedIntegrations.map((integration, index) => {
          const logoUrl = getLogoUrl(integration)
          
          return (
            <div
              key={integration}
              className="group relative"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="aspect-square rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up">
                {logoUrl ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={logoUrl}
                      alt={`${integration} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                      onError={(e) => {
                        // If image fails to load, show fallback
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                              <span class="text-white font-bold text-lg">${integration[0]}</span>
                            </div>
                          `
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                    <span className="text-white font-bold text-lg">{integration[0]}</span>
                  </div>
                )}
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {integration}
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Show More/Less Button */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
          >
            {showAll ? (
              <>
                Show Less
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                Show All {integrations.length} Integrations
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
      
      {/* Integration Stats */}
      <div className="flex flex-wrap justify-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            {integrations.length}+
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Direct Integrations</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            1000+
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">via Zapier</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            API
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">REST & Webhooks</div>
        </div>
      </div>
    </div>
  )
}

// Add animation styles
const styles = `
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
  opacity: 0;
}
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}