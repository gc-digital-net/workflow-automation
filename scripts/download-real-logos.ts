import fetch from 'node-fetch'
import fs from 'fs/promises'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

// Use simple logo service URLs that directly return images
const logoUrls: Record<string, string> = {
  'Slack': 'https://logo.clearbit.com/slack.com',
  'Google Drive': 'https://logo.clearbit.com/drive.google.com', 
  'Gmail': 'https://logo.clearbit.com/gmail.com',
  'GitHub': 'https://logo.clearbit.com/github.com',
  'GitLab': 'https://logo.clearbit.com/gitlab.com',
  'Figma': 'https://logo.clearbit.com/figma.com',
  'Zoom': 'https://logo.clearbit.com/zoom.us',
  'Microsoft Teams': 'https://logo.clearbit.com/microsoft.com',
  'Dropbox': 'https://logo.clearbit.com/dropbox.com',
  'HubSpot': 'https://logo.clearbit.com/hubspot.com',
  'Salesforce': 'https://logo.clearbit.com/salesforce.com',
  'Intercom': 'https://logo.clearbit.com/intercom.com',
  'Stripe': 'https://logo.clearbit.com/stripe.com',
  'QuickBooks': 'https://logo.clearbit.com/quickbooks.com',
  'Loom': 'https://logo.clearbit.com/loom.com',
  'Zapier': 'https://logo.clearbit.com/zapier.com',
  'Jira': 'https://logo.clearbit.com/atlassian.com',
  'Trello': 'https://logo.clearbit.com/trello.com',
  'Asana': 'https://logo.clearbit.com/asana.com',
  'Monday.com': 'https://logo.clearbit.com/monday.com',
  'Notion': 'https://logo.clearbit.com/notion.so',
  'Airtable': 'https://logo.clearbit.com/airtable.com',
  'Discord': 'https://logo.clearbit.com/discord.com',
  'Linear': 'https://logo.clearbit.com/linear.app',
  'Miro': 'https://logo.clearbit.com/miro.com',
  'Canva': 'https://logo.clearbit.com/canva.com',
  'Webflow': 'https://logo.clearbit.com/webflow.com',
  'Calendly': 'https://logo.clearbit.com/calendly.com',
  'Typeform': 'https://logo.clearbit.com/typeform.com',
  'PayPal': 'https://logo.clearbit.com/paypal.com',
  'Shopify': 'https://logo.clearbit.com/shopify.com',
  'Zendesk': 'https://logo.clearbit.com/zendesk.com',
  'Twilio': 'https://logo.clearbit.com/twilio.com',
  'AWS': 'https://logo.clearbit.com/aws.amazon.com',
  'Google Cloud': 'https://logo.clearbit.com/cloud.google.com',
  'Azure': 'https://logo.clearbit.com/azure.microsoft.com',
  'Docker': 'https://logo.clearbit.com/docker.com',
  'Bitbucket': 'https://logo.clearbit.com/bitbucket.org',
}

async function downloadRealLogos() {
  console.log('Downloading real logo images...\n')
  
  const outputDir = path.join(process.cwd(), 'public', 'logos', 'integrations')
  
  // Create directory if it doesn't exist
  try {
    await fs.mkdir(outputDir, { recursive: true })
    console.log(`Created directory: ${outputDir}\n`)
  } catch (error) {
    console.log(`Directory already exists: ${outputDir}\n`)
  }
  
  const results: { name: string; status: string; path?: string }[] = []
  
  // Select the first 20 integrations
  const integrations = Object.entries(logoUrls).slice(0, 20)
  
  for (const [name, url] of integrations) {
    const safeName = name.toLowerCase().replace(/[^a-z0-9]/g, '-')
    const fileName = `${safeName}.png`
    const filePath = path.join(outputDir, fileName)
    
    try {
      console.log(`Downloading ${name} from ${url}...`)
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      })
      
      if (response.ok && response.headers.get('content-type')?.includes('image')) {
        const buffer = await response.buffer()
        await fs.writeFile(filePath, buffer)
        console.log(`✓ ${name} - Downloaded successfully (${buffer.length} bytes)`)
        results.push({ name, status: 'success', path: `/logos/integrations/${fileName}` })
      } else {
        console.log(`✗ ${name} - Not an image or failed (${response.status})`)
        results.push({ name, status: 'failed' })
      }
    } catch (error) {
      console.log(`✗ ${name} - Error: ${error}`)
      results.push({ name, status: 'error' })
    }
    
    // Small delay to be respectful
    await new Promise(resolve => setTimeout(resolve, 200))
  }
  
  // Create mappings file
  const mappings: Record<string, string> = {}
  results.forEach(result => {
    if (result.path) {
      mappings[result.name] = result.path
    }
  })
  
  const mappingsPath = path.join(outputDir, 'mappings.json')
  await fs.writeFile(mappingsPath, JSON.stringify(mappings, null, 2))
  
  console.log('\n✨ Logo download complete!')
  console.log(`Total: ${results.length}`)
  console.log(`Success: ${results.filter(r => r.status === 'success').length}`)
  console.log(`Failed: ${results.filter(r => r.status === 'failed' || r.status === 'error').length}`)
  
  return results
}

// Run the script
downloadRealLogos()
  .then(() => {
    console.log('\n✨ All done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })