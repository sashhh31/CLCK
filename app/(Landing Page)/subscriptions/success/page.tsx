'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SubscriptionSuccessContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const message = searchParams.get('message');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {status === 'success' ? 'Subscription Successful!' : 'Subscription Status'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {message || (status === 'success' ? 'Thank you for subscribing to our service.' : 'Please check your subscription status.')}
          </p>
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