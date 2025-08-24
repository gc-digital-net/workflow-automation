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

async function createFullClickUpReview() {
  console.log('Creating comprehensive ClickUp review...\n')
  
  try {
    // First, fetch existing ClickUp data to get references (logo, screenshots, etc.)
    const existingClickUp = await client.fetch(`*[_type == "software" && name == "ClickUp"][0]`)
    
    // Build comprehensive content structure
    const content = [
      // Introduction
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'ClickUp is an all-in-one project management and productivity platform that has rapidly gained traction among teams of all sizes. Founded in 2017, this ambitious platform aims to replace multiple workplace tools by combining project management, document collaboration, goal tracking, and communication features into a single, highly customizable workspace.' 
        }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'With over 10 million users worldwide and backing from top-tier investors, ClickUp has positioned itself as a serious competitor to established players like Asana, Monday.com, and Notion. But does it live up to its promise of being "one app to replace them all"? Let\'s dive deep into what makes ClickUp unique and whether it\'s the right choice for your team.' 
        }]
      },
      
      // Key Strengths Section
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '🎯 Key Strengths & Standout Features' }]
      },
      {
        _type: 'featureList',
        title: 'What Makes ClickUp Stand Out',
        features: [
          {
            name: 'Unmatched Customization',
            description: 'ClickUp offers the most extensive customization options in the project management space. From custom fields and statuses to completely personalized workflows, you can tailor every aspect to match your team\'s exact needs.'
          },
          {
            name: 'Multiple Views (15+)',
            description: 'Switch between List, Board, Calendar, Gantt, Timeline, Workload, Mind Map, Activity, Map, Table, Box, and more. Each view can be customized and saved for different use cases.'
          },
          {
            name: 'Hierarchy System',
            description: 'Unique workspace > space > folder > list > task > subtask hierarchy allows for complex organizational structures while maintaining clarity.'
          },
          {
            name: 'ClickApps Marketplace',
            description: 'Modular features that can be enabled/disabled per space, including Time Tracking, Sprints, Custom Fields, Automation, Dependencies, and more.'
          },
          {
            name: 'Built-in Docs & Whiteboards',
            description: 'Full-featured document editor with real-time collaboration, plus infinite canvas whiteboards for brainstorming and planning.'
          },
          {
            name: 'Goal Tracking (OKRs)',
            description: 'Set and track goals with automatic progress roll-up from connected tasks, perfect for OKR implementation.'
          }
        ]
      },
      
      // First Screenshot - Dashboard
      existingClickUp?.screenshots?.[0] && {
        _type: 'screenshot',
        image: existingClickUp.screenshots[0].image,
        caption: 'ClickUp\'s customizable dashboard provides a bird\'s-eye view of all your projects and metrics',
        size: 'large'
      },
      
      // How It Works Section
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '⚙️ How ClickUp Works' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'ClickUp operates on a hierarchical structure that provides both flexibility and organization:' 
        }]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: '1. Workspace Level' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Your entire organization exists within a workspace. This is where you manage users, set permissions, and configure organization-wide settings.' 
        }]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: '2. Spaces' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Divide your workspace into spaces for different teams, departments, or major projects. Each space can have its own set of features (ClickApps) enabled.' 
        }]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: '3. Folders & Lists' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'Organize work within spaces using folders (optional) and lists. Lists contain your actual tasks and can represent projects, workflows, or any grouping that makes sense.' 
        }]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: '4. Tasks & Subtasks' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'The core unit of work. Tasks can have subtasks, checklists, attachments, comments, and custom fields. They can be viewed and managed through any of the 15+ view types.' 
        }]
      },
      
      // Second Screenshot - Multiple Views
      existingClickUp?.screenshots?.[1] && {
        _type: 'screenshot',
        image: existingClickUp.screenshots[1].image,
        caption: 'Switch between 15+ different views including Kanban boards, Gantt charts, and calendars',
        size: 'large'
      },
      
      // Use Cases Section
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '💼 Who Should Use ClickUp?' }]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'Perfect For:' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '• Fast-growing startups that need a flexible system that can scale\n• Agencies managing multiple client projects with different workflows\n• Software development teams using Agile/Scrum methodologies\n• Marketing teams coordinating campaigns across multiple channels\n• Operations teams looking to standardize and automate processes\n• Remote teams needing robust collaboration features\n• Organizations wanting to consolidate multiple tools into one platform' 
        }]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'May Not Be Ideal For:' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '• Very small teams (under 5 people) who need something simpler\n• Organizations with strict compliance requirements (though ClickUp is SOC 2 certified)\n• Teams that prefer opinionated software with less customization\n• Users who find extensive features overwhelming\n• Companies needing advanced resource management and capacity planning' 
        }]
      },
      
      // Pros and Cons
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '⚖️ Pros & Cons' }]
      },
      {
        _type: 'prosConsBlock',
        pros: [
          'Incredibly feature-rich with everything included in one platform',
          'Generous free plan for unlimited users (with limitations)',
          'Extensive customization options for any workflow',
          '15+ view types to visualize work differently',
          'Excellent value for money compared to competitors',
          'Regular updates and new features (weekly releases)',
          'Strong automation capabilities with no-code builder',
          'Native time tracking included at no extra cost',
          'Responsive customer support with 24/7 availability',
          'Great API and webhook support for developers'
        ],
        cons: [
          'Steep learning curve due to extensive features',
          'Can feel overwhelming for new users',
          'Mobile apps lag behind web version in functionality',
          'Performance can slow down with very large workspaces',
          'Some views and features feel unpolished',
          'Notification system can be overwhelming if not configured properly',
          'Limited formatting options in task descriptions',
          'No built-in invoicing or advanced financial features'
        ]
      },
      
      // Pricing Section
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '💰 Pricing & Plans' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'ClickUp offers one of the most competitive pricing structures in the project management space, with a generous free tier and affordable paid plans:' 
        }]
      },
      {
        _type: 'pricingTable',
        title: 'ClickUp Pricing Plans',
        plans: [
          {
            name: 'Free Forever',
            price: '$0',
            features: [
              'Unlimited users',
              'Unlimited tasks',
              '100MB storage',
              '2-factor authentication',
              'Collaborative Docs',
              'Whiteboards',
              'Real-time chat',
              '24/7 support',
              'Limited integrations'
            ],
            highlighted: false
          },
          {
            name: 'Unlimited',
            price: '$7/user/month',
            features: [
              'Everything in Free',
              'Unlimited storage',
              'Unlimited integrations',
              'Unlimited dashboards',
              'Guests with permissions',
              'Goals & Portfolios',
              'Custom fields',
              'Form view',
              'Resource management'
            ],
            highlighted: true
          },
          {
            name: 'Business',
            price: '$12/user/month',
            features: [
              'Everything in Unlimited',
              'Google SSO',
              'Unlimited teams',
              'Custom exporting',
              'Advanced automations',
              'Timeline & Workload view',
              'Granular time estimates',
              'Milestone tracking',
              'Advanced permissions'
            ],
            highlighted: false
          },
          {
            name: 'Enterprise',
            price: 'Custom pricing',
            features: [
              'Everything in Business',
              'White labeling',
              'Advanced permissions',
              'Enterprise SSO (SAML)',
              'Contract & MSA',
              'Dedicated success manager',
              'Custom capacity',
              'API rate limit increase',
              'Priority support'
            ],
            highlighted: false
          }
        ]
      },
      
      // Third Screenshot - Automation
      existingClickUp?.screenshots?.[2] && {
        _type: 'screenshot',
        image: existingClickUp.screenshots[2].image,
        caption: 'Build powerful no-code automations to streamline repetitive tasks',
        size: 'large'
      },
      
      // Integration Section
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '🔗 Integrations & Compatibility' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'ClickUp integrates with over 1,000+ tools through native integrations, Zapier, and API connections. The platform is designed to be the central hub for all your work, connecting seamlessly with your existing tool stack.' 
        }]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'Popular Native Integrations:' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '• Communication: Slack, Microsoft Teams, Discord, Zoom\n• Development: GitHub, GitLab, Bitbucket, Sentry\n• File Storage: Google Drive, Dropbox, OneDrive, Box\n• Calendar: Google Calendar, Outlook Calendar\n• Design: Figma, Adobe Creative Cloud, Miro\n• Sales/CRM: HubSpot, Salesforce, Intercom\n• Productivity: Toggl, Harvest, Everhour, Clockify\n• Email: Gmail, Outlook, Front' 
        }]
      },
      
      // Performance & Reliability
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '🚀 Performance & Reliability' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'ClickUp maintains a 99.9% uptime SLA for paid plans and has shown consistent reliability over the past year. The platform uses AWS infrastructure with data centers globally to ensure fast performance.' 
        }]
      },
      {
        _type: 'featureList',
        title: 'Performance Metrics',
        features: [
          {
            name: 'Uptime',
            description: '99.9% uptime guarantee for Business and Enterprise plans'
          },
          {
            name: 'API Response Time',
            description: 'Average API response time under 200ms'
          },
          {
            name: 'Data Centers',
            description: 'Multiple AWS regions for global performance'
          },
          {
            name: 'Security',
            description: 'SOC 2 Type II certified, GDPR compliant, 256-bit SSL encryption'
          }
        ]
      },
      
      // Fourth Screenshot - Docs
      existingClickUp?.screenshots?.[3] && {
        _type: 'screenshot',
        image: existingClickUp.screenshots[3].image,
        caption: 'Create and collaborate on documents directly within ClickUp',
        size: 'medium'
      },
      
      // Fifth Screenshot - Goals
      existingClickUp?.screenshots?.[4] && {
        _type: 'screenshot',
        image: existingClickUp.screenshots[4].image,
        caption: 'Track OKRs and goals with automatic progress updates from connected tasks',
        size: 'medium'
      },
      
      // Customer Support Section
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '🤝 Customer Support & Resources' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'ClickUp provides comprehensive support across all plans, including their free tier:' 
        }]
      },
      {
        _type: 'featureList',
        title: 'Support Channels',
        features: [
          {
            name: '24/7 Live Chat',
            description: 'Available for all users, including free plan'
          },
          {
            name: 'Email Support',
            description: 'Typical response time within 24 hours'
          },
          {
            name: 'ClickUp University',
            description: 'Extensive library of video tutorials, courses, and certifications'
          },
          {
            name: 'Help Documentation',
            description: 'Detailed guides for every feature with screenshots and videos'
          },
          {
            name: 'Community Forum',
            description: 'Active community with 50,000+ members sharing tips and templates'
          },
          {
            name: 'Webinars',
            description: 'Weekly live training sessions and feature deep-dives'
          }
        ]
      },
      
      // Comparison Section
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '📊 How ClickUp Compares' }]
      },
      {
        _type: 'comparisonTable',
        title: 'ClickUp vs Competitors',
        items: [
          {
            feature: 'Starting Price',
            thisProduct: '$7/user/month',
            competitor1: 'Asana: $10.99/user/month',
            competitor2: 'Monday: $8/user/month'
          },
          {
            feature: 'Free Plan Users',
            thisProduct: 'Unlimited',
            competitor1: 'Asana: 15 users',
            competitor2: 'Monday: 2 users'
          },
          {
            feature: 'View Types',
            thisProduct: '15+',
            competitor1: 'Asana: 7',
            competitor2: 'Monday: 10'
          },
          {
            feature: 'Native Time Tracking',
            thisProduct: '✅ Included',
            competitor1: '❌ Not included',
            competitor2: '⚠️ Limited'
          },
          {
            feature: 'Built-in Docs',
            thisProduct: '✅ Full editor',
            competitor1: '⚠️ Basic',
            competitor2: '✅ Workdocs'
          },
          {
            feature: 'Automation',
            thisProduct: '✅ Unlimited',
            competitor1: '⚠️ Limited by plan',
            competitor2: '✅ Good'
          },
          {
            feature: 'Custom Fields',
            thisProduct: '✅ All plans',
            competitor1: '⚠️ Paid only',
            competitor2: '✅ All plans'
          },
          {
            feature: 'API Access',
            thisProduct: '✅ All plans',
            competitor1: '✅ All plans',
            competitor2: '⚠️ Paid only'
          }
        ]
      },
      
      // Recent Updates
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '🆕 Recent Updates & Roadmap' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'ClickUp maintains an aggressive development schedule with weekly releases. Recent major updates include:' 
        }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: '• ClickUp 3.0 - Complete redesign with improved performance and UX\n• AI Integration - ClickUp Brain for intelligent automation and writing assistance\n• Universal Search - Search across all your connected tools\n• Whiteboards 2.0 - Enhanced collaboration features and templates\n• Form View Improvements - Conditional logic and advanced formatting\n• Sprint Management - Enhanced Agile features for development teams' 
        }]
      },
      
      // FAQ Section
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '❓ Frequently Asked Questions' }]
      },
      {
        _type: 'faqBlock',
        title: 'Common Questions About ClickUp',
        items: [
          {
            question: 'Is ClickUp really free for unlimited users?',
            answer: 'Yes! ClickUp\'s free plan supports unlimited users with unlimited tasks. The main limitations are 100MB storage total, limited integrations, and some advanced features are restricted. It\'s one of the most generous free plans in the industry.'
          },
          {
            question: 'How steep is the learning curve?',
            answer: 'ClickUp has a steeper learning curve than simpler tools like Trello or Todoist, but it\'s more intuitive than complex platforms like Jira. Most teams are productive within 1-2 weeks, and ClickUp University provides excellent training resources. Start simple and add features gradually.'
          },
          {
            question: 'Can ClickUp replace multiple tools?',
            answer: 'For many teams, yes. ClickUp can replace project management tools, document collaboration tools, goal tracking software, and basic CRM functionality. However, it may not fully replace specialized tools like advanced CRM systems, accounting software, or design tools.'
          },
          {
            question: 'How does ClickUp handle large teams?',
            answer: 'ClickUp scales well up to several hundred users. Enterprise features like SSO, advanced permissions, and dedicated infrastructure support large organizations. Some enterprises with 1000+ users report occasional performance issues that are usually resolved with proper workspace organization.'
          },
          {
            question: 'Is my data secure in ClickUp?',
            answer: 'Yes. ClickUp is SOC 2 Type II certified, GDPR compliant, and uses 256-bit SSL encryption. They perform regular security audits, offer 2FA, and have a 99.9% uptime SLA. Data is backed up continuously across multiple AWS regions.'
          },
          {
            question: 'Can I migrate from another tool?',
            answer: 'Yes! ClickUp offers native importers for Asana, Trello, Monday.com, Jira, Todoist, and others. They also provide CSV import and API access for custom migrations. Their support team offers migration assistance for paid plans.'
          },
          {
            question: 'What\'s the difference between Spaces, Folders, and Lists?',
            answer: 'Spaces are the highest level of organization (like departments), Folders group related Lists (optional), and Lists contain your actual tasks. Think of it as: Workspace > Space (Marketing) > Folder (Q1 Campaigns) > List (Email Campaign) > Tasks.'
          },
          {
            question: 'Does ClickUp work offline?',
            answer: 'ClickUp has limited offline functionality. You can view cached data, but creating or editing tasks requires an internet connection. The mobile apps have better offline support than the web version, syncing changes when reconnected.'
          }
        ]
      },
      
      // Final Verdict
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '🎯 Final Verdict' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'ClickUp stands out as one of the most ambitious and feature-complete project management platforms available today. Its "one app to replace them all" vision is largely realized, offering incredible value especially for growing teams that need flexibility and scalability.' 
        }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'The platform excels in customization, variety of views, and sheer feature depth. The generous free plan and competitive pricing make it accessible to teams of all sizes. While the learning curve can be steep and the abundance of features overwhelming initially, teams that invest time in proper setup and training often find ClickUp becomes indispensable.' 
        }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: 'For teams willing to embrace its complexity in exchange for unmatched flexibility and value, ClickUp is an excellent choice. Start with the free plan, take advantage of their extensive training resources, and gradually expand your usage as you become comfortable with the platform.' 
        }]
      },
      
      // Call to Action
      {
        _type: 'ctaBlock',
        title: 'Ready to Transform Your Productivity?',
        description: 'Join over 10 million users who have consolidated their work in ClickUp. Start with the free plan and scale as you grow.',
        buttonText: 'Try ClickUp Free',
        buttonUrl: 'https://clickup.com/?fp_ref=workflowautomation'
      }
    ].filter(Boolean) // Remove any undefined items
    
    // Prepare screenshot gallery (remaining screenshots)
    const screenshotGallery = existingClickUp?.screenshots?.slice(5).map((screenshot: any) => ({
      image: screenshot.image,
      caption: screenshot.caption || ''
    })) || []
    
    // Create the complete document
    const clickUpReview = {
      _type: 'software',
      _id: existingClickUp?._id || 'clickup-review',
      name: 'ClickUp',
      slug: { current: 'clickup' },
      logo: existingClickUp?.logo,
      tagline: 'One app to replace them all',
      excerpt: 'ClickUp is an all-in-one project management platform combining tasks, docs, goals, and chat. Known for extensive customization options and generous free plan.',
      overallScore: 9.2,
      scores: {
        easeOfUse: 7.8,
        features: 9.7,
        value: 9.5,
        support: 8.9,
        integrations: 9.3
      },
      content: content,
      screenshotGallery: screenshotGallery,
      quickInfo: {
        startingPrice: '$7/user/month',
        freeTrial: 'Free forever plan',
        bestFor: 'Teams of 10-500 who need flexibility',
        integrations: '1000+'
      },
      popularIntegrations: [
        'Slack',
        'GitHub',
        'Google Drive',
        'Zoom',
        'Microsoft Teams',
        'Figma',
        'Dropbox',
        'Zapier',
        'Gmail',
        'Outlook',
        'HubSpot',
        'Salesforce',
        'Jira',
        'GitLab',
        'Discord'
      ],
      affiliateLink: 'https://clickup.com/?fp_ref=workflowautomation',
      categories: existingClickUp?.categories || [],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'ClickUp Review 2024: Pricing, Features, Pros & Cons',
        metaDescription: 'Comprehensive ClickUp review covering features, pricing, integrations, and real user experiences. Find out if ClickUp is the right project management tool for your team.'
      }
    }
    
    // Update or create the document
    let result
    if (existingClickUp?._id) {
      console.log('Updating existing ClickUp review...')
      result = await client
        .patch(existingClickUp._id)
        .set(clickUpReview)
        .commit()
    } else {
      console.log('Creating new ClickUp review...')
      result = await client.create(clickUpReview)
    }
    
    console.log('✅ Successfully created comprehensive ClickUp review!')
    console.log(`Document ID: ${result._id}`)
    console.log(`\nContent sections: ${content.filter(c => c._type === 'block' && c.style === 'h2').length}`)
    console.log(`Inline screenshots: ${content.filter(c => c._type === 'screenshot').length}`)
    console.log(`Custom blocks: ${content.filter(c => c._type && !['block', 'screenshot'].includes(c._type)).length}`)
    console.log(`\nView at: http://localhost:3005/reviews/clickup`)
    
  } catch (error) {
    console.error('Error creating review:', error)
    throw error
  }
}

// Run the script
createFullClickUpReview()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })