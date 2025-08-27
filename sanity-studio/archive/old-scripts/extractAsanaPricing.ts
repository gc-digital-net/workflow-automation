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

async function extractAsanaPricing() {
  console.log('📝 Extracting Asana pricing from content blocks...\n')
  
  try {
    // Fetch the Asana document with content
    const asana = await client.fetch(`*[_type == "software" && slug.current == "asana"][0] {
      _id,
      name,
      content
    }`)
    
    if (!asana) {
      console.error('❌ Asana review not found')
      return
    }
    
    // Find pricing table in content blocks
    const pricingBlock = asana.content?.find((block: any) => block._type === 'pricingTable')
    
    if (!pricingBlock || !pricingBlock.plans) {
      console.error('❌ No pricing table found in content')
      return
    }
    
    console.log(`Found ${pricingBlock.plans.length} pricing plans in content blocks`)
    
    // Transform the pricing data to match the document-level schema
    const pricing = pricingBlock.plans.map((plan: any) => {
      // Parse price to number if possible
      let priceValue: any = plan.price
      if (plan.price === 'Free') {
        priceValue = 0
      } else if (plan.price === 'Custom') {
        priceValue = null
      } else if (typeof plan.price === 'string' && plan.price.startsWith('$')) {
        priceValue = parseFloat(plan.price.replace(/[^0-9.]/g, ''))
      }
      
      return {
        _key: plan._key,
        name: plan.name,
        price: priceValue,
        features: plan.features || [],
        highlighted: plan.highlighted || false,
        recommended: plan.highlighted || false, // Use highlighted as recommended
        userLimit: plan.features?.[plan.features.length - 1]?.includes('minimum') ? 
          plan.features[plan.features.length - 1] : null
      }
    })
    
    console.log('\nExtracted pricing plans:')
    pricing.forEach((plan: any) => {
      console.log(`- ${plan.name}: ${plan.price === 0 ? 'Free' : plan.price === null ? 'Custom' : '$' + plan.price}`)
    })
    
    // Update the document with the extracted pricing
    console.log('\n📝 Updating Asana document with pricing data...')
    const result = await client
      .patch(asana._id)
      .set({ pricing: pricing })
      .commit()
    
    console.log('✅ Successfully added pricing data to Asana review!')
    console.log('\nThe Quick Pricing section should now appear in the sidebar.')
    
  } catch (error) {
    console.error('❌ Error extracting pricing:', error)
  }
}

extractAsanaPricing()