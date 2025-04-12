import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <div className="">
<div className="w-full bg-[#2E3B5B] h-[100px] flex items-center justify-center">
  <img src="../logo1.png" alt="Logo" />
</div>

    <footer className="bg-[#1E1E1E12] text-black px-20">
      <div className="container px-4 py-12 md:py-16">
        <div>

        <div className=" grid-cols-1 md:grid-cols-3 flex justify-between  ">
          <div className="max-w-lg">
            <p className="text-2xl text-gray-800 mb-6 w-3xl">
            Tristirue nulla aliquet enim tortor at auctor urnanmassa enim nec dui nunc mattis enim ut tellusnaute irure repreaen. enim tortor at auctor urnanmassa.
            </p>
            <div className="flex space-x-4 text-white" >
              <Link href="#" className="bg-gray-700 p-2 rounded-full">
                <Youtube className="h-4 w-4" />
              </Link>
              <Link href="#" className="bg-gray-700 p-2 rounded-full">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="bg-gray-700 p-2 rounded-full">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="bg-gray-700 p-2 rounded-full">
                <Twitter className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">About</h3>
              <ul className="space-y-3 ">
                <li>
                  <Link href="/" className="text-xl text-gray-800 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="text-xl text-gray-800 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-xl text-gray-800 hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/brand-news" className="text-xl text-gray-800 hover:text-white">
                    Brand News
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="text-xl text-gray-800 hover:text-white">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="text-xl text-gray-800 hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Working Hours</h3>
              <ul className="space-y-8">
                <li className="text-xl text-gray-800">
                  Mon-Sat
                  <br />
                  12:00 PM - 14:45 PM
                </li>
                <li className="text-xl text-gray-800">
                  Sat-Thu
                  <br />
                  17:30 PM - 00:00 AM
                </li>
                <li className="text-xl text-gray-800">
                  Fri-Sat
                  <br />
                  17:30 PM - 00:00 AM
                </li>
              </ul>
            </div>
          </div>
                </div>
          <div>
            <h3 className="text-3xl font-medium mb-4">Contact Us</h3>
            <div className="space-y-4 flex gap-9">
              <div className="flex flex-row items-start space-x-3 mt-4">
                <div className="bg-gray-700 p-2 rounded-full mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="#F0D687"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="max-w-sm">
                  <p className="text-xl font-medium">Location</p>
                  <p className="text-xl text-gray-800">
                    CLCK Bookkeeping-Taxation, 29 South view, Austerfield Doncaster
                    <br />
                    South Yorkshire, DN106QR
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-gray-700 p-2 rounded-full mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="#F0D687"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xl font-medium">Email Address</p>
                  <p className="text-xl text-gray-800">hello@cooper-king.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-6">
          <p className="text-xl text-gray-400">Copyright © 2024 Clckbooking. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
                    </div>
  )
}
