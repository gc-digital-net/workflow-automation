// This script adds the missing review content fields to the software schema
// Run this in the Sanity Studio terminal to update the schema

console.log(`
Add these fields to the software.ts schema file in the REVIEW group:

    // ========== REVIEW CONTENT ==========
    defineField({
      name: 'overview',
      title: 'Overview Section',
      type: 'object',
      group: 'review',
      fields: [
        {
          name: 'introduction',
          title: 'Introduction',
          type: 'array',
          of: [{type: 'block'}],
          description: 'Opening overview of the software'
        },
        {
          name: 'keyHighlights',
          title: 'Key Highlights',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {name: 'feature', title: 'Feature', type: 'string'},
              {name: 'description', title: 'Description', type: 'text'}
            ]
          }]
        },
        {
          name: 'targetAudience',
          title: 'Target Audience',
          type: 'array',
          of: [{type: 'block'}]
        }
      ]
    }),
    
    defineField({
      name: 'detailedReview',
      title: 'Detailed Review Section',
      type: 'object',
      group: 'review',
      fields: [
        {
          name: 'userInterface',
          title: 'User Interface & Experience',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'featuresAnalysis',
          title: 'Features Analysis',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'integrationCapabilities',
          title: 'Integration Capabilities',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'performanceReliability',
          title: 'Performance & Reliability',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'securityCompliance',
          title: 'Security & Compliance',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'customerSupport',
          title: 'Customer Support',
          type: 'array',
          of: [{type: 'block'}]
        }
      ]
    }),
    
    defineField({
      name: 'pricingSection',
      title: 'Pricing Analysis',
      type: 'object',
      group: 'review',
      fields: [
        {
          name: 'pricingOverview',
          title: 'Pricing Overview',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'valueForMoney',
          title: 'Value for Money Analysis',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'competitiveComparison',
          title: 'Competitive Pricing Comparison',
          type: 'array',
          of: [{type: 'block'}]
        }
      ]
    }),
    
    defineField({
      name: 'useCasesSection',
      title: 'Use Cases & Implementation',
      type: 'object',
      group: 'review',
      fields: [
        {
          name: 'idealUseCases',
          title: 'Ideal Use Cases',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'implementationGuide',
          title: 'Implementation Guide',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'realWorldExamples',
          title: 'Real-world Examples',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {name: 'company', title: 'Company/Scenario', type: 'string'},
              {name: 'challenge', title: 'Challenge', type: 'text'},
              {name: 'solution', title: 'Solution', type: 'text'},
              {name: 'results', title: 'Results', type: 'text'}
            ]
          }]
        }
      ]
    }),
    
    defineField({
      name: 'competitorAnalysis',
      title: 'Competitor Analysis',
      type: 'object',
      group: 'review',
      fields: [
        {
          name: 'mainCompetitors',
          title: 'Main Competitors',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'software'}]}]
        },
        {
          name: 'competitiveAdvantages',
          title: 'Competitive Advantages',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'competitiveDisadvantages',
          title: 'Areas for Improvement',
          type: 'array',
          of: [{type: 'block'}]
        }
      ]
    }),
    
    defineField({
      name: 'finalVerdict',
      title: 'Final Verdict Section',
      type: 'object',
      group: 'review',
      fields: [
        {
          name: 'summary',
          title: 'Summary',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'recommendation',
          title: 'Recommendation',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'whoShouldUse',
          title: 'Who Should Use This Software',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'whoShouldAvoid',
          title: 'Who Should Consider Alternatives',
          type: 'array',
          of: [{type: 'block'}]
        }
      ]
    }),

`)