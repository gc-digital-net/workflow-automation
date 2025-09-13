'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'
import { CheckIcon, XMarkIcon, StarIcon } from '@heroicons/react/24/solid'

interface ComparisonItem {
  rank: number
  software?: {
    name: string
    logo?: any
    overallScore?: number
    pricing?: {
      starting?: number
      freePlan?: boolean
    }
    keyFeatures?: string[]
  }
  customTitle?: string
  bestFor?: string
  keyFeatures?: string[]
}

interface GuideComparisonMinimalProps {
  items: ComparisonItem[]
}

export function GuideComparisonMinimal({ items }: GuideComparisonMinimalProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  // Key comparison points
  const comparisonPoints = [
    'Free Plan',
    'Starting Price',
    'Overall Score',
    'Best For'
  ]

  return (
    <section className="my-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Quick Comparison</h2>
        <p className="text-muted-foreground">Key differences at a glance</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-4 font-medium text-sm text-muted-foreground">
                Software
              </th>
              {comparisonPoints.map((point) => (
                <th key={point} className="text-center py-4 px-4 font-medium text-sm text-muted-foreground min-w-[120px]">
                  {point}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 5).map((item) => {
              const name = item.software?.name || item.customTitle || 'Unknown'
              const score = item.software?.overallScore || 0
              const price = item.software?.pricing?.starting
              const hasFreePlan = item.software?.pricing?.freePlan
              const bestFor = item.bestFor || item.software?.keyFeatures?.[0] || '-'

              return (
                <tr 
                  key={item.rank}
                  className={`border-b transition-colors ${
                    hoveredRow === item.rank ? 'bg-muted/30' : ''
                  }`}
                  onMouseEnter={() => setHoveredRow(item.rank)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Software Name */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-light text-muted-foreground/30">
                        {item.rank.toString().padStart(2, '0')}
                      </span>
                      {item.software?.logo && (
                        <div className="w-8 h-8 relative opacity-70">
                          <Image
                            src={urlForImage(item.software.logo).width(32).height(32).url()}
                            alt={`${name} logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="font-medium">{name}</span>
                    </div>
                  </td>
                  
                  {/* Free Plan */}
                  <td className="py-4 px-4 text-center">
                    {hasFreePlan ? (
                      <CheckIcon className="h-5 w-5 text-green-600 mx-auto" />
                    ) : (
                      <XMarkIcon className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                    )}
                  </td>
                  
                  {/* Starting Price */}
                  <td className="py-4 px-4 text-center">
                    {price ? (
                      <span className="font-medium">${price}/mo</span>
                    ) : (
                      <span className="text-muted-foreground">Custom</span>
                    )}
                  </td>
                  
                  {/* Overall Score */}
                  <td className="py-4 px-4 text-center">
                    {score > 0 ? (
                      <div className="flex items-center justify-center gap-1">
                        <span className="font-medium">{score.toFixed(1)}</span>
                        <StarIcon className="h-4 w-4 text-primary" />
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  
                  {/* Best For */}
                  <td className="py-4 px-4 text-center text-sm text-muted-foreground">
                    {bestFor}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}