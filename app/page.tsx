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
    <div className="min-h-screen relative overflow-hidden">
      {/* Smooth gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Glossy effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/10 via-transparent to-primary-100/10 dark:from-primary-900/10 dark:via-transparent dark:to-primary-800/10" />
        
        {/* Subtle animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-200/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-primary-300/20 to-transparent rounded-full blur-3xl animate-pulse delay-700" />
      </div>
      
      {/* Content with relative positioning */}
      <div className="relative z-10">
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
    </div>
  );
}