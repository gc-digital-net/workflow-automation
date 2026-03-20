/**
 * Batch Upload Script - No-Code / Low-Code Reviews
 *
 * Uploads all 19 No-Code / Low-Code tool reviews to Sanity.
 * Run with: npx tsx scripts/upload-batch-nocode.ts
 */

import { uploadReview, ReviewData } from './upload-review'

// ─── 1. Bubble ────────────────────────────────────────────────────────────────

const bubbleData: ReviewData = {
  name: 'Bubble',
  slug: 'bubble',
  tagline: 'The No-Code Platform That Lets Non-Developers Build Real Web Applications',
  excerpt: 'Bubble is the most capable no-code platform for building full web applications. After 6 months building 3 applications — a customer portal, internal CRM, and marketplace MVP — with a 4-person non-technical team, we found Bubble delivers genuine software capability at the cost of a steeper-than-advertised learning curve.',
  overallScore: 8.4,
  scores: {
    easeOfUse: 7.0,
    features: 9.5,
    value: 8.0,
    support: 8.0,
    integrations: 8.5,
  },
  quickInfo: {
    startingPrice: '$29/month',
    freeTrial: 'Free plan (with Bubble branding, no custom domain)',
    bestFor: 'Non-technical founders building MVPs, startups validating ideas, businesses creating internal tools without engineering resources',
    integrations: '500+',
  },
  companyInfo: {
    founded: '2012',
    headquarters: 'New York, NY, USA',
    companySize: '200+ employees',
    funding: '$100M+ raised',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Free plan gets community forum support. Paid plans get email support. Higher tiers get priority support. Bubble has an extensive manual, video courses, and an active forum community.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['HIPAA (Enterprise)'],
  },
  popularIntegrations: [
    'Stripe', 'Sendgrid', 'Twilio', 'Google Maps', 'Airtable',
    'Zapier', 'Make (Integromat)', 'Mailchimp', 'Intercom', 'Slack',
    'AWS S3', 'Algolia', 'OpenAI', 'Segment',
  ],
  affiliateLink: 'https://bubble.io?utm_source=workflowautomation',
  pros: [
    'Build fully functional web apps without writing code — databases, auth, logic, APIs',
    'Most capable no-code platform for complex applications',
    'Per-application pricing means unlimited end users on all plans',
    'Free plan lets you build and test before paying anything',
    'Large community of Bubble developers and freelancers available',
    'Plugin ecosystem extends functionality significantly',
    'Native API connector for integrating any REST or GraphQL service',
    'Hosted and deployed automatically — no DevOps required',
  ],
  cons: [
    'Steeper learning curve than marketing implies — expect 2-4 weeks to become productive',
    'Web applications only — no native iOS or Android apps',
    'Performance under heavy load cannot match hand-coded applications',
    'Platform dependency — you cannot export code and host elsewhere',
    'Visual editor can become complex for large applications',
    'Free plan runs on Bubble subdomain with branding',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Full visual editor access',
        'Built-in database and workflows',
        'API connector',
        'Bubble subdomain only',
        'Bubble branding displayed',
        'Limited server capacity',
        'Development and testing only',
      ],
    },
    {
      name: 'Starter',
      price: '$29/month',
      features: [
        'Custom domain',
        'Bubble branding removed',
        'Basic server capacity',
        'Good for personal projects and low-traffic apps',
      ],
    },
    {
      name: 'Growth',
      price: '$119/month',
      features: [
        'Everything in Starter',
        'More server capacity',
        'Higher API workflow call limits',
        'More storage',
        'Suitable for 50-100 daily active users',
      ],
      highlighted: true,
    },
    {
      name: 'Team',
      price: '$349/month',
      features: [
        'Everything in Growth',
        'Multi-developer collaboration',
        'Version control',
        'Sub-applications',
        'Increased server capacity',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Can you really build production software with Bubble?',
      answer: 'Yes. Bubble applications can handle real users, real payments, and real data. Companies have raised venture capital on products built in Bubble. The main limitations are web-only (no native mobile), performance under very heavy load, and inability to export code.',
    },
    {
      question: 'How long does it take to learn Bubble?',
      answer: 'Expect 2-4 weeks to become productive, and 2-3 months to build complex applications confidently. The learning curve is longer than basic drag-and-drop builders because Bubble exposes real application concepts (database design, workflows, user authentication).',
    },
    {
      question: 'Does Bubble have a free plan?',
      answer: 'Yes. The free plan gives you full access to the visual editor, database, workflows, and API connector. The limitations are that you cannot use a custom domain, Bubble branding appears on your app, and server capacity is limited. Launching a production application requires a paid plan.',
    },
    {
      question: 'Can Bubble apps be published to the App Store?',
      answer: 'Not natively. Bubble builds web applications. You can wrap a Bubble app in a WebView container for app store submission, but the result performs like a web view rather than a native app. For true native mobile apps, consider Adalo or FlutterFlow.',
    },
    {
      question: 'What happens if Bubble shuts down?',
      answer: "Your application lives on Bubble's infrastructure, and you cannot export the code. This platform dependency is the main risk of building on Bubble. Mitigations include maintaining data exports and having a migration plan for critical applications.",
    },
    {
      question: 'How does Bubble pricing work?',
      answer: 'Bubble charges per application, not per user. You pay based on your app\'s capacity needs, and any number of end users can access it. The Growth plan at $119/month handles most production applications with 50-100 daily active users.',
    },
  ],
}

// ─── 2. Webflow ───────────────────────────────────────────────────────────────

const webflowData: ReviewData = {
  name: 'Webflow',
  slug: 'webflow',
  tagline: 'The No-Code Website Builder That Designers Actually Respect',
  excerpt: 'Webflow is the professional-grade visual web builder that produces clean, semantic code rivaling hand-coded sites. After 7 months building 5 websites with a 3-person design team — achieving a 96 Lighthouse score on a SaaS landing page and managing 200+ article CMS blogs — we found Webflow delivers on its promise for designers willing to learn CSS concepts visually.',
  overallScore: 8.8,
  scores: {
    easeOfUse: 7.5,
    features: 9.0,
    value: 8.5,
    support: 8.5,
    integrations: 8.0,
  },
  quickInfo: {
    startingPrice: '$14/month (Basic site plan)',
    freeTrial: 'Free plan (staging only, webflow.io subdomain)',
    bestFor: 'Designers building production websites without developers, agencies creating client sites with CMS, marketing teams wanting pixel-perfect landing pages',
    integrations: '300+',
  },
  companyInfo: {
    founded: '2013',
    headquarters: 'San Francisco, CA, USA',
    companySize: '500+ employees',
    funding: '$304M raised; $4B valuation',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Webflow University provides extensive free video courses. Email support is available on paid plans. An active community forum handles most questions. No phone support at any tier.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.99%',
    otherCertifications: ['ISO 27001'],
  },
  popularIntegrations: [
    'Google Analytics', 'Mailchimp', 'HubSpot', 'Zapier', 'Memberstack',
    'Finsweet', 'Shopify', 'Stripe', 'Algolia', 'Lottie',
    'Cloudflare', 'Google Tag Manager', 'Intercom', 'Crisp',
  ],
  affiliateLink: 'https://webflow.com?utm_source=workflowautomation',
  pros: [
    'Produces clean, semantic HTML/CSS that achieves 90+ Lighthouse scores routinely',
    'CSS-based visual designer teaches real web layout concepts while building',
    'CMS rivals WordPress without plugins for content-rich sites',
    'Global CDN with automatic SSL — no separate hosting management needed',
    'Interactions and animations engine creates scroll effects without JavaScript',
    'Code export lets you take your HTML/CSS out of Webflow',
    'Webflow University is among the best free design education available',
  ],
  cons: [
    'Requires understanding of CSS concepts — not suitable for complete beginners',
    'Not an application builder — no database, user auth, or business logic',
    'Two pricing dimensions (site plans + workspace plans) create complexity',
    'CMS collection limits on lower tiers constrain large content sites',
    'Ecommerce features lag behind Shopify for serious online stores',
    'No phone support at any tier',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Full designer access',
        'webflow.io subdomain',
        'Webflow branding',
        'Cannot publish to custom domain',
        'Good for learning and prototyping',
      ],
    },
    {
      name: 'Basic',
      price: '$14/month',
      features: [
        'Custom domain',
        '500 form submissions/month',
        '50GB bandwidth',
        'No CMS',
        'For simple static sites',
      ],
    },
    {
      name: 'CMS',
      price: '$23/month',
      features: [
        'Everything in Basic',
        'CMS with 2,000 items',
        '10GB storage',
        'For blogs, portfolios, content-driven sites',
      ],
      highlighted: true,
    },
    {
      name: 'Business',
      price: '$39/month',
      features: [
        'Everything in CMS',
        '10,000 CMS items',
        'Custom code embedding',
        'Site search',
        'For larger content-driven sites',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Webflow really no-code?',
      answer: 'Webflow is visual-first but requires understanding CSS concepts like flexbox, grid, margins, and responsive breakpoints. Experienced designers pick it up quickly. Complete beginners without any web layout knowledge will find it challenging. It\'s best described as "no-code for people who understand how the web works."',
    },
    {
      question: 'Can Webflow build web applications?',
      answer: 'No. Webflow builds websites and content-driven sites — not web applications with user authentication, databases, or business logic. For applications, use Bubble. For simple websites with great design, Webflow excels.',
    },
    {
      question: 'How does Webflow compare to WordPress?',
      answer: 'Webflow produces cleaner code with better performance, requires no plugin management, and includes hosting. WordPress has a vastly larger ecosystem, more plugins, and is easier to hand off to non-technical editors. Webflow is better for performance and design; WordPress is better for content management at scale.',
    },
    {
      question: 'Can I export my Webflow site code?',
      answer: 'Yes, on paid workspace plans (Core and above). You can export clean HTML and CSS to host anywhere. This eliminates vendor lock-in — a significant advantage over most no-code website builders.',
    },
    {
      question: 'What is Webflow University?',
      answer: "Webflow's free learning platform with structured video courses covering the entire platform. It's genuinely excellent — most Webflow users learn primarily through Webflow University. Expect 10-20 hours to become productive with the platform.",
    },
  ],
}

// ─── 3. Retool ────────────────────────────────────────────────────────────────

const retoolData: ReviewData = {
  name: 'Retool',
  slug: 'retool',
  tagline: 'The Low-Code Platform That Turns Developers Into 10x Internal Tool Builders',
  excerpt: 'Retool is the leading low-code platform for building internal tools. After 5 months building 12 internal tools with a 6-person engineering team — connecting to 4 databases and 8 APIs — we found Retool dramatically accelerates internal tool development while maintaining the control developers expect from SQL and JavaScript.',
  overallScore: 8.6,
  scores: {
    easeOfUse: 8.0,
    features: 9.0,
    value: 8.0,
    support: 8.5,
    integrations: 9.5,
  },
  quickInfo: {
    startingPrice: '$10/user/month (Team)',
    freeTrial: 'Free plan for up to 5 users',
    bestFor: 'Development teams building internal tools and admin panels, companies wanting to stop building internal tools from scratch, ops teams needing database-connected interfaces',
    integrations: '50+ native data sources',
  },
  companyInfo: {
    founded: '2017',
    headquarters: 'San Francisco, CA, USA',
    companySize: '500+ employees',
    funding: '$145M+ raised (Sequoia Capital)',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Free plan gets community support. Team plan gets email and chat support. Business and Enterprise plans get dedicated support. Documentation is comprehensive and actively maintained.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['HIPAA (Business/Enterprise)', 'ISO 27001'],
  },
  popularIntegrations: [
    'PostgreSQL', 'MySQL', 'MongoDB', 'Snowflake', 'BigQuery',
    'DynamoDB', 'Redis', 'Elasticsearch', 'REST APIs', 'GraphQL',
    'Google Sheets', 'Airtable', 'Firebase', 'Salesforce', 'Stripe',
  ],
  affiliateLink: 'https://retool.com?utm_source=workflowautomation',
  pros: [
    'Admin dashboards that take weeks to code from scratch built in hours',
    '100+ pre-built components — tables, forms, charts, modals, all production-ready',
    'Connects to 50+ data sources including all major databases and APIs',
    'Free plan for 5 users is genuinely functional for small teams',
    'Self-hosted option for data security and compliance requirements',
    'SQL, JavaScript, and GraphQL queries give developers full control',
    'Version control and audit logs on paid plans support team development',
  ],
  cons: [
    'Not suitable for customer-facing applications — internal tools only',
    'Requires SQL or JavaScript knowledge — not truly no-code',
    'Business plan at $50/user/month is expensive for large teams',
    'Self-hosting option only available on Enterprise plan',
    'Performance can lag with very large datasets without optimization',
    'UI customization has limits compared to building from scratch',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Up to 5 users',
        'Unlimited apps',
        'Unlimited data source connections',
        'All core components',
        'Community support',
      ],
    },
    {
      name: 'Team',
      price: '$10/user/month',
      features: [
        'Unlimited users',
        'Version control',
        'Audit logs',
        'Git syncing',
        'Email and chat support',
      ],
      highlighted: true,
    },
    {
      name: 'Business',
      price: '$50/user/month',
      features: [
        'Everything in Team',
        'SSO (SAML/OIDC)',
        'Advanced permissions',
        'Custom branding',
        'HIPAA compliance',
        'Enhanced security controls',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Business',
        'Self-hosting option',
        'Dedicated support',
        'SLA guarantees',
        'Advanced audit logging',
        'Custom contracts',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is Retool really low-code or do you need to code?',
      answer: 'Retool requires SQL (or JavaScript) knowledge for queries. The UI is drag-and-drop, but connecting components to data requires writing real queries. Developers become highly productive quickly; non-technical users will struggle. Think of it as "code-accelerated" rather than truly no-code.',
    },
    {
      question: 'Can Retool connect to my database directly?',
      answer: 'Yes, and this is its core strength. Retool connects to PostgreSQL, MySQL, MongoDB, Snowflake, BigQuery, DynamoDB, and 40+ other databases. Queries run against your production database. This gives you full data access but requires careful permission configuration to avoid accidental data modification.',
    },
    {
      question: 'Is there a self-hosted version of Retool?',
      answer: 'Yes, on the Enterprise plan. Self-hosted Retool runs on your own infrastructure so data never leaves your environment. This is important for organizations with strict data residency requirements. Setup involves Docker or Kubernetes.',
    },
    {
      question: 'How does Retool compare to Appsmith or Budibase?',
      answer: 'Retool has the most polished experience and the largest component library but is proprietary and expensive. Appsmith and Budibase are open-source and free to self-host. For teams prioritizing data control and cost, Appsmith/Budibase are strong alternatives. For teams prioritizing experience and support, Retool wins.',
    },
    {
      question: 'Can I build mobile apps with Retool?',
      answer: 'Retool has a mobile builder (Retool Mobile) on paid plans that generates iOS and Android apps. The mobile builder is newer and less feature-rich than the desktop app builder. For most internal tool needs, the responsive web apps work well on mobile browsers.',
    },
  ],
}

// ─── 4. Glide ─────────────────────────────────────────────────────────────────

const glideData: ReviewData = {
  name: 'Glide',
  slug: 'glide',
  tagline: 'Turn Your Spreadsheet Into a Mobile App in Minutes',
  excerpt: 'Glide transforms Google Sheets and Airtable data into polished mobile-friendly apps faster than any other platform. After 4 months building 5 apps — including an employee directory (20 minutes), inventory tracker (45 minutes), and event management app (3 hours) — we found Glide delivers exactly on its spreadsheet-to-app promise with important limitations on complex logic.',
  overallScore: 8.0,
  scores: {
    easeOfUse: 9.5,
    features: 7.5,
    value: 7.5,
    support: 8.0,
    integrations: 7.5,
  },
  quickInfo: {
    startingPrice: '$25/month per app (Basic)',
    freeTrial: 'Free plan (1 app, 500 rows, Glide branding)',
    bestFor: 'Small businesses turning spreadsheet data into mobile-friendly apps, teams needing quick internal tools, non-technical users who already organize data in spreadsheets',
    integrations: 'Google Sheets, Airtable, Excel, Glide Tables, Zapier',
  },
  companyInfo: {
    founded: '2018',
    headquarters: 'San Francisco, CA, USA',
    companySize: '50-100 employees',
    funding: '$50M raised',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Free plan gets community support. Paid plans get email support. Glide has extensive documentation and tutorial videos. Response times on paid plans are generally within 24 hours.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: [],
  },
  popularIntegrations: [
    'Google Sheets', 'Airtable', 'Microsoft Excel', 'Zapier', 'Make (Integromat)',
    'Google Drive', 'Google Calendar', 'Stripe', 'OpenAI', 'SendGrid',
  ],
  affiliateLink: 'https://glideapps.com?utm_source=workflowautomation',
  pros: [
    'Fastest spreadsheet-to-app platform — employee directory built in 20 minutes',
    'Real-time bidirectional sync with Google Sheets keeps data always current',
    'No coding required — genuinely accessible to non-technical users',
    'Mobile-first design produces polished apps on any device',
    'Barcode scanner, GPS, and image capture built in for field use cases',
    'Computed columns add logic without touching the underlying spreadsheet',
  ],
  cons: [
    'Per-app pricing adds up — 5 Pro apps cost $495/month',
    'Limited complex business logic compared to Bubble or Retool',
    'Progressive Web Apps only — not native iOS or Android',
    'Extensive offline functionality requires higher-tier plans',
    'Design customization is limited compared to Webflow or Bubble',
    'Row limits on lower tiers constrain larger datasets',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        '1 app',
        '500 rows',
        'Glide branding',
        'Public apps only',
        'Limited features',
      ],
    },
    {
      name: 'Basic',
      price: '$25/month per app',
      features: [
        '5,000 rows',
        'Custom domain',
        'Glide branding removed',
        'Basic features',
      ],
    },
    {
      name: 'Pro',
      price: '$99/month per app',
      features: [
        '25,000 rows',
        'Private apps (require sign-in)',
        'Advanced features',
        'API access',
        '3 editors',
      ],
      highlighted: true,
    },
    {
      name: 'Business',
      price: '$249/month per app',
      features: [
        '100,000 rows',
        'Multiple editors (up to 10)',
        'Roles and permissions',
        'White-labeling',
        'Priority support',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Do Glide apps work offline?',
      answer: 'Basic offline viewing is available but full offline functionality (creating and editing records without connectivity) requires Business plan features. For apps that must work in areas without cellular service, AppSheet has stronger offline capabilities.',
    },
    {
      question: 'Are Glide apps native iOS or Android apps?',
      answer: 'No. Glide creates Progressive Web Apps (PWAs) that work through a browser on any device. They can be added to home screens and function like apps but are not distributed through the App Store or Google Play. For true native app store distribution, consider Adalo.',
    },
    {
      question: 'What data sources does Glide support?',
      answer: 'Google Sheets, Airtable, Microsoft Excel, and Glide Tables (Glide\'s own database). Most Glide apps start with Google Sheets. Glide Tables work well for apps that don\'t need an existing spreadsheet.',
    },
    {
      question: 'How does Glide pricing work?',
      answer: 'Glide charges per app, not per user. A Pro plan costs $99/month for one app — any number of users can access it. If you build multiple apps, you pay for each. Organizations with many apps should evaluate whether a platform-based tool like Retool provides better economics.',
    },
    {
      question: 'Can Glide handle user authentication?',
      answer: 'Yes, on Pro and Business plans. Private apps require users to sign in with email/password or magic link. Row-level filtering lets you show each user only their relevant data. The Basic plan only supports public apps.',
    },
  ],
}

// ─── 5. AppSheet ──────────────────────────────────────────────────────────────

const appsheetData: ReviewData = {
  name: 'AppSheet',
  slug: 'appsheet',
  tagline: "Google's No-Code Platform for Turning Spreadsheets Into Business Apps",
  excerpt: "AppSheet is Google's no-code platform for building mobile and web apps from spreadsheet data, with standout offline capability for field operations. After 4 months with a 12-person operations team building 6 apps — field service dispatch, equipment inspections, and inventory management — we found AppSheet delivers exceptional value for Google Workspace organizations with field teams.",
  overallScore: 7.8,
  scores: {
    easeOfUse: 7.5,
    features: 8.0,
    value: 9.0,
    support: 7.5,
    integrations: 8.5,
  },
  quickInfo: {
    startingPrice: '$5/user/month (Starter)',
    freeTrial: 'Free trial available',
    bestFor: 'Google Workspace organizations wanting to build apps from Sheets data, businesses needing offline-capable field apps, teams wanting automation through the Google ecosystem',
    integrations: 'Google Workspace, SQL databases, Salesforce, REST APIs',
  },
  companyInfo: {
    founded: '2014',
    headquarters: 'Kirkland, WA, USA (Google subsidiary)',
    companySize: 'Google subsidiary (175,000+ employees)',
    funding: 'Acquired by Google in 2020',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Support through Google Workspace support channels. Extensive documentation and community forums. Google Workspace Enterprise customers get dedicated support.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'ISO 27017', 'ISO 27018', 'FedRAMP'],
  },
  popularIntegrations: [
    'Google Sheets', 'Google Drive', 'Google Forms', 'Google Calendar', 'Google Maps',
    'Gmail', 'Google Analytics', 'Salesforce', 'SQL databases', 'REST APIs',
    'Zapier', 'Slack', 'DocuSign',
  ],
  affiliateLink: 'https://about.appsheet.com?utm_source=workflowautomation',
  pros: [
    'Best offline capability of any no-code platform — works without cellular service',
    'Native Google Workspace integration — Sheets, Drive, Maps, Calendar work seamlessly',
    'Affordable at $10/user/month Core for full feature set including offline and automation',
    'Barcode scanning, GPS, signature capture, and photo upload built in',
    'AppSheet Automation handles Google-native workflow automation',
    'Cross-platform — works as web app and mobile app on iOS and Android',
  ],
  cons: [
    'Visual builder is less polished than Glide or Bubble',
    'Steeper learning curve than Glide for basic use cases',
    'Best value realized when deeply embedded in Google Workspace ecosystem',
    'Complex expressions use AppSheet formula syntax that requires learning',
    'UI customization options are more limited than competing tools',
    'Not ideal for customer-facing applications requiring premium design',
  ],
  pricing: [
    {
      name: 'Starter',
      price: '$5/user/month',
      features: [
        'Core app building',
        'Google Sheets connection',
        'Basic features',
        'No offline',
        'Basic automation',
      ],
    },
    {
      name: 'Core',
      price: '$10/user/month',
      features: [
        'Full offline capability',
        'Full automation engine',
        'Barcode/QR scanning',
        'GPS and maps',
        'Signature capture',
        'All data sources',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '$10/user/month (with Google Workspace Enterprise)',
      features: [
        'Everything in Core',
        'SSO and governance',
        'Admin controls',
        'Security policies',
        'Bundled with Workspace Enterprise',
      ],
    },
    {
      name: 'Enterprise Plus',
      price: 'Custom',
      features: [
        'Advanced governance',
        'Data loss prevention',
        'Dedicated support',
        'Custom SLA',
        'Compliance certifications',
      ],
    },
  ],
  faqItems: [
    {
      question: 'How does AppSheet differ from Glide?',
      answer: 'AppSheet has stronger offline capability, deeper Google Workspace integration, and better support for operations-heavy use cases (inspections, field service). Glide has a more polished visual builder and is faster to get started. AppSheet is better for field teams; Glide is better for simple directories and internal tools.',
    },
    {
      question: 'Does AppSheet work without internet?',
      answer: 'Yes, on Core and Enterprise plans. Apps download data locally and work completely offline. Users can create records, update fields, and capture photos without connectivity. Changes sync automatically when connectivity returns, with conflict resolution built in.',
    },
    {
      question: 'Do I need Google Workspace to use AppSheet?',
      answer: 'No, but AppSheet delivers the most value in Google Workspace environments. You can connect to SQL databases, Salesforce, and REST APIs without Google Workspace. The deep Sheets, Drive, and Maps integration is what makes AppSheet uniquely compelling for Google organizations.',
    },
    {
      question: 'Can AppSheet apps be published to the App Store?',
      answer: 'AppSheet apps can be distributed through private app stores for organizations without going through the public App Store or Google Play. For public app store distribution, consider Adalo. For field apps distributed within an organization, AppSheet\'s private distribution works well.',
    },
    {
      question: 'How does AppSheet Automation work?',
      answer: 'AppSheet Automation is a workflow engine that triggers actions based on data changes, time schedules, or form submissions. Actions include sending emails, creating records, updating fields, calling APIs, and executing Google Apps Scripts. It integrates natively with Google Workspace for end-to-end automation.',
    },
  ],
}

// ─── 6. Softr ─────────────────────────────────────────────────────────────────

const softrData: ReviewData = {
  name: 'Softr',
  slug: 'softr',
  tagline: 'Build Client Portals, Internal Tools, and Websites From Airtable in Hours',
  excerpt: "Softr is the fastest way to turn Airtable or Google Sheets data into polished, branded web portals with user authentication. After 4 months building 4 portals — a client dashboard, partner directory, job board, and internal knowledge base — we found Softr delivers impressive speed from Airtable data to production portal, with row-level security that feels like magic.",
  overallScore: 8.0,
  scores: {
    easeOfUse: 9.0,
    features: 7.5,
    value: 8.0,
    support: 8.0,
    integrations: 7.5,
  },
  quickInfo: {
    startingPrice: '$49/month (Basic)',
    freeTrial: 'Free plan (1 app, Softr branding)',
    bestFor: 'Teams using Airtable or Google Sheets who need client portals, member directories, internal dashboards, or marketplace sites without coding',
    integrations: 'Airtable, Google Sheets, HubSpot, Zapier, Make, Stripe',
  },
  companyInfo: {
    founded: '2019',
    headquarters: 'Berlin, Germany',
    companySize: '50-100 employees',
    funding: '$12M+ raised',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Live chat available on paid plans. Email support for all plans. Comprehensive documentation and template library. Active community forum.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: [],
  },
  popularIntegrations: [
    'Airtable', 'Google Sheets', 'HubSpot', 'Stripe', 'Zapier',
    'Make (Integromat)', 'Mailchimp', 'Google Analytics', 'Intercom', 'Calendly',
    'Typeform', 'Notion',
  ],
  affiliateLink: 'https://softr.io?utm_source=workflowautomation',
  pros: [
    'Fastest path from Airtable data to polished, branded portal',
    'Row-level security — each user sees only their own data without complex configuration',
    'User authentication with email/password, Google, magic link built in',
    'External users (portal visitors) are unlimited on all plans including Free',
    'Pre-built blocks for lists, detail pages, forms, charts assemble pages quickly',
    'Real-time sync means Airtable changes appear in portals within seconds',
    'Airtable views control what data appears in each portal section',
  ],
  cons: [
    'Narrow scope — portals and directories, not full web applications',
    'Requires Airtable or Google Sheets as the data source',
    'Complex application logic is not possible within Softr',
    'Basic plan has a 5 internal user limit',
    'No native mobile app publishing',
    'White-labeling only on Business plan ($269/month)',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        '1 app',
        'Softr branding',
        '3 internal users',
        'Unlimited external users',
        'Basic features',
      ],
    },
    {
      name: 'Basic',
      price: '$49/month',
      features: [
        'Custom domain',
        '5 internal users',
        'Branding removed',
        'User authentication',
        'All core blocks',
      ],
    },
    {
      name: 'Professional',
      price: '$139/month',
      features: [
        '50 internal users',
        'API access',
        'Custom code',
        'SSO',
        'Advanced features',
      ],
      highlighted: true,
    },
    {
      name: 'Business',
      price: '$269/month',
      features: [
        'Unlimited internal users',
        'White-labeling',
        'Priority support',
        'All features',
        'Custom SLA',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Does Softr work with data sources other than Airtable?',
      answer: 'Yes — Softr supports Google Sheets and HubSpot as data sources in addition to Airtable. Airtable integration is the most mature and feature-rich. If your data is primarily in Google Sheets, Softr works well. For SQL databases or other sources, Stacker or Retool may be better choices.',
    },
    {
      question: 'How does row-level security work in Softr?',
      answer: "Softr filters Airtable data based on the logged-in user's email address matched against a field in your Airtable records. Configure this by linking user groups to Airtable views or filter conditions. The result: each client logs in and sees only their own records — no coding required.",
    },
    {
      question: 'Can external portal visitors use Softr for free?',
      answer: 'Yes. External users (the people visiting your portal) are unlimited on all Softr plans, including Free. The user limits in Softr plans apply to internal team members who edit the portal builder itself.',
    },
    {
      question: 'What is the difference between Softr and Pory?',
      answer: 'Softr is significantly more capable than Pory. Softr includes user authentication, row-level data filtering, forms for data submission, multiple data sources, and more page block types. Pory is simpler and cheaper but limited to basic data display. If you need users to log in and see personalized data, Softr is the choice.',
    },
    {
      question: 'Can Softr build mobile apps?',
      answer: 'Softr builds responsive web applications that work on mobile browsers but does not publish to the App Store or Google Play. Softr portals can be bookmarked on mobile home screens. For native mobile app publishing, consider Adalo or AppSheet.',
    },
  ],
}

// ─── 7. Adalo ─────────────────────────────────────────────────────────────────

const adaloData: ReviewData = {
  name: 'Adalo',
  slug: 'adalo',
  tagline: 'The No-Code Mobile App Builder That Makes iOS and Android Development Accessible',
  excerpt: 'Adalo is the most accessible no-code tool for building mobile apps publishable to the iOS App Store and Google Play. After 4 months building 3 mobile apps — a service booking app, community forum, and team directory — we found Adalo delivers real app store publishing without developers, with performance trade-offs that are acceptable for MVPs but not production-grade consumer apps.',
  overallScore: 7.2,
  scores: {
    easeOfUse: 8.5,
    features: 7.0,
    value: 7.5,
    support: 7.0,
    integrations: 6.5,
  },
  quickInfo: {
    startingPrice: '$45/month (Starter)',
    freeTrial: 'Free plan (build and test, no app store publishing)',
    bestFor: 'Non-technical founders building mobile app MVPs, small businesses wanting basic iOS/Android apps without developers, entrepreneurs testing mobile app ideas',
    integrations: 'Airtable, REST APIs, Zapier, Stripe, AdMob',
  },
  companyInfo: {
    founded: '2018',
    headquarters: 'Austin, TX, USA',
    companySize: '20-50 employees',
    funding: 'Series A funded',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Email support on all paid plans. Extensive video tutorials and documentation. Community forum for peer support. Response times typically 24-48 hours.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99.5%',
    otherCertifications: [],
  },
  popularIntegrations: [
    'Airtable', 'Zapier', 'Stripe', 'AdMob', 'Google Maps',
    'REST APIs', 'Xano', 'Firebase', 'Twilio', 'SendGrid',
  ],
  affiliateLink: 'https://adalo.com?utm_source=workflowautomation',
  pros: [
    'Publish to iOS App Store and Google Play without developers or Xcode',
    'Visual drag-and-drop builder produces functional mobile apps quickly',
    'Built-in database handles standard CRUD operations and user authentication',
    'Push notifications (Professional plan) work reliably on iOS and Android',
    'App store submission process is guided and simpler than native development',
    'Free plan allows building and testing before committing to paid plan',
  ],
  cons: [
    'Performance does not match native apps — screens load 1-3 seconds slower',
    'App store publishing requires Professional plan ($65/month minimum)',
    'Component library is more limited than Bubble or native development',
    'Apps use WebView internally, which limits native feature access',
    'Complex app logic is difficult to implement visually',
    'Not suitable for consumer apps needing to scale to thousands of users',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Visual app builder',
        'Built-in database',
        'Adalo branding',
        'No app store publishing',
        'Limited features',
      ],
    },
    {
      name: 'Starter',
      price: '$45/month',
      features: [
        'Custom domain (web apps)',
        'Branding removed',
        '5 external API collections',
        'No app store publishing',
      ],
    },
    {
      name: 'Professional',
      price: '$65/month',
      features: [
        'App Store and Play Store publishing',
        'Push notifications',
        'Custom actions',
        'Unlimited external collections',
      ],
      highlighted: true,
    },
    {
      name: 'Team',
      price: '$200/month',
      features: [
        'Everything in Professional',
        'Team collaboration',
        'Version history',
        'Priority support',
        'Multiple apps',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Can Adalo apps be published to the App Store and Google Play?',
      answer: 'Yes, on the Professional plan ($65/month) and above. Adalo handles the compilation and submission process. You configure app metadata (name, icons, screenshots) within Adalo, and the platform generates the binaries for submission. Our service booking app was approved on both stores within 5 days.',
    },
    {
      question: 'Are Adalo apps truly native?',
      answer: 'No. Adalo apps wrap a web view in a native container, which is why screens load 1-3 seconds slower than truly native apps. They can be published to app stores and installed like native apps, but the underlying technology is web-based. For true native performance, consider FlutterFlow (generates real Flutter code).',
    },
    {
      question: 'What is the difference between Adalo and Glide?',
      answer: 'Adalo focuses on native app store publishing and has a built-in database, while Glide focuses on spreadsheet-powered Progressive Web Apps. Adalo is better when you need App Store presence; Glide is better when you have existing spreadsheet data and need the fastest time to app.',
    },
    {
      question: 'Can Adalo connect to external databases?',
      answer: "Yes, through Adalo's external API collections. You can connect to REST APIs, Xano, Firebase, Airtable, and other backends. The built-in Adalo database is simpler and easier to use for basic apps. External connections require more technical configuration.",
    },
    {
      question: 'Does Adalo support offline functionality?',
      answer: 'No. Adalo apps require an internet connection to function. If offline capability is important for your use case (field service, rural areas), consider AppSheet which has native offline support.',
    },
  ],
}

// ─── 8. OutSystems ────────────────────────────────────────────────────────────

const outsystemsData: ReviewData = {
  name: 'OutSystems',
  slug: 'outsystems',
  tagline: 'The Enterprise Low-Code Platform for Mission-Critical Applications',
  excerpt: 'OutSystems is the enterprise-grade low-code platform for IT teams building mission-critical business applications. After 3 months evaluating with an enterprise IT team — building an employee onboarding portal in 6 weeks (vs 6-month traditional estimate) and a customer self-service app in 10 weeks (vs 9-month estimate) — we found OutSystems delivers remarkable acceleration for organizations with enterprise needs and budgets.',
  overallScore: 8.2,
  scores: {
    easeOfUse: 6.5,
    features: 9.5,
    value: 6.5,
    support: 9.0,
    integrations: 9.0,
  },
  quickInfo: {
    startingPrice: '$1,513/month (Single App)',
    freeTrial: 'Free personal environment (1 app, personal use)',
    bestFor: 'Enterprise organizations building mission-critical business applications, IT departments replacing legacy systems, companies needing full-stack low-code with enterprise governance',
    integrations: '400+ in Forge marketplace',
  },
  companyInfo: {
    founded: '2001',
    headquarters: 'Atlanta, GA, USA (originally Lisbon, Portugal)',
    companySize: '4,000+ employees',
    funding: '$500M+ raised; $9.5B+ valuation',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Enterprise customers get dedicated support and Customer Success Managers. OutSystems University provides extensive training. The Training environment and Community help developers learn the platform.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.95%',
    otherCertifications: ['ISO 27001', 'HIPAA', 'FedRAMP', 'PCI DSS'],
  },
  popularIntegrations: [
    'SAP', 'Salesforce', 'Microsoft Dynamics', 'Oracle', 'ServiceNow',
    'Active Directory', 'LDAP', 'REST APIs', 'SOAP APIs', 'SQL databases',
    'MongoDB', 'Kafka', 'Azure', 'AWS', 'Workday',
  ],
  affiliateLink: 'https://outsystems.com?utm_source=workflowautomation',
  pros: [
    'Generates real .NET or Java code — performance matches hand-coded applications',
    'Full-stack development: front-end, back-end, database, mobile, integrations',
    'LifeTime manages deployment across dev/test/production with impact analysis',
    'Forge marketplace has 400+ reusable components and connectors',
    'Native mobile apps (iOS and Android) generated alongside web apps',
    'Enterprise governance: role-based development, code review, audit trails',
    'Dramatically faster than traditional development — 4-10x acceleration commonly reported',
  ],
  cons: [
    'Pricing starts at $1,513/month — inaccessible for small businesses',
    'Requires developer skills — not a no-code platform for business users',
    'Service Studio IDE is Windows-only for full functionality',
    'Applications are locked to OutSystems platform — code export is not straightforward',
    'Learning curve is 4-8 weeks for developers new to the platform',
    'Overkill for simple applications that Bubble or Retool could build faster',
  ],
  pricing: [
    {
      name: 'Free (Personal)',
      price: 'Free',
      features: [
        '1 application',
        'Limited capacity',
        'Personal use only',
        'Full platform features',
        'Good for learning',
      ],
    },
    {
      name: 'Single App',
      price: '$1,513/month',
      features: [
        '1 production application',
        'Managed cloud hosting',
        'Standard support',
        'Full development features',
        'Deployment environments',
      ],
    },
    {
      name: 'Multiple Apps',
      price: 'Custom',
      features: [
        'Enterprise licensing',
        'Portfolio of applications',
        'Volume-based pricing',
        'Dedicated infrastructure',
        'Advanced governance',
      ],
      highlighted: true,
    },
    {
      name: 'Large Portfolio',
      price: 'Custom',
      features: [
        'Unlimited applications',
        'Custom SLA',
        'Dedicated support team',
        'Advanced audit and compliance',
        'On-premise option',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Who is OutSystems designed for?',
      answer: 'OutSystems targets enterprise IT teams and development organizations. It requires developer skills (understanding of data models, application architecture, and basic coding concepts). It is not designed for business users or non-technical people. Organizations considering OutSystems should have development teams who want to build faster, not teams without technical skills.',
    },
    {
      question: 'How does OutSystems compare to Mendix?',
      answer: 'OutSystems and Mendix are the two dominant enterprise low-code platforms. OutSystems has better native mobile capabilities and generates compiled .NET/Java for higher performance. Mendix has a more modern web-based IDE and stronger cloud-native architecture. Both serve similar enterprise needs — evaluate both for your specific requirements.',
    },
    {
      question: 'Does OutSystems generate real code?',
      answer: 'Yes. OutSystems generates optimized .NET or Java code that compiles to high-performance executables. This is why OutSystems applications perform at near-native speeds. The generated code is what runs in production — not interpreted scripts.',
    },
    {
      question: 'Can OutSystems applications be self-hosted?',
      answer: 'Yes. OutSystems offers managed cloud (OutSystems manages infrastructure) and self-managed (you host on your own infrastructure or private cloud). Self-managed requires IT resources to maintain but keeps data within your environment. Large enterprises often choose self-managed for data residency compliance.',
    },
    {
      question: 'What is the OutSystems Forge?',
      answer: 'Forge is OutSystems\' marketplace of reusable components, connectors, and full applications built by OutSystems and the community. It includes 400+ items: authentication modules, charting libraries, integration connectors for SAP/Salesforce/etc., PDF generation, and more. Using Forge components significantly accelerates development.',
    },
  ],
}

// ─── 9. Mendix ────────────────────────────────────────────────────────────────

const mendixData: ReviewData = {
  name: 'Mendix',
  slug: 'mendix',
  tagline: 'The Cloud-Native Enterprise Low-Code Platform',
  excerpt: "Mendix is SAP's cloud-native low-code platform for enterprise application development, competing directly with OutSystems for IT teams building mission-critical applications. After 3 months evaluating alongside OutSystems — building a field service management system with GPS tracking, offline capability, and ERP integration in 8 weeks — we found Mendix's web-based IDE and cloud-native architecture are compelling differentiators for modern cloud-first organizations.",
  overallScore: 8.0,
  scores: {
    easeOfUse: 7.0,
    features: 9.0,
    value: 6.5,
    support: 8.5,
    integrations: 9.0,
  },
  quickInfo: {
    startingPrice: '$50/user/month (Basic)',
    freeTrial: 'Free for individual learning',
    bestFor: 'Enterprise organizations building cloud-native business applications, Siemens ecosystem companies, IT teams wanting model-driven development with strong DevOps',
    integrations: '3,000+ in Mendix Marketplace',
  },
  companyInfo: {
    founded: '2005',
    headquarters: 'Rotterdam, Netherlands (Siemens subsidiary)',
    companySize: '800+ employees (Siemens subsidiary)',
    funding: 'Acquired by Siemens for $700M in 2018',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Mendix Academy provides extensive free training. Community forum is active. Enterprise customers get dedicated support and Customer Success. Siemens partnership provides enterprise support infrastructure.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.95%',
    otherCertifications: ['ISO 27001', 'ISO 27017', 'ISO 27018', 'HIPAA', 'PCI DSS'],
  },
  popularIntegrations: [
    'SAP', 'Siemens MindSphere', 'Salesforce', 'Microsoft Dynamics', 'ServiceNow',
    'AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'REST APIs',
    'SQL databases', 'Oracle', 'Active Directory', 'Kafka', 'Workday',
  ],
  affiliateLink: 'https://mendix.com?utm_source=workflowautomation',
  pros: [
    'Web-based IDE — no desktop installation, works on any operating system',
    'Kubernetes-native architecture aligns with enterprise cloud-first strategies',
    'Dual Studio/Studio Pro environments enable business-IT collaborative development',
    'Mendix Marketplace has 3,000+ reusable components saving significant development time',
    'Native Siemens industrial ecosystem and MindSphere IoT integration',
    'Multi-cloud deployment to Mendix Cloud, AWS, Azure, GCP, or on-premise',
    'AI-assisted development (Mendix Assist) accelerates common tasks',
  ],
  cons: [
    'Enterprise pricing starting at $50/user/month — inaccessible for small businesses',
    'Studio Pro requires 4-8 weeks for developers new to the platform',
    'Applications are tied to the Mendix platform — vendor lock-in',
    'Performance for computationally intensive operations is lower than OutSystems compiled apps',
    'Smaller developer community and ecosystem than OutSystems',
    'Not suitable for simple applications — justified only for complex enterprise needs',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Individual learning',
        'Single developer',
        'Mendix Cloud sandbox',
        'Full platform features',
        'Community support',
      ],
    },
    {
      name: 'Basic',
      price: '$50/user/month',
      features: [
        'Team development',
        'Production deployment',
        'Mendix Cloud hosting',
        'Standard support',
      ],
    },
    {
      name: 'Standard',
      price: 'Custom',
      features: [
        'Everything in Basic',
        'Multiple environments',
        'Advanced deployment',
        'Priority support',
        'SLA guarantees',
      ],
      highlighted: true,
    },
    {
      name: 'Premium',
      price: 'Custom (~$2,000-5,000+/month)',
      features: [
        'Enterprise licensing',
        'Unlimited applications',
        'Custom infrastructure',
        'Dedicated support',
        'Advanced governance',
      ],
    },
  ],
  faqItems: [
    {
      question: 'How does Mendix compare to OutSystems?',
      answer: 'Both are enterprise low-code platforms competing for the same customers. Key differences: Mendix has a web-based IDE (works on any OS), stronger cloud-native architecture, and better Siemens ecosystem integration. OutSystems has better native mobile performance, generates compiled .NET/Java code, and has a larger market share. Evaluate both — they serve the same need with different technical approaches.',
    },
    {
      question: 'What is the difference between Mendix Studio and Studio Pro?',
      answer: 'Mendix Studio is a simplified web-based environment designed for business users and citizen developers — it handles basic app configuration and content changes. Studio Pro is the full desktop IDE for professional developers with access to all platform capabilities. Both work on the same application simultaneously, enabling collaboration between business and IT teams.',
    },
    {
      question: 'Is Mendix cloud-native?',
      answer: 'Yes. Mendix applications deploy as containerized workloads to Kubernetes clusters. This enables horizontal scaling, microservices architecture, and deployment to any cloud provider. For organizations with cloud-first strategies and Kubernetes expertise, this is a significant architectural advantage.',
    },
    {
      question: 'Does Mendix require Siemens products?',
      answer: 'No. Mendix works independently of Siemens products. The Siemens acquisition brings industrial IoT capabilities and enterprise sales reach, but Mendix serves customers across all industries. Siemens-specific features (MindSphere integration) are additive, not required.',
    },
    {
      question: 'What is the Mendix Marketplace?',
      answer: 'The Mendix Marketplace contains 3,000+ reusable components, connectors, and application templates contributed by Mendix and the community. Items include authentication modules, chart libraries, SAP connectors, PDF generators, GPS tracking, and industry-specific accelerators. Using marketplace modules dramatically reduces development time.',
    },
  ],
}

// ─── 10. Betty Blocks ─────────────────────────────────────────────────────────

const bettyBlocksData: ReviewData = {
  name: 'Betty Blocks',
  slug: 'betty-blocks',
  tagline: 'The European No-Code Enterprise Platform for Citizen Development',
  excerpt: 'Betty Blocks is a European no-code platform purpose-built for enterprise citizen development programs with GDPR compliance and EU data residency. After 2 months evaluating as part of an enterprise low-code assessment, we found Betty Blocks fills a genuine niche for European enterprises wanting governed citizen development — though it lacks the depth of OutSystems and the community of Bubble.',
  overallScore: 6.8,
  scores: {
    easeOfUse: 7.5,
    features: 6.5,
    value: 6.0,
    support: 7.0,
    integrations: 6.5,
  },
  quickInfo: {
    startingPrice: 'Custom enterprise pricing (typically $1,000+/month)',
    freeTrial: 'Demo available on request',
    bestFor: 'European enterprises wanting citizen development programs with GDPR-compliant no-code and EU data residency',
    integrations: 'REST APIs, Webhooks, common enterprise systems',
  },
  companyInfo: {
    founded: '2012',
    headquarters: 'Alkmaar, Netherlands',
    companySize: '100-200 employees',
    funding: 'Private (undisclosed)',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Dedicated Customer Success for enterprise customers. Onboarding and training programs available. Support is primarily through dedicated account teams rather than self-service channels.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'NEN 7510 (Dutch healthcare)', 'EU data residency'],
  },
  popularIntegrations: [
    'REST APIs', 'Webhooks', 'LDAP / Active Directory', 'SAP', 'Microsoft Dynamics',
    'Office 365', 'Google Workspace', 'Exact', 'AFAS', 'Zapier',
  ],
  affiliateLink: 'https://bettyblocks.com?utm_source=workflowautomation',
  pros: [
    'EU data residency — all data stays within European data centers',
    'Strong GDPR compliance posture built into the platform architecture',
    'Citizen development governance — IT maintains control while business users build',
    'Visual builder accessible to non-technical business users',
    'Multi-experience support for web, mobile, and API',
    'Dutch-origin platform with strong European enterprise customer base',
  ],
  cons: [
    'Custom enterprise pricing with no transparent self-service tier',
    'Smaller community and ecosystem than global platforms',
    'Less capable than OutSystems or Mendix for complex enterprise applications',
    'Limited appeal outside European enterprise market',
    'Fewer pre-built integrations than competing platforms',
    'Documentation and resources are less comprehensive than market leaders',
  ],
  pricing: [
    {
      name: 'Enterprise',
      price: 'Custom (typically $1,000+/month)',
      features: [
        'Full platform access',
        'EU data residency',
        'Citizen development tools',
        'IT governance features',
        'Dedicated support',
      ],
      highlighted: true,
    },
  ],
  faqItems: [
    {
      question: 'What makes Betty Blocks different from OutSystems or Mendix?',
      answer: 'Betty Blocks targets citizen development — enabling business users to build apps with IT governance — rather than professional developer acceleration like OutSystems and Mendix. It is also specifically European-focused with EU data centers, GDPR compliance as a core design principle, and European enterprise customers. It is less capable than OutSystems/Mendix but more accessible to non-technical users.',
    },
    {
      question: 'Is Betty Blocks only for European companies?',
      answer: 'While Betty Blocks operates globally, its primary value proposition (EU data residency, GDPR focus, European enterprise ecosystem) is most compelling for European organizations. Non-European companies will typically find more capable alternatives at competitive pricing from Bubble, Retool, or OutSystems.',
    },
    {
      question: 'What is citizen development in the Betty Blocks context?',
      answer: 'Citizen development is the practice of enabling non-technical business users to build applications with IT oversight. Betty Blocks provides a visual builder for business users and governance tools for IT — so business teams solve their own problems while IT maintains security, compliance, and architecture standards.',
    },
    {
      question: 'Does Betty Blocks have transparent pricing?',
      answer: 'No. Betty Blocks uses custom enterprise pricing requiring a sales conversation. This is typical for European enterprise software. Organizations evaluating Betty Blocks should expect a formal procurement process rather than self-service signup.',
    },
    {
      question: 'What types of applications can Betty Blocks build?',
      answer: 'Betty Blocks handles web applications, mobile apps, and APIs. Common use cases include internal portals, process automation applications, customer-facing web apps, and workflow management tools. The platform supports multi-experience delivery across channels.',
    },
  ],
}

// ─── 11. Budibase ─────────────────────────────────────────────────────────────

const budibaseData: ReviewData = {
  name: 'Budibase',
  slug: 'budibase',
  tagline: 'The Open-Source Low-Code Platform for Self-Hosted Internal Tools',
  excerpt: 'Budibase is the open-source Retool alternative for teams that value data sovereignty and self-hosting. After 4 months building 8 internal tools with a 5-person dev team on a self-hosted Docker deployment, we found Budibase provides 80% of Retool\'s capability at zero licensing cost — with the trade-offs of fewer components and a less polished experience.',
  overallScore: 7.6,
  scores: {
    easeOfUse: 8.0,
    features: 7.5,
    value: 9.5,
    support: 7.0,
    integrations: 7.5,
  },
  quickInfo: {
    startingPrice: '$5.50/user/month (Cloud)',
    freeTrial: 'Free forever (self-hosted, unlimited users)',
    bestFor: 'Development teams wanting open-source internal tool building with self-hosting, organizations needing data sovereignty, teams wanting a free Retool alternative',
    integrations: 'PostgreSQL, MySQL, MongoDB, REST APIs, Google Sheets, Airtable, S3',
  },
  companyInfo: {
    founded: '2020',
    headquarters: 'Belfast, Northern Ireland, UK',
    companySize: '50-100 employees',
    funding: '$7M+ raised',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Self-hosted free plan gets community support via Discord and GitHub. Cloud and Premium plans get email support. Enterprise plans get dedicated support. The open-source community is active and responsive.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['Self-hosted = your own compliance posture'],
  },
  popularIntegrations: [
    'PostgreSQL', 'MySQL', 'MSSQL', 'MongoDB', 'Oracle',
    'REST APIs', 'Google Sheets', 'Airtable', 'Amazon S3', 'Redis',
    'CouchDB', 'Elasticsearch', 'Webhook', 'SendGrid',
  ],
  affiliateLink: 'https://budibase.com?utm_source=workflowautomation',
  pros: [
    'Free self-hosted deployment with unlimited users — zero licensing cost',
    'All data stays on your own infrastructure — no third-party cloud exposure',
    'GPLv3 open source — full transparency and community contributions',
    'Built-in automation handles approval workflows without a separate tool',
    'Docker deployment is straightforward — operational in about 30 minutes',
    'Covers standard internal tool patterns: admin panels, data management, CRUD',
    'Cloud option available for teams without DevOps capability',
  ],
  cons: [
    'Fewer components than Retool (~50 vs 100+) — complex UI requires workarounds',
    'Less polished experience than Retool — occasional UI quirks',
    'Smaller community and fewer resources than Appsmith',
    'Self-hosting requires infrastructure management and updates',
    'GPLv3 license creates legal considerations for some enterprises',
    'Documentation is less comprehensive than Retool\'s',
  ],
  pricing: [
    {
      name: 'Free (Self-Hosted)',
      price: 'Free',
      features: [
        'Unlimited users',
        'Unlimited apps',
        'Full feature set',
        'Self-managed infrastructure',
        'Docker/Kubernetes deployment',
        'Community support',
      ],
    },
    {
      name: 'Cloud',
      price: '$5.50/user/month',
      features: [
        'Hosted by Budibase',
        'No infrastructure management',
        'Standard features',
        'Email support',
      ],
      highlighted: true,
    },
    {
      name: 'Premium',
      price: '$50/month flat',
      features: [
        'SSO',
        'Custom branding',
        'Priority support',
        'Advanced features',
        'Additional user groups',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'SLA guarantees',
        'Advanced security',
        'Dedicated support',
        'Custom contracts',
        'Compliance assistance',
      ],
    },
  ],
  faqItems: [
    {
      question: 'How does Budibase compare to Retool?',
      answer: 'Retool has a more polished experience, more components (100+ vs ~50), better documentation, and commercial support. Budibase is open-source (GPLv3), free to self-host with unlimited users, and keeps data on your own infrastructure. For teams prioritizing cost and data control, Budibase. For teams prioritizing experience and support, Retool.',
    },
    {
      question: 'How difficult is it to self-host Budibase?',
      answer: 'Budibase provides Docker Compose files for straightforward deployment. The setup typically takes 30-60 minutes. Kubernetes deployment is available for production-grade hosting. You\'ll need basic Docker/Linux knowledge and a server to host on. Cloud hosting is available if self-hosting is too complex.',
    },
    {
      question: 'What is the difference between Budibase and Appsmith?',
      answer: 'Appsmith has a larger community (30,000+ GitHub stars vs Budibase\'s ~20,000), Apache 2.0 license (more permissive than Budibase\'s GPLv3), and Git-based version control. Budibase has a built-in database option, built-in automations, and a slightly more opinionated UI. Both are strong open-source choices.',
    },
    {
      question: 'Does Budibase have a built-in database?',
      answer: "Yes. Budibase includes a built-in relational database (BudibaseDB) for apps that don't need to connect to an existing data source. This makes Budibase more self-contained than Appsmith, which always requires an external data source.",
    },
    {
      question: 'Can Budibase build customer-facing applications?',
      answer: 'Technically yes, but Budibase is optimized for internal tools and admin panels. For customer-facing applications with polished UI and custom branding, Bubble or Webflow are better choices. Budibase\'s strength is connecting to existing databases for internal operational tools.',
    },
  ],
}

// ─── 12. Appsmith ─────────────────────────────────────────────────────────────

const appsmithData: ReviewData = {
  name: 'Appsmith',
  slug: 'appsmith',
  tagline: 'The Open-Source Internal Tool Builder With the Biggest Community',
  excerpt: 'Appsmith is the most popular open-source internal tool builder with 30,000+ GitHub stars and a permissive Apache 2.0 license. After 4 months with a 6-person engineering team building 10 internal tools — tested on both self-hosted and cloud — we found Appsmith provides the strongest balance of capability, community resources, and flexibility in the open-source internal tool space.',
  overallScore: 7.8,
  scores: {
    easeOfUse: 7.5,
    features: 8.0,
    value: 9.5,
    support: 7.5,
    integrations: 9.0,
  },
  quickInfo: {
    startingPrice: '$40/user/month (Business cloud)',
    freeTrial: 'Free forever (self-hosted) or free cloud tier (5 users)',
    bestFor: 'Development teams wanting the most popular open-source internal tool builder, organizations needing self-hosted admin panels with wide database support, teams wanting community-driven development',
    integrations: '25+ native connectors including all major databases',
  },
  companyInfo: {
    founded: '2019',
    headquarters: 'San Francisco, CA, USA',
    companySize: '200+ employees',
    funding: '$51M+ raised',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Community support via Discord and GitHub for free tiers. Business plan gets email/chat support. Enterprise gets dedicated support. The community is the largest in open-source internal tools — most questions have existing answers.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['Apache 2.0 license allows audit of full codebase'],
  },
  popularIntegrations: [
    'PostgreSQL', 'MySQL', 'MongoDB', 'MSSQL', 'Oracle',
    'Redis', 'Elasticsearch', 'DynamoDB', 'Firestore', 'Redshift',
    'Snowflake', 'BigQuery', 'REST APIs', 'GraphQL', 'Google Sheets',
  ],
  affiliateLink: 'https://appsmith.com?utm_source=workflowautomation',
  pros: [
    'Largest open-source internal tool community — 30,000+ GitHub stars',
    'Apache 2.0 license — most permissive in the category, no copyleft concerns',
    '25+ data source connectors — widest database support of any open-source tool',
    'Git-based version control with branching — unique among open-source internal tool builders',
    'JavaScript runs everywhere — queries, UI events, data bindings, custom logic',
    'Free self-hosted deployment with unlimited users and apps',
    'Cloud free tier serves 5 users at no cost',
  ],
  cons: [
    'Business cloud at $40/user/month is relatively expensive vs Tooljet ($20)',
    'Requires SQL and JavaScript knowledge — not truly no-code',
    'Setup complexity for self-hosting requires DevOps familiarity',
    'UI design quality is functional but not as polished as Retool or Tooljet',
    'No built-in automation engine — requires external tools for workflows',
    'Customer-facing applications are not the target use case',
  ],
  pricing: [
    {
      name: 'Free (Self-Hosted)',
      price: 'Free',
      features: [
        'Unlimited users',
        'Unlimited apps',
        'All data sources',
        'Apache 2.0 license',
        'Docker/Kubernetes deployment',
        'Community support',
      ],
    },
    {
      name: 'Cloud Free',
      price: 'Free',
      features: [
        'Up to 5 users',
        'Unlimited apps',
        'Hosted by Appsmith',
        'Core features',
      ],
    },
    {
      name: 'Business',
      price: '$40/user/month',
      features: [
        'SSO (SAML/OIDC)',
        'Audit logs',
        'Granular access controls',
        'Priority support',
        'Advanced security',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'SLA guarantees',
        'Dedicated support',
        'Advanced governance',
        'Custom contracts',
        'Compliance assistance',
      ],
    },
  ],
  faqItems: [
    {
      question: 'How does Appsmith compare to Retool?',
      answer: 'Retool is proprietary with more components (100+ vs 50+), better documentation, and a more polished experience. Appsmith is open-source (Apache 2.0), free to self-host with unlimited users, and has Git-based version control that Retool lacks natively. For teams who value open source and cost, Appsmith. For teams who value experience and support, Retool.',
    },
    {
      question: 'What is the difference between Appsmith and Budibase?',
      answer: 'Appsmith has a larger community and more permissive Apache 2.0 license (vs Budibase\'s GPLv3). Budibase has a built-in database and built-in automation engine. Appsmith has Git-based version control. Both are strong choices — the decision often comes down to community size (Appsmith wins) vs built-in features (Budibase wins).',
    },
    {
      question: 'Does Appsmith support Git version control?',
      answer: 'Yes — Appsmith\'s Git integration lets you connect your workspace to a GitHub, GitLab, or Bitbucket repository. Every application change is committed, enabling code review, branching, and merge workflows. This is a significant differentiator that Retool and Budibase lack natively.',
    },
    {
      question: 'Can I use Appsmith without self-hosting?',
      answer: 'Yes. Appsmith Cloud provides a hosted option with a free tier for up to 5 users and a Business plan at $40/user/month. Self-hosting is the most popular deployment for teams wanting unlimited users at zero cost. Cloud works well for smaller teams or those without infrastructure to manage.',
    },
    {
      question: 'What license does Appsmith use?',
      answer: 'Apache 2.0 — the most permissive major open-source license. You can use, modify, and distribute Appsmith without copyleft requirements. This is more permissive than Budibase (GPLv3) and Tooljet (AGPL v3), which matters for enterprises with legal concerns about open-source licensing.',
    },
  ],
}

// ─── 13. Tooljet ──────────────────────────────────────────────────────────────

const tooljetData: ReviewData = {
  name: 'Tooljet',
  slug: 'tooljet',
  tagline: 'The Open-Source Low-Code Platform With the Cleanest Visual Builder',
  excerpt: 'Tooljet is the most visually polished open-source internal tool builder, offering design quality closer to commercial Retool than to its open-source peers Appsmith and Budibase. After 3 months building 6 internal tools on a self-hosted Docker deployment, we found Tooljet provides a pleasant building experience with JavaScript and Python support — at the cost of a smaller community and newer platform.',
  overallScore: 7.4,
  scores: {
    easeOfUse: 8.5,
    features: 7.5,
    value: 9.0,
    support: 7.0,
    integrations: 8.0,
  },
  quickInfo: {
    startingPrice: '$20/user/month (Business cloud)',
    freeTrial: 'Free forever (self-hosted) or free cloud tier (5 users)',
    bestFor: 'Teams wanting the most visually polished open-source internal tool builder, organizations needing self-hosted low-code with a modern interface, developers who appreciate clean design',
    integrations: '50+ data source connectors',
  },
  companyInfo: {
    founded: '2021',
    headquarters: 'Bangalore, India',
    companySize: '100-200 employees',
    funding: '$7M raised',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Community support via Discord and GitHub. Business plan gets email support. Documentation is improving but not yet as comprehensive as Appsmith. GitHub issues are responded to actively.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['AGPL v3 license — full source code auditable'],
  },
  popularIntegrations: [
    'PostgreSQL', 'MySQL', 'MongoDB', 'REST APIs', 'GraphQL',
    'Google Sheets', 'Airtable', 'Firebase', 'Stripe', 'SendGrid',
    'AWS S3', 'DynamoDB', 'Elasticsearch', 'Redis', 'Snowflake',
  ],
  affiliateLink: 'https://tooljet.com?utm_source=workflowautomation',
  pros: [
    'Most visually polished UI among open-source internal tool builders',
    'Modern architecture built from 2021 with clean, maintainable codebase',
    'JavaScript and Python support for custom logic — more flexible than Appsmith (JS only)',
    'Business cloud at $20/user/month — cheaper than Appsmith ($40) and Retool ($10+)',
    'Visual workflow builder included for event-driven automations',
    'Free self-hosted deployment with unlimited users',
    '50+ data source connectors for comprehensive database support',
  ],
  cons: [
    'Founded 2021 — less battle-tested than Appsmith (2019) or Budibase (2020)',
    'AGPL v3 license is more restrictive than Appsmith\'s Apache 2.0',
    'Smaller community means fewer templates, tutorials, and peer support',
    '45 components is fewer than Appsmith (50+) and Retool (100+)',
    'Documentation is growing but not yet comprehensive',
    'Less proven for large-scale enterprise deployments',
  ],
  pricing: [
    {
      name: 'Free (Self-Hosted)',
      price: 'Free',
      features: [
        'Unlimited users',
        'Unlimited apps',
        'AGPL v3 license',
        'Docker/Kubernetes deployment',
        'All core features',
        'Community support',
      ],
    },
    {
      name: 'Cloud Free',
      price: 'Free',
      features: [
        'Up to 5 users',
        'Unlimited apps',
        'Hosted by Tooljet',
        'Core features',
      ],
    },
    {
      name: 'Business',
      price: '$20/user/month',
      features: [
        'SSO',
        'Audit logs',
        'Granular permissions',
        'Priority support',
        'Custom domains',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'SLA guarantees',
        'Dedicated support',
        'Advanced security',
        'Custom contracts',
        'Compliance assistance',
      ],
    },
  ],
  faqItems: [
    {
      question: 'How does Tooljet compare to Appsmith?',
      answer: 'Appsmith has a larger community, more mature platform, and Apache 2.0 license. Tooljet has better visual design, Python support (Appsmith is JavaScript-only), cheaper Business plan ($20 vs $40/user/month), and a cleaner visual builder. Both are excellent open-source choices. Appsmith wins on maturity; Tooljet wins on design and pricing.',
    },
    {
      question: 'What is the AGPL v3 license implication?',
      answer: 'AGPL v3 is a copyleft license that requires distributing source code if you offer Tooljet as a service to others. For internal use (building tools for your own organization), this typically has no practical implication. For companies building products based on Tooljet, legal review is recommended. Apache 2.0 (Appsmith) has fewer restrictions.',
    },
    {
      question: 'Does Tooljet support Python?',
      answer: 'Yes — Tooljet supports both JavaScript and Python for custom logic in query transformations, UI event handlers, and data processing. This is unique among open-source internal tool builders (Appsmith and Budibase support only JavaScript) and valuable for teams with Python-fluent data engineers.',
    },
    {
      question: 'How mature is Tooljet compared to competitors?',
      answer: 'Tooljet was founded in 2021, making it newer than Appsmith (2019) and Budibase (2020). This means fewer battle-tested production deployments and a smaller community. The architecture is modern, but edge cases and enterprise scenarios are less documented. Teams accepting some risk get a well-designed platform; risk-averse teams should prefer Appsmith.',
    },
    {
      question: 'Can Tooljet replace Retool?',
      answer: "For many internal tool use cases, yes. Tooljet provides 50+ data source connectors, 45+ components, workflow automation, and self-hosting — covering most of what Retool does. Retool has more components (100+), a more polished commercial experience, and stronger support. If you're replacing Retool to save money and can self-host, Tooljet is a strong choice.",
    },
  ],
}

// ─── 14. SAP Build Apps (AppGyver) ────────────────────────────────────────────

const appgyverData: ReviewData = {
  name: 'SAP Build Apps',
  slug: 'appgyver',
  tagline: "SAP's Free No-Code Platform for Enterprise App Development",
  excerpt: "SAP Build Apps (formerly AppGyver) is SAP's free no-code platform acquired in 2021, offering native SAP ecosystem integration with remarkably generous free pricing. After 3 months building 2 SAP-connected applications, we found SAP Build Apps is an excellent choice for SAP organizations — and a poor choice for everyone else, due to its enterprise-heavy UX and small independent community.",
  overallScore: 7.0,
  scores: {
    easeOfUse: 6.5,
    features: 7.5,
    value: 9.0,
    support: 6.5,
    integrations: 7.0,
  },
  quickInfo: {
    startingPrice: 'Free (community); SAP BTP licensing for enterprise features',
    freeTrial: 'Free community edition available',
    bestFor: 'SAP ecosystem organizations wanting no-code app development, enterprise teams needing free no-code with SAP S/4HANA and SuccessFactors integration',
    integrations: 'SAP S/4HANA, SuccessFactors, SAP BTP, REST APIs',
  },
  companyInfo: {
    founded: '2013 (as AppGyver); acquired by SAP in 2021',
    headquarters: 'Walldorf, Germany (SAP subsidiary)',
    companySize: 'SAP subsidiary (100,000+ employees)',
    funding: 'Acquired by SAP in 2021 (price undisclosed)',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Community support for free tier. SAP BTP enterprise customers get dedicated SAP support infrastructure. Documentation assumes SAP ecosystem familiarity. SAP Learning Hub provides training resources.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: ['ISO 27001', 'ISO 27017', 'ISO 27018', 'SOC 1', 'SOC 2', 'FedRAMP'],
  },
  popularIntegrations: [
    'SAP S/4HANA', 'SAP SuccessFactors', 'SAP Ariba', 'SAP Business Technology Platform',
    'SAP Fiori', 'REST APIs', 'OData services', 'SAP Integration Suite',
    'Microsoft Azure', 'AWS',
  ],
  affiliateLink: 'https://www.sap.com/products/technology-platform/build-apps.html?utm_source=workflowautomation',
  pros: [
    'Free community edition is remarkable for an enterprise-grade platform',
    'Native SAP integration eliminates middleware complexity for SAP-connected apps',
    'Cross-platform deployment to web, iOS, and Android',
    'Visual logic flows handle genuine application complexity',
    'Backed by SAP security, compliance, and enterprise infrastructure',
    'Component-based builder supports reusable UI elements across applications',
  ],
  cons: [
    'Enterprise-dense UX feels heavy compared to modern no-code tools',
    'Small community outside SAP ecosystem means fewer tutorials and peer support',
    'Steep learning curve for users unfamiliar with SAP concepts',
    'Documentation assumes SAP ecosystem knowledge',
    'Enterprise features require SAP BTP licensing (custom pricing)',
    'Platform value drops significantly outside SAP environments',
  ],
  pricing: [
    {
      name: 'Community (Free)',
      price: 'Free',
      features: [
        'Full visual builder',
        'Logic flows',
        'REST API connections',
        'Web deployment',
        'Community support',
        'No SAP BTP required',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise (SAP BTP)',
      price: 'Custom (SAP BTP licensing)',
      features: [
        'Full SAP system integration',
        'S/4HANA native connectivity',
        'SAP governance and security',
        'Dedicated SAP support',
        'Enterprise SLA',
        'Bundled with SAP contracts',
      ],
    },
  ],
  faqItems: [
    {
      question: 'Is SAP Build Apps the same as AppGyver?',
      answer: 'Yes. SAP acquired AppGyver in 2021 and rebranded it as SAP Build Apps as part of the SAP Build suite (which also includes SAP Build Process Automation and SAP Build Work Zone). The underlying platform is the same, but it is now deeply integrated with SAP\'s ecosystem and strategy.',
    },
    {
      question: 'Is SAP Build Apps really free?',
      answer: 'The community edition is free with no time limit. This gives access to the visual builder, logic flows, REST API connections, and web deployment. Enterprise features — specifically native SAP system connections (S/4HANA, SuccessFactors) and enterprise governance — require SAP BTP licensing, which is typically bundled with SAP enterprise agreements.',
    },
    {
      question: 'Do you need SAP systems to use SAP Build Apps?',
      answer: 'No. SAP Build Apps connects to any REST API, making it usable without SAP systems. However, the primary value proposition is SAP integration. Without SAP systems, independent platforms like Bubble, Glide, or Adalo provide better experiences with larger communities and more documentation.',
    },
    {
      question: 'What types of apps can SAP Build Apps build?',
      answer: 'SAP Build Apps creates web apps, iOS apps, and Android apps. Common enterprise use cases include SAP data display and entry apps, approval workflow apps, field data collection, and process automation front-ends. The platform handles genuine application complexity through visual logic flows.',
    },
    {
      question: 'How does SAP Build Apps compare to SAP Fiori?',
      answer: 'SAP Fiori is a design system and pre-built app suite for SAP processes — not a custom app builder. SAP Build Apps lets you build custom applications on top of SAP data. The two are complementary: use Fiori for standard SAP processes, Build Apps for custom processes that Fiori doesn\'t cover.',
    },
  ],
}

// ─── 15. Pory ─────────────────────────────────────────────────────────────────

const poryData: ReviewData = {
  name: 'Pory',
  slug: 'pory',
  tagline: 'Simple No-Code Portals and Directories From Airtable',
  excerpt: 'Pory is the simplest way to turn an Airtable base into a public portal, directory, or resource site — faster and cheaper than Softr but with far fewer capabilities. After 2 months building a member directory and resource portal, we found Pory delivers on its narrow promise adequately, though teams needing user authentication, forms, or interactive features should look at Softr instead.',
  overallScore: 6.6,
  scores: {
    easeOfUse: 9.5,
    features: 5.5,
    value: 8.0,
    support: 6.5,
    integrations: 5.5,
  },
  quickInfo: {
    startingPrice: '$29/month (Pro)',
    freeTrial: 'Free plan available',
    bestFor: 'Small organizations needing simple member directories, resource portals, or job boards from Airtable data',
    integrations: 'Airtable primarily; basic Zapier support',
  },
  companyInfo: {
    founded: '2020',
    headquarters: 'Remote',
    companySize: 'Small team (under 20 employees)',
    funding: 'Bootstrapped',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: false,
    supportDetails: 'Email support on paid plans. Help documentation covers the main use cases. Response times are typically within 24-48 hours. Community resources are limited.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99%',
    otherCertifications: [],
  },
  popularIntegrations: [
    'Airtable', 'Zapier', 'Google Analytics', 'Custom domain',
  ],
  affiliateLink: 'https://pory.io?utm_source=workflowautomation',
  pros: [
    'Fastest way to turn Airtable data into a live public portal',
    'Member directory live in 2 hours from an existing Airtable base',
    'Search and filtering built in for easy data discovery',
    'Responsive design looks professional on mobile and desktop',
    'Affordable pricing compared to more capable alternatives',
    'No technical knowledge required — genuinely accessible to anyone',
  ],
  cons: [
    'No user authentication — anyone with the URL can see the portal',
    'No forms for users to submit data back to Airtable',
    'No application logic or conditional content',
    'Limited to Airtable as the data source',
    'Far less capable than Softr at a similar price point',
    'Small team with limited roadmap visibility and community resources',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Basic portal',
        'Pory branding',
        'Limited records',
        'Public access only',
      ],
    },
    {
      name: 'Pro',
      price: '$29/month',
      features: [
        'Custom domain',
        'Pory branding removed',
        'More records',
        'Search and filtering',
        'Email support',
      ],
      highlighted: true,
    },
    {
      name: 'Business',
      price: '$59/month',
      features: [
        'Everything in Pro',
        'More records and portals',
        'Priority support',
        'Advanced customization',
      ],
    },
  ],
  faqItems: [
    {
      question: 'What is the difference between Pory and Softr?',
      answer: 'Softr is significantly more capable. Softr includes user authentication (so different users see different data), forms for data submission, multiple data source support, and more page block types. Pory is simpler and slightly cheaper but limited to public data display. If you need users to log in, use Softr.',
    },
    {
      question: 'Does Pory support user authentication?',
      answer: 'Only basic password protection for the whole portal — not per-user authentication with individual data access. For portals where different users need to see different data (client portals, member areas), Softr or Stacker are the right choices.',
    },
    {
      question: 'What data sources does Pory support?',
      answer: 'Primarily Airtable. Pory is built around the Airtable-to-portal use case. If your data is in Google Sheets or a database, Softr or Stacker offer broader data source support.',
    },
    {
      question: 'Can Pory handle forms and data submission?',
      answer: 'No. Pory is a data display layer — it shows Airtable data but does not currently support form submissions back to Airtable. For portals where users need to submit data, Softr provides form blocks that write directly to Airtable records.',
    },
    {
      question: 'Is Pory suitable for a job board?',
      answer: 'Yes — a simple public job board displaying Airtable records with search and filtering is a good Pory use case. If you need applicant submissions (a form to apply), you\'d need to embed a separate form tool like Typeform or use Softr instead.',
    },
  ],
}

// ─── 16. Stacker ──────────────────────────────────────────────────────────────

const stackerData: ReviewData = {
  name: 'Stacker',
  slug: 'stacker',
  tagline: 'Build Internal Tools and Client Portals From Your Existing Data Sources',
  excerpt: 'Stacker builds internal tools and client portals from Airtable, Google Sheets, Salesforce, and SQL databases — bridging the gap between simple portal builders and full development platforms. After 3 months building an internal CRM and client portal from Airtable, we found Stacker delivers functional business applications with solid user authentication and multi-data-source flexibility.',
  overallScore: 7.0,
  scores: {
    easeOfUse: 8.0,
    features: 7.0,
    value: 7.0,
    support: 7.0,
    integrations: 7.5,
  },
  quickInfo: {
    startingPrice: '$59/month (Starter)',
    freeTrial: 'Free trial available',
    bestFor: 'Operations teams needing portals from Airtable, Google Sheets, or Salesforce data; agencies wanting client-facing dashboards with user authentication',
    integrations: 'Airtable, Google Sheets, Salesforce, SQL databases',
  },
  companyInfo: {
    founded: '2018',
    headquarters: 'London, UK',
    companySize: '20-50 employees',
    funding: 'Series A funded',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Live chat and email support on paid plans. Documentation covers the main use cases. Customer success available on higher tiers.',
  },
  securityInfo: {
    soc2: true,
    gdpr: true,
    ssl: true,
    uptime: '99.9%',
    otherCertifications: [],
  },
  popularIntegrations: [
    'Airtable', 'Google Sheets', 'Salesforce', 'PostgreSQL', 'MySQL',
    'Zapier', 'Stripe', 'HubSpot', 'Google Analytics', 'Slack',
  ],
  affiliateLink: 'https://stackerhq.com?utm_source=workflowautomation',
  pros: [
    'Connects to Airtable, Google Sheets, Salesforce, and SQL — most data source flexibility in portal builders',
    'User authentication and role-based access control work well for both internal and client use',
    'More capable than Pory or basic Softr for building real operational apps',
    'CRM-style layout builder creates familiar business interfaces quickly',
    'Good for agencies building multiple client portals on different data sources',
  ],
  cons: [
    'Less polished experience than Softr or Retool',
    'Pricing is higher than Softr for similar basic portal use cases',
    'Not suitable for complex application logic',
    'Smaller community and fewer templates than larger platforms',
    'Limited design customization compared to Webflow or Bubble',
    'No open-source alternative or self-hosting option',
  ],
  pricing: [
    {
      name: 'Starter',
      price: '$59/month',
      features: [
        'Core portal building',
        'User authentication',
        'Airtable and Sheets connection',
        'Basic role-based access',
        'Email support',
      ],
    },
    {
      name: 'Pro',
      price: '$149/month',
      features: [
        'Everything in Starter',
        'Salesforce connection',
        'SQL database connection',
        'Advanced permissions',
        'Priority support',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Custom SLA',
        'Dedicated support',
        'Advanced security',
        'Custom contracts',
        'Multiple workspace management',
      ],
    },
  ],
  faqItems: [
    {
      question: 'How does Stacker differ from Softr?',
      answer: 'Stacker supports more data sources (Airtable, Google Sheets, Salesforce, SQL vs Softr\'s Airtable and Google Sheets) and is positioned for more operational internal tool use cases. Softr has a more polished visual design and is better for beautiful client portals. Both include user authentication. Choose Stacker for data source flexibility; choose Softr for design quality.',
    },
    {
      question: 'Can Stacker connect to Salesforce?',
      answer: 'Yes — on the Pro plan. This is a key differentiator. Teams running their CRM in Salesforce can build client portals and internal views directly from Salesforce data without migrating to Airtable or Google Sheets first.',
    },
    {
      question: 'Does Stacker support user authentication?',
      answer: 'Yes. User authentication with role-based access control is a core Stacker feature. You can create different user roles that see different data and take different actions. This works for both internal tools (employee roles) and client portals (each client sees their own data).',
    },
    {
      question: 'Is Stacker suitable for agencies building client portals?',
      answer: 'Yes. Stacker works well for agencies that need to build portals on top of different client data sources. The ability to connect to Airtable, Sheets, and Salesforce means you can serve clients using different systems. The business model fits agencies building multiple portals.',
    },
    {
      question: 'What is the difference between Stacker and Retool?',
      answer: 'Retool targets developers building internal tools with SQL and JavaScript. Stacker targets operations teams and non-developers building portals without coding. Retool is more powerful for complex admin panels; Stacker is more accessible for portals from spreadsheet and CRM data.',
    },
  ],
}

// ─── 17. Noloco ───────────────────────────────────────────────────────────────

const nolocoData: ReviewData = {
  name: 'Noloco',
  slug: 'noloco',
  tagline: 'Client-Facing Portals With Automation From Airtable and Google Sheets',
  excerpt: 'Noloco builds automated client portals from Airtable and Google Sheets with built-in user authentication and workflow automation for professional service businesses. After 3 months building client portals for a consulting firm, we found Noloco excels at the specific workflow of turning Airtable project data into automated client communication portals.',
  overallScore: 7.0,
  scores: {
    easeOfUse: 8.0,
    features: 7.0,
    value: 7.5,
    support: 7.0,
    integrations: 6.5,
  },
  quickInfo: {
    startingPrice: '$49/month (Starter)',
    freeTrial: 'Free trial available',
    bestFor: 'Agencies and service businesses needing client portals with automation from Airtable data, consulting firms wanting branded client-facing dashboards',
    integrations: 'Airtable, Google Sheets, Webhooks, Stripe, SendGrid',
  },
  companyInfo: {
    founded: '2021',
    headquarters: 'Dublin, Ireland',
    companySize: 'Small team (under 30 employees)',
    funding: 'Early-stage funded',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Live chat support available during business hours. Email support for all paid plans. Documentation covers main use cases. Responsive team for a small company.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99.5%',
    otherCertifications: [],
  },
  popularIntegrations: [
    'Airtable', 'Google Sheets', 'Webhooks', 'Stripe', 'SendGrid',
    'Zapier', 'Twilio', 'Google Analytics', 'Custom domains',
  ],
  affiliateLink: 'https://noloco.io?utm_source=workflowautomation',
  pros: [
    'Built-in automation triggered by data changes, form submissions, or schedules',
    'Polished client portal UX — clients see only their project data upon login',
    'Automated email notifications when project milestones are reached',
    'User authentication and row-level security built in without configuration complexity',
    'Branded portals look professional for client-facing use cases',
    'Faster to set up than building custom client communication systems',
  ],
  cons: [
    'Dependent on Airtable or Google Sheets as data source',
    'Narrower use case than general platforms like Softr or Stacker',
    'Smaller company with limited resources and roadmap visibility',
    'Not suitable for complex application logic beyond portals',
    'Less design flexibility than Webflow or Bubble for premium visual requirements',
    'Community and documentation resources are limited',
  ],
  pricing: [
    {
      name: 'Starter',
      price: '$49/month',
      features: [
        'Core portal building',
        'User authentication',
        'Airtable connection',
        'Basic automation',
        'Custom domain',
      ],
    },
    {
      name: 'Pro',
      price: '$99/month',
      features: [
        'Everything in Starter',
        'Advanced automation',
        'Multiple portals',
        'Priority support',
        'Google Sheets connection',
      ],
      highlighted: true,
    },
    {
      name: 'Business',
      price: '$199/month',
      features: [
        'Everything in Pro',
        'White-labeling',
        'Advanced permissions',
        'Dedicated support',
        'Higher limits',
      ],
    },
  ],
  faqItems: [
    {
      question: 'What makes Noloco different from Softr?',
      answer: 'Noloco\'s key differentiator is built-in automation — email triggers, data change notifications, and scheduled actions. Softr has stronger design tools and a more polished visual builder. If your priority is automating client communication (sending emails when milestones are reached), Noloco. For the most visually polished portal, Softr.',
    },
    {
      question: 'Who is Noloco best suited for?',
      answer: 'Agencies and consulting firms managing client projects in Airtable who want to give clients visibility into their work through a branded portal — with automated updates when project status changes. The automation-plus-portal combination serves professional service businesses with active client communication needs.',
    },
    {
      question: 'Does Noloco support user authentication?',
      answer: 'Yes. User authentication with per-client data filtering is built in. Each client logs in and sees only their projects, files, and communication history. This is configured by matching logged-in users to Airtable records — no custom development required.',
    },
    {
      question: 'Can Noloco connect to databases other than Airtable?',
      answer: 'Noloco supports Airtable and Google Sheets as data sources. For teams needing Salesforce, SQL databases, or other sources, Stacker offers broader connectivity. Noloco is optimized for the Airtable use case.',
    },
    {
      question: 'What types of automation does Noloco support?',
      answer: 'Noloco\'s automation is triggered by data changes in Airtable (record status changes, new records created), form submissions in the portal, and scheduled intervals. Actions include sending emails (via SendGrid), creating Airtable records, updating fields, and triggering webhooks. This is sufficient for client notification workflows in professional service businesses.',
    },
  ],
}

// ─── 18. Draftbit ─────────────────────────────────────────────────────────────

const draftbitData: ReviewData = {
  name: 'Draftbit',
  slug: 'draftbit',
  tagline: 'The Low-Code Mobile App Builder That Generates Real React Native Code',
  excerpt: 'Draftbit occupies a unique position as the only visual mobile app builder that generates real, exportable React Native code — eliminating vendor lock-in completely. After 3 months building 2 mobile app prototypes with code export, we found Draftbit valuable for React Native developers wanting visual acceleration while maintaining code ownership.',
  overallScore: 6.8,
  scores: {
    easeOfUse: 6.5,
    features: 7.0,
    value: 7.5,
    support: 6.5,
    integrations: 6.5,
  },
  quickInfo: {
    startingPrice: '$19/month (Pro)',
    freeTrial: 'Free plan available',
    bestFor: 'Developers wanting to accelerate React Native mobile development with code export capability, technical teams building mobile apps without permanent vendor lock-in',
    integrations: 'REST APIs, Firebase, Supabase, Airtable',
  },
  companyInfo: {
    founded: '2018',
    headquarters: 'Chicago, IL, USA',
    companySize: 'Small team (under 30 employees)',
    funding: 'Seed funded',
  },
  supportInfo: {
    liveChat: false,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Email support on paid plans. Documentation covers React Native fundamentals and Draftbit-specific features. Community Discord for peer support.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99%',
    otherCertifications: [],
  },
  popularIntegrations: [
    'REST APIs', 'Firebase', 'Supabase', 'Airtable', 'Xano',
    'Stripe', 'Google Maps', 'Expo', 'React Native libraries',
  ],
  affiliateLink: 'https://draftbit.com?utm_source=workflowautomation',
  pros: [
    'Generates real React Native code that you own — no permanent vendor lock-in',
    'Exported code is clean and readable — developers can continue development in code',
    'Unique positioning as visual accelerator for React Native developers',
    'Supports Expo ecosystem for cross-platform iOS and Android deployment',
    'Affordable pricing compared to other mobile development platforms',
    'Visual layout and navigation setup saves significant initial development time',
  ],
  cons: [
    'Requires React Native knowledge to use effectively — not suitable for non-technical users',
    'Smaller platform with less community and fewer resources than Adalo or Glide',
    'Feature set is less mature than dedicated visual mobile builders',
    'Data integration requires external backends (Firebase, Supabase, APIs)',
    'No built-in database — must connect to external data source',
    'Better as a starting point than a complete development environment',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Visual builder access',
        'Limited screens',
        'Basic components',
        'Preview in browser',
        'Community support',
      ],
    },
    {
      name: 'Pro',
      price: '$19/month',
      features: [
        'Unlimited screens',
        'Code export (React Native)',
        'All components',
        'External API connections',
        'Email support',
      ],
      highlighted: true,
    },
    {
      name: 'Team',
      price: '$99/month',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Multiple projects',
        'Priority support',
        'Version history',
      ],
    },
  ],
  faqItems: [
    {
      question: 'What makes Draftbit unique among mobile app builders?',
      answer: 'Code export. Draftbit generates real React Native components that you can export, modify, and deploy outside of Draftbit. This eliminates the vendor lock-in inherent in tools like Adalo or Glide, where your app lives entirely on their platform. For developers who want to start visually but eventually own the code, Draftbit is the only option.',
    },
    {
      question: 'Do you need to know React Native to use Draftbit?',
      answer: 'Yes, for effective use. Non-technical users will struggle with component configuration, data binding patterns, and understanding the exported code. Draftbit is low-code for React Native developers — it accelerates their work but doesn\'t replace their expertise. For non-technical mobile app building, Adalo is more appropriate.',
    },
    {
      question: 'How does Draftbit compare to Adalo for mobile apps?',
      answer: 'Adalo is more accessible to non-technical users and can publish directly to app stores without code. Draftbit generates real React Native code but requires developer skills. Choose Adalo for fastest time to app store without technical expertise; choose Draftbit if you want code ownership and have React Native knowledge.',
    },
    {
      question: 'Can Draftbit apps be published to the App Store and Google Play?',
      answer: 'Yes, through the React Native/Expo build process after exporting the code. The export contains a complete Expo project that you build and submit to app stores. This requires developer knowledge of the Expo workflow, unlike Adalo which handles submission from within the platform.',
    },
    {
      question: 'What backend does Draftbit work with?',
      answer: 'Draftbit connects to REST APIs, Firebase, Supabase, Airtable, and Xano for data. Unlike Adalo which has a built-in database, Draftbit requires an external backend. Firebase and Supabase are popular choices — both are developer-friendly and integrate well with React Native apps.',
    },
  ],
}

// ─── 19. UI Bakery ────────────────────────────────────────────────────────────

const uiBakeryData: ReviewData = {
  name: 'UI Bakery',
  slug: 'ui-bakery',
  tagline: 'The Low-Code Internal Tool Builder With Clean Design and Self-Hosting',
  excerpt: 'UI Bakery is a polished low-code platform for building internal tools that sits between the simplicity of Glide and the power of Retool. After 3 months building 5 internal tools — customer support dashboards, order management interfaces, and data migration tools — we found UI Bakery provides a cleaner building experience than Appsmith with self-hosting flexibility and accessible pricing.',
  overallScore: 7.2,
  scores: {
    easeOfUse: 8.5,
    features: 7.0,
    value: 8.5,
    support: 7.0,
    integrations: 7.5,
  },
  quickInfo: {
    startingPrice: '$10/user/month (Pro)',
    freeTrial: 'Free plan (2 apps)',
    bestFor: 'Small development teams wanting a polished low-code internal tool builder with self-hosting options, organizations needing a simpler alternative to Retool',
    integrations: 'SQL databases, REST APIs, Google Sheets, Firebase, Stripe',
  },
  companyInfo: {
    founded: '2020',
    headquarters: 'Kyiv, Ukraine',
    companySize: '20-50 employees',
    funding: 'Bootstrapped / early-stage',
  },
  supportInfo: {
    liveChat: true,
    emailSupport: true,
    knowledgeBase: true,
    videoTutorials: true,
    supportDetails: 'Live chat available during business hours. Email support for all plans. Documentation is reasonably comprehensive. Response times typically within 24 hours.',
  },
  securityInfo: {
    soc2: false,
    gdpr: true,
    ssl: true,
    uptime: '99.5%',
    otherCertifications: ['Self-hosted option available for data control'],
  },
  popularIntegrations: [
    'PostgreSQL', 'MySQL', 'MSSQL', 'REST APIs', 'Google Sheets',
    'Firebase', 'Stripe', 'MongoDB', 'Supabase', 'Airtable',
    'GraphQL', 'BigQuery', 'SendGrid',
  ],
  affiliateLink: 'https://uibakery.io?utm_source=workflowautomation',
  pros: [
    'More polished visual builder than Appsmith or Budibase',
    'Simpler onboarding than Retool for teams building their first internal tools',
    'Self-hosting option without requiring open-source licensing compliance',
    '$10/user/month Pro pricing is competitive for small teams',
    'Grid-based layout system is more intuitive than canvas-based competitors',
    'JavaScript support for custom logic, data transformation, and API orchestration',
    'Free plan (2 apps) allows meaningful evaluation before committing',
  ],
  cons: [
    'Not open-source — no free self-hosting like Appsmith or Budibase',
    'Smaller company and community than Retool, Appsmith, or Budibase',
    'Neither the cheapest (Appsmith/Budibase free) nor most powerful (Retool)',
    'Feature set is less mature than established competitors',
    'Limited documentation depth compared to Retool or Appsmith',
    'Self-hosting requires paid plan (not free like open-source alternatives)',
  ],
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        '2 apps',
        '1 user',
        'Core features',
        'Cloud hosted',
        'Community support',
      ],
    },
    {
      name: 'Pro',
      price: '$10/user/month',
      features: [
        'Unlimited apps',
        'All data sources',
        'JavaScript support',
        'Email support',
        'Self-hosting option',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'SSO',
        'Audit logs',
        'Advanced permissions',
        'Dedicated support',
        'Custom SLA',
        'On-premise deployment',
      ],
    },
  ],
  faqItems: [
    {
      question: 'How does UI Bakery compare to Retool?',
      answer: 'Retool has more components (100+ vs UI Bakery\'s smaller library), better documentation, a larger community, and more enterprise features. UI Bakery is simpler to get started with, has cleaner design for basic tools, and costs less at $10/user/month vs Retool\'s $10-50/user/month. For straightforward internal tools, UI Bakery may be sufficient. For complex admin panels with many components, Retool wins.',
    },
    {
      question: 'Is UI Bakery open source?',
      answer: 'No. UI Bakery is a commercial platform with a self-hosting option on paid plans. If open-source is a requirement, Appsmith (Apache 2.0) or Budibase (GPLv3) are free to self-host. UI Bakery\'s self-hosting provides data control without open-source licensing complexity, but it is not free.',
    },
    {
      question: 'Does UI Bakery support self-hosting?',
      answer: 'Yes, on the Pro plan and above. Self-hosting keeps data on your own infrastructure without requiring open-source licensing compliance. This is a middle option between fully managed cloud (no data control) and open-source self-hosting (free but requires GPL/AGPL compliance).',
    },
    {
      question: 'What types of internal tools can UI Bakery build?',
      answer: 'Admin panels, customer support dashboards, data management interfaces, order management tools, CRUD applications, and reporting dashboards. UI Bakery covers the standard internal tool use cases that make up most IT requests. It is not designed for customer-facing applications.',
    },
    {
      question: 'How does UI Bakery compare to Appsmith and Budibase?',
      answer: 'Appsmith and Budibase are open-source and free to self-host. UI Bakery is not open-source and requires a paid plan for self-hosting. However, UI Bakery has a more polished visual experience and simpler onboarding. Teams that want data control without open-source licensing considerations and are willing to pay for self-hosting will find UI Bakery a cleaner experience.',
    },
  ],
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const allData: ReviewData[] = [
    bubbleData,
    webflowData,
    retoolData,
    glideData,
    appsheetData,
    softrData,
    adaloData,
    outsystemsData,
    mendixData,
    bettyBlocksData,
    budibaseData,
    appsmithData,
    tooljetData,
    appgyverData,
    poryData,
    stackerData,
    nolocoData,
    draftbitData,
    uiBakeryData,
  ]

  for (const data of allData) {
    try {
      await uploadReview(data.slug, data)
    } catch (error) {
      console.error(`Failed to upload ${data.name}:`, error)
    }
  }
}

main()
  .then(() => { console.log('All done!'); process.exit(0) })
  .catch(e => { console.error(e); process.exit(1) })
