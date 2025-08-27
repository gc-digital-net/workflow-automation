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

async function fixAsanaReview() {
  console.log('🔧 Fixing Asana review...\n')
  
  try {
    // First, find all Asana documents
    const query = `*[_type == "software" && slug.current == "asana"] {
      _id,
      _rev,
      name,
      "isDraft": _id in path("drafts.**")
    }`
    
    const asanaReviews = await client.fetch(query)
    console.log(`Found ${asanaReviews.length} Asana documents:`)
    asanaReviews.forEach((doc: any) => {
      console.log(`- ${doc._id} (Draft: ${doc.isDraft})`)
    })
    
    // Find the draft document
    const draftDoc = asanaReviews.find((doc: any) => doc._id.startsWith('drafts.'))
    if (!draftDoc) {
      console.log('No draft document found')
      return
    }
    
    console.log('\n📝 Publishing draft document...')
    const draftId = draftDoc._id
    const publishedId = draftId.replace('drafts.', '')
    
    // Publish the draft by creating/updating the published version
    const publishResult = await client
      .transaction()
      .createOrReplace({
        ...await client.getDocument(draftId),
        _id: publishedId
      })
      .delete(draftId) // Delete the draft
      .commit()
    
    console.log('✅ Published successfully!')
    
    // Now check for duplicates and clean them up
    const updatedQuery = `*[_type == "software" && slug.current == "asana"] {
      _id,
      name,
      overallScore
    }`
    
    const updatedReviews = await client.fetch(updatedQuery)
    console.log(`\nAfter publishing: ${updatedReviews.length} Asana documents`)
    
    if (updatedReviews.length > 1) {
      console.log('⚠️ Multiple Asana documents found. Keeping the one with highest score...')
      
      // Sort by score and keep the best one
      const sorted = updatedReviews.sort((a: any, b: any) => (b.overallScore || 0) - (a.overallScore || 0))
      const toKeep = sorted[0]
      const toDelete = sorted.slice(1)
      
      for (const doc of toDelete) {
        console.log(`Deleting duplicate: ${doc._id}`)
        await client.delete(doc._id)
      }
      
      console.log(`✅ Kept: ${toKeep._id} with score ${toKeep.overallScore}`)
    }
    
    console.log('\n✅ Asana review fixed!')
    console.log('View in Sanity Studio: http://localhost:3333')
    console.log('View on frontend: https://workflow-automation-eosin.vercel.app/reviews/asana')
    
  } catch (error) {
    console.error('❌ Error fixing review:', error)
  }
}

fixAsanaReview()