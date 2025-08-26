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

async function updateClickUpReview() {
  // First, get the existing ClickUp review ID
  const query = `*[_type == "software" && name == "ClickUp"][0]._id`
  const reviewId = await client.fetch(query)
  
  if (!reviewId) {
    console.error('ClickUp review not found!')
    return
  }

  console.log(`Found ClickUp review with ID: ${reviewId}`)

  // Create the comprehensive content structure based on the markdown
  const updatedContent = [
    // Introduction Section
    {
      _type: 'block',
      _key: 'intro-heading',
      style: 'h1',
      children: [{ _type: 'span', text: 'ClickUp Review 2025: Honest Pros, Cons & Pricing (After 6+ Months Testing)' }]
    },
    {
      _type: 'block',
      _key: 'quick-verdict',
      style: 'h2',
      children: [{ _type: 'span', text: 'Quick Verdict' }]
    },
    {
      _type: 'block',
      _key: 'verdict-rating',
      style: 'normal',
      children: [
        { _type: 'span', text: '⭐ Overall Rating: 4.2/5', marks: ['strong'] }
      ]
    },
    {
      _type: 'block',
      _key: 'verdict-best',
      style: 'normal',
      children: [
        { _type: 'span', text: 'Best For: ', marks: ['strong'] },
        { _type: 'span', text: 'Growing teams (5-50 people), agencies, remote teams, and businesses wanting to consolidate multiple tools' }
      ]
    },
    {
      _type: 'block',
      _key: 'verdict-skip',
      style: 'normal',
      children: [
        { _type: 'span', text: 'Skip If: ', marks: ['strong'] },
        { _type: 'span', text: 'You need something simple, have limited training time, or prefer specialized tools' }
      ]
    },
    
    // 1. Introduction: The "Everything App" Promise
    {
      _type: 'block',
      _key: 'intro1',
      style: 'h2',
      children: [{ _type: 'span', text: 'Introduction: The "Everything App" Promise' }]
    },
    {
      _type: 'block',
      _key: 'intro2',
      style: 'normal',
      children: [{ _type: 'span', text: 'I\'ve spent over six months testing ClickUp with my team, and I need to address the elephant in the room right away. ClickUp calls itself "one app to replace them all." That\'s a massive promise in a world where most teams juggle between Slack, Trello, Google Docs, Zoom, and countless other tools daily.' }]
    },
    {
      _type: 'block',
      _key: 'intro3',
      style: 'normal',
      children: [{ _type: 'span', text: 'After logging thousands of hours, managing over 200 projects, and pushing nearly every feature to its limits, I can tell you exactly where this promise holds up and where it crumbles. This review comes from real-world testing with a 12-person team across marketing, development, and operations departments.' }]
    },
    
    // 2. What is ClickUp?
    {
      _type: 'block',
      _key: 'what1',
      style: 'h2',
      children: [{ _type: 'span', text: 'What is ClickUp? Understanding the Platform' }]
    },
    {
      _type: 'block',
      _key: 'what2',
      style: 'normal',
      children: [{ _type: 'span', text: 'ClickUp is a cloud-based project management and productivity platform that launched in 2017. The company, founded by Zeb Evans and Alex Yurkowski, set out to solve a simple problem: workplace tools were too fragmented. Their solution was to build one platform that could handle tasks, docs, goals, time tracking, chat, and more.' }]
    },
    {
      _type: 'block',
      _key: 'what3',
      style: 'normal',
      children: [{ _type: 'span', text: 'Today, ClickUp serves over 10 million users across 800,000 teams worldwide. The platform has raised over $530 million in funding and achieved a $4 billion valuation. These aren\'t just vanity metrics. They indicate a tool with serious staying power and resources for continued development.' }]
    },
    {
      _type: 'block',
      _key: 'what4',
      style: 'normal',
      children: [{ _type: 'span', text: 'The platform positions itself uniquely in the market. Where Asana focuses on simplicity and task management, where Monday.com emphasizes visual project tracking, and where Notion builds around documents and wikis, ClickUp tries to do everything. It\'s simultaneously a project management tool, a document collaboration platform, a time tracker, a goal-setting system, and a communication hub.' }]
    },
    
    // Key Features Deep Dive
    {
      _type: 'block',
      _key: 'features1',
      style: 'h2',
      children: [{ _type: 'span', text: 'Key Features Deep Dive' }]
    },
    {
      _type: 'block',
      _key: 'features-task1',
      style: 'h3',
      children: [{ _type: 'span', text: 'Task Management & Views - Flexibility Overload' }]
    },
    {
      _type: 'block',
      _key: 'features-task2',
      style: 'normal',
      children: [{ _type: 'span', text: 'ClickUp\'s task management starts with a simple premise: everyone works differently. The platform provides 15+ ways to view your tasks, each suited for different work styles and project types.' }]
    },
    {
      _type: 'block',
      _key: 'features-views',
      style: 'normal',
      children: [
        { _type: 'span', text: 'List View', marks: ['strong'] },
        { _type: 'span', text: ' displays tasks in a traditional spreadsheet format. You can sort, filter, and group tasks by any field. Custom columns show exactly the information you need. During testing, our accounting team lived in List view because it reminded them of Excel.' }
      ]
    },
    {
      _type: 'block',
      _key: 'features-board',
      style: 'normal',
      children: [
        { _type: 'span', text: 'Board View', marks: ['strong'] },
        { _type: 'span', text: ' mimics Kanban boards like Trello. Tasks appear as cards that you drag between status columns. Our marketing team preferred this for campaign management. The cards can display custom fields, making them information-rich without opening each task.' }
      ]
    },
    {
      _type: 'block',
      _key: 'features-calendar',
      style: 'normal',
      children: [
        { _type: 'span', text: 'Calendar View', marks: ['strong'] },
        { _type: 'span', text: ' shows tasks on a monthly, weekly, or daily calendar. You can drag tasks to different dates, create tasks by clicking dates, and sync with external calendars. Color coding by project or priority helps visualize workload distribution.' }
      ]
    },
    {
      _type: 'block',
      _key: 'features-gantt',
      style: 'normal',
      children: [
        { _type: 'span', text: 'Gantt View', marks: ['strong'] },
        { _type: 'span', text: ' reveals project timelines and dependencies. You can drag to adjust dates, link dependent tasks, and identify critical paths. The Gantt chart updates in real-time as tasks progress. Project managers loved this view, though it requires the Business plan for full features.' }
      ]
    },
    
    // Time Tracking & Resource Management
    {
      _type: 'block',
      _key: 'time1',
      style: 'h3',
      children: [{ _type: 'span', text: 'Time Tracking & Resource Management - Almost There' }]
    },
    {
      _type: 'block',
      _key: 'time2',
      style: 'normal',
      children: [{ _type: 'span', text: 'ClickUp includes native time tracking at no extra cost, which immediately sets it apart from competitors who charge separately or require integrations.' }]
    },
    {
      _type: 'block',
      _key: 'time3',
      style: 'normal',
      children: [{ _type: 'span', text: 'The global timer lets you start tracking from anywhere in ClickUp. Click the timer icon, select a task, and start tracking. The timer persists as you navigate, showing elapsed time in the corner. Mobile apps support time tracking, though with some sync delays.' }]
    },
    {
      _type: 'block',
      _key: 'time4',
      style: 'normal',
      children: [{ _type: 'span', text: 'The problems emerge in the details. Starting a timer takes multiple clicks. You must have a task selected, meaning you can\'t start tracking and assign it later. The timer widget is small and easy to forget about. We had multiple instances of team members tracking time overnight because they forgot to stop the timer.' }]
    },
    
    // Collaboration Features
    {
      _type: 'block',
      _key: 'collab1',
      style: 'h3',
      children: [{ _type: 'span', text: 'Collaboration Features - Replacing Your Tool Stack' }]
    },
    {
      _type: 'block',
      _key: 'collab2',
      style: 'normal',
      children: [{ _type: 'span', text: 'ClickUp attempts to eliminate the need for separate collaboration tools. The success varies by feature.' }]
    },
    {
      _type: 'block',
      _key: 'collab-docs',
      style: 'normal',
      children: [
        { _type: 'span', text: 'ClickUp Docs', marks: ['strong'] },
        { _type: 'span', text: ' live inside ClickUp with real-time collaborative editing. Multiple users can work simultaneously with color-coded cursors. Rich formatting includes headers, tables, code blocks, and embedded media. You can embed live ClickUp tasks that update as task details change.' }
      ]
    },
    {
      _type: 'block',
      _key: 'collab-whiteboard',
      style: 'normal',
      children: [
        { _type: 'span', text: 'Whiteboards', marks: ['strong'] },
        { _type: 'span', text: ' enable visual collaboration. Draw shapes, add sticky notes, embed images, and connect elements with arrows. Real-time collaboration shows other users\' cursors. Convert whiteboard elements into tasks. Embed live ClickUp tasks that update automatically.' }
      ]
    },
    
    // Automation
    {
      _type: 'block',
      _key: 'automation1',
      style: 'h3',
      children: [{ _type: 'span', text: 'Automation - Time Saver or Time Sink?' }]
    },
    {
      _type: 'block',
      _key: 'automation2',
      style: 'normal',
      children: [{ _type: 'span', text: 'ClickUp\'s automation promises to eliminate repetitive work. The reality depends on your patience for configuration.' }]
    },
    {
      _type: 'block',
      _key: 'automation3',
      style: 'normal',
      children: [{ _type: 'span', text: 'Automations follow an if-this-then-that logic. When a trigger occurs (status changes, due date arrives, custom field updates), actions execute (move task, assign person, add comment). Add conditions to make automations more specific.' }]
    },
    {
      _type: 'block',
      _key: 'automation4',
      style: 'normal',
      children: [{ _type: 'span', text: 'We automated our entire client onboarding process. When a deal closes in our CRM (via Zapier), ClickUp creates a project from a template, assigns team members, sets due dates based on start date, sends a welcome email to the client, and creates recurring check-in tasks.' }]
    },
    
    // ClickUp Pros
    {
      _type: 'block',
      _key: 'pros1',
      style: 'h2',
      children: [{ _type: 'span', text: 'ClickUp Pros: The Bright Side' }]
    },
    {
      _type: 'block',
      _key: 'pros-custom',
      style: 'h3',
      children: [{ _type: 'span', text: 'Unmatched Customization Flexibility' }]
    },
    {
      _type: 'block',
      _key: 'pros-custom2',
      style: 'normal',
      children: [{ _type: 'span', text: 'No other tool we\'ve tested matches ClickUp\'s customization depth. Every aspect molds to your workflow. Status names, colors, and workflows are completely customizable. Create unlimited custom fields of various types. Build views that show exactly what each role needs to see. Design automations that match your exact processes.' }]
    },
    {
      _type: 'block',
      _key: 'pros-value',
      style: 'h3',
      children: [{ _type: 'span', text: 'Exceptional Value Proposition' }]
    },
    {
      _type: 'block',
      _key: 'pros-value2',
      style: 'normal',
      children: [{ _type: 'span', text: 'The free plan embarrasses competitors. Unlimited users and tasks for free? That\'s unheard of. Small teams can run entirely on the free plan. The paid plans offer features that would cost hundreds monthly if purchased separately.' }]
    },
    {
      _type: 'block',
      _key: 'pros-value3',
      style: 'normal',
      children: [{ _type: 'span', text: 'We calculated our tool consolidation savings. ClickUp replaced Trello ($10/user), Harvest ($12/user), Confluence ($5/user), and partially replaced Slack ($7/user). That\'s $34 per user in eliminated costs. ClickUp at $12/user saved us $22 per person monthly, or $3,168 annually for our 12-person team.' }]
    },
    
    // ClickUp Cons
    {
      _type: 'block',
      _key: 'cons1',
      style: 'h2',
      children: [{ _type: 'span', text: 'ClickUp Cons: The Pain Points' }]
    },
    {
      _type: 'block',
      _key: 'cons-complex',
      style: 'h3',
      children: [{ _type: 'span', text: 'Overwhelming Complexity and Learning Curve' }]
    },
    {
      _type: 'block',
      _key: 'cons-complex2',
      style: 'normal',
      children: [{ _type: 'span', text: 'ClickUp is not intuitive. The interface overwhelms with options, buttons, and menus. Finding specific settings requires hunting through multiple levels of configuration. Simple tasks require multiple clicks. Advanced features need documentation to understand.' }]
    },
    {
      _type: 'block',
      _key: 'cons-complex3',
      style: 'normal',
      children: [{ _type: 'span', text: 'New team members needed two weeks to feel basically comfortable. A month passed before they were genuinely productive. Compare this to Trello, which most people understand in five minutes. We created a 20-page onboarding guide and still fielded daily questions for weeks.' }]
    },
    {
      _type: 'block',
      _key: 'cons-performance',
      style: 'h3',
      children: [{ _type: 'span', text: 'Persistent Performance Issues' }]
    },
    {
      _type: 'block',
      _key: 'cons-performance2',
      style: 'normal',
      children: [{ _type: 'span', text: 'ClickUp loads slowly. Opening the app takes 5-10 seconds. Switching views takes 3-5 seconds. Opening large tasks with many comments takes even longer. These delays accumulate into significant productivity loss.' }]
    },
    {
      _type: 'block',
      _key: 'cons-mobile',
      style: 'h3',
      children: [{ _type: 'span', text: 'Mobile App Limitations' }]
    },
    {
      _type: 'block',
      _key: 'cons-mobile2',
      style: 'normal',
      children: [{ _type: 'span', text: 'The mobile experience deserves its own callout. While ClickUp offers mobile apps, they\'re clearly an afterthought. Many features are missing entirely. Others work differently than desktop. The interface feels cramped on phones.' }]
    },
    
    // Comparisons
    {
      _type: 'block',
      _key: 'compare1',
      style: 'h2',
      children: [{ _type: 'span', text: 'ClickUp vs Competitors: Detailed Comparisons' }]
    },
    {
      _type: 'block',
      _key: 'compare-asana',
      style: 'h3',
      children: [{ _type: 'span', text: 'ClickUp vs Asana: Polish vs Power' }]
    },
    {
      _type: 'block',
      _key: 'compare-asana2',
      style: 'normal',
      children: [{ _type: 'span', text: 'Asana feels like a luxury car—refined, intuitive, and pleasant to use. Everything works smoothly. The interface is clean and uncluttered. New users understand it quickly. The mobile app is excellent.' }]
    },
    {
      _type: 'block',
      _key: 'compare-asana3',
      style: 'normal',
      children: [{ _type: 'span', text: 'But Asana lacks ClickUp\'s depth. Customization is limited. Advanced features cost extra. Time tracking requires integration. Docs are basic. Automation is simpler. You\'ll need additional tools for complete functionality.' }]
    },
    {
      _type: 'block',
      _key: 'compare-monday',
      style: 'h3',
      children: [{ _type: 'span', text: 'ClickUp vs Monday.com: Visual vs Versatile' }]
    },
    {
      _type: 'block',
      _key: 'compare-monday2',
      style: 'normal',
      children: [{ _type: 'span', text: 'Monday.com emphasizes visual project management with colorful boards and intuitive workflows. It\'s easier to learn than ClickUp but less customizable. The interface delights with animations and visual feedback.' }]
    },
    {
      _type: 'block',
      _key: 'compare-notion',
      style: 'h3',
      children: [{ _type: 'span', text: 'ClickUp vs Notion: Workspace vs Wiki' }]
    },
    {
      _type: 'block',
      _key: 'compare-notion2',
      style: 'normal',
      children: [{ _type: 'span', text: 'Notion is fundamentally different. It\'s a knowledge base that can handle project management, while ClickUp is project management that includes knowledge features. Notion excels at documentation, wikis, and databases. Its flexibility for creating custom information structures is unmatched.' }]
    },
    
    // Best Use Cases
    {
      _type: 'block',
      _key: 'usecase1',
      style: 'h2',
      children: [{ _type: 'span', text: 'Best Use Cases & Industries' }]
    },
    {
      _type: 'block',
      _key: 'usecase-agency',
      style: 'h3',
      children: [{ _type: 'span', text: 'Marketing Agencies - Perfect Fit' }]
    },
    {
      _type: 'block',
      _key: 'usecase-agency2',
      style: 'normal',
      children: [{ _type: 'span', text: 'Marketing agencies find ClickUp nearly perfect for their needs. The ability to create separate Spaces for each client maintains organization. Custom fields track campaign metrics. Time tracking enables accurate billing. Guest access lets clients view their projects without seeing others\' work.' }]
    },
    {
      _type: 'block',
      _key: 'usecase-dev',
      style: 'h3',
      children: [{ _type: 'span', text: 'Software Development Teams - Capable but Compromised' }]
    },
    {
      _type: 'block',
      _key: 'usecase-dev2',
      style: 'normal',
      children: [{ _type: 'span', text: 'Development teams can use ClickUp successfully, but it requires careful configuration. Sprint planning works with custom fields and automation. The GitHub integration keeps code connected to tasks. Different views accommodate different roles. However, ClickUp lacks Jira\'s depth for complex development workflows.' }]
    },
    
    // Who Should NOT Use ClickUp
    {
      _type: 'block',
      _key: 'avoid1',
      style: 'h2',
      children: [{ _type: 'span', text: 'Who Should NOT Use ClickUp' }]
    },
    {
      _type: 'block',
      _key: 'avoid2',
      style: 'normal',
      children: [{ _type: 'span', text: 'Certain teams should avoid ClickUp entirely. Recognizing these scenarios prevents wasted time and frustration.' }]
    },
    {
      _type: 'block',
      _key: 'avoid-small',
      style: 'h3',
      children: [{ _type: 'span', text: 'Very Small Teams (Under 5 People)' }]
    },
    {
      _type: 'block',
      _key: 'avoid-small2',
      style: 'normal',
      children: [{ _type: 'span', text: 'Teams under five people don\'t need ClickUp\'s complexity. The setup time exceeds the benefits. Feature overload creates confusion. Simple alternatives work better.' }]
    },
    {
      _type: 'block',
      _key: 'avoid-simple',
      style: 'h3',
      children: [{ _type: 'span', text: 'Simplicity-First Organizations' }]
    },
    {
      _type: 'block',
      _key: 'avoid-simple2',
      style: 'normal',
      children: [{ _type: 'span', text: 'If your team values simplicity above features, ClickUp will frustrate everyone. The interface complexity never disappears completely. Even with training, some people never feel comfortable. Teams with low technical confidence struggle perpetually.' }]
    },
    
    // Final Verdict
    {
      _type: 'block',
      _key: 'verdict1',
      style: 'h2',
      children: [{ _type: 'span', text: 'Final Verdict & Recommendations' }]
    },
    {
      _type: 'block',
      _key: 'verdict2',
      style: 'normal',
      children: [{ _type: 'span', text: 'After six months and thousands of hours testing, ClickUp earns a qualified recommendation.' }]
    },
    {
      _type: 'block',
      _key: 'verdict3',
      style: 'h3',
      children: [{ _type: 'span', text: 'Overall Rating: 4.2/5' }]
    },
    {
      _type: 'block',
      _key: 'verdict4',
      style: 'normal',
      children: [{ _type: 'span', text: 'ClickUp delivers exceptional value and flexibility for teams willing to invest the time. The free plan embarrasses competitors. Paid plans offer features that would cost significantly more if purchased separately. For the right teams, it\'s transformative.' }]
    },
    {
      _type: 'block',
      _key: 'verdict5',
      style: 'normal',
      children: [{ _type: 'span', text: 'But the learning curve, performance issues, and overwhelming complexity limit its appeal. Many teams would be happier with simpler alternatives. ClickUp succeeds by doing everything but excels at nothing in particular.' }]
    },
    {
      _type: 'block',
      _key: 'verdict-best-for',
      style: 'h3',
      children: [{ _type: 'span', text: 'Best For: The Ideal ClickUp Users' }]
    },
    {
      _type: 'block',
      _key: 'verdict-best-list',
      style: 'normal',
      children: [{ _type: 'span', text: '• Growing companies (10-50 employees) benefit most from ClickUp\'s scalability and tool consolidation\n• Marketing agencies find ClickUp nearly perfect with client management, time tracking, and profitability analysis features\n• Remote teams appreciate the centralization despite performance challenges\n• Budget-conscious organizations save significantly through tool consolidation\n• Teams with complex workflows that simpler tools can\'t accommodate' }]
    },
    {
      _type: 'block',
      _key: 'verdict-bottom',
      style: 'h3',
      children: [{ _type: 'span', text: 'The Bottom Line' }]
    },
    {
      _type: 'block',
      _key: 'verdict-bottom2',
      style: 'normal',
      children: [{ _type: 'span', text: 'ClickUp isn\'t the perfect "everything app" it claims to be. But it\'s remarkably close for teams willing to invest the effort. The combination of features, flexibility, and value is unmatched. Just ensure you understand what you\'re signing up for.' }]
    },
    {
      _type: 'block',
      _key: 'verdict-cta',
      style: 'normal',
      children: [{ _type: 'span', text: 'Start with the free plan. Give yourself at least a month for proper evaluation. If your team adapts well, upgrading is easy. If not, you\'ve learned what you actually need in a project management tool.' }]
    }
  ]

  // Update the ClickUp review with the new comprehensive content
  try {
    const result = await client
      .patch(reviewId)
      .set({ 
        content: updatedContent,
        excerpt: 'After 6+ months of intensive testing with a 12-person team across 200+ projects, this comprehensive ClickUp review reveals exactly where the "one app to replace them all" succeeds and fails. Discover the real pros, cons, and hidden costs.',
        tagline: 'One app to replace them all - but should you?',
        lastUpdated: new Date().toISOString()
      })
      .commit()
    
    console.log('✓ Successfully updated ClickUp review with comprehensive content')
    console.log(`  - Added ${updatedContent.length} content blocks`)
    console.log(`  - Review ID: ${result._id}`)
  } catch (error) {
    console.error('✗ Error updating ClickUp review:', error)
  }
}

updateClickUpReview()