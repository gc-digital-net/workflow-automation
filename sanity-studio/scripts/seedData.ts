import {createClient} from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Initialize Sanity client
const client = createClient({
  projectId: 'x1zu4x72',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function seedData() {
  console.log('🌱 Starting to seed data...')
  
  try {
    // 1. Create Author
    console.log('Creating author...')
    const author = await client.create({
      _type: 'author',
      name: 'John Smith',
      slug: {
        _type: 'slug',
        current: 'john-smith'
      },
      bio: 'Workflow automation expert with 10+ years of experience helping businesses optimize their processes.',
      social: {
        twitter: 'https://twitter.com/johnsmith',
        linkedin: 'https://linkedin.com/in/johnsmith',
        website: 'https://johnsmith.com'
      }
    })
    console.log('✅ Author created:', author._id)

    // 2. Create Categories
    console.log('Creating categories...')
    const categoryWorkflow = await client.create({
      _type: 'category',
      name: 'Workflow Automation',
      slug: {
        _type: 'slug',
        current: 'workflow-automation'
      },
      description: 'Articles and reviews about workflow automation tools and strategies'
    })
    
    const categoryProjectMgmt = await client.create({
      _type: 'category',
      name: 'Project Management',
      slug: {
        _type: 'slug',
        current: 'project-management'
      },
      description: 'Project management software reviews and best practices'
    })
    console.log('✅ Categories created')

    // 3. Create Software Reviews
    console.log('Creating software reviews...')
    const zapier = await client.create({
      _type: 'software',
      name: 'Zapier',
      slug: {
        _type: 'slug',
        current: 'zapier'
      },
      tagline: 'Automate your work with 5,000+ app integrations',
      shortDescription: 'Zapier is a no-code automation tool that connects your apps and automates workflows.',
      categories: [{
        _type: 'reference',
        _ref: categoryWorkflow._id
      }],
      overview: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Zapier is the leading workflow automation platform that connects over 5,000 apps. It allows users to create automated workflows (called Zaps) without any coding knowledge.'
            }
          ]
        }
      ],
      detailedReview: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'After extensive testing, Zapier proves to be an incredibly powerful and user-friendly automation platform. The interface is intuitive, making it easy for non-technical users to create complex workflows.'
            }
          ]
        }
      ],
      pros: [
        'Extensive app integrations (5,000+)',
        'User-friendly interface',
        'Reliable automation',
        'Good customer support',
        'Free tier available'
      ],
      cons: [
        'Can get expensive for heavy usage',
        'Limited conditional logic in lower tiers',
        'Some integrations lack depth'
      ],
      overallScore: 9,
      scores: {
        easeOfUse: 9,
        features: 8,
        integrations: 10,
        pricing: 7,
        support: 8,
        performance: 9
      },
      pricing: [
        {
          name: 'Free',
          price: 0,
          features: ['100 tasks/month', '5 Zaps', 'Single-step Zaps'],
          recommended: false
        },
        {
          name: 'Starter',
          price: 19.99,
          features: ['750 tasks/month', '20 Zaps', 'Multi-step Zaps', 'Filters'],
          recommended: true
        },
        {
          name: 'Professional',
          price: 49,
          features: ['2,000 tasks/month', 'Unlimited Zaps', 'Premium apps', 'Custom logic'],
          recommended: false
        }
      ],
      affiliateLink: 'https://zapier.com/affiliate-link',
      hasFreeTrial: true,
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Zapier Review 2024: Features, Pricing & Alternatives',
        metaDescription: 'In-depth Zapier review covering features, pricing, pros/cons, and alternatives. Find out if Zapier is the right automation tool for your business.',
        keywords: ['zapier review', 'zapier pricing', 'workflow automation', 'zapier alternatives']
      }
    })

    const monday = await client.create({
      _type: 'software',
      name: 'Monday.com',
      slug: {
        _type: 'slug',
        current: 'monday-com'
      },
      tagline: 'Work OS that powers teams to run projects and workflows with confidence',
      shortDescription: 'Monday.com is a versatile work operating system that helps teams manage projects, workflows, and daily work.',
      categories: [{
        _type: 'reference',
        _ref: categoryProjectMgmt._id
      }],
      overview: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Monday.com is a comprehensive work management platform that combines project management, workflow automation, and team collaboration in one place.'
            }
          ]
        }
      ],
      detailedReview: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Monday.com stands out with its highly visual and customizable interface. The platform offers excellent flexibility for different team needs and workflows.'
            }
          ]
        }
      ],
      pros: [
        'Highly customizable workflows',
        'Excellent visual interface',
        'Strong automation features',
        'Good mobile apps',
        'Extensive template library'
      ],
      cons: [
        'Steep learning curve',
        'Can be pricey for larger teams',
        'Limited reporting in basic plans'
      ],
      overallScore: 8.5,
      scores: {
        easeOfUse: 7,
        features: 9,
        integrations: 8,
        pricing: 6,
        support: 8,
        performance: 8
      },
      pricing: [
        {
          name: 'Basic',
          price: 8,
          features: ['Unlimited boards', 'Unlimited docs', '5GB storage'],
          recommended: false
        },
        {
          name: 'Standard',
          price: 10,
          features: ['Timeline view', 'Calendar view', 'Guest access', 'Automations'],
          recommended: true
        },
        {
          name: 'Pro',
          price: 16,
          features: ['Time tracking', 'Formula column', 'Private boards', 'Chart view'],
          recommended: false
        }
      ],
      affiliateLink: 'https://monday.com/affiliate-link',
      hasFreeTrial: true,
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Monday.com Review 2024: Complete Guide to Features & Pricing',
        metaDescription: 'Comprehensive Monday.com review with detailed analysis of features, pricing, pros/cons, and use cases. Is Monday.com right for your team?',
        keywords: ['monday.com review', 'monday pricing', 'project management', 'work os']
      }
    })
    console.log('✅ Software reviews created')

    // 4. Create Blog Post
    console.log('Creating blog post...')
    const blogPost = await client.create({
      _type: 'post',
      title: 'Getting Started with Workflow Automation: A Beginner\'s Guide',
      slug: {
        _type: 'slug',
        current: 'getting-started-workflow-automation'
      },
      excerpt: 'Learn the fundamentals of workflow automation and how to implement it in your business for improved efficiency and productivity.',
      content: [
        {
          _type: 'block',
          style: 'h2',
          children: [{_type: 'span', text: 'What is Workflow Automation?'}]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Workflow automation is the process of using technology to complete tasks and processes with minimal human intervention. It involves creating a series of automated actions for the steps in a business process.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{_type: 'span', text: 'Benefits of Workflow Automation'}]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'The key benefits include increased efficiency, reduced errors, cost savings, improved compliance, and better scalability. Teams can focus on high-value work while repetitive tasks run automatically.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{_type: 'span', text: 'Getting Started'}]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Start by identifying repetitive tasks in your workflow. Document your current processes, then look for automation opportunities. Choose the right tools based on your needs and budget.'
            }
          ]
        }
      ],
      author: {
        _type: 'reference',
        _ref: author._id
      },
      categories: [{
        _type: 'reference',
        _ref: categoryWorkflow._id
      }],
      tags: ['workflow automation', 'productivity', 'beginner guide', 'business process'],
      publishedAt: new Date().toISOString(),
      seo: {
        metaTitle: 'Getting Started with Workflow Automation: Complete Guide',
        metaDescription: 'Learn workflow automation basics, benefits, and implementation strategies. Perfect guide for beginners looking to automate business processes.',
        keywords: ['workflow automation', 'automation guide', 'business automation', 'process automation']
      }
    })
    console.log('✅ Blog post created')

    // 5. Create Listicle
    console.log('Creating listicle...')
    const listicle = await client.create({
      _type: 'listicle',
      title: 'Top 5 Workflow Automation Tools for Small Business',
      slug: {
        _type: 'slug',
        current: 'top-5-workflow-automation-tools'
      },
      excerpt: 'Discover the best workflow automation tools for small businesses to streamline operations and boost productivity.',
      introduction: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Small businesses need affordable yet powerful automation tools. We\'ve tested dozens of platforms to bring you the top 5 solutions that offer the best value for small teams.'
            }
          ]
        }
      ],
      listItems: [
        {
          rank: 1,
          software: {
            _type: 'reference',
            _ref: zapier._id
          },
          description: [
            {
              _type: 'block',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Zapier tops our list with its unmatched app ecosystem and user-friendly interface. Perfect for small businesses looking to connect their existing tools without coding.'
                }
              ]
            }
          ],
          keyFeatures: [
            '5,000+ app integrations',
            'No-code automation builder',
            'Free tier available',
            'Pre-built templates'
          ],
          bestFor: 'Small businesses needing to connect multiple apps',
          affiliateLink: 'https://zapier.com/affiliate'
        },
        {
          rank: 2,
          customTitle: 'Make (formerly Integromat)',
          description: [
            {
              _type: 'block',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Make offers powerful visual automation with advanced features at competitive prices. Great for businesses needing complex workflows with conditional logic.'
                }
              ]
            }
          ],
          keyFeatures: [
            'Visual workflow builder',
            'Advanced data manipulation',
            'Affordable pricing',
            'Error handling'
          ],
          bestFor: 'Teams needing complex automation scenarios',
          affiliateLink: 'https://make.com/affiliate'
        },
        {
          rank: 3,
          software: {
            _type: 'reference',
            _ref: monday._id
          },
          description: [
            {
              _type: 'block',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Monday.com combines project management with built-in automation. Ideal for teams wanting an all-in-one solution for work management and automation.'
                }
              ]
            }
          ],
          keyFeatures: [
            'Built-in automation',
            'Project management features',
            'Custom workflows',
            'Team collaboration'
          ],
          bestFor: 'Teams wanting project management with automation',
          affiliateLink: 'https://monday.com/affiliate'
        }
      ],
      conclusion: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Each of these tools offers unique strengths for small businesses. Zapier excels in simplicity and integrations, Make offers advanced features at great prices, and Monday.com provides an all-in-one solution. Choose based on your specific needs and technical expertise.'
            }
          ]
        }
      ],
      author: {
        _type: 'reference',
        _ref: author._id
      },
      categories: [{
        _type: 'reference',
        _ref: categoryWorkflow._id
      }],
      publishedAt: new Date().toISOString(),
      seo: {
        metaTitle: 'Top 5 Workflow Automation Tools for Small Business (2024)',
        metaDescription: 'Compare the best workflow automation tools for small businesses. In-depth analysis of features, pricing, and use cases to help you choose.',
        keywords: ['workflow automation tools', 'small business automation', 'best automation software']
      }
    })
    console.log('✅ Listicle created')

    // 6. Create Comparison
    console.log('Creating comparison...')
    const comparison = await client.create({
      _type: 'comparison',
      title: 'Zapier vs Monday.com: Which Automation Tool is Right for You?',
      slug: {
        _type: 'slug',
        current: 'zapier-vs-monday'
      },
      softwareA: {
        _type: 'reference',
        _ref: zapier._id
      },
      softwareB: {
        _type: 'reference',
        _ref: monday._id
      },
      introduction: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Zapier and Monday.com are both powerful automation platforms, but they serve different primary purposes. This comparison will help you choose the right tool for your needs.'
            }
          ]
        }
      ],
      verdict: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Choose Zapier if you need to connect multiple apps and create automated workflows between them. Choose Monday.com if you want an all-in-one work management platform with built-in automation features.'
            }
          ]
        }
      ],
      winner: 'tie',
      categoryWinners: [
        {
          category: 'Ease of Use',
          winner: 'a',
          notes: 'Zapier\'s focused approach makes it easier to learn'
        },
        {
          category: 'App Integrations',
          winner: 'a',
          notes: 'Zapier has 5,000+ integrations vs Monday\'s 200+'
        },
        {
          category: 'Project Management',
          winner: 'b',
          notes: 'Monday.com is built for project management'
        },
        {
          category: 'Pricing',
          winner: 'tie',
          notes: 'Both offer free tiers and similar paid plan pricing'
        },
        {
          category: 'Team Collaboration',
          winner: 'b',
          notes: 'Monday.com has superior collaboration features'
        }
      ],
      publishedAt: new Date().toISOString(),
      seo: {
        metaTitle: 'Zapier vs Monday.com: Complete Comparison (2024)',
        metaDescription: 'Detailed comparison of Zapier and Monday.com. Compare features, pricing, integrations, and use cases to make the right choice.',
      }
    })
    console.log('✅ Comparison created')

    // 7. Create FAQs
    console.log('Creating FAQs...')
    await client.create({
      _type: 'faq',
      question: 'What is workflow automation?',
      answer: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Workflow automation is the use of software to complete tasks and processes with minimal human intervention. It involves creating rules-based logic to trigger actions, reducing manual work and improving efficiency.'
            }
          ]
        }
      ],
      category: {
        _type: 'reference',
        _ref: categoryWorkflow._id
      },
      order: 1,
      featured: true
    })

    await client.create({
      _type: 'faq',
      question: 'How much does workflow automation software cost?',
      answer: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Costs vary widely from free plans for basic needs to $500+ per month for enterprise solutions. Most small businesses can get started with $20-50/month plans that offer good functionality.'
            }
          ]
        }
      ],
      category: {
        _type: 'reference',
        _ref: categoryWorkflow._id
      },
      order: 2,
      featured: true
    })
    console.log('✅ FAQs created')

    // 8. Create Testimonial
    console.log('Creating testimonial...')
    await client.create({
      _type: 'testimonial',
      name: 'Sarah Johnson',
      role: 'Operations Manager',
      company: 'TechStart Inc.',
      testimonial: 'The workflow automation reviews on this site helped us choose the perfect tool for our team. We saved 20 hours per week after implementing Zapier based on their recommendations.',
      rating: 5,
      software: {
        _type: 'reference',
        _ref: zapier._id
      },
      featured: true,
      publishedAt: new Date().toISOString()
    })
    console.log('✅ Testimonial created')

    // 9. Create Site Settings
    console.log('Creating site settings...')
    await client.create({
      _type: 'siteSettings',
      title: 'Workflow Automation Hub',
      description: 'Your trusted source for workflow automation software reviews, comparisons, and guides.',
      socialLinks: {
        twitter: 'https://twitter.com/workflowhub',
        linkedin: 'https://linkedin.com/company/workflowhub',
        facebook: 'https://facebook.com/workflowhub',
        youtube: 'https://youtube.com/workflowhub'
      },
      newsletterCTA: {
        title: 'Get Automation Tips Weekly',
        description: 'Join 10,000+ professionals getting weekly workflow automation tips and software recommendations.',
        buttonText: 'Subscribe Now'
      },
      footer: {
        copyright: '© 2024 Workflow Automation Hub. All rights reserved.',
        aboutText: 'We help businesses find and implement the right automation tools to streamline their operations.'
      },
      defaultSEO: {
        metaTitle: 'Workflow Automation Software Reviews & Comparisons',
        metaDescription: 'Find the best workflow automation software for your business. In-depth reviews, comparisons, and guides.'
      }
    })
    console.log('✅ Site settings created')

    // 10. Create Navigation
    console.log('Creating navigation...')
    await client.create({
      _type: 'navigation',
      title: 'Main Navigation',
      id: {
        _type: 'slug',
        current: 'main-nav'
      },
      items: [
        {
          label: 'Home',
          link: '/'
        },
        {
          label: 'Reviews',
          link: '/reviews',
          children: [
            {label: 'All Reviews', link: '/reviews'},
            {label: 'Workflow Automation', link: '/reviews/category/workflow-automation'},
            {label: 'Project Management', link: '/reviews/category/project-management'}
          ]
        },
        {
          label: 'Comparisons',
          link: '/comparisons'
        },
        {
          label: 'Blog',
          link: '/blog'
        },
        {
          label: 'Tools',
          link: '/tools',
          children: [
            {label: 'ROI Calculator', link: '/tools/roi-calculator'},
            {label: 'Software Finder', link: '/tools/software-finder'}
          ]
        },
        {
          label: 'About',
          link: '/about'
        }
      ]
    })
    console.log('✅ Navigation created')

    console.log('\n🎉 All sample data has been successfully created!')
    console.log('You can now view the content in your Sanity Studio at http://localhost:3333/')
    
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    process.exit(1)
  }
}

// Run the seed function
seedData()