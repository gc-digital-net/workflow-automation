import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    const query = `*[_type == "software" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      logo,
      tagline,
      overallScore,
      scores,
      pricing,
      pros,
      cons,
      integrations,
      popularIntegrations,
      supportedPlatforms,
      deploymentOptions,
      platformInfo,
      affiliateLink,
      quickInfo,
      companyInfo,
      securityInfo,
      supportInfo,
      categories[]-> {
        name,
        slug
      }
    }`;
    
    const software = await client.fetch(query, { slug });
    
    if (!software) {
      return NextResponse.json(
        { error: 'Software not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(software);
  } catch (error) {
    console.error('Error fetching software:', error);
    return NextResponse.json(
      { error: 'Failed to fetch software data' },
      { status: 500 }
    );
  }
}