import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import crypto from 'crypto';

// Verify webhook signature from Sanity
function verifySignature(body: string, signature: string | null) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(body);
  const expectedSignature = hmac.digest('base64');
  
  return signature === expectedSignature;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-sanity-signature');

    // Verify webhook signature in production
    if (process.env.NODE_ENV === 'production' && !verifySignature(body, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const data = JSON.parse(body);
    const { _type, slug } = data;

    console.log('Webhook received for:', _type, slug?.current);

    // Revalidate based on content type
    switch (_type) {
      case 'post':
        revalidatePath('/blog');
        revalidatePath(`/blog/${slug?.current}`);
        revalidateTag('posts');
        break;
      
      case 'listicle':
        revalidatePath('/listicles');
        revalidatePath(`/listicles/${slug?.current}`);
        revalidateTag('listicles');
        break;
      
      case 'software':
        revalidatePath('/reviews');
        revalidatePath(`/reviews/${slug?.current}`);
        revalidateTag('software');
        break;
      
      case 'category':
        revalidatePath('/categories');
        revalidatePath(`/categories/${slug?.current}`);
        revalidateTag('categories');
        break;
      
      default:
        // Revalidate homepage for any content changes
        revalidatePath('/');
    }

    return NextResponse.json(
      { message: 'Revalidation triggered', type: _type },
      { status: 200 }
    );

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}