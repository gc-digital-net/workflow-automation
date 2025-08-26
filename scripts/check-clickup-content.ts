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

async function checkClickUpContent() {
  try {
    const query = `*[_type == "software" && name == "ClickUp"][0]{
      _id,
      name,
      "contentBlocksCount": count(content[]),
      "hasContent": defined(content),
      "hasOverview": defined(overview),
      "hasDetailedReview": defined(detailedReview),
      "contentPreview": content[0...3]
    }`
    
    const review = await client.fetch(query)
    
    if (!review) {
      console.log('ClickUp review not found')
      return
    }

    console.log('ClickUp Review Status:')
    console.log(`- ID: ${review._id}`)
    console.log(`- Has content field: ${review.hasContent}`)
    console.log(`- Content blocks count: ${review.contentBlocksCount || 0}`)
    console.log(`- Has overview field: ${review.hasOverview}`)
    console.log(`- Has detailedReview field: ${review.hasDetailedReview}`)
    
    if (review.contentPreview) {
      console.log('\nContent preview:')
      console.log(JSON.stringify(review.contentPreview, null, 2))
    }

  } catch (error) {
    console.error('Error checking review:', error)
  }
}

checkClickUpContent()