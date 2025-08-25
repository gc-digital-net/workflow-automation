import Link from 'next/link'

interface ReviewTabsProps {
  currentTab: string
  slug: string
}

export default function ReviewTabs({ currentTab, slug }: ReviewTabsProps) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'alternatives', label: 'Alternatives' },
    { id: 'reviews', label: 'Reviews' }
  ]
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
      <nav className="flex space-x-8 overflow-x-auto">
        {tabs.map(tab => (
          <Link
            key={tab.id}
            href={`/reviews/${slug}?tab=${tab.id}`}
            className={`py-4 px-1 border-b-2 font-medium whitespace-nowrap transition-colors ${
              currentTab === tab.id
                ? 'border-primary-800 text-primary-800 dark:border-primary-400 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}