'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CheckIcon, 
  XMarkIcon, 
  PlusIcon,
  MinusIcon,
  MagnifyingGlassIcon,
  ArrowsRightLeftIcon,
  StarIcon,
  SparklesIcon
} from '@heroicons/react/24/solid';

// Mock data - will be replaced with Sanity queries
const availableSoftware = [
  { id: 1, name: 'ClickUp', slug: 'clickup', category: 'Project Management', score: 9.2 },
  { id: 2, name: 'Monday.com', slug: 'monday-com', category: 'Work Management', score: 8.9 },
  { id: 3, name: 'Asana', slug: 'asana', category: 'Project Management', score: 8.7 },
  { id: 4, name: 'Notion', slug: 'notion', category: 'Knowledge Management', score: 8.8 },
  { id: 5, name: 'Jira', slug: 'jira', category: 'Project Management', score: 8.5 },
  { id: 6, name: 'Trello', slug: 'trello', category: 'Project Management', score: 8.3 },
  { id: 7, name: 'Zapier', slug: 'zapier', category: 'Automation', score: 9.0 },
  { id: 8, name: 'Make', slug: 'make', category: 'Automation', score: 8.6 },
];

const comparisonData = {
  'clickup': {
    name: 'ClickUp',
    logo: '/logos/clickup.png',
    score: 9.2,
    pricing: {
      starting: 'Free',
      paid: '$7/user/mo',
    },
    features: {
      'Multiple Views': true,
      'Time Tracking': true,
      'Native Forms': true,
      'Gantt Charts': true,
      'Custom Fields': true,
      'Automation': true,
      'API Access': true,
      'Mobile Apps': true,
      'Integrations': '1000+',
      'Storage': 'Unlimited (paid)',
      'Guest Access': true,
      'White Labeling': false,
      '2FA': true,
      'SSO': 'Business plan',
      'Custom Roles': true,
    },
    pros: ['Highly customizable', 'Great free tier', 'All-in-one solution'],
    cons: ['Steep learning curve', 'Can be overwhelming'],
    bestFor: 'Teams wanting maximum flexibility',
  },
  'monday-com': {
    name: 'Monday.com',
    logo: '/logos/monday.png',
    score: 8.9,
    pricing: {
      starting: '$8/user/mo',
      paid: '$8/user/mo',
    },
    features: {
      'Multiple Views': true,
      'Time Tracking': true,
      'Native Forms': true,
      'Gantt Charts': true,
      'Custom Fields': true,
      'Automation': true,
      'API Access': true,
      'Mobile Apps': true,
      'Integrations': '200+',
      'Storage': '500GB',
      'Guest Access': true,
      'White Labeling': false,
      '2FA': true,
      'SSO': 'Enterprise',
      'Custom Roles': true,
    },
    pros: ['Intuitive interface', 'Great visualizations', 'Strong automation'],
    cons: ['No true free plan', 'Can get expensive'],
    bestFor: 'Visual teams and creative agencies',
  },
  'asana': {
    name: 'Asana',
    logo: '/logos/asana.png',
    score: 8.7,
    pricing: {
      starting: 'Free',
      paid: '$10.99/user/mo',
    },
    features: {
      'Multiple Views': true,
      'Time Tracking': false,
      'Native Forms': true,
      'Gantt Charts': true,
      'Custom Fields': true,
      'Automation': true,
      'API Access': true,
      'Mobile Apps': true,
      'Integrations': '270+',
      'Storage': '100MB/file',
      'Guest Access': true,
      'White Labeling': false,
      '2FA': true,
      'SSO': 'Business plan',
      'Custom Roles': false,
    },
    pros: ['Clean interface', 'Great for beginners', 'Strong mobile apps'],
    cons: ['Limited customization', 'Basic reporting'],
    bestFor: 'Teams prioritizing simplicity',
  },
};

export default function ComparePage() {
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>(['clickup', 'monday-com']);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredSoftware = availableSoftware.filter(
    s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
         !selectedSoftware.includes(s.slug)
  );

  const addSoftware = (slug: string) => {
    if (selectedSoftware.length < 4) {
      setSelectedSoftware([...selectedSoftware, slug]);
      setShowAddModal(false);
      setSearchTerm('');
    }
  };

  const removeSoftware = (slug: string) => {
    setSelectedSoftware(selectedSoftware.filter(s => s !== slug));
  };

  const getFeatureDisplay = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckIcon className="h-5 w-5 text-green-500" />
      ) : (
        <XMarkIcon className="h-5 w-5 text-gray-400" />
      );
    }
    return <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>;
  };

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

      {/* Comparison Table */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-gray-50 dark:bg-gray-800 sticky left-0 z-10">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Features</span>
                  </th>
                  {selectedSoftware.map(slug => {
                    const software = comparisonData[slug as keyof typeof comparisonData];
                    return (
                      <th key={slug} className="p-4 bg-gray-50 dark:bg-gray-800 min-w-[200px]">
                        <div className="relative">
                          <button
                            onClick={() => removeSoftware(slug)}
                            className="absolute -top-2 -right-2 p-1 bg-red-100 dark:bg-red-900/30 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50"
                          >
                            <XMarkIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
                          </button>
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center mb-2">
                              <SparklesIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{software.name}</h3>
                            <div className="flex items-center gap-1 mt-1">
                              <StarIcon className="h-4 w-4 text-yellow-400" />
                              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{software.score}</span>
                            </div>
                            <Link
                              href={`/reviews/${slug}`}
                              className="mt-2 text-xs text-primary-600 dark:text-primary-400 hover:underline"
                            >
                              Read Full Review →
                            </Link>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                  {selectedSoftware.length < 4 && (
                    <th className="p-4 bg-gray-50 dark:bg-gray-800 min-w-[200px]">
                      <button
                        onClick={() => setShowAddModal(true)}
                        className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-400 dark:hover:border-primary-500 transition-colors flex flex-col items-center justify-center"
                      >
                        <PlusIcon className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Add Software</span>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Pricing */}
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-900 sticky left-0">
                    Pricing
                  </td>
                  {selectedSoftware.map(slug => {
                    const software = comparisonData[slug as keyof typeof comparisonData];
                    return (
                      <td key={slug} className="p-4 text-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Starting at</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{software.pricing.starting}</div>
                        {software.pricing.starting === 'Free' && (
                          <div className="text-sm text-gray-500">Paid: {software.pricing.paid}</div>
                        )}
                      </td>
                    );
                  })}
                  {selectedSoftware.length < 4 && <td />}
                </tr>

                {/* Features */}
                {Object.keys(comparisonData.clickup.features).map(feature => (
                  <tr key={feature} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-4 text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-900 sticky left-0">
                      {feature}
                    </td>
                    {selectedSoftware.map(slug => {
                      const software = comparisonData[slug as keyof typeof comparisonData];
                      return (
                        <td key={slug} className="p-4 text-center">
                          {getFeatureDisplay(software.features[feature as keyof typeof software.features])}
                        </td>
                      );
                    })}
                    {selectedSoftware.length < 4 && <td />}
                  </tr>
                ))}

                {/* Best For */}
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-900 sticky left-0">
                    Best For
                  </td>
                  {selectedSoftware.map(slug => {
                    const software = comparisonData[slug as keyof typeof comparisonData];
                    return (
                      <td key={slug} className="p-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{software.bestFor}</p>
                      </td>
                    );
                  })}
                  {selectedSoftware.length < 4 && <td />}
                </tr>

                {/* Pros */}
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-900 sticky left-0">
                    Key Pros
                  </td>
                  {selectedSoftware.map(slug => {
                    const software = comparisonData[slug as keyof typeof comparisonData];
                    return (
                      <td key={slug} className="p-4">
                        <ul className="space-y-1">
                          {software.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    );
                  })}
                  {selectedSoftware.length < 4 && <td />}
                </tr>

                {/* Cons */}
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-900 sticky left-0">
                    Key Cons
                  </td>
                  {selectedSoftware.map(slug => {
                    const software = comparisonData[slug as keyof typeof comparisonData];
                    return (
                      <td key={slug} className="p-4">
                        <ul className="space-y-1">
                          {software.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <MinusIcon className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    );
                  })}
                  {selectedSoftware.length < 4 && <td />}
                </tr>

                {/* CTA */}
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-4 bg-white dark:bg-gray-900 sticky left-0" />
                  {selectedSoftware.map(slug => (
                    <td key={slug} className="p-4 text-center">
                      <a
                        href="#"
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium"
                      >
                        Try {comparisonData[slug as keyof typeof comparisonData].name}
                      </a>
                    </td>
                  ))}
                  {selectedSoftware.length < 4 && <td />}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add Software Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Software to Compare</h3>
            
            {/* Search */}
            <div className="relative mb-4">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search software..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            {/* Software List */}
            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredSoftware.map(software => (
                <button
                  key={software.id}
                  onClick={() => addSoftware(software.slug)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded flex items-center justify-center">
                      <SparklesIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white">{software.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{software.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{software.score}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Actions */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSearchTerm('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popular Comparisons */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Popular Comparisons
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {[
              { title: 'ClickUp vs Monday.com', slug: 'clickup-vs-monday' },
              { title: 'Asana vs Trello', slug: 'asana-vs-trello' },
              { title: 'Notion vs Coda', slug: 'notion-vs-coda' },
              { title: 'Zapier vs Make', slug: 'zapier-vs-make' },
              { title: 'Jira vs Azure DevOps', slug: 'jira-vs-azure-devops' },
              { title: 'Slack vs Microsoft Teams', slug: 'slack-vs-teams' },
            ].map(comparison => (
              <Link
                key={comparison.slug}
                href={`/reviews/compare/${comparison.slug}`}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">{comparison.title}</span>
                  <ArrowsRightLeftIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}