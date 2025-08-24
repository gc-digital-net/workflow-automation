'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CalendarIcon, UserIcon, ArrowRightIcon, BookOpenIcon, LightBulbIcon } from '@heroicons/react/24/outline'

// Mock data - replace with actual data from props
const mockPosts = [
  {
    _id: '1',
    title: 'How to Automate Your Sales Pipeline in 2024',
    slug: { current: 'automate-sales-pipeline-2024' },
    excerpt: 'Learn the step-by-step process to automate your sales pipeline, from lead generation to closing deals, using modern automation tools.',
    author: 'Sarah Chen',
    publishedAt: '2024-01-15',
    readingTime: 8,
    category: 'Sales Automation'
  },
  {
    _id: '2',
    title: 'ClickUp vs Monday.com: Which is Better for Your Team?',
    slug: { current: 'clickup-vs-monday-comparison' },
    excerpt: 'An in-depth comparison of two leading project management tools, analyzing features, pricing, and use cases.',
    author: 'Mike Johnson',
    publishedAt: '2024-01-12',
    readingTime: 12,
    category: 'Comparisons'
  },
  {
    _id: '3',
    title: '10 Workflow Automation Mistakes to Avoid',
    slug: { current: 'workflow-automation-mistakes' },
    excerpt: 'Common pitfalls teams face when implementing automation and how to avoid them for successful digital transformation.',
    author: 'Emily Rodriguez',
    publishedAt: '2024-01-10',
    readingTime: 6,
    category: 'Best Practices'
  }
]

const mockGuides = [
  {
    _id: '1',
    title: 'Best Project Management Software 2024',
    slug: { current: 'best-project-management-software-2024' },
    itemCount: 15
  },
  {
    _id: '2',
    title: 'Top 10 CRM Tools for Small Business',
    slug: { current: 'top-crm-tools-small-business' },
    itemCount: 10
  }
]

export default function BlogHighlights({ posts = mockPosts, guides = mockGuides }: { posts?: any[], guides?: any[] }) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white sm:text-4xl">
            Latest Insights & Guides
          </h2>
          <p className="mt-4 text-lg text-secondary-600 dark:text-secondary-400">
            Expert advice and comprehensive guides to help you succeed
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <article className="relative h-full bg-gradient-to-br from-primary-500 to-cyan-600 rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative p-8 lg:p-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
                  <BookOpenIcon className="h-4 w-4" />
                  Featured Article
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  {posts[0]?.title}
                </h3>
                
                <p className="text-lg text-white/90 mb-6 line-clamp-3">
                  {posts[0]?.excerpt}
                </p>
                
                <div className="flex items-center gap-6 text-white/80 text-sm mb-8">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    {posts[0]?.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {new Date(posts[0]?.publishedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpenIcon className="h-4 w-4" />
                    {posts[0]?.readingTime} min read
                  </div>
                </div>
                
                <Link
                  href={`/blog/${posts[0]?.slug?.current}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-secondary-50 transition-all"
                >
                  Read Article
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
            </article>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Recent Articles */}
            <div className="bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 rounded-2xl p-6 shadow-sm ring-1 ring-white/20 dark:ring-gray-700/30">
              <h3 className="font-semibold text-secondary-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                Recent Articles
              </h3>
              <div className="space-y-4">
                {posts.slice(1, 3).map((post) => (
                  <article key={post._id}>
                    <Link
                      href={`/blog/${post.slug?.current}`}
                      className="group"
                    >
                      <h4 className="font-medium text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="mt-1 flex items-center gap-3 text-xs text-secondary-500 dark:text-secondary-500">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.readingTime} min read</span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
              <Link
                href="/blog"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                View All Articles
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            {/* Best Of Guides */}
            <div className="bg-gradient-to-br from-white/30 to-primary-50/30 backdrop-blur-sm dark:from-gray-800/30 dark:to-primary-900/20 rounded-2xl p-6">
              <h3 className="font-semibold text-secondary-900 dark:text-white mb-4 flex items-center gap-2">
                <LightBulbIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                Popular Guides
              </h3>
              <div className="space-y-3">
                {guides.map((guide) => (
                  <Link
                    key={guide._id}
                    href={`/listicles/${guide.slug?.current}`}
                    className="block group"
                  >
                    <div className="flex items-center justify-between p-3 bg-white/30 backdrop-blur-sm dark:bg-gray-900/30 rounded-lg hover:bg-white/50 dark:hover:bg-gray-900/50 transition-all">
                      <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                        {guide.title}
                      </span>
                      <span className="text-xs text-secondary-500 dark:text-secondary-500">
                        {guide.itemCount} tools
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-primary-600 to-cyan-600 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-2">
            Get Weekly Automation Tips
          </h3>
          <p className="text-white/90 mb-6">
            Join 10,000+ professionals receiving expert insights on workflow automation
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-secondary-900 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-secondary-50 transition-all">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}