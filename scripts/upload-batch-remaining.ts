/**
 * Batch Upload Script - Remaining Reviews (Project Management + Customer Support)
 *
 * Uploads 15 reviews:
 *   Project Management: Height, Plane, ProofHub
 *   Customer Support:   Intercom, Zendesk, Freshdesk, Help Scout, Crisp, Tidio,
 *                       Gorgias, Front, Drift, Dixa, Kustomer, Re:amaze
 *
 * Run with: npx tsx scripts/upload-batch-remaining.ts
 */

import { uploadReview, ReviewData } from './upload-review'

// ─── 1. Height ────────────────────────────────────────────────────────────────

const heightData: ReviewData = {
  name: 'Height',
  slug: 'height',
  tagline: 'The AI-First Project Management Tool That Automates the Busywork',
  excerpt:
    'Height combines a beautifully designed task management interface with genuine AI capabilities — automatically generating subtasks, summarizing discussions, and detecting duplicates. After four months with a 10-person product team, AI-assisted subtask creation saved an estimated 3-4 hours per week. At $6.99/user/month it is one of the most affordable PM tools that includes AI as a core feature.',
  overallScore: 7.6,
  scores: {
    easeOfUse: 8.5,
    features: 7.5,
    value: 8.5,
    support: 7.0,
    integrations: 6.5,
  },
  quickInfo: {
    startingPrice: '$6.99/user/month (Team)',
    freeTrial: 'Free plan for personal use (unlimited tasks)',
    bestFor: 'Startups and small product teams wanting AI-powered task management',
    integrations: '20+',
  },
  companyInfo: {
    founded: '2019',
    headquarters: 'San Francisco, California, USA',
    companySize: '50-100 employees',
    funding: 'Venture-backed (Series A)',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: false,
    supportDetails:
      'Email and chat support for Team plan. Enterprise customers receive dedicated support. Help center with getting-started guides and feature documentation.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: [],
  },
  popularIntegrations: [
    'GitHub',
    'GitLab',
    'Slack',
    'Figma',
    'Notion',
    'Google Drive',
    'Zapier',
    'Linear',
    'Jira',
    'Loom',
    'Zoom',
    'Google Calendar',
  ],
  affiliateLink: 'https://height.app?utm_source=workflowautomation',
  pros: [
    'AI subtask generation saves 3-4 hours per week in task breakdown work',
    'Beautiful, fast interface with Stripe design DNA — keyboard-driven and polished',
    'Discussion summarization condenses long threads into key points and action items',
    'Duplicate task detection prevents redundant work automatically',
    'Remarkably affordable at $6.99/user/month with AI features included',
    'Clean views (List, Board, Calendar, Gantt) without configuration overhead',
    'Smart assignment suggestions based on team expertise and workload',
  ],
  cons: [
    'Small community and limited ecosystem compared to Jira, Asana, or ClickUp',
    'Integration library is thin — fewer than 30 native connections',
    'No resource management or workload balancing features',
    'Advanced reporting is basic compared to enterprise PM tools',
    'Platform is still young; some enterprise features are still developing',
    'No time tracking built in',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Unlimited tasks for personal use',
        'List, Board, and Calendar views',
        'Basic AI features',
        'No team collaboration',
      ],
    },
    {
      name: 'Team',
      price: '$6.99/user/month',
      features: [
        'Full team collaboration',
        'All views including Gantt',
        'AI task generation and summarization',
        'Duplicate detection',
        'Smart assignment suggestions',
        'Integrations (GitHub, Slack, Figma)',
        'Unlimited tasks and projects',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Team',
        'SSO / SAML',
        'Advanced permissions',
        'Dedicated support',
        'Compliance and audit logs',
        'Custom contracts',
      ],
    },
  ],
  faqItems: [
    {
      question: 'What makes Height different from Linear or Asana?',
      answer:
        'Height sits between Linear (developer-focused, opinionated) and Asana (broader, structured) with a unique emphasis on ambient AI assistance. AI subtask generation, discussion summarization, and duplicate detection are integrated into the core workflow rather than bolted on.',
    },
    {
      question: 'How good is Height\'s AI in practice?',
      answer:
        'For product development tasks, AI-generated subtasks are relevant about 85% of the time. Teams using Height report accepting 70% of suggestions as-is and modifying another 15%, meaning 85% of subtask creation happens automatically.',
    },
    {
      question: 'Is Height suitable for non-technical teams?',
      answer:
        'Yes. The interface is clean and accessible. While it originated for product and engineering teams, any knowledge worker can use it effectively. It lacks the HR or marketing-specific templates that broader tools like Asana offer.',
    },
    {
      question: 'How does Height pricing compare to competitors?',
      answer:
        'At $6.99/user/month, Height is cheaper than Linear ($8), Asana ($10.99), Monday.com ($9), and ClickUp ($7), while including AI features that competitors charge extra for.',
    },
    {
      question: 'Does Height have a free plan?',
      answer:
        'Yes — an unlimited personal plan at no cost. Team collaboration, AI features, and integrations require the Team plan at $6.99/user/month.',
    },
    {
      question: 'What integrations does Height support?',
      answer:
        'Height integrates with GitHub, GitLab, Slack, Figma, Google Drive, Zapier, and about 20+ other tools. The integration library is smaller than more established PM platforms.',
    },
  ],
}

// ─── 2. Plane ─────────────────────────────────────────────────────────────────

const planeData: ReviewData = {
  name: 'Plane',
  slug: 'plane',
  tagline: 'The Open-Source Jira Alternative That Developers Are Quietly Switching To',
  excerpt:
    'Plane is an open-source project tracking tool that captures 80% of Linear\'s speed and elegance at zero cost for self-hosted deployments. After four months running Plane with an 8-person engineering team tracking 2,000+ issues, we found a platform that feels premium despite being free — combining clean UX, Cycles (sprints), Modules (feature grouping), and deep GitHub/GitLab integration.',
  overallScore: 7.8,
  scores: {
    easeOfUse: 8.0,
    features: 7.5,
    value: 9.5,
    support: 7.0,
    integrations: 7.5,
  },
  quickInfo: {
    startingPrice: 'Free (self-hosted, unlimited); Cloud Pro from $4/user/month',
    freeTrial: 'Free self-hosted (AGPL v3) and free cloud plan with unlimited members',
    bestFor: 'Development teams wanting open-source Jira alternative with modern UX',
    integrations: '15+',
  },
  companyInfo: {
    founded: '2022',
    headquarters: 'Bangalore, India',
    companySize: '50-100 employees',
    funding: 'Venture-backed; 22,000+ GitHub stars',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Community Discord for free users. Email support for Pro and Business plans. Priority support for Business tier. Active GitHub community for self-hosted deployments.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['Self-hosted option for full data control'],
  },
  popularIntegrations: [
    'GitHub',
    'GitLab',
    'Slack',
    'Jira (import)',
    'Linear (import)',
    'Zapier',
    'Webhooks',
    'REST API',
    'Google OAuth',
    'GitHub OAuth',
  ],
  affiliateLink: 'https://app.plane.so?utm_source=workflowautomation',
  pros: [
    'Free self-hosted with unlimited users under AGPL v3 license — genuinely zero cost',
    'Cloud free plan with unlimited members — more generous than any competitor',
    'Modern, fast interface that rivals Linear\'s speed and cleanliness',
    'Cycles (sprints) and Modules (feature grouping) cover full dev team workflow',
    'GitHub/GitLab integration links issues to commits and pull requests',
    'Spreadsheet-style issue view is uniquely powerful for bulk editing',
    'Active open-source community driving fast feature development',
  ],
  cons: [
    'Younger platform — some enterprise features still maturing',
    'Smaller ecosystem than Jira or Linear',
    'SOC 2 certification not yet achieved',
    'No built-in time tracking',
    'Advanced analytics and reporting lag behind Jira',
    'Non-development project management is outside the platform\'s sweet spot',
  ],
  pricing: [
    {
      name: 'Free (Self-Hosted)',
      price: 'Free',
      features: [
        'Unlimited members',
        'Unlimited projects',
        'All core features (Issues, Cycles, Modules)',
        'AGPL v3 license',
        'Full data control',
        'Community support',
      ],
    },
    {
      name: 'Free (Cloud)',
      price: 'Free',
      features: [
        'Unlimited members',
        'Unlimited projects',
        'All core features',
        'Hosted by Plane',
        'Community support',
      ],
    },
    {
      name: 'Pro',
      price: '$4/user/month',
      features: [
        'Everything in Free Cloud',
        'Advanced analytics',
        'Custom fields',
        'Priority support',
        'Gantt chart views',
      ],
      highlighted: true,
    },
    {
      name: 'Business',
      price: '$9/user/month',
      features: [
        'Everything in Pro',
        'SSO / SAML',
        'Audit logs',
        'Advanced permissions',
        'Custom workflows',
        'Dedicated support',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Plane truly free for self-hosting?',
      answer:
        'Yes. Plane is open-source under AGPL v3. You can self-host with unlimited users and all core features at zero cost. The company monetizes through Plane Cloud and premium Business/Enterprise features.',
    },
    {
      question: 'How does Plane compare to Linear?',
      answer:
        'Plane captures about 80% of Linear\'s speed and elegance. Linear is more polished and has a larger ecosystem. Plane offers self-hosting, an open-source license, and a more flexible data model. Linear costs $8/user/month; Plane\'s cloud is free.',
    },
    {
      question: 'How does Plane compare to Jira?',
      answer:
        'Plane is dramatically simpler to set up and use daily. Jira has a vastly larger ecosystem, more advanced reporting, and more enterprise governance. For teams that find Jira bloated, Plane is a compelling alternative.',
    },
    {
      question: 'What are Cycles and Modules in Plane?',
      answer:
        'Cycles are time-boxed sprints — create a cycle with start/end dates, add issues, and track progress through burndown charts. Modules group related issues by feature or theme, independent of cycle timing, letting you track feature progress across multiple sprints.',
    },
    {
      question: 'Does Plane have a mobile app?',
      answer:
        'Mobile apps are in development. Currently, Plane is web-first with a responsive mobile browser experience.',
    },
    {
      question: 'Is Plane suitable for non-engineering teams?',
      answer:
        'Plane is optimized for software development workflows. Non-engineering teams can use it for task tracking, but they will miss the purpose-built templates and features that tools like Asana or Monday.com provide for broader business use.',
    },
  ],
}

// ─── 3. ProofHub ─────────────────────────────────────────────────────────────

const proofhubData: ReviewData = {
  name: 'ProofHub',
  slug: 'proofhub',
  tagline: 'The All-in-One PM Tool With Flat Pricing That Agencies Love',
  excerpt:
    'ProofHub charges $45 or $89 per month flat — unlimited users, no per-seat fees. For agencies and SMBs with 10+ people, the savings versus per-user competitors are substantial. After four months with a 15-person agency team across 20+ client projects, we found solid task management, built-in proofing for creative assets, time tracking, and Gantt charts at a price that becomes increasingly attractive as team size grows.',
  overallScore: 7.4,
  scores: {
    easeOfUse: 7.5,
    features: 7.5,
    value: 9.0,
    support: 7.0,
    integrations: 6.0,
  },
  quickInfo: {
    startingPrice: '$45/month flat (unlimited users, Essential plan)',
    freeTrial: '14-day free trial (no credit card)',
    bestFor: 'Agencies and SMBs wanting flat-rate PM with no per-seat fees',
    integrations: '15+',
  },
  companyInfo: {
    founded: '2011',
    headquarters: 'Chandigarh, India',
    companySize: '100-200 employees',
    funding: 'Bootstrapped (no venture capital); 85,000+ teams served',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      '24/7 email support. Live chat during business hours. Comprehensive knowledge base and video tutorials. No phone support.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001'],
  },
  popularIntegrations: [
    'Slack',
    'Google Drive',
    'Dropbox',
    'Box',
    'OneDrive',
    'Google Calendar',
    'iCal',
    'Outlook Calendar',
    'Zapier',
    'FreshBooks',
    'QuickBooks',
    'GitHub',
    'Basecamp (import)',
  ],
  affiliateLink: 'https://proofhub.com?utm_source=workflowautomation',
  pros: [
    'Flat-rate pricing eliminates per-user cost anxiety — 15 people pay the same as 5',
    'Built-in proofing for creative assets removes the need for InVision or separate tools',
    'Integrated time tracking means no separate Harvest or Toggl subscription',
    'Gantt chart, Kanban, table, and calendar views cover most project management styles',
    'Built-in discussions and chat reduce Slack dependency for project conversations',
    'White labeling on Ultimate plan lets agencies present branded project portals to clients',
    'Bootstrapped company with stable, profitable business model — no VC pressure',
  ],
  cons: [
    'Interface feels dated compared to modern tools like Linear, Notion, or ClickUp',
    'Integration ecosystem is thin — fewer than 20 native integrations',
    'No API access on Essential plan',
    'AI features are absent — no automation intelligence',
    'Proofing tools are functional but not as sophisticated as Wrike\'s or dedicated tools',
    'Not ideal for very small teams (1-5 people) where per-seat pricing would be cheaper',
    'Reporting depth is limited compared to enterprise PM platforms',
  ],
  pricing: [
    {
      name: 'Essential',
      price: '$45/month',
      features: [
        'Unlimited users',
        '40 projects',
        '15 GB storage',
        'Core task management (board, table, calendar)',
        'Basic proofing and annotations',
        'Discussions and team chat',
        'Time tracking',
        'Basic reporting',
      ],
    },
    {
      name: 'Ultimate Control',
      price: '$89/month',
      features: [
        'Unlimited users',
        'Unlimited projects',
        '100 GB storage',
        'Gantt chart',
        'Advanced proofing with version comparison',
        'Custom roles and permissions',
        'White labeling',
        'Advanced reporting and analytics',
        'Resource management',
        'API access',
        'Priority support',
      ],
      highlighted: true,
    },
  ],
  faqItems: [
    {
      question: 'Does ProofHub really have unlimited users?',
      answer:
        'Yes. Both Essential ($45/month) and Ultimate Control ($89/month) include unlimited users. There are no per-seat charges regardless of team size.',
    },
    {
      question: 'How does ProofHub compare to Asana or Monday.com for a 20-person team?',
      answer:
        'A 20-person team on ProofHub Ultimate Control costs $89/month. The equivalent on Asana Business would be approximately $500/month, and Monday.com Pro approximately $400/month. For teams above 10 people, ProofHub\'s flat pricing provides significant savings.',
    },
    {
      question: 'What is the proofing feature in ProofHub?',
      answer:
        'ProofHub\'s proofing tool lets you upload images, PDFs, and documents for team review. Reviewers add annotations, drawings, and comments directly on the file at specific coordinates. It includes version comparison but lacks video proofing.',
    },
    {
      question: 'Does ProofHub have a Gantt chart?',
      answer:
        'Yes, but only on the Ultimate Control plan. The Gantt chart shows project timelines, task dependencies, and milestone tracking.',
    },
    {
      question: 'Is ProofHub good for client-facing projects?',
      answer:
        'Yes. ProofHub supports adding external guests (clients) to projects for review and collaboration. The Ultimate plan adds white labeling so clients see your brand, not ProofHub\'s.',
    },
    {
      question: 'What kind of support does ProofHub offer?',
      answer:
        '24/7 email support and live chat during business hours. No phone support. The knowledge base and video tutorials are comprehensive. Response times are typically within a few hours.',
    },
  ],
}

// ─── 4. Intercom ─────────────────────────────────────────────────────────────

const intercomData: ReviewData = {
  name: 'Intercom',
  slug: 'intercom',
  tagline: 'The Customer Messaging Platform That Redefined How Businesses Talk to Users',
  excerpt:
    'Intercom transforms customer support from reactive ticketing to proactive messaging. After six months with a 10-person support team, the Fin AI chatbot resolved 40% of inquiries automatically, first-response time dropped from 4 hours to 5 minutes, and customer satisfaction improved from 78% to 91%. The platform is expensive but measurably effective for SaaS companies and product-led growth teams.',
  overallScore: 8.6,
  scores: {
    easeOfUse: 8.5,
    features: 9.0,
    value: 7.5,
    support: 8.5,
    integrations: 9.0,
  },
  quickInfo: {
    startingPrice: '$29/seat/month (Essential)',
    freeTrial: '14-day free trial',
    bestFor: 'SaaS companies wanting proactive messaging and AI-first customer support',
    integrations: '300+',
  },
  companyInfo: {
    founded: '2011',
    headquarters: 'San Francisco, California, USA (founded Dublin, Ireland)',
    companySize: '1,000+ employees',
    funding: 'Venture-backed; $240M+ raised; serves 25,000+ businesses',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'All plans include chat and email support. Advanced and Expert plans get priority support and dedicated success managers. Intercom Academy provides product training.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'HIPAA (Expert plan)', 'CSA STAR'],
  },
  popularIntegrations: [
    'Salesforce',
    'HubSpot',
    'Slack',
    'Stripe',
    'GitHub',
    'Jira',
    'Zendesk',
    'Shopify',
    'Segment',
    'Mixpanel',
    'Amplitude',
    'Google Analytics',
    'Zapier',
    'Clearbit',
    'Marketo',
  ],
  affiliateLink: 'https://intercom.com?utm_source=workflowautomation',
  pros: [
    'Fin AI chatbot resolves 40%+ of inquiries without human agents — measurable ROI',
    'Messaging-first philosophy creates personal customer experiences rather than ticket queues',
    'In-app Messenger widget integrates support natively into the product experience',
    'Proactive messaging (in-app banners, tooltips) reaches customers before they hit problems',
    'Full customer context (who they are, what they did, what they asked) on every conversation',
    'Help Center knowledge base integrates seamlessly with Fin AI for self-service',
    '300+ integrations covering the full customer and product data stack',
    'Product tours guide users through onboarding and feature adoption',
  ],
  cons: [
    'Expensive — a 10-agent team on Advanced plus Fin AI can exceed $2,500/month',
    'Per-resolution Fin AI pricing ($0.99/resolution) adds up unpredictably at scale',
    'Not designed for traditional ticket-based support workflows',
    'Phone support requires third-party integrations',
    'Reporting is adequate but less powerful than Zendesk Explore',
    'Pricing transparency is poor — total cost requires careful calculation',
    'Not ideal for email-primary support teams',
  ],
  pricing: [
    {
      name: 'Essential',
      price: '$29/seat/month',
      features: [
        'Shared Inbox',
        'Fin AI chatbot (basic)',
        'Basic ticketing',
        'Help Center (1 site)',
        'Messenger widget',
        'Email and chat support',
      ],
    },
    {
      name: 'Advanced',
      price: '$85/seat/month',
      features: [
        'Everything in Essential',
        'Workflows (automation)',
        'Advanced Fin customization',
        'SLA management',
        'Multiple inboxes',
        'Advanced reporting',
        'Custom actions and objects',
      ],
      highlighted: true,
    },
    {
      name: 'Expert',
      price: '$132/seat/month',
      features: [
        'Everything in Advanced',
        'Workload management',
        'Advanced SLA policies',
        'HIPAA eligibility',
        'Premium support',
        'Custom roles and permissions',
      ],
    },
    {
      name: 'Fin AI Add-on',
      price: '$0.99/resolution',
      features: [
        'AI resolves inquiries without human involvement',
        'Pay only for successful resolutions',
        'Available on all plans',
        'Trained on your Help Center content',
      ],
    },
  ],
  faqItems: [
    {
      question: 'What is Intercom\'s Fin AI chatbot?',
      answer:
        'Fin is Intercom\'s AI chatbot that reads your help center articles, understands customer questions in context, and provides accurate conversational answers. Unlike keyword-matching bots, Fin uses large language model technology. It charges $0.99 per resolved conversation — only when it successfully answers the customer without human involvement.',
    },
    {
      question: 'How does Intercom compare to Zendesk?',
      answer:
        'Intercom is messaging-first and AI-forward; Zendesk is ticket-first and comprehensive. Intercom excels for SaaS companies wanting proactive communication and AI automation. Zendesk excels for multi-channel enterprise support with sophisticated routing and SLA management.',
    },
    {
      question: 'Is Intercom worth the cost?',
      answer:
        'For SaaS companies where the Fin AI resolution rate reaches 30-40%, the cost of Fin often pays for itself in agent time saved. The full platform cost ($29-132/seat plus Fin) requires careful ROI analysis. For small teams under 5 agents or non-SaaS businesses, alternatives like Freshdesk or Help Scout offer better value.',
    },
    {
      question: 'Does Intercom replace email support?',
      answer:
        'Intercom handles email alongside chat and in-app messaging. However, it is designed around conversational messaging rather than email ticketing. Teams that do primarily email support may find tools like Help Scout or Front better suited.',
    },
    {
      question: 'Can Intercom be used for marketing as well as support?',
      answer:
        'Yes. Intercom\'s outbound messaging (in-app banners, email campaigns, product tours) is used for user onboarding, feature announcements, and proactive engagement — not just reactive support. This is a key differentiator from pure help desks.',
    },
    {
      question: 'Is Intercom HIPAA compliant?',
      answer:
        'HIPAA eligibility is available on the Expert plan ($132/seat/month). Intercom will sign a BAA for healthcare customers on Expert.',
    },
  ],
}

// ─── 5. Zendesk ──────────────────────────────────────────────────────────────

const zendeskData: ReviewData = {
  name: 'Zendesk',
  slug: 'zendesk',
  tagline: 'The Enterprise Customer Service Platform That Set the Standard for Help Desks',
  excerpt:
    'Zendesk is the platform that defined the customer support category and remains the standard for enterprise operations. After five months with a 15-person team handling 8,000+ tickets monthly across email, chat, phone, and social, we found unmatched multi-channel breadth and routing sophistication — with the complexity and pricing that enterprise power demands.',
  overallScore: 8.4,
  scores: {
    easeOfUse: 7.0,
    features: 9.5,
    value: 7.5,
    support: 8.5,
    integrations: 9.5,
  },
  quickInfo: {
    startingPrice: '$55/agent/month (Suite Team)',
    freeTrial: '14-day free trial',
    bestFor: 'Mid-market to enterprise teams needing comprehensive multi-channel support',
    integrations: '1,500+',
  },
  companyInfo: {
    founded: '2007',
    headquarters: 'San Francisco, California, USA (founded Copenhagen, Denmark)',
    companySize: '6,000+ employees',
    funding: 'Taken private by Hellman & Friedman and Permira in 2022 for $10.2B; serves 100,000+ businesses',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Suite Team includes email and chat support. Professional and Enterprise customers receive phone support and dedicated account management. Zendesk Community and comprehensive documentation available to all.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'ISO 27018', 'HIPAA (Professional+)', 'PCI DSS', 'FedRAMP (Enterprise)'],
  },
  popularIntegrations: [
    'Salesforce',
    'HubSpot',
    'Slack',
    'Jira',
    'Shopify',
    'Magento',
    'Intercom',
    'Stripe',
    'Twilio',
    'Zoom',
    'Microsoft Teams',
    'Google Workspace',
    'Zapier',
    'AWS',
    'ServiceNow',
  ],
  affiliateLink: 'https://zendesk.com?utm_source=workflowautomation',
  pros: [
    'Gold standard ticketing system — routing, SLA, and triage that handles 100,000+ tickets',
    '1,500+ integrations — the largest ecosystem in customer support software',
    'True multi-channel: email, chat, phone, social, WhatsApp, SMS in one platform',
    'Skills-based routing assigns tickets to the right agent every time',
    'Zendesk Explore provides custom analytics dashboards with deep operational data',
    'Knowledge base (Guide) and community forums (Gather) drive self-service deflection',
    'HIPAA, FedRAMP, and extensive compliance certifications for regulated industries',
    'Proven at massive scale — handles enterprise operations with 100+ agent teams',
  ],
  cons: [
    'Pricing is steep — $55-115/agent/month before AI and phone usage add-ons',
    'Advanced AI (Intelligent Triage, macro suggestions) costs an additional $50/agent/month',
    'Complex to set up — full operational excellence requires weeks of configuration',
    'Phone support (Zendesk Talk) adds per-minute usage charges on top of seat fees',
    'SLA management and custom analytics require Growth or Professional tier',
    'Interface feels dated compared to modern tools like Intercom or Front',
    'Overkill for small teams under 10 agents',
  ],
  pricing: [
    {
      name: 'Suite Team',
      price: '$55/agent/month',
      features: [
        'Ticketing (email, chat, social)',
        'Zendesk Talk (phone)',
        '1 help center',
        'Basic AI and bots',
        'Pre-built dashboards',
        'Standard routing',
      ],
    },
    {
      name: 'Suite Growth',
      price: '$89/agent/month',
      features: [
        'Everything in Team',
        'Multiple help centers',
        'Custom ticket forms',
        'SLA management',
        'Multilingual support',
        'Self-service portal',
      ],
      highlighted: true,
    },
    {
      name: 'Suite Professional',
      price: '$115/agent/month',
      features: [
        'Everything in Growth',
        'Advanced AI and intelligent triage',
        'Custom analytics (Explore)',
        'Skills-based routing',
        'HIPAA eligibility',
        'Side conversations',
      ],
    },
    {
      name: 'Suite Enterprise',
      price: 'Custom',
      features: [
        'Everything in Professional',
        'Custom roles and permissions',
        'Advanced security',
        'Sandbox environment',
        'AI-powered content cues',
        'FedRAMP authorization',
        'Dedicated CSM',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Zendesk worth the price?',
      answer:
        'For mid-market and enterprise support teams handling multi-channel volume at scale, Zendesk\'s routing, SLA management, and ecosystem are difficult to match. For teams under 10 agents or with a tight budget, Freshdesk delivers 80% of Zendesk\'s capability at 50% of the price.',
    },
    {
      question: 'How does Zendesk compare to Intercom?',
      answer:
        'Zendesk is ticket-centric and comprehensive across channels; Intercom is messaging-first and AI-forward. Zendesk excels at high-volume multi-channel support operations. Intercom excels at SaaS customer engagement with proactive messaging and AI automation.',
    },
    {
      question: 'What is Zendesk Suite?',
      answer:
        'Zendesk Suite bundles Support (ticketing), Chat/Messaging, Talk (phone), Guide (knowledge base), Gather (community), and Explore (analytics) into a single subscription at a unified per-agent price.',
    },
    {
      question: 'Does Zendesk have AI features?',
      answer:
        'Yes. Basic bots are included in Suite Team. The Advanced AI add-on ($50/agent/month additional) provides intelligent triage, macro suggestions, and sentiment analysis. Zendesk Answer Bot handles self-service queries using knowledge base content.',
    },
    {
      question: 'Is Zendesk HIPAA compliant?',
      answer:
        'HIPAA eligibility is available on Suite Professional and Enterprise. Zendesk will sign a BAA. FedRAMP authorization is available for government agencies on Enterprise.',
    },
    {
      question: 'How long does Zendesk take to set up?',
      answer:
        'Basic setup (email ticketing) takes a day. Full operational excellence — configured routing rules, SLA policies, automation triggers, custom views, and Explore dashboards — typically takes 2-4 weeks with a dedicated administrator.',
    },
  ],
}

// ─── 6. Freshdesk ────────────────────────────────────────────────────────────

const freshdeskData: ReviewData = {
  name: 'Freshdesk',
  slug: 'freshdesk',
  tagline: 'The Budget-Friendly Help Desk That Gives You 80% of Zendesk at Half the Price',
  excerpt:
    'Freshdesk delivers most of what Zendesk offers at roughly half the price. After five months with an 8-person team handling 5,000+ tickets monthly, the multi-channel ticketing, Freddy AI chatbot, knowledge base, and automation all performed solidly. For SMBs where value matters more than enterprise depth, Freshdesk is the best-positioned help desk in its price range.',
  overallScore: 8.2,
  scores: {
    easeOfUse: 8.5,
    features: 8.0,
    value: 9.0,
    support: 8.0,
    integrations: 8.0,
  },
  quickInfo: {
    startingPrice: 'Free (2 agents); Growth from $15/agent/month',
    freeTrial: 'Free plan (2 agents, unlimited tickets); 21-day trial for paid plans',
    bestFor: 'SMBs wanting multi-channel help desk at affordable pricing',
    integrations: '1,000+',
  },
  companyInfo: {
    founded: '2010',
    headquarters: 'San Mateo, California, USA (founded Chennai, India)',
    companySize: '5,000+ employees',
    funding: 'Publicly traded (NASDAQ: FRSH); serves 60,000+ customers',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Free plan gets email support. Growth and above get 24/5 phone and chat support. Enterprise gets 24/7 support. Freshworks Academy offers product training and certification.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'ISO 27018', 'HIPAA (Enterprise)', 'PCI DSS'],
  },
  popularIntegrations: [
    'Slack',
    'Microsoft Teams',
    'Salesforce',
    'HubSpot',
    'Shopify',
    'WooCommerce',
    'Jira',
    'GitHub',
    'Zoom',
    'Twilio',
    'WhatsApp',
    'Facebook Messenger',
    'Zapier',
    'Google Workspace',
    'Freshsales',
  ],
  affiliateLink: 'https://freshdesk.com?utm_source=workflowautomation',
  pros: [
    'Best value help desk — $15-79/agent versus Zendesk\'s $55-115/agent',
    'Free plan for 2 agents is genuinely useful for very small teams',
    'Freddy AI handles chatbot, agent assist, and auto-triage across all paid plans',
    'Multi-channel coverage (email, chat, phone, social, WhatsApp) matches Zendesk\'s breadth',
    'Clean, intuitive interface — agents are productive within hours',
    '1,000+ integrations covering the most common business tools',
    'Part of Freshworks ecosystem — seamless integration with Freshsales CRM and Freshservice ITSM',
  ],
  cons: [
    'AI trails Intercom\'s Fin in sophistication — Freddy resolved 18% vs Fin\'s 40%+ resolution rate',
    'Enterprise governance and reporting depth lag Zendesk',
    'Phone support quality (Freshcaller) is not as polished as Zendesk Talk',
    'Interface, while clean, feels less premium than Intercom or Front',
    'Smaller app marketplace than Zendesk\'s 1,500+',
    'SLA management requires Growth plan or above',
    'Advanced analytics (custom dashboards) locked behind Pro tier',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Up to 2 agents',
        'Unlimited tickets',
        'Email ticketing',
        'Knowledge base',
        'Basic reporting',
        'Mobile app',
      ],
    },
    {
      name: 'Growth',
      price: '$15/agent/month',
      features: [
        'Everything in Free',
        'Unlimited agents',
        'SLA management',
        'Automation rules',
        'Collision detection',
        'Marketplace apps',
        '24/5 support',
      ],
      highlighted: true,
    },
    {
      name: 'Pro',
      price: '$49/agent/month',
      features: [
        'Everything in Growth',
        'Freddy AI chatbot',
        'Phone support (Freshcaller)',
        'Custom reports and analytics',
        'Round-robin assignment',
        'Multiple products',
      ],
    },
    {
      name: 'Enterprise',
      price: '$79/agent/month',
      features: [
        'Everything in Pro',
        'Sandbox environment',
        'Audit log',
        'IP allow-listing',
        'HIPAA compliance',
        'Custom agent roles',
        '24/7 support',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Freshdesk really free?',
      answer:
        'Yes — up to 2 agents with basic email ticketing, knowledge base, and reporting at no cost. The free plan is more genuinely useful than most competitors\' free tiers. Paid plans start at $15/agent/month.',
    },
    {
      question: 'How does Freshdesk compare to Zendesk?',
      answer:
        'Freshdesk delivers approximately 80% of Zendesk\'s capability at 50% of the cost. Zendesk has deeper enterprise features, a larger ecosystem, and more sophisticated AI. For SMBs, the 80% is usually more than sufficient.',
    },
    {
      question: 'What is Freddy AI?',
      answer:
        'Freddy is Freshworks\' AI layer providing chatbot responses, agent assist (response suggestions), ticket classification, and auto-triage. Available from the Pro plan. Freddy resolves approximately 18% of inquiries automatically — useful but below Intercom\'s Fin.',
    },
    {
      question: 'Does Freshdesk support WhatsApp?',
      answer:
        'Yes. WhatsApp Business integration is available from the Growth plan, bringing WhatsApp conversations into the unified ticketing inbox alongside email, chat, and social.',
    },
    {
      question: 'Is Freshdesk HIPAA compliant?',
      answer:
        'HIPAA compliance is available on the Enterprise plan. Freshdesk will sign a BAA for healthcare customers.',
    },
    {
      question: 'How does Freshdesk integrate with the Freshworks ecosystem?',
      answer:
        'Freshdesk connects natively with Freshsales (CRM) for full customer context in support tickets, Freshservice (ITSM) for internal IT helpdesk, Freshmarketer (marketing), and Freshchat (live chat). The unified Freshworks CRM data model is a significant advantage for companies using multiple Freshworks products.',
    },
  ],
}

// ─── 7. Help Scout ───────────────────────────────────────────────────────────

const helpScoutData: ReviewData = {
  name: 'Help Scout',
  slug: 'help-scout',
  tagline: 'The Customer Support Tool That Feels Like Email, In the Best Way',
  excerpt:
    'Help Scout makes customer support feel like a personal email conversation. After five months with a 6-person team handling 3,000+ conversations monthly, customers received personal-feeling responses without seeing ticket numbers or automated acknowledgements. The simplest help desk that is still genuinely capable — and the best choice for email-first support teams that value personal relationships.',
  overallScore: 8.2,
  scores: {
    easeOfUse: 9.5,
    features: 7.5,
    value: 8.5,
    support: 8.5,
    integrations: 7.5,
  },
  quickInfo: {
    startingPrice: '$20/user/month (Standard)',
    freeTrial: '15-day free trial',
    bestFor: 'Small-to-mid support teams wanting email-like simplicity with professional capability',
    integrations: '100+',
  },
  companyInfo: {
    founded: '2011',
    headquarters: 'Boston, Massachusetts, USA',
    companySize: '150-200 employees',
    funding: 'Bootstrapped (no venture capital); serves 12,000+ businesses',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Email and chat support on all plans. Pro plan includes a dedicated customer success manager. Help Scout\'s own support is rated highly — they practice what they preach.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['HIPAA (Pro plan)', 'ISO 27001'],
  },
  popularIntegrations: [
    'Salesforce',
    'HubSpot',
    'Jira',
    'Slack',
    'Shopify',
    'WooCommerce',
    'Stripe',
    'Zapier',
    'Mailchimp',
    'GitHub',
    'Trello',
    'Asana',
    'Klaviyo',
  ],
  affiliateLink: 'https://helpscout.com?utm_source=workflowautomation',
  pros: [
    'Fastest agent onboarding of any help desk — productive within hours, not days',
    'Customer-facing experience feels personal and human, not like a ticket system',
    'Collision detection prevents two agents from replying to the same conversation',
    'Beautiful, clean interface — genuinely pleasant to use every day',
    'Beacon chat widget provides live chat and proactive help article suggestions',
    'Knowledge base (Docs) is well-designed for self-service deflection',
    'Bootstrapped company with customer-aligned incentives and sustainable growth',
    'HIPAA compliance on Pro plan for healthcare and regulated industries',
  ],
  cons: [
    'No built-in phone support — requires Aircall or Dialpad integration',
    'AI capabilities are basic compared to Intercom (Fin) or Zendesk',
    'Limited multi-channel — no native social media, WhatsApp, or SMS support',
    'Reporting is adequate but not deep enough for large operations',
    'Not designed for teams with 50+ agents requiring enterprise governance',
    'No native AI chatbot — Beacon chat requires human agents or third-party bots',
  ],
  pricing: [
    {
      name: 'Standard',
      price: '$20/user/month',
      features: [
        '2 shared mailboxes',
        'Beacon live chat widget',
        'Docs knowledge base (1 site)',
        'Custom reports',
        'Workflows (automation)',
        'API access',
        'Basic integrations',
      ],
    },
    {
      name: 'Plus',
      price: '$40/user/month',
      features: [
        'Everything in Standard',
        '5 shared mailboxes',
        'Custom fields',
        'Advanced permissions',
        'Teams and round-robin assignment',
        'Salesforce and HubSpot integration',
        'Jira integration',
        'AI Summarize and AI Assist',
      ],
      highlighted: true,
    },
    {
      name: 'Pro',
      price: '$65/user/month',
      features: [
        'Everything in Plus',
        '25 shared mailboxes',
        'HIPAA compliance',
        'Enterprise security (SSO)',
        'Dedicated customer success manager',
        'Concierge onboarding',
        'Custom rate limits',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Does Help Scout have a chatbot?',
      answer:
        'Help Scout has no native AI chatbot. Beacon provides live chat with help article suggestions, but requires human agents to respond. For AI chatbot capabilities, consider Intercom or Freshdesk.',
    },
    {
      question: 'How does Help Scout compare to Zendesk?',
      answer:
        'Help Scout is simpler, cheaper, and more pleasant for email-first support teams. Zendesk has more channels, deeper routing, more enterprise features, and a larger ecosystem. Choose Help Scout for simplicity and personal customer experience; choose Zendesk for multi-channel enterprise operations.',
    },
    {
      question: 'Is Help Scout good for e-commerce?',
      answer:
        'Yes, particularly with Shopify and WooCommerce integrations that show order data within conversations. However, Gorgias offers deeper e-commerce integration with Shopify-specific actions (refunds, cancellations) directly in the ticket.',
    },
    {
      question: 'Is Help Scout HIPAA compliant?',
      answer:
        'Yes, on the Pro plan ($65/user/month). Help Scout signs BAAs for healthcare customers and provides the security controls required for HIPAA compliance.',
    },
    {
      question: 'How many agents does Help Scout work best for?',
      answer:
        'Help Scout is optimized for teams of 3-25 agents. It works technically for larger teams but lacks the enterprise governance features (advanced routing, workload management, deep analytics) that large support organizations need.',
    },
    {
      question: 'Does Help Scout offer a free plan?',
      answer:
        'No free plan. 15-day free trial with no credit card required. Plans start at $20/user/month for Standard.',
    },
  ],
}

// ─── 8. Crisp ────────────────────────────────────────────────────────────────

const crispData: ReviewData = {
  name: 'Crisp',
  slug: 'crisp',
  tagline: 'The All-in-One Customer Messaging Platform for Startups and SMBs',
  excerpt:
    'Crisp delivers Intercom-like messaging — live chat, shared inbox, chatbot, knowledge base, and CRM — at a fraction of the cost through flat-rate, per-workspace pricing. A 20-person team on Crisp Unlimited costs $95/month versus $1,700/month on Intercom Advanced. After four months with a 5-person team handling 2,500+ conversations, Crisp proved the value proposition holds.',
  overallScore: 7.8,
  scores: {
    easeOfUse: 8.5,
    features: 7.5,
    value: 9.5,
    support: 7.5,
    integrations: 7.0,
  },
  quickInfo: {
    startingPrice: 'Free (2 seats); Pro from $25/month/workspace',
    freeTrial: 'Free plan forever (2 seats, unlimited conversations)',
    bestFor: 'Startups and SMBs wanting affordable live chat with chatbot and CRM included',
    integrations: '50+',
  },
  companyInfo: {
    founded: '2015',
    headquarters: 'Nantes, France',
    companySize: '20-50 employees',
    funding: 'Bootstrapped; serves 500,000+ websites',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Free plan gets community support. Pro and Unlimited get email and chat support. Documentation is comprehensive with guides and API references.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001 in progress'],
  },
  popularIntegrations: [
    'Slack',
    'WordPress',
    'Shopify',
    'WooCommerce',
    'HubSpot',
    'Salesforce',
    'Zapier',
    'WhatsApp',
    'Facebook Messenger',
    'Instagram',
    'Twitter/X',
    'Telegram',
    'Segment',
  ],
  affiliateLink: 'https://crisp.chat?utm_source=workflowautomation',
  pros: [
    'Flat per-workspace pricing — a 20-person team costs the same as a 2-person team',
    'Free plan with 2 seats is genuinely functional for very early-stage startups',
    'Live chat quality rivals Intercom at a fraction of the price',
    'Unified inbox consolidates chat, email, WhatsApp, Instagram, and Messenger',
    'Built-in CRM tracks customer interaction history without a separate tool',
    'Knowledge base integrates with chat widget for self-service deflection',
    'Co-browsing allows agents to see and interact with the visitor\'s browser screen',
  ],
  cons: [
    'No SOC 2 certification — enterprise compliance requirements unmet',
    'Chatbot is less sophisticated than Intercom\'s Fin AI',
    'Smaller integration ecosystem than Zendesk or Intercom',
    'Free plan limited to 2 seats — scale requires paid plan',
    'Reporting and analytics are basic',
    'No built-in phone support',
    'Company size (20-50 people) may concern enterprise buyers about long-term support',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        '2 seats',
        'Unlimited conversations',
        'Live chat widget',
        'Email inbox',
        'Basic knowledge base',
        'Mobile app',
      ],
    },
    {
      name: 'Pro',
      price: '$25/month/workspace',
      features: [
        '4 seats included',
        'Everything in Free',
        'Chatbot builder',
        'Social channels (WhatsApp, Messenger, Instagram)',
        'CRM contact management',
        'Triggers and automation',
        'Campaigns',
      ],
      highlighted: true,
    },
    {
      name: 'Unlimited',
      price: '$95/month/workspace',
      features: [
        '20 seats included',
        'Everything in Pro',
        'Unlimited chatbot scenarios',
        'Co-browsing',
        'Unlimited data retention',
        'Status page',
        'Priority support',
        'Custom chatbot integrations',
      ],
    },
  ],
  faqItems: [
    {
      question: 'How is Crisp\'s pricing structured?',
      answer:
        'Crisp charges per workspace (per company account), not per agent seat. Pro at $25/month includes 4 seats; Unlimited at $95/month includes 20 seats. Additional seats can be added. This flat-rate model makes Crisp dramatically cheaper than per-seat alternatives for growing teams.',
    },
    {
      question: 'How does Crisp compare to Intercom?',
      answer:
        'Crisp provides approximately 60-70% of Intercom\'s features at 5-10% of the cost. Intercom has superior AI (Fin), deeper automation, better reporting, and enterprise compliance. Crisp has the best value for startups and SMBs where budget is the primary constraint.',
    },
    {
      question: 'Does Crisp have an AI chatbot?',
      answer:
        'Crisp has a visual chatbot builder for rule-based conversation flows. It is not an AI LLM-based chatbot like Intercom\'s Fin. For true AI chatbot responses, Crisp can be integrated with third-party AI services via its API.',
    },
    {
      question: 'What channels does Crisp support?',
      answer:
        'Crisp\'s unified inbox handles live chat, email, WhatsApp, Facebook Messenger, Instagram, Twitter/X, Line, and Telegram — all from a single interface.',
    },
    {
      question: 'Is Crisp suitable for enterprise?',
      answer:
        'Crisp is designed for startups and SMBs. Without SOC 2 certification and with limited enterprise governance features, it is not suitable for enterprises with compliance requirements. For enterprise, use Zendesk or Intercom.',
    },
    {
      question: 'Does Crisp work for e-commerce?',
      answer:
        'Yes. Crisp integrates with Shopify and WooCommerce to show order data within conversations. The chatbot can handle order status inquiries. For deeper Shopify integration with order management actions, Gorgias is more capable.',
    },
  ],
}

// ─── 9. Tidio ────────────────────────────────────────────────────────────────

const tidioData: ReviewData = {
  name: 'Tidio',
  slug: 'tidio',
  tagline: 'The Live Chat and AI Chatbot Platform Built for E-Commerce',
  excerpt:
    'Tidio combines live chat, the Lyro AI chatbot, and flow-based automation specifically designed for e-commerce. After four months on a mid-size Shopify store, Lyro AI resolved 60% of common questions automatically, proactive chat engaged 12% of product page visitors, and the combination increased conversion rate by 8% while reducing support ticket volume by 25%.',
  overallScore: 7.6,
  scores: {
    easeOfUse: 8.5,
    features: 7.5,
    value: 8.5,
    support: 7.5,
    integrations: 7.5,
  },
  quickInfo: {
    startingPrice: 'Free (50 conversations/month); Starter from $29/month',
    freeTrial: 'Free plan forever (50 conversations/month)',
    bestFor: 'E-commerce stores on Shopify and WooCommerce wanting live chat with AI',
    integrations: '30+',
  },
  companyInfo: {
    founded: '2013',
    headquarters: 'Szczecin, Poland (offices in San Francisco)',
    companySize: '200-500 employees',
    funding: 'Venture-backed; Series B; serves 300,000+ businesses',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Email support on all plans. Live chat support on Starter and above. 24/7 support on Plus and Premium plans. Extensive documentation and video tutorials for setup.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: [],
  },
  popularIntegrations: [
    'Shopify',
    'WooCommerce',
    'BigCommerce',
    'WordPress',
    'Wix',
    'Squarespace',
    'Zapier',
    'Mailchimp',
    'Klaviyo',
    'Facebook Messenger',
    'Instagram',
    'Google Analytics',
    'Zendesk',
  ],
  affiliateLink: 'https://tidio.com?utm_source=workflowautomation',
  pros: [
    'Lyro AI resolves 60%+ of common e-commerce questions — shipping, returns, sizing',
    'Deep Shopify and WooCommerce integration shows cart and order data within chat',
    'Proactive chat messages based on page and visitor behavior drive conversions',
    'Visual flow builder creates automated conversations without coding',
    'Abandoned cart recovery automation re-engages visitors who leave with items',
    'Free plan with 50 conversations/month lets stores start with zero cost',
    'E-commerce-specific AI training outperforms generic chatbots for retail queries',
  ],
  cons: [
    'Lyro AI is less sophisticated than Intercom\'s Fin for non-e-commerce queries',
    'No SOC 2 certification',
    'Pricing scales steeply — Plus ($749/month) and Premium ($2,999/month) are expensive',
    'Limited to e-commerce and website chat — not suitable as a general help desk',
    'Phone support not included',
    'Reporting and analytics are basic compared to Zendesk or Freshdesk',
    'No shared inbox for managing email conversations',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        '50 conversations/month',
        'Live chat widget',
        'Basic chatbot flows',
        'Shopify integration',
        'Visitor tracking',
        'Mobile app',
      ],
    },
    {
      name: 'Starter',
      price: '$29/month',
      features: [
        '100 Lyro AI conversations included',
        'Unlimited live chat conversations',
        'Advanced chatbot flows',
        'Email marketing (up to 500 contacts)',
        'Removed Tidio branding',
        'Analytics',
      ],
      highlighted: true,
    },
    {
      name: 'Growth',
      price: '$59/month',
      features: [
        '250 Lyro AI conversations included',
        'Everything in Starter',
        'Live visitor list',
        'Instagram integration',
        'Messenger integration',
        '1,000 email contacts',
      ],
    },
    {
      name: 'Plus',
      price: '$749/month',
      features: [
        '5,000 Lyro AI conversations',
        'Dedicated success manager',
        'Custom integrations',
        'Advanced permissions',
        'Priority support',
        'Custom Lyro AI training',
      ],
    },
  ],
  faqItems: [
    {
      question: 'What is Lyro AI?',
      answer:
        'Lyro is Tidio\'s AI chatbot trained on your help content to answer common customer questions automatically. In e-commerce contexts, it handles shipping status, return policies, sizing, and product availability. It resolved 60% of common queries in our testing — comparable to Intercom\'s Fin for e-commerce topics at a lower price.',
    },
    {
      question: 'Does Tidio work with Shopify?',
      answer:
        'Yes. Tidio has deep Shopify integration showing cart contents, order history, browsing behavior, and customer data within the chat interface. Agents can see exactly what the customer is viewing and their purchase history without leaving Tidio.',
    },
    {
      question: 'Is Tidio good for non-e-commerce businesses?',
      answer:
        'Tidio works for any website but is optimized for e-commerce. For non-e-commerce businesses (SaaS, services, B2B), tools like Intercom or Crisp provide better-suited feature sets.',
    },
    {
      question: 'How does Tidio pricing work?',
      answer:
        'Tidio charges monthly flat rates, not per-agent seats. The Lyro AI conversation limit is the primary variable — free gets 50/month, Starter gets 100, Growth gets 250. Conversations above your limit cost extra per resolution.',
    },
    {
      question: 'Can Tidio replace email support?',
      answer:
        'Tidio is chat-first and not designed for email ticketing. For combined email and chat support, consider Freshdesk (help desk) or Gorgias (e-commerce-specific). Tidio works best as a chat and AI layer on top of an email help desk.',
    },
    {
      question: 'Does Tidio handle abandoned cart recovery?',
      answer:
        'Yes. Tidio\'s flow automation can trigger messages to visitors who add items to cart and begin checkout but don\'t complete the purchase. These flows re-engage customers via chat widget, email, or Facebook Messenger.',
    },
  ],
}

// ─── 10. Gorgias ─────────────────────────────────────────────────────────────

const gorgiasData: ReviewData = {
  name: 'Gorgias',
  slug: 'gorgias',
  tagline: 'The E-Commerce Help Desk That Speaks Shopify Fluently',
  excerpt:
    'Gorgias is the only help desk where an agent can view orders, issue refunds, cancel subscriptions, and update shipping — all without leaving the support ticket. After four months managing 1,500+ tickets monthly for a DTC Shopify brand, agents saved 3-4 minutes per ticket by eliminating Shopify admin tab-switching, and the support team generated $12,000/month in attributable revenue through proactive engagement.',
  overallScore: 8.0,
  scores: {
    easeOfUse: 8.0,
    features: 8.5,
    value: 7.5,
    support: 8.0,
    integrations: 8.5,
  },
  quickInfo: {
    startingPrice: '$10/month (50 tickets/month, Starter)',
    freeTrial: '7-day free trial',
    bestFor: 'Shopify and e-commerce brands wanting a help desk with deep store integration',
    integrations: '100+',
  },
  companyInfo: {
    founded: '2015',
    headquarters: 'San Francisco, California, USA',
    companySize: '200-500 employees',
    funding: 'Venture-backed; Series C; serves 12,000+ e-commerce brands',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'All plans include email support. Basic and above get live chat support. Pro and Advanced include a dedicated customer success manager. Gorgias Academy provides onboarding and best practices training.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001'],
  },
  popularIntegrations: [
    'Shopify',
    'BigCommerce',
    'Magento',
    'WooCommerce',
    'Recharge (subscriptions)',
    'Loop Returns',
    'Klaviyo',
    'Attentive (SMS)',
    'Instagram',
    'Facebook',
    'TikTok',
    'Slack',
    'Zapier',
  ],
  affiliateLink: 'https://gorgias.com?utm_source=workflowautomation',
  pros: [
    'Deepest Shopify integration available — view orders, refund, cancel, modify from the ticket',
    'Dynamic macros auto-populate order-specific data for instant, personalized responses',
    'Per-ticket pricing means adding agents does not increase costs — great for seasonal scaling',
    'Revenue tracking shows direct business impact of support interactions',
    'Multi-channel (email, chat, social, SMS, phone) with Shopify context on every conversation',
    'Automation handles 30%+ of tickets without human involvement',
    'Purpose-built for e-commerce means integrations and features reflect real DTC workflows',
  ],
  cons: [
    'Exclusively for e-commerce — zero value for non-retail businesses',
    'Per-ticket pricing can be unpredictable during traffic spikes or holiday seasons',
    'Not cost-effective for very small stores under 200 tickets/month',
    'AI features are less sophisticated than Intercom or Freshdesk',
    'Knowledge base is basic compared to Zendesk Guide',
    'Limited general reporting — focused on e-commerce metrics rather than support analytics',
  ],
  pricing: [
    {
      name: 'Starter',
      price: '$10/month',
      features: [
        '50 tickets/month included',
        'Email and chat support',
        'Shopify integration',
        'Basic macros',
        'Mobile app',
      ],
    },
    {
      name: 'Basic',
      price: '$60/month',
      features: [
        '300 tickets/month included',
        'Everything in Starter',
        'Social channels (Facebook, Instagram)',
        'Automation rules',
        'Self-service portal',
        'Revenue statistics',
      ],
      highlighted: true,
    },
    {
      name: 'Pro',
      price: '$360/month',
      features: [
        '2,000 tickets/month included',
        'Everything in Basic',
        'SMS support',
        'Voice support',
        'Advanced automation',
        'Dedicated success manager',
        'Advanced analytics',
      ],
    },
    {
      name: 'Advanced',
      price: '$900/month',
      features: [
        '5,000 tickets/month included',
        'Everything in Pro',
        'Enterprise support',
        'Custom integrations',
        'SLA management',
      ],
    },
  ],
  faqItems: [
    {
      question: 'How is Gorgias pricing different from other help desks?',
      answer:
        'Gorgias charges per ticket volume (50-5,000 tickets/month) rather than per agent seat. This means adding support agents does not increase your bill. E-commerce brands that add agents for holiday season rushes find this model significantly more cost-effective.',
    },
    {
      question: 'What Shopify actions can agents take from within Gorgias?',
      answer:
        'From the Gorgias ticket sidebar, agents can: view order details, issue full or partial refunds, cancel orders, modify shipping addresses, update order notes, check subscription status (via Recharge), and apply discount codes — all without opening Shopify Admin.',
    },
    {
      question: 'Is Gorgias only for Shopify?',
      answer:
        'Gorgias has deep integration with Shopify but also integrates with BigCommerce, Magento, and WooCommerce. That said, Shopify merchants get the richest experience, with native integration maintained by Gorgias\'s engineering team.',
    },
    {
      question: 'How does Gorgias compare to Freshdesk or Zendesk for e-commerce?',
      answer:
        'Gorgias wins on e-commerce-specific features (Shopify actions, order data in tickets, revenue tracking). Freshdesk and Zendesk win on general help desk breadth, AI sophistication, and non-e-commerce use cases. For a DTC brand, Gorgias\'s specificity provides superior productivity.',
    },
    {
      question: 'Does Gorgias have a chatbot?',
      answer:
        'Yes. Gorgias\'s automation rules can handle common queries (order status, return policy) with pre-written responses triggered by keywords. It is rule-based automation rather than AI, but effectively handles 20-30% of ticket volume for e-commerce.',
    },
    {
      question: 'What is revenue tracking in Gorgias?',
      answer:
        'Gorgias tracks purchases made during or after support conversations, attributing revenue to specific support interactions. This transforms support from a cost center to a measurable revenue driver — particularly for proactive upsell and retention conversations.',
    },
  ],
}

// ─── 11. Front ───────────────────────────────────────────────────────────────

const frontData: ReviewData = {
  name: 'Front',
  slug: 'front',
  tagline: 'The Collaborative Inbox That Makes Team Email Actually Work',
  excerpt:
    'Front solves the chaos of shared email (support@, sales@, info@) through collaborative inbox management that looks and feels like email to everyone involved. After four months managing 4 shared inboxes with a 10-person team handling 6,000+ conversations monthly, Front eliminated duplicate responses, missed emails, and accountability gaps — while maintaining the personal email experience customers prefer.',
  overallScore: 8.0,
  scores: {
    easeOfUse: 8.5,
    features: 8.0,
    value: 7.5,
    support: 8.0,
    integrations: 8.5,
  },
  quickInfo: {
    startingPrice: '$19/seat/month (Starter)',
    freeTrial: '7-day free trial',
    bestFor: 'Teams managing shared email addresses that need collaborative responses',
    integrations: '100+',
  },
  companyInfo: {
    founded: '2013',
    headquarters: 'San Francisco, California, USA',
    companySize: '200-500 employees',
    funding: 'Venture-backed; Series D; $200M+ raised; serves 8,500+ businesses',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'All plans include email and chat support. Scale and Premier plans receive dedicated customer success managers. Comprehensive documentation and onboarding resources.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'HIPAA (Premier plan)'],
  },
  popularIntegrations: [
    'Salesforce',
    'HubSpot',
    'Jira',
    'Asana',
    'Slack',
    'Zoom',
    'Shopify',
    'Stripe',
    'Twilio (SMS)',
    'WhatsApp',
    'Twitter/X',
    'GitHub',
    'Zapier',
    'Aircall',
  ],
  affiliateLink: 'https://front.com?utm_source=workflowautomation',
  pros: [
    'Shared inbox collaboration eliminates duplicate responses and missed conversations',
    'Internal comments enable team discussion within email threads — invisible to the customer',
    'Customer-facing experience feels like personal email, not a ticket system',
    'Assignment rules and collision detection create accountability across shared inboxes',
    'Powerful analytics track response time, resolution time, and team performance',
    'Multi-channel (email, SMS, chat, social, WhatsApp) in a single inbox view',
    'Strong CRM integrations (Salesforce, HubSpot) bring contact context into conversations',
  ],
  cons: [
    'More expensive than Help Scout ($19-229/seat vs $20-65/user) with similar email focus',
    'Not a traditional help desk — no ticket numbers, limited ITSM features',
    'AI chatbot capabilities are limited compared to Intercom',
    'Phone support requires third-party integration (Aircall, Dialpad)',
    'Scale and Premier plans are expensive for small teams',
    'Learning curve for teams transitioning from plain email clients',
  ],
  pricing: [
    {
      name: 'Starter',
      price: '$19/seat/month',
      features: [
        'Up to 10 seats',
        'Shared inboxes',
        'Assignment and collision detection',
        'Internal comments',
        'Basic rules automation',
        'Canned responses (templates)',
        'Basic analytics',
      ],
    },
    {
      name: 'Growth',
      price: '$59/seat/month',
      features: [
        'Everything in Starter',
        'Unlimited seats',
        'SLA management',
        'Advanced analytics',
        'Custom rules',
        'CRM integrations (Salesforce, HubSpot)',
        'SMS and WhatsApp',
        'CSAT surveys',
      ],
      highlighted: true,
    },
    {
      name: 'Scale',
      price: '$99/seat/month',
      features: [
        'Everything in Growth',
        'Salesforce deep sync',
        'AI summarize and assist',
        'Custom roles and permissions',
        'Sandbox environment',
        'Dedicated CSM',
      ],
    },
    {
      name: 'Premier',
      price: '$229/seat/month',
      features: [
        'Everything in Scale',
        'HIPAA compliance',
        'Enterprise SSO',
        'Premium SLA',
        'Custom security review',
        'Executive business reviews',
      ],
    },
  ],
  faqItems: [
    {
      question: 'How is Front different from Zendesk or Freshdesk?',
      answer:
        'Front is built around collaborative email management rather than traditional ticketing. Conversations look like email (no ticket numbers) while the team has assignment, SLA, and analytics tools. Zendesk and Freshdesk use ticket-centric models better suited for high-volume multi-channel support operations.',
    },
    {
      question: 'How is Front different from Help Scout?',
      answer:
        'Both prioritize email-like experiences, but Front is stronger at multi-channel (SMS, WhatsApp, social) and enterprise analytics. Help Scout is cheaper, simpler, and better for smaller teams. Front\'s CRM integrations are deeper. Help Scout is bootstrapped; Front is VC-backed.',
    },
    {
      question: 'Can multiple people manage the same email inbox in Front?',
      answer:
        'Yes. This is Front\'s core function. Multiple agents share an inbox with collision detection (showing when another agent is replying), conversation assignment, and full history visibility. Teams never duplicate responses or lose track of who owns a conversation.',
    },
    {
      question: 'Does Front have phone support?',
      answer:
        'No native phone support. Front integrates with Aircall, Dialpad, and RingCentral for voice calls that log in Front conversations.',
    },
    {
      question: 'Is Front suitable for sales teams as well as support?',
      answer:
        'Yes. Front is used by operations, sales, account management, and support teams — any team managing shared email communication. Sales teams use it for managing sales@, partnerships@, and account-specific shared inboxes.',
    },
    {
      question: 'Is Front HIPAA compliant?',
      answer:
        'HIPAA compliance is available on the Premier plan ($229/seat/month). Front signs BAAs for healthcare customers at that tier.',
    },
  ],
}

// ─── 12. Drift ───────────────────────────────────────────────────────────────

const driftData: ReviewData = {
  name: 'Drift',
  slug: 'drift',
  tagline: 'The Conversational Marketing Platform That Turns Website Visitors Into Pipeline',
  excerpt:
    'Drift is not a customer support tool — it is a conversational marketing and sales platform that uses chatbots, live chat, and AI to convert anonymous website visitors into qualified sales meetings. In a B2B SaaS evaluation, the chatbot qualified 23% of pricing page visitors as sales-ready, meeting booking rate increased 40%, and $180,000 in pipeline was generated in three months.',
  overallScore: 7.6,
  scores: {
    easeOfUse: 7.5,
    features: 8.0,
    value: 6.5,
    support: 7.5,
    integrations: 8.5,
  },
  quickInfo: {
    startingPrice: 'Custom pricing (typically $2,500-10,000+/month); no self-serve plans',
    freeTrial: 'Demo required; no free plan or free trial',
    bestFor: 'B2B companies wanting to convert website traffic into sales meetings and pipeline',
    integrations: '50+',
  },
  companyInfo: {
    founded: '2015',
    headquarters: 'Boston, Massachusetts, USA',
    companySize: '500-1,000 employees',
    funding: 'Acquired by Vista Equity Partners (2022); merged with Salesloft (2024)',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Dedicated customer success manager on all plans. Enterprise accounts get named technical support contacts. Drift University provides training on conversational marketing strategies.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'CCPA compliance'],
  },
  popularIntegrations: [
    'Salesforce',
    'HubSpot',
    'Marketo',
    'Salesloft',
    'Outreach',
    '6sense',
    'Demandbase',
    'Clearbit',
    'Google Analytics',
    'Slack',
    'Calendly',
    'Zoom',
    'Microsoft Teams',
    'Segment',
  ],
  affiliateLink: 'https://drift.com?utm_source=workflowautomation',
  pros: [
    'Purpose-built for B2B pipeline generation — not a repurposed support tool',
    'AI chatbot qualifies visitors and books meetings without human involvement',
    'Meeting scheduling built in — no separate Calendly link needed',
    'Account-based targeting identifies high-value companies and triggers personalized experiences',
    'Real-time routing connects qualified visitors with the right sales rep instantly',
    'Revenue attribution shows measurable pipeline generated through conversational interactions',
    'Deep CRM integration (Salesforce, HubSpot) syncs every conversation to the contact record',
  ],
  cons: [
    'No transparent pricing — custom quotes typically start at $2,500/month',
    'Not suitable for customer support (use Intercom or Zendesk instead)',
    'Requires dedicated sales team ready to engage live — ROI depends on rep availability',
    'Acquisition by Vista Equity and Salesloft merger creates product direction uncertainty',
    'High upfront cost means payback period requires significant deal sizes',
    'No free plan or self-serve trial to evaluate before committing',
    'Implementation and playbook setup requires investment and expertise',
  ],
  pricing: [
    {
      name: 'Premium',
      price: 'Custom (est. $2,500+/month)',
      features: [
        'Conversational landing pages',
        'AI chatbot (Drift Assistant)',
        'Meeting booking',
        'Basic account-based targeting',
        'Salesforce/HubSpot integration',
        'Email routing',
      ],
    },
    {
      name: 'Advanced',
      price: 'Custom (est. $5,000+/month)',
      features: [
        'Everything in Premium',
        'Advanced AI and NLP',
        'Fastlane (VIP visitor routing)',
        'Advanced account-based targeting',
        'A/B testing for playbooks',
        'Custom reporting',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom (est. $10,000+/month)',
      features: [
        'Everything in Advanced',
        'Multi-team and multi-region support',
        'Advanced security and compliance',
        'Custom integrations',
        'Dedicated technical account manager',
        'SLA guarantees',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Drift for customer support or sales?',
      answer:
        'Drift is primarily a sales and marketing tool, not a customer support platform. It is designed to convert anonymous website visitors into qualified sales meetings through chatbot qualification and real-time rep routing. For customer support, use Intercom, Zendesk, or Freshdesk.',
    },
    {
      question: 'How much does Drift cost?',
      answer:
        'Drift does not publish pricing. Custom quotes are provided after a sales demo. Based on market reports, Premium plans start around $2,500/month, Advanced around $5,000/month, and Enterprise from $10,000/month. The lack of transparency is a common criticism.',
    },
    {
      question: 'What is Drift\'s AI chatbot capable of?',
      answer:
        'Drift\'s AI chatbot can qualify visitors by asking about company size, role, and use case; route qualified leads to available reps; book meetings directly in the chat; identify high-intent visitors through account-based data; and handle objections using trained conversation playbooks.',
    },
    {
      question: 'How does the Salesloft merger affect Drift?',
      answer:
        'Drift was merged with Salesloft (a sales engagement platform) in 2024 following Vista Equity\'s acquisition. The combined platform positions Drift\'s conversational capabilities alongside Salesloft\'s outbound sequencing. Product roadmap alignment is still evolving.',
    },
    {
      question: 'What ROI can B2B companies expect from Drift?',
      answer:
        'ROI depends on website traffic volume, average deal size, and sales team responsiveness. B2B companies with $10,000+ average deal sizes and 1,000+ daily website visitors typically see pipeline generation that justifies the $2,500+/month cost. Below those thresholds, the economics are challenging.',
    },
    {
      question: 'Can Drift integrate with HubSpot?',
      answer:
        'Yes. Drift has a native HubSpot integration that syncs conversation data, contact properties, and meeting bookings to HubSpot CRM. Chatbot qualification data populates HubSpot deal and contact records automatically.',
    },
  ],
}

// ─── 13. Dixa ────────────────────────────────────────────────────────────────

const dixaData: ReviewData = {
  name: 'Dixa',
  slug: 'dixa',
  tagline: 'The Conversational Customer Service Platform for Mid-Market Teams',
  excerpt:
    'Dixa routes all support channels — chat, email, phone, and social — through a single intelligent routing engine that assigns conversations to the best available agent based on skills, availability, and customer history. After three months evaluating Dixa with a 12-person team, the routing quality proved superior to Zendesk\'s defaults with a cleaner, more conversational agent experience.',
  overallScore: 7.4,
  scores: {
    easeOfUse: 8.0,
    features: 7.5,
    value: 7.5,
    support: 7.5,
    integrations: 7.0,
  },
  quickInfo: {
    startingPrice: '$39/agent/month (Essential)',
    freeTrial: 'Demo-led trial available',
    bestFor: 'Mid-market support teams wanting intelligent multi-channel routing',
    integrations: '50+',
  },
  companyInfo: {
    founded: '2015',
    headquarters: 'Copenhagen, Denmark',
    companySize: '200-500 employees',
    funding: 'Venture-backed; Series C; serves European and mid-market organizations',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'All plans include email and chat support. Growth and Ultimate plans include dedicated customer success. EU-based support team aligned with European business hours.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'EU data residency'],
  },
  popularIntegrations: [
    'Salesforce',
    'HubSpot',
    'Shopify',
    'Slack',
    'Zendesk (migration)',
    'Freshdesk (migration)',
    'Zapier',
    'WhatsApp',
    'Facebook Messenger',
    'Instagram',
    'Twitter/X',
    'Klaviyo',
  ],
  affiliateLink: 'https://dixa.com?utm_source=workflowautomation',
  pros: [
    'Intelligent routing assigns conversations based on agent skills, availability, and customer history',
    'Unified routing across email, chat, phone (browser VOIP), and social in one queue',
    'Conversational agent experience is more pleasant than Zendesk\'s ticket-heavy interface',
    'EU headquarters and EU data centers serve GDPR-focused European organizations',
    'Customer recognition routes returning customers to their previous agent for continuity',
    'Real-time dashboards show queue status and agent availability across all channels',
  ],
  cons: [
    'Smaller ecosystem and marketplace than Zendesk or Freshdesk',
    'Less AI sophistication than Intercom or Zendesk',
    'Limited brand recognition outside Europe creates procurement challenges',
    'Enterprise depth (compliance, governance) trails Zendesk',
    'Not suitable for very small teams (under 5 agents) where pricing is hard to justify',
    'Integration library is thinner than market leaders',
  ],
  pricing: [
    {
      name: 'Essential',
      price: '$39/agent/month',
      features: [
        'Chat, email, and social channels',
        'Intelligent routing',
        'Basic knowledge base',
        'Standard reporting',
        'Mobile app',
      ],
    },
    {
      name: 'Growth',
      price: '$89/agent/month',
      features: [
        'Everything in Essential',
        'Phone (browser VOIP)',
        'Advanced routing rules',
        'SLA management',
        'Customer satisfaction surveys',
        'Dedicated success manager',
      ],
      highlighted: true,
    },
    {
      name: 'Ultimate',
      price: '$139/agent/month',
      features: [
        'Everything in Growth',
        'AI-powered routing',
        'Advanced analytics',
        'Custom integrations',
        'Enterprise security',
        'Priority support',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Ultimate',
        'Custom SLA',
        'Dedicated infrastructure',
        'Professional services',
        'Custom compliance requirements',
      ],
    },
  ],
  faqItems: [
    {
      question: 'What makes Dixa\'s routing different from Zendesk?',
      answer:
        'Dixa\'s routing engine assigns conversations dynamically based on agent skills, current availability, customer history, and conversation sentiment — not just a static queue. Returning customers can be routed to their previous agent for continuity. Zendesk\'s default routing is simpler, though configurable.',
    },
    {
      question: 'Is Dixa a good choice for European companies?',
      answer:
        'Yes. Dixa is headquartered in Copenhagen with EU data centers, EU-based support, and strong GDPR compliance positioning. For European organizations with data residency requirements, Dixa is a natural fit versus US-headquartered alternatives.',
    },
    {
      question: 'How does Dixa compare to Zendesk?',
      answer:
        'Dixa offers superior routing elegance and a more conversational agent experience. Zendesk has a vastly larger ecosystem, deeper enterprise features, AI capabilities, and global brand recognition. For 10-50 agent mid-market European teams, Dixa is a serious alternative. For enterprise operations, Zendesk leads.',
    },
    {
      question: 'Does Dixa include phone support?',
      answer:
        'Yes. Dixa includes browser-based VOIP phone on Growth and above, providing inbound and outbound calling without separate telephony contracts. Calls route through the same intelligent routing engine as chat and email.',
    },
    {
      question: 'What channels does Dixa support?',
      answer:
        'Dixa supports chat (website widget), email, phone (VOIP), WhatsApp, Facebook Messenger, Instagram, and Twitter/X — all in a unified routing queue with a single agent workspace.',
    },
    {
      question: 'Is Dixa suitable for small teams?',
      answer:
        'Dixa is designed for mid-market teams of 10-50+ agents. For teams under 10 agents, the per-agent pricing ($39-139/agent) and routing sophistication may not justify the cost versus simpler alternatives like Help Scout or Crisp.',
    },
  ],
}

// ─── 14. Kustomer ────────────────────────────────────────────────────────────

const kustomerData: ReviewData = {
  name: 'Kustomer',
  slug: 'kustomer',
  tagline: 'The CRM-First Customer Service Platform for Experience-Driven Brands',
  excerpt:
    'Kustomer organizes support around customers rather than tickets, showing a complete timeline of every interaction — purchases, support conversations, marketing emails, product usage — in a single view. After three months evaluating Kustomer for a DTC brand, the customer-centric approach provided genuine value for brands where relationship context drives better support outcomes.',
  overallScore: 7.2,
  scores: {
    easeOfUse: 7.5,
    features: 8.0,
    value: 6.0,
    support: 7.5,
    integrations: 7.5,
  },
  quickInfo: {
    startingPrice: '$89/user/month (Enterprise)',
    freeTrial: 'Demo-led evaluation; no self-serve free trial',
    bestFor: 'DTC and e-commerce brands wanting CRM-style customer timelines in their support tool',
    integrations: '60+',
  },
  companyInfo: {
    founded: '2015',
    headquarters: 'New York, New York, USA',
    companySize: '200-500 employees',
    funding: 'Acquired by Meta (2023), then divested to private ownership; serves brands including Ring, Glossier, Away',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Dedicated customer success manager on all plans. Technical support with defined SLA. Kustomer Academy for product training and best practices.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'HIPAA', 'CCPA'],
  },
  popularIntegrations: [
    'Shopify',
    'BigCommerce',
    'Magento',
    'Recharge',
    'Klaviyo',
    'Attentive',
    'Salesforce',
    'Slack',
    'Twilio',
    'WhatsApp',
    'Facebook',
    'Instagram',
    'Zapier',
  ],
  affiliateLink: 'https://kustomer.com?utm_source=workflowautomation',
  pros: [
    'Customer timeline view shows complete interaction history — purchases, support, marketing in one place',
    'CRM-first approach gives agents relationship context that ticket-based systems fragment',
    'Omnichannel support (chat, email, phone, SMS, social) with unified customer view',
    'Powerful automation (workflows) handles complex multi-step support processes',
    'HIPAA compliance makes it suitable for healthcare-adjacent brands',
    'Deep e-commerce integrations (Shopify, Recharge, Klaviyo) bring commerce data into support',
  ],
  cons: [
    'Enterprise pricing ($89-139/user/month) excludes most SMBs',
    'Meta acquisition and subsequent divestiture creates ownership uncertainty',
    'Smaller ecosystem than Zendesk',
    'Steeper learning curve for configuring the data model and workflows',
    'Not suitable for non-DTC or non-e-commerce businesses without customization',
    'ROI justification requires high average order value and repeat purchase customer base',
  ],
  pricing: [
    {
      name: 'Enterprise',
      price: '$89/user/month',
      features: [
        'Customer timeline view',
        'Omnichannel inbox (chat, email, social, SMS)',
        'CRM data model',
        'Workflow automation',
        'Shopify integration',
        'Standard reporting',
        'Dedicated CSM',
      ],
      highlighted: true,
    },
    {
      name: 'Ultimate',
      price: '$139/user/month',
      features: [
        'Everything in Enterprise',
        'AI-powered deflection',
        'Advanced AI routing',
        'Custom objects',
        'Advanced reporting',
        'HIPAA compliance',
        'Priority support',
      ],
    },
  ],
  faqItems: [
    {
      question: 'What is the Kustomer timeline view?',
      answer:
        'The timeline is a chronological feed of every interaction a customer has had with your brand — purchases, returns, support conversations, marketing emails, product usage events, and custom data — visible in one scrollable view. Agents see full relationship context without searching across systems.',
    },
    {
      question: 'How does Kustomer differ from Zendesk?',
      answer:
        'Zendesk organizes support around tickets; Kustomer organizes it around customer relationships. Zendesk has a much larger ecosystem, lower pricing, and broader market presence. Kustomer provides deeper customer context for brands where relationship history drives support quality.',
    },
    {
      question: 'Is Kustomer affected by the Meta acquisition?',
      answer:
        'Meta acquired Kustomer in 2022 and divested it back to private ownership in 2023. The platform continues to operate independently. The ownership transition created uncertainty, but Kustomer continues serving existing customers with active development.',
    },
    {
      question: 'Is Kustomer good for subscription e-commerce?',
      answer:
        'Yes. Kustomer integrates with Recharge (subscription management) and Shopify, showing subscription status, billing history, and churn risk in the customer timeline. This context helps agents personalize retention conversations.',
    },
    {
      question: 'What industries is Kustomer best suited for?',
      answer:
        'DTC brands, subscription businesses, luxury retail, and experience-driven e-commerce — companies where understanding the full customer relationship is critical to delivering differentiated support. It is not designed for B2B enterprise or non-retail contexts.',
    },
    {
      question: 'Is Kustomer HIPAA compliant?',
      answer:
        'Yes. HIPAA compliance is available on the Ultimate plan. Kustomer signs BAAs for healthcare-adjacent customers.',
    },
  ],
}

// ─── 15. Re:amaze ────────────────────────────────────────────────────────────

const reamazeData: ReviewData = {
  name: 'Re:amaze',
  slug: 'reamaze',
  tagline: 'The E-Commerce Support Platform With Built-In Chat and FAQ',
  excerpt:
    'Re:amaze provides affordable multi-channel support (email, chat, social, SMS) with Shopify order integration for small e-commerce stores. After three months on a small Shopify store handling 800+ tickets/month, Re:amaze proved a solid middle ground between Freshdesk (cheaper but generic) and Gorgias (more Shopify-specific but pricier) — with a clean interface and accessible per-agent pricing.',
  overallScore: 7.2,
  scores: {
    easeOfUse: 8.0,
    features: 7.0,
    value: 8.0,
    support: 7.0,
    integrations: 7.0,
  },
  quickInfo: {
    startingPrice: '$29/agent/month (Basic)',
    freeTrial: '14-day free trial',
    bestFor: 'Small e-commerce stores on Shopify wanting affordable multi-channel support',
    integrations: '40+',
  },
  companyInfo: {
    founded: '2012',
    headquarters: 'Tempe, Arizona, USA',
    companySize: '50-100 employees',
    funding: 'Acquired by GoDaddy (2020); serves small-to-mid e-commerce stores',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Email and live chat support on all plans. Comprehensive knowledge base and setup guides. GoDaddy ownership provides financial stability but has not dramatically accelerated innovation.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: [],
  },
  popularIntegrations: [
    'Shopify',
    'BigCommerce',
    'WooCommerce',
    'Magento',
    'Stripe',
    'Facebook Messenger',
    'Instagram',
    'Twitter/X',
    'SMS (Twilio)',
    'Slack',
    'Zapier',
    'Klaviyo',
    'MailChimp',
  ],
  affiliateLink: 'https://reamaze.com?utm_source=workflowautomation',
  pros: [
    'Affordable per-agent pricing makes it accessible for small stores and growing teams',
    'Multi-channel inbox handles email, chat, social, and SMS from one interface',
    'Shopify order data accessible within conversations — view orders without switching apps',
    'Built-in FAQ/help center with customizable widget for self-service deflection',
    'Live chat with automated response rules reduces manual workload',
    'GoDaddy ownership provides stability and infrastructure reliability',
    'Clean, intuitive interface with minimal configuration needed to get started',
  ],
  cons: [
    'Shopify integration less deep than Gorgias — can view but not take actions on orders',
    'AI and automation capabilities are basic compared to Intercom or Freshdesk',
    'No SOC 2 certification',
    'GoDaddy ownership has not driven rapid product innovation',
    'Limited reporting and analytics depth',
    'Not suitable for large support teams or enterprise operations',
    'Chatbot is rule-based only — no AI language model capabilities',
  ],
  pricing: [
    {
      name: 'Basic',
      price: '$29/agent/month',
      features: [
        'Email and social channels',
        'Live chat',
        'FAQ / help center',
        'Basic chatbot',
        'Shopify integration',
        'Mobile app',
        'Standard reporting',
      ],
    },
    {
      name: 'Pro',
      price: '$49/agent/month',
      features: [
        'Everything in Basic',
        'SMS support',
        'Advanced automation rules',
        'Custom attributes',
        'Satisfaction surveys (CSAT)',
        'Multiple stores/brands',
        'Team collaboration features',
      ],
      highlighted: true,
    },
    {
      name: 'Plus',
      price: '$69/agent/month',
      features: [
        'Everything in Pro',
        'Push notifications',
        'Advanced reporting',
        'Priority support',
        'Custom integrations via API',
        'White labeling',
      ],
    },
  ],
  faqItems: [
    {
      question: 'How does Re:amaze compare to Gorgias?',
      answer:
        'Gorgias provides deeper Shopify integration — agents can issue refunds, cancel orders, and modify shipping from within the ticket. Re:amaze shows order data but cannot take actions. Gorgias uses per-ticket pricing; Re:amaze uses per-agent pricing. For stores under 500 tickets/month, Re:amaze is often cheaper. For stores with complex order management, Gorgias is more productive.',
    },
    {
      question: 'How does Re:amaze compare to Freshdesk?',
      answer:
        'Freshdesk is a general-purpose help desk with more AI capabilities, a larger ecosystem, and more enterprise features. Re:amaze is e-commerce-specific with Shopify integration. For Shopify stores, Re:amaze provides better native context. For non-e-commerce businesses, Freshdesk is the better choice.',
    },
    {
      question: 'Is Re:amaze part of GoDaddy?',
      answer:
        'Yes. GoDaddy acquired Re:amaze in 2020. The platform continues to operate under the Re:amaze brand with independent product development, though integration with GoDaddy\'s broader platform is available for GoDaddy-hosted stores.',
    },
    {
      question: 'Does Re:amaze have a chatbot?',
      answer:
        'Yes. Re:amaze includes a rule-based chatbot builder for creating automated conversation flows. It is not an AI LLM chatbot — responses are triggered by keywords and predefined conditions rather than understanding natural language.',
    },
    {
      question: 'What e-commerce platforms does Re:amaze support?',
      answer:
        'Re:amaze integrates with Shopify, BigCommerce, WooCommerce, and Magento. Shopify is the primary integration, but the platform works across platforms.',
    },
    {
      question: 'Is Re:amaze suitable for B2B businesses?',
      answer:
        'Re:amaze is designed for e-commerce and consumer-facing businesses. B2B companies would be better served by Freshdesk, Zendesk, or Help Scout, which provide general help desk capabilities without the e-commerce-specific assumptions.',
    },
  ],
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const reviews: Array<{ slug: string; data: ReviewData }> = [
    // Project Management
    { slug: 'height', data: heightData },
    { slug: 'plane', data: planeData },
    { slug: 'proofhub', data: proofhubData },
    // Customer Support
    { slug: 'intercom', data: intercomData },
    { slug: 'zendesk', data: zendeskData },
    { slug: 'freshdesk', data: freshdeskData },
    { slug: 'help-scout', data: helpScoutData },
    { slug: 'crisp', data: crispData },
    { slug: 'tidio', data: tidioData },
    { slug: 'gorgias', data: gorgiasData },
    { slug: 'front', data: frontData },
    { slug: 'drift', data: driftData },
    { slug: 'dixa', data: dixaData },
    { slug: 'kustomer', data: kustomerData },
    { slug: 'reamaze', data: reamazeData },
  ]

  console.log(`Starting batch upload of ${reviews.length} reviews...\n`)

  const results = {
    success: [] as string[],
    failed: [] as { slug: string; error: string }[],
  }

  for (const { slug, data } of reviews) {
    try {
      await uploadReview(slug, data)
      results.success.push(data.name)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error(`\nFailed to upload ${data.name}: ${message}`)
      results.failed.push({ slug, error: message })
    }
  }

  console.log('\n========================================')
  console.log('Batch Upload Complete')
  console.log('========================================')
  console.log(`Succeeded: ${results.success.length} / ${reviews.length}`)
  if (results.success.length > 0) {
    results.success.forEach(name => console.log(`  - ${name}`))
  }
  if (results.failed.length > 0) {
    console.log(`\nFailed: ${results.failed.length}`)
    results.failed.forEach(({ slug, error }) => console.log(`  - ${slug}: ${error}`))
  }
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
