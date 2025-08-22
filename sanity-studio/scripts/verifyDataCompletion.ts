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

// Define expected fields based on our schema
const expectedFields = {
  basic: ['name', 'slug', 'logo', 'tagline', 'shortDescription', 'verdict'],
  scores: ['overallScore', 'scores'],
  companyInfo: ['companyInfo'],
  features: ['keyFeatures'],
  integrations: ['integrations', 'popularIntegrations'],
  pricing: ['pricing', 'pricingDetails'],
  useCases: ['useCases'],
  pros_cons: ['pros', 'cons'],
  technical: ['supportedPlatforms', 'deploymentOptions', 'dataExportFormats'],
  security: ['security'],
  mobile: ['mobile'],
  support: ['supportInfo'],
  resources: ['resources'],
  alternatives: ['alternatives', 'competitiveAdvantages', 'whenToChoose', 'whenNotToChoose'],
  seo: ['seo'],
  metadata: ['lastUpdated', 'nextReviewDate']
}

async function verifyDataCompletion() {
  console.log('🔍 Verifying data completion for all software entries...\n')

  try {
    // Fetch all software with all fields
    const allSoftware = await client.fetch(
      `*[_type == "software"] | order(name asc) {
        _id,
        name,
        ...
      }`
    )
    
    for (const software of allSoftware) {
      console.log(`\n📦 ${software.name}`)
      console.log('='.repeat(50))
      
      let missingFields: string[] = []
      let emptyFields: string[] = []
      let populatedFields: string[] = []
      
      // Check each category of fields
      for (const [category, fields] of Object.entries(expectedFields)) {
        console.log(`\n  ${category}:`)
        
        for (const field of fields) {
          if (!(field in software)) {
            missingFields.push(field)
            console.log(`    ❌ ${field} - MISSING`)
          } else if (software[field] === null || software[field] === undefined) {
            emptyFields.push(field)
            console.log(`    ⚠️  ${field} - NULL/UNDEFINED`)
          } else if (Array.isArray(software[field]) && software[field].length === 0) {
            emptyFields.push(field)
            console.log(`    ⚠️  ${field} - EMPTY ARRAY`)
          } else if (typeof software[field] === 'object' && Object.keys(software[field]).length === 0) {
            emptyFields.push(field)
            console.log(`    ⚠️  ${field} - EMPTY OBJECT`)
          } else {
            populatedFields.push(field)
            let value = software[field]
            if (Array.isArray(value)) {
              console.log(`    ✅ ${field} - ${value.length} items`)
            } else if (typeof value === 'object') {
              console.log(`    ✅ ${field} - ${Object.keys(value).length} properties`)
            } else if (typeof value === 'string' && value.length > 50) {
              console.log(`    ✅ ${field} - "${value.substring(0, 50)}..."`)
            } else {
              console.log(`    ✅ ${field} - ${JSON.stringify(value)}`)
            }
          }
        }
      }
      
      // Summary for this software
      console.log(`\n  📊 Summary for ${software.name}:`)
      console.log(`     ✅ Populated: ${populatedFields.length} fields`)
      console.log(`     ⚠️  Empty: ${emptyFields.length} fields`)
      console.log(`     ❌ Missing: ${missingFields.length} fields`)
      
      if (missingFields.length > 0) {
        console.log(`\n     Missing fields: ${missingFields.join(', ')}`)
      }
      if (emptyFields.length > 0) {
        console.log(`     Empty fields: ${emptyFields.join(', ')}`)
      }
    }
    
    console.log('\n' + '='.repeat(70))
    console.log('📈 Overall Data Completion Analysis Complete!')
    
  } catch (error) {
    console.error('Error:', error)
  }
}

verifyDataCompletion()