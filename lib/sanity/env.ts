export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Use fallback values during build time if env vars are not set
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Use a valid placeholder that meets Sanity's validation (only lowercase a-z, 0-9, and dashes)
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'temp123'

// Use CDN for better performance
export const useCdn = true

// Log configuration in development
if (process.env.NODE_ENV === 'development') {
  console.log('Sanity config:', { projectId, dataset, apiVersion })
}