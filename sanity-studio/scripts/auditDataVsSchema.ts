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

// Define the expected schema structure based on software.ts
const schemaDefinition = {
  // Basic Info Group
  basic: {
    name: 'string',
    slug: 'slug',
    logo: 'image',
    tagline: 'string',
    shortDescription: 'text',
    verdict: 'string',
    categories: 'array<reference>',
    companyInfo: {
      foundedYear: 'number',
      headquarters: 'string',
      employeeCount: 'string',
      funding: 'string',
      valuation: 'string',
      revenue: 'string',
      customers: 'string',
      website: 'url',
      marketShare: 'string',
      notableClients: 'array<string>'
    }
  },
  
  // Scores & Ratings Group
  scores: {
    overallScore: 'number',
    scores: {
      features: 'number',
      easeOfUse: 'number',
      integrations: 'number',
      pricing: 'number',
      support: 'number',
      security: 'number',
      scalability: 'number',
      performance: 'number',
      customization: 'number',
      reporting: 'number',
      mobile: 'number',
      documentation: 'number',
      learningCurve: 'number',
      freeTier: 'number',
      overallValue: 'number'
    },
    userRatings: {
      g2Score: 'number',
      g2Reviews: 'number',
      capterraScore: 'number',
      capterraReviews: 'number',
      trustRadiusScore: 'number',
      trustRadiusReviews: 'number'
    }
  },
  
  // Review Content Group
  review: {
    overview: {
      whatIsIt: 'blockContent',
      keyDifferentiators: 'blockContent',
      idealFor: 'blockContent'
    },
    detailedReview: {
      userInterface: 'blockContent',
      performance: 'blockContent',
      security: 'blockContent',
      implementation: 'blockContent',
      learningCurve: 'blockContent'
    },
    pros: 'array<string>',
    cons: 'array<string>',
    bestFor: 'array<string>',
    notIdealFor: 'array<string>'
  },
  
  // Features Group
  features: {
    keyFeatures: 'array<object>',
    integrations: {
      count: 'number',
      native: 'number',
      categories: 'array<string>',
      hasZapier: 'boolean',
      hasAPI: 'boolean',
      hasWebhooks: 'boolean'
    },
    popularIntegrations: 'array<string>',
    useCases: 'array<object>'
  },
  
  // Pricing Group
  pricing: {
    pricing: 'array<object>',
    pricingDetails: {
      hasFreeTier: 'boolean',
      freeTrialDays: 'number',
      moneyBackDays: 'number',
      discounts: 'text',
      hiddenCosts: 'text',
      billingCycle: 'array<string>'
    }
  },
  
  // Technical Group
  technical: {
    supportedPlatforms: 'array<string>',
    deploymentOptions: 'array<string>',
    dataExportFormats: 'array<string>',
    technical: {
      platforms: 'array<string>',
      deployment: 'array<string>',
      languages: 'array<string>',
      dataLimits: 'text',
      apiRateLimits: 'text',
      uptime: 'string'
    },
    security: {
      certifications: 'array<string>',
      compliance: 'array<string>',
      dataEncryption: 'text',
      accessControls: 'array<string>',
      dataResidency: 'array<string>'
    },
    mobile: {
      hasIOS: 'boolean',
      iosRating: 'number',
      hasAndroid: 'boolean',
      androidRating: 'number',
      mobileFeatures: 'array<string>',
      offlineCapability: 'boolean'
    }
  },
  
  // Support Group
  support: {
    supportInfo: {
      channels: 'array<string>',
      responseTime: 'string',
      languages: 'array<string>',
      training: 'array<string>',
      sla: 'boolean'
    },
    support: {
      channels: 'array<object>',
      documentation: 'string',
      training: 'array<string>',
      community: 'text'
    },
    resources: {
      documentation: 'url',
      videoTutorials: 'url',
      communityForum: 'url',
      blog: 'url',
      apiDocs: 'url',
      statusPage: 'url'
    }
  },
  
  // Media Group
  media: {
    screenshots: 'array<object>',
    videos: 'array<object>',
    testimonials: 'array<object>'
  },
  
  // Comparisons Group
  comparisons: {
    alternatives: 'array<reference>',
    competitiveAdvantages: 'array<string>',
    whenToChoose: 'text',
    whenNotToChoose: 'text'
  },
  
  // SEO Group
  seo: {
    affiliateLink: 'url',
    dealInfo: {
      hasActiveDeal: 'boolean',
      dealDescription: 'string',
      dealCode: 'string',
      dealExpiry: 'datetime'
    },
    seo: {
      metaTitle: 'string',
      metaDescription: 'text',
      keywords: 'array<string>',
      canonicalUrl: 'url',
      noIndex: 'boolean'
    },
    lastUpdated: 'datetime',
    nextReviewDate: 'datetime'
  }
}

async function auditDataVsSchema() {
  console.log('📊 COMPREHENSIVE DATA VS SCHEMA AUDIT\n')
  console.log('='*50 + '\n')

  try {
    // Fetch all software documents with all fields
    const software = await client.fetch(`*[_type == "software"] | order(name)`)
    
    for (const doc of software) {
      console.log(`\n🔍 AUDITING: ${doc.name}`)
      console.log('-'.repeat(40))
      
      const issues = {
        missing: [] as string[],
        wrongType: [] as string[],
        unexpected: [] as string[]
      }
      
      // Check what fields the document actually has
      const docFields = Object.keys(doc).filter(k => !k.startsWith('_'))
      console.log(`\n📋 Document has ${docFields.length} non-system fields`)
      
      // Check for fields that exist in data but might have wrong structure
      console.log('\n🔍 Checking field types and structure:')
      
      // Check each field that exists
      for (const field of docFields) {
        const value = doc[field]
        
        // Special checks for known problematic fields
        if (field === 'overview' || field === 'detailedReview' || field === 'pricingSection' || 
            field === 'useCasesSection' || field === 'competitorAnalysis' || field === 'finalVerdict') {
          if (Array.isArray(value) && value[0]?._type === 'block') {
            issues.wrongType.push(`${field}: stored as block content (array) but schema expects object`)
          }
        }
        
        if (field === 'integrations') {
          if (typeof value === 'object' && value !== null) {
            console.log(`  ✓ integrations is object with: ${Object.keys(value).join(', ')}`)
          }
        }
        
        if (field === 'pricing') {
          if (Array.isArray(value)) {
            console.log(`  ✓ pricing has ${value.length} plans`)
            // Check if pricing items have _key
            const missingKeys = value.filter((p: any) => !p._key)
            if (missingKeys.length > 0) {
              issues.wrongType.push(`pricing: ${missingKeys.length} items missing _key`)
            }
          }
        }
      }
      
      // List fields we have in data
      console.log('\n📦 Fields present in data:')
      const fieldGroups: Record<string, string[]> = {
        basic: [],
        scores: [],
        review: [],
        features: [],
        pricing: [],
        technical: [],
        support: [],
        media: [],
        seo: []
      }
      
      for (const field of docFields) {
        if (['name', 'slug', 'logo', 'tagline', 'shortDescription', 'verdict', 'categories', 'companyInfo'].includes(field)) {
          fieldGroups.basic.push(field)
        } else if (['overallScore', 'scores', 'userRatings'].includes(field)) {
          fieldGroups.scores.push(field)
        } else if (['overview', 'detailedReview', 'pros', 'cons', 'bestFor', 'notIdealFor', 'pricingSection', 'useCasesSection', 'competitorAnalysis', 'finalVerdict'].includes(field)) {
          fieldGroups.review.push(field)
        } else if (['keyFeatures', 'integrations', 'popularIntegrations', 'useCases'].includes(field)) {
          fieldGroups.features.push(field)
        } else if (['pricing', 'pricingDetails', 'hasFreeTrial', 'dealInformation'].includes(field)) {
          fieldGroups.pricing.push(field)
        } else if (['supportedPlatforms', 'deploymentOptions', 'dataExportFormats', 'technical', 'security', 'mobile'].includes(field)) {
          fieldGroups.technical.push(field)
        } else if (['supportInfo', 'support', 'resources'].includes(field)) {
          fieldGroups.support.push(field)
        } else if (['screenshots', 'videos', 'testimonials'].includes(field)) {
          fieldGroups.media.push(field)
        } else if (['affiliateLink', 'dealInfo', 'seo', 'lastUpdated', 'nextReviewDate'].includes(field)) {
          fieldGroups.seo.push(field)
        } else {
          fieldGroups.seo.push(field) // Put unknowns in seo for now
        }
      }
      
      for (const [group, fields] of Object.entries(fieldGroups)) {
        if (fields.length > 0) {
          console.log(`  ${group}: ${fields.join(', ')}`)
        }
      }
      
      // Check what schema fields are missing from data
      console.log('\n❌ Schema fields NOT in data:')
      const schemaFields = [
        'verdict', 'keyFeatures', 'useCases', 'pricingDetails', 
        'technical', 'security', 'mobile', 'support', 'resources',
        'screenshots', 'videos', 'testimonials', 'alternatives',
        'competitiveAdvantages', 'whenToChoose', 'whenNotToChoose', 'dealInfo'
      ]
      
      const missingFields = schemaFields.filter(f => !docFields.includes(f))
      if (missingFields.length > 0) {
        console.log(`  Missing: ${missingFields.join(', ')}`)
      } else {
        console.log(`  None - all expected fields present`)
      }
      
      // Summary for this document
      if (issues.wrongType.length > 0) {
        console.log('\n⚠️  Type Mismatches:')
        issues.wrongType.forEach(issue => console.log(`  - ${issue}`))
      }
    }
    
    console.log('\n' + '='*50)
    console.log('📊 AUDIT SUMMARY')
    console.log('='*50)
    
    console.log('\n🔴 Critical Issues to Fix:')
    console.log('1. Several fields stored as block content (arrays) instead of objects:')
    console.log('   - overview, detailedReview, pricingSection, useCasesSection')
    console.log('   - competitorAnalysis, finalVerdict')
    console.log('\n2. Missing schema fields that could be populated:')
    console.log('   - verdict, keyFeatures, useCases, pricingDetails')
    console.log('   - technical (detailed specs), security (compliance)')
    console.log('   - mobile (app details), support (detailed), resources')
    console.log('   - screenshots, videos, testimonials')
    console.log('   - alternatives, competitiveAdvantages, whenToChoose')
    console.log('\n3. Fields in data that might not match schema exactly:')
    console.log('   - hasFreeTrial vs pricingDetails.hasFreeTier')
    console.log('   - dealInformation vs dealInfo')

  } catch (error) {
    console.error('Error during audit:', error)
  }
}

auditDataVsSchema()