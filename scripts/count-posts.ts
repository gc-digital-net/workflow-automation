import 'dotenv/config'
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const sanityClient = createClient({
  projectId: projectId!,
  dataset: dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function countPosts() {
  // Get all posts
  const allPosts = await sanityClient.fetch(`count(*[_type == "post"])`)
  
  // Get unique posts by slug
  const posts = await sanityClient.fetch(`
    *[_type == "post"] {
      slug
    }
  `)
  
  const uniqueSlugs = new Set(posts.map((p: any) => p.slug?.current).filter(Boolean))
  
  console.log('\n📊 BLOG POST COUNT')
  console.log('='.repeat(40))
  console.log(`Total posts in database: ${allPosts}`)
  console.log(`Unique posts (by slug): ${uniqueSlugs.size}`)
  
  if (allPosts > uniqueSlugs.size) {
    console.log(`\n⚠️  Found ${allPosts - uniqueSlugs.size} duplicate posts`)
  }
}

countPosts().then(() => {
  process.exit(0)
}).catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})