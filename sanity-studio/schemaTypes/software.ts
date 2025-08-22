import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'software',
  title: 'Software Review',
  type: 'document',
  groups: [
    {name: 'basic', title: 'Basic Info'},
    {name: 'scores', title: 'Scores & Ratings'},
    {name: 'review', title: 'Review Content'},
    {name: 'features', title: 'Features & Functionality'},
    {name: 'pricing', title: 'Pricing & Plans'},
    {name: 'technical', title: 'Technical Details'},
    {name: 'support', title: 'Support & Resources'},
    {name: 'media', title: 'Media & Screenshots'},
    {name: 'comparisons', title: 'Comparisons'},
    {name: 'seo', title: 'SEO & Marketing'},
  ],
  fields: [
    // ========== BASIC INFO ==========
    defineField({
      name: 'name',
      title: 'Software Name',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'basic',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.max(100)
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description (for cards)',
      type: 'text',
      group: 'basic',
      validation: Rule => Rule.max(200)
    }),
    defineField({
      name: 'verdict',
      title: 'One-line Verdict',
      type: 'string',
      group: 'basic',
      description: 'e.g., "Best for growing teams needing advanced automation"',
      validation: Rule => Rule.max(100)
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'basic',
      of: [{type: 'reference', to: [{type: 'category'}]}]
    }),
    defineField({
      name: 'companyInfo',
      title: 'Company Information',
      type: 'object',
      group: 'basic',
      fields: [
        {name: 'foundedYear', title: 'Founded Year', type: 'number'},
        {name: 'headquarters', title: 'Headquarters', type: 'string'},
        {name: 'employeeCount', title: 'Employee Count', type: 'string'},
        {name: 'funding', title: 'Funding Information', type: 'string'},
        {name: 'valuation', title: 'Valuation', type: 'string'},
        {name: 'revenue', title: 'Revenue', type: 'string'},
        {name: 'customers', title: 'Customer Count', type: 'string'},
        {name: 'website', title: 'Official Website', type: 'url'},
        {name: 'marketShare', title: 'Market Share', type: 'string'},
        {name: 'notableClients', title: 'Notable Clients', type: 'array', of: [{type: 'string'}]}
      ]
    }),

    // ========== SCORES & RATINGS ==========
    defineField({
      name: 'overallScore',
      title: 'Overall Score (1-10)',
      type: 'number',
      group: 'scores',
      validation: Rule => Rule.required().min(1).max(10).precision(1)
    }),
    defineField({
      name: 'scores',
      title: 'Detailed Scores',
      type: 'object',
      group: 'scores',
      fields: [
        {name: 'features', title: 'Features & Functionality', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'easeOfUse', title: 'Ease of Use', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'integrations', title: 'Integrations', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'pricing', title: 'Pricing Value', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'support', title: 'Customer Support', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'security', title: 'Security & Compliance', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'scalability', title: 'Scalability', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'performance', title: 'Performance', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'customization', title: 'Customization', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'reporting', title: 'Reporting & Analytics', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'mobile', title: 'Mobile Experience', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'documentation', title: 'Documentation', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'learningCurve', title: 'Learning Curve', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'freeTier', title: 'Free Tier/Trial', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'overallValue', title: 'Overall Value', type: 'number', validation: Rule => Rule.min(1).max(10)},
      ]
    }),
    defineField({
      name: 'userRatings',
      title: 'External User Ratings',
      type: 'object',
      group: 'scores',
      fields: [
        {name: 'g2Score', title: 'G2 Score', type: 'number'},
        {name: 'g2Reviews', title: 'G2 Review Count', type: 'number'},
        {name: 'capterraScore', title: 'Capterra Score', type: 'number'},
        {name: 'capterraReviews', title: 'Capterra Review Count', type: 'number'},
        {name: 'trustRadiusScore', title: 'TrustRadius Score', type: 'number'},
        {name: 'trustRadiusReviews', title: 'TrustRadius Review Count', type: 'number'},
      ]
    }),

    // ========== REVIEW CONTENT ==========
    defineField({
      name: 'overview',
      title: 'Overview Section',
      type: 'object',
      group: 'review',
      fields: [
        {name: 'whatIsIt', title: 'What is this software?', type: 'blockContent'},
        {name: 'keyDifferentiators', title: 'Key Differentiators', type: 'blockContent'},
        {name: 'idealFor', title: 'Ideal For', type: 'blockContent'},
      ]
    }),
    defineField({
      name: 'detailedReview',
      title: 'Detailed Review Sections',
      type: 'object',
      group: 'review',
      fields: [
        {name: 'userInterface', title: 'User Interface & Experience', type: 'blockContent'},
        {name: 'performance', title: 'Performance & Reliability', type: 'blockContent'},
        {name: 'security', title: 'Security & Compliance', type: 'blockContent'},
        {name: 'implementation', title: 'Implementation & Setup', type: 'blockContent'},
        {name: 'learningCurve', title: 'Learning Curve', type: 'blockContent'},
      ]
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      group: 'review',
      of: [{type: 'string'}],
      validation: Rule => Rule.min(3).max(10)
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      group: 'review',
      of: [{type: 'string'}],
      validation: Rule => Rule.min(2).max(8)
    }),
    defineField({
      name: 'bestFor',
      title: 'Best For (List)',
      type: 'array',
      group: 'review',
      of: [{type: 'string'}],
      description: 'e.g., "Small to medium businesses", "Marketing teams"'
    }),
    defineField({
      name: 'notIdealFor',
      title: 'Not Ideal For',
      type: 'array',
      group: 'review',
      of: [{type: 'string'}],
      description: 'Who should look elsewhere'
    }),
    defineField({
      name: 'popularIntegrations',
      title: 'Popular Integrations',
      type: 'array',
      group: 'features',
      of: [{type: 'string'}],
      description: 'List of popular integration names'
    }),

    // ========== FEATURES ==========
    defineField({
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      group: 'features',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', title: 'Feature Name', type: 'string', validation: Rule => Rule.required()},
          {name: 'description', title: 'Description', type: 'text'},
          {name: 'category', title: 'Category', type: 'string'},
          {name: 'screenshot', title: 'Screenshot', type: 'image'},
        ]
      }]
    }),
    defineField({
      name: 'integrations',
      title: 'Integration Details',
      type: 'object',
      group: 'features',
      fields: [
        {name: 'count', title: 'Total Integration Count', type: 'number'},
        {name: 'native', title: 'Native Integration Count', type: 'number'},
        {name: 'categories', title: 'Integration Categories', type: 'array', of: [{type: 'string'}]},
        {name: 'hasZapier', title: 'Zapier Support', type: 'boolean'},
        {name: 'hasAPI', title: 'API Available', type: 'boolean'},
        {name: 'hasWebhooks', title: 'Webhook Support', type: 'boolean'},
      ]
    }),
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      type: 'array',
      group: 'features',
      of: [{
        type: 'object',
        fields: [
          {name: 'industry', title: 'Industry/Type', type: 'string'},
          {name: 'scenario', title: 'Scenario', type: 'text'},
          {name: 'benefits', title: 'Benefits', type: 'text'},
        ]
      }]
    }),

    // ========== PRICING ==========
    defineField({
      name: 'pricing',
      title: 'Pricing Plans',
      type: 'array',
      group: 'pricing',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', title: 'Plan Name', type: 'string'},
          {name: 'price', title: 'Monthly Price', type: 'number'},
          {name: 'yearlyPrice', title: 'Yearly Price', type: 'number'},
          {name: 'users', title: 'User Limit', type: 'string'},
          {name: 'features', title: 'Key Features', type: 'array', of: [{type: 'string'}]},
          {name: 'highlighted', title: 'Most Popular?', type: 'boolean'},
        ]
      }]
    }),
    defineField({
      name: 'pricingDetails',
      title: 'Pricing Details',
      type: 'object',
      group: 'pricing',
      fields: [
        {name: 'hasFreeTier', title: 'Has Free Tier?', type: 'boolean'},
        {name: 'freeTrialDays', title: 'Free Trial Days', type: 'number'},
        {name: 'moneyBackDays', title: 'Money-back Guarantee Days', type: 'number'},
        {name: 'discounts', title: 'Available Discounts', type: 'text'},
        {name: 'hiddenCosts', title: 'Hidden Costs/Add-ons', type: 'text'},
        {name: 'billingCycle', title: 'Billing Cycles', type: 'array', of: [{type: 'string'}]},
      ]
    }),

    // ========== TECHNICAL DETAILS ==========
    defineField({
      name: 'supportedPlatforms',
      title: 'Supported Platforms',
      type: 'array',
      group: 'technical',
      of: [{type: 'string'}],
      description: 'e.g., web, windows, macos, ios, android, api'
    }),
    defineField({
      name: 'deploymentOptions',
      title: 'Deployment Options',
      type: 'array',
      group: 'technical',
      of: [{type: 'string'}],
      description: 'e.g., cloud, on-premise, hybrid'
    }),
    defineField({
      name: 'dataExportFormats',
      title: 'Data Export Formats',
      type: 'array',
      group: 'technical',
      of: [{type: 'string'}],
      description: 'e.g., CSV, Excel, PDF, JSON'
    }),
    defineField({
      name: 'technical',
      title: 'Technical Specifications',
      type: 'object',
      group: 'technical',
      fields: [
        {name: 'platforms', title: 'Supported Platforms', type: 'array', of: [{type: 'string'}]},
        {name: 'deployment', title: 'Deployment Options', type: 'array', of: [{type: 'string'}]},
        {name: 'languages', title: 'Supported Languages', type: 'array', of: [{type: 'string'}]},
        {name: 'dataLimits', title: 'Data/Storage Limits', type: 'text'},
        {name: 'apiRateLimits', title: 'API Rate Limits', type: 'text'},
        {name: 'uptime', title: 'Uptime SLA', type: 'string'},
      ]
    }),
    defineField({
      name: 'security',
      title: 'Security & Compliance',
      type: 'object',
      group: 'technical',
      fields: [
        {name: 'certifications', title: 'Certifications', type: 'array', of: [{type: 'string'}]},
        {name: 'compliance', title: 'Compliance Standards', type: 'array', of: [{type: 'string'}]},
        {name: 'dataEncryption', title: 'Data Encryption', type: 'text'},
        {name: 'accessControls', title: 'Access Controls', type: 'array', of: [{type: 'string'}]},
        {name: 'dataResidency', title: 'Data Residency Options', type: 'array', of: [{type: 'string'}]},
      ]
    }),
    defineField({
      name: 'mobile',
      title: 'Mobile Apps',
      type: 'object',
      group: 'technical',
      fields: [
        {name: 'hasIOS', title: 'iOS App Available', type: 'boolean'},
        {name: 'iosRating', title: 'iOS App Rating', type: 'number'},
        {name: 'hasAndroid', title: 'Android App Available', type: 'boolean'},
        {name: 'androidRating', title: 'Android App Rating', type: 'number'},
        {name: 'mobileFeatures', title: 'Mobile-specific Features', type: 'array', of: [{type: 'string'}]},
        {name: 'offlineCapability', title: 'Offline Capability', type: 'boolean'},
      ]
    }),

    // ========== SUPPORT ==========
    defineField({
      name: 'supportInfo',
      title: 'Support Information',
      type: 'object',
      group: 'support',
      fields: [
        {name: 'channels', title: 'Support Channels', type: 'array', of: [{type: 'string'}]},
        {name: 'responseTime', title: 'Average Response Time', type: 'string'},
        {name: 'languages', title: 'Support Languages', type: 'array', of: [{type: 'string'}]},
        {name: 'training', title: 'Training Resources', type: 'array', of: [{type: 'string'}]},
        {name: 'sla', title: 'SLA Available', type: 'boolean'},
      ]
    }),
    defineField({
      name: 'support',
      title: 'Customer Support',
      type: 'object',
      group: 'support',
      fields: [
        {name: 'channels', title: 'Support Channels', type: 'array', of: [{
          type: 'object',
          fields: [
            {name: 'type', title: 'Type', type: 'string'},
            {name: 'availability', title: 'Availability', type: 'string'},
            {name: 'responseTime', title: 'Response Time', type: 'string'},
          ]
        }]},
        {name: 'hasKnowledgeBase', title: 'Knowledge Base', type: 'boolean'},
        {name: 'hasCommunityForum', title: 'Community Forum', type: 'boolean'},
        {name: 'hasVideoTutorials', title: 'Video Tutorials', type: 'boolean'},
        {name: 'hasWebinars', title: 'Webinars', type: 'boolean'},
        {name: 'hasCertification', title: 'Certification Program', type: 'boolean'},
        {name: 'professionalServices', title: 'Professional Services Available', type: 'boolean'},
      ]
    }),

    // ========== MEDIA ==========
    defineField({
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      group: 'media',
      of: [{
        type: 'object',
        fields: [
          {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
          {name: 'caption', title: 'Caption', type: 'string'},
          {name: 'feature', title: 'Feature Shown', type: 'string'},
        ]
      }]
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      group: 'media',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', title: 'Title', type: 'string'},
          {name: 'url', title: 'Video URL', type: 'url'},
          {name: 'type', title: 'Type', type: 'string', options: {list: ['Demo', 'Tutorial', 'Review', 'Webinar']}},
        ]
      }]
    }),

    // ========== COMPARISONS ==========
    defineField({
      name: 'alternatives',
      title: 'Main Alternatives',
      type: 'array',
      group: 'comparisons',
      of: [{type: 'reference', to: [{type: 'software'}]}]
    }),
    defineField({
      name: 'comparisonNotes',
      title: 'Comparison Notes',
      type: 'blockContent',
      group: 'comparisons',
      description: 'When to choose this vs alternatives'
    }),

    // ========== SEO & MARKETING ==========
    defineField({
      name: 'affiliateLink',
      title: 'Affiliate Link',
      type: 'url',
      group: 'seo'
    }),
    defineField({
      name: 'specialDeal',
      title: 'Special Deal/Discount',
      type: 'object',
      group: 'seo',
      fields: [
        {name: 'active', title: 'Deal Active?', type: 'boolean'},
        {name: 'description', title: 'Deal Description', type: 'string'},
        {name: 'code', title: 'Discount Code', type: 'string'},
        {name: 'expires', title: 'Expiry Date', type: 'datetime'},
      ]
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Review Last Updated',
      type: 'datetime',
      group: 'seo',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'nextReviewDate',
      title: 'Next Review Date',
      type: 'datetime',
      group: 'seo',
      description: 'When this review should be updated next'
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        {name: 'metaTitle', title: 'Meta Title', type: 'string', validation: Rule => Rule.max(60)},
        {name: 'metaDescription', title: 'Meta Description', type: 'text', validation: Rule => Rule.max(160)},
        {name: 'keywords', title: 'Keywords', type: 'array', of: [{type: 'string'}]},
      ]
    }),
  ],
  preview: {
    select: {
      title: 'name',
      score: 'overallScore',
      media: 'logo',
      updated: 'lastUpdated'
    },
    prepare(selection) {
      const {title, score, updated} = selection
      return {
        ...selection,
        subtitle: `Score: ${score}/10 • Updated: ${updated ? new Date(updated).toLocaleDateString() : 'Not set'}`
      }
    }
  }
})