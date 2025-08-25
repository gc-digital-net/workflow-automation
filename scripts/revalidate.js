#!/usr/bin/env node

/**
 * Script to manually trigger content revalidation
 * Usage: 
 *   node scripts/revalidate.js          # Revalidate all
 *   node scripts/revalidate.js reviews  # Revalidate reviews
 *   node scripts/revalidate.js blog     # Revalidate blog
 *   node scripts/revalidate.js /reviews/clickup  # Revalidate specific path
 */

const args = process.argv.slice(2);
const type = args[0] || 'all';

// Use production URL when deployed, localhost for development
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'your-secret-revalidation-token-change-this';

async function revalidate() {
  let url = `${SITE_URL}/api/revalidate?secret=${REVALIDATION_SECRET}`;
  
  if (type.startsWith('/')) {
    // Specific path
    url += `&path=${encodeURIComponent(type)}`;
    console.log(`Revalidating path: ${type}`);
  } else {
    // Type-based revalidation
    url += `&type=${type}`;
    console.log(`Revalidating type: ${type}`);
  }
  
  try {
    const response = await fetch(url, { method: 'POST' });
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Revalidation successful:', data);
    } else {
      console.error('❌ Revalidation failed:', data);
    }
  } catch (error) {
    console.error('❌ Error calling revalidation API:', error);
  }
}

revalidate();