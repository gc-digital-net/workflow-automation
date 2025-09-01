import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// During build, env vars might not be available - use valid placeholder
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'x1zu4x72'
const projectId = rawProjectId?.trim()
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Create client only if we have valid configuration
let client: any = null

// Validate project ID format
if (projectId && projectId.length > 0 && /^[a-z0-9-]+$/.test(projectId)) {
  try {
    console.log('Creating Sanity client in lib/sanity.ts with project ID:', projectId)
    client = createClient({
      projectId: projectId,
      dataset: dataset,
      apiVersion: '2024-01-01',
      useCdn: true, // Enable CDN for better performance
      // Don't include token on client side for security
    })
  } catch (error) {
    console.error('Failed to create Sanity client:', error)
    client = null
  }
} else {
  console.warn('Invalid or missing Sanity project ID:', projectId)
}

export { client }

const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source: any) {
  if (!builder) {
    // Return a placeholder image URL builder
    return {
      image: () => ({
        width: () => ({
          height: () => ({
            url: () => '/placeholder.jpg'
          })
        })
      })
    }
  }
  return builder.image(source)
}