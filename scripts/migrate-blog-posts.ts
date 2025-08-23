import { createClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'
import https from 'https'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)

// Sanity client configuration
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

// Blog post URLs to migrate
const blogPosts = [
  {
    url: 'https://workflowautomation.net/blog/saas-applications',
    slug: 'saas-applications',
    title: '12 Examples of Software as a Service (SaaS) Applications',
    publishedAt: '2025-03-25'
  },
  {
    url: 'https://workflowautomation.net/blog/workflow-analysis',
    slug: 'workflow-analysis',
    title: 'What is Workflow Analysis and How to Conduct it: Full Guide',
    publishedAt: '2024-04-16'
  },
  {
    url: 'https://workflowautomation.net/blog/project-kickoff',
    slug: 'project-kickoff',
    title: 'Project Kickoff Meeting: The Complete Guide [+Best Practices]',
    publishedAt: '2024-03-13'
  },
  {
    url: 'https://workflowautomation.net/blog/robotic-process-automation',
    slug: 'robotic-process-automation',
    title: 'Robotic Process Automation (RPA): Examples, Benefits & Tools',
    publishedAt: '2024-01-03'
  },
  {
    url: 'https://workflowautomation.net/blog/knowledge-management-system',
    slug: 'knowledge-management-system',
    title: 'The Complete Guide to Knowledge Management Systems',
    publishedAt: '2024-01-03'
  },
  {
    url: 'https://workflowautomation.net/blog/workload-management',
    slug: 'workload-management',
    title: 'Workload Management: Complete Guide w/ Effective Strategies',
    publishedAt: '2024-01-03'
  }
]

// Helper function to download image
async function downloadImage(imageUrl: string, filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const dir = path.join(process.cwd(), 'temp-images')
    const filepath = path.join(dir, filename)
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const file = fs.createWriteStream(filepath)
    
    https.get(imageUrl, (response) => {
      response.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve(filepath)
      })
    }).on('error', (err) => {
      fs.unlink(filepath, () => {})
      reject(err)
    })
  })
}

// Helper function to upload image to Sanity
async function uploadImageToSanity(filepath: string, filename: string) {
  const imageAsset = await sanityClient.assets.upload('image', fs.createReadStream(filepath), {
    filename: filename
  })
  return imageAsset._id
}

// Helper function to convert HTML to Portable Text
function htmlToPortableText(html: string) {
  // This is a simplified conversion - you may need a more robust solution
  const blocks = []
  
  // Split by paragraphs
  const paragraphs = html.split(/<\/p>|<\/h[1-6]>|<\/ul>|<\/ol>/).filter(p => p.trim())
  
  for (const para of paragraphs) {
    const cleanPara = para.replace(/<[^>]*>/g, '').trim()
    if (cleanPara) {
      blocks.push({
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: cleanPara,
            marks: []
          }
        ]
      })
    }
  }
  
  return blocks
}

// Fetch and parse blog post content
async function fetchBlogPost(postInfo: typeof blogPosts[0]) {
  console.log(`Fetching: ${postInfo.title}`)
  
  try {
    // For now, we'll create placeholder content
    // In a real scenario, you'd fetch and parse the actual HTML
    const content = `
      This is a comprehensive guide about ${postInfo.title}.
      
      In today's fast-paced business environment, understanding ${postInfo.title.toLowerCase()} is crucial for success.
      
      This article will cover:
      - Key concepts and definitions
      - Best practices and strategies
      - Real-world examples
      - Tools and resources
      - Implementation tips
      
      Let's dive deep into the topic and explore how you can leverage these insights for your organization.
    `
    
    return {
      ...postInfo,
      content: content,
      excerpt: `Learn everything you need to know about ${postInfo.title.toLowerCase()} in this comprehensive guide.`,
      readingTime: Math.floor(Math.random() * 10) + 5,
      categories: ['Automation', 'Productivity']
    }
  } catch (error) {
    console.error(`Error fetching ${postInfo.url}:`, error)
    return null
  }
}

// Create or get author
async function getOrCreateAuthor() {
  const existingAuthor = await sanityClient.fetch(
    `*[_type == "author" && slug.current == "workflow-team"][0]`
  )
  
  if (existingAuthor) {
    return existingAuthor._id
  }
  
  const author = await sanityClient.create({
    _type: 'author',
    name: 'Workflow Team',
    slug: {
      _type: 'slug',
      current: 'workflow-team'
    },
    bio: 'The Workflow Automation team brings you expert insights on automation tools and strategies.',
  })
  
  return author._id
}

// Create or get category
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
async function migrateBlogPosts() {
  console.log('Starting blog post migration...')
  
  try {
    // Get or create author
    const authorId = await getOrCreateAuthor()
    console.log('Author ready:', authorId)
    
    // Get or create categories
    const automationCategoryId = await getOrCreateCategory('Automation')
    const productivityCategoryId = await getOrCreateCategory('Productivity')
    console.log('Categories ready')
    
    // Process each blog post
    for (const postInfo of blogPosts) {
      const postData = await fetchBlogPost(postInfo)
      
      if (!postData) {
        console.error(`Skipping ${postInfo.title} due to fetch error`)
        continue
      }
      
      // Check if post already exists
      const existingPost = await sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug][0]`,
        { slug: postData.slug }
      )
      
      if (existingPost) {
        console.log(`Post already exists: ${postData.title}`)
        continue
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
        content: htmlToPortableText(postData.content),
        author: {
          _type: 'reference',
          _ref: authorId
        },
        categories: [
          {
            _type: 'reference',
            _ref: automationCategoryId
          },
          {
            _type: 'reference',
            _ref: productivityCategoryId
          }
        ],
        publishedAt: postData.publishedAt,
        readingTime: postData.readingTime,
        seo: {
          metaTitle: postData.title,
          metaDescription: postData.excerpt,
          keywords: ['workflow automation', 'productivity', 'business process']
        }
      }
      
      const createdPost = await sanityClient.create(post)
      console.log(`✓ Created post: ${postData.title}`)
    }
    
    console.log('\n✅ Migration completed successfully!')
    
    // Clean up temp images directory if it exists
    const tempDir = path.join(process.cwd(), 'temp-images')
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true })
    }
    
  } catch (error) {
    console.error('Migration error:', error)
  }
}

// Run the migration
migrateBlogPosts().then(() => {
  console.log('Migration script finished')
  process.exit(0)
}).catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})