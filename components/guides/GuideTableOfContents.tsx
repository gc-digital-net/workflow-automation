'use client'

import { useState, useEffect } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

interface GuideTableOfContentsProps {
  items: any[]
}

export function GuideTableOfContents({ items }: GuideTableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => 
        document.getElementById(`tool-${item.rank}`)
      ).filter(Boolean)

      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(`tool-${section.id.split('-')[1]}`)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [items])

  const scrollToSection = (rank: number) => {
    const element = document.getElementById(`tool-${rank}`)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className="bg-card border rounded-lg p-6">
      <h3 className="font-bold text-lg mb-4">Quick Navigation</h3>
      <ol className="space-y-2">
        {items?.map((item) => {
          const title = item.software?.name || item.customTitle || 'Untitled'
          const isActive = activeSection === `tool-${item.rank}`
          
          return (
            <li key={item.rank}>
              <button
                onClick={() => scrollToSection(item.rank)}
                className={`w-full text-left flex items-center gap-2 py-2 px-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-semibold' 
                    : 'hover:bg-muted'
                }`}
              >
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  item.rank <= 3 
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold' 
                    : 'bg-muted'
                }`}>
                  {item.rank}
                </span>
                <span className="text-sm line-clamp-1">{title}</span>
                {isActive && <ChevronRightIcon className="h-3 w-3 ml-auto" />}
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}