import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { getSoftwareBySlug, getSoftware } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import { StarIcon, CheckIcon, XMarkIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import { CurrencyDollarIcon, BeakerIcon, ShieldCheckIcon, ClockIcon, UsersIcon, ChartBarIcon } from '@heroicons/react/24/outline'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const software = await getSoftware()
  return software.map((item: any) => ({
    slug: item.slug?.current,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const software = await getSoftwareBySlug(params.slug)
  
  if (!software) {
    return {
      title: 'Software Not Found',
    }
  }

  return {
    title: `${software.name} Review - Features, Pricing & Alternatives`,
    description: software.seo?.metaDescription || `In-depth review of ${software.name}. ${software.tagline}. Compare features, pricing, pros and cons.`,
    keywords: software.seo?.keywords || [],
  }
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  const percentage = (score / 10) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-32">{label}</span>
      <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-bold text-gray-900 dark:text-white w-12 text-right">{score}/10</span>
    </div>
  );
}

export default async function SoftwareReviewPage({ params }: Props) {
  const software = await getSoftwareBySlug(params.slug)

  if (!software) {
    notFound()
  }

  // Default scores if not provided
  const scores = software.scores || {
    easeOfUse: 8.5,
    features: 9.0,
    integrations: 8.8,
    pricing: 8.0,
    support: 8.5,
    security: 9.0,
    scalability: 8.7,
    performance: 8.9,
    mobile: 8.0,
    documentation: 8.5,
    learningCurve: 7.5,
    customization: 8.0,
    reporting: 8.5,
    freeTier: 9.0,
    overallValue: 8.5,
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/reviews" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              Reviews
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 dark:text-white font-medium">{software.name}</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-6 mb-6">
                {software.logo && (
                  <img 
                    src={urlFor(software.logo).width(100).height(100).url()} 
                    alt={software.name}
                    className="w-20 h-20 object-contain bg-white rounded-lg shadow-sm p-2"
                  />
                )}
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {software.name} Review
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    {software.tagline}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    {software.categories?.map((category: any) => (
                      <span key={category.name} className="px-3 py-1 bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 rounded-full text-sm">
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Overall Score */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Overall Score</h2>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary-600 dark:text-primary-400">
                      {software.overallScore || 8.5}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          className={`h-6 w-6 ${
                            i < Math.floor((software.overallScore || 8.5) / 2)
                              ? 'text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {software.shortDescription || `${software.name} is a comprehensive workflow automation platform that helps teams streamline their processes and boost productivity.`}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-4 mb-8">
                {software.affiliateLink && (
                  <a 
                    href={software.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold"
                  >
                    Try {software.name} Free
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </a>
                )}
                <Link 
                  href="/reviews/compare"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold"
                >
                  Compare Alternatives
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pricing</h3>
                {software.pricing && software.pricing.length > 0 ? (
                  <div className="space-y-3">
                    {software.pricing.slice(0, 3).map((plan: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{plan.name}</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          ${plan.price}/mo
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Starting from</span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Free</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Pro plans from</span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">$19/mo</span>
                    </div>
                  </div>
                )}
                {software.hasFreeTrial && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm font-medium text-green-700 dark:text-green-400">
                      ✓ Free trial available
                    </p>
                  </div>
                )}
              </div>

              {/* Key Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Key Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <BeakerIcon className="h-4 w-4" />
                      Integrations
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {software.integrations || '500+'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <UsersIcon className="h-4 w-4" />
                      Team Size
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      All sizes
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <ShieldCheckIcon className="h-4 w-4" />
                      Security
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      SOC 2, GDPR
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <ClockIcon className="h-4 w-4" />
                      Last Updated
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {software.lastUpdated ? new Date(software.lastUpdated).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deal Alert */}
              {software.dealInformation?.hasActiveDeal && (
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">🎉 Special Deal</h3>
                  <p className="text-sm mb-3">{software.dealInformation.dealDescription}</p>
                  {software.dealInformation.dealCode && (
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <p className="text-xs mb-1">Use code:</p>
                      <p className="text-lg font-bold">{software.dealInformation.dealCode}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Scores */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Detailed Scoring</h2>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <ScoreBar score={scores.easeOfUse} label="Ease of Use" />
              <ScoreBar score={scores.features} label="Feature Set" />
              <ScoreBar score={scores.integrations} label="Integrations" />
              <ScoreBar score={scores.pricing} label="Pricing Value" />
              <ScoreBar score={scores.support} label="Customer Support" />
              <ScoreBar score={scores.security} label="Security" />
              <ScoreBar score={scores.scalability} label="Scalability" />
              <ScoreBar score={scores.performance} label="Performance" />
              <ScoreBar score={scores.mobile} label="Mobile Access" />
              <ScoreBar score={scores.documentation} label="Documentation" />
              <ScoreBar score={scores.learningCurve} label="Learning Curve" />
              <ScoreBar score={scores.customization} label="Customization" />
              <ScoreBar score={scores.reporting} label="Reporting" />
              <ScoreBar score={scores.freeTier} label="Free Tier" />
            </div>
          </div>
        </div>
      </section>

      {/* Pros and Cons */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pros */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-green-500" />
                Pros
              </h3>
              <ul className="space-y-3">
                {software.pros && software.pros.length > 0 ? (
                  software.pros.map((pro: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{pro}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start gap-3">
                      <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Excellent automation capabilities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">User-friendly interface</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Strong integration ecosystem</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Cons */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <XMarkIcon className="h-6 w-6 text-red-500" />
                Cons
              </h3>
              <ul className="space-y-3">
                {software.cons && software.cons.length > 0 ? (
                  software.cons.map((con: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <XMarkIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{con}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start gap-3">
                      <XMarkIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Can be expensive for larger teams</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XMarkIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Learning curve for advanced features</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Review Content */}
      {(software.overview || software.detailedReview) && (
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {software.overview?.introduction && (
                <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
                  <PortableText value={software.overview.introduction} />
                </div>
              )}
              
              {software.detailedReview && (
                <div className="space-y-8">
                  {software.detailedReview.userInterface && (
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Interface & Experience</h3>
                      <PortableText value={software.detailedReview.userInterface} />
                    </div>
                  )}
                  
                  {software.detailedReview.featuresAnalysis && (
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Features Analysis</h3>
                      <PortableText value={software.detailedReview.featuresAnalysis} />
                    </div>
                  )}
                  
                  {software.detailedReview.integrationCapabilities && (
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Integration Capabilities</h3>
                      <PortableText value={software.detailedReview.integrationCapabilities} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Screenshots Gallery */}
      {software.screenshots && software.screenshots.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Screenshots</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {software.screenshots.map((screenshot: any, index: number) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img 
                    src={urlFor(screenshot.image).width(800).height(500).url()} 
                    alt={screenshot.altText || screenshot.caption || `${software.name} screenshot ${index + 1}`}
                    className="w-full h-auto"
                  />
                  {screenshot.caption && (
                    <p className="p-4 text-sm text-gray-600 dark:text-gray-400">
                      {screenshot.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Try {software.name}?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Start your free trial today and see how {software.name} can transform your workflow.
          </p>
          <div className="flex gap-4 justify-center">
            {software.affiliateLink && (
              <a
                href={software.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-primary-50 font-medium"
              >
                Start Free Trial
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
            )}
            <Link
              href="/reviews"
              className="inline-flex items-center px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-400 font-medium"
            >
              <ArrowLeftIcon className="mr-2 h-5 w-5" />
              Browse More Reviews
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}