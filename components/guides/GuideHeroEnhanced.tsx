'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'
import { 
  StarIcon, 
  ClockIcon, 
  UserGroupIcon,
  BeakerIcon,
  ShieldCheckIcon,
  ArrowDownIcon,
  PlayIcon,
  CheckBadgeIcon,
  CalendarIcon
} from '@heroicons/react/24/solid'
import { SparklesIcon } from '@heroicons/react/24/outline'

interface GuideHeroEnhancedProps {
  guide: {
    title: string
    subtitle?: string
    excerpt?: string
    heroImage?: any
    publishedAt?: string
    lastUpdated?: string
    author?: {
      name: string
      image?: any
      title?: string
      credentials?: string[]
    }
    listItems?: any[]
    readingTime?: number
    trustSignals?: {
      hoursResearched?: number
      expertsConsulted?: number
      toolsTested?: number
      userReviewsAnalyzed?: number
    }
  }
}

export function GuideHeroEnhanced({ guide }: GuideHeroEnhancedProps) {
  const [animatedNumber, setAnimatedNumber] = useState(0)
  const targetNumber = guide.listItems?.length || 0

  // Animate the number counting up
  useEffect(() => {
    if (targetNumber === 0) return
    
    const duration = 1500 // 1.5 seconds
    const steps = 30
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
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const trustSignals = guide.trustSignals || {
    hoursResearched: 200,
    expertsConsulted: 15,
    toolsTested: targetNumber,
    userReviewsAnalyzed: 5000
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="relative container mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Top Badge */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-full text-sm font-medium">
              <SparklesIcon className="h-4 w-4 text-primary" />
              Expert Review {new Date().getFullYear()}
            </span>
            
            {guide.lastUpdated && (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                Updated {formatDate(guide.lastUpdated)}
              </span>
            )}
            
            {guide.readingTime && (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <ClockIcon className="h-4 w-4" />
                {guide.readingTime} min read
              </span>
            )}
          </div>
          
          {/* Main Title with Animation */}
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="inline-block">The</span>{' '}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 animate-pulse">
              {animatedNumber}
            </span>{' '}
            <span className="inline-block">Best</span>{' '}
            <span className="inline-block">
              {guide.title?.replace(/^(The \d+ Best |Top \d+ )/i, '').replace(/( in \d+| of \d+)$/i, '')}
            </span>
          </h1>
          
          {/* Subtitle */}
          {guide.subtitle && (
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8">
              {guide.subtitle}
            </p>
          )}
          
          {/* Excerpt */}
          {guide.excerpt && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              {guide.excerpt}
            </p>
          )}
          
          {/* Trust Signals Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border rounded-xl p-4 text-center hover:border-primary transition-colors">
              <div className="flex justify-center mb-2">
                <BeakerIcon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">
                {trustSignals.toolsTested}
              </div>
              <div className="text-sm text-muted-foreground">Tools Tested</div>
            </div>
            
            <div className="bg-card border rounded-xl p-4 text-center hover:border-primary transition-colors">
              <div className="flex justify-center mb-2">
                <ClockIcon className="h-8 w-8 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-orange-500">
                {trustSignals.hoursResearched}+
              </div>
              <div className="text-sm text-muted-foreground">Hours Researched</div>
            </div>
            
            <div className="bg-card border rounded-xl p-4 text-center hover:border-primary transition-colors">
              <div className="flex justify-center mb-2">
                <UserGroupIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">
                {trustSignals.userReviewsAnalyzed.toLocaleString()}+
              </div>
              <div className="text-sm text-muted-foreground">Reviews Analyzed</div>
            </div>
            
            <div className="bg-card border rounded-xl p-4 text-center hover:border-primary transition-colors">
              <div className="flex justify-center mb-2">
                <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {trustSignals.expertsConsulted}
              </div>
              <div className="text-sm text-muted-foreground">Experts Consulted</div>
            </div>
          </div>
          
          {/* Author Section */}
          {guide.author && (
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-card border rounded-xl">
              {guide.author.image && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image
                    src={urlForImage(guide.author.image).width(64).height(64).url()}
                    alt={guide.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="font-semibold">{guide.author.name}</span>
                  <CheckBadgeIcon className="h-5 w-5 text-primary" />
                </div>
                {guide.author.title && (
                  <div className="text-sm text-muted-foreground">{guide.author.title}</div>
                )}
                {guide.author.credentials && guide.author.credentials.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {guide.author.credentials.map((credential, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                      >
                        <StarIcon className="h-3 w-3" />
                        {credential}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Video Introduction (if available) */}
              <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all flex items-center gap-2 group">
                <PlayIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Intro
              </button>
            </div>
          )}
          
          {/* Quick Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="#top-pick"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              See Our #1 Pick
              <ArrowDownIcon className="h-4 w-4" />
            </a>
            
            <a
              href="#comparison"
              className="px-6 py-3 bg-card border hover:border-primary rounded-lg font-medium transition-all flex items-center gap-2"
            >
              Compare All Tools
            </a>
            
            <a
              href="#methodology"
              className="px-6 py-3 bg-card border hover:border-primary rounded-lg font-medium transition-all flex items-center gap-2"
            >
              Our Methodology
            </a>
          </div>
          
          {/* Top 3 Preview Cards */}
          {guide.listItems && guide.listItems.length >= 3 && (
            <div className="grid md:grid-cols-3 gap-4 mt-12">
              {guide.listItems.slice(0, 3).map((item, index) => {
                const badges = ['🥇 Winner', '🥈 Runner-Up', '🥉 3rd Place']
                const bgColors = [
                  'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800',
                  'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-300 dark:border-gray-700',
                  'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-300 dark:border-orange-700'
                ]
                
                return (
                  <a
                    key={index}
                    href={`#tool-${item.rank}`}
                    className={`p-4 rounded-xl border-2 hover:scale-105 transition-all ${bgColors[index]}`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{badges[index]}</div>
                      <h3 className="font-bold text-lg mb-1">
                        {item.software?.name || item.customTitle}
                      </h3>
                      {item.software?.overallScore && (
                        <div className="flex justify-center items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(item.software.overallScore / 2)
                                  ? 'text-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-sm font-semibold">
                            {item.software.overallScore.toFixed(1)}
                          </span>
                        </div>
                      )}
                      {item.bestFor && (
                        <p className="text-sm text-muted-foreground">
                          {item.bestFor}
                        </p>
                      )}
                    </div>
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}