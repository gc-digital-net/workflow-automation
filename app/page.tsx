import HeroSection from '@/components/home/HeroSection';
import TrustIndicators from '@/components/home/TrustIndicators';
import FeaturedSoftware from '@/components/home/FeaturedSoftware';
import LatestContent from '@/components/home/LatestContent';
import PopularCategories from '@/components/home/PopularCategories';
import ROICalculatorPreview from '@/components/home/ROICalculatorPreview';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustIndicators />
      <FeaturedSoftware />
      <LatestContent />
      <PopularCategories />
      <ROICalculatorPreview />
      <Testimonials />
      <CTASection />
    </>
  );
}