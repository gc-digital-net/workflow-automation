/**
 * Monday.com Review Upload Script
 *
 * Uses the generic upload-review.ts module
 */

import { uploadReview, ReviewData } from './upload-review'

const mondayData: ReviewData = {
  name: 'Monday.com',
  slug: 'monday-com',
  tagline: 'The Visual Work OS That Makes Work Flow',
  excerpt: 'Monday.com is the most visually intuitive project management platform that transforms how teams work together. With colorful boards, powerful automation, and incredible flexibility, it makes project management actually enjoyable. Our 6-month review covers everything from pricing to real-world adoption.',
  overallScore: 8.5,
  scores: {
    easeOfUse: 9.5,
    features: 8.5,
    value: 7.5,
    support: 8.0,
    integrations: 9.0
  },
  quickInfo: {
    startingPrice: '$9/user/month (3-seat min)',
    freeTrial: 'Free forever (2 users) + 14-day Pro trial',
    bestFor: 'Visual teams, marketing, creative agencies',
    integrations: '200+'
  },
  companyInfo: {
    founded: '2012',
    headquarters: 'Tel Aviv, Israel',
    companySize: '1,800+ employees',
    funding: '$574M raised, Public (NASDAQ: MNDY)'
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Email support on all plans (24-48h). Priority chat on Pro. Dedicated CSM on Enterprise. Excellent Monday Academy and knowledge base.'
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'ISO 27017', 'ISO 27018', 'HIPAA (Enterprise)', 'TRUSTe certified']
  },
  popularIntegrations: [
    'Slack', 'Microsoft Teams', 'Gmail', 'Outlook', 'Google Drive',
    'Dropbox', 'Zoom', 'Salesforce', 'HubSpot', 'Jira',
    'GitHub', 'Zapier', 'Trello', 'Asana', 'Zendesk'
  ],
  affiliateLink: 'https://mondaycom.grsm.io/workflowautomation',
  pros: [
    'Most visually intuitive interface in project management — teams actually enjoy using it',
    'Incredible ease of adoption — 95% team adoption within days, not weeks',
    'Powerful automation that non-technical users can build',
    'Excellent template library with 200+ ready-to-use workflows',
    'Strong integration ecosystem with 200+ native integrations',
    'Color coding system makes status and progress instantly clear',
    'Multiple views (Table, Timeline, Kanban, Calendar, Map, Chart)',
    'Guest access enables seamless client collaboration',
    'Scales beautifully from 5 to 500+ team members',
    'Regular feature updates and continuous platform improvement'
  ],
  cons: [
    'Gets expensive quickly — 3-seat minimum and per-user pricing punish growth',
    'Mobile app lacks key features compared to desktop',
    'Search functionality is frustratingly basic',
    'Cross-board reporting is complicated and limited',
    'Timeline view requires Standard plan ($12/user) — should be in Basic',
    'Time tracking only available in Pro plan ($20/user)',
    'Advanced users hit customization ceilings quickly',
    'No true offline functionality',
    'Performance degrades with very large boards (10,000+ items)',
    'Learning curve exists for advanced automation and formulas'
  ],
  pricing: [
    {
      name: 'Individual',
      price: 'Free Forever',
      features: [
        'Up to 2 users',
        'Up to 3 boards',
        '200+ templates',
        'iOS & Android apps',
        '200 items total',
        'Basic columns only'
      ]
    },
    {
      name: 'Basic',
      price: '$9/user/mo (annual)',
      features: [
        'Unlimited boards',
        'Unlimited items',
        '5GB file storage',
        'Prioritized support',
        '250+ templates',
        'iOS & Android apps'
      ]
    },
    {
      name: 'Standard',
      price: '$12/user/mo (annual)',
      features: [
        'Everything in Basic',
        'Timeline & Calendar views',
        'Guest access (4 per seat)',
        '250 automation actions/month',
        '250 integration actions/month',
        'Forms for data collection'
      ],
      highlighted: true
    },
    {
      name: 'Pro',
      price: '$20/user/mo (annual)',
      features: [
        'Everything in Standard',
        'Private boards & docs',
        'Time tracking',
        'Formula & dependency columns',
        '25,000 automation actions/month',
        'Chart view & dashboards'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Pro',
        'Enterprise-grade security',
        'Advanced reporting & analytics',
        'Multi-level permissions',
        'SAML SSO & SCIM',
        'Dedicated Customer Success Manager',
        'Premium support & SLA'
      ]
    }
  ],
  faqItems: [
    { question: 'Is Monday.com worth the price?', answer: 'For visual teams over 10 people, usually yes. The efficiency gains and adoption rates offset premium pricing. Marketing teams and agencies see fastest ROI. Small teams and budget-conscious startups should consider alternatives like Asana or ClickUp.' },
    { question: 'Can Monday.com replace multiple tools?', answer: 'Monday.com successfully replaces basic project management, simple CRM, light documentation, and basic time tracking. It won\'t replace specialized tools like advanced CRM (Salesforce), development tools (Jira), or accounting software. Most teams use it as their central hub.' },
    { question: 'How long does implementation really take?', answer: 'Basic implementation takes 2-3 days. Full team adoption occurs within 1-2 weeks. Compare this to 4-8 weeks for ClickUp or similar platforms. The visual interface and templates accelerate setup dramatically.' },
    { question: 'What\'s the biggest limitation?', answer: 'Pricing model for larger teams and limited customization depth tie for biggest limitations. The 3-seat minimum frustrates small teams. Per-user pricing punishes growth. Advanced users hit customization ceilings quickly.' },
    { question: 'Is the automation worth it?', answer: 'Automation requires Standard plan ($12/user) but proves valuable for most teams. The visual builder makes automation accessible to non-technical users. Pre-built recipes work immediately. We saved 5+ hours weekly through automation.' },
    { question: 'How does Monday.com compare to ClickUp?', answer: 'Monday.com prioritizes visual simplicity and ease of adoption. ClickUp provides more features and customization at lower cost. Monday.com achieves 95% adoption in days. ClickUp struggles to exceed 60% after weeks. Choose Monday.com for visual teams; ClickUp for power users.' },
    { question: 'Can Monday.com handle complex projects?', answer: 'Basic project tracking works well. Visual Timeline view communicates effectively. But advanced project management features are missing—no resource leveling, baseline tracking, or earned value management. It\'s project coordination, not full project management.' },
    { question: 'Is Monday.com good for software development?', answer: 'Development teams can use Monday.com but shouldn\'t. The platform lacks agile features like story points, velocity tracking, and burndown charts. Developers prefer text over visual communication. Jira or Linear serve development teams better.' },
    { question: 'What about customer support?', answer: 'Support quality varies by plan. Basic plans get slow email support. Standard/Pro get 24/7 chat with mixed quality. Enterprise gets dedicated success managers. The knowledge base and Monday Academy provide excellent self-service resources.' },
    { question: 'Does Monday.com work offline?', answer: 'Limited offline functionality exists—you can view cached boards and queue updates. Changes sync when reconnected. But don\'t rely on offline mode for critical work. True offline functionality doesn\'t exist.' },
    { question: 'Is Monday.com secure enough for enterprise?', answer: 'Monday.com maintains ISO 27001, SOC 2, and GDPR compliance. Enterprise plans add SSO, HIPAA compliance, and advanced permissions. Security meets most enterprise requirements. Highly regulated industries should evaluate specific compliance needs.' }
  ]
}

// Run the upload
uploadReview('monday', mondayData)
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })
