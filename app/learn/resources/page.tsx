import Link from 'next/link';
import { 
  BookOpenIcon,
  VideoCameraIcon,
  AcademicCapIcon,
  PresentationChartLineIcon,
  NewspaperIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function ResourcesPage() {
  const resourceTypes = [
    {
      icon: BookOpenIcon,
      title: 'Guides & Tutorials',
      count: 45,
      description: 'Step-by-step guides for automation implementation',
      href: '#guides',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: VideoCameraIcon,
      title: 'Video Library',
      count: 120,
      description: 'Webinars, tutorials, and software walkthroughs',
      href: '#videos',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: PresentationChartLineIcon,
      title: 'Webinars',
      count: 24,
      description: 'Live and recorded expert sessions',
      href: '#webinars',
      color: 'from-red-500 to-red-600',
    },
  ];

  const featuredGuides = [
    {
      title: 'Complete Guide to Workflow Automation',
      description: 'Everything you need to know to get started with automation',
      readTime: '25 min',
      level: 'Beginner',
      href: '/blog/complete-guide-workflow-automation',
    },
    {
      title: 'ROI Calculation for Automation Projects',
      description: 'Learn how to measure and communicate automation value',
      readTime: '15 min',
      level: 'Intermediate',
      href: '/blog/roi-calculation-automation',
    },
    {
      title: 'Choosing Your First Automation Tool',
      description: 'Framework for selecting the right software for your needs',
      readTime: '20 min',
      level: 'Beginner',
      href: '/blog/choosing-first-automation-tool',
    },
  ];

  const recentWebinars = [
    {
      title: 'AI-Powered Workflow Automation',
      date: 'December 15, 2024',
      speaker: 'Dr. Sarah Chen',
      attendees: 1234,
      recording: true,
    },
    {
      title: 'Scaling Automation in Enterprise',
      date: 'December 8, 2024',
      speaker: 'Michael Roberts',
      attendees: 876,
      recording: true,
    },
    {
      title: 'No-Code vs Low-Code Platforms',
      date: 'December 1, 2024',
      speaker: 'Lisa Johnson',
      attendees: 965,
      recording: true,
    },
  ];


  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Free Learning Resources
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Expand your automation knowledge with our comprehensive library of guides, 
              videos, webinars, and research materials.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/learn"
                className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                Explore Learning Hub
              </Link>
              <Link
                href="/learn/certification"
                className="text-base font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Get Certified →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Types Grid */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resourceTypes.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="group relative rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-all bg-white dark:bg-gray-800"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${resource.color} mb-4`}>
                  <resource.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {resource.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {resource.count} resources
                  </span>
                  <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section id="guides" className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Featured Guides
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Start with these essential automation guides
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group rounded-lg bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">
                  <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-800 dark:text-blue-300">
                    {guide.level}
                  </span>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                    {guide.readTime} read
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              View all guides
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Webinars */}
      <section id="webinars" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Recent Webinars
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Watch recorded sessions from industry experts
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {recentWebinars.map((webinar) => (
              <div
                key={webinar.title}
                className="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-500 to-blue-600 p-8 flex items-center justify-center">
                  <VideoCameraIcon className="h-16 w-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {webinar.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {webinar.speaker} • {webinar.date}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {webinar.attendees.toLocaleString()} attendees
                    </span>
                    {webinar.recording && (
                      <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-800 dark:text-green-300">
                        Recording Available
                      </span>
                    )}
                  </div>
                  <button className="mt-4 w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
                    Watch Recording
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Newsletter CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-center text-white">
            <NewspaperIcon className="mx-auto h-12 w-12 mb-4" />
            <h2 className="text-2xl font-bold mb-4">
              Get Weekly Automation Insights
            </h2>
            <p className="mb-6 text-blue-100">
              Join 15,000+ professionals receiving our weekly newsletter with the latest 
              automation trends, tools, and techniques.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}