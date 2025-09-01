import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from './env'

// Create client lazily to avoid errors during build
let client: any = null

function getClient() {
  if (!client) {
    // Check if we have valid Sanity configuration
    // Only skip if we have the temp placeholder
    if (!projectId || projectId === 'temp123') {
      console.warn('Sanity not configured, using placeholder')
      return null
    }
    
    try {
      client = createClient({
        apiVersion,
        dataset,
        projectId,
        useCdn,
      })
    } catch (error) {
      console.warn('Failed to create Sanity client:', error)
      return null
    }
  }
  return client
}

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: any
  tags?: string[]
}): Promise<QueryResponse> {
  const sanityClient = getClient()
  
  // Return empty data if Sanity is not configured
  if (!sanityClient) {
    console.warn('Sanity client not configured. Returning empty data.')
    return null as QueryResponse
  }
  
  try {
    return await sanityClient.fetch<QueryResponse>(query, params, {
      next: {
        revalidate: 60,
        tags,
      },
    })
  } catch (error) {
    console.warn('Sanity fetch error:', error)
    return null as QueryResponse
  }
}

// Export client getter for places that need direct access
export { getClient as client }