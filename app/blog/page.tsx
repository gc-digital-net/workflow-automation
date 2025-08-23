import { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/sanity-queries';
import { urlFor } from '@/lib/sanity';
import { 
  ArticleImagePlaceholder, 
  CategoryBadge, 
  ReadingTimeBadge,
  PopularPostCard,
  NewsletterCard,
  AuthorAvatarPlaceholder
} from '@/components/BlogPlaceholders';
import { 
  CalendarIcon, 
  UserIcon, 
  ArrowRightIcon,
  SparklesIcon,
  FireIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export const metadata: Metadata = {
  title: 'Blog | Workflow Automation Insights & Guides',
  description: 'Expert insights, in-depth guides, and practical tips on workflow automation, business process management, and productivity tools.',
};

export default async function BlogPage() {
  const posts = await getPosts();
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 opacity-50"></div>
        <div className="relative py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium mb-4">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Workflow Automation Insights
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Knowledge Hub
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Deep dives into automation strategies, software reviews, and practical guides to transform your business processes
              </p>
              
              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles, guides, and reviews..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-x-auto">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium whitespace-nowrap">
                All Posts
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap border border-gray-200 dark:border-gray-700">
                Automation
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap border border-gray-200 dark:border-gray-700">
                Reviews
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap border border-gray-200 dark:border-gray-700">
                Guides
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap border border-gray-200 dark:border-gray-700">
                Case Studies
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
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <main className="lg:col-span-8">
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <FireIcon className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
                    Featured Article
                  </span>
                </div>
                <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all">
                  <Link href={`/blog/${featuredPost.slug.current}`} className="block">
                    <div className="relative h-96 overflow-hidden">
                      {featuredPost.featuredImage ? (
                        <img 
                          src={urlFor(featuredPost.featuredImage).width(1200).height(600).url()} 
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <ArticleImagePlaceholder title={featuredPost.title} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <div className="flex items-center gap-4 mb-3">
                          {featuredPost.categories?.map((cat: string, i: number) => (
                            <CategoryBadge key={i} category={cat} color="primary" />
                          ))}
                          <ReadingTimeBadge time={7} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">
                          {featuredPost.title}
                        </h2>
                        <p className="text-lg opacity-90 line-clamp-2">
                          {featuredPost.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="p-6 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10">
                          <AuthorAvatarPlaceholder name={featuredPost.author} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {featuredPost.author}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
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
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Articles</h2>
                <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">
                  <option>Most Recent</option>
                  <option>Most Popular</option>
                  <option>Most Commented</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {recentPosts.map((post: any) => (
                  <article key={post._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all">
                    <Link href={`/blog/${post.slug.current}`}>
                      <div className="relative h-48 overflow-hidden">
                        {post.featuredImage ? (
                          <img 
                            src={urlFor(post.featuredImage).width(600).height(400).url()} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <ArticleImagePlaceholder title={post.title} />
                        )}
                        {post.categories && post.categories[0] && (
                          <div className="absolute top-4 left-4">
                            <CategoryBadge category={post.categories[0]} />
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span>•</span>
                        <ReadingTimeBadge time={5} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        <Link 
                          href={`/blog/${post.slug.current}`}
                          className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6">
                            <AuthorAvatarPlaceholder name={post.author} />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {post.author}
                          </span>
                        </div>
                        <Link 
                          href={`/blog/${post.slug.current}`}
                          className="text-primary-600 dark:text-primary-400 font-medium hover:underline text-sm"
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center pt-8">
                <button className="px-8 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium inline-flex items-center gap-2">
                  Load More Articles
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </main>

          {/* Enhanced Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Newsletter */}
            <NewsletterCard />

            {/* Popular Posts */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <FireIcon className="w-5 h-5 mr-2 text-orange-500" />
                Trending This Week
              </h3>
              <div className="space-y-4">
                <PopularPostCard title="10 Ways to Automate Your Marketing Workflow" index={1} />
                <PopularPostCard title="Complete Guide to Zapier Integrations" index={2} />
                <PopularPostCard title="Monday.com vs Asana: Which is Better?" index={3} />
                <PopularPostCard title="How AI is Transforming Business Automation" index={4} />
                <PopularPostCard title="Building Your First No-Code Automation" index={5} />
              </div>
            </div>

            {/* Topics */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Browse Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Automation', 'AI Tools', 'Productivity', 'No-Code', 'Integration', 'CRM', 'Project Management', 'Marketing', 'Sales', 'Analytics'].map((topic) => (
                  <Link
                    key={topic}
                    href={`/blog/topic/${topic.toLowerCase()}`}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </div>

            {/* Archives */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Archives
              </h3>
              <ul className="space-y-2">
                {['December 2024', 'November 2024', 'October 2024', 'September 2024'].map((month) => (
                  <li key={month}>
                    <Link 
                      href={`/blog/archive/${month.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center justify-between group"
                    >
                      <span>{month}</span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30">
                        12
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}