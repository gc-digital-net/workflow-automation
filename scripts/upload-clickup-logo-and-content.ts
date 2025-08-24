import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function uploadClickUpLogoAndContent() {
  console.log('Uploading ClickUp logo and updating content...')
  
  try {
    // Upload logo
    const logoPath = path.join(process.cwd(), 'public', 'tools', 'clickup', 'logo-v3-clickup-symbol-only.svg')
    const logoBuffer = fs.readFileSync(logoPath)
    
    console.log('Uploading logo...')
    const logoAsset = await client.assets.upload('image', logoBuffer, {
      filename: 'clickup-logo.svg'
    })
    
    // Get existing ClickUp document
    const clickup = await client.fetch(`*[_type == "software" && name == "ClickUp"][0]`)
    
    if (!clickup) {
      console.log('ClickUp review not found!')
      return
    }
    
    // Update with logo
    console.log('Updating ClickUp with logo...')
    await client
      .patch(clickup._id)
      .set({
        logo: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: logoAsset._id
          }
        }
      })
      .commit()
    
    console.log('✅ Successfully added ClickUp logo!')
    
    // Now let's upload all the screenshots
    const screenshotFiles = [
      'Dashboard.png',
      'Projects.png', 
      'AI.png',
      'Automations.png',
      'Chat.png',
      'Clips.png',
      'Doc.png',
      'Forms.png',
      'Goals.png',
      'Sprints.png',
      'Time_tracking.png',
      'Whiteboard.png'
    ]
    
    const uploadedScreenshots: any[] = []
    
    for (const file of screenshotFiles) {
      const screenshotPath = path.join(process.cwd(), 'public', 'tools', 'clickup', file)
      const screenshotBuffer = fs.readFileSync(screenshotPath)
      
      console.log(`Uploading ${file}...`)
      const asset = await client.assets.upload('image', screenshotBuffer, {
        filename: `clickup-${file.toLowerCase()}`
      })
      
      uploadedScreenshots.push({
        name: file.replace('.png', '').replace('_', ' '),
        asset: asset
      })
    }
    
    console.log(`✅ Uploaded ${uploadedScreenshots.length} screenshots`)
    
    // Now create comprehensive content with screenshots
    const updatedContent = [
      {
        _type: 'block',
        _key: 'intro-1',
        style: 'normal',
        children: [
          { _type: 'span', text: 'ClickUp is a comprehensive project management and productivity platform that aims to replace all your work apps. With its "one app to replace them all" philosophy, ClickUp offers an impressive array of features including task management, docs, goals, time tracking, and more.' }
        ]
      },
      
      // Dashboard Screenshot
      {
        _type: 'screenshot',
        _key: 'screen-dashboard',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedScreenshots.find(s => s.name === 'Dashboard').asset._id
          }
        },
        caption: 'ClickUp Dashboard - Get a complete overview of all your projects and tasks',
        size: 'large'
      },
      
      // Features Section
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
          }
        ]
      },
      
      // Projects Screenshot
      {
        _type: 'screenshot',
        _key: 'screen-projects',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedScreenshots.find(s => s.name === 'Projects').asset._id
          }
        },
        caption: 'ClickUp Projects - Manage complex projects with multiple views',
        size: 'large'
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
      
      {
        _type: 'screenshot',
        _key: 'screen-ai',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedScreenshots.find(s => s.name === 'AI').asset._id
          }
        },
        caption: 'ClickUp AI - Intelligent assistance for faster work',
        size: 'large'
      },
      
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
      
      {
        _type: 'screenshot',
        _key: 'screen-automations',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedScreenshots.find(s => s.name === 'Automations').asset._id
          }
        },
        caption: 'ClickUp Automations - Build powerful workflows without code',
        size: 'large'
      },
      
      // Docs Section
      {
        _type: 'block',
        _key: 'docs-heading',
        style: 'h2',
        children: [{ _type: 'span', text: 'ClickUp Docs - More Than Just Documents' }]
      },
      
      {
        _type: 'block',
        _key: 'docs-desc',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Create beautiful docs, wikis, and knowledge bases. Connect docs to workflows, embed live ClickUp views, and collaborate in real-time. Perfect for SOPs, meeting notes, and project documentation.' }
        ]
      },
      
      {
        _type: 'screenshot',
        _key: 'screen-docs',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedScreenshots.find(s => s.name === 'Doc').asset._id
          }
        },
        caption: 'ClickUp Docs - Rich documentation connected to your work',
        size: 'large'
      },
      
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
      
      {
        _type: 'screenshot',
        _key: 'screen-time',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedScreenshots.find(s => s.name === 'Time tracking').asset._id
          }
        },
        caption: 'Time Tracking - Built-in time tracking for accurate billing',
        size: 'large'
      },
      
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
      
      {
        _type: 'screenshot',
        _key: 'screen-goals',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedScreenshots.find(s => s.name === 'Goals').asset._id
          }
        },
        caption: 'ClickUp Goals - Track OKRs and measurable targets',
        size: 'large'
      },
      
      // Whiteboard Section
      {
        _type: 'block',
        _key: 'whiteboard-heading',
        style: 'h2',
        children: [{ _type: 'span', text: 'Collaborative Whiteboards' }]
      },
      
      {
        _type: 'block',
        _key: 'whiteboard-desc',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Brainstorm and collaborate visually with ClickUp Whiteboards. Create flowcharts, mind maps, and diagrams that convert directly into actionable tasks.' }
        ]
      },
      
      {
        _type: 'screenshot',
        _key: 'screen-whiteboard',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedScreenshots.find(s => s.name === 'Whiteboard').asset._id
          }
        },
        caption: 'ClickUp Whiteboards - Visual collaboration that turns into action',
        size: 'large'
      },
      
      // Add existing pros/cons, pricing, etc.
      ...clickup.content.filter((block: any) => 
        block._type === 'prosConsBlock' || 
        block._type === 'pricingTable' || 
        block._type === 'faqBlock' ||
        block._type === 'ctaBlock'
      )
    ]
    
    // Update document with new content
    console.log('Updating ClickUp content...')
    await client
      .patch(clickup._id)
      .set({ content: updatedContent })
      .commit()
    
    console.log('✅ Successfully updated ClickUp with comprehensive content and screenshots!')
    
  } catch (error) {
    console.error('Error:', error)
  }
}

uploadClickUpLogoAndContent()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })