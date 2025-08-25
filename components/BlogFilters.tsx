'use client';

import { useState, useMemo } from 'react';
import { BookOpenIcon } from '@heroicons/react/24/outline';

interface BlogFiltersProps {
  posts: any[];
  onFilterChange: (filtered: any[]) => void;
  totalCount: number;
}

export function BlogFilters({ posts, onFilterChange, totalCount }: BlogFiltersProps) {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  
  // Dynamically extract unique categories from posts
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    posts.forEach(post => {
      if (post.categories && Array.isArray(post.categories)) {
        post.categories.forEach((cat: string) => {
          if (cat) categorySet.add(cat);
        });
      }
    });
    // Convert to array, sort alphabetically, and add 'All Posts' at the beginning
    return ['All Posts', ...Array.from(categorySet).sort()];
  }, [posts]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'All Posts') {
      onFilterChange(posts);
    } else {
      const filtered = posts.filter(post => 
        post.categories?.some((cat: string) => 
          cat === category
        )
      );
      onFilterChange(filtered);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          {/* Article count for mobile */}
          <div className="flex md:hidden items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <BookOpenIcon className="w-4 h-4" />
            {totalCount} Articles
          </div>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Article count for desktop */}
          <div className="hidden md:flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <BookOpenIcon className="w-4 h-4" />
            {totalCount} Articles
          </div>
        </div>
      </div>
    </section>
  );
}