import React from 'react';

export function HeroImagePlaceholder({ name }: { name: string }) {
  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-primary-100 via-blue-100 to-purple-100 dark:from-primary-900/20 dark:via-blue-900/20 dark:to-purple-900/20 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-2xl font-semibold text-gray-600 dark:text-gray-400">{name} Dashboard</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Hero Image Placeholder</p>
        </div>
      </div>
    </div>
  );
}

export function FeatureScreenshotPlaceholder({ feature, index }: { feature: string; index: number }) {
  const icons = ['📈', '🎯', '⚡', '🔧', '📱', '🔒'];
  const gradients = [
    'from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20',
    'from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20',
    'from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20',
    'from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20',
    'from-indigo-100 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/20',
    'from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20',
  ];
  
  return (
    <div className={`relative w-full h-[300px] bg-gradient-to-br ${gradients[index % 6]} rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-3">{icons[index % 6]}</div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">{feature}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Screenshot Placeholder</p>
        </div>
      </div>
    </div>
  );
}

export function IntegrationLogosPlaceholder() {
  const logos = ['🔗', '📧', '💬', '📂', '📊', '🔄', '☁️', '🎨'];
  
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
      {logos.map((logo, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-center h-20">
          <span className="text-2xl">{logo}</span>
        </div>
      ))}
    </div>
  );
}

export function ComparisonChartPlaceholder() {
  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-xl font-semibold text-gray-600 dark:text-gray-400">Comparison Chart</p>
          <div className="mt-4 flex justify-center gap-8">
            <div className="text-center">
              <div className="h-32 w-16 bg-primary-500/20 rounded-t-lg mb-2"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Product A</p>
            </div>
            <div className="text-center">
              <div className="h-40 w-16 bg-primary-500/40 rounded-t-lg mb-2"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Product B</p>
            </div>
            <div className="text-center">
              <div className="h-24 w-16 bg-primary-500/30 rounded-t-lg mb-2"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Product C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardScreenshotPlaceholder() {
  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl">
      {/* Mock browser chrome */}
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white dark:bg-gray-700 rounded px-3 py-1 text-xs text-gray-500 dark:text-gray-400">
              app.platform.com/dashboard
            </div>
          </div>
        </div>
      </div>
      
      {/* Mock dashboard content */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="text-2xl font-bold">2,543</div>
            <div className="text-sm opacity-90">Active Tasks</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="text-2xl font-bold">98.2%</div>
            <div className="text-sm opacity-90">Completion Rate</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="text-2xl font-bold">45</div>
            <div className="text-sm opacity-90">Team Members</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse"></div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkflowDiagramPlaceholder() {
  return (
    <div className="relative w-full h-[300px] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="text-2xl mb-1">📥</div>
            <p className="text-xs">Input</p>
          </div>
          <div className="text-2xl">→</div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="text-2xl mb-1">⚙️</div>
            <p className="text-xs">Process</p>
          </div>
          <div className="text-2xl">→</div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="text-2xl mb-1">✅</div>
            <p className="text-xs">Output</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Grid pattern styles are now inline in the component