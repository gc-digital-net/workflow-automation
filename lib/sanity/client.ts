import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from './env'

// Create client lazily to avoid errors during build
let client: any = null

function getClient() {
  if (!client) {
    // Validate and sanitize project ID
    const cleanProjectId = projectId?.trim()
    
    // Check if we have valid Sanity configuration
    if (!cleanProjectId || cleanProjectId.length === 0) {
      console.warn('Sanity project ID not configured')
      return null
    }
    
    // Validate project ID format (only a-z, 0-9, and dashes allowed)
    if (!/^[a-z0-9-]+$/.test(cleanProjectId)) {
      console.error(`Invalid Sanity project ID format: "${cleanProjectId}". Only lowercase letters, numbers, and dashes are allowed.`)
      return null
    }
    
    try {
      console.log('Creating Sanity client with project ID:', cleanProjectId)
      client = createClient({
        apiVersion,
        dataset,
        projectId: cleanProjectId,
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