import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
})

const asanaReview = {
  _type: 'software',
  name: 'Asana',
  slug: {
    _type: 'slug',
    current: 'asana'
  },
  tagline: 'Work on big ideas, without the busywork',
  shortDescription: 'Asana is a leading work management platform that helps teams organize, track, and manage their work. Known for its intuitive interface and powerful workflow capabilities.',
  verdict: 'Best for teams seeking a balance between ease of use and powerful features. Excellent for cross-functional collaboration without overwhelming complexity.',
  
  // Content Mode
  contentMode: 'automated',
  
  // At-a-Glance
  atAGlance: {
    bottomLine: 'Asana offers the best balance of usability and functionality. While more expensive than some competitors, its polished interface and thoughtful features justify the cost for most teams.',
    setupTime: '1-2 hours',
    bestForCompanySize: '10-1000 employees',
    industryFocus: ['Marketing', 'Product Development', 'Operations', 'Creative Services', 'Consulting'],
    standoutFeature: 'Timeline view with intelligent dependency management'
  },
  
  // Quick Stats
  quickStats: {
    totalUsers: '2.5M+ paying users',
    founded: 2008,
    lastFundingRound: 'Series F - $150M (2018), Direct Listing NYSE:ASAN (2020)',
    awards: [
      'Leader in G2 Grid for Project Management 2024',
      'Gartner Peer Insights Customer Choice 2024',
      'Forbes Cloud 100 List 2023'
    ],
    uptimePercentage: 99.95
  },
  
  // Company Info
  companyInfo: {
    foundedYear: 2008,
    headquarters: 'San Francisco, CA',
    employeeCount: '1600+',
    funding: '$453M Total Funding (Pre-IPO)',
    valuation: '$5.5 Billion (Market Cap)',
    revenue: '$652M ARR (2023)',
    customers: '139,000+ paying organizations',
    website: 'https://asana.com',
    marketShare: '12% of project management market',
    notableClients: ['Amazon', 'Airbnb', 'NASA', 'Spotify', 'Uber', 'Pinterest', 'Intel']
  },
  
  // Scores - Only 4 criteria as requested
  overallScore: 8.5,
  scores: {
    easeOfUse: 9.2,
    features: 8.5,
    valueForMoney: 7.8,
    customerSupport: 8.0
  },
  
  // User Ratings
  userRatings: {
    g2Score: 4.3,
    g2Reviews: 9584,
    capterraScore: 4.5,
    capterraReviews: 12153,
    trustRadiusScore: 8.4,
    trustRadiusReviews: 485
  },
  
  // Automated Content
  automatedContent: {
    overview: 'Asana was founded by Facebook co-founder Dustin Moskovitz and Justin Rosenstein with a mission to help humanity thrive by enabling teams to work together effortlessly. The platform has evolved from a simple task manager to a comprehensive work management solution used by over 139,000 paying organizations.',
    
    featuresAnalysis: 'Asana provides multiple project views including List, Board, Timeline (Gantt), Calendar, and Portfolios. Its Workflow Builder and Rules enable powerful automation without coding. Goals link strategy to execution, while Forms streamline work intake. The platform excels at cross-functional work with features like Status Updates and Project Briefs.',
    
    pricingAnalysis: 'Starting at $10.99/user/month for Premium, Asana is priced competitively with Monday.com but higher than ClickUp. The free tier supports up to 15 users - generous compared to most competitors. Business plan at $24.99 includes advanced features like Portfolios and Workload management that justify the premium.',
    
    integrationsAnalysis: 'With 200+ native integrations, Asana connects seamlessly with tools like Slack, Microsoft Teams, Google Workspace, Adobe Creative Cloud, and Salesforce. The integration quality is superior to most competitors, with deep, bi-directional syncing. API is robust and well-documented.',
    
    supportAnalysis: 'Asana Academy provides excellent self-service resources. Premium plans get priority email support, while Enterprise includes dedicated Customer Success Managers. Response times average 24 hours for email support. The community forum is active with both users and Asana employees.',
    
    securityAnalysis: 'Enterprise-grade security with SOC 2 Type II, ISO 27001, and GDPR compliance. Offers SAML SSO, data encryption, and admin controls. HIPAA compliance available for Enterprise plans. Regular third-party security audits and a bug bounty program demonstrate commitment to security.',
    
    performanceNotes: 'Consistently fast performance even with large projects. Real-time updates work smoothly. Mobile apps are nearly feature-complete compared to web. Offline mode allows continued work with automatic sync when reconnected.',
    
    competitorComparison: 'More polished and easier to use than ClickUp but less customizable. Better Timeline view than Monday.com. More expensive than most but better user experience. Less technical than Jira but more robust than Trello.'
  },
  
  // Key Features
  keyFeatures: [
    {
      _key: 'feat1',
      name: 'Timeline View',
      description: 'Best-in-class Gantt chart with drag-and-drop scheduling and automatic conflict resolution',
      category: 'Planning'
    },
    {
      _key: 'feat2',
      name: 'Portfolios',
      description: 'Executive-level view of multiple projects with real-time status and progress tracking',
      category: 'Reporting'
    },
    {
      _key: 'feat3',
      name: 'Workflow Builder',
      description: 'Visual automation builder with 70+ rule templates and custom triggers',
      category: 'Automation'
    },
    {
      _key: 'feat4',
      name: 'Goals',
      description: 'Connect company objectives to team work with automatic progress tracking',
      category: 'Strategy'
    },
    {
      _key: 'feat5',
      name: 'Forms',
      description: 'Standardize work requests with conditional logic and automatic task creation',
      category: 'Intake'
    },
    {
      _key: 'feat6',
      name: 'Workload',
      description: 'Capacity planning with effort estimates and resource management',
      category: 'Resources'
    }
  ],
  
  // Pricing
  pricing: [
    {
      _key: 'basic',
      name: 'Basic',
      price: 0,
      yearlyPrice: 0,
      users: 'Up to 15 users',
      features: [
        'Unlimited tasks & projects',
        'List, Board & Calendar views',
        'Assignee & due dates',
        'iOS & Android apps',
        '100+ integrations',
        'Basic dashboard'
      ],
      highlighted: false
    },
    {
      _key: 'premium',
      name: 'Premium',
      price: 10.99,
      yearlyPrice: 131.88,
      users: 'Per user/month',
      features: [
        'Everything in Basic',
        'Unlimited users',
        'Timeline view',
        'Custom fields',
        'Forms',
        'Rules & automation',
        'Admin console',
        'Priority support'
      ],
      highlighted: true
    },
    {
      _key: 'business',
      name: 'Business',
      price: 24.99,
      yearlyPrice: 299.88,
      users: 'Per user/month',
      features: [
        'Everything in Premium',
        'Portfolios',
        'Workload management',
        'Custom rules builder',
        'Advanced integration',
        'Approvals',
        'Proofing',
        'SAML SSO'
      ],
      highlighted: false
    },
    {
      _key: 'enterprise',
      name: 'Enterprise',
      price: null,
      yearlyPrice: null,
      users: 'Custom pricing',
      features: [
        'Everything in Business',
        'Custom branding',
        'Data export & deletion',
        'HIPAA compliance',
        'Enterprise key management',
        'Priority support with SLA',
        'Customer Success Manager',
        '99.9% uptime SLA'
      ],
      highlighted: false
    }
  ],
  
  // Pricing Details
  pricingDetails: {
    hasFreeTier: true,
    freeTrialDays: 30,
    moneyBackDays: 0,
    discounts: '20% off annual billing, 50% off for nonprofits',
    hiddenCosts: 'Guests (view-only) are free. Some integrations may require paid plans on both sides.',
    billingCycle: ['Monthly', 'Annual']
  },
  
  // Pros and Cons
  pros: [
    'Intuitive and polished user interface',
    'Excellent Timeline (Gantt) view',
    'Generous free plan for up to 15 users',
    'Superior mobile applications',
    'Strong cross-functional collaboration features',
    'Thoughtful automation that\'s easy to set up',
    'Reliable performance and uptime',
    'Great onboarding and training resources'
  ],
  
  cons: [
    'More expensive than many competitors',
    'Limited customization compared to ClickUp',
    'No native time tracking (requires integration)',
    'No built-in chat or video calls',
    'Portfolios only in Business plan',
    'Limited budgeting features',
    'Can\'t assign multiple people to one task (without workarounds)'
  ],
  
  // Best For / Not Ideal For
  bestFor: [
    'Marketing and creative teams',
    'Cross-functional projects',
    'Companies prioritizing ease of use',
    'Remote and distributed teams',
    'Organizations with 20-500 employees'
  ],
  
  notIdealFor: [
    'Solo users or very small teams (under 5)',
    'Teams needing extensive customization',
    'Organizations requiring built-in time tracking',
    'Budget-conscious startups',
    'Heavy Agile/Scrum workflows (Jira better)'
  ],
  
  // Integrations
  integrations: {
    count: 200,
    native: 200,
    categories: ['Communication', 'File Storage', 'Creative', 'Development', 'Sales', 'Time Tracking'],
    hasZapier: true,
    hasAPI: true,
    hasWebhooks: true
  },
  
  popularIntegrations: [
    'Slack',
    'Microsoft Teams',
    'Google Workspace',
    'Microsoft 365',
    'Adobe Creative Cloud',
    'Salesforce',
    'Jira',
    'GitHub',
    'GitLab',
    'Zoom',
    'Dropbox',
    'Box',
    'Tableau',
    'Power BI',
    'Harvest'
  ],
  
  // Support
  support: {
    channels: [
      {
        _key: 'ch1',
        type: 'Email',
        availability: '24/7',
        responseTime: '24 hours'
      },
      {
        _key: 'ch2',
        type: 'Forum',
        availability: '24/7',
        responseTime: 'Community-driven'
      },
      {
        _key: 'ch3',
        type: 'Asana Academy',
        availability: '24/7',
        responseTime: 'Self-service'
      }
    ],
    hasKnowledgeBase: true,
    hasCommunityForum: true,
    hasVideoTutorials: true,
    hasWebinars: true,
    hasCertification: true,
    professionalServices: true
  },
  
  // Security
  security: {
    certifications: ['SOC 2 Type II', 'SOC 3', 'ISO 27001', 'ISO 27018', 'GDPR', 'Privacy Shield'],
    compliance: ['GDPR', 'CCPA', 'HIPAA (Enterprise)', 'FERPA'],
    dataEncryption: '256-bit AES encryption at rest, TLS 1.2+ in transit',
    accessControls: ['2FA', 'SAML SSO', 'Google SSO', 'Admin controls', 'Domain verification'],
    dataResidency: ['United States', 'European Union', 'Asia Pacific']
  },
  
  // Technical
  technical: {
    platforms: ['Web', 'Windows', 'Mac', 'iOS', 'Android'],
    deployment: ['Cloud (SaaS)'],
    languages: ['English', 'French', 'German', 'Spanish', 'Portuguese', 'Japanese'],
    dataLimits: 'Free: 100MB attachments, Paid: 100MB per file (unlimited total)',
    apiRateLimits: '1500 requests per hour standard, higher for Enterprise',
    uptime: '99.9% SLA for Business and Enterprise'
  },
  
  // Mobile
  mobile: {
    hasIOS: true,
    iosRating: 4.7,
    hasAndroid: true,
    androidRating: 4.3,
    mobileFeatures: ['Full task management', 'Comments', 'Status updates', 'Offline mode', 'Push notifications', 'Voice transcription'],
    offlineCapability: true
  },
  
  // Supported Platforms
  supportedPlatforms: ['web', 'windows', 'macos', 'ios', 'android'],
  
  // Deployment Options
  deploymentOptions: ['cloud'],
  
  // FAQs
  faqs: [
    {
      _key: 'faq1',
      question: 'Is Asana really free for 15 users?',
      answer: 'Yes, Asana offers a fully functional Basic plan free for up to 15 users with unlimited tasks and projects. You only miss advanced features like Timeline view, custom fields, and automation.'
    },
    {
      _key: 'faq2',
      question: 'How does Asana compare to Monday.com?',
      answer: 'Asana has a better Timeline view and is easier to learn, while Monday.com offers more customization and visual options. Asana is better for traditional project management; Monday.com excels at visual workflows.'
    },
    {
      _key: 'faq3',
      question: 'Can Asana handle complex projects?',
      answer: 'Yes, with features like dependencies, milestones, custom fields, and Portfolios, Asana handles complex projects well. However, for highly technical projects, Jira might be more suitable.'
    },
    {
      _key: 'faq4',
      question: 'Does Asana have time tracking?',
      answer: 'No native time tracking, but integrates well with Harvest, Toggl, and Everhour. This is a common complaint but keeps the interface cleaner.'
    },
    {
      _key: 'faq5',
      question: 'What\'s the difference between Asana Premium and Business?',
      answer: 'Business adds Portfolios, Workload view, custom rule builder, approvals, proofing, and SSO. Premium has core features most teams need; Business is for scaling organizations.'
    },
    {
      _key: 'faq6',
      question: 'Is Asana good for Agile teams?',
      answer: 'Asana supports Agile with Board view and sprint planning templates, but lacks specialized features like story points and burndown charts that Jira provides.'
    },
    {
      _key: 'faq7',
      question: 'Can I assign a task to multiple people?',
      answer: 'Not directly - each task has one assignee. Workarounds include subtasks with different assignees or using custom fields to track multiple responsible parties.'
    },
    {
      _key: 'faq8',
      question: 'How secure is Asana for enterprise use?',
      answer: 'Very secure with SOC 2, ISO certifications, encryption, SSO, and admin controls. Enterprise plan adds HIPAA compliance and enhanced security features.'
    },
    {
      _key: 'faq9',
      question: 'Does Asana work offline?',
      answer: 'Mobile apps have robust offline mode - view and edit tasks offline with automatic sync. Web version requires internet connection.'
    },
    {
      _key: 'faq10',
      question: 'Can I import from other project management tools?',
      answer: 'Yes, Asana has importers for Trello, Wrike, Monday.com, and CSV files. Most data transfers smoothly including tasks, assignees, and due dates.'
    }
  ],
  
  whenToChoose: 'Choose Asana when you prioritize ease of use, need strong cross-functional collaboration, want reliable performance, value quality over quantity of features, and have budget for a premium solution.',
  
  whenNotToChoose: 'Skip Asana if you need maximum customization, require built-in time tracking and invoicing, have a very tight budget, need on-premise deployment, or want all-in-one solution with docs and chat.',
  
  // Affiliate and SEO
  affiliateLink: 'https://asana.com/?ref=workflowautomation',
  
  specialDeal: {
    active: true,
    description: 'Get 2 months free on annual plans',
    code: 'WORKFLOW2024',
    expires: new Date('2025-03-31').toISOString()
  },
  
  lastUpdated: new Date().toISOString(),
  nextReviewDate: new Date('2025-04-01').toISOString(),
  
  seo: {
    metaTitle: 'Asana Review 2024: Features, Pricing, Pros & Cons | Complete Analysis',
    metaDescription: 'Comprehensive Asana review covering features, pricing, alternatives, and real user insights. Discover if Asana is the right project management tool for your team.',
    keywords: [
      'Asana review',
      'Asana pricing',
      'Asana vs Monday.com',
      'Asana vs ClickUp',
      'Asana features',
      'Asana alternatives',
      'Asana project management',
      'Asana pros and cons',
      'Is Asana worth it',
      'Asana 2024'
    ]
  }
}

async function createAsanaReview() {
  console.log('🚀 Creating comprehensive Asana review...\n')
  
  try {
    const result = await client.create(asanaReview)
    console.log('✅ Asana review created successfully!')
    console.log('Document ID:', result._id)
    console.log('\nView in Sanity Studio: http://localhost:3333/structure/software;' + result._id)
    console.log('View on frontend: http://localhost:3000/reviews/asana')
  } catch (error) {
    console.error('❌ Error creating review:', error)
  }
}

createAsanaReview()