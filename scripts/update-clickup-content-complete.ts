import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function updateClickUpContent() {
  console.log('Updating ClickUp content with comprehensive sections...')
  
  try {
    // Get existing ClickUp document
    const clickup = await client.fetch(`*[_type == "software" && name == "ClickUp"][0]`)
    
    if (!clickup) {
      console.log('ClickUp review not found!')
      return
    }
    
    // Get the uploaded screenshots
    const screenshots = await client.fetch(`*[_type == "sanity.imageAsset" && originalFilename match "clickup-*"] | order(_createdAt desc) [0...20] {
      _id,
      url,
      originalFilename
    }`)
    
    console.log(`Found ${screenshots.length} ClickUp screenshots`)
    
    // Helper to find screenshot by name
    const getScreenshot = (name: string) => {
      const screenshot = screenshots.find((s: any) => 
        s.originalFilename.toLowerCase().includes(name.toLowerCase())
      )
      return screenshot ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: screenshot._id
        }
      } : null
    }
    
    // Build comprehensive content
    const comprehensiveContent = [
      // Introduction
      {
        _type: 'block',
        _key: 'intro-1',
        style: 'normal',
        children: [
          { _type: 'span', text: 'ClickUp is a comprehensive project management and productivity platform that aims to replace all your work apps. With its "one app to replace them all" philosophy, ClickUp offers an impressive array of features including task management, docs, goals, time tracking, and more.' }
        ]
      },
      
      // Dashboard Screenshot
      ...(getScreenshot('dashboard') ? [{
        _type: 'screenshot',
        _key: 'screen-dashboard',
        image: getScreenshot('dashboard'),
        caption: 'ClickUp Dashboard - Get a complete overview of all your projects and tasks',
        size: 'large'
      }] : []),
      
      // Key Features Section
      {
        _type: 'block',
        _key: 'features-heading',
        style: 'h2',
        children: [{ _type: 'span', text: 'Key Features That Set ClickUp Apart' }]
      },
      
      {
        _type: 'featureList',
        _key: 'main-features',
        title: 'Core Capabilities',
        features: [
          {
            _key: 'feat-1',
            name: 'Hierarchical Organization',
            description: 'Organize work with Spaces, Folders, Lists, Tasks, and Subtasks for maximum flexibility'
          },
          {
            _key: 'feat-2',
            name: 'Multiple Views',
            description: 'Switch between 15+ views including List, Board, Calendar, Gantt, Timeline, and more'
          },
          {
            _key: 'feat-3',
            name: 'Custom Fields',
            description: 'Add custom fields to track anything - budgets, phone numbers, emails, dropdowns, and more'
          },
          {
            _key: 'feat-4',
            name: 'Automation Engine',
            description: 'Build powerful automations without code to streamline repetitive tasks'
          },
          {
            _key: 'feat-5',
            name: 'Time Tracking',
            description: 'Native time tracking with timesheets, billable hours, and reporting'
          },
          {
            _key: 'feat-6',
            name: 'Goal Tracking',
            description: 'Set and track OKRs with automatic progress roll-up from tasks'
          }
        ]
      },
      
      // Projects Screenshot
      ...(getScreenshot('projects') ? [{
        _type: 'screenshot',
        _key: 'screen-projects',
        image: getScreenshot('projects'),
        caption: 'ClickUp Projects - Manage complex projects with multiple views',
        size: 'large'
      }] : []),
      
      // How ClickUp Works
      {
        _type: 'block',
        _key: 'how-heading',
        style: 'h2',
        children: [{ _type: 'span', text: 'How ClickUp Works' }]
      },
      
      {
        _type: 'block',
        _key: 'how-1',
        style: 'normal',
        children: [
          { _type: 'span', text: 'ClickUp uses a hierarchical structure to organize your work:' }
        ]
      },
      
      {
        _type: 'block',
        _key: 'how-2',
        style: 'normal',
        children: [
          { _type: 'span', text: '• ', marks: ['strong'] },
          { _type: 'span', text: 'Workspaces', marks: ['strong'] },
          { _type: 'span', text: ' - Your entire organization' }
        ]
      },
      
      {
        _type: 'block',
        _key: 'how-3',
        style: 'normal',
        children: [
          { _type: 'span', text: '• ', marks: ['strong'] },
          { _type: 'span', text: 'Spaces', marks: ['strong'] },
          { _type: 'span', text: ' - Teams or departments' }
        ]
      },
      
      {
        _type: 'block',
        _key: 'how-4',
        style: 'normal',
        children: [
          { _type: 'span', text: '• ', marks: ['strong'] },
          { _type: 'span', text: 'Folders', marks: ['strong'] },
          { _type: 'span', text: ' - Projects or categories' }
        ]
      },
      
      {
        _type: 'block',
        _key: 'how-5',
        style: 'normal',
        children: [
          { _type: 'span', text: '• ', marks: ['strong'] },
          { _type: 'span', text: 'Lists', marks: ['strong'] },
          { _type: 'span', text: ' - Workflows or phases' }
        ]
      },
      
      {
        _type: 'block',
        _key: 'how-6',
        style: 'normal',
        children: [
          { _type: 'span', text: '• ', marks: ['strong'] },
          { _type: 'span', text: 'Tasks & Subtasks', marks: ['strong'] },
          { _type: 'span', text: ' - Individual work items' }
        ]
      },
      
      // AI Section
      {
        _type: 'block',
        _key: 'ai-heading',
        style: 'h2',
        children: [{ _type: 'span', text: 'ClickUp AI - Your Work Assistant' }]
      },
      
      {
        _type: 'block',
        _key: 'ai-desc',
        style: 'normal',
        children: [
          { _type: 'span', text: 'ClickUp AI helps you work faster with intelligent features that can summarize tasks, generate action items, write content, and more. It\'s integrated throughout the platform to boost productivity.' }
        ]
      },
      
      ...(getScreenshot('ai') ? [{
        _type: 'screenshot',
        _key: 'screen-ai',
        image: getScreenshot('ai'),
        caption: 'ClickUp AI - Intelligent assistance for faster work',
        size: 'large'
      }] : []),
      
      // Automation Section
      {
        _type: 'block',
        _key: 'automation-heading',
        style: 'h2',
        children: [{ _type: 'span', text: 'Powerful Automation Without Code' }]
      },
      
      {
        _type: 'block',
        _key: 'automation-desc',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Save time with ClickUp\'s automation features. Create custom automations using simple if-then logic to automate status changes, assignee updates, and more. Choose from 100+ pre-built automation templates or build your own.' }
        ]
      },
      
      ...(getScreenshot('automations') ? [{
        _type: 'screenshot',
        _key: 'screen-automations',
        image: getScreenshot('automations'),
        caption: 'ClickUp Automations - Build powerful workflows without code',
        size: 'large'
      }] : []),
      
      // Keep existing pros/cons
      ...(clickup.content?.filter((block: any) => block._type === 'prosConsBlock') || []),
      
      // Keep existing pricing
      ...(clickup.content?.filter((block: any) => block._type === 'pricingTable') || []),
      
      // Time Tracking Section
      {
        _type: 'block',
        _key: 'time-heading',
        style: 'h2',
        children: [{ _type: 'span', text: 'Native Time Tracking' }]
      },
      
      {
        _type: 'block',
        _key: 'time-desc',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Track time from anywhere with ClickUp\'s native time tracking. Start timers from any device, add time retroactively, and generate detailed timesheets for billing and payroll.' }
        ]
      },
      
      ...(getScreenshot('time_tracking') ? [{
        _type: 'screenshot',
        _key: 'screen-time',
        image: getScreenshot('time_tracking'),
        caption: 'Time Tracking - Built-in time tracking for accurate billing',
        size: 'large'
      }] : []),
      
      // Goals Section
      {
        _type: 'block',
        _key: 'goals-heading',
        style: 'h2',
        children: [{ _type: 'span', text: 'Goals & OKRs' }]
      },
      
      {
        _type: 'block',
        _key: 'goals-desc',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Set measurable goals and track progress automatically. Connect tasks to goals, create scorecards, and align your team around clear objectives with ClickUp Goals.' }
        ]
      },
      
      ...(getScreenshot('goals') ? [{
        _type: 'screenshot',
        _key: 'screen-goals',
        image: getScreenshot('goals'),
        caption: 'ClickUp Goals - Track OKRs and measurable targets',
        size: 'large'
      }] : []),
      
      // Keep existing FAQs
      ...(clickup.content?.filter((block: any) => block._type === 'faqBlock') || []),
      
      // Keep existing CTAs
      ...(clickup.content?.filter((block: any) => block._type === 'ctaBlock') || []),
    ]
    
    // Update document with new content
    console.log('Updating ClickUp content...')
    await client
      .patch(clickup._id)
      .set({ content: comprehensiveContent })
      .commit()
    
    console.log('✅ Successfully updated ClickUp with comprehensive content!')
    console.log(`Total content blocks: ${comprehensiveContent.length}`)
    
  } catch (error) {
    console.error('Error:', error)
  }
}

updateClickUpContent()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })