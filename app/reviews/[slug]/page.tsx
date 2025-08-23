import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { getSoftwareBySlug, getSoftware } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import { StarIcon, CheckIcon, XMarkIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import { CurrencyDollarIcon, BeakerIcon, ShieldCheckIcon, ClockIcon, UsersIcon, ChartBarIcon, BuildingOfficeIcon, CalendarIcon } from '@heroicons/react/24/outline'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const software = await getSoftware()
  return software.map((item: any) => ({
    slug: item.slug?.current,
  }))
}

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const software = await getSoftwareBySlug(params.slug)
  
  if (!software) {
    return {
      title: 'Software Not Found',
    }
  }

  return {
    title: `${software.name} Review 2024 - Features, Pricing & Alternatives`,
    description: software.seo?.metaDescription || `In-depth review of ${software.name}. ${software.tagline}. Compare features, pricing, pros and cons.`,
    keywords: software.seo?.keywords || [],
  }
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  const percentage = (score / 10) * 100;
  const getScoreColor = (score: number) => {
    if (score >= 9) return 'from-green-500 to-green-600'
    if (score >= 7) return 'from-blue-500 to-blue-600'
    if (score >= 5) return 'from-yellow-500 to-yellow-600'
    return 'from-red-500 to-red-600'
  }
  
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-36">{label}</span>
      <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${getScoreColor(score)} transition-all duration-500`}
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
  const scores = software.scores || {}

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
                    {software.name} Review {new Date().getFullYear()}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    {software.tagline}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    {software.categories?.map((category: any) => (
                      <span key={category?._id || category?.name || Math.random()} className="px-3 py-1 bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 rounded-full text-sm">
                        {category?.name || 'Uncategorized'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verdict Box */}
              {software.verdict && (
                <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-6 border border-primary-200 dark:border-primary-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Our Verdict</h3>
                  <p className="text-gray-700 dark:text-gray-300">{software.verdict}</p>
                </div>
              )}

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
                  {software.shortDescription}
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
                  href="#pricing"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold"
                >
                  View Pricing
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  {software.pricingDetails?.hasFreeTier && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Free Plan</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">✓ Available</span>
                    </div>
                  )}
                  {software.pricingDetails?.freeTrialDays && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Free Trial</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{software.pricingDetails.freeTrialDays} days</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <BeakerIcon className="h-4 w-4" />
                      Integrations
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {typeof software.integrations === 'object' 
                        ? software.integrations?.count || '500+'
                        : software.integrations || '500+'}
                    </span>
                  </div>
                  {software.companyInfo?.foundedYear && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CalendarIcon className="h-4 w-4" />
                        Founded
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {software.companyInfo.foundedYear}
                      </span>
                    </div>
                  )}
                  {software.companyInfo?.headquarters && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <BuildingOfficeIcon className="h-4 w-4" />
                        HQ
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {software.companyInfo.headquarters}
                      </span>
                    </div>
                  )}
                  {software.security?.certifications && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <ShieldCheckIcon className="h-4 w-4" />
                        Security
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {software.security.certifications.slice(0, 2).join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* User Ratings */}
              {software.userRatings && (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">User Ratings</h3>
                  <div className="space-y-3">
                    {software.userRatings.g2Score && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">G2</span>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon 
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(software.userRatings.g2Score)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {software.userRatings.g2Score}/5
                          </span>
                        </div>
                      </div>
                    )}
                    {software.userRatings.capterraScore && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Capterra</span>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon 
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(software.userRatings.capterraScore)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {software.userRatings.capterraScore}/5
                          </span>
                        </div>
                      </div>
                    )}
                    {software.userRatings.trustRadiusScore && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">TrustRadius</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {software.userRatings.trustRadiusScore}/10
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">In This Review</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="#overview" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">→ Overview</a>
              <a href="#scores" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">→ Detailed Scores</a>
              <a href="#features" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">→ Key Features</a>
              <a href="#pricing" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">→ Pricing Analysis</a>
              <a href="#pros-cons" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">→ Pros & Cons</a>
              <a href="#use-cases" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">→ Use Cases</a>
              <a href="#detailed-review" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">→ Detailed Review</a>
              <a href="#competitors" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">→ Competitors</a>
              <a href="#verdict" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">→ Final Verdict</a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      {software.overview && (
        <section id="overview" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Overview</h2>
              
              {software.overview.introduction && (
                <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                  <PortableText value={software.overview.introduction} />
                </div>
              )}
              
              {software.overview.targetAudience && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Who Is {software.name} For?</h3>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <PortableText value={software.overview.targetAudience} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Detailed Scores */}
      {scores && Object.keys(scores).length > 0 && (
        <section id="scores" className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Detailed Scoring</h2>
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
                <div className="space-y-4">
                  {scores.features && <ScoreBar score={scores.features} label="Feature Set" />}
                  {scores.easeOfUse && <ScoreBar score={scores.easeOfUse} label="Ease of Use" />}
                  {scores.integrations && <ScoreBar score={scores.integrations} label="Integrations" />}
                  {scores.pricing && <ScoreBar score={scores.pricing} label="Pricing Value" />}
                  {scores.support && <ScoreBar score={scores.support} label="Customer Support" />}
                  {scores.security && <ScoreBar score={scores.security} label="Security" />}
                  {scores.scalability && <ScoreBar score={scores.scalability} label="Scalability" />}
                  {scores.performance && <ScoreBar score={scores.performance} label="Performance" />}
                  {scores.customization && <ScoreBar score={scores.customization} label="Customization" />}
                  {scores.reporting && <ScoreBar score={scores.reporting} label="Reporting" />}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Key Features */}
      {software.keyFeatures && software.keyFeatures.length > 0 && (
        <section id="features" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Key Features</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {software.keyFeatures.map((feature: any, index: number) => (
                  <div key={feature._key || index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                    {feature.category && (
                      <span className="inline-block mt-3 px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs rounded">
                        {feature.category}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {(software.pricing || software.pricingSection) && (
        <section id="pricing" className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Pricing & Plans</h2>
              
              {/* Pricing Plans Grid */}
              {software.pricing && software.pricing.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
                  {software.pricing.map((plan: any, index: number) => (
                    <div key={plan._key || index} className={`bg-white dark:bg-gray-900 rounded-xl border-2 ${plan.recommended ? 'border-primary-500' : 'border-gray-200 dark:border-gray-700'} p-6 relative`}>
                      {plan.mostPopular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-600 text-white text-xs rounded-full">
                          Most Popular
                        </span>
                      )}
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                      <div className="mb-4">
                        {plan.price !== null ? (
                          <>
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                            <span className="text-gray-600 dark:text-gray-400">/mo</span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">Custom</span>
                        )}
                      </div>
                      {plan.userLimit && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{plan.userLimit}</p>
                      )}
                      {plan.features && (
                        <ul className="space-y-2">
                          {plan.features.slice(0, 5).map((feature: string, i: number) => (
                            <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                              <CheckIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Pricing Analysis */}
              {software.pricingSection && (
                <div className="space-y-8 max-w-4xl mx-auto">
                  {software.pricingSection.pricingOverview && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pricing Overview</h3>
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <PortableText value={software.pricingSection.pricingOverview} />
                      </div>
                    </div>
                  )}
                  
                  {software.pricingSection.valueForMoney && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Value for Money</h3>
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <PortableText value={software.pricingSection.valueForMoney} />
                      </div>
                    </div>
                  )}
                  
                  {software.pricingSection.competitiveComparison && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pricing vs Competitors</h3>
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <PortableText value={software.pricingSection.competitiveComparison} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Pros and Cons */}
      <section id="pros-cons" className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Pros & Cons</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Pros */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <CheckIcon className="h-6 w-6 text-green-500" />
                  Pros
                </h3>
                <ul className="space-y-3">
                  {software.pros && software.pros.length > 0 && 
                    software.pros.map((pro: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{pro}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>

              {/* Cons */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <XMarkIcon className="h-6 w-6 text-red-500" />
                  Cons
                </h3>
                <ul className="space-y-3">
                  {software.cons && software.cons.length > 0 &&
                    software.cons.map((con: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <XMarkIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{con}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      {software.useCasesSection && (
        <section id="use-cases" className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Use Cases & Implementation</h2>
              
              {software.useCasesSection.idealUseCases && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ideal Use Cases</h3>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <PortableText value={software.useCasesSection.idealUseCases} />
                  </div>
                </div>
              )}
              
              {software.useCasesSection.implementationGuide && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Implementation Guide</h3>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <PortableText value={software.useCasesSection.implementationGuide} />
                  </div>
                </div>
              )}
              
              {software.useCasesSection.realWorldExamples && software.useCasesSection.realWorldExamples.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Real-World Examples</h3>
                  <div className="space-y-6">
                    {software.useCasesSection.realWorldExamples.map((example: any, index: number) => (
                      <div key={example._key || index} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{example.company}</h4>
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Challenge:</span>
                            <p className="text-gray-600 dark:text-gray-400">{example.challenge}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Solution:</span>
                            <p className="text-gray-600 dark:text-gray-400">{example.solution}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Results:</span>
                            <p className="text-gray-600 dark:text-gray-400">{example.results}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Detailed Review Content */}
      {software.detailedReview && (
        <section id="detailed-review" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Detailed Review</h2>
              <div className="space-y-8">
                {software.detailedReview.userInterface && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Interface & Experience</h3>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <PortableText value={software.detailedReview.userInterface} />
                    </div>
                  </div>
                )}
                
                {software.detailedReview.featuresAnalysis && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Features Analysis</h3>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <PortableText value={software.detailedReview.featuresAnalysis} />
                    </div>
                  </div>
                )}
                
                {software.detailedReview.integrationCapabilities && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Integration Capabilities</h3>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <PortableText value={software.detailedReview.integrationCapabilities} />
                    </div>
                  </div>
                )}
                
                {software.detailedReview.performanceReliability && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Performance & Reliability</h3>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <PortableText value={software.detailedReview.performanceReliability} />
                    </div>
                  </div>
                )}
                
                {software.detailedReview.securityCompliance && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Security & Compliance</h3>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <PortableText value={software.detailedReview.securityCompliance} />
                    </div>
                  </div>
                )}
                
                {software.detailedReview.customerSupport && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Customer Support</h3>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <PortableText value={software.detailedReview.customerSupport} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Competitor Analysis */}
      {software.competitorAnalysis && (
        <section id="competitors" className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Competitor Analysis</h2>
              
              {software.competitorAnalysis.competitiveAdvantages && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Competitive Advantages</h3>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <PortableText value={software.competitorAnalysis.competitiveAdvantages} />
                  </div>
                </div>
              )}
              
              {software.competitorAnalysis.competitiveDisadvantages && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Areas for Improvement</h3>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <PortableText value={software.competitorAnalysis.competitiveDisadvantages} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Final Verdict */}
      {software.finalVerdict && (
        <section id="verdict" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Final Verdict</h2>
              
              {software.finalVerdict.summary && (
                <div className="mb-8">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <PortableText value={software.finalVerdict.summary} />
                  </div>
                </div>
              )}
              
              {software.finalVerdict.recommendation && (
                <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-8 border border-primary-200 dark:border-primary-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Recommendation</h3>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <PortableText value={software.finalVerdict.recommendation} />
                  </div>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                {software.finalVerdict.whoShouldUse && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      Who Should Use {software.name}
                    </h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <PortableText value={software.finalVerdict.whoShouldUse} />
                    </div>
                  </div>
                )}
                
                {software.finalVerdict.whoShouldAvoid && (
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <XMarkIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                      Who Should Consider Alternatives
                    </h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <PortableText value={software.finalVerdict.whoShouldAvoid} />
                    </div>
                  </div>
                )}
              </div>
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
            {software.pricingDetails?.freeTrialDays 
              ? `Start your ${software.pricingDetails.freeTrialDays}-day free trial today and see how ${software.name} can transform your workflow.`
              : `Start today and see how ${software.name} can transform your workflow.`}
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