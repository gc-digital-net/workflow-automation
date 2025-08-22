import { Metadata } from 'next';
import Link from 'next/link';
import { 
  StarIcon, 
  CheckIcon, 
  XMarkIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  BeakerIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  CogIcon,
  ChartPieIcon,
  GiftIcon,
  SparklesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/solid';
import { ShareIcon, BookmarkIcon } from '@heroicons/react/24/outline';

interface ReviewPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  // In production, fetch from Sanity using resolvedParams.slug
  return {
    title: 'ClickUp Review 2024: Features, Pricing & Alternatives | Workflow Automation',
    description: 'Comprehensive ClickUp review covering features, pricing, pros/cons, and alternatives. See why it scores 9.2/10 in our detailed analysis.',
  };
}

// Mock data - will be replaced with Sanity query
const softwareReview = {
  name: 'ClickUp',
  tagline: 'One app to replace them all',
  logo: '/logos/clickup.png',
  category: 'Project Management',
  website: 'https://clickup.com',
  foundedYear: 2017,
  headquarters: 'San Diego, CA',
  employeeCount: '500-1000',
  
  // Overall Scoring
  overallScore: 9.2,
  scores: {
    easeOfUse: 8.8,
    features: 9.5,
    integrations: 9.3,
    pricing: 9.3,
    support: 8.9,
    security: 9.1,
    scalability: 9.4,
    performance: 8.7,
    mobile: 9.0,
    documentation: 8.8,
    learningCurve: 7.5,
    customization: 9.7,
    reporting: 9.2,
    freeTier: 9.5,
    overallValue: 9.3,
  },
  
  // Overview
  overview: {
    introduction: `ClickUp is an all-in-one productivity platform that brings teams, work, and tools together in one place. Founded in 2017, it has quickly become one of the most popular project management solutions, serving over 800,000 teams worldwide.`,
    keyFeatures: [
      { feature: 'Multiple Views', description: 'List, Board, Calendar, Gantt, and 15+ views' },
      { feature: 'Custom Fields', description: 'Create any field type to track anything' },
      { feature: 'Automation', description: 'No-code automation with 100+ pre-built recipes' },
      { feature: 'Goals & OKRs', description: 'Track progress toward objectives' },
      { feature: 'Docs & Wiki', description: 'Built-in documentation and knowledge base' },
      { feature: 'Time Tracking', description: 'Native time tracking with reporting' },
    ],
    targetAudience: 'Small to enterprise teams looking for a highly customizable, all-in-one solution.',
  },
  
  // Pricing
  pricing: [
    {
      name: 'Free Forever',
      price: 0,
      yearlyPrice: 0,
      features: [
        'Unlimited tasks',
        'Unlimited members',
        '100MB storage',
        'Limited integrations',
        'Basic features',
      ],
      userLimit: 'Unlimited',
      storageLimit: '100MB',
      recommended: false,
      mostPopular: false,
    },
    {
      name: 'Unlimited',
      price: 7,
      yearlyPrice: 60,
      features: [
        'Everything in Free',
        'Unlimited storage',
        'Unlimited integrations',
        'Unlimited dashboards',
        'Guests & permissions',
        'Goals & portfolios',
      ],
      userLimit: 'Unlimited',
      storageLimit: 'Unlimited',
      recommended: true,
      mostPopular: true,
    },
    {
      name: 'Business',
      price: 12,
      yearlyPrice: 108,
      features: [
        'Everything in Unlimited',
        'Google SSO',
        'Unlimited teams',
        'Custom exporting',
        'Advanced automations',
        'Advanced dashboard features',
      ],
      userLimit: 'Unlimited',
      storageLimit: 'Unlimited',
      recommended: false,
      mostPopular: false,
    },
    {
      name: 'Enterprise',
      price: null,
      yearlyPrice: null,
      features: [
        'Everything in Business',
        'White labeling',
        'Enterprise API',
        'Advanced permissions',
        'Dedicated success manager',
        'Custom contract & invoicing',
      ],
      userLimit: 'Unlimited',
      storageLimit: 'Unlimited',
      recommended: false,
      mostPopular: false,
    },
  ],
  
  // Pros and Cons
  pros: [
    'Extremely customizable and flexible',
    'Generous free plan with unlimited users',
    'All-in-one solution reduces tool sprawl',
    'Regular updates and new features',
    'Strong automation capabilities',
    'Excellent value for money',
    'Native time tracking included',
    'Multiple view options for different work styles',
  ],
  cons: [
    'Steep learning curve for new users',
    'Can be overwhelming with options',
    'Mobile app limitations compared to desktop',
    'Performance can slow with large datasets',
    'Notification management can be complex',
    'Some features only in higher tiers',
  ],
  
  // Integrations
  integrations: 1000,
  popularIntegrations: [
    'Slack', 'Google Drive', 'Zoom', 'GitHub', 'Figma', 
    'Dropbox', 'Outlook', 'HubSpot', 'Salesforce', 'Jira'
  ],
  
  // Alternatives
  alternatives: [
    { name: 'Monday.com', slug: 'monday-com', score: 8.9 },
    { name: 'Asana', slug: 'asana', score: 8.7 },
    { name: 'Notion', slug: 'notion', score: 8.8 },
    { name: 'Jira', slug: 'jira', score: 8.5 },
  ],
  
  // Use Cases
  useCases: [
    {
      title: 'Marketing Agency Project Management',
      description: 'Perfect for agencies managing multiple client projects with different workflows.',
    },
    {
      title: 'Software Development Teams',
      description: 'Agile boards, sprints, and bug tracking for development teams.',
    },
    {
      title: 'Remote Team Collaboration',
      description: 'Centralized workspace for distributed teams to stay aligned.',
    },
  ],
  
  lastUpdated: '2024-01-20',
};

function ScoreCard({ label, score, icon: Icon }: { label: string; score: number; icon: any }) {
  const percentage = (score / 10) * 100;
  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600 dark:text-green-400';
    if (score >= 7) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        </div>
        <span className={`text-lg font-bold ${getScoreColor(score)}`}>{score}</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const resolvedParams = await params;
  return (
    <article className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Home
              </Link>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              <Link href="/reviews" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Reviews
              </Link>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900 dark:text-white">{softwareReview.category}</span>
            </nav>
            
            {/* Title Section */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-xl flex items-center justify-center">
                    <SparklesIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {softwareReview.name} Review 2024
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">{softwareReview.tagline}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheckIcon className="h-4 w-4" />
                    Founded {softwareReview.foundedYear}
                  </span>
                  <span className="flex items-center gap-1">
                    <BeakerIcon className="h-4 w-4" />
                    {softwareReview.integrations}+ Integrations
                  </span>
                  <span className="flex items-center gap-1">
                    <CurrencyDollarIcon className="h-4 w-4" />
                    Free tier available
                  </span>
                </div>
              </div>
              
              {/* Overall Score */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-6 text-center">
                <div className="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {softwareReview.overallScore}
                </div>
                <div className="flex items-center justify-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.floor(softwareReview.overallScore / 2)
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Score</p>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={softwareReview.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
              >
                Try {softwareReview.name} Free
                <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4" />
              </a>
              <Link
                href="/reviews/compare/clickup-vs-monday"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-gray-700 dark:text-gray-300"
              >
                Compare Alternatives
              </Link>
              <button className="flex items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <ShareIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="flex items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <BookmarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{softwareReview.overview.introduction}</p>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Features</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {softwareReview.overview.keyFeatures.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{item.feature}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 15-Step Framework Scores */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Detailed Scoring Analysis</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <ScoreCard label="Ease of Use" score={softwareReview.scores.easeOfUse} icon={SparklesIcon} />
                <ScoreCard label="Features" score={softwareReview.scores.features} icon={CogIcon} />
                <ScoreCard label="Integrations" score={softwareReview.scores.integrations} icon={BeakerIcon} />
                <ScoreCard label="Pricing Value" score={softwareReview.scores.pricing} icon={CurrencyDollarIcon} />
                <ScoreCard label="Customer Support" score={softwareReview.scores.support} icon={ShieldCheckIcon} />
                <ScoreCard label="Security" score={softwareReview.scores.security} icon={ShieldCheckIcon} />
                <ScoreCard label="Scalability" score={softwareReview.scores.scalability} icon={ChartBarIcon} />
                <ScoreCard label="Performance" score={softwareReview.scores.performance} icon={ChartBarIcon} />
                <ScoreCard label="Mobile Access" score={softwareReview.scores.mobile} icon={DevicePhoneMobileIcon} />
                <ScoreCard label="Documentation" score={softwareReview.scores.documentation} icon={DocumentTextIcon} />
                <ScoreCard label="Learning Curve" score={softwareReview.scores.learningCurve} icon={AcademicCapIcon} />
                <ScoreCard label="Customization" score={softwareReview.scores.customization} icon={CogIcon} />
                <ScoreCard label="Reporting" score={softwareReview.scores.reporting} icon={ChartPieIcon} />
                <ScoreCard label="Free Tier" score={softwareReview.scores.freeTier} icon={GiftIcon} />
                <ScoreCard label="Overall Value" score={softwareReview.scores.overallValue} icon={StarIcon} />
              </div>
            </section>

            {/* Pricing Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pricing Plans</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {softwareReview.pricing.map((plan, index) => (
                  <div
                    key={index}
                    className={`relative rounded-xl border-2 p-6 ${
                      plan.mostPopular
                        ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/10'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                    }`}
                  >
                    {plan.mostPopular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                        MOST POPULAR
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      {plan.price !== null ? (
                        <>
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                          <span className="text-gray-600 dark:text-gray-400">/user/month</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">Custom Pricing</span>
                      )}
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-2 px-4 rounded-lg font-medium ${
                      plan.mostPopular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}>
                      {plan.price === 0 ? 'Start Free' : 'Get Started'}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Pros and Cons */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pros and Cons</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">Pros</h3>
                  <ul className="space-y-3">
                    {softwareReview.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Cons</h3>
                  <ul className="space-y-3">
                    {softwareReview.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <XMarkIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Use Cases */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Ideal Use Cases</h2>
              <div className="grid gap-6">
                {softwareReview.useCases.map((useCase, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{useCase.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Quick Stats */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600 dark:text-gray-400">Founded</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">{softwareReview.foundedYear}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600 dark:text-gray-400">Headquarters</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">{softwareReview.headquarters}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600 dark:text-gray-400">Company Size</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">{softwareReview.employeeCount}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600 dark:text-gray-400">Integrations</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">{softwareReview.integrations}+</dd>
                  </div>
                </dl>
              </div>
              
              {/* Popular Integrations */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Integrations</h3>
                <div className="flex flex-wrap gap-2">
                  {softwareReview.popularIntegrations.map((integration) => (
                    <span
                      key={integration}
                      className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Alternatives */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Alternatives</h3>
                <div className="space-y-3">
                  {softwareReview.alternatives.map((alt) => (
                    <Link
                      key={alt.slug}
                      href={`/reviews/${alt.slug}`}
                      className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">{alt.name}</span>
                      <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">{alt.score}/10</span>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/reviews/compare/clickup-vs-monday`}
                  className="mt-4 block w-full text-center py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                >
                  Compare All
                </Link>
              </div>
              
              {/* CTA */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Ready to Get Started?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Try {softwareReview.name} free for 14 days. No credit card required.
                </p>
                <a
                  href={softwareReview.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium w-full justify-center"
                >
                  Start Free Trial
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </a>
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  Special offer: Get 20% off annual plans
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <Link
              href="/reviews/monday-com"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              <span>Monday.com Review</span>
            </Link>
            <Link
              href="/reviews/asana"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <span>Asana Review</span>
              <ChevronRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}