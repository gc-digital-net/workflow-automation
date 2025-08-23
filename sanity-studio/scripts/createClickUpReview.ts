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

const clickUpReview = {
  _type: 'software',
  name: 'ClickUp',
  slug: {
    _type: 'slug',
    current: 'clickup'
  },
  tagline: 'One app to replace them all - Tasks, Docs, Goals, and Chat',
  shortDescription: 'ClickUp is an all-in-one productivity platform that brings teams, tasks, and tools together in one place. Known for its extreme customization and feature-rich environment.',
  verdict: 'Best for teams wanting maximum customization and an all-in-one solution, though the learning curve can be steep.',
  
  // Content Mode
  contentMode: 'automated',
  
  // At-a-Glance
  atAGlance: {
    bottomLine: 'ClickUp offers unmatched customization and features at competitive pricing. While powerful, it requires significant setup time and has a learning curve that may overwhelm smaller teams.',
    setupTime: '2-4 hours',
    bestForCompanySize: '10-500 employees',
    industryFocus: ['Technology', 'Marketing', 'Consulting', 'Creative Agencies', 'Product Development'],
    standoutFeature: 'Unlimited customization with Custom Fields and Views'
  },
  
  // Quick Stats
  quickStats: {
    totalUsers: '10M+ users',
    founded: 2017,
    lastFundingRound: 'Series C - $400M (2021)',
    awards: [
      'G2 Best Software Awards 2024',
      'GetApp Category Leader 2024',
      'Capterra Shortlist 2024'
    ],
    uptimePercentage: 99.99
  },
  
  // Company Info
  companyInfo: {
    foundedYear: 2017,
    headquarters: 'San Diego, CA',
    employeeCount: '900+',
    funding: '$537.5M Total Funding',
    valuation: '$4 Billion',
    revenue: '$150M+ ARR',
    customers: '800,000+ teams',
    website: 'https://clickup.com',
    marketShare: '8% of project management market',
    notableClients: ['Google', 'Nike', 'Airbnb', 'Uber', 'Netflix']
  },
  
  // Scores
  overallScore: 8.8,
  scores: {
    features: 9.5,
    easeOfUse: 7.2,
    integrations: 8.5,
    pricing: 9.0,
    support: 8.0,
    security: 8.5,
    scalability: 9.0,
    performance: 7.8,
    customization: 9.8,
    reporting: 8.5,
    mobile: 8.0,
    documentation: 8.2,
    learningCurve: 6.5,
    freeTier: 9.5,
    overallValue: 9.0
  },
  
  // User Ratings
  userRatings: {
    g2Score: 4.7,
    g2Reviews: 9021,
    capterraScore: 4.6,
    capterraReviews: 3847,
    trustRadiusScore: 8.8,
    trustRadiusReviews: 632
  },
  
  // Automated Content
  automatedContent: {
    overview: 'ClickUp positions itself as the "one app to replace them all," offering project management, document collaboration, goal tracking, and communication tools in a single platform. Founded in 2017, it has rapidly grown to serve over 10 million users across 800,000+ teams worldwide.',
    
    featuresAnalysis: 'ClickUp excels in customization with 15+ custom field types, 10+ view types including Gantt, Calendar, and Mind Maps. Its ClickApps system allows teams to enable/disable features as needed. The platform includes native time tracking, goal management, document collaboration, and even email integration.',
    
    pricingAnalysis: 'ClickUp offers exceptional value with a generous free tier supporting unlimited users. Paid plans start at $7/user/month, significantly lower than competitors like Monday.com ($10) or Asana ($13.49). The unlimited plan at $12/user/month includes advanced features that cost extra elsewhere.',
    
    integrationsAnalysis: 'With 1000+ integrations through native connections and Zapier, ClickUp connects with most business tools. Key integrations include Slack, Google Workspace, Microsoft 365, GitHub, and Salesforce. The API is well-documented with webhook support for custom integrations.',
    
    supportAnalysis: 'Support varies by plan - free users get community support, while paid plans include priority support with 24-hour response times. ClickUp University offers comprehensive training resources, though many users report needing significant time to master the platform.',
    
    securityAnalysis: 'ClickUp maintains SOC 2 Type II compliance, offers 256-bit AES encryption, and provides SSO for Business plans. GDPR compliant with data centers in the US and EU. However, it lacks some enterprise features like HIPAA compliance that competitors offer.',
    
    performanceNotes: 'Performance can vary with large workspaces. Users report occasional slowdowns with 1000+ tasks. Mobile apps are functional but less feature-rich than the web version. Recent updates have improved load times by 40%.',
    
    competitorComparison: 'More affordable and customizable than Monday.com or Asana, but with a steeper learning curve. Better value than Notion for pure project management. Less enterprise-ready than Jira or Microsoft Project but more user-friendly.'
  },
  
  // Key Features
  keyFeatures: [
    {
      _key: 'feat1',
      name: 'Custom Views',
      description: 'Choose from 15+ views including List, Board, Calendar, Gantt, Timeline, Mind Map, and more',
      category: 'Visualization'
    },
    {
      _key: 'feat2',
      name: 'ClickApps',
      description: 'Modular features you can enable/disable per workspace to avoid feature bloat',
      category: 'Customization'
    },
    {
      _key: 'feat3',
      name: 'Custom Fields',
      description: 'Create any field type imaginable - formulas, relationships, progress bars, ratings, and more',
      category: 'Customization'
    },
    {
      _key: 'feat4',
      name: 'Automations',
      description: '100+ automation templates plus custom automation builder with triggers and actions',
      category: 'Automation'
    },
    {
      _key: 'feat5',
      name: 'Goals & OKRs',
      description: 'Set and track goals with automatic progress roll-up from tasks and custom metrics',
      category: 'Strategy'
    },
    {
      _key: 'feat6',
      name: 'Docs & Wikis',
      description: 'Built-in document editor with real-time collaboration, nested pages, and embedding',
      category: 'Collaboration'
    }
  ],
  
  // Pricing
  pricing: [
    {
      _key: 'free',
      name: 'Free Forever',
      price: 0,
      yearlyPrice: 0,
      users: 'Unlimited users',
      features: [
        '100MB storage',
        'Unlimited tasks',
        '2-factor authentication',
        'Real-time collaboration',
        'Mobile apps',
        'Basic integrations'
      ],
      highlighted: false
    },
    {
      _key: 'unlimited',
      name: 'Unlimited',
      price: 7,
      yearlyPrice: 60,
      users: 'Per user/month',
      features: [
        'Unlimited storage',
        'Unlimited integrations',
        'Unlimited dashboards',
        'Guests & permissions',
        'Goals & portfolios',
        'Custom fields',
        'Form view',
        'Resource management'
      ],
      highlighted: true
    },
    {
      _key: 'business',
      name: 'Business',
      price: 12,
      yearlyPrice: 108,
      users: 'Per user/month',
      features: [
        'Everything in Unlimited',
        'Google SSO',
        'Unlimited teams',
        'Custom role creation',
        'Workload management',
        'Timeline & Mind Maps',
        'Automations (250/month)',
        'Advanced dashboard features'
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
        'White labeling',
        'Advanced permissions',
        'SAML SSO',
        'Contract review',
        'Dedicated success manager',
        'API access increase',
        'Custom automations'
      ],
      highlighted: false
    }
  ],
  
  // Pricing Details
  pricingDetails: {
    hasFreeTier: true,
    freeTrialDays: 0,
    moneyBackDays: 0,
    discounts: '20% off annual billing, special discounts for nonprofits and students',
    hiddenCosts: 'Guest users are free but limited. Automations have monthly limits per plan.',
    billingCycle: ['Monthly', 'Annual']
  },
  
  // Pros and Cons
  pros: [
    'Extremely customizable - adapt to any workflow',
    'Generous free plan with unlimited users',
    'All-in-one solution replaces multiple tools',
    'Excellent value for money',
    'Regular feature updates and improvements',
    'Strong template library',
    'Native time tracking included',
    'Multiple view types for different work styles'
  ],
  
  cons: [
    'Steep learning curve for new users',
    'Can be overwhelming with too many features',
    'Performance issues with large datasets',
    'Mobile apps lack some desktop features',
    'Notification system can be noisy',
    'Search functionality could be better'
  ],
  
  // Best For / Not Ideal For
  bestFor: [
    'Growing startups needing flexibility',
    'Agencies managing multiple clients',
    'Product development teams',
    'Teams wanting to consolidate tools',
    'Organizations with complex workflows'
  ],
  
  notIdealFor: [
    'Teams wanting immediate setup',
    'Users preferring simplicity over features',
    'Large enterprises needing advanced security',
    'Teams with limited technical expertise'
  ],
  
  // Integrations
  integrations: {
    count: 1000,
    native: 50,
    categories: ['Communication', 'Development', 'File Storage', 'Time Tracking', 'CRM', 'Marketing'],
    hasZapier: true,
    hasAPI: true,
    hasWebhooks: true
  },
  
  popularIntegrations: [
    'Slack',
    'Google Drive',
    'Gmail',
    'GitHub',
    'GitLab',
    'Figma',
    'Zoom',
    'Microsoft Teams',
    'Dropbox',
    'HubSpot',
    'Salesforce',
    'Intercom',
    'Stripe',
    'QuickBooks',
    'Loom'
  ],
  
  // Support
  support: {
    channels: [
      {
        _key: 'ch1',
        type: 'Email',
        availability: '24/7',
        responseTime: '24-48 hours'
      },
      {
        _key: 'ch2',
        type: 'Live Chat',
        availability: 'Business hours',
        responseTime: '< 1 hour'
      },
      {
        _key: 'ch3',
        type: 'Help Center',
        availability: '24/7',
        responseTime: 'Immediate'
      }
    ],
    hasKnowledgeBase: true,
    hasCommunityForum: true,
    hasVideoTutorials: true,
    hasWebinars: true,
    hasCertification: true,
    professionalServices: false
  },
  
  // Security
  security: {
    certifications: ['SOC 2 Type II', 'ISO 27001 (In Progress)', 'GDPR Compliant'],
    compliance: ['GDPR', 'CCPA', 'Privacy Shield'],
    dataEncryption: '256-bit AES encryption at rest and in transit',
    accessControls: ['2FA', 'SSO (Business+)', 'Custom Permissions', 'IP Restrictions'],
    dataResidency: ['United States', 'European Union']
  },
  
  // Technical
  technical: {
    platforms: ['Web', 'Windows', 'Mac', 'Linux', 'iOS', 'Android'],
    deployment: ['Cloud (SaaS)'],
    languages: ['English', 'Spanish', 'French', 'Portuguese', 'German', 'Italian', 'Polish', 'Russian'],
    dataLimits: 'Free: 100MB, Paid: Unlimited storage',
    apiRateLimits: '100 requests per minute for most endpoints',
    uptime: '99.99% SLA for Business plans'
  },
  
  // Mobile
  mobile: {
    hasIOS: true,
    iosRating: 4.5,
    hasAndroid: true,
    androidRating: 4.2,
    mobileFeatures: ['Task management', 'Time tracking', 'Comments', 'Notifications', 'Basic editing'],
    offlineCapability: true
  },
  
  // Supported Platforms
  supportedPlatforms: ['web', 'windows', 'macos', 'linux', 'ios', 'android'],
  
  // Deployment Options
  deploymentOptions: ['cloud'],
  
  // FAQs
  faqs: [
    {
      _key: 'faq1',
      question: 'Is ClickUp really free for unlimited users?',
      answer: 'Yes, ClickUp offers a Free Forever plan with unlimited users and unlimited tasks. The main limitations are 100MB storage and limited access to advanced features like Gantt charts, custom fields, and automations.'
    },
    {
      _key: 'faq2',
      question: 'How long does it take to set up ClickUp?',
      answer: 'Basic setup takes 2-4 hours, but fully customizing ClickUp for your team workflow can take 1-2 weeks. ClickUp provides templates and ClickUp University to speed up the process.'
    },
    {
      _key: 'faq3',
      question: 'Can ClickUp replace Monday.com or Asana?',
      answer: 'Yes, ClickUp can replace both with more features at a lower price. However, Monday.com and Asana may be easier to learn initially. ClickUp is better for teams wanting maximum customization.'
    },
    {
      _key: 'faq4',
      question: 'Does ClickUp work offline?',
      answer: 'The mobile apps offer limited offline functionality. You can view cached data and create tasks offline, which sync when reconnected. The desktop app requires an internet connection.'
    },
    {
      _key: 'faq5',
      question: 'What\'s the difference between ClickUp Unlimited and Business plans?',
      answer: 'Business adds Google SSO, unlimited teams, advanced permissions, timeline view, mind maps, and 250 automations/month. Unlimited includes most core features but with some limitations on advanced capabilities.'
    },
    {
      _key: 'faq6',
      question: 'Is ClickUp suitable for large enterprises?',
      answer: 'ClickUp works for mid-size companies but may lack some enterprise features like HIPAA compliance, advanced audit logs, and dedicated infrastructure that tools like Jira or ServiceNow provide.'
    },
    {
      _key: 'faq7',
      question: 'How good is ClickUp\'s customer support?',
      answer: 'Support quality varies by plan. Free users rely on community support. Paid plans get 24-hour email response times. Business plans include priority support. No phone support is available.'
    },
    {
      _key: 'faq8',
      question: 'Can I import data from other project management tools?',
      answer: 'Yes, ClickUp offers import tools for Asana, Trello, Jira, Monday.com, Basecamp, Todoist, and Wrike. You can also import via CSV files. The import process preserves most data including tasks, assignees, and due dates.'
    },
    {
      _key: 'faq9',
      question: 'Does ClickUp integrate with Slack?',
      answer: 'Yes, ClickUp has a robust Slack integration. You can create tasks from Slack messages, receive notifications, update task statuses, and unfurl ClickUp links with rich previews directly in Slack.'
    },
    {
      _key: 'faq10',
      question: 'What makes ClickUp different from Notion?',
      answer: 'ClickUp focuses on project management with built-in features like Gantt charts, time tracking, and goals. Notion is more of a flexible workspace for notes and databases. ClickUp is better for task management; Notion excels at documentation.'
    }
  ],
  
  // Alternatives (we'll reference other software later)
  whenToChoose: 'Choose ClickUp when you need maximum customization, want to consolidate multiple tools, have a technical team that can handle complexity, and value features over simplicity.',
  
  whenNotToChoose: 'Avoid ClickUp if you need immediate productivity without setup, prefer simplicity, require enterprise-grade security compliance, or have non-technical team members who might struggle with the interface.',
  
  // Affiliate and SEO
  affiliateLink: 'https://clickup.com/?fp_ref=workflowautomation',
  
  specialDeal: {
    active: true,
    description: 'Get 20% off annual plans',
    code: 'WORKFLOW20',
    expires: new Date('2025-12-31').toISOString()
  },
  
  lastUpdated: new Date().toISOString(),
  nextReviewDate: new Date('2025-02-01').toISOString(),
  
  seo: {
    metaTitle: 'ClickUp Review 2024: Features, Pricing, Pros & Cons | Is It Worth It?',
    metaDescription: 'In-depth ClickUp review covering features, pricing, integrations, and alternatives. Find out if ClickUp\'s all-in-one platform is right for your team.',
    keywords: [
      'ClickUp review',
      'ClickUp pricing',
      'ClickUp vs Monday',
      'ClickUp vs Asana',
      'ClickUp features',
      'ClickUp alternatives',
      'project management software',
      'ClickUp pros and cons',
      'Is ClickUp worth it',
      'ClickUp 2024'
    ]
  }
}

async function createClickUpReview() {
  console.log('🚀 Creating comprehensive ClickUp review...\n')
  
  try {
    const result = await client.create(clickUpReview)
    console.log('✅ ClickUp review created successfully!')
    console.log('Document ID:', result._id)
    console.log('\nView in Sanity Studio: http://localhost:3333/structure/software;' + result._id)
    console.log('View on frontend: http://localhost:3000/reviews/clickup')
  } catch (error) {
    console.error('❌ Error creating review:', error)
  }
}

createClickUpReview()