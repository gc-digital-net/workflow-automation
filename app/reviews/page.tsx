import Link from 'next/link'
import Image from 'next/image'
import { StarIcon, FunnelIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { client, urlFor } from '@/lib/sanity'
import ReviewsClient from './reviews-client'

async function getReviewsData() {
  if (!client) {
    console.warn('Sanity client not initialized')
    return {
      softwareReviews: [],
      categories: []
    }
  }

  try {
    // Fetch software with categories
    const softwareQuery = `*[_type == "software"] {
      _id,
      name,
      tagline,
      "excerpt": coalesce(excerpt, shortDescription, ""),
      logo,
      overallScore,
      scores,
      "quickInfo": coalesce(quickInfo, companyInfo, {}),
      slug,
      lastUpdated,
      categories[]-> {
        _id,
        name,
        slug,
        color
      }
    } | order(overallScore desc)`

    // Fetch all categories
    const categoriesQuery = `*[_type == "softwareCategory"] | order(order asc) {
      _id,
      name,
      slug,
      color,
      featured
    }`

    const [software, cats] = await Promise.all([
      client.fetch(softwareQuery),
      client.fetch(categoriesQuery)
    ])

    return {
      softwareReviews: software || [],
      categories: cats || []
    }
  } catch (error) {
    console.error('Error fetching reviews data:', error)
    return {
      softwareReviews: [],
      categories: []
    }
  }
}

export default async function ReviewsPage() {
  const { softwareReviews, categories } = await getReviewsData()

  return <ReviewsClient initialSoftware={softwareReviews} initialCategories={categories} />
}