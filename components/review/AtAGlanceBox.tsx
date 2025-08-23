import { CheckIcon, XMarkIcon, ClockIcon, BuildingOfficeIcon, SparklesIcon } from '@heroicons/react/24/outline'

interface AtAGlanceProps {
  bottomLine?: string
  setupTime?: string
  bestForCompanySize?: string
  standoutFeature?: string
  pros?: string[]
  cons?: string[]
  bestFor?: string[]
  notIdealFor?: string[]
}

export default function AtAGlanceBox({
  bottomLine,
  setupTime,
  bestForCompanySize,
  standoutFeature,
  pros = [],
  cons = [],
  bestFor = [],
  notIdealFor = []
}: AtAGlanceProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">At a Glance</h2>
      
      {/* Bottom Line */}
      {bottomLine && (
        <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
          <p className="text-gray-800 dark:text-gray-200 font-medium">{bottomLine}</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {setupTime && (
          <div className="flex items-center gap-3">
            <ClockIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Setup Time</p>
              <p className="font-semibold text-gray-900 dark:text-white">{setupTime}</p>
            </div>
          </div>
        )}
        
        {bestForCompanySize && (
          <div className="flex items-center gap-3">
            <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Best For</p>
              <p className="font-semibold text-gray-900 dark:text-white">{bestForCompanySize}</p>
            </div>
          </div>
        )}
        
        {standoutFeature && (
          <div className="flex items-center gap-3">
            <SparklesIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Standout Feature</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">{standoutFeature}</p>
            </div>
          </div>
        )}
      </div>

      {/* Pros and Cons */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {pros.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              Pros
            </h3>
            <ul className="space-y-2">
              {pros.slice(0, 3).map((pro, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <CheckIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {cons.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <XMarkIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              Cons
            </h3>
            <ul className="space-y-2">
              {cons.slice(0, 3).map((con, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <XMarkIcon className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Best For / Not Ideal For */}
      <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        {bestFor.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-green-700 dark:text-green-400 mb-2">Best For:</h3>
            <ul className="space-y-1">
              {bestFor.slice(0, 3).map((item, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {notIdealFor.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-red-700 dark:text-red-400 mb-2">Not Ideal For:</h3>
            <ul className="space-y-1">
              {notIdealFor.slice(0, 3).map((item, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}