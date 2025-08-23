'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  CpuChipIcon, 
  DocumentDuplicateIcon, 
  ChartBarIcon, 
  UserGroupIcon,
  CurrencyDollarIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  ShoppingCartIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'
import { GradientText, MeshGradientOverlay } from '@/components/ui/GradientEffects'

const categories = [
  {
    name: 'Project Management',
    description: 'Tools for planning, tracking, and delivering projects',
    icon: BriefcaseIcon,
    count: 45,
    color: 'bg-primary-100 dark:bg-primary-900/30',
    iconColor: 'text-primary-600 dark:text-primary-400',
    href: '/categories/project-management'
  },
  {
    name: 'Workflow Automation',
    description: 'Automate repetitive tasks and business processes',
    icon: CpuChipIcon,
    count: 38,
    color: 'bg-cyan-100 dark:bg-cyan-900/30',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    href: '/categories/workflow-automation'
  },
  {
    name: 'CRM & Sales',
    description: 'Customer relationship and sales management tools',
    icon: UserGroupIcon,
    count: 52,
    color: 'bg-indigo-100 dark:bg-indigo-900/30',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    href: '/categories/crm-sales'
  },
  {
    name: 'Marketing Automation',
    description: 'Email marketing, social media, and campaign tools',
    icon: ChartBarIcon,
    count: 41,
    color: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
    href: '/categories/marketing-automation'
  },
  {
    name: 'Document Management',
    description: 'Create, store, and collaborate on documents',
    icon: DocumentDuplicateIcon,
    count: 29,
    color: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    href: '/categories/document-management'
  },
  {
    name: 'Finance & Accounting',
    description: 'Invoicing, expense tracking, and financial tools',
    icon: CurrencyDollarIcon,
    count: 35,
    color: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    href: '/categories/finance-accounting'
  },
  {
    name: 'HR & Recruiting',
    description: 'Human resources and talent acquisition platforms',
    icon: AcademicCapIcon,
    count: 27,
    color: 'bg-pink-100 dark:bg-pink-900/30',
    iconColor: 'text-pink-600 dark:text-pink-400',
    href: '/categories/hr-recruiting'
  },
  {
    name: 'E-commerce',
    description: 'Online store, inventory, and order management',
    icon: ShoppingCartIcon,
    count: 33,
    color: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    href: '/categories/ecommerce'
  },
  {
    name: 'Analytics & BI',
    description: 'Data analytics and business intelligence tools',
    icon: BeakerIcon,
    count: 24,
    color: 'bg-teal-100 dark:bg-teal-900/30',
    iconColor: 'text-teal-600 dark:text-teal-400',
    href: '/categories/analytics-bi'
  }
]

export default function CategoriesGrid() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-50/50 to-white dark:from-secondary-900/50 dark:to-secondary-950" />
      <MeshGradientOverlay opacity={0.2} />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white sm:text-4xl">
            Browse by <GradientText gradient="from-primary-600 to-cyan-600">Category</GradientText>
          </h2>
          <p className="mt-4 text-lg text-secondary-600 dark:text-secondary-400">
            Find the perfect automation tools for your specific needs
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                href={category.href}
                className="group relative block"
              >
                {/* Gradient border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-75 transition duration-300 blur" />
                
                {/* Card content with glass effect */}
                <div className="relative flex items-start gap-4 rounded-2xl p-6 glass-effect glossy-shine">
                  <div className={`rounded-xl p-3 ${category.color} backdrop-blur-sm`}>
                    <category.icon className={`h-6 w-6 ${category.iconColor}`} />
                  </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-secondary-600 dark:text-secondary-400">
                    {category.description}
                  </p>
                  <p className="mt-2 text-xs font-medium text-secondary-500 dark:text-secondary-500">
                    {category.count} tools reviewed
                  </p>
                </div>
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  <svg
                    className="h-5 w-5 text-secondary-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 transition-all"
          >
            View All Categories
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}