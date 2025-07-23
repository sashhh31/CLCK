import ServicesSection from "@/components/services-section"
import ServicePageSection from "@/components/service-page-section"
import PricingSection from "@/components/pricing-section"
import CtaSection from "@/components/cta-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import StatsSection from "@/components/stats-section"
import TaxSection from "@/components/Tax-section"
import { fetchServices, fetchPricingPlans, fetchServicePageData, fetchCtaSectionData, fetchServiceSectionData } from "@/lib/contentful"
import PricingSectionLoginRedirect from "@/components/pricing-section-login-redirect"

export default async function ServicesPage() {
  // Fetch data from Contentful
  const services = await fetchServices();
  const pricingPlans = await fetchPricingPlans();
  const servicePages = await fetchServicePageData();
  const ctaData = await fetchCtaSectionData();

  return (
    <div>
      <Header/>
      <div className="min-h-screen mb-24 overflow-hidden">
        <section className="w-full py-12 md:py-24 bg-hero-bg bg-cover bg-center">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Our <span className="text-[#F8D77E]">Services</span>
            </h1>
          </div>
        </section>
        
        
        {/* Display the new service pages section */}
        <ServicePageSection servicePages={servicePages} />
        
        {/* Then show the detailed services section */}
        {/* <ServicesSection services={services} /> */}
        
        <StatsSection/>
        <PricingSectionLoginRedirect pricingPlans={pricingPlans} />
        <CtaSection ctaData={ctaData} />
      </div>
      <Footer/>
    </div>
  )
}
