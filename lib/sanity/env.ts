// Trim all environment variables to remove any whitespace/newlines
export const apiVersion = (process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01').trim()

// Use fallback values during build time if env vars are not set
const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const dataset = rawDataset.trim()

// Use the actual project ID as fallback to ensure consistency
// Remove any potential whitespace or hidden characters
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'x1zu4x72'
export const projectId = rawProjectId.trim()

// Use CDN for better performance
export const useCdn = true

// Log configuration for debugging
console.log('Sanity environment config (cleaned):', {
  projectId: projectId,
  projectIdLength: projectId?.length,
  dataset: dataset,
  datasetLength: dataset?.length,
  apiVersion,
  rawProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  rawDataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  nodeEnv: process.env.NODE_ENV
})