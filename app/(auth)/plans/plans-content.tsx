"use client"
import { useEffect } from 'react';
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Cookies from 'js-cookie';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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
  onClick?: () => void
}

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PlansContentProps {
  initialPlans: PricingPlan[];
}

const getProgressValue = (index: number, totalPlans: number) => {
  return Math.round(((index + 1) / totalPlans) * 100)
}

const renderFeatures = (features: string[]) => {
  if (!Array.isArray(features)) return null;
  
  return features.map((feature, i) => (
    <li key={i} className="flex items-center text-sm text-white">
      <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center mr-2">
        <Check className="h-3 w-3 text-primary" />
      </div>
      {feature}
    </li>
  ));
}

export default function PlansContent({ initialPlans }: PlansContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const selectedPlan = searchParams.get('plan');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      verifySubscription(sessionId);
    }
  }, [sessionId]);

  const verifySubscription = async (sessionId: string) => {
    try {
      const response = await axios.post('/api/verify-subscription', { sessionId });
      const data = response.data.data.data;
      if (data.token) {
        Cookies.set('token', data.token, { 
          secure: true, 
          sameSite: 'strict',
          path: '/'
        });
        localStorage.setItem('token', data.token);
      }

      if (data.subscription) {
        localStorage.setItem('subscription', JSON.stringify(data.subscription));
      }

      toast.success('Subscription activated successfully!');
      setTimeout(() => {
        router.push('/user');
      }, 1000);
    } catch (error: any) {
      console.error('Error verifying subscription:', error);
      toast.error(error.message || 'Failed to verify subscription');
      router.push('/plans');
    }
  };

  const handlePlanSelect = async (plan: PricingPlan) => {
    try {
      console.log('Starting plan selection for:', plan.title);
      setLoadingPlan(plan.title);
      
      const userResponse = localStorage.getItem('verificationEmail');

      console.log('Creating checkout session for plan:', plan.title);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}api/stripe/checkoutSession`, {
        planName: plan.title,
        email: userResponse
      });
      console.log('Checkout session response:', response.data);

      if (!response.data?.sessionId) {
        setLoadingPlan(null);
        throw new Error('No session ID received');
      }

      const stripe = await stripePromise;
      if (!stripe) {
        setLoadingPlan(null);
        throw new Error('Stripe failed to initialize');
      }

      console.log('Redirecting to Stripe checkout...');
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId
      });

      if (error) {
        console.error('Stripe redirect error:', error);
        setLoadingPlan(null);
        toast.error(error.message || 'Failed to redirect to checkout');
      }
    } catch (error: any) {
      console.error('Error selecting plan:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(error.response?.data?.error || error.message || 'Failed to process plan selection');
      setLoadingPlan(null);
    }
  };

  if (sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Processing Your Subscription
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please wait while we verify your subscription...
            </p>
            <div className="mt-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full max-w-[1000px]">
                {initialPlans.map((plan, index) => (
                  <div 
                    key={plan.sys?.id || index} 
                    className={`bg-primary p-4 md:p-6 rounded-3xl text-white transition-all duration-200 border-2 
                      ${plan.highlightPlan 
                        ? 'border-secondary md:scale-105 md:-translate-y-2' 
                        : 'border-primary hover:border-secondary'} 
                      hover:shadow-md`}
                  >
                    <h3 className="text-xl md:text-2xl font-semibold text-white">{plan.title}</h3>
                    <p className={`text-sm my-3 md:my-4 ${plan.highlightPlan ? 'text-white' : 'text-gray-300'}`}>
                      {plan.description}
                    </p>
                    <div className="mb-4">
                      <span className="text-2xl md:text-3xl font-bold text-secondary">£{plan.price.toFixed(2)}</span>
                      <span className={`text-sm ${plan.highlightPlan ? 'text-secondary' : 'text-gray-300'}`}>/Month</span>
                    </div>
                    <Button 
                      className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold mb-4 md:mb-6"
                      onClick={() => handlePlanSelect(plan)}
                      disabled={loadingPlan === plan.title}
                    >
                      {loadingPlan === plan.title ? "Processing..." : "Get Started"}
                    </Button>
                    <div className="mb-4">
                      <span className={`text-sm mb-2 block ${plan.highlightPlan ? 'text-white' : 'text-gray-300'}`}>
                        {plan.title} plan features
                      </span>
                      <Progress value={getProgressValue(index, initialPlans.length)} className="h-2" />
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 