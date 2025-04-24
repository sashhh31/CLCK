"use client"
import { CheckCircle } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Basic",
    price: "£49",
    features: [
      "Morbi aliquet ex sit amet pretium.",
      "Vivamus sit amet erat turpis.",
      "Phasellus eu porta dolor.",
    ],
  },
  {
    name: "Enterprise",
    price: "£129",
    features: [
      "Morbi aliquet ex sit amet pretium.",
      "Vivamus sit amet erat turpis.",
      "Phasellus eu porta dolor.",
      "Phasellus eu porta dolor.",
      "Pellentesque lorem est.",
    ],
  },
  {
    name: "Professional",
    price: "£90",
    features: [
      "Morbi aliquet ex sit amet pretium.",
      "Vivamus sit amet erat turpis.",
      "Phasellus eu porta dolor.",
      "Vivamus sit amet erat turpis.",
      "Pellentesque lorem est.",
      "Phasellus eu porta dolor.",
    ],
  },
];

export default function SubscriptionPlans() {
  const [billingCycle, setBillingCycle] = useState("Monthly");

  return (
    <div className="h-screen overflow-hidden bg-[#2E3B5B] flex items-center justify-center ">
      <div className="bg-white max-w-5xl w-full p-8 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-center w-full">
            Choose The Right Plan For You
          </h1>
          <a href="/dashboard" className="text-blue-900 font-medium hover:underline">
            Skip
          </a>
        </div>
        <p className="text-center text-black max-w-xl mx-auto mb-6">
          We specialize in providing comprehensive financial services tailored to
          meet the unique needs of our clients.
        </p>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            {["Monthly", "Yearly"].map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  billingCycle === cycle
                    ? "bg-blue-900 text-white"
                    : "text-black"
                }`}
              >
                {cycle}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-6 bg-gray-50 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <p className="text-sm text-black mb-4">
                Nam ultrices lacus interdum neque sagittis met Integer porta sem eu.
              </p>
              <div className="text-3xl font-bold text-blue-900 mb-4">
                {plan.price}
                <span className="text-base font-medium text-black">/Month</span>
              </div>
              <button className="w-full bg-blue-900 text-white rounded-full py-2 font-medium mb-4">
                Get Started
              </button>

              <h4 className="font-semibold mb-2">Plan Includes</h4>
              <ul className="space-y-2 text-sm text-black">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="text-blue-900 w-4 h-4 mt-[2px]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
