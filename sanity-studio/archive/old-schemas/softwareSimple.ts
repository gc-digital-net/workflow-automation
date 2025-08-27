// Simplified Software Review Schema without groups for testing
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'softwareSimple',
  title: 'Software Review (Simple)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Software Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing Plans (Document Level)',
      description: 'This creates the nice pricing cards at the top of the review',
      type: 'array',
      of: [{
        type: 'object',
        title: 'Pricing Plan',
        fields: [
          defineField({
            name: 'name',
            title: 'Plan Name',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'price',
            title: 'Monthly Price (use 0 for Free, null for Custom)',
            type: 'number',
          }),
          defineField({
            name: 'yearlyPrice',
            title: 'Yearly Price',
            type: 'number',
          }),
          defineField({
            name: 'userLimit',
            title: 'User Limit',
            type: 'string',
          }),
          defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }]
          }),
          defineField({
            name: 'highlighted',
            title: 'Most Popular?',
            type: 'boolean',
            initialValue: false
          }),
        ],
        preview: {
          select: {
            title: 'name',
            price: 'price',
            highlighted: 'highlighted'
          },
          prepare(selection: any) {
            const {title, price, highlighted} = selection
            return {
              title: highlighted ? `⭐ ${title}` : title,
              subtitle: price === 0 ? 'Free' : price === null ? 'Custom' : `$${price}/month`
            }
          }
        }
      }],
    }),
    defineField({
      name: 'content',
      title: 'Review Content (with content blocks)',
      description: 'This is where the pricingTable blocks live',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'object',
          name: 'pricingTable',
          title: 'Pricing Table (Content Block)',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string'
            }),
            defineField({
              name: 'plans',
              title: 'Plans',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  { name: 'name', title: 'Plan Name', type: 'string' },
                  { name: 'price', title: 'Price', type: 'string' },
                  { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
                  { name: 'highlighted', title: 'Highlighted?', type: 'boolean' }
                ]
              }]
            })
          ]
        }
      ]
    })
  ]
})