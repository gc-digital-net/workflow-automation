import { NextRequest, NextResponse } from 'next/server';

interface MembershipData {
  email: string;
  plan: 'free' | 'pro' | 'team';
  firstName?: string;
  lastName?: string;
  company?: string;
  teamSize?: number;
}

// Get membership status
export async function GET(request: NextRequest) {
  try {
    // In production, verify user authentication
    // const session = await getSession(request);
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Mock membership data - in production, fetch from database
    const membership = {
      email,
      plan: 'free',
      status: 'active',
      joinedAt: new Date('2024-01-01').toISOString(),
      features: [
        'community_access',
        'basic_templates',
        'monthly_newsletter',
      ],
      limits: {
        templates: 5,
        downloads: 10,
        apiCalls: 100,
      },
    };
    
    return NextResponse.json(membership, { status: 200 });
    
  } catch (error) {
    console.error('Membership fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch membership status' },
      { status: 500 }
    );
  }
}

// Create or update membership
export async function POST(request: NextRequest) {
  try {
    const data: MembershipData = await request.json();
    
    // Validate required fields
    if (!data.email || !data.plan) {
      return NextResponse.json(
        { error: 'Email and plan are required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    // Validate plan type
    const validPlans = ['free', 'pro', 'team'];
    if (!validPlans.includes(data.plan)) {
      return NextResponse.json(
        { error: 'Invalid membership plan' },
        { status: 400 }
      );
    }
    
    // Team plan validation
    if (data.plan === 'team' && (!data.teamSize || data.teamSize < 2)) {
      return NextResponse.json(
        { error: 'Team size must be at least 2 for team plan' },
        { status: 400 }
      );
    }
    
    // In production:
    // 1. Create/update user in database
    // 2. Process payment if required
    // 3. Send welcome/upgrade email
    // 4. Grant access to features
    // 5. Add to community platform (Slack, Discord, etc.)
    
    // Mock response
    const membership = {
      id: 'mem_' + Date.now(),
      email: data.email,
      plan: data.plan,
      status: 'active',
      createdAt: new Date().toISOString(),
      billingCycle: data.plan === 'free' ? null : 'monthly',
      nextBillingDate: data.plan === 'free' ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
    
    // Add to email list with appropriate tags
    if (process.env.CONVERTKIT_API_KEY) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        await fetch(
          `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              api_key: process.env.CONVERTKIT_API_KEY,
              email: data.email,
              first_name: data.firstName,
              tags: [`member-${data.plan}`, 'community-member'],
              fields: {
                company: data.company,
                plan: data.plan,
              },
            }),
            signal: controller.signal,
          }
        );
        
        clearTimeout(timeoutId);
      } catch (error) {
        console.error('Failed to add member to email list:', error);
      }
    }
    
    return NextResponse.json(
      {
        message: 'Membership created successfully',
        membership,
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Membership creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create membership' },
      { status: 500 }
    );
  }
}

// Cancel membership
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const membershipId = searchParams.get('id');
    
    if (!membershipId) {
      return NextResponse.json(
        { error: 'Membership ID is required' },
        { status: 400 }
      );
    }
    
    // In production:
    // 1. Verify user owns this membership
    // 2. Cancel subscription in Stripe
    // 3. Update database
    // 4. Send cancellation email
    // 5. Remove from community platforms
    
    return NextResponse.json(
      {
        message: 'Membership cancelled successfully',
        cancelledAt: new Date().toISOString(),
        accessUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Membership cancellation error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel membership' },
      { status: 500 }
    );
  }
}