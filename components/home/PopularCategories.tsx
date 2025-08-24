import Link from 'next/link';
import {
  BriefcaseIcon,
  ChartBarIcon,
  CogIcon,
  CpuChipIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const categories = [
  {
    name: 'Project Management',
    description: 'Tools to plan, organize, and manage resources',
    icon: BriefcaseIcon,
    href: '/categories/project-management',
    count: 45,
  },
  {
    name: 'Workflow Automation',
    description: 'Automate repetitive tasks and processes',
    icon: CogIcon,
    href: '/categories/workflow-automation',
    count: 38,
  },
  {
    name: 'CRM Software',
    description: 'Manage customer relationships and sales',
    icon: UserGroupIcon,
    href: '/categories/crm',
    count: 32,
  },
  {
    name: 'Business Intelligence',
    description: 'Analytics and reporting tools',
    icon: ChartBarIcon,
    href: '/categories/business-intelligence',
    count: 28,
  },
  {
    name: 'Document Management',
    description: 'Organize and collaborate on documents',
    icon: DocumentTextIcon,
    href: '/categories/document-management',
    count: 24,
  },
  {
    name: 'AI & Machine Learning',
    description: 'AI-powered automation solutions',
    icon: CpuChipIcon,
    href: '/categories/ai-ml',
    count: 21,
  },
];

export default function PopularCategories() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Browse by Category
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Explore software solutions organized by business function
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative rounded-lg border border-white/20 bg-white/50 backdrop-blur-sm p-6 transition-all hover:border-primary-300 hover:shadow-lg dark:border-gray-700/30 dark:bg-gray-800/50 dark:hover:border-primary-600"
            >
              <div>
                <span className="inline-flex rounded-lg bg-primary-50 p-3 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                  <category.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
                <p className="mt-3 text-sm font-medium text-primary-600 dark:text-primary-400">
                  {category.count} tools reviewed →
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center rounded-md border border-primary-600 bg-white/80 backdrop-blur-sm px-6 py-3 text-base font-medium text-primary-600 shadow-sm hover:bg-white/90 dark:border-primary-400 dark:bg-gray-800/80 dark:text-primary-400 dark:hover:bg-gray-700/90"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
}