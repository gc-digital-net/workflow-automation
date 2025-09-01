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
    "categories": categories[]->{name, slug}
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
    "author": author->{name, bio, avatar, slug},
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
  if (!client) return []
  try {
    return await client.fetch(postsQuery)
  } catch (error) {
    console.warn('Failed to fetch posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string) {
  if (!client) return null
  try {
    return await client.fetch(postBySlugQuery, { slug })
  } catch (error) {
    console.warn('Failed to fetch post:', error)
    return null
  }
}

export async function getSoftware() {
  if (!client) return []
  try {
    return await client.fetch(softwareQuery)
  } catch (error) {
    console.warn('Failed to fetch software:', error)
    return []
  }
}

export async function getSoftwareBySlug(slug: string) {
  if (!client) return null
  try {
    return await client.fetch(softwareBySlugQuery, { slug })
  } catch (error) {
    console.warn('Failed to fetch software:', error)
    return null
  }
}

export async function getBestOfGuides() {
  if (!client) return []
  try {
    return await client.fetch(bestOfGuidesQuery)
  } catch (error) {
    console.warn('Failed to fetch best of guides:', error)
    return []
  }
}

export async function getBestOfGuideBySlug(slug: string) {
  if (!client) return null
  try {
    return await client.fetch(bestOfGuideBySlugQuery, { slug })
  } catch (error) {
    console.warn('Failed to fetch best of guide:', error)
    return null
  }
}

export async function getHomepageData() {
  if (!client) return { featuredSoftware: [], categories: [], testimonials: [] }
  try {
    return await client.fetch(homepageDataQuery)
  } catch (error) {
    console.warn('Failed to fetch homepage data:', error)
    return { featuredSoftware: [], categories: [], testimonials: [] }
  }
}

export async function getCategories() {
  if (!client) return []
  try {
    return await client.fetch(categoriesQuery)
  } catch (error) {
    console.warn('Failed to fetch categories:', error)
    return []
  }
}

export async function getComparisons() {
  if (!client) return []
  try {
    return await client.fetch(comparisonsQuery)
  } catch (error) {
    console.warn('Failed to fetch comparisons:', error)
    return []
  }
}

export async function getFaqs() {
  if (!client) return []
  try {
    return await client.fetch(faqsQuery)
  } catch (error) {
    console.warn('Failed to fetch FAQs:', error)
    return []
  }
}