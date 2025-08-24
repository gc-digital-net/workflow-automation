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

async function checkClickUpScreenshots() {
  console.log('Checking ClickUp screenshots in Sanity...\n')
  
  try {
    const query = `*[_type == "software" && name == "ClickUp"][0] {
      _id,
      name,
      logo,
      screenshots[] {
        _key,
        caption,
        altText,
        image {
          asset-> {
            _id,
            url
          }
        }
      },
      featuredImage
    }`
    
    const clickup = await client.fetch(query)
    
    if (!clickup) {
      console.log('ClickUp review not found!')
      return
    }
    
    console.log('ClickUp Review ID:', clickup._id)
    console.log('Logo:', clickup.logo ? '✅ Present' : '❌ Missing')
    console.log('Featured Image:', clickup.featuredImage ? '✅ Present' : '❌ Missing')
    console.log('\nScreenshots:', clickup.screenshots ? `${clickup.screenshots.length} found` : '❌ None')
    
    if (clickup.screenshots && clickup.screenshots.length > 0) {
      console.log('\nScreenshot details:')
      clickup.screenshots.forEach((screenshot: any, index: number) => {
        console.log(`\n${index + 1}. ${screenshot.caption || 'No caption'}`)
        console.log(`   Alt: ${screenshot.altText || 'No alt text'}`)
        console.log(`   Asset ID: ${screenshot.image?.asset?._id || 'No asset'}`)
        console.log(`   URL: ${screenshot.image?.asset?.url || 'No URL'}`)
      })
    }
    
  } catch (error) {
    console.error('Error:', error)
  }
}

// Run the script
checkClickUpScreenshots()
  .then(() => {
    console.log('\n✨ Check complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })