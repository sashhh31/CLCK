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

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SubscriptionPlans() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);

  // Check for success callback from Stripe
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      handleSubscriptionSuccess(sessionId);
    }
  }, [searchParams]);

  // Handle subscription success
  const handleSubscriptionSuccess = async (sessionId: string) => {
    setLoading(true);
    try {
      // Verify the subscription with your backend
      const response = await axios.post('/api/verify-subscription', { sessionId },
      );

      const data =  response.data.data.data;

      // Update user data in your app
      if (data.token) {
        Cookies.set('token', data.token, { 
          secure: true, 
          sameSite: 'strict',
          path: '/'
        });
        localStorage.setItem('token', data.token);
      }

      // Update user subscription data
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
    } finally {
      setLoading(false);
    }
  };

  // Fetch pricing plans on component mount
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const plans = await fetchPricingPlans();
        // Add onClick handler to each plan
        const plansWithHandlers = plans.map(plan => ({
          ...plan,
          onClick: () => handleSubscribe(plan.title)
        }));
        setPricingPlans(plansWithHandlers);
      } catch (error) {
        console.error('Error loading pricing plans:', error);
        toast.error('Failed to load pricing plans');
      }
    };
    loadPlans();
  }, []);

  const handleSubscribe = async (planName: string) => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      const email = localStorage.getItem('verificationEmail') || '';
      
      // Create a checkout session directly with Stripe
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName,
          email,
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }
      console.log(session);

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

    } catch (error: any) {
      console.error('Subscription error:', error);
      toast.error(error.message || 'Failed to create subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
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
            <PricingCards pricingPlans={pricingPlans} />
          )}
        </div>
      </div>
    </div>
  );
}
