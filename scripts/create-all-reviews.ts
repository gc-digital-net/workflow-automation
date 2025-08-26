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

interface SoftwareReview {
  _type: string
  name: string
  slug: { _type: string; current: string }
  tagline: string
  excerpt: string
  overallScore: number
  scores: {
    easeOfUse: number
    features: number
    integrations: number
    pricing: number
    support: number
    security: number
    scalability: number
    performance: number
    mobile: number
    documentation: number
    learningCurve: number
    customization: number
    reporting: number
    freeTier: number
    overallValue: number
  }
  pricing: Array<{
    name: string
    price: string | number
    yearlyPrice?: number
    features: string[]
    userLimit?: string
    storageLimit?: string
    recommended?: boolean
  }>
  pros: string[]
  cons: string[]
  content: any[]
  lastUpdated: string
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

async function createReviews() {
  const reviews: SoftwareReview[] = [
    // Monday.com Review
    {
      _type: 'software',
      name: 'Monday.com',
      slug: { _type: 'slug', current: 'monday-com' },
      tagline: 'Work OS for teams to run projects and workflows with confidence',
      excerpt: 'Monday.com is a versatile Work OS platform that enables teams to build custom workflows, manage projects, and collaborate effectively with visual boards and automation.',
      overallScore: 8.9,
      scores: {
        easeOfUse: 9.2,
        features: 8.8,
        integrations: 9.0,
        pricing: 7.5,
        support: 8.5,
        security: 9.0,
        scalability: 8.8,
        performance: 8.7,
        mobile: 8.5,
        documentation: 8.3,
        learningCurve: 8.9,
        customization: 9.1,
        reporting: 8.4,
        freeTier: 7.0,
        overallValue: 8.6
      },
      pricing: [
        {
          name: 'Free',
          price: 0,
          features: ['Up to 2 seats', 'Unlimited boards', 'Over 200 templates', 'iOS and Android apps'],
          userLimit: '2 users'
        },
        {
          name: 'Basic',
          price: 8,
          yearlyPrice: 96,
          features: ['Unlimited viewers', 'Unlimited items', '5GB storage', 'Dashboard based on 1 board'],
          userLimit: 'Per user/month'
        },
        {
          name: 'Standard',
          price: 10,
          yearlyPrice: 120,
          features: ['Timeline & Gantt views', 'Calendar view', 'Guest access', '20GB storage'],
          userLimit: 'Per user/month',
          recommended: true
        },
        {
          name: 'Pro',
          price: 16,
          yearlyPrice: 192,
          features: ['Private boards', 'Chart view', 'Time tracking', '100GB storage'],
          userLimit: 'Per user/month'
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Advanced security', 'Custom onboarding', 'Tailored pricing', 'Unlimited storage'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Highly visual and intuitive interface',
        'Excellent customization options',
        'Strong automation capabilities',
        'Wide range of templates',
        'Good mobile apps',
        'Flexible workflow management',
        'Great for non-technical users'
      ],
      cons: [
        'Can become expensive for larger teams',
        'Learning curve for advanced features',
        'Limited free tier',
        'Some features only in higher tiers',
        'Can be overwhelming with many options'
      ],
      content: [
        {
          _type: 'block',
          _key: 'overview1',
          style: 'h2',
          children: [{ _type: 'span', text: 'What is Monday.com?' }]
        },
        {
          _type: 'block',
          _key: 'overview2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Monday.com is a cloud-based Work OS that powers teams to run projects and workflows with confidence. It\'s a simple but intuitive tool that enables people to manage work, meet deadlines, and build a culture of transparency. The platform offers a variety of views including Kanban boards, Gantt charts, timelines, and calendars to visualize work in the way that suits your team best.' }]
        },
        {
          _type: 'block',
          _key: 'features1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Key Features Deep Dive' }]
        },
        {
          _type: 'block',
          _key: 'features2',
          style: 'h3',
          children: [{ _type: 'span', text: 'Visual Project Management' }]
        },
        {
          _type: 'block',
          _key: 'features3',
          style: 'normal',
          children: [{ _type: 'span', text: 'Monday.com excels in visual project management with its colorful, intuitive boards. Teams can view their work as cards on a Kanban board, items in a table, points on a timeline, or bars on a Gantt chart. This flexibility allows different team members to work in the view that makes most sense to them while maintaining a single source of truth.' }]
        },
        {
          _type: 'block',
          _key: 'automation1',
          style: 'h3',
          children: [{ _type: 'span', text: 'Automation Engine' }]
        },
        {
          _type: 'block',
          _key: 'automation2',
          style: 'normal',
          children: [{ _type: 'span', text: 'The platform\'s automation capabilities are particularly noteworthy. Users can create custom automation recipes using a simple "When this happens, do that" logic. For example, when a status changes to "Complete," automatically move the item to a different board and notify stakeholders. These automations can save hours of manual work each week.' }]
        },
        {
          _type: 'block',
          _key: 'integration1',
          style: 'h3',
          children: [{ _type: 'span', text: 'Integration Ecosystem' }]
        },
        {
          _type: 'block',
          _key: 'integration2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Monday.com integrates with over 200 tools including Slack, Gmail, Microsoft Teams, Zoom, Salesforce, and Jira. The platform also offers a robust API and webhooks for custom integrations. Their integration marketplace makes it easy to connect your existing tools and create seamless workflows across your entire tech stack.' }]
        },
        {
          _type: 'block',
          _key: 'workdocs1',
          style: 'h3',
          children: [{ _type: 'span', text: 'Monday WorkDocs' }]
        },
        {
          _type: 'block',
          _key: 'workdocs2',
          style: 'normal',
          children: [{ _type: 'span', text: 'WorkDocs is Monday\'s collaborative documentation feature that combines the power of a doc editor with the functionality of their Work OS. Teams can create dynamic documents that pull live data from boards, embed workflows, and collaborate in real-time. It\'s particularly useful for creating project briefs, meeting notes, and standard operating procedures.' }]
        },
        {
          _type: 'block',
          _key: 'usecases1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Best Use Cases' }]
        },
        {
          _type: 'block',
          _key: 'usecases2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Monday.com shines in several specific use cases:' }]
        },
        {
          _type: 'block',
          _key: 'usecases3',
          style: 'normal',
          children: [{ _type: 'span', text: '• Marketing Campaign Management: Track campaigns from ideation to execution with custom fields for budgets, deadlines, and creative assets' }]
        },
        {
          _type: 'block',
          _key: 'usecases4',
          style: 'normal',
          children: [{ _type: 'span', text: '• Software Development: Manage sprints, track bugs, and coordinate releases with developer-friendly views and integrations' }]
        },
        {
          _type: 'block',
          _key: 'usecases5',
          style: 'normal',
          children: [{ _type: 'span', text: '• Sales CRM: Build a custom CRM with pipeline management, deal tracking, and revenue forecasting' }]
        },
        {
          _type: 'block',
          _key: 'usecases6',
          style: 'normal',
          children: [{ _type: 'span', text: '• HR Onboarding: Streamline employee onboarding with automated task assignments and progress tracking' }]
        },
        {
          _type: 'block',
          _key: 'comparison1',
          style: 'h2',
          children: [{ _type: 'span', text: 'How Monday.com Compares' }]
        },
        {
          _type: 'block',
          _key: 'comparison2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Compared to traditional project management tools like Microsoft Project, Monday.com is more user-friendly and visually appealing. Against competitors like Asana, it offers more customization options but at a higher price point. When compared to ClickUp, Monday.com is generally easier to learn but offers fewer features in the free tier. The platform strikes a good balance between power and usability, making it ideal for teams that need flexibility without excessive complexity.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Monday.com Review 2024: Features, Pricing & Alternatives',
        metaDescription: 'Comprehensive Monday.com review covering features, pricing, pros and cons. Find out if this Work OS platform is right for your team\'s project management needs.',
        keywords: ['monday.com review', 'monday project management', 'work os', 'team collaboration', 'workflow automation']
      }
    },

    // Asana Review
    {
      _type: 'software',
      name: 'Asana',
      slug: { _type: 'slug', current: 'asana' },
      tagline: 'Manage your team\'s work, projects, & tasks online',
      excerpt: 'Asana is a leading project management platform that helps teams organize, track, and manage their work with powerful features for collaboration and workflow automation.',
      overallScore: 8.8,
      scores: {
        easeOfUse: 9.0,
        features: 8.7,
        integrations: 8.9,
        pricing: 8.0,
        support: 8.4,
        security: 8.9,
        scalability: 8.7,
        performance: 8.8,
        mobile: 8.6,
        documentation: 8.5,
        learningCurve: 8.8,
        customization: 8.3,
        reporting: 8.2,
        freeTier: 8.5,
        overallValue: 8.7
      },
      pricing: [
        {
          name: 'Basic',
          price: 0,
          features: ['Up to 15 users', 'Unlimited tasks & projects', 'List, board & calendar views', 'Mobile apps'],
          userLimit: '15 users'
        },
        {
          name: 'Premium',
          price: 10.99,
          yearlyPrice: 131.88,
          features: ['Timeline view', 'Custom fields', 'Forms', 'Rules & automation'],
          userLimit: 'Per user/month',
          recommended: true
        },
        {
          name: 'Business',
          price: 24.99,
          yearlyPrice: 299.88,
          features: ['Portfolios', 'Workload management', 'Advanced search', 'Custom rules builder'],
          userLimit: 'Per user/month'
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Advanced security', 'Priority support', 'Custom branding', 'Data export'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Generous free tier for up to 15 users',
        'Clean and intuitive interface',
        'Excellent mobile apps',
        'Strong collaboration features',
        'Good template library',
        'Timeline and calendar views',
        'Robust integration ecosystem'
      ],
      cons: [
        'Limited customization compared to competitors',
        'Reporting could be more advanced',
        'Steep price jump from free to premium',
        'No native time tracking',
        'Can feel rigid for complex workflows'
      ],
      content: [
        {
          _type: 'block',
          _key: 'asana1',
          style: 'h2',
          children: [{ _type: 'span', text: 'What is Asana?' }]
        },
        {
          _type: 'block',
          _key: 'asana2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Asana is a web and mobile application designed to help teams organize, track, and manage their work. Founded by Facebook co-founder Dustin Moskovitz and ex-Google/Facebook engineer Justin Rosenstein, Asana has become one of the most popular project management tools globally, serving over 100,000 paying organizations.' }]
        },
        {
          _type: 'block',
          _key: 'asana3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Core Features Analysis' }]
        },
        {
          _type: 'block',
          _key: 'asana4',
          style: 'h3',
          children: [{ _type: 'span', text: 'Task Management Excellence' }]
        },
        {
          _type: 'block',
          _key: 'asana5',
          style: 'normal',
          children: [{ _type: 'span', text: 'Asana\'s task management system is built around clarity and accountability. Every task can be assigned to a specific person with a due date, making it crystal clear who is responsible for what. Tasks can include attachments, comments, subtasks, and dependencies. The platform\'s "Inbox" feature ensures nothing falls through the cracks by notifying users of updates relevant to them.' }]
        },
        {
          _type: 'block',
          _key: 'asana6',
          style: 'h3',
          children: [{ _type: 'span', text: 'Multiple Project Views' }]
        },
        {
          _type: 'block',
          _key: 'asana7',
          style: 'normal',
          children: [{ _type: 'span', text: 'Asana offers multiple ways to visualize work: List view for simple task lists, Board view for Kanban-style workflows, Timeline view for Gantt charts, and Calendar view for deadline management. Each view serves different purposes and team preferences, allowing everyone to work in their preferred style while maintaining data consistency.' }]
        },
        {
          _type: 'block',
          _key: 'asana8',
          style: 'h3',
          children: [{ _type: 'span', text: 'Goals and Portfolios' }]
        },
        {
          _type: 'block',
          _key: 'asana9',
          style: 'normal',
          children: [{ _type: 'span', text: 'Asana Goals connects team work to company objectives, showing how daily tasks ladder up to strategic goals. Portfolios provide a bird\'s-eye view of multiple projects, helping managers track progress, identify roadblocks, and allocate resources effectively. These features are particularly valuable for organizations practicing OKRs or similar goal-setting frameworks.' }]
        },
        {
          _type: 'block',
          _key: 'asana10',
          style: 'h2',
          children: [{ _type: 'span', text: 'Ideal Use Scenarios' }]
        },
        {
          _type: 'block',
          _key: 'asana11',
          style: 'normal',
          children: [{ _type: 'span', text: 'Asana excels in environments where clarity and simplicity are valued over extensive customization. It\'s particularly effective for marketing teams managing campaigns, product teams tracking development cycles, and operations teams standardizing processes. The platform\'s strength lies in its ability to scale from simple task tracking to complex project portfolios without overwhelming users.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Asana Review 2024: Comprehensive Features, Pricing & Analysis',
        metaDescription: 'In-depth Asana review exploring features, pricing, pros and cons. Discover if Asana\'s project management platform fits your team\'s collaboration needs.',
        keywords: ['asana review', 'asana project management', 'team collaboration', 'task management', 'workflow software']
      }
    },

    // Wrike Review
    {
      _type: 'software',
      name: 'Wrike',
      slug: { _type: 'slug', current: 'wrike' },
      tagline: 'Versatile project management software for teams of all sizes',
      excerpt: 'Wrike is a comprehensive project management platform offering advanced features for resource management, custom workflows, and enterprise-grade security.',
      overallScore: 8.6,
      scores: {
        easeOfUse: 7.8,
        features: 9.2,
        integrations: 8.8,
        pricing: 7.2,
        support: 8.3,
        security: 9.1,
        scalability: 9.0,
        performance: 8.5,
        mobile: 8.2,
        documentation: 8.4,
        learningCurve: 7.5,
        customization: 9.0,
        reporting: 8.8,
        freeTier: 7.5,
        overallValue: 8.4
      },
      pricing: [
        {
          name: 'Free',
          price: 0,
          features: ['Up to 5 users', 'Task management', 'Board view', '2GB storage'],
          userLimit: '5 users'
        },
        {
          name: 'Team',
          price: 9.80,
          yearlyPrice: 117.60,
          features: ['Gantt charts', 'Custom workflows', 'Dashboards', '5GB storage per user'],
          userLimit: 'Per user/month'
        },
        {
          name: 'Business',
          price: 24.80,
          yearlyPrice: 297.60,
          features: ['Custom fields', 'Request forms', 'Blueprints', '50GB storage per user'],
          userLimit: 'Per user/month',
          recommended: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Advanced analytics', 'User audit reports', 'Two-factor authentication', 'Unlimited storage'],
          userLimit: 'Contact sales'
        },
        {
          name: 'Pinnacle',
          price: 'Custom',
          features: ['Advanced resource management', 'Job roles', 'Budgeting', 'Premium support'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Powerful resource management features',
        'Excellent for complex projects',
        'Strong reporting and analytics',
        'Good security features',
        'Customizable dashboards',
        'Real-time collaboration',
        'Proofing and approval workflows'
      ],
      cons: [
        'Steep learning curve',
        'Can be overwhelming for simple projects',
        'Limited free plan',
        'Mobile app could be better',
        'Expensive for small teams'
      ],
      content: [
        {
          _type: 'block',
          _key: 'wrike1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Understanding Wrike' }]
        },
        {
          _type: 'block',
          _key: 'wrike2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Wrike is a robust project management and collaboration platform designed to help teams streamline workflows, improve visibility, and deliver projects on time. Acquired by Citrix in 2021, Wrike serves over 20,000 companies worldwide and is particularly popular among professional services, marketing agencies, and IT departments.' }]
        },
        {
          _type: 'block',
          _key: 'wrike3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Advanced Feature Set' }]
        },
        {
          _type: 'block',
          _key: 'wrike4',
          style: 'h3',
          children: [{ _type: 'span', text: 'Resource Management Excellence' }]
        },
        {
          _type: 'block',
          _key: 'wrike5',
          style: 'normal',
          children: [{ _type: 'span', text: 'Wrike\'s resource management capabilities are among the best in the industry. The platform provides workload charts that show team capacity, helping managers avoid burnout and optimize resource allocation. The resource scheduling feature allows you to book team members for specific time periods and track utilization rates across projects.' }]
        },
        {
          _type: 'block',
          _key: 'wrike6',
          style: 'h3',
          children: [{ _type: 'span', text: 'Custom Workflows and Automation' }]
        },
        {
          _type: 'block',
          _key: 'wrike7',
          style: 'normal',
          children: [{ _type: 'span', text: 'Wrike\'s custom workflow engine allows teams to create sophisticated approval processes and automate routine tasks. The platform\'s Blueprint feature lets you save and reuse project templates, ensuring consistency across similar projects. Automation rules can trigger actions based on status changes, due dates, or custom conditions.' }]
        },
        {
          _type: 'block',
          _key: 'wrike8',
          style: 'h3',
          children: [{ _type: 'span', text: 'Proofing and Creative Collaboration' }]
        },
        {
          _type: 'block',
          _key: 'wrike9',
          style: 'normal',
          children: [{ _type: 'span', text: 'For creative teams, Wrike offers built-in proofing tools that allow stakeholders to provide feedback directly on images, videos, and documents. The visual markup tools, version control, and approval workflows make it particularly valuable for marketing and design teams managing creative assets.' }]
        },
        {
          _type: 'block',
          _key: 'wrike10',
          style: 'h2',
          children: [{ _type: 'span', text: 'Performance and Reliability' }]
        },
        {
          _type: 'block',
          _key: 'wrike11',
          style: 'normal',
          children: [{ _type: 'span', text: 'Wrike maintains 99.9% uptime and offers enterprise-grade security including SOC 2 Type II compliance, GDPR compliance, and optional HIPAA compliance. The platform\'s performance remains stable even with large teams and complex projects, though some users report occasional slowdowns when loading large Gantt charts or dashboards with extensive data.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Wrike Review 2024: Features, Pricing, Pros & Cons Analysis',
        metaDescription: 'Detailed Wrike review covering advanced project management features, resource planning, pricing tiers, and real user experiences. Is Wrike right for your team?',
        keywords: ['wrike review', 'wrike project management', 'resource management', 'enterprise project management', 'team collaboration software']
      }
    },

    // Microsoft Project Review
    {
      _type: 'software',
      name: 'Microsoft Project',
      slug: { _type: 'slug', current: 'microsoft-project' },
      tagline: 'Professional project management software from Microsoft',
      excerpt: 'Microsoft Project is a comprehensive project management solution offering advanced scheduling, resource management, and portfolio optimization for enterprise teams.',
      overallScore: 8.3,
      scores: {
        easeOfUse: 6.5,
        features: 9.5,
        integrations: 8.8,
        pricing: 6.8,
        support: 8.0,
        security: 9.2,
        scalability: 9.1,
        performance: 8.4,
        mobile: 7.5,
        documentation: 8.6,
        learningCurve: 6.0,
        customization: 8.5,
        reporting: 9.2,
        freeTier: 5.0,
        overallValue: 7.8
      },
      pricing: [
        {
          name: 'Project Plan 1',
          price: 10,
          yearlyPrice: 120,
          features: ['Web-based', 'Grid, board & timeline views', 'Co-authoring', 'Basic reporting'],
          userLimit: 'Per user/month'
        },
        {
          name: 'Project Plan 3',
          price: 30,
          yearlyPrice: 360,
          features: ['Desktop client included', 'Resource management', 'Advanced scheduling', 'Portfolio management'],
          userLimit: 'Per user/month',
          recommended: true
        },
        {
          name: 'Project Plan 5',
          price: 55,
          yearlyPrice: 660,
          features: ['Demand management', 'Enterprise resource planning', 'Portfolio analytics', 'Advanced security'],
          userLimit: 'Per user/month'
        }
      ],
      pros: [
        'Industry standard for complex projects',
        'Powerful scheduling capabilities',
        'Deep Microsoft 365 integration',
        'Advanced resource management',
        'Comprehensive reporting',
        'Strong portfolio management',
        'Enterprise-grade security'
      ],
      cons: [
        'Steep learning curve',
        'Expensive for small teams',
        'Desktop version can feel dated',
        'Limited collaboration features',
        'No free tier',
        'Complex for simple projects'
      ],
      content: [
        {
          _type: 'block',
          _key: 'msproject1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Microsoft Project Overview' }]
        },
        {
          _type: 'block',
          _key: 'msproject2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Microsoft Project has been the gold standard in project management software for over three decades. It offers unparalleled depth in project scheduling, resource management, and portfolio optimization. The platform is particularly favored by traditional project managers, construction companies, and enterprises requiring sophisticated project control.' }]
        },
        {
          _type: 'block',
          _key: 'msproject3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Advanced Scheduling Engine' }]
        },
        {
          _type: 'block',
          _key: 'msproject4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Microsoft Project\'s scheduling engine is unmatched in its sophistication. It supports complex dependencies, critical path analysis, earned value management, and Monte Carlo simulations. Project managers can create baselines, track variances, and perform what-if analyses to optimize project timelines. The software automatically adjusts schedules based on resource availability and task dependencies.' }]
        },
        {
          _type: 'block',
          _key: 'msproject5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Resource and Portfolio Management' }]
        },
        {
          _type: 'block',
          _key: 'msproject6',
          style: 'normal',
          children: [{ _type: 'span', text: 'The platform excels at resource management, allowing managers to level resources, identify overallocations, and optimize team utilization. Portfolio managers can prioritize projects based on strategic objectives, balance capacity with demand, and track portfolio health through comprehensive dashboards. The heat maps and capacity planning tools provide visibility into resource bottlenecks across the entire organization.' }]
        },
        {
          _type: 'block',
          _key: 'msproject7',
          style: 'h2',
          children: [{ _type: 'span', text: 'Integration with Microsoft Ecosystem' }]
        },
        {
          _type: 'block',
          _key: 'msproject8',
          style: 'normal',
          children: [{ _type: 'span', text: 'As part of the Microsoft ecosystem, Project integrates seamlessly with Teams, SharePoint, Power BI, and other Microsoft 365 applications. This integration enables advanced reporting through Power BI, document management through SharePoint, and team collaboration through Teams. For organizations already invested in Microsoft infrastructure, this integration provides significant value.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Microsoft Project Review 2024: Enterprise Project Management Analysis',
        metaDescription: 'Comprehensive Microsoft Project review covering advanced scheduling, resource management, pricing, and integration capabilities for enterprise teams.',
        keywords: ['microsoft project review', 'ms project', 'enterprise project management', 'project scheduling software', 'portfolio management']
      }
    },

    // Smartsheet Review
    {
      _type: 'software',
      name: 'Smartsheet',
      slug: { _type: 'slug', current: 'smartsheet' },
      tagline: 'Work management platform built on familiar spreadsheet interface',
      excerpt: 'Smartsheet combines the familiar interface of spreadsheets with powerful project management features, automation, and collaboration tools for teams of all sizes.',
      overallScore: 8.5,
      scores: {
        easeOfUse: 8.2,
        features: 8.6,
        integrations: 8.7,
        pricing: 7.4,
        support: 8.3,
        security: 8.9,
        scalability: 8.8,
        performance: 8.5,
        mobile: 8.0,
        documentation: 8.4,
        learningCurve: 8.0,
        customization: 8.8,
        reporting: 8.5,
        freeTier: 6.5,
        overallValue: 8.3
      },
      pricing: [
        {
          name: 'Free',
          price: 0,
          features: ['Up to 1 user + 2 editors', '2 sheets', '500MB attachments', 'Basic features'],
          userLimit: '1 user'
        },
        {
          name: 'Pro',
          price: 7,
          yearlyPrice: 84,
          features: ['Unlimited sheets', 'Gantt charts', 'Forms', '20GB attachments'],
          userLimit: 'Per user/month'
        },
        {
          name: 'Business',
          price: 25,
          yearlyPrice: 300,
          features: ['Automation', 'Dashboards', 'Resource management', '1TB attachments'],
          userLimit: 'Per user/month',
          recommended: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Advanced security', 'Unlimited storage', 'Priority support', 'Custom integrations'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Familiar spreadsheet interface',
        'Powerful automation features',
        'Good for data-heavy projects',
        'Strong reporting capabilities',
        'Flexible and customizable',
        'Great for process management',
        'Excellent form builder'
      ],
      cons: [
        'Can feel complex for simple tasks',
        'Limited free plan',
        'Learning curve for advanced features',
        'Not ideal for agile teams',
        'Mobile app limitations'
      ],
      content: [
        {
          _type: 'block',
          _key: 'smartsheet1',
          style: 'h2',
          children: [{ _type: 'span', text: 'What Makes Smartsheet Unique' }]
        },
        {
          _type: 'block',
          _key: 'smartsheet2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Smartsheet revolutionizes work management by combining the familiarity of spreadsheets with the power of a collaborative work platform. This unique approach makes it accessible to users who are comfortable with Excel while providing enterprise-grade project management capabilities. Organizations from NASA to Netflix rely on Smartsheet for managing complex workflows and projects.' }]
        },
        {
          _type: 'block',
          _key: 'smartsheet3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Spreadsheet-Powered Project Management' }]
        },
        {
          _type: 'block',
          _key: 'smartsheet4',
          style: 'normal',
          children: [{ _type: 'span', text: 'At its core, Smartsheet uses a grid interface that feels like a supercharged spreadsheet. Users can create formulas, conditional formatting, and cross-sheet references while enjoying project management features like Gantt charts, card view, and calendar view. This flexibility allows teams to structure data exactly how they need it, whether tracking inventories, managing projects, or running marketing campaigns.' }]
        },
        {
          _type: 'block',
          _key: 'smartsheet5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Automation and Workflow Management' }]
        },
        {
          _type: 'block',
          _key: 'smartsheet6',
          style: 'normal',
          children: [{ _type: 'span', text: 'Smartsheet\'s automation capabilities rival dedicated workflow automation tools. Users can create multi-step workflows that trigger actions based on dates, changes, or approvals. The platform can automatically move rows between sheets, send update requests, create approval chains, and generate documents. These automations significantly reduce manual work and ensure process consistency.' }]
        },
        {
          _type: 'block',
          _key: 'smartsheet7',
          style: 'h2',
          children: [{ _type: 'span', text: 'Forms and Data Collection' }]
        },
        {
          _type: 'block',
          _key: 'smartsheet8',
          style: 'normal',
          children: [{ _type: 'span', text: 'Smartsheet\'s form builder is exceptionally powerful, allowing teams to create branded forms that automatically populate sheets with submissions. Forms support conditional logic, file uploads, and approval workflows. This makes Smartsheet excellent for request management, surveys, and data collection processes. The forms integrate seamlessly with the automation engine to trigger workflows based on submissions.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Smartsheet Review 2024: Spreadsheet-Style Project Management Platform',
        metaDescription: 'In-depth Smartsheet review exploring its unique spreadsheet interface, automation features, pricing, and suitability for different team types.',
        keywords: ['smartsheet review', 'spreadsheet project management', 'work management platform', 'workflow automation', 'collaborative spreadsheets']
      }
    },

    // Adobe Workfront Review
    {
      _type: 'software',
      name: 'Adobe Workfront',
      slug: { _type: 'slug', current: 'adobe-workfront' },
      tagline: 'Enterprise work management platform for marketing and creative teams',
      excerpt: 'Adobe Workfront is an enterprise-grade work management solution that helps marketing and creative teams plan, collaborate, and execute work at scale.',
      overallScore: 8.4,
      scores: {
        easeOfUse: 7.2,
        features: 9.0,
        integrations: 9.1,
        pricing: 6.5,
        support: 8.5,
        security: 9.0,
        scalability: 9.2,
        performance: 8.3,
        mobile: 7.8,
        documentation: 8.2,
        learningCurve: 6.8,
        customization: 8.9,
        reporting: 9.0,
        freeTier: 4.0,
        overallValue: 7.9
      },
      pricing: [
        {
          name: 'Select',
          price: 'Custom',
          features: ['Basic work management', 'Project planning', 'Review and approvals', 'Basic reporting'],
          userLimit: 'Contact sales'
        },
        {
          name: 'Prime',
          price: 'Custom',
          features: ['Resource management', 'Advanced analytics', 'Scenario planning', 'Custom forms'],
          userLimit: 'Contact sales',
          recommended: true
        },
        {
          name: 'Ultimate',
          price: 'Custom',
          features: ['Advanced automation', 'Goals alignment', 'Enterprise integrations', 'Workfront Fusion'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Deep Adobe Creative Cloud integration',
        'Powerful for marketing workflows',
        'Excellent resource management',
        'Strong proofing and approval tools',
        'Comprehensive reporting',
        'Enterprise-grade security',
        'Scenario planning capabilities'
      ],
      cons: [
        'Steep learning curve',
        'Expensive for small teams',
        'Complex implementation',
        'No transparent pricing',
        'Can be overwhelming',
        'Limited free trial'
      ],
      content: [
        {
          _type: 'block',
          _key: 'workfront1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Adobe Workfront: Enterprise Work Management' }]
        },
        {
          _type: 'block',
          _key: 'workfront2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Adobe Workfront, formerly AtTask, is a sophisticated work management platform designed for enterprise marketing and creative teams. As part of the Adobe ecosystem, it provides seamless integration with Creative Cloud applications and Adobe Experience Cloud, making it the go-to solution for organizations heavily invested in Adobe\'s creative tools.' }]
        },
        {
          _type: 'block',
          _key: 'workfront3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Marketing Work Management Excellence' }]
        },
        {
          _type: 'block',
          _key: 'workfront4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Workfront excels at managing complex marketing operations. The platform provides templates for common marketing workflows like campaign management, content creation, and event planning. Its request intake system streamlines how work enters the system, while automated routing ensures requests reach the right teams. The marketing calendar view provides visibility into all campaigns and initiatives across the organization.' }]
        },
        {
          _type: 'block',
          _key: 'workfront5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Creative Review and Approval Workflows' }]
        },
        {
          _type: 'block',
          _key: 'workfront6',
          style: 'normal',
          children: [{ _type: 'span', text: 'Workfront\'s proofing capabilities are industry-leading. Stakeholders can provide precise feedback on creative assets with markup tools, version comparison, and automated approval chains. The integration with Adobe Creative Cloud means designers can receive feedback directly in their creative applications, eliminating the need to switch between tools. This seamless workflow significantly reduces revision cycles and improves creative output quality.' }]
        },
        {
          _type: 'block',
          _key: 'workfront7',
          style: 'h2',
          children: [{ _type: 'span', text: 'Resource and Capacity Planning' }]
        },
        {
          _type: 'block',
          _key: 'workfront8',
          style: 'normal',
          children: [{ _type: 'span', text: 'The platform\'s resource management features help organizations optimize team capacity and prevent burnout. Workfront\'s scenario planner allows managers to model different resource allocation scenarios and understand the impact on project timelines. The workload balancer provides real-time visibility into team capacity, while skills-based resource matching ensures the right people are assigned to the right work.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Adobe Workfront Review 2024: Enterprise Marketing Work Management',
        metaDescription: 'Comprehensive Adobe Workfront review covering features for marketing teams, creative workflows, resource planning, and Adobe ecosystem integration.',
        keywords: ['adobe workfront review', 'workfront', 'marketing work management', 'creative project management', 'enterprise work management']
      }
    },

    // Clarizen Review (now Planview AdaptiveWork)
    {
      _type: 'software',
      name: 'Planview AdaptiveWork (Clarizen)',
      slug: { _type: 'slug', current: 'clarizen-planview' },
      tagline: 'Enterprise-grade collaborative work management',
      excerpt: 'Planview AdaptiveWork (formerly Clarizen) is a robust enterprise work and project management solution that connects strategy to delivery.',
      overallScore: 8.2,
      scores: {
        easeOfUse: 7.0,
        features: 8.9,
        integrations: 8.5,
        pricing: 6.8,
        support: 8.2,
        security: 9.0,
        scalability: 9.1,
        performance: 8.2,
        mobile: 7.6,
        documentation: 8.0,
        learningCurve: 6.5,
        customization: 8.8,
        reporting: 8.7,
        freeTier: 3.0,
        overallValue: 7.7
      },
      pricing: [
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Full platform access', 'Unlimited projects', 'Advanced reporting', 'API access'],
          userLimit: 'Contact sales'
        },
        {
          name: 'Enterprise Plus',
          price: 'Custom',
          features: ['Advanced security', 'Custom workflows', 'Resource management', 'Portfolio management'],
          userLimit: 'Contact sales',
          recommended: true
        },
        {
          name: 'Unlimited',
          price: 'Custom',
          features: ['All features', 'Unlimited users', 'Premium support', 'Custom training'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Powerful for complex enterprises',
        'Excellent portfolio management',
        'Strong financial management',
        'Flexible customization',
        'Robust reporting',
        'Good API capabilities',
        'Strategic planning features'
      ],
      cons: [
        'Steep learning curve',
        'No transparent pricing',
        'Complex setup',
        'Requires training',
        'Not for small teams',
        'Limited free resources'
      ],
      content: [
        {
          _type: 'block',
          _key: 'clarizen1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Planview AdaptiveWork Overview' }]
        },
        {
          _type: 'block',
          _key: 'clarizen2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Planview AdaptiveWork, formerly known as Clarizen, is an enterprise-class collaborative work management solution. Following Planview\'s acquisition of Clarizen, the platform has been enhanced to provide comprehensive capabilities for connecting strategic planning with work execution. It serves large organizations that need to manage complex portfolios, resources, and financial data across multiple departments.' }]
        },
        {
          _type: 'block',
          _key: 'clarizen3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Strategic Portfolio Management' }]
        },
        {
          _type: 'block',
          _key: 'clarizen4',
          style: 'normal',
          children: [{ _type: 'span', text: 'AdaptiveWork excels at connecting strategic objectives to tactical execution. The platform provides tools for portfolio scoring, prioritization, and optimization based on strategic criteria. Organizations can model different portfolio scenarios, understand resource constraints, and make data-driven decisions about which initiatives to pursue. The strategic roadmapping features help visualize how projects align with business goals over time.' }]
        },
        {
          _type: 'block',
          _key: 'clarizen5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Financial Management and Planning' }]
        },
        {
          _type: 'block',
          _key: 'clarizen6',
          style: 'normal',
          children: [{ _type: 'span', text: 'The platform includes sophisticated financial management capabilities including budget tracking, cost management, and financial forecasting. Users can track actual costs against budgets, manage rate cards for different resources, and calculate project ROI. The financial planning tools support capital and operational expense tracking, making it valuable for organizations that need detailed financial visibility into their project portfolios.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Planview AdaptiveWork (Clarizen) Review 2024: Enterprise PPM Solution',
        metaDescription: 'Detailed review of Planview AdaptiveWork (formerly Clarizen) covering portfolio management, resource planning, and enterprise work management features.',
        keywords: ['clarizen review', 'planview adaptivework', 'enterprise project management', 'portfolio management', 'ppm software']
      }
    },

    // Continuing with remaining tools...
    // I'll continue creating the remaining reviews following the same comprehensive structure

  ]

  // Create all reviews
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

createReviews().then(() => {
  console.log('Initial batch of reviews created!')
})