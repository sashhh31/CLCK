"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export interface PricingPlan {
  title: string
  description: string
  price: number
  ctaText: string
  ctaLink: string
  highlightPlan: boolean
  features: string[]
  sys?: {
    id: string
  }
}

// Client component for interactive pricing cards
export default function PricingCards({ pricingPlans }: { pricingPlans: PricingPlan[] }) {
  const getProgressValue = (index: number, totalPlans: number) => {
    // Calculate progress value based on plan index (0, 1, 2, etc.)
    return Math.round(((index + 1) / totalPlans) * 100)
  }

  // Safe render function for features to prevent errors
  const renderFeatures = (features: string[]) => {
    if (!Array.isArray(features)) return null;
    
    return features.map((feature, i) => (
      <li key={i} className="flex items-center text-sm text-white">
        <div className="w-5 h-5 bg-[#FFA500] rounded-full flex items-center justify-center mr-2">
          <Check className="h-3 w-3 text-[#1C1C5A]" />
        </div>
        {feature}
      </li>
    ));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full max-w-[1000px]">
      {pricingPlans.map((plan, index) => (
        <div 
          key={plan.sys?.id || index} 
          className={`bg-[#1C1C5A] p-4 md:p-6 rounded-3xl text-white transition-all duration-200 border-2 
            ${plan.highlightPlan 
              ? 'border-[#FFA500] md:scale-105 md:-translate-y-2' 
              : 'border-[#1C1C5A] hover:border-[#FFA500]'} 
            hover:shadow-md`}
        >
          <h3 className="text-xl md:text-2xl font-semibold text-white">{plan.title}</h3>
          <p className={`text-sm my-3 md:my-4 ${plan.highlightPlan ? 'text-white' : 'text-gray-300'}`}>
            {plan.description}
          </p>
          <div className="mb-4">
            <span className="text-2xl md:text-3xl font-bold text-[#FFA500]">£{plan.price.toFixed(2)}</span>
            <span className={`text-sm ${plan.highlightPlan ? 'text-[#FFA500]' : 'text-gray-300'}`}>/Month</span>
          </div>
          <Button 
            className="w-full bg-[#FFA500] hover:bg-[#FFA500]/90 text-white font-semibold mb-4 md:mb-6"
            onClick={() => window.location.href = plan.ctaLink || "/contact-us"}
          >
            {plan.ctaText || "Get Started"}
          </Button>
          <div className="mb-4">
            <span className={`text-sm mb-2 block ${plan.highlightPlan ? 'text-white' : 'text-gray-300'}`}>
              {plan.title} plan features
            </span>
            <Progress value={getProgressValue(index, pricingPlans.length)} className="h-2" />
          </div>
          <div>
            <h4 className="font-medium mb-3 text-white">Plan Includes</h4>
            <ul className="space-y-2">
              {renderFeatures(plan.features)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
