import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Get the secret token from the request
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    const path = searchParams.get('path')
    const type = searchParams.get('type')
    
    // Check for secret to confirm this is a valid request
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    // Revalidate specific paths or all paths
    if (path) {
      // Revalidate a specific path
      revalidatePath(path)
      return NextResponse.json({
        revalidated: true,
        path: path,
        now: Date.now()
      })
    } else if (type) {
      // Revalidate by type
      switch(type) {
        case 'reviews':
          revalidatePath('/reviews', 'page')
          revalidatePath('/reviews/[slug]', 'page')
          break
        case 'blog':
          revalidatePath('/blog', 'page')
          revalidatePath('/blog/[slug]', 'page')
          break
        case 'all':
          revalidatePath('/', 'layout')
          break
        default:
          revalidatePath('/', 'layout')
      }
      
      return NextResponse.json({
        revalidated: true,
        type: type,
        now: Date.now()
      })
    } else {
      // Revalidate everything
      revalidatePath('/', 'layout')
      
      return NextResponse.json({
        revalidated: true,
        now: Date.now()
      })
    }
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    )
  }
}

// GET method for easy browser testing
export async function GET(request: NextRequest) {
  return POST(request)
}