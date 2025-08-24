import { Metadata } from 'next';
import Link from 'next/link';
import { StarIcon, SparklesIcon, CurrencyDollarIcon, BeakerIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { getSoftware } from '@/lib/sanity-queries';
import { urlFor } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Software Reviews | In-Depth Analysis & Ratings',
  description: 'Comprehensive reviews of workflow automation, project management, and business software. Compare features, pricing, and find the perfect tool for your needs.',
};

const categories = [
  'All Software',
  'Project Management',
  'Automation',
  'Work Management',
  'CRM',
  'Knowledge Management',
  'Database',
  'Communication',
  'HR Tools',
];

function ScoreBar({ score, label }: { score: number; label: string }) {
  const percentage = (score / 10) * 100;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-600 dark:text-gray-400 w-20">{label}</span>
      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-900 dark:text-white w-8">{score}</span>
    </div>
  );
}

export default async function ReviewsPage() {
  // Fetch real data from Sanity
  const softwareData = await getSoftware();
  
  // Transform Sanity data to match our component structure
  const softwareReviews = softwareData.map((software: any) => ({
    id: software._id,
    name: software.name,
    tagline: software.tagline || 'Powerful automation software',
    logo: software.logo,
    category: software.categories?.[0] || 'Software',
    overallScore: software.overallScore || 8.0,
    scores: {
      features: software.scores?.features || 8.0,
      easeOfUse: software.scores?.easeOfUse || 8.0,
      value: software.scores?.pricing || software.scores?.value || 8.0,
      support: software.scores?.support || 8.0,
    },
    pricing: software.pricing && software.pricing.length > 0 && software.pricing[0].price 
      ? `$${software.pricing[0].price}/mo` 
      : 'Free',
    integrations: software.integrationsCount || software.integrations?.count || 100,
    freeTier: software.pricingDetails?.hasFreeTier || software.hasFreeTrial || false,
    slug: software.slug?.current || software.name.toLowerCase().replace(/\s+/g, '-'),
    bestFor: software.verdict || 'Teams looking for powerful automation',
    updatedAt: software.lastUpdated || new Date().toISOString(),
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Software Reviews & Ratings
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              In-depth analysis of top business software tools. Compare features, pricing, and find your perfect match.
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 flex gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search software by name or category..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{softwareReviews.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Software Reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">15</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Review Criteria</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">50K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hours Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">2024</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Latest Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="py-6 border-b border-gray-200 dark:border-gray-700 sticky top-16 bg-white dark:bg-gray-900 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    category === 'All Software'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                <AdjustmentsHorizontalIcon className="h-4 w-4" />
                <span className="text-sm">Filters</span>
              </button>
              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <span className="text-sm">Sort by: Highest Rated</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {softwareReviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No software reviews available yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {softwareReviews.map((software) => (
                <Link
                  key={software.id}
                  href={`/reviews/${software.slug}`}
                  className="group block"
                >
                  <article className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {software.logo ? (
                            <img 
                              src={urlFor(software.logo).width(48).height(48).url()} 
                              alt={software.name}
                              className="w-12 h-12 object-contain bg-white rounded-lg p-1"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center">
                              <SparklesIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                              {software.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{software.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {software.overallScore.toFixed(1)}
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon 
                                key={i} 
                                className={`h-3 w-3 ${
                                  i < Math.floor(software.overallScore / 2)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {software.tagline}
                      </p>
                    </div>
                    
                    {/* Scores */}
                    <div className="p-6 space-y-3 flex-1">
                      <ScoreBar score={software.scores.features} label="Features" />
                      <ScoreBar score={software.scores.easeOfUse} label="Ease of Use" />
                      <ScoreBar score={software.scores.value} label="Value" />
                      <ScoreBar score={software.scores.support} label="Support" />
                    </div>
                    
                    {/* Quick Info */}
                    <div className="p-6 pt-0">
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">{software.pricing}</span>
                          </div>
                          {software.freeTier && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full">
                              Free Tier
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <BeakerIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">{software.integrations}+</span>
                        </div>
                      </div>
                      
                      {/* Best For */}
                      <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Best For:</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{software.bestFor}</p>
                      </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Updated {new Date(software.updatedAt).toLocaleDateString()}
                        </span>
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:underline">
                          Read Review →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
          
          {/* Load More - only show if we have reviews */}
          {softwareReviews.length > 0 && softwareReviews.length >= 6 && (
            <div className="mt-12 text-center">
              <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Use our AI-powered Software Finder to get personalized recommendations based on your specific needs.
          </p>
          <Link
            href="/tools/software-finder"
            className="inline-flex items-center px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-primary-50 font-medium"
          >
            Try Software Finder
            <SparklesIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}