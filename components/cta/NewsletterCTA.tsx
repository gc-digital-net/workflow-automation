'use client'

import { useState } from 'react'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

interface NewsletterCTAProps {
  title?: string
  description?: string
}

export function NewsletterCTA({ 
  title = 'Get Our Free Automation Guide',
  description = 'Join 10,000+ professionals and get our comprehensive guide to workflow automation.'
}: NewsletterCTAProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      
      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 rounded-lg p-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
          <EnvelopeIcon className="h-6 w-6 text-primary" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          
          {status === 'success' ? (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-md">
              ✓ Thanks for subscribing! Check your email for the guide.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2 border rounded-md bg-background"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Get Free Guide'}
              </button>
            </form>
          )}
          
          {status === 'error' && (
            <p className="mt-2 text-sm text-red-600">
              Something went wrong. Please try again.
            </p>
          )}
          
          <p className="mt-3 text-xs text-muted-foreground">
            No spam. Unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}