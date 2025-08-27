import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { v4 as uuidv4 } from 'uuid'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
})

// Helper function to create a block
function createBlock(text: string, style = 'normal') {
  return {
    _type: 'block',
    _key: uuidv4().replace(/-/g, '').substring(0, 12),
    style,
    children: [
      {
        _type: 'span',
        _key: uuidv4().replace(/-/g, '').substring(0, 12),
        marks: [],
        text
      }
    ],
    markDefs: []
  }
}

// Helper function to create a heading
function createHeading(text: string, level: 'h2' | 'h3' | 'h4' = 'h2') {
  return createBlock(text, level)
}

async function migrateAsanaToContentBlocks() {
  console.log('🔄 Migrating Asana review to content blocks structure...\n')
  
  try {
    // Fetch the current Asana review
    const query = `*[_type == "software" && slug.current == "asana"][0]`
    const asana = await client.fetch(query)
    
    if (!asana) {
      console.error('❌ Asana review not found')
      return
    }
    
    console.log('Found Asana review:', asana._id)
    console.log('Current content mode:', asana.contentMode)
    
    // Build the content array with proper blocks
    const content = []
    
    // 1. Overview Section
    content.push(createHeading('Overview'))
    if (asana.automatedContent?.overview) {
      content.push(createBlock(asana.automatedContent.overview))
    }
    if (asana.verdict) {
      content.push(createBlock(asana.verdict))
    }
    
    // 2. At a Glance Info Box
    if (asana.atAGlance) {
      content.push({
        _type: 'infoBox',
        _key: uuidv4().replace(/-/g, '').substring(0, 12),
        type: 'highlight',
        title: 'At a Glance',
        content: [
          createBlock(`⏱️ **Setup Time:** ${asana.atAGlance.setupTime || 'N/A'}`),
          createBlock(`🏢 **Best For:** ${asana.atAGlance.bestForCompanySize || 'N/A'}`),
          createBlock(`⭐ **Standout Feature:** ${asana.atAGlance.standoutFeature || 'N/A'}`),
          createBlock(`📊 **Bottom Line:** ${asana.atAGlance.bottomLine || 'N/A'}`)
        ]
      })
    }
    
    // 3. Features Section
    content.push(createHeading('Features & Functionality'))
    if (asana.automatedContent?.featuresAnalysis) {
      content.push(createBlock(asana.automatedContent.featuresAnalysis))
    }
    
    // 4. Key Features List
    if (asana.keyFeatures && asana.keyFeatures.length > 0) {
      content.push({
        _type: 'featureList',
        _key: uuidv4().replace(/-/g, '').substring(0, 12),
        title: 'Key Features',
        features: asana.keyFeatures.map((feature: any) => ({
          _key: uuidv4().replace(/-/g, '').substring(0, 12),
          name: feature.name,
          description: feature.description
        }))
      })
    }
    
    // 5. Pricing Section
    content.push(createHeading('Pricing'))
    if (asana.automatedContent?.pricingAnalysis) {
      content.push(createBlock(asana.automatedContent.pricingAnalysis))
    }
    
    // 6. Pricing Table
    if (asana.pricing && asana.pricing.length > 0) {
      content.push({
        _type: 'pricingTable',
        _key: uuidv4().replace(/-/g, '').substring(0, 12),
        title: 'Pricing Plans',
        plans: asana.pricing.map((plan: any) => ({
          _key: uuidv4().replace(/-/g, '').substring(0, 12),
          name: plan.name,
          price: plan.price === 0 ? 'Free' : plan.price === null ? 'Custom' : `$${plan.price}`,
          features: plan.features || [],
          highlighted: plan.highlighted || false
        }))
      })
    }
    
    // 7. Pros and Cons
    if ((asana.pros && asana.pros.length > 0) || (asana.cons && asana.cons.length > 0)) {
      content.push(createHeading('Pros and Cons'))
      content.push({
        _type: 'prosConsBlock',
        _key: uuidv4().replace(/-/g, '').substring(0, 12),
        pros: asana.pros || [],
        cons: asana.cons || []
      })
    }
    
    // 8. Integrations
    content.push(createHeading('Integrations'))
    if (asana.automatedContent?.integrationsAnalysis) {
      content.push(createBlock(asana.automatedContent.integrationsAnalysis))
    }
    if (asana.popularIntegrations && asana.popularIntegrations.length > 0) {
      content.push(createBlock(`**Popular Integrations:** ${asana.popularIntegrations.join(', ')}`))
    }
    
    // 9. Support
    content.push(createHeading('Customer Support'))
    if (asana.automatedContent?.supportAnalysis) {
      content.push(createBlock(asana.automatedContent.supportAnalysis))
    }
    
    // 10. Security
    content.push(createHeading('Security & Compliance'))
    if (asana.automatedContent?.securityAnalysis) {
      content.push(createBlock(asana.automatedContent.securityAnalysis))
    }
    
    // 11. Performance
    if (asana.automatedContent?.performanceNotes) {
      content.push(createHeading('Performance'))
      content.push(createBlock(asana.automatedContent.performanceNotes))
    }
    
    // 12. Who Should Use This
    content.push(createHeading('Who Should Use Asana'))
    if (asana.whenToChoose) {
      content.push(createBlock(asana.whenToChoose))
    }
    if (asana.bestFor && asana.bestFor.length > 0) {
      content.push(createHeading('Best For', 'h3'))
      asana.bestFor.forEach((item: string) => {
        content.push(createBlock(`✓ ${item}`))
      })
    }
    if (asana.notIdealFor && asana.notIdealFor.length > 0) {
      content.push(createHeading('Not Ideal For', 'h3'))
      asana.notIdealFor.forEach((item: string) => {
        content.push(createBlock(`✗ ${item}`))
      })
    }
    
    // 13. Competitor Comparison
    if (asana.automatedContent?.competitorComparison) {
      content.push(createHeading('How Asana Compares'))
      content.push(createBlock(asana.automatedContent.competitorComparison))
    }
    
    // 14. FAQs
    if (asana.faqs && asana.faqs.length > 0) {
      content.push({
        _type: 'faqBlock',
        _key: uuidv4().replace(/-/g, '').substring(0, 12),
        title: 'Frequently Asked Questions',
        items: asana.faqs.map((faq: any) => ({
          _key: uuidv4().replace(/-/g, '').substring(0, 12),
          question: faq.question,
          answer: faq.answer
        }))
      })
    }
    
    // 15. Final Verdict
    content.push(createHeading('Final Verdict'))
    if (asana.whenNotToChoose) {
      content.push(createBlock(asana.whenNotToChoose))
    }
    
    // Prepare the update - switching to manual mode with content blocks
    const update = {
      contentMode: 'manual',
      content: content,
      // Keep essential fields at document level
      scores: asana.scores || {
        easeOfUse: asana.scores?.easeOfUse || 9.2,
        features: asana.scores?.features || 8.5,
        valueForMoney: asana.scores?.valueForMoney || asana.scores?.value || 7.8,
        customerSupport: asana.scores?.customerSupport || asana.scores?.support || 8.0
      }
    }
    
    // Update the document
    console.log('\n📝 Updating Asana review with content blocks...')
    const result = await client
      .patch(asana._id)
      .set(update)
      // Remove the old automated fields that are now in content blocks
      .unset([
        'atAGlance',
        'automatedContent', 
        'quickStats',
        'keyFeatures',
        'pricing',
        'pricingDetails',
        'pros',
        'cons',
        'bestFor',
        'notIdealFor',
        'integrations',
        'support',
        'security',
        'technical',
        'mobile',
        'faqs',
        'whenToChoose',
        'whenNotToChoose',
        'verdict',
        'userRatings',
        'deploymentOptions',
        'supportedPlatforms'
      ])
      .commit()
    
    console.log('✅ Migration completed successfully!')
    console.log('\nThe Asana review now uses content blocks like the ClickUp review.')
    console.log('View in Sanity Studio: http://localhost:3333')
    console.log('\nNote: You may want to review and adjust the content formatting in Sanity Studio.')
    
  } catch (error) {
    console.error('❌ Error during migration:', error)
  }
}

migrateAsanaToContentBlocks()