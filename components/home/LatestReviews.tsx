'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { StarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/solid'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

// Mock data - replace with actual data from props
const mockReviews = [
  {
    _id: '1',
    name: 'ClickUp',
    slug: { current: 'clickup' },
    tagline: 'One app to replace them all',
    overallScore: 9.2,
    lastUpdated: '2024-01-15',
    categories: ['Project Management', 'Workflow Automation'],
    pricing: { starting: 5, currency: 'USD', period: 'user/month' }
  },
  {
    _id: '2',
    name: 'Zapier',
    slug: { current: 'zapier' },
    tagline: 'Automate your work',
    overallScore: 9.0,
    lastUpdated: '2024-01-12',
    categories: ['Workflow Automation', 'Integration'],
    pricing: { starting: 19.99, currency: 'USD', period: 'month' }
  },
  {
    _id: '3',
    name: 'Monday.com',
    slug: { current: 'monday-com' },
    tagline: 'Work OS for teams',
    overallScore: 8.8,
    lastUpdated: '2024-01-10',
    categories: ['Project Management', 'Team Collaboration'],
    pricing: { starting: 8, currency: 'USD', period: 'user/month' }
  },
  {
    _id: '4',
    name: 'Notion',
    slug: { current: 'notion' },
    tagline: 'All-in-one workspace',
    overallScore: 8.9,
    lastUpdated: '2024-01-08',
    categories: ['Document Management', 'Knowledge Base'],
    pricing: { starting: 8, currency: 'USD', period: 'user/month' }
  }
]

export default function LatestReviews({ reviews = mockReviews }: { reviews?: any[] }) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white sm:text-4xl">
              Latest Software Reviews
            </h2>
            <p className="mt-4 text-lg text-secondary-600 dark:text-secondary-400">
              Fresh insights on the newest automation tools
            </p>
          </div>
          <Link
            href="/reviews"
            className="hidden sm:inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
          >
            View All Reviews
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.slice(0, 4).map((review, index) => (
            <motion.article
              key={review._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/reviews/${review.slug?.current}`}>
                <div className="relative h-full flex flex-col bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 rounded-2xl shadow-sm ring-1 ring-white/20 dark:ring-gray-700/30 overflow-hidden transition-all hover:shadow-xl hover:ring-primary-500/50 dark:hover:ring-primary-400/50 hover:-translate-y-1">
                  {/* Score Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md">
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          {review.overallScore}
                        </span>
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                      </div>
                    </div>
                  </div>

                  {/* Header with gradient */}
                  <div className="relative h-32 bg-gradient-to-br from-primary-500 to-cyan-500 p-6">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative">
                      <h3 className="text-2xl font-bold text-white">
                        {review.name}
                      </h3>
                      <p className="mt-1 text-white/90 text-sm">
                        {review.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {review.categories?.slice(0, 2).map((category: string) => (
                        <span
                          key={category}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded-full"
                        >
                          <TagIcon className="h-3 w-3" />
                          {category}
                        </span>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="mb-4">
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">Starting from</p>
                      <p className="text-lg font-semibold text-secondary-900 dark:text-white">
                        ${review.pricing?.starting}/{review.pricing?.period}
                      </p>
                    </div>

                    {/* Updated Date */}
                    <div className="flex items-center gap-1 text-xs text-secondary-500 dark:text-secondary-500">
                      <ClockIcon className="h-3.5 w-3.5" />
                      Updated {new Date(review.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-3 bg-white/30 backdrop-blur-sm dark:bg-gray-900/30 border-t border-white/20 dark:border-gray-700/30">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300">
                      Read Full Review →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 transition-all"
          >
            View All Reviews
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}