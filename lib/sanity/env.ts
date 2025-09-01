// Trim all environment variables to remove any whitespace/newlines
export const apiVersion = (process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01').trim()
export const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production').trim()
export const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'x1zu4x72').trim()

// Use CDN for better performance
export const useCdn = true