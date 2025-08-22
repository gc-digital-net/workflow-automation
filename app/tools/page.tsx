import Image from 'next/image';
import Link from 'next/link';
import { 
  CalculatorIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  DocumentCheckIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';

export default function ToolsPage() {
  const tools = [
    {
      icon: CalculatorIcon,
      title: 'ROI Calculator',
      description: 'Calculate the potential return on investment from workflow automation',
      features: [
        'Time savings analysis',
        'Cost reduction projections',
        'Productivity gains',
        'Custom PDF reports',
      ],
      href: '/tools/roi-calculator',
      color: 'from-blue-500 to-blue-600',
      available: true,
    },
    {
      icon: MagnifyingGlassIcon,
      title: 'Software Finder',
      description: 'Get personalized software recommendations based on your specific needs',
      features: [
        'Interactive questionnaire',
        'Personalized matches',
        'Detailed comparisons',
        'Budget optimization',
      ],
      href: '/tools/software-finder',
      color: 'from-green-500 to-green-600',
      available: true,
    },
    {
      icon: ChartBarIcon,
      title: 'Comparison Tool',
      description: 'Compare multiple automation platforms side-by-side',
      features: [
        'Feature matrices',
        'Pricing comparisons',
        'Integration analysis',
        'Shareable reports',
      ],
      href: '/tools/comparison',
      color: 'from-orange-500 to-orange-600',
      available: false,
      comingSoon: true,
    },
    {
      icon: DocumentCheckIcon,
      title: 'Readiness Assessment',
      description: 'Evaluate your organization\'s readiness for automation',
      features: [
        'Maturity scoring',
        'Gap analysis',
        'Priority roadmap',
        'Action plan',
      ],
      href: '/tools/assessment',
      color: 'from-red-500 to-red-600',
      available: false,
      comingSoon: true,
    },
    {
      icon: ClipboardDocumentCheckIcon,
      title: 'Requirements Builder',
      description: 'Create comprehensive requirements documents for your automation project',
      features: [
        'Guided templates',
        'Best practices',
        'Vendor RFP format',
        'Collaboration tools',
      ],
      href: '/tools/requirements',
      color: 'from-indigo-500 to-indigo-600',
      available: false,
      comingSoon: true,
    },
  ];

  const stats = [
    { label: 'Tools Available', value: '6+' },
    { label: 'Businesses Helped', value: '10,000+' },
    { label: 'Hours Saved', value: '500K+' },
    { label: 'Average ROI', value: '320%' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Free Automation Tools & Calculators
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powerful tools to help you plan, evaluate, and implement workflow automation. 
            No signup required for most tools.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/tools/roi-calculator"
              className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              Try ROI Calculator
            </Link>
            <Link
              href="/tools/software-finder"
              className="text-base font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Find Your Software →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Choose Your Tool
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Each tool is designed to solve specific automation challenges
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className={`relative rounded-2xl border ${
                  tool.available 
                    ? 'border-gray-200 dark:border-gray-700 hover:shadow-xl' 
                    : 'border-gray-300 dark:border-gray-600 opacity-75'
                } p-8 transition-all bg-white dark:bg-gray-800 overflow-hidden`}
              >
                {tool.comingSoon && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-300">
                      Coming Soon
                    </span>
                  </div>
                )}
                
                <div className={`h-12 w-12 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center mb-6`}>
                  <tool.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {tool.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {tool.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {tool.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                {tool.available ? (
                  <Link
                    href={tool.href}
                    className="block w-full text-center rounded-md bg-gray-900 dark:bg-white px-3.5 py-2.5 text-sm font-semibold text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
                  >
                    Launch Tool
                  </Link>
                ) : (
                  <button
                    disabled
                    className="block w-full text-center rounded-md bg-gray-200 dark:bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tool Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div className="text-white">
              <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white mb-4">
                Most Popular Tool
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                ROI Calculator
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Our most popular tool helps you build a compelling business case for automation 
                by calculating potential time savings, cost reductions, and productivity gains.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-blue-200 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Calculate savings in hours and dollars</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-blue-200 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Generate professional PDF reports</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-blue-200 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Compare multiple automation scenarios</span>
                </div>
              </div>
              <div className="mt-10">
                <Link
                  href="/tools/roi-calculator"
                  className="inline-flex items-center rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Try ROI Calculator
                  <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-xl bg-white/10 backdrop-blur-sm p-8">
                <div className="space-y-4">
                  <div className="h-4 bg-white/20 rounded w-3/4"></div>
                  <div className="h-4 bg-white/20 rounded w-full"></div>
                  <div className="h-4 bg-white/20 rounded w-5/6"></div>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="h-20 bg-white/20 rounded"></div>
                    <div className="h-20 bg-white/20 rounded"></div>
                  </div>
                  <div className="h-32 bg-white/20 rounded mt-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Need Custom Analysis?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Our experts can provide personalized recommendations and detailed analysis for your specific needs
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                href="/services/consultation"
                className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                Book Consultation
              </Link>
              <Link
                href="/contact"
                className="text-base font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}