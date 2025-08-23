'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ScaleIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

const popularComparisons = [
  { tools: ['ClickUp', 'Monday.com'], label: 'ClickUp vs Monday.com' },
  { tools: ['Zapier', 'Make'], label: 'Zapier vs Make' },
  { tools: ['Notion', 'Airtable'], label: 'Notion vs Airtable' },
  { tools: ['Asana', 'Trello'], label: 'Asana vs Trello' }
]

const comparisonData = {
  'ClickUp': {
    features: {
      'Project Management': true,
      'Time Tracking': true,
      'Docs & Wiki': true,
      'Goals & OKRs': true,
      'Native Automations': true,
      'Free Tier': true,
      'Mobile App': true,
      'API Access': true
    },
    pricing: 'From $5/user/mo',
    score: 9.2
  },
  'Monday.com': {
    features: {
      'Project Management': true,
      'Time Tracking': true,
      'Docs & Wiki': false,
      'Goals & OKRs': true,
      'Native Automations': true,
      'Free Tier': false,
      'Mobile App': true,
      'API Access': true
    },
    pricing: 'From $8/user/mo',
    score: 8.8
  }
}

export default function ComparisonTool() {
  const [selectedTools, setSelectedTools] = useState<string[]>(['ClickUp', 'Monday.com'])

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-secondary-50/50 to-white dark:from-secondary-950/50 dark:to-secondary-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl mb-4">
            <ScaleIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white sm:text-4xl">
            Quick Comparison Tool
          </h2>
          <p className="mt-4 text-lg text-secondary-600 dark:text-secondary-400">
            Compare features, pricing, and ratings side-by-side
          </p>
        </div>

        {/* Popular Comparisons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <span className="text-sm text-secondary-600 dark:text-secondary-400">Popular:</span>
          {popularComparisons.map((comparison) => (
            <button
              key={comparison.label}
              onClick={() => setSelectedTools(comparison.tools)}
              className="px-4 py-2 text-sm font-medium bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-lg ring-1 ring-secondary-200 dark:ring-secondary-700 hover:ring-primary-500 dark:hover:ring-primary-400 transition-all"
            >
              {comparison.label}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl bg-white dark:bg-secondary-800 shadow-xl ring-1 ring-secondary-200/50 dark:ring-secondary-700/50"
        >
          <div className="grid grid-cols-3">
            {/* Features Column */}
            <div className="border-r border-secondary-200 dark:border-secondary-700">
              <div className="bg-secondary-50 dark:bg-secondary-900/50 p-6">
                <h3 className="font-semibold text-secondary-900 dark:text-white">Features</h3>
              </div>
              <div className="p-6 space-y-4">
                {Object.keys(comparisonData.ClickUp.features).map((feature) => (
                  <div key={feature} className="text-sm text-secondary-600 dark:text-secondary-400">
                    {feature}
                  </div>
                ))}
                <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700">
                  <div className="text-sm font-semibold text-secondary-900 dark:text-white">Pricing</div>
                </div>
                <div className="pt-2">
                  <div className="text-sm font-semibold text-secondary-900 dark:text-white">Overall Score</div>
                </div>
              </div>
            </div>

            {/* Tool 1 Column */}
            <div className="border-r border-secondary-200 dark:border-secondary-700">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6">
                <h3 className="font-semibold text-white">{selectedTools[0]}</h3>
              </div>
              <div className="p-6 space-y-4">
                {Object.entries(comparisonData[selectedTools[0] as keyof typeof comparisonData].features).map(([feature, hasFeature]) => (
                  <div key={feature} className="flex justify-center">
                    {hasFeature ? (
                      <CheckIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <XMarkIcon className="h-5 w-5 text-secondary-300 dark:text-secondary-600" />
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700 text-center">
                  <div className="text-sm font-medium text-secondary-900 dark:text-white">
                    {comparisonData[selectedTools[0] as keyof typeof comparisonData].pricing}
                  </div>
                </div>
                <div className="pt-2 text-center">
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <span className="text-lg font-bold text-primary-700 dark:text-primary-300">
                      {comparisonData[selectedTools[0] as keyof typeof comparisonData].score}
                    </span>
                    <span className="text-xs text-primary-600 dark:text-primary-400">/10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tool 2 Column */}
            <div>
              <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6">
                <h3 className="font-semibold text-white">{selectedTools[1]}</h3>
              </div>
              <div className="p-6 space-y-4">
                {Object.entries(comparisonData[selectedTools[1] as keyof typeof comparisonData].features).map(([feature, hasFeature]) => (
                  <div key={feature} className="flex justify-center">
                    {hasFeature ? (
                      <CheckIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <XMarkIcon className="h-5 w-5 text-secondary-300 dark:text-secondary-600" />
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700 text-center">
                  <div className="text-sm font-medium text-secondary-900 dark:text-white">
                    {comparisonData[selectedTools[1] as keyof typeof comparisonData].pricing}
                  </div>
                </div>
                <div className="pt-2 text-center">
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                    <span className="text-lg font-bold text-cyan-700 dark:text-cyan-300">
                      {comparisonData[selectedTools[1] as keyof typeof comparisonData].score}
                    </span>
                    <span className="text-xs text-cyan-600 dark:text-cyan-400">/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-secondary-50 dark:bg-secondary-900/50 p-6 border-t border-secondary-200 dark:border-secondary-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Want to see a detailed comparison with more tools?
              </p>
              <Link
                href={`/reviews/compare?tools=${selectedTools.join(',')}`}
                className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-all"
              >
                View Full Comparison
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}