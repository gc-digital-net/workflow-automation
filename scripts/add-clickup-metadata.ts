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

async function addClickUpMetadata() {
  console.log('Adding ClickUp metadata...')
  
  // Get ClickUp document
  const clickup = await client.fetch(`*[_type == "software" && name == "ClickUp"][0]`)
  
  if (!clickup) {
    console.log('ClickUp not found!')
    return
  }
  
  // Update with metadata
  const updates = {
    companyInfo: {
      founded: '2017',
      headquarters: 'San Diego, CA',
      companySize: '800+ employees',
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
  
  console.log('✅ Successfully added ClickUp metadata!')
  console.log('- Company Info: Founded 2017, San Diego, 800+ employees, $538M funding')
  console.log('- Support Info: 24/7 support with live chat, email, knowledge base')
  console.log('- Security Info: SOC 2, GDPR, ISO 27001, HIPAA, 99.9% uptime')
}

addClickUpMetadata()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error:', error)
    process.exit(1)
  })