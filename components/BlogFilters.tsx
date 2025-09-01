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
    const categoryMap = new Map<string, { name: string; count: number }>();
    
    posts.forEach(post => {
      if (post.categories && Array.isArray(post.categories)) {
        post.categories.forEach((cat: any) => {
          if (cat && cat.name) {
            const existing = categoryMap.get(cat.name);
            if (existing) {
              categoryMap.set(cat.name, { ...existing, count: existing.count + 1 });
            } else {
              categoryMap.set(cat.name, { name: cat.name, count: 1 });
            }
          }
        });
      }
    });
    
    // Convert to array, sort by count (descending), then alphabetically
    const sortedCategories = Array.from(categoryMap.values())
      .sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.name.localeCompare(b.name);
      });
    
    return [{ name: 'All Posts', count: posts.length }, ...sortedCategories];
  }, [posts]);
  
  const handleCategoryChange = (categoryName: string) => {
    setActiveCategory(categoryName);
    
    if (categoryName === 'All Posts') {
      onFilterChange(posts);
    } else {
      const filtered = posts.filter(post => 
        post.categories?.some((cat: any) => 
          cat.name === categoryName
        )
      );
      onFilterChange(filtered);
    }
  };

  // Show message if no categories
  if (categories.length <= 1) {
    return (
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <BookOpenIcon className="w-4 h-4" />
            {totalCount} {totalCount === 1 ? 'Article' : 'Articles'}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-6 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          {/* Article count for mobile */}
          <div className="flex md:hidden items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <BookOpenIcon className="w-4 h-4" />
            {totalCount} {totalCount === 1 ? 'Article' : 'Articles'}
          </div>
          
          {/* Category filters with scroll on mobile */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 justify-start sm:justify-center sm:flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                    whitespace-nowrap flex items-center gap-2
                    ${activeCategory === category.name
                      ? 'bg-primary-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105'
                    }
                  `}
                >
                  <span>{category.name}</span>
                  {category.count > 0 && (
                    <span className={`
                      text-xs px-1.5 py-0.5 rounded-full
                      ${activeCategory === category.name
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }
                    `}>
                      {category.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Article count for desktop */}
          <div className="hidden md:flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <BookOpenIcon className="w-4 h-4" />
            <span>
              {totalCount} {totalCount === 1 ? 'Article' : 'Articles'}
              {activeCategory !== 'All Posts' && ` in ${activeCategory}`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}