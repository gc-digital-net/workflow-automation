import 'dotenv/config'
import { createClient } from '@sanity/client'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { v4 as uuidv4 } from 'uuid'
import * as xml2js from 'xml2js'

// Load environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN

if (!projectId || !token) {
  console.error('Error: Missing Sanity credentials')
  process.exit(1)
}

// Sanity client configuration
const sanityClient = createClient({
  projectId: projectId,
  dataset: dataset,
  token: token,
  useCdn: false,
  apiVersion: '2024-01-01',
})

// Cache for uploaded images to avoid duplicates
const imageCache = new Map<string, string>()

// Rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Fetch all blog URLs from sitemap
async function fetchAllBlogUrls(): Promise<string[]> {
  try {
    console.log('Fetching sitemap...')
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
    
    console.log(`Found ${urls.length} blog posts in sitemap`)
    return urls
  } catch (error) {
    console.error('Error fetching sitemap:', error)
    // Fallback to manual list if sitemap fails
    return getFallbackUrls()
  }
}

// Fallback blog URLs if sitemap fetch fails
function getFallbackUrls(): string[] {
  return [
    'https://workflowautomation.net/blog/scope-of-work',
    'https://workflowautomation.net/blog/workload-management',
    'https://workflowautomation.net/blog/saas-applications',
    'https://workflowautomation.net/blog/hr-software',
    'https://workflowautomation.net/blog/project-management-fast-tracking',
    'https://workflowautomation.net/blog/incident-management-process',
    'https://workflowautomation.net/blog/project-management-charts',
    'https://workflowautomation.net/blog/workflow-integration',
    'https://workflowautomation.net/blog/workflow-management',
    'https://workflowautomation.net/blog/scrum-project-management',
    'https://workflowautomation.net/blog/project-management-roadmap',
    'https://workflowautomation.net/blog/burn-up-chart',
    'https://workflowautomation.net/blog/cumulative-flow-diagram',
    'https://workflowautomation.net/blog/flowchart-software',
    'https://workflowautomation.net/blog/collaboration-software',
    'https://workflowautomation.net/blog/marketing-process',
    'https://workflowautomation.net/blog/project-management-ai',
    'https://workflowautomation.net/blog/workflow-analysis',
    'https://workflowautomation.net/blog/project-kickoff',
    'https://workflowautomation.net/blog/robotic-process-automation',
    'https://workflowautomation.net/blog/knowledge-management-system',
    // Add more URLs as needed
  ]
}

// Download and upload image with caching
async function downloadAndUploadImage(imageUrl: string): Promise<string | null> {
  try {
    // Check cache first
    if (imageCache.has(imageUrl)) {
      return imageCache.get(imageUrl)!
    }
    
    console.log(`  Downloading: ${imageUrl.split('/').pop()}`)
    
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 30000,
    })
    
    const buffer = Buffer.from(response.data)
    const filename = imageUrl.split('/').pop() || 'image.jpg'
    
    // Upload to Sanity
    const asset = await sanityClient.assets.upload('image', buffer, {
      filename: filename
    })
    
    // Cache the result
    imageCache.set(imageUrl, asset._id)
    
    return asset._id
  } catch (error: any) {
    console.error(`  Failed to process image: ${error.message}`)
    return null
  }
}

// Convert HTML to Portable Text (simplified version)
async function htmlToPortableText(html: string, baseUrl: string): Promise<any[]> {
  const $ = cheerio.load(html)
  const blocks: any[] = []
  
  // Remove unwanted elements
  $('script, style, nav, header, footer, .social-share, .related-posts, .comments').remove()
  
  // Process main content elements
  const elements = $('p, h1, h2, h3, h4, h5, h6, ul, ol, blockquote, img, pre, table')
  
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    const $el = $(el)
    const tagName = el.tagName.toLowerCase()
    
    // Skip empty elements
    const text = $el.text().trim()
    if (!text && tagName !== 'img') continue
    
    if (tagName === 'img') {
      const src = $el.attr('src')
      const alt = $el.attr('alt') || ''
      
      if (src && !src.includes('emoji') && !src.includes('icon')) {
        const fullUrl = new URL(src, baseUrl).toString()
        const assetId = await downloadAndUploadImage(fullUrl)
        
        if (assetId) {
          blocks.push({
            _type: 'image',
            _key: uuidv4(),
            asset: {
              _type: 'reference',
              _ref: assetId
            },
            alt: alt,
            caption: alt
          })
        }
      }
    } else if (tagName.startsWith('h')) {
      const level = parseInt(tagName.charAt(1))
      const style = level === 1 ? 'h1' : level === 2 ? 'h2' : level === 3 ? 'h3' : 'h4'
      
      blocks.push({
        _type: 'block',
        _key: uuidv4(),
        style: style,
        markDefs: [],
        children: [{
          _type: 'span',
          _key: uuidv4(),
          text: text,
          marks: []
        }]
      })
    } else if (tagName === 'ul' || tagName === 'ol') {
      const listType = tagName === 'ul' ? 'bullet' : 'number'
      $el.find('li').each((index, li) => {
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
    } else if (tagName === 'blockquote') {
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
    } else if (tagName === 'p' && text) {
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
  
  return blocks
}

// Fetch and parse blog post
async function fetchBlogPost(url: string) {
  try {
    const response = await axios.get(url, { timeout: 30000 })
    const $ = cheerio.load(response.data)
    
    // Extract metadata
    const title = $('h1.entry-title, h1, meta[property="og:title"]').first().text().trim() || 
                  $('meta[property="og:title"]').attr('content') || 
                  'Untitled'
    
    const excerpt = $('meta[name="description"], meta[property="og:description"]').first().attr('content') || ''
    
    // Extract slug from URL
    const slug = url.split('/').pop() || 'untitled'
    
    // Extract content
    const contentArea = $('.entry-content, .post-content, article .content, main article').first()
    const contentHtml = contentArea.html() || ''
    
    // Extract featured image
    const featuredImage = $('meta[property="og:image"]').attr('content') || 
                          $('.featured-image img, .post-thumbnail img, article img').first().attr('src')
    
    // Extract date
    const publishedAt = $('meta[property="article:published_time"]').attr('content') || 
                        $('time').first().attr('datetime') || 
                        new Date().toISOString()
    
    // Extract author
    const author = $('meta[name="author"]').attr('content') || 
                   $('.author-name, .by-author, .author').first().text().trim() || 
                   'Workflow Team'
    
    // Extract categories
    const categories: string[] = []
    $('.category, .cat-links a, .post-categories a').each((i, el) => {
      const cat = $(el).text().trim()
      if (cat && !categories.includes(cat)) {
        categories.push(cat)
      }
    })
    
    // Convert content
    const content = await htmlToPortableText(contentHtml, url)
    
    return {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      publishedAt,
      author,
      categories: categories.length > 0 ? categories : ['Automation'],
    }
  } catch (error: any) {
    console.error(`  Error fetching ${url}: ${error.message}`)
    return null
  }
}

// Get or create author
async function getOrCreateAuthor(name: string) {
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  
  try {
    const existing = await sanityClient.fetch(
      `*[_type == "author" && slug.current == $slug][0]`,
      { slug }
    )
    
    if (existing) return existing._id
    
    const author = await sanityClient.create({
      _type: 'author',
      name: name,
      slug: { _type: 'slug', current: slug },
      bio: `${name} is a contributor to Workflow Automation.`,
    })
    
    return author._id
  } catch (error) {
    console.error(`  Error with author ${name}:`, error)
    return null
  }
}

// Get or create category
async function getOrCreateCategory(categoryName: string) {
  const slug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  
  try {
    const existing = await sanityClient.fetch(
      `*[_type == "category" && slug.current == $slug][0]`,
      { slug }
    )
    
    if (existing) return existing._id
    
    const category = await sanityClient.create({
      _type: 'category',
      name: categoryName,
      slug: { _type: 'slug', current: slug },
      description: `Articles about ${categoryName.toLowerCase()}`
    })
    
    return category._id
  } catch (error) {
    console.error(`  Error with category ${categoryName}:`, error)
    return null
  }
}

// Main migration function
async function migrateAllPosts() {
  console.log('Starting comprehensive blog migration...\n')
  console.log('=' .repeat(60))
  
  // Get all blog URLs
  const blogUrls = await fetchAllBlogUrls()
  
  if (blogUrls.length === 0) {
    console.error('No blog URLs found!')
    return
  }
  
  console.log(`\nProcessing ${blogUrls.length} blog posts...\n`)
  console.log('=' .repeat(60))
  
  let successCount = 0
  let skipCount = 0
  let errorCount = 0
  const errors: string[] = []
  
  // Process in batches to avoid overwhelming the server
  const batchSize = 5
  for (let i = 0; i < blogUrls.length; i += batchSize) {
    const batch = blogUrls.slice(i, Math.min(i + batchSize, blogUrls.length))
    
    console.log(`\nBatch ${Math.floor(i/batchSize) + 1}/${Math.ceil(blogUrls.length/batchSize)}`)
    console.log('-' .repeat(40))
    
    for (const url of batch) {
      const postNumber = blogUrls.indexOf(url) + 1
      console.log(`\n[${postNumber}/${blogUrls.length}] Processing: ${url}`)
      
      try {
        // Check if already exists
        const slug = url.split('/').pop()
        const existing = await sanityClient.fetch(
          `*[_type == "post" && slug.current == $slug][0]`,
          { slug }
        )
        
        if (existing) {
          console.log(`  → Already exists, skipping`)
          skipCount++
          continue
        }
        
        // Fetch post data
        const postData = await fetchBlogPost(url)
        
        if (!postData || !postData.content || postData.content.length === 0) {
          console.log(`  ✗ No content found, skipping`)
          errorCount++
          errors.push(url)
          continue
        }
        
        // Get or create author and categories
        const authorId = await getOrCreateAuthor(postData.author)
        const categoryIds = await Promise.all(
          postData.categories.map(cat => getOrCreateCategory(cat))
        )
        
        // Upload featured image
        let featuredImageId = null
        if (postData.featuredImage) {
          featuredImageId = await downloadAndUploadImage(postData.featuredImage)
        }
        
        // Create post in Sanity
        const post = {
          _type: 'post',
          title: postData.title,
          slug: { _type: 'slug', current: postData.slug },
          excerpt: postData.excerpt || `Read about ${postData.title.toLowerCase()}`,
          content: postData.content,
          publishedAt: postData.publishedAt,
          ...(authorId && {
            author: { _type: 'reference', _ref: authorId }
          }),
          ...(categoryIds.filter(id => id).length > 0 && {
            categories: categoryIds.filter(id => id).map(id => ({
              _type: 'reference',
              _ref: id
            }))
          }),
          ...(featuredImageId && {
            featuredImage: {
              _type: 'image',
              asset: { _type: 'reference', _ref: featuredImageId }
            }
          }),
          seo: {
            metaTitle: postData.title.substring(0, 60),
            metaDescription: postData.excerpt?.substring(0, 160) || '',
            keywords: postData.categories
          }
        }
        
        await sanityClient.create(post)
        console.log(`  ✓ Successfully migrated: ${postData.title}`)
        successCount++
        
      } catch (error: any) {
        console.error(`  ✗ Error: ${error.message}`)
        errorCount++
        errors.push(url)
      }
      
      // Rate limiting
      await delay(1000)
    }
    
    // Delay between batches
    if (i + batchSize < blogUrls.length) {
      console.log('\n  Waiting before next batch...')
      await delay(3000)
    }
  }
  
  // Print summary
  console.log('\n' + '=' .repeat(60))
  console.log('MIGRATION SUMMARY')
  console.log('=' .repeat(60))
  console.log(`✓ Successfully migrated: ${successCount} posts`)
  console.log(`→ Already existed: ${skipCount} posts`)
  console.log(`✗ Failed: ${errorCount} posts`)
  console.log(`  Total processed: ${blogUrls.length} posts`)
  console.log('=' .repeat(60))
  
  if (errors.length > 0) {
    console.log('\nFailed URLs:')
    errors.forEach(url => console.log(`  - ${url}`))
  }
  
  console.log('\nImage cache size:', imageCache.size, 'unique images')
}

// Run migration
migrateAllPosts().then(() => {
  console.log('\nMigration completed!')
  process.exit(0)
}).catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})