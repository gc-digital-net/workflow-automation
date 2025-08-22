import Link from 'next/link';
import { Metadata } from 'next';
import { getHomepageData } from '@/lib/sanity-queries';
import { urlFor } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Workflow Automation - Find the Perfect Automation Software',
  description: 'Discover, compare, and choose the best workflow automation software for your business. In-depth reviews, comparisons, and ROI calculators.',
};

export default async function HomePage() {
  const data = await getHomepageData();
  const { featuredSoftware, latestPosts, featuredListicles, testimonials, siteSettings } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Find the Perfect Automation Software for Your Business
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Save time, reduce errors, and scale your operations with the right workflow automation tools. 
              We review and compare the best software to help you make informed decisions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/reviews"
                className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Browse Reviews
              </Link>
              <Link 
                href="/tools/software-finder" 
                className="text-lg font-semibold leading-6 text-gray-900 dark:text-white"
              >
                Find Your Software <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Software */}
      {featuredSoftware && featuredSoftware.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Top Rated Software
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredSoftware.map((software: any) => (
                <Link 
                  key={software._id}
                  href={`/reviews/${software.slug.current}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    {software.logo && (
                      <img 
                        src={urlFor(software.logo).width(60).height(60).url()} 
                        alt={software.name}
                        className="w-12 h-12 object-contain"
                      />
                    )}
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {software.overallScore}/10
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {software.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {software.tagline}
                  </p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link 
                href="/reviews"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                View All Reviews →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
      {latestPosts && latestPosts.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Latest Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {latestPosts.map((post: any) => (
                <article key={post._id} className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                  {post.featuredImage && (
                    <img 
                      src={urlFor(post.featuredImage).width(400).height(250).url()} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      <Link 
                        href={`/blog/${post.slug.current}`}
                        className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link 
                href="/blog"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Read More Articles →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              What Our Users Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial: any) => (
                <div key={testimonial._id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center mb-4">
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
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    "{testimonial.testimonial}"
                  </p>
                  <div className="flex items-center">
                    {testimonial.avatar && (
                      <img 
                        src={urlFor(testimonial.avatar).width(40).height(40).url()} 
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">In-Depth Reviews</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive analysis of automation tools using our 15-point evaluation framework
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Comparison Tools</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Side-by-side comparisons to help you choose between different software options
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">ROI Calculator</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Calculate potential time and cost savings from implementing automation tools
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Newsletter */}
      <section className="py-16 bg-blue-600 dark:bg-blue-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {siteSettings?.newsletterCTA?.title || 'Ready to Transform Your Workflow?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {siteSettings?.newsletterCTA?.description || 'Join thousands of businesses that have optimized their operations with the right automation tools.'}
          </p>
          <Link
            href="/tools/software-finder"
            className="inline-block rounded-md bg-white px-8 py-3 text-lg font-semibold text-blue-600 shadow-sm hover:bg-gray-100"
          >
            {siteSettings?.newsletterCTA?.buttonText || 'Get Started Now'}
          </Link>
        </div>
      </section>
    </div>
  );
}