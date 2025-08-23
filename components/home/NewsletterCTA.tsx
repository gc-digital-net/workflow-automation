'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { EnvelopeIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { GradientOrb, GradientText } from '@/components/ui/GradientEffects'

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
    <section className="relative py-24 overflow-hidden">
      {/* Multi-layer gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-cyan-600 to-indigo-700" />
      
      {/* Animated gradient orbs for depth */}
      <GradientOrb size="lg" color="primary" className="top-10 right-10 opacity-30" animate />
      <GradientOrb size="md" color="cyan" className="bottom-10 left-10 opacity-30" />
      <GradientOrb size="xl" color="mixed" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" animate />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Glossy Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 glass-effect rounded-2xl mb-6 border border-white/20">
            <EnvelopeIcon className="h-8 w-8 text-white" />
          </div>

          {/* Heading with gradient */}
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Stay Ahead of the <GradientText gradient="from-cyan-300 to-indigo-300">Automation Curve</GradientText>
          </h2>
          
          {/* Subheading */}
          <p className="text-xl text-white/90 mb-8">
            Get weekly insights on the latest automation tools, exclusive deals, and expert tips delivered to your inbox
          </p>

          {/* Benefits */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="flex items-center justify-center gap-2 text-white/90">
              <CheckCircleIcon className="h-5 w-5 text-green-400" />
              <span>Weekly Tool Reviews</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/90">
              <CheckCircleIcon className="h-5 w-5 text-green-400" />
              <span>Exclusive Discounts</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/90">
              <CheckCircleIcon className="h-5 w-5 text-green-400" />
              <span>Implementation Guides</span>
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
                className="flex-1 px-5 py-4 rounded-xl text-secondary-900 placeholder-secondary-400 focus:outline-none focus:ring-4 focus:ring-white/30"
                disabled={status === 'loading' || status === 'success'}
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-secondary-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          <p className="mt-4 text-sm text-white/70">
            No spam, ever. Unsubscribe anytime. Read our{' '}
            <a href="/privacy" className="underline hover:text-white">
              Privacy Policy
            </a>
          </p>

          {/* Subscriber Count */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <SparklesIcon className="h-5 w-5 text-yellow-400" />
            <span className="text-white/90">
              Join <strong className="text-white">10,247</strong> automation enthusiasts
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}