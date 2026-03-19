import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { sanityFetch } from '@/lib/sanity/client';

// Query to get all blog post slugs with publishedAt dates
const blogSlugsQuery = `
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    publishedAt
  }
`;

// Query to get all software review slugs
const reviewSlugsQuery = `
  *[_type == "software" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`;

// Query to get all guide slugs
const guideSlugsQuery = `
  *[_type == "topSoftware" && defined(slug.current)] {
    "slug": slug.current,
    publishedAt,
    lastUpdated
  }
`;

// Query to get all category slugs
const categorySlugsQuery = `
  *[_type == "softwareCategory" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/reviews',
    '/reviews/compare',
    '/guides',
    '/categories',
    '/tools',
    '/tools/roi-calculator',
    '/tools/software-finder',
    '/learn',
    '/learn/certification',
    '/learn/templates',
    '/learn/resources',
    '/community',
    '/services',
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Fetch dynamic content from Sanity
    const [blogPosts, reviews, guides, categories] = await Promise.all([
      sanityFetch({ query: blogSlugsQuery, tags: ['blogPost'] }),
      sanityFetch({ query: reviewSlugsQuery, tags: ['software'] }),
      sanityFetch({ query: guideSlugsQuery, tags: ['topSoftware'] }),
      sanityFetch({ query: categorySlugsQuery, tags: ['softwareCategory'] }),
    ]);

    // Blog post routes
    const blogRoutes: MetadataRoute.Sitemap = (blogPosts || []).map((post: { slug: string; publishedAt: string }) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    // Software review routes
    const reviewRoutes: MetadataRoute.Sitemap = (reviews || []).map((review: { slug: string; _updatedAt: string }) => ({
      url: `${baseUrl}/reviews/${review.slug}`,
      lastModified: review._updatedAt ? new Date(review._updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Guide routes
    const guideRoutes: MetadataRoute.Sitemap = (guides || []).map((guide: { slug: string; publishedAt: string; lastUpdated: string }) => ({
      url: `${baseUrl}/guides/${guide.slug}`,
      lastModified: guide.lastUpdated ? new Date(guide.lastUpdated) : (guide.publishedAt ? new Date(guide.publishedAt) : new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    // Category routes
    const categoryRoutes: MetadataRoute.Sitemap = (categories || []).map((category: { slug: string }) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));

    return [...staticRoutes, ...blogRoutes, ...reviewRoutes, ...guideRoutes, ...categoryRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return just static routes if Sanity fetch fails
    return staticRoutes;
  }
}
