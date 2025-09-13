import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'topSoftware',
  title: 'Top Software Guide',
  type: 'document',
  groups: [
    { name: 'content', title: '📝 Content', default: true },
    { name: 'items', title: '🏆 Ranked Items' },
    { name: 'metadata', title: '📊 Metadata' },
    { name: 'seo', title: '🚀 SEO' },
  ],
  fields: [
    // ============================================
    // CONTENT TAB
    // ============================================
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'e.g., "Best Project Management Software 2025"',
      validation: Rule => Rule.required().max(60)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'content',
      description: 'Optional subtitle for additional context',
      validation: Rule => Rule.max(100)
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Brief description for SEO and previews',
      validation: Rule => Rule.max(160)
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'blockContent',
      group: 'content',
      description: 'Opening content before the list'
    }),
    defineField({
      name: 'methodology',
      title: 'Methodology',
      type: 'blockContent',
      group: 'content',
      description: 'Explain your testing and selection process'
    }),
    defineField({
      name: 'conclusion',
      title: 'Conclusion',
      type: 'blockContent',
      group: 'content',
      description: 'Wrap-up content after the list'
    }),

    // ============================================
    // RANKED ITEMS TAB
    // ============================================
    defineField({
      name: 'listItems',
      title: 'Ranked Software List',
      type: 'array',
      group: 'items',
      of: [{
        type: 'object',
        name: 'listItem',
        title: 'List Item',
        fields: [
          {
            name: 'rank',
            title: 'Rank',
            type: 'number',
            validation: Rule => Rule.required().min(1).max(100),
            description: 'Position in the list (1 = best)'
          },
          {
            name: 'software',
            title: 'Software (from Reviews)',
            type: 'reference',
            to: [{type: 'software'}],
            description: '🔗 Select an existing software review to pull all data from',
            validation: Rule => Rule.required().error('Please select a software or use custom entry')
          },
          // OVERRIDE FIELDS - Only fill these to override the software data
          {
            name: 'overrides',
            title: 'Custom Overrides (Optional)',
            type: 'object',
            description: '⚠️ These fields override data from the selected software review',
            options: {
              collapsible: true,
              collapsed: true
            },
            fields: [
              {
                name: 'customDescription',
                title: 'Custom Description for This Guide',
                type: 'blockContent',
                description: 'Override the default description with guide-specific content'
              },
              {
                name: 'customBestFor',
                title: 'Custom "Best For"',
                type: 'string',
                description: 'e.g., "Small teams under 10 people"'
              },
              {
                name: 'customKeyFeatures',
                title: 'Custom Key Features',
                type: 'array',
                of: [{type: 'string'}],
                description: 'Highlight specific features for this guide'
              },
              {
                name: 'customPros',
                title: 'Custom Pros',
                type: 'array',
                of: [{type: 'string'}],
                description: 'Guide-specific advantages'
              },
              {
                name: 'customCons',
                title: 'Custom Cons',
                type: 'array',
                of: [{type: 'string'}],
                description: 'Guide-specific limitations'
              },
              {
                name: 'customAffiliateLink',
                title: 'Custom Affiliate Link',
                type: 'url',
                description: 'Use a different affiliate link for this guide'
              },
              {
                name: 'specialOffer',
                title: 'Special Offer',
                type: 'string',
                description: 'e.g., "20% off for our readers"'
              }
            ]
          },
          // Context for this specific guide
          {
            name: 'whyThisRank',
            title: 'Why This Rank?',
            type: 'text',
            rows: 3,
            description: 'Brief explanation of why this software earned this position'
          },
          {
            name: 'verdict',
            title: 'Quick Verdict',
            type: 'string',
            description: 'One-line verdict (e.g., "Best overall for enterprise teams")',
            validation: Rule => Rule.max(100)
          }
        ],
        preview: {
          select: {
            rank: 'rank',
            title: 'software.name',
            subtitle: 'verdict',
            media: 'software.logo'
          },
          prepare(selection) {
            const {rank, title, subtitle, media} = selection
            return {
              title: `#${rank} - ${title || 'No software selected'}`,
              subtitle: subtitle || 'No verdict',
              media
            }
          }
        }
      }],
      validation: Rule => Rule.required().min(3).error('Add at least 3 items for a meaningful guide')
    }),

    // ============================================
    // METADATA TAB
    // ============================================
    defineField({
      name: 'trustSignals',
      title: 'Trust Signals',
      type: 'object',
      group: 'metadata',
      description: 'Build credibility with research metrics',
      fields: [
        { name: 'hoursResearched', title: 'Hours Researched', type: 'number' },
        { name: 'expertsConsulted', title: 'Experts Consulted', type: 'number' },
        { name: 'toolsTested', title: 'Tools Tested', type: 'number' },
        { name: 'userReviewsAnalyzed', title: 'User Reviews Analyzed', type: 'number' }
      ]
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'metadata',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'metadata',
      to: [{type: 'author'}],
      description: 'Who wrote this guide?'
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'metadata',
      of: [{type: 'reference', to: [{type: 'category'}]}]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'metadata',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      group: 'metadata',
      description: 'When was this guide last reviewed?'
    }),

    // ============================================
    // SEO TAB
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
          validation: Rule => Rule.max(60),
          description: 'Leave blank to use the main title'
        },
        {
          name: 'metaDescription', 
          title: 'Meta Description', 
          type: 'text', 
          validation: Rule => Rule.max(160),
          description: 'Leave blank to use the excerpt'
        },
        {
          name: 'keywords', 
          title: 'Keywords', 
          type: 'array', 
          of: [{type: 'string'}],
          description: 'Target keywords for this guide'
        },
        {
          name: 'focusKeyword',
          title: 'Focus Keyword',
          type: 'string',
          description: 'Primary keyword to optimize for'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
      items: 'listItems'
    },
    prepare(selection) {
      const {title, author, media, items} = selection
      const itemCount = items ? items.length : 0
      return {
        title,
        subtitle: `${itemCount} items${author ? ` • by ${author}` : ''}`,
        media
      }
    }
  }
})