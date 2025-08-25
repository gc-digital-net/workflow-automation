import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Get IP address and user agent for security
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Validate required fields
    if (!data.reviewerName || !data.reviewerEmail || !data.rating || !data.headline || !data.pros || !data.cons) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.reviewerEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate rating
    if (data.rating < 1 || data.rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Validate text lengths
    if (data.pros.length < 50 || data.pros.length > 500) {
      return NextResponse.json(
        { error: 'Pros must be between 50 and 500 characters' },
        { status: 400 }
      )
    }

    if (data.cons.length < 50 || data.cons.length > 500) {
      return NextResponse.json(
        { error: 'Cons must be between 50 and 500 characters' },
        { status: 400 }
      )
    }

    // Create the review document in Sanity
    const review = await client.create({
      _type: 'userReview',
      software: {
        _type: 'reference',
        _ref: data.software
      },
      reviewerName: data.reviewerName,
      reviewerEmail: data.reviewerEmail,
      reviewerRole: data.reviewerRole || '',
      companyName: data.companyName || '',
      companySize: data.companySize || '',
      rating: data.rating,
      categoryRatings: data.categoryRatings || {
        easeOfUse: 0,
        features: 0,
        valueForMoney: 0,
        customerSupport: 0
      },
      usageLength: data.usageLength || '',
      headline: data.headline,
      pros: data.pros,
      cons: data.cons,
      useCases: data.useCases || '',
      wouldRecommend: data.wouldRecommend !== false,
      verified: false,
      featured: false,
      publishedAt: new Date().toISOString(),
      status: 'pending',
      ipAddress: ipAddress,
      userAgent: userAgent
    })

    // Send email notification to admin (optional)
    // You can integrate with your email service here
    
    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully',
      reviewId: review._id
    })
  } catch (error) {
    console.error('Error submitting review:', error)
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    )
  }
}