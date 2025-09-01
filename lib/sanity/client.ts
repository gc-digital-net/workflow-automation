import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from './env'

// Create client lazily to avoid errors during build
let client: any = null

function getClient() {
  if (!client) {
    // Check if we have valid Sanity configuration
    if (!projectId || projectId.length === 0 || !dataset || dataset.length === 0) {
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
      console.error('Failed to create Sanity client:', error)
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
    console.error('Sanity fetch error:', error)
    return null as QueryResponse
  }
}

// Export client getter for places that need direct access
export { getClient as client }