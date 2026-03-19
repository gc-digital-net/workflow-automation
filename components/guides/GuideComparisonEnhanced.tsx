'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity/image'
import {
  StarIcon,
  CheckIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  InformationCircleIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
  ChevronRightIcon
} from '@heroicons/react/24/solid'
import {
  ComputerDesktopIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

interface ComparisonItem {
  rank: number
  software?: {
    _id: string
    name: string
    slug?: { current: string }
    logo?: any
    tagline?: string
    overallScore?: number
    scores?: {
      easeOfUse?: number
      features?: number
      valueForMoney?: number
      customerSupport?: number
      integrations?: number
    }
    pricing?: Array<{
      name: string
      price: number | null
      features?: string[]
    }>
    hasFreeTrial?: boolean
    freeTrialDays?: number
    bestFor?: string[]
    pros?: string[]
    cons?: string[]
    platformInfo?: {
      webApp?: boolean
      mobileApps?: {
        ios?: boolean
        android?: boolean
      }
      desktopApps?: {
        windows?: boolean
        mac?: boolean
      }
    }
    supportInfo?: {
      liveChat?: boolean
      emailSupport?: boolean
      phoneSupport?: boolean
      responseTime?: string
    }
    securityInfo?: {
      gdpr?: boolean
      soc2?: boolean
      ssl?: boolean
    }
    popularIntegrations?: string[]
    affiliateLink?: string
  }
  verdict?: string
  overrides?: {
    customBestFor?: string
    customAffiliateLink?: string
    specialOffer?: string
  }
  comparisonData?: {
    startingPrice?: string
    freeUsers?: string
    rating?: number
    ease?: number
    features?: number
    support?: number
    integrations?: string
    mobileApp?: boolean
    bestForTeamSize?: string
  }
}

interface GuideComparisonEnhancedProps {
  items: ComparisonItem[]
  guideSlug?: string
}

export function GuideComparisonEnhanced({ items, guideSlug }: GuideComparisonEnhancedProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [showMobileView, setShowMobileView] = useState(false)

  // Get pricing info
  const getPricingDisplay = (item: ComparisonItem) => {
    const customPrice = item.comparisonData?.startingPrice
    if (customPrice) return customPrice

    const pricing = item.software?.pricing
    if (!pricing || pricing.length === 0) return 'Custom'

    const firstPlan = pricing[0]
    if (firstPlan.price === 0) return 'Free'
    if (!firstPlan.price) return 'Custom'
    return `$${firstPlan.price}/mo`
  }

  // Get best for display
  const getBestForDisplay = (item: ComparisonItem) => {
    if (item.overrides?.customBestFor) return item.overrides.customBestFor
    if (item.comparisonData?.bestForTeamSize) return item.comparisonData.bestForTeamSize
    if (item.software?.bestFor?.[0]) return item.software.bestFor[0]
    return 'All teams'
  }

  // Get platform icons
  const getPlatformIcons = (software: ComparisonItem['software']) => {
    if (!software?.platformInfo) return []

    const platforms = []
    if (software.platformInfo.webApp) {
      platforms.push({ name: 'Web', icon: GlobeAltIcon })
    }
    if (software.platformInfo.mobileApps?.ios || software.platformInfo.mobileApps?.android) {
      platforms.push({ name: 'Mobile', icon: DevicePhoneMobileIcon })
    }
    if (software.platformInfo.desktopApps?.windows || software.platformInfo.desktopApps?.mac) {
      platforms.push({ name: 'Desktop', icon: ComputerDesktopIcon })
    }
    return platforms
  }

  // Get support type
  const getSupportType = (software: ComparisonItem['software']) => {
    if (!software?.supportInfo) return 'Email'

    if (software.supportInfo.liveChat) return '24/7 Live'
    if (software.supportInfo.phoneSupport) return 'Phone'
    if (software.supportInfo.emailSupport) return 'Email'
    return 'Community'
  }

  // Check if tool should have special badges
  const getBadges = (item: ComparisonItem) => {
    const badges = []

    // Top pick badge
    if (item.rank === 1) {
      badges.push({ type: 'top', label: 'Top Pick', icon: TrophyIcon, color: 'text-yellow-500' })
    }

    // Best value (high value score + reasonable price)
    const valueScore = item.software?.scores?.valueForMoney
    if (valueScore && valueScore >= 9) {
      badges.push({ type: 'value', label: 'Best Value', icon: SparklesIcon, color: 'text-blue-500' })
    }

    // Enterprise ready (SOC2 + GDPR)
    if (item.software?.securityInfo?.soc2 && item.software?.securityInfo?.gdpr) {
      badges.push({ type: 'enterprise', label: 'Enterprise', icon: ShieldCheckIcon, color: 'text-purple-500' })
    }

    // Special offer
    if (item.overrides?.specialOffer) {
      badges.push({ type: 'offer', label: item.overrides.specialOffer, icon: CurrencyDollarIcon, color: 'text-green-500' })
    }

    return badges
  }

  // Handle tool selection for comparison
  const toggleToolSelection = (toolId: string) => {
    setSelectedTools(prev => {
      if (prev.includes(toolId)) {
        return prev.filter(id => id !== toolId)
      }
      if (prev.length >= 3) {
        // Max 3 tools for comparison
        return [...prev.slice(1), toolId]
      }
      return [...prev, toolId]
    })
  }

  // Mobile card view component
  const MobileCard = ({ item }: { item: ComparisonItem }) => {
    const name = item.software?.name || 'Unknown'
    const score = item.comparisonData?.rating || item.software?.overallScore || 0
    const badges = getBadges(item)
    const affiliateLink = item.overrides?.customAffiliateLink || item.software?.affiliateLink

    return (
      <div className="bg-card rounded-lg border p-6 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-light text-muted-foreground/30">
              {item.rank.toString().padStart(2, '0')}
            </span>
            {item.software?.logo && (
              <Image
                src={urlForImage(item.software.logo).width(48).height(48).url()}
                alt={`${name} logo`}
                width={48}
                height={48}
                className="object-contain"
              />
            )}
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              {badges.length > 0 && (
                <div className="flex gap-2 mt-1">
                  {badges.map((badge, idx) => (
                    <span key={idx} className={`text-xs flex items-center gap-1 ${badge.color}`}>
                      <badge.icon className="h-3 w-3" />
                      {badge.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">{score.toFixed(1)}</span>
            <StarIcon className="h-4 w-4 text-primary" />
          </div>
        </div>

        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Price:</span>
            <span className="font-medium">{getPricingDisplay(item)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Best for:</span>
            <span>{getBestForDisplay(item)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Support:</span>
            <span>{getSupportType(item.software)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {affiliateLink && (
            <a
              href={affiliateLink}
              target="_blank"
              rel="sponsored nofollow"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
              onClick={() => {
                // Track affiliate click
                if (typeof window !== 'undefined') {
                  fetch('/api/track/affiliate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      software: name,
                      source: 'guide_comparison_mobile',
                      guide: guideSlug
                    })
                  })
                }
              }}
            >
              Try {name}
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </a>
          )}
          {item.software?.slug?.current && (
            <Link
              href={`/reviews/${item.software.slug.current}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-border text-foreground rounded-md hover:bg-accent transition-colors text-sm font-medium"
            >
              Read Review
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    )
  }

  // Desktop table view
  const DesktopTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/30">
            <th className="text-left py-4 px-4 font-medium text-sm sticky left-0 bg-muted/30">
              Software
            </th>
            <th className="text-center py-4 px-3 font-medium text-sm min-w-[100px]">
              Score
            </th>
            <th className="text-center py-4 px-3 font-medium text-sm min-w-[120px]">
              Pricing
            </th>
            <th className="text-center py-4 px-3 font-medium text-sm min-w-[150px]">
              Best For
            </th>
            <th className="text-center py-4 px-3 font-medium text-sm min-w-[100px]">
              Platforms
            </th>
            <th className="text-center py-4 px-3 font-medium text-sm min-w-[100px]">
              Support
            </th>
            <th className="text-center py-4 px-3 font-medium text-sm min-w-[240px]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.slice(0, 10).map((item) => {
            const name = item.software?.name || 'Unknown'
            const score = item.comparisonData?.rating || item.software?.overallScore || 0
            const badges = getBadges(item)
            const platforms = getPlatformIcons(item.software)
            const affiliateLink = item.overrides?.customAffiliateLink || item.software?.affiliateLink
            const integrationCount = item.software?.popularIntegrations?.length || 0

            return (
              <tr
                key={item.rank}
                className={`border-b transition-all ${
                  hoveredRow === item.rank ? 'bg-muted/50' : ''
                } ${item.rank === 1 ? 'bg-yellow-50/30 dark:bg-yellow-900/10' : ''}`}
                onMouseEnter={() => setHoveredRow(item.rank)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* Software Name with Logo */}
                <td className="py-4 px-4 sticky left-0 bg-background">
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-light ${
                      item.rank === 1 ? 'text-yellow-500' : 'text-muted-foreground/30'
                    }`}>
                      {item.rank.toString().padStart(2, '0')}
                    </span>
                    {item.software?.logo && (
                      <div className="w-10 h-10 relative">
                        <Image
                          src={urlForImage(item.software.logo).width(40).height(40).url()}
                          alt={`${name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{name}</span>
                        {badges.map((badge, idx) => (
                          <badge.icon key={idx} className={`h-4 w-4 ${badge.color}`} title={badge.label} />
                        ))}
                      </div>
                      {item.software?.tagline && (
                        <p className="text-xs text-muted-foreground">{item.software.tagline}</p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Score */}
                <td className="py-4 px-3 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{score.toFixed(1)}</span>
                      <StarIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 mt-1 max-w-[60px]">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{ width: `${(score / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Pricing */}
                <td className="py-4 px-3 text-center">
                  <div className="space-y-1">
                    <div className="font-medium">{getPricingDisplay(item)}</div>
                    {item.software?.hasFreeTrial && (
                      <div className="text-xs text-green-600">
                        {item.software.freeTrialDays ? `${item.software.freeTrialDays}-day trial` : 'Free trial'}
                      </div>
                    )}
                  </div>
                </td>

                {/* Best For */}
                <td className="py-4 px-3 text-center text-sm text-muted-foreground">
                  {getBestForDisplay(item)}
                </td>

                {/* Platforms */}
                <td className="py-4 px-3">
                  <div className="flex justify-center gap-2">
                    {platforms.map((platform, idx) => (
                      <platform.icon
                        key={idx}
                        className="h-5 w-5 text-muted-foreground"
                        title={platform.name}
                      />
                    ))}
                  </div>
                </td>

                {/* Support */}
                <td className="py-4 px-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <ChatBubbleLeftRightIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{getSupportType(item.software)}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-4 px-3">
                  <div className="flex items-center justify-center gap-2">
                    {affiliateLink && (
                      <a
                        href={affiliateLink}
                        target="_blank"
                        rel="sponsored nofollow"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
                        onClick={() => {
                          // Track affiliate click
                          if (typeof window !== 'undefined') {
                            fetch('/api/track/affiliate', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                software: name,
                                source: 'guide_comparison_table',
                                guide: guideSlug
                              })
                            })
                          }
                        }}
                      >
                        Try It
                        <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {item.software?.slug?.current && (
                      <Link
                        href={`/reviews/${item.software.slug.current}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 border border-border text-foreground rounded-md hover:bg-accent transition-colors text-sm"
                      >
                        Review
                        <ChevronRightIcon className="h-3.5 w-3.5" />
                      </Link>
                    )}
                    <button
                      onClick={() => item.software?._id && toggleToolSelection(item.software._id)}
                      className={`p-1.5 rounded-md transition-colors ${
                        selectedTools.includes(item.software?._id || '')
                          ? 'bg-primary text-white'
                          : 'hover:bg-accent'
                      }`}
                      title="Select for comparison"
                    >
                      <CheckIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )

  return (
    <section className="my-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Quick Comparison</h2>
          <p className="text-muted-foreground">Compare features, pricing, and ratings at a glance</p>
        </div>

        {/* Comparison tools selector */}
        {selectedTools.length > 0 && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {selectedTools.length} selected
            </span>
            <Link
              href={`/reviews/compare?tools=${selectedTools.join(',')}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              Compare Selected
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Mobile/Desktop Toggle */}
      <div className="flex justify-end mb-4 lg:hidden">
        <button
          onClick={() => setShowMobileView(!showMobileView)}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {showMobileView ? 'Table View' : 'Card View'}
        </button>
      </div>

      {/* Responsive View */}
      <div className="block lg:hidden">
        {showMobileView ? (
          <div>
            {items.slice(0, 10).map((item) => (
              <MobileCard key={item.rank} item={item} />
            ))}
          </div>
        ) : (
          <DesktopTable />
        )}
      </div>

      {/* Desktop Only */}
      <div className="hidden lg:block">
        <DesktopTable />
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <TrophyIcon className="h-4 w-4 text-yellow-500" />
          <span>Top Pick</span>
        </div>
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-4 w-4 text-blue-500" />
          <span>Best Value</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="h-4 w-4 text-purple-500" />
          <span>Enterprise Ready</span>
        </div>
        <div className="flex items-center gap-2">
          <CurrencyDollarIcon className="h-4 w-4 text-green-500" />
          <span>Special Offer</span>
        </div>
      </div>
    </section>
  )
}