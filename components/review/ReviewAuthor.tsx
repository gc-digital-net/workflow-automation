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
  author = {
    name: 'Sarah Mitchell',
    role: 'Senior Software Analyst',
    avatar: '/team/sarah-mitchell.jpg',
    bio: 'Sarah has over 8 years of experience testing and implementing project management software for Fortune 500 companies.'
  },
  reviewDate,
  lastUpdated,
  readingTime = 15
}: ReviewAuthorProps) {
  return (
    <div className="my-8 border-t border-b border-gray-200 dark:border-gray-700 py-8">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            {author.avatar ? (
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-gray-500 dark:text-gray-400">
                {author.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-grow">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {author.name}
              </h3>
              <CheckBadgeIcon className="h-5 w-5 text-blue-500" title="Verified Reviewer" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{author.role}</p>
            {author.bio && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{author.bio}</p>
            )}
          </div>

          {/* Review Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>Reviewed: {new Date(reviewDate).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}</span>
            </div>
            {lastUpdated && (
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>Updated: {new Date(lastUpdated).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <DocumentMagnifyingGlassIcon className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Guidelines Link */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link 
              href="/review-guidelines" 
              className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <DocumentMagnifyingGlassIcon className="h-4 w-4" />
              <span>How we test and review software</span>
              <span className="text-gray-400">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}