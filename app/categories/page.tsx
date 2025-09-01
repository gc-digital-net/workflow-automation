import Link from 'next/link';
import { client } from '@/lib/sanity';
import { 
  CogIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  MegaphoneIcon,
  DocumentTextIcon,
  ServerStackIcon,
  BriefcaseIcon,
  ChatBubbleBottomCenterTextIcon,
  ShieldCheckIcon,
  BeakerIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Categories | Workflow Automation',
  description: 'Browse automation software by category. Find the perfect tools for project management, workflow automation, sales, marketing, and more.',
};

// Map category slugs to icons and colors
const categoryConfig: Record<string, { icon: any; color: string }> = {
  'workflow-automation': { icon: CogIcon, color: 'bg-blue-500' },
  'project-management': { icon: ClipboardDocumentListIcon, color: 'bg-purple-500' },
  'business-process-management': { icon: ChartBarIcon, color: 'bg-green-500' },
  'hr-automation': { icon: UserGroupIcon, color: 'bg-orange-500' },
  'sales-automation': { icon: CurrencyDollarIcon, color: 'bg-red-500' },
  'marketing-automation': { icon: MegaphoneIcon, color: 'bg-pink-500' },
  'document-automation': { icon: DocumentTextIcon, color: 'bg-indigo-500' },
  'it-process-automation': { icon: ServerStackIcon, color: 'bg-cyan-500' },
  'finance-automation': { icon: BriefcaseIcon, color: 'bg-yellow-500' },
  'customer-service': { icon: ChatBubbleBottomCenterTextIcon, color: 'bg-teal-500' },
  'security-compliance': { icon: ShieldCheckIcon, color: 'bg-gray-500' },
  'testing-qa': { icon: BeakerIcon, color: 'bg-lime-500' },
};

// Fetch categories with actual software counts
async function getCategories() {
  const query = `*[_type == "softwareCategory"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    "softwareCount": count(*[_type == "software" && references(^._id)]),
    "topSoftware": *[_type == "software" && references(^._id)] | order(overallScore desc) [0...4] {
      name,
      slug
    }
  }`;
  
  return await client.fetch(query);
}

// Featured comparisons (could also come from Sanity in the future)
const featuredComparisons = [
  {
    title: 'Zapier vs Make',
    description: 'Compare the top two no-code automation platforms',
    href: '/reviews/compare?tools=zapier,make',
  },
  {
    title: 'Monday vs Asana',
    description: 'Which project management tool is right for you?',
    href: '/reviews/compare?tools=monday,asana',
  },
  {
    title: 'HubSpot vs Salesforce',
    description: 'CRM comparison for growing businesses',
    href: '/reviews/compare?tools=hubspot,salesforce',
  },
];

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Browse Software by Category
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive collection of automation software organized by business function. 
              Find the perfect tools for your specific needs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/reviews"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                View All Reviews
              </Link>
              <Link
                href="/reviews/compare"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Compare Software
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No categories found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category: any) => {
                const config = categoryConfig[category.slug?.current] || { 
                  icon: CogIcon, 
                  color: 'bg-gray-500' 
                };
                const Icon = config.icon;
                
                return (
                  <Link
                    key={category._id}
                    href={`/categories/${category.slug?.current}`}
                    className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`${config.color} rounded-lg p-3 text-white`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                          {category.softwareCount} tools
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {category.name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {category.description || 'Discover top-rated software in this category'}
                      </p>
                      
                      {category.topSoftware && category.topSoftware.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Popular Tools
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {category.topSoftware.map((software: any) => (
                              <span
                                key={software.slug?.current}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                              >
                                {software.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-4 flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300">
                        View category
                        <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Featured Comparisons */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Popular Comparisons
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Side-by-side comparisons of the most requested software
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredComparisons.map((comparison) => (
              <Link
                key={comparison.href}
                href={comparison.href}
                className="group bg-gray-50 dark:bg-gray-900 rounded-lg p-6 hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  {comparison.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {comparison.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary-600 dark:text-primary-400">
                  Compare now
                  <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-600 rounded-2xl px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Need Help Finding the Right Software?
              </h2>
              <p className="mt-4 text-lg text-primary-100">
                Our team has reviewed hundreds of automation tools. Let us help you find the perfect solution for your needs.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/reviews/compare"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-primary-600 bg-white hover:bg-gray-100 transition-colors"
                >
                  Compare Tools
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-primary-700 transition-colors"
                >
                  Get Recommendations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}