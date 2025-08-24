import { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/sanity-queries';
import { urlFor } from '@/lib/sanity';
import { 
  CalendarIcon, 
  ClockIcon,
  ArrowRightIcon,
  SparklesIcon,
  BookOpenIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export const metadata: Metadata = {
  title: 'Blog | Workflow Automation Insights & Guides',
  description: 'Expert insights, in-depth guides, and practical tips on workflow automation, business process management, and productivity tools.',
};

export default async function BlogPage() {
  const posts = await getPosts();
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 13);

  // Helper function to get initials for avatar placeholder
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper function to estimate reading time
  const getReadingTime = (content: any[]) => {
    if (!content) return 5;
    const wordsPerMinute = 200;
    const wordCount = content.length * 50; // Rough estimate
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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
            <div className="max-w-xl mx-auto relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium whitespace-nowrap">
                All Posts
              </button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 whitespace-nowrap">
                Automation
              </button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 whitespace-nowrap">
                Productivity
              </button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 whitespace-nowrap">
                Reviews
              </button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 whitespace-nowrap">
                Guides
              </button>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <BookOpenIcon className="w-4 h-4" />
              {posts.length} Articles
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Article</h2>
              <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <Link href={`/blog/${featuredPost.slug.current}`} className="block">
                  <div className="relative h-[400px]">
                    {featuredPost.featuredImage ? (
                      <img 
                        src={urlFor(featuredPost.featuredImage).width(1200).height(400).url()} 
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                        <BookOpenIcon className="w-24 h-24 text-white/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      {featuredPost.categories && featuredPost.categories[0] && (
                        <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full mb-4">
                          {featuredPost.categories[0]}
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

          {/* Recent Posts Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Articles</h2>
              <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">
                <option>Most Recent</option>
                <option>Most Popular</option>
                <option>Most Commented</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post: any) => (
                <article key={post._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <Link href={`/blog/${post.slug.current}`}>
                    <div className="relative h-48">
                      {post.featuredImage ? (
                        <img 
                          src={urlFor(post.featuredImage).width(400).height(200).url()} 
                          alt={post.title}
                          className="w-full h-full object-cover rounded-t-xl"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-t-xl flex items-center justify-center">
                          <BookOpenIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                        </div>
                      )}
                      {post.categories && post.categories[0] && (
                        <div className="absolute top-4 left-4">
                          <span className="px-2 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-xs font-medium text-gray-700 dark:text-gray-300 rounded">
                            {post.categories[0]}
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
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium inline-flex items-center gap-2 transition-colors">
                Load More Articles
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
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
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:bg-white/20"
              />
              <button className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}