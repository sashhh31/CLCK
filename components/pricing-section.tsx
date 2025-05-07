"use client"

// File: components/pricing-section.tsx (Client Component)
import PricingCards, { PricingPlan } from "@/components/PricingCards"
import React from "react"

type Props = {
  pricingPlans: PricingPlan[];
};

// Main Pricing Section component (Client Component)
export default function PricingSection({ pricingPlans = [] }: Props) {
  // If no pricing plans are provided, show a placeholder message
  if (!pricingPlans.length) {
    return (
      <section className="w-full py-16 px-4 max-w-7xl mx-auto">
        <p className="text-center text-gray-500">No pricing plans available.</p>
      </section>
    );
  }

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
          <PricingCards pricingPlans={pricingPlans} />
        </div>
      </div>
    </section>
  )
}