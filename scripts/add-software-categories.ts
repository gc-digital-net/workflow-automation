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

const softwareCategories = [
  // Primary Categories (Featured)
  {
    name: 'Project Management',
    slug: 'project-management',
    description: 'Tools for planning, organizing, and managing project resources and schedules',
    color: 'blue',
    featured: true,
    order: 1,
  },
  {
    name: 'Task Management',
    slug: 'task-management',
    description: 'Software for creating, assigning, and tracking tasks and to-dos',
    color: 'green',
    featured: true,
    order: 2,
  },
  {
    name: 'CRM Software',
    slug: 'crm-software',
    description: 'Customer Relationship Management tools for managing customer interactions',
    color: 'purple',
    featured: true,
    order: 3,
  },
  {
    name: 'Team Collaboration',
    slug: 'team-collaboration',
    description: 'Tools for team communication, file sharing, and collaborative work',
    color: 'indigo',
    featured: true,
    order: 4,
  },
  {
    name: 'Workflow Automation',
    slug: 'workflow-automation',
    description: 'Platforms for automating repetitive tasks and business processes',
    color: 'orange',
    featured: true,
    order: 5,
  },
  {
    name: 'Business Process Management',
    slug: 'business-process-management',
    description: 'BPM software for modeling, implementing, and optimizing business processes',
    color: 'pink',
    featured: true,
    order: 6,
  },
  
  // Secondary Categories
  {
    name: 'Time Tracking',
    slug: 'time-tracking',
    description: 'Tools for tracking time spent on tasks and projects',
    color: 'yellow',
    featured: false,
    order: 7,
  },
  {
    name: 'Document Management',
    slug: 'document-management',
    description: 'Systems for storing, organizing, and sharing documents',
    color: 'green',
    featured: false,
    order: 8,
  },
  {
    name: 'Marketing Automation',
    slug: 'marketing-automation',
    description: 'Tools for automating marketing tasks and campaigns',
    color: 'red',
    featured: false,
    order: 9,
  },
  {
    name: 'Sales Automation',
    slug: 'sales-automation',
    description: 'Software for automating sales processes and pipeline management',
    color: 'purple',
    featured: false,
    order: 10,
  },
  {
    name: 'HR Management',
    slug: 'hr-management',
    description: 'Human Resources management and automation tools',
    color: 'blue',
    featured: false,
    order: 11,
  },
  {
    name: 'Knowledge Management',
    slug: 'knowledge-management',
    description: 'Systems for creating, sharing, and managing organizational knowledge',
    color: 'gray',
    featured: false,
    order: 12,
  },
  {
    name: 'Customer Support',
    slug: 'customer-support',
    description: 'Help desk and customer service management software',
    color: 'indigo',
    featured: false,
    order: 13,
  },
  {
    name: 'Email Marketing',
    slug: 'email-marketing',
    description: 'Tools for creating and managing email campaigns',
    color: 'green',
    featured: false,
    order: 14,
  },
  {
    name: 'Social Media Management',
    slug: 'social-media-management',
    description: 'Platforms for managing social media presence and campaigns',
    color: 'blue',
    featured: false,
    order: 15,
  },
  {
    name: 'Integration Platform',
    slug: 'integration-platform',
    description: 'Tools for connecting and integrating different software applications',
    color: 'orange',
    featured: false,
    order: 16,
  },
  {
    name: 'No-Code Platform',
    slug: 'no-code-platform',
    description: 'Platforms for building applications without coding',
    color: 'purple',
    featured: false,
    order: 17,
  },
  {
    name: 'Form Builder',
    slug: 'form-builder',
    description: 'Tools for creating online forms and surveys',
    color: 'yellow',
    featured: false,
    order: 18,
  },
  {
    name: 'Database Software',
    slug: 'database-software',
    description: 'Database management and spreadsheet-database hybrid tools',
    color: 'gray',
    featured: false,
    order: 19,
  },
  {
    name: 'Note Taking',
    slug: 'note-taking',
    description: 'Digital note-taking and information organization tools',
    color: 'green',
    featured: false,
    order: 20,
  },
]

async function addSoftwareCategories() {
  try {
    console.log('Adding software categories to Sanity...\n')
    
    for (const category of softwareCategories) {
      // Create the category document
      const doc = {
        _id: `software-category-${category.slug}`,
        _type: 'softwareCategory',
        name: category.name,
        slug: {
          _type: 'slug',
          current: category.slug
        },
        description: category.description,
        color: category.color,
        featured: category.featured,
        order: category.order,
        seo: {
          metaTitle: `${category.name} Software Reviews & Comparisons | Workflow Automation`,
          metaDescription: `Find the best ${category.name.toLowerCase()} software. Compare features, pricing, and reviews of top ${category.name.toLowerCase()} tools.`
        }
      }
      
      try {
        await client.createOrReplace(doc)
        console.log(`✓ Added category: ${category.name}`)
      } catch (error: any) {
        console.error(`✗ Failed to add category ${category.name}:`, error.message)
      }
    }
    
    console.log('\n✅ Successfully added all software categories!')
    console.log('\nYou can now:')
    console.log('1. Go to Sanity Studio and assign categories to software reviews')
    console.log('2. Use these categories to filter and organize software on the frontend')
    
  } catch (error) {
    console.error('Error adding categories:', error)
  }
}

addSoftwareCategories()