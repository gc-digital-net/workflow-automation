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

async function testClickUpFetch() {
  try {
    // Try fetching with different queries
    console.log('Testing different queries for ClickUp:')
    
    // Query 1: By name
    const byName = await client.fetch(`*[_type == "software" && name == "ClickUp"][0]{
      _id, name, slug, reviewStatus, lastUpdated
    }`)
    console.log('1. By name:', byName)
    
    // Query 2: By slug
    const bySlug = await client.fetch(`*[_type == "software" && slug.current == "clickup"][0]{
      _id, name, slug, reviewStatus, lastUpdated
    }`)
    console.log('2. By slug "clickup":', bySlug)
    
    // Query 3: All software
    const allSoftware = await client.fetch(`*[_type == "software"]{
      _id, name, slug, reviewStatus
    }`)
    console.log(`3. Total software reviews: ${allSoftware.length}`)
    allSoftware.forEach((s: any) => {
      console.log(`   - ${s.name} (${s.slug?.current}) - Status: ${s.reviewStatus}`)
    })

  } catch (error) {
    console.error('Error fetching:', error)
  }
}

testClickUpFetch()