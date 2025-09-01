import Script from 'next/script'

interface GuideItem {
  rank: number
  software?: {
    name: string
    overallScore?: number
    affiliateLink?: string
  }
  customTitle?: string
  affiliateLink?: string
}

interface GuideStructuredDataProps {
  guide: {
    title: string
    excerpt?: string
    publishedAt: string
    author?: {
      name: string
    }
    listItems?: GuideItem[]
  }
  url: string
}

export function GuideStructuredData({ guide, url }: GuideStructuredDataProps) {
  // Create ItemList schema for the ranked list
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: guide.title,
    description: guide.excerpt,
    numberOfItems: guide.listItems?.length || 0,
    itemListElement: guide.listItems?.map((item) => ({
      '@type': 'ListItem',
      position: item.rank,
      name: item.software?.name || item.customTitle || 'Unknown',
      url: item.affiliateLink || item.software?.affiliateLink || `${url}#tool-${item.rank}`,
      ...(item.software?.overallScore && {
        item: {
          '@type': 'SoftwareApplication',
          name: item.software.name,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: item.software.overallScore,
            bestRating: 10,
            worstRating: 0,
          }
        }
      })
    }))
  }

  // Create Article schema for the guide itself
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.excerpt,
    datePublished: guide.publishedAt,
    dateModified: guide.publishedAt,
    author: guide.author ? {
      '@type': 'Person',
      name: guide.author.name
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Workflow Automation',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  }

  // Create FAQ schema if applicable
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the best ${guide.title.toLowerCase().includes('project management') ? 'project management' : 'workflow automation'} software?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Based on our comprehensive testing, ${guide.listItems?.[0]?.software?.name || guide.listItems?.[0]?.customTitle || 'the top-ranked tool'} is currently the best option for most teams, offering the best balance of features, pricing, and ease of use.`
        }
      },
      {
        '@type': 'Question',
        name: 'How do we test and rank software?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We test each tool hands-on with real projects, evaluate pricing, features, ease of use, customer support, and integration capabilities. Our rankings are based on comprehensive scoring across 15 different criteria.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are these rankings updated regularly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we update our guides quarterly to reflect new features, pricing changes, and emerging tools in the market. The last update date is shown at the top of each guide.'
        }
      }
    ]
  }

  return (
    <>
      <Script
        id="guide-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema)
        }}
      />
      <Script
        id="guide-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema)
        }}
      />
      <Script
        id="guide-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
    </>
  )
}