"use client"

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/app/services/api';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

export default function SubscriptionSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const handleSuccess = async () => {
      if (!sessionId) {
        toast.error('Invalid session');
        router.push('/plans');
        return;
      }

      try {
        // Call backend to verify session and update subscription
        const response = await authService.verifySubscription(sessionId);
        
        // Set token in cookie if provided
        if (response.data?.token) {
          // Set both cookie and localStorage for redundancy
          Cookies.set('token', response.data.token, { 
            secure: true, 
            sameSite: 'strict',
            path: '/'
          });
          localStorage.setItem('token', response.data.token);
        }

        toast.success('Subscription activated successfully!');
        // Add a small delay to ensure cookies are set
        setTimeout(() => {
          router.push('/user');
        }, 1000);
      } catch (error: any) {
        console.error('Error verifying subscription:', error);
        toast.error(error.response?.data?.message || 'Failed to verify subscription');
        router.push('/plans');
      }
    };

    handleSuccess();
  }, [sessionId, router]);

  return (
    <div className="min-h-screen bg-[#2E3B5B] flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-2xl font-semibold mb-4">Processing your subscription...</h1>
        <p>Please wait while we activate your subscription.</p>
      </div>
    </div>
  );
} 