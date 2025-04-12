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
    <div className="min-h-screen ">
      <section className="w-full py-12 md:py-24 bg-[#2A3356]">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-3xl flex items-center justify-center font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            <div className="text-yellow-200 mr-4">
            Get</div> 
            In Touch</h1>
          <p className="mt-4 text-gray-300 max-w-[700px] mx-auto">
            Ready to help your company scale faster? Let's chat about how we can help.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 px-28">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border-2 p-6 rounded-lg">
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
            <div className="bg-white border-2 p-6 rounded-lg">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12  ">
            <div className="bg-gray-100 py-16 px-8 rounded-lg ">
              <div className="mb-16">
                <h3 className="text-lg text-yellow-500 font-medium mb-6">Get In Touch</h3>
                <h2 className="text-6xl font-bold mb-4">Let's Chat, Reach Out to Us</h2>
                <p className="text-lg text-muted-foreground mt-2">
                  Have questions or feedback? We're here to help. Send us a message, and we'll respond within 24 hours
                </p>
              </div>
              <div className="border"></div>
              <div className=" mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label htmlFor="firstName" className="block text-lg rounded-full font-semibold mb-1">
                      First Name
                    </label>
                    <Input id="firstName" placeholder="First name" className="w-full rounded-full min-h-[40px]" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-lg font-semibold mb-1">
                      Last Name
                    </label>
                    <Input id="lastName" placeholder="Last name" className="w-full rounded-full min-h-[40px]" />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="block text-lg font-semibold mb-1">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="Email Address" className="w-full rounded-full min-h-[50px]" />
                </div>
                <div className="mt-8"> 
                  <label htmlFor="message" className="block text-lg font-semibold mb-1">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Leave Message" className="w-full min-h-[150px] " />
                </div>
                <Button className="w-full bg-[#2A3356] hover:bg-[#2A3356]/90 rounded-full mt-10">Send Message</Button>
              </div>
            </div>
            <div className=" rounded-lg flex items-center justify-center">
              <img
                src="/human.png"
                alt="Customer support"
                className="max-w-full rounded-lg"
                width={600}
                height={1500}
                />
            </div>
          </div>

          
        </div>
        
      </section>
      <div className="mb-48 h-[400px] items-center justify-center ml-2 rounded-lg">
            {/* Map would go here - using placeholder */}
            <img
                src="/map.png"
                alt="Customer support"
                className="max-w-full mb-14  rounded-lg"
                width={1500}
                height={500}
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
