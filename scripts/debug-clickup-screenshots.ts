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

async function debugScreenshots() {
  try {
    const query = `*[_type == "software" && name == "ClickUp"][0]{
      _id,
      name,
      screenshots,
      screenshotGallery
    }`
    
    const review = await client.fetch(query)
    
    if (!review) {
      console.log('ClickUp review not found')
      return
    }

    console.log('ClickUp Screenshots Debug:')
    console.log('=========================')
    
    if (review.screenshotGallery) {
      console.log('\nscreenshotGallery field:')
      console.log(JSON.stringify(review.screenshotGallery, null, 2))
    } else {
      console.log('\nNo screenshotGallery field')
    }
    
    if (review.screenshots) {
      console.log('\nscreenshots field:')
      console.log(JSON.stringify(review.screenshots, null, 2))
    } else {
      console.log('\nNo screenshots field')
    }

  } catch (error) {
    console.error('Error:', error)
  }
}

debugScreenshots()