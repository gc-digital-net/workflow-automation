import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// This webhook will be called by Sanity when content changes
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Verify the webhook secret (optional but recommended)
    const secret = request.headers.get('sanity-webhook-secret')
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get the document type that was changed
    const { _type, slug } = body
    
    console.log(`Revalidating ${_type} with slug: ${slug?.current}`)

    // Revalidate based on document type
    switch (_type) {
      case 'software':
        // Revalidate the specific review page
        if (slug?.current) {
          revalidatePath(`/reviews/${slug.current}`)
        }
        // Also revalidate the reviews listing page
        revalidatePath('/reviews')
        break
        
      case 'blogPost':
        // Revalidate the specific blog post
        if (slug?.current) {
          revalidatePath(`/blog/${slug.current}`)
        }
        // Also revalidate the blog listing page
        revalidatePath('/blog')
        revalidatePath('/')
        break
        
      case 'userReview':
        // Revalidate all review pages since user reviews appear on them
        revalidatePath('/reviews', 'page')
        break
        
      default:
        // Revalidate the homepage for any other changes
        revalidatePath('/')
        break
    }

    return NextResponse.json({
      message: 'Revalidation triggered successfully',
      type: _type,
      slug: slug?.current,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { message: 'Error processing webhook', error: String(error) },
      { status: 500 }
    )
  }
}