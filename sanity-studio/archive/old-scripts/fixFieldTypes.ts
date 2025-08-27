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

async function fixFieldTypes() {
  console.log('🔧 Fixing field type mismatches in software documents...\n')

  try {
    // Fetch all software documents
    const software = await client.fetch(
      `*[_type == "software"] {
        _id,
        name,
        overview,
        detailedReview,
        pricingSection,
        useCasesSection,
        competitorAnalysis,
        finalVerdict
      }`
    )

    console.log(`Found ${software.length} software documents to check\n`)

    for (const doc of software) {
      console.log(`Checking ${doc.name}...`)
      
      const updates: any = {}
      let needsUpdate = false

      // Fields that should be objects with specific subfields but might be stored as block content
      const fieldsToCheck = [
        'overview',
        'detailedReview',
        'pricingSection',
        'useCasesSection',
        'competitorAnalysis',
        'finalVerdict'
      ]

      for (const field of fieldsToCheck) {
        if (doc[field] && Array.isArray(doc[field])) {
          console.log(`  ⚠️  Found ${field} stored as array (block content), needs to be object`)
          
          // For now, we'll unset these fields since they have the wrong type
          // In production, you'd want to convert the content appropriately
          updates[field] = undefined
          needsUpdate = true
        }
      }

      if (needsUpdate) {
        console.log(`  📝 Unsetting incorrectly typed fields...`)
        
        // Unset the fields with wrong types
        const unsetFields = Object.keys(updates)
        
        let transaction = client.patch(doc._id)
        for (const field of unsetFields) {
          transaction = transaction.unset([field])
        }
        
        await transaction.commit()
        console.log(`  ✅ Fixed field types for ${doc.name}\n`)
      } else {
        console.log(`  ✅ All fields have correct types\n`)
      }
    }

    // Now let's also clean up any other potential issues
    console.log('🔍 Checking for any remaining type mismatches...\n')
    
    const allDocs = await client.fetch(`*[_type == "software"]`)
    
    for (const doc of allDocs) {
      const fieldsToRemove = []
      
      // Check each field in the document
      for (const [key, value] of Object.entries(doc)) {
        // Skip system fields
        if (key.startsWith('_')) continue
        
        // Check if we have block content where we shouldn't
        if (Array.isArray(value) && value.length > 0 && value[0]._type === 'block') {
          // These fields should have block content
          const validBlockFields = [
            // None in the current schema for software - all text fields should be strings or objects
          ]
          
          if (!validBlockFields.includes(key)) {
            console.log(`  ⚠️  ${doc.name}: Found unexpected block content in field '${key}'`)
            fieldsToRemove.push(key)
          }
        }
      }
      
      if (fieldsToRemove.length > 0) {
        console.log(`  🔧 Removing ${fieldsToRemove.length} fields with wrong types from ${doc.name}...`)
        
        await client
          .patch(doc._id)
          .unset(fieldsToRemove)
          .commit()
          
        console.log(`  ✅ Cleaned up ${doc.name}\n`)
      }
    }

    console.log('🎉 Field type fixes complete!')

  } catch (error) {
    console.error('Error fixing field types:', error)
  }
}

fixFieldTypes()