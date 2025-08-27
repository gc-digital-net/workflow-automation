import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'softwareCategory',
  title: 'Software Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of this software category',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Icon for this category (optional)',
    }),
    defineField({
      name: 'color',
      title: 'Color Theme',
      type: 'string',
      description: 'Color for category badges and highlights',
      options: {
        list: [
          {title: 'Blue', value: 'blue'},
          {title: 'Green', value: 'green'},
          {title: 'Purple', value: 'purple'},
          {title: 'Orange', value: 'orange'},
          {title: 'Pink', value: 'pink'},
          {title: 'Indigo', value: 'indigo'},
          {title: 'Yellow', value: 'yellow'},
          {title: 'Red', value: 'red'},
          {title: 'Gray', value: 'gray'},
        ],
      },
      initialValue: 'blue',
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'softwareCategory'}],
      description: 'Optional parent category for subcategories',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this category appears (lower numbers first)',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Category',
      type: 'boolean',
      description: 'Show this category prominently on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
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
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'icon',
      featured: 'featured',
    },
    prepare({title, subtitle, media, featured}) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
})