"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchHeroSectionData } from "@/lib/contentful";
import { HeroSlide } from "@/lib/contentful-types";

type Props = {
  slides?: HeroSlide[];
};

export default function HeroSection({ slides: providedSlides }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<HeroSlide[]>(providedSlides || []);
  const [isLoading, setIsLoading] = useState(!providedSlides);

  // Fetch slides from Contentful if not provided as props
  useEffect(() => {
    if (!providedSlides) {
      async function loadHeroData() {
        try {
          const heroData = await fetchHeroSectionData();
          setSlides(heroData);
        } catch (error) {
          console.error("Error loading hero data:", error);
        } finally {
          setIsLoading(false);
        }
      }

      loadHeroData();
    }
  }, [providedSlides]);

  // Auto-rotate slides
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Show a loading spinner if slides are being fetched
  if (isLoading) {
    return (
      <section className="w-full md:min-h-[700px] min-h-[500px] bg-hero-bg bg-cover bg-center pt-12 md:pt-24 relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </section>
    );
  }

  // If no slides are available after loading, show a default message
  if (slides.length === 0) {
    return (
      <section className="w-full md:min-h-[700px] min-h-[500px] bg-hero-bg bg-cover bg-center pt-12 md:pt-24 relative">
        <div className="container px-4 md:px-6 mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to CLCK Bookkeeping
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto mb-8">
            Professional bookkeeping and tax services for your business.
          </p>
          <Link href="/signup">
            <button className="bg-[#F8D77E] text-[#272E48] hover:bg-[#F8D77E]/90 rounded-full text-lg px-8 py-3 font-medium">
              Get Started Now
            </button>
          </Link>
        </div>
      </section>
    );
  }

  // Helper function to highlight specific word
  const formatTitle = (title: string, highlightWord: string) => {
    const parts = title.split(highlightWord);
    return (
      <div className="max-w-6xl">
        <div className="mb-4">
          {parts[0]}
          <span className="text-[#F8D77E]">{highlightWord}</span>
        </div>
        <div>{parts[1]}</div>
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
                <video
                  src={slide.image}
                  poster={slide.image.replace('.mp4', '.jpg')}
                  controls
                  autoPlay
                  muted={false}
                  playsInline
                  preload="metadata"
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
