import { groq } from 'next-sanity';

// Post queries
export const postsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    updatedAt,
    "author": author->{name, slug, avatar},
    "categories": categories[]->{name, slug},
    tags,
    featuredImage,
    readingTime
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    updatedAt,
    "author": author->{name, slug, bio, avatar, social},
    "categories": categories[]->{name, slug},
    tags,
    featuredImage,
    readingTime,
    seo
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && references($categoryId) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    updatedAt,
    "author": author->{name, slug, avatar},
    "categories": categories[]->{name, slug},
    tags,
    featuredImage,
    readingTime
  }
`;

// Software queries
export const softwareQuery = groq`
  *[_type == "software" && !(_id in path("drafts.**"))] | order(overallScore desc) {
    _id,
    name,
    slug,
    logo,
    tagline,
    shortDescription,
    overallScore,
    "categories": categories[]->{name, slug},
    tags,
    affiliateLink,
    lastUpdated,
    pros,
    cons,
    pricing[0...3] {
      name,
      price,
      yearlyPrice
    }
  }
`;

export const softwareBySlugQuery = groq`
  *[_type == "software" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    name,
    slug,
    logo,
    tagline,
    shortDescription,
    overview,
    detailedReview,
    pricingSection,
    useCasesSection,
    competitorAnalysis {
      ...,
      "mainCompetitors": mainCompetitors[]->{
        name,
        slug,
        logo,
        overallScore
      }
    },
    finalVerdict,
    overallScore,
    scores,
    pricing,
    pros,
    cons,
    screenshots,
    integrations,
    popularIntegrations,
    companyInfo,
    affiliateLink,
    "categories": categories[]->{name, slug},
    tags,
    lastUpdated,
    seo
  }
`;

export const softwareByCategoryQuery = groq`
  *[_type == "software" && references($categoryId) && !(_id in path("drafts.**"))] | order(overallScore desc) {
    _id,
    name,
    slug,
    logo,
    tagline,
    shortDescription,
    overallScore,
    "categories": categories[]->{name, slug},
    tags,
    affiliateLink,
    lastUpdated,
    pros[0...3],
    cons[0...3]
  }
`;

export const topSoftwareQuery = groq`
  *[_type == "software" && !(_id in path("drafts.**"))] | order(overallScore desc)[0...10] {
    _id,
    name,
    slug,
    logo,
    tagline,
    shortDescription,
    overallScore,
    "categories": categories[]->{name, slug},
    tags,
    affiliateLink
  }
`;

// Listicle queries
export const listiclesQuery = groq`
  *[_type == "listicle" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    updatedAt,
    "author": author->{name, slug, avatar},
    "categories": categories[]->{name, slug},
    tags,
    featuredImage,
    readingTime,
    "itemCount": count(listItems)
  }
`;

export const listicleBySlugQuery = groq`
  *[_type == "listicle" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    excerpt,
    introduction,
    listItems[] {
      rank,
      "software": software->{
        name,
        slug,
        logo,
        tagline,
        overallScore,
        affiliateLink
      },
      customTitle,
      customLogo,
      description,
      keyFeatures,
      pricing,
      pros,
      cons,
      bestFor,
      affiliateLink,
      dealInfo
    },
    conclusion,
    featuredImage,
    "author": author->{name, slug, bio, avatar},
    "categories": categories[]->{name, slug},
    tags,
    publishedAt,
    updatedAt,
    methodology,
    faq,
    "relatedListicles": relatedListicles[]->{
      title,
      slug,
      excerpt,
      featuredImage
    },
    seo,
    readingTime
  }
`;

// Category queries
export const categoriesQuery = groq`
  *[_type == "category" && !(_id in path("drafts.**"))] | order(name asc) {
    _id,
    name,
    slug,
    description,
    featuredImage,
    "parent": parent->{name, slug},
    seo
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    name,
    slug,
    description,
    featuredImage,
    "parent": parent->{name, slug},
    seo
  }
`;

// Author queries
export const authorsQuery = groq`
  *[_type == "author" && !(_id in path("drafts.**"))] | order(name asc) {
    _id,
    name,
    slug,
    bio,
    avatar,
    social
  }
`;

export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    name,
    slug,
    bio,
    avatar,
    social,
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
      title,
      slug,
      excerpt,
      publishedAt,
      featuredImage
    }
  }
`;

// Search queries
export const searchQuery = groq`
  *[
    !(_id in path("drafts.**")) && (
      (_type == "post" && (
        title match $searchTerm ||
        excerpt match $searchTerm ||
        pt::text(content) match $searchTerm
      )) ||
      (_type == "software" && (
        name match $searchTerm ||
        tagline match $searchTerm ||
        shortDescription match $searchTerm
      )) ||
      (_type == "listicle" && (
        title match $searchTerm ||
        excerpt match $searchTerm ||
        pt::text(introduction) match $searchTerm
      ))
    )
  ] | order(_createdAt desc)[0...50] {
    _id,
    _type,
    "title": select(
      _type == "post" => title,
      _type == "software" => name,
      _type == "listicle" => title
    ),
    "description": select(
      _type == "post" => excerpt,
      _type == "software" => shortDescription,
      _type == "listicle" => excerpt
    ),
    slug,
    "image": select(
      _type == "post" => featuredImage,
      _type == "software" => logo,
      _type == "listicle" => featuredImage
    )
  }
`;

// Homepage queries
export const homepageDataQuery = groq`{
  "featuredSoftware": *[_type == "software" && !(_id in path("drafts.**"))] | order(overallScore desc)[0...6] {
    _id,
    name,
    slug,
    logo,
    tagline,
    overallScore,
    "categories": categories[]->{name, slug},
    affiliateLink
  },
  "latestPosts": *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...4] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "author": author->{name, slug},
    "categories": categories[]->{name, slug},
    featuredImage
  },
  "popularListicles": *[_type == "listicle" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    "itemCount": count(listItems)
  },
  "categories": *[_type == "category" && !parent && !(_id in path("drafts.**"))] | order(name asc)[0...6] {
    _id,
    name,
    slug,
    description
  }
}`;

// Sitemap queries
export const sitemapQuery = groq`{
  "posts": *[_type == "post" && !(_id in path("drafts.**"))] {
    "url": slug.current,
    "lastmod": updatedAt
  },
  "software": *[_type == "software" && !(_id in path("drafts.**"))] {
    "url": slug.current,
    "lastmod": lastUpdated
  },
  "listicles": *[_type == "listicle" && !(_id in path("drafts.**"))] {
    "url": slug.current,
    "lastmod": updatedAt
  },
  "categories": *[_type == "category" && !(_id in path("drafts.**"))] {
    "url": slug.current,
    "lastmod": _updatedAt
  }
}`;