import Link from 'next/link'
import { getHomepageData } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import HeroSection from '@/components/home/HeroSection'
import TrustIndicators from '@/components/home/TrustIndicators'
import FeaturedSoftware from '@/components/home/FeaturedSoftware'
import CategoriesGrid from '@/components/home/CategoriesGrid'
import LatestReviews from '@/components/home/LatestReviews'
import ROICalculatorPreview from '@/components/home/ROICalculatorPreview'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import ComparisonTool from '@/components/home/ComparisonTool'
import BlogHighlights from '@/components/home/BlogHighlights'
import NewsletterCTA from '@/components/home/NewsletterCTA'
import FAQSection from '@/components/home/FAQSection'

export default async function HomePage() {
  const data = await getHomepageData()

  return (
    <div className="min-h-screen">
      {/* Hero Section with animated background */}
      <HeroSection />
      
      {/* Trust Indicators - logos and stats */}
      <TrustIndicators />
      
      {/* Featured Software Showcase */}
      <FeaturedSoftware software={data?.featuredSoftware} />
      
      {/* Categories Grid */}
      <CategoriesGrid />
      
      {/* Latest Reviews Carousel */}
      <LatestReviews reviews={data?.latestReviews} />
      
      {/* ROI Calculator Preview */}
      <ROICalculatorPreview />
      
      {/* Quick Comparison Tool */}
      <ComparisonTool />
      
      {/* Blog Highlights */}
      <BlogHighlights posts={data?.latestPosts} guides={data?.featuredGuides} />
      
      {/* Testimonials */}
      <TestimonialsSection testimonials={data?.testimonials} />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Newsletter CTA */}
      <NewsletterCTA />
    </div>
  );
}