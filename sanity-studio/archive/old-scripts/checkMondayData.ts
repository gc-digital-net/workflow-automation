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

async function checkMondayData() {
  console.log('🔍 Checking Monday.com data in Sanity...\n')

  try {
    const monday = await client.fetch(
      `*[_type == "software" && name == "Monday.com"][0]`
    )
    
    if (!monday) {
      console.error('❌ Monday.com not found!')
      return
    }

    console.log('📊 Monday.com Data Analysis:')
    console.log('=' .repeat(70))
    
    // Check each major section
    const sections = [
      'overview',
      'detailedReview', 
      'pricingSection',
      'useCasesSection',
      'competitorAnalysis',
      'finalVerdict'
    ]
    
    for (const section of sections) {
      console.log(`\n📁 ${section}:`)
      if (monday[section]) {
        const sectionData = monday[section]
        console.log('  ✅ Section exists')
        
        // Check nested fields
        for (const [key, value] of Object.entries(sectionData)) {
          if (value) {
            if (Array.isArray(value)) {
              console.log(`    • ${key}: ${value.length} items`)
            } else if (typeof value === 'object') {
              console.log(`    • ${key}: Object with ${Object.keys(value).length} properties`)
            } else if (typeof value === 'string') {
              console.log(`    • ${key}: "${value.substring(0, 50)}..."`)
            } else {
              console.log(`    • ${key}: ${value}`)
            }
          } else {
            console.log(`    ⚠️ ${key}: EMPTY`)
          }
        }
      } else {
        console.log('  ❌ Section MISSING')
      }
    }
    
    // Check other important fields
    console.log('\n📋 Other Important Fields:')
    const otherFields = [
      'pros',
      'cons', 
      'scores',
      'pricing',
      'keyFeatures',
      'companyInfo',
      'integrations',
      'userRatings'
    ]
    
    for (const field of otherFields) {
      if (monday[field]) {
        if (Array.isArray(monday[field])) {
          console.log(`  ✅ ${field}: ${monday[field].length} items`)
        } else if (typeof monday[field] === 'object') {
          console.log(`  ✅ ${field}: ${Object.keys(monday[field]).length} properties`)
        } else {
          console.log(`  ✅ ${field}: ${monday[field]}`)
        }
      } else {
        console.log(`  ❌ ${field}: MISSING`)
      }
    }
    
    // Check if we have the raw data that needs to be displayed
    console.log('\n📝 Content Check:')
    if (monday.overview?.introduction) {
      console.log('  ✅ Has introduction content')
    }
    if (monday.overview?.targetAudience) {
      console.log('  ✅ Has target audience content')
    }
    if (monday.detailedReview?.userInterface) {
      console.log('  ✅ Has UI review content')
    }
    if (monday.detailedReview?.featuresAnalysis) {
      console.log('  ✅ Has features analysis content')
    }
    if (monday.pricingSection?.pricingOverview) {
      console.log('  ✅ Has pricing overview content')
    }
    if (monday.finalVerdict?.summary) {
      console.log('  ✅ Has final verdict summary')
    }
    
  } catch (error) {
    console.error('Error checking Monday.com data:', error)
  }
}

checkMondayData()