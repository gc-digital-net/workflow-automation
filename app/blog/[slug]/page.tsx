import { Metadata } from 'next';
import Link from 'next/link';
import { getPostBySlug, getPosts } from '@/lib/sanity-queries';
import { urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { 
  ArticleImagePlaceholder, 
  AuthorAvatarPlaceholder,
  TableOfContents,
  RelatedPostCard,
  NewsletterCard,
  ReadingTimeBadge
} from '@/components/BlogPlaceholders';
import { 
  CalendarIcon, 
  ClockIcon, 
  ShareIcon,
  BookmarkIcon,
  ChevronLeftIcon,
  TagIcon,
  UserIcon,
  ChatBubbleLeftIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords?.join(', '),
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  const allPosts = await getPosts();
  const relatedPosts = allPosts.filter((p: any) => 
    p._id !== post?._id && 
    p.categories?.some((cat: string) => post?.categories?.includes(cat))
  ).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Mock table of contents sections
  const tocSections = [
    'Introduction',
    'Understanding the Basics',
    'Key Features and Benefits',
    'Implementation Steps',
    'Best Practices',
    'Common Challenges',
    'Real-World Examples',
    'Conclusion'
  ];

  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
      {/* Header Section */}
      <header className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 opacity-50"></div>
        
        <div className="relative py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm mb-8">
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  Home
                </Link>
                <span className="text-gray-400">/</span>
                <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  Blog
                </Link>
                <span className="text-gray-400">/</span>
                {post.categories && post.categories[0] && (
                  <>
                    <Link 
                      href={`/blog/category/${post.categories[0].toLowerCase().replace(/ /g, '-')}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {post.categories[0]}
                    </Link>
                    <span className="text-gray-400">/</span>
                  </>
                )}
                <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
                  {post.title}
                </span>
              </nav>

              {/* Category & Reading Time */}
              <div className="flex items-center gap-4 mb-6">
                {post.categories?.map((cat: string, i: number) => (
                  <span 
                    key={i}
                    className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium"
                  >
                    <TagIcon className="w-3 h-3 mr-1" />
                    {cat}
                  </span>
                ))}
                <ReadingTimeBadge time={Math.ceil(post.content?.length / 1000) || 5} />
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Author & Meta */}
              <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12">
                    {post.author?.avatar ? (
                      <img 
                        src={urlFor(post.author.avatar).width(48).height(48).url()} 
                        alt={post.author.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <AuthorAvatarPlaceholder name={post.author?.name || 'Author'} />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {post.author?.name || 'Anonymous'}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      </span>
                      {post.updatedAt && post.updatedAt !== post.publishedAt && (
                        <span className="text-xs">(Updated: {new Date(post.updatedAt).toLocaleDateString()})</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <ShareIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <BookmarkIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <HeartIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            {post.featuredImage ? (
              <img 
                src={urlFor(post.featuredImage).width(1200).height(600).url()} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <ArticleImagePlaceholder title={post.title} />
            )}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Sidebar - Table of Contents */}
            <aside className="lg:col-span-3">
              <div className="sticky top-24">
                <TableOfContents sections={tocSections} />
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <PortableText 
                  value={post.content}
                  components={{
                    types: {
                      image: ({value}: any) => (
                        <figure className="my-8">
                          <img 
                            src={urlFor(value).width(800).url()} 
                            alt={value.alt || ''}
                            className="rounded-xl shadow-lg w-full"
                          />
                          {value.caption && (
                            <figcaption className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
                              {value.caption}
                            </figcaption>
                          )}
                        </figure>
                      ),
                    },
                    block: {
                      h2: ({children}: any) => (
                        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
                          {children}
                        </h2>
                      ),
                      h3: ({children}: any) => (
                        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
                          {children}
                        </h3>
                      ),
                      normal: ({children}: any) => (
                        <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                          {children}
                        </p>
                      ),
                      blockquote: ({children}: any) => (
                        <blockquote className="border-l-4 border-primary-500 pl-6 my-8 text-gray-700 dark:text-gray-300 italic">
                          {children}
                        </blockquote>
                      ),
                    },
                  }}
                />
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags:</span>
                    {post.tags.map((tag: string, i: number) => (
                      <Link
                        key={i}
                        href={`/blog/tag/${tag.toLowerCase().replace(/ /g, '-')}`}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio */}
              {post.author?.bio && (
                <div className="mt-12 p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                    About the Author
                  </h3>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 flex-shrink-0">
                      {post.author.avatar ? (
                        <img 
                          src={urlFor(post.author.avatar).width(64).height(64).url()} 
                          alt={post.author.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <AuthorAvatarPlaceholder name={post.author.name} />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white mb-2">
                        {post.author.name}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {post.author.bio}
                      </p>
                      {post.author.social && (
                        <div className="flex items-center gap-3 mt-4">
                          {post.author.social.twitter && (
                            <a href={post.author.social.twitter} className="text-blue-500 hover:text-blue-600">
                              Twitter
                            </a>
                          )}
                          {post.author.social.linkedin && (
                            <a href={post.author.social.linkedin} className="text-blue-700 hover:text-blue-800">
                              LinkedIn
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                  <ChatBubbleLeftIcon className="w-6 h-6 mr-2" />
                  Comments
                </h3>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Comments are coming soon! Join our newsletter to get notified.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="lg:col-span-3 space-y-8">
              {/* Newsletter */}
              <NewsletterCard />

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relPost: any) => (
                      <RelatedPostCard
                        key={relPost._id}
                        title={relPost.title}
                        excerpt={relPost.excerpt}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Social Share */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  Share This Article
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium">
                    Twitter
                  </button>
                  <button className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-sm font-medium">
                    LinkedIn
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
                    WhatsApp
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 text-sm font-medium">
                    Copy Link
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Next/Previous Navigation */}
      <div className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                href="#"
                className="group bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <ChevronLeftIcon className="w-4 h-4" />
                  Previous Article
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  Getting Started with Workflow Automation
                </h4>
              </Link>
              <Link 
                href="#"
                className="group bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all text-right"
              >
                <div className="flex items-center justify-end gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Next Article
                  <ChevronLeftIcon className="w-4 h-4 rotate-180" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  Advanced Automation Techniques for Enterprise
                </h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}