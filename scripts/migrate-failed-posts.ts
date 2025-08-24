import 'dotenv/config'
import { createClient } from '@sanity/client'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { v4 as uuidv4 } from 'uuid'
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
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Load failed URLs from file
function loadFailedUrls(): string[] {
  try {
    const data = fs.readFileSync('failed-urls.txt', 'utf8')
    return data.split('\n').filter(url => url.trim())
  } catch {
    console.error('Could not load failed-urls.txt')
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

// Enhanced content extraction with multiple strategies
async function extractContentAdvanced(html: string, url: string): Promise<any[]> {
  const $ = cheerio.load(html)
  const blocks: any[] = []
  
  // Strategy 1: Try main article content areas
  let contentArea = $('article .entry-content, article .post-content, .single-content, main article').first()
  
  // Strategy 2: If no article content, try main content area
  if (contentArea.length === 0 || contentArea.text().trim().length < 100) {
    contentArea = $('main, #main, .main-content, #content').first()
  }
  
  // Strategy 3: If still no content, try by class patterns
  if (contentArea.length === 0 || contentArea.text().trim().length < 100) {
    contentArea = $('[class*="content"], [class*="article"], [class*="post"]').first()
  }
  
  // Strategy 4: Look for the largest text block
  if (contentArea.length === 0 || contentArea.text().trim().length < 100) {
    let maxLength = 0
    let bestElement: any = null
    
    $('div, section, article').each((i, el) => {
      const text = $(el).text().trim()
      // Exclude navigation, footer, header content
      if (text.length > maxLength && 
          !$(el).is('header, nav, footer, .header, .nav, .footer, .menu, .sidebar')) {
        maxLength = text.length
        bestElement = el
      }
    })
    
    if (bestElement) {
      contentArea = $(bestElement)
    }
  }
  
  // Remove unwanted elements
  contentArea.find('script, style, nav, header, footer, .social-share, .related-posts, .comments, .sidebar, .ads, .advertisement').remove()
  
  // Process content elements
  const processElement = async (el: any) => {
    const $el = $(el)
    const tagName = el.tagName?.toLowerCase()
    
    if (!tagName) return
    
    const text = $el.clone().children().remove().end().text().trim()
    
    // Skip empty elements and very short text
    if (!text && tagName !== 'img' && tagName !== 'figure') return
    if (text && text.length < 2) return
    
    // Handle images
    if (tagName === 'img' || tagName === 'figure' || $el.find('img').length > 0) {
      const img = tagName === 'img' ? $el : $el.find('img').first()
      const src = img.attr('src') || img.attr('data-src') || img.attr('data-lazy-src')
      
      if (src && !src.includes('emoji') && !src.includes('avatar') && !src.includes('icon')) {
        try {
          const fullUrl = new URL(src, url).toString()
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
        style: `h${Math.min(level + 1, 4)}`, // Adjust heading levels
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
      $el.find('> li').each((i, li) => {
        const liText = $(li).text().trim()
        if (liText && liText.length > 1) {
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
    // Handle paragraphs and divs with text
    else if ((tagName === 'p' || tagName === 'div') && text && text.length > 10) {
      // Skip if it looks like metadata or navigation
      if (!/^(by |posted |filed under|tags:|categories:|share)/i.test(text)) {
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
  }
  
  // Process all content elements
  const elements = contentArea.find('> *, p, h1, h2, h3, h4, h5, h6, ul, ol, blockquote, img, figure')
  
  for (let i = 0; i < elements.length; i++) {
    await processElement(elements[i])
  }
  
  // If still no content, try extracting all paragraphs from the page
  if (blocks.length === 0) {
    console.log('    Using fallback: extracting all paragraphs')
    $('p').each((i, el) => {
      const text = $(el).text().trim()
      if (text.length > 30 && !$(el).parents('header, nav, footer, .menu, .sidebar').length) {
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
    })
  }
  
  return blocks
}

// Fetch and parse blog post with enhanced extraction
async function fetchBlogPostEnhanced(url: string) {
  try {
    console.log(`  Fetching: ${url}`)
    
    const response = await axios.get(url, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    })
    
    const $ = cheerio.load(response.data)
    
    // Extract title with multiple strategies
    let title = $('h1.entry-title, article h1, .post-title, h1').first().text().trim()
    if (!title) {
      title = $('meta[property="og:title"]').attr('content') || ''
    }
    if (!title) {
      title = $('title').text().split('|')[0].split('-')[0].trim()
    }
    
    if (!title || title === '') {
      console.log('    No title found')
      return null
    }
    
    // Extract slug
    const slug = url.split('/').filter(s => s).pop() || 'untitled'
    
    // Extract excerpt
    const excerpt = $('meta[name="description"]').attr('content') ||
                    $('meta[property="og:description"]').attr('content') ||
                    $('.entry-summary, .excerpt, .post-excerpt').first().text().trim() ||
                    $('p').first().text().substring(0, 160) || ''
    
    // Extract content with enhanced strategies
    const content = await extractContentAdvanced(response.data, url)
    
    // If still no content, create minimal content from title and excerpt
    if (content.length === 0) {
      console.log('    Creating minimal content from metadata')
      if (excerpt) {
        content.push({
          _type: 'block',
          _key: uuidv4(),
          style: 'normal',
          markDefs: [],
          children: [{
            _type: 'span',
            _key: uuidv4(),
            text: excerpt,
            marks: []
          }]
        })
      }
    }
    
    // Extract featured image
    const featuredImage = $('meta[property="og:image"]').attr('content') ||
                          $('.post-thumbnail img, .featured-image img, article img').first().attr('src')
    
    // Extract date
    const publishedAt = $('meta[property="article:published_time"]').attr('content') ||
                        $('time[datetime]').first().attr('datetime') ||
                        $('.entry-date, .published, .post-date').first().attr('datetime') ||
                        new Date().toISOString()
    
    // Extract author
    const author = $('meta[name="author"]').attr('content') ||
                   $('.author-name, .by-author, .entry-author, .post-author').first().text().trim() ||
                   'Workflow Team'
    
    // Extract categories
    const categories: string[] = []
    $('.cat-links a, .entry-categories a, .post-categories a, [rel="category tag"], .category').each((i, el) => {
      const cat = $(el).text().trim()
      if (cat && !categories.includes(cat) && cat.length < 50) {
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

// Main migration function for failed posts
async function migrateFailedPosts() {
  console.log('\n' + '='.repeat(60))
  console.log('MIGRATING FAILED BLOG POSTS')
  console.log('='.repeat(60) + '\n')
  
  const failedUrls = loadFailedUrls()
  
  if (failedUrls.length === 0) {
    console.error('No failed URLs found!')
    return
  }
  
  console.log(`Found ${failedUrls.length} failed URLs to retry\n`)
  
  let successCount = 0
  let skipCount = 0
  let errorCount = 0
  const stillFailed: string[] = []
  
  // Process in smaller batches
  const batchSize = 3
  for (let i = 0; i < failedUrls.length; i += batchSize) {
    const batch = failedUrls.slice(i, Math.min(i + batchSize, failedUrls.length))
    
    console.log(`\nBatch ${Math.floor(i/batchSize) + 1}/${Math.ceil(failedUrls.length/batchSize)}`)
    console.log('-'.repeat(40))
    
    for (const url of batch) {
      const postNumber = i + batch.indexOf(url) + 1
      console.log(`\n[${postNumber}/${failedUrls.length}] Processing: ${url}`)
      
      try {
        // Check if already exists in Sanity
        const slug = url.split('/').filter(s => s).pop()
        const existing = await sanityClient.fetch(
          `*[_type == "post" && slug.current == $slug][0]`,
          { slug }
        )
        
        if (existing) {
          console.log('  → Already in Sanity, skipping')
          skipCount++
          continue
        }
        
        // Fetch post data with enhanced extraction
        const postData = await fetchBlogPostEnhanced(url)
        
        if (!postData) {
          console.log('  ✗ Failed to extract content')
          stillFailed.push(url)
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
          const catSlug = cat.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
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
        
      } catch (error: any) {
        console.log(`  ✗ Migration error: ${error.message}`)
        stillFailed.push(url)
        errorCount++
      }
      
      // Rate limiting
      await delay(2000)
    }
    
    // Delay between batches
    if (i + batchSize < failedUrls.length) {
      console.log('\n  Waiting before next batch...')
      await delay(5000)
    }
  }
  
  // Final summary
  console.log('\n' + '='.repeat(60))
  console.log('MIGRATION COMPLETE')
  console.log('='.repeat(60))
  console.log(`✓ Successfully migrated: ${successCount}`)
  console.log(`→ Already existed: ${skipCount}`)
  console.log(`✗ Failed: ${errorCount}`)
  console.log(`  Total processed: ${failedUrls.length}`)
  console.log('='.repeat(60))
  
  if (stillFailed.length > 0) {
    console.log('\nURLs that still failed (saved to still-failed-urls.txt):')
    stillFailed.forEach(url => console.log(`  - ${url}`))
    fs.writeFileSync('still-failed-urls.txt', stillFailed.join('\n'))
  }
  
  console.log('\nImage cache: ' + imageCache.size + ' unique images uploaded')
}

// Run migration
migrateFailedPosts().then(() => {
  console.log('\nDone!')
  process.exit(0)
}).catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})