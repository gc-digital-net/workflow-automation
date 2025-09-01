'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { CalendarIcon, ClockIcon, ArrowRightIcon, BookOpenIcon } from '@heroicons/react/24/outline';

interface BlogGridProps {
  initialPosts: any[];
  featuredPost?: any;
}

export function BlogGrid({ initialPosts, featuredPost }: BlogGridProps) {
  const [displayedPosts, setDisplayedPosts] = useState(initialPosts.slice(0, 12));
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  const loadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const morePosts = initialPosts.slice(0, endIndex);
    setDisplayedPosts(morePosts);
    setCurrentPage(nextPage);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getReadingTime = (content: any[]) => {
    if (!content) return 5;
    const wordsPerMinute = 200;
    const wordCount = content.length * 50;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const hasMore = displayedPosts.length < initialPosts.length;

  return (
    <>
      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Article</h2>
          <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <Link href={`/blog/${featuredPost.slug.current}`} className="block">
              <div className="relative h-[400px]">
                {featuredPost.featuredImage ? (
                  <Image
                    src={urlFor(featuredPost.featuredImage).url()} 
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                    <BookOpenIcon className="w-24 h-24 text-white/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  {featuredPost.categories && featuredPost.categories[0] && (
                    <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full mb-4">
                      {typeof featuredPost.categories[0] === 'string' ? featuredPost.categories[0] : featuredPost.categories[0].name}
                    </span>
                  )}
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {featuredPost.title}
                  </h3>
                  <p className="text-white/90 text-lg line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                </div>
              </div>
            </Link>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                      {getInitials(featuredPost.author || 'Anonymous')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {featuredPost.author || 'Anonymous'}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        {getReadingTime(featuredPost.content)} min read
                      </span>
                    </div>
                  </div>
                </div>
                <Link 
                  href={`/blog/${featuredPost.slug.current}`}
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 gap-2 transition-all"
                >
                  Read Article
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* Posts Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Articles</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPosts.map((post: any) => (
            <article key={post._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Link href={`/blog/${post.slug.current}`}>
                <div className="relative h-48">
                  {post.featuredImage ? (
                    <Image
                      src={urlFor(post.featuredImage).url()} 
                      alt={post.title}
                      fill
                      className="object-cover rounded-t-xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-t-xl flex items-center justify-center">
                      <BookOpenIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                  {post.categories && post.categories[0] && (
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-xs font-medium text-gray-700 dark:text-gray-300 rounded">
                        {typeof post.categories[0] === 'string' ? post.categories[0] : post.categories[0].name}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <CalendarIcon className="w-3 h-3" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                  <span>•</span>
                  <ClockIcon className="w-3 h-3" />
                  {getReadingTime(post.content)} min
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  <Link 
                    href={`/blog/${post.slug.current}`}
                    className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {getInitials(post.author || 'Anonymous')}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {post.author || 'Anonymous'}
                    </span>
                  </div>
                  <Link 
                    href={`/blog/${post.slug.current}`}
                    className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-12">
            <button 
              onClick={loadMore}
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
            >
              Load More Articles
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}