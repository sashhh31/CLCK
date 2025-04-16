import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <div className="w-full">
      <div className="w-full bg-[#2E3B5B] h-[80px] md:h-[100px] flex items-center justify-center">
        <img 
          src="../logo1.png" 
          alt="Logo" 
          className="h-[40px] md:h-[60px] w-auto"
        />
      </div>

      <footer className="bg-[#1E1E1E12] text-black px-4 md:px-8 lg:px-20">
        <div className="container px-4 py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="max-w-lg">
              <p className="text-base md:text-lg lg:text-xl text-gray-800 mb-6">
                Tristirue nulla aliquet enim tortor at auctor urnanmassa enim nec dui nunc mattis enim ut tellusnaute irure repreaen. enim tortor at auctor urnanmassa.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition">
                  <Youtube className="h-4 w-4 text-white" />
                </Link>
                <Link href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition">
                  <Instagram className="h-4 w-4 text-white" />
                </Link>
                <Link href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition">
                  <Facebook className="h-4 w-4 text-white" />
                </Link>
                <Link href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition">
                  <Twitter className="h-4 w-4 text-white" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-4">About</h3>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <Link href="/" className="text-base md:text-lg text-gray-800 hover:text-white transition">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-us" className="text-base md:text-lg text-gray-800 hover:text-white transition">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-base md:text-lg text-gray-800 hover:text-white transition">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/brand-news" className="text-base md:text-lg text-gray-800 hover:text-white transition">
                      Brand News
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs" className="text-base md:text-lg text-gray-800 hover:text-white transition">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us" className="text-base md:text-lg text-gray-800 hover:text-white transition">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-4">Working Hours</h3>
                <ul className="space-y-4 md:space-y-6">
                  <li className="text-base md:text-lg text-gray-800">
                    Mon-Sat
                    <br />
                    12:00 PM - 14:45 PM
                  </li>
                  <li className="text-base md:text-lg text-gray-800">
                    Sat-Thu
                    <br />
                    17:30 PM - 00:00 AM
                  </li>
                  <li className="text-base md:text-lg text-gray-800">
                    Fri-Sat
                    <br />
                    17:30 PM - 00:00 AM
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-medium mb-4">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="bg-gray-700 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
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
                  <div>
                    <p className="text-base md:text-lg font-medium">Location</p>
                    <p className="text-base md:text-lg text-gray-800">
                      CLCK Bookkeeping-Taxation, 29 South view, Austerfield Doncaster
                      <br />
                      South Yorkshire, DN106QR
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="bg-gray-700 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
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
                    <p className="text-base md:text-lg font-medium">Email Address</p>
                    <p className="text-base md:text-lg text-gray-800">hello@cooper-king.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 md:mt-12 pt-6">
            <p className="text-base md:text-lg text-gray-400 text-center">
              Copyright © 2024 Clckbooking. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
