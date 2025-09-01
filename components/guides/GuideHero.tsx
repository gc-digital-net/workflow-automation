import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'
import { formatDate } from '@/lib/utils'
import { CalendarIcon, ClockIcon, UserIcon, SparklesIcon, TrophyIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

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
  const totalTools = guide.listItems?.length || 0

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <TrophyIcon className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Expert Review • {new Date().getFullYear()} Edition</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {guide.title}
          </h1>
          
          {guide.excerpt && (
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {guide.excerpt}
            </p>
          )}
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Independently Tested</span>
            </div>
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">{totalTools} Tools Reviewed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 text-yellow-500" />
                ))}
              </div>
              <span className="text-sm font-medium">200+ Hours of Testing</span>
            </div>
          </div>
          
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
              className="group relative bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-2">
                <TrophyIcon className="h-5 w-5" />
                See Our #1 Pick
              </span>
              <span className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </a>
            <a
              href="#comparison-table"
              className="group bg-background border-2 px-8 py-4 rounded-lg font-semibold hover:bg-muted hover:border-primary/30 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                Quick Comparison
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}