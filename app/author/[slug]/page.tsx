import { groq } from 'next-sanity'
import { client } from '@/lib/sanity.client'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'

export const revalidate = 3600 // Revalidate every hour

const authorQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    bio,
    avatar,
    social {
      twitter,
      linkedin,
      website
    }
  }
`

const authorPostsQuery = groq`
  *[_type == "post" && author._ref == $authorId] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    categories[]-> {
      name,
      slug
    },
    readingTime
  }
`

export async function generateStaticParams() {
  const authors = await client.fetch(groq`
    *[_type == "author"] {
      slug
    }
  `)
  
  return authors.map((author: any) => ({
    slug: author.slug.current,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const author = await client.fetch(authorQuery, { slug: params.slug })
  
  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }
  
  return {
    title: `${author.name} - Workflow Automation`,
    description: author.bio || `Articles and content by ${author.name}`,
    openGraph: {
      title: `${author.name} - Workflow Automation`,
      description: author.bio || `Articles and content by ${author.name}`,
      type: 'profile',
      images: author.avatar ? [urlFor(author.avatar).width(1200).height(630).url()] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${author.name} - Workflow Automation`,
      description: author.bio || `Articles and content by ${author.name}`,
      images: author.avatar ? [urlFor(author.avatar).width(1200).height(630).url()] : [],
    },
  }
}

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const author = await client.fetch(authorQuery, { slug: params.slug })
  
  if (!author) {
    notFound()
  }
  
  const posts = await client.fetch(authorPostsQuery, { authorId: author._id })
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Author Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            {author.avatar && (
              <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={urlFor(author.avatar).width(256).height(256).url()}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            {/* Author Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {author.name}
              </h1>
              
              {author.bio && (
                <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-2xl">
                  {author.bio}
                </p>
              )}
              
              {/* Social Links */}
              {author.social && (
                <div className="flex gap-4 justify-center sm:justify-start">
                  {author.social.twitter && (
                    <a
                      href={author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}
                  {author.social.linkedin && (
                    <a
                      href={author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                  {author.social.website && (
                    <a
                      href={author.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
              
              {/* Stats */}
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Articles Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Articles by {author.name}
        </h2>
        
        {posts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No articles published yet.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <article
                key={post._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                {post.featuredImage && (
                  <Link href={`/blog/${post.slug.current}`}>
                    <div className="relative h-48 w-full">
                      <Image
                        src={urlFor(post.featuredImage).width(600).height(400).url()}
                        alt={post.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                )}
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {post.publishedAt && (
                      <time>
                        {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
                      </time>
                    )}
                    {post.readingTime && (
                      <span>{post.readingTime} min read</span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  
                  {post.excerpt && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category: any) => (
                        <Link
                          key={category.slug.current}
                          href={`/blog/category/${category.slug.current}`}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}