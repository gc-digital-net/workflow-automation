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

async function cleanupRootScores() {
  console.log('🧹 Cleaning up any root-level score fields...\n')

  try {
    // Get raw documents to check for any root-level score fields
    const documents = await client.fetch(`*[_type == "software"]`)
    
    // Fields that should only exist inside the scores object
    const scoreFieldsToRemove = [
      'features', 'easeOfUse', 'integrations', 'pricing', 'support',
      'security', 'scalability', 'performance', 'customization', 'reporting',
      'mobile', 'documentation', 'learningCurve', 'freeTier', 'overallValue',
      'value' // old field name
    ]
    
    for (const doc of documents) {
      console.log(`Checking ${doc.name}...`)
      
      const fieldsToUnset = []
      
      // Check each field
      for (const field of scoreFieldsToRemove) {
        if (doc[field] !== undefined && field !== 'name' && field !== '_id' && field !== '_type') {
          console.log(`  Found root-level field: ${field} = ${doc[field]}`)
          fieldsToUnset.push(field)
        }
      }
      
      if (fieldsToUnset.length > 0) {
        console.log(`  🔧 Removing ${fieldsToUnset.length} root-level fields...`)
        
        await client
          .patch(doc._id)
          .unset(fieldsToUnset)
          .commit()
          
        console.log(`  ✅ Cleaned up ${doc.name}\n`)
      } else {
        console.log(`  ✅ No root-level score fields found\n`)
      }
    }
    
    console.log('🎉 Cleanup complete! All score fields are now properly nested in the scores object.')

  } catch (error) {
    console.error('Error during cleanup:', error)
  }
}

cleanupRootScores()