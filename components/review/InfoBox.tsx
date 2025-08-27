import { ReactNode } from 'react'
import { 
  InformationCircleIcon, 
  LightBulbIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  SparklesIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'

interface InfoBoxProps {
  type?: 'info' | 'tip' | 'warning' | 'success' | 'highlight' | 'note' | 'verdict'
  title?: string
  children: ReactNode
}

export default function InfoBox({ type = 'info', title, children }: InfoBoxProps) {
  const styles = {
    info: {
      container: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      icon: <InformationCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      titleColor: 'text-blue-900 dark:text-blue-300',
      textColor: 'text-blue-800 dark:text-blue-200',
      defaultTitle: 'Info'
    },
    tip: {
      container: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
      icon: <LightBulbIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
      titleColor: 'text-purple-900 dark:text-purple-300',
      textColor: 'text-purple-800 dark:text-purple-200',
      defaultTitle: 'Pro Tip'
    },
    warning: {
      container: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
      icon: <ExclamationTriangleIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
      titleColor: 'text-amber-900 dark:text-amber-300',
      textColor: 'text-amber-800 dark:text-amber-200',
      defaultTitle: 'Warning'
    },
    success: {
      container: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      icon: <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />,
      titleColor: 'text-green-900 dark:text-green-300',
      textColor: 'text-green-800 dark:text-green-200',
      defaultTitle: 'Success'
    },
    highlight: {
      container: 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-indigo-200 dark:border-indigo-800',
      icon: <SparklesIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
      titleColor: 'text-indigo-900 dark:text-indigo-300',
      textColor: 'text-indigo-800 dark:text-indigo-200',
      defaultTitle: 'Highlight'
    },
    note: {
      container: 'bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700',
      icon: <BookOpenIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />,
      titleColor: 'text-gray-900 dark:text-gray-200',
      textColor: 'text-gray-700 dark:text-gray-300',
      defaultTitle: 'Note'
    },
    verdict: {
      container: 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-300 dark:border-blue-700',
      icon: <CheckCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      titleColor: 'text-blue-900 dark:text-blue-300',
      textColor: 'text-blue-800 dark:text-blue-200',
      defaultTitle: 'Final Verdict'
    }
  }

  const style = styles[type]

  return (
    <div className={`my-6 p-5 rounded-xl border-2 ${style.container} shadow-sm`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {style.icon}
        </div>
        <div className="flex-1">
          {(title || style.defaultTitle) && (
            <h4 className={`font-semibold mb-2 ${style.titleColor}`}>
              {title || style.defaultTitle}
            </h4>
          )}
          <div className={`${style.textColor} leading-relaxed prose-sm max-w-none`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}