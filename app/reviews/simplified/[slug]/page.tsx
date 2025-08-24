import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { StarIcon, CheckIcon, XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import { client } from '@/lib/sanity'
import { urlForImage } from '@/lib/image'
import { Metadata } from 'next'
import ScreenshotGallery from '@/components/review/ScreenshotGallery'

// Portable Text Components for rendering custom blocks
const portableTextComponents = {
  types: {
    screenshot: ({ value }: any) => {
      const imageUrl = urlForImage(value.image)
      const size = value.size || 'large'
      
      const sizeClasses = {
        small: 'max-w-md mx-auto',
        medium: 'max-w-2xl mx-auto',
        large: 'max-w-4xl mx-auto',
        full: 'w-full'
      }
      
      return (
        <figure className={`my-8 ${sizeClasses[size as keyof typeof sizeClasses]}`}>
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageUrl}
              alt={value.caption || 'Screenshot'}
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    
    prosConsBlock: ({ value }: any) => (
      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
          <h3 className="font-bold text-green-800 dark:text-green-400 mb-4 flex items-center">
            <CheckIcon className="h-5 w-5 mr-2" />
            Pros
          </h3>
          <ul className="space-y-2">
            {value.pros?.map((pro: string, idx: number) => (
              <li key={idx} className="flex items-start">
                <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
          <h3 className="font-bold text-red-800 dark:text-red-400 mb-4 flex items-center">
            <XMarkIcon className="h-5 w-5 mr-2" />
            Cons
          </h3>
          <ul className="space-y-2">
            {value.cons?.map((con: string, idx: number) => (
              <li key={idx} className="flex items-start">
                <XMarkIcon className="h-4 w-4 text-red-600 dark:text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    
    featureList: ({ value }: any) => (
      <div className="my-8">
        <h3 className="text-2xl font-bold mb-6">{value.title || 'Key Features'}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {value.features?.map((feature: any, idx: number) => (
            <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {feature.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
    
    pricingTable: ({ value }: any) => (
      <div className="my-12">
        <h3 className="text-2xl font-bold mb-6">{value.title || 'Pricing Plans'}</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {value.plans?.map((plan: any, idx: number) => (
            <div 
              key={idx} 
              className={`rounded-lg p-6 ${
                plan.highlighted 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500' 
                  : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.highlighted && (
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              )}
              <h4 className="text-xl font-bold mt-4 mb-2">{plan.name}</h4>
              <p className="text-3xl font-bold mb-4">{plan.price}</p>
              <ul className="space-y-2">
                {plan.features?.map((feature: string, fidx: number) => (
                  <li key={fidx} className="flex items-start">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ),
    
    comparisonTable: ({ value }: any) => (
      <div className="my-12 overflow-x-auto">
        <h3 className="text-2xl font-bold mb-6">{value.title || 'Comparison'}</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border p-3 text-left">Feature</th>
              <th className="border p-3 text-center">This Product</th>
              <th className="border p-3 text-center">Competitor 1</th>
              <th className="border p-3 text-center">Competitor 2</th>
            </tr>
          </thead>
          <tbody>
            {value.items?.map((item: any, idx: number) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border p-3 font-medium">{item.feature}</td>
                <td className="border p-3 text-center">{item.thisProduct}</td>
                <td className="border p-3 text-center">{item.competitor1}</td>
                <td className="border p-3 text-center">{item.competitor2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    
    ctaBlock: ({ value }: any) => (
      <div className="my-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-center text-white">
        <h3 className="text-3xl font-bold mb-4">{value.title}</h3>
        <p className="text-lg mb-6 opacity-90">{value.description}</p>
        <a
          href={value.buttonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
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
        <figure className="my-8">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
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
            <figcaption className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    
    faqBlock: ({ value }: any) => (
      <div className="my-12">
        <h3 className="text-2xl font-bold mb-6">{value.title || 'Frequently Asked Questions'}</h3>
        <div className="space-y-4">
          {value.items?.map((item: any, idx: number) => (
            <details key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">
                {item.question}
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
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
      <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
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
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        {children}
      </a>
    )
  }
}


// Score Display Component
function ScoreDisplay({ score, label }: { score: number; label: string }) {
  const percentage = (score / 10) * 100
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{score}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

async function getSoftware(slug: string) {
  const query = `
    *[_type == "softwareSimplified" && slug.current == $slug][0] {
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
    title: software.seo?.metaTitle || `${software.name} Review - Workflow Automation`,
    description: software.seo?.metaDescription || software.excerpt || `Comprehensive review of ${software.name}`,
    openGraph: {
      title: software.seo?.metaTitle || `${software.name} Review`,
      description: software.seo?.metaDescription || software.excerpt,
      images: software.logo ? [urlForImage(software.logo)] : [],
    }
  }
}

export default async function SimplifiedReviewPage({ params }: { params: { slug: string } }) {
  const software = await getSoftware(params.slug)
  
  if (!software) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header Section */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-start gap-8">
            {/* Logo */}
            {software.logo && (
              <div className="flex-shrink-0">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white shadow-lg">
                  <Image
                    src={urlForImage(software.logo)}
                    alt={`${software.name} logo`}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            )}
            
            {/* Title and Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {software.name} Review
              </h1>
              {software.tagline && (
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                  {software.tagline}
                </p>
              )}
              
              {/* Overall Score */}
              {software.overallScore && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {software.overallScore}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">/10</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-6 w-6 ${
                          i < Math.floor(software.overallScore / 2)
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* CTA Button */}
            {software.affiliateLink && (
              <div className="flex-shrink-0">
                <a
                  href={software.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Try {software.name}
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </a>
              </div>
            )}
          </div>
          
          {/* Quick Info Bar */}
          {software.quickInfo && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              {software.quickInfo.startingPrice && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Starting Price</p>
                  <p className="font-semibold">{software.quickInfo.startingPrice}</p>
                </div>
              )}
              {software.quickInfo.freeTrial && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Free Trial</p>
                  <p className="font-semibold">{software.quickInfo.freeTrial}</p>
                </div>
              )}
              {software.quickInfo.bestFor && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Best For</p>
                  <p className="font-semibold">{software.quickInfo.bestFor}</p>
                </div>
              )}
              {software.quickInfo.integrations && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Integrations</p>
                  <p className="font-semibold">{software.quickInfo.integrations}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* Scores Section */}
            {software.scores && (
              <section className="mb-12 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Detailed Scoring</h2>
                <div className="space-y-3">
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
              <ScreenshotGallery screenshots={software.screenshotGallery} />
            )}
          </div>
          
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Popular Integrations */}
            {software.popularIntegrations && software.popularIntegrations.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg mb-6">
                <h3 className="text-xl font-bold mb-4">Popular Integrations</h3>
                <div className="flex flex-wrap gap-2">
                  {software.popularIntegrations.map((integration: string) => (
                    <span
                      key={integration}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Categories */}
            {software.categories && software.categories.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg mb-6">
                <h3 className="text-xl font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  {software.categories.map((category: any) => (
                    <Link
                      key={category._id}
                      href={`/categories/${category.slug.current}`}
                      className="block px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Affiliate Disclosure */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Disclosure:</strong> We may receive a commission when you purchase through our links, 
                but this doesn't influence our reviews.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}