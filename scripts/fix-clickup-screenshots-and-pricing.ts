import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function fixClickUpReview() {
  console.log('Fixing ClickUp screenshots and pricing...\n')
  
  try {
    // Get existing ClickUp data
    const query = `*[_type == "software" && name == "ClickUp"][0]`
    const clickup = await client.fetch(query)
    
    if (!clickup) {
      console.log('ClickUp review not found!')
      return
    }
    
    // Get the screenshots we uploaded earlier
    const screenshotsQuery = `*[_type == "sanity.imageAsset" && originalFilename match "clickup-*"] | order(_createdAt asc) [0...12] {
      _id,
      url,
      originalFilename
    }`
    const screenshots = await client.fetch(screenshotsQuery)
    
    console.log(`Found ${screenshots.length} ClickUp screenshots`)
    
    // Create screenshot references
    const screenshotRefs = screenshots.map((img: any, idx: number) => ({
      _type: 'object',
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: img._id
        }
      },
      caption: getScreenshotCaption(img.originalFilename, idx)
    }))
    
    // Update the content to add inline screenshots
    const updatedContent = [...(clickup.content || [])]
    
    // Find good positions to insert screenshots
    // After the features section
    const featuresIndex = updatedContent.findIndex((block: any) => 
      block._type === 'featureList'
    )
    if (featuresIndex > -1 && screenshotRefs[0]) {
      updatedContent.splice(featuresIndex + 1, 0, {
        _type: 'screenshot',
        image: screenshotRefs[0].image,
        caption: 'ClickUp Dashboard - Get a complete overview of all your projects',
        size: 'large'
      })
    }
    
    // After "How it works" section
    const howItWorksIndex = updatedContent.findIndex((block: any) => 
      block._type === 'block' && block.children?.[0]?.text?.includes('How ClickUp Works')
    )
    if (howItWorksIndex > -1 && screenshotRefs[1]) {
      updatedContent.splice(howItWorksIndex + 4, 0, {
        _type: 'screenshot',
        image: screenshotRefs[1].image,
        caption: 'Multiple views to visualize your work - List, Board, Calendar, and more',
        size: 'large'
      })
    }
    
    // Update the document
    const updates = {
      content: updatedContent,
      // Add remaining screenshots to gallery
      screenshotGallery: screenshotRefs.slice(2).map((ref: any, idx: number) => ({
        image: ref.image,
        caption: ref.caption || `ClickUp Feature ${idx + 1}`
      }))
    }
    
    console.log('Updating ClickUp document...')
    const result = await client
      .patch(clickup._id)
      .set(updates)
      .commit()
    
    console.log('✅ Successfully updated ClickUp with screenshots!')
    console.log(`- ${2} inline screenshots added to content`)
    console.log(`- ${screenshotRefs.length - 2} screenshots added to gallery`)
    
  } catch (error) {
    console.error('Error:', error)
  }
}

function getScreenshotCaption(filename: string, index: number): string {
  const captions: Record<string, string> = {
    'clickup-dashboard': 'ClickUp Dashboard Overview',
    'clickup-board-view': 'Kanban Board View',
    'clickup-list-view': 'List View with Tasks',
    'clickup-calendar': 'Calendar View',
    'clickup-gantt': 'Gantt Chart Timeline',
    'clickup-docs': 'Built-in Docs Editor',
    'clickup-goals': 'Goals and OKRs Tracking',
    'clickup-automation': 'Automation Builder',
    'clickup-time-tracking': 'Native Time Tracking',
    'clickup-workload': 'Team Workload Management',
    'clickup-reporting': 'Custom Reporting Dashboard',
    'clickup-forms': 'Forms and Request Management'
  }
  
  const key = filename.replace('.png', '').replace('.jpg', '')
  return captions[key] || `ClickUp Screenshot ${index + 1}`
}

// Run the script
fixClickUpReview()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })