import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { createReadStream } from 'fs'
import { readdir } from 'fs/promises'
import path from 'path'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function uploadIntegrationLogosToSanity() {
  console.log('Uploading integration logos to Sanity...\n')
  
  try {
    const logosDir = path.join(process.cwd(), 'public', 'logos', 'integrations')
    const files = await readdir(logosDir)
    const logoFiles = files.filter(file => file.endsWith('.png'))
    
    console.log(`Found ${logoFiles.length} logo files to upload\n`)
    
    const uploadedLogos: Record<string, any> = {}
    
    for (const filename of logoFiles) {
      const filePath = path.join(logosDir, filename)
      const integrationName = filename
        .replace('.png', '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      console.log(`Uploading ${integrationName} logo...`)
      
      try {
        // Upload the logo as an asset
        const asset = await client.assets.upload('image', createReadStream(filePath), {
          filename: filename,
          title: `${integrationName} Logo`,
          description: `Integration logo for ${integrationName}`
        })
        
        uploadedLogos[integrationName] = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        }
        
        console.log(`✓ Uploaded ${integrationName} logo with asset ID: ${asset._id}`)
      } catch (error) {
        console.error(`✗ Failed to upload ${integrationName}:`, error)
      }
    }
    
    // Now create or update an integrationLogos document in Sanity
    const existingDoc = await client.fetch(`*[_type == "integrationLogos"][0]`)
    
    if (existingDoc) {
      // Update existing document
      await client
        .patch(existingDoc._id)
        .set({ logos: uploadedLogos, lastUpdated: new Date().toISOString() })
        .commit()
      
      console.log('\n✅ Updated existing integrationLogos document')
    } else {
      // Create new document
      await client.create({
        _type: 'integrationLogos',
        logos: uploadedLogos,
        lastUpdated: new Date().toISOString()
      })
      
      console.log('\n✅ Created new integrationLogos document')
    }
    
    console.log(`\n✨ Successfully uploaded ${Object.keys(uploadedLogos).length} logos to Sanity!`)
    
    // Return the Sanity URLs for reference
    console.log('\nSanity CDN URLs:')
    for (const [name, logo] of Object.entries(uploadedLogos)) {
      console.log(`${name}: https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}/${logo.asset._ref.replace('image-', '').replace('-png', '.png')}`)
    }
    
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Run the script
uploadIntegrationLogosToSanity()
  .then(() => {
    console.log('\n✨ All done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })