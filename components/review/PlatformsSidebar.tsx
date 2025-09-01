'use client';

import { 
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  CloudIcon,
  CommandLineIcon,
  PuzzlePieceIcon,
  ServerIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

interface PlatformsSidebarProps {
  webApp?: boolean;
  mobileApps?: {
    ios?: boolean;
    android?: boolean;
  };
  desktopApps?: {
    windows?: boolean;
    mac?: boolean;
    linux?: boolean;
  };
  browserExtensions?: string[];
  api?: {
    rest?: boolean;
    graphql?: boolean;
    webhooks?: boolean;
  };
  deploymentOptions?: string[];
}

export default function PlatformsSidebar({ 
  webApp = true,
  mobileApps,
  desktopApps,
  browserExtensions,
  api,
  deploymentOptions
}: PlatformsSidebarProps) {
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold mb-4">Platforms</h3>
      
      <div className="space-y-3">
        {/* Web Access */}
        {webApp && (
          <div className="flex items-center gap-3 text-sm">
            <GlobeAltIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">Web Browser</span>
            <CheckIcon className="h-4 w-4 text-green-500 ml-auto" />
          </div>
        )}
        
        {/* Mobile Apps - Show individual platforms */}
        {mobileApps?.ios && (
          <div className="flex items-center gap-3 text-sm">
            <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">iOS App</span>
            <CheckIcon className="h-4 w-4 text-green-500 ml-auto" />
          </div>
        )}
        {mobileApps?.android && (
          <div className="flex items-center gap-3 text-sm">
            <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">Android App</span>
            <CheckIcon className="h-4 w-4 text-green-500 ml-auto" />
          </div>
        )}
        
        {/* Desktop Apps - Show individual platforms */}
        {desktopApps?.windows && (
          <div className="flex items-center gap-3 text-sm">
            <ComputerDesktopIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">Windows</span>
            <CheckIcon className="h-4 w-4 text-green-500 ml-auto" />
          </div>
        )}
        {desktopApps?.mac && (
          <div className="flex items-center gap-3 text-sm">
            <ComputerDesktopIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">macOS</span>
            <CheckIcon className="h-4 w-4 text-green-500 ml-auto" />
          </div>
        )}
        {desktopApps?.linux && (
          <div className="flex items-center gap-3 text-sm">
            <ComputerDesktopIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">Linux</span>
            <CheckIcon className="h-4 w-4 text-green-500 ml-auto" />
          </div>
        )}
        
        {/* Browser Extensions */}
        {browserExtensions && browserExtensions.length > 0 && (
          <div className="flex items-center gap-3 text-sm">
            <PuzzlePieceIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">
              {browserExtensions.join(', ')} Extension{browserExtensions.length > 1 ? 's' : ''}
            </span>
            <CheckIcon className="h-4 w-4 text-green-500 ml-auto" />
          </div>
        )}
        
        {/* Deployment Options */}
        {deploymentOptions && deploymentOptions.length > 0 && deploymentOptions.map((option, idx) => (
          <div key={idx} className="flex items-center gap-3 text-sm">
            {option.includes('Cloud') || option.includes('SaaS') ? (
              <CloudIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <ServerIcon className="h-5 w-5 text-gray-400" />
            )}
            <span className="text-gray-700 dark:text-gray-300">{option}</span>
            <CheckIcon className="h-4 w-4 text-green-500 ml-auto" />
          </div>
        ))}
        
        {/* API Access - Show specific types */}
        {api?.rest && (
          <div className="flex items-center gap-3 text-sm">
            <CommandLineIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">REST API</span>
            <CheckIcon className="h-4 w-4 text-green-500 ml-auto" />
          </div>
        )}
        {api?.graphql && (
          <div className="flex items-center gap-3 text-sm">
            <CommandLineIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">GraphQL API</span>
            <CheckIcon className="h-4 w-4 text-green-500 ml-auto" />
          </div>
        )}
        {api?.webhooks && (
          <div className="flex items-center gap-3 text-sm">
            <CommandLineIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">Webhooks</span>
            <CheckIcon className="h-4 w-4 text-green-500 ml-auto" />
          </div>
        )}
      </div>
    </div>
  );
}