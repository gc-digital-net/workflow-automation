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

async function restoreClickUpContent() {
  try {
    const query = `*[_type == "software" && name == "ClickUp"][0]`
    const review = await client.fetch(query)
    
    if (!review) {
      console.log('ClickUp review not found')
      return
    }

    console.log(`Found ClickUp review with ID: ${review._id}`)
    
    // Create content field with basic structure that combines all the sections
    const content = [
      {
        _type: 'block',
        _key: 'overview-title',
        style: 'h2',
        children: [{ _type: 'span', text: 'Overview' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'overview-text',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'ClickUp is a comprehensive project management and productivity platform designed to consolidate all work tools into one application. It offers extensive customization options, making it suitable for teams of all sizes across various industries.'
        }],
        markDefs: []
      },
      
      // Key Features section
      {
        _type: 'block',
        _key: 'features-title',
        style: 'h2',
        children: [{ _type: 'span', text: 'Key Features' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'features-text',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'ClickUp provides an extensive feature set including:'
        }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'feature-1',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '• Customizable Views - Multiple view types including List, Board, Calendar, Gantt, and more'
        }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'feature-2',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '• Automation - Built-in automation to streamline repetitive tasks'
        }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'feature-3',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '• Integrations - Connect with 1000+ tools through native connections, Zapier, and API'
        }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'feature-4',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '• Collaboration - Real-time collaboration with comments, docs, and chat'
        }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'feature-5',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '• Time Tracking - Native time tracking and reporting'
        }],
        markDefs: []
      },
      
      // User Interface section
      {
        _type: 'block',
        _key: 'ui-title',
        style: 'h2',
        children: [{ _type: 'span', text: 'User Interface & Experience' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'ui-text',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'ClickUp offers a modern, intuitive interface with extensive customization options. Users can personalize their workspace with custom themes and layouts. The platform provides multiple view options to suit different work styles and preferences.'
        }],
        markDefs: []
      },
      
      // Integrations section
      {
        _type: 'block',
        _key: 'int-title',
        style: 'h2',
        children: [{ _type: 'span', text: 'Integration Capabilities' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'int-text',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'With over 1000 integrations through native connections, Zapier, and API, ClickUp connects seamlessly with your existing tech stack. Popular integrations include Slack, Google Drive, GitHub, Figma, and many more.'
        }],
        markDefs: []
      },
      
      // Performance section
      {
        _type: 'block',
        _key: 'perf-title',
        style: 'h2',
        children: [{ _type: 'span', text: 'Performance & Reliability' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'perf-text',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'ClickUp maintains high uptime and performance standards with regular updates and improvements. Mobile apps provide full functionality on the go, ensuring teams can stay productive from anywhere.'
        }],
        markDefs: []
      },
      
      // Security section
      {
        _type: 'block',
        _key: 'sec-title',
        style: 'h2',
        children: [{ _type: 'span', text: 'Security & Compliance' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'sec-text',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Enterprise-grade security with SOC 2 Type II certification, GDPR compliance, and advanced permission controls. ClickUp ensures your data is protected with industry-standard encryption and security practices.'
        }],
        markDefs: []
      },
      
      // Pricing section
      {
        _type: 'block',
        _key: 'price-title',
        style: 'h2',
        children: [{ _type: 'span', text: 'Pricing & Value' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'price-text',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'ClickUp offers flexible pricing with a generous free tier and scalable paid plans for growing teams. The free plan includes unlimited users and most core features, making it an excellent choice for small teams and startups.'
        }],
        markDefs: []
      },
      
      // Support section
      {
        _type: 'block',
        _key: 'support-title',
        style: 'h2',
        children: [{ _type: 'span', text: 'Customer Support' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'support-text',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '24/7 customer support with live chat, extensive documentation, video tutorials, and an active community forum. The ClickUp team is known for being responsive and helpful.'
        }],
        markDefs: []
      },
      
      // Use Cases section
      {
        _type: 'block',
        _key: 'use-title',
        style: 'h2',
        children: [{ _type: 'span', text: 'Ideal Use Cases' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'use-text',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'ClickUp is perfect for agile development teams, marketing agencies, remote teams, and growing startups. It excels in environments that require flexibility and customization.'
        }],
        markDefs: []
      },
      
      // Final Verdict
      {
        _type: 'block',
        _key: 'verdict-title',
        style: 'h2',
        children: [{ _type: 'span', text: 'Final Verdict' }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'verdict-text',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'ClickUp is a powerful, versatile project management solution that delivers exceptional value. It\'s highly recommended for teams seeking a comprehensive, customizable project management platform. While it may have a steeper learning curve due to its extensive features, the flexibility and value it provides make it worth the investment.'
        }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'who-should',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          marks: ['strong'],
          text: 'Best for: '
        },
        { 
          _type: 'span', 
          text: 'Teams that need flexibility, startups, agencies, and organizations wanting to consolidate tools.'
        }],
        markDefs: []
      },
      {
        _type: 'block',
        _key: 'who-avoid',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          marks: ['strong'],
          text: 'May not suit: '
        },
        { 
          _type: 'span', 
          text: 'Teams preferring simple, minimal tools or those with very specific industry requirements.'
        }],
        markDefs: []
      }
    ]
    
    // Update the review with the content field
    const result = await client
      .patch(review._id)
      .set({ content })
      .commit()

    console.log('✓ Successfully restored ClickUp review with content field')
    console.log(`  - Added ${content.length} content blocks`)
    console.log(`  - Review ID: ${result._id}`)

  } catch (error) {
    console.error('Error restoring content:', error)
  }
}

restoreClickUpContent()