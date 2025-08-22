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

async function updateExistingSoftware() {
  console.log('🔍 Finding existing software entries...')

  try {
    // First, find the existing Monday.com entry
    const existingMonday = await client.fetch(
      `*[_type == "software" && name match "Monday*"][0]`
    )

    if (existingMonday) {
      console.log(`📝 Found existing Monday.com entry: ${existingMonday._id}`)
      console.log(`   Current name: ${existingMonday.name}`)
      
      // Update with enhanced data
      const updatedMonday = await client
        .patch(existingMonday._id)
        .set({
          // Basic Info
          tagline: 'The Work OS that powers teams to run projects and workflows with confidence',
          shortDescription: 'Monday.com is a cloud-based work operating system that helps teams manage projects, workflows, and everyday work with customizable templates and automation.',
          
          // Scores
          overallScore: 8.9,
          scores: {
            features: 9.2,
            easeOfUse: 8.7,
            integrations: 9.0,
            pricing: 7.8,
            support: 8.5,
            security: 9.1,
            scalability: 8.8,
            performance: 8.6,
            customization: 9.3,
            reporting: 8.4
          },
          
          // User Ratings
          userRatings: {
            g2Score: 4.7,
            g2Reviews: 9284,
            capterraScore: 4.6,
            capterraReviews: 4389,
            trustRadiusScore: 8.6,
            trustRadiusReviews: 567
          },
          
          // Company Info
          companyInfo: {
            foundedYear: 2012,
            headquarters: 'Tel Aviv, Israel',
            employeeCount: '1,500+',
            funding: 'Public (NASDAQ: MNDY)',
            revenue: '$700M+ ARR',
            customers: '186,000+'
          },
          
          // Integrations
          integrations: {
            count: 200,
            categories: ['Project Management', 'Communication', 'Developer Tools', 'Marketing', 'Sales'],
            hasAPI: true,
            hasWebhooks: true,
            hasZapier: true,
            native: 72
          },
          
          // Popular Integrations
          popularIntegrations: [
            'Slack', 'Microsoft Teams', 'Gmail', 'Outlook', 'Zoom',
            'Salesforce', 'HubSpot', 'Jira', 'GitHub', 'Google Drive',
            'Dropbox', 'Adobe Creative Cloud', 'Figma', 'Stripe', 'QuickBooks'
          ],
          
          // Technical Details
          supportedPlatforms: ['web', 'windows', 'macos', 'ios', 'android', 'api'],
          deploymentOptions: ['cloud'],
          dataExportFormats: ['CSV', 'Excel', 'PDF', 'API'],
          
          // Support Info
          supportInfo: {
            channels: ['Email', 'Live Chat', '24/7 Phone', 'Knowledge Base', 'Community Forum'],
            responseTime: '< 2 hours (Enterprise)',
            languages: ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Dutch', 'Italian', 'Japanese'],
            training: ['Webinars', 'Video Tutorials', 'Documentation', 'Monday Academy', 'Certification Program'],
            sla: true
          },
          
          // Pricing
          pricing: [
            {
              name: 'Free',
              price: 0,
              yearlyPrice: 0,
              userLimit: 'Up to 2 users',
              features: ['Up to 3 boards', 'Unlimited docs', '200+ templates', 'iOS and Android apps', '1 week activity log'],
              recommended: false,
              mostPopular: false
            },
            {
              name: 'Basic',
              price: 9,
              yearlyPrice: 8,
              userLimit: 'Per user/month',
              features: ['Unlimited items', 'Unlimited boards', '5GB storage', 'Create dashboard (1 board)', 'Basic integrations'],
              recommended: false,
              mostPopular: false
            },
            {
              name: 'Standard',
              price: 12,
              yearlyPrice: 10,
              userLimit: 'Per user/month',
              features: ['Timeline & Gantt views', 'Calendar view', 'Guest access', 'Automations (250/month)', 'Integrations (250/month)', 'Dashboard (5 boards)'],
              recommended: true,
              mostPopular: true
            },
            {
              name: 'Pro',
              price: 19,
              yearlyPrice: 16,
              userLimit: 'Per user/month',
              features: ['Private boards', 'Chart view', 'Time tracking', 'Formula column', 'Automations (25K/month)', 'Integrations (25K/month)', 'Dashboard (10 boards)'],
              recommended: false,
              mostPopular: false
            },
            {
              name: 'Enterprise',
              price: null,
              yearlyPrice: null,
              userLimit: 'Custom pricing',
              features: ['Advanced security', 'Multi-level permissions', 'Enterprise automations', 'Advanced analytics', 'Tailored onboarding', 'Premium support'],
              recommended: false,
              mostPopular: false
            }
          ],
          
          // Pros and Cons
          pros: [
            'Highly customizable workflows and boards',
            'Excellent visual project management with multiple views',
            'Strong automation capabilities saving time',
            'Extensive integration ecosystem',
            'User-friendly interface with quick learning curve',
            'Robust mobile applications',
            'Great for cross-functional team collaboration',
            'Regular feature updates and improvements'
          ],
          cons: [
            'Can become expensive for larger teams',
            'Some advanced features require higher-tier plans',
            'Initial setup can be overwhelming with many options',
            'Limited reporting on lower-tier plans',
            'Notification management can be complex',
            'Performance can slow with very large boards'
          ],
          
          // SEO
          seo: {
            metaTitle: 'Monday.com Review 2024: Features, Pricing & Alternatives',
            metaDescription: 'In-depth Monday.com review covering features, pricing, pros & cons. See why 186,000+ companies use Monday.com for project management. Compare with alternatives.',
            keywords: ['monday.com review', 'monday project management', 'work os', 'monday.com pricing', 'monday.com alternatives', 'team collaboration software']
          },
          
          lastUpdated: new Date().toISOString(),
          nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString() // 90 days from now
        })
        .commit()
      
      console.log('✅ Successfully updated Monday.com entry')
    } else {
      console.log('❌ No existing Monday.com entry found')
    }

    // Now find and update Notion if it exists
    const existingNotion = await client.fetch(
      `*[_type == "software" && name match "Notion*"][0]`
    )

    if (existingNotion) {
      console.log(`📝 Found existing Notion entry: ${existingNotion._id}`)
      console.log(`   Current name: ${existingNotion.name}`)
      
      // Update with enhanced data
      const updatedNotion = await client
        .patch(existingNotion._id)
        .set({
          // Basic Info
          tagline: 'The all-in-one workspace for notes, docs, tasks, and databases',
          shortDescription: 'Notion is a versatile workspace that combines notes, databases, kanban boards, wikis, and documents into a single, customizable platform for individuals and teams.',
          
          // Scores
          overallScore: 8.7,
          scores: {
            features: 9.0,
            easeOfUse: 8.2,
            integrations: 7.8,
            pricing: 8.5,
            support: 7.5,
            security: 8.3,
            scalability: 8.6,
            performance: 8.0,
            customization: 9.5,
            reporting: 7.2
          },
          
          // User Ratings
          userRatings: {
            g2Score: 4.7,
            g2Reviews: 5021,
            capterraScore: 4.7,
            capterraReviews: 2024,
            trustRadiusScore: 8.9,
            trustRadiusReviews: 234
          },
          
          // Company Info
          companyInfo: {
            foundedYear: 2013,
            headquarters: 'San Francisco, CA',
            employeeCount: '500+',
            funding: '$343M (Series C)',
            valuation: '$10B',
            customers: '30M+ users'
          },
          
          // Integrations
          integrations: {
            count: 100,
            categories: ['Productivity', 'Development', 'Communication', 'Design', 'Data'],
            hasAPI: true,
            hasWebhooks: true,
            hasZapier: true,
            native: 25
          },
          
          // Popular Integrations
          popularIntegrations: [
            'Slack', 'Google Drive', 'GitHub', 'Figma', 'Miro',
            'Typeform', 'Calendly', 'Loom', 'Unsplash', 'Giphy',
            'Twitter/X', 'Jira', 'Asana', 'Trello', 'Google Calendar'
          ],
          
          // Technical Details
          supportedPlatforms: ['web', 'windows', 'macos', 'ios', 'android', 'api'],
          deploymentOptions: ['cloud'],
          dataExportFormats: ['Markdown', 'CSV', 'PDF', 'HTML'],
          
          // Support Info
          supportInfo: {
            channels: ['Email', 'Help Center', 'Community Forum', 'Twitter Support'],
            responseTime: '24-48 hours',
            languages: ['English', 'Korean', 'Japanese', 'French', 'German'],
            training: ['Help Docs', 'Video Tutorials', 'Template Gallery', 'Notion Academy', 'Community Resources'],
            sla: false
          },
          
          // Pricing
          pricing: [
            {
              name: 'Free',
              price: 0,
              yearlyPrice: 0,
              userLimit: 'Personal use',
              features: ['Unlimited pages & blocks', 'Share with 10 guests', '7 day page history', 'Basic integrations', 'Sync across devices'],
              recommended: false,
              mostPopular: false
            },
            {
              name: 'Plus',
              price: 10,
              yearlyPrice: 8,
              userLimit: 'Per user/month',
              features: ['Unlimited guests', 'Unlimited file uploads', '30 day page history', 'Custom websites', 'Advanced permissions'],
              recommended: true,
              mostPopular: true
            },
            {
              name: 'Business',
              price: 18,
              yearlyPrice: 15,
              userLimit: 'Per user/month',
              features: ['SAML SSO', 'Private teamspaces', '90 day page history', 'Advanced analytics', 'Bulk PDF export', 'Admin tools'],
              recommended: false,
              mostPopular: false
            },
            {
              name: 'Enterprise',
              price: null,
              yearlyPrice: null,
              userLimit: 'Custom pricing',
              features: ['Advanced security & controls', 'Unlimited page history', 'Audit log', 'Customer success manager', 'Custom contract', 'SCIM provisioning'],
              recommended: false,
              mostPopular: false
            }
          ],
          
          // Pros and Cons
          pros: [
            'Extremely flexible and customizable workspace',
            'Combines multiple tools in one platform',
            'Powerful database functionality with multiple views',
            'Clean, modern interface',
            'Excellent for knowledge management',
            'Strong template ecosystem',
            'Works offline with sync',
            'Great for personal and team use'
          ],
          cons: [
            'Steep learning curve for advanced features',
            'Can feel overwhelming with too many options',
            'Limited native integrations compared to competitors',
            'Performance issues with large databases',
            'No native time tracking',
            'Mobile apps less powerful than desktop',
            'Export options could be better'
          ],
          
          // SEO
          seo: {
            metaTitle: 'Notion Review 2024: Features, Pricing & Alternatives',
            metaDescription: 'Comprehensive Notion review covering features, pricing, pros & cons. Discover why 30M+ users choose Notion for docs, wikis, and project management.',
            keywords: ['notion review', 'notion app', 'notion workspace', 'notion pricing', 'notion alternatives', 'all-in-one workspace']
          },
          
          lastUpdated: new Date().toISOString(),
          nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString() // 90 days from now
        })
        .commit()
      
      console.log('✅ Successfully updated Notion entry')
    } else {
      console.log('❌ No existing Notion entry found')
    }

    // Also check for Zapier if it exists
    const existingZapier = await client.fetch(
      `*[_type == "software" && name match "Zapier*"][0]`
    )

    if (existingZapier) {
      console.log(`📝 Found existing Zapier entry: ${existingZapier._id}`)
      console.log(`   Current name: ${existingZapier.name}`)
      console.log('   Note: You may want to update Zapier with enhanced data as well')
    }

    console.log('\n🎉 Update complete! Your existing software entries now have enhanced data.')
    console.log('   The references from other documents are preserved.')

  } catch (error) {
    console.error('Error updating software:', error)
  }
}

updateExistingSoftware()