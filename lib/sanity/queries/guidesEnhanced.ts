export const guidesQuery = `
  *[_type == "topSoftware"] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    excerpt,
    publishedAt,
    lastUpdated,
    "author": author->{
      name,
      image,
      title,
      credentials,
      bio
    },
    "categories": categories[]->{
      _id,
      title,
      slug
    },
    featuredImage,
    "itemCount": count(listItems)
  }
`

export const guideBySlugQueryEnhanced = `
  *[_type == "topSoftware" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    excerpt,
    introduction,
    methodology,
    conclusion,
    publishedAt,
    lastUpdated,
    trustSignals,
    "author": author->{
      name,
      image,
      title,
      credentials,
      bio
    },
    "categories": categories[]->{
      _id,
      title,
      slug
    },
    featuredImage,
    listItems[] {
      rank,
      whyThisRank,
      verdict,
      // Pull all data from the referenced software
      "software": software->{
        _id,
        name,
        slug,
        logo,
        tagline,
        shortDescription,
        
        // Scoring
        overallScore,
        easeOfUse,
        features,
        valueForMoney,
        customerSupport,
        
        // Pricing
        pricing,
        startingPrice,
        freePlan,
        
        // Content
        pros,
        cons,
        bestFor,
        
        // Media
        screenshotGallery[] {
          _key,
          asset,
          caption,
          alt
        },
        
        // Company Info
        founded,
        headquarters,
        website,
        employees,
        funding,
        
        // Features & Integrations
        keyFeatures,
        integrations,
        platforms,
        
        // Links
        affiliateLink,
        
        // Categories
        "categories": categories[]->{
          title,
          slug
        }
      },
      
      // Override fields (when filled, these take precedence)
      overrides {
        customDescription,
        customBestFor,
        customKeyFeatures,
        customPros,
        customCons,
        customAffiliateLink,
        specialOffer
      }
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      focusKeyword
    }
  }
`

export const guideSlugsQuery = `
  *[_type == "topSoftware" && defined(slug.current)][].slug.current
`

// Query to get related guides
export const relatedGuidesQuery = `
  *[_type == "topSoftware" && _id != $currentId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...4] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    "itemCount": count(listItems),
    publishedAt
  }
`

// Query to check which software reviews are being used in guides
export const softwareUsageInGuidesQuery = `
  *[_type == "software"] {
    _id,
    name,
    slug,
    "usedInGuides": *[_type == "topSoftware" && references(^._id)]{
      title,
      slug
    }
  }
`