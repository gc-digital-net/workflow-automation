'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StarIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { urlFor } from '@/lib/sanity'

interface ReviewsClientProps {
  initialSoftware: any[]
  initialCategories: any[]
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  const percentage = (score / 10) * 100
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-600 dark:text-gray-400 w-20">{label}</span>
      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-900 dark:text-white w-8">{score}</span>
    </div>
  )
}

export default function ReviewsClient({ initialSoftware, initialCategories }: ReviewsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'score' | 'name' | 'recent'>('score')

  // Filter and sort software
  const filteredSoftware = useMemo(() => {
    let filtered = initialSoftware

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(software => 
        software.categories?.some((cat: any) => cat._id === selectedCategory)
      )
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(software =>
        software.name.toLowerCase().includes(query) ||
        software.tagline?.toLowerCase().includes(query) ||
        software.categories?.some((cat: any) => cat.name.toLowerCase().includes(query))
      )
    }

    // Sort
    switch (sortBy) {
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'recent':
        filtered = [...filtered].sort((a, b) => 
          new Date(b.lastUpdated || 0).getTime() - new Date(a.lastUpdated || 0).getTime()
        )
        break
      default: // score
        filtered = [...filtered].sort((a, b) => (b.overallScore || 0) - (a.overallScore || 0))
    }

    return filtered
  }, [initialSoftware, selectedCategory, searchQuery, sortBy])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 py-12 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Software Reviews & Ratings
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              In-depth analysis of {initialSoftware.length}+ business software tools. Compare features, pricing, and find your perfect match.
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search software by name or category..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            {/* Category Pills */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  All Software ({initialSoftware.length})
                </button>
                
                {initialCategories.filter(cat => cat.featured).map((category) => {
                  const count = initialSoftware.filter(s => 
                    s.categories?.some((c: any) => c._id === category._id)
                  ).length
                  
                  return (
                    <button
                      key={category._id}
                      onClick={() => setSelectedCategory(category._id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === category._id
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {category.name} ({count})
                    </button>
                  )
                })}
                
                {/* Dropdown for more categories */}
                <div className="relative">
                  <button className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-1">
                    More
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-sm"
                >
                  <option value="score">Highest Score</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="recent">Recently Updated</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== 'all' || searchQuery) && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm">
                    {initialCategories.find(c => c._id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory('all')}>
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery('')}>
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Software Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredSoftware.length === 0 ? (
            <div className="text-center py-12">
              <FunnelIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No software found matching your filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                }}
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredSoftware.length} software review{filteredSoftware.length !== 1 ? 's' : ''}
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredSoftware.map((software) => (
                  <Link
                    key={software._id}
                    href={`/reviews/${software.slug?.current || '#'}`}
                    className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {software.logo && (
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white dark:bg-gray-800 p-1.5">
                              <Image
                                src={urlFor(software.logo).url()}
                                alt={software.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                              {software.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {software.tagline || 'Business Software'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                          <StarIcon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                          <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                            {software.overallScore || 'N/A'}
                          </span>
                        </div>
                      </div>

                      {/* Categories */}
                      {software.categories && software.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {software.categories.slice(0, 3).map((cat: any) => (
                            <span
                              key={cat._id}
                              className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                            >
                              {cat.name}
                            </span>
                          ))}
                          {software.categories.length > 3 && (
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                              +{software.categories.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {software.excerpt || 'Comprehensive software solution for modern businesses.'}
                      </p>

                      {/* Quick Info */}
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>
                          {software.quickInfo?.startingPrice || 'Contact for pricing'}
                        </span>
                        <span className="text-primary-600 dark:text-primary-400 font-medium group-hover:underline">
                          Read Review →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}