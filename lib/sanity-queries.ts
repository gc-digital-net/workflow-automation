import { client } from './sanity'

// Blog queries
export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featuredImage,
    "author": author->name,
    "categories": categories[]->name
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    featuredImage,
    "author": author->{name, bio, avatar},
    "categories": categories[]->name,
    seo
  }
`

// Software queries
export const softwareQuery = `
  *[_type == "software" && !(_id in path("drafts.**"))] | order(overallScore desc) {
    _id,
    name,
    slug,
    logo,
    tagline,
    shortDescription,
    overallScore,
    "categories": categories[]->name,
    affiliateLink,
    hasFreeTrial,
    scores,
    pricing,
    "integrationsCount": integrations.count,
    integrations,
    lastUpdated
  }
`

export const softwareBySlugQuery = `
  *[_type == "software" && slug.current == $slug][0] {
    ...,
    "categories": categories[]->{_id, name, slug}
  }
`

// Best Of Guide queries
export const bestOfGuidesQuery = `
  *[_type == "bestOfGuide"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    "author": author->name,
    "categories": categories[]->name
  }
`

export const bestOfGuideBySlugQuery = `
  *[_type == "bestOfGuide" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    introduction,
    listItems[] {
      rank,
      "software": software->{name, slug, logo, overallScore, affiliateLink},
      customTitle,
      description,
      keyFeatures,
      bestFor,
      affiliateLink
    },
    conclusion,
    featuredImage,
    publishedAt,
    "author": author->{name, bio},
    "categories": categories[]->name,
    seo
  }
`

// Homepage queries
export const homepageDataQuery = `{
  "featuredSoftware": *[_type == "software" && !(_id in path("drafts.**"))] | order(overallScore desc)[0...6] {
    _id,
    name,
    slug,
    logo,
    tagline,
    overallScore,
    affiliateLink
  },
  "latestPosts": *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featuredImage,
    "author": author->name
  },
  "featuredGuides": *[_type == "bestOfGuide" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...2] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage
  },
  "testimonials": *[_type == "testimonial" && featured == true && !(_id in path("drafts.**"))][0...3] {
    _id,
    name,
    role,
    company,
    testimonial,
    avatar,
    rating
  },
  "siteSettings": *[_type == "siteSettings" && !(_id in path("drafts.**"))][0] {
    title,
    description,
    newsletterCTA
  }
}`

// Category queries
export const categoriesQuery = `
  *[_type == "category" && !(_id in path("drafts.**"))] {
    _id,
    name,
    slug,
    description,
    featuredImage
  }
`

// Comparison queries
export const comparisonsQuery = `
  *[_type == "comparison"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "softwareA": softwareA->name,
    "softwareB": softwareB->name,
    publishedAt
  }
`

// FAQ queries
export const faqsQuery = `
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    "category": category->name,
    featured
  }
`

// Fetch functions
export async function getPosts() {
  return await client.fetch(postsQuery)
}

export async function getPostBySlug(slug: string) {
  return await client.fetch(postBySlugQuery, { slug })
}

export async function getSoftware() {
  return await client.fetch(softwareQuery)
}

export async function getSoftwareBySlug(slug: string) {
  return await client.fetch(softwareBySlugQuery, { slug })
}

export async function getBestOfGuides() {
  return await client.fetch(bestOfGuidesQuery)
}

export async function getBestOfGuideBySlug(slug: string) {
  return await client.fetch(bestOfGuideBySlugQuery, { slug })
}

export async function getHomepageData() {
  return await client.fetch(homepageDataQuery)
}

export async function getCategories() {
  return await client.fetch(categoriesQuery)
}

export async function getComparisons() {
  return await client.fetch(comparisonsQuery)
}

export async function getFaqs() {
  return await client.fetch(faqsQuery)
}