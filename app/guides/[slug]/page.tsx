import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity/client'
import { guideBySlugQuery, guideSlugsQuery } from '@/lib/sanity/queries/guides'
import { GuideHero } from '@/components/guides/GuideHero'
import { GuideTableOfContents } from '@/components/guides/GuideTableOfContents'
import { GuideIntroduction } from '@/components/guides/GuideIntroduction'
import { GuideComparisonTable } from '@/components/guides/GuideComparisonTable'
import { GuideItem } from '@/components/guides/GuideItem'
import { GuideItemEnhanced } from '@/components/guides/GuideItemEnhanced'
import { GuideConclusion } from '@/components/guides/GuideConclusion'
import { GuideBuyersGuide } from '@/components/guides/GuideBuyersGuide'
import { GuideFAQ } from '@/components/guides/GuideFAQ'
import { NewsletterCTA } from '@/components/cta/NewsletterCTA'
import { RelatedGuides } from '@/components/guides/RelatedGuides'
import { GuideStructuredData } from '@/components/seo/GuideStructuredData'
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

interface GuidePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch({
      query: guideSlugsQuery,
      tags: ['topSoftware'],
    })

    return slugs?.map((slug: string) => ({ slug })) || []
  } catch (error) {
    console.warn('Unable to generate static params for guides:', error)
    return []
  }
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  try {
    const guide = await sanityFetch({
      query: guideBySlugQuery,
      params: { slug: params.slug },
      tags: ['topSoftware'],
    })

    if (!guide) {
      return {
        title: 'Guide Not Found',
        description: 'The requested guide could not be found.',
      }
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
  } catch (error) {
    console.warn('Unable to generate metadata for guide:', error)
    return {
      title: 'Software Guide',
      description: 'Comprehensive software guides and comparisons.',
    }
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  let guide
  
  try {
    guide = await sanityFetch({
      query: guideBySlugQuery,
      params: { slug: params.slug },
      tags: ['topSoftware'],
    })
  } catch (error) {
    console.warn('Unable to fetch guide:', error)
    notFound()
  }

  if (!guide) {
    notFound()
  }

  // Get top 5 items for comparison table
  const topItems = guide.listItems?.slice(0, 5) || []
  
  // Check if we should show newsletter CTA (after 3rd item)
  const showNewsletterAfter = 3

  const guideUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/guides/${params.slug}`
  
  const breadcrumbItems = [
    { name: 'Guides', href: '/guides' },
    { name: guide.title, href: `/guides/${params.slug}` }
  ]

  const breadcrumbData = [
    { name: 'Home', url: process.env.NEXT_PUBLIC_SITE_URL || 'https://workflowautomation.net' },
    { name: 'Guides', url: `${process.env.NEXT_PUBLIC_SITE_URL}/guides` },
    { name: guide.title, url: guideUrl }
  ]

  return (
    <article className="min-h-screen">
      <GuideStructuredData guide={guide} url={guideUrl} />
      <BreadcrumbStructuredData items={breadcrumbData} />
      
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      
      <GuideHero guide={guide} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12 max-w-7xl mx-auto">
          <div className="lg:col-span-1">
            {/* Introduction Section */}
            {guide.introduction && (
              <GuideIntroduction content={guide.introduction} />
            )}

            {/* Trust & Methodology Section */}
            <section className="mb-12">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="p-2 bg-primary/10 rounded-lg">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  How We Test & Review
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">200+</div>
                    <div className="text-sm text-muted-foreground">Hours of Testing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{guide.listItems?.length || 0}</div>
                    <div className="text-sm text-muted-foreground">Tools Evaluated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">15+</div>
                    <div className="text-sm text-muted-foreground">Criteria Assessed</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                      <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div>
                      <h4 className="font-semibold">Hands-On Testing</h4>
                      <p className="text-sm text-muted-foreground">Created real projects in each platform to test actual functionality</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4h2a1 1 0 100 2 2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div>
                      <h4 className="font-semibold">Expert Analysis</h4>
                      <p className="text-sm text-muted-foreground">Consulted with industry professionals and power users</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <svg className="h-5 w-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div>
                      <h4 className="font-semibold">User Feedback</h4>
                      <p className="text-sm text-muted-foreground">Analyzed thousands of user reviews and testimonials</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-background/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Transparency Note:</strong> We may earn a commission when you use our links, but this never affects our rankings or recommendations. Our reviews are always independent and based on thorough testing.
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Comparison Table */}
            {topItems.length > 0 && (
              <GuideComparisonTable items={topItems} />
            )}

            {/* Ranked List of Tools */}
            <section className="mb-12">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold mb-4">
                  The {guide.listItems?.length || 0} Best {guide.title?.replace(/^(The \d+ Best |Top \d+ )/i, '').replace(/( in \d+| of \d+)$/i, '')}
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Each tool has been thoroughly tested and ranked based on features, pricing, ease of use, and overall value.
                </p>
              </div>
              
              <div className="space-y-8">
                {guide.listItems?.map((item: any, index: number) => (
                  <div key={item.rank}>
                    <GuideItemEnhanced item={item} guide={guide} />
                    
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
            <div className="sticky top-24 space-y-6">
              <GuideTableOfContents items={guide.listItems} />
              
              {/* Quick Pick Box */}
              <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🏆</span>
                  <h3 className="font-bold text-lg">Our #1 Pick</h3>
                </div>
                <p className="text-lg font-bold mb-2">
                  {guide.listItems?.[0]?.software?.name || guide.listItems?.[0]?.customTitle}
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-sm font-semibold">{guide.listItems?.[0]?.software?.overallScore?.toFixed(1) || '9.5'}/10</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {guide.listItems?.[0]?.bestFor || 'Best overall solution for teams'}
                </p>
                <a
                  href={guide.listItems?.[0]?.affiliateLink || guide.listItems?.[0]?.software?.affiliateLink || '#'}
                  target="_blank"
                  rel="sponsored nofollow"
                  className="block w-full text-center bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Try Free →
                </a>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  ✓ No credit card required
                </p>
              </div>
              
              {/* Trust Badges */}
              <div className="p-4 bg-card border rounded-lg">
                <h4 className="font-semibold text-sm mb-3">Why Trust Us?</h4>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Independent reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>200+ hours of testing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Expert methodology</span>
                  </div>
                </div>
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