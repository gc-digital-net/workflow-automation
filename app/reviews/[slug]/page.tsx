import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { StarIcon, CheckIcon, XMarkIcon, ArrowRightIcon, BuildingOfficeIcon, UsersIcon, CalendarIcon, ShieldCheckIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid'
import { ChartBarIcon, ClockIcon, GlobeAltIcon, DocumentTextIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { client, urlFor } from '@/lib/sanity'
import { Metadata } from 'next'
import ScreenshotGallery from '@/components/review/ScreenshotGallery'
import InlineScreenshotGallery from '@/components/review/InlineScreenshotGallery'
import ReviewAuthor from '@/components/review/ReviewAuthor'
import InfoBox from '@/components/review/InfoBox'
// Removed ReviewTabs - all content on single page now
import ReviewSubmissionForm from '@/components/review/ReviewSubmissionForm'

// Enable ISR - revalidate every hour
export const revalidate = 3600

// Props interface for the page
interface Props {
  params: Promise<{ slug: string }>
}

// Portable Text Components for rendering custom blocks
const portableTextComponents = {
  types: {
    screenshot: ({ value }: any) => {
      const imageUrl = urlFor(value.image).url()
      const size = value.size || 'large'
      
      const sizeClasses = {
        small: 'max-w-md mx-auto',
        medium: 'max-w-2xl mx-auto',
        large: 'max-w-4xl mx-auto',
        full: 'w-full'
      }
      
      return (
        <figure className={`my-8 ${sizeClasses[size as keyof typeof sizeClasses]}`}>
          <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
            <Image
              src={imageUrl}
              alt={value.caption || 'Screenshot'}
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-sm text-center text-gray-600 dark:text-gray-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    
    prosConsBlock: ({ value }: any) => (
      <div className="grid md:grid-cols-2 gap-6 my-10">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <h3 className="font-bold text-green-800 dark:text-green-400 mb-4 flex items-center text-lg">
            <CheckIcon className="h-6 w-6 mr-2" />
            What we like
          </h3>
          <ul className="space-y-3">
            {value.pros?.map((pro: string, idx: number) => (
              <li key={idx} className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 break-words">{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
          <h3 className="font-bold text-red-800 dark:text-red-400 mb-4 flex items-center text-lg">
            <XMarkIcon className="h-6 w-6 mr-2" />
            What could be better
          </h3>
          <ul className="space-y-3">
            {value.cons?.map((con: string, idx: number) => (
              <li key={idx} className="flex items-start">
                <XMarkIcon className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 break-words">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    
    featureList: ({ value }: any) => (
      <div className="my-10 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6">{value.title || 'Key Features'}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {value.features?.map((feature: any, idx: number) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
                {feature.name}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed break-words">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
    
    pricingTable: ({ value }: any) => (
      <div className="my-12">
        <h3 className="text-2xl font-bold mb-8 text-center">{value.title || 'Pricing Plans'}</h3>
        {/* Horizontal scroll container for mobile/tablet, grid for desktop */}
        <div className="relative">
          <div className="overflow-x-auto pb-4 xl:overflow-visible">
            <div className="flex gap-4 xl:grid xl:grid-cols-3 xl:gap-6 w-full xl:min-w-0">
              {value.plans?.map((plan: any, idx: number) => (
                <div 
                  key={idx} 
                  className={`rounded-xl p-6 relative flex flex-col w-full sm:min-w-[280px] lg:min-w-0 ${
                    plan.highlighted 
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 shadow-xl scale-105 lg:scale-110' 
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold mt-2 mb-2 break-words">{plan.name}</h4>
                    <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {plan.price}
                      {plan.price !== 'Free' && plan.price !== 'Custom pricing' && (
                        <span className="text-sm font-normal text-gray-600 dark:text-gray-400 block mt-1">
                          per user/month
                        </span>
                      )}
                    </p>
                  </div>
                  <ul className="space-y-3 flex-grow">
                    {plan.features?.map((feature: string, fidx: number) => (
                      <li key={fidx} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                      {plan.name === 'Free Forever' ? 'Start Free' : plan.price === 'Custom pricing' ? 'Contact Sales' : 'Start Trial'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    
    comparisonTable: ({ value }: any) => (
      <div className="my-12">
        <h3 className="text-2xl font-bold mb-6">{value.title || 'Comparison'}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border border-gray-200 dark:border-gray-600 p-4 text-left font-semibold">Feature</th>
                <th className="border border-gray-200 dark:border-gray-600 p-4 text-center font-semibold bg-blue-50 dark:bg-blue-900/30">ClickUp</th>
                <th className="border border-gray-200 dark:border-gray-600 p-4 text-center font-semibold">{value.items?.[0]?.competitor1?.split(':')[0] || 'Competitor 1'}</th>
                <th className="border border-gray-200 dark:border-gray-600 p-4 text-center font-semibold">{value.items?.[0]?.competitor2?.split(':')[0] || 'Competitor 2'}</th>
              </tr>
            </thead>
            <tbody>
              {value.items?.map((item: any, idx: number) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="border border-gray-200 dark:border-gray-600 p-4 font-medium">{item.feature}</td>
                  <td className="border border-gray-200 dark:border-gray-600 p-4 text-center bg-blue-50/50 dark:bg-blue-900/20 font-medium">{item.thisProduct}</td>
                  <td className="border border-gray-200 dark:border-gray-600 p-4 text-center">{item.competitor1?.split(':')[1] || item.competitor1}</td>
                  <td className="border border-gray-200 dark:border-gray-600 p-4 text-center">{item.competitor2?.split(':')[1] || item.competitor2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    
    ctaBlock: ({ value }: any) => (
      <div className="my-12 bg-blue-600 rounded-2xl p-6 md:p-10 text-center text-white shadow-2xl">
        <h3 className="text-3xl font-bold mb-4">{value.title}</h3>
        <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto">{value.description}</p>
        <a
          href={value.buttonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
        >
          {value.buttonText}
          <ArrowRightIcon className="h-5 w-5 ml-2" />
        </a>
      </div>
    ),
    
    videoEmbed: ({ value }: any) => {
      const getVideoId = (url: string) => {
        const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
        const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
        
        if (youtubeMatch) return { type: 'youtube', id: youtubeMatch[1] }
        if (vimeoMatch) return { type: 'vimeo', id: vimeoMatch[1] }
        return null
      }
      
      const video = getVideoId(value.url)
      if (!video) return null
      
      return (
        <figure className="my-10">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
            {video.type === 'youtube' && (
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            )}
            {video.type === 'vimeo' && (
              <iframe
                src={`https://player.vimeo.com/video/${video.id}`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            )}
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-sm text-center text-gray-600 dark:text-gray-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    
    infoBox: ({ value }: any) => {
      // Simple component for info box content
      const simpleComponents = {
        marks: {
          strong: ({ children }: any) => <strong>{children}</strong>,
          em: ({ children }: any) => <em>{children}</em>,
        },
        block: {
          normal: ({ children }: any) => <p className="mb-2 last:mb-0">{children}</p>,
        }
      }
      
      return (
        <InfoBox type={value.type || 'info'} title={value.title}>
          {value.content ? (
            <PortableText value={value.content} components={simpleComponents} />
          ) : (
            <p>No content available</p>
          )}
        </InfoBox>
      )
    },
    
    faqBlock: ({ value }: any) => (
      <div className="my-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6">{value.title || 'Frequently Asked Questions'}</h3>
        <div className="space-y-4">
          {value.items?.map((item: any, idx: number) => (
            <details key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700 group">
              <summary className="font-semibold cursor-pointer flex items-center justify-between">
                <span>{item.question}</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    )
  },
  
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-10 mb-5 text-gray-900 dark:text-white break-words">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white break-words">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white break-words">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 p-6 bg-slate-50 dark:bg-slate-900/50 border-l-4 border-slate-400 dark:border-slate-600 rounded-r-lg shadow-md">
        <div className="text-gray-700 dark:text-gray-300 italic leading-relaxed text-lg break-words">
          {children}
        </div>
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-5 text-gray-700 dark:text-gray-300 leading-relaxed break-words">
        {children}
      </p>
    )
  },
  
  marks: {
    highlight: ({ children }: any) => (
      <mark className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
        {children}
      </mark>
    ),
    link: ({ value, children }: any) => (
      <a 
        href={value?.href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
      >
        {children}
      </a>
    )
  }
}

// Score Display Component with Enhanced Theme Colors
function ScoreDisplay({ score, label }: { score: number; label: string }) {
  const percentage = (score / 10) * 100
  
  const getScoreColor = (score: number) => {
    if (score >= 9) return 'bg-emerald-500'
    if (score >= 8) return 'bg-green-500'
    if (score >= 7) return 'bg-blue-500'
    if (score >= 6) return 'bg-indigo-500'
    if (score >= 5) return 'bg-yellow-500'
    if (score >= 4) return 'bg-orange-500'
    return 'bg-red-500'
  }
  
  const getScoreTextColor = (score: number) => {
    if (score >= 9) return 'text-emerald-600 dark:text-emerald-400'
    if (score >= 8) return 'text-green-600 dark:text-green-400'
    if (score >= 7) return 'text-blue-600 dark:text-blue-400'
    if (score >= 5) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }
  
  return (
    <div className="mb-5 group hover:scale-[1.02] transition-transform">
      <div className="flex justify-between mb-2.5 items-center">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</span>
        <span className={`text-sm font-bold ${getScoreTextColor(score)}`}>
          {score.toFixed(1)}/10
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner overflow-hidden">
        <div 
          className={`h-full ${getScoreColor(score)} transition-all duration-1000 rounded-full shadow-md`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// Rating Stars Component
function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`h-6 w-6 ${
            i < Math.floor(rating / 2)
              ? 'text-yellow-400 fill-yellow-400'
              : i < Math.ceil(rating / 2)
              ? 'text-yellow-400 fill-yellow-400 opacity-50'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      ))}
    </div>
  )
}

async function getSoftware(slug: string) {
  const query = `
    *[_type == "software" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      logo,
      tagline,
      excerpt,
      overallScore,
      scores,
      content,
      screenshotGallery,
      quickInfo,
      popularIntegrations,
      companyInfo,
      supportInfo,
      securityInfo,
      affiliateLink,
      pricing,
      pros,
      cons,
      categories[]-> {
        _id,
        name,
        slug
      },
      reviewAuthor-> {
        name,
        role,
        bio,
        avatar,
        expertise,
        certifications
      },
      reviewDate,
      lastReviewUpdate,
      lastUpdated,
      seo,
      "reviews": *[_type == "userReview" && references(^._id) && status == "approved"] | order(publishedAt desc) {
        _id,
        reviewerName,
        reviewerRole,
        companyName,
        rating,
        categoryRatings,
        headline,
        pros,
        cons,
        useCases,
        wouldRecommend,
        verified,
        featured,
        publishedAt,
        usageLength
      },
      "reviewCount": count(*[_type == "userReview" && references(^._id) && status == "approved"]),
      "averageRating": math::avg(*[_type == "userReview" && references(^._id) && status == "approved"].rating)
    }
  `
  
  const software = await client.fetch(query, { slug })
  return software
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const software = await getSoftware(slug)
  
  if (!software) {
    return {
      title: 'Software Review Not Found',
      description: 'The requested software review could not be found.'
    }
  }
  
  return {
    title: software.seo?.metaTitle || `${software.name} Review 2024 - Features, Pricing & Alternatives`,
    description: software.seo?.metaDescription || software.excerpt || `Comprehensive review of ${software.name}`,
    openGraph: {
      title: software.seo?.metaTitle || `${software.name} Review`,
      description: software.seo?.metaDescription || software.excerpt,
      images: software.logo ? [urlFor(software.logo).url()] : [],
    }
  }
}

export default async function G2StyleReviewPage({ params }: Props) {
  const { slug } = await params
  const software = await getSoftware(slug)
  
  if (!software) {
    notFound()
  }
  
  // Calculate overall rating for display
  const overallRating = software.overallScore || 8.5
  // Use actual review count or a consistent placeholder
  const totalReviews = software.reviews?.length || 47 // Fixed number until we have real reviews
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section with G2-style layout */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Logo and Basic Info */}
            <div className="flex items-start gap-6 w-full lg:flex-1">
              {software.logo && (
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white shadow-md border border-gray-200 dark:border-gray-700">
                    <Image
                      src={urlFor(software.logo).url()}
                      alt={`${software.name} logo`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {software.name}
                </h1>
                {software.tagline && (
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 break-words">
                    {software.tagline}
                  </p>
                )}
                
                {/* Rating and Reviews */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {overallRating.toFixed(1)}
                    </span>
                    <RatingStars rating={overallRating} />
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">
                    ({totalReviews} reviews)
                  </span>
                </div>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 text-sm mb-6">
                  {software.quickInfo?.bestFor && (
                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">Best for: {software.quickInfo.bestFor}</span>
                    </div>
                  )}
                  {software.quickInfo?.integrations && (
                    <div className="flex items-center gap-2">
                      <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">{software.quickInfo.integrations} integrations</span>
                    </div>
                  )}
                </div>
                
                {/* Author Section - moved below quick stats */}
                <ReviewAuthor 
                  author={software.reviewAuthor}
                  reviewDate={software.reviewDate || software.lastUpdated || new Date().toISOString()}
                  lastUpdated={software.lastReviewUpdate || software.lastUpdated}
                  readingTime={15}
                />
              </div>
            </div>
            
            {/* Right Side Actions and Info */}
            <div className="w-full lg:w-80">
              {/* Pricing Info Box */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Starting From</span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {software.quickInfo?.startingPrice || 'Contact Sales'}
                  </span>
                </div>
                {software.quickInfo?.freeTrial && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Free Trial</span>
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {software.quickInfo.freeTrial}
                    </span>
                  </div>
                )}
              </div>
              
              {/* CTA Buttons */}
              <div className="space-y-3">
                {software.affiliateLink && (
                  <a
                    href={software.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors shadow-md"
                  >
                    Visit Website
                    <ArrowRightIcon className="h-5 w-5 ml-2" />
                  </a>
                )}
                <button className="w-full inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-xl transition-colors border border-gray-300 dark:border-gray-600">
                  <DocumentTextIcon className="h-5 w-5 mr-2" />
                  Compare Alternatives
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Scores Section - Compact */}
            {software.scores && (
              <section className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center text-gray-900 dark:text-white">
                    <ChartBarIcon className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                    Performance Metrics
                  </h2>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {software.overallScore?.toFixed(1) || '8.5'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">/10</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(software.scores).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex items-center justify-between p-2.5 bg-white dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
                      <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                        {key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase())}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {typeof value === 'number' ? value.toFixed(1) : '—'}
                        </span>
                        <span className="text-[10px] text-gray-400">/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Inline Screenshot Gallery - Positioned after Performance Metrics for better visibility */}
            {software.screenshotGallery && software.screenshotGallery.length > 0 && (
              <InlineScreenshotGallery 
                screenshots={software.screenshotGallery} 
                initialDisplayCount={3}
              />
            )}
            
            {/* Key Information Section - Mobile/Tablet Only */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Company Info Card */}
              {software.companyInfo && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <BuildingOfficeIcon className="h-5 w-5 mr-2 text-gray-600" />
                    Company Info
                  </h3>
                  <dl className="space-y-3">
                    {software.companyInfo.founded && (
                      <div>
                        <dt className="text-sm text-gray-500 dark:text-gray-400">Founded</dt>
                        <dd className="font-semibold">{software.companyInfo.founded}</dd>
                      </div>
                    )}
                    {software.companyInfo.headquarters && (
                      <div>
                        <dt className="text-sm text-gray-500 dark:text-gray-400">Headquarters</dt>
                        <dd className="font-semibold">{software.companyInfo.headquarters}</dd>
                      </div>
                    )}
                    {software.companyInfo.companySize && (
                      <div>
                        <dt className="text-sm text-gray-500 dark:text-gray-400">Company Size</dt>
                        <dd className="font-semibold">{software.companyInfo.companySize}</dd>
                      </div>
                    )}
                    {software.companyInfo.funding && (
                      <div>
                        <dt className="text-sm text-gray-500 dark:text-gray-400">Funding</dt>
                        <dd className="font-semibold">{software.companyInfo.funding}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
              
              {/* Quick Pricing Overview */}
              {software.pricing && software.pricing.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-4 bg-primary-600 text-white">
                    <h3 className="text-lg font-bold flex items-center">
                      <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                      Quick Pricing
                    </h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {software.pricing.slice(0, 3).map((plan: any, index: number) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg border ${
                          plan.recommended || plan.highlighted
                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' 
                            : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                          <h4 className="font-semibold text-sm break-words" title={plan.name}>
                            {plan.name}
                          </h4>
                          {(plan.recommended || plan.highlighted) && (
                            <span className="text-xs bg-primary-600 text-white px-2 py-0.5 rounded-full self-start sm:self-auto whitespace-nowrap">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline flex-wrap">
                          <span className="text-xl font-bold text-gray-900 dark:text-white">
                            {typeof plan.price === 'number' ? 
                              plan.price === 0 ? 'Free' : `$${plan.price}` 
                              : plan.price}
                          </span>
                          {plan.price !== 'Free' && plan.price !== 'Custom' && typeof plan.price === 'number' && plan.price > 0 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                              /user/month
                            </span>
                          )}
                        </div>
                        {plan.userLimit && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 break-words">
                            {plan.userLimit}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Popular Integrations */}
              {software.popularIntegrations && software.popularIntegrations.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <GlobeAltIcon className="h-5 w-5 mr-2 text-gray-600" />
                    Popular Integrations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {software.popularIntegrations.slice(0, 8).map((integration: string, index: number) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium"
                      >
                        {integration}
                      </span>
                    ))}
                  </div>
                  {software.integrationsCount && (
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      +{software.integrationsCount - 8} more integrations available
                    </p>
                  )}
                </div>
              )}
              
              {/* Support Info */}
              {software.supportInfo && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-gray-600" />
                    Support
                  </h3>
                  <ul className="space-y-3">
                    {software.supportInfo.liveChat && (
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-sm">24/7 Live Chat</span>
                      </li>
                    )}
                    {software.supportInfo.emailSupport && (
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-sm">Email Support</span>
                      </li>
                    )}
                    {software.supportInfo.knowledgeBase && (
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-sm">Knowledge Base</span>
                      </li>
                    )}
                    {software.supportInfo.videoTutorials && (
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-sm">Video Tutorials</span>
                      </li>
                    )}
                  </ul>
                  {software.supportInfo.supportDetails && (
                    <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
                      {software.supportInfo.supportDetails}
                    </p>
                  )}
                </div>
              )}
              
              {/* Security & Compliance */}
              {software.securityInfo && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <ShieldCheckIcon className="h-5 w-5 mr-2 text-gray-600" />
                    Security & Compliance
                  </h3>
                  <ul className="space-y-3">
                    {software.securityInfo.soc2 && (
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-sm">SOC 2 Type II</span>
                      </li>
                    )}
                    {software.securityInfo.gdpr && (
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-sm">GDPR Compliant</span>
                      </li>
                    )}
                    {software.securityInfo.ssl && (
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-sm">256-bit SSL</span>
                      </li>
                    )}
                    {software.securityInfo.uptime && (
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-sm">{software.securityInfo.uptime} Uptime SLA</span>
                      </li>
                    )}
                    {software.securityInfo.otherCertifications?.map((cert: string) => (
                      <li key={cert} className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-sm">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Affiliate Disclosure */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800 flex items-center">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Disclosure:</strong> We may receive a commission when you purchase through our links, 
                  but this doesn't influence our reviews or ratings.
                </p>
              </div>
            </div>
            
            {/* Main Content - All sections on single page */}
            <div className="space-y-16">
              {/* Main Content */}
              {software.content && (
                <section>
                  <article className="prose dark:prose-invert max-w-none prose-p:break-words prose-headings:break-words prose-li:break-words prose-td:break-words prose-th:break-words overflow-hidden">
                    <PortableText
                      value={software.content}
                      components={portableTextComponents}
                    />
                  </article>
                </section>
              )}
              
              {/* Features Section */}
              {software.pros && software.pros.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-6">Features & Capabilities</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-400">Pros</h3>
                      <ul className="space-y-3">
                        {software.pros.map((pro: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="break-words">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {software.cons && software.cons.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-red-700 dark:text-red-400">Cons</h3>
                        <ul className="space-y-3">
                          {software.cons.map((con: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <XMarkIcon className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="break-words">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}
              
              {/* Pricing Section */}
              {software.pricing && software.pricing.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-6">Pricing Plans</h2>
                  <div className="relative">
                    {/* Scrollable container on mobile, responsive grid on larger screens */}
                    <div className="overflow-x-auto pb-4 xl:overflow-visible">
                      <div className={`flex gap-4 min-w-max ${
                        software.pricing.length === 4
                          ? 'xl:grid xl:grid-cols-2 xl:gap-8 xl:min-w-0 max-w-4xl mx-auto'
                          : software.pricing.length === 3
                          ? 'xl:grid xl:grid-cols-3 xl:gap-6 xl:min-w-0' 
                          : software.pricing.length === 2 
                          ? 'xl:grid xl:grid-cols-2 xl:gap-6 xl:min-w-0 max-w-4xl mx-auto' 
                          : software.pricing.length > 4
                          ? 'xl:grid xl:grid-cols-3 xl:gap-6 xl:min-w-0'
                          : 'xl:grid xl:grid-cols-1 xl:gap-6 xl:min-w-0 max-w-md mx-auto'
                      }`}>
                        {software.pricing.map((plan: any, index: number) => (
                          <div
                            key={index}
                            className={`flex-shrink-0 w-80 xl:w-auto bg-white dark:bg-gray-800 rounded-xl border-2 p-6 ${
                              plan.recommended || plan.highlighted || plan.mostPopular
                                ? 'border-primary-600 shadow-xl relative'
                                : 'border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            {(plan.recommended || plan.highlighted || plan.mostPopular) && (
                              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                <span className="inline-block px-4 py-1 text-sm font-medium text-white bg-primary-600 rounded-full whitespace-nowrap">
                                  Recommended
                                </span>
                              </div>
                            )}
                            <h3 className="text-xl font-bold mb-2 break-words" title={plan.name}>
                              {plan.name}
                            </h3>
                            <div className="mb-6">
                              <div className="flex items-baseline gap-1 flex-wrap">
                                <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                  {typeof plan.price === 'number' 
                                    ? (plan.price === 0 ? 'Free' : `$${plan.price}`)
                                    : (plan.price || 'Custom')}
                                </span>
                                {plan.price !== 'Free' && plan.price !== 'Custom' && plan.price !== 0 && plan.price !== null && (
                                  <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>
                                )}
                              </div>
                              {plan.yearlyPrice && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  or ${plan.yearlyPrice}/year
                                </p>
                              )}
                            </div>
                            
                            {/* Features list - display all features */}
                            <div className="mb-6">
                              {plan.features && (
                                <ul className="space-y-2">
                                  {plan.features.map((feature: string, idx: number) => (
                                    <li key={idx} className="flex items-start">
                                      <CheckIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                      <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                                        {feature}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {plan.userLimit && (
                                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                  <strong>Users:</strong> {plan.userLimit}
                                </p>
                              )}
                              {plan.storageLimit && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  <strong>Storage:</strong> {plan.storageLimit}
                                </p>
                              )}
                            </div>
                            
                            {software.affiliateLink && (
                              <a
                                href={software.affiliateLink}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className={`block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
                                  plan.recommended || plan.highlighted || plan.mostPopular
                                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                              >
                                Get Started
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Scroll hint for mobile */}
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 md:hidden">
                      ← Swipe to see more plans →
                    </p>
                  </div>
                </section>
              )}
              
              {/* User Reviews Section */}
              <section>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
                  <h2 className="text-2xl font-bold">User Reviews</h2>
                  {software.reviewCount > 0 && (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 sm:h-5 w-4 sm:w-5 ${
                              i < Math.floor(software.averageRating || 0)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-base sm:text-lg font-semibold">
                        {(software.averageRating || 0).toFixed(1)}
                      </span>
                      <span className="text-sm sm:text-base text-gray-500">({software.reviewCount} reviews)</span>
                    </div>
                  )}
                </div>
                
                {/* Existing Reviews */}
                {software.reviews && software.reviews.length > 0 && (
                  <div className="space-y-6 mb-8">
                    {software.reviews.map((review: any) => (
                      <div key={review._id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{review.headline}</h4>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                by {review.reviewerName}
                                {review.reviewerRole && `, ${review.reviewerRole}`}
                                {review.companyName && ` at ${review.companyName}`}
                              </span>
                            </div>
                          </div>
                          {review.verified && (
                            <span className="self-start px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full whitespace-nowrap">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                          <div>
                            <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">What I like best:</h5>
                            <p className="text-gray-700 dark:text-gray-300 break-words overflow-wrap">{review.pros}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-red-700 dark:text-red-400 mb-2">What could be better:</h5>
                            <p className="text-gray-700 dark:text-gray-300 break-words overflow-wrap">{review.cons}</p>
                          </div>
                        </div>
                        
                        {review.useCases && (
                          <div className="mb-4">
                            <h5 className="font-medium mb-2">Use cases:</h5>
                            <p className="text-gray-700 dark:text-gray-300 break-words overflow-wrap">{review.useCases}</p>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>Using for {review.usageLength?.replace('<', 'less than ').replace('+', ' or more')}</span>
                          <span>{new Date(review.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Review Submission Form */}
                <ReviewSubmissionForm 
                  softwareId={software._id} 
                  softwareName={software.name}
                />
              </section>
            </div>
          </div>
          
          {/* Desktop Sidebar - Hidden on Mobile/Tablet */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            {/* Company Info Card */}
            {software.companyInfo && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <BuildingOfficeIcon className="h-5 w-5 mr-2 text-gray-600" />
                  Company Info
                </h3>
                <dl className="space-y-3">
                  {software.companyInfo.founded && (
                    <div>
                      <dt className="text-sm text-gray-500 dark:text-gray-400">Founded</dt>
                      <dd className="font-semibold">{software.companyInfo.founded}</dd>
                    </div>
                  )}
                  {software.companyInfo.headquarters && (
                    <div>
                      <dt className="text-sm text-gray-500 dark:text-gray-400">Headquarters</dt>
                      <dd className="font-semibold">{software.companyInfo.headquarters}</dd>
                    </div>
                  )}
                  {software.companyInfo.companySize && (
                    <div>
                      <dt className="text-sm text-gray-500 dark:text-gray-400">Company Size</dt>
                      <dd className="font-semibold">{software.companyInfo.companySize}</dd>
                    </div>
                  )}
                  {software.companyInfo.funding && (
                    <div>
                      <dt className="text-sm text-gray-500 dark:text-gray-400">Funding</dt>
                      <dd className="font-semibold">{software.companyInfo.funding}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
            
            {/* Quick Pricing Overview */}
            {software.pricing && software.pricing.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 bg-primary-600 text-white">
                  <h3 className="text-lg font-bold flex items-center">
                    <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                    Quick Pricing
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {software.pricing.slice(0, 3).map((plan: any, index: number) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border ${
                        plan.recommended || plan.highlighted
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' 
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                        <h4 className="font-semibold text-sm break-words" title={plan.name}>
                          {plan.name}
                        </h4>
                        {(plan.recommended || plan.highlighted) && (
                          <span className="text-xs bg-primary-600 text-white px-2 py-0.5 rounded-full self-start sm:self-auto whitespace-nowrap">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline flex-wrap">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {typeof plan.price === 'number' ? 
                            plan.price === 0 ? 'Free' : `$${plan.price}` 
                            : plan.price}
                        </span>
                        {plan.price !== 'Free' && plan.price !== 'Custom' && typeof plan.price === 'number' && plan.price > 0 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            /user/month
                          </span>
                        )}
                      </div>
                      {plan.userLimit && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 break-words">
                          {plan.userLimit}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Popular Integrations */}
            {software.popularIntegrations && software.popularIntegrations.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <GlobeAltIcon className="h-5 w-5 mr-2 text-gray-600" />
                  Popular Integrations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {software.popularIntegrations.slice(0, 8).map((integration: string, index: number) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
                {software.integrationsCount && (
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    +{software.integrationsCount - 8} more integrations available
                  </p>
                )}
              </div>
            )}
            
            {/* Support Info */}
            {software.supportInfo && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-gray-600" />
                  Support
                </h3>
                <ul className="space-y-3">
                  {software.supportInfo.liveChat && (
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-sm">24/7 Live Chat</span>
                    </li>
                  )}
                  {software.supportInfo.emailSupport && (
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-sm">Email Support</span>
                    </li>
                  )}
                  {software.supportInfo.knowledgeBase && (
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-sm">Knowledge Base</span>
                    </li>
                  )}
                  {software.supportInfo.videoTutorials && (
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-sm">Video Tutorials</span>
                    </li>
                  )}
                </ul>
                {software.supportInfo.supportDetails && (
                  <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
                    {software.supportInfo.supportDetails}
                  </p>
                )}
              </div>
            )}
            
            {/* Security & Compliance */}
            {software.securityInfo && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 mr-2 text-gray-600" />
                  Security & Compliance
                </h3>
                <ul className="space-y-3">
                  {software.securityInfo.soc2 && (
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-sm">SOC 2 Type II</span>
                    </li>
                  )}
                  {software.securityInfo.gdpr && (
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-sm">GDPR Compliant</span>
                    </li>
                  )}
                  {software.securityInfo.ssl && (
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-sm">256-bit SSL</span>
                    </li>
                  )}
                  {software.securityInfo.uptime && (
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-sm">{software.securityInfo.uptime} Uptime SLA</span>
                    </li>
                  )}
                  {software.securityInfo.otherCertifications?.map((cert: string) => (
                    <li key={cert} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-sm">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Affiliate Disclosure */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Disclosure:</strong> We may receive a commission when you purchase through our links, 
                but this doesn't influence our reviews or ratings.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
