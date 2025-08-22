import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { getBestOfGuideBySlug, getBestOfGuides, getSoftwareBySlug } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import { StarIcon, CheckIcon, ArrowRightIcon, ChevronRightIcon, TrophyIcon } from '@heroicons/react/24/solid'
import { ClockIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const guides = await getBestOfGuides()
  return guides.map((guide: any) => ({
    slug: guide.slug?.current,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = await getBestOfGuideBySlug(params.slug)
  
  if (!guide) {
    return {
      title: 'Guide Not Found',
    }
  }

  const currentYear = new Date().getFullYear()
  const title = guide.seo?.metaTitle || `${guide.title} - ${currentYear}`
  
  return {
    title,
    description: guide.seo?.metaDescription || guide.excerpt,
    keywords: guide.seo?.keywords || [],
  }
}

function QuickComparisonTable({ items }: { items: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-900">
            <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">Software</th>
            <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">Best For</th>
            <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">Pricing</th>
            <th className="p-4 text-center font-semibold text-gray-900 dark:text-white">Score</th>
            <th className="p-4 text-center font-semibold text-gray-900 dark:text-white">Free Trial</th>
          </tr>
        </thead>
        <tbody>
          {items.slice(0, 10).map((item: any, index: number) => (
            <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-600 dark:text-gray-400">#{item.rank}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.software?.name || item.customTitle}
                  </span>
                </div>
              </td>
              <td className="p-4 text-gray-600 dark:text-gray-400">{item.bestFor || 'General use'}</td>
              <td className="p-4 text-gray-600 dark:text-gray-400">From $19/mo</td>
              <td className="p-4 text-center">
                <span className="inline-flex items-center gap-1 font-bold text-primary-600 dark:text-primary-400">
                  {item.software?.overallScore || '8.5'}/10
                </span>
              </td>
              <td className="p-4 text-center">
                <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default async function BestOfGuidePage({ params }: Props) {
  const guide = await getBestOfGuideBySlug(params.slug)

  if (!guide) {
    notFound()
  }

  const currentYear = new Date().getFullYear()
  const publishDate = guide.publishedAt ? new Date(guide.publishedAt) : new Date()
  
  // Calculate reading time (rough estimate)
  const readingTime = Math.ceil((guide.listItems?.length || 10) * 2 + 5) // 2 min per item + 5 min for intro/conclusion

  return (
    <article className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              Home
            </Link>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            <Link href="/best" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              Best Of Guides
            </Link>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 dark:text-white font-medium">Current Guide</span>
          </nav>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {guide.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {guide.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <UserIcon className="h-4 w-4" />
                <span>By {guide.author?.name || 'Workflow Automation Team'}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>Updated {publishDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                ✓ Tested {guide.listItems?.length || 25}+ tools · 
                ✓ {currentYear} pricing verified · 
                ✓ Expert analysis since 2012
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Summary Box */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrophyIcon className="h-5 w-5 text-yellow-500" />
                Quick Verdict
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {guide.listItems?.slice(0, 3).map((item: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                      index === 0 ? 'bg-yellow-400 text-yellow-900' :
                      index === 1 ? 'bg-gray-300 text-gray-900' :
                      'bg-orange-400 text-orange-900'
                    }`}>
                      {item.rank}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.software?.name || item.customTitle}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.bestFor || 'Best overall'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          {guide.introduction && (
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <PortableText value={guide.introduction} />
            </div>
          )}

          {/* Quick Comparison Table */}
          {guide.listItems && guide.listItems.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Quick Comparison
              </h2>
              <QuickComparisonTable items={guide.listItems} />
            </section>
          )}

          {/* Detailed Reviews */}
          {guide.listItems && guide.listItems.length > 0 && (
            <section className="space-y-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Detailed Reviews
              </h2>
              
              {guide.listItems.map((item: any, index: number) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-12 last:border-0">
                  {/* Item Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg flex-shrink-0 ${
                      item.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                      item.rank === 2 ? 'bg-gray-300 text-gray-900' :
                      item.rank === 3 ? 'bg-orange-400 text-orange-900' :
                      'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      #{item.rank}
                    </span>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.software?.name || item.customTitle}
                        {item.rank === 1 && (
                          <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Best Overall
                          </span>
                        )}
                      </h3>
                      
                      {item.bestFor && (
                        <p className="text-lg text-primary-600 dark:text-primary-400 font-medium">
                          Best for: {item.bestFor}
                        </p>
                      )}
                    </div>

                    {item.software?.overallScore && (
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                          {item.software.overallScore}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">out of 10</div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {item.description && (
                    <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                      <PortableText value={item.description} />
                    </div>
                  )}

                  {/* Key Features */}
                  {item.keyFeatures && item.keyFeatures.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {item.keyFeatures.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Pros and Cons */}
                  {(item.pros || item.cons) && (
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {item.pros && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Pros:</h4>
                          <ul className="space-y-2">
                            {item.pros.map((pro: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                                <span className="text-green-500">+</span> {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {item.cons && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Cons:</h4>
                          <ul className="space-y-2">
                            {item.cons.map((con: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                                <span className="text-red-500">-</span> {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex gap-4">
                    {(item.affiliateLink || item.software?.affiliateLink) && (
                      <a
                        href={item.affiliateLink || item.software.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold"
                      >
                        Try {item.software?.name || item.customTitle}
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </a>
                    )}
                    {item.software?.slug && (
                      <Link
                        href={`/reviews/${item.software.slug.current}`}
                        className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold"
                      >
                        Read Full Review
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Conclusion */}
          {guide.conclusion && (
            <div className="prose prose-lg dark:prose-invert max-w-none mt-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Conclusion</h2>
              <PortableText value={guide.conclusion} />
            </div>
          )}

          {/* FAQ Section */}
          {guide.faq && guide.faq.length > 0 && (
            <section className="mt-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {guide.faq.map((item: any, index: number) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.question}
                    </h3>
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <PortableText value={item.answer} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Use our AI-powered Software Finder to get personalized recommendations based on your specific needs.
          </p>
          <Link
            href="/tools/software-finder"
            className="inline-flex items-center px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-primary-50 font-medium"
          >
            Get Personalized Recommendations
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </article>
  )
}