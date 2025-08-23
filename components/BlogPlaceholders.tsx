import React from 'react';
import { CalendarIcon, ClockIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';

export function BlogHeroPlaceholder() {
  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-2xl font-semibold">Featured Article</p>
          <p className="text-sm mt-2 opacity-80">Hero Image Placeholder</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  );
}

export function ArticleImagePlaceholder({ title }: { title?: string }) {
  const gradients = [
    'from-blue-400 to-purple-500',
    'from-green-400 to-blue-500',
    'from-purple-400 to-pink-500',
    'from-yellow-400 to-red-500',
    'from-indigo-400 to-purple-500',
    'from-pink-400 to-rose-500',
  ];
  
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
  
  return (
    <div className={`relative w-full h-full bg-gradient-to-br ${randomGradient} flex items-center justify-center`}>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="text-center text-white relative">
        <div className="text-4xl mb-2">📄</div>
        {title && <p className="text-sm opacity-80 px-4">{title}</p>}
      </div>
    </div>
  );
}

export function AuthorAvatarPlaceholder({ name }: { name?: string }) {
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'AU';
  
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
      {initials}
    </div>
  );
}

export function CategoryBadge({ category, color = 'primary' }: { category: string; color?: string }) {
  const colorClasses = {
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    pink: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary}`}>
      <TagIcon className="w-3 h-3 mr-1" />
      {category}
    </span>
  );
}

export function ReadingTimeBadge({ time = 5 }: { time?: number }) {
  return (
    <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
      <ClockIcon className="w-4 h-4 mr-1" />
      {time} min read
    </span>
  );
}

export function PopularPostCard({ title, index }: { title: string; index: number }) {
  return (
    <div className="flex items-start gap-4 group cursor-pointer">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
        {index}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2">
          {title}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          <CalendarIcon className="w-3 h-3 inline mr-1" />
          {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export function NewsletterCard() {
  return (
    <div className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl p-6 text-white">
      <div className="text-3xl mb-3">📬</div>
      <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
      <p className="text-sm opacity-90 mb-4">
        Get the latest automation tips and software reviews delivered to your inbox.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-3 py-2 rounded-lg bg-white/20 backdrop-blur-sm placeholder-white/70 text-white border border-white/30"
        />
        <button className="px-4 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-white/90 transition-colors">
          Subscribe
        </button>
      </div>
      <p className="text-xs mt-3 opacity-80">No spam, unsubscribe anytime.</p>
    </div>
  );
}

export function TableOfContents({ sections }: { sections: string[] }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 sticky top-24">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="text-xl mr-2">📑</span>
        Table of Contents
      </h3>
      <nav className="space-y-2">
        {sections.map((section, i) => (
          <a
            key={i}
            href={`#section-${i}`}
            className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 pl-4 border-l-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors"
          >
            {section}
          </a>
        ))}
      </nav>
    </div>
  );
}

export function RelatedPostCard({ title, excerpt }: { title: string; excerpt: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-lg transition-all cursor-pointer">
      <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
        <ArticleImagePlaceholder title={title} />
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-2 line-clamp-2">
          {title}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {excerpt}
        </p>
      </div>
    </div>
  );
}