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

async function approveReview() {
  const reviewId = 'YLNkiMh37d0NawO9ZwNzBj'
  
  try {
    const result = await client
      .patch(reviewId)
      .set({ status: 'approved' })
      .commit()
    
    console.log('Review approved successfully:', result)
  } catch (error) {
    console.error('Error approving review:', error)
  }
}

approveReview()