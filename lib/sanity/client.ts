import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from './env'

// Check if we have valid Sanity configuration
const isConfigured = projectId && projectId !== 'temp123'

export const client = isConfigured ? createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
}) : null

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: any
  tags?: string[]
}): Promise<QueryResponse> {
  // Return empty data if Sanity is not configured
  if (!client) {
    console.warn('Sanity client not configured. Returning empty data.')
    return null as QueryResponse
  }
  
  return client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: 60,
      tags,
    },
  })
}