"use client"

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie';

function SubscriptionSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifySubscription = async () => {
      if (!sessionId) {
        toast.error('No session ID found');
        router.push('/plans');
        return;
      }

      try {
        const response = await axios.post('/api/verify-subscription', { sessionId });
        const data = response.data.data.data;

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
        router.push('/plans');
      }
    };

    verifySubscription();
  }, [sessionId, router]);

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

export default function SubscriptionSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <SubscriptionSuccessContent />
    </Suspense>
  );
} 