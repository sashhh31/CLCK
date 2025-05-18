"use client"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/app/services/api";
import { toast } from "react-hot-toast";
import PricingCards, { PricingPlan } from "@/components/PricingCards";
import { fetchPricingPlans } from "@/lib/contentful";
import Cookies from 'js-cookie';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import { Suspense } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import PricingSection from "@/components/pricing-section";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function PlansContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const selectedPlan = searchParams.get('plan');

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const plans = await fetchPricingPlans();
        setPricingPlans(plans);
      } catch (error) {
        console.error('Error loading pricing plans:', error);
        toast.error('Failed to load pricing plans');
      }
    };
    loadPlans();
  }, []);

  const handlePlanSelect = async (plan: PricingPlan) => {
    try {
      setLoading(true);
      const token = Cookies.get('token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await axios.post('/api/create-checkout-session', {
        planId: plan.sys?.id,
        price: plan.price
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId
      });

      if (error) {
        toast.error(error.message || 'Failed to redirect to checkout');
      }
    } catch (error) {
      console.error('Error selecting plan:', error);
      toast.error('Failed to process plan selection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="min-h-screen bg-[#2E3B5B] flex items-center justify-center p-4">
          <div className="w-full max-w-7xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-semibold text-white text-center w-full">
                Choose The Right Plan For You
              </h1>
              <button 
                onClick={() => router.push("/user")} 
                className="text-white font-medium hover:underline"
              >
                Skip
              </button>
            </div>
            <p className="text-center text-white max-w-xl mx-auto mb-8">
              Select a plan that best fits your needs. You can upgrade or downgrade at any time.
            </p>
            <div className="flex justify-center items-center">
              {loading ? (
                <div className="text-center text-white">
                  <h2 className="text-xl font-semibold mb-4">Processing...</h2>
                  <p>Please wait while we process your request.</p>
                </div>
              ) : (
                <PricingCards 
                  pricingPlans={pricingPlans.map(plan => ({
                    ...plan,
                    onClick: () => handlePlanSelect(plan)
                  }))} 
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function PlansPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <PlansContent />
    </Suspense>
  );
}
