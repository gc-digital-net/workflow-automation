import { CheckIcon } from '@heroicons/react/24/outline'

export function GuideBuyersGuide() {
  const considerations = [
    {
      title: 'Team Size & Scalability',
      description: 'Consider your current team size and future growth. Some tools excel for small teams but become expensive or complex as you scale.'
    },
    {
      title: 'Budget & ROI',
      description: 'Calculate the total cost including all users, add-ons, and integrations. Compare this against the productivity gains and time savings.'
    },
    {
      title: 'Feature Requirements',
      description: 'List your must-have features versus nice-to-haves. Avoid paying for complex features you won\'t use.'
    },
    {
      title: 'Integration Ecosystem',
      description: 'Check if the tool integrates with your existing software stack. Native integrations are usually more reliable than third-party connectors.'
    },
    {
      title: 'Learning Curve',
      description: 'Factor in training time and adoption resistance. The best tool is one your team will actually use.'
    },
    {
      title: 'Support & Resources',
      description: 'Evaluate the quality of customer support, documentation, and community resources available.'
    }
  ]

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">How to Choose the Right Project Management Software</h2>
      
      <div className="prose prose-lg max-w-none mb-8">
        <p>
          Selecting the right project management software is crucial for your team's productivity and success. 
          Here's what you should consider when making your decision:
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {considerations.map((item, index) => (
          <div key={index} className="bg-card border rounded-lg p-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-primary/5 border-l-4 border-primary rounded-lg">
        <h3 className="font-semibold mb-2">Pro Tip: Start with Free Trials</h3>
        <p className="text-sm">
          Most project management tools offer free trials or free plans. We recommend testing your top 2-3 choices 
          with real projects before committing. Pay attention to how intuitive the interface feels and how quickly 
          your team adopts it.
        </p>
      </div>
    </section>
  )
}