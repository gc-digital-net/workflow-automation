import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'userReview',
  title: 'User Review',
  type: 'document',
  fields: [
    defineField({
      name: 'software',
      title: 'Software',
      type: 'reference',
      to: [{ type: 'software' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'reviewerName',
      title: 'Reviewer Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'reviewerEmail',
      title: 'Reviewer Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    }),
    defineField({
      name: 'reviewerRole',
      title: 'Job Title/Role',
      type: 'string'
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string'
    }),
    defineField({
      name: 'companySize',
      title: 'Company Size',
      type: 'string',
      options: {
        list: [
          { title: '1-10 employees', value: 'small' },
          { title: '11-50 employees', value: 'medium' },
          { title: '51-200 employees', value: 'large' },
          { title: '201-500 employees', value: 'xlarge' },
          { title: '500+ employees', value: 'enterprise' }
        ]
      }
    }),
    defineField({
      name: 'rating',
      title: 'Overall Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
      options: {
        list: [
          { title: '⭐ 1 Star', value: 1 },
          { title: '⭐⭐ 2 Stars', value: 2 },
          { title: '⭐⭐⭐ 3 Stars', value: 3 },
          { title: '⭐⭐⭐⭐ 4 Stars', value: 4 },
          { title: '⭐⭐⭐⭐⭐ 5 Stars', value: 5 }
        ]
      }
    }),
    defineField({
      name: 'categoryRatings',
      title: 'Category Ratings',
      type: 'object',
      fields: [
        { name: 'easeOfUse', title: 'Ease of Use', type: 'number', validation: Rule => Rule.min(1).max(5) },
        { name: 'features', title: 'Features', type: 'number', validation: Rule => Rule.min(1).max(5) },
        { name: 'valueForMoney', title: 'Value for Money', type: 'number', validation: Rule => Rule.min(1).max(5) },
        { name: 'customerSupport', title: 'Customer Support', type: 'number', validation: Rule => Rule.min(1).max(5) }
      ]
    }),
    defineField({
      name: 'usageLength',
      title: 'How long have you used this software?',
      type: 'string',
      options: {
        list: [
          { title: 'Less than 6 months', value: '<6months' },
          { title: '6-12 months', value: '6-12months' },
          { title: '1-2 years', value: '1-2years' },
          { title: '2+ years', value: '2+years' }
        ]
      }
    }),
    defineField({
      name: 'headline',
      title: 'Review Headline',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'pros',
      title: 'What do you like best?',
      type: 'text',
      validation: Rule => Rule.required().min(50).max(500)
    }),
    defineField({
      name: 'cons',
      title: 'What do you dislike?',
      type: 'text',
      validation: Rule => Rule.required().min(50).max(500)
    }),
    defineField({
      name: 'useCases',
      title: 'What problems are you solving with this product?',
      type: 'text',
      validation: Rule => Rule.max(500)
    }),
    defineField({
      name: 'wouldRecommend',
      title: 'Would you recommend this software?',
      type: 'boolean',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'verified',
      title: 'Verified Review',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as verified after validation'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Review',
      type: 'boolean',
      initialValue: false,
      description: 'Show this review prominently'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'status',
      title: 'Review Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
          { title: 'Flagged', value: 'flagged' }
        ]
      },
      initialValue: 'pending'
    }),
    defineField({
      name: 'moderationNotes',
      title: 'Moderation Notes',
      type: 'text',
      description: 'Internal notes about this review'
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      hidden: true
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      hidden: true
    })
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'reviewerName',
      rating: 'rating',
      status: 'status',
      software: 'software.name'
    },
    prepare(selection) {
      const { title, subtitle, rating, status, software } = selection
      const stars = '⭐'.repeat(rating || 0)
      return {
        title: title || 'Untitled Review',
        subtitle: `${software} - ${subtitle} ${stars} (${status})`
      }
    }
  }
})