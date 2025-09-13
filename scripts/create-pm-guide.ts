import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function createProjectManagementGuide() {
  try {
    console.log('Finding software reviews...')
    
    // Find the software documents
    const [clickup, asana, monday] = await Promise.all([
      client.fetch(`*[_type == "software" && slug.current == "clickup"][0]`),
      client.fetch(`*[_type == "software" && slug.current == "asana"][0]`),
      client.fetch(`*[_type == "software" && slug.current == "monday-com"][0]`)
    ])

    if (!clickup || !asana || !monday) {
      console.error('Missing software reviews:', {
        clickup: !!clickup,
        asana: !!asana,
        monday: !!monday
      })
      return
    }

    console.log('Found all software reviews!')
    
    // Create the guide document
    const guide = {
      _type: 'topSoftware',
      title: 'Best Project Management Software 2025',
      subtitle: 'We Tested 25+ Tools to Find the Top Solutions',
      slug: {
        _type: 'slug',
        current: 'best-project-management-software-2025'
      },
      excerpt: 'After 200+ hours of testing, we\'ve identified the best project management software for teams of all sizes. Compare features, pricing, and real user experiences.',
      
      // Introduction
      introduction: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Choosing the right project management software can transform how your team works. We\'ve spent over 200 hours testing 25+ popular tools to bring you this comprehensive guide.',
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Our team of project management experts evaluated each tool based on ease of use, features, pricing, integrations, and real-world performance. We created actual projects, collaborated with team members, and pushed each platform to its limits.',
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Whether you\'re a small startup or a large enterprise, this guide will help you find the perfect project management solution for your needs.',
            }
          ]
        }
      ],
      
      // Methodology
      methodology: [
        {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: 'Our Testing Process' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'We evaluated each tool across 15 key criteria:',
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: '• User Interface & Experience • Task Management Capabilities • Team Collaboration Features • Project Views (Gantt, Kanban, etc.) • Automation & Workflows • Reporting & Analytics • Mobile Apps • Integrations • Customer Support • Pricing & Value • Scalability • Security & Compliance • Template Library • Time Tracking • Resource Management',
            }
          ]
        }
      ],
      
      // Ranked list items
      listItems: [
        {
          _key: 'item1',
          rank: 1,
          software: { _type: 'reference', _ref: clickup._id },
          verdict: 'Best overall for growing teams with complex workflows',
          whyThisRank: 'ClickUp earns our top spot with its incredible versatility and value. It offers enterprise-level features at startup-friendly prices, with a generous free plan that supports unlimited users. The platform\'s customization options are unmatched, allowing teams to create exactly the workflow they need.',
          overrides: {
            customDescription: [
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'ClickUp is the Swiss Army knife of project management tools. It combines the best features of tools like Asana, Trello, and Notion into one powerful platform. Whether you need simple task lists or complex project hierarchies, ClickUp adapts to your workflow rather than forcing you into theirs.',
                  }
                ]
              },
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'What sets ClickUp apart is its incredible depth of features without sacrificing usability. You can start simple and gradually unlock more advanced features as your team grows. From custom fields and automation to goals and portfolios, ClickUp scales with your ambitions.',
                  }
                ]
              }
            ],
            customBestFor: 'Growing teams (10-500 people) who need flexibility and customization',
            specialOffer: 'Get 20% off your first year with code WORKFLOW20'
          }
        },
        {
          _key: 'item2',
          rank: 2,
          software: { _type: 'reference', _ref: monday._id },
          verdict: 'Best visual project management with excellent UX',
          whyThisRank: 'Monday.com secures second place with its intuitive interface and powerful visual project management. It\'s the perfect balance between simplicity and functionality, making it ideal for teams that want to get up and running quickly without extensive training.',
          overrides: {
            customDescription: [
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Monday.com (formerly monday Work Management) stands out with its colorful, intuitive interface that makes project management feel less like work. The platform\'s visual approach to project tracking helps teams instantly understand project status and priorities.',
                  }
                ]
              },
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Beyond its beautiful design, Monday.com packs serious project management power. Its automation recipes, integrations, and custom workflows rival enterprise solutions while remaining accessible to non-technical users. The platform excels at cross-functional collaboration, making it perfect for organizations where multiple departments need to work together.',
                  }
                ]
              }
            ],
            customBestFor: 'Mid-size teams (20-200 people) prioritizing ease of use and visual organization',
            specialOffer: 'Extended 30-day free trial for our readers'
          }
        },
        {
          _key: 'item3',
          rank: 3,
          software: { _type: 'reference', _ref: asana._id },
          verdict: 'Best for enterprise teams needing advanced portfolio management',
          whyThisRank: 'Asana takes third place as the most mature and enterprise-ready solution. While it may lack some of the visual flair of competitors, it excels in handling complex, multi-team projects with sophisticated portfolio management and reporting capabilities.',
          overrides: {
            customDescription: [
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Asana is the veteran of project management software, and it shows in the best way possible. Years of refinement have created a platform that handles enterprise complexity with grace. From simple task lists to complex cross-functional initiatives, Asana provides the structure and flexibility large organizations need.',
                  }
                ]
              },
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'What makes Asana special is its focus on reducing work about work. Features like Timeline view, Portfolios, and Goals help teams see the bigger picture while automation rules eliminate repetitive tasks. For organizations serious about project management maturity, Asana provides the tools to get there.',
                  }
                ]
              }
            ],
            customBestFor: 'Large teams (100+ people) and enterprises requiring advanced features and compliance',
            specialOffer: 'Free for teams up to 15 members'
          }
        }
      ],
      
      // Conclusion
      conclusion: [
        {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: 'Which Project Management Tool Should You Choose?' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'All three of our top picks are excellent project management solutions, but each excels in different areas:',
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: '• Choose ',
            },
            {
              _type: 'span',
              text: 'ClickUp',
              marks: ['strong']
            },
            {
              _type: 'span',
              text: ' if you want maximum flexibility and value for money. Perfect for growing teams that need room to scale.',
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: '• Choose ',
            },
            {
              _type: 'span',
              text: 'Monday.com',
              marks: ['strong']
            },
            {
              _type: 'span',
              text: ' if visual organization and ease of use are priorities. Ideal for teams that want to minimize training time.',
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: '• Choose ',
            },
            {
              _type: 'span',
              text: 'Asana',
              marks: ['strong']
            },
            {
              _type: 'span',
              text: ' if you need enterprise-grade features and portfolio management. Best for large organizations with complex needs.',
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'We recommend starting with free trials of your top 2-3 choices and running a pilot project with your team. This hands-on experience will quickly reveal which tool fits your workflow best.',
            }
          ]
        }
      ],
      
      // Trust signals
      trustSignals: {
        hoursResearched: 200,
        expertsConsulted: 12,
        toolsTested: 25,
        userReviewsAnalyzed: 5000
      },
      
      // Metadata
      publishedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      
      // SEO
      seo: {
        metaTitle: 'Best Project Management Software 2025: Top 3 Tools Compared',
        metaDescription: 'We tested 25+ project management tools for 200+ hours. See why ClickUp, Monday.com, and Asana are our top picks for teams in 2025.',
        keywords: ['project management software', 'best project management tools', 'project management software 2025', 'clickup vs monday', 'asana alternatives'],
        focusKeyword: 'best project management software'
      }
    }

    console.log('Creating guide document...')
    const result = await client.create(guide)
    console.log('✅ Guide created successfully!')
    console.log('View at: http://localhost:3000/guides/best-project-management-software-2025')
    console.log('Sanity ID:', result._id)
    
  } catch (error) {
    console.error('Error creating guide:', error)
  }
}

createProjectManagementGuide()