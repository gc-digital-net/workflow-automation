// Clean Software Review Schema - Simplified and Organized
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'software',
  title: 'Software Review',
  type: 'document',
  // Using groups for organization (tabs in Sanity Studio)
  groups: [
    { name: 'basic', title: '📝 Basic Info', default: true },
    { name: 'review', title: '📄 Review Content' },
    { name: 'scoring', title: '⭐ Ratings' },
    { name: 'pricing', title: '💰 Pricing' },
    { name: 'details', title: '🔧 Details' },
    { name: 'seo', title: '🚀 SEO' },
  ],
  
  fields: [
    // ============================================
    // BASIC INFO - Essential fields
    // ============================================
    defineField({
      name: 'name',
      title: 'Software Name',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.required(),
    }),
    
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'basic',
      options: { source: 'name' },
      validation: Rule => Rule.required(),
    }),
    
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'basic',
      options: { hotspot: true },
    }),
    
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'basic',
      description: 'Short tagline (e.g., "One app to replace them all")',
      validation: Rule => Rule.max(100),
    }),
    
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'basic',
      rows: 3,
      description: 'Brief description for cards and previews (2-3 sentences)',
      validation: Rule => Rule.max(300),
    }),
    
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'basic',
      of: [{ type: 'reference', to: [{ type: 'softwareCategory' }] }],
    }),
    
    // ============================================
    // REVIEW CONTENT - The main review
    // ============================================
    defineField({
      name: 'content',
      title: 'Review Content',
      type: 'array',
      group: 'review',
      description: 'Build your review using content blocks',
      of: [
        // Standard text blocks
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Code', value: 'code' }
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
                    validation: Rule => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  }
                ]
              }
            ]
          }
        },
        
        // Info boxes for callouts
        {
          type: 'object',
          name: 'infoBox',
          title: 'Info Box',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Info', value: 'info' },
                  { title: 'Tip', value: 'tip' },
                  { title: 'Warning', value: 'warning' },
                  { title: 'Success', value: 'success' },
                  { title: 'Highlight', value: 'highlight' },
                  { title: 'Verdict', value: 'verdict' }
                ]
              }
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{ type: 'block' }]
            }
          ],
          preview: {
            select: { title: 'title', type: 'type' },
            prepare: ({ title, type }) => ({
              title: title || `${type} Box`,
              subtitle: type
            })
          }
        },
        
        // Pros and cons block
        {
          type: 'object',
          name: 'prosConsBlock',
          title: 'Pros & Cons',
          fields: [
            {
              name: 'pros',
              title: 'Pros',
              type: 'array',
              of: [{ type: 'string' }]
            },
            {
              name: 'cons',
              title: 'Cons',
              type: 'array',
              of: [{ type: 'string' }]
            }
          ]
        },
        
        // Features list
        {
          type: 'object',
          name: 'featureList',
          title: 'Feature List',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  { name: 'name', title: 'Feature Name', type: 'string' },
                  { name: 'description', title: 'Description', type: 'text' }
                ]
              }]
            }
          ]
        },
        
        // FAQ block
        {
          type: 'object',
          name: 'faqBlock',
          title: 'FAQ Section',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Frequently Asked Questions'
            },
            {
              name: 'items',
              title: 'Questions & Answers',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  { name: 'question', title: 'Question', type: 'string' },
                  { name: 'answer', title: 'Answer', type: 'text' }
                ]
              }]
            }
          ]
        },
        
        // Image/screenshot
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }
          ]
        },
        
        // Screenshot block (for existing content compatibility)
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
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
            {
              name: 'alt',
              title: 'Alt Text',
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
                  { title: 'Full Width', value: 'full' }
                ]
              },
              initialValue: 'large'
            }
          ],
          preview: {
            select: {
              media: 'image',
              caption: 'caption'
            },
            prepare({media, caption}) {
              return {
                title: caption || 'Screenshot',
                media
              }
            }
          }
        },
        
        // Pricing Table Block (for content blocks)
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
                  preview: {
                    select: {
                      title: 'name',
                      price: 'price',
                      highlighted: 'highlighted'
                    },
                    prepare({title, price, highlighted}) {
                      return {
                        title: highlighted ? `⭐ ${title}` : title,
                        subtitle: price
                      }
                    }
                  }
                },
              ],
            },
          ],
          preview: {
            select: { title: 'title', plans: 'plans' },
            prepare({title, plans}) {
              const count = plans ? plans.length : 0
              return {
                title: title || 'Pricing Table',
                subtitle: `${count} plan${count !== 1 ? 's' : ''}`
              }
            }
          },
        }
      ]
    }),
    
    // ============================================
    // SCORING - Review scores and ratings
    // ============================================
    defineField({
      name: 'overallScore',
      title: 'Overall Score (1-10)',
      type: 'number',
      group: 'scoring',
      validation: Rule => Rule.required().min(1).max(10).precision(1),
    }),
    
    defineField({
      name: 'scores',
      title: 'Detailed Scores',
      type: 'object',
      group: 'scoring',
      fields: [
        {
          name: 'easeOfUse',
          title: 'Ease of Use',
          type: 'number',
          validation: Rule => Rule.min(1).max(10).precision(1)
        },
        {
          name: 'features',
          title: 'Features',
          type: 'number',
          validation: Rule => Rule.min(1).max(10).precision(1)
        },
        {
          name: 'valueForMoney',
          title: 'Value for Money',
          type: 'number',
          validation: Rule => Rule.min(1).max(10).precision(1)
        },
        {
          name: 'customerSupport',
          title: 'Customer Support',
          type: 'number',
          validation: Rule => Rule.min(1).max(10).precision(1)
        },
        {
          name: 'integrations',
          title: 'Integrations',
          type: 'number',
          validation: Rule => Rule.min(1).max(10).precision(1)
        },
        {
          name: 'support',
          title: 'Support',
          type: 'number',
          validation: Rule => Rule.min(1).max(10).precision(1)
        },
        {
          name: 'value',
          title: 'Value',
          type: 'number',
          validation: Rule => Rule.min(1).max(10).precision(1)
        }
      ]
    }),
    
    defineField({
      name: 'pros',
      title: 'Main Pros',
      type: 'array',
      group: 'scoring',
      of: [{ type: 'string' }],
      description: 'Key advantages (shown in summary sections)',
    }),
    
    defineField({
      name: 'cons',
      title: 'Main Cons',
      type: 'array',
      group: 'scoring',
      of: [{ type: 'string' }],
      description: 'Key disadvantages (shown in summary sections)',
    }),
    
    defineField({
      name: 'bestFor',
      title: 'Best For',
      type: 'array',
      group: 'scoring',
      of: [{ type: 'string' }],
      description: 'Who should use this software',
    }),
    
    defineField({
      name: 'notIdealFor',
      title: 'Not Ideal For',
      type: 'array',
      group: 'scoring',
      of: [{ type: 'string' }],
      description: 'Who should avoid this software',
    }),
    
    // ============================================
    // PRICING - Single source of truth for pricing
    // ============================================
    defineField({
      name: 'pricing',
      title: 'Pricing Plans',
      type: 'array',
      group: 'pricing',
      description: 'Add all pricing plans (creates the pricing cards display)',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'name',
            title: 'Plan Name',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'price',
            title: 'Monthly Price',
            type: 'number',
            description: 'Use 0 for Free, leave empty for Custom pricing'
          },
          {
            name: 'yearlyPrice',
            title: 'Yearly Price (optional)',
            type: 'number',
          },
          {
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
            validation: Rule => Rule.min(3).max(10)
          },
          {
            name: 'highlighted',
            title: 'Most Popular?',
            type: 'boolean',
            description: 'Highlight this plan as recommended',
            initialValue: false
          },
          {
            name: 'userLimit',
            title: 'User Limit (optional)',
            type: 'string',
            description: 'e.g., "Up to 5 users" or "Unlimited"'
          }
        ],
        preview: {
          select: {
            title: 'name',
            price: 'price',
            highlighted: 'highlighted'
          },
          prepare({ title, price, highlighted }) {
            const priceText = price === 0 ? 'Free' : 
                            price === null || price === undefined ? 'Custom' : 
                            `$${price}/mo`
            return {
              title: highlighted ? `⭐ ${title}` : title,
              subtitle: priceText
            }
          }
        }
      }]
    }),
    
    defineField({
      name: 'hasFreeTrial',
      title: 'Has Free Trial?',
      type: 'boolean',
      group: 'pricing',
      initialValue: false,
    }),
    
    defineField({
      name: 'freeTrialDays',
      title: 'Free Trial Days',
      type: 'number',
      group: 'pricing',
      hidden: ({ parent }) => !parent?.hasFreeTrial,
    }),
    
    // ============================================
    // DETAILS - Additional information
    // ============================================
    defineField({
      name: 'companyInfo',
      title: 'Company Information',
      type: 'object',
      group: 'details',
      fields: [
        { name: 'founded', title: 'Founded Year', type: 'number' },
        { name: 'headquarters', title: 'Headquarters', type: 'string' },
        { name: 'companySize', title: 'Company Size', type: 'string' },
        { name: 'funding', title: 'Funding', type: 'string' }
      ]
    }),
    
    defineField({
      name: 'popularIntegrations',
      title: 'Popular Integrations',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      description: 'List 10-15 popular integrations',
    }),
    
    defineField({
      name: 'supportInfo',
      title: 'Support Information',
      type: 'object',
      group: 'details',
      fields: [
        { name: 'liveChat', title: 'Live Chat?', type: 'boolean' },
        { name: 'emailSupport', title: 'Email Support?', type: 'boolean' },
        { name: 'phoneSupport', title: 'Phone Support?', type: 'boolean' },
        { name: 'knowledgeBase', title: 'Knowledge Base?', type: 'boolean' },
        { name: 'responseTime', title: 'Avg Response Time', type: 'string' },
        { name: 'supportDetails', title: 'Support Details', type: 'text', rows: 3 },
        { name: 'videoTutorials', title: 'Video Tutorials?', type: 'boolean' }
      ]
    }),
    
    defineField({
      name: 'securityInfo',
      title: 'Security & Compliance',
      type: 'object',
      group: 'details',
      fields: [
        {
          name: 'certifications',
          title: 'Certifications',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'e.g., SOC 2, ISO 27001, HIPAA'
        },
        { name: 'dataEncryption', title: 'Data Encryption', type: 'string' },
        { name: 'gdprCompliant', title: 'GDPR Compliant?', type: 'boolean' },
        { name: 'gdpr', title: 'GDPR', type: 'boolean' },
        { name: 'soc2', title: 'SOC 2', type: 'boolean' },
        { name: 'ssl', title: 'SSL', type: 'boolean' },
        { name: 'uptime', title: 'Uptime', type: 'string' },
        { 
          name: 'otherCertifications', 
          title: 'Other Certifications', 
          type: 'array', 
          of: [{ type: 'string' }] 
        }
      ]
    }),
    
    defineField({
      name: 'platformInfo',
      title: 'Platform & Availability',
      type: 'object',
      group: 'details',
      fields: [
        {
          name: 'webApp',
          title: 'Web Application',
          type: 'boolean',
          description: 'Available as web browser application',
          initialValue: true
        },
        {
          name: 'mobileApps',
          title: 'Mobile Apps',
          type: 'object',
          fields: [
            { name: 'ios', title: 'iOS App', type: 'boolean' },
            { name: 'android', title: 'Android App', type: 'boolean' }
          ]
        },
        {
          name: 'desktopApps',
          title: 'Desktop Apps',
          type: 'object',
          fields: [
            { name: 'windows', title: 'Windows', type: 'boolean' },
            { name: 'mac', title: 'macOS', type: 'boolean' },
            { name: 'linux', title: 'Linux', type: 'boolean' }
          ]
        },
        {
          name: 'browserExtensions',
          title: 'Browser Extensions',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Chrome', value: 'Chrome' },
              { title: 'Firefox', value: 'Firefox' },
              { title: 'Safari', value: 'Safari' },
              { title: 'Edge', value: 'Edge' }
            ]
          }
        },
        {
          name: 'api',
          title: 'API Access',
          type: 'object',
          fields: [
            { name: 'rest', title: 'REST API', type: 'boolean' },
            { name: 'graphql', title: 'GraphQL API', type: 'boolean' },
            { name: 'webhooks', title: 'Webhooks', type: 'boolean' }
          ]
        },
        {
          name: 'deploymentOptions',
          title: 'Deployment Options',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Cloud (SaaS)', value: 'Cloud (SaaS)' },
              { title: 'On-Premise', value: 'On-Premise' },
              { title: 'Hybrid', value: 'Hybrid' },
              { title: 'Private Cloud', value: 'Private Cloud' }
            ]
          }
        }
      ]
    }),
    
    defineField({
      name: 'screenshotGallery',
      title: 'Screenshot Gallery',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', title: 'Caption', type: 'string' },
            { name: 'alt', title: 'Alt Text', type: 'string' }
          ]
        }
      ]
    }),
    
    defineField({
      name: 'affiliateLink',
      title: 'Affiliate Link',
      type: 'url',
      group: 'details',
      description: 'Your affiliate link for this software',
    }),
    
    // ============================================
    // SEO - Metadata and SEO fields
    // ============================================
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.max(160)
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    }),
    
    defineField({
      name: 'reviewStatus',
      title: 'Review Status',
      type: 'string',
      group: 'seo',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Needs Update', value: 'update' }
        ]
      },
      initialValue: 'draft',
    }),
    
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'seo',
    }),
    
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      group: 'seo',
    }),
    
    // Additional fields for compatibility
    defineField({
      name: 'affiliateLinkOptions',
      title: 'Affiliate Link Options',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'openInNewTab', title: 'Open in New Tab', type: 'boolean', initialValue: true }
      ]
    }),
    
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'basic',
      rows: 3,
      description: 'Custom excerpt for SEO and previews'
    }),
    
    defineField({
      name: 'lastReviewUpdate',
      title: 'Last Review Update',
      type: 'datetime',
      group: 'seo',
    }),
    
    defineField({
      name: 'quickInfo',
      title: 'Quick Info',
      type: 'object',
      group: 'basic',
      fields: [
        { name: 'bestFor', title: 'Best For', type: 'string' },
        { name: 'freeTrial', title: 'Free Trial', type: 'string' },
        { name: 'integrations', title: 'Integrations', type: 'string' },
        { name: 'startingPrice', title: 'Starting Price', type: 'string' }
      ]
    }),
    
    defineField({
      name: 'reviewAuthor',
      title: 'Review Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'seo',
    }),
    
    defineField({
      name: 'reviewDate',
      title: 'Review Date',
      type: 'datetime',
      group: 'seo',
    }),
  ],
  
  // Preview configuration
  preview: {
    select: {
      title: 'name',
      score: 'overallScore',
      media: 'logo',
      status: 'reviewStatus'
    },
    prepare({ title, score, media, status }) {
      const statusEmoji = {
        draft: '📝',
        published: '✅',
        update: '🔄'
      }
      return {
        title: `${statusEmoji[status] || ''} ${title}`,
        subtitle: score ? `Score: ${score}/10` : 'No score',
        media
      }
    }
  }
})