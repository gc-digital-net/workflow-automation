/**
 * Fetch square logos from Brandfetch and upload to Sanity for all software reviews
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const BRANDFETCH_KEY = 'wxh6yUlpSYQ-3zQeU9-kDOA4n1Gq0pDClkjHeXba2S1Z1H6_Y1DHFhfRskx-Bzu-5_z8c8-zQPcG1a03gIFl9w'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

// Map slug to domain for Brandfetch lookup
const softwareDomains: Record<string, string> = {
  // Project Management
  'clickup': 'clickup.com',
  'asana': 'asana.com',
  'monday-com': 'monday.com',
  'jira': 'atlassian.com',
  'trello': 'trello.com',
  'basecamp': 'basecamp.com',
  'notion': 'notion.so',
  'linear': 'linear.app',
  'wrike': 'wrike.com',
  'smartsheet': 'smartsheet.com',
  'teamwork': 'teamwork.com',
  'airtable': 'airtable.com',
  'todoist': 'todoist.com',
  'coda': 'coda.io',
  // Workflow Automation
  'zapier': 'zapier.com',
  'make': 'make.com',
  'n8n': 'n8n.io',
  'ifttt': 'ifttt.com',
  'power-automate': 'microsoft.com',
  'pipedream': 'pipedream.com',
  'pabbly-connect': 'pabbly.com',
  'bardeen': 'bardeen.ai',
  'activepieces': 'activepieces.com',
  'workato': 'workato.com',
  'tray-io': 'tray.io',
  'albato': 'albato.com',
  'integrately': 'integrately.com',
  'latenode': 'latenode.com',
  'relay-app': 'relay.app',
  // CRM & Sales
  'hubspot-crm': 'hubspot.com',
  'salesforce': 'salesforce.com',
  'pipedrive': 'pipedrive.com',
  'zoho-crm': 'zoho.com',
  'close': 'close.com',
  'freshsales': 'freshworks.com',
  'copper': 'copper.com',
  'attio': 'attio.com',
  'folk': 'folk.app',
  'apollo': 'apollo.io',
  'lemlist': 'lemlist.com',
  'instantly': 'instantly.ai',
  'reply-io': 'reply.io',
  'outreach': 'outreach.io',
  'salesloft': 'salesloft.com',
  // No-Code / Low-Code
  'bubble': 'bubble.io',
  'webflow': 'webflow.com',
  'glide': 'glideapps.com',
  'appgyver': 'sap.com',
  'adalo': 'adalo.com',
  'softr': 'softr.io',
  'retool': 'retool.com',
  'appsheet': 'appsheet.com',
  'outsystems': 'outsystems.com',
  'mendix': 'mendix.com',
  'betty-blocks': 'bettyblocks.com',
  'pory': 'pory.io',
  'stacker': 'stackerhq.com',
  'noloco': 'noloco.io',
  'draftbit': 'draftbit.com',
  'ui-bakery': 'uibakery.io',
  'budibase': 'budibase.com',
  'appsmith': 'appsmith.com',
  'tooljet': 'tooljet.com',
}

async function fetchBrandIcon(domain: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
      headers: { 'Authorization': `Bearer ${BRANDFETCH_KEY}` }
    })
    if (!res.ok) {
      console.error(`  Brandfetch error for ${domain}: ${res.status}`)
      return null
    }
    const data = await res.json()

    // Prefer icon type (square), fall back to logo
    const icon = data.logos?.find((l: any) => l.type === 'icon')
    if (icon?.formats?.length) {
      // Prefer PNG, fall back to JPEG, then SVG
      const png = icon.formats.find((f: any) => f.format === 'png')
      const jpeg = icon.formats.find((f: any) => f.format === 'jpeg')
      const svg = icon.formats.find((f: any) => f.format === 'svg')
      return png?.src || jpeg?.src || svg?.src || null
    }

    // Fall back to logo (usually wider, not square)
    const logo = data.logos?.find((l: any) => l.type === 'logo')
    if (logo?.formats?.length) {
      const png = logo.formats.find((f: any) => f.format === 'png')
      const svg = logo.formats.find((f: any) => f.format === 'svg')
      return png?.src || svg?.src || null
    }

    return null
  } catch (err: any) {
    console.error(`  Fetch error for ${domain}: ${err.message}`)
    return null
  }
}

async function uploadImageToSanity(imageUrl: string, filename: string): Promise<any> {
  const res = await fetch(imageUrl)
  if (!res.ok) throw new Error(`Failed to download image: ${res.status}`)

  const buffer = Buffer.from(await res.arrayBuffer())
  const contentType = res.headers.get('content-type') || 'image/png'

  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType,
  })

  return asset
}

async function main() {
  // Get all software reviews from Sanity
  const reviews = await client.fetch(
    `*[_type == "software"]{ _id, name, "slug": slug.current, "hasLogo": defined(logo) }`
  )

  console.log(`Found ${reviews.length} reviews in Sanity\n`)

  let success = 0
  let skipped = 0
  let failed = 0

  for (const review of reviews) {
    const domain = softwareDomains[review.slug]
    if (!domain) {
      console.log(`${review.name}: No domain mapping for slug "${review.slug}" - skipping`)
      skipped++
      continue
    }

    if (review.hasLogo) {
      console.log(`${review.name}: Already has logo - skipping`)
      skipped++
      continue
    }

    console.log(`${review.name}: Fetching icon from ${domain}...`)

    const iconUrl = await fetchBrandIcon(domain)
    if (!iconUrl) {
      console.log(`  No icon found - skipping`)
      failed++
      continue
    }

    try {
      console.log(`  Uploading to Sanity...`)
      const asset = await uploadImageToSanity(iconUrl, `${review.slug}-logo`)

      await client.patch(review._id).set({
        logo: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          }
        }
      }).commit()

      console.log(`  ✅ Logo uploaded and assigned`)
      success++
    } catch (err: any) {
      console.error(`  ❌ Upload failed: ${err.message}`)
      failed++
    }

    // Rate limit: Brandfetch free tier is 10 req/min
    await new Promise(r => setTimeout(r, 6500))
  }

  console.log(`\nDone! ${success} uploaded, ${skipped} skipped, ${failed} failed`)
}

main().catch(console.error)
