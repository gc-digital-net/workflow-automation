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

async function fixAsanaDocument() {
  console.log('🔧 Fixing Asana document structure...\n')
  
  try {
    // Fetch the current Asana document
    const asana = await client.fetch(`*[_type == "software" && slug.current == "asana"][0]`)
    
    if (!asana) {
      console.error('❌ Asana review not found')
      return
    }
    
    console.log('Found Asana document:', asana._id)
    console.log('Document has', Object.keys(asana).length, 'fields')
    
    // Check for any array fields that might be causing issues
    const arrayFields = Object.keys(asana).filter(key => Array.isArray(asana[key]))
    console.log('\nArray fields found:', arrayFields)
    
    // Check the content array specifically
    if (asana.content && Array.isArray(asana.content)) {
      console.log('\nContent array length:', asana.content.length)
      
      // Check for any undefined or null entries
      const invalidEntries = asana.content.map((item: any, idx: number) => 
        item === null || item === undefined ? idx : null
      ).filter((idx: number | null) => idx !== null)
      
      if (invalidEntries.length > 0) {
        console.log('⚠️ Found invalid entries at indices:', invalidEntries)
        
        // Filter out invalid entries
        const cleanContent = asana.content.filter((item: any) => item !== null && item !== undefined)
        
        console.log('Cleaning content array...')
        await client
          .patch(asana._id)
          .set({ content: cleanContent })
          .commit()
        
        console.log('✅ Fixed content array')
      } else {
        console.log('✅ Content array appears valid')
      }
    }
    
    // Check for fields that shouldn't exist according to schema
    const knownFields = [
      '_id', '_type', '_rev', '_createdAt', '_updatedAt',
      'name', 'slug', 'logo', 'tagline', 'shortDescription', 'verdict', 'contentMode',
      'overallScore', 'scores', 'userRatings', 'atAGlance', 'quickStats', 
      'automatedContent', 'keyFeatures', 'pricing', 'pricingDetails', 
      'pros', 'cons', 'bestFor', 'notIdealFor', 'integrations', 'popularIntegrations',
      'companyInfo', 'support', 'security', 'technical', 'mobile', 
      'supportedPlatforms', 'deploymentOptions', 'faqs', 'whenToChoose', 
      'whenNotToChoose', 'content', 'screenshotGallery', 'quickInfo', 
      'affiliateLink', 'specialDeal', 'categories', 'reviewAuthor', 
      'reviewStatus', 'publishedAt', 'lastUpdated', 'nextReviewDate', 
      'seo', 'excerpt', 'supportInfo', 'securityInfo'
    ]
    
    const unknownFields = Object.keys(asana).filter(key => !knownFields.includes(key))
    if (unknownFields.length > 0) {
      console.log('\n⚠️ Unknown fields found:', unknownFields)
      console.log('Consider removing these fields if they\'re not needed')
    }
    
    console.log('\n✅ Document check complete!')
    console.log('\nIf you\'re still seeing errors, try:')
    console.log('1. Refresh Sanity Studio (Ctrl+F5)')
    console.log('2. Clear browser cache')
    console.log('3. Open the document in a new incognito window')
    
  } catch (error) {
    console.error('❌ Error fixing document:', error)
  }
}

fixAsanaDocument()