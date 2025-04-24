"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const linkClass = (path: string) =>
    `text-base font-normal transition-colors ${
      pathname === path ? "text-violet-500" : "text-black"
    }`

  const mobileLinkClass = (path: string) =>
    `text-sm font-normal transition-colors ${
      pathname === path ? "text-violet-500" : "text-black"
    }`

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center">
          <div className="relative h-8 w-32 md:w-40">
            <Image src={"/logo.png"} alt="Logo" fill className="object-contain" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 lg:gap-12">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/about-us" className={linkClass("/about-us")}>About Us</Link>
          <Link href="/services" className={linkClass("/services")}>Services</Link>
          <Link href="/pricing" className={linkClass("/pricing")}>Pricing</Link>
          <Link href="/blog-news" className={linkClass("/blog-news")}>Blog/News</Link>
          <Link href="/faqs" className={linkClass("/faqs")}>FAQs</Link>
          <Link href="/contact-us" className={linkClass("/contact-us")}>Contact Us</Link>
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:flex">
          <Link href="/login">
            <Button className="bg-[#2A3356] hover:bg-[#2A3356]/90 text-white rounded-full">Login/Signup</Button>
          </Link>
        </div>

        {/* Hamburger Icon */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-6 bg-white border-t border-b">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className={mobileLinkClass("/")}>Home</Link>
            <Link href="/about-us" className={mobileLinkClass("/about-us")}>About Us</Link>
            <Link href="/services" className={mobileLinkClass("/services")}>Services</Link>
            <Link href="/pricing" className={mobileLinkClass("/pricing")}>Pricing</Link>
            <Link href="/blog-news" className={mobileLinkClass("/blog-news")}>Blog/News</Link>
            <Link href="/faqs" className={mobileLinkClass("/faqs")}>FAQs</Link>
            <Link href="/contact-us" className={mobileLinkClass("/contact-us")}>Contact Us</Link>
          </nav>
          <Link href="/login">
            <Button className="mt-6 bg-[#2A3356] hover:bg-[#2A3356]/90 text-white rounded-full w-full">
              Login/Signup
            </Button>
          </Link>
        </div>
      )}
    </header>
  )
}
