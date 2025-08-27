// Comprehensive Software Review Schema
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'software',
  title: 'Software Review',
  type: 'document',
  groups: [
    { name: 'basic', title: '📝 Basic Info', default: true },
    { name: 'scoring', title: '⭐ Scoring & Ratings' },
    { name: 'automated', title: '🤖 Automated Content' },
    { name: 'features', title: '✨ Features & Details' },
    { name: 'pricing', title: '💰 Pricing' },
    { name: 'company', title: '🏢 Company' },
    { name: 'support', title: '🤝 Support' },
    { name: 'security', title: '🔒 Security' },
    { name: 'technical', title: '⚙️ Technical' },
    { name: 'content', title: '📄 Review Content' },
    { name: 'media', title: '🖼️ Media' },
    { name: 'metadata', title: '🔧 Metadata & SEO' },
  ],
  fields: [
    // ============ BASIC INFO ============
    {
      name: 'name',
      title: 'Software Name',
      type: 'string',
      group: 'basic',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: { source: 'name' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'basic',
      options: { hotspot: true },
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'basic',
      description: 'Short tagline (e.g., "One app to replace them all")',
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'basic',
      rows: 3,
      description: 'Brief description for cards and previews (2-3 sentences)',
    },
    {
      name: 'verdict',
      title: 'One-Line Verdict',
      type: 'string',
      group: 'basic',
      description: 'Quick summary verdict for the software',
    },
    {
      name: 'contentMode',
      title: 'Content Mode',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Automated (AI)', value: 'automated' },
          { title: 'Manual (Rich Text)', value: 'manual' }
        ]
      },
      initialValue: 'automated',
      description: 'Choose between automated AI content or manual rich text editing',
    },

    // ============ SCORING & RATINGS ============
    {
      name: 'overallScore',
      title: 'Overall Score (1-10)',
      type: 'number',
      group: 'scoring',
      validation: (Rule: any) => Rule.min(1).max(10).required(),
    },
    {
      name: 'scores',
      title: 'Detailed Scores',
      type: 'object',
      group: 'scoring',
      fields: [
        { name: 'easeOfUse', title: 'Ease of Use', type: 'number', validation: (Rule: any) => Rule.min(1).max(10) },
        { name: 'features', title: 'Features', type: 'number', validation: (Rule: any) => Rule.min(1).max(10) },
        { name: 'valueForMoney', title: 'Value for Money', type: 'number', validation: (Rule: any) => Rule.min(1).max(10) },
        { name: 'customerSupport', title: 'Customer Support', type: 'number', validation: (Rule: any) => Rule.min(1).max(10) },
      ],
    },
    {
      name: 'userRatings',
      title: 'User Ratings from Review Sites',
      type: 'object',
      group: 'scoring',
      fields: [
        { name: 'g2Score', title: 'G2 Score', type: 'number' },
        { name: 'g2Reviews', title: 'G2 Review Count', type: 'number' },
        { name: 'capterraScore', title: 'Capterra Score', type: 'number' },
        { name: 'capterraReviews', title: 'Capterra Review Count', type: 'number' },
        { name: 'trustRadiusScore', title: 'TrustRadius Score', type: 'number' },
        { name: 'trustRadiusReviews', title: 'TrustRadius Review Count', type: 'number' },
      ],
    },

    // ============ AT-A-GLANCE ============
    {
      name: 'atAGlance',
      title: 'At a Glance',
      type: 'object',
      group: 'automated',
      fields: [
        { name: 'bottomLine', title: 'Bottom Line', type: 'text', rows: 3 },
        { name: 'setupTime', title: 'Setup Time', type: 'string' },
        { name: 'bestForCompanySize', title: 'Best For Company Size', type: 'string' },
        { 
          name: 'industryFocus', 
          title: 'Industry Focus', 
          type: 'array', 
          of: [{ type: 'string' }],
          description: 'List of industries this software is best suited for' 
        },
        { name: 'standoutFeature', title: 'Standout Feature', type: 'string' },
      ],
    },

    // ============ QUICK STATS ============
    {
      name: 'quickStats',
      title: 'Quick Statistics',
      type: 'object',
      group: 'automated',
      fields: [
        { name: 'totalUsers', title: 'Total Users', type: 'string' },
        { name: 'founded', title: 'Founded Year', type: 'number' },
        { name: 'lastFundingRound', title: 'Last Funding Round', type: 'string' },
        { name: 'awards', title: 'Awards', type: 'array', of: [{ type: 'string' }] },
        { name: 'uptimePercentage', title: 'Uptime %', type: 'number' },
      ],
    },

    // ============ AUTOMATED CONTENT ============
    {
      name: 'automatedContent',
      title: 'Automated Review Content',
      type: 'object',
      group: 'automated',
      description: 'AI-generated content sections',
      fields: [
        { name: 'overview', title: 'Overview', type: 'text', rows: 5 },
        { name: 'featuresAnalysis', title: 'Features Analysis', type: 'text', rows: 5 },
        { name: 'pricingAnalysis', title: 'Pricing Analysis', type: 'text', rows: 5 },
        { name: 'integrationsAnalysis', title: 'Integrations Analysis', type: 'text', rows: 5 },
        { name: 'supportAnalysis', title: 'Support Analysis', type: 'text', rows: 5 },
        { name: 'securityAnalysis', title: 'Security Analysis', type: 'text', rows: 5 },
        { name: 'performanceNotes', title: 'Performance Notes', type: 'text', rows: 5 },
        { name: 'competitorComparison', title: 'Competitor Comparison', type: 'text', rows: 5 },
      ],
    },

    // ============ KEY FEATURES ============
    {
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      group: 'features',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Feature Name', type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 2 },
          { name: 'category', title: 'Category', type: 'string' },
        ],
      }],
    },

    // ============ PRICING ============
    {
      name: 'pricing',
      title: 'Pricing Plans',
      type: 'array',
      group: 'pricing',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Plan Name', type: 'string' },
          { name: 'price', title: 'Monthly Price', type: 'number' },
          { name: 'yearlyPrice', title: 'Yearly Price', type: 'number' },
          { name: 'users', title: 'User Limit', type: 'string' },
          { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
          { name: 'highlighted', title: 'Most Popular?', type: 'boolean' },
        ],
      }],
    },
    {
      name: 'pricingDetails',
      title: 'Pricing Details',
      type: 'object',
      group: 'pricing',
      fields: [
        { name: 'hasFreeTier', title: 'Has Free Tier?', type: 'boolean' },
        { name: 'freeTrialDays', title: 'Free Trial Days', type: 'number' },
        { name: 'moneyBackDays', title: 'Money Back Days', type: 'number' },
        { name: 'discounts', title: 'Discounts Available', type: 'text', rows: 2 },
        { name: 'hiddenCosts', title: 'Hidden Costs', type: 'text', rows: 2 },
        { name: 'billingCycle', title: 'Billing Cycles', type: 'array', of: [{ type: 'string' }] },
      ],
    },

    // ============ PROS & CONS ============
    {
      name: 'pros',
      title: 'Pros',
      type: 'array',
      group: 'features',
      of: [{ type: 'string' }],
    },
    {
      name: 'cons',
      title: 'Cons',
      type: 'array',
      group: 'features',
      of: [{ type: 'string' }],
    },

    // ============ BEST FOR / NOT IDEAL FOR ============
    {
      name: 'bestFor',
      title: 'Best For',
      type: 'array',
      group: 'features',
      of: [{ type: 'string' }],
      description: 'Who should use this software',
    },
    {
      name: 'notIdealFor',
      title: 'Not Ideal For',
      type: 'array',
      group: 'features',
      of: [{ type: 'string' }],
      description: 'Who should avoid this software',
    },

    // ============ INTEGRATIONS ============
    {
      name: 'integrations',
      title: 'Integration Details',
      type: 'object',
      group: 'technical',
      fields: [
        { name: 'count', title: 'Total Count', type: 'number' },
        { name: 'native', title: 'Native Integrations', type: 'number' },
        { name: 'categories', title: 'Integration Categories', type: 'array', of: [{ type: 'string' }] },
        { name: 'hasZapier', title: 'Has Zapier?', type: 'boolean' },
        { name: 'hasAPI', title: 'Has API?', type: 'boolean' },
        { name: 'hasWebhooks', title: 'Has Webhooks?', type: 'boolean' },
      ],
    },
    {
      name: 'popularIntegrations',
      title: 'Popular Integrations',
      type: 'array',
      group: 'technical',
      of: [{ type: 'string' }],
      description: 'List the most popular integrations (10-15 max)',
    },

    // ============ COMPANY INFO ============
    {
      name: 'companyInfo',
      title: 'Company Information',
      type: 'object',
      group: 'company',
      fields: [
        { name: 'foundedYear', title: 'Founded Year', type: 'number' },
        { name: 'headquarters', title: 'Headquarters', type: 'string' },
        { name: 'employeeCount', title: 'Employee Count', type: 'string' },
        { name: 'funding', title: 'Funding', type: 'string' },
        { name: 'valuation', title: 'Valuation', type: 'string' },
        { name: 'revenue', title: 'Revenue', type: 'string' },
        { name: 'customers', title: 'Number of Customers', type: 'string' },
        { name: 'website', title: 'Website', type: 'url' },
        { name: 'marketShare', title: 'Market Share', type: 'string' },
        { name: 'notableClients', title: 'Notable Clients', type: 'array', of: [{ type: 'string' }] },
      ],
    },

    // ============ SUPPORT ============
    {
      name: 'support',
      title: 'Support Information',
      type: 'object',
      group: 'support',
      fields: [
        {
          name: 'channels',
          title: 'Support Channels',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'type', title: 'Channel Type', type: 'string' },
              { name: 'availability', title: 'Availability', type: 'string' },
              { name: 'responseTime', title: 'Response Time', type: 'string' },
            ],
          }],
        },
        { name: 'hasKnowledgeBase', title: 'Has Knowledge Base?', type: 'boolean' },
        { name: 'hasCommunityForum', title: 'Has Community Forum?', type: 'boolean' },
        { name: 'hasVideoTutorials', title: 'Has Video Tutorials?', type: 'boolean' },
        { name: 'hasWebinars', title: 'Has Webinars?', type: 'boolean' },
        { name: 'hasCertification', title: 'Has Certification Program?', type: 'boolean' },
        { name: 'professionalServices', title: 'Professional Services Available?', type: 'boolean' },
      ],
    },

    // ============ SECURITY ============
    {
      name: 'security',
      title: 'Security & Compliance',
      type: 'object',
      group: 'security',
      fields: [
        { name: 'certifications', title: 'Certifications', type: 'array', of: [{ type: 'string' }] },
        { name: 'compliance', title: 'Compliance Standards', type: 'array', of: [{ type: 'string' }] },
        { name: 'dataEncryption', title: 'Data Encryption', type: 'string' },
        { name: 'accessControls', title: 'Access Controls', type: 'array', of: [{ type: 'string' }] },
        { name: 'dataResidency', title: 'Data Residency Options', type: 'array', of: [{ type: 'string' }] },
      ],
    },

    // ============ TECHNICAL ============
    {
      name: 'technical',
      title: 'Technical Details',
      type: 'object',
      group: 'technical',
      fields: [
        { name: 'platforms', title: 'Supported Platforms', type: 'array', of: [{ type: 'string' }] },
        { name: 'deployment', title: 'Deployment Options', type: 'array', of: [{ type: 'string' }] },
        { name: 'languages', title: 'Supported Languages', type: 'array', of: [{ type: 'string' }] },
        { name: 'dataLimits', title: 'Data Limits', type: 'string' },
        { name: 'apiRateLimits', title: 'API Rate Limits', type: 'string' },
        { name: 'uptime', title: 'Uptime SLA', type: 'string' },
      ],
    },
    {
      name: 'mobile',
      title: 'Mobile Support',
      type: 'object',
      group: 'technical',
      fields: [
        { name: 'hasIOS', title: 'Has iOS App?', type: 'boolean' },
        { name: 'iosRating', title: 'iOS App Rating', type: 'number' },
        { name: 'hasAndroid', title: 'Has Android App?', type: 'boolean' },
        { name: 'androidRating', title: 'Android App Rating', type: 'number' },
        { name: 'mobileFeatures', title: 'Mobile Features', type: 'array', of: [{ type: 'string' }] },
        { name: 'offlineCapability', title: 'Offline Capability?', type: 'boolean' },
      ],
    },
    {
      name: 'supportedPlatforms',
      title: 'Supported Platforms',
      type: 'array',
      group: 'technical',
      of: [{
        type: 'string',
        options: {
          list: [
            { title: 'Web', value: 'web' },
            { title: 'Windows', value: 'windows' },
            { title: 'macOS', value: 'macos' },
            { title: 'Linux', value: 'linux' },
            { title: 'iOS', value: 'ios' },
            { title: 'Android', value: 'android' },
          ],
        },
      }],
    },
    {
      name: 'deploymentOptions',
      title: 'Deployment Options',
      type: 'array',
      group: 'technical',
      of: [{
        type: 'string',
        options: {
          list: [
            { title: 'Cloud (SaaS)', value: 'cloud' },
            { title: 'On-Premise', value: 'onpremise' },
            { title: 'Hybrid', value: 'hybrid' },
          ],
        },
      }],
    },

    // ============ FAQs ============
    {
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string' },
          { name: 'answer', title: 'Answer', type: 'text' },
        ],
      }],
    },

    // ============ WHEN TO CHOOSE ============
    {
      name: 'whenToChoose',
      title: 'When to Choose This Software',
      type: 'text',
      group: 'features',
      rows: 3,
    },
    {
      name: 'whenNotToChoose',
      title: 'When Not to Choose This Software',
      type: 'text',
      group: 'features',
      rows: 3,
    },

    // ============ MAIN CONTENT (MANUAL MODE) ============
    {
      name: 'content',
      title: 'Main Review Content (Manual Mode)',
      type: 'array',
      group: 'content',
      description: 'Rich text content for manual review writing',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Highlight', value: 'highlight' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        // All custom block types from original schema
        {
          type: 'object',
          name: 'screenshot',
          title: 'Screenshot',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
            {
              name: 'size',
              title: 'Display Size',
              type: 'string',
              options: {
                list: [
                  { title: 'Small', value: 'small' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'Large', value: 'large' },
                  { title: 'Full Width', value: 'full' },
                ],
              },
              initialValue: 'large',
            },
          ],
        },
        {
          type: 'object',
          name: 'prosConsBlock',
          title: 'Pros & Cons',
          fields: [
            {
              name: 'pros',
              title: 'Pros',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'cons',
              title: 'Cons',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
        {
          type: 'object',
          name: 'featureList',
          title: 'Feature List',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Key Features',
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', title: 'Feature Name', type: 'string' },
                    { name: 'description', title: 'Description', type: 'text', rows: 2 },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'object',
          name: 'pricingTable',
          title: 'Pricing Table',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Pricing Plans',
            },
            {
              name: 'plans',
              title: 'Plans',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', title: 'Plan Name', type: 'string' },
                    { name: 'price', title: 'Price', type: 'string' },
                    { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
                    { name: 'highlighted', title: 'Highlight this plan?', type: 'boolean' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    // ============ SCREENSHOT GALLERY ============
    {
      name: 'screenshotGallery',
      title: 'Screenshot Gallery',
      description: 'Additional screenshots for the scrollable gallery (keep to 5-8 for best UX)',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    },

    // ============ QUICK INFO (LEGACY - KEPT FOR COMPATIBILITY) ============
    {
      name: 'quickInfo',
      title: 'Quick Info (Legacy)',
      type: 'object',
      group: 'metadata',
      fields: [
        { name: 'startingPrice', title: 'Starting Price', type: 'string' },
        { name: 'freeTrial', title: 'Free Trial', type: 'string' },
        { name: 'bestFor', title: 'Best For', type: 'string' },
        { name: 'integrations', title: 'Number of Integrations', type: 'string' },
      ],
    },

    // ============ METADATA ============
    {
      name: 'affiliateLink',
      title: 'Affiliate Link',
      type: 'url',
      group: 'metadata',
    },
    {
      name: 'specialDeal',
      title: 'Special Deal',
      type: 'object',
      group: 'metadata',
      fields: [
        { name: 'active', title: 'Deal Active?', type: 'boolean' },
        { name: 'description', title: 'Deal Description', type: 'string' },
        { name: 'code', title: 'Discount Code', type: 'string' },
        { name: 'expires', title: 'Expiry Date', type: 'datetime' },
      ],
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'metadata',
      of: [{ type: 'reference', to: [{ type: 'softwareCategory' }] }],
      description: 'Select the categories this software belongs to',
    },
    {
      name: 'reviewAuthor',
      title: 'Review Author',
      type: 'reference',
      group: 'metadata',
      to: [{ type: 'author' }],
      description: 'The person who reviewed this software',
    },
    {
      name: 'reviewStatus',
      title: 'Review Status',
      type: 'string',
      group: 'metadata',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'In Review', value: 'review' },
          { title: 'Published', value: 'published' },
          { title: 'Needs Update', value: 'update' },
        ],
      },
      initialValue: 'draft',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'metadata',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      group: 'metadata',
    },
    {
      name: 'nextReviewDate',
      title: 'Next Review Date',
      type: 'datetime',
      group: 'metadata',
      description: 'When this review should be updated next',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'metadata',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },

    // Backward compatibility - map old field names
    {
      name: 'excerpt',
      title: 'Excerpt (Legacy - use shortDescription)',
      type: 'text',
      group: 'metadata',
      rows: 3,
      hidden: true,
    },
  ],

  preview: {
    select: {
      title: 'name',
      score: 'overallScore',
      media: 'logo',
      status: 'reviewStatus',
    },
    prepare({ title, score, media, status }: any) {
      const statusEmoji = {
        draft: '📝',
        review: '👀',
        published: '✅',
        update: '🔄',
      };
      return {
        title,
        subtitle: `${statusEmoji[status] || ''} Score: ${score}/10 • Status: ${status || 'draft'}`,
        media,
      };
    },
  },
})