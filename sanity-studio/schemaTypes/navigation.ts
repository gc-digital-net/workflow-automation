import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Navigation Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'id',
      title: 'Navigation ID',
      type: 'slug',
      options: {
        source: 'title'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'link',
            title: 'Link',
            type: 'string',
            description: 'Use relative paths like /reviews or /blog'
          },
          {
            name: 'external',
            title: 'External Link',
            type: 'boolean',
            description: 'Opens in new tab'
          },
          {
            name: 'children',
            title: 'Dropdown Items',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                {name: 'label', title: 'Label', type: 'string'},
                {name: 'link', title: 'Link', type: 'string'}
              ]
            }]
          }
        ],
        preview: {
          select: {
            title: 'label',
            subtitle: 'link'
          }
        }
      }]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'id.current'
    }
  }
})