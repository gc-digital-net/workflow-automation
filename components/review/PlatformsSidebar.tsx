'use client';

import { 
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  CloudIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

interface PlatformsSidebarProps {
  platforms?: string[];
  webApp?: boolean;
  mobileApps?: boolean;
  desktopApps?: boolean;
  api?: boolean;
  integrations?: number | string[];
}

export default function PlatformsSidebar({ 
  platforms = ['Web', 'iOS', 'Android'],
  webApp = true,
  mobileApps = true,
  desktopApps = false,
  api = true,
  integrations
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
        
        {/* Mobile */}
        {mobileApps && (
          <div className="flex items-center gap-3 text-sm">
            <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">iOS & Android</span>
            <CheckIcon className="h-4 w-4 text-green-500 ml-auto" />
          </div>
        )}
        
        {/* Desktop */}
        {desktopApps && (
          <div className="flex items-center gap-3 text-sm">
            <ComputerDesktopIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">Desktop App</span>
            <CheckIcon className="h-4 w-4 text-green-500 ml-auto" />
          </div>
        )}
        
        {/* Cloud Hosted */}
        <div className="flex items-center gap-3 text-sm">
          <CloudIcon className="h-5 w-5 text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300">Cloud Hosted</span>
          <CheckIcon className="h-4 w-4 text-green-500 ml-auto" />
        </div>
        
        {/* API */}
        {api && (
          <div className="flex items-center gap-3 text-sm">
            <CommandLineIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">API Access</span>
            <CheckIcon className="h-4 w-4 text-green-500 ml-auto" />
          </div>
        )}
      </div>
      
      {/* Integrations Count */}
      {integrations && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {typeof integrations === 'number' ? integrations : integrations.length}+
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Integrations</div>
          </div>
        </div>
      )}
    </div>
  );
}