import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function deleteAllSoftware() {
  console.log('Fetching all software reviews...')
  
  const software = await client.fetch(`*[_type == "software"]`)
  
  console.log(`Found ${software.length} software reviews to delete`)
  
  if (software.length === 0) {
    console.log('No software reviews to delete')
    return
  }
  
  // First, remove software references from listicles
  console.log('\nRemoving software references from listicles...')
  const listicles = await client.fetch(`*[_type == "listicle" && references(*[_type == "software"]._id)]`)
  
  for (const listicle of listicles) {
    console.log(`Updating listicle: ${listicle.title}`)
    
    // Remove software references from list items
    const updatedListItems = listicle.listItems?.map((item: any) => {
      if (item.software) {
        // Remove the software reference but keep the item
        const { software, ...rest } = item
        return rest
      }
      return item
    }) || []
    
    await client
      .patch(listicle._id)
      .set({ listItems: updatedListItems })
      .commit()
  }
  
  console.log('\nNow deleting software reviews...')
  
  // Delete each software review
  let deleted = 0
  for (const item of software) {
    try {
      console.log(`Deleting ${item.name || item._id}...`)
      await client.delete(item._id)
      deleted++
    } catch (error: any) {
      console.error(`Failed to delete ${item.name}: ${error.message}`)
    }
  }
  
  console.log(`\n✅ Successfully deleted ${deleted} software reviews`)
}

deleteAllSoftware()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error:', error)
    process.exit(1)
  })