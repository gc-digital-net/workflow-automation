import { createClient } from '@sanity/client'
import { config } from 'dotenv'
config()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function restorePublishedClickUp() {
  try {
    // Get the current ClickUp document
    const query = `*[_type == "software" && name == "ClickUp"][0]`
    const currentDoc = await client.fetch(query)
    
    if (!currentDoc) {
      console.log('ClickUp review not found')
      return
    }

    console.log(`Found ClickUp review with ID: ${currentDoc._id}`)
    console.log('Current document revision:', currentDoc._rev)
    
    // Get document history to find the last stable version
    const history = await client.request({
      url: `/data/history/${process.env.NEXT_PUBLIC_SANITY_DATASET}/documents/${currentDoc._id}`,
      withCredentials: true
    })
    
    console.log(`Found ${history.documents.length} revisions`)
    
    // Find a stable published version (you can adjust the index based on when it was last good)
    // Let's look for a version that has proper structure
    let goodVersion = null
    
    for (const doc of history.documents) {
      // Check if this version has valid structure
      if (doc.screenshotGallery && Array.isArray(doc.screenshotGallery)) {
        // Check if screenshots have proper structure
        const hasValidScreenshots = doc.screenshotGallery.every((s: any) => 
          s._type === 'object' && s.image && s.image._type === 'image'
        )
        
        if (hasValidScreenshots) {
          goodVersion = doc
          console.log('Found good version from:', new Date(doc._updatedAt).toLocaleString())
          break
        }
      }
    }
    
    if (goodVersion) {
      // Restore the good version
      const result = await client
        .createOrReplace({
          ...goodVersion,
          _id: currentDoc._id,
          _type: 'software'
        })
      
      console.log('✓ Successfully restored ClickUp review to stable version')
      console.log('  Restored from:', new Date(goodVersion._updatedAt).toLocaleString())
    } else {
      console.log('Could not find a stable version with proper screenshot structure')
      console.log('Manual restoration may be needed')
    }
    
  } catch (error: any) {
    console.error('Error:', error)
    
    // If history API doesn't work, let's just clean up the current document
    if (error.message?.includes('history')) {
      console.log('\nAttempting to clean current document instead...')
      
      const query = `*[_type == "software" && name == "ClickUp"][0]`
      const currentDoc = await client.fetch(query)
      
      // Remove problematic fields and keep only valid data
      const cleaned = {
        _id: currentDoc._id,
        _type: 'software',
        name: currentDoc.name,
        slug: currentDoc.slug,
        tagline: currentDoc.tagline,
        shortDescription: currentDoc.shortDescription,
        overallScore: currentDoc.overallScore || 8.5,
        scores: currentDoc.scores,
        content: currentDoc.content,
        pros: currentDoc.pros,
        cons: currentDoc.cons,
        pricing: currentDoc.pricing,
        categories: currentDoc.categories,
        lastUpdated: currentDoc.lastUpdated,
        reviewAuthor: currentDoc.reviewAuthor,
        reviewDate: currentDoc.reviewDate,
        lastReviewUpdate: currentDoc.lastReviewUpdate,
        // Clear screenshot fields to fix them manually
        screenshotGallery: [],
        screenshots: []
      }
      
      const result = await client.createOrReplace(cleaned)
      console.log('✓ Cleaned ClickUp document - screenshots need to be re-added manually')
    }
  }
}

restorePublishedClickUp()