import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'
import { groq } from 'next-sanity'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

interface RelatedGuidesProps {
  currentGuideId: string
}

const relatedGuidesQuery = groq`
  *[_type == "topSoftware" && _id != $currentId] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    "itemCount": count(listItems)
  }
`

export async function RelatedGuides({ currentGuideId }: RelatedGuidesProps) {
  const guides = await sanityFetch({
    query: relatedGuidesQuery,
    params: { currentId: currentGuideId },
    tags: ['topSoftware'],
  })

  if (!guides || guides.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-12 border-t">
      <h2 className="text-2xl font-bold mb-6">Related Guides</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {guides.map((guide: any) => (
          <Link
            key={guide._id}
            href={`/guides/${guide.slug.current}`}
            className="group bg-card border rounded-lg p-6 hover:shadow-lg transition-all"
          >
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              {guide.title}
            </h3>
            
            {guide.excerpt && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {guide.excerpt}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {guide.itemCount} tools reviewed
              </span>
              <ArrowRightIcon className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}