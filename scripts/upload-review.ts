/**
 * Generic Review Upload Script
 *
 * Usage: npx tsx scripts/upload-review.ts <slug>
 * Example: npx tsx scripts/upload-review.ts zapier
 *
 * Expects markdown file at: content-templates/reviews/<slug>.md
 *
 * This script:
 * 1. Reads the markdown review file
 * 2. Parses it into Sanity Portable Text blocks
 * 3. Converts special patterns (Pro Tip, Caution, etc.) to styled info boxes
 * 4. Extracts Quick Verdict data from the header
 * 5. Adds FAQ block, Pricing table, Pros/Cons block, and CTA
 * 6. Uploads to Sanity CMS
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { nanoid } from 'nanoid'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

const generateKey = () => nanoid(12)

// Extract Quick Verdict data from markdown header
function extractQuickVerdict(markdown: string): any {
  const lines = markdown.split('\n')
  let inVerdictSection = false
  const verdict: any = {}

  for (const line of lines) {
    if (line.includes('Quick Verdict')) {
      inVerdictSection = true
      continue
    }
    if (inVerdictSection && line.startsWith('---')) {
      break
    }
    if (inVerdictSection) {
      const ratingMatch = line.match(/\*\*.*Overall Rating:\s*([^*]+)\*\*/)
      if (ratingMatch) verdict.rating = ratingMatch[1].trim()

      const bestForMatch = line.match(/\*\*Best For:\*\*\s*(.+)/)
      if (bestForMatch) verdict.bestFor = bestForMatch[1].trim()

      const skipIfMatch = line.match(/\*\*Skip If:\*\*\s*(.+)/)
      if (skipIfMatch) verdict.skipIf = skipIfMatch[1].trim()

      const priceMatch = line.match(/\*\*Price:\*\*\s*(.+)/)
      if (priceMatch) verdict.price = priceMatch[1].trim()

      const testingMatch = line.match(/\*\*Testing Period:\*\*\s*(.+)/)
      if (testingMatch) verdict.testingPeriod = testingMatch[1].trim()
    }
  }

  return verdict
}

// Convert markdown to Portable Text blocks
function markdownToPortableText(markdown: string): any[] {
  const blocks: any[] = []
  const lines = markdown.split('\n')
  let i = 0
  let inFAQSection = false
  let skipQuickVerdict = false

  while (i < lines.length) {
    const line = lines[i]
    const trimmedLine = line.trim()

    // Skip empty lines
    if (!trimmedLine) {
      i++
      continue
    }

    // Skip H1 (title)
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      i++
      continue
    }

    // Skip horizontal rules
    if (trimmedLine === '---') {
      i++
      continue
    }

    // Skip markdown tables
    if (trimmedLine.startsWith('|')) {
      i++
      continue
    }

    // H2 headers
    if (line.startsWith('## ')) {
      let text = line.replace(/^## /, '').trim()
      text = text.replace(/^\*\*/, '').replace(/\*\*$/, '')

      // Skip Quick Verdict section content (we handle it separately)
      if (text.toLowerCase().includes('quick verdict')) {
        skipQuickVerdict = true
        i++
        continue
      }

      // End Quick Verdict skip on next H2
      if (skipQuickVerdict && !text.toLowerCase().includes('quick verdict')) {
        skipQuickVerdict = false
      }

      // FAQ section - skip content, use faqBlock
      if (text.toLowerCase().includes('frequently asked')) {
        inFAQSection = true
        blocks.push({
          _key: generateKey(),
          _type: 'block',
          style: 'h2',
          children: [{ _key: generateKey(), _type: 'span', text }]
        })
        i++
        continue
      }

      inFAQSection = false
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h2',
        children: [{ _key: generateKey(), _type: 'span', text }]
      })
      i++
      continue
    }

    // Skip Quick Verdict section content
    if (skipQuickVerdict) {
      i++
      continue
    }

    // Skip FAQ section content (replaced by faqBlock)
    if (inFAQSection) {
      i++
      continue
    }

    // Visual/Screenshot placeholders -> infoBox
    if (trimmedLine.startsWith('[VISUAL:') || trimmedLine.startsWith('[SCREENSHOT:')) {
      const match = trimmedLine.match(/\[(VISUAL|SCREENSHOT):\s*([^\]]+)\]/)
      if (match) {
        const type = match[1]
        const description = match[2].trim()
        blocks.push({
          _key: generateKey(),
          _type: 'infoBox',
          type: 'highlight',
          title: type === 'SCREENSHOT' ? '📸 Screenshot' : '🎨 Visual',
          content: [{
            _key: generateKey(),
            _type: 'block',
            style: 'normal',
            children: [{ _key: generateKey(), _type: 'span', text: description }]
          }]
        })
      }
      i++
      continue
    }

    // H3 headers
    if (line.startsWith('### ')) {
      let text = line.replace(/^### /, '').trim()
      text = text.replace(/^\*\*/, '').replace(/\*\*$/, '')
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h3',
        children: [{ _key: generateKey(), _type: 'span', text }]
      })
      i++
      continue
    }

    // H4 headers
    if (line.startsWith('#### ')) {
      let text = line.replace(/^#### /, '').trim()
      text = text.replace(/^\*\*/, '').replace(/\*\*$/, '')
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h4',
        children: [{ _key: generateKey(), _type: 'span', text }]
      })
      i++
      continue
    }

    // Blockquotes
    if (trimmedLine.startsWith('>')) {
      let quoteText = trimmedLine.replace(/^>\s*/, '')
      i++
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteText += ' ' + lines[i].trim().replace(/^>\s*/, '')
        i++
      }
      if (quoteText.trim()) {
        blocks.push({
          _key: generateKey(),
          _type: 'block',
          style: 'blockquote',
          children: [{ _key: generateKey(), _type: 'span', text: quoteText.trim() }]
        })
      }
      continue
    }

    // Bullet lists
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      while (i < lines.length) {
        const currentLine = lines[i].trim()
        if (!currentLine.startsWith('- ') && !currentLine.startsWith('* ')) break

        let itemText = currentLine.replace(/^[-*]\s+/, '')
        itemText = itemText
          .replace(/\*\*([^*]+)\*\*/g, '$1')
          .replace(/\*([^*]+)\*/g, '$1')
          .replace(/`([^`]+)`/g, '$1')

        blocks.push({
          _key: generateKey(),
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          level: 1,
          children: [{ _key: generateKey(), _type: 'span', text: itemText }]
        })
        i++
      }
      continue
    }

    // Numbered lists
    if (/^\d+\.\s/.test(trimmedLine)) {
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        let itemText = lines[i].trim().replace(/^\d+\.\s+/, '')
        itemText = itemText
          .replace(/\*\*([^*]+)\*\*/g, '$1')
          .replace(/\*([^*]+)\*/g, '$1')
          .replace(/`([^`]+)`/g, '$1')

        blocks.push({
          _key: generateKey(),
          _type: 'block',
          style: 'normal',
          listItem: 'number',
          level: 1,
          children: [{ _key: generateKey(), _type: 'span', text: itemText }]
        })
        i++
      }
      continue
    }

    // Regular paragraphs
    let paragraphLines: string[] = [trimmedLine]
    i++

    while (i < lines.length) {
      const nextLine = lines[i]
      const nextTrimmed = nextLine.trim()

      if (!nextTrimmed ||
          nextLine.startsWith('#') ||
          nextTrimmed.startsWith('- ') ||
          nextTrimmed.startsWith('* ') ||
          /^\d+\.\s/.test(nextTrimmed) ||
          nextTrimmed.startsWith('>') ||
          nextTrimmed.startsWith('|') ||
          nextTrimmed.startsWith('[VISUAL:') ||
          nextTrimmed.startsWith('[SCREENSHOT:') ||
          nextTrimmed === '---') {
        break
      }

      paragraphLines.push(nextTrimmed)
      i++
    }

    let paragraphText = paragraphLines.join(' ')
    paragraphText = paragraphText
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim()

    if (paragraphText) {
      // Check for special callout patterns
      const calloutPatterns = [
        { pattern: /^Pro Tip:\s*/i, type: 'tip', title: 'Pro Tip' },
        { pattern: /^Caution:\s*/i, type: 'warning', title: 'Caution' },
        { pattern: /^Warning:\s*/i, type: 'warning', title: 'Warning' },
        { pattern: /^Hidden Costs:\s*/i, type: 'warning', title: 'Hidden Costs' },
        { pattern: /^Reality Check:\s*/i, type: 'info', title: 'Reality Check' },
        { pattern: /^Note:\s*/i, type: 'note', title: 'Note' },
        { pattern: /^Best For:\s*/i, type: 'success', title: 'Best For' },
        { pattern: /^What's Included:\s*/i, type: 'info', title: 'What\'s Included' },
        { pattern: /^Key Limitations:\s*/i, type: 'warning', title: 'Key Limitations' },
        { pattern: /^Major Upgrades.*:\s*/i, type: 'success', title: 'Major Upgrades' },
        { pattern: /^Major Additions:\s*/i, type: 'success', title: 'Major Additions' },
        { pattern: /^Enterprise Exclusives:\s*/i, type: 'highlight', title: 'Enterprise Exclusives' },
        { pattern: /^Security & Compliance:\s*/i, type: 'info', title: 'Security & Compliance' },
      ]

      let isCallout = false
      for (const { pattern, type, title } of calloutPatterns) {
        if (pattern.test(paragraphText)) {
          const content = paragraphText.replace(pattern, '').trim()
          blocks.push({
            _key: generateKey(),
            _type: 'infoBox',
            type,
            title,
            content: [{
              _key: generateKey(),
              _type: 'block',
              style: 'normal',
              children: [{ _key: generateKey(), _type: 'span', text: content }]
            }]
          })
          isCallout = true
          break
        }
      }

      if (!isCallout) {
        blocks.push({
          _key: generateKey(),
          _type: 'block',
          style: 'normal',
          children: [{ _key: generateKey(), _type: 'span', text: paragraphText }]
        })
      }
    }
  }

  return blocks
}

// Review data interface
interface ReviewData {
  name: string
  slug: string
  tagline: string
  excerpt: string
  overallScore: number
  scores: {
    easeOfUse: number
    features: number
    value: number
    support: number
    integrations: number
  }
  quickInfo: {
    startingPrice: string
    freeTrial: string
    bestFor: string
    integrations: string
  }
  companyInfo: {
    founded: string
    headquarters: string
    companySize: string
    funding: string
  }
  supportInfo: {
    liveChat: boolean
    emailSupport: boolean
    knowledgeBase: boolean
    videoTutorials: boolean
    supportDetails: string
  }
  securityInfo: {
    soc2: boolean
    gdpr: boolean
    ssl: boolean
    uptime: string
    otherCertifications: string[]
  }
  popularIntegrations: string[]
  affiliateLink: string
  pros: string[]
  cons: string[]
  pricing: Array<{
    name: string
    price: string
    features: string[]
    highlighted?: boolean
  }>
  faqItems: Array<{
    question: string
    answer: string
  }>
}

async function uploadReview(slug: string, reviewData: ReviewData) {
  console.log(`\nUploading review for ${reviewData.name}...\n`)

  // Read markdown file
  const reviewPath = path.join(__dirname, `../content-templates/reviews/${slug}.md`)
  if (!fs.existsSync(reviewPath)) {
    throw new Error(`Markdown file not found: ${reviewPath}`)
  }

  const markdown = fs.readFileSync(reviewPath, 'utf-8')
  console.log(`Markdown file: ${markdown.length} characters, ${markdown.split('\n').length} lines`)

  // Extract quick verdict from markdown
  const quickVerdict = extractQuickVerdict(markdown)

  // Convert markdown to Portable Text
  console.log('Converting markdown to Portable Text...')
  const contentBlocks = markdownToPortableText(markdown)
  console.log(`Generated ${contentBlocks.length} content blocks`)

  // Create special blocks
  const quickVerdictBlock = {
    _key: generateKey(),
    _type: 'quickVerdictBox',
    rating: quickVerdict.rating || `${reviewData.overallScore}/10`,
    bestFor: quickVerdict.bestFor || reviewData.quickInfo.bestFor,
    skipIf: quickVerdict.skipIf || '',
    price: quickVerdict.price || `Free plan available; Paid from ${reviewData.quickInfo.startingPrice}`,
    testingPeriod: quickVerdict.testingPeriod || ''
  }

  const prosConsBlock = {
    _key: generateKey(),
    _type: 'prosConsBlock',
    pros: reviewData.pros,
    cons: reviewData.cons
  }

  const pricingBlock = {
    _key: generateKey(),
    _type: 'pricingTable',
    title: `${reviewData.name} Pricing Plans`,
    plans: reviewData.pricing.map(p => ({
      _key: generateKey(),
      ...p
    }))
  }

  const faqBlock = {
    _key: generateKey(),
    _type: 'faqBlock',
    title: 'Frequently Asked Questions',
    items: reviewData.faqItems.map(item => ({
      _key: generateKey(),
      question: item.question,
      answer: item.answer
    }))
  }

  const ctaBlock = {
    _key: generateKey(),
    _type: 'ctaBlock',
    title: `Ready to try ${reviewData.name}?`,
    description: `Start with the free plan and see if ${reviewData.name} is right for your workflow.`,
    buttonText: `Get Started with ${reviewData.name}`,
    buttonUrl: reviewData.affiliateLink
  }

  // Build final content with blocks inserted at correct positions
  const finalContent: any[] = []

  // Add Quick Verdict at the very beginning
  finalContent.push(quickVerdictBlock)

  for (let j = 0; j < contentBlocks.length; j++) {
    const block = contentBlocks[j]
    finalContent.push(block)

    // After "The Good" section header, insert pros/cons
    if (block.style === 'h2' && block.children?.[0]?.text?.toLowerCase().includes('the good')) {
      if (j + 1 < contentBlocks.length && contentBlocks[j + 1].style === 'normal') {
        finalContent.push(contentBlocks[j + 1])
        j++
      }
      finalContent.push(prosConsBlock)
    }

    // After pricing section header + intro, insert pricing table
    if (block.style === 'h2' && block.children?.[0]?.text?.toLowerCase().includes('pricing')) {
      if (j + 1 < contentBlocks.length && contentBlocks[j + 1].style === 'normal') {
        finalContent.push(contentBlocks[j + 1])
        j++
      }
      finalContent.push(pricingBlock)
    }

    // After FAQ section header, insert faqBlock
    if (block.style === 'h2' && block.children?.[0]?.text?.toLowerCase().includes('frequently asked')) {
      finalContent.push(faqBlock)
    }
  }

  // Add CTA at the end
  finalContent.push(ctaBlock)

  console.log(`Final content: ${finalContent.length} blocks`)

  // Build the document
  const review = {
    _type: 'software',
    name: reviewData.name,
    slug: { current: reviewData.slug },
    tagline: reviewData.tagline,
    excerpt: reviewData.excerpt,
    overallScore: reviewData.overallScore,
    scores: reviewData.scores,
    content: finalContent,
    quickInfo: reviewData.quickInfo,
    companyInfo: reviewData.companyInfo,
    supportInfo: reviewData.supportInfo,
    securityInfo: reviewData.securityInfo,
    popularIntegrations: reviewData.popularIntegrations,
    pros: reviewData.pros,
    cons: reviewData.cons,
    pricing: reviewData.pricing,
    affiliateLink: reviewData.affiliateLink,
    lastUpdated: new Date().toISOString(),
    seo: {
      metaTitle: `${reviewData.name} Review 2025 - Features, Pricing & Alternatives | Workflow Automation`,
      metaDescription: `Comprehensive ${reviewData.name} review. ${reviewData.tagline}. Compare features, pricing, pros, cons, and alternatives.`
    }
  }

  // Check for existing document
  const existing = await client.fetch(`*[_type == "software" && slug.current == $slug][0]`, { slug: reviewData.slug })

  let result
  if (existing) {
    console.log(`Updating existing review (${existing._id})...`)
    // Use patch to update - this preserves the document ID and references
    result = await client.patch(existing._id).set(review).commit()
  } else {
    console.log('Creating new review...')
    result = await client.create(review)
  }

  console.log(`\n✅ Successfully created ${reviewData.name} review!`)
  console.log(`Document ID: ${result._id}`)
  console.log(`Content blocks: ${finalContent.length}`)
  console.log(`View at: http://localhost:3000/reviews/${reviewData.slug}`)

  return result
}

// Export for use by individual review scripts
export { uploadReview, ReviewData }
