import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = 'x1zu4x72'
const dataset = 'production'

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: '2024-01-01',
  useCdn: false, // Disable CDN to ensure fresh data
  // Don't include token on client side for security
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}