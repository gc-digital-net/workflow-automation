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

async function checkAsanaReview() {
  console.log('🔍 Checking Asana review status...\n')
  
  try {
    // Check if Asana review exists
    const query = `*[_type == "software" && slug.current == "asana"][0] {
      _id,
      name,
      slug,
      reviewStatus,
      publishedAt,
      overallScore,
      tagline,
      excerpt,
      shortDescription,
      logo,
      "hasLogo": defined(logo),
      "hasScore": defined(overallScore),
      "hasSlug": defined(slug.current)
    }`
    
    const asanaReview = await client.fetch(query)
    
    if (!asanaReview) {
      console.error('❌ Asana review not found in Sanity')
      return
    }
    
    console.log('✅ Asana review found!')
    console.log('Document ID:', asanaReview._id)
    console.log('Name:', asanaReview.name)
    console.log('Slug:', asanaReview.slug?.current)
    console.log('Review Status:', asanaReview.reviewStatus || 'Not set')
    console.log('Published At:', asanaReview.publishedAt || 'Not set')
    console.log('Overall Score:', asanaReview.overallScore)
    console.log('Has Logo:', asanaReview.hasLogo)
    console.log('Has Score:', asanaReview.hasScore)
    console.log('Has Slug:', asanaReview.hasSlug)
    console.log('Excerpt:', asanaReview.excerpt || 'Not set')
    console.log('Short Description:', asanaReview.shortDescription || 'Not set')
    
    // Check what's returned by the main query
    console.log('\n🔍 Checking main query results...')
    const mainQuery = `*[_type == "software"] {
      _id,
      name,
      slug
    }`
    
    const allSoftware = await client.fetch(mainQuery)
    console.log(`\nTotal software reviews: ${allSoftware.length}`)
    
    const asanaInList = allSoftware.find((s: any) => s.slug?.current === 'asana')
    if (asanaInList) {
      console.log('✅ Asana IS in the main software list')
    } else {
      console.log('❌ Asana is NOT in the main software list')
    }
    
    // List all software
    console.log('\nAll software:')
    allSoftware.forEach((s: any) => {
      console.log(`- ${s.name} (${s.slug?.current})`)
    })
    
  } catch (error) {
    console.error('❌ Error checking review:', error)
  }
}

checkAsanaReview()