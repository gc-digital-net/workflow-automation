import { NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity/client'
import { guidesQuery } from '@/lib/sanity/queries/guides'

export async function GET() {
  try {
    const guides = await sanityFetch({
      query: guidesQuery,
      tags: ['topSoftware'],
    })
    
    return NextResponse.json({
      success: true,
      count: guides?.length || 0,
      guides: guides || [],
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}