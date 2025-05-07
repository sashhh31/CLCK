import PricingSection from "@/components/pricing-section"
import CtaSection from "@/components/cta-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { fetchPricingPlans, fetchCtaSectionData } from "@/lib/contentful"
export default async function PricingPage() {
  const pricingPlans = await fetchPricingPlans();
  const ctaData = await fetchCtaSectionData();
  return (
    <div>
<Header/>
    <div className="min-h-screen mb-24">
      <section className="w-full py-12 md:py-24 bg-hero-bg bg-cover bg-center">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Pricing <span className="text-[#F8D77E]">Plans</span>
          </h1>
        </div>
      </section>
      <PricingSection pricingPlans={pricingPlans} />
      <CtaSection ctaData={ctaData} />
    </div>
    <Footer/>
    </div>
  )
}
