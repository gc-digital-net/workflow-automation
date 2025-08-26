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

async function createReviewsBatch2() {
  const reviews = [
    // Planview Review
    {
      _type: 'software',
      name: 'Planview',
      slug: { _type: 'slug', current: 'planview' },
      tagline: 'Portfolio and work management at enterprise scale',
      excerpt: 'Planview provides comprehensive portfolio and work management solutions that help enterprises strategize, plan, and deliver work across the organization.',
      overallScore: 8.3,
      scores: {
        easeOfUse: 7.1,
        features: 9.1,
        integrations: 8.6,
        pricing: 6.5,
        support: 8.4,
        security: 9.1,
        scalability: 9.3,
        performance: 8.2,
        mobile: 7.5,
        documentation: 8.3,
        learningCurve: 6.6,
        customization: 8.9,
        reporting: 9.0,
        freeTier: 2.0,
        overallValue: 7.8
      },
      pricing: [
        {
          name: 'Portfolio Management',
          price: 'Custom',
          features: ['Strategic planning', 'Portfolio optimization', 'Resource management', 'Financial planning'],
          userLimit: 'Contact sales'
        },
        {
          name: 'Enterprise Agile',
          price: 'Custom',
          features: ['Scaled agile delivery', 'Value stream management', 'Lean portfolio', 'PI planning'],
          userLimit: 'Contact sales',
          recommended: true
        },
        {
          name: 'Professional Services',
          price: 'Custom',
          features: ['Project portfolio', 'Resource optimization', 'Time tracking', 'Revenue planning'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Comprehensive PPM capabilities',
        'Strong strategic planning tools',
        'Excellent for large enterprises',
        'Value stream management',
        'Robust financial features',
        'Good integration options',
        'Mature platform'
      ],
      cons: [
        'Complex implementation',
        'Expensive solution',
        'Steep learning curve',
        'Not for small teams',
        'Requires dedicated training',
        'Limited agility for changes'
      ],
      content: [
        {
          _type: 'block',
          _key: 'planview1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Planview: Enterprise Portfolio Management Leader' }]
        },
        {
          _type: 'block',
          _key: 'planview2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Planview is a leading provider of portfolio management and work management solutions for enterprises. With over 35 years in the market, Planview serves more than 4,500 organizations globally, helping them connect strategy to delivery. The platform is particularly strong in industries like IT, professional services, and product development where portfolio optimization and resource management are critical.' }]
        },
        {
          _type: 'block',
          _key: 'planview3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Strategic Planning and Portfolio Management' }]
        },
        {
          _type: 'block',
          _key: 'planview4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Planview\'s strategic planning capabilities enable organizations to translate strategy into executable work. The platform provides tools for capability-based planning, strategic roadmapping, and investment prioritization. Portfolio managers can evaluate initiatives against strategic objectives, model different scenarios, and optimize portfolio mix based on constraints like budget, resources, and risk tolerance.' }]
        },
        {
          _type: 'block',
          _key: 'planview5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Value Stream Management' }]
        },
        {
          _type: 'block',
          _key: 'planview6',
          style: 'normal',
          children: [{ _type: 'span', text: 'For organizations practicing lean and agile at scale, Planview offers comprehensive value stream management capabilities. The platform helps visualize and optimize the flow of work from ideation to delivery, identifying bottlenecks and waste in the process. Integration with development tools provides end-to-end visibility into software delivery, while metrics and analytics help teams continuously improve their delivery performance.' }]
        },
        {
          _type: 'block',
          _key: 'planview7',
          style: 'h2',
          children: [{ _type: 'span', text: 'Resource Management and Capacity Planning' }]
        },
        {
          _type: 'block',
          _key: 'planview8',
          style: 'normal',
          children: [{ _type: 'span', text: 'Planview provides sophisticated resource management tools that help organizations optimize utilization and balance demand with capacity. The platform supports role-based planning, skills management, and what-if scenario modeling. Resource managers can see heat maps of resource allocation, identify conflicts, and make informed staffing decisions. The time tracking and actuals capture capabilities provide data for improving future estimates.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Planview Review 2024: Enterprise Portfolio & Work Management Platform',
        metaDescription: 'In-depth Planview review covering portfolio management, strategic planning, value stream management, and enterprise work management capabilities.',
        keywords: ['planview review', 'portfolio management', 'ppm software', 'enterprise work management', 'strategic planning software']
      }
    },

    // ServiceNow Review
    {
      _type: 'software',
      name: 'ServiceNow',
      slug: { _type: 'slug', current: 'servicenow' },
      tagline: 'Digital workflow platform for enterprise service management',
      excerpt: 'ServiceNow is a cloud-based platform that helps enterprises manage digital workflows for enterprise operations, including IT, HR, and project management.',
      overallScore: 8.7,
      scores: {
        easeOfUse: 7.3,
        features: 9.3,
        integrations: 9.2,
        pricing: 6.2,
        support: 8.6,
        security: 9.4,
        scalability: 9.5,
        performance: 8.8,
        mobile: 8.2,
        documentation: 8.5,
        learningCurve: 6.7,
        customization: 9.2,
        reporting: 8.9,
        freeTier: 1.0,
        overallValue: 8.0
      },
      pricing: [
        {
          name: 'IT Service Management',
          price: 'Custom',
          features: ['Incident management', 'Problem management', 'Change management', 'Service catalog'],
          userLimit: 'Contact sales'
        },
        {
          name: 'IT Operations Management',
          price: 'Custom',
          features: ['Event management', 'Orchestration', 'Discovery', 'Service mapping'],
          userLimit: 'Contact sales'
        },
        {
          name: 'Strategic Portfolio Management',
          price: 'Custom',
          features: ['Project management', 'Portfolio planning', 'Resource management', 'Agile development'],
          userLimit: 'Contact sales',
          recommended: true
        },
        {
          name: 'Now Platform',
          price: 'Custom',
          features: ['App engine', 'Integration hub', 'Flow designer', 'Mobile platform'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Comprehensive enterprise platform',
        'Excellent ITSM capabilities',
        'Strong automation features',
        'Highly customizable',
        'Great integration capabilities',
        'Enterprise-grade security',
        'Powerful workflow engine'
      ],
      cons: [
        'Very expensive',
        'Complex implementation',
        'Requires specialized expertise',
        'Steep learning curve',
        'Overkill for small teams',
        'Long deployment times'
      ],
      content: [
        {
          _type: 'block',
          _key: 'servicenow1',
          style: 'h2',
          children: [{ _type: 'span', text: 'ServiceNow: The Digital Workflow Platform' }]
        },
        {
          _type: 'block',
          _key: 'servicenow2',
          style: 'normal',
          children: [{ _type: 'span', text: 'ServiceNow is much more than a project management tool—it\'s a comprehensive digital workflow platform that transforms how enterprises work. While best known for IT service management (ITSM), ServiceNow\'s Strategic Portfolio Management (SPM) module provides robust project and portfolio management capabilities that rival dedicated PPM solutions. The platform serves over 7,400 enterprise customers globally.' }]
        },
        {
          _type: 'block',
          _key: 'servicenow3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Strategic Portfolio Management Capabilities' }]
        },
        {
          _type: 'block',
          _key: 'servicenow4',
          style: 'normal',
          children: [{ _type: 'span', text: 'ServiceNow SPM helps organizations align investments with business strategy and track work execution. The platform provides comprehensive project management features including work breakdown structures, Gantt charts, resource planning, and financial tracking. What sets ServiceNow apart is its ability to connect project work with other enterprise processes like IT service requests, HR onboarding, and facilities management.' }]
        },
        {
          _type: 'block',
          _key: 'servicenow5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Workflow Automation and Integration' }]
        },
        {
          _type: 'block',
          _key: 'servicenow6',
          style: 'normal',
          children: [{ _type: 'span', text: 'ServiceNow\'s Flow Designer enables no-code workflow automation across the enterprise. Organizations can create complex workflows that span multiple departments and systems. The Integration Hub provides pre-built connectors to hundreds of third-party systems, while the platform\'s APIs enable custom integrations. This integration capability makes ServiceNow a true system of systems, connecting disparate tools and data sources.' }]
        },
        {
          _type: 'block',
          _key: 'servicenow7',
          style: 'h2',
          children: [{ _type: 'span', text: 'AI and Machine Learning Features' }]
        },
        {
          _type: 'block',
          _key: 'servicenow8',
          style: 'normal',
          children: [{ _type: 'span', text: 'ServiceNow\'s Now Intelligence provides AI-powered insights and automation. The platform can predict project risks, recommend resource assignments, and automate routine tasks. Virtual Agent capabilities allow users to interact with the system using natural language, while predictive intelligence helps identify patterns and anomalies in project data. These AI features significantly enhance productivity and decision-making.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'ServiceNow Review 2024: Enterprise Digital Workflow Platform Analysis',
        metaDescription: 'Comprehensive ServiceNow review covering Strategic Portfolio Management, workflow automation, integration capabilities, and enterprise service management.',
        keywords: ['servicenow review', 'servicenow spm', 'enterprise workflow platform', 'strategic portfolio management', 'digital workflow']
      }
    },

    // Oracle Primavera Review
    {
      _type: 'software',
      name: 'Oracle Primavera',
      slug: { _type: 'slug', current: 'oracle-primavera' },
      tagline: 'Enterprise project portfolio management for complex projects',
      excerpt: 'Oracle Primavera is the industry standard for enterprise project portfolio management, particularly in construction, engineering, and capital-intensive industries.',
      overallScore: 8.5,
      scores: {
        easeOfUse: 6.0,
        features: 9.6,
        integrations: 8.4,
        pricing: 5.8,
        support: 8.2,
        security: 9.2,
        scalability: 9.4,
        performance: 8.3,
        mobile: 7.2,
        documentation: 8.6,
        learningCurve: 5.5,
        customization: 8.7,
        reporting: 9.3,
        freeTier: 1.0,
        overallValue: 7.6
      },
      pricing: [
        {
          name: 'Primavera P6 Professional',
          price: 'Custom',
          features: ['Desktop application', 'Project scheduling', 'Resource management', 'Cost management'],
          userLimit: 'Per license'
        },
        {
          name: 'Primavera P6 EPPM',
          price: 'Custom',
          features: ['Web-based platform', 'Portfolio management', 'Team collaboration', 'Advanced analytics'],
          userLimit: 'Contact sales',
          recommended: true
        },
        {
          name: 'Primavera Cloud',
          price: 'Custom',
          features: ['Cloud-native platform', 'Mobile access', 'Real-time collaboration', 'AI-powered insights'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Industry standard for construction',
        'Extremely powerful scheduling',
        'Handles massive complex projects',
        'Excellent cost management',
        'Strong risk analysis',
        'Comprehensive reporting',
        'Earned value management'
      ],
      cons: [
        'Very steep learning curve',
        'Expensive licensing',
        'Requires extensive training',
        'Complex implementation',
        'Not for small projects',
        'Dated user interface'
      ],
      content: [
        {
          _type: 'block',
          _key: 'primavera1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Oracle Primavera: The Construction Industry Standard' }]
        },
        {
          _type: 'block',
          _key: 'primavera2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Oracle Primavera is the undisputed leader in project management software for construction, engineering, and capital-intensive industries. Used on projects ranging from skyscrapers to oil refineries, Primavera handles the complexity and scale that other tools cannot match. The platform manages over $4 trillion in projects globally and is the standard for many government and enterprise contracts.' }]
        },
        {
          _type: 'block',
          _key: 'primavera3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Unmatched Scheduling Capabilities' }]
        },
        {
          _type: 'block',
          _key: 'primavera4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Primavera\'s scheduling engine is the most sophisticated available. It supports multiple critical paths, resource leveling, and thousands of activities with complex dependencies. The platform handles multiple calendars, shift patterns, and resource constraints while maintaining schedule integrity. Features like reflection, retained logic, and progress override provide flexibility in schedule calculations that construction projects require.' }]
        },
        {
          _type: 'block',
          _key: 'primavera5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Cost and Earned Value Management' }]
        },
        {
          _type: 'block',
          _key: 'primavera6',
          style: 'normal',
          children: [{ _type: 'span', text: 'Primavera excels at cost management and earned value analysis. The platform tracks budgeted costs, actual costs, and earned value metrics in real-time. Project managers can analyze cost and schedule variances, calculate performance indices, and forecast project completion costs. The integration with Oracle\'s financial systems provides comprehensive cost control from estimation through project closeout.' }]
        },
        {
          _type: 'block',
          _key: 'primavera7',
          style: 'h2',
          children: [{ _type: 'span', text: 'Risk Analysis and Management' }]
        },
        {
          _type: 'block',
          _key: 'primavera8',
          style: 'normal',
          children: [{ _type: 'span', text: 'With Primavera Risk Analysis, organizations can perform Monte Carlo simulations to understand schedule and cost uncertainty. The platform identifies critical risks, calculates contingency reserves, and provides probabilistic forecasts for project completion. This risk-adjusted scheduling is essential for large capital projects where delays can cost millions per day.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Oracle Primavera Review 2024: Enterprise PPM for Complex Projects',
        metaDescription: 'Detailed Oracle Primavera review covering advanced scheduling, cost management, and risk analysis for construction and engineering projects.',
        keywords: ['oracle primavera review', 'primavera p6', 'construction project management', 'enterprise ppm', 'earned value management']
      }
    },

    // Notion Review
    {
      _type: 'software',
      name: 'Notion',
      slug: { _type: 'slug', current: 'notion' },
      tagline: 'All-in-one workspace for notes, docs, and project management',
      excerpt: 'Notion is a versatile workspace that combines note-taking, knowledge management, and project tracking in one flexible, customizable platform.',
      overallScore: 8.7,
      scores: {
        easeOfUse: 8.3,
        features: 8.5,
        integrations: 7.8,
        pricing: 8.5,
        support: 7.6,
        security: 8.2,
        scalability: 8.4,
        performance: 8.3,
        mobile: 8.5,
        documentation: 8.4,
        learningCurve: 7.9,
        customization: 9.2,
        reporting: 7.2,
        freeTier: 9.0,
        overallValue: 8.8
      },
      pricing: [
        {
          name: 'Free',
          price: 0,
          features: ['Unlimited blocks for individuals', 'Share with 5 guests', 'Sync across devices', '7 day page history'],
          userLimit: 'Personal use'
        },
        {
          name: 'Plus',
          price: 8,
          yearlyPrice: 96,
          features: ['Unlimited blocks for teams', 'Unlimited guests', '30 day page history', 'Unlimited file uploads'],
          userLimit: 'Per user/month'
        },
        {
          name: 'Business',
          price: 15,
          yearlyPrice: 180,
          features: ['SAML SSO', 'Private teamspaces', '90 day page history', 'Advanced permissions'],
          userLimit: 'Per user/month',
          recommended: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Advanced security', 'Audit log', 'Customer success manager', 'Unlimited page history'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Extremely flexible and customizable',
        'Great for knowledge management',
        'Clean, modern interface',
        'Excellent free tier',
        'Good mobile apps',
        'Database functionality',
        'Active community and templates'
      ],
      cons: [
        'Can be overwhelming initially',
        'Limited native integrations',
        'Not ideal for complex projects',
        'Performance issues with large databases',
        'Limited offline functionality',
        'Basic project management features'
      ],
      content: [
        {
          _type: 'block',
          _key: 'notion1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Notion: The Shape-Shifting Workspace' }]
        },
        {
          _type: 'block',
          _key: 'notion2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Notion has revolutionized how teams think about productivity tools by providing a flexible canvas that can morph into whatever you need. Part wiki, part database, part project management tool, Notion\'s strength lies in its adaptability. Companies like Figma, Pixar, and Spotify use Notion to manage everything from product roadmaps to company handbooks.' }]
        },
        {
          _type: 'block',
          _key: 'notion3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Blocks and Databases: The Building Blocks' }]
        },
        {
          _type: 'block',
          _key: 'notion4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Notion\'s block-based system allows users to combine different content types—text, images, databases, embeds—on a single page. The database functionality is particularly powerful, supporting multiple views (table, board, timeline, calendar, gallery) of the same data. This flexibility enables teams to create custom project management systems, CRMs, content calendars, or any other structured data system they need.' }]
        },
        {
          _type: 'block',
          _key: 'notion5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Knowledge Management Excellence' }]
        },
        {
          _type: 'block',
          _key: 'notion6',
          style: 'normal',
          children: [{ _type: 'span', text: 'Where Notion truly shines is knowledge management. The bi-directional linking, nested pages, and powerful search make it ideal for building company wikis and documentation. Teams can create interconnected knowledge bases that evolve with the organization. The synced blocks feature allows information to stay updated across multiple pages, ensuring consistency in documentation.' }]
        },
        {
          _type: 'block',
          _key: 'notion7',
          style: 'h2',
          children: [{ _type: 'span', text: 'AI Integration and Future' }]
        },
        {
          _type: 'block',
          _key: 'notion8',
          style: 'normal',
          children: [{ _type: 'span', text: 'Notion AI brings artificial intelligence directly into the workspace. Users can generate content, summarize documents, extract action items, and translate text without leaving Notion. The AI can help with everything from writing first drafts to analyzing meeting notes. This integration of AI with the flexible workspace creates powerful possibilities for productivity enhancement.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Notion Review 2024: All-in-One Workspace for Teams',
        metaDescription: 'Comprehensive Notion review covering its flexibility as a project management tool, knowledge base, and collaborative workspace for modern teams.',
        keywords: ['notion review', 'notion workspace', 'knowledge management', 'flexible project management', 'all-in-one productivity']
      }
    },

    // Trello Review
    {
      _type: 'software',
      name: 'Trello',
      slug: { _type: 'slug', current: 'trello' },
      tagline: 'Simple, visual project management with Kanban boards',
      excerpt: 'Trello brings simplicity to project management with its intuitive Kanban board interface, making it perfect for visual thinkers and small teams.',
      overallScore: 8.4,
      scores: {
        easeOfUse: 9.5,
        features: 7.8,
        integrations: 8.6,
        pricing: 8.8,
        support: 8.0,
        security: 8.3,
        scalability: 7.5,
        performance: 8.7,
        mobile: 9.0,
        documentation: 8.2,
        learningCurve: 9.3,
        customization: 7.9,
        reporting: 6.8,
        freeTier: 9.2,
        overallValue: 8.6
      },
      pricing: [
        {
          name: 'Free',
          price: 0,
          features: ['Unlimited personal boards', 'Unlimited cards', 'Up to 10 team boards', '10MB file attachments'],
          userLimit: 'Unlimited users'
        },
        {
          name: 'Standard',
          price: 5,
          yearlyPrice: 60,
          features: ['Unlimited boards', 'Advanced checklists', 'Custom fields', '250MB file attachments'],
          userLimit: 'Per user/month',
          recommended: true
        },
        {
          name: 'Premium',
          price: 10,
          yearlyPrice: 120,
          features: ['Multiple views', 'Unlimited automation', 'Admin controls', 'Unlimited file attachments'],
          userLimit: 'Per user/month'
        },
        {
          name: 'Enterprise',
          price: 17.50,
          yearlyPrice: 210,
          features: ['Unlimited workspaces', 'Enterprise security', 'Power-Up admin', 'Priority support'],
          userLimit: 'Per user/month'
        }
      ],
      pros: [
        'Extremely easy to use',
        'Visual and intuitive',
        'Generous free tier',
        'Excellent mobile apps',
        'Great for small teams',
        'Strong Power-Ups ecosystem',
        'Part of Atlassian suite'
      ],
      cons: [
        'Limited for complex projects',
        'Basic reporting features',
        'Can get cluttered quickly',
        'No native Gantt charts',
        'Limited views in lower tiers',
        'Not ideal for large teams'
      ],
      content: [
        {
          _type: 'block',
          _key: 'trello1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Trello: Visual Simplicity in Project Management' }]
        },
        {
          _type: 'block',
          _key: 'trello2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Trello pioneered the use of Kanban boards in digital project management, making it one of the most recognizable and beloved tools in the space. Acquired by Atlassian in 2017, Trello maintains its commitment to simplicity while gradually adding more powerful features. With over 50 million users, it\'s the go-to choice for teams that value visual organization and ease of use over complex functionality.' }]
        },
        {
          _type: 'block',
          _key: 'trello3',
          style: 'h2',
          children: [{ _type: 'span', text: 'The Power of Visual Simplicity' }]
        },
        {
          _type: 'block',
          _key: 'trello4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Trello\'s card-based system makes project management tangible and intuitive. Each card represents a task that can be dragged across lists representing different stages of work. This visual metaphor is instantly understandable, requiring virtually no training. Cards can contain checklists, attachments, due dates, members, and comments, providing surprising depth beneath the simple surface.' }]
        },
        {
          _type: 'block',
          _key: 'trello5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Power-Ups: Extending Functionality' }]
        },
        {
          _type: 'block',
          _key: 'trello6',
          style: 'normal',
          children: [{ _type: 'span', text: 'Trello\'s Power-Ups system transforms the simple board into a powerful platform. With hundreds of Power-Ups available, teams can add features like time tracking, calendar views, custom fields, and integrations with tools like Slack, Google Drive, and Salesforce. Butler, Trello\'s automation tool, allows users to create rules, buttons, and scheduled commands without any coding knowledge.' }]
        },
        {
          _type: 'block',
          _key: 'trello7',
          style: 'h2',
          children: [{ _type: 'span', text: 'Best Use Cases and Limitations' }]
        },
        {
          _type: 'block',
          _key: 'trello8',
          style: 'normal',
          children: [{ _type: 'span', text: 'Trello excels for content calendars, personal task management, small team coordination, and any workflow that benefits from visual organization. It\'s particularly popular among creative teams, startups, and educators. However, teams managing complex projects with dependencies, detailed resource planning, or extensive reporting needs may find Trello limiting and should consider more robust alternatives.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Trello Review 2024: Simple Visual Project Management',
        metaDescription: 'In-depth Trello review exploring its Kanban board system, Power-Ups, automation features, and suitability for different team types and projects.',
        keywords: ['trello review', 'kanban project management', 'visual task management', 'trello boards', 'simple project management']
      }
    }
  ]

  for (const review of reviews) {
    try {
      console.log(`Creating review for ${review.name}...`)
      const result = await client.create(review)
      console.log(`✓ Created ${review.name} - ID: ${result._id}`)
    } catch (error) {
      console.error(`✗ Error creating ${review.name}:`, error)
    }
  }
}

createReviewsBatch2().then(() => {
  console.log('Batch 2 reviews created!')
})