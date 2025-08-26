import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon, CheckBadgeIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface ReviewAuthorProps {
  author?: {
    name: string
    role: string
    avatar?: string
    bio?: string
  }
  reviewDate: string
  lastUpdated?: string
  readingTime?: number
}

export default function ReviewAuthor({ 
  author,
  reviewDate,
  lastUpdated,
  readingTime = 15
}: ReviewAuthorProps) {
  // Use default author if none provided or if author is null
  const reviewAuthor = author || {
    name: 'Sarah Mitchell',
    role: 'Senior Software Analyst',
    avatar: '/team/sarah-mitchell.jpg',
    bio: 'Sarah has over 8 years of experience testing and implementing project management software for Fortune 500 companies.'
  }
  
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 py-5 mt-2 border-t border-gray-200 dark:border-gray-700">
      {/* Left side - Author info */}
      <div className="flex items-center gap-3">
        {/* Author Avatar */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
          {reviewAuthor.avatar ? (
            <Image
              src={reviewAuthor.avatar}
              alt={reviewAuthor.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-gray-500 dark:text-gray-400">
              {reviewAuthor.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
        </div>

        {/* Author Name and Role */}
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {reviewAuthor.name}
            </p>
            <CheckBadgeIcon className="h-4 w-4 text-blue-500" title="Verified Reviewer" />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{reviewAuthor.role}</p>
        </div>
      </div>

      {/* Right side - Meta info */}
      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <span>Reviewed: {new Date(reviewDate).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })}</span>
        </div>
        {lastUpdated && (
          <>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span>Updated: {new Date(lastUpdated).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}</span>
            </div>
          </>
        )}
        <span>•</span>
        <Link 
          href="/review-guidelines" 
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          Review Guidelines
        </Link>
      </div>
    </div>
  )
}