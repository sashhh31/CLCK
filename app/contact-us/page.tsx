import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { fetchContactPageData } from "@/lib/contentful"
import { ContactPageFields, RichTextContent } from "@/lib/contentful-types"
import Image from 'next/image'

// Simple rich text renderer component
const RichTextRenderer = ({ richTextField }: { richTextField: RichTextContent }) => {
  try {
    if (richTextField && richTextField.content) {
      return (
        <>
          {richTextField.content.map((item, index) => {
            if (item.content && item.content[0] && item.content[0].value) {
              return <p key={index} className="text-sm text-gray-200">{item.content[0].value}</p>
            }
            return null
          })}
        </>
      )
    }
    return null
  } catch (error) {
    console.error("Error rendering rich text:", error)
    return null
  }
}

// Create a client component for the contact form
import React from 'react'
import { useFormStatus } from 'react-dom'

const ContactForm = ({ 
  cardTitle, 
  cardDescription 
}: { 
  cardTitle: string; 
  cardDescription: string;
}) => {
  return (
    <div className="bg-[#1C1C5A] text-white p-6 md:p-8 lg:p-16 rounded-lg">
      <div className="mb-8 md:mb-16">
        <h3 className="text-lg text-[#FFA500] font-medium mb-4 md:mb-6">Get In Touch</h3>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{cardTitle}</h2>
        <p className="text-base md:text-lg text-gray-300 mt-2">
          {cardDescription}
        </p>
      </div>
      <div className="border border-gray-700"></div>
      <div className="mt-8 md:mt-12">
        <form action="/api/contact" method="POST">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label htmlFor="firstName" className="block text-base md:text-lg font-semibold mb-1 text-[#FFA500]">
                First Name
              </label>
              <Input 
                id="firstName" 
                name="firstName"
                placeholder="First name" 
                className="w-full rounded-full min-h-[40px] bg-[#2A2A6A] border-gray-700 text-white placeholder:text-gray-400" 
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-base md:text-lg font-semibold mb-1 text-[#FFA500]">
                Last Name
              </label>
              <Input 
                id="lastName" 
                name="lastName"
                placeholder="Last name" 
                className="w-full rounded-full min-h-[40px] bg-[#2A2A6A] border-gray-700 text-white placeholder:text-gray-400" 
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block text-base md:text-lg font-semibold mb-1 text-[#FFA500]">
              Email Address
            </label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="Email Address" 
              className="w-full rounded-full min-h-[40px] bg-[#2A2A6A] border-gray-700 text-white placeholder:text-gray-400" 
              required
            />
          </div>
          <div className="mt-6 md:mt-8">
            <label htmlFor="message" className="block text-base md:text-lg font-semibold mb-1 text-[#FFA500]">
              Message
            </label>
            <Textarea 
              id="message" 
              name="message"
              placeholder="Leave Message" 
              className="w-full min-h-[150px] bg-[#2A2A6A] border-gray-700 text-white placeholder:text-gray-400" 
              required
            />
          </div>
          <Button 
            type="submit"
            className="w-full bg-[#FFA500] hover:bg-[#FFB730] text-[#1C1C5A] font-bold rounded-full mt-6 md:mt-10"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default async function ContactUsPage() {
  // Fetch data server-side
  const contactData = await fetchContactPageData();
  
  const { cardTitle, cardDescription, location, emailId, map, image } = contactData;
  
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <section className="w-full py-12 md:py-24 bg-hero-bg bg-cover bg-center">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white flex items-center justify-center">
              <span className="text-[#FFA500] mr-4">Get</span> 
              In Touch
            </h1>
            <p className="mt-4 text-gray-300 max-w-[700px] mx-auto text-base md:text-lg">
              Ready to help your company scale faster? Let's chat about how we can help.
            </p>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 px-4 md:px-8 lg:px-12">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-[#1C1C5A] text-white border border-gray-700 p-4 md:p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#2A2A6A] p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-[#FFA500]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-[#FFA500]">Visit Us At</h3>
                    <p className="text-sm text-gray-300 mb-2">Visit our head quarter at</p>
                    {location ? (
                      <RichTextRenderer richTextField={location} />
                    ) : (
                      <p className="text-sm text-gray-200">
                        CLCK Bookkeeping-Taxation, 29 South view,
                        <br />
                        Austerfield Doncaster
                        <br />
                        South Yorkshire, DN106QR
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-[#1C1C5A] text-white border border-gray-700 p-4 md:p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#2A2A6A] p-3 rounded-full">
                    <Mail className="h-6 w-6 text-[#FFA500]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-[#FFA500]">Send Us Email</h3>
                    <p className="text-sm text-gray-300 mb-2">Contact to our support team at</p>
                    {emailId ? (
                      <RichTextRenderer richTextField={emailId} />
                    ) : (
                      <p className="text-sm text-gray-200">hello@cooper-king.com</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              <ContactForm 
                cardTitle={cardTitle || "Let's Chat, Reach Out to Us"} 
                cardDescription={cardDescription || "Have questions or feedback? We're here to help. Send us a message, and we'll respond within 24 hours"} 
              />
              <div className="rounded-lg flex items-center justify-center">
                {image ? (
                  <Image
                    src={image.url}
                    alt={image.title}
                    width={600}
                    height={1500}
                    className="w-full h-full max-w-[600px] object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src="/human.jpg"
                    alt="Customer support"
                    className="w-full h-full max-w-[600px] object-cover rounded-lg"
                    width={600}
                    height={1500}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="mb-24 md:mb-48 h-[300px] md:h-[400px] px-4 md:px-8">
          {map ? (
            <iframe 
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.544322404447!2d${map.lon}!3d${map.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzI2LjQiTiAwwrAwNyc0Mi4xIlc!5e0!3m2!1sen!2suk!4v1625561293799!5m2!1sen!2suk`}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen
              loading="lazy" 
              title="Google Maps"
              className="rounded-lg"
            ></iframe>
          ) : (
            <div className="relative w-full h-full">
              <img
                src="/map.png"
                alt="Map"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground bg-white/80 px-4 py-2 rounded">Interactive Map</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}