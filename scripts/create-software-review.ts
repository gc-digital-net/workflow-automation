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

interface SoftwareReviewData {
  name: string
  slug: string
  tagline: string
  excerpt: string
  overallScore: number
  scores: {
    easeOfUse: number
    features: number
    value: number
    support: number
    integrations: number
  }
  quickInfo: {
    startingPrice: string
    freeTrial: string
    bestFor: string
    integrations: string
  }
  companyInfo?: {
    founded: string
    headquarters: string
    companySize: string
    funding: string
  }
  supportInfo?: {
    liveChat: boolean
    emailSupport: boolean
    knowledgeBase: boolean
    videoTutorials: boolean
    supportDetails?: string
  }
  securityInfo?: {
    soc2: boolean
    gdpr: boolean
    ssl: boolean
    uptime: string
    otherCertifications?: string[]
  }
  popularIntegrations: string[]
  affiliateLink: string
  // Content sections
  introduction: string
  keyFeatures: Array<{ name: string; description: string }>
  pros: string[]
  cons: string[]
  pricing: Array<{
    name: string
    price: string
    features: string[]
    highlighted?: boolean
  }>
  finalVerdict: string
}

export async function createSoftwareReview(data: SoftwareReviewData) {
  console.log(`Creating review for ${data.name}...\n`)
  
  try {
    // Build content structure
    const content = []
    
    // Introduction
    content.push({
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: data.introduction }]
    })
    
    // Key Features Section
    if (data.keyFeatures.length > 0) {
      content.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '🎯 Key Features' }]
      })
      
      content.push({
        _type: 'featureList',
        title: 'What Makes It Stand Out',
        features: data.keyFeatures
      })
    }
    
    // Pros and Cons
    if (data.pros.length > 0 && data.cons.length > 0) {
      content.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '⚖️ Pros & Cons' }]
      })
      
      content.push({
        _type: 'prosConsBlock',
        pros: data.pros,
        cons: data.cons
      })
    }
    
    // Pricing
    if (data.pricing.length > 0) {
      content.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '💰 Pricing Plans' }]
      })
      
      content.push({
        _type: 'pricingTable',
        title: `${data.name} Pricing`,
        plans: data.pricing
      })
    }
    
    // Final Verdict
    content.push({
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: '🎯 Final Verdict' }]
    })
    
    content.push({
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: data.finalVerdict }]
    })
    
    // CTA
    content.push({
      _type: 'ctaBlock',
      title: `Ready to try ${data.name}?`,
      description: `Start your journey with ${data.name} today.`,
      buttonText: `Get Started with ${data.name}`,
      buttonUrl: data.affiliateLink
    })
    
    // Create the document
    const review = {
      _type: 'software',
      name: data.name,
      slug: { current: data.slug },
      tagline: data.tagline,
      excerpt: data.excerpt,
      overallScore: data.overallScore,
      scores: data.scores,
      content: content,
      quickInfo: data.quickInfo,
      companyInfo: data.companyInfo,
      supportInfo: data.supportInfo,
      securityInfo: data.securityInfo,
      popularIntegrations: data.popularIntegrations,
      affiliateLink: data.affiliateLink,
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: `${data.name} Review 2024 - Features, Pricing & Alternatives`,
        metaDescription: `Comprehensive ${data.name} review. ${data.tagline}. Compare features, pricing, pros and cons.`
      }
    }
    
    // Check if review already exists
    const existing = await client.fetch(
      `*[_type == "software" && slug.current == $slug][0]`,
      { slug: data.slug }
    )
    
    let result
    if (existing) {
      console.log('Updating existing review...')
      result = await client
        .patch(existing._id)
        .set(review)
        .commit()
    } else {
      console.log('Creating new review...')
      result = await client.create(review)
    }
    
    console.log(`✅ Successfully created/updated ${data.name} review!`)
    console.log(`Document ID: ${result._id}`)
    console.log(`View at: http://localhost:3005/reviews/${data.slug}`)
    
    return result
    
  } catch (error) {
    console.error(`Error creating review for ${data.name}:`, error)
    throw error
  }
}

// Example: Create a review for Asana
async function createAsanaReview() {
  const asanaData: SoftwareReviewData = {
    name: 'Asana',
    slug: 'asana',
    tagline: 'Work on big ideas, without the busywork',
    excerpt: 'Asana is a leading project management platform that helps teams organize, track, and manage their work with clarity and efficiency.',
    overallScore: 8.8,
    scores: {
      easeOfUse: 9.2,
      features: 8.5,
      value: 8.3,
      support: 8.7,
      integrations: 9.0
    },
    quickInfo: {
      startingPrice: '$10.99/user/month',
      freeTrial: '30 days',
      bestFor: 'Teams of 15-500',
      integrations: '200+'
    },
    companyInfo: {
      founded: '2008',
      headquarters: 'San Francisco, CA',
      companySize: '1000+ employees',
      funding: '$453M Total'
    },
    supportInfo: {
      liveChat: false,
      emailSupport: true,
      knowledgeBase: true,
      videoTutorials: true,
      supportDetails: 'Email support on all paid plans. Priority support for Business and Enterprise.'
    },
    securityInfo: {
      soc2: true,
      gdpr: true,
      ssl: true,
      uptime: '99.95%',
      otherCertifications: [
        'ISO 27001',
        'ISO 27018',
        'Privacy Shield'
      ]
    },
    popularIntegrations: [
      'Slack',
      'Microsoft Teams',
      'Google Drive',
      'Dropbox',
      'Adobe Creative Cloud',
      'Salesforce',
      'Jira',
      'GitHub',
      'Zoom',
      'Gmail'
    ],
    affiliateLink: 'https://asana.com/?utm_source=workflowautomation',
    introduction: 'Asana is a comprehensive work management platform designed to help teams coordinate and manage their work, from daily tasks to strategic initiatives. Founded by Facebook co-founder Dustin Moskovitz and Justin Rosenstein, Asana has grown to become one of the most popular project management tools, serving over 100,000 paying organizations worldwide.',
    keyFeatures: [
      {
        name: 'Multiple Project Views',
        description: 'Choose from List, Board, Timeline (Gantt), Calendar, and Portfolios views to visualize work in the way that makes most sense for your team.'
      },
      {
        name: 'Automation Rules',
        description: 'Create custom rules to automate routine tasks, move work through stages, and update fields automatically.'
      },
      {
        name: 'Forms & Requests',
        description: 'Standardize work requests with customizable forms that automatically create tasks with all necessary information.'
      },
      {
        name: 'Portfolios',
        description: 'Get a bird\'s-eye view of all projects, track progress, and identify risks across your entire organization.'
      },
      {
        name: 'Goals & Reporting',
        description: 'Connect work to company objectives and track progress with real-time reporting dashboards.'
      }
    ],
    pros: [
      'Intuitive and clean user interface',
      'Excellent for traditional project management',
      'Strong mobile apps for iOS and Android',
      'Great template library to get started quickly',
      'Robust API and integration ecosystem',
      'Timeline view included in all paid plans',
      'Unlimited tasks and projects on all plans',
      'Strong focus on reducing work about work'
    ],
    cons: [
      'Limited customization compared to ClickUp',
      'No native time tracking',
      'Expensive for larger teams',
      'Limited free plan (15 users max)',
      'No built-in docs or wiki functionality',
      'Automation features require Business plan'
    ],
    pricing: [
      {
        name: 'Basic',
        price: 'Free',
        features: [
          'Up to 15 users',
          'Unlimited tasks & projects',
          'List, Board & Calendar views',
          'Assignee & due dates',
          '100MB file storage',
          'Basic dashboard'
        ]
      },
      {
        name: 'Premium',
        price: '$10.99/user/mo',
        features: [
          'Everything in Basic',
          'Timeline view',
          'Custom fields',
          'Forms',
          'Rules & automation',
          'Unlimited dashboards',
          'Unlimited free guests'
        ],
        highlighted: true
      },
      {
        name: 'Business',
        price: '$24.99/user/mo',
        features: [
          'Everything in Premium',
          'Portfolios',
          'Workload management',
          'Advanced search',
          'Custom rules builder',
          'Approvals',
          'Proofing'
        ]
      }
    ],
    finalVerdict: 'Asana excels as a straightforward, user-friendly project management tool that\'s perfect for teams looking for a clean, intuitive solution without overwhelming complexity. While it may lack some of the deep customization options of competitors like ClickUp, its polished interface and focus on reducing "work about work" make it an excellent choice for teams that value simplicity and ease of adoption over extensive feature sets.'
  }
  
  await createSoftwareReview(asanaData)
}

// Run the example
if (require.main === module) {
  createAsanaReview()
    .then(() => {
      console.log('\n✨ Done!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Script failed:', error)
      process.exit(1)
    })
}

export default createSoftwareReview