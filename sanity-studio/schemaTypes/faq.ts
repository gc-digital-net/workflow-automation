import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'blockContent',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}]
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this FAQ prominently'
    })
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category.name'
    },
    prepare(selection) {
      const {category} = selection
      return {...selection, subtitle: category || 'General'}
    }
  }
})