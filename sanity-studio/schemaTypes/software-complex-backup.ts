import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'software',
  title: 'Software Review',
  type: 'document',
  groups: [
    {name: 'basic', title: 'Basic Info'},
    {name: 'quickinfo', title: 'Quick Info & At-a-Glance'},
    {name: 'scores', title: 'Scores & Ratings'},
    {name: 'review', title: 'Review Content'},
    {name: 'features', title: 'Features & Functionality'},
    {name: 'pricing', title: 'Pricing & Plans'},
    {name: 'technical', title: 'Technical Details'},
    {name: 'support', title: 'Support & Resources'},
    {name: 'media', title: 'Media & Screenshots'},
    {name: 'comparisons', title: 'Comparisons'},
    {name: 'faq', title: 'FAQs'},
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

    // ========== QUICK INFO & AT-A-GLANCE ==========
    defineField({
      name: 'contentMode',
      title: 'Content Generation Mode',
      type: 'string',
      group: 'quickinfo',
      options: {
        list: [
          {title: 'Automated (API/Scraped)', value: 'automated'},
          {title: 'Manual (Written)', value: 'manual'},
          {title: 'Hybrid (Both)', value: 'hybrid'}
        ],
        layout: 'radio'
      },
      initialValue: 'automated',
      description: 'How is the content for this review generated?'
    }),
    defineField({
      name: 'atAGlance',
      title: 'At-a-Glance Summary',
      type: 'object',
      group: 'quickinfo',
      fields: [
        {name: 'bottomLine', title: 'Bottom Line (2-3 sentences)', type: 'text', validation: Rule => Rule.max(300)},
        {name: 'setupTime', title: 'Setup Time', type: 'string', description: 'e.g., "15 minutes", "1-2 hours"'},
        {name: 'bestForCompanySize', title: 'Best For (Company Size)', type: 'string', description: 'e.g., "10-500 employees"'},
        {name: 'industryFocus', title: 'Industry Focus', type: 'array', of: [{type: 'string'}], description: 'Target industries'},
        {name: 'standoutFeature', title: 'Standout Feature', type: 'string', description: 'The #1 differentiator'},
      ]
    }),
    defineField({
      name: 'quickStats',
      title: 'Quick Stats',
      type: 'object',
      group: 'quickinfo',
      fields: [
        {name: 'totalUsers', title: 'Total Users/Companies', type: 'string', description: 'e.g., "2M+ users", "10,000+ companies"'},
        {name: 'founded', title: 'Year Founded', type: 'number'},
        {name: 'lastFundingRound', title: 'Last Funding', type: 'string', description: 'e.g., "Series C - $400M"'},
        {name: 'awards', title: 'Awards & Recognition', type: 'array', of: [{type: 'string'}]},
        {name: 'uptimePercentage', title: 'Uptime %', type: 'number', description: 'e.g., 99.9'},
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
        {name: 'introduction', title: 'Introduction', type: 'blockContent'},
        {name: 'keyHighlights', title: 'Key Highlights', type: 'array', of: [{
          type: 'object',
          fields: [
            {name: 'feature', title: 'Feature', type: 'string'},
            {name: 'description', title: 'Description', type: 'text'}
          ]
        }]},
        {name: 'targetAudience', title: 'Target Audience', type: 'blockContent'},
      ]
    }),
    defineField({
      name: 'detailedReview',
      title: 'Detailed Review Section',
      type: 'object',
      group: 'review',
      fields: [
        {name: 'userInterface', title: 'User Interface & Experience', type: 'blockContent'},
        {name: 'featuresAnalysis', title: 'Features Analysis', type: 'blockContent'},
        {name: 'integrationCapabilities', title: 'Integration Capabilities', type: 'blockContent'},
        {name: 'performanceReliability', title: 'Performance & Reliability', type: 'blockContent'},
        {name: 'securityCompliance', title: 'Security & Compliance', type: 'blockContent'},
        {name: 'customerSupport', title: 'Customer Support', type: 'blockContent'},
      ]
    }),
    defineField({
      name: 'pricingSection',
      title: 'Pricing Analysis',
      type: 'object',
      group: 'review',
      fields: [
        {name: 'pricingOverview', title: 'Pricing Overview', type: 'blockContent'},
        {name: 'valueForMoney', title: 'Value for Money Analysis', type: 'blockContent'},
        {name: 'competitiveComparison', title: 'Competitive Pricing Comparison', type: 'blockContent'},
      ]
    }),
    defineField({
      name: 'useCasesSection',
      title: 'Use Cases & Implementation',
      type: 'object',
      group: 'review',
      fields: [
        {name: 'idealUseCases', title: 'Ideal Use Cases', type: 'blockContent'},
        {name: 'implementationGuide', title: 'Implementation Guide', type: 'blockContent'},
        {name: 'realWorldExamples', title: 'Real-world Examples', type: 'array', of: [{
          type: 'object',
          fields: [
            {name: 'company', title: 'Company/Scenario', type: 'string'},
            {name: 'challenge', title: 'Challenge', type: 'text'},
            {name: 'solution', title: 'Solution', type: 'text'},
            {name: 'results', title: 'Results', type: 'text'}
          ]
        }]},
      ]
    }),
    defineField({
      name: 'competitorAnalysis',
      title: 'Competitor Analysis',
      type: 'object',
      group: 'review',
      fields: [
        {name: 'mainCompetitors', title: 'Main Competitors', type: 'array', of: [{type: 'reference', to: [{type: 'software'}]}]},
        {name: 'competitiveAdvantages', title: 'Competitive Advantages', type: 'blockContent'},
        {name: 'competitiveDisadvantages', title: 'Areas for Improvement', type: 'blockContent'},
      ]
    }),
    defineField({
      name: 'finalVerdict',
      title: 'Final Verdict Section',
      type: 'object',
      group: 'review',
      fields: [
        {name: 'summary', title: 'Summary', type: 'blockContent'},
        {name: 'recommendation', title: 'Recommendation', type: 'blockContent'},
        {name: 'whoShouldUse', title: 'Who Should Use This Software', type: 'blockContent'},
        {name: 'whoShouldAvoid', title: 'Who Should Consider Alternatives', type: 'blockContent'},
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
      name: 'automatedContent',
      title: 'Automated Content (for programmatic generation)',
      type: 'object',
      group: 'review',
      hidden: ({document}) => document?.contentMode === 'manual',
      fields: [
        {name: 'overview', title: 'Overview Text', type: 'text'},
        {name: 'featuresAnalysis', title: 'Features Analysis', type: 'text'},
        {name: 'pricingAnalysis', title: 'Pricing Analysis', type: 'text'},
        {name: 'integrationsAnalysis', title: 'Integrations Analysis', type: 'text'},
        {name: 'supportAnalysis', title: 'Support Analysis', type: 'text'},
        {name: 'securityAnalysis', title: 'Security Analysis', type: 'text'},
        {name: 'performanceNotes', title: 'Performance Notes', type: 'text'},
        {name: 'competitorComparison', title: 'Competitor Comparison', type: 'text'},
      ]
    }),
    defineField({
      name: 'manualContent',
      title: 'Manual Review Content (for writers)',
      type: 'blockContent',
      group: 'review',
      hidden: ({document}) => document?.contentMode === 'automated',
      description: 'Write the full review content here with sections, headings, etc.'
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
    defineField({
      name: 'resources',
      title: 'Resource Links',
      type: 'object',
      group: 'support',
      fields: [
        {name: 'documentation', title: 'Documentation URL', type: 'url'},
        {name: 'videoTutorials', title: 'Video Tutorials URL', type: 'url'},
        {name: 'communityForum', title: 'Community Forum URL', type: 'url'},
        {name: 'blog', title: 'Blog URL', type: 'url'},
        {name: 'apiDocs', title: 'API Documentation URL', type: 'url'},
        {name: 'statusPage', title: 'Status Page URL', type: 'url'},
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
      name: 'competitiveAdvantages',
      title: 'Competitive Advantages',
      type: 'array',
      group: 'comparisons',
      of: [{type: 'string'}],
      description: 'Key advantages over competitors'
    }),
    defineField({
      name: 'whenToChoose',
      title: 'When to Choose This Software',
      type: 'text',
      group: 'comparisons',
      description: 'Guidance on when this is the best choice'
    }),
    defineField({
      name: 'whenNotToChoose',
      title: 'When Not to Choose',
      type: 'text',
      group: 'comparisons',
      description: 'When to consider alternatives instead'
    }),
    defineField({
      name: 'comparisonNotes',
      title: 'Comparison Notes',
      type: 'blockContent',
      group: 'comparisons',
      description: 'When to choose this vs alternatives'
    }),

    // ========== FAQs ==========
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      group: 'faq',
      of: [{
        type: 'object',
        fields: [
          {name: 'question', title: 'Question', type: 'string', validation: Rule => Rule.required()},
          {name: 'answer', title: 'Answer', type: 'text', validation: Rule => Rule.required()},
        ],
        preview: {
          select: {
            title: 'question',
            subtitle: 'answer'
          }
        }
      }],
      description: 'Add 8-12 FAQs for better SEO and user experience'
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