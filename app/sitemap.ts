import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/reviews',
    '/listicles',
    '/categories',
    '/tools',
    '/tools/roi-calculator',
    '/tools/workflow-builder',
    '/tools/software-finder',
    '/learn',
    '/learn/certification',
    '/learn/templates',
    '/learn/resources',
    '/community',
    '/community/membership',
    '/community/events',
    '/community/podcast',
    '/services',
    '/services/consultation',
    '/services/audit',
    '/services/training',
  ];

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // TODO: Add dynamic routes from Sanity
  // const posts = await getPostSlugs();
  // const reviews = await getReviewSlugs();
  // const listicles = await getListicleSlugs();
  
  // const dynamicRoutes = [
  //   ...posts.map((slug) => ({
  //     url: `${baseUrl}/blog/${slug}`,
  //     lastModified: new Date(),
  //     changeFrequency: 'weekly' as const,
  //     priority: 0.6,
  //   })),
  //   ...reviews.map((slug) => ({
  //     url: `${baseUrl}/reviews/${slug}`,
  //     lastModified: new Date(),
  //     changeFrequency: 'monthly' as const,
  //     priority: 0.7,
  //   })),
  //   ...listicles.map((slug) => ({
  //     url: `${baseUrl}/listicles/${slug}`,
  //     lastModified: new Date(),
  //     changeFrequency: 'monthly' as const,
  //     priority: 0.7,
  //   })),
  // ];

  return [...staticRoutes];
}