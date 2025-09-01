export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Use fallback values during build time if env vars are not set
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Use the actual project ID as fallback to ensure consistency
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'x1zu4x72'

// Use CDN for better performance
export const useCdn = true

// Log configuration in development
if (process.env.NODE_ENV === 'development') {
  console.log('Sanity config:', { projectId, dataset, apiVersion })
}