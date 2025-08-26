import { createClient } from '@sanity/client'
import { config } from 'dotenv'
config()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function deleteReviews() {
  // Get all software reviews except ClickUp
  const query = `*[_type == "software" && name != "ClickUp"]._id`
  
  try {
    const reviewIds = await client.fetch(query)
    
    if (reviewIds.length === 0) {
      console.log('No reviews to delete (keeping ClickUp)')
      return
    }
    
    console.log(`Found ${reviewIds.length} reviews to delete`)
    
    // Delete each review
    for (const id of reviewIds) {
      try {
        await client.delete(id)
        console.log(`✓ Deleted review: ${id}`)
      } catch (error) {
        console.error(`✗ Error deleting ${id}:`, error)
      }
    }
    
    console.log(`\nDeleted ${reviewIds.length} reviews. ClickUp review preserved.`)
  } catch (error) {
    console.error('Error fetching reviews:', error)
  }
}

deleteReviews()