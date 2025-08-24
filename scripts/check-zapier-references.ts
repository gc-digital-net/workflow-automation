import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function checkReferences() {
  // Get the referencing document
  const doc = await client.fetch(`*[_id == "7yO2HFElhqlXoditiSLOkD"][0]`)
  console.log('Referencing document:', doc)
  
  // Also check all documents referencing Zapier
  const refs = await client.fetch(`*[references("bc9yieR7hH5cZU3M6iDC0o")]`)
  console.log('\nAll documents referencing Zapier:', refs.length)
  refs.forEach((ref: any) => {
    console.log(`- ${ref._type}: ${ref.title || ref.name || ref._id}`)
  })
}

checkReferences()