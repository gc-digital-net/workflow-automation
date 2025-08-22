import Link from 'next/link';
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
  AcademicCapIcon,
  ShieldCheckIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

export default function CategoriesPage() {
  const categories = [
    {
      name: 'Workflow Automation',
      slug: 'workflow-automation',
      description: 'End-to-end workflow automation platforms for business process optimization',
      icon: CogIcon,
      count: 45,
      color: 'from-blue-500 to-blue-600',
      popular: ['Zapier', 'Make', 'n8n', 'Workato'],
    },
    {
      name: 'Project Management',
      slug: 'project-management',
      description: 'Tools for planning, tracking, and managing projects and teams',
      icon: ClipboardDocumentListIcon,
      count: 38,
      color: 'from-purple-500 to-purple-600',
      popular: ['Asana', 'Monday.com', 'ClickUp', 'Notion'],
    },
    {
      name: 'Business Process Management',
      slug: 'business-process-management',
      description: 'BPM software for modeling, implementing, and optimizing business processes',
      icon: ChartBarIcon,
      count: 27,
      color: 'from-green-500 to-green-600',
      popular: ['Kissflow', 'ProcessMaker', 'Nintex', 'Bizagi'],
    },
    {
      name: 'HR Automation',
      slug: 'hr-automation',
      description: 'Automate HR processes from recruiting to employee management',
      icon: UserGroupIcon,
      count: 32,
      color: 'from-orange-500 to-orange-600',
      popular: ['BambooHR', 'Workday', 'Gusto', 'Rippling'],
    },
    {
      name: 'Sales Automation',
      slug: 'sales-automation',
      description: 'CRM and sales tools to automate your sales pipeline',
      icon: CurrencyDollarIcon,
      count: 41,
      color: 'from-red-500 to-red-600',
      popular: ['Salesforce', 'HubSpot', 'Pipedrive', 'Close'],
    },
    {
      name: 'Marketing Automation',
      slug: 'marketing-automation',
      description: 'Automate marketing campaigns, email sequences, and lead nurturing',
      icon: MegaphoneIcon,
      count: 35,
      color: 'from-pink-500 to-pink-600',
      popular: ['Marketo', 'ActiveCampaign', 'Mailchimp', 'Brevo'],
    },
    {
      name: 'Document Automation',
      slug: 'document-automation',
      description: 'Generate, manage, and process documents automatically',
      icon: DocumentTextIcon,
      count: 24,
      color: 'from-indigo-500 to-indigo-600',
      popular: ['PandaDoc', 'DocuSign', 'Conga', 'Formstack'],
    },
    {
      name: 'IT Process Automation',
      slug: 'it-process-automation',
      description: 'ITSM and infrastructure automation tools',
      icon: ServerStackIcon,
      count: 29,
      color: 'from-cyan-500 to-cyan-600',
      popular: ['ServiceNow', 'Ansible', 'Puppet', 'Jenkins'],
    },
    {
      name: 'Finance Automation',
      slug: 'finance-automation',
      description: 'Automate accounting, invoicing, and financial processes',
      icon: BriefcaseIcon,
      count: 26,
      color: 'from-yellow-500 to-yellow-600',
      popular: ['QuickBooks', 'Xero', 'Bill.com', 'Expensify'],
    },
    {
      name: 'Customer Service',
      slug: 'customer-service',
      description: 'Help desk and customer support automation platforms',
      icon: AcademicCapIcon,
      count: 33,
      color: 'from-teal-500 to-teal-600',
      popular: ['Zendesk', 'Freshdesk', 'Intercom', 'Help Scout'],
    },
    {
      name: 'Security & Compliance',
      slug: 'security-compliance',
      description: 'Automate security monitoring and compliance management',
      icon: ShieldCheckIcon,
      count: 21,
      color: 'from-gray-500 to-gray-600',
      popular: ['OneTrust', 'Vanta', 'Drata', 'SecureFrame'],
    },
    {
      name: 'Testing & QA',
      slug: 'testing-qa',
      description: 'Automated testing and quality assurance tools',
      icon: BeakerIcon,
      count: 18,
      color: 'from-lime-500 to-lime-600',
      popular: ['Selenium', 'Cypress', 'TestRail', 'BrowserStack'],
    },
  ];

  const featuredComparisons = [
    {
      title: 'Zapier vs Make',
      description: 'Compare the top two no-code automation platforms',
      href: '/reviews/compare/zapier-vs-make',
    },
    {
      title: 'Monday vs Asana',
      description: 'Which project management tool is right for you?',
      href: '/reviews/compare/monday-vs-asana',
    },
    {
      title: 'HubSpot vs Salesforce',
      description: 'CRM comparison for growing businesses',
      href: '/reviews/compare/hubspot-vs-salesforce',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Browse by Category
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Explore automation software organized by business function and use case. 
              Find the perfect tools for your specific needs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/reviews"
                className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                View All Reviews
              </Link>
              <Link
                href="/tools/software-finder"
                className="text-base font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Use Software Finder →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group relative rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-all bg-white dark:bg-gray-800"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mb-4`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {category.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {category.count} tools reviewed
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 group-hover:underline">
                      View all →
                    </span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Popular:</p>
                    <div className="flex flex-wrap gap-1">
                      {category.popular.map((tool) => (
                        <span
                          key={tool}
                          className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-1 text-xs text-gray-700 dark:text-gray-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Comparisons */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
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
                className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {comparison.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {comparison.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Can't Find What You're Looking For?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Our software finder tool can help you discover the perfect solution
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                href="/tools/software-finder"
                className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                Use Software Finder
              </Link>
              <Link
                href="/contact"
                className="text-base font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Request a Review →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}