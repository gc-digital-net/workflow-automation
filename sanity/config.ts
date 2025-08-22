// Sanity configuration with hardcoded values for build time
// These are public values and safe to expose

export const sanityConfig = {
  projectId: 'x1zu4x72',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Enable CDN for production
} as const;

// Use environment variables if available, otherwise use defaults
export const getProjectId = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use environment variable if available
    return process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || sanityConfig.projectId;
  }
  // Server-side/build time: use hardcoded value
  return sanityConfig.projectId;
};

export const getDataset = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use environment variable if available
    return process.env.NEXT_PUBLIC_SANITY_DATASET || sanityConfig.dataset;
  }
  // Server-side/build time: use hardcoded value
  return sanityConfig.dataset;
};