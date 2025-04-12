import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import Link from "next/link"

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto">
      <div className="container px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Services Detail</h1>
          <Link href="/services">
            <X className="h-6 w-6" />
          </Link>
        </div>

        <div className="mb-8">
          <img
            src="/image (8).png"
            alt="Service"
            className="w-full h-auto rounded-lg mb-6"
            width={800}
            height={400}
          />

          <h2 className="text-3xl font-bold mb-2">Support</h2>
          <div className="text-2xl font-bold text-[#2A3356] mb-6">
            £99<span className="text-lg font-normal">/1 Hour</span>
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
  )
}
