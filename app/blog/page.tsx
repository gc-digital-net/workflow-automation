import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, ClockIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';
import { getPosts, getCategories } from '@/sanity/lib/fetch';
import { urlFor } from '@/sanity/lib/client';

export const metadata: Metadata = {
  title: 'Blog | Workflow Automation Insights',
  description: 'Expert insights, guides, and tips on workflow automation, business process management, and productivity tools.',
};

export default async function BlogPage() {
  // Fetch posts from Sanity
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ]);

  // Format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Workflow Automation Blog
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Expert insights, guides, and tips to help you automate and optimize your business processes
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <main className="lg:col-span-8">
            {posts && posts.length > 0 ? (
              <div className="space-y-12">
                {posts.map((post: any) => (
                  <article key={post._id} className="group">
                    <Link href={`/blog/${post.slug.current}`}>
                      <div className="overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800 transition-transform group-hover:scale-[1.02]">
                        {post.featuredImage && (
                          <div className="aspect-w-16 aspect-h-9 relative h-64 w-full">
                            <Image
                              src={urlFor(post.featuredImage).width(800).height(450).url()}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </Link>
                    
                    <div className="mt-6">
                      {/* Categories */}
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories.map((category: any) => (
                            <Link
                              key={category.slug.current}
                              href={`/blog/category/${category.slug.current}`}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      )}

                      <Link href={`/blog/${post.slug.current}`} className="group">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {post.title}
                        </h2>
                      </Link>
                      
                      <p className="mt-3 text-gray-600 dark:text-gray-400 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      {/* Meta */}
                      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        {post.author && (
                          <div className="flex items-center gap-2">
                            {post.author.avatar && (
                              <Image
                                src={urlFor(post.author.avatar).width(32).height(32).url()}
                                alt={post.author.name}
                                width={32}
                                height={32}
                                className="rounded-full"
                              />
                            )}
                            <span>{post.author.name}</span>
                          </div>
                        )}
                        
                        {post.publishedAt && (
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                        )}
                        
                        {post.readingTime && (
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-4 w-4" />
                            <span>{post.readingTime} min read</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No blog posts available yet.</p>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              {categories && categories.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category: any) => (
                      <Link
                        key={category._id}
                        href={`/blog/category/${category.slug.current}`}
                        className="flex items-center justify-between py-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        <span>{category.name}</span>
                        <TagIcon className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter */}
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Subscribe to our Newsletter
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Get the latest automation tips and guides delivered to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Popular Tags */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Popular Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Automation', 'ROI', 'Strategy', 'Tools', 'Integration', 'AI'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}