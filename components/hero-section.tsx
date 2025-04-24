
"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Define multiple hero content slides
  const slides = [
    {
      title: "Simplify Your Finances with Secure Bookkeeping & Tax Services",
      highlightWord: "Finances",
      description: "Manage your bookkeeping and taxes effortlessly with our modern, secure, and user-friendly platform. Access financial tools, secure document storage, and exclusive resources designed for individuals and businesses.",
      buttonText: "Get Started Now",
      image: "/s.png.jpg"
    },
    {
      title: "Streamline Your Tax Preparation with Expert Tools",
      highlightWord: "Tax",
      description: "Manage your bookkeeping and taxes effortlessly with our modern, secure, and user-friendly platform. Access financial tools, secure document storage, and exclusive resources designed for individuals and businesses.",
      buttonText: "Get Started Now",
      image: "/st.png.jpg"
    },
    {
      title: "Secure Document Management for Financial Peace",
      highlightWord: "Document",
      description: "Manage your bookkeeping and taxes effortlessly with our modern, secure, and user-friendly platform. Access financial tools, secure document storage, and exclusive resources designed for individuals and businesses.",
      buttonText: "Get Started Now",
      image: "/se.png.jpg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Helper function to highlight specific word
  const formatTitle = (title:any, highlightWord:any) => {
    const parts = title.split(highlightWord);
    return (
      <div className="max-w-6xl">
       <div className=" mb-4">
         {parts[0]}<span className="text-[#F8D77E]">{highlightWord}</span></div>
         <div>
        {parts[1]}</div>
      </div>
    );
  };

  return (
<section className="w-full md:min-h-[700px] min-h-[500px] bg-hero-bg bg-cover bg-center pt-12 md:pt-24 relative">
<div className="container px-4 md:px-6 mx-auto">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`transition-opacity duration-1000 absolute w-full left-0 right-0 ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 ">
                {formatTitle(slide.title, slide.highlightWord)}
              </h1>

              <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto mb-8">
                {slide.description}
              </p>
              
              <Link href="/signup">
                <button className="bg-[#F8D77E] text-[#272E48] hover:bg-[#F8D77E]/90 rounded-full text-lg px-8 py-3 font-medium">
                  {slide.buttonText}
                </button>
              </Link>

              <div className="w-[1300px] h-[600px] mt-12">
  <img
    src={slide.image}
    alt="Dashboard screenshot"
    className="w-full h-full object-cover shadow-lg"
  />
</div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}