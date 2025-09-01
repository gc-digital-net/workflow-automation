import { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'
import { guidesQuery } from '@/lib/sanity/queries/guides'
import { GuideCard } from '@/components/guides/GuideCard'
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Software Guides & Top Lists',
  description: 'Expert-curated guides to help you find the best workflow automation and project management software for your needs.',
}

export default async function GuidesPage() {
  const guides = await sanityFetch({
    query: guidesQuery,
    tags: ['topSoftware'],
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Software Guides
        </h1>
        <p className="text-xl text-muted-foreground">
          In-depth guides and rankings of the best workflow automation and project management tools.
          Our experts test and compare software to help you make the right choice.
        </p>
      </div>

      {guides?.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {guides.map((guide: any) => (
            <GuideCard key={guide._id} guide={guide} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground mb-4">
            No guides published yet.
          </p>
          <p className="text-sm text-muted-foreground">
            Check back soon for our expert software recommendations.
          </p>
        </div>
      )}

      <div className="mt-16 p-8 bg-muted/50 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          How We Create Our Guides
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-primary">1</span>
            </div>
            <h3 className="font-semibold mb-2">Research & Test</h3>
            <p className="text-sm text-muted-foreground">
              We thoroughly test each tool, exploring features, pricing, and real-world use cases.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-primary">2</span>
            </div>
            <h3 className="font-semibold mb-2">Compare & Analyze</h3>
            <p className="text-sm text-muted-foreground">
              We compare tools side-by-side, analyzing strengths, weaknesses, and value for money.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-primary">3</span>
            </div>
            <h3 className="font-semibold mb-2">Rank & Recommend</h3>
            <p className="text-sm text-muted-foreground">
              We rank tools based on overall value and provide specific recommendations for different needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}