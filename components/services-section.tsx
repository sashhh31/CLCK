"use client"
import { useState } from "react"
import { Clock, Users, GraduationCap, FileText, MessageSquare, BookOpen, X , Award, Gift} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const services = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Power Hour",
      description:
        "Tell us your needs, and we will do all the research for you and have a 1-hour chat so you can be on your way to doing your accounts.",
      link: "/services/power-hour",
      price: "£300",
      duration: "1 Hour"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Support",
      description:
        "This is a block of support per hour to help you with the bookkeeping and running of your company, for regular clients only.",
      link: "/services/support",
      price: "£99",
      duration: "1 Hour"
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Training",
      description:
        "Professional training services to help you and your team understand and manage your financial accounts effectively.",
      link: "/services/training",
      price: "£450",
      duration: "Day"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Payroll management services",
      description:
        "Our payroll processing services take the hassle out of managing your payroll, allowing you to focus on running your business.",
      link: "/services/payroll",
      price: "£25",
      duration: "Starting from"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Admin Services",
      description:
        "Administrative support to help you manage the day-to-day operations of your business with efficiency and expertise.",
      link: "/services/admin",
      price: "£50",
      duration: "Per Hour"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "New Client",
      description:
        "Set up a free account with your email address, and we can add you to a list of people who will receive free vlogs linked to the website.",
      link: "/services/new-client",
      price: "Free",
      duration: "Account"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Onboarding for client services",
      description:
        "£75 set fee—a £30 refund fee will be charged to all clients who sign up for and pay for regular services.",
      link: "/services/onboarding",
      price: "£75",
      duration: "Set Fee"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Communication Skills training",
      description: "How you can help your staff grow your business—for up to 6 people.",
      link: "/services/communication",
      price: "£600",
      duration: "Per Day"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Educational support",
      description:
        "Free for first-year professional clients. First-year access is £6.00 per month / £60 a year. After this, £199 a year, or £165 if paid annually. NO REFUNDS!",
      link: "/services/educational",
      price: "£6",
      duration: "Per Month"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Win a free Power Hour",
      description:
        "To be in with a chance to win, sign up for a free account, like our socials, share our socials, and #tag_us. You must do all three.",
      link: "/services/win-power-hour",
      price: "Free",
      duration: "Entry"
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Win a year's Digital Bookkeeping",
      description:
        "Win a year's worth of Digital bookkeeping software. £5.00 per entry. Winners are announced when cash limits are reached.",
      link: "/services/win-bookkeeping",
      price: "£5",
      duration: "Per Entry"
    },
    
  ]

  const openModal = (service:any) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter">
            The Best Options For Your Finances
          </h2>
          <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl">
            We specialize in providing comprehensive financial services tailored to meet the unique needs of our
            clients.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-100 p-4 md:p-6 rounded-lg w-full">
              <div className="w-10 h-10 bg-[#2A3356] rounded-full flex items-center justify-center mb-4 text-white">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
              <Link href="/services/detailsPage"
                className="text-xs font-medium text-[#2A3356] hover:underline inline-flex items-center"
              >
                View Detail
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      
      </div>

      {/* Modal/Dialog */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
          <div className="fixed inset-0 z-50 w-full max-w-[700px] p-4 md:p-5 bg-white overflow-auto max-h-[90vh] mx-auto my-4 md:my-8 rounded-lg shadow-lg">
            <div className="container px-4 py-6 md:py-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-semibold text-center">Services Detail</h1>
                <button onClick={closeModal}>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-6 md:mb-8">
                <img
                  src="/image (8).png"
                  alt="Service"
                  className="w-full h-auto rounded-lg mb-4 md:mb-6"
                />
                <h2 className="text-xl md:text-2xl font-bold mb-2">{selectedService.title}</h2>
                <p className="text-gray-600 mb-4">{selectedService.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold">{selectedService.price}</span>
                  <span className="text-gray-500">{selectedService.duration}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input type="text" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="Your email" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea placeholder="Your message" />
                </div>
                <Button className="w-full">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}