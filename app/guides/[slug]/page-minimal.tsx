import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity/client'
import { guideBySlugQueryEnhanced, guideSlugsQuery } from '@/lib/sanity/queries/guidesEnhanced'
import { GuideHeroMinimal } from '@/components/guides/GuideHeroMinimal'
import { GuideComparisonMinimal } from '@/components/guides/GuideComparisonMinimal'
import { GuideItemMinimal } from '@/components/guides/GuideItemMinimal'
import { GuideStructuredData } from '@/components/seo/GuideStructuredData'
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portable-text/PortableTextComponents'

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
      query: guideBySlugQueryEnhanced,
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

export default async function GuidePageMinimal({ params }: GuidePageProps) {
  let guide
  
  try {
    guide = await sanityFetch({
      query: guideBySlugQueryEnhanced,
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

  const guideUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/guides/${params.slug}`
  
  const breadcrumbData = [
    { name: 'Home', url: process.env.NEXT_PUBLIC_SITE_URL || 'https://workflowautomation.net' },
    { name: 'Guides', url: `${process.env.NEXT_PUBLIC_SITE_URL}/guides` },
    { name: guide.title, url: guideUrl }
  ]

  return (
    <article className="min-h-screen bg-background">
      <GuideStructuredData guide={guide} url={guideUrl} />
      <BreadcrumbStructuredData items={breadcrumbData} />
      
      {/* Minimal Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-muted-foreground">
          <a href="/guides" className="hover:text-foreground transition-colors">Guides</a>
          <span className="mx-2">/</span>
          <span>{guide.title}</span>
        </nav>
      </div>
      
      {/* Hero Section */}
      <GuideHeroMinimal guide={guide} />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          {guide.introduction && (
            <section className="mb-16">
              <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-p:text-muted-foreground prose-p:leading-relaxed">
                <PortableText value={guide.introduction} components={portableTextComponents} />
              </div>
            </section>
          )}
          
          {/* Methodology - Minimal Box */}
          {guide.methodology && (
            <section id="methodology" className="mb-16 p-8 bg-muted/30 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">How We Test</h2>
              <div className="prose prose-sm max-w-none prose-p:text-muted-foreground">
                <PortableText value={guide.methodology} components={portableTextComponents} />
              </div>
            </section>
          )}
          
          {/* Comparison Table */}
          {guide.listItems && guide.listItems.length > 0 && (
            <div id="comparison">
              <GuideComparisonMinimal items={guide.listItems} />
            </div>
          )}
          
          {/* Divider */}
          <div className="my-16 border-t" />
          
          {/* Ranked List */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">
                Detailed Reviews
              </h2>
              <p className="text-muted-foreground">
                In-depth analysis of each solution
              </p>
            </div>
            
            {guide.listItems?.map((item: any) => (
              <GuideItemMinimal key={item.rank} item={item} guide={guide} />
            ))}
          </section>
          
          {/* Conclusion */}
          {guide.conclusion && (
            <section className="mb-16 p-8 bg-muted/10 rounded-lg">
              <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-p:text-muted-foreground">
                <PortableText value={guide.conclusion} components={portableTextComponents} />
              </div>
            </section>
          )}
          
          {/* Simple CTA */}
          <section className="text-center py-12 border-t">
            <h3 className="text-xl font-semibold mb-4">Still Deciding?</h3>
            <p className="text-muted-foreground mb-6">
              Try our top pick with a free trial. No credit card required.
            </p>
            {guide.listItems?.[0]?.software?.affiliateLink && (
              <a
                href={guide.listItems[0].software.affiliateLink}
                target="_blank"
                rel="sponsored nofollow"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium"
              >
                Start Free Trial
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </section>
        </div>
      </div>
    </article>
  )
}