import Link from "next/link";
import HeroSection from "@/components/hero-section";

import PricingSection from "@/components/pricing-section";
import TestimonialSection from "@/components/testimonial-section";
import images from "@/components/ImagesSection";
import { 
  fetchTestimonials, 
  fetchFAQs, 
  fetchPricingPlans, 
  fetchHeroSectionData, 
  fetchAboutUsSectionData, 
  fetchCtaSectionData, 
  fetchServicePageData, 
  fetchServiceSectionData 
} from "@/lib/contentful";
import BlogSection from "@/components/blog-section";
import CtaSection from "@/components/cta-section";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FaqSection from "@/components/faq-section";
import FinancialServicesCard from "@/components/financialServiceCard";
import TaxSection from "@/components/Tax-section";
import FeaturesSection from "@/components/Features-section";
import ImagesSection from "@/components/ImagesSection";
export default async function Home() {
  // Fetch data from Contentful
  const testimonials = await fetchTestimonials();
  const faqs = await fetchFAQs();
  const pricingPlans = await fetchPricingPlans();
  const heroSlides = await fetchHeroSectionData();
  const aboutUsData = await fetchAboutUsSectionData();
  const ctaData = await fetchCtaSectionData();
  const taxServices = await fetchServiceSectionData();


  return (
    <div className="overflow-hidden">
      <Header />
      <div className="relative">
        <HeroSection slides={heroSlides} />
        <div className="md:py-4 border-b md:mt-[400px] mt-40">
        <ImagesSection/>
        </div>
      </div>
      <FeaturesSection/>
      <div className="flex justify-center">
        <FinancialServicesCard aboutUsData={aboutUsData} />
      </div>
      <div className="flex justify-center my-20 p-16">
        <TaxSection/>
      </div>
      <CtaSection ctaData={ctaData} />
      <PricingSection pricingPlans={pricingPlans} />
      <FaqSection faqs={faqs} />
      <TestimonialSection testimonials={testimonials} />
      <BlogSection />
      <Footer />
    </div>
  );
}
