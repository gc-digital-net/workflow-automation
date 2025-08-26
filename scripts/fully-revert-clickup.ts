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

async function fullyRevertClickUp() {
  try {
    const query = `*[_type == "software" && name == "ClickUp"][0]`
    const review = await client.fetch(query)
    
    if (!review) {
      console.log('ClickUp review not found')
      return
    }

    console.log(`Found ClickUp review with ID: ${review._id}`)
    
    // First, unset the content field to remove all the blocks
    const unsetResult = await client
      .patch(review._id)
      .unset(['content'])
      .commit()
    
    console.log('✓ Removed content field with 74 blocks')

    // Now set the simple structure
    const result = await client
      .patch(review._id)
      .set({
        name: 'ClickUp',
        tagline: 'One app to replace them all',
        shortDescription: 'All-in-one project management platform with customizable workflows',
        overview: {
          introduction: [
            {
              _type: 'block',
              _key: 'intro1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'ClickUp is a comprehensive project management and productivity platform designed to consolidate all work tools into one application.',
                  _key: 'intro1span'
                }
              ],
              markDefs: []
            }
          ],
          keyFeatures: [
            { feature: 'Customizable Views', description: 'Multiple view types including List, Board, Calendar, Gantt, and more' },
            { feature: 'Automation', description: 'Built-in automation to streamline repetitive tasks' },
            { feature: 'Integrations', description: 'Connect with 1000+ tools' },
            { feature: 'Collaboration', description: 'Real-time collaboration with comments, docs, and chat' },
            { feature: 'Time Tracking', description: 'Native time tracking and reporting' }
          ],
          targetAudience: [
            {
              _type: 'block',
              _key: 'target1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'ClickUp is ideal for teams of all sizes, from startups to enterprise organizations, looking for a flexible and scalable project management solution.',
                  _key: 'target1span'
                }
              ],
              markDefs: []
            }
          ]
        },
        detailedReview: {
          userInterface: [
            {
              _type: 'block',
              _key: 'ui1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'ClickUp offers a modern, intuitive interface with extensive customization options. Users can personalize their workspace with custom themes and layouts.',
                  _key: 'ui1span'
                }
              ],
              markDefs: []
            }
          ],
          featuresAnalysis: [
            {
              _type: 'block',
              _key: 'features1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'ClickUp provides an extensive feature set including task management, docs, goals, whiteboards, and dashboards. The platform excels in flexibility and customization.',
                  _key: 'features1span'
                }
              ],
              markDefs: []
            }
          ],
          integrationCapabilities: [
            {
              _type: 'block',
              _key: 'int1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'With over 1000 integrations through native connections, Zapier, and API, ClickUp connects seamlessly with your existing tech stack.',
                  _key: 'int1span'
                }
              ],
              markDefs: []
            }
          ],
          performanceReliability: [
            {
              _type: 'block',
              _key: 'perf1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'ClickUp maintains high uptime and performance standards with regular updates and improvements. Mobile apps provide full functionality on the go.',
                  _key: 'perf1span'
                }
              ],
              markDefs: []
            }
          ],
          securityCompliance: [
            {
              _type: 'block',
              _key: 'sec1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Enterprise-grade security with SOC 2 Type II certification, GDPR compliance, and advanced permission controls.',
                  _key: 'sec1span'
                }
              ],
              markDefs: []
            }
          ],
          customerSupport: [
            {
              _type: 'block',
              _key: 'support1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: '24/7 customer support with live chat, extensive documentation, video tutorials, and an active community forum.',
                  _key: 'support1span'
                }
              ],
              markDefs: []
            }
          ]
        },
        pricingSection: {
          pricingOverview: [
            {
              _type: 'block',
              _key: 'price1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'ClickUp offers flexible pricing with a generous free tier and scalable paid plans for growing teams.',
                  _key: 'price1span'
                }
              ],
              markDefs: []
            }
          ],
          valueForMoney: [
            {
              _type: 'block',
              _key: 'value1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Excellent value proposition with comprehensive features at competitive prices. The free tier is particularly generous.',
                  _key: 'value1span'
                }
              ],
              markDefs: []
            }
          ],
          competitiveComparison: [
            {
              _type: 'block',
              _key: 'comp1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'More affordable than Monday.com and Asana for comparable features. Better value than most competitors.',
                  _key: 'comp1span'
                }
              ],
              markDefs: []
            }
          ]
        },
        useCasesSection: {
          idealUseCases: [
            {
              _type: 'block',
              _key: 'use1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Perfect for agile development teams, marketing agencies, remote teams, and growing startups.',
                  _key: 'use1span'
                }
              ],
              markDefs: []
            }
          ],
          implementationGuide: [
            {
              _type: 'block',
              _key: 'impl1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Start with templates, customize workflows gradually, and scale features as your team grows.',
                  _key: 'impl1span'
                }
              ],
              markDefs: []
            }
          ],
          realWorldExamples: []
        },
        competitorAnalysis: {
          competitiveAdvantages: [
            {
              _type: 'block',
              _key: 'adv1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'ClickUp excels in customization, feature depth, and value for money compared to competitors.',
                  _key: 'adv1span'
                }
              ],
              markDefs: []
            }
          ],
          competitiveDisadvantages: [
            {
              _type: 'block',
              _key: 'disadv1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Can have a steeper learning curve due to extensive features. Some users may find it overwhelming initially.',
                  _key: 'disadv1span'
                }
              ],
              markDefs: []
            }
          ]
        },
        finalVerdict: {
          summary: [
            {
              _type: 'block',
              _key: 'summary1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'ClickUp is a powerful, versatile project management solution that delivers exceptional value.',
                  _key: 'summary1span'
                }
              ],
              markDefs: []
            }
          ],
          recommendation: [
            {
              _type: 'block',
              _key: 'rec1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Highly recommended for teams seeking a comprehensive, customizable project management platform.',
                  _key: 'rec1span'
                }
              ],
              markDefs: []
            }
          ],
          whoShouldUse: [
            {
              _type: 'block',
              _key: 'who1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Teams that need flexibility, startups, agencies, and organizations wanting to consolidate tools.',
                  _key: 'who1span'
                }
              ],
              markDefs: []
            }
          ],
          whoShouldAvoid: [
            {
              _type: 'block',
              _key: 'avoid1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Teams preferring simple, minimal tools or those with very specific industry requirements.',
                  _key: 'avoid1span'
                }
              ],
              markDefs: []
            }
          ]
        },
        faq: [
          {
            question: 'Is ClickUp really free?',
            answer: [
              {
                _type: 'block',
                _key: 'faq1a',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Yes, ClickUp offers a generous free plan with unlimited users and most core features.',
                    _key: 'faq1aspan'
                  }
                ],
                markDefs: []
              }
            ]
          },
          {
            question: 'How does ClickUp compare to Asana?',
            answer: [
              {
                _type: 'block',
                _key: 'faq2a',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'ClickUp offers more features and customization options at a lower price point than Asana.',
                    _key: 'faq2aspan'
                  }
                ],
                markDefs: []
              }
            ]
          },
          {
            question: 'Can ClickUp handle large teams?',
            answer: [
              {
                _type: 'block',
                _key: 'faq3a',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: 'Yes, ClickUp scales well with enterprise features, advanced permissions, and dedicated support.',
                    _key: 'faq3aspan'
                  }
                ],
                markDefs: []
              }
            ]
          }
        ]
      })
      .commit()

    console.log('✓ Successfully reverted ClickUp review')
    console.log(`  - Review ID: ${result._id}`)

  } catch (error) {
    console.error('Error reverting review:', error)
  }
}

fullyRevertClickUp()