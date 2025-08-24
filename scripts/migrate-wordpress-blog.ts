import 'dotenv/config'
import { createClient } from '@sanity/client'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { v4 as uuidv4 } from 'uuid'
import * as xml2js from 'xml2js'
import fs from 'fs'
import path from 'path'

// Load environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('Error: Missing Sanity credentials')
  process.exit(1)
}

// Sanity client
const sanityClient = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-01-01',
})

// Cache for uploaded images
const imageCache = new Map<string, string>()
const failedUrls: string[] = []

// Utility functions
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Save progress to file
function saveProgress(data: any) {
  fs.writeFileSync('migration-progress.json', JSON.stringify(data, null, 2))
}

// Load progress
function loadProgress() {
  try {
    const data = fs.readFileSync('migration-progress.json', 'utf8')
    return JSON.parse(data)
  } catch {
    return { processed: [], failed: [] }
  }
}

// Fetch all blog URLs from sitemap
async function fetchBlogUrls(): Promise<string[]> {
  console.log('Fetching blog URLs from sitemap...')
  
  try {
    const response = await axios.get('https://workflowautomation.net/post-sitemap.xml')
    const parser = new xml2js.Parser()
    const result = await parser.parseStringPromise(response.data)
    
    const urls: string[] = []
    if (result.urlset && result.urlset.url) {
      for (const urlEntry of result.urlset.url) {
        const url = urlEntry.loc[0]
        if (url.includes('/blog/')) {
          urls.push(url)
        }
      }
    }
    
    console.log(`Found ${urls.length} blog posts`)
    return urls
  } catch (error) {
    console.error('Sitemap fetch error:', error)
    return []
  }
}

// Download and upload image
async function processImage(imageUrl: string): Promise<string | null> {
  if (imageCache.has(imageUrl)) {
    return imageCache.get(imageUrl)!
  }
  
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 20000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    const buffer = Buffer.from(response.data)
    const filename = path.basename(new URL(imageUrl).pathname) || 'image.jpg'
    
    const asset = await sanityClient.assets.upload('image', buffer, {
      filename: filename
    })
    
    imageCache.set(imageUrl, asset._id)
    return asset._id
  } catch (error) {
    return null
  }
}

// Parse WordPress content to Portable Text
async function parseContent(html: string, baseUrl: string): Promise<any[]> {
  const $ = cheerio.load(html)
  const blocks: any[] = []
  
  // Clean up the HTML
  $('.wp-block-group__inner-container, .wp-block-column').each((i, el) => {
    $(el).replaceWith($(el).html() || '')
  })
  
  // Remove WordPress specific elements
  $('.wp-block-buttons, .wp-block-button, .sharedaddy, .jp-relatedposts, .entry-footer').remove()
  
  // Process content blocks
  const processElement = async (el: any) => {
    const $el = $(el)
    const tagName = el.tagName?.toLowerCase()
    
    if (!tagName) return
    
    const text = $el.text().trim()
    
    // Handle images
    if (tagName === 'img' || $el.hasClass('wp-block-image')) {
      const img = tagName === 'img' ? $el : $el.find('img').first()
      const src = img.attr('src') || img.attr('data-src')
      
      if (src && !src.includes('emoji') && !src.includes('avatar')) {
        try {
          const fullUrl = new URL(src, baseUrl).toString()
          const assetId = await processImage(fullUrl)
          
          if (assetId) {
            blocks.push({
              _type: 'image',
              _key: uuidv4(),
              asset: {
                _type: 'reference',
                _ref: assetId
              },
              alt: img.attr('alt') || '',
              caption: $el.find('figcaption').text() || ''
            })
          }
        } catch {}
      }
    }
    // Handle headings
    else if (/^h[1-6]$/.test(tagName) && text) {
      const level = parseInt(tagName.charAt(1))
      blocks.push({
        _type: 'block',
        _key: uuidv4(),
        style: `h${Math.min(level, 4)}`,
        markDefs: [],
        children: [{
          _type: 'span',
          _key: uuidv4(),
          text: text,
          marks: []
        }]
      })
    }
    // Handle lists
    else if ((tagName === 'ul' || tagName === 'ol') && $el.find('li').length > 0) {
      const listType = tagName === 'ul' ? 'bullet' : 'number'
      $el.find('li').each((i, li) => {
        const liText = $(li).text().trim()
        if (liText) {
          blocks.push({
            _type: 'block',
            _key: uuidv4(),
            style: 'normal',
            listItem: listType,
            markDefs: [],
            children: [{
              _type: 'span',
              _key: uuidv4(),
              text: liText,
              marks: []
            }]
          })
        }
      })
    }
    // Handle blockquotes
    else if (tagName === 'blockquote' && text) {
      blocks.push({
        _type: 'block',
        _key: uuidv4(),
        style: 'blockquote',
        markDefs: [],
        children: [{
          _type: 'span',
          _key: uuidv4(),
          text: text,
          marks: []
        }]
      })
    }
    // Handle paragraphs
    else if (tagName === 'p' && text && text.length > 1) {
      // Skip if it's just punctuation or very short
      if (!/^[.,;:!?-]+$/.test(text)) {
        blocks.push({
          _type: 'block',
          _key: uuidv4(),
          style: 'normal',
          markDefs: [],
          children: [{
            _type: 'span',
            _key: uuidv4(),
            text: text,
            marks: []
          }]
        })
      }
    }
    // Handle WordPress blocks
    else if ($el.hasClass('wp-block-heading')) {
      const headingText = $el.text().trim()
      if (headingText) {
        blocks.push({
          _type: 'block',
          _key: uuidv4(),
          style: 'h3',
          markDefs: [],
          children: [{
            _type: 'span',
            _key: uuidv4(),
            text: headingText,
            marks: []
          }]
        })
      }
    }
  }
  
  // Process all elements
  const elements = $('.entry-content > *, .entry-content p, .entry-content h1, .entry-content h2, .entry-content h3, .entry-content h4, .entry-content ul, .entry-content ol, .entry-content blockquote, .entry-content img, .entry-content figure, .entry-content .wp-block-image, .entry-content .wp-block-heading')
  
  for (let i = 0; i < elements.length; i++) {
    await processElement(elements[i])
  }
  
  // If no content found, try alternative selectors
  if (blocks.length === 0) {
    const alternativeContent = $('article .content, main .content, .post-content, .single-content, [itemprop="articleBody"]').first()
    if (alternativeContent.length > 0) {
      const altElements = alternativeContent.find('p, h1, h2, h3, h4, h5, h6, ul, ol, blockquote, img')
      for (let i = 0; i < altElements.length; i++) {
        await processElement(altElements[i])
      }
    }
  }
  
  return blocks
}

// Fetch and parse a single blog post
async function fetchBlogPost(url: string) {
  try {
    console.log(`  Fetching: ${url}`)
    
    const response = await axios.get(url, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    const $ = cheerio.load(response.data)
    
    // Extract title
    const title = $('.entry-title, h1.title, .post-title, article h1').first().text().trim() ||
                  $('meta[property="og:title"]').attr('content') ||
                  $('title').text().split('|')[0].trim()
    
    if (!title || title === '') {
      console.log('    No title found')
      return null
    }
    
    // Extract slug
    const slug = url.split('/').filter(s => s).pop() || 'untitled'
    
    // Extract excerpt
    const excerpt = $('meta[name="description"]').attr('content') ||
                    $('meta[property="og:description"]').attr('content') ||
                    $('.entry-summary, .excerpt').first().text().trim() ||
                    ''
    
    // Extract content
    const content = await parseContent(response.data, url)
    
    if (content.length === 0) {
      console.log('    No content extracted')
      return null
    }
    
    // Extract featured image
    const featuredImage = $('meta[property="og:image"]').attr('content') ||
                          $('.post-thumbnail img, .featured-image img, .entry-thumbnail img').first().attr('src')
    
    // Extract date
    const publishedAt = $('meta[property="article:published_time"]').attr('content') ||
                        $('time[datetime]').first().attr('datetime') ||
                        $('.entry-date, .published').first().attr('datetime') ||
                        new Date().toISOString()
    
    // Extract author
    const author = $('meta[name="author"]').attr('content') ||
                   $('.author-name, .by-author, .entry-author').first().text().trim() ||
                   'Workflow Team'
    
    // Extract categories
    const categories: string[] = []
    $('.cat-links a, .entry-categories a, .post-categories a, [rel="category tag"]').each((i, el) => {
      const cat = $(el).text().trim()
      if (cat && !categories.includes(cat)) {
        categories.push(cat)
      }
    })
    
    console.log(`    ✓ Extracted: ${title} (${content.length} blocks)`)
    
    return {
      title,
      slug,
      excerpt: excerpt.substring(0, 200),
      content,
      featuredImage,
      publishedAt,
      author,
      categories: categories.length > 0 ? categories : ['Workflow Automation']
    }
  } catch (error: any) {
    console.log(`    ✗ Error: ${error.message}`)
    return null
  }
}

// Main migration function
async function migrate() {
  console.log('\n' + '='.repeat(60))
  console.log('WORDPRESS BLOG MIGRATION TO SANITY')
  console.log('='.repeat(60) + '\n')
  
  const progress = loadProgress()
  const processedUrls = new Set(progress.processed)
  
  // Get all blog URLs
  const allUrls = await fetchBlogUrls()
  
  if (allUrls.length === 0) {
    console.error('No blog URLs found!')
    return
  }
  
  // Filter out already processed URLs
  const urlsToProcess = allUrls.filter(url => !processedUrls.has(url))
  
  console.log(`Total posts: ${allUrls.length}`)
  console.log(`Already processed: ${processedUrls.size}`)
  console.log(`To process: ${urlsToProcess.length}\n`)
  
  if (urlsToProcess.length === 0) {
    console.log('All posts have been processed!')
    return
  }
  
  let successCount = 0
  let errorCount = 0
  
  // Process posts one by one with delay
  for (let i = 0; i < urlsToProcess.length; i++) {
    const url = urlsToProcess[i]
    console.log(`\n[${i + 1}/${urlsToProcess.length}] ${url}`)
    
    try {
      // Check if already exists in Sanity
      const slug = url.split('/').filter(s => s).pop()
      const existing = await sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug][0]`,
        { slug }
      )
      
      if (existing) {
        console.log('  → Already in Sanity, skipping')
        processedUrls.add(url)
        continue
      }
      
      // Fetch post data
      const postData = await fetchBlogPost(url)
      
      if (!postData) {
        console.log('  ✗ Failed to extract content')
        failedUrls.push(url)
        errorCount++
        continue
      }
      
      // Create author
      const authorSlug = postData.author.toLowerCase().replace(/\s+/g, '-')
      let authorId = null
      
      try {
        const existingAuthor = await sanityClient.fetch(
          `*[_type == "author" && slug.current == $authorSlug][0]`,
          { authorSlug }
        )
        
        if (existingAuthor) {
          authorId = existingAuthor._id
        } else {
          const newAuthor = await sanityClient.create({
            _type: 'author',
            name: postData.author,
            slug: { _type: 'slug', current: authorSlug }
          })
          authorId = newAuthor._id
        }
      } catch {}
      
      // Create categories
      const categoryIds: string[] = []
      for (const cat of postData.categories) {
        const catSlug = cat.toLowerCase().replace(/\s+/g, '-')
        try {
          const existingCat = await sanityClient.fetch(
            `*[_type == "category" && slug.current == $catSlug][0]`,
            { catSlug }
          )
          
          if (existingCat) {
            categoryIds.push(existingCat._id)
          } else {
            const newCat = await sanityClient.create({
              _type: 'category',
              name: cat,
              slug: { _type: 'slug', current: catSlug }
            })
            categoryIds.push(newCat._id)
          }
        } catch {}
      }
      
      // Upload featured image
      let featuredImageId = null
      if (postData.featuredImage) {
        featuredImageId = await processImage(postData.featuredImage)
      }
      
      // Create post in Sanity
      const post = {
        _type: 'post',
        title: postData.title,
        slug: { _type: 'slug', current: postData.slug },
        excerpt: postData.excerpt,
        content: postData.content,
        publishedAt: postData.publishedAt,
        ...(authorId && {
          author: { _type: 'reference', _ref: authorId }
        }),
        ...(categoryIds.length > 0 && {
          categories: categoryIds.map(id => ({
            _type: 'reference',
            _ref: id
          }))
        }),
        ...(featuredImageId && {
          featuredImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: featuredImageId }
          }
        })
      }
      
      await sanityClient.create(post)
      console.log(`  ✓ Migrated successfully`)
      
      successCount++
      processedUrls.add(url)
      
      // Save progress
      saveProgress({
        processed: Array.from(processedUrls),
        failed: failedUrls
      })
      
    } catch (error: any) {
      console.log(`  ✗ Migration error: ${error.message}`)
      failedUrls.push(url)
      errorCount++
    }
    
    // Rate limiting
    await delay(2000)
    
    // Progress update every 10 posts
    if ((i + 1) % 10 === 0) {
      console.log(`\n--- Progress: ${successCount} successful, ${errorCount} failed ---\n`)
    }
  }
  
  // Final summary
  console.log('\n' + '='.repeat(60))
  console.log('MIGRATION COMPLETE')
  console.log('='.repeat(60))
  console.log(`✓ Successfully migrated: ${successCount}`)
  console.log(`✗ Failed: ${errorCount}`)
  console.log(`→ Total processed: ${processedUrls.size}`)
  
  if (failedUrls.length > 0) {
    console.log('\nFailed URLs saved to failed-urls.txt')
    fs.writeFileSync('failed-urls.txt', failedUrls.join('\n'))
  }
  
  console.log('\nImage cache: ' + imageCache.size + ' unique images uploaded')
}

// Run migration
migrate().then(() => {
  console.log('\nDone!')
  process.exit(0)
}).catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})