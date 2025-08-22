import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'software',
  title: 'Software Review',
  type: 'document',
  groups: [
    {name: 'basic', title: 'Basic Info'},
    {name: 'review', title: 'Review Content'},
    {name: 'scores', title: 'Scores & Ratings'},
    {name: 'pricing', title: 'Pricing'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Basic Information
    defineField({
      name: 'name',
      title: 'Software Name',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'basic',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.max(100)
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'basic',
      validation: Rule => Rule.max(200)
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'basic',
      of: [{type: 'reference', to: [{type: 'category'}]}]
    }),
    
    // Review Content
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'blockContent',
      group: 'review'
    }),
    defineField({
      name: 'detailedReview',
      title: 'Detailed Review',
      type: 'blockContent',
      group: 'review'
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      group: 'review',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      group: 'review',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      group: 'review',
      of: [{
        type: 'image',
        options: {hotspot: true},
        fields: [
          {name: 'caption', type: 'string', title: 'Caption'},
          {name: 'alt', type: 'string', title: 'Alt Text'}
        ]
      }]
    }),
    
    // Scoring
    defineField({
      name: 'overallScore',
      title: 'Overall Score (1-10)',
      type: 'number',
      group: 'scores',
      validation: Rule => Rule.required().min(1).max(10)
    }),
    defineField({
      name: 'scores',
      title: 'Detailed Scores',
      type: 'object',
      group: 'scores',
      fields: [
        {name: 'easeOfUse', title: 'Ease of Use', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'features', title: 'Features', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'integrations', title: 'Integrations', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'pricing', title: 'Value for Money', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'support', title: 'Customer Support', type: 'number', validation: Rule => Rule.min(1).max(10)},
        {name: 'performance', title: 'Performance', type: 'number', validation: Rule => Rule.min(1).max(10)}
      ]
    }),
    
    // Pricing
    defineField({
      name: 'pricing',
      title: 'Pricing Plans',
      type: 'array',
      group: 'pricing',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', title: 'Plan Name', type: 'string'},
          {name: 'price', title: 'Monthly Price', type: 'number'},
          {name: 'yearlyPrice', title: 'Yearly Price', type: 'number'},
          {name: 'features', title: 'Features', type: 'array', of: [{type: 'string'}]},
          {name: 'recommended', title: 'Recommended', type: 'boolean'}
        ]
      }]
    }),
    defineField({
      name: 'affiliateLink',
      title: 'Affiliate Link',
      type: 'url',
      group: 'pricing'
    }),
    defineField({
      name: 'hasFreeTrial',
      title: 'Has Free Trial',
      type: 'boolean',
      group: 'pricing'
    }),
    
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        {name: 'metaTitle', title: 'Meta Title', type: 'string', validation: Rule => Rule.max(60)},
        {name: 'metaDescription', title: 'Meta Description', type: 'text', validation: Rule => Rule.max(160)},
        {name: 'keywords', title: 'Keywords', type: 'array', of: [{type: 'string'}]}
      ]
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      group: 'seo'
    })
  ],
  preview: {
    select: {
      title: 'name',
      score: 'overallScore',
      media: 'logo'
    },
    prepare(selection) {
      const {title, score} = selection
      return {...selection, subtitle: score ? `Score: ${score}/10` : 'No score'}
    }
  }
})