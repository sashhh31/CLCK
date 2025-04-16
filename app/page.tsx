import Link from "next/link"
import HeroSection from "@/components/hero-section"

import PricingSection from "@/components/pricing-section"
import TestimonialSection from "@/components/testimonial-section"
import BlogSection from "@/components/blog-section"
import CtaSection from "@/components/cta-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FaqSection from "@/components/faq-section-landing"
import FinancialServicesCard from "@/components/financialServiceCard"
import { ArrowUpRight } from "lucide-react"

export default function Home() {
  return (
    <div className="overflow-hidden">
            <Header />
            <div className="relative">

      <HeroSection />
      <div className="md:py-8 border-b md:mt-[400px] mt-40">
        <div className="container flex justify-between items-center">
        <div className="h-20 w-full scale-110">
                  <img
                  src="../company.png"
                  height={100}
                  width={1400}
                  />
            </div>
        </div>
      </div>
                  </div>
                  <section className="py-16 px-4 md:px-12 lg:px-24 bg-white">
                    <div className="flex justify-center my-10">

      <h2 className="text-3xl md:text-5xl font-bold max-w-4xl text-center mb-12">
        Our Customer Platform Everyone’s Business
      </h2>
                    </div>
<div className="flex justify-center">
<div className="grid md:grid-cols-3 gap-14 w-[1200px] justify-center">
        {/* Stress-Free Taxes */}
        <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition duration-300 bg-gray-50">
          <div className="w-20 h-20 mb-10">
            <img src="../tax.png" alt="Icon for Stress-Free Taxes" className="w-full h-full object-contain" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Stress-Free Taxes</h3>
          <p className="text-gray-600">
            Our system automates bookkeeping and tax processes, keeping your records accurate and up to date with minimal effort.
          </p>
        </div>

        {/* Secure & Smart */}
        <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition duration-300 bg-gray-50">
          <div className="w-20 h-20 mb-10">
            <img src="../secure.png" alt="Icon for Secure & Smart" className="w-full h-full object-contain" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Secure & Smart</h3>
          <p className="text-gray-600">
            Our platform ensures secure document management, easy navigation, and accessibility for a seamless experience.
          </p>
        </div>

        {/* Exclusive Perks */}
        <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition duration-300 bg-gray-50">
          <div className="w-20 h-20 mb-10">
            <img src="../perks.png" alt="Icon for Exclusive Perks" className="w-full h-full object-contain" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Exclusive Perks</h3>
          <p className="text-gray-600">
            Gain access to expert resources, secure storage, and one-on-one consultations. Our private members' area offers exclusive content to keep your finances in check.
          </p>
        </div>
      </div>
</div>
     
    </section>
    <div className="flex justify-center">

          <FinancialServicesCard />
    </div>
     
      <section className="w-full py-16 bg-white text-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-6">
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
  View Detail <ArrowUpRight className="w-4 h-4" />
</a>

          </div>

          {/* Card 2 (Highlighted) */}
          <div className="bg-[#2A3356] scale-105 text-white rounded-2xl p-6 flex flex-col gap-4">
            <div className="w-20 h-20">
              {/* Placeholder image tag */}
              <img src="../auditServices.png" alt="Audit Services Icon" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-3xl font-semibold mt-12">Audit services</h3>
            <p className="text-gray-300 text-xl">
              Our payroll processing services take the hassle out of managing your payroll, allowing you to focus on running your business.
            </p>
            <a href="#" className="text-sm font-normal text-yellow-200 underline inline-flex items-center gap-1 mt-auto">
  View Detail <ArrowUpRight className="w-5 h-5" />
</a>

          </div>

          {/* Card 3 */}
          <div className="bg-gray-100 rounded-2xl p-6 flex flex-col gap-4">
            <div className="w-20 h-20">
              {/* Placeholder image tag */}
              <img src="../TaxStrategy.png" alt="Tax Strategy Icon" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-3xl font-semibold mt-12">Tax strategy</h3>
            <p className="text-gray-500 text-xl">
              Our payroll processing services take the hassle out of managing your payroll, allowing you to focus on running your business.
            </p>
            <a href="#" className="text-sm font-medium text-[#2A3356] underline inline-flex items-center gap-1 mt-auto">
  View Detail <ArrowUpRight className="w-4 h-4" />
</a>

          </div>
        </div>
      </div>
    </section>
      <CtaSection />
      <PricingSection />
      <div className="container mx-48 ">
  <FaqSection />
</div>    
 <TestimonialSection />
      <BlogSection />
      <Footer />
    </div>
  )
}
