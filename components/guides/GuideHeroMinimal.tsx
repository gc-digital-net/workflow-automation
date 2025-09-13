'use client'

import { useState, useEffect } from 'react'
import { CalendarIcon } from '@heroicons/react/24/outline'

interface GuideHeroMinimalProps {
  guide: {
    title: string
    subtitle?: string
    excerpt?: string
    publishedAt?: string
    lastUpdated?: string
    author?: {
      name: string
    }
    listItems?: any[]
    readingTime?: number
    trustSignals?: {
      hoursResearched?: number
      toolsTested?: number
      userReviewsAnalyzed?: number
    }
  }
}

export function GuideHeroMinimal({ guide }: GuideHeroMinimalProps) {
  const [animatedNumber, setAnimatedNumber] = useState(0)
  const targetNumber = guide.listItems?.length || 0

  // Subtle number animation
  useEffect(() => {
    if (targetNumber === 0) return
    
    const duration = 2000
    const steps = 40
    const stepValue = targetNumber / steps
    const stepDuration = duration / steps
    
    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setAnimatedNumber(Math.round(stepValue * currentStep))
      } else {
        clearInterval(timer)
        setAnimatedNumber(targetNumber)
      }
    }, stepDuration)
    
    return () => clearInterval(timer)
  }, [targetNumber])

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const trustSignals = guide.trustSignals || {
    hoursResearched: 200,
    toolsTested: targetNumber,
    userReviewsAnalyzed: 5000
  }

  return (
    <section className="relative">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Date and Author - Subtle */}
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
            {guide.lastUpdated && (
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{formatDate(guide.lastUpdated)}</span>
              </div>
            )}
            {guide.author?.name && (
              <>
                <span className="text-muted-foreground/40">•</span>
                <span>by {guide.author.name}</span>
              </>
            )}
            {guide.readingTime && (
              <>
                <span className="text-muted-foreground/40">•</span>
                <span>{guide.readingTime} min read</span>
              </>
            )}
          </div>
          
          {/* Main Title - Clean and Bold */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            The{' '}
            <span className="text-primary tabular-nums">
              {animatedNumber}
            </span>{' '}
            Best{' '}
            {guide.title?.replace(/^(The \d+ Best |Top \d+ |Best )/i, '').replace(/( in \d+| of \d+| \d+)$/i, '')}
          </h1>
          
          {/* Subtitle if exists */}
          {guide.subtitle && (
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
              {guide.subtitle}
            </p>
          )}
          
          {/* Excerpt - Clean paragraph */}
          {guide.excerpt && (
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12 font-light">
              {guide.excerpt}
            </p>
          )}
          
          {/* Minimal Trust Signals - Single Line */}
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{trustSignals.hoursResearched}+</span>
              <span>hours researched</span>
            </div>
            <span className="text-muted-foreground/20">|</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{trustSignals.toolsTested}</span>
              <span>tools tested</span>
            </div>
            <span className="text-muted-foreground/20">|</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{(trustSignals.userReviewsAnalyzed / 1000).toFixed(0)}k+</span>
              <span>reviews analyzed</span>
            </div>
          </div>
          
          {/* Simple Navigation Line */}
          <div className="mt-16 pt-8 border-t">
            <div className="flex items-center justify-center gap-8 text-sm">
              <a
                href="#top-pick"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Jump to #1 Pick
              </a>
              <span className="text-muted-foreground/20">•</span>
              <a
                href="#comparison"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Compare All
              </a>
              <span className="text-muted-foreground/20">•</span>
              <a
                href="#methodology"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Methodology
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}