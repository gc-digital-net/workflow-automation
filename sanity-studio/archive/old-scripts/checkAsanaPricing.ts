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

async function checkAsanaPricing() {
  console.log('🔍 Checking Asana pricing data...\n')
  
  try {
    const asana = await client.fetch(`*[_type == "software" && slug.current == "asana"][0] {
      name,
      pricing,
      'hasPricing': defined(pricing),
      'pricingCount': count(pricing),
      'hasContent': defined(content),
      'contentMode': contentMode
    }`)
    
    console.log('Document name:', asana.name)
    console.log('Content mode:', asana.contentMode)
    console.log('Has content array:', asana.hasContent)
    console.log('Has pricing field:', asana.hasPricing)
    console.log('Number of pricing plans:', asana.pricingCount)
    
    if (asana.pricing && asana.pricing.length > 0) {
      console.log('\nPricing plans:')
      asana.pricing.forEach((plan: any, idx: number) => {
        console.log(`\n${idx + 1}. ${plan.name}`)
        console.log('   Price:', plan.price)
        console.log('   Highlighted:', plan.highlighted || false)
        console.log('   Features:', plan.features?.length || 0, 'features')
      })
    } else {
      console.log('\n⚠️ No pricing data found at document level')
      
      // Check if pricing is in content blocks
      const contentQuery = `*[_type == "software" && slug.current == "asana"][0] {
        'pricingBlocks': content[_type == 'pricingTable']
      }`
      
      const contentData = await client.fetch(contentQuery)
      if (contentData.pricingBlocks && contentData.pricingBlocks.length > 0) {
        console.log('\n✅ Found pricing in content blocks:')
        contentData.pricingBlocks.forEach((block: any) => {
          console.log('- Title:', block.title)
          console.log('- Plans:', block.plans?.length || 0)
        })
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking pricing:', error)
  }
}

checkAsanaPricing()