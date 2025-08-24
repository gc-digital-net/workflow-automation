import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function checkDuplicates() {
  console.log('Checking for duplicate software entries...\n')
  
  try {
    // Get all software
    const query = `*[_type == "software"] | order(name asc) {
      _id,
      name,
      slug,
      _createdAt
    }`
    
    const software = await client.fetch(query)
    
    console.log(`Total software entries: ${software.length}\n`)
    
    // Check for duplicates by name
    const nameMap = new Map<string, any[]>()
    
    software.forEach((item: any) => {
      const key = item.name?.toLowerCase() || 'unnamed'
      if (!nameMap.has(key)) {
        nameMap.set(key, [])
      }
      nameMap.get(key)!.push(item)
    })
    
    // Find duplicates
    const duplicates: any[] = []
    nameMap.forEach((items, name) => {
      if (items.length > 1) {
        duplicates.push({ name, items })
      }
    })
    
    if (duplicates.length > 0) {
      console.log('⚠️  Found duplicate entries:\n')
      duplicates.forEach(({ name, items }) => {
        console.log(`  "${name}" has ${items.length} entries:`)
        items.forEach((item: any) => {
          console.log(`    - ID: ${item._id}`)
          console.log(`      Created: ${new Date(item._createdAt).toLocaleString()}`)
        })
        console.log()
      })
      
      // Offer to delete duplicates (keeping the newest)
      console.log('Would you like to remove duplicates? (keeping the newest entry)')
      
    } else {
      console.log('✅ No duplicate software entries found!')
    }
    
    // List all software
    console.log('\nAll software in database:')
    software.forEach((item: any, index: number) => {
      console.log(`${index + 1}. ${item.name} (${item.slug?.current || 'no-slug'})`);
    })
    
  } catch (error) {
    console.error('Error:', error)
  }
}

// Run the script
checkDuplicates()
  .then(() => {
    console.log('\n✨ Check complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })