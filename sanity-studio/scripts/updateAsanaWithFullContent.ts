import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { v4 as uuidv4 } from 'uuid'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
})

// Helper function to create a block
function createBlock(text: string, style = 'normal') {
  return {
    _type: 'block',
    _key: uuidv4().replace(/-/g, '').substring(0, 12),
    style,
    children: [
      {
        _type: 'span',
        _key: uuidv4().replace(/-/g, '').substring(0, 12),
        marks: [],
        text
      }
    ],
    markDefs: []
  }
}

// Helper function to create a heading
function createHeading(text: string, level: 'h2' | 'h3' | 'h4' = 'h2') {
  return createBlock(text, level)
}

// Helper function to create a block with marks (bold, italic)
function createRichBlock(text: string, style = 'normal') {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g)
  const children: any[] = []
  
  parts.forEach(part => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Bold text
      children.push({
        _type: 'span',
        _key: uuidv4().replace(/-/g, '').substring(0, 12),
        marks: ['strong'],
        text: part.slice(2, -2)
      })
    } else if (part.startsWith('*') && part.endsWith('*')) {
      // Italic text
      children.push({
        _type: 'span',
        _key: uuidv4().replace(/-/g, '').substring(0, 12),
        marks: ['em'],
        text: part.slice(1, -1)
      })
    } else if (part) {
      // Regular text
      children.push({
        _type: 'span',
        _key: uuidv4().replace(/-/g, '').substring(0, 12),
        marks: [],
        text: part
      })
    }
  })
  
  return {
    _type: 'block',
    _key: uuidv4().replace(/-/g, '').substring(0, 12),
    style,
    children,
    markDefs: []
  }
}

async function updateAsanaWithFullContent() {
  console.log('📝 Updating Asana review with comprehensive content from asana-review.md...\n')
  
  try {
    // Fetch the current Asana review
    const query = `*[_type == "software" && slug.current == "asana"][0]`
    const asana = await client.fetch(query)
    
    if (!asana) {
      console.error('❌ Asana review not found')
      return
    }
    
    console.log('Found Asana review:', asana._id)
    
    // Build the comprehensive content array based on asana-review.md
    const content = []
    
    // 1. Quick Verdict Section
    content.push({
      _type: 'infoBox',
      _key: uuidv4().replace(/-/g, '').substring(0, 12),
      type: 'highlight',
      title: 'Quick Verdict',
      content: [
        createRichBlock('After spending three months managing multiple projects in Asana, I can say it\'s one of the most capable project management tools available today. But at $10.99 per user per month, it\'s also one of the priciest. Is it worth your money? That depends on what you need.')
      ]
    })
    
    // 2. Testing Framework
    content.push(createHeading('My Testing Framework'))
    content.push(createBlock('Before diving into my experience with Asana, let me explain how I test project management software. I evaluate each tool based on six key areas: task management capabilities, team collaboration features, automation options, reporting depth, value for money, and real-world usability. I spend at least 60 days with each tool, managing actual client projects to get a true feel for daily use.'))
    content.push(createBlock('For Asana, I tested it with a team of eight people across three different projects. One was a website redesign, another was a content marketing campaign, and the third was an internal process documentation project. This variety helped me see how Asana performs in different scenarios.'))
    
    // 3. What is Asana?
    content.push(createHeading('What Exactly is Asana?'))
    content.push(createBlock('Asana is a web-based project management platform created by Dustin Moskovitz, who you might know as one of Facebook\'s co-founders. The tool helps teams organize work, track progress, and hit deadlines without the chaos of endless email chains and scattered spreadsheets.'))
    content.push(createBlock('Think of Asana as a digital workspace where everything related to your projects lives in one place. Tasks, conversations, files, and timelines all connect in ways that actually make sense. After testing dozens of similar tools over the years, I can tell you that Asana stands out for its thoughtful design and powerful features. But it\'s not perfect, and it\'s definitely not for everyone.'))
    
    // 4. The Good - Task Management
    content.push(createHeading('The Good: What Asana Does Well'))
    
    content.push(createHeading('Task Management That Actually Makes Sense', 'h3'))
    content.push(createBlock('The first thing that impressed me about Asana was how intuitive task creation feels. You don\'t need a manual to figure out how to create a task, assign it to someone, and set a due date. It just works the way you\'d expect it to.'))
    content.push(createBlock('But here\'s where Asana gets interesting. You can break tasks down into subtasks, and those subtasks can have their own subtasks, going up to five levels deep. During my website redesign project, this was invaluable. I could create a main task for "Homepage Design" and break it down into wireframing, mockups, revisions, and final delivery. Each of those had their own subtasks with specific action items.'))
    content.push(createBlock('The dependency feature saved my team countless headaches. We could mark that the copywriting needed to be done before the design work could start. When the copy deadline slipped by two days, Asana automatically adjusted all the dependent tasks. No manual updating required.'))
    
    // 5. Multiple Views
    content.push(createHeading('Multiple Ways to View Your Work', 'h3'))
    content.push(createBlock('Not everyone thinks about projects the same way. Some people love lists. Others need visual boards. A few can\'t live without Gantt charts. Asana gives you six different views to choose from, though some require a paid plan.'))
    content.push(createBlock('I started with the List view because it felt familiar, like a sophisticated to-do list. But once I discovered the Board view, there was no going back for our content marketing project. Seeing articles move from "Ideas" to "Writing" to "Editing" to "Published" gave everyone instant clarity on where things stood.'))
    content.push(createBlock('The Timeline view, which is basically a Gantt chart, became essential for our website project. I could see how all the pieces fit together and spot potential bottlenecks before they became problems. Fair warning though: you need at least the Starter plan to access Timeline view, which feels a bit stingy considering some competitors offer it for free.'))
    
    // 6. Automation
    content.push(createHeading('Automation That Saves Real Time', 'h3'))
    content.push(createBlock('Here\'s something that genuinely surprised me. Asana\'s automation features are powerful enough that I eliminated about two hours of weekly admin work. I\'m not exaggerating.'))
    content.push(createBlock('I set up rules so that when a blog post moved to "Ready for Review," it automatically assigned to our editor, set a due date for two days out, and added it to our editorial calendar project. When she marked it complete, it moved to "Ready to Publish" and notified our web developer. These might seem like small things, but they add up fast.'))
    content.push(createBlock('The Forms feature deserves special mention. We created an intake form for content requests that automatically created tasks with all the right information in all the right fields. No more chasing people for briefs or trying to decode vague email requests.'))
    
    // 7. Integrations
    content.push(createHeading('Integrations That Actually Work', 'h3'))
    content.push(createBlock('Asana claims over 200 integrations, and I tested about 15 of them. Most worked flawlessly. Our team uses Slack for communication, Google Drive for files, and Zoom for meetings. All three integrate smoothly with Asana.'))
    content.push(createBlock('The Slack integration was particularly useful. We could create tasks from Slack messages, get notifications about task updates, and even change task status without leaving Slack. The Google Drive integration let us attach files directly from Drive and even create new Google Docs from within Asana tasks.'))
    
    // 8. The Not-So-Good
    content.push(createHeading('The Not-So-Good: Where Asana Falls Short'))
    
    content.push(createHeading('The Price Tag Hurts', 'h3'))
    content.push(createBlock('Let\'s address the elephant in the room. Asana is expensive. At $10.99 per user per month for the Starter plan, a team of 10 will pay $1,318 per year. That\'s if you pay annually. Pay monthly and it jumps to $1,618.'))
    content.push(createBlock('But here\'s the kicker that really frustrated me. You can\'t buy a single-user paid plan. The minimum is two seats. So even if you\'re a freelancer who wants the Timeline view, you\'re paying for two users. That\'s $263 per year for features that tools like ClickUp include in their free plan.'))
    content.push(createBlock('The Advanced plan at $24.99 per user per month is where you get the really good stuff like custom fields, portfolios, and time tracking. For our team of eight, that would be $2,399 per year. Ouch.'))
    
    content.push(createHeading('One Person Per Task (And Why That\'s Annoying)', 'h3'))
    content.push(createBlock('Asana has this philosophy that each task should have one owner for accountability. In theory, this makes sense. In practice, it drove my team crazy.'))
    content.push(createBlock('We had a task for "Review and approve final designs." Both our creative director and our client needed to sign off. In Asana, we had to create two separate tasks or use a workaround with subtasks. Neither solution felt natural.'))
    content.push(createBlock('Many competing tools let you assign tasks to multiple people. Monday.com does it. ClickUp does it. Even Trello does it with the right power-up. Asana\'s rigid approach feels outdated.'))
    
    content.push(createHeading('Time Tracking Costs Extra (A Lot Extra)', 'h3'))
    content.push(createBlock('Time tracking is essential for agencies and freelancers who bill by the hour. Guess what? Asana only includes time tracking in the Advanced plan. That\'s $24.99 per user per month, remember?'))
    content.push(createBlock('Even then, the time tracking feature feels basic compared to dedicated time tracking tools. We ended up using Harvest integrated with Asana, which meant another subscription and another tool to manage. For a platform this expensive, native time tracking should be standard.'))
    
    content.push(createHeading('The Learning Curve is Real', 'h3'))
    content.push(createBlock('Despite Asana\'s clean interface, new team members struggled initially. There are so many features, views, and options that people felt overwhelmed. It took about two weeks before everyone was comfortable, and a full month before they were using it efficiently.'))
    content.push(createBlock('The terminology also confused people. What\'s the difference between a project and a portfolio? When should you use a task versus a subtask versus a section? Why are some features in the customize menu while others are in settings? These aren\'t deal-breakers, but they slow adoption.'))
    
    // 9. Pricing Section
    content.push(createHeading('Pricing: What You Really Pay'))
    content.push(createBlock('Let me break down Asana\'s pricing in plain English, including the gotchas they don\'t advertise prominently.'))
    
    // Pricing Table
    content.push({
      _type: 'pricingTable',
      _key: uuidv4().replace(/-/g, '').substring(0, 12),
      title: 'Asana Pricing Plans',
      plans: [
        {
          _key: uuidv4().replace(/-/g, '').substring(0, 12),
          name: 'Personal',
          price: 'Free',
          features: [
            'Up to 10 team members',
            'Unlimited tasks & projects',
            'List, Board, Calendar views',
            'Basic features',
            'Mobile apps'
          ],
          highlighted: false
        },
        {
          _key: uuidv4().replace(/-/g, '').substring(0, 12),
          name: 'Starter',
          price: '$10.99/user/month',
          features: [
            'Timeline view (Gantt charts)',
            'Custom fields',
            'Forms',
            'Rules & automation',
            'Unlimited guests',
            '2-seat minimum'
          ],
          highlighted: true
        },
        {
          _key: uuidv4().replace(/-/g, '').substring(0, 12),
          name: 'Advanced',
          price: '$24.99/user/month',
          features: [
            'Portfolios',
            'Workload management',
            'Time tracking',
            'Custom field locking',
            'Advanced automation',
            'Priority support'
          ],
          highlighted: false
        },
        {
          _key: uuidv4().replace(/-/g, '').substring(0, 12),
          name: 'Enterprise',
          price: 'Custom',
          features: [
            'Advanced security',
            'HIPAA compliance',
            'Data residency',
            'Custom branding',
            'Priority support',
            'Service Level Agreement'
          ],
          highlighted: false
        }
      ]
    })
    
    content.push(createHeading('Personal Plan (Free)', 'h3'))
    content.push(createBlock('The free plan is actually generous if you have 10 or fewer team members. You get unlimited tasks, projects, and basic features. You can use List, Board, and Calendar views. For small teams doing simple project management, this might be enough.'))
    content.push(createBlock('But you don\'t get Timeline view (Gantt charts), custom fields, forms, rules, or custom templates. These feel like artificial limitations designed to push you to upgrade.'))
    
    content.push(createHeading('Starter Plan ($10.99/user/month)', 'h3'))
    content.push(createBlock('This is where most teams land, and where the two-seat minimum surprise hits. You get Timeline view, custom fields, forms, rules, and unlimited guests. The "unlimited guests" part is nice if you work with clients or contractors.'))
    content.push(createBlock('The Starter plan makes sense for teams of 5-20 people who need professional project management features but don\'t require advanced reporting or portfolios.'))
    
    content.push(createHeading('Advanced Plan ($24.99/user/month)', 'h3'))
    content.push(createBlock('Jump to Advanced and you finally get portfolios, workload management, custom field locking, and time tracking. You also get more sophisticated automation with unlimited rules per project.'))
    content.push(createBlock('This plan targets larger teams and agencies that need to see work across multiple projects and teams. The portfolio view alone might justify the cost if you\'re managing dozens of projects.'))
    
    // 10. Comparisons
    content.push(createHeading('Asana vs. The Competition'))
    content.push(createBlock('I\'ve tested all the major players, so let me save you some time with honest comparisons.'))
    
    content.push(createHeading('Asana vs. Monday.com', 'h3'))
    content.push(createBlock('Monday.com is easier to learn and more visually appealing. It\'s also slightly cheaper at $9 per user per month for the Basic plan. The interface feels more modern and playful, which some teams love and others find unprofessional.'))
    content.push(createBlock('Where Monday.com falls short is depth. Asana\'s automation is more powerful. Its task management is more sophisticated. And its reporting, while not perfect, beats Monday.com\'s basic charts.'))
    content.push(createBlock('Choose Monday.com if you want something your team can adopt in days, not weeks. Choose Asana if you need more powerful features and don\'t mind the learning curve.'))
    
    content.push(createHeading('Asana vs. Trello', 'h3'))
    content.push(createBlock('This isn\'t really a fair comparison. Trello is a simple Kanban board tool that does one thing exceptionally well. Asana is a full project management platform that includes Kanban boards plus much more.'))
    content.push(createBlock('Trello is perfect for small teams, personal projects, or simple workflows. It\'s also much cheaper, with a generous free plan and paid plans starting at $5 per user per month.'))
    content.push(createBlock('Choose Trello if you just need visual task management. Choose Asana if you need actual project management with dependencies, multiple views, and robust reporting.'))
    
    content.push(createHeading('Asana vs. ClickUp', 'h3'))
    content.push(createBlock('ClickUp is the feature monster of project management tools. It includes everything Asana does plus native time tracking, docs, goals, and even a basic CRM. The free plan is incredibly generous, and paid plans start at just $7 per user per month.'))
    content.push(createBlock('So why would anyone choose Asana over ClickUp? Because ClickUp can be overwhelming. There are so many features and options that it becomes confusing. The interface is cluttered. Performance can be sluggish. And the learning curve makes Asana look simple.'))
    content.push(createBlock('Choose ClickUp if you want every possible feature at a low price and don\'t mind complexity. Choose Asana if you want a more refined, stable experience and can afford the premium.'))
    
    // 11. Pros and Cons
    content.push(createHeading('Pros and Cons'))
    content.push({
      _type: 'prosConsBlock',
      _key: uuidv4().replace(/-/g, '').substring(0, 12),
      pros: [
        'Intuitive and clean interface',
        'Powerful automation features',
        'Excellent task dependencies',
        'Multiple view options',
        'Strong integration ecosystem',
        'Reliable performance',
        'Great mobile apps',
        'Unlimited guests on paid plans'
      ],
      cons: [
        'Expensive compared to competitors',
        'Two-seat minimum for paid plans',
        'One person per task limitation',
        'Time tracking requires Advanced plan',
        'Steep learning curve for new users',
        'Limited customization options',
        'No built-in invoicing or CRM'
      ]
    })
    
    // 12. Who Should Use Asana
    content.push(createHeading('Who Should Use Asana?'))
    content.push(createBlock('After extensive testing, I can confidently recommend Asana for specific types of teams.'))
    
    content.push(createHeading('Marketing Teams', 'h3'))
    content.push(createBlock('Asana excels at managing marketing campaigns with multiple moving parts. The calendar view is perfect for content calendars. Forms streamline creative requests. And the ability to create templates for recurring campaigns saves tons of time.'))
    
    content.push(createHeading('Creative Agencies', 'h3'))
    content.push(createBlock('Despite the time tracking limitations, Asana works well for agencies. The proofing and approval workflows are solid. Client collaboration via guest access is smooth. And portfolios give you a bird\'s eye view of all client work.'))
    
    content.push(createHeading('Product Development Teams', 'h3'))
    content.push(createBlock('The Timeline view and dependency management make Asana great for product launches. You can track sprints, manage backlogs, and coordinate between engineering, design, and marketing.'))
    
    content.push(createHeading('Remote Teams', 'h3'))
    content.push(createBlock('Asana\'s strong async communication features make it ideal for distributed teams. Everything is documented. Updates are clear. And the mobile apps are actually usable, unlike some competitors.'))
    
    // 13. Who Should Look Elsewhere
    content.push(createHeading('Who Should Look Elsewhere?'))
    content.push(createBlock('Asana isn\'t for everyone. Here\'s who should consider alternatives.'))
    
    content.push(createHeading('Solopreneurs and Freelancers', 'h3'))
    content.push(createBlock('The two-seat minimum for paid plans makes Asana unnecessarily expensive for individual users. Tools like Notion or Todoist offer better value for solo professionals.'))
    
    content.push(createHeading('Small Teams on Tight Budgets', 'h3'))
    content.push(createBlock('If you have 3-5 people and need to watch every dollar, ClickUp or Trello provide more features for less money. Asana\'s free plan might work, but you\'ll hit limitations quickly.'))
    
    content.push(createHeading('Teams Needing Simple Task Management', 'h3'))
    content.push(createBlock('If you just need a shared to-do list with some basic organization, Asana is overkill. You\'re paying for features you\'ll never use. Stick with Todoist, Microsoft To-Do, or even Google Tasks.'))
    
    // 14. Tips for Getting Started
    content.push(createHeading('Tips for Getting Started'))
    content.push(createBlock('If you decide to try Asana, here\'s how to set yourself up for success based on my experience.'))
    
    content.push({
      _type: 'infoBox',
      _key: uuidv4().replace(/-/g, '').substring(0, 12),
      type: 'tip',
      title: 'Getting Started Tips',
      content: [
        createRichBlock('**Start with a pilot project.** Don\'t try to move everything into Asana at once. Pick one project, preferably something new rather than ongoing.'),
        createRichBlock('**Use templates religiously.** Create templates for recurring projects and tasks. This alone can save hours every week.'),
        createRichBlock('**Invest in training.** Budget at least two hours for initial training and another hour for advanced features after a few weeks.'),
        createRichBlock('**Don\'t over-customize initially.** Use the default settings for a month, then adjust based on actual pain points.'),
        createRichBlock('**Set up integrations early.** Connect Asana to your existing tools from day one.')
      ]
    })
    
    // 15. Hidden Costs
    content.push(createHeading('The Hidden Costs Nobody Mentions'))
    content.push(createBlock('Beyond the subscription fees, there are hidden costs to consider with Asana.'))
    content.push(createBlock('Training time is real. Budget at least 10 hours per person for onboarding and initial training. That\'s $500 in lost productivity per person if you value time at $50/hour.'))
    content.push(createBlock('Integration costs add up. While Asana integrates with many tools, some of the best integrations require paid subscriptions to third-party services. Harvest for time tracking costs another $12 per person per month. Instagantt for advanced Gantt charts is another $7.50.'))
    content.push(createBlock('Migration is painful. Moving existing projects from another tool to Asana takes time. We spent about 20 hours migrating three projects from Trello. The CSV import helps, but you\'ll still need to rebuild workflows, rules, and templates.'))
    
    // 16. FAQ Section
    content.push({
      _type: 'faqBlock',
      _key: uuidv4().replace(/-/g, '').substring(0, 12),
      title: 'Frequently Asked Questions',
      items: [
        {
          _key: uuidv4().replace(/-/g, '').substring(0, 12),
          question: 'Is Asana really worth $10.99 per user per month?',
          answer: 'It depends on your needs. If you\'re using Timeline views, automation, forms, and custom fields daily, then yes. If you just need basic task management, probably not. The free plan is generous enough for simple needs, and competitors offer better value at the lower price points.'
        },
        {
          _key: uuidv4().replace(/-/g, '').substring(0, 12),
          question: 'Can I use Asana effectively as a solo user?',
          answer: 'Technically yes, but it\'s not cost-effective. You\'ll pay for two seats minimum on any paid plan. Notion, Todoist, or even ClickUp\'s free plan would serve you better as a solopreneur.'
        },
        {
          _key: uuidv4().replace(/-/g, '').substring(0, 12),
          question: 'Does Asana work offline?',
          answer: 'The mobile apps have limited offline functionality. You can view cached data and create tasks that sync when you reconnect. But it\'s not a true offline solution. If you need robust offline access, consider tools like Notion or Microsoft Project.'
        },
        {
          _key: uuidv4().replace(/-/g, '').substring(0, 12),
          question: 'How long does it take to learn Asana?',
          answer: 'Based on my experience and user feedback, expect 1-2 weeks to feel comfortable with basics, and about a month to use it efficiently. Power features like automation and portfolios take longer to master.'
        },
        {
          _key: uuidv4().replace(/-/g, '').substring(0, 12),
          question: 'Can Asana replace spreadsheets for project management?',
          answer: 'For most project management needs, absolutely. Asana is far superior to spreadsheets for task tracking, collaboration, and workflow management. However, you might still need spreadsheets for complex calculations or data analysis that Asana\'s reporting can\'t handle.'
        },
        {
          _key: uuidv4().replace(/-/g, '').substring(0, 12),
          question: 'Is there a desktop app for Asana?',
          answer: 'Yes, Asana offers desktop apps for Mac and Windows. They\'re essentially wrapped versions of the web app but include some native features like notifications and quick add. The web version is generally more stable and feature-complete.'
        },
        {
          _key: uuidv4().replace(/-/g, '').substring(0, 12),
          question: 'Can clients see my entire workspace in Asana?',
          answer: 'No. Guest users only see projects they\'re specifically invited to. You control exactly what external users can access. This is one area where Asana excels compared to some competitors.'
        },
        {
          _key: uuidv4().replace(/-/g, '').substring(0, 12),
          question: 'What happens to my data if I cancel my Asana subscription?',
          answer: 'Your account downgrades to the free plan. You keep your data but lose access to paid features. Projects using paid-only views become inaccessible until you upgrade again. You can export your data at any time via CSV.'
        }
      ]
    })
    
    // 17. Final Verdict
    content.push(createHeading('My Final Verdict'))
    content.push(createBlock('After three months of daily use, I have mixed feelings about Asana. It\'s an exceptionally well-designed tool that can transform how teams work together. The interface is clean. The features are powerful. The automation saves real time. And the integrations are extensive.'))
    content.push(createBlock('But it\'s also expensive, complex, and sometimes frustrating. The pricing feels aggressive, especially with the two-seat minimum and time tracking locked behind the Advanced plan. The learning curve is steeper than competitors. And some design decisions, like one person per task, feel stubborn rather than smart.'))
    content.push(createBlock('Here\'s my honest recommendation. Try the free plan first. Use it for at least a month with your actual team on a real project. If you find yourself constantly hitting limitations and wanting more, the paid plans are probably worth it. If the free plan feels sufficient, or if you\'re forcing yourself to use features you don\'t need, look elsewhere.'))
    
    content.push({
      _type: 'infoBox',
      _key: uuidv4().replace(/-/g, '').substring(0, 12),
      type: 'verdict',
      title: 'Bottom Line',
      content: [
        createRichBlock('**For teams that need sophisticated project management and can afford the premium, Asana is excellent.**'),
        createRichBlock('**Rating: 7.5/10**'),
        createRichBlock('For everyone else, there are better value options available.')
      ]
    })
    
    // Update the document with the new comprehensive content
    console.log('📝 Updating Asana review with comprehensive content...')
    const result = await client
      .patch(asana._id)
      .set({
        content: content,
        // Update the scores to match the review
        overallScore: 7.5,
        scores: {
          easeOfUse: 8.5,
          features: 9.0,
          valueForMoney: 6.5,
          customerSupport: 8.0
        },
        // Update the tagline and excerpt
        tagline: 'Powerful project management with a premium price tag',
        excerpt: 'After three months of testing, Asana proves to be one of the most capable project management tools available - but its high price and steep learning curve mean it\'s not for everyone.',
        // Update pros and cons at document level
        pros: [
          'Intuitive and clean interface',
          'Powerful automation features',
          'Excellent task dependencies',
          'Multiple view options',
          'Strong integration ecosystem',
          'Reliable performance',
          'Great mobile apps'
        ],
        cons: [
          'Expensive compared to competitors',
          'Two-seat minimum for paid plans',
          'One person per task limitation',
          'Time tracking requires Advanced plan',
          'Steep learning curve'
        ],
        // Update best for and not ideal for
        bestFor: [
          'Marketing teams managing campaigns',
          'Creative agencies with multiple clients',
          'Product development teams',
          'Remote teams needing async collaboration',
          'Teams of 5-20 people'
        ],
        notIdealFor: [
          'Solopreneurs and freelancers',
          'Small teams on tight budgets',
          'Teams needing simple task management',
          'Companies requiring built-in CRM',
          'Organizations needing extensive customization'
        ]
      })
      .commit()
    
    console.log('✅ Update completed successfully!')
    console.log('\nThe Asana review now includes the comprehensive content from asana-review.md')
    console.log('View in Sanity Studio: http://localhost:3333')
    console.log('View on frontend: https://workflow-automation-eosin.vercel.app/reviews/asana')
    
  } catch (error) {
    console.error('❌ Error during update:', error)
  }
}

updateAsanaWithFullContent()