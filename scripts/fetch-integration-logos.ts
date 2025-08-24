import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import fetch from 'node-fetch'
import fs from 'fs/promises'
import path from 'path'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

// Popular integrations and their logo sources
const integrationLogos: Record<string, string> = {
  // Direct CDN URLs for popular services
  'Slack': 'https://cdn.brandfetch.io/idIaLn9OSi/w/512/h/512/theme/dark/icon.png',
  'Google Drive': 'https://cdn.brandfetch.io/idDWfW3eF3/w/512/h/512/theme/dark/icon.png',
  'Zoom': 'https://cdn.brandfetch.io/idZYipwWFW/w/512/h/512/theme/dark/icon.png',
  'GitHub': 'https://cdn.brandfetch.io/idZKOY-c-8/w/512/h/512/theme/dark/icon.png',
  'Figma': 'https://cdn.brandfetch.io/idY7SfcOms/w/512/h/512/theme/dark/icon.png',
  'Zapier': 'https://images.ctfassets.net/lzny33ho1g45/6zCexdXBAhNlVbTb1MWiyz/6bc893db08e7d9e0a825bc4e6e7c3e05/Zapier_logo.png',
  'Microsoft Teams': 'https://cdn.brandfetch.io/idSUrLOWbH/w/512/h/512/theme/dark/icon.png',
  'Salesforce': 'https://cdn.brandfetch.io/idJFcTqPFz/w/512/h/512/theme/dark/icon.png',
  'HubSpot': 'https://cdn.brandfetch.io/id-qg8xHwI/w/512/h/512/theme/dark/icon.png',
  'Jira': 'https://cdn.brandfetch.io/idwgSvRvpb/w/512/h/512/theme/dark/icon.png',
  'Trello': 'https://cdn.brandfetch.io/idLKv0S_JC/w/512/h/512/theme/dark/icon.png',
  'Asana': 'https://cdn.brandfetch.io/idQ0_6l-pT/w/512/h/512/theme/dark/icon.png',
  'Monday.com': 'https://cdn.brandfetch.io/idneD7KUZ5/w/512/h/512/theme/dark/icon.png',
  'Notion': 'https://cdn.brandfetch.io/idjqQR0Wlu/w/512/h/512/theme/dark/icon.png',
  'Airtable': 'https://cdn.brandfetch.io/idR7PEwY8n/w/512/h/512/theme/dark/icon.png',
  'Discord': 'https://cdn.brandfetch.io/idAP0Y1Jny/w/512/h/512/theme/dark/icon.png',
  'Dropbox': 'https://cdn.brandfetch.io/id9HiFMYqS/w/512/h/512/theme/dark/icon.png',
  'Gmail': 'https://cdn.brandfetch.io/idfgYfd0Is/w/512/h/512/theme/dark/icon.png',
  'Google Calendar': 'https://cdn.brandfetch.io/idj0mZcG0o/w/512/h/512/theme/dark/icon.png',
  'Google Sheets': 'https://cdn.brandfetch.io/id4q7L4O9v/w/512/h/512/theme/dark/icon.png',
  'LinkedIn': 'https://cdn.brandfetch.io/idP0BNglxV/w/512/h/512/theme/dark/icon.png',
  'Twitter': 'https://cdn.brandfetch.io/id3lV4p6zO/w/512/h/512/theme/dark/icon.png',
  'Facebook': 'https://cdn.brandfetch.io/idQ5-cGfTH/w/512/h/512/theme/dark/icon.png',
  'Instagram': 'https://cdn.brandfetch.io/id_Gvs3Bcy/w/512/h/512/theme/dark/icon.png',
  'YouTube': 'https://cdn.brandfetch.io/idE8uZRe5Y/w/512/h/512/theme/dark/icon.png',
  'Stripe': 'https://cdn.brandfetch.io/idScDQfVPG/w/512/h/512/theme/dark/icon.png',
  'PayPal': 'https://cdn.brandfetch.io/id1fOHgTVb/w/512/h/512/theme/dark/icon.png',
  'Shopify': 'https://cdn.brandfetch.io/idpPqCOEem/w/512/h/512/theme/dark/icon.png',
  'WordPress': 'https://cdn.brandfetch.io/id2cWL8gUu/w/512/h/512/theme/dark/icon.png',
  'Mailchimp': 'https://cdn.brandfetch.io/idBKP_YxBr/w/512/h/512/theme/dark/icon.png',
  'Intercom': 'https://cdn.brandfetch.io/id9H7jsTqV/w/512/h/512/theme/dark/icon.png',
  'Zendesk': 'https://cdn.brandfetch.io/idpPYKOST-/w/512/h/512/theme/dark/icon.png',
  'Twilio': 'https://cdn.brandfetch.io/idGMPmb1Dq/w/512/h/512/theme/dark/icon.png',
  'SendGrid': 'https://cdn.brandfetch.io/idWu5XrB1V/w/512/h/512/theme/dark/icon.png',
  'Segment': 'https://cdn.brandfetch.io/id2tZBOKxZ/w/512/h/512/theme/dark/icon.png',
  'Mixpanel': 'https://cdn.brandfetch.io/idYJWF-qwl/w/512/h/512/theme/dark/icon.png',
  'Amplitude': 'https://cdn.brandfetch.io/idUSgHw24e/w/512/h/512/theme/dark/icon.png',
  'Datadog': 'https://cdn.brandfetch.io/idvfm4nwSJ/w/512/h/512/theme/dark/icon.png',
  'PagerDuty': 'https://cdn.brandfetch.io/idP4uJ4vWi/w/512/h/512/theme/dark/icon.png',
  'AWS': 'https://cdn.brandfetch.io/idOSVOJNaM/w/512/h/512/theme/dark/icon.png',
  'Google Cloud': 'https://cdn.brandfetch.io/idVXJ9z-H5/w/512/h/512/theme/dark/icon.png',
  'Azure': 'https://cdn.brandfetch.io/idZ-nj3DCi/w/512/h/512/theme/dark/icon.png',
  'Docker': 'https://cdn.brandfetch.io/idKvmcJCez/w/512/h/512/theme/dark/icon.png',
  'Kubernetes': 'https://cdn.brandfetch.io/id7x8sdZ8M/w/512/h/512/theme/dark/icon.png',
  'GitLab': 'https://cdn.brandfetch.io/idPBg7IG5I/w/512/h/512/theme/dark/icon.png',
  'Bitbucket': 'https://cdn.brandfetch.io/idvPWJB87z/w/512/h/512/theme/dark/icon.png',
  'Confluence': 'https://cdn.brandfetch.io/idchmT2bu7/w/512/h/512/theme/dark/icon.png',
  'Linear': 'https://cdn.brandfetch.io/id2_b2W2dO/w/512/h/512/theme/dark/icon.png',
  'Basecamp': 'https://cdn.brandfetch.io/idF_p0TBOS/w/512/h/512/theme/dark/icon.png',
  'ClickUp': 'https://cdn.brandfetch.io/idneD7_JCR/w/512/h/512/theme/dark/icon.png',
  'Todoist': 'https://cdn.brandfetch.io/id1jHf-GhJ/w/512/h/512/theme/dark/icon.png',
  'Evernote': 'https://cdn.brandfetch.io/idYZgBQ41u/w/512/h/512/theme/dark/icon.png',
  'OneNote': 'https://cdn.brandfetch.io/idvLvT7kJM/w/512/h/512/theme/dark/icon.png',
  'Miro': 'https://cdn.brandfetch.io/idaP0TJIrQ/w/512/h/512/theme/dark/icon.png',
  'Canva': 'https://cdn.brandfetch.io/idFw8DjaMC/w/512/h/512/theme/dark/icon.png',
  'Adobe Creative Cloud': 'https://cdn.brandfetch.io/idjKjvOD50/w/512/h/512/theme/dark/icon.png',
  'Sketch': 'https://cdn.brandfetch.io/id0dTjvmBx/w/512/h/512/theme/dark/icon.png',
  'InVision': 'https://cdn.brandfetch.io/idmtP1O0SA/w/512/h/512/theme/dark/icon.png',
  'Webflow': 'https://cdn.brandfetch.io/id5DqjiKJa/w/512/h/512/theme/dark/icon.png',
  'Bubble': 'https://cdn.brandfetch.io/idCeQBm7SG/w/512/h/512/theme/dark/icon.png',
  'Make': 'https://cdn.brandfetch.io/id7DdPK94M/w/512/h/512/theme/dark/icon.png',
  'n8n': 'https://docs.n8n.io/img/n8n-logo.png',
  'Pipedream': 'https://pipedream.com/s.v0/app_1xohRm/logo/orig',
  'IFTTT': 'https://cdn.brandfetch.io/id-RzN6uWa/w/512/h/512/theme/dark/icon.png',
  'Calendly': 'https://cdn.brandfetch.io/idP5xBg2HT/w/512/h/512/theme/dark/icon.png',
  'Typeform': 'https://cdn.brandfetch.io/idu-eCulF6/w/512/h/512/theme/dark/icon.png',
  'Google Forms': 'https://cdn.brandfetch.io/idj0mZcG0o/w/512/h/512/theme/dark/icon.png',
  'SurveyMonkey': 'https://cdn.brandfetch.io/id4S0Uex8j/w/512/h/512/theme/dark/icon.png',
  'Loom': 'https://cdn.brandfetch.io/idoUvCViKN/w/512/h/512/theme/dark/icon.png',
  'Vidyard': 'https://cdn.brandfetch.io/idnW2s8fHF/w/512/h/512/theme/dark/icon.png',
  'Wistia': 'https://cdn.brandfetch.io/idvyYPKHQ2/w/512/h/512/theme/dark/icon.png',
  'Vimeo': 'https://cdn.brandfetch.io/idTFtPs6gQ/w/512/h/512/theme/dark/icon.png',
  'Box': 'https://cdn.brandfetch.io/idZQyZZz0O/w/512/h/512/theme/dark/icon.png',
  'OneDrive': 'https://cdn.brandfetch.io/idERdtzWb2/w/512/h/512/theme/dark/icon.png',
  'Lucidchart': 'https://cdn.brandfetch.io/idPaHQfz74/w/512/h/512/theme/dark/icon.png',
  'Draw.io': 'https://cdn.brandfetch.io/id8z6QbNTa/w/512/h/512/theme/dark/icon.png',
  'Smartsheet': 'https://cdn.brandfetch.io/id1pCxPzV_/w/512/h/512/theme/dark/icon.png',
  'Wrike': 'https://cdn.brandfetch.io/idxSHZwKRr/w/512/h/512/theme/dark/icon.png',
  'Teamwork': 'https://cdn.brandfetch.io/idEVJFwYZA/w/512/h/512/theme/dark/icon.png',
  'ActiveCampaign': 'https://cdn.brandfetch.io/idF_j0SVNR/w/512/h/512/theme/dark/icon.png',
  'ConvertKit': 'https://cdn.brandfetch.io/id6B43PQ5W/w/512/h/512/theme/dark/icon.png',
  'Klaviyo': 'https://cdn.brandfetch.io/idyYOTgvn5/w/512/h/512/theme/dark/icon.png',
  'Brevo': 'https://cdn.brandfetch.io/idlJr0H7ZH/w/512/h/512/theme/dark/icon.png',
  'Drift': 'https://cdn.brandfetch.io/idzGy-Tv0W/w/512/h/512/theme/dark/icon.png',
  'Crisp': 'https://cdn.brandfetch.io/id4PbONsB-/w/512/h/512/theme/dark/icon.png',
  'Freshdesk': 'https://cdn.brandfetch.io/id5fzZNJsR/w/512/h/512/theme/dark/icon.png',
  'Help Scout': 'https://cdn.brandfetch.io/idqD6z6j1e/w/512/h/512/theme/dark/icon.png',
  'Front': 'https://cdn.brandfetch.io/idOXlKAB1m/w/512/h/512/theme/dark/icon.png',
  'Gong': 'https://cdn.brandfetch.io/idF5Vks7JB/w/512/h/512/theme/dark/icon.png',
  'Outreach': 'https://cdn.brandfetch.io/idlQVjwFMT/w/512/h/512/theme/dark/icon.png',
  'Salesloft': 'https://cdn.brandfetch.io/idm8f8vU2p/w/512/h/512/theme/dark/icon.png',
  'Pipedrive': 'https://cdn.brandfetch.io/idS-cQVx2n/w/512/h/512/theme/dark/icon.png',
  'Close': 'https://cdn.brandfetch.io/id6p0-V9BN/w/512/h/512/theme/dark/icon.png',
  'Copper': 'https://cdn.brandfetch.io/idqGS5vBBf/w/512/h/512/theme/dark/icon.png',
  'Insightly': 'https://cdn.brandfetch.io/idjT0fBxFK/w/512/h/512/theme/dark/icon.png',
  'Zoho CRM': 'https://cdn.brandfetch.io/idpA59OVCM/w/512/h/512/theme/dark/icon.png',
  'Microsoft Dynamics': 'https://cdn.brandfetch.io/idGILRh36z/w/512/h/512/theme/dark/icon.png',
  'NetSuite': 'https://cdn.brandfetch.io/idHU89k9Yq/w/512/h/512/theme/dark/icon.png',
  'QuickBooks': 'https://cdn.brandfetch.io/idmtvs1M6m/w/512/h/512/theme/dark/icon.png',
  'Xero': 'https://cdn.brandfetch.io/idoJxP7hAw/w/512/h/512/theme/dark/icon.png',
  'FreshBooks': 'https://cdn.brandfetch.io/idw_ZFx7Zj/w/512/h/512/theme/dark/icon.png',
  'Wave': 'https://cdn.brandfetch.io/idO3NlUOtm/w/512/h/512/theme/dark/icon.png',
  'Gusto': 'https://cdn.brandfetch.io/idT2TJcqFP/w/512/h/512/theme/dark/icon.png',
  'BambooHR': 'https://cdn.brandfetch.io/idIRcK1JDE/w/512/h/512/theme/dark/icon.png',
  'Workday': 'https://cdn.brandfetch.io/id1R8OFSIn/w/512/h/512/theme/dark/icon.png',
  'ADP': 'https://cdn.brandfetch.io/id8Y4tClqR/w/512/h/512/theme/dark/icon.png',
  'Namely': 'https://cdn.brandfetch.io/id6ypSIlCG/w/512/h/512/theme/dark/icon.png',
  'Greenhouse': 'https://cdn.brandfetch.io/idwJZ9zcE7/w/512/h/512/theme/dark/icon.png',
  'Lever': 'https://cdn.brandfetch.io/idMJ4Q8OSG/w/512/h/512/theme/dark/icon.png',
  'Workable': 'https://cdn.brandfetch.io/idR2CzT7qV/w/512/h/512/theme/dark/icon.png',
  'Indeed': 'https://cdn.brandfetch.io/idFK2w7DpN/w/512/h/512/theme/dark/icon.png',
  'AngelList': 'https://cdn.brandfetch.io/id0o8JQ7Gm/w/512/h/512/theme/dark/icon.png',
  'Product Hunt': 'https://cdn.brandfetch.io/idT7XHJhq5/w/512/h/512/theme/dark/icon.png',
  'Dribbble': 'https://cdn.brandfetch.io/id7cOhXz_I/w/512/h/512/theme/dark/icon.png',
  'Behance': 'https://cdn.brandfetch.io/idwtj4XCgX/w/512/h/512/theme/dark/icon.png',
  'DeviantArt': 'https://cdn.brandfetch.io/idoaHZO9VK/w/512/h/512/theme/dark/icon.png',
  'Pinterest': 'https://cdn.brandfetch.io/idP5uJ_KRZ/w/512/h/512/theme/dark/icon.png',
  'Reddit': 'https://cdn.brandfetch.io/idP5uJ_KRZ/w/512/h/512/theme/dark/icon.png',
  'Stack Overflow': 'https://cdn.brandfetch.io/idP5vJ_KRZ/w/512/h/512/theme/dark/icon.png',
  'Quora': 'https://cdn.brandfetch.io/idP5uJ_KRZ/w/512/h/512/theme/dark/icon.png',
  'Medium': 'https://cdn.brandfetch.io/idLfHgiYmZ/w/512/h/512/theme/dark/icon.png',
  'Substack': 'https://cdn.brandfetch.io/idTVXUxqN6/w/512/h/512/theme/dark/icon.png',
  'Ghost': 'https://cdn.brandfetch.io/idFU8FZL-1/w/512/h/512/theme/dark/icon.png',
  'Contentful': 'https://cdn.brandfetch.io/idhT0zV7PL/w/512/h/512/theme/dark/icon.png',
  'Strapi': 'https://cdn.brandfetch.io/idP8RQhzNE/w/512/h/512/theme/dark/icon.png',
  'Sanity': 'https://cdn.sanity.io/images/3do82whm/next/51af00784c5addbe91ae7f8dfd60871c6a5e0bef-353x353.svg',
  'Prismic': 'https://cdn.brandfetch.io/id9H8k1QZk/w/512/h/512/theme/dark/icon.png',
  'Storyblok': 'https://cdn.brandfetch.io/id3l1Hx3Ml/w/512/h/512/theme/dark/icon.png',
  'Firebase': 'https://cdn.brandfetch.io/idceVn6h1D/w/512/h/512/theme/dark/icon.png',
  'Supabase': 'https://cdn.brandfetch.io/idvnsjHvdL/w/512/h/512/theme/dark/icon.png',
  'MongoDB': 'https://cdn.brandfetch.io/idxkeTbcf7/w/512/h/512/theme/dark/icon.png',
  'PostgreSQL': 'https://cdn.brandfetch.io/idypCtBgCY/w/512/h/512/theme/dark/icon.png',
  'MySQL': 'https://cdn.brandfetch.io/idpGY2wBf8/w/512/h/512/theme/dark/icon.png',
  'Redis': 'https://cdn.brandfetch.io/idV8kJRjGl/w/512/h/512/theme/dark/icon.png',
  'Elasticsearch': 'https://cdn.brandfetch.io/idxAg10C02/w/512/h/512/theme/dark/icon.png',
  'Algolia': 'https://cdn.brandfetch.io/idFUphQ-JG/w/512/h/512/theme/dark/icon.png',
  'Cloudflare': 'https://cdn.brandfetch.io/idcwCKZCQw/w/512/h/512/theme/dark/icon.png',
  'Vercel': 'https://cdn.brandfetch.io/idOuC5Y-M8/w/512/h/512/theme/dark/icon.png',
  'Netlify': 'https://cdn.brandfetch.io/idROSL7NFI/w/512/h/512/theme/dark/icon.png',
  'Heroku': 'https://cdn.brandfetch.io/idJYlEhWOa/w/512/h/512/theme/dark/icon.png',
  'DigitalOcean': 'https://cdn.brandfetch.io/idFxMZPV8O/w/512/h/512/theme/dark/icon.png',
  'Linode': 'https://cdn.brandfetch.io/idMJeQLyEz/w/512/h/512/theme/dark/icon.png',
  'Vultr': 'https://cdn.brandfetch.io/idBL5WCPaB/w/512/h/512/theme/dark/icon.png',
}

// Alternative method using Clearbit Logo API (free, no API key needed)
function getClearbitLogoUrl(domain: string): string {
  return `https://logo.clearbit.com/${domain}`
}

// Alternative method using Google's favicon service
function getGoogleFaviconUrl(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=256`
}

// Map company names to domains for fallback
const companyDomains: Record<string, string> = {
  'Slack': 'slack.com',
  'Google Drive': 'drive.google.com',
  'Zoom': 'zoom.us',
  'GitHub': 'github.com',
  'Figma': 'figma.com',
  'Zapier': 'zapier.com',
  'Microsoft Teams': 'teams.microsoft.com',
  'Salesforce': 'salesforce.com',
  'HubSpot': 'hubspot.com',
  'Jira': 'atlassian.com',
  'Trello': 'trello.com',
  'Asana': 'asana.com',
  'Monday.com': 'monday.com',
  'Notion': 'notion.so',
  'Airtable': 'airtable.com',
  'Discord': 'discord.com',
  'Dropbox': 'dropbox.com',
  'Linear': 'linear.app',
  'Miro': 'miro.com',
  'Canva': 'canva.com',
  'Webflow': 'webflow.com',
  'Make': 'make.com',
  'n8n': 'n8n.io',
  'IFTTT': 'ifttt.com',
  'Calendly': 'calendly.com',
  'Typeform': 'typeform.com',
  'Loom': 'loom.com',
  'Stripe': 'stripe.com',
  'PayPal': 'paypal.com',
  'Shopify': 'shopify.com',
  'Intercom': 'intercom.com',
  'Zendesk': 'zendesk.com',
  'Twilio': 'twilio.com',
  'AWS': 'aws.amazon.com',
  'Google Cloud': 'cloud.google.com',
  'Azure': 'azure.microsoft.com',
  'GitLab': 'gitlab.com',
  'Bitbucket': 'bitbucket.org',
}

async function downloadAndSaveLogos() {
  console.log('Downloading integration logos...\n')
  
  const outputDir = path.join(process.cwd(), 'public', 'logos', 'integrations')
  
  // Create directory if it doesn't exist
  try {
    await fs.mkdir(outputDir, { recursive: true })
    console.log(`Created directory: ${outputDir}\n`)
  } catch (error) {
    console.log(`Directory already exists: ${outputDir}\n`)
  }
  
  // Get ClickUp's popular integrations
  const query = `*[_type == "software" && name == "ClickUp"][0] {
    popularIntegrations
  }`
  
  const clickup = await client.fetch(query)
  const integrations = clickup?.popularIntegrations || Object.keys(integrationLogos).slice(0, 20)
  
  console.log(`Found ${integrations.length} integrations to fetch logos for:\n`)
  
  const results: { name: string; status: string; path?: string }[] = []
  
  for (const integration of integrations) {
    const safeName = integration.toLowerCase().replace(/[^a-z0-9]/g, '-')
    const fileName = `${safeName}.png`
    const filePath = path.join(outputDir, fileName)
    
    // Check if file already exists
    try {
      await fs.access(filePath)
      console.log(`✓ ${integration} - Already exists`)
      results.push({ name: integration, status: 'exists', path: `/logos/integrations/${fileName}` })
      continue
    } catch {
      // File doesn't exist, download it
    }
    
    // Try to get logo URL
    let logoUrl = integrationLogos[integration]
    
    if (!logoUrl && companyDomains[integration]) {
      // Use Clearbit as fallback
      logoUrl = getClearbitLogoUrl(companyDomains[integration])
    }
    
    if (!logoUrl) {
      console.log(`✗ ${integration} - No logo URL found`)
      results.push({ name: integration, status: 'not_found' })
      continue
    }
    
    try {
      // Download the logo
      const response = await fetch(logoUrl)
      if (response.ok) {
        const buffer = await response.buffer()
        await fs.writeFile(filePath, buffer)
        console.log(`✓ ${integration} - Downloaded successfully`)
        results.push({ name: integration, status: 'success', path: `/logos/integrations/${fileName}` })
      } else {
        console.log(`✗ ${integration} - Failed to download (${response.status})`)
        results.push({ name: integration, status: 'failed' })
      }
    } catch (error) {
      console.log(`✗ ${integration} - Error: ${error}`)
      results.push({ name: integration, status: 'error' })
    }
    
    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  // Create a JSON file with logo mappings
  const logoMappings: Record<string, string> = {}
  results.forEach(result => {
    if (result.path) {
      logoMappings[result.name] = result.path
    }
  })
  
  const mappingsPath = path.join(outputDir, 'mappings.json')
  await fs.writeFile(mappingsPath, JSON.stringify(logoMappings, null, 2))
  
  console.log('\n✨ Logo download complete!')
  console.log(`Total: ${results.length}`)
  console.log(`Success: ${results.filter(r => r.status === 'success' || r.status === 'exists').length}`)
  console.log(`Failed: ${results.filter(r => r.status === 'failed' || r.status === 'not_found' || r.status === 'error').length}`)
  console.log(`\nMappings saved to: ${mappingsPath}`)
  
  return results
}

// Run the script
downloadAndSaveLogos()
  .then(() => {
    console.log('\n✨ All done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })