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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-850 dark:to-gray-900">
      {/* Seamless gradient overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/5 to-transparent dark:from-transparent dark:via-primary-900/5 dark:to-transparent" />
        
        {/* Very subtle animated gradient orbs for depth */}
        <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-gradient-radial from-primary-100/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-1/3 w-[600px] h-[600px] bg-gradient-radial from-cyan-100/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-indigo-100/5 to-transparent rounded-full blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative">
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