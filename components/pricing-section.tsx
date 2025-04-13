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
          <h2 className="text-7xl font-bold tracking-tighter sm:text-4xl">Choose The Right Plan For You</h2>
          <p className="max-w-[700px] text-muted-foreground text-xl text-medium">
            We specialize in providing comprehensive financial services tailored to meet the unique needs of our
            clients.
          </p>
          {/* <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 text-sm rounded-md ${
                billingCycle === "monthly" ? "bg-[#2A3356] text-white" : "bg-transparent"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 text-sm rounded-md ${
                billingCycle === "yearly" ? "bg-[#2A3356] text-white" : "bg-transparent"
              }`}
            >
              Yearly
            </button>
          </div> */}
        </div>
        <div className=" flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 h-[500px] w-[1000px] justify-center">
          <div className="bg-gray-100 border-2 p-6 rounded-3xl">
            <h3 className="text-2xl font-semibold">Basic</h3>
            <p className="text-sm text-muted-foreground my-4">
              Nam ultricies lacus interdum neque sagittis met integer porta sem eu.
            </p>
            <div className="mb-4">
              <span className="text-3xl font-inter font-bold">£67.00</span>
              <span className="text-sm text-muted-foreground">/Month</span>
            </div>
            <Button className="w-full bg-[#2A3356] hover:bg-[#2A3356]/90 mb-6">Get Started</Button>
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
          <div className="bg-[#2A3356] border-2 p-6 rounded-3xl text-white min-h-[540px] scale-110">
  <h3 className="text-2xl font-semibold">Enterprise</h3>
  <p className="text-sm text-gray-300 my-4">
    Nam ultricies lacus interdum neque sagittis met integer porta sem eu.
  </p>
  <div className="mb-4">
    <span className="text-3xl font-bold font-inter text-[#F8D77E]">£99.00</span>
    <span className="text-sm text-[#F8D77E]">/Month</span>
  </div>
  <Button className="w-full bg-[#F8D77E] hover:bg-[#F8D77E]/90 text-[#2A3356] mb-6">
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

          <div className="bg-gray-100 border-2 p-6 rounded-3xl">
            <h3 className="text-2xl font-semibold">Professional</h3>
            <p className="text-sm text-muted-foreground my-4">
              Nam ultricies lacus interdum neque sagittis met integer porta sem eu.
            </p>
            <div className="mb-4">
              <span className="text-3xl font-inter font-bold">£166.67</span>
              <span className="text-sm text-muted-foreground">/Month</span>
            </div>
            <Button className="w-full bg-[#2A3356] hover:bg-[#2A3356]/90 mb-6">Get Started</Button>
            <div>
              <h4 className="font-medium mb-3">Plan Includes</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <div className="w-5 h-5 bg-[#2A3356] rounded-full flex items-center justify-center mr-2">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  All the benefits of enterprise
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
                  Quarterly 1 Hour Video meetings
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
