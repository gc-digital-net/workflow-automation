import { Metadata } from 'next';
import Link from 'next/link';
import { getPostBySlug, getPosts } from '@/lib/sanity-queries';
import { urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { 
  CalendarIcon, 
  ClockIcon, 
  ShareIcon,
  BookmarkIcon,
  ChevronLeftIcon,
  TagIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

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
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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

  const currentIndex = allPosts.findIndex((p: any) => p._id === post._id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <article className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6">
              <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                Blog
              </Link>
              {post.categories && post.categories[0] && (
                <>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {post.categories[0]}
                  </span>
                </>
              )}
            </nav>

            {/* Categories & Reading Time */}
            <div className="flex items-center gap-3 mb-4">
              {post.categories?.map((cat: string, i: number) => (
                <span 
                  key={i}
                  className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium"
                >
                  <TagIcon className="w-3 h-3 mr-1" />
                  {cat}
                </span>
              ))}
              <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <ClockIcon className="w-3 h-3" />
                {getReadingTime(post.content)} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                {post.excerpt}
              </p>
            )}

            {/* Author & Meta */}
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                    {getInitials(post.author?.name || post.author || 'Anonymous')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {post.author?.name || post.author || 'Anonymous'}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
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
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-5xl mx-auto">
            <img 
              src={urlFor(post.featuredImage).width(1200).height(600).url()} 
              alt={post.title}
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
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
                        className="rounded-lg shadow-md w-full"
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
                    <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
                      {children}
                    </h2>
                  ),
                  h3: ({children}: any) => (
                    <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">
                      {children}
                    </h3>
                  ),
                  normal: ({children}: any) => (
                    <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                      {children}
                    </p>
                  ),
                  blockquote: ({children}: any) => (
                    <blockquote className="border-l-4 border-primary-500 pl-6 my-6 text-gray-700 dark:text-gray-300 italic">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({children}: any) => (
                    <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
                  ),
                  em: ({children}: any) => (
                    <em className="italic">{children}</em>
                  ),
                  code: ({children}: any) => (
                    <code className="bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400 px-2 py-1 rounded text-sm">
                      {children}
                    </code>
                  ),
                },
              }}
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
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
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                About the Author
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                    {getInitials(post.author.name)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white mb-2">
                    {post.author.name}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {post.author.bio}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-800 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relPost: any) => (
                  <article key={relPost._id} className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <Link href={`/blog/${relPost.slug.current}`}>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          {relPost.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                          {relPost.excerpt}
                        </p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <div className="border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {prevPost && (
                <Link 
                  href={`/blog/${prevPost.slug.current}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Previous Article
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {prevPost.title}
                  </h4>
                </Link>
              )}
              {nextPost && (
                <Link 
                  href={`/blog/${nextPost.slug.current}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all text-right"
                >
                  <div className="flex items-center justify-end gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Next Article
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {nextPost.title}
                  </h4>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-purple-600 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Don't Miss Our Latest Content
            </h3>
            <p className="text-white/90 mb-6">
              Subscribe to get automation tips and insights delivered to your inbox
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
      </section>
    </article>
  );
}