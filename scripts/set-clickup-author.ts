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

async function setClickUpAuthor() {
  try {
    // Choose which author you want (change this ID to select a different author)
    // Options:
    // - 'author-sarah-mitchell' -> Sarah Mitchell (Senior Software Analyst)
    // - 'author-michael-chen' -> Michael Chen (Lead Product Reviewer)
    // - 'author-emma-rodriguez' -> Emma Rodriguez (Business Systems Analyst)
    // - 'bc9yieR7hH5cZU3M6szIhW' -> Noel Ceta
    // - 'bc9yieR7hH5cZU3M6iDBDm' -> John Smith
    // - 'YLNkiMh37d0NawO9ZsdaSb' -> Workflow Team
    
    const authorId = 'author-sarah-mitchell' // Change this to select a different author
    
    // Get the ClickUp review
    const query = `*[_type == "software" && name == "ClickUp"][0]`
    const review = await client.fetch(query)
    
    if (!review) {
      console.log('ClickUp review not found')
      return
    }
    
    // Update the review with the selected author
    const result = await client
      .patch(review._id)
      .set({
        reviewAuthor: {
          _type: 'reference',
          _ref: authorId
        }
      })
      .commit()
    
    // Get author details for confirmation
    const author = await client.fetch(`*[_id == "${authorId}"][0]{name, role}`)
    
    console.log('✓ Successfully set ClickUp review author')
    console.log(`  Author: ${author.name}`)
    console.log(`  Role: ${author.role}`)
    
  } catch (error) {
    console.error('Error setting author:', error)
  }
}

setClickUpAuthor()