import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'listicle',
  title: 'Listicle Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(60)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: Rule => Rule.max(160)
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'blockContent'
    }),
    defineField({
      name: 'listItems',
      title: 'List Items',
      type: 'array',
      of: [{
        type: 'object',
        name: 'listItem',
        title: 'List Item',
        fields: [
          {
            name: 'rank',
            title: 'Rank',
            type: 'number',
            validation: Rule => Rule.required().min(1)
          },
          {
            name: 'software',
            title: 'Software Reference',
            type: 'reference',
            to: [{type: 'software'}]
          },
          {
            name: 'customTitle',
            title: 'Custom Title (if not using software reference)',
            type: 'string'
          },
          {
            name: 'description',
            title: 'Description',
            type: 'blockContent'
          },
          {
            name: 'keyFeatures',
            title: 'Key Features',
            type: 'array',
            of: [{type: 'string'}]
          },
          {
            name: 'bestFor',
            title: 'Best For',
            type: 'string'
          },
          {
            name: 'affiliateLink',
            title: 'Affiliate Link Override',
            type: 'url'
          }
        ],
        preview: {
          select: {
            rank: 'rank',
            title: 'software.name',
            customTitle: 'customTitle'
          },
          prepare(selection) {
            const {rank, title, customTitle} = selection
            return {
              title: `${rank}. ${title || customTitle || 'Untitled'}`
            }
          }
        }
      }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'conclusion',
      title: 'Conclusion',
      type: 'blockContent'
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}]
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {name: 'metaTitle', title: 'Meta Title', type: 'string', validation: Rule => Rule.max(60)},
        {name: 'metaDescription', title: 'Meta Description', type: 'text', validation: Rule => Rule.max(160)},
        {name: 'keywords', title: 'Keywords', type: 'array', of: [{type: 'string'}]}
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage'
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    }
  }
})