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

async function fixClickUp() {
  try {
    const query = `*[_type == "software" && name == "ClickUp"][0]`
    const review = await client.fetch(query)
    
    if (!review) {
      console.log('ClickUp review not found')
      return
    }

    console.log(`Found ClickUp review with ID: ${review._id}`)
    
    // Create screenshots with local image paths
    const screenshots = [
      {
        _type: 'screenshot',
        _key: 'screenshot1',
        imageUrl: '/tools/clickup/Dashboard.png',
        caption: 'ClickUp Dashboard - Get a comprehensive view of all your projects and tasks',
        altText: 'ClickUp dashboard interface'
      },
      {
        _type: 'screenshot',
        _key: 'screenshot2', 
        imageUrl: '/tools/clickup/Projects.png',
        caption: 'Project Management - Organize and track multiple projects efficiently',
        altText: 'ClickUp project management view'
      },
      {
        _type: 'screenshot',
        _key: 'screenshot3',
        imageUrl: '/tools/clickup/Automations.png', 
        caption: 'Powerful Automations - Create custom workflows without code',
        altText: 'ClickUp automation builder'
      },
      {
        _type: 'screenshot',
        _key: 'screenshot4',
        imageUrl: '/tools/clickup/AI.png',
        caption: 'AI Assistant - Boost productivity with intelligent features',
        altText: 'ClickUp AI features'
      },
      {
        _type: 'screenshot',
        _key: 'screenshot5',
        imageUrl: '/tools/clickup/Time_tracking.png',
        caption: 'Time Tracking - Monitor time spent on tasks and projects',
        altText: 'ClickUp time tracking'
      },
      {
        _type: 'screenshot', 
        _key: 'screenshot6',
        imageUrl: '/tools/clickup/Goals.png',
        caption: 'Goal Tracking - Set and monitor objectives with measurable targets',
        altText: 'ClickUp goals feature'
      }
    ]
    
    // Create content blocks
    const content = [
      {
        _type: 'block',
        _key: 'h1',
        style: 'h1',
        children: [{ _type: 'span', text: 'ClickUp Review: A Comprehensive Analysis' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p1',
        style: 'normal',
        children: [{ _type: 'span', text: 'ClickUp positions itself as the "one app to replace them all" - an ambitious claim in the crowded project management space. After extensive testing with our team, we found this platform offers remarkable flexibility and feature depth that justifies much of that confidence.' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'h2-1',
        style: 'h2',
        children: [{ _type: 'span', text: 'What is ClickUp?' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p2',
        style: 'normal',
        children: [{ _type: 'span', text: 'ClickUp is a cloud-based productivity and project management platform that brings together tasks, docs, goals, chat, and more into a single workspace. Founded in 2017, it has rapidly grown to serve millions of users across teams of all sizes.' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'h2-2',
        style: 'h2',
        children: [{ _type: 'span', text: 'Key Features' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p3',
        style: 'normal',
        children: [{ _type: 'span', text: '• Multiple Views: Choose from 15+ views including List, Board, Calendar, Gantt, Timeline, and Mind Map' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p4',
        style: 'normal',
        children: [{ _type: 'span', text: '• Custom Fields: Add any data type to tasks with complete flexibility' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p5',
        style: 'normal',
        children: [{ _type: 'span', text: '• Automations: Build no-code workflows to eliminate repetitive tasks' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p6',
        style: 'normal',
        children: [{ _type: 'span', text: '• ClickUp Docs: Create wikis, knowledge bases, and collaborate on documents' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p7',
        style: 'normal',
        children: [{ _type: 'span', text: '• Goals & OKRs: Track measurable objectives and key results' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p8',
        style: 'normal',
        children: [{ _type: 'span', text: '• Time Tracking: Native time tracking with detailed reporting' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p9',
        style: 'normal',
        children: [{ _type: 'span', text: '• Whiteboards: Visual collaboration and brainstorming tools' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p10',
        style: 'normal',
        children: [{ _type: 'span', text: '• AI Features: AI-powered writing assistant and smart suggestions' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'h2-3',
        style: 'h2',
        children: [{ _type: 'span', text: 'Pros' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p11',
        style: 'normal',
        children: [{ _type: 'span', text: '✓ Comprehensive all-in-one solution' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p12',
        style: 'normal',
        children: [{ _type: 'span', text: '✓ Highly customizable and flexible' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p13',
        style: 'normal',
        children: [{ _type: 'span', text: '✓ Generous free plan with unlimited users' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p14',
        style: 'normal',
        children: [{ _type: 'span', text: '✓ Excellent value for money' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p15',
        style: 'normal',
        children: [{ _type: 'span', text: '✓ Regular updates and improvements' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'h2-4',
        style: 'h2',
        children: [{ _type: 'span', text: 'Cons' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p16',
        style: 'normal',
        children: [{ _type: 'span', text: '× Steep learning curve for new users' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p17',
        style: 'normal',
        children: [{ _type: 'span', text: '× Can be overwhelming with so many features' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p18',
        style: 'normal',
        children: [{ _type: 'span', text: '× Occasional performance issues reported' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'h2-5',
        style: 'h2',
        children: [{ _type: 'span', text: 'Pricing' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p19',
        style: 'normal',
        children: [{ _type: 'span', text: 'ClickUp offers competitive pricing with a generous free tier:' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p20',
        style: 'normal',
        children: [{ _type: 'span', text: '• Free Forever: Unlimited users, 100MB storage' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p21',
        style: 'normal',
        children: [{ _type: 'span', text: '• Unlimited: $7/user/month - Unlimited storage, integrations, dashboards' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p22',
        style: 'normal',
        children: [{ _type: 'span', text: '• Business: $12/user/month - Advanced features, 2FA, Google SSO' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p23',
        style: 'normal',
        children: [{ _type: 'span', text: '• Enterprise: Custom pricing - White labeling, advanced permissions, dedicated support' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'h2-6',
        style: 'h2',
        children: [{ _type: 'span', text: 'Final Verdict' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p24',
        style: 'normal',
        children: [{ _type: 'span', text: 'ClickUp is an exceptional project management platform that truly delivers on its promise of consolidating multiple tools into one. While the learning curve can be steep, teams that invest the time to customize ClickUp to their needs will find it an incredibly powerful ally in their productivity journey.' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'p25',
        style: 'normal',
        children: [{ _type: 'span', text: 'Overall Score: 8.5/10', marks: ['strong'] }],
        markDefs: []
      }
    ]
    
    // Update the review
    const result = await client
      .patch(review._id)
      .set({ 
        content,
        screenshots,
        screenshotGallery: screenshots,
        overallScore: 8.5,
        tagline: 'One app to replace them all',
        shortDescription: 'Comprehensive project management platform with unmatched flexibility and features'
      })
      .commit()

    console.log('✓ Successfully fixed ClickUp review')
    console.log(`  - Added ${content.length} content blocks`)
    console.log(`  - Added ${screenshots.length} screenshots`)

  } catch (error) {
    console.error('Error:', error)
  }
}

fixClickUp()