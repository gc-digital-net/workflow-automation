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
  BoltIcon,
  CubeTransparentIcon,
  CheckIcon,
  CommandLineIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Categories | Workflow Automation',
  description: 'Browse automation software by category. Find the perfect tools for project management, workflow automation, sales, marketing, and more.',
};

export const revalidate = 1800

// Map category slugs to icons
const categoryIcons: Record<string, any> = {
  'workflow-automation': BoltIcon,
  'project-management': ChartBarIcon,
  'business-process-management': CubeTransparentIcon,
  'task-management': CheckIcon,
  'hr-automation': UserGroupIcon,
  'sales-automation': CurrencyDollarIcon,
  'crm-software': UserGroupIcon,
  'marketing-automation': MegaphoneIcon,
  'document-automation': DocumentTextIcon,
  'it-process-automation': ServerStackIcon,
  'finance-automation': BriefcaseIcon,
  'customer-service': ChatBubbleBottomCenterTextIcon,
  'security-compliance': ShieldCheckIcon,
  'testing-qa': BeakerIcon,
};

// Fetch categories with actual software counts
async function getCategories() {
  if (!client) {
    console.warn('Sanity client not initialized')
    return []
  }

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

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Browse by Category
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find the perfect software for your specific needs
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid - matching homepage design */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No categories found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category: any) => {
                const Icon = categoryIcons[category.slug?.current] || CommandLineIcon;

                return (
                  <Link
                    key={category._id}
                    href={`/categories/${category.slug?.current}`}
                    className="group bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/30 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                        <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                            {category.name}
                          </h3>
                          {category.softwareCount > 0 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {category.softwareCount} tools
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                          {category.description || 'Discover top-rated software in this category'}
                        </p>

                        {category.topSoftware && category.topSoftware.length > 0 && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-1">
                            {category.topSoftware.map((s: any) => s.name).join(', ')}
                          </p>
                        )}

                        <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
                          Explore tools
                          <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-600 rounded-2xl px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Not Sure Where to Start?
              </h2>
              <p className="mt-4 text-lg text-primary-100">
                Compare tools side-by-side or browse all reviews to find the perfect software for your workflow.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/reviews"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-primary-600 bg-white hover:bg-gray-100 transition-colors"
                >
                  View All Reviews
                </Link>
                <Link
                  href="/reviews/compare"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-primary-700 transition-colors"
                >
                  Compare Software
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
