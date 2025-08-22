import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'role',
      title: 'Role/Title',
      type: 'string'
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string'
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.min(1).max(5)
    }),
    defineField({
      name: 'software',
      title: 'Related Software',
      type: 'reference',
      to: [{type: 'software'}]
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      media: 'avatar'
    }
  }
})