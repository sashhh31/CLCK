"use client"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchCtaSectionData } from "@/lib/contentful"
import Link from "next/link"

interface CtaSectionType {
  title?: string;
  description?: string;
  backgroundImage?: {
    url: string;
    title: string;
    description?: string;
  };
  link?: {
    json: {
      content: Array<{
        content: Array<{
          value: string;
        }>;
      }>;
    };
  };
}

type Props = {
  ctaData?: CtaSectionType;
};

export default function CtaSection({ ctaData: providedData }: Props) {
  const [ctaData, setCtaData] = useState<CtaSectionType | null>(providedData || null);
  const [isLoading, setIsLoading] = useState(!providedData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!providedData) {
      async function loadCtaData() {
        try {
          const data = await fetchCtaSectionData();
          setCtaData(data);
        } catch (error) {
          console.error("Error loading CTA data:", error);
          setError("Failed to load CTA section data");
        } finally {
          setIsLoading(false);
        }
      }
      
      loadCtaData();
    }
  }, [providedData]);

  // Extract link text for the button
  const extractLinkText = (linkContent: any): string => {
    if (!linkContent?.json?.content?.[0]?.content?.[0]?.value) {
      return "Contact Us";
    }
    return linkContent.json.content[0].content[0].value;
  };

  if (isLoading) {
    return (
      <section className="w-full py-12 md:py-24 bg-right bg-no-repeat bg-cover relative text-white flex justify-center items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(9, 20, 45, 0.9) 20%, rgba(9, 20, 45, 0.4) 50%, rgba(9, 20, 45, 0) 100%), url('../aboutUs.png')`,
        }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </section>
    );
  }

  if (error) {
    console.error("Error in CTA section:", error);
  }

  if (!ctaData) {
    return null;
  }

  const backgroundImageUrl = ctaData.backgroundImage?.url || '../aboutUs.png';
  const buttonText = extractLinkText(ctaData.link);
  
  return (
    <section
      className="w-full py-12 md:py-24 bg-right bg-no-repeat bg-cover relative text-white"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(9, 20, 45, 0.9) 20%, rgba(9, 20, 45, 0.4) 50%, rgba(9, 20, 45, 0) 100%), url('${backgroundImageUrl}')`,
      }}
    >
      <div className="container px-4 md:px-6">
        <div className="max-w-[780px]">
          {ctaData.title && (
            <h2 className="text-7xl font-medium sm:text-6xl text-white">
              {ctaData.title.split(' ').map((word, index) => {
                // Highlight words that are longer than 4 characters
                const shouldHighlight = word.length == 4;
                return (
                  <span
                    key={index}
                    className={shouldHighlight ? "text-secondary" : "text-white"}
                  >
                    {word}{' '}
                  </span>
                );
              })}
            </h2>
          )}
          
          {ctaData.description && (
            <p className="mt-4 text-2xl text-gray-300">
              {ctaData.description}
            </p>
          )}
          
          <div className="mt-16">
            <Link href="/contact-us">
              <Button className="bg-secondary text-3xl p-8 rounded-full text-medium text-white hover:bg-secondary/90 transition-colors duration-200">
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}