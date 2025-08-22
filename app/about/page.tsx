import Image from 'next/image';
import Link from 'next/link';
import { 
  ChartBarIcon,
  LightBulbIcon,
  UserGroupIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

export default function AboutPage() {
  const values = [
    {
      icon: ChartBarIcon,
      title: 'Data-Driven',
      description: 'Every recommendation is backed by thorough research and real-world testing',
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description: 'We stay ahead of automation trends to bring you the latest solutions',
    },
    {
      icon: UserGroupIcon,
      title: 'Community',
      description: 'Building a supportive community of automation professionals worldwide',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Results',
      description: 'Focused on helping businesses achieve measurable automation success',
    },
  ];

  const stats = [
    { label: 'Years of Experience', value: '10+' },
    { label: 'Software Reviewed', value: '300+' },
    { label: 'Businesses Helped', value: '10,000+' },
    { label: 'Community Members', value: '15,000+' },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'Former VP of Operations with 15 years in workflow automation',
      image: '/team/sarah.jpg',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Research',
      bio: 'Software architect specializing in enterprise automation',
      image: '/team/michael.jpg',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Community Manager',
      bio: 'Building and nurturing our global automation community',
      image: '/team/emily.jpg',
    },
    {
      name: 'David Kim',
      role: 'Lead Analyst',
      bio: 'Expert in software evaluation and comparison methodologies',
      image: '/team/david.jpg',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              About Workflow Automation
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 lg:max-w-3xl">
              We're on a mission to democratize workflow automation, making it accessible and 
              understandable for businesses of all sizes. Our platform provides unbiased reviews, 
              practical tools, and expert guidance to help you transform your operations.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                To empower businesses with the knowledge and tools they need to successfully 
                implement workflow automation, saving time, reducing costs, and improving productivity.
              </p>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                We believe that every business, regardless of size or technical expertise, 
                deserves access to high-quality automation insights and resources. That's why 
                we've built a comprehensive platform that combines in-depth software reviews, 
                practical tools, and a supportive community.
              </p>
              <div className="mt-8">
                <Link
                  href="/reviews"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Explore our software reviews →
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">What Sets Us Apart</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% independent and unbiased reviews</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Hands-on testing of every platform</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Real user feedback and case studies</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Continuous updates and monitoring</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center"
              >
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500 text-white mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              The experts behind Workflow Automation
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="text-center"
              >
                <div className="mx-auto h-32 w-32 rounded-full bg-gray-300 dark:bg-gray-700 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Start Your Automation Journey
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Join thousands of businesses transforming their operations with workflow automation
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                href="/tools/software-finder"
                className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                Find Your Software
              </Link>
              <Link
                href="/community"
                className="text-base font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Join Community →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}