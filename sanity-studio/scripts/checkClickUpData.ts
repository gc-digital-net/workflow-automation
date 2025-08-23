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

async function checkClickUpData() {
  console.log('🔍 Checking for ClickUp in Sanity...\n')

  try {
    // Check if ClickUp exists
    const clickup = await client.fetch(
      `*[_type == "software" && name == "ClickUp"][0]`
    )
    
    if (clickup) {
      console.log('✅ ClickUp found!')
      console.log('Current data:', JSON.stringify(clickup, null, 2))
    } else {
      console.log('❌ ClickUp not found in database')
    }

  } catch (error) {
    console.error('Error:', error)
  }
}

checkClickUpData()