import { Metadata } from 'next';
import Link from 'next/link';
import { 
  AcademicCapIcon,
  PlayCircleIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckBadgeIcon,
  StarIcon,
  ArrowRightIcon,
  SparklesIcon,
  BookOpenIcon,
  UsersIcon,
  VideoCameraIcon
} from '@heroicons/react/24/solid';

export const metadata: Metadata = {
  title: 'Learn Workflow Automation | Courses & Resources',
  description: 'Master workflow automation with our comprehensive certification course, mini-courses, templates, and resources. Transform your skills and career.',
};

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <AcademicCapIcon className="h-16 w-16 text-white/90" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Master Workflow Automation
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Transform your career with expert-led courses, practical templates, and hands-on training
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/learn/certification"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-primary-50 font-semibold text-lg"
              >
                Start Certification Course
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="#courses"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 font-semibold text-lg"
              >
                Explore All Courses
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-white/90">
              <div>
                <div className="text-3xl font-bold">5,000+</div>
                <div className="text-sm">Students Enrolled</div>
              </div>
              <div>
                <div className="text-3xl font-bold">4.9/5</div>
                <div className="text-sm">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm">Hours of Content</div>
              </div>
              <div>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm">Practical Focus</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Certification Course */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 p-8 lg:p-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <CheckBadgeIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 text-sm font-semibold rounded-full">
                    CERTIFICATION COURSE
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Workflow Automation Certification
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Comprehensive 7-module course covering everything from fundamentals to advanced automation techniques. 
                  Get certified and stand out in your career.
                </p>
                
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">What You'll Learn:</h3>
                <ul className="space-y-2 mb-6">
                  {[
                    'Workflow Automation Fundamentals',
                    'Process Analysis and Optimization',
                    'Software Selection and Implementation',
                    'Integration Strategies',
                    'ROI Measurement and KPIs',
                    'Change Management',
                    'Advanced Automation Techniques',
                  ].map((module, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckBadgeIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">Module {i + 1}: {module}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">30+ hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <VideoCameraIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">Live Q&A sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">Community access</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Link
                    href="/learn/certification"
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold"
                  >
                    Enroll Now - $497
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/learn/certification#curriculum"
                    className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                  >
                    View Full Curriculum →
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                  <PlayCircleIcon className="h-20 w-20 text-gray-400" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 max-w-xs">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Sarah Chen</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Lead Instructor</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    "This course transformed how I approach automation in my organization."
                  </p>
                  <div className="flex items-center gap-0.5 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini-Courses */}
      <section id="courses" className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Focused Mini-Courses
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Deep-dive into specific topics with our expert-led mini-courses
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Automation ROI Mastery',
                description: 'Learn to calculate and present ROI for automation initiatives',
                duration: '60 minutes',
                price: '$67',
                level: 'Intermediate',
                students: 1250,
              },
              {
                title: 'Software Selection Framework',
                description: 'Master the art of choosing the right automation tools',
                duration: '45 minutes',
                price: '$47',
                level: 'Beginner',
                students: 2100,
              },
              {
                title: 'Change Management for Automation',
                description: 'Successfully manage organizational change during automation',
                duration: '90 minutes',
                price: '$97',
                level: 'Advanced',
                students: 890,
              },
              {
                title: 'Integration Best Practices',
                description: 'Connect your tools and systems like a pro',
                duration: '60 minutes',
                price: '$67',
                level: 'Intermediate',
                students: 1500,
              },
              {
                title: 'AI-Powered Workflow Design',
                description: 'Leverage AI to design intelligent automation workflows',
                duration: '75 minutes',
                price: '$87',
                level: 'Advanced',
                students: 650,
              },
              {
                title: 'Automation for Small Teams',
                description: 'Practical automation strategies for teams under 10',
                duration: '45 minutes',
                price: '$47',
                level: 'Beginner',
                students: 3200,
              },
            ].map((course, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}>
                      {course.level}
                    </span>
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">{course.price}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <UsersIcon className="h-4 w-4" />
                      {course.students.toLocaleString()} students
                    </span>
                  </div>
                  
                  <Link
                    href={`/learn/mini-courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block w-full text-center py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates & Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Templates */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <DocumentTextIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Templates Library</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Ready-to-use templates to accelerate your automation journey
              </p>
              
              <div className="space-y-4">
                {[
                  'Workflow Audit Checklist',
                  'Software Evaluation Scorecard',
                  'ROI Calculation Spreadsheet',
                  'Implementation Project Plan',
                  'Change Management Communications',
                  'Training Materials Template',
                ].map((template) => (
                  <div key={template} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">{template}</span>
                    </div>
                    <button className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium">
                      Download
                    </button>
                  </div>
                ))}
              </div>
              
              <Link
                href="/learn/templates"
                className="inline-flex items-center mt-6 text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                View All Templates
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            {/* Free Resources */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <BookOpenIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Free Resources</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Guides, checklists, and tools to support your learning
              </p>
              
              <div className="space-y-4">
                {[
                  { title: 'Beginner\'s Guide to Automation', type: 'PDF Guide', pages: 25 },
                  { title: 'Automation Readiness Assessment', type: 'Interactive Tool', pages: null },
                  { title: 'Top 50 Automation Use Cases', type: 'PDF Guide', pages: 40 },
                  { title: 'Integration Planning Workbook', type: 'Workbook', pages: 15 },
                  { title: 'ROI Calculator Tool', type: 'Excel Tool', pages: null },
                  { title: 'Vendor Comparison Matrix', type: 'Template', pages: null },
                ].map((resource) => (
                  <div key={resource.title} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{resource.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {resource.type} {resource.pages && `• ${resource.pages} pages`}
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium">
                      Get Free
                    </button>
                  </div>
                ))}
              </div>
              
              <Link
                href="/learn/resources"
                className="inline-flex items-center mt-6 text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                Browse All Resources
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Student Success */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Student Success Stories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              See how our courses have transformed careers and businesses
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: 'Michael Torres',
                role: 'Operations Manager',
                company: 'TechCorp',
                testimonial: 'The certification course gave me the confidence and skills to lead our automation initiative. We\'ve saved 30% in operational costs.',
                rating: 5,
              },
              {
                name: 'Emily Rodriguez',
                role: 'Process Analyst',
                company: 'FinanceHub',
                testimonial: 'The mini-courses are perfect for targeted learning. I improved our software selection process and found tools that fit perfectly.',
                rating: 5,
              },
              {
                name: 'David Kim',
                role: 'IT Director',
                company: 'RetailPlus',
                testimonial: 'Comprehensive, practical, and immediately applicable. This is the best investment I\'ve made in my professional development.',
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 italic">"{testimonial.testimonial}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SparklesIcon className="h-12 w-12 text-white/90 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Start Your Automation Journey Today
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with our expert training
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/learn/certification"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-primary-50 font-semibold text-lg"
            >
              Get Certified Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/learn/resources"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 font-semibold text-lg"
            >
              Explore Free Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}