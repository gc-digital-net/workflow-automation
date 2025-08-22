import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { nanoid } from 'nanoid'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
})

// Helper to generate unique keys
function generateKey() {
  return nanoid(10)
}

// Add _key to array items if missing
function addKeysToArray(array: any[]): any[] {
  if (!Array.isArray(array)) return array
  
  return array.map(item => {
    if (typeof item === 'object' && item !== null && !item._key) {
      return { ...item, _key: generateKey() }
    }
    return item
  })
}

async function fixMissingKeys() {
  console.log('🔧 Fixing missing _key properties in software documents...\n')

  try {
    // Fetch all software documents
    const software = await client.fetch(
      `*[_type == "software"] {
        _id,
        name,
        pricing,
        pros,
        cons,
        screenshots,
        popularIntegrations,
        supportedPlatforms,
        deploymentOptions,
        dataExportFormats,
        categories
      }`
    )

    console.log(`Found ${software.length} software documents to check\n`)

    for (const doc of software) {
      console.log(`Checking ${doc.name}...`)
      const updates: any = {}
      let needsUpdate = false

      // Fix pricing array
      if (doc.pricing && Array.isArray(doc.pricing)) {
        const hasKeysIssue = doc.pricing.some((item: any) => !item._key)
        if (hasKeysIssue) {
          updates.pricing = addKeysToArray(doc.pricing)
          needsUpdate = true
          console.log(`  ✓ Fixed pricing array`)
        }
      }

      // Fix pros array (simple strings, but we'll ensure they're structured correctly)
      if (doc.pros && Array.isArray(doc.pros)) {
        // Pros and cons are simple string arrays, no _key needed
        // But let's make sure they're properly formatted
        updates.pros = doc.pros.filter((item: any) => item !== null && item !== undefined)
        if (updates.pros.length !== doc.pros.length) {
          needsUpdate = true
          console.log(`  ✓ Cleaned pros array`)
        }
      }

      // Fix cons array
      if (doc.cons && Array.isArray(doc.cons)) {
        updates.cons = doc.cons.filter((item: any) => item !== null && item !== undefined)
        if (updates.cons.length !== doc.cons.length) {
          needsUpdate = true
          console.log(`  ✓ Cleaned cons array`)
        }
      }

      // Fix screenshots array
      if (doc.screenshots && Array.isArray(doc.screenshots)) {
        const hasKeysIssue = doc.screenshots.some((item: any) => typeof item === 'object' && !item._key)
        if (hasKeysIssue) {
          updates.screenshots = addKeysToArray(doc.screenshots)
          needsUpdate = true
          console.log(`  ✓ Fixed screenshots array`)
        }
      }

      // Apply updates if needed
      if (needsUpdate) {
        await client
          .patch(doc._id)
          .set(updates)
          .commit()
        console.log(`  ✅ Updated ${doc.name}\n`)
      } else {
        console.log(`  ⏭️  No updates needed\n`)
      }
    }

    // Now let's also check and fix any nested objects in the enhanced fields
    console.log('🔧 Checking enhanced fields for missing keys...\n')
    
    const enhancedSoftware = await client.fetch(
      `*[_type == "software"] {
        _id,
        name,
        "hasEnhancedData": defined(userRatings) || defined(companyInfo) || defined(integrations)
      }`
    )

    for (const doc of enhancedSoftware) {
      if (doc.hasEnhancedData) {
        console.log(`Verifying enhanced data for ${doc.name}...`)
        
        // Fetch full document
        const fullDoc = await client.fetch(
          `*[_id == "${doc._id}"][0]`
        )

        const updates: any = {}
        let needsUpdate = false

        // Check all array fields that might need keys
        const arrayFields = [
          'pricing',
          'screenshots',
          'overview.keyFeatures',
          'useCasesSection.realWorldExamples',
          'competitorAnalysis.mainCompetitors'
        ]

        for (const fieldPath of arrayFields) {
          const fieldParts = fieldPath.split('.')
          let fieldValue = fullDoc
          
          for (const part of fieldParts) {
            fieldValue = fieldValue?.[part]
          }

          if (fieldValue && Array.isArray(fieldValue)) {
            const hasObjectsWithoutKeys = fieldValue.some(
              (item: any) => typeof item === 'object' && item !== null && !item._type && !item._key
            )

            if (hasObjectsWithoutKeys) {
              const fixedArray = addKeysToArray(fieldValue)
              
              if (fieldParts.length === 1) {
                updates[fieldPath] = fixedArray
              } else {
                // Handle nested fields
                const parentField = fieldParts[0]
                const childField = fieldParts[1]
                if (!updates[parentField]) {
                  updates[parentField] = { ...fullDoc[parentField] }
                }
                updates[parentField][childField] = fixedArray
              }
              
              needsUpdate = true
              console.log(`  ✓ Fixed ${fieldPath}`)
            }
          }
        }

        if (needsUpdate) {
          await client
            .patch(doc._id)
            .set(updates)
            .commit()
          console.log(`  ✅ Updated ${doc.name}\n`)
        } else {
          console.log(`  ⏭️  No updates needed\n`)
        }
      }
    }

    console.log('✨ All array keys have been fixed!')
    console.log('You can now edit the documents in Sanity Studio without errors.')

  } catch (error) {
    console.error('Error fixing keys:', error)
  }
}

fixMissingKeys()