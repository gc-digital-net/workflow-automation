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

async function verifyMigration() {
  console.log('Verifying blog migration...\n')
  
  // Fetch all blog posts
  const posts = await sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      "author": author->name,
      "categories": categories[]->name,
      "hasContent": defined(content),
      "hasFeaturedImage": defined(featuredImage),
      "contentLength": length(content)
    }
  `)
  
  console.log(`Total blog posts found: ${posts.length}\n`)
  
  posts.forEach((post: any, index: number) => {
    console.log(`${index + 1}. ${post.title}`)
    console.log(`   - Slug: ${post.slug?.current}`)
    console.log(`   - Published: ${new Date(post.publishedAt).toLocaleDateString()}`)
    console.log(`   - Author: ${post.author || 'N/A'}`)
    console.log(`   - Categories: ${post.categories?.join(', ') || 'N/A'}`)
    console.log(`   - Has Content: ${post.hasContent ? `Yes (${post.contentLength} blocks)` : 'No'}`)
    console.log(`   - Has Featured Image: ${post.hasFeaturedImage ? 'Yes' : 'No'}`)
    console.log('')
  })
  
  // Summary statistics
  const postsWithContent = posts.filter((p: any) => p.hasContent).length
  const postsWithImages = posts.filter((p: any) => p.hasFeaturedImage).length
  
  console.log('='.repeat(60))
  console.log('Summary:')
  console.log(`  Total Posts: ${posts.length}`)
  console.log(`  Posts with Content: ${postsWithContent}`)
  console.log(`  Posts with Featured Images: ${postsWithImages}`)
  console.log('='.repeat(60))
}

verifyMigration().then(() => {
  console.log('\nVerification complete!')
  process.exit(0)
}).catch((error) => {
  console.error('Verification error:', error)
  process.exit(1)
})