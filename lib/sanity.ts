import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// During build, env vars might not be available - use valid placeholder
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'x1zu4x72'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Create client only if we have valid configuration
let client: any = null

// Only try to create client if we have a valid project ID
if (projectId && projectId.length > 0) {
  try {
    client = createClient({
      projectId: projectId,
      dataset: dataset,
      apiVersion: '2024-01-01',
      useCdn: true, // Enable CDN for better performance
      // Don't include token on client side for security
    })
  } catch (error) {
    console.warn('Failed to create Sanity client:', error)
    client = null
  }
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