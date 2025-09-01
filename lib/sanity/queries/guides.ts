import { groq } from 'next-sanity'

export const guidesQuery = groq`
  *[_type == "topSoftware"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "author": author->{
      name,
      image,
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

export const guideBySlugQuery = groq`
  *[_type == "topSoftware" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    introduction,
    publishedAt,
    "author": author->{
      name,
      image,
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
      "software": software->{
        _id,
        name,
        slug,
        logo,
        description,
        overallScore,
        pricing,
        features,
        pros,
        cons,
        integrations,
        useCase,
        affiliateLink,
        screenshots
      },
      customTitle,
      description,
      keyFeatures,
      bestFor,
      affiliateLink,
      affiliateLinkOptions
    },
    conclusion,
    seo
  }
`

export const guideSlugsQuery = groq`
  *[_type == "topSoftware" && defined(slug.current)][].slug.current
`