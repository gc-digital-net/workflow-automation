import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  
  // TypeScript configuration
  typescript: {
    // Ignore TypeScript errors during build for now
    ignoreBuildErrors: true,
  },
  
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;