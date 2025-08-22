import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
})

async function completeMissingData() {
  console.log('🔧 Completing missing data for software entries...\n')

  try {
    // Update Notion with missing fields
    const notionId = '7yO2HFElhqlXoditiSo7Qa'
    console.log('📝 Updating Notion with missing data...')
    
    await client
      .patch(notionId)
      .set({
        keyFeatures: [
          {
            _key: 'notion-pages',
            name: 'Pages & Databases',
            description: 'Create interconnected pages with rich content and powerful databases with custom views',
            category: 'Core'
          },
          {
            _key: 'notion-blocks',
            name: 'Block-Based Editor',
            description: 'Build pages with 50+ content blocks including text, images, code, embeds, and more',
            category: 'Core'
          },
          {
            _key: 'notion-ai',
            name: 'Notion AI',
            description: 'Built-in AI assistant for writing, summarizing, translating, and brainstorming',
            category: 'AI'
          },
          {
            _key: 'notion-collaboration',
            name: 'Real-time Collaboration',
            description: 'Work together with live cursors, comments, mentions, and page history',
            category: 'Collaboration'
          },
          {
            _key: 'notion-templates',
            name: 'Template Gallery',
            description: '10,000+ community templates for every use case from project management to personal wikis',
            category: 'Templates'
          }
        ],
        integrations: {
          count: 100,
          native: 30,
          categories: ['Communication', 'Development', 'Productivity', 'Marketing', 'Analytics'],
          hasAPI: true,
          hasWebhooks: true,
          hasZapier: true
        },
        pricing: [
          {
            _key: 'notion-free',
            name: 'Free',
            price: 0,
            yearlyPrice: 0,
            userLimit: 'Up to 10 guests',
            features: ['Unlimited blocks', 'Share with 10 guests', '7 day page history', 'Basic integrations'],
            recommended: false,
            mostPopular: false
          },
          {
            _key: 'notion-plus',
            name: 'Plus',
            price: 10,
            yearlyPrice: 8,
            userLimit: 'Per user/month',
            features: ['Unlimited blocks', 'Unlimited guests', '30 day page history', 'Unlimited file uploads'],
            recommended: true,
            mostPopular: true
          },
          {
            _key: 'notion-business',
            name: 'Business',
            price: 18,
            yearlyPrice: 15,
            userLimit: 'Per user/month',
            features: ['SAML SSO', 'Private teamspaces', '90 day page history', 'Advanced permissions', 'Bulk PDF export'],
            recommended: false,
            mostPopular: false
          },
          {
            _key: 'notion-enterprise',
            name: 'Enterprise',
            price: null,
            yearlyPrice: null,
            userLimit: 'Custom pricing',
            features: ['Advanced security', 'Unlimited page history', 'Audit log', 'Customer success manager', 'Custom contract'],
            recommended: false,
            mostPopular: false
          }
        ],
        useCases: [
          {
            _key: 'notion-wiki',
            industry: 'Knowledge Management',
            scenario: 'Company wikis, documentation, knowledge bases',
            benefits: 'Centralized information, easy search, version control'
          },
          {
            _key: 'notion-pm',
            industry: 'Project Management',
            scenario: 'Task tracking, project planning, team coordination',
            benefits: 'Flexible views, custom workflows, real-time updates'
          },
          {
            _key: 'notion-content',
            industry: 'Content Creation',
            scenario: 'Editorial calendars, content planning, publishing workflows',
            benefits: 'Visual planning, collaboration tools, template library'
          },
          {
            _key: 'notion-startup',
            industry: 'Startups',
            scenario: 'All-in-one workspace for docs, tasks, and collaboration',
            benefits: 'Cost-effective, scalable, minimal tool switching'
          }
        ],
        dataExportFormats: ['HTML', 'Markdown', 'CSV', 'PDF']
      })
      .commit()
    
    console.log('✅ Notion updated successfully!')
    
    // Update Zapier with missing fields
    const zapierId = 'bc9yieR7hH5cZU3M6iDC0o'
    console.log('\n⚡ Updating Zapier with missing data...')
    
    await client
      .patch(zapierId)
      .set({
        keyFeatures: [
          {
            _key: 'zapier-zaps',
            name: 'Zaps (Automated Workflows)',
            description: 'Create multi-step workflows that trigger based on events in your apps',
            category: 'Core'
          },
          {
            _key: 'zapier-apps',
            name: '7,000+ App Integrations',
            description: 'Connect virtually any web app or service without coding',
            category: 'Integrations'
          },
          {
            _key: 'zapier-filters',
            name: 'Filters & Formatters',
            description: 'Transform and filter data between apps with built-in tools',
            category: 'Data Processing'
          },
          {
            _key: 'zapier-paths',
            name: 'Conditional Logic (Paths)',
            description: 'Create branching workflows based on if/then conditions',
            category: 'Logic'
          },
          {
            _key: 'zapier-tables',
            name: 'Tables & Interfaces',
            description: 'Store data and create custom interfaces for your workflows',
            category: 'Data Management'
          },
          {
            _key: 'zapier-ai',
            name: 'AI-Powered Features',
            description: 'Use ChatGPT, OpenAI, and other AI tools in your automations',
            category: 'AI'
          }
        ],
        integrations: {
          count: 7000,
          native: 7000,
          categories: ['All Categories'],
          hasAPI: true,
          hasWebhooks: true,
          hasZapier: true
        },
        pricing: [
          {
            _key: 'zapier-free',
            name: 'Free',
            price: 0,
            yearlyPrice: 0,
            userLimit: '1 user',
            features: ['100 tasks/month', '5 Zaps', 'Two-step Zaps', '15 minute update time'],
            recommended: false,
            mostPopular: false
          },
          {
            _key: 'zapier-starter',
            name: 'Starter',
            price: 29.99,
            yearlyPrice: 19.99,
            userLimit: '1 user',
            features: ['750 tasks/month', '20 Zaps', 'Multi-step Zaps', '15 minute update time', 'Filters & Formatters'],
            recommended: true,
            mostPopular: true
          },
          {
            _key: 'zapier-professional',
            name: 'Professional',
            price: 73.50,
            yearlyPrice: 49,
            userLimit: '1 user',
            features: ['2K tasks/month', 'Unlimited Zaps', 'Premium apps', '2 minute update time', 'Paths', 'Custom logic'],
            recommended: false,
            mostPopular: false
          },
          {
            _key: 'zapier-team',
            name: 'Team',
            price: 103.50,
            yearlyPrice: 69,
            userLimit: 'Unlimited users',
            features: ['50K tasks/month', 'Shared workspace', 'Premier support', '1 minute update time', 'Advanced admin'],
            recommended: false,
            mostPopular: false
          },
          {
            _key: 'zapier-company',
            name: 'Company',
            price: null,
            yearlyPrice: null,
            userLimit: 'Custom',
            features: ['100K+ tasks/month', 'SAML SSO', 'Advanced security', 'Custom data retention', 'Dedicated support'],
            recommended: false,
            mostPopular: false
          }
        ],
        useCases: [
          {
            _key: 'zapier-lead',
            industry: 'Sales & Marketing',
            scenario: 'Lead capture, CRM sync, email automation',
            benefits: 'Instant lead routing, automated follow-ups, data consistency'
          },
          {
            _key: 'zapier-ecommerce',
            industry: 'E-commerce',
            scenario: 'Order processing, inventory sync, customer notifications',
            benefits: 'Reduced manual work, faster fulfillment, better customer experience'
          },
          {
            _key: 'zapier-social',
            industry: 'Social Media',
            scenario: 'Cross-posting, content scheduling, engagement tracking',
            benefits: 'Time savings, consistent presence, automated reporting'
          },
          {
            _key: 'zapier-data',
            industry: 'Data Management',
            scenario: 'Database sync, backup automation, report generation',
            benefits: 'Data accuracy, automated backups, real-time reporting'
          },
          {
            _key: 'zapier-hr',
            industry: 'Human Resources',
            scenario: 'Applicant tracking, onboarding automation, time tracking',
            benefits: 'Streamlined processes, reduced paperwork, faster onboarding'
          }
        ]
      })
      .commit()
    
    console.log('✅ Zapier updated successfully!')
    
    // Note: Alternatives array is intentionally left empty as it should reference other software documents
    // Logo fields would need actual image uploads which we can't do via script
    
    console.log('\n✨ Data completion finished!')
    console.log('\nNote: Logo images need to be uploaded manually through Sanity Studio')
    console.log('Note: Alternatives field should reference other software documents')
    
  } catch (error) {
    console.error('Error updating data:', error)
  }
}

completeMissingData()