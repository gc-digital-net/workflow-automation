'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import { useRouter } from 'next/navigation';
import {
  CheckIcon,
  XMarkIcon,
  StarIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/solid';

interface Software {
  _id: string;
  name: string;
  slug: { current: string };
  logo?: any;
  tagline?: string;
  overallScore?: number;
  scores?: {
    easeOfUse?: number;
    features?: number;
    value?: number;
    support?: number;
    integrations?: number;
  };
  pricing?: Array<{
    plan: string;
    price: string;
    billingPeriod?: string;
    features?: string[];
  }>;
  pros?: string[];
  cons?: string[];
  integrations?: string[];
  popularIntegrations?: string[];
  supportedPlatforms?: string[];
  deploymentOptions?: string[];
  affiliateLink?: string;
  quickInfo?: {
    startingPrice?: string;
  };
  categories?: Array<{
    name: string;
    slug: { current: string };
  }>;
}

interface ComparisonTableProps {
  availableSoftware: Software[];
  initialSelectedSoftware: Software[];
  initialSelectedSlugs: string[];
}

export default function ComparisonTable({
  availableSoftware,
  initialSelectedSoftware,
  initialSelectedSlugs,
}: ComparisonTableProps) {
  const router = useRouter();
  const [selectedSoftware, setSelectedSoftware] = useState<Software[]>(initialSelectedSoftware);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Update URL when selection changes
  useEffect(() => {
    const slugs = selectedSoftware.filter(Boolean).map(s => s.slug.current);
    if (slugs.length > 0) {
      router.push(`/reviews/compare?tools=${slugs.join(',')}`, { scroll: false });
    }
  }, [selectedSoftware, router]);

  // Filter available software for modal
  const filteredSoftware = availableSoftware.filter(
    s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
         !selectedSoftware.some(selected => selected?._id === s._id)
  );

  // Add software to comparison
  const addSoftware = (software: Software) => {
    if (selectedSoftware.length < 4) {
      setSelectedSoftware([...selectedSoftware, software]);
      setShowAddModal(false);
      setSearchTerm('');
    }
  };

  // Remove software from comparison
  const removeSoftware = (id: string) => {
    setSelectedSoftware(selectedSoftware.filter(s => s?._id !== id));
  };

  // Get score color
  const getScoreColor = (score?: number) => {
    if (!score) return 'text-gray-500';
    if (score >= 9) return 'text-green-600 dark:text-green-400';
    if (score >= 7) return 'text-blue-600 dark:text-blue-400';
    if (score >= 5) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Get starting price display
  const getStartingPrice = (software: Software) => {
    if (software.quickInfo?.startingPrice) {
      return software.quickInfo.startingPrice;
    }
    if (software.pricing && software.pricing.length > 0) {
      const price = software.pricing[0].price;
      if (price === 0) {
        return 'Free';
      } else if (price) {
        return `$${price}/user/mo`;
      }
    }
    return 'Contact for pricing';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Comparison Table - Show when there's at least one software selected */}
      {selectedSoftware.length > 0 && (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-4 bg-gray-50 dark:bg-gray-800 sticky left-0 z-10 w-48">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Compare</span>
              </th>
              {selectedSoftware.map((software, idx) => software && (
                <th key={software._id} className="p-4 bg-gray-50 dark:bg-gray-800 min-w-[200px]">
                  <div className="relative">
                    <button
                      onClick={() => removeSoftware(software._id)}
                      className="absolute -top-2 -right-2 p-1 bg-red-100 dark:bg-red-900/30 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 z-10"
                      aria-label={`Remove ${software.name} from comparison`}
                    >
                      <XMarkIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </button>
                    <div className="flex flex-col items-center">
                      {software.logo ? (
                        <div className="w-16 h-16 relative mb-2">
                          <Image
                            src={urlFor(software.logo).url()}
                            alt={`${software.name} logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2 flex items-center justify-center">
                          <span className="text-2xl font-bold text-gray-400">
                            {software.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <h3 className="font-semibold text-gray-900 dark:text-white">{software.name}</h3>
                      {software.overallScore && (
                        <div className="flex items-center gap-1 mt-1">
                          <StarIcon className="h-4 w-4 text-yellow-400" />
                          <span className={`text-sm font-bold ${getScoreColor(software.overallScore)}`}>
                            {software.overallScore.toFixed(1)}
                          </span>
                        </div>
                      )}
                      <Link
                        href={`/reviews/${software.slug.current}`}
                        className="mt-2 text-xs text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        Read Full Review →
                      </Link>
                    </div>
                  </div>
                </th>
              ))}
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
            {/* Description */}
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-900 sticky left-0">
                Description
              </td>
              {selectedSoftware.map((software) => software && (
                <td key={software._id} className="p-4 text-sm text-gray-600 dark:text-gray-400">
                  {software.tagline || 'No description available'}
                </td>
              ))}
              {selectedSoftware.length < 4 && <td />}
            </tr>

            {/* Starting Price */}
            <tr className="border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
              <td className="p-4 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 sticky left-0">
                Starting Price
              </td>
              {selectedSoftware.map((software) => software && (
                <td key={software._id} className="p-4 text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getStartingPrice(software)}
                  </div>
                </td>
              ))}
              {selectedSoftware.length < 4 && <td />}
            </tr>

            {/* Scores Section */}
            <tr className="border-t-2 border-gray-300 dark:border-gray-600">
              <td colSpan={selectedSoftware.length + 2} className="p-2 bg-gray-100 dark:bg-gray-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Detailed Scores
                </span>
              </td>
            </tr>

            {/* Individual Scores */}
            {[
              { key: 'easeOfUse', label: 'Ease of Use' },
              { key: 'features', label: 'Features' },
              { key: 'value', label: 'Value for Money' },
              { key: 'support', label: 'Customer Support' },
              { key: 'integrations', label: 'Integrations' }
            ].map(({ key, label }) => (
              <tr key={key} className="border-t border-gray-200 dark:border-gray-700">
                <td className="p-4 font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-900 sticky left-0">
                  {label}
                </td>
                {selectedSoftware.map((software) => software && (
                  <td key={software._id} className="p-4 text-center">
                    <span className={`text-lg font-semibold ${getScoreColor(software.scores?.[key as keyof typeof software.scores])}`}>
                      {software.scores?.[key as keyof typeof software.scores]?.toFixed(1) || 'N/A'}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">/10</span>
                  </td>
                ))}
                {selectedSoftware.length < 4 && <td />}
              </tr>
            ))}

            {/* Pros Section */}
            <tr className="border-t-2 border-gray-300 dark:border-gray-600">
              <td colSpan={selectedSoftware.length + 2} className="p-2 bg-gray-100 dark:bg-gray-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Pros & Cons
                </span>
              </td>
            </tr>

            {/* Pros */}
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-900 sticky left-0">
                Key Pros
              </td>
              {selectedSoftware.map((software) => software && (
                <td key={software._id} className="p-4">
                  {software.pros && software.pros.length > 0 ? (
                    <ul className="space-y-2">
                      {software.pros.slice(0, 3).map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-sm text-gray-500">No pros listed</span>
                  )}
                </td>
              ))}
              {selectedSoftware.length < 4 && <td />}
            </tr>

            {/* Cons */}
            <tr className="border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
              <td className="p-4 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 sticky left-0">
                Key Cons
              </td>
              {selectedSoftware.map((software) => software && (
                <td key={software._id} className="p-4">
                  {software.cons && software.cons.length > 0 ? (
                    <ul className="space-y-2">
                      {software.cons.slice(0, 3).map((con, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <MinusIcon className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{con}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-sm text-gray-500">No cons listed</span>
                  )}
                </td>
              ))}
              {selectedSoftware.length < 4 && <td />}
            </tr>

            {/* Features Section */}
            <tr className="border-t-2 border-gray-300 dark:border-gray-600">
              <td colSpan={selectedSoftware.length + 2} className="p-2 bg-gray-100 dark:bg-gray-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Platform & Deployment
                </span>
              </td>
            </tr>

            {/* Supported Platforms */}
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-900 sticky left-0">
                Platforms
              </td>
              {selectedSoftware.map((software) => software && (
                <td key={software._id} className="p-4">
                  {software.supportedPlatforms && software.supportedPlatforms.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {software.supportedPlatforms.map((platform, i) => (
                        <span key={i} className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">
                          {platform}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Not specified</span>
                  )}
                </td>
              ))}
              {selectedSoftware.length < 4 && <td />}
            </tr>

            {/* Integrations */}
            <tr className="border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
              <td className="p-4 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 sticky left-0">
                Integrations
              </td>
              {selectedSoftware.map((software) => software && (
                <td key={software._id} className="p-4 text-center">
                  {software.popularIntegrations && software.popularIntegrations.length > 0 ? (
                    <div>
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {software.popularIntegrations.length}+
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Including: {software.popularIntegrations.slice(0, 3).join(', ')}
                      </div>
                    </div>
                  ) : software.integrations ? (
                    <div>
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {software.integrations.length}+
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Not specified</span>
                  )}
                </td>
              ))}
              {selectedSoftware.length < 4 && <td />}
            </tr>

            {/* CTA Row */}
            <tr className="border-t-2 border-gray-300 dark:border-gray-600">
              <td className="p-4 bg-white dark:bg-gray-900 sticky left-0" />
              {selectedSoftware.map((software) => software && (
                <td key={software._id} className="p-4 text-center bg-gray-50 dark:bg-gray-800">
                  <a
                    href={software.affiliateLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium transition-colors"
                  >
                    Try {software.name}
                  </a>
                </td>
              ))}
              {selectedSoftware.length < 4 && <td />}
            </tr>
          </tbody>
        </table>
      </div>
      )}

      {/* Add Software Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add Software to Compare
            </h3>
            
            {/* Search */}
            <div className="relative mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search software..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                autoFocus
              />
            </div>
            
            {/* Software List */}
            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredSoftware.map(software => (
                <button
                  key={software._id}
                  onClick={() => addSoftware(software)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {software.logo ? (
                      <div className="w-8 h-8 relative">
                        <Image
                          src={urlFor(software.logo).url()}
                          alt={`${software.name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-400">
                          {software.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white">{software.name}</div>
                      {software.categories && software.categories.length > 0 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {software.categories[0].name}
                        </div>
                      )}
                    </div>
                  </div>
                  {software.overallScore && (
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {software.overallScore.toFixed(1)}
                      </span>
                    </div>
                  )}
                </button>
              ))}
              {filteredSoftware.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No software found matching "{searchTerm}"
                </div>
              )}
            </div>
            
            {/* Actions */}
            <div className="mt-4">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSearchTerm('');
                }}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium text-gray-700 dark:text-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minimum selection message */}
      {selectedSoftware.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Start Your Comparison
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Select at least 2 software tools to compare their features, pricing, and capabilities
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Software to Compare
          </button>
        </div>
      )}
    </div>
  );
}