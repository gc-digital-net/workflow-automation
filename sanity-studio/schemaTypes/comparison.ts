import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comparison',
  title: 'Software Comparison',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
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
      name: 'softwareA',
      title: 'Software A',
      type: 'reference',
      to: [{type: 'software'}],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'softwareB',
      title: 'Software B',
      type: 'reference',
      to: [{type: 'software'}],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'blockContent'
    }),
    defineField({
      name: 'verdict',
      title: 'Verdict',
      type: 'blockContent'
    }),
    defineField({
      name: 'winner',
      title: 'Overall Winner',
      type: 'string',
      options: {
        list: [
          {title: 'Software A', value: 'a'},
          {title: 'Software B', value: 'b'},
          {title: 'Tie', value: 'tie'}
        ]
      }
    }),
    defineField({
      name: 'categoryWinners',
      title: 'Category Winners',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'category', title: 'Category', type: 'string'},
          {name: 'winner', title: 'Winner', type: 'string', options: {
            list: [
              {title: 'Software A', value: 'a'},
              {title: 'Software B', value: 'b'},
              {title: 'Tie', value: 'tie'}
            ]
          }},
          {name: 'notes', title: 'Notes', type: 'text'}
        ]
      }]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime'
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {name: 'metaTitle', title: 'Meta Title', type: 'string', validation: Rule => Rule.max(60)},
        {name: 'metaDescription', title: 'Meta Description', type: 'text', validation: Rule => Rule.max(160)}
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      softwareA: 'softwareA.name',
      softwareB: 'softwareB.name'
    },
    prepare(selection) {
      const {softwareA, softwareB} = selection
      return {...selection, subtitle: `${softwareA} vs ${softwareB}`}
    }
  }
})