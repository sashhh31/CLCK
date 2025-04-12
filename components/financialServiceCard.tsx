import React from "react";

export default function FinancialServicesCard() {
  return (
    <div className="relative ml-10 bg-white flex justify-center items-center py-10 ">
      {/* Main container */}
      <div className="relative flex max-w-[1600px]  max-h-[1600px] w-full">
        {/* Left image with overlap */}
        <div className="relative z-10 w-[850px] h-[700px] -mr-24 scale-90 ">
          <img 
            src="../image.svg" 
            alt="Financial consultation" 
            className="w-full h-full object-cover "
          />
        </div>

        {/* Right content */}
        <div className="w-full ml-10 bg-[#2E3B5B] px-28 py-12 h-[750px] text-gray-200 ">
          <h3 className="mb-8 text-xl font-medium uppercase text-yellow-400">About Us</h3>
          
          <h2 className="mb-8 text-5xl font-bold text-white leading-tight">
            We Serving Your Financial Needs
          </h2>
          
          <p className="mb-10 text-xl leading-relaxed">
            CLCK Bookkeeping-Taxation offers secure, accessible bookkeeping and tax services for 
            individuals and businesses. We simplify financial management with expert resources, secure
            document storage, and personalized consultations.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-10">
            <div>
              <h3 className="font-montserrat text-6xl font-semibold text-yellow-400">15+</h3>
              <p className="text-xl">Years Of Experience</p>
            </div>
            <div>
              <h3 className="font-montserrat text-6xl font-semibold text-yellow-400">90%</h3>
              <p className="text-xl">Satisfied Clients</p>
            </div>
            <div>
              <h3 className="font-montserrat text-6xl font-semibold text-yellow-400">85%</h3>
              <p className="text-xl">Problem Solved</p>
            </div>
            <div>
              <h3 className="font-montserrat text-6xl font-semibold text-yellow-400">100+</h3>
              <p className="text-xl">Expert Accountants</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
