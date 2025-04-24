import ServicesSection from "@/components/services-section"
import PricingSection from "@/components/pricing-section"
import CtaSection from "@/components/cta-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import StatsSection from "@/components/stats-section"
export default function ServicesPage() {
  return (
    <div>
<Header/>
    <div className="min-h-screen mb-24">
      <section className="w-full py-12 md:py-24 bg-hero-bg bg-cover bg-center">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Our <span className="text-[#F8D77E]">Services</span>
          </h1>
        </div>
      </section>
      <ServicesSection />
      <StatsSection/>
      <PricingSection />
      <CtaSection />
    </div>
<Footer/>
    </div>
  )
}
