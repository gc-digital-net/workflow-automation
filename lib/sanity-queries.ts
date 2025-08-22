import { groq } from 'groq'
import { client } from './sanity'

// Blog queries
export const postsQuery = groq`
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

export const postBySlugQuery = groq`
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
export const softwareQuery = groq`
  *[_type == "software"] | order(overallScore desc) {
    _id,
    name,
    slug,
    logo,
    tagline,
    shortDescription,
    overallScore,
    "categories": categories[]->name,
    affiliateLink,
    hasFreeTrial
  }
`

export const softwareBySlugQuery = groq`
  *[_type == "software" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    logo,
    tagline,
    shortDescription,
    overview,
    detailedReview,
    pros,
    cons,
    overallScore,
    scores,
    pricing,
    screenshots,
    "categories": categories[]->{name, slug},
    affiliateLink,
    hasFreeTrial,
    lastUpdated,
    seo
  }
`

// Listicle queries
export const listiclesQuery = groq`
  *[_type == "listicle"] | order(publishedAt desc) {
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

export const listicleBySlugQuery = groq`
  *[_type == "listicle" && slug.current == $slug][0] {
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
export const homepageDataQuery = groq`{
  "featuredSoftware": *[_type == "software"] | order(overallScore desc)[0...6] {
    _id,
    name,
    slug,
    logo,
    tagline,
    overallScore,
    affiliateLink
  },
  "latestPosts": *[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featuredImage,
    "author": author->name
  },
  "featuredListicles": *[_type == "listicle"] | order(publishedAt desc)[0...2] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage
  },
  "testimonials": *[_type == "testimonial" && featured == true][0...3] {
    _id,
    name,
    role,
    company,
    testimonial,
    avatar,
    rating
  },
  "siteSettings": *[_type == "siteSettings"][0] {
    title,
    description,
    newsletterCTA
  }
}`

// Category queries
export const categoriesQuery = groq`
  *[_type == "category"] {
    _id,
    name,
    slug,
    description,
    featuredImage
  }
`

// Comparison queries
export const comparisonsQuery = groq`
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
export const faqsQuery = groq`
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

export async function getListicles() {
  return await client.fetch(listiclesQuery)
}

export async function getListicleBySlug(slug: string) {
  return await client.fetch(listicleBySlugQuery, { slug })
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