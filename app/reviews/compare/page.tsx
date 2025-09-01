import { Suspense } from 'react';
import { client, urlFor } from '@/lib/sanity';
import ComparisonTable from './ComparisonTable';
import { 
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';

// Fetch all available software for comparison
async function getAvailableSoftware() {
  const query = `*[_type == "software"] | order(overallScore desc) {
    _id,
    name,
    slug,
    logo,
    overallScore,
    categories[]-> {
      name,
      slug
    }
  }`;
  
  return await client.fetch(query);
}

// Fetch detailed software data for comparison
async function getSoftwareDetails(slugs: string[]) {
  if (!slugs || slugs.length === 0) return [];
  
  const query = `*[_type == "software" && slug.current in $slugs] {
    _id,
    name,
    slug,
    logo,
    tagline,
    overallScore,
    scores,
    pricing,
    pros,
    cons,
    integrations,
    popularIntegrations,
    supportedPlatforms,
    deploymentOptions,
    platformInfo,
    affiliateLink,
    quickInfo,
    companyInfo,
    securityInfo,
    supportInfo,
    categories[]-> {
      name,
      slug
    }
  }`;
  
  return await client.fetch(query, { slugs });
}

// Popular comparisons data
const popularComparisons = [
  { 
    title: 'ClickUp vs Monday.com', 
    tools: ['clickup', 'monday-com'],
    description: 'Project management powerhouses'
  },
  { 
    title: 'Asana vs Trello', 
    tools: ['asana', 'trello'],
    description: 'Simple vs powerful task management'
  },
  { 
    title: 'Notion vs Coda', 
    tools: ['notion', 'coda'],
    description: 'All-in-one workspace solutions'
  },
  { 
    title: 'Zapier vs Make', 
    tools: ['zapier', 'make'],
    description: 'Automation platform comparison'
  },
  { 
    title: 'Jira vs Azure DevOps', 
    tools: ['jira', 'azure-devops'],
    description: 'Developer-focused project tools'
  },
  { 
    title: 'Slack vs Microsoft Teams', 
    tools: ['slack', 'microsoft-teams'],
    description: 'Team communication platforms'
  },
];

export default async function ComparePage({
  searchParams,
}: {
  searchParams: { tools?: string };
}) {
  // Parse tools from URL parameters
  const toolSlugs = searchParams.tools?.split(',').filter(Boolean) || [];
  
  // Fetch data
  const [availableSoftware, selectedSoftwareData] = await Promise.all([
    getAvailableSoftware(),
    getSoftwareDetails(toolSlugs)
  ]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <ArrowsRightLeftIcon className="h-12 w-12 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Compare Software Side-by-Side
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Compare features, pricing, and ratings to find the perfect tool for your team
            </p>
          </div>
        </div>
      </section>

      {/* Main Comparison Component */}
      <Suspense fallback={
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      }>
        <ComparisonTable 
          availableSoftware={availableSoftware}
          initialSelectedSoftware={selectedSoftwareData}
          initialSelectedSlugs={toolSlugs}
        />
      </Suspense>

      {/* Popular Comparisons */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Popular Comparisons
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {popularComparisons.map((comparison) => (
              <Link
                key={comparison.tools.join('-')}
                href={`/reviews/compare?tools=${comparison.tools.join(',')}`}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">{comparison.title}</span>
                  <ArrowsRightLeftIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{comparison.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}