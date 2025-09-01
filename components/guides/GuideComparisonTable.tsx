'use client'

import { useState } from 'react'
import { CheckIcon, XMarkIcon, ChevronUpIcon, ChevronDownIcon, TrophyIcon, StarIcon } from '@heroicons/react/24/solid'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

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
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  const toggleRow = (rank: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(rank)) {
      newExpanded.delete(rank)
    } else {
      newExpanded.add(rank)
    }
    setExpandedRows(newExpanded)
  }

  return (
    <section id="comparison-table" className="mb-12 scroll-mt-24">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Quick Comparison</h2>
          <p className="text-muted-foreground">Compare key features, pricing, and ratings at a glance</p>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded">Best Value</span>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded">Free Plan</span>
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">Premium</span>
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-muted/50 to-muted border-b">
              <th className="text-left p-4 font-semibold text-sm uppercase tracking-wider">Software</th>
              <th className="text-center p-4 font-semibold text-sm uppercase tracking-wider">Rating</th>
              <th className="text-center p-4 font-semibold text-sm uppercase tracking-wider">Price</th>
              <th className="text-center p-4 font-semibold text-sm uppercase tracking-wider hidden md:table-cell">Free Plan</th>
              <th className="text-left p-4 font-semibold text-sm uppercase tracking-wider hidden lg:table-cell">Best For</th>
              <th className="text-center p-4 font-semibold text-sm uppercase tracking-wider">Action</th>
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
                <>
                  <tr 
                    key={item.rank} 
                    className={`border-b transition-all duration-200 cursor-pointer ${
                      hoveredRow === item.rank ? 'bg-muted/30' : ''
                    } ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-50/50 to-transparent dark:from-yellow-900/10' : ''
                    }`}
                    onMouseEnter={() => setHoveredRow(item.rank)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => toggleRow(item.rank)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                          index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white animate-pulse' :
                          index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                          index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                          'bg-gradient-to-br from-muted to-muted/80'
                        }`}>
                          {index === 0 ? <TrophyIcon className="h-5 w-5" /> : item.rank}
                        </span>
                        <div>
                          <span className="font-semibold text-base">{name}</span>
                          {index === 0 && (
                            <span className="ml-2 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full font-bold uppercase tracking-wide">
                              Editor's Choice
                            </span>
                          )}
                          {index === 1 && (
                            <span className="ml-2 px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-full font-semibold">
                              Best Value
                            </span>
                          )}
                        </div>
                        <ChevronDownIcon className={`h-4 w-4 ml-auto transition-transform lg:hidden ${
                          expandedRows.has(item.rank) ? 'rotate-180' : ''
                        }`} />
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(score / 2) ? 'text-yellow-500' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-bold mt-1">{score.toFixed(1)}/10</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      {price ? (
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-lg">${price}</span>
                          <span className="text-xs text-muted-foreground">/month</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground font-medium">Custom</span>
                      )}
                    </td>
                    <td className="p-4 text-center hidden md:table-cell">
                      {hasFreePlan ? (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                          <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="text-xs font-medium text-green-700 dark:text-green-300">Yes</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded-full">
                          <XMarkIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
                          <span className="text-xs font-medium text-red-700 dark:text-red-300">No</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-sm line-clamp-2">{item.bestFor || 'Teams of all sizes'}</span>
                    </td>
                    <td className="p-4">
                      {affiliateLink && (
                        <a
                          href={affiliateLink}
                          target="_blank"
                          rel="sponsored nofollow"
                          onClick={(e) => e.stopPropagation()}
                          className="group inline-flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-md"
                        >
                          <span>Try Free</span>
                          <ArrowTopRightOnSquareIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      )}
                    </td>
                  </tr>
                  {/* Expanded row for mobile */}
                  {expandedRows.has(item.rank) && (
                    <tr className="lg:hidden border-b bg-muted/20">
                      <td colSpan={6} className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="font-medium">Free Plan:</span>
                            <span>{hasFreePlan ? '✓ Available' : '✗ Not Available'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Best For:</span>
                            <span className="text-right text-sm">{item.bestFor || 'Teams of all sizes'}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
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