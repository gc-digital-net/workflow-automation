/**
 * Zapier Review Upload Script
 *
 * Uses the generic upload-review.ts module
 */

import { uploadReview, ReviewData } from './upload-review'

const zapierData: ReviewData = {
  name: 'Zapier',
  slug: 'zapier',
  tagline: 'Automate your work across 8,000+ app integrations',
  excerpt: 'Zapier is the leading no-code automation platform that connects over 8,000 apps. Automate repetitive tasks, build multi-step workflows, and save hours every week without writing code. Our 8-month review covers everything from pricing to real-world ROI.',
  overallScore: 8.6,
  scores: {
    easeOfUse: 9.0,
    features: 9.0,
    value: 7.5,
    support: 8.0,
    integrations: 9.8
  },
  quickInfo: {
    startingPrice: '$19.99/month (annual)',
    freeTrial: 'Free Forever plan + 14-day Pro trial',
    bestFor: 'Non-technical teams, marketing, operations',
    integrations: '8,000+'
  },
  companyInfo: {
    founded: '2011',
    headquarters: 'San Francisco, CA (Fully Remote)',
    companySize: '700+ employees',
    funding: '$2.68M (minimal outside funding, profitable since 2014)'
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Free plan: Help center & community only. Professional: Email & chat support. Team: Priority support. Enterprise: Dedicated Customer Success Manager.'
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['SOC 2 Type II', 'SOC 3', 'ISO 27001', 'CCPA', 'EU-US Data Privacy Framework']
  },
  popularIntegrations: [
    'Google Sheets', 'Slack', 'Gmail', 'Salesforce', 'HubSpot',
    'Mailchimp', 'Trello', 'Asana', 'Notion', 'Airtable',
    'Shopify', 'Stripe', 'Zoom', 'Microsoft Teams', 'OpenAI (ChatGPT)'
  ],
  affiliateLink: 'https://zapier.com/',
  pros: [
    'Unmatched integration library with 8,000+ apps — more than any competitor',
    'Genuinely intuitive interface that non-technical users can master quickly',
    'Reliable platform with 99.9% uptime — critical for business automation',
    'Generous free plan with 100 tasks/month for testing',
    'Filters, Formatters, and Paths don\'t count against task limits',
    'Excellent documentation and learning resources',
    'Continuous innovation with Tables, Interfaces, and AI features',
    'Strong security with SOC 2 Type II and GDPR compliance',
    'Proven at scale — powers millions of workflows worldwide'
  ],
  cons: [
    'Task-based pricing becomes expensive at high volumes',
    '15-minute trigger polling on free plan (2 min on Professional)',
    'No native mobile app for managing Zaps on the go',
    'Limited error handling and debugging tools for complex workflows',
    'No self-hosting option — cloud-only deployment',
    'Task counting can be confusing for new users',
    'Premium apps (Salesforce, QuickBooks) require paid plans',
    'Vendor lock-in concerns — migration is painful',
    'No HIPAA compliance for healthcare organizations'
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free Forever',
      features: [
        '100 tasks/month',
        '2-step Zaps only (1 trigger + 1 action)',
        '15-minute trigger polling',
        'Zapier Tables & Interfaces included',
        'Basic AI features',
        'No credit card required'
      ]
    },
    {
      name: 'Professional',
      price: '$19.99/mo (annual)',
      features: [
        '750 tasks/month (scales up to 100K)',
        'Unlimited multi-step Zaps',
        '2-minute trigger polling',
        'Premium app integrations',
        'Webhooks for instant triggers',
        'Filters, Paths, Formatter (free)',
        'Auto-replay failed tasks'
      ],
      highlighted: true
    },
    {
      name: 'Team',
      price: '$69/mo (annual)',
      features: [
        '2,000 tasks/month (scales up)',
        'Up to 25 team members',
        '1-minute trigger polling',
        'Shared app connections',
        'Shared workspaces & folders',
        'SAML SSO integration',
        'Premier support'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom Pricing',
      features: [
        'Unlimited users',
        'Annual task pools',
        'Advanced admin & permissions',
        'Observability & monitoring tools',
        'Custom data retention policies',
        'Dedicated Customer Success Manager',
        'Custom SLAs & support'
      ]
    }
  ],
  faqItems: [
    { question: 'Is Zapier free?', answer: 'Yes, Zapier offers a Free Forever plan with 100 tasks monthly and unlimited two-step Zaps. This is genuinely useful for personal automation or very small businesses. No credit card required, no time limit.' },
    { question: 'How does Zapier\'s pricing work?', answer: 'Zapier charges based on "tasks"—each time a Zap successfully completes an action counts as one task. A Zap with 5 actions running once uses 5 tasks. Filters, Formatters, and Paths don\'t count. Plans range from free (100 tasks) to Enterprise (unlimited).' },
    { question: 'How many apps does Zapier integrate with?', answer: 'Zapier connects with over 8,000 apps—more than any competitor. This includes major platforms (Google, Microsoft, Salesforce, Slack) and thousands of niche tools.' },
    { question: 'Is Zapier secure?', answer: 'Yes, Zapier is SOC 2 Type II certified, GDPR/CCPA compliant, and uses AES-256 encryption. However, it\'s cloud-only. For HIPAA compliance or strict data sovereignty, Zapier isn\'t suitable.' },
    { question: 'Zapier vs Make - which is better?', answer: 'Zapier is easier to use with more integrations (8,000+ vs 1,500). Make is cheaper at scale with a more powerful visual builder. Choose Zapier for ease and breadth; choose Make for complex workflows on a budget.' },
    { question: 'Can Zapier replace a developer?', answer: 'For integration and automation tasks, often yes. Connecting apps, syncing data, automating workflows—Zapier handles without code. But for custom business logic or unique requirements, development skills may still be needed.' },
    { question: 'How long does it take to learn Zapier?', answer: 'Basic Zaps: 30 minutes. Comfortable with multi-step workflows: 1-2 days. Proficient with advanced features: 1-2 weeks. Compared to alternatives, Zapier\'s learning curve is gentle.' },
    { question: 'Does Zapier have a mobile app?', answer: 'No. You cannot create or manage Zaps from mobile devices. The web interface works on mobile browsers but is limited. This is a significant weakness for a platform at Zapier\'s scale.' },
    { question: 'What happens if I exceed my task limit?', answer: 'Zapier doesn\'t immediately cut off your Zaps. You\'ll get warnings as you approach limits. If exceeded, you\'ll be prompted to upgrade or your Zaps may pause until the next billing cycle.' },
    { question: 'Is Zapier worth the price?', answer: 'For most businesses automating manual processes, yes. The ROI typically exceeds 10x the subscription cost. But high-volume users should compare with Make, and technical teams should consider n8n.' },
    { question: 'What\'s the biggest mistake people make with Zapier?', answer: 'Underestimating task consumption. Teams build Zaps without understanding how many tasks they\'ll use, then get surprised by bills. Always test task usage with sample data before deploying widely.' }
  ]
}

// Run the upload
uploadReview('zapier', zapierData)
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })
