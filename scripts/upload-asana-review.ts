/**
 * Asana Review Upload Script
 *
 * Uses the generic upload-review.ts module
 */

import { uploadReview, ReviewData } from './upload-review'

const asanaData: ReviewData = {
  name: 'Asana',
  slug: 'asana',
  tagline: 'The Project Management Platform That Helps Teams Orchestrate Work',
  excerpt: 'Asana is one of the most capable project management tools available today, created by Facebook co-founder Dustin Moskovitz. After three months managing multiple projects with a team of eight, we cover everything from pricing to real-world usability in this comprehensive review.',
  overallScore: 8.4,
  scores: {
    easeOfUse: 8.0,
    features: 8.5,
    value: 7.0,
    support: 7.5,
    integrations: 9.0
  },
  quickInfo: {
    startingPrice: '$10.99/user/month (2-seat min)',
    freeTrial: 'Free forever (up to 10 users) + 30-day trial',
    bestFor: 'Marketing teams, creative agencies, product teams',
    integrations: '200+'
  },
  companyInfo: {
    founded: '2008',
    headquarters: 'San Francisco, California',
    companySize: '1,500+ employees',
    funding: '$213M raised, Public (NYSE: ASAN)'
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Help center and community forums for free users. Email support (1-2 business days) for paid plans. Priority support requires Enterprise plan. Dedicated CSM on Enterprise.'
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'CCPA', 'CSA STAR', 'HIPAA (Enterprise+)', 'SAML SSO', 'SCIM']
  },
  popularIntegrations: [
    'Slack', 'Microsoft Teams', 'Google Drive', 'Dropbox', 'Zoom',
    'Salesforce', 'Jira', 'GitHub', 'Zapier', 'Harvest',
    'Figma', 'Adobe Creative Cloud', 'Outlook', 'Gmail', 'Box'
  ],
  affiliateLink: 'https://asana.grsm.io/workflowautomation',
  pros: [
    'Exceptional task management depth with 5-level subtasks',
    'Powerful dependency management that auto-adjusts schedules',
    'Outstanding integration quality — Slack, GitHub, and more work flawlessly',
    'Mature, stable platform with rare downtime and reliable updates',
    'Multi-homing allows tasks to exist in multiple projects without duplication',
    'Strong free plan for teams up to 10 people',
    'Six different views: List, Board, Timeline, Calendar, Workload, Dashboard',
    'Thoughtful design philosophy with progressive feature disclosure',
    'Excellent async communication features for remote teams',
    'Comprehensive template library for quick project setup'
  ],
  cons: [
    'One assignee per task limitation frustrates many teams',
    'Expensive pricing model — $10.99-24.99/user/month',
    'Time tracking only in Advanced plan ($24.99/user)',
    '2-seat minimum on paid plans excludes freelancers',
    'Timeline view requires paid Starter plan',
    'Learning curve takes 2-4 weeks for proficiency',
    'Support quality varies by plan — no live chat below Enterprise',
    'Goals and Portfolios locked behind Advanced plan',
    'Visual design is functional but not as delightful as Monday.com',
    'Performance can slow with very large projects'
  ],
  pricing: [
    {
      name: 'Personal',
      price: 'Free Forever',
      features: [
        'Up to 10 team members',
        'Unlimited tasks & projects',
        'List, Board & Calendar views',
        'Basic reporting',
        'Mobile apps',
        '100+ integrations'
      ]
    },
    {
      name: 'Starter',
      price: '$10.99/user/mo (annual)',
      features: [
        'Everything in Personal',
        'Timeline (Gantt) view',
        'Custom fields',
        'Forms for intake',
        '20 rules per project',
        'Unlimited guests'
      ],
      highlighted: true
    },
    {
      name: 'Advanced',
      price: '$24.99/user/mo (annual)',
      features: [
        'Everything in Starter',
        'Goals & Portfolios',
        'Time tracking',
        'Workload management',
        'Unlimited rules',
        'Custom field locking'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Advanced',
        'SAML SSO & SCIM',
        'Advanced admin controls',
        'Data export',
        'Priority support',
        'Dedicated CSM'
      ]
    },
    {
      name: 'Enterprise+',
      price: 'Custom',
      features: [
        'Everything in Enterprise',
        'HIPAA compliance',
        'Data residency',
        'Advanced audit logs',
        'Enhanced security',
        'Premium support SLA'
      ]
    }
  ],
  faqItems: [
    { question: 'Is Asana really worth $10.99 per user per month?', answer: 'It depends on your needs. If you use Timeline views, dependencies, custom fields, and automation daily, then yes—the efficiency gains justify the cost. If you just need basic task lists, the free plan or cheaper alternatives serve better. Calculate your specific ROI including time saved on project coordination.' },
    { question: 'Can I use Asana effectively as a solo user?', answer: 'Technically yes, but it\'s not cost-effective. You pay for two seats minimum on any paid plan. Notion, Todoist, or ClickUp\'s free plan serve solopreneurs better. Asana\'s strength is team collaboration, not individual productivity.' },
    { question: 'Does Asana work offline?', answer: 'The mobile apps have limited offline functionality. You can view cached tasks and make changes that sync when reconnected. But it\'s not a robust offline solution. If you need reliable offline access, consider tools with better offline support.' },
    { question: 'How long does it take to learn Asana?', answer: 'Based on experience, expect 1-2 weeks to feel comfortable with basics, and about a month for efficient use. Power features like Portfolios and advanced automation take longer. The learning curve is moderate—not as flat as Trello, not as steep as ClickUp.' },
    { question: 'Can Asana replace spreadsheets for project management?', answer: 'For most project management needs, absolutely. Asana is far superior for task tracking, collaboration, and workflow management. However, you might still need spreadsheets for complex calculations or data analysis that Asana\'s reporting can\'t handle.' },
    { question: 'Is there a desktop app for Asana?', answer: 'Yes, Asana offers desktop apps for Mac and Windows. They\'re essentially wrapped versions of the web app but include native features like notifications and quick add. The web version is equally capable.' },
    { question: 'Can clients see my entire workspace in Asana?', answer: 'No. Guest users only see projects they\'re specifically invited to. You control exactly what external users can access. This is one area where Asana excels for agency and client work.' },
    { question: 'What happens to my data if I cancel my Asana subscription?', answer: 'Your workspace downgrades to the free Personal plan. You keep your data but lose access to paid features like Timeline view and custom fields. Projects using these features become view-only until you upgrade again. You can export your data at any time.' },
    { question: 'Why can\'t I assign a task to multiple people?', answer: 'Asana intentionally limits tasks to one assignee for accountability. Their philosophy is that shared responsibility often means no responsibility. Workarounds include creating subtasks for each person or using Collaborators to involve multiple people without multiple assignees.' },
    { question: 'How does Asana compare to Jira for software development?', answer: 'Asana works for development coordination but isn\'t purpose-built for it. Jira provides story points, sprints, velocity tracking, and developer-specific features. Development teams typically prefer Jira. Cross-functional product teams often use both—Jira for engineering, Asana for everything else.' },
    { question: 'Is Asana secure enough for enterprise use?', answer: 'Asana maintains SOC 2 Type II, ISO 27001, and GDPR compliance. Enterprise plans add SAML SSO and SCIM provisioning. Enterprise+ adds HIPAA compliance for healthcare. Security meets most enterprise requirements. Highly regulated industries should evaluate specific compliance needs.' }
  ]
}

// Run the upload
uploadReview('asana', asanaData)
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })
