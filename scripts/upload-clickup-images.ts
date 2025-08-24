import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { basename } from 'path'
import * as dotenv from 'dotenv'
import { readdir } from 'fs/promises'
import { join } from 'path'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function uploadClickUpImages() {
  console.log('Starting ClickUp image upload...')
  
  try {
    // First, find the ClickUp review document
    const query = `*[_type == "software" && (name match "ClickUp*" || name match "clickup*")][0]`
    const clickupReview = await client.fetch(query)
    
    if (!clickupReview) {
      // Create a new ClickUp review if it doesn't exist
      console.log('Creating new ClickUp review...')
      const newReview = await client.create({
        _type: 'software',
        name: 'ClickUp',
        slug: {
          _type: 'slug',
          current: 'clickup'
        },
        tagline: 'One app to replace them all',
        shortDescription: 'ClickUp is an all-in-one project management platform that combines tasks, docs, goals, and communication in a single tool.',
        overallScore: 9.2,
        scores: {
          easeOfUse: 8.5,
          features: 9.5,
          integrations: 9.0,
          pricing: 8.8,
          support: 8.7,
          security: 9.0,
          scalability: 9.3,
          performance: 8.6,
          mobile: 8.8,
          documentation: 8.9,
          learningCurve: 7.5,
          customization: 9.5,
          reporting: 9.0,
          freeTier: 9.2,
          overallValue: 9.2
        },
        affiliateLink: 'https://clickup.com',
        pros: [
          'Highly customizable workspace',
          'Comprehensive feature set',
          'Excellent free tier',
          'Great for teams of all sizes',
          'Regular updates and improvements',
          'Strong automation capabilities',
          'Multiple view types (List, Board, Calendar, Gantt, etc.)',
          'Built-in docs and wikis',
          'Time tracking included',
          'Goal tracking and OKRs'
        ],
        cons: [
          'Steep learning curve',
          'Can be overwhelming for new users',
          'Mobile app could be improved',
          'Some features require higher tiers',
          'Occasional performance issues with large datasets'
        ],
        integrations: 100,
        popularIntegrations: [
          'Slack',
          'Google Drive',
          'Zoom',
          'GitHub',
          'Figma',
          'Zapier',
          'Microsoft Teams',
          'Salesforce',
          'HubSpot',
          'Jira'
        ],
        supportedPlatforms: ['web', 'windows', 'macos', 'ios', 'android', 'api'],
        deploymentOptions: ['cloud'],
        reviewStatus: 'published',
        lastUpdated: new Date().toISOString()
      })
      
      console.log('Created ClickUp review with ID:', newReview._id)
      clickupReview._id = newReview._id
    } else {
      console.log('Found existing ClickUp review:', clickupReview._id)
    }
    
    // Upload images
    const imagesDir = join(process.cwd(), 'public', 'tools', 'clickup')
    const files = await readdir(imagesDir)
    const imageFiles = files.filter(file => 
      file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
    )
    
    console.log(`Found ${imageFiles.length} images to upload`)
    
    const uploadedImages = []
    
    for (const filename of imageFiles) {
      const filePath = join(imagesDir, filename)
      console.log(`Uploading ${filename}...`)
      
      try {
        // Upload the image asset
        const imageAsset = await client.assets.upload('image', createReadStream(filePath), {
          filename: filename
        })
        
        console.log(`✓ Uploaded ${filename} with asset ID: ${imageAsset._id}`)
        
        // Create a screenshot object
        uploadedImages.push({
          _type: 'object',
          _key: imageAsset._id,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id
            }
          },
          caption: filename.replace('.png', '').replace(/_/g, ' '),
          altText: `ClickUp ${filename.replace('.png', '').replace(/_/g, ' ')} screenshot`
        })
      } catch (error) {
        console.error(`Failed to upload ${filename}:`, error)
      }
    }
    
    // Upload logo
    const logoFile = 'logo-v3-clickup-light.svg'
    const logoPath = join(imagesDir, logoFile)
    console.log(`Uploading logo...`)
    
    const logoAsset = await client.assets.upload('image', createReadStream(logoPath), {
      filename: logoFile
    })
    
    console.log(`✓ Uploaded logo with asset ID: ${logoAsset._id}`)
    
    // Update the ClickUp review with screenshots and logo
    const updatedReview = await client
      .patch(clickupReview._id)
      .set({
        logo: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: logoAsset._id
          }
        },
        screenshots: uploadedImages,
        featuredImage: uploadedImages[0]?.image // Use first screenshot as featured image
      })
      .commit()
    
    console.log('✅ Successfully updated ClickUp review with images!')
    console.log(`- Logo uploaded`)
    console.log(`- ${uploadedImages.length} screenshots uploaded`)
    
    return updatedReview
    
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Run the script
uploadClickUpImages()
  .then(() => {
    console.log('✨ All done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })