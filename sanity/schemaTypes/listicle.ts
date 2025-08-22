import {defineType} from 'sanity'

export const listicle = defineType({
  name: 'listicle',
  title: 'Listicle Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    },
    {
      name: 'introduction',
      title: 'Introduction',
      type: 'blockContent',
      description: 'Opening content before the list items',
    },
    {
      name: 'listItems',
      title: 'List Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'listItem',
          title: 'List Item',
          fields: [
            {
              name: 'rank',
              title: 'Rank',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'software',
              title: 'Software Reference',
              type: 'reference',
              to: [{type: 'software'}],
            },
            {
              name: 'customTitle',
              title: 'Custom Title (if not using software reference)',
              type: 'string',
              description: 'Use this if the item is not in your software database',
            },
            {
              name: 'customLogo',
              title: 'Custom Logo',
              type: 'image',
              description: 'Use if not referencing existing software',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'blockContent',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'keyFeatures',
              title: 'Key Features',
              type: 'array',
              of: [{type: 'string'}],
            },
            {
              name: 'pricing',
              title: 'Pricing Summary',
              type: 'string',
            },
            {
              name: 'pros',
              title: 'Pros',
              type: 'array',
              of: [{type: 'string'}],
            },
            {
              name: 'cons',
              title: 'Cons',
              type: 'array',
              of: [{type: 'string'}],
            },
            {
              name: 'bestFor',
              title: 'Best For',
              type: 'string',
              description: 'Who this software is best suited for',
            },
            {
              name: 'affiliateLink',
              title: 'Affiliate Link',
              type: 'url',
            },
            {
              name: 'dealInfo',
              title: 'Special Deal Info',
              type: 'string',
              description: 'Any special offers or discounts',
            },
          ],
          preview: {
            select: {
              rank: 'rank',
              title: 'software.name',
              customTitle: 'customTitle',
              media: 'software.logo',
            },
            prepare(selection) {
              const {rank, title, customTitle, media} = selection
              return {
                title: `${rank}. ${title || customTitle}`,
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'conclusion',
      title: 'Conclusion',
      type: 'blockContent',
      description: 'Closing content after the list',
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    },
    {
      name: 'updatedAt',
      title: 'Updated Date',
      type: 'datetime',
    },
    {
      name: 'methodology',
      title: 'Selection Methodology',
      type: 'blockContent',
      description: 'Explain how you selected and ranked these tools',
    },
    {
      name: 'faq',
      title: 'FAQ Section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', title: 'Question', type: 'string'},
            {name: 'answer', title: 'Answer', type: 'blockContent'},
          ],
        },
      ],
    },
    {
      name: 'relatedListicles',
      title: 'Related Listicles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'listicle'}]}],
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
    },
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedDateDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {author} = selection
      return {
        ...selection,
        subtitle: author && `by ${author}`,
      }
    },
  },
})