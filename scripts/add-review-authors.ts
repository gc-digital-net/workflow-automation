import { createClient } from '@sanity/client'
import { config } from 'dotenv'
config()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function addReviewAuthors() {
  try {
    // Create review authors
    const authors = [
      {
        _type: 'author',
        _id: 'author-sarah-mitchell',
        name: 'Sarah Mitchell',
        slug: { current: 'sarah-mitchell' },
        role: 'Senior Software Analyst',
        bio: 'Sarah has over 8 years of experience testing and implementing project management software for Fortune 500 companies. She specializes in workflow automation and enterprise solutions.',
        expertise: ['Project Management', 'Workflow Automation', 'Enterprise Software', 'Team Collaboration'],
        certifications: ['PMP', 'Scrum Master', 'Six Sigma'],
        reviewCount: 47
      },
      {
        _type: 'author', 
        _id: 'author-michael-chen',
        name: 'Michael Chen',
        slug: { current: 'michael-chen' },
        role: 'Lead Product Reviewer',
        bio: 'Michael brings 12 years of software development and product management experience. He focuses on technical integrations and developer tools.',
        expertise: ['API Integration', 'Developer Tools', 'SaaS Platforms', 'Automation'],
        certifications: ['AWS Certified', 'Google Cloud Professional'],
        reviewCount: 63
      },
      {
        _type: 'author',
        _id: 'author-emma-rodriguez', 
        name: 'Emma Rodriguez',
        slug: { current: 'emma-rodriguez' },
        role: 'Business Systems Analyst',
        bio: 'Emma specializes in evaluating business automation tools for SMBs. She has helped over 100 companies optimize their workflows.',
        expertise: ['Business Automation', 'CRM Systems', 'Marketing Tools', 'Small Business Solutions'],
        certifications: ['Salesforce Administrator', 'HubSpot Marketing'],
        reviewCount: 38
      }
    ]

    console.log('Creating review authors...')
    
    for (const author of authors) {
      try {
        const result = await client.createOrReplace(author)
        console.log(`✓ Created author: ${author.name}`)
      } catch (error) {
        console.error(`Error creating author ${author.name}:`, error)
      }
    }

    // Now update the ClickUp review to have an author
    const clickupReview = await client.fetch(`*[_type == "software" && name == "ClickUp"][0]`)
    
    if (clickupReview) {
      await client
        .patch(clickupReview._id)
        .set({
          reviewAuthor: {
            _type: 'reference',
            _ref: 'author-sarah-mitchell'
          },
          reviewDate: '2024-12-15T10:00:00Z',
          lastReviewUpdate: '2025-01-20T10:00:00Z'
        })
        .commit()
      
      console.log('✓ Updated ClickUp review with author')
    }

    console.log('\nSuccessfully added review authors!')

  } catch (error) {
    console.error('Error:', error)
  }
}

addReviewAuthors()