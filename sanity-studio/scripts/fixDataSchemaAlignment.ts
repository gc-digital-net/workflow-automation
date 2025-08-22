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

async function fixDataSchemaAlignment() {
  console.log('🔧 Fixing data to match schema structure...\n')

  try {
    const software = await client.fetch(`*[_type == "software"] | order(name)`)
    
    for (const doc of software) {
      console.log(`\n📝 Fixing ${doc.name}...`)
      
      const updates: any = {}
      const fieldsToUnset: string[] = []
      
      // 1. Remove fields stored as block content that should be objects
      const blockContentFields = ['overview', 'detailedReview', 'pricingSection', 
                                   'useCasesSection', 'competitorAnalysis', 'finalVerdict']
      
      for (const field of blockContentFields) {
        if (doc[field] && Array.isArray(doc[field]) && doc[field][0]?._type === 'block') {
          console.log(`  - Removing incorrectly typed field: ${field}`)
          fieldsToUnset.push(field)
        }
      }
      
      // 2. Add missing fields with appropriate default values
      
      // Add verdict if missing
      if (!doc.verdict) {
        updates.verdict = doc.name === 'Monday.com' 
          ? 'Best for teams needing visual project management with strong automation'
          : doc.name === 'Notion' 
          ? 'Ideal for teams wanting an all-in-one workspace for docs and databases'
          : 'Perfect for automating workflows across thousands of apps without coding'
      }
      
      // Add pricingDetails if missing
      if (!doc.pricingDetails) {
        updates.pricingDetails = {
          hasFreeTier: doc.hasFreeTrial || false,
          freeTrialDays: doc.name === 'Monday.com' ? 14 : doc.name === 'Notion' ? 0 : 14,
          moneyBackDays: 0,
          discounts: 'Annual billing saves 18-25%',
          hiddenCosts: 'Some integrations may require higher tier plans',
          billingCycle: ['monthly', 'annual']
        }
      }
      
      // Add technical specs if missing
      if (!doc.technical) {
        updates.technical = {
          platforms: doc.supportedPlatforms || ['web'],
          deployment: doc.deploymentOptions || ['cloud'],
          languages: doc.name === 'Monday.com' 
            ? ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Dutch', 'Italian', 'Japanese']
            : doc.name === 'Notion'
            ? ['English', 'Korean', 'Japanese', 'French', 'German']
            : ['English'],
          dataLimits: 'Varies by plan',
          apiRateLimits: 'Varies by plan',
          uptime: '99.9% SLA'
        }
      }
      
      // Add security if missing
      if (!doc.security) {
        updates.security = {
          certifications: ['SOC 2 Type II', 'ISO 27001'],
          compliance: ['GDPR', 'CCPA', 'HIPAA (Enterprise)'],
          dataEncryption: 'AES-256 encryption at rest and in transit',
          accessControls: ['SSO', 'Two-factor authentication', 'Role-based permissions'],
          dataResidency: doc.name === 'Zapier' ? ['US'] : ['US', 'EU']
        }
      }
      
      // Add mobile if missing
      if (!doc.mobile) {
        updates.mobile = {
          hasIOS: true,
          iosRating: doc.name === 'Monday.com' ? 4.6 : doc.name === 'Notion' ? 4.7 : 4.5,
          hasAndroid: true,
          androidRating: doc.name === 'Monday.com' ? 4.5 : doc.name === 'Notion' ? 4.6 : 4.4,
          mobileFeatures: ['View and edit', 'Notifications', 'Offline access (limited)'],
          offlineCapability: true
        }
      }
      
      // Add resources if missing
      if (!doc.resources) {
        const baseUrl = doc.name === 'Monday.com' 
          ? 'https://monday.com'
          : doc.name === 'Notion'
          ? 'https://notion.so'
          : 'https://zapier.com'
          
        updates.resources = {
          documentation: `${baseUrl}/help`,
          videoTutorials: `${baseUrl}/webinars`,
          communityForum: `${baseUrl}/community`,
          blog: `${baseUrl}/blog`,
          apiDocs: `${baseUrl}/developers`,
          statusPage: `${baseUrl}/status`
        }
      }
      
      // Add competitiveAdvantages if missing
      if (!doc.competitiveAdvantages) {
        updates.competitiveAdvantages = doc.name === 'Monday.com'
          ? ['Visual workflow builder', 'Strong automation engine', 'Excellent team collaboration', 'Flexible views']
          : doc.name === 'Notion'
          ? ['All-in-one workspace', 'Powerful databases', 'Flexible content blocks', 'Great for documentation']
          : ['7000+ integrations', 'No-code automation', 'Easy to learn', 'Reliable execution']
      }
      
      // Add whenToChoose if missing
      if (!doc.whenToChoose) {
        updates.whenToChoose = doc.name === 'Monday.com'
          ? 'Choose Monday.com when you need visual project management with strong automation capabilities and your team prefers intuitive, colorful interfaces.'
          : doc.name === 'Notion'
          ? 'Choose Notion when you want to combine documentation, databases, and project management in one flexible workspace.'
          : 'Choose Zapier when you need to connect multiple apps and automate workflows without any coding knowledge.'
      }
      
      // Add whenNotToChoose if missing
      if (!doc.whenNotToChoose) {
        updates.whenNotToChoose = doc.name === 'Monday.com'
          ? 'Not ideal if you need complex Gantt charts, have a very small budget, or prefer traditional project management approaches.'
          : doc.name === 'Notion'
          ? 'Not ideal if you need specialized project management features, prefer simpler tools, or need extensive integrations.'
          : 'Not ideal if you need complex logic, have very high volume needs, or require on-premise deployment.'
      }
      
      // Fix dealInformation to dealInfo
      if (doc.dealInformation && !doc.dealInfo) {
        updates.dealInfo = {
          hasActiveDeal: doc.dealInformation.hasActiveDeal || false,
          dealDescription: doc.dealInformation.dealDescription || '',
          dealCode: doc.dealInformation.dealCode || '',
          dealExpiry: doc.dealInformation.dealExpiry || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
        fieldsToUnset.push('dealInformation')
      }
      
      // Remove hasFreeTrial as it's now in pricingDetails
      if (doc.hasFreeTrial !== undefined) {
        fieldsToUnset.push('hasFreeTrial')
      }
      
      // Apply updates
      if (Object.keys(updates).length > 0 || fieldsToUnset.length > 0) {
        console.log(`  ✓ Adding ${Object.keys(updates).length} fields`)
        console.log(`  ✓ Removing ${fieldsToUnset.length} incorrect fields`)
        
        let transaction = client.patch(doc._id)
        
        if (Object.keys(updates).length > 0) {
          transaction = transaction.set(updates)
        }
        
        if (fieldsToUnset.length > 0) {
          transaction = transaction.unset(fieldsToUnset)
        }
        
        await transaction.commit()
        console.log(`  ✅ Fixed ${doc.name}`)
      } else {
        console.log(`  ✅ No changes needed`)
      }
    }
    
    console.log('\n🎉 Data alignment complete!')
    
  } catch (error) {
    console.error('Error fixing data:', error)
  }
}

fixDataSchemaAlignment()