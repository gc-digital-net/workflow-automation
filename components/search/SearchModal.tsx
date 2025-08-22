'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { debounce } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'post' | 'review' | 'listicle' | 'page';
  url: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock search function - replace with actual search implementation
  const performSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      
      // Mock results - replace with actual API call
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: 'Complete Guide to Workflow Automation',
          description: 'Everything you need to know to get started with automation',
          type: 'post' as const,
          url: '/blog/complete-guide-workflow-automation',
        },
        {
          id: '2',
          title: 'Zapier Review',
          description: 'Comprehensive review of Zapier automation platform',
          type: 'review' as const,
          url: '/reviews/zapier',
        },
        {
          id: '3',
          title: 'Top 10 Project Management Tools',
          description: 'Best project management software for teams',
          type: 'listicle' as const,
          url: '/listicles/top-project-management-tools',
        },
      ].filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setResults(mockResults);
      setIsLoading(false);
    }, 300),
    []
  );

  useEffect(() => {
    performSearch(query);
  }, [query, performSearch]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleResultClick = (url: string) => {
    router.push(url);
    onClose();
  };

  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'post':
        return 'Blog Post';
      case 'review':
        return 'Software Review';
      case 'listicle':
        return 'Listicle';
      case 'page':
        return 'Page';
      default:
        return '';
    }
  };

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'post':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'review':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'listicle':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'page':
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
      default:
        return '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-start justify-center px-4 pt-20 pb-20">
        <div
          className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-xl transition-all">
          <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
            <div className="flex items-center">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for software, guides, or tools..."
                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                autoFocus
              />
              <button
                onClick={onClose}
                className="ml-3 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 mb-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 dark:border-blue-400"></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result.url)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium mr-2 ${getTypeColor(result.type)}`}>
                            {getTypeLabel(result.type)}
                          </span>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {result.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : query.trim() ? (
              <div className="p-8 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No results found for "{query}"
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  Try searching for software names, features, or guides
                </p>
              </div>
            ) : (
              <div className="p-8">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Zapier', 'Project Management', 'ROI Calculator', 'Workflow Builder', 'CRM Software'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mr-1">↵</kbd>
                  to select
                </span>
                <span className="flex items-center">
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mr-1">ESC</kbd>
                  to close
                </span>
              </div>
              <span>
                Powered by Workflow Automation
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}