'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import SearchButton from '@/components/search/SearchButton';
import MegaMenu from './MegaMenu';
import { NAVIGATION_ITEMS } from '@/lib/constants';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleMouseEnter = (itemName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(itemName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-secondary-200/20 dark:border-secondary-800/20">
      <nav className="container mx-auto h-20" aria-label="Global">
        <div className="flex h-full items-center justify-between">
          {/* Logo Section with space for company logo */}
          <div className="flex items-center gap-4 lg:flex-1">
            <Link href="/" className="flex items-center gap-3 group">
              {/* Logo placeholder - you can replace with actual logo */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/25 group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-all duration-300">
                <SparklesIcon className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold gradient-text">
                  Workflow
                </span>
                <span className="text-xs text-secondary-500 dark:text-secondary-400 -mt-1">
                  Automation Hub
                </span>
              </div>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center gap-3 lg:hidden">
            <SearchButton />
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-secondary-700 hover:bg-secondary-100 dark:text-secondary-200 dark:hover:bg-secondary-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-10">
            {NAVIGATION_ITEMS.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`inline-flex items-center text-sm font-semibold leading-6 transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400'
                  }`}
                >
                  {item.name}
                  {item.children && (
                    <ChevronDownIcon 
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      }`} 
                      aria-hidden="true" 
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {item.children && (
                    <MegaMenu
                      items={item.children}
                      isOpen={openDropdown === item.name}
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-4">
            <SearchButton />
            <ThemeToggle />
            <Link
              href="/tools/software-finder"
              className="btn btn-primary"
            >
              Find Your Software
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="space-y-2 px-6 py-6">
              {NAVIGATION_ITEMS.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={`block rounded-xl px-4 py-3 text-base font-semibold ${
                      isActive(item.href)
                        ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                        : 'text-secondary-900 hover:bg-secondary-100 dark:text-secondary-100 dark:hover:bg-secondary-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block rounded-lg px-4 py-2 text-sm text-secondary-600 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/tools/software-finder"
                className="btn btn-primary w-full mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Your Software
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}