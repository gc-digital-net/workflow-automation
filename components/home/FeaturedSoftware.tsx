'use client';

import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const featuredSoftware = [
  {
    id: 1,
    name: 'ClickUp',
    tagline: 'One app to replace them all',
    score: 9.2,
    rating: 4.7,
    price: 'From $5/user/mo',
    features: ['Project Management', 'Time Tracking', 'Docs & Wiki', 'Goals & OKRs'],
    integrations: 1000,
    pros: ['Highly customizable', 'Great value for money', 'All-in-one solution'],
    slug: 'clickup',
  },
  {
    id: 2,
    name: 'Zapier',
    tagline: 'Automate your work',
    score: 9.0,
    rating: 4.5,
    price: 'From $19.99/mo',
    features: ['5000+ App Integrations', 'Multi-step Zaps', 'Filters & Formatters', 'Team Collaboration'],
    integrations: 5000,
    pros: ['Massive app library', 'No-code automation', 'Reliable workflows'],
    slug: 'zapier',
  },
  {
    id: 3,
    name: 'Monday.com',
    tagline: 'Work OS for teams',
    score: 8.8,
    rating: 4.6,
    price: 'From $8/user/mo',
    features: ['Visual Boards', 'Automations', 'Time Tracking', 'Resource Management'],
    integrations: 200,
    pros: ['Intuitive interface', 'Flexible workflows', 'Great for teams'],
    slug: 'monday-com',
  },
  {
    id: 4,
    name: 'Notion',
    tagline: 'All-in-one workspace',
    score: 8.9,
    rating: 4.7,
    price: 'From $8/user/mo',
    features: ['Notes & Docs', 'Databases', 'Kanban Boards', 'Calendar'],
    integrations: 50,
    pros: ['Extremely flexible', 'Great for documentation', 'Clean interface'],
    slug: 'notion',
  },
  {
    id: 5,
    name: 'Asana',
    tagline: 'Manage team projects',
    score: 8.7,
    rating: 4.4,
    price: 'From $10.99/user/mo',
    features: ['Task Management', 'Timeline View', 'Portfolios', 'Workload Management'],
    integrations: 200,
    pros: ['User-friendly', 'Strong mobile app', 'Good for large teams'],
    slug: 'asana',
  },
  {
    id: 6,
    name: 'Airtable',
    tagline: 'Database meets spreadsheet',
    score: 8.6,
    rating: 4.5,
    price: 'From $10/user/mo',
    features: ['Database Views', 'Automations', 'Forms', 'API Access'],
    integrations: 1000,
    pros: ['Powerful database', 'Beautiful interface', 'Great templates'],
    slug: 'airtable',
  },
];

export default function FeaturedSoftware() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Top Automation Software
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Carefully reviewed and rated based on our 15-step framework
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredSoftware.map((software, index) => (
            <motion.div
              key={software.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {software.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {software.tagline}
                  </p>
                </div>
                <div className="ml-4 flex flex-col items-end">
                  <div className="rounded-lg bg-primary-100 px-2 py-1 text-lg font-bold text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                    {software.score}
                  </div>
                  <div className="mt-1 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(software.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {software.price}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {software.integrations}+ integrations
                </p>
              </div>
              
              <div className="mt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Key Features
                </h4>
                <ul className="mt-2 space-y-1">
                  {software.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="text-sm text-gray-600 dark:text-gray-300">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <Link
                  href={`/reviews/${software.slug}`}
                  className="text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Read Full Review →
                </Link>
                <Link
                  href={`/reviews/compare?tools=${software.slug}`}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Compare
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center rounded-md border border-primary-600 bg-white px-6 py-3 text-base font-medium text-primary-600 shadow-sm hover:bg-primary-50 dark:border-primary-400 dark:bg-gray-800 dark:text-primary-400 dark:hover:bg-gray-700"
          >
            View All Software Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}