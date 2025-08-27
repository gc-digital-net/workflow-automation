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

async function setReviewDates() {
  try {
    // Get the ClickUp review
    const query = `*[_type == "software" && name == "ClickUp"][0]`
    const review = await client.fetch(query)
    
    if (!review) {
      console.log('ClickUp review not found')
      return
    }
    
    // Set review dates
    const now = new Date().toISOString()
    const reviewDate = '2024-12-15T10:00:00Z' // Original review date
    
    const result = await client
      .patch(review._id)
      .set({
        reviewDate: reviewDate,
        lastReviewUpdate: now,
        lastUpdated: now
      })
      .commit()
    
    console.log('✓ Successfully set review dates for ClickUp')
    console.log(`  Review Date: ${new Date(reviewDate).toLocaleDateString()}`)
    console.log(`  Last Updated: ${new Date(now).toLocaleDateString()}`)
    
  } catch (error) {
    console.error('Error setting dates:', error)
  }
}

setReviewDates()