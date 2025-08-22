import Link from 'next/link';
import { 
  AcademicCapIcon,
  ClockIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  StarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function CertificationPage() {
  const modules = [
    {
      number: '01',
      title: 'Workflow Automation Fundamentals',
      duration: '3 hours',
      lessons: 8,
      topics: [
        'Introduction to workflow automation',
        'Identifying automation opportunities',
        'ROI calculation methods',
        'Common automation patterns',
      ],
    },
    {
      number: '02',
      title: 'Process Analysis and Optimization',
      duration: '4 hours',
      lessons: 10,
      topics: [
        'Process mapping techniques',
        'Bottleneck identification',
        'Process optimization strategies',
        'Documentation best practices',
      ],
    },
    {
      number: '03',
      title: 'Software Selection and Implementation',
      duration: '5 hours',
      lessons: 12,
      topics: [
        'Evaluation frameworks',
        'Vendor comparison methods',
        'Implementation planning',
        'Risk management',
      ],
    },
    {
      number: '04',
      title: 'Integration Strategies',
      duration: '4 hours',
      lessons: 9,
      topics: [
        'API fundamentals',
        'Integration patterns',
        'Data synchronization',
        'Error handling',
      ],
    },
    {
      number: '05',
      title: 'ROI Measurement and KPIs',
      duration: '3 hours',
      lessons: 7,
      topics: [
        'KPI selection',
        'Measurement frameworks',
        'Reporting strategies',
        'Continuous improvement',
      ],
    },
    {
      number: '06',
      title: 'Change Management',
      duration: '3 hours',
      lessons: 8,
      topics: [
        'Stakeholder management',
        'Training strategies',
        'Adoption techniques',
        'Resistance handling',
      ],
    },
    {
      number: '07',
      title: 'Advanced Automation Techniques',
      duration: '4 hours',
      lessons: 10,
      topics: [
        'AI and machine learning',
        'Robotic process automation',
        'Complex workflow design',
        'Future trends',
      ],
    },
  ];

  const benefits = [
    {
      icon: CheckBadgeIcon,
      title: 'Industry Recognition',
      description: 'Earn a credential recognized by leading automation professionals',
    },
    {
      icon: UserGroupIcon,
      title: 'Expert Network',
      description: 'Join an exclusive community of certified automation experts',
    },
    {
      icon: DocumentTextIcon,
      title: 'Comprehensive Resources',
      description: 'Access templates, tools, and guides for real-world implementation',
    },
    {
      icon: StarIcon,
      title: 'Career Advancement',
      description: 'Stand out in your field with proven automation expertise',
    },
  ];

  const testimonials = [
    {
      quote: "This certification transformed how I approach automation projects. The ROI framework alone paid for the course.",
      author: "David Martinez",
      role: "Operations Manager",
      company: "TechCorp",
    },
    {
      quote: "The most comprehensive automation training I've found. Practical, actionable, and immediately applicable.",
      author: "Lisa Chen",
      role: "Process Improvement Lead",
      company: "Global Logistics Inc",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-300 mb-4">
                Professional Certification
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                Master Workflow Automation Certification
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Become a certified workflow automation expert with our comprehensive 
                7-module program. Learn to analyze, implement, and optimize automation 
                solutions that deliver measurable business results.
              </p>
              
              <div className="mt-8 flex items-center gap-x-6">
                <Link
                  href="/learn/certification/enroll"
                  className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
                >
                  Enroll Now - $497
                </Link>
                <Link
                  href="#curriculum"
                  className="text-base font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  View Curriculum →
                </Link>
              </div>
              
              <div className="mt-8 flex items-center gap-x-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  26 hours of content
                </div>
                <div className="flex items-center">
                  <VideoCameraIcon className="h-5 w-5 mr-2" />
                  64 video lessons
                </div>
                <div className="flex items-center">
                  <AcademicCapIcon className="h-5 w-5 mr-2" />
                  Certificate included
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">What You'll Learn</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-6 w-6 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Analyze and optimize business processes</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Select and implement automation tools</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Measure and communicate ROI</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Lead organizational change</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Comprehensive Curriculum
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              7 modules designed to take you from fundamentals to mastery
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {modules.map((module) => (
              <div
                key={module.number}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-4xl font-bold text-gray-200 dark:text-gray-700 mr-4">
                      {module.number}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {module.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {module.duration} • {module.lessons} lessons
                      </p>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {module.topics.map((topic) => (
                    <li key={topic} className="flex items-start">
                      <ArrowRightIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Get Certified?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Join the elite group of certified automation professionals
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500 text-white mb-4">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
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
              What Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="rounded-2xl bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
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

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Master Workflow Automation?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Enroll today and transform your career with automation expertise
            </p>
            
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                href="/learn/certification/enroll"
                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Enroll Now - $497
              </Link>
              <Link
                href="/contact"
                className="text-base font-semibold text-white hover:text-blue-100 transition-colors"
              >
                Have Questions? →
              </Link>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-x-8 text-sm">
              <div className="flex items-center">
                <CheckBadgeIcon className="h-5 w-5 mr-2" />
                Lifetime access
              </div>
              <div className="flex items-center">
                <CheckBadgeIcon className="h-5 w-5 mr-2" />
                30-day guarantee
              </div>
              <div className="flex items-center">
                <CheckBadgeIcon className="h-5 w-5 mr-2" />
                Certificate included
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}