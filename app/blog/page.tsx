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
  BookOpenIcon,
  ClockIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { GlossyCard, GradientText, GradientOrb } from '@/components/ui/GradientEffects';

export const metadata: Metadata = {
  title: 'Blog | Workflow Automation Insights & Guides',
  description: 'Expert insights, in-depth guides, and practical tips on workflow automation, business process management, and productivity tools.',
};

export default async function BlogPage() {
  const posts = await getPosts();
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 9);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900">
      {/* Hero Section with Glossy Effects */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-cyan-600/10 to-primary-600/10"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <GradientOrb size="xl" color="primary" className="absolute -top-20 -left-20" animate />
          <GradientOrb size="lg" color="cyan" className="absolute top-40 right-10" animate />
          <GradientOrb size="md" color="primary" className="absolute bottom-20 left-1/3" animate />
        </div>
        
        <div className="relative py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600/20 to-cyan-600/20 backdrop-blur-sm text-cyan-400 rounded-full text-sm font-medium mb-6 border border-cyan-500/20">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Workflow Automation Insights
              </div>
              <GradientText className="text-5xl md:text-7xl font-bold tracking-tight mb-6" gradient="from-white via-cyan-200 to-primary-200">
                Knowledge Hub
              </GradientText>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Deep dives into automation strategies, software reviews, and practical guides to transform your business processes
              </p>
              
              {/* Glossy Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-cyan-600/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles, guides, and reviews..."
                    className="w-full pl-12 pr-32 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-primary-600 to-cyan-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all font-medium">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Glossy Category Filter */}
      <section className="py-8 border-b border-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-x-auto">
              <button className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-cyan-600 text-white rounded-lg font-medium whitespace-nowrap shadow-lg shadow-cyan-500/25">
                All Posts
              </button>
              <button className="px-5 py-2.5 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-lg font-medium hover:bg-gray-700/50 whitespace-nowrap border border-gray-700/50 transition-all">
                Automation
              </button>
              <button className="px-5 py-2.5 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-lg font-medium hover:bg-gray-700/50 whitespace-nowrap border border-gray-700/50 transition-all">
                Reviews
              </button>
              <button className="px-5 py-2.5 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-lg font-medium hover:bg-gray-700/50 whitespace-nowrap border border-gray-700/50 transition-all">
                Guides
              </button>
              <button className="px-5 py-2.5 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-lg font-medium hover:bg-gray-700/50 whitespace-nowrap border border-gray-700/50 transition-all">
                Case Studies
              </button>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
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
                  <span className="text-sm font-semibold text-orange-400 uppercase tracking-wide">
                    Featured Article
                  </span>
                </div>
                <GlossyCard className="overflow-hidden group" gradient="from-primary-600/10 to-cyan-600/10">
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
                  <div className="p-6 border-t border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10">
                          <AuthorAvatarPlaceholder name={featuredPost.author} />
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {featuredPost.author}
                          </p>
                          <p className="text-sm text-gray-400">
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
                        className="inline-flex items-center text-cyan-400 font-semibold hover:gap-3 gap-2 transition-all"
                      >
                        Read Article
                        <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </GlossyCard>
              </div>
            )}

            {/* Recent Posts Grid */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Recent Articles</h2>
                <select className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-sm text-gray-300">
                  <option>Most Recent</option>
                  <option>Most Popular</option>
                  <option>Most Commented</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {recentPosts.map((post: any) => (
                  <GlossyCard key={post._id} className="overflow-hidden group h-full" gradient="from-primary-600/5 to-cyan-600/5">
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
                      <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
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
                          className="text-white hover:text-cyan-400 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-400 line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6">
                            <AuthorAvatarPlaceholder name={post.author} />
                          </div>
                          <span className="text-sm text-gray-400">
                            {post.author}
                          </span>
                        </div>
                        <Link 
                          href={`/blog/${post.slug.current}`}
                          className="text-cyan-400 font-medium hover:underline text-sm"
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  </GlossyCard>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center pt-8">
                <button className="px-8 py-3 bg-gradient-to-r from-primary-600 to-cyan-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all font-medium inline-flex items-center gap-2">
                  Load More Articles
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </main>

          {/* Enhanced Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Newsletter */}
            <div className="sticky top-24">
              <NewsletterCard />

              {/* Popular Posts */}
              <GlossyCard className="p-6 mt-8" gradient="from-primary-600/10 to-cyan-600/10">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center">
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
              </GlossyCard>

              {/* Topics */}
              <GlossyCard className="p-6 mt-8" gradient="from-cyan-600/10 to-primary-600/10">
                <h3 className="text-lg font-bold text-white mb-6">
                  Browse Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Automation', 'AI Tools', 'Productivity', 'No-Code', 'Integration', 'CRM', 'Project Management', 'Marketing', 'Sales', 'Analytics'].map((topic) => (
                    <Link
                      key={topic}
                      href={`/blog/topic/${topic.toLowerCase()}`}
                      className="px-3 py-1.5 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-lg text-sm hover:bg-primary-600/20 hover:text-cyan-400 border border-gray-700/50 transition-all"
                    >
                      {topic}
                    </Link>
                  ))}
                </div>
              </GlossyCard>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}