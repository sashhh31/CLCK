import { Suspense } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { fetchPricingPlans } from "@/lib/contentful";
import PlansContent from "./plans-content";

// This is now a server component that fetches data
async function PlansPage() {
  const pricingPlans = await fetchPricingPlans();
  
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <PlansContent initialPlans={pricingPlans} />
    </Suspense>
  );
}

export default PlansPage;
