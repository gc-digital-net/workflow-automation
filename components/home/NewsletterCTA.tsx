'use client'

import { useState } from 'react'
import { EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { SparklesIcon } from '@heroicons/react/24/solid'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 md:p-12">
            <div className="text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-xl mb-6">
                <EnvelopeIcon className="h-7 w-7 text-primary-600 dark:text-primary-400" />
              </div>

              {/* Heading */}
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Get Weekly Automation Insights
              </h2>
              
              {/* Subheading */}
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Join 10,000+ professionals receiving our expert reviews and exclusive software deals
              </p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Weekly Tool Reviews</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Exclusive Discounts</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Implementation Guides</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-5 py-4 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    disabled={status === 'loading' || status === 'success'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' && (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Subscribing...
                  </>
                )}
                {status === 'success' && (
                  <>
                    <CheckCircleIcon className="h-5 w-5" />
                    Subscribed!
                  </>
                )}
                {status === 'idle' && 'Get Started'}
                {status === 'error' && 'Try Again'}
              </button>
            </div>
          </form>

              {/* Privacy Note */}
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                No spam, ever. Unsubscribe anytime. Read our{' '}
                <a href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Privacy Policy
                </a>
              </p>

              {/* Subscriber Count */}
              <div className="mt-8 flex items-center justify-center gap-2">
                <SparklesIcon className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  Join <strong className="text-gray-900 dark:text-white">10,247</strong> automation enthusiasts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}