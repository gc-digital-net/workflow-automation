// Script to create a sample guide in Sanity
// Run with: node scripts/create-sample-guide.js

const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

const sampleGuide = {
  _type: 'topSoftware',
  title: 'Best Project Management Software 2025',
  slug: {
    _type: 'slug',
    current: 'best-project-management-software'
  },
  excerpt: 'We tested 25+ project management tools to find the best options for teams of all sizes. Compare features, pricing, and capabilities.',
  introduction: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Choosing the right project management software can transform how your team collaborates, tracks progress, and delivers results. After spending over 200 hours testing 25+ leading solutions, we\'ve identified the top 10 tools that excel in different areas.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Whether you\'re a small startup looking for simplicity, a growing team needing robust features, or an enterprise requiring advanced customization, this guide will help you find the perfect fit. We\'ve evaluated each tool based on ease of use, features, pricing, integrations, and real-world performance.'
        }
      ]
    }
  ],
  listItems: [
    {
      _key: 'item1',
      rank: 1,
      customTitle: 'ClickUp',
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'ClickUp stands out as the most comprehensive project management solution, offering an impressive feature set at a competitive price. Its "one app to replace them all" philosophy delivers with customizable views, built-in docs, goals tracking, and time management tools. While the learning curve can be steep due to its extensive capabilities, ClickUp rewards investment with unmatched flexibility.'
            }
          ]
        }
      ],
      keyFeatures: [
        '15+ customizable views including Gantt, Kanban, and Calendar',
        'Built-in docs, whiteboards, and chat functionality',
        'Advanced automation with 100+ pre-built templates',
        'Custom fields and statuses for any workflow',
        'Comprehensive time tracking and reporting',
        'Goal tracking with OKR framework support'
      ],
      bestFor: 'Teams wanting an all-in-one solution with maximum customization',
      affiliateLink: 'https://clickup.com/?fp_ref=workflow'
    },
    {
      _key: 'item2',
      rank: 2,
      customTitle: 'Asana',
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Asana excels in team collaboration with its intuitive interface and powerful workflow automation. The platform strikes an excellent balance between functionality and ease of use, making it ideal for teams that want to get started quickly without sacrificing advanced features. Its Forms, Portfolios, and Workload management features are particularly strong.'
            }
          ]
        }
      ],
      keyFeatures: [
        'Multiple project views: List, Board, Timeline, Calendar',
        'Portfolios for managing multiple projects',
        'Forms for intake requests',
        'Workflow Builder for custom automation',
        'Workload management for resource planning',
        'Real-time collaboration and updates'
      ],
      bestFor: 'Marketing and creative teams focused on collaboration',
      affiliateLink: 'https://asana.com/'
    },
    {
      _key: 'item3',
      rank: 3,
      customTitle: 'Monday.com',
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Monday.com shines with its visual approach to project management and exceptional user experience. The platform\'s colorful, intuitive interface makes it easy for teams to adopt, while powerful automation and integration capabilities ensure it can scale with your needs. The WorkOS ecosystem extends beyond project management into CRM, dev ops, and more.'
            }
          ]
        }
      ],
      keyFeatures: [
        'Highly visual and customizable boards',
        '200+ pre-built templates',
        'Advanced automation with multi-step workflows',
        'Dashboard with 50+ widget types',
        'WorkOS apps for CRM, Dev, and more',
        'Mobile apps with offline access'
      ],
      bestFor: 'Visual teams wanting an intuitive, colorful interface',
      affiliateLink: 'https://monday.com/'
    },
    {
      _key: 'item4',
      rank: 4,
      customTitle: 'Notion',
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Notion breaks the traditional project management mold by combining docs, databases, and tasks in one flexible workspace. Its unique approach makes it perfect for teams that want to centralize their knowledge base alongside project tracking. The AI features and template gallery make it incredibly versatile.'
            }
          ]
        }
      ],
      keyFeatures: [
        'Flexible pages combining docs and databases',
        'Powerful database views and filters',
        'AI writing assistant built-in',
        'Wiki-style knowledge base',
        'Template gallery with 1000+ options',
        'API for custom integrations'
      ],
      bestFor: 'Teams wanting to combine documentation with project management',
      affiliateLink: 'https://notion.so/'
    },
    {
      _key: 'item5',
      rank: 5,
      customTitle: 'Jira',
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Jira remains the gold standard for software development teams practicing Agile methodologies. Its robust issue tracking, sprint planning, and release management features are unmatched. While it can be overkill for non-technical teams, development teams will appreciate its deep customization and extensive ecosystem.'
            }
          ]
        }
      ],
      keyFeatures: [
        'Scrum and Kanban boards',
        'Advanced issue tracking and workflows',
        'Sprint planning and velocity tracking',
        'Release management and versioning',
        'Deep integration with development tools',
        'Powerful JQL for custom queries'
      ],
      bestFor: 'Software development teams using Agile/Scrum',
      affiliateLink: 'https://www.atlassian.com/software/jira'
    },
    {
      _key: 'item6',
      rank: 6,
      customTitle: 'Trello',
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Trello pioneered the Kanban board approach to project management and remains one of the most user-friendly options available. Its simplicity is its strength, making it perfect for small teams and personal projects. Power-Ups extend functionality significantly, though it may lack advanced features needed by larger teams.'
            }
          ]
        }
      ],
      keyFeatures: [
        'Simple, visual Kanban boards',
        'Power-Ups for extended functionality',
        'Butler automation for repetitive tasks',
        'Card templates and checklists',
        'Mobile apps with full functionality',
        'Unlimited personal boards on free plan'
      ],
      bestFor: 'Small teams and individuals wanting simplicity',
      affiliateLink: 'https://trello.com/'
    },
    {
      _key: 'item7',
      rank: 7,
      customTitle: 'Wrike',
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Wrike offers enterprise-grade project management with sophisticated resource management and proofing tools. Its strength lies in handling complex projects with multiple stakeholders. The platform excels at providing visibility across departments and projects, making it ideal for larger organizations.'
            }
          ]
        }
      ],
      keyFeatures: [
        'Advanced resource management',
        'Built-in proofing and approval workflows',
        'Custom request forms',
        'Cross-tagging for matrix organizations',
        'Real-time reports and analytics',
        'Adobe Creative Cloud extension'
      ],
      bestFor: 'Enterprise teams needing advanced resource management',
      affiliateLink: 'https://www.wrike.com/'
    },
    {
      _key: 'item8',
      rank: 8,
      customTitle: 'Basecamp',
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Basecamp takes a refreshingly simple approach to project management, organizing work into projects with six core tools. Its opinionated design reduces complexity and decision fatigue. While it lacks advanced features like Gantt charts, teams appreciate its focus on communication and clarity.'
            }
          ]
        }
      ],
      keyFeatures: [
        'Simple project organization',
        'Message boards for announcements',
        'To-do lists with assignments',
        'Schedule for milestones',
        'Campfire chat for quick discussions',
        'Hill Charts for progress visualization'
      ],
      bestFor: 'Teams wanting simplicity over feature richness',
      affiliateLink: 'https://basecamp.com/'
    },
    {
      _key: 'item9',
      rank: 9,
      customTitle: 'Teamwork',
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Teamwork specializes in client project management with excellent billing and invoicing features. Its client-facing capabilities, including client users and project templates, make it ideal for agencies and consultancies. The platform balances professional features with ease of use.'
            }
          ]
        }
      ],
      keyFeatures: [
        'Client management features',
        'Time tracking and billing',
        'Project templates and automation',
        'Workload and capacity planning',
        'Profitability tracking',
        'Client portal access'
      ],
      bestFor: 'Agencies and consultancies managing client projects',
      affiliateLink: 'https://www.teamwork.com/'
    },
    {
      _key: 'item10',
      rank: 10,
      customTitle: 'Microsoft Project',
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Microsoft Project remains the choice for traditional project management with its powerful scheduling engine and resource management. While it has a steep learning curve and higher price point, it excels at managing complex, long-term projects with dependencies. Integration with Microsoft 365 is seamless.'
            }
          ]
        }
      ],
      keyFeatures: [
        'Advanced Gantt charts and dependencies',
        'Resource management and leveling',
        'Portfolio management',
        'Earned value analysis',
        'Microsoft 365 integration',
        'Desktop and cloud versions'
      ],
      bestFor: 'Traditional project managers needing advanced scheduling',
      affiliateLink: 'https://www.microsoft.com/en-us/microsoft-365/project/'
    }
  ],
  conclusion: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The best project management software depends on your specific needs, team size, and work style. ClickUp offers the most comprehensive feature set, Asana excels at team collaboration, and Monday.com provides the best visual experience. Start with free trials to find your perfect fit.'
        }
      ]
    }
  ],
  publishedAt: new Date().toISOString(),
  seo: {
    metaTitle: 'Best Project Management Software 2025 - Top 10 Tools Compared',
    metaDescription: 'Compare the top 10 project management software tools for 2025. In-depth reviews of ClickUp, Asana, Monday.com, and more to help you choose.',
    keywords: ['project management software', 'best project management tools', 'project management comparison', 'team collaboration software']
  }
}

async function createSampleGuide() {
  try {
    console.log('Creating sample guide in Sanity...')
    
    const result = await client.create(sampleGuide)
    
    console.log('✅ Sample guide created successfully!')
    console.log('Document ID:', result._id)
    console.log('View at: http://localhost:3000/guides/best-project-management-software')
  } catch (error) {
    console.error('❌ Error creating sample guide:', error)
  }
}

createSampleGuide()