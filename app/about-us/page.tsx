import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import StatsSection from "@/components/stats-section"
import PricingSection from "@/components/pricing-section"
import CtaSection from "@/components/cta-section"
import TestimonialSection from "@/components/testimonial-section"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutUsPage() {
  return (
    <div className="w-full">
      <Header/>
      <div className="min-h-screen w-full mb-24 ">
        <section className="w-full py-8 md:py-24 bg-hero-bg bg-cover bg-center">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">About Us</h1>
          </div>
        </section>

        <div className="py-4 md:py-8 border-b">
          <div className="container flex justify-center items-center">
            <div className="h-16 md:h-20 w-full max-w-full md:max-w-full">
              <img
                src="../company.png"
                alt="Company Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <section className="w-full py-8 md:py-24">
          <div className="container">
            <div className="flex flex-col lg:flex-col gap-8 md:gap-12 items-center">
              <div className="w-full ">
                <img
                  src="/image (8).png"
                  alt="About Us"
                  className="w-full rounded-lg"
                  width={600}
                  height={400}
                />
              </div>
              <div className="w-full  space-y-6 md:space-x-12 md:space-y-8 flex">
                <div className="space-y-4 ">
                  <h2 className="text-2xl md:text-3xl text-[#1C1C5A] font-medium">About Us</h2>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold">We are an Award-Winning Accountancy practice with 20+ Years of Expertise</h3>
                </div>
                <div className="">
                <p className="text-base md:text-lg mb-10 lg:text-xl text-muted-foreground">
                  At CLCK Bookkeeping-Taxation, we are more than just another accountancy firm—we are your trusted outsourced finance department with a skilled approach to accessible communication skills in deafness and neurodiversity and use accessible language that you can understand.
                </p>
                <ul className="space-y-4 md:space-y-6">
                  {[
                    "With over 20 years of experience both lived and advised, in both industry and practice, we have built a solid reputation for delivering first-class customer experience and expert financial support.",
                    "Our award-winning team is dedicated to providing tailored solutions that meet the unique needs of small to medium-sized businesses and individuals based in the UK.",
                    "We support many who have struggled to understand the labyrinth of access and issues that can come with deafness and neurodiverse understanding.",
                    "Unlike larger firms where clients can feel like just another number, we stand out by giving you the time & attention you deserve.",
                    "Our commitment is to help you streamline your finances so you can focus on what matters most—growing and developing your business."
                  ].map((item, index) => (
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

        <StatsSection />
     
        <section className="w-full py-12 md:py-16 bg-white text-[#1C1C1C]">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4">
                The Best Option For Your Financial Records
              </h2>
              <p className="text-black text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
                We understand and champion the idea that no two businesses or individuals are the same. That's why we take the time to truly understand your goals, challenges, and aspirations whilst ensuring you comply with a fast-paced changing world of digital tax and financial compliance.
              </p>
            </div>

            <div className="text-center mb-8 md:mb-16">
              <button className="bg-[#FFA500] text-white text-base md:text-lg font-medium px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-[#FFA500]/90 transition duration-200">
                Explore All Services
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: "Tax Planning",
                  icon: "../TaxPlanning.png",
                  description: "We cater to small and medium-sized businesses, entrepreneurs, and individuals who require reliable and accessible financial support with comprehensive tax planning strategies."
                },
                {
                  title: "Audit services",
                  icon: "../auditServices.png",
                  description: "Whether it's basic bookkeeping, automation, management accounts, or audit services, our expert team ensures you receive the highest quality service tailored to your needs.",
                  isHighlighted: true
                },
                {
                  title: "Tax strategy",
                  icon: "../TaxStrategy.png",
                  description: "We provide tax planning and advisory for compliance, or plain and simple support to help you stay in control around your busy schedules while building strong relationships that gets the best results."
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-6 flex flex-col gap-4 h-full transition-all duration-200 ${
                    service.isHighlighted
                      ? "bg-[#1C1C5A] text-white border-2 border-[#FFA500]"
                      : "bg-[#1C1C5A] text-white hover:border hover:border-[#FFA500]"
                  }`}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20">
                    <img
                      src={service.icon}
                      alt={`${service.title} Icon`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold mt-4 md:mt-12 text-[#FFA500]">
                    {service.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-300">
                    {service.description}
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium text-[#FFA500] hover:text-white transition-colors duration-200 inline-flex items-center gap-1 mt-auto"
                  >
                    View Detail <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaSection />
        <TestimonialSection />
        <PricingSection />
      </div>
      <Footer/>
    </div>
  )
}
