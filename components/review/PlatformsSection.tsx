'use client';

import { 
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  CloudIcon,
  ServerIcon,
  CommandLineIcon,
  CpuChipIcon,
  CheckCircleIcon,
  XCircleIcon,
  MinusCircleIcon
} from '@heroicons/react/24/outline';
import { 
  CheckIcon,
  XMarkIcon 
} from '@heroicons/react/24/solid';

interface PlatformData {
  // Desktop & Mobile
  supportedPlatforms?: string[];
  mobileApps?: {
    ios?: boolean | { version?: string; rating?: number; size?: string };
    android?: boolean | { version?: string; rating?: number; size?: string };
  };
  desktopApps?: {
    windows?: boolean | { version?: string; requirements?: string };
    mac?: boolean | { version?: string; requirements?: string };
    linux?: boolean | { distributions?: string[] };
  };
  
  // Web & Browser
  webApp?: boolean;
  browserExtensions?: string[];
  supportedBrowsers?: string[];
  pwa?: boolean;
  
  // Deployment
  deploymentOptions?: string[];
  cloudHosted?: boolean;
  onPremise?: boolean;
  hybrid?: boolean;
  privateCloud?: boolean;
  
  // Developer Tools
  api?: {
    rest?: boolean;
    graphql?: boolean;
    webhooks?: boolean;
  };
  sdks?: string[];
  cli?: boolean;
  integrations?: {
    zapier?: boolean;
    make?: boolean;
    ifttt?: boolean;
  };
  
  // System Requirements
  systemRequirements?: {
    internetSpeed?: string;
    storage?: string;
    ram?: string;
    processor?: string;
  };
}

interface PlatformsSectionProps {
  data: PlatformData;
  className?: string;
}

export default function PlatformsSection({ data, className = '' }: PlatformsSectionProps) {
  // Helper to render availability badge
  const renderAvailability = (available?: boolean | object) => {
    if (available === true) {
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    } else if (available === false) {
      return <XCircleIcon className="h-5 w-5 text-gray-400" />;
    } else if (typeof available === 'object') {
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    }
    return <MinusCircleIcon className="h-5 w-5 text-gray-400" />;
  };

  // Check if we have any platform data
  const hasData = data && (
    data.supportedPlatforms?.length > 0 ||
    data.mobileApps ||
    data.desktopApps ||
    data.webApp ||
    data.deploymentOptions?.length > 0 ||
    data.api ||
    data.sdks?.length > 0
  );

  if (!hasData) {
    return null;
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Platforms & Availability
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Desktop Applications */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <ComputerDesktopIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Desktop Apps</h3>
            </div>
            <div className="space-y-3">
              {data.desktopApps?.windows !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Windows</span>
                  {renderAvailability(data.desktopApps.windows)}
                </div>
              )}
              {data.desktopApps?.mac !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">macOS</span>
                  {renderAvailability(data.desktopApps.mac)}
                </div>
              )}
              {data.desktopApps?.linux !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Linux</span>
                  {renderAvailability(data.desktopApps.linux)}
                </div>
              )}
              {!data.desktopApps && (
                <p className="text-sm text-gray-500 italic">No desktop apps available</p>
              )}
            </div>
          </div>

          {/* Mobile Applications */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <DevicePhoneMobileIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Mobile Apps</h3>
            </div>
            <div className="space-y-3">
              {data.mobileApps?.ios !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">iOS (iPhone/iPad)</span>
                  {renderAvailability(data.mobileApps.ios)}
                </div>
              )}
              {data.mobileApps?.android !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Android</span>
                  {renderAvailability(data.mobileApps.android)}
                </div>
              )}
              {!data.mobileApps && (
                <p className="text-sm text-gray-500 italic">No mobile apps available</p>
              )}
            </div>
          </div>

          {/* Web Access */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <GlobeAltIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Web Access</h3>
            </div>
            <div className="space-y-3">
              {data.webApp !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Web Application</span>
                  {renderAvailability(data.webApp)}
                </div>
              )}
              {data.pwa && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Progressive Web App</span>
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                </div>
              )}
              {data.browserExtensions && data.browserExtensions.length > 0 && (
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 block mb-2">Extensions:</span>
                  <div className="flex flex-wrap gap-1">
                    {data.browserExtensions.map((ext, i) => (
                      <span key={i} className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">
                        {ext}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Deployment Options */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <CloudIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Deployment</h3>
            </div>
            <div className="space-y-3">
              {data.cloudHosted !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Cloud (SaaS)</span>
                  {renderAvailability(data.cloudHosted)}
                </div>
              )}
              {data.onPremise !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">On-Premise</span>
                  {renderAvailability(data.onPremise)}
                </div>
              )}
              {data.hybrid !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Hybrid</span>
                  {renderAvailability(data.hybrid)}
                </div>
              )}
              {data.privateCloud !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Private Cloud</span>
                  {renderAvailability(data.privateCloud)}
                </div>
              )}
              {data.deploymentOptions && data.deploymentOptions.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {data.deploymentOptions.map((opt, i) => (
                    <span key={i} className="inline-block px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded">
                      {opt}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Developer Tools */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <CommandLineIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Developer Tools</h3>
            </div>
            <div className="space-y-3">
              {data.api?.rest && (
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">REST API</span>
                </div>
              )}
              {data.api?.graphql && (
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">GraphQL API</span>
                </div>
              )}
              {data.api?.webhooks && (
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Webhooks</span>
                </div>
              )}
              {data.cli && (
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">CLI Tool</span>
                </div>
              )}
              {data.sdks && data.sdks.length > 0 && (
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 block mb-2">SDKs:</span>
                  <div className="flex flex-wrap gap-1">
                    {data.sdks.map((sdk, i) => (
                      <span key={i} className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">
                        {sdk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* System Requirements */}
          {data.systemRequirements && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <CpuChipIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">System Requirements</h3>
              </div>
              <div className="space-y-2">
                {data.systemRequirements.internetSpeed && (
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-500">Internet</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{data.systemRequirements.internetSpeed}</p>
                  </div>
                )}
                {data.systemRequirements.storage && (
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-500">Storage</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{data.systemRequirements.storage}</p>
                  </div>
                )}
                {data.systemRequirements.ram && (
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-500">RAM</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{data.systemRequirements.ram}</p>
                  </div>
                )}
                {data.systemRequirements.processor && (
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-500">Processor</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{data.systemRequirements.processor}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Supported Platforms List (if available) */}
        {data.supportedPlatforms && data.supportedPlatforms.length > 0 && (
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">All Supported Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {data.supportedPlatforms.map((platform, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <CheckIcon className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{platform}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}