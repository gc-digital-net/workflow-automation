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

async function createReviewsBatch4() {
  const reviews = [
    // Jira Review
    {
      _type: 'software',
      name: 'Jira',
      slug: { _type: 'slug', current: 'jira' },
      tagline: 'Issue tracking and agile project management for software teams',
      excerpt: 'Jira is the leading software development tool used by agile teams to plan, track, and release great software with confidence.',
      overallScore: 8.6,
      scores: {
        easeOfUse: 7.2,
        features: 9.2,
        integrations: 9.3,
        pricing: 7.0,
        support: 8.3,
        security: 9.0,
        scalability: 9.1,
        performance: 8.2,
        mobile: 7.8,
        documentation: 8.7,
        learningCurve: 6.5,
        customization: 9.0,
        reporting: 8.8,
        freeTier: 8.0,
        overallValue: 8.3
      },
      pricing: [
        {
          name: 'Free',
          price: 0,
          features: ['Up to 10 users', 'Unlimited projects', 'Basic features', '2GB storage'],
          userLimit: '10 users'
        },
        {
          name: 'Standard',
          price: 7.75,
          yearlyPrice: 93,
          features: ['User permissions', 'Audit logs', '250GB storage', 'Project roles'],
          userLimit: 'Per user/month',
          recommended: true
        },
        {
          name: 'Premium',
          price: 15.25,
          yearlyPrice: 183,
          features: ['Advanced roadmaps', 'Sandbox', 'Unlimited storage', 'Advanced permissions'],
          userLimit: 'Per user/month'
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Unlimited sites', 'Enterprise security', '24/7 support', 'Advanced analytics'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Industry standard for software teams',
        'Powerful agile features',
        'Extensive customization',
        'Strong ecosystem',
        'Excellent integration options',
        'Advanced reporting',
        'Scalable architecture'
      ],
      cons: [
        'Steep learning curve',
        'Can be overwhelming',
        'Complex administration',
        'Performance issues at scale',
        'Not ideal for non-technical teams',
        'Requires expertise to optimize'
      ],
      content: [
        {
          _type: 'block',
          _key: 'jira1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Jira: The Software Development Standard' }]
        },
        {
          _type: 'block',
          _key: 'jira2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Jira has become synonymous with agile software development, serving over 65,000 companies worldwide. Created by Atlassian, Jira started as a bug tracking tool and evolved into a comprehensive platform for planning, tracking, and releasing software. Its deep agile features, extensive customization options, and integration ecosystem make it the default choice for software teams practicing Scrum, Kanban, or hybrid methodologies.' }]
        },
        {
          _type: 'block',
          _key: 'jira3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Agile Methodology Support' }]
        },
        {
          _type: 'block',
          _key: 'jira4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Jira provides comprehensive support for agile methodologies. Scrum teams get sprint planning, velocity tracking, and burndown charts. Kanban teams enjoy WIP limits, cumulative flow diagrams, and cycle time metrics. The platform handles complex scenarios like parallel sprints, cross-team dependencies, and scaled agile frameworks. Advanced roadmapping features help product managers communicate strategy while development teams focus on execution.' }]
        },
        {
          _type: 'block',
          _key: 'jira5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Customization and Workflows' }]
        },
        {
          _type: 'block',
          _key: 'jira6',
          style: 'normal',
          children: [{ _type: 'span', text: 'Jira\'s workflow engine is incredibly powerful, allowing teams to model any process. Custom issue types, fields, and screens ensure Jira fits your exact needs. The JQL (Jira Query Language) enables complex searches and filters. While this flexibility is powerful, it requires expertise to configure properly. Many organizations employ Jira administrators to manage and optimize their instances.' }]
        },
        {
          _type: 'block',
          _key: 'jira7',
          style: 'h2',
          children: [{ _type: 'span', text: 'Ecosystem and DevOps Integration' }]
        },
        {
          _type: 'block',
          _key: 'jira8',
          style: 'normal',
          children: [{ _type: 'span', text: 'Jira\'s strength lies partly in its ecosystem. Integration with Confluence provides documentation, Bitbucket enables code tracking, and thousands of marketplace apps add specialized functionality. The deep DevOps integrations mean commits, builds, and deployments can be tracked directly in Jira. This connected ecosystem provides end-to-end visibility from idea to production, making Jira the nerve center of software delivery.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Jira Review 2024: Agile Project Management for Software Teams',
        metaDescription: 'Comprehensive Jira review covering agile features, customization options, pricing, and why it\'s the industry standard for software development teams.',
        keywords: ['jira review', 'jira software', 'agile project management', 'scrum tools', 'atlassian jira']
      }
    },

    // Azure DevOps Review
    {
      _type: 'software',
      name: 'Azure DevOps',
      slug: { _type: 'slug', current: 'azure-devops' },
      tagline: 'Complete DevOps platform from Microsoft',
      excerpt: 'Azure DevOps provides developer services for teams to plan work, collaborate on code development, and build and deploy applications.',
      overallScore: 8.5,
      scores: {
        easeOfUse: 7.3,
        features: 9.1,
        integrations: 8.9,
        pricing: 8.6,
        support: 8.2,
        security: 9.2,
        scalability: 9.0,
        performance: 8.4,
        mobile: 7.4,
        documentation: 8.8,
        learningCurve: 6.8,
        customization: 8.6,
        reporting: 8.5,
        freeTier: 8.8,
        overallValue: 8.5
      },
      pricing: [
        {
          name: 'Basic',
          price: 0,
          features: ['5 users free', 'Unlimited private repos', 'Pipelines', 'Agile boards'],
          userLimit: 'First 5 users free'
        },
        {
          name: 'Basic + Test Plans',
          price: 52,
          yearlyPrice: 624,
          features: ['Manual testing', 'Exploratory testing', 'User acceptance testing', 'Test case management'],
          userLimit: 'Per user/month'
        },
        {
          name: 'Azure Pipelines',
          price: 'Usage-based',
          features: ['1 free parallel job', 'Additional parallel jobs $40/month', 'Unlimited minutes for public projects'],
          userLimit: 'Pay per use'
        }
      ],
      pros: [
        'Comprehensive DevOps suite',
        'Excellent CI/CD pipelines',
        'Great Microsoft integration',
        'Strong security features',
        'Good free tier',
        'Git and TFVC support',
        'Enterprise scalability'
      ],
      cons: [
        'Complex for small teams',
        'Microsoft-centric',
        'UI can be confusing',
        'Learning curve',
        'Mobile app limitations',
        'Performance issues with large repos'
      ],
      content: [
        {
          _type: 'block',
          _key: 'azuredevops1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Azure DevOps: Microsoft\'s Complete DevOps Solution' }]
        },
        {
          _type: 'block',
          _key: 'azuredevops2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Azure DevOps (formerly Visual Studio Team Services) provides a complete DevOps toolchain in a single product. It combines Azure Boards for work tracking, Azure Repos for code repositories, Azure Pipelines for CI/CD, Azure Test Plans for testing, and Azure Artifacts for package management. This integrated approach makes it particularly attractive for organizations seeking a unified DevOps platform.' }]
        },
        {
          _type: 'block',
          _key: 'azuredevops3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Azure Boards: Agile Project Management' }]
        },
        {
          _type: 'block',
          _key: 'azuredevops4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Azure Boards provides flexible work tracking with Kanban boards, backlogs, team dashboards, and custom reporting. It supports Scrum, Kanban, and custom processes. The integration with Azure Repos means work items link directly to code commits, pull requests, and builds. This traceability from requirement to deployment is invaluable for regulated industries and complex projects.' }]
        },
        {
          _type: 'block',
          _key: 'azuredevops5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Azure Pipelines: Industry-Leading CI/CD' }]
        },
        {
          _type: 'block',
          _key: 'azuredevops6',
          style: 'normal',
          children: [{ _type: 'span', text: 'Azure Pipelines is arguably the strongest component of Azure DevOps. It supports any language, platform, and cloud, with extensive built-in tasks and marketplace extensions. The YAML-based pipeline definitions enable infrastructure as code, while classic editor provides a visual approach. Free tier includes generous build minutes, making it attractive for open-source projects.' }]
        },
        {
          _type: 'block',
          _key: 'azuredevops7',
          style: 'h2',
          children: [{ _type: 'span', text: 'Microsoft Ecosystem Integration' }]
        },
        {
          _type: 'block',
          _key: 'azuredevops8',
          style: 'normal',
          children: [{ _type: 'span', text: 'For organizations using Microsoft technologies, Azure DevOps provides unmatched integration. It connects seamlessly with Visual Studio, VS Code, Microsoft Teams, and Azure cloud services. The platform supports both Git and Team Foundation Version Control (TFVC), accommodating different version control preferences. This flexibility and integration make it ideal for enterprises with existing Microsoft investments.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Azure DevOps Review 2024: Complete DevOps Platform Analysis',
        metaDescription: 'In-depth Azure DevOps review covering boards, repos, pipelines, test plans, and artifacts for complete DevOps lifecycle management.',
        keywords: ['azure devops review', 'microsoft devops', 'azure boards', 'azure pipelines', 'devops platform']
      }
    },

    // Linear Review
    {
      _type: 'software',
      name: 'Linear',
      slug: { _type: 'slug', current: 'linear' },
      tagline: 'The issue tracking tool you\'ll enjoy using',
      excerpt: 'Linear streamlines software development with a blazingly fast, beautifully designed issue tracking and project management tool built for modern teams.',
      overallScore: 8.7,
      scores: {
        easeOfUse: 9.1,
        features: 8.4,
        integrations: 8.2,
        pricing: 7.8,
        support: 8.0,
        security: 8.6,
        scalability: 8.3,
        performance: 9.5,
        mobile: 8.5,
        documentation: 8.3,
        learningCurve: 8.8,
        customization: 7.9,
        reporting: 7.6,
        freeTier: 7.5,
        overallValue: 8.4
      },
      pricing: [
        {
          name: 'Free',
          price: 0,
          features: ['Up to 10 users', 'Unlimited issues', 'Basic integrations', 'Community support'],
          userLimit: '10 users'
        },
        {
          name: 'Standard',
          price: 8,
          yearlyPrice: 96,
          features: ['Unlimited users', 'Priority support', 'Advanced integrations', 'SAML SSO'],
          userLimit: 'Per user/month',
          recommended: true
        },
        {
          name: 'Plus',
          price: 14,
          yearlyPrice: 168,
          features: ['Advanced security', 'SLA support', 'Custom roles', 'Audit logs'],
          userLimit: 'Per user/month'
        }
      ],
      pros: [
        'Incredibly fast performance',
        'Beautiful, intuitive design',
        'Excellent keyboard shortcuts',
        'Streamlined workflows',
        'Great for engineering teams',
        'Offline support',
        'Opinionated but effective'
      ],
      cons: [
        'Limited customization',
        'Opinionated workflows',
        'Basic reporting',
        'Not for non-technical teams',
        'Limited project views',
        'Newer platform'
      ],
      content: [
        {
          _type: 'block',
          _key: 'linear1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Linear: Speed and Design in Perfect Harmony' }]
        },
        {
          _type: 'block',
          _key: 'linear2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Linear represents a new generation of project management tools that prioritize speed, design, and developer experience. Built by former Uber and Airbnb engineers, Linear eliminates the frustrations of traditional issue trackers with instant page loads, thoughtful keyboard shortcuts, and a meticulously crafted interface. It\'s project management software that developers actually want to use.' }]
        },
        {
          _type: 'block',
          _key: 'linear3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Performance That Delights' }]
        },
        {
          _type: 'block',
          _key: 'linear4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Linear\'s performance is extraordinary—most actions complete in under 50ms. The app uses optimistic updates and offline support to feel instantaneous. Keyboard shortcuts for everything mean power users can navigate without touching the mouse. This speed isn\'t just about efficiency; it\'s about maintaining flow state and making project management feel effortless rather than burdensome.' }]
        },
        {
          _type: 'block',
          _key: 'linear5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Opinionated Workflows That Work' }]
        },
        {
          _type: 'block',
          _key: 'linear6',
          style: 'normal',
          children: [{ _type: 'span', text: 'Linear takes strong positions on how teams should work. Cycles (sprints) are fixed-length, issues have clear states, and projects follow consistent patterns. While less flexible than tools like Jira, these constraints lead to more consistent, predictable workflows. The built-in best practices help teams adopt proven methodologies without extensive configuration.' }]
        },
        {
          _type: 'block',
          _key: 'linear7',
          style: 'h2',
          children: [{ _type: 'span', text: 'Modern Engineering Integration' }]
        },
        {
          _type: 'block',
          _key: 'linear8',
          style: 'normal',
          children: [{ _type: 'span', text: 'Linear integrates deeply with modern engineering tools. GitHub and GitLab syncing is bidirectional, Slack notifications are contextual and actionable, and the API is comprehensive and well-documented. The Figma plugin brings design into the workflow, while Sentry integration connects errors to issues. These integrations feel native, not bolted on, creating a seamless engineering workflow.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Linear Review 2024: Fast, Modern Issue Tracking for Engineers',
        metaDescription: 'Comprehensive Linear review exploring its speed, design, opinionated workflows, and why engineering teams love this modern project management tool.',
        keywords: ['linear review', 'linear app', 'issue tracking', 'engineering project management', 'developer tools']
      }
    },

    // Shortcut (formerly Clubhouse) Review
    {
      _type: 'software',
      name: 'Shortcut',
      slug: { _type: 'slug', current: 'shortcut' },
      tagline: 'Project management for software teams',
      excerpt: 'Shortcut (formerly Clubhouse) provides intuitive project management that scales from startup to enterprise, balancing simplicity with powerful features.',
      overallScore: 8.2,
      scores: {
        easeOfUse: 8.6,
        features: 8.3,
        integrations: 8.1,
        pricing: 8.4,
        support: 7.9,
        security: 8.2,
        scalability: 8.4,
        performance: 8.5,
        mobile: 7.8,
        documentation: 8.0,
        learningCurve: 8.3,
        customization: 7.8,
        reporting: 7.7,
        freeTier: 8.2,
        overallValue: 8.3
      },
      pricing: [
        {
          name: 'Free',
          price: 0,
          features: ['Up to 10 users', 'Unlimited projects', 'Core features', 'Basic integrations'],
          userLimit: '10 users'
        },
        {
          name: 'Team',
          price: 8.50,
          yearlyPrice: 102,
          features: ['Unlimited users', 'Advanced features', 'Priority support', 'Enhanced security'],
          userLimit: 'Per user/month',
          recommended: true
        },
        {
          name: 'Business',
          price: 12,
          yearlyPrice: 144,
          features: ['SAML SSO', 'Advanced permissions', 'Custom fields', 'Dedicated support'],
          userLimit: 'Per user/month'
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Custom contracts', 'SLA support', 'Advanced security', 'Onboarding assistance'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Clean, intuitive interface',
        'Good balance of features',
        'Fast performance',
        'Excellent for small teams',
        'Easy to get started',
        'Fair pricing',
        'Good documentation'
      ],
      cons: [
        'Limited advanced features',
        'Basic reporting',
        'Could use more views',
        'Mobile app needs work',
        'Smaller ecosystem',
        'Less customizable than competitors'
      ],
      content: [
        {
          _type: 'block',
          _key: 'shortcut1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Shortcut: Balanced Project Management' }]
        },
        {
          _type: 'block',
          _key: 'shortcut2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Shortcut, formerly known as Clubhouse, strikes an impressive balance between simplicity and functionality. While tools like Jira can overwhelm and simple tools like Trello may lack depth, Shortcut finds the sweet spot for software teams that need more than basic task tracking but don\'t want enterprise complexity. The recent rebrand to Shortcut reflects their mission to help teams work more efficiently.' }]
        },
        {
          _type: 'block',
          _key: 'shortcut3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Stories, Epics, and Milestones' }]
        },
        {
          _type: 'block',
          _key: 'shortcut4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Shortcut organizes work into Stories (tasks), Epics (features), and Milestones (releases). This three-level hierarchy provides enough structure for complex projects without overwhelming complexity. The drag-and-drop interface makes reorganizing work intuitive, while the automatic progress rollups keep everyone informed. Teams can work at the level of detail that suits them, from individual tasks to strategic milestones.' }]
        },
        {
          _type: 'block',
          _key: 'shortcut5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Iterations and Velocity Tracking' }]
        },
        {
          _type: 'block',
          _key: 'shortcut6',
          style: 'normal',
          children: [{ _type: 'span', text: 'Shortcut\'s iteration planning helps teams maintain consistent delivery cadence. The velocity tracking and burndown charts provide insights into team performance without requiring complex configuration. The platform automatically calculates team velocity based on completed work, helping with future sprint planning. These agile features feel natural and helpful rather than prescriptive.' }]
        },
        {
          _type: 'block',
          _key: 'shortcut7',
          style: 'h2',
          children: [{ _type: 'span', text: 'Developer-Friendly Features' }]
        },
        {
          _type: 'block',
          _key: 'shortcut8',
          style: 'normal',
          children: [{ _type: 'span', text: 'Shortcut includes thoughtful features for developers like GitHub/GitLab integration, API access, and webhook support. The keyboard shortcuts speed up common actions, while the command palette provides quick access to any feature. The clean design reduces cognitive load, allowing developers to focus on work rather than wrestling with the tool.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Shortcut Review 2024: Balanced Project Management for Software Teams',
        metaDescription: 'Detailed Shortcut (formerly Clubhouse) review covering features, pricing, and why it\'s the sweet spot between simple and complex project management.',
        keywords: ['shortcut review', 'clubhouse project management', 'shortcut app', 'software team tools', 'agile project management']
      }
    },

    // PivotalTracker Review
    {
      _type: 'software',
      name: 'Pivotal Tracker',
      slug: { _type: 'slug', current: 'pivotal-tracker' },
      tagline: 'Agile project management with automatic planning',
      excerpt: 'Pivotal Tracker uses velocity-based planning to help agile teams deliver software predictably, with automatic scheduling based on team performance.',
      overallScore: 7.9,
      scores: {
        easeOfUse: 7.8,
        features: 8.0,
        integrations: 7.6,
        pricing: 8.3,
        support: 7.7,
        security: 8.1,
        scalability: 7.9,
        performance: 8.2,
        mobile: 7.5,
        documentation: 7.9,
        learningCurve: 7.4,
        customization: 6.8,
        reporting: 7.8,
        freeTier: 8.5,
        overallValue: 8.0
      },
      pricing: [
        {
          name: 'Free',
          price: 0,
          features: ['Up to 5 users', 'Unlimited projects', 'Core features', 'Basic integrations'],
          userLimit: '5 users'
        },
        {
          name: 'Startup',
          price: 10,
          yearlyPrice: 120,
          features: ['Up to 10 users', 'Priority support', 'Advanced features', 'API access'],
          userLimit: 'Flat rate for 10 users'
        },
        {
          name: 'Standard',
          price: 6.50,
          yearlyPrice: 78,
          features: ['Unlimited users', 'All features', 'Premium support', 'Advanced analytics'],
          userLimit: 'Per user/month',
          recommended: true
        }
      ],
      pros: [
        'Automatic velocity planning',
        'Predictable scheduling',
        'Simple, focused interface',
        'Good for strict agile',
        'Affordable pricing',
        'Clear story workflow',
        'Consistent methodology'
      ],
      cons: [
        'Rigid methodology',
        'Limited customization',
        'Not for non-agile teams',
        'Basic reporting',
        'Dated interface',
        'Limited views'
      ],
      content: [
        {
          _type: 'block',
          _key: 'pivotal1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Pivotal Tracker: Velocity-Driven Development' }]
        },
        {
          _type: 'block',
          _key: 'pivotal2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Pivotal Tracker takes a unique approach to agile project management by automatically scheduling work based on team velocity. Rather than manually planning sprints, Pivotal Tracker continuously adjusts the schedule based on actual team performance. This data-driven approach removes guesswork from planning and helps teams deliver predictably.' }]
        },
        {
          _type: 'block',
          _key: 'pivotal3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Automatic Velocity and Planning' }]
        },
        {
          _type: 'block',
          _key: 'pivotal4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Pivotal Tracker\'s velocity calculation is its defining feature. The system tracks how many story points teams complete per iteration and uses this rolling average to predict future capacity. Stories automatically flow into iterations based on priority and velocity, showing realistic completion dates. This automation eliminates planning meetings and provides stakeholders with reliable delivery forecasts.' }]
        },
        {
          _type: 'block',
          _key: 'pivotal5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Story-Driven Workflow' }]
        },
        {
          _type: 'block',
          _key: 'pivotal6',
          style: 'normal',
          children: [{ _type: 'span', text: 'Every piece of work in Pivotal Tracker is a story with a clear lifecycle: unstarted, started, finished, delivered, accepted. This workflow enforces discipline around story completion and acceptance criteria. The linear backlog prioritization ensures teams always work on the most important items. While rigid, this structure brings clarity and consistency to the development process.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Pivotal Tracker Review 2024: Velocity-Based Agile Project Management',
        metaDescription: 'In-depth Pivotal Tracker review covering automatic velocity planning, story workflow, and predictive scheduling for agile teams.',
        keywords: ['pivotal tracker review', 'velocity planning', 'agile project management', 'story tracking', 'pivotal tracker pricing']
      }
    },

    // Rally (Broadcom) Review
    {
      _type: 'software',
      name: 'Rally (Broadcom)',
      slug: { _type: 'slug', current: 'rally-broadcom' },
      tagline: 'Enterprise agile planning and tracking',
      excerpt: 'Rally, now part of Broadcom, provides enterprise-scale agile planning, tracking, and portfolio management for large organizations.',
      overallScore: 7.8,
      scores: {
        easeOfUse: 6.8,
        features: 8.8,
        integrations: 8.2,
        pricing: 6.0,
        support: 7.5,
        security: 8.8,
        scalability: 9.0,
        performance: 7.6,
        mobile: 7.0,
        documentation: 7.8,
        learningCurve: 6.2,
        customization: 8.5,
        reporting: 8.6,
        freeTier: 2.0,
        overallValue: 7.3
      },
      pricing: [
        {
          name: 'Team Edition',
          price: 'Custom',
          features: ['Basic agile planning', 'Team-level features', 'Standard support', 'Basic reporting'],
          userLimit: 'Contact sales'
        },
        {
          name: 'Enterprise Edition',
          price: 'Custom',
          features: ['Portfolio management', 'Advanced analytics', 'Custom fields', 'API access'],
          userLimit: 'Contact sales',
          recommended: true
        },
        {
          name: 'Unlimited Edition',
          price: 'Custom',
          features: ['All features', 'Unlimited users', 'Premium support', 'Custom training'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Comprehensive enterprise features',
        'Strong portfolio management',
        'Scaled agile support',
        'Robust reporting',
        'Good for large organizations',
        'Mature platform',
        'Extensive customization'
      ],
      cons: [
        'Complex interface',
        'Expensive pricing',
        'Steep learning curve',
        'Requires training',
        'Slow performance',
        'Broadcom acquisition concerns'
      ],
      content: [
        {
          _type: 'block',
          _key: 'rally1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Rally: Enterprise Agile at Scale' }]
        },
        {
          _type: 'block',
          _key: 'rally2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Rally, now owned by Broadcom following the CA Technologies acquisition, remains a leading enterprise agile planning platform. Designed for large organizations practicing scaled agile, Rally provides comprehensive features for managing complex, multi-team initiatives. While the Broadcom acquisition has created uncertainty, Rally continues to serve thousands of enterprise customers managing mission-critical development efforts.' }]
        },
        {
          _type: 'block',
          _key: 'rally3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Scaled Agile Framework Support' }]
        },
        {
          _type: 'block',
          _key: 'rally4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Rally excels at supporting scaled agile frameworks like SAFe, with features for program increments, value streams, and portfolio management. The platform handles complex dependency management across teams, provides roll-up reporting across the organization, and supports various agile methodologies simultaneously. This flexibility makes Rally suitable for large enterprises with diverse team structures and methodologies.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Rally (Broadcom) Review 2024: Enterprise Agile Planning Platform',
        metaDescription: 'Comprehensive Rally review covering enterprise agile planning, scaled agile support, portfolio management, and considerations post-Broadcom acquisition.',
        keywords: ['rally review', 'rally agile', 'broadcom rally', 'enterprise agile', 'scaled agile platform']
      }
    },

    // VersionOne Review
    {
      _type: 'software',
      name: 'VersionOne',
      slug: { _type: 'slug', current: 'versionone' },
      tagline: 'Enterprise agile planning and DevOps platform',
      excerpt: 'VersionOne, now Digital.ai Agility, provides comprehensive agile planning and management for enterprises scaling agile practices.',
      overallScore: 7.7,
      scores: {
        easeOfUse: 6.9,
        features: 8.6,
        integrations: 8.3,
        pricing: 6.2,
        support: 7.6,
        security: 8.5,
        scalability: 8.8,
        performance: 7.5,
        mobile: 6.8,
        documentation: 7.7,
        learningCurve: 6.3,
        customization: 8.4,
        reporting: 8.5,
        freeTier: 1.0,
        overallValue: 7.2
      },
      pricing: [
        {
          name: 'Team',
          price: 'Custom',
          features: ['Team-level planning', 'Basic reporting', 'Standard support', 'Core agile features'],
          userLimit: 'Contact sales'
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Portfolio management', 'Advanced analytics', 'Custom workflows', 'API access'],
          userLimit: 'Contact sales',
          recommended: true
        },
        {
          name: 'Ultimate',
          price: 'Custom',
          features: ['All features', 'DevOps integration', 'Premium support', 'Strategic planning'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Mature enterprise platform',
        'Strong SAFe support',
        'Comprehensive reporting',
        'Good portfolio features',
        'DevOps integration',
        'Scalable architecture'
      ],
      cons: [
        'Complex setup',
        'Dated interface',
        'Expensive',
        'Requires training',
        'Performance issues',
        'Limited modern features'
      ],
      content: [
        {
          _type: 'block',
          _key: 'versionone1',
          style: 'h2',
          children: [{ _type: 'span', text: 'VersionOne: Enterprise Agile Evolution' }]
        },
        {
          _type: 'block',
          _key: 'versionone2',
          style: 'normal',
          children: [{ _type: 'span', text: 'VersionOne, now rebranded as Digital.ai Agility, has been a cornerstone of enterprise agile transformation for over two decades. The platform provides comprehensive support for scaled agile implementations, from team-level execution to portfolio planning. Following its acquisition by Digital.ai, VersionOne has expanded its focus to include value stream management and DevOps integration.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'VersionOne (Digital.ai Agility) Review 2024: Enterprise Agile Platform',
        metaDescription: 'Detailed VersionOne review covering enterprise agile planning, SAFe support, portfolio management, and Digital.ai integration.',
        keywords: ['versionone review', 'digital.ai agility', 'enterprise agile', 'safe platform', 'agile planning']
      }
    },

    // Targetprocess Review
    {
      _type: 'software',
      name: 'Targetprocess',
      slug: { _type: 'slug', current: 'targetprocess' },
      tagline: 'Visual management for agile teams',
      excerpt: 'Targetprocess provides flexible visual management and planning tools for agile teams, with powerful customization and visualization capabilities.',
      overallScore: 8.0,
      scores: {
        easeOfUse: 7.3,
        features: 8.5,
        integrations: 7.8,
        pricing: 7.0,
        support: 7.7,
        security: 8.2,
        scalability: 8.3,
        performance: 7.9,
        mobile: 7.2,
        documentation: 7.8,
        learningCurve: 6.9,
        customization: 9.0,
        reporting: 8.3,
        freeTier: 6.0,
        overallValue: 7.8
      },
      pricing: [
        {
          name: 'Team',
          price: 20,
          yearlyPrice: 240,
          features: ['Visual planning', 'Custom views', 'Basic integrations', 'Standard support'],
          userLimit: 'Per user/month'
        },
        {
          name: 'Company',
          price: 'Custom',
          features: ['Advanced features', 'Portfolio management', 'Custom fields', 'API access'],
          userLimit: 'Contact sales',
          recommended: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['All features', 'Advanced security', 'Premium support', 'Custom training'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Highly customizable',
        'Excellent visualizations',
        'Flexible methodology support',
        'Good for complex projects',
        'Strong reporting',
        'Visual planning boards'
      ],
      cons: [
        'Steep learning curve',
        'Can be overwhelming',
        'Limited free tier',
        'Complex pricing',
        'Performance with large data',
        'Requires configuration'
      ],
      content: [
        {
          _type: 'block',
          _key: 'targetprocess1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Targetprocess: Visual Flexibility for Agile Teams' }]
        },
        {
          _type: 'block',
          _key: 'targetprocess2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Targetprocess, now known as Apptio Targetprocess following acquisition, stands out with its visual approach to agile management and extreme flexibility. The platform allows teams to create custom visualizations, workflows, and processes that match their exact needs. This flexibility makes it popular with organizations that have outgrown simpler tools but find enterprise solutions too rigid.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Targetprocess Review 2024: Visual Agile Management Platform',
        metaDescription: 'Comprehensive Targetprocess review covering visual planning, customization capabilities, flexible methodology support, and pricing.',
        keywords: ['targetprocess review', 'visual agile management', 'targetprocess pricing', 'flexible project management', 'apptio targetprocess']
      }
    },

    // Kanbanize Review
    {
      _type: 'software',
      name: 'Kanbanize',
      slug: { _type: 'slug', current: 'kanbanize' },
      tagline: 'Lean management platform for agile teams',
      excerpt: 'Kanbanize helps organizations apply Lean and Kanban practices at scale with advanced flow analytics and portfolio visualization.',
      overallScore: 8.1,
      scores: {
        easeOfUse: 7.6,
        features: 8.4,
        integrations: 7.7,
        pricing: 7.5,
        support: 8.0,
        security: 8.2,
        scalability: 8.5,
        performance: 8.3,
        mobile: 7.4,
        documentation: 8.1,
        learningCurve: 7.2,
        customization: 8.3,
        reporting: 8.6,
        freeTier: 7.0,
        overallValue: 8.0
      },
      pricing: [
        {
          name: 'Starter',
          price: 0,
          features: ['1 user', '1 board', 'Basic features', 'Community support'],
          userLimit: '1 user'
        },
        {
          name: 'Professional',
          price: 179,
          yearlyPrice: 2148,
          features: ['15 users', 'Unlimited boards', 'Analytics', 'Integrations'],
          userLimit: 'Up to 15 users',
          recommended: true
        },
        {
          name: 'Business',
          price: 349,
          yearlyPrice: 4188,
          features: ['30 users', 'Advanced analytics', 'Portfolio management', 'Priority support'],
          userLimit: 'Up to 30 users'
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Unlimited users', 'SSO', 'Advanced security', 'Dedicated support'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'True Kanban implementation',
        'Excellent flow analytics',
        'Portfolio Kanban',
        'WIP limits enforcement',
        'Cycle time tracking',
        'Good visualization',
        'Lean metrics'
      ],
      cons: [
        'Kanban-focused only',
        'Learning curve for Kanban',
        'Limited for other methodologies',
        'Pricing structure',
        'Mobile app limitations'
      ],
      content: [
        {
          _type: 'block',
          _key: 'kanbanize1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Kanbanize: Lean-Agile Management Excellence' }]
        },
        {
          _type: 'block',
          _key: 'kanbanize2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Kanbanize is purpose-built for organizations serious about Lean and Kanban methodologies. Unlike general project management tools with Kanban views, Kanbanize implements true Kanban principles including WIP limits, pull systems, and flow optimization. The platform scales from single teams to enterprise portfolio management while maintaining Lean principles throughout.' }]
        },
        {
          _type: 'block',
          _key: 'kanbanize3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Advanced Flow Analytics' }]
        },
        {
          _type: 'block',
          _key: 'kanbanize4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Kanbanize provides sophisticated analytics for understanding and optimizing flow. Cycle time histograms, throughput charts, and flow efficiency metrics help teams identify bottlenecks and improve delivery predictability. The Monte Carlo simulations provide probabilistic forecasting based on historical data, giving stakeholders reliable delivery estimates without arbitrary deadlines.' }]
        },
        {
          _type: 'block',
          _key: 'kanbanize5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Portfolio Kanban Management' }]
        },
        {
          _type: 'block',
          _key: 'kanbanize6',
          style: 'normal',
          children: [{ _type: 'span', text: 'The platform excels at scaling Kanban to the portfolio level. Initiative boards connect to team boards, creating a hierarchy of work that maintains visibility while respecting team autonomy. The timeline view shows initiative progress without imposing rigid planning, while dependency management helps coordinate across teams. This approach brings agility to portfolio management without sacrificing predictability.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Kanbanize Review 2024: Lean-Agile Management Platform',
        metaDescription: 'Detailed Kanbanize review covering Kanban implementation, flow analytics, portfolio management, and Lean-Agile practices.',
        keywords: ['kanbanize review', 'kanban software', 'lean management platform', 'flow analytics', 'portfolio kanban']
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

createReviewsBatch4().then(() => {
  console.log('Batch 4 reviews created! All reviews complete!')
})