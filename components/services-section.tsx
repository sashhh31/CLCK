"use client"
import { useState } from "react"
import { Clock, Users, GraduationCap, FileText, MessageSquare, BookOpen, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const services = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Power Hour",
      description:
        "Book a power hour and we will do all the research for you and have a 1-hour meeting with you to find the best way to help your business.",
      link: "/services/power-hour",
      price: "£99",
      duration: "1 Hour"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Support",
      description:
        "Our support team is here to help you with the bookkeeping and accounting of your business, for regular clients only.",
      link: "/services/support",
      price: "£99",
      duration: "1 Hour"
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Training",
      description:
        "Our professional services help you handle all of managing your accounts, allowing you to focus on running your business.",
      link: "/services/training",
      price: "£149",
      duration: "Session"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Payroll management services",
      description:
        "Our payroll processing services take the hassle out of managing your payroll, allowing you to focus on running your business.",
      link: "/services/payroll",
      price: "£199",
      duration: "Month"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Admin Services",
      description:
        "Our payroll processing services take the hassle out of managing your payroll, allowing you to focus on running your business.",
      link: "/services/admin",
      price: "£149",
      duration: "Month"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "New Client",
      description:
        "Our payroll processing services take the hassle out of managing your payroll, allowing you to focus on running your business.",
      link: "/services/new-client",
      price: "£99",
      duration: "Onboarding"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Onboarding for client services",
      description:
        "We will help you get started with our services. We will guide you through the process and help you migrate services.",
      link: "/services/onboarding",
      price: "£149",
      duration: "Process"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Communication Skills training",
      description: "Improve how your staff gives and receives information. Helps your team - and you - get to success.",
      link: "/services/communication",
      price: "£199",
      duration: "Session"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Educational support only",
      description:
        "For your educational clients - from students to established experts. Get access to our resources - Add a year, 90% off for your students.",
      link: "/services/educational",
      price: "£49",
      duration: "Year"
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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          The Best Options For Your Finances
          </h2>
          <p className="max-w-[700px] text-muted-foreground text-xl">
            We specialize in providing comprehensive financial services tailored to meet the unique needs of our
            clients.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 ml-5 gap-6 px-40 mt-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-100 p-6 w-[320px] rounded-lg">
              <div className="w-10 h-10 bg-[#2A3356] rounded-full flex items-center justify-center mb-4 text-white">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
              <button
                onClick={() => openModal(service)}
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
              </button>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-gray-100 ml-44 p-6 rounded-lg w-[325px]">
          <Image src={"../powerHour.png"} alt="" height={30} width={40}/>
          <h3 className="text-lg font-bold mb-2 mt-4">Win a free Power Hour</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Sign up for a free account. Like our socials, share our content, and you'll be in with a chance to win.
          </p>
          <button
            onClick={() => openModal({
              title: "Win a Free Power Hour",
              description: "Sign up for a free account. Like our socials, share our content, and you'll be in with a chance to win.",
              price: "FREE",
              duration: "Contest"
            })}
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
          </button>
        </div>
      </div>

      {/* Modal/Dialog */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50  bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
          <div className="fixed inset-0 z-50 w-[700px] p-5 bg-white overflow-auto max-w-4xl mx-auto my-8 rounded-lg shadow-lg">
            <div className="container  px-4 py-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-center">Services Detail</h1>
                <button onClick={closeModal}>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-8">
                <img
                  src="/image (8).png"
                  alt="Service"
                  className="w-full h-auto rounded-lg mb-6"
                  width={800}
                  height={400}
                />
<div className="flex justify-between">

                <h2 className="text-3xl font-bold mb-2">{selectedService.title}</h2>
                <div className="text-3xl font-bold text-[#266CA8] mb-6">
                  {selectedService.price}<span className="text-xl font-normal text-gray-600">/{selectedService.duration}</span>
                </div>
</div>

                <p className="text-muted-foreground mb-8">
                  Eleifend mi in nulla posuere sollicitudin aliquam. Sagittis orci a scelerisque purus semper eget duis at tellus. Interdum varius sit amet mattis vulputate enim nulla. Dignissim sodales ut eu sem integer vitae justo eget magna. Quis hendrerit dolor magna eget est lorem. Nunc sed blandit libero volutpat sed cras. Vivamus arcu felis bibendum ut tristique et egestas. 
                </p>

                <h3 className="text-2xl font-bold mb-4">Get Service Now!!</h3>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <Input id="firstName" placeholder="First name" className="w-full" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <Input id="lastName" placeholder="Last name" className="w-full" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="Email Address" className="w-full" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Leave Message" className="w-full min-h-[120px]" />
                  </div>
                  <Button className="w-full bg-[#2A3356] hover:bg-[#2A3356]/90">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}