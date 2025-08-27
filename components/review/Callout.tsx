import { ReactNode } from 'react'

interface CalloutProps {
  variant?: 'primary' | 'secondary' | 'accent'
  children: ReactNode
}

export default function Callout({ variant = 'primary', children }: CalloutProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-l-4 border-blue-500',
    secondary: 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-l-4 border-purple-500',
    accent: 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border-l-4 border-amber-500'
  }

  return (
    <div className={`my-6 p-6 rounded-r-xl ${variants[variant]} shadow-sm`}>
      <div className="prose prose-sm dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  )
}