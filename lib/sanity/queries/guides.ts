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
    buyersGuide,
    faqs[] {
      _key,
      question,
      answer
    },
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
        scores {
          easeOfUse,
          features,
          valueForMoney,
          customerSupport,
          integrations,
          support,
          value
        },

        // Pricing
        pricing[] {
          name,
          price,
          yearlyPrice,
          features,
          highlighted,
          userLimit
        },
        hasFreeTrial,
        freeTrialDays,

        // Content
        pros,
        cons,
        bestFor,
        notIdealFor,

        // Platform & Support Info
        platformInfo {
          webApp,
          mobileApps {
            ios,
            android
          },
          desktopApps {
            windows,
            mac,
            linux
          },
          browserExtensions,
          api {
            rest,
            graphql,
            webhooks
          },
          deploymentOptions
        },

        supportInfo {
          liveChat,
          emailSupport,
          phoneSupport,
          knowledgeBase,
          responseTime,
          supportDetails,
          videoTutorials
        },

        // Security & Compliance
        securityInfo {
          certifications,
          dataEncryption,
          gdprCompliant,
          gdpr,
          soc2,
          ssl,
          uptime,
          otherCertifications
        },

        // Integrations
        popularIntegrations,

        // Company Info
        companyInfo {
          founded,
          headquarters,
          companySize,
          funding
        },

        // Media
        screenshotGallery[] {
          _key,
          asset,
          caption,
          alt
        },

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
      },

      // Comparison data from the guide
      comparisonData {
        startingPrice,
        freeUsers,
        rating,
        ease,
        features,
        support,
        integrations,
        mobileApp,
        bestForTeamSize
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