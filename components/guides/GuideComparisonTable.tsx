'use client'

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'

interface ComparisonItem {
  rank: number
  software?: {
    name: string
    overallScore?: number
    pricing?: {
      starting?: number
      freePlan?: boolean
    }
    affiliateLink?: string
  }
  customTitle?: string
  bestFor?: string
  affiliateLink?: string
}

interface GuideComparisonTableProps {
  items: ComparisonItem[]
}

export function GuideComparisonTable({ items }: GuideComparisonTableProps) {
  return (
    <section id="comparison-table" className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Quick Comparison</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-card rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-muted">
              <th className="text-left p-4 font-semibold">Software</th>
              <th className="text-center p-4 font-semibold">Our Score</th>
              <th className="text-center p-4 font-semibold">Starting Price</th>
              <th className="text-center p-4 font-semibold">Free Plan</th>
              <th className="text-left p-4 font-semibold">Best For</th>
              <th className="text-center p-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const name = item.software?.name || item.customTitle || 'Unknown'
              const score = item.software?.overallScore || 0
              const price = item.software?.pricing?.starting
              const hasFreePlan = item.software?.pricing?.freePlan
              const affiliateLink = item.affiliateLink || item.software?.affiliateLink
              
              return (
                <tr key={item.rank} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                        index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                        'bg-muted'
                      }`}>
                        {item.rank}
                      </span>
                      <span className="font-semibold">{name}</span>
                      {index === 0 && (
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-semibold">
                          TOP PICK
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-bold text-lg">{score.toFixed(1)}</span>
                      <span className="text-sm text-muted-foreground">/10</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {price ? (
                      <span className="font-semibold">${price}/mo</span>
                    ) : (
                      <span className="text-muted-foreground">Custom</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {hasFreePlan ? (
                      <CheckIcon className="h-5 w-5 text-green-600 mx-auto" />
                    ) : (
                      <XMarkIcon className="h-5 w-5 text-red-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{item.bestFor || 'General use'}</span>
                  </td>
                  <td className="p-4">
                    {affiliateLink && (
                      <a
                        href={affiliateLink}
                        target="_blank"
                        rel="sponsored nofollow"
                        className="inline-block px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors"
                      >
                        Try Free
                      </a>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> Prices shown are starting prices for paid plans. 
          Most tools offer multiple tiers with different features. 
          Click "Try Free" to explore current pricing and features.
        </p>
      </div>
    </section>
  )
}