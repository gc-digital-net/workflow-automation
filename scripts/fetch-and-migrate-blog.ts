import 'dotenv/config'
import { createClient } from '@sanity/client'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'
import https from 'https'

// Load environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN

if (!projectId) {
  console.error('Error: SANITY_PROJECT_ID is not set in environment variables')
  process.exit(1)
}

if (!token) {
  console.error('Error: SANITY_API_TOKEN is not set in environment variables')
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

interface BlogPost {
  title: string
  slug: string
  content: any[]
  excerpt: string
  featuredImage?: string
  publishedAt: string
  author: string
  categories: string[]
  tags: string[]
}

// Download image and upload to Sanity
async function downloadAndUploadImage(imageUrl: string): Promise<string | null> {
  try {
    console.log(`  Downloading image: ${imageUrl}`)
    
    // Download image
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer'
    })
    
    const buffer = Buffer.from(response.data)
    const filename = path.basename(new URL(imageUrl).pathname) || 'image.jpg'
    
    // Upload to Sanity
    const asset = await sanityClient.assets.upload('image', buffer, {
      filename: filename
    })
    
    console.log(`  ✓ Uploaded image: ${filename}`)
    return asset._id
  } catch (error) {
    console.error(`  Error with image ${imageUrl}:`, error)
    return null
  }
}

// Convert HTML content to Portable Text
async function htmlToPortableText(html: string, baseUrl: string): Promise<any[]> {
  const $ = cheerio.load(html)
  const blocks: any[] = []
  
  // Process each element
  const elements = $('p, h1, h2, h3, h4, h5, h6, ul, ol, blockquote, img, pre')
  
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    const $el = $(el)
    const tagName = el.tagName.toLowerCase()
    
    if (tagName === 'img') {
      // Handle images
      const src = $el.attr('src')
      const alt = $el.attr('alt') || ''
      
      if (src) {
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
      // Handle headings
      const level = parseInt(tagName.charAt(1))
      const style = level === 1 ? 'h1' : level === 2 ? 'h2' : level === 3 ? 'h3' : 'h4'
      
      blocks.push({
        _type: 'block',
        _key: uuidv4(),
        style: style,
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: $el.text().trim(),
            marks: []
          }
        ]
      })
    } else if (tagName === 'ul' || tagName === 'ol') {
      // Handle lists
      const listType = tagName === 'ul' ? 'bullet' : 'number'
      $el.find('li').each((index, li) => {
        blocks.push({
          _type: 'block',
          _key: uuidv4(),
          style: 'normal',
          listItem: listType,
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: uuidv4(),
              text: $(li).text().trim(),
              marks: []
            }
          ]
        })
      })
    } else if (tagName === 'blockquote') {
      // Handle blockquotes
      blocks.push({
        _type: 'block',
        _key: uuidv4(),
        style: 'blockquote',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: $el.text().trim(),
            marks: []
          }
        ]
      })
    } else if (tagName === 'pre') {
      // Handle code blocks
      blocks.push({
        _type: 'code',
        _key: uuidv4(),
        code: $el.text(),
        language: 'javascript'
      })
    } else if (tagName === 'p') {
      // Handle paragraphs with inline formatting
      const text = $el.text().trim()
      if (text) {
        const markDefs: any[] = []
        const children: any[] = []
        
        // Check for links
        $el.find('a').each((index, a) => {
          const href = $(a).attr('href')
          if (href) {
            markDefs.push({
              _type: 'link',
              _key: uuidv4(),
              href: href
            })
          }
        })
        
        // Process text with marks
        const processNode = (node: any): void => {
          if (node.type === 'text') {
            if (node.data && node.data.trim()) {
              const marks: string[] = []
              
              // Check parent elements for formatting
              const parent = $(node).parent()
              if (parent.is('strong') || parent.is('b')) marks.push('strong')
              if (parent.is('em') || parent.is('i')) marks.push('em')
              if (parent.is('code')) marks.push('code')
              
              children.push({
                _type: 'span',
                _key: uuidv4(),
                text: node.data,
                marks: marks
              })
            }
          } else if (node.children) {
            node.children.forEach(processNode)
          }
        }
        
        // Process all child nodes
        $el[0].childNodes.forEach(processNode)
        
        if (children.length > 0) {
          blocks.push({
            _type: 'block',
            _key: uuidv4(),
            style: 'normal',
            markDefs: markDefs,
            children: children.length > 0 ? children : [
              {
                _type: 'span',
                _key: uuidv4(),
                text: text,
                marks: []
              }
            ]
          })
        }
      }
    }
  }
  
  return blocks
}

// Fetch blog post content from URL
async function fetchBlogPostContent(url: string): Promise<BlogPost | null> {
  try {
    console.log(`\nFetching: ${url}`)
    
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    
    // Extract content from the article
    const title = $('h1').first().text().trim() || 
                  $('meta[property="og:title"]').attr('content') || 
                  $('title').text().trim()
    
    const excerpt = $('meta[name="description"]').attr('content') || 
                    $('meta[property="og:description"]').attr('content') || 
                    ''
    
    // Extract main content area
    const contentArea = $('.entry-content, .post-content, .article-content, article, main').first()
    const contentHtml = contentArea.html() || $('body').html() || ''
    
    // Extract featured image
    const featuredImage = $('meta[property="og:image"]').attr('content') || 
                          $('.featured-image img, .post-thumbnail img').first().attr('src')
    
    // Extract date
    const publishedAt = $('meta[property="article:published_time"]').attr('content') || 
                        $('time').first().attr('datetime') || 
                        new Date().toISOString()
    
    // Extract author
    const author = $('meta[name="author"]').attr('content') || 
                   $('.author-name, .by-author').first().text().trim() || 
                   'Workflow Team'
    
    // Extract categories/tags
    const categories: string[] = []
    $('.category, .cat-links a').each((i, el) => {
      const cat = $(el).text().trim()
      if (cat) categories.push(cat)
    })
    
    const tags: string[] = []
    $('.tag, .tags a').each((i, el) => {
      const tag = $(el).text().trim()
      if (tag) tags.push(tag)
    })
    
    // Convert content to Portable Text
    const content = await htmlToPortableText(contentHtml, url)
    
    // Generate slug from URL
    const urlParts = new URL(url)
    const slug = urlParts.pathname.split('/').filter(p => p).pop() || 'untitled'
    
    return {
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      publishedAt,
      author,
      categories: categories.length > 0 ? categories : ['Automation', 'Productivity'],
      tags
    }
  } catch (error) {
    console.error(`Error fetching ${url}:`, error)
    return null
  }
}

// Get or create author
async function getOrCreateAuthor(name: string) {
  const slug = name.toLowerCase().replace(/\s+/g, '-')
  
  const existingAuthor = await sanityClient.fetch(
    `*[_type == "author" && slug.current == $slug][0]`,
    { slug }
  )
  
  if (existingAuthor) {
    return existingAuthor._id
  }
  
  const author = await sanityClient.create({
    _type: 'author',
    name: name,
    slug: {
      _type: 'slug',
      current: slug
    },
    bio: `${name} is a contributor to Workflow Automation.`,
  })
  
  return author._id
}

// Get or create category
async function getOrCreateCategory(categoryName: string) {
  const slug = categoryName.toLowerCase().replace(/\s+/g, '-')
  
  const existingCategory = await sanityClient.fetch(
    `*[_type == "category" && slug.current == $slug][0]`,
    { slug }
  )
  
  if (existingCategory) {
    return existingCategory._id
  }
  
  const category = await sanityClient.create({
    _type: 'category',
    name: categoryName,
    slug: {
      _type: 'slug',
      current: slug
    },
    description: `Articles about ${categoryName.toLowerCase()}`
  })
  
  return category._id
}

// Main migration function
async function migrateAllBlogPosts() {
  console.log('Starting comprehensive blog migration...\n')
  
  const blogUrls = [
    'https://workflowautomation.net/blog/saas-applications',
    'https://workflowautomation.net/blog/workflow-analysis',
    'https://workflowautomation.net/blog/project-kickoff',
    'https://workflowautomation.net/blog/robotic-process-automation',
    'https://workflowautomation.net/blog/knowledge-management-system',
    'https://workflowautomation.net/blog/workload-management'
  ]
  
  let successCount = 0
  let errorCount = 0
  
  for (const url of blogUrls) {
    try {
      // Fetch blog post content
      const postData = await fetchBlogPostContent(url)
      
      if (!postData) {
        console.error(`  ✗ Failed to fetch content from ${url}`)
        errorCount++
        continue
      }
      
      // Check if post already exists
      const existingPost = await sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug][0]`,
        { slug: postData.slug }
      )
      
      if (existingPost) {
        console.log(`  → Post already exists: ${postData.title}`)
        continue
      }
      
      // Get or create author
      const authorId = await getOrCreateAuthor(postData.author)
      
      // Get or create categories
      const categoryIds = await Promise.all(
        postData.categories.map(cat => getOrCreateCategory(cat))
      )
      
      // Upload featured image if exists
      let featuredImageId = null
      if (postData.featuredImage) {
        featuredImageId = await downloadAndUploadImage(postData.featuredImage)
      }
      
      // Create the blog post in Sanity
      const post = {
        _type: 'post',
        title: postData.title,
        slug: {
          _type: 'slug',
          current: postData.slug
        },
        excerpt: postData.excerpt,
        content: postData.content,
        author: {
          _type: 'reference',
          _ref: authorId
        },
        categories: categoryIds.map(id => ({
          _type: 'reference',
          _ref: id
        })),
        tags: postData.tags,
        publishedAt: postData.publishedAt,
        ...(featuredImageId && {
          featuredImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: featuredImageId
            }
          }
        }),
        seo: {
          metaTitle: postData.title,
          metaDescription: postData.excerpt,
          keywords: [...postData.categories, ...postData.tags]
        }
      }
      
      await sanityClient.create(post)
      console.log(`  ✓ Successfully migrated: ${postData.title}`)
      successCount++
      
    } catch (error) {
      console.error(`  ✗ Error migrating ${url}:`, error)
      errorCount++
    }
  }
  
  console.log('\n' + '='.repeat(60))
  console.log(`Migration Summary:`)
  console.log(`  ✓ Successfully migrated: ${successCount} posts`)
  console.log(`  ✗ Failed: ${errorCount} posts`)
  console.log('='.repeat(60))
}

// Run the migration
migrateAllBlogPosts().then(() => {
  console.log('\nMigration completed!')
  process.exit(0)
}).catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})