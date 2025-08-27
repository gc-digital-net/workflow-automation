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

async function assignClickUpCategories() {
  try {
    // Get ClickUp review
    const clickup = await client.fetch(`*[_type == "software" && name == "ClickUp"][0]`)
    
    if (!clickup) {
      console.log('ClickUp review not found')
      return
    }
    
    // Categories that apply to ClickUp
    const clickUpCategories = [
      'software-category-project-management',
      'software-category-task-management',
      'software-category-team-collaboration',
      'software-category-workflow-automation',
      'software-category-time-tracking',
      'software-category-document-management',
    ]
    
    // Update ClickUp with categories
    const result = await client
      .patch(clickup._id)
      .set({
        categories: clickUpCategories.map(id => ({
          _type: 'reference',
          _ref: id
        }))
      })
      .commit()
    
    console.log('✓ Successfully assigned categories to ClickUp:')
    console.log('  - Project Management')
    console.log('  - Task Management')
    console.log('  - Team Collaboration')
    console.log('  - Workflow Automation')
    console.log('  - Time Tracking')
    console.log('  - Document Management')
    
  } catch (error) {
    console.error('Error assigning categories:', error)
  }
}

assignClickUpCategories()