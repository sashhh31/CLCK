import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import StatsSection from "@/components/stats-section"
import PricingSection from "@/components/pricing-section"
import CtaSection from "@/components/cta-section"
import TestimonialSection from "@/components/testimonial-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TaxSection from "@/components/Tax-section"
import { fetchAboutUsData, fetchTestimonials, fetchPricingPlans, fetchCtaSectionData } from "@/lib/contentful"
import ImagesSection from "@/components/ImagesSection"


export default async function AboutUsPage() {
 


      const pricingPlans = await fetchPricingPlans();
      const aboutData = await fetchAboutUsData();
      const testimonials = await fetchTestimonials();
    const ctaData = await fetchCtaSectionData();


    




  const { image, title, description, features } = aboutData;
  const imageUrl = image?.url || "/image (8).png";
  const imageAlt = image?.title || "About Us";

  return (
    <div className="w-full overflow-hidden">
      <Header/>
      <div className="min-h-screen w-full mb-24 overflow-hidden ">
        <section className="w-full py-8 md:py-24 bg-hero-bg bg-cover bg-center">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">About Us</h1>
          </div>
        </section>

        <ImagesSection/>

        <section className="w-full py-8 md:py-24">
          <div className="container">
            <div className="flex flex-col lg:flex-col gap-8 md:gap-12 items-center">
              <div className="w-full ">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full rounded-lg"
                  width={600}
                  height={400}
                />
              </div>
              <div className="w-full space-y-6 md:space-x-12 md:space-y-8 flex">
                <div className="space-y-4 ">
                  <h2 className="text-2xl md:text-3xl text-[#1C1C5A] font-medium">About Us</h2>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold">{title}</h3>
                </div>
                <div className="">
                <p className="text-base md:text-lg mb-10 lg:text-xl text-muted-foreground">
                  {description}
                </p>
                <ul className="space-y-4 md:space-y-6">
                  {features?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-5 h-5 bg-[#FFA500] rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                        <Check className="h-3 w-3 text-[#1C1C5A]" />
                      </div>
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
                </div>

              </div>
            </div>
          </div>
        </section>
<StatsSection/>
        <div className="container my-40">
          <TaxSection  />
        </div>

        <CtaSection ctaData={ctaData} />
        <TestimonialSection testimonials={testimonials} />
        <PricingSection pricingPlans={pricingPlans} />
      </div>
      <Footer/>
    </div>
  )
}
function fetchCtaData() {
  throw new Error("Function not implemented.")
}

