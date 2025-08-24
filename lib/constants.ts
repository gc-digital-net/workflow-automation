export const SITE_CONFIG = {
  name: 'Workflow Automation',
  description: 'Find the Perfect Automation Software for Your Business',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://workflowautomation.net',
  ogImage: '/og-image.png',
  links: {
    twitter: 'https://twitter.com/workflowautomation',
    linkedin: 'https://linkedin.com/company/workflowautomation',
    youtube: 'https://youtube.com/@workflowautomation',
  },
};

export const NAVIGATION_ITEMS = [
  {
    name: 'Best Software',
    href: '/reviews',
    children: [
      { name: 'All Reviews', href: '/reviews' },
      { name: 'Categories', href: '/categories' },
      { name: 'Compare Tools', href: '/reviews/compare' },
      { name: 'Top Rated', href: '/reviews/top-rated' },
    ],
  },
  {
    name: 'Blog',
    href: '/blog',
    children: [
      { name: 'All Articles', href: '/blog' },
      { name: 'Guides', href: '/blog/category/guides' },
      { name: 'News', href: '/blog/category/news' },
      { name: 'Top Software', href: '/top' },
    ],
  },
  {
    name: 'Tools',
    href: '/tools',
    children: [
      { name: 'ROI Calculator', href: '/tools/roi-calculator' },
      { name: 'Software Finder', href: '/tools/software-finder' },
      { name: 'All Tools', href: '/tools' },
    ],
  },
  {
    name: 'Community',
    href: '/community',
    children: [
      { name: 'Overview', href: '/community' },
      { name: 'Membership', href: '/community/membership' },
      { name: 'Events', href: '/community/events' },
    ],
  },
  // TODO: Complete Learn section in the future
  // {
  //   name: 'Learn',
  //   href: '/learn',
  //   children: [
  //     { name: 'Certification', href: '/learn/certification' },
  //     { name: 'Mini Courses', href: '/learn/mini-courses' },
  //     { name: 'Templates', href: '/learn/templates' },
  //   ],
  // },
];

export const FOOTER_LINKS = {
  product: [
    { name: 'Software Reviews', href: '/reviews' },
    { name: 'Blog', href: '/blog' },
    { name: 'Tools', href: '/tools' },
    { name: 'Templates', href: '/learn/templates' },
  ],
  learn: [
    { name: 'Certification', href: '/learn/certification' },
    { name: 'Resources', href: '/learn/resources' },
    { name: 'Webinars', href: '/learn/resources#webinars' },
    { name: 'Guides', href: '/blog/category/guides' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Community', href: '/community' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
  ],
};

export const SOFTWARE_CATEGORIES = [
  'Workflow Automation',
  'Project Management',
  'Business Process Management',
  'HR Automation',
  'Sales Automation',
  'Marketing Automation',
  'Document Automation',
  'IT Process Automation',
  'Finance Automation',
  'Customer Service',
  'Security & Compliance',
  'Testing & QA',
];

export const REVIEW_CRITERIA = [
  'Ease of Use',
  'Feature Set',
  'Integration Capabilities',
  'Pricing Value',
  'Customer Support',
  'Security & Compliance',
  'Scalability',
  'Performance',
  'Mobile Access',
  'Documentation',
  'Learning Curve',
  'Customization',
  'Reporting & Analytics',
  'Free Tier/Trial',
  'Overall Value',
];

export const MEMBERSHIP_TIERS = {
  free: {
    name: 'Community Free',
    price: 0,
    features: [
      'Access to community forum',
      'Monthly newsletter',
      'Basic workflow templates',
      'Software comparison tools',
    ],
  },
  pro: {
    name: 'Pro Member',
    price: 19,
    features: [
      'Everything in Free',
      'Slack community access',
      'Live monthly workshops',
      'Premium templates library',
      'Exclusive software deals',
      'Priority support',
      'Certification course discount',
    ],
  },
  team: {
    name: 'Team Access',
    price: 99,
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Custom training sessions',
      'White-label resources',
      'API access',
      'Dedicated account manager',
      'Custom integration support',
    ],
  },
};

export const API_ENDPOINTS = {
  newsletter: '/api/newsletter',
  contact: '/api/contact',
  analytics: '/api/analytics',
  membership: '/api/membership',
  payment: '/api/payment',
  webhook: '/api/webhook',
};

export const SEO_DEFAULTS = {
  titleTemplate: '%s | Workflow Automation',
  defaultTitle: 'Workflow Automation - Find the Perfect Automation Software',
  description: 'Comprehensive reviews, comparisons, and tools to help you choose the right workflow automation software for your business.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    site_name: 'Workflow Automation',
  },
  twitter: {
    handle: '@workflowautomation',
    cardType: 'summary_large_image',
  },
};