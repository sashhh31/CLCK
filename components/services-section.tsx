"use client"
import { useState } from "react"
import React, { ReactElement } from "react"
import { Clock, Users, GraduationCap, FileText, MessageSquare, BookOpen, X , Award, Gift} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ServiceItem } from "@/lib/contentful-types"

// Helper function to map icon names to components
function getIconComponent(iconName: string): ReactElement {
  const iconMap: {[key: string]: ReactElement} = {
    "clock": <Clock className="h-6 w-6" />,
    "users": <Users className="h-6 w-6" />,
    "graduation-cap": <GraduationCap className="h-6 w-6" />,
    "file-text": <FileText className="h-6 w-6" />,
    "message-square": <MessageSquare className="h-6 w-6" />,
    "book-open": <BookOpen className="h-6 w-6" />,
    "award": <Award className="h-6 w-6" />,
    "gift": <Gift className="h-6 w-6" />
  };
  
  return iconMap[iconName?.toLowerCase()] || <Clock className="h-6 w-6" />;
}

// Default services as fallback
const defaultServices: ServiceItem[] = [
  {
    sys: { id: "1" },
    title: "Power Hour",
    slug: "power-hour",
    description:
      "Tell us your needs, and we will do all the research for you and have a 1-hour chat so you can be on your way to doing your accounts.",
    price: "£300",
    duration: "1 Hour",
    icon: "clock"
  },
  {
    sys: { id: "2" },
    title: "Support",
    slug: "support",
    description:
      "This is a block of support per hour to help you with the bookkeeping and running of your company, for regular clients only.",
    price: "£99",
    duration: "1 Hour",
    icon: "users"
  },
  {
    sys: { id: "3" },
    title: "Training",
    slug: "training",
    description:
      "Professional training services to help you and your team understand and manage your financial accounts effectively.",
    price: "£450",
    duration: "Day",
    icon: "graduation-cap"
  },
  {
    sys: { id: "4" },
    title: "Payroll management services",
    slug: "payroll",
    description:
      "Our payroll processing services take the hassle out of managing your payroll, allowing you to focus on running your business.",
    price: "£25",
    duration: "Starting from",
    icon: "file-text"
  },
  {
    sys: { id: "5" },
    title: "Admin Services",
    slug: "admin",
    description:
      "Administrative support to help you manage the day-to-day operations of your business with efficiency and expertise.",
    price: "£50",
    duration: "Per Hour",
    icon: "message-square"
  },
  {
    sys: { id: "6" },
    title: "New Client",
    slug: "new-client",
    description:
      "Set up a free account with your email address, and we can add you to a list of people who will receive free vlogs linked to the website.",
    price: "Free",
    duration: "Account",
    icon: "users"
  },
  {
    sys: { id: "7" },
    title: "Onboarding for client services",
    slug: "onboarding",
    description:
      "£75 set fee—a £30 refund fee will be charged to all clients who sign up for and pay for regular services.",
    price: "£75",
    duration: "Set Fee",
    icon: "file-text"
  },
  {
    sys: { id: "8" },
    title: "Communication Skills training",
    slug: "communication",
    description: "How you can help your staff grow your business—for up to 6 people.",
    price: "£600",
    duration: "Per Day",
    icon: "message-square"
  },
  {
    sys: { id: "9" },
    title: "Educational support",
    slug: "educational",
    description:
      "Free for first-year professional clients. First-year access is £6.00 per month / £60 a year. After this, £199 a year, or £165 if paid annually. NO REFUNDS!",
    price: "£6",
    duration: "Per Month",
    icon: "book-open"
  },
  {
    sys: { id: "10" },
    title: "Win a free Power Hour",
    slug: "win-power-hour",
    description:
      "To be in with a chance to win, sign up for a free account, like our socials, share our socials, and #tag_us. You must do all three.",
    price: "Free",
    duration: "Entry",
    icon: "award"
  },
  {
    sys: { id: "11" },
    title: "Win a year's Digital Bookkeeping",
    slug: "win-bookkeeping",
    description:
      "Win a year's worth of Digital bookkeeping software. £5.00 per entry. Winners are announced when cash limits are reached.",
    price: "£5",
    duration: "Per Entry",
    icon: "gift"
  }
]

// Client component for services
function ServicesGrid({ services }: { services: ServiceItem[] }) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)

  // Function to open the modal
  const openModal = (service: ServiceItem) => {
    setSelectedService(service)
  }

  // Function to close the modal
  const closeModal = () => {
    setSelectedService(null)
  }

  // Function to get icon component based on icon name
  const getIconComponent = (icon: any) => {
    const iconName = icon.title?.toLowerCase() || '';
    
    switch(iconName) {
      case 'clock':
        return <Clock className="h-6 w-6" />;
      case 'users':
        return <Users className="h-6 w-6" />;
      case 'graduation-cap':
        return <GraduationCap className="h-6 w-6" />;
      default:
        return <Clock className="h-6 w-6" />;
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter">
          The Best Options For Your Finances
        </h2>
        <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl">
          We specialize in providing comprehensive financial services tailored to meet the unique needs of our clients.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
        {services.map((service, index) => (
          <div key={service.sys?.id || index} className="bg-[#1C1C5A] p-4 md:p-6 rounded-lg w-full transition-all duration-200 hover:shadow-md hover:border hover:border-[#FFA500] cursor-pointer" onClick={() => openModal(service)}>
            <div className="w-10 h-10 bg-[#f0d687] rounded-full flex items-center justify-center mb-4 text-[#1C1C5A]">
              {service.icon ? getIconComponent(service.icon) : <Clock className="h-6 w-6" />}
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">{service.title}</h3>
            <Link 
              href={service.slug ? `/services/${service.slug}` : `/services/${service.sys.id}`}
              className="text-xs font-medium text-[#FFA500] hover:text-white transition-colors duration-200 inline-flex items-center"
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

      {/* Modal/Dialog */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
          <div className="fixed inset-0 z-50 w-full max-w-[700px] p-4 md:p-5 bg-white overflow-auto max-h-[90vh] mx-auto my-4 md:my-8 rounded-lg shadow-lg">
            <div className="container px-4 py-6 md:py-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-semibold text-center">Services Detail</h1>
                <button onClick={closeModal} className="hover:text-[#FFA500] transition-colors duration-200">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-6 md:mb-8">
                {selectedService.image?.url ? (
                  <img
                    src={selectedService.image.url}
                    alt={selectedService.image.title || selectedService.title}
                    className="w-full h-auto rounded-lg mb-4 md:mb-6"
                  />
                ) : (
                  <img
                    src="/image (8).png"
                    alt="Service"
                    className="w-full h-auto rounded-lg mb-4 md:mb-6"
                  />
                )}
                <h2 className="text-xl md:text-2xl font-bold mb-2">{selectedService.title}</h2>
                <p className="text-gray-600 mb-4">{selectedService.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-[#1C1C5A]">{selectedService.price}</span>
                  <span className="text-gray-500">{selectedService.duration}</span>
                </div>
                {selectedService.content && (
                  <div className="mt-4 prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: selectedService.content }} />
                  </div>
                )}
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
                <Button className="w-full bg-[#FFA500] hover:bg-[#FFA500]/90 text-white">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

type Props = {
  services?: ServiceItem[];
};

export default function ServicesSection({ services = [] }: Props) {
  // Use provided services or default to fallback if empty
  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <ServicesGrid services={displayServices} />
      </div>
    </section>
  );
}
