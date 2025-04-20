"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Choose The Right Plan For You</h2>
          <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl">
            We provide tailored financial services packages to meet the unique needs of small and medium-sized businesses.
          </p>
        </div>
        <div className="flex justify-center mt-12 md:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full max-w-[1000px]">
            <div className="bg-gray-100 border-2 p-4 md:p-6 rounded-3xl">
              <h3 className="text-xl md:text-2xl font-semibold">Basic</h3>
              <p className="text-sm text-muted-foreground my-3 md:my-4">
                Perfect for sole traders and small businesses just starting out.
              </p>
              <div className="mb-4">
                <span className="text-2xl md:text-3xl font-bold">£67.00</span>
                <span className="text-sm text-muted-foreground">/Month</span>
              </div>
              <Button className="w-full bg-[#2A3356] hover:bg-[#2A3356]/90 mb-4 md:mb-6">Get Started</Button>
              <div>
                <h4 className="font-medium mb-3">Plan Includes</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-[#2A3356] rounded-full flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    1x Self-Assessment
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-[#2A3356] rounded-full flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    Monthly Digital Bookkeeping Licence
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-[#2A3356] rounded-full flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    Quarterly Bookkeeping
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-[#2A3356] rounded-full flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    Profit & Loss Account
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#2A3356] border-2 p-4 md:p-6 rounded-3xl text-white md:scale-105 md:-translate-y-2">
              <h3 className="text-xl md:text-2xl font-semibold">Enterprise</h3>
              <p className="text-sm text-gray-300 my-3 md:my-4">
                Ideal for growing businesses with more complex financial needs.
              </p>
              <div className="mb-4">
                <span className="text-2xl md:text-3xl font-bold text-[#F8D77E]">£99.00</span>
                <span className="text-sm text-[#F8D77E]">/Month</span>
              </div>
              <Button className="w-full bg-[#F8D77E] hover:bg-[#F8D77E]/90 text-[#2A3356] mb-4 md:mb-6">
                Get Started
              </Button>
              <div>
                <h4 className="font-medium mb-3">Plan Includes</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-[#F8D77E] rounded-full flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-[#2A3356]" />
                    </div>
                    All the benefits of Basic
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-[#F8D77E] rounded-full flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-[#2A3356]" />
                    </div>
                    Monthly Bookkeeping
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-[#F8D77E] rounded-full flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-[#2A3356]" />
                    </div>
                    VAT Returns
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-[#F8D77E] rounded-full flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-[#2A3356]" />
                    </div>
                    Educational subscription Access
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 border-2 p-4 md:p-6 rounded-3xl">
              <h3 className="text-xl md:text-2xl font-semibold">Professional</h3>
              <p className="text-sm text-muted-foreground my-3 md:my-4">
                Comprehensive solution for established businesses requiring full financial support.
              </p>
              <div className="mb-4">
                <span className="text-2xl md:text-3xl font-bold">£166.67</span>
                <span className="text-sm text-muted-foreground">/Month</span>
              </div>
              <Button className="w-full bg-[#2A3356] hover:bg-[#2A3356]/90 mb-4 md:mb-6">Get Started</Button>
              <div>
                <h4 className="font-medium mb-3">Plan Includes</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-[#2A3356] rounded-full flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    All the benefits of Enterprise
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-[#2A3356] rounded-full flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    FRS 105
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-[#2A3356] rounded-full flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    Corporation Tax
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-5 h-5 bg-[#2A3356] rounded-full flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    Quarterly 1-hour video meetings
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
