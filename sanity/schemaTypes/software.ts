import {defineType} from 'sanity'

export const software = defineType({
  name: 'software',
  title: 'Software Review',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Software Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (Rule) => Rule.max(100),
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
      description: 'Brief description for cards and previews',
    },
    {
      name: 'overallScore',
      title: 'Overall Score (1-10)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(10),
    },
    {
      name: 'scores',
      title: '15-Step Framework Scores',
      type: 'object',
      fields: [
        {name: 'easeOfUse', title: 'Ease of Use', type: 'number', validation: (Rule) => Rule.min(1).max(10)},
        {name: 'features', title: 'Feature Set', type: 'number', validation: (Rule) => Rule.min(1).max(10)},
        {name: 'integrations', title: 'Integration Capabilities', type: 'number', validation: (Rule) => Rule.min(1).max(10)},
        {name: 'pricing', title: 'Pricing Value', type: 'number', validation: (Rule) => Rule.min(1).max(10)},
        {name: 'support', title: 'Customer Support', type: 'number', validation: (Rule) => Rule.min(1).max(10)},
        {name: 'security', title: 'Security & Compliance', type: 'number', validation: (Rule) => Rule.min(1).max(10)},
        {name: 'scalability', title: 'Scalability', type: 'number', validation: (Rule) => Rule.min(1).max(10)},
        {name: 'performance', title: 'Performance', type: 'number', validation: (Rule) => Rule.min(1).max(10)},
        {name: 'mobile', title: 'Mobile Access', type: 'number', validation: (Rule) => Rule.min(1).max(10)},
        {name: 'documentation', title: 'Documentation', type: 'number', validation: (Rule) => Rule.min(1).max(10)},
        {name: 'learningCurve', title: 'Learning Curve', type: 'number', validation: (Rule) => Rule.min(1).max(10)},
        {name: 'customization', title: 'Customization', type: 'number', validation: (Rule) => Rule.min(1).max(10)},
        {name: 'reporting', title: 'Reporting & Analytics', type: 'number', validation: (Rule) => Rule.min(1).max(10)},
        {name: 'freeTier', title: 'Free Tier/Trial', type: 'number', validation: (Rule) => Rule.min(1).max(10)},
        {name: 'overallValue', title: 'Overall Value', type: 'number', validation: (Rule) => Rule.min(1).max(10)},
      ],
    },
    {
      name: 'pricing',
      title: 'Pricing Plans',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', title: 'Plan Name', type: 'string'},
            {name: 'price', title: 'Monthly Price', type: 'number'},
            {name: 'yearlyPrice', title: 'Yearly Price', type: 'number'},
            {name: 'features', title: 'Features', type: 'array', of: [{type: 'string'}]},
            {name: 'userLimit', title: 'User Limit', type: 'string'},
            {name: 'storageLimit', title: 'Storage Limit', type: 'string'},
            {name: 'recommended', title: 'Recommended', type: 'boolean'},
            {name: 'mostPopular', title: 'Most Popular', type: 'boolean'},
          ],
        },
      ],
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
      name: 'integrations',
      title: 'Integration Count',
      type: 'number',
    },
    {
      name: 'popularIntegrations',
      title: 'Popular Integrations',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'affiliateLink',
      title: 'Affiliate Link',
      type: 'url',
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
      name: 'reviewStatus',
      title: 'Review Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'In Review', value: 'review'},
          {title: 'Published', value: 'published'},
          {title: 'Needs Update', value: 'update'},
        ],
      },
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'name',
      score: 'overallScore',
      media: 'logo',
      status: 'reviewStatus',
    },
    prepare(selection) {
      const {title, score, status} = selection
      return {
        ...selection,
        subtitle: `Score: ${score}/10 • Status: ${status}`,
      }
    },
  },
})