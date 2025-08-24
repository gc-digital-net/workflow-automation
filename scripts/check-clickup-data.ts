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

async function checkClickUpData() {
  const clickup = await client.fetch(`*[_type == 'software' && name == 'ClickUp'][0]`)
  
  console.log('ClickUp Data in Sanity:')
  console.log('========================')
  console.log('Name:', clickup?.name)
  console.log('Tagline:', clickup?.tagline)
  console.log('Overall Score:', clickup?.overallScore)
  console.log('\nCompany Info:', clickup?.companyInfo)
  console.log('\nSupport Info:', clickup?.supportInfo)
  console.log('\nSecurity Info:', clickup?.securityInfo)
  console.log('\nPopular Integrations:', clickup?.popularIntegrations?.length, 'items')
  console.log('\nContent blocks:', clickup?.content?.length, 'blocks')
  console.log('\nScreenshot Gallery:', clickup?.screenshotGallery?.length, 'images')
  console.log('\nQuick Info:', clickup?.quickInfo)
  
  // Check for specific content types
  const contentTypes = clickup?.content?.map((block: any) => block._type) || []
  const uniqueTypes = [...new Set(contentTypes)]
  console.log('\nContent block types:', uniqueTypes)
  
  // Check for screenshots in content
  const screenshots = clickup?.content?.filter((block: any) => block._type === 'screenshot') || []
  console.log('Inline screenshots:', screenshots.length)
  
  // Check for pricing table
  const pricingTable = clickup?.content?.find((block: any) => block._type === 'pricingTable')
  console.log('\nPricing Table exists:', !!pricingTable)
  if (pricingTable) {
    console.log('Number of plans:', pricingTable.plans?.length)
  }
}

checkClickUpData()