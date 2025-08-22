import { NextRequest, NextResponse } from 'next/server';

interface AnalyticsEvent {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  userId?: string;
  properties?: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    const data: AnalyticsEvent = await request.json();

    if (!data.event) {
      return NextResponse.json(
        { error: 'Event name is required' },
        { status: 400 }
      );
    }

    // Log analytics event (in production, send to analytics service)
    console.log('Analytics event:', {
      ...data,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    });

    // Track specific events
    switch (data.event) {
      case 'affiliate_click':
        // Track affiliate clicks for revenue attribution
        await trackAffiliateClick(data);
        break;
      
      case 'tool_comparison':
        // Track which tools are being compared
        await trackComparison(data);
        break;
      
      case 'roi_calculation':
        // Track ROI calculator usage
        await trackROICalculation(data);
        break;
      
      case 'software_finder_complete':
        // Track software finder quiz completions
        await trackSoftwareFinder(data);
        break;
      
      case 'content_engagement':
        // Track content engagement metrics
        await trackContentEngagement(data);
        break;
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );

  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to track analytics event' },
      { status: 500 }
    );
  }
}

async function trackAffiliateClick(data: AnalyticsEvent) {
  // Track affiliate clicks
  console.log('Affiliate click:', {
    software: data.label,
    position: data.properties?.position,
    page: data.properties?.page,
  });
  
  // In production, send to affiliate tracking service
}

async function trackComparison(data: AnalyticsEvent) {
  // Track tool comparisons
  console.log('Tool comparison:', {
    tools: data.properties?.tools,
    winner: data.properties?.winner,
  });
}

async function trackROICalculation(data: AnalyticsEvent) {
  // Track ROI calculations
  console.log('ROI calculation:', {
    hoursSaved: data.properties?.hoursSaved,
    teamSize: data.properties?.teamSize,
    estimatedSavings: data.value,
  });
}

async function trackSoftwareFinder(data: AnalyticsEvent) {
  // Track software finder completions
  console.log('Software finder:', {
    recommendations: data.properties?.recommendations,
    industry: data.properties?.industry,
    budget: data.properties?.budget,
  });
}

async function trackContentEngagement(data: AnalyticsEvent) {
  // Track content engagement
  console.log('Content engagement:', {
    contentType: data.category,
    contentId: data.label,
    action: data.action,
    timeSpent: data.value,
  });
}