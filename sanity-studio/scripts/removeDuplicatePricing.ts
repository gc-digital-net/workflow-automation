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

async function removeDuplicatePricing() {
  console.log('🧹 Removing duplicate pricing tables from content blocks...\n')
  
  try {
    // Fetch all software documents
    const query = `*[_type == "software"] {
      _id,
      name,
      content,
      pricing,
      'hasPricingTable': count(content[_type == 'pricingTable']) > 0
    }`
    
    const documents = await client.fetch(query)
    console.log(`Found ${documents.length} software documents`)
    
    let updatedCount = 0
    
    for (const doc of documents) {
      if (doc.hasPricingTable && doc.content) {
        console.log(`\n📝 Processing: ${doc.name}`)
        
        // Filter out pricingTable blocks from content
        const cleanContent = doc.content.filter((block: any) => block._type !== 'pricingTable')
        
        console.log(`  - Removed ${doc.content.length - cleanContent.length} pricing table(s)`)
        console.log(`  - Document has ${doc.pricing?.length || 0} pricing plans in main pricing field`)
        
        // Update the document
        await client
          .patch(doc._id)
          .set({ content: cleanContent })
          .commit()
        
        updatedCount++
        console.log(`  ✅ Updated`)
      }
    }
    
    console.log(`\n✅ Complete! Updated ${updatedCount} documents`)
    console.log('\nPricing is now only stored in the main "pricing" field')
    console.log('This creates the beautiful pricing cards and sidebar quick pricing')
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

removeDuplicatePricing()