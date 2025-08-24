import { Metadata } from 'next';
import { getPosts } from '@/lib/sanity-queries';
import { BlogPageClient } from '@/components/BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog | Workflow Automation Insights & Guides',
  description: 'Expert insights, in-depth guides, and practical tips on workflow automation, business process management, and productivity tools.',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <BlogPageClient posts={posts} />
    </div>
  );
}