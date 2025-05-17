import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import CtaSection from '@/components/cta-section';
import { fetchServiceDetailsPage, fetchAllServiceDetailsPages, fetchCtaSectionData } from '@/lib/contentful';
import { ServiceDetailsPage } from '@/lib/contentful-types';

// Generate static params for all service detail pages
export async function generateStaticParams() {
  const serviceDetails = await fetchAllServiceDetailsPages();
  
  return serviceDetails.map((service) => ({
    id: service.sys?.id || '',
  }));
}

interface ServiceDetailPageProps {
  params: {
    id: string;
  };
}

const ServiceDetailPage = async ({ params }: ServiceDetailPageProps) => {
  const { id } = params;
  
  // Fetch service details from Contentful
  const serviceDetails: ServiceDetailsPage = await fetchServiceDetailsPage(id);
  const ctaData = await fetchCtaSectionData();

  // If service is not found, show 404 page
  if (!serviceDetails || !serviceDetails.sys) {
    notFound();
  }

  return (
    <>
      <Header/>
      <div className="bg-white min-h-screen mb-12">
        {/* Main container */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back button */}
          <Link href="/services" className="flex items-center text-gray-700 mb-6 text-4xl font-medium">
            <ArrowLeft className="mr-2 h-8 w-8" />
            <span>Back to Services</span>
          </Link>

          {/* Services grid */}
            {/* Sidebar */}
          

            {/* Main content */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow p-8">
                {/* Service header */}
                <div className="w-full h-full mb-8">
                  {serviceDetails.image ? (
                    <Image
                      src={serviceDetails.image.url}
                      alt={serviceDetails.image.title || serviceDetails.title}
                      className="w-full h-full rounded-lg"
                      width={400}
                      height={400}
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-400">No image available</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-bold text-gray-800">{serviceDetails.title}</h1>
                  <div className="text-blue-600 font-bold text-xl">
                    £{serviceDetails.price}{serviceDetails.price ? '/1 Hour' : ''}
                  </div>
                </div>

                {/* Service description */}
                <div className="text-gray-600 mb-8">
                  <p>{serviceDetails.description}</p>
                </div>

                {/* What we offer */}
                {serviceDetails.whatWeOffer && serviceDetails.whatWeOffer.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">What we Offer</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {serviceDetails.whatWeOffer.map((offer, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-lg">
                          <Image
                            src="/correct-icon.png"
                            alt="correct-icon"
                            className="rounded-lg mb-2"
                            width={30}
                            height={30}
                          />
                          <p className="text-gray-600">{offer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='mb-24 mt-10'>

        <CtaSection ctaData={ctaData} />
        </div>
      <Footer/>
    </>
  );
};

export default ServiceDetailPage; 