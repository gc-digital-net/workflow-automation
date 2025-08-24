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

async function migrateClickUpToSimplified() {
  console.log('Starting migration of ClickUp to simplified schema...\n')
  
  try {
    // 1. Fetch existing ClickUp data
    const query = `*[_type == "software" && name == "ClickUp"][0]`
    const clickup = await client.fetch(query)
    
    if (!clickup) {
      console.log('ClickUp review not found!')
      return
    }
    
    console.log('Found ClickUp data, preparing migration...')
    
    // 2. Build the simplified content structure
    const simplifiedContent = []
    
    // Add introduction
    if (clickup.overview?.introduction) {
      simplifiedContent.push(...clickup.overview.introduction)
    }
    
    // Add a heading for features
    simplifiedContent.push({
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: 'Key Features' }]
    })
    
    // Add feature list as a custom block
    if (clickup.overview?.keyFeatures && clickup.overview.keyFeatures.length > 0) {
      simplifiedContent.push({
        _type: 'featureList',
        title: 'Key Features',
        features: clickup.overview.keyFeatures.map((feature: any) => ({
          name: feature.feature || feature.title || feature,
          description: feature.description || ''
        }))
      })
    }
    
    // Add first screenshot inline
    if (clickup.screenshots && clickup.screenshots.length > 0) {
      simplifiedContent.push({
        _type: 'screenshot',
        image: clickup.screenshots[0].image,
        caption: clickup.screenshots[0].caption || 'ClickUp Dashboard',
        size: 'large'
      })
    }
    
    // Add detailed review sections
    if (clickup.detailedReview) {
      if (clickup.detailedReview.userInterface) {
        simplifiedContent.push({
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'User Interface & Experience' }]
        })
        simplifiedContent.push(...clickup.detailedReview.userInterface)
      }
      
      // Add another screenshot
      if (clickup.screenshots && clickup.screenshots.length > 1) {
        simplifiedContent.push({
          _type: 'screenshot',
          image: clickup.screenshots[1].image,
          caption: clickup.screenshots[1].caption || 'ClickUp Features',
          size: 'medium'
        })
      }
      
      if (clickup.detailedReview.featuresAnalysis) {
        simplifiedContent.push({
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Features Analysis' }]
        })
        simplifiedContent.push(...clickup.detailedReview.featuresAnalysis)
      }
    }
    
    // Add pros and cons block
    if (clickup.pros && clickup.cons) {
      simplifiedContent.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Pros & Cons' }]
      })
      
      simplifiedContent.push({
        _type: 'prosConsBlock',
        pros: clickup.pros,
        cons: clickup.cons
      })
    }
    
    // Add pricing section
    if (clickup.pricing && clickup.pricing.length > 0) {
      simplifiedContent.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Pricing Plans' }]
      })
      
      simplifiedContent.push({
        _type: 'pricingTable',
        title: 'ClickUp Pricing Plans',
        plans: clickup.pricing.map((plan: any) => ({
          name: plan.name,
          price: plan.price ? `$${plan.price}/mo` : 'Free',
          features: plan.features || [],
          highlighted: plan.mostPopular || false
        }))
      })
    }
    
    // Add integrations section
    if (clickup.integrationCapabilities) {
      simplifiedContent.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Integrations' }]
      })
      simplifiedContent.push(...clickup.integrationCapabilities)
    }
    
    // Add use cases
    if (clickup.useCasesSection?.idealUseCases) {
      simplifiedContent.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Use Cases' }]
      })
      simplifiedContent.push(...clickup.useCasesSection.idealUseCases)
    }
    
    // Add final verdict
    if (clickup.finalVerdict?.summary) {
      simplifiedContent.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Final Verdict' }]
      })
      simplifiedContent.push(...clickup.finalVerdict.summary)
    }
    
    // Add CTA block
    if (clickup.affiliateLink) {
      simplifiedContent.push({
        _type: 'ctaBlock',
        title: 'Ready to Get Started?',
        description: `Join thousands of teams already using ${clickup.name} to streamline their workflows.`,
        buttonText: `Try ${clickup.name} Free`,
        buttonUrl: clickup.affiliateLink
      })
    }
    
    // 3. Create the new simplified document
    const simplifiedDoc = {
      _type: 'softwareSimplified',
      name: clickup.name,
      slug: clickup.slug,
      logo: clickup.logo,
      tagline: clickup.tagline || 'One app to replace them all',
      excerpt: clickup.shortDescription || 'ClickUp is an all-in-one project management platform that brings teams, tasks, and tools together in one place.',
      overallScore: clickup.overallScore,
      scores: clickup.scores,
      content: simplifiedContent,
      // Move extra screenshots to gallery (skip the ones we used inline)
      screenshotGallery: clickup.screenshots?.slice(2).map((screenshot: any) => ({
        image: screenshot.image,
        caption: screenshot.caption
      })) || [],
      quickInfo: {
        startingPrice: clickup.pricing?.[0]?.price ? `$${clickup.pricing[0].price}/user/month` : 'Free',
        freeTrial: 'Free forever plan',
        bestFor: clickup.bestFor || 'Small to large teams',
        integrations: typeof clickup.integrations === 'object' 
          ? `${clickup.integrations.count}+` 
          : clickup.integrations 
          ? `${clickup.integrations}+` 
          : '1000+'
      },
      popularIntegrations: clickup.popularIntegrations || [
        'Slack', 'GitHub', 'Google Drive', 'Zoom', 'Microsoft Teams',
        'Figma', 'Dropbox', 'Zapier', 'Gmail', 'Outlook'
      ],
      affiliateLink: clickup.affiliateLink,
      categories: clickup.categories,
      lastUpdated: new Date().toISOString(),
      seo: clickup.seo
    }
    
    console.log('\nCreating new simplified document...')
    const result = await client.create(simplifiedDoc)
    
    console.log('✅ Successfully created simplified ClickUp review!')
    console.log(`Document ID: ${result._id}`)
    console.log(`\nYou can now access the simplified review at: /reviews/simplified/clickup`)
    
    // Log summary
    console.log('\n📊 Migration Summary:')
    console.log(`- Content blocks: ${simplifiedContent.length}`)
    console.log(`- Gallery screenshots: ${simplifiedDoc.screenshotGallery.length}`)
    console.log(`- Inline screenshots: 2`)
    console.log(`- Custom blocks: ${simplifiedContent.filter(b => b._type && b._type !== 'block').length}`)
    
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  }
}

// Run the migration
migrateClickUpToSimplified()
  .then(() => {
    console.log('\n✨ Migration complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Migration script failed:', error)
    process.exit(1)
  })