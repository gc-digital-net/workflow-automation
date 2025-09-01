export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Use fallback values during build time if env vars are not set
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Use the actual project ID as fallback to ensure consistency
// Remove any potential whitespace or hidden characters
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'x1zu4x72'
export const projectId = rawProjectId?.trim()

// Use CDN for better performance
export const useCdn = true

// Log configuration for debugging
console.log('Sanity environment config:', {
  projectId: projectId,
  projectIdLength: projectId?.length,
  projectIdCharCodes: projectId ? Array.from(projectId).map(c => c.charCodeAt(0)) : [],
  dataset,
  apiVersion,
  rawEnvVar: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  nodeEnv: process.env.NODE_ENV
})