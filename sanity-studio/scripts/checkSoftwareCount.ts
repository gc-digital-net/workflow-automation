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

async function checkSoftwareCount() {
  console.log('📊 Checking all software entries in Sanity...\n')

  try {
    // Get all software documents
    const allSoftware = await client.fetch(
      `*[_type == "software"] | order(_createdAt desc) {
        _id,
        _createdAt,
        name,
        slug,
        overallScore
      }`
    )
    
    console.log(`Total software entries: ${allSoftware.length}\n`)
    console.log('Details:')
    console.log('-'.repeat(80))
    
    allSoftware.forEach((sw: any, index: number) => {
      console.log(`${index + 1}. ${sw.name}`)
      console.log(`   ID: ${sw._id}`)
      console.log(`   Slug: ${sw.slug?.current || 'NO SLUG'}`)
      console.log(`   Score: ${sw.overallScore || 'N/A'}`)
      console.log(`   Created: ${new Date(sw._createdAt).toLocaleString()}`)
      console.log()
    })
    
    // Check for duplicates by name
    const names = allSoftware.map((s: any) => s.name)
    const duplicates = names.filter((name: string, index: number) => names.indexOf(name) !== index)
    
    if (duplicates.length > 0) {
      console.log('⚠️  DUPLICATES FOUND:')
      console.log(duplicates)
    }
    
    // Check for missing slugs
    const missingSlugs = allSoftware.filter((s: any) => !s.slug?.current)
    if (missingSlugs.length > 0) {
      console.log('\n⚠️  ENTRIES WITHOUT SLUGS:')
      missingSlugs.forEach((s: any) => console.log(`   - ${s.name} (${s._id})`))
    }

  } catch (error) {
    console.error('Error:', error)
  }
}

checkSoftwareCount()