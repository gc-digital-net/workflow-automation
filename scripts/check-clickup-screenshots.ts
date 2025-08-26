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

async function checkScreenshots() {
  try {
    const query = `*[_type == "software" && name == "ClickUp"][0]{
      _id,
      name,
      screenshots,
      screenshotGallery,
      "hasScreenshots": defined(screenshots),
      "hasGallery": defined(screenshotGallery),
      "screenshotCount": count(screenshots[]),
      "galleryCount": count(screenshotGallery[])
    }`
    
    const review = await client.fetch(query)
    
    if (!review) {
      console.log('ClickUp review not found')
      return
    }

    console.log('ClickUp Screenshots Status:')
    console.log(`- Has screenshots field: ${review.hasScreenshots}`)
    console.log(`- Has screenshotGallery field: ${review.hasGallery}`)
    console.log(`- Screenshot count: ${review.screenshotCount || 0}`)
    console.log(`- Gallery count: ${review.galleryCount || 0}`)
    
    if (review.screenshots) {
      console.log('\nScreenshots field content:')
      review.screenshots.forEach((s: any, i: number) => {
        console.log(`  ${i + 1}. Caption: ${s.caption || 'No caption'}`)
        console.log(`     Alt: ${s.altText || 'No alt text'}`)
      })
    }
    
    if (review.screenshotGallery) {
      console.log('\nScreenshot Gallery content:')
      review.screenshotGallery.forEach((s: any, i: number) => {
        console.log(`  ${i + 1}. Caption: ${s.caption || 'No caption'}`)
        console.log(`     Alt: ${s.altText || 'No alt text'}`)
      })
    }

  } catch (error) {
    console.error('Error checking screenshots:', error)
  }
}

checkScreenshots()
