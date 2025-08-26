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

async function addClickUpScreenshots() {
  try {
    const query = `*[_type == "software" && name == "ClickUp"][0]`
    const review = await client.fetch(query)
    
    if (!review) {
      console.log('ClickUp review not found')
      return
    }

    console.log(`Found ClickUp review with ID: ${review._id}`)
    
    // Add screenshot gallery with placeholder references
    // In a real scenario, you would upload actual images to Sanity
    const screenshotGallery = [
      {
        _type: 'screenshot',
        _key: 'screenshot1',
        caption: 'ClickUp Dashboard - Get a bird\'s eye view of all your projects',
        altText: 'ClickUp main dashboard showing project overview'
      },
      {
        _type: 'screenshot',
        _key: 'screenshot2',
        caption: 'Multiple Views - Switch between List, Board, Calendar, and Gantt views',
        altText: 'ClickUp showing different view options'
      },
      {
        _type: 'screenshot',
        _key: 'screenshot3',
        caption: 'Task Management - Rich task details with custom fields',
        altText: 'ClickUp task detail view with custom fields'
      },
      {
        _type: 'screenshot',
        _key: 'screenshot4',
        caption: 'Automation - Set up powerful automations without code',
        altText: 'ClickUp automation builder interface'
      },
      {
        _type: 'screenshot',
        _key: 'screenshot5',
        caption: 'Docs & Wikis - Create and collaborate on documents',
        altText: 'ClickUp Docs feature for documentation'
      },
      {
        _type: 'screenshot',
        _key: 'screenshot6',
        caption: 'Time Tracking - Track time directly within tasks',
        altText: 'ClickUp time tracking interface'
      }
    ]
    
    // Update the review with screenshots
    const result = await client
      .patch(review._id)
      .set({ 
        screenshotGallery,
        // Also add screenshots field for compatibility
        screenshots: screenshotGallery
      })
      .commit()

    console.log('✓ Successfully added screenshots to ClickUp review')
    console.log(`  - Added ${screenshotGallery.length} screenshots`)
    console.log(`  - Review ID: ${result._id}`)

  } catch (error) {
    console.error('Error adding screenshots:', error)
  }
}

addClickUpScreenshots()