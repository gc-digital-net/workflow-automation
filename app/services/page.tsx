import Image from 'next/image';
import Link from 'next/link';
import { 
  ChartBarIcon,
  CogIcon,
  UserGroupIcon,
  DocumentMagnifyingGlassIcon,
  AcademicCapIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

export default function ServicesPage() {
  const services = [
    {
      icon: DocumentMagnifyingGlassIcon,
      title: 'Software Selection Consultation',
      description: 'Get expert guidance on choosing the right automation tools for your specific needs',
      price: 'From $299',
      features: [
        'Requirements analysis',
        'Vendor comparison',
        'Custom recommendations',
        'Implementation roadmap',
      ],
      href: '/services/consultation',
    },
    {
      icon: ChartBarIcon,
      title: 'Workflow Audit & Optimization',
      description: 'Comprehensive analysis of your current processes with optimization recommendations',
      price: 'From $999',
      features: [
        'Process mapping',
        'Bottleneck identification',
        'Automation opportunities',
        'ROI projections',
      ],
      href: '/services/audit',
    },
    {
      icon: UserGroupIcon,
      title: 'Team Training & Workshops',
      description: 'Empower your team with hands-on automation training and best practices',
      price: 'From $1,999',
      features: [
        'Custom curriculum',
        'Hands-on exercises',
        'Tool-specific training',
        'Certification included',
      ],
      href: '/services/training',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Implementation Support',
      description: 'End-to-end support for deploying and integrating automation solutions',
      price: 'Custom pricing',
      features: [
        'Project planning',
        'Technical setup',
        'Integration support',
        'Change management',
      ],
      href: '/services/implementation',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery Call',
      description: 'We start with a free 30-minute consultation to understand your needs and challenges',
    },
    {
      step: '02',
      title: 'Custom Proposal',
      description: 'Receive a detailed proposal with scope, timeline, and investment options',
    },
    {
      step: '03',
      title: 'Engagement Kickoff',
      description: 'Begin with a comprehensive assessment and clear project milestones',
    },
    {
      step: '04',
      title: 'Implementation',
      description: 'Execute the plan with regular check-ins and progress updates',
    },
    {
      step: '05',
      title: 'Success Measurement',
      description: 'Track results and ensure you achieve your automation goals',
    },
  ];

  const testimonials = [
    {
      quote: "The workflow audit revealed automation opportunities that are saving us 30 hours per week.",
      author: "Jennifer Martinez",
      role: "Operations Director",
      company: "TechStart Inc.",
    },
    {
      quote: "Their software selection consultation helped us avoid a costly mistake and find the perfect solution.",
      author: "Michael Chen",
      role: "CEO",
      company: "Growth Agency",
    },
    {
      quote: "The team training transformed how we approach automation. ROI was evident within weeks.",
      author: "Sarah Thompson",
      role: "VP of Technology",
      company: "Enterprise Corp",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Professional Automation Services
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From strategy to implementation, we help organizations transform their operations 
            with intelligent workflow automation solutions.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/contact"
              className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link
              href="#services"
              className="text-base font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              View Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Comprehensive solutions to accelerate your automation journey
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="relative rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-all bg-white dark:bg-gray-800"
              >
                <div className="flex items-start justify-between mb-6">
                  <service.icon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {service.price}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Process
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              A proven methodology for successful automation implementation
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            {process.map((step, index) => (
              <div key={step.step} className="relative">
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 dark:bg-gray-700" />
                )}
                <div className="text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-xl mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Client Success Stories
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              See how we've helped organizations transform their operations
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="rounded-2xl bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-700 dark:text-gray-300 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 sm:py-32 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why Choose Our Services?
              </h2>
              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                      <CogIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">10+ Years of Experience</h3>
                    <p className="mt-1 text-blue-100">
                      Deep expertise in workflow automation across industries
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                      <ChartBarIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Proven ROI</h3>
                    <p className="mt-1 text-blue-100">
                      Average 300% ROI within the first year of implementation
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                      <AcademicCapIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Certified Experts</h3>
                    <p className="mt-1 text-blue-100">
                      Team certified in 50+ automation platforms and tools
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6">Get Started Today</h3>
              <p className="mb-6 text-blue-100">
                Schedule a free consultation to discuss your automation needs and discover 
                how we can help transform your operations.
              </p>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-blue-200 text-white border border-white/30 focus:outline-none focus:border-white"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-blue-200 text-white border border-white/30 focus:outline-none focus:border-white"
                />
                <select className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:border-white">
                  <option value="">Select Service Interest</option>
                  <option value="consultation">Software Consultation</option>
                  <option value="audit">Workflow Audit</option>
                  <option value="training">Team Training</option>
                  <option value="implementation">Implementation Support</option>
                </select>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Request Consultation
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}