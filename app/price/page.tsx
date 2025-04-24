"use client"
import { useState } from 'react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2E3B5B] py-16">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-6xl relative">
        {/* Skip button */}
        <a href="/user" className="absolute top-6 right-6 text-slate-700 font-medium hover:underline">
          Skip
        </a>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Choose The Right Plan For You</h1>
          <p className="text-black max-w-2xl mx-auto">
            We specialize in providing comprehensive financial services tailored to
            meet the unique needs of our clients.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-full p-1 inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`py-2 px-6 rounded-full ${
                billingCycle === 'monthly'
                  ? 'bg-slate-700 text-white'
                  : 'text-black'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`py-2 px-6 rounded-full ${
                billingCycle === 'yearly'
                  ? 'bg-slate-700 text-white'
                  : 'text-black'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <div className="bg-gray-100 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2">Basic</h2>
            <p className="text-black text-sm mb-6">
              Nam ultrices lacus interdum neque sagittis met integer porta sem eu.
            </p>
            <div className="text-4xl font-bold text-slate-700 mb-6 font-inter">
              £49
              <span className="text-lg font-normal text-black">/Month</span>
            </div>
            
            <button className="w-full py-3 px-4 bg-slate-700 text-white rounded-md mb-6">
              Get Started
            </button>
            
            <div>
              <h3 className="font-bold mb-4">Plan Includes</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-slate-700 rounded-full p-1 mt-0.5 mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-black text-sm">Morbi aliquet ex sit amet pretium.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-slate-700 rounded-full p-1 mt-0.5 mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-black text-sm">Vivamus sit amet erat turpis.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-slate-700 rounded-full p-1 mt-0.5 mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-black text-sm">Phasellus eu porta dolor.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-gray-100 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2">Enterprise</h2>
            <p className="text-black text-sm mb-6">
              Nam ultrices lacus interdum neque sagittis met integer porta sem eu.
            </p>
            <div className="text-4xl font-bold text-slate-700 mb-6 font-inter">
              £129
              <span className="text-lg font-normal text-black">/Month</span>
            </div>
            
            <button className="w-full py-3 px-4 bg-slate-700 text-white rounded-md mb-6">
              Get Started
            </button>
            
            <div>
              <h3 className="font-bold mb-4">Plan Includes</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-slate-700 rounded-full p-1 mt-0.5 mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-black text-sm">Morbi aliquet ex sit amet pretium.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-slate-700 rounded-full p-1 mt-0.5 mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-black text-sm">Vivamus sit amet erat turpis.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-slate-700 rounded-full p-1 mt-0.5 mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-black text-sm">Phasellus eu porta dolor.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-slate-700 rounded-full p-1 mt-0.5 mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-black text-sm">Phasellus eu porta dolor.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-slate-700 rounded-full p-1 mt-0.5 mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-black text-sm">Pellentesque lorem est.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Professional Plan */}
          <div className="bg-gray-100 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2">Professional</h2>
            <p className="text-black text-sm mb-6">
              Nam ultrices lacus interdum neque sagittis met integer porta sem eu.
            </p>
            <div className="text-4xl font-bold text-slate-700 mb-6 font-inter">
              £90
              <span className="text-lg font-normal text-black">/Month</span>
            </div>
            
            <button className="w-full py-3 px-4 bg-slate-700 text-white rounded-md mb-6">
              Get Started
            </button>
            
            <div>
              <h3 className="font-bold mb-4">Plan Includes</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-slate-700 rounded-full p-1 mt-0.5 mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-black text-sm">Morbi aliquet ex sit amet pretium.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-slate-700 rounded-full p-1 mt-0.5 mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-black text-sm">Vivamus sit amet erat turpis.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-slate-700 rounded-full p-1 mt-0.5 mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-black text-sm">Phasellus eu porta dolor.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-slate-700 rounded-full p-1 mt-0.5 mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-black text-sm">Vivamus sit amet erat turpis.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-slate-700 rounded-full p-1 mt-0.5 mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-black text-sm">Pellentesque lorem est.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-slate-700 rounded-full p-1 mt-0.5 mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="text-black text-sm">Phasellus eu porta dolor.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}