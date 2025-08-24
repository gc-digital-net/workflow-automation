'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  NewspaperIcon,
  TrophyIcon,
  CalculatorIcon,
  MagnifyingGlassIcon,
  WrenchIcon,
  UserGroupIcon,
  CalendarIcon,
  SparklesIcon,
  BookOpenIcon,
  LightBulbIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';

const menuIcons: Record<string, any> = {
  'All Reviews': ChartBarIcon,
  'Categories': DocumentTextIcon,
  'Compare Tools': CommandLineIcon,
  'Top Rated': TrophyIcon,
  'All Articles': BookOpenIcon,
  'Guides': LightBulbIcon,
  'News': NewspaperIcon,
  'Top Software': SparklesIcon,
  'ROI Calculator': CalculatorIcon,
  'Software Finder': MagnifyingGlassIcon,
  'All Tools': WrenchIcon,
  'Overview': UserGroupIcon,
  'Membership': SparklesIcon,
  'Events': CalendarIcon,
};

const menuDescriptions: Record<string, string> = {
  'All Reviews': 'Browse our complete database of software reviews',
  'Categories': 'Find software by industry and use case',
  'Compare Tools': 'Side-by-side comparisons of top tools',
  'Top Rated': 'Highest-rated automation software',
  'All Articles': 'Latest insights and automation strategies',
  'Guides': 'Step-by-step tutorials and how-tos',
  'News': 'Industry news and updates',
  'Top Software': 'Curated lists of best tools',
  'ROI Calculator': 'Calculate your automation savings',
  'Software Finder': 'Get personalized recommendations',
  'All Tools': 'Interactive tools and resources',
  'Overview': 'Join our automation community',
  'Membership': 'Premium access and benefits',
  'Events': 'Webinars and virtual meetups',
};

interface MegaMenuProps {
  items: Array<{
    name: string;
    href: string;
  }>;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function MegaMenu({ items, isOpen, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 z-10 mt-3 w-full max-w-md origin-top-left rounded-xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-4">
        <div className="grid gap-3">
          {items.map((item) => {
            const Icon = menuIcons[item.name] || SparklesIcon;
            const description = menuDescriptions[item.name];
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                    <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {item.name}
                  </p>
                  {description && (
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                      {description}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Optional featured section for some menus */}
      {items[0]?.name === 'All Reviews' && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-4">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <SparklesIcon className="h-4 w-4 text-primary-500" />
            <span className="font-medium">300+ Software Analyzed</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}