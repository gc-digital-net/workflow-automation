import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircleIcon, DocumentMagnifyingGlassIcon, UserGroupIcon, ShieldCheckIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Review Guidelines - How We Test Software | Workflow Automation',
  description: 'Learn about our comprehensive software review process, testing methodology, and evaluation criteria. Transparency in how we test and rate automation tools.',
}

export default function ReviewGuidelinesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Review Guidelines</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Transparency in Testing: How We Evaluate Software
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <ShieldCheckIcon className="h-5 w-5" />
            <span>Independent & Unbiased Reviews</span>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Our Commitment to Quality Reviews</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            At Workflow Automation, we take our responsibility seriously when reviewing software. Our team follows a rigorous, 
            standardized process to ensure every review is fair, comprehensive, and helpful for our readers.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            We purchase and test software with our own resources, spending a minimum of 2 weeks with each tool before 
            publishing our findings. This ensures we understand not just the features, but the real-world experience of using 
            the software daily.
          </p>
        </section>

        {/* Testing Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Testing Process</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <ClockIcon className="h-8 w-8 text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">1. Initial Setup (Days 1-2)</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Account creation and onboarding experience</li>
                    <li>• Initial configuration and customization</li>
                    <li>• Team member invitation process</li>
                    <li>• Integration setup with common tools</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <DocumentMagnifyingGlassIcon className="h-8 w-8 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">2. Deep Testing (Days 3-10)</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Feature exploration and limits testing</li>
                    <li>• Real project implementation</li>
                    <li>• Performance under various loads</li>
                    <li>• Mobile app testing (if available)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <UserGroupIcon className="h-8 w-8 text-purple-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">3. Team Collaboration (Days 11-14)</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Multi-user scenarios</li>
                    <li>• Permission and role testing</li>
                    <li>• Communication features</li>
                    <li>• Collaboration workflows</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <ChartBarIcon className="h-8 w-8 text-orange-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">4. Analysis & Scoring</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Compare against competitors</li>
                    <li>• Value for money assessment</li>
                    <li>• Support quality evaluation</li>
                    <li>• Final scoring and write-up</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Evaluation Criteria */}
        <section className="mb-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">15-Point Evaluation Framework</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Every software is evaluated across 15 key criteria, each scored from 1-10:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              'Ease of Use',
              'Feature Set',
              'Integration Capabilities',
              'Pricing Value',
              'Customer Support',
              'Security & Compliance',
              'Scalability',
              'Performance',
              'Mobile Access',
              'Documentation',
              'Learning Curve',
              'Customization',
              'Reporting & Analytics',
              'Free Tier/Trial',
              'Overall Value'
            ].map((criteria, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                <span className="font-medium">{criteria}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Review Team */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Review Team</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our reviews are conducted by a team of experienced professionals with backgrounds in project management, 
              software development, and business operations.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Review Team Expertise</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• 10+ years in project management</li>
                  <li>• Experience with 50+ automation tools</li>
                  <li>• Certifications in Agile, PMP, and Scrum</li>
                  <li>• Background in enterprise software</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Testing Environment</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Real business scenarios</li>
                  <li>• Teams of 5-20 members</li>
                  <li>• Cross-platform testing</li>
                  <li>• Multiple industry use cases</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Disclosure */}
        <section className="mb-12 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-8 border border-yellow-200 dark:border-yellow-800">
          <h2 className="text-2xl font-bold mb-4">Transparency & Disclosure</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              <strong className="text-gray-900 dark:text-gray-100">Affiliate Relationships:</strong> We may earn commissions 
              from software purchases made through our links. This never affects our ratings or recommendations.
            </p>
            <p>
              <strong className="text-gray-900 dark:text-gray-100">Review Updates:</strong> We update our reviews quarterly 
              or when significant changes occur to ensure information remains accurate.
            </p>
            <p>
              <strong className="text-gray-900 dark:text-gray-100">No Pay-for-Play:</strong> We never accept payment for 
              positive reviews. Our opinions are based solely on our testing experience.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Questions About Our Process?</h2>
          <p className="mb-6">
            We believe in complete transparency. If you have any questions about how we review software, we'd love to hear from you.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link 
              href="/reviews" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Read Our Reviews
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}