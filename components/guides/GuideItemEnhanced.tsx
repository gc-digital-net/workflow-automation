'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/lib/sanity/image'
import { portableTextComponents } from '@/components/portable-text/PortableTextComponents'
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  StarIcon, 
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
  TrophyIcon,
  BoltIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  PuzzlePieceIcon,
  ChevronRightIcon,
  TagIcon
} from '@heroicons/react/24/solid'
import { 
  ClockIcon,
  BuildingOfficeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

interface GuideItemProps {
  item: {
    rank: number
    software?: {
      _id: string
      name: string
      slug?: { current: string }
      logo?: any
      description?: string
      overallScore?: number
      pricing?: {
        starting?: number
        freePlan?: boolean
        plans?: Array<{
          name: string
          price: number
          features: string[]
        }>
      }
      features?: string[]
      pros?: string[]
      cons?: string[]
      integrations?: string[]
      useCase?: string
      affiliateLink?: string
      screenshots?: any[]
      founded?: string
      headquarters?: string
      website?: string
    }
    customTitle?: string
    description?: any
    keyFeatures?: string[]
    bestFor?: string
    affiliateLink?: string
    affiliateLinkOptions?: {
      openInNewTab?: boolean
      rel?: string
    }
  }
  guide: any
}

export function GuideItemEnhanced({ item, guide }: GuideItemProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'pricing' | 'pros-cons'>('overview')
  const [isExpanded, setIsExpanded] = useState(false)
  
  const title = item.software?.name || item.customTitle || 'Unknown Tool'
  const affiliateLink = item.affiliateLink || item.software?.affiliateLink
  const linkOptions = item.affiliateLinkOptions || { openInNewTab: true, rel: 'sponsored nofollow' }
  const isTopPick = item.rank === 1
  const score = item.software?.overallScore || 0

  // Badge styles based on rank
  const getRankBadge = () => {
    if (item.rank === 1) {
      return {
        bg: 'bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500',
        text: 'text-white',
        icon: <TrophyIcon className="h-8 w-8" />,
        label: "WINNER",
        animation: 'animate-pulse'
      }
    } else if (item.rank === 2) {
      return {
        bg: 'bg-gradient-to-br from-gray-300 to-gray-400',
        text: 'text-white',
        icon: item.rank.toString(),
        label: "RUNNER-UP",
        animation: ''
      }
    } else if (item.rank === 3) {
      return {
        bg: 'bg-gradient-to-br from-orange-400 to-orange-600',
        text: 'text-white',
        icon: item.rank.toString(),
        label: "3RD PLACE",
        animation: ''
      }
    }
    return {
      bg: 'bg-gradient-to-br from-muted to-muted/80',
      text: 'text-foreground',
      icon: item.rank.toString(),
      label: '',
      animation: ''
    }
  }

  const rankBadge = getRankBadge()

  return (
    <article 
      id={item.rank === 1 ? 'top-pick' : `tool-${item.rank}`}
      className={`scroll-mt-24 ${isTopPick ? 'relative' : ''}`}
    >
      {/* Top Pick Highlight Border */}
      {isTopPick && (
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 rounded-2xl opacity-20 blur-xl animate-pulse" />
      )}
      
      <div className={`relative bg-card ${isTopPick ? 'border-2 border-orange-400/50' : 'border'} rounded-xl shadow-sm hover:shadow-lg transition-all duration-300`}>
        {/* Header Section */}
        <div className="p-6 pb-0">
          <div className="flex items-start gap-4">
            {/* Rank Badge */}
            <div className="flex flex-col items-center">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold ${rankBadge.bg} ${rankBadge.text} ${rankBadge.animation} shadow-lg`}>
                {typeof rankBadge.icon === 'string' ? rankBadge.icon : rankBadge.icon}
              </div>
              {rankBadge.label && (
                <span className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {rankBadge.label}
                </span>
              )}
            </div>
            
            {/* Title and Meta Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-3xl font-bold">{title}</h3>
                    {isTopPick && (
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm rounded-full font-bold uppercase tracking-wide flex items-center gap-1">
                        <SparklesIcon className="h-4 w-4" />
                        Editor's Choice {new Date().getFullYear()}
                      </span>
                    )}
                  </div>
                  
                  {/* Rating and Quick Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    {score > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i}
                              className={`h-5 w-5 ${i < Math.floor(score / 2) ? 'text-yellow-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-lg">{score.toFixed(1)}</span>
                        <span className="text-muted-foreground">/10</span>
                      </div>
                    )}
                    
                    <div className="h-5 w-px bg-border" />
                    
                    {item.software?.pricing?.starting ? (
                      <div className="flex items-center gap-1">
                        <CurrencyDollarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>From ${item.software.pricing.starting}/mo</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Custom Pricing</span>
                    )}
                    
                    {item.software?.pricing?.freePlan && (
                      <>
                        <div className="h-5 w-px bg-border" />
                        <span className="text-green-600 font-semibold flex items-center gap-1">
                          <CheckCircleIcon className="h-4 w-4" />
                          Free Plan
                        </span>
                      </>
                    )}
                  </div>
                  
                  {/* Best For Tag */}
                  {item.bestFor && (
                    <div className="mt-3 flex items-center gap-2">
                      <TagIcon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Best for: {item.bestFor}</span>
                    </div>
                  )}
                </div>

                {/* Logo */}
                {item.software?.logo && (
                  <div className="flex-shrink-0 w-24 h-24 relative bg-white rounded-xl shadow-sm p-3 ml-4">
                    <Image
                      src={urlForImage(item.software.logo).width(96).height(96).url()}
                      alt={`${title} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 mt-6 border-b">
            {[
              { id: 'overview', label: 'Overview', icon: <GlobeAltIcon className="h-4 w-4" /> },
              { id: 'features', label: 'Features', icon: <BoltIcon className="h-4 w-4" /> },
              { id: 'pricing', label: 'Pricing', icon: <CurrencyDollarIcon className="h-4 w-4" /> },
              { id: 'pros-cons', label: 'Pros & Cons', icon: <ChartBarIcon className="h-4 w-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-all ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5 text-primary" />
                  What is {title}?
                </h4>
                {item.description ? (
                  <div className="prose prose-sm max-w-none">
                    <PortableText value={item.description} components={portableTextComponents} />
                  </div>
                ) : item.software?.description ? (
                  <p className="text-muted-foreground leading-relaxed">{item.software.description}</p>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {title} is a comprehensive solution designed to streamline workflows and boost productivity.
                  </p>
                )}
              </div>

              {/* Company Info */}
              {(item.software?.founded || item.software?.headquarters) && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                  {item.software.founded && (
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Founded</p>
                        <p className="font-medium">{item.software.founded}</p>
                      </div>
                    </div>
                  )}
                  {item.software.headquarters && (
                    <div className="flex items-center gap-2">
                      <BuildingOfficeIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Headquarters</p>
                        <p className="font-medium">{item.software.headquarters}</p>
                      </div>
                    </div>
                  )}
                  {item.software.website && (
                    <div className="flex items-center gap-2">
                      <GlobeAltIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Website</p>
                        <a href={item.software.website} target="_blank" rel="noopener" className="font-medium text-primary hover:underline">
                          Visit Site
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              {(item.keyFeatures?.length > 0 || item.software?.features?.length > 0) ? (
                <>
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <BoltIcon className="h-5 w-5 text-primary" />
                    Key Features
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {(item.keyFeatures || item.software?.features || []).map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">Feature information not available.</p>
              )}

              {/* Integrations */}
              {item.software?.integrations?.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <PuzzlePieceIcon className="h-5 w-5 text-primary" />
                    Integrations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.software.integrations.map((integration, index) => (
                      <span key={index} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {integration}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              {item.software?.pricing ? (
                <>
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <CurrencyDollarIcon className="h-5 w-5 text-primary" />
                    Pricing Plans
                  </h4>
                  
                  {item.software.pricing.plans?.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-4">
                      {item.software.pricing.plans.map((plan, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:border-primary transition-colors">
                          <h5 className="font-semibold mb-2">{plan.name}</h5>
                          <div className="mb-4">
                            <span className="text-3xl font-bold">${plan.price}</span>
                            <span className="text-muted-foreground">/month</span>
                          </div>
                          {plan.features?.length > 0 && (
                            <ul className="space-y-2">
                              {plan.features.slice(0, 5).map((feature, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircleIcon className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-xs">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 bg-muted/30 rounded-lg">
                      {item.software.pricing.freePlan && (
                        <p className="text-green-600 font-semibold mb-2 flex items-center gap-2">
                          <CheckCircleIcon className="h-5 w-5" />
                          Free plan available
                        </p>
                      )}
                      {item.software.pricing.starting && (
                        <p className="text-lg">
                          Paid plans start at <span className="font-bold text-2xl">${item.software.pricing.starting}</span>/month
                        </p>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground">Pricing information available on vendor website.</p>
              )}
            </div>
          )}

          {/* Pros & Cons Tab */}
          {activeTab === 'pros-cons' && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pros */}
              <div>
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-600">
                  <CheckCircleIcon className="h-5 w-5" />
                  Pros
                </h4>
                {item.software?.pros?.length > 0 ? (
                  <ul className="space-y-3">
                    {item.software.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircleIcon className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-sm">{pro}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-sm">No specific pros listed.</p>
                )}
              </div>
              
              {/* Cons */}
              <div>
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-600">
                  <XCircleIcon className="h-5 w-5" />
                  Cons
                </h4>
                {item.software?.cons?.length > 0 ? (
                  <ul className="space-y-3">
                    {item.software.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <XCircleIcon className="h-4 w-4 text-red-600" />
                        </div>
                        <span className="text-sm">{con}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-sm">No specific cons listed.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        {affiliateLink && (
          <div className="p-6 pt-0">
            <div className={`p-6 ${isTopPick ? 'bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20' : 'bg-primary/5'} rounded-xl text-center`}>
              <div className="max-w-2xl mx-auto">
                <p className="mb-4 text-lg font-semibold">
                  {isTopPick 
                    ? `🏆 Ready to try our #1 recommended ${item.software?.pricing?.freePlan ? 'free' : ''} solution?` 
                    : `Want to see if ${title} is right for you?`
                  }
                </p>
                <a
                  href={affiliateLink}
                  target={linkOptions.openInNewTab ? '_blank' : undefined}
                  rel={linkOptions.rel || 'sponsored nofollow'}
                  className={`inline-flex items-center gap-2 ${
                    isTopPick 
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600' 
                      : 'bg-primary hover:bg-primary/90'
                  } text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 hover:shadow-lg`}
                >
                  {item.software?.pricing?.freePlan ? 'Start Free Trial' : 'Get Started'}
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </a>
                <p className="mt-3 text-sm text-muted-foreground">
                  {item.software?.pricing?.freePlan 
                    ? '✓ No credit card required • Full feature access'
                    : '✓ 30-day money-back guarantee'
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}