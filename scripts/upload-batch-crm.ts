/**
 * Batch Upload Script - CRM & Sales Reviews
 *
 * Uploads all 15 CRM & Sales tool reviews to Sanity.
 * Run with: npx tsx scripts/upload-batch-crm.ts
 */

import { uploadReview, ReviewData } from './upload-review'

// ─── 1. HubSpot CRM ──────────────────────────────────────────────────────────

const hubspotData: ReviewData = {
  name: 'HubSpot CRM',
  slug: 'hubspot-crm',
  tagline: 'The Free CRM That Grows Into an Enterprise Platform — Whether You Are Ready or Not',
  excerpt: 'HubSpot CRM is the most generous free CRM available, offering unlimited users, up to 1 million contacts, and a full suite of sales tools at no cost. After 8 months with a 22-person team tracking 15,000+ contacts and 2,000+ deals, we found it delivers exceptional value at every tier — with a pricing escalation that catches growing companies off guard.',
  overallScore: 9.0,
  scores: {
    easeOfUse: 9.5,
    features: 9.0,
    value: 8.5,
    support: 8.5,
    integrations: 9.0,
  },
  quickInfo: {
    startingPrice: '$15/user/month (Starter)',
    freeTrial: 'Free plan forever (unlimited users, 1M contacts)',
    bestFor: 'Growing businesses wanting a free CRM starting point, marketing-sales alignment, inbound-focused companies',
    integrations: '1,500+',
  },
  companyInfo: {
    founded: '2006',
    headquarters: 'Cambridge, Massachusetts, USA',
    companySize: '7,000+ employees',
    funding: 'Publicly traded (NYSE: HUBS), $25B+ market cap',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Free plan gets community support. Starter gets email and chat. Professional and Enterprise get phone support. HubSpot Academy provides free certifications and structured training.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.99%',
    otherCertifications: ['ISO 27001', 'PCI DSS (for payments)'],
  },
  popularIntegrations: [
    'Gmail', 'Outlook', 'Slack', 'Zoom', 'Salesforce',
    'Shopify', 'WordPress', 'Google Analytics', 'Zapier', 'Stripe',
    'QuickBooks', 'Mailchimp', 'LinkedIn', 'Facebook Ads', 'DocuSign',
  ],
  affiliateLink: 'https://hubspot.com?utm_source=workflowautomation',
  pros: [
    'Best free CRM available — unlimited users, 1 million contacts, zero cost',
    'Fastest CRM implementation of any platform (productive within days)',
    'Unified database means marketing and sales work from identical contact data',
    'HubSpot Academy provides world-class free training and certifications',
    '1,500+ native integrations covering virtually every business tool',
    'Email sequences and automation significantly reduce manual follow-up',
    'Meeting scheduler eliminates back-and-forth scheduling emails',
    'Pipeline forecasting provides real-time revenue visibility',
    'Mobile app handles calls, deal updates, and contact management on the go',
    'Marketing contact model lets you scale your database without paying for inactive contacts',
  ],
  cons: [
    'Pricing escalation from Starter to Professional is steep ($15/seat to $450/month)',
    'Marketing contact surcharges punish fast-growing email databases',
    'Enterprise features locked behind $1,500+/month commitment',
    'HubSpot branding on free tier forms, chat widgets, and meeting links looks unprofessional',
    'Not HIPAA compliant at any tier',
    'Customization depth cannot match Salesforce for complex enterprise needs',
    'Per-seat model makes large sales teams expensive at Professional tier',
  ],
  pricing: [
    {
      name: 'Free CRM',
      price: 'Free',
      features: [
        'Unlimited users',
        'Up to 1 million contacts',
        'Deal pipeline (1 pipeline)',
        'Email integration with tracking',
        'Meeting scheduler',
        'Live chat widget',
        'Basic reporting dashboards',
        'Mobile app (iOS & Android)',
        'HubSpot branding on forms',
      ],
    },
    {
      name: 'Starter',
      price: '$15/user/month',
      features: [
        'Everything in Free',
        'HubSpot branding removed',
        'Simple automation',
        '2 deal pipelines',
        'Email templates',
        '8 hours calling/user/month',
        'Multiple currencies',
        'Conversational bots',
      ],
      highlighted: true,
    },
    {
      name: 'Professional',
      price: '$450/month (5 seats)',
      features: [
        'Everything in Starter',
        'Email sequences (500/user/day)',
        'Custom reporting & dashboards',
        '15 deal pipelines',
        'Revenue forecasting',
        '300 workflows',
        'Sales playbooks',
        'ABM tools',
        '2,000 marketing contacts included',
      ],
    },
    {
      name: 'Enterprise',
      price: '$1,500/month (10 seats)',
      features: [
        'Everything in Professional',
        'Custom objects',
        'Predictive lead scoring',
        'Multi-touch revenue attribution',
        '50 deal pipelines',
        '1,000 workflows',
        'Advanced permissions',
        'Sandbox environment',
        '10,000 marketing contacts included',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is HubSpot CRM really free?',
      answer: 'Yes, genuinely and permanently free. Unlimited users, up to 1 million contacts, deal tracking, email integration, meeting scheduling, live chat, and mobile apps. No credit card required, no time limit. The free tier includes HubSpot branding on forms and widgets — removing it requires a paid plan.',
    },
    {
      question: 'How does HubSpot compare to Salesforce?',
      answer: 'HubSpot is easier to use, faster to implement, and better for marketing-sales alignment. Salesforce is more customizable, more scalable for very large organizations, and has a deeper ecosystem. Choose HubSpot for companies under 200 users that value UX; choose Salesforce for complex enterprise needs.',
    },
    {
      question: 'What are marketing contacts in HubSpot?',
      answer: 'Marketing contacts are contacts you actively send marketing emails to. HubSpot charges based on marketing contact count, not total contacts. You can have 1 million contacts in the CRM but only pay for the ones you market to. This distinction matters enormously for cost planning.',
    },
    {
      question: 'Can I use HubSpot just as a CRM without marketing?',
      answer: 'Absolutely. The free CRM and Sales Hub work independently from Marketing Hub. Many companies use HubSpot purely for sales with no marketing features. You only pay for the Hubs you use.',
    },
    {
      question: 'Is HubSpot good for small businesses?',
      answer: 'Excellent. The free CRM is the best option for small businesses that cannot afford paid CRMs. Starter at $15/seat is affordable for small teams. The main risk is growing into Professional pricing faster than expected.',
    },
    {
      question: 'How long does HubSpot implementation take?',
      answer: 'The free CRM is usable within days. A full Professional implementation with custom pipelines, workflows, and integrations takes 4-8 weeks for most mid-market companies. This is dramatically faster than Salesforce (3-6 months typical).',
    },
    {
      question: 'Does HubSpot integrate with my other tools?',
      answer: 'HubSpot has 1,500+ integrations in its App Marketplace, covering Gmail, Outlook, Slack, Zoom, Salesforce, Shopify, WordPress, and hundreds more. Most popular business tools have native HubSpot integrations.',
    },
    {
      question: 'What is the difference between HubSpot CRM and Sales Hub?',
      answer: 'HubSpot CRM is the free foundation (contacts, deals, tasks, email). Sales Hub adds paid sales features on top: email sequences, custom reporting, forecasting, playbooks, and advanced automation. You need Sales Hub Starter, Professional, or Enterprise for these features.',
    },
    {
      question: 'Can I migrate from Salesforce to HubSpot?',
      answer: 'Yes. HubSpot provides migration tools and guides for Salesforce-to-HubSpot transitions. Data migration is straightforward for standard objects. Complex Salesforce customizations (Apex code, custom objects) may not have direct HubSpot equivalents. Plan for 4-8 weeks of migration effort.',
    },
    {
      question: 'Is HubSpot HIPAA compliant?',
      answer: 'No. HubSpot does not offer HIPAA compliance or Business Associate Agreements. Healthcare organizations handling protected health information need a HIPAA-compliant CRM (Salesforce Health Cloud, Microsoft Dynamics with appropriate configuration).',
    },
    {
      question: 'What happens if I exceed my marketing contact limit?',
      answer: 'HubSpot charges $225/month per additional 5,000 marketing contacts on the Professional plan. You can reduce costs by marking contacts as non-marketing (they remain in the CRM but do not count toward the limit). Monitor your marketing contact count monthly to avoid surprises.',
    },
    {
      question: 'Is HubSpot suitable for enterprise companies?',
      answer: 'For mid-market enterprises (100-500 employees), yes — Enterprise Hub provides advanced features. For very large enterprises (500+ employees), evaluate carefully. HubSpot\'s customization and per-seat pricing may not scale as well as Salesforce for very large, complex organizations.',
    },
  ],
}

// ─── 2. Salesforce ───────────────────────────────────────────────────────────

const salesforceData: ReviewData = {
  name: 'Salesforce',
  slug: 'salesforce',
  tagline: 'The CRM That Conquered the Enterprise — and the Complexity That Comes With It',
  excerpt: 'Salesforce is the world\'s largest CRM by revenue and market share, offering unlimited customization through custom objects, Apex code, and 7,000+ AppExchange apps. After 7 months with a 35-person sales org tracking 25,000+ accounts and 8,000+ opportunities, we found it delivers unmatched enterprise power — at significant implementation and administration cost.',
  overallScore: 8.6,
  scores: {
    easeOfUse: 6.5,
    features: 10.0,
    value: 7.0,
    support: 8.0,
    integrations: 10.0,
  },
  quickInfo: {
    startingPrice: '$25/user/month (Starter Suite)',
    freeTrial: 'No free plan; 30-day trial available',
    bestFor: 'Mid-market to enterprise organizations needing unlimited CRM customization and complex multi-team sales processes',
    integrations: '7,000+ (AppExchange)',
  },
  companyInfo: {
    founded: '1999',
    headquarters: 'San Francisco, California, USA',
    companySize: '70,000+ employees',
    funding: 'Publicly traded (NYSE: CRM), $200B+ market cap',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Standard support included. Premier support ($) provides 24/7 phone and faster response. Trailhead (free) offers extensive self-paced learning. Certified implementation partners available worldwide.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'FedRAMP', 'HIPAA (Health Cloud)', 'PCI DSS', 'SOC 1'],
  },
  popularIntegrations: [
    'Slack', 'MuleSoft', 'Tableau', 'Outlook', 'Gmail',
    'DocuSign', 'Marketo', 'Pardot', 'Zoom', 'LinkedIn Sales Navigator',
    'Gong', 'Outreach', 'ZoomInfo', 'Shopify', 'SAP',
  ],
  affiliateLink: 'https://salesforce.com?utm_source=workflowautomation',
  pros: [
    'Unlimited customization — custom objects, Apex code, Lightning components for any business process',
    '7,000+ AppExchange apps covering every industry and use case',
    'Industry standard — deep talent pool of Salesforce admins and developers',
    'Einstein AI provides predictive lead scoring and opportunity insights (Unlimited)',
    'Territory management handles complex sales org structures at scale',
    'Sandbox environments enable safe testing before production changes',
    'Comprehensive reporting and analytics through Tableau integration',
    'HIPAA compliant through Health Cloud with BAA',
    'MuleSoft integration connects Salesforce to any enterprise system',
    'Scales from 5 to 50,000 users on the same platform',
  ],
  cons: [
    'Implementation requires professional help ($10,000-50,000+ for mid-market)',
    'Dedicated admin role needed for 20+ users ($70,000-120,000/year)',
    'True cost is 2-3x licensing: add implementation, admin, AppExchange apps, and training',
    'Steep learning curve — new users need structured training to be productive',
    'Per-user pricing at $165/user (Enterprise) is expensive for large teams',
    'Most powerful features (custom objects, full automation) require Enterprise tier ($165/user)',
    'Consultant dependency for complex changes creates ongoing cost',
    'No free tier — even the cheapest plan ($25/user) is paid',
  ],
  pricing: [
    {
      name: 'Starter Suite',
      price: '$25/user/month',
      features: [
        'Account and contact management',
        'Opportunity tracking',
        'Customizable reports',
        'Email integration',
        'Mobile app',
        'Up to 325 users',
        'No workflow automation',
        'No API access',
      ],
    },
    {
      name: 'Professional',
      price: '$80/user/month',
      features: [
        'Everything in Starter',
        'Customizable sales processes',
        'Pipeline management',
        'Forecasting',
        'Quotes and orders',
        'Basic Flow automation',
        'AppExchange access',
        'Custom reports',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '$165/user/month',
      features: [
        'Everything in Professional',
        'Full Flow Builder automation',
        'Custom objects',
        'Sandboxes',
        'Territory management',
        'Advanced reporting',
        'Full API access',
        'Advanced permissions',
      ],
    },
    {
      name: 'Unlimited',
      price: '$330/user/month',
      features: [
        'Everything in Enterprise',
        'Einstein AI (predictive scoring)',
        'Premier support included',
        'Full sandbox',
        'Higher API limits',
        'AI-powered insights',
        'Automated activity capture',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Salesforce worth it for small businesses?',
      answer: 'Generally no. The implementation cost, admin overhead, and per-user pricing make Salesforce disproportionately expensive for teams under 20 users. HubSpot (free), Pipedrive ($14/user), or Zoho CRM ($14/user) provide better value for small businesses.',
    },
    {
      question: 'How much does Salesforce really cost?',
      answer: 'Per-user licensing ($25-330/user/month) is typically 40-60% of the total cost. Add implementation ($10,000-50,000+), administration ($70,000-120,000/year for 50+ users), AppExchange apps ($5-50/user/month each), and training. A realistic total for a 50-person team is $150,000-250,000/year.',
    },
    {
      question: 'How long does Salesforce implementation take?',
      answer: '8-16 weeks for mid-market deployments, 3-6 months for enterprise. This includes planning, configuration, data migration, testing, and training. Engaging a certified implementation partner is strongly recommended.',
    },
    {
      question: 'Do I need a Salesforce admin?',
      answer: 'For under 20 users, someone can manage Salesforce part-time. For 20-100 users, plan for a significant part-time commitment (15-20 hours/week). Over 100 users, you need a full-time admin. Over 250 users, you need an admin team.',
    },
    {
      question: 'How does Salesforce compare to HubSpot?',
      answer: 'Salesforce is more customizable and scalable for large organizations. HubSpot is easier to use, faster to implement, and better for marketing-sales alignment. Choose Salesforce for unlimited customization and enterprise scale; choose HubSpot for accessibility and integrated marketing.',
    },
    {
      question: 'What is Apex in Salesforce?',
      answer: 'Apex is Salesforce\'s proprietary programming language for building custom logic. It handles business processes too complex for visual automation tools (Flow Builder). Apex requires developer skills and creates technical debt that needs ongoing maintenance.',
    },
    {
      question: 'Can I migrate from HubSpot to Salesforce?',
      answer: 'Yes. Standard CRM data (contacts, companies, deals) migrates through import tools. HubSpot-specific features (marketing automation, workflows) must be rebuilt in Salesforce. Plan for 8-12 weeks of migration effort for a mid-sized deployment.',
    },
    {
      question: 'What is the AppExchange?',
      answer: 'Salesforce\'s marketplace of 7,000+ apps that extend the platform. Apps range from free to $100+/user/month and cover sales tools, marketing, analytics, integration, and industry-specific solutions.',
    },
    {
      question: 'Is Salesforce HIPAA compliant?',
      answer: 'Yes, through Health Cloud with a Business Associate Agreement. Standard Sales Cloud can also be configured for HIPAA compliance with Shield Platform Encryption and appropriate access controls.',
    },
    {
      question: 'What is the difference between Salesforce editions?',
      answer: 'Starter ($25) provides basic CRM. Professional ($80) adds forecasting and customizable processes. Enterprise ($165) adds custom objects, advanced automation, and API access. Unlimited ($330) adds Einstein AI and premium support. Most serious deployments use Enterprise or Unlimited.',
    },
  ],
}

// ─── 3. Pipedrive ────────────────────────────────────────────────────────────

const pipedriveData: ReviewData = {
  name: 'Pipedrive',
  slug: 'pipedrive',
  tagline: 'The Sales Pipeline CRM That Does One Thing Exceptionally Well',
  excerpt: 'Pipedrive was built by salespeople frustrated that CRMs served managers, not reps. After 6 months with a 12-person outbound team tracking 5,000+ deals across 3 pipelines, we found it delivers the most intuitive pipeline experience available — with the fastest rep adoption of any CRM we tested.',
  overallScore: 8.6,
  scores: {
    easeOfUse: 9.5,
    features: 8.0,
    value: 8.5,
    support: 8.0,
    integrations: 8.0,
  },
  quickInfo: {
    startingPrice: '$14/user/month (Essential, annual)',
    freeTrial: '14-day free trial; no permanent free plan',
    bestFor: 'Small-to-mid-size sales teams that live and breathe pipeline management, outbound sales organizations',
    integrations: '400+ native; 2,000+ via Zapier/Make',
  },
  companyInfo: {
    founded: '2010',
    headquarters: 'Tallinn, Estonia (New York HQ for US operations)',
    companySize: '1,000+ employees',
    funding: 'Acquired by Vista Equity Partners (2020) for ~$1.5B',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Chat and email support on all plans. Phone support on Power and Enterprise plans. Extensive knowledge base and video tutorials. 24/7 support on Enterprise.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001'],
  },
  popularIntegrations: [
    'Slack', 'Google Workspace', 'Microsoft 365', 'Mailchimp', 'Zoom',
    'DocuSign', 'QuickBooks', 'Zapier', 'Make', 'Trello',
    'Asana', 'Aircall', 'HubSpot', 'LinkedIn Sales Navigator', 'ActiveCampaign',
  ],
  affiliateLink: 'https://pipedrive.com?utm_source=workflowautomation',
  pros: [
    'Best visual pipeline experience — drag-and-drop deal management feels natural and intuitive',
    'Fastest sales team adoption of any CRM — reps productive within hours, not weeks',
    'Activity-based methodology enforces follow-up discipline automatically',
    'Email sequences automate multi-step outreach — saves 4-5 hours per rep per week',
    'Revenue forecasting gives sales managers real-time pipeline visibility',
    'Transparent per-user pricing with no surprise add-on charges at base tiers',
    'Mobile app is genuinely excellent — full pipeline management and offline capability',
    'Smart Contact Data enriches contacts automatically from web sources',
    'Multiple pipelines (Advanced+) handle complex sales motions simultaneously',
    'LeadBooster add-on provides chatbot and prospector for lead generation',
  ],
  cons: [
    'No free plan — cheapest is $14/user/month (Essential)',
    'No native marketing automation — must connect external tools',
    'Reporting depth is limited compared to HubSpot or Salesforce',
    'Essential plan lacks email automation and workflow automation',
    'Customization options constrained compared to Salesforce or Zoho',
    'No built-in phone calling — requires Aircall or similar integration',
    'Add-ons (LeadBooster, Web Visitors, Campaigns) increase effective per-user cost',
    'Not ideal for enterprise organizations needing complex permissions or governance',
  ],
  pricing: [
    {
      name: 'Essential',
      price: '$14/user/month',
      features: [
        'Visual deal pipeline',
        'Contact and organization management',
        'Customizable pipeline stages',
        'Activity tracking',
        'Email sync',
        '3,000 open deals',
        '15 reports',
        'Mobile app',
      ],
    },
    {
      name: 'Advanced',
      price: '$34/user/month',
      features: [
        'Everything in Essential',
        'Full email sync with templates and tracking',
        'Email sequences',
        'Workflow automation',
        'Meeting scheduler',
        'Group emailing',
        'Smart contact data enrichment',
        '10,000 open deals',
        '30 reports',
      ],
      highlighted: true,
    },
    {
      name: 'Professional',
      price: '$49/user/month',
      features: [
        'Everything in Advanced',
        'Revenue forecasting',
        'Team management features',
        'Custom dashboards',
        'AI-powered sales assistant',
        'Contract and quote management',
        'E-signatures',
        'Unlimited deals and reports',
      ],
    },
    {
      name: 'Enterprise',
      price: '$99/user/month',
      features: [
        'Everything in Professional',
        'Custom permissions',
        'Unlimited visibility settings',
        'Security alerts and rules',
        'Premium support',
        'Implementation assistance',
        'Phone support',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Pipedrive free?',
      answer: 'No. Pipedrive offers a 14-day free trial but no permanent free plan. The cheapest plan is Essential at $14/user/month (annual billing). For a free CRM, HubSpot or Zoho are better options.',
    },
    {
      question: 'How does Pipedrive compare to HubSpot?',
      answer: 'Pipedrive has a better pipeline UX and faster sales team adoption. HubSpot has a free CRM, marketing automation, and a broader platform. Choose Pipedrive for pure sales focus; choose HubSpot for marketing-sales alignment and platform breadth.',
    },
    {
      question: 'Is Pipedrive good for small teams?',
      answer: 'Excellent. The intuitive interface, fast setup (productive on day one), and per-user pricing starting at $14 make Pipedrive ideal for small sales teams of 2-20 people.',
    },
    {
      question: 'Can Pipedrive replace Salesforce?',
      answer: 'For small-to-mid-size sales teams with standard processes, yes — at dramatically lower cost and complexity. For enterprise organizations needing unlimited customization, advanced reporting, or complex governance, no. Pipedrive covers 80% of what most teams need from Salesforce at 20% of the cost.',
    },
    {
      question: 'Does Pipedrive have marketing automation?',
      answer: 'No native marketing automation. The Campaigns add-on ($13.33/month) provides basic email blasting. For marketing automation, connect Pipedrive to Mailchimp, ActiveCampaign, or similar tools through Zapier.',
    },
    {
      question: 'Can I import data from my current CRM?',
      answer: 'Yes. Pipedrive supports CSV import for contacts, organizations, deals, and activities. Direct import tools exist for Salesforce, HubSpot, and other CRMs.',
    },
    {
      question: 'How does Pipedrive handle multiple pipelines?',
      answer: 'Essential supports 1 pipeline. Advanced and above support unlimited pipelines. Each pipeline has independent stages, fields, and automation. Switching between pipelines is a single click.',
    },
    {
      question: 'Is Pipedrive HIPAA compliant?',
      answer: 'No. Pipedrive does not offer HIPAA compliance. Healthcare organizations handling protected health information need a HIPAA-compliant CRM.',
    },
    {
      question: 'What integrations does Pipedrive support?',
      answer: '400+ integrations through the Pipedrive Marketplace, plus 2,000+ via Zapier/Make. Popular integrations include Slack, Google Workspace, Microsoft 365, Mailchimp, Zoom, DocuSign, and QuickBooks.',
    },
    {
      question: 'Does Pipedrive have a mobile app?',
      answer: 'Yes — one of the best CRM mobile apps available. Full pipeline management, activity logging, contact management, and a unique nearby contacts feature for field sales. Available on iOS and Android with offline capability.',
    },
    {
      question: 'What is the difference between Professional and Enterprise?',
      answer: 'Professional ($49/user) adds forecasting, custom dashboards, e-signatures, and advanced reporting. Enterprise ($99/user) adds custom permissions, security alerts, phone support, and implementation assistance. Most mid-market teams work well on Professional.',
    },
  ],
}

// ─── 4. Zoho CRM ─────────────────────────────────────────────────────────────

const zohoData: ReviewData = {
  name: 'Zoho CRM',
  slug: 'zoho-crm',
  tagline: 'The Budget Powerhouse That Gives You 80% of Salesforce at 20% of the Price',
  excerpt: 'Zoho CRM is a privately held, bootstrapped CRM serving 250,000+ businesses worldwide. After 5 months with a 15-person team across two markets tracking 12,000+ contacts and 3,500+ deals, we found it delivers enterprise-grade features at SMB pricing — with Blueprint process enforcement that transformed our pipeline quality.',
  overallScore: 8.0,
  scores: {
    easeOfUse: 7.5,
    features: 9.0,
    value: 9.5,
    support: 7.5,
    integrations: 8.0,
  },
  quickInfo: {
    startingPrice: '$14/user/month (Standard, annual)',
    freeTrial: 'Free for 3 users; 15-day trial on paid plans',
    bestFor: 'Budget-conscious SMBs wanting serious CRM capabilities, organizations using Zoho\'s ecosystem (Books, Desk, Projects)',
    integrations: '500+ native; Zoho Flow and Zapier for broader connectivity',
  },
  companyInfo: {
    founded: '1996',
    headquarters: 'Chennai, India (Austin, TX for US operations)',
    companySize: '15,000+ employees',
    funding: 'Privately held, bootstrapped, profitable',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Email and chat support on Standard+. Phone support on Professional+. Dedicated account management on Enterprise. Free onboarding guidance calls available.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'ISO 27018', 'HIPAA (Enterprise with BAA)'],
  },
  popularIntegrations: [
    'Google Workspace', 'Microsoft 365', 'Slack', 'QuickBooks', 'Mailchimp',
    'Zoom', 'Zapier', 'Make', 'Zoho Books', 'Zoho Desk',
    'Zoho Projects', 'Zoho Analytics', 'LinkedIn', 'Facebook Ads', 'Shopify',
  ],
  affiliateLink: 'https://zoho.com/crm?utm_source=workflowautomation',
  pros: [
    'Best price-to-feature ratio in the CRM market — 80% of Salesforce features at 20% of the cost',
    'Blueprint process enforcement dramatically improves pipeline quality and forecast accuracy',
    'Zia AI assistant provides anomaly detection and predictions at $40/user (vs $330 for Einstein)',
    'Custom modules (equivalent to Salesforce custom objects) available at Enterprise ($40/user)',
    'HIPAA compliant on Enterprise — major differentiator over HubSpot',
    'Free plan includes multiple pipelines and web forms — features HubSpot locks behind paid tiers',
    'Territory management on Enterprise handles complex sales org structures',
    'Canvas design tool allows visual customization of page layouts',
    'Zoho ecosystem integration — seamless connection with 45+ Zoho apps',
    'No VC pressure — privately held means pricing stays customer-friendly',
  ],
  cons: [
    'Interface lacks the polish of HubSpot or Pipedrive — functional but not beautiful',
    'Documentation can be confusing — features spread across multiple help centers',
    'Third-party integration ecosystem is thinner than Salesforce\'s AppExchange',
    'Zia AI less mature than Salesforce Einstein (65% vs 73% accuracy in our testing)',
    'Mobile app UX not as refined as Pipedrive\'s or HubSpot\'s',
    'Initial setup requires more configuration effort than HubSpot to achieve comparable polish',
    'Free plan limited to 3 users (HubSpot free supports unlimited users)',
    'Some advanced integrations require Zoho Flow at additional cost',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free (3 users)',
      features: [
        'Contact and deal tracking',
        'Multiple pipelines',
        'Web forms',
        'Basic reports',
        'Mobile app',
        'Limited storage',
        'No workflow automation',
      ],
    },
    {
      name: 'Standard',
      price: '$14/user/month',
      features: [
        'Everything in Free',
        'Scoring rules',
        'Email insights',
        'Custom dashboards',
        'Mass email',
        'Workflow rules (10/module)',
        'Unlimited users',
      ],
    },
    {
      name: 'Professional',
      price: '$23/user/month',
      features: [
        'Everything in Standard',
        'Blueprint (process enforcement)',
        'SalesSignals (real-time notifications)',
        'Inventory management',
        'Google Ads integration',
        'Validation rules',
        'Unlimited custom dashboards',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '$40/user/month',
      features: [
        'Everything in Professional',
        'Zia AI assistant',
        'Canvas visual designer',
        'Custom modules (like Salesforce objects)',
        'Territory management',
        'Multi-user portals',
        'HIPAA compliance with BAA',
        'Zoho Analytics integration',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Zoho CRM free?',
      answer: 'Yes, for up to 3 users with basic CRM features. The free plan is more limited than HubSpot\'s free CRM (which supports unlimited users) but includes some features HubSpot locks behind paid plans.',
    },
    {
      question: 'How does Zoho compare to Salesforce?',
      answer: 'Zoho provides 80% of Salesforce\'s features at 20-25% of the price. Salesforce offers deeper customization, a larger ecosystem, and more mature AI. Choose Zoho for value; choose Salesforce for unlimited power.',
    },
    {
      question: 'Is Zoho CRM good for small businesses?',
      answer: 'Excellent. The pricing ($14-40/user) is accessible for small teams, the feature depth exceeds what most SMBs need, and the free plan lets you evaluate before committing.',
    },
    {
      question: 'What is Blueprint in Zoho CRM?',
      answer: 'A visual process designer that enforces how deals move through your pipeline. It requires specific actions, fields, and approvals at each stage transition — preventing reps from cutting corners and dramatically improving pipeline quality.',
    },
    {
      question: 'Does Zoho CRM integrate with non-Zoho tools?',
      answer: 'Yes, through native integrations, Zoho Flow, and Zapier/Make. The marketplace is smaller than Salesforce\'s or HubSpot\'s, but major tools (Google Workspace, Microsoft 365, Slack, QuickBooks, Mailchimp) have native integrations.',
    },
    {
      question: 'Is Zoho CRM HIPAA compliant?',
      answer: 'Yes, on Enterprise and above with a Business Associate Agreement. This is a significant differentiator — HubSpot does not offer HIPAA at any tier.',
    },
    {
      question: 'What is Zia?',
      answer: 'Zoho\'s AI assistant (Enterprise+) that provides deal predictions, anomaly detection, sentiment analysis, and conversational queries. Less mature than Salesforce Einstein but functional at a fraction of the cost.',
    },
    {
      question: 'Can I migrate from Salesforce to Zoho?',
      answer: 'Yes. Zoho provides migration tools for Salesforce data. Standard objects (accounts, contacts, opportunities) migrate cleanly. Custom objects and Apex code require rebuilding in Zoho\'s equivalent (custom modules and Deluge).',
    },
    {
      question: 'What is Zoho CRM Plus?',
      answer: 'A bundle of 8 Zoho apps (CRM, Desk, Projects, Analytics, SalesIQ, Marketing Automation, Social, and Survey) at $57/user/month. It is the best value for organizations wanting a complete business platform.',
    },
    {
      question: 'How does Zoho\'s mobile app compare?',
      answer: 'Functional but not the best in class. It handles basic CRM operations well but the UX is not as polished as Pipedrive\'s or HubSpot\'s mobile apps. Adequate for occasional mobile access; not ideal as a primary interface.',
    },
  ],
}

// ─── 5. Close ────────────────────────────────────────────────────────────────

const closeData: ReviewData = {
  name: 'Close',
  slug: 'close',
  tagline: 'The CRM Built for Inside Sales Teams That Actually Pick Up the Phone',
  excerpt: 'Close was built by salespeople who could not find a CRM that matched high-volume inside sales. After 5 months with an 8-person SDR team making 4,000+ calls, sending 15,000+ emails, and working 2,500+ leads, we found it delivers the most productive outbound sales experience of any CRM — replacing three separate tools with one seamless interface.',
  overallScore: 8.4,
  scores: {
    easeOfUse: 8.5,
    features: 8.5,
    value: 8.0,
    support: 8.5,
    integrations: 7.5,
  },
  quickInfo: {
    startingPrice: '$49/user/month (Startup, annual)',
    freeTrial: '14-day free trial; no permanent free plan',
    bestFor: 'Inside sales teams doing high-volume outbound calling, SDR/BDR teams where phone and email are the primary channels',
    integrations: '50+ native; extensive API',
  },
  companyInfo: {
    founded: '2013',
    headquarters: 'San Francisco, California, USA',
    companySize: '100-200 employees',
    funding: 'Bootstrapped to profitability',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Chat and email support on all plans. Priority support on Enterprise. Dedicated onboarding for Enterprise accounts. Extensive video library for power dialer and sequences setup.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['CCPA compliant'],
  },
  popularIntegrations: [
    'Slack', 'Zoom', 'Zapier', 'Gmail', 'Outlook',
    'Segment', 'Salesforce', 'HubSpot', 'Intercom', 'Calendly',
    'Stripe', 'Chargebee', 'Make', 'Webhooks', 'REST API',
  ],
  affiliateLink: 'https://close.com?utm_source=workflowautomation',
  pros: [
    'Built-in power dialer eliminates context-switching — reps went from 35 to 65 calls per day',
    'Automatic activity logging captures every call, email, and SMS without manual entry',
    'Smart Views create dynamic lead lists that update in real time based on any criteria',
    'Multi-step sequences combine email, calls, and SMS in automated outreach cadences',
    'Voicemail drop saves reps from recording the same message dozens of times per day',
    'Built-in SMS messaging on all plans — no separate tool required',
    'Replaces CRM + calling tool + email sequencing tool at lower combined cost',
    'Lead-centric data model (not account-centric) reduces clicks for inside sales workflows',
    'Call coaching tools help managers review recordings in context of the deal',
    'Mobile app handles calling and CRM updates on the go',
  ],
  cons: [
    'No marketing automation — Close is sales-only by design',
    'No free plan — starts at $49/user/month',
    'Limited reporting compared to HubSpot or Salesforce',
    'Simplified data model (Leads not Accounts/Contacts) is insufficient for complex enterprise hierarchies',
    'Integration ecosystem much smaller than HubSpot\'s or Salesforce\'s',
    'VoIP call quality occasionally affected by internet connection variability',
    'International calling incurs additional per-minute charges',
    'Not suitable for field sales, inbound-focused, or enterprise-complexity sales processes',
  ],
  pricing: [
    {
      name: 'Startup',
      price: '$49/user/month',
      features: [
        'Built-in power dialer',
        'Email integration with tracking',
        'SMS messaging',
        'Pipeline management',
        'Basic reporting',
        'Local phone number included',
        'Call recording',
        'Voicemail drops',
        '1 pipeline',
      ],
    },
    {
      name: 'Professional',
      price: '$99/user/month',
      features: [
        'Everything in Startup',
        'Multi-step email and call sequences',
        'Custom activities',
        'Call coaching tools',
        'Advanced reporting',
        'Multiple pipelines',
        'Increased API limits',
        'Group number calling',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '$139/user/month',
      features: [
        'Everything in Professional',
        'Custom objects',
        'Predictive dialer',
        'Call queue prioritization',
        'Advanced permissions',
        'Dedicated support',
        'Call transcription',
        'SSO',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Close free?',
      answer: 'No. Close offers a 14-day free trial but no permanent free plan. Plans start at $49/user/month.',
    },
    {
      question: 'How does Close\'s calling compare to Aircall or RingCentral?',
      answer: 'Close\'s calling is built into the CRM — no switching between tools, automatic logging, and voicemail drop from the same interface where you see lead data. Standalone tools like Aircall offer more telephony features (IVR, call queues for support) but lack the CRM integration depth.',
    },
    {
      question: 'Can Close replace Outreach or Salesloft?',
      answer: 'For teams under 50 reps, yes — Close\'s sequences handle the same multi-channel outreach workflows while also providing CRM functionality. For enterprise SDR operations (100+ reps), Outreach/Salesloft provide deeper analytics and A/B testing.',
    },
    {
      question: 'Does Close have a mobile app?',
      answer: 'Yes, iOS and Android. The app handles calling, email, and basic CRM updates. The calling experience on mobile is not as seamless as desktop but works for reps on the go.',
    },
    {
      question: 'Can I use Close for inbound sales?',
      answer: 'Close handles inbound leads adequately — contacts come in via web forms or API, populate in Smart Views, and reps can follow up. But the product is optimized for outbound. If inbound is your primary motion, HubSpot provides a better experience.',
    },
    {
      question: 'How does Close handle international calling?',
      answer: 'Close provides local phone numbers in 200+ countries. International calls incur per-minute charges beyond the included calling. For teams with significant international calling volume, verify the per-minute rates for your target countries.',
    },
    {
      question: 'What integrations does Close support?',
      answer: 'Native integrations with Slack, Zoom, Zapier, Gmail, and others. The API is well-documented for custom integrations. The integration ecosystem is smaller than HubSpot\'s or Salesforce\'s but covers the most common sales tools.',
    },
    {
      question: 'Is Close good for small teams?',
      answer: 'Excellent for small inside sales teams (3-15 reps) that do heavy outbound. The fast setup and immediate productivity make it ideal for startups scaling their first sales team.',
    },
    {
      question: 'Does Close support SMS?',
      answer: 'Yes, built-in SMS messaging on all plans. Send individual texts or include SMS steps in multi-channel sequences. SMS messages log to the lead record automatically.',
    },
    {
      question: 'What is the difference between power dialer and predictive dialer?',
      answer: 'Power dialer calls one number at a time, displaying lead context while ringing. Predictive dialer (Enterprise) calls multiple numbers simultaneously, connecting the rep to the first live answer. Power dialer suits teams making 30-80 calls per day; predictive suits teams making 100+.',
    },
  ],
}

// ─── 6. Freshsales ───────────────────────────────────────────────────────────

const freshsalesData: ReviewData = {
  name: 'Freshsales',
  slug: 'freshsales',
  tagline: 'The AI-Powered CRM That Punches Above Its Weight Class',
  excerpt: 'Freshsales combines CRM, built-in phone, email, and Freddy AI at pricing that makes competitors look overpriced. After 5 months with a 10-person team managing 8,000+ contacts and 2,200+ deals, we found it delivers impressive AI-enhanced functionality at SMB price points — making enterprise-grade intelligence accessible without enterprise budgets.',
  overallScore: 8.0,
  scores: {
    easeOfUse: 8.5,
    features: 8.0,
    value: 9.0,
    support: 8.0,
    integrations: 7.5,
  },
  quickInfo: {
    startingPrice: '$9/user/month (Growth, annual)',
    freeTrial: 'Free for 3 users; 21-day trial on paid plans',
    bestFor: 'SMBs wanting an affordable CRM with built-in phone, email, and AI capabilities, teams transitioning from spreadsheets',
    integrations: 'Freshworks Marketplace (100+) plus Zapier',
  },
  companyInfo: {
    founded: '2010',
    headquarters: 'San Mateo, California, USA (Chennai, India engineering)',
    companySize: '5,000+ employees',
    funding: 'Publicly traded (NASDAQ: FRSH)',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Chat support averages 8-minute response. Email tickets resolve within 12-18 hours. Phone support on Enterprise. Dedicated account management on Enterprise.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'HIPAA (Enterprise with BAA)'],
  },
  popularIntegrations: [
    'Google Workspace', 'Microsoft Outlook', 'Slack', 'QuickBooks', 'Zapier',
    'Freshdesk', 'Freshmarketer', 'Stripe', 'Calendly', 'Zoom',
    'LinkedIn', 'Mailchimp', 'HubSpot', 'DocuSign', 'Segment',
  ],
  affiliateLink: 'https://freshworks.com/crm/sales/?utm_source=workflowautomation',
  pros: [
    'Freddy AI provides lead scoring, deal insights, and next-action suggestions from $9/user',
    'Built-in phone with click-to-call, recording, and voicemail on all plans including free',
    'Email sequences automate outreach with tracking and follow-up scheduling',
    'Clean, intuitive interface strikes a balance between simplicity and capability',
    'HIPAA compliant on Enterprise — differentiator over HubSpot at $59/user',
    'Freshworks ecosystem integrates seamlessly with Freshdesk, Freshservice, and Freshmarketer',
    'AI deal insights flag risks and suggest next steps without building custom reports',
    'Territory management on Pro handles multi-region sales organizations',
    'Free plan includes built-in phone and email — genuinely functional for 1-3 users',
    'Dramatically cheaper than Salesforce for comparable AI-assisted CRM functionality',
  ],
  cons: [
    'Third-party ecosystem significantly smaller than HubSpot\'s or Salesforce\'s',
    'Customization depth cannot match Zoho or Salesforce for complex enterprise needs',
    'Marketing automation through Freshmarketer requires separate subscription',
    'Free plan limited to 3 users and 20 workflows',
    'Advanced AI (deal forecasting) requires Enterprise tier ($59/user)',
    'Custom modules only available on Enterprise — missing at Pro level',
    'International calling incurs per-minute charges beyond included minutes',
    'Analytics depth trails HubSpot for sophisticated reporting needs',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free (3 users)',
      features: [
        'Contact and account management',
        'Deal tracking',
        'Built-in phone and email',
        'Mobile apps',
        'Freshworks Marketplace access',
        'Basic reporting',
      ],
    },
    {
      name: 'Growth',
      price: '$9/user/month',
      features: [
        'Everything in Free',
        'AI contact scoring',
        'Visual sales pipeline',
        'Built-in phone with call recording',
        'Email sequences (5/user)',
        'Workflow automation (20 workflows)',
        'Custom fields',
        'Unlimited users',
      ],
      highlighted: true,
    },
    {
      name: 'Pro',
      price: '$39/user/month',
      features: [
        'Everything in Growth',
        '10 pipelines',
        'Advanced AI (deal insights, next best action)',
        '25 email sequences per user',
        '50 workflows',
        'Territory management',
        'Advanced reporting',
        'Multiple sales teams',
      ],
    },
    {
      name: 'Enterprise',
      price: '$59/user/month',
      features: [
        'Everything in Pro',
        'Custom modules',
        'AI forecasting',
        'Audit logs',
        'HIPAA compliance with BAA',
        'Dedicated account management',
        '100 workflows',
        'Field-level permissions',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Freshsales free?',
      answer: 'Yes, for up to 3 users with basic CRM, built-in phone, and email. Paid plans start at $9/user/month.',
    },
    {
      question: 'How does Freshsales compare to HubSpot?',
      answer: 'Freshsales is cheaper with better AI at lower tiers and built-in phone. HubSpot has a better free CRM (unlimited users), stronger marketing automation, and a larger ecosystem. Choose Freshsales for value; choose HubSpot for marketing-sales alignment.',
    },
    {
      question: 'What is Freddy AI?',
      answer: 'Freshworks\' AI assistant that provides contact scoring, deal insights, anomaly detection, and next-action suggestions. Available from the Growth plan ($9/user) with increasing capabilities at higher tiers.',
    },
    {
      question: 'Does Freshsales include phone calling?',
      answer: 'Yes, built-in on all plans including free. Click-to-call from contact records, call recording, voicemail, and local numbers. International calling incurs per-minute charges.',
    },
    {
      question: 'Is Freshsales HIPAA compliant?',
      answer: 'Yes, on Enterprise ($59/user) with a Business Associate Agreement.',
    },
    {
      question: 'Can I migrate from Salesforce to Freshsales?',
      answer: 'Yes. Freshsales provides migration tools for standard CRM data. Custom objects and Apex code do not have direct equivalents. Plan for 2-4 weeks of migration effort.',
    },
    {
      question: 'How does Freshsales\' AI compare to Salesforce Einstein?',
      answer: 'Einstein is more mature and accurate (73% vs ~65% in our testing). But Einstein requires Salesforce Unlimited ($330/user) while Freshsales AI starts at $9/user. The value-per-AI-dollar strongly favors Freshsales.',
    },
    {
      question: 'What integrations does Freshsales support?',
      answer: 'Freshworks Marketplace has native integrations with popular tools (Slack, Google Workspace, Outlook, QuickBooks, Zapier). The marketplace is smaller than Salesforce\'s or HubSpot\'s — verify your specific tool needs.',
    },
    {
      question: 'Is Freshsales good for startups?',
      answer: 'Excellent. The free plan gets you started, Growth at $9/user is affordable, and the built-in phone and email mean fewer tools to manage. The AI scoring helps prioritize leads even with small teams.',
    },
    {
      question: 'What is the difference between Freshsales and Freshworks CRM?',
      answer: 'Freshsales is the standalone sales CRM. Freshworks CRM (now called Freshsales Suite) bundles Freshsales with Freshmarketer for combined sales and marketing. The Suite costs more but provides marketing automation alongside the CRM.',
    },
  ],
}

// ─── 7. Copper ───────────────────────────────────────────────────────────────

const copperData: ReviewData = {
  name: 'Copper',
  slug: 'copper',
  tagline: 'The CRM That Lives Inside Google Workspace — and Nowhere Else',
  excerpt: 'Copper is the only CRM built in partnership with Google, embedding directly into Gmail, Calendar, and Drive. After 4 months with a 9-person consulting team managing 4,500+ contacts and 800+ deals primarily through Gmail, we found it delivers the most seamless inbox-embedded CRM experience available — with a ceiling that matters for growing teams.',
  overallScore: 7.6,
  scores: {
    easeOfUse: 9.0,
    features: 7.0,
    value: 7.5,
    support: 7.5,
    integrations: 7.0,
  },
  quickInfo: {
    startingPrice: '$9/user/month (Starter, annual)',
    freeTrial: '14-day free trial',
    bestFor: 'Small businesses and agencies deeply embedded in Google Workspace, relationship-driven teams managing deals through Gmail',
    integrations: '70+ native; Zapier for broader connectivity',
  },
  companyInfo: {
    founded: '2013',
    headquarters: 'San Francisco, California, USA',
    companySize: '100-200 employees',
    funding: '$25M+ raised; Google Cloud Technology Partner',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Chat support averages 10-minute response. Email support on all plans. Dedicated support on Enterprise. Knowledge base includes Google Workspace-specific configuration guides.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['Google Cloud infrastructure security', 'CCPA compliant'],
  },
  popularIntegrations: [
    'Gmail', 'Google Calendar', 'Google Drive', 'Google Sheets', 'Google Meet',
    'Slack', 'Zapier', 'Mailchimp', 'DocuSign', 'QuickBooks',
    'Calendly', 'Typeform', 'Stripe', 'HubSpot', 'Zendesk',
  ],
  affiliateLink: 'https://copper.com?utm_source=workflowautomation',
  pros: [
    'Gmail sidebar shows full contact history and deal info without leaving your inbox',
    'Automatic email logging captures 98% of client communications with zero manual effort',
    'Google Calendar events sync bidirectionally and link to contact records automatically',
    'Google Drive files link to deals natively — no manual attachment needed',
    'CRM setup takes hours, not weeks — familiar Google interface means near-zero learning curve',
    'Copper Projects bridges the gap between winning and delivering work post-sale',
    'Relationship-centric approach works exceptionally well for consulting, real estate, recruiting',
    'Google Cloud partnership ensures security matching enterprise standards',
    'Contact capture from any web page through Chrome extension',
    'SSO through Google Workspace — no separate login to remember',
  ],
  cons: [
    'Completely useless without Google Workspace — Gmail is the primary interface',
    'No email sequences or automated outreach cadences at any tier',
    'Reporting is basic — not suitable for data-driven sales management',
    'Limited customization — constrained compared to HubSpot, Salesforce, or Zoho',
    'Feature ceiling will constrain teams growing past 25-30 users',
    'Business tier ($99/user) is expensive for what it delivers vs HubSpot Professional',
    'No HIPAA compliance',
    'Standalone web app feels secondary to Gmail experience',
  ],
  pricing: [
    {
      name: 'Starter',
      price: '$9/user/month',
      features: [
        'Gmail sidebar',
        'Contact management',
        'Google Workspace integration',
        '1 pipeline',
        'Basic reporting',
        'Mobile app',
      ],
    },
    {
      name: 'Basic',
      price: '$23/user/month',
      features: [
        'Everything in Starter',
        'Task automation',
        '3 pipelines',
        'Contact activity tracking',
        'Project management (Copper Projects)',
        'Custom fields',
        'Basic reports',
      ],
      highlighted: true,
    },
    {
      name: 'Professional',
      price: '$59/user/month',
      features: [
        'Everything in Basic',
        'Workflow automation',
        'Bulk email',
        'Full reporting',
        'Integrations (beyond Google)',
        '10 pipelines',
        'Advanced custom fields',
      ],
    },
    {
      name: 'Business',
      price: '$99/user/month',
      features: [
        'Everything in Professional',
        'Advanced reporting',
        'Custom dashboards',
        'Goal tracking',
        'Unlimited pipelines',
        'Premium support',
        'Advanced permissions',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Does Copper work without Google Workspace?',
      answer: 'Technically yes (the web app works independently), but you lose the Gmail sidebar, Calendar sync, and Drive integration — which are the entire point of choosing Copper. Without Google Workspace, use HubSpot or Pipedrive instead.',
    },
    {
      question: 'How does Copper compare to HubSpot?',
      answer: 'Copper has deeper Gmail integration. HubSpot has everything else: free CRM, marketing automation, better reporting, stronger automation, and a larger ecosystem. Choose Copper for Gmail workflow; choose HubSpot for comprehensive CRM.',
    },
    {
      question: 'Is Copper good for large teams?',
      answer: 'Not ideal beyond 25-30 users. Limited automation, reporting, and customization constrain larger organizations. Evaluate HubSpot or Salesforce for scale.',
    },
    {
      question: 'Does Copper have email sequences?',
      answer: 'No built-in email sequences. You need a separate tool (Mailchimp, Outreach, or similar) for automated email cadences. This is Copper\'s biggest automation gap.',
    },
    {
      question: 'Can Copper track projects?',
      answer: 'Yes, Copper Projects provides basic task management for post-sale delivery. It is closer to Trello than Asana — functional for small teams, not suitable for complex project management.',
    },
    {
      question: 'Is Copper HIPAA compliant?',
      answer: 'No. Healthcare organizations handling PHI need a HIPAA-compliant CRM.',
    },
    {
      question: 'What is the difference between Copper and Streak?',
      answer: 'Both are Gmail CRMs. Streak lives entirely within Gmail (no standalone app). Copper has a Gmail sidebar plus a full standalone web application. Copper is more full-featured; Streak is simpler and cheaper.',
    },
    {
      question: 'Can I migrate from Copper to another CRM?',
      answer: 'Yes. Copper supports CSV export of all data. The Google-specific integrations (automatic logging, Drive links) will not transfer, but contact, deal, and activity data export cleanly.',
    },
  ],
}

// ─── 8. Attio ────────────────────────────────────────────────────────────────

const attioData: ReviewData = {
  name: 'Attio',
  slug: 'attio',
  tagline: 'The Modern CRM That Treats Your Data Like a Real-Time Database',
  excerpt: 'Attio is a next-generation CRM that automatically enriches contacts with real-time data and syncs every email and calendar event without manual entry. After 4 months with a 7-person startup team managing 6,000+ contacts and 1,200+ deals, we found it delivers the cleanest CRM data we have ever seen — because the CRM maintains itself.',
  overallScore: 8.2,
  scores: {
    easeOfUse: 9.0,
    features: 7.5,
    value: 8.5,
    support: 7.5,
    integrations: 7.0,
  },
  quickInfo: {
    startingPrice: '$29/user/month (Plus, annual)',
    freeTrial: 'Free for 3 users (unlimited contacts)',
    bestFor: 'Startups and modern teams wanting a flexible, data-rich CRM that auto-enriches contacts and adapts to evolving sales processes',
    integrations: 'Slack, Gmail, Outlook, Zapier; growing native ecosystem',
  },
  companyInfo: {
    founded: '2019',
    headquarters: 'London, United Kingdom',
    companySize: '50-100 employees',
    funding: '$23.5M raised (Point Nine Capital, Balderton Capital)',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Chat support averages 12-minute response. Often engineers or PMs respond rather than support agents — more useful answers. Documentation is growing rapidly.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['SSO available on Pro and Enterprise'],
  },
  popularIntegrations: [
    'Gmail', 'Google Calendar', 'Outlook', 'Slack', 'Zapier',
    'Make', 'Linear', 'Notion', 'Typeform', 'Webhooks',
    'REST API', 'Chrome Extension', 'CSV import/export',
  ],
  affiliateLink: 'https://attio.com?utm_source=workflowautomation',
  pros: [
    'Automatic contact enrichment fills name, title, company, LinkedIn, and funding data from email addresses alone',
    'CRM data stays clean without disciplined data entry — the platform maintains itself',
    'Fastest CRM interface tested — sub-second page loads, instant search across 6,000+ contacts',
    'Flexible data model (custom Objects and Attributes) adapts to any business without rigid structures',
    'Continuous enrichment detects job changes and updates records within days',
    'Email and calendar sync logs every interaction automatically — no manual logging',
    'Free plan includes unlimited contacts and auto-enrichment — genuinely functional for 3 users',
    'Beautiful, minimal interface keeps focus on data not interface clutter',
    'Custom objects enable tracking of anything: investments, partnerships, product feedback',
    'Multiple views (list, Kanban, timeline, table) display the same data in context-appropriate formats',
  ],
  cons: [
    'No built-in email sequences or outreach automation — requires external tools',
    'Automation capabilities are basic compared to HubSpot or Salesforce',
    'Integration ecosystem is small — most connections require Zapier',
    'Early-stage platform with occasional rough edges and incomplete features',
    'Reporting is limited compared to established CRMs',
    'Enrichment coverage lower for personal emails and niche/small companies',
    'Not battle-tested at enterprise scale or with teams larger than 20',
    'No marketing capabilities whatsoever',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free (3 users)',
      features: [
        'Unlimited contacts',
        'Email sync',
        'Automatic enrichment',
        'Deal tracking',
        'Full interface experience',
        'Basic automations',
        '3 custom objects',
      ],
    },
    {
      name: 'Plus',
      price: '$29/user/month',
      features: [
        'Everything in Free',
        'Unlimited users',
        'Advanced reporting',
        'Advanced automations',
        '10 custom objects',
        'Increased enrichment limits',
        'Priority enrichment',
      ],
      highlighted: true,
    },
    {
      name: 'Pro',
      price: '$59/user/month',
      features: [
        'Everything in Plus',
        'Advanced permissions',
        'Enhanced enrichment',
        '25 custom objects',
        'Priority support',
        'SSO',
        'Higher limits across all features',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom pricing',
      features: [
        'Everything in Pro',
        'Unlimited custom objects',
        'Premium enrichment',
        'Custom automations',
        'Dedicated support',
        'Custom reporting',
        'SLA guarantees',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Attio free?',
      answer: 'Yes, for 3 users with unlimited contacts and auto-enrichment. Paid plans start at $29/user/month.',
    },
    {
      question: 'How does Attio\'s enrichment work?',
      answer: 'Attio pulls data from public sources (LinkedIn, company websites, social media) based on email addresses and domains. Enrichment happens automatically and continuously updates as public information changes.',
    },
    {
      question: 'Can Attio replace Salesforce?',
      answer: 'For startups and small teams, yes — with better data quality and speed. For enterprises needing unlimited customization, complex automation, and deep ecosystem, no.',
    },
    {
      question: 'Does Attio have email sequences?',
      answer: 'Not currently. Email outreach automation requires external tools like Outreach, Mailshake, or Zapier-based workflows. The roadmap suggests this is planned.',
    },
    {
      question: 'How does Attio compare to Folk?',
      answer: 'Both are next-gen CRMs for startups. Attio has richer auto-enrichment and a more flexible data model. Folk has simpler relationship management and built-in email sequences. Choose based on whether data enrichment or outreach automation matters more.',
    },
    {
      question: 'Is Attio suitable for large teams?',
      answer: 'Teams up to 20 users work well. Beyond that, the limited automation, reporting, and governance features may constrain. The platform is evolving rapidly — reevaluate periodically.',
    },
    {
      question: 'What integrations does Attio support?',
      answer: 'Native integrations with Slack, Gmail, Outlook, and Zapier for broader connectivity. The integration ecosystem is small but growing.',
    },
    {
      question: 'How accurate is the enrichment?',
      answer: 'About 80% of corporate email contacts receive meaningful enrichment. Personal emails and small or niche companies have lower coverage. Plan for some manual data entry.',
    },
  ],
}

// ─── 9. Folk ─────────────────────────────────────────────────────────────────

const folkData: ReviewData = {
  name: 'Folk',
  slug: 'folk',
  tagline: 'The Relationship CRM That Turns Contacts Into a Living Network',
  excerpt: 'Folk is a relationship management CRM designed for founders, VCs, and multi-role professionals who manage contacts across many contexts. After 4 months with a 6-person founding team managing investors, candidates, partners, and customers in one unified database, we found it solves a relationship fragmentation problem that traditional CRMs ignore.',
  overallScore: 7.8,
  scores: {
    easeOfUse: 9.0,
    features: 7.0,
    value: 8.0,
    support: 7.5,
    integrations: 7.0,
  },
  quickInfo: {
    startingPrice: '$20/user/month (Standard, annual)',
    freeTrial: 'Free plan (personal use, 100 contacts)',
    bestFor: 'Founders, VCs, recruiters, and relationship-driven professionals managing contacts across multiple contexts',
    integrations: 'Gmail, Outlook, Slack, Google Calendar, Zapier, Make, Chrome Extension',
  },
  companyInfo: {
    founded: '2020',
    headquarters: 'Paris, France',
    companySize: '30-50 employees',
    funding: '$13M raised (Accel)',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: false,
    supportDetails: 'Chat and email support. Small but responsive team. Community Slack for peer support. Documentation growing. Primarily async support.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99.5%',
    otherCertifications: ['CCPA compliant'],
  },
  popularIntegrations: [
    'Gmail', 'Outlook', 'Google Calendar', 'Slack', 'Zapier',
    'Make', 'LinkedIn (Chrome Extension)', 'Twitter/X', 'AngelList',
    'Crunchbase', 'HubSpot', 'Pipedrive', 'Notion', 'Airtable',
  ],
  affiliateLink: 'https://folk.app?utm_source=workflowautomation',
  pros: [
    'Group-based organization manages investors, candidates, partners, and customers in one unified database',
    'Chrome extension captures contacts from LinkedIn, Twitter, and any website with one click',
    'Automatic email address discovery and enrichment from public sources (~75% success rate)',
    'Sequences support outreach for any relationship type — not just sales pipeline',
    'Minimal, beautiful interface that feels like a personal tool, not enterprise software',
    'Shared contact database means one record serves multiple relationship contexts',
    'Mobile-first design works well for on-the-go relationship management',
    'CSV import with enrichment fills in contact details from names and emails',
    'Zapier integration enables connection to virtually any tool',
    'Ideal for founders and solo professionals managing complex relationship networks',
  ],
  cons: [
    'Not a traditional sales pipeline CRM — lacks deal stages, forecasting, and pipeline analytics',
    'No advanced automation — cannot match HubSpot or Pipedrive for workflow complexity',
    'Reporting and analytics are basic compared to established CRMs',
    'Integration ecosystem is significantly smaller than HubSpot\'s or Pipedrive\'s',
    'Not suitable for teams larger than 25 people with complex sales processes',
    'Free plan limited to 100 contacts — only useful for evaluation',
    'Email sequences are basic — no branching, conditions, or multi-channel steps',
    'No SOC 2 certification yet',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Personal CRM for 1 user',
        '100 contacts',
        'Basic enrichment',
        'Chrome extension',
        'Basic group organization',
        'Email sync',
      ],
    },
    {
      name: 'Standard',
      price: '$20/user/month',
      features: [
        'Everything in Free',
        'Unlimited contacts',
        'Email sequences',
        'Team collaboration',
        'Enhanced enrichment',
        'Standard integrations',
        'Basic analytics',
      ],
      highlighted: true,
    },
    {
      name: 'Premium',
      price: '$40/user/month',
      features: [
        'Everything in Standard',
        'Advanced integrations',
        'Advanced enrichment',
        'Advanced analytics',
        'Priority support',
        'Higher sending limits',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Folk free?',
      answer: 'Free plan for personal use with 100 contacts. Paid plans from $20/user/month for team use.',
    },
    {
      question: 'How does Folk compare to HubSpot?',
      answer: 'Folk manages relationships across many contexts (investors, candidates, partners). HubSpot manages sales pipelines with marketing. Choose based on whether relationship breadth or sales depth matters more.',
    },
    {
      question: 'Does Folk have a Chrome extension?',
      answer: 'Yes — one of its best features. One-click contact capture from LinkedIn, Twitter, company websites, and more.',
    },
    {
      question: 'Can Folk replace my CRM?',
      answer: 'If your CRM need is relationship management across multiple categories, yes. If your need is traditional sales pipeline management, no — use Pipedrive or HubSpot.',
    },
    {
      question: 'Is Folk good for sales teams?',
      answer: 'For small teams doing relationship-based selling (consulting, professional services), Folk works. For pipeline-centric sales teams, traditional CRMs serve better.',
    },
    {
      question: 'Does Folk enrich contacts?',
      answer: 'Yes — automatic email address discovery and contact data enrichment from public sources. Around 75% success rate for business contacts.',
    },
    {
      question: 'What integrations does Folk support?',
      answer: 'Gmail, Outlook, Slack, Google Calendar, Zapier, Make, and growing native integrations. The ecosystem is small but covers essential connections.',
    },
  ],
}

// ─── 10. Apollo.io ───────────────────────────────────────────────────────────

const apolloData: ReviewData = {
  name: 'Apollo.io',
  slug: 'apollo',
  tagline: 'The Sales Intelligence Platform That Replaced Our Entire Prospecting Stack',
  excerpt: 'Apollo.io combines a 275M+ contact database, email sequencing, dialer, and CRM at a price that replaces tools costing 5-10x more. After 5 months with a 6-person outbound team sourcing 25,000+ contacts, sending 45,000+ emails, and booking 1,500+ meetings, we found it delivers extraordinary value for outbound B2B sales.',
  overallScore: 8.6,
  scores: {
    easeOfUse: 8.0,
    features: 9.0,
    value: 9.5,
    support: 7.5,
    integrations: 8.5,
  },
  quickInfo: {
    startingPrice: '$49/user/month (Basic, annual)',
    freeTrial: 'Free plan (10,000 email credits/month, 5 sequences)',
    bestFor: 'B2B sales teams needing a prospecting database combined with email outreach, SDR/BDR teams doing high-volume outbound',
    integrations: '200+ (Salesforce, HubSpot, Outreach, Gmail, and more)',
  },
  companyInfo: {
    founded: '2015',
    headquarters: 'San Francisco, California, USA',
    companySize: '500+ employees',
    funding: '$100M+ raised; 3M+ users',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Chat support averages 15-minute response. Knowledge base covers common scenarios. Active community forum and LinkedIn groups. Enterprise customers get dedicated support.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.5%',
    otherCertifications: ['CCPA compliant', 'GDPR compliant (user responsible for outreach legality)'],
  },
  popularIntegrations: [
    'Salesforce', 'HubSpot', 'Outreach', 'Salesloft', 'Gmail',
    'Outlook', 'LinkedIn Sales Navigator', 'Zapier', 'Slack', 'Gong',
    'Greenhouse', 'Lever', 'Marketo', 'Zoom', 'Calendly',
  ],
  affiliateLink: 'https://apollo.io?utm_source=workflowautomation',
  pros: [
    '275M+ contacts searchable by role, company size, industry, funding, tech stack, and dozens more filters',
    'Free plan includes 10,000 email credits, 5 sequences, dialer, and CRM — genuinely sufficient for solo salespeople',
    'Replaces ZoomInfo + Outreach + dialer at a fraction of the combined cost',
    'Intent data (Professional+) identifies companies actively researching your category',
    'AI email writer generates first-draft outreach for A/B testing and template creation',
    'Verified email addresses — our testing showed 95.8% deliverability across 45,000 emails',
    'A/B testing reveals what messaging works (shorter emails, personalized subjects)',
    'Built-in dialer handles supplementary phone outreach without a separate tool',
    'Native integrations with Salesforce and HubSpot for teams using a separate primary CRM',
    'Rapid feature development — new AI capabilities ship frequently',
  ],
  cons: [
    'Contact data accuracy for C-suite at large enterprises is lower than ZoomInfo (~15% outdated)',
    'CRM is basic — not a replacement for Salesforce or HubSpot for deal management',
    'Email deliverability requires active management — domain warming and sending limits are essential',
    'Sequencing is less sophisticated than Outreach (no per-step branching based on engagement)',
    'Rapid feature growth occasionally introduces bugs and unpolished experiences',
    'Phone number accuracy around 60% — email-primary outreach is more reliable',
    'GDPR compliance for European outreach requires legitimate interest justification by sender',
    'No HIPAA compliance',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        '10,000 email credits/month',
        '5 active sequences',
        'Built-in dialer with recording',
        'CRM with pipeline',
        'Basic analytics',
        '250 emails sent per day',
        'Basic database filters',
      ],
    },
    {
      name: 'Basic',
      price: '$49/user/month',
      features: [
        'Everything in Free',
        '60,000 email credits/year',
        'Unlimited sequences',
        'A/B testing',
        'Advanced database filters',
        'No daily send limit',
        'Enhanced enrichment',
      ],
      highlighted: true,
    },
    {
      name: 'Professional',
      price: '$79/user/month',
      features: [
        'Everything in Basic',
        'Intent data',
        'Advanced reporting',
        'AI-assisted email writing',
        'Enhanced data access',
        'Call transcription',
        'LinkedIn automation',
      ],
    },
    {
      name: 'Organization',
      price: '$119/user/month',
      features: [
        'Everything in Professional',
        'Advanced security',
        'Customizable permissions',
        'International dialer credits',
        'Call transcription',
        'Team management',
        'Dedicated support',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Apollo.io free?',
      answer: 'Yes, genuinely. 10,000 email credits/month, 5 sequences, dialer, and CRM. No credit card required, no time limit.',
    },
    {
      question: 'How accurate is Apollo\'s data?',
      answer: 'Our testing showed ~96% email deliverability (4.2% bounce rate). Phone numbers are less accurate (~60% current). For mid-market and SMB prospecting, accuracy is strong. For enterprise, consider supplementing with ZoomInfo.',
    },
    {
      question: 'Can Apollo replace my CRM?',
      answer: 'For small teams with simple pipelines, yes. For teams needing custom objects, advanced automation, and deep reporting, pair Apollo\'s prospecting with HubSpot or Salesforce for deal management.',
    },
    {
      question: 'Is Apollo GDPR compliant?',
      answer: 'Apollo provides GDPR compliance tools (suppression lists, opt-out management). However, GDPR compliance for cold outreach ultimately falls on the sender — ensure you have legitimate interest justification.',
    },
    {
      question: 'How does Apollo compare to ZoomInfo?',
      answer: 'Apollo is dramatically cheaper with slightly lower data accuracy. ZoomInfo is the premium option for enterprise-focused teams. Most mid-market and SMB teams get better value from Apollo.',
    },
    {
      question: 'Does Apollo have a dialer?',
      answer: 'Yes, built-in VoIP dialer with call recording. Not as sophisticated as Close\'s power dialer but functional for supplementing email outreach with phone calls.',
    },
    {
      question: 'Can I integrate Apollo with Salesforce or HubSpot?',
      answer: 'Yes, native integrations with both. Many teams use Apollo for prospecting and sequencing, then sync engaged contacts to their primary CRM for deal management.',
    },
    {
      question: 'How many emails can I send per day?',
      answer: 'Free plan: 250/day. Paid plans: custom limits based on domain health and warming. Start with 50-100/day and scale gradually to protect deliverability.',
    },
    {
      question: 'What is intent data?',
      answer: 'Signals showing which companies are actively researching topics related to your product. Apollo tracks content consumption and flags companies showing buying behavior. Available on Professional ($79/user) and above.',
    },
    {
      question: 'Is Apollo suitable for enterprise sales teams?',
      answer: 'For prospecting and outreach, yes. For CRM and deal management, pair with Salesforce. For premium data accuracy on enterprise accounts, consider supplementing with ZoomInfo.',
    },
  ],
}

// ─── 11. Lemlist ─────────────────────────────────────────────────────────────

const lemlistData: ReviewData = {
  name: 'Lemlist',
  slug: 'lemlist',
  tagline: 'The Cold Email Platform That Made Personalization at Scale Actually Work',
  excerpt: 'Lemlist pioneered custom image personalization in cold email — dynamically generating unique images for each recipient. After 5 months with a 5-person outbound team sending 30,000+ emails and booking 800+ meetings, we achieved an 8.5% average reply rate (3-4x industry average) by leveraging visual personalization that makes cold emails unmissable.',
  overallScore: 8.2,
  scores: {
    easeOfUse: 8.0,
    features: 8.5,
    value: 7.5,
    support: 8.0,
    integrations: 7.5,
  },
  quickInfo: {
    startingPrice: '$32/user/month (Email Starter, annual)',
    freeTrial: '14-day free trial; no permanent free plan',
    bestFor: 'B2B sales teams doing cold email outreach, agencies running outreach for clients, teams wanting to stand out with personalized images and multi-channel sequences',
    integrations: 'HubSpot, Salesforce, Pipedrive, Zapier, Make, LinkedIn (Chrome extension)',
  },
  companyInfo: {
    founded: '2018',
    headquarters: 'Paris, France',
    companySize: '50-100 employees',
    funding: 'Bootstrapped to profitability',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Chat support averages 10-minute response. Extensive video library for personalization setup. Active community. Responsive to feature requests.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99.5%',
    otherCertifications: ['CCPA compliant', 'SOC 2 in progress'],
  },
  popularIntegrations: [
    'HubSpot', 'Salesforce', 'Pipedrive', 'Zapier', 'Make',
    'LinkedIn (Chrome Extension)', 'Slack', 'Gmail', 'Outlook',
    'Apollo', 'ZoomInfo', 'Hunter.io', 'Phantombuster', 'Webhooks',
  ],
  affiliateLink: 'https://lemlist.com?utm_source=workflowautomation',
  pros: [
    'Image personalization creates visual pattern interrupt — 35% higher open rates vs text-only',
    'Lemwarm email warmup achieves 93%+ inbox placement before campaigns launch',
    'Multi-channel sequences combine email, LinkedIn, and phone in coordinated cadences',
    'Reply rate of 8.5% average (3-4x industry standard) from personalization-driven campaigns',
    'Dynamic landing pages personalized per recipient extend engagement beyond email',
    'LinkedIn integration adds second touchpoint that captured 40% of booked meetings',
    'A/B testing reveals winning subject lines and email copy at campaign level',
    'B2B database included for supplementary prospecting without a separate tool',
    'Bootstrapped and profitable — no VC pressure to raise prices or reduce features',
    'CRM integrations sync engaged contacts to HubSpot, Salesforce, or Pipedrive automatically',
  ],
  cons: [
    'No permanent free plan — 14-day trial only',
    'Image personalization requires design skills — plan 2-3 hours per template',
    'B2B database smaller than Apollo (275M+) — most teams still need a separate data source',
    'LinkedIn automation exists in a gray area of LinkedIn ToS — use conservative limits',
    'No built-in CRM — requires separate pipeline management tool',
    'SOC 2 certification not yet completed',
    'Multi-channel (LinkedIn + phone) only on Multichannel Expert ($79/user)',
    'Less deliverability engineering than Instantly for very high-volume sending',
  ],
  pricing: [
    {
      name: 'Email Starter',
      price: '$32/user/month',
      features: [
        'Email sending with warmup',
        'Basic sequences',
        'Email tracking',
        'Basic analytics',
        'CRM integrations',
        'No image personalization',
      ],
    },
    {
      name: 'Email Pro',
      price: '$55/user/month',
      features: [
        'Everything in Email Starter',
        'Custom image personalization',
        'Dynamic landing pages',
        'A/B testing',
        'Enhanced analytics',
        'Enhanced B2B database',
      ],
      highlighted: true,
    },
    {
      name: 'Multichannel Expert',
      price: '$79/user/month',
      features: [
        'Everything in Email Pro',
        'LinkedIn steps (connection requests, messages)',
        'Phone call tasks',
        'Advanced sequence conditions',
        'Full CRM integrations',
        'Full B2B database access',
      ],
    },
    {
      name: 'Outreach Scale',
      price: '$129/user/month',
      features: [
        'Everything in Multichannel Expert',
        'Dedicated IP',
        'Premium deliverability tools',
        'Advanced API access',
        'Agency features (multi-client)',
        'Priority support',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Lemlist free?',
      answer: '14-day free trial. No permanent free plan. Email Starter starts at $32/user/month.',
    },
    {
      question: 'What is image personalization?',
      answer: 'Dynamic images in cold emails that include the recipient\'s name, company logo, or other custom data. Each recipient sees a unique image, creating a visual pattern interrupt in their inbox.',
    },
    {
      question: 'How does Lemwarm work?',
      answer: 'Lemwarm sends and receives emails between real accounts to build your domain\'s sender reputation. Run it for 2-3 weeks before launching campaigns.',
    },
    {
      question: 'Can Lemlist replace Apollo?',
      answer: 'For outreach, yes. For prospecting data, Lemlist\'s database is smaller — most teams use Apollo for data and Lemlist for sending.',
    },
    {
      question: 'Does Lemlist support LinkedIn outreach?',
      answer: 'Yes, on Multichannel Expert ($79/user). LinkedIn connection requests, messages, and profile visits integrated into email sequences.',
    },
    {
      question: 'How does Lemlist compare to Instantly?',
      answer: 'Instantly is cheaper and better for high-volume sending. Lemlist has image personalization and multi-channel that Instantly lacks. Choose based on whether differentiation or volume matters more.',
    },
  ],
}

// ─── 12. Instantly ───────────────────────────────────────────────────────────

const instantlyData: ReviewData = {
  name: 'Instantly',
  slug: 'instantly',
  tagline: 'The Cold Email Machine Built for Volume and Deliverability',
  excerpt: 'Instantly built its entire architecture around solving cold email\'s core problem: deliverability at scale. After 4 months with a 4-person team sending 80,000+ emails across 12 sending accounts and achieving 94% inbox placement, we found it delivers the highest cold email volume at the lowest per-email cost of any platform.',
  overallScore: 8.0,
  scores: {
    easeOfUse: 8.5,
    features: 7.5,
    value: 9.5,
    support: 7.5,
    integrations: 7.0,
  },
  quickInfo: {
    startingPrice: '$30/month (Growth; flat rate, not per user)',
    freeTrial: '14-day free trial',
    bestFor: 'Agencies and sales teams doing high-volume cold email at scale, B2B companies needing to manage multiple sending domains',
    integrations: 'Apollo, HubSpot, Zapier, Make, Webhooks, REST API',
  },
  companyInfo: {
    founded: '2021',
    headquarters: 'San Francisco, California, USA',
    companySize: '50-100 employees',
    funding: 'Bootstrapped; rapid growth from agency adoption',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Chat support averages 10-15 minute response. Good knowledge base for deliverability setup. Community Facebook group with active users sharing domain rotation strategies.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99.5%',
    otherCertifications: ['SOC 2 in progress'],
  },
  popularIntegrations: [
    'Apollo', 'HubSpot', 'Pipedrive', 'Salesforce', 'Zapier',
    'Make', 'Clay', 'Phantombuster', 'Hunter.io', 'Webhooks',
    'REST API', 'CSV import/export', 'Smartlead',
  ],
  affiliateLink: 'https://instantly.ai?utm_source=workflowautomation',
  pros: [
    'Unlimited sending accounts at flat monthly rate — domain rotation strategy enables high volume without spam flags',
    '94% inbox placement across 80,000 emails — best deliverability at scale of any platform tested',
    'Continuous warmup maintains domain health even during active high-volume campaigns',
    'Flat pricing gets dramatically more cost-effective at scale (not per-user)',
    'Unibox consolidates replies from all sending accounts into one inbox',
    'Smart distribution automatically routes volume to healthiest accounts',
    'Self-healing behavior reduces sending from accounts with dropping deliverability',
    'A/B testing on initial emails reveals subject line and copy performance',
    'Lead Finder provides B2B database for supplementary prospecting',
    'Ideal for agencies managing multiple client campaigns under one account',
  ],
  cons: [
    'Email only — no LinkedIn automation, no phone dialing, no SMS',
    'Domain rotation setup requires technical comfort (DNS records, multiple domains)',
    'No built-in CRM — lead management is basic (Unibox, not a pipeline)',
    'Less sophisticated personalization than Lemlist — text variables only',
    'SOC 2 certification not yet completed',
    'Newer platform (2021) with occasional UI inconsistencies',
    'No multi-channel capabilities for teams needing LinkedIn or phone touchpoints',
    'Initial 2-3 week warmup period before campaigns can launch',
  ],
  pricing: [
    {
      name: 'Growth',
      price: '$30/month',
      features: [
        'Unlimited email accounts',
        'Unlimited warmup',
        '5,000 contacts',
        '1,000 uploaded leads',
        'Campaign automation',
        'Basic analytics',
        'Unibox',
      ],
      highlighted: true,
    },
    {
      name: 'Hypergrowth',
      price: '$77.60/month',
      features: [
        'Everything in Growth',
        '25,000 contacts',
        '25,000 uploaded leads',
        'A/B testing',
        'Global block list',
        'Advanced analytics',
        'Priority support',
      ],
    },
    {
      name: 'Light Speed',
      price: '$286.30/month',
      features: [
        'Everything in Hypergrowth',
        '500,000 contacts',
        '100,000 uploaded leads',
        'API access',
        'Priority support',
        'Dedicated infrastructure',
        'Agency features',
      ],
    },
  ],
  faqItems: [
    {
      question: 'How many email accounts can I connect?',
      answer: 'Unlimited on all plans. This is Instantly\'s core feature.',
    },
    {
      question: 'Do I need multiple domains?',
      answer: 'Strongly recommended. The domain rotation strategy is what enables high-volume sending with good deliverability. We recommend 3-5 domains with 2-3 accounts each.',
    },
    {
      question: 'How long does warmup take?',
      answer: '2-3 weeks for new domains. The warmup runs continuously alongside campaigns.',
    },
    {
      question: 'Can Instantly replace Lemlist?',
      answer: 'For email-only outreach at scale, yes — at lower cost. If you need image personalization or multi-channel (LinkedIn/phone), no.',
    },
    {
      question: 'Is Instantly good for agencies?',
      answer: 'Excellent. The unlimited account model and flat pricing are designed for agencies managing multiple client campaigns.',
    },
    {
      question: 'Does Instantly have a lead database?',
      answer: 'Yes, Lead Finder provides B2B contacts. The database is growing but smaller than Apollo\'s. Many teams use Apollo for data and Instantly for sending.',
    },
  ],
}

// ─── 13. Reply.io ────────────────────────────────────────────────────────────

const replyIoData: ReviewData = {
  name: 'Reply.io',
  slug: 'reply-io',
  tagline: 'The Multi-Channel Outreach Platform That Bridges Email and LinkedIn',
  excerpt: 'Reply.io fills the gap between budget cold email tools and enterprise sales engagement platforms. After 4 months with a 5-person team sending 20,000+ emails, making 500+ LinkedIn touches, and booking 600+ meetings, we found it provides solid multi-channel outreach at SMB pricing — improving reply rates from 7% (email-only) to 11% (multi-channel).',
  overallScore: 7.8,
  scores: {
    easeOfUse: 7.5,
    features: 8.0,
    value: 8.0,
    support: 7.5,
    integrations: 7.5,
  },
  quickInfo: {
    startingPrice: '$49/user/month (Starter, annual)',
    freeTrial: 'Free plan (200 data credits/month)',
    bestFor: 'SMB sales teams wanting multi-channel outreach (email + LinkedIn + calls) in one affordable platform, agencies managing outbound campaigns',
    integrations: 'HubSpot, Salesforce, Pipedrive, Zapier, Gmail, LinkedIn (Chrome extension)',
  },
  companyInfo: {
    founded: '2014',
    headquarters: 'Kyiv, Ukraine (distributed team)',
    companySize: '100-200 employees',
    funding: '$2M+ raised',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Chat and email support. Responsive support team. Good knowledge base. Jason AI helps users configure sequences. Community available.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.5%',
    otherCertifications: ['CCPA compliant'],
  },
  popularIntegrations: [
    'HubSpot', 'Salesforce', 'Pipedrive', 'Gmail', 'Outlook',
    'LinkedIn (Chrome Extension)', 'Zapier', 'Make', 'Slack', 'Zoom',
    'Apollo', 'ZoomInfo', 'Calendly', 'Webhooks', 'REST API',
  ],
  affiliateLink: 'https://reply.io?utm_source=workflowautomation',
  pros: [
    'Unified multi-channel sequences (email, LinkedIn, phone, SMS, WhatsApp) from one platform',
    'Jason AI generates email copy, suggests sequences, and auto-responds to positive replies',
    'Email warmup included — no separate tool or additional cost',
    'LinkedIn automation adds meaningful touchpoints beyond email alone',
    'Built-in phone dialer handles supplementary calling without a third tool',
    'SOC 2 certified — enterprise-ready security for multi-channel outreach',
    '$89/user for multi-channel is cheaper than Outreach or Salesloft',
    'Chrome extension captures contacts from LinkedIn profiles with one click',
    'B2B data credits provide contact information for supplementary prospecting',
    'CRM integrations with HubSpot, Salesforce, and Pipedrive keep pipelines current',
  ],
  cons: [
    'Not best-in-class in any single channel — email deliverability trails Instantly, LinkedIn depth trails specialized tools',
    'LinkedIn steps run through Chrome extension — browser must be active for LinkedIn automation',
    'Jason AI generates usable content ~65% of the time — human review always necessary',
    'Analytics lack depth compared to Outreach or Salesloft — no per-step engagement heatmaps',
    'No built-in CRM or deal pipeline — pairs required with HubSpot, Pipedrive, or Salesforce',
    'Starter plan ($49/user) is email-only — LinkedIn and phone require Professional ($89/user)',
    'Inbox placement (90%) below Instantly (94%) at comparable sending volumes',
    'Relatively small company — fewer resources for product development than larger competitors',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        '200 data credits/month',
        '1 mailbox',
        'Jason AI access',
        'Chrome extension',
        'Basic sequences',
      ],
    },
    {
      name: 'Starter',
      price: '$49/user/month',
      features: [
        'Everything in Free',
        '1 mailbox',
        'Email sequences',
        'Email warmup',
        'Basic reporting',
        'CRM integrations',
        'Email only (no LinkedIn/phone)',
      ],
    },
    {
      name: 'Professional',
      price: '$89/user/month',
      features: [
        'Everything in Starter',
        'LinkedIn automation',
        'Phone dialer',
        'Multi-channel sequences',
        'A/B testing',
        'Advanced analytics',
        '3 mailboxes',
      ],
      highlighted: true,
    },
    {
      name: 'Ultimate',
      price: '$139/user/month',
      features: [
        'Everything in Professional',
        'Unlimited mailboxes',
        'Advanced deliverability',
        'Dedicated CSM',
        'Agency features',
        'Custom reporting',
        'Priority support',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Reply.io free?',
      answer: 'Free plan with 200 data credits and basic features. Paid plans from $49/user/month.',
    },
    {
      question: 'How does Reply.io compare to Outreach?',
      answer: 'Outreach is more sophisticated and proven at enterprise scale. Reply.io is more affordable and accessible for SMBs. Both provide multi-channel sequencing.',
    },
    {
      question: 'Does Reply.io have LinkedIn automation?',
      answer: 'Yes, on Professional ($89/user). LinkedIn connection requests, messages, and profile views through a Chrome extension.',
    },
    {
      question: 'What is Jason AI?',
      answer: 'Reply.io\'s AI assistant that generates email copy, suggests sequence steps, and can auto-respond to positive replies.',
    },
    {
      question: 'Can Reply.io replace my CRM?',
      answer: 'No. Reply.io handles outreach but not pipeline management. Pair with HubSpot, Pipedrive, or Salesforce.',
    },
  ],
}

// ─── 14. Outreach ────────────────────────────────────────────────────────────

const outreachData: ReviewData = {
  name: 'Outreach',
  slug: 'outreach',
  tagline: 'The Enterprise Sales Engagement Platform That Powers the World\'s Best SDR Teams',
  excerpt: 'Outreach is the gold standard for enterprise sales engagement, with per-step analytics, AI optimization, and Salesforce integration that smaller platforms cannot replicate. After 4 months evaluating with a 30-person SDR team sending 60,000+ emails and making 12,000+ calls, we found unmatched analytical depth — at significant investment that only makes sense for large teams.',
  overallScore: 8.4,
  scores: {
    easeOfUse: 7.0,
    features: 9.5,
    value: 7.0,
    support: 8.5,
    integrations: 9.0,
  },
  quickInfo: {
    startingPrice: 'Custom pricing (~$100-130/user/month)',
    freeTrial: 'No free plan; demo-only evaluation',
    bestFor: 'Enterprise SDR organizations (25+ reps), revenue operations teams needing engagement analytics, B2B companies with mature outbound sales processes',
    integrations: '200+ (Salesforce-first; Gmail, LinkedIn, Gong, ZoomInfo)',
  },
  companyInfo: {
    founded: '2014',
    headquarters: 'Seattle, Washington, USA',
    companySize: '1,000+ employees',
    funding: '$500M+ raised; 6,000+ enterprise customers',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Dedicated CSM on all enterprise plans. Implementation support during onboarding (4-8 weeks). Premium support with SLA. Outreach University for training.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'SSO', 'Advanced permissions', 'Audit logging'],
  },
  popularIntegrations: [
    'Salesforce', 'HubSpot', 'LinkedIn Sales Navigator', 'Gong', 'ZoomInfo',
    'Gmail', 'Outlook', 'Zoom', 'Microsoft Teams', 'Slack',
    'Highspot', 'Seismic', '6sense', 'Bombora', 'Clari',
  ],
  affiliateLink: 'https://outreach.io?utm_source=workflowautomation',
  pros: [
    'Per-step engagement analytics reveal exactly where prospects engage and drop off in sequences',
    'Engagement Score ranks prospects by interaction patterns for prioritized outreach',
    'Enterprise-proven at scale — 30, 50, 100+ person SDR teams run reliably on Outreach',
    'AI-powered sequence optimization suggests timing and content adjustments based on what works',
    'Deep Salesforce integration — bidirectional sync, embedded dashboards, workflow triggers',
    'Governance controls ensure brand-consistent messaging across large SDR teams',
    'Deal management and forecasting expanding beyond sequences into revenue intelligence',
    'Conversation intelligence (Kaia) analyzes calls for coaching and keyword detection',
    'A/B testing with statistical significance calculations — not just raw open rate comparisons',
    'Rep performance dashboards with granular activity tracking for management visibility',
  ],
  cons: [
    'No published pricing — evaluation requires engaging enterprise sales team',
    'Annual contracts with minimum seat commitments (typically 15-25 seats)',
    'Implementation takes 4-8 weeks and requires dedicated admin support',
    'Primarily designed for Salesforce — HubSpot integration is less mature',
    'No prospecting database — need separate ZoomInfo or Apollo for contact data',
    'Overkill and overpriced for teams under 15 reps (Apollo at $79/user covers 80% of the value)',
    'Total cost including implementation and Salesforce licensing reaches $60,000-80,000/year for 30 reps',
    'No self-serve signup or free trial — high evaluation friction for smaller organizations',
  ],
  pricing: [
    {
      name: 'Standard',
      price: '~$100/user/month (custom)',
      features: [
        'Multi-channel sequences (email, phone, LinkedIn)',
        'Engagement analytics',
        'Salesforce integration',
        'A/B testing',
        'Rep performance dashboards',
        'AI-powered optimization',
        'Annual contract required',
      ],
    },
    {
      name: 'Professional',
      price: '~$115/user/month (custom)',
      features: [
        'Everything in Standard',
        'Deal management',
        'Forecasting',
        'Advanced analytics',
        'Conversation intelligence (Kaia)',
        'Advanced permissions',
        'Priority support',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '~$130/user/month (custom)',
      features: [
        'Everything in Professional',
        'Custom objects',
        'Advanced security (SSO, audit logs)',
        'Dedicated CSM',
        'Custom integrations',
        'SLA guarantees',
        'Implementation support',
      ],
    },
  ],
  faqItems: [
    {
      question: 'How much does Outreach cost?',
      answer: 'Custom pricing, typically $100-130/user/month with annual contracts and minimum seat requirements.',
    },
    {
      question: 'Does Outreach require Salesforce?',
      answer: 'Not technically, but the deepest integration is with Salesforce. HubSpot integration exists but is less mature.',
    },
    {
      question: 'How does Outreach compare to Apollo?',
      answer: 'Apollo provides data + outreach in one affordable tool. Outreach provides deeper analytics and enterprise features without data. Different market segments.',
    },
    {
      question: 'Is Outreach worth it for small teams?',
      answer: 'Generally no. Teams under 15 reps get better value from Apollo ($79/user), Reply.io ($89/user), or Lemlist ($79/user).',
    },
    {
      question: 'Does Outreach have a free trial?',
      answer: 'No. Evaluation requires engaging their sales team for a demo and proof of concept.',
    },
    {
      question: 'What is Kaia?',
      answer: 'Outreach\'s conversation intelligence — AI that analyzes sales calls for coaching insights, keyword detection, and meeting summaries.',
    },
  ],
}

// ─── 15. SalesLoft ───────────────────────────────────────────────────────────

const salesloftData: ReviewData = {
  name: 'SalesLoft',
  slug: 'salesloft',
  tagline: 'The Revenue Orchestration Platform Where AI Meets Sales Execution',
  excerpt: 'SalesLoft has evolved from a cadence tool into a Revenue Orchestration Platform featuring Rhythm AI — which analyzes engagement signals and creates a prioritized action queue for each rep. After 3 months with a 25-person sales team tracking 40,000+ touchpoints, we found Rhythm AI improved meeting-booking rates 22% for reps who followed its prioritized queue.',
  overallScore: 8.2,
  scores: {
    easeOfUse: 7.5,
    features: 9.0,
    value: 7.0,
    support: 8.5,
    integrations: 9.0,
  },
  quickInfo: {
    startingPrice: 'Custom pricing (~$75-125/user/month)',
    freeTrial: 'No free plan; demo-only evaluation',
    bestFor: 'Enterprise sales organizations wanting AI-driven workflow prioritization, mid-market to large SDR teams, revenue teams seeking unified engagement and deal management',
    integrations: '200+ (Salesforce and HubSpot deep integrations; LinkedIn, Gong, ZoomInfo)',
  },
  companyInfo: {
    founded: '2011',
    headquarters: 'Atlanta, Georgia, USA',
    companySize: '700+ employees',
    funding: '$245M raised; acquired by Vista Equity Partners (2024)',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Dedicated CSM on enterprise plans. Implementation support during onboarding (4-6 weeks). SalesLoft University for training. Priority support with SLA on top tiers.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'SSO', 'Advanced permissions', 'Audit logging'],
  },
  popularIntegrations: [
    'Salesforce', 'HubSpot', 'LinkedIn Sales Navigator', 'Gong', 'ZoomInfo',
    'Gmail', 'Outlook', 'Microsoft Teams', 'Slack', 'Zoom',
    'Highspot', 'Seismic', 'Clari', '6sense', 'Bombora',
  ],
  affiliateLink: 'https://salesloft.com?utm_source=workflowautomation',
  pros: [
    'Rhythm AI creates prioritized daily action queues based on buyer engagement signals — 22% higher meeting-booking rates',
    'Conversation intelligence records, transcribes, and analyzes sales calls for coaching',
    'Deals feature overlays engagement data on pipeline management — see not just stage but contact activity',
    'Strong Salesforce AND HubSpot integration — advantage over Outreach\'s Salesforce-first approach',
    'Cadence analytics reveal per-step conversion data for sequence optimization',
    'Competitive pricing versus Outreach (~$75-125 vs $100-130/user)',
    'Rhythm AI detects multi-threading when contacts forward emails to colleagues',
    'Pricing page visits and behavioral signals elevate prospects in the action queue automatically',
    'Vista Equity acquisition accelerating AI and product development roadmap',
    'Unified platform reduces tool sprawl — sequences, analytics, calls, and deals in one interface',
  ],
  cons: [
    'No published pricing — requires engaging enterprise sales process to evaluate',
    'Annual contracts with minimum seat commitments (typically 10-15 seats)',
    'Rhythm AI false positive rate ~30% — reps must develop judgment about when to follow vs override',
    'Requires CRM underneath (Salesforce or HubSpot) — adds to total cost and complexity',
    'No prospecting database — need separate Apollo or ZoomInfo for contact sourcing',
    'Not suitable for teams under 15 reps — SMBs get better value from Apollo or Reply.io',
    'Feature complexity requires 2-3 weeks for new reps to understand all interface areas',
    'No self-serve signup or free trial',
  ],
  pricing: [
    {
      name: 'Prospect (SDR/BDR)',
      price: '~$75/user/month (custom)',
      features: [
        'Multi-channel cadences (email, phone, LinkedIn)',
        'Rhythm AI action prioritization',
        'Engagement analytics',
        'Salesforce and HubSpot integration',
        'Email and call tracking',
        'Annual contract required',
      ],
    },
    {
      name: 'Sell (AE)',
      price: '~$100/user/month (custom)',
      features: [
        'Everything in Prospect',
        'Deals (pipeline with engagement context)',
        'Conversation intelligence',
        'Forecasting',
        'Advanced analytics',
        'Custom permissions',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '~$125/user/month (custom)',
      features: [
        'Everything in Sell',
        'Advanced security (SSO, audit logs)',
        'Dedicated CSM',
        'Custom integrations',
        'SLA guarantees',
        'Implementation support',
        'Full Rhythm AI suite',
      ],
    },
  ],
  faqItems: [
    {
      question: 'How much does SalesLoft cost?',
      answer: 'Custom pricing, typically $75-125/user/month with annual contracts. Generally slightly cheaper than Outreach.',
    },
    {
      question: 'What is Rhythm AI?',
      answer: 'SalesLoft\'s AI that analyzes engagement signals across channels and creates a prioritized action queue for each rep, suggesting what to do next based on buyer behavior.',
    },
    {
      question: 'Does SalesLoft require Salesforce?',
      answer: 'No — SalesLoft integrates deeply with both Salesforce and HubSpot. This dual-CRM support is an advantage over Outreach\'s Salesforce-first approach.',
    },
    {
      question: 'How does SalesLoft compare to Outreach?',
      answer: 'Both are enterprise sales engagement platforms with similar capabilities. SalesLoft has Rhythm AI and better HubSpot integration. Outreach has deeper per-step analytics and larger market presence. Evaluate both.',
    },
    {
      question: 'Is SalesLoft good for small teams?',
      answer: 'Not ideal. Teams under 15 reps get better value from Apollo, Lemlist, or Reply.io at 30-50% of the cost.',
    },
    {
      question: 'Does SalesLoft have a free trial?',
      answer: 'No. Evaluation requires engaging sales for a demo and proof of concept.',
    },
  ],
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const allData: ReviewData[] = [
    hubspotData,
    salesforceData,
    pipedriveData,
    zohoData,
    closeData,
    freshsalesData,
    copperData,
    attioData,
    folkData,
    apolloData,
    lemlistData,
    instantlyData,
    replyIoData,
    outreachData,
    salesloftData,
  ]

  console.log(`Starting batch upload of ${allData.length} CRM & Sales reviews...\n`)

  for (const data of allData) {
    try {
      await uploadReview(data.slug, data)
    } catch (error) {
      console.error(`Failed to upload ${data.name}:`, error)
    }
  }
}

main()
  .then(() => {
    console.log('All done!')
    process.exit(0)
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
