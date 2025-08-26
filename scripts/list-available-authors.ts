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

async function listAuthors() {
  try {
    // Get all authors
    const authors = await client.fetch(`*[_type == "author"]{
      _id,
      name,
      role,
      bio
    }`)
    
    console.log('Available Authors in Sanity:')
    console.log('============================')
    
    if (authors.length === 0) {
      console.log('No authors found. You need to create authors first.')
      return
    }
    
    authors.forEach((author: any, index: number) => {
      console.log(`\n${index + 1}. ${author.name}`)
      console.log(`   ID: ${author._id}`)
      console.log(`   Role: ${author.role}`)
      if (author.bio) {
        console.log(`   Bio: ${author.bio.substring(0, 100)}...`)
      }
    })
    
    console.log('\n\nTo assign an author to ClickUp review:')
    console.log('1. Open Sanity Studio at http://localhost:3333')
    console.log('2. Navigate to the ClickUp review')
    console.log('3. Find the "Review Author" field')
    console.log('4. Select one of the authors listed above')
    console.log('\nOr run: npx tsx scripts/set-clickup-author.ts')

  } catch (error) {
    console.error('Error:', error)
  }
}

listAuthors()