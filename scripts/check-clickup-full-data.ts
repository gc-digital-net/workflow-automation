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

async function checkClickUpData() {
  console.log('Fetching complete ClickUp data from Sanity...\n')
  console.log('='.repeat(60))
  
  try {
    // Get ALL fields from ClickUp
    const query = `*[_type == "software" && name == "ClickUp"][0]`
    const clickup = await client.fetch(query)
    
    if (!clickup) {
      console.log('ClickUp review not found!')
      return
    }
    
    // Check what fields are populated
    const fields = {
      '✅ Basic Info': {
        'Name': clickup.name,
        'Slug': clickup.slug?.current,
        'Logo': clickup.logo ? 'Yes' : 'No',
        'Tagline': clickup.tagline || 'Not set',
        'Short Description': clickup.shortDescription ? 'Yes' : 'No',
      },
      '✅ Scores': {
        'Overall Score': clickup.overallScore,
        'Detailed Scores': clickup.scores ? Object.keys(clickup.scores).length + ' criteria' : 'Not set',
      },
      '✅ Content Sections': {
        'Overview': clickup.overview ? 'Yes' : 'No',
        '- Introduction': clickup.overview?.introduction ? 'Yes' : 'No',
        '- Key Features': clickup.overview?.keyFeatures ? clickup.overview.keyFeatures.length + ' features' : 'No',
        '- Target Audience': clickup.overview?.targetAudience ? 'Yes' : 'No',
      },
      '📝 Review Sections': {
        'Detailed Review': clickup.detailedReview ? 'Yes' : 'No',
        'Pricing Section': clickup.pricingSection ? 'Yes' : 'No',
        'Use Cases': clickup.useCasesSection ? 'Yes' : 'No',
        'Competitor Analysis': clickup.competitorAnalysis ? 'Yes' : 'No',
        'Final Verdict': clickup.finalVerdict ? 'Yes' : 'No',
      },
      '📊 Structured Data': {
        'Pricing Plans': clickup.pricing ? clickup.pricing.length + ' plans' : 'Not set',
        'Pros': clickup.pros ? clickup.pros.length + ' items' : 'Not set',
        'Cons': clickup.cons ? clickup.cons.length + ' items' : 'Not set',
        'Screenshots': clickup.screenshots ? clickup.screenshots.length + ' images' : 'Not set',
        'Popular Integrations': clickup.popularIntegrations ? clickup.popularIntegrations.length + ' integrations' : 'Not set',
      },
      '🔧 Technical Details': {
        'Integrations': typeof clickup.integrations === 'object' ? 
          `${clickup.integrations.count} total` : clickup.integrations || 'Not set',
        'Supported Platforms': clickup.supportedPlatforms ? clickup.supportedPlatforms.length + ' platforms' : 'Not set',
        'Deployment Options': clickup.deploymentOptions ? clickup.deploymentOptions.length + ' options' : 'Not set',
      },
      '💼 Business Info': {
        'Company Info': clickup.companyInfo ? 'Yes' : 'No',
        'Affiliate Link': clickup.affiliateLink ? 'Yes' : 'No',
        'Deal Info': clickup.dealInformation ? 'Yes' : 'No',
      },
    }
    
    // Display the results
    for (const [section, data] of Object.entries(fields)) {
      console.log(`\n${section}`)
      console.log('-'.repeat(40))
      for (const [field, value] of Object.entries(data)) {
        console.log(`  ${field}: ${value}`)
      }
    }
    
    console.log('\n' + '='.repeat(60))
    console.log('\n❓ FIELDS NOT POPULATED (Empty in Sanity):')
    console.log('-'.repeat(40))
    
    // Check for missing important fields
    const missingFields = []
    
    if (!clickup.detailedReview) missingFields.push('- Detailed Review section')
    if (!clickup.pricingSection?.pricingOverview) missingFields.push('- Pricing Overview text')
    if (!clickup.useCasesSection) missingFields.push('- Use Cases section')
    if (!clickup.finalVerdict) missingFields.push('- Final Verdict section')
    if (!clickup.atAGlance) missingFields.push('- At A Glance box data')
    if (!clickup.bestFor) missingFields.push('- Best For field')
    if (!clickup.notIdealFor) missingFields.push('- Not Ideal For field')
    
    if (missingFields.length > 0) {
      missingFields.forEach(field => console.log(field))
    } else {
      console.log('All major fields are populated!')
    }
    
    console.log('\n' + '='.repeat(60))
    console.log('\n💡 NOTE: Many sections you see on the frontend are:')
    console.log('  1. Hardcoded in the React component (section titles, descriptions)')
    console.log('  2. Generated from data (formatted prices, calculated stats)')
    console.log('  3. UI elements (buttons, navigation, layout)')
    
  } catch (error) {
    console.error('Error:', error)
  }
}

// Run the script
checkClickUpData()
  .then(() => {
    console.log('\n✨ Check complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })