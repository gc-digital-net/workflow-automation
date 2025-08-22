import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // API timeout configuration for Vercel
  serverRuntimeConfig: {
    apiTimeout: 30000, // 30 seconds
  },
  
  // Image optimization
  images: {
    domains: ['cdn.sanity.io'],
  },
  
  // Experimental features for better performance
  // experimental: {
  //   optimizeCss: true,
  // },
  
  // TypeScript configuration
  typescript: {
    // Ignore TypeScript errors during build for now
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
