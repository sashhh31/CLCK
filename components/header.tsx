"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between px-8">
        <Link href="/" className="flex items-center">
          <div className="relative h-8 w-40">
            <Image src={"./logo.png"} alt={""} height={2000} width={2000}/>
          </div>
        </Link>
        <nav className="hidden md:flex gap-12">
          <Link href="/" className="text-base font-medium">
            Home
          </Link>
          <Link href="/about-us" className="text-base font-medium">
            About Us
          </Link>
          <Link href="/services" className="text-base font-medium">
            Services
          </Link>
          <Link href="/pricing" className="text-base font-medium">
            Pricing
          </Link>
          <Link href="/brand-news" className="text-base font-medium">
            Brand News
          </Link>
          <Link href="/faqs" className="text-base font-medium">
            FAQs
          </Link>
          <Link href="/contact-us" className="text-base font-medium">
            Contact Us
          </Link>
        </nav>
        <div className="hidden md:flex">
        <Link href="/login">
          <Button className="bg-[#2A3356] hover:bg-[#2A3356]/90 text-white rounded-full">Login/Signup</Button>
          </Link>
        </div>
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden p-4 bg-white border-b">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/about-us" className="text-sm font-medium">
              About Us
            </Link>
            <Link href="/services" className="text-sm font-medium">
              Services
            </Link>
            <Link href="/pricing" className="text-sm font-medium">
              Pricing
            </Link>
            <Link href="/brand-news" className="text-sm font-medium">
              Brand News
            </Link>
            <Link href="/faqs" className="text-sm font-medium">
              FAQs
            </Link>
            <Link href="/contact-us" className="text-sm font-medium">
              Contact Us
            </Link>
          </nav>
          <Link href="/login">
          <Button className="bg-[#2A3356] hover:bg-[#2A3356]/90 text-white rounded-full">Login/Signup</Button>
          </Link>
        </div>
      )}
    </header>
  )
}
