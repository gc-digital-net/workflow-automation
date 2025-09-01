import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/lib/sanity/image'
import { portableTextComponents } from '@/components/portable-text/PortableTextComponents'
import { CheckCircleIcon, XCircleIcon, StarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'

interface GuideItemProps {
  item: {
    rank: number
    software?: {
      _id: string
      name: string
      slug?: { current: string }
      logo?: any
      description?: string
      overallScore?: number
      pricing?: {
        starting?: number
        freePlan?: boolean
        plans?: Array<{
          name: string
          price: number
          features: string[]
        }>
      }
      features?: string[]
      pros?: string[]
      cons?: string[]
      integrations?: string[]
      useCase?: string
      affiliateLink?: string
      screenshots?: any[]
    }
    customTitle?: string
    description?: any
    keyFeatures?: string[]
    bestFor?: string
    affiliateLink?: string
    affiliateLinkOptions?: {
      openInNewTab?: boolean
      rel?: string
    }
  }
  guide: any
}

export function GuideItem({ item, guide }: GuideItemProps) {
  const title = item.software?.name || item.customTitle || 'Unknown Tool'
  const affiliateLink = item.affiliateLink || item.software?.affiliateLink
  const linkOptions = item.affiliateLinkOptions || { openInNewTab: true, rel: 'sponsored nofollow' }
  const isTopPick = item.rank === 1
  const score = item.software?.overallScore || 0

  return (
    <article 
      id={item.rank === 1 ? 'top-pick' : `tool-${item.rank}`}
      className="scroll-mt-24"
    >
      {/* Rank Badge and Title */}
      <div className="flex items-start gap-4 mb-6">
        <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
          item.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg' :
          item.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
          item.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
          'bg-muted'
        }`}>
          {item.rank}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold">{title}</h3>
            {isTopPick && (
              <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full font-semibold">
                🏆 EDITOR'S CHOICE
              </span>
            )}
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {score > 0 && (
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(score / 2) ? 'text-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{score.toFixed(1)}/10</span>
              </div>
            )}
            
            {item.software?.pricing?.starting && (
              <span>From ${item.software.pricing.starting}/mo</span>
            )}
            
            {item.software?.pricing?.freePlan && (
              <span className="text-green-600 font-semibold">✓ Free Plan Available</span>
            )}
            
            {item.bestFor && (
              <span className="text-muted-foreground">Best for: {item.bestFor}</span>
            )}
          </div>
        </div>

        {/* Logo */}
        {item.software?.logo && (
          <div className="flex-shrink-0 w-20 h-20 relative bg-white rounded-lg shadow-sm p-2">
            <Image
              src={urlForImage(item.software.logo).width(80).height(80).url()}
              alt={`${title} logo`}
              fill
              className="object-contain p-2"
            />
          </div>
        )}
      </div>

      {/* Main Content Container */}
      <div className="bg-card border rounded-lg p-6 mb-8">
        {/* Overview Section */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Overview</h4>
          {item.description ? (
            <div className="prose max-w-none">
              <PortableText value={item.description} components={portableTextComponents} />
            </div>
          ) : item.software?.description ? (
            <p className="text-muted-foreground leading-relaxed">{item.software.description}</p>
          ) : (
            <p className="text-muted-foreground leading-relaxed">
              {title} is a comprehensive project management solution that helps teams collaborate, 
              track progress, and deliver projects on time. With its intuitive interface and powerful 
              features, it's designed to streamline workflows and boost productivity across organizations 
              of all sizes.
            </p>
          )}
        </div>

        {/* Key Features */}
        {(item.keyFeatures?.length > 0 || item.software?.features?.length > 0) && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Key Features</h4>
            <ul className="space-y-2">
              {(item.keyFeatures || item.software?.features || []).map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pros and Cons Grid */}
        {(item.software?.pros?.length > 0 || item.software?.cons?.length > 0) && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Pros */}
            {item.software?.pros?.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-600">Pros</h4>
                <ul className="space-y-2">
                  {item.software.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Cons */}
            {item.software?.cons?.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-3 text-red-600">Cons</h4>
                <ul className="space-y-2">
                  {item.software.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <XCircleIcon className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Pricing Information */}
        {item.software?.pricing && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Pricing</h4>
            <div className="bg-muted/50 rounded-lg p-4">
              {item.software.pricing.freePlan && (
                <p className="text-green-600 font-semibold mb-2">✓ Free plan available</p>
              )}
              {item.software.pricing.starting && (
                <p className="mb-2">
                  Paid plans start at <span className="font-bold">${item.software.pricing.starting}/month</span>
                </p>
              )}
              {item.software.pricing.plans?.length > 0 && (
                <div className="mt-3 space-y-2">
                  {item.software.pricing.plans.map((plan, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{plan.name}</span>
                      <span className="text-sm">${plan.price}/mo</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Use Cases */}
        {(item.software?.useCase || item.bestFor) && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Best For</h4>
            <p className="text-muted-foreground">
              {item.software?.useCase || item.bestFor || `${title} is ideal for teams looking for a comprehensive project management solution.`}
            </p>
          </div>
        )}

        {/* Integrations */}
        {item.software?.integrations?.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Popular Integrations</h4>
            <div className="flex flex-wrap gap-2">
              {item.software.integrations.slice(0, 8).map((integration, index) => (
                <span key={index} className="px-3 py-1 bg-muted rounded-full text-sm">
                  {integration}
                </span>
              ))}
              {item.software.integrations.length > 8 && (
                <span className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground">
                  +{item.software.integrations.length - 8} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* CTA Section */}
        {affiliateLink && (
          <div className="mt-8 p-6 bg-primary/5 border-2 border-primary/20 rounded-lg text-center">
            <p className="mb-4 font-semibold">
              {isTopPick 
                ? `Ready to get started with our top pick?` 
                : `Want to try ${title}?`
              }
            </p>
            <a
              href={affiliateLink}
              target={linkOptions.openInNewTab ? '_blank' : undefined}
              rel={linkOptions.rel || 'sponsored nofollow'}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
            >
              Try {title} Free
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </a>
            <p className="mt-3 text-xs text-muted-foreground">
              No credit card required • 14-day free trial
            </p>
          </div>
        )}
      </div>
    </article>
  )
}