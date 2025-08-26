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

async function createReviewsBatch3() {
  const reviews = [
    // Basecamp Review
    {
      _type: 'software',
      name: 'Basecamp',
      slug: { _type: 'slug', current: 'basecamp' },
      tagline: 'Organized simplicity for project management',
      excerpt: 'Basecamp offers a refreshingly simple approach to project management, focusing on essential features and clear communication over complexity.',
      overallScore: 8.2,
      scores: {
        easeOfUse: 9.2,
        features: 7.5,
        integrations: 7.2,
        pricing: 8.5,
        support: 8.3,
        security: 8.4,
        scalability: 7.8,
        performance: 8.6,
        mobile: 8.7,
        documentation: 8.1,
        learningCurve: 9.0,
        customization: 6.8,
        reporting: 6.5,
        freeTier: 8.8,
        overallValue: 8.4
      },
      pricing: [
        {
          name: 'Personal',
          price: 0,
          features: ['3 projects', '20 users', '1GB storage', 'All core features'],
          userLimit: 'Up to 20 users'
        },
        {
          name: 'Business',
          price: 99,
          yearlyPrice: 1188,
          features: ['Unlimited projects', 'Unlimited users', '500GB storage', 'Priority support'],
          userLimit: 'Flat rate',
          recommended: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['Advanced security', 'Custom onboarding', 'Dedicated support', 'Custom storage'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Simple, clean interface',
        'Flat-rate pricing',
        'Great for remote teams',
        'Excellent communication tools',
        'No feature bloat',
        'Good mobile apps',
        'Strong company philosophy'
      ],
      cons: [
        'Limited customization',
        'Basic reporting',
        'No Gantt charts',
        'Limited integrations',
        'Not for complex projects',
        'No time tracking built-in'
      ],
      content: [
        {
          _type: 'block',
          _key: 'basecamp1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Basecamp: Organized Simplicity' }]
        },
        {
          _type: 'block',
          _key: 'basecamp2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Basecamp takes a contrarian approach to project management by intentionally limiting features to focus on what truly matters: clear communication and organized work. Created by 37signals (now Basecamp), the tool embodies their "Shape Up" methodology and remote work philosophy. Over 3 million people have used Basecamp to manage projects without the complexity of traditional PM tools.' }]
        },
        {
          _type: 'block',
          _key: 'basecamp3',
          style: 'h2',
          children: [{ _type: 'span', text: 'The Six Core Tools' }]
        },
        {
          _type: 'block',
          _key: 'basecamp4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Basecamp organizes work around six core tools: Message Board for announcements, To-dos for tasks, Schedule for deadlines, Docs & Files for resources, Group Chat for quick discussions, and Check-in Questions for regular updates. This deliberate constraint prevents feature creep and keeps teams focused. Each project gets its own set of these tools, creating a consistent, predictable structure.' }]
        },
        {
          _type: 'block',
          _key: 'basecamp5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Hill Charts: A Unique Innovation' }]
        },
        {
          _type: 'block',
          _key: 'basecamp6',
          style: 'normal',
          children: [{ _type: 'span', text: 'Basecamp\'s Hill Charts offer a unique way to visualize progress. Unlike traditional progress bars, Hill Charts show work as a journey up and down a hill—uphill represents figuring things out, downhill represents execution. This simple visualization captures the reality that the hardest part of work is often deciding what to do, not doing it.' }]
        },
        {
          _type: 'block',
          _key: 'basecamp7',
          style: 'h2',
          children: [{ _type: 'span', text: 'Ideal for Remote and Async Work' }]
        },
        {
          _type: 'block',
          _key: 'basecamp8',
          style: 'normal',
          children: [{ _type: 'span', text: 'Basecamp shines for distributed teams working asynchronously. The emphasis on written communication over real-time chat, the daily digest emails, and the "work can wait" philosophy make it perfect for teams across time zones. The flat-rate pricing model is particularly attractive for growing teams, as adding team members doesn\'t increase costs.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Basecamp Review 2024: Simple Project Management for Teams',
        metaDescription: 'Comprehensive Basecamp review covering its unique approach to project management, flat-rate pricing, and suitability for remote teams.',
        keywords: ['basecamp review', 'simple project management', 'remote team collaboration', 'flat rate project management', 'basecamp pricing']
      }
    },

    // Teamwork Review
    {
      _type: 'software',
      name: 'Teamwork',
      slug: { _type: 'slug', current: 'teamwork' },
      tagline: 'Project management software built for client work',
      excerpt: 'Teamwork is a comprehensive project management platform designed specifically for agencies and professional services teams managing client work.',
      overallScore: 8.3,
      scores: {
        easeOfUse: 8.0,
        features: 8.5,
        integrations: 8.3,
        pricing: 7.8,
        support: 8.6,
        security: 8.4,
        scalability: 8.5,
        performance: 8.3,
        mobile: 8.1,
        documentation: 8.2,
        learningCurve: 7.7,
        customization: 8.4,
        reporting: 8.3,
        freeTier: 7.5,
        overallValue: 8.2
      },
      pricing: [
        {
          name: 'Free Forever',
          price: 0,
          features: ['Up to 5 users', '2 projects', 'Core features', '100MB storage'],
          userLimit: '5 users'
        },
        {
          name: 'Deliver',
          price: 9.99,
          yearlyPrice: 119.88,
          features: ['Unlimited projects', 'Time tracking', 'Project templates', '100GB storage'],
          userLimit: 'Per user/month'
        },
        {
          name: 'Grow',
          price: 17.99,
          yearlyPrice: 215.88,
          features: ['Workload management', 'Custom fields', 'Profit margins', '250GB storage'],
          userLimit: 'Per user/month',
          recommended: true
        },
        {
          name: 'Scale',
          price: 'Custom',
          features: ['Advanced permissions', 'Custom branding', 'Priority support', 'Unlimited storage'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Built for client work',
        'Excellent time tracking',
        'Good profitability tracking',
        'Strong task dependencies',
        'Client user permissions',
        'Portfolio management',
        'White-label options'
      ],
      cons: [
        'Can be complex initially',
        'Limited free plan',
        'Mobile app could improve',
        'Steep learning curve',
        'Resource planning in higher tiers'
      ],
      content: [
        {
          _type: 'block',
          _key: 'teamwork1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Teamwork: Built for Client Services' }]
        },
        {
          _type: 'block',
          _key: 'teamwork2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Teamwork stands out as a project management platform specifically designed for agencies, consultancies, and professional services firms. Founded in Ireland and serving over 20,000 companies globally, Teamwork understands the unique challenges of managing client work—from proposals to profitability. The platform combines project management with client relationship features that other tools often overlook.' }]
        },
        {
          _type: 'block',
          _key: 'teamwork3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Time Tracking and Profitability' }]
        },
        {
          _type: 'block',
          _key: 'teamwork4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Teamwork\'s integrated time tracking goes beyond simple timers. The platform tracks billable vs. non-billable hours, calculates project profitability in real-time, and provides insights into resource utilization. Teams can set budgets, track burn rates, and receive alerts when projects are at risk of going over budget. This financial visibility is crucial for service businesses where time literally equals money.' }]
        },
        {
          _type: 'block',
          _key: 'teamwork5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Client Collaboration Features' }]
        },
        {
          _type: 'block',
          _key: 'teamwork6',
          style: 'normal',
          children: [{ _type: 'span', text: 'Teamwork excels at client collaboration with granular permission controls that let you share exactly what clients need to see. The client user type provides free access for clients to view progress, approve work, and provide feedback without counting against your user limit. The platform also supports white-labeling, allowing agencies to present a branded experience to their clients.' }]
        },
        {
          _type: 'block',
          _key: 'teamwork7',
          style: 'h2',
          children: [{ _type: 'span', text: 'Resource and Workload Management' }]
        },
        {
          _type: 'block',
          _key: 'teamwork8',
          style: 'normal',
          children: [{ _type: 'span', text: 'The workload planner helps agencies balance resources across multiple projects and clients. Managers can see team capacity, identify overallocation, and redistribute work to maintain balanced workloads. The resource scheduler allows for forward planning, ensuring the right people are available for upcoming projects. These features are essential for agencies juggling multiple client engagements.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Teamwork Review 2024: Project Management for Agencies & Client Work',
        metaDescription: 'In-depth Teamwork review covering features for agencies, time tracking, profitability management, and client collaboration capabilities.',
        keywords: ['teamwork review', 'agency project management', 'client work management', 'teamwork pricing', 'professional services software']
      }
    },

    // Todoist Review
    {
      _type: 'software',
      name: 'Todoist',
      slug: { _type: 'slug', current: 'todoist' },
      tagline: 'The world\'s #1 task manager and to-do list app',
      excerpt: 'Todoist combines powerful task management with elegant simplicity, helping millions organize work and life with natural language input and intelligent features.',
      overallScore: 8.5,
      scores: {
        easeOfUse: 9.3,
        features: 8.2,
        integrations: 8.4,
        pricing: 8.7,
        support: 7.9,
        security: 8.3,
        scalability: 7.6,
        performance: 9.0,
        mobile: 9.2,
        documentation: 8.3,
        learningCurve: 9.1,
        customization: 7.8,
        reporting: 7.0,
        freeTier: 8.9,
        overallValue: 8.6
      },
      pricing: [
        {
          name: 'Beginner',
          price: 0,
          features: ['Up to 5 active projects', '5 collaborators per project', '1 week activity history', '5MB file uploads'],
          userLimit: 'Personal use'
        },
        {
          name: 'Pro',
          price: 4,
          yearlyPrice: 48,
          features: ['300 active projects', '25 collaborators per project', 'Reminders', '100MB file uploads'],
          userLimit: 'Per user/month',
          recommended: true
        },
        {
          name: 'Business',
          price: 6,
          yearlyPrice: 72,
          features: ['500 projects per member', 'Unlimited collaborators', 'Team billing', 'Admin controls'],
          userLimit: 'Per user/month'
        }
      ],
      pros: [
        'Natural language input',
        'Clean, minimal interface',
        'Excellent mobile apps',
        'Cross-platform sync',
        'Karma productivity system',
        'Great keyboard shortcuts',
        'Strong API'
      ],
      cons: [
        'Limited project management features',
        'Basic collaboration tools',
        'No time tracking',
        'Simple reporting',
        'Not for complex projects',
        'Limited free tier'
      ],
      content: [
        {
          _type: 'block',
          _key: 'todoist1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Todoist: Task Management Perfected' }]
        },
        {
          _type: 'block',
          _key: 'todoist2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Todoist has earned its place as the world\'s most popular task manager by focusing relentlessly on one thing: helping people organize tasks efficiently. With over 30 million users, Todoist proves that powerful doesn\'t mean complicated. The app\'s natural language processing, intelligent scheduling, and thoughtful design make task management feel effortless rather than burdensome.' }]
        },
        {
          _type: 'block',
          _key: 'todoist3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Natural Language Magic' }]
        },
        {
          _type: 'block',
          _key: 'todoist4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Todoist\'s natural language input is industry-leading. Type "Call John tomorrow at 2pm #work @phone" and Todoist automatically sets the due date, time, adds the project tag, and label. This intelligence extends to recurring tasks—"every weekday," "every 3 months," or "every second Tuesday" are all understood perfectly. This feature alone saves countless clicks and makes task entry feel natural.' }]
        },
        {
          _type: 'block',
          _key: 'todoist5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Productivity Gamification' }]
        },
        {
          _type: 'block',
          _key: 'todoist6',
          style: 'normal',
          children: [{ _type: 'span', text: 'The Karma system gamifies productivity by awarding points for completing tasks and maintaining streaks. Daily and weekly goals encourage consistent progress, while productivity visualizations show patterns over time. This gentle gamification motivates without being overwhelming, helping users build sustainable productivity habits rather than encouraging unhealthy overwork.' }]
        },
        {
          _type: 'block',
          _key: 'todoist7',
          style: 'h2',
          children: [{ _type: 'span', text: 'Perfect for Personal Productivity' }]
        },
        {
          _type: 'block',
          _key: 'todoist8',
          style: 'normal',
          children: [{ _type: 'span', text: 'While Todoist includes collaboration features, it truly shines for personal productivity and small team task coordination. The ability to quickly capture tasks, organize them into projects, and view them through filters like "Today" or "Next 7 days" makes it ideal for GTD practitioners, students, freelancers, and anyone juggling multiple responsibilities.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Todoist Review 2024: Natural Language Task Management App',
        metaDescription: 'Comprehensive Todoist review exploring natural language input, productivity features, pricing, and why it\'s the world\'s favorite task manager.',
        keywords: ['todoist review', 'task management app', 'personal productivity', 'todoist pricing', 'gtd app']
      }
    },

    // Any.do Review
    {
      _type: 'software',
      name: 'Any.do',
      slug: { _type: 'slug', current: 'any-do' },
      tagline: 'To-do list, calendar, planner & reminders all in one',
      excerpt: 'Any.do combines task management with calendar integration and smart reminders to help individuals and teams stay organized across all devices.',
      overallScore: 8.1,
      scores: {
        easeOfUse: 9.0,
        features: 7.8,
        integrations: 7.5,
        pricing: 8.2,
        support: 7.6,
        security: 8.0,
        scalability: 7.3,
        performance: 8.5,
        mobile: 8.9,
        documentation: 7.5,
        learningCurve: 8.8,
        customization: 7.4,
        reporting: 6.5,
        freeTier: 8.5,
        overallValue: 8.0
      },
      pricing: [
        {
          name: 'Personal',
          price: 0,
          features: ['Basic features', 'Limited tasks', 'Basic reminders', 'Cross-device sync'],
          userLimit: 'Individual'
        },
        {
          name: 'Premium',
          price: 5.99,
          yearlyPrice: 71.88,
          features: ['Unlimited tasks', 'Location reminders', 'Recurring tasks', 'Color tags'],
          userLimit: 'Per user/month',
          recommended: true
        },
        {
          name: 'Teams',
          price: 7.99,
          yearlyPrice: 95.88,
          features: ['Team workspace', 'Project templates', 'Advanced collaboration', 'Admin controls'],
          userLimit: 'Per user/month'
        }
      ],
      pros: [
        'Beautiful, clean design',
        'Great mobile experience',
        'Calendar integration',
        'Voice input support',
        'Location-based reminders',
        'WhatsApp integration',
        'Daily planner feature'
      ],
      cons: [
        'Limited advanced features',
        'Basic team collaboration',
        'No time tracking',
        'Simple project management',
        'Limited reporting',
        'Few integrations'
      ],
      content: [
        {
          _type: 'block',
          _key: 'anydo1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Any.do: Beautifully Simple Productivity' }]
        },
        {
          _type: 'block',
          _key: 'anydo2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Any.do brings elegance to task management with its award-winning design and intuitive interface. Used by over 30 million people worldwide, Any.do focuses on making productivity accessible and enjoyable. The app\'s unique combination of task management, calendar integration, and daily planning creates a holistic productivity system that works seamlessly across all devices.' }]
        },
        {
          _type: 'block',
          _key: 'anydo3',
          style: 'h2',
          children: [{ _type: 'span', text: 'The Moment: Daily Planning Ritual' }]
        },
        {
          _type: 'block',
          _key: 'anydo4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Any.do\'s "Moment" feature encourages a daily planning ritual where users review and organize their tasks for the day. This guided planning session helps users prioritize effectively and start each day with clarity. The feature can be scheduled as a morning routine, turning chaotic to-do lists into organized, achievable daily plans.' }]
        },
        {
          _type: 'block',
          _key: 'anydo5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Smart Features and Integration' }]
        },
        {
          _type: 'block',
          _key: 'anydo6',
          style: 'normal',
          children: [{ _type: 'span', text: 'Any.do\'s location-based reminders notify you of tasks when you arrive at specific locations. The WhatsApp integration allows task creation through messaging, while voice input makes adding tasks hands-free. The calendar view seamlessly blends tasks with events, providing a complete picture of your commitments. These smart features make Any.do particularly effective for busy individuals managing personal and professional tasks.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Any.do Review 2024: Beautiful Task Management & Calendar App',
        metaDescription: 'Detailed Any.do review covering task management, calendar integration, daily planning features, and mobile productivity capabilities.',
        keywords: ['any.do review', 'any do app', 'task calendar app', 'daily planner app', 'any.do pricing']
      }
    },

    // Taskade Review
    {
      _type: 'software',
      name: 'Taskade',
      slug: { _type: 'slug', current: 'taskade' },
      tagline: 'AI-powered productivity with tasks, notes, and video chat',
      excerpt: 'Taskade combines task management, collaborative notes, mind mapping, and video chat with AI assistance for a unified productivity experience.',
      overallScore: 8.0,
      scores: {
        easeOfUse: 8.4,
        features: 8.3,
        integrations: 7.3,
        pricing: 8.6,
        support: 7.8,
        security: 8.1,
        scalability: 7.9,
        performance: 8.2,
        mobile: 8.3,
        documentation: 7.7,
        learningCurve: 8.0,
        customization: 8.1,
        reporting: 6.8,
        freeTier: 8.8,
        overallValue: 8.2
      },
      pricing: [
        {
          name: 'Free',
          price: 0,
          features: ['Up to 3 users', '5 projects', 'All views', 'Video chat'],
          userLimit: '3 users'
        },
        {
          name: 'Pro',
          price: 8,
          yearlyPrice: 96,
          features: ['Unlimited projects', 'Unlimited users', 'AI credits', 'Custom templates'],
          userLimit: 'Per user/month',
          recommended: true
        },
        {
          name: 'Business',
          price: 16,
          yearlyPrice: 192,
          features: ['Advanced AI', 'Priority support', 'SSO', 'Dedicated workspace'],
          userLimit: 'Per user/month'
        }
      ],
      pros: [
        'AI-powered features',
        'Multiple view types',
        'Built-in video chat',
        'Real-time collaboration',
        'Mind mapping tools',
        'Good free tier',
        'Cross-platform apps'
      ],
      cons: [
        'Can feel overwhelming',
        'Limited integrations',
        'AI features need improvement',
        'Newer platform',
        'Smaller community',
        'Learning curve for features'
      ],
      content: [
        {
          _type: 'block',
          _key: 'taskade1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Taskade: AI-Native Productivity Platform' }]
        },
        {
          _type: 'block',
          _key: 'taskade2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Taskade represents a new generation of productivity tools that integrate AI at their core. The platform combines task management, note-taking, mind mapping, and video conferencing into a unified workspace. With AI assistants that can help generate content, organize tasks, and automate workflows, Taskade is positioning itself as the productivity platform for the AI era.' }]
        },
        {
          _type: 'block',
          _key: 'taskade3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Multiple Views for Different Thinking Styles' }]
        },
        {
          _type: 'block',
          _key: 'taskade4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Taskade offers six different views for the same content: List, Board, Calendar, Action, Mind Map, and Org Chart. This flexibility allows teams to switch between linear task lists, visual Kanban boards, and creative mind maps without losing data. The ability to transform a mind map into actionable tasks or view a project timeline as a calendar makes Taskade adaptable to different working styles and project phases.' }]
        },
        {
          _type: 'block',
          _key: 'taskade5',
          style: 'h2',
          children: [{ _type: 'span', text: 'AI Agents and Automation' }]
        },
        {
          _type: 'block',
          _key: 'taskade6',
          style: 'normal',
          children: [{ _type: 'span', text: 'Taskade\'s AI agents can generate project plans, write content, and automate repetitive tasks. The AI can transform rough notes into structured projects, suggest task breakdowns, and even participate in brainstorming sessions. While still evolving, these AI features represent the future of productivity tools, where intelligent assistants augment human creativity and efficiency.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Taskade Review 2024: AI-Powered Productivity & Collaboration Platform',
        metaDescription: 'Comprehensive Taskade review covering AI features, multiple view types, video collaboration, and unified workspace capabilities.',
        keywords: ['taskade review', 'ai productivity tool', 'taskade pricing', 'collaborative workspace', 'mind mapping software']
      }
    },

    // Airtable Review
    {
      _type: 'software',
      name: 'Airtable',
      slug: { _type: 'slug', current: 'airtable' },
      tagline: 'Part spreadsheet, part database, all awesome',
      excerpt: 'Airtable combines the simplicity of spreadsheets with the power of databases to help teams organize work, track projects, and build custom applications.',
      overallScore: 8.8,
      scores: {
        easeOfUse: 8.5,
        features: 9.0,
        integrations: 8.9,
        pricing: 7.5,
        support: 8.2,
        security: 8.7,
        scalability: 8.8,
        performance: 8.4,
        mobile: 8.3,
        documentation: 8.6,
        learningCurve: 7.8,
        customization: 9.3,
        reporting: 8.1,
        freeTier: 8.3,
        overallValue: 8.5
      },
      pricing: [
        {
          name: 'Free',
          price: 0,
          features: ['Unlimited bases', '5 users per base', '1,200 records per base', '2GB attachments'],
          userLimit: 'Up to 5 users'
        },
        {
          name: 'Team',
          price: 20,
          yearlyPrice: 240,
          features: ['50,000 records', '20GB attachments', 'Advanced features', 'Extensions'],
          userLimit: 'Per user/month',
          recommended: true
        },
        {
          name: 'Business',
          price: 45,
          yearlyPrice: 540,
          features: ['125,000 records', '100GB attachments', 'Advanced permissions', 'Sync integrations'],
          userLimit: 'Per user/month'
        },
        {
          name: 'Enterprise Scale',
          price: 'Custom',
          features: ['500,000+ records', '1,000GB attachments', 'Enterprise security', 'Dedicated support'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Incredibly flexible platform',
        'Visual database design',
        'Powerful automation',
        'Extensive templates',
        'Strong API',
        'Great for building apps',
        'Excellent integrations'
      ],
      cons: [
        'Can get expensive quickly',
        'Learning curve for advanced features',
        'Performance with large datasets',
        'Limited reporting',
        'Not a traditional PM tool'
      ],
      content: [
        {
          _type: 'block',
          _key: 'airtable1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Airtable: The Platform for Building Platforms' }]
        },
        {
          _type: 'block',
          _key: 'airtable2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Airtable revolutionizes how teams work with data by combining the familiarity of spreadsheets with the power of databases. More than just a project management tool, Airtable is a platform for building custom applications without code. From content calendars to CRM systems, inventory management to project tracking, Airtable\'s flexibility makes it the Swiss Army knife of productivity tools.' }]
        },
        {
          _type: 'block',
          _key: 'airtable3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Relational Database Made Simple' }]
        },
        {
          _type: 'block',
          _key: 'airtable4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Unlike traditional spreadsheets, Airtable uses linked records to create relationships between data. This relational structure eliminates data duplication and enables powerful workflows. For example, a project can link to multiple tasks, which link to team members, who link to departments. Changes in one place automatically update everywhere, maintaining data integrity across complex systems.' }]
        },
        {
          _type: 'block',
          _key: 'airtable5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Automation and Apps' }]
        },
        {
          _type: 'block',
          _key: 'airtable6',
          style: 'normal',
          children: [{ _type: 'span', text: 'Airtable\'s automation features rival dedicated workflow tools. Users can create multi-step automations triggered by time, form submissions, or record changes. The Apps marketplace (formerly Blocks) adds functionality like charts, maps, and Gantt charts. The Interface Designer allows creation of custom front-ends for databases, turning Airtable into a no-code app development platform.' }]
        },
        {
          _type: 'block',
          _key: 'airtable7',
          style: 'h2',
          children: [{ _type: 'span', text: 'Use Cases and Flexibility' }]
        },
        {
          _type: 'block',
          _key: 'airtable8',
          style: 'normal',
          children: [{ _type: 'span', text: 'Airtable\'s true power lies in its adaptability. Marketing teams use it for content calendars and campaign tracking. Product teams build roadmaps and feature databases. Operations teams create inventory systems and resource schedulers. The platform\'s flexibility means it can grow and evolve with your needs, morphing from simple task tracker to complex business system.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Airtable Review 2024: Visual Database & Custom App Platform',
        metaDescription: 'In-depth Airtable review exploring its database capabilities, automation features, pricing, and flexibility for building custom business applications.',
        keywords: ['airtable review', 'visual database', 'no-code platform', 'airtable pricing', 'spreadsheet database']
      }
    },

    // Coda Review
    {
      _type: 'software',
      name: 'Coda',
      slug: { _type: 'slug', current: 'coda' },
      tagline: 'The doc that brings it all together',
      excerpt: 'Coda is an all-in-one doc that combines documents, spreadsheets, and applications into a single powerful canvas for teams.',
      overallScore: 8.4,
      scores: {
        easeOfUse: 7.9,
        features: 8.8,
        integrations: 8.5,
        pricing: 8.0,
        support: 7.8,
        security: 8.3,
        scalability: 8.2,
        performance: 8.1,
        mobile: 7.6,
        documentation: 8.4,
        learningCurve: 7.2,
        customization: 9.0,
        reporting: 7.5,
        freeTier: 8.5,
        overallValue: 8.3
      },
      pricing: [
        {
          name: 'Free',
          price: 0,
          features: ['Unlimited docs', 'Up to 10 editors', 'Basic integrations', 'Limited automation'],
          userLimit: 'Up to 10 editors'
        },
        {
          name: 'Pro',
          price: 10,
          yearlyPrice: 120,
          features: ['Unlimited automation', 'Advanced packs', 'Version history', 'Doc locking'],
          userLimit: 'Per doc maker/month',
          recommended: true
        },
        {
          name: 'Team',
          price: 30,
          yearlyPrice: 360,
          features: ['Advanced permissions', 'Custom branding', 'Priority support', 'Admin tools'],
          userLimit: 'Per doc maker/month'
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          features: ['SSO/SAML', 'Advanced security', 'Dedicated support', 'Custom contracts'],
          userLimit: 'Contact sales'
        }
      ],
      pros: [
        'Powerful formula language',
        'Flexible document structure',
        'Great for building tools',
        'Strong automation',
        'Innovative Pack system',
        'Good templates',
        'Collaborative editing'
      ],
      cons: [
        'Steep learning curve',
        'Can be slow with complex docs',
        'Mobile experience limited',
        'Pricing can be confusing',
        'Not intuitive initially'
      ],
      content: [
        {
          _type: 'block',
          _key: 'coda1',
          style: 'h2',
          children: [{ _type: 'span', text: 'Coda: Documents That Do More' }]
        },
        {
          _type: 'block',
          _key: 'coda2',
          style: 'normal',
          children: [{ _type: 'span', text: 'Coda reimagines documents for the modern era, creating a new surface that blends documents, spreadsheets, and applications. Founded by former Google and YouTube executives, Coda addresses the proliferation of tools by providing a single, flexible canvas where teams can build anything from meeting notes to complex project management systems. It\'s essentially a toolkit for creating custom productivity solutions.' }]
        },
        {
          _type: 'block',
          _key: 'coda3',
          style: 'h2',
          children: [{ _type: 'span', text: 'Formula Language and Building Blocks' }]
        },
        {
          _type: 'block',
          _key: 'coda4',
          style: 'normal',
          children: [{ _type: 'span', text: 'Coda\'s formula language is remarkably powerful, going far beyond typical spreadsheet functions. Users can create buttons that trigger actions, build interactive controls, and construct complex logic flows. Tables in Coda are true databases with views, filters, and relationships. These building blocks—tables, buttons, controls, and formulas—combine to create sophisticated applications within documents.' }]
        },
        {
          _type: 'block',
          _key: 'coda5',
          style: 'h2',
          children: [{ _type: 'span', text: 'Packs: Bringing External Data In' }]
        },
        {
          _type: 'block',
          _key: 'coda6',
          style: 'normal',
          children: [{ _type: 'span', text: 'Coda Packs connect to external services, bringing live data into docs. Unlike static integrations, Packs make external data feel native to Coda. You can pull in Jira tickets, Slack messages, or Google Calendar events and interact with them as if they were Coda tables. This two-way sync capability transforms Coda from a documentation tool into a command center for all your tools.' }]
        },
        {
          _type: 'block',
          _key: 'coda7',
          style: 'h2',
          children: [{ _type: 'span', text: 'Ideal for Process Documentation' }]
        },
        {
          _type: 'block',
          _key: 'coda8',
          style: 'normal',
          children: [{ _type: 'span', text: 'Coda excels when you need documents that actually do something. Product specs that update with live data, meeting notes that create action items automatically, or project hubs that aggregate information from multiple sources. The ability to combine narrative text with interactive elements makes Coda perfect for creating living documents that serve as both reference and tool.' }]
        }
      ],
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: 'Coda Review 2024: All-in-One Doc for Teams',
        metaDescription: 'Comprehensive Coda review covering its unique document platform, formula language, Packs system, and ability to build custom productivity tools.',
        keywords: ['coda review', 'coda doc', 'collaborative documents', 'coda pricing', 'no-code tools']
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

createReviewsBatch3().then(() => {
  console.log('Batch 3 reviews created!')
})