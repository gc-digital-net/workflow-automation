import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function updateClickUpContent() {
  console.log('Updating ClickUp review content...')
  
  try {
    // Find the ClickUp review
    const query = `*[_type == "software" && name == "ClickUp"][0]`
    const clickupReview = await client.fetch(query)
    
    if (!clickupReview) {
      console.error('ClickUp review not found!')
      return
    }
    
    console.log('Found ClickUp review:', clickupReview._id)
    
    // Update with comprehensive content
    const updatedReview = await client
      .patch(clickupReview._id)
      .set({
        overview: {
          introduction: [
            {
              _type: 'block',
              _key: 'intro1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'ClickUp is a revolutionary all-in-one productivity platform that has transformed how teams collaborate and manage projects. Founded in 2017, ClickUp has rapidly grown to become one of the most comprehensive project management solutions available, serving over 2 million teams worldwide.',
                  _key: 'span1'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'intro2',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'What sets ClickUp apart is its ambitious goal to replace all other productivity tools by offering every feature teams need in a single platform. From task management and docs to goals and time tracking, ClickUp provides an unprecedented level of functionality while maintaining flexibility and customization options.',
                  _key: 'span2'
                }
              ]
            }
          ],
          keyFeatures: [
            {
              _key: 'feature1',
              feature: 'Multiple View Types',
              description: 'Choose from 15+ views including List, Board, Calendar, Gantt, Timeline, Workload, and more to visualize work your way.'
            },
            {
              _key: 'feature2',
              feature: 'ClickUp AI',
              description: 'Built-in AI assistant for writing, summarizing, and generating content directly within your workspace.'
            },
            {
              _key: 'feature3',
              feature: 'Custom Fields',
              description: 'Create any type of custom field to track information specific to your workflow and industry.'
            },
            {
              _key: 'feature4',
              feature: 'Automation',
              description: 'Powerful automation engine with 100+ pre-built templates and custom automation builder.'
            },
            {
              _key: 'feature5',
              feature: 'ClickUp Docs',
              description: 'Collaborative documents with real-time editing, nested pages, and direct task linking.'
            },
            {
              _key: 'feature6',
              feature: 'Goals & OKRs',
              description: 'Track high-level objectives with measurable targets linked to your tasks and projects.'
            },
            {
              _key: 'feature7',
              feature: 'Time Tracking',
              description: 'Native time tracking with reporting, timesheets, and billable hours management.'
            },
            {
              _key: 'feature8',
              feature: 'Whiteboards',
              description: 'Infinite canvas for brainstorming with shapes, sticky notes, and real-time collaboration.'
            }
          ],
          targetAudience: [
            {
              _type: 'block',
              _key: 'audience1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'ClickUp is designed for teams of all sizes across various industries. It particularly excels for:',
                  _key: 'span3'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'audience2',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Agile software development teams needing sprint planning and bug tracking',
                  _key: 'span4'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'audience3',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Marketing agencies managing multiple client projects and campaigns',
                  _key: 'span5'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'audience4',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Product teams coordinating roadmaps and feature releases',
                  _key: 'span6'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'audience5',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Remote teams requiring comprehensive collaboration tools',
                  _key: 'span7'
                }
              ]
            },
            {
              _type: 'block',
              _key: 'audience6',
              style: 'normal',
              listItem: 'bullet',
              children: [
                {
                  _type: 'span',
                  text: 'Enterprises looking to consolidate their tool stack',
                  _key: 'span8'
                }
              ]
            }
          ]
        },
        pricing: [
          {
            _key: 'free',
            name: 'Free Forever',
            price: 0,
            yearlyPrice: 0,
            features: [
              'Unlimited tasks',
              'Unlimited members',
              '60 uses of most views',
              '100MB storage',
              'Collaborative Docs',
              '24/7 support',
              '2-factor authentication'
            ],
            userLimit: 'Unlimited',
            storageLimit: '100MB',
            recommended: false,
            mostPopular: false
          },
          {
            _key: 'unlimited',
            name: 'Unlimited',
            price: 7,
            yearlyPrice: 60,
            features: [
              'Everything in Free',
              'Unlimited storage',
              'Unlimited integrations',
              'Unlimited dashboards',
              'Guests with permissions',
              'Goals & portfolios',
              'Custom fields',
              'Forms',
              'Resource management'
            ],
            userLimit: 'Unlimited',
            storageLimit: 'Unlimited',
            recommended: true,
            mostPopular: true
          },
          {
            _key: 'business',
            name: 'Business',
            price: 12,
            yearlyPrice: 108,
            features: [
              'Everything in Unlimited',
              'Google SSO',
              'Unlimited teams',
              'Custom exporting',
              'Advanced automations',
              'Advanced dashboard features',
              'Workload management',
              'Timelines & Mind Maps',
              'Goal folders'
            ],
            userLimit: 'Unlimited',
            storageLimit: 'Unlimited',
            recommended: false,
            mostPopular: false
          },
          {
            _key: 'enterprise',
            name: 'Enterprise',
            price: 0, // Custom pricing
            yearlyPrice: 0,
            features: [
              'Everything in Business',
              'White labeling',
              'Advanced permissions',
              'SAML SSO',
              'Contract review',
              'Managed services',
              'Dedicated success manager',
              'Custom capacity',
              'API access limits increased'
            ],
            userLimit: 'Custom',
            storageLimit: 'Custom',
            recommended: false,
            mostPopular: false
          }
        ],
        companyInfo: {
          foundedYear: 2017,
          headquarters: 'San Diego, California, USA',
          employeeCount: '900+',
          funding: '$537.5M Series C (2021 valuation: $4B)'
        },
        dealInformation: {
          hasActiveDeal: true,
          dealDescription: 'Get 20% off your first year of any paid plan',
          dealCode: 'WORKFLOW20',
          dealExpiry: '2024-12-31T23:59:59Z'
        },
        categories: [], // Will be populated with references
        tags: [
          'project-management',
          'task-management',
          'collaboration',
          'productivity',
          'agile',
          'remote-work',
          'team-collaboration',
          'workflow-automation',
          'time-tracking',
          'resource-management'
        ]
      })
      .commit()
    
    console.log('✅ Successfully updated ClickUp review content!')
    
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Run the script
updateClickUpContent()
  .then(() => {
    console.log('✨ Content update complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })