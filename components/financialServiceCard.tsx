import React from "react";

export default function FinancialServicesCard() {
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
                src="../image.svg" 
                alt="Financial consultation" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right content - full width on mobile, half width on desktop */}
          <div className="w-full lg:w-2/3 bg-[#2E3B5B] p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 text-gray-200 lg:-ml-16 lg:mt-8 xl:mt-12">
            <h3 className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-base sm:text-lg md:text-xl font-medium uppercase text-yellow-400">About Us</h3>
            
            <h2 className="mb-4 sm:mb-6 md:mb-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              We Serving Your Financial Needs
            </h2>
            
            <p className="mb-6 sm:mb-8 md:mb-10 text-base sm:text-lg md:text-xl leading-relaxed">
              CLCK Bookkeeping-Taxation offers secure, accessible bookkeeping and tax services for 
              individuals and businesses. We simplify financial management with expert resources, secure
              document storage, and personalized consultations.
            </p>
            
            {/* Stats grid - 2 columns on all sizes */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {[
                { number: "15+", text: "Years Of Experience" },
                { number: "90%", text: "Satisfied Clients" },
                { number: "85%", text: "Problem Solved" },
                { number: "100+", text: "Expert Accountants" }
              ].map((stat, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-yellow-400">{stat.number}</h3>
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