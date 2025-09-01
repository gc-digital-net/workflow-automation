import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity/client'
import { guideBySlugQuery, guideSlugsQuery } from '@/lib/sanity/queries/guides'
import { GuideHero } from '@/components/guides/GuideHero'
import { GuideTableOfContents } from '@/components/guides/GuideTableOfContents'
import { GuideIntroduction } from '@/components/guides/GuideIntroduction'
import { GuideComparisonTable } from '@/components/guides/GuideComparisonTable'
import { GuideItem } from '@/components/guides/GuideItem'
import { GuideConclusion } from '@/components/guides/GuideConclusion'
import { GuideBuyersGuide } from '@/components/guides/GuideBuyersGuide'
import { GuideFAQ } from '@/components/guides/GuideFAQ'
import { NewsletterCTA } from '@/components/cta/NewsletterCTA'
import { RelatedGuides } from '@/components/guides/RelatedGuides'

interface GuidePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await sanityFetch({
    query: guideSlugsQuery,
    tags: ['topSoftware'],
  })

  return slugs?.map((slug: string) => ({ slug })) || []
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const guide = await sanityFetch({
    query: guideBySlugQuery,
    params: { slug: params.slug },
    tags: ['topSoftware'],
  })

  if (!guide) {
    return {}
  }

  const title = guide.seo?.metaTitle || guide.title
  const description = guide.seo?.metaDescription || guide.excerpt

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: guide.publishedAt,
      authors: guide.author?.name ? [guide.author.name] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const guide = await sanityFetch({
    query: guideBySlugQuery,
    params: { slug: params.slug },
    tags: ['topSoftware'],
  })

  if (!guide) {
    notFound()
  }

  // Get top 5 items for comparison table
  const topItems = guide.listItems?.slice(0, 5) || []
  
  // Check if we should show newsletter CTA (after 3rd item)
  const showNewsletterAfter = 3

  return (
    <article className="min-h-screen">
      <GuideHero guide={guide} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12 max-w-7xl mx-auto">
          <div className="lg:col-span-1">
            {/* Introduction Section */}
            {guide.introduction && (
              <GuideIntroduction content={guide.introduction} />
            )}

            {/* Methodology Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Testing Methodology</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  We spent over 200 hours testing and comparing these project management tools. 
                  Our evaluation process includes hands-on testing with real projects, analyzing 
                  user reviews, and consulting with industry experts.
                </p>
                <ul>
                  <li>Created test projects in each platform</li>
                  <li>Evaluated ease of use with team members</li>
                  <li>Tested integration capabilities</li>
                  <li>Analyzed pricing and value for money</li>
                  <li>Reviewed customer support quality</li>
                </ul>
              </div>
            </section>

            {/* Quick Comparison Table */}
            {topItems.length > 0 && (
              <GuideComparisonTable items={topItems} />
            )}

            {/* Ranked List of Tools */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8">
                The {guide.listItems?.length || 0} Best Project Management Software Tools
              </h2>
              
              <div className="space-y-12">
                {guide.listItems?.map((item: any, index: number) => (
                  <div key={item.rank}>
                    <GuideItem item={item} guide={guide} />
                    
                    {/* Newsletter CTA after 3rd item */}
                    {index === showNewsletterAfter - 1 && (
                      <div className="my-12">
                        <NewsletterCTA 
                          title="Get Weekly Software Tips"
                          description="Join 10,000+ professionals getting our best automation insights"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Buyer's Guide Section */}
            <GuideBuyersGuide />

            {/* FAQ Section */}
            <GuideFAQ />

            {/* Conclusion */}
            {guide.conclusion && (
              <GuideConclusion content={guide.conclusion} />
            )}
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <GuideTableOfContents items={guide.listItems} />
              
              {/* Quick Pick Box */}
              <div className="mt-8 p-6 bg-primary/5 border-2 border-primary/20 rounded-lg">
                <h3 className="font-bold text-lg mb-2">🏆 Our Top Pick</h3>
                <p className="text-sm mb-4">
                  {guide.listItems?.[0]?.software?.name || guide.listItems?.[0]?.customTitle}
                </p>
                <a
                  href={guide.listItems?.[0]?.affiliateLink || guide.listItems?.[0]?.software?.affiliateLink || '#'}
                  target="_blank"
                  rel="sponsored nofollow"
                  className="block w-full text-center bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Try It Free
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Guides */}
        <RelatedGuides currentGuideId={guide._id} />
      </div>
    </article>
  )
}