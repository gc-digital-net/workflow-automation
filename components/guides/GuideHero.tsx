import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'
import { formatDate } from '@/lib/utils'
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline'

interface GuideHeroProps {
  guide: {
    title: string
    excerpt?: string
    publishedAt: string
    author?: {
      name: string
      image?: any
      bio?: string
    }
    featuredImage?: any
    listItems?: any[]
  }
}

export function GuideHero({ guide }: GuideHeroProps) {
  const readingTime = Math.ceil((guide.listItems?.length || 10) * 3) // Estimate 3 min per tool

  return (
    <section className="relative bg-gradient-to-b from-primary/5 to-background pt-20 pb-16">
      {guide.featuredImage && (
        <div className="absolute inset-0 opacity-10">
          <Image
            src={urlForImage(guide.featuredImage).width(1920).height(600).url()}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {guide.title}
          </h1>
          
          {guide.excerpt && (
            <p className="text-xl text-muted-foreground mb-8">
              {guide.excerpt}
            </p>
          )}
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {guide.author && (
              <div className="flex items-center gap-2">
                {guide.author.image ? (
                  <Image
                    src={urlForImage(guide.author.image).width(40).height(40).url()}
                    alt={guide.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <UserIcon className="h-5 w-5" />
                  </div>
                )}
                <div className="text-left">
                  <div className="font-semibold">{guide.author.name}</div>
                  <div className="text-xs text-muted-foreground">Software Expert</div>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>Updated {formatDate(guide.publishedAt)}</span>
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <ClockIcon className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#top-pick"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
            >
              Jump to #1 Pick
            </a>
            <a
              href="#comparison-table"
              className="bg-background border px-6 py-3 rounded-md font-semibold hover:bg-muted transition-colors"
            >
              View Comparison Table
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}