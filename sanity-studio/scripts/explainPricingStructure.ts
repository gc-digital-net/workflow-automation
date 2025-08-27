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

async function explainPricingStructure() {
  console.log('📊 UNDERSTANDING ASANA PRICING STRUCTURE\n')
  console.log('=' .repeat(60))
  
  try {
    const asana = await client.fetch(`*[_type == "software" && slug.current == "asana"][0] {
      _id,
      name,
      pricing,
      'pricingBlocks': content[_type == 'pricingTable']
    }`)
    
    console.log('\n1️⃣ DOCUMENT-LEVEL PRICING (Creates the nice cards)')
    console.log('-'.repeat(60))
    console.log('Location in Sanity Studio: Main document fields')
    console.log('Field name: "pricing"')
    console.log('Used for: ')
    console.log('  ✅ Beautiful pricing cards at top of review page')
    console.log('  ✅ Quick Pricing in sidebar')
    
    if (asana.pricing && asana.pricing.length > 0) {
      console.log(`\nCurrent data (${asana.pricing.length} plans):`)
      asana.pricing.forEach((plan: any, idx: number) => {
        console.log(`  ${idx + 1}. ${plan.name}`)
        console.log(`     Price: ${plan.price === 0 ? 'Free' : plan.price === null ? 'Custom' : '$' + plan.price}`)
        console.log(`     Highlighted: ${plan.highlighted ? '⭐ Yes' : 'No'}`)
        console.log(`     Features: ${plan.features?.length || 0} features`)
      })
    } else {
      console.log('\n❌ NO DATA FOUND')
    }
    
    console.log('\n\n2️⃣ CONTENT BLOCK PRICING (The less nice table in content)')
    console.log('-'.repeat(60))
    console.log('Location in Sanity Studio: Inside "content" array')
    console.log('Block type: "pricingTable"')
    console.log('Used for: Table embedded within the review content')
    
    if (asana.pricingBlocks && asana.pricingBlocks.length > 0) {
      console.log(`\nCurrent data (${asana.pricingBlocks.length} table(s)):`)
      asana.pricingBlocks.forEach((block: any, idx: number) => {
        console.log(`  Table ${idx + 1}: "${block.title}"`)
        console.log(`  Plans in this table: ${block.plans?.length || 0}`)
        block.plans?.forEach((plan: any, pidx: number) => {
          console.log(`    - ${plan.name}: ${plan.price}`)
        })
      })
    } else {
      console.log('\n❌ NO DATA FOUND')
    }
    
    console.log('\n\n📝 HOW TO EDIT IN SANITY STUDIO:')
    console.log('-'.repeat(60))
    console.log('\n1. To edit the nice pricing cards (document-level):')
    console.log('   - Open the Asana document in Sanity Studio')
    console.log('   - Look for the "Pricing Plans" field (might be in a tab/group)')
    console.log('   - This is an array where you can add/edit pricing plans')
    console.log('   - Each plan has: name, price, features, highlighted flag')
    
    console.log('\n2. To edit the content block pricing:')
    console.log('   - Open the Asana document')
    console.log('   - Go to the "content" field')
    console.log('   - Find the pricingTable block within the content')
    console.log('   - Edit the plans within that block')
    
    console.log('\n\n💡 RECOMMENDATION:')
    console.log('-'.repeat(60))
    console.log('The document-level pricing (nice cards) is better because:')
    console.log('  1. It displays beautifully on the frontend')
    console.log('  2. It\'s used in multiple places (top section + sidebar)')
    console.log('  3. It\'s easier to manage in Sanity Studio')
    console.log('\nConsider removing the pricingTable from content blocks')
    console.log('to avoid confusion and duplication.')
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

explainPricingStructure()