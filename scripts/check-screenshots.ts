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

async function checkScreenshots() {
  const clickup = await client.fetch(`*[_type == 'software' && name == 'ClickUp'][0] {
    screenshots,
    screenshotGallery,
    content
  }`)
  
  console.log('Screenshots field:', clickup.screenshots?.length || 0, 'images')
  console.log('Screenshot Gallery field:', clickup.screenshotGallery?.length || 0, 'images')
  
  // Check for inline screenshots in content
  const inlineScreenshots = clickup.content?.filter((block: any) => block._type === 'screenshot') || []
  console.log('Inline screenshots in content:', inlineScreenshots.length)
  
  if (clickup.screenshots?.length > 0) {
    console.log('\nFirst screenshot:', clickup.screenshots[0])
  }
}

checkScreenshots()