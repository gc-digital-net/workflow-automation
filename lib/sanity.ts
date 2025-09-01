import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'x1zu4x72'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: '2024-01-01',
  useCdn: true, // Enable CDN for better performance
  // Don't include token on client side for security
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}