import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Trim environment variables to remove any whitespace/newlines
const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'x1zu4x72').trim()
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production').trim()

// Create client only if we have valid configuration
let client: any = null

if (projectId && projectId.length > 0) {
  try {
    client = createClient({
      projectId: projectId,
      dataset: dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  } catch (error) {
    console.error('Failed to create Sanity client:', error)
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