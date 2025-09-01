'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'
import { formatDate } from '@/lib/utils'
import { ArrowRightIcon, UserIcon, CalendarIcon, ListBulletIcon } from '@heroicons/react/24/outline'

interface GuideCardProps {
  guide: {
    _id: string
    title: string
    slug: {
      current: string
    }
    excerpt: string
    publishedAt: string
    author?: {
      name: string
      image?: any
    }
    categories?: {
      _id: string
      title: string
      slug: {
        current: string
      }
    }[]
    featuredImage?: any
    itemCount: number
  }
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <article className="group relative flex flex-col bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300">
      {guide.featuredImage && (
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            src={urlForImage(guide.featuredImage).width(600).height(400).url()}
            alt={guide.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {guide.itemCount && (
            <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-semibold flex items-center gap-1">
                <ListBulletIcon className="h-4 w-4" />
                {guide.itemCount} Tools
              </span>
            </div>
          )}
        </div>
      )}
      
      <div className="flex flex-col flex-1 p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {guide.categories?.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category.slug.current}`}
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              {category.title}
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          <Link href={`/guides/${guide.slug.current}`}>
            {guide.title}
          </Link>
        </h2>

        {guide.excerpt && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
            {guide.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {guide.author && (
              <div className="flex items-center gap-1">
                {guide.author.image ? (
                  <Image
                    src={urlForImage(guide.author.image).width(24).height(24).url()}
                    alt={guide.author.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <UserIcon className="h-4 w-4" />
                )}
                <span className="text-xs">{guide.author.name}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <time dateTime={guide.publishedAt} className="text-xs">
                {formatDate(guide.publishedAt)}
              </time>
            </div>
          </div>

          <Link
            href={`/guides/${guide.slug.current}`}
            className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            Read Guide
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}