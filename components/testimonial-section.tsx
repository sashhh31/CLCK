// app/components/TestimonialsSection.tsx
"use client";

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

type Testimonial = {
  sys: { id: string };
  feedback: string;
  name: string;
  companyName: string;
  feedbackerImage?: {
    url: string;
    title: string;
  } | null;
};

type Props = {
  testimonials: Testimonial[];
};

export default function TestimonialsSection({ testimonials }: Props) {
  const [activeIndex, setActiveIndex] = useState(1);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Handle swipe on mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.targetTouches[0].clientX);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };
    
    const handleTouchEnd = () => {
      if (touchStart - touchEnd > 50) {
        nextSlide();
      }
      
      if (touchStart - touchEnd < -50) {
        prevSlide();
      }
    };
    
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('touchstart', handleTouchStart);
      slider.addEventListener('touchmove', handleTouchMove);
      slider.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        slider.removeEventListener('touchstart', handleTouchStart);
        slider.removeEventListener('touchmove', handleTouchMove);
        slider.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [touchStart, touchEnd]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  if (!testimonials.length) {
    return (
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <p className="text-center text-gray-500">No testimonials available.</p>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-14">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-2 md:mb-3">Testimonials</h3>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 sm:gap-4 md:gap-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 max-w-md">Client Reviews About CLCK Bookkeeping</h2>
          <p className="text-gray-500 max-w-md text-sm sm:text-base md:text-lg lg:text-xl">
            We specialize in providing comprehensive financial services tailored to meet the unique needs of our clients.
          </p>
        </div>
      </div>

      <div className="relative mt-6 sm:mt-8 md:mt-10 lg:mt-12">
        <div className="" ref={sliderRef}>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.sys.id} className="w-full flex-shrink-0 px-1 sm:px-2 md:px-4">
                <div
                  className={`${
                    index % 2 === 0 
                      ? 'bg-primary text-white transition-all duration-200 hover:border hover:border-secondary hover:shadow-md' 
                      : 'bg-primary text-white sm:scale-[1.02] md:scale-[1.05] sm:mx-2 md:mx-4 lg:mx-6 xl:mx-8 transition-all duration-200 hover:border hover:border-secondary hover:shadow-md'
                  } p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 rounded-2xl relative h-auto min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px]`}
                >
                  <img
                    src="/comma.png"
                    className={`mb-3 sm:mb-4 md:mb-6 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 mt-3 sm:mt-4 md:mt-6 lg:mt-8 xl:mt-10 filter grayscale brightness-50 invert'
                    }`}
                  />
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-10 sm:mb-10 md:mb-10 lg:mb-10 xl:mb-12 line-clamp-6 md:line-clamp-none">
                    {testimonial.feedback}
                  </p>
                  <div className="flex items-center mt-10 sm:mt-10 md:mt-20 absolute bottom-4 sm:bottom-5 md:bottom-6 lg:bottom-8">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-15 lg:w-15 rounded-full overflow-hidden mr-2 sm:mr-3 md:mr-4">
                      <Image
                        src={testimonial.feedbackerImage?.url || "/placeholder.svg"}
                        alt={testimonial.feedbackerImage?.title || testimonial.name}
                        width={70}
                        height={70}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-secondary">
                        {testimonial.companyName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 -translate-y-1/2 bg-white rounded-full p-1 sm:p-2 shadow-lg z-10 hover:text-secondary transition-colors duration-200"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-gray-700" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-white rounded-full p-1 sm:p-2 shadow-lg z-10 hover:text-secondary transition-colors duration-200"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-gray-700" />
        </button>
      </div>

      <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 gap-1 sm:gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 sm:h-2 rounded-full transition-all duration-300 ${
              activeIndex === index ? "w-4 sm:w-6 md:w-8 bg-secondary" : "w-1 sm:w-2 bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
