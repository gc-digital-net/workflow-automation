import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

// Try multiple env file locations
dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env.production' })
dotenv.config({ path: '.env' })

// Hardcode the values since they're public anyway
const projectId = 'x1zu4x72'
const dataset = 'production'

console.log('Using Sanity config:', { projectId, dataset })

const client = createClient({
  projectId: projectId,
  dataset: dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN || '',
})

async function createMondayReview() {
  console.log('📝 Creating Monday.com review in Sanity...\n')

  // Read the markdown content - using the new review file
  const markdownPath = path.join(process.cwd(), 'monday-review-final.md')
  const markdownContent = fs.readFileSync(markdownPath, 'utf-8')
  
  // Parse the markdown to extract sections
  const sections = markdownContent.split('\n---\n')
  
  try {
    // Create the review document
    const review = {
      _type: 'software',
      name: 'Monday.com',
      slug: { current: 'monday-com' },
      tagline: 'The Visual Work OS That Makes Work Flow',
      excerpt: 'Monday.com is the most visually intuitive project management platform that transforms how teams work together. With colorful boards, powerful automation, and incredible flexibility, it makes project management actually enjoyable.',
      
      // Scoring based on review
      overallScore: 9.0,
      scores: {
        easeOfUse: 9.0,
        features: 8.5,
        value: 7.5,
        support: 8.0,
        integrations: 9.0,
        performance: 8.5,
        customization: 9.5,
        collaboration: 9.0,
        automation: 9.0,
        reporting: 7.0,
        mobile: 6.5,
        scalability: 9.0,
        security: 8.5,
        innovation: 8.5,
        documentation: 8.0
      },
      
      // Quick Info
      quickInfo: {
        startingPrice: '$9/user/month',
        freeTrialDays: '14',
        freePlanAvailable: 'Limited (2 users max)',
        setupTime: '< 30 minutes',
        bestForTeamSize: '5-500',
        deploymentOptions: ['Cloud'],
        industries: ['Marketing', 'Operations', 'Creative', 'Tech', 'Remote Teams']
      },
      
      // Company Info
      companyInfo: {
        founded: '2012',
        headquarters: 'Tel Aviv, Israel',
        companySize: '1,800+ employees',
        funding: '$574M raised',
        publicCompany: 'Yes (NASDAQ: MNDY)',
        revenue: '$700M+ ARR',
        customers: '180,000+'
      },
      
      // Support Info
      supportInfo: {
        liveChat: false,
        emailSupport: true,
        phoneSupport: 'Enterprise only',
        knowledgeBase: true,
        videoTutorials: true,
        supportDetails: 'Email support 24-48h response. Priority support on Pro plan. Phone support and CSM on Enterprise.',
        languages: ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Dutch', 'Japanese']
      },
      
      // Security Info
      securityInfo: {
        soc2: true,
        gdpr: true,
        ssl: true,
        iso27001: true,
        hipaa: 'Enterprise only',
        uptime: '99.9%',
        twoFactorAuth: true,
        sso: 'Enterprise plan',
        dataEncryption: 'AES-256',
        dataBackup: 'Continuous',
        otherCertifications: ['ISO 27017', 'ISO 27018', 'TRUSTe certified']
      },
      
      // Popular Integrations
      popularIntegrations: [
        'Slack',
        'Microsoft Teams', 
        'Gmail',
        'Outlook',
        'Google Drive',
        'Dropbox',
        'Zoom',
        'Salesforce',
        'HubSpot',
        'Jira',
        'GitHub',
        'Zapier'
      ],
      
      // Platform Info
      platformInfo: {
        mobileApps: ['iOS', 'Android'],
        desktopApps: ['Windows', 'Mac'],
        browserSupport: ['Chrome', 'Firefox', 'Safari', 'Edge'],
        api: true,
        webhooks: true,
        customApps: true,
        offlineMode: false,
        dataExport: ['CSV', 'Excel', 'PDF'],
        dataImport: ['CSV', 'Excel', 'Trello', 'Asana', 'Basecamp']
      },
      
      // Pricing Plans
      pricing: [
        {
          name: 'Individual',
          price: '$0',
          billingPeriod: 'Forever',
          features: [
            'Up to 2 users',
            'Up to 3 boards',
            '200 items max',
            'Basic features only'
          ],
          limitations: [
            'No Timeline view',
            'No integrations',
            'No automation',
            'No guest access'
          ],
          highlighted: false
        },
        {
          name: 'Basic',
          price: '$9/user/month',
          billingPeriod: 'Billed annually',
          features: [
            'Unlimited boards',
            'Unlimited items',
            '5GB storage',
            '250 automation actions/month',
            'iOS & Android apps'
          ],
          limitations: [
            'No Timeline/Gantt view',
            'No guest access',
            'Limited integrations',
            'No calendar sync'
          ],
          highlighted: false
        },
        {
          name: 'Standard',
          price: '$12/user/month',
          billingPeriod: 'Billed annually',
          features: [
            'Everything in Basic',
            'Timeline & Calendar views',
            'Guest access',
            '250 integrations',
            '250 automation actions/month/seat',
            'Forms'
          ],
          limitations: [
            'No time tracking',
            'No private boards',
            'Basic dashboards only'
          ],
          highlighted: true,
          recommended: true
        },
        {
          name: 'Pro',
          price: '$20/user/month',
          billingPeriod: 'Billed annually',
          features: [
            'Everything in Standard',
            'Time tracking',
            'Formula columns',
            'Dependency columns',
            'Private boards',
            '25,000 automation actions/month',
            'Chart views',
            'API access'
          ],
          limitations: [
            'No advanced security',
            'No enterprise features'
          ],
          highlighted: false
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          billingPeriod: 'Contact sales',
          features: [
            'Everything in Pro',
            'Enterprise-grade security',
            'Advanced permissions',
            'SAML SSO',
            'Audit logs',
            'Multi-level permissions',
            '99.9% uptime SLA',
            'Dedicated CSM',
            'Premium support'
          ],
          limitations: [],
          highlighted: false
        }
      ],
      
      // Pros and Cons
      pros: [
        'Most visually intuitive interface in the market',
        'Powerful automation saves hours weekly',
        'Incredible customization flexibility',
        'Excellent template library',
        'Strong integration ecosystem',
        'Scales beautifully from small to large teams',
        'Color coding makes status instantly clear',
        'Multiple views for different work styles',
        'Guest access for client collaboration',
        'Regular feature updates and improvements'
      ],
      
      cons: [
        'Gets expensive quickly with larger teams',
        'Mobile app lacks many features',
        'Search functionality is basic',
        'Reporting across boards is complicated',
        '3-seat minimum even for small teams',
        'Timeline view requires paid plan',
        'Learning curve for advanced features',
        'No true offline functionality',
        'Time tracking only in Pro plan',
        'Can become cluttered with many boards'
      ],
      
      // Use Cases
      useCases: [
        'Marketing campaign management',
        'Product launches',
        'Creative agency workflows',
        'Sales pipeline tracking',
        'HR onboarding processes',
        'Event planning',
        'Content calendars',
        'Client project management',
        'Remote team coordination',
        'Operations management'
      ],
      
      // Affiliate Info
      affiliateLink: 'https://mondaycom.grsm.io/workflowautomation',
      affiliateCommission: '30% recurring',
      cookieDuration: '90 days',
      exclusiveDiscount: 'WORKFLOW20',
      
      // Content (we'll use a simplified version for now)
      content: [
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: '🎯 Why Monday.com Stands Out' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{ 
            _type: 'span', 
            text: 'After three months of intensive testing with a 12-person team, Monday.com proved to be the most visually intuitive project management platform available. Its colorful interface, powerful automation, and incredible flexibility make it a joy to use - though the premium pricing may give smaller teams pause.'
          }]
        },
        {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: 'Key Strengths' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{ 
            _type: 'span', 
            text: 'Visual Workflows: The color-coded system makes project status instantly clear. No decoding required - green means go, yellow means in progress, red means stuck. This visual language is consistent throughout the platform.'
          }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{ 
            _type: 'span', 
            text: 'Powerful Automation: Save hours weekly with sophisticated multi-step automations. When a contract is signed, Monday.com can automatically create projects, assign tasks, send emails, and update calendars - all without manual intervention.'
          }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{ 
            _type: 'span', 
            text: 'Flexible Views: 10+ ways to view the same data. Kanban for visual thinkers, Timeline for project managers, Workload for resource planning, Calendar for deadline tracking. Switch views with one click.'
          }]
        },
        {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: 'Who Should Use Monday.com' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{ 
            _type: 'span', 
            text: 'Monday.com excels for marketing teams, creative agencies, operations teams, and any group that values visual communication. Teams of 5-500 will find the most value, especially those who have struggled with adoption of more complex tools.'
          }]
        },
        {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: 'Pricing Considerations' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{ 
            _type: 'span', 
            text: 'Starting at $9/user/month with a 3-seat minimum, Monday.com is pricier than competitors. Most teams need the Standard plan ($12/user/month) for essential features like Timeline view and guest access. Pro plan ($20/user/month) adds time tracking and advanced features.'
          }]
        },
        {
          _type: 'ctaBlock',
          title: 'Ready to transform your workflow?',
          description: 'Start your 14-day free trial of Monday.com today. No credit card required.',
          buttonText: 'Try Monday.com Free',
          buttonUrl: 'https://mondaycom.grsm.io/workflowautomation'
        }
      ],
      
      // SEO
      seo: {
        metaTitle: 'Monday.com Review 2025: Pricing, Features & Honest Assessment',
        metaDescription: 'In-depth Monday.com review after 90 days of testing. Visual project management at its best, but premium pricing. See if it\'s worth it for your team.',
        focusKeyword: 'monday.com review',
        canonicalUrl: 'https://workflowautomation.net/reviews/monday-com'
      },
      
      // Metadata
      reviewDate: new Date().toISOString(),
      lastReviewUpdate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      
      // Categories (we'll need to get the actual category IDs)
      // categories: ['project-management', 'work-os', 'team-collaboration']
    }
    
    // Check if review already exists
    const existing = await client.fetch(
      `*[_type == "software" && slug.current == "monday-com"][0]`
    )
    
    let result
    if (existing) {
      console.log('📝 Updating existing Monday.com review...')
      result = await client
        .patch(existing._id)
        .set(review)
        .commit()
    } else {
      console.log('✨ Creating new Monday.com review...')
      result = await client.create(review)
    }
    
    console.log('✅ Successfully created/updated Monday.com review!')
    console.log(`📌 Document ID: ${result._id}`)
    console.log(`🔗 View at: http://localhost:3000/reviews/monday-com`)
    console.log('\n📸 Note: Screenshots need to be added manually to Sanity Studio')
    console.log('   Screenshots needed:')
    console.log('   - Main dashboard view')
    console.log('   - Board with colorful statuses')
    console.log('   - Automation builder')
    console.log('   - Multiple view types')
    console.log('   - Mobile app interface')
    console.log('   - Template gallery')
    console.log('   - Integration center')
    
    return result
    
  } catch (error) {
    console.error('❌ Error creating Monday.com review:', error)
    throw error
  }
}

// Run the script
createMondayReview()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error)
    process.exit(1)
  })