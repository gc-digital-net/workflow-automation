import { Metadata } from 'next';
import Link from 'next/link';
import { 
  TrophyIcon, 
  StarIcon, 
  CheckIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  ClockIcon,
  ShareIcon,
  BookmarkIcon,
  SparklesIcon
} from '@heroicons/react/24/solid';

interface BestGuidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BestGuidePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  // In production, fetch from Sanity using resolvedParams.slug
  return {
    title: 'Top 10 Project Management Tools for Remote Teams in 2024 | Workflow Automation',
    description: 'Discover the best project management software for distributed teams. Detailed comparison of ClickUp, Monday.com, Asana and more.',
  };
}

// Mock data - will be replaced with Sanity query
const bestGuide = {
  title: 'Top 10 Project Management Tools for Remote Teams in 2024',
  excerpt: 'Discover the best project management software for distributed teams, with detailed comparisons of features, pricing, and integrations.',
  introduction: `Remote work has transformed how teams collaborate, making the right project management tool more critical than ever. After testing 50+ solutions and analyzing thousands of user reviews, we've identified the top 10 project management tools that excel at supporting distributed teams.

Our evaluation focused on key factors essential for remote work: real-time collaboration features, asynchronous communication capabilities, time zone management, and integration ecosystems. Each tool was scored using our comprehensive 15-point framework, with special emphasis on features that matter most to remote teams.`,
  
  methodology: `Our selection process involved:
• Testing each tool with a distributed team across 3 time zones
• Analyzing 10,000+ verified user reviews
• Conducting interviews with 50+ remote team leaders
• Evaluating pricing models for teams of various sizes
• Assessing integration capabilities with remote work tools`,
  
  author: {
    name: 'Sarah Chen',
    role: 'Senior Software Analyst',
    bio: 'Sarah has reviewed over 200 business software tools and specializes in remote work solutions.',
  },
  
  updatedAt: '2024-01-20',
  readTime: 15,
  category: 'Project Management',
  
  tools: [
    {
      rank: 1,
      name: 'ClickUp',
      score: 9.2,
      logo: '/logos/clickup.png',
      tagline: 'One app to replace them all',
      pricing: 'Free - $19/user/mo',
      bestFor: 'Teams wanting maximum flexibility and customization',
      description: `ClickUp stands out as our top choice for remote teams due to its incredible flexibility and comprehensive feature set. The platform offers 15+ different views, allowing team members to work in their preferred style, whether they prefer Kanban boards, Gantt charts, or simple lists.

What sets ClickUp apart for remote teams is its built-in video recording, collaborative docs, and real-time chat features, eliminating the need for multiple tools. The generous free tier supporting unlimited users makes it perfect for growing remote teams on a budget.`,
      keyFeatures: [
        'Real-time collaboration on tasks and docs',
        '24/7 time tracking across time zones',
        'Async video messages and screen recording',
        'Custom automation workflows',
        'Goal tracking and OKRs',
      ],
      pros: [
        'Highly customizable for any workflow',
        'Generous free plan',
        'All-in-one solution reduces tool fatigue',
        'Excellent mobile apps',
      ],
      cons: [
        'Steep learning curve',
        'Can be overwhelming initially',
      ],
      integrations: '1000+',
      slug: 'clickup',
    },
    {
      rank: 2,
      name: 'Monday.com',
      score: 8.9,
      logo: '/logos/monday.png',
      tagline: 'Work OS that powers teams',
      pricing: '$8 - $24/user/mo',
      bestFor: 'Visual teams who value intuitive design',
      description: `Monday.com excels with its visual approach to project management, making it incredibly easy for remote teams to understand project status at a glance. The platform's color-coded boards and intuitive interface reduce the learning curve significantly.

The Work OS concept allows teams to build custom workflows without code, adapting to various industries and use cases. Strong automation features and excellent mobile apps ensure productivity regardless of location.`,
      keyFeatures: [
        'Visual workflow builder',
        'Advanced automation recipes',
        'Time zone display for global teams',
        'Guest access for clients',
        'Custom dashboards and reporting',
      ],
      pros: [
        'Beautiful, intuitive interface',
        'Strong visualization options',
        'Excellent customer support',
        'Quick setup and onboarding',
      ],
      cons: [
        'No true free plan',
        'Can get expensive for larger teams',
      ],
      integrations: '200+',
      slug: 'monday-com',
    },
    {
      rank: 3,
      name: 'Asana',
      score: 8.7,
      logo: '/logos/asana.png',
      tagline: 'Manage your team\'s work, projects, & tasks',
      pricing: 'Free - $30.49/user/mo',
      bestFor: 'Teams prioritizing simplicity and ease of use',
      description: `Asana strikes the perfect balance between functionality and simplicity, making it ideal for remote teams that want powerful features without complexity. Its Timeline view and Portfolios feature provide excellent project visibility across distributed teams.

The platform's focus on reducing work about work resonates strongly with remote teams looking to minimize meetings and status updates. Asana's Forms feature streamlines request intake, while its robust mobile apps keep remote workers connected.`,
      keyFeatures: [
        'Timeline (Gantt) view',
        'Portfolios for multi-project tracking',
        'Forms for work intake',
        'Rules-based automation',
        'Status updates to reduce meetings',
      ],
      pros: [
        'Clean, intuitive interface',
        'Excellent for beginners',
        'Strong mobile apps',
        'Good free tier for small teams',
      ],
      cons: [
        'Limited customization options',
        'Basic reporting on lower tiers',
      ],
      integrations: '270+',
      slug: 'asana',
    },
    {
      rank: 4,
      name: 'Notion',
      score: 8.8,
      logo: '/logos/notion.png',
      tagline: 'Your wiki, docs, & projects. Together.',
      pricing: 'Free - $18/user/mo',
      bestFor: 'Teams needing docs + project management',
      description: `Notion revolutionizes remote work by combining project management with a powerful wiki and documentation system. This all-in-one workspace is perfect for remote teams that value knowledge management alongside task tracking.`,
      keyFeatures: [
        'Integrated wiki and documentation',
        'Database-driven project management',
        'AI-powered writing assistance',
        'Synced blocks for consistency',
        'Public page sharing',
      ],
      pros: [
        'Extremely flexible and powerful',
        'Great for documentation',
        'Strong free tier',
        'Beautiful interface',
      ],
      cons: [
        'Performance issues with large databases',
        'Learning curve for advanced features',
      ],
      integrations: '100+',
      slug: 'notion',
    },
    {
      rank: 5,
      name: 'Jira',
      score: 8.5,
      logo: '/logos/jira.png',
      tagline: 'Plan, track, and release great software',
      pricing: 'Free - $15.25/user/mo',
      bestFor: 'Software development teams using Agile',
      description: `Jira remains the gold standard for software development teams, offering unmatched capabilities for Agile project management. Its deep integration with development tools and advanced workflow customization make it indispensable for technical teams.`,
      keyFeatures: [
        'Scrum and Kanban boards',
        'Advanced workflow automation',
        'Roadmaps and release planning',
        'Deep developer tool integrations',
        'Powerful JQL for custom queries',
      ],
      pros: [
        'Industry standard for dev teams',
        'Powerful automation',
        'Extensive customization',
        'Strong ecosystem',
      ],
      cons: [
        'Complex for non-technical teams',
        'Steep learning curve',
      ],
      integrations: '3000+',
      slug: 'jira',
    },
  ],
  
  comparisonTable: {
    features: [
      'Free Tier Available',
      'Time Tracking',
      'Gantt Charts',
      'Custom Fields',
      'Automation',
      'Mobile Apps',
      'Video Messaging',
      'Wiki/Docs',
      'Guest Access',
      'API Access',
    ],
    tools: {
      'ClickUp': [true, true, true, true, true, true, true, true, true, true],
      'Monday.com': [false, true, true, true, true, true, false, false, true, true],
      'Asana': [true, false, true, true, true, true, false, false, true, true],
      'Notion': [true, false, false, true, false, true, false, true, true, true],
      'Jira': [true, true, true, true, true, true, false, false, true, true],
    },
  },
  
  faq: [
    {
      question: 'What makes a project management tool good for remote teams?',
      answer: 'The best tools for remote teams offer real-time collaboration, async communication features, time zone management, strong mobile apps, and integrations with video conferencing and communication tools.',
    },
    {
      question: 'Should we choose one tool or use multiple specialized tools?',
      answer: 'While specialized tools can excel in specific areas, using an all-in-one solution reduces context switching, simplifies onboarding, and typically costs less than multiple subscriptions.',
    },
    {
      question: 'How important is the free tier for remote teams?',
      answer: 'Free tiers allow teams to test tools thoroughly before committing and can be crucial for bootstrapped startups. However, paid plans often unlock essential features for larger remote teams.',
    },
  ],
  
  conclusion: `Choosing the right project management tool can make or break remote team productivity. While ClickUp tops our list for its flexibility and comprehensive features, the best choice depends on your team's specific needs, technical expertise, and budget.

For maximum flexibility and features, choose ClickUp. For visual simplicity, go with Monday.com. If ease of use is paramount, Asana is your best bet. For teams needing integrated documentation, Notion excels. And for software development teams, Jira remains unmatched.

Remember to take advantage of free trials to test these tools with your actual workflows before committing to a paid plan.`,
};

export default async function BestGuidePage({ params }: BestGuidePageProps) {
  const resolvedParams = await params;
  return (
    <article className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Home
              </Link>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              <Link href="/best" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Best Software
              </Link>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900 dark:text-white">{bestGuide.category}</span>
            </nav>
            
            {/* Title and Meta */}
            <div className="flex items-center gap-3 mb-4">
              <TrophyIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="px-3 py-1 bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 text-sm font-semibold rounded-full">
                BEST OF 2024
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              {bestGuide.title}
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              {bestGuide.excerpt}
            </p>
            
            {/* Meta Info */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{bestGuide.author.name}</p>
                  <p className="text-xs">{bestGuide.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span>Updated {new Date(bestGuide.updatedAt).toLocaleDateString()}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  {bestGuide.readTime} min read
                </span>
              </div>
            </div>
            
            {/* Share Buttons */}
            <div className="mt-6 flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                <ShareIcon className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                <BookmarkIcon className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Table of Contents */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Navigation</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <a href="#introduction" className="text-primary-600 dark:text-primary-400 hover:underline">→ Introduction</a>
              <a href="#methodology" className="text-primary-600 dark:text-primary-400 hover:underline">→ Selection Methodology</a>
              <a href="#tools" className="text-primary-600 dark:text-primary-400 hover:underline">→ Top 10 Tools Ranked</a>
              <a href="#comparison" className="text-primary-600 dark:text-primary-400 hover:underline">→ Feature Comparison</a>
              <a href="#faq" className="text-primary-600 dark:text-primary-400 hover:underline">→ Frequently Asked Questions</a>
              <a href="#conclusion" className="text-primary-600 dark:text-primary-400 hover:underline">→ Final Recommendations</a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Introduction */}
          <section id="introduction">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="whitespace-pre-line text-gray-600 dark:text-gray-400">{bestGuide.introduction}</p>
            </div>
          </section>

          {/* Methodology */}
          <section id="methodology" className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Selection Methodology</h2>
            <p className="whitespace-pre-line text-gray-600 dark:text-gray-400">{bestGuide.methodology}</p>
          </section>

          {/* Ranked Tools */}
          <section id="tools">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Top 10 Tools Ranked</h2>
            <div className="space-y-8">
              {bestGuide.tools.map((tool) => (
                <div key={tool.rank} className="relative">
                  {/* Rank Badge */}
                  <div className="absolute -left-4 top-4 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {tool.rank}
                  </div>
                  
                  <div className="ml-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Tool Header */}
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center">
                            <SparklesIcon className="h-7 w-7 text-gray-500 dark:text-gray-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tool.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{tool.tagline}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <StarIcon className="h-5 w-5 text-yellow-400" />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">{tool.score}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{tool.pricing}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-sm">
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 rounded-full">
                          Best for: {tool.bestFor}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">{tool.integrations} integrations</span>
                      </div>
                    </div>
                    
                    {/* Tool Description */}
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-400 mb-6 whitespace-pre-line">{tool.description}</p>
                      
                      {/* Key Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features</h4>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {tool.keyFeatures.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Pros and Cons */}
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">Pros</h4>
                          <ul className="space-y-2">
                            {tool.pros.map((pro, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3">Cons</h4>
                          <ul className="space-y-2">
                            {tool.cons.map((con, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-red-500">•</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="mt-6 flex gap-4">
                        <Link
                          href={`/reviews/${tool.slug}`}
                          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium"
                        >
                          Read Full Review
                          <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Link>
                        <a
                          href="#"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Try {tool.name} Free
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison Table */}
          <section id="comparison">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                    {Object.keys(bestGuide.comparisonTable.tools).map(tool => (
                      <th key={tool} className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        {tool}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bestGuide.comparisonTable.features.map((feature, i) => (
                    <tr key={feature} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{feature}</td>
                      {Object.entries(bestGuide.comparisonTable.tools).map(([tool, values]) => (
                        <td key={tool} className="text-center py-3 px-4">
                          {values[i] === true ? (
                            <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                          ) : values[i] === false ? (
                            <span className="text-gray-400">—</span>
                          ) : (
                            <span className="text-sm text-gray-600 dark:text-gray-400">{values[i]}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {bestGuide.faq.map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Final Recommendations</h2>
            <p className="whitespace-pre-line text-gray-600 dark:text-gray-400">{bestGuide.conclusion}</p>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Help Choosing?
            </h3>
            <p className="text-primary-100 mb-6">
              Get personalized recommendations based on your team's specific needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools/software-finder"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-primary-50 font-medium"
              >
                <SparklesIcon className="mr-2 h-5 w-5" />
                Use Software Finder
              </Link>
              <Link
                href="/reviews/compare"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 font-medium"
              >
                Compare Tools
              </Link>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}