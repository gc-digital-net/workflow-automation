import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'x1zu4x72',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skR8Ixv7JUfiUOa3VTogttG0YnMrVkuxNspF17lFAFkIPTXZykH8sJw05slPWH5mOeoYHs1JKgolkLFoWQCDZFKYg6PURIGVTpBsiosE174e4GkL9QYeqLPYvdYlws99otstdMvOr9GbQTODAy3RkoPxxCtVEjzuIfmWeijvUMW4j9UHIJqj',
  useCdn: false
})

async function populateEnhancedReviews() {
  console.log('🚀 Starting to populate enhanced software reviews...')

  // First, get category references
  const workflowCategory = await client.fetch(`*[_type == "category" && name == "Workflow Automation"][0]`)
  const projectCategory = await client.fetch(`*[_type == "category" && name == "Project Management"][0]`)

  // Software 1: Monday.com (Comprehensive Review)
  const mondayReview = {
    _type: 'software',
    name: 'Monday.com',
    slug: { current: 'monday-com' },
    tagline: 'Work OS that powers teams to run processes, projects, and workflows in one digital workspace',
    shortDescription: 'Monday.com is a versatile Work OS platform that helps teams manage projects, workflows, and daily operations with customizable boards and powerful automation.',
    verdict: 'Best for teams wanting visual project management with strong customization',
    
    companyInfo: {
      founded: 2012,
      headquarters: 'Tel Aviv, Israel',
      employees: '1,500+',
      funding: '$574M Series F',
      website: 'https://monday.com',
      users: '180,000+ organizations',
      marketShare: '~5% of project management market',
      notableClients: ['Coca-Cola', 'Universal Music Group', 'Hulu', 'BBC Studios', 'Canva']
    },

    overallScore: 8.9,
    scores: {
      features: 9.2,
      easeOfUse: 8.7,
      performance: 8.8,
      value: 8.5,
      support: 8.6,
      security: 9.0,
      integrations: 9.1,
      mobile: 8.3,
      documentation: 8.7,
      scalability: 9.2
    },

    userRatings: {
      g2Score: 4.7,
      g2Reviews: 9284,
      capterraScore: 4.6,
      capterraReviews: 4398,
      trustRadiusScore: 8.6,
      trustRadiusReviews: 238
    },

    overview: {
      whatIsIt: [
        {
          _type: 'block',
          _key: 'ov1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'sp1',
            text: 'Monday.com is a cloud-based Work Operating System (Work OS) that enables teams to create their own applications and work management software. It provides a flexible platform where teams can plan, organize, and track all their work in one place, from high-level roadmaps to the day-to-day tasks.'
          }]
        }
      ],
      keyDifferentiators: [
        {
          _type: 'block',
          _key: 'kd1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'sp2',
            text: 'What sets Monday.com apart is its colorful, intuitive interface combined with powerful customization capabilities. Unlike traditional project management tools, it offers a building-block approach where teams can create custom workflows without any coding knowledge.'
          }]
        }
      ],
      idealFor: [
        {
          _type: 'block',
          _key: 'if1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'sp3',
            text: 'Monday.com excels for creative agencies, marketing teams, and organizations that need visual project tracking with extensive customization options. It works best for teams of 10-500 people who want flexibility without complexity.'
          }]
        }
      ]
    },

    detailedReview: {
      userInterface: [
        {
          _type: 'block',
          _key: 'ui1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'sp4',
            text: 'The interface is Monday.com\'s strongest asset. The colorful, board-based layout makes it easy to understand project status at a glance. The drag-and-drop functionality is smooth, and the customizable columns allow teams to track exactly what matters to them. The recent addition of Monday Workdocs brings document collaboration directly into the platform.'
          }]
        }
      ],
      performance: [
        {
          _type: 'block',
          _key: 'pf1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'sp5',
            text: 'Performance is generally solid with fast load times and responsive interactions. The platform handles large boards with thousands of items well, though some users report occasional slowdowns with very complex automations. The mobile apps are well-optimized but lack some desktop features.'
          }]
        }
      ],
      security: [
        {
          _type: 'block',
          _key: 'sc1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'sp6',
            text: 'Monday.com takes security seriously with enterprise-grade features including SSO, 2FA, and compliance with SOC 2, ISO 27001, and GDPR. Data is encrypted both in transit and at rest, with regular third-party security audits.'
          }]
        }
      ]
    },

    pros: [
      'Highly visual and intuitive interface',
      'Extensive customization without coding',
      'Powerful automation capabilities',
      'Excellent template library',
      'Strong integration ecosystem',
      'Regular feature updates',
      'Good customer support',
      'Flexible pricing options'
    ],

    cons: [
      'Can be expensive for larger teams',
      'Learning curve for advanced features',
      'Limited reporting in lower tiers',
      'Mobile apps lack some features',
      'Gantt charts require higher plans'
    ],

    bestFor: [
      'Marketing and creative agencies',
      'Project management teams',
      'Remote and hybrid teams',
      'Operations management',
      'Sales pipeline tracking'
    ],

    notIdealFor: [
      'Software development teams needing Git integration',
      'Very small teams (under 3 people)',
      'Organizations requiring on-premise deployment',
      'Teams needing advanced financial tracking'
    ],

    keyFeatures: [
      {
        name: 'Custom Workflows',
        description: 'Build any workflow with customizable boards, columns, and automation',
        category: 'Core'
      },
      {
        name: 'Automation Center',
        description: 'No-code automation with 200+ pre-built recipes and custom automation builder',
        category: 'Automation'
      },
      {
        name: 'Multiple Views',
        description: 'Kanban, Gantt, Calendar, Timeline, Map, and custom views',
        category: 'Visualization'
      },
      {
        name: 'Monday Workdocs',
        description: 'Collaborative documents with real-time editing and board integration',
        category: 'Collaboration'
      },
      {
        name: 'Forms',
        description: 'Custom forms that automatically populate boards',
        category: 'Data Collection'
      }
    ],

    integrations: {
      count: 200,
      native: ['Slack', 'Microsoft Teams', 'Google Workspace', 'Zoom', 'Dropbox', 'Adobe Creative Cloud'],
      categories: [
        {
          category: 'Communication',
          tools: ['Slack', 'Microsoft Teams', 'Gmail', 'Outlook', 'Zoom']
        },
        {
          category: 'File Storage',
          tools: ['Google Drive', 'Dropbox', 'Box', 'OneDrive']
        },
        {
          category: 'Development',
          tools: ['GitHub', 'GitLab', 'Jira', 'Bitbucket']
        },
        {
          category: 'Marketing',
          tools: ['HubSpot', 'Mailchimp', 'Facebook Ads', 'Google Ads']
        }
      ],
      hasZapier: true,
      hasAPI: true,
      hasWebhooks: true
    },

    pricing: [
      {
        name: 'Individual',
        price: 0,
        yearlyPrice: 0,
        users: 'Up to 2 seats',
        features: ['Up to 3 boards', 'Unlimited docs', '200+ templates', 'iOS and Android apps'],
        highlighted: false
      },
      {
        name: 'Basic',
        price: 8,
        yearlyPrice: 96,
        users: 'Per seat/month',
        features: ['Unlimited boards', 'Unlimited docs', '5GB storage', 'Dashboard (1 board)'],
        highlighted: false
      },
      {
        name: 'Standard',
        price: 10,
        yearlyPrice: 120,
        users: 'Per seat/month',
        features: ['Timeline & Gantt views', 'Calendar view', 'Guest access', 'Automation (250 actions/month)', 'Dashboard combining 5 boards'],
        highlighted: true
      },
      {
        name: 'Pro',
        price: 16,
        yearlyPrice: 192,
        users: 'Per seat/month',
        features: ['Time tracking', 'Formula column', 'Dependency column', 'Automation (25,000 actions/month)', 'Dashboard combining 10 boards'],
        highlighted: false
      },
      {
        name: 'Enterprise',
        price: 0,
        yearlyPrice: 0,
        users: 'Contact sales',
        features: ['Enterprise-scale automation', 'Advanced security', 'Advanced reporting', 'Multi-level permissions', 'Tailored onboarding'],
        highlighted: false
      }
    ],

    pricingDetails: {
      hasFreeTier: true,
      freeTrialDays: 14,
      moneyBackDays: 0,
      discounts: 'Annual billing saves 18%, Nonprofit discount available',
      hiddenCosts: 'Automation actions beyond plan limits, Additional storage, Guest users in lower tiers',
      billingCycle: ['Monthly', 'Annual']
    },

    technical: {
      platforms: ['Web', 'Windows', 'Mac', 'iOS', 'Android'],
      deployment: ['Cloud (SaaS)'],
      languages: ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Dutch', 'Italian', 'Russian', 'Japanese', 'Korean', 'Polish', 'Swedish'],
      dataLimits: '5GB on Basic, 20GB on Standard, 100GB on Pro, 1000GB on Enterprise',
      apiRateLimits: '5,000 requests per minute',
      uptime: '99.9% SLA for Enterprise'
    },

    security: {
      certifications: ['SOC 2 Type II', 'ISO 27001', 'ISO 27018', 'HIPAA'],
      compliance: ['GDPR', 'CCPA', 'HIPAA', 'Privacy Shield'],
      dataEncryption: 'TLS 1.2+ in transit, AES-256 at rest',
      accessControls: ['SSO', 'SAML', '2FA', 'IP restrictions', 'Session management'],
      dataResidency: ['US', 'EU', 'APAC', 'Australia']
    },

    mobile: {
      hasIOS: true,
      iosRating: 4.6,
      hasAndroid: true,
      androidRating: 4.3,
      mobileFeatures: ['View and edit boards', 'Create items', 'Notifications', 'Time tracking', 'Offline mode'],
      offlineCapability: true
    },

    support: {
      channels: [
        { type: 'Email', availability: '24/7', responseTime: '< 24 hours' },
        { type: 'Live Chat', availability: 'Business hours', responseTime: '< 5 minutes' },
        { type: 'Phone', availability: 'Enterprise only', responseTime: 'Immediate' }
      ],
      hasKnowledgeBase: true,
      hasCommunityForum: true,
      hasVideoTutorials: true,
      hasWebinars: true,
      hasCertification: true,
      professionalServices: true
    },

    categories: workflowCategory ? [workflowCategory._id] : [],
    
    affiliateLink: 'https://monday.grsm.io/workflow-automation',
    
    specialDeal: {
      active: true,
      description: 'Get 18% off with annual billing',
      code: 'WORKFLOW18',
      expires: new Date('2024-12-31').toISOString()
    },
    
    lastUpdated: new Date().toISOString(),
    
    seo: {
      metaTitle: 'Monday.com Review 2024: Features, Pricing, Pros & Cons',
      metaDescription: 'In-depth Monday.com review. Visual work management platform with 9.2/10 features score. Compare pricing, integrations, and see if it\'s right for your team.',
      keywords: ['monday.com review', 'monday project management', 'work os', 'team collaboration software']
    }
  }

  // Software 2: Notion (Comprehensive Review)
  const notionReview = {
    _type: 'software',
    name: 'Notion',
    slug: { current: 'notion' },
    tagline: 'Your connected workspace for wiki, docs & projects',
    shortDescription: 'Notion is an all-in-one workspace that combines notes, docs, tasks, wikis, and databases into a single, highly customizable platform.',
    verdict: 'Best all-in-one workspace for teams valuing flexibility and documentation',
    
    companyInfo: {
      founded: 2013,
      headquarters: 'San Francisco, CA',
      employees: '500+',
      funding: '$343M at $10B valuation',
      website: 'https://notion.so',
      users: '30+ million users',
      marketShare: '~8% of collaboration tools market',
      notableClients: ['Pixar', 'Spotify', 'Headspace', 'Buffer', 'Figma']
    },

    overallScore: 9.1,
    scores: {
      features: 9.5,
      easeOfUse: 8.4,
      performance: 8.6,
      value: 9.3,
      support: 8.2,
      security: 8.8,
      integrations: 8.5,
      mobile: 8.7,
      documentation: 9.0,
      scalability: 8.9
    },

    userRatings: {
      g2Score: 4.7,
      g2Reviews: 5012,
      capterraScore: 4.7,
      capterraReviews: 1998,
      trustRadiusScore: 8.8,
      trustRadiusReviews: 142
    },

    overview: {
      whatIsIt: [
        {
          _type: 'block',
          _key: 'nov1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'nsp1',
            text: 'Notion is a modular productivity application that provides components like databases, kanban boards, wikis, calendars, and reminders. Users can connect these components to create their own systems for knowledge management, note-taking, data management, and project management.'
          }]
        }
      ],
      keyDifferentiators: [
        {
          _type: 'block',
          _key: 'nkd1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'nsp2',
            text: 'Notion\'s unique strength lies in its block-based editor and relational databases. Everything is a block that can be moved, transformed, and connected. This creates unprecedented flexibility, allowing teams to build custom tools without coding.'
          }]
        }
      ],
      idealFor: [
        {
          _type: 'block',
          _key: 'nif1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'nsp3',
            text: 'Notion is perfect for knowledge workers, startups, and teams that prioritize documentation alongside project management. It excels for companies building internal wikis, product teams managing roadmaps, and content teams organizing editorial calendars.'
          }]
        }
      ]
    },

    detailedReview: {
      userInterface: [
        {
          _type: 'block',
          _key: 'nui1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'nsp4',
            text: 'Notion features a clean, minimalist interface that can be both a blessing and a curse. The block-based editor is powerful but has a learning curve. Once mastered, the drag-and-drop functionality and keyboard shortcuts make content creation incredibly fast. The sidebar navigation keeps everything organized, though it can become cluttered in large workspaces.'
          }]
        }
      ],
      performance: [
        {
          _type: 'block',
          _key: 'npf1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'nsp5',
            text: 'Performance has improved significantly over the years. Page load times are generally fast, though databases with thousands of entries can lag. The recent addition of synced blocks and API improvements have enhanced real-time collaboration. Offline mode works well but requires initial setup.'
          }]
        }
      ],
      security: [
        {
          _type: 'block',
          _key: 'nsc1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'nsp6',
            text: 'Notion provides solid security with SOC 2 Type 2 certification and encryption at rest and in transit. Enterprise plans include SSO, SCIM provisioning, and advanced permissions. However, the lack of end-to-end encryption may concern highly security-conscious organizations.'
          }]
        }
      ]
    },

    pros: [
      'Incredibly flexible and customizable',
      'Excellent for documentation and wikis',
      'Powerful database functionality',
      'Beautiful, clean interface',
      'Generous free plan',
      'Strong template ecosystem',
      'Regular feature updates',
      'Great for personal and team use',
      'AI features included'
    ],

    cons: [
      'Steep learning curve initially',
      'Can become slow with large databases',
      'Limited native integrations',
      'No native time tracking',
      'Offline mode requires setup',
      'Can be overwhelming for simple needs'
    ],

    bestFor: [
      'Product teams and roadmapping',
      'Content creation and editorial calendars',
      'Company wikis and documentation',
      'Personal knowledge management',
      'Startups and small teams',
      'Educational institutions'
    ],

    notIdealFor: [
      'Teams needing extensive third-party integrations',
      'Traditional project managers wanting Gantt charts',
      'Organizations requiring on-premise hosting',
      'Teams needing advanced financial features'
    ],

    keyFeatures: [
      {
        name: 'Blocks System',
        description: 'Everything is a block that can be dragged, dropped, and transformed',
        category: 'Core'
      },
      {
        name: 'Databases',
        description: 'Powerful relational databases with multiple views (Table, Board, Calendar, Gallery, Timeline)',
        category: 'Data Management'
      },
      {
        name: 'Notion AI',
        description: 'Built-in AI assistant for writing, summarizing, and brainstorming',
        category: 'AI'
      },
      {
        name: 'Templates',
        description: 'Thousands of community and official templates for every use case',
        category: 'Productivity'
      },
      {
        name: 'Synced Blocks',
        description: 'Content that updates across multiple pages automatically',
        category: 'Collaboration'
      }
    ],

    integrations: {
      count: 50,
      native: ['Slack', 'GitHub', 'Figma', 'Google Drive', 'Typeform', 'Loom'],
      categories: [
        {
          category: 'Communication',
          tools: ['Slack', 'Discord']
        },
        {
          category: 'Development',
          tools: ['GitHub', 'GitLab', 'Jira']
        },
        {
          category: 'Design',
          tools: ['Figma', 'Miro', 'Whimsical']
        },
        {
          category: 'Productivity',
          tools: ['Google Calendar', 'Todoist', 'Calendly']
        }
      ],
      hasZapier: true,
      hasAPI: true,
      hasWebhooks: false
    },

    pricing: [
      {
        name: 'Free',
        price: 0,
        yearlyPrice: 0,
        users: 'Personal use',
        features: ['Unlimited blocks for individuals', 'Share with 5 guests', 'Sync across devices', '7 day page history', 'Basic API'],
        highlighted: false
      },
      {
        name: 'Plus',
        price: 8,
        yearlyPrice: 96,
        users: 'Per user/month',
        features: ['Everything in Free', 'Unlimited blocks for teams', 'Unlimited guests', '30 day page history', 'Priority support'],
        highlighted: false
      },
      {
        name: 'Business',
        price: 15,
        yearlyPrice: 180,
        users: 'Per user/month',
        features: ['Everything in Plus', 'SAML SSO', 'Private teamspaces', '90 day page history', 'Advanced permissions', 'Bulk export'],
        highlighted: true
      },
      {
        name: 'Enterprise',
        price: 0,
        yearlyPrice: 0,
        users: 'Contact sales',
        features: ['Everything in Business', 'User provisioning (SCIM)', 'Advanced security & controls', 'Unlimited page history', 'Dedicated success manager', 'Custom contract'],
        highlighted: false
      }
    ],

    pricingDetails: {
      hasFreeTier: true,
      freeTrialDays: 0,
      moneyBackDays: 0,
      discounts: 'Annual billing saves 20%, Education and nonprofit discounts available',
      hiddenCosts: 'AI add-on ($8/member/month), Additional storage beyond limits',
      billingCycle: ['Monthly', 'Annual']
    },

    technical: {
      platforms: ['Web', 'Windows', 'Mac', 'iOS', 'Android'],
      deployment: ['Cloud (SaaS)'],
      languages: ['English', 'Korean', 'Japanese', 'French', 'German', 'Spanish', 'Portuguese'],
      dataLimits: '5MB file upload on Free, 5GB on paid plans',
      apiRateLimits: '3 requests per second',
      uptime: '99.9% historical uptime'
    },

    security: {
      certifications: ['SOC 2 Type II', 'ISO 27001', 'ISO 27018'],
      compliance: ['GDPR', 'CCPA'],
      dataEncryption: 'TLS 1.2+ in transit, AES-256 at rest',
      accessControls: ['SSO (Business+)', 'SAML', '2FA', 'Domain verification'],
      dataResidency: ['US', 'EU']
    },

    mobile: {
      hasIOS: true,
      iosRating: 4.1,
      hasAndroid: true,
      androidRating: 3.8,
      mobileFeatures: ['Read and edit pages', 'Create new pages', 'Offline access', 'Push notifications', 'Share extension'],
      offlineCapability: true
    },

    support: {
      channels: [
        { type: 'Email', availability: '24/7', responseTime: '24-48 hours' },
        { type: 'Priority Email', availability: 'Plus plans+', responseTime: '< 24 hours' },
        { type: 'Dedicated Success Manager', availability: 'Enterprise', responseTime: 'Same day' }
      ],
      hasKnowledgeBase: true,
      hasCommunityForum: true,
      hasVideoTutorials: true,
      hasWebinars: true,
      hasCertification: false,
      professionalServices: true
    },

    categories: projectCategory ? [projectCategory._id] : [],
    
    affiliateLink: 'https://affiliate.notion.so/workflow-automation',
    
    specialDeal: {
      active: true,
      description: 'Get 20% off with annual billing + free AI for 3 months',
      code: 'WORKFLOW2024',
      expires: new Date('2024-12-31').toISOString()
    },
    
    lastUpdated: new Date().toISOString(),
    
    seo: {
      metaTitle: 'Notion Review 2024: The Ultimate All-in-One Workspace Analysis',
      metaDescription: 'Comprehensive Notion review with 9.1/10 overall score. Explore features, pricing, databases, AI capabilities, and whether Notion is right for your team.',
      keywords: ['notion review', 'notion workspace', 'notion database', 'notion ai', 'productivity tools']
    }
  }

  try {
    // Create the reviews
    console.log('📝 Creating Monday.com review...')
    const monday = await client.create(mondayReview)
    console.log('✅ Monday.com review created:', monday._id)

    console.log('📝 Creating Notion review...')
    const notion = await client.create(notionReview)
    console.log('✅ Notion review created:', notion._id)

    console.log('\n🎉 Successfully populated 2 comprehensive software reviews!')
    console.log('Visit your Sanity Studio to see the new reviews')
    
  } catch (error) {
    console.error('❌ Error populating reviews:', error)
  }
}

populateEnhancedReviews()