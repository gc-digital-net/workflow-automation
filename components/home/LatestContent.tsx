import Link from 'next/link';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

const latestPosts = [
  {
    id: 1,
    title: 'Top 10 Project Management Tools for Remote Teams in 2024',
    excerpt: 'Discover the best project management software for distributed teams, with detailed comparisons of features, pricing, and integrations.',
    category: 'Best Of',
    author: 'Sarah Chen',
    date: '2024-01-15',
    readTime: 12,
    slug: 'top-10-project-management-tools-2024',
    type: 'best',
  },
  {
    id: 2,
    title: 'How to Calculate ROI for Workflow Automation Software',
    excerpt: 'Learn the key metrics and formulas to measure the return on investment when implementing automation tools in your business.',
    category: 'Guide',
    author: 'Michael Torres',
    date: '2024-01-14',
    readTime: 8,
    slug: 'calculate-roi-workflow-automation',
    type: 'blog',
  },
  {
    id: 3,
    title: 'Best CRM Software for Small Businesses: Complete Guide',
    excerpt: 'An in-depth analysis of the top CRM solutions for small businesses, including free options and scalable platforms.',
    category: 'Best Of',
    author: 'Emily Rodriguez',
    date: '2024-01-13',
    readTime: 15,
    slug: 'best-crm-small-business',
    type: 'best',
  },
  {
    id: 4,
    title: 'Zapier vs Make: Which Automation Platform is Right for You?',
    excerpt: 'A comprehensive comparison of two leading automation platforms, analyzing features, pricing, and use cases.',
    category: 'Comparison',
    author: 'David Kim',
    date: '2024-01-12',
    readTime: 10,
    slug: 'zapier-vs-make-comparison',
    type: 'blog',
  },
];

export default function LatestContent() {
  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-900/50 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Latest Articles & Reviews
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Expert insights and in-depth guides to help you make informed decisions
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
            >
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                  <div className="flex items-center gap-x-4 text-xs">
                    <span className="rounded-full bg-primary-100 px-3 py-1 font-medium text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <ClockIcon className="mr-1 h-3 w-3" />
                      {post.readTime} min read
                    </div>
                  </div>
                  <div className="group relative mt-3">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                      <Link href={`/${post.type === 'best' ? 'best' : 'blog'}/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {post.author}
                    </p>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            View All Blog Posts
          </Link>
          <Link
            href="/listicles"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            View All Best Of Guides
          </Link>
        </div>
      </div>
    </section>
  );
}