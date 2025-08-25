import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Numbered', value: 'number'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
          {title: 'Highlight', value: 'highlight'},
          {title: 'Underline', value: 'underline'},
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
                validation: Rule => Rule.required()
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: false,
                description: 'Opens the link in a new browser tab'
              },
              {
                title: 'Link Relationship',
                name: 'rel',
                type: 'string',
                options: {
                  list: [
                    {title: 'Follow (default)', value: ''},
                    {title: 'No Follow', value: 'nofollow'},
                    {title: 'No Follow + No Opener', value: 'nofollow noopener'},
                    {title: 'Sponsored', value: 'sponsored'},
                    {title: 'UGC (User Generated Content)', value: 'ugc'},
                    {title: 'Sponsored + No Follow', value: 'sponsored nofollow'},
                  ]
                },
                initialValue: '',
                description: 'SEO relationship attribute for the link'
              }
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }
      ]
    }),
    
    // Pros and Cons Block
    defineArrayMember({
      name: 'prosConsBlock',
      title: 'Pros & Cons',
      type: 'object',
      icon: () => '⚖️',
      fields: [
        {
          name: 'title',
          title: 'Title (optional)',
          type: 'string',
        },
        {
          name: 'pros',
          title: 'Pros',
          type: 'array',
          of: [{type: 'string'}],
          validation: Rule => Rule.required().min(1),
        },
        {
          name: 'cons',
          title: 'Cons',
          type: 'array',
          of: [{type: 'string'}],
          validation: Rule => Rule.required().min(1),
        }
      ],
      preview: {
        select: {
          title: 'title',
          pros: 'pros',
          cons: 'cons'
        },
        prepare({title, pros, cons}) {
          const prosCount = pros ? pros.length : 0
          const consCount = cons ? cons.length : 0
          return {
            title: title || 'Pros & Cons',
            subtitle: `${prosCount} pros, ${consCount} cons`
          }
        }
      }
    }),
    
    // Simple Table Block
    defineArrayMember({
      name: 'simpleTable',
      title: 'Simple Table',
      type: 'object',
      icon: () => '📊',
      fields: [
        {
          name: 'title',
          title: 'Table Title (optional)',
          type: 'string',
        },
        {
          name: 'headers',
          title: 'Column Headers',
          type: 'array',
          of: [{type: 'string'}],
          validation: Rule => Rule.required().min(2).max(6),
          description: 'Add 2-6 column headers'
        },
        {
          name: 'rows',
          title: 'Table Rows',
          type: 'array',
          of: [{
            type: 'object',
            name: 'row',
            fields: [
              {
                name: 'cells',
                title: 'Row Cells',
                type: 'array',
                of: [{type: 'string'}],
                validation: Rule => Rule.required()
              }
            ],
            preview: {
              select: {
                cells: 'cells'
              },
              prepare({cells}) {
                return {
                  title: cells ? cells.join(' | ') : 'Empty row'
                }
              }
            }
          }],
          validation: Rule => Rule.required().min(1)
        }
      ],
      preview: {
        select: {
          title: 'title',
          headers: 'headers',
          rows: 'rows'
        },
        prepare({title, headers, rows}) {
          const columnCount = headers ? headers.length : 0
          const rowCount = rows ? rows.length : 0
          return {
            title: title || 'Table',
            subtitle: `${columnCount} columns, ${rowCount} rows`
          }
        }
      }
    }),
    
    // Example/Code Block
    defineArrayMember({
      name: 'exampleBlock',
      title: 'Example',
      type: 'object',
      icon: () => '📝',
      fields: [
        {
          name: 'title',
          title: 'Example Title',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'exampleType',
          title: 'Example Type',
          type: 'string',
          options: {
            list: [
              {title: 'General Example', value: 'example'},
              {title: 'Code Example', value: 'code'},
              {title: 'Step by Step', value: 'steps'},
              {title: 'Use Case', value: 'usecase'},
            ]
          },
          initialValue: 'example'
        },
        {
          name: 'content',
          title: 'Content',
          type: 'text',
          rows: 6,
        },
        {
          name: 'language',
          title: 'Language (for code examples)',
          type: 'string',
          options: {
            list: [
              {title: 'JavaScript', value: 'javascript'},
              {title: 'TypeScript', value: 'typescript'},
              {title: 'Python', value: 'python'},
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'},
              {title: 'JSON', value: 'json'},
              {title: 'Bash', value: 'bash'},
              {title: 'SQL', value: 'sql'},
              {title: 'Plain Text', value: 'text'},
            ]
          },
          hidden: ({parent}) => parent?.exampleType !== 'code'
        }
      ],
      preview: {
        select: {
          title: 'title',
          type: 'exampleType'
        },
        prepare({title, type}) {
          const typeLabel = type === 'code' ? '💻' : '📝'
          return {
            title: title,
            subtitle: `Example block`,
            media: () => typeLabel
          }
        }
      }
    }),
    
    // Callout/Info Blocks
    defineArrayMember({
      name: 'calloutBlock',
      title: 'Callout Box',
      type: 'object',
      icon: () => '💡',
      fields: [
        {
          name: 'calloutType',
          title: 'Callout Type',
          type: 'string',
          options: {
            list: [
              {title: '💡 Tip', value: 'tip'},
              {title: 'ℹ️ Info', value: 'info'},
              {title: '⚠️ Warning', value: 'warning'},
              {title: '🚨 Important', value: 'important'},
              {title: '✅ Success', value: 'success'},
              {title: '📝 Note', value: 'note'},
              {title: '🎯 Key Point', value: 'keypoint'},
            ],
            layout: 'dropdown'
          },
          validation: Rule => Rule.required(),
          initialValue: 'info'
        },
        {
          name: 'title',
          title: 'Title (optional)',
          type: 'string',
        },
        {
          name: 'content',
          title: 'Content',
          type: 'text',
          rows: 4,
          validation: Rule => Rule.required(),
        }
      ],
      preview: {
        select: {
          title: 'title',
          content: 'content',
          type: 'calloutType'
        },
        prepare({title, content, type}) {
          const icons = {
            tip: '💡',
            info: 'ℹ️',
            warning: '⚠️',
            important: '🚨',
            success: '✅',
            note: '📝',
            keypoint: '🎯'
          }
          return {
            title: title || content?.substring(0, 50),
            subtitle: type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Callout',
            media: () => icons[type] || 'ℹ️'
          }
        }
      }
    }),
    
    // Comparison Table
    defineArrayMember({
      name: 'comparisonTable',
      title: 'Comparison Table',
      type: 'object',
      icon: () => '📊',
      fields: [
        {
          name: 'title',
          title: 'Table Title',
          type: 'string',
        },
        {
          name: 'headers',
          title: 'Column Headers',
          type: 'array',
          of: [{type: 'string'}],
          validation: Rule => Rule.required().min(2).max(5),
        },
        {
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'cells',
                title: 'Row Data',
                type: 'array',
                of: [{type: 'string'}]
              }
            ]
          }]
        }
      ],
      preview: {
        select: {
          title: 'title',
          headers: 'headers',
          rows: 'rows'
        },
        prepare({title, headers, rows}) {
          const columnCount = headers ? headers.length : 0
          const rowCount = rows ? rows.length : 0
          return {
            title: title || 'Comparison Table',
            subtitle: `${columnCount} columns × ${rowCount} rows`
          }
        }
      }
    }),
    
    // FAQ Block
    defineArrayMember({
      name: 'faqBlock',
      title: 'FAQ Section',
      type: 'object',
      icon: () => '❓',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Frequently Asked Questions'
        },
        {
          name: 'questions',
          title: 'Questions',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'question',
                title: 'Question',
                type: 'string',
                validation: Rule => Rule.required()
              },
              {
                name: 'answer',
                title: 'Answer',
                type: 'text',
                validation: Rule => Rule.required()
              }
            ]
          }],
          validation: Rule => Rule.required().min(1)
        }
      ],
      preview: {
        select: {
          title: 'title',
          questions: 'questions'
        },
        prepare({title, questions}) {
          const count = questions ? questions.length : 0
          return {
            title: title,
            subtitle: `${count} questions`
          }
        }
      }
    }),
    
    // Video Embed
    defineArrayMember({
      name: 'videoEmbed',
      title: 'Video',
      type: 'object',
      icon: () => '🎥',
      fields: [
        {
          name: 'url',
          title: 'Video URL',
          type: 'url',
          description: 'YouTube or Vimeo URL',
          validation: Rule => Rule.required()
        },
        {
          name: 'caption',
          title: 'Caption (optional)',
          type: 'string'
        }
      ],
      preview: {
        select: {
          url: 'url',
          caption: 'caption'
        },
        prepare({url, caption}) {
          return {
            title: caption || 'Video',
            subtitle: url
          }
        }
      }
    }),
    
    // CTA Button Block
    defineArrayMember({
      name: 'ctaBlock',
      title: 'Call to Action',
      type: 'object',
      icon: () => '🎯',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'text',
          title: 'Text',
          type: 'text',
          rows: 3
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'buttonUrl',
          title: 'Button URL',
          type: 'url',
          validation: Rule => Rule.required()
        },
        {
          name: 'buttonTarget',
          title: 'Open in new tab',
          type: 'boolean',
          initialValue: false,
          description: 'Opens the link in a new browser tab'
        },
        {
          name: 'buttonRel',
          title: 'Link Relationship',
          type: 'string',
          options: {
            list: [
              {title: 'Follow (default)', value: ''},
              {title: 'No Follow', value: 'nofollow'},
              {title: 'Sponsored', value: 'sponsored'},
            ]
          },
          initialValue: ''
        },
        {
          name: 'style',
          title: 'Style',
          type: 'string',
          options: {
            list: [
              {title: 'Primary', value: 'primary'},
              {title: 'Secondary', value: 'secondary'},
              {title: 'Success', value: 'success'},
              {title: 'Gradient', value: 'gradient'}
            ]
          },
          initialValue: 'primary'
        }
      ],
      preview: {
        select: {
          heading: 'heading',
          buttonText: 'buttonText'
        },
        prepare({heading, buttonText}) {
          return {
            title: heading,
            subtitle: `CTA: ${buttonText}`
          }
        }
      }
    }),
    
    // Mini Pricing Table Block
    defineArrayMember({
      name: 'miniPricingTable',
      title: 'Mini Pricing Table',
      type: 'object',
      icon: () => '💰',
      fields: [
        {
          name: 'title',
          title: 'Table Title',
          type: 'string',
          description: 'e.g., "Pricing Plans", "Choose Your Plan"'
        },
        {
          name: 'currency',
          title: 'Currency Symbol',
          type: 'string',
          initialValue: '$',
          validation: Rule => Rule.required()
        },
        {
          name: 'billingPeriod',
          title: 'Billing Period',
          type: 'string',
          options: {
            list: [
              {title: 'Per Month', value: '/month'},
              {title: 'Per Year', value: '/year'},
              {title: 'Per User/Month', value: '/user/month'},
              {title: 'One Time', value: 'one-time'},
              {title: 'Custom', value: 'custom'}
            ]
          },
          initialValue: '/month'
        },
        {
          name: 'plans',
          title: 'Pricing Plans (1-4 plans)',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'name',
                title: 'Plan Name',
                type: 'string',
                validation: Rule => Rule.required(),
                description: 'e.g., "Starter", "Pro", "Enterprise"'
              },
              {
                name: 'price',
                title: 'Price',
                type: 'string',
                validation: Rule => Rule.required(),
                description: 'e.g., "19", "49", "Custom"'
              },
              {
                name: 'originalPrice',
                title: 'Original Price (for discounts)',
                type: 'string',
                description: 'Optional - shows strikethrough price'
              },
              {
                name: 'badge',
                title: 'Badge',
                type: 'string',
                options: {
                  list: [
                    {title: 'None', value: ''},
                    {title: 'Most Popular', value: 'popular'},
                    {title: 'Best Value', value: 'best-value'},
                    {title: 'Limited Time', value: 'limited'},
                    {title: 'New', value: 'new'},
                    {title: 'Recommended', value: 'recommended'}
                  ]
                }
              },
              {
                name: 'description',
                title: 'Short Description',
                type: 'string',
                description: 'e.g., "Perfect for small teams"'
              },
              {
                name: 'features',
                title: 'Features',
                type: 'array',
                of: [{type: 'string'}],
                validation: Rule => Rule.max(6),
                description: 'Up to 6 key features'
              },
              {
                name: 'highlighted',
                title: 'Highlight this plan',
                type: 'boolean',
                initialValue: false,
                description: 'Makes this plan stand out'
              },
              {
                name: 'buttonText',
                title: 'Button Text',
                type: 'string',
                initialValue: 'Get Started'
              },
              {
                name: 'buttonUrl',
                title: 'Button URL',
                type: 'url',
                description: 'Link to signup or more info'
              },
              {
                name: 'buttonTarget',
                title: 'Open in new tab',
                type: 'boolean',
                initialValue: true,
                description: 'Opens link in new tab (recommended for external links)'
              },
              {
                name: 'buttonRel',
                title: 'Link Relationship',
                type: 'string',
                options: {
                  list: [
                    {title: 'Follow (default)', value: ''},
                    {title: 'No Follow', value: 'nofollow'},
                    {title: 'Sponsored', value: 'sponsored'},
                    {title: 'Affiliate', value: 'sponsored nofollow'},
                  ]
                },
                initialValue: '',
                description: 'For affiliate links, use "Affiliate"'
              }
            ],
            preview: {
              select: {
                title: 'name',
                price: 'price',
                badge: 'badge'
              },
              prepare({title, price, badge}) {
                return {
                  title: title,
                  subtitle: `${price}${badge ? ` - ${badge}` : ''}`
                }
              }
            }
          }],
          validation: Rule => Rule.required().min(1).max(4)
        },
        {
          name: 'showFeatures',
          title: 'Show Features List',
          type: 'boolean',
          initialValue: true,
          description: 'Toggle feature list visibility'
        },
        {
          name: 'layout',
          title: 'Layout Style',
          type: 'string',
          options: {
            list: [
              {title: 'Cards (Side by Side)', value: 'cards'},
              {title: 'Compact Table', value: 'table'},
              {title: 'List (Vertical)', value: 'list'}
            ]
          },
          initialValue: 'cards'
        }
      ],
      preview: {
        select: {
          title: 'title',
          plans: 'plans'
        },
        prepare({title, plans}) {
          const planCount = plans ? plans.length : 0
          return {
            title: title || 'Pricing Table',
            subtitle: `${planCount} plan${planCount !== 1 ? 's' : ''}`
          }
        }
      }
    }),
  ],
})