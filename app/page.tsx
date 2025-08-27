import Link from 'next/link'
import Image from 'next/image'
import { 
  StarIcon, 
  SparklesIcon, 
  RocketLaunchIcon,
  ChartBarIcon,
  ArrowRightIcon,
  CheckIcon,
  ArrowTrendingUpIcon,
  CommandLineIcon,
  CubeTransparentIcon,
  BoltIcon
} from '@heroicons/react/24/solid'
import { 
  ClockIcon, 
  CurrencyDollarIcon,
  UserGroupIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { client, urlFor } from '@/lib/sanity'
import NewsletterCTA from '@/components/home/NewsletterCTA'

// Hero stats
const stats = [
  { label: 'Software Reviewed', value: '150+' },
  { label: 'Hours Saved Monthly', value: '500+' },
  { label: 'Active Users', value: '10K+' },
  { label: 'Categories Covered', value: '20+' },
]

// Benefits
const benefits = [
  {
    icon: ClockIcon,
    title: 'Save 10+ Hours Weekly',
    description: 'Automate repetitive tasks and focus on what matters most.'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Reduce Costs by 40%',
    description: 'Find affordable tools that deliver enterprise-level results.'
  },
  {
    icon: UserGroupIcon,
    title: 'Scale Your Team',
    description: 'Tools that grow with you from startup to enterprise.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Trusted Reviews',
    description: 'Unbiased analysis based on real-world testing and usage.'
  },
]

async function getHomePageData() {
  try {
    // Fetch featured software
    const softwareQuery = `*[_type == "software"] | order(overallScore desc) [0...6] {
      _id,
      name,
      tagline,
      logo,
      overallScore,
      slug,
      "quickInfo": coalesce(quickInfo, companyInfo, {}),
      categories[]-> {
        name
      }
    }`

    // Fetch featured categories
    const categoriesQuery = `*[_type == "softwareCategory" && featured == true] | order(order asc) {
      _id,
      name,
      slug,
      description,
      color
    }`

    // Fetch latest blog posts
    const postsQuery = `*[_type == "post"] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      "excerpt": coalesce(excerpt, ""),
      "mainImage": coalesce(mainImage, featuredImage),
      publishedAt
    }`

    const [software, cats, posts] = await Promise.all([
      client.fetch(softwareQuery),
      client.fetch(categoriesQuery),
      client.fetch(postsQuery)
    ])

    return {
      featuredSoftware: software || [],
      categories: cats || [],
      latestPosts: posts || []
    }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return {
      featuredSoftware: [],
      categories: [],
      latestPosts: []
    }
  }
}

export default async function HomePage() {
  const { featuredSoftware, categories, latestPosts } = await getHomePageData()

  return (
    <div className="min-h-screen">
      {/* Debug Info - Remove in production */}
      {featuredSoftware.length === 0 && categories.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 m-4 rounded">
          <p className="text-yellow-800">Debug: No data loaded. Check console for errors.</p>
          <p className="text-sm">Software: {featuredSoftware.length}, Categories: {categories.length}, Posts: {latestPosts.length}</p>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary-500 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-indigo-500 rounded-full opacity-20 blur-3xl" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white mb-6">
              <SparklesIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Trusted by 10,000+ businesses</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                Workflow Software
              </span>
            </h1>
            
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Save hours researching. Get unbiased reviews, real pricing data, and expert comparisons 
              of 150+ business automation tools.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/reviews"
                className="px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
              >
                Browse All Reviews
              </Link>
              <Link
                href="/tools/software-finder"
                className="px-8 py-4 bg-primary-500/20 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-primary-500/30 transition-colors border border-white/20"
              >
                <div className="flex items-center gap-2">
                  <RocketLaunchIcon className="h-5 w-5" />
                  Take the Quiz
                </div>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-primary-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Browse by Category
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Find the perfect software for your specific needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
              const icons: any = {
                'project-management': ChartBarIcon,
                'workflow-automation': BoltIcon,
                'team-collaboration': UserGroupIcon,
                'crm-software': UserGroupIcon,
                'business-process-management': CubeTransparentIcon,
                'task-management': CheckIcon,
              }
              const Icon = icons[category.slug?.current] || CommandLineIcon
              
              return (
                <Link
                  key={category._id}
                  href={`/categories/${category.slug?.current}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-primary-50 dark:bg-primary-900/30 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors`}>
                      <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {category.description}
                      </p>
                      <div className="mt-3 flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
                        Explore tools
                        <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      )}

      {/* Featured Software */}
      {featuredSoftware.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Top-Rated Software
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our highest-rated tools based on comprehensive testing and real user feedback
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSoftware.map((software, idx) => (
              <Link
                key={software._id}
                href={`/reviews/${software.slug?.current}`}
                className="group bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
              >
                {/* Rank Badge */}
                {idx < 3 && (
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
                    <StarIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-300">
                      #{idx + 1} Top Rated
                    </span>
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {software.logo && (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                        <Image
                          src={urlFor(software.logo).url()}
                          alt={software.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                        {software.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {software.categories?.[0]?.name || 'Software'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                    <StarIcon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                      {software.overallScore}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {software.tagline}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {software.quickInfo?.startingPrice || 'View Pricing'}
                  </span>
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:underline">
                    Read Review →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              View All Reviews
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Workflow Automation?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We help businesses make confident software decisions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-xl mb-4">
                  <benefit.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Content */}
      {latestPosts.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Latest Insights
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Expert tips and strategies for workflow optimization
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug?.current}`}
                  className="group"
                >
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                    {post.mainImage && (
                      <Image
                        src={urlFor(post.mainImage).url()}
                        alt={post.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-indigo-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of businesses saving time and money with the right automation tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools/software-finder"
                className="px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Find Your Software Match
              </Link>
              <Link
                href="/reviews"
                className="px-8 py-4 bg-primary-500/20 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-primary-500/30 transition-colors border border-white/20"
              >
                Browse Reviews
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterCTA />
    </div>
  )
}