import Link from "next/link"
import { Check } from "lucide-react"
import StatsSection from "@/components/stats-section"
import PricingSection from "@/components/pricing-section"
import CtaSection from "@/components/cta-section"
import TestimonialSection from "@/components/testimonial-section"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutUsPage() {
  return (
    <>
    <Header/>
    <div className="min-h-screen mb-24 overflow-hidden">
      <section className="w-full py-12 md:py-24 bg-[#2A3356]">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">About Us</h1>
        </div>
      </section>

      <div className="py-8 border-b">
        <div className="container flex justify-between items-center">
        <div className="h-20 w-full scale-110">
                  <img
                  src="../company.png"
                  height={50}
                  />
            </div>
        </div>
      </div>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-12">
          <div className="grid-rows-1 md:grid-rows-2 gap-12  items-center">
            <div>
              <img
                src="/image (8).png"
                alt="About Us"
                className="w-full rounded-lg"
                width={600}
                height={400}
              />
            </div>
            <div className="flex gap-44 justify-center">
              <div className="mb-6 mt-10 gap-6 max-w-[500px]">
                <h2 className="text-3xl text-[#2A3356] font-medium mb-4">About Us</h2>
                <h3 className="text-5xl font-bold mb-4">We are Serving Your Financial Records Needs</h3>
              </div>
              <div className="mt-20 w-[500px]" >

              <p className="text-muted-foreground mb-6 text-xl">
              We specialize in providing comprehensive financial services tailored to meet the unique needs of our clients.
              </p>
              <ul className="space-y-6 mb-6 text-lg">
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-[#2A3356] rounded-full flex items-center justify-center mr-2 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-[#2A3356] rounded-full flex items-center justify-center mr-2 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm">
                    Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-[#2A3356] rounded-full flex items-center justify-center mr-2 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-[#2A3356] rounded-full flex items-center justify-center mr-2 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm">
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-[#2A3356] rounded-full flex items-center justify-center mr-2 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm">
                    Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit.
                  </span>
                </li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
     
    <section className="w-full py-16 bg-white text-[#1C1C1C]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The Best Option For Your Financial Records
          </h2>
          <p className="text-gray-500 max-w-3xl text-2xl mx-auto">
            We specialize in providing comprehensive financial services tailored to meet the unique needs of our clients.
          </p>
        </div>

        {/* Button */}
        <div className="text-center mb-16">
          <button className="bg-[#2A3356] text-white text-lg font-medium px-8 py-3 rounded-full hover:bg-[#1f2946] transition">
            Explore All Services
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#F5F5F5] rounded-2xl p-6 flex flex-col gap-4 h-[400px]">
            <div className="w-20 h-20">
              {/* Placeholder image tag */}
              <img src="../TaxPlanning.png" alt="Tax Planning Icon" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-3xl font-semibold mt-12">Tax Planning</h3>
            <p className="text-gray-500 text-xl">
              Our payroll processing services take the hassle out of managing your payroll, allowing you to focus on running your business.
            </p>
            <a href="#" className="text-sm font-medium text-[#2A3356] underline inline-flex items-center gap-1 mt-auto">
              View Detail <span>↗</span>
            </a>
          </div>

          {/* Card 2 (Highlighted) */}
          <div className="bg-[#2A3356] text-white rounded-2xl p-6 flex flex-col gap-4">
            <div className="w-20 h-20">
              {/* Placeholder image tag */}
              <img src="../auditServices.png" alt="Audit Services Icon" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-3xl font-semibold mt-12">Audit services</h3>
            <p className="text-gray-300 text-xl">
              Our payroll processing services take the hassle out of managing your payroll, allowing you to focus on running your business.
            </p>
            <a href="#" className="text-sm font-medium text-[#F0D687] underline inline-flex items-center gap-1 mt-auto">
              View Detail <span>↗</span>
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-4">
            <div className="w-20 h-20">
              {/* Placeholder image tag */}
              <img src="../TaxStrategy.png" alt="Tax Strategy Icon" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-3xl font-semibold mt-12">Tax strategy</h3>
            <p className="text-gray-500 text-xl">
              Our payroll processing services take the hassle out of managing your payroll, allowing you to focus on running your business.
            </p>
            <a href="#" className="text-sm font-medium text-[#2A3356] underline inline-flex items-center gap-1 mt-auto">
              View Detail <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  

      <CtaSection />
      <TestimonialSection />
      <PricingSection />
    </div>
    <Footer/>
    </>
  )
}
