import Link from "next/link";
import HeroSection from "@/components/hero-section";

import PricingSection from "@/components/pricing-section";
import TestimonialSection from "@/components/testimonial-section";
import BlogSection from "@/components/blog-section";
import CtaSection from "@/components/cta-section";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FaqSection from "@/components/faq-section";
import FinancialServicesCard from "@/components/financialServiceCard";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Header />
      <div className="relative">
        <HeroSection />
        <div className="md:py-8 border-b md:mt-[400px] mt-40">
          <div className="container flex justify-between items-center">
            <div className="h-20 w-full scale-110 flex gap-40 mb-20 items-center justify-center ">
              <div className="w-[150px] h-[150px] mt-12">
                <img
                  src="./prize.jpg"
                  alt="Dashboard screenshot"
                  className="w-full h-full object-contain shadow-lg"
                />
              </div>

              <div className="w-[150px] h-[150px] mt-12">
                <img
                  src="./crest.jpg"
                  alt="Dashboard screenshot"
                  className="w-full h-full object-contain shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="py-16 px-4 md:px-12 lg:px-24 bg-white">
        <div className="flex justify-center my-10">
          <h2 className="text-3xl md:text-5xl font-bold max-w-4xl text-center mb-12">
            Our Customer Platform Everyone's Business
          </h2>
        </div>
        <div className="flex justify-center">
          <div className="grid md:grid-cols-3 gap-14 w-[1200px] justify-center">
            {/* Stress-Free Taxes */}
            <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition duration-300 bg-[#1C1C5A] text-white hover:border-[#FFA500]">
            <div className="w-14 h-14 mb-10 bg-[#f0d687] rounded-full flex items-center justify-center p-2">
                <img
                  src="../Banknote copy.png"
                  alt="Icon for Secure & Smart"
                  className="w-20 h-20 object-contain"  
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-[#FFA500]">
                Stress-Free Taxes
              </h3>
              <p className="text-gray-300">
                Our system automates bookkeeping and tax processes, keeping your
                records accurate and up to date with minimal effort.
              </p>
            </div>

            {/* Secure & Smart */}
            <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition duration-300 bg-[#1C1C5A] text-white hover:border-[#FFA500]">
            <div className="w-14 h-14 mb-10 bg-[#f0d687] rounded-full flex items-center justify-center p-2">
                <img
                  src="../Shield copy.png"
                  alt="Icon for Secure & Smart"
                  className="w-20 h-20 object-contain"  
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-[#FFA500]">Secure & Smart</h3>
              <p className="text-gray-300">
                Our platform ensures secure document management, easy
                navigation, and accessibility for a seamless experience.
              </p>
            </div>

            {/* Exclusive Perks */}
            <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition duration-300 bg-[#1C1C5A] text-white hover:border-[#FFA500]">
              <div className="w-14 h-14 mb-10 bg-[#f0d687] rounded-full flex items-center justify-center p-2">
                <img
                  src="../Pie Chart copy.png"
                  alt="Icon for Exclusive Perks"
                  className="w-20 h-20 object-contain"  
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-[#FFA500]">Exclusive Perks</h3>
              <p className="text-gray-300">
                Gain access to expert resources, secure storage, and one-on-one
                consultations. Our private members' area offers exclusive
                content to keep your finances in check.
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
            <p className="text-black max-w-3xl text-2xl mx-auto">
              We specialize in providing comprehensive financial services
              tailored to meet the unique needs of our clients.
            </p>
          </div>

          {/* Button */}
          <div className="text-center mb-16">
            <button className="bg-[#1C1C5A] text-white text-lg font-medium px-8 py-3 rounded-full hover:bg-[#1C1C5A]/70 transition duration-200">
              Explore All Services
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#1C1C5A] rounded-2xl p-6 flex flex-col gap-4 h-[400px] text-white hover:border hover:border-[#FFA500] transition-all duration-200">
            <div className="w-20 h-20 bg-[#f0d687] rounded-full flex items-center justify-center p-3">
                <img
                  src="../RTM_taxation copy.png"
                  alt="Icon for Secure & Smart"
                  className="w-20 h-20 object-contain"  
                />
              </div>
              <h3 className="text-3xl font-semibold mt-12 text-[#FFA500]">Tax Planning</h3>
              <p className="text-gray-300 text-xl">
                Our payroll processing services take the hassle out of managing
                your payroll, allowing you to focus on running your business.
              </p>
              <a
                href="#"
                className="text-sm font-medium text-[#FFA500] hover:text-white transition-colors duration-200 inline-flex items-center gap-1 mt-auto"
              >
                View Detail <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Card 2 (Highlighted) */}
            <div className="bg-[#1C1C5A] scale-105 text-white rounded-2xl p-6 flex flex-col gap-4 border-2 border-[#FFA500]">
            <div className="w-20 h-20 bg-[#f0d687] rounded-full flex items-center justify-center p-3">
                <img
                  src="../RTM_taxes copy.png"
                  alt="Icon for Secure & Smart"
                  className="w-20 h-20 object-contain"  
                />
              </div>
              <h3 className="text-3xl font-semibold mt-12 text-[#FFA500]">Audit services</h3>
              <p className="text-white text-xl">
                Our payroll processing services take the hassle out of managing
                your payroll, allowing you to focus on running your business.
              </p>
              <a
                href="#"
                className="text-sm font-normal text-[#FFA500] hover:text-white transition-colors duration-200 inline-flex items-center gap-1 mt-auto"
              >
                View Detail <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>

            {/* Card 3 */}
            <div className="bg-[#1C1C5A] rounded-2xl p-6 flex flex-col gap-4 text-white hover:border hover:border-[#FFA500] transition-all duration-200">
            <div className="w-20 h-20 bg-[#f0d687] rounded-full flex items-center justify-center p-3">
                <img
                  src="../RTM_tax-law copy.png"
                  alt="Icon for Secure & Smart"
                  className="w-20 h-20 object-contain"  
                />
              </div>
              <h3 className="text-3xl font-semibold mt-12 text-[#FFA500]">Tax strategy</h3>
              <p className="text-white text-xl">
                Our payroll processing services take the hassle out of managing
                your payroll, allowing you to focus on running your business.
              </p>
              <a
                href="#"
                className="text-sm font-medium text-[#FFA500] hover:text-white transition-colors duration-200 inline-flex items-center gap-1 mt-auto"
              >
                View Detail <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <CtaSection />
      <PricingSection />
        <FaqSection />
      <TestimonialSection />
      <BlogSection />
      <Footer />
    </div>
  );
}
