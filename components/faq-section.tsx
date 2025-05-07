"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"

interface FaqItem {
  question: string[]
  answer: string[]
  title?: string
  description?: string
}

// Helper to flatten FAQ data into question/answer pairs
function flattenFaqs(faqs: FaqItem[]): { question: string, answer: string }[] {
  const flat: { question: string, answer: string }[] = [];
  faqs.forEach(faq => {
    const qArr = faq.question || [];
    const aArr = faq.answer || [];
    const max = Math.max(qArr.length, aArr.length);
    for (let i = 0; i < max; i++) {
      flat.push({
        question: qArr[i] || "",
        answer: aArr[i] || ""
      });
    }
  });
  return flat;
}

// Client component for FAQ accordion
function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const flatFaqs = flattenFaqs(faqs);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {flatFaqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-700 pb-4">
          <button
            className="flex justify-between items-center w-full text-left text-base md:text-lg font-semibold hover:text-[#FFA500] transition-colors duration-200"
            onClick={() => toggleFaq(index)}
          >
            <span className="pr-4">
              {faq.question || "FAQ Question"}
            </span>
            {openIndex === index ? (
              <Minus className="h-6 w-6 text-[#FFA500] border border-[#FFA500] rounded-full p-1" />
            ) : (
              <Plus className="h-6 w-6 text-[#FFA500] border border-[#FFA500] rounded-full p-1" />
            )}
          </button>
          {openIndex === index && (
            <div className="mt-2 text-sm text-gray-300">
              {faq.answer ? (
                <div className="whitespace-pre-line">{faq.answer}</div>
              ) : (
                <p>No answer available.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

type Props = {
  faqs: FaqItem[];
};

// Main FAQ Section component (Client Component)
export default function FaqSection({ faqs = [] }: Props) {
  // If no FAQs are provided, show a placeholder message
  if (!faqs.length) {
    return (
      <section className="w-full py-16 px-4 max-w-7xl mx-auto">
        <p className="text-center text-gray-500">No FAQs available.</p>
      </section>
    );
  }

  return (
    <section className="w-full py-6 sm:py-8 md:py-12 lg:py-16 xl:py-24 bg-white">
      <div className="container px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
        <div className="bg-[#1C1C5A] rounded-lg p-4 sm:p-6 md:p-8 text-white">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Frequently Asked Questions
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6">
            We specialize in providing comprehensive financial services tailored to meet the unique needs of our clients.
          </p>
          
          {/* Client component for interactive accordion */}
          <FaqAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
