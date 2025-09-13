'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/lib/sanity/image'
import { portableTextComponents } from '@/components/portable-text/PortableTextComponents'
import { 
  StarIcon,
  CheckIcon,
  XMarkIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/solid'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface GuideItemMinimalProps {
  item: {
    rank: number
    whyThisRank?: string
    verdict?: string
    software?: {
      _id: string
      name: string
      slug?: { current: string }
      logo?: any
      tagline?: string
      shortDescription?: string
      overallScore?: number
      pricing?: {
        starting?: number
        freePlan?: boolean
      }
      pros?: string[]
      cons?: string[]
      bestFor?: string
      keyFeatures?: string[]
      affiliateLink?: string
      screenshotGallery?: any[]
    }
    overrides?: {
      customDescription?: any
      customBestFor?: string
      customKeyFeatures?: string[]
      customPros?: string[]
      customCons?: string[]
      customAffiliateLink?: string
      specialOffer?: string
    }
  }
  guide: any
}

export function GuideItemMinimal({ item, guide }: GuideItemMinimalProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const name = item.software?.name || 'Unknown Tool'
  const description = item.overrides?.customDescription || item.software?.shortDescription
  const bestFor = item.overrides?.customBestFor || item.software?.bestFor
  const pros = item.overrides?.customPros || item.software?.pros || []
  const cons = item.overrides?.customCons || item.software?.cons || []
  const affiliateLink = item.overrides?.customAffiliateLink || item.software?.affiliateLink
  const score = item.software?.overallScore || 0
  const hasReviewPage = item.software?.slug?.current

  // Clean rank display
  const getRankDisplay = () => {
    switch(item.rank) {
      case 1: return { number: '01', label: 'Our Top Choice' }
      case 2: return { number: '02', label: 'Strong Alternative' }
      case 3: return { number: '03', label: 'Budget-Friendly' }
      default: return { number: item.rank.toString().padStart(2, '0'), label: '' }
    }
  }

  const rankDisplay = getRankDisplay()

  return (
    <article className="scroll-mt-24 mb-8">
      <div className="bg-card rounded-lg border border-border/50 hover:border-border transition-all duration-300">
        {/* Header - Clean and Minimal */}
        <div className="p-8">
          <div className="flex items-start gap-6">
            {/* Rank Number - Large and Minimal */}
            <div className="flex-shrink-0">
              <div className="text-5xl font-light text-muted-foreground/30">
                {rankDisplay.number}
              </div>
              {rankDisplay.label && (
                <div className="text-xs text-muted-foreground mt-1">
                  {rankDisplay.label}
                </div>
              )}
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              {/* Title Row */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{name}</h3>
                  
                  {/* Verdict - Clean single line */}
                  {item.verdict && (
                    <p className="text-muted-foreground mb-3">
                      {item.verdict}
                    </p>
                  )}
                  
                  {/* Score and Price - Minimal */}
                  <div className="flex items-center gap-6 text-sm">
                    {score > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(score / 2) ? 'text-primary' : 'text-muted-foreground/20'}`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">{score.toFixed(1)}</span>
                      </div>
                    )}
                    
                    {item.software?.pricing?.starting ? (
                      <span className="text-muted-foreground">
                        From ${item.software.pricing.starting}/mo
                      </span>
                    ) : item.software?.pricing?.freePlan ? (
                      <span className="text-green-600">Free plan available</span>
                    ) : null}
                    
                    {bestFor && (
                      <>
                        <span className="text-muted-foreground/30">•</span>
                        <span className="text-muted-foreground">{bestFor}</span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Logo - Small and Clean */}
                {item.software?.logo && (
                  <div className="flex-shrink-0 w-12 h-12 relative">
                    <Image
                      src={urlForImage(item.software.logo).width(48).height(48).url()}
                      alt={`${name} logo`}
                      fill
                      className="object-contain opacity-60"
                    />
                  </div>
                )}
              </div>
              
              {/* Description - Only if not expanded */}
              {!isExpanded && description && (
                <div className="mt-4 text-muted-foreground leading-relaxed">
                  {typeof description === 'string' ? (
                    <p>{description}</p>
                  ) : (
                    <div className="prose prose-sm max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed">
                      <PortableText value={description} components={portableTextComponents} />
                    </div>
                  )}
                </div>
              )}
              
              {/* Expanded Content */}
              {isExpanded && (
                <div className="mt-6 space-y-6">
                  {/* Description */}
                  {description && (
                    <div className="text-muted-foreground leading-relaxed">
                      {typeof description === 'string' ? (
                        <p>{description}</p>
                      ) : (
                        <div className="prose prose-sm max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed">
                          <PortableText value={description} components={portableTextComponents} />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Why This Rank */}
                  {item.whyThisRank && (
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium mb-2">Why #{item.rank}?</h4>
                      <p className="text-sm text-muted-foreground">{item.whyThisRank}</p>
                    </div>
                  )}
                  
                  {/* Pros and Cons - Minimal Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-muted-foreground">Strengths</h4>
                      {pros.length > 0 ? (
                        <ul className="space-y-2">
                          {pros.slice(0, 4).map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">No specific pros listed</p>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-muted-foreground">Limitations</h4>
                      {cons.length > 0 ? (
                        <ul className="space-y-2">
                          {cons.slice(0, 4).map((con, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <XMarkIcon className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">No specific cons listed</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Action Buttons - Minimal */}
              <div className="flex items-center gap-4 mt-6">
                {affiliateLink && (
                  <a
                    href={affiliateLink}
                    target="_blank"
                    rel="sponsored nofollow"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    Try {name}
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  </a>
                )}
                
                {hasReviewPage && (
                  <Link
                    href={`/reviews/${item.software?.slug?.current}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Full Review
                    <ArrowRightIcon className="h-3 w-3" />
                  </Link>
                )}
                
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="ml-auto inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isExpanded ? 'Show Less' : 'Show More'}
                  {isExpanded ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}