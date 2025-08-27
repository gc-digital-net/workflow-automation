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

async function verifyMigration() {
  console.log('✅ Verifying Asana migration...\n')
  
  try {
    const asana = await client.fetch(`*[_type == 'software' && slug.current == 'asana'][0] {
      _id,
      name,
      contentMode,
      'hasContent': defined(content),
      'contentLength': count(content),
      'contentTypes': content[]._type,
      'hasOldFields': {
        'atAGlance': defined(atAGlance),
        'automatedContent': defined(automatedContent),
        'keyFeatures': defined(keyFeatures),
        'pricing': defined(pricing),
        'faqs': defined(faqs)
      }
    }`)
    
    console.log('Document ID:', asana._id)
    console.log('Name:', asana.name)
    console.log('Content Mode:', asana.contentMode)
    console.log('Has Content Array:', asana.hasContent)
    console.log('Number of Content Blocks:', asana.contentLength)
    console.log('\nContent Block Types:', asana.contentTypes)
    console.log('\nOld Fields Status (should all be false):')
    console.log('- atAGlance:', asana.hasOldFields.atAGlance)
    console.log('- automatedContent:', asana.hasOldFields.automatedContent)
    console.log('- keyFeatures:', asana.hasOldFields.keyFeatures)
    console.log('- pricing:', asana.hasOldFields.pricing)
    console.log('- faqs:', asana.hasOldFields.faqs)
    
    if (asana.contentMode === 'manual' && asana.contentLength > 0) {
      console.log('\n✅ Migration successful! The review now uses content blocks.')
      console.log('You can now edit it in Sanity Studio just like the ClickUp review.')
    } else {
      console.log('\n⚠️ Something might be wrong. Check Sanity Studio.')
    }
    
  } catch (error) {
    console.error('❌ Error verifying migration:', error)
  }
}

verifyMigration()