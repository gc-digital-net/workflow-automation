import { Metadata } from 'next';
import Link from 'next/link';
import { TrophyIcon, SparklesIcon, DocumentTextIcon, CalendarIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

export const metadata: Metadata = {
  title: 'Best Software Guides 2024 | Top-Rated Tools by Category',
  description: 'Comprehensive guides to the best software tools in every category. Expert-curated lists with detailed comparisons and recommendations.',
};

// Mock data - will be replaced with Sanity queries
const bestOfGuides = [
  {
    id: 1,
    title: 'Top 10 Project Management Tools for Remote Teams in 2024',
    excerpt: 'Discover the best project management software for distributed teams, with detailed comparisons of features, pricing, and integrations.',
    category: 'Project Management',
    itemCount: 10,
    slug: 'top-10-project-management-tools-2024',
    featuredTools: ['ClickUp', 'Monday.com', 'Asana'],
    updatedAt: '2024-01-20',
    readTime: 15,
    featured: true,
  },
  {
    id: 2,
    title: 'Best CRM Software for Small Businesses: Complete Guide',
    excerpt: 'An in-depth analysis of the top CRM solutions for small businesses, including free options and scalable platforms.',
    category: 'CRM',
    itemCount: 12,
    slug: 'best-crm-small-business',
    featuredTools: ['HubSpot', 'Salesforce', 'Pipedrive'],
    updatedAt: '2024-01-18',
    readTime: 18,
    featured: true,
  },
  {
    id: 3,
    title: '15 Best Workflow Automation Tools to Save Time',
    excerpt: 'Compare the leading automation platforms to streamline your business processes and eliminate repetitive tasks.',
    category: 'Automation',
    itemCount: 15,
    slug: 'best-workflow-automation-tools',
    featuredTools: ['Zapier', 'Make', 'n8n'],
    updatedAt: '2024-01-15',
    readTime: 20,
    featured: false,
  },
  {
    id: 4,
    title: 'Best HR Software for Growing Companies',
    excerpt: 'Find the perfect HR platform for your growing team with our expert analysis of features, pricing, and scalability.',
    category: 'HR',
    itemCount: 8,
    slug: 'best-hr-software-growing-companies',
    featuredTools: ['BambooHR', 'Gusto', 'Rippling'],
    updatedAt: '2024-01-12',
    readTime: 12,
    featured: false,
  },
  {
    id: 5,
    title: 'Top Marketing Automation Platforms Compared',
    excerpt: 'Detailed comparison of the best marketing automation software to help you choose the right solution for your business.',
    category: 'Marketing',
    itemCount: 10,
    slug: 'top-marketing-automation-platforms',
    featuredTools: ['HubSpot', 'Marketo', 'ActiveCampaign'],
    updatedAt: '2024-01-10',
    readTime: 16,
    featured: false,
  },
  {
    id: 6,
    title: 'Best Accounting Software for Freelancers and Consultants',
    excerpt: 'Essential accounting tools for independent professionals, featuring easy invoicing and expense tracking.',
    category: 'Finance',
    itemCount: 7,
    slug: 'best-accounting-software-freelancers',
    featuredTools: ['QuickBooks', 'FreshBooks', 'Wave'],
    updatedAt: '2024-01-08',
    readTime: 10,
    featured: false,
  },
];

const categories = [
  { name: 'All Categories', count: 42 },
  { name: 'Project Management', count: 8 },
  { name: 'CRM', count: 6 },
  { name: 'Automation', count: 5 },
  { name: 'Marketing', count: 7 },
  { name: 'HR', count: 4 },
  { name: 'Finance', count: 5 },
  { name: 'Communication', count: 4 },
  { name: 'Development', count: 3 },
];

export default function BestSoftwarePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <TrophyIcon className="h-12 w-12 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Best Software Guides
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Expert-curated lists of the best business software in every category. Updated monthly with detailed analysis and recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-12 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Featured Guides</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            {bestOfGuides.filter(g => g.featured).map((guide) => (
              <Link
                key={guide.id}
                href={`/best/${guide.slug}`}
                className="group block"
              >
                <article className="flex flex-col h-full bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full mb-3">
                        FEATURED
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                        {guide.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <DocumentTextIcon className="h-4 w-4" />
                      <span>{guide.itemCount} Tools</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                    {guide.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{guide.readTime} min read</span>
                      <span>•</span>
                      <span>Updated {new Date(guide.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-primary-200 dark:border-primary-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Top picks:</span>
                      <div className="flex gap-2">
                        {guide.featuredTools.map((tool) => (
                          <span key={tool} className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs text-gray-700 dark:text-gray-300">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-700 sticky top-16 bg-white dark:bg-gray-900 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  category.name === 'All Categories'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Guides Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">All Software Guides</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bestOfGuides.map((guide) => (
              <Link
                key={guide.id}
                href={`/best/${guide.slug}`}
                className="group block"
              >
                <article className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Category Badge */}
                  <div className="px-6 pt-6">
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 text-xs font-semibold rounded-full">
                      {guide.category}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="px-6 py-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {guide.excerpt}
                    </p>
                  </div>
                  
                  {/* Featured Tools */}
                  <div className="px-6 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {guide.featuredTools.map((tool) => (
                        <span key={tool} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300">
                          {tool}
                        </span>
                      ))}
                      {guide.itemCount > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                          +{guide.itemCount - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <DocumentTextIcon className="h-4 w-4" />
                          {guide.itemCount} tools
                        </span>
                        <span>•</span>
                        <span>{guide.readTime} min</span>
                      </div>
                      <span className="text-primary-600 dark:text-primary-400 font-medium group-hover:underline">
                        Read Guide →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          
          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">
              Load More Guides
            </button>
          </div>
        </div>
      </section>

      {/* By Industry Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Software Guides by Industry
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Find the best tools specifically curated for your industry
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { industry: 'Healthcare', icon: '🏥', count: 8 },
              { industry: 'E-commerce', icon: '🛒', count: 12 },
              { industry: 'Education', icon: '🎓', count: 6 },
              { industry: 'Real Estate', icon: '🏠', count: 7 },
              { industry: 'Manufacturing', icon: '🏭', count: 5 },
              { industry: 'Non-Profit', icon: '❤️', count: 4 },
            ].map((item) => (
              <Link
                key={item.industry}
                href={`/best/industry/${item.industry.toLowerCase().replace(' ', '-')}`}
                className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.industry}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.count} guides</p>
                  </div>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Can't Find What You Need?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Get personalized software recommendations based on your specific requirements and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/software-finder"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-primary-50 font-medium"
            >
              <SparklesIcon className="mr-2 h-5 w-5" />
              Use Software Finder
            </Link>
            <Link
              href="/services/consultation"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 font-medium"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}