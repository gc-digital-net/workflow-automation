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

async function updateClickUpDetails() {
  console.log('Updating ClickUp with company, support, and security info...\n')
  
  try {
    // Get existing ClickUp document
    const query = `*[_type == "software" && name == "ClickUp"][0]`
    const clickup = await client.fetch(query)
    
    if (!clickup) {
      console.log('ClickUp review not found!')
      return
    }
    
    // Update with additional information
    const updates = {
      companyInfo: {
        founded: '2017',
        headquarters: 'San Diego, CA',
        companySize: '500-1000 employees',
        funding: '$538M Series C'
      },
      supportInfo: {
        liveChat: true,
        emailSupport: true,
        knowledgeBase: true,
        videoTutorials: true,
        supportDetails: '24/7 support available on all plans including free. Average response time under 2 hours.'
      },
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
      }
    }
    
    console.log('Updating ClickUp document...')
    const result = await client
      .patch(clickup._id)
      .set(updates)
      .commit()
    
    console.log('✅ Successfully updated ClickUp with additional details!')
    console.log(`Document ID: ${result._id}`)
    
  } catch (error) {
    console.error('Error updating ClickUp:', error)
    throw error
  }
}

// Run the script
updateClickUpDetails()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })