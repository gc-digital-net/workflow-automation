import { Metadata } from 'next';
import Link from 'next/link';
import { getPostBySlug, getPosts } from '@/lib/sanity-queries';
import { urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-blue-600 hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <header className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/blog"
              className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
            >
              ← Back to Blog
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              {post.author?.avatar && (
                <img 
                  src={urlFor(post.author.avatar).width(40).height(40).url()} 
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <div>
                <div className="font-semibold">{post.author?.name}</div>
                <div className="text-sm">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  {post.categories && post.categories.length > 0 && (
                    <span> • {post.categories.join(', ')}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <img 
              src={urlFor(post.featuredImage).width(1200).height(600).url()} 
              alt={post.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <PortableText 
              value={post.content}
              components={{
                types: {
                  image: ({value}: any) => (
                    <img 
                      src={urlFor(value).width(800).url()} 
                      alt={value.alt || ''}
                      className="rounded-lg my-8"
                    />
                  ),
                },
              }}
            />
          </div>

          {/* Author Bio */}
          {post.author?.bio && (
            <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                About the Author
              </h3>
              <div className="flex items-start">
                {post.author.avatar && (
                  <img 
                    src={urlFor(post.author.avatar).width(60).height(60).url()} 
                    alt={post.author.name}
                    className="w-14 h-14 rounded-full mr-4"
                  />
                )}
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">
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
    </article>
  );
}