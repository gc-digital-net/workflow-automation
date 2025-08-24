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

async function checkIntegrationsStructure() {
  console.log('Checking integrations field structure in all software...\n')
  
  try {
    const query = `*[_type == "software" && !(_id in path("drafts.**"))] {
      _id,
      name,
      integrations
    }`
    
    const software = await client.fetch(query)
    
    console.log(`Found ${software.length} software entries\n`)
    
    software.forEach((item: any) => {
      console.log(`${item.name}:`)
      console.log(`  Type: ${typeof item.integrations}`)
      if (typeof item.integrations === 'object') {
        console.log(`  Structure: ${JSON.stringify(item.integrations, null, 2)}`)
      } else {
        console.log(`  Value: ${item.integrations}`)
      }
      console.log()
    })
    
  } catch (error) {
    console.error('Error:', error)
  }
}

// Run the script
checkIntegrationsStructure()
  .then(() => {
    console.log('✨ Check complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })