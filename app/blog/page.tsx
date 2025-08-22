import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | Workflow Automation Insights',
  description: 'Expert insights, guides, and tips on workflow automation, business process management, and productivity tools.',
};

export default function BlogPage() {
  // Mock data for now
  const posts = [
    {
      id: 1,
      title: 'Getting Started with Workflow Automation',
      excerpt: 'Learn the basics of workflow automation and how it can transform your business operations.',
      date: '2024-01-15',
      author: 'Admin',
      slug: 'getting-started-workflow-automation'
    },
    {
      id: 2,
      title: 'Top 10 Automation Tools for Small Business',
      excerpt: 'Discover the best automation tools that are perfect for small business needs and budgets.',
      date: '2024-01-10',
      author: 'Admin',
      slug: 'top-10-automation-tools'
    },
    {
      id: 3,
      title: 'ROI of Workflow Automation: A Complete Guide',
      excerpt: 'Understanding how to calculate and maximize the return on investment from automation.',
      date: '2024-01-05',
      author: 'Admin',
      slug: 'roi-workflow-automation'
    }
  ];

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
            <div className="space-y-12">
              {posts.map((post) => (
                <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span className="mx-2">•</span>
                      <span>{post.author}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog/category/automation" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                    Workflow Automation
                  </Link>
                </li>
                <li>
                  <Link href="/blog/category/reviews" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                    Software Reviews
                  </Link>
                </li>
                <li>
                  <Link href="/blog/category/guides" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                    How-To Guides
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}