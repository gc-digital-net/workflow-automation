import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { XMarkIcon, LightBulbIcon, InformationCircleIcon, ExclamationTriangleIcon, ExclamationCircleIcon, CheckCircleIcon, DocumentTextIcon, FireIcon } from '@heroicons/react/24/outline'
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/solid'

export const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null
      
      return (
        <figure className="my-8">
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || 'Blog image'}
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-sm text-center text-gray-600 dark:text-gray-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    
    // Pros and Cons Block
    prosConsBlock: ({ value }: any) => (
      <div className="my-10">
        {value.title && (
          <h3 className="text-xl font-bold mb-6 text-center">{value.title}</h3>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h4 className="font-bold text-green-800 dark:text-green-400 mb-4 flex items-center text-lg">
              <CheckIcon className="h-6 w-6 mr-2" />
              Pros
            </h4>
            <ul className="space-y-3">
              {value.pros?.map((pro: string, idx: number) => (
                <li key={idx} className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
            <h4 className="font-bold text-red-800 dark:text-red-400 mb-4 flex items-center text-lg">
              <XMarkIcon className="h-6 w-6 mr-2" />
              Cons
            </h4>
            <ul className="space-y-3">
              {value.cons?.map((con: string, idx: number) => (
                <li key={idx} className="flex items-start">
                  <XMarkIcon className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ),
    
    // Example Block
    exampleBlock: ({ value }: any) => {
      const bgColors = {
        example: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
        code: 'bg-gray-900 dark:bg-gray-950 border-gray-700',
        steps: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
        usecase: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
      }
      
      const textColors = {
        example: 'text-gray-700 dark:text-gray-300',
        code: 'text-gray-100 font-mono text-sm',
        steps: 'text-gray-700 dark:text-gray-300',
        usecase: 'text-gray-700 dark:text-gray-300'
      }
      
      const titleColors = {
        example: 'text-blue-800 dark:text-blue-400',
        code: 'text-green-400',
        steps: 'text-purple-800 dark:text-purple-400',
        usecase: 'text-amber-800 dark:text-amber-400'
      }
      
      return (
        <div className={`my-8 rounded-xl p-6 border ${bgColors[value.exampleType as keyof typeof bgColors] || bgColors.example}`}>
          <h4 className={`font-bold mb-3 ${titleColors[value.exampleType as keyof typeof titleColors] || titleColors.example}`}>
            {value.title}
          </h4>
          {value.exampleType === 'code' && value.language && (
            <div className="text-xs text-gray-400 mb-2">Language: {value.language}</div>
          )}
          <div className={`whitespace-pre-wrap ${textColors[value.exampleType as keyof typeof textColors] || textColors.example}`}>
            {value.content}
          </div>
        </div>
      )
    },
    
    // Callout Block
    calloutBlock: ({ value }: any) => {
      const styles = {
        tip: {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-200 dark:border-yellow-800',
          icon: LightBulbIcon,
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          textColor: 'text-yellow-900 dark:text-yellow-200'
        },
        info: {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          icon: InformationCircleIcon,
          iconColor: 'text-blue-600 dark:text-blue-400',
          textColor: 'text-blue-900 dark:text-blue-200'
        },
        warning: {
          bg: 'bg-orange-50 dark:bg-orange-900/20',
          border: 'border-orange-200 dark:border-orange-800',
          icon: ExclamationTriangleIcon,
          iconColor: 'text-orange-600 dark:text-orange-400',
          textColor: 'text-orange-900 dark:text-orange-200'
        },
        important: {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          icon: ExclamationCircleIcon,
          iconColor: 'text-red-600 dark:text-red-400',
          textColor: 'text-red-900 dark:text-red-200'
        },
        success: {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          icon: CheckCircleIcon,
          iconColor: 'text-green-600 dark:text-green-400',
          textColor: 'text-green-900 dark:text-green-200'
        },
        note: {
          bg: 'bg-gray-50 dark:bg-gray-800/50',
          border: 'border-gray-200 dark:border-gray-700',
          icon: DocumentTextIcon,
          iconColor: 'text-gray-600 dark:text-gray-400',
          textColor: 'text-gray-900 dark:text-gray-200'
        },
        keypoint: {
          bg: 'bg-primary-50 dark:bg-primary-900/20',
          border: 'border-primary-200 dark:border-primary-800',
          icon: FireIcon,
          iconColor: 'text-primary-600 dark:text-primary-400',
          textColor: 'text-primary-900 dark:text-primary-200'
        }
      }
      
      const style = styles[value.calloutType as keyof typeof styles] || styles.info
      const Icon = style.icon
      
      return (
        <div className={`my-8 rounded-xl p-5 border ${style.bg} ${style.border}`}>
          <div className="flex items-start">
            <Icon className={`h-6 w-6 ${style.iconColor} mr-3 mt-0.5 flex-shrink-0`} />
            <div className="flex-1">
              {value.title && (
                <h4 className={`font-semibold mb-2 ${style.textColor}`}>
                  {value.title}
                </h4>
              )}
              <p className={`${style.textColor} opacity-90`}>
                {value.content}
              </p>
            </div>
          </div>
        </div>
      )
    },
    
    // Comparison Table
    comparisonTable: ({ value }: any) => (
      <div className="my-10">
        {value.title && (
          <h3 className="text-xl font-bold mb-4">{value.title}</h3>
        )}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                {value.headers?.map((header: string, idx: number) => (
                  <th key={idx} className="border border-gray-200 dark:border-gray-600 p-3 text-left font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value.rows?.map((row: any, ridx: number) => (
                <tr key={ridx} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  {row.cells?.map((cell: string, cidx: number) => (
                    <td key={cidx} className="border border-gray-200 dark:border-gray-600 p-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    
    // FAQ Block
    faqBlock: ({ value }: any) => (
      <div className="my-10">
        <h3 className="text-2xl font-bold mb-6">{value.title}</h3>
        <div className="space-y-4">
          {value.questions?.map((item: any, idx: number) => (
            <details key={idx} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 group">
              <summary className="font-semibold cursor-pointer flex items-center justify-between">
                <span>{item.question}</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    ),
    
    // Video Embed
    videoEmbed: ({ value }: any) => {
      const getVideoId = (url: string) => {
        const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
        const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
        
        if (youtubeMatch) return { type: 'youtube', id: youtubeMatch[1] }
        if (vimeoMatch) return { type: 'vimeo', id: vimeoMatch[1] }
        return null
      }
      
      const video = getVideoId(value.url)
      if (!video) return null
      
      return (
        <figure className="my-10">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
            {video.type === 'youtube' && (
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            )}
            {video.type === 'vimeo' && (
              <iframe
                src={`https://player.vimeo.com/video/${video.id}`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            )}
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-sm text-center text-gray-600 dark:text-gray-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    
    // Mini Pricing Table
    miniPricingTable: ({ value }: any) => {
      const getBadgeColor = (badge: string) => {
        switch(badge) {
          case 'popular': return 'bg-blue-500 text-white'
          case 'best-value': return 'bg-green-500 text-white'
          case 'limited': return 'bg-red-500 text-white'
          case 'new': return 'bg-purple-500 text-white'
          case 'recommended': return 'bg-primary-600 text-white'
          default: return ''
        }
      }

      if (value.layout === 'table') {
        // Compact table layout
        return (
          <div className="my-10">
            {value.title && (
              <h3 className="text-2xl font-bold mb-6 text-center">{value.title}</h3>
            )}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="border border-gray-200 dark:border-gray-600 p-3 text-left">Plan</th>
                    <th className="border border-gray-200 dark:border-gray-600 p-3 text-center">Price</th>
                    {value.showFeatures && <th className="border border-gray-200 dark:border-gray-600 p-3 text-left">Features</th>}
                    <th className="border border-gray-200 dark:border-gray-600 p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {value.plans?.map((plan: any, idx: number) => (
                    <tr key={idx} className={plan.highlighted ? 'bg-primary-50 dark:bg-primary-900/20' : ''}>
                      <td className="border border-gray-200 dark:border-gray-600 p-3 font-semibold">
                        {plan.name}
                        {plan.badge && (
                          <span className={`ml-2 text-xs px-2 py-1 rounded ${getBadgeColor(plan.badge)}`}>
                            {plan.badge.replace('-', ' ').toUpperCase()}
                          </span>
                        )}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 p-3 text-center">
                        {plan.originalPrice && (
                          <span className="line-through text-gray-400 mr-2">
                            {value.currency}{plan.originalPrice}
                          </span>
                        )}
                        <span className="text-lg font-bold">
                          {value.currency}{plan.price}
                          <span className="text-sm text-gray-500 font-normal ml-1">
                            {value.billingPeriod !== 'one-time' ? value.billingPeriod : ''}
                          </span>
                        </span>
                      </td>
                      {value.showFeatures && (
                        <td className="border border-gray-200 dark:border-gray-600 p-3">
                          <ul className="text-sm space-y-1">
                            {plan.features?.slice(0, 3).map((feature: string, fidx: number) => (
                              <li key={fidx}>• {feature}</li>
                            ))}
                          </ul>
                        </td>
                      )}
                      <td className="border border-gray-200 dark:border-gray-600 p-3 text-center">
                        {plan.buttonUrl && (
                          <a
                            href={plan.buttonUrl}
                            target={plan.buttonTarget !== false ? "_blank" : undefined}
                            rel={plan.buttonRel || (plan.buttonTarget !== false ? "noopener noreferrer" : undefined)}
                            className="inline-block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors text-sm"
                          >
                            {plan.buttonText || 'Get Started'}
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      }

      if (value.layout === 'list') {
        // Vertical list layout
        return (
          <div className="my-10">
            {value.title && (
              <h3 className="text-2xl font-bold mb-6">{value.title}</h3>
            )}
            <div className="space-y-4">
              {value.plans?.map((plan: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-6 rounded-xl border ${
                    plan.highlighted
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-xl font-bold">
                        {plan.name}
                        {plan.badge && (
                          <span className={`ml-2 text-xs px-2 py-1 rounded ${getBadgeColor(plan.badge)}`}>
                            {plan.badge.replace('-', ' ').toUpperCase()}
                          </span>
                        )}
                      </h4>
                      {plan.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{plan.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      {plan.originalPrice && (
                        <span className="line-through text-gray-400 mr-2">
                          {value.currency}{plan.originalPrice}
                        </span>
                      )}
                      <span className="text-xl font-bold">
                        {value.currency}{plan.price}
                        <span className="text-sm text-gray-500 font-normal ml-1">
                          {value.billingPeriod !== 'one-time' ? value.billingPeriod : ''}
                        </span>
                      </span>
                    </div>
                  </div>
                  {value.showFeatures && plan.features && (
                    <ul className="flex flex-wrap gap-2 mb-4">
                      {plan.features.map((feature: string, fidx: number) => (
                        <li key={fidx} className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  {plan.buttonUrl && (
                    <a
                      href={plan.buttonUrl}
                      target={plan.buttonTarget !== false ? "_blank" : undefined}
                      rel={plan.buttonRel || (plan.buttonTarget !== false ? "noopener noreferrer" : undefined)}
                      className="inline-block w-full text-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      {plan.buttonText || 'Get Started'}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      }

      // Default: Cards layout
      return (
        <div className="my-10">
          {value.title && (
            <h3 className="text-2xl font-bold mb-6 text-center">{value.title}</h3>
          )}
          <div className={`grid gap-6 ${
            value.plans?.length === 1 ? 'max-w-sm mx-auto' :
            value.plans?.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' :
            value.plans?.length === 3 ? 'md:grid-cols-3 max-w-4xl mx-auto' :
            'md:grid-cols-2 lg:grid-cols-4'
          }`}>
            {value.plans?.map((plan: any, idx: number) => (
              <div
                key={idx}
                className={`relative rounded-xl p-6 ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-primary-50 to-white dark:from-primary-900/30 dark:to-gray-800 border-2 border-primary-500 shadow-xl scale-105'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className={`text-xs px-3 py-1 rounded-full ${getBadgeColor(plan.badge)}`}>
                      {plan.badge.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                  {plan.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
                  )}
                </div>
                
                <div className="text-center mb-6">
                  {plan.originalPrice && (
                    <span className="line-through text-gray-400 mr-2">
                      {value.currency}{plan.originalPrice}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {value.currency}{plan.price}
                    {value.billingPeriod !== 'one-time' && (
                      <span className="text-sm text-gray-500 font-normal ml-1">
                        {value.billingPeriod}
                      </span>
                    )}
                  </span>
                </div>
                
                {value.showFeatures && plan.features && (
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature: string, fidx: number) => (
                      <li key={fidx} className="flex items-start text-sm">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {plan.buttonUrl && (
                  <a
                    href={plan.buttonUrl}
                    target={plan.buttonTarget !== false ? "_blank" : undefined}
                    rel={plan.buttonRel || (plan.buttonTarget !== false ? "noopener noreferrer" : undefined)}
                    className={`block w-full text-center py-3 px-4 font-semibold rounded-lg transition-colors ${
                      plan.highlighted
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {plan.buttonText || 'Get Started'}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    },
    
    // CTA Block
    ctaBlock: ({ value }: any) => {
      const styles = {
        primary: 'bg-primary-800 hover:bg-primary-700 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white',
        success: 'bg-accent-green hover:opacity-90 text-gray-900',
        gradient: 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white'
      }
      
      const bgStyles = {
        primary: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-700',
        secondary: 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700',
        success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
        gradient: 'bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-700'
      }
      
      return (
        <div className={`my-10 rounded-2xl p-8 text-center border ${bgStyles[value.style as keyof typeof bgStyles] || bgStyles.primary}`}>
          <h3 className="text-2xl font-bold mb-3">{value.heading}</h3>
          {value.text && (
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              {value.text}
            </p>
          )}
          <a
            href={value.buttonUrl}
            target={value.buttonTarget ? "_blank" : undefined}
            rel={value.buttonRel || (value.buttonTarget ? "noopener noreferrer" : undefined)}
            className={`inline-flex items-center px-6 py-3 font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg ${styles[value.style as keyof typeof styles] || styles.primary}`}
          >
            {value.buttonText}
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </a>
        </div>
      )
    }
  },
  
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900 dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary-500 pl-6 my-6 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 py-4 pr-6 rounded-r-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        {children}
      </p>
    )
  },
  
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-6 space-y-2 ml-6 list-disc marker:text-primary-600">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-6 space-y-2 ml-6 list-decimal marker:text-primary-600">
        {children}
      </ol>
    )
  },
  
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-gray-700 dark:text-gray-300">
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-gray-700 dark:text-gray-300">
        {children}
      </li>
    )
  },
  
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900 dark:text-white">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono text-primary-600 dark:text-primary-400">
        {children}
      </code>
    ),
    highlight: ({ children }: any) => (
      <mark className="bg-yellow-200 dark:bg-yellow-800/50 px-1 rounded">
        {children}
      </mark>
    ),
    underline: ({ children }: any) => (
      <span className="underline underline-offset-2 decoration-primary-400">
        {children}
      </span>
    ),
    link: ({ value, children }: any) => {
      const target = value?.blank ? '_blank' : undefined
      
      // Build rel attribute based on settings
      let relArray = []
      if (value?.rel) {
        relArray.push(value.rel)
      }
      if (value?.blank && !value?.rel?.includes('noopener')) {
        relArray.push('noopener', 'noreferrer')
      }
      const rel = relArray.length > 0 ? relArray.join(' ') : undefined
      
      return (
        <Link 
          href={value?.href || '#'} 
          target={target}
          rel={rel}
          className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
        >
          {children}
        </Link>
      )
    }
  }
}