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

async function fixClickUpComplete() {
  console.log('Fixing ClickUp review completely...')
  
  try {
    // Get existing ClickUp document
    const clickup = await client.fetch(`*[_type == "software" && name == "ClickUp"][0]`)
    
    if (!clickup) {
      console.log('ClickUp review not found!')
      return
    }
    
    // Get all ClickUp screenshots
    const screenshots = await client.fetch(`*[_type == "sanity.imageAsset" && originalFilename match "clickup*"] | order(_createdAt desc) {
      _id,
      url,
      originalFilename
    }`)
    
    console.log(`Found ${screenshots.length} ClickUp screenshots`)
    
    // Fix missing data
    const updates = {
      // Company Info
      companyInfo: {
        founded: '2017',
        headquarters: 'San Diego, CA',
        companySize: '800+ employees',
        funding: '$538M Series C'
      },
      
      // Support Info
      supportInfo: {
        liveChat: true,
        emailSupport: true,
        knowledgeBase: true,
        videoTutorials: true,
        supportDetails: '24/7 support available on all plans including free. Average response time under 2 hours.'
      },
      
      // Security Info
      securityInfo: {
        soc2: true,
        gdpr: true,
        ssl: true,
        uptime: '99.9%',
        otherCertifications: [
          'ISO 27001',
          'HIPAA Compliant',
          'Privacy Shield',
          'CCPA Compliant'
        ]
      },
      
      // Quick Info
      quickInfo: {
        startingPrice: '$7/user/month',
        freeTrial: 'Free forever plan',
        bestFor: 'Teams of 10-500 who need flexibility',
        integrations: '1000+'
      },
      
      // Build comprehensive content with proper screenshots
      content: [
        // OVERVIEW SECTION
        {
          _type: 'block',
          _key: 'overview-intro',
          style: 'h2',
          children: [{ _type: 'span', text: 'Overview' }]
        },
        {
          _type: 'block',
          _key: 'overview-1',
          style: 'normal',
          children: [
            { _type: 'span', text: 'ClickUp is a comprehensive project management and productivity platform designed to consolidate all your work tools into one powerful application. Founded in 2017, ClickUp has quickly grown to serve over 800,000 teams worldwide, from startups to Fortune 500 companies.' }
          ]
        },
        {
          _type: 'block',
          _key: 'overview-2',
          style: 'normal',
          children: [
            { _type: 'span', text: 'With its "one app to replace them all" philosophy, ClickUp combines project management, document collaboration, goal tracking, time management, and communication tools into a single, highly customizable platform.' }
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
              _ref: screenshots.find((s: any) => s.originalFilename.toLowerCase().includes('dashboard'))._id
            }
          },
          caption: 'ClickUp Dashboard - Complete overview of your workspace',
          size: 'large'
        },
        
        // KEY FEATURES SECTION
        {
          _type: 'block',
          _key: 'features-heading',
          style: 'h2',
          children: [{ _type: 'span', text: 'Key Features' }]
        },
        
        {
          _type: 'featureList',
          _key: 'features-list',
          title: 'Core Capabilities',
          features: [
            {
              _key: 'f1',
              name: 'Multiple Views',
              description: '15+ ways to view your work including List, Board, Calendar, Gantt, Timeline, Workload, and more'
            },
            {
              _key: 'f2',
              name: 'Custom Fields',
              description: 'Create any field type to track budgets, emails, phone numbers, dropdowns, formulas, and more'
            },
            {
              _key: 'f3',
              name: 'Automation',
              description: '100+ automation templates plus custom automation builder to eliminate repetitive tasks'
            },
            {
              _key: 'f4',
              name: 'ClickUp AI',
              description: 'AI-powered assistant for writing, summarizing, and generating action items'
            },
            {
              _key: 'f5',
              name: 'Time Tracking',
              description: 'Native time tracking with timesheets, billable hours, and time estimates'
            },
            {
              _key: 'f6',
              name: 'Goals & OKRs',
              description: 'Set measurable targets with automatic progress tracking from tasks'
            },
            {
              _key: 'f7',
              name: 'Docs & Wiki',
              description: 'Create wikis, knowledge bases, and SOPs with real-time collaboration'
            },
            {
              _key: 'f8',
              name: 'Whiteboards',
              description: 'Visual collaboration with mind maps and diagrams that convert to tasks'
            },
            {
              _key: 'f9',
              name: 'Chat & Comments',
              description: 'Built-in chat, threaded comments, and @mentions for team communication'
            },
            {
              _key: 'f10',
              name: 'Forms',
              description: 'Create forms that automatically convert submissions into tasks'
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
              _ref: screenshots.find((s: any) => s.originalFilename.toLowerCase().includes('projects'))._id
            }
          },
          caption: 'Project Management - Multiple views for different work styles',
          size: 'large'
        },
        
        // PRICING SECTION
        {
          _type: 'block',
          _key: 'pricing-heading',
          style: 'h2',
          children: [{ _type: 'span', text: 'Pricing Plans' }]
        },
        
        {
          _type: 'pricingTable',
          _key: 'pricing-table',
          title: 'Choose Your Plan',
          plans: [
            {
              _key: 'free',
              name: 'Free Forever',
              price: '$0',
              features: [
                'Unlimited tasks',
                'Unlimited members',
                '100MB storage',
                '2-factor authentication',
                'Collaborative docs',
                'Whiteboards',
                'Sprint management'
              ],
              highlighted: false
            },
            {
              _key: 'unlimited',
              name: 'Unlimited',
              price: '$7/user/month',
              features: [
                'Everything in Free',
                'Unlimited storage',
                'Unlimited integrations',
                'Unlimited dashboards',
                'Guests & permissions',
                'Goals & portfolios',
                'Forms',
                'Resource management'
              ],
              highlighted: true
            },
            {
              _key: 'business',
              name: 'Business',
              price: '$12/user/month',
              features: [
                'Everything in Unlimited',
                'Google SSO',
                'Unlimited teams',
                'Custom exporting',
                'Advanced automations',
                'Advanced dashboard features',
                'Workload management',
                'Timelines & Mind Maps'
              ],
              highlighted: false
            },
            {
              _key: 'enterprise',
              name: 'Enterprise',
              price: 'Custom pricing',
              features: [
                'Everything in Business',
                'White labeling',
                'Advanced permissions',
                'Enterprise API',
                'Dedicated success manager',
                'Custom capacity',
                'HIPAA compliance',
                'Priority support'
              ],
              highlighted: false
            }
          ]
        },
        
        // PROS AND CONS
        {
          _type: 'prosConsBlock',
          _key: 'procons',
          pros: [
            'Extremely customizable and flexible',
            'Generous free plan for unlimited users',
            'All-in-one solution replaces multiple tools',
            'Regular feature updates and improvements',
            'Strong mobile apps for iOS and Android',
            'Excellent value for money',
            'Native time tracking included',
            'No per-guest charges'
          ],
          cons: [
            'Steep learning curve for new users',
            'Can be overwhelming with many features',
            'Performance can slow with large datasets',
            'Mobile app less feature-rich than desktop',
            'Limited offline functionality'
          ]
        },
        
        // AI Screenshot
        {
          _type: 'screenshot',
          _key: 'screen-ai',
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: screenshots.find((s: any) => s.originalFilename.toLowerCase().includes('ai'))._id
            }
          },
          caption: 'ClickUp AI - Your intelligent work assistant',
          size: 'large'
        },
        
        // ALTERNATIVES SECTION
        {
          _type: 'block',
          _key: 'alternatives-heading',
          style: 'h2',
          children: [{ _type: 'span', text: 'ClickUp Alternatives' }]
        },
        
        {
          _type: 'comparisonTable',
          _key: 'alternatives-table',
          title: 'How ClickUp Compares',
          items: [
            {
              _key: 'alt1',
              feature: 'Starting Price',
              thisProduct: '$7/user/month',
              competitor1: 'Asana: $10.99/user/month',
              competitor2: 'Monday: $8/user/month'
            },
            {
              _key: 'alt2',
              feature: 'Free Plan',
              thisProduct: 'Unlimited users',
              competitor1: 'Asana: 15 users',
              competitor2: 'Monday: 2 users'
            },
            {
              _key: 'alt3',
              feature: 'Views',
              thisProduct: '15+ views',
              competitor1: 'Asana: 7 views',
              competitor2: 'Monday: 10 views'
            },
            {
              _key: 'alt4',
              feature: 'Native Time Tracking',
              thisProduct: '✓ Included',
              competitor1: '✗ Via integration',
              competitor2: '✓ Included'
            },
            {
              _key: 'alt5',
              feature: 'Docs/Wiki',
              thisProduct: '✓ Included',
              competitor1: '✗ Limited',
              competitor2: '✓ Included'
            },
            {
              _key: 'alt6',
              feature: 'Automation',
              thisProduct: '✓ Advanced',
              competitor1: '✓ Basic',
              competitor2: '✓ Advanced'
            }
          ]
        },
        
        // Automation Screenshot
        {
          _type: 'screenshot',
          _key: 'screen-automation',
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: screenshots.find((s: any) => s.originalFilename.toLowerCase().includes('automation'))._id
            }
          },
          caption: 'ClickUp Automations - No-code workflow automation',
          size: 'large'
        },
        
        // FAQ SECTION
        {
          _type: 'faqBlock',
          _key: 'faqs',
          title: 'Frequently Asked Questions',
          items: [
            {
              _key: 'faq1',
              question: 'Is ClickUp really free?',
              answer: 'Yes, ClickUp offers a generous free plan with unlimited users, unlimited tasks, and most core features. The free plan includes 100MB of storage and access to most views and features.'
            },
            {
              _key: 'faq2',
              question: 'How does ClickUp compare to Notion?',
              answer: 'While Notion excels at documentation and knowledge management, ClickUp is purpose-built for project management with features like Gantt charts, time tracking, and advanced automation that Notion lacks.'
            },
            {
              _key: 'faq3',
              question: 'Can ClickUp handle enterprise needs?',
              answer: 'Yes, ClickUp offers an Enterprise plan with advanced security features, SSO, HIPAA compliance, dedicated support, and custom contracts for large organizations.'
            },
            {
              _key: 'faq4',
              question: 'What integrations does ClickUp support?',
              answer: 'ClickUp integrates with over 1,000 tools including Slack, Google Workspace, Microsoft 365, GitHub, Salesforce, HubSpot, and Zapier for extended connectivity.'
            },
            {
              _key: 'faq5',
              question: 'Is there a mobile app?',
              answer: 'Yes, ClickUp offers native mobile apps for iOS and Android with most desktop features available, though some advanced features work best on desktop.'
            }
          ]
        },
        
        // CTA
        {
          _type: 'ctaBlock',
          _key: 'cta',
          title: 'Ready to Get Started with ClickUp?',
          description: 'Join over 800,000 teams using ClickUp to be more productive. Start with the free plan and upgrade as you grow.',
          buttonText: 'Try ClickUp Free',
          buttonUrl: 'https://clickup.com'
        }
      ]
    }
    
    // Update document
    console.log('Updating ClickUp document...')
    await client
      .patch(clickup._id)
      .set(updates)
      .commit()
    
    console.log('✅ Successfully fixed ClickUp review!')
    console.log('- Company info restored')
    console.log('- Support info restored')
    console.log('- Security info restored')
    console.log('- Quick info restored')
    console.log('- Content sections: Overview, Features, Pricing, Alternatives')
    console.log('- Screenshots integrated: Dashboard, Projects, AI, Automation')
    
  } catch (error) {
    console.error('Error:', error)
  }
}

fixClickUpComplete()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })