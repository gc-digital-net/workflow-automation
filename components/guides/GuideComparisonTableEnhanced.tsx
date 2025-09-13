'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'
import {
  CheckIcon,
  XMarkIcon,
  StarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  InformationCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/solid'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface ComparisonItem {
  rank: number
  software?: {
    name: string
    slug?: { current: string }
    logo?: any
    overallScore?: number
    pricing?: {
      starting?: number
      freePlan?: boolean
    }
    features?: string[]
    pros?: string[]
    cons?: string[]
    affiliateLink?: string
  }
  customTitle?: string
  bestFor?: string
  affiliateLink?: string
  keyFeatures?: string[]
}

interface GuideComparisonTableEnhancedProps {
  items: ComparisonItem[]
  fullFeatureList?: string[]
}

type SortField = 'rank' | 'score' | 'price' | 'name'
type SortOrder = 'asc' | 'desc'

export function GuideComparisonTableEnhanced({ 
  items, 
  fullFeatureList 
}: GuideComparisonTableEnhancedProps) {
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const [selectedTools, setSelectedTools] = useState<number[]>([])
  const [sortField, setSortField] = useState<SortField>('rank')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [showOnlyFree, setShowOnlyFree] = useState(false)
  const [priceRange, setPriceRange] = useState<'all' | 'under25' | '25to50' | 'over50'>('all')

  // Get all unique features from all tools
  const allFeatures = fullFeatureList || Array.from(new Set(
    items.flatMap(item => item.keyFeatures || item.software?.features || [])
  )).slice(0, 8) // Limit to 8 most important features for the table

  // Toggle row expansion
  const toggleRowExpansion = (rank: number) => {
    setExpandedRows(prev => 
      prev.includes(rank) 
        ? prev.filter(r => r !== rank)
        : [...prev, rank]
    )
  }

  // Toggle tool selection for comparison
  const toggleToolSelection = (rank: number) => {
    setSelectedTools(prev => {
      if (prev.includes(rank)) {
        return prev.filter(r => r !== rank)
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], rank] // Keep last 3 selections
      }
      return [...prev, rank]
    })
  }

  // Sort items
  const sortedItems = [...items].sort((a, b) => {
    let aVal, bVal
    
    switch (sortField) {
      case 'rank':
        aVal = a.rank
        bVal = b.rank
        break
      case 'score':
        aVal = a.software?.overallScore || 0
        bVal = b.software?.overallScore || 0
        break
      case 'price':
        aVal = a.software?.pricing?.starting || 999999
        bVal = b.software?.pricing?.starting || 999999
        break
      case 'name':
        aVal = (a.software?.name || a.customTitle || '').toLowerCase()
        bVal = (b.software?.name || b.customTitle || '').toLowerCase()
        break
      default:
        return 0
    }
    
    if (sortOrder === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
    }
  })

  // Filter items
  const filteredItems = sortedItems.filter(item => {
    if (showOnlyFree && !item.software?.pricing?.freePlan) return false
    
    const price = item.software?.pricing?.starting || 0
    switch (priceRange) {
      case 'under25':
        return price < 25
      case '25to50':
        return price >= 25 && price <= 50
      case 'over50':
        return price > 50
      default:
        return true
    }
  })

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  // Get sort icon
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowsUpDownIcon className="h-3 w-3 opacity-50" />
    }
    return sortOrder === 'asc' 
      ? <ArrowUpIcon className="h-3 w-3" />
      : <ArrowDownIcon className="h-3 w-3" />
  }

  return (
    <section className="mb-12">
      {/* Header with Filters */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-xl p-6 border border-primary/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="p-2 bg-primary/10 rounded-lg">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              Quick Comparison
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Compare features, pricing, and ratings at a glance
            </p>
          </div>
          
          {/* Filter Controls */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowOnlyFree(!showOnlyFree)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                showOnlyFree 
                  ? 'bg-primary text-white' 
                  : 'bg-white dark:bg-gray-800 border hover:border-primary'
              }`}
            >
              <FunnelIcon className="h-4 w-4" />
              Free Plans Only
            </button>
            
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as any)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white dark:bg-gray-800 border hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Prices</option>
              <option value="under25">Under $25/mo</option>
              <option value="25to50">$25-50/mo</option>
              <option value="over50">Over $50/mo</option>
            </select>

            {selectedTools.length >= 2 && (
              <button
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-yellow-600 transition-all flex items-center gap-2 animate-pulse"
              >
                Compare Selected ({selectedTools.length})
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-card border-x border-b rounded-b-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left p-4 font-semibold sticky left-0 bg-muted/30 z-10 min-w-[250px]">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    Software
                    {getSortIcon('name')}
                  </button>
                </th>
                <th className="text-center p-4 font-semibold min-w-[100px]">
                  <button
                    onClick={() => handleSort('score')}
                    className="flex items-center justify-center gap-2 hover:text-primary transition-colors mx-auto"
                  >
                    Score
                    {getSortIcon('score')}
                  </button>
                </th>
                <th className="text-center p-4 font-semibold min-w-[120px]">
                  <button
                    onClick={() => handleSort('price')}
                    className="flex items-center justify-center gap-2 hover:text-primary transition-colors mx-auto"
                  >
                    Starting Price
                    {getSortIcon('price')}
                  </button>
                </th>
                <th className="text-center p-4 font-semibold min-w-[100px]">Free Plan</th>
                {allFeatures.map((feature, index) => (
                  <th key={index} className="text-center p-4 font-semibold min-w-[100px]">
                    <span className="text-xs">{feature}</span>
                  </th>
                ))}
                <th className="text-center p-4 font-semibold min-w-[120px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => {
                const name = item.software?.name || item.customTitle || 'Unknown'
                const score = item.software?.overallScore || 0
                const price = item.software?.pricing?.starting
                const hasFreePlan = item.software?.pricing?.freePlan
                const features = item.keyFeatures || item.software?.features || []
                const affiliateLink = item.affiliateLink || item.software?.affiliateLink
                const isExpanded = expandedRows.includes(item.rank)
                const isSelected = selectedTools.includes(item.rank)
                const isTopThree = item.rank <= 3

                return (
                  <>
                    <tr 
                      key={item.rank}
                      className={`border-b hover:bg-muted/20 transition-all ${
                        isSelected ? 'bg-primary/5' : ''
                      } ${isTopThree ? 'relative' : ''}`}
                    >
                      {/* Software Name & Logo */}
                      <td className="p-4 sticky left-0 bg-card z-10">
                        <div className="flex items-center gap-3">
                          {/* Selection Checkbox */}
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleToolSelection(item.rank)}
                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          
                          {/* Rank Badge */}
                          <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${
                            item.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 animate-pulse' :
                            item.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                            item.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                            'bg-gray-500'
                          }`}>
                            {item.rank}
                          </div>
                          
                          {/* Logo */}
                          {item.software?.logo && (
                            <div className="w-10 h-10 relative bg-white rounded-lg shadow-sm p-1">
                              <Image
                                src={urlForImage(item.software.logo).width(40).height(40).url()}
                                alt={`${name} logo`}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                          
                          {/* Name & Best For */}
                          <div className="flex-1">
                            <div className="font-semibold flex items-center gap-2">
                              {name}
                              {item.rank === 1 && (
                                <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full font-bold">
                                  #1 PICK
                                </span>
                              )}
                            </div>
                            {item.bestFor && (
                              <div className="text-xs text-muted-foreground">
                                {item.bestFor}
                              </div>
                            )}
                          </div>
                          
                          {/* Expand Button */}
                          <button
                            onClick={() => toggleRowExpansion(item.rank)}
                            className="p-1 hover:bg-muted rounded transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                      
                      {/* Score */}
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(score / 2) 
                                    ? 'text-yellow-500' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-bold mt-1">
                            {score.toFixed(1)}/10
                          </span>
                        </div>
                      </td>
                      
                      {/* Price */}
                      <td className="p-4 text-center">
                        {price ? (
                          <div>
                            <span className="font-bold text-lg">${price}</span>
                            <span className="text-sm text-muted-foreground">/mo</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Custom</span>
                        )}
                      </td>
                      
                      {/* Free Plan */}
                      <td className="p-4 text-center">
                        {hasFreePlan ? (
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <CheckIcon className="h-5 w-5 text-green-600" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full">
                            <XMarkIcon className="h-5 w-5 text-red-600" />
                          </div>
                        )}
                      </td>
                      
                      {/* Features */}
                      {allFeatures.map((feature, fIndex) => (
                        <td key={fIndex} className="p-4 text-center">
                          {features.includes(feature) ? (
                            <div className="inline-flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full">
                              <CheckIcon className="h-4 w-4 text-primary" />
                            </div>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                      ))}
                      
                      {/* Action */}
                      <td className="p-4 text-center">
                        {affiliateLink && (
                          <a
                            href={affiliateLink}
                            target="_blank"
                            rel="sponsored nofollow"
                            className="inline-flex items-center gap-1 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium text-sm transition-all hover:scale-105"
                          >
                            View
                            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                          </a>
                        )}
                      </td>
                    </tr>
                    
                    {/* Expanded Row with Additional Details */}
                    {isExpanded && (
                      <tr className="border-b bg-muted/10">
                        <td colSpan={allFeatures.length + 5} className="p-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Pros */}
                            <div>
                              <h4 className="font-semibold mb-3 text-green-600 flex items-center gap-2">
                                <CheckIcon className="h-5 w-5" />
                                Key Strengths
                              </h4>
                              {item.software?.pros?.length > 0 ? (
                                <ul className="space-y-2">
                                  {item.software.pros.slice(0, 3).map((pro, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <CheckIcon className="h-4 w-4 text-green-600 mt-0.5" />
                                      <span className="text-sm">{pro}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-muted-foreground">No specific pros listed</p>
                              )}
                            </div>
                            
                            {/* Cons */}
                            <div>
                              <h4 className="font-semibold mb-3 text-red-600 flex items-center gap-2">
                                <XMarkIcon className="h-5 w-5" />
                                Limitations
                              </h4>
                              {item.software?.cons?.length > 0 ? (
                                <ul className="space-y-2">
                                  {item.software.cons.slice(0, 3).map((con, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <XMarkIcon className="h-4 w-4 text-red-600 mt-0.5" />
                                      <span className="text-sm">{con}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-muted-foreground">No specific cons listed</p>
                              )}
                            </div>
                          </div>
                          
                          {/* View Full Review Button */}
                          <div className="mt-4 text-center">
                            <a
                              href={`#tool-${item.rank}`}
                              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                            >
                              View Full Review
                              <ArrowDownIcon className="h-4 w-4" />
                            </a>
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
        
        {/* Table Footer with Tips */}
        <div className="p-4 bg-muted/20 border-t">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <InformationCircleIcon className="h-4 w-4" />
            <span>
              <strong>Tip:</strong> Click on column headers to sort • Select up to 3 tools to compare side-by-side • 
              Click the arrow on each row for more details
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}