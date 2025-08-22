import Link from 'next/link';
import { Metadata } from 'next';
import { getHomepageData } from '@/lib/sanity-queries';
import { urlFor } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Workflow Automation Hub - Find the Perfect Automation Software',
  description: 'Discover, compare, and choose the best workflow automation software for your business. In-depth reviews, comparisons, and ROI calculators.',
};

export default async function HomePage() {
  const data = await getHomepageData();
  const { featuredSoftware, latestPosts, featuredListicles, testimonials, siteSettings } = data;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-100 ring-1 ring-inset ring-blue-400/20">
                🚀 300+ Software Reviewed • 10K+ Users Trust Us
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 animate-fade-in">
              Find the Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Automation Software
              </span>
              for Your Business
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Save 20+ hours per week with the right automation tools. 
              We test, review, and compare software so you don't have to.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/tools/software-finder"
                className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-900 bg-white rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Find Your Software</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="/reviews" 
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200"
              >
                Browse All Reviews
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Shape Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 md:h-20" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              className="fill-white dark:fill-gray-900"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">300+</div>
              <div className="text-gray-600 dark:text-gray-400">Software Reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">4.8/5</div>
              <div className="text-gray-600 dark:text-gray-400">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Software - Enhanced Card Design */}
      {featuredSoftware && featuredSoftware.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Top Rated Automation Software
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our experts have tested and reviewed these tools to help you make the best choice
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredSoftware.slice(0, 6).map((software: any, index: number) => (
                <Link 
                  key={software._id}
                  href={`/reviews/${software.slug.current}`}
                  className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Rank Badge */}
                  {index < 3 && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        index === 0 ? 'bg-yellow-400 text-yellow-900' :
                        index === 1 ? 'bg-gray-300 text-gray-900' :
                        'bg-orange-400 text-orange-900'
                      }`}>
                        #{index + 1} {index === 0 ? 'BEST' : index === 1 ? 'RUNNER UP' : 'TOP PICK'}
                      </span>
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      {software.logo && (
                        <img 
                          src={urlFor(software.logo).width(80).height(80).url()} 
                          alt={software.name}
                          className="w-16 h-16 object-contain"
                        />
                      )}
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          {software.overallScore}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">out of 10</div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {software.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {software.tagline}
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      {software.hasFreeTrial && (
                        <span className="inline-flex items-center text-sm text-green-600 dark:text-green-400">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Free Trial
                        </span>
                      )}
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                        Read Review →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href="/reviews"
                className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Software Reviews
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Content Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Latest Articles */}
            {latestPosts && latestPosts.length > 0 && (
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Latest Insights
                  </h2>
                  <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    View All →
                  </Link>
                </div>
                
                <div className="space-y-6">
                  {latestPosts.map((post: any) => (
                    <article key={post._id} className="group flex gap-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all">
                      {post.featuredImage && (
                        <Link href={`/blog/${post.slug.current}`} className="flex-shrink-0">
                          <img 
                            src={urlFor(post.featuredImage).width(200).height(150).url()} 
                            alt={post.title}
                            className="w-48 h-32 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                          />
                        </Link>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                            Article
                          </span>
                          <span className="text-gray-400">•</span>
                          <time className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </time>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          <Link 
                            href={`/blog/${post.slug.current}`}
                            className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span>By {post.author}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Newsletter CTA */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-3">
                  {siteSettings?.newsletterCTA?.title || 'Get Automation Tips'}
                </h3>
                <p className="text-blue-100 mb-6">
                  {siteSettings?.newsletterCTA?.description || 'Join 10,000+ professionals getting weekly insights'}
                </p>
                <Link 
                  href="/newsletter"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Subscribe Now
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>

              {/* Quick Links */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                  Popular Categories
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/categories/workflow-automation" className="flex items-center justify-between text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      <span>Workflow Automation</span>
                      <span className="text-sm text-gray-400">24</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/project-management" className="flex items-center justify-between text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      <span>Project Management</span>
                      <span className="text-sm text-gray-400">18</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/crm" className="flex items-center justify-between text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      <span>CRM Software</span>
                      <span className="text-sm text-gray-400">15</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/marketing" className="flex items-center justify-between text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      <span>Marketing Automation</span>
                      <span className="text-sm text-gray-400">12</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced Design */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Trusted by Thousands
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                See what our users say about their automation journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial: any) => (
                <div key={testimonial._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 relative">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-blue-100 dark:text-blue-900">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                    "{testimonial.testimonial}"
                  </p>
                  
                  <div className="flex items-center">
                    {testimonial.avatar && (
                      <img 
                        src={urlFor(testimonial.avatar).width(48).height(48).url()} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role} • {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Interactive Tools Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Free Tools & Resources
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Powerful tools to help you make the right automation decisions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/tools/software-finder" className="group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white h-full transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Software Finder</h3>
                <p className="text-blue-100 mb-4">
                  Answer a few questions and get personalized software recommendations
                </p>
                <span className="inline-flex items-center text-white font-semibold group-hover:translate-x-1 transition-transform">
                  Start Quiz
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            <Link href="/tools/roi-calculator" className="group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white h-full transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">ROI Calculator</h3>
                <p className="text-green-100 mb-4">
                  Calculate your potential savings from workflow automation
                </p>
                <span className="inline-flex items-center text-white font-semibold group-hover:translate-x-1 transition-transform">
                  Calculate Now
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            <Link href="/reviews/compare" className="group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white h-full transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Compare Software</h3>
                <p className="text-purple-100 mb-4">
                  Side-by-side comparison of top automation tools
                </p>
                <span className="inline-flex items-center text-white font-semibold group-hover:translate-x-1 transition-transform">
                  Compare Now
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Automate Your Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join thousands of businesses saving 20+ hours per week with the right automation tools. 
            Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tools/software-finder"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all"
            >
              Get Started Free
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}