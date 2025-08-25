export default function SimpleNavigation() {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
      <nav className="flex space-x-8 overflow-x-auto">
        <span className="py-4 px-1 border-b-2 border-primary-800 text-primary-800 dark:border-primary-400 dark:text-primary-400 font-medium whitespace-nowrap">
          Overview
        </span>
        <span className="py-4 px-1 border-b-2 border-transparent text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap cursor-not-allowed opacity-50">
          Features
        </span>
        <span className="py-4 px-1 border-b-2 border-transparent text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap cursor-not-allowed opacity-50">
          Pricing
        </span>
        <span className="py-4 px-1 border-b-2 border-transparent text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap cursor-not-allowed opacity-50">
          Alternatives
        </span>
        <span className="py-4 px-1 border-b-2 border-transparent text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap cursor-not-allowed opacity-50">
          Reviews
        </span>
      </nav>
    </div>
  )
}