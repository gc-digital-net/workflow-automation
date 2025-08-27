import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
})

async function updateMondayComprehensive() {
  console.log('📝 Updating Monday.com with comprehensive review data...\n')

  try {
    // Find the existing Monday.com entry
    const existingMonday = await client.fetch(
      `*[_type == "software" && name == "Monday.com"][0]`
    )

    if (!existingMonday) {
      console.error('❌ Monday.com entry not found!')
      return
    }

    console.log(`Found Monday.com: ${existingMonday._id}`)
    console.log('Applying comprehensive update...\n')

    // Comprehensive update with all review content
    const updatedMonday = await client
      .patch(existingMonday._id)
      .set({
        // Enhanced Basic Info
        tagline: 'The Work OS that powers teams to run projects and workflows with confidence',
        shortDescription: 'Monday.com is a cloud-based Work Operating System that enables over 186,000 organizations to run projects, workflows, and everyday work in one centralized platform with powerful visual tools and automation.',
        verdict: 'Best for teams of 10-250 needing visual project management with strong automation and cross-departmental collaboration',
        
        // Updated Scores based on comprehensive review
        overallScore: 8.9,
        scores: {
          features: 9.2,
          easeOfUse: 8.7,
          integrations: 9.0,
          pricing: 7.8,
          support: 9.1,
          security: 9.2,
          scalability: 8.8,
          performance: 8.9,
          customization: 9.3,
          reporting: 8.4,
          mobile: 8.8,
          documentation: 8.7,
          learningCurve: 7.5,
          freeTier: 6.0,
          overallValue: 8.5
        },
        
        // Enhanced Company Info
        companyInfo: {
          foundedYear: 2012,
          headquarters: 'Tel Aviv, Israel',
          employeeCount: '1,700+',
          funding: 'Public (NASDAQ: MNDY)',
          revenue: '$700M+ ARR',
          customers: '186,000+',
          valuation: '$8.9B market cap',
          website: 'https://monday.com',
          marketShare: '4.2% of project management market',
          notableClients: ['Coca-Cola', 'Universal Music Group', 'Canva', 'Glossier', 'Hulu']
        },
        
        // Detailed Key Features
        keyFeatures: [
          {
            _key: 'visual-boards',
            name: 'Visual Work Management',
            description: '15+ customizable views including Board, Timeline, Kanban, Calendar, Chart, and Map views with 30+ column types',
            category: 'Core'
          },
          {
            _key: 'automation-engine',
            name: 'No-Code Automation',
            description: '300+ pre-built automation templates with multi-step workflows, cross-board automations, and conditional logic',
            category: 'Automation'
          },
          {
            _key: 'monday-crm',
            name: 'Built-in CRM',
            description: 'Full CRM capabilities with lead management, deal pipeline, contact database, and sales forecasting',
            category: 'Sales'
          },
          {
            _key: 'monday-dev',
            name: 'Dev Tools',
            description: 'Sprint planning, bug tracking, roadmap planning, and GitHub/GitLab integration for development teams',
            category: 'Development'
          },
          {
            _key: 'workforms',
            name: 'Advanced Forms',
            description: 'Drag-and-drop form builder with conditional logic, multi-step forms, and automatic board population',
            category: 'Data Collection'
          },
          {
            _key: 'dashboards',
            name: 'Real-time Dashboards',
            description: 'Custom dashboards with 20+ widget types, cross-board analytics, and shareable views',
            category: 'Analytics'
          }
        ],
        
        // Comprehensive Integrations
        integrations: {
          count: 200,
          native: 72,
          categories: ['Communication', 'File Storage', 'Development', 'Marketing', 'Finance', 'Analytics'],
          hasAPI: true,
          hasWebhooks: true,
          hasZapier: true
        },
        
        popularIntegrations: [
          'Slack', 'Microsoft Teams', 'Gmail', 'Outlook', 'Zoom',
          'Google Drive', 'Dropbox', 'OneDrive', 'Salesforce', 'HubSpot',
          'GitHub', 'GitLab', 'Jira', 'Mailchimp', 'QuickBooks',
          'Stripe', 'Excel', 'Google Sheets', 'Tableau', 'Power BI'
        ],
        
        // Detailed Use Cases
        useCases: [
          {
            _key: 'marketing-agencies',
            industry: 'Marketing Agencies',
            scenario: 'Campaign planning, content calendar management, client project tracking',
            benefits: '30% faster campaign delivery, improved client visibility, better resource allocation'
          },
          {
            _key: 'software-dev',
            industry: 'Software Development',
            scenario: 'Sprint planning, bug tracking, product roadmap management, release coordination',
            benefits: 'Improved velocity tracking, better cross-team coordination, reduced time to market'
          },
          {
            _key: 'construction',
            industry: 'Construction',
            scenario: 'Project timeline management, contractor coordination, permit tracking, budget management',
            benefits: 'Better project visibility, reduced delays, improved contractor collaboration'
          },
          {
            _key: 'hr-recruitment',
            industry: 'HR & Recruitment',
            scenario: 'Applicant tracking, onboarding workflows, employee database, performance reviews',
            benefits: 'Faster hiring cycles, streamlined onboarding, improved employee data management'
          }
        ],
        
        // Comprehensive Pricing
        pricing: [
          {
            _key: 'individual',
            name: 'Individual',
            price: 0,
            yearlyPrice: 0,
            userLimit: 'Up to 2 users',
            features: ['3 boards', 'Unlimited docs', '200+ templates', 'Mobile apps', '1 week activity log'],
            recommended: false,
            mostPopular: false
          },
          {
            _key: 'basic',
            name: 'Basic',
            price: 12,
            yearlyPrice: 9,
            userLimit: 'Per user/month (min 3 users)',
            features: ['Unlimited items', '5GB storage', 'Create dashboard (1 board)', 'Prioritized support'],
            recommended: false,
            mostPopular: false
          },
          {
            _key: 'standard',
            name: 'Standard',
            price: 14,
            yearlyPrice: 12,
            userLimit: 'Per user/month (min 3 users)',
            features: ['Timeline & Gantt', 'Calendar view', 'Guest access', 'Automations (250/mo)', 'Integrations (250/mo)', 'Dashboards (5 boards)'],
            recommended: true,
            mostPopular: true
          },
          {
            _key: 'pro',
            name: 'Pro',
            price: 24,
            yearlyPrice: 19,
            userLimit: 'Per user/month (min 3 users)',
            features: ['Private boards', 'Chart view', 'Time tracking', 'Formula column', 'Automations (25K/mo)', 'Integrations (25K/mo)', 'Dashboards (10 boards)'],
            recommended: false,
            mostPopular: false
          },
          {
            _key: 'enterprise',
            name: 'Enterprise',
            price: null,
            yearlyPrice: null,
            userLimit: 'Custom pricing',
            features: ['Enterprise automations', 'Advanced security & SSO', 'Multi-level permissions', 'Premium support', '99.9% SLA', 'HIPAA compliance'],
            recommended: false,
            mostPopular: false
          }
        ],
        
        pricingDetails: {
          hasFreeTier: true,
          freeTrialDays: 14,
          moneyBackDays: 0,
          discounts: 'Save 18% with annual billing, volume discounts for 50+ seats',
          hiddenCosts: 'Add-ons like time tracking require Pro plan, SSO requires Enterprise',
          billingCycle: ['monthly', 'annual']
        },
        
        // Enhanced Pros and Cons
        pros: [
          'Intuitive visual interface with color-coded boards',
          'Extreme flexibility - adapts to any workflow',
          'Powerful no-code automation saves hours',
          'Excellent mobile apps with full functionality',
          'Fast performance even with large datasets',
          'Regular monthly updates with new features',
          'Strong security with enterprise certifications',
          'Responsive support with <2 minute chat response',
          'Extensive template library (200+ templates)',
          'Robust API for custom integrations'
        ],
        
        cons: [
          'Expensive compared to competitors at scale',
          'Essential features like time tracking need Pro plan',
          'Initial setup can be overwhelming',
          'Limited free plan (only 2 users, 3 boards)',
          'No offline mode - requires internet',
          'Advanced analytics require higher tiers',
          'Monthly automation limits can be restrictive',
          'No built-in instant messaging',
          'Storage constraints on lower plans (5GB Basic)',
          'Learning curve for advanced features'
        ],
        
        // Technical Specifications
        technical: {
          platforms: ['Web', 'Windows', 'macOS', 'iOS', 'Android'],
          deployment: ['Cloud (SaaS)'],
          languages: ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Dutch', 'Italian', 'Japanese', 'Russian', 'Polish'],
          dataLimits: 'No limits on boards or items, storage varies by plan (5GB-1000GB)',
          apiRateLimits: '5,000 requests per minute',
          uptime: '99.9% SLA for Enterprise, 99.5% for others'
        },
        
        supportedPlatforms: ['web', 'windows', 'macos', 'ios', 'android', 'api'],
        deploymentOptions: ['cloud'],
        dataExportFormats: ['CSV', 'Excel', 'PDF', 'API', 'JSON'],
        
        // Security & Compliance
        security: {
          certifications: ['SOC 2 Type II', 'ISO 27001:2013', 'ISO 27018:2019', 'ISO 27032:2012'],
          compliance: ['GDPR', 'CCPA', 'HIPAA', 'FERPA'],
          dataEncryption: '256-bit SSL encryption, AES-256 at rest',
          accessControls: ['Two-factor authentication', 'SSO (Enterprise)', 'IP restrictions', 'Session management', 'Role-based permissions'],
          dataResidency: ['US', 'EU', 'APAC']
        },
        
        // Mobile Apps
        mobile: {
          hasIOS: true,
          iosRating: 4.6,
          hasAndroid: true,
          androidRating: 4.5,
          mobileFeatures: ['Full board access', 'Create and edit items', 'Real-time sync', 'Push notifications', 'Offline viewing', 'Camera integration'],
          offlineCapability: false
        },
        
        // Support Information
        supportInfo: {
          channels: ['24/7 Live Chat', 'Email', 'Phone (Pro+)', 'Knowledge Base', 'Community Forum'],
          responseTime: '<2 minutes (chat), <24 hours (email)',
          languages: ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Dutch', 'Japanese'],
          training: ['Monday Academy', '500+ video tutorials', 'Weekly webinars', 'Certification program', 'Custom training (Enterprise)'],
          sla: true
        },
        
        // Resources
        resources: {
          documentation: 'https://support.monday.com',
          videoTutorials: 'https://monday.com/learn',
          communityForum: 'https://community.monday.com',
          blog: 'https://monday.com/blog',
          apiDocs: 'https://developer.monday.com',
          statusPage: 'https://status.monday.com'
        },
        
        // Competitive Analysis
        alternatives: [], // Would need references to other software documents
        competitiveAdvantages: [
          'Most visual and intuitive interface in the market',
          'Unmatched flexibility and customization',
          'Strong automation without coding requirements',
          'Best-in-class customer support',
          'Continuous innovation with monthly updates',
          'Enterprise-grade security for all plans',
          'Seamless scaling from small to enterprise'
        ],
        
        whenToChoose: 'Choose Monday.com when your team values visual collaboration, needs flexibility to adapt workflows, has diverse departments that need to collaborate, and has budget for a premium solution. Ideal for teams of 10-250 that want powerful features without technical complexity.',
        
        whenNotToChoose: 'Not ideal for solo freelancers (too expensive), pure software development teams (Jira is better), very budget-conscious startups (ClickUp offers more for less), simple task management needs (overkill), or teams requiring offline-first workflows.',
        
        // SEO & Marketing
        seo: {
          metaTitle: 'Monday.com Review 2024: Complete Guide to Work OS Platform | Features, Pricing & Alternatives',
          metaDescription: 'In-depth Monday.com review covering all features, real pricing, pros/cons, and alternatives. See why 186,000+ companies use Monday.com for work management. Compare with Asana, ClickUp, Notion.',
          keywords: [
            'monday.com review', 'monday.com pricing', 'work os', 'project management software',
            'monday.com alternatives', 'monday.com vs asana', 'monday.com features',
            'work management platform', 'team collaboration software', 'monday.com 2024'
          ]
        },
        
        lastUpdated: new Date().toISOString(),
        nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
      })
      .commit()
    
    console.log('✅ Successfully updated Monday.com with comprehensive review!')
    console.log('\n📊 Review Highlights:')
    console.log('   - Overall Score: 8.9/10')
    console.log('   - 10 detailed pros and cons')
    console.log('   - 6 key features with descriptions')
    console.log('   - 5 pricing tiers with full details')
    console.log('   - 20+ popular integrations')
    console.log('   - 4 industry use cases')
    console.log('   - Complete security & compliance info')
    console.log('   - Mobile app details')
    console.log('   - Competitive analysis')
    console.log('\n🎉 Monday.com now has a complete, SEO-optimized review!')

  } catch (error) {
    console.error('Error updating Monday.com:', error)
  }
}

updateMondayComprehensive()