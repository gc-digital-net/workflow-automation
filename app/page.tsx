import Link from 'next/link'
import { getHomepageData } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import { StarIcon, SparklesIcon, BeakerIcon, CurrencyDollarIcon, MagnifyingGlassIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

function ScoreBar({ score, label }: { score: number; label: string }) {
  const percentage = (score / 10) * 100;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-600 dark:text-gray-400 w-20">{label}</span>
      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-900 dark:text-white w-8">{score}</span>
    </div>
  );
}

export default async function HomePage() {
  const data = await getHomepageData()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              Find the Perfect
              <span className="block text-primary-600 dark:text-primary-400">Automation Software</span>
              for Your Business
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
              Save 10+ hours per week with the right workflow automation tools. 
              Compare 300+ software solutions with in-depth reviews and real user insights.
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 flex gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search software by name or category..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <Link 
                href="/tools/software-finder"
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium whitespace-nowrap"
              >
                Find Software
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">300+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Software Reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">15</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Review Criteria</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">50K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hours Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">2024</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Latest Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Software Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Top-Rated Software</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Hand-picked tools that deliver exceptional value</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data?.featuredSoftware?.slice(0, 6).map((software: any) => (
              <Link
                key={software._id}
                href={`/reviews/${software.slug?.current}`}
                className="group block"
              >
                <article className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center">
                          {software.logo ? (
                            <img 
                              src={urlFor(software.logo).width(48).height(48).url()} 
                              alt={software.name}
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <SparklesIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                            {software.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Workflow Automation</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          {software.overallScore || 9.0}
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i} 
                              className={`h-3 w-3 ${
                                i < Math.floor((software.overallScore || 9.0) / 2)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {software.tagline || 'Powerful automation platform for modern teams'}
                    </p>
                  </div>
                  
                  {/* Scores */}
                  <div className="p-6 space-y-3 flex-1">
                    <ScoreBar score={9.5} label="Features" />
                    <ScoreBar score={8.8} label="Ease of Use" />
                    <ScoreBar score={9.0} label="Value" />
                    <ScoreBar score={8.7} label="Support" />
                  </div>
                  
                  {/* Quick Info */}
                  <div className="p-6 pt-0">
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">Free - $29/mo</span>
                        </div>
                        {software.hasFreeTrial && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full">
                            Free Tier
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <BeakerIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">500+</span>
                      </div>
                    </div>
                    
                    {/* Best For */}
                    <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Best For:</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Teams wanting maximum flexibility</p>
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Updated Recently
                      </span>
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:underline">
                        Read Review →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          
          {/* Load More */}
          <div className="mt-12 text-center">
            <Link 
              href="/reviews"
              className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
            >
              View All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Content Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Latest Insights</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Expert guides, listicles, and automation tips</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {data?.latestPosts?.slice(0, 3).map((post: any) => (
                  <article key={post._id} className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase">Article</span>
                      <span className="text-gray-400">•</span>
                      <time className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </time>
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      <Link 
                        href={`/blog/${post.slug?.current}`}
                        className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{post.excerpt}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">By {post.author}</span>
                      <Link 
                        href={`/blog/${post.slug?.current}`}
                        className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Newsletter CTA */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Get Weekly Tips</h3>
                <p className="text-primary-100 mb-4 text-sm">
                  Join 10,000+ professionals getting automation insights
                </p>
                <Link 
                  href="/newsletter"
                  className="inline-block w-full text-center px-4 py-2 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50"
                >
                  Subscribe Now
                </Link>
              </div>

              {/* Featured Listicles */}
              {data?.featuredListicles && data.featuredListicles.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Top Listicles</h3>
                  <ul className="space-y-3">
                    {data.featuredListicles.slice(0, 2).map((listicle: any) => (
                      <li key={listicle._id}>
                        <Link 
                          href={`/listicles/${listicle.slug?.current}`}
                          className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {listicle.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Interactive Tools */}
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Free Tools</h3>
                <div className="space-y-3">
                  <Link 
                    href="/tools/roi-calculator"
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">ROI Calculator</span>
                    <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                  </Link>
                  <Link 
                    href="/tools/software-finder"
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Software Finder</span>
                    <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {data?.testimonials && data.testimonials.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Users Say</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Real feedback from our community</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {data.testimonials.map((testimonial: any) => (
                <div key={testimonial._id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.testimonial}"</p>
                  <div className="flex items-center gap-3">
                    {testimonial.avatar && (
                      <img 
                        src={urlFor(testimonial.avatar).width(40).height(40).url()} 
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}{testimonial.company && `, ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Use our AI-powered Software Finder to get personalized recommendations based on your specific needs.
          </p>
          <Link
            href="/tools/software-finder"
            className="inline-flex items-center px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-primary-50 font-medium"
          >
            Try Software Finder
            <SparklesIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}