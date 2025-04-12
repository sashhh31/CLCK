import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, ChevronLeft , X} from "lucide-react"
import Image from "next/image"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2A3356] px-4 py-12">
      <div className="w-full max-w-md bg-white  shadow-xl p-8 relative">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <button className="text-2xl text-[#2A3356] font-light"><ChevronLeft/></button>
          <h1 className="text-xl font-bold text-[#1A1A1A]">Register</h1>
          <button className="text-2xl text-[#2A3356] font-light"><X/></button>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              User Name
            </label>
            <div className="relative">
              <Input
                id="username"
                placeholder="Enter Username"
                className="pl-10 rounded-full"
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 9a4 4 0 100-8 4 4 0 000 8zm0 1c-3.07 0-5 1.57-5 3.5V15h10v-1.5C13 11.57 11.07 10 8 10z"/>
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Enter Email Address"
                className="pl-10 rounded-full"
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 012-2h12a2 2 0 012 2v.217l-8 4.8-8-4.8V4zm0 1.383l7.555 4.533a.5.5 0 00.445 0L16 5.383V12a2 2 0 01-2 2H2a2 2 0 01-2-2V5.383z"/>
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                className="pl-10 pr-10 rounded-full"
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <Image src={"./lock.png"} alt={""} height={18} width={15} />
              </span>
              <EyeIcon className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Enter Your Password"
                className="pl-10 pr-10 rounded-full"
              />
              <span className="absolute left-3 top-3 text-gray-400">
              <Image src={"./lock.png"} alt={""} height={18} width={15} />

              </span>
              <EyeIcon className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <Button className="w-full bg-[#2A3356] hover:bg-[#2A3356]/90 rounded-full">
          <Link href="/verification">
            Continue
          </Link>
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#2A3356] font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
