'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/lib/sanity/image'
import { portableTextComponents } from '@/components/portable-text/PortableTextComponents'
import { ScreenshotGalleryEnhanced } from './ScreenshotGalleryEnhanced'
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
  TagIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  CalendarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/solid'
import { ClockIcon } from '@heroicons/react/24/outline'

interface GuideItemSmartProps {
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
      easeOfUse?: number
      features?: number
      valueForMoney?: number
      customerSupport?: number
      pricing?: {
        starting?: number
        freePlan?: boolean
        plans?: Array<{
          name: string
          price: number
          features: string[]
        }>
      }
      startingPrice?: number
      freePlan?: boolean
      pros?: string[]
      cons?: string[]
      bestFor?: string
      keyFeatures?: string[]
      integrations?: string[]
      platforms?: string[]
      affiliateLink?: string
      screenshotGallery?: any[]
      founded?: string
      headquarters?: string
      website?: string
      employees?: string
      funding?: string
      categories?: Array<{
        title: string
        slug: { current: string }
      }>
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

export function GuideItemSmart({ item, guide }: GuideItemSmartProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'pricing' | 'pros-cons' | 'screenshots'>('overview')
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Use override data if available, otherwise use software data
  const name = item.software?.name || 'Unknown Tool'
  const description = item.overrides?.customDescription || item.software?.shortDescription
  const bestFor = item.overrides?.customBestFor || item.software?.bestFor
  const keyFeatures = item.overrides?.customKeyFeatures || item.software?.keyFeatures || []
  const pros = item.overrides?.customPros || item.software?.pros || []
  const cons = item.overrides?.customCons || item.software?.cons || []
  const affiliateLink = item.overrides?.customAffiliateLink || item.software?.affiliateLink
  const specialOffer = item.overrides?.specialOffer
  const screenshots = item.software?.screenshotGallery || []
  
  const score = item.software?.overallScore || 0
  const isTopPick = item.rank === 1
  const hasReviewPage = item.software?.slug?.current

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
        icon: '2',
        label: "RUNNER-UP",
        animation: ''
      }
    } else if (item.rank === 3) {
      return {
        bg: 'bg-gradient-to-br from-orange-400 to-orange-600',
        text: 'text-white',
        icon: '3',
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
        {/* Special Offer Banner */}
        {specialOffer && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-t-xl">
            <div className="flex items-center justify-center gap-2">
              <SparklesIcon className="h-5 w-5" />
              <span className="font-bold">{specialOffer}</span>
              <SparklesIcon className="h-5 w-5" />
            </div>
          </div>
        )}

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
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-3xl font-bold">{name}</h3>
                    {isTopPick && (
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm rounded-full font-bold uppercase tracking-wide flex items-center gap-1">
                        <SparklesIcon className="h-4 w-4" />
                        Editor's Choice
                      </span>
                    )}
                  </div>
                  
                  {/* Tagline */}
                  {item.software?.tagline && (
                    <p className="text-lg text-muted-foreground mb-2 italic">
                      "{item.software.tagline}"
                    </p>
                  )}
                  
                  {/* Verdict */}
                  {item.verdict && (
                    <div className="mb-3 p-3 bg-primary/5 border-l-4 border-primary rounded">
                      <p className="font-medium text-primary">{item.verdict}</p>
                    </div>
                  )}
                  
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
                    
                    {item.software?.pricing?.starting && (
                      <>
                        <div className="h-5 w-px bg-border" />
                        <div className="flex items-center gap-1">
                          <CurrencyDollarIcon className="h-4 w-4 text-muted-foreground" />
                          <span>From ${item.software.pricing.starting}/mo</span>
                        </div>
                      </>
                    )}
                    
                    {item.software?.pricing?.freePlan && (
                      <>
                        <div className="h-5 w-px bg-border" />
                        <span className="text-green-600 font-semibold flex items-center gap-1">
                          <CheckCircleIcon className="h-4 w-4" />
                          Free Plan Available
                        </span>
                      </>
                    )}
                    
                    {hasReviewPage && (
                      <>
                        <div className="h-5 w-px bg-border" />
                        <Link 
                          href={`/reviews/${item.software?.slug?.current}`}
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <DocumentTextIcon className="h-4 w-4" />
                          Full Review
                        </Link>
                      </>
                    )}
                  </div>
                  
                  {/* Best For Tag */}
                  {bestFor && (
                    <div className="mt-3 flex items-center gap-2">
                      <TagIcon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Best for: {bestFor}</span>
                    </div>
                  )}
                </div>

                {/* Logo */}
                {item.software?.logo && (
                  <div className="flex-shrink-0 w-24 h-24 relative bg-white rounded-xl shadow-sm p-3 ml-4">
                    <Image
                      src={urlForImage(item.software.logo).width(96).height(96).url()}
                      alt={`${name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Why This Rank */}
          {item.whyThisRank && (
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ChartBarIcon className="h-5 w-5 text-primary" />
                Why #{item.rank}?
              </h4>
              <p className="text-sm text-muted-foreground">{item.whyThisRank}</p>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex gap-1 mt-6 border-b overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: <GlobeAltIcon className="h-4 w-4" /> },
              { id: 'features', label: 'Features', icon: <BoltIcon className="h-4 w-4" /> },
              { id: 'pricing', label: 'Pricing', icon: <CurrencyDollarIcon className="h-4 w-4" /> },
              { id: 'pros-cons', label: 'Pros & Cons', icon: <ChartBarIcon className="h-4 w-4" /> },
              screenshots.length > 0 && { id: 'screenshots', label: 'Screenshots', icon: <DocumentTextIcon className="h-4 w-4" /> },
            ].filter(Boolean).map((tab: any) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-all whitespace-nowrap ${
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
                  What is {name}?
                </h4>
                {item.overrides?.customDescription ? (
                  <div className="prose prose-sm max-w-none">
                    <PortableText value={item.overrides.customDescription} components={portableTextComponents} />
                  </div>
                ) : description ? (
                  <p className="text-muted-foreground leading-relaxed">{description}</p>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {name} is a comprehensive solution designed to streamline workflows and boost productivity.
                  </p>
                )}
              </div>

              {/* Company Info */}
              {(item.software?.founded || item.software?.headquarters || item.software?.website) && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                  {item.software.founded && (
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-muted-foreground" />
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
                        <p className="text-xs text-muted-foreground">HQ</p>
                        <p className="font-medium">{item.software.headquarters}</p>
                      </div>
                    </div>
                  )}
                  {item.software.employees && (
                    <div className="flex items-center gap-2">
                      <UserGroupIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Employees</p>
                        <p className="font-medium">{item.software.employees}</p>
                      </div>
                    </div>
                  )}
                  {item.software.funding && (
                    <div className="flex items-center gap-2">
                      <CurrencyDollarIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Funding</p>
                        <p className="font-medium">{item.software.funding}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Categories */}
              {item.software?.categories && item.software.categories.length > 0 && (
                <div>
                  <h5 className="text-sm font-semibold mb-2">Categories</h5>
                  <div className="flex flex-wrap gap-2">
                    {item.software.categories.map((cat, i) => (
                      <Link
                        key={i}
                        href={`/categories/${cat.slug.current}`}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                      >
                        {cat.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              {keyFeatures.length > 0 ? (
                <>
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <BoltIcon className="h-5 w-5 text-primary" />
                    Key Features
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {keyFeatures.map((feature, index) => (
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
              {item.software?.integrations && item.software.integrations.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <PuzzlePieceIcon className="h-5 w-5 text-primary" />
                    Integrations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.software.integrations.slice(0, 10).map((integration, index) => (
                      <span key={index} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {integration}
                      </span>
                    ))}
                    {item.software.integrations.length > 10 && (
                      <span className="px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-sm">
                        +{item.software.integrations.length - 10} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Platforms */}
              {item.software?.platforms && item.software.platforms.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <GlobeAltIcon className="h-5 w-5 text-primary" />
                    Available On
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.software.platforms.map((platform, index) => (
                      <span key={index} className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                        {platform}
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
                  
                  {item.software.pricing.plans && item.software.pricing.plans.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-4">
                      {item.software.pricing.plans.map((plan, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:border-primary transition-colors">
                          <h5 className="font-semibold mb-2">{plan.name}</h5>
                          <div className="mb-4">
                            <span className="text-3xl font-bold">
                              {plan.price === 0 ? 'Free' : `$${plan.price}`}
                            </span>
                            {plan.price > 0 && <span className="text-muted-foreground">/month</span>}
                          </div>
                          {plan.features && plan.features.length > 0 && (
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
                {pros.length > 0 ? (
                  <ul className="space-y-3">
                    {pros.map((pro, index) => (
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
                {cons.length > 0 ? (
                  <ul className="space-y-3">
                    {cons.map((con, index) => (
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

          {/* Screenshots Tab */}
          {activeTab === 'screenshots' && screenshots.length > 0 && (
            <ScreenshotGalleryEnhanced 
              screenshots={screenshots}
              title={`${name} Screenshots`}
              productName={name}
            />
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
                    : `Want to see if ${name} is right for you?`
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <a
                    href={affiliateLink}
                    target="_blank"
                    rel="sponsored nofollow"
                    className={`inline-flex items-center gap-2 ${
                      isTopPick 
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600' 
                        : 'bg-primary hover:bg-primary/90'
                    } text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 hover:shadow-lg`}
                  >
                    {item.software?.pricing?.freePlan ? 'Start Free Trial' : 'Get Started'}
                    <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                  </a>
                  
                  {hasReviewPage && (
                    <Link
                      href={`/reviews/${item.software?.slug?.current}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                    >
                      Read Full Review
                      <ChevronRightIcon className="h-5 w-5" />
                    </Link>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {item.software?.pricing?.freePlan 
                    ? '✓ No credit card required • Full feature access'
                    : '✓ 30-day money-back guarantee'
                  }
                </p>
                {specialOffer && (
                  <p className="mt-2 text-sm font-semibold text-green-600">
                    🎉 {specialOffer}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}