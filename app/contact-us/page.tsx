import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ContactUsPage() {
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <section className="w-full py-12 md:py-24 bg-hero-bg bg-cover bg-center">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white flex items-center justify-center">
              <span className="text-yellow-200 mr-4">Get</span> 
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
              <div className="bg-white border-2 p-4 md:p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#2A3356] p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Visit Us At</h3>
                    <p className="text-sm text-muted-foreground mb-2">Visit our head quarter at</p>
                    <p className="text-sm">
                      CLCK Bookkeeping-Taxation, 29 South view,
                      <br />
                      Austerfield Doncaster
                      <br />
                      South Yorkshire, DN106QR
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white border-2 p-4 md:p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#2A3356] p-3 rounded-full">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Send Us Email</h3>
                    <p className="text-sm text-muted-foreground mb-2">Contact to our support team at</p>
                    <p className="text-sm">hello@cooper-king.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              <div className="bg-gray-100 p-6 md:p-8 lg:p-16 rounded-lg">
                <div className="mb-8 md:mb-16">
                  <h3 className="text-lg text-yellow-500 font-medium mb-4 md:mb-6">Get In Touch</h3>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Let's Chat, Reach Out to Us</h2>
                  <p className="text-base md:text-lg text-muted-foreground mt-2">
                    Have questions or feedback? We're here to help. Send us a message, and we'll respond within 24 hours
                  </p>
                </div>
                <div className="border"></div>
                <div className="mt-8 md:mt-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-base md:text-lg font-semibold mb-1">
                        First Name
                      </label>
                      <Input id="firstName" placeholder="First name" className="w-full rounded-full min-h-[40px]" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-base md:text-lg font-semibold mb-1">
                        Last Name
                      </label>
                      <Input id="lastName" placeholder="Last name" className="w-full rounded-full min-h-[40px]" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="email" className="block text-base md:text-lg font-semibold mb-1">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="Email Address" className="w-full rounded-full min-h-[40px]" />
                  </div>
                  <div className="mt-6 md:mt-8">
                    <label htmlFor="message" className="block text-base md:text-lg font-semibold mb-1">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Leave Message" className="w-full min-h-[150px]" />
                  </div>
                  <Button className="w-full bg-[#2A3356] hover:bg-[#2A3356]/90 rounded-full mt-6 md:mt-10">
                    Send Message
                  </Button>
                </div>
              </div>
              <div className="rounded-lg flex items-center justify-center">
                <img
                  src="/human.jpg"
                  alt="Customer support"
                  className="w-full h-full max-w-[600px] object-cover rounded-lg"
                  width={600}
                  height={1500}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mb-24 md:mb-48 h-[300px] md:h-[400px] items-center justify-center px-4 md:px-8">
          <img
            src="/map.png"
            alt="Map"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground">Interactive Map</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
