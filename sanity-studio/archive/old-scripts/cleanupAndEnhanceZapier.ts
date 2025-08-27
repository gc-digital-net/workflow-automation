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

async function cleanupAndEnhance() {
  console.log('🧹 Cleaning up duplicates and enhancing Zapier...\n')

  try {
    // First, let's see all software entries
    const allSoftware = await client.fetch(
      `*[_type == "software"] | order(name) {_id, name, _createdAt}`
    )
    
    console.log('📋 Current software entries:')
    allSoftware.forEach((sw: any) => {
      console.log(`   - ${sw.name} (${sw._id}) - Created: ${new Date(sw._createdAt).toLocaleDateString()}`)
    })

    // Delete the duplicate Monday.com entry (the one we created with the script)
    const duplicateMonday = await client.fetch(
      `*[_type == "software" && _id == "7yO2HFElhqlXoditiSnL9C"][0]`
    )
    
    if (duplicateMonday) {
      console.log('\n🗑️  Deleting duplicate Monday.com entry...')
      await client.delete('7yO2HFElhqlXoditiSnL9C')
      console.log('✅ Duplicate Monday.com deleted')
    }

    // Delete the duplicate Notion entry if it exists
    const duplicateNotion = await client.fetch(
      `*[_type == "software" && _id == "YLNkiMh37d0NawO9ZoPFkV"][0]`
    )
    
    if (duplicateNotion) {
      console.log('🗑️  Deleting duplicate Notion entry...')
      await client.delete('YLNkiMh37d0NawO9ZoPFkV')
      console.log('✅ Duplicate Notion deleted')
    }

    // Now enhance Zapier with comprehensive data
    const existingZapier = await client.fetch(
      `*[_type == "software" && name match "Zapier*"][0]`
    )

    if (existingZapier) {
      console.log(`\n📝 Enhancing Zapier entry: ${existingZapier._id}`)
      
      const updatedZapier = await client
        .patch(existingZapier._id)
        .set({
          // Basic Info
          tagline: 'Automate your work by connecting 7,000+ apps without code',
          shortDescription: 'Zapier is the leading no-code automation platform that connects your favorite apps and services, allowing you to automate repetitive tasks without coding or relying on developers.',
          
          // Scores
          overallScore: 9.1,
          scores: {
            features: 9.3,
            easeOfUse: 8.9,
            integrations: 9.8,
            pricing: 7.2,
            support: 8.0,
            security: 8.8,
            scalability: 9.2,
            performance: 8.7,
            customization: 8.5,
            reporting: 7.8
          },
          
          // User Ratings
          userRatings: {
            g2Score: 4.5,
            g2Reviews: 1247,
            capterraScore: 4.6,
            capterraReviews: 2765,
            trustRadiusScore: 8.3,
            trustRadiusReviews: 189
          },
          
          // Company Info
          companyInfo: {
            foundedYear: 2011,
            headquarters: 'San Francisco, CA',
            employeeCount: '800+',
            funding: '$1.4M (Bootstrapped + Seed)',
            revenue: '$140M+ ARR',
            customers: '2.2M+ users'
          },
          
          // Integrations
          integrations: {
            count: 7000,
            categories: ['Marketing', 'Sales', 'Support', 'Project Management', 'Developer Tools', 'Finance', 'HR'],
            hasAPI: true,
            hasWebhooks: true,
            hasZapier: true, // Meta!
            native: 7000
          },
          
          // Popular Integrations
          popularIntegrations: [
            'Gmail', 'Slack', 'Google Sheets', 'Mailchimp', 'Salesforce',
            'HubSpot', 'Shopify', 'WordPress', 'Trello', 'Asana',
            'Stripe', 'PayPal', 'QuickBooks', 'Airtable', 'Discord'
          ],
          
          // Technical Details
          supportedPlatforms: ['web', 'ios', 'android', 'api'],
          deploymentOptions: ['cloud'],
          dataExportFormats: ['JSON', 'CSV', 'API'],
          
          // Support Info
          supportInfo: {
            channels: ['Email', 'Live Chat', 'Help Center', 'Community Forum'],
            responseTime: '< 24 hours (Premium)',
            languages: ['English'],
            training: ['Zapier University', 'Documentation', 'Video Tutorials', 'Webinars', 'Blog'],
            sla: true
          },
          
          // Pricing
          pricing: [
            {
              name: 'Free',
              price: 0,
              yearlyPrice: 0,
              userLimit: '1 user',
              features: ['100 tasks/month', '5 Zaps', '15 minute update time', 'Two-step Zaps', 'Limited app connections'],
              recommended: false,
              mostPopular: false
            },
            {
              name: 'Starter',
              price: 29.99,
              yearlyPrice: 19.99,
              userLimit: '1 user',
              features: ['750 tasks/month', '20 Zaps', '15 minute update time', 'Multi-step Zaps', 'Filters & Formatters', '3 premium apps'],
              recommended: true,
              mostPopular: true
            },
            {
              name: 'Professional',
              price: 73.50,
              yearlyPrice: 49,
              userLimit: '1 user',
              features: ['2K tasks/month', 'Unlimited Zaps', '2 minute update time', 'Custom logic', 'Webhooks', 'Unlimited premium apps'],
              recommended: false,
              mostPopular: false
            },
            {
              name: 'Team',
              price: 103.50,
              yearlyPrice: 69,
              userLimit: 'Per user/month',
              features: ['50K tasks/month', 'Unlimited users', '1 minute update time', 'Shared workspace', 'Premier support', 'SSO'],
              recommended: false,
              mostPopular: false
            },
            {
              name: 'Company',
              price: null,
              yearlyPrice: null,
              userLimit: 'Custom pricing',
              features: ['100K+ tasks/month', 'Advanced admin', 'User provisioning', 'Custom data retention', 'Dedicated support'],
              recommended: false,
              mostPopular: false
            }
          ],
          
          // Pros and Cons
          pros: [
            'Massive library of 7,000+ app integrations',
            'No coding required - truly no-code platform',
            'Reliable automation with good error handling',
            'Excellent documentation and learning resources',
            'Visual workflow builder is intuitive',
            'Strong filtering and formatting options',
            'Webhooks support for custom integrations',
            'Great for simple to moderately complex automations'
          ],
          cons: [
            'Can get expensive with higher task volumes',
            'Limited complex logic capabilities',
            'No built-in approval workflows',
            'Update intervals limited on lower plans',
            'Debugging can be challenging',
            'No on-premise deployment option',
            'Some popular apps only on premium plans'
          ],
          
          // SEO
          seo: {
            metaTitle: 'Zapier Review 2024: Features, Pricing & Alternatives',
            metaDescription: 'Complete Zapier review covering 7,000+ integrations, pricing, pros & cons. Learn how 2.2M+ users automate workflows without code. Compare alternatives.',
            keywords: ['zapier review', 'zapier automation', 'no-code automation', 'zapier pricing', 'zapier alternatives', 'workflow automation']
          },
          
          lastUpdated: new Date().toISOString(),
          nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString() // 90 days from now
        })
        .commit()
      
      console.log('✅ Successfully enhanced Zapier entry')
    }

    // Create Notion if it doesn't exist yet
    const notionExists = await client.fetch(
      `*[_type == "software" && name match "Notion*"][0]`
    )

    if (!notionExists) {
      console.log('\n📝 Creating Notion entry with enhanced data...')
      
      const notionData = {
        _type: 'software',
        name: 'Notion',
        slug: { current: 'notion' },
        tagline: 'The all-in-one workspace for notes, docs, tasks, and databases',
        shortDescription: 'Notion is a versatile workspace that combines notes, databases, kanban boards, wikis, and documents into a single, customizable platform for individuals and teams.',
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
        userRatings: {
          g2Score: 4.7,
          g2Reviews: 5021,
          capterraScore: 4.7,
          capterraReviews: 2024,
          trustRadiusScore: 8.9,
          trustRadiusReviews: 234
        },
        companyInfo: {
          foundedYear: 2013,
          headquarters: 'San Francisco, CA',
          employeeCount: '500+',
          funding: '$343M (Series C)',
          valuation: '$10B',
          customers: '30M+ users'
        },
        integrations: {
          count: 100,
          categories: ['Productivity', 'Development', 'Communication', 'Design', 'Data'],
          hasAPI: true,
          hasWebhooks: true,
          hasZapier: true,
          native: 25
        },
        popularIntegrations: [
          'Slack', 'Google Drive', 'GitHub', 'Figma', 'Miro',
          'Typeform', 'Calendly', 'Loom', 'Unsplash', 'Giphy'
        ],
        supportedPlatforms: ['web', 'windows', 'macos', 'ios', 'android', 'api'],
        deploymentOptions: ['cloud'],
        supportInfo: {
          channels: ['Email', 'Help Center', 'Community Forum', 'Twitter Support'],
          responseTime: '24-48 hours',
          languages: ['English', 'Korean', 'Japanese', 'French', 'German'],
          training: ['Help Docs', 'Video Tutorials', 'Template Gallery', 'Notion Academy'],
          sla: false
        },
        pricing: [
          {
            name: 'Free',
            price: 0,
            yearlyPrice: 0,
            userLimit: 'Personal use',
            features: ['Unlimited pages', 'Share with 10 guests', '7 day page history'],
            recommended: false,
            mostPopular: false
          },
          {
            name: 'Plus',
            price: 10,
            yearlyPrice: 8,
            userLimit: 'Per user/month',
            features: ['Unlimited guests', 'Unlimited file uploads', '30 day page history'],
            recommended: true,
            mostPopular: true
          },
          {
            name: 'Business',
            price: 18,
            yearlyPrice: 15,
            userLimit: 'Per user/month',
            features: ['SAML SSO', 'Private teamspaces', '90 day page history'],
            recommended: false,
            mostPopular: false
          }
        ],
        pros: [
          'Extremely flexible and customizable workspace',
          'Combines multiple tools in one platform',
          'Powerful database functionality',
          'Clean, modern interface',
          'Excellent for knowledge management'
        ],
        cons: [
          'Steep learning curve for advanced features',
          'Can feel overwhelming with options',
          'Limited native integrations',
          'Performance issues with large databases',
          'Mobile apps less powerful than desktop'
        ],
        seo: {
          metaTitle: 'Notion Review 2024: Features, Pricing & Alternatives',
          metaDescription: 'Comprehensive Notion review. Discover why 30M+ users choose Notion.',
          keywords: ['notion review', 'notion app', 'notion workspace', 'notion pricing']
        },
        lastUpdated: new Date().toISOString(),
        nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
      }

      const createdNotion = await client.create(notionData)
      console.log(`✅ Created Notion: ${createdNotion._id}`)
    }

    // Final check
    console.log('\n📊 Final software entries:')
    const finalSoftware = await client.fetch(
      `*[_type == "software"] | order(name) {_id, name, overallScore}`
    )
    
    finalSoftware.forEach((sw: any) => {
      console.log(`   - ${sw.name} (Score: ${sw.overallScore || 'N/A'})`)
    })

    console.log('\n🎉 Cleanup and enhancement complete!')

  } catch (error) {
    console.error('Error:', error)
  }
}

cleanupAndEnhance()