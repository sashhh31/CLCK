"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export default function TestimonialsSection() {
  // Set initial index to 1 (the middle testimonial)
  const [activeIndex, setActiveIndex] = useState(1)

  const testimonials = [
    {
      id: 1,
      text: "Working with CLCK Accounting has been a game-changer for our small business. Their meticulous attention to detail and proactive tax planning have saved us. \"I've been a client of CLCK Accounting for over a decade. Their team's expertise in navigating complex international",
      name: "Sarah Laura",
      title: "CEO of pluz Company",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      text: "Working with CLCK Accounting has been a game-changer for our small business. Their meticulous attention to detail and proactive tax planning have saved us. “I've been a client of CLCK Accounting for over a decade. Their team's expertise in navigating complex international ",
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
    <section className="py-16 px-14 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <div className="mb-14">
        <h3 className="text-3xl font-semibold text-gray-500 mb-2">Testimonials</h3>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <h2 className="text-4xl font-bold text-gray-900 max-w-md">Client Reviews About CLCK Bookkeeping</h2>
          <p className="text-gray-500 max-w-md text-xl ">
            We specialize in providing comprehensive financial services tailored to meet the unique needs of our
            clients.
          </p>
        </div>
      </div>

      <div className="relative mt-12 ">
        <div >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
          {testimonials.map((testimonial, index) => (
       <div key={testimonial.id} className="w-full  flex-shrink-0 px-4">
    <div
      className={`${
        index % 2 === 0 ? 'bg-gray-100 text-black ' : 'bg-[#2d3b55] text-white scale-110 mx-14'
      } p-8 md:p-12 rounded-2xl relative h-[450px] `}
    >
<img
  src="../comma.png"
  className={`mb-6 h-12 w-12 mt-12 ${index % 1 === 0 ? 'filter grayscale brightness-50 invert' : 'filter grayscale brightness-75'}`}
/>
      <p className="text-lg md:text-xl mb-12 ">{testimonial.text}</p>
      <div className="flex items-center mt-6">
        <div className="h-20 w-20 rounded-full overflow-hidden mr-4">
          <Image
            src={testimonial.avatar || "/placeholder.svg"}
            alt={testimonial.name}
            width={84}
            height={84}
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="text-3xl font-medium">{testimonial.name}</h4>
          <p className={index % 1 === 0 ? "text-gray-400 text-lg" : "text-gray-600"}>
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
          className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-lg"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-lg"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <div className="flex justify-center mt-14 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index ? "w-8 bg-[#2d3b55]" : "w-2 bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}