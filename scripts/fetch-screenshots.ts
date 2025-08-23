#!/usr/bin/env node

/**
 * Script to fetch and validate screenshot URLs for software reviews
 * This can be run periodically to update screenshot sources
 */

import fs from 'fs'
import path from 'path'
import { softwareScreenshots } from '../lib/screenshot-sources'

interface ScreenshotStatus {
  url: string
  valid: boolean
  contentType?: string
  lastChecked: string
}

async function checkImageUrl(url: string): Promise<ScreenshotStatus> {
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    return {
      url,
      valid: response.ok,
      contentType: response.headers.get('content-type') || undefined,
      lastChecked: new Date().toISOString()
    }
  } catch (error) {
    return {
      url,
      valid: false,
      lastChecked: new Date().toISOString()
    }
  }
}

async function validateAllScreenshots() {
  console.log('🔍 Validating screenshot URLs...\n')
  
  const results: Record<string, Record<string, ScreenshotStatus>> = {}
  
  for (const [software, screenshots] of Object.entries(softwareScreenshots)) {
    console.log(`Checking ${software}...`)
    results[software] = {}
    
    for (const [key, url] of Object.entries(screenshots)) {
      if (key === 'alternativeSources') continue
      if (typeof url !== 'string') continue
      
      const status = await checkImageUrl(url)
      results[software][key] = status
      
      console.log(`  ${key}: ${status.valid ? '✅' : '❌'} ${status.valid ? '' : '(URL may need updating)'}`)
    }
  }
  
  // Save results to a JSON file for reference
  const outputPath = path.join(process.cwd(), 'screenshot-validation.json')
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2))
  
  console.log(`\n📄 Validation results saved to: ${outputPath}`)
  
  // Generate summary
  let totalValid = 0
  let totalInvalid = 0
  
  for (const software of Object.values(results)) {
    for (const status of Object.values(software)) {
      if (status.valid) totalValid++
      else totalInvalid++
    }
  }
  
  console.log('\n📊 Summary:')
  console.log(`  Valid URLs: ${totalValid}`)
  console.log(`  Invalid URLs: ${totalInvalid}`)
  console.log(`  Success Rate: ${((totalValid / (totalValid + totalInvalid)) * 100).toFixed(1)}%`)
}

// Alternative: Fetch screenshots from software's media kit or press pages
async function fetchFromMediaKit(software: string) {
  const mediaKitUrls: Record<string, string> = {
    clickup: 'https://clickup.com/press',
    monday: 'https://monday.com/newsroom/media-kit',
    asana: 'https://asana.com/press',
    notion: 'https://www.notion.so/press',
    trello: 'https://trello.com/press',
  }
  
  const url = mediaKitUrls[software.toLowerCase()]
  if (!url) return null
  
  console.log(`\n📸 Fetching media kit for ${software} from: ${url}`)
  
  try {
    const response = await fetch(url)
    const html = await response.text()
    
    // Extract image URLs from the HTML
    const imageRegex = /<img[^>]+src=["']([^"']+\.(?:png|jpg|jpeg|webp))[^"']*/gi
    const matches = [...html.matchAll(imageRegex)]
    
    const images = matches
      .map(match => match[1])
      .filter(src => !src.includes('logo') && !src.includes('icon'))
      .slice(0, 10) // Limit to first 10 images
    
    console.log(`  Found ${images.length} potential screenshots`)
    
    return images
  } catch (error) {
    console.log(`  ❌ Error fetching media kit: ${error}`)
    return null
  }
}

// Main execution
async function main() {
  console.log('🚀 Screenshot Management Tool\n')
  console.log('1. Validating existing screenshot URLs...')
  
  await validateAllScreenshots()
  
  console.log('\n2. Checking for media kit screenshots...')
  
  const softwares = ['clickup', 'monday', 'asana', 'notion', 'trello']
  for (const software of softwares) {
    await fetchFromMediaKit(software)
  }
  
  console.log('\n✅ Screenshot validation complete!')
  console.log('\nNote: Invalid URLs should be updated in lib/screenshot-sources.ts')
  console.log('Consider using the Wayback Machine or requesting official screenshots from vendors.')
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error)
}

export { validateAllScreenshots, fetchFromMediaKit }