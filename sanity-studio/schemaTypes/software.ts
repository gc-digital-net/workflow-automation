// Simplified Software Review Schema
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'software',
  title: 'Software Review',
  type: 'document',
  fields: [
    // ============ BASIC INFO ============
    {
      name: 'name',
      title: 'Software Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short tagline (e.g., "One app to replace them all")',
    },
    {
      name: 'excerpt',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for cards and previews (2-3 sentences)',
    },

    // ============ SCORING ============
    {
      name: 'overallScore',
      title: 'Overall Score (1-10)',
      type: 'number',
      validation: (Rule: any) => Rule.min(1).max(10).required(),
    },
    {
      name: 'scores',
      title: 'Detailed Scores',
      type: 'object',
      fields: [
        { name: 'easeOfUse', title: 'Ease of Use', type: 'number', validation: (Rule: any) => Rule.min(1).max(10) },
        { name: 'features', title: 'Features', type: 'number', validation: (Rule: any) => Rule.min(1).max(10) },
        { name: 'value', title: 'Value for Money', type: 'number', validation: (Rule: any) => Rule.min(1).max(10) },
        { name: 'support', title: 'Customer Support', type: 'number', validation: (Rule: any) => Rule.min(1).max(10) },
        { name: 'integrations', title: 'Integrations', type: 'number', validation: (Rule: any) => Rule.min(1).max(10) },
      ],
    },

    // ============ MAIN CONTENT (SIMPLIFIED) ============
    {
      name: 'content',
      title: '📝 Main Review Content',
      type: 'array',
      description: 'Write your full review here. Add headings, text, images, and custom blocks as needed.',
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
        // Inline Screenshot
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
          preview: {
            select: {
              caption: 'caption',
              media: 'image',
            },
            prepare({ caption, media }: any) {
              return {
                title: caption || 'Screenshot',
                media,
              };
            },
          },
        },
        // Pros/Cons Block
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
          preview: {
            prepare() {
              return {
                title: 'Pros & Cons Block',
              };
            },
          },
        },
        // Feature List Block
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
          preview: {
            select: { title: 'title' },
          },
        },
        // Pricing Table Block
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
          preview: {
            select: { title: 'title' },
          },
        },
        // Comparison Table
        {
          type: 'object',
          name: 'comparisonTable',
          title: 'Comparison Table',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'items',
              title: 'Comparison Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'feature', title: 'Feature', type: 'string' },
                    { name: 'thisProduct', title: 'This Product', type: 'string' },
                    { name: 'competitor1', title: 'Competitor 1', type: 'string' },
                    { name: 'competitor2', title: 'Competitor 2', type: 'string' },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { title: 'title' },
          },
        },
        // Call to Action Block
        {
          type: 'object',
          name: 'ctaBlock',
          title: 'Call to Action',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
            },
            {
              name: 'buttonUrl',
              title: 'Button URL',
              type: 'url',
            },
          ],
          preview: {
            select: { title: 'title' },
          },
        },
        // Video Embed Block
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Video',
          fields: [
            {
              name: 'url',
              title: 'Video URL',
              type: 'url',
              description: 'YouTube or Vimeo URL',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
          preview: {
            select: { title: 'caption' },
            prepare({ title }: any) {
              return {
                title: title || 'Video Embed',
              };
            },
          },
        },
        // FAQ Block
        {
          type: 'object',
          name: 'faqBlock',
          title: 'FAQ Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              initialValue: 'Frequently Asked Questions',
            },
            {
              name: 'items',
              title: 'Questions',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'question', title: 'Question', type: 'string' },
                    { name: 'answer', title: 'Answer', type: 'text' },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    },

    // ============ SCREENSHOT GALLERY (SEPARATE) ============
    {
      name: 'screenshotGallery',
      title: '🖼️ Screenshot Gallery',
      description: 'Additional screenshots for the scrollable gallery (keep to 5-8 for best UX)',
      type: 'array',
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

    // ============ QUICK INFO ============
    {
      name: 'quickInfo',
      title: '⚡ Quick Info',
      type: 'object',
      fields: [
        {
          name: 'startingPrice',
          title: 'Starting Price',
          type: 'string',
          description: 'e.g., "$7/user/month" or "Free"',
        },
        {
          name: 'freeTrial',
          title: 'Free Trial',
          type: 'string',
          description: 'e.g., "14 days" or "Free forever plan"',
        },
        {
          name: 'bestFor',
          title: 'Best For',
          type: 'string',
          description: 'e.g., "Small to medium teams"',
        },
        {
          name: 'integrations',
          title: 'Number of Integrations',
          type: 'string',
          description: 'e.g., "1000+" or "50+"',
        },
      ],
    },

    // ============ INTEGRATIONS ============
    {
      name: 'popularIntegrations',
      title: '🔗 Popular Integrations',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List the most popular integrations (10-15 max)',
    },

    // ============ COMPANY INFO ============
    {
      name: 'companyInfo',
      title: '🏢 Company Information',
      type: 'object',
      fields: [
        {
          name: 'founded',
          title: 'Founded Year',
          type: 'string',
          description: 'e.g., "2017"',
        },
        {
          name: 'headquarters',
          title: 'Headquarters',
          type: 'string',
          description: 'e.g., "San Diego, CA"',
        },
        {
          name: 'companySize',
          title: 'Company Size',
          type: 'string',
          description: 'e.g., "500-1000 employees"',
        },
        {
          name: 'funding',
          title: 'Funding',
          type: 'string',
          description: 'e.g., "$538M Series C"',
        },
      ],
    },

    // ============ SUPPORT INFO ============
    {
      name: 'supportInfo',
      title: '🤝 Support Information',
      type: 'object',
      fields: [
        {
          name: 'liveChat',
          title: 'Live Chat',
          type: 'boolean',
        },
        {
          name: 'emailSupport',
          title: 'Email Support',
          type: 'boolean',
        },
        {
          name: 'knowledgeBase',
          title: 'Knowledge Base',
          type: 'boolean',
        },
        {
          name: 'videoTutorials',
          title: 'Video Tutorials',
          type: 'boolean',
        },
        {
          name: 'supportDetails',
          title: 'Support Details',
          type: 'text',
          rows: 2,
        },
      ],
    },

    // ============ SECURITY ============
    {
      name: 'securityInfo',
      title: '🔒 Security & Compliance',
      type: 'object',
      fields: [
        {
          name: 'soc2',
          title: 'SOC 2 Certified',
          type: 'boolean',
        },
        {
          name: 'gdpr',
          title: 'GDPR Compliant',
          type: 'boolean',
        },
        {
          name: 'ssl',
          title: 'SSL Encryption',
          type: 'boolean',
        },
        {
          name: 'uptime',
          title: 'Uptime SLA',
          type: 'string',
          description: 'e.g., "99.9%"',
        },
        {
          name: 'otherCertifications',
          title: 'Other Certifications',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },

    // ============ METADATA ============
    {
      name: 'affiliateLink',
      title: 'Affiliate Link',
      type: 'url',
    },
    {
      name: 'affiliateLinkOptions',
      title: 'Affiliate Link Options',
      type: 'object',
      fields: [
        {
          name: 'openInNewTab',
          title: 'Open in New Tab',
          type: 'boolean',
          initialValue: true,
          description: 'Opens link in a new browser tab'
        },
        {
          name: 'rel',
          title: 'Link Relationship',
          type: 'string',
          options: {
            list: [
              {title: 'Follow (default)', value: ''},
              {title: 'No Follow', value: 'nofollow'},
              {title: 'Sponsored', value: 'sponsored'},
              {title: 'Sponsored + No Follow', value: 'sponsored nofollow'},
            ]
          },
          initialValue: 'sponsored',
          description: 'SEO relationship attribute for the affiliate link'
        }
      ]
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
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
      ],
    },
  ],

  preview: {
    select: {
      title: 'name',
      score: 'overallScore',
      media: 'logo',
    },
    prepare({ title, score, media }: any) {
      return {
        title,
        subtitle: score ? `Score: ${score}/10` : 'Draft',
        media,
      };
    },
  },
})