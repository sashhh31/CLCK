import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function ServiceNotFound() {
  return (
    <>
      <Header />
      <div className="bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Service Not Found</h1>
          <p className="text-gray-600 mb-8 text-lg">
            We couldn't find the service you're looking for. The service may have been moved or no longer exists.
          </p>
          <Link href="/services" className="inline-flex items-center text-blue-600 font-medium">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Services
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
} 