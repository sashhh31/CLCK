"use client"
import React, { useEffect, useState } from "react";
import { fetchAboutUsSectionData } from "@/lib/contentful";
import { AboutUsSection } from "@/lib/contentful-types";

type Props = {
  aboutUsData?: AboutUsSection;
};

export default function FinancialServicesCard({ aboutUsData: providedData }: Props) {
  const [aboutData, setAboutData] = useState<AboutUsSection | null>(providedData || null);
  const [isLoading, setIsLoading] = useState(!providedData);

  useEffect(() => {
    if (!providedData) {
      async function loadAboutData() {
        try {
          const data = await fetchAboutUsSectionData();
          setAboutData(data);
        } catch (error) {
          console.error("Error loading about us data:", error);
        } finally {
          setIsLoading(false);
        }
      }
      
      loadAboutData();
    }
  }, [providedData]);

  if (isLoading) {
    return (
      <div className="w-full min-h-[500px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="w-full min-h-[500px] flex items-center justify-center">
        <p className="text-gray-500">No about us information available.</p>
      </div>
    );
  }

  // Create pairs of numerical data and descriptions
  const stats = aboutData.numericalData.map((number, index) => ({
    number,
    text: aboutData.numericalDataDescription[index] || ""
  })).slice(0, 4); // Limit to 4 stats

  return (
    <div className="w-full bg-white py-6 sm:py-8 md:py-10 pr-4 pl-4 sm:pl-6 md:pl-8 lg:pl-10">
      {/* Main container */}
      <div className="max-w-full ">
        {/* Responsive layout container */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left image - stacks on mobile, side by side on desktop */}
          <div className="relative z-10 w-full lg:w-1/2 mb-6 md:left-12 lg:mb-0">
            <div className="aspect-square md:scale-75 mt-16 sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:h-[500px] xl:h-[600px] 2xl:h-[700px] overflow-hidden">
              <img 
                src={aboutData.image?.url || "../image.svg"} 
                alt={aboutData.image?.title || "Financial consultation"} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right content - full width on mobile, half width on desktop */}
          <div className="w-full lg:w-2/3 bg-primary p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 text-gray-200 lg:-ml-16 lg:mt-8 xl:mt-12">
            <h3 className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-base sm:text-lg md:text-xl font-medium uppercase text-secondary">About Us</h3>
            
            <h2 className="mb-4 sm:mb-6 md:mb-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {aboutData.title}
            </h2>
            
            <p className="mb-6 sm:mb-8 md:mb-10 text-base sm:text-lg md:text-xl leading-relaxed">
              {aboutData.description}
            </p>
            
            {/* Stats grid - 2 columns on all sizes */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {stats.map((stat, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-secondary">{stat.number}</h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl">{stat.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}