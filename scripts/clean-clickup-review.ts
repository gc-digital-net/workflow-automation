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

async function cleanClickUpReview() {
  try {
    const query = `*[_type == "software" && name == "ClickUp"][0]`
    const currentDoc = await client.fetch(query)
    
    if (!currentDoc) {
      console.log('ClickUp review not found')
      return
    }

    console.log(`Found ClickUp review with ID: ${currentDoc._id}`)
    
    // Remove any fields that might be causing issues
    // Keep only the core fields that we know work
    const result = await client
      .patch(currentDoc._id)
      // Remove potentially problematic fields
      .unset([
        'screenshotGallery',
        'screenshots',
        'screenshotGallery[]', // Remove array items
        'screenshots[]'        // Remove array items
      ])
      .commit()

    console.log('✓ Successfully cleaned ClickUp review')
    console.log('  - Removed screenshot fields that were causing issues')
    console.log('  - You can now edit the document in Sanity Studio')
    console.log('  - Add screenshots manually through the Studio interface')
    
  } catch (error) {
    console.error('Error cleaning review:', error)
  }
}

cleanClickUpReview()