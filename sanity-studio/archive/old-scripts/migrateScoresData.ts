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

async function migrateScoresData() {
  console.log('🔧 Checking and migrating scores data...\n')

  try {
    // Fetch all software documents with scores
    const software = await client.fetch(
      `*[_type == "software"] {
        _id,
        name,
        scores
      }`
    )

    console.log(`Found ${software.length} software documents to check\n`)

    for (const doc of software) {
      console.log(`Checking ${doc.name}...`)
      
      if (!doc.scores) {
        console.log(`  ⏭️  No scores to migrate\n`)
        continue
      }

      // Check if scores is stored at the root level incorrectly
      const rawDoc = await client.getDocument(doc._id)
      
      // Check for fields that might be at the wrong level
      const scoresFields = [
        'features', 'easeOfUse', 'integrations', 'pricing', 'support',
        'security', 'scalability', 'performance', 'customization', 'reporting',
        'mobile', 'documentation', 'learningCurve', 'freeTier', 'overallValue'
      ]
      
      let hasRootLevelScores = false
      const rootScores: any = {}
      
      // Check if any score fields are at root level
      for (const field of scoresFields) {
        if (rawDoc && typeof rawDoc[field] === 'number') {
          hasRootLevelScores = true
          rootScores[field] = rawDoc[field]
          console.log(`  Found root-level score: ${field} = ${rawDoc[field]}`)
        }
      }
      
      if (hasRootLevelScores) {
        console.log(`  📝 Migrating scores to proper structure...`)
        
        // Build the update: move scores to the scores object and unset root-level fields
        const updates: any = {
          scores: { ...doc.scores, ...rootScores }
        }
        
        // Create unset operations for root-level score fields
        const unsetFields = scoresFields
          .filter(field => rootScores[field] !== undefined)
          .map(field => field)
        
        // Apply the update
        let transaction = client.patch(doc._id).set(updates)
        
        // Unset the root-level fields
        for (const field of unsetFields) {
          transaction = transaction.unset([field])
        }
        
        await transaction.commit()
        console.log(`  ✅ Migrated scores for ${doc.name}\n`)
      } else if (doc.scores) {
        // Just ensure the scores object has all required fields
        const currentScores = doc.scores || {}
        const defaultScores = {
          features: currentScores.features || 8.0,
          easeOfUse: currentScores.easeOfUse || 8.0,
          integrations: currentScores.integrations || 8.0,
          pricing: currentScores.pricing || 8.0,
          support: currentScores.support || 8.0,
          security: currentScores.security || 8.0,
          scalability: currentScores.scalability || 8.0,
          performance: currentScores.performance || 8.0,
          customization: currentScores.customization || 8.0,
          reporting: currentScores.reporting || 8.0,
          mobile: currentScores.mobile || 8.0,
          documentation: currentScores.documentation || 8.0,
          learningCurve: currentScores.learningCurve || 8.0,
          freeTier: currentScores.freeTier || 8.0,
          overallValue: currentScores.overallValue || 8.0
        }
        
        // Check if we need to update
        const needsUpdate = scoresFields.some(field => !currentScores[field])
        
        if (needsUpdate) {
          await client
            .patch(doc._id)
            .set({ scores: defaultScores })
            .commit()
          console.log(`  ✅ Added missing score fields for ${doc.name}\n`)
        } else {
          console.log(`  ⏭️  Scores structure is correct\n`)
        }
      }
    }

    console.log('✨ Score migration complete!')
    console.log('\nNow checking for any remaining issues...\n')
    
    // Final check
    const finalCheck = await client.fetch(
      `*[_type == "software"] {
        _id,
        name,
        scores,
        customization,
        reporting,
        scalability,
        security
      }`
    )
    
    for (const doc of finalCheck) {
      if (doc.customization || doc.reporting || doc.scalability || doc.security) {
        console.log(`⚠️  ${doc.name} still has root-level score fields:`)
        if (doc.customization) console.log(`   - customization: ${doc.customization}`)
        if (doc.reporting) console.log(`   - reporting: ${doc.reporting}`)
        if (doc.scalability) console.log(`   - scalability: ${doc.scalability}`)
        if (doc.security) console.log(`   - security: ${doc.security}`)
        
        // Force remove these fields
        console.log(`   🔧 Force removing root-level fields...`)
        await client
          .patch(doc._id)
          .unset(['customization', 'reporting', 'scalability', 'security'])
          .commit()
        console.log(`   ✅ Cleaned up ${doc.name}\n`)
      }
    }
    
    console.log('🎉 All scores have been properly migrated!')

  } catch (error) {
    console.error('Error migrating scores:', error)
  }
}

migrateScoresData()