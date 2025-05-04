"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"

interface FaqItem {
  question: string
  answer: string
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs: FaqItem[] = [
    {
      question: "What services do we clck booking offer?",
      answer:
        "Fusce mattis dui aliquam dui consectetur et eleifend eros elit. Donec at accumsa ligula. Cras vulputate nunc vitae quam lorem ipsm dolor sit amet.",
    },
    {
      question: "How do I choose the right accounting firm for my business?",
      answer:
        "When choosing an accounting firm, consider their expertise in your industry, range of services, reputation, communication style, and fee structure.",
    },
    {
      question: "What Service Do You Offer?",
      answer:
        "We offer comprehensive bookkeeping, tax preparation, financial reporting, payroll management, business advisory, and audit services.",
    },
    {
      question: "What qualifications should I look for in an accounting firm?",
      answer:
        "Look for proper certifications (CPA, ACCA), industry experience, continuing education, and a good reputation. The firm should stay current with tax laws.",
    },
    {
      question: "What can we do to add services?",
      answer:
        "To add services to your account, contact our support team or use the client portal. We'll provide a customized quote.",
    },
    {
      question: "Should I look for in an accounting firm?",
      answer:
        "Prioritize expertise in your industry, range of services offered, communication style, and technology adoption.",
    },
    {
      question: "What Is The Accounting Cycle?",
      answer:
        "The accounting cycle includes recording transactions, posting to the general ledger, adjusting entries, preparing financial statements, and closing the books.",
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
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
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-700 pb-4">
                <button
                  className="flex justify-between items-center w-full text-left text-base md:text-lg font-semibold hover:text-[#FFA500] transition-colors duration-200"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="pr-4">{faq.question}</span>
                  {openIndex === index ? (
                    <Minus className="h-6 w-6 text-[#FFA500] border border-[#FFA500] rounded-full p-1" />
                  ) : (
                    <Plus className="h-6 w-6 text-[#FFA500] border border-[#FFA500] rounded-full p-1" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="mt-2 text-sm text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
