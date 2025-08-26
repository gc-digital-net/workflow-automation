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

async function fixClickUpScreenshots() {
  try {
    const query = `*[_type == "software" && name == "ClickUp"][0]`
    const review = await client.fetch(query)
    
    if (!review) {
      console.log('ClickUp review not found')
      return
    }

    console.log(`Found ClickUp review with ID: ${review._id}`)
    
    // Remove the incorrectly formatted screenshots fields
    // Since we can't upload images via API directly, we'll clear these fields
    // They need to be added through Sanity Studio with proper image uploads
    const result = await client
      .patch(review._id)
      .unset(['screenshots', 'screenshotGallery'])
      .commit()

    console.log('✓ Cleared invalid screenshot data')
    console.log('  - Screenshots need to be added through Sanity Studio')
    console.log('  - Upload images from public/tools/clickup/ folder')
    
    // List the images that should be uploaded
    const imagesToUpload = [
      'Dashboard.png',
      'Projects.png', 
      'Automations.png',
      'AI.png',
      'Time_tracking.png',
      'Goals.png',
      'Whiteboard.png',
      'Doc.png',
      'Forms.png',
      'Sprints.png'
    ]
    
    console.log('\n📸 Images to upload in Sanity Studio:')
    imagesToUpload.forEach(img => {
      console.log(`  - public/tools/clickup/${img}`)
    })

  } catch (error) {
    console.error('Error:', error)
  }
}

fixClickUpScreenshots()