import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ChartBarIcon,
  LightBulbIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'About Us | Workflow Automation',
  description: 'Learn about our mission to democratize workflow automation and help businesses transform their operations through unbiased software reviews and expert guidance.',
};

export default function AboutPage() {
  const values = [
    {
      icon: ChartBarIcon,
      title: 'Data-Driven',
      description: 'Every recommendation is backed by thorough research and real-world testing',
      color: 'bg-blue-500',
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description: 'We stay ahead of automation trends to bring you the latest solutions',
      color: 'bg-purple-500',
    },
    {
      icon: UserGroupIcon,
      title: 'Community',
      description: 'Building a supportive community of automation professionals worldwide',
      color: 'bg-green-500',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Results',
      description: 'Focused on helping businesses achieve measurable automation success',
      color: 'bg-orange-500',
    },
  ];

  const stats = [
    { label: 'Years of Experience', value: '10+', color: 'text-blue-600' },
    { label: 'Software Reviewed', value: '300+', color: 'text-purple-600' },
    { label: 'Businesses Helped', value: '10K+', color: 'text-green-600' },
    { label: 'Community Members', value: '15K+', color: 'text-orange-600' },
  ];

  const features = [
    '100% independent and unbiased reviews',
    'Hands-on testing of every platform',
    'Real user feedback and case studies',
    'Continuous updates and monitoring',
    'Expert guidance and support',
    'Transparent affiliate disclosures'
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                Empowering Businesses Through
                <span className="text-primary-600 dark:text-primary-400"> Automation</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                We're on a mission to democratize workflow automation, making it accessible and 
                understandable for businesses of all sizes. Our platform provides unbiased reviews, 
                practical tools, and expert guidance to help you transform your operations.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/reviews"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  Explore Reviews
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-2xl blur-3xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
                <ul className="space-y-4">
                  {features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 mt-0.5 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <p className={`text-4xl sm:text-5xl font-bold ${stat.color} dark:opacity-90`}>
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

      {/* Mission Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Mission & Vision
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              To empower every business with the knowledge and tools they need to successfully 
              implement workflow automation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                <StarIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Approach</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We believe in transparency, thorough testing, and real-world validation. Every review 
                is based on hands-on experience, user feedback, and objective criteria.
              </p>
              <ul className="space-y-2">
                {['In-depth testing', 'User interviews', 'Performance analysis', 'Regular updates'].map((item) => (
                  <li key={item} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                <UserGroupIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Community</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Join thousands of professionals who are transforming their businesses through 
                automation. Share experiences, get advice, and learn from real implementations.
              </p>
              <ul className="space-y-2">
                {['Expert guidance', 'Peer support', 'Case studies', 'Best practices'].map((item) => (
                  <li key={item} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className={`mx-auto h-16 w-16 ${value.color} rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg`}>
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Simplified */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Built by Automation Experts
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our team combines decades of experience in software development, business operations, 
              and workflow automation to bring you the most comprehensive reviews and insights.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">50+</div>
                <p className="text-gray-600 dark:text-gray-300">Years Combined Experience</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">1000+</div>
                <p className="text-gray-600 dark:text-gray-300">Software Implementations</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">24/7</div>
                <p className="text-gray-600 dark:text-gray-300">Community Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl px-6 py-12 sm:px-12 sm:py-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
              Join thousands of businesses that have successfully automated their workflows 
              with our guidance and recommendations.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/reviews"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-primary-600 bg-white hover:bg-gray-100 transition-colors"
              >
                Browse Software Reviews
              </Link>
              <Link
                href="/reviews/compare"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-primary-700 transition-colors"
              >
                Compare Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}