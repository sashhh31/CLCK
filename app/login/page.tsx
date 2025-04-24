import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2A3356] px-4">
      <div className="bg-white  shadow-md w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="../logo.png" alt="" height={150} width={150}/>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-center text-black mb-1">Welcome Back!!</h2>
        <p className="text-center text-black text-sm mb-6">
          Please Enter your account credentials to access <br /> account on CLCK bookkeeping
        </p>

        {/* Form */}
        <form className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-black mb-1 block">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-black">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 012-2h12a2 2 0 012 2v.217l-8 4.8-8-4.8V4zm0 1.383l7.555 4.533a.5.5 0 00.445 0L16 5.383V12a2 2 0 01-2 2H2a2 2 0 01-2-2V5.383z"/>
                </svg>
              </span>
              <Input id="email" type="email" placeholder="Enter Email Address" className="pl-10 rounded-full" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-black mb-1 block">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-black">
              <Image src={"./lock.png"} alt={""} height={18} width={15} />
              </span>
              <Input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                className="pl-10 pr-10 rounded-full"
              />
              <span className="absolute right-3 top-2.5 text-black cursor-pointer">
                <Eye size={16} />
              </span>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-left text-sm font-medium underline">
            <Link href="/forgot-password" className="text-[#2A3356] hover:underline">
              Forget Password
            </Link>
          </div>

          {/* Submit Button */}
          <Link href="/verification">
          <Button className="w-full bg-[#2A3356] hover:bg-[#2A3356]/90 rounded-full mt-8">
            Continue
          </Button>
          </Link>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-black mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#2A3356] hover:underline font-semibold underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
