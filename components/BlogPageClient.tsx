'use client';

import { useState } from 'react';
import { BlogSearch } from './BlogSearch';
import { BlogFilters } from './BlogFilters';
import { BlogGrid } from './BlogGrid';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface BlogPageClientProps {
  posts: any[];
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const featuredPost = filteredPosts[0];
  const recentPosts = filteredPosts.slice(1);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-4">
              <SparklesIcon className="w-4 h-4 mr-2" />
              Workflow Automation Insights
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Knowledge Hub
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Deep dives into automation strategies, software reviews, and practical guides to transform your business processes
            </p>
            
            {/* Search Bar */}
            <BlogSearch posts={posts} />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <BlogFilters 
        posts={posts} 
        onFilterChange={setFilteredPosts}
        totalCount={filteredPosts.length}
      />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BlogGrid 
            initialPosts={recentPosts} 
            featuredPost={featuredPost}
          />

          {/* Newsletter CTA - Better design */}
          <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Stay Updated with Our Latest Insights
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Get weekly automation tips, software reviews, and exclusive content delivered to your inbox
            </p>
            <form className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}