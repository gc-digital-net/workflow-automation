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

async function publishAsanaReview() {
  console.log('📝 Publishing Asana review...\n')
  
  try {
    // First, find the Asana review
    const query = `*[_type == "software" && slug.current == "asana"][0]`
    const asanaReview = await client.fetch(query)
    
    if (!asanaReview) {
      console.error('❌ Asana review not found')
      return
    }
    
    console.log('Found Asana review with ID:', asanaReview._id)
    
    // Update the review to published status
    const result = await client
      .patch(asanaReview._id)
      .set({ 
        reviewStatus: 'published',
        publishedAt: new Date().toISOString()
      })
      .commit()
    
    console.log('✅ Asana review published successfully!')
    console.log('Document ID:', result._id)
    console.log('\nView in Sanity Studio: http://localhost:3333/structure/software;' + result._id)
    console.log('View on frontend: https://workflow-automation-eosin.vercel.app/reviews/asana')
    
  } catch (error) {
    console.error('❌ Error publishing review:', error)
  }
}

publishAsanaReview()