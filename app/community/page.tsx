import Image from 'next/image';
import Link from 'next/link';
import { 
  UsersIcon, 
  CalendarIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function CommunityPage() {
  const features = [
    {
      icon: UsersIcon,
      title: 'Active Community',
      description: 'Join 10,000+ automation professionals sharing insights and best practices',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Expert Support',
      description: 'Get answers from experienced practitioners and certified consultants',
    },
    {
      icon: CalendarIcon,
      title: 'Monthly Events',
      description: 'Attend live workshops, Q&A sessions, and software demonstrations',
    },
    {
      icon: AcademicCapIcon,
      title: 'Learning Resources',
      description: 'Access to templates, guides, and certification course materials',
    },
    {
      icon: SparklesIcon,
      title: 'Early Access',
      description: 'Be first to see new reviews, tools, and exclusive deals',
    },
  ];

  const membershipTiers = [
    {
      name: 'Community Free',
      price: '0',
      description: 'Get started with basic community access',
      features: [
        'Access to community forum',
        'Monthly newsletter',
        'Basic workflow templates',
        'Software comparison tools',
      ],
      cta: 'Join Free',
      popular: false,
    },
    {
      name: 'Pro Member',
      price: '19',
      description: 'Full access to resources and events',
      features: [
        'Everything in Free',
        'Slack community access',
        'Live monthly workshops',
        'Premium templates library',
        'Exclusive software deals',
        'Priority support',
        'Certification course discount',
      ],
      cta: 'Start 14-Day Trial',
      popular: true,
    },
    {
      name: 'Team Access',
      price: '99',
      description: 'Perfect for teams and agencies',
      features: [
        'Everything in Pro',
        'Up to 10 team members',
        'Custom training sessions',
        'White-label resources',
        'API access',
        'Dedicated account manager',
        'Custom integration support',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Join the Workflow Automation Community
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Connect with thousands of automation professionals. Share experiences, learn from experts, 
            and accelerate your automation journey together.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/community/membership"
              className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              Become a Member
            </Link>
            <Link
              href="/community/events"
              className="text-base font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              View Upcoming Events →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Our community provides comprehensive resources and support for your automation journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
              >
                <feature.icon className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Choose Your Membership
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Select the plan that best fits your needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {membershipTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl p-8 ${
                  tier.popular
                    ? 'ring-2 ring-blue-600 dark:ring-blue-400 bg-white dark:bg-gray-800 shadow-xl'
                    : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }`}
              >
                {tier.popular && (
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    Most Popular
                  </p>
                )}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {tier.name}
                </h3>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline">
                  <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                    ${tier.price}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </p>
                <ul className="mt-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg
                        className="h-6 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/community/membership"
                  className={`mt-8 block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold transition-colors ${
                    tier.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-500'
                      : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100'
                  }`}
                >
                  {tier.cta}
                </Link>
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
              Ready to Join Our Community?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Start your free trial today and connect with automation experts worldwide
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                href="/community/membership"
                className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="/learn"
                className="text-base font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Explore Learning Resources →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}