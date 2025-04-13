"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react"

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
        "Fusce mattis dui aliquam dui consectetur et eleifend eros elit. Donec at accumsa ligula. Cras vulputate nunc vitae quam lorem ipsm dolor sit amet. Fusce mattis dui aliquam dui consectetur, et eleifend eros elit. Donec at accumsa ligula. Cras vulputate nunc vitae quam lorem ipsm dolor sit amet.",
    },
    {
      question: "How do I choose the right accounting firm for my business?",
      answer:
        "When choosing an accounting firm, consider their expertise in your industry, range of services, reputation, communication style, and fee structure. Look for firms with experience in businesses similar to yours and check client testimonials.",
    },
    {
      question: "What Service Do You Offer?",
      answer:
        "We offer comprehensive bookkeeping, tax preparation, financial reporting, payroll management, business advisory, and audit services. Our team provides personalized solutions tailored to your specific business needs.",
    },
    {
      question: "What qualifications should I look for in an accounting firm?",
      answer:
        "Look for proper certifications (CPA, ACCA), industry experience, continuing education, technology proficiency, and a good reputation. The firm should have expertise in your specific industry and stay current with tax laws.",
    },
    {
      question: "What can we do to add services?",
      answer:
        "To add services to your account, simply contact our customer support team or log into your client portal and request additional services. We'll provide a customized quote based on your specific needs.",
    },
    {
      question: "Should I look for in an accounting firm?",
      answer:
        "When selecting an accounting firm, prioritize expertise in your industry, range of services offered, reputation, communication style, technology adoption, and fee structure that aligns with your budget.",
    },
    {
      question: "What Is The Accounting Cycle?",
      answer:
        "The accounting cycle is a systematic process that includes recording transactions, posting to the general ledger, preparing trial balance, making adjusting entries, creating financial statements, and closing the books for a reporting period.",
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
       
          <div className="md:col-span-3 bg-white rounded-lg  flex gap-40">
            <div>

            <h3 className="text-5xl font-bold mb-6">Frequently Asked Questions</h3>
            </div>
            <div className="space-y-4 w-full">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b pb-4">
                  <button
                    className="flex justify-between items-center w-full text-left text-lg text-gray-600 font-bold"
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                    {openIndex === index ? (
                      <Plus className="h-5 w-5 text-[#2A3356]" />
                    ) : (
                      <Minus className="h-5 w-5 text-[#2A3356]" />
                    )}
                  </button>
                  {openIndex === index && <div className="mt-2 text-sm text-muted-foreground">{faq.answer}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
