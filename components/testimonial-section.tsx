"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export default function TestimonialsSection() {
  // Set initial index to 1 (the middle testimonial)
  const [activeIndex, setActiveIndex] = useState(1)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      id: 1,
      text: "Working with CLCK Accounting has been a game-changer for our small business. Their meticulous attention to detail and proactive tax planning have saved us. I've been a client of CLCK Accounting for over a decade. Their team's expertise in navigating complex international",
      name: "Sarah Laura",
      title: "CEO of pluz Company",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      text: "Working with CLCK Accounting has been a game-changer for our small business. Their meticulous attention to detail and proactive tax planning have saved us. I've been a client of CLCK Accounting for over a decade. Their team's expertise in navigating complex international",
      name: "Sarah Laura",
      title: "CEO of pluz Company",
      avatar: "../sarah.png",
    },
    {
      id: 3,
      text: "CLCK Bookkeeping transformed our financial operations. Their team is responsive, professional, and incredibly knowledgeable. I highly recommend their services to any business looking for reliable bookkeeping.",
      name: "Jessica Miller",
      title: "Operations Director at Elevate Solutions",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  // Handle swipe on mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.targetTouches[0].clientX)
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX)
    }
    
    const handleTouchEnd = () => {
      if (touchStart - touchEnd > 50) {
        // Swipe left
        nextSlide()
      }
      
      if (touchStart - touchEnd < -50) {
        // Swipe right
        prevSlide()
      }
    }
    
    const slider = sliderRef.current
    if (slider) {
      slider.addEventListener('touchstart', handleTouchStart)
      slider.addEventListener('touchmove', handleTouchMove)
      slider.addEventListener('touchend', handleTouchEnd)
      
      return () => {
        slider.removeEventListener('touchstart', handleTouchStart)
        slider.removeEventListener('touchmove', handleTouchMove)
        slider.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [touchStart, touchEnd])

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto overflow-hidden">
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-14">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-500 mb-2 md:mb-3">Testimonials</h3>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 sm:gap-4 md:gap-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 max-w-md">Client Reviews About CLCK Bookkeeping</h2>
          <p className="text-gray-500 max-w-md text-sm sm:text-base md:text-lg lg:text-xl">
            We specialize in providing comprehensive financial services tailored to meet the unique needs of our
            clients.
          </p>
        </div>
      </div>

      <div className="relative mt-6 sm:mt-8 md:mt-10 lg:mt-12">
        <div className="overflow-hidden" ref={sliderRef}>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-1 sm:px-2 md:px-4">
                <div
                  className={`${
                    index % 2 === 0 
                      ? 'bg-gray-100 text-black' 
                      : 'bg-[#2d3b55] text-white sm:scale-[1.02] md:scale-[1.05] sm:mx-2 md:mx-4 lg:mx-6 xl:mx-8'
                  } p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 rounded-2xl relative h-auto min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px]`}
                >
                  <img
                    src="../comma.png"
                    className={`mb-3 sm:mb-4 md:mb-6 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 mt-3 sm:mt-4 md:mt-6 lg:mt-8 xl:mt-10 ${
                      index % 1 === 0 ? 'filter grayscale brightness-50 invert' : 'filter grayscale brightness-75'
                    }`}
                  />
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-10 line-clamp-6 md:line-clamp-none">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center mt-3 sm:mt-4 md:mt-6 absolute bottom-4 sm:bottom-5 md:bottom-6 lg:bottom-8">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full overflow-hidden mr-2 sm:mr-3 md:mr-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={84}
                        height={84}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium">
                        {testimonial.name}
                      </h4>
                      <p className={`text-xs sm:text-sm md:text-base lg:text-lg ${index % 1 === 0 ? "text-gray-400" : "text-gray-300"}`}>
                        {testimonial.title}
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
          className="absolute top-1/2 left-0 -translate-y-1/2 bg-white rounded-full p-1 sm:p-2 shadow-lg z-10"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-gray-700" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-white rounded-full p-1 sm:p-2 shadow-lg z-10"
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
              activeIndex === index ? "w-4 sm:w-6 md:w-8 bg-[#2d3b55]" : "w-1 sm:w-2 bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}