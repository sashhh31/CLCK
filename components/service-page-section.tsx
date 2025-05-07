"use client"
import React, { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { fetchServicePageData } from '@/lib/contentful'
import { ServicePage } from '@/lib/contentful-types'
import Link from 'next/link'

type Props = {
  servicePages?: ServicePage[];
};

export default function ServicePageSection({ servicePages: providedServices }: Props) {
  const [services, setServices] = useState<ServicePage[]>(providedServices || []);

  useEffect(() => {
    if (!providedServices || providedServices.length === 0) {
      const fetchServices = async () => {
        try {
          const data = await fetchServicePageData();
          setServices(data);
        } catch (error) {
          console.error("Error fetching service pages:", error);
        }
      };
      
      fetchServices();
    }
  }, [providedServices]);

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 bg-white text-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Our Professional Services
          </h2>
          <p className="text-black max-w-3xl text-2xl mx-auto">
            We offer a range of specialized services to help you manage your finances and grow your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.sys?.id || index} 
              className="bg-[#1C1C5A] rounded-2xl p-6 flex flex-col gap-4 h-[240px] text-white hover:border hover:border-[#FFA500] transition-all duration-200"
            >
              {service.icon && (
                <div className="w-12 h-12 bg-[#f0d687] rounded-full flex items-center justify-center p-3">
                  <img
                    src={service.icon.url}
                    alt={service.icon.title || service.title}
                    className="w-20 h-20 object-contain"
                  />
                </div>
              )}
              <h3 className="text-xl font-semibold  text-[#FFA500]">{service.title}</h3>
              <p className="text-gray-300 text-sm">
                {service.description}
              </p>
              {service.serviceDetailsPage && service.serviceDetailsPage.length > 0 ? (
                <Link
                  href={`/services/${service.serviceDetailsPage[0].sys.id}`}
                  className="text-xs font-medium text-[#FFA500] hover:text-white transition-colors duration-200 inline-flex items-center gap-1 mt-auto"
                >
                  View Detail <ArrowUpRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  href={`/services`}
                  className="text-xs font-medium text-[#FFA500] hover:text-white transition-colors duration-200 inline-flex items-center gap-1 mt-auto"
                >
                  View Services <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 