/**
 * Batch Upload Script: Project Management Reviews
 *
 * Uploads all project management reviews that aren't yet in Sanity.
 * Reviews covered: Jira, Trello, Basecamp, Notion, Linear, Wrike,
 *                  Smartsheet, Teamwork, Airtable, Todoist, Coda
 *
 * Usage: npx tsx scripts/upload-batch-pm.ts
 */

import { uploadReview, ReviewData } from './upload-review'

// ---------------------------------------------------------------------------
// Jira
// Rating: 8.2/10  (from quickVerdictBox: 8.2/10)
// Scores derived from review emphasis: dev focus, agile excellence, steep UX
// ---------------------------------------------------------------------------
const jiraData: ReviewData = {
  name: 'Jira',
  slug: 'jira',
  tagline: 'The Enterprise Development Standard That Powers 83% of Fortune 500 Teams',
  excerpt:
    'Jira is the industry standard for software development project management used by over 200,000 organizations. After nine months of intensive testing with an 18-person team across 6 active projects, 4,500+ issues, and 18 completed sprints, this comprehensive review covers everything from agile workflows to DevOps integrations and real enterprise costs.',
  overallScore: 8.2,
  scores: {
    easeOfUse: 6.5,
    features: 9.5,
    value: 8.0,
    support: 7.5,
    integrations: 9.5,
  },
  quickInfo: {
    startingPrice: '$7.75/user/month (Standard, billed annually)',
    freeTrial: 'Free for up to 10 users',
    bestFor: 'Software development teams, agile practitioners, enterprise organizations',
    integrations: '3,000+ via Atlassian Marketplace',
  },
  companyInfo: {
    founded: '2002',
    headquarters: 'Sydney, Australia (Atlassian)',
    companySize: '10,000+ employees',
    funding: 'Public (NASDAQ: TEAM)',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Free plan: community support only. Standard: business hours support. Premium: 24/7 support with 1-hour critical response. Enterprise: dedicated support team. Atlassian Community forums are often faster than direct support.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: [
      'ISO 27001',
      'SOC 2 Type II',
      'Cloud Security Alliance STAR',
      'HIPAA (BAA available, Enterprise)',
      'FedRAMP (in progress)',
      'CCPA',
    ],
  },
  popularIntegrations: [
    'GitHub',
    'GitLab',
    'Bitbucket',
    'Confluence',
    'Slack',
    'Microsoft Teams',
    'Jenkins',
    'Figma',
    'Miro',
    'Zendesk',
    'Salesforce',
    'Tempo',
    'Opsgenie',
    'Zapier',
    'CircleCI',
  ],
  affiliateLink: 'https://jira.com?utm_source=workflowautomation',
  pros: [
    'Best-in-class agile implementation for both Scrum and Kanban methodologies',
    'Developer tool integrations connect code commits, PRs, and deployments directly to issues',
    'JQL (Jira Query Language) enables precise, powerful filtering and custom reporting',
    'Powerful automation engine reduces repetitive tasks across projects',
    'Enterprise-grade scale handles thousands of users with proper governance',
    'Atlassian ecosystem integration with Confluence, Bitbucket, and Opsgenie',
    'Generous 10-user free tier that is genuinely useful for small teams',
    'Comprehensive agile reporting: burndown, velocity, cumulative flow, and control charts',
    'Highly customizable workflows with conditions, validators, and post-functions',
  ],
  cons: [
    'Steep learning curve that overwhelms new users — requires significant training investment',
    'Interface complexity hides features in menus and requires keyboard shortcuts to be efficient',
    'Not suitable for non-technical teams — marketing and HR should look elsewhere',
    'Atlassian Marketplace apps can significantly increase total cost of ownership',
    'Mobile app is too limited for complex tasks like sprint planning or workflow configuration',
    'Configuration and administration changes can have unintended side effects across projects',
    'Documentation assumes existing Jira knowledge, making initial setup challenging',
    'Cross-project reporting requires workarounds or premium add-ons',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Up to 10 users',
        'Scrum and Kanban boards',
        'Backlog and basic roadmap',
        '100 automation runs/month',
        '2 GB storage',
        'Community support',
      ],
    },
    {
      name: 'Standard',
      price: '$7.75/user/mo (annual)',
      features: [
        'Everything in Free',
        'Up to 35,000 users',
        '250 GB storage',
        'Business hours support',
        'Advanced permissions',
        '500 automation runs/month per user',
        'Audit logs (180 days)',
      ],
      highlighted: true,
    },
    {
      name: 'Premium',
      price: '$15.25/user/mo (annual)',
      features: [
        'Everything in Standard',
        'Advanced Roadmaps',
        'Admin Insights',
        'Sandbox environments',
        '24/7 support',
        'Unlimited storage',
        '1,000 automation runs/month per user',
        '99.9% uptime SLA',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Premium',
        'Unlimited sites',
        'Atlassian Access (SSO, SCIM)',
        'Organization-wide admin',
        'Unlimited automation',
        'Data residency',
        'Enterprise support',
        'Release tracks',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Jira only for software development?',
      answer:
        "Primarily, yes. While Jira has expanded to 'Jira Work Management' for business teams, its core strength remains software development. Non-technical teams typically prefer Asana, Monday.com, or ClickUp. Service teams might use Jira Service Management instead.",
    },
    {
      question: 'How does Jira compare to Trello?',
      answer:
        'Both are Atlassian products. Trello is simple visual kanban—immediate usability, limited features. Jira is complex project management—powerful features, steep learning curve. Many organizations use both: Trello for simple projects, Jira for development.',
    },
    {
      question: "What's the difference between Jira Cloud and Data Center?",
      answer:
        'Cloud is hosted by Atlassian with automatic updates and lower maintenance. Data Center is self-hosted with full control but higher cost and maintenance burden. Most teams should choose Cloud unless regulatory or security requirements mandate self-hosting.',
    },
    {
      question: 'Is Jira worth it for small teams?',
      answer:
        "The free tier (10 users) works well for small teams. Beyond that, evaluate whether Jira's complexity serves your needs. Small teams with simple requirements often do better with lighter tools like Linear, Shortcut, or even Trello.",
    },
    {
      question: 'How long does it take to learn Jira?',
      answer:
        'Basic usage (creating issues, moving through workflow): 1-2 days. Effective daily use: 2-4 weeks. Administration and configuration: months of learning. Plan for formal training if rolling out to teams.',
    },
    {
      question: 'Can Jira integrate with GitHub?',
      answer:
        "Yes, the GitHub for Jira app provides excellent integration. Commits, branches, and pull requests link to issues automatically when you include the issue key (e.g., 'PROJ-123') in commit messages or branch names.",
    },
    {
      question: 'What are story points in Jira?',
      answer:
        'Story points are a relative estimation unit for sizing work. Unlike hours, they measure complexity and effort relative to other stories. Teams calibrate their own point scales. Jira tracks velocity in story points per sprint.',
    },
    {
      question: 'How do I migrate from another tool to Jira?',
      answer:
        'Jira has importers for Trello, Asana, and CSV data. For complex migrations, consider Atlassian partners or migration tools. Plan for data cleanup and user training during transition.',
    },
    {
      question: 'Is Jira HIPAA compliant?',
      answer:
        'Jira Cloud can be HIPAA-compliant with a Business Associate Agreement (Enterprise plan). Data Center deployments with proper configuration can also meet HIPAA requirements. Consult Atlassian and your compliance team for specifics.',
    },
    {
      question: "What's the difference between Jira Software and Jira Service Management?",
      answer:
        'Jira Software is for internal team project management (development sprints, issue tracking). Jira Service Management is for IT service desks and customer-facing help desks with SLA management, customer portals, and ITSM features.',
    },
    {
      question: 'Can I use Jira without Scrum or Kanban?',
      answer:
        "Yes. While agile boards are prominent, you can use Jira with simple list views, timeline views, or custom dashboards. The underlying issue tracking works regardless of methodology.",
    },
    {
      question: 'How do I reduce Jira complexity for my team?',
      answer:
        "Simplify issue types (fewer is better), streamline workflows, create focused board filters, hide unnecessary fields, use automation to reduce manual work, and provide team training on efficient usage patterns.",
    },
  ],
}

// ---------------------------------------------------------------------------
// Trello
// Rating: 8.4/10 (from quickVerdictBox: 8.4/10)
// ---------------------------------------------------------------------------
const trelloData: ReviewData = {
  name: 'Trello',
  slug: 'trello',
  tagline: 'The Visual Project Management Pioneer That Changed How Teams Think About Work',
  excerpt:
    'Trello pioneered visual kanban-based project management for knowledge workers and today boasts over 50 million users. After six months of testing with a 12-person team across marketing, development, and cross-functional projects managing 47 boards and 1,200+ cards, this review covers the genuine strengths and real limitations of the worlds most recognizable project management tool.',
  overallScore: 8.4,
  scores: {
    easeOfUse: 9.5,
    features: 7.0,
    value: 8.5,
    support: 7.5,
    integrations: 8.0,
  },
  quickInfo: {
    startingPrice: '$5/user/month (Standard, billed annually)',
    freeTrial: 'Free forever plan available',
    bestFor: 'Visual thinkers, small teams, simple workflows, agile development',
    integrations: '200+ Power-Ups and native integrations',
  },
  companyInfo: {
    founded: '2011',
    headquarters: 'New York, NY (Atlassian)',
    companySize: '10,000+ employees (Atlassian)',
    funding: 'Acquired by Atlassian for $425M in 2017',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Free/Standard: email support with 24-hour response. Premium: priority support with faster response. Enterprise: dedicated success team with phone support. Help center and Atlassian University provide excellent self-service.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.99%',
    otherCertifications: ['SOC 2 Type 2', 'Data residency options (Enterprise)'],
  },
  popularIntegrations: [
    'Slack',
    'Microsoft Teams',
    'Google Drive',
    'Jira',
    'Confluence',
    'GitHub',
    'GitLab',
    'Salesforce',
    'Zapier',
    'Toggl',
    'Clockify',
    'Dropbox',
    'Box',
    'Adobe Creative Cloud',
    'Outlook',
  ],
  affiliateLink: 'https://trello.com?utm_source=workflowautomation',
  pros: [
    'Instantaneous learning curve — new users become productive within minutes, no training required',
    'Beautiful, intuitive drag-and-drop interface that is genuinely enjoyable to use every day',
    'Butler automation is powerful and included free, enabling if-this-then-that workflows',
    'Excellent mobile apps with full functionality and offline capability',
    'Reliable real-time collaboration with presence indicators and instant sync',
    'Fair pricing for small and medium teams, especially versus feature-rich competitors',
    'Public boards are great for product roadmaps, open-source projects, and transparency',
    'Card templates enable consistency across repeating workflows',
  ],
  cons: [
    'Calendar and Timeline views restricted to Premium paid plan ($10/user/month)',
    'Single Power-Up limit on free plan makes it nearly unusable for real team work',
    'No task dependencies or true Gantt chart capabilities for complex projects',
    'Limited reporting and analytics — executives wanting dashboards should look elsewhere',
    'Board can get cluttered and unwieldy as it scales beyond 100 cards',
    'Cross-board visibility requires Enterprise tier, making portfolio management difficult',
    'Advanced features buried in Power-Ups that often require their own subscriptions',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Unlimited cards',
        '10 boards per Workspace',
        '1 Power-Up per board',
        '250 automation runs/month',
        '10 MB file limit per attachment',
        'iOS and Android apps',
      ],
    },
    {
      name: 'Standard',
      price: '$5/user/mo (annual)',
      features: [
        'Unlimited boards',
        'Unlimited Power-Ups',
        '1,000 automation runs/month',
        'Advanced checklists',
        'Custom fields (up to 5 per board)',
        'Single board guests',
        'Saved searches',
      ],
      highlighted: true,
    },
    {
      name: 'Premium',
      price: '$10/user/mo (annual)',
      features: [
        'Everything in Standard',
        'Dashboard, Timeline, Calendar, Table, Map views',
        'Unlimited automation runs',
        'Workspace-level admin features',
        'Priority support',
        'Simple data export',
      ],
    },
    {
      name: 'Enterprise',
      price: '$17.50/user/mo (annual)',
      features: [
        'Everything in Premium',
        'Unlimited Workspaces',
        'Organization-wide permissions',
        'Attachment restrictions by domain',
        'Power-Up administration',
        'Free SSO and user provisioning',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Trello really free?',
      answer:
        "Yes, Trello's free plan is genuinely usable with unlimited cards, unlimited storage, and 10 boards per Workspace. The main limitations are 1 Power-Up per board and 250 automation runs per month. Most individuals and small teams can accomplish real work on the free plan, though growing teams will likely need Standard for unlimited boards and Power-Ups.",
    },
    {
      question: 'Can Trello replace Jira?',
      answer:
        "For lightweight agile teams, yes. For serious software development with complex workflows, extensive customization, and advanced reporting, no. Trello lacks Jira's depth in areas like sprint velocity tracking, release management, and development tool integrations. Many teams use Trello for non-technical work while keeping Jira for engineering.",
    },
    {
      question: "What happened to Trello's unlimited free boards?",
      answer:
        'In 2021, Trello changed from unlimited free boards to 10 boards per Workspace. This was controversial but remains generous compared to competitors. You can create multiple Workspaces to get more free boards, though this complicates team organization.',
    },
    {
      question: 'How do I add Gantt charts to Trello?',
      answer:
        "Trello doesn't have native Gantt charts. The Timeline view (Premium+) provides similar visualization but without dependencies. Third-party Power-Ups like TeamGantt, Planyway, or BigPicture add Gantt functionality, though they often require their own subscriptions.",
    },
    {
      question: 'Is Trello good for software development?',
      answer:
        "It depends on team size and process complexity. Small teams doing basic agile can work well with Trello. The GitHub/GitLab integrations link code to cards. However, teams needing sprint analytics, release tracking, or complex workflows will find Trello limiting compared to Jira, Linear, or Shortcut.",
    },
    {
      question: 'Can I use Trello offline?',
      answer:
        'The mobile apps work offline with cached boards — you can view cards and make changes that sync when connected. The web version requires an internet connection. For teams that frequently work offline, the mobile app approach is sufficient for most needs.',
    },
    {
      question: 'How does Trello compare to Notion for project management?',
      answer:
        'Trello offers a superior kanban experience — faster, more intuitive, better mobile apps. Notion offers databases with multiple views including kanban, plus documentation, wikis, and notes in one tool. Choose Trello for focused project management, Notion for an all-in-one workspace where project management is one component.',
    },
    {
      question: 'What is the best Power-Up for time tracking in Trello?',
      answer:
        'Toggl Track and Clockify are popular choices, both with free options. Toggl integrates smoothly with a button on each card. Clockify offers unlimited users free and good reporting. For comprehensive project time tracking, Everhour and Harvest are excellent though subscription-based.',
    },
    {
      question: 'Can Trello handle large teams effectively?',
      answer:
        "Teams up to 50 people can use Trello effectively with good organization practices. Beyond that, challenges emerge: cross-project visibility, resource management, and reporting needs typically exceed Trello's capabilities. Enterprise features help but don't fundamentally change Trello's small-team DNA.",
    },
    {
      question: 'How do I migrate from Trello to another tool?',
      answer:
        "Most project management tools offer Trello import: Asana, Monday.com, ClickUp, and Notion all have one-click importers. Trello's JSON export preserves all data. Consider running tools in parallel for a transition period rather than instant migration.",
    },
    {
      question: 'Is Trello HIPAA compliant?',
      answer:
        'No. Trello does not offer HIPAA compliance or Business Associate Agreements. Healthcare organizations handling PHI should look at specialized tools or enterprise platforms with HIPAA compliance (Asana Enterprise, Smartsheet, etc.).',
    },
    {
      question: "What's the difference between Butler and Zapier for Trello automation?",
      answer:
        'Butler runs inside Trello — fast, native, and included in your subscription. It handles card movements, due dates, labels, and internal workflows. Zapier connects Trello to external apps — CRMs, email tools, databases, etc. Most teams use both: Butler for internal automation, Zapier for external integrations.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Basecamp
// Rating: 3.8/5 → 7.6/10
// ---------------------------------------------------------------------------
const basecampData: ReviewData = {
  name: 'Basecamp',
  slug: 'basecamp',
  tagline: 'The Anti-Complexity Project Management Tool Built for Calm, Focused Work',
  excerpt:
    'Basecamp has been the alternative to over-engineered project management since 2004, built by the creators of Ruby on Rails around the philosophy that software should reduce stress, not create it. After 5+ months testing with a 10-person team across 25+ client projects, this honest review examines who Basecamp truly serves and who should look elsewhere.',
  overallScore: 7.6,
  scores: {
    easeOfUse: 9.5,
    features: 6.0,
    value: 8.0,
    support: 8.0,
    integrations: 5.5,
  },
  quickInfo: {
    startingPrice: '$15/user/month (OR $299/month flat-rate unlimited users, billed annually)',
    freeTrial: '30-day free trial, no credit card required',
    bestFor: 'Small to medium teams wanting simplicity, remote teams, agencies managing client projects',
    integrations: '75+ via Zapier',
  },
  companyInfo: {
    founded: '2004',
    headquarters: 'Chicago, IL',
    companySize: '60+ employees',
    funding: 'Bootstrapped — privately held, no venture capital',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Email support with responsive, helpful team. Pro Unlimited plan includes direct priority support and 1:1 onboarding call. Comprehensive help documentation and guides. Private company culture extends to customer service quality.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['CCPA', 'Two-factor authentication'],
  },
  popularIntegrations: [
    'Zapier',
    'Harvest',
    'Toggl',
    'Clockify',
    'Slack (via Zapier)',
    'Google Calendar (iCal export)',
    'Zapier (2,000+ apps)',
    'HubSpot (via Zapier)',
    'Salesforce (via Zapier)',
    'GitHub (via Zapier)',
    'Trello (via Zapier)',
    'Asana (via Zapier)',
  ],
  affiliateLink: 'https://basecamp.com?utm_source=workflowautomation',
  pros: [
    'Radically simple to learn — new hires and client collaborators need zero onboarding',
    'Message Boards create organized, searchable, permanent async communication unlike Slack',
    'Unified platform replaces Slack, Google Drive, and scheduling apps in one subscription',
    'Flat-rate Pro Unlimited pricing ($299/month) creates enormous value for teams of 25+',
    'Built-in client collaboration with "Just for us" toggle to hide internal discussions',
    'Automatic Check-ins replace synchronous standups for distributed and remote teams',
    'Hill Charts provide a unique visual language for communicating project progress to stakeholders',
    'Genuinely excellent mobile apps with full functionality — uncommon among project tools',
    'Bootstrapped, independent company that never sells data and prioritizes users over growth',
  ],
  cons: [
    'No Gantt charts — deliberately excluded; not coming, and Basecamp will tell you why they disagree',
    'No time tracking — requires Harvest, Toggl, or other external tool, fragmenting workflows',
    'No custom fields, task priorities, or workflow automation of any kind',
    'No task dependencies — complex projects with sequencing requirements cannot be properly managed',
    'No cross-project reporting or portfolio dashboards for executives needing visibility',
    'Limited integrations ecosystem compared to Asana, Monday.com, or ClickUp',
    'No recurring tasks — weekly reviews and routine processes must be created manually',
    'Scaling beyond simplicity is difficult — large organizations eventually outgrow flat structure',
  ],
  pricing: [
    {
      name: 'Basecamp',
      price: '$15/user/mo',
      features: [
        'Full access to all features',
        'Unlimited projects',
        '500 GB storage',
        'Client access included',
        'Mobile apps',
        'Email-in functionality',
      ],
    },
    {
      name: 'Pro Unlimited',
      price: '$299/mo flat (annual)',
      features: [
        'Unlimited users at no per-person cost',
        '5 TB storage (10x standard)',
        'Priority support',
        '1:1 onboarding call',
        'Extended project history',
        'Best value for 25+ users',
      ],
      highlighted: true,
    },
  ],
  faqItems: [
    {
      question: 'Is Basecamp free?',
      answer:
        'No permanent free plan. 30-day free trial with full access. After trial, choose $15/user/month or $349/month unlimited users (Pro Unlimited). There is a nonprofit discount of 10% and a 50% discount for schools and universities.',
    },
    {
      question: 'Is Basecamp good for small teams?',
      answer:
        "Yes — if your needs match its capabilities. Small teams benefit from simplicity and fast adoption. But small teams needing advanced features will find limitations frustrating. The per-user plan at $15/user is more expensive than competitors like Asana Starter ($10.99) or Monday.com Standard ($12).",
    },
    {
      question: 'Does Basecamp have time tracking?',
      answer:
        'No native time tracking. Integrates with Harvest, Toggl, and other tools via Zapier. The workaround works but adds tool fragmentation that Basecamp otherwise eliminates.',
    },
    {
      question: 'Does Basecamp have Gantt charts?',
      answer:
        "No. Basecamp philosophically rejects Gantt charts as false precision that creates overhead. If you need Gantt charts, Basecamp isn't for you. The Schedule tool provides date visibility without the overhead.",
    },
    {
      question: 'How does Basecamp compare to Asana?',
      answer:
        'Asana provides sophisticated task management with less communication integration. Basecamp provides simpler task management with better integrated communication. Choose based on what matters more: features or simplicity.',
    },
    {
      question: 'Can clients access Basecamp projects?',
      answer:
        'Yes, excellently. Add clients to specific projects. They see only their projects. Hide internal discussions with the "Just for us" toggle. No additional cost for client users on any plan.',
    },
    {
      question: 'Is Basecamp good for remote teams?',
      answer:
        'Yes. Built by a remote-first company with an async communication philosophy. Automatic Check-ins replace synchronous standups. The design supports distributed work across time zones.',
    },
    {
      question: 'What is the biggest limitation of Basecamp?',
      answer:
        'Feature limitations are deliberate. No Gantt charts, no time tracking, no dependencies, no custom fields, no advanced reporting. If you need these features, Basecamp will frustrate. Choose it only if its philosophy genuinely matches your needs.',
    },
    {
      question: 'Can I customize Basecamp?',
      answer:
        'Minimally. Every project has the same structure: Message Board, To-dos, Schedule, Docs & Files, Campfire, and Check-ins. No custom fields, workflows, or rules. The standardization is both the point and the limitation.',
    },
    {
      question: 'Is Basecamp secure?',
      answer:
        'Yes. SOC 2 Type II compliant. GDPR compliant. Two-factor authentication available. Private company that does not sell data. Not HIPAA or FedRAMP compliant — healthcare organizations should evaluate alternatives.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Notion
// Rating: 8.7/10 (from quickVerdictBox: 8.7/10)
// ---------------------------------------------------------------------------
const notionData: ReviewData = {
  name: 'Notion',
  slug: 'notion',
  tagline: 'The All-in-One Workspace That Revolutionizes How Teams Organize Everything',
  excerpt:
    'Notion has redefined what a productivity tool can be, growing to 35 million users and a $10 billion valuation by offering an unprecedented building-block approach to organizing work and knowledge. After eight months with a 15-person team managing 2,400+ pages across documentation, project tracking, and company wiki, this review delivers the honest truth about what Notion does brilliantly and where it falls short.',
  overallScore: 8.7,
  scores: {
    easeOfUse: 7.5,
    features: 9.0,
    value: 8.5,
    support: 7.5,
    integrations: 8.0,
  },
  quickInfo: {
    startingPrice: '$10/user/month (Plus, billed annually)',
    freeTrial: 'Free personal plan available',
    bestFor: 'Knowledge workers, startups, documentation-heavy teams, custom workflow builders',
    integrations: '100+ native + 1,500+ via embeds and Zapier',
  },
  companyInfo: {
    founded: '2016',
    headquarters: 'San Francisco, CA',
    companySize: '500+ employees',
    funding: '$343M raised; $10B valuation',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Email support for all plans. Priority support for Business and Enterprise. Dedicated success manager for Enterprise. Notion Academy, active Reddit community (r/Notion), and YouTube tutorials provide excellent self-service. Response times vary by plan.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['CCPA', 'SAML SSO (Business+)', 'SCIM provisioning (Enterprise)'],
  },
  popularIntegrations: [
    'Slack',
    'Google Drive',
    'Figma',
    'GitHub',
    'Loom',
    'Typeform',
    'Miro',
    'Zapier',
    'Make',
    'Jira',
    'Asana',
    'Trello',
    'Calendly',
    'Notion AI',
    'Confluence',
  ],
  affiliateLink: 'https://notion.com?utm_source=workflowautomation',
  pros: [
    'Unprecedented flexibility to build any workflow — wikis, databases, project trackers, or all three at once',
    'Beautiful, clean interface that is genuinely pleasant to use as a daily driver',
    'Powerful database system with six view types and unlimited filtered views per database',
    'Best-in-class documentation and knowledge management capabilities',
    'Fair pricing with a generous free plan that is actually useful for personal use',
    'Strong community with thousands of free templates for every imaginable use case',
    'Notion AI adds useful intelligence for summarizing, drafting, and answering questions',
    'Regular feature updates with meaningful improvements each quarter',
  ],
  cons: [
    'Performance issues with large pages (500+ blocks) and workspaces with thousands of items',
    'Mobile app is functional but not great — not suitable for intensive mobile work',
    'Real learning curve that requires genuine investment before your team gets productive',
    'Lacks true project management features: no dependencies, no time tracking, no resource management',
    'No native automation — external tools like Zapier required for workflow triggers',
    'Search can struggle to surface deeply nested content in large workspaces',
    'Requires ongoing maintenance and "workspace architect" discipline to prevent organizational chaos',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Unlimited pages and blocks',
        '10 guest collaborators',
        '7-day page history',
        'Sync across devices',
        'Basic integrations',
      ],
    },
    {
      name: 'Plus',
      price: '$10/user/mo (annual)',
      features: [
        'Everything in Free',
        'Unlimited file uploads',
        '30-day page history',
        'Unlimited guests',
        'Sync databases across workspaces',
      ],
      highlighted: true,
    },
    {
      name: 'Business',
      price: '$18/user/mo (annual)',
      features: [
        'Everything in Plus',
        'SAML SSO',
        'Private teamspaces',
        '90-day page history',
        'PDF export with logos',
        'Advanced permissions',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Business',
        'Advanced security controls',
        'Audit logs',
        'Workspace analytics',
        'Dedicated success manager',
        'Unlimited page history',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Notion good for project management?',
      answer:
        'It can work for straightforward project tracking, but it lacks features that dedicated PM tools provide: dependencies, time tracking, resource management, and advanced reporting. If your projects are documentation-heavy with simple task tracking, Notion works. For complex project management, consider Asana, Monday.com, or ClickUp instead.',
    },
    {
      question: 'How does Notion compare to Google Docs?',
      answer:
        'Notion offers more structure and organization than Google Docs. You can embed databases, create nested pages, and build connected systems. Google Docs is better for traditional document collaboration with commenting and suggestions. Many teams use both: Notion for structured documentation, Google Docs for collaborative writing.',
    },
    {
      question: 'Is Notion secure enough for business use?',
      answer:
        "For most businesses, yes. Notion has SOC 2 Type 2 certification, encrypts data, and offers SSO on Business plans. However, it's not HIPAA compliant and lacks some enterprise certifications. Regulated industries should evaluate carefully with compliance teams.",
    },
    {
      question: 'Can Notion replace Confluence?',
      answer:
        "For many teams, yes. Notion's documentation capabilities match or exceed Confluence, with a better editing experience. However, enterprises deeply integrated with Jira may miss the native Confluence-Jira connection. Notion has basic Jira integration but not as seamless.",
    },
    {
      question: 'Why is Notion slow sometimes?',
      answer:
        'Large pages with many blocks, complex databases with many properties, and workspaces with thousands of pages can cause performance issues. Tips: keep pages under 500 blocks, use linked databases instead of duplicating, archive old content, and use the desktop app for heavy use.',
    },
    {
      question: 'Is Notion AI worth the extra cost?',
      answer:
        "It depends on your use case. Notion AI excels at summarizing documents, extracting action items, and answering questions about your workspace. At $8-10/user/month, it's significant. We found it valuable for teams doing heavy documentation work but optional for others.",
    },
    {
      question: 'Can I use Notion offline?',
      answer:
        'Partially. The mobile app caches viewed pages for offline access. The desktop app has limited offline support. Full offline work with sync-on-reconnect is not available like with local-first tools.',
    },
    {
      question: 'How do I migrate from another tool to Notion?',
      answer:
        'Notion offers importers for Evernote, Trello, Asana, and more. CSV import works for databases. Manual migration is often needed for complex content. Plan for a gradual transition rather than an instant switch — most teams run parallel systems for a while.',
    },
    {
      question: 'What happens to my data if I cancel?',
      answer:
        'You can export all content as Markdown, CSV, and HTML before canceling. The free plan has no time limit, so you can keep access even if you downgrade. Notion does not delete data on downgrade, just limits features.',
    },
    {
      question: 'Is Notion good for personal use?',
      answer:
        'Excellent. The free personal plan is generous. Many people use Notion for life management: task lists, journals, habit tracking, reading lists, travel planning, and more. The community has templates for every personal use case imaginable.',
    },
    {
      question: 'How do I keep my Notion workspace organized?',
      answer:
        'Establish conventions early: consistent naming, clear hierarchy, regular cleanup routines. Designate someone as "workspace architect" to maintain structure. Use templates to ensure consistency. Archive rather than delete old content.',
    },
    {
      question: 'Can Notion handle large teams (100+ people)?',
      answer:
        'Yes, but careful architecture is essential. Use teamspaces to organize by department. Establish clear permissions. Consider workspace segmentation for very large organizations. Enterprise features help at scale.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Linear
// Rating: 9.1/10 (from quickVerdictBox: 9.1/10)
// ---------------------------------------------------------------------------
const linearData: ReviewData = {
  name: 'Linear',
  slug: 'linear',
  tagline: 'The Modern Issue Tracker Making Developers Fall in Love with Project Management',
  excerpt:
    'Linear has become the default choice for a new generation of startups and product teams by building what Jira should have been: fast, beautiful, and genuinely enjoyable to use. After seven months replacing Jira and Trello for a 14-person product and engineering team — completing 14 cycles and creating 2,800+ issues — this review delivers an honest assessment of the fastest issue tracker in the market.',
  overallScore: 9.1,
  scores: {
    easeOfUse: 9.0,
    features: 8.5,
    value: 9.0,
    support: 8.0,
    integrations: 8.5,
  },
  quickInfo: {
    startingPrice: '$8/user/month (Standard, billed annually)',
    freeTrial: 'Free plan for small teams (unlimited members)',
    bestFor: 'Startups, product teams, software developers wanting fast and beautiful tooling',
    integrations: '50+ native + GraphQL API + Zapier',
  },
  companyInfo: {
    founded: '2019',
    headquarters: 'San Francisco, CA',
    companySize: '50+ employees',
    funding: '$52M raised; $400M+ valuation',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Free plan: community support via Discord. Standard: priority email support. Plus/Enterprise: priority support with faster response times. Documentation is excellent. Discord community is active with Linear team members participating directly.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['CCPA', 'SAML SSO (Plus+)', 'SCIM provisioning (Enterprise)', 'EU data residency available'],
  },
  popularIntegrations: [
    'GitHub',
    'GitLab',
    'Bitbucket',
    'Slack',
    'Discord',
    'Figma',
    'Sentry',
    'Zendesk',
    'Intercom',
    'Front',
    'Vercel',
    'Zapier',
    'Make',
    'Notion',
    'Jira',
  ],
  affiliateLink: 'https://linear.app?utm_source=workflowautomation',
  pros: [
    'Fastest issue tracker available — instant page loads, search-as-you-type, millisecond issue creation',
    'Beautiful interface that is genuinely enjoyable to use daily, with excellent dark mode',
    'Keyboard shortcuts enable a flow-state productivity that makes daily work feel effortless',
    'GitHub integration automatically links PRs and commits to issues without any manual action',
    'Opinionated defaults mean teams start productive immediately without configuration paralysis',
    'Competitive pricing with a genuinely useful free tier for small teams',
    'Cycles provide just enough sprint structure to create rhythm without ceremony overhead',
    'Projects and Initiatives support strategic planning at multiple levels',
  ],
  cons: [
    'Limited workflow customization — fixed status states frustrate teams with unique processes',
    'Reporting lacks depth for executive dashboards compared to Jira or dedicated BI tools',
    'No native time tracking capability — requires external tools like Toggl or Harvest',
    'Enterprise features still maturing — large organizations may hit limits',
    'Not suitable for non-technical teams — designed exclusively for engineering and product',
    'Offline support is limited to viewing cached data, not creating or editing',
    'Mobile apps are functional for basic tasks but not for complex work management',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Unlimited members',
        'Unlimited issues',
        'All core features',
        '250 MB file storage',
        'Basic integrations',
      ],
    },
    {
      name: 'Standard',
      price: '$8/user/mo (annual)',
      features: [
        'Everything in Free',
        'Unlimited file storage',
        'Private teams',
        'Advanced integrations',
        'Priority support',
        'Guest access',
        'Audit logs',
      ],
      highlighted: true,
    },
    {
      name: 'Plus',
      price: '$14/user/mo (annual)',
      features: [
        'Everything in Standard',
        'Initiatives',
        'Advanced roadmaps',
        'Time-based cycles',
        'Custom roles',
        'SAML SSO',
        'Advanced analytics',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Plus',
        'SCIM provisioning',
        'SLA automation',
        'Dedicated support',
        'Data residency options',
        'Custom contracts',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Linear only for software development teams?',
      answer:
        "Primarily, yes. Linear is built for product and engineering teams. While technically anyone can use it, the feature set, integrations, and design decisions all target software development. Non-technical teams should consider Asana, Monday.com, or Notion.",
    },
    {
      question: 'How does Linear compare to Jira?',
      answer:
        "Linear is faster, more beautiful, and easier to learn. Jira is more customizable, has deeper enterprise features, and better reporting. Choose Linear for modern, nimble teams. Choose Jira for enterprise scale and complex requirements.",
    },
    {
      question: 'Can I customize workflows in Linear?',
      answer:
        'Not significantly. Linear has fixed workflow states: Backlog, Triage, Todo, In Progress, Done, Canceled, Duplicate. You can customize labels for categorization but not workflow states. This is intentional — Linear believes constraints enable focus.',
    },
    {
      question: 'Does Linear have time tracking?',
      answer:
        "No native time tracking. You can add estimate points/hours to issues, but there's no timer or actual time logging. Teams needing time tracking use external tools like Toggl, Clockify, or Harvest integrated via API.",
    },
    {
      question: 'How do I migrate from Jira to Linear?',
      answer:
        "Linear provides import tools for Jira. The process preserves issues, comments, and attachments. Labels map from Jira labels/components. Some customizations won't transfer (custom fields, workflow states). Plan for some manual cleanup.",
    },
    {
      question: "Is Linear's free plan really usable?",
      answer:
        'Yes. The free plan includes all core features with unlimited members and issues. Limitations are 250 MB storage and basic integrations. Small teams can operate entirely on free. Most grow into Standard for storage and private teams.',
    },
    {
      question: 'Does Linear work offline?',
      answer:
        'Partially. Linear syncs data locally, so you can view issues and navigate offline. Creating or editing issues requires connection. Full offline productivity is not possible, but basic reading works.',
    },
    {
      question: 'How does Linear handle projects versus cycles?',
      answer:
        'Cycles are time-boxed sprints (usually 1-2 weeks) for team execution. Projects are outcome-based groupings spanning multiple cycles. Use cycles for sprint planning, projects for feature or initiative tracking.',
    },
    {
      question: 'Can I use Linear without cycles?',
      answer:
        'Yes. Cycles are optional. Some teams prefer continuous flow (kanban-style) without time-boxing. You can disable cycles and work from the backlog directly.',
    },
    {
      question: 'Is Linear HIPAA compliant?',
      answer:
        'No. Linear targets tech companies and startups, not healthcare. If you need HIPAA compliance, look at Jira, Asana Enterprise, or specialized tools.',
    },
    {
      question: "What is Linear's uptime and reliability?",
      answer:
        'Linear reports 99.9% uptime. In seven months of testing, we experienced no significant outages. The status page communicates transparently during incidents.',
    },
    {
      question: "How does Linear's API work?",
      answer:
        'Linear provides a GraphQL API with comprehensive coverage. You can create issues, query data, build integrations, and automate workflows. Documentation is excellent. Rate limits are generous.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Wrike
// Rating: 4.2/5 → 8.4/10
// ---------------------------------------------------------------------------
const wrikeData: ReviewData = {
  name: 'Wrike',
  slug: 'wrike',
  tagline: 'The Enterprise Marketing Powerhouse with Best-in-Class Proofing and Approvals',
  excerpt:
    'Wrike has become the go-to work management platform for marketing teams and creative agencies that need powerful proofing, multi-stage approval workflows, and enterprise security in one integrated platform. After 6+ months of testing with a 16-person marketing team managing 60+ campaigns and projects, this review examines exactly where Wrike delivers genuine enterprise value and where its complexity creates friction.',
  overallScore: 8.4,
  scores: {
    easeOfUse: 6.5,
    features: 9.0,
    value: 7.0,
    support: 7.5,
    integrations: 8.5,
  },
  quickInfo: {
    startingPrice: '$9.80/user/month (Team, billed annually)',
    freeTrial: 'Free plan for 1 user; 14-day trial of paid features',
    bestFor: 'Marketing teams, creative agencies, professional services firms, enterprises needing approval workflows',
    integrations: '400+ native integrations',
  },
  companyInfo: {
    founded: '2006',
    headquarters: 'San Jose, CA',
    companySize: '1,000+ employees',
    funding: 'Acquired by Citrix for $2.25B in 2021',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Free/Team: knowledge base and community forums only. Business: email support with 24-48 hour response. Enterprise: priority support with faster response. Pinnacle: dedicated support resources. Professional services available for implementation assistance.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: [
      'ISO 27001',
      'CCPA',
      'HIPAA (Enterprise add-on)',
      'FedRAMP (in progress)',
      'SAML SSO (Enterprise)',
      'Regular penetration testing',
    ],
  },
  popularIntegrations: [
    'Slack',
    'Microsoft Teams',
    'Google Drive',
    'Dropbox',
    'Box',
    'SharePoint',
    'Salesforce',
    'HubSpot',
    'GitHub',
    'Jira',
    'Adobe Creative Cloud',
    'Zapier',
    'Power Automate',
    'Outlook',
    'Gmail',
  ],
  affiliateLink: 'https://wrike.com?utm_source=workflowautomation',
  pros: [
    'Best-in-class proofing and approval workflows — no other mainstream PM tool comes close for creative teams',
    'Visual markup, video proofing with frame-specific comments, and multi-stage approval routing',
    'Custom fields with Excel-like formula support for campaign ROI and metrics calculations',
    'Strong Gantt chart with full dependency types, critical path, and baseline comparison',
    'Sophisticated automation rules with multi-condition triggers and action sequences',
    'Request forms with conditional logic standardize intake and eliminate incomplete briefs',
    'Blueprint templates with dynamic dates and variables enable consistent project delivery',
    'Enterprise-grade security: SOC 2 Type II, ISO 27001, GDPR, and SAML SSO',
  ],
  cons: [
    'Steep learning curve — new users struggle with navigation, requiring 4-6 weeks to reach proficiency',
    'Interface feels dated and corporate compared to modern tools like Monday.com or Notion',
    'Complex and opaque pricing with significant tier jumps and add-ons creating budget surprises',
    'Team plan ($9.80/user) lacks custom fields and automation, making it essentially an extended trial',
    'Mobile experience is adequate but not excellent — interface adapted rather than designed for mobile',
    'Search and navigation in large workspaces becomes challenging as content accumulates',
    'Performance can lag with complex views and large dashboards',
    'Time tracking is an add-on at additional cost, not included in base pricing',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        '1 user only',
        'Board and Table view',
        'Basic task management',
        '2 GB storage',
        'Mobile apps',
      ],
    },
    {
      name: 'Team',
      price: '$9.80/user/mo (annual)',
      features: [
        '2-25 users',
        'Unlimited projects and tasks',
        'Board, Table, and Gantt views',
        '50+ integrations',
        '2 GB storage per user',
        'Basic dashboards',
      ],
    },
    {
      name: 'Business',
      price: '$24.80/user/mo (annual)',
      features: [
        '5-200 users',
        'Custom fields and workflows',
        'Request forms with conditional logic',
        '50 automation actions/user/month',
        'Proofing and approval workflows',
        'Blueprint templates',
        'Branded workspace',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Unlimited users',
        'Resource management',
        'Advanced analytics (Analyze)',
        'SAML SSO',
        '200 automation actions/user/month',
        'Audit reports',
        'Branded workspace',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Wrike free?',
      answer:
        "Limited free plan for one user only. Effectively a personal task list. Real evaluation requires paid plans or 14-day trial of full features.",
    },
    {
      question: 'Is Wrike good for small teams?',
      answer:
        "Challenging. The pricing requires Business tier ($24.80/user) for essential features. The learning curve is significant. Small teams often find better value in simpler alternatives like Asana, Trello, or Monday.com.",
    },
    {
      question: 'Does Wrike have time tracking?',
      answer:
        "As an add-on with additional cost. Not included in base pricing. Evaluate total cost including add-ons — a fully-loaded Wrike deployment can exceed $50/user/month.",
    },
    {
      question: "What is Wrike's best feature?",
      answer:
        "Proofing and approval workflows. No other mainstream project management tool matches these capabilities for creative teams. If you need visual proofing with video markup and multi-stage approvals, Wrike is compelling.",
    },
    {
      question: 'How does Wrike compare to Asana?',
      answer:
        "Wrike has stronger proofing/approvals and more complex custom fields. Asana has better UX and is easier to adopt. Choose based on whether proofing matters more than interface elegance.",
    },
    {
      question: 'Is Wrike good for agencies?',
      answer:
        'Yes — the client collaboration features, proofing capabilities, and approval workflows align well with agency needs. The guest reviewer access enables client participation without licensing.',
    },
    {
      question: 'Is Wrike secure enough for enterprise?',
      answer:
        'Yes. SOC 2 Type II, ISO 27001, SAML SSO, and comprehensive security features meet enterprise requirements.',
    },
    {
      question: 'How long does Wrike implementation take?',
      answer:
        'Small teams: 3-4 weeks. Enterprise deployments: 8-16 weeks including configuration, testing, training, and rollout. Budget for the learning investment — rushing implementation leads to poor adoption.',
    },
    {
      question: 'What is the difference between Wrike and Monday.com?',
      answer:
        'Wrike has stronger proofing/approval workflows, formula fields, and enterprise security. Monday.com has a better interface, faster adoption, and stronger dashboards. Choose Wrike for marketing/creative approval workflows; choose Monday.com for visual project management.',
    },
    {
      question: 'Does Wrike have resource management?',
      answer:
        'Basic resource visibility on Enterprise plan. Full resource management with workload views and capacity planning requires the separate Wrike Resource add-on at additional cost.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Smartsheet
// Rating: 4.0/5 → 8.0/10
// ---------------------------------------------------------------------------
const smartsheetData: ReviewData = {
  name: 'Smartsheet',
  slug: 'smartsheet',
  tagline: 'The Enterprise Spreadsheet Evolution That Powers 90% of Fortune 100 Companies',
  excerpt:
    'Smartsheet solves a problem that affects nearly every large organization: millions of Excel files masquerading as project management systems. By combining spreadsheet familiarity with genuine project management capabilities, it has earned 10 million users and adoption across 90% of Fortune 100 companies. After 6+ months testing with a 14-person team across 40+ projects in operations, IT, and marketing, this review examines where Smartsheet genuinely earns its enterprise reputation.',
  overallScore: 8.0,
  scores: {
    easeOfUse: 6.5,
    features: 9.0,
    value: 7.0,
    support: 7.5,
    integrations: 8.0,
  },
  quickInfo: {
    startingPrice: '$9/user/month (Pro, billed annually, 3-user minimum)',
    freeTrial: '30-day free trial; no permanent free plan',
    bestFor: 'Enterprise PMOs, construction and engineering teams, Excel-native organizations, professional services',
    integrations: '100+ native integrations',
  },
  companyInfo: {
    founded: '2005',
    headquarters: 'Bellevue, WA',
    companySize: '3,000+ employees',
    funding: 'Public (NYSE: SMAR)',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Pro plan: online help center and community forums, no direct support. Business: priority support via chat and email during business hours. Enterprise: dedicated Customer Success Manager and priority technical support. Professional services available for implementation.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: [
      'ISO 27001',
      'ISO 27018',
      'FedRAMP Authorized',
      'HIPAA (with BAA)',
      'CCPA',
      'SAML SSO (Enterprise)',
      'SCIM provisioning (Enterprise)',
    ],
  },
  popularIntegrations: [
    'Microsoft Teams',
    'Microsoft 365',
    'SharePoint',
    'Salesforce',
    'Jira',
    'ServiceNow',
    'Slack',
    'Google Workspace',
    'Tableau',
    'Power BI',
    'Zapier',
    'Power Automate',
    'DocuSign',
    'Outlook',
    'Gmail',
  ],
  affiliateLink: 'https://smartsheet.com?utm_source=workflowautomation',
  pros: [
    'Spreadsheet-familiar interface accelerates adoption in Excel-native enterprise organizations',
    'Best-in-class Gantt charts with all dependency types, critical path, baseline comparison, and drag scheduling',
    'Control Center enables PMOs to standardize project delivery and manage portfolios at scale',
    'Resource Management add-on provides serious capacity planning and utilization reporting',
    'Unlimited automation on Business plan eliminates the 250-run ceiling that constrained Pro',
    'Enterprise-grade security: SOC 2, ISO 27001, FedRAMP Authorized, and HIPAA eligible',
    'Cross-sheet formulas and dashboards enable genuine portfolio-level reporting and visibility',
    'WorkApps feature enables building no-code applications for specific user groups',
  ],
  cons: [
    'Dated user interface that does not meet modern SaaS design standards expected by teams',
    'No permanent free plan — $324/year minimum (3 users at $9/month) excludes small and budget-constrained teams',
    'Complex pricing with add-ons (Resource Management, connectors, Bridge) creating significant budget surprises',
    'Pro plan at $9/user has 250 automation runs/month — inadequate for any real automation use',
    'Enterprise features like Control Center, WorkApps, and advanced analytics require custom pricing',
    'Mobile experience is functional but basic — large sheets struggle on mobile devices',
    'Performance can lag with complex dashboards and sheets exceeding a few thousand rows',
    'Premium connectors to Salesforce and Jira require additional licensing ($12,000-50,000+/year)',
  ],
  pricing: [
    {
      name: 'Pro',
      price: '$9/user/mo (annual)',
      features: [
        '3-user minimum',
        'Unlimited sheets',
        'Grid, Gantt, Card, Calendar views',
        'Basic dashboards (10 widgets)',
        '250 automation runs/month',
        'Forms for data collection',
        '6 months of cell history',
      ],
    },
    {
      name: 'Business',
      price: '$19/user/mo (annual)',
      features: [
        '3-user minimum',
        'Everything in Pro',
        'Unlimited automation',
        'Calendar integration',
        'Advanced dashboards (unlimited widgets)',
        'Unlimited collaborators',
        'Basic resource management',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        '25+ user minimum',
        'Control Center (portfolio management)',
        'WorkApps (no-code app builder)',
        'DataMesh (large data management)',
        'SAML SSO and SCIM',
        'Admin controls and audit reports',
        'Dedicated Customer Success Manager',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Smartsheet free?',
      answer:
        'No permanent free plan exists. Smartsheet offers a 30-day trial with full Pro features. After the trial, paid subscription is required. Plans start at $9/user/month with a 3-user minimum. This positions Smartsheet for enterprise rather than individual or small team use.',
    },
    {
      question: 'Is Smartsheet better than Excel for project management?',
      answer:
        'For collaborative project management, yes. Smartsheet adds real-time collaboration, Gantt charts with dependencies, automation, forms, and dashboards that Excel cannot provide natively. For pure calculation and data analysis, Excel remains superior.',
    },
    {
      question: 'Does Smartsheet have Gantt charts?',
      answer:
        "Yes, and they are excellent. Smartsheet Gantt charts include full dependency types (FS, SS, FF, SF with lag), critical path calculation, baseline comparison, and interactive date adjustment. The Gantt capabilities exceed most project management tools and approach Microsoft Project sophistication.",
    },
    {
      question: 'How does Smartsheet compare to Microsoft Project?',
      answer:
        "Microsoft Project offers deeper scheduling algorithms, resource leveling, and more sophisticated planning features. Smartsheet provides better collaboration, broader work management beyond projects, and a cloud-native experience. Choose Project for maximum scheduling power; choose Smartsheet for modern collaboration with capable scheduling.",
    },
    {
      question: 'Is Smartsheet good for small teams?',
      answer:
        "Challenging due to pricing. Minimum $324/year (3 users at $9/user annual) with no free tier. Small teams often find better value in ClickUp, Asana, Trello, or Monday.com — all of which offer free plans.",
    },
    {
      question: 'Does Smartsheet have resource management?',
      answer:
        'Basic resource management (seeing allocations and identifying overallocation) is included in Business plan. Full Resource Management with workload views, time tracking, utilization reporting, and capacity forecasting requires a separate add-on ($8-20/user/month).',
    },
    {
      question: 'Can Smartsheet replace Jira?',
      answer:
        "For project management — possibly, depending on needs. For software development with sprints, story points, velocity tracking, and development tool integration — unlikely. Development teams typically prefer purpose-built tools like Jira or Linear.",
    },
    {
      question: 'Is Smartsheet secure enough for enterprise?',
      answer:
        'Yes. SOC 2 Type II, ISO 27001, FedRAMP Authorized, and HIPAA-eligible with appropriate plans. SAML SSO, SCIM provisioning, audit logs, and administrative controls meet enterprise security requirements.',
    },
    {
      question: 'How long does Smartsheet implementation take?',
      answer:
        'Small teams: 3-4 weeks for basic productive use. Enterprise: 8-16 weeks for full implementation including integrations, training, and change management.',
    },
    {
      question: 'What is the biggest limitation of Smartsheet?',
      answer:
        'Three main limitations: (1) Dated user interface that does not match modern SaaS standards, (2) Complex pricing with add-ons creating budget surprises, (3) No free plan excluding budget-constrained organizations.',
    },
    {
      question: 'Does Smartsheet have a mobile app?',
      answer:
        'Yes, for iOS and Android. The apps are functional for basic tasks — viewing sheets, updating status, adding comments. However, the mobile experience is basic compared to desktop and lags competitors like Asana and Monday.com.',
    },
    {
      question: 'Can I import Excel files into Smartsheet?',
      answer:
        "Yes. Smartsheet imports Excel files preserving most structure. Column types may need adjustment. Complex formulas require translation to Smartsheet syntax. The import process is smoother than most competitors given Smartsheet's spreadsheet heritage.",
    },
  ],
}

// ---------------------------------------------------------------------------
// Teamwork
// Rating: 4.1/5 → 8.2/10
// ---------------------------------------------------------------------------
const teamworkData: ReviewData = {
  name: 'Teamwork',
  slug: 'teamwork',
  tagline: 'The Only Project Management Platform Built for Client Work',
  excerpt:
    'Teamwork was founded by agency people for agency people, and it shows — integrated time tracking, client portals, billable rate management, and project profitability features are foundational, not afterthoughts. After 5+ months testing with a 14-person agency team across 35+ client projects tracking thousands of hours, this review examines why Teamwork dominates for client services organizations.',
  overallScore: 8.2,
  scores: {
    easeOfUse: 7.0,
    features: 8.5,
    value: 8.5,
    support: 8.0,
    integrations: 7.5,
  },
  quickInfo: {
    startingPrice: '$8.99/user/month (Starter, billed annually, 3-user minimum)',
    freeTrial: 'Free plan for up to 5 users (2 projects only)',
    bestFor: 'Client services agencies, professional services firms, marketing teams with billable work',
    integrations: '100+ native integrations',
  },
  companyInfo: {
    founded: '2007',
    headquarters: 'Cork, Ireland',
    companySize: '350+ employees',
    funding: 'Bootstrapped to profitability',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Free/Starter: email support and help center. Deliver: priority email support. Grow: priority support with training resources. Scale: dedicated support and onboarding assistance. Ireland-based team provides good coverage for European and US time zones.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['CCPA', 'Two-factor authentication', 'SAML SSO (Scale plan)', 'ISO 27001 (in progress)'],
  },
  popularIntegrations: [
    'Slack',
    'Microsoft Teams',
    'Google Drive',
    'Dropbox',
    'QuickBooks',
    'Xero',
    'FreshBooks',
    'HubSpot',
    'Salesforce',
    'Zapier',
    'Harvest',
    'Toggl',
    'GitHub',
    'Outlook',
    'Gmail',
  ],
  affiliateLink: 'https://teamwork.com?utm_source=workflowautomation',
  pros: [
    'Best-in-class integrated time tracking — connects to tasks, billing rates, and profitability seamlessly',
    'Genuine client focus with client companies, client portals, and client-specific permission levels',
    'Project profitability tracking on Grow plan transforms agency management with real financial visibility',
    'Solid Gantt charts with dependencies and critical path approaching dedicated scheduling tool quality',
    'Workload management view enables proactive resource allocation before overload occurs',
    'Project templates with time estimates and role assignments standardize delivery across the team',
    'Mobile time tracking with timer functionality increases compliance for field and travel use',
    'Invoicing integrates with QuickBooks, Xero, and FreshBooks on Grow plan',
  ],
  cons: [
    'Interface feels dated compared to Monday.com or Notion — functional but not delightful',
    'Learning curve for advanced features (templates, automations, profitability) requires 3-4 weeks',
    'Free plan limited to just 2 projects, making it essentially a trial for any real agency use',
    'Automation capabilities are functional but less sophisticated than Asana or Monday.com',
    'Agency-specific focus becomes a limitation for internal product teams without clients or billing',
    'Mobile experience works for time tracking but lacks full desktop capability for project management',
    'Search and navigation in large workspaces with many projects requires good organizational discipline',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Up to 5 users',
        '2 projects only',
        'Basic task management',
        'Board view',
        'Basic time tracking',
        '100 MB storage',
      ],
    },
    {
      name: 'Starter',
      price: '$8.99/user/mo (annual)',
      features: [
        '3+ users',
        'Up to 300 projects',
        'Full time tracking',
        'Kanban boards',
        'Calendar view',
        '100 GB storage',
        'Mobile apps',
      ],
    },
    {
      name: 'Deliver',
      price: '$13.99/user/mo (annual)',
      features: [
        'Everything in Starter',
        'Unlimited projects',
        'Gantt charts and dependencies',
        'Project templates',
        'Workload management',
        'Forms for intake',
        'Portfolio view',
      ],
      highlighted: true,
    },
    {
      name: 'Grow',
      price: '$25.99/user/mo (annual)',
      features: [
        'Everything in Deliver',
        'Project budgets and profitability',
        'Invoicing and billing',
        'Fixed-fee and retainer billing',
        'Advanced reporting',
        'Financial dashboards',
        'Planned vs actual comparison',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Teamwork free?',
      answer:
        'Limited free plan for up to 5 users with only 2 projects. Functional for evaluation but not sustained agency use. Most agencies need paid plans from day one.',
    },
    {
      question: 'Does Teamwork have time tracking?',
      answer:
        "Yes — it's a core feature included on all paid plans. The time tracking integrates with tasks, projects, billing rates, and profitability tracking. Multiple tracking methods: timer, manual entry, and calendar drag.",
    },
    {
      question: 'Is Teamwork good for agencies?',
      answer:
        'Excellent. Built specifically for client services organizations. Client management, billable time tracking, and profitability features address agency needs directly better than any general-purpose competitor.',
    },
    {
      question: 'How does Teamwork compare to Asana?',
      answer:
        'Asana has cleaner UX and broader appeal. Teamwork has integrated time tracking and agency-specific features. Choose based on whether time/billing integration matters more than interface elegance.',
    },
    {
      question: 'Does Teamwork have Gantt charts?',
      answer:
        'Yes, on Deliver plan and above. The Gantt includes dependencies with multiple relationship types, critical path calculation, and interactive scheduling.',
    },
    {
      question: 'Can clients access Teamwork?',
      answer:
        "Yes. Add clients as users with restricted permissions. They see only their projects. Client portal provides simplified view. No additional cost for client users.",
    },
    {
      question: 'Does Teamwork integrate with accounting software?',
      answer:
        'Yes. Invoicing syncs with QuickBooks, Xero, and FreshBooks on the Grow plan, eliminating duplicate data entry and reconciliation effort.',
    },
    {
      question: 'Is Teamwork secure?',
      answer:
        'Yes. SOC 2 Type II certified with GDPR compliance. Two-factor authentication on all plans. SAML SSO available on Scale plan.',
    },
    {
      question: 'What makes Teamwork different from other project management tools?',
      answer:
        "Teamwork's differentiation is integrated time tracking and project profitability. While competitors treat time tracking as an add-on, Teamwork builds it into the foundation — connecting logged hours directly to billing rates, invoices, and profitability analysis.",
    },
    {
      question: 'Is Teamwork worth the cost?',
      answer:
        "For agencies billing clients, often yes. Consider what it replaces: separate time tracking ($10+/user), project management ($15+/user), and invoicing tools ($20+/user). Teamwork Grow consolidates these. For teams without billable work, simpler alternatives provide better value.",
    },
  ],
}

// ---------------------------------------------------------------------------
// Airtable
// Rating: 4.4/5 → 8.8/10
// ---------------------------------------------------------------------------
const airtableData: ReviewData = {
  name: 'Airtable',
  slug: 'airtable',
  tagline: 'The Relational Database That Is Accessible to Everyone — Not Just Developers',
  excerpt:
    'Airtable democratized relational database capabilities for non-technical users, growing to 300,000+ organizations and an $11 billion valuation by solving a real problem: complex data trapped in unwieldy spreadsheets. After 6+ months testing with a 12-person team building custom tracking systems for product launches, content operations, and CRM workflows, this review delivers the honest truth about what Airtable enables versus where it falls short.',
  overallScore: 8.8,
  scores: {
    easeOfUse: 7.5,
    features: 9.0,
    value: 7.5,
    support: 7.5,
    integrations: 8.5,
  },
  quickInfo: {
    startingPrice: '$20/user/month (Team, billed annually)',
    freeTrial: 'Free plan available (1,000 records per base)',
    bestFor:
      'Operations teams, product managers, marketing teams needing custom databases, teams who have outgrown spreadsheets',
    integrations: '100+ native + Zapier + REST API',
  },
  companyInfo: {
    founded: '2012',
    headquarters: 'San Francisco, CA',
    companySize: '900+ employees',
    funding: '$1.4B raised; $11B valuation',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Free: help center and community forums. Team: email support. Business: priority email support. Enterprise: dedicated support options. Comprehensive documentation, Airtable Universe (shared bases), and community forums provide strong self-service resources.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['CCPA', 'HIPAA (Enterprise with BAA)', 'SAML SSO (Business+)', 'Data residency (Enterprise)'],
  },
  popularIntegrations: [
    'Slack',
    'Google Drive',
    'Google Calendar',
    'Salesforce',
    'Jira',
    'GitHub',
    'Zapier',
    'Make',
    'Typeform',
    'HubSpot',
    'Stripe',
    'Mailchimp',
    'Notion',
    'Asana',
    'Trello',
  ],
  affiliateLink: 'https://airtable.com?utm_source=workflowautomation',
  pros: [
    'Unprecedented flexibility to model any data structure — CRM, project tracker, content calendar, inventory system',
    'Relational data capability (linked records, rollups, lookups) previously only accessible to developers',
    'Beautiful, modern interface that makes database work feel approachable and enjoyable',
    'Multiple views of identical data (Grid, Kanban, Calendar, Gallery, Gantt, Timeline, Form) serve different users',
    'Interface Designer enables building focused custom applications on top of Airtable data',
    'Strong automation capabilities with multi-step rules and conditional logic',
    'Form view collects data from anyone without an Airtable account',
    'Mobile apps provide genuine capability including barcode scanning and photo capture',
  ],
  cons: [
    'Not a project management tool — no dependencies, critical path, resource management, or burndown charts',
    'Per-base record limits (1K free, 50K Team, 125K Business) force architectural compromises at scale',
    'Pricing is expensive: $20/user Team and $45/user Business are premium for the capabilities provided',
    'Steep learning curve for builders — understanding relationships, formulas, and automations takes real investment',
    'Formula syntax is unique to Airtable and different from Excel, requiring relearning',
    'Performance degrades with large complex bases — dashboards can be slow to load',
    'No offline functionality — internet connection always required',
    'Without governance, bases become chaotic as multiple people add fields and modify views',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Unlimited bases',
        '1,000 records per base',
        '1 GB attachments per base',
        'Up to 5 creators',
        '100 automation runs/month',
        'Interface Designer basics',
      ],
    },
    {
      name: 'Team',
      price: '$20/user/mo (annual)',
      features: [
        '50,000 records per base',
        '20 GB attachments per base',
        '25,000 automation runs/month',
        'Gantt and Timeline views',
        '6-month revision history',
        'Extensions marketplace',
      ],
      highlighted: true,
    },
    {
      name: 'Business',
      price: '$45/user/mo (annual)',
      features: [
        '125,000 records per base',
        '100 GB attachments per base',
        'Sync between bases',
        '100,000 automation runs/month',
        'Admin panel',
        'SAML SSO',
        'Advanced automation',
      ],
    },
    {
      name: 'Enterprise Scale',
      price: 'Custom',
      features: [
        '500,000 records per base',
        '1 TB attachments per base',
        'Unlimited automation runs',
        'Enhanced security controls',
        'Dedicated support',
        'Custom contract terms',
        'Data residency',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Airtable free?',
      answer:
        'Limited free plan with 1,000 records per base. Useful for personal use and evaluation. Business use typically requires paid plans — most growing teams hit the record limit within weeks.',
    },
    {
      question: 'Is Airtable a database or spreadsheet?',
      answer:
        'Database with a spreadsheet-like interface. The relational capabilities (linking records between tables) are database functionality. The visual experience resembles spreadsheets. It sits squarely between the two.',
    },
    {
      question: 'Can Airtable replace Excel?',
      answer:
        "For structured data with relationships — yes, dramatically. For pure calculation, complex formulas, or traditional spreadsheet tasks — Excel remains superior. Airtable is best when you've outgrown spreadsheets for relational data.",
    },
    {
      question: 'Is Airtable good for project management?',
      answer:
        "Not primarily. Airtable can track projects but lacks dependencies, resource management, and traditional PM features. Use dedicated tools for project management; use Airtable for custom data systems that don't fit pre-built software.",
    },
    {
      question: 'How many records can I have?',
      answer:
        'Varies by plan: 1,000 (Free), 50,000 (Team), 125,000 (Business), 500,000 (Enterprise Scale) — per base, not total across your account.',
    },
    {
      question: 'Can non-Airtable users submit data?',
      answer:
        'Yes, through Form view. Anyone can submit to a form without an Airtable account. Submissions populate the base automatically with all configured fields.',
    },
    {
      question: 'Does Airtable work offline?',
      answer:
        'Limited. Mobile apps allow offline viewing of cached data. Editing requires an active internet connection. Full offline work is not supported.',
    },
    {
      question: 'Is Airtable secure?',
      answer:
        'Yes. SOC 2 Type II certified, encrypted in transit and at rest, with SSO available on Business and above. HIPAA available on Enterprise with Business Associate Agreement. Meets enterprise security requirements for most organizations.',
    },
    {
      question: 'How does Airtable compare to Notion?',
      answer:
        "Airtable excels at relational data with multiple views and powerful automations. Notion excels at documentation and wikis with databases as a secondary feature. Airtable is better for data-first workflows; Notion is better when documentation context matters as much as the data.",
    },
    {
      question: 'What is the best use case for Airtable?',
      answer:
        "Airtable shines for custom data systems that don't fit pre-built software: content operations, product roadmaps, CRM-light applications, event planning, inventory tracking, and any workflow requiring relational data without database expertise.",
    },
  ],
}

// ---------------------------------------------------------------------------
// Todoist
// Rating: 8.8/10 (from quickVerdictBox: 8.8/10)
// ---------------------------------------------------------------------------
const todoistData: ReviewData = {
  name: 'Todoist',
  slug: 'todoist',
  tagline: 'The Task Management App That Mastered the Art of Simple Productivity',
  excerpt:
    'Todoist has earned its place as the most-loved task manager by doing one thing extraordinarily well: helping you capture, organize, and complete tasks with maximum speed and minimum friction. After 10+ months as a primary productivity system — completing 3,400+ personal tasks and coordinating a 6-person team — this review examines why this independent, bootstrapped tool has maintained 35 million users for nearly two decades.',
  overallScore: 8.8,
  scores: {
    easeOfUse: 9.5,
    features: 8.0,
    value: 9.5,
    support: 8.0,
    integrations: 8.5,
  },
  quickInfo: {
    startingPrice: '$4/month (Pro, billed annually)',
    freeTrial: 'Free forever plan available',
    bestFor: 'Individual productivity, freelancers, small teams, GTD practitioners',
    integrations: '80+ native + Zapier + IFTTT',
  },
  companyInfo: {
    founded: '2007',
    headquarters: 'Santiago, Chile (Doist)',
    companySize: '100+ employees',
    funding: 'Bootstrapped — profitable, independent',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Email support for all plans with typically fast and knowledgeable responses. Priority support for Business plan. Comprehensive help center, Reddit community (r/todoist), and official blog with productivity tips provide strong self-service. Developer docs for API.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99.99%',
    otherCertifications: ['Two-factor authentication', 'OAuth for integrations', 'Regular backups (Business)'],
  },
  popularIntegrations: [
    'Google Calendar',
    'Outlook Calendar',
    'Apple Calendar',
    'Slack',
    'Microsoft Teams',
    'Gmail',
    'Zapier',
    'IFTTT',
    'Make',
    'Google Assistant',
    'Amazon Alexa',
    'Siri Shortcuts',
    'Apple Watch',
    'Twist',
    'GitHub',
  ],
  affiliateLink: 'https://todoist.com?utm_source=workflowautomation',
  pros: [
    'Natural language input is best-in-class — "every Monday at 2pm p1 #work @calls" parses perfectly every time',
    'Blazing fast across all platforms with near-instant sync between web, desktop, and mobile',
    'Rock-solid reliability — zero data loss incidents in 10 months of daily use',
    'Exceptional cross-platform consistency: same experience on web, macOS, Windows, iOS, Android, and Apple Watch',
    'Recurring task patterns handle any schedule: "every 2nd Tuesday" or "every last Friday of the month"',
    'Free plan is genuinely usable for casual task management without feeling crippled',
    'Karma gamification and productivity tracking keep long-term engagement high',
    'Independent bootstrapped company built for longevity, not a venture-funded exit',
  ],
  cons: [
    'No built-in calendar view — Upcoming view is useful but not a true calendar replacement',
    'Collaboration features are basic compared to team-oriented tools like Asana or Basecamp',
    'No native time tracking — requires Toggl, Clockify, or Harvest integration',
    'Limited project management: no Gantt charts, no dependencies, no resource management',
    'No SSO for enterprise requirements — Business plan lacks enterprise admin controls',
    'Templates could be more powerful for repeating complex project structures',
    'No built-in habit tracking — recurring tasks work but dedicated habit apps do it better',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Up to 5 personal projects',
        'Basic task features',
        '3 filters',
        '5 MB file uploads',
        '1-week activity history',
        'iOS, Android, and browser extensions',
      ],
    },
    {
      name: 'Pro',
      price: '$4/mo (annual)',
      features: [
        'Unlimited projects',
        'Reminders (time and location)',
        'Unlimited labels and filters',
        'Comments and file uploads',
        'Calendar sync (two-way)',
        'Auto-backups',
        'Productivity trends (Karma)',
        'Custom themes',
      ],
      highlighted: true,
    },
    {
      name: 'Business',
      price: '$6/user/mo (annual)',
      features: [
        'Everything in Pro',
        'Team workspace',
        'Admin console',
        'Team billing and roles',
        'Team productivity insights',
        'Priority support',
        'Centralized billing',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Todoist free plan usable long-term?',
      answer:
        'Yes, for simple needs. You get 5 projects, basic features, and core functionality. Most people upgrade for reminders, unlimited projects, and labels. But casual users can operate on free indefinitely.',
    },
    {
      question: 'How does Todoist compare to Apple Reminders?',
      answer:
        'Todoist is significantly more powerful: natural language parsing, cross-platform sync, projects, labels, filters, recurring tasks, and collaboration. Apple Reminders is simpler and free but limited. Todoist is worth paying for if task management matters.',
    },
    {
      question: 'Can Todoist replace a project management tool?',
      answer:
        'For simple projects, yes. For complex project management with dependencies, resource allocation, and Gantt charts, no. Todoist is task management, not project management. Use both if needed.',
    },
    {
      question: 'Does Todoist work offline?',
      answer:
        'Yes, fully. You can view, create, edit, and complete tasks offline on all platforms. Changes sync when you reconnect. This works reliably on all platforms including mobile.',
    },
    {
      question: 'Is Todoist good for teams?',
      answer:
        'For small teams with simple collaboration needs, yes. For larger teams or those needing robust project management, consider Asana, Monday.com, or ClickUp. Todoist Business is best for teams of 10-15 or fewer.',
    },
    {
      question: 'How do I use Todoist for GTD?',
      answer:
        "Projects = Projects. Labels = Contexts (@home, @computer, @calls). Filters = Custom views. Inbox = Capture and process. Due dates for deadlines, priority for importance. Many GTD practitioners consider Todoist the gold standard implementation.",
    },
    {
      question: 'Can I integrate Todoist with my calendar?',
      answer:
        'Yes. Google Calendar and Outlook support two-way sync on Pro/Business plans. Tasks appear as calendar events, and changes sync both ways. Apple Calendar works via one-way iCal feed subscription.',
    },
    {
      question: "What's the difference between Pro and Business?",
      answer:
        'Pro is for individuals with all personal features. Business adds team features: shared workspace, admin controls, team billing, role management, and priority support. Choose Business when multiple people need structured collaboration.',
    },
    {
      question: 'Does Todoist have reminders?',
      answer:
        'Yes, on Pro and Business plans. Set reminders relative to due date/time or at specific times. Location-based reminders on mobile too. Free plan does not include reminders.',
    },
    {
      question: 'How do recurring tasks work?',
      answer:
        'Powerfully. "Every Monday," "every 2 weeks," "every 3rd Friday," "every weekday" — Todoist handles virtually any pattern. "Every" reschedules from completion date (adaptive). "Every!" reschedules from original schedule (fixed). Covers almost any recurrence pattern.',
    },
    {
      question: 'Can I use Todoist for habit tracking?',
      answer:
        'Somewhat, using recurring tasks. But dedicated habit apps (Streaks, Habitica) are better optimized for habit streaks and tracking. Todoist is optimized for tasks, not habit chains.',
    },
    {
      question: 'Is my data safe with Todoist?',
      answer:
        'Yes. Encrypted, regularly backed up, GDPR compliant. You can export all data anytime. The company is independently profitable and built for longevity — your data is not going anywhere.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Coda
// Rating: 8.5/10 (from quickVerdictBox: 8.5/10)
// ---------------------------------------------------------------------------
const codaData: ReviewData = {
  name: 'Coda',
  slug: 'coda',
  tagline: 'The Doc That Does Everything — A Spreadsheet, Document, and App Builder in One',
  excerpt:
    'Coda occupies a unique position in the productivity landscape: it is not quite a document editor, not quite a database, not quite a wiki — it is a platform for building custom applications from documents and tables. Founded by former YouTube VP Shishir Mehrotra, Coda has raised $630M at a $1.4B valuation. After 6+ months of building operations hubs, project trackers, meeting systems, and custom internal tools with a 10-person team, this review examines whether Coda delivers on its ambitious promise.',
  overallScore: 8.5,
  scores: {
    easeOfUse: 7.0,
    features: 9.0,
    value: 8.5,
    support: 7.5,
    integrations: 8.0,
  },
  quickInfo: {
    startingPrice: '$10/doc maker/month (Pro, billed annually)',
    freeTrial: 'Free plan available (50 table objects, 1,000 rows/doc)',
    bestFor: 'Teams wanting Notion-like flexibility with spreadsheet power, custom app builders, operations teams',
    integrations: '100+ via Packs + API + Zapier',
  },
  companyInfo: {
    founded: '2014',
    headquarters: 'San Francisco, CA',
    companySize: '200+ employees',
    funding: '$630M raised; $1.4B valuation',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails:
      'Email support with priority tiers by plan. Office hours with Coda team for paid plans. Coda Academy online courses, comprehensive formula reference, active community forum with experts, and template gallery. Documentation quality is excellent.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['SAML SSO (Team+)', 'CCPA', 'Custom domains (Enterprise)', 'Advanced security (Enterprise)'],
  },
  popularIntegrations: [
    'Slack',
    'Google Calendar',
    'Google Drive',
    'GitHub',
    'Figma',
    'Jira',
    'Salesforce',
    'Gmail',
    'Zapier',
    'Make',
    'HubSpot',
    'Notion',
    'Asana',
    'Trello',
    'Typeform',
  ],
  affiliateLink: 'https://coda.io?utm_source=workflowautomation',
  pros: [
    'Powerful formula language provides Excel-level logic directly within documents — no separate tool needed',
    'Buttons transform static documents into interactive applications with one-click multi-step workflows',
    'Tables with unlimited views (Table, Card, Calendar, Chart, Timeline, Detail) provide flexible data management',
    'Built-in automations with scheduled triggers and Slack/email actions reduce manual work significantly',
    'Publishing enables beautiful external sharing of docs as websites or embeddable widgets',
    'Viewer-free pricing model means only builders pay — economical for documentation-heavy organizations',
    'Cross-doc references enable modular, scalable system architectures across multiple documents',
    'AI features for text generation, formula writing, and data analysis are practically useful',
  ],
  cons: [
    'Steep learning curve for advanced features — formulas, buttons, and automations take weeks to master',
    'Performance degrades with large docs containing many complex formulas and large tables',
    'Mobile apps are functional but basic — not suitable for building or intensive editing',
    'No ready-made solutions — you must build everything, which requires time and expertise',
    'Formula syntax differs from both Excel and standard SQL, requiring relearning',
    'Some Pack integrations feel incomplete — data sync can be slow and limited',
    'Enterprise features still developing — not yet at the maturity level of Notion or Confluence',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Unlimited docs',
        '50 table objects',
        '1,000 rows per doc',
        'Sharing with editors',
        'Core features',
        'Basic Packs',
      ],
    },
    {
      name: 'Pro',
      price: '$10/doc maker/mo (annual)',
      features: [
        'Unlimited table objects',
        'Unlimited rows',
        'Private folders',
        'Doc history',
        'Advanced automations',
        'Priority support',
      ],
      highlighted: true,
    },
    {
      name: 'Team',
      price: '$30/doc maker/mo (annual)',
      features: [
        'Everything in Pro',
        'Org-wide sharing',
        'Folder permissions',
        'Locking',
        'SAML SSO',
        'Admin dashboard',
        'Cross-doc references',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Team',
        'Advanced security',
        'Custom domains',
        'Dedicated support',
        'SLAs',
        'Custom contract terms',
      ],
    },
  ],
  faqItems: [
    {
      question: 'How is Coda different from Notion?',
      answer:
        'Coda has significantly more powerful formulas and built-in automations. Notion has a better document editing experience and stronger mobile apps. Choose Coda for formula-heavy workflows and custom applications. Choose Notion for documentation and simpler databases.',
    },
    {
      question: 'Is Coda good for project management?',
      answer:
        'You can build excellent project management systems in Coda, but you must build them. If you want ready-made project management, use Asana, Monday.com, or ClickUp. If you want custom workflows tailored to your exact process, Coda is excellent.',
    },
    {
      question: 'How steep is the Coda learning curve?',
      answer:
        'Basic doc creation is easy — similar to any modern editor. Learning tables takes a few hours. Mastering formulas, buttons, and automations takes weeks. Most teams need one or two "Coda champions" who build and maintain complex docs for the rest of the team.',
    },
    {
      question: 'Does Coda work offline?',
      answer:
        'Partially. You can view content offline, but edits require an internet connection. Full offline work is not supported like with local-first tools.',
    },
    {
      question: 'What are Packs?',
      answer:
        "Packs are Coda's integration system. They connect Coda to external services (Slack, GitHub, Salesforce, etc.) for syncing data and triggering actions. Some packs are built-in; others are community-created. Packs enable both sync tables (pulling external data in) and actions (pushing data out).",
    },
    {
      question: 'Can I import from Excel or Google Sheets?',
      answer:
        'Yes. Coda has importers for spreadsheets. Formulas will not transfer (different syntax), but data and structure come over cleanly. Plan for some rebuilding of calculated columns.',
    },
    {
      question: 'Is Coda secure for business use?',
      answer:
        'Yes. SOC 2 Type II certified, GDPR compliant, with SAML SSO on Team and Enterprise plans. Enterprise plan adds advanced security controls. Suitable for most business use cases.',
    },
    {
      question: 'How does Coda pricing work?',
      answer:
        'Coda charges per "Doc Maker" — people who create and edit docs. Viewers are completely free (unlimited). This makes Coda economical for documentation-heavy teams where many people read but only a few build and maintain.',
    },
    {
      question: 'Can I publish Coda docs publicly?',
      answer:
        'Yes. You can publish pages or entire docs publicly with customizable URLs. Great for documentation sites, public dashboards, or customer-facing tools.',
    },
    {
      question: 'How does Coda compare to Airtable?',
      answer:
        'Coda combines documents with tables — better when you need narrative context around data. Airtable is primarily a database with some page features — better for pure database use cases with sophisticated views. Coda has more automation built-in; Airtable has more mature Interface Designer.',
    },
    {
      question: 'What is Coda AI?',
      answer:
        'AI features built into Coda for generating text, writing formulas from natural language, summarizing content, and answering questions about your data. Included in paid plans with usage limits. Genuinely useful for drafting and formula generation.',
    },
    {
      question: 'Is Coda good for small teams?',
      answer:
        'Yes, but it depends on the team. Teams comfortable building custom systems thrive. Teams wanting ready-made solutions may find Coda more work than it is worth initially. The free plan is genuinely useful for small teams exploring the platform.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Sequential upload runner
// ---------------------------------------------------------------------------
async function uploadAll() {
  const reviews: Array<{ slug: string; data: ReviewData }> = [
    { slug: 'jira', data: jiraData },
    { slug: 'trello', data: trelloData },
    { slug: 'basecamp', data: basecampData },
    { slug: 'notion', data: notionData },
    { slug: 'linear', data: linearData },
    { slug: 'wrike', data: wrikeData },
    { slug: 'smartsheet', data: smartsheetData },
    { slug: 'teamwork', data: teamworkData },
    { slug: 'airtable', data: airtableData },
    { slug: 'todoist', data: todoistData },
    { slug: 'coda', data: codaData },
  ]

  console.log(`\nBatch PM Upload — ${reviews.length} reviews to process\n`)
  console.log('='.repeat(60))

  let succeeded = 0
  let failed = 0
  const errors: Array<{ slug: string; error: string }> = []

  for (const { slug, data } of reviews) {
    try {
      console.log(`\n[${succeeded + failed + 1}/${reviews.length}] Uploading ${data.name}...`)
      await uploadReview(slug, data)
      succeeded++
      console.log(`  -> ${data.name} uploaded successfully`)
    } catch (err) {
      failed++
      const message = err instanceof Error ? err.message : String(err)
      errors.push({ slug, error: message })
      console.error(`  -> FAILED: ${data.name}: ${message}`)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log(`\nBatch upload complete: ${succeeded} succeeded, ${failed} failed`)

  if (errors.length > 0) {
    console.log('\nFailed uploads:')
    for (const { slug, error } of errors) {
      console.log(`  - ${slug}: ${error}`)
    }
    process.exit(1)
  }
}

uploadAll()
  .then(() => {
    console.log('\nAll done!')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Batch upload failed unexpectedly:', err)
    process.exit(1)
  })
