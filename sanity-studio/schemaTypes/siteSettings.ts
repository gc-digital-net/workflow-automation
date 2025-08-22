import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      validation: Rule => Rule.max(160)
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'twitter', title: 'Twitter', type: 'url'},
        {name: 'linkedin', title: 'LinkedIn', type: 'url'},
        {name: 'facebook', title: 'Facebook', type: 'url'},
        {name: 'youtube', title: 'YouTube', type: 'url'}
      ]
    }),
    defineField({
      name: 'newsletterCTA',
      title: 'Newsletter CTA',
      type: 'object',
      fields: [
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'description', title: 'Description', type: 'text'},
        {name: 'buttonText', title: 'Button Text', type: 'string'}
      ]
    }),
    defineField({
      name: 'footer',
      title: 'Footer Content',
      type: 'object',
      fields: [
        {name: 'copyright', title: 'Copyright Text', type: 'string'},
        {name: 'aboutText', title: 'About Text', type: 'text'}
      ]
    }),
    defineField({
      name: 'defaultSEO',
      title: 'Default SEO',
      type: 'object',
      fields: [
        {name: 'metaTitle', title: 'Default Meta Title', type: 'string'},
        {name: 'metaDescription', title: 'Default Meta Description', type: 'text'},
        {name: 'ogImage', title: 'Default OG Image', type: 'image'}
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo'
    }
  }
})