import React from 'react'

interface LongFormContentProps {
  automatedContent: any
  software: any
}

export default function LongFormContent({ automatedContent, software }: LongFormContentProps) {
  // Helper function to expand content into multiple paragraphs
  const expandContent = (content: string, additionalContext?: string) => {
    if (!content) return null
    
    // Split content into sentences and group them into paragraphs
    const sentences = content.split('. ').filter(s => s.length > 0)
    const paragraphs = []
    
    // First paragraph - main content
    paragraphs.push(content)
    
    // Add additional context if provided
    if (additionalContext) {
      paragraphs.push(additionalContext)
    }
    
    return paragraphs
  }

  return (
    <div className="space-y-12">
      {/* Comprehensive Overview Section */}
      {automatedContent.overview && (
        <section>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            What is {software.name}?
          </h3>
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-gray-700 dark:text-gray-300">
              {automatedContent.overview}
            </p>
            
            {software.companyInfo && (
              <p className="text-gray-700 dark:text-gray-300">
                Founded in {software.companyInfo.foundedYear} and headquartered in {software.companyInfo.headquarters}, 
                {software.name} has grown to serve {software.companyInfo.customers || 'thousands of customers'} worldwide. 
                {software.companyInfo.funding && ` With ${software.companyInfo.funding} in funding and a valuation of ${software.companyInfo.valuation}, 
                the company has established itself as a major player in the workflow automation space.`}
              </p>
            )}
            
            {software.quickStats?.totalUsers && (
              <p className="text-gray-700 dark:text-gray-300">
                The platform currently boasts {software.quickStats.totalUsers} across various industries, 
                making it one of the most widely adopted solutions in its category. {software.quickStats.awards && software.quickStats.awards.length > 0 && 
                `Recent accolades include ${software.quickStats.awards.join(', ')}, further cementing its position as an industry leader.`}
              </p>
            )}

            {/* Key Value Proposition */}
            <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6 my-6">
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                <strong>Key Value Proposition:</strong> {software.tagline}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* In-Depth Features Analysis */}
      {automatedContent.featuresAnalysis && (
        <section>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Features Deep Dive
          </h3>
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-gray-700 dark:text-gray-300">
              {automatedContent.featuresAnalysis}
            </p>
            
            {software.keyFeatures && software.keyFeatures.length > 0 && (
              <>
                <p className="text-gray-700 dark:text-gray-300">
                  Let's explore the standout features that set {software.name} apart from its competitors:
                </p>
                
                <div className="grid gap-6 mt-6">
                  {software.keyFeatures.slice(0, 4).map((feature: any, index: number) => (
                    <div key={feature._key || index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {index + 1}. {feature.name}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {feature.description}
                      </p>
                      {feature.category && (
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                          <em>Category: {feature.category}</em>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mt-6">
                  These features work together to create a comprehensive ecosystem that addresses the diverse needs of modern teams. 
                  The platform's modular approach means you can enable or disable features based on your specific requirements, 
                  avoiding the feature bloat that plagues many all-in-one solutions.
                </p>
              </>
            )}
          </div>
        </section>
      )}

      {/* Integration Ecosystem */}
      {automatedContent.integrationsAnalysis && (
        <section>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Integration Ecosystem & Connectivity
          </h3>
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-gray-700 dark:text-gray-300">
              {automatedContent.integrationsAnalysis}
            </p>
            
            {software.popularIntegrations && software.popularIntegrations.length > 0 && (
              <>
                <p className="text-gray-700 dark:text-gray-300">
                  The most popular integrations include connections with {software.popularIntegrations.slice(0, 5).join(', ')}, 
                  and many more. This extensive integration network ensures that {software.name} can seamlessly fit into your 
                  existing tech stack without requiring a complete overhaul of your current systems.
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 my-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Integration Highlights
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {software.popularIntegrations.map((integration: string, index: number) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-blue-500">✓</span> {integration}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            
            <p className="text-gray-700 dark:text-gray-300">
              {software.integrations?.hasAPI && 'The robust API infrastructure allows developers to build custom integrations and extend functionality beyond the out-of-the-box capabilities. '}
              {software.integrations?.hasWebhooks && 'Real-time webhooks ensure that data flows seamlessly between systems, keeping all your tools synchronized. '}
              {software.integrations?.hasZapier && 'For non-technical users, Zapier integration opens up thousands of additional connection possibilities without writing a single line of code.'}
            </p>
          </div>
        </section>
      )}

      {/* Performance & Reliability */}
      {automatedContent.performanceNotes && (
        <section>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Performance & Reliability Assessment
          </h3>
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-gray-700 dark:text-gray-300">
              {automatedContent.performanceNotes}
            </p>
            
            {software.technical?.uptime && (
              <p className="text-gray-700 dark:text-gray-300">
                {software.name} maintains a {software.technical.uptime} uptime SLA, ensuring your team can rely on the platform 
                for critical business operations. This level of reliability is essential for organizations that depend on their 
                project management tools for daily operations and client deliverables.
              </p>
            )}
            
            <p className="text-gray-700 dark:text-gray-300">
              The platform's architecture is designed to handle scale, though as with any feature-rich application, 
              performance can vary based on usage patterns and workspace complexity. Regular updates and optimizations 
              from the development team continue to improve the overall user experience, with particular focus on 
              load times and responsiveness.
            </p>

            {software.mobile && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 my-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Mobile Performance
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {software.mobile.hasIOS && software.mobile.hasAndroid && 
                    `Native mobile apps for both iOS (rated ${software.mobile.iosRating}/5) and Android (rated ${software.mobile.androidRating}/5) 
                    provide on-the-go access to your projects and tasks. `}
                  {software.mobile.offlineCapability && 
                    'Offline functionality ensures you can continue working even without an internet connection, with changes syncing once you reconnect. '}
                  The mobile experience, while not as feature-complete as the desktop version, covers essential functionality 
                  for team members who need to stay connected while away from their desks.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Security & Compliance */}
      {automatedContent.securityAnalysis && (
        <section>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Security, Privacy & Compliance
          </h3>
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-gray-700 dark:text-gray-300">
              {automatedContent.securityAnalysis}
            </p>
            
            {software.security && (
              <>
                <p className="text-gray-700 dark:text-gray-300">
                  The platform employs industry-standard security measures including {software.security.dataEncryption}. 
                  Access controls include {software.security.accessControls?.join(', ')}, giving administrators 
                  granular control over user permissions and data access.
                </p>
                
                {software.security.certifications && software.security.certifications.length > 0 && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 my-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Security Certifications & Standards
                    </h4>
                    <ul className="space-y-2">
                      {software.security.certifications.map((cert: string, index: number) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-green-500">🔒</span> {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <p className="text-gray-700 dark:text-gray-300">
                  {software.security.dataResidency && `Data residency options include ${software.security.dataResidency.join(' and ')}, 
                  allowing organizations to comply with regional data protection regulations. `}
                  For enterprises with stringent security requirements, it's worth noting what's not included and considering 
                  whether additional security measures may be needed for your specific use case.
                </p>
              </>
            )}
          </div>
        </section>
      )}

      {/* Customer Support Experience */}
      {automatedContent.supportAnalysis && (
        <section>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Customer Support & Resources
          </h3>
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-gray-700 dark:text-gray-300">
              {automatedContent.supportAnalysis}
            </p>
            
            {software.support && (
              <>
                <p className="text-gray-700 dark:text-gray-300">
                  Beyond direct support channels, {software.name} provides extensive self-service resources. 
                  {software.support.hasKnowledgeBase && 'The comprehensive knowledge base covers everything from basic setup to advanced configurations. '}
                  {software.support.hasVideoTutorials && 'Video tutorials offer visual learners step-by-step guidance through common tasks and workflows. '}
                  {software.support.hasCommunityForum && 'The active community forum connects users worldwide, fostering knowledge sharing and peer support. '}
                </p>
                
                {software.support.channels && software.support.channels.length > 0 && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 my-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Support Channels by Plan
                    </h4>
                    <div className="space-y-3">
                      {software.support.channels.map((channel: any, index: number) => (
                        <div key={channel._key || index} className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{channel.type}</span>
                          <span className="text-gray-600 dark:text-gray-400">
                            {channel.availability} • {channel.responseTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <p className="text-gray-700 dark:text-gray-300">
                  {software.support.hasCertification && `For teams looking to maximize their investment, ${software.name} offers a certification program 
                  that helps users become power users and internal champions. `}
                  The learning curve is real, but the investment in training pays dividends in productivity gains once teams 
                  are fully onboarded and comfortable with the platform's capabilities.
                </p>
              </>
            )}
          </div>
        </section>
      )}

      {/* Pricing & Value Analysis */}
      {automatedContent.pricingAnalysis && (
        <section>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Pricing Strategy & Value Proposition
          </h3>
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-gray-700 dark:text-gray-300">
              {automatedContent.pricingAnalysis}
            </p>
            
            {software.pricingDetails && (
              <>
                <p className="text-gray-700 dark:text-gray-300">
                  {software.pricingDetails.hasFreeTier && `The free tier is particularly generous, making ${software.name} accessible to startups 
                  and small teams who are just beginning their automation journey. As your needs grow, the paid tiers unlock 
                  progressively more powerful features without breaking the bank. `}
                  {software.pricingDetails.discounts && `Additional savings are available through ${software.pricingDetails.discounts}. `}
                </p>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 my-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    💡 Value Consideration
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    When evaluating the total cost of ownership, consider not just the subscription fees but also the 
                    potential savings from consolidating multiple tools into one platform. Many teams find that {software.name} 
                    can replace 3-5 separate tools, resulting in net savings despite the monthly subscription cost.
                  </p>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300">
                  {software.pricingDetails.hiddenCosts && `Be aware of potential additional costs: ${software.pricingDetails.hiddenCosts} 
                  Factor these into your budget planning to avoid surprises down the road. `}
                  The transparent pricing model and clear feature differentiation between tiers make it easy to choose 
                  the right plan for your team's current needs while leaving room for growth.
                </p>
              </>
            )}
          </div>
        </section>
      )}

      {/* Competitive Landscape */}
      {automatedContent.competitorComparison && (
        <section>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Competitive Analysis & Market Position
          </h3>
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-gray-700 dark:text-gray-300">
              {automatedContent.competitorComparison}
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              In the crowded project management space, {software.name} has carved out a unique position by focusing on 
              customization and flexibility. While competitors may excel in specific areas—Asana in simplicity, 
              Jira in development workflows, Monday.com in visual appeal—{software.name} aims to be the Swiss Army knife 
              that can adapt to any team's needs.
            </p>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 my-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Key Differentiators
              </h4>
              <ul className="space-y-2">
                <li className="text-gray-700 dark:text-gray-300">
                  <strong>Customization:</strong> Unmatched flexibility in adapting the platform to your workflow
                </li>
                <li className="text-gray-700 dark:text-gray-300">
                  <strong>Value:</strong> More features at a lower price point than most competitors
                </li>
                <li className="text-gray-700 dark:text-gray-300">
                  <strong>All-in-One:</strong> Genuine ability to replace multiple tools with one platform
                </li>
                <li className="text-gray-700 dark:text-gray-300">
                  <strong>Scalability:</strong> Grows with your team from startup to enterprise
                </li>
              </ul>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300">
              The choice between {software.name} and its competitors often comes down to your team's specific needs and 
              preferences. Teams that value customization and are willing to invest time in setup will find {software.name} 
              rewarding. Those seeking immediate out-of-the-box productivity might prefer simpler alternatives.
            </p>
          </div>
        </section>
      )}

      {/* When to Choose Section */}
      {(software.whenToChoose || software.whenNotToChoose) && (
        <section>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Decision Framework: Is {software.name} Right for You?
          </h3>
          <div className="space-y-6">
            {software.whenToChoose && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  ✅ Choose {software.name} When:
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {software.whenToChoose}
                </p>
              </div>
            )}
            
            {software.whenNotToChoose && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  ❌ Consider Alternatives When:
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {software.whenNotToChoose}
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}