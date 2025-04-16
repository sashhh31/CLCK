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
    <div className="w-full">
      <Header/>
      <div className="min-h-screen w-full mb-24 overflow-hidden">
        <section className="w-full py-8 md:py-24 bg-[#2A3356]">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">About Us</h1>
          </div>
        </section>

        <div className="py-4 md:py-8 border-b">
          <div className="container flex justify-center items-center">
            <div className="h-16 md:h-20 w-full max-w-[1500px] md:max-w-[1500px]">
              <img
                src="../company.png"
                alt="Company Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <section className="w-full py-8 md:py-24">
          <div className="container px-4 md:px-12">
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
              <div className="w-full lg:w-1/2">
                <img
                  src="/image (8).png"
                  alt="About Us"
                  className="w-full rounded-lg"
                  width={600}
                  height={400}
                />
              </div>
              <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl text-[#2A3356] font-medium">About Us</h2>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold">We are Serving Your Financial Records Needs</h3>
                </div>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
                  We specialize in providing comprehensive financial services tailored to meet the unique needs of our clients.
                </p>
                <ul className="space-y-4 md:space-y-6">
                  {[
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
                    "Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
                    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
                    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.",
                    "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit."
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-5 h-5 bg-[#2A3356] rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
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
              <p className="text-gray-500 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
                We specialize in providing comprehensive financial services tailored to meet the unique needs of our clients.
              </p>
            </div>

            <div className="text-center mb-8 md:mb-16">
              <button className="bg-[#2A3356] text-white text-base md:text-lg font-medium px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-[#1f2946] transition">
                Explore All Services
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: "Tax Planning",
                  icon: "../TaxPlanning.png",
                  description: "Our payroll processing services take the hassle out of managing your payroll, allowing you to focus on running your business."
                },
                {
                  title: "Audit services",
                  icon: "../auditServices.png",
                  description: "Our payroll processing services take the hassle out of managing your payroll, allowing you to focus on running your business.",
                  isHighlighted: true
                },
                {
                  title: "Tax strategy",
                  icon: "../TaxStrategy.png",
                  description: "Our payroll processing services take the hassle out of managing your payroll, allowing you to focus on running your business."
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-6 flex flex-col gap-4 h-full ${
                    service.isHighlighted
                      ? "bg-[#2A3356] text-white"
                      : "bg-[#F5F5F5]"
                  }`}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20">
                    <img
                      src={service.icon}
                      alt={`${service.title} Icon`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold mt-4 md:mt-12">
                    {service.title}
                  </h3>
                  <p className={`text-base md:text-lg ${
                    service.isHighlighted ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {service.description}
                  </p>
                  <a
                    href="#"
                    className={`text-sm font-medium ${
                      service.isHighlighted ? "text-[#F0D687]" : "text-[#2A3356]"
                    } underline inline-flex items-center gap-1 mt-auto`}
                  >
                    View Detail <span>↗</span>
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
