'use client';

import { ArrowUpIcon } from '@heroicons/react/24/outline';

export function ScrollToTopButton() {
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-primary-600 to-cyan-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
    >
      <ArrowUpIcon className="w-4 h-4" />
      Back to Top
    </button>
  );
}