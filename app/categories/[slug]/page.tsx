import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { StarIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'
import { client, urlFor } from '@/lib/sanity'

async function getCategoryData(slug: string) {
  if (!client) {
    console.warn('Sanity client not initialized')
    return null
  }
  
  try {
    // Fetch category details
    const categoryQuery = `*[_type == "softwareCategory" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      description,
      color
    }`

    // Fetch software in this category
    const softwareQuery = `*[_type == "software" && references(*[_type == "softwareCategory" && slug.current == $slug]._id)] {
      _id,
      name,
      tagline,
      "excerpt": coalesce(excerpt, shortDescription, ""),
      logo,
      overallScore,
      slug,
      "quickInfo": coalesce(quickInfo, companyInfo, {}),
      categories[]-> {
        _id,
        name,
        slug
      }
    } | order(overallScore desc)`

    const [category, software] = await Promise.all([
      client.fetch(categoryQuery, { slug }),
      client.fetch(softwareQuery, { slug })
    ])

    if (!category) {
      return null
    }

    return {
      category,
      software: software || []
    }
  } catch (error) {
    console.error('Error fetching category data:', error)
    return null
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const data = await getCategoryData(params.slug)

  if (!data) {
    notFound()
  }

  const { category, software } = data

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            All Categories
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {category.name}
          </h1>
          
          {category.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
              {category.description}
            </p>
          )}
          
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {software.length} software tool{software.length !== 1 ? 's' : ''} in this category
          </div>
        </div>
      </section>

      {/* Software Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {software.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No software found in this category yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {software.map((item: any) => (
                <Link
                  key={item._id}
                  href={`/reviews/${item.slug?.current || '#'}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {item.logo && (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white dark:bg-gray-800 p-2">
                            <Image
                              src={urlFor(item.logo).url()}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {item.tagline || 'Business Software'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                        <StarIcon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                        <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                          {item.overallScore || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {item.excerpt || 'Comprehensive software solution for modern businesses.'}
                    </p>

                    {/* Quick Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        {item.quickInfo?.startingPrice || 'Contact for pricing'}
                      </span>
                      <span className="text-primary-600 dark:text-primary-400 font-medium group-hover:underline">
                        Read Review →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

// Generate static params for all categories
export async function generateStaticParams() {
  if (!client) {
    return []
  }
  
  try {
    const categories = await client.fetch(`*[_type == "softwareCategory"] { slug }`)
    
    return categories.map((category: any) => ({
      slug: category.slug.current,
    }))
  } catch (error) {
    console.warn('Failed to generate category params:', error)
    return []
  }
}