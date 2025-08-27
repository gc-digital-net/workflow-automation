import {createClient} from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Initialize Sanity client
const client = createClient({
  projectId: 'x1zu4x72',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Helper to generate unique keys
function generateKey() {
  return Math.random().toString(36).substr(2, 9)
}

// Helper to add keys to block content
function addKeysToBlockContent(content: any[]): any[] {
  return content.map(block => ({
    ...block,
    _key: block._key || generateKey(),
    children: block.children ? block.children.map((child: any) => ({
      ...child,
      _key: child._key || generateKey()
    })) : undefined,
    markDefs: block.markDefs ? block.markDefs.map((mark: any) => ({
      ...mark,
      _key: mark._key || generateKey()
    })) : undefined
  }))
}

// Helper to add keys to any array
function addKeysToArray(arr: any[]): any[] {
  return arr.map(item => {
    if (typeof item === 'string') {
      return item // Simple string arrays don't need keys
    }
    return {
      ...item,
      _key: item._key || generateKey()
    }
  })
}

async function fixArrayKeys() {
  console.log('🔧 Fixing missing _key properties in arrays...')
  
  try {
    // Fetch all documents that might have arrays
    const documents = await client.fetch(`*[_type in ["software", "listicle", "post", "comparison", "faq", "navigation"]]`)
    
    console.log(`Found ${documents.length} documents to check`)
    
    for (const doc of documents) {
      let needsUpdate = false
      const updates: any = {}
      
      // Fix blockContent fields
      const blockContentFields = ['overview', 'detailedReview', 'content', 'introduction', 'conclusion', 'answer', 'verdict', 'description']
      for (const field of blockContentFields) {
        if (doc[field] && Array.isArray(doc[field])) {
          const fixed = addKeysToBlockContent(doc[field])
          if (JSON.stringify(fixed) !== JSON.stringify(doc[field])) {
            updates[field] = fixed
            needsUpdate = true
          }
        }
      }
      
      // Fix listicle items
      if (doc._type === 'listicle' && doc.listItems) {
        const fixedItems = doc.listItems.map((item: any) => ({
          ...item,
          _key: item._key || generateKey(),
          description: item.description ? addKeysToBlockContent(item.description) : item.description,
          keyFeatures: item.keyFeatures ? item.keyFeatures : item.keyFeatures
        }))
        
        if (JSON.stringify(fixedItems) !== JSON.stringify(doc.listItems)) {
          updates.listItems = fixedItems
          needsUpdate = true
        }
      }
      
      // Fix pricing arrays
      if (doc.pricing && Array.isArray(doc.pricing)) {
        const fixedPricing = doc.pricing.map((item: any) => ({
          ...item,
          _key: item._key || generateKey(),
          features: item.features ? item.features : item.features
        }))
        
        if (JSON.stringify(fixedPricing) !== JSON.stringify(doc.pricing)) {
          updates.pricing = fixedPricing
          needsUpdate = true
        }
      }
      
      // Fix screenshot arrays
      if (doc.screenshots && Array.isArray(doc.screenshots)) {
        const fixedScreenshots = doc.screenshots.map((item: any) => ({
          ...item,
          _key: item._key || generateKey()
        }))
        
        if (JSON.stringify(fixedScreenshots) !== JSON.stringify(doc.screenshots)) {
          updates.screenshots = fixedScreenshots
          needsUpdate = true
        }
      }
      
      // Fix navigation items
      if (doc._type === 'navigation' && doc.items) {
        const fixedItems = doc.items.map((item: any) => ({
          ...item,
          _key: item._key || generateKey(),
          children: item.children ? item.children.map((child: any) => ({
            ...child,
            _key: child._key || generateKey()
          })) : item.children
        }))
        
        if (JSON.stringify(fixedItems) !== JSON.stringify(doc.items)) {
          updates.items = fixedItems
          needsUpdate = true
        }
      }
      
      // Fix comparison categoryWinners
      if (doc._type === 'comparison' && doc.categoryWinners) {
        const fixedWinners = doc.categoryWinners.map((item: any) => ({
          ...item,
          _key: item._key || generateKey()
        }))
        
        if (JSON.stringify(fixedWinners) !== JSON.stringify(doc.categoryWinners)) {
          updates.categoryWinners = fixedWinners
          needsUpdate = true
        }
      }
      
      // Fix FAQs array
      if (doc.faqs && Array.isArray(doc.faqs)) {
        const fixedFaqs = doc.faqs.map((faq: any) => ({
          ...faq,
          _key: faq._key || generateKey()
        }))
        
        if (JSON.stringify(fixedFaqs) !== JSON.stringify(doc.faqs)) {
          updates.faqs = fixedFaqs
          needsUpdate = true
        }
      }
      
      // Fix categories and tags arrays (references need keys)
      if (doc.categories && Array.isArray(doc.categories)) {
        const fixedCategories = doc.categories.map((cat: any) => ({
          ...cat,
          _key: cat._key || generateKey()
        }))
        
        if (JSON.stringify(fixedCategories) !== JSON.stringify(doc.categories)) {
          updates.categories = fixedCategories
          needsUpdate = true
        }
      }
      
      // Update document if needed
      if (needsUpdate) {
        console.log(`Updating ${doc._type}: ${doc.name || doc.title || doc._id}`)
        await client.patch(doc._id).set(updates).commit()
        console.log(`✅ Fixed arrays in ${doc._type}`)
      }
    }
    
    console.log('\n🎉 All array keys have been fixed!')
    console.log('You can now edit all content in the Sanity Studio.')
    
  } catch (error) {
    console.error('❌ Error fixing array keys:', error)
    process.exit(1)
  }
}

// Run the fix
fixArrayKeys()