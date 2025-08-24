import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { StarIcon, CheckIcon, XMarkIcon, ArrowRightIcon, BuildingOfficeIcon, UsersIcon, CalendarIcon, ShieldCheckIcon } from '@heroicons/react/24/solid'
import { ChartBarIcon, ClockIcon, CurrencyDollarIcon, GlobeAltIcon, DocumentTextIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { client, urlFor } from '@/lib/sanity'
import { Metadata } from 'next'
import ScreenshotGallery from '@/components/review/ScreenshotGallery'

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
                <span className="text-gray-700 dark:text-gray-300">{pro}</span>
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
                <span className="text-gray-700 dark:text-gray-300">{con}</span>
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
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {value.plans?.map((plan: any, idx: number) => (
            <div 
              key={idx} 
              className={`rounded-xl p-6 relative ${
                plan.highlighted 
                  ? 'bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/30 dark:to-gray-800 border-2 border-blue-500 shadow-xl' 
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <h4 className="text-xl font-bold mt-2 mb-2">{plan.name}</h4>
              <p className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">{plan.price}</p>
              <ul className="space-y-3">
                {plan.features?.map((feature: string, fidx: number) => (
                  <li key={fidx} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ),
    
    comparisonTable: ({ value }: any) => (
      <div className="my-12">
        <h3 className="text-2xl font-bold mb-6">{value.title || 'Comparison'}</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
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
      <div className="my-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-10 text-center text-white shadow-2xl">
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
      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 my-6 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 py-4 pr-6 rounded-r-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
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

// Score Display Component with G2 Style
function ScoreDisplay({ score, label }: { score: number; label: string }) {
  const percentage = (score / 10) * 100
  const getScoreColor = (score: number) => {
    if (score >= 9) return 'bg-gradient-to-r from-green-500 to-green-600'
    if (score >= 7) return 'bg-gradient-to-r from-blue-500 to-blue-600'
    if (score >= 5) return 'bg-gradient-to-r from-yellow-500 to-yellow-600'
    return 'bg-gradient-to-r from-red-500 to-red-600'
  }
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm font-bold text-gray-900 dark:text-white">{score}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700 overflow-hidden">
        <div 
          className={`h-full ${getScoreColor(score)} transition-all duration-700 rounded-full`}
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
      categories[]-> {
        _id,
        name,
        slug
      },
      lastUpdated,
      seo
    }
  `
  
  const software = await client.fetch(query, { slug })
  return software
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const software = await getSoftware(params.slug)
  
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

export default async function G2StyleReviewPage({ params }: { params: { slug: string } }) {
  const software = await getSoftware(params.slug)
  
  if (!software) {
    notFound()
  }
  
  // Calculate overall rating for display
  const overallRating = software.overallScore || 8.5
  const totalReviews = Math.floor(Math.random() * 500) + 100 // Mock data - replace with real reviews
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section with G2-style layout */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Logo and Basic Info */}
            <div className="flex items-start gap-6 flex-1">
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {software.name}
                </h1>
                {software.tagline && (
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
                    {software.tagline}
                  </p>
                )}
                
                {/* Rating and Reviews */}
                <div className="flex items-center gap-4 mb-4">
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
                <div className="flex flex-wrap gap-4 text-sm">
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
              </div>
            </div>
            
            {/* Right Side Actions and Info */}
            <div className="lg:w-80">
              {/* Pricing Info Box */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Starting Price</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {software.quickInfo?.startingPrice || 'Contact Sales'}
                  </span>
                </div>
                {software.quickInfo?.freeTrial && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Free Trial</span>
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
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md"
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
      
      {/* Navigation Tabs (G2-style) */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            <button className="py-4 px-1 border-b-2 border-blue-500 font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">
              Overview
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap">
              Reviews
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap">
              Pricing
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap">
              Features
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 whitespace-nowrap">
              Alternatives
            </button>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* Scores Section */}
            {software.scores && (
              <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <ChartBarIcon className="h-6 w-6 mr-2 text-blue-600" />
                  Performance Scores
                </h2>
                <div className="space-y-4">
                  {Object.entries(software.scores).map(([key, value]: [string, any]) => (
                    <ScoreDisplay
                      key={key}
                      score={value}
                      label={key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase())}
                    />
                  ))}
                </div>
              </section>
            )}
            
            {/* Main Content - Portable Text */}
            {software.content && (
              <article className="prose prose-lg dark:prose-invert max-w-none">
                <PortableText
                  value={software.content}
                  components={portableTextComponents}
                />
              </article>
            )}
            
            {/* Screenshot Gallery */}
            {software.screenshotGallery && software.screenshotGallery.length > 0 && (
              <section className="mt-12">
                <ScreenshotGallery screenshots={software.screenshotGallery} />
              </section>
            )}
          </div>
          
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
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
            
            {/* Popular Integrations */}
            {software.popularIntegrations && software.popularIntegrations.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <GlobeAltIcon className="h-5 w-5 mr-2 text-gray-600" />
                  Popular Integrations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {software.popularIntegrations.slice(0, 12).map((integration: string) => (
                    <span
                      key={integration}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium"
                    >
                      {integration}
                    </span>
                  ))}
                  {software.popularIntegrations.length > 12 && (
                    <span className="px-3 py-1.5 text-blue-600 dark:text-blue-400 text-sm font-medium">
                      +{software.popularIntegrations.length - 12} more
                    </span>
                  )}
                </div>
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
            
            {/* Categories */}
            {software.categories && software.categories.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  {software.categories.map((category: any) => (
                    <Link
                      key={category._id}
                      href={`/categories/${category.slug.current}`}
                      className="block px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Affiliate Disclosure */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-sm border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300">
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